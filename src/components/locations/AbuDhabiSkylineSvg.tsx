import * as React from "react";

interface AbuDhabiSkylineSvgProps {
  className?: string;
}

export default function AbuDhabiSkylineSvg({ className = "" }: AbuDhabiSkylineSvgProps) {
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

      {/* Sheikh Zayed Grand Mosque minaret silhouette (left) */}
      <path
        d="M 22 210 L 25 110 L 28 110 L 31 210"
        stroke="white"
        strokeOpacity="0.4"
        strokeWidth="1"
        fill="none"
      />
      <line x1="26.5" y1="110" x2="26.5" y2="85" stroke="white" strokeOpacity="0.45" strokeWidth="1" />
      <circle cx="26.5" cy="85" r="1.5" fill="white" fillOpacity="0.6" />
      {/* Grand Mosque Dome */}
      <path
        d="M 38 210 L 38 175 Q 52 145 66 175 L 66 210"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="1"
        fill="none"
      />
      <line x1="52" y1="150" x2="52" y2="135" stroke="white" strokeOpacity="0.4" strokeWidth="0.9" />

      {/* ── ALDAR HEADQUARTERS (World-famous Circular Coin Skyscraper) ── */}
      <circle cx="100" cy="145" r="32" stroke="white" strokeOpacity="0.55" strokeWidth="1.2" fill="none" />
      <circle cx="100" cy="145" r="18" stroke="white" strokeOpacity="0.3" strokeWidth="0.8" fill="none" />
      {/* Structural diagrid facets */}
      <line x1="72" y1="145" x2="128" y2="145" stroke="white" strokeOpacity="0.3" strokeWidth="0.8" />
      <line x1="100" y1="113" x2="100" y2="177" stroke="white" strokeOpacity="0.3" strokeWidth="0.8" />

      {/* Capital Gate (The Leaning Tower of Abu Dhabi, leaning right) */}
      <path
        d="M 145 210 Q 155 130 175 80 L 195 85 Q 175 135 165 210"
        stroke="white"
        strokeOpacity="0.45"
        strokeWidth="1.1"
        fill="none"
      />
      <line x1="155" y1="130" x2="182" y2="137" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />
      <line x1="162" y1="170" x2="172" y2="174" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />

      {/* ── ETIHAD TOWERS CLUSTER (The Iconic Sweeping Towers of Corniche) ── */}
      {/* Tower 1 (Tower 2 - Tallest 305m) */}
      <path
        d="M 210 210 L 210 55 Q 225 35 232 55 L 232 210"
        stroke="white"
        strokeOpacity="0.55"
        strokeWidth="1.2"
        fill="none"
      />
      <line x1="221" y1="38" x2="221" y2="18" stroke="white" strokeOpacity="0.6" strokeWidth="1.2" />
      <circle cx="221" cy="18" r="1.5" fill="white" fillOpacity="0.7" />
      <line x1="210" y1="100" x2="232" y2="100" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" />
      <line x1="210" y1="150" x2="232" y2="150" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" />

      {/* Tower 2 (Tower 1 - 277m) */}
      <path
        d="M 238 210 L 238 75 Q 250 55 258 75 L 258 210"
        stroke="white"
        strokeOpacity="0.5"
        strokeWidth="1.1"
        fill="none"
      />
      <line x1="248" y1="58" x2="248" y2="38" stroke="white" strokeOpacity="0.55" strokeWidth="1" />
      <line x1="238" y1="115" x2="258" y2="115" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />
      <line x1="238" y1="160" x2="258" y2="160" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />

      {/* Tower 3 (Tower 3 - 260m) */}
      <path
        d="M 264 210 L 264 90 Q 275 72 282 90 L 282 210"
        stroke="white"
        strokeOpacity="0.45"
        strokeWidth="1"
        fill="none"
      />

      {/* ── ADNOC HEADQUARTERS TOWER (342m Monolith with Cut-Out Portal Window Top) ── */}
      {/* Main rectangular pillar */}
      <path
        d="M 298 210 L 298 35 L 332 35 L 332 210"
        stroke="white"
        strokeOpacity="0.6"
        strokeWidth="1.2"
        fill="none"
      />
      {/* The dramatic open hollow rectangular portal at the top */}
      <rect x="306" y="48" width="18" height="26" stroke="white" strokeOpacity="0.6" strokeWidth="1.1" fill="none" />
      {/* Center vertical seam */}
      <line x1="315" y1="74" x2="315" y2="210" stroke="white" strokeOpacity="0.3" strokeWidth="0.8" />
      <line x1="298" y1="120" x2="332" y2="120" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" />
      <line x1="298" y1="165" x2="332" y2="165" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" />

      {/* World Trade Center Abu Dhabi (Burj Mohammed Bin Rashid - 381m sloped roof tower) */}
      <path
        d="M 348 210 L 348 70 L 372 25 L 372 210"
        stroke="white"
        strokeOpacity="0.55"
        strokeWidth="1.2"
        fill="none"
      />
      <line x1="372" y1="25" x2="372" y2="10" stroke="white" strokeOpacity="0.6" strokeWidth="1.2" />
      <circle cx="372" cy="10" r="1.5" fill="white" fillOpacity="0.7" />
      <line x1="348" y1="105" x2="372" y2="105" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />
      <line x1="348" y1="150" x2="372" y2="150" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />

      {/* Al Maryah Island Financial Towers */}
      <path
        d="M 388 210 L 388 120 L 415 120 L 415 210"
        stroke="white"
        strokeOpacity="0.4"
        strokeWidth="1"
        fill="none"
      />
      <line x1="388" y1="155" x2="415" y2="155" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />

      {/* Saadiyat / Corniche modern high-rises (Right) */}
      <path
        d="M 430 210 L 430 135 L 458 115 L 465 115 L 465 210"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M 480 210 L 480 150 L 510 150 L 510 210"
        stroke="white"
        strokeOpacity="0.3"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}

