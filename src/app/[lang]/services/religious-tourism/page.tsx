import type { Metadata } from "next";
import ServicePage, { type ServiceContent } from "../_components/ServicePage";

export const metadata: Metadata = {
  title: "Religious & Pilgrimage Travel | AB.Limo",
  description:
    "Dignified pilgrimage and religious group travel with sensitive, respectful service for Hajj, Umrah, and other journeys of faith.",
};

const content: ServiceContent = {
  title: "Religious Tourism",
  subtitle:
    "Dignified, respectful transport for pilgrimages and religious group travel, delivered with care and sensitivity.",
  heroImage:
    "https://images.unsplash.com/photo-1563521395854-2afd2c1b9a73?w=1920&h=800&fit=crop",
  ctaTitle: "Arrange Sacred Journey Transport",
  ctaDesc:
    "Speak with our team about coordinated, dignified transport for pilgrimages and religious group travel.",
  ctaLabel: "Plan Pilgrimage Transport",
  features: [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Respect & Sensitivity",
      desc: "Our teams understand and honour the devotional character of religious travel in every interaction.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Group Coordination",
      desc: "Synchronised group movement with careful attention to elderly, family, and first-time pilgrim needs.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Punctual & Dependable",
      desc: "Strict adherence to schedule ensures pilgrimages proceed smoothly from airport to sacred sites and back.",
    },
  ],
  cardsHeading: "Pilgrimage & Group Services",
  cardsDesc:
    "Specialised transport supporting journeys of faith with reliability and heart.",
  cards: [
    {
      image:
        "https://images.unsplash.com/photo-1563521395854-2afd2c1b9a73?w=800&h=500&fit=crop",
      tag: "Umrah & Hajj",
      title: "Sacred Sites Transfers",
      desc: "Coordinated transfers between airports, hotels, and sacred sites throughout the pilgrimage programme.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=500&fit=crop",
      tag: "Groups",
      title: "Devotional Group Travel",
      desc: "Comfortable, dignified coach and minibus transport for religious groups and congregations.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1503328427499-d92d1ac3d174?w=800&h=500&fit=crop",
      tag: "Family",
      title: "Family & Elderly Care",
      desc: "Thoughtful, patient service for families and senior pilgrims requiring additional assistance.",
    },
  ],
  sections: [
    {
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop",
      imageAlt: "Sacred journey destination",
      title: "Journeys of the Heart, Handled with Care",
      dark: true,
      paragraphs: [
        "For journeys of faith, the experience matters as much as the destination. AB.Limo provides transport characterised by patience, dignity, and respect for the holiness of the occasion.",
        "Our coordinators attend to the small considerations that make a pilgrimage meaningful, allowing travellers to focus fully on their spiritual journey.",
      ],
      bullets: [
        { text: "Sensitive, courteous handling of all travellers" },
        { text: "Assistance for families, elderly, and those with mobility needs" },
        { text: "Coordination with travel agents and group leaders" },
      ],
    },
  ],
  faqs: [
    {
      q: "Do you specialise in Hajj and Umrah transport?",
      a: "Yes, we provide coordinated transfer services supporting Hajj, Umrah, and other pilgrimage programmes with sensitivity and reliability.",
    },
    {
      q: "Can you accommodate large religious groups?",
      a: "We deploy minibuses and coaches to move congregations and large devotional groups efficiently and comfortably.",
    },
    {
      q: "Is assistance available for elderly pilgrims?",
      a: "Certainly. We provide patient, attentive support and can arrange additional assistance for those with mobility requirements.",
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
      breadcrumb="Religious Tourism"
    />
  );
}
