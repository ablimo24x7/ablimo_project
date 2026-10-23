"use client";

import { useState, useRef, useEffect } from "react";
import { Dictionary } from "@/app/[lang]/dictionaries";
import Link from "next/link";

export default function HeroSection({ dict }: { dict: Dictionary }) {
  const [activeTab, setActiveTab] = useState("transfer");
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // The muted property must be set before play() or browsers reject autoplay.
    video.muted = true;
    video.defaultMuted = true;

    const attempt = video.play();
    if (attempt && typeof attempt.catch === "function") {
      attempt.catch(() => {
        // Autoplay refused (browser setting) — retry on the first interaction.
        const unlock = () => {
          video.muted = true;
          video.play().catch(() => {});
        };
        window.addEventListener("pointerdown", unlock, { once: true });
        window.addEventListener("touchstart", unlock, { once: true });
      });
    }
  }, []);

  return (
    <section className="min-h-[85vh] flex items-center relative pt-20 border-b border-gray-900 overflow-hidden bg-abBlack">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        {!videoFailed && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onError={() => setVideoFailed(true)}
            className="w-full h-full object-cover"
          >
            <source
              src="https://www.beesocialpk.com/ABGroup/company-profile-ab.mp4"
              type="video/mp4"
            />
          </video>
        )}
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-abBlack via-[#050505]/80 to-[#050505]/40 opacity-80"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Content */}
          <div className="lg:col-span-8 text-start">
            <div className="inline-flex items-center space-x-2 py-1.5 px-4 rounded-full bg-abDarkGray border border-abBlue/30 mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-abBlue animate-pulse"></span>
              <span className="text-abBlue text-[10px] font-bold tracking-widest uppercase">{dict.home.heroSection.badge}</span>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white txt-justify mb-5">
              {dict.home.heroSection.title} <br/>
              <span className="text-abBlue">{dict.home.heroSection.titleHighlight}</span>
            </h1>
            <p className="text-md text-gray-300 mb-10 max-w-3xl leading-relaxed text-justify">
              {dict.home.heroSection.desc}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/services" className="bg-abBlue hover:bg-[#1a93c4] text-white px-8 py-3.5 rounded text-sm font-semibold transition-colors shadow-lg shadow-abBlue/20">
                {dict.home.heroSection.ctaExplore}
              </Link>
              <Link href="/contact" className="bg-transparent border border-gray-700 text-white hover:border-abBlue hover:text-abBlue px-8 py-3.5 rounded text-sm font-semibold transition-colors flex items-center">
                <i className="fa-solid fa-envelope mr-2"></i> {dict.home.heroSection.ctaRequestAProposal}
              </Link>
              <Link href="#duty-of-care" className="bg-transparent border border-gray-700 text-white hover:border-abBlue hover:text-abBlue px-8 py-3.5 rounded text-sm font-semibold transition-colors flex items-center">
                <i className="fa-solid fa-shield-halved mr-2"></i> {dict.home.heroSection.ctaDutyOfCare}
              </Link>
            </div>
          </div>

          {/* B2B Interactive Widget */}
         
        </div>
      </div>
    </section>
  );
}
