import { localeBase } from "@/app/[lang]/dictionaries";

export interface Airport {
  slug: string;
  name: string;
  nameAr?: string;
  iata: string;
  description?: string;
  descriptionAr?: string;
  aliases?: string[];
  type?: string;
  status?: string; // draft | published | archived
  citySlug?: string;
  _id?: string;
}

export interface LocationFaq {
  q: string;
  a: string;
}

export interface City {
  slug: string;
  name: string;
  nameAr?: string;
  airports: Airport[];
  description?: string;
  descriptionAr?: string;
  aliases?: string[];
  status?: string; // draft | published | archived
  countrySlug?: string;
  faqs?: LocationFaq[];
  faqsAr?: LocationFaq[];
  sections?: import("@/lib/validations/location").TextImageSectionType[];
  _id?: string;
}

export interface Country {
  code: string;
  slug: string;
  name: string;
  nameAr?: string;
  cities: City[];
  description?: string;
  descriptionAr?: string;
  status?: string; // draft | published | archived
  faqs?: LocationFaq[];
  faqsAr?: LocationFaq[];
  _id?: string;
}

const airport = (slug: string, name: string, iata: string, nameAr = ""): Airport => ({
  slug,
  name,
  iata,
  nameAr,
});
const city = (
  slug: string,
  name: string,
  airports: Airport[] = [],
  nameAr = "",
  description = "",
  aliases: string[] = [],
  faqs: LocationFaq[] = []
): City => ({
  slug,
  name,
  airports,
  nameAr,
  description,
  aliases,
  ...(faqs.length > 0 ? { faqs } : {}),
});

