import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Users,
  Briefcase,
  Wifi,
  BatteryCharging,
  Laptop,
  Droplets,
  MapPin,
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  Calendar,
  Clock,
  ArrowRight,
} from "lucide-react";
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

  const l = fleetLang(lang);
  const copy = target.copy[l];
  const rich = copy.richContent;

  const pageTitle = rich?.heroTitle
    ? `${rich.heroTitle} | AB Fleet`
    : `${copy.model} | ${copy.title} | AB Fleet`;

  const pageDescription = rich?.heroSubtitle
    ? `${rich.heroSubtitle} ${rich.heroParagraphs[0] || ""}`.slice(0, 158)
    : `${copy.tagline} ${copy.description[0] || ""}`.slice(0, 158);

  return generateSeoMetadata({
    title: pageTitle,
    description: pageDescription,
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
  const isAr = l === "ar";
  const labels = FLEET_LABELS[l];
  const copy = target.copy[l];
  const rich = copy.richContent;

  // Same category first, then others
  const related = [
    ...FLEET_VEHICLES.filter((v) => v.category === target.category && v.slug !== target.slug),
    ...FLEET_VEHICLES.filter((v) => v.category !== target.category && v.slug !== target.slug),
  ].slice(0, 8);

  const inquirySubject = `${copy.title} (${copy.model})`;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: labels.home, url: `${localeHome(lang)}` },
          { name: labels.breadcrumbFleet, url: fleetUrl(lang) },
          { name: copy.model, url: fleetVehicleUrl(lang, target.slug) },
        ]}
      />

      {/* ========================================================= */}
      {/* 1. HERO SECTION                                           */}
      {/* ========================================================= */}
      <section
        data-section-type="vehicle_hero"
        className="relative overflow-hidden bg-gradient-to-b from-[#111218] via-[#08080a] to-[#050505] pt-24 lg:pt-32 pb-16 lg:pb-24 border-b border-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb row */}
          <nav className="text-xs sm:text-sm text-gray-400 mb-8 flex items-center gap-2">
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Heading, Overview, Quick Specs, CTAs */}
            <div className="lg:col-span-7">
              <span className="inline-block text-[11px] font-bold tracking-widest text-abBlue uppercase mb-4 bg-abBlue/10 border border-abBlue/30 rounded-full px-4 py-1.5">
                {copy.model}
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight text-white leading-tight">
                {rich?.heroTitle || copy.title}
              </h1>

              <p className="text-base sm:text-lg text-gray-300 font-medium mb-6 leading-relaxed">
                {rich?.heroSubtitle || copy.tagline}
              </p>

              {rich?.heroParagraphs ? (
                <div className="space-y-4 mb-8 text-sm sm:text-base text-gray-400 leading-relaxed">
                  {rich.heroParagraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              ) : (
                <div className="space-y-4 mb-8 text-sm sm:text-base text-gray-400 leading-relaxed">
                  {copy.description.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              )}

              {/* 4-Item Quick Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                <div className="bg-[#0e0f14] border border-gray-800/80 rounded-xl p-3.5">
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">
                    {isAr ? "الركاب" : "Guests"}
                  </p>
                  <p className="text-white font-bold text-sm sm:text-base flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-abBlue shrink-0" />
                    <span>{target.passengers}</span>
                  </p>
                </div>

                <div className="bg-[#0e0f14] border border-gray-800/80 rounded-xl p-3.5">
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">
                    {isAr ? "الأمتعة" : "Luggage"}
                  </p>
                  <p className="text-white font-bold text-sm sm:text-base flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-abBlue shrink-0" />
                    <span>{target.luggage}</span>
                  </p>
                </div>

                <div className="bg-[#0e0f14] border border-gray-800/80 rounded-xl p-3.5 col-span-2 sm:col-span-1">
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">
                    {isAr ? "الموديل المعتاد" : "Typical Model"}
                  </p>
                  <p className="text-white font-bold text-xs sm:text-sm truncate" title={copy.model}>
                    {copy.model}
                  </p>
                </div>

                <div className="bg-[#0e0f14] border border-gray-800/80 rounded-xl p-3.5 col-span-2 sm:col-span-1">
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">
                    {isAr ? "الاستخدام الأمثل" : "Ideal For"}
                  </p>
                  <p
                    className="text-white font-bold text-xs truncate"
                    title={rich?.idealForSummary || copy.idealFor[0]}
                  >
                    {rich?.idealForSummary || copy.idealFor[0]}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#inquiry"
                  className="bg-abBlue hover:bg-abBlue/90 text-white font-bold px-7 py-3.5 rounded-full transition-all duration-300 text-sm shadow-[0_4px_20px_rgba(37,159,207,0.35)] hover:shadow-[0_6px_25px_rgba(37,159,207,0.5)] cursor-pointer"
                >
                  {isAr ? "احجز هذه الفئة" : "Book this class"}
                </a>
                <a
                  href="#inquiry"
                  className="bg-white/5 hover:bg-white/10 text-gray-200 border border-gray-700 hover:border-gray-500 font-bold px-7 py-3.5 rounded-full transition-colors text-sm cursor-pointer"
                >
                  {isAr ? "طلب عرض أسعار" : "Request a quote"}
                </a>
              </div>
            </div>

            {/* Right Column: Hero Vehicle Image Preview */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="bg-[#0e0f14] border border-gray-800/80 rounded-2xl overflow-hidden shadow-2xl relative group">
                <div className="relative aspect-[16/10] w-full bg-black/60">
                  <Image
                    src={target.heroExteriorImage || target.image}
                    alt={
                      isAr
                        ? `${copy.title} سيارة سوداء بسائق`
                        : `${copy.title} - ${copy.model} outside terminal`
                    }
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-gray-300 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-gray-700">
                      {isAr ? "الأسطول الأسود الرسمي" : "Official Black Chauffeur Fleet"}
                    </span>
                    <span className="text-[11px] font-bold text-abBlue bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-abBlue/40">
                      2024–2026
                    </span>
                  </div>
                </div>

                {/* Transparent vehicle thumbnail bar */}
                <div className="p-4 bg-[#0a0a0c] border-t border-gray-900 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-10 relative bg-[#050505] rounded-lg border border-gray-800 p-1 flex items-center justify-center">
                      <Image
                        src={target.image}
                        alt={copy.model}
                        width={60}
                        height={35}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-white text-xs font-bold">{copy.model}</p>
                      <p className="text-gray-500 text-[10px]">{copy.title}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 flex items-center gap-1 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-abBlue" />
                    {isAr ? "جاهزية تشغيلية" : "Dispatch Ready"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. INSIDE THE REAR CABIN                                  */}
      {/* ========================================================= */}
      {rich?.inside && (
        <section
          data-section-type="vehicle_interior"
          className="py-20 lg:py-24 bg-[#08080a] border-b border-gray-900"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="inline-block text-[11px] font-bold tracking-widest text-abBlue uppercase mb-3 bg-abBlue/10 border border-abBlue/30 rounded-full px-3.5 py-1">
                {rich.inside.badge}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-6">
                {rich.inside.title}
              </h2>
              <div className="space-y-4 text-gray-400 text-sm sm:text-base leading-relaxed">
                {rich.inside.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            {/* Large Cabin Image Preview */}
            <div className="bg-[#0e0f14] border border-gray-800/80 rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative aspect-[16/9] w-full bg-black">
                <Image
                  src={rich.inside.image}
                  alt={rich.inside.imageAlt}
                  fill
                  sizes="(max-width: 1280px) 100vw, 1200px"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                  <p className="text-xs sm:text-sm text-gray-200 bg-black/80 backdrop-blur-md border border-gray-700/80 rounded-xl px-4 py-2.5 max-w-2xl leading-relaxed">
                    {rich.inside.caption}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* 3. ONBOARD CONNECTIVITY & AMENITIES                       */}
      {/* ========================================================= */}
      <section
        data-section-type="vehicle_amenities"
        className="py-20 lg:py-24 bg-[#0a0a0c] border-b border-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-[11px] font-bold tracking-widest text-abBlue uppercase mb-3 bg-abBlue/10 border border-abBlue/30 rounded-full px-3.5 py-1">
              {rich?.onboard.badge || (isAr ? "التجهيزات" : "Onboard")}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4">
              {rich?.onboard.title || labels.features}
            </h2>
            {rich?.onboard.intro && (
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                {rich.onboard.intro}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(rich?.onboard.amenities || copy.features).map((amenity, idx) => {
              // Pick an appropriate icon based on index or title
              const getIcon = (i: number) => {
                switch (i % 4) {
                  case 0:
                    return <BatteryCharging className="w-5 h-5 text-abBlue" />;
                  case 1:
                    return <Wifi className="w-5 h-5 text-abBlue" />;
                  case 2:
                    return <Laptop className="w-5 h-5 text-abBlue" />;
                  default:
                    return <Droplets className="w-5 h-5 text-abBlue" />;
                }
              };

              return (
                <div
                  key={amenity.title}
                  className="bg-[#0e0f14] border border-gray-800 rounded-2xl p-6 hover:border-abBlue/60 transition-all duration-300 group shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-abBlue/10 border border-abBlue/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      {getIcon(idx)}
                    </div>
                    <h3 className="text-white font-bold text-base mb-2.5">{amenity.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{amenity.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. USE CASES / SUITABILITY                                */}
      {/* ========================================================= */}
      {rich?.useCases && (
        <section
          data-section-type="vehicle_use_cases"
          className="py-20 lg:py-24 bg-[#08080a] border-b border-gray-900"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-14">
              <span className="inline-block text-[11px] font-bold tracking-widest text-abBlue uppercase mb-3 bg-abBlue/10 border border-abBlue/30 rounded-full px-3.5 py-1">
                {rich.useCases.badge}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4">
                {rich.useCases.title}
              </h2>
              {rich.useCases.intro && (
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  {rich.useCases.intro}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {rich.useCases.cases.map((uc, i) => (
                <div
                  key={uc.title}
                  className="bg-[#0e0f14] border border-gray-800 rounded-2xl p-7 relative hover:border-abBlue/60 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-mono font-bold text-abBlue bg-abBlue/10 px-2.5 py-1 rounded-md border border-abBlue/30">
                      0{i + 1}
                    </span>
                    <h3 className="text-lg font-bold text-white">{uc.title}</h3>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">{uc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* 5. MANAGED CORPORATE SERVICES                             */}
      {/* ========================================================= */}
      {rich?.services && (
        <section
          data-section-type="vehicle_services"
          className="py-20 lg:py-24 bg-[#0a0a0c] border-b border-gray-900"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="inline-block text-[11px] font-bold tracking-widest text-abBlue uppercase mb-3 bg-abBlue/10 border border-abBlue/30 rounded-full px-3.5 py-1">
                {rich.services.badge}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4">
                {rich.services.title}
              </h2>
              {rich.services.intro && (
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  {rich.services.intro}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rich.services.items.map((svc) => (
                <div
                  key={svc.title}
                  className="bg-[#0e0f14] border border-gray-800 rounded-2xl p-6 flex flex-col justify-between hover:border-abBlue/60 transition-colors"
                >
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{svc.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-4">{svc.desc}</p>
                  </div>
                  {svc.href && (
                    <Link
                      href={svc.href}
                      className="text-abBlue hover:text-abBlue/80 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors self-start"
                    >
                      <span>{isAr ? "استكشف الخدمة" : "Explore Service"}</span>
                      <ArrowRight className={`w-3.5 h-3.5 ${isAr ? "rotate-180" : ""}`} />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* 6. AT A GLANCE: FLEET COMPARISON TABLE                    */}
      {/* ========================================================= */}
      {rich?.comparison && (
        <section
          data-section-type="vehicle_comparison"
          className="py-20 lg:py-24 bg-[#08080a] border-b border-gray-900"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="inline-block text-[11px] font-bold tracking-widest text-abBlue uppercase mb-3 bg-abBlue/10 border border-abBlue/30 rounded-full px-3.5 py-1">
                {rich.comparison.badge}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4">
                {rich.comparison.title}
              </h2>
              {rich.comparison.intro && (
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  {rich.comparison.intro}
                </p>
              )}
            </div>

            <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-[#0e0f14] shadow-2xl">
              <table className="w-full text-left text-sm text-gray-300">
                <thead className="bg-[#14161f] text-xs uppercase tracking-wider text-gray-400 border-b border-gray-800">
                  <tr>
                    {rich.comparison.headers.map((h, i) => (
                      <th key={i} className="px-6 py-4 font-semibold whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/80">
                  {rich.comparison.rows.map((row, rIdx) => {
                    const isCurrent =
                      row[0]?.toLowerCase().includes(target.slug.replace("-", " ")) ||
                      (target.slug === "business-sedan" && row[0]?.toLowerCase().includes("business")) ||
                      (target.slug === "standard-sedan" && row[0]?.toLowerCase().includes("standard"));

                    return (
                      <tr
                        key={rIdx}
                        className={`transition-colors ${
                          isCurrent
                            ? "bg-abBlue/10 font-medium text-white"
                            : "hover:bg-white/[0.02]"
                        }`}
                      >
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`px-6 py-4.5 ${
                              cIdx === 0
                                ? "font-bold text-white flex items-center gap-2 whitespace-nowrap"
                                : ""
                            }`}
                          >
                            {cIdx === 0 && isCurrent && (
                              <span className="w-2 h-2 rounded-full bg-abBlue shrink-0" />
                            )}
                            {cell}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* 7. REGIONAL SERVICE AVAILABILITY                          */}
      {/* ========================================================= */}
      {rich?.coverage && (
        <section
          data-section-type="vehicle_coverage"
          className="py-16 lg:py-20 bg-[#0a0a0c] border-b border-gray-900"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#0e0f14] border border-gray-800 rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-abBlue/5 rounded-full blur-3xl pointer-events-none" />

              <div className="max-w-3xl relative z-10">
                <span className="inline-block text-[11px] font-bold tracking-widest text-abBlue uppercase mb-3 bg-abBlue/10 border border-abBlue/30 rounded-full px-3.5 py-1">
                  {rich.coverage.badge}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-6">
                  {rich.coverage.title}
                </h2>
                <div className="space-y-4 text-gray-400 text-sm sm:text-base leading-relaxed">
                  {rich.coverage.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {["Riyadh", "Jeddah", "Dammam", "Dubai", "Abu Dhabi", "Doha"].map((city) => (
                    <span
                      key={city}
                      className="inline-flex items-center gap-1.5 text-xs text-gray-300 bg-black/60 border border-gray-800 rounded-full px-3.5 py-1.5"
                    >
                      <MapPin className="w-3.5 h-3.5 text-abBlue shrink-0" />
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* 8. FREQUENTLY ASKED QUESTIONS                             */}
      {/* ========================================================= */}
      {rich?.faqs && (
        <section
          data-section-type="vehicle_faqs"
          className="py-20 lg:py-24 bg-[#08080a] border-b border-gray-900"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="inline-block text-[11px] font-bold tracking-widest text-abBlue uppercase mb-3 bg-abBlue/10 border border-abBlue/30 rounded-full px-3.5 py-1">
                {rich.faqs.badge}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4">
                {rich.faqs.title}
              </h2>
            </div>

            <div className="space-y-4">
              {rich.faqs.items.map((faq, i) => (
                <details
                  key={i}
                  open={i === 0}
                  className="group bg-[#0e0f14] border border-gray-800 rounded-2xl p-6 open:border-abBlue/60 transition-all duration-300"
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-white text-base sm:text-lg select-none">
                    <span className="pr-4">{faq.question}</span>
                    <span className="w-8 h-8 rounded-full bg-white/5 group-open:bg-abBlue/10 flex items-center justify-center shrink-0 border border-gray-800 group-open:border-abBlue/40 transition-colors">
                      <ChevronDown className="w-4 h-4 text-gray-400 group-open:text-abBlue group-open:rotate-180 transition-transform duration-300" />
                    </span>
                  </summary>
                  <p className="mt-4 pt-4 border-t border-gray-800/80 text-sm sm:text-base text-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* 9. RESERVE / PLAN JOURNEY & INQUIRY FORM                  */}
      {/* ========================================================= */}
      <section
        id="inquiry"
        data-section-type="vehicle_booking"
        className="py-20 lg:py-24 bg-[#050505] border-b border-gray-900 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6">
            <span className="inline-block text-[11px] font-bold tracking-widest text-abBlue uppercase mb-3 bg-abBlue/10 border border-abBlue/30 rounded-full px-3.5 py-1">
              {isAr ? "حجز واستفسار" : "Direct Reservation"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              {rich?.cta.title || labels.ctaTitle}
            </h2>
            <p className="text-lg text-gray-300 font-semibold mb-6">
              {rich?.cta.subtitle || labels.ctaDesc}
            </p>

            <div className="space-y-4 text-gray-400 text-sm sm:text-base leading-relaxed mb-8">
              {(rich?.cta.paragraphs || [labels.governanceDesc]).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Gallery thumbnails */}
            <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-4">
              {labels.gallery}
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {target.gallery.map((img, idx) => (
                <div
                  key={idx}
                  className="bg-[#0e0f14] border border-gray-800 rounded-xl overflow-hidden aspect-video relative"
                >
                  <Image
                    src={img}
                    alt={`${copy.model} view ${idx + 1}`}
                    fill
                    sizes="180px"
                    className="object-cover object-center hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <ServiceInquiryForm
              serviceName={inquirySubject}
              serviceUrl={fleetVehicleUrl(lang, target.slug)}
              dict={dict}
            />
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 10. RELATED VEHICLES                                      */}
      {/* ========================================================= */}
      <section data-section-type="vehicle_related" className="py-20 bg-[#08080a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-abBlue uppercase tracking-wider block mb-1">
                {isAr ? "تنوع الأسطول" : "Fleet Diversity"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {labels.related}
              </h2>
            </div>
            <Link
              href={fleetUrl(lang)}
              className="text-abBlue hover:text-abBlue/80 text-sm font-semibold inline-flex items-center gap-1.5 transition-colors"
            >
              <span>{isAr ? "عرض الأسطول بالكامل" : "View Complete Fleet"}</span>
              <ArrowRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((v) => {
              const vCopy = v.copy[l];
              return (
                <Link
                  key={v.slug}
                  href={fleetVehicleUrl(lang, v.slug)}
                  className="group bg-[#0e0f14] border border-gray-800 rounded-2xl overflow-hidden hover:border-abBlue/70 transition-all duration-300 shadow-md"
                >
                  <div className="bg-[#050505] h-36 flex items-center justify-center p-4 border-b border-gray-900 relative">
                    <Image
                      src={v.image}
                      alt={`${vCopy.model} — ${vCopy.title}`}
                      width={220}
                      height={120}
                      className="w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-white text-sm font-bold mb-1 group-hover:text-abBlue transition-colors">
                      {vCopy.model}
                    </p>
                    <p className="text-gray-500 text-xs mb-3 truncate">{vCopy.title}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-400 border-t border-gray-800/80 pt-3">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-abBlue" />
                        {v.passengers}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5 text-abBlue" />
                        {v.luggage}
                      </span>
                    </div>
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
