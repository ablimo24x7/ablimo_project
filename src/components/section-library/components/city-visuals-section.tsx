import Image from "next/image";
import type { SectionInstance, SectionRenderContext } from "../types";
import { isLocationContext } from "../types";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=800&h=600&fit=crop";

interface CityVisualsSectionProps {
  section: SectionInstance;
  context?: SectionRenderContext;
}

export default function CityVisualsSection({ section, context }: CityVisualsSectionProps) {
  if (!isLocationContext(context)) return null;

  const c = section.content as Record<string, unknown>;
  const images = (c.images && typeof c.images === "object" ? c.images : {}) as Record<
    string,
    string
  >;
  const fromLabel = (c.fromLabel as string) || "From";
  const toLabel = (c.toLabel as string) || "To";

  const fromSlug = context.fromCity?.slug ?? context.route?.fromSlug ?? "";
  const toSlug = context.toCity?.slug ?? context.route?.toSlug ?? "";
  const fromName =
    context.fromCity?.name ?? context.route?.fromName ?? fromSlug;
  const toName = context.toCity?.name ?? context.route?.toName ?? toSlug;

  if (!fromName || !toName) return null;

  const fromImage = images[fromSlug] || FALLBACK_IMAGE;
  const toImage = images[toSlug] || FALLBACK_IMAGE;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-[300px] rounded-2xl overflow-hidden">
          <Image src={fromImage} alt={fromName} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <p className="text-sm text-gray-300 mb-1">{fromLabel}</p>
            <h3 className="text-2xl font-bold">{fromName}</h3>
          </div>
        </div>
        <div className="relative h-[300px] rounded-2xl overflow-hidden">
          <Image src={toImage} alt={toName} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <p className="text-sm text-gray-300 mb-1">{toLabel}</p>
            <h3 className="text-2xl font-bold">{toName}</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
