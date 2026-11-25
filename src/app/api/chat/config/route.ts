import { authorizeApi } from "@/lib/api/guard";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { ChatWidget } from "@/lib/models/ChatWidget";

export async function GET() {
  await connectDB();
  const widget = await ChatWidget.findOne({ enabled: true })
    .sort({ updatedAt: -1 })
    .lean();
  return NextResponse.json(widget || null);
}

export async function PUT(req: NextRequest) {
  const auth = await authorizeApi("update");
  if (!auth.ok) return auth.response;
  await connectDB();
  try {
    const body = await req.json();
    const { _id, ...updateData } = body;

    if (_id) {
      const updated = await ChatWidget.findByIdAndUpdate(_id, updateData, {
        new: true,
        runValidators: true,
      }).lean();
      return NextResponse.json(updated);
    }

    const widget = await ChatWidget.findOneAndUpdate(
      { enabled: true },
      updateData,
      { new: true, runValidators: true, upsert: true }
    ).lean();
    return NextResponse.json(widget);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await authorizeApi("manage");
  if (!auth.ok) return auth.response;
  await connectDB();
  try {
    const body = await req.json();
    const { _id, ...data } = body;
    const widget = await ChatWidget.create(data);
    return NextResponse.json(widget, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
