import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getDictionary, hasLocale, type Locale, localeBase, localeHome } from "@/app/[lang]/dictionaries";
import { generateSeoMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";
import {
  FLEET_HERO_IMAGE,
  FLEET_LABELS,
  FLEET_VEHICLES,
  fleetLang,
  fleetUrl,
  fleetVehicleUrl,
} from "@/lib/fleet";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isAr = hasLocale(lang) && lang === "ar";
  return generateSeoMetadata({
    title: isAr
      ? "أسطولنا | سيدان فاخرة ودفع رباعي وفان وحافلات | AB"
      : "Our Fleet | Luxury Sedans, SUVs, Vans & Coaches | AB",
    description: isAr
      ? "استكشف أسطول AB: سيدان فاخرة مرسيدس فئة S، سيارات دفع رباعي كاديلاك اسكاليد، فان أعمال فئة V، MPV هيونداي ستاريا، وحافلات VIP. موديلات حديثة باللون الأسود بسائق."
      : "Explore the AB fleet: Mercedes S-Class luxury sedans, Cadillac Escalade SUVs, V-Class business vans, Hyundai Staria MPVs and 16–45 seat VIP coaches. Late-model, strictly black, chauffeur-driven.",
    path: "/fleet",
    lang,
    keywords:
      "AB fleet, luxury sedan, Mercedes S-Class, Cadillac Escalade, Mercedes V-Class, Hyundai Staria, VIP coach, minibus rental, corporate fleet, black car service",
  });
}

export default async function FleetPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const l = fleetLang(lang);
  const labels = FLEET_LABELS[l];
  const t = dict.home.fleet;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: labels.home, url: `${localeHome(lang)}` },
          { name: labels.breadcrumbFleet, url: fleetUrl(lang) },
        ]}
      />

      {/* Hero */}
      <section
        data-section-type="fleet_hero"
        className="relative w-full h-[50vh] min-h-[380px] flex items-center justify-center overflow-hidden"
      >
        <Image
          src={FLEET_HERO_IMAGE}
          alt={t.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#292a30]/75 via-[#292a30]/55 to-[#292a30]" />
        <div className="relative z-10 text-center px-4">
          <span className="inline-block text-xs font-bold tracking-widest text-abBlue uppercase mb-4 bg-black/40 border border-abBlue/40 rounded-full px-4 py-1.5">
            {dict.home.fleetSection.badge}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-wide text-white">
            {t.title}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
            {t.subtitle}
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
            <Link href={`${localeHome(lang)}`} className="hover:text-white transition-colors">
              {labels.home}
            </Link>
            <span>/</span>
            <span className="text-white">{labels.breadcrumbFleet}</span>
          </div>
        </div>
      </section>

      {/* Vehicle grid */}
      <section
        data-section-type="fleet_grid"
        className="py-20 md:py-24 bg-[#0a0a0a] border-b border-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold tracking-widest text-abBlue uppercase mb-3">
                {labels.hero}
              </h2>
              <p className="text-gray-400 leading-relaxed">{t.hospitalityNote}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FLEET_VEHICLES.map((vehicle) => {
              const copy = vehicle.copy[l];
              const anchors = vehicle.anchors ?? [];

              return (
                <div key={vehicle.slug} className="relative">
                  {anchors.map((a) => (
                    <span
                      key={a}
                      id={a}
                      className="absolute -top-28 invisible pointer-events-none"
                    />
                  ))}
                  <Link
                    id={vehicle.slug}
                    href={fleetVehicleUrl(lang, vehicle.slug)}
                    className="group bg-abDarkGray rounded-xl border border-gray-800 hover:border-abBlue transition-colors overflow-hidden flex flex-col h-full scroll-mt-28"
                  >
                  <div className="bg-[#050505] h-52 flex items-center justify-center p-6 relative border-b border-gray-900">
                    <Image
                      src={vehicle.image}
                      alt={`${copy.model} — ${copy.title}`}
                      width={420}
                      height={220}
                      className="w-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-abBlue mb-2">
                      {copy.model}
                    </span>
                    <h3 className="text-lg font-bold text-white mb-2">{copy.title}</h3>
                    <p className="text-sm text-gray-400 mb-5 flex-1">{copy.tagline}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500 border-t border-gray-800 pt-4 mb-4">
                      <span className="flex items-center gap-1.5">
                        <i className="fa-solid fa-user-tie text-gray-400" />
                        {vehicle.passengers} {t.passengers}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <i className="fa-solid fa-suitcase text-gray-400" />
                        {vehicle.luggage} {t.luggage}
                      </span>
                    </div>
                    <span className="block w-full text-center bg-[#111] group-hover:bg-abBlue text-white text-xs font-semibold py-2.5 rounded transition-colors border border-gray-700 group-hover:border-abBlue">
                      {t.viewDetails}
                    </span>
                  </div>
                </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Governance */}
      <section
        data-section-type="fleet_governance"
        className="py-20 md:py-24 bg-[#1c1d21]"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-bold tracking-widest text-abBlue uppercase mb-4">
            {dict.home.fleetSection.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {dict.home.fleetSection.title}
          </h2>
          <p className="text-gray-400 leading-relaxed">
            {dict.home.fleetSection.desc}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section data-section-type="fleet_cta" className="py-16 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {labels.ctaTitle}
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">{labels.ctaDesc}</p>
          <Link
            href={`${localeBase(lang)}/contact`}
            className="inline-block bg-abBlue hover:bg-abBlue/90 text-white font-semibold px-8 py-3.5 rounded-full transition-colors text-sm"
          >
            {labels.ctaButton}
          </Link>
        </div>
      </section>
    </>
  );
}
