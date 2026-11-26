"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { localeBase, localeHome } from "@/app/[lang]/dictionaries";
import type { IndustryDetailData } from "./industry-detail-data";

interface IndustryDetailClientProps {
  data: IndustryDetailData;
  lang: string;
}

export default function IndustryDetailClient({
  data,
  lang,
}: IndustryDetailClientProps) {
  const base = localeBase(lang);
  const home = localeHome(lang);
  const isAr = lang === "ar";
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-[#292a30] text-white">
      {/* 1. Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col justify-between overflow-hidden pt-28 pb-12">
        <Image
          src={data.heroImage}
          alt={data.featureImageAlt || data.h1}
          fill
          className="object-cover"
          style={{ objectPosition: data.heroImagePos }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/35 rtl:bg-gradient-to-l" />
        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/95 via-black/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#292a30] to-transparent" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 flex-1 flex flex-col justify-between">
          <div>
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="text-xs tracking-wider uppercase text-gray-400 flex items-center gap-2 mb-6"
            >
              <Link
                href={home}
                className="hover:text-white transition-colors"
              >
                {isAr ? "الرئيسية" : "Home"}
              </Link>
              <span>/</span>
              <Link
                href={`${base}/industries`}
                className="hover:text-white transition-colors"
              >
                {isAr ? "القطاعات" : "Industries"}
              </Link>
              <span>/</span>
              <span className="text-white">{data.badge}</span>
            </nav>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-abBlue/10 border border-abBlue/30 self-start">
              <span className="w-2 h-2 rounded-full bg-abBlue animate-pulse" />
              <span className="text-abBlue text-xs font-bold tracking-widest uppercase">
                {data.badge}
              </span>
            </div>

            {/* H1 Headline */}
            <h1 className="mt-4 text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight max-w-4xl">
              {data.h1}
            </h1>

            {/* Blended Subtitle */}
            {data.heroSubtitle && (
              <p className="mt-3 text-lg md:text-xl font-medium text-abBlue max-w-3xl">
                {data.heroSubtitle}
              </p>
            )}

            {/* Lead description paragraphs */}
            <div className="mt-5 max-w-3xl space-y-4">
              {data.heroParagraphs.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-base md:text-lg text-gray-300 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={`${base}${data.heroPrimaryCta.href}`}
                className="inline-flex items-center min-h-[52px] px-8 bg-abBlue hover:bg-abServiceBlue text-white text-sm font-semibold rounded-full transition-colors shadow-lg shadow-abBlue/20"
              >
                {data.heroPrimaryCta.label}
              </Link>
              <Link
                href={`${base}${data.heroSecondaryCta.href}`}
                className="inline-flex items-center min-h-[52px] px-8 border border-white/50 hover:bg-white/10 text-white text-sm font-semibold rounded-full transition-colors"
              >
                {data.heroSecondaryCta.label}
              </Link>
              <Link
                href={`${base}/industries`}
                className="inline-flex items-center min-h-[52px] px-7 border border-white/25 hover:bg-white/10 text-gray-200 text-sm font-medium rounded-full transition-colors"
              >
                {isAr ? "جميع القطاعات" : "All industries"}
              </Link>
            </div>
          </div>

          {/* Stat Strip */}
          {data.strip.length > 0 && (
            <div className="pt-10 mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl border-t border-white/20">
              {data.strip.map((s, idx) => (
                <div key={idx} className="flex flex-col gap-1.5">
                  <span className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-none">
                    {s.v}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-abBlue font-semibold">
                    {s.l}
                  </span>
                  {s.desc && (
                    <span className="text-xs text-gray-300 leading-snug">
                      {s.desc}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 2. Statement & Feature Image Section */}
      <section className="max-w-7xl mx-auto px-8 py-20 border-b border-gray-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6">
            <p className="text-xs font-bold tracking-[0.22em] uppercase text-abBlue">
              {data.statementEyebrow}
            </p>
            <p className="mt-4 text-2xl md:text-3xl font-light leading-relaxed text-gray-200">
              {data.statement}
            </p>
          </div>
          <div className="lg:col-span-6">
            <div className="relative h-[300px] sm:h-[360px] rounded-2xl overflow-hidden border border-gray-800 bg-[#1c1d21]">
              <Image
                src={data.featureImage}
                alt={data.featureImageAlt}
                fill
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-xs text-gray-400 tracking-wide">
              {data.featureImageAlt}
            </p>
          </div>
        </div>
      </section>

      {/* 3. The Challenge Section */}
      <section className="max-w-7xl mx-auto px-8 py-20 border-b border-gray-800">
        <div className="max-w-4xl">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-abBlue">
            {data.needsEyebrow}
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white">
            {data.needsH2}
          </h2>
          {data.needsIntro.length > 0 && (
            <div className="mt-5 space-y-4">
              {data.needsIntro.map((p, idx) => (
                <p
                  key={idx}
                  className="text-base md:text-lg text-gray-300 leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.needs.map((item) => (
            <div
              key={item.num}
              className="p-7 rounded-xl bg-[#1c1d21] border border-gray-800 flex flex-col hover:border-gray-700 hover:bg-[#2a2c35] transition-all"
            >
              <span className="text-sm font-bold tracking-widest text-abBlue mb-3">
                {item.num}
              </span>
              <h3 className="text-xl font-bold text-white leading-snug">
                {item.t}
              </h3>
              <p className="mt-3 text-sm text-gray-300 leading-relaxed">
                {item.x}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. How We Run It Section */}
      <section className="bg-[#1c1d21] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-8 py-20">
          <div className="max-w-4xl">
            <p className="text-xs font-bold tracking-[0.22em] uppercase text-abBlue">
              {data.stepsEyebrow}
            </p>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white">
              {data.stepsH2}
            </h2>
            {data.stepsIntro.length > 0 && (
              <div className="mt-5 space-y-4">
                {data.stepsIntro.map((p, idx) => (
                  <p
                    key={idx}
                    className="text-base md:text-lg text-gray-300 leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
            )}
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.steps.map((step) => (
              <div
                key={step.num}
                className="pt-6 border-t border-gray-800 flex flex-col gap-3"
              >
                <span className="text-4xl md:text-5xl font-bold text-abBlue leading-none">
                  {step.num}
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">{step.t}</h3>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  {step.x}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Services Section */}
      <section className="max-w-7xl mx-auto px-8 py-20 border-b border-gray-800">
        <div className="max-w-4xl">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-abBlue">
            {data.servicesEyebrow}
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white">
            {data.servicesH2}
          </h2>
          {data.servicesIntro.length > 0 && (
            <div className="mt-5 space-y-4">
              {data.servicesIntro.map((p, idx) => (
                <p
                  key={idx}
                  className="text-base md:text-lg text-gray-300 leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.services.map((s, idx) => (
            <div
              key={idx}
              className="p-7 rounded-xl bg-[#1c1d21] border border-gray-800 flex flex-col justify-between hover:border-gray-700 transition-colors"
            >
              <div>
                <Link
                  href={`${base}${s.href}`}
                  className="inline-flex items-center gap-2 text-xl md:text-2xl font-bold text-white hover:text-abBlue transition-colors group"
                >
                  <span>{s.name}</span>
                  <span
                    aria-hidden="true"
                    className="text-abBlue ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform"
                  >
                    {isAr ? "←" : "→"}
                  </span>
                </Link>
                {s.desc && (
                  <p className="mt-3 text-sm md:text-base text-gray-300 leading-relaxed">
                    {s.desc}
                  </p>
                )}
              </div>

              {s.subLinkLabel && s.subLinkHref && (
                <div className="mt-5 pt-4 border-t border-gray-800">
                  <Link
                    href={`${base}${s.subLinkHref}`}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-abBlue hover:underline"
                  >
                    <span>{s.subLinkLabel}</span>
                    <span aria-hidden="true">{isAr ? "←" : "→"}</span>
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>

        {data.serviceHighlights && data.serviceHighlights.length > 0 && (
          <div className="mt-8 p-6 md:p-8 rounded-xl bg-[#1c1d21]/70 border border-gray-800 space-y-3">
            {data.serviceHighlights.map((hl, idx) => (
              <p
                key={idx}
                className="text-sm md:text-base text-gray-300 leading-relaxed"
              >
                {hl.prefix}
                <Link
                  href={`${base}${hl.href}`}
                  className="text-abBlue font-semibold hover:underline"
                >
                  {hl.linkLabel}
                </Link>
                {hl.suffix}
              </p>
            ))}
          </div>
        )}
      </section>

      {/* 6. Fleet Section */}
      <section className="bg-[#1c1d21] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-8 py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-3xl">
              <p className="text-xs font-bold tracking-[0.22em] uppercase text-abBlue">
                {data.fleetEyebrow}
              </p>
              <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white">
                {data.fleetH2}
              </h2>
              {data.fleetIntro.length > 0 && (
                <div className="mt-5 space-y-3">
                  {data.fleetIntro.map((p, idx) => (
                    <p
                      key={idx}
                      className="text-base md:text-lg text-gray-300 leading-relaxed"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <Link
              href={`${base}/fleet`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/40 hover:bg-white hover:text-abBlack text-xs uppercase tracking-widest font-semibold text-white transition-colors"
            >
              <span>{isAr ? "استكشف الأسطول بالكامل" : "Explore full fleet"}</span>
              <span aria-hidden="true">{isAr ? "←" : "→"}</span>
            </Link>
          </div>

          <div
            className={`mt-12 grid grid-cols-1 md:grid-cols-2 ${
              data.fleetCards.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
            } gap-6`}
          >
            {data.fleetCards.map((card, idx) => (
              <div
                key={idx}
                className="rounded-xl overflow-hidden bg-[#292a30] border border-gray-800 flex flex-col justify-between hover:border-gray-700 transition-all"
              >
                <div>
                  <div className="relative h-52 w-full bg-abBlack">
                    <Image
                      src={card.image}
                      alt={card.imageAlt}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white">{card.title}</h3>
                    <p className="mt-3 text-sm text-gray-300 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <Link
                    href={`${base}${card.href || "/fleet"}`}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-abBlue hover:underline"
                  >
                    <span>{card.ctaLabel || (isAr ? `عرض ${card.title}` : `View ${card.title}`)}</span>
                    <span aria-hidden="true">{isAr ? "←" : "→"}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {data.vehicles.length > 0 && (
            <div className="mt-10 pt-8 border-t border-gray-800 flex flex-wrap items-center gap-3">
              <span className="text-xs uppercase tracking-widest text-gray-400 me-2">
                {isAr ? "المركبات المستخدمة:" : "Vehicles deployed:"}
              </span>
              {data.vehicles.map((v) => (
                <Link
                  key={v}
                  href={`${base}/fleet`}
                  className="px-4 py-2 rounded-full bg-[#292a30] border border-gray-700 hover:border-white text-xs font-medium text-white transition-colors"
                >
                  {v}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 7. Coverage Section */}
      <section className="max-w-7xl mx-auto px-8 py-20 border-b border-gray-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <p className="text-xs font-bold tracking-[0.22em] uppercase text-abBlue">
              {data.coverageEyebrow}
            </p>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white">
              {data.coverageH2}
            </h2>
            <div className="mt-6 space-y-4">
              {data.coverageParagraphs.map((p, idx) => (
                <p
                  key={idx}
                  className="text-base md:text-lg text-gray-300 leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>

          {data.coverageLinks.length > 0 && (
            <div className="lg:col-span-5 p-7 rounded-xl bg-[#1c1d21] border border-gray-800">
              <p className="text-xs font-bold tracking-[0.22em] uppercase text-abBlue mb-4">
                {isAr ? "أبرز المراكز والخدمات الإقليمية" : "Key Regional Hubs & Services"}
              </p>
              <div className="divide-y divide-gray-800">
                {data.coverageLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    href={`${base}${link.href}`}
                    className="flex items-center justify-between py-3.5 text-sm md:text-base font-medium text-white hover:text-abBlue transition-colors group"
                  >
                    <span>{link.name}</span>
                    <span
                      aria-hidden="true"
                      className="text-abBlue ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform"
                    >
                      {isAr ? "←" : "→"}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 8. Proof / Case Studies Section */}
      {data.cases.length > 0 && (
        <section className="bg-[#1c1d21] border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-8 py-20">
            <p className="text-xs font-bold tracking-[0.22em] uppercase text-abBlue">
              {data.proofEyebrow}
            </p>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white">
              {data.proofH2}
            </h2>
            {data.proofIntro && (
              <p className="mt-4 text-base text-gray-300 max-w-3xl leading-relaxed">
                {data.proofIntro}
              </p>
            )}

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.cases.map((c, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-xl bg-[#292a30] border border-gray-800 flex flex-col justify-between hover:border-gray-700 transition-colors"
                >
                  <div>
                    <div className="flex justify-between items-center text-xs tracking-wider uppercase text-gray-400">
                      <span className="text-abBlue font-semibold">{c.sector}</span>
                      <span>{c.years}</span>
                    </div>
                    <span className="block mt-4 text-xs text-gray-400 uppercase tracking-wider">
                      {c.place}
                    </span>
                    <h3 className="mt-2 text-2xl font-bold text-white leading-snug">
                      {c.title}
                    </h3>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-800 flex flex-wrap items-end justify-between gap-6">
                    <div className="flex flex-wrap gap-8">
                      {c.stats.map((s, sIdx) => (
                        <div key={sIdx} className="flex flex-col gap-1">
                          <span className="text-3xl font-bold text-white leading-tight">
                            {s.v}
                          </span>
                          <span className="text-xs text-gray-400 uppercase tracking-wider">
                            {s.l}
                          </span>
                        </div>
                      ))}
                    </div>
                    <Link
                      href={c.href ? `${base}${c.href}` : `${home}#case-studies`}
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-abBlue hover:underline"
                    >
                      <span>{isAr ? "قراءة دراسة الحالة" : "Read the case study"}</span>
                      <span aria-hidden="true">{isAr ? "←" : "→"}</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. Standards Section */}
      <section className="max-w-7xl mx-auto px-8 py-20 border-b border-gray-800">
        <div className="max-w-4xl">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-abBlue">
            {data.standardsEyebrow}
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white">
            {data.standardsH2}
          </h2>
          {data.standardsIntro.length > 0 && (
            <div className="mt-5 space-y-4">
              {data.standardsIntro.map((p, idx) => (
                <p
                  key={idx}
                  className="text-base md:text-lg text-gray-300 leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.standardsItems.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-[#1c1d21] border border-gray-800 flex flex-col gap-2"
            >
              <span className="w-8 h-8 rounded-full bg-abBlue/15 border border-abBlue/40 text-abBlue text-xs font-bold flex items-center justify-center mb-1">
                0{idx + 1}
              </span>
              {item.title && (
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
              )}
              <p className="text-sm text-gray-300 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        {(data.standardsNote || data.standardsPhone) && (
          <div className="mt-8 p-6 rounded-xl bg-[#1c1d21] border border-gray-800 flex flex-wrap items-center justify-between gap-4">
            {data.standardsNote && (
              <p className="text-sm md:text-base text-gray-300">
                {data.standardsNote}
              </p>
            )}
            {data.standardsPhone && (
              <a
                href={`tel:${data.standardsPhone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-abBlue/15 border border-abBlue/40 text-abBlue font-semibold text-sm hover:bg-abBlue hover:text-white transition-colors"
              >
                <span>{isAr ? "مكتب العمليات على مدار الساعة: " : "24/7 Operations Desk: "}{data.standardsPhone}</span>
              </a>
            )}
          </div>
        )}
      </section>

      {/* 10. FAQ Section */}
      {data.faqs.length > 0 && (
        <section className="bg-[#1c1d21] border-b border-gray-800">
          <div className="max-w-4xl mx-auto px-8 py-20">
            <p className="text-xs font-bold tracking-[0.22em] uppercase text-abBlue">
              {data.faqsEyebrow}
            </p>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white">
              {data.faqsH2}
            </h2>

            <div className="mt-10 divide-y divide-gray-800 border-y border-gray-800">
              {data.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="py-4">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-4 py-2 ltr:text-left rtl:text-right bg-transparent border-0 cursor-pointer"
                    >
                      <span className="text-lg md:text-xl font-semibold text-white">
                        {faq.q}
                      </span>
                      <span className="text-2xl text-abBlue font-light shrink-0">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    {isOpen && (
                      <p className="mt-3 text-base text-gray-300 leading-relaxed max-w-3xl">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 11. Other Industries Section */}
      <section className="max-w-7xl mx-auto px-8 py-20 border-b border-gray-800">
        <p className="text-xs font-bold tracking-[0.22em] uppercase text-abBlue mb-6">
          {isAr ? "قطاعات أخرى" : "Other industries"}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.others.map((o, idx) => (
            <Link
              key={idx}
              href={`${base}${o.href}`}
              className="flex justify-between items-center p-5 rounded-xl bg-[#1c1d21] border border-gray-800 hover:border-gray-700 hover:bg-[#2a2c35] text-base font-semibold text-white hover:text-abBlue transition-all group"
            >
              <span>{o.name}</span>
              <span
                aria-hidden="true"
                className="ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform"
              >
                {isAr ? "←" : "→"}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 12. Closing Call to Action */}
      <section className="bg-abBlack">
        <div className="max-w-7xl mx-auto px-8 py-20 flex flex-wrap items-end justify-between gap-8">
          <div className="flex-1 basis-[520px] min-w-0">
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              {data.ctaH2}
            </h2>
            <p className="mt-4 text-base md:text-lg text-gray-300 max-w-2xl leading-relaxed">
              {data.ctaP}
            </p>
            {data.ctaSubH3 && (
              <div className="mt-6 pt-6 border-t border-gray-800 max-w-2xl">
                <h3 className="text-xl font-bold text-white">{data.ctaSubH3}</h3>
                {data.ctaSubP && (
                  <p className="mt-2 text-sm md:text-base text-gray-400 leading-relaxed">
                    {data.ctaSubP}
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href={`${base}${data.ctaPrimaryHref}`}
              className="inline-flex items-center min-h-[52px] px-8 bg-abBlue hover:bg-abServiceBlue text-white text-sm font-semibold rounded-full transition-colors shadow-lg shadow-abBlue/20"
            >
              {data.ctaPrimaryLabel}
            </Link>
            <Link
              href={`${base}${data.ctaSecondaryHref}`}
              className="inline-flex items-center min-h-[52px] px-8 rounded-full border border-white/50 hover:bg-white/10 text-white text-sm font-semibold transition-colors"
            >
              {data.ctaSecondaryLabel}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
