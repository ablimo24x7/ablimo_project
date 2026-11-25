import { z } from "zod";
import type { Country, City, CityRoute } from "@/lib/locations";
import type { LocationServiceItem } from "@/lib/blog";
import type { Dictionary } from "@/app/[lang]/dictionaries";

// ── Canonical section types (global) ─────────────────────────────
// Single source of truth for the plug-and-play section shape used by
// services pages, country/city/route pages, and the dashboard editor.
// Byte-compatible with the legacy services `PageSection` so existing
// `pageSections` DB data requires zero migration.

export type SectionScope = "service" | "country" | "city" | "route";
// extensible union — future: "blog", "landing", etc.

export interface SectionInstance {
  id: string;
  type: string;
  variant: string;
  order: number;
  enabled: boolean;
  content: Record<string, unknown>;
  items: Record<string, unknown>[];
  settings: Record<string, unknown>;
  appearance: Record<string, unknown>;
}

export type SectionCategory =
  | "Hero"
  | "Content"
  | "Grids"
  | "CTA"
  | "Stats"
  | "Navigation"
  | "Forms";

export interface SectionDefinition {
  type: string;
  label: string;
  description: string;
  icon: string;
  scopes: SectionScope[];
  category: SectionCategory;
  variants: { value: string; label: string }[];
  defaults: () => SectionInstance;
  contentSchema?: z.ZodType;
  settingsSchema?: z.ZodType;
}

export interface SectionPreset {
  id: string;
  name: string;
  scope: SectionScope;
  section: SectionInstance;
}

// ── Zod (canonical — services `PageSectionSchema` re-exports this) ─

export const SectionInstanceSchema = z.object({
  id: z.string().min(1),
  type: z.string().min(1),
  variant: z.string().optional().default("default"),
  order: z.number().int().min(0).optional().default(0),
  enabled: z.boolean().optional().default(true),
  content: z.record(z.string(), z.unknown()).optional().default({}),
  items: z.array(z.record(z.string(), z.unknown())).optional().default([]),
  settings: z.record(z.string(), z.unknown()).optional().default({}),
  appearance: z.record(z.string(), z.unknown()).optional().default({}),
});

export type SectionInstanceInput = z.input<typeof SectionInstanceSchema>;

export function newSectionId(): string {
  return `sec-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

// ── Render context (shared between registry, renderer, components) ─

export type SectionRenderContext =
  | { kind: "service"; serviceName?: string; serviceUrl?: string }
  | {
      kind: "location";
      lang: string;
      country: Country;
      city?: City;
      fromCity?: City;
      toCity?: City;
      route?: CityRoute;
      services: LocationServiceItem[];
      routes: CityRoute[];
      dict: Dictionary;
    };

export function isLocationContext(
  ctx?: SectionRenderContext
): ctx is Extract<SectionRenderContext, { kind: "location" }> {
  return !!ctx && ctx.kind === "location";
}

export interface SectionRendererProps {
  section: SectionInstance;
  context?: SectionRenderContext;
  serviceName?: string;
  serviceUrl?: string;
}
