import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Invitation } from "@/lib/models/Invitation";
import { generateInvitationToken } from "@/lib/auth/token";
import { parseJsonBody } from "@/lib/api/errors";

export async function GET() {
  await connectDB();
  const items = await Invitation.find({ acceptedAt: null, expiresAt: { $gt: new Date() } }).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await parseJsonBody(req);
  if (body instanceof NextResponse) return body;

  const { email, roles } = body;
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

  const existing = await Invitation.findOne({ email: email.toLowerCase(), acceptedAt: null });
  if (existing) {
    return NextResponse.json({ email: existing.email, message: "Pending invitation exists" }, { status: 200 });
  }

  const { token, tokenHash } = generateInvitationToken();
  const invitation = await Invitation.create({
    email: email.toLowerCase(),
    roles: roles || ["author"],
    token: tokenHash,
    invitedBy: "admin",
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return NextResponse.json({ email: invitation.email, token, message: "Invitation created" }, { status: 201 });
}
