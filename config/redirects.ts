import type { Redirect } from "next/dist/lib/load-custom-routes";

/**
 * Consolidation Map & URL Redirects
 * ---------------------------------------------------------------
 * Maps legacy / draft routing paths to the consolidated Information
 * Architecture (IA).
 *
 * Source IA (legacy / draft):
 *   /cities                    -> city index
 *   /countries                 -> country index
 *   /countries/:country        -> country details
 *   /countries/:country/:city  -> city details
 *   /countries/:country/:city/airport-transfer
 *   /airport-transfer
 *
 * Target IA (approved, nested):
 *   /locations                 -> location index
 *   /locations/cities          -> city index
 *   /locations/:country        -> country details
 *   /locations/:country/:city  -> city details
 *   /locations/:country/:city/airport/...
 *   /services/airport-transfers
 *
 * The `:lang` parameter mirrors the `[lang]` dynamic segment used by the
 * App Router, so every locale (en-US, en-GB, ar, ...) is redirected.
 *
 * English is served at prefix-less URLs, so every rule is also mirrored
 * without the `/:lang` segment (see `redirects()` below).
 *
 * All rules use `permanent: true` (308) so search engines cache and
 * re-index the new hierarchy, preserving SEO equity.
 */
/**
 * `:lang` is constrained to the locales the [lang] segment accepts so the
 * rules cannot swallow real two-segment pages (e.g. `/:lang/cities` used to
 * match `/locations/cities` and redirect it to `/locations/locations/cities`).
 * Applied centrally in `redirects()` below.
 */
const LANG = "(en-US|en-GB|ar)";

const rules: Redirect[] = [
  // ---- City index ------------------------------------------------------
  // The legacy /cities page was merged into the /locations hierarchy.
  {
    source: "/:lang/cities",
    destination: "/:lang/locations/cities",
    permanent: true,
  },

  // ---- Countries index ------------------------------------------------
  {
    source: "/:lang/countries",
    destination: "/:lang/locations",
    permanent: true,
  },

  // ---- Country details -------------------------------------------------
  {
    source: "/:lang/countries/:country",
    destination: "/:lang/locations/:country",
    permanent: true,
  },

  // ---- City details -----------------------------------------------------
  {
    source: "/:lang/countries/:country/:city",
    destination: "/:lang/locations/:country/:city",
    permanent: true,
  },

  // ---- City-level airport transfers (legacy blog links) ----------------
  // The new /locations/:country/:city/airport has no index page; the city
  // page is the canonical destination for an airport-transfer link that
  // carries no airport-name segment.
  {
    source: "/:lang/countries/:country/:city/airport-transfer",
    destination: "/:lang/locations/:country/:city",
    permanent: true,
  },

  // ---- Standalone airport transfer link --------------------------------
  {
    source: "/:lang/airport-transfer",
    destination: "/:lang/services/airport-transfers",
    permanent: true,
  },

  // ---- Safety net: any other legacy /countries/* sub-path ---------------
  // Guards against other un-migrated country/airport/route links so nothing
  // under the old /countries tree 404s.
  {
    source: "/:lang/countries/:path*",
    destination: "/:lang/locations/:path*",
    permanent: true,
  },

  // ---- Legacy country slug redirects ------------------------------------
  {
    source: "/:lang/services/:service/united-arab-emirates/:path*",
    destination: "/:lang/services/:service/uae/:path*",
    permanent: true,
  },
  {
    source: "/:lang/locations/united-arab-emirates/:path*",
    destination: "/:lang/locations/uae/:path*",
    permanent: true,
  },

  // ---- Legacy city slug redirects ---------------------------------------
  {
    source: "/:lang/services/:service/:country/kuwait/:path*",
    destination: "/:lang/services/:service/:country/kuwait-city/:path*",
    permanent: true,
  },
  {
    source: "/:lang/locations/:country/kuwait/:path*",
    destination: "/:lang/locations/:country/kuwait-city/:path*",
    permanent: true,
  },

  // ---- Blog → Services migration -----------------------------------------
  // Blog listing page
  {
    source: "/:lang/blog",
    destination: "/:lang/blogs",
    permanent: true,
  },
  // Blog article pages: /blog/services/... → /services/...
  {
    source: "/:lang/blog/services/:path*",
    destination: "/:lang/services/:path*",
    permanent: true,
  },
  // Any other legacy /blog/... path → the new blog tree. Keep this rule
  // AFTER the more specific /blog/services/* rule above — order matters.
  {
    source: "/:lang/blog/:path*",
    destination: "/:lang/blogs/:path*",
    permanent: true,
  },

  // ---- Maintenance screen -------------------------------------------------
  // The old coming-soon page was replaced by the reusable maintenance page
  // at the bare /maintenance URL (no locale prefix — it is one global screen).
  {
    source: "/:lang/coming-soon",
    destination: "/maintenance",
    permanent: true,
  },
];

export const redirects: () => Promise<Redirect[]> = async () => {
  // Constrain :lang so e.g. `/locations/cities` is never treated as
  // lang="locations" + path="cities".
  const localized = rules.map((rule) => ({
    ...rule,
    source: rule.source.replace("/:lang", `/:lang${LANG}`),
  }));
  // English URLs carry no locale prefix — mirror every rule without /:lang
  // (strip the optional constraint group along with the parameter).
  const mirrored = localized.map((rule) => ({
    ...rule,
    source: rule.source.replace(/\/:lang(?:\([^)]*\))?/, ""),
    destination: rule.destination.replace("/:lang", ""),
  }));
  return [...localized, ...mirrored];
};
