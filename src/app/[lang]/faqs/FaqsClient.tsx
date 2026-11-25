"use client";

import * as React from "react";
import Link from "next/link";
import { Database, ArrowDown, ChevronDown, Mail } from "lucide-react";
import type { FaqItem, FaqCategory } from "./faqData";
import { CATEGORY_META, CATEGORIES } from "./faqData";
import { localeBase } from "@/app/[lang]/dictionaries";

const ITEMS_PER_LOAD = 10;

interface FaqsClientProps {
  faqs: FaqItem[];
  lang: string;
}

export function FaqsClient({ faqs, lang }: FaqsClientProps) {
  const [activeCategory, setActiveCategory] = React.useState<FaqCategory>("all");
  const [visibleCount, setVisibleCount] = React.useState(ITEMS_PER_LOAD);
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const filteredFaqs = React.useMemo(() => {
    if (activeCategory === "all") return faqs;
    return faqs.filter((faq) => faq.cat === activeCategory);
  }, [activeCategory, faqs]);

  const visibleFaqs = filteredFaqs.slice(0, visibleCount);
  const hasMore = visibleCount < filteredFaqs.length;

  const handleCategoryChange = (cat: FaqCategory) => {
    setActiveCategory(cat);
    setVisibleCount(ITEMS_PER_LOAD);
    setOpenIndex(null);
  };

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
  };

  const getCategoryColor = (cat: string) => CATEGORY_META[cat]?.color || "#555";

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-[#0a0a0a] border-b border-gray-900 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 py-1.5 px-4 rounded-full bg-[#111] border border-gray-800 mb-6">
            <Database className="text-abBlue text-xs w-4 h-4" />
            <span className="text-gray-300 text-xs font-bold tracking-widest uppercase">
              Enterprise Procurement Database
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Master Knowledge Base <br />
            <span className="text-abBlue">& RFP Responses.</span>
          </h1>
          <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-2xl mx-auto">
            Comprehensive answers detailing our operational frameworks, Duty of Care protocols, event logistics capabilities, and corporate API integrations across the GCC.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="#faq-container"
              className="bg-[#111] border border-gray-700 text-white hover:border-abBlue px-6 py-3 rounded text-sm font-semibold transition-all"
            >
              Browse Categories{" "}
              <ArrowDown className="inline-block ml-2 text-abBlue w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-[#050505] min-h-screen relative" id="faq-container">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Sidebar Category Navigation */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-2">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 px-2">
                Knowledge Categories
              </h3>

              <button
                onClick={() => handleCategoryChange("all")}
                className={`w-full text-left px-5 py-4 rounded border text-sm font-bold text-gray-300 transition-colors flex items-center justify-between ${
                  activeCategory === "all"
                    ? "bg-[#111] border-abBlue text-white"
                    : "border-gray-800 hover:border-gray-600"
                }`}
              >
                <span>All Queries</span>
                <span className="text-gray-500 text-xs">&#9632;</span>
              </button>

              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`w-full text-left px-5 py-4 rounded border text-sm font-bold text-gray-300 transition-colors flex items-center justify-between ${
                    activeCategory === cat
                      ? "bg-[#111] text-white"
                      : "border-gray-800 hover:border-gray-600"
                  }`}
                  style={{
                    borderColor: activeCategory === cat ? CATEGORY_META[cat].color : undefined,
                  }}
                >
                  <span>{CATEGORY_META[cat].label}</span>
                  <span style={{ color: CATEGORY_META[cat].color }}>&#9679;</span>
                </button>
              ))}

              <div className="mt-8 p-6 bg-[#0a0a0a] border border-gray-800 rounded text-center">
                <p className="text-xs text-gray-400 mb-3">
                  Require a customized RFP response?
                </p>
              <Link
                href={`${localeBase(lang)}/contact`}
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-[#1a1b1f] transition hover:bg-gray-100"
              >
                Contact Enterprise Sales
              </Link>
              </div>
            </div>

            {/* FAQ Accordion List */}
            <div className="lg:col-span-8 relative">
              <div className="space-y-4">
                {visibleFaqs.map((faq, index) => {
                  const isOpen = openIndex === index;
                  const iconColor = getCategoryColor(faq.cat);

                  return (
                    <div
                      key={`${faq.cat}-${index}`}
                      className={`bg-[#0a0a0a] border rounded-lg overflow-hidden transition-colors ${
                        isOpen ? "border-gray-600" : "border-gray-800 hover:border-gray-600"
                      }`}
                    >
                      <button
                        onClick={() => handleToggle(index)}
                        className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                      >
                        <h2 className="text-lg font-bold text-white pr-4">{faq.q}</h2>
                        <ChevronDown
                          className="w-5 h-5 text-gray-500 flex-shrink-0"
                          style={{
                            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.3s ease, color 0.3s ease",
                            color: isOpen ? iconColor : undefined,
                          }}
                        />
                      </button>
                      <div
                        className="overflow-hidden"
                        style={{
                          maxHeight: isOpen ? "500px" : "0px",
                          opacity: isOpen ? 1 : 0,
                          transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.4s ease, opacity 0.4s ease",
                          padding: isOpen ? "0 1.5rem 1.5rem" : "0 1.5rem",
                        }}
                      >
                        <div className="border-t border-gray-800/50 mx-0 pt-4">
                          <p className="font-semibold text-gray-200 text-sm leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Load More */}
              <div className="mt-10 text-center">
                {hasMore ? (
                  <button
                    onClick={handleLoadMore}
                    className="bg-[#111] border border-gray-700 text-white hover:border-abBlue hover:text-abBlue px-8 py-3.5 rounded text-sm font-bold transition-all shadow-lg flex items-center justify-center mx-auto"
                  >
                    Load More Answers{" "}
                    <span className="ml-3 text-xs">&#8635;</span>
                  </button>
                ) : null}
                <p className="text-xs text-gray-500 mt-3 font-mono">
                  {hasMore
                    ? `Showing ${visibleCount} of ${filteredFaqs.length} answers.`
                    : `Showing all ${filteredFaqs.length} answers in this category.`}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 bg-[#0a0a0a] border border-gray-800 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Did not find the answer to your specific RFP requirement?
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Our enterprise procurement team is available 24/7 to provide customized documentation regarding TGA compliance, SAP integration, and long-term fleet leases.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:hello@ab.limo"
                className="bg-[#111] border border-gray-700 text-white hover:border-abBlue hover:text-abBlue px-6 py-3 rounded text-sm font-semibold transition-all flex items-center"
              >
                <Mail className="w-4 h-4 mr-2" /> Email hello@ab.limo
              </a>
              <Link
                href={`${localeBase(lang)}/contact`}
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-[#1a1b1f] transition hover:bg-gray-100"
              >
                Open a Support Ticket
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
