"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { AirportPageData } from "@/lib/airports-data";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { localeHome } from "@/app/[lang]/dictionaries";
import HeroInquiryForm from "@/app/[lang]/locations/_components/HeroInquiryForm";

interface Props {
  data: AirportPageData;
  lang: string;
  dict: Dictionary;
}

export default function AirportPageClient({ data, lang, dict }: Props) {
  const [selectedVehicleIdx, setSelectedVehicleIdx] = useState(1); // default to Business Sedan
  const [openFaq, setOpenFaq] = useState<number | null>(0); // first FAQ open by default

  const currentVehicle = data.vehicles[selectedVehicleIdx] || data.vehicles[0];

  return (
    <main className="min-h-screen bg-[#070709] text-white selection:bg-[#259FCF]/30 selection:text-white">
      {/* ── 1. HERO SECTION ── */}
      <section className="relative w-full min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
        {/* Background Image with Dark Luxury Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={data.heroImage}
            alt={data.heroImageAlt || data.heroTitle}
            fill
            priority
            className="object-cover object-center filter brightness-[0.45] scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/70 to-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#259FCF]/10 via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs uppercase tracking-wider text-gray-400 flex-wrap">
              <li>
                <Link href={localeHome(lang)} className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <span className="text-gray-600">/</span>
              <li>
                <Link href={`/${lang}/airports`} className="hover:text-white transition-colors">
                  Airports
                </Link>
              </li>
              <span className="text-gray-600">/</span>
              <li className="text-[#259FCF] font-medium" aria-current="page">
                {data.iata}
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline, Description & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#259FCF]/10 border border-[#259FCF]/30 text-[#259FCF] text-xs font-semibold tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-[#259FCF] animate-pulse" />
                {data.iata} · {data.cityName}, {data.countryName}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                {data.heroTitle}
              </h1>

              <div className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl whitespace-pre-line space-y-3">
                {data.heroDescription}
              </div>

              {/* Quick Route Pill */}
              <div className="flex flex-wrap items-center gap-3 p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm text-gray-300">
                <div className="flex items-center gap-2 font-medium text-white">
                  <span className="text-[#259FCF]">●</span>
                  <span>{data.pickupDefault}</span>
                </div>
                <span className="text-gray-500">→</span>
                <div className="flex items-center gap-2 font-medium text-white">
                  <span className="text-[#259FCF]">◆</span>
                  <span>{data.dropoffDefault}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#inquiry"
                  className="px-8 py-3.5 rounded-full bg-[#259FCF] text-black font-semibold text-sm tracking-wide hover:bg-[#208ab5] transition-all shadow-lg shadow-[#259FCF]/20"
                >
                  Book Chauffeur
                </a>
                <a
                  href="#fleet"
                  className="px-8 py-3.5 rounded-full bg-white/5 border border-white/20 text-white font-semibold text-sm tracking-wide hover:bg-white/10 hover:border-white/40 transition-all"
                >
                  View the Fleet
                </a>
                <a
                  href={`tel:${data.phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-[#259FCF] transition-colors py-2 px-3"
                >
                  <svg className="w-4 h-4 text-[#259FCF]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" />
                  </svg>
                  <span>{data.phone}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Hero Inquiry Form */}
            <div id="inquiry" className="lg:col-span-5">
              <div className="bg-[#0e0f14]/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl">
                <div className="mb-4">
                  <span className="text-xs uppercase tracking-widest text-[#259FCF] font-semibold">24/7 Fast Booking</span>
                  <h3 className="text-xl font-bold text-white mt-1">Direct Transfer Inquiry</h3>
                  <p className="text-xs text-gray-400 mt-1">Personalized meet & greet at {data.iata} with real-time flight tracking.</p>
                </div>
                <HeroInquiryForm dict={dict} locationName={data.iata} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. FLEET SHOWCASE SECTION ── */}
      <section id="fleet" className="py-24 bg-[#0a0a0e] border-t border-b border-white/[0.06] relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs uppercase tracking-widest text-[#259FCF] font-semibold">
              {data.fleetEyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              {data.fleetHeading}
            </h2>
            <p className="text-gray-400 text-base leading-relaxed">
              {data.fleetDescription}
            </p>
          </div>

          {/* Vehicle Class Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-10 border-b border-white/10">
            {data.vehicles.map((v, idx) => (
              <button
                key={v.name}
                onClick={() => setSelectedVehicleIdx(idx)}
                className={`px-5 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all ${
                  selectedVehicleIdx === idx
                    ? "bg-[#259FCF] text-black shadow-lg shadow-[#259FCF]/20"
                    : "bg-white/[0.04] text-gray-300 hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                {v.name}
              </button>
            ))}
          </div>

          {/* Active Vehicle Feature Card */}
          {currentVehicle && (
            <div className="bg-[#12131a] rounded-3xl border border-white/10 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
              {/* Vehicle Image */}
              <div className="lg:col-span-7 relative h-[280px] sm:h-[380px] lg:h-[440px] w-full rounded-2xl overflow-hidden bg-black/40">
                <Image
                  src={currentVehicle.image}
                  alt={`${currentVehicle.name} - ${currentVehicle.model}`}
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-xs font-medium text-white">
                  {currentVehicle.tagline}
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-gray-300 bg-black/70 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2">
                    <span>👥 {currentVehicle.capacity}</span>
                    <span className="text-gray-600">|</span>
                    <span>🧳 {currentVehicle.luggage}</span>
                  </div>
                  <span className="text-[#259FCF] font-semibold">Climate-Controlled</span>
                </div>
              </div>

              {/* Vehicle Details */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#259FCF] font-semibold">
                    Vehicle Class
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                    {currentVehicle.name}
                  </h3>
                  <p className="text-sm font-medium text-gray-400 mt-1">
                    {currentVehicle.model}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs sm:text-sm text-[#259FCF] font-medium">
                  {currentVehicle.idealFor}
                </div>

                <p className="text-sm text-gray-300 leading-relaxed">
                  {currentVehicle.description}
                </p>

                <div className="space-y-2.5 pt-2 border-t border-white/10 text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="text-[#259FCF]">✓</span>
                    <span>Complimentary flight monitoring & gate coordination</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#259FCF]">✓</span>
                    <span>60 minutes complimentary waiting time from touchdown</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#259FCF]">✓</span>
                    <span>Chilled bottled water & high-speed Wi-Fi onboard</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <a
                    href="#inquiry"
                    className="flex-1 text-center py-3.5 px-6 rounded-full bg-[#259FCF] text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#208ab5] transition-all"
                  >
                    Book This Class
                  </a>
                  <Link
                    href={`/${lang}/fleet`}
                    className="py-3.5 px-6 rounded-full bg-white/5 border border-white/10 text-white font-semibold text-xs tracking-wider uppercase hover:bg-white/10 transition-all"
                  >
                    All Fleet
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 3. POPULAR JOURNEYS SECTION ── */}
      <section className="py-24 bg-[#070709] relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs uppercase tracking-widest text-[#259FCF] font-semibold">
              {data.journeysEyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              {data.journeysHeading}
            </h2>
            <p className="text-gray-400 text-base leading-relaxed">
              {data.journeysDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.journeys.map((j, idx) => (
              <div
                key={j.title}
                className="bg-[#0f1017] p-6 rounded-2xl border border-white/10 hover:border-[#259FCF]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#259FCF]/10 flex items-center justify-center text-[#259FCF] mb-4 group-hover:scale-110 transition-transform">
                    <span className="font-bold text-sm">0{idx + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#259FCF] transition-colors">
                    {j.title}
                  </h3>
                  {j.priceNote && (
                    <div className="text-xs font-semibold text-[#259FCF] mb-3">
                      {j.priceNote}
                    </div>
                  )}
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">
                    {j.description}
                  </p>
                </div>

                <a
                  href="#inquiry"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#259FCF] hover:text-white transition-colors group-hover:translate-x-1 duration-200"
                >
                  <span>Book Transfer</span>
                  <span>→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. HOW IT WORKS (MEET & GREET LOGISTICS) ── */}
      <section className="py-24 bg-[#0a0a0f] border-t border-b border-white/[0.06] relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs uppercase tracking-widest text-[#259FCF] font-semibold">
              {data.howItWorksEyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              {data.howItWorksHeading}
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {data.howItWorksIntro}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.howItWorksSteps.map((st) => (
              <div
                key={st.step}
                className="bg-[#12131b] p-6 rounded-2xl border border-white/10 hover:border-[#259FCF]/40 transition-all relative"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-full bg-[#259FCF] text-black font-bold text-xs flex items-center justify-center">
                    {st.step}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                    STEP {st.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{st.title}</h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {st.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. TERMINALS & AIRPORT LAYOUT SECTION ── */}
      <section className="py-24 bg-[#070709] relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className={`${data.terminalImage ? "lg:col-span-7" : "lg:col-span-12"} space-y-8`}>
              <div>
                <span className="text-xs uppercase tracking-widest text-[#259FCF] font-semibold">
                  {data.terminalsEyebrow}
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
                  {data.terminalsHeading}
                </h2>
                <p className="text-gray-400 text-base leading-relaxed">
                  {data.terminalsIntro}
                </p>
              </div>

              <div className="space-y-4">
                {data.terminals.map((t) => (
                  <div
                    key={t.name}
                    className="p-5 rounded-2xl bg-[#0f1017] border border-white/10 hover:border-[#259FCF]/30 transition-all"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full bg-[#259FCF]" />
                      <h3 className="text-base sm:text-lg font-bold text-white">{t.name}</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed pl-4">
                      {t.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Optional Terminal Image (e.g. image2.jpg) */}
            {data.terminalImage && (
              <div className="lg:col-span-5 relative h-[380px] sm:h-[480px] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src={data.terminalImage}
                  alt={data.terminalImageAlt || `${data.iata} terminal meeting points`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-xs text-gray-300">
                  <span className="text-[#259FCF] font-semibold block mb-0.5">VIP & Commercial Staging</span>
                  Designated chauffeur meeting points positioned past customs for seamless departure.
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 6. COMPREHENSIVE / CONNECTED SERVICES SECTION ── */}
      <section className="py-24 bg-[#0a0a0f] border-t border-b border-white/[0.06] relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs uppercase tracking-widest text-[#259FCF] font-semibold">
              {data.servicesEyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              {data.servicesHeading}
            </h2>
            <p className="text-gray-400 text-base leading-relaxed">
              {data.servicesIntro}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {data.servicesList.map((svc) => (
              <div
                key={svc.title}
                className="p-6 sm:p-7 rounded-2xl bg-[#12131b] border border-white/10 flex flex-col justify-between hover:border-[#259FCF]/40 transition-all group"
              >
                <div className="flex flex-col items-start">
                  {/* Icon above */}
                  <div className="w-12 h-12 rounded-xl bg-[#259FCF]/10 border border-[#259FCF]/20 flex items-center justify-center text-[#259FCF] mb-5 group-hover:scale-105 group-hover:bg-[#259FCF]/20 transition-all">
                    {svc.icon === "Plane" && (
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                      </svg>
                    )}
                    {svc.icon === "Crown" && (
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
                      </svg>
                    )}
                    {svc.icon === "MapPin" && (
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    )}
                    {svc.icon === "Building2" && (
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
                      </svg>
                    )}
                  </div>

                  {/* Title below icon */}
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5 group-hover:text-[#259FCF] transition-colors leading-snug">
                    {svc.title}
                  </h3>

                  {/* Description in column */}
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">
                    {svc.description}
                  </p>
                </div>

                {/* Explore Link below */}
                <Link
                  href={svc.href || "#inquiry"}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#259FCF] group-hover:text-white transition-colors pt-3 border-t border-white/[0.06] w-full"
                >
                  <span>Explore Service</span>
                  <span className="group-hover:translate-x-1 duration-200">→</span>
                </Link>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-xs sm:text-sm text-gray-300 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="leading-relaxed">{data.servicesOutro}</p>
            <a
              href="#inquiry"
              className="shrink-0 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
            >
              Corporate Inquiries
            </a>
          </div>
        </div>
      </section>

      {/* ── 7. FAQ ACCORDION SECTION ── */}
      <section className="py-24 bg-[#070709] relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-[#259FCF] font-semibold">
              {data.faqsEyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
              {data.faqsHeading}
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              Clear answers regarding flight tracking, terminal meeting points, waiting times, and corporate chauffeur reservations at {data.iata}.
            </p>
          </div>

          <div className="space-y-3">
            {data.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl bg-[#0f1017] border border-white/10 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-white text-base sm:text-lg">
                      {faq.q}
                    </span>
                    <span
                      className={`w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs text-[#259FCF] shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm text-gray-300 leading-relaxed whitespace-pre-line border-t border-white/[0.04] pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 8. BOTTOM CTA BANNER ── */}
      <section className="py-20 bg-gradient-to-b from-[#0a0a0f] to-black border-t border-white/10 relative">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#259FCF]/10 border border-[#259FCF]/20 text-[#259FCF] text-xs font-semibold tracking-wider uppercase">
            <span>24/7 Operations Desk</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            {data.ctaHeading}
          </h2>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto whitespace-pre-line">
            {data.ctaDescription}
          </p>

          <div className="pt-2">
            <a
              href={`tel:${data.ctaPhone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-3 text-xl sm:text-2xl font-bold text-white hover:text-[#259FCF] transition-colors py-2 px-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#259FCF]/40"
            >
              <svg className="w-6 h-6 text-[#259FCF]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" />
              </svg>
              <span>{data.ctaPhone}</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#inquiry"
              className="px-8 py-3.5 rounded-full bg-[#259FCF] text-black font-semibold text-sm tracking-wide hover:bg-[#208ab5] transition-all shadow-lg shadow-[#259FCF]/20"
            >
              Book Now
            </a>
            <Link
              href={`/${lang}/contact`}
              className="px-8 py-3.5 rounded-full bg-white/10 border border-white/20 text-white font-semibold text-sm tracking-wide hover:bg-white/20 transition-all"
            >
              Request a Proposal
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

