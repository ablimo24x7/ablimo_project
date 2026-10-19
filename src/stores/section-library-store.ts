import { create } from "zustand";
import type { SectionDefinition, SectionScope, SectionPreset } from "@/components/section-library/types";
import {
  SECTION_CATALOG,
  getDefinitionsForScope as catalogGetDefinitionsForScope,
  getDefinition as catalogGetDefinition,
  searchDefinitions as catalogSearchDefinitions,
} from "@/components/section-library/definitions";

export type { SectionPreset } from "@/components/section-library/types";

interface SectionLibraryState {
  catalog: SectionDefinition[];
  customPresets: SectionPreset[]; // DB-hydrated (fast-follow feature)
  getDefinitionsForScope: (scope: SectionScope) => SectionDefinition[];
  getDefinition: (type: string) => SectionDefinition | undefined;
  searchDefinitions: (query: string, scope?: SectionScope) => SectionDefinition[];
  hydrateCustomPresets: (presets: SectionPreset[]) => void;
  addCustomPreset: (preset: SectionPreset) => void;
  removeCustomPreset: (id: string) => void;
}

export const useSectionLibraryStore = create<SectionLibraryState>((set) => ({
  catalog: SECTION_CATALOG,
  customPresets: [],
  getDefinitionsForScope: catalogGetDefinitionsForScope,
  getDefinition: catalogGetDefinition,
  searchDefinitions: catalogSearchDefinitions,
  hydrateCustomPresets: (presets) => set({ customPresets: presets }),
  addCustomPreset: (preset) =>
    set((s) => ({ customPresets: [...s.customPresets, preset] })),
  removeCustomPreset: (id) =>
    set((s) => ({ customPresets: s.customPresets.filter((p) => p.id !== id) })),
}));
