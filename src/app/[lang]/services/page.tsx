import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  getDictionary,
  hasLocale,
  defaultLocale,
  type Locale,
  localeBase,
} from "@/app/[lang]/dictionaries";
import { generateSeoMetadata } from "@/lib/seo";
import { SKETCH_SERVICES, HUB_FAQS } from "./_components/services-sketch";
import ServicesDirectory from "./_components/ServicesDirectory";
import FAQSection from "@/components/services/sections/faq-section";
import type { PageSection } from "@/components/services/sections/section-types";

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
    keywords: "ground transportation services, chauffeur and VIP, airport transfers, corporate transportation, event transportation, bus and coach hire, tourism transportation, religious tourism, workforce transport, intercity transfers",
  });
}

const HUB_HERO_IMAGE = "/services/www.ab.limo-services-images/image1.jpg";

const HUB_INTRO: string[] = [
  "Managing executive mobility across multiple countries requires centralised command and transparent service execution. AB maintains owned infrastructure and regional offices across Riyadh, Dubai, Abu Dhabi and Doha to deliver seamless travel management.",
  "Corporate organisations require dependable ground transportation that eliminates the variability of street hailing and unvetted suppliers. Every service category connects directly into our Riyadh dispatch centre, providing travel coordinators with round the clock operational supervision.",
];

const HUB_FAQ_SECTION: PageSection = {
  id: "services-hub-faq",
  type: "faq",
  variant: "default",
  order: 0,
  enabled: true,
  content: {
    eyebrow: "Knowledge Base",
    heading: "Frequently asked questions",
    description:
      "Operational answers on cross border coordination, duty of care, flight tracking, event scale, coach hire and regional billing.",
    items: HUB_FAQS,
  },
  items: [],
  settings: { variant: "default" },
  appearance: { theme: "darker", padding: "lg", border: true, textAlign: "center" },
};

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const base = localeBase(lang);

  return (
    <main className="min-h-screen bg-[#292a30] text-white">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex flex-col overflow-hidden pt-24 pb-10">
        <Image
          src={HUB_HERO_IMAGE}
          alt=""
          aria-hidden="true"
          fill
          className="object-cover object-[62%_35%]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/95 via-black/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#292a30] to-transparent" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 flex-1 flex flex-col">
          <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-abBlue/10 border border-abBlue/30 self-start">
            <span className="w-2 h-2 rounded-full bg-abBlue animate-pulse"></span>
            <span className="text-abBlue text-xs font-bold tracking-widest uppercase">
              Our services
            </span>
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight max-w-4xl text-white">
            Nine ways we deliver ground transportation services across the Gulf
          </h1>

          <div className="mt-7 max-w-2xl flex flex-col gap-4 text-lg text-gray-300 leading-relaxed">
            <p className="m-0">
              AB coordinates managed ground transportation services across Saudi
              Arabia, the UAE and Qatar for corporate teams, official delegations
              and major international events. Central dispatch supervisors monitor
              every vehicle movement from the Riyadh operations centre.
            </p>
            <p className="m-0">
              Direct fleet oversight, regional protocol standards and route
              scheduling determine whether regional passenger movements run
              punctually across complex itineraries. Operational consistency across
              metropolitan centres allows business travellers to move between
              appointments without administrative friction.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3.5">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center min-h-[52px] px-7 bg-abBlue hover:bg-abServiceBlue text-white text-sm font-semibold rounded-full transition-colors shadow-lg shadow-abBlue/20"
            >
              Request a proposal
            </Link>
            <Link
              href={`${base}/fleet`}
              className="inline-flex items-center min-h-[52px] px-7 border border-white/50 hover:bg-white/10 text-white text-sm font-semibold rounded-full transition-colors"
            >
              View the fleet
            </Link>
          </div>

          <div className="mt-auto pt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-4">
            {SKETCH_SERVICES.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="group flex flex-col gap-1 pt-3.5 min-h-[44px] border-t border-white/30 hover:border-white transition-colors"
              >
                <span className="text-xs tracking-[0.14em] text-abBlue">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm leading-snug text-white">
                  {s.tabName ?? s.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-7xl mx-auto px-8 pt-16 pb-4">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight max-w-3xl">
          Managed ground transportation services across the Gulf
        </h2>
        <div className="mt-7 grid md:grid-cols-2 gap-x-14 gap-y-5 max-w-5xl">
          {HUB_INTRO.map((p, i) => (
            <p key={i} className="m-0 text-[17px] leading-relaxed text-gray-300">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Services with sticky list */}
      <div className="h-[72px]" />
      <ServicesDirectory lang={lang} />

      {/* Frequently asked questions */}
      <FAQSection section={HUB_FAQ_SECTION} />

      {/* Closing call to action */}
      <section className="bg-abBlack border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-8 py-20 flex flex-wrap items-end justify-between gap-8">
          <div className="flex-1 basis-[420px] min-w-0">
            <h2 className="text-3xl md:text-4xl font-bold">
              Not sure which service fits?
            </h2>
            <p className="mt-4 text-gray-400">
              For tailored ground transportation services across Saudi Arabia, the
              UAE and Qatar, contact our dispatch team at{" "}
              <a
                href="mailto:hello@ab.limo"
                className="text-white underline underline-offset-4 hover:text-abBlue transition-colors"
              >
                hello@ab.limo
              </a>
              .
            </p>
            <p className="mt-3 text-gray-400">
              Request a transport proposal — submit your travel schedule or event
              itinerary to receive a managed transport plan from our operations
              team.
            </p>
            <a
              href="tel:+966581118720"
              className="mt-5 inline-flex items-center text-white text-lg font-semibold hover:text-abBlue transition-colors"
            >
              +966 58 111 8720
            </a>
          </div>
          <Link
            href={`${base}/contact`}
            className="inline-flex items-center min-h-[52px] px-8 rounded-full border border-white text-sm font-semibold text-white hover:bg-white hover:text-abBlack transition-colors"
          >
            Request a proposal
          </Link>
        </div>
      </section>
    </main>
  );
}
