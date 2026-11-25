"use client";

import React, { useState } from "react";
import { CheckCircle2, ArrowRight, ShieldCheck, Zap, Sparkles } from "lucide-react";

interface Phase {
  id: string;
  number: string;
  title: string;
  timeline: string;
  isCurrent?: boolean;
  bullets: string[];
}

const PHASES: Phase[] = [
  {
    id: "phase-1",
    number: "01",
    title: "Measure and optimise",
    timeline: "2026 to 2027 · now",
    isCurrent: true,
    bullets: [
      "Fleet emissions baseline using ISO 14083 and the GHG Protocol",
      "UAE Scope 1 and 2 reporting under Federal Decree-Law No. 11 of 2024",
      "No-idling policy, eco-driving training and trip chaining in every city",
      "First client CO2e reports for corporate accounts",
    ],
  },
  {
    id: "phase-2",
    number: "02",
    title: "Hybrid by default",
    timeline: "2027 to 2028",
    bullets: [
      "Hybrid chosen for every new sedan and SUV where a model exists",
      "First electric chauffeur cars in Riyadh and Dubai, with depot charging",
      "Dubai fleet aligned with the RTA 2027 hybrid and electric timeline",
      "Electric coaches booked for Doha events where available",
    ],
  },
  {
    id: "phase-3",
    number: "03",
    title: "Scale up",
    timeline: "2028 to 2030",
    bullets: [
      "Target hybrid and electric share across chauffeur fleet in Riyadh, Dubai, and Doha",
      "Electric bus trials on Saudi staff routes as charging infrastructure expands",
      "Preparation for ISO 14001 environmental management certification",
      "First independently audited emissions figures",
    ],
  },
  {
    id: "phase-4",
    number: "04",
    title: "Zero-emission first",
    timeline: "2030 to 2035",
    bullets: [
      "New chauffeur vehicles electric wherever charging infrastructure allows",
      "Electric or hydrogen buses for new coach purchases as the market allows",
      "Science-based reduction target set and reported yearly",
    ],
  },
];

export function SustainabilityRoadmap() {
  const [activePhase, setActivePhase] = useState<string>("phase-1");

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* 4 Stacked Phase Cards */}
      <div className="space-y-4">
        {PHASES.map((phase) => {
          const isSelected = activePhase === phase.id;
          return (
            <div
              key={phase.id}
              onClick={() => setActivePhase(phase.id)}
              className={`cursor-pointer rounded-2xl p-6 md:p-8 transition-all duration-300 border relative ${
                phase.isCurrent
                  ? "bg-[#1f2638] border-abBlue/60 shadow-xl shadow-abBlue/10 ring-1 ring-abBlue/30"
                  : isSelected
                  ? "bg-[#252731] border-white/30 shadow-lg"
                  : "bg-[#1c1d22] border-white/10 hover:border-white/20 hover:bg-[#202127]"
              }`}
            >
              <div className="grid md:grid-cols-12 gap-6 items-start">
                {/* Left: Phase Title & Timeline */}
                <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono tracking-widest text-gray-400 uppercase">
                      Phase {phase.number}
                    </span>
                    {phase.isCurrent && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-abBlue/20 text-abBlue border border-abBlue/30 px-2 py-0.5 rounded-full">
                        <Sparkles className="w-3 h-3" />
                        Current Active Phase
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                    {phase.title}
                  </h3>
                  <p className="text-sm font-medium text-gray-400">
                    {phase.timeline}
                  </p>
                </div>

                {/* Right: Deliverables & Bullets */}
                <div className="md:col-span-8">
                  <ul className="space-y-2.5">
                    {phase.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm md:text-base text-gray-300">
                        <CheckCircle2
                          className={`w-5 h-5 shrink-0 mt-0.5 ${
                            phase.isCurrent ? "text-abBlue" : "text-gray-400"
                          }`}
                        />
                        <span className="leading-snug">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom National Milestones Tracker Bar */}
      <div className="rounded-xl bg-[#17181c] border border-white/10 p-5 md:p-6 text-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-white font-semibold">
            <ShieldCheck className="w-5 h-5 text-abBlue" />
            <span>National milestones we track</span>
          </div>
          <div className="text-gray-300 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs md:text-sm">
            <span className="bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
              UAE Climate Law 2025
            </span>
            <span className="text-gray-600">·</span>
            <span className="bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
              Dubai Taxis 2027
            </span>
            <span className="text-gray-600">·</span>
            <span className="bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
              Riyadh 30% EV &amp; Qatar E-Buses 2030
            </span>
            <span className="text-gray-600">·</span>
            <span className="bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
              KSA Net Zero 2060
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
