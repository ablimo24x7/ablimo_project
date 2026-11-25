"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement?: new (
          options: {
            pageLanguage: string;
            includedLanguages?: string;
            layout?: string;
            autoDisplay?: boolean;
          },
          elementId: string
        ) => unknown;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

const GT_COOKIE = "googtrans";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function setGoogleTranslateCookie(target: string | null) {
  if (typeof document === "undefined") return;
  const value = target ? `/en/${target}` : "";
  const attrs = `path=/; max-age=${target ? COOKIE_MAX_AGE : 0}`;
  document.cookie = `${GT_COOKIE}=${value}; ${attrs}`;
  const host = window.location.hostname;
  if (host.startsWith("www.")) {
    const base = host.slice(4);
    document.cookie = `${GT_COOKIE}=${value}; domain=${base}; ${attrs}`;
  }
}

function getGoogleTranslateCookie(): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${GT_COOKIE}=([^;]*)`));
  return match ? match[1] : null;
}

function triggerArabic() {
  const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
  if (!combo) return false;
  if (combo.value !== "ar") {
    combo.value = "ar";
    combo.dispatchEvent(new Event("change", { bubbles: true }));
  }
  return true;
}

function hideGoogleTranslateBar() {
  document.querySelectorAll(".skiptranslate").forEach((el) => {
    (el as HTMLElement).style.display = "none";
  });
  const tooltip = document.getElementById("goog-gt-tt");
  if (tooltip) (tooltip as HTMLElement).style.display = "none";
  const banner = document.querySelector(".goog-te-banner-frame") as HTMLElement | null;
  if (banner) banner.style.display = "none";
  document.body.style.top = "0px";
  document.body.style.position = "static";
}

const HIDE_CSS = `
  .skiptranslate,
  .skiptranslate *,
  .goog-te-banner-frame,
  .goog-te-banner-frame *,
  .goog-gt-tt,
  #goog-gt-tt,
  .goog-te-spinner-pos,
  .VIpgJd-ZVi9od-aZ2wEe-wOHMyf,
  .VIpgJd-ZVi9od-ORHb-OEVmcd,
  iframe.VIpgJd-ZVi9od-ORHb-OEVmcd,
  .goog-te-menu-frame,
  .goog-te-menu-frame * {
    display: none !important;
    visibility: hidden !important;
    height: 0 !important;
    overflow: hidden !important;
    width: 0 !important;
    opacity: 0 !important;
    pointer-events: none !important;
  }
  body { top: 0 !important; margin-top: 0 !important; position: static !important; }
  .goog-te-combo { position: absolute !important; left: -9999px !important; top: -9999px !important; }
`;

let googleScriptLoaded = false;
let googleScriptLoading = false;

function loadGoogleScript(): Promise<void> {
  return new Promise((resolve) => {
    if (googleScriptLoaded) {
      resolve();
      return;
    }
    if (googleScriptLoading) {
      const check = setInterval(() => {
        if (googleScriptLoaded) {
          clearInterval(check);
          resolve();
        }
      }, 50);
      setTimeout(() => {
        clearInterval(check);
        resolve();
      }, 8000);
      return;
    }
    googleScriptLoading = true;

    window.googleTranslateElementInit = () => {
      googleScriptLoaded = true;
      googleScriptLoading = false;
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "ar",
            layout: "SIMPLE",
            autoDisplay: true,
          },
          "google_translate_element"
        );
      }
      resolve();
    };

    const existing = document.querySelector<HTMLScriptElement>(
      'script[src*="translate.google.com/translate_a/element.js"]'
    );
    if (existing) {
      existing.remove();
    }

    const script = document.createElement("script");
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.onerror = () => {
      googleScriptLoading = false;
      resolve();
    };
    document.head.appendChild(script);

    setTimeout(() => {
      if (!googleScriptLoaded) {
        googleScriptLoading = false;
        resolve();
      }
    }, 10000);
  });
}

async function waitForCombo(timeoutMs = 5000): Promise<HTMLSelectElement | null> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (combo) return combo;
    await new Promise((r) => setTimeout(r, 100));
  }
  return null;
}

export default function GoogleTranslate() {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith("/ar") ?? false;
  const prevIsArabic = useRef(isArabic);
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const glossaryObserverRef = useRef<MutationObserver | null>(null);

  useEffect(() => {
    if (!isArabic && prevIsArabic.current) {
      setGoogleTranslateCookie(null);
      window.location.reload();
      return;
    }
    prevIsArabic.current = isArabic;
  }, [isArabic]);

  useEffect(() => {
    if (!isArabic) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (styleRef.current) {
        styleRef.current.remove();
        styleRef.current = null;
      }
      return;
    }

    setGoogleTranslateCookie("ar");

    if (!styleRef.current) {
      const style = document.createElement("style");
      style.textContent = HIDE_CSS;
      document.head.appendChild(style);
      styleRef.current = style;
    }

    let cancelled = false;
    let glossaryScheduled = false;

    (async () => {
      try {
        const { applyGlossary } = await import("@/lib/arabic-glossary");
        if (cancelled) return;
        applyGlossary(document.body);
        const observer = new MutationObserver(() => {
          if (glossaryScheduled) return;
          glossaryScheduled = true;
          requestAnimationFrame(() => {
            glossaryScheduled = false;
            if (!cancelled) applyGlossary(document.body);
          });
        });
        observer.observe(document.body, {
          subtree: true,
          childList: true,
          characterData: true,
        });
        glossaryObserverRef.current = observer;
      } catch {
        glossaryObserverRef.current = null;
      }

      await loadGoogleScript();
      if (cancelled) return;

      await new Promise((r) => setTimeout(r, 150));
      if (cancelled) return;

      const combo = await waitForCombo();
      if (cancelled) return;

      if (combo) {
        triggerArabic();
      }
      hideGoogleTranslateBar();

      intervalRef.current = setInterval(() => {
        if (cancelled) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return;
        }
        const c = document.querySelector<HTMLSelectElement>(".goog-te-combo");
        if (c && c.value !== "ar") {
          c.value = "ar";
          c.dispatchEvent(new Event("change", { bubbles: true }));
        }
        hideGoogleTranslateBar();
      }, 300);

      setTimeout(() => {
        if (intervalRef.current && !cancelled) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        hideGoogleTranslateBar();
      }, 8000);
    })();

    return () => {
      cancelled = true;
      glossaryObserverRef.current?.disconnect();
      glossaryObserverRef.current = null;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isArabic]);

  if (!isArabic) return null;

  return (
    <div
      id="google_translate_element"
      aria-hidden="true"
      style={{
        position: "absolute",
        width: 1,
        height: 1,
        overflow: "hidden",
        clip: "rect(0 0 0 0)",
        whiteSpace: "nowrap",
        border: 0,
        padding: 0,
        margin: -1,
      }}
    />
  );
}
