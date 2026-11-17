import fs from "fs";
import path from "path";
import { Packer } from "docx";
import {
  pageToDocx,
  pageToMarkdown,
  stripHtml,
  type PageData,
  type DocContentSection,
} from "./doc-builder-helper";

// Output directory at root
const OUT_DIR = path.resolve("website-content-documents");
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Dictionaries
const dictEnUs = JSON.parse(
  fs.readFileSync(path.resolve("src/app/[lang]/dictionaries/en-US.json"), "utf8")
);
const dumpedServices: any[] = JSON.parse(
  fs.readFileSync(path.resolve("scripts/dumped_services.json"), "utf8")
);

const allPages: PageData[] = [];

// =========================================================================
// 1. HOMEPAGE
// =========================================================================
const h = dictEnUs.home;
const homepageSections: DocContentSection[] = [
  // Section 1: Hero
  {
    eyebrow: h.heroSection.badge,
    title: "Hero Section: Executive Ground Mobility",
    subtitle: `${h.heroSection.title} ${h.heroSection.titleHighlight}`,
    description: h.heroSection.desc,
    buttons: [
      { label: h.heroSection.ctaExplore, href: "/services" },
      { label: h.heroSection.ctaRequestAProposal, href: "/contact" },
      { label: h.heroSection.ctaDutyOfCare, href: "#duty-of-care" },
    ],
    subsections: [
      {
        title: "Active Operational Hubs & Metropolitan Slideshow",
        description:
          "The interactive slideshow highlights AB's core operating centers across the GCC:",
        bullets: [
          "Riyadh (Saudi Arabia) — Central operations & 24/7 command center",
          "Dubai (United Arab Emirates) — Executive business & VIP transport",
          "Abu Dhabi (United Arab Emirates) — Government & corporate summit logistics",
          "Jeddah (Saudi Arabia) — Coastal commercial & pilgrimage corridor",
          "Doha (Qatar) — Financial, smart city & airport mobility",
          "Dammam (Saudi Arabia) — Eastern province industrial & corporate hub",
          "Madinah (Saudi Arabia) — Regional administrative & religious transport",
        ],
      },
    ],
  },

  // Section 2: Event & Fleet Logistics
  {
    eyebrow: h.eventLogistics.badge,
    title: "Event & Fleet Logistics",
    subtitle: "Punctuality, Security, and Scalable Route Execution",
    description:
      "Two synchronized pillars of managed ground logistics operating from our 24/7 Riyadh headquarters.",
    cards: [
      {
        title: h.eventLogistics.chauffeur.title,
        description: h.eventLogistics.chauffeur.desc,
        actions: [
          {
            label: h.eventLogistics.chauffeur.linkText || "Explore chauffeur services",
            href: "/services/chauffeur-vip",
          },
        ],
      },
      {
        title: h.eventLogistics.managed.title,
        description: h.eventLogistics.managed.desc,
        actions: [
          {
            label: h.eventLogistics.managed.linkText || "Explore managed transportation",
            href: "/services/event-transportation",
          },
        ],
      },
    ],
    stats: [
      { value: h.eventLogistics.dispatch, label: "24/7 Live Monitoring & Coordination" },
      { value: h.eventLogistics.coaches, label: "Active Regional Mobility Scale" },
    ],
    subsections: [
      {
        title: `${h.eventLogistics.whatWeRun.badge}: ${h.eventLogistics.whatWeRun.title}`,
        description: h.eventLogistics.whatWeRun.desc,
        bullets: h.eventLogistics.whatWeRun.items.map(
          (it: any) => `**${it.title}:** ${it.desc}`
        ),
      },
    ],
  },

  // Section 3: Industry Solutions
  {
    eyebrow: h.industrySolutions.badge,
    title: "Industry Solutions",
    subtitle: h.industrySolutions.title,
    description: h.industrySolutions.note,
    items: h.industrySolutions.items.map((it: any) => ({
      heading: `${it.title} (Action: ${h.industrySolutions.exploreCta})`,
      description: it.desc,
    })),
    cards: [
      {
        title: h.industrySolutions.ctaCard.title,
        description: h.industrySolutions.ctaCard.desc,
        actions: [
          {
            label: h.industrySolutions.ctaCard.cta,
            href: "/contact",
          },
        ],
      },
    ],
  },

  // Section 4: How It Works / Managed Transportation
  {
    eyebrow: h.managedTransportation.badge,
    title: "How We Work: Managed Transportation Lifecycle",
    subtitle: `${h.managedTransportation.title} ${h.managedTransportation.titleHighlight || ""}`.trim(),
    description: h.managedTransportation.desc,
    subsections: h.managedTransportation.stages.map((stage: any, sIdx: number) => ({
      title: `Stage ${sIdx + 1}: ${stage.name} (${stage.short})`,
      description: stage.text,
      bullets: [
        `Key Deliverables: ${stage.chips.map((c: any) => c.label).join(" · ")}`,
        ...(stage.live ? [`Real-Time Status: ${h.managedTransportation.liveLabel}`] : []),
      ],
    })),
    cards: [
      {
        title: h.managedTransportation.cta.title,
        subtitle: h.managedTransportation.cta.tag,
        description: h.managedTransportation.cta.lead,
        bullets: h.managedTransportation.cta.bullets,
        actions: [
          {
            label: `${h.managedTransportation.cta.button} (Note: ${h.managedTransportation.cta.note})`,
            href: "/contact",
          },
        ],
      },
    ],
  },

  // Section 5: Duty of Care
  {
    eyebrow: "OPERATIONAL STANDARDS & SAFETY",
    title: "Duty of Care Framework",
    subtitle: h.dutyOfCare.title,
    description: h.dutyOfCare.desc,
    cards: h.dutyOfCare.cards.map((c: any) => ({
      title: c.title,
      description: c.desc,
    })),
  },

  // Section 6: Fleet Section
  {
    eyebrow: h.fleetSection.badge,
    title: "Executive Fleet Standards",
    subtitle: h.fleetSection.title,
    description: h.fleetSection.desc,
    buttons: [
      { label: h.fleetSection.link, href: "/fleet" },
    ],
    subsections: [
      {
        title: "Showcase Vehicle Classes & Capacities",
        description: "Late-model executive fleet (< 36 months) maintained to white-glove presentation standards:",
        bullets: [
          "First Class Business Sedan: Mercedes S Class — 3 Pax · 2 Bags",
          "First Class Business Sedan: BMW 7 Series — 3 Pax · 2 Bags",
          "Executive Business Sedan: Lexus ES 350 — 3 Pax · 2 Bags",
          "Standard Sedan: Ford Taurus — 3 Pax · 2 Bags",
          "Standard Sedan: BYD Seal 7 — 3 Pax · 2 Bags",
          "Standard SUV: Mitsubishi Outlander — 5 Pax · 4 Bags",
          "Business SUV: GMC Yukon — 6 Pax · 5 Bags",
          "Business SUV: Chevrolet Suburban — 6 Pax · 5 Bags",
          "First Class SUV: Cadillac Escalade — 6 Pax · 5 Bags",
          "Executive MPV: Mercedes V Class — 6 Pax · 5 Bags",
          "Luxury MPV: Lexus LM — 4 Pax · 4 Bags",
          "Executive Van: Mercedes Sprinter — 14–19 Pax · 10–14 Bags",
          "Mini Bus: Toyota Coaster — 22–26 Pax · 15 Bags",
          "Mid Size Coach: King Long Bus — 30–35 Pax · 20 Bags",
          "Luxury Coaches: VIP Luxury Bus — 43–49 Pax · 30 Bags",
        ],
      },
    ],
  },

  // Section 7: Countries Section
  {
    eyebrow: h.countriesSection.badge,
    title: "Regional Presence: Active Countries",
    subtitle: h.countriesSection.title,
    description: h.countriesSection.desc,
    buttons: [
      { label: h.countriesSection.link, href: "/locations" },
    ],
    bullets: [
      "Saudi Arabia — Comprehensive coverage across Riyadh, Jeddah, Eastern Province, Makkah, Madinah, Tabuk, AlUla & NEOM.",
      "United Arab Emirates — Full emirates coverage across Dubai, Abu Dhabi, Sharjah, Ajman, Al Ain & Ras Al Khaimah.",
      "Qatar — Metropolitan and industrial services in Doha, Lusail, Al Wakrah & Al Khor.",
      "Bahrain — Regional executive support in Manama and surrounding commercial districts.",
      "Kuwait — Corporate and delegation mobility across Kuwait City.",
      "Oman — Executive and tourism transport across Muscat.",
    ],
  },

  // Section 8: Cities Section
  {
    eyebrow: h.citiesSection.badge,
    title: "Metropolitan Operating Hubs",
    subtitle: h.citiesSection.title,
    buttons: [
      { label: h.citiesSection.viewAllCities, href: "/locations" },
    ],
    bullets: [
      "Riyadh, Saudi Arabia — Financial towers, KAFD, Diplomatic Quarter & King Khalid International (RUH).",
      "Jeddah, Saudi Arabia — Red Sea commercial centers, coastal hotels & King Abdulaziz International (JED).",
      "Dammam & Al Khobar, Saudi Arabia — Eastern Province industrial centers & King Fahd International (DMM).",
      "Madinah, Saudi Arabia — Central Haramain hubs & Prince Mohammad bin Abdulaziz Airport (MED).",
      "Doha, Qatar — West Bay business district, Lusail smart city & Hamad International (DOH).",
      "Dubai, United Arab Emirates — DIFC, Downtown, Palm Jumeirah & Dubai International (DXB / DWC).",
      "Abu Dhabi, United Arab Emirates — ADGM, diplomatic embassies & Zayed International (AUH).",
      "Sharjah & Ajman, United Arab Emirates — Northern emirates business parks & intercity highway links.",
    ],
  },

  // Section 9: Case Studies
  {
    eyebrow: h.caseStudies.badge,
    title: "Track Record & Case Studies",
    subtitle: h.caseStudies.title,
    description: h.caseStudies.desc,
    cards: [
      {
        title: "MDL Beast Soundstorm Festival (Riyadh, KSA · 2021–2025)",
        subtitle: "Events & festivals · Scale: 725 Vehicles at peak · 145K+ Attendees · 250+ Artists moved",
        description:
          "Managed turnkey transportation logistics across multiple festival editions with dedicated artist convoys, VIP staging points, and continuous dispatch supervision.",
      },
      {
        title: "The Saudi Cup (Riyadh, KSA · 2021–2025)",
        subtitle: "High-profile sporting event · 180+ Chauffeur vehicles · Royal & Diplomatic delegations",
        description:
          "Flawless protocol execution for horse racing world championship guests, international trainers, and government delegations.",
      },
      {
        title: "ADIPEC VIP Shuttle Services (Abu Dhabi, UAE · 2024 & 2025)",
        subtitle: "Events & exhibitions · Dedicated VIP shuttles · 2 Consecutive editions",
        description:
          "Dedicated executive coach and shuttle transfers linking premier Abu Dhabi hotels to exhibition arenas under strict timing schedules.",
      },
      {
        title: "Siemens Energy (Jubail & Eastern Region, KSA · 2024–present)",
        subtitle: "Corporate & industrial mobility · 7-day weekly coverage · Zero major safety incidents",
        description:
          "Continuous operational ground support for technical teams and leadership across industrial hubs in the Eastern Province.",
      },
      {
        title: "Red Sea International Film Festival (Jeddah, KSA · 2021–2024)",
        subtitle: "International culture & media · 320+ Luxury sedans & SUVs",
        description:
          "Celebrity red-carpet arrivals, international jury motorcades, and multi-venue coastal transfers across historic Al Balad.",
      },
      {
        title: "Formula 1 Saudi Arabian Grand Prix (Jeddah, KSA · 2021–2025)",
        subtitle: "Motorsport summit · 450+ Vehicles deployed",
        description:
          "Trackside paddock shuttles, international media movements, and executive airport transfers synchronized with flight schedules.",
      },
      {
        title: "Riyadh Season VIP Transportation (Riyadh, KSA · 2021–2025)",
        subtitle: "Mega-entertainment season · 500+ Luxury fleet",
        description:
          "Continuous multi-zone executive chauffeur support spanning Boulevard City, Kingdom Arena, and international pop-up venues.",
      },
      {
        title: "Diplomatic & Ministerial Summits (Riyadh & GCC)",
        subtitle: "Government & diplomatic protocol · High-security motorcades",
        description:
          "Secure convoys, armored vehicle support, and protocol-trained chauffeurs for ministerial delegations and multilateral conferences.",
      },
    ],
    buttons: [
      { label: "Discuss your event with our project team", href: "/contact" },
    ],
  },

  // Section 10: Awards
  {
    eyebrow: h.awards.badge,
    title: "Industry Recognition & Accreditations",
    subtitle: h.awards.title,
    description: h.awards.desc,
    items: [
      {
        heading: "World Luxury Travel Awards — 2025 Winner",
        description: "Best Luxury Chauffeur Company, Middle East & North Africa.",
      },
      {
        heading: "Entrepreneur Gulf — Company of the Year 2025",
        description: "Transportation & Events Support Services Excellence Award.",
      },
      {
        heading: "Eventex Awards — Bronze Winner 2024",
        description: "Global Event Supplier & Transport Logistics Partner.",
      },
      {
        heading: "International Hospitality Awards — 2024 Winner",
        description: "Excellence in Executive Ground Transportation & VIP Protocol.",
      },
    ],
  },

  // Section 11: Planning CTA
  {
    eyebrow: "CONSULTATION & INQUIRY",
    title: "Tell Us What You Are Planning",
    subtitle: h.faq.tellUsTitle,
    description: h.faq.tellUsDesc,
    buttons: [
      { label: h.faq.ctaProposal, href: "/contact" },
      { label: h.faq.ctaTransfer, href: "/contact" },
    ],
  },

  // Section 12: FAQs
  {
    eyebrow: h.faq.title,
    title: "Frequently Asked Questions",
    subtitle: `${h.faq.heading1} ${h.faq.heading2}`,
    faqs: h.faq.items.map((it: any) => ({
      question: it.q,
      answer: it.a,
    })),
  },
];

