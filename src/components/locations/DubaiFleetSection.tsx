"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SectionInstance, SectionRenderContext } from "@/components/section-library/types";
import { localeBase } from "@/app/[lang]/dictionaries";

interface DubaiFleetProps {
  section?: SectionInstance;
  context?: SectionRenderContext;
}

interface FleetClassItem {
  id: string;
  name: string;
  nameAr?: string;
  model: string;
  modelAr?: string;
  specs: string;
  specsAr?: string;
  image: string;
  fleetSlug: string;
}

const DEFAULT_CLASSES: FleetClassItem[] = [
  {
    id: "standard-sedan",
    name: "Standard Sedan",
    nameAr: "سيدان قياسية",
    model: "Ford Taurus / BYD Seal 7",
    modelAr: "فورد توروس / بي واي دي سيل 7",
    specs: "Sedan · 3 guests · 2 bags",
    specsAr: "سيدان · 3 ركاب · حقيبتان",
    image: "/cars/sedans/FAURD TAURUS.png",
    fleetSlug: "ford-taurus",
  },
  {
    id: "business-sedan",
    name: "Business Sedan",
    nameAr: "سيدان رجال الأعمال",
    model: "Lexus ES 350 / BMW 5 Series",
    modelAr: "لكزس ES 350 / بي إم دبليو الفئة الخامسة",
    specs: "Sedan · 3 guests · 2 bags",
    specsAr: "سيدان · 3 ركاب · حقيبتان",
    image: "/cars/sedans/LEXUS.png",
    fleetSlug: "business-sedan",
  },
  {
    id: "first-class-sedan",
    name: "First Class Sedan",
    nameAr: "سيدان الدرجة الأولى",
    model: "Mercedes-Benz S-Class / BMW 7 Series",
    modelAr: "مرسيدس-بنز فئة S / بي إم دبليو الفئة السابعة",
    specs: "Flagship sedan · 3 guests · 2 bags",
    specsAr: "سيدان فاخرة · 3 ركاب · حقيبتان",
    image: "/cars/sedans/msc.png",
    fleetSlug: "luxury-sedan",
  },
  {
    id: "executive-suv",
    name: "Executive SUV",
    nameAr: "دفع رباعي تنفيذي",
    model: "Cadillac Escalade / GMC Yukon",
    modelAr: "كاديلاك اسكاليد / جي إم سي يوكون",
    specs: "SUV · 6 guests · 5 bags",
    specsAr: "دفع رباعي · 6 ركاب · 5 حقائب",
    image: "/cars/suvs/CADILAC.png",
    fleetSlug: "cadillac-escalade",
  },
  {
    id: "premium-mpv",
    name: "Premium MPV",
    nameAr: "فان فاخر MPV",
    model: "Mercedes-Benz V-Class / Hyundai Staria",
    modelAr: "مرسيدس-بنز فئة V / هيونداي ستاريا",
    specs: "MPV · 6 guests · 5 bags",
    specsAr: "فان فاخر · 6 ركاب · 5 حقائب",
    image: "/cars/vans/V_Class.png",
    fleetSlug: "mercedes-v-class",
  },
  {
    id: "executive-van",
    name: "Executive Van",
    nameAr: "حافلة صغيرة تنفيذية",
    model: "Mercedes-Benz Sprinter Luxury",
    modelAr: "مرسيدس-بنز سبرينتر الفاخرة",
    specs: "Van · 14 guests · 10 bags",
    specsAr: "حافلة صغيرة · 14 راكب · 10 حقائب",
    image: "/cars/vans/Sprinter.png",
    fleetSlug: "mercedes-sprinter",
  },
];

