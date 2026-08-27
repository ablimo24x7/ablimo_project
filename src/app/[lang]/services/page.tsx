import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Luxury Chauffeur Services | AB.Limo Master Taxonomy",
  description:
    "Explore the complete AB.Limo services taxonomy: executive mobility, airport transfers, VIP & government transport, corporate fleets, events, group charters, tourism, and premium lifestyle chauffeur services.",
};

const categories = [
  {
    slug: "executive-corporate-mobility",
    title: "Executive & Corporate Mobility",
    desc: "Bespoke ground transport for business travel, roadshows, and executive itineraries across the Gulf and beyond.",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=500&fit=crop",
  },
  {
    slug: "airport-transfers",
    title: "Airport Transfers",
    desc: "Seamless airport pickup, drop-off, and VIP tarmac services with flight tracking and meet & greet.",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=500&fit=crop",
  },
  {
    slug: "vip-diplomatic-government",
    title: "VIP, Diplomatic & Government",
    desc: "High-security, protocol-driven transport for dignitaries, heads of state, and diplomatic missions.",
    image:
      "https://images.unsplash.com/photo-1511974035430-5de47d3b95da?w=800&h=500&fit=crop",
  },
  {
    slug: "corporate-fleet",
    title: "Corporate Fleet & Workforce Mobility",
    desc: "Managed corporate fleets and employee shuttle programs engineered for reliability and efficiency.",
    image:
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&h=500&fit=crop",
  },
  {
    slug: "event-transportation",
    title: "Event Transportation",
    desc: "End-to-end guest movement for conferences, exhibitions, concerts, and large-scale corporate gatherings.",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=500&fit=crop",
  },
  {
    slug: "group-coach-charter",
    title: "Group & Coach Charter",
    desc: "Minibuses, executive coaches, and motorcoach charters for teams, delegations, and large groups.",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=500&fit=crop",
  },
  {
    slug: "tourism-leisure",
    title: "Tourism & Leisure",
    desc: "Custom private tours, sightseeing, and leisure transit curated for discerning travellers.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop",
  },
  {
    slug: "religious-tourism",
    title: "Religious Tourism",
    desc: "Dignified pilgrimage and religious group travel with sensitive, respectful service.",
    image:
      "https://images.unsplash.com/photo-1563521395854-2afd2c1b9a73?w=800&h=500&fit=crop",
  },
  {
    slug: "cross-border-mobility",
    title: "Cross-Border Mobility",
    desc: "Long-distance and international road transfers across GCC borders with full coordination.",
    image:
      "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&h=500&fit=crop",
  },
  {
    slug: "premium-lifestyle",
    title: "Premium Lifestyle & Specialty",
    desc: "Bespoke luxury transport for weddings, celebrations, and high-profile personal occasions.",
    image:
      "https://images.unsplash.com/photo-1494905998402-395d579af36f?w=800&h=500&fit=crop",
  },
];

const pillars = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Security & Duty of Care",
    desc: "Vetted, background-checked chauffeurs and GPS-monitored fleets uphold the highest duty-of-care standards.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Relentless Punctuality",
    desc: "Transport control rooms monitor every journey in real time, guaranteeing on-time performance.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    ),
    title: "Seamless Coordination",
    desc: "From flight tracking to event logistics, a single point of contact orchestrates your entire journey.",
  },
];

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <main className="min-h-screen bg-[#292a30] text-white">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden pt-24 pb-10">
        <Image
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&h=800&fit=crop"
          alt="Luxury Chauffeur Services"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#292a30]" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8">
          <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-abGold/10 border border-abGold/30 mb-6">
            <span className="w-2 h-2 rounded-full bg-abGold animate-pulse"></span>
            <span className="text-abGold text-xs font-bold tracking-widest uppercase">
              The Complete Services Taxonomy
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            A Full Suite of{" "}
            <span className="text-abGold">Luxury Mobility</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
            Ten specialised service verticals, one uncompromising standard.
            AB.Limo engineers bespoke chauffeur-driven ground transport for
            executives, governments, events, and discerning travellers across
            the GCC and beyond.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-8 py-6">
        <nav className="text-sm text-gray-400">
          <Link href={`/${lang}`} className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">Services</span>
        </nav>
      </div>

      {/* Category Grid */}
      <section className="max-w-7xl mx-auto px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Our Service Verticals
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Each vertical is delivered by the same premium fleet, professional
            chauffeurs, and dedicated transport control room that defines the
            AB.Limo standard.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/${lang}/services/${category.slug}`}
              className="group bg-[#1c1d21] rounded-2xl overflow-hidden hover:bg-[#2a2c35] transition-colors"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1d21]/90 via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold">{category.title}</h3>
                  <span className="text-abGold text-xl group-hover:translate-x-1 transition-transform">
                    &rarr;
                  </span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {category.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-[#1c1d21] py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What Unites Every Vertical
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-[#292a30] p-8 rounded-2xl hover:bg-[#2a2c35] transition-colors"
              >
                <div className="text-abGold mb-4">{pillar.icon}</div>
                <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-8 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Engineer Your Mobility?
        </h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Tell us about your itinerary, event, or fleet requirements and our
          transport specialists will respond within one business hour.
        </p>
        <Link
          href={`/${lang}/services/executive-corporate-mobility`}
          className="inline-block bg-abGold hover:bg-yellow-600 text-white px-8 py-3 text-sm font-semibold rounded-full transition-colors shadow-lg shadow-abGold/20"
        >
          Start a Consultation
        </Link>
      </section>
    </main>
  );
}
