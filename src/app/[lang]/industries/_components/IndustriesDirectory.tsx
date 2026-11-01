"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { localeBase, localeHome } from "@/app/[lang]/dictionaries";
import { SKETCH_INDUSTRIES, HUB_STEPS, HUB_FAQS } from "./industries-sketch";

function TexturePanel({ id }: { id: string }) {
  return (
    <svg width="100%" height="100%" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <pattern
          id={`itx-${id}`}
          width="30"
          height="30"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <rect width="30" height="30" fill="#1c1d21" />
          <path d="M0 0H30M0 0V30" stroke="#2a2c35" strokeWidth="1" strokeDasharray="3 2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#itx-${id})`} />
    </svg>
  );
}

export default function IndustriesDirectory({ lang }: { lang: string }) {
  const base = localeBase(lang);
  const home = localeHome(lang);
  const [active, setActive] = useState(SKETCH_INDUSTRIES[0].id);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
    <>
      {/* 7 Industries Directory */}
      <section className="max-w-7xl mx-auto px-8 pt-[72px] pb-24 border-b border-gray-800">
        <div className="flex flex-wrap gap-x-14 gap-y-10 items-start">
          <nav
            aria-label="Industries on this page"
            className="hidden lg:flex sticky top-24 flex-1 min-w-[240px] max-w-[280px] flex-col border-l border-gray-700"
          >
            {SKETCH_INDUSTRIES.map((s) => {
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
                    {s.num}
                  </span>
                  {s.name}
                </a>
              );
            })}
            <Link
              href={`${base}/contact`}
              className="mt-7 ml-5 text-xs tracking-[0.18em] uppercase text-white hover:text-abBlue transition-colors"
            >
              Not sure where you fit? &rarr;
            </Link>
          </nav>

          <div className="flex-[999] min-w-0 flex flex-col gap-16 lg:gap-28">
            {SKETCH_INDUSTRIES.map((s) => (
              <article key={s.id} id={s.id} data-svc={s.id} className="scroll-mt-28">
                <div className="relative h-[440px]">
                  <div className="absolute left-0 top-0 w-[42%] h-[78%] overflow-hidden bg-[#1c1d21]">
                    <TexturePanel id={s.id} />
                  </div>
                  <div className="absolute right-0 bottom-0 w-[76%] h-[82%] overflow-hidden bg-abDarkGray">
                    <Image
                      src={s.img}
                      alt={s.imgAlt}
                      fill
                      className="object-cover"
                      style={{ objectPosition: s.pos }}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-x-14 gap-y-8 mt-10">
                  <div className="flex-1 min-w-[240px]">
                    <p className="m-0 text-[13px] tracking-[0.22em] uppercase text-abBlue">
                      {s.num}
                    </p>
                    <h2 className="mt-2.5 text-3xl md:text-4xl font-bold leading-tight">
                      {s.name}
                    </h2>
                  </div>
                  <div className="flex-[1.4] min-w-[260px]">
                    <p className="m-0 text-[17px] leading-relaxed text-gray-300">{s.intro}</p>
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
                      {s.ctaLabel}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Mid-page Not sure where you fit? callout */}
      <section className="max-w-7xl mx-auto px-8 py-16 border-b border-gray-800">
        <div className="p-8 md:p-12 rounded-2xl bg-[#1c1d21] border border-gray-800 flex flex-wrap items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Not sure where you fit?
            </h2>
            <p className="mt-3 text-base text-gray-300 leading-relaxed">
              Talk to a planner about transportation services and tailored solutions for
              your industry, including programmes that span multiple sectors.
            </p>
          </div>
          <Link
            href={`${base}/contact`}
            className="inline-flex items-center min-h-[52px] px-8 bg-abBlue hover:bg-abServiceBlue text-white text-sm font-semibold rounded-full transition-colors shadow-lg shadow-abBlue/20"
          >
            Talk to a planner
          </Link>
        </div>
      </section>

      {/* How we work — One Operational Standard */}
      <section className="bg-[#1c1d21] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-8 py-20">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-abBlue">
            How we work
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white max-w-4xl">
            One Operational Standard for Transportation Services by Industry
          </h2>
          <p className="mt-5 text-base md:text-lg text-gray-300 leading-relaxed max-w-4xl">
            AB brings every sector under one standard through a 24/7 operations centre in
            Riyadh. Our managed transportation approach coordinates ground transportation,
            dispatch and GPS tracking across Saudi Arabia, the UAE and Qatar. Clients
            benefit from consistent duty of care, a dedicated account manager, one
            consolidated invoice and clear reporting. Explore our{" "}
            <Link
              href={`${base}/services`}
              className="text-abBlue hover:underline font-medium"
            >
              transportation services
            </Link>{" "}
            to see how the operating standard supports each programme.
          </p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {HUB_STEPS.map((step) => (
              <div
                key={step.num}
                className="pt-6 border-t border-gray-800 flex flex-col gap-3"
              >
                <span className="text-4xl md:text-5xl font-bold text-abBlue leading-none">
                  {step.num}
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">{step.title}</h3>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-12 pt-8 border-t border-gray-800 text-sm md:text-base text-gray-300">
            Review delivery examples in our{" "}
            <Link
              href={`${home}#case-studies`}
              className="text-abBlue hover:underline font-semibold"
            >
              Case Studies
            </Link>{" "}
            before finalising corporate tenders.
          </p>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-8 py-20">
        <p className="text-xs font-bold tracking-[0.22em] uppercase text-abBlue">
          Questions
        </p>
        <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white">
          Frequently Asked Questions About Transportation Services by Industry
        </h2>

        <div className="mt-10 divide-y divide-gray-800 border-y border-gray-800">
          {HUB_FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="py-4">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 py-2 text-left bg-transparent border-0 cursor-pointer"
                >
                  <span className="text-lg md:text-xl font-semibold text-white">
                    {faq.q}
                  </span>
                  <span className="text-2xl text-abBlue font-light shrink-0">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <p className="mt-3 text-base text-gray-300 leading-relaxed max-w-3xl">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
