/**
 * Data migration script: Migrates existing articles from old country/city
 * fields to new serviceSlug/countrySlug/citySlug/templateType fields.
 *
 * Usage: npx tsx scripts/migrate-articles.ts [--dry-run]
 */
import "dotenv/config";
import { connectDB } from "../src/lib/db";
import { Article } from "../src/lib/models/Article";

const COUNTRY_NAME_TO_SLUG: Record<string, string> = {
  "united arab emirates": "uae",
  "uae": "uae",
  "saudi arabia": "saudi-arabia",
  "qatar": "qatar",
  "bahrain": "bahrain",
  "kuwait": "kuwait",
  "oman": "oman",
};

const OLD_TEMPLATE_MAP: Record<string, string> = {
  "country": "service-country",
  "city": "service-city",
  "city-to-city": "service-city",
  "airport": "service-country",
};

const CITY_NAME_TO_SLUG: Record<string, string> = {
  "kuwait": "kuwait-city",
  "medina": "medina",
  "madinah": "medina",
  "mecca": "mecca",
  "makkah": "mecca",
  "al-ula": "alula",
};

function normalizeCountrySlug(name: string): string {
  const lower = name.toLowerCase().trim();
  return COUNTRY_NAME_TO_SLUG[lower] || lower.replace(/\s+/g, "-");
}

function normalizeCitySlug(name: string): string {
  const lower = name.toLowerCase().trim();
  if (CITY_NAME_TO_SLUG[lower]) return CITY_NAME_TO_SLUG[lower];
  return lower.replace(/\s+/g, "-");
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");

  console.log(`Connecting to database...`);
  await connectDB();

  // Find articles that have old fields but not new ones
  const filter = {
    $or: [
      { serviceSlug: { $in: ["", null] } },
      { countrySlug: { $in: ["", null] } },
    ],
  };

  const articles = await Article.find(filter).lean();
  console.log(`Found ${articles.length} articles to migrate${dryRun ? " (DRY RUN)" : ""}`);

  let migrated = 0;
  let skipped = 0;

  for (const article of articles) {
    const updates: Record<string, unknown> = {};

    // Map old templateType to new
    if (article.templateType && OLD_TEMPLATE_MAP[article.templateType]) {
      updates.templateType = OLD_TEMPLATE_MAP[article.templateType];
    } else if (article.templateType === "service-country" || article.templateType === "service-city") {
      // Already new format
    } else {
      updates.templateType = "service-country";
    }

    // Map country name to countrySlug
    if (article.country && !article.countrySlug) {
      updates.countrySlug = normalizeCountrySlug(article.country);
    }

    // Map city name to citySlug
    if (article.city && !article.citySlug) {
      updates.citySlug = normalizeCitySlug(article.city);
    }

    // Set templateType based on citySlug
    if (updates.citySlug || article.citySlug) {
      updates.templateType = "service-city";
    }

    // Set default serviceSlug if missing
    if (!article.serviceSlug) {
      updates.serviceSlug = "chauffeur-vip";
    }

    if (Object.keys(updates).length === 0) {
      skipped++;
      continue;
    }

    if (dryRun) {
      console.log(`  [DRY] ${article.slug}:`, updates);
    } else {
      await Article.updateOne({ _id: article._id }, { $set: updates });
      console.log(`  [OK] ${article.slug}:`, updates);
    }
    migrated++;
  }

  console.log(`\nDone. Migrated: ${migrated}, Skipped: ${skipped}`);
  process.exit(0);
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
