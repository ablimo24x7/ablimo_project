"use client";

import * as React from "react";
import { getSectionComponent } from "./registry";
import type { SectionInstance, SectionRenderContext } from "./types";
import { buildTokenMap, resolveSectionPlaceholders } from "./placeholders";

interface SectionRendererProps {
  sections: SectionInstance[];
  context?: SectionRenderContext;
}

/**
 * Location-facing renderer: filters enabled sections, sorts by order,
 * resolves {country}/{city}/{from}/{to}/{distance}/{duration} tokens,
 * and dispatches each section to the unified registry.
 */
export default function SectionRenderer({ sections, context }: SectionRendererProps) {
  const tokens = React.useMemo(() => buildTokenMap(context), [context]);

  const sorted = React.useMemo(
    () =>
      [...(sections ?? [])]
        .filter((s) => s.enabled)
        .sort((a, b) => a.order - b.order),
    [sections]
  );

  if (sorted.length === 0) return null;

  return (
    <main className="min-h-screen bg-[#292a30] text-white antialiased">
      {sorted.map((section) => {
        const Component = getSectionComponent(section.type);
        if (!Component) return null;
        const resolved = resolveSectionPlaceholders(section, tokens);
        return (
          <div key={section.id} data-section-type={section.type}>
            <Component section={resolved} context={context} />
          </div>
        );
      })}
    </main>
  );
}
