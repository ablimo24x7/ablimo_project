import type { Metadata } from "next";
import ServicePage, { type ServiceContent } from "../_components/ServicePage";

export const metadata: Metadata = {
  title: "Tourism & Leisure Transport | AB.Limo",
  description:
    "Custom private tours, sightseeing, and leisure transit curated by AB.Limo for discerning travellers.",
};

const content: ServiceContent = {
  title: "Tourism & Leisure",
  subtitle:
    "Custom private tours, sightseeing, and leisure transit curated for travellers who expect more.",
  heroImage:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=800&fit=crop",
  ctaTitle: "Design Your Private Tour",
  ctaDesc:
    "From iconic landmarks to hidden gems, let us curate a seamless, luxurious way to explore your destination.",
  ctaLabel: "Plan a Private Tour",
  features: [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "Custom Itineraries",
      desc: "We craft day tours and multi-day programmes around your interests, pace, and preferred destinations.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      title: "Knowledgeable Chauffeurs",
      desc: "Friendly, multilingual chauffeurs double as guides with local insight and great storytelling.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      title: "Curated Experiences",
      desc: "Recommendations for dining, shopping, and landmarks elevate your leisure travel to a true experience.",
    },
  ],
  cardsHeading: "Leisure Experiences",
  cardsDesc:
    "Turn an ordinary trip into a memorable journey with our signature experiences.",
  cards: [
    {
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=500&fit=crop",
      tag: "City Tours",
      title: "Private City Tours",
      desc: "Iconic landmarks and hidden favourites, seen at your own pace in complete privacy.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop",
      tag: "Coastal",
      title: "Beach & Leisure Runs",
      desc: "Relaxed transfers to beaches, resorts, and leisure destinations with zero logistics stress.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=800&h=500&fit=crop",
      tag: "Culture",
      title: "Culture & Heritage",
      desc: "Thoughtful journeys connecting you with the history, architecture, and culture of the region.",
    },
  ],
  sections: [
    {
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&h=600&fit=crop",
      imageAlt: "Scenic leisure travel destination",
      title: "Explore, Your Way",
      dark: true,
      paragraphs: [
        "Leisure time should never be rushed or rationed. With a private AB.Limo chauffeur, your itinerary bends to your mood, your schedule, and your curiosity.",
        "Stop for a photograph, linger at a viewpoint, or add a spontaneous detour-your chauffeur is there to make it effortless.",
      ],
      bullets: [
        { text: "Full-day and half-day hire with flexible stops" },
        { text: "Multilingual chauffeurs with local expertise" },
        { text: "Suitable for couples, families, and small groups" },
      ],
    },
  ],
  faqs: [
    {
      q: "Can you plan a full-day sightseeing itinerary?",
      a: "Yes. We design detailed day tours with recommended timings, dining spots, and must-see stops tailored to your interests.",
    },
    {
      q: "Are your chauffeurs also tour guides?",
      a: "Our chauffeurs are knowledgeable about their cities and happy to share insight, while professional licensed guides can also be arranged.",
    },
    {
      q: "Can we make stops along the way?",
      a: "Absolutely. Hourly and day-hire packages allow you to stop, explore, or change your plan at any time.",
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
      breadcrumb="Tourism & Leisure"
    />
  );
}
