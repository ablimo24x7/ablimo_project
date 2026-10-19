"use client";

import PageRenderer from "@/components/services/sections/page-renderer";
import { useCityTemplateFlag, usePageWhatsappNumber } from "@/components/chat/widget-context";
import type { PageSection } from "@/components/services/sections/section-types";

interface CityPageRendererProps {
  sections: PageSection[];
  serviceName?: string;
  serviceUrl?: string;
  whatsappNumber?: string;
}

export default function CityPageRenderer({ sections, serviceName, serviceUrl, whatsappNumber }: CityPageRendererProps) {
  useCityTemplateFlag(true);
  usePageWhatsappNumber(true, whatsappNumber);

  return (
    <main className="min-h-screen bg-[#050505] text-white antialiased">
      <PageRenderer sections={sections} serviceName={serviceName} serviceUrl={serviceUrl} />
    </main>
  );
}
