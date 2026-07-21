"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const countries = [
  { name: "Argentina", code: "ar", image: "https://images.unsplash.com/photo-1495317823589-e67efe1524b0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Australia", code: "au", image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=400&h=300&fit=crop" },
  { name: "Austria", code: "at", image: "https://images.unsplash.com/photo-1526581671404-349f224db79b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Bahrain", code: "bh", image: "https://images.unsplash.com/photo-1548755212-2b46ee259868?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Belgium", code: "be", image: "https://images.unsplash.com/photo-1626013969117-8c13864fdb2d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Brazil", code: "br", image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400&h=300&fit=crop" },
  { name: "Cambodia", code: "kh", image: "https://images.unsplash.com/photo-1635167463041-00f6d9344cda?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Canada", code: "ca", image: "https://images.unsplash.com/photo-1490623970972-ae8bb3da443e?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Chile", code: "cl", image: "https://images.unsplash.com/photo-1689850543263-01a52ccc6943?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "China", code: "cn", image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400&h=300&fit=crop" },
  { name: "Croatia", code: "hr", image: "https://images.unsplash.com/photo-1575540291670-8d3b26f7d327?q=80&w=939&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Czechia", code: "cz", image: "https://images.unsplash.com/photo-1600623471616-8c1966c91ff6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Denmark", code: "dk", image: "https://images.unsplash.com/photo-1513622118278-bc041b3c13ed?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Finland", code: "fi", image: "https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "France", code: "fr", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop" },
  { name: "Germany", code: "de", image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Greece", code: "gr", image: "https://images.unsplash.com/photo-1580502304784-8985b7eb7260?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Hungary", code: "hu", image: "https://images.unsplash.com/photo-1616432902940-b7a1acbc60b3?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Indonesia", code: "id", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop" },
  { name: "Ireland", code: "ie", image: "https://images.unsplash.com/photo-1611087642788-e41c41f5680b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Italy", code: "it", image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&h=300&fit=crop" },
  { name: "Japan", code: "jp", image: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Jordan", code: "jo", image: "https://images.unsplash.com/photo-1597814419713-99e2923951b6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Kenya", code: "ke", image: "https://images.unsplash.com/photo-1519659528534-7fd733a832a0?q=80&w=726&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Kuwait", code: "kw", image: "https://images.unsplash.com/photo-1621647017805-7d08d0a38c8a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Luxembourg", code: "lu", image: "https://images.unsplash.com/photo-1592770733110-738f7769188c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Malaysia", code: "my", image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=864&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Mexico", code: "mx", image: "https://images.unsplash.com/photo-1547686669-9a8cb1a22d91?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Monaco", code: "mc", image: "https://images.unsplash.com/photo-1595138320174-a64d168e9970?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Netherlands", code: "nl", image: "https://images.unsplash.com/photo-1547750341-26482cf3a2ac?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "New Zealand", code: "nz", image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Norway", code: "no", image: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Oman", code: "om", image: "https://images.unsplash.com/photo-1699855803432-17f4ab468b2d?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Poland", code: "pl", image: "https://images.unsplash.com/photo-1519197924294-4ba991a11128?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Portugal", code: "pt", image: "https://images.unsplash.com/photo-1569959220744-ff553533f492?q=80&w=864&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Qatar", code: "qa", image: "https://images.unsplash.com/photo-1647252262017-582a7dbb73d0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Romania", code: "ro", image: "https://images.unsplash.com/photo-1534371020656-6b85825f2b1a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Saudi Arabia", code: "sa", image: "https://images.unsplash.com/photo-1694018359679-49465b4c0d61?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Singapore", code: "sg", image: "https://images.unsplash.com/photo-1542114740389-9b46fb1e5be7?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Slovakia", code: "sk", image: "https://images.unsplash.com/photo-1620283110809-3ff3adfe057b?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "South Africa", code: "za", image: "https://images.unsplash.com/photo-1484318571209-661cf29a69c3?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Spain", code: "es", image: "https://images.unsplash.com/photo-1543785734-4b6e564642f8?w=400&h=300&fit=crop" },
  { name: "Sweden", code: "se", image: "https://images.unsplash.com/photo-1633430300352-bcb3420c0ed5?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Switzerland", code: "ch", image: "https://images.unsplash.com/photo-1570161766218-f8488ebb8078?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Thailand", code: "th", image: "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Tunisia", code: "tn", image: "https://images.unsplash.com/photo-1556901600-3e1be0aa443e?q=80&w=1052&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Türkiye", code: "tr", image: "https://images.unsplash.com/photo-1691446930608-98466a4bdd0f?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "UAE", code: "ae", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop" },
  { name: "UK", code: "uk", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop" },
  { name: "US", code: "us", image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=400&h=300&fit=crop" },
  { name: "Vietnam", code: "vn", image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
].sort((a, b) => a.name.localeCompare(b.name));

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Global availability",
    description: "Our luxury chauffeur service is available in over 50 countries across 6 continents, ensuring you have access to premium transportation wherever you travel.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Unrivaled flexibility",
    description: "Book your ride anytime, anywhere. With 24/7 availability and real-time booking, adapt your travel plans on the fly with complete peace of mind.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Competitive rates",
    description: "Enjoy transparent, fixed pricing with no hidden fees. Our rates are competitive across all markets, giving you exceptional value for premium service.",
  },
];

export default function CountriesPage() {
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
            Blacklane Global Availability
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Luxury chauffeur service across 50+ countries worldwide
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-[#292a30] px-8 py-3 text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
          >
            Book Now
          </Link>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-8 py-6">
        <nav className="text-sm text-gray-400">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">Countries</span>
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
            placeholder="Search countries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1c1d21] border border-gray-700/50 rounded-full pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white/50 transition-colors"
          />
        </div>
      </section>

      {/* Feature Cards */}
      <section className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-[#1c1d21] p-8 rounded-2xl hover:bg-[#2a2c35] transition-colors"
            >
              <div className="text-gray-400 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {filteredCountries.map((country) => (
              <Link
                key={country.code}
                href={`/countries/${country.code}`}
                className="group relative bg-[#1c1d21] border border-gray-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-gray-600 transition-all duration-300 overflow-hidden min-h-[160px]"
              >
                {/* Background Image with Dark Overlay */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={country.image}
                    alt={country.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-40 group-hover:opacity-50"
                  />
                  <div className="absolute inset-0 bg-[#1c1d21]/5 backdrop-blur-[1px]" />
                </div>

                {/* Card Content */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border border-gray-600/60 bg-[#292a30]/80 flex items-center justify-center text-xs font-bold text-gray-200 tracking-wider mb-3 group-hover:border-white transition-colors">
                    {country.code.toUpperCase()}
                  </div>
                  <h3 className="text-base font-medium text-gray-200 group-hover:text-white transition-colors">
                    {country.name}
                  </h3>
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
            Ready to travel in luxury?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Book your premium chauffeur service in any of our 50+ countries and experience the difference.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-[#292a30] px-8 py-3 text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
          >
            Book Your Ride
          </Link>
        </div>
      </section>
    </main>
  );
}