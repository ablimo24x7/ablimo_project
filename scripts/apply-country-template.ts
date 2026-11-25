/**
 * Data migration: applies the Country Services page template
 * (Templates/Country → corporateCountryTemplate) to existing
 * service-country articles.
 *
 * Per article it:
 *  - only touches published, English-locale articles (Arabic articles,
 *    if any, carry their own translated copy — same rule as the city
 *    migration in localize-city-textmediagrid.ts)
 *  - skips articles already on contentMode "page-sections" (unless --force)
 *  - localizes the UAE-voice template via COUNTRY_META for the article's
 *    countrySlug (UAE keeps the raw base wording; unknown/missing country
 *    is skipped, never guessed)
 *  - preserves the article's curated FAQs by injecting them into the
 *    template's FAQ section items (question/answer) when present
 *  - sets contentMode to "page-sections" and replaces `sections` only —
 *    title, excerpt, SEO, bodyContent/keyTakeaways/finalThoughts,
 *    whatsappNumber and faqs stay untouched in the DB (revert-safe: switch
 *    the editor back to WYSIWYG to show the old copy again)
 *
 * Usage: npx tsx scripts/apply-country-template.ts [--dry-run] [--country=slug] [--force]
 */
import "dotenv/config";
import { connectDB } from "../src/lib/db";
import { Article } from "../src/lib/models/Article";
import { corporateCountryTemplate } from "../src/components/services/Templates/Country/country-section-defaults";
import { resolveCountryMeta, localizeSectionsForCountry } from "../src/lib/country-localization";

type Section = Record<string, unknown>;
type FaqLike = { q?: string; a?: string };

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const FORCE = args.includes("--force");
const COUNTRY_FILTER = args.find((a) => a.startsWith("--country="))?.slice("--country=".length);

function genItemId(): string {
  return `itm-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

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

function buildSections(countrySlug: string, countryName: string): Section[] | null {
  const meta = resolveCountryMeta(countrySlug) || resolveCountryMeta(countryName);
  if (!meta) return null;
  const base = corporateCountryTemplate.sections as unknown as Section[];
  if (meta.slug === "uae") return JSON.parse(JSON.stringify(base));
  return localizeSectionsForCountry(JSON.parse(JSON.stringify(base)), meta) as Section[];
}

function injectFaqs(sections: Section[], faqs: FaqLike[]): number {
  const curated = faqs.filter((f) => f && typeof f.q === "string" && f.q && typeof f.a === "string" && f.a);
  if (curated.length === 0) return 0;
  const faqSection = sections.find((s) => s.type === "faq");
  if (!faqSection) return 0;
  const content = (faqSection.content && typeof faqSection.content === "object" ? faqSection.content : {}) as Record<string, unknown>;
  faqSection.content = content;
  content.items = curated.map((f) => ({ id: genItemId(), question: f.q, answer: f.a }));
  return curated.length;
}

async function main() {
  await connectDB();

  const filter: Record<string, unknown> = {
    templateType: "service-country",
    status: "published",
    locale: "en",
  };
  if (!FORCE) filter.contentMode = { $ne: "page-sections" };
  if (COUNTRY_FILTER) filter.countrySlug = COUNTRY_FILTER;

  const articles = await Article.find(filter).select(
    "slug title countrySlug country contentMode sections faqs"
  ).lean();

  console.log(`${DRY_RUN ? "[dry-run] " : ""}candidates: ${articles.length}`);

  let updated = 0;
  let skipped = 0;
  let failed = 0;

  for (const raw of articles) {
    const a = raw as unknown as {
      slug: string; title: string; countrySlug?: string; country?: string;
      contentMode?: string; sections?: unknown; faqs?: FaqLike[];
    };
    try {
      const sections = buildSections(a.countrySlug || "", a.country || "");
      if (!sections || !isPageSectionArray(sections)) {
        console.log(`SKIP (no country meta) ${a.slug} [countrySlug="${a.countrySlug || ""}" country="${a.country || ""}"]`);
        skipped += 1;
        continue;
      }
      const faqsInjected = injectFaqs(sections, Array.isArray(a.faqs) ? a.faqs : []);
      if (DRY_RUN) {
        console.log(
          `WOULD UPDATE ${a.slug} — country=${resolveCountryMeta(a.countrySlug || a.country || "")?.slug ?? "?"}` +
            `, sections=${sections.length}, faqsInjected=${faqsInjected}, mode: ${a.contentMode} → page-sections`
        );
      } else {
        await Article.updateOne(
          { _id: (raw as unknown as { _id: unknown })._id },
          { $set: { contentMode: "page-sections", sections } }
        );
        console.log(`UPDATED ${a.slug} — sections=${sections.length}, faqsInjected=${faqsInjected}`);
      }
      updated += 1;
    } catch (e) {
      console.error(`FAIL ${a.slug}: ${(e as Error).message}`);
      failed += 1;
    }
  }

  console.log(`\ndone: ${updated} ${DRY_RUN ? "would-update" : "updated"}, ${skipped} skipped, ${failed} failed`);
  if (failed > 0) process.exitCode = 1;
}

main()
  .then(() => process.exit(process.exitCode ?? 0))
  .catch((e) => {
    console.error("ERR:", e.message);
    process.exit(1);
  });
