import { connectDB } from "@/lib/db";
import { getEnv } from "@/lib/env";
import { Country, type CountryDoc, type CityDoc, type AirportDoc } from "@/lib/models/Country";
import { LocationRoute, type RouteDoc } from "@/lib/models/Route";
import { toSlug } from "@/lib/slug";
import { COUNTRIES, CITY_ROUTES, resolveAirport, resolveCity, resolveCountry, type Airport, type City, type CityRoute, type Country as CountryShape } from "@/lib/locations";

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
    sections: (doc.sections ?? []) as any,
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
    description: "",
    status: "published",
    faqs: [],
    cities: c.cities.map((city) => ({
      slug: city.slug,
      name: city.name,
      countrySlug: c.slug,
      status: "published",
      faqs: [],
      airports: city.airports.map((a) => ({
        slug: a.slug,
        name: a.name,
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

/** Fetch all countries. Falls back to static data when DB is off/empty. */
export async function getAllCountries(): Promise<CountryShape[]> {
  if (!isDatabaseEnabled()) return COUNTRIES;
  await connectDB();
  await seedLocationsIfEmpty();
  const docs = await Country.find({ status: { $ne: "archived" } }).sort({ name: 1 }).lean();
  if (!docs.length) return COUNTRIES;
  const active = docs.filter((d) => d.status === "published");
  return (active.length ? active : docs).map(toCountryShape);
}

/** Fetch a single country by slug or code. */
export async function getCountryBySlug(input: string): Promise<CountryShape | undefined> {
  const enabled = isDatabaseEnabled();
  const key = input.toLowerCase();
  if (!enabled) {
    return COUNTRIES.find((c) => c.slug === key || c.code === key);
  }
  await connectDB();
  const doc = await Country.findOne({ $or: [{ slug: key }, { code: key }] }).lean();
  if (!doc || doc.status === "archived") return undefined;
  return toCountryShape(doc);
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
  const key = input.toLowerCase();
  const db = await getCountryBySlug(key);
  if (db) return db;
  return resolveCountry(key);
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

/** Routes where the given city is the origin (dynamic + static). */
export async function getRoutesForCity(citySlug: string): Promise<CityRoute[]> {
  const routes = await getAllRoutes();
  return routes.filter((r) => r.fromSlug === citySlug);
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
