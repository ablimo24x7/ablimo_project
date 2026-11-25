"use client";

import { useState } from "react";
import { type Locale } from "@/app/[lang]/dictionaries";
import type { HeaderNavGroup } from "@/lib/headerNav";
import NavDropdown from "./NavDropdown";

interface DesktopNavProps {
  lang: Locale;
  groups: HeaderNavGroup[];
}

export default function DesktopNav({ lang, groups }: DesktopNavProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="hidden lg:flex items-center space-x-6 xl:space-x-12">
      {groups.map((group) => (
        <NavDropdown
          key={group.id}
          id={group.id}
          label={group.label}
          href={group.href}
          items={group.items}
          isOpen={openDropdown === group.id}
          onToggle={() =>
            setOpenDropdown(openDropdown === group.id ? null : group.id)
          }
          onClose={() => setOpenDropdown(null)}
          lang={lang}
        />
      ))}
    </nav>
  );
}
