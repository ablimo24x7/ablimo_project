import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";
import { FLEET_VEHICLES } from "@/lib/fleet";

const BASE_URL = "https://www.ab.limo";
// English is served at prefix-less URLs, Arabic at /ar
const SITEMAP_LANGS = ["en", "ar"] as const;

// Sitemap must reflect the database on every request: pages created from the
// dashboard (services, cities, articles) show up without waiting for a redeploy.
export const dynamic = "force-dynamic";

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

type ArticleEntry = {
  path: string;
  lastModified?: Date | string;
};

function articleLastModified(article: Record<string, unknown>): Date | string | undefined {
  const updated = article.updatedAt;
  if (updated instanceof Date || typeof updated === "string") return updated;
  const created = article.createdAt;
  if (created instanceof Date || typeof created === "string") return created;
  return undefined;
}

async function discoverDynamicRoutes(): Promise<{
  locations: { country: string; cities: string[]; routes: { city: string; route: string }[]; airports: { city: string; airport: string }[] }[];
  services: string[];
  articles: ArticleEntry[];
}> {
  const result = {
    locations: [] as { country: string; cities: string[]; routes: { city: string; route: string }[]; airports: { city: string; airport: string }[] }[],
    services: [] as string[],
    articles: [] as ArticleEntry[],
  };

  try {
    const { getAllCountries } = await import("@/lib/locationData");
    const { resolveCountry } = await import("@/lib/locations");
    const countries = await getAllCountries();
    result.locations = countries.map((c) => ({
      // Canonical slug (e.g. "united-arab-emirates" → "uae") so the sitemap
      // never lists URLs that only answer with a 308 redirect.
      country: resolveCountry(c.slug)?.slug ?? c.slug,
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
    const seen = new Map<string, ArticleEntry>();
    for (const article of [...enArticles, ...arArticles]) {
      const slug = article.slug;
      if (!slug || seen.has(slug)) continue;
      const record = article as unknown as Record<string, unknown>;
      const isServicePage =
        article.templateType === "service-city" ||
        article.templateType === "service-country" ||
        slug.startsWith("services/");
      seen.set(slug, {
        // Service templates live under /services/..., regular posts under /blog/...
        path: isServicePage ? `/${slug}` : `/blog/${slug}`,
        lastModified: articleLastModified(record),
      });
    }
    result.articles = Array.from(seen.values());
  } catch {
    // DB unavailable — skip dynamic blog
  }

  return result;
}

/* ─── 3. Build sitemap entries ────────────────────────────── */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const NOW = new Date();
  const staticRoutes = discoverStaticRoutes();
  const dynamicRoutes = await discoverDynamicRoutes();
  const entries: MetadataRoute.Sitemap = [];

  const add = (
    routePath: string,
    priority = 0.8,
    changeFreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" = "weekly",
    lastModified?: Date | string,
  ) => {
    const path = routePath.startsWith("/") ? routePath : `/${routePath}`;
    const suffix = path === "/" ? "" : path;
    for (const lang of SITEMAP_LANGS) {
      const prefix = lang === "en" ? "" : `/${lang}`;
      entries.push({
        url: `${BASE_URL}${prefix}${suffix}`,
        lastModified: lastModified ?? NOW,
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

  // Fleet vehicle detail pages (dynamic [vehicle] segment is skipped by the scanner)
  for (const vehicle of FLEET_VEHICLES) {
    add(`/fleet/${vehicle.slug}`, 0.7, "weekly");
  }

  // Dynamic: locations → /locations/{country}, /locations/{country}/{city}
  for (const loc of dynamicRoutes.locations) {
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
  for (const slug of dynamicRoutes.services) {
    add(`/services/${slug}`, 0.8, "weekly");
  }

  // Dynamic: articles → service templates under /services/..., posts under /blog/...
  for (const article of dynamicRoutes.articles) {
    const isServicePage = article.path.startsWith("/services/");
    add(article.path, isServicePage ? 0.8 : 0.6, "weekly", article.lastModified);
  }

  // Drop duplicate URLs (overlapping sources, e.g. alias-normalised locations)
  const seenUrls = new Set<string>();
  return entries.filter((entry) => {
    if (seenUrls.has(entry.url)) return false;
    seenUrls.add(entry.url);
    return true;
  });
}
