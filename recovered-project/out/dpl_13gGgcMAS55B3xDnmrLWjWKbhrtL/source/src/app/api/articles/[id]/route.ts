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

// Fields owned by Mongoose — never accept them from the client. Copying a stale
// client `__v` onto the document made .save() build a version where-clause that
// matched nothing, throwing VersionError on every update.
const SERVER_MANAGED_FIELDS = new Set(["_id", "__v", "createdAt", "updatedAt"]);

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  const body = await parseJsonBody(req);
  if (body instanceof NextResponse) return body;

  try {
    const existing = await Article.findById(id).lean();
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Auto-generate SEO metadata if title/excerpt changed and SEO fields are empty
    if (!body.seo_metadata) body.seo_metadata = {};
    if (body.title && !body.seo_metadata.metaTitle && !existing.seo_metadata?.metaTitle) {
      body.seo_metadata.metaTitle = body.title;
    }
    if (body.excerpt && !body.seo_metadata.metaDescription && !existing.seo_metadata?.metaDescription) {
      body.seo_metadata.metaDescription = body.excerpt.slice(0, 160);
    }

    const updates: Record<string, unknown> = {};
    for (const key of Object.keys(body)) {
      if (SERVER_MANAGED_FIELDS.has(key)) continue;
      updates[key] = body[key];
    }

    // Atomic update — bypasses the document version check entirely, so stale
    // client payloads can never trigger a VersionError. Updates validate the
    // paths being written and Mongoose still bumps __v and updatedAt itself.
    const item = await Article.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    ).lean();
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(item);
  } catch (err) {
    if ((err as { code?: number })?.code === 11000) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }
    const message = err instanceof Error ? err.message : "Update failed";
    return NextResponse.json({ error: message || "Update failed" }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  const deleted = await Article.findByIdAndDelete(id);
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
