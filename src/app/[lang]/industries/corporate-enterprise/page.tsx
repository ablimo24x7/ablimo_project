import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateSeoMetadata } from "@/lib/seo";
import { localeBase, localeHome } from "@/app/[lang]/dictionaries";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/StructuredData";
import { getIndustryData } from "../_components/industry-detail-data";
import IndustryDetailClient from "../_components/IndustryDetailClient";

const SLUG = "corporate-enterprise";

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
      "corporate ground transportation, executive transportation services, corporate chauffeur hire, roadshow transportation, employee transportation service, corporate chauffeur service Riyadh Dubai Doha",
  });
}

export default async function CorporatePage({
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
