import { notFound } from "next/navigation";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { getCityForRequest, getRoutesForCity } from "@/lib/locationData";
import CityDetailClient from "../../_components/CityDetailClient";

export default async function CityPage({
    params,
}: {
    params: Promise<{ lang: string; country: string; city: string }>;
}) {
    const { lang, country: countryParam, city: cityParam } = await params;
    const res = await getCityForRequest(countryParam, cityParam);
    if (!res) notFound();

    const routes = await getRoutesForCity(res.city.slug);
    const dict = await getDictionary(lang as "en-US" | "en-GB" | "ar");

    return <CityDetailClient dict={dict} lang={lang} country={res.country} city={res.city} routes={routes} />;
}