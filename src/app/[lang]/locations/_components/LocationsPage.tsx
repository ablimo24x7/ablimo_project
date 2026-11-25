"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { localeBase } from "@/app/[lang]/dictionaries";
import GlobeMap, { type GlobeView } from "./GlobeMap";
import {
  PartnerStatement,
  OfficesSection,
  CoverageSection,
  AirportsSection,
  RoutesSection,
  FaqSection,
  CoordinationSection,
  ClosingCtaSection,
} from "./locations-sections";
import { SKETCH_COUNTRIES } from "./locations-sketch";

interface LocationsPageProps {
  lang: string;
}

export default function LocationsPage({ lang }: LocationsPageProps) {
  const base = localeBase(lang);

  // Globe view state: initial lon/lat before fly-to
  const [view, setView] = useState<GlobeView>({ lon: -40, lat: 18, zoom: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [openCluster, setOpenCluster] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"sa" | "ae" | "qa" | "gcc">("sa");
  const [openFaq, setOpenFaq] = useState(0);

  const animRef = useRef<{
    from: GlobeView;
    to: GlobeView;
    dur: number;
    t0: number | null;
  } | null>(null);

  const dragRef = useRef<{
    x: number;
    y: number;
    lon: number;
    lat: number;
    w: number;
  } | null>(null);

  const touchedRef = useRef(false);

  // Smooth animation helper
  const flyTo = useCallback((lon: number, lat: number, zoom: number, dur: number) => {
    setView((current) => {
      const d = (((lon - current.lon) % 360) + 540) % 360 - 180;
      animRef.current = {
        from: current,
        to: { lon: current.lon + d, lat, zoom },
        dur,
        t0: null,
      };
      return current;
    });
  }, []);

  // Initialize and run animation loop
  useEffect(() => {
    let alive = true;
    let rafId: number;

    // Initial fly-to: swoop to Gulf coordinates (lon 50, lat 24, zoom 1) over 2.8s
    flyTo(50, 24, 1, 2800);

    const tick = (t: number) => {
      if (!alive) return;

      const anim = animRef.current;
      if (anim) {
        if (anim.t0 === null) {
          anim.t0 = t;
        } else {
          const k = Math.min(1, (t - anim.t0) / anim.dur);
          // Cubic easeInOut
          const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
          setView({
            lon: anim.from.lon + (anim.to.lon - anim.from.lon) * e,
            lat: anim.from.lat + (anim.to.lat - anim.from.lat) * e,
            zoom: anim.from.zoom + (anim.to.zoom - anim.from.zoom) * e,
          });
          if (k >= 1) animRef.current = null;
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      alive = false;
      cancelAnimationFrame(rafId);
    };
  }, [flyTo]);

  // Pointer drag interactions
  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    animRef.current = null;
    const rect = e.currentTarget.getBoundingClientRect();
    dragRef.current = {
      x: e.clientX,
      y: e.clientY,
      lon: view.lon,
      lat: view.lat,
      w: rect.width || 640,
    };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    setIsDragging(true);
    setOpenCluster(null);
    touchedRef.current = true;
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const d = dragRef.current;
    if (!d) return;
    const k = (640 / d.w) * (180 / Math.PI) / (290 * view.zoom);
    const newLon = d.lon - (e.clientX - d.x) * k;
    const newLat = Math.max(-70, Math.min(75, d.lat + (e.clientY - d.y) * k));
    setView((prev) => ({ ...prev, lon: newLon, lat: newLat }));
  };

  const handlePointerUp = () => {
    if (!dragRef.current) return;
    dragRef.current = null;
    setIsDragging(false);
  };

  const clampZoom = (z: number) => Math.max(1, Math.min(6, z));

  const handleZoomIn = () => {
    flyTo(view.lon, view.lat, clampZoom(view.zoom * 1.6), 400);
  };

  const handleZoomOut = () => {
    flyTo(view.lon, view.lat, clampZoom(view.zoom / 1.6), 400);
  };

  const handleReset = () => {
    flyTo(50, 24, 1, 900);
    setOpenCluster(null);
  };

  const handleSelectTab = (countryId: "sa" | "ae" | "qa" | "gcc") => {
    setActiveTab(countryId);
    setOpenCluster(null);
    touchedRef.current = true;
    const ct = SKETCH_COUNTRIES.find((c) => c.id === countryId);
    if (ct) {
      flyTo(ct.view[0], ct.view[1], ct.view[2], 900);
    }
  };

  return (
    <main className="min-h-screen bg-[#1a1a1c] text-white">
      {/* Hero with Interactive Globe */}
      <section className="relative overflow-hidden bg-[#050709] pt-28 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_45%,#1c1d21_0%,#0a0a0a_60%,#050709_100%)] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-8">
          <div className="flex flex-wrap items-center gap-12 lg:gap-16">
            {/* Left text column */}
            <div className="flex-1 basis-[380px] min-w-0 flex flex-col">
              <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-abBlue/10 border border-abBlue/30 self-start">
                <span className="w-2 h-2 rounded-full bg-abBlue animate-pulse" />
                <span className="text-abBlue text-xs font-bold tracking-widest uppercase">
                  Locations
                </span>
              </div>

              <h1 className="mt-5 text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                Chauffeur Service Locations GCC: Where AB Operates in Saudi Arabia, the UAE and Qatar
              </h1>

              <p className="mt-6 text-base md:text-lg text-gray-300 leading-relaxed max-w-xl">
                Coordinating executive travel across chauffeur service locations GCC demands
                rigorous operational timing and consistent service standards. AB manages ground
                transportation GCC networks for business delegations, executive travellers,
                diplomatic missions and corporate events across the region. Central dispatch in
                Riyadh coordinates around the clock with regional teams in Dubai, Abu Dhabi and
                Doha to deliver seamless travel.
              </p>

              <p className="mt-4 text-base text-gray-300 leading-relaxed max-w-xl">
                Every journey connects through established operational hubs that oversee vehicle
                dispatch, flight tracking and local protocol. This unified regional network
                allows organisations to manage cross border itineraries under one operating
                standard.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={`${base}/contact`}
                  className="inline-flex items-center min-h-[52px] px-8 bg-abBlue hover:bg-abServiceBlue text-white text-sm font-semibold rounded-full transition-colors shadow-lg shadow-abBlue/20"
                >
                  Request a proposal
                </Link>
                <Link
                  href={`${base}/services/intercity-transfers`}
                  className="inline-flex items-center min-h-[52px] px-8 rounded-full border border-white/50 hover:bg-white/10 text-white text-sm font-semibold transition-colors"
                >
                  Book a transfer
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-12 pt-8 border-t border-gray-800 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-xl">
                <div className="flex flex-col gap-1.5">
                  <span className="text-4xl font-bold text-white tracking-tight">3</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-200">
                    Countries served directly
                  </span>
                  <span className="text-xs text-gray-400 leading-relaxed">
                    Direct fleet operations across the Kingdom of Saudi Arabia, the United Arab Emirates and the State of Qatar.
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-4xl font-bold text-white tracking-tight">4</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-200">
                    Regional offices
                  </span>
                  <span className="text-xs text-gray-400 leading-relaxed">
                    Fully staffed physical offices in Riyadh, Dubai, Abu Dhabi and Doha coordinating local transport movements.
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-4xl font-bold text-white tracking-tight">8</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-200">
                    Airports served
                  </span>
                  <span className="text-xs text-gray-400 leading-relaxed">
                    Dedicated meet and greet infrastructure across the major commercial aviation gateways and private flight terminals.
                  </span>
                </div>
              </div>

              <p className="mt-6 text-xs text-gray-400 max-w-xl">
                Network coverage status across our Gulf operating zones includes Direct operations, Regional coverage and On request via partners for broader territorial reach.
              </p>
            </div>

            {/* Right globe column */}
            <div className="flex-[1.2] basis-[480px] min-w-0 flex justify-center">
              <GlobeMap
                lang={lang}
                view={view}
                openCluster={openCluster}
                onToggleCluster={setOpenCluster}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                isDragging={isDragging}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                onReset={handleReset}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Narrative & Regional Sections */}
      <PartnerStatement />
      <OfficesSection />
      <CoverageSection
        lang={lang}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
      />
      <AirportsSection />
      <RoutesSection lang={lang} />
      <FaqSection openIndex={openFaq} onToggle={setOpenFaq} />
      <CoordinationSection lang={lang} />
      <ClosingCtaSection lang={lang} />
    </main>
  );
}
