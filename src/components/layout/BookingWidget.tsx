"use client";

import { useState } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="#6b7280" className="shrink-0 mt-0.5">
      <path d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13Z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="#6b7280" className="shrink-0 mt-0.5">
      <path d="M17 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9V3H15V1H17V3ZM4 9V19H20V9H4ZM6 13H11V17H6V13Z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="#6b7280" className="shrink-0 mt-0.5">
      <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM13 12V7H11V14H17V12H13Z" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <polyline points="6 9 12 15 18 9"></polyline>
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
      className={`bg-white rounded-2xl shadow-[0_12px_24px_rgba(0,0,0,0.15)] max-w-[440px] w-full overflow-hidden text-gray-900 ${className}`}
    >
      {/* 1. Full-width Flush Top Tabs */}
      <div className="grid grid-cols-2 bg-gray-100 text-center border-b border-gray-100">
        <button
          type="button"
          onClick={() => setActiveTab("one-way")}
          className={`py-3.5 text-sm font-bold transition-colors cursor-pointer ${activeTab === "one-way"
            ? "bg-white text-black"
            : "bg-gray-200/70 text-gray-600 hover:text-black"
            }`}
        >
          {b.oneWay}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("hourly")}
          className={`py-3.5 text-sm font-bold transition-colors cursor-pointer ${activeTab === "hourly"
            ? "bg-white text-black"
            : "bg-gray-200/70 text-gray-600 hover:text-black"
            }`}
        >
          {b.byTheHour}
        </button>
      </div>

      {/* Form Content Padding */}
      <div className="p-5 flex flex-col gap-3">
        {/* From Field */}
        <div className="flex items-center gap-2.5 rounded-xl bg-gray-100 px-3.5 py-2.5 transition-colors focus-within:ring-1 focus-within:ring-gray-800">
          <LocationIcon />
          <div className="flex-1 min-w-0">
            <label className="block text-[11px] font-semibold text-gray-500 leading-tight">
              {b.from}
            </label>
            <input
              type="text"
              placeholder={b.pickupPlaceholder}
              className="w-full text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent pt-0.5"
            />
          </div>
        </div>

        {/* To / Duration Field */}
        {activeTab === "one-way" ? (
          <div className="flex items-center gap-2.5 rounded-xl bg-gray-100 px-3.5 py-2.5 transition-colors focus-within:ring-1 focus-within:ring-gray-800">
            <LocationIcon />
            <div className="flex-1 min-w-0">
              <label className="block text-[11px] font-semibold text-gray-500 leading-tight">
                {b.to}
              </label>
              <input
                type="text"
                placeholder={b.pickupPlaceholder}
                className="w-full text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent pt-0.5"
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2.5 rounded-xl bg-gray-100 px-3.5 py-2.5 transition-colors relative focus-within:ring-1 focus-within:ring-gray-800">
            <ClockIcon />
            <div className="flex-1 min-w-0">
              <label className="block text-[11px] font-semibold text-gray-500 leading-tight">
                {b.duration}
              </label>
              <select className="w-full text-sm text-gray-900 font-medium outline-none bg-transparent appearance-none cursor-pointer pt-0.5">
                <option>{b.hours80km}</option>
                <option>{b.hours120km}</option>
                <option>{b.hours160km}</option>
              </select>
            </div>
            <ChevronIcon />
          </div>
        )}

        {/* Date Field (Full Width Stacked) */}
        <div className="flex items-center gap-2.5 rounded-xl bg-gray-100 px-3.5 py-2.5 transition-colors focus-within:ring-1 focus-within:ring-gray-800">
          <CalendarIcon />
          <div className="flex-1 min-w-0">
            <label className="block text-[11px] font-semibold text-gray-500 leading-tight">
              {b.date}
            </label>
            <input
              type="text"
              placeholder={b.selectDate}
              className="w-full text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent pt-0.5"
            />
          </div>
          <ChevronIcon />
        </div>

        {/* Pickup Time Field (Full Width Stacked) */}
        <div className="flex items-center gap-2.5 rounded-xl bg-gray-100 px-3.5 py-2.5 transition-colors focus-within:ring-1 focus-within:ring-gray-800">
          <ClockIcon />
          <div className="flex-1 min-w-0">
            <label className="block text-[11px] font-semibold text-gray-500 leading-tight">
              {b.pickupTime}
            </label>
            <input
              type="text"
              placeholder={b.selectTime}
              className="w-full text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent pt-0.5"
            />
          </div>
          <ChevronIcon />
        </div>

        {/* Helper Text */}
        <p className="text-[11px] text-gray-500 pt-0.5">
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