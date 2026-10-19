import { authorizeApi } from "@/lib/api/guard";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Country, type CityDoc } from "@/lib/models/Country";
import { isDatabaseEnabled } from "@/lib/locationData";
import { CityCreateSchema, slugFromName } from "@/lib/validations/location";
import { toSlug } from "@/lib/slug";

export async function GET() {
  if (!isDatabaseEnabled()) {
    return NextResponse.json({ cities: [], databaseEnabled: false });
  }

  await connectDB();
  const docs = await Country.find({ status: { $ne: "archived" } })
    .sort({ name: 1 })
    .lean();

  const cities = docs.flatMap((d) =>
    (d.cities ?? []).map((c: CityDoc) => ({
      slug: c.slug,
      name: c.name,
      nameAr: c.nameAr ?? "",
      status: c.status ?? "published",
      airportCount: c.airports?.length ?? 0,
      faqCount: c.faqs?.length ?? 0,
      countryId: String(d._id),
      countryName: d.name,
      countrySlug: d.slug,
    }))
  );

  return NextResponse.json({ cities });
}

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

  const parsed = CityCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation error", details: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  await connectDB();

  const country = await Country.findById(data.countryId).lean();
  if (!country) {
    return NextResponse.json({ error: "Parent country not found" }, { status: 404 });
  }

  const slug = data.slug || slugFromName(data.name);
  const aliases = (data.aliases ?? []).map((a) => a.toLowerCase()).filter(Boolean);

  // Alias check: city slug (and aliases) must be unique across all countries
  const conflict = await Country.findOne({
    $or: [
      { "cities.slug": slug },
      ...(aliases.length ? [{ "cities.aliases": { $in: aliases } }] : []),
    ],
  }).lean();
  if (conflict) {
    return NextResponse.json({ error: `A city with slug "${slug}" already exists.` }, { status: 409 });
  }

  const city = {
    slug,
    name: data.name,
    countrySlug: country.slug,
    description: data.description || "",
    aliases: data.aliases ?? [],
    status: data.status || "published",
    airports: (data.airports ?? []).map((a) => ({
      slug: a.slug || toSlug(a.name),
      name: a.name,
      iata: a.iata,
      citySlug: slug,
      aliases: a.aliases ?? [],
      status: a.status || "published",
    })),
  };

  try {
    const updated = await Country.findByIdAndUpdate(
      data.countryId,
      { $push: { cities: city } },
      { new: true, runValidators: true }
    ).lean();
    if (!updated) return NextResponse.json({ error: "Parent country not found" }, { status: 404 });
    return NextResponse.json(updated, { status: 201 });
  } catch (err: unknown) {
    const error = err as { code?: number; message?: string };
    if (error?.code === 11000) {
      return NextResponse.json({ error: "Duplicated city slug." }, { status: 409 });
    }
    return NextResponse.json({ error: error?.message || "Create failed" }, { status: 400 });
  }
}
