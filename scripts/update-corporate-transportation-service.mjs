import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const MONGODB_URI =
  process.env.MONGODB_URI ||
  process.env.MONGO_URI;
if (!MONGODB_URI) {
  throw new Error("MONGODB_URI or MONGO_URI must be set in the environment or .env.local");
}

const DB_URI = MONGODB_URI.includes("/ablimo-db")
  ? MONGODB_URI
  : `${MONGODB_URI.split("?")[0].replace(/\/+$/, "")}/ablimo-db${
      MONGODB_URI.includes("?") ? "?" + MONGODB_URI.split("?")[1] : ""
    }`;

// Helper to generate consistent IDs
function genId(prefix = "sec") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
function genItemId(prefix = "itm") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// ── 10 Structured Page Sections ──────────────────────────────────────

const pageSections = [
  // 1. Hero Section
  {
    id: "sec-corp-hero",
    type: "hero",
    variant: "background-content",
    order: 0,
    enabled: true,
    content: {
      eyebrow: "Corporate & Staff Transportation",
      title: "Corporate transportation, managed end to end.",
      titleHighlight: "",
      description:
        "When your executives, visitors and staff depend on getting somewhere on time every day, transportation becomes an operation in its own right. AB runs it for you: we plan the routes and vehicle mix, supply vetted chauffeurs and drivers, monitor every trip from our Riyadh control room, and report on what happened.",
    },
    items: [
      {
        label: "Request a corporate proposal",
        href: "#corporate-account",
        style: "primary",
        icon: "ArrowRight",
        iconPosition: "right",
      },
      {
        label: "Talk to an account manager",
        href: "/contact",
        style: "secondary",
        icon: "Phone",
        iconPosition: "left",
      },
      {
        label: "See how corporate accounts work →",
        href: "/corporate-accounts",
        style: "link",
        icon: "Briefcase",
        iconPosition: "left",
      },
    ],
    settings: {
      minHeight: "85vh",
      overlayOpacity: 85,
      contentPosition: "left",
      buttonLayout: "row",
    },
    appearance: {
      theme: "darker",
      background: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1920&h=800&fit=crop",
      padding: "none",
      border: false,
      textAlign: "left",
      overlayGradient: "default",
    },
  },

  // 2. Marquee Ticker
  {
    id: "sec-corp-marquee",
    type: "marquee",
    variant: "default",
    order: 1,
    enabled: true,
    content: {
      items: [
        { id: genItemId("mq"), icon: "Shield", label: "Licensed & Vetted Chauffeurs" },
        { id: genItemId("mq"), icon: "Radio", label: "24/7 Riyadh Central Control Room" },
        { id: genItemId("mq"), icon: "Car", label: "Strictly Black Fleet (< 36 Months)" },
        { id: genItemId("mq"), icon: "Clock", label: "< 15-Minute Incident Notification SLA" },
        { id: genItemId("mq"), icon: "Globe", label: "Unified GCC Coverage (KSA · UAE · Qatar)" },
        { id: genItemId("mq"), icon: "FileText", label: "Consolidated Monthly Billing" },
      ],
    },
    items: [],
    settings: {
      speed: "normal",
      opacity: 90,
    },
    appearance: {
      theme: "darker",
      padding: "sm",
      border: true,
    },
  },

  // 3. Programmes We Operate (Service Cards)
  {
    id: "sec-corp-programmes",
    type: "serviceCards",
    variant: "3-column",
    order: 2,
    enabled: true,
    content: {
      eyebrow: "Operating Capabilities",
      heading: "Programmes we operate across the GCC",
      description:
        "Five purpose-built transportation programmes designed to handle every organizational mobility demand under one operating agreement.",
      sectionCta: {
        label: "Explore Commercial Terms & Governance",
        href: "/corporate-accounts",
        style: "outline",
        icon: "Briefcase",
      },
      bottomCta: {
        label: "Request a Custom Programme Proposal",
        href: "#corporate-account",
        style: "primary",
        icon: "ArrowRight",
      },
    },
    items: [
      {
        id: genItemId("prg"),
        icon: "UserTie",
        title: "Executive chauffeur programmes",
        description:
          "On-call chauffeurs for leadership teams, with vehicle class, preferences and security requirements agreed per executive. Bookings come from executive assistants and are confirmed with chauffeur details before pickup.",
        actions: [
          { label: "View Chauffeur Protocol", href: "/services/chauffeur-vip", style: "accent", icon: "ChevronRight" },
        ],
      },
      {
        id: genItemId("prg"),
        icon: "ShieldCheck",
        title: "Dedicated vehicles and drivers",
        description:
          "A chauffeur and vehicle assigned to one executive or department for months at a time. AB handles recruitment, vetting, payroll, relief cover and vehicle maintenance. A replacement vehicle arrives within 15–30 minutes if one is off the road.",
        actions: [
          { label: "Dedicated Account Retainers", href: "/corporate-accounts", style: "accent", icon: "ChevronRight" },
        ],
      },
      {
        id: genItemId("prg"),
        icon: "Bus",
        title: "Staff shuttles and daily routes",
        description:
          "Scheduled vans, minibuses or coaches between residential areas, offices and sites, with routes planned around shift times and reviewed as headcount changes. For large or remote workforces, see Workforce Transportation.",
        actions: [
          { label: "Workforce Mobility Scope", href: "/services/workforce-transportation", style: "accent", icon: "ChevronRight" },
        ],
      },
      {
        id: genItemId("prg"),
        icon: "Plane",
        title: "Visitor and new-joiner programmes",
        description:
          "Airport arrival meet-and-assist, hotel, office and return for visiting executives, auditors, consultants and relocating staff, seamlessly booked against your corporate account.",
        actions: [
          { label: "Airport Protocol Scope", href: "/services/airport-transfers", style: "accent", icon: "ChevronRight" },
        ],
      },
      {
        id: genItemId("prg"),
        icon: "Route",
        title: "Roadshows and multi-city itineraries",
        description:
          "Investor roadshows and site tours across Riyadh, Jeddah, the Eastern Province, Dubai, Abu Dhabi and Doha, with one itinerary owner and the same standards in every city.",
        wide: true,
        actions: [
          { label: "Multi-City Dispatch Scope", href: "/corporate-accounts", style: "accent", icon: "ChevronRight" },
        ],
      },
    ],
    settings: {
      columns: "3",
      showHeader: true,
    },
    appearance: {
      theme: "dark",
      padding: "lg",
      border: true,
      textAlign: "center",
    },
  },

  // 4. How We Run It (MediaContent - 5-Step Lifecycle)
  {
    id: "sec-corp-how-we-run",
    type: "mediaContent",
    variant: "media-right",
    order: 3,
    enabled: true,
    content: {
      eyebrow: "Operational Lifecycle",
      heading: "How we run it: 5-step managed operation",
      description:
        "When your executives, visitors and staff depend on getting somewhere on time every day, transportation becomes an operation in its own right. AB runs it for you through a rigorous five-stage delivery cycle:",
      mediaTitle: "AB Riyadh Control Room 24/7",
      items: [
        {
          id: genItemId("step"),
          icon: "FileCheck",
          heading: "1. Requirements review",
          description: "Passenger groups, locations, hours, service levels and security needs.",
        },
        {
          id: genItemId("step"),
          icon: "Compass",
          heading: "2. Programme design",
          description: "Routes, vehicle classes, driver numbers, standby cover and booking rules, documented and signed off by you.",
        },
        {
          id: genItemId("step"),
          icon: "Car",
          heading: "3. Mobilisation",
          description: "Vehicles prepared, drivers briefed on your sites and protocol, booking channels set up.",
        },
        {
          id: genItemId("step"),
          icon: "Radio",
          heading: "4. Daily operation",
          description: "Live tracking, dispatch changes and incident handling from the Riyadh control room, 24/7.",
        },
        {
          id: genItemId("step"),
          icon: "BarChart3",
          heading: "5. Monthly review",
          description: "Usage, punctuality and cost by department, with recommended changes.",
        },
      ],
      actions: [
        {
          label: "Request a Corporate Proposal",
          href: "#corporate-account",
          style: "primary",
          icon: "ArrowRight",
        },
        {
          label: "Talk to an Operations Specialist",
          href: "/contact",
          style: "outline",
          icon: "Phone",
        },
      ],
    },
    items: [],
    settings: {
      mediaPosition: "right",
      containerWidth: "default",
    },
    appearance: {
      theme: "darker",
      pattern: true,
      background: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&q=80",
      padding: "lg",
      border: true,
      textAlign: "left",
    },
  },

  // 5. Vehicles Used (FleetGrid matching client table)
  {
    id: "sec-corp-vehicles",
    type: "fleetGrid",
    variant: "4-column",
    order: 4,
    enabled: true,
    content: {
      eyebrow: "Fleet Allocation",
      heading: "Vehicles used across corporate programmes",
      description:
        "Strictly black, late-model luxury vehicles under 36 months old, inspected daily and matched to specific passenger capacities.",
      headerAction: {
        label: "View Complete Fleet Specifications",
        href: "/fleet",
      },
      bottomCta: {
        label: "Request Vehicle Allocation Quote",
        href: "#corporate-account",
        style: "secondary",
        icon: "Car",
      },
    },
    items: [
      {
        id: genItemId("v"),
        badge: "Executive Travel",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop&q=80",
        imageAlt: "Mercedes S-Class & Cadillac Escalade",
        category: "Executive Sedan & SUV",
        name: "Mercedes S-Class & Cadillac Escalade",
        capacity: "3 / 6 Seats",
        bags: "2 / 5 Bags",
        capacityIcon: "UserTie",
        bagsIcon: "Briefcase",
        actions: [{ label: "Executive Allocation", href: "#corporate-account" }],
      },
      {
        id: genItemId("v"),
        badge: "Small Teams & Visitors",
        image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&h=400&fit=crop&q=80",
        imageAlt: "Mercedes V-Class & Hyundai Staria",
        category: "Premium MPV / Van",
        name: "Mercedes V-Class & Hyundai Staria",
        capacity: "6 Seats",
        bags: "5 Bags",
        capacityIcon: "Users",
        bagsIcon: "Briefcase",
        actions: [{ label: "Team Allocation", href: "#corporate-account" }],
      },
      {
        id: genItemId("v"),
        badge: "Staff Routes",
        image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&h=400&fit=crop&q=80",
        imageAlt: "Mercedes Sprinter Minibus",
        category: "Executive Minibus",
        name: "Mercedes Sprinter Minibus",
        capacity: "14–19 Seats",
        bags: "10 Bags",
        capacityIcon: "Users",
        bagsIcon: "Briefcase",
        actions: [{ label: "Route Allocation", href: "#corporate-account" }],
      },
      {
        id: genItemId("v"),
        badge: "Large Shifts & Sites",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&h=400&fit=crop&q=80",
        imageAlt: "VIP Luxury Coach",
        category: "Executive Motorcoach",
        name: "VIP Luxury Coach (30–50 Seats)",
        capacity: "30–50 Seats",
        bags: "40 Bags",
        capacityIcon: "Users",
        bagsIcon: "Briefcase",
        actions: [{ label: "Shift Allocation", href: "#corporate-account" }],
      },
    ],
    settings: {
      columns: "4",
    },
    appearance: {
      theme: "darker",
      padding: "lg",
      border: true,
      textAlign: "left",
    },
  },

  // 6. Standards Written into Every Programme (MediaContent - Left)
  {
    id: "sec-corp-standards",
    type: "mediaContent",
    variant: "media-left",
    order: 5,
    enabled: true,
    content: {
      eyebrow: "Governance & SLA Guarantees",
      heading: "Standards written into every programme",
      description:
        "Our service commitments are contractually codified into measurable SLAs. Every AB corporate transportation programme delivers four core standards:",
      mediaTitle: "AB Chauffeur Standard",
      items: [
        {
          id: genItemId("std"),
          icon: "Shield",
          heading: "Licensed & Vetted Chauffeurs",
          description: "Chauffeurs and drivers licensed, background-checked and trained to the AB Chauffeur Standard.",
        },
        {
          id: genItemId("std"),
          icon: "Navigation",
          heading: "GPS-Tracked & Late-Model Fleet",
          description: "Vehicles GPS-tracked in real time, no older than 36 months, cleaned and inspected daily.",
        },
        {
          id: genItemId("std"),
          icon: "RefreshCw",
          heading: "Standby Vehicles & Relief Drivers",
          description: "Standby vehicles and relief drivers ready for each programme to guarantee zero service interruption.",
        },
        {
          id: genItemId("std"),
          icon: "BellRing",
          heading: "15-Minute Incident Notification",
          description: "Incident reporting dispatched to your nominated contact within 15 minutes of any event.",
        },
      ],
      actions: [
        {
          label: "See how corporate accounts work →",
          href: "/corporate-accounts",
          style: "primary",
          icon: "ArrowRight",
        },
        {
          label: "Review Company Standards",
          href: "/about",
          style: "outline",
          icon: "FileText",
        },
      ],
    },
    items: [],
    settings: {
      mediaPosition: "left",
      containerWidth: "default",
    },
    appearance: {
      theme: "darker",
      pattern: true,
      background: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1000&q=80",
      padding: "lg",
      border: true,
      textAlign: "left",
    },
  },

  // 7. Case Study & Regional Footprint (TextMediaGrid)
  {
    id: "sec-corp-case-study",
    type: "textMediaGrid",
    variant: "media-right",
    order: 6,
    enabled: true,
    content: {
      eyebrow: "Regional Impact & Case Study",
      eyebrowIcon: "Building",
      heading: "Delivering Corporate Mobility Across",
      headingHighlight: "Saudi Arabia, UAE & Qatar.",
      description:
        '<p class="mb-4 leading-relaxed"><strong>Case Study — Regional Headquarters Deployment:</strong> A Tier-1 multinational financial advisory and management consultancy established its regional headquarters in Riyadh while operating extensive client teams in Dubai and Doha. They required a unified mobility partner to replace fragmented car rentals and ad-hoc taxis.</p><p class="mb-4 leading-relaxed"><strong>Delivered Solution:</strong> AB instituted an integrated programme encompassing 8 dedicated Mercedes S-Class sedans for leadership, daily scheduled V-Class routes between downtown compounds and client campuses, and automated VIP airport transfers synchronized with flight schedules at RUH, DXB, and DOH.</p><p class="leading-relaxed"><strong>Measured Results:</strong> Over <strong>180 weekly journeys</strong> operated with a <strong>99.8% on-time performance rate</strong>, zero missed flight arrivals, and a single consolidated monthly statement partitioned cleanly by client matter code.</p>',
      items: [
        {
          id: genItemId("loc"),
          icon: "Building",
          heading: "Saudi Arabia (KSA)",
          description: "Managed programmes across Riyadh (KAFD & DQ), Jeddah, and the Eastern Province (Khobar/Dammam).",
        },
        {
          id: genItemId("loc"),
          icon: "Globe",
          heading: "UAE & Qatar Hubs",
          description: "Executive operations in Dubai (DIFC), Abu Dhabi (ADGM), and Doha (West Bay) under 1 agreement.",
        },
      ],
      media: [
        {
          id: genItemId("med"),
          type: "stat",
          column: "left",
          size: "short",
          statValue: "99.8%",
          statLabel: "On-Time Arrival Rate",
        },
        {
          id: genItemId("med"),
          type: "image",
          column: "left",
          size: "tall",
          image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop&q=80",
          imageAlt: "Riyadh KAFD Corporate District",
          overlay: "blue",
        },
        {
          id: genItemId("med"),
          type: "image",
          column: "right",
          size: "tall",
          image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop&q=80",
          imageAlt: "Dubai Financial District",
          overlay: "gradient",
        },
        {
          id: genItemId("med"),
          type: "stat",
          column: "right",
          size: "short",
          statValue: "180+",
          statLabel: "Weekly Journeys Managed",
        },
      ],
    },
    items: [],
    settings: {
      mediaPosition: "right",
    },
    appearance: {
      theme: "darker",
      pattern: true,
      padding: "lg",
      border: true,
      textAlign: "left",
    },
  },

  // 8. Request a Proposal (ContactForm)
  {
    id: "sec-corp-form",
    type: "contactForm",
    variant: "corporate",
    order: 7,
    enabled: true,
    content: {
      eyebrow: "Request a Proposal",
      heading: "Request a corporate transportation proposal",
      description:
        "Tell us roughly how your organisation travels today. Our commercial desk will review your passenger groups, routes, and timeline, and return with a customized proposal and draft rate card.",
      icon: "Briefcase",
      submitLabel: "Request Corporate Proposal",
      successTitle: "Proposal Request Received",
      successMessage:
        "Thank you. Our corporate operations desk will contact you within 4 business hours with your draft proposal and rate card.",
    },
    items: [],
    settings: {
      layout: "centered",
    },
    appearance: {
      theme: "dark",
      padding: "lg",
      border: true,
      textAlign: "left",
    },
  },

  // 9. Frequently Asked Questions (FAQ)
  {
    id: "sec-corp-faq",
    type: "faq",
    variant: "default",
    order: 8,
    enabled: true,
    content: {
      eyebrow: "Knowledge Base",
      heading: "Frequently Asked Questions",
      description:
        "Key commercial and operational answers for facilities managers, travel leads, and HR directors.",
      items: [
        {
          id: genItemId("faq"),
          question: "What is the difference between a dedicated driver and on-demand chauffeurs?",
          answer:
            "A dedicated driver and vehicle are assigned to you full-time for an agreed period. On-demand chauffeurs are booked per trip or per hour from AB's pool.",
        },
        {
          id: genItemId("faq"),
          question: "Who employs the drivers on a dedicated contract?",
          answer:
            "AB does. We handle vetting, payroll, relief cover and regulatory compliance under our local operating licences.",
        },
        {
          id: genItemId("faq"),
          question: "Can routes change as our headcount changes?",
          answer:
            "Yes. Routes are reviewed monthly, or sooner on request as staff numbers or office locations shift.",
        },
        {
          id: genItemId("faq"),
          question: "Do you cover more than one country under one contract?",
          answer:
            "Yes, through licensed AB entities in Saudi Arabia (KSA), the UAE and Qatar, all governed under a single master framework agreement.",
        },
        {
          id: genItemId("faq"),
          question: "How are incidents handled?",
          answer:
            "The Riyadh control room manages incidents live 24/7, dispatches standby relief vehicles immediately, and sends a written report to your nominated contact.",
        },
      ],
    },
    items: [
      {
        label: "Explore Commercial Terms",
        href: "/corporate-accounts",
        style: "primary",
        icon: "ArrowRight",
      },
      {
        label: "Contact Dispatch Team",
        href: "/contact",
        style: "secondary",
        icon: "Phone",
      },
    ],
    settings: {
      variant: "default",
    },
    appearance: {
      theme: "darker",
      padding: "lg",
      border: true,
      textAlign: "center",
    },
  },

  // 10. CTA Banner
  {
    id: "sec-corp-cta",
    type: "ctaBanner",
    variant: "centered",
    order: 9,
    enabled: true,
    content: {
      heading: "Corporate transportation, managed end to end.",
      description:
        "When your executives, visitors and staff depend on getting somewhere on time every day, transportation becomes an operation in its own right. Talk to AB today.",
    },
    items: [
      {
        label: "Request a Corporate Proposal",
        href: "#corporate-account",
        style: "primary",
        icon: "ArrowRight",
      },
      {
        label: "Commercial Terms on Corporate Accounts",
        href: "/corporate-accounts",
        style: "secondary",
        icon: "Briefcase",
      },
    ],
    settings: {
      layout: "centered",
    },
    appearance: {
      theme: "dark",
      padding: "lg",
      border: true,
      textAlign: "center",
    },
  },
];

