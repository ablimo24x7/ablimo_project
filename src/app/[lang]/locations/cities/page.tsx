import { getDictionary, hasLocale, defaultLocale, type Locale } from "@/app/[lang]/dictionaries";
import { allCities } from "@/lib/locations";
import { getDynamicCityList } from "@/lib/locationData";
import CitiesClient from "../_components/CitiesClient";

export const metadata = {
  title: "AB.Limo - All Cities",
  description:
    "Luxury chauffeur service across 50+ cities worldwide.",
};

export default async function CitiesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);

  const dynamic = await getDynamicCityList();
  const cities = dynamic.length ? dynamic : allCities();

  return <CitiesClient dict={dict} lang={lang} cities={cities} />;
}
