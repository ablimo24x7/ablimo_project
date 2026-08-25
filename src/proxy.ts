import { NextRequest, NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const locales = ["en-US", "en-GB", "ar"];
const defaultLocale = "en-US";

const protectedPaths = ["/dashboard", "/api/articles", "/api/categories", "/api/users", "/api/settings", "/api/dashboard", "/api/invitations"];

function isProtectedPath(pathname: string): boolean {
  return protectedPaths.some((p) => pathname.startsWith(p));
}

function getLocale(request: NextRequest): string {
  const headers = { "accept-language": request.headers.get("accept-language") || "" };
  const languages = new Negotiator({ headers }).languages();
  try {
    return match(languages, locales, defaultLocale);
  } catch {
    return defaultLocale;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

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

  // Locale redirect logic
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Skip internal paths
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.startsWith("/auth") || pathname.startsWith("/dashboard") || pathname.includes(".")) return;

  // Redirect to the locale-prefixed path
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api/auth|favicon.ico|.*\\..*).*)"],
};
