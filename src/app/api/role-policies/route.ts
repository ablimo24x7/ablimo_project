import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { RolePolicy } from "@/lib/models/RolePolicy";

export async function GET() {
  await connectDB();
  const items = await RolePolicy.find().sort({ role: 1 }).lean();
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const body = await req.json();
    const { role, permissions } = body;
    if (!role) return NextResponse.json({ error: "Role required" }, { status: 400 });

    const existing = await RolePolicy.findOne({ role: role.toLowerCase() });
    if (existing) {
      existing.permissions = permissions || [];
      await existing.save();
      return NextResponse.json(existing);
    }

    const policy = await RolePolicy.create({ role: role.toLowerCase(), permissions: permissions || [] });
    return NextResponse.json(policy, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
