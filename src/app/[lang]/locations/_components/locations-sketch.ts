export interface SketchCity {
  id: string;
  name: string;
  country: "sa" | "ae" | "qa" | "gcc";
  code: string;
  lat: number;
  lon: number;
  href: string;
  status: "Direct operations" | "Regional coverage" | "On request via partners";
}

export interface SketchCountry {
  id: "sa" | "ae" | "qa" | "gcc";
  name: string;
  view: [number, number, number]; // [lon, lat, zoom]
  title: string;
  dirLabel: string;
  dirHref: string;
  intro: string[];
  bullets: string[];
  outro: string[];
}

export interface OfficeLine {
  hasLabel: boolean;
  label: string;
  address: string;
  phone: string;
}

export interface SketchOffice {
  tag: string;
  name: string;
  text: string;
  lines: OfficeLine[];
}

export interface SketchAirport {
  code: string;
  name: string;
  scope: string;
}

export interface SketchRoute {
  from: string;
  to: string;
}

export interface SketchFaq {
  q: string;
  a: string;
}

export interface TextSegment {
  t: string;
  ph: boolean;
  txt: boolean;
}

export function seg(text: string): TextSegment[] {
  const out: TextSegment[] = [];
  text.split(/(\[[^\]]+\])/).forEach((t) => {
    if (t) {
      const isPh = /^\[.*\]$/.test(t);
      out.push({ t, ph: isPh, txt: !isPh });
    }
  });
  return out;
}

export const SKETCH_CITIES: SketchCity[] = [
  { id: "riyadh", name: "Riyadh", country: "sa", code: "RUH", lat: 24.7136, lon: 46.6753, href: "/locations/saudi-arabia/riyadh", status: "Direct operations" },
  { id: "jeddah", name: "Jeddah", country: "sa", code: "JED", lat: 21.5433, lon: 39.1728, href: "/locations/saudi-arabia/jeddah", status: "Direct operations" },
  { id: "makkah", name: "Makkah", country: "sa", code: "via JED", lat: 21.3891, lon: 39.8579, href: "/locations/saudi-arabia/mecca", status: "Direct operations" },
  { id: "madinah", name: "Madinah", country: "sa", code: "MED", lat: 24.5247, lon: 39.5692, href: "/locations/saudi-arabia/medina", status: "Direct operations" },
  { id: "dammam", name: "Dammam", country: "sa", code: "DMM", lat: 26.4207, lon: 50.0888, href: "/locations/saudi-arabia/dammam", status: "Direct operations" },
  { id: "khobar", name: "Al Khobar", country: "sa", code: "via DMM", lat: 26.2172, lon: 50.1971, href: "/locations/saudi-arabia/al-khobar", status: "Direct operations" },
  { id: "alula", name: "AlUla", country: "sa", code: "ULH", lat: 26.6084, lon: 37.9232, href: "/locations/saudi-arabia/al-ula", status: "Direct operations" },
  { id: "tabuk", name: "Tabuk", country: "sa", code: "TUU", lat: 28.3835, lon: 36.5662, href: "/locations/saudi-arabia/tabuk", status: "Direct operations" },
  { id: "neom", name: "NEOM", country: "sa", code: "NUM", lat: 27.95, lon: 35.30, href: "/locations/saudi-arabia/neom", status: "Direct operations" },
  { id: "abha", name: "Abha", country: "sa", code: "AHB", lat: 18.2164, lon: 42.5053, href: "/locations/saudi-arabia/abha", status: "Regional coverage" },
  { id: "qassim", name: "Al Qassim", country: "sa", code: "ELQ", lat: 26.3260, lon: 43.9750, href: "/locations/saudi-arabia/al-qasim", status: "Regional coverage" },
  { id: "jizan", name: "Jizan", country: "sa", code: "GIZ", lat: 16.8892, lon: 42.5511, href: "/locations/saudi-arabia/jizan", status: "Regional coverage" },
  { id: "dubai", name: "Dubai", country: "ae", code: "DXB · DWC", lat: 25.2048, lon: 55.2708, href: "/locations/uae/dubai", status: "Direct operations" },
  { id: "abudhabi", name: "Abu Dhabi", country: "ae", code: "AUH", lat: 24.4539, lon: 54.3773, href: "/locations/uae/abu-dhabi", status: "Direct operations" },
  { id: "sharjah", name: "Sharjah", country: "ae", code: "SHJ", lat: 25.3463, lon: 55.4209, href: "/locations/uae/sharjah", status: "Direct operations" },
  { id: "ajman", name: "Ajman", country: "ae", code: "via SHJ", lat: 25.4052, lon: 55.5136, href: "/locations/uae/ajman", status: "Direct operations" },
  { id: "alain", name: "Al Ain", country: "ae", code: "AAN", lat: 24.2075, lon: 55.7447, href: "/locations/uae/al-ain", status: "Direct operations" },
  { id: "rak", name: "Ras Al Khaimah", country: "ae", code: "RKT", lat: 25.8007, lon: 55.9762, href: "/locations/uae/ras-al-khaimah", status: "Direct operations" },
  { id: "fujairah", name: "Fujairah", country: "ae", code: "FJR", lat: 25.1288, lon: 56.3265, href: "/locations/uae", status: "Direct operations" },
  { id: "uaq", name: "Umm Al Quwain", country: "ae", code: "via SHJ", lat: 25.5647, lon: 55.5552, href: "/locations/uae", status: "Direct operations" },
  { id: "doha", name: "Doha", country: "qa", code: "DOH", lat: 25.2854, lon: 51.5310, href: "/locations/qatar/doha", status: "Direct operations" },
  { id: "lusail", name: "Lusail", country: "qa", code: "via DOH", lat: 25.4180, lon: 51.4900, href: "/locations/qatar/lusail", status: "Direct operations" },
  { id: "wakrah", name: "Al Wakrah", country: "qa", code: "via DOH", lat: 25.1659, lon: 51.5976, href: "/locations/qatar/al-wakrah", status: "Direct operations" },
  { id: "khor", name: "Al Khor", country: "qa", code: "via DOH", lat: 25.6839, lon: 51.5058, href: "/locations/qatar/al-khor", status: "Direct operations" },
  { id: "manama", name: "Manama", country: "gcc", code: "Bahrain", lat: 26.2285, lon: 50.5860, href: "/locations/bahrain", status: "On request via partners" },
  { id: "kuwait", name: "Kuwait City", country: "gcc", code: "Kuwait", lat: 29.3759, lon: 47.9774, href: "/locations/kuwait", status: "On request via partners" },
  { id: "muscat", name: "Muscat", country: "gcc", code: "Oman", lat: 23.5880, lon: 58.3829, href: "/locations/oman", status: "On request via partners" }
];

