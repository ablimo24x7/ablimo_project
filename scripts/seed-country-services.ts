/**
 * Seed script: Service-country pages (/services/{service}/{country})
 *
 * Creates country-level service articles for every GCC country so that
 * /services/{service}/{country} returns 200 instead of 404.
 * All six services per country: airport-transfers, chauffeur-vip,
 * corporate-transportation, event-transportation, bus-coach-hire,
 * tourism-transportation.
 *
 * Usage: npx tsx scripts/seed-country-services.ts [--dry-run]
 */
import "dotenv/config";
import { connectDB } from "../src/lib/db";
import { Article } from "../src/lib/models/Article";

type CountryMeta = {
  slug: "saudi-arabia" | "uae" | "qatar" | "bahrain" | "kuwait" | "oman";
  name: string;
  image: string;
  cities: { name: string; blurb: string }[];
  airports: string[];
  intro: string;
  tags: string[];
};

type ServiceMeta = {
  slug: | "airport-transfers"
    | "chauffeur-vip"
    | "corporate-transportation"
    | "event-transportation"
    | "bus-coach-hire"
    | "tourism-transportation";
  categoryLabel: string;
  title: (c: CountryMeta) => string;
  excerpt: (c: CountryMeta) => string;
  sections: (c: CountryMeta) => string;
  takeaways: (c: CountryMeta) => string;
  finalThoughts: (c: CountryMeta) => string;
  seoTitle: (c: CountryMeta) => string;
  seoDescription: (c: CountryMeta) => string;
  faqs: (c: CountryMeta) => { q: string; a: string }[];
  readTime: number;
  tags: (c: CountryMeta) => string[];
};

