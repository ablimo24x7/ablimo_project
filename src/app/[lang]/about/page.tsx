import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getDictionary, hasLocale, defaultLocale, type Locale } from "@/app/[lang]/dictionaries";
import { cityUrl, locationsUrl, resolveCity, resolveCountry } from "@/lib/locations";
import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return generateSeoMetadata({
    title: "About AB.Limo | Premium Chauffeur & Corporate Mobility Provider",
    description:
      "Learn about AB.Limo, a leading executive mobility provider operating across 6 GCC countries with 25+ cities, 10+ years of experience, and over 1 million rides delivered. Our fleet of luxury vehicles serves airport transfers, corporate travel, and special events.",
    path: "/about",
    lang,
    keywords:
      "about AB.Limo, AB.Limo company, luxury transportation provider, GCC chauffeur service, corporate mobility company, executive travel provider, AB.Limo fleet, premium limousine company",
  });
}

const statsData = [
  { number: "6", labelKey: "countries" },
  { number: "25+", labelKey: "cities" },
  { number: "10+", labelKey: "years" },
  { number: "1M+", labelKey: "rides" },
];

const cityLinks = [
  { name: "Dubai", country: "ae", city: "dubai" },
  { name: "Riyadh", country: "sa", city: "riyadh" },
  { name: "Doha", country: "qa", city: "doha" },
  { name: "Abu Dhabi", country: "ae", city: "abu-dhabi" },
  { name: "Jeddah", country: "sa", city: "jeddah" },
  { name: "Manama", country: "bh", city: "manama" },
  { name: "Kuwait City", country: "kw", city: "kuwait" },
  { name: "Muscat", country: "om", city: "muscat" },
  { name: "Sharjah", country: "ae", city: "sharjah" },
  { name: "Mecca", country: "sa", city: "mecca" },
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1563720223185-11003d516935?w=1920&h=1080&fit=crop"
          alt="AB.Limo luxury chauffeur service"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#292a30]/70 via-[#292a30]/50 to-[#292a30]" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-wide">
            {dict.about.title}
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
            <Link href={`/${lang}`} className="hover:text-white transition-colors">
              {dict.about.breadcrumb.home}
            </Link>
            <span>/</span>
            <span className="text-white">{dict.about.breadcrumb.about}</span>
          </div>
        </div>
      </section>

      {/* Changing the Travel Game */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              {dict.about.hero.heading1}
              <br />
              <span className="italic font-light text-gray-300">{dict.about.hero.heading2}</span>
            </h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>{dict.about.mission.p1}</p>
              <p>{dict.about.mission.p2}</p>
              <p>{dict.about.mission.p3}</p>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop"
                alt="Business travel with AB.Limo"
                width={800}
                height={600}
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#1c1d21] p-6 rounded-lg shadow-xl border border-gray-700/50">
                <p className="text-3xl font-bold text-white">{dict.about.mission.stat}</p>
                <p className="text-sm text-gray-400">{dict.about.mission.statLabel}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#1c1d21]">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 leading-tight">
            {dict.about.stats.heading1}
            <br />
            <span className="italic font-light text-gray-300">
              {dict.about.stats.heading2}
            </span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat) => (
              <div key={stat.labelKey} className="text-center">
                <p className="text-5xl md:text-6xl font-bold mb-4">
                  {stat.number}
                </p>
                <p className="text-gray-400 text-lg">{dict.about.stats[stat.labelKey as "countries" | "cities" | "years" | "rides"]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How AB.Limo Works */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 leading-tight">
          {dict.about.howItWorks.heading1}
          <br />
          <span className="italic font-light text-gray-300">{dict.about.howItWorks.heading2}</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {dict.about.howItWorks.steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="text-6xl font-bold text-gray-700 mb-6">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Vehicle Classes */}
      <section className="py-24 bg-[#1c1d21]">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 leading-tight">
            {dict.about.vehicleClasses.heading1}
            <br />
            <span className="italic font-light text-gray-300">{dict.about.vehicleClasses.heading2}</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {dict.about.vehicleClasses.classes.map((vehicle, index) => {
              const images = [
                "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&h=400&fit=crop",
                "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop",
                "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop",
              ];
              return (
                <div
                  key={index}
                  className="bg-[#292a30] rounded-lg overflow-hidden border border-gray-700/50 hover:border-gray-500/50 transition-all duration-300 group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={images[index]}
                      alt={vehicle.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4">{vehicle.title}</h3>
                    <p className="text-gray-400 leading-relaxed">
                      {vehicle.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quality, Safety, Sustainability */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 leading-tight">
          {dict.about.quality.heading1}
          <br />
          <span className="italic font-light text-gray-300">{dict.about.quality.heading2}</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {dict.about.quality.features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#1c1d21] p-8 rounded-lg border border-gray-700/50 hover:border-gray-500/50 transition-all duration-300"
            >
              <div className="text-white mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Where AB.Limo Operates */}
      <section className="py-24 bg-[#1c1d21]">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 leading-tight">
            {dict.about.operates.heading1}
            <br />
            <span className="italic font-light text-gray-300">{dict.about.operates.heading2}</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {cityLinks.map((city) => (
              <Link
                key={city.name}
                href={(() => {
                  const country = resolveCountry(city.country)!;
                  return cityUrl(lang, country, resolveCity(country, city.city)!);
                })()}
                className="bg-[#292a30] p-6 rounded-lg text-center border border-gray-700/50 hover:border-white/30 transition-all duration-300"
              >
                <p className="text-lg font-semibold">{city.name}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href={locationsUrl(lang)}
              className="inline-block border-2 border-white text-white px-8 py-3 text-sm font-semibold tracking-wider uppercase hover:bg-white hover:text-[#292a30] transition-all duration-300"
            >
              {dict.about.operates.viewAll}
            </Link>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 px-8 max-w-5xl mx-auto text-center">
        <div className="text-6xl text-gray-700 mb-8">&ldquo;</div>
        <blockquote className="text-3xl md:text-4xl font-light leading-relaxed mb-8 italic">
          {dict.about.quote.text}
        </blockquote>
        <div>
          <p className="font-semibold text-lg">{dict.about.quote.name}</p>
          <p className="text-gray-400 text-sm">{dict.about.quote.subtitle}</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[#1c1d21]">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 leading-tight">
            {dict.about.faq.heading1}
            <br />
            <span className="italic font-light text-gray-300">{dict.about.faq.heading2}</span>
          </h2>
          <div className="space-y-4">
            {dict.about.faq.items.map((item, index) => (
              <FAQItem key={index} item={{ question: item.q, answer: item.a }} />
            ))}
          </div>
        </div>
      </section>

      {/* Where to from Here */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 leading-tight">
          {dict.about.whereToFrom.heading1}
          <br />
          <span className="italic font-light text-gray-300">{dict.about.whereToFrom.heading2}</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {dict.about.whereToFrom.cards.map((card, index) => {
            const links = ["/career", "/press/releases", "/blog"];
            const images = [
              "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop",
              "https://images.unsplash.com/photo-1543242594-c8bae8b9e708?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop",
            ];
            return (
              <Link key={index} href={links[index]} className="group">
                <div className="relative h-64 overflow-hidden rounded-lg mb-6">
                  <Image
                    src={images[index]}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-gray-300 transition-colors">
                  {card.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {card.desc}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}

function FAQItem({
  item,
}: {
  item: { question: string; answer: string };
}) {
  return (
    <div className="bg-[#292a30] rounded-lg border border-gray-700/50 overflow-hidden">
      <details className="group">
        <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
          <h3 className="text-lg font-semibold pr-4">{item.question}</h3>
          <div className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center flex-shrink-0 group-open:border-white transition-colors">
            <svg
              className="w-4 h-4 text-gray-400 group-open:text-white transition-transform duration-300 group-open:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </summary>
        <div className="px-6 pb-6 text-gray-400 leading-relaxed">
          {item.answer}
        </div>
      </details>
    </div>
  );
}
