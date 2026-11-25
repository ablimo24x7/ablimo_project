import type { Metadata } from "next";
import { getDictionary, hasLocale, defaultLocale, type Locale } from "@/app/[lang]/dictionaries";
import PartnersClient from "@/app/[lang]/partners/_components/PartnersClient";
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
    title: isAr ? dict.partners.meta.title : "Strategic Partners & Alliances | AB Global Network",
    description: isAr
      ? dict.partners.meta.description
      : "AB partners with leading airlines, hotels, and travel companies worldwide. Explore our strategic partnerships delivering seamless premium mobility experiences.",
    path: "/partners",
    lang,
    keywords:
      "AB partners, strategic alliances, airline partnerships, hotel partnerships, travel company partnerships, mobility network, luxury transportation partners",
  });
}

export default async function PartnersPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);

  return <PartnersClient dict={dict} lang={lang} />;
}
