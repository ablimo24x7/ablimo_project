"use client";

import { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/app/[lang]/dictionaries";

const languageLabels: Record<Locale, { flag: string; label: string }> = {
  "en-US": { flag: "🇺🇸", label: "English (US)" },
  "en-GB": { flag: "🇬🇧", label: "English (UK)" },
  ar: { flag: "🇸🇦", label: "العربية" },
};

interface LanguageSwitcherProps {
  currentLang: Locale;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export default function LanguageSwitcher({ currentLang, isOpen, onToggle, onClose }: LanguageSwitcherProps) {
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const clearCloseTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleButtonMouseEnter = () => {
    clearCloseTimeout();
    onToggle();
  };

  const handlePanelMouseEnter = () => {
    clearCloseTimeout();
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      onClose();
    }, 150);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    function handleWindowBlur() {
      if (isOpen) {
        onClose();
      }
    }
    window.addEventListener("blur", handleWindowBlur);
    return () => window.removeEventListener("blur", handleWindowBlur);
  }, [isOpen, onClose]);

  const getLocalePath = (locale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const isRtl = currentLang.split("-")[0] === "ar";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={onToggle}
        onMouseEnter={handleButtonMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex items-center justify-center w-9 h-9 text-gray-300 hover:text-white transition-colors cursor-pointer rounded-full hover:bg-white/10"
        title={languageLabels[currentLang].label}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      </button>

      {isOpen && (
        <div
          className={`absolute top-full mt-1 bg-[#2a2c35] border border-gray-600/50 rounded-xl shadow-xl overflow-hidden min-w-[180px] z-50 ${isRtl ? "right-0" : "left-0"}`}
          onMouseEnter={handlePanelMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {locales.map((locale) => {
            const switchingLocale = currentLang !== locale;
            const href = getLocalePath(locale);
            return (
              <a
                key={locale}
                href={href}
                onClick={(e) => {
                  onClose();
                  if (switchingLocale) {
                    e.preventDefault();
                    window.location.href = href;
                  }
                }}
                className={`flex items-center gap-2.5 px-4 py-3 text-sm transition-colors ${
                  locale === currentLang
                    ? "bg-white/10 text-white"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span>{languageLabels[locale].flag}</span>
                <span>{languageLabels[locale].label}</span>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
