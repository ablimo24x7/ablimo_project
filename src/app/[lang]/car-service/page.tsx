import Link from "next/link";
import Image from "next/image";
import BookingWidget from "@/components/BookingWidget";
import { getDictionary, hasLocale, defaultLocale, type Locale } from "@/app/[lang]/dictionaries";

const metadata = {
  title: "Professional Car Service with AB.Limo | AB.Limo",
  description:
    "Premium private car service worldwide. Book your professional ride with AB.Limo for airport transfers, business travel, and daily commutes.",
};

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    titleKey: "safeSecure" as const,
    descriptionKey: "safeSecureDesc" as const,
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    titleKey: "fixedPricing" as const,
    descriptionKey: "fixedPricingDesc" as const,
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    titleKey: "quickBooking" as const,
    descriptionKey: "quickBookingDesc" as const,
  },
];

const vehicleClasses = [
  {
    title: "Business Class",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0afe?w=800&h=500&fit=crop",
    passengers: 3,
    luggage: 2,
    description: "Reliable sedans for everyday executive travel",
  },
  {
    title: "First Class",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=500&fit=crop",
    passengers: 3,
    luggage: 3,
    description: "Premium luxury for special occasions",
  },
  {
    title: "Business Van/SUV",
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&h=500&fit=crop",
    passengers: 6,
    luggage: 6,
    description: "Spacious vehicles for groups and families",
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
  {
    questionKey: "q4" as const,
    answerKey: "q4Answer" as const,
  },
];

const featureTexts: Record<string, { title: string; description: string }> = {
  safeSecure: { title: "Safe & secure", description: "Your safety is our priority. All vehicles are regularly inspected and chauffeurs are fully licensed." },
  fixedPricing: { title: "Fixed pricing", description: "Know your fare before you ride. No hidden fees, no surge pricing, just honest and transparent rates." },
  quickBooking: { title: "Quick booking", description: "Book your ride in seconds through our app or website. Fast, easy, and convenient." },
};

const faqTexts: Record<string, { question: string; answer: string }> = {
  q1: { question: "What is a private car service?", answer: "A private car service provides on-demand transportation with professional chauffeurs and premium vehicles. Unlike ride-sharing, you get a dedicated vehicle and chauffeur for your exclusive use." },
  q2: { question: "How do I book a car service?", answer: "You can book through our website, mobile app, or by contacting our customer service team. Simply enter your pickup location, destination, and preferred vehicle class to get an instant quote." },
  q3: { question: "What payment methods do you accept?", answer: "We accept all major credit and debit cards, as well as digital payment methods. Payment is processed automatically at the end of your ride, so you don't need to carry cash." },
  q4: { question: "Can I schedule a ride in advance?", answer: "Yes, you can schedule rides up to 30 days in advance. This is perfect for airport transfers, business meetings, and special events where punctuality is essential." },
};

export default async function CarServicePage({
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
          src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1920&h=800&fit=crop"
          alt="Professional Car Service"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#292a30]" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 pb-8 flex flex-col lg:flex-row items-end justify-between gap-8">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              {dict.carService.title}
            </h1>
            <p className="text-lg text-gray-300">
              {dict.carService.subtitle}
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
          <span className="text-white">Car Service</span>
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
            {dict.carService.chooseClass}
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            {dict.carService.chooseClassDesc}
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
                  <h3 className="text-xl font-bold mb-2">{vehicle.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{vehicle.description}</p>
                  <div className="flex gap-4 text-sm text-gray-400">
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Black Car Service Worldwide */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1549317661-bd32c8ce0afe?w=800&h=600&fit=crop"
              alt="Black Car Service"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {dict.carService.blackCarWorldwide.title}
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              {dict.carService.blackCarWorldwide.desc}
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span className="text-gray-400">{dict.carService.blackCarWorldwide.consistent}</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span className="text-gray-400">{dict.carService.blackCarWorldwide.premium}</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span className="text-gray-400">{dict.carService.blackCarWorldwide.professional}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Your Professional Car Service */}
      <section className="bg-[#1c1d21] py-20 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {dict.carService.professional.title}
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              {dict.carService.professional.desc}
            </p>
            <p className="text-gray-400 leading-relaxed">
              {dict.carService.professional.desc2}
            </p>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden order-1 lg:order-2">
            <Image
              src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=600&fit=crop"
              alt="Professional Service"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Corporate Car Service */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
              alt="Corporate Car Service"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {dict.carService.corporate.title}
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              {dict.carService.corporate.desc}
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span className="text-gray-400">{dict.carService.corporate.accountManagement}</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span className="text-gray-400">{dict.carService.corporate.billing}</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span className="text-gray-400">{dict.carService.corporate.priorityBooking}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#1c1d21] py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {dict.carService.faq.title}
          </h2>
          <div className="space-y-4">
            {faqItems.map((item) => {
              const texts = faqTexts[item.questionKey];
              return (
                <div
                  key={item.questionKey}
                  className="bg-[#292a30] rounded-2xl overflow-hidden"
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-8 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          {dict.carService.cta.title}
        </h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          {dict.carService.cta.desc}
        </p>
        <Link
          href="/"
          className="inline-block bg-white text-[#292a30] px-8 py-3 text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
        >
          {dict.carService.cta.bookYourRide}
        </Link>
      </section>
    </main>
  );
}
