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
  process.env.MONGO_URI ||
  "mongodb+srv://mohsinreddragon260_db_user:vrlzo58zqDOVVneU@cluster0.gpfinl2.mongodb.net/ablimo-db?retryWrites=true&w=majority";

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

// ── 10 Structured Page Sections for Event Transportation ─────────────

const pageSections = [
  // 1. Hero Section
  {
    id: "sec-event-hero",
    type: "hero",
    variant: "background-content",
    order: 0,
    enabled: true,
    content: {
      eyebrow: "Events, Conferences & Exhibitions",
      title: "Event transportation,",
      titleHighlight: "planned like an operation.",
      description:
        "Guests remember the first hour and the last hour of an event, and both usually happen in a vehicle. AB plans and runs every movement around your event: airport arrivals, hotel shuttles, VIP cars, speaker and artist transfers, staff transport and the departure wave. Everything is coordinated from one control room, with our team on site.",
    },
    items: [
      {
        label: "Plan Event Transport",
        href: "#event-brief",
        style: "primary",
        icon: "ArrowRight",
        iconPosition: "right",
      },
      {
        label: "Request a Call with an Event Planner",
        href: "/contact",
        style: "secondary",
        icon: "Phone",
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
      background:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&h=800&fit=crop&q=80",
      padding: "none",
      border: false,
      textAlign: "left",
      overlayGradient: "default",
    },
  },

  // 2. Marquee Trust Facts
  {
    id: "sec-event-trust",
    type: "marquee",
    variant: "default",
    order: 1,
    enabled: true,
    content: {
      heading: "Operational Hallmarks & Event Logistics Standards",
    },
    items: [
      { id: genItemId("mrq"), title: "Dedicated Event Command Centre" },
      { id: genItemId("mrq"), title: "On-Site Route Coordinators" },
      { id: genItemId("mrq"), title: "Live Control Room Dispatch" },
      { id: genItemId("mrq"), title: "VIP & Keynote Chauffeur Pools" },
      { id: genItemId("mrq"), title: "Flight Tracking & Airport Desks" },
      { id: genItemId("mrq"), title: "100% Guaranteed Fleet Dispatch" },
      { id: genItemId("mrq"), title: "Detailed Post-Event Reporting" },
      { id: genItemId("mrq"), title: "GACA Licensed & Insured Fleet" },
    ],
    settings: {
      speed: "normal",
      pauseOnHover: true,
    },
    appearance: {
      theme: "darker",
      padding: "sm",
      border: true,
      textAlign: "center",
    },
  },

  // 3. What We Deliver (ServiceCards - 6 Deliverables)
  {
    id: "sec-event-deliverables",
    type: "serviceCards",
    variant: "3-column",
    order: 2,
    enabled: true,
    content: {
      eyebrow: "Operating Capabilities",
      heading: "What we deliver",
      description:
        "A comprehensive operational framework ensuring flawless arrivals, frictionless venue movements, and coordinated departures.",
    },
    items: [
      {
        id: genItemId("deliv"),
        icon: "FileText",
        title: "Transport Plan",
        description:
          "A written plan before the event covering passenger groups, vehicle numbers by day and hour, routes, loading zones, timings, standby fleet and contingency rules. You approve it, and we operate to it.",
        actions: [{ label: "Plan Scope", href: "#event-brief" }],
      },
      {
        id: genItemId("deliv"),
        icon: "Plane",
        title: "Arrivals & Departures",
        description:
          "Meet-and-greet desks at the airport, flight tracking for every guest, and grouped transfers to hotels. Departures are scheduled back from flight times, so nobody misses a flight.",
        actions: [{ label: "Airport Protocol", href: "#event-brief" }],
      },
      {
        id: genItemId("deliv"),
        icon: "RefreshCw",
        title: "Shuttle Loops",
        description:
          "Timed shuttles between hotels and venues, with frequency set to forecast demand and adjusted live from the control room.",
        actions: [{ label: "Loop Scheduling", href: "#event-brief" }],
      },
      {
        id: genItemId("deliv"),
        icon: "Crown",
        title: "VIP & Speaker Cars",
        description:
          "A dedicated pool of executive sedans and SUVs with chauffeurs briefed on the VIP schedule, protocol and venue access points.",
        actions: [{ label: "VIP Protocols", href: "#event-brief" }],
      },
      {
        id: genItemId("deliv"),
        icon: "Users",
        title: "Artist, Crew & Production",
        description:
          "Vans and minibuses for crews and equipment-light production teams, scheduled around rehearsals, call times, and load-ins.",
        actions: [{ label: "Production Logistics", href: "#event-brief" }],
      },
      {
        id: genItemId("deliv"),
        icon: "Compass",
        title: "On-Site Coordination",
        description:
          "Transport coordinators at hotels, venues and the airport, working with your venue and security teams on accreditation, loading zones and traffic flow.",
        actions: [{ label: "Ground Marshalling", href: "#event-brief" }],
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

  // 4. How We Plan Your Event (MediaContent - 6-Stage Planning)
  {
    id: "sec-event-planning",
    type: "mediaContent",
    variant: "media-right",
    order: 3,
    enabled: true,
    content: {
      eyebrow: "Operational Framework",
      heading: "How we plan your event",
      description:
        "Transport failure is not an option when thousands of delegates and high-profile guests rely on your schedule. Our 6-stage lifecycle eliminates uncertainty weeks before the first guest touches down.",
      mediaTitle: "Event Control Room Operations",
      items: [
        {
          id: genItemId("plan"),
          icon: "PhoneCall",
          heading: "1. Brief Call",
          description:
            "Dates, venues, guest profile, expected numbers, and your operational non-negotiables established with an event transport director.",
        },
        {
          id: genItemId("plan"),
          icon: "FileSpreadsheet",
          heading: "2. Draft Plan & Quote",
          description:
            "Comprehensive vehicle schedule, on-site staffing allocation, loading plans and transparent pricing within agreed working days.",
        },
        {
          id: genItemId("plan"),
          icon: "MapPin",
          heading: "3. Site Visits & Reconnaissance",
          description:
            "Venues, partner hotels, security checkpoints, loading bays, and airport terminal routes walked and precisely timed.",
        },
        {
          id: genItemId("plan"),
          icon: "Car",
          heading: "4. Rehearsal & Dry Run",
          description:
            "Drivers briefed on security protocols, vehicle passes checked, staging areas tested, and routes driven before guests arrive.",
        },
        {
          id: genItemId("plan"),
          icon: "Radio",
          heading: "5. Live Operation",
          description:
            "Dedicated control room and on-site coordinators actively orchestrate every wave with GPS telematics and live flight tracking.",
        },
        {
          id: genItemId("plan"),
          icon: "BarChart3",
          heading: "6. Post-Event Debrief & Report",
          description:
            "Complete audit report covering passenger volumes, trip counts by vehicle type, on-time performance against plan, and lessons learned.",
        },
      ],
      actions: [
        {
          label: "Plan Your Event Transport →",
          href: "#event-brief",
          style: "primary",
          icon: "ArrowRight",
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
      background:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1000&q=80",
      padding: "lg",
      border: true,
      textAlign: "left",
    },
  },

  // 5. Fleet Allocation (FleetGrid - 4 Vehicle Classes)
  {
    id: "sec-event-fleet",
    type: "fleetGrid",
    variant: "4-column",
    order: 4,
    enabled: true,
    content: {
      eyebrow: "Fleet Scale",
      heading: "Vehicles deployed across every tier",
      description:
        "We deploy anything from a curated pool of VIP cars for a board offsite to multi-tier vehicle fleets moving thousands of passengers over multi-day public events.",
    },
    items: [
      {
        id: genItemId("flt"),
        badge: "Ministers & Keynotes",
        image:
          "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop&q=80",
        imageAlt: "Mercedes-Benz S-Class VIP Car",
        category: "First-Class Sedan",
        name: "Mercedes-Benz S-Class / Maybach",
        capacity: "3 Seats",
        bags: "2 Bags",
        capacityIcon: "Users",
        bagsIcon: "Briefcase",
        actions: [{ label: "VIP Allocation", href: "#event-brief" }],
      },
      {
        id: genItemId("flt"),
        badge: "Speaker Panels & VIPs",
        image:
          "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&h=400&fit=crop&q=80",
        imageAlt: "Mercedes V-Class Luxury MPV",
        category: "Luxury MPV",
        name: "Mercedes-Benz V-Class",
        capacity: "6 Seats",
        bags: "5 Bags",
        capacityIcon: "Users",
        bagsIcon: "Briefcase",
        actions: [{ label: "Panel Allocation", href: "#event-brief" }],
      },
      {
        id: genItemId("flt"),
        badge: "Artist, AV & Production",
        image:
          "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&h=400&fit=crop&q=80",
        imageAlt: "Mercedes Sprinter Crew Minivan",
        category: "Executive Minivan",
        name: "Mercedes Sprinter Crew (9–14 Seats)",
        capacity: "9–14 Seats",
        bags: "8 Bags",
        capacityIcon: "Users",
        bagsIcon: "Briefcase",
        actions: [{ label: "Crew Allocation", href: "#event-brief" }],
      },
      {
        id: genItemId("flt"),
        badge: "High-Capacity Loops",
        image:
          "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&h=400&fit=crop&q=80",
        imageAlt: "Luxury Executive Coach",
        category: "Executive Motorcoach",
        name: "Luxury Coach (30–50 Seats)",
        capacity: "30–50 Seats",
        bags: "40 Bags",
        capacityIcon: "Users",
        bagsIcon: "Briefcase",
        actions: [{ label: "Shuttle Allocation", href: "#event-brief" }],
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

  // 6. Event Types We Power (ServiceCards - 6 Categories)
  {
    id: "sec-event-types",
    type: "serviceCards",
    variant: "3-column",
    order: 5,
    enabled: true,
    content: {
      eyebrow: "Event Categories",
      heading: "Event types we power",
      description:
        "Tailored mobility architecture designed for the specific operational demands of regional gatherings.",
    },
    items: [
      {
        id: genItemId("typ"),
        icon: "Building",
        title: "Conferences & Summits",
        description:
          "Multi-hotel loops, VIP keynote transfers, protocol motorcades, and synchronized delegate arrivals for high-level summits.",
        actions: [{ label: "Conference Solutions", href: "#event-brief" }],
      },
      {
        id: genItemId("typ"),
        icon: "Layers",
        title: "Exhibitions & Trade Shows",
        description:
          "High-frequency shuttle corridors moving attendees, buyers, and exhibitors continuously between airports, parking, and exhibition halls.",
        actions: [{ label: "Exhibition Transport", href: "#event-brief" }],
      },
      {
        id: genItemId("typ"),
        icon: "Music",
        title: "Festivals & Concerts",
        description:
          "Staged guest ingress and egress routing, artist green-room transfers, and dedicated production crew shuttles.",
        actions: [{ label: "Entertainment Logistics", href: "#event-brief" }],
      },
      {
        id: genItemId("typ"),
        icon: "Trophy",
        title: "Sports Tournaments",
        description:
          "Athlete and team transfers, referee delegations, VIP lounges, media contingents, and stadium access management.",
        actions: [{ label: "Tournament Protocols", href: "#event-brief" }],
      },
      {
        id: genItemId("typ"),
        icon: "Sparkles",
        title: "Launches & Gala Dinners",
        description:
          "Punctual, elegant arrival coordination with white-glove chauffeur standards for corporate celebrations and brand showcases.",
        actions: [{ label: "Gala Mobility", href: "#event-brief" }],
      },
      {
        id: genItemId("typ"),
        icon: "Shield",
        title: "State & Diplomatic Summits",
        description:
          "Strict security clearance, motorcade support, protocol liaison officers, and airside airport arrivals for ministerial delegations.",
        actions: [{ label: "Diplomatic Logistics", href: "#event-brief" }],
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

  // 7. Regional Execution & Experience (TextMediaGrid)
  {
    id: "sec-event-experience",
    type: "textMediaGrid",
    variant: "media-right",
    order: 6,
    enabled: true,
    content: {
      eyebrow: "Regional Execution",
      heading: "Proven Event Transport Across Saudi Arabia, UAE & Qatar",
      description:
        "Managing guest logistics across major Gulf cities requires deep familiarity with local venue geometries, permit processes, and municipal traffic regulations. AB maintains registered operating entities, staging yards, and experienced dispatch teams across Riyadh, Jeddah, Dammam, Dubai, Abu Dhabi, and Doha.",
      mediaTitle: "GCC Event Operations",
      badge: "GCC Certified",
      items: [
        {
          id: genItemId("stat"),
          type: "stat",
          column: "left",
          size: "short",
          statValue: "100%",
          statLabel: "Guaranteed Fleet Dispatch",
        },
        {
          id: genItemId("img"),
          type: "image",
          column: "left",
          size: "tall",
          image:
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop&q=80",
          imageAlt: "Dubai & Riyadh Event Transport",
          overlay: "blue",
        },
        {
          id: genItemId("img"),
          type: "image",
          column: "right",
          size: "tall",
          image:
            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop&q=80",
          imageAlt: "Convention Center Event Logistics",
          overlay: "gradient",
        },
        {
          id: genItemId("stat"),
          type: "stat",
          column: "right",
          size: "short",
          statValue: "24/7",
          statLabel: "Live Operations Command",
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

  // 8. Plan Your Event Transport (ContactForm / RFP Brief)
  {
    id: "sec-event-brief",
    type: "contactForm",
    variant: "event",
    order: 7,
    enabled: true,
    content: {
      eyebrow: "Plan Your Event Transport",
      heading: "Send your event brief or RFP",
      formTitle: "Event Transport Brief & RFP",
      description:
        "Submit your event parameters or speak directly with an event logistics director. We design custom vehicle schedules, loading protocols, and on-site command setups across Saudi Arabia, UAE, and Qatar.",
      icon: "Calendar",
      submitLabel: "Send Event Brief",
      successTitle: "Event Brief Received",
      successMessage:
        "Thank you. Our senior event logistics team will review your requirements and contact you within 4 business hours with an initial movement framework.",
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
    id: "sec-event-faq",
    type: "faq",
    variant: "default",
    order: 8,
    enabled: true,
    content: {
      eyebrow: "Knowledge Base",
      heading: "Frequently Asked Questions",
      description:
        "Direct operational answers for conference producers, agency directors, and event procurement teams.",
      items: [
        {
          id: genItemId("faq"),
          question: "How far in advance should we contact you?",
          answer:
            "For major conferences and large-scale gatherings over 500 delegates, we recommend initiating planning 8–12 weeks ahead to secure optimal fleet allocations and coordinate venue permits. Smaller VIP pools and board offsites can be mobilised on accelerated timelines where fleet capacity permits.",
        },
        {
          id: genItemId("faq"),
          question: "Can you work with our venue's security and accreditation process?",
          answer:
            "Yes. Our on-site transport coordinators liaise directly with venue management, local authorities, and private security details to handle vehicle access passes, security manifests, secure loading bays, and VIP drop-off protocols.",
        },
        {
          id: genItemId("faq"),
          question: "What happens if a flight is delayed or a session overruns?",
          answer:
            "Our centralized event control room tracks incoming flights live and monitors venue agendas in real time. We automatically adjust chauffeur dispatch schedules and maintain dedicated standby vehicles to absorb unexpected delays without guest disruption.",
        },
        {
          id: genItemId("faq"),
          question: "Do you provide branded vehicles or signage?",
          answer:
            "Yes. Upon request, we provide discrete co-branded vehicle decals, digital airport meet-and-greet signage, branded vehicle headrest covers, and uniformed dispatch staff aligned with your event brand identity.",
        },
        {
          id: genItemId("faq"),
          question: "Can you supply buses and VIP cars under one contract?",
          answer:
            "Yes. We consolidate luxury sedans, VIP MPVs, crew vans, and 50-passenger executive motorcoaches under a single master movement plan, one dedicated on-site command structure, and a unified commercial invoice.",
        },
        {
          id: genItemId("faq"),
          question: "Do you provide transport reports for sponsors or authorities?",
          answer:
            "Yes. Following the event, our control room provides comprehensive data reports detailing passenger throughput, peak-hour movements, vehicle utilisation, on-time performance against plan, and safety audits.",
        },
      ],
    },
    items: [
      {
        label: "Send Event Brief",
        href: "#event-brief",
        style: "primary",
        icon: "ArrowRight",
      },
      {
        label: "Call Event Logistics Desk",
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
    id: "sec-event-cta",
    type: "ctaBanner",
    variant: "centered",
    order: 9,
    enabled: true,
    content: {
      heading: "Event transportation, planned like an operation.",
      description:
        "Guests remember the first hour and the last hour of an event. Coordinate your arrivals, venue shuttles, VIP pools and departure waves with our dedicated event control room.",
    },
    items: [
      {
        label: "Plan Event Transport",
        href: "#event-brief",
        style: "primary",
        icon: "ArrowRight",
      },
      {
        label: "Request a Call with an Event Planner",
        href: "/contact",
        style: "secondary",
        icon: "Phone",
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
    icon: "Shield",
    title: "Event Command Centre",
    desc: "A dedicated control room coordinates every vehicle, route, and arrival in real time throughout your event.",
  },
  {
    icon: "Truck",
    title: "Rapid Deployment & Multi-Tier Fleets",
    desc: "From board-level VIP cars to 50-passenger delegate motorcoaches deployed on schedule with standby cover.",
  },
  {
    icon: "Compass",
    title: "On-Site Coordination",
    desc: "Named transport coordinators at hotels, venues and airports liaise with organisers and security from load-in to egress.",
  },
];

const legacyCards = [
  {
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop",
    tag: "Conferences",
    title: "Conferences & Summits",
    desc: "Multi-hotel loops, VIP keynote transfers, protocol motorcades, and synchronized delegate arrivals.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=800&h=500&fit=crop",
    tag: "Exhibitions",
    title: "Exhibitions & Trade Shows",
    desc: "High-frequency shuttles moving attendees, buyers, and exhibitors continuously across sprawling convention halls.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=500&fit=crop",
    tag: "Festivals",
    title: "Festivals & Concerts",
    desc: "Timed, high-volume crowd management, artist green-room transfers, and staged egress routing.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=500&fit=crop",
    tag: "Sports",
    title: "Sports Tournaments",
    desc: "Athlete and team transfers, referee delegations, VIP lounges, media contingents, and stadium access management.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=500&fit=crop",
    tag: "Galas",
    title: "Product Launches & Gala Dinners",
    desc: "Punctual, elegant arrival coordination with white-glove chauffeur standards for brand showcases.",
  },
];

const legacySections = [
  {
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",
    imageAlt: "Event Transport Control Room",
    title: "How We Plan Your Event",
    paragraphs: [
      "Guests remember the first hour and the last hour of an event, and both usually happen in a vehicle. AB plans and runs every movement around your event: airport arrivals, hotel shuttles, VIP cars, speaker and artist transfers, staff transport and the departure wave.",
      "Everything is coordinated from one control room, with our team on site.",
    ],
    bullets: [
      { text: "1. Brief call: Dates, venues, guest profile, numbers, and non-negotiables." },
      { text: "2. Draft plan and quote: Vehicle schedule, staffing, and price within agreed working days." },
      { text: "3. Site visits: Venues, hotels and airport routes walked and timed." },
      { text: "4. Rehearsal day: Drivers briefed and routes driven before guests arrive." },
      { text: "5. Live operation: Control room and on-site coordinators run the plan." },
      { text: "6. Debrief: Detailed post-event report and lessons learned." },
    ],
    imageSide: "right",
    dark: true,
  },
  {
    image:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=600&fit=crop",
    imageAlt: "On-Site Event Marshalling",
    title: "What We Deliver: Flawless Movement",
    paragraphs: [
      "The success of an event hinges on how smoothly guests arrive, move, and depart. AB turns transport into an invisible, friction-free operation.",
      "From the first airport pickup to the final shuttle wave of the evening, every movement is orchestrated by our command team.",
    ],
    bullets: [
      { text: "Written transport plan covering loading zones, routes, timings and standby fleet" },
      { text: "Airport meet-and-greet desks with real-time flight tracking for every guest" },
      { text: "Timed shuttle loops between official hotels and venues with live frequency adjustments" },
      { text: "Dedicated VIP chauffeur pools for keynote speakers, dignitaries, and artists" },
      { text: "Post-event report with passenger throughput, vehicle utilisation, and on-time stats" },
    ],
    imageSide: "left",
    dark: true,
  },
];

const legacyFaqs = [
  {
    q: "How far in advance should we contact you?",
    a: "For major conferences and large-scale gatherings over 500 delegates, we recommend initiating planning 8–12 weeks ahead to secure optimal fleet allocations and coordinate venue permits. Smaller VIP pools and board offsites can be mobilised on accelerated timelines where fleet capacity permits.",
  },
  {
    q: "Can you work with our venue's security and accreditation process?",
    a: "Yes. Our on-site transport coordinators liaise directly with venue management, local authorities, and private security details to handle vehicle access passes, security manifests, secure loading bays, and VIP drop-off protocols.",
  },
  {
    q: "What happens if a flight is delayed or a session overruns?",
    a: "Our centralized event control room tracks incoming flights live and monitors venue agendas in real time. We automatically adjust chauffeur dispatch schedules and maintain dedicated standby vehicles to absorb unexpected delays without guest disruption.",
  },
  {
    q: "Do you provide branded vehicles or signage?",
    a: "Yes. Upon request, we provide discrete co-branded vehicle decals, digital airport meet-and-greet signage, branded vehicle headrest covers, and uniformed dispatch staff aligned with your event brand identity.",
  },
  {
    q: "Can you supply buses and VIP cars under one contract?",
    a: "Yes. We consolidate luxury sedans, VIP MPVs, crew vans, and 50-passenger executive motorcoaches under a single master movement plan, one dedicated on-site command structure, and a unified commercial invoice.",
  },
  {
    q: "Do you provide transport reports for sponsors or authorities?",
    a: "Yes. Following the event, our control room provides comprehensive data reports detailing passenger throughput, peak-hour movements, vehicle utilisation, on-time performance against plan, and safety audits.",
  },
];

// ── Main Update Execution ───────────────────────────────────────────

async function run() {
  console.log("Connecting to MongoDB:", DB_URI.replace(/:[^:@]+@/, ":****@"));
  await mongoose.connect(DB_URI);
  console.log("Connected successfully.");

  const collection = mongoose.connection.collection("services");

  const query = { slug: "event-transportation" };
  const existing = await collection.findOne(query);

  if (!existing) {
    console.error("Could not find event-transportation service document in DB!");
    process.exit(1);
  }

  console.log("Found existing service:", existing._id, existing.title);

  const updateDoc = {
    $set: {
      title: "Event Transportation",
      subtitle:
        "Event transportation for conferences, exhibitions and festivals in Saudi Arabia and the GCC: fleet planning, shuttles, VIP pools and a live control room.",
      desc:
        "Complete guest-movement logistics for conferences, exhibitions, concerts, and large-scale corporate gatherings in Saudi Arabia and the GCC.",
      heroImage:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&h=800&fit=crop&q=80",
      breadcrumb: "Event Transportation",
      features: legacyFeatures,
      cardsHeading: "What we deliver",
      cardsDesc:
        "A comprehensive operational framework ensuring flawless arrivals, frictionless venue movements, and coordinated departures.",
      cards: legacyCards,
      sections: legacySections,
      faqs: legacyFaqs,
      ctaTitle: "Event transportation, planned like an operation.",
      ctaDesc:
        "Guests remember the first hour and the last hour of an event. Coordinate your arrivals, venue shuttles, VIP pools and departure waves with our dedicated event control room.",
      ctaLabel: "Plan event transport",
      ctaHref: "#event-brief",
      seo: {
        metaTitle: "Event & Conference Transportation in the GCC | AB",
        metaDescription:
          "Event transportation for conferences, exhibitions and festivals in Saudi Arabia and the GCC: fleet planning, shuttles, VIP pools and a live control room.",
        ogImage:
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&h=800&fit=crop&q=80",
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
    console.log(
      `  [${idx}] Type: ${s.type.padEnd(14)} | Variant: ${s.variant.padEnd(20)} | Title/Heading: "${
        s.content?.title || s.content?.heading || ""
      }"`
    );
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
