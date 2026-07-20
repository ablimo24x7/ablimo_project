"use client";

import { useState } from "react";
import Link from "next/link";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { type Locale } from "@/app/[lang]/dictionaries";
import NavDropdown from "./NavDropdown";
import LanguageSwitcher from "./LanguageSwitcher";

interface DesktopNavProps {
  dict: Dictionary;
  lang: Locale;
}

export default function DesktopNav({ dict, lang }: DesktopNavProps) {
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
    <nav className="hidden lg:flex items-center gap-1">
      <NavDropdown
        id="services"
        label={nav.ourServices}
        items={serviceLinks}
        isOpen={openDropdown === "services"}
        onToggle={() => setOpenDropdown(openDropdown === "services" ? null : "services")}
        onClose={() => setOpenDropdown(null)}
      />
      <NavDropdown
        id="business"
        label={nav.forBusiness}
        items={businessLinks}
        isOpen={openDropdown === "business"}
        onToggle={() => setOpenDropdown(openDropdown === "business" ? null : "business")}
        onClose={() => setOpenDropdown(null)}
      />

      <Link
        href={`/${lang}/partners`}
        className="text-xs font-semibold tracking-[0.1em] text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
      >
        {nav.forChauffeurs}
      </Link>

      <Link
        href={`/${lang}/about`}
        className="text-xs font-semibold tracking-[0.1em] text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
      >
        {nav.help}
      </Link>

      <LanguageSwitcher
        currentLang={lang}
        isOpen={openDropdown === "lang"}
        onToggle={() => setOpenDropdown(openDropdown === "lang" ? null : "lang")}
        onClose={() => setOpenDropdown(null)}
      />

      {/* Sign in button */}
      <button className="flex items-center gap-2 text-xs font-semibold tracking-[0.1em] text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full transition-all cursor-pointer">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
        {nav.signIn}
      </button>

      {/* Book now button */}
      <Link
        href={`/${lang}`}
        className="text-xs font-semibold tracking-[0.1em] text-[#292a30] bg-white hover:bg-gray-100 px-5 py-2 rounded-full transition-all"
      >
        {nav.bookNow}
      </Link>
    </nav>
  );
}
