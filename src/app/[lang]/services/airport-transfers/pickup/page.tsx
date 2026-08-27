import type { Metadata } from "next";
import ServicePage, { type ServiceContent } from "../../_components/ServicePage";

export const metadata: Metadata = {
  title: "Airport Pickup Service | AB.Limo",
  description:
    "Premium airport pickup with meet & greet, live flight tracking, and luxury vehicles. Arrive seamlessly from the moment you land.",
};

const content: ServiceContent = {
  title: "Airport Pickup",
  subtitle:
    "A chauffeur waiting exactly when you land, with namesign, luggage assistance, and a premium vehicle ready at the kerb.",
  heroImage:
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&h=800&fit=crop",
  ctaTitle: "Arrange Your Arrival Transfer",
  ctaDesc:
    "Tell us your flight details and we will position a chauffeur to meet you the moment you clear arrivals.",
  ctaLabel: "Book Airport Pickup",
  cardsHeading: "The Arrival Experience",
  cardsDesc: "Every step of your airport pickup is orchestrated for comfort and speed.",
  cards: [
    {
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=500&fit=crop",
      tag: "Flight Sync",
      title: "Live Flight Tracking",
      desc: "We monitor your flight in real time so your chauffeur is positioned for your actual landing, not the scheduled one.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop",
      tag: "Meet & Greet",
      title: "Namesign Greeting",
      desc: "A professional representative greets you at the arrivals gate, assists with luggage, and guides you to your vehicle.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=500&fit=crop",
      tag: "Premium Fleet",
      title: "Luxury Vehicles",
      desc: "Choose from executive sedans, luxury SUVs, or spacious vans sized to your party and luggage.",
    },
  ],
  sections: [
    {
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      imageAlt: "Airport pickup chauffeur",
      title: "Land, and Everything is Handled",
      dark: true,
      paragraphs: [
        "After a long flight, the last thing you want is to coordinate transport. With AB.Limo, your chauffeur is already waiting. Your only job is to walk through the doors and relax.",
        "Our meet & greet representative takes care of your luggage and escorts you to a waiting vehicle, whisking you to your destination in comfort.",
      ],
      bullets: [
        { text: "Free waiting on arrival for your comfort" },
        { text: "Assistance with luggage and logistics" },
        { text: "Direct airport communication on any change" },
      ],
    },
  ],
  faqs: [
    {
      q: "How long will my chauffeur wait if my flight is delayed?",
      a: "Included waiting time covers typical delays. Our flight tracking auto-adjusts the pickup time, and longer delays are handled with minimal notice.",
    },
    {
      q: "Can I request a namesign or meet & greet?",
      a: "Yes, meet & greet with a visible namesign is included as standard on all airport pickups and can be upgraded for special occasions.",
    },
    {
      q: "Do you meet passengers at the baggage claim or arrivals gate?",
      a: "We meet you right at the arrivals gate with your namesign, then accompany you through baggage claim to the vehicle.",
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
      breadcrumb="Airport Pickup"
    />
  );
}
