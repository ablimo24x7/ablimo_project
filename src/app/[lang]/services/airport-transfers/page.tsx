import type { Metadata } from "next";
import Link from "next/link";
import ServicePage, { type ServiceContent } from "../_components/ServicePage";

export const metadata: Metadata = {
  title: "Airport Transfers | AB.Limo",
  description:
    "Seamless airport pickup, drop-off, and VIP tarmac services with live flight tracking, meet & greet, and premium vehicles.",
};

const content: ServiceContent = {
  title: "Airport Transfers",
  subtitle:
    "Punctual, stress-free transfers from and to the airport, backed by live flight tracking and dedicated meet & greet.",
  heroImage:
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&h=800&fit=crop",
  ctaTitle: "Book Your Airport Transfer",
  ctaDesc:
    "From a single arrival to a full delegation, our airport specialists coordinate every landing and departure.",
  ctaLabel: "Arrange Airport Transport",
  features: [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      ),
      title: "Live Flight Tracking",
      desc: "Real-time flight monitoring means your chauffeur is positioned correctly, even when landings run early or late.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Meet & Greet",
      desc: "A professional representative greets you at arrivals with a namesign, assists with luggage, and escorts you to your vehicle.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Complimentary Waiting Time",
      desc: "Generous waiting time on arrivals and precise positioning on departures ensure a seamless experience.",
    },
  ],
  cardsHeading: "Airport Services",
  cardsDesc:
    "Explore dedicated airport transport solutions, from standard arrivals to tarmac-level VIP arrivals.",
  cards: [
    {
      image:
        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=500&fit=crop",
      tag: "Arrivals",
      title: "Airport Pickup",
      desc: "Guaranteed-on-time arrival meeting with meet & greet and assistance to the vehicle. Explore the full service below.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&h=500&fit=crop",
      tag: "Departures",
      title: "Airport Drop-Off",
      desc: "Relaxed, punctual transfers to the terminal with ample time for check-in, exactly when you need it.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?w=800&h=500&fit=crop",
      tag: "VIP Access",
      title: "VIP Tarmac Arrivals",
      desc: "Privileged vehicular access for high-profile travellers requiring the utmost dignity and efficiency.",
    },
  ],
  sections: [
    {
      image:
        "https://images.unsplash.com/photo-1473625247510-8ceb1760943f?w=800&h=600&fit=crop",
      imageAlt: "Luxury airport transfer vehicle",
      title: "Airport Transfers, Perfected",
      dark: true,
      paragraphs: [
        "The airport is the first and last impression of any journey. AB.Limo ensures that impression is flawless, with a coordinated team, live flight intelligence, and a premium vehicle standing ready the moment you are.",
        "For business travellers, delegations, and families alike, every arrival and departure is handled with quiet precision.",
      ],
      bullets: [
        { text: "Arrivals and departures at all major GCC airports" },
        { text: "Luggage assistance and door-to-door convenience" },
        { text: "Flexible rescheduling aligned with flight changes" },
      ],
    },
  ],
  faqs: [
    {
      q: "What happens if my flight is delayed?",
      a: "Our team monitors your flight in real time. Your chauffeur is repositioned automatically, and you are never charged for reasonable delay-related waiting.",
    },
    {
      q: "Where will I meet my driver at arrivals?",
      a: "A representative greets you at the arrivals gate with a namesign and escorts you to the vehicle, so you need not search for your driver.",
    },
    {
      q: "Do you service private and GA terminals?",
      a: "Yes, in addition to commercial terminals we arrange transfers to and from private and general-aviation (GA) terminals, including VIP tarmac access.",
    },
  ],
};

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return (
    <>
      <ServicePage
        params={params}
        content={content}
        breadcrumb="Airport Transfers"
      />
      <section className="max-w-7xl mx-auto px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href={`/${lang}/services/airport-transfers/pickup`}
            className="bg-[#1c1d21] p-6 rounded-2xl hover:bg-[#2a2c35] transition-colors flex items-center justify-between"
          >
            <span className="font-semibold">Airport Pickup</span>
            <span className="text-abGold text-xl">&rarr;</span>
          </Link>
          <Link
            href={`/${lang}/services/airport-transfers/drop-off`}
            className="bg-[#1c1d21] p-6 rounded-2xl hover:bg-[#2a2c35] transition-colors flex items-center justify-between"
          >
            <span className="font-semibold">Airport Drop-Off</span>
            <span className="text-abGold text-xl">&rarr;</span>
          </Link>
          <Link
            href={`/${lang}/services/airport-transfers/vip-tarmac`}
            className="bg-[#1c1d21] p-6 rounded-2xl hover:bg-[#2a2c35] transition-colors flex items-center justify-between"
          >
            <span className="font-semibold">VIP Tarmac Arrivals</span>
            <span className="text-abGold text-xl">&rarr;</span>
          </Link>
        </div>
      </section>
    </>
  );
}
