import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";

const BASE_URL = "https://ab.limo";
const LOCALES = ["en-US", "en-GB", "ar"];
const NOW = new Date();

/* ─── 1. Auto-scan static routes from filesystem ─────────── */

function discoverStaticRoutes(): string[] {
  const appDir = path.join(process.cwd(), "src", "app", "[lang]");
  const paths: string[] = [];

  function walkDir(dir: string, prefix: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name.startsWith("[") && entry.name !== "[lang]") continue;
      const fullPath = path.join(dir, entry.name);
      const routePrefix = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.isDirectory()) {
        walkDir(fullPath, routePrefix);
      } else if (entry.name === "page.tsx") {
        paths.push(prefix);
      }
    }
  }

  walkDir(appDir, "");
  return paths;
}

/* ─── 2. DB-driven dynamic routes ────────────────────────── */

async function discoverDynamicRoutes(): Promise<{
  locations: { country: string; cities: string[]; routes: { city: string; route: string }[]; airports: { city: string; airport: string }[] }[];
  services: string[];
  blogSlugs: string[];
}> {
  const result = {
    locations: [] as { country: string; cities: string[]; routes: { city: string; route: string }[]; airports: { city: string; airport: string }[] }[],
    services: [] as string[],
    blogSlugs: [] as string[],
  };

  try {
    const { getAllCountries } = await import("@/lib/locationData");
    const countries = await getAllCountries();
    result.locations = countries.map((c) => ({
      country: c.slug,
      cities: c.cities.map((city) => city.slug),
      routes: c.cities.flatMap((city) => {
        const cityAny = city as unknown as Record<string, unknown>;
        const cityRoutes = cityAny.routes;
        if (Array.isArray(cityRoutes)) {
          return cityRoutes
            .filter((r): r is { slug: string } => r && typeof r === "object" && "slug" in r)
            .map((route) => ({
              city: city.slug,
              route: route.slug,
            }));
        }
        return [];
      }),
      airports: c.cities.flatMap((city) => {
        const cityAny = city as unknown as Record<string, unknown>;
        const cityAirports = cityAny.airports;
        if (Array.isArray(cityAirports)) {
          return cityAirports
            .filter((a): a is { slug: string } => a && typeof a === "object" && "slug" in a)
            .map((airport) => ({
              city: city.slug,
              airport: airport.slug,
            }));
        }
        return [];
      }),
    }));
  } catch {
    // DB unavailable — skip dynamic locations
  }

  try {
    const { getAllPublishedServices } = await import("@/lib/services");
    const services = await getAllPublishedServices();
    result.services = services.map((s) => s.slug);
  } catch {
    // DB unavailable — skip dynamic services
  }

  try {
    const { getAllPublishedArticles } = await import("@/lib/blog");
    const enArticles = await getAllPublishedArticles("en");
    const arArticles = await getAllPublishedArticles("ar");
    const allSlugs = new Set<string>();
    for (const a of enArticles) allSlugs.add(a.slug);
    for (const a of arArticles) allSlugs.add(a.slug);
    result.blogSlugs = Array.from(allSlugs);
  } catch {
    // DB unavailable — skip dynamic blog
  }

  return result;
}

/* ─── 3. Build sitemap entries ────────────────────────────── */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = discoverStaticRoutes();
  const dynamic = await discoverDynamicRoutes();
  const entries: MetadataRoute.Sitemap = [];

  const add = (routePath: string, priority = 0.8, changeFreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" = "weekly") => {
    for (const lang of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${lang}${routePath.startsWith("/") ? routePath : `/${routePath}`}`,
        lastModified: NOW,
        changeFrequency: changeFreq,
        priority,
      });
    }
  };

  // Static routes (auto-discovered from filesystem)
  for (const route of staticRoutes) {
    const p = route === "" ? 1.0 : 0.8;
    add(route, p);
  }

  // Dynamic: locations → /locations/{country}, /locations/{country}/{city}
  for (const loc of dynamic.locations) {
    add(`/locations/${loc.country}`, 0.7, "monthly");
    for (const city of loc.cities) {
      add(`/locations/${loc.country}/${city}`, 0.7, "monthly");
    }
    // Dynamic: routes → /locations/{country}/{city}/routes/{route}
    for (const route of loc.routes) {
      add(`/locations/${loc.country}/${route.city}/routes/${route.route}`, 0.6, "monthly");
    }
    // Dynamic: airports → /locations/{country}/{city}/airport/{airport}
    for (const airport of loc.airports) {
      add(`/locations/${loc.country}/${airport.city}/airport/${airport.airport}`, 0.6, "monthly");
    }
  }

  // Dynamic: services → /services/{slug}
  for (const slug of dynamic.services) {
    add(`/services/${slug}`, 0.8, "weekly");
  }

  // Dynamic: blog articles → /blog/{slug}
  for (const slug of dynamic.blogSlugs) {
    add(`/blog/${slug}`, 0.6, "weekly");
  }

  return entries;
}
