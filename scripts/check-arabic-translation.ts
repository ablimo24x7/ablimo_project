/**
 * Live check of the Arabic translation builder (calls Google Translate).
 * Run with: npx tsx scripts/check-arabic-translation.ts
 */
import { buildArticleTranslations } from "../src/lib/article-translation";

const article = {
  title: "Airport Transfers in Saudi Arabia",
  excerpt: "Executive transfers across the Kingdom.",
  authorName: "Admin",
  archiveTag: "Control Room Archive: Riyadh",
  categoryLabel: "Travel Tips",
  bodyContent: "<p>Book a <strong>chauffeur</strong> at King Khalid International Airport.</p>",
  keyTakeawaysContent: "",
  finalThoughtsContent: "",
  seo_metadata: { metaTitle: "Airport Transfers | AB", metaDescription: "Premium transfers." },
  faqs: [{ q: "How fast is the transfer?", a: "Around 45 minutes." }],
  sections: [
    {
      id: "sec-1",
      type: "hero",
      variant: "background-content",
      order: 0,
      enabled: true,
      content: {
        eyebrow: "Capital Operations",
        title: "Mastering Mobility in Riyadh.",
        description: "<p>The nerve center of AB operations.</p>",
        sectionCta: { label: "Book Now", href: "#contact", style: "primary", icon: "Calendar" },
      },
      items: [{ id: "i1", label: "Explore Riyadh", href: "#fleet", style: "secondary" }],
      settings: { minHeight: "100vh" },
      appearance: { theme: "darker" },
    },
  ],
};

const manual = {
  title: "نقل المطار في المملكة العربية السعودية",
  "section.sec-1.content.title": "إتقان التنقل في الرياض",
};

async function main() {
  const result = await buildArticleTranslations(article, manual);

  console.log("\n── hand-written Arabic (never overwritten) ──");
  console.log(result.ar);

  console.log("\n── automatic translations ──");
  for (const [path, value] of Object.entries(result.autoAr ?? {})) {
    console.log(`${path}\n   → ${value}`);
  }

  console.log("\n── checks ──");
  const auto = result.autoAr ?? {};
  console.log("title is hand-written:", result.ar?.title === manual.title);
  console.log("hero title is hand-written:", result.ar?.["section.sec-1.content.title"] === manual["section.sec-1.content.title"]);
  console.log("excerpt was auto translated:", Boolean(auto.excerpt) && auto.excerpt !== article.excerpt);
  console.log("hero eyebrow was auto translated:", Boolean(auto["section.sec-1.content.eyebrow"]));
  console.log("cta href was NOT translated:", auto["section.sec-1.content.sectionCta.href"] === undefined);
  console.log("appearance background was NOT translated:", auto["section.sec-1.appearance.background"] === undefined);
}

main();
