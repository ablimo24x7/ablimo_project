"use client";

import { useState } from "react";
import { Dictionary } from "@/app/[lang]/dictionaries";

export default function HeroSection({ dict }: { dict: Dictionary }) {
  const [activeTab, setActiveTab] = useState("transfer");

  return (
    <section className="hero-bg min-h-screen flex items-center relative pt-25 pb-10">
      <div className="absolute inset-0 bg-gradient-to-r from-abBlack via-abBlack/80 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 py-1.5 px-4 rounded-full bg-abGold/10 border border-abGold/30 mb-6">
              <span className="w-2 h-2 rounded-full bg-abGold animate-pulse"></span>
              <span className="text-abGold text-xs font-bold tracking-widest uppercase">{dict.home.heroSection.badge}</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] mb-6">
              {dict.home.heroSection.title} <br/>
              <span className="text-abGold">{dict.home.heroSection.titleHighlight}</span>
            </h1>
            <p className="text-base text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {dict.home.heroSection.desc}
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <a href="#logistics" className="bg-abGold hover:bg-yellow-600 text-white px-8 py-3.5 rounded text-sm font-semibold transition-colors shadow-lg shadow-abGold/20">
                {dict.home.heroSection.ctaExplore}
              </a>
              <a href="#duty-of-care" className="bg-transparent border border-gray-500 text-white hover:border-white px-8 py-3.5 rounded text-sm font-semibold transition-colors flex items-center">
                <i className="fa-solid fa-shield-halved mr-2 text-abGold"></i> {dict.home.heroSection.ctaDutyOfCare}
              </a>
            </div>
          </div>

          {/* B2B Interactive Widget */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
              {/* Tabs */}
              <div className="flex border-b border-gray-200" id="widget-tabs">
                <button
                  onClick={() => setActiveTab("transfer")}
                  className={`flex-1 py-4 px-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                    activeTab === "transfer"
                      ? "text-abGold border-b-2 border-abGold bg-gray-50"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {dict.home.heroSection.tabs.transfer}
                </button>
                <button
                  onClick={() => setActiveTab("as-directed")}
                  className={`flex-1 py-4 px-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                    activeTab === "as-directed"
                      ? "text-abGold border-b-2 border-abGold bg-gray-50"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {dict.home.heroSection.tabs.asDirected}
                </button>
                <button
                  onClick={() => setActiveTab("event")}
                  className={`flex-1 py-4 px-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                    activeTab === "event"
                      ? "text-abGold border-b-2 border-abGold bg-gray-50"
                      : "text-gray-400 hover:text-gray-600"
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
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><i className="fa-solid fa-plane-arrival text-gray-400 text-sm"></i></div>
                    <input type="text" placeholder={dict.home.heroSection.form.pickup} className="block w-full pl-10 pr-3 py-3.5 border border-gray-200 rounded focus:ring-abGold focus:border-abGold sm:text-sm bg-gray-50 transition-colors" />
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><i className="fa-regular fa-building text-gray-400 text-sm"></i></div>
                    <input type="text" placeholder={dict.home.heroSection.form.dropoff} className="block w-full pl-10 pr-3 py-3.5 border border-gray-200 rounded focus:ring-abGold focus:border-abGold sm:text-sm bg-gray-50 transition-colors" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <input type="date" className="block w-full px-3 py-3.5 border border-gray-200 rounded focus:ring-abGold focus:border-abGold sm:text-sm bg-gray-50 text-gray-500" />
                    </div>
                    <div className="relative">
                      <input type="time" className="block w-full px-3 py-3.5 border border-gray-200 rounded focus:ring-abGold focus:border-abGold sm:text-sm bg-gray-50 text-gray-500" />
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-abBlack hover:bg-gray-900 text-white font-semibold py-3.5 px-4 rounded transition-colors shadow-lg mt-2">{dict.home.heroSection.form.submit}</button>
                </form>

                {/* Event Form */}
                <form
                  className={`space-y-4 absolute inset-6 transition-opacity duration-300 ${
                    activeTab === "event" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                  }`}
                  onSubmit={(e) => e.preventDefault()}
                >
                  <p className="text-sm text-gray-500 mb-4">{dict.home.heroSection.form.eventDesc}</p>
                  <div className="relative">
                    <select className="block w-full pl-3 pr-10 py-3.5 border border-gray-200 rounded focus:ring-abGold focus:border-abGold sm:text-sm bg-gray-50 text-gray-600">
                      <option>{dict.home.heroSection.form.selectType}</option>
                      <option>{dict.home.heroSection.form.exhibition}</option>
                      <option>{dict.home.heroSection.form.coach}</option>
                      <option>{dict.home.heroSection.form.government}</option>
                      <option>{dict.home.heroSection.form.sports}</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="number" placeholder={dict.home.heroSection.form.pax} className="block w-full px-3 py-3.5 border border-gray-200 rounded focus:ring-abGold focus:border-abGold sm:text-sm bg-gray-50" />
                    <input type="text" placeholder={dict.home.heroSection.form.city} className="block w-full px-3 py-3.5 border border-gray-200 rounded focus:ring-abGold focus:border-abGold sm:text-sm bg-gray-50" />
                  </div>
                  <button type="submit" className="w-full bg-abGold hover:bg-yellow-600 text-white font-semibold py-3.5 px-4 rounded transition-colors shadow-lg mt-4">{dict.home.heroSection.form.submitEvent}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
