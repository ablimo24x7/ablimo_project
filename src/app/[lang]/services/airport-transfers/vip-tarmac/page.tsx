import type { Metadata } from "next";
import ServicePage, {
  buildServiceContent,
  type ServicePageTexts,
  type ServiceStructure,
} from "../../_components/ServicePage";
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
    title: dict.servicePages.airportTransferVipTarmac.metadata.title,
    description: dict.servicePages.airportTransferVipTarmac.metadata.description,
  };
}

const structure: ServiceStructure = {
  heroImage:
    "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?w=1920&h=800&fit=crop",
  cardImages: [
    "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=500&fit=crop",
  ],
  sectionImages: [
    {
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop",
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
  const texts = dict.servicePages.airportTransferVipTarmac as unknown as ServicePageTexts;

  return (
    <ServicePage
      params={params}
      content={buildServiceContent(texts, structure)}
      breadcrumb={texts.title}
    />
  );
}