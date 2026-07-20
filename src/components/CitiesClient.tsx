"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Dictionary } from "@/app/[lang]/dictionaries";

const citiesByCountry: { country: string; code: string; cities: string[] }[] = [
  {
    country: "Australia",
    code: "au",
    cities: ["Sydney", "Melbourne", "Brisbane", "Perth"],
  },
  {
    country: "Austria",
    code: "at",
    cities: ["Vienna", "Salzburg"],
  },
  {
    country: "Belgium",
    code: "be",
    cities: ["Brussels"],
  },
  {
    country: "Canada",
    code: "ca",
    cities: ["Toronto", "Vancouver", "Montreal", "Calgary"],
  },
  {
    country: "France",
    code: "fr",
    cities: ["Paris", "Lyon", "Nice", "Marseille", "Bordeaux", "Cannes"],
  },
  {
    country: "Germany",
    code: "de",
    cities: ["Berlin", "Munich", "Frankfurt", "Hamburg", "Cologne", "Dusseldorf", "Stuttgart"],
  },
  {
    country: "Italy",
    code: "it",
    cities: ["Rome", "Milan", "Florence", "Venice", "Naples"],
  },
  {
    country: "Japan",
    code: "jp",
    cities: ["Tokyo", "Osaka"],
  },
  {
    country: "Netherlands",
    code: "nl",
    cities: ["Amsterdam"],
  },
  {
    country: "Qatar",
    code: "qa",
    cities: ["Doha"],
  },
  {
    country: "Saudi Arabia",
    code: "sa",
    cities: ["Riyadh", "Jeddah", "Mecca"],
  },
  {
    country: "Singapore",
    code: "sg",
    cities: ["Singapore"],
  },
  {
    country: "Spain",
    code: "es",
    cities: ["Barcelona", "Madrid", "Malaga"],
  },
  {
    country: "Switzerland",
    code: "ch",
    cities: ["Zurich", "Geneva", "Basel"],
  },
  {
    country: "UAE",
    code: "ae",
    cities: ["Dubai", "Abu Dhabi"],
  },
  {
    country: "UK",
    code: "uk",
    cities: ["London", "Manchester", "Birmingham", "Edinburgh", "Glasgow", "Bristol", "Leeds", "Liverpool"],
  },
  {
    country: "US",
    code: "us",
    cities: ["New York", "Los Angeles", "Miami", "Chicago", "San Francisco", "Boston", "Seattle", "Dallas", "Houston", "Washington DC"],
  },
].sort((a, b) => a.country.localeCompare(b.country));

function cityToSlug(city: string): string {
  return city.toLowerCase().replace(/\s+/g, "-");
}

export default function CitiesClient({ dict }: { dict: Dictionary }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCountries = citiesByCountry
    .map((country) => ({
      ...country,
      cities: country.cities.filter((city) =>
        city.toLowerCase().includes(searchQuery.toLowerCase())
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
            href="/"
            className="inline-block bg-white text-[#292a30] px-8 py-3 text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
          >
            {dict.cities.bookNow}
          </Link>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-8 py-6">
        <nav className="text-sm text-gray-400">
          <Link href="/" className="hover:text-white transition-colors">
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
                    {country.cities.length} {country.cities.length === 1 ? "city" : "cities"}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {country.cities.map((city) => (
                    <Link
                      key={city}
                      href={`/countries/${country.code}/${cityToSlug(city)}/airport-transfer`}
                      className="group bg-[#1c1d21] border border-gray-700/50 rounded-xl p-5 text-center hover:border-white/30 hover:bg-[#2a2c35] transition-all duration-300"
                    >
                      <div className="w-10 h-10 mx-auto mb-3 bg-[#292a30] rounded-full flex items-center justify-center border border-gray-700/50 group-hover:border-white/30 transition-colors">
                        <svg
                          className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <h4 className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">
                        {city}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1 group-hover:text-gray-400 transition-colors">
                        {dict.cities.airportTransfer}
                      </p>
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
            We&apos;re constantly expanding our network. Contact us to request service in a new city, or browse our available countries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/countries"
              className="inline-block bg-white text-[#292a30] px-8 py-3 text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
            >
              {dict.cities.cta.viewCountries}
            </Link>
            <Link
              href="/"
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
