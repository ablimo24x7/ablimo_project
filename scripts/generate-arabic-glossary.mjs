import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dictDir = path.join(root, "src/app/[lang]/dictionaries");
const outFile = path.join(root, "src/lib/arabic-glossary.json");

const en = JSON.parse(fs.readFileSync(path.join(dictDir, "en-US.json"), "utf8"));
const ar = JSON.parse(fs.readFileSync(path.join(dictDir, "ar.json"), "utf8"));

const entries = new Map();
const conflicts = new Set();
let pairCount = 0;

const normalize = (s) => s.replace(/\s+/g, " ").trim();

function addCandidate(enRaw, arRaw) {
  if (typeof enRaw !== "string" || typeof arRaw !== "string") return;
  pairCount++;
  const key = normalize(enRaw);
  const value = normalize(arRaw);
  if (key.length < 3 || key.length > 70) return;
  if (key === value) return;
  if (/[{}]/.test(key)) return;
  if (/https?:|www\.|%[sd]|\$\d|\d+%/.test(key)) return;
  if (!/[A-Za-z]/.test(key)) return;
  if (!/[ء-ي]/.test(value)) return;
  if (entries.has(key)) {
    if (entries.get(key) !== value) conflicts.add(key);
    return;
  }
  entries.set(key, value);
}

function walk(enNode, arNode) {
  if (typeof enNode === "string" && typeof arNode === "string") {
    addCandidate(enNode, arNode);
    return;
  }
  if (Array.isArray(enNode) && Array.isArray(arNode)) {
    const len = Math.min(enNode.length, arNode.length);
    for (let i = 0; i < len; i++) walk(enNode[i], arNode[i]);
    return;
  }
  if (
    enNode &&
    arNode &&
    typeof enNode === "object" &&
    typeof arNode === "object"
  ) {
    for (const key of Object.keys(enNode)) {
      if (key in arNode) walk(enNode[key], arNode[key]);
    }
  }
}

walk(en, ar);
for (const key of conflicts) entries.delete(key);

const sorted = {};
for (const key of [...entries.keys()].sort((a, b) => a.localeCompare(b))) {
  sorted[key] = entries.get(key);
}

fs.writeFileSync(outFile, JSON.stringify(sorted, null, 2) + "\n", "utf8");
console.log(
  `arabic-glossary: wrote ${entries.size} entries to ${path.relative(root, outFile)} (${conflicts.size} ambiguous pairs dropped, ${pairCount} pairs scanned)`
);
