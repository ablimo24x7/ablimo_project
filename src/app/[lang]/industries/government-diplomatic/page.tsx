import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateSeoMetadata } from "@/lib/seo";
import { localeBase, localeHome } from "@/app/[lang]/dictionaries";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/StructuredData";
import { getIndustryData } from "../_components/industry-detail-data";
import IndustryDetailClient from "../_components/IndustryDetailClient";

const SLUG = "government-diplomatic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isAr = lang === "ar";
  const data = getIndustryData(SLUG, lang);
  if (!data) return {};

  return generateSeoMetadata({
    title: data.title,
    description: data.heroP,
    path: `/industries/${SLUG}`,
    lang,
    keywords: isAr
      ? "نقل دبلوماسي, خدمات نقل حكومي, نقل وفود, نقل مراسم, سائق خاص للسفارات, نقل كبار الشخصيات الرياض أبوظبي قطر"
      : "diplomatic transportation, government transportation services, delegation transport, protocol transportation, embassy chauffeur service, VIP transport Riyadh Abu Dhabi Qatar",
  });
}

export default async function GovernmentPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isAr = lang === "ar";
  const data = getIndustryData(SLUG, lang);
  if (!data) notFound();

  const base = localeBase(lang);
  const home = localeHome(lang);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: isAr ? "الرئيسية" : "Home", url: home },
          { name: isAr ? "القطاعات" : "Industries", url: `${base}/industries` },
          { name: data.badge, url: `${base}/industries/${SLUG}` },
        ]}
      />
      <FAQJsonLd
        items={data.faqs.map((faq) => ({
          question: faq.q,
          answer: faq.a,
        }))}
      />
      <IndustryDetailClient data={data} lang={lang} />
    </>
  );
}
