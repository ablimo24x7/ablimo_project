import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Service } from "@/lib/models/Service";
import { parseJsonBody } from "@/lib/api/errors";
import { ServiceCreateSchema, ServiceListQuerySchema } from "@/lib/validations/service";
import { isDatabaseEnabled, seedServicesIfEmpty } from "@/lib/services";
import { toSlug } from "@/lib/slug";

export async function GET(req: NextRequest) {
  const enabled = isDatabaseEnabled();
  if (!enabled) {
    return NextResponse.json({ items: [], total: 0, page: 1, limit: 50 });
  }

  const { searchParams } = new URL(req.url);
  const parsed = ServiceListQuerySchema.safeParse({
    page: searchParams.get("page") || "1",
    limit: searchParams.get("limit") || "50",
    q: searchParams.get("q") || undefined,
    status: searchParams.get("status") || undefined,
  });
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid query", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  await connectDB();
  await seedServicesIfEmpty();

  const { page, limit, q, status } = parsed.data;
  const filter: Record<string, unknown> = {};
  if (q) filter.$or = [{ title: { $regex: q, $options: "i" } }, { slug: { $regex: q, $options: "i" } }];
  if (status) filter.status = status;

  const total = await Service.countDocuments(filter);
  const items = await Service.find(filter)
    .sort({ order: 1, createdAt: 1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .select("slug title desc status showInMenu order heroImage faqs updatedAt")
    .lean();

  return NextResponse.json({
    items: items.map((d) => ({
      _id: String(d._id),
      slug: d.slug,
      title: d.title,
      desc: d.desc ?? "",
      status: d.status,
      showInMenu: d.showInMenu ?? true,
      order: d.order ?? 0,
      heroImage: d.heroImage ?? "",
      faqCount: ((d.faqs as Array<{ q: string; a: string }>) ?? []).length,
      updatedAt: d.updatedAt ? String(d.updatedAt) : undefined,
    })),
    total,
    page,
    limit,
  });
}

export async function POST(req: NextRequest) {
  const enabled = isDatabaseEnabled();
  if (!enabled) {
    return NextResponse.json(
      { error: "Database is disabled. Set USE_DATABASE=true to manage services." },
      { status: 400 }
    );
  }

  const body = await parseJsonBody(req);
  if (body instanceof NextResponse) return body;

  const parsed = ServiceCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation error", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  await connectDB();
  await seedServicesIfEmpty();

  const data = parsed.data;
  const slug = toSlug(data.slug || data.title);

  const existing = await Service.findOne({ slug }).lean();
  if (existing) {
    return NextResponse.json(
      { error: "A service with this slug already exists." },
      { status: 409 }
    );
  }

  // Auto-generate SEO metadata if not provided
  if (!data.seo) data.seo = { metaTitle: "", metaDescription: "", ogImage: "" };
  if (!data.seo.metaTitle) {
    data.seo.metaTitle = `${data.title} | AB.Limo`;
  }
  if (!data.seo.metaDescription) {
    data.seo.metaDescription = (data.subtitle || data.desc || data.title || "").slice(0, 160);
  }
  if (!data.seo.ogImage) {
    data.seo.ogImage = data.heroImage || "";
  }

  try {
    const rawPageSections = Array.isArray(body.pageSections) ? body.pageSections : [];
    const { pageSections: _, ...createData } = { ...data, slug, order: typeof data.order === "number" ? data.order : await Service.countDocuments() };
    const doc = await Service.create(createData);
    // Bypass Mongoose entirely — Mixed type fields are silently dropped by create()
    if (rawPageSections.length > 0) {
      await Service.collection.updateOne({ _id: doc._id }, { $set: { pageSections: rawPageSections } });
    }
    const saved = await Service.findById(doc._id).lean();
    return NextResponse.json(saved, { status: 201 });
  } catch (err) {
    if ((err as { code?: number })?.code === 11000) {
      return NextResponse.json({ error: "A service with this slug already exists." }, { status: 409 });
    }
    const message = err instanceof Error ? err.message : "Create failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}