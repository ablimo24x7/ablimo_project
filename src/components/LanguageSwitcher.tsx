"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { locales, type Locale } from "@/app/[lang]/dictionaries";

const languageLabels: Record<Locale, { flag: string; label: string }> = {
  "en-US": { flag: "🇺🇸", label: "EN-US" },
  "en-UK": { flag: "🇬🇧", label: "EN-UK" },
  ar: { flag: "🇸🇦", label: "العربية" },
};

interface LanguageSwitcherProps {
  currentLang: Locale;
}

export default function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getLocalePath = (locale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-gray-400 hover:text-white transition-colors cursor-pointer px-2 py-1.5 rounded-lg hover:bg-white/10"
      >
        <span>{languageLabels[currentLang].flag}</span>
        <span>{languageLabels[currentLang].label}</span>
        <svg
          className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 bg-[#2a2c35] border border-gray-600/50 rounded-xl shadow-xl overflow-hidden min-w-[140px] z-50">
          {locales.map((locale) => (
            <Link
              key={locale}
              href={getLocalePath(locale)}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
                locale === currentLang
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span>{languageLabels[locale].flag}</span>
              <span>{languageLabels[locale].label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
