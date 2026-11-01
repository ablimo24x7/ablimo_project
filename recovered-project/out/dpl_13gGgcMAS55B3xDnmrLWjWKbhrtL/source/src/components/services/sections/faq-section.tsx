"use client";

import * as React from "react";
import Link from "next/link";
import { getIcon } from "./section-icons";
import type { PageSection } from "./section-types";

interface FAQSectionProps {
  section: PageSection;
}

const PADDING_CLASSES = {
  none: "",
  sm: "py-12",
  md: "py-16",
  lg: "py-24",
  xl: "py-32",
} as const;

export default function FAQSection({ section }: FAQSectionProps) {
  const c = section.content as Record<string, unknown>;
  const items = (c.items || []) as Array<{
    id: string; question: string; answer: string;
  }>;
  const actions = (section.items || []) as Array<{
    label: string; href: string; style: string; icon?: string;
  }>;
  const appearance = section.appearance as Record<string, unknown>;

  const bgClass = appearance.theme === "darker" ? "bg-abBlack" : "bg-abDarkGray";
  const padding = (appearance.padding as string) || "lg";
  const border = appearance.border === "true" || appearance.border === true;
  const textAlign = (appearance.textAlign as string) || "center";

  const textAlignClass = textAlign === "center" ? "text-center" : textAlign === "left" ? "text-left" : "text-right";

  return (
    <section id="faq" className={`${PADDING_CLASSES[padding as keyof typeof PADDING_CLASSES] || "py-24"} ${bgClass} ${border ? "border-t border-gray-800" : ""}`}>
      {/* JSON-LD Schema */}
      {items.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: items.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              })),
            }),
          }}
        />
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`${textAlignClass} mb-16`}>
          {(c.eyebrow as string) && (
            <h2 className="text-sm font-bold tracking-widest text-abServiceBlue uppercase mb-3">
              {c.eyebrow as string}
            </h2>
          )}
          {(c.heading as string) && (
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {c.heading as string}
            </h3>
          )}
          {(c.description as string) && (
            <p className="text-gray-400 text-lg">{c.description as string}</p>
          )}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {items.map((item) => (
            <FaqItem key={item.id} question={item.question} answer={item.answer} />
          ))}
        </div>

        {/* CTA Bar */}
        {actions.length > 0 && (
          <div className="mt-12 p-8 bg-gray-900 border border-gray-800 rounded-xl text-center flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-left">
              <h5 className="text-white font-bold text-lg">Still have questions?</h5>
              <p className="text-gray-400 text-sm mt-1">Our enterprise support team is available 24/7/365.</p>
            </div>
            <div className="flex gap-4">
              {actions.map((action, i) => {
                const iconEl = action.icon ? getIcon(action.icon, "w-4 h-4") : null;
                return (
                  <Link
                    key={i}
                    href={action.href || "#"}
                    className={`px-6 py-3 rounded text-sm font-semibold transition-colors flex items-center ${
                      action.style === "primary"
                        ? "bg-abServiceBlue hover:bg-sky-700 text-white"
                        : "bg-abDarkGray hover:bg-black border border-gray-700 text-white"
                    }`}
                  >
                    {action.label}
                    {iconEl && <span className="ml-2">{iconEl}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="bg-abDarkGray border border-gray-800 rounded-lg p-6 hover:border-gray-600 transition-colors">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full text-left flex items-center justify-between cursor-pointer"
      >
        <h4 className="text-lg font-bold text-white pr-4">{question}</h4>
        <svg
          className={`w-5 h-5 text-abServiceBlue flex-shrink-0 transition-transform duration-300 ${
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
