import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { hasLocale, defaultLocale, type Locale } from "./dictionaries";

export async function generateStaticParams() {
  return [{ lang: "en-US" }, { lang: "en-GB" }, { lang: "ar" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = await import(`./dictionaries/${locale}.json`).then(
    (m) => m.default
  );
  return {
    title: dict.metadata.siteTitle,
    description: dict.metadata.siteDescription,
  };
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <div dir={dir}>
      <Header lang={locale} />
      {children}
      <Footer lang={locale} />
    </div>
  );
}
