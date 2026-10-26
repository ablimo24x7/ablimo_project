"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { localeBase } from "@/app/[lang]/dictionaries";
import { SKETCH_SERVICES, type VehicleShape } from "./services-sketch";

function num(i: number): string {
  return String(i + 1).padStart(2, "0");
}

function CarSilhouette({ shape, label }: { shape: VehicleShape; label: string }) {
  return (
    <svg
      viewBox="0 0 400 130"
      className="w-[78%] h-auto mb-7"
      role="img"
      aria-label={label}
    >
      <ellipse cx="200" cy="124" rx="190" ry="5" fill="#000000" opacity="0.14" />
      <path d={shape.body} fill="#3B4148" />
      <path d={shape.glass} fill="#7B848D" />
      <path d={shape.line} fill="none" stroke="#5A6067" strokeWidth="1" />
      <path d={shape.lamp} fill="#D9DCE0" />
      <circle cx={shape.w1} cy="106" r="19" fill="#0A0A0A" />
      <circle cx={shape.w1} cy="106" r="11" fill="#9097A0" />
      <circle cx={shape.w1} cy="106" r="4" fill="#2A2A2A" />
      <circle cx={shape.w2} cy="106" r="19" fill="#0A0A0A" />
      <circle cx={shape.w2} cy="106" r="11" fill="#9097A0" />
      <circle cx={shape.w2} cy="106" r="4" fill="#2A2A2A" />
    </svg>
  );
}

function TexturePanel({ id }: { id: string }) {
  return (
    <svg width="100%" height="100%" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <pattern
          id={`tx-${id}`}
          width="30"
          height="30"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <rect width="30" height="30" fill="#1c1d21" />
          <path d="M0 0H30M0 0V30" stroke="#2a2c35" strokeWidth="1" strokeDasharray="3 2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#tx-${id})`} />
    </svg>
  );
}

export default function ServicesDirectory({ lang }: { lang: string }) {
  const base = localeBase(lang);
  const [active, setActive] = useState(SKETCH_SERVICES[0].id);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-svc]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          const id = en.target.getAttribute("data-svc");
          if (en.isIntersecting && id) setActive(id);
        }
      },
      { rootMargin: "-35% 0px -60% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-8 pb-24">
      <div className="flex flex-wrap gap-x-14 gap-y-10 items-start">
        <nav
          aria-label="Services on this page"
          className="hidden lg:flex sticky top-24 flex-1 min-w-[240px] max-w-[280px] flex-col border-l border-gray-700"
        >
          {SKETCH_SERVICES.map((s, i) => {
            const on = s.id === active;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                aria-current={on ? "true" : "false"}
                className={`flex items-center gap-3.5 min-h-[52px] pl-5 -ml-px border-l-2 transition-colors text-[17px] ${
                  on
                    ? "border-white text-white font-medium"
                    : "border-transparent text-gray-400 font-light hover:text-white"
                }`}
              >
                <span className="text-xs tracking-[0.12em] text-gray-500 min-w-5">
                  {num(i)}
                </span>
                {s.name}
              </a>
            );
          })}
          <Link
            href={`${base}/contact`}
            className="mt-7 ml-5 text-xs tracking-[0.18em] uppercase text-white hover:text-abBlue transition-colors"
          >
            Request a proposal &rarr;
          </Link>
        </nav>

        <div className="flex-[999] min-w-0 flex flex-col gap-16 lg:gap-28">
          {SKETCH_SERVICES.map((s, i) => (
            <article key={s.id} id={s.id} data-svc={s.id} className="scroll-mt-28">
              <div className="relative h-[440px]">
                <div className="absolute left-0 top-0 w-[42%] h-[78%] overflow-hidden bg-[#1c1d21]">
                  <TexturePanel id={s.id} />
                </div>
                <div className="absolute right-0 bottom-0 w-[76%] h-[82%] bg-[#1c1d21] overflow-hidden flex items-end justify-center">
                  <span className="absolute top-4 left-4 px-2.5 py-1.5 bg-abBlack border border-gray-700 text-xs tracking-[0.12em] uppercase text-gray-300">
                    Photo: {s.photo}
                  </span>
                  <CarSilhouette shape={s.v} label={s.vehicleLabel} />
                </div>
              </div>

              <div className="flex flex-wrap gap-x-14 gap-y-8 mt-10">
                <div className="flex-1 min-w-[240px]">
                  <p className="m-0 text-[13px] tracking-[0.22em] uppercase text-abBlue">
                    {num(i)}
                  </p>
                  <h2 className="mt-2.5 text-3xl md:text-4xl font-bold leading-tight">
                    {s.name}
                  </h2>
                </div>
                <div className="flex-[1.4] min-w-[260px]">
                  <p className="m-0 text-[17px] leading-relaxed text-gray-300">{s.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {s.points.map((pt) => (
                      <span
                        key={pt}
                        className="px-3 py-1.5 border border-gray-700 text-[13px] text-gray-300"
                      >
                        {pt}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`${base}${s.href}`}
                    className="mt-7 inline-flex items-center min-h-[48px] px-7 rounded-full border border-white text-sm font-semibold text-white hover:bg-white hover:text-abBlack transition-colors"
                  >
                    Explore
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
