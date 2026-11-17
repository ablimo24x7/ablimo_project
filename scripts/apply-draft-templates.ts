import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import mongoose from "mongoose";
import { LocationPageTemplate } from "../src/lib/models/LocationPageTemplate";

interface LocationDraftDocument {
  pageType: "city" | "country" | "route";
  refKey: string;
  countrySlug?: string;
  citySlug?: string;
  path?: string;
  layoutName?: string;
  description?: string;
  exportedAt?: string;
  templates: {
    "en-US"?: any[];
    "en-GB"?: any[];
    ar?: any[];
    [lang: string]: any[] | undefined;
  };
}

interface ServiceDraftDocument {
  pageType: "service";
  slug: string;
  title: string;
  subtitle?: string;
  desc?: string;
  heroImage?: string;
  breadcrumb?: string;
  features?: any[];
  cardsHeading?: string;
  cardsDesc?: string;
  cards?: any[];
  sections?: any[];
  faqs?: any[];
  ctaTitle?: string;
  ctaDesc?: string;
  ctaLabel?: string;
  ctaHref?: string;
  pageSections?: any[];
  seo?: any;
  status?: string;
  showInMenu?: boolean;
  order?: number;
  locale?: string;
  exportedAt?: string;
}

// Find all .json draft files recursively in a directory
function getDraftFiles(dir: string): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;

  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getDraftFiles(fullPath));
    } else if (file.endsWith(".json")) {
      results.push(fullPath);
    }
  }
  return results;
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");

  // Parse filters
  let targetFile: string | null = null;
  let targetService: string | null = null;
  let targetCity: string | null = null;
  let targetCountry: string | null = null;
  const isServicesOnly = args.includes("--services");
  const isLocationsOnly = args.includes("--locations");
  const isAll = args.includes("--all");

  for (const arg of args) {
    if (arg.startsWith("--file=")) targetFile = arg.split("=")[1];
    else if (arg.startsWith("--service=")) targetService = arg.split("=")[1];
    else if (arg.startsWith("--city=")) targetCity = arg.split("=")[1];
    else if (arg.startsWith("--country=")) targetCountry = arg.split("=")[1];
  }

  const draftsBaseDir = path.resolve(process.cwd(), "drafts");
  let fileList: string[] = [];

  if (targetFile) {
    const absPath = path.resolve(process.cwd(), targetFile);
    if (!fs.existsSync(absPath)) {
      throw new Error(`Target draft file does not exist: ${absPath}`);
    }
    fileList = [absPath];
  } else if (targetService) {
    const svcPath = path.join(draftsBaseDir, "services", `${targetService}.json`);
    if (!fs.existsSync(svcPath)) {
      throw new Error(`Service draft file does not exist: ${svcPath}`);
    }
    fileList = [svcPath];
  } else if (isServicesOnly) {
    fileList = getDraftFiles(path.join(draftsBaseDir, "services"));
  } else if (isLocationsOnly) {
    fileList = getDraftFiles(path.join(draftsBaseDir, "locations"));
  } else {
    // Default or --all: scan all drafts
    fileList = getDraftFiles(draftsBaseDir);
  }

  // Filter by city or country if provided
  if (targetCity) {
    fileList = fileList.filter((f) => path.basename(f, ".json").toLowerCase() === targetCity?.toLowerCase());
  }
  if (targetCountry) {
    fileList = fileList.filter((f) => f.toLowerCase().includes(path.sep + targetCountry?.toLowerCase() + path.sep));
  }

  // Deduplicate files if any
  fileList = Array.from(new Set(fileList));

  if (fileList.length === 0) {
    console.log("No matching draft files found.");
    return;
  }

  console.log(`Found ${fileList.length} draft file(s) to process.`);
  if (dryRun) {
    console.log("[DRY RUN MODE] No changes will be written to the database.\n");
  }

  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!uri && !dryRun) {
    throw new Error("MONGODB_URI is not set in environment or .env.local");
  }

  const dbUri = uri
    ? uri.includes("/ablimo-db")
      ? uri
      : uri.split("?")[0].replace(/\/+$/, "") + "/ablimo-db" + (uri.includes("?") ? "?" + uri.split("?")[1] : "")
    : "";

  let db: mongoose.mongo.Db | null = null;

  if (!dryRun) {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(dbUri);
    db = mongoose.connection.db!;
    console.log("Connected successfully!\n");
  }

  let totalUpdated = 0;
  let serviceCount = 0;
  let locationCount = 0;

  for (const filePath of fileList) {
    const rawContent = fs.readFileSync(filePath, "utf-8");
    const doc = JSON.parse(rawContent);

    // ==========================================
    // A. SERVICE DRAFT
    // ==========================================
    if (doc.pageType === "service" || (!doc.pageType && doc.slug && doc.title)) {
      const sDraft = doc as ServiceDraftDocument;
      console.log(`[Service] Applying draft: ${sDraft.slug} ("${sDraft.title}")`);

      if (!dryRun && db) {
        await db.collection("services").updateOne(
          { slug: sDraft.slug },
          {
            $set: {
              slug: sDraft.slug,
              title: sDraft.title,
              subtitle: sDraft.subtitle || "",
              desc: sDraft.desc || "",
              heroImage: sDraft.heroImage || "",
              breadcrumb: sDraft.breadcrumb || "",
              features: sDraft.features || [],
              cardsHeading: sDraft.cardsHeading || "",
              cardsDesc: sDraft.cardsDesc || "",
              cards: sDraft.cards || [],
              sections: sDraft.sections || [],
              faqs: sDraft.faqs || [],
              ctaTitle: sDraft.ctaTitle || "",
              ctaDesc: sDraft.ctaDesc || "",
              ctaLabel: sDraft.ctaLabel || "",
              ctaHref: sDraft.ctaHref || "",
              pageSections: sDraft.pageSections || [],
              seo: sDraft.seo || {},
              status: sDraft.status || "published",
              showInMenu: sDraft.showInMenu !== false,
              order: sDraft.order ?? 0,
              locale: sDraft.locale || "en",
              updatedAt: new Date(),
            },
            $setOnInsert: { createdAt: new Date() },
          },
          { upsert: true }
        );
      }

      serviceCount++;
      totalUpdated++;
      console.log(`  ✓ Applied service: ${sDraft.slug}`);
      continue;
    }

    // ==========================================
    // B. LOCATION DRAFT (city, country, route)
    // ==========================================
    if (doc.pageType === "city" || doc.pageType === "country" || doc.pageType === "route") {
      const lDraft = doc as LocationDraftDocument;
      const pageType = lDraft.pageType;
      const countrySlug = lDraft.countrySlug || lDraft.refKey.split("/")[0];
      const citySlug = lDraft.citySlug || (pageType === "city" ? lDraft.refKey.split("/")[1] : undefined);
      const refKeys = [lDraft.refKey];

      // Handle aliases
      if (countrySlug === "united-arab-emirates" || lDraft.refKey.startsWith("united-arab-emirates")) {
        const alias = lDraft.refKey.replace("united-arab-emirates", "uae");
        if (!refKeys.includes(alias)) refKeys.push(alias);
      }
      if (lDraft.refKey === "united-arab-emirates") {
        if (!refKeys.includes("uae")) refKeys.push("uae");
      }
      if (countrySlug === "kuwait" && citySlug === "kuwait-city" && !refKeys.includes("kuwait/kuwait")) {
        refKeys.push("kuwait/kuwait");
      }

      console.log(`[Location: ${pageType}] Applying draft: ${lDraft.refKey} (${lDraft.layoutName || "default"})`);

      const languages: Array<"en-US" | "en-GB" | "ar"> = ["en-US", "en-GB", "ar"];

      for (const lang of languages) {
        const templateSections = lDraft.templates[lang] || lDraft.templates["en-US"] || [];
        if (templateSections.length === 0) {
          console.warn(`  [!] Warning: No sections found for language '${lang}' in ${filePath}`);
          continue;
        }

        for (const refKey of refKeys) {
          if (!dryRun) {
            await LocationPageTemplate.collection.updateOne(
              { pageType, refKey, lang },
              {
                $set: {
                  pageType,
                  refKey,
                  lang,
                  status: "published",
                  template: templateSections,
                  updatedAt: new Date(),
                },
                $setOnInsert: { createdAt: new Date() },
              },
              { upsert: true }
            );
          }
          locationCount++;
          totalUpdated++;
        }
      }

      console.log(`  ✓ Applied location: ${lDraft.refKey} (${languages.length} locales, ${refKeys.length} refKey aliases)`);
      continue;
    }

    console.warn(`[!] Skipping unrecognised draft format in: ${filePath}`);
  }

  console.log(`\n======================================================`);
  if (dryRun) {
    console.log(`[DRY RUN COMPLETE] Total documents that would be applied: ${totalUpdated}`);
    console.log(`  - Services: ${serviceCount}`);
    console.log(`  - Location documents: ${locationCount}`);
  } else {
    console.log(`[APPLY COMPLETE] Successfully applied ${totalUpdated} documents in MongoDB!`);
    console.log(`  - Services: ${serviceCount}`);
    console.log(`  - Location documents: ${locationCount}`);
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

main().catch((err) => {
  console.error("Draft apply script encountered an error:", err);
  process.exit(1);
});
