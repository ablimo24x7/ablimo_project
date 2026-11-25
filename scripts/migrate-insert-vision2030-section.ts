/**
 * Data migration script: inserts the "Vision 2030 Infrastructure"
 * textMediaGrid section into existing articles that use PageSection arrays.
 *
 * - Removes the old simplified mediaContent duplicate (heading contains "Vision 2030")
 * - Inserts the new section in its place (after serviceCards, before mediaContent)
 * - Reassigns each section's `order` to match its array index
 *
 * Usage: npx tsx scripts/migrate-insert-vision2030-section.ts [--dry-run]
 */
import "dotenv/config";
import { connectDB } from "../src/lib/db";
import { Article } from "../src/lib/models/Article";

type Section = Record<string, unknown>;

function genId(): string {
  return `sec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

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

function buildNewSection(): Section {
  return {
    id: genId(),
    type: "textMediaGrid",
    variant: "media-right",
    order: 0,
    enabled: true,
    content: {
      eyebrow: "Infrastructure Alignment",
      eyebrowIcon: "City",
      heading: "Powering Riyadh's",
      headingHighlight: "Vision 2030",
      headingAfter: "Corporate Ecosystem.",
      description:
        '<p class="mb-6 leading-relaxed">As the Kingdom undergoes unprecedented economic diversification under the <strong>Vision 2030</strong> mandate, the demands on Riyadh\'s corporate travel infrastructure have evolved exponentially. AB operates at the nexus of this transformation, providing highly secure, scalable, and meticulously managed executive mobility solutions for multinational corporations entering the Saudi market.</p>' +
        '<p class="mb-6 leading-relaxed">Our strategic dispatch capabilities are engineered specifically for the capital\'s premier economic hubs. We maintain a continuous, vetted presence within the <strong>King Abdullah Financial District (KAFD)</strong>, offering seamless, secure transitions between architectural marvels and corporate headquarters. For international delegations and foreign missions, our chauffeurs possess the necessary clearances to navigate the rigorous security protocols of the <strong>Diplomatic Quarter (DQ)</strong> with absolute discretion and efficiency.</p>' +
        '<p class="leading-relaxed">Beyond standard point-to-point transfers, our <em>As-Directed</em> hourly services provide global executives with the fluid mobility required to execute complex business roadshows across Riyadh\'s expanding urban footprint—from the historic Diriyah Gate developments to the high-tech corridors of northern Riyadh.</p>',
      items: [
        { id: genItemId(), icon: "BuildingShield", heading: "KAFD Operations", description: "Dedicated fleet positioning for immediate financial district deployments." },
        { id: genItemId(), icon: "Passport", heading: "DQ Protocol", description: "Vetted personnel trained in embassy and diplomatic security standards." },
      ],
      media: [
        { id: genItemId(), type: "image", column: "left", size: "tall", image: "https://images.unsplash.com/photo-1588726588629-19e48f7d9834?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", imageAlt: "KAFD Riyadh Architecture", overlay: "blue" },
        { id: genItemId(), type: "image", column: "left", size: "short", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop&q=80", imageAlt: "Executive Sedan Riyadh", overlay: "none", contain: true },
        { id: genItemId(), type: "stat", column: "right", size: "short", statValue: "100%", statLabel: "TGA Compliant" },
        { id: genItemId(), type: "image", column: "right", size: "tall", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", imageAlt: "Corporate Logistics Data", overlay: "gradient" },
      ],
    },
    items: [],
    settings: { mediaPosition: "right" },
    appearance: { theme: "darker", pattern: true, padding: "lg", border: true, textAlign: "left" },
  };
}

function headingOf(section: Section): string {
  const content = section.content as Record<string, unknown> | undefined;
  return String(content?.heading || "");
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");

  console.log(`Connecting to database...`);
  const db = await connectDB();
  if (!db) {
    console.error("Database connection unavailable (is USE_DATABASE=false?). Aborting.");
    process.exit(1);
  }

  const articles = await Article.find({}).lean();
  console.log(`Found ${articles.length} articles${dryRun ? " (DRY RUN)" : ""}`);

  let migrated = 0;
  let alreadyHasSection = 0;
  let notTargeted = 0;

  for (const article of articles) {
    const sections = article.sections as unknown;
    const label = `${article.slug} [${article.locale}]`;

    if (!isPageSectionArray(sections)) {
      notTargeted++;
      continue;
    }

    if (sections.some((s) => s.type === "textMediaGrid")) {
      alreadyHasSection++;
      continue;
    }

    const cardsIdx = sections.findIndex((s) => s.type === "serviceCards");
    const mediaIdx = sections.findIndex((s) => s.type === "mediaContent");
    const dupIdx = sections.findIndex(
      (s) => s.type === "mediaContent" && /vision\s*2030/i.test(headingOf(s))
    );

    let insertAt = -1;
    let removeAt = -1;

    if (dupIdx !== -1) {
      // Replace the simplified Vision 2030 mediaContent in place
      removeAt = dupIdx;
      insertAt = dupIdx;
    } else if (cardsIdx !== -1 && mediaIdx !== -1 && mediaIdx > cardsIdx) {
      // Insert between serviceCards and the first mediaContent
      insertAt = mediaIdx;
    } else {
      notTargeted++;
      continue;
    }

    const next: Section[] = sections.filter((_, i) => i !== removeAt);
    next.splice(insertAt, 0, buildNewSection());
    next.forEach((s, i) => {
      s.order = i;
    });

    if (dryRun) {
      console.log(`  [DRY] ${label}: insert textMediaGrid at index ${insertAt}${removeAt !== -1 ? ` (remove duplicate mediaContent at ${removeAt})` : ""}`);
    } else {
      await Article.updateOne({ _id: article._id }, { $set: { sections: next } });
      console.log(`  [OK] ${label}: inserted at index ${insertAt}${removeAt !== -1 ? " (removed duplicate)" : ""}`);
    }
    migrated++;
  }

  console.log(
    `\nDone. Migrated: ${migrated}, Already had section: ${alreadyHasSection}, Not targeted: ${notTargeted}`
  );
  process.exit(0);
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
