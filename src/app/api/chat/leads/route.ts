import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Lead } from "@/lib/models/Lead";

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const channel = searchParams.get("channel");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "20", 10);

  const filter: Record<string, unknown> = {};
  if (status) filter.status = status;
  if (channel) filter.channel = channel;

  const [leads, total] = await Promise.all([
    Lead.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Lead.countDocuments(filter),
  ]);

  return NextResponse.json({ leads, total, page, limit });
}

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const body = await req.json();
    const { recaptchaToken, ...rest } = body;

    // Validate reCAPTCHA v3 token when present (contact form sends it; other forms may not yet).
    if (recaptchaToken !== undefined) {
      const secret = process.env.RECAPTCHA_SECRET_KEY;
      if (secret) {
        const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(recaptchaToken)}`,
        });
        const verifyData = await verifyRes.json();
        const score = typeof verifyData.score === "number" ? verifyData.score : 0;
        if (!verifyData.success || score < 0.5) {
          return NextResponse.json({ error: "reCAPTCHA verification failed" }, { status: 400 });
        }
      } else {
        console.warn("RECAPTCHA_SECRET_KEY not set — skipping reCAPTCHA validation");
      }
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] || "";
    const lead = await Lead.create({
      ...rest,
      ip,
      userAgent: req.headers.get("user-agent") || "",
      referrer: req.headers.get("referer") || "",
    });
    return NextResponse.json(lead, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Unknown error" }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  await connectDB();
  try {
    const body = await req.json();
    const { id, ...updateData } = body;
    if (!id) {
      return NextResponse.json({ error: "id required" }, { status: 400 });
    }
    const lead = await Lead.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).lean();
    return NextResponse.json(lead);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Unknown error" }, { status: 400 });
  }
}
