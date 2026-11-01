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
  partnerLinks?: Array<{ label: string; href: string }>;
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
  description: string;
  duration?: string;
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
  { id: "fujairah", name: "Fujairah", country: "ae", code: "FJR", lat: 25.1288, lon: 56.3265, href: "/locations/uae/fujairah", status: "Direct operations" },
  { id: "uaq", name: "Umm Al Quwain", country: "ae", code: "via SHJ", lat: 25.5647, lon: 55.5552, href: "/locations/uae/umm-al-quwain", status: "Direct operations" },
  { id: "doha", name: "Doha", country: "qa", code: "DOH", lat: 25.2854, lon: 51.5310, href: "/locations/qatar/doha", status: "Direct operations" },
  { id: "lusail", name: "Lusail", country: "qa", code: "via DOH", lat: 25.4180, lon: 51.4900, href: "/locations/qatar/lusail", status: "Direct operations" },
  { id: "wakrah", name: "Al Wakrah", country: "qa", code: "via DOH", lat: 25.1659, lon: 51.5976, href: "/locations/qatar/al-wakrah", status: "Direct operations" },
  { id: "khor", name: "Al Khor", country: "qa", code: "via DOH", lat: 25.6839, lon: 51.5058, href: "/locations/qatar/al-khor", status: "Direct operations" },
  { id: "manama", name: "Manama", country: "gcc", code: "Bahrain", lat: 26.2285, lon: 50.5860, href: "/locations/bahrain", status: "On request via partners" },
  { id: "kuwait", name: "Kuwait City", country: "gcc", code: "Kuwait", lat: 29.3759, lon: 47.9774, href: "/locations/kuwait", status: "On request via partners" },
  { id: "muscat", name: "Muscat", country: "gcc", code: "Oman", lat: 23.5880, lon: 58.3829, href: "/locations/oman", status: "On request via partners" },
];

export const SKETCH_COUNTRIES: SketchCountry[] = [
  {
    id: "sa",
    name: "Saudi Arabia",
    view: [44.5, 23.5, 2.2],
    title: "Saudi Arabia",
    dirLabel: "Saudi Arabia locations",
    dirHref: "/locations/saudi-arabia",
    intro: [
      "AB provides comprehensive chauffeur service Saudi Arabia solutions directly from our Riyadh headquarters. Our fleet handles airport arrivals, diplomatic motorcades, corporate events and intercity transfers between metropolitan hubs, holy cities and giga project developments. Direct operations serve Riyadh RUH, Jeddah JED, Makkah via JED, Madinah MED, Dammam DMM, Al Khobar via DMM, AlUla ULH, Tabuk TUU and NEOM NUM. Regional coverage serves Abha AHB, Al Qassim ELQ and Jizan GIZ.",
    ],
    bullets: [],
    outro: [],
  },
  {
    id: "ae",
    name: "United Arab Emirates",
    view: [55.4, 25.0, 4.5],
    title: "United Arab Emirates",
    dirLabel: "United Arab Emirates locations",
    dirHref: "/locations/uae",
    intro: [
      "Our premium chauffeur service UAE operations deliver managed transport across all seven emirates. Dual offices in Dubai and Abu Dhabi oversee luxury sedans and executive SUVs for business travel, diplomatic missions and international summits.",
    ],
    bullets: [
      "Dubai DXB and DWC with direct operations",
      "Abu Dhabi AUH and Al Ain with direct operations",
      "Sharjah, Ajman and Umm Al Quwain with direct operations",
      "Ras Al Khaimah and Fujairah with direct operations",
    ],
    outro: [],
  },
  {
    id: "qa",
    name: "Qatar",
    view: [51.3, 25.3, 5.5],
    title: "Qatar",
    dirLabel: "Qatar locations",
    dirHref: "/locations/qatar",
    intro: [
      "Operating from our central Doha premises, AB delivers dedicated chauffeur service Qatar options for commercial enterprises and visiting delegations. Our team coordinates executive transfers between aviation gates, financial headquarters, diplomatic quarters and modern sporting infrastructure. Direct operations support Doha DOH, Lusail, Al Wakrah and Al Khor with premium sedans and passenger vans.",
    ],
    bullets: [],
    outro: [],
  },
  {
    id: "gcc",
    name: "Other Gulf destinations",
    view: [52, 26, 1.7],
    title: "Other Gulf destinations",
    dirLabel: "Bahrain locations",
    dirHref: "/locations/bahrain",
    partnerLinks: [
      { label: "Bahrain locations", href: "/locations/bahrain" },
      { label: "Kuwait locations", href: "/locations/kuwait" },
      { label: "Oman locations", href: "/locations/oman" },
    ],
    intro: [
      "AB coordinates extended regional journeys into neighbouring Gulf Cooperation Council markets through fully vetted local transportation partners. Each partner meets our strict standards for vehicle condition, driver vetting, commercial insurance and operational safety.",
    ],
    bullets: [
      "Manama in Bahrain served on request via partners",
      "Kuwait City in Kuwait served on request via partners",
      "Muscat in Oman served on request via partners",
    ],
    outro: [
      "Access our partner directories for Bahrain locations, Kuwait locations and Oman locations to arrange regional transport.",
    ],
  },
];

