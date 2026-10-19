import { authorizeApi } from "@/lib/api/guard";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { canDeleteUser } from "@/lib/auth/governance";

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorizeApi("manage");
  if (!auth.ok) return auth.response;
  await connectDB();
  const { id } = await params;
  const target = await User.findById(id).lean();
  if (!target) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const perm = await canDeleteUser({
    actorId: auth.userId,
    actorRoles: auth.roles,
    targetId: String(target._id),
    targetRoles: target.roles ?? [],
  });
  if (!perm.allowed) {
    return NextResponse.json({ error: perm.reason }, { status: 403 });
  }

  await User.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
