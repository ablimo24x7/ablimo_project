import type { Metadata } from "next";
import IndustryPage, { type IndustryContent } from "../_components/IndustryPage";

export const metadata: Metadata = {
  title: "Government & Diplomatic Ground Transport | AB.Limo",
  description:
    "High-security protocol transport for official delegations, dignitaries, and government transit by AB.Limo.",
};

const content: IndustryContent = {
  badge: "Government & Diplomatic Protocol",
  title: "Government & Diplomatic Mobility",
  subtitle:
    "High-security, protocol-driven transport for official delegations, dignitaries, and government transit.",
  heroImage:
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&h=800&fit=crop",
  ctaTitle: "Engage Our Protocol Team",
  ctaDesc:
    "For government agencies, embassies, and diplomatic missions requiring discreet, secure ground transport.",
  ctaLabel: "Request Protocol Services",
  features: [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Heightened Security",
      desc: "Convoy-ready chauffeurs and fleet prepared for sensitive movements with stringent vetting.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Official Delegations",
      desc: "Comprehensive delegation transport accommodating principals, staff, security, and support personnel.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "International Protocol",
      desc: "Deep familiarity with diplomatic protocol, convoy etiquette, and ceremonial transport requirements.",
    },
  ],
  cardsHeading: "Protocol & Security Solutions",
  cardsDesc:
    "Specialised government and diplomatic transport built for the most demanding environments.",
  cards: [
    {
      image:
        "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&h=500&fit=crop",
      tag: "Convoys",
      title: "Coordinated Convoys",
      desc: "Multi-vehicle movements with advance route planning and radio coordination.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&h=500&fit=crop",
      tag: "Delegations",
      title: "Official Delegations",
      desc: "Full delegation transport synchronised across international visits and summits.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1573666207082-ce6870c58062?w=800&h=500&fit=crop",
      tag: "Diplomatic",
      title: "Embassy & Diplomatic",
      desc: "Steady, professional transport for embassy staff, attachés, and visiting diplomats.",
    },
  ],
  sections: [
    {
      image:
        "https://images.unsplash.com/photo-1521790797515-4e522d54d311?w=800&h=600&fit=crop",
      imageAlt: "Government and protocol transport",
      title: "Trusted Where There Is No Margin for Error",
      dark: true,
      paragraphs: [
        "For government and diplomatic movements, logistics carry weight that exceeds the calendar. AB.Limo's protocol division is built on advance planning, redundancy, and absolute discretion.",
        "Chauffeurs are screened and trained for protocol duty, ready to adapt instantly to evolving itineraries and security requirements.",
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
      q: "Are chauffeurs experienced with diplomatic protocol?",
      a: "Our protocol chauffeurs are selected and trained for diplomatic driving, discretion, and international protocol etiquette.",
    },
    {
      q: "Can you handle large official delegations?",
      a: "We coordinate fleets and support vehicles to move principals and their entourages cohesively across any itinerary.",
    },
  ],
};

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  return (
    <IndustryPage
      params={params}
      content={content}
      breadcrumb="Government & Diplomatic"
    />
  );
}
