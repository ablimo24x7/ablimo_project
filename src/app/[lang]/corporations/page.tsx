import Link from "next/link";
import Image from "next/image";
import { getDictionary, hasLocale, defaultLocale, type Locale } from "@/app/[lang]/dictionaries";

const gridImages = [
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80",
];

const benefitIcons = ["🕐", "🌐", "💳", "📱", "🚗", "🛡️"];
const awardIcon = "🏆";

export default async function CorporationsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);

  return (
    <main className="min-h-screen bg-[#292a30]">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1920&h=1080&fit=crop"
          alt="Corporate travel solutions"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#292a30]/80 via-[#292a30]/60 to-[#292a30]" />
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <p className="text-gray-400 text-sm tracking-widest uppercase mb-4">
            {dict.corporations.breadcrumb.home} &gt; {dict.corporations.breadcrumb.corporations}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {dict.corporations.hero.heading}
          </h1>
        </div>
      </section>

      {/* Image Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {dict.corporations.imageGrid.map((title, index) => (
              <div
                key={index}
                className="relative h-64 rounded-xl overflow-hidden group"
              >
                <Image
                  src={gridImages[index]}
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
            &ldquo;{dict.corporations.quote.text}&rdquo;
          </blockquote>
          <p className="text-gray-400 mt-6">
            {dict.corporations.quote.attribution}
          </p>
        </div>
      </section>

      {/* A New Level of Chauffeur Reliability */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {dict.corporations.reliability.heading}
            </h2>
            <p className="text-gray-400 mb-8">
              {dict.corporations.reliability.desc}
            </p>
            <ul className="space-y-4">
              {dict.corporations.reliability.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop"
              alt="Reliable chauffeur service"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* A Relief from Chasing Invoices */}
      <section className="py-20 px-4 bg-[#1e1f24]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 rounded-2xl overflow-hidden order-2 md:order-1">
            <Image
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop"
              alt="Simplified invoicing"
              fill
              className="object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {dict.corporations.invoices.heading}
            </h2>
            <p className="text-gray-400 mb-8">
              {dict.corporations.invoices.desc}
            </p>
            <ul className="space-y-4">
              {dict.corporations.invoices.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Booking for Executives */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {dict.corporations.booking.heading}
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            {dict.corporations.booking.desc}
          </p>
          <div className="relative h-64 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&h=400&fit=crop"
              alt="Booking platform"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* By the Hour */}
      <section className="py-20 px-4 bg-[#1e1f24]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {dict.corporations.hourly.heading}
            </h2>
            <p className="text-gray-400 mb-6">
              {dict.corporations.hourly.desc}
            </p>
            <ul className="space-y-3 text-gray-300">
              {dict.corporations.hourly.items.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="text-green-400">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=600&h=400&fit=crop"
              alt="By the hour chauffeur service"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {dict.corporations.awards.heading}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {dict.corporations.awards.items.map((award, index) => (
              <div
                key={index}
                className="bg-[#35363c] p-8 rounded-xl text-center"
              >
                <div className="w-16 h-16 bg-[#292a30] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{awardIcon}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{award.title}</h3>
                <p className="text-gray-400 text-sm">{award.org}</p>
                <p className="text-gray-500 text-sm mt-1">{award.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-20 px-4 bg-[#1e1f24]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&h=400&fit=crop"
              alt="Sustainable transportation"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {dict.corporations.sustainability.heading}
            </h2>
            <p className="text-gray-400 mb-6">
              {dict.corporations.sustainability.desc}
            </p>
            <ul className="space-y-3 text-gray-300">
              {dict.corporations.sustainability.items.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="text-green-400">✓</span>
                  {item}
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
            {dict.corporations.benefits.heading}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {dict.corporations.benefits.items.map((benefit, index) => (
              <div
                key={index}
                className="bg-[#35363c] p-6 rounded-xl text-center hover:bg-[#3d3e45] transition-colors"
              >
                <span className="text-3xl mb-4 block">{benefitIcons[index]}</span>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 px-4 bg-[#1e1f24]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {dict.corporations.contact.heading}
          </h2>
          <p className="text-gray-400 text-center mb-12">
            {dict.corporations.contact.desc}
          </p>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder={dict.corporations.contact.firstName}
                className="w-full bg-[#35363c] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
              />
              <input
                type="text"
                placeholder={dict.corporations.contact.lastName}
                className="w-full bg-[#35363c] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>
            <input
              type="email"
              placeholder={dict.corporations.contact.email}
              className="w-full bg-[#35363c] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
            />
            <input
              type="text"
              placeholder={dict.corporations.contact.company}
              className="w-full bg-[#35363c] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
            />
            <textarea
              placeholder={dict.corporations.contact.message}
              rows={5}
              className="w-full bg-[#35363c] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors resize-none"
            />
            <button
              type="submit"
              className="w-full bg-white text-[#292a30] font-semibold py-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {dict.corporations.contact.submit}
            </button>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {dict.corporations.faq.heading}
          </h2>
          <div className="space-y-4">
            {dict.corporations.faq.items.map((faq, index) => (
              <div
                key={index}
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
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
