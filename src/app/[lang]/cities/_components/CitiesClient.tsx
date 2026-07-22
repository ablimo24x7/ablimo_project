"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Dictionary } from "@/app/[lang]/dictionaries";

const citiesByCountry: { country: string; code: string; cities: { name: string; image: string }[] }[] = [
  {
    country: "Bahrain",
    code: "bh",
    cities: [
      { name: "Manama", image: "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=800&h=600&fit=crop" },
      { name: "Riffa", image: "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=800&h=600&fit=crop&q=80" },
      { name: "Muharraq", image: "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=800&h=600&fit=crop&q=81" },
    ],
  },
  {
    country: "Kuwait",
    code: "kw",
    cities: [
      { name: "Kuwait City", image: "https://images.unsplash.com/photo-1562979314-bee7453e911c?w=800&h=600&fit=crop" },
      { name: "Hawalli", image: "https://images.unsplash.com/photo-1562979314-bee7453e911c?w=800&h=600&fit=crop&q=80" },
      { name: "Farwaniya", image: "https://images.unsplash.com/photo-1562979314-bee7453e911c?w=800&h=600&fit=crop&q=81" },
    ],
  },
  {
    country: "Oman",
    code: "om",
    cities: [
      { name: "Muscat", image: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=800&h=600&fit=crop" },
      { name: "Salalah", image: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=800&h=600&fit=crop&q=80" },
      { name: "Sohar", image: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=800&h=600&fit=crop&q=81" },
    ],
  },
  {
    country: "Qatar",
    code: "qa",
    cities: [
      { name: "Doha", image: "https://images.unsplash.com/photo-1700901742651-6b353164caf3?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Al Khor", image: "https://images.unsplash.com/photo-1647252262017-582a7dbb73d0?w=800&h=600&fit=crop" },
      { name: "Lusail", image: "https://images.unsplash.com/photo-1647252262017-582a7dbb73d0?w=800&h=600&fit=crop" },
    ],
  },
  {
    country: "Saudi Arabia",
    code: "sa",
    cities: [
      { name: "Riyadh", image: "https://images.unsplash.com/photo-1663900108404-a05e8bf82cda?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Jeddah", image: "https://images.unsplash.com/photo-1663900108404-a05e8bf82cda?w=800&h=600&fit=crop" },
      { name: "Mecca", image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&h=600&fit=crop" },
      { name: "Medina", image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&h=600&fit=crop&q=80" },
      { name: "Dammam", image: "https://images.unsplash.com/photo-1562979314-bee7453e911c?w=800&h=600&fit=crop" },
    ],
  },
  {
    country: "UAE",
    code: "ae",
    cities: [
      { name: "Dubai", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop" },
      { name: "Abu Dhabi", image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&h=600&fit=crop" },
      { name: "Sharjah", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop&q=80" },
      { name: "Ajman", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop&q=81" },
      { name: "Ras Al Khaimah", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop&q=82" },
    ],
  },
].sort((a, b) => a.country.localeCompare(b.country));

function cityToSlug(city: string): string {
  return city.toLowerCase().replace(/\s+/g, "-");
}

export default function CitiesClient({ dict, lang }: { dict: Dictionary; lang: string }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCountries = citiesByCountry
    .map((country) => ({
      ...country,
      cities: country.cities.filter((city) =>
        city.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((country) => country.cities.length > 0);

  const totalCities = citiesByCountry.reduce(
    (acc, country) => acc + country.cities.length,
    0
  );

  return (
    <main className="min-h-screen bg-[#292a30] text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&h=800&fit=crop"
          alt="Our Cities Around the World"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#292a30]" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            {dict.cities.hero.heading}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            {dict.cities.hero.desc.replace("{count}", String(totalCities))}
          </p>
          <Link
            href={`/${lang}`}
            className="inline-block bg-white text-[#292a30] px-8 py-3 text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
          >
            {dict.cities.bookNow}
          </Link>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-8 py-6">
        <nav className="text-sm text-gray-400">
          <Link href={`/${lang}`} className="hover:text-white transition-colors">
            {dict.cities.breadcrumb.home}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">{dict.cities.breadcrumb.cities}</span>
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
            placeholder={dict.cities.search.placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1c1d21] border border-gray-700/50 rounded-full pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white/50 transition-colors"
          />
        </div>
      </section>

      {/* Cities by Country */}
      <section className="max-w-7xl mx-auto px-8 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {dict.cities.section.heading}
        </h2>
        <p className="text-gray-400 mb-12">
          {dict.cities.section.desc}
        </p>

        {filteredCountries.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">{dict.cities.noResults}</p>
          </div>
        ) : (
          <div className="space-y-12">
            {filteredCountries.map((country) => (
              <div key={country.code}>
                <div className="flex items-center gap-3 mb-6">
                  <h3 className="text-xl font-bold text-white">
                    {country.country}
                  </h3>
                  <span className="text-sm text-gray-500 font-medium">
                    {country.cities.length} {country.cities.length === 1 ? dict.common.city : dict.common.cities}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {country.cities.map((city) => (
                    <Link
                      key={city.name}
                      href={`/${lang}/countries/${country.code}/${cityToSlug(city.name)}/airport-transfer`}
                      className="group bg-[#1c1d21] border border-gray-700/50 rounded-xl overflow-hidden hover:border-white/30 hover:bg-[#2a2c35] transition-all duration-300"
                    >
                      <div className="relative h-32 overflow-hidden">
                        <Image
                          src={city.image}
                          alt={city.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <div className="p-4 text-center">
                        <h4 className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">
                          {city.name}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1 group-hover:text-gray-400 transition-colors">
                          {dict.cities.airportTransfer}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-[#1c1d21] py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {dict.cities.cta.heading}
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            {dict.cities.cta.desc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${lang}/countries`}
              className="inline-block bg-white text-[#292a30] px-8 py-3 text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
            >
              {dict.cities.cta.viewCountries}
            </Link>
            <Link
              href={`/${lang}`}
              className="inline-block border border-white text-white px-8 py-3 text-sm font-semibold rounded-full hover:bg-white hover:text-[#292a30] transition-colors"
            >
              {dict.cities.cta.contactUs}
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