const COUNTRIES: CountryMeta[] = [
  {
    slug: "saudi-arabia",
    name: "Saudi Arabia",
    image: "https://images.unsplash.com/photo-1663900108404-a05e8bf82cda?w=1200&h=600&fit=crop",
    cities: [
      { name: "Riyadh", blurb: "the capital's business corridor from Olaya to KAFD" },
      { name: "Jeddah", blurb: "the commercial hub of the Red Sea coast" },
      { name: "Dammam & Al Khobar", blurb: "the Eastern Province energy corridor" },
      { name: "Mecca & Medina", blurb: "respectful, discreet transport for pilgrims" },
    ],
    airports: [
      "King Khalid International Airport (RUH)",
      "King Abdulaziz International Airport (JED)",
      "King Fahd International Airport (DMM)",
      "Prince Mohammad Bin Abdulaziz Airport (MED)",
    ],
    intro:
      "Saudi Arabia's Vision 2030 transformation has reshaped business travel across the Kingdom — from Riyadh's King Abdullah Financial District to the mega-projects taking shape in NEOM and AlUla. AB.Limo operates across the Kingdom with protocol-trained chauffeurs, a late-model black fleet, and a 24/7 control room coordinating every journey.",
    tags: ["saudi arabia", "riyadh", "jeddah", "dammam", "king khalid airport", "RUH"],
  },
  {
    slug: "uae",
    name: "the UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&h=600&fit=crop",
    cities: [
      { name: "Dubai", blurb: "DIFC, Business Bay, Downtown, and Palm Jumeirah" },
      { name: "Abu Dhabi", blurb: "the capital's government and cultural district" },
      { name: "Sharjah", blurb: "the cultural capital of the northern Emirates" },
      { name: "Ras Al Khaimah", blurb: "an emerging luxury and adventure destination" },
    ],
    airports: [
      "Dubai International Airport (DXB)",
      "Al Maktoum International Airport (DWC)",
      "Zayed International Airport (AUH)",
      "Sharjah International Airport (SHJ)",
      "Ras Al Khaimah International Airport (RKT)",
    ],
    intro:
      "The UAE is the Gulf's busiest aviation and business gateway, with DXB and AUH handling tens of millions of passengers every year. AB.Limo's UAE operation is built for that scale — flight-tracked airport pickups, as-directed executive hire, and multi-vehicle coordination for conferences and delegations across all seven emirates.",
    tags: ["uae", "dubai", "abu dhabi", "DXB", "AUH", "sharjah"],
  },
  {
    slug: "qatar",
    name: "Qatar",
    image: "https://images.unsplash.com/photo-1700901742651-6b353164caf3?w=1200&h=600&fit=crop",
    cities: [
      { name: "Doha", blurb: "West Bay, Msheireb, and the Diplomatic Quarter" },
      { name: "Lusail", blurb: "the futuristic city north of the capital" },
      { name: "Al Khor & Al Wakrah", blurb: "coastal districts with growing industry" },
    ],
    airports: ["Hamad International Airport (DOH)"],
    intro:
      "Qatar's position as a global LNG hub and its post-World Cup infrastructure have made Doha one of the region's busiest business destinations. AB.Limo provides end-to-end ground transport across Qatar — from Hamad International Airport pickups to managed corporate fleets serving West Bay, Lusail, and the Pearl.",
    tags: ["qatar", "doha", "lusail", "hamad airport", "DOH"],
  },
  {
    slug: "bahrain",
    name: "Bahrain",
    image: "https://images.unsplash.com/photo-1548755212-2b46ee259868?w=1200&h=600&fit=crop",
    cities: [
      { name: "Manama", blurb: "Bahrain Financial Harbour, Juffair, and Adliya" },
      { name: "Riffa", blurb: "the royal city and Bahrain International Circuit" },
      { name: "Muharraq", blurb: "the UNESCO-listed pearling trail city" },
    ],
    airports: ["Bahrain International Airport (BAH)"],
    intro:
      "Bahrain is the Gulf's financial services centre, and its compact geography means every major destination is within 30 minutes of the airport. AB.Limo serves corporate clients, government delegations, and Formula 1 arrivals with a professional chauffeur fleet based in Manama.",
    tags: ["bahrain", "manama", "bahrain airport", "BAH", "riffa"],
  },
  {
    slug: "kuwait",
    name: "Kuwait",
    image: "https://images.unsplash.com/photo-1562979314-bee7453e911c?w=1200&h=600&fit=crop",
    cities: [
      { name: "Kuwait City", blurb: "the commercial heart around the Towers and Avenues" },
      { name: "Hawalli & Salmiya", blurb: "busy retail and residential districts" },
      { name: "Farwaniya & Al Ahmadi", blurb: "government and oil-sector centres" },
    ],
    airports: ["Kuwait International Airport (KWI)"],
    intro:
      "Kuwait's oil economy and government institutions generate steady demand for reliable executive transport. AB.Limo operates a dedicated Kuwait fleet covering Kuwait City, the Farwaniya government district, and the Al Ahmadi oil communities, with Kuwait International Airport as the primary entry point.",
    tags: ["kuwait", "kuwait city", "kuwait airport", "KWI", "hawalli"],
  },
  {
    slug: "oman",
    name: "Oman",
    image: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=1200&h=600&fit=crop",
    cities: [
      { name: "Muscat", blurb: "the capital from Mutrah Souq to Al Mouj" },
      { name: "Salalah", blurb: "the khareef season destination in the south" },
      { name: "Sohar & Nizwa", blurb: "industrial north and historic interior" },
    ],
    airports: ["Muscat International Airport (MCT)", "Salalah Airport (SLL)"],
    intro:
      "Oman pairs a growing business sector with some of the Gulf's most rewarding tourism routes — from Muscat's corniche to Jebel Shams and the Wahiba Sands. AB.Limo's Omani operation covers corporate travel, airport transfers, and multi-day tourism itineraries with mountain-experienced chauffeurs.",
    tags: ["oman", "muscat", "muscat airport", "MCT", "salalah"],
  },
];

