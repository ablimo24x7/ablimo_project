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
        className={`flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-abGold transition-colors cursor-pointer ${triggerClassName ?? ""}`}
      >
        {children}
        {label}
        <i className="fa-solid fa-chevron-down ml-1.5 text-[10px]"></i>
      </button>

      {isOpen && (
        <div
          className={`absolute top-full left-1/2 -translate-x-1/2 bg-white shadow-2xl rounded-b-xl border-t-[3px] border-abGold z-50 ${
            groups
              ? `flex min-w-[280px]`
              : columns > 1
              ? `grid grid-cols-2 min-w-[440px]`
              : `min-w-[240px] max-h-[480px] overflow-y-auto`
          }`}
          onMouseEnter={handlePanelMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {groups ? (
            <>
              <div className="min-w-[240px] py-1 relative border-r border-gray-100">
                {groups.map((group) => (
                  <div
                    key={group.title}
                    onMouseEnter={() => handleGroupMouseEnter(group)}
                    onMouseLeave={handleGroupMouseLeave}
                    className={`px-5 py-3 text-sm cursor-pointer transition-colors ${
                      hoveredGroup?.title === group.title
                        ? "bg-gray-50 text-abGold"
                        : "text-gray-900 hover:bg-gray-50 hover:text-abGold"
                    }`}
                  >
                    <div className="flex items-center justify-between font-semibold">
                      {group.title}
                      <i className="fa-solid fa-chevron-right text-[10px] text-gray-400"></i>
                    </div>
                  </div>
                ))}

                {hoveredGroup && (
                  <div
                    className="absolute top-0 left-full min-w-[280px] bg-white border-l border-gray-100 shadow-xl py-1 max-h-[600px] overflow-y-auto z-50"
                    onMouseEnter={handleSubPanelMouseEnter}
                    onMouseLeave={handleSubPanelMouseLeave}
                  >
                    {hoveredGroup.items.map((item) => (
                      <Link
                        key={item.href + item.label}
                        href={item.href}
                        onClick={onClose}
                        className="block px-5 py-3 text-sm font-semibold text-gray-900 hover:text-abGold hover:bg-gray-50 transition-colors"
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
                className="block px-5 py-3 text-sm font-semibold text-gray-900 hover:text-abGold hover:bg-gray-50 transition-colors"
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
