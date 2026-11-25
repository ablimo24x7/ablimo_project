import "dotenv/config";
import mongoose from "mongoose";
import fs from "fs";

async function dumpServices() {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI || "";
  const dbUri = uri.includes("/ablimo-db")
    ? uri
    : uri.split("?")[0].replace(/\/+$/, "") + "/ablimo-db" + (uri.includes("?") ? "?" + uri.split("?")[1] : "");

  await mongoose.connect(dbUri);
  const db = mongoose.connection.db;

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

  const docs = await db!.collection("services").find({ slug: { $in: slugs } }).toArray();

  fs.writeFileSync("scripts/dumped_services.json", JSON.stringify(docs, null, 2), "utf8");
  console.log("Successfully dumped all 9 services to scripts/dumped_services.json");
  await mongoose.disconnect();
}

dumpServices().catch(console.error);

