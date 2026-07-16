"use client";

import { useState } from "react";

const faqItems = [
  {
    question: "What documents do I need to hire a chauffeur?",
    answer:
      "To hire a chauffeur, you'll need a valid driver's license, a government-issued ID or passport, and a credit or debit card. In some cases, international travelers may also need to present an International Driving Permit (IDP).",
  },
  {
    question: "What is the minimum age to book a car?",
    answer:
      "The minimum age to book a car is typically 21 years old. However, drivers between 21 and 24 may incur a young driver surcharge and may be limited to certain vehicle categories depending on local policies.",
  },
  {
    question: "Do I need a credit card to book a car?",
    answer:
      "Most rental companies require a credit card for the security deposit. Some may accept debit cards, but you might need to meet extra requirements, such as additional ID verification or proof of return travel.",
  },
  {
    question: "Is fuel included in the booking price?",
    answer:
      "Fuel is generally not included in booking price. You're expected to return the vehicle with the same fuel level it had when picked up. Some companies offer prepaid fuel options for convenience.",
  },
  {
    question: "Can I change or cancel my reservation?",
    answer:
      "Yes, reservations can usually be changed or canceled. However, cancellation policies vary — some bookings may be refundable, while others might involve a fee. Always review the terms before confirming.",
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(1);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-[#1a1b20] py-24 px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 relative z-10">
        {/* Left Column: Title & Button */}
        <div className="lg:w-1/3 flex flex-col justify-start">
          <h4 className="text-gray-300 font-semibold tracking-[0.15em] text-xs mb-6 uppercase">
            Frequently Asked Questions
          </h4>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
            Answer to all the Frequently
            <br />
            <span className="italic font-serif font-light opacity-90">
              Asked Questions
            </span>
          </h2>
          <div>
            <button className="bg-[#3a3c46] hover:bg-[#4a4c56] text-white border border-gray-600 px-8 py-3 text-sm font-semibold rounded-full transition-all duration-300 shadow-lg">
              ASK MORE QUESTIONS
            </button>
          </div>
        </div>

        {/* Right Column: Accordion */}
        <div className="lg:w-2/3">
          <div className="border-t border-gray-700/50">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className={`faq-item border-b border-gray-700/50 group ${
                  activeIndex === index ? "active" : ""
                }`}
              >
                <button
                  className="w-full flex justify-between items-center py-6 text-left focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="text-xl font-semibold text-gray-100 group-hover:text-white transition-colors">
                    {item.question}
                  </h3>
                  <div
                    className={`w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center flex-shrink-0 transition-all duration-300 faq-icon text-gray-400 group-hover:border-white group-hover:text-white`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {activeIndex === index ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 12H4"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      )}
                    </svg>
                  </div>
                </button>
                <div
                  className={`faq-answer text-gray-400 text-sm leading-relaxed overflow-hidden transition-all duration-300 ${
                    activeIndex === index ? "max-h-96 py-4 opacity-100" : "max-h-0 py-0 opacity-0"
                  }`}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Car Line Art */}
      <div className="absolute bottom-0 left-0 w-full h-[250px] opacity-20 pointer-events-none z-0">
        <svg
          viewBox="0 0 1000 300"
          preserveAspectRatio="xMidYMax meet"
          className="w-full h-full text-gray-400"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            d="M -100 280 C 50 290, 150 250, 200 220 C 220 200, 250 170, 300 160 C 350 150, 450 140, 500 160 C 550 180, 600 200, 650 220 C 700 240, 750 220, 800 210 C 850 200, 950 210, 1100 220 M 200 220 L 220 250 M 650 220 L 630 250"
          />
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 180 250 C 180 210, 200 170, 280 150 C 350 130, 480 130, 550 150 C 630 170, 650 210, 650 250 M 180 250 L 150 250 C 130 250, 120 220, 140 200 C 150 180, 200 160, 250 150 M 650 250 L 680 250 C 700 250, 720 220, 700 200 C 680 180, 600 160, 550 150 M 280 150 L 350 100 L 480 100 L 550 150 M 350 100 L 350 150 M 450 100 L 450 150"
          />
          <circle
            cx="230"
            cy="250"
            r="30"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          />
          <circle
            cx="230"
            cy="250"
            r="10"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          />
          <circle
            cx="600"
            cy="250"
            r="30"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          />
          <circle
            cx="600"
            cy="250"
            r="10"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          />
        </svg>
      </div>
    </section>
  );
}
