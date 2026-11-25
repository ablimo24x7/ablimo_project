import { authorizeApi } from "@/lib/api/guard";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { hashPassword } from "@/lib/auth/password";
import { parseJsonBody } from "@/lib/api/errors";
import { canAssignRoles } from "@/lib/auth/governance";

export async function GET() {
  const auth = await authorizeApi("manage");
  if (!auth.ok) return auth.response;
  await connectDB();
  const items = await User.find().sort({ name: 1 }).lean();
  return NextResponse.json({ items: items.map(({ passwordHash, ...u }) => u) });
}

export async function POST(req: NextRequest) {
  const auth = await authorizeApi("manage");
  if (!auth.ok) return auth.response;
  await connectDB();
  const body = await parseJsonBody(req);
  if (body instanceof NextResponse) return body;

  const { name, email, password, roles } = body;
  if (!name || !email || !password) {
    return NextResponse.json({ error: "Name, email, password required" }, { status: 400 });
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) return NextResponse.json({ error: "Email already exists" }, { status: 409 });

  const assignedRoles: string[] = Array.isArray(roles) && roles.length ? roles : ["author"];
  const assignable = await canAssignRoles(auth.roles, assignedRoles);
  if (!assignable.allowed) {
    return NextResponse.json({ error: assignable.reason }, { status: 403 });
  }

  const passwordHash = await hashPassword(password);
  const user = await User.create({
    name,
    email: email.toLowerCase(),
    passwordHash,
    roles: assignedRoles,
  });

  const { passwordHash: _, ...safe } = user.toObject();
  return NextResponse.json(safe, { status: 201 });
}
