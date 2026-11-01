import * as React from "react";

interface RiyadhSkylineSvgProps {
  className?: string;
}

export default function RiyadhSkylineSvg({ className = "" }: RiyadhSkylineSvgProps) {
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

      {/* Low-rise modern structures (far left) */}
      <path
        d="M 20 210 L 20 175 L 45 175 L 45 210"
        stroke="white"
        strokeOpacity="0.3"
        strokeWidth="1"
        fill="none"
      />
      <line x1="20" y1="190" x2="45" y2="190" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />

      {/* Al Faisaliah Tower (left-center iconic pyramid with sphere) */}
      {/* Main tapered pyramid sides */}
      <path
        d="M 80 210 L 125 45 L 170 210"
        stroke="white"
        strokeOpacity="0.45"
        strokeWidth="1.2"
        fill="none"
      />
      {/* Central spine */}
      <line x1="125" y1="45" x2="125" y2="210" stroke="white" strokeOpacity="0.3" strokeWidth="0.8" strokeDasharray="3 3" />
      {/* Golden sphere / globe near top */}
      <circle cx="125" cy="85" r="11" stroke="white" strokeOpacity="0.6" strokeWidth="1" fill="none" />
      <circle cx="125" cy="85" r="5" stroke="white" strokeOpacity="0.35" strokeWidth="0.8" fill="none" />
      {/* Pinnacle spire */}
      <line x1="125" y1="45" x2="125" y2="20" stroke="white" strokeOpacity="0.5" strokeWidth="1" />
      <circle cx="125" cy="20" r="1.5" fill="white" fillOpacity="0.6" />
      {/* Horizontal bands */}
      <line x1="94" y1="160" x2="156" y2="160" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" />
      <line x1="108" y1="120" x2="142" y2="120" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" />
      <line x1="117" y1="96" x2="133" y2="96" stroke="white" strokeOpacity="0.3" strokeWidth="0.8" />

      {/* Modern KAFD Business Tower (center-left) */}
      <path
        d="M 185 210 L 185 110 L 220 95 L 220 210"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="1"
        fill="none"
      />
      <line x1="185" y1="140" x2="220" y2="130" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />
      <line x1="185" y1="175" x2="220" y2="165" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />

      {/* Al Majdoul Twisted Tower */}
      <path
        d="M 235 210 Q 230 140 245 85 L 265 85 Q 255 140 270 210"
        stroke="white"
        strokeOpacity="0.4"
        strokeWidth="1"
        fill="none"
      />
      <line x1="235" y1="170" x2="268" y2="170" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />
      <line x1="237" y1="130" x2="260" y2="130" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />

      {/* Kingdom Centre (center-right prominent tower with arched cutout & skybridge) */}
      {/* Left pillar */}
      <path
        d="M 310 210 L 310 60 C 310 35 325 22 345 22"
        stroke="white"
        strokeOpacity="0.5"
        strokeWidth="1.2"
        fill="none"
      />
      {/* Right pillar */}
      <path
        d="M 380 210 L 380 60 C 380 35 365 22 345 22"
        stroke="white"
        strokeOpacity="0.5"
        strokeWidth="1.2"
        fill="none"
      />
      {/* Inner parabolic arch cutout */}
      <path
        d="M 326 60 C 326 40 335 32 345 32 C 355 32 364 40 364 60"
        stroke="white"
        strokeOpacity="0.5"
        strokeWidth="1"
        fill="none"
      />
      {/* Sky Bridge across top cutout */}
      <line x1="334" y1="26" x2="356" y2="26" stroke="white" strokeOpacity="0.7" strokeWidth="1.5" />
      <line x1="330" y1="30" x2="360" y2="30" stroke="white" strokeOpacity="0.4" strokeWidth="0.8" />
      {/* Vertical contour lines */}
      <line x1="326" y1="60" x2="326" y2="210" stroke="white" strokeOpacity="0.3" strokeWidth="0.8" />
      <line x1="364" y1="60" x2="364" y2="210" stroke="white" strokeOpacity="0.3" strokeWidth="0.8" />
      {/* Horizontal floor grid lines */}
      <line x1="310" y1="100" x2="380" y2="100" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />
      <line x1="310" y1="135" x2="380" y2="135" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />
      <line x1="310" y1="170" x2="380" y2="170" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />

      {/* PIF Tower / KAFD Diamond Facets (right) */}
      <path
        d="M 405 210 L 415 65 L 440 50 L 455 70 L 450 210"
        stroke="white"
        strokeOpacity="0.4"
        strokeWidth="1"
        fill="none"
      />
      <line x1="415" y1="65" x2="445" y2="110" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" />
      <line x1="440" y1="50" x2="445" y2="110" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" />
      <line x1="455" y1="70" x2="445" y2="110" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" />
      <line x1="445" y1="110" x2="435" y2="210" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />

      {/* Modern low-rise towers (far right) */}
      <path
        d="M 470 210 L 470 140 L 505 140 L 505 210"
        stroke="white"
        strokeOpacity="0.3"
        strokeWidth="1"
        fill="none"
      />
      <line x1="470" y1="175" x2="505" y2="175" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />
    </svg>
  );
}

