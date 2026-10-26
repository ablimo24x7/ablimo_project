import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
    title: isAr ? dict.strategicPartnerships.meta.title : "Partnership Opportunities with AB",
    description: isAr
      ? dict.strategicPartnerships.meta.description
      : "Explore strategic partnership opportunities with AB. Join forces with a leading luxury chauffeur service across aviation, cruise, financial, and hotel sectors.",
    path: "/strategic-partnerships",
    lang,
    keywords: "AB partnerships, strategic alliances, aviation partnership, hotel partnership, luxury transport collaboration",
  });
}

export default async function StrategicPartnershipsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  const partnershipCardImages = [
    "/Aviation.png",
    "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
  ];

  const partnershipCardIcons = ["✈️", "🚢", "💼", "🏨"];

  const partnershipCards = dict.strategicPartnerships.industries.cards.map(
    (card: { title: string; desc: string }, i: number) => ({
      title: card.title,
      description: card.desc,
      image: partnershipCardImages[i],
      icon: partnershipCardIcons[i],
    })
  );

  const benefitIcons = ["📈", "🤝", "🔧", "📊", "🌍", "🛡️"];

  const benefits = dict.strategicPartnerships.benefits.items.map(
    (item: { title: string; desc: string }, i: number) => ({
      icon: benefitIcons[i],
      title: item.title,
      description: item.desc,
    })
  );

  const apiFeatures = dict.strategicPartnerships.api.items;

  const awards = dict.strategicPartnerships.awards.items.map(
    (item: { title: string; year: string; org: string }) => ({
      title: item.title,
      year: item.year,
      organization: item.org,
    })
  );

  return (
    <main className="min-h-screen bg-[#292a30] text-white">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop"
          alt="Strategic partnerships"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#292a30]/80 via-[#292a30]/60 to-[#292a30]" />
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-300 mb-4">
            <Link href={`${localeHome(lang)}`} className="hover:text-white transition-colors">
              {dict.strategicPartnerships.breadcrumb.home}
            </Link>
            <span>/</span>
            <span className="text-white">{dict.strategicPartnerships.breadcrumb.partnerships}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
            {dict.strategicPartnerships.hero.heading}
          </h1>
        </div>
      </section>

      {/* Partnership Cards */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {dict.strategicPartnerships.industries.heading}
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            {dict.strategicPartnerships.industries.desc}
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {partnershipCards.map((card) => (
              <div
                key={card.title}
                className="bg-[#35363c] rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="relative h-56">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 w-12 h-12 bg-[#292a30]/80 rounded-full flex items-center justify-center">
                    <span className="text-2xl">{card.icon}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 px-4 bg-[#1e1f24]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {dict.strategicPartnerships.benefits.heading}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-[#35363c] p-6 rounded-xl text-center hover:bg-[#3d3e45] transition-colors"
              >
                <span className="text-3xl mb-4 block">{benefit.icon}</span>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Integrations */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {dict.strategicPartnerships.api.heading}
            </h2>
            <p className="text-gray-400 mb-8">
              {dict.strategicPartnerships.api.desc}
            </p>
            <ul className="space-y-4">
              {apiFeatures.map((feature: string) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#35363c] rounded-2xl p-8">
            <div className="bg-[#1e1f24] rounded-xl p-6 font-mono text-sm">
              <p className="text-gray-500 mb-2">{dict.strategicPartnerships.api.codeComment}</p>
              <p className="text-green-400">const</p>{" "}
              <span className="text-blue-400">response</span>{" "}
              <span className="text-white">=</span>{" "}
              <span className="text-green-400">await</span>{" "}
              <span className="text-blue-400">fetch</span>
              <span className="text-white">(</span>
              <span className="text-yellow-300">
                &apos;/api/v1/bookings&apos;
              </span>
              <span className="text-white">, {"{"}</span>
              <p className="ml-4 text-gray-300">method: &apos;POST&apos;,</p>
              <p className="ml-4 text-gray-300">
                headers: {"{"} Authorization: &apos;Bearer token&apos; {"}"}
              </p>
              <span className="text-white">{"}"}</span>
              <span className="text-white">)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-20 px-4 bg-[#1e1f24]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {dict.strategicPartnerships.awards.heading}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {awards.map((award) => (
              <div
                key={award.title}
                className="bg-[#35363c] p-8 rounded-xl text-center"
              >
                <div className="w-16 h-16 bg-[#292a30] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{award.title}</h3>
                <p className="text-gray-400 text-sm">{award.organization}</p>
                <p className="text-gray-500 text-sm mt-1">{award.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {dict.strategicPartnerships.cta.heading}
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            {dict.strategicPartnerships.cta.desc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#contact"
              className="inline-block bg-white text-[#292a30] font-semibold px-8 py-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {dict.strategicPartnerships.cta.contact}
            </Link>
            <Link
              href="#"
              className="inline-block border border-gray-600 text-white font-semibold px-8 py-4 rounded-lg hover:border-gray-400 transition-colors"
            >
              {dict.strategicPartnerships.cta.download}
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 px-4 bg-[#1e1f24]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {dict.strategicPartnerships.contact.heading}
          </h2>
          <p className="text-gray-400 text-center mb-12">
            {dict.strategicPartnerships.contact.desc}
          </p>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder={dict.strategicPartnerships.contact.firstName}
                className="w-full bg-[#35363c] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
              />
              <input
                type="text"
                placeholder={dict.strategicPartnerships.contact.lastName}
                className="w-full bg-[#35363c] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>
            <input
              type="email"
              placeholder={dict.strategicPartnerships.contact.email}
              className="w-full bg-[#35363c] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
            />
            <input
              type="text"
              placeholder={dict.strategicPartnerships.contact.company}
              className="w-full bg-[#35363c] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
            />
            <select className="w-full bg-[#35363c] border border-gray-600 rounded-lg px-4 py-3 text-gray-400 focus:outline-none focus:border-gray-400 transition-colors">
              <option value="">{dict.strategicPartnerships.contact.industry}</option>
              {dict.strategicPartnerships.contact.industries.map((ind: string) => (
                <option key={ind} value={ind.toLowerCase().replace(/ & /g, "-")}>
                  {ind}
                </option>
              ))}
            </select>
            <textarea
              placeholder={dict.strategicPartnerships.contact.message}
              rows={5}
              className="w-full bg-[#35363c] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors resize-none"
            />
            <button
              type="submit"
              className="w-full bg-white text-[#292a30] font-semibold py-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {dict.strategicPartnerships.contact.submit}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
