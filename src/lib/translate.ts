const localeToLang: Record<string, string> = {
  "en-US": "en",
  "en-GB": "en",
  ar: "ar",
};

const MYMEMORY_API = "https://api.mymemory.translated.net/get";

export async function translateText(
  text: string,
  targetLocale: string
): Promise<string> {
  if (!text || !text.trim()) return text;

  const targetLang = localeToLang[targetLocale] || targetLocale;

  try {
    const url = `${MYMEMORY_API}?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      return data.responseData.translatedText;
    }
    return text;
  } catch {
    return text;
  }
}

export async function translateHtml(
  html: string,
  targetLocale: string
): Promise<string> {
  if (!html || !html.trim()) return html;

  const targetLang = localeToLang[targetLocale] || targetLocale;

  try {
    const url = `${MYMEMORY_API}?q=${encodeURIComponent(html)}&langpair=en|${targetLang}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      return data.responseData.translatedText;
    }
    return html;
  } catch {
    return html;
  }
}

export function needsTranslation(
  articleLocale: string,
  targetLocale: string
): boolean {
  const articleShort = articleLocale.split("-")[0];
  const targetShort = targetLocale.split("-")[0];
  return articleShort !== targetShort;
}
