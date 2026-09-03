/**
 * Migration script: Creates Arabic versions of all English articles.
 *
 * Usage: npx tsx scripts/migrateArticlesToArabic.ts
 */

import "dotenv/config";
import { connectDB } from "../src/lib/db";
import { Article } from "../src/lib/models/Article";
import { googleTranslate, googleTranslateHtml } from "../src/lib/googleTranslate";

async function migrate() {
  console.log("Starting Arabic article migration...\n");
  await connectDB();

  // Get all English articles
  const englishArticles = await Article.find({
    locale: { $in: ["en", "en-US", "en-GB"] },
    status: "published",
  }).lean();

  console.log(`Found ${englishArticles.length} English articles\n`);

  let created = 0;
  let skipped = 0;
  let failed = 0;

  for (const enArticle of englishArticles) {
    const arSlug = enArticle.slug;

    // Check if Arabic version already exists
    const existingAr = await Article.findOne({
      slug: arSlug,
      locale: "ar",
    }).lean();

    if (existingAr) {
      console.log(`  SKIP: Arabic version already exists for "${enArticle.title}"`);
      skipped++;
      continue;
    }

    console.log(`  Translating: "${enArticle.title}"...`);

    try {
      // Translate all text fields
      const [title, excerpt, bodyContent, keyTakeawaysContent, finalThoughtsContent] =
        await Promise.all([
          googleTranslate(enArticle.title || "", "ar"),
          googleTranslate(enArticle.excerpt || "", "ar"),
          googleTranslateHtml(enArticle.bodyContent || "", "ar"),
          googleTranslateHtml(enArticle.keyTakeawaysContent || "", "ar"),
          googleTranslateHtml(enArticle.finalThoughtsContent || "", "ar"),
        ]);

      // Translate FAQs
      const translatedFaqs = await Promise.all(
        (enArticle.faqs || []).map(async (faq: any) => ({
          q: await googleTranslate(faq.q || "", "ar"),
          a: await googleTranslate(faq.a || "", "ar"),
        }))
      );

      // Translate SEO metadata
      const metaTitle = enArticle.seo_metadata?.metaTitle
        ? await googleTranslate(enArticle.seo_metadata.metaTitle, "ar")
        : "";
      const metaDescription = enArticle.seo_metadata?.metaDescription
        ? await googleTranslate(enArticle.seo_metadata.metaDescription, "ar")
        : "";

      // Create Arabic article
      const arArticle = await Article.create({
        ...enArticle,
        _id: undefined, // Let MongoDB generate new ID
        title,
        excerpt,
        bodyContent,
        keyTakeawaysContent,
        finalThoughtsContent,
        faqs: translatedFaqs,
        seo_metadata: {
          ...enArticle.seo_metadata,
          metaTitle,
          metaDescription,
        },
        locale: "ar",
        date: enArticle.date,
        status: "published",
        createdAt: undefined,
        updatedAt: undefined,
      });

      console.log(`  OK: Created Arabic article "${title}" (${arArticle._id})`);
      created++;

      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`  FAILED: "${enArticle.title}" -`, error);
      failed++;
    }
  }

  console.log(`\nMigration complete:`);
  console.log(`  Created: ${created}`);
  console.log(`  Skipped: ${skipped}`);
  console.log(`  Failed: ${failed}`);
}

migrate().catch(console.error);
