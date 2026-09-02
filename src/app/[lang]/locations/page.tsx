import { getDictionary, hasLocale, defaultLocale, type Locale } from "@/app/[lang]/dictionaries";
import { getAllCountries } from "@/lib/locationData";
import CountriesClient from "./_components/CountriesClient";

export const metadata = {
  title: "AB.Limo Global Availability",
  description:
    "Luxury chauffeur service across 50+ countries worldwide.",
};

export default async function LocationsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);

  const countries = await getAllCountries();

  return <CountriesClient dict={dict} lang={lang} countries={countries} />;
}
