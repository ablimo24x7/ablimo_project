"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { localeHome } from "@/app/[lang]/dictionaries";

const years = ["2026", "2025", "2024", "2023"];

export default function PressReleasesClient({ dict, lang }: { dict: Dictionary; lang: string }) {
  const [visibleCount, setVisibleCount] = useState(3);
  const [selectedYear, setSelectedYear] = useState("2026");

  const tabs = [
    { name: dict.press.tabs.releases, href: "/press/releases", active: true },
  ];

  const filteredReleases = dict.press.releases.filter(
    (r) => r.date.includes(selectedYear)
  );

  const showMore = () => {
    setVisibleCount((prev) => Math.min(prev + 2, filteredReleases.length));
  };

  return (
    <main className="min-h-screen bg-[#292a30] text-white">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1920&q=80"
          alt="Press Releases"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#292a30]/80 via-[#292a30]/60 to-[#292a30]" />
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-300 mb-4">
            <Link href={`${localeHome(lang)}`} className="hover:text-white transition-colors">
              {dict.press.breadcrumb.home}
            </Link>
            <span>/</span>
            <span className="text-white">{dict.press.breadcrumb.press}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white">
            {dict.press.hero.heading}
          </h1>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-gray-700/50">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex gap-8">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                className={`py-4 text-sm font-semibold tracking-wide transition-colors border-b-2 ${
                  tab.active
                    ? "border-white text-white"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                {tab.name}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* Press Release List */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              {dict.press.latest.heading}
            </h2>
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => {
                  setSelectedYear(e.target.value);
                  setVisibleCount(3);
                }}
                className="appearance-none bg-[#35363c] border border-gray-600 rounded-lg px-4 py-2 pr-10 text-white text-sm focus:outline-none focus:border-gray-400 transition-colors cursor-pointer"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          <div className="space-y-6">
            {filteredReleases.slice(0, visibleCount).map((release, index) => (
              <article
                key={index}
                className="bg-[#35363c] rounded-xl overflow-hidden hover:scale-[1.01] transition-transform duration-300 group"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="relative w-full md:w-80 h-56 md:h-auto flex-shrink-0 overflow-hidden">
                    <Image
                      src={release.image}
                      alt={release.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 p-6 md:p-8">
                    <p className="text-gray-400 text-sm mb-3">{release.date}</p>
                    <h3 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-gray-300 transition-colors">
                      {release.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed mb-6">
                      {release.excerpt}
                    </p>
                    <Link
                      href="#"
                      className="inline-flex items-center text-sm font-semibold text-white hover:text-gray-300 transition-colors"
                    >
                      {dict.press.readMore}
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {visibleCount < filteredReleases.length && (
            <div className="text-center mt-12">
              <button
                onClick={showMore}
                className="border-2 border-white text-white px-8 py-3 text-sm font-semibold tracking-wider uppercase hover:bg-white hover:text-[#292a30] transition-all duration-300"
              >
                {dict.press.showMore}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Contact Press Office */}
      <section className="py-20 px-4 bg-[#1e1f24]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {dict.press.contact.heading}
          </h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
            {dict.press.contact.desc}
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#292a30] p-6 rounded-xl border border-gray-700/50">
              <div className="w-12 h-12 bg-[#35363c] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-5 h-5 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">{dict.press.contact.email}</h3>
              <p className="text-gray-400 text-sm">{dict.press.contact.emailValue}</p>
            </div>
            <div className="bg-[#292a30] p-6 rounded-xl border border-gray-700/50">
              <div className="w-12 h-12 bg-[#35363c] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-5 h-5 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">{dict.press.contact.phone}</h3>
              <p className="text-gray-400 text-sm">{dict.press.contact.phoneValue}</p>
            </div>
            <div className="bg-[#292a30] p-6 rounded-xl border border-gray-700/50">
              <div className="w-12 h-12 bg-[#35363c] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-5 h-5 text-gray-300"
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
              <h3 className="font-semibold mb-2">{dict.press.contact.location}</h3>
              <p className="text-gray-400 text-sm">{dict.press.contact.locationValue}</p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
