/**
 * Server-side Arabic translation for articles.
 *
 * Given the English article and the hand-written Arabic overrides coming
 * from the dashboard, this produces the two maps stored on the document:
 *
 *   - `ar`     — the hand-written values, untouched.
 *   - `autoAr` — Google translations for every path the editor left empty.
 *
 * A path that already has hand-written Arabic is never translated, so the
 * translator can never overwrite a human translation.
 */

import {
  collectArticleTextPaths,
  isHtmlPath,
  readEnglishPath,
  splitTokens,
  type ArticleTranslations,
  type TranslationMap,
} from "@/lib/arabic-content";
import { googleTranslate, googleTranslateHtml } from "@/lib/googleTranslate";

/** How many translations may be in flight at once. */
const CONCURRENCY = 6;

/** Run `worker` over `items` with a bounded number of parallel calls. */
async function mapWithConcurrency<T>(
  items: T[],
  limit: number,
  worker: (item: T, index: number) => Promise<void>
): Promise<void> {
  let cursor = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      await worker(items[index], index);
    }
  });
  await Promise.all(runners);
}

/**
 * Translate one English value into Arabic.
 *
 * `{token}` placeholders are kept out of the translation: the text around
 * them is translated and the placeholders are put back untouched, so the
 * renderer can still resolve them.
 */
async function translateValue(value: string, path: string): Promise<string> {
  if (!value.trim()) return "";

  const parts = splitTokens(value);
  if (parts.length > 1 || parts[0]?.token) {
    const translated: string[] = [];
    for (const part of parts) {
      if (part.token) {
        translated.push(part.token);
        continue;
      }
      if (!part.text.trim()) {
        translated.push(part.text);
        continue;
      }
      translated.push(await translateSegment(part.text, path));
    }
    return translated.join("");
  }

  return translateSegment(value, path);
}

/** Translate a plain (token free) chunk of copy. */
async function translateSegment(value: string, path: string): Promise<string> {
  try {
    if (isHtmlPath(path, value)) {
      return await googleTranslateHtml(value, "ar");
    }
    return await googleTranslate(value, "ar");
  } catch {
    // googleTranslate already degrades to the source text on failure.
    return value;
  }
}

/**
 * Build the `translations` payload for an article.
 *
 * @param article  The English article (plain object).
 * @param manual   Hand-written Arabic keyed by content path.
 * @param seed     Pre-computed Arabic (already translated elsewhere) used
 *                 instead of calling the translator again.
 */
export async function buildArticleTranslations(
  article: Record<string, unknown>,
  manual: TranslationMap | null | undefined,
  seed: TranslationMap | null | undefined = null
): Promise<ArticleTranslations> {
  const manualMap: TranslationMap = manual ?? {};
  const seedMap: TranslationMap = seed ?? {};
  const paths = collectArticleTextPaths(article);

  const autoMap: TranslationMap = {};
  const keptManual: TranslationMap = {};

  for (const path of paths) {
    const handWritten = manualMap[path];
    if (typeof handWritten === "string" && handWritten.trim()) {
      keptManual[path] = handWritten;
      continue;
    }
  }

  const pending = paths.filter((path) => !(path in keptManual));

  await mapWithConcurrency(pending, CONCURRENCY, async (path) => {
    const seeded = seedMap[path];
    if (typeof seeded === "string" && seeded.trim()) {
      autoMap[path] = seeded;
      return;
    }
    const english = readEnglishPath(article, path);
    if (!english.trim()) return;
    const arabic = await translateValue(english, path);
    // The translator returns the source when the API hiccups — keep it anyway
    // so the field still has a value instead of falling back to English.
    if (arabic) autoMap[path] = arabic;
  });

  // Drop manual entries whose source path no longer exists on the article.
  const known = new Set(paths);
  for (const path of Object.keys(keptManual)) {
    if (!known.has(path)) delete keptManual[path];
  }

  return { ar: keptManual, autoAr: autoMap };
}
