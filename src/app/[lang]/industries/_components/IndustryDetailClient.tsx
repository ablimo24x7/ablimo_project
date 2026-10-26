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
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-[#292a30] text-white">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col justify-between overflow-hidden pt-28 pb-12">
        <Image
          src={data.heroImage}
          alt=""
          aria-hidden="true"
          fill
          className="object-cover"
          style={{ objectPosition: data.heroImagePos }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/35" />
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
                href={localeHome(lang)}
                className="hover:text-white transition-colors"
              >
                Home
              </Link>
              <span>/</span>
              <Link
                href={`${base}/industries`}
                className="hover:text-white transition-colors"
              >
                Industries
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

            {/* Lead description */}
            <p className="mt-6 max-w-2xl text-base md:text-lg text-gray-300 leading-relaxed">
              {data.heroP}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={`${base}/contact`}
                className="inline-flex items-center min-h-[52px] px-8 bg-abBlue hover:bg-abServiceBlue text-white text-sm font-semibold rounded-full transition-colors shadow-lg shadow-abBlue/20"
              >
                Request a proposal
              </Link>
              <Link
                href={`${base}/industries`}
                className="inline-flex items-center min-h-[52px] px-8 border border-white/50 hover:bg-white/10 text-white text-sm font-semibold rounded-full transition-colors"
              >
                All industries
              </Link>
            </div>
          </div>

          {/* Stat Strip */}
          {data.strip.length > 0 && (
            <div className="pt-10 mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl border-t border-white/20">
              {data.strip.map((s, idx) => (
                <div key={idx} className="flex flex-col gap-1.5">
                  <span className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-none">
                    {s.v}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-abBlue font-medium">
                    {s.l}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Statement Section */}
      <section className="max-w-7xl mx-auto px-8 py-20 border-b border-gray-800">
        <div className="flex flex-wrap gap-8 lg:gap-16 items-start">
          <p className="flex-1 basis-[240px] text-xs font-bold tracking-[0.22em] uppercase text-abBlue">
            {data.statementEyebrow}
          </p>
          <p className="flex-[3] basis-[560px] text-2xl md:text-3xl font-light leading-relaxed text-gray-200">
            {data.statement}
          </p>
        </div>
      </section>

      {/* Needs Section */}
      <section className="max-w-7xl mx-auto px-8 py-20 border-b border-gray-800">
        <div className="max-w-3xl">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-abBlue">
            {data.needsEyebrow}
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white">
            {data.needsH2}
          </h2>
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

      {/* Steps Section */}
      <section className="bg-[#1c1d21] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-8 py-20">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-abBlue">
            {data.stepsEyebrow}
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white">
            {data.stepsH2}
          </h2>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.steps.map((step) => (
              <div
                key={step.num}
                className="pt-6 border-t border-gray-800 flex flex-col gap-3"
              >
                <span className="text-5xl font-bold text-abBlue leading-none">
                  {step.num}
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">{step.t}</h3>
                <p className="text-base text-gray-300 leading-relaxed">{step.x}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Work / Cases Section */}
      {data.cases.length > 0 && (
        <section className="max-w-7xl mx-auto px-8 py-20 border-b border-gray-800">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-abBlue">
            Proven in the region
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white">
            Recent work
          </h2>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.cases.map((c, idx) => (
              <div
                key={idx}
                className="p-8 rounded-xl bg-[#1c1d21] border border-gray-800 flex flex-col justify-between hover:border-gray-700 transition-colors"
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

                <div className="mt-8 pt-6 border-t border-gray-800 flex flex-wrap gap-8">
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
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Services and Vehicles Section */}
      <section className="max-w-7xl mx-auto px-8 py-20 border-b border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {/* Services Used */}
          <div>
            <p className="text-xs font-bold tracking-[0.22em] uppercase text-abBlue mb-6">
              Services used
            </p>
            <div className="divide-y divide-gray-800 border-y border-gray-800">
              {data.services.map((s, idx) => (
                <Link
                  key={idx}
                  href={`${base}${s.href}`}
                  className="flex justify-between items-center py-5 text-lg md:text-xl font-semibold text-white hover:text-abBlue transition-colors group"
                >
                  <span>{s.name}</span>
                  <span
                    aria-hidden="true"
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Vehicles Deployed */}
          <div>
            <p className="text-xs font-bold tracking-[0.22em] uppercase text-abBlue mb-6">
              Vehicles typically deployed
            </p>
            <div className="flex flex-wrap gap-3">
              {data.vehicles.map((v) => (
                <Link
                  key={v}
                  href={`${base}/fleet`}
                  className="px-5 py-3 rounded-full bg-[#1c1d21] border border-gray-700 hover:border-white text-sm font-medium text-white transition-colors"
                >
                  {v}
                </Link>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href={`${base}/fleet`}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-abBlue font-semibold hover:underline"
              >
                <span>View the full fleet</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {data.faqs.length > 0 && (
        <section className="bg-[#1c1d21] border-b border-gray-800">
          <div className="max-w-4xl mx-auto px-8 py-20">
            <p className="text-xs font-bold tracking-[0.22em] uppercase text-abBlue">
              Questions
            </p>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white">
              Frequently asked questions
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
                      className="w-full flex items-center justify-between gap-4 py-2 text-left bg-transparent border-0 cursor-pointer"
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

      {/* Other Industries Section */}
      <section className="max-w-7xl mx-auto px-8 py-20 border-b border-gray-800">
        <p className="text-xs font-bold tracking-[0.22em] uppercase text-abBlue mb-6">
          Other industries
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
                className="group-hover:translate-x-1 transition-transform"
              >
                &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Closing Call to Action */}
      <section className="bg-abBlack">
        <div className="max-w-7xl mx-auto px-8 py-20 flex flex-wrap items-end justify-between gap-8">
          <div className="flex-1 basis-[520px] min-w-0">
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              {data.ctaH2}
            </h2>
            <p className="mt-4 text-base text-gray-400 max-w-2xl leading-relaxed">
              {data.ctaP}
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center min-h-[52px] px-8 bg-abBlue hover:bg-abServiceBlue text-white text-sm font-semibold rounded-full transition-colors shadow-lg shadow-abBlue/20"
            >
              Request a proposal
            </Link>
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center min-h-[52px] px-8 rounded-full border border-white/50 hover:bg-white/10 text-white text-sm font-semibold transition-colors"
            >
              Talk to a planner
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
