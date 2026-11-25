"use client";

import * as React from "react";
import Link from "next/link";
import { Dictionary, localeBase } from "@/app/[lang]/dictionaries";

export default function FAQSection({
  dict,
  lang = "en-US",
}: {
  dict: Dictionary;
  lang?: string;
}) {
  const faq = dict.home.faq;
  const isAr = lang === "ar";
  const items = faq.items || [];

  if (!items.length) return null;

  return (
    <section id="faq" className="py-24 bg-abBlack border-b border-gray-900 relative z-20">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
              },
            })),
          }),
        }}
      />


      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-abBlue uppercase mb-3">
            {faq.title}
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {faq.heading1} <span className="text-abBlue">{faq.heading2}</span>
          </h3>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {items.map((item, index) => (
            <FaqItem
              key={index}
              question={item.q}
              answer={item.a}
              defaultOpen={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({
  question,
  answer,
  defaultOpen = false,
}: {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <div className="bg-abDarkGray border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full text-start flex items-center justify-between cursor-pointer focus:outline-none"
        aria-expanded={open}
      >
        <span className="text-base sm:text-lg font-bold text-white pr-4 rtl:pr-0 rtl:pl-4 leading-snug">
          {question}
        </span>
        <svg
          className={`w-5 h-5 text-abBlue flex-shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-400 text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}
