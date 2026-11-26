import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  getDictionary,
  hasLocale,
  defaultLocale,
  localeBase,
  localeHome,
  type Locale,
} from "@/app/[lang]/dictionaries";
import { generateSeoMetadata } from "@/lib/seo";
import {
  BreadcrumbJsonLd,
  FAQJsonLd,
  JsonLd,
} from "@/components/seo/StructuredData";
import CaseStudiesSection from "@/app/[lang]/_components/CaseStudiesSection";
import AwardsSection from "@/app/[lang]/_components/AwardsSection";
import { CaseStudiesFaq, type FaqItem } from "./_components/CaseStudiesFaq";
import { ArrowRight, Trophy } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  SEO metadata                                                       */
/* ------------------------------------------------------------------ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return generateSeoMetadata({
    title:
      "Case Studies & Awards | AB Transportation",
    description:
      "Explore AB's proven track record: from MDL Beast and FIFA World Cup Qatar 2022 to NEOM Trojena and ADIPEC VIP shuttles. Award-winning chauffeur, bus and event transport across Saudi Arabia, the UAE and Qatar.",
    path: "/case-studies",
    lang,
    keywords:
      "AB case studies, event transportation case study, MDL Beast transport, FIFA World Cup Qatar transport, NEOM Trojena, ADIPEC VIP shuttle, World Luxury Travel Awards, corporate transport awards, Saudi Arabia UAE Qatar",
  });
}

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const FAQS: FaqItem[] = [
  {
    question: "What types of events has AB managed transport for?",
    answer:
      "AB has delivered end-to-end ground transportation for mega-scale music festivals (MDL Beast Soundstorm, Azimuth), international sports events (FIFA World Cup Qatar 2022), global energy conferences (ADIPEC), giga-projects (NEOM Trojena), and ongoing corporate staff shuttles for major clients including Siemens Energy and Roshn Group.",
  },
  {
    question: "How many vehicles can AB deploy for a single event?",
    answer:
      "At peak operations during MDL Beast Soundstorm, AB deployed 725 vehicles simultaneously — including luxury sedans, SUVs, minivans, executive coaches, and shuttle buses — serving more than 145,000 attendees and 250+ artists across the festival.",
  },
  {
    question: "Does AB provide transport for giga-projects in remote locations?",
    answer:
      "Yes. For the NEOM Trojena project, AB deployed 18 luxury coaches on a monthly rotation to support 12-hour daily operations, six days a week, in a remote construction environment — maintaining zero major service disruptions.",
  },
  {
    question: "What awards has AB won for transportation services?",
    answer:
      "AB has been recognised with the World Luxury Travel Awards (2025 Winner — Chauffeur Company, Middle East & North Africa), Entrepreneur Gulf Company of the Year 2025 for Transportation & Events Support Services, and an Eventex Bronze Award for excellence in event logistics.",
  },
  {
    question: "Can AB handle short-notice event transport requests?",
    answer:
      "Yes. For the ADIPEC VIP Shuttle Services in Abu Dhabi, AB's team mobilised a fleet of premium shuttle buses on short notice, delivering smooth and professional transport operations for high-profile international attendees across two consecutive editions.",
  },
  {
    question: "How can I request a case study or proposal for my event?",
    answer:
      "Contact our commercial team through the Request a Proposal page or reach out directly via our Contact page. We'll share relevant case studies for your industry and prepare a tailored transport plan for your event, conference, or corporate requirement.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */
