"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { localeBase, localeHome } from "@/app/[lang]/dictionaries";
import type { Country, City } from "@/lib/locations";
import { cityUrl } from "@/lib/locations";
import { getCountryImage } from "@/lib/countryImages";
import { getCityImage } from "@/lib/cityImages";

interface CityEntry {
  country: Country;
  city: City;
}

export default function CitiesClient({ dict, lang, cities: allCitiesList }: { dict: Dictionary; lang: string; cities: CityEntry[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCountry, setFilteredCountry] = useState<Country | null>(null);

  const countries: Country[] = [];
  for (const { country } of allCitiesList) {
    if (!countries.some((c) => c.code === country.code)) countries.push(country);
  }

  const cities = allCitiesList.filter(({ country, city }) => {
    if (filteredCountry && country.code !== filteredCountry.code) return false;
    return city.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <main className="min-h-screen bg-[#292a30] text-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920&h=800&fit=crop"
          alt="All Cities"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#292a30]" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white">
            {dict.countries.hero.heading}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Luxury chauffeur service across {cities.length} cities worldwide
          </p>
          <Link
            href={`${localeHome(lang)}`}
            className="inline-block bg-white text-[#292a30] px-8 py-3 text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
          >
            {dict.countries.bookNow}
          </Link>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-8 py-6">
        <nav className="text-sm text-gray-400">
          <Link href={`${localeHome(lang)}`} className="hover:text-white transition-colors">
            {dict.countries.breadcrumb.home}
          </Link>
          <span className="mx-2">/</span>
          <Link href={`${localeBase(lang)}/locations/countries`} className="hover:text-white transition-colors">
            {dict.countries.breadcrumb.countries}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">Cities</span>
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

      {/* Countries Filter Tabs For Cities */}
      <section className="max-w-7xl mx-auto px-8 py-8">
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setFilteredCountry(null)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              filteredCountry === null
                ? "bg-white text-[#292a30]"
                : "bg-[#1c1d21] text-gray-400 hover:bg-gray-600"
            }`}
          >
            {dict.countries.filter.all}
          </button>
          {countries.map((country) => (
            <button
              key={country.code}
              onClick={() => setFilteredCountry(country)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                filteredCountry?.code === country.code
                  ? "bg-white text-[#292a30]"
                  : "bg-[#1c1d21] text-gray-400 hover:bg-gray-600"
              }`}
            >
              {country.name}
            </button>
          ))}
        </div>
      </section>

      {/* Cities Grid */}
      <section className="max-w-7xl mx-auto px-8 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          All Cities
        </h2>
        <p className="text-gray-400 mb-12">
          Explore our luxury chauffeur services across {cities.length} cities worldwide
        </p>

        {cities.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">{dict.countries.noResults.replace("{query}", searchQuery)}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {cities.map(({ country, city }) => (
              <Link
                key={`${country.code}-${city.slug}`}
                href={cityUrl(lang, country, city)}
                className="group bg-[#1c1d21] border border-gray-700/50 rounded-xl overflow-hidden hover:border-white/30 hover:bg-[#2a2c35] transition-all duration-300"
              >
                <div className="relative h-32 overflow-hidden">
                  <Image
                    src={getCityImage(city.slug) ?? getCountryImage(country.code)}
                    alt={city.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">
                    {city.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {country.name}
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
            href={`${localeHome(lang)}`}
            className="inline-block bg-white text-[#292a30] px-8 py-3 text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
          >
            {dict.countries.cta.button}
          </Link>
        </div>
      </section>
    </main>
  );
}
