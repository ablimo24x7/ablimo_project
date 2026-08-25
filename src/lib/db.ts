import mongoose from "mongoose";
import { getEnv } from "@/lib/env";

type Cached = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var _mongoose: Cached | undefined;
}

const cached: Cached = global._mongoose ?? { conn: null, promise: null };
global._mongoose = cached;

const DB_NAME = "ablimo-db";

export async function connectDB() {
  const { MONGO_URI, USE_DATABASE } = getEnv();

  if (USE_DATABASE === "false") {
    return null;
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    let uri = MONGO_URI;
    if (!uri.includes("/ablimo-db")) {
      const base = uri.split("?")[0].replace(/\/+$/, "");
      const params = uri.includes("?") ? "?" + uri.split("?")[1] : "";
      uri = `${base}/${DB_NAME}${params}`;
    }

    cached.promise = mongoose.connect(uri, {
      bufferCommands: false,
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
