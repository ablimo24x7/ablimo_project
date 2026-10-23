import { connectDB } from "@/lib/db";
import { getEnv } from "@/lib/env";
import { Article, type ArticleDoc } from "@/lib/models/Article";
import {
  normalizeCitySlug,
  normalizeCountrySlug,
  resolveCity,
  resolveCountry,
  titleFromSlug,
} from "@/lib/locations";
import { getAllPublishedServices } from "@/lib/services";
import { localeBase } from "@/app/[lang]/dictionaries";
import { applyArabicToArticle, type ArticleTranslations } from "@/lib/arabic-content";

/** True when the database is available (USE_DATABASE=true). */
function isDatabaseEnabled(): boolean {
  try {
    return getEnv().USE_DATABASE !== "false";
  } catch {
    return true;
  }
}

/**
 * Arabic content lives on the base document (`translations.ar`), so Arabic
 * pages always read the English document and overlay the Arabic text on it.
 * Legacy `locale: "ar"` duplicates are ignored — see
 * `scripts/migrate-arabic-articles.mjs`.
 */
function localeFilter(locale: string) {
  const short = locale.split("-")[0];
  if (short === "ar") return { locale: { $ne: "ar" } };
  return { locale: { $in: [locale, short] } };
}

/** Overlay the Arabic content of an article when Arabic is requested. */
function withLocaleContent<T extends Record<string, unknown>>(
  doc: T | null,
  locale: string
): T | null {
  if (!doc) return doc;
  if (locale.split("-")[0] !== "ar") return doc;
  return applyArabicToArticle(doc, doc.translations as ArticleTranslations);
}

export async function getArticleBySlugOnly(
  slug: string,
  locale: string = "en",
  preview: boolean = false
): Promise<ArticleDoc | null> {
  if (!isDatabaseEnabled()) return null;
  await connectDB();
  const filter: Record<string, unknown> = {
    slug,
    ...localeFilter(locale),
  };
  if (!preview) {
    filter.status = "published";
  }
  const article = await Article.findOne(filter).lean();
  return withLocaleContent(article ? (article as ArticleDoc) : null, locale) as ArticleDoc | null;
}

export async function getArticleBySlug(
  slug: string,
  templateType: string,
  locale: string = "en"
): Promise<ArticleDoc | null> {
  if (!isDatabaseEnabled()) return null;
  await connectDB();
  const article = await Article.findOne({
    slug,
    templateType,
    ...localeFilter(locale),
    status: "published",
  }).lean();
  return withLocaleContent(article ? (article as ArticleDoc) : null, locale) as ArticleDoc | null;
}

export async function getRelatedArticles(params: {
  serviceSlug: string;
  countrySlug?: string;
  locale: string;
  excludeSlug: string;
  limit?: number;
}): Promise<ArticleDoc[]> {
  if (!isDatabaseEnabled()) return [];
  await connectDB();
  const filter: Record<string, unknown> = {
    serviceSlug: params.serviceSlug,
    ...localeFilter(params.locale),
    status: "published",
    slug: { $ne: params.excludeSlug },
  };
  if (params.countrySlug) {
    filter.countrySlug = params.countrySlug;
  }
  let articles = await Article.find(filter)
    .sort({ date: -1 })
    .limit(params.limit ?? 4)
    .lean();

  // If no locale-specific articles found and locale is Arabic, fall back to English
  if (articles.length === 0 && params.locale === "ar") {
    const fallbackFilter: Record<string, unknown> = {
      serviceSlug: params.serviceSlug,
      ...localeFilter("en"),
      status: "published",
      slug: { $ne: params.excludeSlug },
    };
    if (params.countrySlug) {
      fallbackFilter.countrySlug = params.countrySlug;
    }
    articles = await Article.find(fallbackFilter)
      .sort({ date: -1 })
      .limit(params.limit ?? 4)
      .lean();
  }

  return articles.map((doc) => withLocaleContent(doc as ArticleDoc, params.locale)) as ArticleDoc[];
}

export async function getAllPublishedArticlesFiltered(params: {
  serviceSlug?: string;
  countrySlug?: string;
  citySlug?: string;
  locale: string;
  limit?: number;
}): Promise<ArticleDoc[]> {
  if (!isDatabaseEnabled()) return [];
  await connectDB();
  const filter: Record<string, unknown> = {
    ...localeFilter(params.locale),
    status: "published",
  };
  if (params.serviceSlug) filter.serviceSlug = params.serviceSlug;
  if (params.countrySlug) filter.countrySlug = params.countrySlug;
  if (params.citySlug) filter.citySlug = params.citySlug;
  let articles = await Article.find(filter)
    .sort({ date: -1 })
    .limit(params.limit ?? 100)
    .lean();

  // Fall back to English if no locale-specific articles found
  if (articles.length === 0 && params.locale === "ar") {
    const fallbackFilter: Record<string, unknown> = {
      ...localeFilter("en"),
      status: "published",
    };
    if (params.serviceSlug) fallbackFilter.serviceSlug = params.serviceSlug;
    if (params.countrySlug) fallbackFilter.countrySlug = params.countrySlug;
    if (params.citySlug) fallbackFilter.citySlug = params.citySlug;
    articles = await Article.find(fallbackFilter)
      .sort({ date: -1 })
      .limit(params.limit ?? 100)
      .lean();
  }

  return articles.map((doc) => withLocaleContent(doc as ArticleDoc, params.locale)) as ArticleDoc[];
}

