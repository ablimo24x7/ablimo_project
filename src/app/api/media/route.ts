import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { connectDB } from "@/lib/db";
import { Media, type MediaKindValue } from "@/lib/models/Media";
import { authorizeApi } from "@/lib/api/guard";
import { getSession } from "@/lib/auth/server";
import { isDatabaseEnabled } from "@/lib/locationData";
import { MEDIA_MAX_BYTES, MediaListQuerySchema } from "@/lib/validations/media";

export const runtime = "nodejs";

function kindFromContentType(contentType: string): MediaKindValue {
  if (contentType.startsWith("image/")) return "image";
  if (contentType.startsWith("video/")) return "video";
  return "other";
}

function sanitizeFilename(name: string): string {
  return name.replace(/[/\\?%*:|"<>]/g, "-").replace(/\s+/g, "-").slice(0, 200) || "file";
}

/** GET /api/media — list the media library (admin/dashboard users only). */
export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isDatabaseEnabled()) {
    return NextResponse.json({ items: [], total: 0, page: 1, limit: 24 });
  }

  const parsed = MediaListQuerySchema.safeParse(
    Object.fromEntries(new URL(req.url).searchParams.entries())
  );
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation error", details: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const { page, limit, q, kind } = parsed.data;

  const filter: Record<string, unknown> = {};
  if (q) {
    filter.$or = [
      { filename: { $regex: q, $options: "i" } },
      { alt: { $regex: q, $options: "i" } },
    ];
  }
  if (kind) filter.kind = kind;

  await connectDB();
  const total = await Media.countDocuments(filter);
  const items = await Media.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  return NextResponse.json({ items, total, page, limit });
}

/** POST /api/media — upload a binary file to Vercel Blob and index it.
 *  Allowed for any role that can create content (admins) or update it
 *  (editors/authors) — uploading is part of authoring. Deletion stays
 *  restricted to delete-capable roles.
 */
export async function POST(req: NextRequest) {
  let auth = await authorizeApi("create");
  if (!auth.ok) auth = await authorizeApi("update");
  if (!auth.ok) return auth.response;

  if (!isDatabaseEnabled()) {
    return NextResponse.json({ error: "Database is not enabled" }, { status: 400 });
  }

  const contentType = req.headers.get("content-type") || "";
  if (!contentType.startsWith("image/") && !contentType.startsWith("video/")) {
    return NextResponse.json(
      { error: "Only image and video uploads are allowed" },
      { status: 400 }
    );
  }

  const contentLength = Number(req.headers.get("content-length") || 0);
  if (contentLength && contentLength > MEDIA_MAX_BYTES) {
    return NextResponse.json(
      { error: `File exceeds the ${Math.round(MEDIA_MAX_BYTES / 1024 / 1024)} MB limit` },
      { status: 400 }
    );
  }

  const { searchParams } = new URL(req.url);
  const rawFilename = searchParams.get("filename") || "upload";
  const filename = sanitizeFilename(rawFilename);
  const pathname = `media/${Date.now()}-${filename}`;

  try {
    const blob = await put(pathname, req.body!, {
      access: "public",
      contentType,
      allowOverwrite: false,
    });

    await connectDB();
    const media = await Media.create({
      url: blob.url,
      pathname: blob.pathname,
      filename,
      contentType,
      kind: kindFromContentType(contentType),
      size: Number.isFinite(contentLength) ? contentLength : 0,
      alt: "",
      uploadedBy: auth.userId,
    });

    return NextResponse.json(media, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
