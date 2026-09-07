import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Article } from "@/lib/models/Article";
import { parseJsonBody } from "@/lib/api/errors";

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
  await connectDB();
  const body = await parseJsonBody(req);
  if (body instanceof NextResponse) return body;

  try {
    const article = await Article.create(body);

    // Auto-create Arabic version if article is English
    if (article.locale === "en" || !article.locale) {
      try {
        const { googleTranslate, googleTranslateHtml } = await import("@/lib/googleTranslate");

        const [title, excerpt, bodyContent, keyTakeawaysContent, finalThoughtsContent] =
          await Promise.all([
            googleTranslate(article.title || "", "ar"),
            googleTranslate(article.excerpt || "", "ar"),
            googleTranslateHtml(article.bodyContent || "", "ar"),
            googleTranslateHtml(article.keyTakeawaysContent || "", "ar"),
            googleTranslateHtml(article.finalThoughtsContent || "", "ar"),
          ]);

        const translatedFaqs = await Promise.all(
          (article.faqs || []).map(async (faq: any) => ({
            q: await googleTranslate(faq.q || "", "ar"),
            a: await googleTranslate(faq.a || "", "ar"),
          }))
        );

        await Article.create({
          ...article,
          _id: undefined,
          title,
          excerpt,
          bodyContent,
          keyTakeawaysContent,
          finalThoughtsContent,
          faqs: translatedFaqs,
          locale: "ar",
          createdAt: undefined,
          updatedAt: undefined,
        });
      } catch (err) {
        console.error("[articles] Failed to create Arabic version:", err);
      }
    }

    return NextResponse.json(article, { status: 201 });
  } catch (err: any) {
    if (err?.code === 11000) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: err.message || "Create failed" }, { status: 400 });
  }
}
