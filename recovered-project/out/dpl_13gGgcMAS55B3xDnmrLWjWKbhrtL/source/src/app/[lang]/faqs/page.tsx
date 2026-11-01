import type { Metadata } from "next";
import { faqData, FAQ_SCHEMA } from "./faqData";
import { FaqsClient } from "./FaqsClient";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return generateSeoMetadata({
    title: "Enterprise Mobility FAQs | AB.Limo Corporate Travel & Event Logistics",
    description:
      "Comprehensive knowledge base for AB.Limo's B2B mobility services. Find answers regarding chauffeur pricing, airport transfers, corporate transportation, event logistics, and GCC fleet capabilities.",
    path: "/faqs",
    lang,
    keywords:
      "AB.Limo FAQ, chauffeur cost Riyadh, airport transfer Saudi Arabia, corporate transportation GCC, event logistics, VIP fleet vehicles, meet and greet airport",
  });
}

export default function FaqsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "FAQs", url: "/faqs" },
        ]}
      />
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
