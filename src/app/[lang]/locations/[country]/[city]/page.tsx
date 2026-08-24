import { notFound } from "next/navigation";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { resolveCountry, resolveCity } from "@/lib/locations";
import CityDetailClient from "../../_components/CityDetailClient";

export default async function CityPage({
    params,
}: {
    params: Promise<{ lang: string; country: string; city: string }>;
}) {
    const { lang, country: countryParam, city: cityParam } = await params;
    const country = resolveCountry(countryParam);
    if (!country) notFound();
    const city = resolveCity(country, cityParam);
    if (!city) notFound();

    const dict = await getDictionary(lang as "en-US" | "en-GB" | "ar");

    return <CityDetailClient dict={dict} lang={lang} country={country} city={city} />;
}
