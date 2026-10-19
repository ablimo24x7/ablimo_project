import type { ComponentType } from "react";
import type { PageSection } from "@/components/services/sections/section-types";
import type { SectionRendererProps } from "./types";

// ── Existing services section components (shared, reused) ────────
import HeroSection from "@/components/services/sections/hero-section";
import MarqueeSection from "@/components/services/sections/marquee-section";
import ServiceCardsSection from "@/components/services/sections/service-cards-section";
import FleetGridSection from "@/components/services/sections/fleet-grid-section";
import MediaContentSection from "@/components/services/sections/media-content-section";
import TextMediaGridSection from "@/components/services/sections/text-media-grid-section";
import ContactFormSection from "@/components/services/sections/contact-form-section";
import FAQSection from "@/components/services/sections/faq-section";
import CTABannerSection from "@/components/services/sections/cta-banner-section";

// ── Location-only section components (new) ───────────────────────
import IntroTextSection from "./components/intro-text-section";
import CitiesGridSection from "./components/cities-grid-section";
import AirportsGridSection from "./components/airports-grid-section";
import RoutesGridSection from "./components/routes-grid-section";
import RouteStatsSection from "./components/route-stats-section";
import CityVisualsSection from "./components/city-visuals-section";
import BreadcrumbSection from "./components/breadcrumb-section";

// Service-only components keep their legacy props shape; they never
// read the render context, so a cast to the library prop shape is safe.
type LegacyServiceProps = {
  section: PageSection;
  serviceName?: string;
  serviceUrl?: string;
};
const legacyService = (
  C: ComponentType<LegacyServiceProps>
): ComponentType<SectionRendererProps> =>
  C as unknown as ComponentType<SectionRendererProps>;
const asSection = (C: unknown): ComponentType<SectionRendererProps> =>
  C as ComponentType<SectionRendererProps>;

export const SECTION_LIBRARY_REGISTRY: Record<
  string,
  ComponentType<SectionRendererProps>
> = {
  // shared / merged (multi-scope)
  hero: HeroSection,
  faq: FAQSection,
  serviceCards: ServiceCardsSection,
  ctaBanner: asSection(CTABannerSection),
  mediaContent: asSection(MediaContentSection),
  // service-only
  marquee: legacyService(MarqueeSection),
  textMediaGrid: legacyService(TextMediaGridSection),
  fleetGrid: legacyService(FleetGridSection),
  contactForm: legacyService(ContactFormSection),
  // location-only
  introText: IntroTextSection,
  citiesGrid: CitiesGridSection,
  airportsGrid: AirportsGridSection,
  routesGrid: RoutesGridSection,
  routeStats: RouteStatsSection,
  cityVisuals: CityVisualsSection,
  breadcrumb: BreadcrumbSection,
};

export function getSectionComponent(
  type: string
): ComponentType<SectionRendererProps> | null {
  return SECTION_LIBRARY_REGISTRY[type] ?? null;
}

export {
  HeroSection,
  ServiceCardsSection,
  MediaContentSection,
  FAQSection,
  CTABannerSection,
  IntroTextSection,
  CitiesGridSection,
  AirportsGridSection,
  RoutesGridSection,
  RouteStatsSection,
  CityVisualsSection,
  BreadcrumbSection,
};
