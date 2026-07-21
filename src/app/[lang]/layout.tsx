import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { hasLocale, defaultLocale, type Locale } from "./dictionaries";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  display: "swap",
  variable: "--font-montserrat",
});

export async function generateStaticParams() {
  return [{ lang: "en-US" }, { lang: "en-UK" }, { lang: "ar" }];
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

export default async function RootLayout({
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
    <html
      lang={locale}
      dir={dir}
      className={`${montserrat.variable} antialiased`}
    >
      <body className="text-white antialiased overflow-x-hidden selection:bg-gray-600">
        <Header lang={locale} />
        {children}
        <Footer lang={locale} />
      </body>
    </html>
  );
}
