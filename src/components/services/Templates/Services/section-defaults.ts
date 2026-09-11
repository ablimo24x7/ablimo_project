import type { PageSection } from "@/components/services/sections/section-types";

export interface TemplatePreset {
  name: string;
  description: string;
  icon: string;
  sections: PageSection[];
}

function genId(): string {
  return `sec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function genItemId(): string {
  return `itm-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// ── Corporate Service Template ───────────────────────────────────

export const corporateTemplate: TemplatePreset = {
  name: "Corporate Service",
  description: "Full corporate mobility page with hero, cards, media, fleet, form, FAQ",
  icon: "Briefcase",
  sections: [
    {
      id: genId(),
      type: "hero",
      variant: "background-content",
      order: 0,
      enabled: true,
      content: {
        eyebrow: "B2B Mobility Framework",
        title: "Executive & Corporate",
        titleHighlight: "Mobility Solutions.",
        description: "Designed for the modern enterprise. We provide seamless As-Directed chauffeur services, rigorous Duty of Care compliance, and direct integration with your corporate expense systems across the GCC.",
      },
      items: [
        { label: "Request Enterprise Procurement", href: "#corporate-account", style: "primary", icon: "ArrowRight", iconPosition: "right" },
        { label: "Explore Corporate Services", href: "#services", style: "secondary" },
        { label: "24/7 Command Center", href: "#faq", style: "link", icon: "Headset", iconPosition: "left" },
      ],
      settings: { minHeight: "85vh", overlayOpacity: 85, contentPosition: "left", buttonLayout: "row" },
      appearance: { theme: "darker", background: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", padding: "none", border: false, textAlign: "left", overlayGradient: "default" },
    },
    {
      id: genId(),
      type: "serviceCards",
      variant: "3-column",
      order: 1,
      enabled: true,
      content: {
        eyebrow: "Enterprise Core Services",
        heading: "Scalable Mobility for the Boardroom and Beyond.",
        description: "From dedicated C-suite transport to daily workforce shuttles, our architecture adapts to the complex requirements of global organizations operating in Saudi Arabia, UAE, and Qatar.",
        sectionCta: {
          label: "Download Services Brochure (PDF)",
          href: "#corporate-account",
          style: "outline",
          icon: "Download",
        },
        bottomCta: {
          label: "Consult an Enterprise Mobility Expert",
          href: "#corporate-account",
          style: "primary",
          icon: "ArrowRight",
        },
      },
      items: [
        { id: genItemId(), icon: "UserTie", title: "VIP & Corporate Chauffeur", description: "Standardized, premium point-to-point transfers for executives and stakeholders, ensuring absolute punctuality and discretion.", actions: [{ label: "View Governance", href: "#", style: "accent", icon: "ChevronRight" }, { label: "Book Executive Transfer", href: "#corporate-account", style: "text", icon: "CalendarCheck" }] },
        { id: genItemId(), icon: "Clock", title: "As-Directed (Hourly)", description: "Flexible, dedicated chauffeur-on-standby service. Ideal for executives with fluid schedules, multiple meetings, or diplomatic protocol.", actions: [{ label: "View Fleet Specs", href: "#", style: "accent", icon: "ChevronRight" }, { label: "Request Standby Chauffeur", href: "#corporate-account", style: "text", icon: "Timer" }] },
        { id: genItemId(), icon: "Route", title: "Business Roadshow Logistics", description: "Complex multi-stop coordination orchestrated by our central control room. Perfect for financial roadshows and investor tours.", actions: [{ label: "Consult Dispatch", href: "#", style: "accent", icon: "ChevronRight" }, { label: "Plan Roadshow Route", href: "#corporate-account", style: "text", icon: "MapLocationDot" }] },
        { id: genItemId(), icon: "Bus", title: "Staff Shuttle Services", description: "Daily workforce transportation and executive commuter programs utilizing our premium coach and mini-bus fleet.", actions: [{ label: "Route Planning", href: "#", style: "accent", icon: "ChevronRight" }, { label: "Request Commuter Audit", href: "#corporate-account", style: "text", icon: "Users" }] },
        { id: genItemId(), icon: "FileText", title: "Long-Term Transportation Contracts", description: "Dedicated fleet procurement and long-term vehicle leasing complete with vetted chauffeurs for government contracts and mega-projects.", wide: true, actions: [{ label: "Submit RFP", href: "#corporate-account", style: "accent", icon: "ChevronRight" }, { label: "Speak to B2B Sales", href: "#corporate-account", style: "text", icon: "Briefcase" }] },
      ],
      settings: { columns: "3", showHeader: true },
      appearance: { theme: "dark", padding: "lg", border: true, textAlign: "center" },
    },
    {
      id: genId(),
      type: "mediaContent",
      variant: "media-right",
      order: 2,
      enabled: true,
      content: {
        eyebrow: "Uncompromising Duty of Care",
        heading: "Corporate Technology & Security Integration.",
        description: "We don't just provide vehicles; we integrate directly into your corporate risk management and expense software. Our platform is built to satisfy the stringent requirements of Fortune 500 procurement teams.",
        mediaTitle: "AB.Limo Command Center",
        items: [
          { id: genItemId(), icon: "FileInvoiceDollar", heading: "SAP Concur & Expense Integration", description: "Automated e-receipts, centralized corporate billing, and custom cost-center coding to eliminate friction for travel arrangers." },
          { id: genItemId(), icon: "SatelliteDish", heading: "Intelligent Transport Systems (ITS)", description: "Live GPS tracking and central control room dispatch allowing your corporate security teams to monitor executive movements in real-time." },
          { id: genItemId(), icon: "IdCardClip", heading: "Vetted Professionalism & NDAs", description: "Mandatory comprehensive background checks, defensive driving certifications, and strict Non-Disclosure Agreements for all chauffeurs." },
        ],
        actions: [
          { label: "Request Security Clearances & Docs", href: "#corporate-account", style: "outline", icon: "FileShield" },
          { label: "View Compliance FAQs", href: "#faq", style: "secondary" },
        ],
      },
      items: [],
      settings: { mediaPosition: "right", containerWidth: "default" },
      appearance: { theme: "darker", pattern: true, background: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", padding: "lg", border: true, textAlign: "left" },
    },
    {
      id: genId(),
      type: "fleetGrid",
      variant: "4-column",
      order: 3,
      enabled: true,
      content: {
        eyebrow: "Corporate Fleet Governance",
        heading: "Strictly Black. Strictly Professional.",
        description: "We adhere to a rigid visual standard. Our corporate fleet consists exclusively of late-model, immaculate black vehicles.",
        headerAction: { label: "View Full Fleet Specifications", href: "#" },
        bottomCta: { label: "Book a Fleet Demonstration", href: "#corporate-account", style: "secondary", icon: "CarSide" },
      },
      items: [
        { id: genItemId(), badge: "Executive Mobility", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop&q=80", imageAlt: "Mercedes S-Class Black", category: "Executive Sedan", name: "Mercedes S-Class (Black)", capacity: "3 Pax", bags: "2 Bags", capacityIcon: "UserTie", bagsIcon: "Briefcase", actions: [{ label: "Request Allocation", href: "#corporate-account" }] },
        { id: genItemId(), badge: "Roadshow / Protocol", image: "https://images.unsplash.com/photo-1574729418529-d1a8cc214ef6?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", imageAlt: "Cadillac Escalade Black", category: "Executive SUV", name: "Cadillac Escalade (Black)", capacity: "6 Pax", bags: "5 Bags", capacityIcon: "UserTie", bagsIcon: "Briefcase", actions: [{ label: "Request Allocation", href: "#corporate-account" }] },
        { id: genItemId(), badge: "Corporate Group", image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&h=400&fit=crop&q=80", imageAlt: "Mercedes V-Class Black", category: "Premium MPV", name: "Mercedes V Class (Black)", capacity: "6 Pax", bags: "5 Bags", capacityIcon: "UsersViewfinder", bagsIcon: "Briefcase", actions: [{ label: "Request Allocation", href: "#corporate-account" }] },
        { id: genItemId(), badge: "Staff Shuttle / Events", badgeStyle: "accent", image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&h=400&fit=crop&q=80", imageAlt: "Mercedes Sprinter Black", category: "Executive Van", name: "Mercedes Sprinter (Black)", capacity: "14 Pax", bags: "10 Bags", capacityIcon: "Users", bagsIcon: "Briefcase", actions: [{ label: "Request Allocation", href: "#corporate-account" }] },
      ],
      settings: { columns: "4" },
      appearance: { theme: "darker", padding: "lg", border: true, textAlign: "left" },
    },
    {
      id: genId(),
      type: "contactForm",
      variant: "corporate",
      order: 4,
      enabled: true,
      content: {
        eyebrow: "Partner With Us",
        heading: "Enterprise Procurement.",
        description: "Connect with our enterprise procurement team for dedicated account management, centralized billing, and priority fleet access.",
        icon: "Briefcase",
        submitLabel: "Submit Procurement Request",
        successTitle: "Application Received",
        successMessage: "An enterprise account manager will contact you within 24 hours.",
      },
      items: [],
      settings: { layout: "centered" },
      appearance: { theme: "dark", padding: "lg", border: true, textAlign: "left" },
    },
    {
      id: genId(),
      type: "faq",
      variant: "default",
      order: 5,
      enabled: true,
      content: {
        eyebrow: "Knowledge Base",
        heading: "Frequently Asked Questions",
        description: "Detailed insights into our corporate operations, billing frameworks, and procurement standards.",
        items: [
          { id: genItemId(), question: "How does the SAP Concur integration work?", answer: "Upon establishing a corporate account, your unique API key allows AB.Limo to automatically route e-receipts and expense data directly into your SAP Concur dashboard. We map charges to your designated cost-centers instantly, completely eliminating manual expense reporting for your executives." },
          { id: genItemId(), question: "What are your Duty of Care and vetting standards?", answer: "We exceed global enterprise standards. All AB.Limo chauffeurs undergo exhaustive background screenings, hold valid defensive driving certifications, and sign strict NDAs. Our vehicles are subject to rigorous preventative maintenance schedules and are tracked 24/7 via our central Intelligent Transport System (ITS)." },
          { id: genItemId(), question: "Do you provide customized Long-Term Transportation Contracts?", answer: "Yes. We architect long-term lease structures inclusive of dedicated black fleets and vetted chauffeurs. These contracts are heavily utilized by government ministries, embassy protocol divisions, and mega-project workforce organizers requiring reliable, scalable mobility solutions over 1-5 year periods." },
          { id: genItemId(), question: "Can you support large-scale financial roadshows across multiple GCC cities?", answer: "Absolutely. Our As-Directed service and business roadshow logistics are designed specifically for complex, multi-stop itineraries. Our Transport Control Room handles dynamic routing, coordinating directly with your executive assistants to ensure seamless transitions between meetings in Riyadh, Dubai, Doha, and beyond." },
        ],
      },
      items: [
        { label: "Call Support", href: "tel:+966500000000", style: "secondary", icon: "Phone" },
        { label: "Open Support Ticket", href: "#corporate-account", style: "primary", icon: "ArrowRight" },
      ],
      settings: { variant: "default" },
      appearance: { theme: "darker", padding: "lg", border: true, textAlign: "center" },
    },
  ],
};

// ── Available Presets ────────────────────────────────────────────

export const TEMPLATE_PRESETS: TemplatePreset[] = [
  corporateTemplate,
  {
    name: "Airport Service",
    description: "Airport transfers with hero, features, and FAQ",
    icon: "Plane",
    sections: [
      corporateTemplate.sections[0],
      corporateTemplate.sections[1],
      corporateTemplate.sections[5],
    ],
  },
  {
    name: "Blank Service",
    description: "Start from scratch with just a hero section",
    icon: "File",
    sections: [corporateTemplate.sections[0]],
  },
];

// ── Migration: Convert flat service data to sections ─────────────

export function migrateFlatServiceToSections(doc: Record<string, unknown>): PageSection[] {
  const sections: PageSection[] = [];

  sections.push({
    id: genId(),
    type: "hero",
    variant: "background-content",
    order: 0,
    enabled: true,
    content: {
      eyebrow: "Premium Mobility",
      title: doc.title || "",
      titleHighlight: "",
      description: doc.subtitle || "",
    },
    items: [
      { label: "Get Started", href: "#contact", style: "primary", icon: "ArrowRight", iconPosition: "right" },
    ],
    settings: { minHeight: "85vh", overlayOpacity: 85, contentPosition: "left", buttonLayout: "row" },
    appearance: { theme: "darker", background: doc.heroImage || "", padding: "none", border: false, textAlign: "left", overlayGradient: "default" },
  });

  const features = doc.features as Array<{ icon?: string; title?: string; desc?: string }> | undefined;
  if (features && features.length > 0) {
    sections.push({
      id: genId(),
      type: "serviceCards",
      variant: "3-column",
      order: 1,
      enabled: true,
      content: {
        eyebrow: "Our Services",
        heading: `${doc.title} Features.`,
        description: doc.subtitle || "",
      },
      items: features.map((f) => ({
        id: genItemId(),
        icon: f.icon || "Shield",
        title: f.title || "",
        description: f.desc || "",
        actions: [],
      })),
      settings: { columns: "3", showHeader: true },
      appearance: { theme: "dark", padding: "lg", border: true, textAlign: "center" },
    });
  }

  const flatSections = doc.sections as Array<{
    image?: string; imageAlt?: string; title?: string;
    paragraphs?: string[]; bullets?: Array<{ text?: string }>;
    imageSide?: string; dark?: boolean;
  }> | undefined;
  if (flatSections && flatSections.length > 0) {
    flatSections.forEach((s, i) => {
      sections.push({
        id: genId(),
        type: "mediaContent",
        variant: s.imageSide === "right" ? "media-right" : "media-left",
        order: 2 + i,
        enabled: true,
        content: {
          heading: s.title || "",
          description: (s.paragraphs || []).join("\n\n"),
          items: (s.bullets || []).map((b) => ({
            id: genItemId(),
            icon: "CheckCircle",
            heading: b.text || "",
            description: "",
          })),
        },
        items: [],
        settings: { mediaPosition: s.imageSide === "right" ? "right" : "left", containerWidth: "default" },
        appearance: { theme: s.dark ? "darker" : "dark", background: s.image || "", padding: "lg", border: true, textAlign: "left" },
      });
    });
  }

  const faqs = doc.faqs as Array<{ q?: string; a?: string }> | undefined;
  if (faqs && faqs.length > 0) {
    sections.push({
      id: genId(),
      type: "faq",
      variant: "default",
      order: sections.length,
      enabled: true,
      content: {
        eyebrow: "Knowledge Base",
        heading: "Frequently Asked Questions",
        description: "",
        items: faqs.map((f) => ({
          id: genItemId(),
          question: f.q || "",
          answer: f.a || "",
        })),
      },
      items: [],
      settings: { variant: "default" },
      appearance: { theme: "darker", padding: "lg", border: true, textAlign: "center" },
    });
  }

  if (doc.ctaTitle) {
    sections.push({
      id: genId(),
      type: "ctaBanner",
      variant: "centered",
      order: sections.length,
      enabled: true,
      content: {
        heading: doc.ctaTitle || "",
        description: doc.ctaDesc || "",
      },
      items: [
        { label: doc.ctaLabel || "Get Started", href: doc.ctaHref || "#contact", style: "primary", icon: "ArrowRight" },
      ],
      settings: { layout: "centered" },
      appearance: { theme: "dark", padding: "lg", border: true, textAlign: "center" },
    });
  }

  return sections;
}
