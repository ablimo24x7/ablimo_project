"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Shield,
  ShieldCheck,
  CheckCircle,
  Award,
  Globe,
  FileCheck,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Users,
  Compass,
} from "lucide-react";
import { type Locale, localeBase, localeHome } from "@/app/[lang]/dictionaries";
import type { PresenceContent } from "./presence-content";

interface GlobalPresenceClientProps {
  content: PresenceContent;
  lang: Locale;
}

export default function GlobalPresenceClient({
  content,
  lang,
}: GlobalPresenceClientProps) {
  const baseHref = localeBase(lang);
  const homeHref = localeHome(lang);
  const isAr = lang.startsWith("ar");

  // State for active office tab & open FAQs
  const [selectedOfficeId, setSelectedOfficeId] = React.useState<string>("riyadh");
  const [openFaqIndices, setOpenFaqIndices] = React.useState<Record<number, boolean>>({
    0: true,
  });

  const toggleFaq = (idx: number) => {
    setOpenFaqIndices((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const selectedOffice =
    content.officesSection.offices.find((o) => o.id === selectedOfficeId) ||
    content.officesSection.offices[0];

  return (
    <div className={`min-h-screen bg-abBlack text-gray-200 ${isAr ? "font-arabic" : ""}`}>
      {/* ── 1. Hero Section ────────────────────────────────────────── */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden border-b border-gray-800">
        {/* Background Image with Deep Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1000&fit=crop&q=80"
            alt="AB Global Headquarters Riyadh and Regional Network"
            fill
            priority
            className="object-cover object-center brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-abBlack via-abBlack/85 to-abBlack/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500/10 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-abServiceBlue text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-sm">
            <Globe className="w-3.5 h-3.5" />
            <span>{content.hero.eyebrow}</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight max-w-5xl mx-auto leading-[1.15] mb-6">
            {content.hero.title}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-abServiceBlue via-sky-300 to-sky-500">
              {content.hero.titleHighlight}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
            {content.hero.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#offices"
              className="px-8 py-4 bg-abServiceBlue hover:bg-sky-500 text-white font-semibold rounded-lg shadow-lg shadow-sky-500/20 transition-all flex items-center gap-2 group"
            >
              <span>{content.hero.primaryCta}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#leadership"
              className="px-8 py-4 bg-gray-900/80 hover:bg-gray-800 text-white font-semibold rounded-lg border border-gray-700 backdrop-blur-sm transition-all flex items-center gap-2"
            >
              <Users className="w-4 h-4 text-sky-400" />
              <span>{content.hero.secondaryCta}</span>
            </a>
          </div>

          {/* Stats Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {content.stats.map((st, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-gray-900/60 border border-gray-800/80 backdrop-blur-sm text-center"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
                  {st.value}
                </div>
                <div className="text-xs text-gray-400 font-medium">
                  {st.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Regional Offices Section (H2: Our Offices) ─────────── */}
      <section id="offices" className="py-24 bg-abDarkGray relative border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-abServiceBlue text-xs font-semibold uppercase tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>{content.officesSection.eyebrow}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              {content.officesSection.heading}
            </h2>
            <p className="text-gray-400 text-base leading-relaxed">
              {content.officesSection.description}
            </p>
          </div>

          {/* City Selector Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {content.officesSection.offices.map((office) => {
              const isSelected = office.id === selectedOfficeId;
              return (
                <button
                  key={office.id}
                  onClick={() => setSelectedOfficeId(office.id)}
                  className={`px-5 py-3 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 border ${
                    isSelected
                      ? "bg-abServiceBlue text-white border-abServiceBlue shadow-lg shadow-sky-500/20"
                      : "bg-abBlack/60 text-gray-300 border-gray-800 hover:border-gray-700 hover:text-white"
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>{office.city}</span>
                  {office.isHq && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold ml-1">
                      HQ
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Office Detail Card */}
          <div className="bg-abBlack rounded-2xl border border-gray-800 overflow-hidden shadow-2xl mb-16">
            <div className="grid md:grid-cols-12 gap-0">
              {/* Left Column: Office Details */}
              <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-xs font-bold tracking-widest text-abServiceBlue uppercase px-3 py-1 rounded bg-sky-500/10 border border-sky-500/20">
                      {selectedOffice.tag}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      {selectedOffice.authority}
                    </span>
                  </div>

                  <h3 className="text-3xl font-extrabold text-white mb-2">
                    {selectedOffice.city},{" "}
                    <span className="text-gray-400 text-xl font-normal">
                      {selectedOffice.country}
                    </span>
                  </h3>
                  <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                    {selectedOffice.role}
                  </p>

                  {/* Address List */}
                  <div className="space-y-4 mb-8 bg-gray-900/60 p-6 rounded-xl border border-gray-800">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-sky-400 shrink-0 mt-1" />
                      <div>
                        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                          Official Physical Address
                        </div>
                        {selectedOffice.addressLines.map((line, idx) => (
                          <div key={idx} className="text-white text-sm">
                            {line}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 pt-3 border-t border-gray-800/80">
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                        <div>
                          <div className="text-[11px] text-gray-400 uppercase">
                            Direct Phone
                          </div>
                          <a
                            href={`tel:${selectedOffice.phone.replace(/\s+/g, "")}`}
                            className="text-white hover:text-sky-400 text-sm font-semibold transition-colors"
                          >
                            {selectedOffice.phone}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                        <div>
                          <div className="text-[11px] text-gray-400 uppercase">
                            Desk Email
                          </div>
                          <a
                            href={`mailto:${selectedOffice.email}`}
                            className="text-white hover:text-sky-400 text-sm font-semibold transition-colors"
                          >
                            {selectedOffice.email}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2 text-xs text-gray-400">
                      <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{selectedOffice.hours}</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      selectedOffice.mapQuery
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-sky-500/10 hover:bg-sky-500/20 text-abServiceBlue hover:text-white border border-sky-400/30 rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <Link
                    href={`${baseHref}/contact`}
                    className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-semibold transition-all"
                  >
                    Contact This Office
                  </Link>
                </div>
              </div>

              {/* Right Column: Visual / Image */}
              <div className="md:col-span-5 relative min-h-[300px] md:min-h-full bg-gray-900 border-t md:border-t-0 md:border-l border-gray-800">
                <Image
                  src={
                    selectedOffice.id === "riyadh"
                      ? "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=800&h=800&fit=crop&q=80"
                      : selectedOffice.id === "dubai"
                      ? "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=800&fit=crop&q=80"
                      : selectedOffice.id === "abu-dhabi"
                      ? "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=800&fit=crop&q=80"
                      : "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=800&h=800&fit=crop&q=80"
                  }
                  alt={`${selectedOffice.city} Office`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-abBlack via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                  <div className="text-white text-xs font-semibold">
                    {selectedOffice.city} Control Room & Fleet Logistics
                  </div>
                  <div className="text-gray-300 text-[11px]">
                    Centralized telematics, vehicle inspection yard, and protocol staging.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Grid of All 4 Offices */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.officesSection.offices.map((off) => (
              <div
                key={off.id}
                onClick={() => setSelectedOfficeId(off.id)}
                className={`p-6 rounded-xl border transition-all cursor-pointer ${
                  off.id === selectedOfficeId
                    ? "bg-gray-900 border-abServiceBlue shadow-lg"
                    : "bg-abBlack/70 border-gray-800 hover:border-gray-700 hover:bg-gray-900/50"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wide">
                    {off.city}
                  </span>
                  {off.isHq && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold">
                      HQ
                    </span>
                  )}
                </div>
                <div className="text-white font-bold text-base mb-2">
                  {off.country}
                </div>
                <div className="text-xs text-gray-400 line-clamp-2 mb-4">
                  {off.addressLines[0]}, {off.addressLines[1]}
                </div>
                <div className="text-xs text-abServiceBlue font-semibold flex items-center gap-1">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Leadership Section (H2: Leadership) ──────────────────── */}
      <section id="leadership" className="py-24 bg-abBlack relative border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-abServiceBlue text-xs font-semibold uppercase tracking-wider mb-3">
                <Users className="w-3.5 h-3.5" />
                <span>{content.leadershipSection.eyebrow}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                {content.leadershipSection.heading}
              </h2>
              <p className="text-gray-400 text-base leading-relaxed">
                {content.leadershipSection.description}
              </p>
            </div>
            <div>
              <Link
                href={`${baseHref}/contact`}
                className="inline-flex items-center gap-2 text-abServiceBlue hover:text-white font-semibold text-sm transition-colors group"
              >
                <span>{content.leadershipSection.ctaLabel}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Leaders Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.leadershipSection.leaders.map((ldr) => (
              <div
                key={ldr.id}
                className="group bg-abDarkGray rounded-2xl border border-gray-800 overflow-hidden hover:border-sky-500/50 transition-all duration-300 flex flex-col justify-between shadow-xl"
              >
                <div>
                  {/* Photo with Overlay */}
                  <div className="relative h-72 w-full overflow-hidden bg-gray-900">
                    <Image
                      src={ldr.image}
                      alt={ldr.name}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-abDarkGray via-abDarkGray/20 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="text-[11px] font-semibold text-sky-400 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-white/10">
                        {ldr.location}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors mb-1">
                      {ldr.name}
                    </h3>
                    <div className="text-xs font-semibold text-abServiceBlue uppercase tracking-wide mb-4">
                      {ldr.title}
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {ldr.bio}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-gray-800/80 mt-auto">
                  <div className="text-[11px] text-gray-500 font-mono mt-3">
                    {ldr.credentials}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Licenses and Credentials (H2: Licenses & Credentials) ── */}
      <section id="credentials" className="py-24 bg-abDarkGray relative border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{content.credentialsSection.eyebrow}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                {content.credentialsSection.heading}
              </h2>
              <p className="text-gray-400 text-base leading-relaxed">
                {content.credentialsSection.description}
              </p>
            </div>
            <div>
              <Link
                href={`${baseHref}/about#standard`}
                className="inline-flex items-center gap-2 text-abServiceBlue hover:text-white font-semibold text-sm transition-colors group"
              >
                <span>{content.credentialsSection.ctaLabel}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Credentials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.credentialsSection.credentials.map((crd) => (
              <div
                key={crd.id}
                className="p-8 rounded-2xl bg-abBlack border border-gray-800 hover:border-gray-700 transition-all flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-abServiceBlue">
                      {crd.icon === "Shield" && <Shield className="w-6 h-6" />}
                      {crd.icon === "ShieldCheck" && <ShieldCheck className="w-6 h-6" />}
                      {crd.icon === "CheckCircle" && <CheckCircle className="w-6 h-6" />}
                      {crd.icon === "Award" && <Award className="w-6 h-6" />}
                      {crd.icon === "Globe" && <Globe className="w-6 h-6" />}
                      {crd.icon === "FileCheck" && <FileCheck className="w-6 h-6" />}
                    </div>
                    <span className="text-xs font-bold text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      {crd.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1">
                    {crd.title}
                  </h3>
                  <div className="text-xs text-gray-400 font-medium mb-4">
                    {crd.issuer}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {crd.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-800/80 mt-6 flex items-center text-xs text-gray-400 gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Verified & Centrally Monitored</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. FAQs ────────────────────────────────────────────────── */}
      <section id="faqs" className="py-24 bg-abBlack relative border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-abServiceBlue text-xs font-semibold uppercase tracking-wider mb-3">
              <span>{content.faqsSection.eyebrow}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {content.faqsSection.heading}
            </h2>
            <p className="text-gray-400 text-base leading-relaxed">
              {content.faqsSection.description}
            </p>
          </div>

          {/* Accordion */}
          <div className="space-y-4">
            {content.faqsSection.faqs.map((faq, idx) => {
              const isOpen = Boolean(openFaqIndices[idx]);
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-gray-800 bg-gray-900/50 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-gray-900 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-bold text-white">
                      {faq.q}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center shrink-0 text-sky-400">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-gray-300 text-sm sm:text-base leading-relaxed border-t border-gray-800/60 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. Closing CTA Banner ──────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-abDarkGray to-abBlack relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-10 md:p-16 rounded-3xl bg-gradient-to-r from-gray-900 via-abBlack to-gray-900 border border-gray-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-abServiceBlue via-sky-400 to-abServiceBlue" />

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              {content.closingCta.heading}
            </h2>
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              {content.closingCta.description}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href={`${baseHref}/contact`}
                className="px-8 py-4 bg-abServiceBlue hover:bg-sky-500 text-white font-semibold rounded-lg shadow-lg shadow-sky-500/20 transition-all flex items-center gap-2"
              >
                <span>{content.closingCta.primaryCta}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={`${baseHref}/corporate-accounts`}
                className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg border border-gray-700 transition-all"
              >
                {content.closingCta.secondaryCta}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
