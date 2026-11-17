/**
 * Sync city pages from the client content (CLIENT_CITY_DATA, which is the
 * Locations-Content-md content) into MongoDB.
 *
 *   - builds the FULL 12-section layout via buildKsaCitySections()
 *   - writes locationpagetemplates for en-US + en-GB (all refKey aliases)
 *   - syncs the city entity faqs (the FAQ section + FAQ JSON-LD read those)
 *   - strips every price from city pages (en + ar templates)
 *
 * Run:  npx tsx scripts/sync-city-templates-from-md.ts [--dry]
 */
import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import mongoose from "mongoose";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { LocationPageTemplate } from "@/lib/models/LocationPageTemplate";
import {
  buildKsaCitySections,
  CLIENT_CITY_DATA,
  type ClientCityData,
} from "@/components/section-library/presets/client-city-data";
import type { SectionInstance } from "@/components/section-library/types";

const DRY = process.argv.includes("--dry");
const MD_DIR = path.resolve(process.cwd(), "Locations-Content-md");

/** country slug → MD file prefix */
const MD_PREFIX: Record<string, string> = {
  "united-arab-emirates": "uae",
  "saudi-arabia": "saudi-arabia",
  qatar: "qatar",
};

/** extra refKey aliases that may exist in locationpagetemplates */
const REFKEY_ALIASES: Record<string, string[]> = {
  "united-arab-emirates": ["uae"],
};

// ── price removal ────────────────────────────────────────────────
function scrubPrice(value: string): string {
  return value
    // "From [SAR price]" / "From [Confirm: SAR price]" / "From [AED price] · [Confirm] hours"
    .replace(/\bfrom\s*[:\-]?\s*\[[^\]]*\]/gi, "")
    // "From AED 350" / "From SAR 1,200"
    .replace(/\bfrom\s+[A-Z]{3}\s*[\d,.]+(?:\s*[A-Za-z]+)?/gi, "")
    // leftover placeholders
    .replace(/\[[^\]]*\bprice\b[^\]]*\]/gi, "")
    // editor placeholders: bare `[Confirm]` / `\[Confirm\]`
    .replace(/\\?\[Confirm\\?\]/gi, "")
    .replace(/\s*[·|]?\s*\[Confirm\]\s*hours?/gi, "")
    // "Typical model: or similar [Confirm]" — no marquee model named
    .replace(/^typical model:\s*or similar\.?$/i, "")
    .replace(/^or similar\.?$/i, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([.,])/g, "$1")
    .trim()
    // leftover fragments: "· hours", "hours", "· minutes" (price was removed)
    .replace(/^[·|]\s*/, "")
    .replace(/^(hours?|hrs?|minutes?|mins?|days?)\.?$/i, "")
    .trim();
}

/** Recursively remove prices from a section tree. */
function scrubTree(node: unknown): unknown {
  if (typeof node === "string") return scrubPrice(node);
  if (Array.isArray(node)) return node.map(scrubTree);
  if (node && typeof node === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(node as Record<string, unknown>)) {
      out[k] = scrubTree(v);
    }
    // paired price fields: if the latin price disappeared, drop the arabic one too
    if (
      typeof out.price === "string" &&
      out.price === "" &&
      typeof out.priceAr === "string" &&
      out.priceAr !== ""
    ) {
      out.priceAr = "";
    }
    if (typeof out.priceText === "string" && out.priceText === "") {
      // subtext must be absent so the component renders nothing
      out.priceText = "";
    }
    return out;
  }
  return node;
}

