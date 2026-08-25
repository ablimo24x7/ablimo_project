import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { RolePolicy } from "@/lib/models/RolePolicy";

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  const deleted = await RolePolicy.findByIdAndDelete(id);
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
