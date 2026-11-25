import "dotenv/config";
import mongoose from "mongoose";

async function check() {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI || "";
  const dbUri = uri.includes("/ablimo-db")
    ? uri
    : uri.split("?")[0].replace(/\/+$/, "") + "/ablimo-db" + (uri.includes("?") ? "?" + uri.split("?")[1] : "");

  await mongoose.connect(dbUri);
  const db = mongoose.connection.db;

  const doc = await db!.collection("services").findOne({ slug: "chauffeur-vip" });
  console.log("chauffeur-vip sections:");
  doc?.pageSections?.forEach((s: any, idx: number) => {
    console.log(`[${idx}] type=${s.type}, variant=${s.variant}`);
    console.log("content keys:", Object.keys(s.content || {}));
    if (s.items) console.log("items count:", s.items.length);
  });

  await mongoose.disconnect();
}
check();

