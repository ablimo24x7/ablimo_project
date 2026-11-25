import "dotenv/config";
import mongoose from "mongoose";
import { getDictionary } from "../src/app/[lang]/dictionaries";
import { buildCountryTemplate } from "../src/components/section-library/presets/country-presets";
import { buildCityTemplate } from "../src/components/section-library/presets/city-presets";

function resolveUri(): string {
  let uri = process.env.MONGO_URI || process.env.MONGODB_URI || "";
  if (!uri) throw new Error("MONGO_URI / MONGODB_URI not set in environment");
  if (!uri.includes("/ablimo-db")) {
    const base = uri.split("?")[0].replace(/\/+$/, "");
    const params = uri.includes("?") ? "?" + uri.split("?")[1] : "";
    uri = `${base}/ablimo-db${params}`;
  }
  return uri;
}

async function main() {
  const uri = resolveUri();
  console.log("Connecting to MongoDB...");
  await mongoose.connect(uri, { dbName: "ablimo-db" });
  const db = mongoose.connection.db;
  if (!db) throw new Error("Database connection not established");

  console.log("Connected successfully to ablimo-db.");
  const now = new Date();
  const allLocales = ["en-US", "en-GB", "ar"] as const;

  // 1. Seed UAE Country Templates
  console.log("\n--- Seeding UAE Country Templates ---");
  const countryRefKeys = ["uae", "united-arab-emirates"];
  for (const lang of allLocales) {
    const dict = await getDictionary(lang as any);
    const template = buildCountryTemplate("uae", dict);

    for (const refKey of countryRefKeys) {
      const result = await db.collection("locationpagetemplates").updateOne(
        { pageType: "country", refKey, lang },
        {
          $set: {
            pageType: "country",
            refKey,
            lang,
            template,
            status: "published",
            updatedAt: now,
          },
          $setOnInsert: {
            createdAt: now,
          },
        },
        { upsert: true }
      );
      console.log(
        `[Country ${lang}] ${refKey}: matched=${result.matchedCount}, modified=${result.modifiedCount}, upserted=${result.upsertedCount}, sections=${template.length}`
      );
    }
  }

  // 2. Seed UAE Cities Templates (Dubai, Abu Dhabi, Sharjah)
  const uaeCities = [
    { slug: "dubai", name: "Dubai" },
    { slug: "abu-dhabi", name: "Abu Dhabi" },
    { slug: "sharjah", name: "Sharjah" },
    { slug: "ajman", name: "Ajman" },
    { slug: "al-ain", name: "Al Ain" },
    { slug: "ras-al-khaimah", name: "Ras Al Khaimah" },
  ];

  console.log("\n--- Seeding UAE City Templates ---");
  for (const city of uaeCities) {
    const cityRefKeys = [`uae/${city.slug}`, `united-arab-emirates/${city.slug}`];
    for (const lang of allLocales) {
      const dict = await getDictionary(lang as any);
      const template = buildCityTemplate("uae", city.slug, dict);

      for (const refKey of cityRefKeys) {
        const result = await db.collection("locationpagetemplates").updateOne(
          { pageType: "city", refKey, lang },
          {
            $set: {
              pageType: "city",
              refKey,
              lang,
              template,
              status: "published",
              updatedAt: now,
            },
            $setOnInsert: {
              createdAt: now,
            },
          },
          { upsert: true }
        );
        console.log(
          `[City ${lang}] ${refKey}: matched=${result.matchedCount}, modified=${result.modifiedCount}, upserted=${result.upsertedCount}, sections=${template.length}`
        );
      }
    }
  }

  // 3. Update Country document in DB
  console.log("\n--- Updating Countries Collection in DB ---");
  for (const city of uaeCities) {
    const updateRes = await db.collection("countries").updateOne(
      {
        $or: [{ slug: "uae" }, { slug: "united-arab-emirates" }],
        "cities.slug": city.slug,
      },
      {
        $set: {
          status: "published",
          "cities.$.status": "published",
        },
      }
    );
    console.log(`Country update for city ${city.slug}: matched=${updateRes.matchedCount}, modified=${updateRes.modifiedCount}`);
  }

  // Ensure country itself is published
  await db.collection("countries").updateMany(
    { $or: [{ slug: "uae" }, { slug: "united-arab-emirates" }] },
    { $set: { status: "published" } }
  );

  // 4. Verify stored templates
  console.log("\n--- Verification of Stored Templates in DB ---");
  const stored = await db
    .collection("locationpagetemplates")
    .find({
      $or: [
        { pageType: "country", refKey: { $in: countryRefKeys } },
        { pageType: "city", refKey: { $regex: /^(uae|united-arab-emirates)\/(dubai|abu-dhabi|sharjah)/ } },
      ],
      lang: "en-US",
    })
    .toArray();

  for (const doc of stored) {
    console.log(
      `✓ [${doc.pageType}] ${doc.refKey} (lang: ${doc.lang}): status=${doc.status}, sections=${doc.template?.length}`
    );
  }

  await mongoose.disconnect();
  console.log("\nCompleted successfully! Disconnected from MongoDB.");
}

main().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});

