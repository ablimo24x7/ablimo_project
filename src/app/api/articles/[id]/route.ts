import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Article } from "@/lib/models/Article";
import { parseJsonBody } from "@/lib/api/errors";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  const item = await Article.findById(id).lean();
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  const body = await parseJsonBody(req);
  if (body instanceof NextResponse) return body;

  try {
    const existing = await Article.findById(id);
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Auto-generate SEO metadata if title/excerpt changed and SEO fields are empty
    if (!body.seo_metadata) body.seo_metadata = {};
    if (body.title && !body.seo_metadata.metaTitle && !existing.seo_metadata?.metaTitle) {
      body.seo_metadata.metaTitle = body.title;
    }
    if (body.excerpt && !body.seo_metadata.metaDescription && !existing.seo_metadata?.metaDescription) {
      body.seo_metadata.metaDescription = body.excerpt.slice(0, 160);
    }
    if (body.title && !body.seo_metadata.metaTitle && existing.seo_metadata?.metaTitle) {
      // Keep existing SEO title — don't overwrite
    }
    if (body.excerpt && !body.seo_metadata.metaDescription && existing.seo_metadata?.metaDescription) {
      // Keep existing SEO description — don't overwrite
    }

    for (const key of Object.keys(body)) {
      (existing as any)[key] = body[key];
    }

    await existing.save();
    const item = await Article.findById(id).lean();
    return NextResponse.json(item);
  } catch (err: any) {
    if (err?.code === 11000) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: err.message || "Update failed" }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  const deleted = await Article.findByIdAndDelete(id);
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