export async function getAllPublishedArticles(
  locale: string = "en"
): Promise<ArticleDoc[]> {
  if (!isDatabaseEnabled()) return [];
  await connectDB();
  let articles = await Article.find({
    ...localeFilter(locale),
    status: "published",
  })
    .sort({ date: -1 })
    .lean();

  // Fall back to English if no locale-specific articles found
  if (articles.length === 0 && locale === "ar") {
    articles = await Article.find({
      ...localeFilter("en"),
      status: "published",
    })
      .sort({ date: -1 })
      .lean();
  }

  return articles.map((doc) => withLocaleContent(doc as ArticleDoc, locale)) as ArticleDoc[];
}

// ── Standalone blog posts (templateType "blog") ──────────────────

/** Published blog posts for a locale, newest first, with English fallback. */
export async function getPublishedBlogs(locale: string = "en"): Promise<ArticleDoc[]> {
  if (!isDatabaseEnabled()) return [];
  await connectDB();
  let articles = await Article.find({
    templateType: "blog",
    ...localeFilter(locale),
    status: "published",
  })
    .sort({ date: -1 })
    .lean();

  if (articles.length === 0 && locale === "ar") {
    articles = await Article.find({
      templateType: "blog",
      ...localeFilter("en"),
      status: "published",
    })
      .sort({ date: -1 })
      .lean();
  }

  return articles.map((doc) => withLocaleContent(doc as ArticleDoc, locale)) as ArticleDoc[];
}

/**
 * Resolve one blog post by ObjectId or slug. Locale-aware with English
 * fallback; `preview` bypasses the published filter for dashboard previews.
 */
export async function getBlogByIdOrSlug(
  idOrSlug: string,
  locale: string = "en",
  preview: boolean = false
): Promise<ArticleDoc | null> {
  if (!isDatabaseEnabled()) return null;
  await connectDB();

  const isObjectId = /^[0-9a-fA-F]{24}$/.test(idOrSlug);
  const match: Record<string, unknown> = isObjectId
    ? { $or: [{ _id: idOrSlug }, { slug: idOrSlug }] }
    : { slug: idOrSlug };

  const tryLocale = async (loc: string): Promise<ArticleDoc | null> => {
    const doc = await Article.findOne({
      templateType: "blog",
      ...match,
      ...localeFilter(loc),
      ...(preview ? {} : { status: "published" }),
    }).lean();
    return withLocaleContent(doc ? (doc as ArticleDoc) : null, loc);
  };

  const article = await tryLocale(locale);
  if (article) return article;
  if (locale.split("-")[0] !== "en") return tryLocale("en");
  return null;
}

/** Other published blog posts for the related section of a blog post. */
export async function getRelatedBlogs(params: {
  locale: string;
  excludeSlug: string;
  limit?: number;
}): Promise<ArticleDoc[]> {
  if (!isDatabaseEnabled()) return [];
  await connectDB();

  const build = (locale: string) => ({
    templateType: "blog",
    ...localeFilter(locale),
    status: "published",
    slug: { $ne: params.excludeSlug },
  });

  let articles = await Article.find(build(params.locale))
    .sort({ date: -1 })
    .limit(params.limit ?? 4)
    .lean();

  if (articles.length === 0 && params.locale === "ar") {
    articles = await Article.find(build("en"))
      .sort({ date: -1 })
      .limit(params.limit ?? 4)
      .lean();
  }

  return articles.map((doc) => withLocaleContent(doc as ArticleDoc, params.locale)) as ArticleDoc[];
}

/**
 * Count published service-country template articles per country
 * (e.g. /services/airport-transfers/saudi-arabia) for the homepage carousel.
 * Returns {} when the DB is off or the query fails, so callers can fall back
 * to showing countries without counts instead of breaking the page/build.
 */
