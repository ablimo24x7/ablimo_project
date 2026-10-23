/**
 * Arabic content plumbing for the dashboard post editor.
 *
 * An article keeps one document. Arabic lives beside the English content in
 * `translations`, keyed by a flat "content path" so a single map can address
 * the editor fields (`title`), the FAQ list (`faq.0.q`) and every text node
 * inside a template section (`section.<sectionId>.content.title`).
 *
 * Two maps are stored:
 *   - `ar`     — hand-written Arabic. Never overwritten by the translator.
 *   - `autoAr` — Google translations used when no hand-written value exists.
 *
 * Resolution order for a path: `ar[path]` → `autoAr[path]` → the English value.
 * That is exactly the rule the editor exposes: an Arabic field left empty
 * falls back to the Google translation, a filled one wins.
 */

/** Flat map of content path → Arabic string. */
export type TranslationMap = Record<string, string>;

export interface ArticleTranslations {
  /** Hand-written Arabic overrides, keyed by content path. */
  ar?: TranslationMap;
  /** Google-translated fallbacks, keyed by content path. */
  autoAr?: TranslationMap;
}

/** Prefix used by section paths: `section.<sectionId>.<relative path>`. */
export const SECTION_PATH_PREFIX = "section";

/**
 * Object keys whose string value is copy an editor can translate.
 *
 * Keys holding URLs, ids, icons, style tokens or numbers are deliberately
 * absent so they are never sent to the translator.
 */
const TRANSLATABLE_KEYS = new Set([
  "alt",
  "badge",
  "caption",
  "category",
  "cityToCityLabel",
  "content",
  "description",
  "eyebrow",
  "fromLabel",
  "heading",
  "headingAfter",
  "headingHighlight",
  "homeLabel",
  "imageAlt",
  "label",
  "mediaTitle",
  "message",
  "paragraph",
  "question",
  "answer",
  "rootLabel",
  "statLabel",
  "subtitle",
  "successMessage",
  "successTitle",
  "submitLabel",
  "title",
  "titleAfter",
  "titleHighlight",
  "toLabel",
]);

/**
 * Keys whose string descendants are all copy (e.g. a list of rich-text
 * paragraphs). Everything else recurses key by key.
 */
const TRANSLATABLE_CONTAINERS = new Set(["paragraphs"]);

/** Top-level article fields the editor exposes for translation. */
export const ARTICLE_TEXT_PATHS = [
  "title",
  "excerpt",
  "authorName",
  "archiveTag",
  "categoryLabel",
  "bodyContent",
  "keyTakeawaysContent",
  "finalThoughtsContent",
  "seo.metaTitle",
  "seo.metaDescription",
] as const;

/** Paths that hold rich text and must be translated as HTML. */
const HTML_PATH_HINTS = ["bodyContent", "keyTakeawaysContent", "finalThoughtsContent"];

// ── Path helpers ──────────────────────────────────────────────────

/** Read a dotted path from an object. Returns undefined when absent. */
export function getPathValue(root: unknown, path: string): unknown {
  if (!root || !path) return undefined;
  let current: unknown = root;
  for (const key of path.split(".")) {
    if (current === null || current === undefined) return undefined;
    if (typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return current;
}

/** Write a dotted path into an object, creating intermediate containers. */
export function setPathValue(root: unknown, path: string, value: unknown): void {
  if (!root || !path || typeof root !== "object") return;
  const keys = path.split(".");
  let current = root as Record<string, unknown>;
  for (let i = 0; i < keys.length - 1; i += 1) {
    const key = keys[i];
    const nextKey = keys[i + 1];
    const child = current[key];
    if (child === null || typeof child !== "object") {
      current[key] = /^\d+$/.test(nextKey) ? [] : {};
    }
    current = current[key] as Record<string, unknown>;
  }
  current[keys[keys.length - 1]] = value;
}

/** True when a string looks like a link, an anchor or a file path. */
function isUrlLike(value: string): boolean {
  const v = value.trim();
  if (!v) return false;
  if (/^(https?:|mailto:|tel:)/i.test(v)) return true;
  if (v.startsWith("/") || v.startsWith("#")) return true;
  return false;
}

/**
 * True when a string carries a `{token}` placeholder that the renderer
 * resolves later (e.g. "About {country}").
 */
export function hasToken(value: string): boolean {
  return /\{[a-zA-Z_][a-zA-Z0-9_]*\}/.test(value);
}

/**
 * Split a string into its literal text and its `{token}` placeholders so the
 * text can be translated without the translator mangling the placeholders.
 */
export function splitTokens(value: string): Array<{ text: string; token: string }> {
  const parts: Array<{ text: string; token: string }> = [];
  const pattern = /\{[a-zA-Z_][a-zA-Z0-9_]*\}/g;
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(value)) !== null) {
    if (match.index > cursor) {
      parts.push({ text: value.slice(cursor, match.index), token: "" });
    }
    parts.push({ text: "", token: match[0] });
    cursor = match.index + match[0].length;
  }

  if (cursor < value.length) {
    parts.push({ text: value.slice(cursor), token: "" });
  }

  return parts;
}

