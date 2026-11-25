/* Seeds inter-city routes: adds missing reverse directions and full UAE top-city mesh. Idempotent. */
require("dotenv").config({ path: ".env" });
const mongoose = require("mongoose");

const UAE_CITIES = [
  "dubai",
  "abu-dhabi",
  "sharjah",
  "ajman",
  "ras-al-khaimah",
  "al-ain",
];

const UAE_DISTANCES = {
  "abu-dhabi|dubai": ["140 km", "1h 30m"],
  "dubai|sharjah": ["30 km", "30m"],
  "dubai|ras-al-khaimah": ["100 km", "1h 00m"],
  "ajman|dubai": ["35 km", "30m"],
  "al-ain|dubai": ["130 km", "1h 30m"],
  "abu-dhabi|al-ain": ["150 km", "1h 30m"],
  "abu-dhabi|sharjah": ["125 km", "1h 30m"],
  "abu-dhabi|ajman": ["150 km", "1h 45m"],
  "abu-dhabi|ras-al-khaimah": ["250 km", "2h 30m"],
  "ajman|sharjah": ["15 km", "20m"],
  "ras-al-khaimah|sharjah": ["80 km", "1h 00m"],
  "al-ain|sharjah": ["140 km", "1h 45m"],
  "ajman|ras-al-khaimah": ["90 km", "1h 10m"],
  "ajman|al-ain": ["155 km", "1h 45m"],
  "al-ain|ras-al-khaimah": ["160 km", "1h 45m"],
};

// Other countries: add reverse direction for existing pairs (distance/duration reused).
// Handled automatically below by mirroring any one-way pair already in the DB.

function pairKey(a, b) {
  return [a, b].sort().join("|");
}

(async () => {
  let uri = process.env.MONGO_URI || process.env.MONGODB_URI || "";
  if (!uri.includes("/ablimo-db")) {
    const base = uri.split("?")[0].replace(/\/+$/, "");
    const params = uri.includes("?") ? "?" + uri.split("?")[1] : "";
    uri = `${base}/ablimo-db${params}`;
  }
  await mongoose.connect(uri, { dbName: "ablimo-db" });
  const db = mongoose.connection.db;
  const col = db.collection("locationroutes");
  let added = 0;

  // 1) Fix legacy "kuwait" slug -> "kuwait-city"
  const kwFix = await col.updateMany(
    { $or: [{ fromCity: "kuwait" }, { toCity: "kuwait" }] },
    [
      {
        $set: {
          fromCity: {
            $cond: [{ $eq: ["$fromCity", "kuwait"] }, "kuwait-city", "$fromCity"],
          },
          toCity: {
            $cond: [{ $eq: ["$toCity", "kuwait"] }, "kuwait-city", "$toCity"],
          },
        },
      },
    ]
  );
  if (kwFix.modifiedCount) {
    console.log(`Fixed kuwait -> kuwait-city on ${kwFix.modifiedCount} route(s)`);
    added += kwFix.modifiedCount;
  }

  // 2) Full UAE mesh between top cities (both directions)
  for (let i = 0; i < UAE_CITIES.length; i++) {
    for (let j = 0; j < UAE_CITIES.length; j++) {
      const a = UAE_CITIES[i];
      const b = UAE_CITIES[j];
      if (a === b) continue;
      const [distance, duration] = UAE_DISTANCES[pairKey(a, b)] || ["", ""];
      if (!distance) continue;
      const res = await col.updateOne(
        { fromCity: a, toCity: b },
        {
          $setOnInsert: {
            fromCity: a,
            toCity: b,
            fromCityName: "",
            toCityName: "",
            distance,
            duration,
            countrySlug: "uae",
            status: "published",
          },
        },
        { upsert: true }
      );
      if (res.upsertedCount) {
        console.log(`Added ${a} -> ${b} (${distance}, ${duration})`);
        added++;
      }
    }
  }

  // 3) Mirror every one-way pair already in the DB (other countries)
  const all = await col.find({ status: { $ne: "archived" } }).toArray();
  for (const r of all) {
    const rev = await col.findOne({ fromCity: r.toCity, toCity: r.fromCity });
    if (!rev) {
      await col.updateOne(
        { fromCity: r.toCity, toCity: r.fromCity },
        {
          $setOnInsert: {
            fromCity: r.toCity,
            toCity: r.fromCity,
            fromCityName: r.toCityName || "",
            toCityName: r.fromCityName || "",
            distance: r.distance || "",
            duration: r.duration || "",
            countrySlug: r.countrySlug || "",
            status: "published",
          },
        },
        { upsert: true }
      );
      console.log(`Mirrored ${r.toCity} -> ${r.fromCity}`);
      added++;
    }
  }

  console.log(`\nTotal added/updated: ${added}`);
  const final = await col.countDocuments();
  console.log(`Total routes in DB: ${final}`);
  await mongoose.disconnect();
})().catch((e) => {
  console.error("ERR", e.message);
  process.exit(1);
});
