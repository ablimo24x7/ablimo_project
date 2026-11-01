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
  name: "Corporate & Staff Transportation",
  description: "Complete corporate transportation programme with hero, marquee, programmes, how we run it, fleet, standards, case study, proposal form, FAQ, and CTA",
  icon: "Briefcase",
  sections: [
    {
      id: genId(),
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
        { label: "Request a corporate proposal", href: "#corporate-account", style: "primary", icon: "ArrowRight", iconPosition: "right" },
        { label: "Talk to an account manager", href: "/contact", style: "secondary", icon: "Phone", iconPosition: "left" },
        { label: "See how corporate accounts work →", href: "/corporate-accounts", style: "link", icon: "Briefcase", iconPosition: "left" },
      ],
      settings: { minHeight: "85vh", overlayOpacity: 85, contentPosition: "left", buttonLayout: "row" },
      appearance: { theme: "darker", background: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1920&h=800&fit=crop", padding: "none", border: false, textAlign: "left", overlayGradient: "default" },
    },
    {
      id: genId(),
      type: "marquee",
      variant: "default",
      order: 1,
      enabled: true,
      content: {
        items: [
          { id: genItemId(), icon: "Shield", label: "Licensed & Vetted Chauffeurs" },
          { id: genItemId(), icon: "Radio", label: "24/7 Riyadh Central Control Room" },
          { id: genItemId(), icon: "Car", label: "Strictly Black Fleet (< 36 Months)" },
          { id: genItemId(), icon: "Clock", label: "< 15-Minute Incident Notification SLA" },
          { id: genItemId(), icon: "Globe", label: "Unified GCC Coverage (KSA · UAE · Qatar)" },
          { id: genItemId(), icon: "FileText", label: "Consolidated Monthly Billing" },
        ],
      },
      items: [],
      settings: { speed: "normal", opacity: 90 },
      appearance: { theme: "darker", padding: "sm", border: true },
    },
    {
      id: genId(),
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
          id: genItemId(),
          icon: "UserTie",
          title: "Executive chauffeur programmes",
          description:
            "On-call chauffeurs for leadership teams, with vehicle class, preferences and security requirements agreed per executive. Bookings come from executive assistants and are confirmed with chauffeur details before pickup.",
          actions: [{ label: "View Chauffeur Protocol", href: "/services/chauffeur-vip", style: "accent", icon: "ChevronRight" }],
        },
        {
          id: genItemId(),
          icon: "ShieldCheck",
          title: "Dedicated vehicles and drivers",
          description:
            "A chauffeur and vehicle assigned to one executive or department for months at a time. AB handles recruitment, vetting, payroll, relief cover and vehicle maintenance. A replacement vehicle arrives within 15–30 minutes if one is off the road.",
          actions: [{ label: "Dedicated Account Retainers", href: "/corporate-accounts", style: "accent", icon: "ChevronRight" }],
        },
        {
          id: genItemId(),
          icon: "Bus",
          title: "Staff shuttles and daily routes",
          description:
            "Scheduled vans, minibuses or coaches between residential areas, offices and sites, with routes planned around shift times and reviewed as headcount changes. For large or remote workforces, see Workforce Transportation.",
          actions: [{ label: "Workforce Mobility Scope", href: "/services/workforce-transportation", style: "accent", icon: "ChevronRight" }],
        },
        {
          id: genItemId(),
          icon: "Plane",
          title: "Visitor and new-joiner programmes",
          description:
            "Airport arrival meet-and-assist, hotel, office and return for visiting executives, auditors, consultants and relocating staff, seamlessly booked against your corporate account.",
          actions: [{ label: "Airport Protocol Scope", href: "/services/airport-transfers", style: "accent", icon: "ChevronRight" }],
        },
        {
          id: genItemId(),
          icon: "Route",
          title: "Roadshows and multi-city itineraries",
          description:
            "Investor roadshows and site tours across Riyadh, Jeddah, the Eastern Province, Dubai, Abu Dhabi and Doha, with one itinerary owner and the same standards in every city.",
          wide: true,
          actions: [{ label: "Multi-City Dispatch Scope", href: "/corporate-accounts", style: "accent", icon: "ChevronRight" }],
        },
      ],
      settings: { columns: "3", showHeader: true },
      appearance: { theme: "dark", padding: "lg", border: true, textAlign: "center" },
    },
    {
      id: genId(),
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
          { id: genItemId(), icon: "FileCheck", heading: "1. Requirements review", description: "Passenger groups, locations, hours, service levels and security needs." },
          { id: genItemId(), icon: "Compass", heading: "2. Programme design", description: "Routes, vehicle classes, driver numbers, standby cover and booking rules, documented and signed off by you." },
          { id: genItemId(), icon: "Car", heading: "3. Mobilisation", description: "Vehicles prepared, drivers briefed on your sites and protocol, booking channels set up." },
          { id: genItemId(), icon: "Radio", heading: "4. Daily operation", description: "Live tracking, dispatch changes and incident handling from the Riyadh control room, 24/7." },
          { id: genItemId(), icon: "BarChart3", heading: "5. Monthly review", description: "Usage, punctuality and cost by department, with recommended changes." },
        ],
        actions: [
          { label: "Request a Corporate Proposal", href: "#corporate-account", style: "primary", icon: "ArrowRight" },
          { label: "Talk to an Operations Specialist", href: "/contact", style: "outline", icon: "Phone" },
        ],
      },
      items: [],
      settings: { mediaPosition: "right", containerWidth: "default" },
      appearance: { theme: "darker", pattern: true, background: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&q=80", padding: "lg", border: true, textAlign: "left" },
    },
    {
      id: genId(),
      type: "fleetGrid",
      variant: "4-column",
      order: 4,
      enabled: true,
      content: {
        eyebrow: "Fleet Allocation",
        heading: "Vehicles used across corporate programmes",
        description:
          "Strictly black, late-model luxury vehicles under 36 months old, inspected daily and matched to specific passenger capacities.",
        headerAction: { label: "View Complete Fleet Specifications", href: "/fleet" },
        bottomCta: { label: "Request Vehicle Allocation Quote", href: "#corporate-account", style: "secondary", icon: "Car" },
      },
      items: [
        {
          id: genItemId(),
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
          id: genItemId(),
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
          id: genItemId(),
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
          id: genItemId(),
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
      settings: { columns: "4" },
      appearance: { theme: "darker", padding: "lg", border: true, textAlign: "left" },
    },
    {
      id: genId(),
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
          { id: genItemId(), icon: "Shield", heading: "Licensed & Vetted Chauffeurs", description: "Chauffeurs and drivers licensed, background-checked and trained to the AB Chauffeur Standard." },
          { id: genItemId(), icon: "Navigation", heading: "GPS-Tracked & Late-Model Fleet", description: "Vehicles GPS-tracked in real time, no older than 36 months, cleaned and inspected daily." },
          { id: genItemId(), icon: "RefreshCw", heading: "Standby Vehicles & Relief Drivers", description: "Standby vehicles and relief drivers ready for each programme to guarantee zero service interruption." },
          { id: genItemId(), icon: "BellRing", heading: "15-Minute Incident Notification", description: "Incident reporting dispatched to your nominated contact within 15 minutes of any event." },
        ],
        actions: [
          { label: "See how corporate accounts work →", href: "/corporate-accounts", style: "primary", icon: "ArrowRight" },
          { label: "Review Company Standards", href: "/about", style: "outline", icon: "FileText" },
        ],
      },
      items: [],
      settings: { mediaPosition: "left", containerWidth: "default" },
      appearance: { theme: "darker", pattern: true, background: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1000&q=80", padding: "lg", border: true, textAlign: "left" },
    },
    {
      id: genId(),
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
          { id: genItemId(), icon: "Building", heading: "Saudi Arabia (KSA)", description: "Managed programmes across Riyadh (KAFD & DQ), Jeddah, and the Eastern Province (Khobar/Dammam)." },
          { id: genItemId(), icon: "Globe", heading: "UAE & Qatar Hubs", description: "Executive operations in Dubai (DIFC), Abu Dhabi (ADGM), and Doha (West Bay) under 1 agreement." },
        ],
        media: [
          { id: genItemId(), type: "stat", column: "left", size: "short", statValue: "99.8%", statLabel: "On-Time Arrival Rate" },
          { id: genItemId(), type: "image", column: "left", size: "tall", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop&q=80", imageAlt: "Riyadh KAFD Corporate District", overlay: "blue" },
          { id: genItemId(), type: "image", column: "right", size: "tall", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop&q=80", imageAlt: "Dubai Financial District", overlay: "gradient" },
          { id: genItemId(), type: "stat", column: "right", size: "short", statValue: "180+", statLabel: "Weekly Journeys Managed" },
        ],
      },
      items: [],
      settings: { mediaPosition: "right" },
      appearance: { theme: "darker", pattern: true, padding: "lg", border: true, textAlign: "left" },
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
          "Tell us roughly how your organisation travels today. Our commercial desk will review your passenger groups, routes, and timeline, and return with a customized proposal and draft rate card.",
        icon: "Briefcase",
        submitLabel: "Request Corporate Proposal",
        successTitle: "Proposal Request Received",
        successMessage:
          "Thank you. Our corporate operations desk will contact you within 4 business hours with your draft proposal and rate card.",
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
        eyebrow: "Knowledge Base",
        heading: "Frequently Asked Questions",
        description:
          "Key commercial and operational answers for facilities managers, travel leads, and HR directors.",
        items: [
          {
            id: genItemId(),
            question: "What is the difference between a dedicated driver and on-demand chauffeurs?",
            answer:
              "A dedicated driver and vehicle are assigned to you full-time for an agreed period. On-demand chauffeurs are booked per trip or per hour from AB's pool.",
          },
          {
            id: genItemId(),
            question: "Who employs the drivers on a dedicated contract?",
            answer:
              "AB does. We handle vetting, payroll, relief cover and regulatory compliance under our local operating licences.",
          },
          {
            id: genItemId(),
            question: "Can routes change as our headcount changes?",
            answer:
              "Yes. Routes are reviewed monthly, or sooner on request as staff numbers or office locations shift.",
          },
          {
            id: genItemId(),
            question: "Do you cover more than one country under one contract?",
            answer:
              "Yes, through licensed AB entities in Saudi Arabia (KSA), the UAE and Qatar, all governed under a single master framework agreement.",
          },
          {
            id: genItemId(),
            question: "How are incidents handled?",
            answer:
              "The Riyadh control room manages incidents live 24/7, dispatches standby relief vehicles immediately, and sends a written report to your nominated contact.",
          },
        ],
      },
      items: [
        { label: "Explore Commercial Terms", href: "/corporate-accounts", style: "primary", icon: "ArrowRight" },
        { label: "Contact Dispatch Team", href: "/contact", style: "secondary", icon: "Phone" },
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
        heading: "Corporate transportation, managed end to end.",
        description:
          "When your executives, visitors and staff depend on getting somewhere on time every day, transportation becomes an operation in its own right. Talk to AB today.",
      },
      items: [
        { label: "Request a Corporate Proposal", href: "#corporate-account", style: "primary", icon: "ArrowRight" },
        { label: "Commercial Terms on Corporate Accounts", href: "/corporate-accounts", style: "secondary", icon: "Briefcase" },
      ],
      settings: { layout: "centered" },
      appearance: { theme: "dark", padding: "lg", border: true, textAlign: "center" },
    },
  ],
};

