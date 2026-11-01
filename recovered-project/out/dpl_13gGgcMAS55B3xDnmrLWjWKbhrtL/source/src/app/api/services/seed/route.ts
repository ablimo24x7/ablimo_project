import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Service } from "@/lib/models/Service";
import {
  buildDefaultServiceDocs,
  isDatabaseEnabled,
} from "@/lib/services";

/**
 * Restores the bundled default services into the database. This is idempotent:
 * existing services are skipped (matched by slug).
 */
export async function POST() {
  if (!isDatabaseEnabled()) {
    return NextResponse.json(
      { error: "Database is disabled. Set USE_DATABASE=true to manage services." },
      { status: 400 }
    );
  }

  await connectDB();
  const docs = buildDefaultServiceDocs();
  let created = 0;
  let existing = 0;

  for (const doc of docs) {
    const found = await Service.findOne({ slug: doc.slug }).lean();
    if (found) {
      existing += 1;
      continue;
    }
    await Service.create(doc);
    created += 1;
  }

  return NextResponse.json({ ok: true, created, existing });
}