// ── MD sanity counters (report only) ─────────────────────────────
function mdCounts(raw: string) {
  const segs = raw.split(/\n(?=## )/);
  const seg = (i: number) => segs[i] ?? "";
  const count = (s: string, re: RegExp) => (s.match(re) ?? []).length;
  return {
    vehicles: count(seg(1), /^### /gm),
    journeys: count(seg(2), /^### /gm),
    services: count(seg(3), /^- /gm),
    faqs: count(seg(7), /^### /gm),
    coverage: count(seg(5), /^### /gm),
    lines: raw.split("\n").length,
  };
}

function mdFileFor(countrySlug: string, citySlug: string): string | null {
  const prefix = MD_PREFIX[countrySlug];
  if (!prefix) return null;
  const file = path.join(MD_DIR, `www.ab.limo-locations-${prefix}-${citySlug}.md`);
  return fs.existsSync(file) ? file : null;
}

function resolveUri(): string {
  let uri = process.env.MONGO_URI || process.env.MONGODB_URI || "";
  if (!uri.includes("/ablimo-db")) {
    const base = uri.split("?")[0].replace(/\/+$/, "");
    const params = uri.includes("?") ? "?" + uri.split("?")[1] : "";
    uri = `${base}/ablimo-db${params}`;
  }
  return uri;
}

async function main() {
  const uri = resolveUri();
  if (!uri) throw new Error("MONGO_URI / MONGODB_URI not set");
  await mongoose.connect(uri, { dbName: "ablimo-db" });
  const db = mongoose.connection.db!;
  const tplCol = db.collection("locationpagetemplates");
  const countryCol = db.collection("countries");

  const dictEnUs = await getDictionary("en-US");
  const homeLabel = dictEnUs.countries?.breadcrumb?.home || "Home";
  const rootLabel = dictEnUs.countries?.breadcrumb?.countries || "Locations";

  const countries = await countryCol.find({}).toArray();
  let tplWritten = 0;
  let faqWritten = 0;
  let skipped = 0;

  console.log("\n=== city sync report ===");
  console.log(
    "city".padEnd(34),
    "MD(v/j/s/f/c)".padEnd(16),
    "DATA(v/j/s/f/c)".padEnd(17),
    "sections"
  );

  for (const country of countries) {
    const countrySlug = country.slug as string;
    for (const city of country.cities ?? []) {
      const citySlug = city.slug as string;
      const mdFile = mdFileFor(countrySlug, citySlug);
      const data = CLIENT_CITY_DATA[citySlug] as ClientCityData | undefined;

      if (!mdFile) {
        if (data) skipped++;
        continue;
      }
      if (!data) {
        console.log(`  !! ${countrySlug}/${citySlug}: MD exists but no CLIENT_CITY_DATA`);
        skipped++;
        continue;
      }

      const sections = scrubTree(
        buildKsaCitySections(data, homeLabel, rootLabel)
      ) as SectionInstance[];

      const mc = mdCounts(fs.readFileSync(mdFile, "utf8"));
      const dc = {
        vehicles: data.vehicles?.length ?? 0,
        journeys: data.journeys?.length ?? 0,
        services: data.services?.length ?? 0,
        faqs: data.faqs?.length ?? 0,
        coverage: data.coverageGroups?.length ?? 0,
      };
      const flag =
        mc.vehicles !== dc.vehicles ||
        mc.faqs !== dc.faqs ||
        dc.vehicles === 0 ||
        dc.faqs === 0
          ? "  <-- CHECK"
          : "";
      console.log(
        `${countrySlug}/${citySlug}`.padEnd(34),
        `${mc.vehicles}/${mc.journeys}/${mc.services}/${mc.faqs}/${mc.coverage}`.padEnd(16),
        `${dc.vehicles}/${dc.journeys}/${dc.services}/${dc.faqs}/${dc.coverage}`.padEnd(17),
        `${sections.length}${flag}`
      );

      if (DRY) continue;

      // ── templates (en-US + en-GB, every refKey alias) ──
      const refKeys = [
        `${countrySlug}/${citySlug}`,
        ...(REFKEY_ALIASES[countrySlug] ?? []).map((a) => `${a}/${citySlug}`),
      ];
      for (const refKey of refKeys) {
        for (const lang of ["en-US", "en-GB"]) {
          await tplCol.updateOne(
            { pageType: "city", refKey, lang },
            {
              $set: {
                pageType: "city",
                refKey,
                lang,
                template: sections,
                status: "published",
              },
              $setOnInsert: { createdAt: new Date() },
            },
            { upsert: true }
          );
          tplWritten++;
        }
      }

      // ── entity FAQs (FAQ section + FAQ JSON-LD read these) ──
      const mdFaqs = (data.faqs ?? [])
        .map((f) => ({ q: scrubPrice(f.q), a: scrubPrice(f.a) }))
        .filter((f) => f.q && f.a);
      if (mdFaqs.length > 0) {
        const existing = (city.faqs ?? []) as Array<{ q: string; a: string }>;
        const same =
          existing.length === mdFaqs.length &&
          existing.every((f, i) => f.q === mdFaqs[i].q && f.a === mdFaqs[i].a);
        if (!same) {
          await countryCol.updateOne(
            { _id: country._id, "cities.slug": citySlug },
            { $set: { "cities.$.faqs": mdFaqs } }
          );
          faqWritten++;
        }
      }
      // fill an empty meta description from the client copy
      if (!city.description && data.description) {
        await countryCol.updateOne(
          { _id: country._id, "cities.slug": citySlug },
          { $set: { "cities.$.description": data.description } }
        );
      }
    }
  }

  // ── strip prices from EVERY existing city template (incl. ar) ──
  let priceFixed = 0;
  if (!DRY) {
    const allCityTpls = await tplCol.find({ pageType: "city" }).toArray();
    for (const doc of allCityTpls) {
      const before = JSON.stringify(doc.template);
      const after = JSON.stringify(scrubTree(doc.template));
      if (before !== after) {
        await tplCol.updateOne(
          { _id: doc._id },
          { $set: { template: JSON.parse(after) } }
        );
        priceFixed++;
      }
    }
  }

  console.log(
    `\n${DRY ? "[dry-run] " : ""}templates written: ${tplWritten}, city FAQs updated: ${faqWritten}, existing templates de-priced: ${priceFixed}, skipped (no MD): ${skipped}`
  );

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
