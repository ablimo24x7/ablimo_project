"use client";

import Link from "next/link";
import { useState } from "react";

interface LinkItem {
  label: string;
  href: string;
}

interface ExpandableFooterLinksProps {
  links: LinkItem[];
  showMoreText: string;
  showLessText: string;
}

const MAX_VISIBLE = 10;

export default function ExpandableFooterLinks({
  links,
  showMoreText,
  showLessText,
}: ExpandableFooterLinksProps) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = links.length > MAX_VISIBLE;

  // Every link is rendered into the DOM (collapsed items are only visually
  // hidden) so crawlers and assistive tech always see the full link set.
  return (
    <ul className="space-y-3 text-sm text-gray-400">
      {links.map((link, index) => (
        <li
          key={link.label}
          className={!expanded && hasMore && index >= MAX_VISIBLE ? "hidden" : undefined}
        >
          <Link
            href={link.href}
            className="hover:text-white transition-colors"
          >
            {link.label}
          </Link>
        </li>
      ))}
      {hasMore && (
        <li>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-gray-500 hover:text-white transition-colors cursor-pointer"
          >
            {expanded ? showLessText : showMoreText}
          </button>
        </li>
      )}
    </ul>
  );
}
