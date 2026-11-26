"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Dictionary } from "@/app/[lang]/dictionaries";

interface AwardItem {
  id: string;
  badge: string;
  badgeAr: string;
  title: string;
  titleAr: string;
  sub: string;
  subAr: string;
  caption: string;
  captionAr: string;
  image: string;
  alt: string;
  altAr: string;
  isWide?: boolean;
}

const awardsList: AwardItem[] = [
  {
    id: "wlta-2025",
    badge: "2025 Winner",
    badgeAr: "الفائز، 2025",
    title: "World Luxury Travel Awards",
    titleAr: "جوائز السفر الفاخر العالمية (World Luxury Travel Awards)",
    sub: "Chauffeur Company, Middle East & North Africa",
    subAr: "أفضل شركة فاخرة لخدمات السائق الخاص في الشرق الأوسط وشمال أفريقيا",
    caption:
      "World Luxury Travel Awards — 2025 Winner, Chauffeur Company, Middle East & North Africa",
    captionAr:
      "جوائز السفر الفاخر العالمية (World Luxury Travel Awards) — الفائز، 2025، أفضل شركة فاخرة لخدمات السائق الخاص في الشرق الأوسط وشمال أفريقيا",
    image: "/awards/world-luxury-travel-awards-2025.jpg",
    alt: "World Luxury Travel Awards 2025 Winner certificate",
    altAr: "شهادة الفوز بجوائز السفر الفاخر العالمي لعام 2025",
  },
  {
    id: "entrepreneur-gulf",
    badge: "Company of the Year 2025",
    badgeAr: "شركة العام، 2025",
    title: "Entrepreneur Gulf",
    titleAr: "Entrepreneur Gulf",
    sub: "Transportation & Events Support Services",
    subAr: "جائزة التميّز في خدمات النقل ودعم الفعاليات",
    caption:
      "Entrepreneur Gulf — Company of the Year 2025, Transportation & Events Support Services",
    captionAr:
      "Entrepreneur Gulf — شركة العام، 2025، جائزة التميّز في خدمات النقل ودعم الفعاليات",
    image: "/awards/entrepreneur-gulf-2025.jpg",
    alt: "Entrepreneur Gulf Company of the Year 2025 certificate",
    altAr: "شهادة شركة العام 2025 من مجلة Entrepreneur الخليج",
  },
  {
    id: "eventex-bronze",
    badge: "Bronze",
    badgeAr: "الفائز بالجائزة البرونزية، 2024",
    title: "Eventex Awards",
    titleAr: "جوائز إيفنتكس (Eventex Awards)",
    sub: "Events Transportation Company",
    subAr: "مورّد عالمي لخدمات الفعاليات وشريك في الخدمات اللوجستية للنقل",
    caption: "Eventex Awards — Bronze, Events Transportation Company",
    captionAr:
      "جوائز إيفنتكس (Eventex Awards) — الفائز بالجائزة البرونزية، 2024، مورّد عالمي لخدمات الفعاليات وشريك في الخدمات اللوجستية للنقل",
    image: "/awards/eventex-bronze-2025.jpg",
    alt: "Eventex Awards Bronze certificate",
    altAr: "شهادة الميدالية البرونزية من جوائز Eventex",
  },
  {
    id: "gpn-member",
    badge: "Member 2025",
    badgeAr: "عضو معتمد 2025",
    title: "Global Passenger Network",
    titleAr: "الشبكة العالمية لنقل الركاب (GPN)",
    sub: "International association of trusted ground transport providers",
    subAr: "المنظمة الدولية لنخبة مزودي النقل البري المعتمدين عالمياً",
    caption: "Global Passenger Network (GPN) — Member in good standing, 2025",
    captionAr: "الشبكة العالمية لنقل الركاب (GPN) — شهادة العضوية المعتمدة لعام 2025",
    image: "/awards/global-passenger-network.jpg",
    alt: "Global Passenger Network membership certificate 2025",
    altAr: "شهادة عضوية الشبكة العالمية لنقل الركاب لعام 2025",
  },
  {
    id: "ceremony",
    badge: "On stage",
    badgeAr: "التكريم الرسمي",
    title: "Award ceremony",
    titleAr: "حفل التكريم",
    sub: "Accepting the World Luxury Travel Award",
    subAr: "استلام جائزة السفر الفاخر العالمي على مسرح التكريم",
    caption: "World Luxury Travel Awards — award ceremony",
    captionAr: "جوائز السفر الفاخر العالمي — حفل التكريم الرسمي",
    image: "/awards/award-ceremony.jpg",
    alt: "AB team receiving the World Luxury Travel Award on stage",
    altAr: "فريق AB يتسلم جائزة السفر الفاخر العالمي على المسرح",
    isWide: true,
  },
];

const marqueeClients = [
  "Riyadh Season",
  "Formula 1",
  "Formula E",
  "Dakar Rally",
  "FIFA World Cup Qatar 2022",
  "Esports World Cup",
  "LIV Golf",
  "UFC",
  "WWE",
  "Live Nation",
  "NEOM",
  "MDL Beast",
  "Azimuth",
  "AlUla",
  "Diriyah Season",
  "Etihad Arena",
  "Extreme E",
  "ESL",
  "adidas",
  "Siemens Energy",
  "ADIPEC",
  "Roshn",
];

const subscribeReduce = (onChange: () => void) => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};

