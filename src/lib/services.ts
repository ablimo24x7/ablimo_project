import { connectDB } from "@/lib/db";
import { getEnv } from "@/lib/env";
import { Service, type ServiceDoc } from "@/lib/models/Service";
import {
  serviceStructures,
  serviceDictKeyBySlug,
  getFallbackImage,
} from "@/app/[lang]/services/_components/serviceStructures";
import {
  getDictionary,
  defaultLocale,
  hasLocale,
  type Locale,
} from "@/app/[lang]/dictionaries";
import type {
  ServiceContent,
  ServicePageTexts,
  ServiceStructure,
  ServiceFaq,
} from "@/app/[lang]/services/_components/ServicePage";
import { renderServiceIcon } from "@/components/services/service-icons";
import { translateText, needsTranslation } from "@/lib/translate";
import enUS from "@/app/[lang]/dictionaries/en-US.json";

export const SERVICES_API_TAG = "services";

/** True when the database is available (USE_DATABASE=true). */
export function isDatabaseEnabled(): boolean {
  try {
    return getEnv().USE_DATABASE !== "false";
  } catch {
    return true;
  }
}

export interface ServiceListItem {
  _id: string;
  slug: string;
  title: string;
  desc: string;
  status: string;
  showInMenu: boolean;
  order: number;
  heroImage: string;
  updatedAt?: string;
  faqCount: number;
}

export interface NavServiceItem {
  label: string;
  href: string;
}

export interface ResolvedServicePage {
  content: ServiceContent;
  breadcrumb: string;
  /** "db" when rendered from MongoDB, "dict" when served from dictionaries. */
  source: "db" | "dict";
  /** Dictionary key when served from dictionaries. */
  dictKey?: string;
seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
  };
}

/**
 * Plain, serialisable shape of a service document as consumed by the page
 * resolver / seeder. Matches both mongoose docs and the plain objects built
 * from the bundled dictionaries (avoids mongoose `DocumentArray` types).
 */
export interface ServiceContentSource {
  slug?: string;
  title?: string;
  subtitle?: string;
  desc?: string;
  heroImage?: string;
  breadcrumb?: string;
  features?: Array<{ icon?: string; title?: string; desc?: string }>;
  cardsHeading?: string;
  cardsDesc?: string;
  cards?: Array<{
    image?: string;
    tag?: string;
    title?: string;
    desc?: string;
  }>;
  sections?: Array<{
    image?: string;
    imageAlt?: string;
    title?: string;
    paragraphs?: string[];
    bullets?: Array<{ text?: string }>;
    imageSide?: "left" | "right";
    dark?: boolean;
  }>;
  faqs?: Array<{ q?: string; a?: string }>;
  ctaTitle?: string;
  ctaDesc?: string;
  ctaLabel?: string;
  ctaHref?: string;
  seo?: { metaTitle?: string; metaDescription?: string; ogImage?: string };
  status?: string;
  showInMenu?: boolean;
  order?: number;
  locale?: string;
}

/** Minimal shape of the bundled dictionary used to build default service docs. */
interface DefaultServiceDictShape {
  services?: { categories?: Array<{ slug: string; title: string; desc: string }> };
  servicePages?: Record<string, ServicePageTexts>;
}

const DEFAULT_HERO =
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&h=800&fit=crop";

/**
 * Additional services surfaced in the header navigation but previously not
 * managed as dashboard services. They are now seeded into the database so they
 * appear in the dashboard services list. Slugs mirror the nav targets and do
 * not collide with the 6 core verticals.
 */
