import type { Metadata } from "next";
import Link from "next/link";
import ServicePage, {
  buildServiceContent,
  type ServicePageTexts,
  type ServiceStructure,
} from "../_components/ServicePage";
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
    title: dict.servicePages.airportTransfers.metadata.title,
    description: dict.servicePages.airportTransfers.metadata.description,
  };
}

const structure: ServiceStructure = {
  heroImage:
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&h=800&fit=crop",
  featureIcons: [
    <svg key="1" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>,
    <svg key="2" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>,
    <svg key="3" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
  ],
  cardImages: [
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?w=800&h=500&fit=crop",
  ],
  sectionImages: [
    {
      image:
        "https://images.unsplash.com/photo-1473625247510-8ceb1760943f?w=800&h=600&fit=crop",
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
  const texts = dict.servicePages.airportTransfers as unknown as ServicePageTexts;

  return (
    <>
      <ServicePage
        params={params}
        content={buildServiceContent(texts, structure)}
        breadcrumb={texts.title}
      />
      <section className="max-w-7xl mx-auto px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dict.servicePages.airportTransfers.subLinks.map((link) => (
            <Link
              key={link.slug}
              href={`/${lang}/services/airport-transfers/${link.slug}`}
              className="bg-[#1c1d21] p-6 rounded-2xl hover:bg-[#2a2c35] transition-colors flex items-center justify-between"
            >
              <span className="font-semibold">{link.title}</span>
              <span className="text-abGold text-xl">&rarr;</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}