const SERVICES: ServiceMeta[] = [
  {
    slug: "airport-transfers",
    categoryLabel: "Airport Transfers",
    title: (c) => `Airport Transfers in ${c.name}: Meet, Greet & On-Time Arrivals`,
    excerpt: (c) =>
      `AB.Limo's airport transfer service in ${c.name} covers ${c.airports.length} major airports with real-time flight tracking, meet & greet, and complimentary waiting time. Book a fixed-route executive transfer in minutes.`,
    sections: (c) => `
      <h2>Airport Transfers Built Around Your Flight</h2>
      <p>${c.intro}</p>

      <h2>How the AB.Limo Airport Transfer Works</h2>
      <p><strong>1. Flight Monitoring:</strong> Our system tracks your flight in real time. If you land early or your departure is delayed, your chauffeur adjusts automatically — you never wait, and you are never charged for reasonable delay-related waiting.</p>
      <p><strong>2. Meet & Greet:</strong> A professional representative greets you at the arrivals gate with a personalised name sign, assists with luggage, and escorts you to your vehicle.</p>
      <p><strong>3. Executive Vehicle:</strong> Choose from executive sedans, luxury SUVs, or spacious vans. Every vehicle is inspected, detailed, and positioned before your arrival.</p>

      <h2>Airports We Cover in ${c.name}</h2>
      <ul>
        ${c.airports.map((a) => `<li><strong>${a}:</strong> Full terminal coverage with kerbside or VIP pickup arrangements.</li>`).join("\n        ")}
      </ul>

      <h2>Where Our Clients Go</h2>
      <ul>
        ${c.cities.map((city) => `<li><strong>${city.name}:</strong> ${city.blurb}.</li>`).join("\n        ")}
      </ul>

      <h2>Corporate Airport Accounts</h2>
      <p>Companies managing frequent executive travel can open a corporate airport account with consolidated invoicing, priority booking, and dedicated account management. Waiting time, tolls, and parking are itemised on a single monthly invoice.</p>

      <h2>Booking Your Transfer</h2>
      <p>Transfers can be booked through our concierge line, corporate portal, or WhatsApp. Advance reservation is recommended during peak seasons and major events; same-day pickups are subject to fleet availability.</p>
    `,
    takeaways: () => `
      <ul>
        <li>Real-time flight tracking with automatic chauffeur adjustment.</li>
        <li>Meet & greet at arrivals with name sign and luggage assistance.</li>
        <li>Complimentary waiting time — no surprise delay charges.</li>
        <li>Corporate accounts with consolidated monthly billing.</li>
      </ul>
    `,
    finalThoughts: (c) => `
      <p>An airport transfer sets the tone for the entire trip. In ${c.name}, AB.Limo ensures that first impression — and the last one — is punctual, professional, and comfortable. Book your next arrival or departure with our team.</p>
    `,
    seoTitle: (c) => `Airport Transfers in ${c.name} | Meet & Greet | AB.Limo`,
    seoDescription: (c) =>
      `Airport transfers across ${c.name}. Flight tracking, meet & greet, complimentary waiting time, and executive vehicles at ${c.airports.length} airports.`,
    faqs: (c) => [
      {
        q: `Which airports in ${c.name} does AB.Limo serve?`,
        a: `We cover ${c.airports.join(", ")}, with terminal-level pickup coordination for domestic and international flights.`,
      },
      {
        q: "What happens if my flight is delayed?",
        a: "We monitor your flight in real time and adjust your pickup automatically. Complimentary waiting time applies to arrivals, so a delay never creates an extra charge.",
      },
      {
        q: "Can I book an airport transfer for a group?",
        a: "Yes. We provide executive sedans for individuals, luxury SUVs for families, and vans for groups. Larger delegations can be split across multiple vehicles with a single booking reference.",
      },
      {
        q: "How far in advance should I book?",
        a: "We recommend booking at least 12 hours ahead. Same-day transfers are available subject to fleet availability, and corporate accounts receive priority allocation.",
      },
    ],
    readTime: 6,
    tags: (c) => ["airport transfer", ...c.tags],
  },
  {
    slug: "chauffeur-vip",
    categoryLabel: "Chauffeur & VIP",
    title: (c) => `VIP Chauffeur Service in ${c.name}: Executive Ground Transport`,
    excerpt: (c) =>
      `AB.Limo's chauffeur service in ${c.name} delivers protocol-trained drivers, a uniform black fleet, and 24/7 availability for corporate travel, government visits, and private itineraries.`,
    sections: (c) => `
      <h2>Executive Chauffeur Service Across ${c.name}</h2>
      <p>${c.intro}</p>

      <h2>Why a Professional Chauffeur</h2>
      <p>Navigating ${c.name}'s roads, peak-hour congestion, and security checkpoints takes more than a driver — it takes a trained professional who understands protocol, punctuality, and discretion. AB.Limo chauffeurs undergo background screening, defensive driving certification, and corporate etiquette training.</p>
      <ul>
        <li><strong>Vetted Professionals:</strong> Multi-stage background checks and continuous performance review.</li>
        <li><strong>Real-Time Routing:</strong> GPS-monitored fleets with live traffic intelligence for on-time arrivals.</li>
        <li><strong>Protocol Training:</strong> VIP handling, confidentiality, and diplomatic courtesy as standard.</li>
      </ul>

      <h2>Typical Use Cases</h2>
      <p><strong>Business Travel:</strong> As-directed hourly hire for days packed with meetings — your chauffeur waits on standby between appointments.</p>
      <p><strong>Airport & Hotel Transfers:</strong> Seamless door-to-door movement between airports, hotels, and offices.</p>
      <p><strong>Government & Diplomatic:</strong> Protocol-trained drivers for ministry visits, delegations, and state events.</p>
      <p><strong>Special Occasions:</strong> Weddings, galas, and private events with a dedicated vehicle and chauffeur.</p>

      <h2>Cities We Serve</h2>
      <ul>
        ${c.cities.map((city) => `<li><strong>${city.name}:</strong> ${city.blurb}.</li>`).join("\n        ")}
      </ul>

      <h2>The Fleet</h2>
      <p>Our fleet is deliberately uniform: Mercedes S-Class and BMW 7 Series for executive sedans, Range Rover and Cadillac Escalade for luxury SUVs, and Mercedes V-Class for group travel. Every vehicle is late-model, black, and detailed before each journey — with bottled water, charging ports, and Wi-Fi on selected models.</p>

      <h2>Availability & Booking</h2>
      <p>AB.Limo operates 24/7 across ${c.name}. Book through our concierge line, corporate portal, or WhatsApp. Advance reservation is recommended for multi-day itineraries and event periods.</p>
    `,
    takeaways: () => `
      <ul>
        <li>Protocol-trained, background-checked chauffeurs as standard.</li>
        <li>As-directed hourly hire for full-day executive itineraries.</li>
        <li>Uniform late-model black fleet — S-Class, Range Rover, V-Class.</li>
        <li>24/7 availability with corporate priority allocation.</li>
      </ul>
    `,
    finalThoughts: (c) => `
      <p>In ${c.name}, ground transport should be an asset, not an admin burden. AB.Limo's chauffeur service gives you a vetted professional, a pristine vehicle, and a control room that keeps every journey on schedule. Contact our concierge team to arrange your next assignment.</p>
    `,
    seoTitle: (c) => `VIP Chauffeur Service in ${c.name} | AB.Limo`,
    seoDescription: (c) =>
      `Executive chauffeur service across ${c.name}. Protocol-trained drivers, uniform black fleet, 24/7 availability for corporate and private travel.`,
    faqs: (c) => [
      {
        q: `How do I book a chauffeur in ${c.name}?`,
        a: "Book via our concierge line, corporate portal, or WhatsApp. Confirmations include your chauffeur's details, vehicle plate, and pickup time.",
      },
      {
        q: "Is hourly as-directed hire available?",
        a: "Yes. As-directed booking keeps a chauffeur and vehicle on standby for a minimum of three hours, ideal for days with multiple appointments.",
      },
      {
        q: "Are your chauffeurs vetted and insured?",
        a: "Every AB.Limo chauffeur passes multi-stage background screening, holds a professional licence, and drives a fully insured, GPS-monitored vehicle.",
      },
      {
        q: "Can you handle VIP and diplomatic protocol?",
        a: "Yes. Our chauffeurs receive protocol training covering confidentiality, escort procedures, and diplomatic courtesy, and we coordinate directly with security details when required.",
      },
    ],
    readTime: 7,
    tags: (c) => ["chauffeur", "vip", ...c.tags],
  },
  {
    slug: "corporate-transportation",
    categoryLabel: "Corporate Transportation",
    title: (c) => `Corporate Transportation in ${c.name}: Managed Business Travel`,
    excerpt: (c) =>
      `AB.Limo's corporate transportation service in ${c.name} provides enterprise-grade ground transport — dedicated account management, consolidated billing, and priority dispatch for employee transfers, client visits, and executive roadshows.`,
    sections: (c) => `
      <h2>Corporate Ground Transport Across ${c.name}</h2>
      <p>${c.intro}</p>

      <h2>What a Corporate Account Includes</h2>
      <ul>
        <li><strong>Dedicated Account Manager:</strong> A single point of contact who learns your travel patterns, preferred vehicles, and billing requirements.</li>
        <li><strong>Priority Dispatch:</strong> Corporate bookings jump the queue during peak periods and major events — guaranteed vehicle allocation for confirmed reservations.</li>
        <li><strong>Consolidated Billing:</strong> One monthly invoice covering all ground transport, with cost centres, trip purposes, and VAT-compliant receipts itemised.</li>
        <li><strong>Travel Policy Alignment:</strong> Vehicle class rules, approval workflows, and spend caps configured to match your organisation's travel policy.</li>
      </ul>

      <h2>Services Under One Account</h2>
      <p><strong>Executive Transfers:</strong> Point-to-point chauffeur service for board members, visiting clients, and senior management.</p>
      <p><strong>Airport Programs:</strong> Recurring arrival and departure transfers with flight tracking and named chauffeurs for frequent travellers.</p>
      <p><strong>Employee Shuttles:</strong> Scheduled routes between offices, industrial sites, and residential districts — sedans, SUVs, or coaches matched to headcount.</p>
      <p><strong>Event & Roadshow Transport:</strong> Multi-vehicle coordination for conferences, incentive trips, and investor roadshows across ${c.name}.</p>

      <h2>Cities We Serve</h2>
      <ul>
        ${c.cities.map((city) => `<li><strong>${city.name}:</strong> ${city.blurb}.</li>`).join("\n        ")}
      </ul>

      <h2>Reporting & Visibility</h2>
      <p>Corporate clients receive monthly travel reports covering trip volumes, cost centres, vehicle utilisation, and chauffeur performance — supporting audit requirements and travel-budget planning.</p>

      <h2>Getting Started</h2>
      <p>Account setup takes a single meeting: we align on travel policy, billing structure, and booking channels, then activate your account within 48 hours. Trials for small teams can be arranged before full rollout.</p>
    `,
    takeaways: () => `
      <ul>
        <li>Dedicated account manager and priority dispatch during peak demand.</li>
        <li>Consolidated monthly billing with cost-centre and VAT itemisation.</li>
        <li>Executive transfers, airport programs, shuttles, and event transport under one account.</li>
        <li>Monthly travel reports for audit and budget management.</li>
      </ul>
    `,
    finalThoughts: (c) => `
      <p>Corporate ground transport in ${c.name} works best when it is managed, not improvised. AB.Limo's corporate accounts give your travel team visibility, control, and a single invoice — while your executives get consistent, professional service on every journey. Contact us to set up an account.</p>
    `,
    seoTitle: (c) => `Corporate Transportation in ${c.name} | Business Travel | AB.Limo`,
    seoDescription: (c) =>
      `Managed corporate ground transport across ${c.name}. Dedicated accounts, priority dispatch, consolidated billing, and executive transfers for business travel.`,
    faqs: (c) => [
      {
        q: `How do I set up a corporate account in ${c.name}?`,
        a: "Contact our corporate team to schedule an onboarding meeting. We align on travel policy, billing, and booking channels, then activate your account within 48 hours.",
      },
      {
        q: "Can the account cover multiple cities?",
        a: "Yes. A single account covers all cities and countries where AB.Limo operates, with consolidated reporting across every market.",
      },
      {
        q: "What billing options are available?",
        a: "Monthly consolidated invoicing with cost-centre allocation, trip purposes, and VAT-compliant receipts. Per-trip card payment is also supported for ad-hoc bookings.",
      },
      {
        q: "Do you offer volume discounts?",
        a: "Yes. Pricing tiers are based on monthly trip volume and fleet mix. Your account manager will propose a structure matched to your travel patterns.",
      },
    ],
    readTime: 7,
    tags: (c) => ["corporate", "business travel", "fleet management", ...c.tags],
  },
  {
    slug: "event-transportation",
    categoryLabel: "Event Transportation",
    title: (c) => `Event Transportation in ${c.name}: Delegations, Conferences & Galas`,
    excerpt: (c) =>
      `AB.Limo's event transportation service in ${c.name} coordinates multi-vehicle fleets for conferences, exhibitions, weddings, and state occasions — with a dedicated dispatch desk, marshalled pickups, and on-site coordinators.`,
    sections: (c) => `
      <h2>Event Logistics, Solved</h2>
      <p>${c.intro}</p>

      <h2>Events We Handle</h2>
      <ul>
        <li><strong>Conferences & Exhibitions:</strong> Delegate arrivals, hotel–venue shuttles, and speaker/VIP movements with marshalled staging.</li>
        <li><strong>Corporate Incentives:</strong> Programmed multi-day transport for award trips, offsites, and client entertainment.</li>
        <li><strong>Weddings & Private Celebrations:</strong> Guest shuttles, bridal party vehicles, and elder-accessible transport.</li>
        <li><strong>Government & Diplomatic Occasions:</strong> Protocol-level coordination for state visits, summits, and official delegations.</li>
      </ul>

      <h2>How We Coordinate</h2>
      <p><strong>1. Pre-Event Planning:</strong> We build a movement plan from your guest list and run sheet — vehicle mix, staging positions, timing windows, and contingency vehicles.</p>
      <p><strong>2. On-Site Coordinator:</strong> A uniformed AB.Limo coordinator manages the pickup zone, passenger manifest, and vehicle turnaround at each venue.</p>
      <p><strong>3. Live Dispatch Desk:</strong> During the event, a dedicated dispatcher tracks every vehicle in real time and adjusts routing for delays, weather, or schedule changes.</p>
      <p><strong>4. Post-Event Report:</strong> Trip logs, passenger counts, and vehicle utilisation delivered within 48 hours of wrap.</p>

      <h2>Fleet for Events</h2>
      <p>Executive sedans for VIPs and speakers, luxury SUVs for principals, vans for small groups, and coaches (30–50 seats) for delegate shuttles — all late-model, black, and detailed before deployment.</p>

      <h2>Venues & Cities</h2>
      <ul>
        ${c.cities.map((city) => `<li><strong>${city.name}:</strong> ${city.blurb}.</li>`).join("\n        ")}
      </ul>

      <h2>Booking Your Event</h2>
      <p>Share your event dates, expected headcount, and venue locations — we return a movement plan and fixed quote within two business days. Peak-season events (exhibitions, national days, Formula 1 weekends) should be booked as early as possible.</p>
    `,
    takeaways: () => `
      <ul>
        <li>Pre-event movement plans built from your guest list and run sheet.</li>
        <li>On-site coordinators and live dispatch desk during the event.</li>
        <li>Sedans, SUVs, vans, and 30–50 seat coaches from one fleet.</li>
        <li>Post-event trip logs and utilisation reports within 48 hours.</li>
      </ul>
    `,
    finalThoughts: (c) => `
      <p>Events in ${c.name} live and die by logistics. AB.Limo's event transport team plans the movements before the first guest arrives, coordinates them on the ground, and reports on them after wrap — so your attention stays on the event itself.</p>
    `,
    seoTitle: (c) => `Event Transportation in ${c.name} | Conferences & Delegations | AB.Limo`,
    seoDescription: (c) =>
      `Multi-vehicle event transport across ${c.name}. Delegation shuttles, VIP fleets, on-site coordinators, and live dispatch for conferences, weddings, and state events.`,
    faqs: (c) => [
      {
        q: `How far in advance should I book event transport in ${c.name}?`,
        a: "We recommend 4–6 weeks for conferences and large delegations, and 2 weeks for private events. During peak exhibition and Formula 1 periods, book as early as possible.",
      },
      {
        q: "Can you handle last-minute schedule changes?",
        a: "Yes. Our live dispatch desk adjusts routing and vehicle allocation in real time, and we hold contingency vehicles for every major event.",
      },
      {
        q: "Do you provide on-site staff?",
        a: "Yes. A uniformed coordinator manages the pickup zone and passenger manifest at each venue, supported by a dedicated dispatcher throughout the event.",
      },
      {
        q: "What vehicle classes are available for events?",
        a: "Executive sedans, luxury SUVs, vans for small groups, and 30–50 seat coaches for delegate shuttles — all late-model and detailed before deployment.",
      },
    ],
    readTime: 6,
    tags: (c) => ["event transport", "conference", "delegation", ...c.tags],
  },
  {
    slug: "bus-coach-hire",
    categoryLabel: "Bus & Coach Hire",
    title: (c) => `Bus & Coach Hire in ${c.name}: Group Travel Made Simple`,
    excerpt: (c) =>
      `AB.Limo's bus and coach hire in ${c.name} moves groups of 15–50 passengers in air-conditioned coaches — staff shuttles, event charters, hotel transfers, and intercity group travel with professional drivers.`,
    sections: (c) => `
      <h2>Group Transport Across ${c.name}</h2>
      <p>${c.intro}</p>

      <h2>When Groups Need a Coach</h2>
      <ul>
        <li><strong>Staff & Workforce Shuttles:</strong> Daily routes between residential areas, offices, and industrial or Free Zone sites.</li>
        <li><strong>Event & Conference Charters:</strong> Delegate shuttles between airports, hotels, and venues with marshalled departures.</li>
        <li><strong>Hotel & Resort Transfers:</strong> Guest movement between airports, hotels, and attractions for the hospitality sector.</li>
        <li><strong>Intercity Group Travel:</strong> Direct coach connections between major cities — comfortable, cost-effective, and door-to-door.</li>
      </ul>

      <h2>Fleet Options</h2>
      <p><strong>Mid-Size Coaches (20–30 seats):</strong> Ideal for management groups, site visits, and small delegations.</p>
      <p><strong>Full-Size Coaches (40–50 seats):</strong> For workforce shuttles, conference charters, and large event transfers.</p>
      <p><strong>Mini-Buses (15–19 seats):</strong> For VIP groups, wedding parties, and tours needing flexibility in tight urban areas.</p>
      <p>Every coach is air-conditioned, luggage-equipped, and maintained to the same inspection standard as our executive fleet.</p>

      <h2>Cities & Routes</h2>
      <ul>
        ${c.cities.map((city) => `<li><strong>${city.name}:</strong> ${city.blurb}.</li>`).join("\n        ")}
      </ul>

      <h2>Booking & Contracts</h2>
      <p>One-off charters can be booked with 24 hours' notice. Recurring shuttle contracts include fixed schedules, dedicated vehicles, driver continuity, and monthly performance reporting. Standing-route clients receive priority allocation during peak periods.</p>
    `,
    takeaways: () => `
      <ul>
        <li>Coaches from 15 to 50 seats — mini-buses, mid-size, and full-size.</li>
        <li>Staff shuttles, event charters, hotel transfers, and intercity routes.</li>
        <li>24-hour notice for one-off charters; fixed-schedule shuttle contracts available.</li>
        <li>Priority allocation for standing-route clients during peak demand.</li>
      </ul>
    `,
    finalThoughts: (c) => `
      <p>Moving a group across ${c.name} should not mean coordinating ten cars and a WhatsApp thread. AB.Limo's coach hire gives your group one vehicle, one driver, and one arrival time. Tell us your headcount and route — we will match the right coach.</p>
    `,
    seoTitle: (c) => `Bus & Coach Hire in ${c.name} | Group Transport | AB.Limo`,
    seoDescription: (c) =>
      `Bus and coach hire across ${c.name}. 15–50 seat air-conditioned coaches for staff shuttles, event charters, hotel transfers, and intercity group travel.`,
    faqs: (c) => [
      {
        q: `How many passengers can your coaches carry in ${c.name}?`,
        a: "Our fleet ranges from 15-seat mini-buses to 50-seat full-size coaches. Vehicle assignment is matched to your headcount and route.",
      },
      {
        q: "Can I hire a coach for a single trip?",
        a: "Yes. One-off charters are available with 24 hours' notice, subject to fleet availability. Recurring shuttle contracts offer better rates and priority allocation.",
      },
      {
        q: "Are the coaches air-conditioned and luggage-equipped?",
        a: "Yes. Every coach is fully air-conditioned with overhead and underfloor luggage space, and is inspected before every deployment.",
      },
      {
        q: "Do you offer intercity coach routes?",
        a: "Yes. Direct coach connections between major cities are available for groups — door-to-door, with no terminal transfers.",
      },
    ],
    readTime: 5,
    tags: (c) => ["bus hire", "coach charter", "group transport", ...c.tags],
  },
  {
    slug: "tourism-transportation",
    categoryLabel: "Tourism Transportation",
    title: (c) => `Tourism Transportation in ${c.name}: Guided Transfers & Tours`,
    excerpt: (c) =>
      `AB.Limo's tourism transportation in ${c.name} provides guided transfers, sightseeing tours, and multi-day itineraries — with English-speaking chauffeurs, flexible routing, and vehicles matched to luggage and group size.`,
    sections: (c) => `
      <h2>Explore ${c.name} in Comfort</h2>
      <p>${c.intro}</p>

      <h2>What We Offer</h2>
      <ul>
        <li><strong>Guided City Tours:</strong> Half- and full-day sightseeing with English-speaking chauffeurs who know the landmarks, timings, and best routes.</li>
        <li><strong>Airport-to-Hotel Transfers:</strong> Smooth arrivals with luggage assistance and direct hotel drop-off — no taxi queues.</li>
        <li><strong>Multi-Day Itineraries:</strong> Private vehicles for multi-day travel — intercity drives, day trips, and hotel-to-hotel logistics handled end to end.</li>
        <li><strong>Cruise & Group Coordination:</strong> Port pickups, ship-side drop-offs, and group shuttles for cruise passengers and tour operators.</li>
      </ul>

      <h2>Popular Destinations</h2>
      <ul>
        ${c.cities.map((city) => `<li><strong>${city.name}:</strong> ${city.blurb}.</li>`).join("\n        ")}
      </ul>

      <h2>The Experience</h2>
      <p>Our tourism chauffeurs are selected for more than driving: they are trained in guest hospitality, basic local guiding, and flexible itinerary management. Vehicles carry chilled water, charging ports, and space for shopping and photography stops — the journey is part of the holiday.</p>

      <h2>Planning Your Trip</h2>
      <p>Share your arrival dates, hotel, and a list of sights — our team returns a suggested itinerary with timings, drive durations, and a fixed quote. Custom itineraries, dietary-aware restaurant stops, and child-seat requests are all accommodated.</p>

      <h2>For Tour Operators</h2>
      <p>Travel agencies and DMCs can partner with AB.Limo on contracted ground-handling rates, white-labelled vehicles, and multi-lingual driver allocation for inbound groups.</p>
    `,
    takeaways: () => `
      <ul>
        <li>English-speaking chauffeurs trained in guest hospitality and local guiding.</li>
        <li>City tours, airport transfers, and multi-day private itineraries.</li>
        <li>Vehicles matched to group size, luggage, and comfort preferences.</li>
        <li>Contracted rates available for tour operators and DMCs.</li>
      </ul>
    `,
    finalThoughts: (c) => `
      <p>${c.name} rewards travellers who see more than the hotel lobby. AB.Limo's tourism transport gets you there comfortably, returns you on time, and handles the logistics in between — so every day of your trip starts and ends smoothly.</p>
    `,
    seoTitle: (c) => `Tourism Transportation in ${c.name} | Guided Tours & Transfers | AB.Limo`,
    seoDescription: (c) =>
      `Tourism ground transport across ${c.name}. Guided city tours, airport-to-hotel transfers, multi-day itineraries, and cruise coordination with English-speaking chauffeurs.`,
    faqs: (c) => [
      {
        q: `Do your chauffeurs speak English in ${c.name}?`,
        a: "Yes. Our tourism chauffeurs are fluent in English and trained in local guiding. Multi-lingual drivers can be requested at booking.",
      },
      {
        q: "Can you build a multi-day itinerary for me?",
        a: "Yes. Share your sights and dates — our team returns a suggested itinerary with timings, drive durations, and a fixed quote within one business day.",
      },
      {
        q: "Are child seats available?",
        a: "Yes. Child and booster seats can be requested in advance at no extra charge on most vehicle classes.",
      },
      {
        q: "Do you work with tour operators?",
        a: "Yes. We offer contracted ground-handling rates, white-labelled vehicles, and multi-lingual driver allocation for inbound tour operators and DMCs.",
      },
    ],
    readTime: 6,
    tags: (c) => ["tourism", "sightseeing", "guided tour", ...c.tags],
  },
];

