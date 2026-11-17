"use client";

import * as React from "react";
import Link from "next/link";
import type { SectionInstance, SectionRenderContext } from "@/components/section-library/types";
import { localeBase } from "@/app/[lang]/dictionaries";

interface DubaiJourneysProps {
  section?: SectionInstance;
  context?: SectionRenderContext;
}

interface JourneyItem {
  id: string;
  tag: string;
  tagAr?: string;
  title: string;
  titleAr?: string;
  price: string;
  priceAr?: string;
  pickup: string;
  dropoff: string;
}

const DUBAI_JOURNEYS: JourneyItem[] = [
  {
    id: "dxb-downtown",
    tag: "AIRPORT TRANSFER",
    tagAr: "نقل من المطار",
    title: "DXB to Downtown Dubai",
    titleAr: "من مطار دبي إلى وسط مدينة دبي",
    price: "From AED 350",
    priceAr: "ابتداءً من 350 درهم",
    pickup: "Dubai International Airport (DXB)",
    dropoff: "Downtown Dubai",
  },
  {
    id: "dxb-marina",
    tag: "AIRPORT TRANSFER",
    tagAr: "نقل من المطار",
    title: "DXB to Dubai Marina",
    titleAr: "من مطار دبي إلى دبي مارينا",
    price: "From AED 420",
    priceAr: "ابتداءً من 420 درهم",
    pickup: "Dubai International Airport (DXB)",
    dropoff: "Dubai Marina",
  },
  {
    id: "dwc-palm",
    tag: "AIRPORT TRANSFER",
    tagAr: "نقل من المطار",
    title: "DWC to Palm Jumeirah",
    titleAr: "من مطار آل مكتوم إلى نخلة جميرا",
    price: "From AED 450",
    priceAr: "ابتداءً من 450 درهم",
    pickup: "Al Maktoum International Airport (DWC)",
    dropoff: "Palm Jumeirah",
  },
  {
    id: "dubai-abudhabi",
    tag: "INTERCITY",
    tagAr: "بين المدن",
    title: "Dubai to Abu Dhabi",
    titleAr: "من دبي إلى أبوظبي",
    price: "From AED 650",
    priceAr: "ابتداءً من 650 درهم",
    pickup: "Dubai",
    dropoff: "Abu Dhabi",
  },
];

const RIYADH_JOURNEYS: JourneyItem[] = [
  {
    id: "ruh-kafd",
    tag: "AIRPORT TRANSFER",
    tagAr: "نقل من المطار",
    title: "RUH to KAFD",
    titleAr: "من مطار الملك خالد إلى كافد",
    price: "From [SAR PRICE]",
    priceAr: "ابتداءً من [SAR PRICE]",
    pickup: "King Khalid International Airport (RUH)",
    dropoff: "KAFD, Riyadh",
  },
  {
    id: "ruh-dq",
    tag: "AIRPORT TRANSFER",
    tagAr: "نقل من المطار",
    title: "RUH to Diplomatic Quarter",
    titleAr: "من مطار الملك خالد إلى الحي الدبلوماسي",
    price: "From [SAR PRICE]",
    priceAr: "ابتداءً من [SAR PRICE]",
    pickup: "King Khalid International Airport (RUH)",
    dropoff: "Diplomatic Quarter, Riyadh",
  },
  {
    id: "riyadh-diriyah",
    tag: "CITY",
    tagAr: "داخل المدينة",
    title: "Riyadh to Diriyah",
    titleAr: "من الرياض إلى الدرعية",
    price: "From [SAR PRICE]",
    priceAr: "ابتداءً من [SAR PRICE]",
    pickup: "Riyadh",
    dropoff: "Diriyah Gate",
  },
  {
    id: "riyadh-front",
    tag: "CITY",
    tagAr: "داخل المدينة",
    title: "Riyadh to Riyadh Front",
    titleAr: "من الرياض إلى واجهة الرياض",
    price: "From [SAR PRICE]",
    priceAr: "ابتداءً من [SAR PRICE]",
    pickup: "Riyadh",
    dropoff: "Riyadh Front",
  },
];

export default function DubaiJourneysSection({ section, context }: DubaiJourneysProps) {
  const lang = (context?.kind === "location" ? context.lang : undefined) || "en-US";
  const isArabic = lang === "ar";

  const content = (section?.content || {}) as Record<string, string>;

  const ctxCity = context?.kind === "location" ? context.city : undefined;
  const cityName =
    content.cityName ||
    (isArabic && ctxCity?.nameAr ? ctxCity.nameAr : ctxCity?.name) ||
    "Dubai";

  const citySlug = (ctxCity?.slug || content.citySlug || cityName.toLowerCase()).trim();
  const isRiyadh = citySlug.includes("riyadh") || cityName.toLowerCase().includes("riyadh");

  const eyebrow = content.eyebrow || (isArabic ? "رحلات شائعة" : "POPULAR JOURNEYS");
  const heading = content.heading || (isArabic ? `في أنحاء ${cityName} وخارجها` : `Across ${cityName} and beyond`);

  // If section.items has items configured in dashboard, use them; else fallback to city defaults
  const journeys: JourneyItem[] = (section?.items && section.items.length > 0)
    ? (section.items as unknown as JourneyItem[])
    : (isRiyadh ? RIYADH_JOURNEYS : DUBAI_JOURNEYS);

  return (
    <section className="w-full py-20 lg:py-24 bg-[#0a0a0a] border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="mb-12">
          <span className="inline-block text-xs font-bold tracking-[0.22em] text-abBlue uppercase mb-4">
            {eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {heading}
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {journeys.map((j, idx) => {
            const tag = isArabic && j.tagAr ? j.tagAr : (j.tag || "JOURNEY");
            const title = isArabic && j.titleAr ? j.titleAr : (j.title || `Route ${idx + 1}`);
            // Prices are intentionally hidden on city pages — only render a
            // price when the data actually carries one.
            const price = (isArabic && j.priceAr ? j.priceAr : j.price) || "";
            const pickup = j.pickup || cityName;
            const dropoff = j.dropoff || title;

            return (
              <Link
                key={j.id || idx}
                href={`${localeBase(lang)}/contact?pickup=${encodeURIComponent(pickup)}&dropoff=${encodeURIComponent(dropoff)}`}
                className="group bg-[#1c1d21] border border-gray-800 hover:border-abBlue/60 hover:shadow-lg hover:shadow-abBlue/10 p-6 flex flex-col justify-between min-h-[170px] transition-all duration-300 rounded-xl"
              >
                <div>
                  <span className="text-[10px] font-bold tracking-[0.22em] text-abBlue uppercase block mb-3">
                    {tag}
                  </span>
                  <h3 className="text-lg font-semibold text-white group-hover:text-abBlue transition-colors leading-snug">
                    {title}
                  </h3>
                </div>

                <div className="pt-4 border-t border-gray-800/80 flex items-center justify-between mt-4">
                  {price ? (
                    <span className="text-xs font-medium text-gray-400 group-hover:text-gray-200 transition-colors">
                      {price}
                    </span>
                  ) : (
                    <span aria-hidden="true" />
                  )}
                  <span className="text-xs text-abBlue group-hover:translate-x-1 transition-transform inline-block">
                    →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
