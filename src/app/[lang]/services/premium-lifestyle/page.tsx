import type { Metadata } from "next";
import ServicePage, { type ServiceContent } from "../_components/ServicePage";

export const metadata: Metadata = {
  title: "Premium Lifestyle & Specialty Transport | AB.Limo",
  description:
    "Bespoke luxury transport for weddings, celebrations, and high-profile personal occasions, delivered by AB.Limo.",
};

const content: ServiceContent = {
  title: "Premium Lifestyle & Specialty",
  subtitle:
    "Bespoke luxury transport for life's most memorable moments-weddings, celebrations, and special occasions.",
  heroImage:
    "https://images.unsplash.com/photo-1494905998402-395d579af36f?w=1920&h=800&fit=crop",
  ctaTitle: "Plan a Bespoke Occasion",
  ctaDesc:
    "Tell us about your special day and we will craft transport that matches the occasion perfectly.",
  ctaLabel: "Enquire About Specialty Transport",
  features: [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21c-2 0-3-2-5-2s-3 2-3 2 1-3 3-3 1-2 3-2 2 0 4 2 5 2 5 2-1 2-3 2-3-2-4-2zM8 7a4 4 0 11-8 0 4 4 0 018 0zM32 7a4 4 0 11-8 0 4 4 0 018 0zM16 3a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
      ),
      title: "Occasion Styling",
      desc: "Elegant vehicle presentation, ribbons, and décor to match the theme and tone of your special day.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Tailored Moments",
      desc: "Every detail coordinated with your planners to create a memorable and seamless experience.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Family & Parties",
      desc: "Comfortable, stylish transport for family gatherings, birthdays, anniversaries, and parties.",
    },
  ],
  cardsHeading: "Specialty Occasions",
  cardsDesc:
    "Life's big moments deserve transport as memorable as the occasion itself.",
  cards: [
    {
      image:
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=500&fit=crop",
      tag: "Weddings",
      title: "Wedding Transport",
      desc: "Elegant arrival and departure transport for the couple, wedding party, and guests.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&h=500&fit=crop",
      tag: "Celebrations",
      title: "Anniversaries & Milestones",
      desc: "Sensitive, elegant transport for anniversaries, birthdays, and family milestones.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=500&fit=crop",
      tag: "Corporate Galas",
      title: "Corporate Galas & Dinners",
      desc: "Sophisticated transport for awards nights, galas, and high-profile social functions.",
    },
  ],
  sections: [
    {
      image:
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop",
      imageAlt: "Elegant wedding celebration",
      title: "Moments Worth Remembering",
      dark: true,
      paragraphs: [
        "Some occasions warrant more than transport-they call for an entrance. AB.Limo offers bespoke luxury vehicles and styling that make your special moments unforgettable.",
        "From a pristine luxury sedan for your wedding day to a fleet for a family gathering, we tailor every detail to your vision.",
      ],
      bullets: [
        { text: "Pristine, occasion-ready luxury vehicles" },
        { text: "Optional ribbons, décor, and styling" },
        { text: "Coordination with planners and venues" },
      ],
    },
  ],
  faqs: [
    {
      q: "Can you style the vehicle for a wedding?",
      a: "Yes, we offer elegant presentation options including ribbons and décor to suit the theme of your special day.",
    },
    {
      q: "Do you provide multiple vehicles for an event?",
      a: "We can supply coordinated fleets of sedans, vans, or coaches to transport the entire party or guest group.",
    },
    {
      q: "Can the chauffeur follow our own schedule?",
      a: "Absolutely. Hourly and as-directed hire gives you full flexibility to run your day on your terms.",
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
      breadcrumb="Premium Lifestyle & Specialty"
    />
  );
}
