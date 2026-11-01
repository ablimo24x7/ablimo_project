import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Country } from "@/lib/models/Country";
import { isDatabaseEnabled } from "@/lib/locationData";

export async function GET() {
  if (!isDatabaseEnabled()) {
    return NextResponse.json({ countries: [], databaseEnabled: false });
  }

  await connectDB();
  const docs = await Country.find({ status: { $ne: "archived" } })
    .sort({ name: 1 })
    .lean();

  const countries = docs.map((d) => {
    const cities = d.cities ?? [];
    return {
      _id: String(d._id),
      slug: d.slug,
      name: d.name,
      code: d.code,
      status: d.status,
      cityCount: cities.length,
      airportCount: cities.reduce(
        (n: number, c: { airports?: { length: number } }) =>
          n + (c.airports?.length ?? 0),
        0
      ),
      faqCount: (d.faqs ?? []).length,
    };
  });

  return NextResponse.json({ countries, databaseEnabled: true });
}