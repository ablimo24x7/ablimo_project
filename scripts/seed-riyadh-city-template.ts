import * as dotenv from "dotenv";
import * as path from "path";
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import mongoose from "mongoose";
import { LocationPageTemplate } from "../src/lib/models/LocationPageTemplate";
import { buildRiyadhCitySections } from "../src/components/section-library/presets/city-presets";

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI not set");

  console.log("Connecting to MongoDB...");
  await mongoose.connect(uri, { dbName: "ablimo-db" });
  console.log("Connected to MongoDB!");

  const enSections = buildRiyadhCitySections({
    metadata: { siteTitle: "AB.Limo" }
  } as any);

  const arSections = buildRiyadhCitySections({
    metadata: { siteTitle: "إيه بي ليمو" }
  } as any);

  const refKey = "saudi-arabia/riyadh";

  console.log("Updating Riyadh location page template (en-US)...");
  await LocationPageTemplate.collection.updateMany(
    { refKey, lang: { $ne: "ar" } },
    {
      $set: {
        pageType: "city",
        refKey,
        status: "published",
        template: enSections,
        updatedAt: new Date(),
      },
    },
    { upsert: true }
  );

  console.log("Updating Riyadh location page template (ar)...");
  await LocationPageTemplate.collection.updateMany(
    { refKey, lang: "ar" },
    {
      $set: {
        pageType: "city",
        refKey,
        status: "published",
        template: arSections,
        updatedAt: new Date(),
      },
    },
    { upsert: true }
  );

  console.log("Riyadh city page template successfully seeded!");
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("Error seeding Riyadh template:", err);
  process.exit(1);
});

