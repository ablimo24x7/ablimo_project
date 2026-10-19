import dns from "dns";
import mongoose from "mongoose";
import { getEnv } from "@/lib/env";

const BROKEN = new Set(["127.0.0.1", "::1", "localhost"]);
let dnsChecked = false;

async function ensureResolvableSrv() {
  if (dnsChecked || process.env.DNS_FIX === "0") return;
  dnsChecked = true;

  const servers = dns.getServers();
  const localhostOnly =
    servers.length === 0 ||
    servers.every((s) => BROKEN.has(s.toLowerCase()));
  if (!localhostOnly) return;

  try {
    await Promise.race([
      dns.promises.resolve("example.com", "A"),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("probe-timeout")), 2500),
      ),
    ]);
    return;
  } catch {
    // Local resolver is dead — fall back to public DNS for SRV lookups.
  }

  const candidates: string[] = [];
  if (process.platform === "win32") {
    try {
      const { execSync } = await import("child_process");
      const out = execSync("netsh interface ipv4 show dnsservers", {
        encoding: "utf8",
        timeout: 3000,
        windowsHide: true,
      });
      for (const ip of out.match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g) ?? []) {
        if (!BROKEN.has(ip)) candidates.push(ip);
      }
    } catch {
      // ignore
    }
  }
  candidates.push("1.1.1.1", "8.8.8.8", "9.9.9.9");
  dns.setServers([...new Set(candidates)]);
}

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
  await ensureResolvableSrv();
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