const DATE = "2026-10-12";

function buildArticles() {
  const docs: Record<string, unknown>[] = [];
  for (const country of COUNTRIES) {
    for (const service of SERVICES) {
      docs.push({
        slug: `services/${service.slug}/${country.slug}`,
        title: service.title(country),
        excerpt: service.excerpt(country),
        category: service.slug,
        categoryLabel: service.categoryLabel,
        status: "published",
        templateType: "service-country",
        serviceSlug: service.slug,
        countrySlug: country.slug,
        citySlug: "",
        country: country.name === "the UAE" ? "UAE" : country.name,
        author: "unknown",
        authorName: "AB.Limo Editorial",
        date: DATE,
        readTime: service.readTime,
        featured: false,
        views: 0,
        contentMode: "wysiwyg",
        bodyContent: service.sections(country),
        keyTakeawaysContent: service.takeaways(country),
        finalThoughtsContent: service.finalThoughts(country),
        faqs: service.faqs(country),
        tags: service.tags(country),
        articleMedia: { heroCoverMedia: { url: country.image } },
        seo_metadata: {
          metaTitle: service.seoTitle(country),
          metaDescription: service.seoDescription(country),
          ogImage: "",
        },
        locale: "en",
      });
    }
  }
  return docs;
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const docs = buildArticles();

  console.log("Connecting to database...");
  await connectDB();

  const existing = await Article.find({
    slug: { $in: docs.map((d) => d.slug as string) },
  }).lean();
  const existingSlugs = new Set(existing.map((a) => a.slug));
  const toInsert = docs.filter((d) => !existingSlugs.has(d.slug as string));
  const skipped = docs.length - toInsert.length;

  console.log(
    `${docs.length} country service pages. ${skipped} already exist. ${toInsert.length} to insert.${dryRun ? " (DRY RUN)" : ""}`
  );

  if (toInsert.length === 0) {
    console.log("Nothing to insert.");
    process.exit(0);
  }

  if (dryRun) {
    toInsert.forEach((d) => console.log(`  [DRY] ${d.slug}`));
  } else {
    const result = await Article.insertMany(toInsert);
    console.log(`Inserted ${result.length} articles:`);
    result.forEach((a) => console.log(`  [OK] ${a.slug}`));
  }

  console.log("\nDone.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
