import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About AB.Limo - Premium Luxury Chauffeur Service",
  description:
    "Learn about AB.Limo, a premium luxury chauffeur service operating across 60 countries and 500+ cities worldwide.",
};

const stats = [
  { number: "60+", label: "Countries" },
  { number: "500+", label: "Cities" },
  { number: "10+", label: "Years of Innovation" },
  { number: "1M+", label: "Rides Completed" },
];

const vehicleClasses = [
  {
    name: "Business Class",
    image:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&h=400&fit=crop",
    description:
      "Comfortable sedans with professional chauffeurs for everyday travel.",
  },
  {
    name: "First Class",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0abb?w=600&h=400&fit=crop",
    description:
      "Premium vehicles offering the highest level of luxury and sophistication.",
  },
  {
    name: "Business Van/SUV",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop",
    description:
      "Spacious vehicles for group travel with ample luggage capacity.",
  },
];

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Quality Standards",
    description:
      "Every vehicle in our fleet meets the highest quality and comfort standards.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Safety First",
    description:
      "Professional chauffeurs trained to the highest safety protocols worldwide.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Sustainability",
    description:
      "Committed to reducing our environmental impact through electric vehicles.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Global Reach",
    description:
      "Serving passengers in over 60 countries with consistently excellent service.",
  },
];

const faqItems = [
  {
    question: "How do I book a ride with AB.Limo?",
    answer:
      "Booking is simple. Use our website or mobile app to enter your pickup and drop-off locations, select your vehicle class, and confirm your reservation. You'll receive instant confirmation and real-time updates.",
  },
  {
    question: "What areas does AB.Limo operate in?",
    answer:
      "We operate in over 60 countries and 500+ cities worldwide, including major cities across the Middle East, Europe, Asia, and North America.",
  },
  {
    question: "Can I schedule rides in advance?",
    answer:
      "Yes, you can schedule rides up to 60 days in advance. This is perfect for airport transfers, business meetings, and special events.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept all major credit cards, debit cards, and digital payment methods. Corporate accounts can also be set up for business travel.",
  },
  {
    question: "Is AB.Limo available for corporate accounts?",
    answer:
      "Absolutely. We offer tailored corporate solutions with dedicated account management, consolidated billing, and preferential rates for businesses of all sizes.",
  },
];

