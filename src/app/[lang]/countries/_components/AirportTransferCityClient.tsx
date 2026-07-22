"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useCallback } from "react";
import BookingWidget from "@/components/layout/BookingWidget";
import type { Dictionary } from "@/app/[lang]/dictionaries";

const countryNames: Record<string, string> = {
  bh: "Bahrain", kw: "Kuwait", om: "Oman", qa: "Qatar", sa: "Saudi Arabia", ae: "UAE",
};

const cityNames: Record<string, string> = {
  dubai: "Dubai", "abu-dhabi": "Abu Dhabi", sharjah: "Sharjah", ajman: "Ajman", "ras-al-khaimah": "Ras Al Khaimah",
  riyadh: "Riyadh", jeddah: "Jeddah", mecca: "Mecca", medina: "Medina", dammam: "Dammam",
  doha: "Doha", "al-khor": "Al Khor", lusail: "Lusail",
  manama: "Manama", riffa: "Riffa", muharraq: "Muharraq",
  kuwait: "Kuwait City", hawalli: "Hawalli", farwaniya: "Farwaniya",
  muscat: "Muscat", salalah: "Salalah", sohar: "Sohar",
};

const cityHeroImages: Record<string, string> = {
  dubai: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&h=800&fit=crop",
  "abu-dhabi": "https://images.unsplash.com/photo-1624317937315-0ced8736c9e9?q=80&w=902&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  sharjah: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&h=800&fit=crop&q=80",
  ajman: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&h=800&fit=crop&q=81",
  "ras-al-khaimah": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&h=800&fit=crop&q=82",
  riyadh: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=1920&h=800&fit=crop",
  jeddah: "https://images.unsplash.com/photo-1674979724572-c0a0579bc9d0?q=80&w=773&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  mecca: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1920&h=800&fit=crop",
  medina: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1920&h=800&fit=crop&q=80",
  dammam: "https://images.unsplash.com/photo-1562979314-bee7453e911c?w=1920&h=800&fit=crop",
  doha: "https://images.unsplash.com/photo-1647252262017-582a7dbb73d0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "al-khor": "https://images.unsplash.com/photo-1647252262017-582a7dbb73d0?w=1920&h=800&fit=crop",
  lusail: "https://images.unsplash.com/photo-1647252262017-582a7dbb73d0?w=1920&h=800&fit=crop&q=80",
  manama: "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=1920&h=800&fit=crop",
  riffa: "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=1920&h=800&fit=crop&q=80",
  muharraq: "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=1920&h=800&fit=crop&q=81",
  kuwait: "https://images.unsplash.com/photo-1562979314-bee7453e911c?w=1920&h=800&fit=crop",
  hawalli: "https://images.unsplash.com/photo-1562979314-bee7453e911c?w=1920&h=800&fit=crop&q=80",
  farwaniya: "https://images.unsplash.com/photo-1562979314-bee7453e911c?w=1920&h=800&fit=crop&q=81",
  muscat: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=1920&h=800&fit=crop",
  salalah: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=1920&h=800&fit=crop&q=80",
  sohar: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=1920&h=800&fit=crop&q=81",
  default: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&h=800&fit=crop",
};

