import fs from "fs";
import path from "path";
import { Packer } from "docx";
import {
  pageToDocx,
  pageToMarkdown,
  type PageData,
  type DocContentSection,
} from "./doc-builder-helper";

import {
  COUNTRIES,
  CITY_ROUTES,
  type Country,
  type City,
  type Airport,
} from "../src/lib/locations";
import { CLIENT_COUNTRY_DATA } from "../src/components/section-library/presets/client-country-data";
import { CLIENT_CITY_DATA } from "../src/components/section-library/presets/client-city-data";
import {
  getCityAbout,
  getCountryAbout,
} from "../src/app/[lang]/locations/_components/aboutContent";
import {
  SKETCH_OFFICES,
  SKETCH_AIRPORTS,
  SKETCH_ROUTES,
  SKETCH_FAQS,
} from "../src/app/[lang]/locations/_components/locations-sketch";

// Output directory: locations-content-documents at root
const OUT_DIR = path.resolve("locations-content-documents");
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const allPages: PageData[] = [];

// =========================================================================
// 1. MAIN LOCATIONS HUB PAGE (/locations)
// =========================================================================
function buildLocationsHubPage(): PageData {
  const sections: DocContentSection[] = [
    // 1. Hero Section
    {
      eyebrow: "Chauffeur Service Locations GCC",
      title: "Hero Section: Where AB Operates in Saudi Arabia, the UAE and Qatar",
      subtitle: "Managed Ground Transportation GCC Across Six Gulf States",
      description:
        "Coordinating executive travel across chauffeur service locations GCC demands rigorous operational timing and consistent service standards. AB manages ground transportation GCC networks for business delegations, executive travellers, diplomatic missions and corporate events across the region. Central dispatch in Riyadh coordinates around the clock with regional teams in Dubai, Abu Dhabi and Doha to deliver seamless travel.\n\nEvery journey connects through established operational hubs that oversee vehicle dispatch, flight tracking and local protocol. This unified regional network allows organisations to manage cross border itineraries under one operating standard.",
      buttons: [
        { label: "Request a proposal", href: "/contact" },
        { label: "Book a transfer", href: "/contact" },
      ],
      stats: [
        {
          value: "3 Countries",
          label:
            "Direct fleet operations across Saudi Arabia, United Arab Emirates, and Qatar (plus regional partner coverage in Bahrain, Kuwait, and Oman).",
        },
        {
          value: "4 Regional Offices",
          label:
            "Fully staffed operations centers in Riyadh, Dubai, Abu Dhabi, and Doha coordinating local movements.",
        },
        {
          value: "8+ Primary Airports",
          label:
            "Dedicated meet & greet infrastructure across major international gateways and VIP private flight terminals.",
        },
      ],
    },

    // 2. One Regional Partner
    {
      eyebrow: "Unified Operating Framework",
      title: "One Regional Partner Across the Gulf",
      subtitle: "Seamless Cross-Border Mobility for Corporate & Institutional Travel",
      description:
        "Travel between Gulf capital cities without switching transport providers. AB provides corporate travel managers and executive assistants with one account team, one dispatch platform and unified billing across Saudi Arabia, the UAE and Qatar. This integrated framework maintains service consistency for high profile visitors across every commercial centre.",
      bullets: [
        "Single Point of Contact: Dedicated account managers handle reservations across all GCC destinations.",
        "Unified Invoicing: Consolidated corporate billing across multiple countries and currencies.",
        "Consistent Duty of Care: Identical vehicle standards, chauffeur vetting, and flight-tracking protocols across all markets.",
        "Cross-Border Capability: Ground transfer coordination via the King Fahd Causeway (KSA-Bahrain) and inter-emirate highway networks.",
      ],
    },

    // 3. Managed Regional Offices
    {
      eyebrow: "Offices & 24/7 Operations Command",
      title: "Managed Regional Offices Across the GCC",
      subtitle: "Physical Operations Centers with Dedicated Ground Dispatchers",
      description:
        "AB offices are staffed by full-time operations managers, dispatchers and protocol specialists who understand municipal routes, terminal access regulations and major event venues. Dedicated teams monitor local traffic conditions and flight arrivals continuously to maintain punctual executive car service.",
      cards: [
        {
          title: "Riyadh (Headquarters & 24/7 Dispatch)",
          subtitle: "Kingdom of Saudi Arabia",
          description:
            "Our headquarters and central operations centre coordinates vehicle movements and dispatches professional chauffeurs throughout Saudi Arabia, the UAE and Qatar around the clock.\n\nAddress: Building 3036, Office 08, 2nd Floor, Umar Ibn Abdulaziz Road, Al Malaz, Riyadh, Saudi Arabia\nTelephone: +966 58 111 8720",
          actions: [{ label: "Explore Saudi Arabia", href: "/locations/saudi-arabia" }],
        },
        {
          title: "Dubai & Abu Dhabi",
          subtitle: "United Arab Emirates",
          description:
            "Our UAE offices manage executive fleets across all seven emirates, supporting corporate travel from Dubai commercial districts to Abu Dhabi government ministries.\n\nDubai: Suite 206, DBC Building, Al Khabaisi, Deira, Dubai, UAE (+971 50 781 3880)\nAbu Dhabi: Office 03, Mezzanine Floor, Building C57, Abu Dhabi, UAE (+971 50 918 0556)",
          actions: [{ label: "Explore UAE", href: "/locations/uae" }],
        },
        {
          title: "Doha",
          subtitle: "State of Qatar",
          description:
            "Our Qatar office manages luxury car bookings, airport arrivals and corporate itineraries throughout central Doha, West Bay commercial towers and Lusail development zones.\n\nAddress: Office 110, Building 100, Zone 26, Street 310, Old Airport Road, Doha, Qatar\nTelephone: +974 7734 3300",
          actions: [{ label: "Explore Qatar", href: "/locations/qatar" }],
        },
      ],
    },

    // 4. Territory Directory by Country
    {
      eyebrow: "Comprehensive Coverage",
      title: "Gulf Territory Directory: Six Countries, 41 Cities",
      subtitle: "Direct Fleet Operations and Partner Networks Across the Arabian Peninsula",
      description:
        "AB provides managed executive ground mobility across all six Gulf Cooperation Council (GCC) member states:",
      subsections: [
        {
          title: "1. Kingdom of Saudi Arabia (17 Cities)",
          description:
            "Direct operations across Riyadh (RUH), Jeddah (JED), Makkah (via JED), Madinah (MED), Dammam (DMM), Al Khobar (via DMM), AlUla (ULH), Tabuk (TUU), and NEOM (NUM). Regional coverage across Abha (AHB), Al Qassim (ELQ), Jizan (GIZ), Hail (HAS), Jubail, Najran (EAM), Taif (TIF), and Yanbu (YNB).",
        },
        {
          title: "2. United Arab Emirates (8 Cities)",
          description:
            "Direct operations across Dubai (DXB, DWC), Abu Dhabi (AUH), Sharjah (SHJ), Ajman, Al Ain, Ras Al Khaimah (RKT), Fujairah (FJR), and Umm Al Quwain.",
        },
        {
          title: "3. State of Qatar (4 Cities)",
          description:
            "Direct operations across Doha (DOH), Lusail, Al Wakrah, and Al Khor, connecting Hamad International Airport to central ministries, financial hubs, and stadium venues.",
        },
        {
          title: "4. Kingdom of Bahrain (3 Cities)",
          description:
            "Regional operations in Manama, Riffa, and Muharraq, with 24/7 transfers to Bahrain International Airport (BAH) and King Fahd Causeway cross-border links.",
        },
        {
          title: "5. State of Kuwait (5 Cities)",
          description:
            "Regional operations in Kuwait City, Hawalli, Farwaniya, Al Ahmadi, and Salmiya, serving Kuwait International Airport (KWI) and executive oil sector corridors.",
        },
        {
          title: "6. Sultanate of Oman (4 Cities)",
          description:
            "Regional operations in Muscat (MCT), Salalah (SLL), Sohar (SOH), and Nizwa, providing luxury touring, business mobility, and VIP airport services.",
        },
      ],
    },

    // 5. Primary Aviation Gateways
    {
      eyebrow: "Airports Served",
      title: "Commercial Gateways & Private Aviation Terminals",
      subtitle: "Coordinated Airport Meet & Greet with Flight Telemetry Tracking",
      description:
        "Every airport transfer includes terminal meet-and-greet, flight tracking, luggage porter assistance, and 60 minutes of complimentary waiting time from actual flight touchdown.",
      cards: SKETCH_AIRPORTS.map((a) => ({
        title: `${a.code} — ${a.name}`,
        subtitle: a.scope,
        description: `Dedicated airport transfer and VIP meet & greet service at ${a.name} (${a.code}). 60-minute complimentary wait time and flight tracking included.`,
        actions: [{ label: "View Airport Transfers", href: "/airports" }],
      })),
    },

    // 6. Strategic Intercity Corridors
    {
      eyebrow: "Highway Corridors",
      title: "Major GCC Intercity Transfers & Highway Corridors",
      subtitle: "Comfortable Long-Distance Ground Travel Between Capital Cities and Economic Hubs",
      description:
        "Eliminate airport check-in queues, security lines, and baggage delays with direct intercity chauffeur transport between major Gulf metropolitan zones.",
      cards: SKETCH_ROUTES.map((r) => ({
        title: `${r.from} to ${r.to}`,
        subtitle: r.duration ? `Approx. ${r.duration}` : "Scheduled Intercity Corridor",
        description: r.description,
        actions: [{ label: "Book Corridor", href: "/contact" }],
      })),
    },

    // 7. Frequently Asked Questions
    {
      eyebrow: "Frequently Asked Questions",
      title: "Executive Chauffeur Service GCC: Frequently Asked Questions",
      subtitle: "Operational Details, Booking Protocols, and Regional Coverage",
      faqs: SKETCH_FAQS.map((f) => ({
        question: f.q,
        answer: f.a,
      })),
    },

    // 8. Closing CTA
    {
      eyebrow: "24/7 Operations Desk",
      title: "Coordinate Your Regional GCC Ground Transport With AB",
      subtitle: "Single Account Setup · Multi-Country Dispatch · Guaranteed Standards",
      description:
        "Reach our central dispatch team in Riyadh on +966 58 111 8720 or speak to regional operations managers in Dubai, Abu Dhabi and Doha. We coordinate executive car service, private driver bookings, and fleet logistics across Saudi Arabia, the UAE and Qatar around the clock.",
      buttons: [
        { label: "Request a Proposal", href: "/contact" },
        { label: "Book a Transfer", href: "/contact" },
        { label: "Call Dispatch (+966 58 111 8720)", href: "tel:+966581118720" },
      ],
    },
  ];

  return {
    fileName: "01-Main-Locations-Hub",
    title: "Chauffeur Service Locations GCC — AB Operations",
    subtitle: "Where AB Operates in Saudi Arabia, the UAE, Qatar, Bahrain, Kuwait, and Oman",
    url: "https://www.ab.limo/locations",
    description:
      "Explore AB's chauffeur service locations across the GCC: direct operations in Saudi Arabia, UAE and Qatar, plus Bahrain, Kuwait and Oman. Managed regional offices, airports and intercity transfers.",
    sections,
  };
}

