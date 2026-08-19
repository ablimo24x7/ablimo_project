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

  const technologyLinks = [
    { label: dd.technology.corporateLogin, href: "#" },
    { label: dd.technology.affiliateLogin, href: "#" },
    { label: dd.technology.chauffeurPortal, href: "#" },
    { label: dd.technology.fleetPortal, href: "#" },
    { label: dd.technology.customerPortal, href: "#" },
  ];

  const serviceLinks = [
    { label: dd.services.executiveChauffeur, href: `/${lang}/chauffeur-service` },
    { label: dd.services.chauffeurHailing, href: `/${lang}/chauffeur-service` },
    { label: dd.services.hourlyChauffeur, href: `/${lang}/car-service` },
    { label: dd.services.airportTransfers, href: `/${lang}/airport-transfer` },
    { label: dd.services.cityTransfers, href: `/${lang}/city-to-city` },
    { label: dd.services.intercityTransfers, href: `/${lang}/city-to-city` },
    { label: dd.services.limousineServices, href: `/${lang}/limousine-service` },
    { label: dd.services.busCharter, href: "#" },
    { label: dd.services.miniBusCharter, href: "#" },
    { label: dd.services.coachCharter, href: "#" },
    { label: dd.services.airportCoachTransfers, href: `/${lang}/airport-transfer` },
  ];

  const tourismLinks = [
    { label: dd.tourism.tourismDmc, href: "#" },
    { label: dd.tourism.hospitality, href: "#" },
    { label: dd.tourism.roadshows, href: "#" },
    { label: dd.tourism.pilgrimage, href: "#" },
    { label: dd.tourism.tourismTransport, href: "#" },
    { label: dd.tourism.mice, href: "#" },
    { label: dd.tourism.hotelShuttle, href: "#" },
  ];

  const corporateLinks = [
    { label: dd.corporate.overview, href: `/${lang}/business` },
    { label: dd.corporate.eventMice, href: "#" },
    { label: dd.corporate.vipChauffeur, href: "#" },
    { label: dd.corporate.cityToCity, href: `/${lang}/city-to-city` },
    { label: dd.corporate.corporateShuttle, href: "#" },
    { label: dd.corporate.staffTransport, href: "#" },
    { label: dd.corporate.schoolTransport, href: "#" },
    { label: dd.corporate.universityTransport, href: "#" },
    { label: dd.corporate.financialRoadshows, href: "#" },
  ];

  const eventsLinks = [
    { label: dd.events.eventTransport, href: "#" },
    { label: dd.events.exhibition, href: "#" },
    { label: dd.events.conference, href: "#" },
    { label: dd.events.sportsTeam, href: "#" },
    { label: dd.events.artists, href: "#" },
    { label: dd.events.crew, href: "#" },
    { label: dd.events.vipDelegation, href: "#" },
  ];

  const ourSolutionGroups = [
    { title: nav.tourismMobility, items: tourismLinks },
    { title: nav.corporateMobility, items: corporateLinks },
    { title: nav.eventsMobility, items: eventsLinks },
  ];

  const industryLinks = [
    { label: dd.industry.government, href: "#" },
    { label: dd.industry.embassy, href: "#" },
    { label: dd.industry.aviation, href: "#" },
    { label: dd.industry.workforce, href: "#" },
    { label: dd.industry.energy, href: "#" },
    { label: dd.industry.construction, href: "#" },
    { label: dd.industry.industrial, href: "#" },
    { label: dd.industry.sportsEntertainment, href: "#" },
    { label: dd.industry.pilgrimage, href: "#" },
    { label: dd.industry.healthcare, href: "#" },
    { label: dd.industry.education, href: "#" },
    { label: dd.industry.retail, href: "#" },
    { label: dd.industry.mediaProduction, href: "#" },
    { label: dd.industry.marine, href: "#" },
    { label: dd.industry.mining, href: "#" },
    { label: dd.industry.technology, href: "#" },
    { label: dd.industry.ngo, href: "#" },
    { label: dd.industry.realEstate, href: "#" },
    { label: dd.industry.luxuryVip, href: "#" },
    { label: dd.industry.mediaEntertainment, href: "#" },
    { label: dd.industry.medical, href: "#" },
    { label: dd.industry.oilGas, href: "#" },
    { label: dd.industry.miningStaff, href: "#" },
    { label: dd.industry.constructionStaff, href: "#" },
  ];

  return (
    <>
      {/* Section 1: Top Bar */}
      <div className="flex items-center justify-between px-8 md:px-12 py-3">
        <Link
          href={`/${lang}`}
          className="text-2xl font-light tracking-wide text-gray-200"
        >
          {dict.header.logo}
        </Link>

        <div className="flex items-center gap-1">
          <Link
            href={`/${lang}/about`}
            className="text-xs md:text-sm font-semibold tracking-[0.1em] text-gray-200 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
          >
            {nav.help}
          </Link>

          <LanguageSwitcher
            currentLang={lang}
            isOpen={openDropdown === "lang"}
            onToggle={() => setOpenDropdown(openDropdown === "lang" ? null : "lang")}
            onClose={() => setOpenDropdown(null)}
          />

          <NavDropdown
            id="technology"
            label={nav.technology}
            items={technologyLinks}
            isOpen={openDropdown === "technology"}
            onToggle={() => setOpenDropdown(openDropdown === "technology" ? null : "technology")}
            onClose={() => setOpenDropdown(null)}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </NavDropdown>

          <Link
            href={`/${lang}`}
            className="text-xs font-semibold tracking-[0.1em] text-[#292a30] bg-white hover:bg-gray-100 px-5 py-2 rounded-full transition-all ml-2"
          >
            {nav.bookNow}
          </Link>
        </div>
      </div>

      {/* Section 2: Main Navigation */}
      <nav className="flex items-center justify-end gap-0.5 px-8 md:px-12 py-2">
        <Link
          href={`/${lang}`}
          className="text-xs md:text-sm font-semibold tracking-[0.1em] text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
        >
          {nav.home}
        </Link>

        <NavDropdown
          id="services"
          label={nav.ourServices}
          items={serviceLinks}
          isOpen={openDropdown === "services"}
          onToggle={() => setOpenDropdown(openDropdown === "services" ? null : "services")}
          onClose={() => setOpenDropdown(null)}
        />

        <NavDropdown
          id="solutions"
          label={nav.ourSolution}
          groups={ourSolutionGroups}
          isOpen={openDropdown === "solutions"}
          onToggle={() => setOpenDropdown(openDropdown === "solutions" ? null : "solutions")}
          onClose={() => setOpenDropdown(null)}
        />

        <NavDropdown
          id="industry"
          label={nav.mobilityByIndustry}
          items={industryLinks}
          isOpen={openDropdown === "industry"}
          onToggle={() => setOpenDropdown(openDropdown === "industry" ? null : "industry")}
          onClose={() => setOpenDropdown(null)}
          alignRight
        />
      </nav>
    </>
  );
}
