"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Sparkles,
  Download,
  ArrowRight,
  Users,
  Briefcase,
  ShieldCheck,
  ChevronDown,
  Bus,
  PhoneCall,
  CheckCircle2,
} from "lucide-react";
import {
  type FleetClass,
  type FleetVehicle,
  type FleetLang,
  type FleetFaq,
  fleetVehicleUrl,
  FLEET_HERO_IMAGE,
  FLEET_FAQS,
  FLEET_COACH_INFO,
} from "@/lib/fleet";
import { localeBase } from "@/app/[lang]/dictionaries";

interface FleetInteractiveShowcaseProps {
  lang: string;
  l: FleetLang;
  classes: FleetClass[];
  mainClasses: FleetClass[];
  quickClasses: FleetClass[];
  allVehicles: FleetVehicle[];
}

/**
 * Header mega-menu fleet items (`/fleet#sedans`, `/fleet#suvs`, ...) mapped to
 * preview tab ids. On the fleet page the click is handled locally: the matching
 * tab is selected and the explorer scrolled into view, so the `#hash` in the
 * URL is never required.
 */
const FLEET_HASH_TABS: Record<string, string> = {
  sedans: "standard-sedan",
  suvs: "executive-suv",
  luxury: "first-class-sedan",
  sprinters: "executive-van",
  coaches: "coach",
  buses: "bus",
};

