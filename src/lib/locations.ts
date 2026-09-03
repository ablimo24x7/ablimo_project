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

const airport = (slug: string, name: string, iata: string): Airport => ({ slug, name, iata });
const city = (slug: string, name: string, airports: Airport[] = []): City => ({ slug, name, airports });

export const COUNTRIES: Country[] = [
  {
    code: "ae",
    slug: "uae",
    name: "UAE",
    cities: [
      city("dubai", "Dubai", [
        airport("dubai-international-airport", "Dubai International Airport", "DXB"),
        airport("al-maktoum-international-airport", "Al Maktoum International Airport", "DWC"),
      ]),
      city("abu-dhabi", "Abu Dhabi", [
        airport("zayed-international-airport", "Zayed International Airport", "AUH"),
      ]),
      city("sharjah", "Sharjah", [
        airport("sharjah-international-airport", "Sharjah International Airport", "SHJ"),
      ]),
      city("ajman", "Ajman"),
      city("ras-al-khaimah", "Ras Al Khaimah", [
        airport("ras-al-khaimah-international-airport", "Ras Al Khaimah International Airport", "RKT"),
      ]),
      city("al-ain", "Al Ain"),
      city("fujairah", "Fujairah"),
      city("umm-al-quwain", "Umm Al Quwain"),
    ],
  },
  {
    code: "sa",
    slug: "saudi-arabia",
    name: "Saudi Arabia",
    cities: [
      city("riyadh", "Riyadh", [
        airport("king-khalid-international-airport", "King Khalid International Airport", "RUH"),
      ]),
      city("jeddah", "Jeddah", [
        airport("king-abdulaziz-international-airport", "King Abdulaziz International Airport", "JED"),
      ]),
      city("mecca", "Mecca"),
      city("medina", "Medina", [
        airport("prince-mohammad-bin-abdulaziz-international-airport", "Prince Mohammad bin Abdulaziz International Airport", "MED"),
      ]),
      city("dammam", "Dammam", [
        airport("king-fahd-international-airport", "King Fahd International Airport", "DMM"),
      ]),
      city("tabuk", "Tabuk"),
      city("alula", "Al Ula"),
      city("al-khobar", "Al Khobar"),
      city("al-qasim", "Al Qasim"),
      city("abha", "Abha"),
      city("jizan", "Jizan"),
      city("neom", "NEOM"),
      city("hail", "Hail"),
      city("jubail", "Jubail"),
      city("najran", "Najran"),
      city("taif", "Taif"),
      city("yanbu", "Yanbu"),
    ],
  },
  {
    code: "qa",
    slug: "qatar",
    name: "Qatar",
    cities: [
      city("doha", "Doha", [
        airport("hamad-international-airport", "Hamad International Airport", "DOH"),
      ]),
      city("al-khor", "Al Khor"),
      city("lusail", "Lusail"),
      city("al-wakrah", "Al Wakrah"),
    ],
  },
  {
    code: "bh",
    slug: "bahrain",
    name: "Bahrain",
    cities: [
      city("manama", "Manama", [
        airport("bahrain-international-airport", "Bahrain International Airport", "BAH"),
      ]),
      city("riffa", "Riffa"),
      city("muharraq", "Muharraq"),
    ],
  },
  {
    code: "kw",
    slug: "kuwait",
    name: "Kuwait",
    cities: [
      city("kuwait-city", "Kuwait City", [
        airport("kuwait-international-airport", "Kuwait International Airport", "KWI"),
      ]),
      city("hawalli", "Hawalli"),
      city("farwaniya", "Farwaniya"),
      city("al-ahmadi", "Al Ahmadi"),
      city("salmiya", "Salmiya"),
    ],
  },
  {
    code: "om",
    slug: "oman",
    name: "Oman",
    cities: [
      city("muscat", "Muscat", [
        airport("muscat-international-airport", "Muscat International Airport", "MCT"),
      ]),
      city("salalah", "Salalah", [
        airport("salalah-airport", "Salalah Airport", "SLL"),
      ]),
      city("sohar", "Sohar", [
        airport("sohar-international-airport", "Sohar International Airport", "SOH"),
      ]),
      city("nizwa", "Nizwa"),
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
  "al-ula": "alula",
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
  distance: string;
  duration: string;
}

export const CITY_ROUTES: CityRoute[] = [
  { fromSlug: "riyadh", toSlug: "dammam", distance: "400 km", duration: "4h 00m" },
  { fromSlug: "riyadh", toSlug: "jeddah", distance: "950 km", duration: "9h 00m" },
  { fromSlug: "jeddah", toSlug: "mecca", distance: "80 km", duration: "1h 00m" },
  { fromSlug: "jeddah", toSlug: "riyadh", distance: "950 km", duration: "9h 00m" },
  { fromSlug: "mecca", toSlug: "medina", distance: "420 km", duration: "4h 15m" },
  { fromSlug: "abu-dhabi", toSlug: "dubai", distance: "140 km", duration: "1h 30m" },
  { fromSlug: "dubai", toSlug: "abu-dhabi", distance: "140 km", duration: "1h 30m" },
  { fromSlug: "dubai", toSlug: "sharjah", distance: "30 km", duration: "30m" },
  { fromSlug: "dubai", toSlug: "ras-al-khaimah", distance: "100 km", duration: "1h 00m" },
  { fromSlug: "dubai", toSlug: "ajman", distance: "35 km", duration: "30m" },
  { fromSlug: "muscat", toSlug: "abu-dhabi", distance: "350 km", duration: "3h 30m" },
  { fromSlug: "muscat", toSlug: "sohar", distance: "230 km", duration: "2h 30m" },
  { fromSlug: "doha", toSlug: "al-khor", distance: "50 km", duration: "45m" },
  { fromSlug: "doha", toSlug: "lusail", distance: "25 km", duration: "20m" },
  { fromSlug: "kuwait", toSlug: "al-ahmadi", distance: "40 km", duration: "30m" },
  { fromSlug: "kuwait", toSlug: "doha", distance: "550 km", duration: "5h 30m" },
  { fromSlug: "manama", toSlug: "al-khobar", distance: "110 km", duration: "1h 30m" },
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

export function cityNameBySlug(slug: string): string {
  return locateCity(slug)?.city.name ?? titleFromSlug(slug);
}

export function locationsUrl(lang: string): string {
  return `/${lang}/locations`;
}

export function citiesUrl(lang: string): string {
  return `/${lang}/locations/cities`;
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
  return `/${lang}/locations/${country.slug}`;
}

export function cityUrl(lang: string, country: Country, cityObj: City): string {
  return `/${lang}/locations/${country.slug}/${cityObj.slug}`;
}

export function airportUrl(lang: string, country: Country, cityObj: City, airport: Airport): string {
  return `/${lang}/locations/${country.slug}/${cityObj.slug}/airport/${airport.slug}`;
}

export function routeUrl(lang: string, originCountry: Country, originCity: City, route: CityRoute): string {
  return `${cityUrl(lang, originCountry, originCity)}/routes/${routeSlugOf(route)}`;
}
