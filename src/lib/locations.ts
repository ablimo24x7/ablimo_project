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
const city = (slug: string, name: string, airports: Airport[] = [], nameAr = ""): City => ({
  slug,
  name,
  airports,
  nameAr,
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
      city("ajman", "Ajman", [], "عجمان"),
      city("ras-al-khaimah", "Ras Al Khaimah", [
        airport("ras-al-khaimah-international-airport", "Ras Al Khaimah International Airport", "RKT", "مطار رأس الخيمة الدولي"),
      ], "رأس الخيمة"),
      city("al-ain", "Al Ain", [], "العين"),
      city("fujairah", "Fujairah", [], "الفجيرة"),
      city("umm-al-quwain", "Umm Al Quwain", [], "أم القيوين"),
    ],
  },
  {
    code: "sa",
    slug: "saudi-arabia",
    name: "Saudi Arabia",
    nameAr: "المملكة العربية السعودية",
    cities: [
      city("riyadh", "Riyadh", [
        airport("king-khalid-international-airport", "King Khalid International Airport", "RUH", "مطار الملك خالد الدولي"),
      ], "الرياض"),
      city("jeddah", "Jeddah", [
        airport("king-abdulaziz-international-airport", "King Abdulaziz International Airport", "JED", "مطار الملك عبدالعزيز الدولي"),
      ], "جدة"),
      city("mecca", "Mecca", [], "مكة المكرمة"),
      city("medina", "Medina", [
        airport("prince-mohammad-bin-abdulaziz-international-airport", "Prince Mohammad bin Abdulaziz International Airport", "MED", "مطار الأمير محمد بن عبدالعزيز الدولي"),
      ], "المدينة المنورة"),
      city("dammam", "Dammam", [
        airport("king-fahd-international-airport", "King Fahd International Airport", "DMM", "مطار الملك فهد الدولي"),
      ], "الدمام"),
      city("tabuk", "Tabuk", [], "تبوك"),
      city("al-ula", "Al Ula", [], "العلا"),
      city("al-khobar", "Al Khobar", [], "الخبر"),
      city("al-qasim", "Al Qasim", [], "القصيم"),
      city("abha", "Abha", [], "أبها"),
      city("jizan", "Jizan", [], "جازان"),
      city("neom", "NEOM", [], "نيوم"),
      city("hail", "Hail", [], "حائل"),
      city("jubail", "Jubail", [], "الجبيل"),
      city("najran", "Najran", [], "نجران"),
      city("taif", "Taif", [], "الطائف"),
      city("yanbu", "Yanbu", [], "ينبع"),
    ],
  },
  {
    code: "qa",
    slug: "qatar",
    name: "Qatar",
    nameAr: "قطر",
    cities: [
      city("doha", "Doha", [
        airport("hamad-international-airport", "Hamad International Airport", "DOH", "مطار حمد الدولي"),
      ], "الدوحة"),
      city("al-khor", "Al Khor", [], "الخور"),
      city("lusail", "Lusail", [], "لوسيل"),
      city("al-wakrah", "Al Wakrah", [], "الوكرة"),
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
      city("salmiya", "Salmiya", [], "السالمية"),
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
      city("nizwa", "Nizwa", [], "نزوى"),
    ],
  },
];

const countryAliases: Record<string, string> = {
  "united-arab-emirates": "uae",
};

const cityAliases: Record<string, string> = {
  madinah: "medina",
  makkah: "mecca",
  kuwait: "kuwait-city",
  "kuwait-city": "kuwait-city",
  "ras-al-khaymah": "ras-al-khaimah",
  "alula": "al-ula",
};

export function resolveCountry(input: string): Country | undefined {
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
