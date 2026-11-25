import Link from "next/link";
import { airportUrl } from "@/lib/locations";
import ShowMoreGrid from "@/app/[lang]/locations/_components/ShowMoreGrid";
import type { SectionInstance, SectionRenderContext } from "../types";
import { isLocationContext } from "../types";

interface AirportsGridSectionProps {
  section: SectionInstance;
  context?: SectionRenderContext;
}

export default function AirportsGridSection({ section, context }: AirportsGridSectionProps) {
  if (!isLocationContext(context) || !context.city) return null;
  const { lang, country, city, dict } = context;

  const c = section.content as Record<string, unknown>;
  const heading = (c.heading as string) || "";
  const airports = city.airports ?? [];
  if (airports.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
      {heading && (
        <h2 className="text-3xl font-serif font-bold text-white tracking-tight mb-8">
          {heading}
        </h2>
      )}
      <ShowMoreGrid
        items={airports.map((airport) => ({
          slug: airport.slug,
          name: `${city.name} – ${airport.name}`,
          iata: airport.iata,
          href: airportUrl(lang, country, city, airport),
        }))}
        moreLabel={dict.press.showMore}
        lessLabel={dict.press.showLess}
        renderItem={(a) => (
          <Link
            href={a.href}
            className="block h-full bg-[#1c1d21] border border-gray-700/50 rounded-xl px-4 py-4 text-center hover:border-white/30 hover:bg-[#2a2c35] transition-all"
          >
            <h3 className="text-sm font-semibold text-gray-200 hover:text-white transition-colors truncate">
              {a.name}
            </h3>
            {a.iata && (
              <span className="inline-block mt-1 text-[11px] uppercase tracking-wide text-abServiceBlue">
                {a.iata}
              </span>
            )}
          </Link>
        )}
      />
    </section>
  );
}
