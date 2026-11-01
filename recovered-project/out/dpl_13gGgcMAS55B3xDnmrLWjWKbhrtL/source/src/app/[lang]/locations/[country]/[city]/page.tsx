import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { getCityForRequest, getRoutesForCity } from "@/lib/locationData";
import CityDetailClient from "../../_components/CityDetailClient";
import { generateSeoMetadata } from "@/lib/seo";
import { CityJsonLd, BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/StructuredData";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; country: string; city: string }>;
}): Promise<Metadata> {
  const { lang, country: countryParam, city: cityParam } = await params;
  const res = await getCityForRequest(countryParam, cityParam);
  if (!res) return {};

  const cityName = lang === "ar" && res.city.nameAr ? res.city.nameAr : res.city.name;
  const countryName = lang === "ar" && res.country.nameAr ? res.country.nameAr : res.country.name;
  const description = lang === "ar" && res.city.descriptionAr ? res.city.descriptionAr : res.city.description;

  return generateSeoMetadata({
    title: `Premium Chauffeur Service in ${cityName}, ${countryName} | AB.Limo`,
    description: description || `AB.Limo provides luxury chauffeur-driven transportation in ${cityName}, ${countryName}. Airport transfers, corporate travel, and event logistics with premium vehicles.`,
    path: `/locations/${countryParam}/${cityParam}`,
    lang,
    keywords: `AB.Limo ${cityName}, chauffeur service ${cityName}, luxury transportation ${cityName}, airport transfer ${cityName}, ${cityName} limousine, ${countryName} executive travel`,
  });
}

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
    const cityName = isArabic && res.city.nameAr ? res.city.nameAr : res.city.name;
    const countryName = isArabic && res.country.nameAr ? res.country.nameAr : res.country.name;
    const cityDescription = res.city.description || `AB.Limo provides luxury chauffeur-driven transportation in ${cityName}, ${countryName}. Airport transfers, corporate travel, and event logistics with premium vehicles.`;

    return (
      <>
        <CityJsonLd
          cityName={cityName}
          countryName={countryName}
          description={cityDescription}
          url={`/locations/${countryParam}/${cityParam}`}
        />
        <BreadcrumbJsonLd
          items={[
            { name: "Home", url: `/${lang}` },
            { name: "Locations", url: `/${lang}/locations` },
            { name: countryName, url: `/${lang}/locations/${countryParam}` },
            { name: cityName, url: `/${lang}/locations/${countryParam}/${cityParam}` },
          ]}
        />
        {res.city.faqs && res.city.faqs.length > 0 && (
          <FAQJsonLd
            items={res.city.faqs.map((faq: { q: string; a: string }) => ({
              question: faq.q,
              answer: faq.a,
            }))}
          />
        )}
        <CityDetailClient dict={dict} lang={lang} country={res.country} city={res.city} routes={routes} sections={sections} />
      </>
    );
}
