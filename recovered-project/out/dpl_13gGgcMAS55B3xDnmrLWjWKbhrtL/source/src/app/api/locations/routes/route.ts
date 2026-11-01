import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { LocationRoute } from "@/lib/models/Route";
import { isDatabaseEnabled } from "@/lib/locationData";
import { RouteCreateSchema } from "@/lib/validations/location";

export async function GET() {
  if (!isDatabaseEnabled()) {
    return NextResponse.json({ routes: [], databaseEnabled: false });
  }
  await connectDB();
  const routes = await LocationRoute.find().sort({ fromCity: 1 }).lean();
  return NextResponse.json({ routes, databaseEnabled: true });
}

export async function POST(req: NextRequest) {
  if (!isDatabaseEnabled()) {
    return NextResponse.json({ error: "Database is disabled." }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = RouteCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation error", details: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  await connectDB();

  // Alias check: prevent duplicate routes (from->to)
  const existing = await LocationRoute.findOne({
    fromCity: data.fromCity.toLowerCase(),
    toCity: data.toCity.toLowerCase(),
  }).lean();
  if (existing) {
    return NextResponse.json({ error: "This route already exists." }, { status: 409 });
  }

  try {
    const route = await LocationRoute.create({
      fromCity: data.fromCity.toLowerCase(),
      toCity: data.toCity.toLowerCase(),
      fromCityName: data.fromCityName || data.fromCity,
      toCityName: data.toCityName || data.toCity,
      distance: data.distance || "",
      duration: data.duration || "",
      countrySlug: data.countrySlug || "",
      status: data.status || "published",
    });
    return NextResponse.json(route, { status: 201 });
  } catch (err: unknown) {
    const error = err as { code?: number; message?: string };
    if (error?.code === 11000) {
      return NextResponse.json({ error: "This route already exists." }, { status: 409 });
    }
    return NextResponse.json({ error: error?.message || "Create failed" }, { status: 400 });
  }
}
