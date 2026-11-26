import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { localeBase, localeHome } from "@/app/[lang]/dictionaries";
import { generateSeoMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, FAQJsonLd, JsonLd } from "@/components/seo/StructuredData";
import { SustainabilityFaq, type FaqItem } from "./_components/SustainabilityFaq";
import { SustainabilityRoadmap } from "./_components/SustainabilityRoadmap";
import {
  ShieldCheck,
  Zap,
  Leaf,
  Gauge,
  FileText,
  Clock,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Users,
  Car,
  Building2,
  CalendarCheck,
  AlertCircle,
  BarChart3,
  Flame,
  CheckCircle2,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return generateSeoMetadata({
    title: "Sustainable Chauffeur & Bus Transport in the Gulf | AB",
    description:
      "AB's plan to cut emissions from chauffeur and bus transport in Saudi Arabia, the UAE and Qatar: EV and hybrid fleet, measured CO2e per trip, client reports.",
    path: "/sustainability",
    lang,
    keywords:
      "sustainable event transportation Saudi Arabia, electric chauffeur Dubai, electric bus hire Riyadh, low emission corporate transport UAE, carbon footprint event transport",
  });
}

const FAQS: FaqItem[] = [
  {
    question: "Does AB have electric chauffeur cars?",
    answer:
      "Yes, in Riyadh and Dubai, on request. Ask when you book, and our dispatch team will confirm vehicle availability and charging schedule for your requested dates.",
  },
  {
    question: "Can you provide electric buses for an event?",
    answer:
      "Where electric buses and charging infrastructure are available in the host city, yes. In Doha this is increasingly standard practice, in line with Qatar's national e-bus transition plan.",
  },
  {
    question: "Can I get a CO2 report for my company's trips?",
    answer:
      "Yes, for corporate accounts. Our trip reporting follows the international ISO 14083 methodology and provides audited CO2e metrics per journey and aggregated across billing periods.",
  },
  {
    question: "Is AB carbon neutral?",
    answer:
      "No. We do not claim carbon neutrality. We prioritize measuring our emissions and cutting them at the source; any future use of verified carbon credits will be reported separately and never presented as an alternative to real emissions reduction.",
  },
  {
    question: "How does AB comply with the UAE climate law?",
    answer:
      "AB's UAE operations measure and report Scope 1 and 2 emissions to the Ministry of Climate Change and Environment (MOCCAE), in direct compliance with Federal Decree-Law No. 11 of 2024.",
  },
  {
    question: "Can you complete our supplier sustainability questionnaire?",
    answer:
      "Yes. Send your ESG or procurement questionnaire along with your tender or RFP, or request our formal sustainability statement directly from our account team.",
  },
];

const REGULATIONS = [
  {
    country: "Saudi Arabia",
    rule: "Net zero by 2060; 30% of vehicles in Riyadh electric by 2030, as part of a plan to halve the capital's emissions.",
    sourceName: "The National",
    sourceUrl:
      "https://www.thenationalnews.com/business/road-to-net-zero/2021/10/24/saudi-arabia-wants-30-of-vehicles-on-riyadhs-roads-to-be-electric-by-2030",
    impact:
      "Riyadh is our flagship city for electric chauffeur cars and the first hub receiving dedicated on-site depot charging.",
  },
  {
    country: "Saudi Arabia",
    rule: "EVIQ plans 5,000 fast chargers by 2030 across key corridors for inter-city travel.",
    sourceName: "Arab News",
    sourceUrl: "https://www.arabnews.pk/node/2645170",
    impact:
      "Electric intercity routes (such as Riyadh–Dammam) are scheduled for operational trials once high-power corridor chargers go live.",
  },
  {
    country: "UAE",
    rule: "Federal Decree-Law No. 11 of 2024 (in force since 30 May 2025): all private companies, free zones included, must measure and report Scope 1 & 2 emissions to MOCCAE.",
    sourceName: "Crowe",
    sourceUrl: "https://www.crowe.com/ae/news/uae-climate-law",
    impact:
      "AB's UAE entity measures and formally reports fleet emissions; the exact same unified accounting method is applied across KSA and Qatar.",
  },
  {
    country: "UAE (Dubai)",
    rule: "RTA plan for the entire Dubai taxi and limousine ecosystem to transition to hybrid, electric, or hydrogen by the end of 2027.",
    sourceName: "The National",
    sourceUrl:
      "https://www.thenationalnews.com/uae/transport/2023/02/06/dubai-rta-to-phase-out-petrol-only-taxis-from-its-fleet-by-2027",
    impact:
      "Our Dubai executive chauffeur fleet moves progressively to hybrid and electric vehicles along the identical regulatory timeline.",
  },
  {
    country: "Qatar",
    rule: "Ministry of Transport plan: 100% of public buses electric by Q4 2030, with private and school transport shifting in parallel.",
    sourceName: "MoT Qatar",
    sourceUrl: "https://mot.gov.qa/en/land-transport/Qatar-Electric-Bus-Transition-Plan",
    impact:
      "Our Doha coach and conference fleet integrates with the national e-bus transition; zero-emission electric buses are sourced locally wherever available.",
  },
  {
    country: "Global",
    rule: "ISO 14083:2023 — the globally accepted international standard for quantifying and reporting GHG emissions from passenger and freight transport chains.",
    sourceName: "ISO Standard",
    sourceUrl:
      "https://committee.iso.org/sites/tc207sc7/home/news/content-left-area/news-and-updates/new-standard-for-transport-ghg-e.html",
    impact:
      "All per-trip and per-passenger-kilometre CO2e metrics provided in our client emissions statements adhere strictly to ISO 14083.",
  },
  {
    country: "Global",
    rule: "GHG Protocol Corporate Standard (Scope 1, 2, and 3 emissions accounting framework).",
    sourceName: "GHG Protocol",
    sourceUrl: "https://ghgprotocol.org/corporate-standard",
    impact:
      "AB accounts for its own direct Scope 1 & 2 emissions while providing clients with verified data for their Scope 3 corporate travel reporting.",
  },
];

