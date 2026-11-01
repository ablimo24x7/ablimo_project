import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { getCountryForRequest, getRoutesForCountry } from "@/lib/locationData";
import CountryDetailClient from "../_components/CountryDetailClient";
import { generateSeoMetadata } from "@/lib/seo";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; country: string }>;
}): Promise<Metadata> {
  const { lang, country: countryParam } = await params;
  const country = await getCountryForRequest(countryParam);
  if (!country) return {};

  const name = lang === "ar" && country.nameAr ? country.nameAr : country.name;
  const description = lang === "ar" && country.descriptionAr ? country.descriptionAr : country.description;

  return generateSeoMetadata({
    title: `Premium Chauffeur Service in ${name} | AB.Limo`,
    description: description || `AB.Limo provides luxury chauffeur-driven transportation in ${name}. Airport transfers, corporate travel, and event logistics with premium vehicles and professional drivers.`,
    path: `/locations/${countryParam}`,
    lang,
    keywords: `AB.Limo ${name}, chauffeur service ${name}, luxury transportation ${name}, airport transfer ${name}, ${name} limousine, executive travel ${name}`,
  });
}

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

    const isArabic = lang === "ar";

    if (isArabic) {
        if (country.nameAr) country.name = country.nameAr;
        if (country.descriptionAr) country.description = country.descriptionAr;
        if (country.faqsAr?.length) country.faqs = country.faqsAr;

        for (const city of country.cities ?? []) {
            if (city.nameAr) city.name = city.nameAr;
            if (city.descriptionAr) city.description = city.descriptionAr;
            if (city.faqsAr?.length) city.faqs = city.faqsAr;

            for (const airport of city.airports ?? []) {
                if (airport.nameAr) airport.name = airport.nameAr;
                if (airport.descriptionAr) airport.description = airport.descriptionAr;
            }
        }
    }

    return <CountryDetailClient dict={dict} lang={lang} country={country} routes={routes} />;
}
