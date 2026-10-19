import { getDefinition } from "../definitions";
import type { SectionInstance } from "../types";

// ── Slug ↔ data-key aliases ──────────────────────────────────────
// Runtime location slugs (DB) differ from the keys used in the
// dictionary / about-content data structures. Normalize both ways.

/** Runtime country slug → countryAbout / cityContent key */
export const COUNTRY_CONTENT_KEY: Record<string, string> = {
  uae: "united-arab-emirates",
};

/** Runtime city slug → cityContent key */
export const CITY_CONTENT_KEY: Record<string, string> = {
  "kuwait-city": "kuwait",
};

/** cityContent / city image-map key → runtime city slug */
export const CITY_SLUG_KEY: Record<string, string> = {
  kuwait: "kuwait-city",
};

/** Re-key a city image map onto runtime city slugs. */
export function normalizeCityImageMap(
  map: Record<string, string>
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, url] of Object.entries(map)) {
    out[CITY_SLUG_KEY[key] ?? key] = url;
  }
  return out;
}

interface SectionOver {
  variant?: string;
  content: Record<string, unknown>;
  items?: Record<string, unknown>[];
  settings?: Record<string, unknown>;
  appearance?: Record<string, unknown>;
}

/**
 * Build a section from the catalog definition defaults. Content is
 * replaced wholesale — never merged — so sample copy from the services
 * defaults can never leak into location templates. Settings and
 * appearance layer on top of the definition base (they carry keys the
 * components require, e.g. hero minHeight / overlayOpacity).
 */
export function makeSection(type: string, over: SectionOver): SectionInstance {
  const def = getDefinition(type);
  if (!def) throw new Error(`makeSection: unknown section type "${type}"`);
  const base = def.defaults();
  return {
    ...base,
    variant: over.variant ?? base.variant,
    content: over.content,
    items: over.items ?? [],
    settings: { ...base.settings, ...over.settings },
    appearance: { ...base.appearance, ...over.appearance },
  };
}

/** Assign sequential order indexes across a template's sections. */
export function withOrder(sections: SectionInstance[]): SectionInstance[] {
  return sections.map((section, index) => ({ ...section, order: index }));
}
