import { connectDB } from "@/lib/db";
import { getEnv } from "@/lib/env";
import { Article, type ArticleDoc } from "@/lib/models/Article";

/** True when the database is available (USE_DATABASE=true). */
function isDatabaseEnabled(): boolean {
  try {
    return getEnv().USE_DATABASE !== "false";
  } catch {
    return true;
  }
}

function localeFilter(locale: string) {
  const short = locale.split("-")[0];
  return { locale: { $in: [locale, short] } };
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
  return article ? (article as ArticleDoc) : null;
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
  return article ? (article as ArticleDoc) : null;
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

  return articles as ArticleDoc[];
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

  return articles as ArticleDoc[];
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

  return articles as ArticleDoc[];
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
