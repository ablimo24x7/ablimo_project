import * as dotenv from "dotenv";
import * as path from "path";
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
import mongoose from "mongoose";
import { Country } from "../src/lib/models/Country";
import { LocationPageTemplate } from "../src/lib/models/LocationPageTemplate";

async function main() {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!uri) throw new Error("No MONGODB_URI");
  await mongoose.connect(uri, { dbName: "ablimo-db" });

  console.log("=== COUNTRIES & CITIES IN DB ===");
  const locs = await Country.find({}).lean();
  for (const l of locs) {
    console.log(
      `${l.slug} (${l.name}) cities (${l.cities?.length || 0}):`,
      l.cities?.map((c: any) => `${c.slug} (${c.name})`)
    );
  }

  console.log("\n=== RIYADH EN-US TEMPLATE ===");
  const riyadh = await LocationPageTemplate.findOne({
    pageType: "city",
    refKey: "saudi-arabia/riyadh",
    lang: "en-US",
  }).lean();
  console.log(JSON.stringify(riyadh?.template, null, 2));

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("Error in inspect-city-db:", err);
  process.exit(1);
});