export async function getCountryServiceCounts(): Promise<Record<string, number>> {
  if (!isDatabaseEnabled()) return {};
  try {
    await connectDB();
    const rows = (await Article.aggregate([
      {
        $match: {
          status: "published",
          templateType: "service-country",
        },
      },
      { $group: { _id: "$countrySlug", slugs: { $addToSet: "$slug" } } },
      { $project: { _id: 0, country: "$_id", count: { $size: "$slugs" } } },
    ])) as { country: string; count: number }[];
    const counts: Record<string, number> = {};
    for (const row of rows) {
      if (row.country) counts[row.country] = row.count;
    }
    return counts;
  } catch {
    return {};
  }
}

/**
 * Count distinct published services per city (homepage cities section).
 * Returns entries keyed by `${countrySlug}/${citySlug}` with the number of
 * distinct serviceSlug values. Falls back to [] on DB-off or query failure.
 */
export async function getCityServiceCounts(): Promise<
  { countrySlug: string; citySlug: string; count: number }[]
> {
  if (!isDatabaseEnabled()) return [];
  try {
    await connectDB();
    const rows = (await Article.aggregate([
      {
        $match: {
          status: "published",
          templateType: "service-city",
          citySlug: { $ne: "" },
        },
      },
      {
        $group: {
          _id: { country: "$countrySlug", city: "$citySlug" },
          services: { $addToSet: "$serviceSlug" },
        },
      },
      {
        $project: {
          _id: 0,
          countrySlug: "$_id.country",
          citySlug: "$_id.city",
          count: { $size: "$services" },
        },
      },
    ])) as { countrySlug: string; citySlug: string; count: number }[];
    return rows;
  } catch {
    return [];
  }
}

export async function fetchAndTranslateArticle(
  slug: string,
  locale: string,
  preview: boolean = false
): Promise<ArticleDoc | null> {
  // First, try to find the locale-specific article (Arabic or English)
  let article = await getArticleBySlugOnly(slug, locale, preview);

  // If not found and locale is Arabic, try English as fallback
  if (!article && locale === "ar") {
    article = await getArticleBySlugOnly(slug, "en", preview);
  }

  return article;
}

// ── Location pages: service tabs ─────────────────────────────────

export interface LocationServiceCity {
  name: string;
  href: string;
}

export interface LocationServiceItem {
  serviceSlug: string;
  name: string;
  href: string;
  description: string;
  cities?: LocationServiceCity[];
}

const SERVICE_FALLBACK_ORDER = 999;

function localeInFilter(locale: string) {
  const short = locale.split("-")[0];
  // Arabic content lives on the base document (translations.ar).
  if (short === "ar") return { $ne: "ar" };
  return { $in: Array.from(new Set([locale, short, "en"])) };
}

function prefersLocale(docLocale: string | undefined, locale: string) {
  const short = locale.split("-")[0];
  return docLocale === locale || docLocale === short;
}

/** Published service articles for a locale with English fallback, deduped by slug. */
async function findServiceArticlesForLocale(
  filter: Record<string, unknown>,
  locale: string,
  select: string
): Promise<ArticleDoc[]> {
  const docs = (await Article.find({
    ...filter,
    status: "published",
    locale: localeInFilter(locale),
  })
    .select(select)
    .lean()) as ArticleDoc[];
  const bySlug = new Map<string, ArticleDoc>();
  for (const doc of docs) {
    const existing = bySlug.get(doc.slug);
    if (
      !existing ||
      (prefersLocale(doc.locale, locale) && !prefersLocale(existing.locale, locale))
    ) {
      bySlug.set(doc.slug, doc);
    }
  }
  return Array.from(bySlug.values()).map(
    (doc) => withLocaleContent(doc, locale) as ArticleDoc
  );
}

async function getServiceMeta() {
  const services = await getAllPublishedServices();
  const nameBySlug = new Map<string, string>();
  const orderKeys: string[] = [];
  for (const s of services) {
    nameBySlug.set(s.slug, s.title || titleFromSlug(s.slug));
    orderKeys.push(s.slug);
  }
  return { nameBySlug, orderKeys };
}

function serviceOrderIndex(orderKeys: string[], serviceSlug: string) {
  const i = orderKeys.indexOf(serviceSlug);
  return i === -1 ? SERVICE_FALLBACK_ORDER : i;
}

/**
 * Published country-level services for a location country page
 * (/services/{service}/{country}), each with the country's city pages of
 * that service as chips. Returns [] when the DB is off or nothing matches.
 */
