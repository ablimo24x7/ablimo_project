import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, localeBase, localeHome } from "@/app/[lang]/dictionaries";
import {
    resolveCity,
    titleFromSlug,
    type City,
    type CityRoute,
} from "@/lib/locations";
import {
    getAllCountries,
    getCountryForRequest,
    getCityForRequest,
    findRouteData,
} from "@/lib/locationData";
import { generateSeoMetadata } from "@/lib/seo";
import { RouteJsonLd, BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/StructuredData";
import RouteDetailClient from "@/app/[lang]/locations/_components/RouteDetailClient";
import { getRouteTemplate } from "@/lib/location-template";
import type { SectionRenderContext } from "@/components/section-library/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; country: string; city: string; route: string }>;
}): Promise<Metadata> {
  const { lang, country: countryParam, city: cityParam, route: routeSlug } = await params;
  const originCountry = await getCountryForRequest(countryParam);
  if (!originCountry) return {};
  const originRes = await getCityForRequest(countryParam, cityParam);
  const originCity = originRes?.city ?? resolveCity(originCountry, cityParam);
  if (!originCity) return {};

  const [fromRaw, toRaw] = routeSlug.split("-to-");
  if (!fromRaw || !toRaw) return {};
  const from = resolveCity(originCountry, fromRaw) ?? { slug: fromRaw, name: titleFromSlug(fromRaw) };
  const toCities = await getAllCountries();
  let to: City | undefined;
  for (const c of toCities) {
    const found = resolveCity(c, toRaw);
    if (found) { to = found; break; }
  }
  if (!to) to = { slug: toRaw, name: titleFromSlug(toRaw), airports: [] };

  return generateSeoMetadata({
    title: `${from.name} to ${to.name} Transfer | AB Long Distance`,
    description: `Book a luxury ${from.name} to ${to.name} transfer with AB. Professional chauffeurs, fixed pricing, and premium vehicles for your long-distance journey.`,
    path: `/locations/${countryParam}/${cityParam}/routes/${routeSlug}`,
    lang,
    keywords: `${from.name} to ${to.name}, ${from.name} transfer, long distance ${from.name}, AB route, intercity transfer ${to.name}`,
  });
}

export default async function RoutePage({
  params,
}: {
  params: Promise<{ lang: string; country: string; city: string; route: string }>;
}) {
  const { lang, country: countryParam, city: cityParam, route: routeSlug } = await params;
  const originCountry = await getCountryForRequest(countryParam);
  if (!originCountry) notFound();
  const originRes = await getCityForRequest(countryParam, cityParam);
  const originCity = originRes?.city ?? resolveCity(originCountry, cityParam);
  if (!originCity) notFound();

  const locale = lang as "en-US" | "en-GB" | "ar";
  const dict = await getDictionary(locale);

  const [fromRaw, toRaw] = routeSlug.split("-to-");
  if (!fromRaw || !toRaw) notFound();
  const from = resolveCity(originCountry, fromRaw) ?? ({ slug: fromRaw, name: titleFromSlug(fromRaw), airports: [] } as City);

  const to = await resolveCityInAnyCountry(toRaw);

  const routeInfo = (await findRouteData(from.slug, to.slug)) ?? (await findRouteData(to.slug, from.slug));
  const route: CityRoute = routeInfo ?? {
    fromSlug: from.slug,
    toSlug: to.slug,
    distance: "",
    duration: "",
  };
  const distance = route.distance;
  const duration = route.duration;

  const routeDescription = `Book a luxury ${from.name} to ${to.name} transfer with AB. Professional chauffeurs, fixed pricing, and premium vehicles for your long-distance journey.`;

  const template = await getRouteTemplate(originCountry.slug, lang);
  const context: SectionRenderContext = {
    kind: "location",
    lang,
    country: originCountry,
    city: originCity,
    fromCity: from,
    toCity: to,
    route,
    services: [],
    routes: [],
    dict,
  };

  return (
    <>
      <RouteJsonLd
        fromCity={from.name}
        toCity={to.name}
        description={routeDescription}
        url={`/locations/${countryParam}/${cityParam}/routes/${routeSlug}`}
        distance={distance}
        duration={duration}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${localeHome(lang)}` },
          { name: "Locations", url: `${localeBase(lang)}/locations` },
          { name: originCountry.name, url: `${localeBase(lang)}/locations/${countryParam}` },
          { name: originCity.name, url: `${localeBase(lang)}/locations/${countryParam}/${cityParam}` },
          { name: `${from.name} → ${to.name}`, url: `${localeBase(lang)}/locations/${countryParam}/${cityParam}/routes/${routeSlug}` },
        ]}
      />
      <FAQJsonLd
        items={dict.cityToCity.faq.items.map((item: { q: string; a: string }) => ({
          question: item.q,
          answer: item.a,
        }))}
      />
      <RouteDetailClient template={template} context={context} />
    </>
  );
}

async function resolveCityInAnyCountry(slug: string): Promise<City> {
  const countries = await getAllCountries();
  for (const country of countries) {
    const found = resolveCity(country, slug);
    if (found) return found;
  }
  return { slug, name: titleFromSlug(slug), airports: [] };
}
