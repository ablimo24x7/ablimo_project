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

  const filter: Record<string, any> = {};
  if (q) filter.$or = [{ title: { $regex: q, $options: "i" } }, { slug: { $regex: q, $options: "i" } }];
  if (category) filter.category = category;
  if (status) filter.status = status;
  if (templateType) filter.templateType = templateType;

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
    return NextResponse.json(article, { status: 201 });
  } catch (err: any) {
    if (err?.code === 11000) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: err.message || "Create failed" }, { status: 400 });
  }
}
