import * as React from "react";

interface JeddahSkylineSvgProps {
  className?: string;
}

export default function JeddahSkylineSvg({ className = "" }: JeddahSkylineSvgProps) {
  return (
    <svg
      viewBox="0 0 520 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Ground / Water baseline */}
      <line x1="0" y1="210" x2="520" y2="210" stroke="white" strokeOpacity="0.4" strokeWidth="1" />

      {/* Historic Al Balad coral-stone house with traditional Rawasheen wooden lattice balcony */}
      <path
        d="M 25 210 L 25 150 L 55 150 L 55 210"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="1"
        fill="none"
      />
      {/* Rawasheen protruding balcony */}
      <rect x="32" y="160" width="16" height="24" stroke="white" strokeOpacity="0.45" strokeWidth="0.9" fill="none" />
      <line x1="32" y1="172" x2="48" y2="172" stroke="white" strokeOpacity="0.3" strokeWidth="0.8" />
      <line x1="40" y1="160" x2="40" y2="184" stroke="white" strokeOpacity="0.3" strokeWidth="0.8" />

      {/* ── KING FAHD FOUNTAIN (World's Tallest Water Fountain, Center-Left) ── */}
      {/* Central jet column rising up to sky */}
      <line x1="85" y1="210" x2="85" y2="25" stroke="white" strokeOpacity="0.55" strokeWidth="1.5" />
      {/* Water spray plume curves */}
      <path d="M 85 45 C 75 70 70 120 68 210" stroke="white" strokeOpacity="0.35" strokeWidth="0.9" fill="none" />
      <path d="M 85 45 C 95 70 100 120 102 210" stroke="white" strokeOpacity="0.35" strokeWidth="0.9" fill="none" />
      <path d="M 85 80 C 78 110 74 160 72 210" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" strokeDasharray="3 3" fill="none" />
      <path d="M 85 80 C 92 110 96 160 98 210" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" strokeDasharray="3 3" fill="none" />
      <circle cx="85" cy="25" r="2" fill="white" fillOpacity="0.7" />

      {/* Mid-rise coastal resort tower */}
      <path
        d="M 120 210 L 120 135 L 145 135 L 145 210"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="1"
        fill="none"
      />
      <line x1="120" y1="160" x2="145" y2="160" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />
      <line x1="120" y1="185" x2="145" y2="185" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />

      {/* ── MAKKAH CLOCK ROYAL TOWER (Abraj Al Bait Silhouette) ── */}
      <path
        d="M 165 210 L 165 80 L 175 60 L 195 60 L 205 80 L 205 210"
        stroke="white"
        strokeOpacity="0.5"
        strokeWidth="1.2"
        fill="none"
      />
      {/* Massive Clock Face */}
      <circle cx="185" cy="100" r="14" stroke="white" strokeOpacity="0.65" strokeWidth="1.2" fill="none" />
      <circle cx="185" cy="100" r="4" stroke="white" strokeOpacity="0.5" strokeWidth="0.8" fill="none" />
      {/* Clock hands */}
      <line x1="185" y1="100" x2="185" y2="90" stroke="white" strokeOpacity="0.7" strokeWidth="1" />
      <line x1="185" y1="100" x2="192" y2="100" stroke="white" strokeOpacity="0.7" strokeWidth="1" />
      {/* Crescent Spire on Top */}
      <line x1="185" y1="60" x2="185" y2="28" stroke="white" strokeOpacity="0.6" strokeWidth="1.2" />
      <circle cx="185" cy="25" r="3.5" stroke="white" strokeOpacity="0.7" strokeWidth="1" fill="none" />

      {/* Jeddah Corniche Corporate Tower */}
      <path
        d="M 220 210 L 220 120 L 245 95 L 255 95 L 255 210"
        stroke="white"
        strokeOpacity="0.4"
        strokeWidth="1"
        fill="none"
      />
      <line x1="220" y1="150" x2="255" y2="150" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />

      {/* ── JEDDAH TOWER / KINGDOM TOWER (Hyper-Tall Megatall Centerpiece) ── */}
      {/* Slender tapered aerodynamic tri-wing tower */}
      <path
        d="M 275 210 L 292 70 L 297 30 L 299 10 L 301 10 L 303 30 L 308 70 L 325 210"
        stroke="white"
        strokeOpacity="0.6"
        strokeWidth="1.2"
        fill="none"
      />
      {/* Pinnacle Spire needle */}
      <line x1="300" y1="10" x2="300" y2="2" stroke="white" strokeOpacity="0.75" strokeWidth="1.2" />
      <circle cx="300" cy="2" r="1.5" fill="white" fillOpacity="0.8" />
      {/* Sky terrace cantilever circular disc */}
      <ellipse cx="300" cy="90" rx="14" ry="4" stroke="white" strokeOpacity="0.5" strokeWidth="1" fill="none" />
      {/* Vertical center spine */}
      <line x1="300" y1="210" x2="300" y2="10" stroke="white" strokeOpacity="0.3" strokeWidth="0.8" />
      <line x1="285" y1="140" x2="315" y2="140" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" />
      <line x1="290" y1="110" x2="310" y2="110" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" />

      {/* Islamic Archway Gateway Landmark */}
      <path
        d="M 345 210 L 345 130 Q 365 105 385 130 L 385 210"
        stroke="white"
        strokeOpacity="0.45"
        strokeWidth="1.1"
        fill="none"
      />
      <path
        d="M 353 210 L 353 145 Q 365 125 377 145 L 377 210"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="0.9"
        fill="none"
      />

      {/* Waterfront tiered high-rise (Red Sea Corniche) */}
      <path
        d="M 405 210 L 405 135 L 420 115 L 435 115 L 435 210"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="1"
        fill="none"
      />
      <line x1="420" y1="115" x2="420" y2="95" stroke="white" strokeOpacity="0.4" strokeWidth="1" />
      <line x1="405" y1="160" x2="435" y2="160" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />

      {/* Modern Jeddah waterfront high-rises (Right) */}
      <path
        d="M 450 210 L 450 140 L 475 140 L 475 210"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M 488 210 L 488 155 L 512 155 L 512 210"
        stroke="white"
        strokeOpacity="0.3"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}

