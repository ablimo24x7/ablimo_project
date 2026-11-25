import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getDictionary, localeHome } from "@/app/[lang]/dictionaries";
import { ALL_AIRPORTS } from "@/lib/airports-data";
import { generateSeoMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return generateSeoMetadata({
    title: "International Airport Transfers & Chauffeur Services | AB.Limo",
    description: "Executive airport transfers across the Middle East. Dedicated meet and greet, flight tracking, and luxury fleet at DXB, DWC, AUH, DOH, RUH, JED, MED, and DMM.",
    path: "/airports",
    lang,
    keywords: "airport transfers, luxury airport chauffeur, DXB chauffeur, RUH airport transfer, VIP airport pickup, private aviation ground transportation",
  });
}

export default async function AirportsIndexPage({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "en-US" | "en-GB" | "ar");

  // Group airports by country
  const airportsByCountry: Record<string, typeof ALL_AIRPORTS> = {};
  for (const a of ALL_AIRPORTS) {
    if (!airportsByCountry[a.countryName]) {
      airportsByCountry[a.countryName] = [];
    }
    airportsByCountry[a.countryName].push(a);
  }

  return (
    <main className="min-h-screen bg-[#070709] text-white selection:bg-[#259FCF]/30 selection:text-white pt-24 pb-20">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs uppercase tracking-wider text-gray-400">
            <li>
              <Link href={localeHome(lang)} className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <span className="text-gray-600">/</span>
            <li className="text-[#259FCF] font-medium" aria-current="page">
              Airports
            </li>
          </ol>
        </nav>

        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#259FCF]/10 border border-[#259FCF]/30 text-[#259FCF] text-xs font-semibold tracking-widest uppercase">
            <span>Middle East Hubs</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            International Airport Transfers
          </h1>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Punctual arrivals, automated flight tracking, and dedicated meet-and-greet services across the primary aviation hubs of the United Arab Emirates, Saudi Arabia, and Qatar.
          </p>
        </div>
      </section>

      {/* Airport Directory Grid Grouped by Country */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-16">
        {Object.entries(airportsByCountry).map(([countryName, airports]) => (
          <div key={countryName} className="space-y-6">
            <div className="flex items-center gap-4 pb-4 border-b border-white/10">
              <h2 className="text-2xl font-bold text-white">{countryName}</h2>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-400">
                {airports.length} {airports.length === 1 ? "Airport" : "Airports"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {airports.map((airport) => (
                <Link
                  key={airport.slug}
                  href={`/${lang}/airports/${airport.slug}`}
                  className="group bg-[#0f1017] rounded-3xl border border-white/10 hover:border-[#259FCF]/40 overflow-hidden transition-all flex flex-col justify-between shadow-xl"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-black/40">
                    <Image
                      src={airport.heroImage}
                      alt={airport.heroImageAlt || airport.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f1017] via-transparent to-black/40" />
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-bold text-[#259FCF]">
                      {airport.iata}
                    </div>
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs text-gray-300">
                      {airport.cityName}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-[#259FCF] transition-colors leading-snug">
                        {airport.name}
                      </h3>
                      <p className="text-xs text-gray-400 mt-2 line-clamp-3 leading-relaxed">
                        {airport.heroDescription}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-[#259FCF]">
                      <span>View Airport Chauffeur Services</span>
                      <span className="group-hover:translate-x-1 duration-200">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

