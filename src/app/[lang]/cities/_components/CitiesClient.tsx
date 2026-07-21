"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Dictionary } from "@/app/[lang]/dictionaries";

const citiesByCountry: { country: string; code: string; cities: { name: string; image: string }[] }[] = [
  {
    country: "Australia",
    code: "au",
    cities: [
      { name: "Sydney", image: "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?q=80&w=1633&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Melbourne", image: "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=400&h=300&fit=crop" },
      { name: "Brisbane", image: "https://images.unsplash.com/photo-1548661625-a30d197ce439?q=80&w=1033&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Perth", image: "https://images.unsplash.com/photo-1580014942344-ce423d2b885a?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  },
  {
    country: "Austria",
    code: "at",
    cities: [
      { name: "Vienna", image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Salzburg", image: "https://images.unsplash.com/photo-1603892710963-331039c8dc66?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  },
  {
    country: "Belgium",
    code: "be",
    cities: [
      { name: "Brussels", image: "https://images.unsplash.com/photo-1626013969117-8c13864fdb2d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  },
  {
    country: "Canada",
    code: "ca",
    cities: [
      { name: "Toronto", image: "https://images.unsplash.com/photo-1490623970972-ae8bb3da443e?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Vancouver", image: "https://images.unsplash.com/photo-1730661906876-18bfc6e95f2f?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Montreal", image: "https://images.unsplash.com/photo-1519178251-5390a0fb6a3f?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Calgary", image: "https://images.unsplash.com/photo-1563772770586-c4edcb11e75d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  },
  {
    country: "France",
    code: "fr",
    cities: [
      { name: "Paris", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop" },
      { name: "Lyon", image: "https://images.unsplash.com/photo-1697054601740-dfa28d40c76e?q=80&w=775&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Nice", image: "https://images.unsplash.com/photo-1643914729809-4aa59fdc4c17?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Marseille", image: "https://images.unsplash.com/photo-1566838217578-1903568a76d9?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Bordeaux", image: "https://images.unsplash.com/photo-1509636902752-929c7497f3d4?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Cannes", image: "https://images.unsplash.com/photo-1659642081573-ac1a040d2e50?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  },
  {
    country: "Germany",
    code: "de",
    cities: [
      { name: "Berlin", image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Munich", image: "https://images.unsplash.com/photo-1595576663498-fdd3d56d5a50?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Frankfurt", image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Hamburg", image: "https://images.unsplash.com/photo-1561128031-95f28b66ed93?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Cologne", image: "https://images.unsplash.com/photo-1584479898061-15742e14f50d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Dusseldorf", image: "https://images.unsplash.com/photo-1610105176331-5706d0fc4a83?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Stuttgart", image: "https://images.unsplash.com/photo-1614247108729-3e5a48e06e9b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  },
  {
    country: "Italy",
    code: "it",
    cities: [
      { name: "Rome", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=300&fit=crop" },
      { name: "Milan", image: "https://images.unsplash.com/photo-1520440229-6469a149ac59?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Florence", image: "https://images.unsplash.com/photo-1543429776-2782f8f3e2b0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Venice", image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Naples", image: "https://images.unsplash.com/photo-1534113414509-0eec2bfb493f?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  },
  {
    country: "Japan",
    code: "jp",
    cities: [
      { name: "Tokyo", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop" },
      { name: "Osaka", image: "https://images.unsplash.com/photo-1590559899731-a382839e5549?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  },
  {
    country: "Netherlands",
    code: "nl",
    cities: [
      { name: "Amsterdam", image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  },
  {
    country: "Qatar",
    code: "qa",
    cities: [
      { name: "Doha", image: "https://images.unsplash.com/photo-1700901742651-6b353164caf3?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  },
  {
    country: "Saudi Arabia",
    code: "sa",
    cities: [
      { name: "Riyadh", image: "https://images.unsplash.com/photo-1663900108404-a05e8bf82cda?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Jeddah", image: "https://images.unsplash.com/photo-1578895102346-7e342c3f3b50?w=400&h=300&fit=crop" },
      { name: "Mecca", image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=400&h=300&fit=crop" },
    ],
  },
  {
    country: "Singapore",
    code: "sg",
    cities: [
      { name: "Singapore", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=300&fit=crop" },
    ],
  },
  {
    country: "Spain",
    code: "es",
    cities: [
      { name: "Barcelona", image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=300&fit=crop" },
      { name: "Madrid", image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Malaga", image: "https://images.unsplash.com/photo-1585204394783-501ae8f640d4?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  },
  {
    country: "Switzerland",
    code: "ch",
    cities: [
      { name: "Zurich", image: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Geneva", image: "https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Basel", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  },
  {
    country: "UAE",
    code: "ae",
    cities: [
      { name: "Dubai", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop" },
      { name: "Abu Dhabi", image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&h=300&fit=crop" },
    ],
  },
  {
    country: "UK",
    code: "uk",
    cities: [
      { name: "London", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop" },
      { name: "Manchester", image: "https://images.unsplash.com/photo-1515586838455-8f8f940d6853?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Birmingham", image: "https://images.unsplash.com/photo-1580894742597-87bc878ddb3d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Edinburgh", image: "https://images.unsplash.com/photo-1506377585622-bedcbb027afc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Glasgow", image: "https://images.unsplash.com/photo-1549038425-00b82fbe47a9?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Bristol", image: "https://images.unsplash.com/photo-1567600794774-b6c3e63e0034?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Leeds", image: "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Liverpool", image: "https://images.unsplash.com/photo-1560507074-b04488e0b80e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  },
  {
    country: "US",
    code: "us",
    cities: [
      { name: "New York", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop" },
      { name: "Los Angeles", image: "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=400&h=300&fit=crop" },
      { name: "Miami", image: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=400&h=300&fit=crop" },
      { name: "Chicago", image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=400&h=300&fit=crop" },
      { name: "San Francisco", image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop" },
      { name: "Boston", image: "https://images.unsplash.com/photo-1501979376754-2ff867a4f659?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Seattle", image: "https://images.unsplash.com/photo-1502175353174-a7a70e73b362?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Dallas", image: "https://images.unsplash.com/photo-1545194445-dddb8f4487c6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Houston", image: "https://images.unsplash.com/photo-1530089711124-9ca31fb9e863?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Washington DC", image: "https://images.unsplash.com/photo-1617581629397-a7250d77c223?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
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
