import type { Metadata } from "next";
import Link from "next/link";
import {
  defaultLocale,
  getDictionary,
  hasLocale,
  localeBase,
  type Locale,
} from "@/app/[lang]/dictionaries";
import { generateSeoMetadata } from "@/lib/seo";

type SupplierCopy = typeof import("../dictionaries/en-US.json")["suppliers"];
type SupplierDictionary = Awaited<ReturnType<typeof getDictionary>> & {
  suppliers: SupplierCopy;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const dictionaryLocale = locale === "en-GB" ? "en-US" : locale;
  const dict = (await getDictionary(dictionaryLocale)) as SupplierDictionary;
  const isAr = locale === "ar";
  return generateSeoMetadata({
    title: isAr
      ? dict.suppliers.metaTitle
      : "Become an AB Fleet or Transport Supplier \| AB",
    description: isAr
      ? dict.suppliers.metaDescription
      : "Supply vehicles or chauffeurs to AB in Saudi Arabia, the UAE and Qatar, or worldwide for our outbound clients. Requirements and how to apply.",
    path: "/suppliers",
    lang,
    keywords: isAr
      ? "موردون شركة إي بي, devenir fournisseur AB, أبو扎 suppliers, регистрация поставщиков"
      : "Become an AB Fleet or Transport Supplier, AB supplier registration, become a transport supplier Saudi Arabia, UAE, Qatar",
  });
}

