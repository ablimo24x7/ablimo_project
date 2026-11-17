/* Inspect countries collection city-level fields the location pages read:
   description, faqs, airports — to see if they match the new MD content.
   Run: node scripts/_check-city-entity-fields.mjs */
import "dotenv/config";
import mongoose from "mongoose";

function resolveUri() {
  let uri = process.env.MONGO_URI || process.env.MONGODB_URI || "";
  if (!uri.includes("/ablimo-db")) {
    const base = uri.split("?")[0].replace(/\/+$/, "");
    const params = uri.includes("?") ? "?" + uri.split("?")[1] : "";
    uri = `${base}/ablimo-db${params}`;
  }
  return uri;
}

await mongoose.connect(resolveUri(), { dbName: "ablimo-db" });
const db = mongoose.connection.db;

const countries = await db.collection("countries").find({}).toArray();

const target = process.argv[2] || "riyadh";
for (const c of countries) {
  const city = (c.cities || []).find((x) => x.slug === target);
  if (!city) continue;
  console.log(`country=${c.slug} city=${city.slug}`);
  console.log(`  name: ${city.name}`);
  console.log(`  description: ${(city.description || "(empty)").slice(0, 220)}`);
  console.log(`  faqs: ${(city.faqs || []).length}`);
  (city.faqs || []).forEach((f, i) => console.log(`    ${i + 1}. ${f.q}`));
  console.log(`  airports: ${(city.airports || []).length}`);
  (city.airports || []).forEach((a, i) => console.log(`    ${i + 1}. ${a.name} (${a.code || "-"})`));
}

console.log("\n=== city faq counts across all countries ===");
for (const c of countries) {
  for (const city of c.cities || []) {
    console.log(
      `${c.slug}/${city.slug}: faqs=${(city.faqs || []).length} airports=${
        (city.airports || []).length
      } desc=${city.description ? "Y" : "N"}`
    );
  }
}

await mongoose.disconnect();
