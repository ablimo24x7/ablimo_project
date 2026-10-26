"use client";

import { useMemo } from "react";
import Link from "next/link";
import { localeBase } from "@/app/[lang]/dictionaries";
import rawGeo from "@/data/globe-geo.json";
import {
  SKETCH_CITIES,
  type SketchCity,
} from "./locations-sketch";

const D = Math.PI / 180;
const C = 320;

// Preprocess geo coordinates once at module load
const geoDotsCount = rawGeo.dots.length / 3;
const geoLonR = new Float32Array(geoDotsCount);
const geoSl = new Float32Array(geoDotsCount);
const geoCl = new Float32Array(geoDotsCount);
const geoA = new Uint8Array(geoDotsCount);

for (let i = 0; i < geoDotsCount; i++) {
  const la = rawGeo.dots[3 * i] * D;
  geoLonR[i] = rawGeo.dots[3 * i + 1] * D;
  geoSl[i] = Math.sin(la);
  geoCl[i] = Math.cos(la);
  geoA[i] = rawGeo.dots[3 * i + 2];
}

const geoOutlines = rawGeo.outlines as number[][];
const geoPartnerOutlines = (rawGeo.partnerOutlines || []) as number[][];

function ringPath(ring: number[], R: number, l0: number, sp0: number, cp0: number): string {
  let d = "";
  let any = false;
  for (let j = 0; j < ring.length; j += 2) {
    const la = ring[j + 1] * D;
    const dl = ring[j] * D - l0;
    const cl = Math.cos(la);
    const sl = Math.sin(la);
    const cdl = Math.cos(dl);
    const cosc = sp0 * sl + cp0 * cl * cdl;
    let dx = R * cl * Math.sin(dl);
    let dy = -R * (cp0 * sl - sp0 * cl * cdl);
    if (cosc < 0) {
      const len = Math.hypot(dx, dy) || 1;
      dx = (dx / len) * R;
      dy = (dy / len) * R;
    } else {
      any = true;
    }
    d += (j === 0 ? "M" : "L") + (C + dx).toFixed(1) + " " + (C + dy).toFixed(1);
  }
  return any ? d + "Z" : "";
}

export interface GlobeView {
  lon: number;
  lat: number;
  zoom: number;
}