const NAV_ONLY_SERVICES: Array<{
  slug: string;
  title: string;
  href: string;
}> = [
  { slug: "executive-chauffeur", title: "Executive Chauffeur Services", href: "/services/executive-chauffeur" },
  { slug: "chauffeur-hailing", title: "Chauffeur Hailing Services", href: "/services/chauffeur-hailing" },
  { slug: "hourly-chauffeur", title: "Hourly Chauffeur", href: "/services/hourly-chauffeur" },
  { slug: "city-transfers", title: "City Transfers", href: "/services/city-transfers" },
  { slug: "intercity-transfers", title: "Intercity Transfers", href: "/services/intercity-transfers" },
  { slug: "limousine-services", title: "Limousine Services", href: "/services/limousine-services" },
  { slug: "bus-charter", title: "Bus Charter", href: "/services/bus-charter" },
  { slug: "mini-bus-charter", title: "Mini Bus Charter", href: "/services/mini-bus-charter" },
  { slug: "coach-charter", title: "Coach Charter", href: "/services/coach-charter" },
  { slug: "airport-coach-transfers", title: "Airport Coach Transfers", href: "/services/airport-coach-transfers" },
  { slug: "religious-tourism", title: "Religious Tourism", href: "/services/religious-tourism" },
  { slug: "executive-corporate-mobility", title: "Executive Corporate Mobility", href: "/services/executive-corporate-mobility" },
  { slug: "vip-diplomatic-government", title: "VIP Diplomatic Government", href: "/services/vip-diplomatic-government" },
  { slug: "corporate-fleet", title: "Corporate Fleet", href: "/services/corporate-fleet" },
  { slug: "group-coach-charter", title: "Group Coach Charter", href: "/services/group-coach-charter" },
  { slug: "tourism-leisure", title: "Tourism Leisure", href: "/services/tourism-leisure" },
  { slug: "premium-lifestyle", title: "Premium Lifestyle", href: "/services/premium-lifestyle" },
  { slug: "cross-border-mobility", title: "Cross Border Mobility", href: "/services/cross-border-mobility" },
];

function normalizeLocale(lang: string): Locale {
  return hasLocale(lang) ? lang : defaultLocale;
}

/**
 * Build the default service documents from the bundled en-US dictionary data,
 * preserving each service's original image structure.
 */
export function buildDefaultServiceDocs(): ServiceContentSource[] {
  const dict = enUS as DefaultServiceDictShape;
  const categories: Array<{ slug: string; title: string; desc: string }> =
    dict.services?.categories ?? [];
  const servicePages = dict.servicePages ?? {};
  const docs: ServiceContentSource[] = [];

  categories.forEach((category, index) => {
    const key = serviceDictKeyBySlug[category.slug];
    if (!key) return;
    const texts = servicePages[key];
    if (!texts) return;
    const structure = serviceStructures[category.slug] as
      | ServiceStructure
      | undefined;

    const content = {
      title: texts.title ?? "",
      subtitle: texts.subtitle ?? "",
      features: texts.features ?? [],
      cardsHeading: texts.cardsHeading ?? "",
      cardsDesc: texts.cardsDesc ?? "",
      cards: texts.cards ?? [],
      sections: texts.sections ?? [],
      faqs: texts.faqs ?? [],
      ctaTitle: texts.ctaTitle ?? "",
      ctaDesc: texts.ctaDesc ?? "",
      ctaLabel: texts.ctaLabel ?? "",
    };

    docs.push({
      slug: category.slug,
      title: content.title,
      subtitle: content.subtitle,
      desc: category.desc ?? content.subtitle ?? "",
      heroImage: structure?.heroImage ?? DEFAULT_HERO,
      breadcrumb: content.title,
      features: content.features.map((f) => ({
        icon: "",
        title: f.title ?? "",
        desc: f.desc ?? "",
      })),
      cardsHeading: content.cardsHeading,
      cardsDesc: content.cardsDesc,
      cards: content.cards.map((c, i) => ({
        image: structure?.cardImages?.[i] ?? "",
        tag: c.tag ?? "",
        title: c.title ?? "",
        desc: c.desc ?? "",
      })),
      sections: content.sections.map((s, i) => ({
        image: structure?.sectionImages?.[i]?.image ?? "",
        imageAlt: s.imageAlt ?? "",
        title: s.title ?? "",
        paragraphs: s.paragraphs ?? [],
        bullets: s.bullets ?? [],
        imageSide: structure?.sectionImages?.[i]?.imageSide ?? "left",
        dark: structure?.sectionImages?.[i]?.dark ?? false,
      })),
      faqs: content.faqs.map((f) => ({ q: f.q ?? "", a: f.a ?? "" })),
      ctaTitle: content.ctaTitle,
      ctaDesc: content.ctaDesc,
      ctaLabel: content.ctaLabel,
      ctaHref: "",
      seo: {
        metaTitle: texts.metadata?.title ?? content.title,
        metaDescription: texts.metadata?.description ?? content.subtitle ?? "",
        ogImage: "",
      },
      status: "published",
      showInMenu: true,
      order: index,
      locale: "en",
    });
  });

  NAV_ONLY_SERVICES.forEach((service, i) => {
    docs.push({
      slug: service.slug,
      title: service.title,
      subtitle: service.title,
      desc: service.title,
      heroImage: DEFAULT_HERO,
      breadcrumb: service.title,
      status: "published",
      showInMenu: true,
      order: categories.length + i,
      locale: "en",
      seo: {
        metaTitle: service.title,
        metaDescription: service.title,
        ogImage: "",
      },
    });
  });

  return docs;
}

