import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Country } from "@/lib/models/Country";
import {
  getAllCountries,
  getAllRoutes,
  isDatabaseEnabled,
  toCountryShape,
} from "@/lib/locationData";
import { CountryCreateSchema, slugFromName } from "@/lib/validations/location";
import { validateCountry } from "@/lib/iso3166";
import { toSlug } from "@/lib/slug";

export async function GET() {
  const [countries, routes] = await Promise.all([
    getAllCountries(),
    getAllRoutes(),
  ]);
  return NextResponse.json({ countries, routes });
}

export async function POST(req: NextRequest) {
  if (!isDatabaseEnabled()) {
    return NextResponse.json(
      { error: "Database is disabled. Set USE_DATABASE=true to manage locations." },
      { status: 400 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = CountryCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation error", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const iso = validateCountry(data.name);
  if (!iso) {
    return NextResponse.json(
      { error: "Invalid or unknown country. Please use a real ISO-3166 country." },
      { status: 400 }
    );
  }

  const code = (data.code || iso.code).toLowerCase();
  const slug = data.slug || slugFromName(iso.name);
  const name = iso.name;

  await connectDB();

  // Ensure unique code/slug
  const existing = await Country.findOne({
    $or: [{ code }, { slug }],
  }).lean();
  if (existing) {
    return NextResponse.json(
      { error: "A country with this code or slug already exists." },
      { status: 409 }
    );
  }

  const cityDocs = (data.cities ?? []).map((c) => ({
    slug: c.slug || toSlug(c.name),
    name: c.name,
    countrySlug: slug,
    aliases: c.aliases ?? [],
    status: c.status || "published",
    airports: (c.airports ?? []).map((a) => ({
      slug: a.slug || toSlug(a.name),
      name: a.name,
      iata: a.iata,
      citySlug: c.slug || toSlug(c.name),
      aliases: a.aliases ?? [],
      status: a.status || "published",
    })),
  }));

  // Alias / slug conflict checks for nested cities and airports
  const nestedCitySlugs = cityDocs.map((c) => c.slug);
  const nestedCityAliases = cityDocs.flatMap((c) => c.aliases ?? []);
  const cityConflict = await Country.findOne({
    _id: { $ne: existing?._id },
    $or: [
      { "cities.slug": { $in: nestedCitySlugs } },
      ...(nestedCityAliases.length
        ? [{ "cities.aliases": { $in: nestedCityAliases } }]
        : []),
    ],
  }).lean();
  if (cityConflict) {
    return NextResponse.json({ error: "A city with one of the given slugs already exists." }, { status: 409 });
  }

  const airportDocs = cityDocs.flatMap((c) => c.airports);
  const airportSlugs = airportDocs.map((a) => a.slug);
  const airportIatas = airportDocs.map((a) => a.iata);
  const airportAliases = airportDocs.flatMap((a) => a.aliases ?? []);
  const airportConflict = await Country.findOne({
    $or: [
      { "cities.airports.slug": { $in: airportSlugs } },
      { "cities.airports.iata": { $in: airportIatas } },
      ...(airportAliases.length
        ? [{ "cities.airports.aliases": { $in: airportAliases } }]
        : []),
    ],
  }).lean();
  if (airportConflict) {
    return NextResponse.json(
      { error: "An airport slug, IATA code, or alias already exists in another country." },
      { status: 409 }
    );
  }

  try {
    const doc = await Country.create({
      code,
      slug,
      name,
      description: data.description || "",
      status: data.status || "published",
      cities: cityDocs,
    });

    return NextResponse.json(toCountryShape(doc), { status: 201 });
  } catch (err: unknown) {
    const error = err as { code?: number; message?: string };
    if (error?.code === 11000) {
      return NextResponse.json({ error: "Duplicated country code or slug." }, { status: 409 });
    }
    return NextResponse.json({ error: error?.message || "Create failed" }, { status: 400 });
  }
}