interface GlobeMapProps {
  lang: string;
  view: GlobeView;
  openCluster: string | null;
  onToggleCluster: (key: string | null) => void;
  onPointerDown: (e: React.PointerEvent<SVGSVGElement>) => void;
  onPointerMove: (e: React.PointerEvent<SVGSVGElement>) => void;
  onPointerUp: (e: React.PointerEvent<SVGSVGElement>) => void;
  isDragging: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export default function GlobeMap({
  lang,
  view,
  openCluster,
  onToggleCluster,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  isDragging,
  onZoomIn,
  onZoomOut,
  onReset,
}: GlobeMapProps) {
  const base = localeBase(lang);

  const {
    R,
    dotW,
    frontDots,
    limbDots,
    activeDots,
    partnerDots,
    outlinePath,
    partnerOutlinePath,
    pins,
  } = useMemo(() => {
    const radius = 290 * view.zoom;
    const l0 = view.lon * D;
    const p0 = view.lat * D;
    const sp0 = Math.sin(p0);
    const cp0 = Math.cos(p0);

    let front = "";
    let limb = "";
    let act = "";
    let part = "";
    let outlines = "";
    let pOutlines = "";

    for (let i = 0; i < geoDotsCount; i++) {
      const dl = geoLonR[i] - l0;
      const cdl = Math.cos(dl);
      const cosc = sp0 * geoSl[i] + cp0 * geoCl[i] * cdl;
      if (cosc <= 0) continue;
      const x = C + radius * geoCl[i] * Math.sin(dl);
      const y = C - radius * (cp0 * geoSl[i] - sp0 * geoCl[i] * cdl);
      if (x < -8 || x > 648 || y < -8 || y > 648) continue;
      const sg = "M" + x.toFixed(1) + " " + y.toFixed(1) + "h0";
      if (geoA[i] === 1) act += sg;
      else if (geoA[i] === 2) part += sg;
      else if (cosc < 0.3) limb += sg;
      else front += sg;
    }

    for (const ring of geoOutlines) outlines += ringPath(ring, radius, l0, sp0, cp0);
    for (const ring of geoPartnerOutlines) pOutlines += ringPath(ring, radius, l0, sp0, cp0);

    // Visible cities calculation
    const visible: { c: SketchCity; x: number; y: number }[] = [];
    for (const c of SKETCH_CITIES) {
      const la = c.lat * D;
      const dl = c.lon * D - l0;
      const cl = Math.cos(la);
      const sl = Math.sin(la);
      const cdl = Math.cos(dl);
      const cosc = sp0 * sl + cp0 * cl * cdl;
      if (cosc < 0.08) continue;
      const x = C + radius * cl * Math.sin(dl);
      const y = C - radius * (cp0 * sl - sp0 * cl * cdl);
      if (x < 0 || x > 640 || y < 0 || y > 640) continue;
      visible.push({ c, x, y });
    }

    // Cluster grouping with 36px threshold
    interface Group {
      x: number;
      y: number;
      items: { c: SketchCity; x: number; y: number }[];
    }
    const groups: Group[] = [];
    for (const p of visible) {
      let hit: Group | null = null;
      for (const gp of groups) {
        if (Math.hypot(gp.x - p.x, gp.y - p.y) < 36) {
          hit = gp;
          break;
        }
      }
      if (hit) {
        hit.items.push(p);
        hit.x = hit.items.reduce((m, q) => m + q.x, 0) / hit.items.length;
        hit.y = hit.items.reduce((m, q) => m + q.y, 0) / hit.items.length;
      } else {
        groups.push({ x: p.x, y: p.y, items: [p] });
      }
    }

    const P = "On request via partners";
    const mappedPins = groups.map((gp) => {
      const key = gp.items.map((q) => q.c.id).sort().join("-");
      const names = gp.items.map((q) => q.c.name);
      const one = gp.items.length === 1;
      const partner = one && gp.items[0].c.status === P;
      const short = gp.items.length === 2 ? names.join(" · ") : `${gp.items.length} cities`;
      return {
        key,
        single: one,
        cluster: !one,
        city: gp.items[0].c,
        name: names[0],
        href: gp.items[0].c.href,
        count: gp.items.length,
        partner,
        short,
        label: `Show ${names.join(", ")}`,
        cities: gp.items.map((q) => ({
          id: q.c.id,
          name: q.c.name,
          href: q.c.href,
          status: q.c.status,
          code: q.c.code,
        })),
        left: `${((gp.x / 640) * 100).toFixed(2)}%`,
        top: `${((gp.y / 640) * 100).toFixed(2)}%`,
      };
    });

    const calculatedDotW = Math.min(2.6 * Math.pow(view.zoom, 0.55), 6).toFixed(2);

    return {
      R: radius.toFixed(1),
      dotW: calculatedDotW,
      frontDots: front || "M0 0",
      limbDots: limb || "M0 0",
      activeDots: act || "M0 0",
      partnerDots: part || "M0 0",
      outlinePath: outlines || "M0 0",
      partnerOutlinePath: pOutlines || "M0 0",
      pins: mappedPins,
    };
  }, [view]);

  return (
    <div className="relative w-full max-w-[680px]">
      {/* Globe Container */}
      <div className="relative w-full aspect-square select-none touch-none">
        <svg
          viewBox="0 0 640 640"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className={`w-full h-full block ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
          style={{ willChange: "transform" }}
          aria-label="Interactive Gulf mobility map"
          role="img"
        >
          {/* Globe body circle */}
          <circle cx="320" cy="320" r={R} fill="#15181C" stroke="#2A2D31" strokeWidth="1" />

          {/* Dots: limb, front */}
          <path d={limbDots} fill="none" stroke="#30353B" strokeWidth={dotW} strokeLinecap="round" />
          <path d={frontDots} fill="none" stroke="#7E868F" strokeWidth={dotW} strokeLinecap="round" />

          {/* Partner Outlines and Dots */}
          <path
            d={partnerOutlinePath}
            fill="none"
            stroke="#259FCF"
            strokeWidth="1.1"
            strokeDasharray="3 3"
          />
          <path
            d={partnerDots}
            fill="none"
            stroke="#259FCF"
            strokeOpacity="0.55"
            strokeWidth={dotW}
            strokeLinecap="round"
          />

          {/* Active direct outlines & active dots */}
          <path
            d={outlinePath}
            fill="#259FCF"
            fillOpacity="0.16"
            stroke="#259FCF"
            strokeWidth="1.2"
          />
          <path
            d={activeDots}
            fill="none"
            stroke="#259FCF"
            strokeWidth={dotW}
            strokeLinecap="round"
          />
        </svg>

        {/* Map Pins overlay */}
        {pins.map((p) => {
          const isOpen = openCluster === p.key;
          return (
            <div
              key={p.key}
              style={{
                left: p.left,
                top: p.top,
                transform: "translate(-50%, -100%)",
                zIndex: isOpen ? 50 : 20,
              }}
              className="absolute pointer-events-auto"
            >
              {p.single ? (
                <Link
                  href={`${base}${p.href}`}
                  aria-label={`Open ${p.name}`}
                  className="group flex flex-col items-center no-underline text-white"
                >
                  <span className="px-2.5 py-1 bg-[#050709]/85 border border-gray-700/80 rounded text-[11px] font-semibold tracking-wider uppercase whitespace-nowrap mb-1.5 shadow-md">
                    {p.name}
                  </span>
                  <span
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold tracking-wider shadow-lg transition-transform group-hover:scale-110 ${
                      p.partner
                        ? "bg-[#050709]/90 text-white border-2 border-dashed border-white/80"
                        : "bg-white text-abBlack border-2 border-solid border-white"
                    }`}
                  >
                    AB
                  </span>
                  <span className="w-0.5 h-2.5 bg-white"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                </Link>
              ) : (
                <div className="flex flex-col items-center">
                  {isOpen && (
                    <div className="bg-[#0e1013] border border-gray-700 rounded-lg shadow-2xl min-w-[240px] p-2 mb-2 flex flex-col z-50">
                      <span className="px-3 py-1.5 text-xs tracking-wider uppercase text-gray-400 font-semibold border-b border-gray-800">
                        {p.count} cities here
                      </span>
                      <div className="mt-1 flex flex-col">
                        {p.cities.map((c) => (
                          <Link
                            key={c.id}
                            href={`${base}${c.href}`}
                            className="flex items-center justify-between gap-4 min-h-[40px] px-3 rounded hover:bg-[#1c1d21] text-white text-sm transition-colors"
                          >
                            <span>{c.name}</span>
                            <span
                              className={`text-[11px] tracking-wider uppercase ${
                                c.status === "On request via partners"
                                  ? "text-abBlue font-medium"
                                  : "text-gray-400"
                              }`}
                            >
                              {c.status === "On request via partners"
                                ? "Partner"
                                : c.code || "Direct"}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => onToggleCluster(isOpen ? null : p.key)}
                    aria-expanded={isOpen}
                    aria-label={p.label}
                    className="group flex flex-col items-center bg-transparent border-0 p-0 cursor-pointer text-white"
                  >
                    <span className="px-2.5 py-1 bg-[#050709]/85 border border-gray-700/80 rounded text-[11px] font-semibold tracking-wider uppercase whitespace-nowrap mb-1.5 shadow-md">
                      {p.short}
                    </span>
                    <span className="relative w-10 h-10 rounded-full bg-white text-abBlack flex items-center justify-center text-xs font-bold tracking-wider border-2 border-white shadow-lg transition-transform group-hover:scale-110">
                      AB
                      <span className="absolute -top-1.5 -right-2 min-w-[22px] h-[22px] rounded-full bg-abBlue text-white text-xs font-bold flex items-center justify-center border-2 border-[#0B0D10] px-1">
                        {p.count}
                      </span>
                    </span>
                    <span className="w-0.5 h-2.5 bg-white"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-4 px-1">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs tracking-wider uppercase text-gray-400">
          <span className="inline-flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-abBlue"></span>
            Direct operations
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full border border-abBlue"></span>
            Regional coverage
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full border border-dashed border-abBlue"></span>
            On request via partners
          </span>
          <span className="text-gray-500 hidden sm:inline">Drag to rotate</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onZoomOut}
            aria-label="Zoom out"
            className="w-10 h-10 rounded border border-gray-700 bg-[#1c1d21] text-gray-200 hover:text-white hover:border-gray-500 hover:bg-[#2a2c35] transition-colors flex items-center justify-center"
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
            </svg>
          </button>
          <button
            type="button"
            onClick={onZoomIn}
            aria-label="Zoom in"
            className="w-10 h-10 rounded border border-gray-700 bg-[#1c1d21] text-gray-200 hover:text-white hover:border-gray-500 hover:bg-[#2a2c35] transition-colors flex items-center justify-center"
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5v14" />
            </svg>
          </button>
          <button
            type="button"
            onClick={onReset}
            aria-label="Reset view to the Gulf"
            className="w-10 h-10 rounded border border-gray-700 bg-[#1c1d21] text-gray-200 hover:text-white hover:border-gray-500 hover:bg-[#2a2c35] transition-colors flex items-center justify-center"
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="8" />
              <circle cx="12" cy="12" r="2" />
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
