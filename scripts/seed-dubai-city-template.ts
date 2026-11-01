import "dotenv/config";
import mongoose from "mongoose";
import { getDictionary, locales } from "../src/app/[lang]/dictionaries";
import { buildDubaiCitySections } from "../src/components/section-library/presets/city-presets";

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

  const refKeys = ["united-arab-emirates/dubai", "uae/dubai"];
  const now = new Date();

  const allLocales = ["en-US", "en-GB", "ar"] as const;
  for (const lang of allLocales) {
    const dict = await getDictionary(lang as any);
    const template = buildDubaiCitySections(dict);

    for (const refKey of refKeys) {
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
        `[${lang}] Template for ${refKey}: matched=${result.matchedCount}, modified=${result.modifiedCount}, upserted=${result.upsertedCount}`
      );
    }
  }

  // Also ensure country doc for UAE has Dubai present and published
  const countryUpdate = await db.collection("countries").updateOne(
    {
      $or: [{ slug: "uae" }, { slug: "united-arab-emirates" }],
      "cities.slug": "dubai",
    },
    {
      $set: {
        "cities.$.status": "published",
      },
    }
  );
  console.log(`Country doc update: matched=${countryUpdate.matchedCount}, modified=${countryUpdate.modifiedCount}`);

  // Verify stored docs
  const stored = await db
    .collection("locationpagetemplates")
    .find({ pageType: "city", refKey: { $in: refKeys } })
    .toArray();

  console.log("\nVerified stored Dubai template documents:");
  for (const doc of stored) {
    console.log(
      `- refKey: ${doc.refKey}, lang: ${doc.lang}, status: ${doc.status}, sections: ${doc.template?.length}`
    );
  }

  await mongoose.disconnect();
  console.log("\nDone! Disconnected from MongoDB.");
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
