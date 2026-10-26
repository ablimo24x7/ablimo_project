import {
  localeBase,
  localeHome,
  type Dictionary,
  type Locale,
} from "@/app/[lang]/dictionaries";
import { COUNTRIES, countryUrl, locationsUrl } from "@/lib/locations";

export interface HeaderNavItem {
  label: string;
  href: string;
}

export interface HeaderNavGroup {
  id: string;
  label: string;
  href?: string;
  items: HeaderNavItem[];
}

export function getHeaderNav(lang: Locale, dict: Dictionary): HeaderNavGroup[] {
  const base = localeBase(lang);
  const nav = dict.header.nav;
  const d = dict.header.dropdowns;

  const country = (code: string) => {
    const match = COUNTRIES.find((c) => c.code === code);
    return match ? countryUrl(lang, match) : locationsUrl(lang);
  };

  const allLocations = locationsUrl(lang);

  return [
    {
      id: "services",
      label: nav.services,
      href: `${base}/services`,
      items: [
        {
          label: d.servicesMenu.chauffeurVip,
          href: `${base}/services/chauffeur-vip`,
        },
        {
          label: d.servicesMenu.airportTransfers,
          href: `${base}/services/airport-transfers`,
        },
        {
          label: d.servicesMenu.corporateTransportation,
          href: `${base}/services/corporate-transportation`,
        },
        {
          label: d.servicesMenu.eventTransportation,
          href: `${base}/services/event-transportation`,
        },
        {
          label: d.servicesMenu.busCoachHire,
          href: `${base}/services/bus-coach-hire`,
        },
        {
          label: d.servicesMenu.workforceTransportation,
          href: `${base}/services/workforce-mobility`,
        },
        {
          label: d.servicesMenu.tourismTransportation,
          href: `${base}/services/tourism-transportation`,
        },
        {
          label: d.servicesMenu.religiousTourism,
          href: `${base}/services/religious-tourism`,
        },
        {
          label: d.servicesMenu.intercityTransfers,
          href: `${base}/services/intercity-transfers`,
        },
      ],
    },
    {
      id: "industries",
      label: nav.industries,
      href: `${base}/industries`,
      items: [
        {
          label: d.industriesMenu.eventsExhibitions,
          href: `${base}/industries/events`,
        },
        {
          label: d.industriesMenu.governmentDiplomatic,
          href: `${base}/industries/government-diplomatic`,
        },
        {
          label: d.industriesMenu.aviationFbo,
          href: `${base}/industries/aviation`,
        },
        {
          label: d.industriesMenu.energyGigaProjects,
          href: `${base}/industries/energy`,
        },
        {
          label: d.industriesMenu.hospitality,
          href: `${base}/industries/hospitality`,
        },
        {
          label: d.industriesMenu.sportsEntertainment,
          href: `${base}/industries/sports`,
        },
        {
          label: d.industriesMenu.corporateEnterprise,
          href: `${base}/industries/corporate-enterprise`,
        },
      ],
    },
    {
      id: "locations",
      label: nav.locations,
      href: allLocations,
      items: [
        {
          label: d.locationsMenu.saudiArabia,
          href: country("sa"),
        },
        {
          label: d.locationsMenu.uae,
          href: country("ae"),
        },
        {
          label: d.locationsMenu.qatar,
          href: country("qa"),
        },
        {
          label: d.locationsMenu.bahrainKuwaitOman,
          href: allLocations,
        },
        {
          label: d.locationsMenu.airports,
          href: allLocations,
        },
        {
          label: d.locationsMenu.allLocations,
          href: allLocations,
        },
      ],
    },
    {
      id: "fleet",
      label: nav.fleet ?? d.resourcesMenu.fleet ?? "Fleet",
      href: `${base}/fleet`,
      items: [
        {
          label: d.fleetMenu.sedans,
          href: `${base}/fleet#sedans`,
        },
        {
          label: d.fleetMenu.suvs,
          href: `${base}/fleet#suvs`,
        },
        {
          label: d.fleetMenu.luxury,
          href: `${base}/fleet#luxury`,
        },
        {
          label: d.fleetMenu.sprinters,
          href: `${base}/fleet#sprinters`,
        },
        {
          label: d.fleetMenu.coaches,
          href: `${base}/fleet#coaches`,
        },
        {
          label: d.fleetMenu.buses,
          href: `${base}/fleet#buses`,
        },
      ],
    },
    {
      id: "company",
      label: nav.company,
      href: `${base}/about`,
      items: [
        {
          label: d.companyMenu.aboutAb,
          href: `${base}/about`,
        },
        {
          label: d.companyMenu.leadership,
          href: `${base}/about`,
        },
        {
          label: d.companyMenu.licencesCredentials,
          href: `${base}/about`,
        },
        {
          label: d.companyMenu.chauffeurStandard,
          href: `${base}/about`,
        },
        {
          label: d.companyMenu.technology,
          href: `${base}/about`,
        },
        {
          label: d.companyMenu.careers,
          href: `${base}/career`,
        },
        {
          label: d.companyMenu.partners,
          href: `${base}/partners`,
        },
        {
          label: d.companyMenu.suppliers,
          href: `${base}/strategic-partnerships`,
        },
        {
          label: d.companyMenu.press,
          href: `${base}/press/releases`,
        },
      ],
    },
    {
      id: "resources",
      label: nav.resources,
      items: [
        {
          label: d.resourcesMenu.corporateAccounts,
          href: `${base}/business`,
        },
        {
          label: d.resourcesMenu.caseStudies,
          href: `${localeHome(lang)}#case-studies`,
        },
        {
          label: d.resourcesMenu.fleet,
          href: `${base}/fleet`,
        },
        {
          label: d.resourcesMenu.insights,
          href: `${base}/blogs`,
        },
        {
          label: d.resourcesMenu.faqs,
          href: `${base}/faqs`,
        },
        {
          label: d.resourcesMenu.contact,
          href: `${base}/contact`,
        },
      ],
    },
  ];
}
