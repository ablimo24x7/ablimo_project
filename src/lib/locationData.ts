import { connectDB } from "@/lib/db";
import { getEnv } from "@/lib/env";
import { Country, type CountryDoc, type CityDoc, type AirportDoc } from "@/lib/models/Country";
import { LocationRoute, type RouteDoc } from "@/lib/models/Route";
import { toSlug } from "@/lib/slug";
import { COUNTRIES, CITY_ROUTES, resolveAirport, resolveCity, resolveCountry, type Airport, type City, type CityRoute, type Country as CountryShape } from "@/lib/locations";
import type { TextImageSectionType } from "@/lib/validations/location";

export const LOCATION_API_TAG = "locations";

/** True when the database is available (USE_DATABASE=true). */
export function isDatabaseEnabled(): boolean {
  try {
    return getEnv().USE_DATABASE !== "false";
  } catch {
    return true;
  }
}

function mapAirport(doc: AirportDoc & { _id?: unknown }): Airport {
  return {
    _id: doc._id ? String(doc._id) : undefined,
    slug: doc.slug,
    name: doc.name,
    nameAr: doc.nameAr ?? "",
    iata: doc.iata ?? "",
    description: doc.description ?? "",
    descriptionAr: doc.descriptionAr ?? "",
    aliases: doc.aliases ?? [],
    type: doc.type ?? "international",
    status: doc.status ?? "published",
    citySlug: doc.citySlug,
  };
}

function mapCity(doc: CityDoc & { _id?: unknown }): City {
  return {
    _id: doc._id ? String(doc._id) : undefined,
    slug: doc.slug,
    name: doc.name,
    nameAr: doc.nameAr ?? "",
    description: doc.description ?? "",
    descriptionAr: doc.descriptionAr ?? "",
    aliases: doc.aliases ?? [],
    status: doc.status ?? "published",
    countrySlug: doc.countrySlug,
    airports: (doc.airports ?? []).map(mapAirport),
    faqs: (doc.faqs ?? []).map((f) => ({ q: f.q ?? "", a: f.a ?? "" })),
    faqsAr: (doc.faqsAr ?? []).map((f) => ({ q: f.q ?? "", a: f.a ?? "" })),
    sections: (doc.sections ?? []) as TextImageSectionType[],
  };
}

/** Convert a Country Mongo doc to the frontend `Country` shape. */
export function toCountryShape(doc: CountryDoc & { _id?: unknown }): CountryShape {
  return {
    _id: doc._id ? String(doc._id) : undefined,
    code: doc.code,
    slug: doc.slug,
    name: doc.name,
    nameAr: doc.nameAr ?? "",
    description: doc.description ?? "",
    descriptionAr: doc.descriptionAr ?? "",
    status: doc.status ?? "published",
    cities: (doc.cities ?? []).map(mapCity),
    faqs: (doc.faqs ?? []).map((f) => ({ q: f.q ?? "", a: f.a ?? "" })),
    faqsAr: (doc.faqsAr ?? []).map((f) => ({ q: f.q ?? "", a: f.a ?? "" })),
  };
}

function toRouteShape(doc: RouteDoc): CityRoute {
  return {
    fromSlug: doc.fromCity,
    toSlug: doc.toCity,
    fromName: doc.fromCityName || "",
    toName: doc.toCityName || "",
    distance: doc.distance || "",
    duration: doc.duration || "",
  };
}

