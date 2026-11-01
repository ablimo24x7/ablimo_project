"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Dictionary, localeBase } from "@/app/[lang]/dictionaries";
import Link from "next/link";
import Image from "next/image";

interface CitySlide {
  name: string;
  country: string;
  image: string;
}

const CITIES: CitySlide[] = [
  {
    name: "Riyadh",
    country: "Saudi Arabia",
    image: "/hero/city-riyadh.jpg",
  },
  {
    name: "Dubai",
    country: "UAE",
    image: "/hero/city-dubai.jpg",
  },
  {
    name: "Abu Dhabi",
    country: "UAE",
    image: "/hero/city-abu-dhabi.jpg",
  },
  {
    name: "Jeddah",
    country: "Saudi Arabia",
    image: "/hero/city-jeddah.jpg",
  },
  {
    name: "Doha",
    country: "Qatar",
    image: "/hero/city-doha.jpg",
  },
  {
    name: "Dammam",
    country: "Saudi Arabia",
    image: "/hero/city-dammam.jpg",
  },
  {
    name: "Madinah",
    country: "Saudi Arabia",
    image: "/hero/city-madinah.jpg",
  },
];

const SLIDE_DURATION = 6500; // 6.5 seconds per city
const TICK_MS = 50; // progress update interval

export default function HeroSection({ dict, lang }: { dict: Dictionary; lang: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);

  const resetProgress = useCallback(() => {
    progressRef.current = 0;
    setProgress(0);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % CITIES.length);
    resetProgress();
  }, [resetProgress]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + CITIES.length) % CITIES.length);
    resetProgress();
  }, [resetProgress]);

  const selectCity = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      setActiveIndex(index);
      resetProgress();
    },
    [activeIndex, resetProgress]
  );

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  // Single source of truth for slide progress — drives both the desktop
  // tab bar and the mobile story rings, so they never desync from the timer.
  useEffect(() => {
    if (isPaused) return;

    let last = Date.now();
    const timer = setInterval(() => {
      const now = Date.now();
      progressRef.current += ((now - last) / SLIDE_DURATION) * 100;
      last = now;
      if (progressRef.current >= 100) {
        progressRef.current -= 100;
        setActiveIndex((i) => (i + 1) % CITIES.length);
      }
      setProgress(progressRef.current);
    }, TICK_MS);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Keep the active story chip visible inside the chips row (mobile/tablet)
  // without ever scrolling the page itself.
  const chipRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const scrolledOnce = useRef(false);
  useEffect(() => {
    if (!scrolledOnce.current) {
      scrolledOnce.current = true;
      return;
    }
    const chip = chipRefs.current[activeIndex];
    const container = chip?.parentElement;
    if (!chip || !container) return;

    const chipLeft =
      chip.getBoundingClientRect().left -
      container.getBoundingClientRect().left +
      container.scrollLeft;
    const target = chipLeft - (container.clientWidth - chip.offsetWidth) / 2;
    container.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [activeIndex]);

  const currentCity = CITIES[activeIndex];

  return (
    <section className="lg:min-h-screen flex flex-col justify-between relative pt-28 pb-7 border-b border-gray-900 overflow-hidden bg-abBlack">
      {/* Background Images with Smooth Crossfade */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        {CITIES.map((city, idx) => (
          <div
            key={city.name}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === activeIndex ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105"
            }`}
            style={{
              backgroundImage: `url('${city.image}')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              transition: "opacity 1000ms ease-in-out, transform 8000ms ease-out",
            }}
          />
        ))}
        {/* Readability gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-abBlack via-[#050505]/75 to-[#050505]/45 z-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-20" />
      </div>

      {/* Main Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-30 relative pt-6 md:pt-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-9 text-start">
            <div className="inline-flex items-center space-x-2 py-1.5 px-4 rounded-full bg-abDarkGray/90 border border-abBlue/30 mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-abBlue animate-pulse"></span>
              <span className="text-abBlue text-[10px] font-bold tracking-widest uppercase">
                {dict.home.heroSection.badge}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-5 leading-tight">
              {dict.home.heroSection.title}
              <span className="text-abBlue"> {dict.home.heroSection.titleHighlight}</span>
            </h1>
            <p className="text-sm md:text-base text-gray-300 mb-8 max-w-3xl leading-relaxed text-justify">
              {dict.home.heroSection.desc}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`${localeBase(lang)}/services`}
                className="group relative overflow-hidden px-8 py-3.5 text-white font-semibold text-sm tracking-wide uppercase transition-all duration-300 border border-white/30 hover:border-white rounded-sm"
              >
                {dict.home.heroSection.ctaExplore}
              </Link>
              <Link
                href={`${localeBase(lang)}/contact`}
                className="group relative overflow-hidden px-8 py-3.5 bg-white text-[#1a1a1a] font-semibold text-sm tracking-wide uppercase transition-all duration-300 hover:bg-gray-100 rounded-sm"
              >
                <i className="fa-solid fa-envelope mr-2"></i> {dict.home.heroSection.ctaRequestAProposal}
              </Link>
              <Link
                href="#duty-of-care"
                className="bg-transparent border border-gray-700 text-white hover:border-abBlue hover:text-abBlue px-8 py-3.5 rounded text-sm font-semibold transition-colors flex items-center"
              >
                <i className="fa-solid fa-shield-halved mr-2"></i> {dict.home.heroSection.ctaDutyOfCare}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Interactive City Slider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-30 relative mt-auto pt-10 pb-2">
        <div className="flex items-end justify-between gap-5 flex-wrap">
          {/* Active City & Country Indicator */}
          <div aria-live="polite" className="flex items-center gap-2.5">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="#2AA8E0"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12z"></path>
              <circle cx="12" cy="9" r="2.5"></circle>
            </svg>
            <span className="text-[22px] font-medium text-white">{currentCity.name}</span>
            <span className="text-[16px] text-gray-400">{currentCity.country}</span>
          </div>

          {/* Slideshow Controls (Prev, Pause/Play, Next) */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous city"
              className="w-11 h-11 border border-white/30 bg-[#050709]/60 hover:bg-[#050709] hover:border-abBlue text-white cursor-pointer flex items-center justify-center transition-colors rounded-sm"
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden="true"
              >
                <path d="M15 6l-6 6 6 6"></path>
              </svg>
            </button>
            <button
              type="button"
              onClick={togglePause}
              aria-label={isPaused ? "Resume slideshow" : "Pause slideshow"}
              className="w-11 h-11 border border-white/30 bg-[#050709]/60 hover:bg-[#050709] hover:border-abBlue text-white cursor-pointer flex items-center justify-center transition-colors rounded-sm"
            >
              {isPaused ? (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z"></path>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M7 5h3v14H7zM14 5h3v14h-3z"></path>
                </svg>
              )}
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next city"
              className="w-11 h-11 border border-white/30 bg-[#050709]/60 hover:bg-[#050709] hover:border-abBlue text-white cursor-pointer flex items-center justify-center transition-colors rounded-sm"
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden="true"
              >
                <path d="M9 6l6 6-6 6"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Instagram-story city chips (mobile & tablet only) */}
        <div className="lg:hidden mt-4.5 -mx-4 px-4 flex items-start gap-3 overflow-x-auto no-scrollbar pb-1">
          {CITIES.map((city, idx) => {
            const isActive = idx === activeIndex;
            const isDone = idx < activeIndex;
            return (
              <button
                key={city.name}
                ref={(el) => {
                  chipRefs.current[idx] = el;
                }}
                type="button"
                onClick={() => selectCity(idx)}
                aria-label={`Show ${city.name}`}
                aria-current={isActive || undefined}
                className="group flex-shrink-0 flex flex-col items-center gap-1.5 bg-transparent border-0 p-0 cursor-pointer"
              >
                <span className="relative flex items-center justify-center w-12 h-12">
                  <svg
                    className="absolute inset-0 w-12 h-12 -rotate-90"
                    viewBox="0 0 36 36"
                    aria-hidden="true"
                  >
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      className="text-white/20"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      className={
                        isActive
                          ? "text-abBlue"
                          : isDone
                            ? "text-abBlue/50"
                            : "text-transparent"
                      }
                      strokeWidth="2.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray="100, 100"
                      style={{
                        strokeDashoffset: isActive
                          ? 100 - progress
                          : isDone
                            ? 0
                            : 100,
                        transition: isActive
                          ? "stroke-dashoffset 60ms linear"
                          : "none",
                      }}
                    />
                  </svg>
                  <Image
                    src={city.image}
                    alt=""
                    width={36}
                    height={36}
                    className={`w-9 h-9 rounded-full object-cover border transition-all ${
                      isActive
                        ? "scale-105 opacity-100 border-abBlue/40"
                        : "opacity-65 border-white/10 group-hover:opacity-100"
                    }`}
                  />
                </span>
                <span
                  className={`text-[10px] font-medium transition-colors ${
                    isActive ? "text-white" : "text-gray-400 group-hover:text-gray-200"
                  }`}
                >
                  {city.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* City Tablist (desktop only) with animated progress bar on active tab */}
        <div
          role="tablist"
          aria-label="Choose a city"
          className="hidden lg:grid lg:grid-cols-7 gap-3 mt-4.5 overflow-x-auto no-scrollbar"
        >
          {CITIES.map((city, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={city.name}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => selectCity(idx)}
                className={`slide-tab relative flex flex-col items-start gap-0.5 pt-3.5 pb-1 min-h-[44px] bg-transparent border-t-2 text-left cursor-pointer transition-colors ${
                  isActive
                    ? "border-transparent text-white"
                    : "border-white/20 text-gray-400 hover:text-white hover:border-white/40"
                }`}
              >
                {isActive && (
                  <span
                    className="hidden lg:block absolute -top-[2px] left-0 right-0 h-[2px] bg-[#2AA8E0] origin-left"
                    style={{
                      transform: `scaleX(${progress / 100})`,
                      transition: "transform 60ms linear",
                    }}
                  />
                )}
                <span
                  className={`tab-city text-[15px] font-medium transition-colors ${
                    isActive ? "text-white" : "text-gray-400"
                  }`}
                >
                  {city.name}
                </span>
                <span className="text-[12px] text-gray-500">
                  {city.country}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
