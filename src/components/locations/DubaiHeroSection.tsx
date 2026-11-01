"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar } from "lucide-react";
import type { SectionInstance, SectionRenderContext } from "@/components/section-library/types";
import { localeBase, localeHome } from "@/app/[lang]/dictionaries";
import DubaiSkylineSvg from "./DubaiSkylineSvg";
import RiyadhSkylineSvg from "./RiyadhSkylineSvg";

interface DubaiHeroProps {
  section?: SectionInstance;
  context?: SectionRenderContext;
}

export default function DubaiHeroSection({ section, context }: DubaiHeroProps) {
  const router = useRouter();
  const lang = (context?.kind === "location" ? context.lang : undefined) || "en-US";
  const isArabic = lang === "ar";

  const content = (section?.content || {}) as Record<string, string>;
  const appearance = (section?.appearance || {}) as Record<string, unknown>;

  // Dynamic City & Country resolution
  const ctxCity = context?.kind === "location" ? context.city : undefined;
  const ctxCountry = context?.kind === "location" ? context.country : undefined;

  const cityName =
    content.title ||
    (isArabic && ctxCity?.nameAr ? ctxCity.nameAr : ctxCity?.name) ||
    (isArabic ? "دبي" : "Dubai");

  const countryName =
    content.countryName ||
    (isArabic && ctxCountry?.nameAr ? ctxCountry.nameAr : ctxCountry?.name) ||
    (isArabic ? "الإمارات العربية المتحدة" : "United Arab Emirates");

  const countrySlug =
    content.countrySlug ||
    ctxCountry?.slug ||
    "united-arab-emirates";

  const citySlug = (ctxCity?.slug || content.citySlug || cityName.toLowerCase()).trim();
  const isRiyadh = citySlug.includes("riyadh") || cityName.toLowerCase().includes("riyadh") || content.skyline === "riyadh";

  const bgImage =
    (appearance.background as string) ||
    content.backgroundImage ||
    (isRiyadh ? "/hero/city-riyadh.jpg" : "/hero/B4.jpg.jpeg");

  const badgeText =
    content.badge ||
    (isArabic
      ? `خدمة السائق الخاص في ${cityName}`
      : `CHAUFFEUR SERVICE IN ${cityName.toUpperCase()}`);

  const title = content.title || cityName;

  const defaultDescription = isRiyadh
    ? (isArabic
        ? "من الوصول في مطار الملك خالد الدولي إلى غرف اجتماعات مركز الملك عبد الله المالي وزيارات الوزارات وفعاليات موسم الرياض، تنقل إيه بي ليمو التنفيذيين والوفود والضيوف في جميع أنحاء العاصمة بأسطول أسود فخم يقوده سائقون محترفون ومعتمدون."
        : "From King Khalid International arrivals to KAFD boardrooms, ministry visits and Riyadh Season events, AB.Limo moves executives, delegations and guests across the capital in an immaculate black fleet, driven by vetted professional chauffeurs.")
    : (isArabic
        ? "من الوصول في مطار دبي إلى غرف اجتماعات مركز دبي المالي العالمي والفعاليات المسائية في نخلة جميرا، تنقل إيه بي ليمو التنفيذيين والوفود والضيوف في جميع أنحاء دبي بأسطول أسود فخم يقوده سائقون محترفون ومعتمدون."
        : "From DXB arrivals to DIFC boardrooms and evening events on the Palm, AB.Limo moves executives, delegations and guests across Dubai in an immaculate black fleet, driven by vetted professional chauffeurs.");

  const description = content.description || defaultDescription;

  const bookNowLabel = content.bookNowLabel || (isArabic ? "احجز الآن" : "BOOK NOW");
  const viewFleetLabel = content.viewFleetLabel || (isArabic ? "استعرض الأسطول" : "VIEW THE FLEET");

  const defaultPickup = content.pickupDefault || (isRiyadh ? "King Khalid International (RUH)" : "Dubai International (DXB)");
  const defaultDropoff = content.dropoffDefault || (isRiyadh ? "KAFD, Riyadh" : "DIFC, Gate Avenue");

  // Booking Bar State
  const [pickup, setPickup] = React.useState(defaultPickup);
  const [dropoff, setDropoff] = React.useState(defaultDropoff);
  const [dateTime, setDateTime] = React.useState("");

  React.useEffect(() => {
    if (defaultPickup) setPickup(defaultPickup);
    if (defaultDropoff) setDropoff(defaultDropoff);
  }, [defaultPickup, defaultDropoff]);

  const handleGetQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (pickup) params.set("pickup", pickup);
    if (dropoff) params.set("dropoff", dropoff);
    if (dateTime) params.set("datetime", dateTime);
    router.push(`${localeBase(lang)}/contact?${params.toString()}`);
  };

  const renderSkyline = () => {
    if (content.skyline === "none") return null;
    if (isRiyadh || content.skyline === "riyadh") {
      return <RiyadhSkylineSvg className="w-full h-auto" />;
    }
    return <DubaiSkylineSvg className="w-full h-auto" />;
  };

  return (
    <section className="relative w-full min-h-[92vh] flex flex-col justify-between pt-24 pb-8 overflow-hidden bg-[#0c0d11]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt={title}
          fill
          priority
          className="object-cover object-right md:object-center"
        />
        {/* Gradients matching original design: dark on left, subtle on right to reveal chauffeur */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 md:via-black/70 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d11] via-transparent to-black/60" />
      </div>

      {/* Skyline vector drawing overlay on right */}
      <div className="absolute right-0 bottom-32 sm:bottom-28 z-10 w-full max-w-xl lg:max-w-2xl pointer-events-none opacity-40 md:opacity-55 pr-4 hidden sm:block">
        {renderSkyline()}
      </div>

      {/* Main Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-10 pt-4 md:pt-8 flex-1 flex flex-col justify-center">
        {/* Breadcrumb: LOCATIONS / COUNTRY / CITY */}
        <nav className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] text-white/50 uppercase mb-8">
          <Link href={localeHome(lang)} className="hover:text-abBlue transition-colors">
            {isArabic ? "الرئيسية" : "LOCATIONS"}
          </Link>
          <span className="text-white/30">/</span>
          <Link
            href={`${localeBase(lang)}/locations/${countrySlug}`}
            className="hover:text-abBlue transition-colors"
          >
            {countryName}
          </Link>
          <span className="text-white/30">/</span>
          <span className="text-white">{cityName}</span>
        </nav>

        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-abBlue/40 bg-abBlue/10 backdrop-blur-sm w-fit mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-abBlue shadow-[0_0_8px_rgba(37,159,207,0.8)]" />
          <span className="text-[10px] md:text-[11px] font-bold tracking-[0.22em] text-abBlue uppercase">
            {badgeText}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-white tracking-tight leading-none mb-6">
          {title}
        </h1>

        {/* Description */}
        <p className="max-w-xl text-sm sm:text-base text-gray-300 leading-relaxed font-normal mb-8">
          {description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="#booking-bar"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("booking-bar");
              if (el) el.scrollIntoView({ behavior: "smooth" });
              else router.push(`${localeBase(lang)}/contact`);
            }}
            className="px-8 py-3.5 rounded-md bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-gray-200 transition-colors shadow-lg"
          >
            {bookNowLabel}
          </Link>

          <Link
            href="#fleet"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("fleet");
              if (el) el.scrollIntoView({ behavior: "smooth" });
              else router.push(`${localeBase(lang)}/fleet`);
            }}
            className="px-8 py-3.5 rounded-md bg-transparent border border-white/40 text-white font-semibold text-xs tracking-wider uppercase hover:border-white hover:bg-white/10 transition-colors"
          >
            {viewFleetLabel}
          </Link>
        </div>
      </div>

      {/* Booking Bar (matching image 0: PICK UP | DROP OFF | DATE AND TIME | GET A QUOTE) */}
      <div id="booking-bar" className="relative z-20 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-10 mt-12">
        <form
          onSubmit={handleGetQuote}
          className="w-full bg-[#111111]/90 backdrop-blur-md border border-gray-800 rounded-xl p-4 sm:p-5 flex flex-col lg:flex-row items-stretch lg:items-center gap-4 lg:gap-6 shadow-2xl"
        >
          {/* Pick Up */}
          <div className="flex-1 border-b lg:border-b-0 lg:border-r border-gray-800 pb-3 lg:pb-0 lg:pr-6">
            <label className="block text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-1">
              {isArabic ? "نقطة الانطلاق" : "PICK UP"}
            </label>
            <input
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder={isArabic ? "مطار دبي الدولي (DXB)" : "Airport, hotel, address"}
              className="w-full bg-transparent text-sm sm:text-base text-white placeholder-gray-500 font-medium focus:outline-none focus:text-abBlue transition-colors"
            />
          </div>

          {/* Drop Off */}
          <div className="flex-1 border-b lg:border-b-0 lg:border-r border-gray-800 pb-3 lg:pb-0 lg:pr-6">
            <label className="block text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-1">
              {isArabic ? "الوجهة" : "DROP OFF"}
            </label>
            <input
              type="text"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              placeholder={isArabic ? "مركز دبي المالي العالمي" : "Destination or city"}
              className="w-full bg-transparent text-sm sm:text-base text-white placeholder-gray-500 font-medium focus:outline-none focus:text-abBlue transition-colors"
            />
          </div>

          {/* Date and Time */}
          <div className="flex-1 border-b lg:border-b-0 border-gray-800 pb-3 lg:pb-0">
            <label className="block text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-1">
              {isArabic ? "التاريخ والوقت" : "DATE AND TIME"}
            </label>
            <div className="relative flex items-center">
              <input
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder-gray-500 font-medium focus:outline-none focus:text-abBlue transition-colors cursor-pointer [color-scheme:dark]"
              />
              <Calendar className="w-4 h-4 text-gray-400 pointer-events-none absolute right-2" />
            </div>
          </div>

          {/* Submit: Get a Quote */}
          <div className="flex-shrink-0 pt-2 lg:pt-0">
            <button
              type="submit"
              className="w-full lg:w-auto px-8 py-3.5 rounded-md bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-abBlue hover:text-white transition-all duration-200 shadow-md flex items-center justify-center whitespace-nowrap"
            >
              {isArabic ? "طلب عرض أسعار" : "GET A QUOTE"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
