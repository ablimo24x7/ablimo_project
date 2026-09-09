// ── Section Type Definitions ─────────────────────────────────────
// Every section in a service page is represented by one of these types.
// The `content`, `items`, `settings`, and `appearance` objects are
// intentionally loose (Record<string, unknown>) so each section type
// can define its own shape without bloating the union.

export type SectionType =
  | "hero"
  | "serviceCards"
  | "mediaContent"
  | "fleetGrid"
  | "contactForm"
  | "faq"
  | "ctaBanner";

export type SectionVariant = string;

export interface PageSection {
  id: string;
  type: SectionType;
  variant: SectionVariant;
  order: number;
  enabled: boolean;
  content: Record<string, unknown>;
  items: Record<string, unknown>[];
  settings: Record<string, unknown>;
  appearance: Record<string, unknown>;
}

// ── Hero ─────────────────────────────────────────────────────────

export interface HeroContent {
  eyebrow?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
}

export interface HeroAction {
  label: string;
  href: string;
  style: "primary" | "secondary" | "ghost" | "link";
  icon?: string;
  iconPosition?: "left" | "right";
}

export interface HeroMedia {
  type: "image" | "video";
  url: string;
  alt?: string;
}

export interface HeroSettings {
  minHeight?: string;
  overlayOpacity?: number;
  contentPosition?: "left" | "center" | "right";
}

export interface HeroAppearance {
  theme?: "dark" | "darker";
  background?: string;
}

// ── Service Cards ────────────────────────────────────────────────

export interface ServiceCardItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  wide?: boolean;
  actions: CardAction[];
}

export interface CardAction {
  label: string;
  href: string;
  style: "accent" | "text" | "outline";
  icon?: string;
}

export interface ServiceCardsContent {
  eyebrow?: string;
  heading: string;
  description?: string;
}

export interface ServiceCardsSettings {
  columns?: "2" | "3" | "4";
  showHeader?: boolean;
}

export interface ServiceCardsAppearance {
  theme?: "dark" | "darker";
}

// ── Media Content ────────────────────────────────────────────────

export interface MediaContentItem {
  id: string;
  icon: string;
  heading: string;
  description: string;
}

export interface MediaContentContent {
  eyebrow?: string;
  heading: string;
  description?: string;
  richContent?: string;
  items?: MediaContentItem[];
}

export interface MediaContentMedia {
  type: "image" | "video";
  url: string;
  alt?: string;
  caption?: string;
}

export interface MediaContentActions {
  label: string;
  href: string;
  style: "primary" | "secondary" | "outline";
  icon?: string;
}

export interface MediaContentSettings {
  mediaPosition?: "left" | "right";
  containerWidth?: "default" | "narrow" | "wide";
}

export interface MediaContentAppearance {
  theme?: "dark" | "darker" | "light";
  background?: string;
  pattern?: boolean;
}

// ── Fleet Grid ───────────────────────────────────────────────────

export interface FleetItem {
  id: string;
  badge?: string;
  badgeStyle?: "default" | "accent";
  image: string;
  imageAlt?: string;
  category: string;
  name: string;
  capacity: string;
  bags: string;
  capacityIcon?: string;
  bagsIcon?: string;
  actions?: { label: string; href: string }[];
}

export interface FleetGridContent {
  eyebrow?: string;
  heading: string;
  description?: string;
}

export interface FleetGridSettings {
  columns?: "2" | "3" | "4";
}

export interface FleetGridAppearance {
  theme?: "dark" | "darker";
}

// ── Contact Form ─────────────────────────────────────────────────

export interface ContactFormContent {
  eyebrow?: string;
  heading: string;
  description?: string;
  icon?: string;
  submitLabel?: string;
  successTitle?: string;
  successMessage?: string;
}

export interface ContactFormSettings {
  layout?: "full" | "centered";
}

export interface ContactFormAppearance {
  theme?: "dark" | "darker";
}

// ── FAQ ──────────────────────────────────────────────────────────

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqContent {
  eyebrow?: string;
  heading: string;
  description?: string;
  items: FaqItem[];
}

export interface FaqActions {
  label: string;
  href: string;
  style: "primary" | "secondary";
  icon?: string;
}

export interface FaqSettings {
  variant?: "default" | "compact";
}

export interface FaqAppearance {
  theme?: "dark" | "darker";
}

// ── CTA Banner ───────────────────────────────────────────────────

export interface CtaBannerContent {
  heading: string;
  description?: string;
}

export interface CtaBannerAction {
  label: string;
  href: string;
  style: "primary" | "secondary" | "outline";
  icon?: string;
}

export interface CtaBannerSettings {
  layout?: "centered" | "split";
}

export interface CtaBannerAppearance {
  theme?: "dark" | "darker";
}

// ── Section Registry Types ───────────────────────────────────────

export interface SectionTypeConfig {
  type: SectionType;
  label: string;
  description: string;
  icon: string;
  variants: { value: string; label: string }[];
  defaults: () => PageSection;
}

