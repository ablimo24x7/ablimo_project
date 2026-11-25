import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Article } from "@/lib/models/Article";
import { parseJsonBody } from "@/lib/api/errors";
import { authorizeApi } from "@/lib/api/guard";

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "20", 10);
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const status = searchParams.get("status") || "";
  const templateType = searchParams.get("templateType") || "";
  const service = searchParams.get("service") || "";

  const filter: Record<string, any> = {};
  if (q) filter.$or = [{ title: { $regex: q, $options: "i" } }, { slug: { $regex: q, $options: "i" } }];
  if (category) filter.category = category;
  if (status) filter.status = status;
  if (templateType) filter.templateType = templateType;
  if (service) filter.serviceSlug = service;

  const total = await Article.countDocuments(filter);
  const items = await Article.find(filter)
    .sort({ date: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  return NextResponse.json({ items, total, page, limit });
}

export async function POST(req: NextRequest) {
  const auth = await authorizeApi("create");
  if (!auth.ok) return auth.response;

  await connectDB();
  const body = await parseJsonBody(req);
  if (body instanceof NextResponse) return body;

  // Auto-generate SEO metadata if not provided
  if (!body.seo_metadata) body.seo_metadata = {};
  if (!body.seo_metadata.metaTitle) {
    body.seo_metadata.metaTitle = body.title || "";
  }
  if (!body.seo_metadata.metaDescription) {
    body.seo_metadata.metaDescription = (body.excerpt || body.title || "").slice(0, 160);
  }
  if (!body.seo_metadata.ogImage) {
    body.seo_metadata.ogImage = body.articleMedia?.heroCoverMedia?.url || "";
  }

  try {
    // Arabic lives on the same document: hand-written Arabic wins, and
    // every field left empty falls back to the Google translation.
    try {
      const { buildArticleTranslations } = await import("@/lib/article-translation");
      body.translations = await buildArticleTranslations(body, body.translations?.ar);
    } catch (err) {
      console.error("[articles] Failed to build Arabic translations:", err);
      body.translations = { ar: body.translations?.ar ?? {}, autoAr: {} };
    }

    const article = await Article.create(body);
    return NextResponse.json(article, { status: 201 });
  } catch (err: any) {
    if (err?.code === 11000) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: err.message || "Create failed" }, { status: 400 });
  }
}
