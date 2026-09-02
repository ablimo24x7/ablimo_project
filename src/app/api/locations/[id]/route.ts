import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { Country } from "@/lib/models/Country";
import { isDatabaseEnabled, toCountryShape } from "@/lib/locationData";
import { validateCountry } from "@/lib/iso3166";
import { toSlug } from "@/lib/slug";

interface Ctx {
  params: Promise<{ id: string }>;
}

interface CountryUpdateInput {
  name?: string;
  code?: string;
  slug?: string;
  description?: string;
  status?: string;
  cities?: unknown;
}

export async function GET(_req: NextRequest, { params }: Ctx) {
  if (!isDatabaseEnabled()) {
    return NextResponse.json({ error: "Database is disabled." }, { status: 400 });
  }
  const { id } = await params;
  await connectDB();
  const doc = await Country.findById(id).lean();
  if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(toCountryShape(doc));
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  if (!isDatabaseEnabled()) {
    return NextResponse.json({ error: "Database is disabled." }, { status: 400 });
  }
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const data = body as CountryUpdateInput;

  await connectDB();

  const existing = await Country.findById(id).lean();
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const name = data.name ?? existing.name;
  // Block dummy/unknown country names on edit, just like creation.
  const iso = validateCountry(name);
  if (!iso) {
    return NextResponse.json(
      { error: "Invalid or unknown country. Please use a real ISO-3166 country." },
      { status: 400 }
    );
  }
  const canonicalName = iso.name;
  const code = (data.code || iso.code).toLowerCase();
  const slug = data.slug || existing.slug || toSlug(canonicalName);

  // Conflict check on code/slug against other docs
  const conflict = await Country.findOne({
    _id: { $ne: id },
    $or: [{ code }, { slug }],
  }).lean();
  if (conflict) {
    return NextResponse.json({ error: "A country with this code or slug already exists." }, { status: 409 });
  }

  try {
    const doc = await Country.findByIdAndUpdate(
      id,
      {
        name: canonicalName,
        code,
        slug,
        description: data.description ?? existing.description,
        status: data.status ?? existing.status,
        cities: data.cities ?? existing.cities,
      },
      { new: true, runValidators: true }
    ).lean();
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(toCountryShape(doc));
  } catch (err: unknown) {
    const error = err as { code?: number; message?: string };
    if (error?.code === 11000) {
      return NextResponse.json({ error: "Duplicated code or slug." }, { status: 409 });
    }
    return NextResponse.json({ error: error?.message || "Update failed" }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  if (!isDatabaseEnabled()) {
    return NextResponse.json({ error: "Database is disabled." }, { status: 400 });
  }
  const { id } = await params;
  await connectDB();
  const deleted = await Country.findByIdAndDelete(id);
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
