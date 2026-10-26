"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { type Locale, localeHome } from "@/app/[lang]/dictionaries";
import type { HeaderNavGroup } from "@/lib/headerNav";
import HeaderSocialLinks from "./HeaderSocialLinks";
import LanguageSwitcher from "./LanguageSwitcher";

interface MobileMenuProps {
  dict: Dictionary;
  lang: Locale;
  groups: HeaderNavGroup[];
}

export default function MobileMenu({ dict, lang, groups }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const nav = dict.header.nav;

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
    <div className="flex items-center gap-3">
      <LanguageSwitcher currentLang={lang} showOnMobile />

      {/* Hamburger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-300 hover:text-abBlue focus:outline-none cursor-pointer"
      >
        {isOpen ? (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <i className="fa-solid fa-bars text-2xl"></i>
        )}
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-0 left-0 w-full h-full bg-abBlack z-[99] overflow-y-auto">
          {/* Close button */}
          <div className="flex justify-between items-center px-6 py-5 border-b border-gray-800">
            <Link
              href={`${localeHome(lang)}`}
              className="flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <Image src="/AB_LOGO-NEW.png" alt="AB Logo" width={100} height={40} />
            </Link>
            <div className="flex items-center gap-3">
              <LanguageSwitcher currentLang={lang} showOnMobile />
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-abBlue cursor-pointer p-1"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col px-6 py-4 gap-1">
            {/* Home link */}
            <Link
              href={`${localeHome(lang)}`}
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-abBlue text-lg font-medium py-3 border-b border-gray-800 transition-colors"
            >
              {nav.home}
            </Link>

            {groups.map((group) => (
              <div key={group.id} className="border-b border-gray-800">
                {group.href ? (
                  <div className="flex items-center justify-between">
                    <Link
                      href={group.href}
                      onClick={() => setIsOpen(false)}
                      className="flex-1 text-gray-300 hover:text-abBlue text-lg font-medium py-3 transition-colors"
                    >
                      {group.label}
                    </Link>
                    <button
                      onClick={() => toggleDropdown(group.id)}
                      aria-label={group.label}
                      aria-expanded={openDropdown === group.id}
                      className="p-2 text-gray-300 hover:text-abBlue cursor-pointer transition-colors"
                    >
                      <svg
                        className={`w-5 h-5 transition-transform ${openDropdown === group.id ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => toggleDropdown(group.id)}
                    className="flex items-center justify-between w-full text-left text-gray-300 hover:text-abBlue text-lg font-medium py-3 cursor-pointer transition-colors"
                  >
                    {group.label}
                    <svg
                      className={`w-5 h-5 transition-transform ${openDropdown === group.id ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}

                <div
                  className={`grid transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    openDropdown === group.id
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pl-4 pb-2">
                      {group.items.map((item) => (
                        <Link
                          key={item.href + item.label}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="block py-2.5 text-gray-400 hover:text-abBlue transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Action buttons */}
            <div className="mt-6 space-y-3">
              <HeaderSocialLinks className="justify-center" />
              <Link
                href="mailto:hello@ab.limo"
                onClick={() => setIsOpen(false)}
                className="block text-center text-gray-300 hover:text-abBlue text-sm font-medium py-3 border border-gray-700 rounded transition-colors"
              >
                hello@ab.limo
              </Link>
              <Link
                href={`${localeHome(lang)}`}
                onClick={() => setIsOpen(false)}
                className="block text-center bg-transparent border border-abBlue text-abBlue hover:bg-abBlue hover:border-abBlue hover:text-white px-5 py-3 rounded text-sm font-semibold transition-colors"
              >
                {nav.bookNow}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
