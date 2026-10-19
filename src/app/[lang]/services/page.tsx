import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  getDictionary,
  hasLocale,
  defaultLocale,
  type Locale,
  localeBase,
  localeHome,
} from "@/app/[lang]/dictionaries";
import { getAllPublishedServices } from "@/lib/services";
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
    title: dict.services.metadata.title,
    description: dict.services.metadata.description,
    path: "/services",
    lang,
    keywords: "AB.Limo services, luxury chauffeur, executive transport, airport transfer, corporate mobility, event logistics",
  });
}

const pillars = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    ),
  },
];

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);

  const services = await getAllPublishedServices();

  return (
    <main className="min-h-screen bg-[#292a30] text-white">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden pt-24 pb-10">
        <Image
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&h=800&fit=crop"
          alt="Luxury Chauffeur Services"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#292a30]" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8">
          <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-abBlue/10 border border-abBlue/30 mb-6">
            <span className="w-2 h-2 rounded-full bg-abBlue animate-pulse"></span>
            <span className="text-abBlue text-xs font-bold tracking-widest uppercase">
              {dict.services.hero.badge}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-white">
            {dict.services.hero.titleStart}{" "}
            <span className="text-abBlue">{dict.services.hero.titleHighlight}</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
            {dict.services.hero.desc}
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-8 py-6">
        <nav className="text-sm text-gray-400">
          <Link href={`${localeHome(lang)}`} className="hover:text-white transition-colors">
            {dict.services.breadcrumb.home}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">{dict.services.breadcrumb.services}</span>
        </nav>
      </div>

      {/* Category Grid */}
      <section className="max-w-7xl mx-auto px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {dict.services.explore.title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {dict.services.explore.desc}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`${localeBase(lang)}/services/${service.slug}`}
              className="group bg-[#1c1d21] rounded-2xl overflow-hidden hover:bg-[#2a2c35] transition-colors"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.heroImage || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=500&fit=crop"}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1d21]/90 via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold">{service.title}</h3>
                  <span className="text-abBlue text-xl group-hover:translate-x-1 transition-transform">
                    &rarr;
                  </span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-[#1c1d21] py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {dict.services.pillars.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <div
                key={index}
                className="bg-[#292a30] p-8 rounded-2xl hover:bg-[#2a2c35] transition-colors"
              >
                <div className="text-abBlue mb-4">{pillar.icon}</div>
                <h3 className="text-xl font-bold mb-3">
                  {dict.services.pillars.items[index].title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {dict.services.pillars.items[index].desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-8 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          {dict.services.cta.title}
        </h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          {dict.services.cta.desc}
        </p>
        <Link
          href={`${localeBase(lang)}/services/chauffeur-vip`}
          className="inline-block bg-abBlue hover:bg-abServiceBlue text-white px-8 py-3 text-sm font-semibold rounded-full transition-colors shadow-lg shadow-abBlue/20"
        >
          {dict.services.cta.label}
        </Link>
      </section>
    </main>
  );
}
