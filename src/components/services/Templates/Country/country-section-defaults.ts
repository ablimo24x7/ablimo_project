import type { PageSection } from "@/components/services/sections/section-types";

export interface CountryTemplatePreset {
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

// ── Corporate Country Service Template ────────────────────────────
// Structural replica of corporateCityTemplate with country-wise
// content. Written in UAE flagship voice — applying the preset in the
// dashboard localizes copy + images for the selected country via
// src/lib/country-localization.ts (UAE keeps this wording).
// Uses PageSection types: hero, marquee, serviceCards, textMediaGrid,
// mediaContent, fleetGrid, contactForm, faq.

export const corporateCountryTemplate: CountryTemplatePreset = {
  name: "Corporate Country Service",
  description:
    "Full country page — hero, service cards, media sections, fleet, contact form, FAQ",
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
        eyebrow: "National Operations",
        title: "Mastering Mobility",
        titleHighlight: "in the United Arab Emirates.",
        description:
          "The national command center of AB.Limo operations. We provide gateway-to-gateway airport transfers at every international terminal, intercity executive travel between major cities, government protocol mobility, and nationwide event logistics for expos, summits, and grand prix weekends.",
      },
      items: [
        {
          label: "Open a Corporate Account",
          href: "#corporate-account",
          style: "primary",
          icon: "ArrowRight",
          iconPosition: "right",
        },
        { label: "Explore Nationwide Services", href: "#services", style: "secondary" },
      ],
      settings: {
        minHeight: "100vh",
        overlayOpacity: 85,
        contentPosition: "left",
        buttonLayout: "row",
      },
      appearance: {
        theme: "darker",
        background:
          "https://images.unsplash.com/flagged/photo-1559717865-a99cac1c95d8?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0",
        padding: "none",
        border: false,
        textAlign: "left",
        overlayGradient: "default",
      },
    },

    // ── Section 1: Marquee — National Ticker ──────────────────
    {
      id: genId(),
      type: "marquee",
      variant: "default",
      order: 1,
      enabled: true,
      content: {
        items: [
          { id: genItemId(), icon: "Plane", label: "Dubai International (DXB)" },
          { id: genItemId(), icon: "Building", label: "Financial Districts" },
          { id: genItemId(), icon: "Calendar", label: "Expo City Dubai" },
          { id: genItemId(), icon: "Shield", label: "Government & Diplomatic Missions" },
          { id: genItemId(), icon: "Network", label: "Centennial 2071 National Programs" },
        ],
      },
      items: [],
      settings: { speed: "normal", opacity: 50 },
      appearance: { theme: "darker", padding: "none", border: false, textAlign: "center" },
    },

    // ── Section 2: Service Cards — Nationwide Coverage ────────
    {
      id: genId(),
      type: "serviceCards",
      variant: "3-column",
      order: 2,
      enabled: true,
      content: {
        eyebrow: "Nationwide Coverage",
        heading: "Engineered for the United Arab Emirates.",
        description:
          "From every international gateway to secure government quarters, our national dispatch desk understands each city's traffic flows, airport procedures, and security perimeters — coordinating seamless journeys between Dubai, Abu Dhabi, and every intercity corridor.",
        sectionCta: {
          label: "Book a National Chauffeur",
          href: "#corporate-account",
          style: "outline",
          icon: "CalendarCheck",
        },
        bottomCta: { label: "Read Nationwide FAQs", href: "#faq", style: "secondary", icon: "ArrowDown" },
      },
      items: [
        {
          id: genItemId(),
          icon: "Plane",
          title: "Gateway-to-Gateway Airport Transfers",
          description:
            "Meet & Greet and VIP terminal handling at Dubai International Airport (DXB) and every international gateway in the country, with tarmac coordination for private aviation.",
          actions: [
            { label: "Schedule Airport Pickup", href: "#corporate-account", style: "accent", icon: "ChevronRight" },
            { label: "View the Fleet", href: "#fleet", style: "text", icon: "Plane" },
          ],
        },
        {
          id: genItemId(),
          icon: "Route",
          title: "Intercity & Cross-Border Mobility",
          description:
            "Premium point-to-point transfers connecting Dubai with Sharjah and every major city — plus GCC land-border crossings with pre-cleared documentation.",
          actions: [
            { label: "Plan an Intercity Route", href: "#corporate-account", style: "accent", icon: "ChevronRight" },
            { label: "Consult Dispatch", href: "#corporate-account", style: "text", icon: "Clock" },
          ],
        },
        {
          id: genItemId(),
          icon: "Network",
          title: "Corporate, Government & Events",
          description:
            "As-Directed hourly standby around Expo City Dubai, protocol fleets for the capital, and mass-scale logistics for the country's mega-events and exhibitions.",
          actions: [
            { label: "Open a Corporate Account", href: "#corporate-account", style: "accent", icon: "ChevronRight" },
            { label: "Request Event Dispatch", href: "#corporate-account", style: "text", icon: "Bus" },
          ],
        },
      ],
      settings: { columns: "3", showHeader: true },
      appearance: { theme: "dark", padding: "lg", border: true, textAlign: "center" },
    },

    // ── Section 3: Text + Media Grid — National Vision ────────
    {
      id: genId(),
      type: "textMediaGrid",
      variant: "media-right",
      order: 3,
      enabled: true,
      content: {
        eyebrow: "National Infrastructure",
        eyebrowIcon: "Globe",
        heading: "Powering",
        headingHighlight: "Centennial 2071",
        headingAfter: "Corporate Ecosystem.",
        description:
          '<p class="mb-6 leading-relaxed">The United Arab Emirates — the region\'s premier business and tourism economy advancing its <strong>Centennial 2071</strong> agenda. As the nation diversifies, the demands on corporate travel infrastructure have evolved exponentially. AB.Limo operates at the nexus of this transformation, providing highly secure, scalable, and meticulously managed executive mobility solutions for multinational corporations entering the UAE market.</p>' +
          '<p class="mb-6 leading-relaxed">Our strategic dispatch capabilities span the entire country. We maintain a continuous, vetted presence around <strong>Dubai International Financial Centre (DIFC)</strong> and <strong>Expo City Dubai</strong>, linking commercial hubs, government centers, and corporate headquarters from Dubai to Sharjah. For international delegations and foreign missions, our chauffeurs hold the Emirates IDs and protocol knowledge required to operate across the nation\'s secure zones with absolute discretion.</p>' +
          '<p class="leading-relaxed">Beyond point-to-point transfers, our <em>As-Directed</em> hourly services give global executives the fluid mobility required to execute complex business roadshows nationwide — across Dubai International Financial Centre (DIFC) corridors, government quarters, and event venues — with seamless connections through Dubai International Airport (DXB).</p>',
        items: [
          {
            id: genItemId(),
            icon: "BuildingShield",
            heading: "DIFC Operations",
            description: "Dedicated fleet positioning across the country's premier business hubs.",
          },
          {
            id: genItemId(),
            icon: "Passport",
            heading: "Cross-Border & Protocol",
            description: "Personnel vetted for embassy, border, and secure-area standards.",
          },
        ],
        media: [
          {
            id: genItemId(),
            type: "image",
            column: "left",
            size: "tall",
            image:
              "https://images.unsplash.com/photo-1588726588629-19e48f7d9834?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            imageAlt: "National financial district skyline",
            overlay: "blue",
          },
          {
            id: genItemId(),
            type: "image",
            column: "left",
            size: "short",
            image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop&q=80",
            imageAlt: "Executive sedan for nationwide transfers",
            overlay: "none",
            contain: true,
          },
          {
            id: genItemId(),
            type: "stat",
            column: "right",
            size: "short",
            statValue: "100%",
            statLabel: "Licensed Nationwide",
          },
          {
            id: genItemId(),
            type: "image",
            column: "right",
            size: "tall",
            image:
              "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            imageAlt: "National logistics control data",
            overlay: "gradient",
          },
        ],
      },
      items: [],
      settings: { mediaPosition: "right" },
      appearance: { theme: "darker", pattern: true, padding: "lg", border: true, textAlign: "left" },
    },

    // ── Section 4: Media Content — Mega-Events (media left) ───
    {
      id: genId(),
      type: "mediaContent",
      variant: "media-left",
      order: 4,
      enabled: true,
      content: {
        heading: "Orchestrating Mega-Events Nationwide.",
        description:
          "From international exhibitions at Expo City Dubai to grand prix weekends, national day celebrations, and world expos, the logistical demands on ground transportation are monumental.\n\nAB.Limo does not merely supply vehicles; we deploy comprehensive Event Transportation Management architecture. Our centralized Transport Control Room utilizes live telemetry to orchestrate VIP coach charters, executive van convoys, and individual VIP transfers across the country.",
        items: [],
        actions: [
          { label: "Download Event Logistics RFP Guide", href: "#corporate-account", style: "outline", icon: "Download" },
        ],
      },
      items: [],
      settings: { mediaPosition: "left", containerWidth: "default" },
      appearance: {
        theme: "dark",
        background:
          "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        padding: "lg",
        border: true,
        textAlign: "left",
      },
    },

    // ── Section 5: Media Content — Airport Network (right) ────
    {
      id: genId(),
      type: "mediaContent",
      variant: "media-right",
      order: 5,
      enabled: true,
      content: {
        heading: "Airport Network: Gateway to Gateway.",
        description:
          "First impressions set the tone of entire business engagements. Our operations at Dubai International Airport (DXB) and every international gateway in the country are designed to insulate arriving executives from the friction of travel.\n\nOur aviation logistics team specializes in premium Meet & Greet services and VIP terminal coordination. We hold direct operational relationships with Fixed-Base Operators (FBOs), allowing us to execute seamless private aviation transfers directly from the tarmac.",
        items: [],
        actions: [
          { label: "Set up Airport Billing", href: "#corporate-account", style: "outline", icon: "ArrowRight" },
        ],
      },
      items: [],
      settings: { mediaPosition: "right", containerWidth: "default" },
      appearance: {
        theme: "darker",
        background:
          "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        padding: "lg",
        border: true,
        textAlign: "left",
      },
    },

    // ── Section 6: Media Content — Roadshows (media left) ─────
    {
      id: genId(),
      type: "mediaContent",
      variant: "media-left",
      order: 6,
      enabled: true,
      content: {
        eyebrow: "Corporate Agility",
        heading: "Financial Roadshows & As-Directed Mobility.",
        description:
          "Executing a successful financial roadshow requires more than transportation; it demands absolute fluidity. Economic hubs — from Dubai International Financial Centre (DIFC) to the government quarter of Abu Dhabi — are prone to dense traffic patterns.\n\nOur As-Directed (Hourly) Chauffeur Service is engineered for C-suite executives and investment bankers on dynamic schedules. A dedicated, premium vehicle remains on continuous standby at your location.",
        items: [],
        actions: [
          { label: "Book an As-Directed Chauffeur", href: "#corporate-account", style: "outline", icon: "ArrowRight" },
        ],
      },
      items: [],
      settings: { mediaPosition: "left", containerWidth: "default" },
      appearance: {
        theme: "darker",
        background:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        padding: "lg",
        border: true,
        textAlign: "left",
      },
    },

    // ── Section 7: Media Content — Giga-Projects (right) ──────
    {
      id: genId(),
      type: "mediaContent",
      variant: "media-right",
      order: 7,
      enabled: true,
      content: {
        eyebrow: "National Development",
        heading: "Logistics for Giga-Projects & Vision Programs.",
        description:
          "The rapid expansion of national development programs has reshaped the country's outskirts — from Expo City Dubai districts to infrastructure zones rising beyond the capital. Moving executive engineering teams and stakeholders requires highly specialized ground transport.\n\nAB.Limo deploys executive SUVs and robust premium vans suited for developing infrastructure zones, offering Long-Term Transportation Contracts and daily shuttles between headquarters hotels and remote project sites.",
        items: [],
        actions: [
          { label: "Request Long-Term Fleet Lease", href: "#corporate-account", style: "outline", icon: "ArrowRight" },
        ],
      },
      items: [],
      settings: { mediaPosition: "right", containerWidth: "default" },
      appearance: {
        theme: "dark",
        background:
          "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        padding: "lg",
        border: true,
        textAlign: "left",
      },
    },

    // ── Section 8: Media Content — Diplomatic (media left) ────
    {
      id: genId(),
      type: "mediaContent",
      variant: "media-left",
      order: 8,
      enabled: true,
      content: {
        eyebrow: "Government Mobility",
        heading: "Royal Protocol & Diplomatic Missions.",
        description:
          "The government quarter of Abu Dhabi and diplomatic districts across the country are subject to rigorous security and access regulations. AB.Limo acts as the trusted mobility partner for foreign embassies, international NGO delegations, and visiting state dignitaries.\n\nOur chauffeurs are extensively vetted, holding the national IDs and clearances required for seamless access through secure checkpoints. We provide Government & Embassy Transportation that strictly adheres to international protocol standards.",
        items: [],
        actions: [
          { label: "Discuss Embassy Transport Contracts", href: "#corporate-account", style: "outline", icon: "ArrowRight" },
        ],
      },
      items: [],
      settings: { mediaPosition: "left", containerWidth: "default" },
      appearance: {
        theme: "darker",
        background:
          "https://images.unsplash.com/photo-1575424783321-729c1d3bf7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        padding: "lg",
        border: true,
        textAlign: "left",
      },
    },

    // ── Section 9: Media Content — Vetting (media right) ──────
    {
      id: genId(),
      type: "mediaContent",
      variant: "media-right",
      order: 9,
      enabled: true,
      content: {
        eyebrow: "Executive Protection",
        heading: "Elite Vetting & Regulatory Compliance.",
        description:
          "In enterprise mobility, the chauffeur is the ultimate failsafe. AB.Limo deploys highly trained executive chauffeurs in full compliance with national transport authority regulations, enforcing a zero-tolerance policy for infractions.\n\nOur proprietary vetting matrix includes exhaustive criminal background checks, motor vehicle record auditing, and mandatory defensive driving certifications. Every chauffeur signs legally binding Non-Disclosure Agreements (NDAs) and carries the required Emirates IDs.",
        items: [],
        actions: [
          { label: "Review Security Documentation", href: "#corporate-account", style: "outline", icon: "ArrowRight" },
        ],
      },
      items: [],
      settings: { mediaPosition: "right", containerWidth: "default" },
      appearance: {
        theme: "dark",
        background:
          "https://images.unsplash.com/photo-1559132152-78d10b0a8801?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        padding: "lg",
        border: true,
        textAlign: "left",
      },
    },

    // ── Section 10: Media Content — Intercity (media left) ─────
    {
      id: genId(),
      type: "mediaContent",
      variant: "media-left",
      order: 10,
      enabled: true,
      content: {
        eyebrow: "National Network",
        heading: "Intercity Transfers & GCC Connectivity.",
        description:
          "Enterprise operations frequently require seamless movement across the country and beyond its borders. We provide premium Intercity Transfers utilizing flagship Mercedes S-Class sedans and V-Class MPVs.\n\nWhether you require a secure executive transfer from Dubai to Sharjah for a site visit, or a cross-border transit into the wider GCC, our long-distance mobility solutions remove the friction of road travel.",
        items: [],
        actions: [
          { label: "Coordinate an Intercity Route", href: "#corporate-account", style: "outline", icon: "ArrowRight" },
        ],
      },
      items: [],
      settings: { mediaPosition: "left", containerWidth: "default" },
      appearance: {
        theme: "darker",
        background:
          "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        padding: "lg",
        border: true,
        textAlign: "left",
      },
    },

    // ── Section 11: Media Content — Control Room (right) ───────
    {
      id: genId(),
      type: "mediaContent",
      variant: "media-right",
      order: 11,
      enabled: true,
      content: {
        eyebrow: "Transport Control Room",
        heading: "Nationwide Traffic Visibility.",
        description:
          "Navigating major cities during summits, exhibitions, and peak seasons requires immense coordination. Our national command center monitors live telemetry, adjusts routing for VIP convoys dynamically, and communicates directly with event security across the country.",
        items: [],
        actions: [
          { label: "Request a Logistics Audit", href: "#corporate-account", style: "outline", icon: "ArrowRight" },
        ],
      },
      items: [],
      settings: { mediaPosition: "right", containerWidth: "default" },
      appearance: {
        theme: "darker",
        background:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        padding: "lg",
        border: true,
        textAlign: "left",
      },
    },

    // ── Section 12: Media Content — Duty of Care (media left) ──
    {
      id: genId(),
      type: "mediaContent",
      variant: "media-left",
      order: 12,
      enabled: true,
      content: {
        eyebrow: "Duty of Care Integration",
        heading: "Security & Compliance Nationwide.",
        description:
          "Exceeding Fortune 500 enterprise standards while strictly adhering to local transport authority regulations.",
        items: [
          {
            id: genItemId(),
            icon: "FileInvoiceDollar",
            heading: "Centralized VAT Billing",
            description:
              "Automated VAT-compliant e-receipts and centralized corporate billing mapped to national cost centers.",
          },
          {
            id: genItemId(),
            icon: "SatelliteDish",
            heading: "Live GPS Tracking",
            description: "Real-time executive movement monitoring for enterprise risk management.",
          },
          {
            id: genItemId(),
            icon: "IdCardClip",
            heading: "Chauffeur Vetting & NDAs",
            description:
              "Exhaustive background checks, strict NDAs, and valid Emirates IDs across the fleet.",
          },
        ],
        actions: [
          { label: "Request Compliance Docs", href: "#corporate-account", style: "outline", icon: "Download" },
        ],
      },
      items: [],
      settings: { mediaPosition: "left", containerWidth: "default" },
      appearance: { theme: "dark", pattern: true, padding: "lg", border: true, textAlign: "left" },
    },

    // ── Section 13: Fleet Grid ─────────────────────────────────
    {
      id: genId(),
      type: "fleetGrid",
      variant: "4-column",
      order: 13,
      enabled: true,
      content: {
        eyebrow: "National Fleet Governance",
        heading: "Strictly Black. Fully Licensed.",
        description:
          "Our countrywide fleet consists exclusively of late-model, immaculate black vehicles — staged at every major gateway and ready for intercity deployment. Fully licensed to global executive standards.",
        headerAction: { label: "Request Fleet Allocation", href: "#corporate-account" },
        bottomCta: {
          label: "Consult our National Fleet Team",
          href: "#corporate-account",
          style: "secondary",
          icon: "ArrowRight",
        },
      },
      items: [
        {
          id: genItemId(),
          badge: "Government Protocol",
          image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop&q=80",
          imageAlt: "Black Mercedes S-Class",
          category: "Executive Sedan",
          name: "Mercedes S-Class (Black)",
          capacity: "3 Pax",
          bags: "2 Bags",
          capacityIcon: "UserTie",
          bagsIcon: "Briefcase",
          actions: [{ label: "Book S-Class", href: "#corporate-account" }],
        },
        {
          id: genItemId(),
          badge: "Financial Roadshow",
          image:
            "https://images.unsplash.com/photo-1574729418529-d1a8cc214ef6?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0",
          imageAlt: "Black Cadillac Escalade",
          category: "Executive SUV",
          name: "Cadillac Escalade (Black)",
          capacity: "6 Pax",
          bags: "5 Bags",
          capacityIcon: "UserTie",
          bagsIcon: "Briefcase",
          actions: [{ label: "Book SUV", href: "#corporate-account" }],
        },
        {
          id: genItemId(),
          badge: "Intercity",
          image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&h=400&fit=crop&q=80",
          imageAlt: "Black Mercedes V Class",
          category: "Premium MPV",
          name: "Mercedes V Class (Black)",
          capacity: "6 Pax",
          bags: "5 Bags",
          capacityIcon: "Users",
          bagsIcon: "Briefcase",
          actions: [{ label: "Book V-Class", href: "#corporate-account" }],
        },
        {
          id: genItemId(),
          badge: "Group Transfers",
          badgeStyle: "accent",
          image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&h=400&fit=crop&q=80",
          imageAlt: "Black Mercedes Sprinter",
          category: "Executive Van",
          name: "Mercedes Sprinter (Black)",
          capacity: "14 Pax",
          bags: "10 Bags",
          capacityIcon: "Users",
          bagsIcon: "Briefcase",
          actions: [{ label: "Book Van", href: "#corporate-account" }],
        },
      ],
      settings: { columns: "4" },
      appearance: { theme: "darker", padding: "lg", border: true, textAlign: "left" },
    },

    // ── Section 14: Contact Form ───────────────────────────────
    {
      id: genId(),
      type: "contactForm",
      variant: "corporate",
      order: 14,
      enabled: true,
      content: {
        eyebrow: "National Accounts",
        heading: "Open a Corporate Account.",
        description:
          "Connect with our national enterprise desk for centralized billing, priority fleet allocation, and gateway coverage across the country.",
        icon: "Briefcase",
        submitLabel: "Submit Account Request",
        successTitle: "Application Received",
        successMessage: "Your national account manager will contact you within 24 hours.",
      },
      items: [],
      settings: { layout: "centered" },
      appearance: { theme: "dark", padding: "lg", border: true, textAlign: "left" },
    },

    // ── Section 15: FAQ ───────────────────────────────────────
    {
      id: genId(),
      type: "faq",
      variant: "default",
      order: 15,
      enabled: true,
      content: {
        eyebrow: "Nationwide Knowledge Base",
        heading: "Frequently Asked Questions",
        description: "Detailed insights into airport coverage, intercity travel, and cross-border operations.",
        items: [
          {
            id: genItemId(),
            question: "Which airports do you cover for arrivals and departures?",
            answer:
              "We cover every international gateway in the country — including Dubai International Airport (DXB) — plus private-aviation FBOs and VIP terminals. Dispatchers pre-position vetted chauffeurs for Meet & Greet on both commercial and private arrivals.",
          },
          {
            id: genItemId(),
            question: "Can you coordinate intercity travel between Dubai and other cities?",
            answer:
              "Yes — point-to-point executive transfers connect Dubai, Sharjah, and every major city with fixed pricing, flight tracking, and luggage-aware vehicle selection. Cross-border GCC journeys can be arranged on the same booking.",
          },
          {
            id: genItemId(),
            question: "Do you support cross-border travel elsewhere in the GCC?",
            answer:
              "Yes. We coordinate pre-cleared cross-border journeys with vetted chauffeurs, valid documentation, and border-crossing experience across the region — from single executive transfers to multi-day delegations.",
          },
          {
            id: genItemId(),
            question: "Can I book an As-Directed chauffeur for a full day nationwide?",
            answer:
              "Yes — our As-Directed service keeps a dedicated chauffeur and vehicle on standby at your location for as long as you need, the preferred option for multi-stop business days and nationwide roadshows.",
          },
        ],
      },
      items: [
        { label: "Contact National Dispatch", href: "#corporate-account", style: "secondary", icon: "Phone" },
      ],
      settings: { variant: "default" },
      appearance: { theme: "darker", padding: "lg", border: true, textAlign: "center" },
    },
  ],
};

// ── Blank Country Template ────────────────────────────────────────

export const blankCountryTemplate: CountryTemplatePreset = {
  name: "Blank Country Service",
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
        eyebrow: "National Operations",
        title: "Country Service",
        titleHighlight: "Title.",
        description: "Describe your country service here.",
      },
      items: [
        {
          label: "Get Started",
          href: "#corporate-account",
          style: "primary",
          icon: "ArrowRight",
          iconPosition: "right",
        },
      ],
      settings: { minHeight: "85vh", overlayOpacity: 85, contentPosition: "left", buttonLayout: "row" },
      appearance: {
        theme: "darker",
        background: "",
        padding: "none",
        border: false,
        textAlign: "left",
        overlayGradient: "default",
      },
    },
  ],
};

// ── All Country Templates ─────────────────────────────────────────

export const COUNTRY_TEMPLATE_PRESETS: CountryTemplatePreset[] = [
  corporateCountryTemplate,
  blankCountryTemplate,
];
