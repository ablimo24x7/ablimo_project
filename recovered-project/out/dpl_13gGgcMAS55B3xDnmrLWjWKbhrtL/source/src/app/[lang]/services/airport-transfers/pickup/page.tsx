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
    title: dict.servicePages.airportTransferPickup.metadata.title,
    description: dict.servicePages.airportTransferPickup.metadata.description,
    path: "/services/airport-transfers/pickup",
    lang,
    keywords: "airport pickup service, luxury airport transfer, chauffeur airport pickup, AB.Limo airport",
  });
}

const structure: ServiceStructure = {
  heroImage:
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&h=800&fit=crop",
  cardImages: [
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=500&fit=crop",
  ],
  sectionImages: [
    {
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
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
  const texts = dict.servicePages.airportTransferPickup as unknown as ServicePageTexts;

  return (
    <ServicePage
      params={params}
      content={buildServiceContent(texts, structure)}
      breadcrumb={texts.title}
      serviceName={texts.title}
      serviceUrl={`/${lang}/services/airport-transfers/pickup`}
    />
  );
}