// ── Legacy Fields for Dashboard Sync ─────────────────────────────────

const legacyFeatures = [
  {
    icon: "UserTie",
    title: "Executive Chauffeur Programmes",
    desc: "On-call chauffeurs for leadership teams with vehicle class, preferences and security requirements agreed per executive.",
  },
  {
    icon: "ShieldCheck",
    title: "Dedicated Vehicles & Drivers",
    desc: "Assigned full-time to an executive or department with immediate replacement guarantee if one is off the road.",
  },
  {
    icon: "Bus",
    title: "Staff Shuttles & Daily Routes",
    desc: "Scheduled vans, minibuses or coaches between residential areas, offices and sites planned around shift times.",
  },
];

const legacyCards = [
  {
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
    tag: "Executive",
    title: "Executive Chauffeur Programmes",
    desc: "On-call chauffeurs for leadership teams with vehicle class, preferences and security requirements agreed per executive.",
  },
  {
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    tag: "Dedicated",
    title: "Dedicated Vehicles and Drivers",
    desc: "A chauffeur and vehicle assigned full-time. AB handles vetting, payroll, relief cover and vehicle maintenance.",
  },
  {
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    tag: "Staff Routes",
    title: "Staff Shuttles and Daily Routes",
    desc: "Scheduled vans, minibuses or coaches between residential areas, offices and sites planned around shift times.",
  },
  {
    image: "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=800&q=80",
    tag: "Visitors",
    title: "Visitor and New-Joiner Programmes",
    desc: "Airport arrival, hotel, office and return for visiting executives, auditors, consultants and relocating staff.",
  },
  {
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    tag: "Roadshows",
    title: "Roadshows and Multi-City Itineraries",
    desc: "Investor roadshows and site tours across Riyadh, Jeddah, Eastern Province, Dubai, Abu Dhabi and Doha.",
  },
];

