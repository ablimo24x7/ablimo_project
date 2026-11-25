import * as React from "react";

interface KhobarSkylineSvgProps {
  className?: string;
}

export default function KhobarSkylineSvg({ className = "" }: KhobarSkylineSvgProps) {
  return (
    <svg
      viewBox="0 0 520 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Ground baseline */}
      <line x1="0" y1="210" x2="520" y2="210" stroke="white" strokeOpacity="0.4" strokeWidth="1" />

      {/* King Fahd Causeway suspension cables silhouette (far left) */}
      <line x1="10" y1="210" x2="40" y2="150" stroke="white" strokeOpacity="0.3" strokeWidth="1" />
      <line x1="40" y1="150" x2="40" y2="210" stroke="white" strokeOpacity="0.4" strokeWidth="1.2" />
      <line x1="40" y1="150" x2="70" y2="210" stroke="white" strokeOpacity="0.3" strokeWidth="1" />
      <line x1="20" y1="190" x2="40" y2="160" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />
      <line x1="60" y1="190" x2="40" y2="160" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />

      {/* Low-rise coastal marina buildings */}
      <path
        d="M 85 210 L 85 165 L 115 165 L 115 210"
        stroke="white"
        strokeOpacity="0.3"
        strokeWidth="1"
        fill="none"
      />
      <line x1="85" y1="185" x2="115" y2="185" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />

      {/* ── AL KHOBAR WATER TOWER (Iconic Waterfront Beacon) ── */}
      {/* Slender shaft */}
      <path
        d="M 138 210 L 142 110 L 146 110 L 150 210"
        stroke="white"
        strokeOpacity="0.45"
        strokeWidth="1"
        fill="none"
      />
      {/* Spherical bulb / revolving restaurant */}
      <ellipse cx="144" cy="100" rx="15" ry="10" stroke="white" strokeOpacity="0.6" strokeWidth="1.2" fill="none" />
      <line x1="129" y1="100" x2="159" y2="100" stroke="white" strokeOpacity="0.3" strokeWidth="0.8" />
      {/* Pinnacle spire */}
      <line x1="144" y1="90" x2="144" y2="55" stroke="white" strokeOpacity="0.6" strokeWidth="1.1" />
      <circle cx="144" cy="55" r="1.5" fill="white" fillOpacity="0.7" />

      {/* Corporate high-rise */}
      <path
        d="M 172 210 L 172 130 L 198 130 L 198 210"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="1"
        fill="none"
      />
      <line x1="172" y1="155" x2="198" y2="155" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />
      <line x1="172" y1="180" x2="198" y2="180" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />

      {/* ── ITHRA (King Abdulaziz Center for World Culture - Dhahran) ── */}
      {/* 1. Main Great Tower (Curving, leaning monolithic pebble tower) */}
      <path
        d="M 218 210 C 220 140 225 60 250 35 C 265 35 272 55 270 120 L 270 210"
        stroke="white"
        strokeOpacity="0.6"
        strokeWidth="1.2"
        fill="none"
      />
      {/* Horizontal stainless steel tube wrapping bands */}
      <path d="M 224 165 Q 248 160 270 165" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" fill="none" />
      <path d="M 228 125 Q 250 120 270 125" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" fill="none" />
      <path d="M 235 85 Q 252 80 268 85" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" fill="none" />
      <line x1="250" y1="35" x2="250" y2="18" stroke="white" strokeOpacity="0.55" strokeWidth="1" />
      <circle cx="250" cy="18" r="1.5" fill="white" fillOpacity="0.7" />

      {/* 2. Ithra Pebble Pavilion (Adjacent rounded boulder shape) */}
      <path
        d="M 270 210 C 270 160 280 120 305 120 C 330 120 335 160 335 210"
        stroke="white"
        strokeOpacity="0.5"
        strokeWidth="1.1"
        fill="none"
      />
      <path d="M 275 165 Q 305 158 330 165" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" fill="none" />

      {/* Al Khobar Corniche modern corporate skyscraper */}
      <path
        d="M 350 210 L 350 90 L 370 70 L 380 70 L 380 210"
        stroke="white"
        strokeOpacity="0.45"
        strokeWidth="1.1"
        fill="none"
      />
      <line x1="375" y1="70" x2="375" y2="48" stroke="white" strokeOpacity="0.5" strokeWidth="1" />
      <line x1="350" y1="130" x2="380" y2="130" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />
      <line x1="350" y1="170" x2="380" y2="170" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />

      {/* Dammam Twin Port Towers */}
      <path
        d="M 398 210 L 398 115 L 420 90 L 428 90 L 428 210"
        stroke="white"
        strokeOpacity="0.4"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M 436 210 L 436 125 L 458 100 L 466 100 L 466 210"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="1"
        fill="none"
      />

      {/* Jubail Industrial & Coastal edge (Right) */}
      <path
        d="M 480 210 L 480 145 L 510 145 L 510 210"
        stroke="white"
        strokeOpacity="0.3"
        strokeWidth="1"
        fill="none"
      />
      <line x1="480" y1="175" x2="510" y2="175" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />
    </svg>
  );
}

