import type { Metadata } from "next";
import ServicePage, { type ServiceContent } from "../../_components/ServicePage";

export const metadata: Metadata = {
  title: "Airport Drop-Off Service | AB.Limo",
  description:
    "On-time, stress-free airport drop-offs. Punctual chauffeur service to the terminal, giving you ample time to check in and relax.",
};

const content: ServiceContent = {
  title: "Airport Drop-Off",
  subtitle:
    "Punctual, punctual transfers to the terminal with generous time to spare-so check-in is calm, not stressful.",
  heroImage:
    "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=1920&h=800&fit=crop",
  ctaTitle: "Reserve Your Departure Transfer",
  ctaDesc:
    "We synchronise with your flight and travel conditions to ensure you reach the terminal with time to spare.",
  ctaLabel: "Book Airport Drop-Off",
  cardsHeading: "The Departure Experience",
  cardsDesc: "Smooth, reliable departures engineered around your flight schedule.",
  cards: [
    {
      image:
        "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&h=500&fit=crop",
      tag: "Punctual",
      title: "On-Time Guarantee",
      desc: "We calculate your optimum departure time, accounting for traffic and check-in requirements, and arrive at precisely the right moment.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=500&fit=crop",
      tag: "Comfort",
      title: "Relaxed Journey",
      desc: "Start your trip in comfort with a premium vehicle and a courteous chauffeur who knows the fastest, smoothest routes.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop",
      tag: "Assistance",
      title: "Luggage Support",
      desc: "Your chauffeur assists with luggage at pickup and at the terminal departure kerb.",
    },
  ],
  sections: [
    {
      image:
        "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop",
      imageAlt: "Business traveller at airport departure",
      title: "Departures, Without the Rush",
      dark: true,
      paragraphs: [
        "A frantic dash to the airport is the worst way to begin a journey. AB.Limo plans your departure meticulously, balancing comfort with the buffer you need.",
        "From early-morning flights to last-minute schedule changes, your drop-off is handled with precision and calm.",
      ],
      bullets: [
        { text: "Chauffeur positioned ahead of your required terminal time" },
        { text: "Automatic adjustment for traffic and route conditions" },
        { text: "Suitable for early, late, and red-eye departures" },
      ],
    },
  ],
  faqs: [
    {
      q: "How early should I be picked up for my flight?",
      a: "Our system calculates the ideal pickup time based on your flight, terminal, and prevailing traffic to give you the recommended check-in buffer.",
    },
    {
      q: "Can you accommodate very early morning departures?",
      a: "Absolutely. Our 24/7 dispatch handles early, late, and overnight departures with full chauffeur availability around the clock.",
    },
    {
      q: "Do you drop off at the correct airline terminal?",
      a: "Yes, our chauffeurs are familiar with all major terminals and will deliver you to the correct departure entrance for your airline.",
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
      breadcrumb="Airport Drop-Off"
    />
  );
}
