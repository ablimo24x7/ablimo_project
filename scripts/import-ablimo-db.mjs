import dotenv from "dotenv";
import fs from "node:fs/promises";
import path from "node:path";
import mongoose from "mongoose";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const dataDirectory = path.resolve(process.cwd(), "src/data/ablimo-db");
const dryRun = process.argv.includes("--dry-run");

function getDatabaseName(uri) {
  const parsed = new URL(uri);
  const databaseName = decodeURIComponent(parsed.pathname.replace(/^\/+/, ""));
  return databaseName || "ablimo-db";
}

async function loadCollections() {
  const files = (await fs.readdir(dataDirectory))
    .filter((file) => file.endsWith(".json"))
    .sort();

  if (files.length === 0) {
    throw new Error(`No JSON collection files found in ${dataDirectory}`);
  }

  return Promise.all(
    files.map(async (file) => {
      const filePath = path.join(dataDirectory, file);
      const contents = await fs.readFile(filePath, "utf8");
      const documents = mongoose.mongo.BSON.EJSON.parse(contents);
      const collectionName = path.basename(file, ".json");

      if (!Array.isArray(documents)) {
        throw new Error(`${file} must contain a JSON array`);
      }

      const identifiers = new Set();
      for (const [index, document] of documents.entries()) {
        if (!document || typeof document !== "object" || document._id == null) {
          throw new Error(`${file} document ${index + 1} is missing _id`);
        }

        const identifier = mongoose.mongo.BSON.EJSON.stringify(document._id);
        if (identifiers.has(identifier)) {
          throw new Error(`${file} contains duplicate _id values`);
        }
        identifiers.add(identifier);
      }

      return { collectionName, documents };
    }),
  );
}

async function main() {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGO_URI or MONGODB_URI must be set in .env.local or .env");
  }
  if (process.env.USE_DATABASE === "false") {
    throw new Error("USE_DATABASE=false; refusing to import");
  }

  const collections = await loadCollections();
  const totalDocuments = collections.reduce(
    (total, { documents }) => total + documents.length,
    0,
  );

  if (dryRun) {
    for (const { collectionName, documents } of collections) {
      console.log(`${collectionName}: ${documents.length} documents`);
    }
    console.log(`Dry run: ${collections.length} collections, ${totalDocuments} documents`);
    return;
  }

  const databaseName = getDatabaseName(uri);
  await mongoose.connect(uri, { dbName: databaseName, bufferCommands: false });

  try {
    const database = mongoose.connection.db;
    if (!database) {
      throw new Error("MongoDB connection did not expose a database");
    }

    console.log(`Connected to database "${database.databaseName}"`);
    for (const { collectionName, documents } of collections) {
      if (documents.length === 0) {
        console.log(`${collectionName}: 0 documents (skipped)`);
        continue;
      }

      const collection = database.collection(collectionName);
      const result = await collection.bulkWrite(
        documents.map((document) => ({
          replaceOne: {
            filter: { _id: document._id },
            replacement: document,
            upsert: true,
          },
        })),
        { ordered: true },
      );
      const verifiedCount = await collection.countDocuments({
        _id: { $in: documents.map(({ _id }) => _id) },
      });
      if (verifiedCount !== documents.length) {
        throw new Error(
          `${collectionName} verification failed: expected ${documents.length}, found ${verifiedCount}`,
        );
      }

      console.log(
        `${collectionName}: ${documents.length} verified; ${result.upsertedCount} inserted, ${result.modifiedCount} updated`,
      );
    }
  } finally {
    await mongoose.disconnect();
  }
}

main().catch(async (error) => {
  console.error("Import failed:", error.message);
  await mongoose.disconnect();
  process.exitCode = 1;
});
