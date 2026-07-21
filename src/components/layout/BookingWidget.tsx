"use client";

import { useState } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="#6b7280">
      <path d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13Z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="#6b7280">
      <path d="M17 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9V3H15V1H17V3ZM4 9V19H20V9H4ZM6 13H11V17H6V13Z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="#6b7280">
      <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM13 12V7H11V14H17V12H13Z" />
    </svg>
  );
}

interface BookingWidgetProps {
  dict: Dictionary;
  className?: string;
}

export default function BookingWidget({ dict, className = "" }: BookingWidgetProps) {
  const [activeTab, setActiveTab] = useState<"one-way" | "hourly">("one-way");
  const b = dict.booking;

  return (
    <div
      className={`bg-white rounded-2xl p-6 shadow-[0_12px_24px_rgba(0,0,0,0.15)] max-w-[440px] w-full ${className}`}
    >
      {/* Tabs */}
      <div className="flex gap-1 mb-5">
        <button
          onClick={() => setActiveTab("one-way")}
          className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
            activeTab === "one-way"
              ? "bg-[#292a30] text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {b.oneWay}
        </button>
        <button
          onClick={() => setActiveTab("hourly")}
          className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
            activeTab === "hourly"
              ? "bg-[#292a30] text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {b.byTheHour}
        </button>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-4">
        {/* From */}
        <div>
          <label className="block text-[11px] font-bold text-gray-500 mb-1.5">
            {b.from}
          </label>
          <div className="flex items-center gap-2.5 border-2 border-transparent focus-within:border-gray-800 rounded-xl bg-gray-50 px-3 py-2.5 transition-colors">
            <LocationIcon />
            <input
              type="text"
              placeholder={b.pickupPlaceholder}
              className="w-full text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent"
            />
          </div>
        </div>

        {/* To / Duration */}
        {activeTab === "one-way" ? (
          <div>
            <label className="block text-[11px] font-bold text-gray-500 mb-1.5">
              {b.to}
            </label>
            <div className="flex items-center gap-2.5 border-2 border-transparent focus-within:border-gray-800 rounded-xl bg-gray-50 px-3 py-2.5 transition-colors">
              <LocationIcon />
              <input
                type="text"
                placeholder={b.pickupPlaceholder}
                className="w-full text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent"
              />
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-[11px] font-bold text-gray-500 mb-1.5">
              {b.duration}
            </label>
            <div className="flex items-center gap-2.5 border-2 border-transparent focus-within:border-gray-800 rounded-xl bg-gray-50 px-3 py-2.5 transition-colors">
              <ClockIcon />
              <select className="w-full text-sm text-gray-800 outline-none bg-transparent appearance-none cursor-pointer">
                <option>{b.hours80km}</option>
                <option>{b.hours120km}</option>
                <option>{b.hours160km}</option>
              </select>
            </div>
          </div>
        )}

        {/* Date & Time Row */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-[11px] font-bold text-gray-500 mb-1.5">
              {b.date}
            </label>
            <div className="flex items-center gap-2.5 border-2 border-transparent focus-within:border-gray-800 rounded-xl bg-gray-50 px-3 py-2.5 transition-colors">
              <CalendarIcon />
              <input
                type="text"
                placeholder={b.selectDate}
                className="w-full text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent"
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-[11px] font-bold text-gray-500 mb-1.5">
              {b.pickupTime}
            </label>
            <div className="flex items-center gap-2.5 border-2 border-transparent focus-within:border-gray-800 rounded-xl bg-gray-50 px-3 py-2.5 transition-colors">
              <ClockIcon />
              <input
                type="text"
                placeholder={b.selectTime}
                className="w-full text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent"
              />
            </div>
          </div>
        </div>

        {/* Helper Text */}
        <p className="text-[11px] text-gray-400 -mt-1">
          {b.helperText}
        </p>

        {/* Search Button */}
        <button className="w-full bg-[#292a30] text-white py-3.5 rounded-full text-sm font-semibold hover:bg-[#1c1d21] transition-colors cursor-pointer mt-1">
          {b.search}
        </button>
      </div>
    </div>
  );
}
