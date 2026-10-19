"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export type CountryCardItem = {
  slug: string;
  href: string;
  name: string;
  image: string;
  services: number;
  cities: number;
  label: string;
};

const accentClasses = [
  "hover:border-abBlue",
  "hover:border-abOrange",
  "hover:border-abGreen",
  "hover:border-abRed",
  "hover:border-abYellow",
  "hover:border-abBlue",
];

const GAP = 24;

export default function CountriesCarousel({
  items,
  prevLabel,
  nextLabel,
}: {
  items: CountryCardItem[];
  prevLabel: string;
  nextLabel: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateBounds = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setAtStart(track.scrollLeft <= 1);
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 1);
  }, []);

  useEffect(() => {
    updateBounds();
  }, [updateBounds, items.length]);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    const cardWidth = card ? card.getBoundingClientRect().width : track.clientWidth;
    const rtl = getComputedStyle(track).direction === "rtl";
    const amount = (cardWidth + GAP) * direction * (rtl ? -1 : 1);
    track.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onScroll={updateBounds}
        className="no-scrollbar flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2"
      >
        {items.map((item, i) => (
          <Link
            key={item.slug}
            href={item.href}
            className={`group shrink-0 snap-start w-[85%] sm:w-[48%] md:w-[31.5%] lg:w-[calc(25%-18px)] bg-abDarkGray rounded-xl border border-gray-800 overflow-hidden ${accentClasses[i % accentClasses.length]} transition-colors`}
          >
            <div className="relative h-44 overflow-hidden bg-[#050505] border-b border-gray-900">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 640px) 85vw, (max-width: 768px) 48vw, (max-width: 1024px) 31.5vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              {item.label && (
                <span className="absolute top-3 left-3 bg-[#111] border border-gray-700 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded z-10">
                  {item.label}
                </span>
              )}
            </div>
            <div className="p-5">
              <h4 className="text-lg font-bold text-white group-hover:text-abBlue transition-colors">
                {item.name}
              </h4>
            </div>
          </Link>
        ))}
      </div>

      <button
        type="button"
        aria-label={prevLabel}
        disabled={atStart}
        onClick={() => scrollByCard(-1)}
        className="hidden md:flex absolute -left-4 top-[88px] -translate-y-1/2 w-10 h-10 rounded-full bg-abDarkGray border border-gray-700 text-white items-center justify-center hover:border-abBlue hover:text-abBlue transition-colors disabled:opacity-30 disabled:pointer-events-none"
      >
        <i className="fa-solid fa-chevron-left text-sm"></i>
      </button>
      <button
        type="button"
        aria-label={nextLabel}
        disabled={atEnd}
        onClick={() => scrollByCard(1)}
        className="hidden md:flex absolute -right-4 top-[88px] -translate-y-1/2 w-10 h-10 rounded-full bg-abDarkGray border border-gray-700 text-white items-center justify-center hover:border-abBlue hover:text-abBlue transition-colors disabled:opacity-30 disabled:pointer-events-none"
      >
        <i className="fa-solid fa-chevron-right text-sm"></i>
      </button>
    </div>
  );
}
