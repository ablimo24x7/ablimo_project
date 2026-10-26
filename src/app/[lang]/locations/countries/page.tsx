import type { Metadata } from "next";
import { getDictionary, hasLocale, defaultLocale, type Locale } from "@/app/[lang]/dictionaries";
import { getAllCountries } from "@/lib/locationData";
import { translateText, needsTranslation } from "@/lib/translate";
import CountriesClient from "../_components/CountriesClient";
import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  const isAr = locale === "ar";
  return generateSeoMetadata({
    title: isAr ? dict.locations.metadata.title : "Global Locations | AB in 50+ Countries Worldwide",
    description: isAr
      ? dict.locations.metadata.description
      : "AB operates in 50+ countries across the GCC, Europe, Asia, and the Americas. Find premium chauffeur services in Dubai, Riyadh, Doha, London, and hundreds of cities worldwide.",
    path: "/locations/countries",
    lang,
    keywords:
      "AB locations, chauffeur service worldwide, luxury transportation countries, GCC transportation, Dubai limousine, Riyadh car service, global mobility network",
  });
}

export default async function LocationsCountriesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);

  const countries = await getAllCountries();

  // Translate country names for non-English locales
  if (needsTranslation(lang, "en")) {
    for (const country of countries) {
      country.name = await translateText(country.name, lang);
    }
  }

  return <CountriesClient dict={dict} lang={lang} countries={countries} />;
}
