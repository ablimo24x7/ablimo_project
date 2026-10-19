import glossaryJson from "./arabic-glossary.json";

const GLOSSARY: Record<string, string> = glossaryJson;

const SKIP_SELECTOR =
  "script, style, textarea, input, select, option, noscript, iframe, [data-glossary], .notranslate, .skiptranslate, .goog-te-combo, #google_translate_element";

const ARABIC_RE = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

/** A contiguous run of Arabic characters (used to split mixed-language text nodes). */
const ARABIC_RUN_RE = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]+/g;

const PROTECTED_ATTRS = ["alt", "title", "aria-label", "placeholder", "data-tooltip"];

type Pattern = { re: RegExp; map: Map<string, string> };

let cached: Pattern | null | undefined;

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildPattern(key: string): string {
  const source = escapeRegex(key).replace(/ /g, "\\s+");
  const first = key[0];
  const last = key[key.length - 1];
  const startsWord = /[A-Za-z0-9]/.test(first);
  const endsWord = /[A-Za-z0-9]/.test(last);
  return `${startsWord ? "\\b" : ""}${source}${endsWord ? "\\b" : ""}`;
}

function getPattern(): Pattern | null {
  if (cached !== undefined) return cached;
  const keys = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length);
  const map = new Map<string, string>();
  const parts: string[] = [];
  for (const key of keys) {
    const value = GLOSSARY[key];
    if (!key || !value) continue;
    map.set(key.toLowerCase(), value);
    parts.push(buildPattern(key));
  }
  if (parts.length === 0) {
    cached = null;
    return cached;
  }
  cached = { re: new RegExp(parts.join("|"), "gi"), map };
  return cached;
}

function lookupKey(raw: string): string {
  return raw.replace(/\s+/g, " ").toLowerCase();
}

function makeProtectedSpan(text: string): HTMLSpanElement {
  const span = document.createElement("span");
  span.className = "notranslate";
  span.setAttribute("data-glossary", "1");
  span.textContent = text;
  return span;
}

/**
 * Appends `text` to `parent`, replacing glossary matches with protected
 * Arabic spans and leaving everything else as plain (Google-translatable)
 * text nodes. Returns the number of glossary replacements made.
 */
function appendGlossaryReplaced(
  parent: DocumentFragment,
  text: string,
  re: RegExp,
  map: Map<string, string>
): number {
  if (!text) return 0;
  re.lastIndex = 0;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let replaced = 0;
  while ((match = re.exec(text)) !== null) {
    const replacement = map.get(lookupKey(match[0]));
    if (!replacement) continue;
    if (match.index > lastIndex) {
      parent.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
    }
    parent.appendChild(makeProtectedSpan(replacement));
    lastIndex = match.index + match[0].length;
    replaced += 1;
  }
  if (lastIndex === 0) {
    parent.appendChild(document.createTextNode(text));
  } else if (lastIndex < text.length) {
    parent.appendChild(document.createTextNode(text.slice(lastIndex)));
  }
  return replaced;
}

function protectArabicAttributes(root: ParentNode): number {
  if (typeof document === "undefined") return 0;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
    acceptNode(node) {
      const el = node as Element;
      if (el.closest(SKIP_SELECTOR)) return NodeFilter.FILTER_REJECT;
      for (const name of PROTECTED_ATTRS) {
        const value = el.getAttribute(name);
        if (value && ARABIC_RE.test(value)) return NodeFilter.FILTER_ACCEPT;
      }
      return NodeFilter.FILTER_SKIP;
    },
  });
  let protectedCount = 0;
  let current = walker.nextNode();
  while (current) {
    const el = current as Element;
    el.classList.add("notranslate");
    el.setAttribute("translate", "no");
    protectedCount += 1;
    current = walker.nextNode();
  }
  return protectedCount;
}

export function applyGlossary(root: ParentNode): number {
  if (typeof document === "undefined") return 0;
  protectArabicAttributes(root);
  const pattern = getPattern();
  if (!pattern) return 0;
  const { re, map } = pattern;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const el = node.parentElement;
      if (!el || el.closest(SKIP_SELECTOR)) return NodeFilter.FILTER_REJECT;
      const text = node.nodeValue;
      if (!text) return NodeFilter.FILTER_REJECT;
      if (ARABIC_RE.test(text)) return NodeFilter.FILTER_ACCEPT;
      if (text.length < 3 || !/[A-Za-z]/.test(text)) {
        return NodeFilter.FILTER_REJECT;
      }
      re.lastIndex = 0;
      return re.test(text) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });

  const targets: Text[] = [];
  let current = walker.nextNode();
  while (current) {
    targets.push(current as Text);
    current = walker.nextNode();
  }

  let replaced = 0;
  for (const node of targets) {
    const text = node.nodeValue;
    const parent = node.parentNode;
    if (!text || !parent) continue;

    if (!ARABIC_RE.test(text)) {
      // Purely non-Arabic: only rewrite when a glossary term actually
      // matches (avoids pointless DOM churn that would re-trigger the
      // MutationObserver forever).
      const frag = document.createDocumentFragment();
      const hits = appendGlossaryReplaced(frag, text, re, map);
      if (hits > 0) {
        parent.replaceChild(frag, node);
        replaced += hits;
      }
      continue;
    }

    // Contains Arabic. If it also contains Latin letters the node is
    // mixed-language (e.g. the English template "Chauffeur Service In
    // {country}" with an Arabic country name substituted in) — protect
    // ONLY the Arabic runs so Google Translate still translates the
    // English parts. Purely-Arabic nodes are protected wholesale.
    if (!/[A-Za-z]/.test(text)) {
      parent.replaceChild(makeProtectedSpan(text), node);
      replaced += 1;
      continue;
    }

    const frag = document.createDocumentFragment();
    ARABIC_RUN_RE.lastIndex = 0;
    let lastIndex = 0;
    let run: RegExpExecArray | null;
    while ((run = ARABIC_RUN_RE.exec(text)) !== null) {
      if (run.index > lastIndex) {
        replaced += appendGlossaryReplaced(
          frag,
          text.slice(lastIndex, run.index),
          re,
          map
        );
      }
      frag.appendChild(makeProtectedSpan(run[0]));
      lastIndex = run.index + run[0].length;
    }
    if (lastIndex < text.length) {
      replaced += appendGlossaryReplaced(frag, text.slice(lastIndex), re, map);
    }
    parent.replaceChild(frag, node);
  }
  return replaced;
}
