import * as React from "react";

interface DohaSkylineSvgProps {
  className?: string;
}

export default function DohaSkylineSvg({ className = "" }: DohaSkylineSvgProps) {
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

      {/* Lusail Katara Towers (Twin curved scimitar arcs facing inwards) */}
      <path
        d="M 35 210 C 25 150 35 90 65 60 C 58 100 62 160 70 210"
        stroke="white"
        strokeOpacity="0.45"
        strokeWidth="1.1"
        fill="none"
      />
      <path
        d="M 105 210 C 115 150 105 90 75 60 C 82 100 78 160 70 210"
        stroke="white"
        strokeOpacity="0.45"
        strokeWidth="1.1"
        fill="none"
      />
      <line x1="70" y1="60" x2="70" y2="210" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" />
      <line x1="48" y1="120" x2="92" y2="120" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />
      <line x1="56" y1="160" x2="84" y2="160" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />

      {/* Mid-rise modern building */}
      <path
        d="M 118 210 L 118 140 L 142 140 L 142 210"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="1"
        fill="none"
      />
      <line x1="118" y1="165" x2="142" y2="165" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />
      <line x1="118" y1="188" x2="142" y2="188" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />

      {/* Tornado Tower (Hourglass tapered cylinder with diagrid lattice) */}
      <path
        d="M 152 210 Q 166 125 156 50 L 194 50 Q 184 125 198 210 Z"
        stroke="white"
        strokeOpacity="0.5"
        strokeWidth="1.1"
        fill="none"
      />
      {/* Diagrid diamond crosses */}
      <line x1="156" y1="50" x2="198" y2="210" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" />
      <line x1="194" y1="50" x2="152" y2="210" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" />
      <line x1="160" y1="90" x2="190" y2="170" stroke="white" strokeOpacity="0.2" strokeWidth="0.7" />
      <line x1="190" y1="90" x2="160" y2="170" stroke="white" strokeOpacity="0.2" strokeWidth="0.7" />
      {/* Crown pinnacle */}
      <line x1="175" y1="50" x2="175" y2="38" stroke="white" strokeOpacity="0.5" strokeWidth="1" />

      {/* Modern West Bay Tower with angled cantilever */}
      <path
        d="M 210 210 L 210 95 L 235 75 L 245 75 L 245 210"
        stroke="white"
        strokeOpacity="0.4"
        strokeWidth="1"
        fill="none"
      />
      <line x1="210" y1="125" x2="245" y2="125" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />
      <line x1="210" y1="160" x2="245" y2="160" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />

      {/* Doha Tower / Burj Doha (Jean Nouvel cylindrical tower with rounded dome cap) */}
      <path
        d="M 260 210 L 260 65 Q 275 30 290 65 L 290 210"
        stroke="white"
        strokeOpacity="0.55"
        strokeWidth="1.2"
        fill="none"
      />
      {/* Laser antenna on dome */}
      <line x1="275" y1="38" x2="275" y2="20" stroke="white" strokeOpacity="0.6" strokeWidth="1" />
      <circle cx="275" cy="20" r="1.5" fill="white" fillOpacity="0.7" />
      {/* Latticework horizontal and vertical ribs */}
      <line x1="260" y1="90" x2="290" y2="90" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" />
      <line x1="260" y1="125" x2="290" y2="125" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" />
      <line x1="260" y1="160" x2="290" y2="160" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" />
      <line x1="275" y1="38" x2="275" y2="210" stroke="white" strokeOpacity="0.3" strokeWidth="0.8" strokeDasharray="3 3" />

      {/* Aspire Tower / The Torch (Center-Right Iconic beacon) */}
      <path
        d="M 306 210 Q 318 120 314 45 L 336 45 Q 332 120 344 210"
        stroke="white"
        strokeOpacity="0.45"
        strokeWidth="1"
        fill="none"
      />
      {/* Torch top cradle */}
      <path
        d="M 310 45 Q 325 35 340 45"
        stroke="white"
        strokeOpacity="0.5"
        strokeWidth="1"
        fill="none"
      />
      <line x1="325" y1="36" x2="325" y2="22" stroke="white" strokeOpacity="0.6" strokeWidth="1" />
      <circle cx="325" cy="22" r="1.5" fill="white" fillOpacity="0.6" />
      {/* Cantilevered viewing pod */}
      <ellipse cx="325" cy="85" rx="14" ry="4" stroke="white" strokeOpacity="0.4" strokeWidth="0.9" fill="none" />

      {/* Stepped Financial Tower */}
      <path
        d="M 360 210 L 360 115 L 372 115 L 372 85 L 392 85 L 392 115 L 402 115 L 402 210"
        stroke="white"
        strokeOpacity="0.4"
        strokeWidth="1"
        fill="none"
      />
      <line x1="382" y1="85" x2="382" y2="65" stroke="white" strokeOpacity="0.4" strokeWidth="1" />
      <line x1="360" y1="140" x2="402" y2="140" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />
      <line x1="360" y1="175" x2="402" y2="175" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />

      {/* Twin angled towers */}
      <path
        d="M 416 210 L 416 125 L 434 100 L 440 100 L 440 210"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M 450 210 L 450 140 L 468 115 L 474 115 L 474 210"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="1"
        fill="none"
      />

      {/* Commercial waterfront building (far right) */}
      <path
        d="M 486 210 L 486 155 L 512 155 L 512 210"
        stroke="white"
        strokeOpacity="0.3"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}

