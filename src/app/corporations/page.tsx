import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Corporate Travel Solutions | AB.Limo",
  description:
    "Premium corporate travel solutions for business executives. Reliable chauffeur services with streamlined booking and consolidated invoicing.",
};

const imageGridItems = [
  {
    title: "Business trips",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=400&fit=crop",
  },
  {
    title: "City-to-City",
    image:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&h=400&fit=crop",
  },
  {
    title: "Airport transfers",
    image:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Client travel",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80",
  },
];

const reliabilityChecklist = [
  "Guaranteed on-time arrivals with real-time flight tracking",
  "Professional chauffeurs trained in executive service protocols",
  "24/7 live support for immediate assistance during trips",
  "Backup vehicle arrangements for unexpected situations",
  "GPS tracking and trip updates for travel managers",
];

const invoiceChecklist = [
  "Single monthly invoice for all corporate bookings",
  "Detailed expense reports broken down by department",
  "Integration with major expense management platforms",
  "Transparent pricing with no hidden surcharges",
  "Custom billing cycles to match your accounting needs",
];

const benefits = [
  {
    icon: "🕐",
    title: "By the hour",
    description: "Flexible hourly bookings for meetings and events",
  },
  {
    icon: "🌐",
    title: "Global coverage",
    description: "Consistent service across 1,500+ cities worldwide",
  },
  {
    icon: "💳",
    title: "Corporate accounts",
    description: "Dedicated billing and account management",
  },
  {
    icon: "📱",
    title: "Easy booking",
    description: "Book via app, web, or dedicated account manager",
  },
  {
    icon: "🚗",
    title: "Premium fleet",
    description: "Latest models from Mercedes, BMW, and Audi",
  },
  {
    icon: "🛡️",
    title: "Safety first",
    description: "Fully licensed, insured, and vetted chauffeurs",
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

const faqs = [
  {
    question: "How do I set up a corporate account?",
    answer:
      "Contact our corporate team to set up your account. We'll configure billing, preferred vehicles, and booking permissions tailored to your organization's needs.",
  },
  {
    question: "Can we manage multiple bookers under one account?",
    answer:
      "Yes. Our platform supports unlimited bookers with customizable permission levels, approval workflows, and department-level cost tracking.",
  },
  {
    question: "What payment options are available?",
    answer:
      "We accept corporate credit cards, bank transfers, and offer NET-30 terms for qualified accounts. All billing is consolidated into a single monthly invoice.",
  },
  {
    question: "How do you handle last-minute changes?",
    answer:
      "Our 24/7 support team can modify bookings in real-time. Changes to pickup times, routes, or vehicle types are accommodated whenever possible.",
  },
];

export default function CorporationsPage() {
  return (
    <main className="min-h-screen bg-[#292a30]">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1920&h=1080&fit=crop"
          alt="Corporate travel solutions"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#292a30]/80 via-[#292a30]/60 to-[#292a30]" />
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <p className="text-gray-400 text-sm tracking-widest uppercase mb-4">
            Home &gt; Corporations
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Corporate Travel Solutions for Business Executives
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
            &ldquo;AB.Limo consistently delivers exceptional service for our
            executive team. Their reliability and attention to detail set them
            apart from any other provider we&apos;ve worked with.&rdquo;
          </blockquote>
          <p className="text-gray-400 mt-6">
            — James Chen, Chief Financial Officer, Global Enterprises
          </p>
        </div>
      </section>

      {/* A New Level of Chauffeur Reliability */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              A new level of chauffeur reliability
            </h2>
            <p className="text-gray-400 mb-8">
              Every journey is backed by our commitment to punctuality and
              professionalism. Your executives deserve nothing less.
            </p>
            <ul className="space-y-4">
              {reliabilityChecklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
              alt="Reliable chauffeur service"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* A Relief from Chasing Invoices */}
      <section className="py-20 px-4 bg-[#1e1f24]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 rounded-2xl overflow-hidden order-2 md:order-1">
            <Image
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop"
              alt="Simplified invoicing"
              fill
              className="object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              A relief from chasing invoices
            </h2>
            <p className="text-gray-400 mb-8">
              Say goodbye to administrative headaches. Our consolidated billing
              makes expense management effortless.
            </p>
            <ul className="space-y-4">
              {invoiceChecklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Booking for Executives */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Booking for your executives
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Whether booking for yourself or on behalf of executives, our
            streamlined process ensures a seamless experience from start to
            finish.
          </p>
          <div className="relative h-64 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&h=400&fit=crop"
              alt="Booking platform"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* By the Hour */}
      <section className="py-20 px-4 bg-[#1e1f24]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              By the hour
            </h2>
            <p className="text-gray-400 mb-6">
              Need a chauffeur for multiple stops, meetings, or a full day of
              events? Our hourly service gives you the flexibility to move at
              your own pace.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-3">
                <span className="text-green-400">✓</span>
                Minimum 3-hour booking
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-400">✓</span>
                Wait time included at no extra cost
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-400">✓</span>
                Flexible route changes throughout the day
              </li>
            </ul>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=600&h=400&fit=crop"
              alt="By the hour chauffeur service"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-20 px-4">
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

      {/* Sustainability */}
      <section className="py-20 px-4 bg-[#1e1f24]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&h=400&fit=crop"
              alt="Sustainable transportation"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Sustainability committed
            </h2>
            <p className="text-gray-400 mb-6">
              We&apos;re committed to reducing our environmental impact while
              maintaining the highest standards of luxury service.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-3">
                <span className="text-green-400">✓</span>
                Carbon offset program for all rides
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-400">✓</span>
                Hybrid and electric vehicle options
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-400">✓</span>
                Environmental impact reports
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Benefits for your business
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
            Get started today
          </h2>
          <p className="text-gray-400 text-center mb-12">
            Set up your corporate account and experience premium executive
            travel.
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
              placeholder="Tell us about your travel needs"
              rows={5}
              className="w-full bg-[#35363c] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors resize-none"
            />
            <button
              type="submit"
              className="w-full bg-white text-[#292a30] font-semibold py-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Request corporate account
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
