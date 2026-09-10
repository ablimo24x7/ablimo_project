import type { Metadata } from "next";

const BASE_URL = "https://ab.limo";
const LOCALES = ["en-US", "en-GB", "ar"] as const;
const DEFAULT_OG_IMAGE = `${BASE_URL}/opengraph-image.png`;

interface SeoOptions {
  title: string;
  description: string;
  path: string;
  lang: string;
  keywords?: string;
  ogImage?: string;
  noindex?: boolean;
}

export function generateSeoMetadata({
  title,
  description,
  path,
  lang,
  keywords,
  ogImage,
  noindex,
}: SeoOptions): Metadata {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const canonical = `${BASE_URL}/${lang}${cleanPath}`;
  const image = ogImage || DEFAULT_OG_IMAGE;

  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    languages[locale] = `${BASE_URL}/${locale}${cleanPath}`;
  }
  languages["x-default"] = `${BASE_URL}/${LOCALES[0]}${cleanPath}`;

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
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}

export const SITE_NAME = "AB.Limo";
export const SITE_URL = BASE_URL;
export { LOCALES, DEFAULT_OG_IMAGE };
