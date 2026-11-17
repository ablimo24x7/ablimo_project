"use client";

import SectionRenderer from "@/components/section-library/page-renderer";
import type {
    SectionInstance,
    SectionRenderContext,
} from "@/components/section-library/types";
import { stripConfirmPlaceholders } from "@/lib/strip-confirm-placeholders";

interface Props {
    template: SectionInstance[];
    context: SectionRenderContext;
}

export default function CityDetailClient({ template, context }: Props) {
    return (
        <div className="[&_p]:text-justify">
            <SectionRenderer
                sections={stripConfirmPlaceholders(template) as SectionInstance[]}
                context={stripConfirmPlaceholders(context) as SectionRenderContext}
            />
        </div>
    );
}
