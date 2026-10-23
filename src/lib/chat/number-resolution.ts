import { resolveCity, resolveCountry } from "@/lib/locations";

export type PageContext =
  | { type: "service"; name: string; countryName?: string; cityName?: string }
  | { type: "country"; name: string }
  | { type: "city"; name: string };

export type WidgetPage =
  | { kind: "service"; serviceSlug: string; countrySlug: string; citySlug: string }
  | { kind: "location"; countrySlug: string; citySlug: string; isCity: boolean }
  | { kind: "none"; countrySlug: "" };

export function parseWidgetPath(pathname: string): WidgetPage {
  const segments = pathname.split("/");
  const servicesIndex = segments.indexOf("services");
  if (servicesIndex !== -1 && segments[servicesIndex + 1]) {
    return {
      kind: "service",
      serviceSlug: segments[servicesIndex + 1],
      countrySlug: segments[servicesIndex + 2] ?? "",
      citySlug: segments[servicesIndex + 3] ?? "",
    };
  }
  const locationsIndex = segments.indexOf("locations");
  if (locationsIndex !== -1) {
    const countrySlug = segments[locationsIndex + 1] ?? "";
    if (countrySlug && countrySlug !== "cities") {
      return {
        kind: "location",
        countrySlug,
        citySlug: segments[locationsIndex + 2] ?? "",
        isCity: Boolean(segments[locationsIndex + 2]),
      };
    }
  }
  return { kind: "none", countrySlug: "" };
}

export function prettifySlug(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function canonicalCountrySlug(slug: string): string {
  if (!slug) return "";
  return resolveCountry(slug)?.slug ?? slug;
}

export interface NumberConfig {
  universalWhatsappNumber?: string;
  cityWhatsappNumber?: string;
  countryWhatsappNumbers?: { countrySlug: string; number: string }[];
  channels: { id: string; phone: string }[];
}

export function applyWhatsappNumber<C extends NumberConfig>(
  config: C,
  opts: {
    countrySlug: string;
    isCityPage: boolean;
    pageWhatsappNumber?: string | null;
  }
): C {
  const pageOverride = opts.pageWhatsappNumber?.trim();
  const universal = config.universalWhatsappNumber?.trim();
  const cityNumber = config.cityWhatsappNumber?.trim();
  const countryNumber = opts.countrySlug
    ? config.countryWhatsappNumbers?.find(
        (c) =>
          canonicalCountrySlug(c.countrySlug) === opts.countrySlug && c.number?.trim()
      )?.number?.trim()
    : undefined;
  let override: string;
  if (opts.isCityPage) {
    // City service template pages + city location pages.
    override = pageOverride || cityNumber || countryNumber || "";
  } else if (opts.countrySlug) {
    // Country service pages + country location pages.
    override = countryNumber || "";
  } else {
    // Homepage, main service pages, blog, and every other page.
    override = universal || "";
  }
  if (!override) return config;
  return {
    ...config,
    channels: config.channels.map((ch) =>
      ch.id === "whatsapp" ? { ...ch, phone: override } : ch
    ),
  };
}

/** Keep digits plus a single leading "+" — usable for both tel: and wa.me. */
export function normalizePhone(phone: string): string {
  return phone.replace(/[^\d+]/g, "").replace(/(?!^)\+/g, "");
}

/**
 * Resolve the effective dispatch phone for the current page using the
 * same priority chain as the chat widget: page override > global city
 * number > country number > WhatsApp channel phone.
 */
export function resolveEffectivePhone(
  config: NumberConfig | null | undefined,
  opts: {
    countrySlug: string;
    isCityPage: boolean;
    pageWhatsappNumber?: string | null;
  }
): string {
  if (!config) return "";
  const effective = applyWhatsappNumber(config, opts);
  const whatsapp = effective.channels.find((ch) => ch.id === "whatsapp");
  return normalizePhone(whatsapp?.phone || "");
}

/** Human-readable country/city names for a pathname (e.g. "/en/locations/saudi/riyadh"). */
export function resolveLocationNames(pathname: string): {
  countryName?: string;
  cityName?: string;
} {
  const page = parseWidgetPath(pathname);
  if (page.kind === "none") return {};
  const country = page.countrySlug ? resolveCountry(page.countrySlug) : undefined;
  if (!country) return {};
  const cityName = page.citySlug
    ? resolveCity(country, page.citySlug)?.name || prettifySlug(page.citySlug)
    : undefined;
  return { countryName: country.name, cityName };
}