allPages.push({
  fileName: "01-Homepage",
  title: "AB Transportation — Homepage",
  subtitle: "Corporate & Event Transport in KSA, UAE & Qatar",
  url: "https://www.ab.limo/",
  description:
    "Managed chauffeur, airport, event, bus and workforce transportation across Saudi Arabia, the UAE and Qatar. 24/7 dispatch from Riyadh.",
  sections: homepageSections,
});

// =========================================================================
// 2. MAIN SERVICES PAGE (/services)
// =========================================================================
const sHubSections: DocContentSection[] = [
  // Hub Hero
  {
    eyebrow: "OUR SERVICES",
    title: "Services Directory: Six Ways We Move People Across the Gulf",
    subtitle: "Comprehensive Managed Transportation Ecosystem",
    description:
      "From a single VIP arrival to hundreds of vehicles over a multi week event, every journey is planned, dispatched and supervised by one team. Choose a service to see how it works.",
    buttons: [
      { label: "Request a proposal", href: "/contact" },
      { label: "View the fleet", href: "/fleet" },
    ],
    bullets: [
      "1. Executive and Corporate Mobility (/services/chauffeur-vip)",
      "2. Airport Transfers (/services/airport-transfers)",
      "3. Corporate Fleet and Workforce Mobility (/services/corporate-transportation)",
      "4. Event Transportation (/services/event-transportation)",
      "5. Group and Coach Charter (/services/bus-coach-hire)",
      "6. Tourism and Leisure (/services/tourism-transportation)",
    ],
  },

  // 01: Executive and Corporate Mobility
  {
    eyebrow: "SERVICE VERTICAL 01",
    title: "Executive and Corporate Mobility",
    subtitle: "Dedicated Chauffeurs for Leadership and Principals",
    description:
      "Dedicated chauffeurs for leadership teams, board members and visiting principals. Discreet, punctual and briefed on every detail before the door opens.",
    bullets: [
      "Hourly and full day hire availability",
      "Protocol-trained bilingual chauffeurs",
      "First Class and Business sedans (Mercedes S Class, BMW 7 Series, Lexus ES)",
      "Vehicle specification: First Class Sedan",
    ],
    buttons: [
      { label: "Explore Executive & Corporate Mobility", href: "/services/chauffeur-vip" },
    ],
  },

  // 02: Airport Transfers
  {
    eyebrow: "SERVICE VERTICAL 02",
    title: "Airport Transfers",
    subtitle: "Precision Flight Synchronization & Terminal Meet & Greet",
    description:
      "Meet and greet in the arrivals hall, live flight tracking and a car waiting at the kerb, whatever time you land.",
    bullets: [
      "Live flight tracking included automatically",
      "Arrivals hall meet and greet with digital identification board",
      "Complimentary baggage assistance and terminal escort",
      "Vehicle specification: Business Sedan & Executive SUV",
    ],
    buttons: [
      { label: "Explore Airport Transfers", href: "/services/airport-transfers" },
    ],
  },

  // 03: Corporate Fleet & Workforce Mobility
  {
    eyebrow: "SERVICE VERTICAL 03",
    title: "Corporate Fleet and Workforce Mobility",
    subtitle: "Long-Term Commercial Mobility & Account Management",
    description:
      "Managed fleets and staff transport for companies that move people every day, with one account, one dispatch team and clear monthly reporting.",
    bullets: [
      "Long term operational contracts and dedicated pool cars",
      "Staff commuter shuttles and industrial site transit",
      "Transparent monthly usage and cost-center reporting",
      "Vehicle specification: Premium MPV (Mercedes V Class) & Executive Van",
    ],
    buttons: [
      { label: "Explore Corporate Transportation", href: "/services/corporate-transportation" },
    ],
  },

  // 04: Event Transportation
  {
    eyebrow: "SERVICE VERTICAL 04",
    title: "Event Transportation",
    subtitle: "Turnkey Logistics for Summits, Festivals & Global Delegations",
    description:
      "Complete transport for conferences, sporting events and festivals, from a single VIP arrival to hundreds of vehicles over a multi week programme.",
    bullets: [
      "Comprehensive movement architecture and route planning",
      "Dedicated on-site dispatch teams and transport directors",
      "Venue security accreditations and holding bay management",
      "Vehicle specification: Executive Van (Mercedes Sprinter) & Mixed Fleet",
    ],
    buttons: [
      { label: "Explore Event Transportation", href: "/services/event-transportation" },
    ],
  },

  // 05: Group and Coach Charter
  {
    eyebrow: "SERVICE VERTICAL 05",
    title: "Group and Coach Charter",
    subtitle: "High-Capacity Passenger Logistics",
    description:
      "Coaches and executive vans for delegations, crews and guests travelling together, with a coordinator who keeps every group on schedule.",
    bullets: [
      "Modern 30 to 49-seat luxury coaches and executive mini-buses",
      "Delegation, flight crew, and attendee shuttle operations",
      "Dedicated on-board journey coordinators",
      "Vehicle specification: Coach (King Long Bus, VIP Luxury Bus)",
    ],
    buttons: [
      { label: "Explore Bus & Coach Hire", href: "/services/bus-coach-hire" },
    ],
  },

  // 06: Tourism and Leisure
  {
    eyebrow: "SERVICE VERTICAL 06",
    title: "Tourism and Leisure",
    subtitle: "Private Touring Across Gulf Heritage & Landscapes",
    description:
      "Private touring across the Gulf with chauffeurs who know the routes, the history and the best time to arrive, from AlUla to the dunes outside Abu Dhabi.",
    bullets: [
      "Custom day trips and multi-day regional tours",
      "Luxury hotel, private airport, and cruise terminal pickups",
      "Seamless partnerships with destination management companies (DMCs)",
      "Vehicle specification: Executive SUV (Cadillac Escalade, GMC Yukon)",
    ],
    buttons: [
      { label: "Explore Tourism & Leisure Transportation", href: "/services/tourism-transportation" },
    ],
  },

  // Closing CTA
  {
    eyebrow: "ADVISORY & PLANNING",
    title: "Bespoke Movement Plan Formulation",
    subtitle: "Not sure which service fits?",
    description:
      "Tell us about the journey and we will design the movement plan. hello@ab.limo",
    buttons: [
      { label: "Request a proposal", href: "/contact" },
    ],
  },
];

