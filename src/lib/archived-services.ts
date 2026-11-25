/**
 * Archived service pages.
 *
 * These 59 pages used to be served at `/services/{slug}` alongside the six
 * core service verticals. They are kept here — out of the live site and out of
 * the sitemap — because they may be re-enabled or reused later.
 *
 * To restore a page:
 *   1. Move its entry out of this list and back into `NAV_ONLY_SERVICES` in
 *      `src/lib/services.ts` (or create a real dashboard service instead).
 *   2. Restore its `dictKey` mapping in `serviceDictKeyBySlug`
 *      (`src/app/[lang]/services/_components/serviceStructures.tsx`).
 *   3. Re-add any images/metadata you need.
 *
 * `isArchivedService()` is the runtime guard used by the service resolver,
 * the sitemap and the catch-all service route, so simply keeping a slug in
 * this list is enough to keep it off the website.
 */
export interface ArchivedService {
  slug: string;
  title: string;
  href: string;
  /** Dictionary template key this page used before it was archived. */
  dictKey: string;
}

export const ARCHIVED_SERVICES: readonly ArchivedService[] = [
  { slug: "executive-chauffeur", title: "Executive Chauffeur Services", href: "/services/executive-chauffeur", dictKey: "chauffeurVip" },
  { slug: "chauffeur-hailing", title: "Chauffeur Hailing Services", href: "/services/chauffeur-hailing", dictKey: "chauffeurVip" },
  { slug: "hourly-chauffeur", title: "Hourly Chauffeur", href: "/services/hourly-chauffeur", dictKey: "chauffeurVip" },
  { slug: "city-transfers", title: "City Transfers", href: "/services/city-transfers", dictKey: "chauffeurVip" },
  { slug: "intercity-transfers", title: "Intercity Transfers", href: "/services/intercity-transfers", dictKey: "chauffeurVip" },
  { slug: "limousine-services", title: "Limousine Services", href: "/services/limousine-services", dictKey: "chauffeurVip" },
  { slug: "bus-charter", title: "Bus Charter", href: "/services/bus-charter", dictKey: "busCoachHire" },
  { slug: "mini-bus-charter", title: "Mini Bus Charter", href: "/services/mini-bus-charter", dictKey: "busCoachHire" },
  { slug: "coach-charter", title: "Coach Charter", href: "/services/coach-charter", dictKey: "busCoachHire" },
  { slug: "airport-coach-transfers", title: "Airport Coach Transfers", href: "/services/airport-coach-transfers", dictKey: "airportTransfers" },
  { slug: "religious-tourism", title: "Religious Tourism", href: "/services/religious-tourism", dictKey: "religiousTourism" },
  { slug: "executive-corporate-mobility", title: "Executive Corporate Mobility", href: "/services/executive-corporate-mobility", dictKey: "chauffeurVip" },
  { slug: "vip-diplomatic-government", title: "VIP Diplomatic Government", href: "/services/vip-diplomatic-government", dictKey: "chauffeurVip" },
  { slug: "corporate-fleet", title: "Corporate Fleet", href: "/services/corporate-fleet", dictKey: "corporateTransportation" },
  { slug: "group-coach-charter", title: "Group Coach Charter", href: "/services/group-coach-charter", dictKey: "busCoachHire" },
  { slug: "tourism-leisure", title: "Tourism Leisure", href: "/services/tourism-leisure", dictKey: "tourismTransportation" },
  { slug: "premium-lifestyle", title: "Premium Lifestyle", href: "/services/premium-lifestyle", dictKey: "chauffeurVip" },
  { slug: "cross-border-mobility", title: "Cross Border Mobility", href: "/services/cross-border-mobility", dictKey: "chauffeurVip" },
  { slug: "tourism-dmc", title: "Tourism & DMC Mobility Solutions", href: "/services/tourism-dmc", dictKey: "tourismTransportation" },
  { slug: "hospitality-mobility", title: "Hospitality Mobility Solutions", href: "/services/hospitality-mobility", dictKey: "tourismTransportation" },
  { slug: "tourism-roadshows", title: "Tourism Roadshows Mobility", href: "/services/tourism-roadshows", dictKey: "tourismTransportation" },
  { slug: "mice-transportation", title: "MICE Transportation", href: "/services/mice-transportation", dictKey: "eventTransportation" },
  { slug: "hotel-shuttle", title: "Hotel Shuttle", href: "/services/hotel-shuttle", dictKey: "tourismTransportation" },
  { slug: "event-mice-mobility", title: "Event & MICE Mobility Solutions", href: "/services/event-mice-mobility", dictKey: "eventTransportation" },
  { slug: "city-to-city", title: "City to City Rides", href: "/services/city-to-city", dictKey: "chauffeurVip" },
  { slug: "corporate-shuttle", title: "Corporate Shuttle Services", href: "/services/corporate-shuttle", dictKey: "corporateTransportation" },
  { slug: "staff-transport", title: "Staff / Employee Transportation", href: "/services/staff-transport", dictKey: "corporateTransportation" },
  { slug: "school-transport", title: "School Transportation", href: "/services/school-transport", dictKey: "corporateTransportation" },
  { slug: "university-transport", title: "University Transportation", href: "/services/university-transport", dictKey: "corporateTransportation" },
  { slug: "financial-roadshows", title: "Financial Roadshows Mobility Solutions", href: "/services/financial-roadshows", dictKey: "corporateTransportation" },
  { slug: "exhibition-transportation", title: "Exhibition Transportation", href: "/services/exhibition-transportation", dictKey: "eventTransportation" },
  { slug: "conference-transportation", title: "Conference Transportation", href: "/services/conference-transportation", dictKey: "eventTransportation" },
  { slug: "sports-team-transportation", title: "Sports Team Transportation", href: "/services/sports-team-transportation", dictKey: "eventTransportation" },
  { slug: "artists-transportation", title: "Artists Transportation", href: "/services/artists-transportation", dictKey: "eventTransportation" },
  { slug: "crew-transportation", title: "Crew Transportation", href: "/services/crew-transportation", dictKey: "eventTransportation" },
  { slug: "vip-delegation", title: "VIP Delegation Transportation", href: "/services/vip-delegation", dictKey: "chauffeurVip" },
  { slug: "government-mobility", title: "Government & Diplomatic Mobility Solutions", href: "/services/government-mobility", dictKey: "chauffeurVip" },
  { slug: "embassy-transportation", title: "Embassy Transportation Solutions", href: "/services/embassy-transportation", dictKey: "chauffeurVip" },
  { slug: "aviation-mobility", title: "Aviation Mobility Solutions", href: "/services/aviation-mobility", dictKey: "chauffeurVip" },
  { slug: "workforce-mobility", title: "Workforce Mobility Solutions", href: "/services/workforce-mobility", dictKey: "corporateTransportation" },
  { slug: "energy-mobility", title: "Energy & Utilities Mobility Solutions", href: "/services/energy-mobility", dictKey: "corporateTransportation" },
  { slug: "construction-mobility", title: "Construction & Project Mobility Solutions", href: "/services/construction-mobility", dictKey: "corporateTransportation" },
  { slug: "industrial-mobility", title: "Industrial Mobility Solutions", href: "/services/industrial-mobility", dictKey: "corporateTransportation" },
  { slug: "sports-entertainment-mobility", title: "Sports & Entertainment Mobility Solutions", href: "/services/sports-entertainment-mobility", dictKey: "eventTransportation" },
  { slug: "healthcare-mobility", title: "Healthcare Mobility Solutions", href: "/services/healthcare-mobility", dictKey: "corporateTransportation" },
  { slug: "education-mobility", title: "Education Mobility Solutions", href: "/services/education-mobility", dictKey: "corporateTransportation" },
  { slug: "retail-mobility", title: "Retail & Commercial Mobility Solutions", href: "/services/retail-mobility", dictKey: "corporateTransportation" },
  { slug: "media-production-mobility", title: "Media & Production Mobility Solutions", href: "/services/media-production-mobility", dictKey: "corporateTransportation" },
  { slug: "marine-mobility", title: "Marine & Port Mobility Solutions", href: "/services/marine-mobility", dictKey: "corporateTransportation" },
  { slug: "mining-mobility", title: "Mining & Remote Site Mobility Solutions", href: "/services/mining-mobility", dictKey: "corporateTransportation" },
  { slug: "technology-mobility", title: "Technology & Innovation Mobility Solutions", href: "/services/technology-mobility", dictKey: "corporateTransportation" },
  { slug: "ngo-mobility", title: "NGO & Humanitarian Mobility Solutions", href: "/services/ngo-mobility", dictKey: "corporateTransportation" },
  { slug: "real-estate-mobility", title: "Real Estate & Community Mobility Solutions", href: "/services/real-estate-mobility", dictKey: "corporateTransportation" },
  { slug: "luxury-vip-mobility", title: "Luxury & VIP Mobility Solutions", href: "/services/luxury-vip-mobility", dictKey: "chauffeurVip" },
  { slug: "media-entertainment-mobility", title: "Media & Entertainment Industry Mobility Solution", href: "/services/media-entertainment-mobility", dictKey: "eventTransportation" },
  { slug: "medical-transportation", title: "Medical Transportation Solutions", href: "/services/medical-transportation", dictKey: "corporateTransportation" },
  { slug: "oil-gas-mobility", title: "Oil & Gas Staff Mobility Solutions", href: "/services/oil-gas-mobility", dictKey: "corporateTransportation" },
  { slug: "mining-staff-transport", title: "Mining Staff Transportation", href: "/services/mining-staff-transport", dictKey: "corporateTransportation" },
  { slug: "construction-staff-transport", title: "Construction Staff Transportation", href: "/services/construction-staff-transport", dictKey: "corporateTransportation" },
];

/** Fast lookup set used by route guards, the resolver and the sitemap. */
export const ARCHIVED_SERVICE_SLUGS: ReadonlySet<string> = new Set(
  ARCHIVED_SERVICES.map((service) => service.slug)
);

export function isArchivedService(slug: string): boolean {
  return ARCHIVED_SERVICE_SLUGS.has(slug);
}

/**
 * Dictionary template mappings for the archived pages, preserved so a future
 * restore doesn't have to rebuild them.
 */
export const ARCHIVED_SERVICE_DICT_KEYS: Record<string, string> = Object.fromEntries(
  ARCHIVED_SERVICES.map((service) => [service.slug, service.dictKey])
);
