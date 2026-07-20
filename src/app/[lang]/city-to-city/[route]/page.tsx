import Link from "next/link";
import Image from "next/image";
import BookingWidget from "@/components/BookingWidget";
import { getDictionary, hasLocale, defaultLocale, type Locale } from "@/app/[lang]/dictionaries";

const knownRoutes: Record<string, { from: string; to: string; distance: string; duration: string }> = {
  "new-york-east-hampton": { from: "New York", to: "East Hampton", distance: "160 km", duration: "2h 00m" },
  "los-angeles-san-diego": { from: "Los Angeles", to: "San Diego", distance: "195 km", duration: "2h 15m" },
  "miami-palm-beach": { from: "Miami", to: "Palm Beach", distance: "110 km", duration: "1h 30m" },
  "london-bristol": { from: "London", to: "Bristol", distance: "190 km", duration: "2h 30m" },
  "abu-dhabi-dubai": { from: "Abu Dhabi", to: "Dubai", distance: "140 km", duration: "1h 30m" },
  "paris-reims": { from: "Paris", to: "Reims", distance: "145 km", duration: "1h 30m" },
  "riyadh-dammam": { from: "Riyadh", to: "Dammam", distance: "400 km", duration: "4h 00m" },
  "doha-al-khor": { from: "Doha", to: "Al Khor", distance: "50 km", duration: "45m" },
  "jeddah-mecca": { from: "Jeddah", to: "Mecca", distance: "80 km", duration: "1h 00m" },
  "manama-al-khobar": { from: "Manama", to: "Al Khobar", distance: "110 km", duration: "1h 30m" },
  "dubai-sharjah": { from: "Dubai", to: "Sharjah", distance: "30 km", duration: "30m" },
  "dubai-abu-dhabi": { from: "Dubai", to: "Abu Dhabi", distance: "140 km", duration: "1h 30m" },
};

const cityImages: Record<string, string> = {
  "new-york": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop",
  "east-hampton": "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop",
  "los-angeles": "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=400&h=300&fit=crop",
  "san-diego": "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=400&h=300&fit=crop",
  miami: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=400&h=300&fit=crop",
  "palm-beach": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
  london: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop",
  bristol: "https://images.unsplash.com/photo-1580933073521-dc49ac0d4e6a?w=400&h=300&fit=crop",
  "abu-dhabi": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&h=300&fit=crop",
  dubai: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop",
  paris: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop",
  reims: "https://images.unsplash.com/photo-1595576663498-fdd3f0f8e3e5?w=400&h=300&fit=crop",
  riyadh: "https://images.unsplash.com/photo-1578895102346-7e342c3f3b50?w=400&h=300&fit=crop",
  dammam: "https://images.unsplash.com/photo-1578895102346-7e342c3f3b50?w=400&h=300&fit=crop",
  doha: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=400&h=300&fit=crop",
  "al-khor": "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=400&h=300&fit=crop",
  jeddah: "https://images.unsplash.com/photo-1578895102346-7e342c3f3b50?w=400&h=300&fit=crop",
  mecca: "https://images.unsplash.com/photo-1578895102346-7e342c3f3b50?w=400&h=300&fit=crop",
  manama: "https://images.unsplash.com/photo-1578895102346-7e342c3f3b50?w=400&h=300&fit=crop",
  "al-khobar": "https://images.unsplash.com/photo-1578895102346-7e342c3f3b50?w=400&h=300&fit=crop",
  sharjah: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop",
};

const benefits = [
  "Comfortable, door-to-door service without the hassle of airports",
  "Fixed prices with no hidden fees or surge pricing",
  "Professional chauffeurs with extensive route knowledge",
  "Premium vehicles equipped with Wi-Fi and refreshments",
  "Flexible scheduling and last-minute bookings available",
  "Track your journey in real-time with our mobile app",
];

const faqItems = [
  {
    question: "How long does the transfer take?",
    answer:
      "The duration depends on the distance between cities. Your chauffeur will choose the most efficient route, and you can track the journey in real-time through our app.",
  },
  {
    question: "Can I make stops during my journey?",
    answer:
      "Yes, you can request additional stops during your journey. Simply let us know your requirements when booking, or communicate with your chauffeur during the trip. Additional stops may incur extra charges.",
  },
  {
    question: "What vehicles are available for this route?",
    answer:
      "We offer Business Class sedans, First Class luxury sedans, and Business Van/SUV options. All vehicles are equipped with Wi-Fi, charging ports, and refreshments for your comfort.",
  },
  {
    question: "Can I book a round trip?",
    answer:
      "Yes, round-trip bookings are available. You can schedule your return journey at the time of booking or arrange it later through our app or customer service.",
  },
];

