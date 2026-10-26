"use client";

import Link from "next/link";
import { localeBase } from "@/app/[lang]/dictionaries";
import {
  SKETCH_OFFICES,
  SKETCH_AIRPORTS,
  SKETCH_ROUTES,
  SKETCH_FAQS,
  SKETCH_COUNTRIES,
  SKETCH_CITIES,
  seg,
} from "./locations-sketch";

export function PartnerStatement() {
  return (
    <section className="max-w-7xl mx-auto px-8 py-20 border-b border-gray-800">
      <div className="flex flex-wrap gap-8 lg:gap-16 items-start">
        <p className="flex-1 basis-[240px] text-xs font-bold tracking-[0.22em] uppercase text-abBlue">
          One regional partner
        </p>
        <p className="flex-[3] basis-[560px] text-2xl md:text-3xl font-light leading-relaxed text-gray-200">
          Travel between the Gulf’s capital cities without switching transport providers.
          One account team, one dispatch platform, one billing contact across Saudi Arabia,
          the UAE and Qatar.
        </p>
      </div>
    </section>
  );
}

export function OfficesSection() {
  return (
    <section className="max-w-7xl mx-auto px-8 py-20 border-b border-gray-800">
      <div className="max-w-3xl">
        <p className="text-xs font-bold tracking-[0.22em] uppercase text-abBlue">Offices</p>
        <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white">
          Managed regional offices
        </h2>
        <p className="mt-5 text-lg text-gray-300 leading-relaxed">
          Our offices are staffed by local operations managers, dispatchers and protocol
          specialists who know their city’s airports, protocol rules and major event venues.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {SKETCH_OFFICES.map((office) => (
          <div
            key={office.name}
            className="p-8 rounded-xl bg-[#1c1d21] border border-gray-800 flex flex-col hover:border-gray-700 transition-colors"
          >
            <span className="self-start text-[11px] font-semibold tracking-wider uppercase text-abBlue mb-3">
              {office.tag}
            </span>
            <h3 className="text-2xl font-bold text-white">{office.name}</h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-300 flex-1">
              {office.text}
            </p>

            <div className="mt-6 pt-6 border-t border-gray-800 flex flex-col gap-5 text-sm">
              {office.lines.map((ln, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  {ln.hasLabel && (
                    <span className="text-xs font-bold tracking-wider uppercase text-gray-400">
                      {ln.label}
                    </span>
                  )}
                  <div className="flex items-start gap-2.5 text-gray-300">
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      className="shrink-0 mt-0.5 text-abBlue"
                      aria-hidden="true"
                    >
                      <path d="M12 21s-8-7.5-8-12a8 8 0 1116 0c0 4.5-8 12-8 12z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                    <span className="leading-snug">
                      {seg(ln.address).map((s, sIdx) =>
                        s.ph ? (
                          <mark
                            key={sIdx}
                            className="bg-transparent px-1.5 py-0.5 border border-dashed border-abBlue text-abBlue text-xs rounded"
                          >
                            {s.t}
                          </mark>
                        ) : (
                          <span key={sIdx}>{s.t}</span>
                        )
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 text-gray-300">
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      className="shrink-0 text-abBlue"
                      aria-hidden="true"
                    >
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                    </svg>
                    <span>
                      {seg(ln.phone).map((s, sIdx) =>
                        s.ph ? (
                          <mark
                            key={sIdx}
                            className="bg-transparent px-1.5 py-0.5 border border-dashed border-abBlue text-abBlue text-xs rounded"
                          >
                            {s.t}
                          </mark>
                        ) : (
                          <span key={sIdx}>{s.t}</span>
                        )
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

interface CoverageSectionProps {
  lang: string;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeTab: string;
  onSelectTab: (countryId: "sa" | "ae" | "qa" | "gcc") => void;
}

export function CoverageSection({
  lang,
  searchQuery,
  onSearchChange,
  activeTab,
  onSelectTab,
}: CoverageSectionProps) {
  const base = localeBase(lang);
  const q = searchQuery.trim().toLowerCase();

  // Filter countries and cities based on search query
  const matchingCountries = SKETCH_COUNTRIES.map((ct) => {
    const list = SKETCH_CITIES.filter((c) => c.country === ct.id);
    const nameHit = !q || ct.name.toLowerCase().includes(q);
    const hits = list.filter(
      (c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
    );
    return {
      ct,
      list,
      shown: nameHit ? list : hits,
      ok: nameHit || hits.length > 0,
    };
  }).filter((m) => m.ok);

  const selectedCountry =
    matchingCountries.find((m) => m.ct.id === activeTab) ?? matchingCountries[0];

  return (
    <section id="countries" className="bg-[#1c1d21] border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-8 py-20">
        {/* Section Header with Search Bar */}
        <div className="flex flex-wrap items-end justify-between gap-6 pb-8 border-b border-gray-800">
          <div className="flex-1 basis-[360px]">
            <p className="text-xs font-bold tracking-[0.22em] uppercase text-abBlue">Coverage</p>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white">
              Find your city
            </h2>
          </div>

          <div className="flex-1 basis-[380px] max-w-md">
            <label
              htmlFor="loc-search"
              className="block text-xs font-semibold tracking-wider uppercase text-gray-400 mb-2"
            >
              Search city or airport code
            </label>
            <div className="relative">
              <input
                id="loc-search"
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Try Fujairah or MED"
                className="w-full bg-[#292a30] border border-gray-700 rounded-full px-5 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-abBlue transition-colors"
              />
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-4-4" />
              </svg>
            </div>
          </div>
        </div>

        {matchingCountries.length > 0 && selectedCountry ? (
          <div>
            {/* Country Tabs */}
            <div
              role="tablist"
              aria-label="Countries"
              className="mt-8 flex flex-wrap gap-3 border-b border-gray-800 pb-4"
            >
              {matchingCountries.map(({ ct, list }) => {
                const isSelected = ct.id === selectedCountry.ct.id;
                const countLabel = `${list.length} ${
                  list.length === 1 ? "city" : "cities"
                }${ct.id === "gcc" ? " (partners)" : ""}`;

                return (
                  <button
                    key={ct.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => onSelectTab(ct.id)}
                    className={`flex items-baseline gap-2.5 px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                      isSelected
                        ? "bg-abBlue text-white shadow-lg shadow-abBlue/20"
                        : "bg-[#292a30] text-gray-400 hover:text-white hover:bg-gray-800"
                    }`}
                  >
                    <span className="text-base">{ct.name}</span>
                    <span
                      className={`text-xs uppercase tracking-wider ${
                        isSelected ? "text-white/80" : "text-gray-500"
                      }`}
                    >
                      {countLabel}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Tab Panel Content */}
            <div className="mt-10 flex flex-wrap gap-12 items-start">
              {/* Left Column: Descriptions, bullets, directory link */}
              <div className="flex-1 basis-[380px] min-w-0">
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  {selectedCountry.ct.title}
                </h3>

                <div className="mt-5 flex flex-col gap-4 text-base text-gray-300 leading-relaxed">
                  {selectedCountry.ct.intro.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>

                {selectedCountry.ct.bullets.length > 0 && (
                  <ul className="mt-6 space-y-3">
                    {selectedCountry.ct.bullets.map((b, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-sm text-gray-300 pb-3 border-b border-gray-800/80"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-abBlue shrink-0 mt-2" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {selectedCountry.ct.outro.length > 0 && (
                  <div className="mt-5 flex flex-col gap-4 text-sm text-gray-300 leading-relaxed">
                    {selectedCountry.ct.outro.map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                )}

                <Link
                  href={`${base}${selectedCountry.ct.dirHref}`}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-abBlue hover:text-abServiceBlue transition-colors"
                >
                  <span>{selectedCountry.ct.dirLabel}</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>

              {/* Right Column: City cards grid */}
              <div className="flex-[1.3] basis-[460px] min-w-0 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {selectedCountry.shown.map((city) => {
                  const isPartner = city.status === "On request via partners";
                  const isRegional = city.status === "Regional coverage";

                  return (
                    <Link
                      key={city.id}
                      href={`${base}${city.href}`}
                      className="group p-5 rounded-xl bg-[#292a30] border border-gray-800 hover:border-gray-700 hover:bg-[#2a2c35] transition-all flex flex-col justify-between min-h-[110px]"
                    >
                      <div className="flex justify-between items-baseline gap-3">
                        <span className="text-xl font-bold text-white group-hover:text-abBlue transition-colors">
                          {city.name}
                        </span>
                        <span className="text-xs tracking-wider text-gray-400 font-medium">
                          {city.code}
                        </span>
                      </div>

                      <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isPartner
                              ? "border border-dashed border-abBlue"
                              : isRegional
                              ? "border border-abBlue"
                              : "bg-abBlue"
                          }`}
                        />
                        <span>{city.status}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <p className="mt-10 text-lg text-gray-400">
            No locations match your search query.
          </p>
        )}
      </div>
    </section>
  );
}

export function AirportsSection() {
  return (
    <section className="max-w-7xl mx-auto px-8 py-20 border-b border-gray-800">
      <div className="max-w-3xl">
        <p className="text-xs font-bold tracking-[0.22em] uppercase text-abBlue">Aviation</p>
        <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white">
          Airports served
        </h2>
        <p className="mt-5 text-lg text-gray-300 leading-relaxed">
          Permanent dispatch teams and meet and greet desks at the Gulf’s key commercial and
          executive terminals.
        </p>
      </div>

      <div className="mt-10 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 text-xs tracking-wider uppercase text-gray-400">
              <th scope="col" className="py-4 px-5 w-36 font-semibold">
                Airport code
              </th>
              <th scope="col" className="py-4 px-5 font-semibold">
                Aviation gateway
              </th>
              <th scope="col" className="py-4 px-5 font-semibold">
                What we cover
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/80">
            {SKETCH_AIRPORTS.map((ap) => (
              <tr
                key={ap.code}
                className="hover:bg-[#1c1d21]/60 transition-colors"
              >
                <th
                  scope="row"
                  className="py-4 px-5 font-bold text-white tracking-wider text-base"
                >
                  {ap.code}
                </th>
                <td className="py-4 px-5 text-gray-200 text-sm font-medium">
                  {ap.name}
                </td>
                <td className="py-4 px-5 text-gray-400 text-sm">
                  {ap.scope}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function RoutesSection({ lang }: { lang: string }) {
  const base = localeBase(lang);

  return (
    <section className="max-w-7xl mx-auto px-8 py-20 border-b border-gray-800">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex-1 basis-[360px]">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-abBlue">
            Highway corridors
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white">
            Popular intercity routes
          </h2>
        </div>
        <p className="flex-1 basis-[420px] text-base text-gray-300 leading-relaxed">
          Many itineraries are quicker by road than by a short regional flight. AB runs private
          point to point transfers on the main Gulf corridors with the same vehicles,
          chauffeurs and live tracking as our city work.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {SKETCH_ROUTES.map((rt, idx) => (
          <div
            key={idx}
            className="p-6 rounded-xl bg-[#1c1d21] border border-gray-800 flex flex-col gap-3 hover:border-gray-700 transition-colors"
          >
            <span className="text-[11px] font-semibold tracking-wider uppercase text-gray-400">
              Departure point
            </span>
            <span className="text-xl font-bold text-white">{rt.from}</span>

            <svg
              viewBox="0 0 120 12"
              className="w-full h-3 my-1 text-abBlue"
              aria-hidden="true"
            >
              <path
                d="M2 6h112M108 1l6 5-6 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <circle cx="3" cy="6" r="2.5" fill="currentColor" />
            </svg>

            <span className="text-[11px] font-semibold tracking-wider uppercase text-gray-400">
              Arrival destination
            </span>
            <span className="text-xl font-bold text-white">{rt.to}</span>

            <div className="mt-2 pt-3 border-t border-gray-800 text-xs text-gray-400 flex items-center justify-between">
              <span>Indicative travel time:</span>
              <mark className="bg-transparent px-2 py-0.5 border border-dashed border-abBlue text-abBlue text-xs rounded">
                [Confirm]
              </mark>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm text-gray-400">
        Luggage allowances, multi city trips and the full route list are on our{" "}
        <Link
          href={`${base}/services/intercity-transfers`}
          className="text-abBlue hover:underline font-semibold"
        >
          Intercity Transfers
        </Link>{" "}
        page.
      </p>
    </section>
  );
}

export function FaqSection({
  openIndex,
  onToggle,
}: {
  openIndex: number;
  onToggle: (index: number) => void;
}) {
  return (
    <section className="bg-[#1c1d21] border-b border-gray-800">
      <div className="max-w-4xl mx-auto px-8 py-20">
        <p className="text-xs font-bold tracking-[0.22em] uppercase text-abBlue">Questions</p>
        <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white">
          Frequently asked questions
        </h2>

        <div className="mt-10 divide-y divide-gray-800 border-y border-gray-800">
          {SKETCH_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-4">
                <button
                  type="button"
                  onClick={() => onToggle(isOpen ? -1 : idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 py-2 text-left bg-transparent border-0 cursor-pointer"
                >
                  <span className="text-lg md:text-xl font-semibold text-white">
                    {faq.q}
                  </span>
                  <span className="text-2xl text-abBlue font-light shrink-0">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <p className="mt-3 text-base text-gray-300 leading-relaxed max-w-3xl">
                    {seg(faq.a).map((s, sIdx) =>
                      s.ph ? (
                        <mark
                          key={sIdx}
                          className="bg-transparent px-1.5 py-0.5 border border-dashed border-abBlue text-abBlue text-sm rounded mx-1"
                        >
                          {s.t}
                        </mark>
                      ) : (
                        <span key={sIdx}>{s.t}</span>
                      )
                    )}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function CoordinationSection() {
  return (
    <section className="max-w-7xl mx-auto px-8 py-20 border-b border-gray-800">
      <div className="flex flex-wrap gap-8 lg:gap-16 items-start">
        <h2 className="flex-1 basis-[320px] text-3xl md:text-4xl font-bold text-white leading-tight">
          Gulf ground transport coordination
        </h2>
        <p className="flex-[1.4] basis-[440px] text-lg text-gray-300 leading-relaxed">
          Putting all your Gulf bookings with one managed provider simplifies scheduling,
          protocol and invoice reconciliation. Open a corporate account for recurring transfers
          across several cities, or book single routes whenever you need them.
        </p>
      </div>
    </section>
  );
}

export function ClosingCtaSection({ lang }: { lang: string }) {
  const base = localeBase(lang);

  return (
    <section className="bg-abBlack border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-8 py-20 flex flex-wrap items-end justify-between gap-8">
        <div className="flex-1 basis-[520px] min-w-0">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Plan your transport across the Gulf
          </h2>
          <p className="mt-4 text-base text-gray-400 max-w-2xl leading-relaxed">
            Set up a corporate route agreement or book scheduled transfers across Saudi Arabia,
            the UAE and Qatar, with 24/7 dispatch from Riyadh.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link
            href={`${base}/contact`}
            className="inline-flex items-center min-h-[52px] px-8 bg-abBlue hover:bg-abServiceBlue text-white text-sm font-semibold rounded-full transition-colors shadow-lg shadow-abBlue/20"
          >
            Request a proposal
          </Link>
          <Link
            href={`${base}/contact`}
            className="inline-flex items-center min-h-[52px] px-8 rounded-full border border-white/50 hover:bg-white/10 text-white text-sm font-semibold transition-colors"
          >
            Book a transfer
          </Link>
        </div>
      </div>
    </section>
  );
}
