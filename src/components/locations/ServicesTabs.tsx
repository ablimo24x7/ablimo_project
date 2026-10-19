"use client";

import { useState } from "react";
import Link from "next/link";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import type { LocationServiceItem } from "@/lib/blog";

interface ServicesTabsProps {
  dict: Dictionary;
  items: LocationServiceItem[];
  /** Country or city display name, e.g. "UAE" or "Dubai". */
  placeName: string;
}

export default function ServicesTabs({ dict, items, placeName }: ServicesTabsProps) {
  const [active, setActive] = useState(0);
  if (!items.length) return null;

  const detail = dict.countries.detail;
  const current = items[active] ?? items[0];
  const heading = detail.servicesHeading.replace("{name}", placeName);
  const itemHeading = detail.serviceInHeading
    .replace("{service}", current.name)
    .replace("{name}", placeName);

  return (
    <div className="space-y-6 pt-2">
      <h2 className="text-3xl font-serif font-bold text-white tracking-tight">
        {heading}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 lg:gap-10 items-start">
        {/* Tabs */}
        <div
          role="tablist"
          aria-label={heading}
          className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-8 px-8 lg:mx-0 lg:px-0 lg:sticky lg:top-6"
        >
          {items.map((item, i) => (
            <button
              key={item.serviceSlug}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`flex-shrink-0 text-start px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
                i === active
                  ? "bg-[#2a2c35] border-abBlue/60 text-white"
                  : "bg-[#1c1d21] border-gray-700/50 text-gray-400 hover:text-white hover:border-white/20"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Info container */}
        <div className="bg-[#1c1d21] border border-gray-700/50 rounded-2xl p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-2xl font-bold text-white">
              {itemHeading}
            </h3>
            <Link
              href={current.href}
              className="inline-block bg-abBlue text-white px-6 py-3 text-sm font-semibold rounded-full hover:bg-abBlue/80 transition-colors whitespace-nowrap"
            >
              View Details
            </Link>
          </div>
          <hr className="my-6 border-gray-700" />
          {current.cities && current.cities.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {current.cities.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="bg-[#292a30] border border-gray-700/50 rounded-xl px-4 py-3 text-sm font-semibold text-gray-200 hover:text-white hover:border-white/30 transition-all"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          ) : (
            current.description && (
              <p className="text-gray-400 text-sm leading-relaxed">
                {current.description}
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
}
