import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Invitation } from "@/lib/models/Invitation";
import { User } from "@/lib/models/User";
import { hashPassword } from "@/lib/auth/password";
import { parseJsonBody } from "@/lib/api/errors";

/**
 * Public endpoint: redeems an invitation token and creates the account.
 * The invitee gets the link from the admin (no mailer in this project).
 */
export async function POST(req: NextRequest) {
  const body = await parseJsonBody(req);
  if (body instanceof NextResponse) return body;

  const { token, name, password } = body;
  if (!token || !name || !password) {
    return NextResponse.json(
      { error: "Invitation token, name and password are required" },
      { status: 400 }
    );
  }
  if (String(password).length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters" },
      { status: 400 }
    );
  }

  await connectDB();

  const tokenHash = createHash("sha256").update(String(token)).digest("hex");
  const invitation = await Invitation.findOne({ tokenHash });
  if (!invitation) {
    return NextResponse.json({ error: "Invalid invitation link" }, { status: 404 });
  }
  if (invitation.acceptedAt) {
    return NextResponse.json(
      { error: "This invitation has already been used" },
      { status: 410 }
    );
  }
  if (invitation.expiresAt && invitation.expiresAt.getTime() < Date.now()) {
    return NextResponse.json(
      { error: "This invitation has expired. Ask an administrator for a new one." },
      { status: 410 }
    );
  }

  const existing = await User.findOne({ email: invitation.email });
  if (existing) {
    return NextResponse.json(
      { error: "An account with this email already exists. Sign in instead." },
      { status: 409 }
    );
  }

  const passwordHash = await hashPassword(password);
  await User.create({
    name: String(name).trim(),
    email: invitation.email,
    passwordHash,
    roles: invitation.roles?.length ? invitation.roles : ["author"],
    isActive: true,
  });

  invitation.acceptedAt = new Date();
  await invitation.save();

  return NextResponse.json({ ok: true, email: invitation.email });
}