export const SKETCH_OFFICES: SketchOffice[] = [
  {
    tag: "Headquarters and 24/7 dispatch",
    name: "Riyadh",
    text: "Our headquarters and central operations centre coordinates vehicle movements and dispatches professional chauffeurs throughout Saudi Arabia, the UAE and Qatar around the clock.",
    lines: [
      {
        hasLabel: false,
        label: "",
        address: "Building 3036, Office 08, 2nd Floor, Umar Ibn Abdulaziz Road, Al Malaz, Riyadh, Saudi Arabia",
        phone: "+966 58 111 8720",
      },
    ],
  },
  {
    tag: "United Arab Emirates",
    name: "Dubai and Abu Dhabi",
    text: "Our UAE offices manage executive fleets across all seven emirates, supporting corporate travel from Dubai commercial districts to Abu Dhabi government ministries.",
    lines: [
      {
        hasLabel: true,
        label: "Dubai",
        address: "Suite 206, DBC Building, Al Khabaisi, Deira, Dubai, UAE",
        phone: "+971 50 781 3880",
      },
      {
        hasLabel: true,
        label: "Abu Dhabi",
        address: "Office 03, Mezzanine Floor, Building C57, Abu Dhabi, UAE",
        phone: "+971 50 918 0556",
      },
    ],
  },
  {
    tag: "Qatar",
    name: "Doha",
    text: "Our Qatar office manages luxury car bookings, airport arrivals and corporate itineraries throughout central Doha, West Bay commercial towers and Lusail development zones.",
    lines: [
      {
        hasLabel: false,
        label: "",
        address: "Office 110, Building 100, Zone 26, Street 310, Old Airport Road, Doha, Qatar",
        phone: "+974 7734 3300",
      },
    ],
  },
];

export const SKETCH_AIRPORTS: SketchAirport[] = [
  { code: "RUH", name: "King Khalid International Airport (RUH)", scope: "Terminal meet and greet with protocol arrivals across all Riyadh terminals" },
  { code: "JED", name: "King Abdulaziz International Airport (JED)", scope: "Executive Jeddah transfers and direct onward road travel to Makkah" },
  { code: "MED", name: "Prince Mohammad bin Abdulaziz International Airport (MED)", scope: "Madinah passenger pickups with connecting regional transfers toward AlUla historical sites" },
  { code: "DMM", name: "King Fahd International Airport (DMM)", scope: "Commercial transfers connecting Dammam, Al Khobar, Dhahran corporate complexes and Jubail" },
  { code: "DXB", name: "Dubai International Airport (DXB)", scope: "Round the clock arrivals serving central Dubai districts and northern emirates" },
  { code: "DWC", name: "Al Maktoum International Airport (DWC)", scope: "Dubai South logistics corridors, private aviation movements and international event transfers" },
  { code: "AUH", name: "Zayed International Airport (AUH)", scope: "Scheduled transfers to Abu Dhabi Corniche, Yas Island venues and Al Ain" },
  { code: "DOH", name: "Hamad International Airport (DOH)", scope: "Meet and greet services connecting West Bay towers and Lusail commercial zones" },
];