/**
 * Collect every translatable string path inside a node.
 *
 * `basePath` is the prefix written in front of each discovered path, so
 * walking a section with `basePath: ""` yields `content.title`,
 * `items.0.label`, …
 */
export function collectTextPaths(
  node: unknown,
  basePath = "",
  inherited = false
): string[] {
  const out: string[] = [];

  const walk = (value: unknown, path: string, translatable: boolean): void => {
    if (typeof value === "string") {
      if (translatable && !isUrlLike(value)) out.push(path);
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((entry, index) => walk(entry, `${path}.${index}`, translatable));
      return;
    }
    if (value && typeof value === "object") {
      for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
        const childPath = path ? `${path}.${key}` : key;
        const childTranslatable =
          translatable || TRANSLATABLE_CONTAINERS.has(key);
        if (typeof child === "string") {
          if (
            (TRANSLATABLE_KEYS.has(key) || translatable) &&
            !isUrlLike(child)
          ) {
            out.push(childPath);
          }
        } else {
          walk(child, childPath, childTranslatable);
        }
      }
    }
  };

  walk(node, basePath, inherited);
  return out;
}

/** Translatable text paths inside one template section. */
export function collectSectionTextPaths(section: unknown): string[] {
  if (!section || typeof section !== "object") return [];
  return collectTextPaths(section, "");
}

/** Full content path of a section text node: `section.<id>.<relative>`. */
export function sectionPath(sectionId: string, relativePath: string): string {
  return `${SECTION_PATH_PREFIX}.${sectionId}.${relativePath}`;
}

/** Split `section.<id>.<relative>` back into its parts. */
export function parseSectionPath(
  path: string
): { sectionId: string; relativePath: string } | null {
  if (!path.startsWith(`${SECTION_PATH_PREFIX}.`)) return null;
  const rest = path.slice(SECTION_PATH_PREFIX.length + 1);
  const dot = rest.indexOf(".");
  if (dot === -1) return null;
  return { sectionId: rest.slice(0, dot), relativePath: rest.slice(dot + 1) };
}

// ── Article path helpers ──────────────────────────────────────────

type AnyArticle = Record<string, unknown>;

/** All translatable paths of an article, including FAQs and sections. */
export function collectArticleTextPaths(article: AnyArticle | null | undefined): string[] {
  if (!article) return [];
  const paths: string[] = [...ARTICLE_TEXT_PATHS];

  const faqs = Array.isArray(article.faqs) ? (article.faqs as unknown[]) : [];
  faqs.forEach((faq, index) => {
    paths.push(`faq.${index}.q`);
    paths.push(`faq.${index}.a`);
  });

  const sections = Array.isArray(article.sections) ? (article.sections as unknown[]) : [];
  sections.forEach((section) => {
    const id = typeof (section as { id?: unknown })?.id === "string" ? (section as { id: string }).id : "";
    if (!id) return;
    collectSectionTextPaths(section).forEach((relative) => {
      paths.push(sectionPath(id, relative));
    });
  });

  return paths;
}

/**
 * Read the English source value for a content path. Returns "" when the
 * article has nothing at that path.
 */
