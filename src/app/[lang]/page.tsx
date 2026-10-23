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
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const isAr = locale === "ar";

  return generateSeoMetadata({
    title: isAr
      ? "نقل الشركات والفعاليات في السعودية والإمارات وقطر | AB"
      : "Corporate & Event Transport in KSA, UAE & Qatar | AB",
    description: isAr
      ? "خدمات نقل وإدارة تنقل وسائقين ومطارات وفعاليات وحافلات ونقل فرق العمل في السعودية والإمارات وقطر. إرسال 24/7 من الرياض. اطلب عرض أسعار."
      : "Managed chauffeur, airport, event, bus and workforce transportation across Saudi Arabia, the UAE and Qatar. 24/7 dispatch from Riyadh. Request a proposal.",
    path: "",
    lang,
    keywords: isAr
      ? "نقل الشركات والفعاليات, خدمة سائق خاص, تنقل مؤسسي, نقل مطار, تأجير حافلات, نقل السعودية, نقل الإمارات, نقل قطر, نقل كبار الشخصيات, AB.Limo"
      : "corporate transportation, event transport, chauffeur service, Saudi Arabia, UAE, Qatar, airport transfer, bus coach hire, AB.Limo, workforce transport, VIP chauffeur",
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
      <EventLogisticsSection dict={dict} lang={lang} />
      <DutyOfCareSection dict={dict} />
      <FleetSection dict={dict} lang={lang} />
      <CountriesSection dict={dict} lang={lang} />
      <CitiesSection dict={dict} lang={lang} />
      <IndustrySolutionsSection dict={dict} lang={lang} />
      <HowItWorksSection dict={dict} lang={lang} />
      <CaseStudiesSection dict={dict} lang={lang} />
      <AwardsSection dict={dict} lang={lang} />
      <TellUsCtaSection dict={dict} lang={lang} />
      <FAQSection dict={dict} lang={lang} />
    </>
  );
}
