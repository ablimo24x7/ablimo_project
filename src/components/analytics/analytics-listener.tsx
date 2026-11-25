"use client";

import { useEffect } from "react";
import { classifyContactMethod, extractWhatsAppNumber, trackContactClick, trackEvent } from "@/lib/analytics";

function label(element: Element | null): string {
  return (element?.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 100);
}

export default function AnalyticsListener() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      if (!target) return;

      const interactive = target.closest("a[href], button");
      if (!interactive) return;

      const section = target.closest("[data-section-type]")?.getAttribute("data-section-type");
      const anchor = target.closest("a[href]");
      const href = anchor?.getAttribute("href") ?? "";

      const method = href ? classifyContactMethod(href) : null;
      if (method) {
        trackContactClick({
          method,
          location: section ?? (target.closest("main") ? "page" : "global"),
          label: label(anchor ?? interactive),
          whatsapp_number: extractWhatsAppNumber(href),
        });
        return;
      }

      if (interactive.closest("form")) return;
      if (!interactive.closest("main")) return;

      const text = label(interactive);
      if (!text) return;

      trackEvent("cta_click", {
        label: text,
        section: section ?? "page",
        href,
      });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
