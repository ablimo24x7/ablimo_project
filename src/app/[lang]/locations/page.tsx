import type { Metadata } from "next";
import {
  getDictionary,
  hasLocale,
  defaultLocale,
  type Locale,
} from "@/app/[lang]/dictionaries";
import { generateSeoMetadata } from "@/lib/seo";
import LocationsPage from "./_components/LocationsPage";

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
    title: isAr
      ? dict.locations.metadata.title
      : "Chauffeur Service Locations GCC: Where AB Operates in Saudi Arabia, the UAE and Qatar | AB",
    description: isAr
      ? dict.locations.metadata.description
      : "Coordinating executive travel across chauffeur service locations GCC. AB manages ground transportation networks across Saudi Arabia, the UAE and Qatar with 24/7 central dispatch in Riyadh and regional offices in Dubai, Abu Dhabi and Doha.",
    path: "/locations",
    lang,
    keywords:
      "chauffeur service locations GCC, ground transportation GCC, chauffeur service Saudi Arabia, chauffeur service UAE, chauffeur service Qatar, airport transfers Gulf, AB locations",
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return <LocationsPage lang={lang} />;
}
