import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { SimpleCategory } from "@/lib/models/SimpleCategory";
import slugify from "slugify";
import { parseJsonBody } from "@/lib/api/errors";

const DEFAULT_CATEGORIES = [
  "Airport Transfers",
  "Executive & Corporate Mobility",
  "VIP, Diplomatic & Government",
  "Corporate Fleet & Workforce Mobility",
  "Event Transportation",
  "Group & Coach Charter",
  "Tourism & Leisure",
  "Religious Tourism",
  "Cross-Border Mobility",
  "Premium Lifestyle & Specialty",
  "Company News",
  "Aviation",
  "Hospitality",
];

let seedPromise: Promise<void> | null = null;

async function seedCategoriesIfEmpty(): Promise<void> {
  if (seedPromise) return seedPromise;
  seedPromise = (async () => {
    try {
      await connectDB();
      const count = await SimpleCategory.countDocuments();
      if (count > 0) return;
      const docs = DEFAULT_CATEGORIES.map((label) => ({
        slug: slugify(label, { lower: true, strict: true }),
        label,
      }));
      await SimpleCategory.insertMany(docs);
    } finally {
      seedPromise = null;
    }
  })();
  return seedPromise;
}

export async function GET() {
  await seedCategoriesIfEmpty();
  const items = await SimpleCategory.find().sort({ label: 1 }).lean();
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await parseJsonBody(req);
  if (body instanceof NextResponse) return body;
  const b = body as Record<string, any>;

  const label = (b.label || b.name || "").trim();
  if (!label) return NextResponse.json({ error: "Label required" }, { status: 400 });

  const slug = slugify(label, { lower: true, strict: true });
  try {
    const item = await SimpleCategory.create({ slug, label });
    return NextResponse.json(item, { status: 201 });
  } catch (err: any) {
    if (err?.code === 11000) return NextResponse.json({ error: "Category exists" }, { status: 409 });
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