let seedPromise: Promise<void> | null = null;

/** Seed the database from the bundled dictionaries if it is empty. */
export async function seedServicesIfEmpty(): Promise<void> {
  const enabled = isDatabaseEnabled();
  if (!enabled) return;
  if (seedPromise) return seedPromise;

  seedPromise = (async () => {
    try {
      await connectDB();
      const count = await Service.countDocuments();
      if (count === 0) {
        const docs = buildDefaultServiceDocs();
        if (docs.length) {
          await Service.insertMany(docs);
        }
      }
      // One-time migration: ensure all nav-only services have showInMenu: true
      const navOnlySlugs = NAV_ONLY_SERVICES.map((s) => s.slug);
      await Service.updateMany(
        { slug: { $in: navOnlySlugs } },
        { $set: { showInMenu: true } }
      );
    } finally {
      seedPromise = null;
    }
  })();

  return seedPromise;
}

/** One-time migration: ensure all published services have showInMenu: true. */
let migratePromise: Promise<void> | null = null;
export async function migrateShowInMenu(): Promise<void> {
  if (!isDatabaseEnabled()) return;
  if (migratePromise) return migratePromise;

  migratePromise = (async () => {
    try {
      await connectDB();
      const navOnlySlugs = NAV_ONLY_SERVICES.map((s) => s.slug);
      await Service.updateMany(
        { slug: { $in: navOnlySlugs } },
        { $set: { showInMenu: true } }
      );
    } finally {
      migratePromise = null;
    }
  })();

  return migratePromise;
}

/** Convert a Service doc (DB or dictionary-built) to the frontend `ServiceContent` shape. */
export function toServiceContent(doc: ServiceContentSource): ServiceContent {
  const slug = doc.slug ?? "";
  const structure = serviceStructures[slug] as ServiceStructure | undefined;

  const features = (doc.features ?? []).map((f, i) => ({
    icon: f.icon
      ? renderServiceIcon(f.icon)
      : (structure?.featureIcons?.[i] ?? renderServiceIcon("shield")),
    title: f.title ?? "",
    desc: f.desc ?? "",
  }));

  const cards = (doc.cards ?? []).map((c, i) => ({
    image: (c.image ?? "") || (structure?.cardImages?.[i] ?? getFallbackImage(slug)),
    tag: c.tag ?? "",
    title: c.title ?? "",
    desc: c.desc ?? "",
  }));

  const sections = (doc.sections ?? []).map((s, i) => ({
    image:
      (s.image ?? "") ||
      (structure?.sectionImages?.[i]?.image ?? getFallbackImage(slug)),
    imageAlt: s.imageAlt ?? "",
    title: s.title ?? "",
    paragraphs: s.paragraphs ?? [],
    bullets: (s.bullets ?? [])
      .map((b) => ({ text: b.text ?? "" }))
      .filter((b) => b.text),
    dark: s.dark ?? structure?.sectionImages?.[i]?.dark ?? false,
    imageSide: s.imageSide ?? structure?.sectionImages?.[i]?.imageSide ?? "left",
  }));

  return {
    title: doc.title ?? "",
    subtitle: doc.subtitle ?? "",
    heroImage: doc.heroImage || structure?.heroImage || DEFAULT_HERO,
    features,
    cardsHeading: doc.cardsHeading ?? "",
    cardsDesc: doc.cardsDesc ?? "",
    cards,
    sections,
    faqs: (doc.faqs ?? []).map<ServiceFaq>((f) => ({ q: f.q ?? "", a: f.a ?? "" })),
    ctaTitle: doc.ctaTitle ?? "",
    ctaDesc: doc.ctaDesc ?? "",
    ctaLabel: doc.ctaLabel ?? "",
    ctaHref: doc.ctaHref ?? "",
  };
}

