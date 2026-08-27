import type { Metadata } from "next";
import ServicePage, { type ServiceContent } from "../_components/ServicePage";

export const metadata: Metadata = {
  title: "Group & Coach Charter | AB.Limo",
  description:
    "Minibuses, executive coaches, and motorcoach charters for teams, delegations, and large groups across the Gulf.",
};

const content: ServiceContent = {
  title: "Group & Coach Charter",
  subtitle:
    "Executive coaches, minibuses, and motorcoach charters for teams, delegations, and groups travelling together.",
  heroImage:
    "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920&h=800&fit=crop",
  ctaTitle: "Charter Your Group Transport",
  ctaDesc:
    "Tell us your group size, route, and schedule, and we will match the perfect coach or fleet to your journey.",
  ctaLabel: "Request a Group Charter",
  features: [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Right-Sized Vehicles",
      desc: "From 8-seat minibuses to 49-seat executive coaches, our fleet fits your group and luggage perfectly.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "On-Time Charting",
      desc: "Reliable scheduling keeps your whole group moving to plan, whether single- or multi-day.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Flexible Itineraries",
      desc: "Custom routes, stops, and schedules designed around your group's unique plan.",
    },
  ],
  cardsHeading: "Charter Options",
  cardsDesc: "A fleet built for group travel, from compact crews to full delegations.",
  cards: [
    {
      image:
        "https://images.unsplash.com/photo-1550358864-518f202c02ba?w=800&h=500&fit=crop",
      tag: "Minibus",
      title: "Minibuses (8–16 pax)",
      desc: "Comfortable mid-size vehicles ideal for teams, families, and small delegations.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=500&fit=crop",
      tag: "Executive Coach",
      title: "Executive Coaches (20–30 pax)",
      desc: "Business-class coaches with reclining seats and onboard comforts for discerning groups.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=500&fit=crop",
      tag: "Motorcoach",
      title: "Motorcoaches (40+ pax)",
      desc: "Full-size motorcoaches for large groups, events, and long-distance charters.",
    },
  ],
  sections: [
    {
      image:
        "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&h=600&fit=crop",
      imageAlt: "Group travelling together",
      title: "One Journey, One Group, Zero Friction",
      dark: true,
      paragraphs: [
        "Moving a group is about more than reserving a vehicle-it is about keeping your people together, on time, and comfortable. AB.Limo handles every detail so you can focus on your group.",
        "Our coordinators manage the itinerary, the drivers, and the logistics, while your group simply enjoys the journey.",
      ],
      bullets: [
        { text: "Dedicated journey coordinator for every charter" },
        { text: "Comfortable, well-maintained, inspection-ready vehicles" },
        { text: "Multi-day and multi-vehicle charters supported" },
      ],
    },
  ],
  faqs: [
    {
      q: "What is the minimum group size for a charter?",
      a: "We charter for groups of roughly eight passengers and above, though smaller executive transfers are also available.",
    },
    {
      q: "Can you charter coaches for a multi-day itinerary?",
      a: "Yes, including overnight journeys and multi-day programmes with coordinated driver planning.",
    },
    {
      q: "Are drivers experienced with large coach operations?",
      a: "Our coach drivers hold the appropriate licensing and undergo rigorous training and background vetting.",
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
      breadcrumb="Group & Coach Charter"
    />
  );
}