export const COUNTRIES: Country[] = [
  {
    code: "ae",
    slug: "uae",
    name: "UAE",
    nameAr: "الإمارات العربية المتحدة",
    cities: [
      city("dubai", "Dubai", [
        airport("dubai-international-airport", "Dubai International Airport", "DXB", "مطار دبي الدولي"),
        airport("al-maktoum-international-airport", "Al Maktoum International Airport", "DWC", "مطار آل مكتوم الدولي"),
      ], "دبي"),
      city("abu-dhabi", "Abu Dhabi", [
        airport("zayed-international-airport", "Zayed International Airport", "AUH", "مطار زايد الدولي"),
      ], "أبوظبي"),
      city("sharjah", "Sharjah", [
        airport("sharjah-international-airport", "Sharjah International Airport", "SHJ", "مطار الشارقة الدولي"),
      ], "الشارقة"),
      city(
        "ajman",
        "Ajman",
        [],
        "عجمان",
        "The coastal gem of the northern emirates, connecting peaceful seaside tranquility with swift, seamless executive travel into Dubai, Sharjah, and beyond.",
        [],
        [
          {
            q: "How do I book a chauffeur service in Ajman?",
            a: "You can book through our online platform, email hello@ab.limo, or call our 24/7 dispatch desk on +971 50 918 0556. We recommend booking at least four hours in advance.",
          },
          {
            q: "Which airports do you serve from Ajman?",
            a: "We provide round-the-clock private transfers to Sharjah International Airport (SHJ, 25-35 mins), Dubai International Airport (DXB, 30-45 mins), Al Maktoum International (DWC, 65-80 mins), and Zayed International (AUH, 100-120 mins).",
          },
          {
            q: "Are your chauffeurs English-speaking and professionally licensed?",
            a: "Yes. Every AB chauffeur is professionally licensed, English-fluent, background-checked, and trained to international corporate hospitality standards.",
          },
          {
            q: "Can I book a vehicle on an hourly or daily as-directed basis?",
            a: "Yes. Our hourly and daily charter services provide complete schedule flexibility for business meetings, diplomatic agendas, shopping trips, or leisure itineraries.",
          },
          {
            q: "What is included in the fare?",
            a: "All fares are all-inclusive: vehicle, fuel, professional chauffeur, complimentary flight tracking, meet-and-greet service, 60 minutes of complimentary airport waiting time, bottled water, high-speed Wi-Fi, and all road tolls (Salik).",
          },
        ]
      ),
      city(
        "ras-al-khaimah",
        "Ras Al Khaimah",
        [
          airport("ras-al-khaimah-international-airport", "Ras Al Khaimah International Airport", "RKT", "مطار رأس الخيمة الدولي"),
        ],
        "رأس الخيمة",
        "The northernmost emirate known for its dramatic mountain sceneries, luxury beachfront resorts, and expanding commercial free zones.",
        ["rak"],
        [
          {
            q: "How do I book a chauffeur service in Ras Al Khaimah?",
            a: "You can book through our online platform, email hello@ab.limo, or call our 24/7 dispatch desk on +971 50 918 0556. We recommend booking at least four hours in advance.",
          },
          {
            q: "Which airports do you serve from Ras Al Khaimah?",
            a: "We provide round-the-clock private transfers to Ras Al Khaimah International Airport (RKT), Sharjah International Airport (SHJ), and Dubai International Airport (DXB).",
          },
          {
            q: "Are your chauffeurs English-speaking and professionally licensed?",
            a: "Yes. Every AB chauffeur is professionally licensed, English-fluent, background-checked, and trained to international corporate hospitality standards.",
          },
          {
            q: "Can I book a vehicle on an hourly or daily as-directed basis?",
            a: "Yes. Our hourly and daily charter services provide complete schedule flexibility for business meetings, diplomatic agendas, resort excursions, or leisure itineraries.",
          },
          {
            q: "What is included in the fare?",
            a: "All fares are all-inclusive: vehicle, fuel, professional chauffeur, complimentary flight tracking, meet-and-greet service, 60 minutes of complimentary airport waiting time, bottled water, high-speed Wi-Fi, and all road tolls.",
          },
        ]
      ),
      city(
        "al-ain",
        "Al Ain",
        [],
        "العين",
        "The Garden City of the UAE, rich in cultural heritage, palm oases, and university institutions, with executive connections across Abu Dhabi and Dubai.",
        [],
        [
          {
            q: "How do I book a chauffeur service in Al Ain?",
            a: "You can book through our online platform, email hello@ab.limo, or call our 24/7 dispatch desk on +971 50 918 0556. We recommend booking at least four hours in advance.",
          },
          {
            q: "Which airports do you serve from Al Ain?",
            a: "We provide round-the-clock private transfers to Zayed International Airport (AUH, Abu Dhabi), Dubai International Airport (DXB), and Sharjah International (SHJ).",
          },
          {
            q: "Are your chauffeurs English-speaking and professionally licensed?",
            a: "Yes. Every AB chauffeur is professionally licensed, English-fluent, background-checked, and trained to international corporate hospitality standards.",
          },
          {
            q: "Can I book a vehicle on an hourly or daily as-directed basis?",
            a: "Yes. Our hourly and daily charter services provide complete schedule flexibility for business meetings, academic conferences, family visits, or leisure itineraries.",
          },
          {
            q: "What is included in the fare?",
            a: "All fares are all-inclusive: vehicle, fuel, professional chauffeur, complimentary flight tracking, meet-and-greet service, 60 minutes of complimentary airport waiting time, bottled water, high-speed Wi-Fi, and all road tolls.",
          },
        ]
      ),
      city(
        "fujairah",
        "Fujairah",
        [
          airport("fujairah-international-airport", "Fujairah International Airport", "FJR", "مطار الفجيرة الدولي"),
        ],
        "الفجيرة",
        "The only emirate situated on the UAE's eastern Gulf of Oman coast, renowned for rugged mountains, historical forts, and deep-water bunkering ports."
      ),
      city(
        "umm-al-quwain",
        "Umm Al Quwain",
        [],
        "أم القيوين",
        "A tranquil coastal emirate known for its serene mangrove lagoons, rich maritime heritage, and peaceful escape from bustling metropolises.",
        ["uaq", "umm-al-qaiwain"]
      ),
    ],
  },
  {
    code: "sa",
    slug: "saudi-arabia",
    name: "Saudi Arabia",
    nameAr: "المملكة العربية السعودية",
    description:
      "Direct chauffeur and fleet operations across 12 Saudi cities, managed from our Riyadh headquarters in Olaya with licensed drivers, vetted vehicles, and unified SLAs from NEOM to Jizan.",
    cities: [
      city(
        "riyadh",
        "Riyadh",
        [
          airport("king-khalid-international-airport", "King Khalid International Airport", "RUH", "مطار الملك خالد الدولي"),
        ],
        "الرياض",
        "Capital city & AB regional headquarters — KAFD, Diplomatic Quarter, Olaya, Diriyah, and King Khalid International Airport (RUH)."
      ),
      city(
        "jeddah",
        "Jeddah",
        [
          airport("king-abdulaziz-international-airport", "King Abdulaziz International Airport", "JED", "مطار الملك عبدالعزيز الدولي"),
        ],
        "جدة",
        "Red Sea commercial hub & Umrah gateway — Corniche, Al-Balad, KAEC, and King Abdulaziz International Airport (JED)."
      ),
      city(
        "mecca",
        "Mecca",
        [],
        "مكة المكرمة",
        "Holy city mobility — VIP Umrah & Hajj ground transport, Haram hotel transfers, and Jeddah/Medina intercity corridors.",
        ["makkah"]
      ),
      city(
        "medina",
        "Medina",
        [
          airport("prince-mohammad-bin-abdulaziz-international-airport", "Prince Mohammad bin Abdulaziz International Airport", "MED", "مطار الأمير محمد بن عبدالعزيز الدولي"),
        ],
        "المدينة المنورة",
        "Prince Mohammad bin Abdulaziz International Airport (MED), Central Haram area, Knowledge Economic City, and Mecca/Al Ula corridors.",
        ["madinah"]
      ),
      city(
        "dammam",
        "Dammam",
        [
          airport("king-fahd-international-airport", "King Fahd International Airport", "DMM", "مطار الملك فهد الدولي"),
        ],
        "الدمام",
        "Eastern Province administrative & industrial capital — King Fahd International Airport (DMM), King Abdulaziz Port, and Dhahran/Jubail corridors."
      ),
      city(
        "tabuk",
        "Tabuk",
        [
          airport("prince-sultan-bin-abdulaziz-airport", "Prince Sultan bin Abdulaziz Airport", "TUU", "مطار الأمير سلطان بن عبدالعزيز"),
        ],
        "تبوك",
        "Northwestern regional capital — Prince Sultan bin Abdulaziz Airport (TUU) and highway gateway to NEOM, Trojena, and Red Sea projects."
      ),
      city(
        "al-ula",
        "Al Ula",
        [
          airport("prince-abdulmajeed-bin-abdulaziz-international-airport", "Prince Abdulmajeed bin Abdulaziz International Airport", "ULH", "مطار الأمير عبدالمجيد بن عبدالعزيز الدولي"),
        ],
        "العلا",
        "UNESCO heritage & luxury cultural destination — Hegra, Maraya, Ashar Valley resorts, and Prince Abdulmajeed bin Abdulaziz Airport (ULH).",
        ["alula"]
      ),
      city(
        "al-khobar",
        "Al Khobar",
        [],
        "الخبر",
        "Eastern Province commercial waterfront, Dhahran Techno Valley, King Fahd Causeway to Bahrain, and DMM airport transfers."
      ),
      city(
        "al-qasim",
        "Al Qasim",
        [
          airport("prince-naif-bin-abdulaziz-international-airport", "Prince Naif bin Abdulaziz International Airport", "ELQ", "مطار الأمير نايف بن عبدالعزيز الدولي"),
        ],
        "القصيم",
        "Central region commercial & agricultural hub — Buraidah, Unaizah, and Prince Naif bin Abdulaziz International Airport (ELQ)."
      ),
      city(
        "abha",
        "Abha",
        [
          airport("abha-international-airport", "Abha International Airport", "AHB", "مطار أبها الدولي"),
        ],
        "أبها",
        "Aseer regional capital & highland tourism hub — Abha International Airport (AHB), Soudah Peaks, Rijal Almaa, and Khamis Mushait."
      ),
      city(
        "jizan",
        "Jizan",
        [
          airport("king-abdullah-bin-abdulaziz-airport", "King Abdullah bin Abdulaziz Airport", "GIZ", "مطار الملك عبدالله بن عبدالعزيز"),
        ],
        "جازان",
        "Southwestern Red Sea port & industrial hub — King Abdullah bin Abdulaziz Airport (GIZ), JCPDI (Baish), and Farasan gateway."
      ),
      city(
        "neom",
        "NEOM",
        [
          airport("neom-bay-airport", "NEOM Bay Airport", "NUM", "مطار خليج نيوم"),
        ],
        "نيوم",
        "Northwest giga-project corridor — NEOM Bay Airport (NUM), Sharma, Oxagon, Trojena, Sindalah gateway, and Tabuk links."
      ),
      city(
        "hail",
        "Hail",
        [
          airport("hail-international-airport", "Hail International Airport", "HAS", "مطار حائل الدولي"),
        ],
        "حائل",
        "Historic capital of northern Saudi Arabia, celebrated for UNESCO World Heritage rock art, desert landscapes, and legendary Arabian hospitality."
      ),
      city(
        "jubail",
        "Jubail",
        [
          airport("jubail-airport", "Jubail Airport", "QJB", "مطار الجبيل"),
        ],
        "الجبيل",
        "Home to the world's largest petrochemical industrial complex and modern coastal business districts along the Arabian Gulf.",
        ["jubial"]
      ),
      city(
        "najran",
        "Najran",
        [
          airport("najran-airport", "Najran Airport", "EAM", "مطار نجران"),
        ],
        "نجران",
        "An ancient trade oasis and cultural jewel near Saudi Arabia's southern border, renowned for Al-Ukhdood ruins and traditional mudbrick palaces."
      ),
      city(
        "taif",
        "Taif",
        [
          airport("taif-regional-airport", "Taif Regional Airport", "TIF", "مطار الطائف الإقليمي"),
        ],
        "الطائف",
        "The scenic summer retreat of Saudi Arabia perched on the Sarawat Mountains, famous for fragrant rose gardens, Shubra Palace, and cool mountain air."
      ),
      city(
        "yanbu",
        "Yanbu",
        [
          airport("yanbu-airport", "Prince Abdul Mohsin Bin Abdulaziz International Airport", "YNB", "مطار الأمير عبد المحسن بن عبد العزيز"),
        ],
        "ينبع",
        "A major Red Sea industrial port and historic maritime city, celebrated for pristine coral reefs, Yanbu Industrial City, and preserved heritage quarters."
      ),
    ],
  },
  {
    code: "qa",
    slug: "qatar",
    name: "Qatar",
    nameAr: "قطر",
    cities: [
      city(
        "doha",
        "Doha",
        [
          airport("hamad-international-airport", "Hamad International Airport", "DOH", "مطار حمد الدولي"),
        ],
        "الدوحة",
        "Qatar's dynamic capital and global financial centre, home to world-class museums, luxury towers in West Bay, and Hamad International Airport.",
        [],
        [
          {
            q: "How do I book a chauffeur service in Doha?",
            a: "You can book through our online platform, email hello@ab.limo, or call our 24/7 dispatch desk on +971 50 918 0556. We recommend booking at least four hours in advance.",
          },
          {
            q: "Which airports do you serve from Doha?",
            a: "We provide round-the-clock private transfers to Hamad International Airport (DOH) and Doha International Airport (DIA) with meet-and-greet service.",
          },
          {
            q: "Are your chauffeurs English-speaking and professionally licensed?",
            a: "Yes. Every AB chauffeur is professionally licensed, English-fluent, background-checked, and trained to international corporate hospitality standards.",
          },
          {
            q: "Can I book a vehicle on an hourly or daily as-directed basis?",
            a: "Yes. Our hourly and daily charter services provide complete schedule flexibility for business meetings, government summits, shopping excursions, or private itineraries.",
          },
          {
            q: "What is included in the fare?",
            a: "All fares are all-inclusive: vehicle, fuel, professional chauffeur, complimentary flight tracking, meet-and-greet service, 60 minutes of complimentary airport waiting time, bottled water, and high-speed Wi-Fi.",
          },
        ]
      ),
      city(
        "al-khor",
        "Al Khor",
        [],
        "الخور",
        "A historic coastal city north of Doha, known for its tranquil harbour, mangrove reserves at Purple Island, and proximity to Ras Laffan industrial city.",
        [],
        [
          {
            q: "How do I book a chauffeur service in Al Khor?",
            a: "You can book through our online platform, email hello@ab.limo, or call our 24/7 dispatch desk on +971 50 918 0556. We recommend booking at least four hours in advance.",
          },
          {
            q: "Which airports do you serve from Al Khor?",
            a: "We provide round-the-clock private transfers to Hamad International Airport (DOH) with professional flight tracking and meet-and-greet service.",
          },
          {
            q: "Are your chauffeurs English-speaking and professionally licensed?",
            a: "Yes. Every AB chauffeur is professionally licensed, English-fluent, background-checked, and trained to international corporate hospitality standards.",
          },
          {
            q: "Can I book a vehicle on an hourly or daily as-directed basis?",
            a: "Yes. Our hourly and daily charter services provide complete schedule flexibility for energy sector visits, corporate commutes, or leisure itineraries.",
          },
          {
            q: "What is included in the fare?",
            a: "All fares are all-inclusive: vehicle, fuel, professional chauffeur, complimentary flight tracking, meet-and-greet service, 60 minutes of complimentary airport waiting time, bottled water, and high-speed Wi-Fi.",
          },
        ]
      ),
      city(
        "lusail",
        "Lusail",
        [],
        "لوسيل",
        "Qatar's futuristic city of the future, featuring sustainable smart infrastructure, Lusail Marina, luxury hospitality towers, and Lusail Stadium.",
        [],
        [
          {
            q: "How do I book a chauffeur service in Lusail?",
            a: "You can book through our online platform, email hello@ab.limo, or call our 24/7 dispatch desk on +971 50 918 0556. We recommend booking at least four hours in advance.",
          },
          {
            q: "Which airports do you serve from Lusail?",
            a: "We provide round-the-clock private transfers to Hamad International Airport (DOH) with meet-and-greet service and complimentary flight tracking.",
          },
          {
            q: "Are your chauffeurs English-speaking and professionally licensed?",
            a: "Yes. Every AB chauffeur is professionally licensed, English-fluent, background-checked, and trained to international corporate hospitality standards.",
          },
          {
            q: "Can I book a vehicle on an hourly or daily as-directed basis?",
            a: "Yes. Our hourly and daily charter services provide complete schedule flexibility for executive meetings, stadium events, dining, or leisure itineraries.",
          },
          {
            q: "What is included in the fare?",
            a: "All fares are all-inclusive: vehicle, fuel, professional chauffeur, complimentary flight tracking, meet-and-greet service, 60 minutes of complimentary airport waiting time, bottled water, and high-speed Wi-Fi.",
          },
        ]
      ),
      city(
        "al-wakrah",
        "Al Wakrah",
        [],
        "الوكرة",
        "A vibrant coastal city south of Doha known for Souq Al Wakrah, historic seaside promenades, and Al Janoub Stadium.",
        [],
        [
          {
            q: "How do I book a chauffeur service in Al Wakrah?",
            a: "You can book through our online platform, email hello@ab.limo, or call our 24/7 dispatch desk on +971 50 918 0556. We recommend booking at least four hours in advance.",
          },
          {
            q: "Which airports do you serve from Al Wakrah?",
            a: "We provide round-the-clock private transfers to Hamad International Airport (DOH), located just 15 minutes north, with flight tracking and meet-and-greet service.",
          },
          {
            q: "Are your chauffeurs English-speaking and professionally licensed?",
            a: "Yes. Every AB chauffeur is professionally licensed, English-fluent, background-checked, and trained to international corporate hospitality standards.",
          },
          {
            q: "Can I book a vehicle on an hourly or daily as-directed basis?",
            a: "Yes. Our hourly and daily charter services provide complete schedule flexibility for business meetings, port operations, or coastal dining excursions.",
          },
          {
            q: "What is included in the fare?",
            a: "All fares are all-inclusive: vehicle, fuel, professional chauffeur, complimentary flight tracking, meet-and-greet service, 60 minutes of complimentary airport waiting time, bottled water, and high-speed Wi-Fi.",
          },
        ]
      ),
    ],
  },
  {
    code: "bh",
    slug: "bahrain",
    name: "Bahrain",
    nameAr: "البحرين",
    cities: [
      city("manama", "Manama", [
        airport("bahrain-international-airport", "Bahrain International Airport", "BAH", "مطار البحرين الدولي"),
      ], "المنامة"),
      city("riffa", "Riffa", [], "الرفاع"),
      city("muharraq", "Muharraq", [], "المحرق"),
    ],
  },
  {
    code: "kw",
    slug: "kuwait",
    name: "Kuwait",
    nameAr: "الكويت",
    cities: [
      city("kuwait-city", "Kuwait City", [
        airport("kuwait-international-airport", "Kuwait International Airport", "KWI", "مطار الكويت الدولي"),
      ], "مدينة الكويت"),
      city("hawalli", "Hawalli", [], "حولي"),
      city("farwaniya", "Farwaniya", [], "الفروانية"),
      city("al-ahmadi", "Al Ahmadi", [], "الأحمدي"),
      city(
        "salmiya",
        "Salmiya",
        [],
        "السالمية",
        "A major commercial and residential district in Kuwait, home to the Scientific Center, Marina Mall, and premier waterfront dining along the Gulf Road.",
        ["salimya"]
      ),
    ],
  },
  {
    code: "om",
    slug: "oman",
    name: "Oman",
    nameAr: "عمان",
    cities: [
      city("muscat", "Muscat", [
        airport("muscat-international-airport", "Muscat International Airport", "MCT", "مطار مسقط الدولي"),
      ], "مسقط"),
      city("salalah", "Salalah", [
        airport("salalah-airport", "Salalah Airport", "SLL", "مطار صلالة"),
      ], "صلالة"),
      city("sohar", "Sohar", [
        airport("sohar-international-airport", "Sohar International Airport", "SOH", "مطار صحار الدولي"),
      ], "صحار"),
      city(
        "nizwa",
        "Nizwa",
        [],
        "نزوى",
        "The ancient cultural capital of Oman in the Ad Dakhiliyah region, world-renowned for its 17th-century circular fort, bustling silver souq, and mountain gateways."
      ),
    ],
  },
];