/** Fetch all published services (used by the services index + nav). */
export async function getAllPublishedServices(): Promise<ServiceListItem[]> {
  const enabled = isDatabaseEnabled();
  if (!enabled) {
    return buildDefaultServiceDocs()
      .filter((d) => d.status === "published" && d.slug)
      .map((d, i) => ({
        _id: `dict-${d.slug}`,
        slug: d.slug as string,
        title: (d.title as string) ?? "",
        desc: (d.desc as string) ?? "",
        status: "published",
        showInMenu: true,
        order: i,
        heroImage: (d.heroImage as string) ?? getFallbackImage(d.slug as string),
        faqCount: ((d.faqs as ServiceFaq[] | undefined) ?? []).length,
      }));
  }

  await connectDB();
  await seedServicesIfEmpty();
  const docs = await Service.find({ status: "published" })
    .sort({ order: 1, createdAt: 1 })
    .select("slug title desc status showInMenu order heroImage faqs updatedAt")
    .lean();
  return docs.map((d) => ({
    _id: String(d._id),
    slug: d.slug,
    title: d.title,
    desc: d.desc ?? "",
    status: d.status,
    showInMenu: d.showInMenu ?? true,
    order: d.order ?? 0,
    heroImage: d.heroImage ?? getFallbackImage(d.slug),
    updatedAt: d.updatedAt ? String(d.updatedAt) : undefined,
    faqCount: ((d.faqs as Array<ServiceFaq> | undefined) ?? []).length,
  }));
}

/** Fetch a single service doc by slug (any status). */
export async function getServiceBySlug(
  slug: string
): Promise<(ServiceDoc & { _id?: unknown }) | null> {
  if (!isDatabaseEnabled()) return null;
  await connectDB();
  await seedServicesIfEmpty();
  const doc = await Service.findOne({ slug }).lean();
  return doc ?? null;
}

/** Translate a service's editorial fields to the target locale on demand. */
async function translateService(
  doc: ServiceContentSource,
  targetLocale: string
): Promise<ServiceContentSource> {
  const faqs = ((doc.faqs ?? []) as ServiceFaq[]).map((f) => ({ q: f.q, a: f.a }));
  const features = (doc.features ?? []).map((f) => ({ icon: f.icon, title: f.title, desc: f.desc }));
  const cards = (doc.cards ?? []).map((c) => ({ image: c.image, tag: c.tag, title: c.title, desc: c.desc }));
  const sections = (doc.sections ?? []).map((s) => ({
    image: s.image,
    imageAlt: s.imageAlt,
    title: s.title,
    paragraphs: s.paragraphs ?? [],
    bullets: s.bullets ?? [],
    imageSide: s.imageSide,
    dark: s.dark,
  }));

  const [title, subtitle, desc, ctaTitle, ctaDesc, ctaLabel] = await Promise.all([
    translateText(doc.title ?? "", targetLocale),
    translateText(doc.subtitle ?? "", targetLocale),
    translateText(doc.desc ?? "", targetLocale),
    translateText(doc.ctaTitle ?? "", targetLocale),
    translateText(doc.ctaDesc ?? "", targetLocale),
    translateText(doc.ctaLabel ?? "", targetLocale),
  ]);

  const faqsOut = await Promise.all(
    faqs.map(async (f) => ({
      q: await translateText(f.q ?? "", targetLocale),
      a: await translateText(f.a ?? "", targetLocale),
    }))
  );

  const featuresOut = await Promise.all(
    features.map(async (f) => ({
      icon: f.icon,
      title: await translateText(f.title ?? "", targetLocale),
      desc: await translateText(f.desc ?? "", targetLocale),
    }))
  );

  const cardsOut = await Promise.all(
    cards.map(async (c) => ({
      image: c.image,
      tag: c.tag,
      title: await translateText(c.title ?? "", targetLocale),
      desc: await translateText(c.desc ?? "", targetLocale),
    }))
  );

  const sectionsOut = await Promise.all(
    sections.map(async (s) => ({
      image: s.image,
      imageAlt: await translateText(s.imageAlt ?? "", targetLocale),
      title: await translateText(s.title ?? "", targetLocale),
      paragraphs: (
        await Promise.all(
          (s.paragraphs ?? []).map((p) => translateText(p ?? "", targetLocale))
        )
      ).filter(Boolean),
      bullets: (
        await Promise.all(
          (s.bullets ?? []).map((b) =>
            translateText(b.text ?? "", targetLocale).then((text) => ({ text }))
          )
        )
      ).filter((b) => b.text),
      imageSide: s.imageSide,
      dark: s.dark,
    }))
  );

  return { ...doc, title, subtitle, desc, ctaTitle, ctaDesc, ctaLabel, faqs: faqsOut, features: featuresOut, cards: cardsOut, sections: sectionsOut };
}

