"use client";

import { useState } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { type Locale } from "@/app/[lang]/dictionaries";
import { locationsUrl } from "@/lib/locations";
import type { NavServiceItem } from "@/lib/services";
import NavDropdown from "./NavDropdown";
import LanguageSwitcher from "./LanguageSwitcher";

interface DesktopNavProps {
  dict: Dictionary;
  lang: Locale;
  dbServiceLinks: NavServiceItem[];
}

export default function DesktopNav({ dict, lang, dbServiceLinks }: DesktopNavProps) {
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

  const appServiceLinks = dict.services.categories.map((category) => ({
    label: category.title,
    href: `/${lang}/services/${category.slug}`,
  }));

  const mergedCategoryLinks = [...appServiceLinks, ...dbServiceLinks].filter(
    (link, index, arr) =>
      arr.findIndex((other) => other.href === link.href) === index
  );

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
    <nav className="hidden lg:flex space-x-6 items-center">
      <NavDropdown
        id="services"
        label={nav.ourServices}
        items={[...mergedCategoryLinks, ...serviceLinks]}
        isOpen={openDropdown === "services"}
        onToggle={() => setOpenDropdown(openDropdown === "services" ? null : "services")}
        onClose={() => setOpenDropdown(null)}
        lang={lang}
      />

      <NavDropdown
        id="solutions"
        label={nav.ourSolution}
        groups={ourSolutionGroups}
        isOpen={openDropdown === "solutions"}
        onToggle={() => setOpenDropdown(openDropdown === "solutions" ? null : "solutions")}
        onClose={() => setOpenDropdown(null)}
        lang={lang}
      />

      <NavDropdown
        id="industry"
        label={nav.mobilityByIndustry}
        items={industryLinks}
        isOpen={openDropdown === "industry"}
        onToggle={() => setOpenDropdown(openDropdown === "industry" ? null : "industry")}
        onClose={() => setOpenDropdown(null)}
        lang={lang}
      />

      <NavDropdown
        id="technology"
        label={nav.technology}
        items={technologyLinks}
        isOpen={openDropdown === "technology"}
        onToggle={() => setOpenDropdown(openDropdown === "technology" ? null : "technology")}
        onClose={() => setOpenDropdown(null)}
        lang={lang}
      />

      <div className="w-px h-5 bg-gray-700 mx-1" />

      <LanguageSwitcher
        currentLang={lang}
        isOpen={openDropdown === "lang"}
        onToggle={() => setOpenDropdown(openDropdown === "lang" ? null : "lang")}
        onClose={() => setOpenDropdown(null)}
      />
    </nav>
  );
}
