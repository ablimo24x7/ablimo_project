const dictionaries = {
  "en-US": () => import("./dictionaries/en-US.json").then((m) => m.default),
  "en-GB": () => import("./dictionaries/en-GB.json").then((m) => m.default),
  ar: () => import("./dictionaries/ar.json").then((m) => m.default),
};

export type Locale = keyof typeof dictionaries;

export const locales: Locale[] = ["en-US", "en-GB", "ar"];
export const defaultLocale: Locale = "en-US";

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale) => dictionaries[locale]();

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
