import * as React from "react";

interface KuwaitSkylineSvgProps {
  className?: string;
}

export default function KuwaitSkylineSvg({ className = "" }: KuwaitSkylineSvgProps) {
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

      {/* Liberation Tower (Left-Center Telecommunication Spire) */}
      <path
        d="M 40 210 L 46 110 L 48 65 L 52 65 L 54 110 L 60 210"
        stroke="white"
        strokeOpacity="0.4"
        strokeWidth="1"
        fill="none"
      />
      {/* Liberation Tower revolving pod */}
      <path
        d="M 42 105 L 58 105 L 55 90 L 45 90 Z"
        stroke="white"
        strokeOpacity="0.5"
        strokeWidth="1"
        fill="none"
      />
      {/* Antenna needle */}
      <line x1="50" y1="65" x2="50" y2="25" stroke="white" strokeOpacity="0.5" strokeWidth="1" />
      <circle cx="50" cy="25" r="1.5" fill="white" fillOpacity="0.6" />

      {/* Modern low-rise corporate blocks */}
      <path
        d="M 75 210 L 75 160 L 105 160 L 105 210"
        stroke="white"
        strokeOpacity="0.3"
        strokeWidth="1"
        fill="none"
      />
      <line x1="75" y1="185" x2="105" y2="185" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />

      {/* NBK Tower (Curved sweeping cylinder with prominent vertical crown) */}
      <path
        d="M 120 210 L 120 70 Q 140 40 155 70 L 155 210"
        stroke="white"
        strokeOpacity="0.45"
        strokeWidth="1.1"
        fill="none"
      />
      {/* Rounded crown fins */}
      <line x1="128" y1="65" x2="128" y2="210" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />
      <line x1="138" y1="52" x2="138" y2="210" stroke="white" strokeOpacity="0.25" strokeWidth="0.8" />
      <line x1="147" y1="65" x2="147" y2="210" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />

      {/* Al Hamra Tower (The iconic sculpted twisting skyscraper with angled flare) */}
      <path
        d="M 172 210 L 172 45 Q 185 15 200 15 L 208 30 L 208 210"
        stroke="white"
        strokeOpacity="0.55"
        strokeWidth="1.2"
        fill="none"
      />
      {/* The sculpted twisting cut-out curve */}
      <path
        d="M 172 45 Q 192 75 200 120 L 208 120"
        stroke="white"
        strokeOpacity="0.4"
        strokeWidth="1"
        fill="none"
      />
      <line x1="172" y1="140" x2="208" y2="140" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />
      <line x1="172" y1="175" x2="208" y2="175" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />
      <line x1="200" y1="15" x2="200" y2="5" stroke="white" strokeOpacity="0.6" strokeWidth="1" />

      {/* Mid-rise financial high-rise */}
      <path
        d="M 222 210 L 222 130 L 250 130 L 250 210"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="1"
        fill="none"
      />
      <line x1="222" y1="155" x2="250" y2="155" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />
      <line x1="222" y1="180" x2="250" y2="180" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />

      {/* ── KUWAIT TOWERS (World-famous Abraj Al-Kuwait Trio) ── */}
      {/* 1. Main Tower (Tallest with 2 spheres) */}
      {/* Base needle column */}
      <path
        d="M 288 210 L 297 100 L 299 40 L 301 40 L 303 100 L 312 210"
        stroke="white"
        strokeOpacity="0.5"
        strokeWidth="1.1"
        fill="none"
      />
      {/* Main lower large sphere */}
      <circle cx="300" cy="115" r="16" stroke="white" strokeOpacity="0.65" strokeWidth="1.2" fill="none" />
      <line x1="284" y1="115" x2="316" y2="115" stroke="white" strokeOpacity="0.35" strokeWidth="0.8" />
      {/* Upper smaller viewing sphere */}
      <circle cx="300" cy="65" r="9" stroke="white" strokeOpacity="0.6" strokeWidth="1" fill="none" />
      <line x1="291" y1="65" x2="309" y2="65" stroke="white" strokeOpacity="0.35" strokeWidth="0.8" />
      {/* Sharp needle tip */}
      <line x1="300" y1="40" x2="300" y2="10" stroke="white" strokeOpacity="0.7" strokeWidth="1.2" />
      <circle cx="300" cy="10" r="1.5" fill="white" fillOpacity="0.8" />

      {/* 2. Middle Tower (Water reservoir with 1 sphere) */}
      <path
        d="M 330 210 L 336 125 L 338 75 L 340 75 L 342 125 L 348 210"
        stroke="white"
        strokeOpacity="0.45"
        strokeWidth="1"
        fill="none"
      />
      {/* Single sphere */}
      <circle cx="339" cy="130" r="12" stroke="white" strokeOpacity="0.6" strokeWidth="1" fill="none" />
      <line x1="327" y1="130" x2="351" y2="130" stroke="white" strokeOpacity="0.3" strokeWidth="0.8" />
      {/* Spire needle */}
      <line x1="339" y1="75" x2="339" y2="45" stroke="white" strokeOpacity="0.55" strokeWidth="1" />
      <circle cx="339" cy="45" r="1.5" fill="white" fillOpacity="0.6" />

      {/* 3. Minor Tower (Slender light & equipment beacon) */}
      <path
        d="M 360 210 L 364 150 L 365 110 L 366 110 L 367 150 L 371 210"
        stroke="white"
        strokeOpacity="0.4"
        strokeWidth="0.9"
        fill="none"
      />
      <line x1="365.5" y1="110" x2="365.5" y2="85" stroke="white" strokeOpacity="0.5" strokeWidth="0.9" />

      {/* Commercial towers along Arabian Gulf Street */}
      <path
        d="M 388 210 L 388 120 L 415 120 L 415 210"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M 402 120 L 402 95 L 415 95"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="1"
        fill="none"
      />
      <line x1="388" y1="150" x2="415" y2="150" stroke="white" strokeOpacity="0.2" strokeWidth="0.8" />

      {/* Sharq waterfront modern high-rises */}
      <path
        d="M 430 210 L 430 135 L 452 110 L 458 110 L 458 210"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M 470 210 L 470 150 L 498 150 L 498 210"
        stroke="white"
        strokeOpacity="0.3"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}

