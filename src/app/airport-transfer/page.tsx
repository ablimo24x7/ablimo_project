import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Airport Transfer Service Worldwide | AB.Limo",
  description:
    "Book a luxury airport transfer service worldwide. Competitive rates, professional chauffeurs, and seamless airport travel with AB.Limo.",
};

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Competitive rates",
    description: "Enjoy transparent pricing with no hidden fees. Our airport transfer rates are competitive and fixed upfront.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Seamless airport travel",
    description: "From booking to drop-off, enjoy a smooth and hassle-free airport transfer experience.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Travel on your terms",
    description: "Schedule your pickup at your convenience. Our chauffeurs wait for you, even if your flight is delayed.",
  },
];

const vehicleClasses = [
  {
    title: "Business Class",
    image: "https://images.unsplash.com/photo-1619221496652-7ee3d7406203?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    passengers: 3,
    luggage: 2,
    features: ["Wi-Fi", "Water bottles", "Phone charger"],
  },
  {
    title: "First Class",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=500&fit=crop",
    passengers: 3,
    luggage: 3,
    features: ["Wi-Fi", "Refreshments", "Premium leather seats"],
  },
  {
    title: "Business Van/SUV",
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&h=500&fit=crop",
    passengers: 6,
    luggage: 6,
    features: ["Wi-Fi", "Spacious interior", "Extra luggage space"],
  },
];

const faqItems = [
  {
    question: "How do I book an airport transfer?",
    answer:
      "You can book an airport transfer through our website or mobile app. Simply enter your pickup and drop-off locations, select your preferred vehicle class, and confirm your booking. You'll receive a confirmation with your chauffeur details.",
  },
  {
    question: "What happens if my flight is delayed?",
    answer:
      "We monitor all flights in real-time. If your flight is delayed, your chauffeur will automatically adjust the pickup time. You won't be charged extra for flight delays, and your chauffeur will be waiting when you land.",
  },
  {
    question: "Is meet and greet service included?",
    answer:
      "Yes, meet and greet service is included with all airport transfers. Your chauffeur will meet you in the arrivals hall with a personalized name board and assist you with your luggage.",
  },
];

const globalCities = [
  "Dubai", "Riyadh", "Doha", "Abu Dhabi", "Jeddah", "London",
  "Paris", "New York", "Singapore", "Tokyo", "Berlin", "Istanbul",
];

export default function AirportTransferPage() {
  return (
    <main className="min-h-screen bg-[#292a30] text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=1920&h=800&fit=crop"
          alt="Airport Transfer"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#292a30]" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Airport Transfer Service Worldwide
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Seamless, reliable, and luxurious airport transfers in cities around the globe.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-[#292a30] px-8 py-3 text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
          >
            Book Now
          </Link>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-8 py-6">
        <nav className="text-sm text-gray-400">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">Airport Transfer</span>
        </nav>
      </div>

      {/* Feature Cards */}
      <section className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-[#1c1d21] p-8 rounded-2xl hover:bg-[#2a2c35] transition-colors"
            >
              <div className="text-gray-400 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Service Classes */}
      <section className="bg-[#1c1d21] py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Discover our service classes
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Choose from our range of premium vehicles to match your travel needs and style preferences.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {vehicleClasses.map((vehicle) => (
              <div
                key={vehicle.title}
                className="bg-[#292a30] rounded-2xl overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">{vehicle.title}</h3>
                  <div className="flex gap-4 text-sm text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                      {vehicle.passengers} Passengers
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17 6h-2V3c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v3H7c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2 0 .55.45 1 1 1s1-.45 1-1h6c0 .55.45 1 1 1s1-.45 1-1c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z" />
                      </svg>
                      {vehicle.luggage} Luggage
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {vehicle.features.map((feat) => (
                      <li key={feat} className="text-sm text-gray-400 flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Cities */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Airport transfer in global cities
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Our airport transfer service is available in major cities worldwide. Whether you're landing in Dubai, departing from London, or connecting through Singapore, our professional chauffeurs ensure a smooth journey.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              With local knowledge and international standards, we provide consistent quality no matter where your travels take you.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {globalCities.map((city) => (
                <div
                  key={city}
                  className="bg-[#1c1d21] px-4 py-3 rounded-lg text-sm text-gray-300 hover:bg-[#2a2c35] transition-colors cursor-pointer"
                >
                  {city}
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop"
              alt="Global Cities"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Get to or from the airport */}
      <section className="bg-[#1c1d21] py-20 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] rounded-2xl overflow-hidden order-2 lg:order-1">
            <Image
              src="https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?w=800&h=600&fit=crop"
              alt="Airport Terminal"
              fill
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Get to or from the airport
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Whether you need a ride to catch your flight or a comfortable transfer after landing, AB.Limo has you covered. Our airport transfer service is designed to make your journey as smooth as possible.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span className="text-gray-400">Flight tracking for accurate pickup times</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span className="text-gray-400">Complimentary 60-minute wait time</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span className="text-gray-400">Meet and greet at arrivals</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span className="text-gray-400">Luggage assistance included</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-8 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqItems.map((item) => (
            <div
              key={item.question}
              className="bg-[#1c1d21] rounded-2xl overflow-hidden"
            >
              <details className="group">
                <summary className="w-full p-6 text-left flex items-center justify-between hover:bg-[#2a2c35] transition-colors cursor-pointer list-none">
                  <h3 className="text-lg font-semibold pr-4">{item.question}</h3>
                  <svg
                    className="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed">
                  {item.answer}
                </div>
              </details>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1c1d21] py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to book your airport transfer?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Experience seamless airport transfers with professional chauffeurs and premium vehicles.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-[#292a30] px-8 py-3 text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
          >
            Book Your Transfer
          </Link>
        </div>
      </section>
    </main>
  );
}