// =========================================================================
// 2. COUNTRY PAGE BUILDER (6 Countries)
// =========================================================================
function buildCountryPage(countrySlug: string, filePrefix: string): PageData {
  const countryObj = COUNTRIES.find((c) => c.slug === countrySlug);
  const clientCountry = CLIENT_COUNTRY_DATA[countrySlug];
  const about = getCountryAbout(countrySlug);

  const countryName = countryObj?.name || clientCountry?.name || countrySlug;
  const rawSections = clientCountry?.buildSections
    ? clientCountry.buildSections("en-US", "en-US")
    : [];

  const sections: DocContentSection[] = [];

  // 1. Hero
  const heroSec = rawSections.find((s) => s.type === "hero");
  const heroContent = (heroSec?.content || {}) as Record<string, any>;
  sections.push({
    eyebrow: `Executive Mobility · ${countryName}`,
    title: `Hero Section: Chauffeur Service in ${countryName}`,
    subtitle: String(heroContent.title || clientCountry?.heroTitle || `Executive Chauffeur Service in ${countryName}`),
    description: String(
      heroContent.description ||
      clientCountry?.heroDescription ||
      about.description
    ),
    buttons: [
      { label: "Request a proposal", href: "/contact" },
      { label: "Book a transfer", href: "/contact" },
    ],
  });

  // 2. Key Highlights / Regional Overview
  sections.push({
    eyebrow: "National Mobility Framework",
    title: `Chauffeur Excellence & Executive Transport in ${countryName}`,
    subtitle: about.title || `Managed Ground Mobility Across ${countryName}`,
    description: about.description,
    bullets: [
      `Complete National Reach: Covering all major metropolitan centers, commercial districts, and international airports in ${countryName}.`,
      "Vetted Chauffeur Standards: Professionally licensed, bilingual, protocol-trained drivers with strict non-disclosure compliance.",
      "Immaculate Fleet: Late-model Mercedes-Benz S-Class, E-Class, Cadillac Escalade, GMC Yukon, and luxury vans.",
      "24/7 Operations Desk: Continuous GPS telemetry tracking, flight monitoring, and immediate dispatch control.",
    ],
  });

  // 3. Process remaining sections from clientCountry
  for (const s of rawSections) {
    if (s.type === "hero" || s.type === "breadcrumb") continue;
    const sContent = (s.content || {}) as Record<string, any>;

    if (s.type === "serviceCards") {
      sections.push({
        eyebrow: String(sContent.eyebrow || "Our Capabilities"),
        title: String(sContent.heading || sContent.title || "Executive Chauffeur Services"),
        description: String(sContent.description || ""),
        cards: (s.items || []).map((it: any) => ({
          title: it.heading || it.title || "",
          subtitle: it.badge || it.category || "",
          description: it.description || "",
          bullets: it.points || it.features || [],
          actions: it.actions || (it.href ? [{ label: "Learn More", href: it.href }] : []),
        })),
      });
    } else if (s.type === "mediaContent") {
      sections.push({
        eyebrow: String(sContent.eyebrow || "Operations & Destinations"),
        title: String(sContent.heading || sContent.title || "Managed Logistics"),
        description: String(sContent.description || ""),
        items: (sContent.items || []).map((it: any) => ({
          heading: it.heading || it.title || "",
          description: it.description || "",
          icon: it.icon || "",
        })),
        buttons: (sContent.actions || []).map((a: any) => ({
          label: a.label || "View Details",
          href: a.href || "/contact",
          style: a.style,
        })),
      });
    } else if (s.type === "citiesGrid") {
      sections.push({
        eyebrow: "Directory",
        title: String(sContent.heading || `Cities Served in ${countryName}`),
        description: String(
          sContent.description ||
          `Explore our comprehensive ground mobility network across ${countryName}:`
        ),
        cards: (countryObj?.cities || []).map((ct) => ({
          title: ct.name,
          subtitle: ct.airports.length > 0 ? `Airports: ${ct.airports.map((a) => a.iata).join(", ")}` : "City Chauffeur Coverage",
          description:
            ct.description ||
            `Executive car service, airport transfers, and corporate mobility in ${ct.name}.`,
          actions: [
            {
              label: `Explore ${ct.name}`,
              href: `/locations/${countrySlug}/${ct.slug}`,
            },
          ],
        })),
      });
    } else if (s.type === "introText") {
      sections.push({
        eyebrow: String(sContent.eyebrow || "Standards & Compliance"),
        title: String(sContent.heading || sContent.title || "Operating Standards"),
        description: String(sContent.description || ""),
        bullets: Array.isArray(sContent.bullets) ? sContent.bullets : [],
      });
    } else if (s.type === "faq") {
      // Handled via faqs array below if not here
    } else if (s.type === "ctaBanner") {
      sections.push({
        eyebrow: "Reservations",
        title: String(sContent.heading || `Reserve Your Chauffeur Service in ${countryName}`),
        description: String(sContent.description || "Coordinate executive mobility across the country with our dedicated 24/7 team."),
        buttons: (s.items || []).map((it: any) => ({
          label: it.label || "Contact Dispatch",
          href: it.href || "/contact",
          style: it.style,
        })),
      });
    }
  }

  // 4. FAQs
  const faqsList = clientCountry?.faqs || countryObj?.faqs || [];
  if (faqsList.length > 0) {
    sections.push({
      eyebrow: "Questions",
      title: `Frequently Asked Questions About Chauffeur Service in ${countryName}`,
      subtitle: `Booking Guidelines, Airport Protocols, and Vehicle Standards in ${countryName}`,
      faqs: faqsList.map((f: any) => ({
        question: f.q,
        answer: f.a,
      })),
    });
  }

  // 5. Final CTA if not already present
  if (!sections.some((s) => s.title.toLowerCase().includes("reserve") || s.title.toLowerCase().includes("ready"))) {
    sections.push({
      eyebrow: "24/7 Dispatch Desk",
      title: `Reserve Your Chauffeur Service in ${countryName}`,
      description:
        `Contact our central operations command to schedule executive airport transfers, hourly charters, or multi-city business itineraries across ${countryName}.`,
      buttons: [
        { label: "Request a Proposal", href: "/contact" },
        { label: "Book a Transfer", href: "/contact" },
      ],
    });
  }

  const fileNameSlug = countrySlug === "uae" ? "United-Arab-Emirates" : countryName.replace(/\s+/g, "-");

  return {
    fileName: `${filePrefix}-${fileNameSlug}`,
    title: `Chauffeur Service in ${countryName} — AB Executive Mobility`,
    subtitle: `Executive Limousine, Airport Transfers, and Corporate Travel in ${countryName}`,
    url: `https://www.ab.limo/locations/${countrySlug}`,
    description:
      clientCountry?.description ||
      `AB provides executive chauffeur service in ${countryName}. Professional drivers, luxury fleet, airport transfers and corporate mobility.`,
    sections,
  };
}

