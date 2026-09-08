import { notFound } from "next/navigation";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { getCityForRequest, getRoutesForCity } from "@/lib/locationData";
import CityDetailClient from "../../_components/CityDetailClient";

export const revalidate = 0;
export const dynamic = "force-dynamic";

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

    const isArabic = lang === "ar";

    if (isArabic) {
        if (res.country.nameAr) res.country.name = res.country.nameAr;
        if (res.country.descriptionAr) res.country.description = res.country.descriptionAr;
        if (res.country.faqsAr?.length) res.country.faqs = res.country.faqsAr;

        if (res.city.nameAr) res.city.name = res.city.nameAr;
        if (res.city.descriptionAr) res.city.description = res.city.descriptionAr;
        if (res.city.faqsAr?.length) res.city.faqs = res.city.faqsAr;

        for (const airport of res.city.airports ?? []) {
            if (airport.nameAr) airport.name = airport.nameAr;
            if (airport.descriptionAr) airport.description = airport.descriptionAr;
        }
    }

    const sections = res.city.sections || [];

    return <CityDetailClient dict={dict} lang={lang} country={res.country} city={res.city} routes={routes} sections={sections} />;
}
