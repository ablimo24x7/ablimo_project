import type { Metadata } from "next";
import HeroSection from "@/app/[lang]/_components/HeroSection";
import EventLogisticsSection from "@/app/[lang]/_components/EventLogisticsSection";
import DutyOfCareSection from "@/app/[lang]/_components/DutyOfCareSection";
import FleetSection from "@/app/[lang]/_components/FleetSection";
import CountriesSection from "@/app/[lang]/_components/CountriesSection";
import CitiesSection from "@/app/[lang]/_components/CitiesSection";
import IndustrySolutionsSection from "@/app/[lang]/_components/IndustrySolutionsSection";
import { getDictionary, hasLocale, defaultLocale, type Locale } from "./dictionaries";
import { generateSeoMetadata } from "@/lib/seo";
import { OrganizationJsonLd, LocalBusinessJsonLd, WebsiteJsonLd, HowToBookJsonLd } from "@/components/seo/StructuredData";

export const revalidate = 3600;

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
      ? "AB.Limo - خدمة سائقين فاخرة تنفيذية ومؤسسية"
      : "AB.Limo | Premium Executive & Corporate Mobility Services",
    description: isAr
      ? "توفر AB.Limo خدمات نقل فاخرة بسائقين محترفين في دول الخليج والعالم. نقل تنفيذي، تنقل مؤسسي، لوجستيات فعاليات، وخدمات مطار في دبي والرياض والدوحة وأبوظبي وأكثر من 25 مدينة."
      : "AB.Limo provides premium chauffeur-driven transportation across the GCC and worldwide. Executive transfers, corporate mobility, event logistics, and airport services in Dubai, Riyadh, Doha, Abu Dhabi and 25+ cities.",
    path: "",
    lang,
    keywords: isAr
      ? "خدمة سائق فاخرة, نقل تنفيذي, تنقل مؤسسي, AB.Limo, نقل مطار, ليموزين فاخرة, نقل الخليج, سائق دبي, سفر تنفيذي الرياض, ليموزين الدوحة, سفر أعمال, نقل كبار الشخصيات, لوجستيات فعاليات, نقل زفاف"
      : "luxury chauffeur service, executive transportation, corporate mobility, AB.Limo, airport transfer, premium limousine, GCC transportation, Dubai chauffeur, Riyadh executive travel, Doha limousine, business travel, VIP transportation, event logistics, wedding transportation",
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
      <FleetSection dict={dict} lang={lang} />
      <CountriesSection dict={dict} lang={lang} />
      <CitiesSection dict={dict} lang={lang} />
      <IndustrySolutionsSection dict={dict} />
    </>
  );
}
