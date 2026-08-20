"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

interface DropdownItem {
  label: string;
  href: string;
}

interface DropdownGroup {
  title: string;
  items: DropdownItem[];
}

interface NavDropdownProps {
  id: string;
  label: string;
  items?: DropdownItem[];
  groups?: DropdownGroup[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  columns?: number;
  alignRight?: boolean;
  triggerClassName?: string;
  children?: React.ReactNode;
}

export default function NavDropdown({ label, items, groups, isOpen, onToggle, onClose, columns = 1, alignRight = false, triggerClassName, children }: NavDropdownProps) {
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [hoveredGroup, setHoveredGroup] = useState<DropdownGroup | null>(null);
  const groupTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearCloseTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const clearGroupTimeout = () => {
    if (groupTimeoutRef.current) {
      clearTimeout(groupTimeoutRef.current);
      groupTimeoutRef.current = null;
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
      setHoveredGroup(null);
    }, 150);
  };

  const handleGroupMouseEnter = (group: DropdownGroup) => {
    clearGroupTimeout();
    setHoveredGroup(group);
  };

  const handleGroupMouseLeave = () => {
    groupTimeoutRef.current = setTimeout(() => {
      setHoveredGroup(null);
    }, 100);
  };

  const handleSubPanelMouseEnter = () => {
    clearGroupTimeout();
  };

  const handleSubPanelMouseLeave = () => {
    groupTimeoutRef.current = setTimeout(() => {
      setHoveredGroup(null);
    }, 100);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
        setHoveredGroup(null);
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
        setHoveredGroup(null);
      }
    }
    window.addEventListener("blur", handleWindowBlur);
    return () => window.removeEventListener("blur", handleWindowBlur);
  }, [isOpen, onClose]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={onToggle}
        onMouseEnter={handleButtonMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`flex items-center gap-1 text-xs md:text-sm font-semibold tracking-[0.1em] text-gray-300 hover:text-white transition-colors cursor-pointer px-3 py-2 rounded-lg hover:bg-white/10 ${triggerClassName ?? ""}`}
      >
        {children}
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
          className={`absolute top-full mt-1 bg-[#2a2c35] border border-gray-600/50 rounded-xl shadow-xl z-50 ${
            alignRight ? "right-0" : "left-0"
          } ${
            groups
              ? `flex min-w-[240px]`
              : columns > 1
              ? `grid grid-cols-2 min-w-[440px]`
              : `min-w-[220px] max-h-[480px] overflow-y-auto`
          }`}
          onMouseEnter={handlePanelMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {groups ? (
            <>
              <div className="min-w-[240px] py-1 relative">
                {groups.map((group) => (
                  <div
                    key={group.title}
                    onMouseEnter={() => handleGroupMouseEnter(group)}
                    onMouseLeave={handleGroupMouseLeave}
                    className={`px-5 py-2.5 text-sm cursor-pointer transition-colors ${
                      hoveredGroup?.title === group.title
                        ? "bg-white/10 text-white"
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      {group.title}
                    </div>
                  </div>
                ))}

                {hoveredGroup && (
                  <div
                    className="absolute top-0 right-full min-w-[280px] bg-[#2a2c35] border border-gray-600/50 rounded-l-xl shadow-xl py-1 max-h-[600px] overflow-y-auto z-50"
                    onMouseEnter={handleSubPanelMouseEnter}
                    onMouseLeave={handleSubPanelMouseLeave}
                  >
                    {hoveredGroup.items.map((item) => (
                      <Link
                        key={item.href + item.label}
                        href={item.href}
                        onClick={onClose}
                        className="block px-5 py-2.5 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            items?.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                onClick={onClose}
                className="block px-5 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
