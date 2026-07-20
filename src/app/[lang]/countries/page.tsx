import { getDictionary, hasLocale, defaultLocale, type Locale } from "@/app/[lang]/dictionaries";
import CountriesClient from "@/components/CountriesClient";

const metadata = {
  title: "AB.Limo Global Availability",
  description:
    "Luxury chauffeur service across 50+ countries worldwide.",
};

export default async function CountriesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);

  return <CountriesClient dict={dict} lang={lang} />;
}
