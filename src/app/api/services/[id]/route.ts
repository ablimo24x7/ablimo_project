import { authorizeApi } from "@/lib/api/guard";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Service } from "@/lib/models/Service";
import { parseJsonBody } from "@/lib/api/errors";
import { ServiceUpdateSchema } from "@/lib/validations/service";
import { isDatabaseEnabled } from "@/lib/services";
import { toSlug } from "@/lib/slug";
import { Types } from "mongoose";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const enabled = isDatabaseEnabled();
  if (!enabled) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await connectDB();
  const { id } = await params;
  const item = await Service.collection.findOne({ _id: new Types.ObjectId(id) });
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authorizeApi("update");
  if (!auth.ok) return auth.response;
  const enabled = isDatabaseEnabled();
  if (!enabled) {
    return NextResponse.json(
      { error: "Database is disabled. Set USE_DATABASE=true to manage services." },
      { status: 400 }
    );
  }

  const body = await parseJsonBody(req);
  if (body instanceof NextResponse) return body;

  const parsed = ServiceUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation error", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  await connectDB();
  const { id } = await params;

  const data = parsed.data;
  if (data.slug) {
    const slug = toSlug(data.slug);
    const clash = await Service.findOne({ slug, _id: { $ne: id } }).lean();
    if (clash) {
      return NextResponse.json(
        { error: "A service with this slug already exists." },
        { status: 409 }
      );
    }
    data.slug = slug;
  }

  // Auto-generate SEO metadata if title changed and SEO fields are empty
  if (data.seo) {
    if (data.seo.metaTitle === undefined) data.seo.metaTitle = "";
    if (data.seo.metaDescription === undefined) data.seo.metaDescription = "";
    if (data.seo.ogImage === undefined) data.seo.ogImage = "";
  }

  try {
    const rawPageSections = Array.isArray(body.pageSections) ? body.pageSections : undefined;

    // Use raw MongoDB driver for non-pageSections fields (Mongoose casting works fine for these)
    const { pageSections: _, ...updateData } = data;
    const item = await Service.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).lean();
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Bypass Mongoose entirely for pageSections — Mixed type fields silently dropped by $set
    if (rawPageSections !== undefined) {
      await Service.collection.updateOne({ _id: item._id }, { $set: { pageSections: rawPageSections } });
    }

    const saved = await Service.findById(id).lean();
    return NextResponse.json(saved);
  } catch (err) {
    if ((err as { code?: number })?.code === 11000) {
      return NextResponse.json(
        { error: "A service with this slug already exists." },
        { status: 409 }
      );
    }
    const message = err instanceof Error ? err.message : "Update failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authorizeApi("delete");
  if (!auth.ok) return auth.response;
  const enabled = isDatabaseEnabled();
  if (!enabled) {
    return NextResponse.json(
      { error: "Database is disabled. Set USE_DATABASE=true to manage services." },
      { status: 400 }
    );
  }
  await connectDB();
  const { id } = await params;
  const deleted = await Service.findByIdAndDelete(id);
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}