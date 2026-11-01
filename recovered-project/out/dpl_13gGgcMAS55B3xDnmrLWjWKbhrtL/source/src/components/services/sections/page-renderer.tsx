"use client";

import * as React from "react";
import { getSectionComponent } from "./registry";
import type { PageSection } from "./section-types";

interface PageRendererProps {
  sections: PageSection[];
  serviceName?: string;
  serviceUrl?: string;
}

export default function PageRenderer({ sections, serviceName, serviceUrl }: PageRendererProps) {
  const sorted = React.useMemo(
    () =>
      [...sections]
        .filter((s) => s.enabled)
        .sort((a, b) => a.order - b.order),
    [sections]
  );

  return (
    <main className="min-h-screen bg-abDarkGray text-white antialiased selection:bg-abServiceBlue selection:text-white">
      {sorted.map((section) => {
        const Component = getSectionComponent(section.type);
        if (!Component) return null;
        return (
          <Component
            key={section.id}
            section={section}
            serviceName={serviceName}
            serviceUrl={serviceUrl}
          />
        );
      })}
    </main>
  );
}
