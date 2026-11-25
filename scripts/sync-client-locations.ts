import "dotenv/config";
import mongoose from "mongoose";
import { getDictionary, locales } from "@/app/[lang]/dictionaries";
import { COUNTRIES, CITY_ROUTES } from "@/lib/locations";
import { CLIENT_COUNTRY_DATA } from "@/components/section-library/presets/client-country-data";
import { CLIENT_CITY_DATA } from "@/components/section-library/presets/client-city-data";
import { buildCountryTemplate } from "@/components/section-library/presets/country-presets";
import { buildCityTemplate } from "@/components/section-library/presets/city-presets";

function resolveUri(): string {
  let uri = process.env.MONGO_URI || process.env.MONGODB_URI || "";
  if (!uri.includes("/ablimo-db")) {
    const base = uri.split("?")[0].replace(/\/+$/, "");
    const params = uri.includes("?") ? "?" + uri.split("?")[1] : "";
    uri = `${base}/ablimo-db${params}`;
  }
  return uri;
}

async function main() {
  const uri = resolveUri();
  if (!uri) throw new Error("MONGO_URI / MONGODB_URI not set in environment");
  await mongoose.connect(uri, { dbName: "ablimo-db" });
  const db = mongoose.connection.db;
  if (!db) throw new Error("MongoDB connection db unavailable");

  const now = new Date();
  const countriesCol = db.collection("countries");

  // 1. Update countries and cities in `countries` collection
  for (const staticCountry of COUNTRIES) {
    const clientCountry = CLIENT_COUNTRY_DATA[staticCountry.slug];
    const existingDoc = await countriesCol.findOne({
      $or: [{ slug: staticCountry.slug }, { code: staticCountry.code }],
    });

    if (!existingDoc) {
      // Insert new country doc
      const cities = staticCountry.cities.map((sc) => {
        const clientCity = CLIENT_CITY_DATA[sc.slug];
        return {
          slug: sc.slug,
          name: sc.name,
          nameAr: sc.nameAr ?? "",
          countrySlug: staticCountry.slug,
          description: clientCity?.description ?? sc.description ?? "",
          descriptionAr: sc.descriptionAr ?? "",
          aliases: sc.aliases ?? [],
          status: "published",
          airports: (sc.airports ?? []).map((a) => ({
            slug: a.slug,
            name: a.name,
            nameAr: a.nameAr ?? "",
            iata: a.iata,
            citySlug: sc.slug,
            status: "published",
          })),
          faqs: clientCity?.faqs ?? sc.faqs ?? [],
          faqsAr: sc.faqsAr ?? [],
          sections: [],
        };
      });

      await countriesCol.insertOne({
        code: staticCountry.code,
        slug: staticCountry.slug,
        name: staticCountry.name,
        nameAr: staticCountry.nameAr ?? "",
        description: clientCountry?.description ?? staticCountry.description ?? "",
        status: "published",
        faqs: clientCountry?.faqs ?? staticCountry.faqs ?? [],
        cities,
        createdAt: now,
        updatedAt: now,
      });
      console.log(`Inserted country: ${staticCountry.slug}`);
      continue;
    }

    // Merge and update existing cities
    const existingCities: any[] = Array.isArray(existingDoc.cities) ? existingDoc.cities : [];
    const cityMap = new Map<string, any>();
    for (const ec of existingCities) {
      if (ec && ec.slug) {
        cityMap.set(ec.slug.toLowerCase(), ec);
      }
    }

    for (const sc of staticCountry.cities) {
      const key = sc.slug.toLowerCase();
      const clientCity = CLIENT_CITY_DATA[sc.slug];
      const existingCity = cityMap.get(key);

      const staticAirports = (sc.airports ?? []).map((a) => ({
        slug: a.slug,
        name: a.name,
        nameAr: a.nameAr ?? "",
        iata: a.iata,
        citySlug: sc.slug,
        status: "published",
      }));

      if (!existingCity) {
        cityMap.set(key, {
          slug: sc.slug,
          name: sc.name,
          nameAr: sc.nameAr ?? "",
          countrySlug: existingDoc.slug,
          description: clientCity?.description ?? sc.description ?? "",
          descriptionAr: sc.descriptionAr ?? "",
          aliases: sc.aliases ?? [],
          status: "published",
          airports: staticAirports,
          faqs: clientCity?.faqs ?? sc.faqs ?? [],
          faqsAr: sc.faqsAr ?? [],
          sections: [],
        });
      } else {
        // Update description, faqs, and airports if clientCity is defined or missing
        const updatedAirports =
          existingCity.airports && existingCity.airports.length > 0
            ? existingCity.airports
            : staticAirports;

        cityMap.set(key, {
          ...existingCity,
          name: sc.name || existingCity.name,
          nameAr: existingCity.nameAr || sc.nameAr || "",
          description:
            clientCity?.description || existingCity.description || sc.description || "",
          aliases:
            existingCity.aliases && existingCity.aliases.length > 0
              ? existingCity.aliases
              : sc.aliases ?? [],
          airports: updatedAirports,
          faqs: clientCity?.faqs ?? existingCity.faqs ?? sc.faqs ?? [],
        });
      }
    }

    const mergedCities = Array.from(cityMap.values());
    const updateFields: Record<string, unknown> = {
      cities: mergedCities,
      updatedAt: now,
    };

    if (clientCountry) {
      updateFields.description = clientCountry.description;
      updateFields.faqs = clientCountry.faqs;
    }

    await countriesCol.updateOne({ _id: existingDoc._id }, { $set: updateFields });
    console.log(
      `Updated country ${existingDoc.slug}: ${mergedCities.length} cities, ${
        (clientCountry?.faqs ?? []).length
      } FAQs`
    );
  }

  // 2. Upsert templates in `locationpagetemplates` collection
  const templateOps: any[] = [];
  const clientCountrySlugs = Object.keys(CLIENT_COUNTRY_DATA);
  const clientCitySlugs = Object.keys(CLIENT_CITY_DATA);

  for (const lang of locales) {
    const dict = await getDictionary(lang);

    // Force-update the 5 client countries
    for (const countrySlug of clientCountrySlugs) {
      const template = buildCountryTemplate(countrySlug, dict);
      templateOps.push({
        updateOne: {
          filter: { pageType: "country", refKey: countrySlug, lang },
          update: {
            $set: {
              pageType: "country",
              refKey: countrySlug,
              lang,
              template,
              status: "published",
              updatedAt: now,
            },
            $setOnInsert: {
              createdAt: now,
            },
          },
          upsert: true,
        },
      });
    }

    // Force-update the 12 KSA client cities
    for (const citySlug of clientCitySlugs) {
      const refKey = `saudi-arabia/${citySlug}`;
      const template = buildCityTemplate("saudi-arabia", citySlug, dict);
      templateOps.push({
        updateOne: {
          filter: { pageType: "city", refKey, lang },
          update: {
            $set: {
              pageType: "city",
              refKey,
              lang,
              template,
              status: "published",
              updatedAt: now,
            },
            $setOnInsert: {
              createdAt: now,
            },
          },
          upsert: true,
        },
      });
    }
  }

  const tplResult = await db
    .collection("locationpagetemplates")
    .bulkWrite(templateOps, { ordered: false });

  console.log(
    `Synced locationPageTemplates — matched: ${tplResult.matchedCount}, modified: ${tplResult.modifiedCount}, upserted: ${tplResult.upsertedCount} (total ops: ${templateOps.length})`
  );

  // 3. Ensure all CITY_ROUTES exist in `locationroutes` collection
  const routesCol = db.collection("locationroutes");
  const routeOps = CITY_ROUTES.map((r) => ({
    updateOne: {
      filter: { fromCity: r.fromSlug, toCity: r.toSlug },
      update: {
        $setOnInsert: {
          fromCity: r.fromSlug,
          toCity: r.toSlug,
          fromCityName: r.fromName ?? "",
          toCityName: r.toName ?? "",
          distance: r.distance,
          duration: r.duration,
          status: "published",
          createdAt: now,
          updatedAt: now,
        },
      },
      upsert: true,
    },
  }));

  const routeResult = await routesCol.bulkWrite(routeOps, { ordered: false });
  console.log(
    `Synced locationroutes — matched: ${routeResult.matchedCount}, upserted: ${routeResult.upsertedCount}`
  );

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