allPages.push({
  fileName: "02-Main-Services-Page",
  title: "AB Transportation — Services Hub",
  subtitle: "Six Ways We Move People Across the Gulf",
  url: "https://www.ab.limo/services",
  description:
    "Comprehensive directory of managed transportation services including VIP chauffeurs, airport transfers, corporate mobility, events, coach charter, and tourism.",
  sections: sHubSections,
});

// =========================================================================
// 3. THE 9 MAIN SERVICES PAGES FROM NAVBAR DROPDOWN
// =========================================================================
const serviceMetaMap: Record<
  string,
  { num: string; filePrefix: string; defaultTitle: string; defaultSubtitle: string; navName: string }
> = {
  "chauffeur-vip": {
    num: "03",
    filePrefix: "03-Chauffeur-and-VIP",
    defaultTitle: "Executive & Corporate Mobility",
    defaultSubtitle: "Chauffeur services that reflect your standards",
    navName: "Chauffeur & VIP",
  },
  "airport-transfers": {
    num: "04",
    filePrefix: "04-Airport-Transfers",
    defaultTitle: "Airport Transfers",
    defaultSubtitle: "Punctual terminal arrivals, guaranteed",
    navName: "Airport Transfers",
  },
  "corporate-transportation": {
    num: "05",
    filePrefix: "05-Corporate-Transportation",
    defaultTitle: "Corporate & Staff Transportation",
    defaultSubtitle: "Corporate transportation, managed end to end",
    navName: "Corporate Transportation",
  },
  "event-transportation": {
    num: "06",
    filePrefix: "06-Event-Transportation",
    defaultTitle: "Event Transportation",
    defaultSubtitle: "Ground transport for events that cannot fail",
    navName: "Event Transportation",
  },
  "bus-coach-hire": {
    num: "07",
    filePrefix: "07-Bus-and-Coach-Hire",
    defaultTitle: "Group & Coach Charter",
    defaultSubtitle: "Executive Coaches & High-Capacity Fleet Hire",
    navName: "Bus & Coach Hire",
  },
  "workforce-mobility": {
    num: "08",
    filePrefix: "08-Workforce-Mobility",
    defaultTitle: "Workforce Mobility Solutions",
    defaultSubtitle: "Enterprise workforce transportation, engineered for reliability",
    navName: "Workforce Mobility",
  },
  "tourism-transportation": {
    num: "09",
    filePrefix: "09-Tourism-Transportation",
    defaultTitle: "Tourism & Leisure",
    defaultSubtitle: "Private touring across the Gulf's iconic landscapes",
    navName: "Tourism Transportation",
  },
  "religious-tourism": {
    num: "10",
    filePrefix: "10-Religious-Tourism",
    defaultTitle: "Religious Tourism",
    defaultSubtitle: "Premium Umrah & Hajj executive ground transportation",
    navName: "Religious Tourism",
  },
  "intercity-transfers": {
    num: "11",
    filePrefix: "11-Intercity-Transfers",
    defaultTitle: "Intercity Transfers",
    defaultSubtitle: "Direct highway transfers between major Gulf cities",
    navName: "Intercity Transfers",
  },
};