/** Seed the database from the bundled static dataset if it is empty. */
export async function seedLocationsIfEmpty(): Promise<void> {
  const enabled = isDatabaseEnabled();
  if (!enabled) return;
  await connectDB();
  const count = await Country.countDocuments();
  if (count > 0) return;

  const countries = COUNTRIES.map((c) => ({
    code: c.code,
    slug: c.slug,
    name: c.name,
    nameAr: c.nameAr ?? "",
    description: "",
    status: "published",
    faqs: [],
    cities: c.cities.map((city) => ({
      slug: city.slug,
      name: city.name,
      nameAr: city.nameAr ?? "",
      countrySlug: c.slug,
      status: "published",
      faqs: [],
      airports: city.airports.map((a) => ({
        slug: a.slug,
        name: a.name,
        nameAr: a.nameAr ?? "",
        iata: a.iata,
        citySlug: city.slug,
        status: "published",
      })),
    })),
  }));

  await Country.insertMany(countries);

  const routeDocs = CITY_ROUTES.map((r) => ({
    fromCity: r.fromSlug,
    toCity: r.toSlug,
    fromCityName: "",
    toCityName: "",
    distance: r.distance,
    duration: r.duration,
    status: "published",
  }));

  await LocationRoute.insertMany(routeDocs).catch(() => undefined);
}

/** Backfill empty nameAr fields from the bundled static dataset. */
function backfillNameAr<T extends { slug: string; nameAr?: string }>(
  items: T[],
  staticItems: readonly T[]
): T[] {
  const bySlug = new Map(staticItems.map((item) => [item.slug, item]));
  return items.map((item) => {
    if (item.nameAr) return item;
    const match = bySlug.get(item.slug);
    if (match?.nameAr) return { ...item, nameAr: match.nameAr };
    return item;
  });
}

function backfillCountryNameAr(country: CountryShape): CountryShape {
  const staticCountry = COUNTRIES.find((c) => c.slug === country.slug);
  if (!staticCountry) return country;
  const cities = backfillNameAr(country.cities ?? [], staticCountry.cities).map((city) => {
    const staticCity = staticCountry.cities.find((c) => c.slug === city.slug);
    return {
      ...city,
      airports: backfillNameAr(city.airports ?? [], staticCity?.airports ?? []),
    };
  });
  return {
    ...country,
    nameAr: country.nameAr || staticCountry.nameAr || "",
    cities,
  };
}

/** Fetch all countries. Falls back to static data when DB is off/empty. */
export async function getAllCountries(): Promise<CountryShape[]> {
  if (!isDatabaseEnabled()) return COUNTRIES;
  await connectDB();
  await seedLocationsIfEmpty();
  const docs = await Country.find({ status: { $ne: "archived" } }).sort({ name: 1 }).lean();
  if (!docs.length) return COUNTRIES;
  const active = docs.filter((d) => d.status === "published");
  return (active.length ? active : docs)
    .map(toCountryShape)
    .map(backfillCountryNameAr);
}

const countryAliases: Record<string, string> = {
  "united-arab-emirates": "uae",
};

/** Expand a country input to all lookup candidates (itself + alias variants). */
function countryLookupKeys(input: string): string[] {
  const key = input.toLowerCase();
  const keys = new Set<string>([key]);
  // forward: "united-arab-emirates" -> "uae"
  const forward = countryAliases[key];
  if (forward) keys.add(forward);
  // reverse: "uae" -> "united-arab-emirates"
  for (const [alias, target] of Object.entries(countryAliases)) {
    if (target === key) keys.add(alias);
  }
  return [...keys];
}

/** Fetch a single country by slug, code, or alias. */
export async function getCountryBySlug(input: string): Promise<CountryShape | undefined> {
  const enabled = isDatabaseEnabled();
  if (!enabled) {
    const key = input.toLowerCase();
    return COUNTRIES.find((c) => c.slug === key || c.code === key);
  }
  await connectDB();
  const keys = countryLookupKeys(input);
  const doc = await Country.findOne({
    $or: [{ slug: { $in: keys } }, { code: { $in: keys } }, { aliases: { $in: keys } }],
  }).lean();
  if (!doc || doc.status === "archived") return undefined;
  return backfillCountryNameAr(toCountryShape(doc));
}

/** Fetch all routes. */
export async function getAllRoutes(): Promise<CityRoute[]> {
  if (!isDatabaseEnabled()) return CITY_ROUTES;
  await connectDB();
  await seedLocationsIfEmpty();
  const docs = await LocationRoute.find({ status: { $ne: "archived" } }).lean();
  if (!docs.length) return CITY_ROUTES;
  return (docs.filter((d) => d.status === "published").length
    ? docs.filter((d) => d.status === "published")
    : docs
  ).map(toRouteShape);
}

