import type { Metadata } from "next";
import ServicePage, { type ServiceContent } from "../_components/ServicePage";

export const metadata: Metadata = {
  title: "Executive & Corporate Mobility | AB.Limo",
  description:
    "Bespoke corporator mobility for board members, roadshows, and executive itineraries. Premium chauffeur-driven transport engineered around your business schedule.",
};

const content: ServiceContent = {
  title: "Executive & Corporate Mobility",
  subtitle:
    "Private, punctual, and discreet ground transport engineered around the modern executive schedule.",
  heroImage:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=800&fit=crop",
  ctaTitle: "Elevate Your Corporate Travel Programme",
  ctaDesc:
    "Speak with a corporate mobility specialist about dedicated executive transport, roadshows, and board travel.",
  ctaLabel: "Request a Corporate Proposal",
  features: [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Dedicated Executives",
      desc: "Trained, vetted chauffeurs and brand-directed fleets that reflect your company's professional image at every meeting.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "On-Time, Every Time",
      desc: "Transport control rooms sync with your calendar and live traffic, guaranteeing arrival at every commitment.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4" />
        </svg>
      ),
      title: "Single-Point Liaison",
      desc: "A dedicated account manager coordinates every journey, itinerary change, and invoice on your behalf.",
    },
  ],
  cardsHeading: "Corporate Mobility Solutions",
  cardsDesc:
    "From daily executive transport to multi-city roadshows, we design the right mobilisation for your business.",
  cards: [
    {
      image:
        "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=800&h=500&fit=crop",
      tag: "Roadshows",
      title: "Multi-City Roadshows",
      desc: "Seamless inter-city and cross-border transfers for investor meetings, board tours, and stakeholder visits.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=500&fit=crop",
      tag: "On Demand",
      title: "Executive Hourly Hire",
      desc: "As-directed availability with an executive fleet on standby throughout the business day.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=800&h=500&fit=crop",
      tag: "Corporate Accounts",
      title: "Corporate Travel Accounts",
      desc: "Streamlined billing, consolidated reporting, and priority booking for your organisation.",
    },
  ],
  sections: [
    {
      image:
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop",
      imageAlt: "Executive business travel",
      title: "Business Travel, Reimagined",
      paragraphs: [
        "Travel should never be a distraction from the work that matters. AB.Limo provides executive transport that disappears into your day: a professional chauffeur, a pristine vehicle, and quiet, uninterrupted productivity from door to door.",
        "Whether it is a single board meeting or a week-long itinerary across Riyadh, Dubai, and Doha, your schedule is orchestrated around you-not the other way around.",
      ],
      bullets: [
        { text: "Productivity features including Wi-Fi and charging on selected vehicles" },
        { text: "Quiet, discreet service suited to sensitive business conversations" },
        { text: "Flexible scheduling aligned with meeting times and last-minute changes" },
      ],
    },
    {
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop",
      imageAlt: "Corporate team and executives",
      title: "A Fleet That Represents Your Brand",
      dark: true,
      paragraphs: [
        "Your transport is part of your corporate image. Our executive fleet of professional-grade sedans and luxury SUVs presents a consistent, polished identity for every client-facing interaction.",
        "Chauffeurs are trained in corporate etiquette, confidentiality, and protocol handling, ensuring your executives are in the most capable hands.",
      ],
      bullets: [
        { text: "Premium executive sedans and luxury SUVs" },
        { text: "Vehicle cleanliness and presentation inspected before every journey" },
        { text: "Confidentiality and discretion as standard" },
      ],
    },
  ],
  faqs: [
    {
      q: "Can AB.Limo manage a multi-city corporate roadshow?",
      a: "Yes. Our transport control room coordinates vehicle, chauffeur, and timing requirements across cities and borders, presenting a single itinerary and consolidated invoice.",
    },
    {
      q: "Do you offer corporate billing and reporting?",
      a: "We provide dedicated corporate accounts with monthly consolidated invoices and usage reports to simplify expense management and auditing.",
    },
    {
      q: "Are executives assigned the same chauffeur?",
      a: "Where preferred, we allocate a dedicated chauffeur who becomes familiar with your preferences, routes, and schedules for a consistent experience.",
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
      breadcrumb="Executive & Corporate Mobility"
    />
  );
}
