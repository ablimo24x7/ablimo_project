"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Dictionary, localeBase } from "@/app/[lang]/dictionaries";

const tileMeta = [
  { icon: "fa-calendar-check", path: "/industries" },
  { icon: "fa-landmark", path: "/industries/government-diplomatic" },
  { icon: "fa-plane-departure", path: "/industries/aviation" },
  { icon: "fa-industry", path: "/industries" },
  { icon: "fa-hotel", path: "/industries/hospitality" },
  { icon: "fa-trophy", path: "/industries" },
  { icon: "fa-building", path: "/industries/corporate-enterprise" },
];

export default function IndustrySolutionsSection({
  dict,
  lang = "en-US",
}: {
  dict: Dictionary;
  lang?: string;
}) {
  const el = dict.home.industrySolutions;
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const revealEls = Array.from(root.querySelectorAll<HTMLElement>(".abx-reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((elm) => {
      const parent = elm.parentElement;
      if (parent?.classList.contains("abx-ind-grid")) {
        const idx = Array.prototype.indexOf.call(parent.children, elm);
        elm.style.transitionDelay = `${idx * 70}ms`;
      }
      io.observe(elm);
    });

    const tiles = Array.from(root.querySelectorAll<HTMLElement>(".abx-tile"));
    const onMove = (e: PointerEvent) => {
      const t = e.currentTarget as HTMLElement;
      const r = t.getBoundingClientRect();
      t.style.setProperty("--mx", `${e.clientX - r.left}px`);
      t.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    tiles.forEach((t) => t.addEventListener("pointermove", onMove));

    return () => {
      io.disconnect();
      tiles.forEach((t) => t.removeEventListener("pointermove", onMove));
    };
  }, []);

  return (
    <section
      id="industries"
      ref={rootRef}
      className="abx-ind py-24 bg-[#0a0a0a] border-b border-gray-900 relative z-20 overflow-hidden"
    >
      <div className="abx-ind-glow" aria-hidden="true"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="abx-head abx-reveal">
          <div>
            <p className="text-sm font-bold tracking-widest text-abBlue uppercase mb-3">
              {el.badge}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">{el.title}</h2>
          </div>
          <p className="abx-head-note">{el.note}</p>
        </div>

        <div className="abx-ind-grid">
          {el.items.map((item, i) => {
            const meta = tileMeta[i] || { icon: "fa-circle-check", path: "/industries" };
            return (
              <Link
                key={item.title}
                href={`${localeBase(lang)}${meta.path}`}
                className="abx-tile abx-reveal"
              >
                <span className="abx-tile-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="abx-tile-icon">
                  <i className={`fa-solid ${meta.icon}`}></i>
                </span>
                <h3 className="abx-tile-title">{item.title}</h3>
                <p className="abx-tile-desc">{item.desc}</p>
                <span className="abx-tile-cta">
                  {el.exploreCta}{" "}
                  <span className="abx-arrow">
                    <i
                      className={`fa-solid fa-arrow-right text-[11px] rtl:rotate-180`}
                    ></i>
                  </span>
                </span>
              </Link>
            );
          })}

          <Link
            href={`${localeBase(lang)}/contact`}
            className="abx-tile abx-tile-cta-card abx-reveal"
          >
            <span className="abx-tile-icon">
              <i className="fa-solid fa-headset"></i>
            </span>
            <h3 className="abx-tile-title">{el.ctaCard.title}</h3>
            <p className="abx-tile-desc">{el.ctaCard.desc}</p>
            <span className="abx-tile-cta">
              {el.ctaCard.cta}{" "}
              <span className="abx-arrow">
                <i
                  className={`fa-solid fa-arrow-right text-[11px] rtl:rotate-180`}
                ></i>
              </span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
