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
      : "Where AB operates in Saudi Arabia, the UAE and Qatar | AB",
    description: isAr
      ? dict.locations.metadata.description
      : "AB plans and runs chauffeur and ground transportation across the Gulf for business delegations, executive travellers, diplomatic missions and corporate events. Direct operations in Saudi Arabia, the UAE and Qatar.",
    path: "/locations",
    lang,
    keywords:
      "AB locations, Gulf chauffeur service, luxury ground transportation Saudi Arabia, UAE executive car, Qatar protocol transport, GCC fleet network, Riyadh Dubai Doha chauffeur",
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
