"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Dictionary, localeBase } from "@/app/[lang]/dictionaries";

const AUTOPLAY_MS = 7000;

const subscribeReduce = (onChange: () => void) => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};

export default function HowItWorksSection({
  dict,
  lang = "en-US",
}: {
  dict: Dictionary;
  lang?: string;
}) {
  const el = dict.home.managedTransportation;
  const stages = el.stages;
  const total = stages.length;
  const [cur, setCur] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const stepperRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useSyncExternalStore(
    subscribeReduce,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (!("IntersectionObserver" in window)) {
      queueMicrotask(() => setRevealed(true));
      return;
    }
    const io = new IntersectionObserver(
      (entries, obs) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setRevealed(true);
            obs.disconnect();
          }
        }),
      { threshold: 0.1 }
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const root = stepperRef.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries, obs) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setStarted(true);
            obs.disconnect();
          }
        }),
      { threshold: 0.4 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduce || !started || paused) return;
    const t = setTimeout(() => setCur((c) => (c + 1) % total), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [cur, started, paused, reduce, total]);

  const goTo = (i: number, focus = false) => {
    const idx = ((i % total) + total) % total;
    setCur(idx);
    if (focus) tabRefs.current[idx]?.focus();
  };

  const onTabKey = (e: React.KeyboardEvent) => {
    const map: Record<string, number> = {
      ArrowDown: 1,
      ArrowRight: 1,
      ArrowUp: -1,
      ArrowLeft: -1,
    };
    if (map[e.key]) {
      e.preventDefault();
      goTo(cur + map[e.key], true);
      return;
    }
    if (e.key === "Home") {
      e.preventDefault();
      goTo(0, true);
    }
    if (e.key === "End") {
      e.preventDefault();
      goTo(total - 1, true);
    }
  };

  const playing = started && !reduce;

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-24 bg-abDarkGray border-b border-gray-900 relative z-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`abx-head abx-reveal${revealed ? " is-in" : ""}`}>
          <div>
            <p className="text-sm font-bold tracking-widest text-abBlue uppercase mb-3">
              {el.badge}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {el.title}
            </h2>
          </div>
          <p className="abx-head-note">{el.note}</p>
        </div>

        <div
          ref={stepperRef}
          className={`abx-stepper abx-reveal${revealed ? " is-in" : ""}${
            paused ? " is-paused" : ""
          }`}
          style={{ "--abx-dur": `${AUTOPLAY_MS}ms` } as React.CSSProperties}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node))
              setPaused(false);
          }}
        >
          <div
            className="abx-steps"
            role="tablist"
            aria-label={el.tablistAria}
          >
            <div className="abx-rail" aria-hidden="true">
              <span
                className="abx-rail-fill"
                style={{ height: `${(cur / (total - 1)) * 100}%` }}
              ></span>
            </div>
            {stages.map((stage, k) => (
              <button
                key={stage.name}
                ref={(el) => {
                  tabRefs.current[k] = el;
                }}
                type="button"
                role="tab"
                id={`abx-tab-${k + 1}`}
                aria-controls={`abx-panel-${k + 1}`}
                aria-selected={k === cur}
                tabIndex={k === cur ? 0 : -1}
                className={`abx-step${k === cur ? " is-active" : ""}${
                  k < cur ? " is-done" : ""
                }${k === cur && playing ? " is-playing" : ""}`}
                onClick={() => goTo(k)}
                onKeyDown={onTabKey}
              >
                <span className="abx-step-dot">
                  {String(k + 1).padStart(2, "0")}
                </span>
                <span className="abx-step-text">
                  <strong>{stage.name}</strong>
                  <small>{stage.short}</small>
                </span>
                <span className="abx-step-timer" aria-hidden="true">
                  <span></span>
                </span>
              </button>
            ))}
          </div>

          <div className="abx-panels">
            {stages.map((stage, k) => (
              <div
                key={stage.name}
                role="tabpanel"
                id={`abx-panel-${k + 1}`}
                aria-labelledby={`abx-tab-${k + 1}`}
                hidden={k !== cur}
                className={`abx-panel${k === cur ? " is-active" : ""}`}
              >
                <div className="abx-panel-top">
                  <span className="abx-panel-icon">
                    <i className={stage.icon}></i>
                  </span>
                  <span className="abx-panel-num">
                    {String(k + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="abx-panel-title">{stage.name}</h3>
                <p className="abx-panel-text">{stage.text}</p>
                <ul className="abx-chips">
                  {stage.chips.map((chip) => (
                    <li key={chip.label}>
                      <i className={chip.icon}></i>
                      {chip.label}
                    </li>
                  ))}
                </ul>
                {stage.live && (
                  <div className="abx-live">
                    <span className="abx-live-dot"></span>
                    {el.liveLabel}
                  </div>
                )}
              </div>
            ))}

            <div className="abx-panel-foot">
              <div className="abx-nav">
                <button
                  type="button"
                  className="abx-nav-btn"
                  aria-label={el.prevAria}
                  onClick={() => goTo(cur - 1)}
                >
                  <i className="fa-solid fa-chevron-left rtl:rotate-180"></i>
                </button>
                <span className="abx-count">
                  <b>{cur + 1}</b> / {total}
                </span>
                <button
                  type="button"
                  className="abx-nav-btn"
                  aria-label={el.nextAria}
                  onClick={() => goTo(cur + 1)}
                >
                  <i className="fa-solid fa-chevron-right rtl:rotate-180"></i>
                </button>
              </div>
              <Link href={`${localeBase(lang)}/contact`} className="abx-btn">
                {el.cta}{" "}
                <i className="fa-solid fa-arrow-right rtl:rotate-180"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
