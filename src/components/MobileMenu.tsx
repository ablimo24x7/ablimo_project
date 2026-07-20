"use client";

import { useState } from "react";
import Link from "next/link";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { type Locale } from "@/app/[lang]/dictionaries";
import LanguageSwitcher from "./LanguageSwitcher";

interface MobileMenuProps {
  dict: Dictionary;
  lang: Locale;
}

export default function MobileMenu({ dict, lang }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const nav = dict.header.nav;
  const dd = dict.header.dropdowns;

  const serviceLinks = [
    { label: dd.services.cityToCity, href: `/${lang}/city-to-city` },
    { label: dd.services.chauffeurHailing, href: `/${lang}/chauffeur-service` },
    { label: dd.services.airportTransfer, href: `/${lang}/airport-transfer` },
    { label: dd.services.hourlyHire, href: `/${lang}/car-service` },
    { label: dd.services.chauffeurService, href: `/${lang}/chauffeur-service` },
    { label: dd.services.limousineService, href: `/${lang}/limousine-service` },
  ];

  const businessLinks = [
    { label: dd.business.overview, href: `/${lang}/business` },
    { label: dd.business.corporations, href: `/${lang}/corporations` },
    { label: dd.business.travelAgencies, href: `/${lang}/travel-agencies` },
    { label: dd.business.strategicPartnerships, href: `/${lang}/strategic-partnerships` },
  ];

  return (
    <div className="lg:hidden flex items-center gap-3">
      <LanguageSwitcher
        currentLang={lang}
        isOpen={openDropdown === "lang"}
        onToggle={() => setOpenDropdown(openDropdown === "lang" ? null : "lang")}
        onClose={() => setOpenDropdown(null)}
      />

      {/* Hamburger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white cursor-pointer p-1"
      >
        {isOpen ? (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-0 left-0 w-full h-full bg-[#292a30] z-50 overflow-y-auto">
          {/* Close button */}
          <div className="flex justify-between items-center px-6 py-5">
            <Link
              href={`/${lang}`}
              className="text-2xl font-light tracking-wide text-gray-200"
              onClick={() => setIsOpen(false)}
            >
              {dict.header.logo}
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white cursor-pointer p-1"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col px-6 py-4 gap-1">
            {/* Our services dropdown */}
            <div>
              <button
                onClick={() => setOpenDropdown(openDropdown === "services" ? null : "services")}
                className="flex items-center justify-between w-full text-left text-white text-lg font-semibold py-3 border-b border-gray-700 cursor-pointer"
              >
                {nav.ourServices}
                <svg
                  className={`w-5 h-5 transition-transform ${openDropdown === "services" ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === "services" && (
                <div className="pl-4 pb-2">
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block py-2.5 text-gray-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* For business dropdown */}
            <div>
              <button
                onClick={() => setOpenDropdown(openDropdown === "business" ? null : "business")}
                className="flex items-center justify-between w-full text-left text-white text-lg font-semibold py-3 border-b border-gray-700 cursor-pointer"
              >
                {nav.forBusiness}
                <svg
                  className={`w-5 h-5 transition-transform ${openDropdown === "business" ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === "business" && (
                <div className="pl-4 pb-2">
                  {businessLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block py-2.5 text-gray-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Direct links */}
            <Link
              href={`/${lang}/partners`}
              onClick={() => setIsOpen(false)}
              className="text-white text-lg font-semibold py-3 border-b border-gray-700"
            >
              {nav.forChauffeurs}
            </Link>

            <Link
              href={`/${lang}/about`}
              onClick={() => setIsOpen(false)}
              className="text-white text-lg font-semibold py-3 border-b border-gray-700"
            >
              {nav.help}
            </Link>

            {/* Sign in */}
            <button className="flex items-center gap-2 text-white text-lg font-semibold py-3 border-b border-gray-700 cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              {nav.signIn}
            </button>

            {/* Book now */}
            <Link
              href={`/${lang}`}
              onClick={() => setIsOpen(false)}
              className="mt-4 text-center text-[#292a30] bg-white hover:bg-gray-100 px-5 py-3 rounded-full text-lg font-semibold transition-all"
            >
              {nav.bookNow}
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
