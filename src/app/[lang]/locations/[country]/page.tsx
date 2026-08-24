import { notFound } from "next/navigation";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { resolveCountry } from "@/lib/locations";
import CountryDetailClient from "../_components/CountryDetailClient";

export default async function CountryPage({
    params,
}: {
    params: Promise<{ lang: string; country: string }>;
}) {
    const { lang, country: countryParam } = await params;
    const country = resolveCountry(countryParam);
    if (!country) notFound();

    const dict = await getDictionary(lang as "en-US" | "en-GB" | "ar");

    return <CountryDetailClient dict={dict} lang={lang} country={country} />;
}
