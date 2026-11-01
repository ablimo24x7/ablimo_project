"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cityUrl } from "@/lib/locations";
import { getCountryImage } from "@/lib/countryImages";
import { getCityImage } from "@/lib/cityImages";
import type { SectionInstance, SectionRenderContext } from "../types";
import { isLocationContext } from "../types";

interface CitiesGridSectionProps {
  section: SectionInstance;
  context?: SectionRenderContext;
}

const INITIAL_COUNT = 15;

export default function CitiesGridSection({ section, context }: CitiesGridSectionProps) {
  const [expanded, setExpanded] = useState(false);

  if (!isLocationContext(context)) return null;
  const { lang, country, dict } = context;

  const c = section.content as Record<string, unknown>;
  const heading = (c.heading as string) || "";
  const description = c.description as string | undefined;
  const cities = country.cities ?? [];
  if (cities.length === 0) return null;

  const visible = expanded ? cities : cities.slice(0, INITIAL_COUNT);
  const canExpand = cities.length > INITIAL_COUNT;
  const fallbackImage = getCountryImage(country.code);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-6">
      {heading && (
        <h2 className="text-3xl font-serif font-bold text-white tracking-tight">
          {heading}
        </h2>
      )}
      {description && <p className="text-gray-300 text-[16px] leading-relaxed">{description}</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {visible.map((cityObj) => (
          <Link
            key={cityObj.slug}
            href={cityUrl(lang, country, cityObj)}
            className="group bg-[#1c1d21] border border-gray-700/50 rounded-xl overflow-hidden hover:border-white/30 hover:bg-[#2a2c35] transition-all duration-300"
          >
            <div className="relative h-32 overflow-hidden">
              <Image
                src={getCityImage(cityObj.slug) ?? fallbackImage}
                alt={cityObj.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">
                {cityObj.name}
              </h3>
              {cityObj.description ? (
                <p className="text-xs text-gray-400 mt-1.5 line-clamp-3 leading-relaxed">
                  {cityObj.description}
                </p>
              ) : (
                <p className="text-xs text-gray-500 mt-1">{country.name}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
      {canExpand && (
        <div className="flex justify-center pt-4">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-2 bg-white text-[#292a30] px-6 py-2.5 text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
          >
            {expanded ? dict.press.showLess : dict.press.showMore}
            <svg
              className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
