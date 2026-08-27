import type { Metadata } from "next";
import ServicePage, { type ServiceContent } from "../_components/ServicePage";

export const metadata: Metadata = {
  title: "Cross-Border Mobility | AB.Limo",
  description:
    "Long-distance and international cross-border road transport across the GCC, with full coordination of borders and documentation.",
};

const content: ServiceContent = {
  title: "Cross-Border Mobility",
  subtitle:
    "Long-distance and international road transport across GCC borders, coordinated end-to-end with full attention to detail.",
  heroImage:
    "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1920&h=800&fit=crop",
  ctaTitle: "Plan Your Cross-Border Journey",
  ctaDesc:
    "From Riyadh to Dubai to Muscat, our teams coordinate a seamless journey across borders for you and your group.",
  ctaLabel: "Enquire About Cross-Border Travel",
  features: [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      title: "Border Coordination",
      desc: "We manage border crossing logistics, documentation, and routing to make international journeys seamless.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Multi-Stop Routing",
      desc: "Complex multi-city and multi-country itineraries planned to optimise time, comfort, and fuel.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Long-Distance Comfort",
      desc: "Premium vehicles and experienced drivers keep you comfortable and refreshed on long road journeys.",
    },
  ],
  cardsHeading: "Cross-Border Routes",
  cardsDesc:
    "Seamless connectivity between the Gulf&apos;s major business and leisure hubs.",
  cards: [
    {
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=500&fit=crop",
      tag: "GCC",
      title: "Riyadh – Dubai",
      desc: "A flagship corridor connecting Saudi Arabia and the UAE with comfort and coordination.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&h=500&fit=crop",
      tag: "UAE",
      title: "Abu Dhabi & Doha",
      desc: "Cross-border connectivity between the UAE and Qatar for business and leisure travellers.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=800&h=500&fit=crop",
      tag: "Multinational",
      title: "Extended GCC Journeys",
      desc: "Multi-country programmes spanning several states with seamless handovers and support.",
    },
  ],
  sections: [
    {
      image:
        "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&h=600&fit=crop",
      imageAlt: "Long distance highway journey",
      title: "The Gulf, Uninterrupted",
      dark: true,
      paragraphs: [
        "Crossing borders should be an adventure, not an ordeal. AB.Limo removes the friction of long-distance international travel, handling the paperwork and route planning so you enjoy the journey.",
        "Whether it is a business delegation or a family road trip, our coordination ensures a smooth passage at every crossing.",
      ],
      bullets: [
        { text: "End-to-end border and documentation support" },
        { text: "Well-rested, long-haul experienced drivers" },
        { text: "Rest stops and route planning for comfort and safety" },
      ],
    },
  ],
  faqs: [
    {
      q: "Which cross-border routes do you operate?",
      a: "We coordinate journeys across the GCC, including major corridors between Saudi Arabia, the UAE, Qatar, Bahrain, Kuwait, and Oman.",
    },
    {
      q: "Who handles border documentation?",
      a: "Our teams coordinate the necessary arrangements and guidance for border crossings as part of the journey service.",
    },
    {
      q: "Can cross-border transport be combined with other services?",
      a: "Yes. We integrate cross-border journeys with airport transfers, events, and other AB.Limo services for a complete mobility plan.",
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
      breadcrumb="Cross-Border Mobility"
    />
  );
}
