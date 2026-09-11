import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import GoogleTranslate from "@/components/GoogleTranslate";
import { hasLocale, defaultLocale, type Locale } from "./dictionaries";
import { getSession } from "@/lib/auth/server";
import ComingSoonPage from "./coming-soon/page";

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

  const siteTitle = dict.metadata.siteTitle;
  const siteDescription = dict.metadata.siteDescription;

  return {
    title: siteTitle,
    description: siteDescription,
    openGraph: {
      title: siteTitle,
      description: siteDescription,
      siteName: "AB.Limo",
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type: "website",
      images: [
        {
          url: "https://ab.limo/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: "AB.Limo - Premium Executive & Corporate Mobility",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteDescription,
      images: ["https://ab.limo/opengraph-image.png"],
    },
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

  const session = await getSession();
  const isAuthenticated = !!session?.user?.id;

  if (!isAuthenticated) {
    return (
      <div dir={dir} lang={locale} className="dark">
        <ComingSoonPage params={Promise.resolve({ lang })} />
      </div>
    );
  }

  return (
    <div dir={dir} lang={locale} className="dark">
      <Header lang={locale} />
      {children}
      <Footer lang={locale} />
      <ChatWidget />
      <GoogleTranslate />
    </div>
  );
}
