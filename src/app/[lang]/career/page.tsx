import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
    title: isAr ? dict.career.meta.title : "Careers at AB - Join Our Global Team",
    description: isAr
      ? dict.career.meta.description
      : "Explore exciting career opportunities at AB. Join a growing international team and help shape the future of luxury ground transportation.",
    path: "/career",
    lang,
    keywords: "AB careers, chauffeur jobs, luxury transport jobs, AB hiring, driver careers, corporate mobility careers",
  });
}

export default async function CareerPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  const teams = dict.career.departments.teams.map(
    (team: { code: string; name: string; desc: string }, i: number) => ({
      name: team.name,
      abbrev: team.code,
      description: team.desc,
      image:
        [
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
        ][i],
    })
  );

  const benefitIcons = [
    <svg key="pd" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>,
    <svg key="of" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>,
    <svg key="fw" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>,
    <svg key="se" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>,
    <svg key="cd" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>,
  ];

  const benefits = dict.career.benefits.items.map(
    (item: { title: string; desc: string }, i: number) => ({
      icon: benefitIcons[i],
      title: item.title,
      description: item.desc,
    })
  );

  const newsImages = [
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1560472355-536de3962603?w=600&h=400&fit=crop",
  ];

  const newsItems = dict.career.news.items.map(
    (item: { title: string; date: string; category: string }, i: number) => ({
      title: item.title,
      date: item.date,
      category: item.category,
      image: newsImages[i],
    })
  );

  return (
    <>
      <main className="min-h-screen bg-[#292a30] text-white">
        {/* Hero Section */}
        <section className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop"
            alt="AB office and team"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#292a30]/70 via-[#292a30]/50 to-[#292a30]" />
          <div className="relative z-10 text-center px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-wide max-w-4xl mx-auto leading-tight text-white">
              {dict.career.hero.heading}
            </h1>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
              <Link href={`${localeHome(lang)}`} className="hover:text-white transition-colors">
                {dict.career.breadcrumb.home}
              </Link>
              <span>/</span>
              <span className="text-white">{dict.career.breadcrumb.career}</span>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-24 px-8 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                {dict.career.intro.heading1}
                <br />
                <span className="italic font-light text-gray-300">
                  {dict.career.intro.heading2}
                </span>
              </h2>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p>{dict.career.intro.p1}</p>
                <p>{dict.career.intro.p2}</p>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                  alt="AB team collaboration"
                  width={800}
                  height={600}
                  className="rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Growing International Team */}
        <section className="py-24 bg-[#1c1d21]">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 leading-tight">
              {dict.career.team.heading1}
              <br />
              <span className="italic font-light text-gray-300">
                {dict.career.team.heading2}
              </span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "500+", label: dict.career.team.members },
                { number: "30+", label: dict.career.team.nationalities },
                { number: "15+", label: dict.career.team.offices },
                { number: "4.5", label: dict.career.team.rating },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-5xl md:text-6xl font-bold mb-4">
                    {stat.number}
                  </p>
                  <p className="text-gray-400 text-lg">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-24 px-8 max-w-5xl mx-auto text-center">
          <div className="text-6xl text-gray-700 mb-8">&ldquo;</div>
          <blockquote className="text-3xl md:text-4xl font-light leading-relaxed mb-8 italic">
            {dict.career.quote.text}
          </blockquote>
          <div>
            <p className="font-semibold text-lg">{dict.career.quote.title}</p>
            <p className="text-gray-400 text-sm">{dict.career.quote.company}</p>
          </div>
        </section>

        {/* Teams Section */}
        <section className="py-24 bg-[#1c1d21]">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 leading-tight">
              {dict.career.departments.heading1}
              <br />
              <span className="italic font-light text-gray-300">
                {dict.career.departments.heading2}
              </span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teams.map((team) => (
                <div
                  key={team.abbrev}
                  className="bg-[#292a30] rounded-lg overflow-hidden border border-gray-700/50 hover:border-gray-500/50 transition-all duration-300 group cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={team.image}
                      alt={team.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#292a30] to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-white/10 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {team.abbrev}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-gray-300 transition-colors">
                      {team.name}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {team.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 px-8 max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 leading-tight">
            {dict.career.benefits.heading1}
            <br />
            <span className="italic font-light text-gray-300">
              {dict.career.benefits.heading2}
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-[#1c1d21] p-8 rounded-lg border border-gray-700/50 text-center hover:border-gray-500/50 transition-all duration-300"
              >
                <div className="text-white mb-6 flex justify-center">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold mb-4">{benefit.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Latest News */}
        <section className="py-24 bg-[#1c1d21]">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 leading-tight">
              {dict.career.news.heading1}
              <br />
              <span className="italic font-light text-gray-300">{dict.career.news.heading2}</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {newsItems.map((news) => (
                <article
                  key={news.title}
                  className="bg-[#292a30] rounded-lg overflow-hidden border border-gray-700/50 hover:border-gray-500/50 transition-all duration-300 group cursor-pointer"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs text-gray-500 uppercase tracking-wider">
                        {news.category}
                      </span>
                      <span className="text-xs text-gray-600">•</span>
                      <span className="text-xs text-gray-500">{news.date}</span>
                    </div>
                    <h3 className="text-lg font-bold group-hover:text-gray-300 transition-colors">
                      {news.title}
                    </h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Chauffeur CTA */}
        <section className="py-24 px-8 max-w-4xl mx-auto text-center">
          <div className="bg-[#1c1d21] rounded-2xl p-12 border border-gray-700/50">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {dict.career.chauffeurCta.heading}
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              {dict.career.chauffeurCta.desc}
            </p>
            <Link
              href={`${localeBase(lang)}/partners`}
              className="inline-block bg-white text-[#292a30] px-10 py-4 text-sm font-semibold tracking-wider uppercase hover:bg-gray-200 transition-all duration-300 rounded-full"
            >
              {dict.career.chauffeurCta.button}
            </Link>
          </div>
        </section>

      </main>
    </>
  );
}
