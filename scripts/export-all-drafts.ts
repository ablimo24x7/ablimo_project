import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import mongoose from "mongoose";

async function main() {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!uri) throw new Error("MONGODB_URI is not set in environment or .env.local");

  const dbUri = uri.includes("/ablimo-db")
    ? uri
    : uri.split("?")[0].replace(/\/+$/, "") + "/ablimo-db" + (uri.includes("?") ? "?" + uri.split("?")[1] : "");

  console.log("Connecting to MongoDB Atlas...");
  await mongoose.connect(dbUri);
  const db = mongoose.connection.db!;
  console.log("Connected successfully!\n");

  const draftsBase = path.resolve(process.cwd(), "drafts");

  // ==========================================
  // 1. EXPORT ALL SERVICES (66 services)
  // ==========================================
  const servicesDir = path.join(draftsBase, "services");
  fs.mkdirSync(servicesDir, { recursive: true });

  const allServices = await db.collection("services").find({}).toArray();
  console.log(`Found ${allServices.length} services in DB to export...`);

  let exportedServices = 0;
  for (const s of allServices) {
    const serviceDoc = {
      pageType: "service",
      slug: s.slug,
      title: s.title,
      subtitle: s.subtitle || "",
      desc: s.desc || "",
      heroImage: s.heroImage || "",
      breadcrumb: s.breadcrumb || "",
      features: s.features || [],
      cardsHeading: s.cardsHeading || "",
      cardsDesc: s.cardsDesc || "",
      cards: s.cards || [],
      sections: s.sections || [],
      faqs: s.faqs || [],
      ctaTitle: s.ctaTitle || "",
      ctaDesc: s.ctaDesc || "",
      ctaLabel: s.ctaLabel || "",
      ctaHref: s.ctaHref || "",
      pageSections: s.pageSections || [],
      seo: s.seo || {},
      status: s.status || "published",
      showInMenu: s.showInMenu !== false,
      order: s.order ?? 0,
      locale: s.locale || "en",
      exportedAt: new Date().toISOString(),
    };

    const outPath = path.join(servicesDir, `${s.slug}.json`);
    fs.writeFileSync(outPath, JSON.stringify(serviceDoc, null, 2), "utf-8");
    exportedServices++;
  }
  console.log(`✓ Exported ${exportedServices} services to drafts/services/\n`);

  // ==========================================
  // 2. EXPORT ALL COUNTRY LOCATION TEMPLATES
  // ==========================================
  const countriesDir = path.join(draftsBase, "locations", "countries");
  fs.mkdirSync(countriesDir, { recursive: true });

  const allCountryTemplates = await db.collection("locationpagetemplates").find({ pageType: "country" }).toArray();
  // Group by refKey
  const countryMap = new Map<string, Record<string, any[]>>();
  for (const ct of allCountryTemplates) {
    if (!countryMap.has(ct.refKey)) {
      countryMap.set(ct.refKey, {});
    }
    countryMap.get(ct.refKey)![ct.lang] = ct.template || [];
  }

  let exportedCountries = 0;
  for (const [refKey, templates] of countryMap.entries()) {
    const countryDoc = {
      pageType: "country",
      refKey,
      countrySlug: refKey,
      path: `/locations/${refKey}`,
      description: `Country template for ${refKey}`,
      exportedAt: new Date().toISOString(),
      templates: {
        "en-US": templates["en-US"] || templates["en-GB"] || [],
        "en-GB": templates["en-GB"] || templates["en-US"] || [],
        ar: templates["ar"] || [],
      },
    };

    const outPath = path.join(countriesDir, `${refKey}.json`);
    fs.writeFileSync(outPath, JSON.stringify(countryDoc, null, 2), "utf-8");
    exportedCountries++;
  }
  console.log(`✓ Exported ${exportedCountries} country templates to drafts/locations/countries/\n`);

  // ==========================================
  // 3. EXPORT ALL ROUTE LOCATION TEMPLATES
  // ==========================================
  const routesDir = path.join(draftsBase, "locations", "routes");
  fs.mkdirSync(routesDir, { recursive: true });

  const allRouteTemplates = await db.collection("locationpagetemplates").find({ pageType: "route" }).toArray();
  const routeMap = new Map<string, Record<string, any[]>>();
  for (const rt of allRouteTemplates) {
    if (!routeMap.has(rt.refKey)) {
      routeMap.set(rt.refKey, {});
    }
    routeMap.get(rt.refKey)![rt.lang] = rt.template || [];
  }

  let exportedRoutes = 0;
  for (const [refKey, templates] of routeMap.entries()) {
    const routeDoc = {
      pageType: "route",
      refKey,
      countrySlug: refKey,
      path: `/locations/${refKey}/routes`,
      description: `Routes template for ${refKey}`,
      exportedAt: new Date().toISOString(),
      templates: {
        "en-US": templates["en-US"] || templates["en-GB"] || [],
        "en-GB": templates["en-GB"] || templates["en-US"] || [],
        ar: templates["ar"] || [],
      },
    };

    const outPath = path.join(routesDir, `${refKey}.json`);
    fs.writeFileSync(outPath, JSON.stringify(routeDoc, null, 2), "utf-8");
    exportedRoutes++;
  }
  console.log(`✓ Exported ${exportedRoutes} route templates to drafts/locations/routes/\n`);

  // ==========================================
  // 4. EXPORT ALL CURRENT UNIFIED CITY TEMPLATES
  // ==========================================
  const unifiedCitiesDir = path.join(draftsBase, "locations", "unified-cities");
  fs.mkdirSync(unifiedCitiesDir, { recursive: true });

  const allCityTemplates = await db.collection("locationpagetemplates").find({ pageType: "city" }).toArray();
  const cityMap = new Map<string, Record<string, any[]>>();
  for (const ct of allCityTemplates) {
    if (!cityMap.has(ct.refKey)) {
      cityMap.set(ct.refKey, {});
    }
    cityMap.get(ct.refKey)![ct.lang] = ct.template || [];
  }

  let exportedCities = 0;
  for (const [refKey, templates] of cityMap.entries()) {
    const [countrySlug, citySlug] = refKey.split("/");
    const countryDir = path.join(unifiedCitiesDir, countrySlug);
    fs.mkdirSync(countryDir, { recursive: true });

    const cityDoc = {
      pageType: "city",
      refKey,
      countrySlug,
      citySlug,
      path: `/locations/${countrySlug}/${citySlug}`,
      layoutName: "unified-riyadh-style-10-sections",
      description: `Unified Riyadh-style 10-section layout for ${citySlug} (${countrySlug})`,
      exportedAt: new Date().toISOString(),
      templates: {
        "en-US": templates["en-US"] || templates["en-GB"] || [],
        "en-GB": templates["en-GB"] || templates["en-US"] || [],
        ar: templates["ar"] || [],
      },
    };

    const outPath = path.join(countryDir, `${citySlug}.json`);
    fs.writeFileSync(outPath, JSON.stringify(cityDoc, null, 2), "utf-8");
    exportedCities++;
  }
  console.log(`✓ Exported ${exportedCities} unified city templates to drafts/locations/unified-cities/\n`);

  await mongoose.disconnect();
  console.log("All drafts successfully exported and disconnected from MongoDB!");
}

main().catch((err) => {
  console.error("Export all drafts failed:", err);
  process.exit(1);
});

