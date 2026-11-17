import "dotenv/config";
import mongoose from "mongoose";
import { getDictionary } from "../src/app/[lang]/dictionaries";
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

  const qatarCities = [
    { slug: "doha", name: "Doha" },
    { slug: "lusail", name: "Lusail" },
    { slug: "al-wakrah", name: "Al Wakrah" },
    { slug: "al-khor", name: "Al Khor" },
  ];

  console.log("\n--- Seeding Qatar City Templates ---");
  for (const city of qatarCities) {
    const cityRefKeys = [`qatar/${city.slug}`];
    for (const lang of allLocales) {
      const dict = await getDictionary(lang as any);
      const template = buildCityTemplate("qatar", city.slug, dict);

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

  // Update Country document in DB
  console.log("\n--- Updating Countries Collection in DB for Qatar ---");
  const qatarDoc = await db.collection("countries").findOne({ slug: "qatar" });
  console.log("Existing Qatar doc found:", !!qatarDoc);

  for (const city of qatarCities) {
    const updateRes = await db.collection("countries").updateOne(
      {
        slug: "qatar",
        "cities.slug": city.slug,
      },
      {
        $set: {
          status: "published",
          "cities.$.status": "published",
        },
      }
    );
    if (updateRes.matchedCount === 0) {
      // If city not found inside cities array, push it
      await db.collection("countries").updateOne(
        { slug: "qatar" },
        {
          $set: { status: "published" },
          $push: {
            cities: {
              name: city.name,
              slug: city.slug,
              status: "published",
            } as any,
          },
        }
      );
      console.log(`Pushed new city ${city.slug} to Qatar`);
    } else {
      console.log(`Updated existing city ${city.slug} in Qatar: modified=${updateRes.modifiedCount}`);
    }
  }

  // Ensure Qatar country itself is published
  await db.collection("countries").updateOne(
    { slug: "qatar" },
    { $set: { status: "published" } }
  );

  // Verification of stored templates
  console.log("\n--- Verification of Stored Templates in DB ---");
  const stored = await db
    .collection("locationpagetemplates")
    .find({
      pageType: "city",
      refKey: { $in: ["qatar/doha", "qatar/lusail", "qatar/al-wakrah", "qatar/al-khor"] },
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

