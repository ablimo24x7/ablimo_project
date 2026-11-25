import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";

const BASE_URL = "https://www.ab.limo";
// English is served at prefix-less URLs, Arabic at /ar
const SITEMAP_LANGS = ["en", "ar"] as const;

// The sitemap used to be force-dynamic: every crawler hit re-ran every DB
// query (~12.7s per request) and stamped <lastmod> with the generation time.
// It is now a cached route that refreshes every 15 minutes — dashboard
// content still shows up without a redeploy, at a fraction of the cost.
export const revalidate = 900;

// Never listed: the maintenance screen (private), the legacy /blog tree
// (308-redirects to /blogs), and the decommissioned coming-soon page.
const EXCLUDED_STATIC = new Set(["maintenance", "blog", "coming-soon"]);

// Thin SEO landing pages de-listed from the footer (explore column) and the
// commented-out fleet/support columns. They stay routable for direct hits but
// are kept out of the sitemap so crawl budget focuses on real content.
const EXCLUDED_ROUTES = new Set([
  "faqs",
  "car-service",
  "chauffeur-service",
  "limousine-service",
  "ground-transportation",
  "business",
  "corporations",
  "travel-agencies",
  "strategic-partnerships",
  "industries",
  "industries/aviation",
  "industries/corporate-enterprise",
  "industries/government-diplomatic",
  "industries/hospitality",
  "city-to-city",
  "fleet",
]);

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
  return paths.filter((p) => !EXCLUDED_STATIC.has(p) && !EXCLUDED_ROUTES.has(p));
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
  locations: { country: string; cities: string[]; airports: { city: string; airport: string }[] }[];
  routes: { country: string; city: string; route: string }[];
  services: { slug: string; lastModified?: string }[];
  articles: ArticleEntry[];
}> {
  const result = {
    locations: [] as { country: string; cities: string[]; airports: { city: string; airport: string }[] }[],
    routes: [] as { country: string; city: string; route: string }[],
    services: [] as { slug: string; lastModified?: string }[],
    articles: [] as ArticleEntry[],
  };

  const cityCountry = new Map<string, string>();

  try {
    const { getAllCountries, getAllRoutes } = await import("@/lib/locationData");
    const { resolveCountry, CITY_ROUTES } = await import("@/lib/locations");
    const countries = await getAllCountries();

    for (const c of countries) {
      // Canonical slug (e.g. "united-arab-emirates" → "uae") so the sitemap
      // never lists URLs that only answer with a 308 redirect.
      const countrySlug = resolveCountry(c.slug)?.slug ?? c.slug;
      for (const city of c.cities) cityCountry.set(city.slug, countrySlug);
    }

    result.locations = countries.map((c) => ({
      country: resolveCountry(c.slug)?.slug ?? c.slug,
      cities: c.cities.map((city) => city.slug),
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

    // City-to-city routes: dashboard (locationroutes) data merged with the
    // bundled static dataset. Each route is emitted for BOTH orientations —
    // city pages link a↔b from either endpoint, and the route page resolves
    // distance/duration from either direction. The origin must belong to a
    // known country or the URL 404s.
    const routes = await getAllRoutes();
    const seenRoutes = new Set<string>();
    for (const route of [...routes, ...CITY_ROUTES]) {
      const orientations: [string, string][] = [
        [route.fromSlug, route.toSlug],
        [route.toSlug, route.fromSlug],
      ];
      for (const [from, to] of orientations) {
        const key = `${from}|${to}`;
        if (seenRoutes.has(key)) continue;
        seenRoutes.add(key);
        const country = cityCountry.get(from);
        if (!country) continue;
        result.routes.push({
          country,
          city: from,
          route: `${from}-to-${to}`,
        });
      }
    }
  } catch {
    // DB unavailable — skip dynamic locations/routes
  }

  try {
    const { getAllPublishedServices } = await import("@/lib/services");
    const { serviceDictKeyBySlug } = await import(
      "@/app/[lang]/services/_components/serviceStructures"
    );
    const services = await getAllPublishedServices();
    const seen = new Map<string, string | undefined>();
    for (const service of services) seen.set(service.slug, service.updatedAt);
    // Dictionary-backed service pages are live without a DB document
    // (e.g. religious-tourism) — include them, but only DB-backed services
    // carry a real <lastmod>.
    for (const slug of Object.keys(serviceDictKeyBySlug)) {
      if (!seen.has(slug)) seen.set(slug, undefined);
    }
    result.services = Array.from(seen, ([slug, lastModified]) => ({ slug, lastModified }));
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
        // Service templates live under /services/..., blog posts under /blogs/...
        path: isServicePage ? `/${slug}` : `/blogs/${slug}`,
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
  const staticRoutes = discoverStaticRoutes();
  const dynamicRoutes = await discoverDynamicRoutes();
  const entries: MetadataRoute.Sitemap = [];

  // Normalise every timestamp to ISO-8601 — DB services arrive as
  // String(Date) ("Sun Sep 13 2026 ..."), which is not a valid sitemap
  // <lastmod> format. Invalid values are dropped rather than faked.
  const toIso = (value: Date | string | undefined): string | undefined => {
    if (!value) return undefined;
    const date = value instanceof Date ? value : new Date(value);
    return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
  };

  const add = (
    routePath: string,
    priority = 0.8,
    changeFreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" = "weekly",
    lastModified?: Date | string,
  ) => {
    const path = routePath.startsWith("/") ? routePath : `/${routePath}`;
    const suffix = path === "/" ? "" : path;
    const iso = toIso(lastModified);
    for (const lang of SITEMAP_LANGS) {
      const prefix = lang === "en" ? "" : `/${lang}`;
      entries.push({
        url: `${BASE_URL}${prefix}${suffix}`,
        // Only emit <lastmod> when we have a real timestamp. Static and
        // bundled pages get none — a fake "generated today" stamp tells
        // search engines nothing and degrades crawl trust.
        ...(iso ? { lastModified: iso } : {}),
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
  for (const loc of dynamicRoutes.locations) {
    add(`/locations/${loc.country}`, 0.7, "monthly");
    for (const city of loc.cities) {
      add(`/locations/${loc.country}/${city}`, 0.7, "monthly");
    }
    // Dynamic: airports → /locations/{country}/{city}/airport/{airport}
    for (const airport of loc.airports) {
      add(`/locations/${loc.country}/${airport.city}/airport/${airport.airport}`, 0.6, "monthly");
    }
  }

  // Dynamic: routes → /locations/{country}/{city}/routes/{from}-to-{to}
  for (const route of dynamicRoutes.routes) {
    add(
      `/locations/${route.country}/${route.city}/routes/${route.route}`,
      0.6,
      "monthly",
    );
  }

  // Dynamic: services → /services/{slug} (DB + dictionary-backed pages)
  for (const service of dynamicRoutes.services) {
    add(`/services/${service.slug}`, 0.8, "weekly", service.lastModified);
  }

  // Dynamic: articles → service templates under /services/..., posts under /blogs/...
  for (const article of dynamicRoutes.articles) {
    const isServicePage = article.path.startsWith("/services/");
    add(article.path, isServicePage ? 0.8 : 0.6, isServicePage ? "weekly" : "monthly", article.lastModified);
  }

  // Drop duplicate URLs (overlapping sources, e.g. alias-normalised locations)
  const seenUrls = new Set<string>();
  return entries.filter((entry) => {
    if (seenUrls.has(entry.url)) return false;
    seenUrls.add(entry.url);
    return true;
  });
}
