import * as React from "react";

interface VehicleVectorProps {
  className?: string;
}

/**
 * High-fidelity 2D side-profile vector illustrations
 * precisely matching the style from image 0 (Dubai fleet list).
 */

export function StandardSedanSvg({ className = "w-36 h-12" }: VehicleVectorProps) {
  return (
    <svg viewBox="0 0 160 55" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Shadow */}
      <ellipse cx="80" cy="48" rx="66" ry="3" fill="#000000" fillOpacity="0.4" />
      {/* Car Body */}
      <path
        d="M 10 38 L 18 36 L 42 35 L 56 22 L 102 22 L 126 34 L 146 35 L 148 41 L 138 42 L 130 42 C 128 36 116 36 114 42 L 56 42 C 54 36 42 36 40 42 L 12 42 Z"
        fill="#3a424b"
      />
      {/* Windows */}
      <path
        d="M 58 23.5 L 77 23.5 L 77 34 L 45 34 Z"
        fill="#5d6977"
      />
      <path
        d="M 80 23.5 L 99 23.5 L 118 34 L 80 34 Z"
        fill="#5d6977"
      />
      {/* Front & Rear Lights */}
      <rect x="10" y="37" width="3" height="2" rx="1" fill="#f8fafc" fillOpacity="0.8" />
      <rect x="146" y="36" width="2.5" height="3" rx="0.5" fill="#ef4444" fillOpacity="0.9" />
      {/* Door Seam */}
      <line x1="78.5" y1="23.5" x2="78.5" y2="41" stroke="#2c333a" strokeWidth="1" />
      {/* Wheels */}
      {/* Front Wheel */}
      <circle cx="48" cy="42" r="9" fill="#181c20" />
      <circle cx="48" cy="42" r="5.5" fill="#47525d" />
      <circle cx="48" cy="42" r="2.5" fill="#a0abb6" />
      {/* Rear Wheel */}
      <circle cx="122" cy="42" r="9" fill="#181c20" />
      <circle cx="122" cy="42" r="5.5" fill="#47525d" />
      <circle cx="122" cy="42" r="2.5" fill="#a0abb6" />
    </svg>
  );
}

export function BusinessSedanSvg({ className = "w-36 h-12" }: VehicleVectorProps) {
  return (
    <svg viewBox="0 0 165 55" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Shadow */}
      <ellipse cx="82" cy="48" rx="70" ry="3" fill="#000000" fillOpacity="0.4" />
      {/* Longer executive body */}
      <path
        d="M 8 38 L 16 36 L 42 35 L 58 20 L 108 20 L 132 33 L 152 35 L 154 41 L 144 42 L 136 42 C 134 36 122 36 120 42 L 56 42 C 54 36 42 36 40 42 L 10 42 Z"
        fill="#343b44"
      />
      {/* Executive Windows (3 segments) */}
      <path
        d="M 60 21.5 L 78 21.5 L 78 33.5 L 46 33.5 Z"
        fill="#556270"
      />
      <path
        d="M 81 21.5 L 104 21.5 L 104 33.5 L 81 33.5 Z"
        fill="#556270"
      />
      <path
        d="M 106 21.5 L 112 21.5 L 126 33.5 L 106 33.5 Z"
        fill="#556270"
      />
      {/* Chrome accent line */}
      <line x1="45" y1="34" x2="128" y2="34" stroke="#717f8f" strokeWidth="0.8" />
      {/* Front & Rear Lights */}
      <rect x="8" y="37" width="3.5" height="2" rx="1" fill="#f8fafc" fillOpacity="0.9" />
      <rect x="152" y="36" width="2.5" height="3" rx="0.5" fill="#ef4444" fillOpacity="0.9" />
      {/* Wheels */}
      <circle cx="48" cy="42" r="9" fill="#181c20" />
      <circle cx="48" cy="42" r="5.5" fill="#47525d" />
      <circle cx="48" cy="42" r="2.5" fill="#a0abb6" />
      <circle cx="128" cy="42" r="9" fill="#181c20" />
      <circle cx="128" cy="42" r="5.5" fill="#47525d" />
      <circle cx="128" cy="42" r="2.5" fill="#a0abb6" />
    </svg>
  );
}

