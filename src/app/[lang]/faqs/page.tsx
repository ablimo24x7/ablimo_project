import type { Metadata } from "next";
import { faqData, FAQ_SCHEMA } from "./faqData";
import { FaqsClient } from "./FaqsClient";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { generateSeoMetadata } from "@/lib/seo";
import { localeHome } from "@/app/[lang]/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isAr = lang === "ar";
  return generateSeoMetadata({
    title: isAr
      ? "الأسئلة الشائعة | AB للسفر المؤسسي ولوجستيات الفعاليات"
      : "Enterprise Mobility FAQs | AB Corporate Travel & Event Logistics",
    description: isAr
      ? "قاعدة معرفية شاملة لخدمات التنقل المؤسسي من AB. تعرف على إجابات أسعار السائقين ونقل المطار والنقل المؤسسي ولوجستيات الفعاليات وقدرات الأسطول في الخليج."
      : "Comprehensive knowledge base for AB's B2B mobility services. Find answers regarding chauffeur pricing, airport transfers, corporate transportation, event logistics, and GCC fleet capabilities.",
    path: "/faqs",
    lang,
    keywords:
      "AB FAQ, chauffeur cost Riyadh, airport transfer Saudi Arabia, corporate transportation GCC, event logistics, VIP fleet vehicles, meet and greet airport",
  });
}

export default async function FaqsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isAr = lang === "ar";
  const locale = isAr ? "ar" : "en";
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${localeHome(lang)}` },
          { name: "FAQs", url: `${localeHome(lang).replace(/\/$/, "")}/faqs` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(FAQ_SCHEMA),
        }}
      />
      <FaqsClient faqs={faqData} lang={lang} />
    </>
  );
}
