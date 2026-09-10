import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import BookingWidget from "@/components/layout/BookingWidget";
import { getDictionary, hasLocale, defaultLocale, type Locale } from "@/app/[lang]/dictionaries";
import {
  CITY_ROUTES,
  cityNameBySlug,
  cityUrl,
  findCityByName,
  routeUrl,
} from "@/lib/locations";
import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return generateSeoMetadata({
    title: "City-to-City Long Distance Car Service",
    description:
      "Travel between cities in luxury and comfort. Book a long distance car service with professional chauffeurs and premium vehicles.",
    path: "/city-to-city",
    lang,
    keywords: "city to city transfer, long distance car service, intercity travel, AB.Limo, luxury transfer, intercity chauffeur",
  });
}

const topCities = [
  { name: "Dubai", country: "UAE", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop" },
  { name: "Riyadh", country: "Saudi Arabia", image: "https://images.unsplash.com/photo-1663900108404-a05e8bf82cda?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Doha", country: "Qatar", image: "https://images.unsplash.com/photo-1700901742651-6b353164caf3?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Abu Dhabi", country: "UAE", image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&h=300&fit=crop" },
  { name: "Manama", country: "Bahrain", image: "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=400&h=300&fit=crop" },
  { name: "Kuwait City", country: "Kuwait", image: "https://images.unsplash.com/photo-1562979314-bee7453e911c?w=400&h=300&fit=crop" },
  { name: "Muscat", country: "Oman", image: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=400&h=300&fit=crop" },
  { name: "Jeddah", country: "Saudi Arabia", image: "https://images.unsplash.com/photo-1663900108404-a05e8bf82cda?w=400&h=300&fit=crop" },
];

export default async function CityToCityPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);

  const faqItems = dict.cityToCity.faq.items;
  const testimonials = dict.cityToCity.testimonials.items;

  return (
    <main className="min-h-screen bg-[#292a30] text-white">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden pt-24 pb-10">
        <Image
          src="https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=1920&h=800&fit=crop"
          alt="City to City Travel"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#292a30]" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              {dict.cityToCity.title}
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
          <Link href={`/${lang}`} className="hover:text-white transition-colors">
            {dict.cityToCity.breadcrumb.home}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">{dict.cityToCity.breadcrumb.cityToCity}</span>
        </nav>
      </div>

      {/* App Download Section */}
      <section className="max-w-7xl mx-auto px-8 py-16">
        <div className="bg-[#1c1d21] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {dict.cityToCity.downloadApp}
            </h2>
            <p className="text-gray-400 mb-6">
              {dict.cityToCity.downloadAppDesc}
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
              <span className="text-xs font-semibold">{dict.cityToCity.scanQR}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Better Way Section */}
      <section className="bg-[#1c1d21] py-20 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {dict.cityToCity.betterWay.title}
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              {dict.cityToCity.betterWay.desc}
            </p>
            <ul className="space-y-4">
              {dict.cityToCity.betterWay.benefits.map((benefit: string) => (
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
              src="https://images.unsplash.com/photo-1572401611152-cf63d874b019?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
          {dict.cityToCity.globalReach.title}
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          {dict.cityToCity.globalReach.desc}
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
            {dict.cityToCity.routes.title}
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            {dict.cityToCity.routes.desc}
          </p>

          {/* Top Cities */}
          <div className="mb-16">
            <h3 className="text-xl font-semibold mb-6">{dict.cityToCity.routes.topCities}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {topCities.map((city) => {
                const loc = findCityByName(city.name);
                return (
                  <Link
                    key={city.name}
                    href={loc ? cityUrl(lang, loc.country, loc.city) : "#"}
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
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Top Routes */}
          <div>
            <h3 className="text-xl font-semibold mb-6">{dict.cityToCity.routes.topRoutes}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CITY_ROUTES.map((route) => {
                const fromName = cityNameBySlug(route.fromSlug);
                const toName = cityNameBySlug(route.toSlug);
                const origin = findCityByName(fromName);
                return (
                  <Link
                    key={`${route.fromSlug}-${route.toSlug}`}
                    href={
                      origin
                        ? routeUrl(lang, origin.country, origin.city, route)
                        : "#"
                    }
                    className="bg-[#292a30] p-5 rounded-xl flex items-center justify-between hover:bg-[#2a2c35] transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{fromName}</span>
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                        <span className="font-semibold">{toName}</span>
                      </div>
                      <p className="text-xs text-gray-400">
                        {route.distance} &middot; {route.duration}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
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
              key={item.q}
              className="bg-[#1c1d21] rounded-2xl overflow-hidden"
            >
              <details className="group">
                <summary className="w-full p-6 text-left flex items-center justify-between hover:bg-[#2a2c35] transition-colors cursor-pointer list-none">
                  <h3 className="text-lg font-semibold pr-4">{item.q}</h3>
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
                  {item.a}
                </div>
              </details>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-[#1c1d21] py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {dict.cityToCity.testimonials.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-[#292a30] p-8 rounded-2xl"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
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
          {dict.cityToCity.cta.title}
        </h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          {dict.cityToCity.cta.desc}
        </p>
        <Link
          href={`/${lang}`}
          className="inline-block bg-white text-[#292a30] px-8 py-3 text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
        >
          {dict.cityToCity.cta.bookNow}
        </Link>
      </section>
    </main>
  );
}