const countryAliases: Record<string, string> = {
  "united-arab-emirates": "uae",
  saudi: "saudi-arabia",
  ksa: "saudi-arabia",
};

const cityAliases: Record<string, string> = {
  madinah: "medina",
  makkah: "mecca",
  kuwait: "kuwait-city",
  "kuwait-city": "kuwait-city",
  "ras-al-khaymah": "ras-al-khaimah",
  "alula": "al-ula",
  salimya: "salmiya",
  jubial: "jubail",
  "umm-al-qaiwain": "umm-al-quwain",
  uaq: "umm-al-quwain",
};

export function resolveCountry(input: string | null | undefined): Country | undefined {
  if (typeof input !== "string") return undefined;
  const key = input.toLowerCase();
  const slug = countryAliases[key] ?? key;
  return COUNTRIES.find((c) => c.slug === slug || c.code === slug);
}

export function resolveCity(country: Country, input: string): City | undefined {
  const key = input.toLowerCase();
  const slug = cityAliases[key] ?? key;
  return (
    country.cities.find(
      (c) =>
        c.slug === slug || (c.aliases ?? []).some((alias) => alias.toLowerCase() === key)
    )
  );
}

export function resolveAirport(cityObj: City, input: string): Airport | undefined {
  const key = input.toLowerCase();
  return cityObj.airports.find(
    (a) =>
      a.slug === key || (a.aliases ?? []).some((alias) => alias.toLowerCase() === key)
  );
}

