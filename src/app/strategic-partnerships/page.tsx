import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Partnership Opportunities with AB.Limo | Strategic Partnerships",
  description:
    "Explore strategic partnership opportunities with AB.Limo. Join forces with a leading luxury chauffeur service across aviation, cruise, financial, and hotel sectors.",
};

const partnershipCards = [
  {
    title: "Aviation",
    description:
      "Seamlessly connect your passengers with premium ground transportation. Integrate our API into your booking flow for a complete travel experience.",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=600&h=400&fit=crop",
    icon: "✈️",
  },
  {
    title: "Cruise",
    description:
      "Enhance your cruise packages with luxury port transfers and shore excursion transportation. Delight guests from embarkation to disembarkation.",
    image:
      "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=600&h=400&fit=crop",
    icon: "🚢",
  },
  {
    title: "Financial services",
    description:
      "Add premium transportation as a perk for high-net-worth clients. Elevate your wealth management offerings with exclusive chauffeur access.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
    icon: "💼",
  },
  {
    title: "Hotel",
    description:
      "Extend your hospitality beyond the lobby. Offer guests luxury chauffeur services as part of their stay with seamless booking integration.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
    icon: "🏨",
  },
];

const benefits = [
  {
    icon: "📈",
    title: "Revenue growth",
    description: "New revenue streams through commissions and referrals",
  },
  {
    icon: "🤝",
    title: "Brand alignment",
    description: "Partner with a premium luxury brand trusted worldwide",
  },
  {
    icon: "🔧",
    title: "Technical integration",
    description: "Seamless API integration with dedicated developer support",
  },
  {
    icon: "📊",
    title: "Data insights",
    description: "Access to analytics and reporting for partnership performance",
  },
  {
    icon: "🌍",
    title: "Global reach",
    description: "Access to 1,500+ cities across 50+ countries",
  },
  {
    icon: "🛡️",
    title: "Reliability",
    description: "99.8% on-time performance backed by SLA guarantees",
  },
];

const apiFeatures = [
  "RESTful API with comprehensive documentation",
  "Webhook notifications for real-time trip updates",
  "Sandbox environment for testing and development",
  "SDKs for JavaScript, Python, Ruby, and PHP",
  "Dedicated technical integration support",
  "99.99% API uptime guarantee",
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
    title: "Innovation in Mobility",
    year: "2025",
    organization: "Mobility Innovation Summit",
  },
];

export default function StrategicPartnershipsPage() {
  return (
    <main className="min-h-screen bg-[#292a30]">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop"
          alt="Strategic partnerships"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#292a30]/80 via-[#292a30]/60 to-[#292a30]" />
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <p className="text-gray-400 text-sm tracking-widest uppercase mb-4">
            Home &gt; Strategic Partnerships
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Partnership Opportunities with AB.Limo
          </h1>
        </div>
      </section>

      {/* Partnership Cards */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Industries we partner with
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            We collaborate with leaders across industries to deliver integrated
            luxury transportation solutions.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {partnershipCards.map((card) => (
              <div
                key={card.title}
                className="bg-[#35363c] rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="relative h-56">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 w-12 h-12 bg-[#292a30]/80 rounded-full flex items-center justify-center">
                    <span className="text-2xl">{card.icon}</span>
                  </div>
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

      {/* Benefits Grid */}
      <section className="py-20 px-4 bg-[#1e1f24]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why partner with AB.Limo
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-[#35363c] p-6 rounded-xl text-center hover:bg-[#3d3e45] transition-colors"
              >
                <span className="text-3xl mb-4 block">{benefit.icon}</span>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Integrations */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Powerful API integrations
            </h2>
            <p className="text-gray-400 mb-8">
              Our robust API enables seamless integration into your existing
              systems, providing a frictionless experience for your customers
              and operations team.
            </p>
            <ul className="space-y-4">
              {apiFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#35363c] rounded-2xl p-8">
            <div className="bg-[#1e1f24] rounded-xl p-6 font-mono text-sm">
              <p className="text-gray-500 mb-2">// Example API request</p>
              <p className="text-green-400">const</p>{" "}
              <span className="text-blue-400">response</span>{" "}
              <span className="text-white">=</span>{" "}
              <span className="text-green-400">await</span>{" "}
              <span className="text-blue-400">fetch</span>
              <span className="text-white">(</span>
              <span className="text-yellow-300">
                &apos;/api/v1/bookings&apos;
              </span>
              <span className="text-white">, {"{"}</span>
              <p className="ml-4 text-gray-300">method: &apos;POST&apos;,</p>
              <p className="ml-4 text-gray-300">
                headers: {"{"} Authorization: &apos;Bearer token&apos; {"}"}
              </p>
              <span className="text-white">{"}"}</span>
              <span className="text-white">)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-20 px-4 bg-[#1e1f24]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Recognition and awards
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

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to create a partnership?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Let&apos;s explore how a strategic partnership with AB.Limo can drive
            growth for your business. Our partnerships team is ready to discuss
            opportunities tailored to your industry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#contact"
              className="inline-block bg-white text-[#292a30] font-semibold px-8 py-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Contact partnerships team
            </Link>
            <Link
              href="#"
              className="inline-block border border-gray-600 text-white font-semibold px-8 py-4 rounded-lg hover:border-gray-400 transition-colors"
            >
              Download partnership brochure
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 px-4 bg-[#1e1f24]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Get in touch
          </h2>
          <p className="text-gray-400 text-center mb-12">
            Tell us about your business and how you&apos;d like to partner with
            AB.Limo.
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
            <select className="w-full bg-[#35363c] border border-gray-600 rounded-lg px-4 py-3 text-gray-400 focus:outline-none focus:border-gray-400 transition-colors">
              <option value="">Select industry</option>
              <option value="aviation">Aviation</option>
              <option value="cruise">Cruise</option>
              <option value="financial">Financial Services</option>
              <option value="hotel">Hotel & Hospitality</option>
              <option value="other">Other</option>
            </select>
            <textarea
              placeholder="Tell us about your partnership goals"
              rows={5}
              className="w-full bg-[#35363c] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors resize-none"
            />
            <button
              type="submit"
              className="w-full bg-white text-[#292a30] font-semibold py-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Submit partnership inquiry
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
