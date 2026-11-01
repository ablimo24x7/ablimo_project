import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateSeoMetadata } from "@/lib/seo";
import { localeBase, localeHome } from "@/app/[lang]/dictionaries";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/StructuredData";
import { getIndustryData } from "../_components/industry-detail-data";
import IndustryDetailClient from "../_components/IndustryDetailClient";

const SLUG = "events-exhibitions";

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
      "exhibition transportation services, conference transportation, delegate transportation, exhibition shuttle service, summit transportation, corporate event transportation Dubai Riyadh Doha",
  });
}

export default async function EventsPage({
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
