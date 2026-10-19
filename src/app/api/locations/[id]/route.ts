import { authorizeApi } from "@/lib/api/guard";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { Country } from "@/lib/models/Country";
import { isDatabaseEnabled, toCountryShape } from "@/lib/locationData";
import { validateCountry } from "@/lib/iso3166";
import { toSlug } from "@/lib/slug";
import { parseJsonBody } from "@/lib/api/errors";
import { CountryUpdateSchema } from "@/lib/validations/location";

interface Ctx {
  params: Promise<{ id: string }>;
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
  const auth = await authorizeApi("update");
  if (!auth.ok) return auth.response;
  if (!isDatabaseEnabled()) {
    return NextResponse.json({ error: "Database is disabled." }, { status: 400 });
  }
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const body = await parseJsonBody(req);
  if (body instanceof NextResponse) return body;
  const parsed = CountryUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation error", details: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const data = parsed.data;

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
        nameAr: data.nameAr ?? existing.nameAr ?? "",
        code,
        slug,
        description: data.description ?? existing.description,
        descriptionAr: data.descriptionAr ?? existing.descriptionAr ?? "",
        status: data.status ?? existing.status,
        cities: data.cities ?? existing.cities,
        faqs: data.faqs ?? existing.faqs ?? [],
        faqsAr: data.faqsAr ?? existing.faqsAr ?? [],
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
  const auth = await authorizeApi("delete");
  if (!auth.ok) return auth.response;
  if (!isDatabaseEnabled()) {
    return NextResponse.json({ error: "Database is disabled." }, { status: 400 });
  }
  const { id } = await params;
  await connectDB();
  const deleted = await Country.findByIdAndDelete(id);
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
