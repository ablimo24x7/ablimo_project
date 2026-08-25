export const LOCALES = ["en", "ar"] as const;
export type Locale = (typeof LOCALES)[number];
export const RTL_LOCALES: Locale[] = ["ar"];
export const DEFAULT_LOCALE: Locale = "en";

export const DEPLOYMENT_LOCALE: Locale =
  (process.env.NEXT_PUBLIC_LOCALE as Locale) || DEFAULT_LOCALE;

export function isRtl(locale: Locale): boolean {
  return RTL_LOCALES.includes(locale);
}
