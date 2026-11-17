import "dotenv/config";
import mongoose from "mongoose";

async function check() {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI || "";
  const dbUri = uri.includes("/ablimo-db")
    ? uri
    : uri.split("?")[0].replace(/\/+$/, "") + "/ablimo-db" + (uri.includes("?") ? "?" + uri.split("?")[1] : "");

  await mongoose.connect(dbUri);
  const db = mongoose.connection.db;
  if (!db) {
    console.error("No db");
    process.exit(1);
  }

  const slugs = [
    "chauffeur-vip",
    "airport-transfers",
    "corporate-transportation",
    "event-transportation",
    "bus-coach-hire",
    "workforce-mobility",
    "tourism-transportation",
    "religious-tourism",
    "intercity-transfers",
  ];

  const docs = await db.collection("services").find({ slug: { $in: slugs } }).toArray();
  console.log("Found", docs.length, "services in DB:");
  for (const slug of slugs) {
    const d = docs.find((x) => x.slug === slug);
    if (!d) {
      console.log(`- ${slug}: NOT FOUND IN DB (uses dictionary/fallback)`);
    } else {
      console.log(
        `- ${slug}: title="${d.title}", pageSections=${d.pageSections?.length ?? 0}, sections=${d.sections?.length ?? 0}, status=${d.status}`
      );
    }
  }

  await mongoose.disconnect();
}

check().catch((err) => {
  console.error(err);
  process.exit(1);
});

