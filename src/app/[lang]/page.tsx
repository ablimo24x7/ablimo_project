import type { Metadata } from "next";
import HeroSection from "@/app/[lang]/_components/HeroSection";
import EventLogisticsSection from "@/app/[lang]/_components/EventLogisticsSection";
import DutyOfCareSection from "@/app/[lang]/_components/DutyOfCareSection";
import FleetSection from "@/app/[lang]/_components/FleetSection";
import CountriesSection from "@/app/[lang]/_components/CountriesSection";
import CitiesSection from "@/app/[lang]/_components/CitiesSection";
import IndustrySolutionsSection from "@/app/[lang]/_components/IndustrySolutionsSection";
import HowItWorksSection from "@/app/[lang]/_components/HowItWorksSection";
import CaseStudiesSection from "@/app/[lang]/_components/CaseStudiesSection";
import AwardsSection from "@/app/[lang]/_components/AwardsSection";
import TellUsCtaSection from "@/app/[lang]/_components/TellUsCtaSection";
import FAQSection from "@/app/[lang]/_components/FAQSection";
import { getDictionary, hasLocale, defaultLocale, type Locale } from "./dictionaries";
import { generateSeoMetadata } from "@/lib/seo";
import { OrganizationJsonLd, LocalBusinessJsonLd, WebsiteJsonLd, HowToBookJsonLd } from "@/components/seo/StructuredData";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params?: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const resolvedParams = params ? await params : undefined;
  const lang = resolvedParams?.lang;
  const locale: Locale = lang && hasLocale(lang) ? lang : defaultLocale;
  const isAr = locale === "ar";

  return generateSeoMetadata({
    title: isAr
      ? "النقل المؤسسي ونقل الفعاليات في السعودية والإمارات وقطر"
      : "Corporate & Event Transport in KSA, UAE & Qatar | AB",
    description: isAr
      ? "خدمات نقل مُدارة تشمل السائق الخاص والمطارات والفعاليات والحافلات ونقل القوى العاملة في المملكة العربية السعودية والإمارات العربية المتحدة وقطر، مع توجيه على مدار الساعة من الرياض."
      : "Managed chauffeur, airport, event, bus and workforce transportation across Saudi Arabia, the UAE and Qatar. 24/7 dispatch from Riyadh. Request a proposal.",
    path: "",
    lang: locale,
    keywords: isAr
      ? "نقل الشركات والفعاليات, خدمة سائق خاص, تنقل مؤسسي, نقل مطار, تأجير حافلات, نقل السعودية, نقل الإمارات, نقل قطر, نقل كبار الشخصيات, AB"
      : "corporate transportation, event transport, chauffeur service, Saudi Arabia, UAE, Qatar, airport transfer, bus coach hire, AB, workforce transport, VIP chauffeur",
  });
}

export default async function Home({
  params,
}: {
  params?: Promise<{ lang?: string }>;
}) {
  const resolvedParams = params ? await params : undefined;
  const lang = resolvedParams?.lang;
  const locale: Locale = lang && hasLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);

  return (
    <>
      <OrganizationJsonLd />
      <LocalBusinessJsonLd />
      <WebsiteJsonLd />
      <HowToBookJsonLd />
      <HeroSection dict={dict} lang={locale} />
      <EventLogisticsSection dict={dict} lang={locale} />
      <IndustrySolutionsSection dict={dict} lang={locale} />
      <HowItWorksSection dict={dict} lang={locale} />
      <DutyOfCareSection dict={dict} />
      <FleetSection dict={dict} lang={locale} />
      <CountriesSection dict={dict} lang={locale} />
      <CitiesSection dict={dict} lang={locale} />
      <CaseStudiesSection dict={dict} lang={locale} />
      <AwardsSection dict={dict} lang={locale} />
      <TellUsCtaSection dict={dict} lang={locale} />
      <FAQSection dict={dict} lang={locale} />
    </>
  );
}
