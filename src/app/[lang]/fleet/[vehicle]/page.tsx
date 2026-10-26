import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, type Locale, localeBase, localeHome } from "@/app/[lang]/dictionaries";
import { generateSeoMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";
import ServiceInquiryForm from "@/components/layout/ServiceInquiryForm";
import {
  FLEET_LABELS,
  FLEET_VEHICLES,
  fleetLang,
  fleetUrl,
  fleetVehicleUrl,
  getFleetVehicle,
} from "@/lib/fleet";

interface PageProps {
  params: Promise<{ lang: string; vehicle: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, vehicle } = await params;
  const target = getFleetVehicle(vehicle);
  if (!target) notFound();

  const copy = target.copy[fleetLang(lang)];
  return generateSeoMetadata({
    title: `${copy.model} | ${copy.title} | AB Fleet`,
    description: `${copy.tagline} ${copy.description[0]}`.slice(0, 158),
    path: `/fleet/${target.slug}`,
    lang,
    keywords: `${copy.model}, ${copy.title}, AB fleet, chauffeur-driven ${copy.model}, luxury vehicle rental GCC`,
  });
}

export default async function FleetVehiclePage({ params }: PageProps) {
  const { lang, vehicle } = await params;
  const target = getFleetVehicle(vehicle);
  if (!target) notFound();

  const dict = await getDictionary(lang as Locale);
  const l = fleetLang(lang);
  const labels = FLEET_LABELS[l];
  const copy = target.copy[l];
  // Same category first, then the rest — capped so the section stays browsable.
  const related = [
    ...FLEET_VEHICLES.filter((v) => v.category === target.category && v.slug !== target.slug),
    ...FLEET_VEHICLES.filter((v) => v.category !== target.category && v.slug !== target.slug),
  ].slice(0, 10);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: labels.home, url: `${localeHome(lang)}` },
          { name: labels.breadcrumbFleet, url: fleetUrl(lang) },
          { name: copy.model, url: fleetVehicleUrl(lang, target.slug) },
        ]}
      />

      {/* Hero */}
      <section
        data-section-type="vehicle_hero"
        className="relative overflow-hidden bg-gradient-to-b from-[#292a30] via-[#1c1d21] to-[#0a0a0a] pt-14 pb-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-400 mb-10 flex items-center gap-2">
            <Link href={`${localeHome(lang)}`} className="hover:text-white transition-colors">
              {labels.home}
            </Link>
            <span>/</span>
            <Link href={fleetUrl(lang)} className="hover:text-white transition-colors">
              {labels.breadcrumbFleet}
            </Link>
            <span>/</span>
            <span className="text-white">{copy.model}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block text-xs font-bold tracking-widest text-abBlue uppercase mb-4 bg-black/30 border border-abBlue/40 rounded-full px-4 py-1.5">
                {copy.model}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-white">
                {copy.title}
              </h1>
              <p className="text-lg text-gray-300 mb-8">{copy.tagline}</p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="bg-[#111] border border-gray-800 rounded-xl px-5 py-3.5">
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">
                    {labels.passengers}
                  </p>
                  <p className="text-white font-semibold">
                    <i className="fa-solid fa-user-tie mr-2 text-abBlue" />
                    {target.passengers}
                  </p>
                </div>
                <div className="bg-[#111] border border-gray-800 rounded-xl px-5 py-3.5">
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">
                    {labels.luggage}
                  </p>
                  <p className="text-white font-semibold">
                    <i className="fa-solid fa-suitcase mr-2 text-abBlue" />
                    {target.luggage}
                  </p>
                </div>
              </div>

              <Link
                href={`${localeBase(lang)}/contact`}
                className="inline-block bg-abBlue hover:bg-abBlue/90 text-white font-semibold px-8 py-3.5 rounded-full transition-colors text-sm"
              >
                {labels.requestVehicle}
              </Link>
            </div>

            <div className="bg-[#050505] border border-gray-800 rounded-2xl p-8 flex items-center justify-center min-h-[280px]">
              <Image
                src={target.image}
                alt={`${copy.model} — ${copy.title}`}
                width={560}
                height={300}
                priority
                className="w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section data-section-type="vehicle_about" className="py-20 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            {copy.model}
          </h2>
          <div className="space-y-6 text-gray-400 leading-relaxed">
            {copy.description.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section data-section-type="vehicle_features" className="py-20 bg-[#1c1d21]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">
            {labels.features}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {copy.features.map((feature) => (
              <div
                key={feature.title}
                className="bg-abDarkGray border border-gray-800 rounded-xl p-6 hover:border-abBlue transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-abBlue/10 border border-abBlue/30 flex items-center justify-center mb-4">
                  <svg
                    className="w-5 h-5 text-abBlue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ideal for + Gallery + Inquiry form */}
      <section data-section-type="vehicle_details" className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">{labels.idealFor}</h2>
            <ul className="space-y-4">
              {copy.idealFor.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-300">
                  <svg
                    className="w-5 h-5 text-abBlue mt-0.5 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold text-white mt-10 mb-6">{labels.gallery}</h2>
            <div className="grid grid-cols-3 gap-4">
              {target.gallery.map((image, index) => (
                <div
                  key={image}
                  className="bg-[#050505] border border-gray-800 rounded-xl p-4 flex items-center justify-center"
                >
                  <Image
                    src={image}
                    alt={`${copy.model} ${index + 1}`}
                    width={240}
                    height={140}
                    className="w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <ServiceInquiryForm
              serviceName={`${copy.title} (${copy.model})`}
              serviceUrl={fleetVehicleUrl(lang, target.slug)}
              dict={dict}
            />
          </div>
        </div>
      </section>

      {/* Related vehicles */}
      <section data-section-type="vehicle_related" className="py-20 bg-[#1c1d21]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">{labels.related}</h2>
            <Link
              href={fleetUrl(lang)}
              className="text-abBlue text-sm font-semibold hover:underline"
            >
              {labels.breadcrumbFleet} →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {related.map((vehicle) => {
              const vehicleCopy = vehicle.copy[l];
              return (
                <Link
                  key={vehicle.slug}
                  href={fleetVehicleUrl(lang, vehicle.slug)}
                  className="group bg-abDarkGray border border-gray-800 rounded-xl overflow-hidden hover:border-abBlue transition-colors"
                >
                  <div className="bg-[#050505] h-28 flex items-center justify-center p-3 border-b border-gray-900">
                    <Image
                      src={vehicle.image}
                      alt={`${vehicleCopy.model} — ${vehicleCopy.title}`}
                      width={180}
                      height={100}
                      className="w-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-white text-sm font-semibold mb-1">
                      {vehicleCopy.model}
                    </p>
                    <p className="text-gray-500 text-xs">{vehicleCopy.title}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
