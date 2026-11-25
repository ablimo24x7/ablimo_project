/* Compare Locations-Content-md/*.md against CLIENT_CITY_DATA / CLIENT_COUNTRY_DATA in source.
   Run: node scripts/_check-md-vs-data.mjs */
import * as fs from "fs";
import * as path from "path";

const mdDir = path.resolve(process.cwd(), "Locations-Content-md");
const citySrc = fs.readFileSync(
  path.resolve(process.cwd(), "src/components/section-library/presets/client-city-data.ts"),
  "utf8"
);
const countrySrc = fs.readFileSync(
  path.resolve(process.cwd(), "src/components/section-library/presets/client-country-data.ts"),
  "utf8"
);

const files = fs.readdirSync(mdDir).filter((f) => f.endsWith(".md"));

// map md filename -> expected data key
function keyFor(file) {
  const base = file.replace(/^www\.ab\.limo-locations-/, "").replace(/\.md$/, "");
  return base; // e.g. "saudi-arabia-riyadh", "uae", "oman1"
}

function stripMd(s) {
  return s
    .replace(/\*\*/g, "")
    .replace(/\\\[|\\\]/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/[#>`*_]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const results = [];
for (const f of files) {
  const raw = fs.readFileSync(path.join(mdDir, f), "utf8");
  const h1 = (raw.match(/^# \*{0,2}(.+?)\*{0,2}$/m) || [, ""])[1];
  const h1Clean = stripMd(h1);
  // first paragraph after h1
  const lines = raw.split("\n");
  const h1Idx = lines.findIndex((l) => l.startsWith("# "));
  let firstPara = "";
  for (let i = h1Idx + 1; i < lines.length; i++) {
    const t = lines[i].trim();
    if (t && !t.startsWith("!") && !t.startsWith("[")) {
      firstPara = stripMd(t);
      break;
    }
  }
  const h2s = [...raw.matchAll(/^## \*{0,2}(.+?)\*{0,2}$/gm)].map((m) => stripMd(m[1]));
  const faqCount = [...raw.matchAll(/^### \*{0,2}How |^### \*{0,2}What |^### \*{0,2}Can |^### \*{0,2}Does |^### \*{0,2}Are |^### \*{0,2}Do /gm)].length;

  const key = keyFor(f);
  // does H1 exist anywhere in sources?
  const inCity = citySrc.includes(h1Clean);
  const inCountry = countrySrc.includes(h1Clean);
  const paraInCity = firstPara ? citySrc.includes(firstPara.slice(0, 60)) : null;
  const paraInCountry = firstPara ? countrySrc.includes(firstPara.slice(0, 60)) : null;

  results.push({
    file: f,
    key,
    h1: h1Clean,
    inCityData: inCity,
    inCountryData: inCountry,
    paraInCity,
    paraInCountry,
    h2Count: h2s.length,
    faqCount,
    h2s: h2s.join(" | "),
  });
}

for (const r of results) {
  const where = r.inCityData ? "CITY" : r.inCountryData ? "COUNTRY" : "*** NOT FOUND ***";
  console.log(
    `${r.file.padEnd(55)} -> ${where.padEnd(16)} h1="${r.h1}" paraMatch=${r.paraInCity ?? r.paraInCountry} h2=${r.h2Count} faq~${r.faqCount}`
  );
}

console.log("\n=== H2 structure per file (first 3) ===");
for (const r of results.slice(0, 3)) console.log(r.file, "\n  ", r.h2s);
