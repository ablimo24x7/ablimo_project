import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import HeroInquiryForm from "@/app/[lang]/locations/_components/HeroInquiryForm";
import { getDictionary, hasLocale, defaultLocale, type Locale, localeBase, localeHome } from "@/app/[lang]/dictionaries";
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
    title: isAr ? dict.limousineService.title : "Limo Service Around the Globe",
    description: isAr
      ? dict.limousineService.subtitle
      : "Premium limousine service in cities worldwide. Book your luxury ride with AB for airport transfers, business travel, and special events.",
    path: "/limousine-service",
    lang,
    keywords: "limousine service, limo service, luxury limo, AB, executive limousine, wedding limo, prom limo, airport limo",
  });
}

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    titleKey: "trustedReliable" as const,
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    titleKey: "transparentPricing" as const,
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    titleKey: "professionalChauffeurs" as const,
  },
];


export default async function LimousineServicePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);

  return (
    <main className="min-h-screen bg-[#292a30] text-white">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden pt-24 pb-10">
        <Image
          src="https://images.unsplash.com/photo-1563720223185-11003d516935?w=1920&h=800&fit=crop"
          alt="Limousine Service"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#292a30]" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-white">
              {dict.limousineService.title}
            </h1>
            <p className="text-lg text-gray-300">
              {dict.limousineService.subtitle}
            </p>
          </div>
          <HeroInquiryForm dict={dict} />
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-8 py-6">
        <nav className="text-sm text-gray-400">
          <Link href={`${localeHome(lang)}`} className="hover:text-white transition-colors">
            {dict.limousineService.breadcrumb.home}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">{dict.limousineService.breadcrumb.limousineService}</span>
        </nav>
      </div>

      {/* Feature Cards */}
      <section className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const texts = dict.limousineService.features[feature.titleKey as keyof typeof dict.limousineService.features] as { title: string; desc: string };
            return (
              <div
                key={feature.titleKey}
                className="bg-[#1c1d21] p-8 rounded-2xl hover:bg-[#2a2c35] transition-colors"
              >
                <div className="text-gray-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{texts.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {texts.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Service Classes */}
      <section className="bg-[#1c1d21] py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {dict.limousineService.chooseClass}
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            {dict.limousineService.chooseClassDesc}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.values(dict.limousineService.vehicleClasses).map((vehicle) => (
              <div
                key={vehicle.title}
                className="bg-[#292a30] rounded-2xl overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{vehicle.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{vehicle.desc}</p>
                  <div className="flex gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                      {vehicle.passengers} {dict.common.passengers}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17 6h-2V3c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v3H7c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2 0 .55.45 1 1 1s1-.45 1-1h6c0 .55.45 1 1 1s1-.45 1-1c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z" />
                      </svg>
                      {vehicle.luggage} {dict.common.luggage}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Limo Service in the City */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&h=600&fit=crop"
              alt="Limo in City"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {dict.limousineService.limoCity.title}
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              {dict.limousineService.limoCity.desc}
            </p>
            <p className="text-gray-400 leading-relaxed">
              {dict.limousineService.limoCity.desc2}
            </p>
          </div>
        </div>
      </section>

      {/* Get Around with AB */}
      <section className="bg-[#1c1d21] py-20 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {dict.limousineService.getAround.title}
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              {dict.limousineService.getAround.desc}
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span className="text-gray-400">{dict.limousineService.getAround.available}</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span className="text-gray-400">{dict.limousineService.getAround.available247}</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span className="text-gray-400">{dict.limousineService.getAround.easyBooking}</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span className="text-gray-400">{dict.limousineService.getAround.consistent}</span>
              </li>
            </ul>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden order-1 lg:order-2">
            <Image
              src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=600&fit=crop"
              alt="AB Service"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Airport Limousine Service */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1606400142640-69e81d222bcb?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Airport Limousine"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {dict.limousineService.airportLimo.title}
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              {dict.limousineService.airportLimo.desc}
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span className="text-gray-400">{dict.limousineService.airportLimo.flightTracking}</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span className="text-gray-400">{dict.limousineService.airportLimo.meetGreet}</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span className="text-gray-400">{dict.limousineService.airportLimo.waitTime}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#1c1d21] py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {dict.limousineService.faq.title}
          </h2>
          <div className="space-y-4">
            {dict.limousineService.faq.items.map((item, index) => (
              <div
                key={index}
                className="bg-[#292a30] rounded-2xl overflow-hidden"
              >
                <details className="group">
                  <summary className="w-full p-6 text-left flex items-center justify-between hover:bg-[#2a2c35] transition-colors cursor-pointer list-none">
                    <h3 className="text-lg font-semibold pr-4">{item.q}</h3>
                    <svg
                      className="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed">
                    {item.a}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-8 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          {dict.limousineService.cta.title}
        </h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          {dict.limousineService.cta.desc}
        </p>
        <Link
          href={`${localeBase(lang)}/contact`}
          className="inline-block bg-white text-[#292a30] px-8 py-3 text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
        >
          {dict.limousineService.cta.bookYourLimo}
        </Link>
      </section>
    </main>
  );
}
