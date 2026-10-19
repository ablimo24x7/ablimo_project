import Link from "next/link";
import { Dictionary, localeBase } from "@/app/[lang]/dictionaries";
import { getAllCountries } from "@/lib/locationData";
import { getCityServiceCounts } from "@/lib/blog";
import { COUNTRIES, resolveCountry, resolveCity, type Country } from "@/lib/locations";

const pillHoverColors = [
  "hover:border-abBlue hover:text-abBlue",
  "hover:border-abOrange hover:text-abOrange",
  "hover:border-abGreen hover:text-abGreen",
  "hover:border-abRed hover:text-abRed",
  "hover:border-abYellow hover:text-abYellow",
  "hover:border-abBlue hover:text-abBlue",
];

type CityPill = {
  key: string;
  href: string;
  name: string;
  nameAr?: string;
  count: number;
};

export default async function CitiesSection({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: string;
}) {
  const labels = dict.home.citiesSection;
  const [dbCountries, counts] = await Promise.all([
    getAllCountries(),
    getCityServiceCounts(),
  ]);

  // Normalize count keys to canonical country/city slugs (e.g. article
  // "united-arab-emirates"/"alula" -> "uae"/"al-ula").
  const countMap = new Map<string, number>();
  for (const row of counts) {
    const country = resolveCountry(row.countrySlug);
    const countrySlug = country?.slug ?? row.countrySlug;
    const citySlug =
      (country ? resolveCity(country, row.citySlug)?.slug : undefined) ?? row.citySlug;
    countMap.set(`${countrySlug}/${citySlug}`, row.count);
  }

  // Union of static + DB cities so DB-only and static-only cities both show.
  const cityMap = new Map<string, CityPill>();
  const addCountry = (country: Country) => {
    const countrySlug = resolveCountry(country.slug)?.slug ?? country.slug;
    for (const city of country.cities ?? []) {
      if (city.status === "archived") continue;
      const key = `${countrySlug}/${city.slug}`;
      if (!cityMap.has(key)) {
        cityMap.set(key, {
          key,
          href: `${localeBase(lang)}/locations/${countrySlug}/${city.slug}`,
          name: city.name,
          nameAr: city.nameAr,
          count: countMap.get(key) ?? 0,
        });
      }
    }
  };
  for (const country of COUNTRIES) addCountry(country);
  for (const country of dbCountries) addCountry(country);

  let items = Array.from(cityMap.values());
  const withCounts = items.filter((item) => item.count > 0);
  if (withCounts.length) items = withCounts;
  items.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  items = items.slice(0, 8);

  if (!items.length) return null;

  const countLabel = (count: number) =>
    count === 1
      ? labels.serviceCountOne
      : labels.servicesCount.replace("{count}", String(count));

  return (
    <section id="cities" className="py-20 bg-abBlack border-b border-gray-900 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-4">
          {labels.badge}
        </h2>
        <p className="text-white text-2xl font-semibold mb-10">{labels.title}</p>
        <div className="flex flex-wrap justify-center gap-3">
          {items.map((item, i) => (
            <Link
              key={item.key}
              href={item.href}
              className={`group w-[calc(50%-0.375rem)] sm:w-[calc(25%-0.5625rem)] px-6 py-3 rounded bg-abDarkGray border border-gray-800 text-gray-300 ${pillHoverColors[i % pillHoverColors.length]} transition-all text-center`}
            >
              <span className="block font-medium text-sm">
                {lang === "ar" && item.nameAr ? item.nameAr : item.name}
              </span>
              {item.count > 0 && (
                <span className="block text-xs text-gray-500 mt-0.5 group-hover:text-inherit">
                  {countLabel(item.count)}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
