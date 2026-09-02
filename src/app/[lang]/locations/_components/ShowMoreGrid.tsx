"use client";

import { useState, type ReactNode } from "react";

interface ShowMoreGridProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  itemsPerRow?: number;
  initialRows?: number;
  moreLabel?: string;
  lessLabel?: string;
}

/**
 * Responsive flex listing with a "Show More" toggle.
 * Targets 4–5 columns on large screens and reveals more items after 3 rows.
 */
export default function ShowMoreGrid<T>({
  items,
  renderItem,
  itemsPerRow = 5,
  initialRows = 3,
  moreLabel = "Show More",
  lessLabel = "Show Less",
}: ShowMoreGridProps<T>) {
  const [expanded, setExpanded] = useState(false);
  const initialCount = itemsPerRow * initialRows;
  const visible = expanded ? items : items.slice(0, initialCount);
  const canExpand = items.length > initialCount;

  const widthClass =
    itemsPerRow >= 5
      ? "w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] xl:w-[calc(20%-0.8rem)]"
      : "w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] xl:w-[calc(25%-0.75rem)]";

  if (items.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-4">
      {visible.map((item, i) => (
        <div key={i} className={widthClass}>
          {renderItem(item, i)}
        </div>
      ))}
      {canExpand && (
        <div className="w-full flex justify-center pt-4">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-2 bg-white text-[#292a30] px-6 py-2.5 text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
          >
            {expanded ? lessLabel : moreLabel}
            <svg
              className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}