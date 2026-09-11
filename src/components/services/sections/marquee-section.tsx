"use client";

import * as React from "react";
import type { PageSection } from "./section-types";
import { getIcon } from "./section-icons";

interface MarqueeSectionProps {
  section: PageSection;
}

const SPEED_MAP: Record<string, string> = {
  slow: "35s",
  normal: "25s",
  fast: "15s",
};

export default function MarqueeSection({ section }: MarqueeSectionProps) {
  const content = section.content as { items?: Array<{ id: string; icon: string; label: string }> };
  const settings = section.settings as { speed?: string; opacity?: number };
  const appearance = section.appearance as { theme?: string };

  const items = content.items || [];
  const speed = SPEED_MAP[settings.speed || "normal"] || "25s";
  const opacity = settings.opacity ?? 50;
  const isDarker = appearance.theme === "darker";

  if (items.length === 0) return null;

  const duplicatedItems = [...items, ...items];

  return (
    <section
      className={`py-6 overflow-hidden relative z-20 border-b border-gray-900 ${
        isDarker ? "bg-[#0a0a0a]" : "bg-abDarkGray"
      }`}
    >
      <div className={`absolute left-0 top-0 w-16 h-full z-10 ${isDarker ? "bg-[#0a0a0a]" : "bg-abDarkGray"}`} />
      <div className={`absolute right-0 top-0 w-16 h-full z-10 ${isDarker ? "bg-[#0a0a0a]" : "bg-abDarkGray"}`} />
      <div
        className="flex whitespace-nowrap items-center"
        style={{
          opacity: opacity / 100,
          animation: `marquee ${speed} linear infinite`,
        }}
      >
        {duplicatedItems.map((item, i) => (
          <span
            key={`${item.id}-${i}`}
            className="text-gray-500 font-bold tracking-widest text-sm uppercase flex items-center mx-8"
          >
            {item.icon && (
              <span className="mr-3 text-lg">{getIcon(item.icon)}</span>
            )}
            {item.label}
          </span>
        ))}
      </div>
    </section>
  );
}
