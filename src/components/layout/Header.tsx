"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/app/[lang]/dictionaries";

interface HeaderProps {
  lang: Locale;
}

export default function Header({ lang }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed w-full bg-abBlack/95 backdrop-blur-md border-b border-gray-800 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href={`/${lang}`} className="text-white text-2xl font-bold tracking-widest uppercase">
              AB<span className="text-abGold">.Limo</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6 items-center">
            {/* Event Logistics Mega Menu */}
            <div className="relative group mega-menu h-20 flex items-center">
              <button className="text-gray-300 hover:text-abGold font-medium flex items-center transition-colors text-sm">
                Event Logistics <i className="fa-solid fa-chevron-down ml-1.5 text-[10px]"></i>
              </button>
              <div className="absolute top-20 left-0 w-[600px] bg-white shadow-2xl rounded-b-xl opacity-0 invisible mega-menu-content grid grid-cols-2 p-6 gap-6 border-t-[3px] border-abGold">
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Event Management</h4>
                  <ul className="space-y-3">
                    <li><a href="#" className="text-sm font-semibold text-gray-900 hover:text-abGold block">Transport Control Room Services</a></li>
                    <li><a href="#" className="text-sm font-semibold text-gray-900 hover:text-abGold block">Route & Delivery Scheduling</a></li>
                    <li><a href="#" className="text-sm font-semibold text-gray-900 hover:text-abGold block">Traffic & On-Site Parking Mgt</a></li>
                    <li><a href="#" className="text-sm font-semibold text-gray-900 hover:text-abGold block">Post-Event Passenger Analytics</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Group Mobility</h4>
                  <ul className="space-y-3">
                    <li><a href="#" className="text-sm font-semibold text-gray-900 hover:text-abGold block">VIP Coach Services</a></li>
                    <li><a href="#" className="text-sm font-semibold text-gray-900 hover:text-abGold block">Exhibition Shuttle Operations</a></li>
                    <li><a href="#" className="text-sm font-semibold text-gray-900 hover:text-abGold block">Artist & VIP Guest Transport</a></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Corporate Solutions Mega Menu */}
            <div className="relative group mega-menu h-20 flex items-center">
              <button className="text-gray-300 hover:text-abGold font-medium flex items-center transition-colors text-sm">
                Corporate Tech <i className="fa-solid fa-chevron-down ml-1.5 text-[10px]"></i>
              </button>
              <div className="absolute top-20 left-0 w-[500px] bg-white shadow-2xl rounded-b-xl opacity-0 invisible mega-menu-content grid grid-cols-2 p-6 gap-6 border-t-[3px] border-abGold">
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Enterprise Accounts</h4>
                  <ul className="space-y-3">
                    <li><a href="#" className="text-sm font-semibold text-gray-900 hover:text-abGold block">Centralized Billing & Invoicing</a></li>
                    <li><a href="#" className="text-sm font-semibold text-gray-900 hover:text-abGold block">SAP Concur Integration</a></li>
                    <li><a href="#" className="text-sm font-semibold text-gray-900 hover:text-abGold block">Executive Commuter Programs</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Duty of Care</h4>
                  <ul className="space-y-3">
                    <li><a href="#" className="text-sm font-semibold text-gray-900 hover:text-abGold block">Safety Standards & Protocols</a></li>
                    <li><a href="#" className="text-sm font-semibold text-gray-900 hover:text-abGold block">Live GPS Tracking (ITS)</a></li>
                    <li><a href="#" className="text-sm font-semibold text-gray-900 hover:text-abGold block">Defensive Driving Certifications</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <a href="#" className="text-gray-300 hover:text-abGold font-medium transition-colors text-sm">Industries</a>
            <a href="#fleet" className="text-gray-300 hover:text-abGold font-medium transition-colors text-sm">Our Fleet</a>
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-5">
            <a href="#" className="text-xs font-medium text-gray-400 hover:text-white transition-colors">Chauffeur Partner Portal</a>
            <a href="#" className="bg-transparent border border-abGold text-abGold hover:bg-abGold hover:text-white px-5 py-2 rounded text-sm font-semibold transition-colors">
              Enterprise Login
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              className="text-gray-300 hover:text-white focus:outline-none"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <i className="fa-solid fa-bars text-2xl"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