const legacySections = [
  {
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    imageAlt: "AB Operations Control Room",
    title: "How We Run It: 5-Stage Operation",
    paragraphs: [
      "When your executives, visitors and staff depend on getting somewhere on time every day, transportation becomes an operation in its own right.",
      "AB runs it for you: we plan the routes and vehicle mix, supply vetted chauffeurs and drivers, monitor every trip from our Riyadh control room, and report on what happened.",
    ],
    bullets: [
      { text: "1. Requirements review: Passenger groups, locations, hours, and service levels." },
      { text: "2. Programme design: Routes, vehicle classes, driver numbers, and standby cover." },
      { text: "3. Mobilisation: Vehicles prepared, drivers briefed on your sites and protocol." },
      { text: "4. Daily operation: Live tracking, dispatch changes and incident handling 24/7." },
      { text: "5. Monthly review: Usage, punctuality and cost by department." },
    ],
    imageSide: "left",
    dark: true,
  },
  {
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=600&fit=crop",
    imageAlt: "AB Chauffeur Standard",
    title: "Standards Written into Every Programme",
    paragraphs: [
      "Our service commitments are contractually codified into measurable SLAs. Every AB agreement guarantees four foundational standards.",
      "Commercial terms, rate cards, and consolidated billing are set out on Corporate Accounts.",
    ],
    bullets: [
      { text: "Chauffeurs licensed, background-checked and trained to the AB Chauffeur Standard." },
      { text: "Vehicles GPS-tracked, strictly late-model (< 36 months), cleaned and inspected daily." },
      { text: "Standby vehicles and relief drivers ready for each programme." },
      { text: "Incident reporting to your nominated contact within 15 minutes of any event." },
    ],
    imageSide: "right",
    dark: true,
  },
];

