import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Subscriber } from "@/lib/models/Subscriber";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Newsletter subscription (blog "Corporate Mobility Briefing").
 * Idempotent: subscribing twice returns 200 without creating a duplicate
 * and without revealing whether the address already existed.
 */
export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as {
      email?: unknown;
      locale?: unknown;
    } | null;

    const email = String(body?.email ?? "").trim().toLowerCase();
    if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const locale =
      typeof body?.locale === "string" && body.locale ? body.locale.slice(0, 10) : "en";

    await connectDB();
    await Subscriber.updateOne(
      { email },
      { $setOnInsert: { email, locale, source: "blog" } },
      { upsert: true }
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("newsletter subscribe failed:", error);
    return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
  }
}
