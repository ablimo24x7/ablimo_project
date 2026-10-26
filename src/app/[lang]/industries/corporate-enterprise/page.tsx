import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateSeoMetadata } from "@/lib/seo";
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
      "corporate mobility, executive chauffeur service, business travel GCC, staff transport, investor roadshows, corporate fleet",
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

  return <IndustryDetailClient data={data} lang={lang} />;
}