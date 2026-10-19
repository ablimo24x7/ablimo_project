import Link from "next/link";
import { cityUrl } from "@/lib/locations";
import ShowMoreGrid from "@/app/[lang]/locations/_components/ShowMoreGrid";
import type { SectionInstance, SectionRenderContext } from "../types";
import { isLocationContext } from "../types";

interface CitiesGridSectionProps {
  section: SectionInstance;
  context?: SectionRenderContext;
}

export default function CitiesGridSection({ section, context }: CitiesGridSectionProps) {
  if (!isLocationContext(context)) return null;
  const { lang, country, dict } = context;

  const c = section.content as Record<string, unknown>;
  const heading = (c.heading as string) || "";
  const description = c.description as string | undefined;
  const cities = country.cities ?? [];
  if (cities.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-6">
      {heading && (
        <h2 className="text-3xl font-serif font-bold text-white tracking-tight">
          {heading}
        </h2>
      )}
      {description && <p className="text-gray-300 text-[16px] leading-relaxed">{description}</p>}
      <ShowMoreGrid
        items={cities.map((cityObj) => ({
          slug: cityObj.slug,
          name: cityObj.name,
          href: cityUrl(lang, country, cityObj),
        }))}
        moreLabel={dict.press.showMore}
        lessLabel={dict.press.showLess}
        renderItem={(c2) => (
          <Link
            href={c2.href}
            className="block h-full bg-[#1c1d21] border border-gray-700/50 rounded-xl px-4 py-5 text-center hover:border-white/30 hover:bg-[#2a2c35] transition-all"
          >
            <h3 className="text-sm font-semibold text-gray-200 hover:text-white transition-colors">
              {c2.name}
            </h3>
          </Link>
        )}
      />
    </section>
  );
}
