import { notFound } from "next/navigation";
import { getIndustryData } from "./industry-detail-data";
import IndustryDetailClient from "./IndustryDetailClient";

export { default as IndustryDetailClient } from "./IndustryDetailClient";
export * from "./industry-detail-data";

interface LegacyIndustryPageProps {
  params: Promise<{ lang: string }>;
  content?: unknown;
  breadcrumb?: string;
  slug?: string;
}

export default async function IndustryPage({
  params,
  slug,
}: LegacyIndustryPageProps) {
  const { lang } = await params;
  const industrySlug = slug || "aviation";
  const data = getIndustryData(industrySlug, lang);

  if (!data) notFound();

  return <IndustryDetailClient data={data} lang={lang} />;
}
