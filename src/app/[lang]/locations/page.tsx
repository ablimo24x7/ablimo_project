import { getDictionary, hasLocale, defaultLocale, type Locale } from "@/app/[lang]/dictionaries";
import { getAllCountries } from "@/lib/locationData";
import { translateText, needsTranslation } from "@/lib/translate";
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

  // Translate country names for non-English locales
  if (needsTranslation(lang, "en")) {
    for (const country of countries) {
      country.name = await translateText(country.name, lang);
    }
  }

  return <CountriesClient dict={dict} lang={lang} countries={countries} />;
}