export function FirstClassSedanSvg({ className = "w-36 h-12" }: VehicleVectorProps) {
  return (
    <svg viewBox="0 0 170 55" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Shadow */}
      <ellipse cx="85" cy="48" rx="74" ry="3" fill="#000000" fillOpacity="0.45" />
      {/* Flagship LWB Body */}
      <path
        d="M 6 38 L 15 35.5 L 42 34.5 L 60 19 L 115 19 L 138 32 L 158 34.5 L 160 41 L 150 42 L 142 42 C 140 36 128 36 126 42 L 56 42 C 54 36 42 36 40 42 L 8 42 Z"
        fill="#2e353e"
      />
      {/* Flagship Windows with chrome frame */}
      <path
        d="M 62 20.5 L 81 20.5 L 81 33 L 47 33 Z"
        fill="#515d6a"
      />
      <path
        d="M 83.5 20.5 L 110 20.5 L 110 33 L 83.5 33 Z"
        fill="#515d6a"
      />
      <path
        d="M 112.5 20.5 L 120 20.5 L 134 33 L 112.5 33 Z"
        fill="#515d6a"
      />
      {/* Chrome window trim */}
      <path
        d="M 46 33 L 61 19.5 L 121 19.5 L 136 33"
        stroke="#8f9ca8"
        strokeWidth="0.8"
        fill="none"
      />
      {/* Chrome side accent strip */}
      <line x1="42" y1="39" x2="132" y2="39" stroke="#8f9ca8" strokeWidth="0.7" />
      {/* Front & Rear Lights */}
      <rect x="6" y="37" width="4" height="2" rx="1" fill="#f8fafc" />
      <rect x="158" y="35.5" width="2.5" height="3.5" rx="0.5" fill="#ef4444" />
      {/* Wheels */}
      <circle cx="48" cy="42" r="9" fill="#181c20" />
      <circle cx="48" cy="42" r="5.5" fill="#47525d" />
      <circle cx="48" cy="42" r="2.5" fill="#a0abb6" />
      <circle cx="134" cy="42" r="9" fill="#181c20" />
      <circle cx="134" cy="42" r="5.5" fill="#47525d" />
      <circle cx="134" cy="42" r="2.5" fill="#a0abb6" />
    </svg>
  );
}

export function ExecutiveSuvSvg({ className = "w-36 h-12" }: VehicleVectorProps) {
  return (
    <svg viewBox="0 0 165 55" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Shadow */}
      <ellipse cx="82" cy="49" rx="72" ry="3" fill="#000000" fillOpacity="0.45" />
      {/* Roof rails */}
      <line x1="62" y1="13" x2="135" y2="13" stroke="#4a5562" strokeWidth="1.2" />
      <line x1="70" y1="13" x2="70" y2="15" stroke="#4a5562" strokeWidth="1" />
      <line x1="125" y1="13" x2="125" y2="15" stroke="#4a5562" strokeWidth="1" />
      {/* SUV Tall Boxy Body */}
      <path
        d="M 8 36 L 12 34 L 40 33 L 56 15 L 140 15 L 144 38 L 144 42 L 136 42 C 134 35 120 35 118 42 L 56 42 C 54 35 40 35 38 42 L 10 42 Z"
        fill="#343c46"
      />
      {/* SUV Windows (4 blocks) */}
      <path d="M 58 17 L 76 17 L 76 31 L 46 31 Z" fill="#586573" />
      <path d="M 79 17 L 102 17 L 102 31 L 79 31 Z" fill="#586573" />
      <path d="M 105 17 L 126 17 L 126 31 L 105 31 Z" fill="#586573" />
      <path d="M 129 17 L 138 17 L 140 31 L 129 31 Z" fill="#586573" />
      {/* Front & Rear Lights */}
      <rect x="8" y="34" width="3.5" height="3" rx="0.8" fill="#f8fafc" />
      <rect x="142" y="31" width="2.5" height="4.5" rx="0.5" fill="#ef4444" />
      {/* Large SUV Wheels */}
      <circle cx="47" cy="42" r="10" fill="#181c20" />
      <circle cx="47" cy="42" r="6" fill="#47525d" />
      <circle cx="47" cy="42" r="2.8" fill="#a0abb6" />
      <circle cx="127" cy="42" r="10" fill="#181c20" />
      <circle cx="127" cy="42" r="6" fill="#47525d" />
      <circle cx="127" cy="42" r="2.8" fill="#a0abb6" />
    </svg>
  );
}

