import type { Metadata } from "next";
import { getDictionary, hasLocale, defaultLocale, type Locale } from "@/app/[lang]/dictionaries";
import PressReleasesClient from "@/app/[lang]/press/releases/_components/PressReleasesClient";
import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  const isAr = locale === "ar";
  return generateSeoMetadata({
    title: isAr ? dict.press.meta.title : "Press Releases & Media | AB.Limo News",
    description: isAr
      ? dict.press.meta.description
      : "Latest news, press releases, and media coverage from AB.Limo. Stay updated on our corporate mobility services, fleet expansion, and industry partnerships.",
    path: "/press/releases",
    lang,
    keywords:
      "AB.Limo press, AB.Limo news, corporate mobility news, luxury transportation press release, chauffeur service media, AB.Limo announcements",
  });
}

export default async function PressReleasesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);

  return <PressReleasesClient dict={dict} lang={lang} />;
}
