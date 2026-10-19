import { authorizeApi } from "@/lib/api/guard";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { LocationRoute } from "@/lib/models/Route";
import { isDatabaseEnabled } from "@/lib/locationData";

interface Ctx {
  params: Promise<{ id: string }>;
}

const ROUTE_STATUSES = ["draft", "published", "archived"] as const;

interface RouteUpdateInput {
  fromCity?: string;
  toCity?: string;
  fromCityName?: string;
  toCityName?: string;
  distance?: string;
  duration?: string;
  countrySlug?: string;
  status?: string;
}

export async function GET(_req: NextRequest, { params }: Ctx) {
  if (!isDatabaseEnabled()) {
    return NextResponse.json({ error: "Database is disabled." }, { status: 400 });
  }
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  await connectDB();
  const doc = await LocationRoute.findById(id).lean();
  if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(doc);
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

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const data = body as RouteUpdateInput;

  await connectDB();
  const existing = await LocationRoute.findById(id).lean();
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const fromCity = (data.fromCity ?? existing.fromCity).toLowerCase().trim();
  const toCity = (data.toCity ?? existing.toCity).toLowerCase().trim();

  if (data.status !== undefined && !ROUTE_STATUSES.includes(data.status as (typeof ROUTE_STATUSES)[number])) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const conflict = await LocationRoute.findOne({
    _id: { $ne: id },
    fromCity,
    toCity,
  }).lean();
  if (conflict) {
    return NextResponse.json({ error: "This route already exists." }, { status: 409 });
  }

  try {
    const doc = await LocationRoute.findByIdAndUpdate(
      id,
      {
        fromCity,
        toCity,
        fromCityName: data.fromCityName ?? existing.fromCityName,
        toCityName: data.toCityName ?? existing.toCityName,
        distance: data.distance ?? existing.distance,
        duration: data.duration ?? existing.duration,
        countrySlug: data.countrySlug ?? existing.countrySlug,
        status: data.status ?? existing.status,
      },
      { new: true, runValidators: true }
    ).lean();
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(doc);
  } catch (err: unknown) {
    const error = err as { code?: number; message?: string };
    if (error?.code === 11000) {
      return NextResponse.json({ error: "This route already exists." }, { status: 409 });
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
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  await connectDB();
  const deleted = await LocationRoute.findByIdAndDelete(id);
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}