export default function FleetInteractiveShowcase({
  lang,
  l,
  classes,
  mainClasses,
  quickClasses,
  allVehicles,
}: FleetInteractiveShowcaseProps) {
  const isAr = l === "ar";
  const [selectedId, setSelectedId] = React.useState<string>("first-class-sedan");
  const [isAnimating, setIsAnimating] = React.useState<boolean>(false);
  const [activeFilter, setActiveFilter] = React.useState<string>("all");
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(0);

  const selectedClass =
    classes.find((c) => c.id === selectedId) || classes[2] || classes[0];

  // Latest selection, readable from stable listeners created inside effects.
  const selectedIdRef = React.useRef(selectedId);
  selectedIdRef.current = selectedId;

  const handleSelectClass = (id: string, scrollToShowcase = false) => {
    // Always scroll when asked — even if the tab is already selected.
    if (selectedIdRef.current !== id) {
      selectedIdRef.current = id;
      setIsAnimating(true);
      setSelectedId(id);
      setTimeout(() => setIsAnimating(false), 240);
    }

    if (scrollToShowcase) {
      const el = document.getElementById("vehicle-showcase");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const classIdForSlug = (slug: string) =>
    classes.find((c) => c.slug === slug)?.id ?? slug;

  // The side panel only lists the main categories (aligned with the preview
  // panel height). If a non-main vehicle is picked from the quick bar,
  // comparison table or catalog, pin it at the top so the list stays in sync.
  const sideClasses = React.useMemo(() => {
    const mainIds = new Set(mainClasses.map((c) => c.id));
    const selected = classes.find((c) => c.id === selectedId);
    if (selected && !mainIds.has(selected.id)) {
      return [selected, ...mainClasses];
    }
    return mainClasses;
  }, [classes, mainClasses, selectedId]);

  // Deep links such as /fleet#coaches (direct load or hash-only navigation
  // committed by the router) select their preview tab and jump to it.
  React.useEffect(() => {
    const selectTabForHash = () => {
      const key = decodeURIComponent(window.location.hash.replace(/^#/, ""));
      const tabId = FLEET_HASH_TABS[key];
      if (tabId) handleSelectClass(tabId, true);
    };

    const timer = window.location.hash
      ? window.setTimeout(selectTabForHash, 150)
      : null;
    window.addEventListener("hashchange", selectTabForHash);
    return () => {
      if (timer !== null) window.clearTimeout(timer);
      window.removeEventListener("hashchange", selectTabForHash);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Header/menu clicks on `/fleet#...` while already on this page: select the
  // matching tab and scroll to the explorer instead of changing the URL.
  React.useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as Element | null;
      const anchor = target?.closest?.("a[href]");
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";
      if (!href.includes("#")) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }

      // Only same-page links; cross-page links keep their normal navigation
      // and are picked up by the hash effect above once the page mounts.
      if (url.pathname !== window.location.pathname) return;

      const tabId = FLEET_HASH_TABS[decodeURIComponent(url.hash.slice(1))];
      if (!tabId) return;

      // preventDefault only — React still runs the menu's own onClick (so the
      // dropdown closes), while next/link bails on `e.defaultPrevented`, so
      // the URL stays clean and no navigation happens.
      event.preventDefault();
      handleSelectClass(tabId, true);
    };

    document.addEventListener("click", onDocumentClick, true);
    return () => document.removeEventListener("click", onDocumentClick, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToCompare = () => {
    const el = document.getElementById("compare-classes");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const filteredVehicles = React.useMemo(() => {
    if (activeFilter === "all") return allVehicles;
    return allVehicles.filter((v) => v.category === activeFilter);
  }, [allVehicles, activeFilter]);

  return (
    <div className="w-full bg-[#050505] text-white selection:bg-abBlue selection:text-white font-sans">
      {/* ============================================================ */}
      {/* 1. HERO SECTION (Real content from www.ab.limo-fleet.md)     */}
      {/* ============================================================ */}
      <section
        data-section-type="fleet_hero"
        className="relative w-full min-h-[640px] lg:min-h-[720px] flex flex-col justify-between overflow-hidden pt-28 lg:pt-36 border-b border-gray-900"
      >
        {/* Real background hero image from fleetpage_images/media_image.jpg */}
        <div className="absolute inset-0 z-0">
          <Image
            src={FLEET_HERO_IMAGE}
            alt={
              isAr
                ? "أسطول سيارات الليموزين الفاخرة السوداء خارج مبنى صالة الطيران الخاص"
                : "Fleet of black luxury vehicles lined up outside an executive terminal"
            }
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-105 transform motion-safe:animate-[pulse_12s_ease-in-out_infinite]"
          />
          {/* On Text dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-black/85" />
          {/* <div className="absolute inset-0 bg-radial from-transparent via-[#050505]/40 to-[#050505]" /> */}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10 lg:py-16">
          <div className="max-w-3xl">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-abBlue/40 text-xs font-bold tracking-[0.2em] text-abBlue uppercase mb-6 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-abBlue animate-ping" />
              <span>{isAr ? "أسطول السائق الخاص" : "CHAUFFEUR FLEET"}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-6 leading-[1.12]">
                <span className="text-abBlue">{isAr
                ? "أسطول السائق الخاص:"
                : "Chauffeur fleet:"}</span>
                <span className="text-white"> {isAr
                ? "أسود بالكامل،"
                : "Strictly black"}</span>
                <span className="text-abBlue"> {isAr ? "مثالي دائماً" : "Always immaculate"}</span>
            </h1>

            {/* Paragraph 1 */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed mb-4 max-w-2xl font-light">
              {isAr
                ? "يوفر أسطول السائق الخاص المدار تنقلاً تنفيذياً دقيقاً وسرياً عبر المملكة العربية السعودية ودولة الإمارات وقطر. تدير AB مركبات حديثة حصرياً باللون الأسود، مجهزة وفق أرقى معايير البروتوكول لجولات الأعمال، والزيارات الدبلوماسية، والتنقلات الخاصة."
                : "A managed chauffeur fleet provides punctual, discreet executive travel across Saudi Arabia, the UAE and Qatar. AB operates strictly black late model vehicles, prepared to protocol presentation standards for corporate roadshows, diplomatic visits and private transfers."}
            </p>

            {/* Paragraph 2 - Fleet amenities & flight tracking */}
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-8 max-w-2xl font-light">
              {isAr
                ? "يعتمد اختيار الفئة المناسبة على عدد الضيوف وسعة الأمتعة والجدول الزمني للرحلة. تشتمل كل مركبة على مياه معبأة، ومنافذ شحن، ومتابعة فورية للرحلات الجوية من فريق العمليات المركزي."
                : "Selecting the appropriate class depends on guest headcount, luggage volume and the operational profile of the schedule. Every vehicle includes bottled water, charging ports and professional flight tracking from our central operations team."}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={`${localeBase(lang)}/contact`}
                className="bg-white hover:bg-gray-200 text-black font-semibold text-xs uppercase tracking-widest px-8 py-3.5 rounded transition-all shadow-lg hover:shadow-white/20 active:scale-95"
              >
                {isAr ? "احجز الآن" : "BOOK NOW"}
              </Link>
              <button
                onClick={scrollToCompare}
                type="button"
                className="border border-white/40 hover:border-abBlue hover:text-abBlue text-white font-semibold text-xs uppercase tracking-widest px-8 py-3.5 rounded transition-all hover:bg-white/5 active:scale-95 cursor-pointer backdrop-blur-sm"
              >
                {isAr ? "قارن بين الفئات" : "COMPARE CLASSES"}
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Quick Bar Beneath Hero (Image 29) */}
        <div className="relative z-10 w-full border-t border-b border-gray-800/80 bg-black/75 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-gray-800/80 rtl:divide-x-reverse">
              {quickClasses.map((item) => {
                const isActive = item.id === selectedId;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectClass(item.id, true)}
                    type="button"
                    className={`py-4 px-3 text-left rtl:text-right transition-all group cursor-pointer ${
                      isActive
                        ? "bg-abBlue/10 border-b-2 border-abBlue"
                        : "hover:bg-white/5 border-b-2 border-transparent"
                    }`}
                  >
                    <p
                      className={`text-xs font-semibold tracking-wide transition-colors truncate ${
                        isActive
                          ? "text-abBlue"
                          : "text-gray-300 group-hover:text-white"
                      }`}
                    >
                      {item.name[l] || item.name.en}
                    </p>
                    <p className="text-[11px] text-gray-400 font-mono mt-0.5 truncate">
                      {item.guests} {isAr ? "ركاب" : "guests"} · {item.luggage} {isAr ? "حقائب" : "bags"}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. INTERACTIVE VEHICLE SHOWCASE (Matches 29.jpg + Real Content) */}
      {/* ============================================================ */}
      <section
        id="vehicle-showcase"
        data-section-type="fleet_showcase"
        className="w-full py-16 lg:py-24 bg-[#0a0a0a] border-b border-gray-900 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Vehicle Class List (4 / 12 width) */}
            <div className="lg:col-span-4 space-y-2.5">
              <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-abBlue mb-3 px-2">
                {isAr ? "اختر الفئة للاستعراض" : "SELECT CLASS TO PREVIEW"}
              </span>

              {sideClasses.map((cls) => {
                const isSelected = cls.id === selectedId;
                return (
                  <button
                    key={cls.id}
                    onClick={() => handleSelectClass(cls.id)}
                    type="button"
                    aria-selected={isSelected}
                    className={`w-full p-4 rounded-xl border transition-all text-left rtl:text-right flex items-center justify-between gap-4 cursor-pointer group ${
                      isSelected
                        ? "bg-[#16181f] border-abBlue/80 shadow-[0_4px_24px_rgba(37,159,207,0.18)]"
                        : "bg-[#0e0f13] border-gray-800/80 hover:border-gray-700 hover:bg-[#13151a]"
                    }`}
                  >
                    {/* Real transparent vehicle thumbnail */}
                    <div className="w-24 h-12 relative shrink-0 flex items-center justify-center bg-black/40 rounded-lg p-1 border border-gray-800/50">
                      <Image
                        src={cls.image}
                        alt={cls.name[l]}
                        width={96}
                        height={48}
                        className="object-contain max-h-full group-hover:scale-105 transition-transform"
                      />
                    </div>

                    {/* Class Details */}
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`text-sm font-semibold truncate transition-colors ${
                          isSelected ? "text-white" : "text-gray-300 group-hover:text-white"
                        }`}
                      >
                        {cls.name[l] || cls.name.en}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5 truncate">
                        {cls.category[l] || cls.category.en}
                      </p>
                    </div>

                    {/* Arrow Indicator */}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
                        isSelected
                          ? "bg-abBlue text-white"
                          : "text-gray-600 group-hover:text-gray-400"
                      }`}
                    >
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Dynamic Detail Panel (8 / 12 width) */}
            <div className="lg:col-span-8 bg-[#0e0f14] border border-gray-800/80 rounded-2xl p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-2xl">
              {/* Subtle background luxury glow */}
              <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-abBlue/10 rounded-full blur-[100px] pointer-events-none" />

              {/* Upper Section: Details + Interior Photo */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative z-10 mb-6">
                {/* Left Sub-Column: Title, Content, Buttons */}
                <div className="md:col-span-7 space-y-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-abBlue block mb-1.5">
                      {selectedClass.category[l] || selectedClass.category.en}
                    </span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                      {selectedClass.name[l] || selectedClass.name.en}
                    </h2>
                    <p className="text-xs text-gray-400 font-mono mt-1">
                      {selectedClass.typicalModel[l] || selectedClass.typicalModel.en}
                    </p>
                  </div>

                  {/* Real Markdown Description */}
                  <p className="text-sm text-gray-300 leading-relaxed font-light">
                    {selectedClass.description[l] || selectedClass.description.en}
                  </p>

                  {/* Explore button */}
                  <div>
                    <Link
                      href={fleetVehicleUrl(lang, selectedClass.slug)}
                      className="inline-flex items-center gap-2 border border-gray-700 hover:border-abBlue hover:text-abBlue text-white text-xs font-bold tracking-widest uppercase px-6 py-2.5 rounded transition-colors group"
                    >
                      <span>{isAr ? "استكشف الفئة" : "EXPLORE"}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* Quick Action Links with Icons */}
                  <div className="pt-4 border-t border-gray-800/80 space-y-2.5">
                    <Link
                      href={`${localeBase(lang)}/contact?service=${encodeURIComponent(
                        selectedClass.name[l] || selectedClass.name.en
                      )}`}
                      className="flex items-center gap-2.5 text-xs font-semibold tracking-wider text-gray-300 hover:text-abBlue transition-colors group"
                    >
                      <Calendar className="w-4 h-4 text-abBlue shrink-0" />
                      <span className="uppercase">{isAr ? "حجز هذه الفئة" : "BOOK THIS CLASS"}</span>
                    </Link>

                    <Link
                      href={`${localeBase(lang)}/contact?inquiry=quote&vehicle=${encodeURIComponent(
                        selectedClass.name[l] || selectedClass.name.en
                      )}`}
                      className="flex items-center gap-2.5 text-xs font-semibold tracking-wider text-gray-300 hover:text-abBlue transition-colors group"
                    >
                      <Sparkles className="w-4 h-4 text-abBlue shrink-0" />
                      <span className="uppercase">{isAr ? "طلب عرض سعر" : "REQUEST A QUOTE"}</span>
                    </Link>

                    <Link
                      href={`${localeBase(lang)}/contact?inquiry=brochure`}
                      className="flex items-center gap-2.5 text-xs font-semibold tracking-wider text-gray-300 hover:text-abBlue transition-colors group"
                    >
                      <Download className="w-4 h-4 text-gray-400 group-hover:text-abBlue shrink-0" />
                      <span className="uppercase">{isAr ? "تحميل كتيب الأسطول" : "DOWNLOAD FLEET BROCHURE"}</span>
                    </Link>
                  </div>
                </div>

                {/* Right Sub-Column: Real Fleet Interior Photo from fleetpage_images */}
                <div className="md:col-span-5 flex flex-col items-end">
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-gray-800 group shadow-lg bg-black">
                    <Image
                      src={selectedClass.interiorImage}
                      alt={selectedClass.interiorLabel[l] || selectedClass.interiorLabel.en}
                      fill
                      sizes="(max-width: 768px) 100vw, 360px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <div className="absolute bottom-2.5 left-2.5 right-2.5">
                      <p className="text-[10px] leading-tight text-gray-200 font-medium">
                        {selectedClass.interiorLabel[l] || selectedClass.interiorLabel.en}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Vehicle Presentation: Real Transparent Side Cutout */}
              <div className="relative my-2 py-4 flex items-center justify-center min-h-[220px] sm:min-h-[260px]">
                <div
                  className={`w-full max-w-xl transition-all duration-300 transform ${
                    isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
                  }`}
                >
                  <Image
                    src={selectedClass.image}
                    alt={selectedClass.name[l] || selectedClass.name.en}
                    width={720}
                    height={340}
                    priority
                    className="w-full max-h-[250px] object-contain drop-shadow-[0_24px_32px_rgba(0,0,0,0.9)]"
                  />
                  <div className="w-4/5 h-3.5 bg-black/80 mx-auto blur-md rounded-full mt-2" />
                </div>
              </div>

              {/* Bottom Specs Bar */}
              <div className="border-t border-gray-800/80 pt-6 mt-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 divide-x divide-gray-800/50 rtl:divide-x-reverse">
                  <div className="px-2">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">
                      {isAr ? "الركاب" : "GUESTS"}
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                      <Users className="w-5 h-5 text-abBlue" />
                      <span>{selectedClass.guests}</span>
                    </p>
                  </div>

                  <div className="px-2">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">
                      {isAr ? "الأمتعة" : "LUGGAGE"}
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-abBlue" />
                      <span>{selectedClass.luggage}</span>
                    </p>
                  </div>

                  <div className="px-2 col-span-2 sm:col-span-1">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">
                      {isAr ? "النموذج المعتاد" : "TYPICAL MODEL"}
                    </p>
                    <p className="text-sm font-semibold text-white truncate">
                      {selectedClass.typicalModel[l] || selectedClass.typicalModel.en}
                    </p>
                  </div>

                  <div className="px-2 col-span-2 sm:col-span-1">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">
                      {isAr ? "مثالية لـ" : "IDEAL FOR"}
                    </p>
                    <p className="text-sm font-semibold text-white truncate">
                      {selectedClass.idealFor[l] || selectedClass.idealFor.en}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. AT A GLANCE - COMPARISON TABLE (Exact Content from MD)   */}
      {/* ============================================================ */}
      <section
        id="compare-classes"
        data-section-type="fleet_comparison"
        className="w-full py-16 lg:py-24 bg-[#050505] border-b border-gray-900 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-abBlue block mb-2">
              {isAr ? "نظرة سريعة" : "AT A GLANCE"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
              {isAr ? "قارن بين جميع الفئات" : "Compare every class"}
            </h2>
            <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed font-light">
              {isAr
                ? "تساعد مراجعة مواصفات المركبات فرق تنظيم السفر المؤسسي على اختيار الفئة المناسبة للضيوف. تخضع كل مركبة في أسطول السائق الخاص لتعقيم دقيق وفحص شامل متعدد النقاط قبل التوجيه."
                : "Reviewing vehicle specifications helps corporate travel teams choose the correct category for incoming guests. Every vehicle in our chauffeur fleet undergoes rigorous sanitisation and multi point inspection prior to dispatch."}
            </p>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-hidden rounded-xl border border-gray-800 bg-[#0d0e12] mb-6 shadow-xl">
            <table className="w-full text-left rtl:text-right border-collapse">
              <thead>
                <tr className="border-b border-gray-800 text-[10px] tracking-[0.2em] text-gray-400 uppercase bg-black/50">
                  <th className="py-4 px-6 font-bold">{isAr ? "الفئة" : "CLASS"}</th>
                  <th className="py-4 px-6 font-bold">{isAr ? "النموذج المعتاد" : "TYPICAL MODEL"}</th>
                  <th className="py-4 px-6 font-bold text-center">{isAr ? "الركاب" : "GUESTS"}</th>
                  <th className="py-4 px-6 font-bold text-center">{isAr ? "الأمتعة" : "LUGGAGE"}</th>
                  <th className="py-4 px-6 font-bold">{isAr ? "مثالية لـ" : "IDEAL FOR"}</th>
                  <th className="py-4 px-6 font-bold text-right rtl:text-left">{isAr ? "عرض" : "ACTION"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 text-sm">
                {classes.map((row) => {
                  const isSelected = row.id === selectedId;
                  return (
                    <tr
                      key={row.id}
                      onClick={() => handleSelectClass(row.id, true)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-abBlue/10 hover:bg-abBlue/15"
                          : "hover:bg-white/5"
                      }`}
                    >
                      <td className="py-5 px-6 font-semibold text-white whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isSelected ? "bg-abBlue" : "bg-gray-600"
                            }`}
                          />
                          <span>{row.name[l] || row.name.en}</span>
                        </div>
                      </td>
                      <td className="py-5 px-6 text-gray-300">
                        {row.typicalModel[l] || row.typicalModel.en}
                      </td>
                      <td className="py-5 px-6 text-center font-mono text-white font-semibold">
                        {row.guests}
                      </td>
                      <td className="py-5 px-6 text-center font-mono text-white font-semibold">
                        {row.luggage}
                      </td>
                      <td className="py-5 px-6 text-gray-300">
                        {row.idealFor[l] || row.idealFor.en}
                      </td>
                      <td className="py-5 px-6 text-right rtl:text-left">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectClass(row.id, true);
                          }}
                          className="inline-flex items-center gap-1.5 text-xs text-abBlue hover:text-white font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          <span>{isAr ? "تفاصيل" : "Details"}</span>
                          <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4 mb-6">
            {classes.map((row) => {
              const isSelected = row.id === selectedId;
              return (
                <div
                  key={row.id}
                  onClick={() => handleSelectClass(row.id, true)}
                  className={`p-5 rounded-xl border transition-all ${
                    isSelected
                      ? "bg-[#16181f] border-abBlue"
                      : "bg-[#0d0e12] border-gray-800"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-base font-bold text-white">
                      {row.name[l] || row.name.en}
                    </h3>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectClass(row.id, true);
                      }}
                      className="text-xs text-abBlue font-semibold uppercase flex items-center gap-1 cursor-pointer"
                    >
                      <span>{isAr ? "تفاصيل" : "Details"}</span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </button>
                  </div>

                  <p className="text-xs text-gray-300 mb-4">
                    <span className="text-gray-400">{isAr ? "النموذج:" : "Model:"}</span>{" "}
                    {row.typicalModel[l] || row.typicalModel.en}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs border-t border-b border-gray-800 py-3 mb-3">
                    <div>
                      <span className="text-gray-400 block text-[10px] uppercase">
                        {isAr ? "الركاب" : "GUESTS"}
                      </span>
                      <span className="text-white font-bold">{row.guests}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px] uppercase">
                        {isAr ? "الأمتعة" : "LUGGAGE"}
                      </span>
                      <span className="text-white font-bold">{row.luggage}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-400">
                    <span className="text-gray-400">{isAr ? "مثالية لـ:" : "Ideal for:"}</span>{" "}
                    {row.idealFor[l] || row.idealFor.en}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Duty of Care Footer Line from Markdown */}
          <div className="p-4 rounded-xl bg-[#0d0e14] border border-gray-800/80 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-abBlue shrink-0" />
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light">
              {FLEET_COACH_INFO.dutyOfCare[l] || FLEET_COACH_INFO.dutyOfCare.en}
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. CHAUFFEUR FLEET COACH OPTIONS FOR DELEGATIONS (From MD)    */}
      {/* ============================================================ */}
      <section
        data-section-type="fleet_coach_options"
        className="w-full py-16 lg:py-24 bg-[#0a0a0c] border-b border-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-abBlue/10 border border-abBlue/30 text-xs font-bold tracking-widest text-abBlue uppercase">
                <Bus className="w-3.5 h-3.5" />
                <span>{FLEET_COACH_INFO.badge[l] || FLEET_COACH_INFO.badge.en}</span>
              </span>

              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {FLEET_COACH_INFO.title[l] || FLEET_COACH_INFO.title.en}
              </h2>

              <p className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                {FLEET_COACH_INFO.subtitle[l] || FLEET_COACH_INFO.subtitle.en}
              </p>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light">
                {FLEET_COACH_INFO.description[l] || FLEET_COACH_INFO.description.en}
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <Link
                  href={`${localeBase(lang)}/services/bus-coach-hire`}
                  className="bg-abBlue hover:bg-abBlue/90 text-white font-semibold text-xs uppercase tracking-widest px-7 py-3.5 rounded transition-all shadow-md active:scale-95"
                >
                  {isAr ? "خدمة استئجار الحافلات" : "BUS & COACH HIRE"}
                </Link>
                <button
                  type="button"
                  onClick={() => handleSelectClass(classIdForSlug("mini-bus"), true)}
                  className="border border-gray-700 hover:border-abBlue hover:text-abBlue text-white font-semibold text-xs uppercase tracking-widest px-7 py-3.5 rounded transition-all hover:bg-white/5 active:scale-95 cursor-pointer"
                >
                  {isAr ? "استكشف أسطول الحافلات" : "EXPLORE COACH FLEET"}
                </button>
              </div>
            </div>

            {/* Right: Coach delegation real image from fleetpage_images/media_image8.jpg */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-gray-800 shadow-2xl group">
                <Image
                  src={FLEET_COACH_INFO.image}
                  alt={
                    isAr
                      ? "حافلة سياحية فاخرة سوداء متوقفة في مكان انعقاد المؤتمر"
                      : "Modern black luxury tour coach parked at a convention venue"
                  }
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs text-gray-200 font-medium">
                    {isAr
                      ? "حافلات فاخرة سوداء بالكامل مجهزة لنقل الوفود الدبلوماسية والمؤتمرات الدولية."
                      : "Uniform black luxury coaches configured for international delegations and congresses."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. FREQUENTLY ASKED QUESTIONS (All 7 FAQs from MD)          */}
      {/* ============================================================ */}
      <section
        data-section-type="fleet_faqs"
        className="w-full py-16 lg:py-24 bg-[#08080a] border-b border-gray-900"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-abBlue block mb-2">
              {isAr ? "الأسئلة الشائعة" : "FREQUENTLY ASKED QUESTIONS"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {isAr
                ? "الأسئلة الشائعة حول أسطول السائق الخاص"
                : "Frequently asked questions about our chauffeur fleet"}
            </h2>
          </div>

          <div className="space-y-3.5">
            {FLEET_FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-xl border transition-all overflow-hidden ${
                    isOpen
                      ? "bg-[#12131a] border-abBlue/60 shadow-lg"
                      : "bg-[#0d0e12] border-gray-800/80 hover:border-gray-700"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    type="button"
                    className="w-full py-5 px-6 text-left rtl:text-right flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-base font-semibold text-white tracking-wide">
                      {faq.q[l] || faq.q.en}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-abBlue shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-gray-300 leading-relaxed font-light border-t border-gray-800/50">
                      {faq.a[l] || faq.a.en}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. NEED A LARGER MOVEMENT? PROPOSAL BANNER (From MD)         */}
      {/* ============================================================ */}
      <section
        data-section-type="fleet_large_movement_cta"
        className="w-full py-16 lg:py-20 bg-[#050505] border-b border-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 bg-gradient-to-r from-[#111218] via-[#0f1015] to-[#0c0d11] border border-gray-800/80 rounded-2xl p-8 lg:p-12 shadow-2xl">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
                {isAr ? "هل تحتاج إلى نقل وفود أكبر؟" : "Need a larger movement?"}
              </h2>
              <p className="text-sm sm:text-base text-gray-300">
                {isAr
                  ? "نجمع بين مختلف الفئات من أسطول السائق الخاص لخدمة الفعاليات الكبرى والوفود الرسمية عبر"
                  : "We combine classes from our chauffeur fleet for events and delegations via"}{" "}
                <Link
                  href="mailto:hello@ab.limo"
                  className="text-abBlue hover:underline font-mono"
                >
                  hello@ab.limo
                </Link>
                .
              </p>
            </div>

            <div className="shrink-0 w-full md:w-auto">
              <Link
                href={`${localeBase(lang)}/contact?inquiry=proposal`}
                className="block text-center md:inline-block border border-white/50 hover:border-abBlue hover:text-abBlue text-white font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded transition-all hover:bg-white/5 active:scale-95"
              >
                {isAr ? "طلب عرض أسعار" : "REQUEST A PROPOSAL"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. FULL FLEET CATALOG (Explore All Individual Models)        */}
      {/* ============================================================ */}
      <section
        id="full-catalog"
        data-section-type="fleet_full_catalog"
        className="w-full py-20 bg-[#070709]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-abBlue block mb-2">
                {isAr ? "الأسطول الكامل" : "FULL FLEET CATALOG"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {isAr ? "استعرض جميع مركبات الأسطول" : "Browse every vehicle in our fleet"}
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", label: isAr ? "الكل" : "All" },
                { id: "sedan", label: isAr ? "سيدان" : "Sedans" },
                { id: "suv", label: isAr ? "دفع رباعي" : "SUVs" },
                { id: "van", label: isAr ? "فان وMPV" : "Vans & MPVs" },
                { id: "bus", label: isAr ? "حافلات" : "Coaches & Buses" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  type="button"
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer ${
                    activeFilter === f.id
                      ? "bg-abBlue text-white"
                      : "bg-[#14151a] text-gray-400 hover:text-white border border-gray-800 hover:border-gray-700"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Vehicles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVehicles.map((vehicle) => {
              const copy = vehicle.copy[l] || vehicle.copy.en;
              return (
                <button
                  key={vehicle.slug}
                  type="button"
                  onClick={() =>
                    handleSelectClass(classIdForSlug(vehicle.slug), true)
                  }
                  className="group bg-[#0e0f14] rounded-xl border border-gray-800/80 hover:border-abBlue transition-all overflow-hidden flex flex-col h-full hover:shadow-[0_8px_30px_rgba(37,159,207,0.15)] text-left w-full cursor-pointer"
                >
                  <div className="bg-[#050505] h-48 flex items-center justify-center p-6 relative border-b border-gray-900 overflow-hidden">
                    <Image
                      src={vehicle.image}
                      alt={`${copy.model} — ${copy.title}`}
                      width={380}
                      height={190}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-abBlue mb-1.5">
                      {copy.model}
                    </span>
                    <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-abBlue transition-colors truncate">
                      {copy.title}
                    </h3>
                    <p className="text-xs text-gray-400 mb-4 flex-1 line-clamp-2">
                      {copy.tagline}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-400 border-t border-gray-800/80 pt-3 mt-auto">
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-abBlue" />
                        {vehicle.passengers} {isAr ? "ركاب" : "guests"}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-abBlue" />
                        {vehicle.luggage} {isAr ? "حقائب" : "bags"}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. GOVERNANCE & PROTOCOL STANDARDS                            */}
      {/* ============================================================ */}
      <section
        data-section-type="fleet_governance"
        className="py-16 bg-[#050505] border-t border-gray-900"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-abBlue uppercase mb-4">
            <ShieldCheck className="w-4 h-4 text-abBlue" />
            <span>{isAr ? "حوكمة الأسطول" : "STRICT GOVERNANCE"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            {isAr ? "سوداء بالكامل. احترافية مطلقة." : "Strictly Black. Strictly Professional."}
          </h2>
          <p className="text-gray-400 leading-relaxed text-sm sm:text-base max-w-2xl mx-auto font-light">
            {isAr
              ? "يفرض معيار هوية AB أسطولاً موحداً من المركبات السوداء الحديثة الخالية من العيوب، التي تخضع لفحص دوري وتجهيز شامل قبل كل مهمة. نوفر أساطيل مخصصة للعقود الحكومية والشركات والوفود الدبلوماسية."
              : "The AB brand standard mandates a uniform fleet of late-model, immaculate black vehicles. Inspected and detailed before every deployment. We procure and lease dedicated fleets for long-term government and corporate contracts."}
          </p>
        </div>
      </section>
    </div>
  );
}
