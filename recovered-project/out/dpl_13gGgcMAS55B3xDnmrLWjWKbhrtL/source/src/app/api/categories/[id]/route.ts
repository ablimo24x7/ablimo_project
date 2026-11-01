import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { SimpleCategory } from "@/lib/models/SimpleCategory";
import { parseJsonBody } from "@/lib/api/errors";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  const body = await parseJsonBody(req);
  if (body instanceof NextResponse) return body;

  const item = await SimpleCategory.findByIdAndUpdate(id, body, { new: true, runValidators: true });
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  const deleted = await SimpleCategory.findByIdAndDelete(id);
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
