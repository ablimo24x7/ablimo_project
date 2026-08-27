import type { Metadata } from "next";
import ServicePage, { type ServiceContent } from "../../_components/ServicePage";

export const metadata: Metadata = {
  title: "VIP Tarmac Airport Service | AB.Limo",
  description:
    "Privileged VIP tarmac airport access for dignitaries and high-profile travellers. Discreet, efficient, and secure arrivals and departures.",
};

const content: ServiceContent = {
  title: "VIP Tarmac Arrivals",
  subtitle:
    "Privileged tarmac access and expedited handling for high-profile travellers who value dignity, privacy, and time.",
  heroImage:
    "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?w=1920&h=800&fit=crop",
  ctaTitle: "Arrange VIP Tarmac Handling",
  ctaDesc:
    "Coordinate with our ground-handling partners for a seamless, discreet tarmac experience at the airport of your choice.",
  ctaLabel: "Arrange VIP Access",
  cardsHeading: "VIP Ground Handling",
  cardsDesc: "A full suite of privileged services for distinguished travellers.",
  cards: [
    {
      image:
        "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&h=500&fit=crop",
      tag: "Privileged Access",
      title: "Direct Tarmac Access",
      desc: "Vehicular access to the aircraft for qualifying flights, minimising time through public terminals.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=800&h=500&fit=crop",
      tag: "Discreet",
      title: "Private & Secure",
      desc: "Discreet handling and heightened security protocols appropriate for dignitaries and high-profile guests.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=500&fit=crop",
      tag: "Assistance",
      title: "Full Coordination",
      desc: "We liaise with airport authorities, immigration, and ground handlers to orchestrate every detail.",
    },
  ],
  sections: [
    {
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop",
      imageAlt: "VIP airport terminal",
      title: "The Privilege of Time",
      dark: true,
      paragraphs: [
        "For distinguished travellers, the airport experience should be as seamless and dignified as the journey itself. AB.Limo coordinates privileged ground access with authorised partners to streamline arrivals and departures.",
        "Our protocol-trained chauffeurs and white-glove handling ensure complete discretion from the moment you touch down.",
      ],
      bullets: [
        { text: "Coordination of authorised tarmac access where permitted" },
        { text: "Protocol- and security-aware chauffeurs" },
        { text: "Priority and expedited handling arrangements" },
      ],
    },
  ],
  faqs: [
    {
      q: "Is tarmac access available at all airports?",
      a: "Privileged tarmac access depends on airport policy and qualifying criteria. Our ground-handling partners confirm eligibility and arrange access where authorised.",
    },
    {
      q: "Who handles the security and protocol arrangements?",
      a: "AB.Limo coordinates with accredited ground handlers and relevant authorities to manage protocol, security, and entrance permissions.",
    },
    {
      q: "Can this service be arranged for private jets?",
      a: "Yes, our VIP ground handling is ideal for private aviation at general-aviation (GA) and fixed-base operator (FBO) terminals.",
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
      breadcrumb="VIP Tarmac Arrivals"
    />
  );
}
