"use client";

import { useState } from "react";
import Link from "next/link";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { type Locale } from "@/app/[lang]/dictionaries";
import { locationsUrl } from "@/lib/locations";
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
    { label: dd.services.airportTransfers, href: locationsUrl(lang) },
    { label: dd.services.cityTransfers, href: `/${lang}/city-to-city` },
    { label: dd.services.intercityTransfers, href: `/${lang}/city-to-city` },
    { label: dd.services.limousineServices, href: `/${lang}/limousine-service` },
    { label: dd.services.busCharter, href: "#" },
    { label: dd.services.miniBusCharter, href: "#" },
    { label: dd.services.coachCharter, href: "#" },
    { label: dd.services.airportCoachTransfers, href: locationsUrl(lang) },
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

  const ourSolutionSections = [
    { id: "tourism", label: nav.tourismMobility, items: tourismLinks },
    { id: "corporate", label: nav.corporateMobility, items: corporateLinks },
    { id: "events", label: nav.eventsMobility, items: eventsLinks },
  ];

  const dropdownSections: { id: string; label: string; items: { label: string; href: string }[] }[] = [
    { id: "services", label: nav.ourServices, items: serviceLinks },
    { id: "industry", label: nav.mobilityByIndustry, items: industryLinks },
  ];

  const isSolutionsOpen = openDropdown === "solutions" || openDropdown?.startsWith("solution-");

  const toggleDropdown = (id: string) => {
    if (id === "solutions") {
      if (isSolutionsOpen) {
        setOpenDropdown(null);
      } else {
        setOpenDropdown("solutions");
      }
      return;
    }
    if (id.startsWith("solution-")) {
      setOpenDropdown(openDropdown === id ? "solutions" : id);
      return;
    }
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
    <div className="flex items-center gap-3">
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
            {/* Home link */}
            <Link
              href={`/${lang}`}
              onClick={() => setIsOpen(false)}
              className="text-white text-lg font-semibold py-3 border-b border-gray-700"
            >
              {nav.home}
            </Link>

            {/* Our Solution - nested accordion */}
            <div className="border-b border-gray-700">
              <button
                onClick={() => toggleDropdown("solutions")}
                className="flex items-center justify-between w-full text-left text-white text-lg font-semibold py-3 cursor-pointer"
              >
                {nav.ourSolution}
                <svg
                  className={`w-5 h-5 transition-transform ${openDropdown === "solutions" ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isSolutionsOpen && (
                <div className="pl-4 pb-2">
                  {ourSolutionSections.map((section) => (
                    <div key={section.id}>
                      <button
                        onClick={() => toggleDropdown(`solution-${section.id}`)}
                        className="flex items-center justify-between w-full text-left text-gray-200 text-base font-semibold py-2.5 cursor-pointer"
                      >
                        {section.label}
                        <svg
                          className={`w-4 h-4 transition-transform ${openDropdown === `solution-${section.id}` ? "rotate-180" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {openDropdown === `solution-${section.id}` && (
                        <div className="pl-4 pb-1">
                          {section.items.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className="block py-2 text-gray-400 hover:text-white transition-colors text-sm"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Dropdown sections */}
            {dropdownSections.map((section) => (
              <div key={section.id}>
                <button
                  onClick={() => toggleDropdown(section.id)}
                  className="flex items-center justify-between w-full text-left text-white text-lg font-semibold py-3 border-b border-gray-700 cursor-pointer"
                >
                  {section.label}
                  <svg
                    className={`w-5 h-5 transition-transform ${openDropdown === section.id ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openDropdown === section.id && (
                  <div className="pl-4 pb-2">
                    {section.items.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block py-2.5 text-gray-300 hover:text-white transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Help link */}
            <Link
              href={`/${lang}/about`}
              onClick={() => setIsOpen(false)}
              className="text-white text-lg font-semibold py-3 border-b border-gray-700"
            >
              {nav.help}
            </Link>

            {/* Technology link */}
            <div className="border-b border-gray-700">
              <button
                onClick={() => toggleDropdown("technology")}
                className="flex items-center justify-between w-full text-left text-white text-lg font-semibold py-3 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                  {nav.technology}
                </span>
                <svg
                  className={`w-5 h-5 transition-transform ${openDropdown === "technology" ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === "technology" && (
                <div className="pl-4 pb-2">
                  {technologyLinks.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block py-2.5 text-gray-300 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

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
