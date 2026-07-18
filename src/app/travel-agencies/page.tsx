import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Global Chauffeur Services for Travel Agencies | AB.Limo",
  description:
    "Partner with AB.Limo to offer your clients world-class chauffeur services. Earn commission and boost your brand reputation with our travel agency program.",
};

const imageGridItems = [
  {
    title: "Award-winning",
    image:
      "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600&h=400&fit=crop",
  },
  {
    title: "Ease of booking",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
  },
  {
    title: "Global yet local",
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop",
  },
  {
    title: "Carbon offset",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop",
  },
];

const commissionChecklist = [
  "Earn competitive commissions on every booking",
  "Tiered commission structure for high-volume partners",
  "Monthly commission payments with transparent reporting",
  "Dedicated partner success manager",
  "Marketing materials and co-branding opportunities",
];

const benefits = [
  {
    icon: "💰",
    title: "Additional revenue",
    description: "Generate income from every chauffeur booking",
  },
  {
    icon: "🌍",
    title: "Global fleet access",
    description: "1,500+ cities with consistent service quality",
  },
  {
    icon: "🔗",
    title: "API integration",
    description: "Seamlessly integrate into your booking platform",
  },
  {
    icon: "📊",
    title: "Dashboard reporting",
    description: "Real-time visibility into bookings and commissions",
  },
  {
    icon: "🤝",
    title: "Dedicated support",
    description: "Partner success team for ongoing assistance",
  },
  {
    icon: "🎯",
    title: "White-label options",
    description: "Customize the experience under your brand",
  },
];

const fleetHighlights = [
  {
    title: "Solo travel",
    description:
      "Sedans and executive vehicles for individual business travelers seeking comfort and style.",
  },
  {
    title: "Group travel",
    description:
      "SUVs, vans, and minibuses for team outings, conferences, and group transfers.",
  },
  {
    title: "Memorable amenities",
    description:
      "Wi-Fi, refreshments, child seats, and special requests accommodated with care.",
  },
];

const apiFeatures = [
  "RESTful API with comprehensive documentation",
  "Webhook notifications for real-time trip updates",
  "Sandbox environment for testing",
  "Rate limiting and authentication security",
  "SDKs available for major programming languages",
];

const faqs = [
  {
    question: "How do I become a travel agency partner?",
    answer:
      "Contact our partnerships team to discuss your agency's needs. We'll set up your account, provide API documentation, and guide you through the integration process.",
  },
  {
    question: "What commission rates do you offer?",
    answer:
      "Commission rates vary based on booking volume. We offer competitive tiered structures starting at 8% with opportunities for increased rates as volume grows.",
  },
  {
    question: "Can I white-label the booking experience?",
    answer:
      "Yes. Our white-label solution allows you to present the chauffeur booking experience under your own brand, maintaining consistency with your agency's identity.",
  },
  {
    question: "What support do you provide to partners?",
    answer:
      "Partners receive a dedicated success manager, 24/7 technical support, marketing materials, and access to our partner portal with training resources.",
  },
];

