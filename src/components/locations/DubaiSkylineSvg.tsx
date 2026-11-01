import * as React from "react";

interface DubaiSkylineSvgProps {
  className?: string;
}

export default function DubaiSkylineSvg({ className = "" }: DubaiSkylineSvgProps) {
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

      {/* Burj Al Arab (left) */}
      {/* Curved sail */}
      <path
        d="M 50 210 C 45 150 55 100 80 70 C 70 120 72 170 75 210"
        stroke="white"
        strokeOpacity="0.4"
        strokeWidth="1"
        fill="none"
      />
      {/* Outer bow / arc */}
      <path
        d="M 45 210 C 35 140 50 80 80 70"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="1"
        fill="none"
      />
      {/* Mast & helipad */}
      <line x1="80" y1="70" x2="80" y2="50" stroke="white" strokeOpacity="0.4" strokeWidth="1" />
      <line x1="68" y1="92" x2="86" y2="92" stroke="white" strokeOpacity="0.4" strokeWidth="1" />
      {/* Base triangular struts */}
      <line x1="50" y1="210" x2="75" y2="170" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" />
      <line x1="75" y1="170" x2="55" y2="130" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" />
      <line x1="55" y1="130" x2="78" y2="100" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" />

      {/* Mid-rise modern building 1 */}
      <path
        d="M 95 210 L 95 145 L 120 145 L 120 210"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="1"
        fill="none"
      />
      <line x1="95" y1="165" x2="120" y2="165" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />
      <line x1="95" y1="185" x2="120" y2="185" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />

      {/* Dubai Frame / Gateway Portal */}
      <path
        d="M 135 210 L 135 110 L 175 110 L 175 210"
        stroke="white"
        strokeOpacity="0.4"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M 145 210 L 145 125 L 165 125 L 165 210"
        stroke="white"
        strokeOpacity="0.3"
        strokeWidth="0.9"
        fill="none"
      />

      {/* Angled twin tower (Emirates Towers style) */}
      <path
        d="M 188 210 L 188 100 L 205 75 L 212 75 L 212 210"
        stroke="white"
        strokeOpacity="0.4"
        strokeWidth="1"
        fill="none"
      />
      <line x1="205" y1="75" x2="205" y2="58" stroke="white" strokeOpacity="0.4" strokeWidth="1" />

      {/* Burj Khalifa (centerpiece tall tower) */}
      {/* Base */}
      <path
        d="M 226 210 L 226 160 L 232 160 L 232 125 L 238 125 L 238 95 L 243 95 L 243 65 L 246 65 L 246 38 L 248 38 L 248 10 L 250 10 L 250 38 L 252 38 L 252 65 L 255 65 L 255 95 L 260 95 L 260 125 L 266 125 L 266 160 L 272 210"
        stroke="white"
        strokeOpacity="0.5"
        strokeWidth="1"
        fill="none"
      />
      {/* Spire needle */}
      <line x1="249" y1="10" x2="249" y2="2" stroke="white" strokeOpacity="0.6" strokeWidth="1.2" />
      {/* Central vertical spine */}
      <line x1="249" y1="210" x2="249" y2="10" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" />
      {/* Tier tier horizontals */}
      <line x1="232" y1="160" x2="266" y2="160" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" />
      <line x1="238" y1="125" x2="260" y2="125" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" />
      <line x1="243" y1="95" x2="255" y2="95" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" />

      {/* Slender modern spire tower */}
      <path
        d="M 285 210 L 285 115 L 295 85 L 305 115 L 305 210"
        stroke="white"
        strokeOpacity="0.4"
        strokeWidth="1"
        fill="none"
      />
      <line x1="295" y1="85" x2="295" y2="65" stroke="white" strokeOpacity="0.4" strokeWidth="1" />

      {/* Stepped corporate tower */}
      <path
        d="M 318 210 L 318 130 L 328 130 L 328 105 L 342 105 L 342 130 L 350 130 L 350 210"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="1"
        fill="none"
      />
      <line x1="318" y1="150" x2="350" y2="150" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />
      <line x1="318" y1="175" x2="350" y2="175" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />

      {/* Twin angled skyscraper */}
      <path
        d="M 365 210 L 365 118 L 385 92 L 392 92 L 392 210"
        stroke="white"
        strokeOpacity="0.4"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M 400 210 L 400 135 L 420 110 L 425 110 L 425 210"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="1"
        fill="none"
      />

      {/* Broad commercial tower / skyline edge */}
      <path
        d="M 440 210 L 440 120 L 470 120 L 470 210"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M 480 210 L 480 148 L 505 148 L 505 210"
        stroke="white"
        strokeOpacity="0.3"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}

