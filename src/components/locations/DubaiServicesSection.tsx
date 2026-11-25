"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SectionInstance, SectionRenderContext } from "@/components/section-library/types";
import { localeBase } from "@/app/[lang]/dictionaries";

interface DubaiServicesProps {
  section?: SectionInstance;
  context?: SectionRenderContext;
}

interface ServiceLinkItem {
  id: string;
  title: string;
  titleAr?: string;
  href: string;
}

const DEFAULT_SERVICES: ServiceLinkItem[] = [
  {
    id: "executive-corporate",
    title: "Executive and Corporate Mobility",
    titleAr: "تنقل تنفيذي ومؤسسي",
    href: "/services/corporate-transportation",
  },
  {
    id: "airport-transfers",
    title: "Airport Transfers",
    titleAr: "نقل من وإلى المطار",
    href: "/services/airport-transfers",
  },
  {
    id: "corporate-fleet",
    title: "Corporate Fleet and Workforce",
    titleAr: "أسطول الشركات ونقل الموظفين",
    href: "/services/workforce-mobility",
  },
  {
    id: "event-transportation",
    title: "Event Transportation",
    titleAr: "نقل الفعاليات والمؤتمرات",
    href: "/services/event-transportation",
  },
  {
    id: "group-coach",
    title: "Group and Coach Charter",
    titleAr: "تأجير حافلات ونقل جماعي",
    href: "/services/bus-coach-hire",
  },
  {
    id: "tourism-leisure",
    title: "Tourism and Leisure",
    titleAr: "سياحة وجولات ترفيهية",
    href: "/services/tourism-transportation",
  },
];

export default function DubaiServicesSection({ section, context }: DubaiServicesProps) {
  const lang = (context?.kind === "location" ? context.lang : undefined) || "en-US";
  const isArabic = lang === "ar";

  const content = (section?.content || {}) as Record<string, string>;

  const ctxCity = context?.kind === "location" ? context.city : undefined;
  const cityName =
    content.cityName ||
    (isArabic && ctxCity?.nameAr ? ctxCity.nameAr : ctxCity?.name) ||
    "Dubai";

  const eyebrow = content.eyebrow || (isArabic ? `خدمات في ${cityName}` : `SERVICES IN ${cityName.toUpperCase()}`);
  const heading = content.heading || (isArabic ? "شريك واحد لكل تنقلاتك" : "One partner for every movement");

  const services = (section?.items && section.items.length > 0)
    ? (section.items as unknown as ServiceLinkItem[])
    : DEFAULT_SERVICES;

  return (
    <section className="w-full py-20 lg:py-24 bg-[#111111] border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Heading */}
          <div className="lg:col-span-4">
            <span className="inline-block text-xs font-bold tracking-[0.22em] text-abBlue uppercase mb-4">
              {eyebrow}
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              {heading}
            </h2>
          </div>

          {/* Right Column: 3-Column Services Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            {services.map((item, idx) => {
              const title = isArabic && item.titleAr ? item.titleAr : (item.title || `Service ${idx + 1}`);
              const href = item.href ? `${localeBase(lang)}${item.href.startsWith("/") ? "" : "/"}${item.href}` : `${localeBase(lang)}/services`;

              return (
                <Link
                  key={item.id || idx}
                  href={href}
                  className="group flex items-center justify-between p-4 rounded-lg hover:bg-[#1c1d21] transition-all duration-200 border border-transparent hover:border-gray-800"
                >
                  <span className="text-sm font-medium text-gray-200 group-hover:text-abBlue transition-colors pr-3 leading-snug">
                    {title}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-abBlue group-hover:translate-x-1 transition-all flex-shrink-0" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
