import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Corporate Transportation Services | AB.Limo",
  description:
    "Premium corporate transportation solutions tailored for businesses. Five-star chauffeurs worldwide with competitive rates and 24/7 priority support.",
};

const tailoredCards = [
  {
    title: "Corporate travel",
    description:
      "Streamline your company's travel with dedicated account management, consolidated invoicing, and premium chauffeur services for all your business needs.",
    image:
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&h=400&fit=crop",
  },
  {
    title: "Travel agencies",
    description:
      "Partner with AB.Limo to offer your clients world-class chauffeur services. Earn commission while delivering exceptional ground transportation experiences.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop",
  },
  {
    title: "Strategic partnerships",
    description:
      "Create lasting value through strategic alliances. Integrate our API, co-brand services, and unlock new revenue streams for your business.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
  },
];

const features = [
  {
    icon: "🌍",
    title: "Global reliability",
    description:
      "Consistent, premium service across 1,500+ cities in 50+ countries worldwide.",
  },
  {
    icon: "💰",
    title: "Competitive rates",
    description:
      "Transparent pricing with volume discounts and no hidden fees for corporate accounts.",
  },
  {
    icon: "⚙️",
    title: "Unrivaled flexibility",
    description:
      "Last-minute changes, special requests, and custom itineraries handled with ease.",
  },
  {
    icon: "📞",
    title: "Priority 24/7 support",
    description:
      "Dedicated account managers and round-the-clock support for immediate assistance.",
  },
  {
    icon: "📊",
    title: "Simplified management",
    description:
      "Centralized dashboard for booking, tracking, and reporting across your organization.",
  },
  {
    icon: "🌱",
    title: "Sustainability",
    description:
      "Carbon offset programs and eco-friendly vehicle options for conscious businesses.",
  },
];

const awards = [
  {
    title: "Best Corporate Transport Provider",
    year: "2025",
    organization: "Global Travel Awards",
  },
  {
    title: "Excellence in Business Travel",
    year: "2024",
    organization: "Business Travel Awards",
  },
  {
    title: "Sustainability Leader",
    year: "2025",
    organization: "Green Transportation Council",
  },
];

export default function BusinessPage() {
  return (
    <main className="min-h-screen bg-[#292a30]">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop"
          alt="Corporate transportation"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#292a30]/80 via-[#292a30]/60 to-[#292a30]" />
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <p className="text-gray-400 text-sm tracking-widest uppercase mb-4">
            Home &gt; Business
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Corporate transportation services
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light">
            Five-star chauffeurs worldwide
          </p>
        </div>
      </section>

      {/* Tailored to You Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Tailored to you
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Whether you&apos;re managing corporate travel, running a travel agency,
            or seeking strategic partnerships, we have the perfect solution.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {tailoredCards.map((card) => (
              <div
                key={card.title}
                className="bg-[#35363c] rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* From Planning to Pickup */}
      <section className="py-20 px-4 bg-[#1e1f24]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            From planning to pickup
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Our intuitive platform puts corporate travel management at your
            fingertips.
          </p>
          <div className="relative rounded-2xl overflow-hidden border border-gray-700">
            <Image
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=700&fit=crop"
              alt="AB.Limo platform dashboard"
              width={1200}
              height={700}
              className="w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why choose AB.Limo for business
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-[#35363c] p-6 rounded-xl hover:bg-[#3d3e45] transition-colors"
              >
                <span className="text-3xl mb-4 block">{feature.icon}</span>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 px-4 bg-[#1e1f24]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-5xl text-gray-600 mb-6">&ldquo;</div>
          <blockquote className="text-xl md:text-2xl font-light italic text-gray-200 mb-8 leading-relaxed">
            AB.Limo has transformed how we handle executive travel. The
            reliability, consistency, and premium service quality have made them
            an invaluable partner for our global operations.
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-gray-600 rounded-full" />
            <div className="text-left">
              <p className="font-semibold">Sarah Mitchell</p>
              <p className="text-gray-400 text-sm">VP of Operations, TechCorp</p>
            </div>
          </div>
        </div>
      </section>

      {/* How Can We Help CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            How can we help?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Tell us about your business travel needs and our team will craft a
            tailored solution for your organization.
          </p>
          <Link
            href="#contact"
            className="inline-block bg-white text-[#292a30] font-semibold px-8 py-4 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 px-4 bg-[#1e1f24]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Award-winning service
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {awards.map((award) => (
              <div
                key={award.title}
                className="bg-[#35363c] p-8 rounded-xl text-center"
              >
                <div className="w-16 h-16 bg-[#292a30] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{award.title}</h3>
                <p className="text-gray-400 text-sm">{award.organization}</p>
                <p className="text-gray-500 text-sm mt-1">{award.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Contact us
          </h2>
          <p className="text-gray-400 text-center mb-12">
            Ready to elevate your corporate transportation? Reach out today.
          </p>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="First name"
                className="w-full bg-[#35363c] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
              />
              <input
                type="text"
                placeholder="Last name"
                className="w-full bg-[#35363c] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-[#35363c] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
            />
            <input
              type="text"
              placeholder="Company name"
              className="w-full bg-[#35363c] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
            />
            <textarea
              placeholder="How can we help?"
              rows={5}
              className="w-full bg-[#35363c] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors resize-none"
            />
            <button
              type="submit"
              className="w-full bg-white text-[#292a30] font-semibold py-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Submit inquiry
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
