/* Seeds locationPageTemplates for all locales (en-US, en-GB, ar):
   country + per-city + route templates from the dict-parameterized
   builders. Idempotent — $setOnInsert only, so re-runs never overwrite
   operator-edited templates. Run: npx tsx scripts/seed-location-templates.js */
import "dotenv/config";
import mongoose from "mongoose";
import { getDictionary, locales } from "@/app/[lang]/dictionaries";
import { buildCountryTemplate } from "@/components/section-library/presets/country-presets";
import { buildCityTemplate } from "@/components/section-library/presets/city-presets";
import { buildRouteTemplate } from "@/components/section-library/presets/route-presets";

function resolveUri() {
  let uri = process.env.MONGO_URI || process.env.MONGODB_URI || "";
  if (!uri.includes("/ablimo-db")) {
    const base = uri.split("?")[0].replace(/\/+$/, "");
    const params = uri.includes("?") ? "?" + uri.split("?")[1] : "";
    uri = `${base}/ablimo-db${params}`;
  }
  return uri;
}

function upsertOp(pageType, refKey, lang, template) {
  const now = new Date();
  return {
    updateOne: {
      filter: { pageType, refKey, lang },
      update: {
        $setOnInsert: {
          pageType,
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
  };
}

async function main() {
  const uri = resolveUri();
  if (!uri) throw new Error("MONGO_URI / MONGODB_URI not set in environment");
  await mongoose.connect(uri, { dbName: "ablimo-db" });
  const db = mongoose.connection.db;

  const countries = (await db.collection("countries").find({}).toArray()).filter(
    (c) => c.slug && (!c.status || c.status === "published")
  );
  if (countries.length === 0) throw new Error("No published country docs found");

  const ops = [];
  const cityCountByCountry = {};

  for (const lang of locales) {
    const dict = await getDictionary(lang);
    for (const country of countries) {
      ops.push(upsertOp("country", country.slug, lang, buildCountryTemplate(country.slug, dict)));
      const cities = country.cities ?? [];
      cityCountByCountry[country.slug] = cities.length;
      for (const city of cities) {
        if (!city?.slug) continue;
        ops.push(
          upsertOp(
            "city",
            `${country.slug}/${city.slug}`,
            lang,
            buildCityTemplate(country.slug, city.slug, dict)
          )
        );
      }
      ops.push(upsertOp("route", country.slug, lang, buildRouteTemplate(country.slug, dict)));
    }
  }

  const result = await db
    .collection("locationpagetemplates")
    .bulkWrite(ops, { ordered: false });

  console.log(
    `Upserted ${ops.length} template docs (${countries.length} countries, ` +
      `${Object.values(cityCountByCountry).reduce((a, b) => a + b, 0)} cities, ` +
      `${locales.length} locales) — created ${result.upsertedCount}, ` +
      `existing left untouched ${ops.length - result.upsertedCount}`
  );
  console.log("Cities per country:", cityCountByCountry);

  const counts = await db
    .collection("locationpagetemplates")
    .aggregate([
      {
        $group: {
          _id: { pageType: "$pageType", lang: "$lang" },
          docs: { $sum: 1 },
          nonEmpty: {
            $sum: {
              $cond: [
                { $and: [{ $isArray: "$template" }, { $gt: [{ $size: "$template" }, 0] }] },
                1,
                0,
              ],
            },
          },
        },
      },
      { $sort: { "_id.pageType": 1, "_id.lang": 1 } },
    ])
    .toArray();
  console.table(
    counts.map((c) => ({
      pageType: c._id.pageType,
      lang: c._id.lang,
      docs: c.docs,
      nonEmpty: c.nonEmpty,
    }))
  );

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