export default function DubaiFleetSection({ section, context }: DubaiFleetProps) {
  const lang = (context?.kind === "location" ? context.lang : undefined) || "en-US";
  const isArabic = lang === "ar";

  const content = (section?.content || {}) as Record<string, string>;

  const ctxCity = context?.kind === "location" ? context.city : undefined;
  const cityName =
    content.cityName ||
    (isArabic && ctxCity?.nameAr ? ctxCity.nameAr : ctxCity?.name) ||
    "Dubai";

  const eyebrow = content.eyebrow || (isArabic ? `أسطول ${cityName}` : `THE ${cityName.toUpperCase()} FLEET`);
  const heading = content.heading || (isArabic ? "اختر فئتك" : "Choose your class");
  const description =
    content.description ||
    (isArabic
      ? "كل مركبة من طراز حديث، سوداء وتم تجهيزها بعناية قبل كل رحلة. اختر فئة للاطلاع على مواصفات السيارة والراحة على متنها."
      : "Every vehicle is late model, black and detailed before each journey. Select a class to see vehicle specifications and cabin details.");

  // If items are populated from database / dashboard, use them; otherwise use DEFAULT_CLASSES
  const items = (section?.items && section.items.length > 0)
    ? (section.items as unknown as FleetClassItem[])
    : DEFAULT_CLASSES;

  return (
    <section id="fleet" className="w-full py-20 lg:py-28 bg-[#111111] border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <span className="inline-block text-xs font-bold tracking-[0.22em] text-abBlue uppercase mb-4">
              {eyebrow}
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-6 leading-tight">
              {heading}
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed max-w-sm mb-8">
              {description}
            </p>
            <Link
              href={`${localeBase(lang)}/fleet`}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-abBlue hover:text-white transition-colors uppercase group"
            >
              <span>{isArabic ? "استعرض الأسطول الكامل" : "Explore Full Fleet"}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right Column: Vehicle Class List */}
          <div className="lg:col-span-8 divide-y divide-gray-800/80 border-t border-b border-gray-800/80">
            {items.map((item, idx) => {
              const rawItem = item as unknown as Record<string, unknown>;
              const imageSrc = item.image || (rawItem.image as string) || DEFAULT_CLASSES[idx % DEFAULT_CLASSES.length].image;
              const fleetSlug = item.fleetSlug || (rawItem.fleetSlug as string) || DEFAULT_CLASSES[idx % DEFAULT_CLASSES.length].fleetSlug;
              const titleText = isArabic && item.nameAr ? item.nameAr : (item.name || (rawItem.title as string) || "");
              const modelText = isArabic && item.modelAr ? item.modelAr : (item.model || (rawItem.description as string) || "");
              const specsText = isArabic && item.specsAr ? item.specsAr : (item.specs || (rawItem.specs as string) || "");

              return (
                <Link
                  key={item.id || idx}
                  href={`${localeBase(lang)}/fleet/${fleetSlug}`}
                  className="group flex flex-col sm:flex-row items-start sm:items-center justify-between py-5 px-3 hover:bg-[#1c1d21]/70 rounded-lg transition-all duration-200"
                >
                  {/* Left part: Real vehicle image */}
                  <div className="flex-shrink-0 w-36 sm:w-44 h-20 relative mb-3 sm:mb-0 sm:mr-6 flex items-center justify-center">
                    <Image
                      src={imageSrc}
                      alt={titleText || "Fleet vehicle"}
                      width={180}
                      height={85}
                      className="object-contain max-h-16 w-auto drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Center: Title & Specs */}
                  <div className="flex-1 sm:px-2">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-abBlue transition-colors">
                        {titleText}
                      </h3>
                      {modelText && (
                        <span className="text-xs text-gray-400 font-medium">
                          ({modelText})
                        </span>
                      )}
                    </div>
                    {specsText && (
                      <p className="text-xs sm:text-sm text-gray-400 mt-1">
                        {specsText}
                      </p>
                    )}
                  </div>

                  {/* Right: Arrow */}
                  <div className="mt-3 sm:mt-0 flex items-center text-gray-500 group-hover:text-abBlue group-hover:translate-x-1 transition-all duration-200">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
