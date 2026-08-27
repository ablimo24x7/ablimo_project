import type { Metadata } from "next";
import IndustryPage, { type IndustryContent } from "../_components/IndustryPage";

export const metadata: Metadata = {
  title: "Hospitality Ground Transport for Hotels & Resorts | AB.Limo",
  description:
    "Bespoke transit partnerships for luxury hotels, resorts, and 5-star concierge teams by AB.Limo.",
};

const content: IndustryContent = {
  badge: "Hospitality & Concierge",
  title: "Hospitality Ground Mobility",
  subtitle:
    "Seamless guest transport partnerships that elevate the luxury hotel and resort experience.",
  heroImage:
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=800&fit=crop",
  ctaTitle: "Partner With Our Hospitality Team",
  ctaDesc:
    "Speak with our hospitality liaison about a guest transport partnership for your property.",
  ctaLabel: "Request Partnership Details",
  features: [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: "Concierge-Level Service",
      desc: "Discreet, gracious chauffeurs trained to represent your property's standards at every doorstep.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Premium Guest Fleet",
      desc: "A curated fleet of luxury sedans, SUVs, and vans that complement your brand and impress your guests.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "Guest Journey Orchestration",
      desc: "From airport pickup to sightseeing and gala evenings, your guests are cared for at every turn.",
    },
  ],
  cardsHeading: "Hospitality Solutions",
  cardsDesc:
    "Turn guest transport into a signature part of the five-star stay.",
  cards: [
    {
      image:
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=500&fit=crop",
      tag: "Arrivals",
      title: "VIP Guest Transfers",
      desc: "Elegant airport and private-jet arrivals that set the tone for an exceptional stay.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&h=500&fit=crop",
      tag: "Concierge",
      title: "Concierge On-Demand",
      desc: "Hourly and as-directed transport responding to your concierge team's every guest request.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&h=500&fit=crop",
      tag: "Resorts",
      title: "Resort & Amenity Runs",
      desc: "Seamless transfers to beaches, golf courses, spas, and local attractions for resort guests.",
    },
  ],
  sections: [
    {
      image:
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop",
      imageAlt: "Luxury hotel lobby and concierge",
      title: "Transport as a Mark of Hospitality",
      dark: true,
      paragraphs: [
        "For discerning guests, the journey shapes the stay. AB.Limo partners with luxury hotels and resorts to deliver transport that is as refined as the property itself.",
        "Our chauffeurs arrive immaculate and gracious, treating every guest as a principal and every trip as a privilege to be honoured.",
      ],
      bullets: [
        { text: "Dedicated partnership liaison for your property" },
        { text: "White-glove, presentation-conscious chauffeurs" },
        { text: "Flexible billing tailored to hotel operations" },
      ],
    },
  ],
  faqs: [
    {
      q: "Can transport be branded or aligned to our hotel's standards?",
      a: "Yes. We tailor vehicle choice, chauffeur presentation, and service style to match your property's brand and service standards.",
    },
    {
      q: "Do you integrate with our concierge team?",
      a: "We provide a direct liaison and simple booking channel so your concierge team can arrange guest transport seamlessly.",
    },
    {
      q: "Can you handle large guest movements like conferences or galas?",
      a: "We coordinate everything from single VIP transfers to multi-guest movements for conferences, galas, and special events.",
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
      breadcrumb="Hospitality"
    />
  );
}
