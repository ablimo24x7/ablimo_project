"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const RECAPTCHA_SCRIPT_ID = "recaptcha-v3-script";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

function loadRecaptchaScript(siteKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject(new Error("no window"));
    if (window.grecaptcha?.ready) return resolve();

    const existing = document.getElementById(RECAPTCHA_SCRIPT_ID);
    if (existing) {
      const check = () => {
        if (window.grecaptcha?.ready) resolve();
        else setTimeout(check, 100);
      };
      check();
      return;
    }

    const script = document.createElement("script");
    script.id = RECAPTCHA_SCRIPT_ID;
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load reCAPTCHA script"));
    document.head.appendChild(script);
  });
}

export function useRecaptchaV3(siteKey?: string) {
  const [ready, setReady] = useState(false);
  const executeRef = useRef<((action: string) => Promise<string | null>) | null>(null);

  useEffect(() => {
    if (!siteKey) return;
    let cancelled = false;

    loadRecaptchaScript(siteKey)
      .then(() => {
        if (cancelled) return;
        executeRef.current = (action: string) =>
          new Promise((resolve) => {
            window.grecaptcha!.ready(() => {
              window.grecaptcha!.execute(siteKey, { action }).then(resolve).catch(() => resolve(null));
            });
          });
        setReady(true);
      })
      .catch(() => {
        // Script blocked/failed — form still submits without captcha (graceful degradation).
      });

    return () => {
      cancelled = true;
    };
  }, [siteKey]);

  const execute = useCallback(async (action: string): Promise<string | null> => {
    if (!executeRef.current) return null;
    return executeRef.current(action);
  }, []);

  return { ready, execute };
}
