import { getDictionary } from "@/app/[lang]/dictionaries";
import CityDetailClient from "../../_components/CityDetailClient";

export default async function CityPage({
    params,
}: {
    params: Promise<{ lang: string; country: string; city: string }>;
}) {
    const { lang, country, city } = await params;
    const dict = await getDictionary(lang as "en-US" | "en-UK" | "ar");

    return <CityDetailClient dict={dict} lang={lang} countrySlug={country} citySlug={city} />;
}