import type { Metadata } from "next";
import IndustryPage, { type IndustryContent } from "../_components/IndustryPage";

export const metadata: Metadata = {
  title: "Corporate & Enterprise Mobility Solutions | AB.Limo",
  description:
    "Employee mobility, executive commuting, and corporate roadshow transport for forward-thinking enterprises by AB.Limo.",
};

const content: IndustryContent = {
  badge: "Corporate & Enterprise",
  title: "Corporate & Enterprise Mobility",
  subtitle:
    "Integrated ground transport for employee mobility, executive travel, and corporate roadshows.",
  heroImage:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=800&fit=crop",
  ctaTitle: "Build Your Enterprise Programme",
  ctaDesc:
    "Speak with our enterprise mobility consultants about a comprehensive transport programme for your business.",
  ctaLabel: "Request Enterprise Proposal",
  features: [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Employee Mobility",
      desc: "Reliable daily transport for your workforce, from office shuttles to site and campus movements.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        </svg>
      ),
      title: "Executive Commuting",
      desc: "Dedicated executive transport with a consistent chauffeur who knows your preferences and routes.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Roadshow Logistics",
      desc: "Multi-city and multi-country movement for roadshows, board tours, and stakeholder visits.",
    },
  ],
  cardsHeading: "Enterprise Mobility Solutions",
  cardsDesc:
    "Scalable programmes built around your organisation's operations and duty-of-care obligations.",
  cards: [
    {
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=500&fit=crop",
      tag: "Commute",
      title: "Executive Commuting",
      desc: "Daily, subscribed executive transport with priority booking and consistent service.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=500&fit=crop",
      tag: "Roadshows",
      title: "Corporate Roadshows",
      desc: "Seamless inter-city movement for investor meetings, board tours, and key stakeholder visits.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop",
      tag: "Accounts",
      title: "Enterprise Accounts",
      desc: "Consolidated billing, usage reporting, and a dedicated account manager for your organisation.",
    },
  ],
  sections: [
    {
      image:
        "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=800&h=600&fit=crop",
      imageAlt: "Corporate executives in business travel",
      title: "Mobility That Moves Your Business Forward",
      dark: true,
      paragraphs: [
        "Ground transport is an extension of your brand and your duty of care. AB.Limo engineering corporate mobility programmes that are reliable, transparent, and tailored to how your business actually moves.",
        "From the daily commute to a week-long roadshow, every journey is coordinated, reported, and invoiced with enterprise-grade rigour.",
      ],
      bullets: [
        { text: "Consolidated invoicing and usage analytics" },
        { text: "Dedicated account manager and 24/7 control room" },
        { text: "Vetted chauffeurs and monitored journeys for duty of care" },
      ],
    },
  ],
  faqs: [
    {
      q: "How does corporate billing and reporting work?",
      a: "We provide consolidated monthly invoices and usage reports, giving full visibility and control over your ground-transport spend.",
    },
    {
      q: "Can the programme scale with our workforce?",
      a: "Yes. We right-size fleets and routes to your workforce, scaling up or down as your operations evolve.",
    },
    {
      q: "Do you offer a single point of contact?",
      a: "Every enterprise account is assigned a dedicated account manager who coordinates journeys, changes, and queries on your behalf.",
    },
  ],
};

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  return (
    <IndustryPage
      params={params}
      content={content}
      breadcrumb="Corporate / Enterprise"
    />
  );
}
