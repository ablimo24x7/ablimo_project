import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getDictionary, hasLocale, defaultLocale, type Locale, localeHome } from "@/app/[lang]/dictionaries";
import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  const isAr = locale === "ar";
  return generateSeoMetadata({
    title: isAr ? dict.sustainability.meta.title : "Sustainability - Driving a Greener Future",
    description: isAr
      ? dict.sustainability.meta.description
      : "AB is committed to sustainability through electric vehicles, carbon offsetting, and net-zero initiatives. Learn about our journey towards a greener future.",
    path: "/sustainability",
    lang,
    keywords: "AB sustainability, green transportation, electric vehicles, carbon offset, net zero, eco-friendly limousine",
  });
}

export default async function SustainabilityPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  const sustainabilityStepIcons = [
    <svg key="ev" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>,
    <svg key="co" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
    <svg key="nz" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a1.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>,
  ];

  const sustainabilitySteps = dict.sustainability.commitment.steps.map(
    (step: { title: string; desc: string }, i: number) => ({
      icon: sustainabilityStepIcons[i],
      title: step.title,
      description: step.desc,
    })
  );

  const partnerImages = [
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80",
  ];

  const partners = dict.sustainability.partners.items.map(
    (item: { name: string; desc: string }, i: number) => ({
      name: item.name,
      description: item.desc,
      image: partnerImages[i],
    })
  );

  const stats = [
    { number: "100%", label: dict.sustainability.stats.carbonOffset },
    { number: "45%", label: dict.sustainability.stats.evFleet },
    { number: "2040", label: dict.sustainability.stats.netZero },
    { number: "60+", label: dict.sustainability.stats.countries },
  ];

  return (
    <main className="min-h-screen bg-[#292a30] text-white">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&h=1080&fit=crop"
          alt="Driving a Greener Future"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#292a30]/70 via-[#292a30]/50 to-[#292a30]" />
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-300 mb-4">
            <Link href={`${localeHome(lang)}`} className="hover:text-white transition-colors">
              {dict.sustainability.breadcrumb.home}
            </Link>
            <span>/</span>
            <span className="text-white">{dict.sustainability.breadcrumb.sustainability}</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
            {dict.sustainability.hero.heading1}
            <br />
            <span className="italic font-light text-gray-300">{dict.sustainability.hero.heading2}</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            {dict.sustainability.hero.desc}
          </p>
          <Link
            href="#"
            className="inline-block bg-white text-[#292a30] font-semibold px-8 py-4 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {dict.sustainability.hero.button}
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#1e1f24]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The New Normal - EVs */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              {dict.sustainability.ev.heading1}
              <br />
              <span className="italic font-light text-gray-300">{dict.sustainability.ev.heading2}</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              {dict.sustainability.ev.p1}
            </p>
            <p className="text-gray-400 leading-relaxed">
              {dict.sustainability.ev.p2}
            </p>
          </div>
          <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=600&fit=crop"
              alt="Electric vehicle charging"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 100% Carbon Offset */}
      <section className="py-24 px-4 bg-[#1e1f24]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden order-2 md:order-1">
            <Image
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop"
              alt="Carbon offsetting nature"
              fill
              className="object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              {dict.sustainability.carbonOffset.heading1}
              <br />
              <span className="italic font-light text-gray-300">{dict.sustainability.carbonOffset.heading2}</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              {dict.sustainability.carbonOffset.p1}
            </p>
            <p className="text-gray-400 leading-relaxed">
              {dict.sustainability.carbonOffset.p2}
            </p>
          </div>
        </div>
      </section>

      {/* Sustainability Partners */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 leading-tight">
            {dict.sustainability.partners.heading1}
            <br />
            <span className="italic font-light text-gray-300">{dict.sustainability.partners.heading2}</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="bg-[#35363c] rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-300 group"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3">{partner.name}</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {partner.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Features */}
      <section className="py-24 px-4 bg-[#1e1f24]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 leading-tight">
            {dict.sustainability.commitment.heading1}
            <br />
            <span className="italic font-light text-gray-300">{dict.sustainability.commitment.heading2}</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {sustainabilitySteps.map((step) => (
              <div
                key={step.title}
                className="bg-[#292a30] p-8 rounded-xl border border-gray-700/50 hover:border-gray-500/50 transition-all duration-300"
              >
                <div className="text-white mb-6">{step.icon}</div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Participating in Climate Strikes */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              {dict.sustainability.climateStrikes.heading1}
              <br />
              <span className="italic font-light text-gray-300">{dict.sustainability.climateStrikes.heading2}</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              {dict.sustainability.climateStrikes.p1}
            </p>
            <p className="text-gray-400 leading-relaxed">
              {dict.sustainability.climateStrikes.p2}
            </p>
          </div>
          <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&h=600&fit=crop"
              alt="Climate action"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* CEO Quote */}
      <section className="py-24 px-4 bg-[#1e1f24]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl text-gray-700 mb-8">&ldquo;</div>
          <blockquote className="text-2xl md:text-3xl font-light leading-relaxed mb-8 italic">
            {dict.sustainability.quote.text}
          </blockquote>
          <div>
            <p className="font-semibold text-lg">{dict.sustainability.quote.name}</p>
            <p className="text-gray-400 text-sm">{dict.sustainability.quote.subtitle}</p>
          </div>
        </div>
      </section>

      {/* App Download */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop"
              alt="AB mobile app"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              {dict.sustainability.app.heading1}
              <br />
              <span className="italic font-light text-gray-300">{dict.sustainability.app.heading2}</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              {dict.sustainability.app.desc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#"
                className="inline-flex items-center justify-center bg-white text-[#292a30] font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                {dict.sustainability.app.appStore}
              </Link>
              <Link
                href="#"
                className="inline-flex items-center justify-center bg-white text-[#292a30] font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302-2.713-2.302 2.713-2.302zM5.864 3.457L16.8 9.79l-2.302 2.302-8.634-8.635z" />
                </svg>
                {dict.sustainability.app.googlePlay}
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
