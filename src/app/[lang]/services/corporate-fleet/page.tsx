import type { Metadata } from "next";
import ServicePage, { type ServiceContent } from "../_components/ServicePage";

export const metadata: Metadata = {
  title: "Corporate Fleet & Workforce Mobility | AB.Limo",
  description:
    "Managed corporate fleets and employee shuttle programs engineered for reliability, compliance, and efficiency.",
};

const content: ServiceContent = {
  title: "Corporate Fleet & Workforce Mobility",
  subtitle:
    "Managed ground transport for organisations-secure employee shuttles, fleet management, and duty-of-care programmes.",
  heroImage:
    "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1920&h=800&fit=crop",
  ctaTitle: "Design Your Workforce Mobility Programme",
  ctaDesc:
    "From daily employee shuttles to campus fleet management, our team builds reliable, cost-effective programmes.",
  ctaLabel: "Request a Fleet Proposal",
  features: [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Employee Shuttles",
      desc: "Reliable, scheduled shuttles for staff, shift rotations, and campus transport with live tracking.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: "Fleet Management",
      desc: "Right-sized vehicle pools with utilisation tracking, maintenance oversight, and transparent budgeting.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Duty of Care",
      desc: "Vetted drivers, monitored journeys, and incident support underpin your organisation's duty-of-care obligations.",
    },
  ],
  cardsHeading: "Workforce Mobility Solutions",
  cardsDesc:
    "Flexible, scalable transport built around your organisation's operations.",
  cards: [
    {
      image:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=500&fit=crop",
      tag: "Daily Shuttle",
      title: "Employee Shuttle Programs",
      desc: "Fixed-route and on-demand shuttles moving your workforce safely and predictably.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&h=500&fit=crop",
      tag: "Campuses",
      title: "Campus & Site Transport",
      desc: "Internal mobility across industrial sites, campuses, and multi-building compounds.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop",
      tag: "Reporting",
      title: "Managed Fleet Reporting",
      desc: "Usage analytics and consolidated billing give full visibility and control over spend.",
    },
  ],
  sections: [
    {
      image:
        "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop",
      imageAlt: "Corporate shuttle fleet",
      title: "Mobility That Scales With You",
      dark: true,
      paragraphs: [
        "Whether you move forty colleagues a day or four thousand, AB.Limo builds a workforce mobility programme that scales reliably. Routes, schedules, and capacity are optimised around your operations.",
        "With live tracking and a dedicated account team, you always know where your people are-and that they are safe.",
      ],
      bullets: [
        { text: "Right-sized vehicles from vans to motorcoaches" },
        { text: "Live journey monitoring and driver performance reporting" },
        { text: "Flexible scaling for peak periods and events" },
      ],
    },
  ],
  faqs: [
    {
      q: "Can the shuttle programme be scaled up or down?",
      a: "Yes. We design capacity to flex with your workforce, adding vehicles or adjusting routes as your operations evolve.",
    },
    {
      q: "Do you provide driver vetting and training?",
      a: "All drivers undergo rigorous vetting, background checks, and customer-service and safety training before assignment.",
    },
    {
      q: "How is fleet usage reported?",
      a: "Your account team provides consolidated reporting on utilisation, mileage, and spend through a clear monthly summary.",
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
      breadcrumb="Corporate Fleet & Workforce Mobility"
    />
  );
}
