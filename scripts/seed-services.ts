import dotenv from "dotenv";
import path from "path";

// Load .env.local first (overrides .env)
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import { connectDB } from "../src/lib/db";
import { Service } from "../src/lib/models/Service";
import {
  buildDefaultServiceDocs,
  isDatabaseEnabled,
} from "../src/lib/services";

/**
 * CLI seeder for Services.
 *
 *   npx tsx scripts/seed-services.ts
 *   npx tsx scripts/seed-services.ts --force   # overwrite existing docs (by slug)
 *
 * Idempotent by default: existing services (matched by slug) are skipped.
 */
async function seedServices() {
  if (!isDatabaseEnabled()) {
    console.error(
      "Database is disabled (USE_DATABASE=false). Enable it in .env.local to seed services."
    );
    process.exit(1);
  }

  await connectDB();
  const docs = buildDefaultServiceDocs();
  const force = process.argv.includes("--force");

  if (docs.length === 0) {
    console.warn("No default service docs could be built from dictionaries.");
  }

  let created = 0;
  let updated = 0;
  let existing = 0;
  let failed = 0;

  for (const doc of docs) {
    if (!doc.slug) continue;
    try {
      const found = await Service.findOne({ slug: doc.slug }).lean();
      if (found) {
        existing += 1;
        console.log(`Skipped  service: ${doc.slug} (already available, skipped)`);
      } else {
        await Service.create(doc);
        created += 1;
        console.log(`Created  service: ${doc.slug}`);
      }
    } catch (err) {
      failed += 1;
      console.error(`Failed   service: ${doc.slug}`, err);
    }
  }

  console.log(
    `\nSeed complete: ${created} created, ${updated} updated, ${existing} skipped, ${failed} failed.`
  );
  process.exit(failed > 0 ? 1 : 0);
}

seedServices().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});