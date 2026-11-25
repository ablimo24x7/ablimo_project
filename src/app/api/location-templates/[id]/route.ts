import { authorizeApi } from "@/lib/api/guard";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
import { connectDB } from "@/lib/db";
import { LocationPageTemplate } from "@/lib/models/LocationPageTemplate";
import { parseJsonBody } from "@/lib/api/errors";
import { LocationPageTemplateUpdateSchema } from "@/lib/validations/location";
import { isDatabaseEnabled } from "@/lib/locationData";

interface Ctx {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, { params }: Ctx) {
  if (!isDatabaseEnabled()) {
    return NextResponse.json({ error: "Database is disabled." }, { status: 400 });
  }
  const { id } = await params;
  await connectDB();
  const item = await LocationPageTemplate.collection.findOne({
    _id: new Types.ObjectId(id),
  });
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  const auth = await authorizeApi("update");
  if (!auth.ok) return auth.response;
  if (!isDatabaseEnabled()) {
    return NextResponse.json(
      { error: "Database is disabled. Set USE_DATABASE=true to manage location templates." },
      { status: 400 }
    );
  }

  const body = await parseJsonBody(req);
  if (body instanceof NextResponse) return body;

  const parsed = LocationPageTemplateUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation error", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  await connectDB();
  const { id } = await params;
  const data = parsed.data;

  // Conflict check when the unique key parts change
  const existing = await LocationPageTemplate.findById(id).lean();
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const pageType = data.pageType ?? existing.pageType;
  const refKey = data.refKey ?? existing.refKey;
  const lang = data.lang ?? existing.lang;
  if (pageType !== existing.pageType || refKey !== existing.refKey || lang !== existing.lang) {
    const clash = await LocationPageTemplate.findOne({
      _id: { $ne: id },
      pageType,
      refKey,
      lang,
    }).lean();
    if (clash) {
      return NextResponse.json(
        { error: "A template for this page type, reference, and language already exists." },
        { status: 409 }
      );
    }
  }

  try {
    const rawTemplate = Array.isArray(body.template) ? body.template : undefined;
    const { template: _, ...updateData } = data;
    const item = await LocationPageTemplate.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).lean();
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Bypass Mongoose entirely for template — Mixed arrays are dropped by $set
    if (rawTemplate !== undefined) {
      await LocationPageTemplate.collection.updateOne(
        { _id: item._id },
        { $set: { template: rawTemplate } }
      );
    }

    const saved = await LocationPageTemplate.findById(id).lean();
    return NextResponse.json(saved);
  } catch (err) {
    if ((err as { code?: number })?.code === 11000) {
      return NextResponse.json(
        { error: "A template for this page type, reference, and language already exists." },
        { status: 409 }
      );
    }
    const message = err instanceof Error ? err.message : "Update failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const auth = await authorizeApi("delete");
  if (!auth.ok) return auth.response;
  if (!isDatabaseEnabled()) {
    return NextResponse.json(
      { error: "Database is disabled. Set USE_DATABASE=true to manage location templates." },
      { status: 400 }
    );
  }
  const { id } = await params;
  await connectDB();
  const deleted = await LocationPageTemplate.findByIdAndDelete(id);
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