/**
 * Public page resolver. Prefers the DB (dashboard-managed) content and falls
 * back to the bundled dictionary content when the DB is off/empty.
 */
export async function resolveServicePage(
  slug: string,
  lang: string
): Promise<ResolvedServicePage | null> {
  const dictKey = serviceDictKeyBySlug[slug];

  const dbDoc = await getServiceBySlug(slug);
  if (dbDoc) {
    if (dbDoc.status !== "published") return null;
    const locale = normalizeLocale(lang);
    const localized =
      needsTranslation(dbDoc.locale ?? "en", locale)
        ? await translateService(dbDoc, locale)
        : dbDoc;
    return {
      content: toServiceContent(localized),
      breadcrumb: localized.breadcrumb || localized.title || "",
      source: "db",
      seo: {
        metaTitle: (localized.seo as { metaTitle?: string } | undefined)?.metaTitle,
        metaDescription: (localized.seo as { metaDescription?: string } | undefined)?.metaDescription,
        ogImage: (localized.seo as { ogImage?: string } | undefined)?.ogImage,
      },
    };
  }

  if (!dictKey) return null;

  const locale = normalizeLocale(lang);
  const dict = await getDictionary(locale);
  const servicePages = (dict as DefaultServiceDictShape).servicePages ?? {};
  const texts = servicePages[dictKey];
  if (!texts) return null;

  const structure = serviceStructures[slug];
  const { buildServiceContent } = await import(
    "@/app/[lang]/services/_components/ServicePage"
  );
  const content = buildServiceContent(texts, structure);

  return {
    content,
    breadcrumb: texts.title,
    source: "dict",
    dictKey,
    seo: {
      metaTitle: texts.metadata?.title,
      metaDescription: texts.metadata?.description,
      ogImage: structure?.heroImage,
    },
  };
}

/** Public listing (cards) used by the services index page. */
export async function getServiceCards(
  slugOrder: string[]
): Promise<Array<{ slug: string; title: string; desc: string; image: string }>> {
  const items = await getAllPublishedServices();
  const bySlug = new Map(items.map((s) => [s.slug, s]));
  const result: Array<{ slug: string; title: string; desc: string; image: string }> = [];
  const seen = new Set<string>();

  for (const slug of slugOrder) {
    const item = bySlug.get(slug);
    if (!item || seen.has(slug)) continue;
    seen.add(slug);
    result.push({
      slug,
      title: item.title,
      desc: item.desc,
      image: item.heroImage || getFallbackImage(slug),
    });
  }

  for (const item of items) {
    if (seen.has(item.slug)) continue;
    seen.add(item.slug);
    result.push({
      slug: item.slug,
      title: item.title,
      desc: item.desc,
      image: item.heroImage || getFallbackImage(item.slug),
    });
  }

  return result;
}

/** Navigation menu items surfaced from the DB (merged by the Header). */
export async function getNavServices(lang: string): Promise<NavServiceItem[]> {
  const items = await getAllPublishedServices();
  const prefix = normalizeLocale(lang);
  return items
    .filter((s) => s.showInMenu && s.status === "published")
    .map((s) => ({
      label: s.title,
      href: `/${prefix}/services/${s.slug}`,
    }));
}