"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import BookingWidget from "./BookingWidget";

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
    <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 z-[-2] flex flex-col pointer-events-none">
        <div className="h-[70%] bg-gradient-to-b from-[#424450] to-[#3a3c46]" />
        <div className="h-[30%] bg-[#292a30]" />
      </div>

      {/* ===== DESKTOP LAYOUT ===== */}
      <div className="hidden md:block absolute inset-0 w-full h-full">
        {/* Slider images */}
        <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
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

        {/* Chauffeur image */}
        <div className="absolute top-[58%] left-[30%] -translate-y-1/2 h-[78vh] max-h-[910px] z-20 pointer-events-none flex justify-center items-end">
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
          <div className="absolute left-16 top-[50%] -translate-y-1/2 flex flex-col items-center gap-4 pointer-events-auto">
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
          <div className="absolute right-[8%] top-[50%] -translate-y-1/2 w-full max-w-[340px] pointer-events-auto">
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
              Book Now
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
            {slides.map((slide, index) => (
              <Image
                key={slide.id}
                src={slide.src}
                alt={slide.title}
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
              height={600}
              className="h-[75vh] max-h-[500px] w-auto object-contain object-bottom drop-shadow-2xl"
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
            Book Now
          </button>
        </div>

        {/* Horizontal pagination dots */}
        <div className="flex items-center justify-center gap-5 py-3 pointer-events-auto">
          {slides.map((_, index) => (
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
      <div className="relative z-40 w-full flex justify-center pb-8 md:pb-16 pt-4 md:pt-8 mt-auto px-4">
        <BookingWidget />
      </div>
    </section>
  );
}
