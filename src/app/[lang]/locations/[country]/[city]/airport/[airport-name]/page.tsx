import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { getAirportForRequest } from "@/lib/locationData";
import AirportTransferClient from "@/app/[lang]/locations/_components/AirportTransferClient";
import AirportPageClient from "@/components/airports/AirportPageClient";
import { getAirportData, ALL_AIRPORTS } from "@/lib/airports-data";
import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; country: string; city: string; "airport-name": string }>;
}): Promise<Metadata> {
  const { lang, country: countryParam, city: cityParam, "airport-name": airportParam } = await params;
  const res = await getAirportForRequest(countryParam, cityParam, airportParam);
  if (!res) return {};

  const airportName = lang === "ar" && res.airport.nameAr ? res.airport.nameAr : res.airport.name;
  const cityName = lang === "ar" && res.city.nameAr ? res.city.nameAr : res.city.name;
  const countryName = lang === "ar" && res.country.nameAr ? res.country.nameAr : res.country.name;

  const richData =
    getAirportData(airportParam) ||
    getAirportData(res.airport.slug) ||
    ALL_AIRPORTS.find(
      (a) => a.iata.toLowerCase() === res.airport.iata.toLowerCase()
    );

  const description =
    richData?.heroDescription.replace(/\n+/g, " ").slice(0, 160).trim() ||
    `Premium airport transfer service from ${airportName}, ${cityName}. Meet and greet, fixed pricing, and luxury vehicles with AB.`;

  return generateSeoMetadata({
    title: `${airportName} Airport Transfer | AB ${cityName}`,
    description,
    path: `/locations/${countryParam}/${cityParam}/airport/${airportParam}`,
    lang,
    keywords: `${airportName} airport transfer, ${airportName} limousine, ${cityName} airport service, AB ${airportName}, luxury airport pickup ${cityName}`,
  });
}

export default async function AirportPage({
    params,
}: {
    params: Promise<{ lang: string; country: string; city: string; "airport-name": string }>;
}) {
    const { lang, country: countryParam, city: cityParam, "airport-name": airportParam } = await params;
    const res = await getAirportForRequest(countryParam, cityParam, airportParam);
    if (!res) notFound();

    const dict = await getDictionary(lang as "en-US" | "en-GB" | "ar");

    const richData =
        getAirportData(airportParam) ||
        getAirportData(res.airport.slug) ||
        ALL_AIRPORTS.find(
            (a) => a.iata.toLowerCase() === res.airport.iata.toLowerCase()
        );

    if (richData) {
        return <AirportPageClient data={richData} lang={lang} dict={dict} />;
    }

    return (
        <AirportTransferClient
            dict={dict}
            lang={lang}
            country={res.country}
            city={res.city}
            airport={res.airport}
        />
    );
}
