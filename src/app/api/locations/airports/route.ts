import { authorizeApi } from "@/lib/api/guard";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Country } from "@/lib/models/Country";
import { isDatabaseEnabled } from "@/lib/locationData";
import { AirportCreateSchema } from "@/lib/validations/location";
import { toSlug } from "@/lib/slug";

export async function POST(req: NextRequest) {
  const auth = await authorizeApi("create");
  if (!auth.ok) return auth.response;
  if (!isDatabaseEnabled()) {
    return NextResponse.json({ error: "Database is disabled." }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = AirportCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation error", details: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  await connectDB();

  const country = await Country.findById(data.countryId).lean();
  if (!country) {
    return NextResponse.json({ error: "Parent country not found" }, { status: 404 });
  }

  const city = (country.cities ?? []).find(
    (c: { _id?: unknown; slug?: string }) =>
      String(c._id) === data.cityId || c.slug === data.cityId
  );
  if (!city) {
    return NextResponse.json({
      error: "Parent city not found under the selected country.",
    }, { status: 400 });
  }

  const slug = data.slug || toSlug(data.name);

  // Alias / slug check across ALL countries (prevent duplicate/conflicting URLs)
  const slugConflict = await Country.findOne({
    "cities.airports.slug": slug,
  }).lean();
  if (slugConflict) {
    return NextResponse.json({
      error: `An airport with slug "${slug}" already exists (${slugConflict.name}).`,
    }, { status: 409 });
  }

  // IATA uniqueness check
  const iataConflict = await Country.findOne({
    "cities.airports.iata": data.iata,
  }).lean();
  if (iataConflict) {
    return NextResponse.json({
      error: `An airport with IATA code "${data.iata}" already exists (${iataConflict.name}).`,
    }, { status: 409 });
  }

  // Alias conflict check: an alias must not match another airport slug/alias/IATA
  const aliases = (data.aliases ?? []).map((a) => a.toLowerCase()).filter(Boolean);
  if (aliases.length) {
    const aliasConflict = await Country.findOne({
      $or: [
        { "cities.airports.slug": { $in: aliases } },
        { "cities.airports.aliases": { $in: aliases } },
        { "cities.airports.iata": { $in: aliases } },
      ],
    }).lean();
    if (aliasConflict) {
      return NextResponse.json({
        error: `One of the aliases already belongs to another airport (${aliasConflict.name}).`,
      }, { status: 409 });
    }
  }

  const airport = {
    slug,
    name: data.name,
    iata: data.iata,
    citySlug: city.slug,
    description: data.description || "",
    aliases: data.aliases ?? [],
    type: data.type || "international",
    status: data.status || "published",
  };

  try {
    const updated = await Country.updateOne(
      { _id: data.countryId, "cities.slug": city.slug },
      { $push: { "cities.$.airports": airport } },
      { runValidators: true }
    );
    if (updated.modifiedCount === 0) {
      return NextResponse.json({ error: "Parent city not found" }, { status: 404 });
    }
    const fresh = await Country.findById(data.countryId).lean();
    return NextResponse.json(fresh, { status: 201 });
  } catch (err: unknown) {
    const error = err as { message?: string };
    return NextResponse.json({ error: error?.message || "Create failed" }, { status: 400 });
  }
}