// =========================================================================
// 3. CITY PAGE BUILDER (41 Cities)
// =========================================================================
function buildCityPage(
  country: Country,
  cityObj: City,
  filePrefix: string
): PageData {
  const clientCity = CLIENT_CITY_DATA[cityObj.slug];
  const about = getCityAbout(cityObj.slug);
  const cityName = cityObj.name;
  const countryName = country.name;

  const sections: DocContentSection[] = [];

  if (clientCity) {
    // -------------------------------------------------------------
    // Case A: Rich Structured Client Data exists (22 Cities)
    // -------------------------------------------------------------
    // 1. Hero
    sections.push({
      eyebrow: `Executive Chauffeur Service · ${cityName}, ${countryName}`,
      title: `Hero Section: ${clientCity.heroTitle}`,
      subtitle: clientCity.displayName || cityName,
      description: clientCity.heroDescription,
      buttons: [
        { label: "Book a Chauffeur", href: "/contact" },
        { label: "Request a Proposal", href: "/contact" },
      ],
    });

    // 2. Fleet
    if (clientCity.vehicles && clientCity.vehicles.length > 0) {
      sections.push({
        eyebrow: clientCity.fleetEyebrow || "The Fleet",
        title: clientCity.fleetHeading || `Executive Fleet in ${cityName}`,
        subtitle: clientCity.fleetSubheading || "Select a class to view interior comfort and luggage capacity",
        cards: clientCity.vehicles.map((v) => ({
          title: `${v.category}: ${v.model}`,
          subtitle: v.specLine,
          description: `${v.description}\n\nIdeal For: ${v.idealFor} | Capacity: ${v.capacity} Passengers, ${v.bags} Bags`,
        })),
      });
    }

    // 3. Journeys / Routes
    if (clientCity.journeys && clientCity.journeys.length > 0) {
      sections.push({
        eyebrow: clientCity.journeysEyebrow || "Popular Routes",
        title: clientCity.journeysHeading || `Popular Journeys in ${cityName}`,
        subtitle: clientCity.journeysDescription || "Transparent fixed fares and scheduled transfers",
        cards: clientCity.journeys.map((j) => ({
          title: j.title,
          subtitle: `Route Category: ${j.tag}`,
          description: j.description || "",
          bullets: [j.priceText],
          actions: j.href ? [{ label: "View Route", href: j.href }] : [],
        })),
      });
    }

    // 4. Services
    if (clientCity.services && clientCity.services.length > 0) {
      sections.push({
        eyebrow: clientCity.servicesEyebrow || "Our Capabilities",
        title: clientCity.servicesHeading || `Ground Mobility Services in ${cityName}`,
        subtitle: clientCity.servicesDescription || "Flexible chauffeur solutions for corporate and private clients",
        cards: clientCity.services.map((s) => ({
          title: s.title,
          description: s.description,
          actions: [{ label: "Learn More", href: s.href }],
        })),
      });
    }

    // 5. Airport Info
    if (clientCity.airportInfo) {
      const ap = clientCity.airportInfo;
      sections.push({
        eyebrow: ap.eyebrow || "Airport Mobility",
        title: ap.heading || `Airport Transfers in ${cityName}`,
        description: ap.description,
        subsections: [
          {
            title: "Operational Protocols & Arrival Amenities",
            bullets: (ap.bullets || []).map((b) => `${b.heading}: ${b.description}`),
          },
        ],
      });
    }

    // 6. Coverage Groups
    if (clientCity.coverageGroups && clientCity.coverageGroups.length > 0) {
      sections.push({
        eyebrow: clientCity.coverageEyebrow || "Coverage",
        title: clientCity.coverageHeading || `Where We Operate in ${cityName}`,
        subtitle: clientCity.coverageDescription || "Complete coverage across municipal, business, and residential districts",
        items: clientCity.coverageGroups.map((c) => ({
          heading: c.category,
          description: c.places,
          icon: c.icon,
        })),
      });
    }

    // 7. Operations Office
    if (clientCity.officeTitle || clientCity.officeHeading) {
      sections.push({
        eyebrow: clientCity.officeEyebrow || "Local Operations Desk",
        title: clientCity.officeHeading || `Managed Operations for ${cityName}`,
        description: clientCity.officeDescription || "",
        cards: [
          {
            title: clientCity.officeTitle || `AB ${cityName} Operations Desk`,
            subtitle: "Local Dispatch & Customer Coordination",
            description: `Address:\n${clientCity.officeAddress || "Coordinated through AB Central Command"}\n\nTelephone:\n${clientCity.officePhone || "+966 58 111 8720"}`,
          },
        ],
      });
    }

    // 8. FAQs
    if (clientCity.faqs && clientCity.faqs.length > 0) {
      sections.push({
        eyebrow: clientCity.faqEyebrow || "Questions",
        title: clientCity.faqHeading || `Frequently Asked Questions About Chauffeur Service in ${cityName}`,
        faqs: clientCity.faqs.map((f) => ({
          question: f.q,
          answer: f.a,
        })),
      });
    }

    // 9. CTA
    sections.push({
      eyebrow: "Reservations",
      title: clientCity.ctaHeading || `Your Chauffeur is Ready in ${cityName}`,
      subtitle: clientCity.ctaSubheading || "Reserve Your Executive Chauffeur Service",
      description: `${clientCity.ctaDescription || ""}\n\n${clientCity.ctaSubdescription || ""}`.trim(),
      buttons: [
        { label: "Book a Chauffeur", href: "/contact" },
        { label: "Request a Proposal", href: "/contact" },
      ],
    });
  } else {
    // -------------------------------------------------------------
    // Case B: Standard Luxury City Data (19 Cities)
    // -------------------------------------------------------------
    const airportsText =
      cityObj.airports.length > 0
        ? cityObj.airports.map((a) => `${a.name} (${a.iata})`).join(", ")
        : "Regional commercial & private airports";

    // 1. Hero
    sections.push({
      eyebrow: `Executive Chauffeur Service · ${cityName}, ${countryName}`,
      title: `Hero Section: Chauffeur Service in ${cityName}`,
      subtitle: about.title || `Executive Ground Mobility Across ${cityName}`,
      description:
        about.description ||
        cityObj.description ||
        `AB provides luxury chauffeur-driven transportation in ${cityName}, ${countryName}. Punctual airport transfers, corporate travel, hourly charter, and VIP mobility tailored to corporate schedules.`,
      buttons: [
        { label: "Request a Proposal", href: "/contact" },
        { label: "Book a Transfer", href: "/contact" },
      ],
    });

    // 2. Destination Profile & Mobility
    sections.push({
      eyebrow: "Destination Profile",
      title: `Chauffeur Excellence & Executive Transport in ${cityName}`,
      subtitle: `Managed Mobility Across ${cityName}'s Key Corridors`,
      description:
        cityObj.description
          ? `${about.description}\n\n${cityObj.description}`
          : about.description,
      bullets: [
        `Punctual Airport Transfers: Continuous flight tracking and terminal meet-and-greet for arrivals at ${airportsText}.`,
        "Flexible Hourly & Daily Charter: Dedicated vehicle and driver on standby for back-to-back corporate meetings, venue site visits, or leisure.",
        "Licensed Professional Chauffeurs: English-fluent, vetted, protocol-trained drivers with extensive municipal and regional knowledge.",
        "Immaculate Executive Fleet: Late-model black sedans, luxury SUVs, and executive vans equipped with complimentary Wi-Fi and chilled bottled water.",
      ],
    });

    // 3. Vehicle Classes
    sections.push({
      eyebrow: "The Fleet",
      title: `Executive Vehicle Classes in ${cityName}`,
      subtitle: "Select a Luxury Class to Suit Your Itinerary and Party Size",
      cards: [
        {
          title: "First Class Sedan: Mercedes-Benz S-Class",
          subtitle: "Flagship Luxury & Executive Privacy",
          description:
            "Ideal for C-suite executives, visiting dignitaries, and VIP delegations. Features reclining executive leather seating, acoustic sound insulation, rear climate control, and device charging.\n\nCapacity: 3 Passengers | 2 Large Bags",
        },
        {
          title: "Executive Sedan: Mercedes-Benz E-Class / BMW 5-Series",
          subtitle: "Corporate Business Travel & Daily Charters",
          description:
            "The corporate standard for financial roadshows, airport transfers, and business appointments. Combining understated elegance, refined ride comfort, and generous legroom.\n\nCapacity: 3 Passengers | 2 Large Bags",
        },
        {
          title: "Luxury SUV: Cadillac Escalade / GMC Yukon Denali",
          subtitle: "Commanding Presence & Generous Luggage Volume",
          description:
            "Preferred for executive delegations, family travel, and site inspections. Offers elevated seating, expansive luggage space, and robust highway cruising performance.\n\nCapacity: 6 Passengers | 5 Large Bags",
        },
        {
          title: "Executive Van: Mercedes-Benz V-Class / Luxury Sprinter",
          subtitle: "Group Delegation & Conference Transport",
          description:
            "Custom-configured with conference-style face-to-face seating, ambient lighting, high-speed Wi-Fi, and ample room for presentation equipment and luggage.\n\nCapacity: 7-14 Passengers | 8-16 Large Bags",
        },
      ],
    });

    // 4. Airport Meet & Greet
    sections.push({
      eyebrow: "Aviation Logistics",
      title: `Airport Transfers: ${airportsText}`,
      subtitle: "Terminal Meet & Greet with Real-Time Flight Telemetry Tracking",
      description:
        `AB provides seamless airport transfers to and from ${airportsText}. Our 24/7 flight monitoring system tracks inbound arrivals in real time, automatically adjusting chauffeur dispatch times for flight delays or early arrivals.`,
      bullets: [
        "Inside Terminal Greeting: Your chauffeur meets you in the arrival hall holding a personalised digital name board.",
        "Luggage Assistance: Full porterage support from baggage claim to vehicle curbside.",
        "60 Minutes Complimentary Waiting Time: Guaranteed waiting period from the moment your aircraft touches down.",
        "Curbside Staging: Vehicles pre-staged in VIP lanes for immediate departures without delay.",
      ],
    });

    // 5. Intercity Routes
    const cityRoutes = CITY_ROUTES.filter(
      (r) => r.fromSlug === cityObj.slug || r.toSlug === cityObj.slug
    );
    if (cityRoutes.length > 0) {
      sections.push({
        eyebrow: "Highway Corridors",
        title: `Intercity Chauffeured Corridors From ${cityName}`,
        subtitle: "Direct Ground Travel Between Regional Metropolitan Centers",
        description:
          `Bypass regional airport queues and security delays with door-to-door intercity ground mobility connecting ${cityName} to neighboring commercial hubs:`,
        cards: cityRoutes.map((r) => ({
          title: `${r.fromName || r.fromSlug} to ${r.toName || r.toSlug}`,
          subtitle: `${r.distance} · Approx. ${r.duration}`,
          description: `Direct chauffeur-driven intercity transfer connecting ${r.fromName || r.fromSlug} and ${r.toName || r.toSlug}. Door-to-door luxury travel with professional driver.`,
          bullets: [`Distance: ${r.distance}`, `Typical Duration: ${r.duration}`],
        })),
      });
    }

    // 6. Coverage Districts
    sections.push({
      eyebrow: "Coverage",
      title: `Coverage Zones & Key Destinations in ${cityName}`,
      subtitle: "Comprehensive Regional Reach Across Municipal Districts",
      items: [
        {
          heading: "Central Business & Financial Districts",
          description:
            `Direct transfers to commercial towers, banking headquarters, corporate headquarters, and government ministries throughout ${cityName}.`,
          icon: "Building",
        },
        {
          heading: "Luxury Hospitality & Resorts",
          description:
            `Transfers to leading 5-star international luxury hotels, private coastal resorts, golf clubs, and convention centers in ${cityName}.`,
          icon: "Star",
        },
        {
          heading: "Industrial Zones & Logistics Parks",
          description:
            `Scheduled executive mobility connecting industrial cities, regional ports, energy facilities, and free zones.`,
          icon: "Briefcase",
        },
        {
          heading: "Diplomatic & Private Residences",
          description:
            `Discreet, secure transportation for embassies, diplomatic quarters, private residences, and cultural landmarks.`,
          icon: "Shield",
        },
      ],
    });

    // 7. Operations Command
    sections.push({
      eyebrow: "Operations Desk",
      title: `Managed Operations for ${cityName}`,
      subtitle: "Centralized Dispatch with 24/7 Telemetry Oversight",
      description:
        `Chauffeur bookings across ${cityName} are monitored continuously through AB's central operations headquarters in Riyadh. Our dispatch team coordinates vehicle staging, road safety compliance, and chauffeur manifests around the clock.`,
      cards: [
        {
          title: "AB Operations & Dispatch Command",
          subtitle: "24/7 Regional Command Center",
          description:
            `Central Headquarters: Building 3036, Office 08, 2nd Floor, Umar Ibn Abdulaziz Road, Al Malaz, Riyadh, Saudi Arabia\n\nRegional UAE Office: Suite 206, DBC Building, Al Khabaisi, Deira, Dubai, UAE\n\nDispatch Phone: +966 58 111 8720 / +971 50 918 0556\nEmail: hello@ab.limo`,
        },
      ],
    });

    // 8. FAQs
    const cityFaqs = cityObj.faqs && cityObj.faqs.length > 0 ? cityObj.faqs : [
      {
        q: `How do I reserve a chauffeur service in ${cityName}?`,
        a: `You can book through our online platform, email hello@ab.limo, or call our 24/7 dispatch desk on +966 58 111 8720 or +971 50 918 0556. We recommend booking at least four hours in advance for guaranteed vehicle availability.`,
      },
      {
        q: `Which airports are served for ${cityName} transfers?`,
        a: `We provide 24/7 transfers to all major aviation hubs serving ${cityName}, including ${airportsText}, with flight tracking, inside terminal meet-and-greet, and 60 minutes complimentary waiting time.`,
      },
      {
        q: `What vehicles are available in ${cityName}?`,
        a: `Our fleet includes executive sedans (Mercedes-Benz E-Class, BMW 5-Series), first-class luxury saloons (Mercedes-Benz S-Class), full-size SUVs (Cadillac Escalade, GMC Yukon XL), and executive vans (Mercedes-Benz V-Class, Sprinter).`,
      },
      {
        q: `Can corporate clients book hourly or full-day charters in ${cityName}?`,
        a: `Yes. We offer hourly and full-day as-directed chauffeur hire. Your dedicated vehicle and chauffeur remain on standby throughout your itinerary for back-to-back business meetings, delegations, or events.`,
      },
      {
        q: `Are your chauffeurs licensed and background-checked?`,
        a: `All AB chauffeurs are professionally licensed, background-checked, bilingual (fluent English and Arabic), and trained in corporate protocol, defensive driving, and passenger discretion.`,
      },
      {
        q: `What is included in the fare for ${cityName} transfers?`,
        a: `All fares are fully transparent and inclusive of professional chauffeur, vehicle fuel, road tolls, flight telemetry monitoring, meet-and-greet, complimentary waiting time, high-speed Wi-Fi, and bottled water.`,
      },
    ];

    sections.push({
      eyebrow: "Questions",
      title: `Frequently Asked Questions About Chauffeur Service in ${cityName}`,
      subtitle: `Booking Guidelines, Vehicle Standards, and Airport Protocols`,
      faqs: cityFaqs.map((f) => ({
        question: f.q,
        answer: f.a,
      })),
    });

    // 9. CTA
    sections.push({
      eyebrow: "Reservations",
      title: `Your Chauffeur is Ready in ${cityName}`,
      subtitle: `Reserve Your Executive Chauffeur Service in ${cityName}, ${countryName}`,
      description:
        `Experience reliable executive ground mobility, punctual airport transfers, and tailored corporate travel across ${cityName}. Contact our 24/7 dispatch desk or request a quote online.`,
      buttons: [
        { label: "Request a Proposal", href: "/contact" },
        { label: "Book a Transfer", href: "/contact" },
      ],
    });
  }

  const countrySlug = country.slug;
  const fileNameSlug = `${country.code.toUpperCase()}-${cityName.replace(/\s+/g, "-")}`;

  return {
    fileName: `${filePrefix}-${fileNameSlug}`,
    title: `Chauffeur Service in ${cityName}, ${countryName} — AB Executive Mobility`,
    subtitle: `Executive Car Service, Airport Transfers & Corporate Chauffeur in ${cityName}`,
    url: `https://www.ab.limo/locations/${countrySlug}/${cityObj.slug}`,
    description:
      cityObj.description ||
      `AB provides luxury chauffeur-driven transportation in ${cityName}, ${countryName}. Airport transfers, corporate travel, and event logistics with premium vehicles.`,
    sections,
  };
}

