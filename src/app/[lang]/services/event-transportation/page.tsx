import type { Metadata } from "next";
import ServicePage, { type ServiceContent } from "../_components/ServicePage";

export const metadata: Metadata = {
  title: "Event Transportation Services | AB.Limo",
  description:
    "End-to-end guest transport for conferences, exhibitions, concerts, and large-scale corporate gatherings.",
};

const content: ServiceContent = {
  title: "Event Transportation",
  subtitle:
    "Complete guest-movement logistics for conferences, exhibitions, concerts, and large-scale corporate gatherings.",
  heroImage:
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&h=800&fit=crop",
  ctaTitle: "Plan Your Event Transport",
  ctaDesc:
    "Our transport control room engineers guest movement for events of every scale, from boardroom summits to stadium crowds.",
  ctaLabel: "Request Event Logistics",
  features: [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "Event Command Centre",
      desc: "A dedicated control room coordinates every vehicle, route, and arrival in real time throughout your event.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Rapid Deployment",
      desc: "Automated scheduling and on-demand expansion ensure capacity is ready the moment demand rises.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Dedicated Coordination",
      desc: "A named event transport manager liaises with your organisers and venues from planning to teardown.",
    },
  ],
  cardsHeading: "Event Transport Templates",
  cardsDesc:
    "Proven frameworks scaled to the size and nature of your gathering.",
  cards: [
    {
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop",
      tag: "Conferences",
      title: "Conferences & Summits",
      desc: "Coordinated delegate transfers between hotels, venues, and airports for multi-day programmes.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=800&h=500&fit=crop",
      tag: "Exhibitions",
      title: "Exhibitions & Trade Shows",
      desc: "High-frequency shuttles moving attendees efficiently across large exhibition floors and sites.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=500&fit=crop",
      tag: "Concerts",
      title: "Concerts & Sports",
      desc: "Timed, high-volume guest management for performances, tournaments, and stadium events.",
    },
  ],
  sections: [
    {
      image:
        "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=600&fit=crop",
      imageAlt: "Large corporate conference event",
      title: "Seamless Movement, Unforgettable Event",
      dark: true,
      paragraphs: [
        "The success of an event often hinges on how smoothly guests arrive, move, and depart. AB.Limo turns transport into a seamless part of the experience, invisible in operation but powerful in contribution.",
        "From the first airport pickup to the final shuttle of the evening, every movement is orchestrated by a dedicated command centre.",
      ],
      bullets: [
        { text: "End-to-end guest journey planning and wayfinding" },
        { text: "Vans, minibuses, executive coaches, and luxury sedans" },
        { text: "On-site marshalling and guest-flow management" },
      ],
    },
  ],
  faqs: [
    {
      q: "How far in advance should we book event transport?",
      a: "For large-scale events we recommend a minimum of several weeks of planning. Our team can also mobilise for tighter timeframes where capacity allows.",
    },
    {
      q: "Can transport be scheduled around our event programme?",
      a: "Yes. We build the movement plan around your agenda, adjusting timings automatically as the programme evolves.",
    },
    {
      q: "Do you manage hotel-to-venue shuttles?",
      a: "Absolutely, including multi-hotel loops and timed services coordinated with your event schedule.",
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
      breadcrumb="Event Transportation"
    />
  );
}
