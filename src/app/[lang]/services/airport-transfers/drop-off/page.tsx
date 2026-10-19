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
  localeBase,
} from "@/app/[lang]/dictionaries";
import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  return generateSeoMetadata({
    title: dict.servicePages.airportTransferDropOff.metadata.title,
    description: dict.servicePages.airportTransferDropOff.metadata.description,
    path: "/services/airport-transfers/drop-off",
    lang,
    keywords: "airport drop-off service, luxury airport transfer, chauffeur airport drop-off, AB.Limo airport",
  });
}

const structure: ServiceStructure = {
  heroImage:
    "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=1920&h=800&fit=crop",
  cardImages: [
    "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop",
  ],
  sectionImages: [
    {
      image:
        "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop",
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
  const texts = dict.servicePages.airportTransferDropOff as unknown as ServicePageTexts;

  return (
    <ServicePage
      params={params}
      content={buildServiceContent(texts, structure)}
      breadcrumb={texts.title}
      serviceName={texts.title}
      serviceUrl={`${localeBase(lang)}/services/airport-transfers/drop-off`}
    />
  );
}