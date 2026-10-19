import type { ServiceStructure } from "@/app/[lang]/services/_components/ServicePage";

/**
 * Preserved image/icon scaffolding for the original static service pages.
 * These are used as a fallback when a service route is served from the
 * bundled dictionaries instead of the database (e.g. database disabled).
 */
export const serviceStructures: Record<string, ServiceStructure> = {
  "chauffeur-vip": {
    heroImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=800&fit=crop",
    featureIcons: [
      <svg key="1" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>,
      <svg key="2" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>,
      <svg key="3" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4" />
      </svg>,
    ],
    cardImages: [
      "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=800&h=500&fit=crop",
    ],
    sectionImages: [
      { image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop" },
      { image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop", dark: true },
    ],
  },
  "airport-transfers": {
    heroImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&h=800&fit=crop",
    featureIcons: [
      <svg key="1" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>,
      <svg key="2" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>,
      <svg key="3" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>,
    ],
    cardImages: [
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?w=800&h=500&fit=crop",
    ],
    sectionImages: [
      { image: "https://images.unsplash.com/photo-1473625247510-8ceb1760943f?w=800&h=600&fit=crop", dark: true },
    ],
  },
  "corporate-transportation": {
    heroImage: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1920&h=800&fit=crop",
    featureIcons: [
      <svg key="1" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>,
      <svg key="2" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>,
      <svg key="3" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>,
    ],
    cardImages: [
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop",
    ],
    sectionImages: [
      { image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop", dark: true },
    ],
  },
  "event-transportation": {
    heroImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&h=800&fit=crop",
    featureIcons: [
      <svg key="1" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>,
      <svg key="2" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>,
      <svg key="3" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>,
    ],
    cardImages: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=500&fit=crop",
    ],
    sectionImages: [
      { image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=600&fit=crop", dark: true },
    ],
  },
  "bus-coach-hire": {
    heroImage: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920&h=800&fit=crop",
    featureIcons: [
      <svg key="1" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>,
      <svg key="2" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>,
      <svg key="3" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>,
    ],
    cardImages: [
      "https://images.unsplash.com/photo-1550358864-518f202c02ba?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=500&fit=crop",
    ],
    sectionImages: [
      { image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&h=600&fit=crop", dark: true },
    ],
  },
  "tourism-transportation": {
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=800&fit=crop",
    featureIcons: [
      <svg key="1" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>,
      <svg key="2" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>,
      <svg key="3" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>,
    ],
    cardImages: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=800&h=500&fit=crop",
    ],
    sectionImages: [
      { image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&h=600&fit=crop", dark: true },
    ],
  },
};

/**
 * Maps a top-level service URL slug to its key inside `dict.servicePages`.
 */
export const serviceDictKeyBySlug: Record<string, string> = {
  "chauffeur-vip": "chauffeurVip",
  "airport-transfers": "airportTransfers",
  "corporate-transportation": "corporateTransportation",
  "event-transportation": "eventTransportation",
  "bus-coach-hire": "busCoachHire",
  "tourism-transportation": "tourismTransportation",
  "religious-tourism": "religiousTourism",
  "executive-chauffeur": "chauffeurVip",
  "chauffeur-hailing": "chauffeurVip",
  "hourly-chauffeur": "chauffeurVip",
  "city-transfers": "chauffeurVip",
  "intercity-transfers": "chauffeurVip",
  "limousine-services": "chauffeurVip",
  "bus-charter": "busCoachHire",
  "mini-bus-charter": "busCoachHire",
  "coach-charter": "busCoachHire",
  "airport-coach-transfers": "airportTransfers",
  "executive-corporate-mobility": "chauffeurVip",
  "vip-diplomatic-government": "chauffeurVip",
  "corporate-fleet": "corporateTransportation",
  "group-coach-charter": "busCoachHire",
  "tourism-leisure": "tourismTransportation",
  "premium-lifestyle": "chauffeurVip",
  "cross-border-mobility": "chauffeurVip",

  // Tourism Mobility Solutions
  "tourism-dmc": "tourismTransportation",
  "hospitality-mobility": "tourismTransportation",
  "tourism-roadshows": "tourismTransportation",
  "mice-transportation": "eventTransportation",
  "hotel-shuttle": "tourismTransportation",

  // Corporate Mobility Solutions
  "event-mice-mobility": "eventTransportation",
  "city-to-city": "chauffeurVip",
  "corporate-shuttle": "corporateTransportation",
  "staff-transport": "corporateTransportation",
  "school-transport": "corporateTransportation",
  "university-transport": "corporateTransportation",
  "financial-roadshows": "corporateTransportation",

  // Events Mobility Solutions
  "exhibition-transportation": "eventTransportation",
  "conference-transportation": "eventTransportation",
  "sports-team-transportation": "eventTransportation",
  "artists-transportation": "eventTransportation",
  "crew-transportation": "eventTransportation",
  "vip-delegation": "chauffeurVip",

  // Industry Mobility Solutions
  "government-mobility": "chauffeurVip",
  "embassy-transportation": "chauffeurVip",
  "aviation-mobility": "chauffeurVip",
  "workforce-mobility": "corporateTransportation",
  "energy-mobility": "corporateTransportation",
  "construction-mobility": "corporateTransportation",
  "industrial-mobility": "corporateTransportation",
  "sports-entertainment-mobility": "eventTransportation",
  "healthcare-mobility": "corporateTransportation",
  "education-mobility": "corporateTransportation",
  "retail-mobility": "corporateTransportation",
  "media-production-mobility": "corporateTransportation",
  "marine-mobility": "corporateTransportation",
  "mining-mobility": "corporateTransportation",
  "technology-mobility": "corporateTransportation",
  "ngo-mobility": "corporateTransportation",
  "real-estate-mobility": "corporateTransportation",
  "luxury-vip-mobility": "chauffeurVip",
  "media-entertainment-mobility": "eventTransportation",
  "medical-transportation": "corporateTransportation",
  "oil-gas-mobility": "corporateTransportation",
  "mining-staff-transport": "corporateTransportation",
  "construction-staff-transport": "corporateTransportation",
};

/**
 * Structures only exist for the 6 core verticals. Every other dictionary slug
 * reuses the structure of its core vertical, so dictionary-backed service
 * pages never crash on a missing structure.
 */
const STRUCTURE_SLUG_BY_DICT_KEY: Record<string, string> = {};
for (const [slug, dictKey] of Object.entries(serviceDictKeyBySlug)) {
  if (serviceStructures[slug] && !(dictKey in STRUCTURE_SLUG_BY_DICT_KEY)) {
    STRUCTURE_SLUG_BY_DICT_KEY[dictKey] = slug;
  }
}

const STRUCTURE_BY_DICT_KEY_FALLBACK: Record<string, string> = {
  religiousTourism: "tourism-transportation",
};

export function getStructureForService(
  slug: string,
  dictKey?: string
): ServiceStructure | undefined {
  const direct = serviceStructures[slug];
  if (direct) return direct;
  if (!dictKey) return undefined;
  const mapped =
    STRUCTURE_SLUG_BY_DICT_KEY[dictKey] ?? STRUCTURE_BY_DICT_KEY_FALLBACK[dictKey];
  return mapped ? serviceStructures[mapped] : undefined;
}

/**
 * Fallback card image per service used by the services index page when the
 * service has no hero / card image of its own.
 */
export const serviceFallbackImages: Record<string, string> = {
  "chauffeur-vip": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=500&fit=crop",
  "airport-transfers": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=500&fit=crop",
  "corporate-transportation": "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&h=500&fit=crop",
  "event-transportation": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=500&fit=crop",
  "bus-coach-hire": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=500&fit=crop",
  "tourism-transportation": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop",

  // Tourism Mobility Solutions
  "tourism-dmc": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=500&fit=crop",
  "hospitality-mobility": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=500&fit=crop",
  "tourism-roadshows": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop",
  "mice-transportation": "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=500&fit=crop",
  "hotel-shuttle": "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=500&fit=crop",

  // Corporate Mobility Solutions
  "event-mice-mobility": "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=500&fit=crop",
  "city-to-city": "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&h=500&fit=crop",
  "corporate-shuttle": "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&h=500&fit=crop",
  "staff-transport": "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=500&fit=crop",
  "school-transport": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=500&fit=crop",
  "university-transport": "https://images.unsplash.com/photo-1523050854058-8df90110c8f1?w=800&h=500&fit=crop",
  "financial-roadshows": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop",

  // Events Mobility Solutions
  "exhibition-transportation": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop",
  "conference-transportation": "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=500&fit=crop",
  "sports-team-transportation": "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=500&fit=crop",
  "artists-transportation": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=500&fit=crop",
  "crew-transportation": "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=500&fit=crop",
  "vip-delegation": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop",

  // Industry Mobility Solutions
  "government-mobility": "https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=800&h=500&fit=crop",
  "embassy-transportation": "https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=800&h=500&fit=crop",
  "aviation-mobility": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=500&fit=crop",
  "workforce-mobility": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop",
  "energy-mobility": "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=500&fit=crop",
  "construction-mobility": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop",
  "industrial-mobility": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop",
  "sports-entertainment-mobility": "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=500&fit=crop",
  "healthcare-mobility": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=500&fit=crop",
  "education-mobility": "https://images.unsplash.com/photo-1523050854058-8df90110c8f1?w=800&h=500&fit=crop",
  "retail-mobility": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop",
  "media-production-mobility": "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=500&fit=crop",
  "marine-mobility": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=500&fit=crop",
  "mining-mobility": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop",
  "technology-mobility": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop",
  "ngo-mobility": "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=500&fit=crop",
  "real-estate-mobility": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop",
  "luxury-vip-mobility": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=500&fit=crop",
  "media-entertainment-mobility": "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=500&fit=crop",
  "medical-transportation": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=500&fit=crop",
  "oil-gas-mobility": "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=500&fit=crop",
  "mining-staff-transport": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop",
  "construction-staff-transport": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop",
};

export function getFallbackImage(slug: string): string {
  return serviceFallbackImages[slug] ?? "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=500&fit=crop";
}