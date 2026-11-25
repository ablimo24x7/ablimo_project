import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Country } from "@/lib/models/Country";
import { isDatabaseEnabled } from "@/lib/locationData";

/**
 * Alias / slug conflict check.
 *
 * Query params:
 * - type: "airport" | "city" | "country"
 * - slug:  the slug/alias to check
 * - aliases: comma-separated extra aliases to check (airport only)
 * - countryCode: (airport|city) parent country code, for scope
 * - citySlug:    (airport only) parent city slug, validates parent association
 * - exclude:     optional country _id to ignore during updates
 *
 * Returns { available: boolean; conflictType?: string }.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const slug = (searchParams.get("slug") || "").toLowerCase();
  const aliasesParam = searchParams.get("aliases") || "";
  const aliases = aliasesParam
    .split(",")
    .map((a) => a.trim().toLowerCase())
    .filter(Boolean);
  const countryCode = (searchParams.get("countryCode") || "").toLowerCase();
  const citySlug = (searchParams.get("citySlug") || "").toLowerCase();
  const exclude = searchParams.get("exclude") || "";

  if (!slug && aliases.length === 0) {
    return NextResponse.json({ available: false, conflictType: "invalid", error: "slug is required" }, { status: 400 });
  }

  if (!isDatabaseEnabled()) {
    // Fallback: only the static dataset can be checked (no DB). Treat as available.
    return NextResponse.json({ available: true });
  }

  await connectDB();

  if (type === "airport") {
    // Validate parent city association first
    const parent = await Country.findOne({
      code: countryCode,
      "cities.slug": citySlug,
    }).lean();

    if (!parent) {
      return NextResponse.json({
        available: false,
        conflictType: "parent",
        error: "Parent city not found under the given country.",
      });
    }

    const existing = await Country.findOne({
      _id: { $ne: exclude || undefined },
      status: { $ne: "archived" },
      $or: [
        { "cities.airports.slug": slug },
        ...(aliases.length
          ? [
              { "cities.airports.aliases": { $in: aliases } },
              { "cities.airports.slug": { $in: aliases } },
            ]
          : []),
      ],
    }).lean();

    if (existing) {
      return NextResponse.json({ available: false, conflictType: "slug" });
    }
    return NextResponse.json({ available: true });
  }

  if (type === "city") {
    const existing = await Country.findOne({
      _id: { $ne: exclude || undefined },
      status: { $ne: "archived" },
      $or: [
        { "cities.slug": slug },
        ...(aliases.length ? [{ "cities.aliases": { $in: aliases } }] : []),
      ],
    }).lean();
    return NextResponse.json(
      existing
        ? { available: false, conflictType: "slug" }
        : { available: true }
    );
  }

  // country type
  const existing = await Country.findOne({
    _id: { $ne: exclude || undefined },
    $or: [{ slug }, { code: slug }],
  }).lean();
  return NextResponse.json(
    existing
      ? { available: false, conflictType: "slug" }
      : { available: true }
  );
}
