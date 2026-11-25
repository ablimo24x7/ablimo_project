import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import mongoose from "mongoose";

function genId(): string {
  return `sec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function genItemId(): string {
  return `itm-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Helper to parse markdown headings, paragraphs, and FAQs
function parseMd(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const lines = raw.split("\n");

  let h1 = "";
  const firstH1Line = lines.find((l) => l.trim().startsWith("# "));
  if (firstH1Line) {
    h1 = firstH1Line.replace(/^#\s*\**|\**$/g, "").trim();
  }

  // Extract FAQs
  const faqs: Array<{ q: string; a: string }> = [];
  const faqMatch = raw.indexOf("## **Frequently asked questions**") !== -1
    ? raw.indexOf("## **Frequently asked questions**")
    : raw.indexOf("## **Frequently Asked Questions**") !== -1
    ? raw.indexOf("## **Frequently Asked Questions**")
    : raw.indexOf("Frequently asked questions") !== -1
    ? raw.indexOf("Frequently asked questions")
    : -1;

  if (faqMatch !== -1) {
    const faqChunk = raw.slice(faqMatch);
    const qMatches = [...faqChunk.matchAll(/###\s*\*\*(.*?)\*\*/g)];
    for (let i = 0; i < qMatches.length; i++) {
      const q = qMatches[i][1].trim();
      const startPos = qMatches[i].index! + qMatches[i][0].length;
      const endPos = i + 1 < qMatches.length ? qMatches[i + 1].index! : faqChunk.length;
      let aText = faqChunk.slice(startPos, endPos).trim();
      // Stop before the next H2 section if reached
      const nextH2 = aText.indexOf("\n## ");
      if (nextH2 !== -1) {
        aText = aText.slice(0, nextH2).trim();
      }
      // Remove markdown links or clean text
      aText = aText.replace(/\[(.*?)\]\(.*?\)/g, "$1");
      if (q && aText) {
        faqs.push({ q, a: aText });
      }
    }
  }

  // Extract images
  const images = [...raw.matchAll(/!\[(.*?)\]\((.*?)\)/g)].map((m) => ({
    alt: m[1],
    src: m[2].startsWith("http") || m[2].startsWith("/") ? m[2] : `/services/${m[2]}`,
  }));

  return { raw, h1, faqs, images };
}

async function main() {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI not found");

  const dbUri = uri.includes("/ablimo-db")
    ? uri
    : uri.split("?")[0].replace(/\/+$/, "") + "/ablimo-db" + (uri.includes("?") ? "?" + uri.split("?")[1] : "");

  console.log("Connecting to MongoDB Atlas...");
  await mongoose.connect(dbUri);
  const db = mongoose.connection.db!;
  console.log("Connected successfully!\n");

  const mdBase = path.resolve(process.cwd(), "services-pages-md");

  const updatedPages: string[] = [];
  const samePages: string[] = [];

  // =========================================================================
  // 1. UPDATE SERVICES COLLECTION: corporate-transportation
  // =========================================================================
  console.log(">>> Processing /services/corporate-transportation...");
  const corpMd = parseMd(path.join(mdBase, "www.ab.limo-services-corporate-transportation.md"));
  const corpHeroImg = corpMd.images[0]?.src || "/services/corporate-transportation.jpg";
  const corpMediaImg = corpMd.images[1]?.src || "/services/corporate-transportation.jpg";

  const corpSections = [
    {
      id: genId(),
      type: "hero",
      variant: "background-content",
      order: 0,
      enabled: true,
      content: {
        eyebrow: "Corporate & Staff Transportation",
        title: "Reliable corporate transportation across the Middle East",
        titleHighlight: "",
        description:
          "AB delivers corporate transportation built for organisations that require punctuality, discretion and regional reach. Headquartered in Riyadh with central operations, we manage executive travel, employee commuter routes and business delegations across the Gulf Cooperation Council.",
      },
      items: [
        { label: "Request a proposal", href: "#corporate-account", style: "primary", icon: "ArrowRight", iconPosition: "right" },
        { label: "Talk to an account manager", href: "/contact", style: "secondary", icon: "Phone", iconPosition: "left" },
        { label: "See how corporate accounts work →", href: "/corporate-accounts", style: "link", icon: "Briefcase", iconPosition: "left" },
      ],
      settings: { minHeight: "85vh", overlayOpacity: 85, contentPosition: "left", buttonLayout: "row" },
      appearance: { theme: "darker", background: corpHeroImg, padding: "none", border: false, textAlign: "left", overlayGradient: "default" },
    },
    {
      id: genId(),
      type: "marquee",
      variant: "default",
      order: 1,
      enabled: true,
      content: {
        items: [
          { id: genItemId(), icon: "Radio", label: "24/7 Central Dispatch" },
          { id: genItemId(), icon: "Globe", label: "3 Countries with Direct Fleet" },
          { id: genItemId(), icon: "Plane", label: "8 Regional Airports Served" },
          { id: genItemId(), icon: "Shield", label: "Licensed & Protocol-Trained Drivers" },
          { id: genItemId(), icon: "Clock", label: "< 15-Minute Incident Notification SLA" },
          { id: genItemId(), icon: "FileText", label: "Consolidated Monthly Account Billing" },
        ],
      },
      items: [],
      settings: { speed: "normal", opacity: 90 },
      appearance: { theme: "darker", padding: "sm", border: true },
    },
    {
      id: genId(),
      type: "mediaContent",
      variant: "media-left",
      order: 2,
      enabled: true,
      content: {
        eyebrow: "How We Work",
        heading: "Operational governance for business mobility",
        description:
          "Our corporate transportation programmes integrate licensed drivers, rigorous safety standards and real time vehicle tracking under one transparent contract. Clients receive dedicated account management, clear service level agreements and predictable reporting across every regional facility.",
        items: [
          { id: genItemId(), icon: "Shield", heading: "Licensed Protocol Drivers", description: "Vetted chauffeurs operating under strict duty of care protocols across KSA, UAE, and Qatar." },
          { id: genItemId(), icon: "Radio", heading: "Centralized GPS Telematics", description: "Real-time oversight from our central Riyadh operations desk with live flight and route tracking." },
          { id: genItemId(), icon: "FileText", heading: "Single Master Service Agreement", description: "Unified cross-border billing and corporate service levels eliminating supplier fragmentation." },
        ],
        actions: [{ label: "Request a corporate proposal", href: "#corporate-account", style: "primary", icon: "ArrowRight" }],
      },
      items: [],
      settings: { mediaPosition: "left", containerWidth: "default" },
      appearance: { theme: "darker", background: corpHeroImg, padding: "lg", border: true, textAlign: "left" },
    },
    {
      id: genId(),
      type: "serviceCards",
      variant: "3-column",
      order: 3,
      enabled: true,
      content: {
        eyebrow: "What You Get",
        heading: "Built for corporate transportation",
        description: "Four purpose-built transportation programmes designed to handle every organizational mobility demand under one operating agreement.",
        sectionCta: { label: "Explore Commercial Terms & Governance", href: "/corporate-accounts", style: "outline", icon: "Briefcase" },
        bottomCta: { label: "Request a Custom Programme Proposal", href: "#corporate-account", style: "primary", icon: "ArrowRight" },
      },
      items: [
        {
          id: genItemId(),
          icon: "Car",
          title: "1. Dedicated vehicles",
          description: "Assigned luxury vehicle options with a full time private driver for senior executives. Maintenance, insurance, regulatory licensing and relief driver coverage remain entirely managed by our operations control room.",
          actions: [{ label: "Dedicated Retainers", href: "/corporate-accounts", style: "accent", icon: "ChevronRight" }],
        },
        {
          id: genItemId(),
          icon: "Bus",
          title: "2. Daily staff routes",
          description: "Scheduled employee transport service solutions connecting residential communities to business parks and operational headquarters. Route schedules adapt directly to shift patterns and corporate headcount changes.",
          actions: [{ label: "Staff Mobility", href: "/corporate-accounts", style: "accent", icon: "ChevronRight" }],
        },
        {
          id: genItemId(),
          icon: "Route",
          title: "3. Roadshows",
          description: "Precision roadshow transport designed for high profile investor itineraries and multi destination site inspections. Dedicated dispatch coordinators monitor every stop to support tight executive meeting agendas.",
          actions: [{ label: "Roadshow Coordination", href: "/corporate-accounts", style: "accent", icon: "ChevronRight" }],
        },
        {
          id: genItemId(),
          icon: "FileText",
          title: "4. Central billing and reporting",
          description: "Consolidated billing structured by cost centre, corporate entity or project code. Travel administrators access detailed passenger manifests, journey logs and uniform monthly invoicing across all regional locations.",
          actions: [{ label: "Corporate Invoicing", href: "/corporate-accounts", style: "accent", icon: "ChevronRight" }],
        },
      ],
      settings: { columns: "4", showHeader: true },
      appearance: { theme: "dark", padding: "lg", border: true, textAlign: "center" },
    },
    {
      id: genId(),
      type: "mediaContent",
      variant: "media-right",
      order: 4,
      enabled: true,
      content: {
        eyebrow: "How It Runs",
        heading: "Three stages, one accountable partner",
        description: "Coordinating corporate travel across regional borders follows a transparent operational sequence designed to maintain duty of care:",
        items: [
          { id: genItemId(), icon: "FileCheck", heading: "1. Set up", description: "We review passenger counts, itinerary demands, preferred vehicle specifications and security requirements to configure your service scope." },
          { id: genItemId(), icon: "PhoneCall", heading: "2. Book", description: "Authorised travel arrangers schedule rides through direct integration, verified email dispatch or round the clock telephone booking channels." },
          { id: genItemId(), icon: "Receipt", heading: "3. Reconcile", description: "Your finance department receives a single validated monthly invoice backed by complete route metrics and performance reports." },
        ],
        actions: [{ label: "Request a proposal", href: "#corporate-account", style: "primary", icon: "ArrowRight" }],
      },
      items: [],
      settings: { mediaPosition: "right", containerWidth: "default" },
      appearance: { theme: "darker", background: corpMediaImg, padding: "lg", border: true, textAlign: "left" },
    },
    {
      id: genId(),
      type: "textMediaGrid",
      variant: "media-right",
      order: 5,
      enabled: true,
      content: {
        eyebrow: "Proven in the Region",
        eyebrowIcon: "Building",
        heading: "Recent Work & Enterprise Deployments",
        headingHighlight: "",
        description:
          '<p class="mb-4 leading-relaxed"><strong>Roshn Group Staff Shuttle:</strong> Mobilised multi vehicle daily commuter routes across Riyadh to transport workforce personnel between residential districts and corporate office facilities. Programme metrics recorded on-time schedule completion across the active operational lifecycle.</p><p class="leading-relaxed"><strong>Siemens Energy:</strong> Supplied executive ground transportation and technical site transit across strategic industrial locations in the Kingdom. Delivered continuous operations with fully vetted drivers and on demand dispatch managed through our Riyadh control desk.</p>',
        items: [
          { id: genItemId(), icon: "Building", heading: "Saudi Arabia (KSA)", description: "Managed corporate programmes across Riyadh (KAFD & DQ), Jeddah, and the Eastern Province." },
          { id: genItemId(), icon: "Globe", heading: "UAE & Qatar Hubs", description: "Direct operations in Dubai (DIFC), Abu Dhabi (ADGM), and Doha (West Bay) under 1 agreement." },
        ],
        media: [
          { id: genItemId(), type: "stat", column: "left", size: "short", statValue: "99.8%", statLabel: "On-Time Arrival Rate" },
          { id: genItemId(), type: "image", column: "left", size: "tall", image: corpHeroImg, imageAlt: "Corporate Fleet Riyadh", overlay: "blue" },
          { id: genItemId(), type: "image", column: "right", size: "tall", image: corpMediaImg, imageAlt: "Executive Passenger Dubai", overlay: "gradient" },
          { id: genItemId(), type: "stat", column: "right", size: "short", statValue: "24/7", statLabel: "Control Room Operations" },
        ],
      },
      items: [],
      settings: { mediaPosition: "right" },
      appearance: { theme: "darker", pattern: true, padding: "lg", border: true, textAlign: "left" },
    },
    {
      id: genId(),
      type: "mediaContent",
      variant: "media-left",
      order: 6,
      enabled: true,
      content: {
        eyebrow: "Coverage & Fleet",
        heading: "Regional network and executive fleet",
        description:
          "AB operates direct ground logistics across Saudi Arabia, all seven emirates in the UAE and Qatar. Additional GCC requirements across Bahrain, Kuwait and Oman are fulfilled on request through audited regional transport associates.\n\nVehicles typically deployed:\n• Business Sedan\n• First Class Sedan\n• Executive SUV\n• Premium MPV",
        items: [
          { id: genItemId(), icon: "MapPin", heading: "Saudi Arabia", description: "Full corporate coverage in Riyadh, Jeddah, Dammam, Khobar, AlUla, and Tabuk." },
          { id: genItemId(), icon: "MapPin", heading: "United Arab Emirates", description: "Executive transfers across Dubai, Abu Dhabi, Sharjah, and all Northern Emirates." },
          { id: genItemId(), icon: "MapPin", heading: "Qatar", description: "Comprehensive corporate mobility across Doha, Lusail, West Bay, and industrial zones." },
        ],
        actions: [
          { label: "View the full fleet", href: "/fleet", style: "primary", icon: "Car" },
          { label: "Explore Corporate Accounts", href: "/corporate-accounts", style: "outline", icon: "Briefcase" },
        ],
      },
      items: [],
      settings: { mediaPosition: "left", containerWidth: "default" },
      appearance: { theme: "dark", background: corpMediaImg, padding: "lg", border: true, textAlign: "left" },
    },
    {
      id: genId(),
      type: "contactForm",
      variant: "corporate",
      order: 7,
      enabled: true,
      content: {
        eyebrow: "Request a Proposal",
        heading: "Request a corporate transportation proposal",
        description:
          "Submit your travel schedule, route manifests or RFP documentation for comprehensive operational evaluation and commercial quotation.",
        icon: "Briefcase",
        submitLabel: "Request a proposal",
        successTitle: "Proposal Request Received",
        successMessage: "Thank you. Our corporate desk will contact you within 4 business hours with your draft proposal and rate card.",
      },
      items: [],
      settings: { layout: "centered" },
      appearance: { theme: "dark", padding: "lg", border: true, textAlign: "left" },
    },
    {
      id: genId(),
      type: "faq",
      variant: "default",
      order: 8,
      enabled: true,
      content: {
        eyebrow: "Questions",
        heading: "Frequently asked questions",
        description: "Key operational and commercial questions on corporate transportation across the GCC.",
        items: corpMd.faqs.map((f) => ({
          id: genItemId(),
          question: f.q,
          answer: f.a,
        })),
      },
      items: [
        { label: "Request a proposal", href: "#corporate-account", style: "primary", icon: "ArrowRight" },
        { label: "Talk to a planner", href: "/contact", style: "secondary", icon: "Phone" },
      ],
      settings: { variant: "default" },
      appearance: { theme: "darker", padding: "lg", border: true, textAlign: "center" },
    },
    {
      id: genId(),
      type: "ctaBanner",
      variant: "centered",
      order: 9,
      enabled: true,
      content: {
        heading: "Planning corporate transportation?",
        description:
          "Connect with AB to structure dependable corporate transportation programmes across Saudi Arabia, the UAE and Qatar backed by regional dispatch control.",
      },
      items: [
        { label: "Request a proposal", href: "#corporate-account", style: "primary", icon: "ArrowRight" },
        { label: "Talk to a planner", href: "/contact", style: "secondary", icon: "Briefcase" },
      ],
      settings: { layout: "centered" },
      appearance: { theme: "dark", padding: "lg", border: true, textAlign: "center" },
    },
  ];

  await db.collection("services").updateOne(
    { slug: "corporate-transportation" },
    {
      $set: {
        title: "Corporate & Staff Transportation",
        subtitle: corpMd.h1,
        desc: "AB delivers corporate transportation built for organisations that require punctuality, discretion and regional reach. Headquartered in Riyadh with central operations, we manage executive travel, employee commuter routes and business delegations across the Gulf Cooperation Council.",
        heroImage: corpHeroImg,
        pageSections: corpSections,
        faqs: corpMd.faqs,
        updatedAt: new Date(),
      },
    }
  );
  updatedPages.push("https://www.ab.limo/services/corporate-transportation");
  console.log("  ✓ Updated /services/corporate-transportation in DB");

  // =========================================================================
  // 2. UPDATE SERVICES COLLECTION: event-transportation
  // =========================================================================
  console.log(">>> Processing /services/event-transportation...");
  const eventMd = parseMd(path.join(mdBase, "www.ab.limo-services-event-transportation.md"));
  const eventHeroImg = eventMd.images[0]?.src || "/services/event-transportation.jpg";
  const eventSoundstormImg = eventMd.images[1]?.src || "/services/event-transportation.jpg";
  const eventAdipecImg = eventMd.images[2]?.src || "/services/event-transportation.jpg";

  const eventSections = [
    {
      id: genId(),
      type: "hero",
      variant: "background-content",
      order: 0,
      enabled: true,
      content: {
        eyebrow: "Events, Conferences & Exhibitions",
        title: "Reliable Event Transportation for Flawless Regional Summits",
        titleHighlight: "",
        description:
          "Coordinated event transportation requires punctual fleet positioning, vetted professional chauffeurs and continuous central supervision across host cities. AB manages large delegate movements and private VIP motorcades for premier conferences, state gatherings and exhibitions across Saudi Arabia, the UAE and Qatar.",
      },
      items: [
        { label: "Request a proposal", href: "#event-brief", style: "primary", icon: "ArrowRight", iconPosition: "right" },
        { label: "Talk to a planner", href: "/contact", style: "secondary", icon: "Phone", iconPosition: "left" },
        { label: "View all services →", href: "/services", style: "link", icon: "Calendar", iconPosition: "left" },
      ],
      settings: { minHeight: "85vh", overlayOpacity: 85, contentPosition: "left", buttonLayout: "row" },
      appearance: { theme: "darker", background: eventHeroImg, padding: "none", border: false, textAlign: "left", overlayGradient: "default" },
    },
    {
      id: genId(),
      type: "marquee",
      variant: "default",
      order: 1,
      enabled: true,
      content: {
        items: [
          { id: genItemId(), icon: "Radio", label: "24/7 Central Dispatch" },
          { id: genItemId(), icon: "Globe", label: "3 Countries with Direct Fleet" },
          { id: genItemId(), icon: "Plane", label: "8 Regional Airports Served" },
          { id: genItemId(), icon: "Users", label: "Uniformed On-Site Ground Marshals" },
          { id: genItemId(), icon: "Navigation", label: "Real-Time Satellite Telematics" },
          { id: genItemId(), icon: "FileText", label: "Single Consolidated Post-Event Invoicing" },
        ],
      },
      items: [],
      settings: { speed: "normal", opacity: 90 },
      appearance: { theme: "darker", padding: "sm", border: true },
    },
    {
      id: genId(),
      type: "mediaContent",
      variant: "media-left",
      order: 2,
      enabled: true,
      content: {
        eyebrow: "How We Work",
        heading: "Coordinated Fleet Control",
        description:
          "Executing professional event transportation demands rigorous planning, immediate communication and strict duty of care. AB deploys dedicated local project leads and continuous GPS tracking from our central operations centre, keeping delegate transfers smooth between international airport terminals, official hotels and major exhibition venues.",
        items: [
          { id: genItemId(), icon: "Users", heading: "Dedicated On-Site Coordinators", description: "Uniformed ground marshals managing arrivals, curb side staging, and load-ins." },
          { id: genItemId(), icon: "Radio", heading: "24/7 Live Operations Desk", description: "Telemetry tracking and proactive congestion rerouting across urban summit corridors." },
          { id: genItemId(), icon: "Shield", heading: "Strict Duty of Care Standards", description: "Background-checked chauffeurs, GACA-compliant commercial vehicles, and dedicated standby cover." },
        ],
        actions: [{ label: "Request an Event Proposal", href: "#event-brief", style: "primary", icon: "ArrowRight" }],
      },
      items: [],
      settings: { mediaPosition: "left", containerWidth: "default" },
      appearance: { theme: "darker", background: eventHeroImg, padding: "lg", border: true, textAlign: "left" },
    },
    {
      id: genId(),
      type: "serviceCards",
      variant: "3-column",
      order: 3,
      enabled: true,
      content: {
        eyebrow: "What You Get",
        heading: "Built for event transportation",
        description: "Four integrated mobility tiers tailored for major conferences, cultural festivals, and ministerial gatherings.",
        sectionCta: { label: "View Event Capabilities", href: "/services", style: "outline", icon: "Calendar" },
        bottomCta: { label: "Send Your Event Brief", href: "#event-brief", style: "primary", icon: "ArrowRight" },
      },
      items: [
        {
          id: genItemId(),
          icon: "Bus",
          title: "1. Delegate shuttles",
          description: "Scheduled coach and minibus loops connect primary conference hotels directly with summit venues. Continuous timetable monitoring manages passenger volume efficiently during peak arrival and departure cycles.",
          actions: [{ label: "Shuttle Scope", href: "#event-brief", style: "accent", icon: "ChevronRight" }],
        },
        {
          id: genItemId(),
          icon: "Crown",
          title: "2. VIP car pools",
          description: "Dedicated luxury vehicle allocations with a private driver serve keynote speakers, corporate executives and ministerial delegations. Chauffeurs remain on standby for unexpected schedule modifications and private side meetings.",
          actions: [{ label: "VIP Allocations", href: "#event-brief", style: "accent", icon: "ChevronRight" }],
        },
        {
          id: genItemId(),
          icon: "Compass",
          title: "3. On site coordinators",
          description: "Uniformed ground marshals direct passengers at arrival gates, curbside pickup points and venue staging lanes. Our team coordinates vehicle movement directly to prevent curbside congestion.",
          actions: [{ label: "Ground Marshalling", href: "#event-brief", style: "accent", icon: "ChevronRight" }],
        },
        {
          id: genItemId(),
          icon: "Radio",
          title: "4. Live control room",
          description: "Operations specialists track all vehicle positions through satellite telematics from our 24/7 dispatch office. Route planners monitor local road congestion and direct drivers around bottlenecks in real time.",
          actions: [{ label: "Live Dispatch", href: "#event-brief", style: "accent", icon: "ChevronRight" }],
        },
      ],
      settings: { columns: "4", showHeader: true },
      appearance: { theme: "dark", padding: "lg", border: true, textAlign: "center" },
    },
    {
      id: genId(),
      type: "mediaContent",
      variant: "media-right",
      order: 4,
      enabled: true,
      content: {
        eyebrow: "How It Runs",
        heading: "Three stages, one accountable partner",
        description: "High-capacity event ground transport delivered through a proven three-stage execution framework:",
        items: [
          { id: genItemId(), icon: "FileCheck", heading: "1. Plan", description: "Route assessment, airport arrival mapping, vehicle staging permits and hotel access protocols are finalised well before delegate arrivals begin." },
          { id: genItemId(), icon: "Car", heading: "2. Operate", description: "On site personnel coordinate vehicle departures while our operations room tracks flight schedules and highway traffic patterns continuously." },
          { id: genItemId(), icon: "BarChart3", heading: "3. Report", description: "Consolidated journey logs, passenger manifest counts and itemised billing data are provided immediately after event operations conclude." },
        ],
        actions: [{ label: "Plan event transport", href: "#event-brief", style: "primary", icon: "ArrowRight" }],
      },
      items: [],
      settings: { mediaPosition: "right", containerWidth: "default" },
      appearance: { theme: "darker", background: eventSoundstormImg, padding: "lg", border: true, textAlign: "left" },
    },
    {
      id: genId(),
      type: "textMediaGrid",
      variant: "media-right",
      order: 5,
      enabled: true,
      content: {
        eyebrow: "Proven in the Region",
        eyebrowIcon: "Calendar",
        heading: "Recent Work & High-Capacity Events",
        headingHighlight: "",
        description:
          '<p class="mb-4 leading-relaxed"><strong>MDL Beast Soundstorm Festival:</strong> Delivered round the clock artist shuttles, crew logistics and executive guest movements across remote festival grounds outside Riyadh, operating continuous fleet links between central hotels and production perimeters.</p><p class="leading-relaxed"><strong>ADIPEC VIP Shuttle Services:</strong> Managed point to point transfers, ministerial motorcades and dedicated delegate transit for international energy industry leaders attending Abu Dhabi National Exhibition Centre, supported by on site coordination teams.</p>',
        items: [
          { id: genItemId(), icon: "Music", heading: "Soundstorm Festival Logistics", description: "Round-the-clock artist shuttles, crew movements, and remote festival perimeter routing." },
          { id: genItemId(), icon: "Building", heading: "ADIPEC Energy Summit", description: "Ministerial motorcades, VIP shuttle corridors, and multi-hotel delegate loops at ADNEC." },
        ],
        media: [
          { id: genItemId(), type: "image", column: "left", size: "tall", image: eventSoundstormImg, imageAlt: "Soundstorm Festival Fleet Staging", overlay: "blue" },
          { id: genItemId(), type: "stat", column: "left", size: "short", statValue: "100%", statLabel: "Guaranteed Fleet Dispatch" },
          { id: genItemId(), type: "stat", column: "right", size: "short", statValue: "24/7", statLabel: "On-Site Operations Control" },
          { id: genItemId(), type: "image", column: "right", size: "tall", image: eventAdipecImg, imageAlt: "ADIPEC VIP Shuttle Fleet Abu Dhabi", overlay: "gradient" },
        ],
      },
      items: [],
      settings: { mediaPosition: "right" },
      appearance: { theme: "darker", pattern: true, padding: "lg", border: true, textAlign: "left" },
    },
    {
      id: genId(),
      type: "mediaContent",
      variant: "media-left",
      order: 6,
      enabled: true,
      content: {
        eyebrow: "Where We Run It",
        heading: "Regional Coverage and Deployed Fleets",
        description:
          "AB provides directly managed operations across primary commercial centres in three Gulf states. Planners organising regional summits can rely on dedicated territory networks:\n\n• Event Transportation in Saudi Arabia (Riyadh, Jeddah, AlUla)\n• Event Transportation in UAE (Dubai, Abu Dhabi)\n• Event Transportation in Qatar (Doha, Lusail)\n\nVehicles typically deployed:\n• First Class Sedan\n• Executive SUV\n• Executive Van\n• Coach",
        items: [
          { id: genItemId(), icon: "MapPin", heading: "Saudi Arabia (KSA)", description: "Summits, giga-project launches and festivals across Riyadh, Jeddah, AlUla, and Dammam." },
          { id: genItemId(), icon: "MapPin", heading: "United Arab Emirates", description: "Large-scale exhibitions and conferences across DWTC, Expo City Dubai, and ADNEC Abu Dhabi." },
          { id: genItemId(), icon: "MapPin", heading: "Qatar Hub", description: "High-level state summits, sports tournaments and corporate delegations across Doha and Lusail." },
        ],
        actions: [
          { label: "View the full fleet", href: "/fleet", style: "primary", icon: "Car" },
          { label: "Explore Services", href: "/services", style: "outline", icon: "Calendar" },
        ],
      },
      items: [],
      settings: { mediaPosition: "left", containerWidth: "default" },
      appearance: { theme: "dark", background: eventAdipecImg, padding: "lg", border: true, textAlign: "left" },
    },
    {
      id: genId(),
      type: "contactForm",
      variant: "event",
      order: 7,
      enabled: true,
      content: {
        eyebrow: "Plan Your Event Transport",
        heading: "Speak with our regional fleet operations desk",
        description:
          "Connect with our dedicated planning team to structure reliable event transportation for your upcoming summit or corporate conference across the Gulf region.",
        icon: "Calendar",
        submitLabel: "Request a proposal",
        successTitle: "Event Brief Received",
        successMessage: "Thank you. Our senior event logistics desk will contact you within 4 business hours.",
      },
      items: [],
      settings: { layout: "centered" },
      appearance: { theme: "dark", padding: "lg", border: true, textAlign: "left" },
    },
    {
      id: genId(),
      type: "faq",
      variant: "default",
      order: 8,
      enabled: true,
      content: {
        eyebrow: "Questions",
        heading: "Frequently asked questions",
        description: "Operational insights for event directors, production managers and protocol officers.",
        items: eventMd.faqs.map((f) => ({
          id: genItemId(),
          question: f.q,
          answer: f.a,
        })),
      },
      items: [
        { label: "Request a proposal", href: "#event-brief", style: "primary", icon: "ArrowRight" },
        { label: "Talk to a planner", href: "/contact", style: "secondary", icon: "Phone" },
      ],
      settings: { variant: "default" },
      appearance: { theme: "darker", padding: "lg", border: true, textAlign: "center" },
    },
    {
      id: genId(),
      type: "ctaBanner",
      variant: "centered",
      order: 9,
      enabled: true,
      content: {
        heading: "Planning event transportation?",
        description: "Speak with our regional fleet operations desk to structure flawless guest movements across Saudi Arabia, the UAE and Qatar.",
      },
      items: [
        { label: "Request a proposal", href: "#event-brief", style: "primary", icon: "ArrowRight" },
        { label: "Talk to a planner", href: "/contact", style: "secondary", icon: "Phone" },
      ],
      settings: { layout: "centered" },
      appearance: { theme: "dark", padding: "lg", border: true, textAlign: "center" },
    },
  ];

  await db.collection("services").updateOne(
    { slug: "event-transportation" },
    {
      $set: {
        title: "Event Transportation",
        subtitle: eventMd.h1,
        desc: "Coordinated event transportation requires punctual fleet positioning, vetted professional chauffeurs and continuous central supervision across host cities. AB manages large delegate movements and private VIP motorcades for premier conferences, state gatherings and exhibitions across Saudi Arabia, the UAE and Qatar.",
        heroImage: eventHeroImg,
        pageSections: eventSections,
        faqs: eventMd.faqs,
        updatedAt: new Date(),
      },
    }
  );
  updatedPages.push("https://www.ab.limo/services/event-transportation");
  console.log("  ✓ Updated /services/event-transportation in DB");

  // =========================================================================
  // 3. UPDATE SERVICES COLLECTION: intercity-transfers
  // =========================================================================
  console.log(">>> Processing /services/intercity-transfers...");
  const intercityMd = parseMd(path.join(mdBase, "www.ab.limo-services-intercity-transfers.md"));
  const intercityHeroImg = "/services/www.ab.limo-services-intercity-transfers-dubai-abu-dhabi-images/image1.jpg";

  const intercitySections = [
    {
      id: genId(),
      type: "hero",
      variant: "background-content",
      order: 0,
      enabled: true,
      content: {
        eyebrow: "Intercity Ground Transportation",
        title: "Intercity chauffeur service UAE for seamless business travel",
        titleHighlight: "",
        description:
          "An intercity chauffeur service UAE provides managed point to point road travel across the emirates with professional chauffeurs and continuous flight tracking. Executive travellers secure punctual departures between major commercial centres, international airports and regional project offices through direct central dispatch.",
      },
      items: [
        { label: "Request a proposal", href: "/contact", style: "primary", icon: "ArrowRight", iconPosition: "right" },
        { label: "Book a transfer", href: "/booking", style: "secondary", icon: "Car", iconPosition: "left" },
        { label: "All services →", href: "/services", style: "link", icon: "Route", iconPosition: "left" },
      ],
      settings: { minHeight: "85vh", overlayOpacity: 85, contentPosition: "left", buttonLayout: "row" },
      appearance: { theme: "darker", background: intercityHeroImg, padding: "none", border: false, textAlign: "left", overlayGradient: "default" },
    },
    {
      id: genId(),
      type: "marquee",
      variant: "default",
      order: 1,
      enabled: true,
      content: {
        items: [
          { id: genItemId(), icon: "Radio", label: "24/7 Central Dispatch" },
          { id: genItemId(), icon: "Globe", label: "3 Countries with Direct Fleet" },
          { id: genItemId(), icon: "Plane", label: "8 Regional Airports Served" },
          { id: genItemId(), icon: "Shield", label: "Point-to-Point Borderless Transit" },
          { id: genItemId(), icon: "Navigation", label: "Real-Time Telemetry & Traffic Rerouting" },
          { id: genItemId(), icon: "FileText", label: "Consolidated Corporate Accounts" },
        ],
      },
      items: [],
      settings: { speed: "normal", opacity: 90 },
      appearance: { theme: "darker", padding: "sm", border: true },
    },
    {
      id: genId(),
      type: "mediaContent",
      variant: "media-left",
      order: 2,
      enabled: true,
      content: {
        eyebrow: "Operational Protocol",
        heading: "How we work",
        description:
          "Organisations requiring a reliable intercity chauffeur service UAE rely on structured ground transport protocols managed from a central operations hub. Every route pairs experienced chauffeurs with real time GPS tracking, unified regional account management and immediate dispatch capability across the Arabian Gulf.",
        items: [
          { id: genItemId(), icon: "Compass", heading: "Direct Corridor Navigation", description: "Direct non-stop road transit eliminating connection delays and multi-leg itineraries." },
          { id: genItemId(), icon: "Radio", heading: "24/7 Operations Supervision", description: "Continuous control room tracking from initial pickup to final destination arrival." },
          { id: genItemId(), icon: "Shield", heading: "Verified Duty of Care", description: "Strict mechanical inspections, commercial licensing, and protocol-trained chauffeurs." },
        ],
        actions: [{ label: "Request a Proposal", href: "/contact", style: "primary", icon: "ArrowRight" }],
      },
      items: [],
      settings: { mediaPosition: "left", containerWidth: "default" },
      appearance: { theme: "darker", background: intercityHeroImg, padding: "lg", border: true, textAlign: "left" },
    },
    {
      id: genId(),
      type: "serviceCards",
      variant: "3-column",
      order: 3,
      enabled: true,
      content: {
        eyebrow: "Service Capabilities",
        heading: "Built for intercity transfers",
        description: "Corporate travel demands consistency, complete route visibility and vehicle suitability across all regional jurisdictions.",
      },
      items: [
        {
          id: genItemId(),
          icon: "Route",
          title: "Point to point transfers",
          description: "Direct non stop transit connects headquarters, industrial zones and regional offices across emirate borders without vehicle transfers or interim delays.",
          actions: [{ label: "Explore Point-to-Point", href: "/contact", style: "accent", icon: "ChevronRight" }],
        },
        {
          id: genItemId(),
          icon: "Compass",
          title: "Popular routes",
          description: "A city to city transfer delivers executives directly between primary urban business districts with transparent logistics and verified routing.",
          actions: [{ label: "View Routes", href: "/services/intercity-transfers/dubai-abu-dhabi", style: "accent", icon: "ChevronRight" }],
        },
        {
          id: genItemId(),
          icon: "Plane",
          title: "Airport to city",
          description: "Inbound travellers receive flight tracking, terminal meet and greet arrivals and direct onward private intercity car transit to their destination.",
          actions: [{ label: "Airport Protocol", href: "/services/airport-transfers", style: "accent", icon: "ChevronRight" }],
        },
        {
          id: genItemId(),
          icon: "Clock",
          title: "One way, return or hourly",
          description: "Choose single legs, same day returns or continuous standby with a dedicated long distance chauffeur for fluid executive agendas.",
          actions: [{ label: "Flexible Hire", href: "/contact", style: "accent", icon: "ChevronRight" }],
        },
      ],
      settings: { columns: "4", showHeader: true },
      appearance: { theme: "dark", padding: "lg", border: true, textAlign: "center" },
    },
    {
      id: genId(),
      type: "mediaContent",
      variant: "media-right",
      order: 4,
      enabled: true,
      content: {
        eyebrow: "Operational Workflow",
        heading: "Three stages, one accountable partner",
        description: "Coordinating corporate travel across regional borders follows a transparent operational sequence designed to maintain duty of care:",
        items: [
          { id: genItemId(), icon: "FileText", heading: "1. Brief", description: "Submit passenger manifests, pickup windows, luggage requirements and special protocol details directly to our central booking coordinators." },
          { id: genItemId(), icon: "MapPin", heading: "2. Plan", description: "Operations teams assign optimal vehicle categories, verify highway route clearances and schedule chauffeurs to meet pickup timing." },
          { id: genItemId(), icon: "Car", heading: "3. Operate", description: "Central dispatch monitors vehicle telemetry continuously, providing real time pickup updates and quiet travel to the final arrival point." },
        ],
        actions: [{ label: "Request a proposal", href: "/contact", style: "primary", icon: "ArrowRight" }],
      },
      items: [],
      settings: { mediaPosition: "right", containerWidth: "default" },
      appearance: { theme: "darker", background: intercityHeroImg, padding: "lg", border: true, textAlign: "left" },
    },
    {
      id: genId(),
      type: "faq",
      variant: "default",
      order: 5,
      enabled: true,
      content: {
        eyebrow: "Questions",
        heading: "Frequently asked questions",
        description: "Operational details for intercity travel across the UAE and GCC.",
        items: intercityMd.faqs.map((f) => ({
          id: genItemId(),
          question: f.q,
          answer: f.a,
        })),
      },
      items: [
        { label: "Request a proposal", href: "/contact", style: "primary", icon: "ArrowRight" },
        { label: "Talk to a planner", href: "/contact", style: "secondary", icon: "Phone" },
      ],
      settings: { variant: "default" },
      appearance: { theme: "darker", padding: "lg", border: true, textAlign: "center" },
    },
    {
      id: genId(),
      type: "ctaBanner",
      variant: "centered",
      order: 6,
      enabled: true,
      content: {
        heading: "Planning intercity transfers?",
        description: "Deploy a professional intercity chauffeur service UAE with central dispatch, verified duty of care protocols and premium executive vehicles across every emirate.",
      },
      items: [
        { label: "Request a proposal", href: "/contact", style: "primary", icon: "ArrowRight" },
        { label: "Talk to a planner", href: "/contact", style: "secondary", icon: "Phone" },
      ],
      settings: { layout: "centered" },
      appearance: { theme: "dark", padding: "lg", border: true, textAlign: "center" },
    },
  ];

  await db.collection("services").updateOne(
    { slug: "intercity-transfers" },
    {
      $set: {
        title: "Intercity Transfers",
        subtitle: intercityMd.h1,
        desc: "An intercity chauffeur service UAE provides managed point to point road travel across the emirates with professional chauffeurs and continuous flight tracking. Executive travellers secure punctual departures between major commercial centres, international airports and regional project offices through direct central dispatch.",
        heroImage: intercityHeroImg,
        pageSections: intercitySections,
        faqs: intercityMd.faqs,
        updatedAt: new Date(),
      },
    }
  );
  updatedPages.push("https://www.ab.limo/services/intercity-transfers");
  console.log("  ✓ Updated /services/intercity-transfers in DB");

  // =========================================================================
  // 4. UPDATE ARTICLES COLLECTION: All Regional & City Service Pages
  // =========================================================================
  const articleUpdates = [
    {
      slug: "services/corporate-transportation/saudi-arabia",
      url: "https://www.ab.limo/services/corporate-transportation/saudi-arabia",
      mdFile: "www.ab.limo-services-corporate-transportation-saudi-arabia1.md",
      templateType: "service-country",
      country: "saudi-arabia",
      category: "corporate-transportation",
    },
    {
      slug: "services/corporate-transportation/uae",
      url: "https://www.ab.limo/services/corporate-transportation/uae",
      mdFile: "www.ab.limo-services-corporate-transportation-uae.md",
      templateType: "service-country",
      country: "uae",
      category: "corporate-transportation",
    },
    {
      slug: "services/corporate-transportation/qatar",
      url: "https://www.ab.limo/services/corporate-transportation/qatar",
      mdFile: "www.ab.limo-services-corporate-transportation-qatar.md",
      templateType: "service-country",
      country: "qatar",
      category: "corporate-transportation",
    },
    {
      slug: "services/event-transportation/saudi-arabia",
      url: "https://www.ab.limo/services/event-transportation/saudi-arabia",
      mdFile: "www.ab.limo-services-event-transportation-saudi-arabia.md",
      templateType: "service-country",
      country: "saudi-arabia",
      category: "event-transportation",
    },
    {
      slug: "services/event-transportation/uae",
      url: "https://www.ab.limo/services/event-transportation/uae",
      mdFile: "www.ab.limo-services-event-transportation-uae.md",
      templateType: "service-country",
      country: "uae",
      category: "event-transportation",
    },
    {
      slug: "services/event-transportation/qatar",
      url: "https://www.ab.limo/services/event-transportation/qatar",
      mdFile: "www.ab.limo-services-event-transportation-qatar.md",
      templateType: "service-country",
      country: "qatar",
      category: "event-transportation",
    },
    {
      slug: "services/intercity-transfers/dubai-abu-dhabi",
      url: "https://www.ab.limo/services/intercity-transfers/dubai-abu-dhabi",
      mdFile: "www.ab.limo-services-intercity-transfers-dubai-abu-dhabi.md",
      templateType: "service-city",
      country: "uae",
      city: "dubai",
      category: "intercity-transfers",
    },
    {
      slug: "services/chauffeur-vip/saudi-arabia/riyadh",
      url: "https://www.ab.limo/services/chauffeur-vip/saudi-arabia/riyadh",
      mdFile: "www.ab.limo-services-chauffeur-vip-saudi-arabia-riyadh.md",
      templateType: "service-city",
      country: "saudi-arabia",
      city: "riyadh",
      category: "chauffeur-vip",
    },
    {
      slug: "services/chauffeur-vip/saudi-arabia/jeddah",
      url: "https://www.ab.limo/services/chauffeur-vip/saudi-arabia/jeddah",
      mdFile: "www.ab.limo-services-chauffeur-vip-saudi-arabia-jeddah.md",
      templateType: "service-city",
      country: "saudi-arabia",
      city: "jeddah",
      category: "chauffeur-vip",
    },
    {
      slug: "services/chauffeur-vip/saudi-arabia/dammam",
      url: "https://www.ab.limo/services/chauffeur-vip/saudi-arabia/dammam",
      mdFile: "www.ab.limo-services-chauffeur-vip-saudi-arabia-dammam1.md",
      templateType: "service-city",
      country: "saudi-arabia",
      city: "dammam",
      category: "chauffeur-vip",
    },
    {
      slug: "services/chauffeur-vip/saudi-arabia/al-khobar",
      url: "https://www.ab.limo/services/chauffeur-vip/saudi-arabia/al-khobar",
      mdFile: "www.ab.limo-services-chauffeur-vip-saudi-arabia-al-khobar.md",
      templateType: "service-city",
      country: "saudi-arabia",
      city: "al-khobar",
      category: "chauffeur-vip",
    },
    {
      slug: "services/chauffeur-vip/saudi-arabia/alula",
      url: "https://www.ab.limo/services/chauffeur-vip/saudi-arabia/alula",
      mdFile: "www.ab.limo-services-chauffeur-vip-saudi-arabia-alula.md",
      templateType: "service-city",
      country: "saudi-arabia",
      city: "alula",
      category: "chauffeur-vip",
    },
    {
      slug: "services/chauffeur-vip/saudi-arabia/mecca",
      url: "https://www.ab.limo/services/chauffeur-vip/saudi-arabia/mecca",
      mdFile: "www.ab.limo-services-chauffeur-vip-saudi-arabia-mecca.md",
      templateType: "service-city",
      country: "saudi-arabia",
      city: "mecca",
      category: "chauffeur-vip",
    },
    {
      slug: "services/chauffeur-vip/saudi-arabia/medina",
      url: "https://www.ab.limo/services/chauffeur-vip/saudi-arabia/medina",
      mdFile: "www.ab.limo-services-chauffeur-vip-saudi-arabia-medina.md",
      templateType: "service-city",
      country: "saudi-arabia",
      city: "medina",
      category: "chauffeur-vip",
    },
    {
      slug: "services/chauffeur-vip/saudi-arabia/tabuk",
      url: "https://www.ab.limo/services/chauffeur-vip/saudi-arabia/tabuk",
      mdFile: "www.ab.limo-services-chauffeur-vip-saudi-arabia-tabuk.md",
      templateType: "service-city",
      country: "saudi-arabia",
      city: "tabuk",
      category: "chauffeur-vip",
    },
  ];

  for (const item of articleUpdates) {
    const md = parseMd(path.join(mdBase, item.mdFile));
    const existing = await db.collection("articles").findOne({ slug: item.slug });

    const primaryImg = md.images[0]?.src || "/services/corporate-transportation.jpg";

    if (!existing) {
      // Create new article doc (e.g. dubai-abu-dhabi)
      console.log(`>>> Creating new article doc for ${item.slug}...`);
      const newSections = [
        {
          id: genId(),
          type: "hero",
          variant: "background-content",
          order: 0,
          enabled: true,
          content: {
            eyebrow: "Intercity Transfer",
            title: md.h1,
            description: "A professional Dubai to Abu Dhabi transfer provides scheduled intercity travel between the two emirates in comfort. Dedicated chauffeurs manage the route directly via the E11 or E311 motorways.",
          },
          items: [
            { label: "Book a transfer", href: "/booking", style: "primary", icon: "ArrowRight" },
            { label: "Request a proposal", href: "/contact", style: "secondary", icon: "Phone" },
          ],
          settings: { minHeight: "80vh", overlayOpacity: 85, contentPosition: "left" },
          appearance: { theme: "darker", background: primaryImg, padding: "none", border: false, textAlign: "left" },
        },
        {
          id: genId(),
          type: "mediaContent",
          variant: "media-left",
          order: 1,
          enabled: true,
          content: {
            eyebrow: "Route Logistics",
            heading: "Essential Route Facts for Dubai and Abu Dhabi Travel",
            description: "Intercity transit between the two emirates connects major business centres, federal offices and transport hubs along modern highway corridors. Operating logistics require precise planning around urban traffic patterns, customs corridors and airport schedules.",
            items: [
              { id: genItemId(), icon: "Clock", heading: "Journey Time", description: "Direct motorway transit typically takes 75–90 minutes depending on exact terminal or hotel coordinates." },
              { id: genItemId(), icon: "Route", heading: "Journey Type", description: "Intercity itineraries run as single one way transfers or scheduled same day return trips aligned with executive business agendas." },
              { id: genItemId(), icon: "Radio", heading: "24/7 Availability", description: "Fleet dispatch operates round the clock to support early flight arrivals, evening diplomatic functions and corporate movements." },
            ],
          },
          items: [],
          settings: { mediaPosition: "left" },
          appearance: { theme: "darker", background: md.images[1]?.src || primaryImg, padding: "lg", border: true, textAlign: "left" },
        },
        {
          id: genId(),
          type: "fleetGrid",
          variant: "4-column",
          order: 2,
          enabled: true,
          content: {
            eyebrow: "Vehicle Options",
            heading: "Vehicle Options for Every Dubai to Abu Dhabi Transfer",
            description: "Choosing the appropriate vehicle class for a luxury car transfer Dubai to Abu Dhabi depends on group composition, work requirements during transit and baggage requirements.",
          },
          items: [
            { id: genItemId(), badge: "Executive", name: "Executive Saloon (Lexus / BMW)", category: "Business Sedan", image: "/cars/sedans/LEXUS.png", capacity: "3 Guests", bags: "2 Bags" },
            { id: genItemId(), badge: "First Class", name: "Luxury Saloon (Mercedes S-Class)", category: "First Class Sedan", image: "/cars/sedans/msc.png", capacity: "3 Guests", bags: "3 Bags" },
            { id: genItemId(), badge: "Large Teams", name: "Executive MPV (Mercedes V-Class)", category: "Luxury MPV", image: "/cars/vans/MERCEDES%20BENZ%20V%20CLASS.png", capacity: "6 Guests", bags: "5 Bags" },
          ],
          settings: { columns: "3" },
          appearance: { theme: "dark", padding: "lg", border: true, textAlign: "left" },
        },
        {
          id: genId(),
          type: "faq",
          variant: "default",
          order: 3,
          enabled: true,
          content: {
            eyebrow: "Questions",
            heading: "Frequently Asked Questions",
            description: "Direct answers for Dubai to Abu Dhabi intercity journeys.",
            items: md.faqs.map((f) => ({
              id: genItemId(),
              question: f.q,
              answer: f.a,
            })),
          },
          items: [],
          settings: { variant: "default" },
          appearance: { theme: "darker", padding: "lg", border: true, textAlign: "center" },
        },
      ];

      await db.collection("articles").insertOne({
        slug: item.slug,
        title: md.h1,
        subtitle: "Executive intercity transfer between Dubai and Abu Dhabi",
        excerpt: "Professional chauffeur transfer between Dubai and Abu Dhabi via the E11 corridor with continuous flight tracking, fixed pricing, and 24/7 dispatch.",
        templateType: item.templateType,
        country: item.country,
        city: item.city,
        category: item.category,
        featured_image: primaryImg,
        sections: newSections,
        faqs: md.faqs,
        status: "published",
        isPublished: true,
        published_at: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      updatedPages.push(item.url);
      console.log(`  ✓ Created ${item.slug} in DB`);
      continue;
    }

    // If document exists, update its sections with real images and matched content
    console.log(`>>> Updating article ${item.slug}...`);
    let sections = Array.isArray(existing.sections) ? existing.sections : [];

    // 1. Update Hero section background and heading
    const heroIdx = sections.findIndex((s: any) => s.type === "hero");
    if (heroIdx !== -1) {
      sections[heroIdx].content = {
        ...sections[heroIdx].content,
        title: md.h1,
      };
      if (primaryImg) {
        sections[heroIdx].appearance = {
          ...sections[heroIdx].appearance,
          background: primaryImg,
        };
      }
    }

    // 2. Distribute images across mediaContent sections
    let imgCursor = 1;
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].type === "mediaContent" && md.images[imgCursor]) {
        sections[i].appearance = {
          ...sections[i].appearance,
          background: md.images[imgCursor].src,
        };
        imgCursor++;
      }
    }

    // 3. Update FAQ section if present in MD
    if (md.faqs.length > 0) {
      const faqIdx = sections.findIndex((s: any) => s.type === "faq");
      if (faqIdx !== -1) {
        sections[faqIdx].content = {
          ...sections[faqIdx].content,
          items: md.faqs.map((f) => ({
            id: genItemId(),
            question: f.q,
            answer: f.a,
          })),
        };
      }
    }

    await db.collection("articles").updateOne(
      { slug: item.slug },
      {
        $set: {
          title: md.h1,
          featured_image: primaryImg,
          sections: sections,
          faqs: md.faqs.length > 0 ? md.faqs : existing.faqs,
          updatedAt: new Date(),
        },
      }
    );
    updatedPages.push(item.url);
    console.log(`  ✓ Updated ${item.slug} in DB`);
  }

  console.log("\n=======================================================");
  console.log(`TOTAL PAGES UPDATED: ${updatedPages.length}`);
  updatedPages.forEach((u) => console.log(`  ✓ ${u}`));

  await mongoose.disconnect();
  console.log("\nDisconnected from MongoDB Atlas.");
}

main().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});
