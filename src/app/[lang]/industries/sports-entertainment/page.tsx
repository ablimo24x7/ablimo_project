import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateSeoMetadata } from "@/lib/seo";
import { localeBase, localeHome } from "@/app/[lang]/dictionaries";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/StructuredData";
import { getIndustryData } from "../_components/industry-detail-data";
import IndustryDetailClient from "../_components/IndustryDetailClient";

const SLUG = "sports-entertainment";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const data = getIndustryData(SLUG);
  if (!data) return {};

  return generateSeoMetadata({
    title: data.title,
    description: data.heroP,
    path: `/industries/${SLUG}`,
    lang,
    keywords:
      "sports team transportation, fan shuttle service, concert transportation, athletic team travel, luxury bus rental Dubai, group transportation Qatar, coach hire Qatar",
  });
}

export default async function SportsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const data = getIndustryData(SLUG);
  if (!data) notFound();

  const base = localeBase(lang);
  const home = localeHome(lang);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: home },
          { name: "Industries", url: `${base}/industries` },
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
