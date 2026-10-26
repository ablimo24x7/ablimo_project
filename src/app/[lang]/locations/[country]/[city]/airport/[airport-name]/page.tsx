import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { getAirportForRequest } from "@/lib/locationData";
import AirportTransferClient from "@/app/[lang]/locations/_components/AirportTransferClient";
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

  return generateSeoMetadata({
    title: `${airportName} Airport Transfer | AB ${cityName}`,
    description: `Premium airport transfer service from ${airportName}, ${cityName}. Meet and greet, fixed pricing, and luxury vehicles with AB.`,
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
