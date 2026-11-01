import type { SectionDefinition, SectionScope, SectionCategory } from "../types";
import { SECTION_TYPES } from "@/components/services/sections/section-types";

// ── Service-scope definitions (derived from the existing services
// SECTION_TYPES config — single base layer, zero duplication). ─────

interface ServiceMeta {
  scopes: SectionScope[];
  category: SectionCategory;
  description?: string;
  variants?: { value: string; label: string }[];
}

const SERVICE_META: Record<string, ServiceMeta> = {
  hero: {
    scopes: ["service", "country", "city", "route"],
    category: "Hero",
    variants: [
      { value: "background-content", label: "Background Content" },
      { value: "centered", label: "Centered" },
      { value: "with-inquiry-form", label: "With Inquiry Form" },
    ],
  },
  marquee: { scopes: ["service", "country", "city"], category: "Content" },
  serviceCards: {
    scopes: ["service", "country", "city"],
    category: "Content",
    description: "Grid of service cards — inline items or live from context services",
  },
  mediaContent: {
    scopes: ["service", "country", "city", "route"],
    category: "Content",
    description: "Two-column layout with media and rich text content",
  },
  textMediaGrid: { scopes: ["service", "country", "city"], category: "Content" },
  fleetGrid: { scopes: ["service", "country", "city"], category: "Grids" },
  contactForm: { scopes: ["service", "country", "city"], category: "Forms" },
  faq: {
    scopes: ["service", "country", "city", "route"],
    category: "Content",
    description: "FAQ accordion — inline items or live from country/city FAQs",
  },
  ctaBanner: { scopes: ["service", "country", "city", "route"], category: "CTA" },
};

const CONTEXT_SOURCE_TYPES = new Set(["faq", "serviceCards"]);

export const SERVICE_SECTION_DEFINITIONS: SectionDefinition[] = SECTION_TYPES.map(
  (cfg) => {
    const meta = SERVICE_META[cfg.type] ?? {
      scopes: ["service"] as SectionScope[],
      category: "Content" as SectionCategory,
    };
    return {
      type: cfg.type,
      label: cfg.label,
      description: meta.description ?? cfg.description,
      icon: cfg.icon,
      scopes: meta.scopes,
      category: meta.category,
      variants: meta.variants ?? cfg.variants,
      defaults: () => {
        const base = cfg.defaults();
        if (CONTEXT_SOURCE_TYPES.has(base.type)) {
          base.settings = { ...base.settings, source: "inline" };
        }
        return base;
      },
    };
  }
);