export function findCityByName(name: string): { country: Country; city: City } | undefined {
  for (const country of COUNTRIES) {
    const found = country.cities.find((c) => c.name.toLowerCase() === name.toLowerCase());
    if (found) return { country, city: found };
  }
  return undefined;
}

export interface CityRoute {
  fromSlug: string;
  toSlug: string;
  fromName?: string;
  toName?: string;
  distance: string;
  duration: string;
}

export const CITY_ROUTES: CityRoute[] = [
  { fromSlug: "riyadh", toSlug: "dammam", distance: "400 km", duration: "4h 00m" },
  { fromSlug: "dammam", toSlug: "riyadh", distance: "400 km", duration: "4h 00m" },
  { fromSlug: "riyadh", toSlug: "al-khobar", distance: "415 km", duration: "4h 00m" },
  { fromSlug: "al-khobar", toSlug: "riyadh", distance: "415 km", duration: "4h 00m" },
  { fromSlug: "riyadh", toSlug: "al-qasim", distance: "350 km", duration: "3h 30m" },
  { fromSlug: "al-qasim", toSlug: "riyadh", distance: "350 km", duration: "3h 30m" },
  { fromSlug: "dammam", toSlug: "al-khobar", distance: "25 km", duration: "30m" },
  { fromSlug: "al-khobar", toSlug: "dammam", distance: "25 km", duration: "30m" },
  { fromSlug: "medina", toSlug: "al-ula", distance: "330 km", duration: "3h 30m" },
  { fromSlug: "al-ula", toSlug: "medina", distance: "330 km", duration: "3h 30m" },
  { fromSlug: "tabuk", toSlug: "neom", distance: "180 km", duration: "2h 00m" },
  { fromSlug: "neom", toSlug: "tabuk", distance: "180 km", duration: "2h 00m" },
  { fromSlug: "abha", toSlug: "jizan", distance: "200 km", duration: "3h 00m" },
  { fromSlug: "jizan", toSlug: "abha", distance: "200 km", duration: "3h 00m" },
  { fromSlug: "riyadh", toSlug: "jeddah", distance: "950 km", duration: "9h 00m" },
  { fromSlug: "jeddah", toSlug: "riyadh", distance: "950 km", duration: "9h 00m" },
  { fromSlug: "jeddah", toSlug: "mecca", distance: "80 km", duration: "1h 00m" },
  { fromSlug: "mecca", toSlug: "jeddah", distance: "80 km", duration: "1h 00m" },
  { fromSlug: "mecca", toSlug: "medina", distance: "420 km", duration: "4h 15m" },
  { fromSlug: "medina", toSlug: "mecca", distance: "420 km", duration: "4h 15m" },
  { fromSlug: "abu-dhabi", toSlug: "dubai", distance: "140 km", duration: "1h 30m" },
  { fromSlug: "dubai", toSlug: "abu-dhabi", distance: "140 km", duration: "1h 30m" },
  { fromSlug: "dubai", toSlug: "sharjah", distance: "30 km", duration: "30m" },
  { fromSlug: "sharjah", toSlug: "dubai", distance: "30 km", duration: "30m" },
  { fromSlug: "dubai", toSlug: "ras-al-khaimah", distance: "100 km", duration: "1h 00m" },
  { fromSlug: "ras-al-khaimah", toSlug: "dubai", distance: "100 km", duration: "1h 00m" },
  { fromSlug: "dubai", toSlug: "ajman", distance: "35 km", duration: "30m" },
  { fromSlug: "ajman", toSlug: "dubai", distance: "35 km", duration: "30m" },
  { fromSlug: "dubai", toSlug: "al-ain", distance: "130 km", duration: "1h 30m" },
  { fromSlug: "al-ain", toSlug: "dubai", distance: "130 km", duration: "1h 30m" },
  { fromSlug: "abu-dhabi", toSlug: "al-ain", distance: "150 km", duration: "1h 30m" },
  { fromSlug: "al-ain", toSlug: "abu-dhabi", distance: "150 km", duration: "1h 30m" },
  { fromSlug: "abu-dhabi", toSlug: "sharjah", distance: "125 km", duration: "1h 30m" },
  { fromSlug: "sharjah", toSlug: "abu-dhabi", distance: "125 km", duration: "1h 30m" },
  { fromSlug: "abu-dhabi", toSlug: "ajman", distance: "150 km", duration: "1h 45m" },
  { fromSlug: "ajman", toSlug: "abu-dhabi", distance: "150 km", duration: "1h 45m" },
  { fromSlug: "abu-dhabi", toSlug: "ras-al-khaimah", distance: "250 km", duration: "2h 30m" },
  { fromSlug: "ras-al-khaimah", toSlug: "abu-dhabi", distance: "250 km", duration: "2h 30m" },
  { fromSlug: "sharjah", toSlug: "ajman", distance: "15 km", duration: "20m" },
  { fromSlug: "ajman", toSlug: "sharjah", distance: "15 km", duration: "20m" },
  { fromSlug: "sharjah", toSlug: "ras-al-khaimah", distance: "80 km", duration: "1h 00m" },
  { fromSlug: "ras-al-khaimah", toSlug: "sharjah", distance: "80 km", duration: "1h 00m" },
  { fromSlug: "sharjah", toSlug: "al-ain", distance: "140 km", duration: "1h 45m" },
  { fromSlug: "al-ain", toSlug: "sharjah", distance: "140 km", duration: "1h 45m" },
  { fromSlug: "ajman", toSlug: "ras-al-khaimah", distance: "90 km", duration: "1h 10m" },
  { fromSlug: "ras-al-khaimah", toSlug: "ajman", distance: "90 km", duration: "1h 10m" },
  { fromSlug: "ajman", toSlug: "al-ain", distance: "155 km", duration: "1h 45m" },
  { fromSlug: "al-ain", toSlug: "ajman", distance: "155 km", duration: "1h 45m" },
  { fromSlug: "ras-al-khaimah", toSlug: "al-ain", distance: "160 km", duration: "1h 45m" },
  { fromSlug: "al-ain", toSlug: "ras-al-khaimah", distance: "160 km", duration: "1h 45m" },
  { fromSlug: "muscat", toSlug: "abu-dhabi", distance: "350 km", duration: "3h 30m" },
  { fromSlug: "abu-dhabi", toSlug: "muscat", distance: "350 km", duration: "3h 30m" },
  { fromSlug: "muscat", toSlug: "sohar", distance: "230 km", duration: "2h 30m" },
  { fromSlug: "sohar", toSlug: "muscat", distance: "230 km", duration: "2h 30m" },
  { fromSlug: "doha", toSlug: "al-khor", distance: "50 km", duration: "45m" },
  { fromSlug: "al-khor", toSlug: "doha", distance: "50 km", duration: "45m" },
  { fromSlug: "doha", toSlug: "lusail", distance: "25 km", duration: "20m" },
  { fromSlug: "lusail", toSlug: "doha", distance: "25 km", duration: "20m" },
  { fromSlug: "kuwait-city", toSlug: "al-ahmadi", distance: "40 km", duration: "30m" },
  { fromSlug: "al-ahmadi", toSlug: "kuwait-city", distance: "40 km", duration: "30m" },
  { fromSlug: "kuwait-city", toSlug: "doha", distance: "550 km", duration: "5h 30m" },
  { fromSlug: "doha", toSlug: "kuwait-city", distance: "550 km", duration: "5h 30m" },
  { fromSlug: "manama", toSlug: "al-khobar", distance: "110 km", duration: "1h 30m" },
  { fromSlug: "al-khobar", toSlug: "manama", distance: "110 km", duration: "1h 30m" },
];

