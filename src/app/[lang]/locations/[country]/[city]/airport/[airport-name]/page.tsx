import { notFound } from "next/navigation";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { resolveAirport, resolveCity, resolveCountry } from "@/lib/locations";
import AirportTransferClient from "@/app/[lang]/locations/_components/AirportTransferClient";

export default async function AirportPage({
    params,
}: {
    params: Promise<{ lang: string; country: string; city: string; "airport-name": string }>;
}) {
    const { lang, country: countryParam, city: cityParam, "airport-name": airportParam } = await params;
    const country = resolveCountry(countryParam);
    if (!country) notFound();
    const city = resolveCity(country, cityParam);
    if (!city) notFound();
    const airport = resolveAirport(city, airportParam);
    if (!airport) notFound();

    const dict = await getDictionary(lang as "en-US" | "en-GB" | "ar");

    return (
        <AirportTransferClient
            dict={dict}
            lang={lang}
            country={country}
            city={city}
            airport={airport}
        />
    );
}
