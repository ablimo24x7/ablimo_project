"use client";

import { useState, useRef, useEffect } from "react";
import { Dictionary } from "@/app/[lang]/dictionaries";

export default function HeroSection({ dict }: { dict: Dictionary }) {
  const [activeTab, setActiveTab] = useState("transfer");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="min-h-[85vh] flex items-center relative pt-20 border-b border-gray-900 overflow-hidden bg-abBlack">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://media.canva.com/v2/files/uri:ifs%3A%2F%2FV%2FHTVn_1NSA9V2yAtFgDm1DG1a6D9iEZCo4Z8v5tZBXs0.mp4?csig=AAAAAAAAAAAAAAAAAAAAAK_CyTmwoiCKSIQAIw2zsX8EqAsChlO1-V9rqPNPgPzR&exp=1789221300&signer=video-rpc&token=AAIAAVYAL0hUVm5fMU5TQTlWMnlBdEZnRG0xREcxYTZEOWlFWkNvNFo4djV0WkJYczAubXA0AAAAAAGgleZnIM-2KVAifZaTJi5KiSx3EZXB11spKKDQ9kCq7SNTyw6k"
            type="video/mp4"
          />
        </video>
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-abBlack via-[#050505]/80 to-[#050505]/40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Content */}
          <div className="lg:col-span-7 text-left">
            <div className="inline-flex items-center space-x-2 py-1.5 px-4 rounded-full bg-abDarkGray border border-abBlue/30 mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-abBlue animate-pulse"></span>
              <span className="text-abBlue text-xs font-bold tracking-widest uppercase">{dict.home.heroSection.badge}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
              {dict.home.heroSection.title} <br/>
              <span className="text-abBlue">{dict.home.heroSection.titleHighlight}</span>
            </h1>
            <p className="text-lg text-gray-300 mb-10 max-w-2xl leading-relaxed">
              {dict.home.heroSection.desc}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#logistics" className="bg-abBlue hover:bg-[#1a93c4] text-white px-8 py-3.5 rounded text-sm font-semibold transition-colors shadow-lg shadow-abBlue/20">
                {dict.home.heroSection.ctaExplore}
              </a>
              <a href="#duty-of-care" className="bg-transparent border border-gray-700 text-white hover:border-abBlue hover:text-abBlue px-8 py-3.5 rounded text-sm font-semibold transition-colors flex items-center">
                <i className="fa-solid fa-shield-halved mr-2"></i> {dict.home.heroSection.ctaDutyOfCare}
              </a>
            </div>
          </div>

          {/* B2B Interactive Widget */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-abDarkGray rounded-xl shadow-2xl overflow-hidden border border-gray-800">
              {/* Tabs */}
              <div className="flex border-b border-gray-800" id="widget-tabs">
                <button
                  onClick={() => setActiveTab("transfer")}
                  className={`flex-1 py-4 px-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                    activeTab === "transfer"
                      ? "text-abBlue border-b-2 border-abBlue bg-[#050505]"
                      : "text-gray-500 hover:text-gray-300 bg-[#111]"
                  }`}
                >
                  {dict.home.heroSection.tabs.transfer}
                </button>
                <button
                  onClick={() => setActiveTab("as-directed")}
                  className={`flex-1 py-4 px-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                    activeTab === "as-directed"
                      ? "text-abBlue border-b-2 border-abBlue bg-[#050505]"
                      : "text-gray-500 hover:text-gray-300 bg-[#111]"
                  }`}
                >
                  {dict.home.heroSection.tabs.asDirected}
                </button>
                <button
                  onClick={() => setActiveTab("event")}
                  className={`flex-1 py-4 px-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                    activeTab === "event"
                      ? "text-abBlue border-b-2 border-abBlue bg-[#050505]"
                      : "text-gray-500 hover:text-gray-300 bg-[#111]"
                  }`}
                >
                  {dict.home.heroSection.tabs.event}
                </button>
              </div>
              
              {/* Booking Forms Container */}
              <div className="p-6 h-[340px] relative">
                
                {/* Transfer / As-Directed Form */}
                <form
                  className={`space-y-4 absolute inset-6 transition-opacity duration-300 ${
                    activeTab !== "event" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                  }`}
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><i className="fa-solid fa-plane-arrival text-gray-500 text-sm"></i></div>
                    <input type="text" placeholder={dict.home.heroSection.form.pickup} className="block w-full pl-10 pr-3 py-3.5 border border-gray-700 rounded focus:ring-abBlue focus:border-abBlue sm:text-sm bg-[#050505] text-white transition-colors outline-none" />
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><i className="fa-regular fa-building text-gray-500 text-sm"></i></div>
                    <input type="text" placeholder={dict.home.heroSection.form.dropoff} className="block w-full pl-10 pr-3 py-3.5 border border-gray-700 rounded focus:ring-abBlue focus:border-abBlue sm:text-sm bg-[#050505] text-white transition-colors outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <input type="date" className="block w-full px-3 py-3.5 border border-gray-700 rounded focus:ring-abBlue focus:border-abBlue sm:text-sm bg-[#050505] text-gray-400 outline-none" style={{ colorScheme: "dark" }} />
                    </div>
                    <div className="relative">
                      <input type="time" className="block w-full px-3 py-3.5 border border-gray-700 rounded focus:ring-abBlue focus:border-abBlue sm:text-sm bg-[#050505] text-gray-400 outline-none" style={{ colorScheme: "dark" }} />
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-[#050505] border border-gray-700 hover:border-abBlue hover:text-abBlue text-white font-semibold py-3.5 px-4 rounded transition-colors shadow-lg mt-2">{dict.home.heroSection.form.submit}</button>
                </form>

                {/* Event Form */}
                <form
                  className={`space-y-4 absolute inset-6 transition-opacity duration-300 ${
                    activeTab === "event" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                  }`}
                  onSubmit={(e) => e.preventDefault()}
                >
                  <p className="text-sm text-gray-400 mb-4">{dict.home.heroSection.form.eventDesc}</p>
                  <div className="relative">
                    <select className="block w-full pl-3 pr-10 py-3.5 border border-gray-700 rounded focus:ring-abBlue focus:border-abBlue sm:text-sm bg-[#050505] text-gray-300 outline-none appearance-none">
                      <option>{dict.home.heroSection.form.selectType}</option>
                      <option>{dict.home.heroSection.form.exhibition}</option>
                      <option>{dict.home.heroSection.form.coach}</option>
                      <option>{dict.home.heroSection.form.government}</option>
                      <option>{dict.home.heroSection.form.sports}</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="number" placeholder={dict.home.heroSection.form.pax} className="block w-full px-3 py-3.5 border border-gray-700 rounded focus:ring-abBlue focus:border-abBlue sm:text-sm bg-[#050505] text-white outline-none" />
                    <input type="text" placeholder={dict.home.heroSection.form.city} className="block w-full px-3 py-3.5 border border-gray-700 rounded focus:ring-abBlue focus:border-abBlue sm:text-sm bg-[#050505] text-white outline-none" />
                  </div>
                  <button type="submit" className="w-full bg-abBlue hover:bg-[#1a93c4] text-white font-semibold py-3.5 px-4 rounded transition-colors shadow-lg mt-4">{dict.home.heroSection.form.submitEvent}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