/** Generate a unique slug within a scope. */
export async function generateUniqueSlug(
  base: string,
  exists: (slug: string) => Promise<boolean>
): Promise<string> {
  const baseSlug = toSlug(base);
  if (!(await exists(baseSlug))) return baseSlug;
  for (let n = 2; n < 10_000; n++) {
    const next = `${baseSlug}-${n}`;
    if (!(await exists(next))) return next;
  }
  throw new Error("Unable to generate a unique slug");
}

/**
 * Public page resolvers. These prefer the dashboard (DB) data and fall back to
 * the bundled static dataset (including its aliases) when the DB is off/empty.
 */

export async function getCountryForRequest(input: string): Promise<CountryShape | undefined> {
  const db = await getCountryBySlug(input.toLowerCase());
  if (db) return db;
  return resolveCountry(input.toLowerCase());
}

export async function getCityForRequest(
  countryInput: string,
  cityInput: string
): Promise<{ country: CountryShape; city: City } | undefined> {
  const key = cityInput.toLowerCase();
  const db = await getCountryBySlug(countryInput.toLowerCase());
  if (db) {
    const city = db.cities.find((c) => c.slug === key) ?? resolveCity(db, key);
    if (city) return { country: db, city };
  }
  const staticCountry = resolveCountry(countryInput.toLowerCase());
  if (staticCountry) {
    const city = resolveCity(staticCountry, key);
    if (city) return { country: staticCountry, city };
  }
  return undefined;
}

export async function getAirportForRequest(
  countryInput: string,
  cityInput: string,
  airportInput: string
): Promise<{ country: CountryShape; city: City; airport: Airport } | undefined> {
  const res = await getCityForRequest(countryInput, cityInput);
  if (!res) return undefined;
  const key = airportInput.toLowerCase();
  const airport =
    res.city.airports.find((a) => a.slug === key) ?? resolveAirport(res.city, key);
  if (!airport) return undefined;
  return { ...res, airport };
}

/** Routes originating from any city in the given country (dynamic + static). */
export async function getRoutesForCountry(country: CountryShape): Promise<CityRoute[]> {
  const routes = await getAllRoutes();
  const citySlugs = new Set((country.cities ?? []).map((c) => c.slug));
  return routes.filter((r) => citySlugs.has(r.fromSlug));
}

/**
 * Routes involving the given city, always oriented with the city as origin
 * (dynamic + static). Deduped by destination, preferring the original direction.
 */
export async function getRoutesForCity(citySlug: string): Promise<CityRoute[]> {
  const routes = await getAllRoutes();
  const seen = new Set<string>();
  const result: CityRoute[] = [];
  for (const r of routes) {
    if (r.fromSlug === citySlug) {
      if (!seen.has(r.toSlug)) {
        seen.add(r.toSlug);
        result.push(r);
      }
    } else if (r.toSlug === citySlug) {
      if (!seen.has(r.fromSlug)) {
        seen.add(r.fromSlug);
        result.push({
          ...r,
          fromSlug: r.toSlug,
          toSlug: r.fromSlug,
          fromName: r.toName,
          toName: r.fromName,
        });
      }
    }
  }
  return result;
}

/** Look up a single route by origin/destination slugs (dynamic + static). */
export async function findRouteData(
  fromSlug: string,
  toSlug: string
): Promise<CityRoute | undefined> {
  const routes = await getAllRoutes();
  return routes.find((r) => r.fromSlug === fromSlug && r.toSlug === toSlug);
}

/** Build a flat list of { country, city } entries (dynamic + static). */
export async function getDynamicCityList(): Promise<{ country: CountryShape; city: City }[]> {
  const countries = await getAllCountries();
  const result: { country: CountryShape; city: City }[] = [];
  for (const c of countries) {
    for (const cityObj of c.cities ?? []) {
      if (cityObj.status === "archived") continue;
      result.push({ country: c, city: cityObj });
    }
  }
  return result;
}
