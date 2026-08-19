import Link from "next/link";
import type { Locale } from "@/app/[lang]/dictionaries";

interface FooterProps {
  lang: Locale;
}

export default function Footer({ lang }: FooterProps) {
  return (
    <footer className="bg-abBlack text-white pt-20 pb-8 border-t-[4px] border-abGold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          
          <div className="lg:col-span-2 pr-8">
            <Link href={`/${lang}`} className="text-3xl font-bold tracking-widest uppercase block mb-6">
              AB<span className="text-abGold">.Limo</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              The definitive authority in B2B mobility, corporate travel, and large-scale event logistics across the GCC. Delivering the science of transportation to global enterprises.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-abGold hover:text-white transition-colors">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-abGold hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3m.08 4h.01" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wider mb-6">Event & Group</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-abGold transition-colors">Event Transport Management</a></li>
              <li><a href="#" className="hover:text-abGold transition-colors">Executive Bus Charter</a></li>
              <li><a href="#" className="hover:text-abGold transition-colors">Exhibition Shuttles</a></li>
              <li><a href="#" className="hover:text-abGold transition-colors">Route Planning Services</a></li>
              <li><a href="#" className="hover:text-abGold transition-colors">Sports Event Transport</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wider mb-6">Corporate Mobility</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-abGold transition-colors">As-Directed Services</a></li>
              <li><a href="#" className="hover:text-abGold transition-colors">Corporate Accounts</a></li>
              <li><a href="#" className="hover:text-abGold transition-colors">Staff Shuttle Services</a></li>
              <li><a href="#" className="hover:text-abGold transition-colors">Executive Protection</a></li>
              <li><a href="#" className="hover:text-abGold transition-colors">Duty of Care Standards</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wider mb-6">Global Hubs</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-white transition-colors">Riyadh (RUH)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Jeddah (JED)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Dubai (DXB)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Abu Dhabi (AUH)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Doha (DOH)</a></li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-xs">
            &copy; 2026 Arabian Bespoke (AB.Limo). All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-xs text-gray-600">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Corporate Legal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
