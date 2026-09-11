import type { PageSection } from "@/components/services/sections/section-types";

export interface CityTemplatePreset {
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

// ── Corporate City Service Template ──────────────────────────────
// Full replica of the Riyadh Corporate Mobility HTML page
// Uses PageSection types: hero, serviceCards, mediaContent, fleetGrid, contactForm, faq, ctaBanner

export const corporateCityTemplate: CityTemplatePreset = {
  name: "Corporate City Service",
  description: "Full corporate city page — hero, service cards, media sections, fleet, contact form, FAQ",
  icon: "Building",
  sections: [
    // ── Section 0: Hero ────────────────────────────────────────
    {
      id: genId(),
      type: "hero",
      variant: "background-content",
      order: 0,
      enabled: true,
      content: {
        eyebrow: "Capital Operations",
        title: "Mastering Mobility",
        titleHighlight: "in Riyadh.",
        description: "The nerve center of AB.Limo operations. We provide military-precision executive transport, Diplomatic Quarter access, RUH Aviation transfers, and massive event logistics for Riyadh Season and the FII.",
      },
      items: [
        { label: "Request RUH Procurement", href: "#corporate-account", style: "primary", icon: "ArrowRight", iconPosition: "right" },
        { label: "Explore Riyadh Services", href: "#ruh-services", style: "secondary" },
      ],
      settings: { minHeight: "100vh", overlayOpacity: 85, contentPosition: "left", buttonLayout: "row" },
      appearance: { theme: "darker", background: "https://images.unsplash.com/photo-1588726588629-19e48f7d9834?ixlib=rb-4.0.3&auto=format&fit=crop&w=2500&q=80", padding: "none", border: false, textAlign: "left", overlayGradient: "default" },
    },

    // ── Section 1: Marquee — Client Ticker ─────────────────────
    {
      id: genId(),
      type: "marquee",
      variant: "default",
      order: 1,
      enabled: true,
      content: {
        items: [
          { id: genItemId(), icon: "Building", label: "KAFD Financial Institutions" },
          { id: genItemId(), icon: "Plane", label: "King Khalid Int'l (RUH) FBO" },
          { id: genItemId(), icon: "Calendar", label: "Riyadh Season Organizers" },
          { id: genItemId(), icon: "Shield", label: "Diplomatic Missions" },
          { id: genItemId(), icon: "HardHat", label: "Diriyah Gate Projects" },
        ],
      },
      items: [],
      settings: { speed: "normal", opacity: 50 },
      appearance: { theme: "darker", padding: "none", border: false, textAlign: "center" },
    },

    // ── Section 2: Service Cards — Capital Operations ───────────
    {
      id: genId(),
      type: "serviceCards",
      variant: "3-column",
      order: 2,
      enabled: true,
      content: {
        eyebrow: "Capital Operations",
        heading: "Engineered for Riyadh's Infrastructure.",
        description: "From the tarmac at RUH to secure access in the Diplomatic Quarter, our dispatchers understand Riyadh's unique traffic flows, security perimeters, and protocol requirements.",
        sectionCta: { label: "Book Riyadh Chauffeur", href: "#corporate-account", style: "outline", icon: "CalendarCheck" },
        bottomCta: { label: "Read RUH FAQs", href: "#faq", style: "secondary", icon: "ArrowDown" },
      },
      items: [
        {
          id: genItemId(), icon: "Plane", title: "RUH Airport & FBO Meet & Greet",
          description: "Dedicated tarmac coordinators and VIP terminal access at King Khalid International Airport. Seamless transition from jet to executive vehicle.",
          actions: [
            { label: "Schedule Airport Pickup", href: "#corporate-account", style: "accent", icon: "ChevronRight" },
            { label: "View FBO Fleet", href: "#fleet", style: "text", icon: "Plane" },
          ],
        },
        {
          id: genItemId(), icon: "Building", title: "KAFD & Diplomatic Quarter",
          description: "Vetted chauffeurs with clearance to navigate the secure perimeters of the King Abdullah Financial District and the DQ. As-Directed hourly standby available.",
          actions: [
            { label: "Secure KAFD Chauffeur", href: "#corporate-account", style: "accent", icon: "ChevronRight" },
            { label: "Book As-Directed Service", href: "#corporate-account", style: "text", icon: "Clock" },
          ],
        },
        {
          id: genItemId(), icon: "Network", title: "Riyadh Season & FII Logistics",
          description: "Mass-scale transport orchestration. We deploy our Transport Control Room to manage VIP coach convoys and traffic routing for Riyadh's mega-events.",
          actions: [
            { label: "Consult Event Dispatch", href: "#video-showcase", style: "accent", icon: "ChevronRight" },
            { label: "Request VIP Bus Charter", href: "#corporate-account", style: "text", icon: "Bus" },
          ],
        },
      ],
      settings: { columns: "3", showHeader: true },
      appearance: { theme: "dark", padding: "lg", border: true, textAlign: "center" },
    },

    // ── Section 3: Media Content — Vision 2030 (media right) ────
    {
      id: genId(),
      type: "mediaContent",
      variant: "media-right",
      order: 3,
      enabled: true,
      content: {
        eyebrow: "Infrastructure Alignment",
        heading: "Powering Riyadh's Vision 2030 Corporate Ecosystem.",
        description: "As the Kingdom undergoes unprecedented economic diversification under the Vision 2030 mandate, the demands on Riyadh's corporate travel infrastructure have evolved exponentially. AB.Limo operates at the nexus of this transformation, providing highly secure, scalable, and meticulously managed executive mobility solutions for multinational corporations entering the Saudi market.\n\nOur strategic dispatch capabilities are engineered specifically for the capital's premier economic hubs. We maintain a continuous, vetted presence within the King Abdullah Financial District (KAFD), offering seamless, secure transitions between architectural marvels and corporate headquarters.",
        items: [
          { id: genItemId(), icon: "Building", heading: "KAFD Operations", description: "Dedicated fleet positioning for immediate financial district deployments." },
          { id: genItemId(), icon: "Passport", heading: "DQ Protocol", description: "Vetted personnel trained in embassy and diplomatic security standards." },
        ],
        actions: [
          { label: "Explore City Operations", href: "#ruh-services", style: "outline", icon: "ArrowRight" },
        ],
      },
      items: [],
      settings: { mediaPosition: "right", containerWidth: "default" },
      appearance: { theme: "darker", pattern: true, background: "https://images.unsplash.com/photo-1588726588629-19e48f7d9834?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", padding: "lg", border: true, textAlign: "left" },
    },

    // ── Section 4: Media Content — Event Logistics (media left) ──
    {
      id: genId(),
      type: "mediaContent",
      variant: "media-left",
      order: 4,
      enabled: true,
      content: {
        heading: "Orchestrating Mega-Events: FII & Riyadh Season.",
        description: "Riyadh is the undisputed epicenter of global summits and mega-events in the Middle East. When global investors converge for the Future Investment Initiative (FII) or millions of visitors attend Riyadh Season and LEAP, the logistical demands on ground transportation are monumental.\n\nAB.Limo does not merely supply vehicles; we deploy comprehensive Event Transportation Management architecture. Our centralized Transport Control Room utilizes live telemetry to orchestrate massive VIP coach charters, executive van convoys, and individual VIP transfers.",
        items: [],
        actions: [
          { label: "Download Event Logistics RFP Guide", href: "#corporate-account", style: "outline", icon: "Download" },
        ],
      },
      items: [],
      settings: { mediaPosition: "left", containerWidth: "default" },
      appearance: { theme: "dark", background: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", padding: "lg", border: true, textAlign: "left" },
    },

    // ── Section 5: Media Content — Aviation (media right) ────────
    {
      id: genId(),
      type: "mediaContent",
      variant: "media-right",
      order: 5,
      enabled: true,
      content: {
        heading: "RUH Aviation: Tarmac to Boardroom.",
        description: "First impressions in the capital dictate the tone of entire business engagements. Our operations at King Khalid International Airport (RUH) are designed to completely insulate arriving executives from the friction of international travel.\n\nOur aviation logistics team specializes in premium Meet & Greet services and VIP terminal coordination. We hold direct operational relationships with RUH Fixed-Base Operators (FBOs), allowing us to execute seamless private aviation transfers directly from the tarmac.",
        items: [],
        actions: [
          { label: "Set up RUH Airport Billing", href: "#corporate-account", style: "outline", icon: "ArrowRight" },
        ],
      },
      items: [],
      settings: { mediaPosition: "right", containerWidth: "default" },
      appearance: { theme: "darker", background: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", padding: "lg", border: true, textAlign: "left" },
    },

    // ── Section 6: Media Content — Financial Roadshows (media left)
    {
      id: genId(),
      type: "mediaContent",
      variant: "media-left",
      order: 6,
      enabled: true,
      content: {
        eyebrow: "Corporate Agility",
        heading: "Financial Roadshows & As-Directed Mobility.",
        description: "Executing a successful financial roadshow in Riyadh requires more than transportation; it demands absolute fluidity. The capital's economic hubs, stretching from the Olaya District along King Fahd Road to the northern financial corridors, are prone to dense traffic patterns.\n\nOur As-Directed (Hourly) Chauffeur Service is engineered for C-suite executives and investment bankers operating on dynamic, unpredictable schedules. A dedicated, premium vehicle remains on continuous standby at your location.",
        items: [],
        actions: [
          { label: "Book an As-Directed Chauffeur", href: "#corporate-account", style: "outline", icon: "ArrowRight" },
        ],
      },
      items: [],
      settings: { mediaPosition: "left", containerWidth: "default" },
      appearance: { theme: "darker", background: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", padding: "lg", border: true, textAlign: "left" },
    },

    // ── Section 7: Media Content — Giga Projects (media right) ──
    {
      id: genId(),
      type: "mediaContent",
      variant: "media-right",
      order: 7,
      enabled: true,
      content: {
        eyebrow: "PIF Infrastructure",
        heading: "Logistics for Diriyah Gate & Mega-Projects.",
        description: "The rapid expansion of the Public Investment Fund (PIF) giga-projects has reshaped the outskirts of Riyadh. From the historic, cultural epicenter of Diriyah Gate to the expansive entertainment blueprint of Qiddiya, moving executive engineering teams and stakeholders requires highly specialized ground transport.\n\nAB.Limo deploys a dedicated fleet of executive SUVs and robust premium vans specifically suited for developing infrastructure zones. We offer Long-Term Transportation Contracts and daily executive shuttles that bridge the gap between central Riyadh hotels and remote project sites.",
        items: [],
        actions: [
          { label: "Request Long-Term Fleet Lease", href: "#corporate-account", style: "outline", icon: "ArrowRight" },
        ],
      },
      items: [],
      settings: { mediaPosition: "right", containerWidth: "default" },
      appearance: { theme: "dark", background: "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", padding: "lg", border: true, textAlign: "left" },
    },

    // ── Section 8: Media Content — Diplomatic Protocol (media left)
    {
      id: genId(),
      type: "mediaContent",
      variant: "media-left",
      order: 8,
      enabled: true,
      content: {
        eyebrow: "Government Mobility",
        heading: "Royal Protocol & Diplomatic Missions.",
        description: "The Diplomatic Quarter (DQ) in Riyadh is subject to some of the most rigorous security and access regulations in the Middle East. AB.Limo acts as the trusted mobility partner for foreign embassies, international NGO delegations, and visiting state dignitaries.\n\nOur chauffeurs are extensively vetted, holding the necessary national security clearances and IDs required for seamless, unhindered access through DQ security checkpoints. We provide Government & Embassy Transportation that strictly adheres to international protocol standards.",
        items: [],
        actions: [
          { label: "Discuss Embassy Transport Contracts", href: "#corporate-account", style: "outline", icon: "ArrowRight" },
        ],
      },
      items: [],
      settings: { mediaPosition: "left", containerWidth: "default" },
      appearance: { theme: "darker", background: "https://images.unsplash.com/photo-1575424783321-729c1d3bf7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", padding: "lg", border: true, textAlign: "left" },
    },

    // ── Section 9: Media Content — Chauffeur Vetting (media right)
    {
      id: genId(),
      type: "mediaContent",
      variant: "media-right",
      order: 9,
      enabled: true,
      content: {
        eyebrow: "Executive Protection",
        heading: "Elite Vetting & TGA Compliance.",
        description: "In the realm of enterprise mobility, the chauffeur is the ultimate failsafe. AB.Limo does not employ standard drivers; we deploy highly trained executive chauffeurs. We operate in absolute compliance with the Saudi Transport General Authority (TGA), enforcing a zero-tolerance policy for regulatory infractions.\n\nOur proprietary vetting matrix includes exhaustive criminal background checks, motor vehicle record auditing, and mandatory defensive driving certifications. Furthermore, every chauffeur signs legally binding Non-Disclosure Agreements (NDAs).",
        items: [],
        actions: [
          { label: "Review Security Documentation", href: "#corporate-account", style: "outline", icon: "ArrowRight" },
        ],
      },
      items: [],
      settings: { mediaPosition: "right", containerWidth: "default" },
      appearance: { theme: "dark", background: "https://images.unsplash.com/photo-1559132152-78d10b0a8801?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", padding: "lg", border: true, textAlign: "left" },
    },

    // ── Section 10: Media Content — Intercity Transfers (media left)
    {
      id: genId(),
      type: "mediaContent",
      variant: "media-left",
      order: 10,
      enabled: true,
      content: {
        eyebrow: "National Network",
        heading: "Intercity Transfers & GCC Connectivity.",
        description: "While Riyadh serves as our central nervous system, enterprise operations frequently require seamless movement across the Kingdom. We provide highly comfortable, premium Intercity Transfers utilizing our flagship Mercedes S-Class sedans and V-Class MPVs.\n\nWhether you require a secure executive transfer from Riyadh to Dammam for an Aramco site visit, or a cross-country transit to Jeddah, our long-distance mobility solutions remove the friction of domestic air travel.",
        items: [],
        actions: [
          { label: "Coordinate Intercity Route", href: "#corporate-account", style: "outline", icon: "ArrowRight" },
        ],
      },
      items: [],
      settings: { mediaPosition: "left", containerWidth: "default" },
      appearance: { theme: "darker", background: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", padding: "lg", border: true, textAlign: "left" },
    },

    // ── Section 11: Media Content — Video Showcase (media right) ─
    {
      id: genId(),
      type: "mediaContent",
      variant: "media-right",
      order: 11,
      enabled: true,
      content: {
        eyebrow: "Transport Control Room",
        heading: "Monitoring Riyadh Traffic in Real-Time.",
        description: "Navigating Riyadh during the FII or LEAP tech conference requires immense coordination. Our local command center monitors live telemetry, adjusts routing for VIP convoys dynamically, and communicates directly with event security.",
        items: [],
        actions: [
          { label: "Request Event Logistics Audit", href: "#corporate-account", style: "outline", icon: "ArrowRight" },
        ],
      },
      items: [],
      settings: { mediaPosition: "right", containerWidth: "default" },
      appearance: { theme: "darker", background: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", padding: "lg", border: true, textAlign: "left" },
    },

    // ── Section 12: Media Content — Duty of Care (media left) ───
    {
      id: genId(),
      type: "mediaContent",
      variant: "media-left",
      order: 12,
      enabled: true,
      content: {
        eyebrow: "Duty of Care Integration",
        heading: "Security & Compliance in the Capital.",
        description: "Exceeding Fortune 500 enterprise standards while strictly adhering to Riyadh's Transport General Authority (TGA) local regulations.",
        items: [
          { id: genItemId(), icon: "FileInvoiceDollar", heading: "SAP Concur Integration", description: "Automated VAT-compliant e-receipts and centralized corporate billing mapped to KSA cost centers." },
          { id: genItemId(), icon: "SatelliteDish", heading: "Intelligent Transport System", description: "Live GPS tracking for risk management and real-time executive movement monitoring." },
          { id: genItemId(), icon: "IdCardClip", heading: "Chauffeur Vetting & NDAs", description: "Riyadh Saudization compliance with exhaustive background checks and strict NDAs." },
        ],
        actions: [
          { label: "Request Riyadh Compliance Docs", href: "#corporate-account", style: "outline", icon: "Download" },
        ],
      },
      items: [],
      settings: { mediaPosition: "left", containerWidth: "default" },
      appearance: { theme: "dark", pattern: true, padding: "lg", border: true, textAlign: "left" },
    },

    // ── Section 13: Fleet Grid ──────────────────────────────────
    {
      id: genId(),
      type: "fleetGrid",
      variant: "4-column",
      order: 13,
      enabled: true,
      content: {
        eyebrow: "Riyadh Fleet Governance",
        heading: "Strictly Black. TGA Compliant.",
        description: "Our corporate fleet stationed in Riyadh consists exclusively of late-model, immaculate black vehicles. Fully licensed to global executive standards to navigate the capital safely.",
        headerAction: { label: "Request Fleet Allocation", href: "#corporate-account" },
        bottomCta: { label: "Consult our Riyadh Fleet Procurement Team", href: "#corporate-account", style: "secondary", icon: "ArrowRight" },
      },
      items: [
        {
          id: genItemId(), badge: "KAFD Executive", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop&q=80",
          imageAlt: "Black Mercedes S-Class Riyadh", category: "Executive Sedan", name: "Mercedes S-Class (Black)",
          capacity: "3 Pax", bags: "2 Bags", capacityIcon: "UserTie", bagsIcon: "Briefcase",
          actions: [{ label: "Book S-Class in RUH", href: "#corporate-account" }],
        },
        {
          id: genItemId(), badge: "FII Roadshow", image: "https://images.unsplash.com/photo-1574729418529-d1a8cc214ef6?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          imageAlt: "Black Cadillac Escalade Riyadh", category: "Executive SUV", name: "Cadillac Escalade (Black)",
          capacity: "6 Pax", bags: "5 Bags", capacityIcon: "UserTie", bagsIcon: "Briefcase",
          actions: [{ label: "Book SUV in RUH", href: "#corporate-account" }],
        },
        {
          id: genItemId(), badge: "Diriyah Group", image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&h=400&fit=crop&q=80",
          imageAlt: "Black Mercedes V Class Riyadh", category: "Premium MPV", name: "Mercedes V Class (Black)",
          capacity: "6 Pax", bags: "5 Bags", capacityIcon: "Users", bagsIcon: "Briefcase",
          actions: [{ label: "Book V-Class in RUH", href: "#corporate-account" }],
        },
        {
          id: genItemId(), badge: "Riyadh Season", badgeStyle: "accent", image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&h=400&fit=crop&q=80",
          imageAlt: "Black Mercedes Sprinter Riyadh", category: "Executive Van", name: "Mercedes Sprinter (Black)",
          capacity: "14 Pax", bags: "10 Bags", capacityIcon: "Users", bagsIcon: "Briefcase",
          actions: [{ label: "Book Van in RUH", href: "#corporate-account" }],
        },
      ],
      settings: { columns: "4" },
      appearance: { theme: "darker", padding: "lg", border: true, textAlign: "left" },
    },

    // ── Section 14: Contact Form ────────────────────────────────
    {
      id: genId(),
      type: "contactForm",
      variant: "corporate",
      order: 14,
      enabled: true,
      content: {
        eyebrow: "Riyadh Procurement",
        heading: "Open a RUH Corporate Account.",
        description: "Connect with our Riyadh-based enterprise team for centralized local billing and priority fleet access.",
        icon: "Briefcase",
        submitLabel: "Submit Riyadh Request",
        successTitle: "Riyadh Application Received",
        successMessage: "Our Riyadh enterprise account manager will contact you within 24 hours.",
      },
      items: [],
      settings: { layout: "centered" },
      appearance: { theme: "dark", padding: "lg", border: true, textAlign: "left" },
    },

    // ── Section 15: FAQ ────────────────────────────────────────
    {
      id: genId(),
      type: "faq",
      variant: "default",
      order: 15,
      enabled: true,
      content: {
        eyebrow: "Riyadh Knowledge Base",
        heading: "Frequently Asked Questions",
        description: "Detailed insights into our operations at RUH Airport, KAFD, and Riyadh mega-events.",
        items: [
          {
            id: genItemId(),
            question: "Do your chauffeurs have tarmac or VIP access at King Khalid International Airport (RUH)?",
            answer: "Yes, we coordinate directly with RUH FBOs (Fixed-Base Operators) and VIP terminals. For private aviation and diplomatic arrivals, our dispatch team ensures vetted chauffeurs are positioned appropriately for seamless Meet & Greet services upon landing.",
          },
          {
            id: genItemId(),
            question: "Can you manage transport convoys for the Future Investment Initiative (FII) in Riyadh?",
            answer: "This is a core competency. During major summits like FII or LEAP, we activate our Transport Control Room. We coordinate VIP coach charters and executive sedans, utilizing live GPS tracking to navigate road closures and align with local security protocols.",
          },
          {
            id: genItemId(),
            question: "Are your drivers cleared for entry into the Diplomatic Quarter (DQ) and KAFD?",
            answer: "Absolutely. All AB.Limo chauffeurs operating in Riyadh hold valid Saudi IDs and have undergone rigorous background checks. They are experienced in navigating the security checkpoints of both the DQ and the King Abdullah Financial District efficiently.",
          },
          {
            id: genItemId(),
            question: "Can I book an As-Directed (Hourly) chauffeur for multiple meetings across Riyadh?",
            answer: "Yes, our As-Directed service is the preferred option for corporate roadshows. A dedicated chauffeur remains on standby at your location, providing ultimate flexibility for executives navigating unpredictable meeting schedules across the capital.",
          },
        ],
      },
      items: [
        { label: "Call Riyadh Dispatch", href: "tel:+966500000000", style: "secondary", icon: "Phone" },
      ],
      settings: { variant: "default" },
      appearance: { theme: "darker", padding: "lg", border: true, textAlign: "center" },
    },
  ],
};

// ── Blank City Template ──────────────────────────────────────────

export const blankCityTemplate: CityTemplatePreset = {
  name: "Blank City Service",
  description: "Start from scratch with just a hero section",
  icon: "File",
  sections: [
    {
      id: genId(),
      type: "hero",
      variant: "background-content",
      order: 0,
      enabled: true,
      content: {
        eyebrow: "City Operations",
        title: "City Service",
        titleHighlight: "Title.",
        description: "Describe your city service here.",
      },
      items: [
        { label: "Get Started", href: "#contact", style: "primary", icon: "ArrowRight", iconPosition: "right" },
      ],
      settings: { minHeight: "85vh", overlayOpacity: 85, contentPosition: "left", buttonLayout: "row" },
      appearance: { theme: "darker", background: "", padding: "none", border: false, textAlign: "left", overlayGradient: "default" },
    },
  ],
};

// ── All City Templates ───────────────────────────────────────────

export const CITY_TEMPLATE_PRESETS: CityTemplatePreset[] = [
  corporateCityTemplate,
  blankCityTemplate,
];
