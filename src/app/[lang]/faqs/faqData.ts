export type FaqCategory = "all" | "corporate" | "logistics" | "security" | "fleet";

export interface FaqItem {
  cat: "corporate" | "logistics" | "security" | "fleet";
  q: string;
  a: string;
}

export const CATEGORY_META: Record<string, { label: string; color: string }> = {
  all: { label: "All Queries", color: "#555" },
  corporate: { label: "Corporate Accounts & Tech", color: "#26ade3" },
  logistics: { label: "Event & Group Logistics", color: "#f58731" },
  security: { label: "Duty of Care & Security", color: "#a8cf46" },
  fleet: { label: "Fleet & Operations", color: "#ffcd2b" },
};

export const CATEGORIES: FaqCategory[] = ["corporate", "logistics", "security", "fleet"];

export const faqData: FaqItem[] = [
  // ── Pricing ───────────────────────────────────────────────
  {
    cat: "corporate",
    q: "How much does a chauffeur cost in Riyadh?",
    a: "AB chauffeur services in Riyadh start from SAR 150 per hour for Executive Sedans, with pricing varying by vehicle class, route complexity, and service duration. All rates include a professionally trained chauffeur, fuel, and comprehensive insurance. Contact our enterprise team for customized fleet pricing and volume discounts.",
  },
  {
    cat: "corporate",
    q: "How much does an airport transfer cost in Saudi Arabia?",
    a: "Airport transfer pricing across Saudi Arabia depends on the distance, vehicle class, and service tier. Executive Sedan transfers from King Khalid International Airport (RUH) to central Riyadh typically start from SAR 200. All AB transfers include meet-and-greet service, luggage assistance, and real-time flight monitoring.",
  },
  {
    cat: "corporate",
    q: "What is the cost difference between hourly chauffeur service and a point-to-point transfer?",
    a: "Hourly chauffeur service (As-Directed) is charged at a fixed hourly rate with a minimum booking duration, ideal for multiple stops and fluid schedules. Point-to-point transfers are fixed-rate routes between two locations. Hourly service offers greater flexibility, while point-to-point is more cost-effective for direct, single-route journeys.",
  },

  // ── Service Scope / Definition ────────────────────────────
  {
    cat: "corporate",
    q: "What is included in a corporate chauffeur service package?",
    a: "A corporate chauffeur service package includes a professionally trained and licensed chauffeur, a late-model black vehicle of your chosen class, complimentary Wi-Fi, bottled water, universal charging cables, and comprehensive insurance coverage. Enterprise accounts also receive 24/7 dispatch support, centralized invoicing, and dedicated account management.",
  },
  {
    cat: "corporate",
    q: "What is the difference between a chauffeur and a regular driver?",
    a: "A chauffeur is a professionally trained, licensed, and vetted executive driver who provides a premium door-to-door transportation experience. Unlike regular drivers, AB chauffeurs undergo defensive driving certification, sign NDAs, and are trained in executive etiquette, route optimization, and high-security zone navigation across the GCC.",
  },
  {
    cat: "corporate",
    q: "What is ground transportation management?",
    a: "Ground transportation management is the centralized coordination of all land-based vehicle movements for corporate clients, events, or hospitality programs. AB's management service includes fleet scheduling, real-time GPS tracking via our Intelligent Transport System (ITS), driver assignment, and consolidated billing across multiple GCC cities.",
  },
  {
    cat: "corporate",
    q: "What is meet and greet service at the airport?",
    a: "AB's meet-and-greet service positions a professional chauffeur at the arrivals terminal or directly on the tarmac for private aviation arrivals. The chauffeur handles luggage, provides a seamless transfer to the vehicle, and ensures a smooth journey to the destination. This service is available at RUH, JED, DXB, DOH, and all major GCC airports.",
  },
  {
    cat: "corporate",
    q: "How is corporate staff transportation different from a taxi or ride-hailing service?",
    a: "Corporate chauffeur services offer vetted, NDA-signed professionals driving late-model black vehicles with full insurance, whereas ride-hailing uses variable vehicle quality and unvetted contractors. AB provides centralized billing, SLA guarantees, real-time tracking, and dedicated account management — none of which are available with standard taxi or ride-hailing platforms.",
  },
  {
    cat: "corporate",
    q: "What questions should I ask before booking corporate or event transportation?",
    a: "Key questions include: What is the chauffeur vetting and licensing process? Is real-time GPS tracking available? What is the backup vehicle policy? Are invoices ZATCA-compliant? Can you handle multi-city GCC logistics? AB provides transparent answers to all procurement and duty-of-care requirements during your enterprise onboarding.",
  },
  {
    cat: "corporate",
    q: "How does airport transfer service work for VIP guests and delegations?",
    a: "For VIP arrivals, AB coordinates directly with FBOs and private aviation terminals. Our chauffeurs are positioned for tarmac access or VIP terminal meet-and-greet. Luggage is handled, the vehicle is pre-staged, and real-time flight monitoring ensures the chauffeur adjusts to any schedule changes automatically.",
  },
  {
    cat: "corporate",
    q: "Can one company manage transportation across Saudi Arabia, UAE, Qatar, Bahrain, Kuwait and Oman?",
    a: "Yes. AB operates a unified fleet and dispatch network across all six GCC nations. A single enterprise account provides centralized booking, consolidated invoicing, and consistent service standards from Riyadh to Dubai, Doha, Manama, Kuwait City, and Muscat — eliminating the complexity of managing multiple local vendors.",
  },
  {
    cat: "corporate",
    q: "How do I get a quote for corporate transportation in Riyadh?",
    a: "To receive a customized corporate quote for Riyadh, submit a request through our Corporate Accounts page or contact our enterprise sales team directly. Quotes are based on fleet volume, service frequency, vehicle class requirements, and SLA terms. Our team responds within 24 hours with a tailored proposal.",
  },
  {
    cat: "corporate",
    q: "Is chauffeur transportation available across multiple GCC cities such as Riyadh, Dubai and Doha?",
    a: "Yes. AB operates a unified fleet and dispatch network across Riyadh, Dubai, Doha, Abu Dhabi, Kuwait City, Manama, and Muscat. A single enterprise account provides centralized booking, consolidated invoicing, and consistent service standards across all GCC nations.",
  },

  // ── Corporate Process ─────────────────────────────────────
  {
    cat: "corporate",
    q: "How do companies arrange employee transportation in Saudi Arabia?",
    a: "Companies in Saudi Arabia typically arrange employee transportation through a corporate mobility provider like AB. We set up dedicated accounts with customized fleet allocations, recurring schedules, cost-center tracking, and centralized billing — ensuring full compliance with Saudi labor transport regulations and TGA requirements.",
  },

  // ── Booking Process ───────────────────────────────────────
  {
    cat: "logistics",
    q: "How far in advance should I book VIP transportation for an event?",
    a: "For large-scale events and mega-conferences, AB recommends finalizing VIP transportation procurement 45 to 60 days in advance. This ensures availability of Executive Sedans, SUVs, and VIP Coaches during peak demand periods such as FII, LEAP, and Riyadh Season. Last-minute bookings are accommodated subject to fleet availability.",
  },
  {
    cat: "logistics",
    q: "How do I hire a coach or bus for a conference or exhibition in Saudi Arabia?",
    a: "To hire a coach or bus for a conference in Saudi Arabia, contact AB's event logistics team with your delegate count, venue details, and schedule. We provide Executive Coaches, mid-size buses, and VIP Sprinters with Wi-Fi, climate control, and branded options. Fleet allocation is confirmed upon contract signing.",
  },
  {
    cat: "logistics",
    q: "How much notice is needed to arrange a large fleet for an event in Saudi Arabia?",
    a: "For fleet deployments exceeding 20 vehicles, AB recommends a minimum of 30 to 45 days notice to guarantee availability and allow for vehicle preparation, chauffeur briefing, and route planning. For government or PIF mega-projects, we recommend 60 to 90 days for comprehensive logistics coordination.",
  },

  // ── Event Logistics ───────────────────────────────────────
  {
    cat: "logistics",
    q: "How does event and conference shuttle transportation work for large groups?",
    a: "AB's event shuttle service deploys a fleet of branded coaches and buses on fixed loops between hotels, venues, and airports. Each route is managed by an on-site transport coordinator with real-time GPS tracking, and schedules are synchronized with conference timelines to minimize delegate wait times.",
  },
  {
    cat: "logistics",
    q: "What is the best way to move 500+ delegates between venues at a conference?",
    a: "Moving 500+ delegates requires a combination of Executive Coaches, mid-size buses, and dynamic scheduling. AB deploys a Transport Control Room with live GPS telemetry, staggered departure waves, and on-site coordinators at each venue loading zone to ensure continuous, efficient delegate flow.",
  },
  {
    cat: "logistics",
    q: "What transportation options are available for international conferences and exhibitions in Riyadh?",
    a: "For international conferences in Riyadh, AB provides Executive Sedans for VIP speakers, SUVs for delegation leads, Executive Coaches for general delegates, and branded Sprinters for exhibition logistics. All vehicles include Wi-Fi, and our Transport Control Room manages real-time routing across Riyadh's venue districts.",
  },
  {
    cat: "logistics",
    q: "What is a dedicated transportation coordinator for an event?",
    a: "A dedicated transportation coordinator is an AB professional deployed on-site to manage vehicle staging, delegate loading, real-time schedule adjustments, and coordination with event security. This role is essential for events utilizing 5 or more vehicles and ensures seamless ground logistics throughout the event lifecycle.",
  },
  {
    cat: "logistics",
    q: "What is the best transportation option for tourism groups visiting AlUla?",
    a: "For tourism groups visiting AlUla, AB recommends a combination of Executive SUVs for small VIP groups and luxury coaches for larger delegations. Our vehicles are equipped for desert terrain, and our chauffeurs are trained on AlUla's heritage site routes, ensuring a comfortable and culturally informed journey.",
  },
  {
    cat: "logistics",
    q: "How do transportation companies support hospitality and tourism programs in Saudi Arabia?",
    a: "AB supports hospitality and tourism programs through dedicated fleet allocations, multilingual chauffeurs, customized city tours, airport transfers, and intercity travel across Saudi Arabia's key tourism destinations including AlUla, NEOM, the Red Sea Global, and AMAALA.",
  },
  {
    cat: "logistics",
    q: "What is the typical fleet size needed for a 1,000-person conference?",
    a: "A 1,000-person conference typically requires 30 to 50 vehicles depending on delegate distribution, venue count, and schedule density. AB's fleet planning team models delegate flow patterns to determine the optimal mix of Executive Coaches, buses, and sedans, ensuring zero bottlenecks during peak transfer windows.",
  },

  // ── Operations ────────────────────────────────────────────
  {
    cat: "logistics",
    q: "Do transportation companies in Saudi Arabia provide 24/7 dispatch support?",
    a: "Yes. AB provides 24/7 dispatch support across all GCC operations. Our centralized command center monitors every vehicle via live GPS telemetry, manages real-time route adjustments, and coordinates emergency responses — ensuring uninterrupted service for corporate clients and event organizers at any hour.",
  },
  {
    cat: "logistics",
    q: "How do transportation providers handle backup vehicles for VIP transportation?",
    a: "AB maintains a 15% redundancy fleet stationed strategically across all major GCC cities. In the event of a mechanical issue or unexpected demand surge, a replacement vehicle of equal or higher class is dispatched immediately through our Transport Control Room, ensuring zero disruption to VIP schedules.",
  },

  // ── Fleet ─────────────────────────────────────────────────
  {
    cat: "fleet",
    q: "What vehicles are used for executive and VIP transportation in the GCC?",
    a: "AB's GCC fleet consists exclusively of late-model black vehicles: Executive Sedans (Mercedes S-Class), Executive SUVs (Cadillac Escalade), Premium MPVs (Mercedes V-Class), Executive Vans (Mercedes Sprinter), and VIP Coaches for group logistics. All vehicles are maintained to the highest comfort and safety standards.",
  },

  // ── Security / Compliance ─────────────────────────────────
  {
    cat: "security",
    q: "What safety and licensing standards should a chauffeur company in the GCC meet?",
    a: "A reputable chauffeur company in the GCC must comply with TGA regulations in Saudi Arabia, RTA licensing in the UAE, and equivalent authority requirements across Qatar, Bahrain, Kuwait, and Oman. AB exceeds these standards with ISO-certified safety protocols, defensive driving certifications, and comprehensive fleet insurance.",
  },
];

export const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};
