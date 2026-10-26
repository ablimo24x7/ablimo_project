import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateSeoMetadata } from "@/lib/seo";
import { getIndustryData } from "../_components/industry-detail-data";
import IndustryDetailClient from "../_components/IndustryDetailClient";

const SLUG = "aviation";

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
      "aviation ground transport, FBO transfers, flight crew transportation, airport VIP meet and greet, AB GCC aviation",
  });
}

export default async function AviationPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const data = getIndustryData(SLUG);
  if (!data) notFound();

  return <IndustryDetailClient data={data} lang={lang} />;
}