"use client";

import * as React from "react";
import Link from "next/link";
import type { SectionInstance, SectionRenderContext } from "@/components/section-library/types";
import { localeBase } from "@/app/[lang]/dictionaries";

interface DubaiCtaProps {
  section?: SectionInstance;
  context?: SectionRenderContext;
}

export default function DubaiCtaSection({ section, context }: DubaiCtaProps) {
  const lang = (context?.kind === "location" ? context.lang : undefined) || "en-US";
  const isArabic = lang === "ar";

  const content = (section?.content || {}) as Record<string, string>;

  const ctxCity = context?.kind === "location" ? context.city : undefined;
  const cityName =
    content.cityName ||
    (isArabic && ctxCity?.nameAr ? ctxCity.nameAr : ctxCity?.name) ||
    "Dubai";

  const heading =
    content.heading ||
    (isArabic
      ? `سائقك الخاص جاهز في ${cityName}.`
      : `Your chauffeur is ready in ${cityName}.`);

  const description =
    content.description ||
    (isArabic
      ? "متواجدون على مدار الساعة. نرد خلال دقائق على hello@ab.limo"
      : "Available around the clock. Reply within minutes at hello@ab.limo");

  const buttonLabel = content.buttonLabel || (isArabic ? "احجز الآن" : "BOOK NOW");
  const buttonHref = content.buttonHref || "/contact";

  return (
    <section className="w-full py-20 lg:py-24 bg-[#0a0a0a] border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Left: Heading & Subtitle */}
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight mb-4">
            {heading}
          </h2>
          <p className="text-sm sm:text-base text-gray-400 font-normal">
            {description}
          </p>
        </div>

        {/* Right: Book Now Button (White outline on dark) */}
        <div className="flex-shrink-0">
          <Link
            href={`${localeBase(lang)}${buttonHref.startsWith("/") ? "" : "/"}${buttonHref}`}
            className="inline-block px-10 py-4 rounded-md border border-white text-white font-semibold text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-200"
          >
            {buttonLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
