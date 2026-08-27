import type { Metadata } from "next";
import ServicePage, { type ServiceContent } from "../_components/ServicePage";

export const metadata: Metadata = {
  title: "VIP, Diplomatic & Government Transport | AB.Limo",
  description:
    "High-security, protocol-driven chauffeur transport for dignitaries, heads of state, and diplomatic missions across the GCC.",
};

const content: ServiceContent = {
  title: "VIP, Diplomatic & Government",
  subtitle:
    "Discreet, secure, and protocol-driven transport for dignitaries, diplomatic missions, and government delegations.",
  heroImage:
    "https://images.unsplash.com/photo-1511974035430-5de47d3b95da?w=1920&h=800&fit=crop",
  ctaTitle: "Engage Our Protocol Transport Team",
  ctaDesc:
    "For government agencies, embassies, and high-profile principals requiring discreet and secure ground transport.",
  ctaLabel: "Request Protocol Services",
  features: [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Heightened Security",
      desc: "Swift, convoy-ready chauffeurs and fleet prepared for sensitive movements with stringent vetting.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Strict Discretion",
      desc: "Protocol-trained chauffeurs bound by confidentiality, appropriate for sensitive diplomatic movements.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "International Protocol",
      desc: "Deep familiarity with diplomatic protocol, convoy etiquette, and ceremonial requirements.",
    },
  ],
  cardsHeading: "Protocol & Security Solutions",
  cardsDesc:
    "Specialised transport services for the most demanding environments.",
  cards: [
    {
      image:
        "https://images.unsplash.com/photo-1515711665854-b2293e7a7a60?w=800&h=500&fit=crop",
      tag: "Convoys",
      title: "Coordinated Convoys",
      desc: "Multi-vehicle movements with advance route planning and radio coordination for complete synchronisation.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=500&fit=crop",
      tag: "Delegations",
      title: "Government Delegations",
      desc: "Comprehensive delegation transport accommodating principals, staff, security, and support personnel.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=500&fit=crop",
      tag: "Diplomatic",
      title: "Embassy & Diplomatic",
      desc: "Steady, professional transport for embassy staff, attachés, and visiting diplomats.",
    },
  ],
  sections: [
    {
      image:
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&h=600&fit=crop",
      imageAlt: "Protocol and government building",
      title: "Trusted by Those Who Can't Be Late",
      dark: true,
      paragraphs: [
        "For principals whose schedules carry protocol weight, there is no margin for error. AB.Limo's protocol transport division is built on advance planning, redundancy, and absolute reliability.",
        "Chauffeurs are screened, trained in discreet service, and prepared to adapt instantly to evolving itineraries and security requirements.",
      ],
      bullets: [
        { text: "Advance route reconnaissance and contingency planning" },
        { text: "Vetted, protocol-trained chauffeurs" },
        { text: "Coordination with accompanying security details" },
      ],
    },
  ],
  faqs: [
    {
      q: "Can you coordinate with our security detail?",
      a: "Yes. We work directly with your security team to synchronise movements, routes, and timings for a fully coordinated operation.",
    },
    {
      q: "Do you provide chauffeurs with diplomatic driving experience?",
      a: "Our protocol chauffeurs are selected and trained for diplomatic driving, discretion, and international protocol etiquette.",
    },
    {
      q: "Is this service available on short notice?",
      a: "While advance notice is preferred for comprehensive protocol planning, our dedicated team can mobilise for urgent requirements where possible.",
    },
  ],
};

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  return (
    <ServicePage
      params={params}
      content={content}
      breadcrumb="VIP, Diplomatic & Government"
    />
  );
}