function parseRouteSlug(slug: string): { from: string; to: string } {
  const known = knownRoutes[slug];
  if (known) {
    return { from: known.from, to: known.to };
  }

  const parts = slug.split("-");
  if (parts.length === 1) {
    return { from: slugToDisplayName(parts[0]), to: slugToDisplayName(parts[0]) };
  }

  let bestSplit = 1;
  let bestFrom = parts[0];
  let bestTo = parts.slice(1).join("-");

  for (let i = 1; i < parts.length; i++) {
    const candidateFrom = parts.slice(0, i).join("-");
    const candidateTo = parts.slice(i).join("-");
    const fromKey = candidateFrom;
    const toKey = candidateTo;
    if (cityImages[fromKey] && cityImages[toKey]) {
      bestSplit = i;
      bestFrom = candidateFrom;
      bestTo = candidateTo;
      break;
    }
  }

  return { from: slugToDisplayName(bestFrom), to: slugToDisplayName(bestTo) };
}

function slugToDisplayName(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function getRouteInfo(slug: string) {
  const known = knownRoutes[slug];
  if (known) {
    return { distance: known.distance, duration: known.duration };
  }
  return { distance: "Contact us", duration: "Contact us" };
}

export default async function DynamicCityToCityPage({
  params,
}: {
  params: Promise<{ lang: string; route: string }>;
}) {
  const { lang, route: routeSlug } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);

  const { from, to } = parseRouteSlug(routeSlug);
  const routeInfo = getRouteInfo(routeSlug);

  const fromSlug = Object.keys(cityImages).find(
    (k) => slugToDisplayName(k) === from
  ) || from.toLowerCase().replace(/\s+/g, "-");
  const toSlug = Object.keys(cityImages).find(
    (k) => slugToDisplayName(k) === to
  ) || to.toLowerCase().replace(/\s+/g, "-");

  const fromImage = cityImages[fromSlug] || "https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=800&h=600&fit=crop";
  const toImage = cityImages[toSlug] || "https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=800&h=600&fit=crop";

  return (
    <main className="min-h-screen bg-[#292a30] text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
        <Image
          src={fromImage}
          alt={`${from} to ${to}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#292a30]" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 pb-8 flex flex-col lg:flex-row items-end justify-between gap-8">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              {from} to {to}
            </h1>
            <p className="text-lg text-gray-300">
              {dict.cityToCity.subtitle}
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
          <Link href="/city-to-city" className="hover:text-white transition-colors">
            City-to-City
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">
            {from} to {to}
          </span>
        </nav>
      </div>

      {/* Route Info */}
      <section className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#1c1d21] p-8 rounded-2xl text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-3xl font-bold mb-1">{routeInfo.distance}</p>
            <p className="text-gray-400 text-sm">Total Distance</p>
          </div>
          <div className="bg-[#1c1d21] p-8 rounded-2xl text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-3xl font-bold mb-1">{routeInfo.duration}</p>
            <p className="text-gray-400 text-sm">Estimated Time</p>
          </div>
          <div className="bg-[#1c1d21] p-8 rounded-2xl text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <p className="text-3xl font-bold mb-1">Fixed</p>
            <p className="text-gray-400 text-sm">Pricing</p>
          </div>
        </div>
      </section>

      {/* Cities Visual */}
      <section className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-[300px] rounded-2xl overflow-hidden">
            <Image
              src={fromImage}
              alt={from}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="text-sm text-gray-300 mb-1">From</p>
              <h3 className="text-2xl font-bold">{from}</h3>
            </div>
          </div>
          <div className="relative h-[300px] rounded-2xl overflow-hidden">
            <Image
              src={toImage}
              alt={to}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="text-sm text-gray-300 mb-1">To</p>
              <h3 className="text-2xl font-bold">{to}</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="bg-[#1c1d21] py-20 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why choose AB.Limo for {from} to {to}
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              Travel between {from} and {to} in complete comfort with our premium city-to-city transfer service. Our professional chauffeurs know the best routes and ensure a smooth, relaxing journey.
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

      {/* Route Content */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] rounded-2xl overflow-hidden order-2 lg:order-1">
            <Image
              src={toImage}
              alt={to}
              fill
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              About this route
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              The {from} to {to} route covers {routeInfo.distance} of premium road travel. Our experienced chauffeurs are familiar with every stretch of this route, ensuring the most efficient and comfortable journey.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Whether you&apos;re traveling for business or leisure, our door-to-door service eliminates the stress of driving or navigating public transport. Sit back, relax, and enjoy the scenery while our professional driver takes care of everything.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span className="text-gray-400">Door-to-door pickup and drop-off</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span className="text-gray-400">Real-time journey tracking</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span className="text-gray-400">Complimentary Wi-Fi and refreshments</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-8 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {dict.cityToCity.faq.title}
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
            Ready for your journey from {from} to {to}?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            {dict.cityToCity.cta.desc}
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-[#292a30] px-8 py-3 text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
          >
            {dict.cityToCity.cta.bookNow}
          </Link>
        </div>
      </section>
    </main>
  );
}
