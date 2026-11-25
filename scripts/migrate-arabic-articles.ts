/**
 * Migration script: folds the legacy per-locale Arabic articles into the
 * single-document model.
 *
 * Until now every English post had a duplicate `locale: "ar"` document with
 * Google-translated fields. Arabic now lives on the base document in
 * `translations.ar` (hand-written) and `translations.autoAr` (automatic), so
 * the duplicates have to go — otherwise the Arabic pages would keep serving
 * the stale copies and ignore the new editor.
 *
 * Usage:
 *   npx tsx scripts/migrate-arabic-articles.ts            # fold duplicates
 *   npx tsx scripts/migrate-arabic-articles.ts --dry-run  # report only
 *   npx tsx scripts/migrate-arabic-articles.ts --backfill  # also translate
 *                                                           # base posts that
 *                                                           # never had an
 *                                                           # Arabic copy
 */

import "dotenv/config";
import { connectDB } from "../src/lib/db";
import { Article } from "../src/lib/models/Article";
import { buildArticleTranslations } from "../src/lib/article-translation";
import type { TranslationMap } from "../src/lib/arabic-content";

const dryRun = process.argv.includes("--dry-run");
const backfill = process.argv.includes("--backfill");

/** Arabic values of the legacy duplicate, keyed by the new content path. */
function seedFromLegacy(legacy: Record<string, unknown>): TranslationMap {
  const seed: TranslationMap = {};
  const put = (path: string, value: unknown) => {
    if (typeof value === "string" && value.trim()) seed[path] = value;
  };

  put("title", legacy.title);
  put("excerpt", legacy.excerpt);
  put("bodyContent", legacy.bodyContent);
  put("keyTakeawaysContent", legacy.keyTakeawaysContent);
  put("finalThoughtsContent", legacy.finalThoughtsContent);

  const seo = (legacy.seo_metadata ?? {}) as Record<string, unknown>;
  put("seo.metaTitle", seo.metaTitle);
  put("seo.metaDescription", seo.metaDescription);

  const faqs = Array.isArray(legacy.faqs) ? (legacy.faqs as unknown[]) : [];
  faqs.forEach((faq, index) => {
    const entry = (faq ?? {}) as Record<string, unknown>;
    put(`faq.${index}.q`, entry.q);
    put(`faq.${index}.a`, entry.a);
  });

  return seed;
}

async function migrate() {
  console.log("Starting Arabic article migration...\n");
  await connectDB();

  const legacyDocs = await Article.find({ locale: "ar" }).lean();
  console.log(`Found ${legacyDocs.length} legacy Arabic articles\n`);

  let folded = 0;
  let orphaned = 0;
  let failed = 0;

  for (const legacy of legacyDocs) {
    const base = await Article.findOne({
      slug: legacy.slug,
      locale: { $ne: "ar" },
    }).lean();

    if (!base) {
      console.log(`  ORPHAN: no base article for "${legacy.slug}" — left untouched`);
      orphaned += 1;
      continue;
    }

    console.log(`  Folding: "${legacy.slug}"`);
    try {
      const baseTranslations = ((base as { translations?: { ar?: TranslationMap } }).translations ?? {});
      const translations = await buildArticleTranslations(
        base as unknown as Record<string, unknown>,
        baseTranslations.ar ?? {},
        seedFromLegacy(legacy as unknown as Record<string, unknown>)
      );

      if (dryRun) {
        folded += 1;
        continue;
      }

      await Article.updateOne(
        { _id: base._id },
        { $set: { translations } }
      );
      await Article.deleteOne({ _id: legacy._id });
      folded += 1;
    } catch (error) {
      console.error(`  FAILED: "${legacy.slug}" -`, error);
      failed += 1;
    }
  }

  if (backfill) {
    const bases = await Article.find({ locale: { $ne: "ar" } }).lean();
    console.log(`\nBackfilling ${bases.length} base articles...`);
    for (const base of bases) {
      const stored = (base as { translations?: { ar?: TranslationMap; autoAr?: TranslationMap } })
        .translations;
      const existing = stored?.autoAr ?? {};
      if (Object.keys(existing).length > 0) continue;
      console.log(`  Translating: "${base.slug}"`);
      try {
        const translations = await buildArticleTranslations(
          base as unknown as Record<string, unknown>,
          stored?.ar ?? {}
        );
        if (!dryRun) {
          await Article.updateOne({ _id: base._id }, { $set: { translations } });
        }
      } catch (error) {
        console.error(`  FAILED: "${base.slug}" -`, error);
      }
    }
  }

  console.log(`\nMigration complete${dryRun ? " (dry run)" : ""}:`);
  console.log(`  Folded: ${folded}`);
  console.log(`  Orphaned: ${orphaned}`);
  console.log(`  Failed: ${failed}`);
}

migrate()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
