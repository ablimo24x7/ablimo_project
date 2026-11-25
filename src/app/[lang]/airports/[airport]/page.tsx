import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { getAirportData, ALL_AIRPORTS } from "@/lib/airports-data";
import { generateSeoMetadata } from "@/lib/seo";
import AirportPageClient from "@/components/airports/AirportPageClient";

interface PageProps {
  params: Promise<{ lang: string; airport: string }>;
}

export async function generateStaticParams() {
  const languages = ["en-US", "en-GB", "ar"];
  const params: Array<{ lang: string; airport: string }> = [];
  for (const lang of languages) {
    for (const a of ALL_AIRPORTS) {
      params.push({ lang, airport: a.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, airport } = await params;
  const data = getAirportData(airport);
  if (!data) return {};

  const cleanDesc = data.heroDescription
    .replace(/\n+/g, " ")
    .slice(0, 160)
    .trim();

  return generateSeoMetadata({
    title: `${data.name} Transfers | AB Chauffeur Service ${data.cityName}`,
    description: cleanDesc,
    path: `/airports/${data.slug}`,
    lang,
    keywords: `${data.name}, ${data.iata} airport transfer, ${data.iata} chauffeur, private airport driver ${data.cityName}, luxury airport pickup ${data.cityName}`,
  });
}

export default async function AirportDetailPage({ params }: PageProps) {
  const { lang, airport } = await params;
  const data = getAirportData(airport);
  if (!data) notFound();

  const dict = await getDictionary(lang as "en-US" | "en-GB" | "ar");

  return <AirportPageClient data={data} lang={lang} dict={dict} />;
}

