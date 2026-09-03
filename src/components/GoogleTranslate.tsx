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
            layout?: any;
            autoDisplay?: boolean;
          },
          elementId: string
        ) => void;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

function triggerArabic() {
  const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
  if (!combo) return;
  combo.value = "ar";
  combo.dispatchEvent(new Event("change"));
}

function hideGoogleTranslateBar() {
  document.querySelectorAll(".skiptranslate").forEach((el) => {
    (el as HTMLElement).style.display = "none";
  });
  document.getElementById("goog-gt-tt")?.style &&
    (document.getElementById("goog-gt-tt")!.style.display = "none");
  const banner = document.querySelector(".goog-te-banner-frame") as HTMLElement | null;
  if (banner) banner.style.display = "none";
  document.body.style.top = "0px";
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
  .goog-te-menu-frame {
    display: none !important;
    visibility: hidden !important;
    height: 0 !important;
    overflow: hidden !important;
    width: 0 !important;
    opacity: 0 !important;
    pointer-events: none !important;
  }
  body { top: 0 !important; margin-top: 0 !important; }
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
      return;
    }
    googleScriptLoading = true;

    window.googleTranslateElementInit = () => {
      googleScriptLoaded = true;
      googleScriptLoading = false;
      resolve();
    };

    const script = document.createElement("script");
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.onerror = () => {
      googleScriptLoading = false;
      resolve();
    };
    document.head.appendChild(script);
  });
}

function initTranslateElement(): Promise<void> {
  return new Promise((resolve) => {
    if (document.querySelector(".goog-te-combo")) {
      resolve();
      return;
    }

    if (window.google?.translate?.TranslateElement) {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "ar",
          layout: "SIMPLE" as any,
          autoDisplay: true,
        },
        "google_translate_element"
      );
    }

    let attempts = 0;
    const check = setInterval(() => {
      attempts++;
      if (document.querySelector(".goog-te-combo") || attempts > 50) {
        clearInterval(check);
        resolve();
      }
    }, 50);
  });
}

export default function GoogleTranslate() {
  const pathname = usePathname();
  const isArabic = pathname.startsWith("/ar");
  const prevIsArabic = useRef(isArabic);
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const translateActive = useRef(false);

  // Hard reload when leaving Arabic
  useEffect(() => {
    if (!isArabic && prevIsArabic.current) {
      window.location.reload();
      return;
    }
    prevIsArabic.current = isArabic;
  }, [isArabic]);

  // Preload script on mount (all pages) — makes Arabic instant on return visits
  useEffect(() => {
    loadGoogleScript();
  }, []);

  // Trigger translation when on Arabic page
  useEffect(() => {
    if (!isArabic) {
      translateActive.current = false;
      if (styleRef.current) {
        styleRef.current.remove();
        styleRef.current = null;
      }
      return;
    }

    // Inject hide CSS
    if (!styleRef.current) {
      const style = document.createElement("style");
      style.textContent = HIDE_CSS;
      document.head.appendChild(style);
      styleRef.current = style;
    }

    let cancelled = false;

    (async () => {
      await loadGoogleScript();
      if (cancelled) return;

      // Small delay for TranslateElement to register after script loads
      await new Promise((r) => setTimeout(r, 100));
      if (cancelled) return;

      await initTranslateElement();
      if (cancelled) return;

      // Trigger immediately
      triggerArabic();
      hideGoogleTranslateBar();

      // Keep hiding as Google re-injects elements
      translateActive.current = true;
      const hideInterval = setInterval(() => {
        if (!translateActive.current) {
          clearInterval(hideInterval);
          return;
        }
        hideGoogleTranslateBar();
      }, 200);

      // Stop after 3 seconds (enough for translation to complete)
      setTimeout(() => {
        clearInterval(hideInterval);
        hideGoogleTranslateBar();
      }, 3000);
    })();

    return () => {
      cancelled = true;
      translateActive.current = false;
      if (styleRef.current) {
        styleRef.current.remove();
        styleRef.current = null;
      }
    };
  }, [isArabic]);

  if (!isArabic) return null;

  return <div id="google_translate_element" className="hidden" />;
}