export const SKETCH_COUNTRIES: SketchCountry[] = [
  {
    id: "sa",
    name: "Saudi Arabia",
    view: [44.5, 23.5, 2.2],
    title: "Chauffeur service across Saudi Arabia",
    dirLabel: "Saudi Arabia locations",
    dirHref: "/locations/saudi-arabia",
    intro: [
      "AB runs chauffeur and ground transportation across the Kingdom from our Riyadh headquarters, covering business capitals, the holy cities and the giga project regions. Local fleet controllers handle airport arrivals, protocol movements and long distance road trips between cities.",
      "Book single transfers, daily chauffeur hire or multi vehicle convoys for delegations and conferences in any city below."
    ],
    bullets: [],
    outro: []
  },
  {
    id: "ae",
    name: "United Arab Emirates",
    view: [55.4, 25.0, 4.5],
    title: "Coverage across all seven emirates",
    dirLabel: "UAE locations",
    dirHref: "/locations/uae",
    intro: [
      "AB serves all seven emirates directly from our offices in Dubai and Abu Dhabi. Our UAE teams cover:"
    ],
    bullets: [
      "Dubai and Abu Dhabi business districts, government offices and event venues",
      "Sharjah and Ajman for corporate, education and industrial travel",
      "Al Ain for government and family travel from Abu Dhabi",
      "Ras Al Khaimah, Fujairah and Umm Al Quwain for resorts, ports and coastal trips"
    ],
    outro: [
      "Local coordinators manage corporate transfers, summits and hotel movements across the country."
    ]
  },
  {
    id: "qa",
    name: "Qatar",
    view: [51.3, 25.3, 5.5],
    title: "Chauffeur service across Qatar",
    dirLabel: "Qatar locations",
    dirHref: "/locations/qatar",
    intro: [
      "Our Doha office serves corporate travellers, conference delegates and visiting officials across Qatar. Teams cover the business districts of West Bay and Msheireb, the new city of Lusail, and Al Wakrah and Al Khor, all served from Doha.",
      "On site dispatchers manage vehicles for high profile events, ministerial meetings and private executive transfers."
    ],
    bullets: [],
    outro: []
  },
  {
    id: "gcc",
    name: "Other Gulf destinations",
    view: [52, 26, 1.7],
    title: "Bahrain, Kuwait and Oman on request",
    dirLabel: "Request partner coverage",
    dirHref: "/contact",
    intro: [
      "Beyond our own offices, AB arranges ground transportation in neighbouring Gulf countries through vetted partners, planned and supervised from Riyadh. Partner trips need advance notice and a confirmed scope."
    ],
    bullets: [
      "Bahrain: Manama, its business districts and the King Fahd Causeway to Saudi Arabia",
      "Kuwait: Kuwait City and government complexes",
      "Oman: Muscat and the main business centres"
    ],
    outro: [
      "Every partner vehicle and chauffeur is checked against AB standards for safety, vehicle age and vetting before the trip."
    ]
  }
];

