import Link from "next/link";
import { routeUrl, cityNameBySlug } from "@/lib/locations";
import ShowMoreGrid from "@/app/[lang]/locations/_components/ShowMoreGrid";
import type { SectionInstance, SectionRenderContext } from "../types";
import { isLocationContext } from "../types";

interface RoutesGridSectionProps {
  section: SectionInstance;
  context?: SectionRenderContext;
}

export default function RoutesGridSection({ section, context }: RoutesGridSectionProps) {
  if (!isLocationContext(context) || !context.city) return null;
  const { lang, country, city, routes, dict } = context;

  const c = section.content as Record<string, unknown>;
  const heading = (c.heading as string) || "";
  if (routes.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
      {heading && (
        <h2 className="text-3xl font-serif font-bold text-white tracking-tight mb-8">
          {heading}
        </h2>
      )}
      <ShowMoreGrid
        items={routes.map((route) => {
          const fromName = route.fromName || cityNameBySlug(route.fromSlug);
          const toName = route.toName || cityNameBySlug(route.toSlug);
          return {
            slug: `${route.fromSlug}-to-${route.toSlug}`,
            label: `${fromName} → ${toName}`,
            detail: [route.distance, route.duration].filter(Boolean).join(" · "),
            href: routeUrl(lang, country, city, route),
          };
        })}
        moreLabel={dict.press.showMore}
        lessLabel={dict.press.showLess}
        renderItem={(r) => (
          <Link
            href={r.href}
            className="block h-full bg-[#1c1d21] border border-gray-700/50 rounded-xl px-4 py-4 text-center hover:border-white/30 hover:bg-[#2a2c35] transition-all"
          >
            <h3 className="text-sm font-semibold text-gray-200 hover:text-white transition-colors">
              {r.label}
            </h3>
            {r.detail && (
              <span className="inline-block mt-1 text-[11px] uppercase tracking-wide text-abServiceBlue">
                {r.detail}
              </span>
            )}
          </Link>
        )}
      />
    </section>
  );
}
