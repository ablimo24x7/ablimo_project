import * as React from "react";

interface MuscatSkylineSvgProps {
  className?: string;
}

export default function MuscatSkylineSvg({ className = "" }: MuscatSkylineSvgProps) {
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

      {/* Rugged Hajar Mountains backdrop silhouette */}
      <path
        d="M 0 170 Q 35 140 70 160 T 150 145 T 230 155 T 320 135 T 410 150 T 520 130 L 520 210 L 0 210 Z"
        stroke="white"
        strokeOpacity="0.15"
        strokeWidth="0.8"
        strokeDasharray="4 2"
        fill="none"
      />

      {/* Traditional Omani watchtower / fort bastion (left) */}
      <path
        d="M 25 210 L 25 155 L 45 155 L 45 210"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="1"
        fill="none"
      />
      {/* Crenellations / battlement teeth */}
      <path d="M 23 155 L 23 148 L 29 148 L 29 155 L 35 155 L 35 148 L 41 148 L 41 155 L 47 155 L 47 148" stroke="white" strokeOpacity="0.3" strokeWidth="0.8" fill="none" />

      {/* Muttrah Corniche traditional merchant houses */}
      <path
        d="M 58 210 L 58 165 L 90 165 L 90 210"
        stroke="white"
        strokeOpacity="0.3"
        strokeWidth="0.9"
        fill="none"
      />
      <line x1="74" y1="165" x2="74" y2="210" stroke="white" strokeOpacity="0.15" strokeWidth="0.7" />

      {/* ── SULTAN QABOOS GRAND MOSQUE (Centerpiece) ── */}
      {/* Left Corner Minaret */}
      <path
        d="M 112 210 L 115 105 L 119 105 L 122 210"
        stroke="white"
        strokeOpacity="0.4"
        strokeWidth="1"
        fill="none"
      />
      <path d="M 113 105 L 117 85 L 121 105 Z" stroke="white" strokeOpacity="0.45" strokeWidth="0.9" fill="none" />
      <line x1="117" y1="85" x2="117" y2="72" stroke="white" strokeOpacity="0.5" strokeWidth="1" />

      {/* Grand Dome & Main Prayer Hall */}
      <rect x="135" y="160" width="80" height="50" stroke="white" strokeOpacity="0.35" strokeWidth="1" fill="none" />
      {/* Decorative Omani Arches on Hall facade */}
      <path d="M 145 210 L 145 180 Q 155 170 165 180 L 165 210" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" fill="none" />
      <path d="M 170 210 L 170 180 Q 180 170 190 180 L 190 210" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" fill="none" />
      <path d="M 195 210 L 195 180 Q 200 170 205 180 L 205 210" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" fill="none" />

      {/* Mosque Dome with ribbing */}
      <path
        d="M 150 160 Q 175 105 200 160"
        stroke="white"
        strokeOpacity="0.5"
        strokeWidth="1.2"
        fill="none"
      />
      {/* Dome finial spire with crescent */}
      <line x1="175" y1="118" x2="175" y2="92" stroke="white" strokeOpacity="0.6" strokeWidth="1.1" />
      <circle cx="175" cy="90" r="2.5" stroke="white" strokeOpacity="0.7" strokeWidth="0.9" fill="none" />

      {/* Main Grand Minaret (90 meters towering spire) */}
      <path
        d="M 226 210 L 231 60 L 237 60 L 242 210"
        stroke="white"
        strokeOpacity="0.55"
        strokeWidth="1.2"
        fill="none"
      />
      {/* Minaret Balcony 1 */}
      <line x1="228" y1="125" x2="240" y2="125" stroke="white" strokeOpacity="0.4" strokeWidth="1" />
      {/* Minaret Balcony 2 */}
      <line x1="230" y1="75" x2="238" y2="75" stroke="white" strokeOpacity="0.4" strokeWidth="1" />
      {/* Spire top cone */}
      <path d="M 231 60 L 234 30 L 237 60 Z" stroke="white" strokeOpacity="0.6" strokeWidth="1.1" fill="none" />
      <line x1="234" y1="30" x2="234" y2="15" stroke="white" strokeOpacity="0.7" strokeWidth="1.2" />
      <circle cx="234" cy="15" r="1.5" fill="white" fillOpacity="0.8" />

      {/* ── AL RIYAM PARK GIANT INCENSE BURNER (Mubkhara Monument) ── */}
      {/* Perched on hill */}
      <path d="M 265 210 Q 285 160 305 160 Q 325 160 345 210" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" fill="none" />
      {/* Monument base & flared white bowl */}
      <path
        d="M 292 160 L 295 125 L 285 110 L 325 110 L 315 125 L 318 160"
        stroke="white"
        strokeOpacity="0.45"
        strokeWidth="1.1"
        fill="none"
      />
      {/* Crown dome of the incense burner */}
      <path d="M 290 110 Q 305 85 320 110" stroke="white" strokeOpacity="0.5" strokeWidth="1" fill="none" />
      <line x1="305" y1="92" x2="305" y2="75" stroke="white" strokeOpacity="0.55" strokeWidth="1" />
      <circle cx="305" cy="75" r="1.5" fill="white" fillOpacity="0.7" />

      {/* Royal Opera House Muscat inspired classical arcaded facade */}
      <rect x="360" y="150" width="85" height="60" stroke="white" strokeOpacity="0.4" strokeWidth="1" fill="none" />
      <path d="M 370 210 L 370 175 Q 377 165 385 175 L 385 210" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" fill="none" />
      <path d="M 390 210 L 390 175 Q 397 165 405 175 L 405 210" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" fill="none" />
      <path d="M 410 210 L 410 175 Q 417 165 425 175 L 425 210" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" fill="none" />
      <path d="M 430 210 L 430 175 Q 437 165 442 175 L 442 210" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" fill="none" />
      <line x1="360" y1="160" x2="445" y2="160" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" />

      {/* Al Mouj Muscat Marina contemporary waterfront building */}
      <path
        d="M 460 210 L 460 145 L 490 130 L 515 130 L 515 210"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="1"
        fill="none"
      />
      <line x1="460" y1="170" x2="515" y2="170" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />
    </svg>
  );
}

