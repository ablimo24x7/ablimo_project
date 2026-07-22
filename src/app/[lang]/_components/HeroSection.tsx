"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import type { Dictionary } from "@/app/[lang]/dictionaries";

const slideImages = [
  { id: 1, src: "/cars/New folder/3.png" },
  { id: 2, src: "/cars/New folder/1.png" },
  { id: 3, src: "/cars/New folder/2.png" },
  { id: 4, src: "/cars/New folder/4.png" },
];

export default function HeroSection({ dict }: { dict: Dictionary }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [titleVisible, setTitleVisible] = useState(true);
  const [isOneWay, setIsOneWay] = useState(true);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const slides = dict.home.slides;
  const b = dict.booking;

  const updateText = useCallback(() => {
    setTitleVisible(false);
    setTimeout(() => setTitleVisible(true), 300);
  }, []);

  const goToSlide = useCallback(
    (newIndex: number) => {
      if (newIndex === currentIndex) return;
      setCurrentIndex(newIndex);
      updateText();
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
        updateText();
      }, 5000);
    },
    [currentIndex, updateText, slides.length]
  );

  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
      updateText();
    }, 5000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [updateText, slides.length]);

  const getCarClass = (index: number) => {
    if (index === currentIndex) return "car-slide car-active";
    if (index < currentIndex) return "car-slide car-hidden-right";
    return "car-slide car-hidden-left";
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden -mt-20">
      {/* Background text */}
      <div className="absolute inset-0 z-[-1] flex items-center justify-center pointer-events-none overflow-hidden">
        <h1 className="text-[22vw] font-black text-white opacity-[0.03] tracking-tighter select-none -mt-[5%]">
          AB.LIMO
        </h1>
      </div>

      {/* Background layers */}
      <div className="absolute inset-0 z-[-2] flex flex-col pointer-events-none">
        <div className="h-[70%] bg-gradient-to-b from-[#424450] to-[#3a3c46]" />
        <div className="h-[30%] bg-[#292a30]" />
      </div>

      {/* ===== DESKTOP LAYOUT ===== */}
      <div className="hidden md:block absolute inset-0 w-full h-full">
        {/* Slider images */}
        <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
          {slideImages.map((slide, index) => (
            <Image
              key={slide.id}
              src={slide.src}
              alt={slides[index].title}
              width={910}
              height={400}
              className={getCarClass(index)}
              priority={index === 0}
            />
          ))}
        </div>

        {/* Chauffeur image */}
        <div className="absolute top-[58%] left-[30%] -translate-y-1/2 h-[80vh] max-h-[910px] z-20 pointer-events-none flex justify-center items-end">
          <Image
            src="/chauffeur.png"
            alt="Chauffeur"
            width={400}
            height={900}
            className="h-full w-auto object-contain drop-shadow-2xl"
          />
        </div>

        {/* Content */}
        <div className="relative w-full h-full z-30 pointer-events-none">
          {/* Pagination dots - vertical left */}
          <div className="absolute left-16 top-[42%] -translate-y-1/2 flex flex-col items-center gap-4 pointer-events-auto">
            {slides.map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-center w-[20px] h-[20px] cursor-pointer"
                onClick={() => goToSlide(index)}
              >
                <div
                  className={
                    index === currentIndex ? "dot-active" : "dot-inactive"
                  }
                />
              </div>
            ))}
          </div>

          {/* Slide text - right side */}
          <div className="absolute right-[8%] top-[42%] -translate-y-1/2 w-full max-w-[340px] pointer-events-auto">
            <h2
              className={`text-[2.5rem] leading-tight font-bold text-white mb-4 tracking-wide drop-shadow-lg transition-opacity duration-500 ${
                titleVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              {slides[currentIndex].title}
            </h2>
            <p
              className={`text-sm text-gray-300 leading-relaxed mb-8 drop-shadow transition-opacity duration-500 delay-100 ${
                titleVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              {slides[currentIndex].desc}
            </p>
            <button className="border-2 border-white text-white px-8 py-3 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300 cursor-pointer">
              {dict.hero.bookNow}
            </button>
          </div>
        </div>
      </div>

      {/* ===== MOBILE LAYOUT - Vertical Column ===== */}
      <div className="md:hidden relative w-full flex-1 flex flex-col items-center z-20 px-6 pt-4">
        {/* Chauffeur + Cars - main visual focus */}
        <div className="relative w-full flex-1 flex justify-center items-center min-h-[35vh]">
          {/* Cars behind chauffeur */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {slideImages.map((slide, index) => (
              <Image
                key={slide.id}
                src={slide.src}
                alt={slides[index].title}
                width={500}
                height={250}
                className={`absolute w-[85%] h-auto object-contain transition-all duration-700 ${
                  index === currentIndex
                    ? "opacity-70 scale-100"
                    : index < currentIndex
                    ? "opacity-0 -translate-x-full scale-90"
                    : "opacity-0 translate-x-full scale-90"
                }`}
                priority={index === 0}
              />
            ))}
          </div>
          {/* Chauffeur on top */}
          <div className="relative z-10 h-full flex items-end justify-center">
            <Image
              src="/chauffeur.png"
              alt="Chauffeur"
              width={260}
              height={800}
              className="h-[90vh] max-h-[500px] w-auto object-contain object-bottom drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* Slide text - at chauffeur mid section level */}
        <div className="w-full text-center -mt-24 mb-2 relative z-30">
          <h2
            className={`text-[1.75rem] leading-tight font-bold text-white mb-2 tracking-wide drop-shadow-lg transition-opacity duration-500 ${
              titleVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {slides[currentIndex].title}
          </h2>
          <p
            className={`text-xs text-gray-300 leading-relaxed mb-5 drop-shadow transition-opacity duration-500 delay-100 px-2 ${
              titleVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {slides[currentIndex].desc}
          </p>
          <button className="border-2 border-white text-white px-7 py-2.5 text-[11px] font-semibold tracking-[0.15em] uppercase hover:bg-white hover:text-black transition-all duration-300 cursor-pointer">
            {dict.hero.bookNow}
          </button>
        </div>

        {/* Horizontal pagination dots */}
        <div className="flex items-center justify-center gap-5 py-3 pointer-events-auto">
          {slides.map((_: unknown, index: number) => (
            <div
              key={index}
              className="flex items-center justify-center w-[18px] h-[18px] cursor-pointer"
              onClick={() => goToSlide(index)}
            >
              <div
                className={
                  index === currentIndex ? "dot-active" : "dot-inactive"
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Booking form */}
      <div className="relative z-40 w-full flex flex-col items-center pb-8 md:pb-16 pt-4 md:pt-8 mt-auto mt-0 md:mt-152">
        <div className="flex bg-[#2a2c35] rounded-full p-1 mb-4 shadow-lg border border-gray-600/50">
          <button
            className={`flex-1 rounded-full py-2 px-6 md:px-8 font-semibold text-xs md:text-sm transition-all cursor-pointer ${
              isOneWay
                ? "bg-[#e4e4e4] text-[#292a30] shadow-md"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setIsOneWay(true)}
          >
            {b.oneWay}
          </button>
          <button
            className={`flex-1 rounded-full py-2 px-6 md:px-8 font-semibold text-xs md:text-sm transition-all cursor-pointer ${
              !isOneWay
                ? "bg-[#e4e4e4] text-[#292a30] shadow-md"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setIsOneWay(false)}
          >
            {b.byTheHour}
          </button>
        </div>
        <div className="w-full max-w-[1200px] px-4 md:px-0">
          <div className="flex flex-col md:flex-row items-stretch md:items-end bg-[#53545b]/80 backdrop-blur-md rounded-xl border border-gray-400/40 shadow-2xl p-2 md:p-2 gap-3 md:gap-0">
            <div className="flex-1 w-full px-3 md:px-4 py-2 border-b md:border-b-0 md:border-r border-gray-400/40">
              <label className="block text-white font-semibold text-[11px] md:text-[13px] mb-1 md:mb-2">
                {b.from}
              </label>
              <input
                type="text"
                placeholder={b.pickupPlaceholder}
                className="w-full bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none border-b border-gray-300 focus:border-white pb-2 transition-colors text-xs md:text-sm"
              />
            </div>
            {isOneWay ? (
              <div className="flex-1 w-full px-3 md:px-4 py-2 border-b md:border-b-0 md:border-r border-gray-400/40">
                <label className="block text-white font-semibold text-[11px] md:text-[13px] mb-1 md:mb-2">
                  {b.to}
                </label>
                <input
                  type="text"
                  placeholder={b.pickupPlaceholder}
                  className="w-full bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none border-b border-gray-300 focus:border-white pb-2 transition-colors text-xs md:text-sm"
                />
              </div>
            ) : (
              <div className="flex-1 w-full px-3 md:px-4 py-2 border-b md:border-b-0 md:border-r border-gray-400/40">
                <label className="block text-white font-semibold text-[11px] md:text-[13px] mb-1 md:mb-2">
                  {b.duration}
                </label>
                <div className="relative">
                  <select className="w-full bg-transparent text-gray-200 font-medium appearance-none border-b border-gray-300 focus:border-white pb-2 transition-colors text-xs md:text-sm cursor-pointer">
                    <option className="bg-[#474850]">
                      {b.hours80km}
                    </option>
                    <option className="bg-[#474850]">
                      {b.hours120km}
                    </option>
                    <option className="bg-[#474850]">
                      {b.hours160km}
                    </option>
                  </select>
                </div>
              </div>
            )}
            <div className="flex-1 md:flex-[0.8] w-full px-3 md:px-4 py-2 border-b md:border-b-0 md:border-r border-gray-400/40">
              <label className="block text-white font-semibold text-[11px] md:text-[13px] mb-1 md:mb-2">
                {b.date}
              </label>
              <select className="w-full bg-transparent text-gray-300 appearance-none border-b border-gray-300 focus:border-white pb-2 transition-colors text-xs md:text-sm cursor-pointer">
                <option className="bg-[#474850]">{b.selectDate}</option>
              </select>
            </div>
            <div className="flex-1 md:flex-[0.8] w-full px-3 md:px-4 py-2 border-b md:border-b-0 md:border-r border-gray-400/40">
              <label className="block text-white font-semibold text-[11px] md:text-[13px] mb-1 md:mb-2">
                {b.pickupTime}
              </label>
              <select className="w-full bg-transparent text-white font-semibold appearance-none border-b border-gray-300 focus:border-white pb-2 transition-colors text-xs md:text-sm cursor-pointer">
                <option className="bg-[#474850]">{b.selectTime}</option>
              </select>
            </div>
            <div className="px-3 md:px-4 mt-2 md:mt-0 pb-1">
              <button className="bg-[#2a2c35] hover:bg-[#1f2027] text-white border border-gray-500/50 px-6 md:px-8 py-[10px] text-xs md:text-sm font-semibold rounded-full transition-all duration-300 w-full md:w-auto cursor-pointer">
                {b.search}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