const citySeoImages: Record<string, string[]> = {
  dubai: ["https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop","https://images.unsplash.com/photo-1691664054143-ccdc900eca74?q=80&w=1544&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/flagged/photo-1559717865-a99cac1c95d8?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1584546459262-0ddde08da490?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
  "abu-dhabi": ["https://images.unsplash.com/photo-1578152882785-df9744e359e5?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1624317937315-0ced8736c9e9?q=80&w=902&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1685909201292-d86e15a63a1b?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
  sharjah: ["https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop&q=80","https://images.unsplash.com/photo-1691664054143-ccdc900eca74?q=80&w=1544&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&q=80","https://images.unsplash.com/photo-1584546459262-0ddde08da490?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&q=80"],
  riyadh: ["https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=600&h=400&fit=crop","https://images.unsplash.com/photo-1782216642347-be9deb5939c5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1663900108404-a05e8bf82cda?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1506795213373-430e921fe2ed?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
  jeddah: ["https://images.unsplash.com/photo-1658844239513-6c358c94b9c2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1782216632047-ea624080a4dd?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1586715065342-98d1f6016fd1?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=600&h=400&fit=crop"],
  mecca: ["https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&h=400&fit=crop","https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&h=400&fit=crop&q=80"],
  medina: ["https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&h=400&fit=crop&q=80","https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&h=400&fit=crop&q=81"],
  dammam: ["https://images.unsplash.com/photo-1562979314-bee7453e911c?w=600&h=400&fit=crop","https://images.unsplash.com/photo-1562979314-bee7453e911c?w=600&h=400&fit=crop&q=80"],
  doha: ["https://images.unsplash.com/photo-1647252262017-582a7dbb73d0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1734455823834-c89ebb125aa3?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1700901742651-6b353164caf3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1647755453118-aad22e0f7cc0?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
  manama: ["https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=600&h=400&fit=crop","https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=600&h=400&fit=crop&q=80","https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=600&h=400&fit=crop&q=81"],
  kuwait: ["https://images.unsplash.com/photo-1562979314-bee7453e911c?w=600&h=400&fit=crop","https://images.unsplash.com/photo-1562979314-bee7453e911c?w=600&h=400&fit=crop&q=80","https://images.unsplash.com/photo-1562979314-bee7453e911c?w=600&h=400&fit=crop&q=81"],
  muscat: ["https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=600&h=400&fit=crop","https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=600&h=400&fit=crop&q=80","https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=600&h=400&fit=crop&q=81"],
  default: ["https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop","https://images.unsplash.com/photo-1691664054143-ccdc900eca74?q=80&w=1544&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1584546459262-0ddde08da490?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
};

const benefits = [
  { icon: "currency", key: "competitiveRates" },
  { icon: "plane", key: "seamlessTravel" },
  { icon: "clock", key: "travelOnYourTerms" },
];

const serviceClasses = [
  { dictKey: "businessClass", fitsPeople: 3, images: ["https://images.unsplash.com/photo-1619221496652-7ee3d7406203?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=500&fit=crop","https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=500&fit=crop"] },
  { dictKey: "firstClass", fitsPeople: 3, images: ["https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=500&fit=crop","https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=500&fit=crop","https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=500&fit=crop"] },
  { dictKey: "businessVanSuv", fitsPeople: 5, images: ["https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&h=500&fit=crop","https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&h=500&fit=crop","https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=500&fit=crop"] },
];

function slugToName(slug: string, map: Record<string, string>): string {
  if (map[slug]) return map[slug];
  return slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

function CheckIcon() {
  return (<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-white/80 flex-shrink-0 mt-0.5"><path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z" /></svg>);
}

function ArrowDown() {
  return (<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="text-gray-400"><path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" /></svg>);
}

function ArrowUp() {
  return (<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="text-gray-400"><path d="M11.9999 10.8284L7.0502 15.7782L5.63599 14.364L11.9999 8L18.3639 14.364L16.9497 15.7782L11.9999 10.8284Z" /></svg>);
}

interface Props {
  dict: Dictionary;
  lang: string;
  countrySlug: string;
  citySlug: string;
}

export default function AirportTransferCityClient({ dict, lang, countrySlug, citySlug }: Props) {
  const countryName = slugToName(countrySlug, countryNames);
  const cityName = slugToName(citySlug, cityNames);
  const heroImage = cityHeroImages[citySlug] || cityHeroImages.default;
  const seoImages = citySeoImages[citySlug] || citySeoImages.default;
  const atcDict = dict.airportTransferCity;

  const [benefitIndex, setBenefitIndex] = useState(0);
  const [serviceImageIndices, setServiceImageIndices] = useState<number[]>(serviceClasses.map(() => 0));
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const nextServiceImage = useCallback((serviceIdx: number) => {
    setServiceImageIndices((prev) => { const next = [...prev]; next[serviceIdx] = (next[serviceIdx] + 1) % serviceClasses[serviceIdx].images.length; return next; });
  }, []);

  const prevServiceImage = useCallback((serviceIdx: number) => {
    setServiceImageIndices((prev) => { const next = [...prev]; next[serviceIdx] = (next[serviceIdx] - 1 + serviceClasses[serviceIdx].images.length) % serviceClasses[serviceIdx].images.length; return next; });
  }, []);

  return (
    <main className="min-h-screen bg-[#292a30] text-white">
      <section className="relative w-full h-[60vh] min-h-[450px]">
        <Image src={heroImage} alt={`Airport Transfer in ${cityName}`} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#292a30]" />
        <div className="absolute inset-0 flex items-end">
          <div className="w-full max-w-7xl mx-auto px-8 pb-8 flex flex-col lg:flex-row items-end justify-between gap-8">
            <div className="max-w-xl">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{atcDict.heroTitle.replace("{city}", cityName)}</h1>
            </div>
            <BookingWidget dict={dict} />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 py-6">
        <nav aria-label="Breadcrumb navigation">
          <ol className="flex items-center gap-2 text-sm text-gray-400 flex-wrap">
            <li className="flex items-center gap-2"><Link href={`/${lang}`} className="hover:text-white transition-colors">{atcDict.breadcrumb.home}</Link><span aria-hidden="true">→</span></li>
            <li className="flex items-center gap-2"><Link href={`/${lang}/countries`} className="hover:text-white transition-colors">{atcDict.breadcrumb.countries}</Link><span aria-hidden="true">→</span></li>
            <li className="flex items-center gap-2"><Link href={`/${lang}/countries/${countrySlug}`} className="hover:text-white transition-colors">{countryName}</Link><span aria-hidden="true">→</span></li>
            <li className="flex items-center gap-2"><Link href={`/${lang}/countries/${countrySlug}/${citySlug}`} className="hover:text-white transition-colors">{cityName}</Link><span aria-hidden="true">→</span></li>
            <li><span className="text-white" aria-current="page">{atcDict.heroTitle.replace("{city}", cityName)}</span></li>
          </ol>
        </nav>
      </section>

      <section className="max-w-4xl mx-auto px-8 py-12 md:py-16">
        <blockquote className="text-center">
          <p className="text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed mb-6 text-white/90">&ldquo;{atcDict.testimonial.text}&rdquo;</p>
          <cite className="text-sm text-gray-400 not-italic">{atcDict.testimonial.author}</cite>
        </blockquote>
      </section>

      <section className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {benefits.map((benefit) => (
            <div key={benefit.key} className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  {benefit.icon === "currency" && <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.94s4.18 1.36 4.18 3.85c0 1.89-1.44 2.98-3.12 3.19z" /></svg>}
                  {benefit.icon === "plane" && <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" /></svg>}
                  {benefit.icon === "clock" && <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" /></svg>}
                </div>
                <h3 className="text-lg font-semibold">{(atcDict.benefits as Record<string, { title: string; desc: string }>)[benefit.key].title}</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed pl-[52px]">{(atcDict.benefits as Record<string, { title: string; desc: string }>)[benefit.key].desc}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-6 md:hidden">
          {benefits.map((_, idx) => (
            <button key={idx} onClick={() => setBenefitIndex(idx)} className={`w-2 h-2 rounded-full transition-colors ${benefitIndex === idx ? "bg-white" : "bg-white/30"}`} aria-label={`USP ${idx + 1}`} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">{atcDict.discoverClasses}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {serviceClasses.map((service, serviceIdx) => {
            const svcDict = (atcDict.serviceClasses as Record<string, { title: string; desc: string; fitsPeople: number; fitsLuggage: string; availability: string; fitsUpTo: string }>)[service.dictKey];
            return (
            <div key={svcDict.title} className="bg-[#1c1d21] rounded-2xl overflow-hidden">
              <div className="relative aspect-[16/10] overflow-hidden group">
                <Image src={service.images[serviceImageIndices[serviceIdx]]} alt={svcDict.title} fill className="object-cover transition-opacity duration-300" />
                <button onClick={() => prevServiceImage(serviceIdx)} className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 rounded-full items-center justify-center hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100 hidden md:flex" aria-label="Previous image">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z" /></svg>
                </button>
                <button onClick={() => nextServiceImage(serviceIdx)} className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 rounded-full items-center justify-center hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100 hidden md:flex" aria-label="Next image">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" /></svg>
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {service.images.map((_, imgIdx) => (
                    <button key={imgIdx} onClick={() => setServiceImageIndices((prev) => { const next = [...prev]; next[serviceIdx] = imgIdx; return next; })} className={`w-1.5 h-1.5 rounded-full transition-colors ${imgIdx === serviceImageIndices[serviceIdx] ? "bg-white" : "bg-white/40"}`} aria-label={`Image ${imgIdx + 1}`} />
                  ))}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{svcDict.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{svcDict.desc}</p>
                <div className="h-px bg-gradient-to-r from-white/20 via-white/10 to-transparent mb-4" />
                <ul className="space-y-3">
                  <li className="flex items-start gap-3"><CheckIcon /><span className="text-sm text-white/80">{svcDict.fitsUpTo.replace("{n}", String(service.fitsPeople))}</span></li>
                  <li className="flex items-start gap-3"><CheckIcon /><span className="text-sm text-white/80">{svcDict.fitsLuggage}</span></li>
                  <li className="flex items-start gap-3"><CheckIcon /><span className="text-sm text-white/80">{svcDict.availability}</span></li>
                </ul>
              </div>
            </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center py-16 border-t border-white/10">
          <div className="flex-1"><h2 className="text-2xl md:text-3xl font-bold mb-6">{atcDict.seo.reliableTitle.replace("{city}", cityName)}</h2><div className="text-gray-400 leading-relaxed space-y-4"><p>{atcDict.seo.reliableDesc1.replace("{city}", cityName)}</p><p>{atcDict.seo.reliableDesc2.replace("{city}", cityName)}</p></div></div>
          <div className="flex-1 relative h-[300px] md:h-[400px] w-full rounded-2xl overflow-hidden"><Image src={seoImages[0]} alt={`${cityName} airport transfer`} fill className="object-cover" /></div>
        </div>
        <div className="flex flex-col lg:flex-row-reverse gap-12 items-center py-16 border-t border-white/10">
          <div className="flex-1"><h2 className="text-2xl md:text-3xl font-bold mb-6">{atcDict.seo.arrivalTitle.replace("{city}", cityName)}</h2><div className="text-gray-400 leading-relaxed space-y-4"><p>{atcDict.seo.arrivalDesc1.replace("{city}", cityName)}</p><p>{atcDict.seo.arrivalDesc2.replace("{city}", cityName)}</p></div></div>
          <div className="flex-1 relative h-[300px] md:h-[400px] w-full rounded-2xl overflow-hidden"><Image src={seoImages[1]} alt={`${cityName} airport arrival`} fill className="object-cover" /></div>
        </div>
        <div className="flex flex-col lg:flex-row gap-12 items-center py-16 border-t border-white/10">
          <div className="flex-1"><h2 className="text-2xl md:text-3xl font-bold mb-6">{atcDict.seo.exploreTitle.replace("{city}", cityName)}</h2><div className="text-gray-400 leading-relaxed space-y-4"><p>{atcDict.seo.exploreDesc.replace("{city}", cityName)}</p></div></div>
          <div className="flex-1 relative h-[300px] md:h-[400px] w-full rounded-2xl overflow-hidden"><Image src={seoImages[2]} alt={`${cityName} limousine service`} fill className="object-cover" /></div>
        </div>
        <div className="flex flex-col lg:flex-row-reverse gap-12 items-center py-16 border-t border-white/10">
          <div className="flex-1"><h2 className="text-2xl md:text-3xl font-bold mb-6">{atcDict.seo.flyingTitle.replace("{city}", cityName)}</h2><div className="text-gray-400 leading-relaxed space-y-4"><p>{atcDict.seo.flyingDesc.replace("{city}", cityName)}</p></div></div>
          <div className="flex-1 relative h-[300px] md:h-[400px] w-full rounded-2xl overflow-hidden"><Image src={seoImages[3]} alt={`Flying into ${cityName}`} fill className="object-cover" /></div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-8 py-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">{atcDict.faqTitle}</h2>
        <div className="space-y-0">
          {atcDict.faq.map((item, idx) => (
            <div key={item.q} className="border-b border-white/10">
              <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full py-5 flex items-center justify-between text-left">
                <h3 className="text-base md:text-lg font-semibold pr-4">{item.q}</h3>
                {openFaq === idx ? <ArrowUp /> : <ArrowDown />}
              </button>
              {openFaq === idx && (
                <div className="pb-5 text-sm text-gray-400 leading-relaxed">
                  <ul className="space-y-2">{item.a.map((line: string, lineIdx: number) => <li key={lineIdx}>{line}</li>)}</ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