export const SKETCH_OFFICES: SketchOffice[] = [
  {
    tag: "Headquarters · 24/7 dispatch",
    name: "Riyadh",
    text: "Our headquarters and operations centre, dispatching and tracking every vehicle across Saudi Arabia, the UAE and Qatar.",
    lines: [
      {
        hasLabel: false,
        label: "",
        address: "Building 3036, Office 08, 2nd Floor, Umar Ibn Abdulaziz Road, Al Malaz, Riyadh, Saudi Arabia",
        phone: "+966 58 111 8720"
      }
    ]
  },
  {
    tag: "United Arab Emirates",
    name: "Dubai and Abu Dhabi",
    text: "Our UAE offices cover all seven emirates, from Dubai’s business districts to the federal ministries in Abu Dhabi.",
    lines: [
      {
        hasLabel: true,
        label: "Dubai",
        address: "Suite 206, DBC Building, Al Khabaisi, Deira, Dubai, UAE",
        phone: "+971 50 781 3880"
      },
      {
        hasLabel: true,
        label: "Abu Dhabi",
        address: "Office 03, Mezzanine Floor, Building C57, Abu Dhabi, UAE [Confirm: area or street]",
        phone: "+971 50 918 0556"
      }
    ]
  },
  {
    tag: "Qatar",
    name: "Doha",
    text: "Our Qatar office serves Doha’s business districts, Lusail and visiting delegations across the country.",
    lines: [
      {
        hasLabel: false,
        label: "",
        address: "Office 110, Building 100, Zone 26, Street 310, Old Airport Road, Doha, Qatar",
        phone: "+974 7734 3300"
      }
    ]
  }
];

export const SKETCH_AIRPORTS: SketchAirport[] = [
  { code: "RUH", name: "King Khalid International Airport (RUH)", scope: "Terminal meet and greet and protocol arrivals in Riyadh" },
  { code: "JED", name: "King Abdulaziz International Airport (JED)", scope: "Jeddah transfers and onward trips to Makkah and Madinah" },
  { code: "MED", name: "Prince Mohammad bin Abdulaziz International Airport (MED)", scope: "Arrivals for Madinah visitors, Umrah groups and onward trips to AlUla" },
  { code: "DMM", name: "King Fahd International Airport (DMM)", scope: "Transfers to Dammam, Al Khobar, Dhahran and Jubail" },
  { code: "DXB", name: "Dubai International Airport (DXB)", scope: "Round the clock arrivals to central Dubai and the northern emirates" },
  { code: "DWC", name: "Al Maktoum International Airport (DWC)", scope: "Dubai South, air show and event transfers" },
  { code: "AUH", name: "Zayed International Airport (AUH)", scope: "Transfers to downtown Abu Dhabi, Yas Island and Al Ain" },
  { code: "DOH", name: "Hamad International Airport (DOH)", scope: "Meet and greet to West Bay, Lusail and across Qatar" }
];

export const SKETCH_ROUTES: SketchRoute[] = [
  { from: "Dubai", to: "Abu Dhabi" },
  { from: "Riyadh", to: "Dammam" },
  { from: "Jeddah", to: "Makkah" },
  { from: "Makkah", to: "Madinah" },
  { from: "Doha", to: "Lusail" },
  { from: "Dammam", to: "Al Khobar" },
  { from: "Abu Dhabi", to: "Al Ain" }
];

export const SKETCH_FAQS: SketchFaq[] = [
  {
    q: "Which countries does AB serve directly?",
    a: "AB runs chauffeur and ground transportation directly across Saudi Arabia, all seven emirates of the UAE and Qatar, with offices in Riyadh, Dubai, Abu Dhabi and Doha."
  },
  {
    q: "Do you cover Bahrain, Kuwait and Oman?",
    a: "Yes, on request. We arrange trips in Bahrain, Kuwait and Oman through vetted partners who meet AB standards, planned and supervised from Riyadh. Please give advance notice."
  },
  {
    q: "Where is AB’s dispatch centre?",
    a: "Our 24/7 operations centre is at our Riyadh headquarters in Al Malaz. It dispatches and tracks every vehicle, working with local teams in Dubai, Abu Dhabi and Doha."
  },
  {
    q: "Which airports do you serve?",
    a: "We run airport transfers at King Khalid International Airport (RUH), King Abdulaziz International Airport (JED), Prince Mohammad bin Abdulaziz International Airport (MED), King Fahd International Airport (DMM), Dubai International Airport (DXB), Al Maktoum International Airport (DWC), Zayed International Airport (AUH) and Hamad International Airport (DOH)."
  },
  {
    q: "Can you plan transport across several countries in one programme?",
    a: "Yes. One planner can handle a roadshow or delegation across Saudi Arabia, the UAE and Qatar under a single proposal and invoice."
  },
  {
    q: "How do I request a proposal?",
    a: "Use Request a proposal and share your dates, cities, passenger numbers and service level. An operations planner will reply within [Confirm: response time]."
  }
];