export default async function SuppliersPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const dictionaryLocale = locale === "en-GB" ? "en-US" : locale;
  const dict = (await getDictionary(dictionaryLocale)) as SupplierDictionary;

  // --- Hero ---
  const heroEyebrow = dict.suppliers.heroEyebrow;
  const heroH1 = dict.suppliers.heroH1;
  const heroDescription = dict.suppliers.heroDescription;
  const applyCta = dict.suppliers.applyCta;

  // --- Why supply with AB ---
  const whyTitle = dict.suppliers.whyTitle; // "Why operators choose to work with AB"
  const whyH3_1 = dict.suppliers.whyH3_1 || "Planned work, not last-minute calls.";
  const whyH3_2 = dict.suppliers.whyH3_2 || "Access to clients you would not reach alone.";
  const whyH3_3 = dict.suppliers.whyH3_3 || "Clear rates and on-time payment.";
  const whyH3_4 = dict.suppliers.whyH3_4 || "Support from a 24/7 control room.";
  const whyH3_5 = dict.suppliers.whyH3_5 || "One set of standards, applied fairly.";
  const whyH3_6 = dict.suppliers.whyH3_6 || "Work in the GCC and around the world.";
  const whyH3_7 = dict.suppliers.whyH3_7 || "One contracting team, wherever you are.";

  // --- Who we contract ---
  const whoTitle = dict.suppliers.whoTitle; // "Who we work with"
  // Table rows are rendered inline from the markdown structure below

  // --- Requirements ---
  const reqTitle = dict.suppliers.reqTitle; // "What you need to apply"
  const reqCompanyDocsTitle = dict.suppliers.reqCompanyDocsTitle; // "Company documents"
  const reqVehiclesTitle = dict.suppliers.reqVehiclesTitle; // "Vehicles"
  const reqDriversTitle = dict.suppliers.reqDriversTitle; // "Drivers and chauffeurs"
  const reqInternationalTitle = dict.suppliers.reqInternationalTitle; // "International suppliers (outside the GCC)"

  // --- How onboarding works ---
  const onboardingTitle = dict.suppliers.onboardingTitle; // "From application to first job"
  const onboardingStep1 = dict.suppliers.onboardingStep1; // "Apply."
  const onboardingStep2 = dict.suppliers.onboardingStep2; // "Document review."
  const onboardingStep3 = dict.suppliers.onboardingStep3; // "Vehicle inspection."
  const onboardingStep4 = dict.suppliers.onboardingStep4; // "Driver briefing."
  const onboardingStep5 = dict.suppliers.onboardingStep5; // "Rate agreement."
  const onboardingStep6 = dict.suppliers.onboardingStep6; // "Trial assignment."

  // --- Day to day ---
  const dayTitle = dict.suppliers.dayTitle; // "What working with AB looks like"
  const dayJobOffer = dict.suppliers.dayJobOffer; // "Job offers: You receive job requests..."
  const dayBriefing = dict.suppliers.dayBriefing; // "Briefing: Before each programme..."
  const dayOnTheDay = dict.suppliers.dayOnTheDay; // "On the day: Drivers check in through the AB app."
  const dayStandards = dict.suppliers.dayStandards; // "Standards: AB-branded name boards and dress code..."
  const dayAfterJob = dict.suppliers.dayAfterJob; // "After the job: Trip records are confirmed in the portal."
  const dayPerformance = dict.suppliers.dayPerformance; // "Performance review: Each quarter we share your punctuality..."

  // --- Supplier portal ---
  const portalTitle = dict.suppliers.portalTitle; // "The AB supplier portal"
  const portalTableWhy1 = dict.suppliers.portalTableWhy1 || "No missed WhatsApp messages; every job and rate is in writing";
  const portalTableWhy2 = dict.suppliers.portalTableWhy2 || "Dispatch knows who is coming before the pickup";
  const portalBtn2 = dict.suppliers.portalBtn2 || "Not registered yet? Apply as a supplier";

  // --- FAQs ---
  const faqTitle = dict.suppliers.faqTitle; // "Supplier questions"
  const faqQ1 = dict.suppliers.faqQ1; // "Is there a fee to register as an AB supplier?"
  const faqA1 = dict.suppliers.faqA1; // "No. Registration and onboarding are free."
  const faqQ2 = dict.suppliers.faqQ2; // "Do I have to work only for AB?"
  const faqA2 = dict.suppliers.faqA2; // "No. You can keep your own clients."
  const faqQ3 = dict.suppliers.faqQ3; // "How much work can I expect?"
  const faqA3 = dict.suppliers.faqA3; // "It depends on your vehicle types, your city and the season."
  const faqQ4 = dict.suppliers.faqQ4; // "When do I get paid?"
  const faqA4 = dict.suppliers.faqA4; // "Approved invoices are paid within N days by bank transfer."
  const faqQ5 = dict.suppliers.faqQ5; // "Can I apply as an individual driver with my own car?"
  const faqA5 = dict.suppliers.faqA5; // "This programme is for registered companies."
  const faqQ6 = dict.suppliers.faqQ6; // "Which cities do you need suppliers in?"
  const faqA6 = dict.suppliers.faqA6; // "In the GCC, we contract suppliers in..."
  const faqQ7 = dict.suppliers.faqQ7; // "My company is outside the GCC. Can I apply?"
  const faqA7 = dict.suppliers.faqA7; // "Yes. We contract chauffeur and ground-transport companies worldwide."
  const faqQ8 = dict.suppliers.faqQ8; // "How long does onboarding take?"
  const faqA8 = dict.suppliers.faqA8; // "About N working days from a complete application to your first job."

  // --- Application form ---
  const formTitle = dict.suppliers.formTitle; // "Apply to become an AB supplier"
  const formSubtitle = dict.suppliers.formSubtitle; // "Tell us about your company and fleet."
  const formCta = dict.suppliers.formCta; // "Submit application"
  const closingLine = dict.suppliers.closingLine; // "Already an AB supplier? Log in to the supplier portal. Looking for a chauffeur job? See Careers"

  // Form fields i18n (minimal - the form itself is a placeholder posting to procurement)
  const formCompanyName = dict.suppliers.formCompanyName; // "Company name"
  const formCountry = dict.suppliers.formCountry; // "Country of registration"
  const formCities = dict.suppliers.formCities; // "Cities you operate in"
  const formSupplierType = dict.suppliers.formSupplierType; // "Supplier type"
  const formFleet = dict.suppliers.formFleet; // "Fleet by vehicle class (number and model year)"
  const formDrivers = dict.suppliers.formDrivers; // "Number of licensed drivers"
  const formLicences = dict.suppliers.formLicences; // "CR number and transport licence number"
  const formDocuments = dict.suppliers.formDocuments; // "Documents"
  const formContact = dict.suppliers.formContact; // "Contact name, role, email, mobile"
  const formConsent = dict.suppliers.formConsent;

  return (
    <main className="min-h-screen bg-[#292a30] text-white">
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- Hero --- */}
        <div className="relative mb-20 lg:mb-32 overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-[#1c1d21] via-[#292a30] to-[#292a30] px-6 py-12 sm:px-10 sm:py-16">
          <p className="text-xs font-bold tracking-[0.22em] text-abBlue uppercase mb-4">
            {heroEyebrow}
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif leading-tight text-white">
            {heroH1}
          </h1>
          {heroDescription && (
            <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed">
              {heroDescription}
            </p>
          )}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="#apply"
              className="inline-block bg-abBlue text-white px-6 py-3 rounded-sm text-sm font-semibold hover:bg-abServiceBlue transition-colors"
            >
              {applyCta}
            </Link>
            <Link
              href="#requirements"
              className="inline-block border border-abBlue text-abBlue px-6 py-3 rounded-sm text-sm font-semibold hover:bg-abServiceBlue hover:text-white transition-colors"
            >
              {reqTitle}
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-5 text-sm text-gray-300">
            <span>Offices in Riyadh, Dubai, Abu Dhabi and Doha</span>
            <span>24/7 dispatch from Riyadh</span>
          </div>
        </div>

        {/* --- Why supply with AB --- */}
        <div className="mb-20 lg:mb-24 rounded-2xl border border-gray-800/80 bg-[#1c1d21] p-6 sm:p-8 lg:p-10">
          <h2 className="text-2xl sm:text-3xl font-serif text-white mb-8">
            {whyTitle}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-xl border border-gray-700/50 bg-[#35363c] p-6">
              <h3 className="text-xl font-medium text-white mb-4">{whyH3_1}</h3>
              <p className="text-gray-300 line-clamp-3">
                We give suppliers steady, well-planned work and pay on agreed terms. You keep running your company; we bring the clients, the plan and the control room.
              </p>
            </div>
            <div className="rounded-xl border border-gray-700/50 bg-[#35363c] p-6">
              <h3 className="text-xl font-medium text-white mb-4">{whyH3_2}</h3>
              <p className="text-gray-300 line-clamp-3">
                AB holds accounts with companies, government entities, event organisers and travel partners in three countries. As an approved supplier, your vehicles work on programmes that are usually tendered to a single managed provider.
              </p>
            </div>
            <div className="rounded-xl border border-gray-700/50 bg-[#35363c] p-6">
              <h3 className="text-xl font-medium text-white mb-4">{whyH3_3}</h3>
              <p className="text-gray-300 line-clamp-3">
                Rates are agreed per vehicle class and per job type before work starts. Approved invoices are paid within [N] days, in [SAR / AED / QAR], to your registered company account.
              </p>
            </div>
            <div className="rounded-xl border border-gray-700/50 bg-[#35363c] p-6">
              <h3 className="text-xl font-medium text-white mb-4">{whyH3_4}</h3>
              <p className="text-gray-300 line-clamp-3">
                Our Riyadh operations centre tracks every vehicle on an AB job. If a flight changes, a guest is delayed or a vehicle breaks down, a dispatcher handles it with your driver and arranges standby cover.
              </p>
            </div>
            <div className="rounded-xl border border-gray-700/50 bg-[#35363c] p-6">
              <h3 className="text-xl font-medium text-white mb-4">{whyH3_5}</h3>
              <p className="text-gray-300 line-clamp-3">
                Every supplier works to the same written standard for vehicles, drivers and conduct. Performance is measured on punctuality, vehicle condition and client feedback, and good results lead to more work.
              </p>
            </div>
            <div className="rounded-xl border border-gray-700/50 bg-[#35363c] p-6">
              <h3 className="text-xl font-medium text-white mb-4">{whyH3_6}</h3>
              <p className="text-gray-300 line-clamp-3">
                Suppliers in Saudi Arabia, the UAE and Qatar work on programmes in their own city or, where licensing allows, on large events elsewhere in the country. International suppliers serve AB clients from the GCC and India when they land in your city, from airport pickups to multi-day chauffeur programmes.
              </p>
            </div>
            <div className="rounded-xl border border-gray-700/50 bg-[#35363c] p-6">
              <h3 className="text-xl font-medium text-white mb-4">{whyH3_7}</h3>
              <p className="text-gray-300 line-clamp-3">
                A single AB contracting team manages every supplier, in the region and globally. You deal with one team for onboarding, rates, agreements and invoices, and every supplier works to the same standard and payment process.
              </p>
            </div>
          </div>
        </div>

        {/* --- Who we contract --- */}
        <div className="mb-20 lg:mb-24 rounded-2xl border border-gray-800/80 bg-[#1c1d21] p-6 sm:p-8 lg:p-10">
          <h2 className="text-2xl sm:text-3xl font-serif text-white mb-8">
            {whoTitle}
          </h2>

          {/* GCC Suppliers Table */}
          <div className="mb-8">
            <h3 className="text-base font-medium text-gray-300 mb-4">GCC Suppliers</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-[#35363c] border border-gray-700/50 rounded-xl p-6">
                <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-3">Bus and coach operators</h4>
                <p className="text-sm text-gray-300">
                  Coaches, minibuses and VIP buses with licensed drivers — Event shuttles, delegate transfers, staff and workforce routes, Umrah groups
                </p>
              </div>
              <div className="bg-[#35363c] border border-gray-700/50 rounded-xl p-6">
                <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-3">Premium car and SUV fleet owners</h4>
                <p className="text-sm text-gray-300">
                  Business and luxury sedans, luxury SUVs, with or without chauffeurs — Executive and VIP travel, airport transfers, event VIP car pools
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-[#35363c] border border-gray-700/50 rounded-xl p-6">
                <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-3">Van and MPV operators</h4>
                <p className="text-sm text-gray-300">
                  Business vans and MPVs with drivers — Small groups, crews, airport transfers with luggage
                </p>
              </div>
              <div className="bg-[#35363c] border border-gray-700/50 rounded-xl p-6">
                <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-3">Chauffeur and driver agencies</h4>
                <p className="text-sm text-gray-300">
                  Licensed, vetted chauffeurs and drivers — Dedicated chauffeur contracts, peak-season cover
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-[#35363c] border border-gray-700/50 rounded-xl p-6">
                <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-3">Service providers</h4>
                <p className="text-sm text-gray-300">
                  Vehicle branding, cleaning, maintenance and event support [confirm services needed]
                </p>
              </div>
            </div>
          </div>

          {/* Global Suppliers Table */}
          <div>
            <h3 className="text-base font-medium text-gray-300 mb-4">Global suppliers for our outbound clients</h3>
            <p className="mb-5 max-w-4xl leading-relaxed text-gray-300">
              AB clients travel from the GCC and India to destinations worldwide. We work with local ground-transport partners to deliver a consistent standard, supported by our contracting team and 24/7 dispatch. Arabic-speaking chauffeurs are an advantage.
            </p>
            <p className="mb-5 text-sm text-gray-400">
              Priority destinations: [confirm the countries where AB currently needs partners].
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-[#35363c] border border-gray-700/50 rounded-xl p-6">
                <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-3">Chauffeur companies</h4>
                <p className="text-sm text-gray-300">
                  Business and luxury sedans, SUVs and vans — Airport meet and greet, executive and VIP travel, chauffeurs by the hour or day
                </p>
              </div>
              <div className="bg-[#35363c] border border-gray-700/50 rounded-xl p-6">
                <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-3">Coach and minibus operators</h4>
                <p className="text-sm text-gray-300">
                  Delegations, conferences, group tours and event transfers
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-[#35363c] border border-gray-700/50 rounded-xl p-6">
                <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-3">Ground handlers and DMCs</h4>
                <p className="text-sm text-gray-300">
                  Multi-day programmes and itineraries
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- Requirements --- */}
        <div id="requirements" className="mb-20 lg:mb-24 rounded-2xl border border-gray-800/80 bg-[#1c1d21] p-6 sm:p-8 lg:p-10">
          <h2 className="text-2xl sm:text-3xl font-serif text-white mb-10">
            {reqTitle}
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: reqCompanyDocsTitle,
                items: [
                  "Commercial registration (CR) or trade licence in your country of operation",
                  "Passenger transport licence from the relevant authority [confirm requirements by vehicle type]",
                  "VAT registration certificate",
                  "Company bank account details on letterhead",
                ],
              },
              {
                title: reqVehiclesTitle,
                items: [
                  "Vehicles registered to your company, with valid registration and roadworthiness inspection",
                  "Comprehensive passenger insurance [confirm minimum cover]",
                  "Maximum vehicle age: [N] years for sedans and SUVs; [N] years for buses and coaches",
                  "Working air conditioning, clean interior and no visible body damage",
                  "GPS tracking or willingness to use the AB driver app on each job [confirm]",
                ],
              },
              {
                title: reqDriversTitle,
                items: [
                  "Valid licence for the vehicle class, plus a professional or public transport permit where required",
                  "Clean driving record and background check [confirm requirement]",
                  "Able to communicate in English; Arabic is an advantage",
                  "Attend AB's Chauffeur Standard briefing before the first job",
                ],
              },
              {
                title: reqInternationalTitle,
                items: [
                  "Company registration and the passenger transport or private-hire licence required in your country",
                  "Commercial passenger insurance [confirm minimum cover]",
                  "Vehicles and drivers that meet AB's standard for the class booked",
                  "English-speaking chauffeurs; Arabic or Hindi is an advantage [confirm]",
                  "Live trip updates to AB dispatch and invoicing in [confirm currency]",
                ],
              },
            ].map((requirement) => (
              <div key={requirement.title} className="rounded-xl border border-gray-700/50 bg-[#35363c] p-6">
                <h3 className="mb-4 text-lg font-semibold text-white">{requirement.title}</h3>
                <ul className="space-y-3 text-sm leading-relaxed text-gray-300">
                  {requirement.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-abBlue" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        {/* --- How onboarding works --- */}
        <div className="mb-20 lg:mb-24 rounded-2xl border border-gray-800/80 bg-[#1c1d21] p-6 sm:p-8 lg:p-10">
          <h2 className="text-2xl sm:text-3xl font-serif text-white mb-10">
            {onboardingTitle}
          </h2>
          <p className="mb-6 text-gray-300">
            Most suppliers complete onboarding in [N] working days once all documents are in.
          </p>
          <ol className="grid list-inside list-decimal grid-cols-1 gap-4 text-gray-300 md:grid-cols-2 marker:text-abBlue">
            <li className="rounded-xl border border-gray-700/50 bg-[#35363c] p-5">
              <p className="inline font-semibold text-white">{onboardingStep1}</p>
              <p>Complete the short form below and upload your company documents.</p>
            </li>
            <li className="rounded-xl border border-gray-700/50 bg-[#35363c] p-5">
              <p className="inline font-semibold text-white">{onboardingStep2}</p>
              <p>
                Our procurement team checks licences, insurance and registration, and contacts you within [N] working days.
              </p>
            </li>
            <li className="rounded-xl border border-gray-700/50 bg-[#35363c] p-5">
              <p className="inline font-semibold text-white">{onboardingStep3}</p>
              <p>
                We inspect a sample of your vehicles at your depot or an AB location.
              </p>
            </li>
            <li className="rounded-xl border border-gray-700/50 bg-[#35363c] p-5">
              <p className="inline font-semibold text-white">{onboardingStep4}</p>
              <p>
                Your drivers attend a briefing on the AB Chauffeur Standard, our app and dispatch procedures.
              </p>
            </li>
            <li className="rounded-xl border border-gray-700/50 bg-[#35363c] p-5">
              <p className="inline font-semibold text-white">{onboardingStep5}</p>
              <p>
                We agree rates by vehicle class and job type, and sign a supplier agreement.
              </p>
            </li>
            <li className="rounded-xl border border-gray-700/50 bg-[#35363c] p-5">
              <p className="inline font-semibold text-white">{onboardingStep6}</p>
              <p>
                You run a first job with an AB coordinator, then join the approved supplier list and receive work through the portal.
              </p>
            </li>
          </ol>
        </div>

        {/* --- Day to day --- */}
        <div className="mb-20 lg:mb-24 rounded-2xl border border-gray-800/80 bg-[#1c1d21] p-6 sm:p-8 lg:p-10">
          <h2 className="text-2xl sm:text-3xl font-serif text-white mb-10">
            {dayTitle}
          </h2>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-gray-700/50 bg-[#35363c] p-5">
              <h3 className="text-lg font-medium text-white mb-3">Job offers</h3>
              <p className="text-gray-300">{dayJobOffer}</p>
            </div>
            <div className="rounded-xl border border-gray-700/50 bg-[#35363c] p-5">
              <h3 className="text-lg font-medium text-white mb-3">Briefing</h3>
              <p className="text-gray-300">{dayBriefing}</p>
            </div>
            <div className="rounded-xl border border-gray-700/50 bg-[#35363c] p-5">
              <h3 className="text-lg font-medium text-white mb-3">On the day</h3>
              <p className="text-gray-300">{dayOnTheDay}</p>
            </div>
            <div className="rounded-xl border border-gray-700/50 bg-[#35363c] p-5">
              <h3 className="text-lg font-medium text-white mb-3">Standards</h3>
              <p className="text-gray-300">{dayStandards}</p>
            </div>
            <div className="rounded-xl border border-gray-700/50 bg-[#35363c] p-5">
              <h3 className="text-lg font-medium text-white mb-3">After the job</h3>
              <p className="text-gray-300">{dayAfterJob}</p>
            </div>
            <div className="rounded-xl border border-gray-700/50 bg-[#35363c] p-5">
              <h3 className="text-lg font-medium text-white mb-3">Performance review</h3>
              <p className="text-gray-300">{dayPerformance}</p>
            </div>
          </div>
        </div>

        {/* --- Supplier portal --- */}
        <div id="portal" className="mb-20 lg:mb-24 rounded-2xl border border-gray-800/80 bg-[#1c1d21] p-6 sm:p-8 lg:p-10">
          <h2 className="text-2xl sm:text-3xl font-serif text-white mb-8">
            {portalTitle}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <p className="rounded-xl border border-gray-700/50 bg-[#35363c] p-5 text-gray-300">{portalTableWhy1}</p>
            <p className="rounded-xl border border-gray-700/50 bg-[#35363c] p-5 text-gray-300">{portalTableWhy2}</p>
          </div>
          <p className="mt-6 text-sm text-gray-400">
            Existing suppliers: contact your AB representative for portal access.
          </p>
          <Link
            href="#apply"
            className="mt-6 inline-flex bg-abBlue text-white px-6 py-3 rounded-sm text-sm font-semibold hover:bg-abServiceBlue transition-colors"
          >
            {portalBtn2}
          </Link>
        </div>

        {/* --- FAQs --- */}
        <div className="mb-20 lg:mb-24 rounded-2xl border border-gray-800/80 bg-[#1c1d21] p-6 sm:p-8 lg:p-10">
          <h2 className="text-2xl sm:text-3xl font-serif text-white mb-8">
            {faqTitle}
          </h2>
          <div className="space-y-4">
            <div className="border-b border-gray-700/70 pb-4 mb-4">
              <p className="font-medium text-gray-300">{faqQ1}</p>
              <p className="text-gray-300">{faqA1}</p>
            </div>
            <div className="border-b border-gray-700/70 pb-4 mb-4">
              <p className="font-medium text-gray-300">{faqQ2}</p>
              <p className="text-gray-300">{faqA2}</p>
            </div>
            <div className="border-b border-gray-700/70 pb-4 mb-4">
              <p className="font-medium text-gray-300">{faqQ3}</p>
              <p className="text-gray-300">{faqA3}</p>
            </div>
            <div className="border-b border-gray-700/70 pb-4 mb-4">
              <p className="font-medium text-gray-300">{faqQ4}</p>
              <p className="text-gray-300">{faqA4}</p>
            </div>
            <div className="border-b border-gray-700/70 pb-4 mb-4">
              <p className="font-medium text-gray-300">{faqQ5}</p>
              <p className="text-gray-300">{faqA5}</p>
            </div>
            <div className="border-b border-gray-700/70 pb-4 mb-4">
              <p className="font-medium text-gray-300">{faqQ6}</p>
              <p className="text-gray-300">{faqA6}</p>
            </div>
            <div className="border-b border-gray-700/70 pb-4 mb-4">
              <p className="font-medium text-gray-300">{faqQ7}</p>
              <p className="text-gray-300">{faqA7}</p>
            </div>
            <div className="border-b border-gray-700/70 pb-4 mb-4">
              <p className="font-medium text-gray-300">{faqQ8}</p>
              <p className="text-gray-300">{faqA8}</p>
            </div>
          </div>
        </div>

        {/* --- Application form and closing CTA --- */}
        <div id="apply" className="mb-20 lg:mb-32 bg-[#1c1d21] border border-gray-700/50 rounded-xl p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-serif text-white mb-8">
            {formTitle}
          </h2>
          <p className="text-gray-300 mb-8">{formSubtitle}</p>
          <form
            action="#"
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
          >
            <div>
              <label htmlFor="company-name" className="block text-sm text-gray-300 mb-2">
                {formCompanyName}
              </label>
              <input
                id="company-name"
                name="companyName"
                type="text"
                className="w-full bg-[#0a0a0c] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-abServiceBlue"
                required
                defaultValue=""
              />
            </div>
            <div>
              <label htmlFor="country" className="block text-sm text-gray-300 mb-2">
                {formCountry}
              </label>
              <select
                id="country"
                name="country"
                className="w-full bg-[#0a0a0c] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-abServiceBlue"
                required
              >
                <option value="saudi-arabia">Saudi Arabia</option>
                <option value="uae">UAE</option>
                <option value="qatar">Qatar</option>
                <option value="india">India</option>
                <option value="other">Other (international)</option>
              </select>
            </div>
            <div>
              <label htmlFor="cities" className="block text-sm text-gray-300 mb-2">
                {formCities}
              </label>
              <select
                id="cities"
                name="cities"
                multiple
                className="w-full bg-[#0a0a0c] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-abServiceBlue"
                required
              >
                <option value="riyadh">Riyadh</option>
                <option value="jeddah">Jeddah</option>
                <option value="dammam">Dammam</option>
                <option value="mecca">Makkah</option>
                <option value="medina">Madinah</option>
                <option value="al-ula">Al Ula</option>
                <option value="dubai">Dubai</option>
                <option value="abu-dhabi">Abu Dhabi</option>
                <option value="doha">Doha</option>
              </select>
            </div>
            <div>
              <label htmlFor="supplier-type" className="block text-sm text-gray-300 mb-2">
                {formSupplierType}
              </label>
              <select
                id="supplier-type"
                name="supplierType"
                className="w-full bg-[#0a0a0c] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-abServiceBlue"
                required
              >
                <option value="bus-coach">Bus & coach</option>
                <option value="premium-suv">Premium cars & SUVs</option>
                <option value="vans-mpv">Vans & MPVs</option>
                <option value="chauffeur-agency">Chauffeur agency</option>
                <option value="service-provider">Service provider</option>
              </select>
            </div>
            <div>
              <label htmlFor="fleet" className="block text-sm text-gray-300 mb-2">
                {formFleet}
              </label>
              <input
                id="fleet"
                name="fleet"
                type="text"
                className="w-full bg-[#0a0a0c] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-abServiceBlue"
                required
                defaultValue=""
                placeholder="e.g. 5 x Toyota Camry 2023"
              />
            </div>
            <div>
              <label htmlFor="drivers" className="block text-sm text-gray-300 mb-2">
                {formDrivers}
              </label>
              <input
                id="drivers"
                name="drivers"
                type="number"
                className="w-full bg-[#0a0a0c] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-abServiceBlue"
                required
                min="0"
                defaultValue="0"
              />
            </div>
            <div>
              <label htmlFor="licences" className="block text-sm text-gray-300 mb-2">
                {formLicences}
              </label>
              <input
                id="licences"
                name="licences"
                type="text"
                className="w-full bg-[#0a0a0c] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-abServiceBlue"
                required
                defaultValue=""
                placeholder="CR number and transport licence number"
              />
            </div>
            <div>
              <label htmlFor="documents" className="block text-sm text-gray-300 mb-2">
                {formDocuments}
              </label>
              <input
                id="documents"
                name="documents"
                type="file"
                className="w-full bg-[#0a0a0c] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-abServiceBlue"
                required
                accept=".pdf"
              />
            </div>
            <div>
              <label htmlFor="contact" className="block text-sm text-gray-300 mb-2">
                {formContact}
              </label>
              <input
                id="contact"
                name="contact"
                type="text"
                className="w-full bg-[#0a0a0c] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-abServiceBlue"
                required
                defaultValue=""
                placeholder="Contact name, role, email, mobile"
              />
            </div>
            <div className="lg:col-span-2">
              <label htmlFor="additional-info" className="block text-sm text-gray-300 mb-2">
                Anything else we should know? (optional)
              </label>
              <textarea
                id="additional-info"
                name="additionalInfo"
                rows={4}
                className="w-full resize-y rounded-lg border border-gray-600 bg-[#0a0a0c] px-4 py-3 text-white placeholder-gray-500 focus:border-abServiceBlue focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                {/* Consent checkbox */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="consent"
                    className="h-4 w-4 accent-abBlue"
                    required
                  />
                  <span className="text-gray-300 text-sm">
                    {formConsent}
                  </span>
                </div>
                </label>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <button
                type="submit"
                className="w-full bg-abBlue text-white px-6 py-3 rounded text-sm font-semibold hover:bg-abServiceBlue transition-colors"
              >
                {formCta}
              </button>
            </div>
          </form>
          <p className="mt-4 text-sm">
            <span className="text-gray-400">
              {closingLine.split("Looking for a chauffeur job?")[0]}
            </span>
            <Link
              href={`${localeBase(locale)}/career`}
              className="underline text-gray-300 hover:text-abBlue transition-colors ml-2"
            >
              {locale === "ar" ? "فرص العمل" : "Looking for a chauffeur job? See Careers"}
            </Link>
          </p>
        </div>
      </div>
    </section>
    </main>
  );
}