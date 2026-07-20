import { getDictionary, hasLocale, defaultLocale, type Locale } from "@/app/[lang]/dictionaries";
import CitiesClient from "@/components/CitiesClient";

const metadata = {
  title: "Our Cities Around the World | AB.Limo",
  description:
    "Premium chauffeur service in cities across the globe. Book your ride in 500+ cities worldwide.",
};

export default async function CitiesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);

  return <CitiesClient dict={dict} lang={lang} />;
}
