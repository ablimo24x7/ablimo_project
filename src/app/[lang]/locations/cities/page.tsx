import type { Metadata } from "next";
import { getDictionary, hasLocale, defaultLocale, type Locale } from "@/app/[lang]/dictionaries";
import { allCities } from "@/lib/locations";
import { getDynamicCityList } from "@/lib/locationData";
import { translateText, needsTranslation } from "@/lib/translate";
import CitiesClient from "../_components/CitiesClient";
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
    title: isAr ? dict.cities.meta.title : "All Cities | AB Premium Transportation in 25+ Cities",
    description: isAr
      ? dict.cities.meta.description
      : "AB serves 25+ cities across the GCC and worldwide. Find premium chauffeur services in Dubai, Riyadh, Doha, Abu Dhabi, Jeddah, Manama, Kuwait City, Muscat, and more.",
    path: "/locations/cities",
    lang,
    keywords:
      "AB cities, chauffeur service cities, luxury transportation Dubai, Riyadh limousine, Doha car service, Abu Dhabi chauffeur, GCC cities transportation",
  });
}

export default async function CitiesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);

  const dynamic = await getDynamicCityList();
  const cities = dynamic.length ? dynamic : allCities();

  // Translate city names for non-English locales
  if (needsTranslation(lang, "en")) {
    for (const item of cities) {
      item.city.name = await translateText(item.city.name, lang);
    }
  }

  return <CitiesClient dict={dict} lang={lang} cities={cities} />;
}
