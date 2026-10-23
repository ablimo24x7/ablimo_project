import type { Dictionary } from "@/app/[lang]/dictionaries";
import type { SectionInstance } from "../types";
import { makeSection, normalizeCityImageMap, withOrder } from "./common";

// Per-city images for route heroes / visual cards (originally
// cityImages in the route page), re-keyed onto runtime slugs.
const ROUTE_CITY_IMAGES_RAW: Record<string, string> = {
  dubai: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop",
  "abu-dhabi": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&h=300&fit=crop",
  sharjah: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop&q=80",
  riyadh: "https://images.unsplash.com/photo-1663900108404-a05e8bf82cda?w=400&h=300&fit=crop",
  dammam: "https://images.unsplash.com/photo-1562979314-bee7453e911c?w=400&h=300&fit=crop",
  doha: "https://images.unsplash.com/photo-1700901742651-6b353164caf3?w=400&h=300&fit=crop",
  "al-khor": "https://images.unsplash.com/photo-1647252262017-582a7dbb73d0?w=400&h=300&fit=crop",
  jeddah: "https://images.unsplash.com/photo-1674979724572-c0a0579bc9d0?w=400&h=300&fit=crop",
  mecca: "https://images.unsplash.com/photo-1647177156544-0d51fb7c900c?w=400&h=300&fit=crop",
  medina: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=400&h=300&fit=crop&q=80",
  manama: "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=400&h=300&fit=crop",
  "al-khobar": "https://plus.unsplash.com/premium_photo-1697729655535-705aef824baf?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  kuwait: "https://images.unsplash.com/photo-1562979314-bee7453e911c?w=400&h=300&fit=crop",
  muscat: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=400&h=300&fit=crop",
  "al-ain": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&h=300&fit=crop&q=80",
  "ras-al-khaimah": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop&q=81",
  ajman: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop&q=82",
  "al-ahmadi": "https://images.unsplash.com/photo-1562979314-bee7453e911c?w=400&h=300&fit=crop&q=80",
  lusail: "https://images.unsplash.com/photo-1647252262017-582a7dbb73d0?w=400&h=300&fit=crop",
  sohar: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=400&h=300&fit=crop&q=80",
};

export const ROUTE_CITY_IMAGES = normalizeCityImageMap(ROUTE_CITY_IMAGES_RAW);

const ROUTE_HERO_FALLBACK =
  "https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=800&h=600&fit=crop";
const WHY_CHOOSE_IMAGE =
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop";

// cityToCity.routePage lives outside the typed Dictionary surface.
interface RouteDictFile {
  cityToCity: {
    subtitle: string;
    faq: { title: string; items: { q: string; a: string }[] };
    cta: { desc: string; bookNow: string };
    routePage: {
      breadcrumb: { home: string };
      totalDistance: string;
      estimatedTime: string;
      fixedPricing: string;
      pricing: string;
      from: string;
      to: string;
      whyChoose: string;
      whyChooseDesc: string;
      aboutRoute: string;
      aboutRouteDesc1: string;
      aboutRouteDesc2: string;
      routeFeatures: string[];
      ctaTitle: string;
    };
  };
}

/**
 * Route page template — mirrors the route page JSX section for
 * section. One template per country (refKey = countrySlug); the hero
 * and City Visuals images are stored as slug → URL maps resolved
 * against the actual origin/destination cities at render time.
 */
export function buildRouteTemplate(
  countrySlug: string,
  dict: Dictionary
): SectionInstance[] {
  void countrySlug;
  const c2c = (dict as unknown as RouteDictFile).cityToCity;
  const rp = c2c.routePage;
  const featureItems = rp.routeFeatures.map((feature, index) => ({
    id: `route-feature-${index}`,
    icon: "CheckCircle",
    heading: feature,
    description: "",
  }));

  return withOrder([
    makeSection("hero", {
      variant: "with-inquiry-form",
      content: {
        eyebrow: "",
        title: "{from} → {to}",
        titleHighlight: "",
        description: c2c.subtitle,
        images: ROUTE_CITY_IMAGES,
      },
      appearance: { background: ROUTE_HERO_FALLBACK },
    }),
    makeSection("breadcrumb", {
      content: {
        homeLabel: rp.breadcrumb.home,
        rootLabel: dict.countries.breadcrumb.countries,
      },
    }),
    makeSection("routeStats", {
      content: {},
      items: [
        { id: "stat-distance", icon: "Map", label: rp.totalDistance, value: "{distance}" },
        { id: "stat-duration", icon: "Clock", label: rp.estimatedTime, value: "{duration}" },
        { id: "stat-pricing", icon: "Shield", label: rp.pricing, value: rp.fixedPricing },
      ],
      appearance: { theme: "dark", padding: "md", border: false, textAlign: "center" },
    }),
    makeSection("cityVisuals", {
      content: {
        fromLabel: rp.from,
        toLabel: rp.to,
        images: ROUTE_CITY_IMAGES,
      },
      appearance: { theme: "dark", padding: "md", border: false, textAlign: "left" },
    }),
    makeSection("mediaContent", {
      variant: "media-right",
      content: {
        eyebrow: "",
        heading: rp.whyChoose,
        description: rp.whyChooseDesc,
        items: featureItems,
        actions: [],
      },
      settings: { mediaPosition: "right", containerWidth: "default" },
      appearance: {
        theme: "darker",
        padding: "lg",
        border: false,
        textAlign: "left",
        background: WHY_CHOOSE_IMAGE,
        backgroundAlt: "Long Distance Travel",
        pattern: false,
      },
    }),
    makeSection("mediaContent", {
      variant: "media-left",
      content: {
        eyebrow: "",
        heading: rp.aboutRoute,
        description: `${rp.aboutRouteDesc1} ${rp.aboutRouteDesc2}`,
        items: featureItems,
        actions: [],
        // slug → URL map resolved against the destination city at render
        images: ROUTE_CITY_IMAGES,
      },
      settings: { mediaPosition: "left", containerWidth: "default" },
      appearance: {
        theme: "dark",
        padding: "lg",
        border: false,
        textAlign: "left",
        background: "",
        pattern: false,
      },
    }),
    makeSection("faq", {
      content: {
        eyebrow: "",
        heading: c2c.faq.title,
        description: "",
        items: c2c.faq.items.map((item, index) => ({
          id: `faq-${index}`,
          question: item.q,
          answer: item.a,
        })),
      },
      items: [],
      settings: { variant: "default", source: "inline" },
      appearance: { theme: "dark", padding: "lg", border: false, textAlign: "center" },
    }),
    makeSection("ctaBanner", {
      content: { heading: rp.ctaTitle, description: c2c.cta.desc },
      items: [
        {
          id: "cta-contact",
          label: c2c.cta.bookNow,
          href: "{langPrefix}/contact",
          style: "primary",
          icon: "",
        },
      ],
      settings: { layout: "centered" },
      appearance: { theme: "darker", padding: "lg", border: false, textAlign: "center" },
    }),
  ]);
}
