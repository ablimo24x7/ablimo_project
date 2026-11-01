const dictionaries = {
  "en-US": () => import("./dictionaries/en-US.json").then((m) => m.default),
  "en-GB": () => import("./dictionaries/en-GB.json").then((m) => m.default),
  ar: () => import("./dictionaries/ar.json").then((m) => m.default),
};

export type Locale = keyof typeof dictionaries;

/** Locales exposed as URLs / in the language switcher. */
export const locales: Locale[] = ["en-US", "ar"];
export const defaultLocale: Locale = "en-US";

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale) => dictionaries[locale]();

/**
 * URL prefix for a locale: Arabic lives at /ar, English is served at the
 * prefix-less default URL (""), so `${localeBase(lang)}/about` yields
 * `/about` for English and `/ar/about` for Arabic.
 */
export const localeBase = (lang: string): string =>
  lang.split("-")[0] === "ar" ? "/ar" : "";

/** Home URL for a locale: `/` for English, `/ar` for Arabic. */
export const localeHome = (lang: string): string => localeBase(lang) || "/";

export const localeContact = (lang: string): string => {
  const base = localeBase(lang);
  return base ? `${base}/contact` : "/contact";
};

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
