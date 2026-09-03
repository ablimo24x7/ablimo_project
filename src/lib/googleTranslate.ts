/**
 * Google Translate free API client.
 * Uses the public endpoint for translation.
 */

const GOOGLE_TRANSLATE_URL = "https://translate.googleapis.com/translate_a/single";

export async function googleTranslate(
  text: string,
  targetLang: string = "ar"
): Promise<string> {
  if (!text || !text.trim()) return text;

  try {
    const url = new URL(GOOGLE_TRANSLATE_URL);
    url.searchParams.set("client", "gtx");
    url.searchParams.set("sl", "en");
    url.searchParams.set("tl", targetLang);
    url.searchParams.set("dt", "t");
    url.searchParams.set("q", text);

    const res = await fetch(url.toString());
    if (!res.ok) {
      console.error(`[googleTranslate] API error: ${res.status}`);
      return text;
    }

    const data = await res.json();
    // Response format: [[["translated text","source text",null,null,10]],null,"en"]
    const translated = data?.[0]?.map((item: any[]) => item[0]).join("") || text;
    return translated;
  } catch (error) {
    console.error(`[googleTranslate] Error:`, error);
    return text;
  }
}

export async function googleTranslateHtml(
  html: string,
  targetLang: string = "ar"
): Promise<string> {
  if (!html || !html.trim()) return html;

  // For HTML content, translate in chunks to preserve structure
  // Split by paragraphs or sections
  const chunks = html.split(/(<[^>]+>)/);
  const translatedChunks: string[] = [];

  for (const chunk of chunks) {
    if (chunk.match(/^<[^>]+>$/)) {
      // It's an HTML tag, keep it as is
      translatedChunks.push(chunk);
    } else if (chunk.trim()) {
      // It's text content, translate it
      const translated = await googleTranslate(chunk, targetLang);
      translatedChunks.push(translated);
    } else {
      translatedChunks.push(chunk);
    }
  }

  return translatedChunks.join("");
}
