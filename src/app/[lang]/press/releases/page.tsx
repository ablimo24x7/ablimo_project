import { getDictionary, hasLocale, defaultLocale, type Locale } from "@/app/[lang]/dictionaries";
import PressReleasesClient from "@/components/PressReleasesClient";

export default async function PressReleasesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);

  return <PressReleasesClient dict={dict} />;
}
