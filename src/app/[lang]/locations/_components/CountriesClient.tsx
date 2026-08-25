"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { COUNTRIES, countryUrl } from "@/lib/locations";

const countryImages: Record<string, string> = {
  bh: "https://images.unsplash.com/photo-1548755212-2b46ee259868?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  kw: "https://images.unsplash.com/photo-1562979314-bee7453e911c?w=800&h=600&fit=crop",
  om: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  qa: "https://images.unsplash.com/photo-1700901742651-6b353164caf3?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  sa: "https://images.unsplash.com/photo-1663900108404-a05e8bf82cda?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ae: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop",
};

const featureIcons = [
  <svg key="globe" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  <svg key="clock" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  <svg key="currency" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
];

export default function CountriesClient({ dict, lang }: { dict: Dictionary; lang: string }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCountries = COUNTRIES.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#292a30] text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1920&h=800&fit=crop"
          alt="Global Availability"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#292a30]" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            {dict.countries.hero.heading}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            {dict.countries.hero.desc}
          </p>
          <Link
            href={`/${lang}`}
            className="inline-block bg-white text-[#292a30] px-8 py-3 text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
          >
            {dict.countries.bookNow}
          </Link>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-8 py-6">
        <nav className="text-sm text-gray-400">
          <Link href={`/${lang}`} className="hover:text-white transition-colors">
            {dict.countries.breadcrumb.home}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">{dict.countries.breadcrumb.countries}</span>
        </nav>
      </div>

      {/* Search Input */}
      <section className="max-w-7xl mx-auto px-8 pb-8">
        <div className="relative max-w-md">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder={dict.countries.search.placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1c1d21] border border-gray-700/50 rounded-full pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white/50 transition-colors"
          />
        </div>
      </section>

      {/* Feature Cards */}
      <section className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dict.countries.features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-[#1c1d21] p-8 rounded-2xl hover:bg-[#2a2c35] transition-colors"
            >
              <div className="text-gray-400 mb-4">{featureIcons[index]}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Countries Grid */}
      <section className="max-w-7xl mx-auto px-8 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {dict.countries.section.heading}
        </h2>
        <p className="text-gray-400 mb-12">
          {dict.countries.section.desc}
        </p>

        {filteredCountries.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">{dict.countries.noResults.replace("{query}", searchQuery)}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredCountries.map((country) => (
              <Link
                key={country.code}
                href={countryUrl(lang, country)}
                className="group bg-[#1c1d21] border border-gray-700/50 rounded-xl overflow-hidden hover:border-white/30 hover:bg-[#2a2c35] transition-all duration-300"
              >
                <div className="relative h-32 overflow-hidden">
                  <Image
                    src={countryImages[country.code]}
                    alt={country.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">
                    {country.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 uppercase">
                    {country.cities.length} {country.cities.length === 1 ? dict.common.city : dict.common.cities}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-[#1c1d21] py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {dict.countries.cta.heading}
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            {dict.countries.cta.desc}
          </p>
          <Link
            href={`/${lang}`}
            className="inline-block bg-white text-[#292a30] px-8 py-3 text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
          >
            {dict.countries.cta.button}
          </Link>
        </div>
      </section>

    </main>
  );
}