const PRACTICAL_STEPS = [
  {
    icon: <Gauge className="w-6 h-6 text-abBlue" />,
    title: "Fewer empty kilometres",
    desc: "The Riyadh central control room dynamically plans routes and chains passenger trips so vehicles spend minimal time driving empty. Chauffeurs wait at strategic holding zones near hotels and venues rather than deadheading to depot between jobs.",
  },
  {
    icon: <Users className="w-6 h-6 text-abBlue" />,
    title: "The right vehicle for the group",
    desc: "We rigorously match vehicle capacity to passenger manifests. Twelve delegates travel in one luxury coach rather than four separate sedans, and high-volume event shuttles run to optimized timetables generated from real-time flight arrival data.",
  },
  {
    icon: <Flame className="w-6 h-6 text-abBlue" />,
    title: "No idling policy",
    desc: "Engines stay off while waiting, with a strictly controlled pre-cooling window prior to passenger boarding during summer peak heat. Telematics and chauffeur mobile applications flag excessive idling for proactive coaching.",
  },
  {
    icon: <Leaf className="w-6 h-6 text-abBlue" />,
    title: "Eco-driving training",
    desc: "Smooth acceleration, predictive braking, and consistent cruising speeds are integral components of the certified AB Chauffeur Standard. These practices reduce fuel burn by up to 15% while delivering a noticeably calmer journey.",
  },
  {
    icon: <Car className="w-6 h-6 text-abBlue" />,
    title: "Newer, cleaner vehicles",
    desc: "Executive sedans and SUVs in our fleet are 2025 and 2026 models; coaches and minivans adhere to rigorous Euro V / Euro VI or regional GSO standards. We have commenced replacing combustion vehicles with hybrid and electric alternatives, targeting 100% hybrid/EV by 2030.",
  },
  {
    icon: <Clock className="w-6 h-6 text-abBlue" />,
    title: "Maintenance on schedule",
    desc: "Precision tyre pressure management, routine filter replacements, and regular thermodynamic air conditioning servicing ensure vehicles operate at peak thermodynamic efficiency and minimize roadside downtime.",
  },
  {
    icon: <FileText className="w-6 h-6 text-abBlue" />,
    title: "Paperless operations",
    desc: "Digital dispatch sheets, electronic invoicing, and digital airport greeting name-boards eliminate printed paperwork across our three regional operating markets.",
  },
];

