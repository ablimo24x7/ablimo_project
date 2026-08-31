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
 * All rules use `permanent: true` (308) so search engines cache and
 * re-index the new hierarchy, preserving SEO equity.
 */
export const redirects: () => Promise<Redirect[]> = async () => [
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

  // ---- Legacy service slug redirects -----------------------------------
  {
    source: "/:lang/services/executive-corporate-mobility",
    destination: "/:lang/services/chauffeur-vip",
    permanent: true,
  },
  {
    source: "/:lang/services/vip-diplomatic-government",
    destination: "/:lang/services/chauffeur-vip",
    permanent: true,
  },
  {
    source: "/:lang/services/corporate-fleet",
    destination: "/:lang/services/corporate-transportation",
    permanent: true,
  },
  {
    source: "/:lang/services/group-coach-charter",
    destination: "/:lang/services/bus-coach-hire",
    permanent: true,
  },
  {
    source: "/:lang/services/tourism-leisure",
    destination: "/:lang/services/tourism-transportation",
    permanent: true,
  },
  {
    source: "/:lang/services/religious-tourism",
    destination: "/:lang/services/tourism-transportation",
    permanent: true,
  },
  {
    source: "/:lang/services/premium-lifestyle",
    destination: "/:lang/services/chauffeur-vip",
    permanent: true,
  },
  {
    source: "/:lang/services/cross-border-mobility",
    destination: "/:lang/services/chauffeur-vip",
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
];
