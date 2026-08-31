import type { ServiceStructure } from "@/app/[lang]/services/_components/ServicePage";

/**
 * Preserved image/icon scaffolding for the original static service pages.
 * These are used as a fallback when a service route is served from the
 * bundled dictionaries instead of the database (e.g. database disabled).
 */
export const serviceStructures: Record<string, ServiceStructure> = {
  "executive-corporate-mobility": {
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
  "corporate-fleet": {
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
  "cross-border-mobility": {
    heroImage: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1920&h=800&fit=crop",
    featureIcons: [
      <svg key="1" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>,
      <svg key="2" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>,
      <svg key="3" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>,
    ],
    cardImages: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=800&h=500&fit=crop",
    ],
    sectionImages: [
      { image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&h=600&fit=crop", dark: true },
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
  "group-coach-charter": {
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
  "premium-lifestyle": {
    heroImage: "https://images.unsplash.com/photo-1494905998402-395d579af36f?w=1920&h=800&fit=crop",
    featureIcons: [
      <svg key="1" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21c-2 0-3-2-5-2s-3 2-3 2 1-3 3-3 1-2 3-2 2 0 4 2 5 2 5 2-1 2-3 2-3-2-4-2zM8 7a4 4 0 11-8 0 4 4 0 018 0zM32 7a4 4 0 11-8 0 4 4 0 018 0zM16 3a2 2 0 100 4 2 2 0 000-4z" />
      </svg>,
      <svg key="2" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>,
      <svg key="3" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>,
    ],
    cardImages: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=500&fit=crop",
    ],
    sectionImages: [
      { image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop", dark: true },
    ],
  },
  "religious-tourism": {
    heroImage: "https://images.unsplash.com/photo-1563521395854-2afd2c1b9a73?w=1920&h=800&fit=crop",
    featureIcons: [
      <svg key="1" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>,
      <svg key="2" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>,
      <svg key="3" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>,
    ],
    cardImages: [
      "https://images.unsplash.com/photo-1563521395854-2afd2c1b9a73?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1503328427499-d92d1ac3d174?w=800&h=500&fit=crop",
    ],
    sectionImages: [
      { image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop", dark: true },
    ],
  },
  "tourism-leisure": {
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
  "vip-diplomatic-government": {
    heroImage: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da?w=1920&h=800&fit=crop",
    featureIcons: [
      <svg key="1" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>,
      <svg key="2" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>,
      <svg key="3" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>,
    ],
    cardImages: [
      "https://images.unsplash.com/photo-1515711665854-b2293e7a7a60?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=500&fit=crop",
    ],
    sectionImages: [
      { image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&h=600&fit=crop", dark: true },
    ],
  },
};

/**
 * Maps a top-level service URL slug to its key inside `dict.servicePages`.
 */
export const serviceDictKeyBySlug: Record<string, string> = {
  "executive-corporate-mobility": "executiveCorporateMobility",
  "airport-transfers": "airportTransfers",
  "corporate-fleet": "corporateFleet",
  "cross-border-mobility": "crossBorderMobility",
  "event-transportation": "eventTransportation",
  "group-coach-charter": "groupCoachCharter",
  "premium-lifestyle": "premiumLifestyle",
  "religious-tourism": "religiousTourism",
  "tourism-leisure": "tourismLeisure",
  "vip-diplomatic-government": "vipDiplomaticGovernment",
};

/**
 * Fallback card image per service used by the services index page when the
 * service has no hero / card image of its own.
 */
export const serviceFallbackImages: Record<string, string> = {
  "executive-corporate-mobility": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=500&fit=crop",
  "airport-transfers": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=500&fit=crop",
  "vip-diplomatic-government": "https://images.unsplash.com/photo-1511974035430-5de47d3b95da?w=800&h=500&fit=crop",
  "corporate-fleet": "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&h=500&fit=crop",
  "event-transportation": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=500&fit=crop",
  "group-coach-charter": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=500&fit=crop",
  "tourism-leisure": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop",
  "religious-tourism": "https://images.unsplash.com/photo-1563521395854-2afd2c1b9a73?w=800&h=500&fit=crop",
  "cross-border-mobility": "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&h=500&fit=crop",
  "premium-lifestyle": "https://images.unsplash.com/photo-1494905998402-395d579af36f?w=800&h=500&fit=crop",
};

export function getFallbackImage(slug: string): string {
  return serviceFallbackImages[slug] ?? "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=500&fit=crop";
}