function locateCity(slug: string): { country: Country; city: City } | undefined {
  for (const country of COUNTRIES) {
    const found = resolveCity(country, slug);
    if (found) return { country, city: found };
  }
  return undefined;
}

export function routeSlugOf(route: CityRoute): string {
  return `${route.fromSlug}-to-${route.toSlug}`;
}

export function parseRouteSlug(
  routeParam: string
): { from: City | undefined; to: City | undefined } {
  const [fromRaw, toRaw] = routeParam.split("-to-");
  if (!fromRaw || !toRaw) return { from: undefined, to: undefined };
  return { from: locateCity(fromRaw)?.city, to: locateCity(toRaw)?.city };
}

export function findRoute(fromSlug: string, toSlug: string): CityRoute | undefined {
  return CITY_ROUTES.find((r) => r.fromSlug === fromSlug && r.toSlug === toSlug);
}

export function routesForCountry(country: Country): CityRoute[] {
  return CITY_ROUTES.filter((route) =>
    country.cities.some((c) => c.slug === route.fromSlug)
  );
}

export function primaryAirport(country: Country): { city: City; airport: Airport } | undefined {
  for (const cityObj of country.cities) {
    if (cityObj.airports.length > 0) {
      return { city: cityObj, airport: cityObj.airports[0] };
    }
  }
  return undefined;
}

