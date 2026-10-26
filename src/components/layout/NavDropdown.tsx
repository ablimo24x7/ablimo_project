"use client";

import { useRef, useEffect, useState, useId, type KeyboardEvent, type FocusEvent, type PointerEvent } from "react";
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
  href?: string;
  items?: DropdownItem[];
  groups?: DropdownGroup[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  lang?: string;
  columns?: number;
  triggerClassName?: string;
  children?: React.ReactNode;
}

/**
 * Header mega menu.
 *
 * Open/close animation is pure CSS (see `.mega-menu` rules in globals.css):
 *  - Mouse: `.mega-menu:hover` slides the panel down (opacity + visibility + translateY).
 *  - Touch / click / keyboard: React toggles `data-open`, which uses the same transition.
 * The panel lives inside the same wrapper as the trigger, so moving the cursor
 * from the trigger into the panel keeps the hover state alive.
 */
export default function NavDropdown({ id, label, href, items, groups, isOpen, onToggle, onClose, lang = "en-US", columns = 1, triggerClassName, children }: NavDropdownProps) {
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const focusFirstOnOpen = useRef(false);
  const [hoveredGroup, setHoveredGroup] = useState<DropdownGroup | null>(null);
  const groupTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isRtl = lang.split("-")[0] === "ar";
  const reactId = useId();
  const panelId = `mega-menu-${id}-${reactId.replace(/:/g, "")}`;

  const clearGroupTimeout = () => {
    if (groupTimeoutRef.current) {
      clearTimeout(groupTimeoutRef.current);
      groupTimeoutRef.current = null;
    }
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

  const close = () => {
    onClose();
    setHoveredGroup(null);
  };

  const getPanelLinks = () =>
    Array.from(panelRef.current?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? []);

  // Click / tap outside closes the menu.
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
        setHoveredGroup(null);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchstart", handleClickOutside);
      };
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

  // After a keyboard-initiated open, move focus to the first link.
  useEffect(() => {
    if (isOpen && focusFirstOnOpen.current) {
      focusFirstOnOpen.current = false;
      getPanelLinks()[0]?.focus();
    }
  }, [isOpen]);

  // Mouse leaving the whole menu closes a click-opened panel so hover & state stay in sync.
  const handlePointerLeave = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && isOpen) close();
  };

  // Focus moving outside the menu (Tab / Shift+Tab) closes it.
  const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (isOpen && !ref.current?.contains(e.relatedTarget as Node | null)) close();
  };

  const handleTriggerKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (isOpen) {
        getPanelLinks()[0]?.focus();
      } else {
        focusFirstOnOpen.current = true;
        onToggle();
      }
    }
  };

  const handleMenuKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape" && isOpen) {
      e.preventDefault();
      close();
      triggerRef.current?.focus();
      return;
    }

    const links = getPanelLinks();
    const index = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (index === -1) return;

    let next: HTMLAnchorElement | undefined;
    if (e.key === "ArrowDown") next = links[(index + 1) % links.length];
    else if (e.key === "ArrowUp") next = index === 0 ? undefined : links[index - 1];
    else if (e.key === "Home") next = links[0];
    else if (e.key === "End") next = links[links.length - 1];
    else return;

    e.preventDefault();
    (next ?? triggerRef.current)?.focus();
  };

  const chevron = <i aria-hidden="true" className="mega-menu-chevron fa-solid fa-chevron-down text-[10px]"></i>;

  return (
    <div
      className="mega-menu relative h-20 flex items-center group"
      data-open={isOpen ? "true" : "false"}
      ref={ref}
      onPointerLeave={handlePointerLeave}
      onBlur={handleBlur}
      onKeyDown={handleMenuKeyDown}
    >
      <div className="relative flex items-center">
        {href ? (
          <>
            <Link
              href={href}
              onClick={close}
              className={`flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-abBlue group-hover:text-abBlue transition-colors cursor-pointer ${triggerClassName ?? ""}`}
            >
              {children}
              {label}
            </Link>
            <button
              ref={triggerRef}
              type="button"
              aria-label={label}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={onToggle}
              onKeyDown={handleTriggerKeyDown}
              className={`flex items-center text-gray-300 hover:text-abBlue group-hover:text-abBlue transition-colors cursor-pointer p-1 ${isRtl ? "mr-0.5" : "ml-0.5"}`}
            >
              {chevron}
            </button>
          </>
        ) : (
          <button
            ref={triggerRef}
            type="button"
            aria-expanded={isOpen}
            aria-controls={panelId}
            onClick={onToggle}
            onKeyDown={handleTriggerKeyDown}
            className={`flex items-center gap-1.5 text-sm font-medium text-gray-300 hover:text-abBlue group-hover:text-abBlue transition-colors cursor-pointer ${triggerClassName ?? ""}`}
          >
            {children}
            {label}
            {chevron}
          </button>
        )}
      </div>

      <div
        id={panelId}
        ref={panelRef}
        className={`mega-menu-content ${isRtl ? "mega-menu-content--rtl right-1/2" : "left-1/2"} absolute top-20 bg-[#0C0C0C]  border-gray-800 shadow-2xl rounded-b-xl border-t-[3px] border-abBlue z-50 ${
          groups
            ? `flex min-w-[280px]`
            : columns > 1
            ? `grid grid-cols-2 min-w-[440px]`
            : `min-w-[296px]`
        }`}
      >
        {groups ? (
          <>
            <div className={`min-w-[240px] py-1 relative ${isRtl ? "border-l border-gray-800" : "border-r border-gray-800"}`}>
              {groups.map((group) => (
                <div
                  key={group.title}
                  onMouseEnter={() => handleGroupMouseEnter(group)}
                  onMouseLeave={handleGroupMouseLeave}
                  className={`px-5 py-3 text-sm cursor-pointer transition-colors ${
                    hoveredGroup?.title === group.title
                      ? "bg-white/10 text-abBlue"
                      : "text-[#ffffff] hover:bg-white/5 hover:text-abBlue"
                  }`}
                >
                  <div className="flex items-center justify-between font-semibold">
                    {group.title}
                    <i className={`fa-solid fa-chevron-${isRtl ? "left" : "right"} text-[10px] text-gray-400`}></i>
                  </div>
                </div>
              ))}

              {hoveredGroup && (
                <div
                  className={`absolute top-0 min-w-[280px] bg-[#0C0C0C] shadow-xl py-1 z-50 border border-gray-800 ${isRtl ? "right-full" : "left-full"}`}
                  onMouseEnter={handleSubPanelMouseEnter}
                  onMouseLeave={handleSubPanelMouseLeave}
                >
                  {hoveredGroup.items.map((item) => (
                    <Link
                      key={item.href + item.label}
                      href={item.href}
                      onClick={close}
                      className="block px-5 py-3 text-sm font-semibold text-[#ffffff] hover:text-abBlue hover:bg-white/5 transition-colors"
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
              onClick={close}
              className="block px-5 py-3 text-sm font-semibold text-[#ffffff] hover:text-abBlue hover:bg-white/5 focus-visible:text-abBlue focus-visible:bg-white/5 focus-visible:outline-none transition-colors"
            >
              {item.label}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
