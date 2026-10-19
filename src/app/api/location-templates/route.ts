import { authorizeApi } from "@/lib/api/guard";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { LocationPageTemplate } from "@/lib/models/LocationPageTemplate";
import { parseJsonBody } from "@/lib/api/errors";
import { LocationPageTemplateCreateSchema } from "@/lib/validations/location";
import { isDatabaseEnabled } from "@/lib/locationData";
import { defaultLocale } from "@/app/[lang]/dictionaries";

export async function GET(req: NextRequest) {
  if (!isDatabaseEnabled()) {
    return NextResponse.json({ items: [], total: 0 });
  }

  const { searchParams } = new URL(req.url);
  const pageType = searchParams.get("pageType") || undefined;
  const refKey = searchParams.get("refKey") || undefined;

  if (pageType && !["country", "city", "route"].includes(pageType)) {
    return NextResponse.json({ error: "Invalid pageType" }, { status: 400 });
  }

  const filter: Record<string, unknown> = {};
  if (pageType) filter.pageType = pageType;
  if (refKey) filter.refKey = refKey;

  await connectDB();
  const items = await LocationPageTemplate.find(filter).lean();
  // One template serves every language — when legacy per-language docs
  // exist for the same page, surface the default-language one first.
  const langRank = (lang?: string) =>
    lang === defaultLocale ? 0 : lang?.startsWith("en") ? 1 : 2;
  items.sort(
    (a, b) =>
      langRank(a.lang) - langRank(b.lang) ||
      new Date((b as { updatedAt?: Date | string }).updatedAt ?? 0).getTime() -
        new Date((a as { updatedAt?: Date | string }).updatedAt ?? 0).getTime()
  );
  return NextResponse.json({ items, total: items.length });
}

export async function POST(req: NextRequest) {
  const auth = await authorizeApi("create");
  if (!auth.ok) return auth.response;
  if (!isDatabaseEnabled()) {
    return NextResponse.json(
      { error: "Database is disabled. Set USE_DATABASE=true to manage location templates." },
      { status: 400 }
    );
  }

  const body = await parseJsonBody(req);
  if (body instanceof NextResponse) return body;

  const parsed = LocationPageTemplateCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation error", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  await connectDB();
  const { pageType, refKey, lang, status, template } = parsed.data;

  const existing = await LocationPageTemplate.findOne({
    pageType,
    refKey,
    lang,
  }).lean();
  if (existing) {
    return NextResponse.json(
      { error: "A template for this page type, reference, and language already exists." },
      { status: 409 }
    );
  }

  try {
    const doc = await LocationPageTemplate.create({
      pageType,
      refKey,
      lang,
      status: status ?? "published",
      template: [],
    });
    // Bypass Mongoose for template — Mixed arrays are silently dropped
    if (template.length > 0) {
      await LocationPageTemplate.collection.updateOne(
        { _id: doc._id },
        { $set: { template } }
      );
    }
    const saved = await LocationPageTemplate.findById(doc._id).lean();
    return NextResponse.json(saved, { status: 201 });
  } catch (err) {
    if ((err as { code?: number })?.code === 11000) {
      return NextResponse.json(
        { error: "A template for this page type, reference, and language already exists." },
        { status: 409 }
      );
    }
    const message = err instanceof Error ? err.message : "Create failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
