import { notFound } from "next/navigation";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { getCountryForRequest, getRoutesForCountry } from "@/lib/locationData";
import CountryDetailClient from "../_components/CountryDetailClient";

export default async function CountryPage({
    params,
}: {
    params: Promise<{ lang: string; country: string }>;
}) {
    const { lang, country: countryParam } = await params;
    const country = await getCountryForRequest(countryParam);
    if (!country) notFound();

    const routes = await getRoutesForCountry(country);
    const dict = await getDictionary(lang as "en-US" | "en-GB" | "ar");

    return <CountryDetailClient dict={dict} lang={lang} country={country} routes={routes} />;
}