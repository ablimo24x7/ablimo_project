"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Dictionary } from "@/app/[lang]/dictionaries";

const countries = [
  { name: "Argentina", code: "ar" },
  { name: "Australia", code: "au" },
  { name: "Austria", code: "at" },
  { name: "Bahrain", code: "bh" },
  { name: "Belgium", code: "be" },
  { name: "Brazil", code: "br" },
  { name: "Cambodia", code: "kh" },
  { name: "Canada", code: "ca" },
  { name: "Chile", code: "cl" },
  { name: "China", code: "cn" },
  { name: "Croatia", code: "hr" },
  { name: "Czechia", code: "cz" },
  { name: "Denmark", code: "dk" },
  { name: "Finland", code: "fi" },
  { name: "France", code: "fr" },
  { name: "Germany", code: "de" },
  { name: "Greece", code: "gr" },
  { name: "Hungary", code: "hu" },
  { name: "Indonesia", code: "id" },
  { name: "Ireland", code: "ie" },
  { name: "Italy", code: "it" },
  { name: "Japan", code: "jp" },
  { name: "Jordan", code: "jo" },
  { name: "Kenya", code: "ke" },
  { name: "Kuwait", code: "kw" },
  { name: "Luxembourg", code: "lu" },
  { name: "Malaysia", code: "my" },
  { name: "Mexico", code: "mx" },
  { name: "Monaco", code: "mc" },
  { name: "Netherlands", code: "nl" },
  { name: "New Zealand", code: "nz" },
  { name: "Norway", code: "no" },
  { name: "Oman", code: "om" },
  { name: "Poland", code: "pl" },
  { name: "Portugal", code: "pt" },
  { name: "Qatar", code: "qa" },
  { name: "Romania", code: "ro" },
  { name: "Saudi Arabia", code: "sa" },
  { name: "Singapore", code: "sg" },
  { name: "Slovakia", code: "sk" },
  { name: "South Africa", code: "za" },
  { name: "Spain", code: "es" },
  { name: "Sweden", code: "se" },
  { name: "Switzerland", code: "ch" },
  { name: "Thailand", code: "th" },
  { name: "Tunisia", code: "tn" },
  { name: "Türkiye", code: "tr" },
  { name: "UAE", code: "ae" },
  { name: "UK", code: "uk" },
  { name: "US", code: "us" },
  { name: "Vietnam", code: "vn" },
].sort((a, b) => a.name.localeCompare(b.name));

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

export default function CountriesClient({ dict }: { dict: Dictionary }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCountries = countries.filter((country) =>
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
            href="/"
            className="inline-block bg-white text-[#292a30] px-8 py-3 text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
          >
            {dict.countries.bookNow}
          </Link>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-8 py-6">
        <nav className="text-sm text-gray-400">
          <Link href="/" className="hover:text-white transition-colors">
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
          Countries we serve
        </h2>
        <p className="text-gray-400 mb-12">
          Explore our global network of premium chauffeur services
        </p>

        {filteredCountries.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No countries found matching &ldquo;{searchQuery}&rdquo;</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredCountries.map((country) => (
              <Link
                key={country.code}
                href={`/countries/${country.code}`}
                className="group bg-[#1c1d21] border border-gray-700/50 rounded-xl p-6 text-center hover:border-white/30 hover:bg-[#2a2c35] transition-all duration-300"
              >
                <div className="w-12 h-12 mx-auto mb-3 bg-[#292a30] rounded-full flex items-center justify-center border border-gray-700/50 group-hover:border-white/30 transition-colors">
                  <span className="text-sm font-bold text-gray-300 uppercase">
                    {country.code}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">
                  {country.name}
                </h3>
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
            Book your premium chauffeur service in any of our 50+ countries and experience the difference.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-[#292a30] px-8 py-3 text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
          >
            {dict.countries.cta.button}
          </Link>
        </div>
      </section>

    </main>
  );
}
