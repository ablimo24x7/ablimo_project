import { authorizeApi } from "@/lib/api/guard";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Setting } from "@/lib/models/Setting";

export async function GET() {
  await connectDB();
  const items = await Setting.find().lean();
  // Convert key-value pairs to a single object for the frontend
  const settings: Record<string, any> = {};
  for (const item of items) {
    settings[item.key] = item.value;
  }
  return NextResponse.json(settings);
}

export async function PUT(req: NextRequest) {
  const auth = await authorizeApi("update");
  if (!auth.ok) return auth.response;
  await connectDB();
  try {
    const body = await req.json();
    // body is a key-value object like { siteTitle: "...", defaultSeo: {...} }
    for (const [key, value] of Object.entries(body)) {
      await Setting.findOneAndUpdate(
        { key },
        { key, value },
        { upsert: true, runValidators: true }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
