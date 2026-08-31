import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Service } from "@/lib/models/Service";
import { parseJsonBody } from "@/lib/api/errors";
import { ServiceUpdateSchema } from "@/lib/validations/service";
import { isDatabaseEnabled } from "@/lib/services";
import { toSlug } from "@/lib/slug";

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
  const item = await Service.findById(id).lean();
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

  try {
    const item = await Service.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean();
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(item);
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