export default async function CaseStudiesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  const base = localeBase(locale);
  const homeUrl = localeHome(locale);

  const breadcrumbs = [
    { name: "Home", url: homeUrl },
    { name: "Case Studies & Awards", url: `${base}/case-studies` },
  ];

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Case Studies & Awards | AB Transportation",
    description:
      "Explore AB's proven track record: from MDL Beast and FIFA World Cup Qatar 2022 to NEOM Trojena and ADIPEC VIP shuttles. Award-winning chauffeur, bus and event transport across Saudi Arabia, the UAE and Qatar.",
    url: "https://www.ab.limo/case-studies",
    inLanguage: locale.startsWith("ar") ? "ar" : "en",
    publisher: {
      "@type": "Organization",
      name: "AB",
      url: "https://www.ab.limo",
    },
  };

  return (
    <main className="min-h-screen bg-[#1c1d22] text-white">
      {/* Structured Data */}
      <JsonLd data={webPageSchema} />
      <BreadcrumbJsonLd items={breadcrumbs} />
      <FAQJsonLd items={FAQS} />

      {/* ───── HERO SECTION ───── */}
      <section className="relative min-h-[640px] flex items-center justify-center overflow-hidden py-24 px-4 border-b border-white/10">
        <Image
          src="/fleet/hero-banner.jpg"
          alt="AB Transportation fleet across Saudi Arabia, UAE and Qatar"
          fill
          className="object-cover opacity-25"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1c1d22]/90 via-[#1c1d22]/80 to-[#1c1d22]" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-2 text-xs md:text-sm text-gray-400 mb-6 font-medium"
          >
            <Link href={homeUrl} className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-200">Case Studies &amp; Awards</span>
          </nav>

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-abBlue/15 border border-abBlue/30 text-abBlue text-xs md:text-sm font-semibold tracking-wide uppercase mb-6">
            <Trophy className="w-4 h-4" />
            <span>Proven Results · Award-Winning Service</span>
          </div>

          {/* H1 */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Case Studies &amp; Awards
          </h1>

          {/* Intro paragraph */}
          <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
            From the region&apos;s largest music festivals and global sporting events to giga-project logistics
            and daily corporate shuttles — explore how AB delivers award-winning ground transportation
            across Saudi Arabia, the UAE and Qatar.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`${base}/quote/tender`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#1c1d22] font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
            >
              <span>Request a Proposal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#case-studies"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#252731] text-white font-medium px-8 py-4 rounded-xl border border-white/15 hover:bg-[#2e303d] hover:border-white/30 transition-all"
            >
              <span>Browse Case Studies</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ───── HIGHLIGHTS BAR ───── */}
      <section className="py-14 px-4 bg-[#212228] border-b border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-extrabold text-white mb-1">
              725
            </div>
            <div className="text-sm text-gray-400">
              Peak Vehicles Deployed
            </div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-extrabold text-white mb-1">
              145K+
            </div>
            <div className="text-sm text-gray-400">
              Attendees Served
            </div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-extrabold text-white mb-1">
              3
            </div>
            <div className="text-sm text-gray-400">
              Industry Awards
            </div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-extrabold text-white mb-1">
              3
            </div>
            <div className="text-sm text-gray-400">
              Countries Covered
            </div>
          </div>
        </div>
      </section>

      {/* ───── CASE STUDIES (re-used from homepage) ───── */}
      <CaseStudiesSection dict={dict} lang={locale} />

      {/* ───── AWARDS (re-used from homepage) ───── */}
      <AwardsSection dict={dict} lang={locale} />

      {/* ───── FAQS ───── */}
      <section className="py-24 px-4 bg-[#1c1d22] border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs font-mono tracking-widest text-abBlue uppercase mb-2">
              Common Questions
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Case Studies &amp; Awards FAQ
            </h2>
            <p className="text-gray-300 text-base md:text-lg">
              Answers to frequently asked questions about our project experience,
              service capabilities, and industry recognition.
            </p>
          </div>

          <CaseStudiesFaq faqs={FAQS} />
        </div>
      </section>

      {/* ───── BOTTOM CTA ───── */}
      <section className="py-20 px-4 bg-[#212228]">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-[#202535] to-[#1c1d22] border border-abBlue/40 rounded-3xl p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Ready to plan your next event or project?
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                Our commercial team will share relevant case studies for your
                industry and prepare a tailored ground transportation plan for
                your event, conference, or corporate requirement.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto">
              <Link
                href={`${base}/contact`}
                className="inline-flex items-center justify-center gap-2 bg-white text-[#1c1d22] font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all shadow-lg"
              >
                <span>Request Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={`${base}/contact`}
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-medium px-6 py-4 rounded-xl border border-white/20 hover:bg-white/15 transition-all text-sm"
              >
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
