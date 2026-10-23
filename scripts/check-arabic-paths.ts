/**
 * Audits which text fields of the real templates are picked up by the Arabic
 * translation path collector, and which are (correctly) skipped.
 *
 * Run with: npx tsx scripts/check-arabic-paths.ts
 */
import { CITY_TEMPLATE_PRESETS } from "../src/components/services/Templates/City";
import { COUNTRY_TEMPLATE_PRESETS } from "../src/components/services/Templates/Country";
import { TEMPLATE_PRESETS } from "../src/components/services/Templates/Services";
import { collectSectionTextPaths } from "../src/lib/arabic-content";
import { getDefinitionsForScope } from "../src/components/section-library/definitions";

/** Every string leaf of a node, with its path. */
function allStringPaths(node: unknown, base = ""): string[] {
  const out: string[] = [];
  const walk = (value: unknown, path: string) => {
    if (typeof value === "string") {
      out.push(path);
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((v, i) => walk(v, `${path}.${i}`));
      return;
    }
    if (value && typeof value === "object") {
      for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
        walk(v, path ? `${path}.${k}` : k);
      }
    }
  };
  walk(node, base);
  return out;
}

const presets = [
  ...CITY_TEMPLATE_PRESETS.map((p) => ({ name: `city:${p.name}`, sections: p.sections })),
  ...COUNTRY_TEMPLATE_PRESETS.map((p) => ({
    name: `country:${p.name}`,
    sections: p.sections as never,
  })),
  ...TEMPLATE_PRESETS.map((p) => ({ name: `service:${p.name}`, sections: p.sections })),
];

const skipped = new Map<string, number>();
const captured = new Map<string, number>();

for (const preset of presets) {
  for (const section of preset.sections as unknown as Array<Record<string, unknown>>) {
    const capturedPaths = new Set(collectSectionTextPaths(section));
    for (const path of allStringPaths(section)) {
      if (capturedPaths.has(path)) {
        captured.set(path, (captured.get(path) ?? 0) + 1);
      } else {
        skipped.set(path, (skipped.get(path) ?? 0) + 1);
        const value = path
          .split(".")
          .reduce<unknown>(
            (acc, key) =>
              acc && typeof acc === "object"
                ? (acc as Record<string, unknown>)[key]
                : undefined,
            section
          );
        const isTextish =
          /label|heading|title|description|text|label/i.test(path) &&
          typeof value === "string" &&
          !/^https?:/.test(value);
        if (isTextish) {
          console.log(
            `  SKIPPED TEXT "${section.type}": ${path} = ${JSON.stringify(value)}`
          );
        }
      }
    }
  }
}

console.log("── captured (translated) leaf keys ──");
console.log(
  [...captured.keys()]
    .map((p) => p.replace(/\.\d+/g, "[]"))
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort()
    .join("\n")
);

console.log("\n── skipped leaf keys ──");
console.log(
  [...skipped.keys()]
    .map((p) => p.replace(/\.\d+/g, "[]"))
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort()
    .join("\n")
);

console.log("\n── location scope definitions ──");
for (const scope of ["country", "city", "route"] as const) {
  const defs = getDefinitionsForScope(scope) as unknown as Array<{
    type: string;
    defaults: () => Record<string, unknown>;
  }>;
  console.log(`scope=${scope}`);
  for (const def of defs) {
    const section = def.defaults();
    const capturedPaths = new Set(collectSectionTextPaths(section));
    const all = allStringPaths(section);
    const missed = all.filter((p) => !capturedPaths.has(p));
    console.log(
      `  ${def.type}: ${capturedPaths.size} translated, ${missed.length} skipped` +
        (missed.length ? ` → ${missed.map((m) => m.replace(/\.\d+/g, "[]")).join(", ")}` : "")
    );
  }
}
