import type { SectionInstance, SectionRenderContext } from "./types";

// ── Placeholder resolution ───────────────────────────────────────
// Template strings may contain {country} / {city} / {from} / {to} /
// {distance} / {duration} / {location} tokens, resolved at render
// time from the page context (same .replace() pattern the location
// pages already used — centralized here so every section type gets it).

export function buildTokenMap(context?: SectionRenderContext): Record<string, string> {
  if (!context || context.kind !== "location") return {};

  const ar = context.lang?.startsWith("ar") ?? false;
  const pick = (en?: string, arName?: string) => (ar && arName ? arName : en ?? "");

  const tokens: Record<string, string> = {};

  if (context.lang) tokens.lang = context.lang;

  if (context.country) {
    tokens.country = pick(context.country.name, context.country.nameAr) || context.country.slug;
    tokens.countrySlug = context.country.slug;
    tokens.countryCode = context.country.code;
  }

  if (context.city) {
    tokens.city = pick(context.city.name, context.city.nameAr) || context.city.slug;
    tokens.citySlug = context.city.slug;
  }

  const fromName = context.fromCity
    ? pick(context.fromCity.name, context.fromCity.nameAr) || context.fromCity.slug
    : context.route?.fromName ?? "";
  const toName = context.toCity
    ? pick(context.toCity.name, context.toCity.nameAr) || context.toCity.slug
    : context.route?.toName ?? "";

  tokens.from = fromName;
  tokens.fromName = fromName;
  tokens.to = toName;
  tokens.toName = toName;

  if (context.route) {
    tokens.distance = context.route.distance ?? "";
    tokens.duration = context.route.duration ?? "";
  }

  tokens.location = tokens.city || tokens.country || "";

  return tokens;
}

export function resolvePlaceholders(
  value: string,
  tokens: Record<string, string>
): string {
  if (!tokens || Object.keys(tokens).length === 0) return value;
  return value.replace(/\{(\w+)\}/g, (match, key: string) =>
    Object.prototype.hasOwnProperty.call(tokens, key) ? tokens[key] : match
  );
}

function resolveValue(value: unknown, tokens: Record<string, string>): unknown {
  if (typeof value === "string") return resolvePlaceholders(value, tokens);
  if (Array.isArray(value)) return value.map((v) => resolveValue(v, tokens));
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = resolveValue(v, tokens);
    }
    return out;
  }
  return value;
}

/** Returns a shallow-cloned section with all string tokens resolved. */
export function resolveSectionPlaceholders(
  section: SectionInstance,
  tokens: Record<string, string>
): SectionInstance {
  if (!tokens || Object.keys(tokens).length === 0) return section;
  return {
    ...section,
    content: resolveValue(section.content, tokens) as Record<string, unknown>,
    items: (resolveValue(section.items, tokens) ?? []) as Record<string, unknown>[],
    settings: resolveValue(section.settings, tokens) as Record<string, unknown>,
    appearance: resolveValue(section.appearance, tokens) as Record<string, unknown>,
  };
}
