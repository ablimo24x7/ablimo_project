import type { Metadata } from "next";

const BASE_URL = "https://ab.limo";
const LOCALES = ["en-US", "en-GB", "ar"] as const;
const DEFAULT_OG_IMAGE = `${BASE_URL}/opengraph-image.png`;
const TWITTER_HANDLE = "@ablimo";

interface SeoOptions {
  title: string;
  description: string;
  path: string;
  lang: string;
  keywords?: string;
  ogImage?: string;
  noindex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
}

export function generateSeoMetadata({
  title,
  description,
  path,
  lang,
  keywords,
  ogImage,
  noindex,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
}: SeoOptions): Metadata {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const canonical = `${BASE_URL}/${lang}${cleanPath}`;
  const image = ogImage || DEFAULT_OG_IMAGE;

  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    languages[locale] = `${BASE_URL}/${locale}${cleanPath}`;
  }
  languages["x-default"] = `${BASE_URL}/${LOCALES[0]}${cleanPath}`;

  // og:locale mapping
  const ogLocale = lang === "ar" ? "ar_SA" : "en_US";
  const alternateLocales = LOCALES.filter((l) => l !== lang).map((l) =>
    l === "ar" ? "ar_SA" : "en_US"
  );

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "AB.Limo",
      type,
      locale: ogLocale,
      alternateLocale: alternateLocales,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(authors ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title,
      description,
      images: [image],
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}

export const SITE_NAME = "AB.Limo";
export const SITE_URL = BASE_URL;
export { LOCALES, DEFAULT_OG_IMAGE, TWITTER_HANDLE };