export default async function SustainabilityPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const base = localeBase(lang);
  const homeUrl = localeHome(lang);

  const breadcrumbs = [
    { name: "Home", url: homeUrl },
    { name: "Sustainability", url: `${base}/sustainability` },
  ];

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Sustainable Chauffeur & Bus Transport in the Gulf | AB",
    description:
      "AB's plan to cut emissions from chauffeur and bus transport in Saudi Arabia, the UAE and Qatar: EV and hybrid fleet, measured CO2e per trip, client reports.",
    url: "https://www.ab.limo/sustainability",
    inLanguage: lang.startsWith("ar") ? "ar" : "en",
    publisher: {
      "@type": "Organization",
      name: "AB",
      url: "https://www.ab.limo",
    },
  };

  return (
    <main className="min-h-screen bg-[#1c1d22] text-white">
      {/* Structured Data */}
      <JsonLd data={webPageSchema} />
      <BreadcrumbJsonLd items={breadcrumbs} />
      <FAQJsonLd items={FAQS} />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[640px] flex items-center justify-center overflow-hidden py-24 px-4 border-b border-white/10">
        <Image
          src="/fleet/hero-banner.jpg"
          alt="AB Fleet Transportation across Saudi Arabia, UAE and Qatar"
          fill
          className="object-cover opacity-25"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1c1d22]/90 via-[#1c1d22]/80 to-[#1c1d22]" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-2 text-xs md:text-sm text-gray-400 mb-6 font-medium"
          >
            <Link href={homeUrl} className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-200">Sustainability</span>
          </nav>

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-abBlue/15 border border-abBlue/30 text-abBlue text-xs md:text-sm font-semibold tracking-wide uppercase mb-6">
            <Leaf className="w-4 h-4" />
            <span>Sustainability · Saudi Arabia, UAE &amp; Qatar</span>
          </div>

          {/* H1 */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Moving people across the Gulf with less impact
          </h1>

          {/* Answer-first intro */}
          <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
            AB runs chauffeur, bus and coach transport in Saudi Arabia, the UAE and Qatar.
            Our fleet of 440 vehicles runs across the region: 260 in Saudi Arabia, 140 in the UAE and 40 in Qatar.
            To cut emissions, we have started moving this fleet to hybrid and electric vehicles,
            with the goal of a fully hybrid and electric fleet by 2030. Alongside that switch,
            we measure the emissions of every trip and cut empty kilometres. We report progress openly
            and do not claim results we have not measured.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`${base}/quote/tender`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#1c1d22] font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
            >
              <span>Ask for a low-emission transport plan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#roadmap"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#252731] text-white font-medium px-8 py-4 rounded-xl border border-white/15 hover:bg-[#2e303d] hover:border-white/30 transition-all"
            >
              <span>See our roadmap</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. WHERE WE START (BASELINE STATS) */}
      <section className="py-20 px-4 bg-[#212228] border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-mono tracking-widest text-abBlue uppercase mb-2">
              Our Baseline
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Where we start
            </h2>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              Ground transport is one of the largest sources of emissions in Gulf cities,
              and our business is moving people by road. We would rather show a real baseline
              and a dated plan than a badge. Today&apos;s starting point:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#1c1d22] border border-white/10 p-6 rounded-2xl">
              <div className="text-3xl md:text-4xl font-extrabold text-white mb-2">
                440
              </div>
              <div className="text-sm font-semibold text-abBlue mb-2">
                Active Fleet Vehicles
              </div>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                260 in Saudi Arabia, 140 in the UAE, and 40 in Qatar across our regional ground transportation network.
              </p>
            </div>

            <div className="bg-[#1c1d22] border border-white/10 p-6 rounded-2xl">
              <div className="text-3xl md:text-4xl font-extrabold text-white mb-2">
                2030
              </div>
              <div className="text-sm font-semibold text-abBlue mb-2">
                Fleet Transition Target
              </div>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                Transition under way, progressively moving to hybrid and electric with the target of a fully hybrid &amp; electric fleet.
              </p>
            </div>

            <div className="bg-[#1c1d22] border border-white/10 p-6 rounded-2xl">
              <div className="text-3xl md:text-4xl font-extrabold text-white mb-2">
                2025–26
              </div>
              <div className="text-sm font-semibold text-abBlue mb-2">
                Vehicle Model Years
              </div>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                Every vehicle in the fleet is a 2025 or 2026 model; executive sedans, vans, and buses meeting Euro/GSO emission standards.
              </p>
            </div>

            <div className="bg-[#1c1d22] border border-white/10 p-6 rounded-2xl">
              <div className="text-3xl md:text-4xl font-extrabold text-white mb-2">
                Since 2026
              </div>
              <div className="text-sm font-semibold text-abBlue mb-2">
                Trip Emissions Measured
              </div>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                Fuel and electricity tracked per journey using ISO 14083 standards to build an audited baseline for clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. REGULATIONS AND NATIONAL GOALS */}
      <section className="py-24 px-4 bg-[#1c1d22] border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-14">
            <div className="text-xs font-mono tracking-widest text-abBlue uppercase mb-2">
              Compliance &amp; Policy Alignment
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Built around the rules where we operate
            </h2>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              AB&apos;s plan follows the climate laws and transport targets of each country we operate in,
              plus the global methods our clients use for their own reporting.
              Every regulatory benchmark links directly to its official source:
            </p>
          </div>

          {/* Regulations Table / Card List */}
          <div className="space-y-4 mb-10">
            {REGULATIONS.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#212228] border border-white/10 rounded-2xl p-6 transition-colors hover:border-white/20"
              >
                <div className="grid md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-3">
                    <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded bg-white/5 border border-white/10 text-gray-300 mb-2">
                      {item.country}
                    </span>
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-abBlue hover:underline font-medium"
                    >
                      <span>Source: {item.sourceName}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <div className="md:col-span-5 text-sm md:text-base text-gray-200 leading-relaxed">
                    <p className="font-medium text-white mb-1">Target / Rule</p>
                    <p className="text-gray-300">{item.rule}</p>
                  </div>
                  <div className="md:col-span-4 text-sm text-gray-300 leading-relaxed border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                    <p className="font-semibold text-abBlue mb-1">What it means for AB</p>
                    <p>{item.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Integrity Commitment Callout */}
          <div className="bg-[#18191f] border-l-4 border-amber-500 rounded-r-2xl p-6 text-gray-200">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base font-semibold text-white mb-1">
                  Our Commitment to Transparent Claims
                </h3>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  <strong className="text-white">What we will not do:</strong> claim to be &ldquo;carbon neutral&rdquo;
                  or &ldquo;net zero&rdquo; through offsets alone, or sign up to marketing pledges we cannot report against.
                  Emissions reductions must be genuine, localized, and verifiable on the ground.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ROADMAP SECTION */}
      <section id="roadmap" className="py-24 px-4 bg-[#212228] border-b border-white/10 scroll-mt-12">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-14 text-center md:text-left">
            <div className="text-xs font-mono tracking-widest text-abBlue uppercase mb-2">
              Strategic Timeline
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Our plan to 2035
            </h2>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              AB sustainability roadmap · 4 phases, 2026 to 2035.
              Review our phased transition below. The highlighted card represents our active baseline phase:
            </p>
          </div>

          <SustainabilityRoadmap />
        </div>
      </section>

      {/* 5. WHAT WE ARE DOING NOW (PRACTICAL STEPS) */}
      <section className="py-24 px-4 bg-[#1c1d22] border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-14">
            <div className="text-xs font-mono tracking-widest text-abBlue uppercase mb-2">
              Operational Efficiency
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Practical steps on every trip
            </h2>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              The fastest cuts in road transport come from running vehicles better, before any new technology.
              These are the practical steps AB applies across every journey:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRACTICAL_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="bg-[#212228] border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:border-abBlue/40 hover:-translate-y-1"
              >
                <div className="p-3 rounded-xl bg-white/5 w-fit mb-4 border border-white/10">
                  {step.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2.5">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. MEASURING AND REPORTING */}
      <section className="py-24 px-4 bg-[#212228] border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-14">
            <div className="text-xs font-mono tracking-widest text-abBlue uppercase mb-2">
              Data &amp; Verification
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              We measure before we promise
            </h2>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              Every target on this page depends on knowing our real emissions.
              AB measures fuel and electricity used per vehicle and per trip,
              then converts it to CO2e following ISO 14083 and the GHG Protocol.
            </p>
          </div>

          {/* Measurement Table */}
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#1c1d22] mb-12">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 border-b border-white/10 text-gray-300 font-semibold uppercase text-xs tracking-wider">
                <tr>
                  <th className="py-4 px-6">What we measure</th>
                  <th className="py-4 px-6">How</th>
                  <th className="py-4 px-6">Who sees it</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-gray-300">
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-4 px-6 font-medium text-white">
                    Fuel and electricity per vehicle
                  </td>
                  <td className="py-4 px-6 text-gray-300">
                    Fuel cards, charging records, telematics
                  </td>
                  <td className="py-4 px-6 text-gray-400">
                    AB management; UAE reporting to MOCCAE
                  </td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-4 px-6 font-medium text-white">
                    CO2e per trip and per passenger-km
                  </td>
                  <td className="py-4 px-6 text-gray-300">
                    Distance and energy data per job, ISO 14083 method
                  </td>
                  <td className="py-4 px-6 text-gray-400">
                    Corporate and event clients
                  </td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-4 px-6 font-medium text-white">
                    Empty km share
                  </td>
                  <td className="py-4 px-6 text-gray-300">
                    Dispatch routing system
                  </td>
                  <td className="py-4 px-6 text-gray-400">
                    Operations team, monthly
                  </td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-4 px-6 font-medium text-white">
                    Fleet mix (petrol, hybrid, electric)
                  </td>
                  <td className="py-4 px-6 text-gray-300">
                    Fleet register
                  </td>
                  <td className="py-4 px-6 text-gray-400">
                    Published here once a year
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Reporting Offerings Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#1c1d22] border border-white/10 p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-6 h-6 text-abBlue" />
                <h3 className="text-xl font-bold text-white">
                  Client emissions reports
                </h3>
              </div>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                Corporate accounts receive a quarterly report of CO2e generated from their trips,
                formatted specifically for their Scope 3 business-travel sustainability filings.
                Event clients receive a post-event transport footprint included in their comprehensive event logistics summary.
              </p>
            </div>

            <div className="bg-[#1c1d22] border border-white/10 p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <CalendarCheck className="w-6 h-6 text-abBlue" />
                <h3 className="text-xl font-bold text-white">
                  Annual update
                </h3>
              </div>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                We publish our fleet mix, transition progress, and total operational emissions on this page each year,
                starting with our 2026 baseline data. Once our accounting methodology reaches full stability,
                we will invite an accredited independent audit firm to verify the figures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PEOPLE, SAFETY AND COMMUNITY */}
      <section className="py-24 px-4 bg-[#1c1d22] border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-14">
            <div className="text-xs font-mono tracking-widest text-abBlue uppercase mb-2">
              Social &amp; Human Governance
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Sustainability includes the people who drive
            </h2>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              True sustainability encompasses the welfare, safety, and dignity of our frontline workforce.
              Our operational standards are founded on fair employment and strict duty of care:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#212228] border border-white/10 p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-abBlue" />
                Road safety
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Automated speed and harsh-braking alerts from vehicle telematics, strict fatigue limits on shift length,
                and regular defensive-driving refreshers. We plan to align our road safety management system with ISO 39001.
              </p>
            </div>

            <div className="bg-[#212228] border border-white/10 p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Users className="w-5 h-5 text-abBlue" />
                Fair work
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Chauffeurs are employed on formal written contracts, paid promptly on schedule,
                and never charged recruitment fees or visa deductions. Read more in our{" "}
                <Link href={`${base}/career`} className="text-abBlue hover:underline font-medium">
                  Careers section
                </Link>.
              </p>
            </div>

            <div className="bg-[#212228] border border-white/10 p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-500" />
                Heat safety
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Mandatory rest breaks and shaded, air-conditioned driver waiting lounges during summer midday heat,
                fully complying with Saudi, UAE, and Qatar national heat-protection labour mandates.
              </p>
            </div>

            <div className="bg-[#212228] border border-white/10 p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-abBlue" />
                Local hiring &amp; training
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Dedicated career pathways and management trainee opportunities for Saudi, Emirati,
                and Qatari nationals within regional dispatch, fleet logistics, and operational oversight roles.
              </p>
            </div>

            <div className="bg-[#212228] border border-white/10 p-6 rounded-2xl md:col-span-2 lg:col-span-2">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-abBlue" />
                Responsible suppliers
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Every external partner fleet and contractor signs the binding AB Supplier Code of Conduct,
                covering mandatory vehicle emission baselines, preventative maintenance checks,
                and equitable treatment of drivers. Learn more on our{" "}
                <Link href={`${base}/suppliers`} className="text-abBlue hover:underline font-medium">
                  Suppliers page
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FOR CLIENTS (CORPORATE, EVENTS & TENDERS) */}
      <section id="client-solutions" className="py-24 px-4 bg-[#212228] border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-14">
            <div className="text-xs font-mono tracking-widest text-abBlue uppercase mb-2">
              Client Solutions
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Lower-emission transport for your company or event
            </h2>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              We provide practical, low-carbon mobility solutions tailored to corporate procurement teams,
              mega-event organizers, and ESG tender committees:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-[#1c1d22] border border-white/10 p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl w-fit mb-4 text-abBlue">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Corporate accounts
                </h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
                  Designate hybrid or electric vehicles as your organization&apos;s default class where available in your operating cities.
                  Receive quarterly CO2e statements directly compatible with your Scope 3 corporate travel audits.
                </p>
              </div>
              <Link
                href={`${base}/corporate-accounts`}
                className="inline-flex items-center gap-2 text-sm text-abBlue font-semibold hover:underline"
              >
                <span>Corporate Accounts Overview</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-[#1c1d22] border border-white/10 p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl w-fit mb-4 text-abBlue">
                  <CalendarCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Events and conferences
                </h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
                  We architect high-efficiency transport manifests around fewer, fuller vehicles: coordinated shuttle loops
                  instead of individual sedans, timed dispatch waves, and zero-emission electric buses where venue charging allows.
                  Includes a post-event transport emissions report.
                </p>
              </div>
              <Link
                href={`${base}/services/event-transportation`}
                className="inline-flex items-center gap-2 text-sm text-abBlue font-semibold hover:underline"
              >
                <span>Event Transportation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-[#1c1d22] border border-white/10 p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl w-fit mb-4 text-abBlue">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Tenders &amp; RFPs
                </h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
                  Our comprehensive sustainability statement, fleet mix inventory, and emissions calculation methodology
                  are readily available for institutional procurement, government tenders, and ESG compliance questionnaires.
                </p>
              </div>
              <Link
                href={`${base}/quote/tender`}
                className="inline-flex items-center gap-2 text-sm text-abBlue font-semibold hover:underline"
              >
                <span>Tenders &amp; Proposals</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Primary CTA Banner */}
          <div className="bg-gradient-to-r from-[#202535] to-[#1c1d22] border border-abBlue/40 rounded-3xl p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Ask for a low-emission transport plan
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                Connect with our commercial team to configure hybrid or electric vehicles for your corporate mobility
                or request our complete sustainability disclosure document for your upcoming tender.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto">
              <Link
                href={`${base}/quote/tender`}
                className="inline-flex items-center justify-center gap-2 bg-white text-[#1c1d22] font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all shadow-lg"
              >
                <span>Request Plan</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={`${base}/quote/tender`}
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-medium px-6 py-4 rounded-xl border border-white/20 hover:bg-white/15 transition-all text-sm"
              >
                <span>Sustainability Statement</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQS */}
      <section className="py-24 px-4 bg-[#1c1d22] border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs font-mono tracking-widest text-abBlue uppercase mb-2">
              Transparency First
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Sustainability questions
            </h2>
            <p className="text-gray-300 text-base md:text-lg">
              Straightforward answers regarding our fleet capabilities, carbon accounting, and regulatory commitments.
            </p>
          </div>

          <SustainabilityFaq faqs={FAQS} />
        </div>
      </section>

      {/* 10. DIRECTORY OF INTERNAL LINKS */}
      <section className="py-16 px-4 bg-[#17181c]">
        <div className="max-w-6xl mx-auto">
          <div className="text-xs font-mono tracking-widest text-gray-400 uppercase mb-6">
            Related Operational &amp; Governance Links
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm">
            <Link
              href={`${base}/company`}
              className="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/20 hover:text-abBlue transition-colors text-gray-300"
            >
              Company Overview
            </Link>
            <Link
              href={`${base}/company/chauffeur-standard`}
              className="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/20 hover:text-abBlue transition-colors text-gray-300"
            >
              Chauffeur Standard
            </Link>
            <Link
              href={`${base}/fleet`}
              className="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/20 hover:text-abBlue transition-colors text-gray-300"
            >
              Vehicle Fleet
            </Link>
            <Link
              href={`${base}/suppliers`}
              className="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/20 hover:text-abBlue transition-colors text-gray-300"
            >
              Responsible Suppliers
            </Link>
            <Link
              href={`${base}/career`}
              className="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/20 hover:text-abBlue transition-colors text-gray-300"
            >
              Careers &amp; Fair Work
            </Link>
            <Link
              href={`${base}/services/event-transportation`}
              className="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/20 hover:text-abBlue transition-colors text-gray-300"
            >
              Event Transportation
            </Link>
            <Link
              href={`${base}/corporate-accounts`}
              className="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/20 hover:text-abBlue transition-colors text-gray-300"
            >
              Corporate Accounts
            </Link>
            <Link
              href={`${base}/quote/tender`}
              className="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/20 hover:text-abBlue transition-colors text-gray-300"
            >
              Tenders &amp; Proposals
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
