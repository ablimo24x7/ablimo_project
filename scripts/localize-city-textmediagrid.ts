/**
 * Data migration: localizes city article copy that is hardcoded for Riyadh.
 *
 * Per article it:
 *  - skips Arabic-locale articles (they carry their own translated copy)
 *  - requires a PageSection-style `sections` array containing a textMediaGrid
 *  - only rewrites when the textMediaGrid still contains "Riyadh"
 *    (protects hand-edited/localized sections; use --force to override)
 *  - regenerates the textMediaGrid from CITY_META for the article's city
 *  - token-substitutes Riyadh/Saudi references in all other sections
 *
 * Riyadh articles keep their original hand-written copy unless --include-riyadh.
 *
 * Usage: npx tsx scripts/localize-city-textmediagrid.ts [--dry-run] [--city=slug] [--force] [--include-riyadh]
 *
 *  --force         rewrite even when the textMediaGrid no longer contains "Riyadh"
 *                  (e.g. re-running after copy-generator fixes)
 *  --include-riyadh  also rewrite Riyadh articles (overrides their skip)
 */
import "dotenv/config";
import { connectDB } from "../src/lib/db";
import { Article } from "../src/lib/models/Article";
import { resolveCityMeta, localizeSectionsForCity } from "../src/lib/city-localization";

type Section = Record<string, unknown>;

function isPageSectionArray(sections: unknown): sections is Section[] {
  if (!Array.isArray(sections) || sections.length === 0) return false;
  const first = sections[0] as Record<string, unknown>;
  return (
    typeof first === "object" &&
    first !== null &&
    "type" in first &&
    "variant" in first &&
    "order" in first &&
    "enabled" in first
  );
}

function headingOf(section: Section): string {
  const content = section.content as Record<string, unknown> | undefined;
  return String(content?.heading || "");
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const force = process.argv.includes("--force");
  const includeRiyadh = process.argv.includes("--include-riyadh");
  const cityFilter = process.argv.find((a) => a.startsWith("--city="))?.split("=")[1];

  console.log(`Connecting to database...`);
  const db = await connectDB();
  if (!db) {
    console.error("Database connection unavailable (is USE_DATABASE=false?). Aborting.");
    process.exit(1);
  }

  const articles = await Article.find(cityFilter ? { citySlug: cityFilter } : {}).lean();
  console.log(`Found ${articles.length} articles${dryRun ? " (DRY RUN)" : ""}`);

  const stats = {
    localized: 0,
    skippedArabic: 0,
    skippedRiyadh: 0,
    alreadyLocalized: 0,
    noSections: 0,
    noTextMediaGrid: 0,
    noCityMeta: 0,
  };

  for (const article of articles) {
    const label = `${article.slug} [${article.locale}]`;

    if (article.locale === "ar") {
      stats.skippedArabic++;
      continue;
    }

    const sections = article.sections as unknown;
    if (!isPageSectionArray(sections)) {
      stats.noSections++;
      continue;
    }

    const grid = sections.find((s) => s.type === "textMediaGrid");
    if (!grid) {
      stats.noTextMediaGrid++;
      continue;
    }

    // Guard: only rewrite sections that still carry the Riyadh template copy.
    if (!force && !JSON.stringify(grid).includes("Riyadh")) {
      stats.alreadyLocalized++;
      continue;
    }

    const meta =
      resolveCityMeta(article.citySlug as string | undefined) ||
      resolveCityMeta(article.city as string | undefined);
    if (!meta) {
      stats.noCityMeta++;
      console.log(`  [SKIP] ${label}: no CITY_META entry for citySlug="${article.citySlug}"`);
      continue;
    }
    if (meta.slug === "riyadh" && !includeRiyadh) {
      stats.skippedRiyadh++;
      continue;
    }

    const next = localizeSectionsForCity(sections, meta);
    const newGrid = next.find((s) => s.type === "textMediaGrid");
    const newHeading = `${headingOf(newGrid || {})} ${String(
      (newGrid?.content as Record<string, unknown> | undefined)?.headingHighlight || ""
    )}`;

    if (dryRun) {
      console.log(`  [DRY] ${label} → ${meta.name}: "${newHeading.trim()}"`);
    } else {
      await Article.updateOne({ _id: article._id }, { $set: { sections: next } });
      console.log(`  [OK] ${label} → ${meta.name}: "${newHeading.trim()}"`);
    }
    stats.localized++;
  }

  console.log(`\nDone${dryRun ? " (DRY RUN — nothing written)" : ""}:`);
  console.log(`  localized:          ${stats.localized}`);
  console.log(`  skipped (arabic):   ${stats.skippedArabic}`);
  console.log(`  skipped (riyadh):   ${stats.skippedRiyadh}`);
  console.log(`  already localized:  ${stats.alreadyLocalized}`);
  console.log(`  no sections array:  ${stats.noSections}`);
  console.log(`  no textMediaGrid:   ${stats.noTextMediaGrid}`);
  console.log(`  no CITY_META entry: ${stats.noCityMeta}`);
  process.exit(0);
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
