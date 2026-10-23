import { NextRequest, NextResponse } from "next/server";
import { del } from "@vercel/blob";
import { connectDB } from "@/lib/db";
import { Media } from "@/lib/models/Media";
import { authorizeApi } from "@/lib/api/guard";
import { parseJsonBody } from "@/lib/api/errors";
import { isDatabaseEnabled } from "@/lib/locationData";
import { MediaUpdateSchema } from "@/lib/validations/media";

export const runtime = "nodejs";

type Params = { params: Promise<{ id: string }> };

/** PATCH /api/media/[id] — update alt / filename. */
export async function PATCH(req: NextRequest, { params }: Params) {
  const auth = await authorizeApi("update");
  if (!auth.ok) return auth.response;

  if (!isDatabaseEnabled()) {
    return NextResponse.json({ error: "Database is not enabled" }, { status: 400 });
  }

  const { id } = await params;
  const body = await parseJsonBody(req);
  if (body instanceof NextResponse) return body;

  const parsed = MediaUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation error", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  await connectDB();
  const updated = await Media.findByIdAndUpdate(id, parsed.data, {
    new: true,
  }).lean();
  if (!updated) {
    return NextResponse.json({ error: "Media not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

/** DELETE /api/media/[id] — remove the blob and its library entry. */
export async function DELETE(_req: NextRequest, { params }: Params) {
  const auth = await authorizeApi("delete");
  if (!auth.ok) return auth.response;

  if (!isDatabaseEnabled()) {
    return NextResponse.json({ error: "Database is not enabled" }, { status: 400 });
  }

  const { id } = await params;
  await connectDB();
  const media = await Media.findByIdAndDelete(id).lean();
  if (!media) {
    return NextResponse.json({ error: "Media not found" }, { status: 404 });
  }

  try {
    await del(media.url);
  } catch (err) {
    // Blob already gone (or store unreachable) — the library entry is
    // removed either way so the dashboard never shows a dead record.
    console.error("[media] Failed to delete blob:", err);
  }

  return NextResponse.json({ ok: true });
}
