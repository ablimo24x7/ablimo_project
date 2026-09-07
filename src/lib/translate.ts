/**
 * Translation utilities.
 *
 * All translation is now handled via dictionary files (ar.json, en-US.json, en-GB.json).
 * These functions are kept as stubs to maintain API compatibility.
 */

export async function translateText(
  text: string,
  _targetLocale: string
): Promise<string> {
  return text;
}

export async function translateHtml(
  html: string,
  _targetLocale: string
): Promise<string> {
  return html;
}

export function needsTranslation(
  targetLocale: string,
  sourceLocale: string
): boolean {
  const shortTarget = targetLocale.split("-")[0];
  const shortSource = sourceLocale.split("-")[0];
  return shortTarget !== shortSource;
}
