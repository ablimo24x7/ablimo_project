/**
 * Dead URLs inherited from the pre-launch (Blacklane-era) site.
 *
 * Every path below was HTTP-verified against https://www.ab.limo on
 * 2026-10-23 and no longer resolves: either the page does not exist at all
 * or it only answers with a redirect to a URL that 404s. They are listed in
 * Search Console and waste crawl budget, so they are answered with
 * `410 Gone` (see `src/proxy.ts`) and are defensively filtered out of
 * `src/app/sitemap.ts`.
 *
 * Paths are locale-less ("/awards", not "/ar/awards" or "/en-GB/awards") —
 * the proxy normalises the locale prefix before checking this set.
 *
 * Do not add a path here if a matching page still returns 200 (e.g.
 * "/contact", "/fleet", "/fleet/business-van" and
 * "/services/chauffeur-vip/saudi-arabia" are live and must stay).
 */
export const LEGACY_GONE_PATHS = [
  "/$",
  "/awards",
  "/as-directed",
  "/code-of-conduct",
  "/cookie-policy",
  "/cross-border",
  "/event-transportation",
  "/executive-mobility",
  "/group-charter",
  "/help-center",
  "/lang/contact",
  "/leadership-team",
  "/live-chat",
  "/modern-slavery",
  "/premium-lifestyle",
  "/press/coverage",
  "/tourism",
  "/vip-diplomatic",
] as const;

const LEGACY_GONE_SET = new Set<string>(LEGACY_GONE_PATHS);

/**
 * True when `pathname` (locale-less, leading slash) is a removed legacy URL
 * or a sub-path of one.
 */
export function isLegacyGonePath(pathname: string): boolean {
  const normalised =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  if (LEGACY_GONE_SET.has(normalised)) return true;

  return LEGACY_GONE_PATHS.some((p) => normalised.startsWith(`${p}/`));
}

/**
 * Strips the `/ar` (Arabic) locale prefix from a pathname so legacy checks
 * run against the same locale-less key for both language trees.
 */
export function stripArPrefix(pathname: string): string {
  if (pathname === "/ar") return "/";
  if (pathname.startsWith("/ar/")) return pathname.slice(3) || "/";
  return pathname;
}
