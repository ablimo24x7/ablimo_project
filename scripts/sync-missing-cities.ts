/**
 * Standalone script to synchronize any missing cities from the static dataset
 * into their respective Country documents in MongoDB, and seed their city
 * location page templates in locationpagetemplates for all locales (en-US, en-GB, ar).
 *
 * Usage: npx tsx scripts/sync-missing-cities.ts
 */
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import mongoose from "mongoose";
import { connectDB } from "../src/lib/db";
import { Country } from "../src/lib/models/Country";
import { COUNTRIES } from "../src/lib/locations";
import { locales, getDictionary } from "../src/app/[lang]/dictionaries";
import { buildCityTemplate } from "../src/components/section-library/presets/city-presets";

const countryAliases: Record<string, string> = {
  "united-arab-emirates": "uae",
  uae: "united-arab-emirates",
};

async function main() {
  console.log("Connecting to MongoDB...");
  await connectDB();
  console.log("Connected to MongoDB successfully.");

  const countryDocs = await Country.find({ status: { $ne: "archived" } });
  console.log(`Found ${countryDocs.length} country documents in database.`);

  const templateOps: any[] = [];
  const now = new Date();
  let totalCitiesAdded = 0;

  for (const countryDoc of countryDocs) {
    const staticCountry = COUNTRIES.find(
      (c) =>
        c.slug.toLowerCase() === countryDoc.slug.toLowerCase() ||
        c.code.toLowerCase() === countryDoc.code.toLowerCase() ||
        countryAliases[countryDoc.slug.toLowerCase()] === c.slug.toLowerCase() ||
        countryAliases[c.slug.toLowerCase()] === countryDoc.slug.toLowerCase()
    );

    if (!staticCountry) {
      console.log(`Skipping DB country with no static match: ${countryDoc.name} (${countryDoc.slug})`);
      continue;
    }

    const existingSlugs = new Set(
      (countryDoc.cities ?? []).map((c: any) => c.slug.toLowerCase())
    );

    const citiesToAdd = staticCountry.cities.filter(
      (sc) => !existingSlugs.has(sc.slug.toLowerCase())
    );

    if (citiesToAdd.length > 0) {
      console.log(`Country "${countryDoc.name}" is missing ${citiesToAdd.length} cities: ${citiesToAdd.map(c => c.name).join(", ")}`);
      const newCities = citiesToAdd.map((c) => ({
        slug: c.slug,
        name: c.name,
        nameAr: c.nameAr ?? "",
        countrySlug: countryDoc.slug,
        description: c.description ?? "",
        descriptionAr: c.descriptionAr ?? "",
        aliases: c.aliases ?? [],
        status: "published",
        airports: (c.airports ?? []).map((a) => ({
          slug: a.slug,
          name: a.name,
          nameAr: a.nameAr ?? "",
          iata: a.iata,
          citySlug: c.slug,
          status: "published",
        })),
        faqs: c.faqs ?? [],
        faqsAr: c.faqsAr ?? [],
        sections: [],
      }));

      await Country.updateOne(
        { _id: countryDoc._id },
        { $push: { cities: { $each: newCities } } }
      );

      countryDoc.cities = [...(countryDoc.cities ?? []), ...newCities];
      totalCitiesAdded += newCities.length;
      console.log(`Successfully added ${newCities.length} cities to "${countryDoc.name}" in DB.`);
    } else {
      console.log(`All ${staticCountry.cities.length} static cities are present in DB for "${countryDoc.name}".`);
    }

    // Build and prepare city templates for all cities in this country
    for (const city of countryDoc.cities ?? []) {
      if (!city?.slug) continue;
      for (const lang of locales) {
        const dict = await getDictionary(lang);
        const template = buildCityTemplate(countryDoc.slug, city.slug, dict);
        const refKeys = [
          `${countryDoc.slug}/${city.slug}`,
          `${staticCountry.slug}/${city.slug}`,
        ];
        const dedupedRefKeys = [...new Set(refKeys)];
        for (const refKey of dedupedRefKeys) {
          templateOps.push({
            updateOne: {
              filter: { pageType: "city", refKey, lang },
              update: {
                $setOnInsert: {
                  pageType: "city",
                  refKey,
                  lang,
                  template,
                  status: "published",
                  createdAt: now,
                  updatedAt: now,
                },
              },
              upsert: true,
            },
          });
        }
      }
    }
  }

  console.log(`Upserting ${templateOps.length} city location page templates across all locales...`);
  if (templateOps.length > 0 && mongoose.connection.db) {
    const result = await mongoose.connection.db
      .collection("locationpagetemplates")
      .bulkWrite(templateOps, { ordered: false });
    console.log(`Location page templates synced. Upserted: ${result.upsertedCount}, Untouched: ${templateOps.length - result.upsertedCount}`);
  }

  console.log(`Sync completed! Added ${totalCitiesAdded} missing cities to MongoDB countries.`);
  process.exit(0);
}

main().catch((err) => {
  console.error("Error during sync:", err);
  process.exit(1);
});
