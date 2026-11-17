import { connectDB } from "@/lib/db";
import { LocationPageTemplate } from "@/lib/models/LocationPageTemplate";
import { isDatabaseEnabled } from "@/lib/locationData";
import {
  defaultLocale,
  getDictionary,
  hasLocale,
  type Dictionary,
} from "@/app/[lang]/dictionaries";
import type { SectionInstance } from "@/components/section-library/types";
import { buildCountryTemplate } from "@/components/section-library/presets/country-presets";
import { buildCityTemplate } from "@/components/section-library/presets/city-presets";
import {
  CLIENT_CITY_DATA,
  preserveCityTemplateContent,
} from "@/components/section-library/presets/client-city-data";
import { buildRouteTemplate } from "@/components/section-library/presets/route-presets";

type LocationPageType = "country" | "city" | "route";

function coerceTemplate(raw: unknown): SectionInstance[] | null {
  if (!Array.isArray(raw) || raw.length === 0) return null;
  const sections = raw.filter(
    (s): s is SectionInstance =>
      !!s &&
      typeof s === "object" &&
      typeof (s as { type?: unknown }).type === "string"
  );
  return sections.length > 0 ? sections : null;
}

async function findPublished(
  pageType: LocationPageType,
  refKey: string,
  lang?: string
): Promise<SectionInstance[] | null> {
  if (!isDatabaseEnabled()) return null;
  try {
    await connectDB();
    const docs = await LocationPageTemplate.find({
      pageType,
      refKey,
      status: "published",
    }).lean();
    if (docs.length === 0) return null;
    const doc =
      (lang ? docs.find((d) => d.lang === lang) : undefined) ??
      docs.find((d) => d.lang === defaultLocale) ??
      docs.find((d) => d.lang !== "ar") ??
      docs[0];
    return coerceTemplate(doc.template);
  } catch {
    return null;
  }
}

async function dictFor(lang: string): Promise<Dictionary> {
  return getDictionary(hasLocale(lang) ? lang : defaultLocale);
}

/**
 * Template resolution chain:
 *   1. stored published doc for (pageType, refKey, lang)
 *   2. stored published doc for (pageType, refKey, defaultLocale)
 *   3. in-memory builder with the requested locale's dictionary
 */
async function resolveTemplate(
  pageType: LocationPageType,
  refKey: string,
  lang: string,
  build: (dict: Dictionary) => SectionInstance[]
): Promise<SectionInstance[]> {
  const stored = await findPublished(pageType, refKey, lang);
  if (stored) return stored;

  return build(await dictFor(lang));
}

export async function getCountryTemplate(
  countrySlug: string,
  lang: string
): Promise<SectionInstance[]> {
  return resolveTemplate("country", countrySlug, lang, (dict) =>
    buildCountryTemplate(countrySlug, dict)
  );
}

export async function getCityTemplate(
  countrySlug: string,
  citySlug: string,
  lang: string
): Promise<SectionInstance[]> {
  const refKey = `${countrySlug}/${citySlug}`;
  const isEnglish = lang === "en-US" || lang === "en-GB";
  const isClientCity = Boolean(CLIENT_CITY_DATA[citySlug]);

  if (isEnglish && isClientCity) {
    const [stored, dict] = await Promise.all([
      findPublished("city", refKey, lang),
      dictFor(lang),
    ]);
    const canonical = buildCityTemplate(countrySlug, citySlug, dict);
    if (!stored) return canonical;
    return preserveCityTemplateContent(canonical, stored);
  }

  return resolveTemplate("city", refKey, lang, (dict) =>
    buildCityTemplate(countrySlug, citySlug, dict)
  );
}

export async function getRouteTemplate(
  countrySlug: string,
  lang: string
): Promise<SectionInstance[]> {
  return resolveTemplate("route", countrySlug, lang, (dict) =>
    buildRouteTemplate(countrySlug, dict)
  );
}