export default function TravelAgenciesPage() {
  return (
    <main className="min-h-screen bg-[#292a30]">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&h=1080&fit=crop"
          alt="Travel agency chauffeur services"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#292a30]/80 via-[#292a30]/60 to-[#292a30]" />
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <p className="text-gray-400 text-sm tracking-widest uppercase mb-4">
            Home &gt; Travel Agencies
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Global Chauffeur Services for Travel Agencies
          </h1>
        </div>
      </section>

      {/* Image Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {imageGridItems.map((item) => (
              <div
                key={item.title}
                className="relative h-64 rounded-xl overflow-hidden group"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#292a30] via-transparent to-transparent" />
                <p className="absolute bottom-4 left-4 font-semibold">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-16 px-4 bg-[#1e1f24]">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-xl md:text-2xl font-light italic text-gray-200 leading-relaxed">
            &ldquo;Partnering with AB.Limo has elevated our service offering.
            Our clients love the consistency and quality, and the commission
            structure has been a significant revenue driver for our agency.&rdquo;
          </blockquote>
          <p className="text-gray-400 mt-6">
            — Maria Rodriguez, Director, Prestige Travel Group
          </p>
        </div>
      </section>

      {/* Additional Revenue and Commission */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Additional revenue and commission
            </h2>
            <p className="text-gray-400 mb-8">
              Turn every ground transportation need into a revenue opportunity.
              Our partnership program is designed to reward your success.
            </p>
            <ul className="space-y-4">
              {commissionChecklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop"
              alt="Revenue and commission"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Vehicles Ready for All Occasions */}
      <section className="py-20 px-4 bg-[#1e1f24]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Vehicles ready for all occasions
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            From solo business trips to group transfers, our diverse fleet
            ensures the right vehicle for every client need.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {fleetHighlights.map((item) => (
              <div key={item.title} className="bg-[#35363c] p-8 rounded-xl">
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliver Top-Notch Client Satisfaction */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 rounded-2xl overflow-hidden order-2 md:order-1">
            <Image
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop"
              alt="Client satisfaction"
              fill
              className="object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Deliver top-notch client satisfaction
            </h2>
            <p className="text-gray-400 mb-6">
              Impress your clients with a premium chauffeur experience that
              exceeds expectations at every touchpoint.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-3">
                <span className="text-green-400">✓</span>
                Professional, multilingual chauffeurs
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-400">✓</span>
                Real-time booking confirmations
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-400">✓</span>
                Post-trip feedback collection
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-400">✓</span>
                99.8% customer satisfaction rate
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Boost Your Brand Reputation */}
      <section className="py-20 px-4 bg-[#1e1f24]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Boost your brand reputation
            </h2>
            <p className="text-gray-400 mb-6">
              Align your agency with a premium brand that clients trust. Our
              award-winning service reflects positively on your business.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-3">
                <span className="text-green-400">✓</span>
                Co-branded marketing materials
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-400">✓</span>
                White-label booking options
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-400">✓</span>
                Social media partnership opportunities
              </li>
            </ul>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1552581234-26160f608093?w=600&h=400&fit=crop"
              alt="Brand reputation"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our fleet
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-72 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0abb?w=800&h=500&fit=crop"
                alt="Executive sedan"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-[#292a30]/80 px-4 py-2 rounded-lg">
                <p className="font-semibold">Executive Sedans</p>
                <p className="text-gray-400 text-sm">
                  Mercedes E-Class, BMW 5 Series
                </p>
              </div>
            </div>
            <div className="relative h-72 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&h=500&fit=crop"
                alt="Luxury SUV"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-[#292a30]/80 px-4 py-2 rounded-lg">
                <p className="font-semibold">Luxury SUVs</p>
                <p className="text-gray-400 text-sm">
                  Mercedes GLS, Range Rover
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Integrations */}
      <section className="py-20 px-4 bg-[#1e1f24]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            API integrations
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Integrate our booking system directly into your platform for a
            seamless experience.
          </p>
          <div className="bg-[#35363c] rounded-2xl p-8">
            <ul className="space-y-4">
              {apiFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <span className="text-green-400">✓</span>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Partner benefits
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

      {/* Contact Form */}
      <section id="contact" className="py-20 px-4 bg-[#1e1f24]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Become a partner
          </h2>
          <p className="text-gray-400 text-center mb-12">
            Ready to add premium chauffeur services to your offerings?
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
              placeholder="Agency name"
              className="w-full bg-[#35363c] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
            />
            <textarea
              placeholder="Tell us about your agency"
              rows={5}
              className="w-full bg-[#35363c] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors resize-none"
            />
            <button
              type="submit"
              className="w-full bg-white text-[#292a30] font-semibold py-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Apply for partnership
            </button>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="bg-[#35363c] rounded-xl overflow-hidden"
              >
                <details className="group">
                  <summary className="w-full p-6 text-left flex items-center justify-between hover:bg-[#3d3e45] transition-colors cursor-pointer list-none">
                    <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                    <svg
                      className="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6 text-gray-400">
                    {faq.answer}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
