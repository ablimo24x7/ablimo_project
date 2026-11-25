import * as dotenv from "dotenv";
import * as path from "path";
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import mongoose from "mongoose";
import { Country } from "../src/lib/models/Country";
import { LocationPageTemplate } from "../src/lib/models/LocationPageTemplate";
import { buildUnifiedCitySections } from "../src/components/section-library/presets/city-presets";

async function main() {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!uri) throw new Error("MONGODB_URI is not set in environment or .env.local");

  console.log("Connecting to MongoDB Atlas...");
  await mongoose.connect(uri, { dbName: "ablimo-db" });
  console.log("Connected successfully!");

  // Clean up any test dummy templates like bahrain/xyz
  await LocationPageTemplate.deleteMany({
    pageType: "city",
    refKey: "bahrain/xyz",
  });

  const countries = await Country.find({}).lean();
  console.log(`Found ${countries.length} countries in database.`);

  const enDict = { metadata: { siteTitle: "AB.Limo" } } as any;
  const arDict = { metadata: { siteTitle: "إيه بي ليمو" } } as any;

  let totalUpdated = 0;

  for (const country of countries) {
    const countrySlug = country.slug;
    const cities = country.cities || [];
    console.log(`\nProcessing country: ${countrySlug} (${cities.length} cities)`);

    for (const city of cities) {
      const citySlug = city.slug;
      const refKeys = [`${countrySlug}/${citySlug}`];

      // Support UAE alias refKey
      if (countrySlug === "united-arab-emirates") {
        refKeys.push(`uae/${citySlug}`);
      }
      if (countrySlug === "kuwait" && citySlug === "kuwait-city") {
        refKeys.push("kuwait/kuwait");
      }

      const enSections = buildUnifiedCitySections(countrySlug, citySlug, enDict);
      const arSections = buildUnifiedCitySections(countrySlug, citySlug, arDict);

      for (const refKey of refKeys) {
        // 1. Update/Upsert en-US
        await LocationPageTemplate.collection.updateOne(
          { pageType: "city", refKey, lang: "en-US" },
          {
            $set: {
              pageType: "city",
              refKey,
              lang: "en-US",
              status: "published",
              template: enSections,
              updatedAt: new Date(),
            },
            $setOnInsert: { createdAt: new Date() },
          },
          { upsert: true }
        );

        // 2. Update/Upsert en-GB
        await LocationPageTemplate.collection.updateOne(
          { pageType: "city", refKey, lang: "en-GB" },
          {
            $set: {
              pageType: "city",
              refKey,
              lang: "en-GB",
              status: "published",
              template: enSections,
              updatedAt: new Date(),
            },
            $setOnInsert: { createdAt: new Date() },
          },
          { upsert: true }
        );

        // 3. Update/Upsert ar
        await LocationPageTemplate.collection.updateOne(
          { pageType: "city", refKey, lang: "ar" },
          {
            $set: {
              pageType: "city",
              refKey,
              lang: "ar",
              status: "published",
              template: arSections,
              updatedAt: new Date(),
            },
            $setOnInsert: { createdAt: new Date() },
          },
          { upsert: true }
        );

        totalUpdated += 3;
      }

      console.log(`  ✓ Synced city: ${citySlug} (refKeys: ${refKeys.join(", ")})`);
    }
  }

  console.log(`\nSuccessfully updated ${totalUpdated} city template documents across all locales!`);

  // Verify total count in DB
  const count = await LocationPageTemplate.countDocuments({ pageType: "city" });
  console.log(`Total city template documents currently in DB: ${count}`);

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB.");
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});