const subscribeHover = (onChange: () => void) => {
  const mq = window.matchMedia("(hover: hover)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};

export default function AwardsSection({
  dict,
  lang = "en-US",
}: {
  dict: Dictionary;
  lang?: string;
}) {
  const aw = dict.home.awards;
  const isAr = lang === "ar";

  const [activeAward, setActiveAward] = useState<AwardItem | null>(null);
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const reduce = useSyncExternalStore(
    subscribeReduce,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
  const hoverable = useSyncExternalStore(
    subscribeHover,
    () => window.matchMedia("(hover: hover)").matches,
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
      { threshold: 0.12 }
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const els = counterRefs.current.filter(Boolean) as HTMLSpanElement[];
    if (!els.length) return;
    const run = (el: HTMLSpanElement) => {
      const target = Number(el.dataset.count || 0);
      if (reduce) {
        el.textContent = String(target);
        return;
      }
      let start: number | null = null;
      const step = (ts: number) => {
        if (start === null) start = ts;
        const p = Math.min((ts - start) / 1600, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = String(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if (!("IntersectionObserver" in window)) {
      els.forEach(run);
      return;
    }
    const co = new IntersectionObserver(
      (entries, obs) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            run(e.target as HTMLSpanElement);
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.6 }
    );
    els.forEach((el) => co.observe(el));
    return () => co.disconnect();
  }, [reduce]);

  useEffect(() => {
    if (activeAward) {
      document.body.style.overflow = "hidden";
      closeBtnRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
  }, [activeAward]);

  const openAward = (award: AwardItem) => {
    lastFocusRef.current = document.activeElement as HTMLElement | null;
    setActiveAward(award);
  };

  const closeAward = () => {
    setActiveAward(null);
    lastFocusRef.current?.focus();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAward();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const onTiltMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (reduce || !hoverable) return;
    const a = e.currentTarget;
    const r = a.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    a.style.transform = `perspective(900px) rotateX(${-y * 6}deg) rotateY(${
      x * 6
    }deg) translateY(-4px)`;
  };

  const onTiltLeave = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = "";
  };

  const revealCls = revealed ? " is-in" : "";

  return (
    <section
      id="awards"
      className="abx-aw py-24 bg-abBlack border-b border-gray-900 relative z-20 overflow-hidden"
      ref={sectionRef}
    >
      <div className="abx-ind-glow" aria-hidden="true"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`abx-head abx-reveal${revealCls}`}>
          <div>
            <p className="text-sm font-bold tracking-widest text-abBlue uppercase mb-3">
              {aw.badge}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {aw.title}
            </h2>
          </div>
          <p className="abx-head-note">{aw.desc}</p>
        </div>

        <div className={`abx-counters abx-reveal${revealCls}`}>
          {aw.counters.map((c, idx) => (
            <div className="abx-counter" key={idx}>
              <b>
                <span data-count={c.value} ref={(el) => { counterRefs.current[idx] = el; }}>
                  0
                </span>
                {c.suffix}
              </b>
              <small>{c.label}</small>
            </div>
          ))}
        </div>

        <div className="abx-aw-layout">
          <div className={`abx-aw-record abx-reveal${revealCls}`}>
            <h3>{aw.recordTitle}</h3>
            <ul className="abx-checks">
              {aw.recordItems.map((item, idx) => (
                <li key={idx}>
                  <i className="fa-solid fa-check"></i> {item}
                </li>
              ))}
            </ul>
            <p>{aw.recordDesc}</p>
            <div className="abx-aw-feature">
              <span className="abx-tile-icon">
                <i className="fa-solid fa-trophy"></i>
              </span>
              <div>
                <strong>{aw.bestSupplier.title}</strong>
                <small>{aw.bestSupplier.sub}</small>
              </div>
            </div>
          </div>

          <div className="abx-aw-grid">
            {awardsList.map((award, idx) => (
              <button
                key={award.id}
                type="button"
                className={`abx-award abx-reveal${revealCls}${
                  award.isWide ? " abx-award-wide" : ""
                }`}
                style={{ transitionDelay: `${idx * 80}ms` }}
                onClick={() => openAward(award)}
                onPointerMove={onTiltMove}
                onPointerLeave={onTiltLeave}
              >
                <span className="abx-award-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={award.image}
                    alt={isAr ? award.altAr : award.alt}
                    loading="lazy"
                  />
                </span>
                <span className="abx-award-meta">
                  <span className="abx-award-badge">
                    {isAr ? award.badgeAr : award.badge}
                  </span>
                  <strong>{isAr ? award.titleAr : award.title}</strong>
                  <small>{isAr ? award.subAr : award.sub}</small>
                </span>
                <span className="abx-award-zoom">
                  <i className="fa-solid fa-magnifying-glass-plus"></i>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className={`abx-clients abx-reveal${revealCls}`}>
          <p className="abx-clients-label">{aw.clientsLabel}</p>
          <div className="abx-marquee" aria-label={aw.clientsLabel}>
            <div className="abx-marquee-track">
              {[0, 1].map((copy) =>
                marqueeClients.map((name) => (
                  <span
                    key={`${copy}-${name}`}
                    aria-hidden={copy === 1 ? true : undefined}
                  >
                    {name}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {activeAward &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="abx-modal abx-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={aw.badge}
          >
            <div className="abx-modal-backdrop" data-close onClick={closeAward} />
            <figure className="abx-lb-box">
              <button
                type="button"
                className="abx-modal-close"
                data-close
                aria-label={aw.lightboxClose}
                onClick={closeAward}
                ref={closeBtnRef}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeAward.image}
                alt={isAr ? activeAward.altAr : activeAward.alt}
              />
              <figcaption>
                {isAr ? activeAward.captionAr : activeAward.caption}
              </figcaption>
            </figure>
          </div>,
          document.body
        )}
    </section>
  );
}
