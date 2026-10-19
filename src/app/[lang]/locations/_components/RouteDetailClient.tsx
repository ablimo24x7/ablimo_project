"use client";

import SectionRenderer from "@/components/section-library/page-renderer";
import type {
    SectionInstance,
    SectionRenderContext,
} from "@/components/section-library/types";

interface Props {
    template: SectionInstance[];
    context: SectionRenderContext;
}

export default function RouteDetailClient({ template, context }: Props) {
    return <SectionRenderer sections={template} context={context} />;
}
