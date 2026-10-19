"use client";

import { useState } from "react";
import Link from "next/link";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { type Locale, localeBase, localeHome } from "@/app/[lang]/dictionaries";
import type { NavServiceItem } from "@/lib/services";
import HeaderSocialLinks from "./HeaderSocialLinks";
import LanguageSwitcher from "./LanguageSwitcher";

interface MobileMenuProps {
  dict: Dictionary;
  lang: Locale;
  dbServiceLinks: NavServiceItem[];
}

export default function MobileMenu({ dict, lang, dbServiceLinks }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const nav = dict.header.nav;
  const dd = dict.header.dropdowns;

  const technologyLinks = [
    { label: dd.technology.corporateLogin, href: "#" },
    { label: dd.technology.affiliateLogin, href: "#" },
    { label: dd.technology.chauffeurPortal, href: "#" },
    { label: dd.technology.fleetPortal, href: "#" },
    { label: dd.technology.chauffeurPartnerPortal, href: `${localeBase(lang)}/chauffeur-partner-portal` },
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
    { label: dd.corporate.overview, href: `${localeBase(lang)}/business` },
    { label: dd.corporate.eventMice, href: "#" },
    { label: dd.corporate.vipChauffeur, href: "#" },
    { label: dd.corporate.cityToCity, href: `${localeBase(lang)}/city-to-city` },
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
    { id: "services", label: nav.ourServices, items: dbServiceLinks },
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
        className="text-gray-300 hover:text-abBlue focus:outline-none cursor-pointer"
      >
        {isOpen ? (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <i className="fa-solid fa-bars text-2xl"></i>
        )}
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-0 left-0 w-full h-full bg-abBlack z-[99] overflow-y-auto">
          {/* Close button */}
          <div className="flex justify-between items-center px-6 py-5 border-b border-gray-800">
            <Link
              href={`${localeHome(lang)}`}
              className="text-white text-2xl font-bold tracking-widest uppercase"
              onClick={() => setIsOpen(false)}
            >
              {dict.header.logo}
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-abBlue cursor-pointer p-1"
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
              href={`${localeHome(lang)}`}
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-abBlue text-lg font-medium py-3 border-b border-gray-800 transition-colors"
            >
              {nav.home}
            </Link>

            {/* Our Solution - nested accordion */}
            <div className="border-b border-gray-800">
              <button
                onClick={() => toggleDropdown("solutions")}
                className="flex items-center justify-between w-full text-left text-gray-300 hover:text-abBlue text-lg font-medium py-3 cursor-pointer transition-colors"
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
                        className="flex items-center justify-between w-full text-left text-gray-400 hover:text-abBlue text-base font-medium py-2.5 cursor-pointer transition-colors"
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
                              className="block py-2 text-gray-500 hover:text-abBlue transition-colors text-sm"
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
              <div key={section.id} className="border-b border-gray-800">
                <button
                  onClick={() => toggleDropdown(section.id)}
                  className="flex items-center justify-between w-full text-left text-gray-300 hover:text-abBlue text-lg font-medium py-3 cursor-pointer transition-colors"
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
                        className="block py-2.5 text-gray-500 hover:text-abBlue transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Technology link */}
            <div className="border-b border-gray-800">
              <button
                onClick={() => toggleDropdown("technology")}
                className="flex items-center justify-between w-full text-left text-gray-300 hover:text-abBlue text-lg font-medium py-3 cursor-pointer transition-colors"
              >
                <span className="flex items-center gap-2">
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
                      className="block py-2.5 text-gray-500 hover:text-abBlue transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="mt-6 space-y-3">
              <HeaderSocialLinks className="justify-center" />
              <Link
                href="mailto:hello@ab.limo"
                onClick={() => setIsOpen(false)}
                className="block text-center text-gray-300 hover:text-abBlue text-sm font-medium py-3 border border-gray-700 rounded transition-colors"
              >
                hello@ab.limo
              </Link>
              <Link
                href={`${localeHome(lang)}`}
                onClick={() => setIsOpen(false)}
                className="block text-center bg-transparent border border-abBlue text-abBlue hover:bg-abBlue hover:border-abBlue hover:text-white px-5 py-3 rounded text-sm font-semibold transition-colors"
              >
                {nav.bookNow}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
