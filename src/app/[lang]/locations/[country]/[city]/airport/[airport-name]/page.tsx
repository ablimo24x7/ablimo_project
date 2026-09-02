import { notFound } from "next/navigation";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { getAirportForRequest } from "@/lib/locationData";
import AirportTransferClient from "@/app/[lang]/locations/_components/AirportTransferClient";

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
