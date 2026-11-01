import type { Metadata } from "next";
import HeroSection from "@/app/[lang]/_components/HeroSection";
import EventLogisticsSection from "@/app/[lang]/_components/EventLogisticsSection";
import DutyOfCareSection from "@/app/[lang]/_components/DutyOfCareSection";
import FleetSection from "@/app/[lang]/_components/FleetSection";
import IndustrySolutionsSection from "@/app/[lang]/_components/IndustrySolutionsSection";
import { getDictionary, type Locale } from "./dictionaries";
import { generateSeoMetadata } from "@/lib/seo";
import { OrganizationJsonLd, LocalBusinessJsonLd, WebsiteJsonLd, HowToBookJsonLd } from "@/components/seo/StructuredData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return generateSeoMetadata({
    title: "AB.Limo | Premium Executive & Corporate Mobility Services",
    description:
      "AB.Limo provides premium chauffeur-driven transportation across the GCC and worldwide. Executive transfers, corporate mobility, event logistics, and airport services in Dubai, Riyadh, Doha, Abu Dhabi and 25+ cities.",
    path: "",
    lang,
    keywords:
      "luxury chauffeur service, executive transportation, corporate mobility, AB.Limo, airport transfer, premium limousine, GCC transportation, Dubai chauffeur, Riyadh executive travel, Doha limousine, business travel, VIP transportation, event logistics, wedding transportation",
  });
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <OrganizationJsonLd />
      <LocalBusinessJsonLd />
      <WebsiteJsonLd />
      <HowToBookJsonLd />
      <HeroSection dict={dict} />
      <EventLogisticsSection dict={dict} />
      <DutyOfCareSection dict={dict} />
      <FleetSection dict={dict} />
      <IndustrySolutionsSection dict={dict} />
    </>
  );
}