const cities = [
  "Dubai",
  "Riyadh",
  "Doha",
  "Abu Dhabi",
  "Jeddah",
  "Manama",
  "London",
  "Paris",
  "New York",
  "Singapore",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1563720223185-11003d516935?w=1920&h=1080&fit=crop"
          alt="AB.Limo luxury chauffeur service"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#292a30]/70 via-[#292a30]/50 to-[#292a30]" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-wide">
            About AB.Limo
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">About AB.Limo</span>
          </div>
        </div>
      </section>

      {/* Changing the Travel Game */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Changing the travel
              <br />
              <span className="italic font-light text-gray-300">game</span>
            </h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                AB.Limo was founded with a simple mission: to revolutionize the
                way people experience ground transportation. We believe that
                every journey should be seamless, comfortable, and memorable.
              </p>
              <p>
                From airport transfers to business travel, special events to
                city-to-city rides, we provide a premium chauffeur service that
                combines cutting-edge technology with unparalleled luxury. Our
                platform connects passengers with professionally trained
                chauffeurs behind the wheel of meticulously maintained vehicles.
              </p>
              <p>
                We&apos;re not just a ride service — we&apos;re redefining
                what it means to travel in style and comfort.
              </p>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop"
                alt="Business travel with AB.Limo"
                width={800}
                height={600}
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#1c1d21] p-6 rounded-lg shadow-xl border border-gray-700/50">
                <p className="text-3xl font-bold text-white">10+</p>
                <p className="text-sm text-gray-400">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#1c1d21]">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 leading-tight">
            Over a decade of
            <br />
            <span className="italic font-light text-gray-300">
              travel innovation
            </span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-5xl md:text-6xl font-bold mb-4">
                  {stat.number}
                </p>
                <p className="text-gray-400 text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How AB.Limo Works */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 leading-tight">
          How AB.Limo
          <br />
          <span className="italic font-light text-gray-300">works</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              step: "01",
              title: "Book Your Ride",
              description:
                "Enter your pickup and drop-off details, choose your vehicle class, and select your preferred time. It takes less than a minute.",
            },
            {
              step: "02",
              title: "Meet Your Chauffeur",
              description:
                "Your professionally trained chauffeur arrives at your location, ready to provide a comfortable and safe journey.",
            },
            {
              step: "03",
              title: "Travel in Style",
              description:
                "Enjoy a seamless, luxurious ride to your destination. Pay effortlessly through the app with no hidden fees.",
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="text-6xl font-bold text-gray-700 mb-6">
                {item.step}
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Vehicle Classes */}
      <section className="py-24 bg-[#1c1d21]">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 leading-tight">
            Our vehicle
            <br />
            <span className="italic font-light text-gray-300">classes</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {vehicleClasses.map((vehicle) => (
              <div
                key={vehicle.name}
                className="bg-[#292a30] rounded-lg overflow-hidden border border-gray-700/50 hover:border-gray-500/50 transition-all duration-300 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">{vehicle.name}</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {vehicle.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality, Safety, Sustainability */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 leading-tight">
          Quality, safety, and
          <br />
          <span className="italic font-light text-gray-300">sustainability</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-[#1c1d21] p-8 rounded-lg border border-gray-700/50 hover:border-gray-500/50 transition-all duration-300"
            >
              <div className="text-white mb-6">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Where AB.Limo Operates */}
      <section className="py-24 bg-[#1c1d21]">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 leading-tight">
            Where AB.Limo
            <br />
            <span className="italic font-light text-gray-300">operates</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {cities.map((city) => (
              <div
                key={city}
                className="bg-[#292a30] p-6 rounded-lg text-center border border-gray-700/50 hover:border-white/30 transition-all duration-300 cursor-pointer"
              >
                <p className="text-lg font-semibold">{city}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="#"
              className="inline-block border-2 border-white text-white px-8 py-3 text-sm font-semibold tracking-wider uppercase hover:bg-white hover:text-[#292a30] transition-all duration-300"
            >
              View All Cities
            </Link>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 px-8 max-w-5xl mx-auto text-center">
        <div className="text-6xl text-gray-700 mb-8">&ldquo;</div>
        <blockquote className="text-3xl md:text-4xl font-light leading-relaxed mb-8 italic">
          Every journey with AB.Limo is crafted to deliver an experience that
          transcends mere transportation — it&apos;s about creating moments
          of comfort, trust, and unparalleled service.
        </blockquote>
        <div>
          <p className="font-semibold text-lg">The AB.Limo Team</p>
          <p className="text-gray-400 text-sm">Committed to Excellence</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[#1c1d21]">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 leading-tight">
            Frequently asked
            <br />
            <span className="italic font-light text-gray-300">questions</span>
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <FAQItem key={index} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Where to from Here */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 leading-tight">
          Where to from
          <br />
          <span className="italic font-light text-gray-300">here</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Careers",
              description:
                "Join our growing international team and help shape the future of luxury travel.",
              href: "/career",
              image:
                "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop",
            },
            {
              title: "Press",
              description:
                "Stay updated with the latest news, announcements, and media coverage about AB.Limo.",
              href: "/press/releases",
              image:
                "https://images.unsplash.com/photo-1504711434969-e33886168d5c?w=600&h=400&fit=crop",
            },
            {
              title: "Blog",
              description:
                "Discover travel tips, destination guides, and insights from our team of experts.",
              href: "/blog",
              image:
                "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop",
            },
          ].map((card) => (
            <Link key={card.title} href={card.href} className="group">
              <div className="relative h-64 overflow-hidden rounded-lg mb-6">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-gray-300 transition-colors">
                {card.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {card.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

    </>
  );
}

function FAQItem({
  item,
}: {
  item: { question: string; answer: string };
}) {
  return (
    <div className="bg-[#292a30] rounded-lg border border-gray-700/50 overflow-hidden">
      <details className="group">
        <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
          <h3 className="text-lg font-semibold pr-4">{item.question}</h3>
          <div className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center flex-shrink-0 group-open:border-white transition-colors">
            <svg
              className="w-4 h-4 text-gray-400 group-open:text-white transition-transform duration-300 group-open:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </summary>
        <div className="px-6 pb-6 text-gray-400 leading-relaxed">
          {item.answer}
        </div>
      </details>
    </div>
  );
}