export function PremiumMpvSvg({ className = "w-36 h-12" }: VehicleVectorProps) {
  return (
    <svg viewBox="0 0 165 55" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Shadow */}
      <ellipse cx="82" cy="49" rx="72" ry="3" fill="#000000" fillOpacity="0.45" />
      {/* Aerodynamic MPV Body */}
      <path
        d="M 6 38 L 14 36 L 36 28 L 52 14 L 142 14 L 144 38 L 142 42 L 136 42 C 134 35 120 35 118 42 L 56 42 C 54 35 40 35 38 42 L 8 42 Z"
        fill="#323942"
      />
      {/* MPV Windows (flowing front windshield into long passenger glass) */}
      <path d="M 40 28 L 54 16 L 76 16 L 76 30 L 38 30 Z" fill="#586573" />
      <path d="M 79 16 L 106 16 L 106 30 L 79 30 Z" fill="#586573" />
      <path d="M 109 16 L 138 16 L 140 30 L 109 30 Z" fill="#586573" />
      {/* Sliding door guide rail */}
      <line x1="88" y1="33" x2="136" y2="33" stroke="#22272e" strokeWidth="1" />
      {/* Front & Rear Lights */}
      <rect x="6" y="36" width="3.5" height="2.5" rx="0.8" fill="#f8fafc" />
      <rect x="142" y="24" width="2.5" height="6" rx="0.5" fill="#ef4444" />
      {/* Wheels */}
      <circle cx="47" cy="42" r="9.5" fill="#181c20" />
      <circle cx="47" cy="42" r="5.8" fill="#47525d" />
      <circle cx="47" cy="42" r="2.5" fill="#a0abb6" />
      <circle cx="127" cy="42" r="9.5" fill="#181c20" />
      <circle cx="127" cy="42" r="5.8" fill="#47525d" />
      <circle cx="127" cy="42" r="2.5" fill="#a0abb6" />
    </svg>
  );
}

export function ExecutiveVanSvg({ className = "w-36 h-12" }: VehicleVectorProps) {
  return (
    <svg viewBox="0 0 170 55" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Shadow */}
      <ellipse cx="85" cy="49" rx="74" ry="3" fill="#000000" fillOpacity="0.45" />
      {/* Van Tall Upright Body */}
      <path
        d="M 6 40 L 12 37 L 28 35 L 42 12 L 148 12 L 150 40 L 146 42 L 140 42 C 138 35 122 35 120 42 L 56 42 C 54 35 38 35 36 42 L 8 42 Z"
        fill="#2f363f"
      />
      {/* Passenger Van Windows (large panoramic glass rows) */}
      <path d="M 30 35 L 44 14 L 62 14 L 62 30 L 26 30 Z" fill="#586573" />
      <path d="M 65 14 L 90 14 L 90 30 L 65 30 Z" fill="#586573" />
      <path d="M 93 14 L 118 14 L 118 30 L 93 30 Z" fill="#586573" />
      <path d="M 121 14 L 144 14 L 146 30 L 121 30 Z" fill="#586573" />
      {/* Sliding door guide rail */}
      <line x1="72" y1="33" x2="142" y2="33" stroke="#1e2329" strokeWidth="1" />
      {/* Front & Rear Lights */}
      <rect x="6" y="37" width="3.5" height="3" rx="0.8" fill="#f8fafc" />
      <rect x="148" y="20" width="2.5" height="8" rx="0.5" fill="#ef4444" />
      {/* Wheels */}
      <circle cx="46" cy="42" r="10" fill="#181c20" />
      <circle cx="46" cy="42" r="6" fill="#47525d" />
      <circle cx="46" cy="42" r="2.8" fill="#a0abb6" />
      <circle cx="130" cy="42" r="10" fill="#181c20" />
      <circle cx="130" cy="42" r="6" fill="#47525d" />
      <circle cx="130" cy="42" r="2.8" fill="#a0abb6" />
    </svg>
  );
}

export function getVehicleVector(categoryOrName: string, className?: string) {
  const key = categoryOrName.toLowerCase();
  if (key.includes("standard")) return <StandardSedanSvg className={className} />;
  if (key.includes("business")) return <BusinessSedanSvg className={className} />;
  if (key.includes("first") || key.includes("flagship")) return <FirstClassSedanSvg className={className} />;
  if (key.includes("suv")) return <ExecutiveSuvSvg className={className} />;
  if (key.includes("mpv")) return <PremiumMpvSvg className={className} />;
  if (key.includes("van") || key.includes("shuttle")) return <ExecutiveVanSvg className={className} />;
  return <BusinessSedanSvg className={className} />;
}

