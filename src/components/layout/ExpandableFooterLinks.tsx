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
  const visibleLinks = expanded || !hasMore ? links : links.slice(0, MAX_VISIBLE);

  return (
    <ul className="space-y-3 text-sm text-gray-400">
      {visibleLinks.map((link) => (
        <li key={link.label}>
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
