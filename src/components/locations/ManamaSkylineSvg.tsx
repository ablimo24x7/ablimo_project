import * as React from "react";

interface ManamaSkylineSvgProps {
  className?: string;
}

export default function ManamaSkylineSvg({ className = "" }: ManamaSkylineSvgProps) {
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

      {/* Al Fateh Grand Mosque Dome & Minaret Silhouette (left) */}
      <path
        d="M 25 210 L 25 140 L 32 120 L 39 140 L 39 210"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="1"
        fill="none"
      />
      <line x1="32" y1="120" x2="32" y2="105" stroke="white" strokeOpacity="0.4" strokeWidth="1" />
      {/* Mosque Dome */}
      <path
        d="M 45 210 L 45 180 Q 60 155 75 180 L 75 210"
        stroke="white"
        strokeOpacity="0.3"
        strokeWidth="1"
        fill="none"
      />

      {/* Seef District corporate high-rise */}
      <path
        d="M 90 210 L 90 145 L 115 145 L 115 210"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="1"
        fill="none"
      />
      <line x1="90" y1="170" x2="115" y2="170" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />

      {/* ── BAHRAIN FINANCIAL HARBOUR (BFH Dual Towers) ── */}
      {/* Tower 1 (West) */}
      <path
        d="M 130 210 L 130 60 L 140 45 L 155 45 L 160 60 L 160 210"
        stroke="white"
        strokeOpacity="0.45"
        strokeWidth="1.1"
        fill="none"
      />
      <line x1="147.5" y1="45" x2="147.5" y2="30" stroke="white" strokeOpacity="0.5" strokeWidth="1" />
      <line x1="130" y1="110" x2="160" y2="110" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />
      <line x1="130" y1="160" x2="160" y2="160" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />

      {/* Linking Harbour Gateway base */}
      <path
        d="M 160 210 L 160 175 L 175 175 L 175 210"
        stroke="white"
        strokeOpacity="0.3"
        strokeWidth="0.9"
        fill="none"
      />

      {/* Tower 2 (East) */}
      <path
        d="M 175 210 L 175 60 L 180 45 L 195 45 L 205 60 L 205 210"
        stroke="white"
        strokeOpacity="0.45"
        strokeWidth="1.1"
        fill="none"
      />
      <line x1="187.5" y1="45" x2="187.5" y2="30" stroke="white" strokeOpacity="0.5" strokeWidth="1" />
      <line x1="175" y1="110" x2="205" y2="110" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />
      <line x1="175" y1="160" x2="205" y2="160" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />

      {/* Mid-rise financial office */}
      <path
        d="M 220 210 L 220 135 L 245 135 L 245 210"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="1"
        fill="none"
      />
      <line x1="220" y1="165" x2="245" y2="165" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />

      {/* ── BAHRAIN WORLD TRADE CENTER (BWTC - Famous Twin Sail Towers with Wind Turbines) ── */}
      {/* Sail Tower 1 (Left curved aerofoil sail) */}
      <path
        d="M 265 210 L 265 40 Q 285 40 300 120 L 300 210"
        stroke="white"
        strokeOpacity="0.55"
        strokeWidth="1.2"
        fill="none"
      />
      <line x1="265" y1="40" x2="265" y2="15" stroke="white" strokeOpacity="0.6" strokeWidth="1.2" />
      <circle cx="265" cy="15" r="1.5" fill="white" fillOpacity="0.7" />

      {/* Sail Tower 2 (Right curved aerofoil sail, mirroring) */}
      <path
        d="M 335 210 L 335 40 Q 315 40 300 120 L 300 210"
        stroke="white"
        strokeOpacity="0.55"
        strokeWidth="1.2"
        fill="none"
      />
      <line x1="335" y1="40" x2="335" y2="15" stroke="white" strokeOpacity="0.6" strokeWidth="1.2" />
      <circle cx="335" cy="15" r="1.5" fill="white" fillOpacity="0.7" />

      {/* 3 Skybridges with Wind Turbines between the sails */}
      {/* Skybridge 1 (Top) */}
      <line x1="275" y1="75" x2="325" y2="75" stroke="white" strokeOpacity="0.5" strokeWidth="1.2" />
      <circle cx="300" cy="75" r="4.5" stroke="white" strokeOpacity="0.65" strokeWidth="1" fill="none" />
      <line x1="300" y1="71" x2="300" y2="79" stroke="white" strokeOpacity="0.7" strokeWidth="0.9" />

      {/* Skybridge 2 (Middle) */}
      <line x1="282" y1="110" x2="318" y2="110" stroke="white" strokeOpacity="0.5" strokeWidth="1.2" />
      <circle cx="300" cy="110" r="4.5" stroke="white" strokeOpacity="0.65" strokeWidth="1" fill="none" />
      <line x1="300" y1="106" x2="300" y2="114" stroke="white" strokeOpacity="0.7" strokeWidth="0.9" />

      {/* Skybridge 3 (Lower) */}
      <line x1="288" y1="145" x2="312" y2="145" stroke="white" strokeOpacity="0.5" strokeWidth="1.2" />
      <circle cx="300" cy="145" r="4.5" stroke="white" strokeOpacity="0.65" strokeWidth="1" fill="none" />
      <line x1="300" y1="141" x2="300" y2="149" stroke="white" strokeOpacity="0.7" strokeWidth="0.9" />

      {/* NBB Tower (Stepped financial tower) */}
      <path
        d="M 355 210 L 355 110 L 370 85 L 385 85 L 385 210"
        stroke="white"
        strokeOpacity="0.4"
        strokeWidth="1"
        fill="none"
      />
      <line x1="370" y1="85" x2="370" y2="65" stroke="white" strokeOpacity="0.4" strokeWidth="1" />
      <line x1="355" y1="145" x2="385" y2="145" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />

      {/* Diplomatic Area corporate building */}
      <path
        d="M 402 210 L 402 125 L 430 125 L 430 210"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="1"
        fill="none"
      />
      <line x1="402" y1="160" x2="430" y2="160" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />

      {/* Four Seasons Hotel Bahrain Bay (Iconic H-frame monolith) */}
      <path
        d="M 448 210 L 448 85 L 458 85 L 458 210"
        stroke="white"
        strokeOpacity="0.45"
        strokeWidth="1.1"
        fill="none"
      />
      <path
        d="M 478 210 L 478 85 L 488 85 L 488 210"
        stroke="white"
        strokeOpacity="0.45"
        strokeWidth="1.1"
        fill="none"
      />
      {/* Suspended cantilever sky-pod */}
      <rect x="442" y="115" width="52" height="22" stroke="white" strokeOpacity="0.5" strokeWidth="1" fill="none" />

      {/* Waterfront boundary (far right) */}
      <path
        d="M 502 210 L 502 165 L 518 165 L 518 210"
        stroke="white"
        strokeOpacity="0.3"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}