export const SECTION_TYPES: SectionTypeConfig[] = [
  {
    type: "hero",
    label: "Hero",
    description: "Full-width hero with background image, heading, and CTAs",
    icon: "Layout",
    variants: [
      { value: "background-content", label: "Background Content" },
      { value: "centered", label: "Centered" },
    ],
    defaults: () => ({
      id: `sec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: "hero",
      variant: "background-content",
      order: 0,
      enabled: true,
      content: {
        eyebrow: "Premium Mobility",
        title: "Service Title.",
        titleHighlight: "",
        description: "Service description goes here.",
      },
      items: [],
      settings: {
        minHeight: "85vh",
        overlayOpacity: 85,
        contentPosition: "left",
      },
      appearance: {
        theme: "darker",
        background: "",
      },
    }),
  },
  {
    type: "serviceCards",
    label: "Service Cards",
    description: "Grid of service cards with icons and CTAs",
    icon: "LayoutGrid",
    variants: [
      { value: "3-column", label: "3 Column" },
      { value: "2-column", label: "2 Column" },
      { value: "4-column", label: "4 Column" },
    ],
    defaults: () => ({
      id: `sec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: "serviceCards",
      variant: "3-column",
      order: 0,
      enabled: true,
      content: {
        eyebrow: "Core Services",
        heading: "Scalable Mobility Solutions.",
        description: "Description of services goes here.",
      },
      items: [],
      settings: { columns: "3", showHeader: true },
      appearance: { theme: "dark" },
    }),
  },
  {
    type: "mediaContent",
    label: "Media + Content",
    description: "Two-column layout with media and rich text content",
    icon: "PanelLeft",
    variants: [
      { value: "media-right", label: "Media Right" },
      { value: "media-left", label: "Media Left" },
    ],
    defaults: () => ({
      id: `sec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: "mediaContent",
      variant: "media-right",
      order: 0,
      enabled: true,
      content: {
        eyebrow: "Feature",
        heading: "Feature Heading.",
        description: "Feature description.",
        items: [],
      },
      items: [],
      settings: { mediaPosition: "right", containerWidth: "default" },
      appearance: { theme: "darker", pattern: false },
    }),
  },
  {
    type: "fleetGrid",
    label: "Fleet Grid",
    description: "Vehicle cards grid with capacity and booking",
    icon: "Car",
    variants: [
      { value: "4-column", label: "4 Column" },
      { value: "3-column", label: "3 Column" },
    ],
    defaults: () => ({
      id: `sec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: "fleetGrid",
      variant: "4-column",
      order: 0,
      enabled: true,
      content: {
        eyebrow: "Fleet",
        heading: "Our Fleet.",
        description: "Fleet description.",
      },
      items: [],
      settings: { columns: "4" },
      appearance: { theme: "darker" },
    }),
  },
  {
    type: "contactForm",
    label: "Contact Form",
    description: "Corporate account application form",
    icon: "FileText",
    variants: [
      { value: "corporate", label: "Corporate" },
      { value: "simple", label: "Simple" },
    ],
    defaults: () => ({
      id: `sec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: "contactForm",
      variant: "corporate",
      order: 0,
      enabled: true,
      content: {
        eyebrow: "Partner With Us",
        heading: "Enterprise Procurement.",
        description: "Connect with our enterprise procurement team.",
        icon: "briefcase",
        submitLabel: "Submit Procurement Request",
        successTitle: "Application Received",
        successMessage: "An enterprise account manager will contact you within 24 hours.",
      },
      items: [],
      settings: { layout: "centered" },
      appearance: { theme: "dark" },
    }),
  },
  {
    type: "faq",
    label: "FAQ",
    description: "Frequently asked questions accordion",
    icon: "HelpCircle",
    variants: [
      { value: "default", label: "Default Accordion" },
      { value: "compact", label: "Compact" },
    ],
    defaults: () => ({
      id: `sec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: "faq",
      variant: "default",
      order: 0,
      enabled: true,
      content: {
        eyebrow: "Knowledge Base",
        heading: "Frequently Asked Questions",
        description: "Detailed insights into our operations.",
        items: [],
      },
      items: [],
      settings: { variant: "default" },
      appearance: { theme: "darker" },
    }),
  },
  {
    type: "ctaBanner",
    label: "CTA Banner",
    description: "Call-to-action banner with heading and buttons",
    icon: "Megaphone",
    variants: [
      { value: "centered", label: "Centered" },
    ],
    defaults: () => ({
      id: `sec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: "ctaBanner",
      variant: "centered",
      order: 0,
      enabled: true,
      content: {
        heading: "Ready to Get Started?",
        description: "Contact us today.",
      },
      items: [],
      settings: { layout: "centered" },
      appearance: { theme: "dark" },
    }),
  },
];

export function getSectionConfig(type: SectionType): SectionTypeConfig | undefined {
  return SECTION_TYPES.find((s) => s.type === type);
}
