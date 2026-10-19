import type { Metadata } from "next";
import { localeBase } from "@/app/[lang]/dictionaries";

const BASE_URL = "https://www.ab.limo";
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
  // Root resolves to the bare origin so the canonical never 308-redirects
  const suffix = cleanPath === "/" ? "" : cleanPath;
  const canonical = `${BASE_URL}${localeBase(lang)}${suffix}`;
  const image = ogImage || DEFAULT_OG_IMAGE;

  // English is served at the prefix-less URL, Arabic at /ar
  const languages: Record<string, string> = {
    en: `${BASE_URL}${suffix}`,
    ar: `${BASE_URL}/ar${suffix}`,
    "x-default": `${BASE_URL}${suffix}`,
  };

  // og:locale mapping
  const isArabic = lang.split("-")[0] === "ar";
  const ogLocale = isArabic ? "ar_SA" : "en_US";
  const alternateLocales = [isArabic ? "en_US" : "ar_SA"];

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
export { DEFAULT_OG_IMAGE, TWITTER_HANDLE };
