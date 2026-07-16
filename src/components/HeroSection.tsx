"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

const slides = [
  {
    id: 1,
    src: "/cars/New folder/3.png",
    title: "AB.Limo Model S",
    desc: "The AB.Limo Model S is a full-sized electric five-door, liftback, produced by AB.Limo. Since its introduction June 2012 it has achieved rapidly growing sale from Norway and California.",
  },
  {
    id: 2,
    src: "/cars/New folder/1.png",
    title: "Lexus LS 500",
    desc: "Experience uncompromising luxury and meticulous craftsmanship. The Lexus LS 500 delivers a smooth, powerful ride perfect for executive travel and high-end transport.",
  },
  {
    id: 3,
    src: "/cars/New folder/2.png",
    title: "Mercedes Sprinter",
    desc: "Ideal for group travel, the Mercedes Sprinter offers unparalleled space and premium amenities, ensuring your entire party travels in absolute comfort and style.",
  },
  {
    id: 4,
    src: "/cars/New folder/4.png",
    title: "GMC Yukon Elite",
    desc: "Command the road with the robust GMC SUV, blending dominating power with sophisticated style and ample luggage capacity for any journey.",
  },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [titleVisible, setTitleVisible] = useState(true);
  const [isOneWay, setIsOneWay] = useState(true);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
    [currentIndex, updateText]
  );

  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
      updateText();
    }, 5000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [updateText]);

  const getCarClass = (index: number) => {
    if (index === currentIndex) return "car-slide car-active";
    if (index < currentIndex) return "car-slide car-hidden-right";
    return "car-slide car-hidden-left";
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between overflow-x-hidden overflow-y-auto md:overflow-hidden bg-[#292a30]">
      {/* Background layers */}
      <div className="absolute inset-0 z-[-2] flex flex-col pointer-events-none">
        <div className="h-[70%] bg-gradient-to-b from-[#424450] to-[#3a3c46]" />
        <div className="h-[30%] bg-[#292a30]" />
      </div>

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[-1] overflow-hidden">
        <h1 className="text-[26vw] font-black text-white opacity-[0.03] tracking-tighter select-none -mt-[5%]">
          AB.LIMO
        </h1>
      </div>

      {/* Header */}
      <header className="relative z-50 w-full flex justify-between items-center px-8 md:px-16 py-8">
        <div className="text-3xl font-light tracking-wide text-gray-200">
          AB.Limo
        </div>
        <nav className="hidden md:flex items-center gap-10 text-xs font-semibold tracking-[0.15em] text-gray-400">
          <a href="#" className="hover:text-white transition-colors">
            ORDER
          </a>
          <a href="#" className="text-white border-b-2 border-white pb-1">
            BOOK NOW
          </a>
          <a href="#" className="hover:text-white transition-colors">
            CHARGING
          </a>
          <a href="#" className="hover:text-white transition-colors">
            GALLERY
          </a>
          <a href="#" className="hover:text-white transition-colors">
            VIDEOS
          </a>
        </nav>
        <div className="md:hidden text-white cursor-pointer">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
      </header>

      {/* Slider images container */}
      <div className="absolute left-0 right-0 w-full h-auto z-10 pointer-events-none top-[28%] md:top-[50%] -translate-y-1/2">
        {slides.map((slide, index) => (
          <Image
            key={slide.id}
            src={slide.src}
            alt={slide.title}
            width={910}
            height={400}
            className={getCarClass(index)}
            priority={index === 0}
          />
        ))}
      </div>

      {/* Main content area */}
      {/* Set explicit viewport heights so the chauffeur scales accurately relative to the screen */}
      <div className="relative flex-grow w-full h-[52vh] xs:h-[58vh] md:h-[65vh] z-30 pointer-events-none">
        
        {/* Chauffeur image - Kept clean, un-clipped, and sits perfectly down to the pixel on the bottom edge */}
        <div className="absolute  bottom-0 left-1/2 -translate-x-1/2 h-full w-auto z-20 pointer-events-none flex justify-center items-end overflow-visible">
          <img
            src="/chauffeur.png"
            alt="Chauffeur"
            className="h-[95%] w-auto object-contain object-bottom block origin-bottom scale-146 xs:scale-105 md:scale-100"
          />
        </div>

        {/* Slide text container */}
        <div className="absolute left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 right-auto md:right-[8%] top-[15%] max-h-[680px]:top-[20%] translate-y-0 md:top-[50%] md:-translate-y-1/2 w-[85%] max-w-[280px] xs:max-w-[340px] pointer-events-auto text-center md:text-left z-30 flex flex-col items-center md:items-start">
          <h2
            className={`text-[1.5rem] xs:text-[1.8rem] sm:text-[2.2rem] md:text-[2.5rem] leading-tight font-bold text-white mb-1 xs:mb-3 md:mb-4 tracking-wide drop-shadow-lg transition-opacity duration-500 ${
              titleVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {slides[currentIndex].title}
          </h2>
          <p
            className={`text-[10.5px] xs:text-xs md:text-sm text-gray-300 leading-relaxed mb-2.5 xs:mb-6 md:mb-8 drop-shadow transition-opacity duration-500 delay-100 ${
              titleVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {slides[currentIndex].desc}
          </p>
          <button className="border-2 border-white text-white px-6 py-2 xs:px-8 xs:py-3 text-[10px] xs:text-xs font-semibold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300">
            Book Now
          </button>

          {/* Horizontal Pagination dots */}
          <div className="flex flex-row items-center gap-2.5 mt-4 pointer-events-auto z-40">
            {slides.map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-center w-[14px] h-[14px] xs:w-[18px] xs:h-[18px] cursor-pointer"
                onClick={() => goToSlide(index)}
              >
                <div
                  className={
                    index === currentIndex 
                      ? "dot-active scale-90 xs:scale-100" 
                      : "dot-inactive scale-90 xs:scale-100"
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking form section */}
      {/* Removed negative margin class to keep feet intact and ensure tabs rest naturally next to his heels */}
      <div className="relative md:absolute bottom-0 z-40 w-full flex flex-col items-center pb-8 md:pb-16 pt-4 md:pt-8 bg-[#292a30] md:bg-transparent mt-auto">
        
        {/* Mobile Tabs */}
        <div className="flex bg-[#2a2c35] rounded-full p-1 mb-4 shadow-2xl border border-gray-600/50 w-[90%] max-w-[320px] md:w-auto">
          <button
            className={`flex-1 rounded-full py-2 px-8 font-semibold text-sm transition-all ${
              isOneWay
                ? "bg-[#e4e4e4] text-[#292a30] shadow-md"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setIsOneWay(true)}
          >
            One way
          </button>
          <button
            className={`flex-1 rounded-full py-2 px-8 font-semibold text-sm transition-all ${
              !isOneWay
                ? "bg-[#e4e4e4] text-[#292a30] shadow-md"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setIsOneWay(false)}
          >
            By the hour
          </button>
        </div>

        <div className="w-full max-w-[1200px] px-4 md:px-0">
          <div className="flex flex-col md:flex-row items-end bg-[#53545b]/80 backdrop-blur-md rounded-xl border border-gray-400/40 shadow-2xl p-4 gap-4 md:gap-0">
            <div className="flex-1 w-full px-4 border-b md:border-b-0 md:border-r border-gray-400/40 relative">
              <label className="block text-white font-semibold text-[13px] mb-2">
                Pickup location
              </label>
              <input
                type="text"
                placeholder="Address, airport, hotel, ..."
                className="w-full bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none border-b border-gray-300 focus:border-white pb-2 transition-colors text-sm"
              />
            </div>
            {isOneWay ? (
              <div className="flex-1 w-full px-4 border-b md:border-b-0 md:border-r border-gray-400/40">
                <label className="block text-white font-semibold text-[13px] mb-2">
                  Drop-off location
                </label>
                <input
                  type="text"
                  placeholder="Address, airport, hotel, ..."
                  className="w-full bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none border-b border-gray-300 focus:border-white pb-2 transition-colors text-sm"
                />
              </div>
            ) : (
              <div className="flex-1 w-full px-4 border-b md:border-b-0 md:border-r border-gray-400/40">
                <label className="block text-white font-semibold text-[13px] mb-2">
                  Duration
                </label>
                <div className="relative">
                  <select className="w-full bg-transparent text-gray-200 font-medium appearance-none border-b border-gray-300 focus:border-white pb-2 transition-colors text-sm cursor-pointer">
                    <option className="bg-[#474850]">
                      2 hours (80 km included)
                    </option>
                    <option className="bg-[#474850]">
                      3 hours (120 km included)
                    </option>
                    <option className="bg-[#474850]">
                      4 hours (160 km included)
                    </option>
                  </select>
                </div>
              </div>
            )}
            <div className="flex-[0.8] w-full px-4 border-b md:border-b-0 md:border-r border-gray-400/40">
              <label className="block text-white font-semibold text-[13px] mb-2">
                Date
              </label>
              <select className="w-full bg-transparent text-gray-300 appearance-none border-b border-gray-300 focus:border-white pb-2 transition-colors text-sm cursor-pointer">
                <option className="bg-[#474850]">Select a date</option>
              </select>
            </div>
            <div className="flex-[0.8] w-full px-4 border-b md:border-b-0 md:border-r border-gray-400/40">
              <label className="block text-white font-semibold text-[13px] mb-2">
                Pickup time
              </label>
              <select className="w-full bg-transparent text-white font-semibold appearance-none border-b border-gray-300 focus:border-white pb-2 transition-colors text-sm cursor-pointer">
                <option className="bg-[#474850]">11:30 PM</option>
              </select>
            </div>
            <div className="px-4 mt-4 md:mt-0 pb-1 w-full md:w-auto">
              <button className="bg-[#2a2c35] hover:bg-[#1f2027] text-white border border-gray-500/50 px-8 py-[10px] text-sm font-semibold rounded-full transition-all duration-300 w-full md:w-auto">
                View options
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}