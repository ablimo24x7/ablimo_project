import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { hashPassword } from "@/lib/auth/password";
import { parseJsonBody } from "@/lib/api/errors";

export async function GET() {
  await connectDB();
  const items = await User.find().sort({ name: 1 }).lean();
  return NextResponse.json({ items: items.map(({ passwordHash, ...u }) => u) });
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await parseJsonBody(req);
  if (body instanceof NextResponse) return body;

  const { name, email, password, roles } = body;
  if (!name || !email || !password) {
    return NextResponse.json({ error: "Name, email, password required" }, { status: 400 });
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) return NextResponse.json({ error: "Email already exists" }, { status: 409 });

  const passwordHash = await hashPassword(password);
  const user = await User.create({
    name,
    email: email.toLowerCase(),
    passwordHash,
    roles: roles || ["author"],
  });

  const { passwordHash: _, ...safe } = user.toObject();
  return NextResponse.json(safe, { status: 201 });
}