export async function getCountryServicesForLocation(
  countrySlugParam: string,
  lang: string,
  locale: string
): Promise<LocationServiceItem[]> {
  if (!isDatabaseEnabled()) return [];
  try {
    await connectDB();
    const countrySlug = normalizeCountrySlug(countrySlugParam);
    if (!countrySlug) return [];

    const [countryArticles, cityArticles, { nameBySlug, orderKeys }] =
      await Promise.all([
        findServiceArticlesForLocale(
          { templateType: "service-country", countrySlug },
          locale,
          "slug title excerpt serviceSlug countrySlug locale seo_metadata"
        ),
        Article.find({
          status: "published",
          templateType: "service-city",
          countrySlug,
          citySlug: { $ne: "" },
          locale: localeInFilter(locale),
        })
          .select("slug serviceSlug citySlug city locale")
          .lean() as Promise<ArticleDoc[]>,
        getServiceMeta(),
      ]);

    const isArabic = locale.split("-")[0] === "ar";
    const country = resolveCountry(countrySlug);

    const cityByService = new Map<string, Map<string, LocationServiceCity>>();
    const cityDocLocale = new Map<string, string | undefined>();
    for (const doc of cityArticles) {
      const serviceSlug = doc.serviceSlug || "";
      const citySlug = normalizeCitySlug(countrySlug, doc.citySlug || "");
      if (!serviceSlug || !citySlug) continue;
      const key = `${serviceSlug}/${citySlug}`;
      const prevLocale = cityDocLocale.get(key);
      if (
        prevLocale !== undefined &&
        prefersLocale(prevLocale, locale) &&
        !prefersLocale(doc.locale, locale)
      ) {
        continue;
      }
      cityDocLocale.set(key, doc.locale);
      const cityObj = country
        ? resolveCity(country, doc.citySlug || "") ?? resolveCity(country, citySlug)
        : undefined;
      const name = cityObj
        ? isArabic && cityObj.nameAr
          ? cityObj.nameAr
          : cityObj.name
        : doc.city || titleFromSlug(citySlug);
      if (!cityByService.has(serviceSlug)) cityByService.set(serviceSlug, new Map());
      cityByService
        .get(serviceSlug)!
        .set(citySlug, { name, href: `${localeBase(lang)}/${doc.slug}` });
    }

    const seen = new Set<string>();
    const items: LocationServiceItem[] = [];
    for (const article of countryArticles) {
      const serviceSlug = article.serviceSlug || "";
      if (!serviceSlug || seen.has(serviceSlug)) continue;
      seen.add(serviceSlug);
      const cities = Array.from((cityByService.get(serviceSlug) ?? new Map()).values());
      items.push({
        serviceSlug,
        name: nameBySlug.get(serviceSlug) || titleFromSlug(serviceSlug),
        href: `${localeBase(lang)}/${article.slug}`,
        description:
          article.excerpt || article.seo_metadata?.metaDescription || "",
        cities: cities.length ? cities : undefined,
      });
    }
    items.sort(
      (a, b) =>
        serviceOrderIndex(orderKeys, a.serviceSlug) -
          serviceOrderIndex(orderKeys, b.serviceSlug) ||
        a.name.localeCompare(b.name)
    );
    return items;
  } catch {
    return [];
  }
}

/**
 * Published city-level services for a location city page
 * (/services/{service}/{country}/{city}). Returns [] when the DB is off or
 * nothing matches.
 */
export async function getCityServicesForLocation(
  countrySlugParam: string,
  citySlugParam: string,
  lang: string,
  locale: string
): Promise<LocationServiceItem[]> {
  if (!isDatabaseEnabled()) return [];
  try {
    await connectDB();
    const countrySlug = normalizeCountrySlug(countrySlugParam);
    const citySlug =
      normalizeCitySlug(countrySlug, citySlugParam) || citySlugParam;
    if (!countrySlug || !citySlug) return [];

    const [articles, { nameBySlug, orderKeys }] = await Promise.all([
      findServiceArticlesForLocale(
        {
          templateType: "service-city",
          countrySlug,
          citySlug: {
            $in: Array.from(new Set([citySlug, citySlugParam].filter(Boolean))),
          },
        },
        locale,
        "slug title excerpt serviceSlug countrySlug citySlug locale seo_metadata"
      ),
      getServiceMeta(),
    ]);

    const seen = new Set<string>();
    const items: LocationServiceItem[] = [];
    for (const article of articles) {
      const serviceSlug = article.serviceSlug || "";
      if (!serviceSlug || seen.has(serviceSlug)) continue;
      seen.add(serviceSlug);
      items.push({
        serviceSlug,
        name: nameBySlug.get(serviceSlug) || titleFromSlug(serviceSlug),
        href: `${localeBase(lang)}/${article.slug}`,
        description:
          article.excerpt || article.seo_metadata?.metaDescription || "",
      });
    }
    items.sort(
      (a, b) =>
        serviceOrderIndex(orderKeys, a.serviceSlug) -
          serviceOrderIndex(orderKeys, b.serviceSlug) ||
        a.name.localeCompare(b.name)
    );
    return items;
  } catch {
    return [];
  }
}
