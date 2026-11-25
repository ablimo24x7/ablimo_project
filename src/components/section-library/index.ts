export { default as SectionRenderer } from "./page-renderer";
export { getSectionComponent, SECTION_LIBRARY_REGISTRY } from "./registry";
export type { SectionRendererProps, SectionRenderContext } from "./types";
export {
  SectionInstanceSchema,
  newSectionId,
  isLocationContext,
} from "./types";
export type {
  SectionScope,
  SectionInstance,
  SectionDefinition,
  SectionCategory,
  SectionPreset,
  SectionInstanceInput,
} from "./types";
export {
  SECTION_CATALOG,
  getDefinitionsForScope,
  getDefinition,
  searchDefinitions,
} from "./definitions";
export { buildTokenMap, resolvePlaceholders, resolveSectionPlaceholders } from "./placeholders";
