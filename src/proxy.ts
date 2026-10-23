import { NextRequest, NextResponse } from "next/server";

const defaultLocale = "en-US";
const legacyEnglishPrefixes = ["/en-US", "/en-GB"];

const protectedPaths = ["/dashboard", "/api/articles", "/api/categories", "/api/users", "/api/settings", "/api/dashboard", "/api/invitations", "/api/locations", "/api/media"];

function isProtectedPath(pathname: string): boolean {
  return protectedPaths.some((p) => pathname.startsWith(p));
}

// Set MAINTENANCE_MODE=true to put the site into maintenance: public traffic
// is rewritten to /maintenance (original URL preserved, noindex header
// attached) while the dashboard, auth, APIs and the maintenance page itself
// stay reachable so the flag can be turned back off.
const maintenanceMode =
  process.env.MAINTENANCE_MODE === "true" || process.env.MAINTENANCE_MODE === "1";

function isPublicPath(pathname: string): boolean {
  return !(
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/invite") ||
    pathname === "/maintenance" ||
    pathname.includes(".")
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Maintenance mode: public pages show the maintenance screen; protected
  // paths fall through to the auth guard below.
  if (maintenanceMode && isPublicPath(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/maintenance";
    const response = NextResponse.rewrite(url);
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  // Auth guard for protected paths
  if (isProtectedPath(pathname)) {
    const sessionToken = request.cookies.get("next-auth.session-token")?.value
      || request.cookies.get("__Secure-next-auth.session-token")?.value;

    // Allow auth API and signin without token
    if (pathname.startsWith("/api/auth") || pathname.startsWith("/auth")) {
      // fall through to locale logic
    } else if (!sessionToken && pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } else if (!sessionToken && pathname.startsWith("/dashboard")) {
      const signInUrl = new URL("/auth/signin", request.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Legacy English locale prefixes → prefix-less (permanent for SEO)
  const legacyPrefix = legacyEnglishPrefixes.find(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
  if (legacyPrefix) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(legacyPrefix.length) || "/";
    return NextResponse.redirect(url, 308);
  }

  // Arabic keeps its /ar prefix
  if (pathname === "/ar" || pathname.startsWith("/ar/")) return;

  // Skip internal paths (incl. the root-level maintenance page)
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.startsWith("/auth") || pathname.startsWith("/dashboard") || pathname.startsWith("/invite") || pathname === "/maintenance" || pathname.includes(".")) return;

  // English is the default locale: serve it at the clean, prefix-less URL
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next|api/auth|favicon.ico|.*\\..*).*)"],
};
