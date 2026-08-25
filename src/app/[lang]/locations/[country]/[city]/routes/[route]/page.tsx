import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import BookingWidget from "@/components/layout/BookingWidget";
import { getDictionary } from "@/app/[lang]/dictionaries";
import {
    COUNTRIES,
    findRoute,
    locationsUrl,
    countryUrl,
    cityUrl,
    resolveCity,
    resolveCountry,
    titleFromSlug,
    type City,
} from "@/lib/locations";

const cityImages: Record<string, string> = {
  dubai: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop",
  "abu-dhabi": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&h=300&fit=crop",
  sharjah: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop&q=80",
  riyadh: "https://images.unsplash.com/photo-1663900108404-a05e8bf82cda?w=400&h=300&fit=crop",
  dammam: "https://images.unsplash.com/photo-1562979314-bee7453e911c?w=400&h=300&fit=crop",
  doha: "https://images.unsplash.com/photo-1700901742651-6b353164caf3?w=400&h=300&fit=crop",
  "al-khor": "https://images.unsplash.com/photo-1647252262017-582a7dbb73d0?w=400&h=300&fit=crop",
  jeddah: "https://images.unsplash.com/photo-1674979724572-c0a0579bc9d0?w=400&h=300&fit=crop",
  mecca: "https://images.unsplash.com/photo-1647177156544-0d51fb7c900c?w=400&h=300&fit=crop",
  medina: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=400&h=300&fit=crop&q=80",
  manama: "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=400&h=300&fit=crop",
  "al-khobar": "https://plus.unsplash.com/premium_photo-1697729655535-705aef824baf?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  kuwait: "https://images.unsplash.com/photo-1562979314-bee7453e911c?w=400&h=300&fit=crop",
  muscat: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=400&h=300&fit=crop",
  "al-ain": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&h=300&fit=crop&q=80",
  "ras-al-khaimah": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop&q=81",
  ajman: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop&q=82",
  "al-ahmadi": "https://images.unsplash.com/photo-1562979314-bee7453e911c?w=400&h=300&fit=crop&q=80",
  lusail: "https://images.unsplash.com/photo-1647252262017-582a7dbb73d0?w=400&h=300&fit=crop",
  sohar: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=400&h=300&fit=crop&q=80",
};

const fallbackImage = "https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=800&h=600&fit=crop";

export default async function RoutePage({
  params,
}: {
  params: Promise<{ lang: string; country: string; city: string; route: string }>;
}) {
  const { lang, country: countryParam, city: cityParam, route: routeSlug } = await params;
  const originCountry = resolveCountry(countryParam);
  if (!originCountry) notFound();
  const originCity = resolveCity(originCountry, cityParam);
  if (!originCity) notFound();

  const locale = lang as "en-US" | "en-GB" | "ar";
  const dict = await getDictionary(locale);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rp = (dict as any).cityToCity.routePage;

  const [fromRaw, toRaw] = routeSlug.split("-to-");
  if (!fromRaw || !toRaw) notFound();
  const from = resolveCity(originCountry, fromRaw) ?? ({ slug: fromRaw, name: titleFromSlug(fromRaw), airports: [] } as City);
  const to = resolveCity(originCountry, toRaw) ?? resolveCityInAnyCountry(toRaw) ?? ({ slug: toRaw, name: titleFromSlug(toRaw), airports: [] } as City);

  const routeInfo = findRoute(from.slug, to.slug);
  const distance = routeInfo?.distance ?? "Contact us";
  const duration = routeInfo?.duration ?? "Contact us";

  return (
    <main className="min-h-screen bg-[#292a30] text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
        <Image
          src={cityImages[from.slug] ?? fallbackImage}
          alt={`${from.name} to ${to.name}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#292a30]" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 pb-8 flex flex-col lg:flex-row items-end justify-between gap-8">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              {from.name} to {to.name}
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
        <nav className="text-sm text-gray-400 flex flex-wrap items-center gap-2">
          <Link href={`/${lang}`} className="hover:text-white transition-colors">
            {rp.breadcrumb.home}
          </Link>
          <span aria-hidden="true">→</span>
          <Link href={locationsUrl(lang)} className="hover:text-white transition-colors">
            Locations
          </Link>
          <span aria-hidden="true">→</span>
          <Link href={countryUrl(lang, originCountry)} className="hover:text-white transition-colors">
            {originCountry.name}
          </Link>
          <span aria-hidden="true">→</span>
          <Link href={cityUrl(lang, originCountry, originCity)} className="hover:text-white transition-colors">
            {originCity.name}
          </Link>
          <span aria-hidden="true">→</span>
          <span className="text-white">
            {from.name} to {to.name}
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
            <p className="text-3xl font-bold mb-1">{distance}</p>
            <p className="text-gray-400 text-sm">{rp.totalDistance}</p>
          </div>
          <div className="bg-[#1c1d21] p-8 rounded-2xl text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-3xl font-bold mb-1">{duration}</p>
            <p className="text-gray-400 text-sm">{rp.estimatedTime}</p>
          </div>
          <div className="bg-[#1c1d21] p-8 rounded-2xl text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <p className="text-3xl font-bold mb-1">{rp.fixedPricing}</p>
            <p className="text-gray-400 text-sm">{rp.pricing}</p>
          </div>
        </div>
      </section>

      {/* Cities Visual */}
      <section className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-[300px] rounded-2xl overflow-hidden">
            <Image
              src={cityImages[from.slug] ?? fallbackImage}
              alt={from.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="text-sm text-gray-300 mb-1">{rp.from}</p>
              <h3 className="text-2xl font-bold">{from.name}</h3>
            </div>
          </div>
          <div className="relative h-[300px] rounded-2xl overflow-hidden">
            <Image
              src={cityImages[to.slug] ?? fallbackImage}
              alt={to.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="text-sm text-gray-300 mb-1">{rp.to}</p>
              <h3 className="text-2xl font-bold">{to.name}</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="bg-[#1c1d21] py-20 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {rp.whyChoose.replace("{from}", from.name).replace("{to}", to.name)}
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              {rp.whyChooseDesc.replace("{from}", from.name).replace("{to}", to.name)}
            </p>
            <ul className="space-y-4">
              {rp.routeFeatures.map((benefit: string) => (
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
              src={cityImages[to.slug] ?? fallbackImage}
              alt={to.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {rp.aboutRoute}
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              {rp.aboutRouteDesc1.replace("{from}", from.name).replace("{to}", to.name).replace("{distance}", distance)}
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              {rp.aboutRouteDesc2}
            </p>
            <ul className="space-y-4">
              {rp.routeFeatures.map((feature: string) => (
                <li key={feature} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <span className="text-gray-400">{feature}</span>
                </li>
              ))}
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
          {dict.cityToCity.faq.items.map((item: { q: string; a: string }) => (
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

      {/* CTA Section */}
      <section className="bg-[#1c1d21] py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {rp.ctaTitle.replace("{from}", from.name).replace("{to}", to.name)}
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
        </div>
      </section>
    </main>
  );
}

function resolveCityInAnyCountry(slug: string): City | undefined {
  for (const country of COUNTRIES) {
    const found = resolveCity(country, slug);
    if (found) return found;
  }
  return undefined;
}
