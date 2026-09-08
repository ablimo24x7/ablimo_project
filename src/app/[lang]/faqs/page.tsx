import type { Metadata } from "next";
import { faqData, FAQ_SCHEMA } from "./faqData";
import { FaqsClient } from "./FaqsClient";

export const metadata: Metadata = {
  title: "Enterprise Mobility FAQs | AB.Limo Corporate Travel & Event Logistics",
  description:
    "Comprehensive knowledge base for AB.Limo's B2B mobility services. Find answers regarding chauffeur pricing, airport transfers, corporate transportation, event logistics, and GCC fleet capabilities.",
  keywords:
    "AB.Limo FAQ, chauffeur cost Riyadh, airport transfer Saudi Arabia, corporate transportation GCC, event logistics, VIP fleet vehicles, meet and greet airport",
  alternates: { canonical: "https://ab.limo/faqs" },
};

export default function FaqsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(FAQ_SCHEMA),
        }}
      />
      <FaqsClient faqs={faqData} />
    </>
  );
}
