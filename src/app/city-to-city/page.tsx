"use client";

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const cityToCityMetadata: Metadata = {
  title: "City-to-City Long Distance Car Service | AB.Limo",
  description:
    "Travel between cities in luxury and comfort. Book a long distance car service with professional chauffeurs and premium vehicles.",
};

const benefits = [
  "Comfortable, door-to-door service without the hassle of airports",
  "Fixed prices with no hidden fees or surge pricing",
  "Professional chauffeurs with extensive route knowledge",
  "Premium vehicles equipped with Wi-Fi and refreshments",
  "Flexible scheduling and last-minute bookings available",
  "Track your journey in real-time with our mobile app",
];

const topCities = [
  { name: "Dubai", country: "UAE", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop" },
  { name: "Riyadh", country: "Saudi Arabia", image: "https://images.unsplash.com/photo-1578895102346-7e342c3f3b50?w=400&h=300&fit=crop" },
  { name: "Doha", country: "Qatar", image: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=400&h=300&fit=crop" },
  { name: "Abu Dhabi", country: "UAE", image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&h=300&fit=crop" },
];

const topRoutes = [
  { from: "Dubai", to: "Abu Dhabi", distance: "140 km", duration: "1h 30m" },
  { from: "Riyadh", to: "Dammam", distance: "400 km", duration: "4h 00m" },
  { from: "Doha", to: "Al Khor", distance: "50 km", duration: "45m" },
  { from: "Jeddah", to: "Mecca", distance: "80 km", duration: "1h 00m" },
  { from: "Manama", to: "Al Khobar", distance: "110 km", duration: "1h 30m" },
  { from: "Dubai", to: "Sharjah", distance: "30 km", duration: "30m" },
];

const faqItems = [
  {
    question: "How long does a city-to-city transfer take?",
    answer:
      "The duration depends on the distance between cities. For example, Dubai to Abu Dhabi takes approximately 1.5 hours, while Riyadh to Dammam takes around 4 hours. Your chauffeur will choose the most efficient route.",
  },
  {
    question: "Can I make stops during my city-to-city journey?",
    answer:
      "Yes, you can request additional stops during your journey. Simply let us know your requirements when booking, or communicate with your chauffeur during the trip. Additional stops may incur extra charges.",
  },
  {
    question: "What vehicles are available for long distance travel?",
    answer:
      "We offer Business Class sedans, First Class luxury sedans, and Business Van/SUV options for city-to-city travel. All vehicles are equipped with Wi-Fi, charging ports, and refreshments for your comfort.",
  },
  {
    question: "Is there a maximum distance for city-to-city transfers?",
    answer:
      "We cover distances up to 500 km for a single booking. For longer distances, we can arrange multi-day transfers with overnight stops at premium hotels along the route.",
  },
  {
    question: "Can I book a round trip?",
    answer:
      "Yes, round-trip bookings are available. You can schedule your return journey at the time of booking or arrange it later through our app or customer service.",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "Free cancellation is available up to 24 hours before your scheduled pickup. Cancellations within 24 hours may incur a fee. Please check our terms for full details.",
  },
  {
    question: "Do you provide child seats?",
    answer:
      "Yes, child seats are available upon request. Please mention your requirements when booking so we can ensure the appropriate seat is installed in your vehicle.",
  },
  {
    question: "Are your prices fixed or metered?",
    answer:
      "All our city-to-city transfers have fixed prices. You'll see the exact fare when you book, with no hidden charges or surge pricing.",
  },
];

const testimonials = [
  {
    name: "Ahmad Al-Rashid",
    role: "Business Executive",
    text: "The Dubai to Abu Dhabi transfer was seamless. My chauffeur was professional, the car was immaculate, and I arrived relaxed and ready for my meeting.",
    rating: 5,
  },
  {
    name: "Sarah Johnson",
    role: "Frequent Traveler",
    text: "I use AB.Limo for all my intercity travel in the Gulf region. The consistency and quality of service is unmatched. Highly recommended.",
    rating: 5,
  },
  {
    name: "Mohammed Al-Thani",
    role: "Corporate Client",
    text: "Our company uses AB.Limo for all executive city-to-city transfers. The reliability and professionalism of their chauffeurs is exceptional.",
    rating: 5,
  },
];

export default function CityToCityPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-[#292a30] text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=1920&h=800&fit=crop"
          alt="City to City Travel"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#292a30]" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            City-to-City Long Distance Car Service
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Travel between cities in luxury and comfort with professional chauffeurs.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-[#292a30] px-8 py-3 text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
          >
            Book Your Journey
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
          <span className="text-white">City-to-City</span>
        </nav>
      </div>

      {/* App Download Section */}
      <section className="max-w-7xl mx-auto px-8 py-16">
        <div className="bg-[#1c1d21] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Download the AB.Limo App
            </h2>
            <p className="text-gray-400 mb-6">
              Book your city-to-city transfer on the go. Track your chauffeur, manage bookings, and enjoy exclusive app-only offers.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:opacity-80 transition-opacity">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                  alt="Download on the App Store"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  width={135}
                  height={40}
                  className="h-10 w-auto"
                />
              </a>
            </div>
          </div>
          <div className="w-48 h-48 bg-white rounded-2xl flex items-center justify-center">
            <div className="text-center text-[#292a30]">
              <svg className="w-24 h-24 mx-auto mb-2" viewBox="0 0 100 100" fill="none">
                <rect width="100" height="100" rx="8" fill="#292a30" />
                <rect x="10" y="10" width="80" height="80" rx="4" fill="white" />
                <rect x="20" y="20" width="10" height="10" fill="#292a30" />
                <rect x="70" y="20" width="10" height="10" fill="#292a30" />
                <rect x="20" y="70" width="10" height="10" fill="#292a30" />
                <rect x="45" y="45" width="10" height="10" fill="#292a30" />
                <rect x="35" y="35" width="5" height="5" fill="#292a30" />
                <rect x="60" y="35" width="5" height="5" fill="#292a30" />
                <rect x="35" y="60" width="5" height="5" fill="#292a30" />
                <rect x="60" y="60" width="5" height="5" fill="#292a30" />
                <rect x="70" y="70" width="10" height="10" fill="#292a30" />
              </svg>
              <span className="text-xs font-semibold">Scan QR Code</span>
            </div>
          </div>
        </div>
      </section>

      {/* Better Way Section */}
      <section className="bg-[#1c1d21] py-20 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Long distance car service, the better way
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              Skip the hassle of airports and enjoy a comfortable door-to-door journey between cities. Our long distance car service offers the perfect alternative to driving yourself or flying short distances.
            </p>
            <ul className="space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <span className="text-gray-400">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop"
              alt="Long Distance Travel"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Global Reach Section */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Global reach
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Our long distance car service covers major routes across the Middle East and beyond.
        </p>
        <div className="relative h-[400px] rounded-2xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1200&h=600&fit=crop"
            alt="Global Map"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </section>

      {/* Routes Section */}
      <section className="bg-[#1c1d21] py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            City-to-City routes
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Popular routes with competitive fixed pricing and professional chauffeurs.
          </p>

          {/* Top Cities */}
          <div className="mb-16">
            <h3 className="text-xl font-semibold mb-6">Top cities</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {topCities.map((city) => (
                <div
                  key={city.name}
                  className="relative h-40 rounded-xl overflow-hidden group cursor-pointer"
                >
                  <Image
                    src={city.image}
                    alt={city.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h4 className="font-bold">{city.name}</h4>
                    <p className="text-xs text-gray-300">{city.country}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Routes */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Top routes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topRoutes.map((route) => (
                <div
                  key={`${route.from}-${route.to}`}
                  className="bg-[#292a30] p-5 rounded-xl flex items-center justify-between hover:bg-[#2a2c35] transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{route.from}</span>
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                      <span className="font-semibold">{route.to}</span>
                    </div>
                    <p className="text-xs text-gray-400">
                      {route.distance} &middot; {route.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-8 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={item.question}
              className="bg-[#1c1d21] rounded-2xl overflow-hidden"
            >
              <button
                className="w-full p-6 text-left flex items-center justify-between hover:bg-[#2a2c35] transition-colors"
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
              >
                <h3 className="text-lg font-semibold pr-4">{item.question}</h3>
                <svg
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                    activeFaq === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  activeFaq === index ? "max-h-48 pb-6" : "max-h-0"
                }`}
              >
                <p className="text-gray-400 text-sm leading-relaxed">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-[#1c1d21] py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What our customers say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-[#292a30] p-8 rounded-2xl"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-8 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready for your next city-to-city journey?
        </h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Book your long distance transfer today and travel in luxury and comfort.
        </p>
        <Link
          href="/"
          className="inline-block bg-white text-[#292a30] px-8 py-3 text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
        >
          Book Now
        </Link>
      </section>
    </main>
  );
}
