import { getDictionary } from "@/app/[lang]/dictionaries";
import AirportTransferCityClient from "@/app/[lang]/countries/_components/AirportTransferCityClient";

export default async function DynamicAirportTransferPage({
  params,
}: {
  params: Promise<{ lang: string; country: string; city: string }>;
}) {
  const { lang, country, city } = await params;
  const dict = await getDictionary(lang as "en-US" | "en-GB" | "ar");

  return <AirportTransferCityClient dict={dict} lang={lang} countrySlug={country} citySlug={city} />;
}