export const eventTemplate: TemplatePreset = {
  name: "Event & Conference Transportation",
  description: "End-to-end event mobility: control room, shuttle loops, VIP pools, and brief form",
  icon: "Calendar",
  sections: [
    {
      id: genId(),
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
        { label: "Plan Event Transport", href: "#event-brief", style: "primary", icon: "ArrowRight", iconPosition: "right" },
        { label: "Request a Call with an Event Planner", href: "/contact", style: "secondary", icon: "Phone", iconPosition: "left" },
      ],
      settings: { minHeight: "85vh", overlayOpacity: 85, contentPosition: "left", buttonLayout: "row" },
      appearance: { theme: "darker", background: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&h=800&fit=crop&q=80", padding: "none", border: false, textAlign: "left", overlayGradient: "default" },
    },
    {
      id: genId(),
      type: "marquee",
      variant: "default",
      order: 1,
      enabled: true,
      content: { heading: "Operational Hallmarks & Event Logistics Standards" },
      items: [
        { id: genItemId(), title: "Dedicated Event Command Centre" },
        { id: genItemId(), title: "On-Site Route Coordinators" },
        { id: genItemId(), title: "Live Control Room Dispatch" },
        { id: genItemId(), title: "VIP & Keynote Chauffeur Pools" },
        { id: genItemId(), title: "Flight Tracking & Airport Desks" },
        { id: genItemId(), title: "100% Guaranteed Fleet Dispatch" },
        { id: genItemId(), title: "Detailed Post-Event Reporting" },
        { id: genItemId(), title: "GACA Licensed & Insured Fleet" },
      ],
      settings: { speed: "normal", pauseOnHover: true },
      appearance: { theme: "darker", padding: "sm", border: true, textAlign: "center" },
    },
    {
      id: genId(),
      type: "serviceCards",
      variant: "3-column",
      order: 2,
      enabled: true,
      content: {
        eyebrow: "Operating Capabilities",
        heading: "What we deliver",
        description: "A comprehensive operational framework ensuring flawless arrivals, frictionless venue movements, and coordinated departures.",
      },
      items: [
        { id: genItemId(), icon: "FileText", title: "Transport Plan", description: "A written plan before the event covering passenger groups, vehicle numbers by day and hour, routes, loading zones, timings, standby fleet and contingency rules. You approve it, and we operate to it.", actions: [{ label: "Plan Scope", href: "#event-brief" }] },
        { id: genItemId(), icon: "Plane", title: "Arrivals & Departures", description: "Meet-and-greet desks at the airport, flight tracking for every guest, and grouped transfers to hotels. Departures are scheduled back from flight times, so nobody misses a flight.", actions: [{ label: "Airport Protocol", href: "#event-brief" }] },
        { id: genItemId(), icon: "RefreshCw", title: "Shuttle Loops", description: "Timed shuttles between hotels and venues, with frequency set to forecast demand and adjusted live from the control room.", actions: [{ label: "Loop Scheduling", href: "#event-brief" }] },
        { id: genItemId(), icon: "Crown", title: "VIP & Speaker Cars", description: "A dedicated pool of executive sedans and SUVs with chauffeurs briefed on the VIP schedule, protocol and venue access points.", actions: [{ label: "VIP Protocols", href: "#event-brief" }] },
        { id: genItemId(), icon: "Users", title: "Artist, Crew & Production", description: "Vans and minibuses for crews and equipment-light production teams, scheduled around rehearsals, call times, and load-ins.", actions: [{ label: "Production Logistics", href: "#event-brief" }] },
        { id: genItemId(), icon: "Compass", title: "On-Site Coordination", description: "Transport coordinators at hotels, venues and the airport, working with your venue and security teams on accreditation, loading zones and traffic flow.", actions: [{ label: "Ground Marshalling", href: "#event-brief" }] },
      ],
      settings: { columns: "3", showHeader: true },
      appearance: { theme: "dark", padding: "lg", border: true, textAlign: "center" },
    },
    {
      id: genId(),
      type: "mediaContent",
      variant: "media-right",
      order: 3,
      enabled: true,
      content: {
        eyebrow: "Operational Framework",
        heading: "How we plan your event",
        description: "Transport failure is not an option when thousands of delegates and high-profile guests rely on your schedule. Our 6-stage lifecycle eliminates uncertainty weeks before the first guest touches down.",
        mediaTitle: "Event Control Room Operations",
        items: [
          { id: genItemId(), icon: "PhoneCall", heading: "1. Brief Call", description: "Dates, venues, guest profile, expected numbers, and your operational non-negotiables established with an event transport director." },
          { id: genItemId(), icon: "FileSpreadsheet", heading: "2. Draft Plan & Quote", description: "Comprehensive vehicle schedule, on-site staffing allocation, loading plans and transparent pricing within agreed working days." },
          { id: genItemId(), icon: "MapPin", heading: "3. Site Visits & Reconnaissance", description: "Venues, partner hotels, security checkpoints, loading bays, and airport terminal routes walked and precisely timed." },
          { id: genItemId(), icon: "Car", heading: "4. Rehearsal & Dry Run", description: "Drivers briefed on security protocols, vehicle passes checked, staging areas tested, and routes driven before guests arrive." },
          { id: genItemId(), icon: "Radio", heading: "5. Live Operation", description: "Dedicated control room and on-site coordinators actively orchestrate every wave with GPS telematics and live flight tracking." },
          { id: genItemId(), icon: "BarChart3", heading: "6. Post-Event Debrief & Report", description: "Complete audit report covering passenger volumes, trip counts by vehicle type, on-time performance against plan, and lessons learned." },
        ],
        actions: [{ label: "Plan Your Event Transport →", href: "#event-brief", style: "primary", icon: "ArrowRight" }],
      },
      items: [],
      settings: { mediaPosition: "right", containerWidth: "default" },
      appearance: { theme: "darker", background: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1000&q=80", padding: "lg", border: true, textAlign: "left" },
    },
    {
      id: genId(),
      type: "fleetGrid",
      variant: "4-column",
      order: 4,
      enabled: true,
      content: {
        eyebrow: "Fleet Scale",
        heading: "Vehicles deployed across every tier",
        description: "We deploy anything from a curated pool of VIP cars for a board offsite to multi-tier vehicle fleets moving thousands of passengers over multi-day public events.",
      },
      items: [
        { id: genItemId(), badge: "Ministers & Keynotes", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop&q=80", imageAlt: "Mercedes-Benz S-Class VIP Car", category: "First-Class Sedan", name: "Mercedes-Benz S-Class / Maybach", capacity: "3 Seats", bags: "2 Bags", capacityIcon: "Users", bagsIcon: "Briefcase", actions: [{ label: "VIP Allocation", href: "#event-brief" }] },
        { id: genItemId(), badge: "Speaker Panels & VIPs", image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&h=400&fit=crop&q=80", imageAlt: "Mercedes V-Class Luxury MPV", category: "Luxury MPV", name: "Mercedes-Benz V-Class", capacity: "6 Seats", bags: "5 Bags", capacityIcon: "Users", bagsIcon: "Briefcase", actions: [{ label: "Panel Allocation", href: "#event-brief" }] },
        { id: genItemId(), badge: "Artist, AV & Production", image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&h=400&fit=crop&q=80", imageAlt: "Mercedes Sprinter Crew Minivan", category: "Executive Minivan", name: "Mercedes Sprinter Crew (9–14 Seats)", capacity: "9–14 Seats", bags: "8 Bags", capacityIcon: "Users", bagsIcon: "Briefcase", actions: [{ label: "Crew Allocation", href: "#event-brief" }] },
        { id: genItemId(), badge: "High-Capacity Loops", image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&h=400&fit=crop&q=80", imageAlt: "Luxury Executive Coach", category: "Executive Motorcoach", name: "Luxury Coach (30–50 Seats)", capacity: "30–50 Seats", bags: "40 Bags", capacityIcon: "Users", bagsIcon: "Briefcase", actions: [{ label: "Shuttle Allocation", href: "#event-brief" }] },
      ],
      settings: { columns: "4" },
      appearance: { theme: "darker", padding: "lg", border: true, textAlign: "left" },
    },
    {
      id: genId(),
      type: "serviceCards",
      variant: "3-column",
      order: 5,
      enabled: true,
      content: {
        eyebrow: "Event Categories",
        heading: "Event types we power",
        description: "Tailored mobility architecture designed for the specific operational demands of regional gatherings.",
      },
      items: [
        { id: genItemId(), icon: "Building", title: "Conferences & Summits", description: "Multi-hotel loops, VIP keynote transfers, protocol motorcades, and synchronized delegate arrivals for high-level summits.", actions: [{ label: "Conference Solutions", href: "#event-brief" }] },
        { id: genItemId(), icon: "Layers", title: "Exhibitions & Trade Shows", description: "High-frequency shuttle corridors moving attendees, buyers, and exhibitors continuously between airports, parking, and exhibition halls.", actions: [{ label: "Exhibition Transport", href: "#event-brief" }] },
        { id: genItemId(), icon: "Music", title: "Festivals & Concerts", description: "Staged guest ingress and egress routing, artist green-room transfers, and dedicated production crew shuttles.", actions: [{ label: "Entertainment Logistics", href: "#event-brief" }] },
        { id: genItemId(), icon: "Trophy", title: "Sports Tournaments", description: "Athlete and team transfers, referee delegations, VIP lounges, media contingents, and stadium access management.", actions: [{ label: "Tournament Protocols", href: "#event-brief" }] },
        { id: genItemId(), icon: "Sparkles", title: "Launches & Gala Dinners", description: "Punctual, elegant arrival coordination with white-glove chauffeur standards for corporate celebrations and brand showcases.", actions: [{ label: "Gala Mobility", href: "#event-brief" }] },
        { id: genItemId(), icon: "Shield", title: "State & Diplomatic Summits", description: "Strict security clearance, motorcade support, protocol liaison officers, and airside airport arrivals for ministerial delegations.", actions: [{ label: "Diplomatic Logistics", href: "#event-brief" }] },
      ],
      settings: { columns: "3", showHeader: true },
      appearance: { theme: "dark", padding: "lg", border: true, textAlign: "center" },
    },
    {
      id: genId(),
      type: "textMediaGrid",
      variant: "media-right",
      order: 6,
      enabled: true,
      content: {
        eyebrow: "Regional Execution",
        heading: "Proven Event Transport Across Saudi Arabia, UAE & Qatar",
        description: "Managing guest logistics across major Gulf cities requires deep familiarity with local venue geometries, permit processes, and municipal traffic regulations. AB maintains registered operating entities, staging yards, and experienced dispatch teams across Riyadh, Jeddah, Dammam, Dubai, Abu Dhabi, and Doha.",
        mediaTitle: "GCC Event Operations",
        badge: "GCC Certified",
        items: [
          { id: genItemId(), type: "stat", column: "left", size: "short", statValue: "100%", statLabel: "Guaranteed Fleet Dispatch" },
          { id: genItemId(), type: "image", column: "left", size: "tall", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop&q=80", imageAlt: "Dubai & Riyadh Event Transport", overlay: "blue" },
          { id: genItemId(), type: "image", column: "right", size: "tall", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop&q=80", imageAlt: "Convention Center Event Logistics", overlay: "gradient" },
          { id: genItemId(), type: "stat", column: "right", size: "short", statValue: "24/7", statLabel: "Live Operations Command" },
        ],
      },
      items: [],
      settings: { mediaPosition: "right" },
      appearance: { theme: "darker", pattern: true, padding: "lg", border: true, textAlign: "left" },
    },
    {
      id: genId(),
      type: "contactForm",
      variant: "event",
      order: 7,
      enabled: true,
      content: {
        eyebrow: "Plan Your Event Transport",
        heading: "Send your event brief or RFP",
        formTitle: "Event Transport Brief & RFP",
        description: "Submit your event parameters or speak directly with an event logistics director. We design custom vehicle schedules, loading protocols, and on-site command setups across Saudi Arabia, UAE, and Qatar.",
        icon: "Calendar",
        submitLabel: "Send Event Brief",
        successTitle: "Event Brief Received",
        successMessage: "Thank you. Our senior event logistics team will review your requirements and contact you within 4 business hours with an initial movement framework.",
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
        eyebrow: "Knowledge Base",
        heading: "Frequently Asked Questions",
        description: "Direct operational answers for conference producers, agency directors, and event procurement teams.",
        items: [
          { id: genItemId(), question: "How far in advance should we contact you?", answer: "For major conferences and large-scale gatherings over 500 delegates, we recommend initiating planning 8–12 weeks ahead to secure optimal fleet allocations and coordinate venue permits. Smaller VIP pools and board offsites can be mobilised on accelerated timelines where fleet capacity permits." },
          { id: genItemId(), question: "Can you work with our venue's security and accreditation process?", answer: "Yes. Our on-site transport coordinators liaise directly with venue management, local authorities, and private security details to handle vehicle access passes, security manifests, secure loading bays, and VIP drop-off protocols." },
          { id: genItemId(), question: "What happens if a flight is delayed or a session overruns?", answer: "Our centralized event control room tracks incoming flights live and monitors venue agendas in real time. We automatically adjust chauffeur dispatch schedules and maintain dedicated standby vehicles to absorb unexpected delays without guest disruption." },
          { id: genItemId(), question: "Do you provide branded vehicles or signage?", answer: "Yes. Upon request, we provide discrete co-branded vehicle decals, digital airport meet-and-greet signage, branded vehicle headrest covers, and uniformed dispatch staff aligned with your event brand identity." },
          { id: genItemId(), question: "Can you supply buses and VIP cars under one contract?", answer: "Yes. We consolidate luxury sedans, VIP MPVs, crew vans, and 50-passenger executive motorcoaches under a single master movement plan, one dedicated on-site command structure, and a unified commercial invoice." },
          { id: genItemId(), question: "Do you provide transport reports for sponsors or authorities?", answer: "Yes. Following the event, our control room provides comprehensive data reports detailing passenger throughput, peak-hour movements, vehicle utilisation, on-time performance against plan, and safety audits." },
        ],
      },
      items: [
        { label: "Send Event Brief", href: "#event-brief", style: "primary", icon: "ArrowRight" },
        { label: "Call Event Logistics Desk", href: "/contact", style: "secondary", icon: "Phone" },
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
        heading: "Event transportation, planned like an operation.",
        description: "Guests remember the first hour and the last hour of an event. Coordinate your arrivals, venue shuttles, VIP pools and departure waves with our dedicated event control room.",
      },
      items: [
        { label: "Plan Event Transport", href: "#event-brief", style: "primary", icon: "ArrowRight" },
        { label: "Request a Call with an Event Planner", href: "/contact", style: "secondary", icon: "Phone" },
      ],
      settings: { layout: "centered" },
      appearance: { theme: "dark", padding: "lg", border: true, textAlign: "center" },
    },
  ],
};

// ── Ground Transportation Template ───────────────────────────────

export const groundTransportationTemplate: TemplatePreset = {
  name: "Ground Transportation",
  description: "Comprehensive mobility solutions: airport transfers, executive chauffeur, corporate mobility, intercity journeys, and fleet",
  icon: "Car",
  sections: [
    {
      id: genId(),
      type: "hero",
      variant: "background-content",
      order: 0,
      enabled: true,
      content: {
        eyebrow: "Comprehensive Mobility Solutions",
        title: "Ground transportation,",
        titleHighlight: "seamlessly connected.",
        description:
          "Complete ground transportation solutions for individuals, executives, and organizations across the GCC and worldwide. From airport transfers and personal chauffeur services to corporate travel and event logistics, experience punctual, professional, and reliable mobility.",
      },
      items: [
        { label: "Book Ground Transportation", href: "/contact", style: "primary", icon: "ArrowRight", iconPosition: "right" },
        { label: "Talk to a Transport Specialist", href: "/contact", style: "secondary", icon: "Phone", iconPosition: "left" },
        { label: "Explore Our Fleet →", href: "/fleet", style: "link", icon: "Car", iconPosition: "left" },
      ],
      settings: { minHeight: "85vh", overlayOpacity: 85, contentPosition: "left", buttonLayout: "row" },
      appearance: { theme: "darker", background: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&h=800&fit=crop", padding: "none", border: false, textAlign: "left", overlayGradient: "default" },
    },
    {
      id: genId(),
      type: "marquee",
      variant: "default",
      order: 1,
      enabled: true,
      content: {
        items: [
          { id: genItemId(), icon: "Shield", label: "Licensed & Vetted Professional Chauffeurs" },
          { id: genItemId(), icon: "Radio", label: "24/7 Central Control Room & GPS Tracking" },
          { id: genItemId(), icon: "Plane", label: "Real-Time Flight Tracking & Delay Protection" },
          { id: genItemId(), icon: "Car", label: "Executive Fleet (< 36 Months Old)" },
          { id: genItemId(), icon: "Globe", label: "GCC & Worldwide Network Coverage" },
          { id: genItemId(), icon: "FileText", label: "Consolidated Corporate Invoicing" },
        ],
      },
      items: [],
      settings: { speed: "normal", opacity: 90 },
      appearance: { theme: "darker", padding: "sm", border: true },
    },
    {
      id: genId(),
      type: "serviceCards",
      variant: "3-column",
      order: 2,
      enabled: true,
      content: {
        eyebrow: "Operating Capabilities",
        heading: "Comprehensive Ground Mobility Services",
        description: "End-to-end transportation services tailored to individual, corporate, and group travel demands across the region.",
      },
      items: [
        {
          id: genItemId(),
          icon: "Plane",
          title: "Airport Ground Transfers",
          description: "Seamless airport pickups and drop-offs with live flight monitoring, personalized meet-and-greet name board service, and 60 minutes complimentary waiting time.",
          actions: [{ label: "Airport Protocol", href: "/services/airport-transfers", style: "accent", icon: "ChevronRight" }],
        },
        {
          id: genItemId(),
          icon: "UserTie",
          title: "Personal & Executive Chauffeur",
          description: "Discreet, multilingual professional chauffeurs on demand or by the hour. Impeccable executive vehicles equipped with Wi-Fi, bottled water, and mobile chargers.",
          actions: [{ label: "Chauffeur Protocol", href: "/services/chauffeur-vip", style: "accent", icon: "ChevronRight" }],
        },
        {
          id: genItemId(),
          icon: "Briefcase",
          title: "Corporate & Executive Travel",
          description: "Centralized account management, consolidated monthly billing, and guaranteed vehicle availability for executive teams, board members, and visiting partners.",
          actions: [{ label: "Corporate Solutions", href: "/corporate-accounts", style: "accent", icon: "ChevronRight" }],
        },
        {
          id: genItemId(),
          icon: "MapPin",
          title: "City-to-City Intercity Transfers",
          description: "Direct, comfortable long-distance travel between metropolitan hubs across Saudi Arabia, UAE, and GCC without airport queues or security hassle.",
          actions: [{ label: "Intercity Routes", href: "/contact", style: "accent", icon: "ChevronRight" }],
        },
        {
          id: genItemId(),
          icon: "Calendar",
          title: "Event & Group Logistics",
          description: "Coordinated transportation for conferences, summits, and delegations. From luxury sedans and executive MPVs to 50-passenger executive motorcoaches.",
          actions: [{ label: "Event Mobility", href: "/services/event-transportation", style: "accent", icon: "ChevronRight" }],
        },
        {
          id: genItemId(),
          icon: "Clock",
          title: "Hourly & As-Directed Hire",
          description: "Flexible hourly chauffeur bookings giving you total control of your itinerary, multiple meeting stops, and standby chauffeur time with complete discretion.",
          actions: [{ label: "Book Hourly", href: "/contact", style: "accent", icon: "ChevronRight" }],
        },
      ],
      settings: { columns: "3", showHeader: true },
      appearance: { theme: "dark", padding: "lg", border: true, textAlign: "center" },
    },
    {
      id: genId(),
      type: "mediaContent",
      variant: "media-right",
      order: 3,
      enabled: true,
      content: {
        eyebrow: "End-to-End Solutions",
        heading: "Your Comprehensive Ground Transportation",
        description:
          "AB provides end-to-end ground transportation solutions tailored to your exact needs. Whether you are an individual traveler, a corporate client, or organizing a large event, our comprehensive service covers every aspect of your journey with military precision.",
        items: [
          { id: genItemId(), icon: "CheckCircle", heading: "Airport transfers with flight monitoring", description: "Real-time radar tracking ensures your chauffeur is ready when your wheels touch down." },
          { id: genItemId(), icon: "CheckCircle", heading: "Corporate accounts with centralized billing", description: "Consolidated monthly invoices, spend analytics, and priority booking dispatch." },
          { id: genItemId(), icon: "CheckCircle", heading: "Event and group transportation", description: "Dedicated on-site coordinators, VIP pools, and scheduled shuttle corridors." },
          { id: genItemId(), icon: "CheckCircle", heading: "City-to-city long distance travel", description: "Relax or work in comfort across intercity corridors without airport stress." },
        ],
      },
      items: [],
      settings: { mediaPosition: "right", containerWidth: "default" },
      appearance: { theme: "darker", background: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop", padding: "lg", border: true, textAlign: "left" },
    },
    {
      id: genId(),
      type: "mediaContent",
      variant: "media-left",
      order: 4,
      enabled: true,
      content: {
        eyebrow: "White-Glove Standards",
        heading: "Your Personal Chauffeur & Protocol",
        description:
          "Every journey with AB includes a dedicated professional chauffeur. Our drivers are more than just transportation providers — they are your personal concierge on the road, ensuring supreme comfort, privacy, and safety throughout the journey.",
        items: [
          { id: genItemId(), icon: "UserCheck", heading: "Professionally trained and licensed drivers", description: "Undergoes rigorous background checks, defensive driving certification, and executive protocol training." },
          { id: genItemId(), icon: "Globe", heading: "Multilingual communication skills", description: "Fluent communication in English and Arabic for seamless interaction and complete discretion." },
          { id: genItemId(), icon: "Compass", heading: "Local knowledge and route expertise", description: "Expert mastery of regional routes, VIP access gates, and live traffic avoidance." },
        ],
      },
      items: [],
      settings: { mediaPosition: "left", containerWidth: "default" },
      appearance: { theme: "dark", background: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=600&fit=crop", padding: "lg", border: true, textAlign: "left" },
    },
    {
      id: genId(),
      type: "fleetGrid",
      variant: "4-column",
      order: 5,
      enabled: true,
      content: {
        eyebrow: "Premium Fleet",
        heading: "Executive Fleet Built for Precision Travel",
        description:
          "From top-tier executive sedans to spacious luxury vans, our entire fleet is under 36 months old and maintained to the highest safety specifications.",
      },
      items: [],
      settings: { columns: "4", showHeader: true },
      appearance: { theme: "darker", padding: "lg", border: true, textAlign: "center" },
    },
    {
      id: genId(),
      type: "faq",
      variant: "default",
      order: 6,
      enabled: true,
      content: {
        eyebrow: "Knowledge Base",
        heading: "Frequently Asked Questions",
        description: "Direct answers to common questions about our ground transportation and chauffeur services.",
        items: [
          { id: genItemId(), question: "What is included in AB ground transportation services?", answer: "Our ground transportation covers airport transfers, corporate chauffeur travel, hourly as-directed bookings, intercity journeys, event transportation, and VIP motorcades. All bookings include a professionally vetted chauffeur, flight/traffic tracking, premium amenities, and fuel/tolls." },
          { id: genItemId(), question: "How does airport flight tracking work?", answer: "We monitor commercial and private flights in real time. If your flight is delayed or arrives early, your chauffeur's pickup schedule automatically adjusts, and you receive up to 60 minutes complimentary wait time." },
          { id: genItemId(), question: "Can I book long-distance city-to-city travel?", answer: "Yes, we operate regular intercity routes across Saudi Arabia, UAE, and the wider GCC (such as Riyadh to Dammam, Dubai to Abu Dhabi, and cross-border GCC transfers) with luxury sedans and executive vans." },
          { id: genItemId(), question: "How can businesses set up a corporate transportation account?", answer: "Corporate clients can set up an account with centralized booking, dedicated account managers, customized billing cycles, and consolidated monthly invoices. Contact our team to initiate corporate onboarding." },
          { id: genItemId(), question: "What is the cancellation policy for ground transportation?", answer: "Standard chauffeur bookings can be cancelled or rescheduled up to 12 hours prior to scheduled pickup without charge. For group and event charters, flexible terms are outlined in your service agreement." },
        ],
      },
      items: [
        { label: "Book Ground Transport", href: "/contact", style: "primary", icon: "ArrowRight" },
        { label: "Talk to an Advisor", href: "/contact", style: "secondary", icon: "Phone" },
      ],
      settings: { variant: "default" },
      appearance: { theme: "dark", padding: "lg", border: true, textAlign: "center" },
    },
    {
      id: genId(),
      type: "ctaBanner",
      variant: "centered",
      order: 7,
      enabled: true,
      content: {
        heading: "Ready for comprehensive ground transportation?",
        description: "Experience seamless transportation solutions with AB. Book your journey today or discuss customized corporate transportation programs.",
      },
      items: [
        { label: "Book Ground Transportation", href: "/contact", style: "primary", icon: "ArrowRight" },
        { label: "Contact Transport Team", href: "/contact", style: "secondary", icon: "Phone" },
      ],
      settings: { layout: "centered" },
      appearance: { theme: "darker", padding: "lg", border: true, textAlign: "center" },
    },
  ],
};

// ── Available Presets ────────────────────────────────────────────

export const TEMPLATE_PRESETS: TemplatePreset[] = [
  groundTransportationTemplate,
  corporateTemplate,
  eventTemplate,
  {
    name: "Airport Service",
    description: "Airport transfers with hero, features, and FAQ",
    icon: "Plane",
    sections: [
      corporateTemplate.sections[0],
      corporateTemplate.sections[1],
      corporateTemplate.sections[6],
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
      { label: "Get Started", href: "/contact", style: "primary", icon: "ArrowRight", iconPosition: "right" },
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
        {
          label: (typeof doc.ctaLabel === "string" && doc.ctaLabel.trim()) || "Get Started",
          href: typeof doc.ctaHref === "string" && doc.ctaHref.trim() ? doc.ctaHref.trim() : "/contact",
          style: "primary",
          icon: "ArrowRight",
        },
      ],
      settings: { layout: "centered" },
      appearance: { theme: "dark", padding: "lg", border: true, textAlign: "center" },
    });
  }

  return sections;
}

/**
 * Generates a full 7-section corporate service page customized for any service.
 * Applies the canonical corporateTemplate structure:
 *  0: hero (background-content)
 *  1: serviceCards (3-column)
 *  2: textMediaGrid (Vision 2030 Infrastructure Alignment)
 *  3: mediaContent (Duty of Care & Security Integration)
 *  4: fleetGrid (4-column)
 *  5: contactForm (Enterprise Procurement)
 *  6: faq (Frequently Asked Questions)
 */
export function buildCorporateServiceSections(meta: {
  slug: string;
  title: string;
  subtitle?: string;
  desc?: string;
  heroImage?: string;
}): PageSection[] {
  const heroImg =
    meta.heroImage ||
    "https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";

  return [
    {
      id: genId(),
      type: "hero",
      variant: "background-content",
      order: 0,
      enabled: true,
      content: {
        eyebrow: "B2B Mobility Framework",
        title: "Executive & Corporate",
        titleHighlight: `${meta.title}.`,
        description:
          meta.subtitle ||
          meta.desc ||
          `Designed for the modern enterprise. We provide seamless ${meta.title}, rigorous Duty of Care compliance, and direct integration with your corporate expense systems across the GCC.`,
      },
      items: [
        { label: "Request Enterprise Procurement", href: "#corporate-account", style: "primary", icon: "ArrowRight", iconPosition: "right" },
        { label: "Explore Service Specs", href: "#services", style: "secondary" },
        { label: "24/7 Command Center", href: "#faq", style: "link", icon: "Headset", iconPosition: "left" },
      ],
      settings: { minHeight: "85vh", overlayOpacity: 85, contentPosition: "left", buttonLayout: "row" },
      appearance: { theme: "darker", background: heroImg, padding: "none", border: false, textAlign: "left", overlayGradient: "default" },
    },
    {
      id: genId(),
      type: "serviceCards",
      variant: "3-column",
      order: 1,
      enabled: true,
      content: {
        eyebrow: "Enterprise Core Capabilities",
        heading: `Scalable ${meta.title} for the Boardroom and Beyond.`,
        description: `From dedicated executive transport to large-scale fleet deployments, our architecture adapts to the complex requirements of global organizations operating in Saudi Arabia, UAE, and Qatar.`,
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
        {
          id: genItemId(),
          icon: "UserTie",
          title: "VIP & Executive Transport",
          description: `Standardized, premium point-to-point transfers for executives and stakeholders, ensuring absolute punctuality and discretion.`,
          actions: [
            { label: "View Governance", href: "#", style: "accent", icon: "ChevronRight" },
            { label: "Book Transfer", href: "#corporate-account", style: "text", icon: "CalendarCheck" },
          ],
        },
        {
          id: genItemId(),
          icon: "Clock",
          title: "As-Directed (Hourly Standby)",
          description: `Flexible, dedicated chauffeur-on-standby service. Ideal for executives with fluid schedules, multiple meetings, or diplomatic protocol.`,
          actions: [
            { label: "View Fleet Specs", href: "#", style: "accent", icon: "ChevronRight" },
            { label: "Request Standby", href: "#corporate-account", style: "text", icon: "Timer" },
          ],
        },
        {
          id: genItemId(),
          icon: "Route",
          title: "Strategic Route Logistics",
          description: `Complex multi-stop coordination orchestrated by our central control room. Engineered for roadshows, summit itineraries, and corporate transfers.`,
          actions: [
            { label: "Consult Dispatch", href: "#", style: "accent", icon: "ChevronRight" },
            { label: "Plan Route", href: "#corporate-account", style: "text", icon: "MapLocationDot" },
          ],
        },
        {
          id: genItemId(),
          icon: "Bus",
          title: "Dedicated Fleet Allocation",
          description: `Long-term vehicle procurement and dedicated shuttle operations backed by vetted chauffeurs and rigorous safety SLAs.`,
          actions: [
            { label: "Route Planning", href: "#", style: "accent", icon: "ChevronRight" },
            { label: "Request Fleet Audit", href: "#corporate-account", style: "text", icon: "Users" },
          ],
        },
        {
          id: genItemId(),
          icon: "FileText",
          title: "Enterprise Contracts & SLAs",
          description: `Dedicated fleet leasing and customized service contracts for government ministries, foreign missions, and mega-projects.`,
          wide: true,
          actions: [
            { label: "Submit RFP", href: "#corporate-account", style: "accent", icon: "ChevronRight" },
            { label: "Speak to B2B Sales", href: "#corporate-account", style: "text", icon: "Briefcase" },
          ],
        },
      ],
      settings: { columns: "3", showHeader: true },
      appearance: { theme: "dark", padding: "lg", border: true, textAlign: "center" },
    },
    {
      id: genId(),
      type: "textMediaGrid",
      variant: "media-right",
      order: 2,
      enabled: true,
      content: {
        eyebrow: "Infrastructure Alignment",
        eyebrowIcon: "City",
        heading: "Powering Regional",
        headingHighlight: "Vision 2030",
        headingAfter: "Corporate Ecosystem.",
        description:
          '<p class="mb-6 leading-relaxed">As the Kingdom and GCC region undergo unprecedented economic diversification under the <strong>Vision 2030</strong> mandate, executive mobility infrastructure has evolved exponentially. AB operates at the nexus of this transformation, providing highly secure, scalable, and meticulously managed mobility solutions for multinational corporations entering the market.</p>' +
          `<p class="mb-6 leading-relaxed">Our strategic dispatch capabilities are engineered specifically for premier economic corridors. We maintain a continuous, vetted presence within the <strong>King Abdullah Financial District (KAFD)</strong> and the <strong>Diplomatic Quarter (DQ)</strong>, navigating rigorous security protocols with absolute discretion and efficiency.</p>` +
          `<p class="leading-relaxed">Beyond standard transfers, our <em>${meta.title}</em> services provide global executives with the fluid, reliable mobility required to execute complex operations across the GCC\'s expanding urban and industrial footprint.</p>`,
        items: [
          { id: genItemId(), icon: "BuildingShield", heading: "KAFD & Business Hubs", description: "Dedicated fleet positioning for immediate financial district deployments." },
          { id: genItemId(), icon: "Passport", heading: "Diplomatic Protocol", description: "Vetted personnel trained in embassy and diplomatic security standards." },
        ],
        media: [
          { id: genItemId(), type: "image", column: "left", size: "tall", image: "https://images.unsplash.com/photo-1588726588629-19e48f7d9834?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", imageAlt: "KAFD Architecture", overlay: "blue" },
          { id: genItemId(), type: "image", column: "left", size: "short", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop&q=80", imageAlt: "Executive Sedan", overlay: "none", contain: true },
          { id: genItemId(), type: "stat", column: "right", size: "short", statValue: "100%", statLabel: "TGA Compliant" },
          { id: genItemId(), type: "image", column: "right", size: "tall", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", imageAlt: "Corporate Logistics Data", overlay: "gradient" },
        ],
      },
      items: [],
      settings: { mediaPosition: "right" },
      appearance: { theme: "darker", pattern: true, padding: "lg", border: true, textAlign: "left" },
    },
    {
      id: genId(),
      type: "mediaContent",
      variant: "media-right",
      order: 3,
      enabled: true,
      content: {
        eyebrow: "Uncompromising Duty of Care",
        heading: "Corporate Technology & Security Integration.",
        description: `We don't just provide vehicles; we integrate directly into your corporate risk management and expense software. Our platform satisfies the stringent requirements of Fortune 500 procurement teams.`,
        mediaTitle: "AB Command Center",
        items: [
          { id: genItemId(), icon: "FileInvoiceDollar", heading: "SAP Concur & Expense Integration", description: "Automated e-receipts, centralized corporate billing, and custom cost-center coding to eliminate friction for travel arrangers." },
          { id: genItemId(), icon: "SatelliteDish", heading: "Intelligent Transport Systems (ITS)", description: "Live GPS tracking and central control room dispatch allowing your security teams to monitor movements in real-time." },
          { id: genItemId(), icon: "IdCardClip", heading: "Vetted Professionalism & NDAs", description: "Mandatory comprehensive background checks, defensive driving certifications, and strict Non-Disclosure Agreements for all chauffeurs." },
        ],
        actions: [
          { label: "Request Clearances & Compliance Docs", href: "#corporate-account", style: "outline", icon: "FileShield" },
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
      order: 4,
      enabled: true,
      content: {
        eyebrow: "Corporate Fleet Governance",
        heading: "Strictly Black. Strictly Professional.",
        description: `Our corporate fleet consists exclusively of late-model, immaculate black vehicles maintained to international standards.`,
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
      order: 5,
      enabled: true,
      content: {
        eyebrow: "Partner With Us",
        heading: `Enterprise Procurement for ${meta.title}.`,
        description: `Connect with our enterprise procurement team for dedicated account management, centralized billing, and priority fleet access.`,
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
      order: 6,
      enabled: true,
      content: {
        eyebrow: "Knowledge Base",
        heading: "Frequently Asked Questions",
        description: `Key answers regarding our ${meta.title} operations, billing frameworks, and procurement standards.`,
        items: [
          {
            id: genItemId(),
            question: `How do I book and set up a corporate account for ${meta.title}?`,
            answer: `You can initiate booking immediately through our digital portal or contact our enterprise desk. For recurring requirements, corporate accounts provide SLA guarantees, consolidated monthly billing, and priority fleet dispatch.`,
          },
          {
            id: genItemId(),
            question: "What are your Duty of Care and vetting standards?",
            answer: "All AB chauffeurs undergo comprehensive background checks, hold valid defensive driving certifications, and sign legally binding NDAs. Our vehicles are subject to rigorous preventative maintenance and 24/7 ITS telemetry monitoring.",
          },
          {
            id: genItemId(),
            question: "Can you support multi-city operations across Saudi Arabia and the GCC?",
            answer: "Yes. Our Transport Control Room manages cross-border and inter-city itineraries across Riyadh, Jeddah, Dammam, Dubai, Abu Dhabi, Doha, and Muscat with seamless continuity.",
          },
          {
            id: genItemId(),
            question: "How does corporate billing and SAP Concur integration work?",
            answer: "Upon account activation, corporate rides can be automatically routed into SAP Concur or your corporate expense system with itemized VAT receipts and designated cost-center allocations.",
          },
        ],
      },
      items: [
        { label: "Call Support", href: "tel:+966500000000", style: "secondary", icon: "Phone" },
        { label: "Open Support Ticket", href: "#corporate-account", style: "primary", icon: "ArrowRight" },
      ],
      settings: { variant: "default" },
      appearance: { theme: "darker", padding: "lg", border: true, textAlign: "center" },
    },
  ];
}

