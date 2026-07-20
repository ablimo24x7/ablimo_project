import Link from "next/link";
import Image from "next/image";
import BookingWidget from "@/components/BookingWidget";
import { getDictionary, hasLocale, defaultLocale, type Locale } from "@/app/[lang]/dictionaries";

const metadata = {
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
    titleKey: "competitiveRates" as const,
    descriptionKey: "competitiveRatesDesc" as const,
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    titleKey: "seamlessTravel" as const,
    descriptionKey: "seamlessTravelDesc" as const,
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    titleKey: "travelOnYourTerms" as const,
    descriptionKey: "travelOnYourTermsDesc" as const,
  },
];

const vehicleClasses = [
  {
    title: "Business Class",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0afe?w=800&h=500&fit=crop",
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
    questionKey: "q1" as const,
    answerKey: "q1Answer" as const,
  },
  {
    questionKey: "q2" as const,
    answerKey: "q2Answer" as const,
  },
  {
    questionKey: "q3" as const,
    answerKey: "q3Answer" as const,
  },
];

const globalCities = [
  "Dubai", "Riyadh", "Doha", "Abu Dhabi", "Jeddah", "London",
  "Paris", "New York", "Singapore", "Tokyo", "Berlin", "Istanbul",
];

const featureTexts: Record<string, { title: string; description: string }> = {
  competitiveRates: { title: "Competitive rates", description: "Enjoy transparent pricing with no hidden fees. Our airport transfer rates are competitive and fixed upfront." },
  seamlessTravel: { title: "Seamless airport travel", description: "From booking to drop-off, enjoy a smooth and hassle-free airport transfer experience." },
  travelOnYourTerms: { title: "Travel on your terms", description: "Schedule your pickup at your convenience. Our chauffeurs wait for you, even if your flight is delayed." },
};

const faqTexts: Record<string, { question: string; answer: string }> = {
  q1: { question: "How do I book an airport transfer?", answer: "You can book an airport transfer through our website or mobile app. Simply enter your pickup and drop-off locations, select your preferred vehicle class, and confirm your booking. You'll receive a confirmation with your chauffeur details." },
  q2: { question: "What happens if my flight is delayed?", answer: "We monitor all flights in real-time. If your flight is delayed, your chauffeur will automatically adjust the pickup time. You won't be charged extra for flight delays, and your chauffeur will be waiting when you land." },
  q3: { question: "Is meet and greet service included?", answer: "Yes, meet and greet service is included with all airport transfers. Your chauffeur will meet you in the arrivals hall with a personalized name board and assist you with your luggage." },
};

export default async function AirportTransferPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);

  return (
    <main className="min-h-screen bg-[#292a30] text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=1920&h=800&fit=crop"
          alt="Airport Transfer"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#292a30]" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 pb-8 flex flex-col lg:flex-row items-end justify-between gap-8">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              {dict.airportTransfer.title}
            </h1>
            <p className="text-lg text-gray-300">
              {dict.airportTransfer.subtitle}
            </p>
          </div>
          <BookingWidget dict={dict} />
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
          {features.map((feature) => {
            const texts = featureTexts[feature.titleKey];
            return (
              <div
                key={feature.titleKey}
                className="bg-[#1c1d21] p-8 rounded-2xl hover:bg-[#2a2c35] transition-colors"
              >
                <div className="text-gray-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{texts.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {texts.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Service Classes */}
      <section className="bg-[#1c1d21] py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {dict.airportTransfer.discoverClasses}
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            {dict.airportTransfer.discoverClassesDesc}
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
              {dict.airportTransfer.globalCities.title}
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              {dict.airportTransfer.globalCities.desc1}
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              {dict.airportTransfer.globalCities.desc2}
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
              {dict.airportTransfer.getToFromAirport.title}
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              {dict.airportTransfer.getToFromAirport.desc}
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span className="text-gray-400">{dict.airportTransfer.getToFromAirport.flightTracking}</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span className="text-gray-400">{dict.airportTransfer.getToFromAirport.waitTime}</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span className="text-gray-400">{dict.airportTransfer.getToFromAirport.meetGreet}</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span className="text-gray-400">{dict.airportTransfer.getToFromAirport.luggageAssist}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-8 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {dict.airportTransfer.faq.title}
        </h2>
        <div className="space-y-4">
          {faqItems.map((item) => {
            const texts = faqTexts[item.questionKey];
            return (
              <div
                key={item.questionKey}
                className="bg-[#1c1d21] rounded-2xl overflow-hidden"
              >
                <details className="group">
                  <summary className="w-full p-6 text-left flex items-center justify-between hover:bg-[#2a2c35] transition-colors cursor-pointer list-none">
                    <h3 className="text-lg font-semibold pr-4">{texts.question}</h3>
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
                    {texts.answer}
                  </div>
                </details>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1c1d21] py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {dict.airportTransfer.cta.title}
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            {dict.airportTransfer.cta.desc}
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-[#292a30] px-8 py-3 text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
          >
            {dict.airportTransfer.cta.bookYourTransfer}
          </Link>
        </div>
      </section>
    </main>
  );
}
