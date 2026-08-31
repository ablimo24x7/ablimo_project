import type { Metadata } from "next";
import IndustryPage, {
  buildIndustryContent,
  type IndustryPageTexts,
  type IndustryStructure,
} from "../_components/IndustryPage";
import {
  getDictionary,
  hasLocale,
  defaultLocale,
  type Locale,
} from "@/app/[lang]/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  return {
    title: dict.industryPages.governmentDiplomatic.metadata.title,
    description: dict.industryPages.governmentDiplomatic.metadata.description,
  };
}

const structure: IndustryStructure = {
  heroImage:
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&h=800&fit=crop",
  featureIcons: [
    <svg key="1" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>,
    <svg key="2" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
    <svg key="3" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
  ],
  cardImages: [
    "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1573666207082-ce6870c58062?w=800&h=500&fit=crop",
  ],
  sectionImages: [
    {
      image: "https://images.unsplash.com/photo-1521790797515-4e522d54d311?w=800&h=600&fit=crop",
      dark: true,
    },
  ],
};

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  const texts = dict.industryPages.governmentDiplomatic as unknown as IndustryPageTexts;

  return (
    <IndustryPage
      params={params}
      content={buildIndustryContent(texts, structure)}
      breadcrumb={texts.title}
    />
  );
}