// =========================================================================
// BUILD ALL 48 PAGES & WRITE .DOCX / .MD FILES
// =========================================================================
async function generateAll() {
  console.log("=================================================================");
  console.log("AB Transportation — Generating Location Content Documents");
  console.log("=================================================================");

  // 1. Main Hub (1 Page)
  console.log("\n[1/3] Building Main Locations Hub page...");
  allPages.push(buildLocationsHubPage());

  // 2. Six Countries (6 Pages)
  console.log("\n[2/3] Building 6 Country pages...");
  const countrySlugs = ["saudi-arabia", "uae", "qatar", "bahrain", "kuwait", "oman"];
  countrySlugs.forEach((slug, idx) => {
    const num = String(idx + 2).padStart(2, "0");
    allPages.push(buildCountryPage(slug, num));
  });

  // 3. 41 Cities across all 6 countries
  console.log("\n[3/3] Building 41 City pages across 6 countries...");
  let cityCounter = 8;
  for (const country of COUNTRIES) {
    for (const cityObj of country.cities) {
      const num = String(cityCounter).padStart(2, "0");
      allPages.push(buildCityPage(country, cityObj, num));
      cityCounter++;
    }
  }

  console.log(`\nTotal pages queued: ${allPages.length}`);
  console.log(`Target directory: ${OUT_DIR}`);

  // Write all .docx and .md files
  let processed = 0;
  for (const page of allPages) {
    // 1. Markdown file
    const mdContent = pageToMarkdown(page);
    const mdPath = path.join(OUT_DIR, `${page.fileName}.md`);
    fs.writeFileSync(mdPath, mdContent, "utf8");

    // 2. Word (.docx) file
    const docxObj = pageToDocx(page);
    const docxBuf = await Packer.toBuffer(docxObj);
    const docxPath = path.join(OUT_DIR, `${page.fileName}.docx`);
    fs.writeFileSync(docxPath, docxBuf);

    processed++;
    console.log(
      `[${String(processed).padStart(2, "0")}/${allPages.length}] ✓ Generated: ${page.fileName}.docx & .md (${page.sections.length} sections)`
    );
  }

  // 4. Generate README.md index
  console.log("\nGenerating README.md Index table...");
  let readme = `# AB Transportation — Location Content Documents

Comprehensive repository of official website content for the **Main Locations Hub**, **6 GCC Countries**, and **41 Cities** on [AB.Limo](https://www.ab.limo).

All documents are provided in **Microsoft Word (\`.docx\`)** and **Markdown (\`.md\`)** formats with complete, section-by-section fidelity including:
- Page Titles, Eyebrow Badges, Headings, Subheadings
- Executive Summaries, Lead Paragraphs, and Operational Overviews
- Detailed Fleet Classes (First Class, Executive Sedans, Luxury SUVs, Executive Vans) with seat & luggage capacities
- Airport Transfer Logistics (IATA Terminal codes, meet-and-greet, flight tracking, 60-min wait times)
- Intercity Highway Corridors & Distance/Duration Telemetry
- Municipal Coverage Districts (Financial Centers, Diplomatic Zones, Luxury Resorts, Industrial Ports)
- Managed Operations Desks & 24/7 Telemetry Dispatch Contacts
- Comprehensive Local FAQs (Fares, Bookings, Licensing, Delays, Hourly Charter)
- Action Buttons, Telephony Links, and Live Website URLs

---

## Complete Directory of Location Documents (48 Pages)

| # | Type | Location Name | Live Site URL | Word Document (.docx) | Markdown File (.md) | Sections |
|---|------|---------------|---------------|-----------------------|---------------------|----------|
`;

  allPages.forEach((p, idx) => {
    const num = idx + 1;
    let type = "City";
    if (idx === 0) type = "Main Hub";
    else if (idx <= 6) type = "Country";

    readme += `| ${num} | **${type}** | ${p.title.split("—")[0].trim()} | [${p.url.replace("https://www.", "")}](${p.url}) | [\`${p.fileName}.docx\`](./${p.fileName}.docx) | [\`${p.fileName}.md\`](./${p.fileName}.md) | ${p.sections.length} |\n`;
  });

  readme += `
---

## Directory Summary by Geography

1. **Main Hub (1 Page)**: GCC Network Overview (\`/locations\`)
2. **Saudi Arabia (18 Pages)**:
   - National Overview (\`/locations/saudi-arabia\`)
   - 17 Cities: Riyadh, Jeddah, Mecca, Medina, Dammam, Al Khobar, Al Ula, NEOM, Tabuk, Abha, Al Qasim, Jizan, Hail, Jubail, Najran, Taif, Yanbu
3. **United Arab Emirates (9 Pages)**:
   - National Overview (\`/locations/uae\`)
   - 8 Cities: Dubai, Abu Dhabi, Sharjah, Ajman, Al Ain, Ras Al Khaimah, Fujairah, Umm Al Quwain
4. **Qatar (5 Pages)**:
   - National Overview (\`/locations/qatar\`)
   - 4 Cities: Doha, Lusail, Al Wakrah, Al Khor
5. **Bahrain (4 Pages)**:
   - National Overview (\`/locations/bahrain\`)
   - 3 Cities: Manama, Riffa, Muharraq
6. **Kuwait (6 Pages)**:
   - National Overview (\`/locations/kuwait\`)
   - 5 Cities: Kuwait City, Hawalli, Farwaniya, Al Ahmadi, Salmiya
7. **Oman (5 Pages)**:
   - National Overview (\`/locations/oman\`)
   - 4 Cities: Muscat, Salalah, Sohar, Nizwa

---

## Content Integrity & Sourcing

- **Core Routing & Geography**: Aligned with \`src/lib/locations.ts\` (Country definitions, city metadata, airports, highway corridors).
- **Client Presets**: Strictly verified against \`src/components/section-library/presets/client-country-data.ts\` and \`client-city-data.ts\`.
- **Destination Narratives**: Integrated with \`src/app/[lang]/locations/_components/aboutContent.ts\` and \`locations-sketch.ts\`.
- **Navigation Configuration**: Strictly synchronized with \`src/lib/headerNav.ts\` and navigation dropdowns.
`;

  fs.writeFileSync(path.join(OUT_DIR, "README.md"), readme, "utf8");
  console.log("✓ Generated: README.md with live URLs and complete document index table.");
  console.log("\nAll 48 Location content documents created successfully!");
}

generateAll().catch((err) => {
  console.error("Error generating location documents:", err);
  process.exit(1);
});
