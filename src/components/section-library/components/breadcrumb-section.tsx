import Link from "next/link";
import { locationsUrl, countryUrl, cityUrl } from "@/lib/locations";
import type { SectionInstance, SectionRenderContext } from "../types";
import { isLocationContext } from "../types";
import { localeHome } from "@/app/[lang]/dictionaries";

interface BreadcrumbSectionProps {
  section: SectionInstance;
  context?: SectionRenderContext;
}

export default function BreadcrumbSection({ section, context }: BreadcrumbSectionProps) {
  if (!isLocationContext(context)) return null;
  const { lang, country, city, fromCity, toCity, route, dict } = context;

  const c = section.content as Record<string, unknown>;
  const homeLabel =
    (c.homeLabel as string) || dict.countries?.breadcrumb?.home || "Home";
  const rootLabel =
    (c.rootLabel as string) || dict.countries?.breadcrumb?.countries || "Locations";

  const fromName = fromCity?.name ?? route?.fromName;
  const toName = toCity?.name ?? route?.toName;
  const isRoutePage = !!fromName && !!toName;

  const separator = (
    <span aria-hidden="true">→</span>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
      <nav
        aria-label="Breadcrumb navigation"
        className="text-sm text-gray-400 flex flex-wrap items-center gap-2"
      >
        <Link href={`${localeHome(lang)}`} className="hover:text-white transition-colors">
          {homeLabel}
        </Link>
        {separator}
        <Link href={locationsUrl(lang)} className="hover:text-white transition-colors">
          {rootLabel}
        </Link>
        {city || isRoutePage ? (
          <>
            {separator}
            <Link
              href={countryUrl(lang, country)}
              className="hover:text-white transition-colors"
            >
              {country.name}
            </Link>
          </>
        ) : null}
        {isRoutePage && city ? (
          <>
            {separator}
            <Link
              href={cityUrl(lang, country, city)}
              className="hover:text-white transition-colors"
            >
              {city.name}
            </Link>
          </>
        ) : null}
        {isRoutePage && fromName && toName ? (
          <>
            {separator}
            <span className="text-white">
              {fromName} → {toName}
            </span>
          </>
        ) : (
          <>
            {separator}
            <span className="text-white font-medium" aria-current="page">
              {city ? city.name : country.name}
            </span>
          </>
        )}
      </nav>
    </div>
  );
}
