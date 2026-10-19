import { sendGAEvent } from "@next/third-parties/google";

export type ContactMethod =
  | "whatsapp"
  | "phone"
  | "email"
  | "messenger"
  | "telegram"
  | "viber"
  | "sms"
  | "other";

export type AnalyticsEventMap = {
  cta_click: {
    label: string;
    section: string;
    href: string;
  };
  contact_click: {
    method: ContactMethod | "other";
    location: string;
    label: string;
    page_path?: string;
    page_url?: string;
    user_location?: string;
    whatsapp_number?: string;
  };
  lead_captured: {
    form_id: string;
    form_location: string;
  };
};

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

const IS_DEV = process.env.NODE_ENV === "development";
const IS_DEBUG = process.env.NEXT_PUBLIC_GA_DEBUG === "true";

const INTERNAL_PATHS = [/^\/dashboard/, /^\/auth/, /^\/invite/, /^\/api/];

export function isAnalyticsEnabled(): boolean {
  return GA_MEASUREMENT_ID.length > 0;
}

function isInternalPath(): boolean {
  if (typeof window === "undefined") return false;
  return INTERNAL_PATHS.some((pattern) => pattern.test(window.location.pathname));
}

export function trackEvent<K extends keyof AnalyticsEventMap>(
  event: K,
  params: AnalyticsEventMap[K]
): void {
  if (isInternalPath()) return;

  if (IS_DEV && !IS_DEBUG) {
    console.info("[analytics]", event, params);
    return;
  }

  if (!isAnalyticsEnabled()) return;

  sendGAEvent("event", event, params);
}

export function classifyContactMethod(href: string): ContactMethod | null {
  const value = href.trim().toLowerCase();
  if (!value) return null;
  if (value.startsWith("tel:")) return "phone";
  if (value.startsWith("mailto:")) return "email";
  if (value.startsWith("sms:")) return "sms";
  if (value.startsWith("viber:")) return "viber";
  if (value.includes("wa.me") || value.includes("whatsapp.com")) return "whatsapp";
  if (value.includes("m.me/") || value.includes("facebook.com/messenger")) return "messenger";
  if (value.includes("t.me/") || value.includes("telegram.me")) return "telegram";
  return null;
}

export function extractWhatsAppNumber(href: string): string | undefined {
  const match = href.match(/wa\.me\/(\d+)/);
  return match ? match[1] : undefined;
}

const GEO_CACHE_KEY = "ablimo_user_location";

export async function resolveUserLocation(): Promise<string> {
  if (typeof window === "undefined") return "";
  try {
    const cached = sessionStorage.getItem(GEO_CACHE_KEY);
    if (cached) return cached;
  } catch {}

  let location = "";
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2000);
    const res = await fetch("https://ipapi.co/json/", { signal: controller.signal });
    clearTimeout(timer);
    if (res.ok) {
      const data = await res.json();
      const city = typeof data.city === "string" ? data.city : "";
      const country = typeof data.country_name === "string" ? data.country_name : "";
      location = [city, country].filter(Boolean).join(", ");
    }
  } catch {}

  if (!location) {
    try {
      location = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    } catch {}
  }

  if (location) {
    try {
      sessionStorage.setItem(GEO_CACHE_KEY, location);
    } catch {}
  }
  return location;
}

export function trackContactClick(params: AnalyticsEventMap["contact_click"]): void {
  if (typeof window === "undefined") return;
  const page_path = params.page_path ?? window.location.pathname;
  const page_url = params.page_url ?? window.location.href;
  void resolveUserLocation().then((user_location) => {
    trackEvent("contact_click", {
      ...params,
      page_path,
      page_url,
      user_location: user_location || "unknown",
    });
  });
}
