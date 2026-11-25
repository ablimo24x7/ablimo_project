"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { type CorporateContent } from "./corporate-content";
import { localeBase, localeHome } from "@/app/[lang]/dictionaries";
import { trackEvent } from "@/lib/analytics";

interface CorporateAccountsClientProps {
  content: CorporateContent;
  lang: string;
}

export default function CorporateAccountsClient({
  content,
  lang,
}: CorporateAccountsClientProps) {
  const isAr = lang.startsWith("ar");
  const base = localeBase(lang);
  const home = localeHome(lang);

  // Active section for sticky subnav / reading progress
  const [activeNav, setActiveNav] = useState("scope");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Capability statement modal
  const [isCapabilityOpen, setIsCapabilityOpen] = useState(false);

  // Form State
  const [company, setCompany] = useState("");
  const [contactName, setContactName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("+966");
  const [selectedCountries, setSelectedCountries] = useState<string[]>(["Saudi Arabia (KSA)"]);
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "Executive Chauffeur (On-Demand & Hourly)",
  ]);
  const [monthlyVolume, setMonthlyVolume] = useState("25 – 75 trips / month");
  const [startDate, setStartDate] = useState("");
  const [isRfp, setIsRfp] = useState<boolean>(false);
  const [rfpDeadline, setRfpDeadline] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string }[]>([]);
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Selected Scope Tab
  const [activeScopeIndex, setActiveScopeIndex] = useState(0);

  // Procurement Active Tab
  const [activeProcurementTab, setActiveProcurementTab] = useState(0);

  // File dropzone ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Scrollspy & Reading Progress
  useEffect(() => {
    const sectionIds = [
      "what-an-account-covers",
      "procurement",
      "billing",
      "governance",
      "booking",
      "organisations",
      "open-account",
      "faqs",
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;
      let currentSection = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPosition) {
          currentSection = id;
        }
      }
      setActiveNav(currentSection);

      const firstEl = document.getElementById("what-an-account-covers");
      const lastEl = document.getElementById("faqs");
      if (firstEl && lastEl) {
        const totalHeight = lastEl.offsetTop + lastEl.offsetHeight - firstEl.offsetTop - window.innerHeight;
        const progress = Math.max(0, Math.min(1, (window.scrollY - firstEl.offsetTop + 200) / totalHeight));
        setScrollProgress(progress * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Multi-select helpers
  const toggleCountry = (country: string) => {
    setSelectedCountries((prev) =>
      prev.includes(country) ? prev.filter((c) => c !== country) : [...prev, country]
    );
  };

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((f) => ({
        name: f.name,
        size: `${(f.size / (1024 * 1024)).toFixed(2)} MB`,
      }));
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!company.trim() || !contactName.trim() || !email.trim() || !phone.trim()) {
      setFormError(
        isAr
          ? "يرجى ملء الحقول الإلزامية (اسم الشركة، الاسم، البريد الإلكتروني، ورقم الهاتف)."
          : "Please complete all mandatory fields (Company, Name, Work Email, and Phone Number)."
      );
      return;
    }

    if (!consent) {
      setFormError(
        isAr
          ? "يرجى الموافقة على معالجة البيانات للمتابعة."
          : "Please check the consent box to proceed with the inquiry."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        channel: "corporate-proposal-form",
        company,
        name: contactName,
        role,
        email,
        phone: `${phoneCountryCode} ${phone}`,
        countries: selectedCountries.join(", "),
        services: selectedServices.join(", "),
        monthlyVolume,
        startDate: startDate || "Flexible",
        isRfp: isRfp ? "Yes" : "No",
        rfpDeadline: isRfp ? rfpDeadline : "N/A",
        attachedFiles: uploadedFiles.map((f) => f.name).join(", "),
        message: notes,
        pageUrl: typeof window !== "undefined" ? window.location.href : "https://www.ab.limo/corporate-accounts",
      };

      await fetch("/api/chat/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => {
        // Continue even if network error on dev
      });

      trackEvent("lead_captured", {
        form_id: "corporate_account_rfp_form",
        form_location: "corporate_accounts_page",
      });

      setIsSubmitted(true);
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen bg-[#070709] text-gray-200 selection:bg-abBlue selection:text-white ${isAr ? "rtl text-right" : "ltr text-left"}`}>
      {/* ─── Hero Section ────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-gray-800/80 bg-gradient-to-b from-[#0d0e12] via-[#08080a] to-[#070709]">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-abBlue/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-sky-600/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-400 mb-6 font-medium">
            <Link href={home} className="hover:text-abBlue transition-colors">
              {isAr ? "الرئيسية" : "Home"}
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-abBlue">{isAr ? "حسابات الشركات" : "Corporate Accounts"}</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-abBlue/10 border border-abBlue/30 text-abBlue text-xs font-semibold uppercase tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-abBlue animate-pulse" />
                {content.hero.badge}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
                {content.hero.h1}
              </h1>

              <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl mb-8 font-light">
                {content.hero.lead}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#open-account"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-sm font-semibold text-white bg-abBlue hover:bg-[#1a93c4] shadow-lg shadow-abBlue/25 hover:shadow-abBlue/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>{content.hero.primaryCta}</span>
                  <svg className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>

                <button
                  type="button"
                  onClick={() => setIsCapabilityOpen(true)}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg text-sm font-semibold text-gray-200 bg-[#16171d] hover:bg-[#1f2129] border border-gray-700/80 hover:border-abBlue/50 transition-all hover:text-white"
                >
                  <svg className="w-4 h-4 text-abBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>{content.hero.secondaryCta}</span>
                </button>
              </div>
            </div>

            {/* Right Card / Visual Credibility */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-gradient-to-br from-[#161820] to-[#0f1015] border border-gray-800 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between gap-3 pb-6 border-b border-gray-800">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-abBlue/15 border border-abBlue/30 flex items-center justify-center text-abBlue font-bold text-lg shrink-0">
                      AB
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-white">
                        {isAr ? "اتفاقية النقل المؤسسي الموحدة" : "Master Corporate Transportation Framework"}
                      </h3>
                      <p className="text-xs text-gray-400">
                        {isAr ? "المملكة العربية السعودية · الإمارات · قطر" : "Saudi Arabia · UAE · Qatar"}
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 whitespace-nowrap shrink-0">
                    <span className="relative flex h-1.5 w-1.5 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                    </span>
                    <span>{isAr ? "نشط ومباشر" : "Active & Live"}</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 my-6">
                  {content.hero.quickStats.map((stat, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#0c0d11] border border-gray-800/80">
                      <div className="text-2xl font-bold text-white tracking-tight">{stat.value}</div>
                      <div className="text-xs font-semibold text-abBlue mt-0.5">{stat.label}</div>
                      <div className="text-[11px] text-gray-400 mt-1">{stat.sub}</div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-abBlue" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {isAr ? "معتمد ومرخص من الهيئة العامة للنقل (TGA)" : "TGA & GCC Licensed Operator"}
                  </span>
                  <a href="#procurement" className="text-abBlue hover:underline font-medium">
                    {isAr ? "تفاصيل التعاقد" : "View Terms"} &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Sticky Subnavigation ─────────────────────────────────── */}
      <nav aria-label="Section Navigation" className="sticky top-20 z-40 bg-[#0a0b0e]/95 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar py-3 text-xs sm:text-sm font-medium">
            <div className="flex items-center gap-1 sm:gap-2">
              {[
                { id: "what-an-account-covers", label: isAr ? "نطاق الحساب" : "Account Scope" },
                { id: "procurement", label: isAr ? "المشتريات والتعاقد" : "Procurement" },
                { id: "billing", label: isAr ? "الفواتير والتقارير" : "Billing & Reports" },
                { id: "governance", label: isAr ? "فريق الحساب" : "Governance" },
                { id: "booking", label: isAr ? "حجوزات المسؤولين" : "Executive Booking" },
                { id: "organisations", label: isAr ? "القطاعات" : "Sectors" },
                { id: "open-account", label: isAr ? "طلب فتح حساب" : "Open Account" },
                { id: "faqs", label: isAr ? "الأسئلة الشائعة" : "FAQs" },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
                    activeNav === item.id
                      ? "text-abBlue bg-abBlue/10 font-semibold"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <a
              href="#open-account"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-abBlue text-white hover:bg-[#1a93c4] whitespace-nowrap"
            >
              <span>{isAr ? "طلب عرض" : "Request Proposal"}</span>
            </a>
          </div>
        </div>
        {/* Progress indicator bar */}
        <div className="h-[2px] bg-gray-800 w-full">
          <div
            className="h-full bg-abBlue transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </nav>

      {/* ─── SECTION 1: What an account covers ───────────────────── */}
      <section id="what-an-account-covers" className="py-20 md:py-28 border-b border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-abBlue block mb-2">
              {isAr ? "تغطية شاملة" : "Comprehensive Scope"}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              {content.scope.h2}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-400 leading-relaxed font-light">
              {content.scope.subhead}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.scope.items.map((item, index) => (
              <div
                key={item.id}
                onMouseEnter={() => setActiveScopeIndex(index)}
                className={`group relative rounded-2xl bg-[#111216] border ${
                  activeScopeIndex === index ? "border-abBlue/60 shadow-xl shadow-abBlue/5" : "border-gray-800/90"
                } p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-abBlue/60`}
              >
                <div>
                  <div className="relative h-44 w-full rounded-xl overflow-hidden mb-6 bg-gray-900">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111216] via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#070709]/80 backdrop-blur-md text-abBlue border border-abBlue/30">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-abBlue transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm text-gray-400 leading-relaxed font-light">
                    {item.description}
                  </p>

                  <ul className="mt-5 space-y-2 pt-5 border-t border-gray-800/80">
                    {item.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-center gap-2.5 text-xs text-gray-300">
                        <svg className="w-3.5 h-3.5 text-abBlue shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-800/60">
                  <Link
                    href={`${base}${item.href}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-abBlue hover:text-white transition-colors"
                  >
                    <span>{isAr ? "استكشف الخدمة بالتفصيل" : "View Service Specifications"}</span>
                    <span className={isAr ? "rotate-180" : ""}>&rarr;</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: How procurement works with AB ────────────── */}
      <section id="procurement" className="py-20 md:py-28 bg-[#090a0d] border-b border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-abBlue block mb-2">
              {isAr ? "إجراءات التعاقد" : "Commercial Governance"}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              {content.procurement.h2}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-400 leading-relaxed font-light">
              {content.procurement.subhead}
            </p>
          </div>

          {/* Interactive Pillars Grid */}
          <div className="grid lg:grid-cols-4 gap-6">
            {content.procurement.pillars.map((pillar, idx) => (
              <div
                key={pillar.id}
                onClick={() => setActiveProcurementTab(idx)}
                className={`cursor-pointer rounded-2xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between ${
                  activeProcurementTab === idx
                    ? "bg-[#14151b] border-abBlue shadow-xl shadow-abBlue/5"
                    : "bg-[#0d0e12] border-gray-800 hover:border-gray-700"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-abBlue px-2.5 py-1 rounded bg-abBlue/10 border border-abBlue/20">
                      {pillar.tag}
                    </span>
                    <span className="text-xs font-mono text-gray-400">0{idx + 1}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3">
                    {pillar.h3}
                  </h3>

                  <p className="text-sm text-gray-400 leading-relaxed font-light mb-6">
                    {pillar.text}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-800/80 space-y-2">
                  {pillar.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2 text-xs text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-abBlue mt-1.5 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Procurement Checklist Banner */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-[#12141a] via-[#101116] to-[#12141a] border border-gray-800 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-abBlue/15 border border-abBlue/30 flex items-center justify-center text-abBlue shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h4 className="text-base font-bold text-white">
                  {isAr ? "هل تحتاج ملف المورد المعتمد لاعتماد AB في نظام شركتكم؟" : "Need our complete supplier registration pack for your vendor portal?"}
                </h4>
                <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                  {isAr
                    ? "يتضمن السجل التجاري، الشهادة الضريبية، تراخيص هيئة النقل، وخطاب البنك المعتمد."
                    : "Includes Commercial Registration, VAT certificates, TGA transport permits, and official bank letters."}
                </p>
              </div>
            </div>

            <a
              href="#open-account"
              className="px-6 py-3 rounded-lg text-xs sm:text-sm font-semibold text-white bg-abBlue hover:bg-[#1a93c4] whitespace-nowrap transition-colors"
            >
              {isAr ? "طلب ملف المورد المعتمد" : "Request Supplier Pack"}
            </a>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: Billing and reporting ─────────────────────── */}
      <section id="billing" className="py-20 md:py-28 border-b border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Features Description */}
            <div className="lg:col-span-6">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-abBlue block mb-2">
                {isAr ? "الحوكمة المالية" : "Financial Transparency"}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                {content.billing.h2}
              </h2>
              <p className="text-base sm:text-lg text-gray-400 leading-relaxed font-light mb-8">
                {content.billing.subhead}
              </p>

              <div className="space-y-6">
                {content.billing.features.map((feat, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-[#0f1014] border border-gray-800/80 hover:border-gray-700 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-base font-semibold text-white">{feat.title}</h4>
                      <span className="text-[11px] font-semibold text-abBlue bg-abBlue/10 px-2 py-0.5 rounded border border-abBlue/20">
                        {feat.tag}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 font-light">{feat.description}</p>
                    <p className="mt-2 text-xs text-gray-400 border-t border-gray-800/60 pt-2 font-mono">
                      {feat.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Invoice Simulation Preview */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl bg-[#0e0f14] border border-gray-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-abBlue/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between pb-6 border-b border-gray-800">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-abBlue block mb-1">
                      {isAr ? "كشف حساب افتراضي" : "Sample Consolidated Statement"}
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      {content.billing.invoiceSample.entity}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {content.billing.invoiceSample.period}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2.5 py-1 rounded text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {isAr ? "مدقق ضريبياً" : "ZATCA Ready"}
                    </span>
                  </div>
                </div>

                {/* Table representation */}
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-gray-800 text-gray-400 uppercase tracking-wider text-[11px]">
                        <th className="pb-3 text-left font-medium">{isAr ? "رمز مركز التكلفة" : "Cost Centre"}</th>
                        <th className="pb-3 text-left font-medium">{isAr ? "القسم / النشاط" : "Department"}</th>
                        <th className="pb-3 text-center font-medium">{isAr ? "عدد الرحلات" : "Trips"}</th>
                        <th className="pb-3 text-right font-medium">{isAr ? "المجموع" : "Total"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/60">
                      {content.billing.invoiceSample.costCentres.map((cc, i) => (
                        <tr key={i} className="hover:bg-gray-800/20">
                          <td className="py-3.5 font-mono text-abBlue font-semibold">{cc.code}</td>
                          <td className="py-3.5 text-gray-300 font-medium">{cc.name}</td>
                          <td className="py-3.5 text-center text-gray-400">{cc.trips}</td>
                          <td className="py-3.5 text-right font-mono text-white font-bold">{cc.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 pt-5 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>{isAr ? "شروط الدفع: 30 يوماً من تاريخ الفاتورة" : "Payment Terms: Net 30 from Statement Date"}</span>
                  </div>
                  <span className="font-mono text-gray-400">
                    {isAr ? "متوافق مع SAP, Oracle, Concur" : "CSV · XLSX · PDF Export"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: Dedicated Governance — Who you deal with ─── */}
      <section id="governance" className="py-20 md:py-28 bg-[#090a0d] border-b border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-abBlue block mb-2">
              {isAr ? "فريق الحساب المخصص" : "Dedicated Support Structure"}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              {content.governance.h2}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-400 leading-relaxed font-light">
              {content.governance.subhead}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {content.governance.team.map((t, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-[#111216] border border-gray-800 p-7 flex flex-col justify-between hover:border-abBlue/50 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-abBlue bg-abBlue/10 px-2.5 py-1 rounded border border-abBlue/20">
                      {t.tag}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-gray-800/60 flex items-center justify-center text-xs font-bold text-gray-400">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1">{t.title}</h3>
                  <div className="text-xs font-semibold text-abBlue mb-4">{t.role}</div>

                  <p className="text-sm text-gray-400 leading-relaxed font-light mb-6">
                    {t.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-800/80 space-y-2.5">
                  {t.features.map((f, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2.5 text-xs text-gray-300">
                      <svg className="w-3.5 h-3.5 text-abBlue shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: Booking for your executives ───────────────── */}
      <section id="booking" className="py-20 md:py-28 border-b border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-abBlue block mb-2">
              {isAr ? "تجربة القيادات التنفيذية" : "Executive Mobility Workflow"}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              {content.booking.h2}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-400 leading-relaxed font-light">
              {content.booking.subhead}
            </p>
          </div>

          {/* Booking Channels */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {content.booking.channels.map((ch, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-[#101115] border border-gray-800/80 hover:border-gray-700 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-abBlue/10 border border-abBlue/30 flex items-center justify-center text-abBlue mb-4 font-bold">
                  {idx + 1}
                </div>
                <h4 className="text-base font-bold text-white mb-2">{ch.title}</h4>
                <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">{ch.desc}</p>
              </div>
            ))}
          </div>

          {/* Two-Column Deep Dive: 60-min Notice + Preferences */}
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Dispatch Notice Card */}
            <div className="lg:col-span-6 rounded-2xl bg-[#0f1015] border border-gray-800 p-7">
              <div className="inline-block px-2.5 py-1 rounded text-[11px] font-semibold text-abBlue bg-abBlue/10 border border-abBlue/20 mb-3">
                {content.booking.dispatchNotice.badge}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {content.booking.dispatchNotice.title}
              </h3>
              <p className="text-sm text-gray-400 font-light mb-6">
                {content.booking.dispatchNotice.description}
              </p>

              <div className="space-y-3">
                {content.booking.dispatchNotice.items.map((it, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-lg bg-[#08090c] border border-gray-800/80 text-xs sm:text-sm text-gray-300">
                    <svg className="w-4 h-4 text-abBlue shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{it}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Saved Preferences Card */}
            <div className="lg:col-span-6 rounded-2xl bg-[#0f1015] border border-gray-800 p-7">
              <div className="inline-block px-2.5 py-1 rounded text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 mb-3">
                {isAr ? "الملفات الشخصية المحفوظة" : "Retained Profiles"}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {content.booking.preferences.title}
              </h3>
              <p className="text-sm text-gray-400 font-light mb-6">
                {isAr
                  ? "تحفظ تفضيلات كل مسافر تنفيذي تلقائياً لضمان تجربة مريحة ومتطابقة في كل رحلة."
                  : "Traveller preferences are permanently stored so every journey aligns with individual executive standards."}
              </p>

              <div className="space-y-3">
                {content.booking.preferences.items.map((pref, idx) => (
                  <div key={idx} className="p-3.5 rounded-lg bg-[#08090c] border border-gray-800/80 flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-semibold text-white">{pref.name}</span>
                    <span className="text-gray-400 font-light">{pref.options}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: Organisations we support ─────────────────── */}
      <section id="organisations" className="py-20 md:py-28 bg-[#090a0d] border-b border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-abBlue block mb-2">
              {isAr ? "القطاعات المعتمدة" : "Industry Leadership"}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              {content.sectors.h2}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-400 leading-relaxed font-light">
              {content.sectors.subhead}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.sectors.items.map((sec, idx) => (
              <div key={idx} className="p-7 rounded-2xl bg-[#111216] border border-gray-800 flex flex-col justify-between hover:border-abBlue/40 transition-colors">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-abBlue/10 border border-abBlue/20 flex items-center justify-center text-abBlue font-bold text-sm mb-4">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{sec.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light mb-4">
                    {sec.role}
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-800/80 text-xs text-abBlue font-medium">
                  {sec.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 7: Open an account (Interactive Proposal & RFP Form) ─ */}
      <section id="open-account" className="py-20 md:py-28 border-b border-gray-800/80 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-abBlue block mb-2">
              {isAr ? "بدء التعاقد" : "Commercial Inquiry"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {content.form.h2}
            </h2>
            <p className="mt-3 text-base text-gray-400 leading-relaxed font-light">
              {content.form.subhead}
            </p>
          </div>

          {/* Form Container */}
          <div className="rounded-3xl bg-[#0e0f14] border border-gray-800 p-6 sm:p-10 shadow-2xl relative">
            {isSubmitted ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {content.form.successTitle}
                </h3>
                <p className="text-gray-300 text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-8 font-light">
                  {content.form.successMessage}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setCompany("");
                    setContactName("");
                    setEmail("");
                    setPhone("");
                    setNotes("");
                    setUploadedFiles([]);
                  }}
                  className="px-6 py-2.5 rounded-lg text-xs font-semibold text-abBlue bg-abBlue/10 border border-abBlue/30 hover:bg-abBlue hover:text-white transition-colors"
                >
                  {isAr ? "إرسال طلب آخر" : "Submit Another Inquiry"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-8">
                {formError && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm">
                    {formError}
                  </div>
                )}

                {/* 1. Basic Company & Contact Info */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-abBlue mb-4">
                    {isAr ? "1. معلومات الشركة والمسؤول" : "1. Organization & Contact Details"}
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        {content.form.companyLabel} <span className="text-abBlue">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder={isAr ? "مثال: أرامكو، سابك، ماكنزي..." : "e.g. Acme Corporation"}
                        className="w-full px-4 py-3 rounded-lg bg-[#07080b] border border-gray-800 text-sm text-white placeholder-gray-600 focus:border-abBlue focus:outline-none focus:ring-1 focus:ring-abBlue transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        {content.form.nameLabel} <span className="text-abBlue">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder={isAr ? "الاسم الكامل" : "Your full name"}
                        className="w-full px-4 py-3 rounded-lg bg-[#07080b] border border-gray-800 text-sm text-white placeholder-gray-600 focus:border-abBlue focus:outline-none focus:ring-1 focus:ring-abBlue transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        {content.form.roleLabel}
                      </label>
                      <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder={isAr ? "مدير المشتريات، مسؤول السفر، المساعد التنفيذي..." : "Procurement Manager, Travel Director..."}
                        className="w-full px-4 py-3 rounded-lg bg-[#07080b] border border-gray-800 text-sm text-white placeholder-gray-600 focus:border-abBlue focus:outline-none focus:ring-1 focus:ring-abBlue transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        {content.form.emailLabel} <span className="text-abBlue">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full px-4 py-3 rounded-lg bg-[#07080b] border border-gray-800 text-sm text-white placeholder-gray-600 focus:border-abBlue focus:outline-none focus:ring-1 focus:ring-abBlue transition-colors"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        {content.form.phoneLabel} <span className="text-abBlue">*</span>
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={phoneCountryCode}
                          onChange={(e) => setPhoneCountryCode(e.target.value)}
                          className="px-3 py-3 rounded-lg bg-[#07080b] border border-gray-800 text-sm text-white focus:border-abBlue focus:outline-none"
                        >
                          <option value="+966">🇸🇦 +966 (KSA)</option>
                          <option value="+971">🇦🇪 +971 (UAE)</option>
                          <option value="+974">🇶🇦 +974 (Qatar)</option>
                          <option value="+973">🇧🇭 +973 (Bahrain)</option>
                          <option value="+965">🇰🇼 +965 (Kuwait)</option>
                          <option value="+968">🇴🇲 +968 (Oman)</option>
                          <option value="+44">🇬🇧 +44 (UK)</option>
                          <option value="+1">🇺🇸 +1 (US)</option>
                        </select>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="50 123 4567"
                          className="flex-1 px-4 py-3 rounded-lg bg-[#07080b] border border-gray-800 text-sm text-white placeholder-gray-600 focus:border-abBlue focus:outline-none focus:ring-1 focus:ring-abBlue transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Operational Footprint & Scope */}
                <div className="pt-6 border-t border-gray-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-abBlue mb-4">
                    {isAr ? "2. نطاق العمليات والخدمات المطلوبة" : "2. Countries & Service Requirements"}
                  </h4>

                  {/* Countries Multi-Select */}
                  <div className="mb-5">
                    <label className="block text-xs font-semibold text-gray-300 mb-2">
                      {content.form.countriesLabel}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {content.form.countries.map((c) => {
                        const isSelected = selectedCountries.includes(c);
                        return (
                          <button
                            key={c}
                            type="button"
                            onClick={() => toggleCountry(c)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              isSelected
                                ? "bg-abBlue text-white shadow-md shadow-abBlue/20"
                                : "bg-[#07080b] border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700"
                            }`}
                          >
                            {isSelected && <span className="inline-block mr-1">✓</span>}
                            {c}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Services Multi-Select */}
                  <div className="mb-5">
                    <label className="block text-xs font-semibold text-gray-300 mb-2">
                      {content.form.servicesLabel}
                    </label>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {content.form.services.map((s) => {
                        const isSelected = selectedServices.includes(s);
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => toggleService(s)}
                            className={`px-3.5 py-2.5 rounded-lg text-xs font-medium text-left transition-all flex items-center justify-between ${
                              isSelected
                                ? "bg-abBlue/15 border border-abBlue text-abBlue"
                                : "bg-[#07080b] border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700"
                            }`}
                          >
                            <span>{s}</span>
                            <span className="text-xs">{isSelected ? "✓" : "+"}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Monthly Volume & Start Date */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        {content.form.volumeLabel}
                      </label>
                      <select
                        value={monthlyVolume}
                        onChange={(e) => setMonthlyVolume(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-[#07080b] border border-gray-800 text-sm text-white focus:border-abBlue focus:outline-none"
                      >
                        {content.form.volumes.map((vol) => (
                          <option key={vol} value={vol}>
                            {vol}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        {content.form.startDateLabel}
                      </label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-[#07080b] border border-gray-800 text-sm text-white focus:border-abBlue focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Formal RFP / Tender Details */}
                <div className="pt-6 border-t border-gray-800">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-[#090a0e] border border-gray-800 mb-4">
                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        {content.form.rfpQuestionLabel}
                      </h4>
                      <p className="text-xs text-gray-400 font-light mt-0.5">
                        {isAr ? "إذا كان لديكم موعد نهائي محدد لتقديم العطاء ومستندات كراسة الشروط" : "Toggle on if you have an official tender deadline & specifications"}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsRfp(!isRfp)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        isRfp ? "bg-abBlue" : "bg-gray-800"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          isRfp ? (isAr ? "-translate-x-6" : "translate-x-6") : (isAr ? "-translate-x-1" : "translate-x-1")
                        }`}
                      />
                    </button>
                  </div>

                  {isRfp && (
                    <div className="mb-4">
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        {content.form.rfpDeadlineLabel}
                      </label>
                      <input
                        type="date"
                        value={rfpDeadline}
                        onChange={(e) => setRfpDeadline(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-[#07080b] border border-gray-800 text-sm text-white focus:border-abBlue focus:outline-none"
                      />
                    </div>
                  )}

                  {/* Document Upload Area */}
                  <div className="mt-4">
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      {content.form.uploadLabel}
                    </label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="cursor-pointer border-2 border-dashed border-gray-800 hover:border-abBlue/60 rounded-xl p-6 text-center bg-[#07080b] transition-colors"
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                      <svg className="w-8 h-8 text-abBlue mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-xs text-gray-400 font-light">
                        {content.form.uploadHint}
                      </p>
                    </div>

                    {uploadedFiles.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {uploadedFiles.map((file, fIdx) => (
                          <div key={fIdx} className="flex items-center justify-between px-3 py-2 rounded bg-gray-800/40 text-xs text-gray-300">
                            <span className="font-mono truncate">{file.name}</span>
                            <span className="text-gray-400">{file.size}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Additional Notes */}
                  <div className="mt-4">
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      {content.form.notesLabel}
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={isAr ? "أي متطلبات إضافية، مواقع محددة، أو استفسارات..." : "Describe any specific routes, flight volumes, or governance requirements..."}
                      className="w-full px-4 py-3 rounded-lg bg-[#07080b] border border-gray-800 text-sm text-white placeholder-gray-600 focus:border-abBlue focus:outline-none focus:ring-1 focus:ring-abBlue transition-colors"
                    />
                  </div>
                </div>

                {/* Consent & Submit */}
                <div className="pt-4 border-t border-gray-800">
                  <label className="flex items-start gap-3 cursor-pointer text-xs text-gray-400 mb-6">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 rounded border-gray-700 bg-gray-900 text-abBlue focus:ring-abBlue"
                    />
                    <span className="leading-relaxed font-light">{content.form.consentText}</span>
                  </label>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl text-sm font-bold text-white bg-abBlue hover:bg-[#1a93c4] shadow-xl shadow-abBlue/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {isSubmitting ? content.form.submittingButton : content.form.submitButton}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ─── SECTION 8: Scope & Internal Links ───────────────────── */}
      <section className="py-20 md:py-28 bg-[#090a0d] border-b border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-abBlue block mb-2">
              {isAr ? "الأسطول والخدمات" : "Operational Architecture"}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              {content.internalLinks.h2}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-400 leading-relaxed font-light">
              {content.internalLinks.subhead}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.internalLinks.links.map((link, idx) => (
              <Link
                key={idx}
                href={`${base}${link.href}`}
                className="group p-6 rounded-2xl bg-[#101116] border border-gray-800 hover:border-abBlue/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-semibold text-abBlue bg-abBlue/10 px-2 py-0.5 rounded border border-abBlue/20 inline-block mb-3">
                    {link.tag}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-abBlue transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light mt-2">
                    {link.scope}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-800/60 flex items-center justify-between text-xs font-semibold text-gray-400 group-hover:text-abBlue transition-colors">
                  <span>{isAr ? "عرض التفاصيل" : "Explore Service"}</span>
                  <span className={`transform transition-transform group-hover:translate-x-1 ${isAr ? "rotate-180" : ""}`}>
                    &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 9: Frequently Asked Questions (FAQs) ─────────── */}
      <section id="faqs" className="py-20 md:py-28 border-b border-gray-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-abBlue block mb-2">
              {isAr ? "الأسئلة الشائعة" : "Procurement FAQ"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {content.faqs.h2}
            </h2>
            <p className="mt-3 text-base text-gray-400 leading-relaxed font-light">
              {content.faqs.subhead}
            </p>
          </div>

          <div className="space-y-4">
            {content.faqs.items.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen ? "bg-[#111218] border-abBlue/50" : "bg-[#0d0e12] border-gray-800/80"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 text-white font-semibold text-base sm:text-lg focus:outline-none"
                  >
                    <span className="flex-1">{faq.q}</span>
                    <span
                      className={`w-8 h-8 rounded-full bg-gray-800/60 flex items-center justify-center text-sm text-abBlue shrink-0 transform transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      ↓
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-sm text-gray-300 font-light leading-relaxed border-t border-gray-800/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Capability Statement Modal ───────────────────────────── */}
      {isCapabilityOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0e0f14] border border-gray-700 p-6 sm:p-10 shadow-2xl">
            <button
              type="button"
              onClick={() => setIsCapabilityOpen(false)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white flex items-center justify-center text-sm transition-colors"
            >
              ✕
            </button>

            <div className="inline-block px-3 py-1 rounded text-xs font-semibold text-abBlue bg-abBlue/10 border border-abBlue/20 mb-3">
              AB Executive Capabilities · 2026/2027
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {content.capabilityModal.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 font-mono mb-6">
              {content.capabilityModal.subtitle}
            </p>

            <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800 text-xs sm:text-sm text-gray-300 leading-relaxed font-light mb-6">
              {content.capabilityModal.overview}
            </div>

            <div className="space-y-4 mb-8">
              {content.capabilityModal.sections.map((sec, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#090a0e] border border-gray-800/80">
                  <h4 className="text-sm font-bold text-white mb-1.5">{sec.heading}</h4>
                  <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                    {sec.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-gray-800">
              <button
                type="button"
                onClick={() => setIsCapabilityOpen(false)}
                className="px-5 py-2.5 rounded-lg text-xs font-semibold text-gray-400 hover:text-white transition-colors"
              >
                {content.capabilityModal.closeBtn}
              </button>
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="px-6 py-2.5 rounded-lg text-xs font-semibold text-white bg-abBlue hover:bg-[#1a93c4] shadow-md shadow-abBlue/20 transition-all flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>{content.capabilityModal.downloadBtn}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
