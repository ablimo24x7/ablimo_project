"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
}

interface CaseStudiesFaqProps {
  faqs: FaqItem[];
}

export function CaseStudiesFaq({ faqs }: CaseStudiesFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`border rounded-xl transition-colors duration-200 overflow-hidden ${
              isOpen
                ? "bg-[#222329] border-[#3b82f6]/40 shadow-lg shadow-black/20"
                : "bg-[#1c1d22] border-white/10 hover:border-white/20"
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between text-left px-6 py-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-abBlue/60"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-lg text-white pr-4">
                {faq.question}
              </span>
              <span
                className={`p-1.5 rounded-full bg-white/5 transition-transform duration-300 text-gray-400 ${
                  isOpen ? "rotate-180 text-abBlue bg-abBlue/10" : ""
                }`}
              >
                <ChevronDown className="w-5 h-5" />
              </span>
            </button>
            {isOpen && (
              <div className="px-6 pb-6 pt-1 text-gray-300 text-base leading-relaxed border-t border-white/5">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
