import { getDictionary } from "@/app/[lang]/dictionaries";
import CountryDetailClient from "../_components/CountryDetailClient";

export default async function CountryPage({
    params,
}: {
    params: Promise<{ lang: string; country: string }>;
}) {
    const { lang, country } = await params;
    const dict = await getDictionary(lang as "en-US" | "en-GB" | "ar");

    return <CountryDetailClient dict={dict} lang={lang} countrySlug={country} />;
}