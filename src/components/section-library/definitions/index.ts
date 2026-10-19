import type { SectionDefinition, SectionScope } from "../types";
import { SERVICE_SECTION_DEFINITIONS } from "./service-definitions";
import { LOCATION_SECTION_DEFINITIONS } from "./location-definitions";

export { SERVICE_SECTION_DEFINITIONS } from "./service-definitions";
export { LOCATION_SECTION_DEFINITIONS } from "./location-definitions";

// ── The catalog: single source of truth for every section type ───
// 16 types total: 9 services-derived (5 now multi-scope) + 7 location-only.

export const SECTION_CATALOG: SectionDefinition[] = [
  ...SERVICE_SECTION_DEFINITIONS,
  ...LOCATION_SECTION_DEFINITIONS,
];

export function getDefinitionsForScope(scope: SectionScope): SectionDefinition[] {
  return SECTION_CATALOG.filter((d) => d.scopes.includes(scope));
}

export function getDefinition(type: string): SectionDefinition | undefined {
  return SECTION_CATALOG.find((d) => d.type === type);
}

export function searchDefinitions(query: string, scope?: SectionScope): SectionDefinition[] {
  const q = query.toLowerCase().trim();
  return SECTION_CATALOG.filter(
    (d) =>
      (!scope || d.scopes.includes(scope)) &&
      (d.label.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.type.includes(q))
  );
}
