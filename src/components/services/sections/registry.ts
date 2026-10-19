import type { ComponentType } from "react";
import type { PageSection } from "./section-types";

import HeroSection from "./hero-section";
import MarqueeSection from "./marquee-section";
import ServiceCardsSection from "./service-cards-section";
import FleetGridSection from "./fleet-grid-section";
import MediaContentSection from "./media-content-section";
import TextMediaGridSection from "./text-media-grid-section";
import ContactFormSection from "./contact-form-section";
import FAQSection from "./faq-section";
import CTABannerSection from "./cta-banner-section";

export interface SectionRendererProps {
  section: PageSection;
  serviceName?: string;
  serviceUrl?: string;
}

const SECTION_REGISTRY: Record<string, ComponentType<SectionRendererProps>> = {
  hero: HeroSection,
  marquee: MarqueeSection,
  serviceCards: ServiceCardsSection,
  fleetGrid: FleetGridSection,
  mediaContent: MediaContentSection,
  textMediaGrid: TextMediaGridSection,
  contactForm: ContactFormSection,
  faq: FAQSection,
  ctaBanner: CTABannerSection,
};

export function getSectionComponent(type: string): ComponentType<SectionRendererProps> | null {
  return SECTION_REGISTRY[type] ?? null;
}

export {
  HeroSection,
  MarqueeSection,
  ServiceCardsSection,
  FleetGridSection,
  MediaContentSection,
  TextMediaGridSection,
  ContactFormSection,
  FAQSection,
  CTABannerSection,
};
