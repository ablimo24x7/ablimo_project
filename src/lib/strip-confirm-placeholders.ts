const CONFIRM_WITH_DURATION =
  /\\?\[Confirm(?:\s*:[^\]]*)?\\?\]\s*(?:minutes?|mins?|hours?|hrs?)\b/gi;
const CONFIRM_PLACEHOLDER = /\\?\[Confirm(?:\s*:[^\]]*)?\\?\]/gi;

export function stripConfirmText(text: string): string {
  return text
    .replace(CONFIRM_WITH_DURATION, "")
    .replace(CONFIRM_PLACEHOLDER, "")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/[ \t]+([.,;:!?])/g, "$1")
    .replace(/(?:[ \t]*[·|])+\s*$/g, "")
    .replace(/\(\s*\)/g, "")
    .trim();
}

export function stripConfirmPlaceholders(value: unknown): unknown {
  if (typeof value === "string") return stripConfirmText(value);
  if (Array.isArray(value)) return value.map(stripConfirmPlaceholders);

  if (value && typeof value === "object") {
    const prototype = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) return value;

    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, child]) => [
        key,
        stripConfirmPlaceholders(child),
      ])
    );
  }

  return value;
}