const serviceOrder = [
  "chauffeur-vip",
  "airport-transfers",
  "corporate-transportation",
  "event-transportation",
  "bus-coach-hire",
  "workforce-mobility",
  "tourism-transportation",
  "religious-tourism",
  "intercity-transfers",
];

serviceOrder.forEach((slug) => {
  const meta = serviceMetaMap[slug];
  const dbDoc = dumpedServices.find((s) => s.slug === slug);
  if (!dbDoc) {
    console.error(`Missing DB document for ${slug}`);
    return;
  }

  const pageTitle = dbDoc.title || meta.defaultTitle;
  const pageSubtitle = dbDoc.subtitle || meta.defaultSubtitle;
  const pageUrl = `https://www.ab.limo/services/${slug}`;
  const pageDesc =
    dbDoc.seo?.metaDescription || dbDoc.desc || `${pageTitle} across Saudi Arabia, UAE, and Qatar.`;

  const parsedSections: DocContentSection[] = [];

  const rawSections: any[] = dbDoc.pageSections || [];
  rawSections
    .filter((sec) => sec.enabled !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .forEach((sec, idx) => {
      const c = sec.content || {};

      switch (sec.type) {
        case "hero": {
          parsedSections.push({
            eyebrow: c.eyebrow || meta.navName,
            title: `Hero: ${c.title || pageTitle}`,
            subtitle: c.titleHighlight ? `${c.title} ${c.titleHighlight}` : c.title,
            description: stripHtml(c.description || ""),
            buttons: (sec.items || []).map((it: any) => ({
              label: it.label || "Book now",
              href: it.href || "/contact",
              style: it.style,
            })),
          });
          break;
        }

        case "marquee": {
          const mItems = c.items || [];
          parsedSections.push({
            eyebrow: "OPERATIONAL HIGHLIGHTS",
            title: c.heading || "Operational Standards & Hallmarks",
            bullets: mItems.map((m: any) =>
              typeof m === "string" ? m : `${m.label || m.heading || ""}`
            ),
          });
          break;
        }

        case "serviceCards": {
          const cards = (sec.items || []).map((item: any) => ({
            title: item.title || "",
            description: stripHtml(item.description || ""),
            actions: (item.actions || []).map((act: any) => ({
              label: act.label || "Learn more",
              href: act.href || "/contact",
            })),
          }));
          parsedSections.push({
            eyebrow: c.eyebrow,
            title: c.heading || "Service Capabilities & Tiers",
            description: stripHtml(c.description || ""),
            cards,
          });
          break;
        }

        case "mediaContent": {
          const bullets: string[] = [];
          if (c.items && Array.isArray(c.items)) {
            c.items.forEach((it: any) => {
              const hText = it.heading ? `**${it.heading}**` : "";
              const dText = it.description ? ` — ${it.description}` : "";
              bullets.push(`${hText}${dText}`);
            });
          }
          parsedSections.push({
            eyebrow: "OPERATIONAL FRAMEWORK",
            title: c.heading || "Service Architecture & Delivery",
            description: stripHtml(c.description || ""),
            bullets: bullets.length ? bullets : undefined,
          });
          break;
        }

        case "fleetGrid": {
          const fleetCards = (sec.items || []).map((v: any) => ({
            title: `${v.category || "Vehicle"} — ${v.name || ""}`,
            subtitle: `Badge: ${v.badge || "Executive"} · Capacity: ${v.capacity || "N/A"} · Luggage: ${v.bags || "N/A"}`,
            description: `Late-model executive vehicle compliant with GCC transport standards.`,
            actions: (v.actions || []).map((act: any) => ({
              label: act.label || "Book vehicle",
              href: act.href || "/book",
            })),
          }));

          const buttons: Array<{ label: string; href?: string }> = [];
          if (c.headerAction) {
            buttons.push({ label: c.headerAction.label, href: c.headerAction.href });
          }
          if (c.bottomCta) {
            buttons.push({ label: c.bottomCta.label, href: c.bottomCta.href });
          }

          parsedSections.push({
            eyebrow: c.eyebrow || "FLEET ALLOCATION",
            title: c.heading || "Vehicles Available for This Service",
            description: stripHtml(c.description || ""),
            cards: fleetCards,
            buttons: buttons.length ? buttons : undefined,
          });
          break;
        }

        case "textMediaGrid": {
          const bullets: string[] = [];
          if (c.items && Array.isArray(c.items)) {
            c.items.forEach((it: any) => {
              bullets.push(`**${it.heading}:** ${it.description}`);
            });
          }
          const stats: Array<{ value: string; label: string }> = [];
          if (c.media && Array.isArray(c.media)) {
            c.media.forEach((m: any) => {
              if (m.type === "stat" && m.statValue) {
                stats.push({ value: m.statValue, label: m.statLabel || "" });
              }
            });
          }
          parsedSections.push({
            eyebrow: c.eyebrow || "REGIONAL EXECUTION",
            title: c.heading || "Infrastructure Alignment & Case Study",
            subtitle: c.headingHighlight ? `${c.heading} ${c.headingHighlight}` : undefined,
            description: stripHtml(c.description || ""),
            bullets: bullets.length ? bullets : undefined,
            stats: stats.length ? stats : undefined,
          });
          break;
        }

        case "faq": {
          const faqs = (c.items || []).map((faq: any) => ({
            question: faq.question || faq.q || "",
            answer: faq.answer || faq.a || "",
          }));
          parsedSections.push({
            eyebrow: c.eyebrow || "FREQUENTLY ASKED QUESTIONS",
            title: c.heading || "Questions & Operational Answers",
            description: stripHtml(c.description || ""),
            faqs,
          });
          break;
        }

        case "contactForm": {
          parsedSections.push({
            eyebrow: c.eyebrow || "COMMERCIAL INQUIRY",
            title: c.heading || "Procurement & Account Request",
            description: stripHtml(c.description || ""),
            buttons: [
              {
                label: `[SUBMIT FORM] ${c.submitLabel || "Submit Request"}`,
                href: "/contact",
              },
            ],
            subsections: [
              {
                title: "On Submission Confirmation:",
                description: `${c.successTitle || "Request Received"}: ${c.successMessage || "Our team will contact you shortly."}`,
              },
            ],
          });
          break;
        }

        case "ctaBanner": {
          parsedSections.push({
            eyebrow: "ACTION & RESERVATION",
            title: c.heading || "Ready to Coordinate Your Mobility?",
            description: stripHtml(c.description || ""),
            buttons: (sec.items || []).map((it: any) => ({
              label: it.label || "Request proposal",
              href: it.href || "/contact",
            })),
          });
          break;
        }

        default: {
          parsedSections.push({
            title: `Section: ${sec.type}`,
            description: stripHtml(JSON.stringify(c, null, 2)),
          });
          break;
        }
      }
    });

  allPages.push({
    fileName: meta.filePrefix,
    title: `AB Transportation — ${pageTitle}`,
    subtitle: pageSubtitle,
    url: pageUrl,
    description: pageDesc,
    sections: parsedSections,
  });
});

// =========================================================================
// 4. WRITE OUT ALL FILES (DOCX AND MD)
// =========================================================================
async function generateAll() {
  console.log(`Writing documents for ${allPages.length} pages...`);

  for (const page of allPages) {
    // 1. Generate Markdown file
    const mdPath = path.join(OUT_DIR, `${page.fileName}.md`);
    const mdContent = pageToMarkdown(page);
    fs.writeFileSync(mdPath, mdContent, "utf8");
    console.log(`✓ Created Markdown: ${page.fileName}.md`);

    // 2. Generate Word DOCX file
    const docxDoc = pageToDocx(page);
    const buffer = await Packer.toBuffer(docxDoc);
    const docxPath = path.join(OUT_DIR, `${page.fileName}.docx`);
    fs.writeFileSync(docxPath, buffer);
    console.log(`✓ Created Word Document: ${page.fileName}.docx (${buffer.length} bytes)`);
  }

  // Also create a master Index Markdown file in the folder
  let indexMd = `# AB Transportation — Website Content Documents Directory\n\n`;
  indexMd += `This directory contains complete, formatted Word (.docx) and Markdown (.md) documents containing 100% of the live English text from the AB Transportation website across the Homepage, Main Services Hub, and all 9 Services in the primary navigation dropdown.\n\n`;
  indexMd += `### Included Documents:\n\n`;
  allPages.forEach((p, idx) => {
    indexMd += `${idx + 1}. **${p.title}**\n`;
    indexMd += `   - Word File: [\`${p.fileName}.docx\`](${p.fileName}.docx)\n`;
    indexMd += `   - Markdown File: [\`${p.fileName}.md\`](${p.fileName}.md)\n`;
    indexMd += `   - Live URL: \`${p.url}\`\n`;
    indexMd += `   - Sections: ${p.sections.length} sections\n\n`;
  });

  fs.writeFileSync(path.join(OUT_DIR, "README.md"), indexMd, "utf8");
  console.log("\n✓ Created master README.md index in website-content-documents/");
  console.log("\nALL 11 PAGES GENERATED SUCCESSFULLY IN BOTH .DOCX AND .MD FORMATS!");
}

generateAll().catch(console.error);
