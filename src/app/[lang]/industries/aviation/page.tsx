import type { Metadata } from "next";
import IndustryPage, { type IndustryContent } from "../_components/IndustryPage";

export const metadata: Metadata = {
  title: "Aviation Ground Transport for Crews & FBOs | AB.Limo",
  description:
    "Airline crew transfers, pilot logistics, and VIP lounge transit coordinated around flight schedules and layovers by AB.Limo.",
};

const content: IndustryContent = {
  badge: "Aviation & FBO Operations",
  title: "Aviation Ground Mobility",
  subtitle:
    "Precision crew transfers, pilot logistics, and VIP lounge transit synchronised with your flight operations.",
  heroImage:
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&h=800&fit=crop",
  ctaTitle: "Partner With Our Aviation Team",
  ctaDesc:
    "Speak with our aviation ground-handling specialists about a crew and FBO mobility programme.",
  ctaLabel: "Request Aviation Proposal",
  features: [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      ),
      title: "Flight-Synchronised",
      desc: "Crew transport positioned around rosters, layovers, and schedule changes with live flight coordination.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Crew Rosters, Done",
      desc: "Reliable, on-time transfers for cabin and flight crew, with drivers who understand aviation scheduling.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "FBO & Lounge Transit",
      desc: "VIP transfers between terminals, private aviation lounges, and fixed-base operator facilities.",
    },
  ],
  cardsHeading: "Aviation Solutions",
  cardsDesc:
    "Ground mobility designed around the rhythm of the flight deck.",
  cards: [
    {
      image:
        "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&h=500&fit=crop",
      tag: "Crew",
      title: "Airline Crew Transfers",
      desc: "Punctual transport between hotels, airports, and bases for cabin and flight crew worldwide.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1529074963764-98f45c47344b?w=800&h=500&fit=crop",
      tag: "Private Aviation",
      title: "Pilot & Flight Deck Logistics",
      desc: "Dedicated pilot transport and rotation support for commercial and private operators.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=500&fit=crop",
      tag: "VIP",
      title: "VIP Lounge & FBO Transit",
      desc: "Seamless, discreet connections between terminals, lounges, and fixed-base operator facilities.",
    },
  ],
  sections: [
    {
      image:
        "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?w=800&h=600&fit=crop",
      imageAlt: "Aircraft on the tarmac",
      title: "Rolling with the Flight Schedule",
      dark: true,
      paragraphs: [
        "Aviation runs on precision. So does our service. AB.Limo aligns ground transport with crew rosters, aircraft rotations, and the unpredictable shifts that define life at an airport.",
        "Our transport control room stays in sync with your operations team, repositioning vehicles instantly as schedules evolve.",
      ],
      bullets: [
        { text: "24/7 dispatch aligned to flight operations" },
        { text: "Drivers familiar with airside and terminal coordination" },
        { text: "Dedicated liaison for every airline or FBO account" },
      ],
    },
  ],
  faqs: [
    {
      q: "Can you accommodate irregular and delayed crew schedules?",
      a: "Yes. Our control room monitors operational changes and repositions vehicles to match updated crew timings in real time.",
    },
    {
      q: "Do you support both commercial airlines and private aviation?",
      a: "We serve commercial operators, private flights, and fixed-base operators with tailored crew and VIP ground solutions.",
    },
    {
      q: "Can ground transport be provided at multiple crew bases?",
      a: "Absolutely. Our network supports crew mobility across multiple bases and cities with a consistent service standard.",
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
      breadcrumb="Aviation"
    />
  );
}