export function titleFromSlug(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/** Canonical country slug (alias-aware), e.g. "united-arab-emirates" -> "uae". */
export function normalizeCountrySlug(slug: string): string {
  if (!slug) return "";
  return resolveCountry(slug)?.slug ?? slug;
}

/** Canonical city slug within a country, e.g. "alula" -> "al-ula". Unknown slugs pass through. */
export function normalizeCitySlug(countryInput: string, citySlug: string): string {
  if (!citySlug) return "";
  const country = resolveCountry(countryInput);
  return (country ? resolveCity(country, citySlug)?.slug : undefined) ?? citySlug;
}

export function cityNameBySlug(slug: string): string {
  return locateCity(slug)?.city.name ?? titleFromSlug(slug);
}

export function locationsUrl(lang: string): string {
  return `${localeBase(lang)}/locations`;
}

export function countriesUrl(lang: string): string {
  return `${localeBase(lang)}/locations/countries`;
}

export function citiesUrl(lang: string): string {
  return `${localeBase(lang)}/locations/cities`;
}

export function allCities(): { country: Country; city: City }[] {
  const result: { country: Country; city: City }[] = [];
  for (const c of COUNTRIES) {
    for (const cityObj of c.cities) {
      result.push({ country: c, city: cityObj });
    }
  }
  return result;
}

export function countryUrl(lang: string, country: Country): string {
  return `${localeBase(lang)}/locations/${normalizeCountrySlug(country.slug)}`;
}

export function cityUrl(lang: string, country: Country, cityObj: City): string {
  const countrySlug = normalizeCountrySlug(country.slug);
  return `${localeBase(lang)}/locations/${countrySlug}/${normalizeCitySlug(countrySlug, cityObj.slug)}`;
}

export function airportUrl(lang: string, country: Country, cityObj: City, airport: Airport): string {
  const countrySlug = normalizeCountrySlug(country.slug);
  const citySlug = normalizeCitySlug(countrySlug, cityObj.slug);
  return `${localeBase(lang)}/locations/${countrySlug}/${citySlug}/airport/${airport.slug}`;
}

export function routeUrl(lang: string, originCountry: Country, originCity: City, route: CityRoute): string {
  return `${cityUrl(lang, originCountry, originCity)}/routes/${routeSlugOf(route)}`;
}
