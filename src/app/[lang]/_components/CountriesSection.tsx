import Link from "next/link";
import { Dictionary, localeBase } from "@/app/[lang]/dictionaries";
import { getAllCountries } from "@/lib/locationData";
import { getCountryServiceCounts } from "@/lib/blog";
import { resolveCountry } from "@/lib/locations";
import { countryImage } from "@/lib/country-images";
import CountriesCarousel, { type CountryCardItem } from "./CountriesCarousel";

export default async function CountriesSection({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: string;
}) {
  const labels = dict.home.countriesSection;
  const [countries, counts] = await Promise.all([
    getAllCountries(),
    getCountryServiceCounts(),
  ]);

  const items: CountryCardItem[] = countries
    .map((country) => {
      const canonical = resolveCountry(country.slug)?.slug ?? country.slug;
      const services = counts[canonical] ?? 0;
      const cities = (country.cities ?? []).filter((c) => c.status !== "archived").length;
      return {
        slug: canonical,
        href: `${localeBase(lang)}/locations/${canonical}`,
        name: lang === "ar" && country.nameAr ? country.nameAr : country.name,
        image: countryImage(country.code),
        services,
        cities,
        label: services
          ? labels.servicesInCities
              .replace("{services}", String(services))
              .replace("{cities}", String(cities))
          : "",
      };
    })
    .sort((a, b) => b.services - a.services || b.cities - a.cities);

  const withCounts = items.filter((item) => item.services > 0);
  const visible = withCounts.length ? withCounts : items;

  if (!visible.length) return null;

  return (
    <section id="locations" className="py-24 bg-[#0a0a0a] border-b border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold tracking-widest text-abBlue uppercase mb-2">
              {labels.badge}
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white">{labels.title}</h3>
            <p className="mt-4 text-gray-400">{labels.desc}</p>
          </div>
          <div className="mt-6 md:mt-0">
            <Link
              href={`${localeBase(lang)}/locations`}
              className="text-gray-300 font-semibold hover:text-abBlue border-b border-gray-600 hover:border-abBlue pb-1 transition-colors inline-flex items-center text-sm"
            >
              {labels.link} <i className="fa-solid fa-arrow-right ml-2 text-xs"></i>
            </Link>
          </div>
        </div>

        <CountriesCarousel items={visible} prevLabel={labels.prev} nextLabel={labels.next} />
      </div>
    </section>
  );
}
