"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";

interface DropdownItem {
  label: string;
  href: string;
}

interface NavDropdownProps {
  id: string;
  label: string;
  items: DropdownItem[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export default function NavDropdown({ label, items, isOpen, onToggle, onClose }: NavDropdownProps) {
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    onToggle();
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

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={onToggle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex items-center gap-1 text-xs md:text-sm font-semibold tracking-[0.1em] text-gray-300 hover:text-white transition-colors cursor-pointer px-3 py-2 rounded-lg hover:bg-white/10"
      >
        {label}
        <svg
          className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute left-0 top-full mt-1 bg-[#2a2c35] border border-gray-600/50 rounded-xl shadow-xl overflow-hidden min-w-[220px] z-50"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {items.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              onClick={onClose}
              className="block px-5 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
