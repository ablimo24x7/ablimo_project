/**
 * One-shot: replace the derived (Ajman-copied) Al Ain + Ras Al Khaimah entries
 * in client-city-data.ts with real data parsed from their own MD files.
 *
 * Run:  npx tsx scripts/_gen-al-ain-rak.ts [--write]
 */
import * as fs from "fs";
import * as path from "path";
import { parseCityMd } from "./lib/parse-city-md";

const MD_DIR = path.resolve(process.cwd(), "Locations-Content-md");
const TARGET = path.resolve(
  process.cwd(),
  "src/components/section-library/presets/client-city-data.ts"
);
const WRITE = process.argv.includes("--write");

const JOBS: Array<{ constName: string; key: string; file: string; name: string }> = [
  {
    constName: "alAinCityData",
    key: "al-ain",
    file: "www.ab.limo-locations-uae-al-ain.md",
    name: "Al Ain",
  },
  {
    constName: "rasAlKhaimahCityData",
    key: "ras-al-khaimah",
    file: "www.ab.limo-locations-uae-ras-al-khaimah.md",
    name: "Ras Al Khaimah",
  },
];

function toTs(obj: unknown, indent = 2): string {
  const pad = " ".repeat(indent);
  const json = JSON.stringify(obj, null, 2);
  // re-indent one level so the literal nests inside `const x: ClientCityData = {`
  return json
    .split("\n")
    .map((line, i) => (i === 0 ? line : pad + line))
    .join("\n");
}

const src = fs.readFileSync(TARGET, "utf8");
const lines = src.split("\n");

// locate `export const CLIENT_CITY_DATA`
const exportIdx = lines.findIndex((l) =>
  l.startsWith("export const CLIENT_CITY_DATA")
);
if (exportIdx < 0) throw new Error("CLIENT_CITY_DATA not found");

// locate the two derived entries
const entryIdx: Record<string, number> = {};
for (const job of JOBS) {
  const re = new RegExp(`^\\s*"${job.key}":\\s*(createDerivedCityData\\(|${job.constName},)`);
  const idx = lines.findIndex((l) => re.test(l));
  if (idx < 0) throw new Error(`entry for ${job.key} not found`);
  entryIdx[job.key] = idx;
}

const blocks: string[] = [];
for (const job of JOBS) {
  const md = fs.readFileSync(path.join(MD_DIR, job.file), "utf8");
  const data = parseCityMd(md, { citySlug: job.key, cityName: job.name });

  // drop fields that are not part of ClientCityData (excess-property errors)
  delete (data as unknown as Record<string, unknown>).heroImage;
  for (const v of data.vehicles) delete (v as unknown as Record<string, unknown>)._image;
  // imageIndex must point at a real .jpg in the folder
  for (const v of data.vehicles) {
    if (!v.imageIndex) throw new Error(`${job.key}: vehicle ${v.category} has no imageIndex`);
  }
  // MD image refs are folder-relative (`www.ab.../image8.jpg`);
  // the builder expects site-absolute `/locations/www.ab.../image8.jpg`.
  const absolutize = (p?: string) =>
    p && !p.startsWith("/") ? `/locations/${p}` : p;
  if (data.airportInfo.image)
    data.airportInfo.image = absolutize(data.airportInfo.image)!;
  if (data.coverageImage) data.coverageImage = absolutize(data.coverageImage)!;

  const flags: string[] = [];
  if (!data.imageFolder) flags.push("NO-FOLDER");
  if (!data.vehicles.length) flags.push("NO-VEHICLES");
  if (!data.faqs.length) flags.push("NO-FAQ");
  if (!data.airportInfo.bullets.length) flags.push("NO-BULLETS");
  console.log(
    `${job.key.padEnd(18)} v=${data.vehicles.length} j=${data.journeys.length} s=${data.services.length} f=${data.faqs.length} c=${data.coverageGroups.length} b=${data.airportInfo.bullets.length} folder=${data.imageFolder} ${flags.join(",") || "ok"}`
  );
  if (flags.length) throw new Error(`${job.key}: ${flags.join(",")}`);

  blocks.push(
    `const ${job.constName}: ClientCityData = ${toTs(data)};\n`
  );
}

if (!WRITE) {
  console.log("\n[dry-run] pass --write to modify client-city-data.ts");
  console.log(blocks.join("\n").slice(0, 1500));
  process.exit(0);
}

// 1. remove any previous generated block for these consts
for (const job of JOBS) {
  const start = lines.findIndex((l) =>
    l.startsWith(`const ${job.constName}: ClientCityData = {`)
  );
  if (start >= 0) {
    let depth = 0;
    let end = -1;
    for (let i = start; i < lines.length; i++) {
      for (const ch of lines[i]) {
        if (ch === "{") depth++;
        else if (ch === "}") depth--;
      }
      if (depth === 0 && i > start) { end = i; break; }
    }
    if (end < 0) throw new Error(`unterminated block for ${job.constName}`);
    lines.splice(start, end - start + 1); // drop old block (+ its blank line later)
    if (lines[start]?.trim() === "") lines.splice(start, 1);
    break; // indices shifted — recompute on next pass
  }
}
// (repeat for the second job after indices shifted)
for (const job of JOBS) {
  const start = lines.findIndex((l) =>
    l.startsWith(`const ${job.constName}: ClientCityData = {`)
  );
  if (start < 0) continue;
  let depth = 0;
  let end = -1;
  for (let i = start; i < lines.length; i++) {
    for (const ch of lines[i]) {
      if (ch === "{") depth++;
      else if (ch === "}") depth--;
    }
    if (depth === 0 && i > start) { end = i; break; }
  }
  if (end < 0) throw new Error(`unterminated block for ${job.constName}`);
  lines.splice(start, end - start + 1);
  if (lines[start]?.trim() === "") lines.splice(start, 1);
}

// re-locate entries (indices may have shifted)
for (const job of JOBS) {
  const re = new RegExp(`^\\s*"${job.key}":\\s*(createDerivedCityData\\(|${job.constName},)`);
  const idx = lines.findIndex((l) => re.test(l));
  if (idx < 0) throw new Error(`entry for ${job.key} not found after cleanup`);
  entryIdx[job.key] = idx;
}

// 2. replace the derived entries with const references
for (const job of JOBS) {
  lines[entryIdx[job.key]] = `  "${job.key}": ${job.constName},`;
}

// 3. insert the const declarations just before the CLIENT_CITY_DATA export
const exportIdx2 = lines.findIndex((l) =>
  l.startsWith("export const CLIENT_CITY_DATA")
);
if (exportIdx2 < 0) throw new Error("CLIENT_CITY_DATA not found after cleanup");
const insertion = blocks.join("\n");
const out = [
  ...lines.slice(0, exportIdx2),
  insertion,
  ...lines.slice(exportIdx2),
].join("\n");

fs.writeFileSync(TARGET, out, "utf8");
console.log(`\nWROTE ${TARGET}`);