export function readEnglishPath(article: AnyArticle, path: string): string {
  if (!article || !path) return "";

  if (path.startsWith("seo.")) {
    const value = getPathValue(article.seo_metadata ?? {}, path.slice(4));
    return typeof value === "string" ? value : "";
  }

  if (path.startsWith("faq.")) {
    const value = getPathValue(article.faqs ?? [], path.slice(4));
    return typeof value === "string" ? value : "";
  }

  const parsed = parseSectionPath(path);
  if (parsed) {
    const sections = Array.isArray(article.sections)
      ? (article.sections as Array<{ id?: string }>)
      : [];
    const section = sections.find((s) => s?.id === parsed.sectionId);
    if (!section) return "";
    const value = getPathValue(section, parsed.relativePath);
    return typeof value === "string" ? value : "";
  }

  const value = article[path];
  return typeof value === "string" ? value : "";
}

/** True when the value at a path is rich text that needs HTML translation. */
export function isHtmlPath(path: string, value: string): boolean {
  if (HTML_PATH_HINTS.some((hint) => path.includes(hint))) return true;
  return /<\/?[a-z][\s\S]*>/i.test(value);
}

// ── Applying translations ─────────────────────────────────────────

/** Resolver signature: content path → Arabic string (may be empty). */
export type ArabicResolver = (path: string) => string;

/**
 * Build a resolver that prefers hand-written Arabic, then the Google
 * translation cache, then nothing.
 */
export function createResolver(
  translations: ArticleTranslations | null | undefined
): ArabicResolver {
  const manual = translations?.ar ?? {};
  const auto = translations?.autoAr ?? {};
  return (path: string) => manual[path] ?? auto[path] ?? "";
}

/**
 * Apply Arabic overrides to a list of sections.
 *
 * The English structure (ids, order, images, styles) is preserved; only the
 * translatable strings are swapped.
 */
export function applyArabicToSections<T>(sections: T[], resolve: ArabicResolver): T[] {
  if (!Array.isArray(sections) || sections.length === 0) return sections;

  return sections.map((section) => {
    const clone = JSON.parse(JSON.stringify(section ?? {})) as Record<string, unknown>;
    const id = typeof clone.id === "string" ? clone.id : "";
    collectSectionTextPaths(section).forEach((relative) => {
      const arabic = resolve(sectionPath(id, relative));
      if (arabic) setPathValue(clone, relative, arabic);
    });
    return clone as T;
  });
}

/**
 * Return a copy of the article with the Arabic content applied. Used when
 * rendering the Arabic version of a page.
 */
export function applyArabicToArticle<T extends AnyArticle>(
  article: T,
  translations: ArticleTranslations | null | undefined
): T {
  if (!article) return article;
  const resolve = createResolver(translations);

  const next: AnyArticle = { ...article };

  ARTICLE_TEXT_PATHS.forEach((path) => {
    const arabic = resolve(path);
    if (!arabic) return;
    if (path.startsWith("seo.")) {
      next.seo_metadata = { ...(next.seo_metadata ?? {}), [path.slice(4)]: arabic };
    } else {
      next[path] = arabic;
    }
  });

  if (Array.isArray(article.faqs) && article.faqs.length > 0) {
    next.faqs = (article.faqs as unknown[]).map((faq, index) => {
      const entry = (faq ?? {}) as Record<string, unknown>;
      return {
        ...entry,
        q: resolve(`faq.${index}.q`) || entry.q || "",
        a: resolve(`faq.${index}.a`) || entry.a || "",
      };
    });
  }

  if (Array.isArray(article.sections) && article.sections.length > 0) {
    next.sections = applyArabicToSections(article.sections as unknown[], resolve);
  }

  return next as T;
}

/**
 * Build the Arabic section list shown in the editor's Arabic tab.
 *
 * Every translatable string is replaced by its Arabic value. Fields without
 * an Arabic value are emptied so the editor shows an empty input and the
 * server fills them with the Google translation on save.
 */
export function buildArabicSections<T>(sections: T[], resolve: ArabicResolver): T[] {
  if (!Array.isArray(sections) || sections.length === 0) return sections;

  return sections.map((section) => {
    const clone = JSON.parse(JSON.stringify(section ?? {})) as Record<string, unknown>;
    const id = typeof clone.id === "string" ? clone.id : "";
    collectSectionTextPaths(section).forEach((relative) => {
      setPathValue(clone, relative, resolve(sectionPath(id, relative)));
    });
    return clone as T;
  });
}
