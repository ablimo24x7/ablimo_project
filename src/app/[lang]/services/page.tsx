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
import { SKETCH_SERVICES } from "./_components/services-sketch";
import ServicesDirectory from "./_components/ServicesDirectory";

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
    keywords: "AB services, luxury chauffeur, executive transport, airport transfer, corporate mobility, event logistics",
  });
}

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
          src="/services/hub-hero.jpg"
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
            Six ways we move people across the Gulf
          </h1>

          <p className="mt-7 max-w-2xl text-lg text-gray-300 leading-relaxed">
            From a single VIP arrival to hundreds of vehicles over a multi week event,
            every journey is planned, dispatched and supervised by one team. Choose a
            service to see how it works.
          </p>

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

          <div className="mt-auto pt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
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

      {/* Services with sticky list */}
      <div className="h-[72px]" />
      <ServicesDirectory lang={lang} />

      {/* Closing call to action */}
      <section className="bg-abBlack">
        <div className="max-w-7xl mx-auto px-8 py-20 flex flex-wrap items-end justify-between gap-8">
          <div className="flex-1 basis-[420px] min-w-0">
            <h2 className="text-3xl md:text-4xl font-bold">
              Not sure which service fits?
            </h2>
            <p className="mt-4 text-gray-400">
              Tell us about the journey and we will design the movement plan.
              hello@ab.limo
            </p>
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
