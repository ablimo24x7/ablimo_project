import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  getDictionary,
  hasLocale,
  defaultLocale,
  type Locale,
  type Dictionary,
} from "@/app/[lang]/dictionaries";

export const metadata: Metadata = {
  title: "Global Chauffeur Services for Travel Agencies | AB.Limo",
  description:
    "Partner with AB.Limo to offer your clients world-class chauffeur services. Earn commission and boost your brand reputation.",
};

export default async function TravelAgenciesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  const t = (dict as any).travelAgencies;

  const imageGridItems = t.imageGrid;

  const commissionItems = t.commission.items;

  const benefits = t.benefits.items;

  const fleetHighlights = t.vehicles.items;

  const apiFeatures = t.api.items;

  const faqs = t.faq.items;

  return (
    <main className="min-h-screen bg-[#292a30]">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&h=1080&fit=crop"
          alt="Travel agency chauffeur services"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#292a30]/80 via-[#292a30]/60 to-[#292a30]" />
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <p className="text-gray-400 text-sm tracking-widest uppercase mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              {t.breadcrumb.home}
            </Link>{" "}
            &gt; {t.breadcrumb.travelAgencies}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {t.hero.heading}
          </h1>
        </div>
      </section>

      {/* Image Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {imageGridItems.map((title: string) => (
              <div
                key={title}
                className="relative h-64 rounded-xl overflow-hidden group"
              >
                <Image
                  src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600&h=400&fit=crop"
                  alt={title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#292a30] via-transparent to-transparent" />
                <p className="absolute bottom-4 left-4 font-semibold">
                  {title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-16 px-4 bg-[#1e1f24]">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-xl md:text-2xl font-light italic text-gray-200 leading-relaxed">
            &ldquo;{t.quote.text}&rdquo;
          </blockquote>
          <p className="text-gray-400 mt-6">
            {t.quote.attribution}
          </p>
        </div>
      </section>

      {/* Additional Revenue and Commission */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t.commission.heading}
            </h2>
            <p className="text-gray-400 mb-8">
              {t.commission.desc}
            </p>
            <ul className="space-y-4">
              {commissionItems.map((item: string) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop"
              alt="Revenue and commission"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Vehicles Ready for All Occasions */}
      <section className="py-20 px-4 bg-[#1e1f24]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {t.vehicles.heading}
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            {t.vehicles.desc}
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {fleetHighlights.map(
              (item: { title: string; desc: string }) => (
                <div key={item.title} className="bg-[#35363c] p-8 rounded-xl">
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Deliver Top-Notch Client Satisfaction */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 rounded-2xl overflow-hidden order-2 md:order-1">
            <Image
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop"
              alt="Client satisfaction"
              fill
              className="object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t.satisfaction.heading}
            </h2>
            <p className="text-gray-400 mb-6">
              {t.satisfaction.desc}
            </p>
            <ul className="space-y-3 text-gray-300">
              {t.satisfaction.items.map((item: string) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="text-green-400">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Boost Your Brand Reputation */}
      <section className="py-20 px-4 bg-[#1e1f24]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t.reputation.heading}
            </h2>
            <p className="text-gray-400 mb-6">
              {t.reputation.desc}
            </p>
            <ul className="space-y-3 text-gray-300">
              {t.reputation.items.map((item: string) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="text-green-400">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1552581234-26160f608093?w=600&h=400&fit=crop"
              alt="Brand reputation"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t.fleet.heading}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-72 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80"
                alt="Executive sedan"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-[#292a30]/80 px-4 py-2 rounded-lg">
                <p className="font-semibold">{t.fleet.sedans.title}</p>
                <p className="text-gray-400 text-sm">
                  {t.fleet.sedans.desc}
                </p>
              </div>
            </div>
            <div className="relative h-72 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&h=500&fit=crop"
                alt="Luxury SUV"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-[#292a30]/80 px-4 py-2 rounded-lg">
                <p className="font-semibold">{t.fleet.suvs.title}</p>
                <p className="text-gray-400 text-sm">
                  {t.fleet.suvs.desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Integrations */}
      <section className="py-20 px-4 bg-[#1e1f24]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            {t.api.heading}
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            {t.api.desc}
          </p>
          <div className="bg-[#35363c] rounded-2xl p-8">
            <ul className="space-y-4">
              {apiFeatures.map((feature: string) => (
                <li key={feature} className="flex items-center gap-3">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t.benefits.heading}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map(
              (benefit: { title: string; desc: string }) => (
                <div
                  key={benefit.title}
                  className="bg-[#35363c] p-6 rounded-xl text-center hover:bg-[#3d3e45] transition-colors"
                >
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm">{benefit.desc}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 px-4 bg-[#1e1f24]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {t.contact.heading}
          </h2>
          <p className="text-gray-400 text-center mb-12">
            {t.contact.desc}
          </p>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder={t.contact.firstName}
                className="w-full bg-[#35363c] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
              />
              <input
                type="text"
                placeholder={t.contact.lastName}
                className="w-full bg-[#35363c] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>
            <input
              type="email"
              placeholder={t.contact.email}
              className="w-full bg-[#35363c] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
            />
            <input
              type="text"
              placeholder={t.contact.agency}
              className="w-full bg-[#35363c] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
            />
            <textarea
              placeholder={t.contact.message}
              rows={5}
              className="w-full bg-[#35363c] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors resize-none"
            />
            <button
              type="submit"
              className="w-full bg-white text-[#292a30] font-semibold py-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {t.contact.submit}
            </button>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t.faq.heading}
          </h2>
          <div className="space-y-4">
            {faqs.map(
              (faq: { q: string; a: string }) => (
                <div
                  key={faq.q}
                  className="bg-[#35363c] rounded-xl overflow-hidden"
                >
                  <details className="group">
                    <summary className="w-full p-6 text-left flex items-center justify-between hover:bg-[#3d3e45] transition-colors cursor-pointer list-none">
                      <h3 className="text-lg font-semibold pr-4">{faq.q}</h3>
                      <svg
                        className="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 group-open:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-6 pb-6 text-gray-400">
                      {faq.a}
                    </div>
                  </details>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