export const SKETCH_ROUTES: SketchRoute[] = [
  {
    from: "Dubai",
    to: "Abu Dhabi",
    description: "Connecting downtown Dubai corporate towers directly to Abu Dhabi government ministries.",
    duration: "[Confirm]",
  },
  {
    from: "Riyadh",
    to: "Dammam",
    description: "Direct point to point highway transport linking the capital to Eastern Province commercial offices.",
    duration: "[Confirm]",
  },
  {
    from: "Jeddah",
    to: "Makkah",
    description: "Executive transfers connecting coastal commercial offices and port facilities with Makkah.",
    duration: "[Confirm]",
  },
  {
    from: "Makkah",
    to: "Madinah",
    description: "Comfortable intercity transit between the two holy cities for delegations and executive groups.",
    duration: "[Confirm]",
  },
  {
    from: "Doha",
    to: "Lusail",
    description: "Rapid metropolitan corridor linking central Doha financial institutions to Lusail Marina towers.",
    duration: "[Confirm]",
  },
  {
    from: "Dammam",
    to: "Al Khobar",
    description: "Short distance corporate transfers throughout the Eastern Province industrial and commercial triangle.",
    duration: "[Confirm]",
  },
  {
    from: "Abu Dhabi",
    to: "Al Ain",
    description: "Point to point transport from the federal capital to inland business centres in Al Ain.",
    duration: "[Confirm]",
  },
];

export const SKETCH_FAQS: SketchFaq[] = [
  {
    q: "Which countries are covered directly by AB chauffeur service locations GCC?",
    a: "AB operates direct ground transportation across Saudi Arabia, all seven emirates of the United Arab Emirates and Qatar. Our physical offices in Riyadh, Dubai, Abu Dhabi and Doha oversee daily fleet operations, airport arrivals and corporate itineraries. Travel in Bahrain, Kuwait and Oman is arranged on request through vetted regional partners.",
  },
  {
    q: "What vehicles are available across your Gulf operational zones?",
    a: "Our fleet comprises premium sedan, executive SUV and luxury passenger van models suitable for business travel and VIP transport. Typical selections include the Mercedes S Class for individual executives, Cadillac Escalade or GMC Yukon for delegation leaders, and Mercedes V Class vans for team transfers. Every car with driver booking meets strict age and maintenance criteria.",
  },
  {
    q: "How does AB coordinate airport transfers Gulf flight tracking and arrivals?",
    a: "Our operations controllers track inbound commercial flights and private aviation manifests in real time. Chauffeurs adjust kerbside staging according to actual landing times rather than original timetables. Travellers receive a meet and greet service inside the arrivals terminal with signage, luggage assistance and escort to the waiting executive vehicle.",
  },
  {
    q: "Can clients book hourly chauffeur and full day hire for conferences?",
    a: "AB provides flexible hourly chauffeur hire and full day hire options for corporate meetings, diplomatic summits and multi venue events. Vehicles remain dedicated to your party on standby throughout the schedule. Central dispatch coordinates driver shifts and route adjustments to support changing delegation itineraries without interruption.",
  },
  {
    q: "Does AB manage cross border itineraries between GCC countries?",
    a: "AB coordinates cross border transportation between neighbouring Gulf states where regulatory frameworks permit direct transit. Where cross border vehicle transfers face customs restrictions, our team arranges synchronized vehicle transfers at border crossings to maintain itinerary continuity. Bookings must be requested in advance to complete documentation.",
  },
  {
    q: "Are all chauffeurs and vehicles fully licensed and insured?",
    a: "Every vehicle in our direct and partner fleet is fully licensed by relevant municipal transport authorities and carries comprehensive commercial passenger insurance. Professional chauffeurs complete defensive driver training, protocol briefing and criminal background clearances. Operational safety and passenger confidentiality govern every transfer we dispatch.",
  },
  {
    q: "How are bookings handled across multiple Gulf cities?",
    a: "Organisations coordinate all Gulf bookings through a single account manager and central dispatch contact in Riyadh. Itineraries across multiple cities appear on consolidated invoices under agreed corporate rates, eliminating the complexity of managing distinct local suppliers. Reservations can be placed for one city or coordinated regional tours.",
  },
];