const legacyFaqs = [
  {
    q: "What is the difference between a dedicated driver and on-demand chauffeurs?",
    a: "A dedicated driver and vehicle are assigned to you full-time for an agreed period. On-demand chauffeurs are booked per trip or per hour from AB's pool.",
  },
  {
    q: "Who employs the drivers on a dedicated contract?",
    a: "AB does. We handle vetting, payroll, relief cover and regulatory compliance under our local operating licences.",
  },
  {
    q: "Can routes change as our headcount changes?",
    a: "Yes. Routes are reviewed monthly, or sooner on request as staff numbers or office locations shift.",
  },
  {
    q: "Do you cover more than one country under one contract?",
    a: "Yes, through licensed AB operating entities in Saudi Arabia (KSA), the UAE and Qatar, all governed under a single master framework agreement.",
  },
  {
    q: "How are incidents handled?",
    a: "The Riyadh control room manages incidents live 24/7, dispatches standby relief vehicles immediately, and sends a written report to your nominated contact.",
  },
];

// ── Main Update Execution ───────────────────────────────────────────

async function run() {
  console.log("Connecting to MongoDB:", DB_URI.replace(/:[^:@]+@/, ":****@"));
  await mongoose.connect(DB_URI);
  console.log("Connected successfully.");

  const collection = mongoose.connection.collection("services");

  const query = { slug: "corporate-transportation" };
  const existing = await collection.findOne(query);

  if (!existing) {
    console.error("Could not find corporate-transportation service document in DB!");
    process.exit(1);
  }

  console.log("Found existing service:", existing._id, existing.title);

  const updateDoc = {
    $set: {
      title: "Corporate & Staff Transportation",
      subtitle:
        "Managed corporate transportation across Saudi Arabia, the UAE and Qatar: dedicated chauffeurs, staff routes, roadshows and visitor programmes. Get a proposal.",
      desc:
        "Managed corporate transportation across Saudi Arabia, the UAE and Qatar: dedicated chauffeurs, staff routes, roadshows and visitor programmes.",
      heroImage: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1920&h=800&fit=crop",
      breadcrumb: "Corporate & Staff Transportation",
      features: legacyFeatures,
      cardsHeading: "Programmes we operate",
      cardsDesc:
        "Five purpose-built transportation programmes designed to handle every organizational mobility demand under one operating agreement.",
      cards: legacyCards,
      sections: legacySections,
      faqs: legacyFaqs,
      ctaTitle: "Corporate transportation, managed end to end.",
      ctaDesc:
        "When your executives, visitors and staff depend on getting somewhere on time every day, transportation becomes an operation in its own right.",
      ctaLabel: "Request a corporate proposal",
      ctaHref: "#corporate-account",
      seo: {
        metaTitle: "Corporate & Staff Transportation in KSA, UAE & Qatar | AB",
        metaDescription:
          "Managed corporate transportation across Saudi Arabia, the UAE and Qatar: dedicated chauffeurs, staff routes, roadshows and visitor programmes. Get a proposal.",
        ogImage: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1920&h=800&fit=crop",
      },
      pageSections: pageSections,
      updatedAt: new Date(),
    },
  };

  const result = await collection.updateOne(query, updateDoc);
  console.log("Update result:", result.modifiedCount, "document(s) updated.");

  const verified = await collection.findOne(query);
  console.log("\n── VERIFIED DOCUMENT IN DB ──");
  console.log("ID:", verified._id);
  console.log("Title:", verified.title);
  console.log("Subtitle:", verified.subtitle);
  console.log("SEO Title:", verified.seo?.metaTitle);
  console.log("SEO Description:", verified.seo?.metaDescription);
  console.log("Total PageSections:", verified.pageSections?.length);
  verified.pageSections?.forEach((s, idx) => {
    console.log(`  [${idx}] Type: ${s.type.padEnd(14)} | Variant: ${s.variant.padEnd(20)} | Title/Heading: "${s.content?.title || s.content?.heading || ''}"`);
  });
  console.log("Legacy Features:", verified.features?.length);
  console.log("Legacy Cards:", verified.cards?.length);
  console.log("Legacy FAQs:", verified.faqs?.length);

  await mongoose.disconnect();
  console.log("\nDisconnected from MongoDB. Migration completed successfully!");
}

run().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});
