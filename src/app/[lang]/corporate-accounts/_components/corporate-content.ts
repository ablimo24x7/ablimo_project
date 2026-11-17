export interface ScopeItem {
  id: string;
  title: string;
  description: string;
  badge: string;
  href: string;
  iconName: string;
  image: string;
  highlights: string[];
}

export interface ProcurementPillar {
  id: string;
  h3: string;
  tag: string;
  text: string;
  points: string[];
}

export interface BillingFeature {
  title: string;
  description: string;
  tag: string;
  detail: string;
}

export interface SectorItem {
  name: string;
  role: string;
  description: string;
  icon: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface CorporateContent {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  hero: {
    badge: string;
    h1: string;
    lead: string;
    primaryCta: string;
    secondaryCta: string;
    quickStats: { label: string; value: string; sub: string }[];
  };
  scope: {
    h2: string;
    subhead: string;
    items: ScopeItem[];
  };
  procurement: {
    h2: string;
    subhead: string;
    pillars: ProcurementPillar[];
  };
  billing: {
    h2: string;
    subhead: string;
    features: BillingFeature[];
    invoiceSample: {
      entity: string;
      period: string;
      costCentres: { code: string; name: string; trips: number; total: string }[];
    };
  };
  governance: {
    h2: string;
    subhead: string;
    team: {
      title: string;
      tag: string;
      role: string;
      description: string;
      features: string[];
    }[];
  };
  booking: {
    h2: string;
    subhead: string;
    channels: { title: string; desc: string; icon: string }[];
    dispatchNotice: {
      title: string;
      badge: string;
      description: string;
      items: string[];
    };
    preferences: {
      title: string;
      items: { name: string; options: string }[];
    };
  };
  sectors: {
    h2: string;
    subhead: string;
    items: SectorItem[];
  };
  form: {
    h2: string;
    subhead: string;
    companyLabel: string;
    nameLabel: string;
    roleLabel: string;
    emailLabel: string;
    phoneLabel: string;
    countriesLabel: string;
    servicesLabel: string;
    volumeLabel: string;
    startDateLabel: string;
    rfpQuestionLabel: string;
    rfpDeadlineLabel: string;
    uploadLabel: string;
    uploadHint: string;
    notesLabel: string;
    consentText: string;
    submitButton: string;
    submittingButton: string;
    successTitle: string;
    successMessage: string;
    countries: string[];
    services: string[];
    volumes: string[];
  };
  internalLinks: {
    h2: string;
    subhead: string;
    links: { title: string; href: string; scope: string; tag: string }[];
  };
  faqs: {
    h2: string;
    subhead: string;
    items: FaqItem[];
  };
  capabilityModal: {
    title: string;
    subtitle: string;
    downloadBtn: string;
    closeBtn: string;
    overview: string;
    sections: { heading: string; text: string }[];
  };
}

export const corporateContentEn: CorporateContent = {
  meta: {
    title: "Corporate Transportation Accounts & Contracts | AB",
    description:
      "Open a corporate transportation account with AB: monthly invoicing, cost-centre reporting, a named account manager and 24/7 dispatch in KSA, UAE and Qatar.",
    keywords:
      "corporate chauffeur account Saudi Arabia, corporate transportation contract Riyadh, corporate mobility GCC, corporate billing, enterprise ground transportation, executive chauffeur account, RFP ground transportation KSA UAE Qatar, TGA licensed corporate chauffeur",
  },
  hero: {
    badge: "Commercial Relationship & Master Framework Agreements",
    h1: "One transportation partner, one contract, one invoice.",
    lead: "A corporate account with AB brings every journey your organisation books under one agreement. That covers executive chauffeurs, airport pickups for visitors, roadshows, dedicated drivers and staff buses. Bookings run through one dispatch team, billing through one monthly invoice, and you have one named account manager to call.",
    primaryCta: "Request a corporate proposal",
    secondaryCta: "Download capability statement (PDF)",
    quickStats: [
      { value: "3 Markets", label: "GCC Operating Licences", sub: "Saudi Arabia · UAE · Qatar" },
      { value: "24/7", label: "Central Dispatch Control", sub: "Live Riyadh Operations Desk" },
      { value: "Net 30", label: "Commercial Credit Terms", sub: "Consolidated Monthly Invoicing" },
      { value: "< 15m", label: "Priority Response SLA", sub: "Enforceable Contract Terms" },
    ],
  },
  scope: {
    h2: "What an account covers",
    subhead:
      "Unified commercial governance covering every ground mobility need across your enterprise. No separate vendors, no fragmented billing.",
    items: [
      {
        id: "on-demand",
        title: "On-demand chauffeur bookings",
        badge: "Point-to-Point & As-Directed",
        description:
          "For executives, board directors, and corporate guests. Bookable by the single transfer or by the hour with guaranteed vehicle class and strictly vetted bilingual chauffeurs.",
        href: "/services/chauffeur-vip",
        iconName: "car",
        image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
        highlights: ["Mercedes S-Class & late-model VIP sedans", "As-directed hourly bookings", "Real-time dispatch tracking"],
      },
      {
        id: "visitor-airport",
        title: "Visitor and airport programmes",
        badge: "VIP Meet & Assist",
        description:
          "High-touch arrival and departure management for visiting auditors, international consultants, board members, and senior leadership across all major regional airports.",
        href: "/services/airport-transfers",
        iconName: "plane",
        image: "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=800&q=80",
        highlights: ["Flight tracking with zero delay penalties", "Terminal protocol meet & greet with flight tracking", "Seamless luggage handling"],
      },
      {
        id: "dedicated-vehicles",
        title: "Dedicated vehicles and chauffeurs",
        badge: "Executive Retainers",
        description:
          "Exclusively assigned luxury vehicles and uniformed chauffeurs allocated full-time to a C-suite executive, regional CEO, or business division on rolling monthly retainers.",
        href: "/services/corporate-transportation",
        iconName: "shield",
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
        highlights: ["Dedicated late-model black vehicles", "Driver vetting & security clearance", "Zero fleet maintenance overhead"],
      },
      {
        id: "roadshows",
        title: "Roadshows and multi-city itineraries",
        badge: "Multi-City Gulf Travel",
        description:
          "Tight multi-stop itineraries across Riyadh, Jeddah, Khobar, Dubai, Abu Dhabi, and Doha. Single dispatch protocol ensuring synchronized timing between meetings.",
        href: "/services/corporate-transportation",
        iconName: "map",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
        highlights: ["Cross-border coordination via 1 desk", "Multi-stop precision schedule management", "Standby chauffeur continuity"],
      },
      {
        id: "staff-transport",
        title: "Staff and shift transport",
        badge: "Workforce Mobility",
        description:
          "Scheduled corporate shuttle and workforce mobility solutions using executive vans, luxury minibuses, or full-size 50-seater VIP coaches for departmental teams and headquarters shifts.",
        href: "/services/workforce-transportation",
        iconName: "bus",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
        highlights: ["Mercedes V-Class & Sprinter minibuses", "Fixed route optimization & GPS logging", "Flexible shift adjustments"],
      },
      {
        id: "event-transport",
        title: "Event and offsite transport",
        badge: "Delegations & Summits",
        description:
          "Turnkey logistics when your organisation hosts annual general meetings, investor conferences, ministerial summits, or high-profile corporate retreats.",
        href: "/fleet",
        iconName: "calendar",
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
        highlights: ["On-site transport marshals & coordinators", "High-capacity fleet staging", "VIP protocol compliance"],
      },
    ],
  },
  procurement: {
    h2: "How procurement works with AB",
    subhead:
      "Engineered to satisfy stringent vendor onboarding, compliance audits, and governance frameworks for GCC enterprises.",
    pillars: [
      {
        id: "supplier-registration",
        h3: "Supplier registration",
        tag: "Compliance & Vendor Pack",
        text: "We provide an enterprise-ready supplier pack for immediate vendor registration: Commercial Registration (CR), VAT certificates, local transport operating licences (TGA in Saudi Arabia, RTA in Dubai, ITC in Abu Dhabi, MOT in Qatar), comprehensive commercial fleet insurance policies, and certified bank confirmation letters for each contracting entity.",
        points: [
          "Saudi TGA & GCC Transport Licences verified",
          "Full passenger & third-party comprehensive liability",
          "ZATCA (KSA) and FTA (UAE) VAT certified",
          "Direct banking confirmation letters",
        ],
      },
      {
        id: "pricing-models",
        h3: "Pricing models",
        tag: "Commercial Transparency",
        text: "Select the pricing structure that best fits your financial planning: a fixed Rate Card (predetermined fixed rates per vehicle class and service tier with zero surge pricing), a Programme Quote for defined corporate initiatives or summits, or a Dedicated-Vehicle Monthly Retainer. All rates are locked into the master agreement and cannot change mid-term without written mutual consent.",
        points: [
          "Locked rate cards with zero demand surge pricing",
          "Project programme quotes for defined milestones",
          "Predictable dedicated monthly retainers",
          "Contractual price-stability commitment",
        ],
      },
      {
        id: "contract-terms",
        h3: "Contract terms",
        tag: "SLA Guarantees",
        text: "We offer master framework agreements tailored from 6 to 36 months. Critical service standards are contractually codified: emergency booking response times under 15 minutes, strict vehicle age limitations (vehicles under 24 to 36 months old), and immediate replacement vehicle dispatch in the event of unscheduled maintenance.",
        points: [
          "6 to 36-month flexible framework terms",
          "< 15-minute dispatch confirmation SLA",
          "Late-model luxury black vehicles (< 3 yrs old)",
          "Immediate replacement vehicle guarantee",
        ],
      },
      {
        id: "responding-to-rfp",
        h3: "Responding to your RFP",
        tag: "Tenders & Bids",
        text: "Submit your tender or RFP documentation directly through our commercial portal. Our enterprise bidding team confirms receipt within 2 hours, performs site assessments and vehicle inspections where required, and submits exhaustive bilingual technical and commercial proposals before your submission deadline.",
        points: [
          "2-hour RFP acknowledgement protocol",
          "Bilingual technical & commercial submissions (EN/AR)",
          "On-site fleet audit and vehicle presentations",
          "Full adherence to client tender specifications",
        ],
      },
    ],
  },
  billing: {
    h2: "Billing and reporting",
    subhead:
      "Granular cost accounting and audit-ready reporting built for finance directors, travel managers, and procurement controllers.",
    features: [
      {
        title: "Consolidated monthly invoice",
        description: "One single roll-up invoice per month, or separated cleanly by legal entity, country, or department.",
        tag: "Multi-Entity Billing",
        detail: "Customized to your accounting hierarchy: split across KSA, UAE, or Qatar operating entities with appropriate local VAT.",
      },
      {
        title: "Trip-level audit detail",
        description: "Complete line-item visibility on every transfer across your organisation.",
        tag: "Granular Breakdown",
        detail: "Includes passenger name, authorized booker, exact origin and destination waypoints, GPS timestamps, vehicle tier, and cost centre.",
      },
      {
        title: "Executive monthly usage report",
        description: "Departmental analytics delivered with every monthly billing cycle.",
        tag: "Spend & SLA Analytics",
        detail: "Tracks monthly expenditure trends, on-time arrival performance (> 99.4%), flight delay adjustments, and route exceptions.",
      },
      {
        title: "ERP & finance integration",
        description: "Ready-to-import digital statements formatted for modern enterprise finance stacks.",
        tag: "Audit Ready",
        detail: "Compliant with Saudi ZATCA Phase 2 e-invoicing and UAE FTA guidelines, with structured CSV and Excel rollups for SAP, Oracle, or Concur.",
      },
    ],
    invoiceSample: {
      entity: "AB Executive Transportation Services Ltd.",
      period: "October Billing Cycle — Consolidated Enterprise Statement",
      costCentres: [
        { code: "CC-104", name: "Executive Leadership & Board", trips: 48, total: "SAR 28,400" },
        { code: "CC-208", name: "Regional Management Consulting", trips: 112, total: "SAR 44,800" },
        { code: "CC-315", name: "Visiting Auditors & Airport Meet", trips: 64, total: "SAR 22,400" },
        { code: "CC-420", name: "Corporate HQ Dedicated Shuttle", trips: 40, total: "SAR 36,000" },
      ],
    },
  },
  governance: {
    h2: "Who you deal with",
    subhead:
      "Enterprise accounts demand human accountability. We assign senior personnel directly to your commercial relationship.",
    team: [
      {
        title: "Named Account Director",
        tag: "Commercial Leadership",
        role: "Strategic Point of Contact",
        description:
          "Your dedicated commercial director manages contract amendments, rate card reviews, vendor compliance updates, and quarterly business reviews (QBRs).",
        features: [
          "Direct mobile and email line",
          "Quarterly performance and spend audits",
          "Custom vehicle sourcing and rate alignment",
        ],
      },
      {
        title: "24/7 Riyadh Central Dispatch",
        tag: "Live Operations Desk",
        role: "Real-Time Trip Management",
        description:
          "Our central control room operates 24 hours a day, 365 days a year, supervising flight schedules, tracking active GPS telemetry, and managing urgent changes.",
        features: [
          "Instant ride alterations and dispatching",
          "Automated flight delay monitoring",
          "Direct coordination across KSA, UAE, and Qatar",
        ],
      },
      {
        title: "Dedicated Booking Desk / Coordinator",
        tag: "High-Volume Accounts",
        role: "Enterprise On-Site Support",
        description:
          "For enterprise clients and large headquarters, AB can provide a dedicated in-house booking desk or an on-site mobility coordinator to marshal VIP arrivals.",
        features: [
          "On-site dispatch marshals for high-profile events",
          "Dedicated corporate booking phone and WhatsApp desk",
          "Priority allocation during peak regional summits",
        ],
      },
    ],
  },
  booking: {
    h2: "Booking for your executives",
    subhead:
      "Effortless coordination designed for Executive Assistants, travel arrangers, and departmental admins.",
    channels: [
      {
        title: "Executive Booking Portal",
        desc: "Secure self-service dashboard to schedule, review, and track rides with instant email confirmations.",
        icon: "monitor",
      },
      {
        title: "Dedicated WhatsApp Line",
        desc: "24/7 instant messaging channel for rapid EA requests, last-minute changes, and flight updates.",
        icon: "message-circle",
      },
      {
        title: "Direct Priority Phone",
        desc: "Direct line to our senior dispatch team with zero automated menus or hold times.",
        icon: "phone",
      },
      {
        title: "Concierge Email Desk",
        desc: "Send passenger flight itineraries or multi-city agendas; our desk handles end-to-end scheduling.",
        icon: "mail",
      },
    ],
    dispatchNotice: {
      title: "Chauffeur & Vehicle Credentials 60 Minutes Prior",
      badge: "Passenger Security & Peace of Mind",
      description:
        "Sixty minutes before every scheduled pickup, the booking arranger and passenger receive complete verification credentials:",
      items: [
        "Chauffeur's verified full name and official contact number",
        "Vehicle make, model, exterior color, and registered license plate number",
        "Live interactive GPS tracking link showing the chauffeur's inbound progress",
        "TGA / local transport permit verification badge",
      ],
    },
    preferences: {
      title: "Saved Executive Preference Profiles",
      items: [
        { name: "Cabin Temperature", options: "Preset to exact Celsius preference (e.g. 21°C)" },
        { name: "Mineral Water Brand", options: "Stored preferences for premium sparkling or still water" },
        { name: "Chauffeur Language", options: "Bilingual English and Arabic speaking chauffeurs" },
        { name: "Ride Protocol", options: "Silent ride preferred (work/focus mode) or protocol greeting" },
        { name: "Phone Charging", options: "iPhone Lightning, USB-C, or Android high-speed chargers ready" },
      ],
    },
  },
  sectors: {
    h2: "Organisations we support",
    subhead:
      "Trusted by regional headquarters, institutional investors, and sovereign entities across the Gulf.",
    items: [
      {
        name: "Regional Headquarters (RHQ)",
        role: "Multi-country executive mobility for multinational firms establishing their Middle East HQ in Riyadh.",
        description: "Seamless cross-border executive travel with unified invoicing in SAR.",
        icon: "building",
      },
      {
        name: "Financial Institutions & Sovereign Funds",
        role: "Strictly vetted discreet chauffeur service for board members, private equity partners, and auditors.",
        description: "Strict non-disclosure compliance, pristine late-model black sedans, and NDA-trained drivers.",
        icon: "landmark",
      },
      {
        name: "Global Strategy & Management Consultancies",
        role: "High-frequency weekly travel for engagement teams, partner roadshows, and client onsite transfers.",
        description: "Flexible hourly rates, cost-centre code billing, and zero surge pricing during peak hours.",
        icon: "briefcase",
      },
      {
        name: "Energy, Oil & Gas Conglomerates",
        role: "Safe, audited transportation between capital headquarters, regional industrial clusters, and airports.",
        description: "Exacting corporate safety standards, telematics monitoring, and high-capacity VIP MPVs.",
        icon: "flame",
      },
      {
        name: "Government Entities & Diplomatic Missions",
        role: "Protocol-trained motorcade logistics and secure airport transfers for delegations and ministers.",
        description: "Formal diplomatic greeting, multilingual protocol dispatchers, and police-escort familiarity.",
        icon: "award",
      },
    ],
  },
  form: {
    h2: "Open an account",
    subhead:
      "Tell us roughly how your organisation travels today, and we will come back with a tailored proposal and a draft rate card.",
    companyLabel: "Company Name",
    nameLabel: "Your Full Name",
    roleLabel: "Your Role / Job Title",
    emailLabel: "Work Email Address",
    phoneLabel: "Phone Number (with Country Code)",
    countriesLabel: "Countries of Operation",
    servicesLabel: "Services Needed (Select all that apply)",
    volumeLabel: "Estimated Monthly Trips or Vehicles",
    startDateLabel: "Preferred Account Start Date",
    rfpQuestionLabel: "Is this a formal RFP / Tender?",
    rfpDeadlineLabel: "RFP Submission Deadline",
    uploadLabel: "Upload Tender / RFP Documents",
    uploadHint: "Drag & drop RFP specifications, rate card templates, or company documentation (PDF, DOCX, XLSX, ZIP up to 25MB)",
    notesLabel: "Additional Requirements or Scope Notes",
    consentText:
      "I consent to AB processing this commercial inquiry in accordance with the corporate privacy policy and delivering a formal proposal.",
    submitButton: "Request a corporate proposal",
    submittingButton: "Submitting Corporate Inquiry...",
    successTitle: "Proposal Request Received",
    successMessage:
      "Thank you. Our commercial procurement team has received your corporate account enquiry. A dedicated account director will review your requirements and deliver a customized proposal and draft rate card within 4 business hours.",
    countries: ["Saudi Arabia (KSA)", "United Arab Emirates (UAE)", "Qatar", "Bahrain", "Kuwait", "Oman", "Other / Multi-Regional"],
    services: [
      "Executive Chauffeur (On-Demand & Hourly)",
      "Visitor & Airport Programmes",
      "Dedicated Vehicles & Chauffeurs (Monthly)",
      "Roadshows & Multi-City Itineraries",
      "Staff & Shift Workforce Transport",
      "Event & Offsite Transport",
    ],
    volumes: [
      "Under 25 trips / month",
      "25 – 75 trips / month",
      "75 – 200 trips / month",
      "200 – 500 trips / month",
      "500+ trips / month",
      "Dedicated Vehicle Fleet (3+ assigned cars)",
    ],
  },
  internalLinks: {
    h2: "Explore Service Scope & Fleet",
    subhead:
      "A corporate account links directly to our full operational capability across the GCC.",
    links: [
      {
        title: "Corporate Transportation",
        href: "/services/corporate-transportation",
        scope: "View complete operational scope, company fleet tiers, and corporate transport frameworks.",
        tag: "Service Scope",
      },
      {
        title: "Chauffeur & VIP Service",
        href: "/services/chauffeur-vip",
        scope: "Executive sedans and as-directed hourly bookings for leadership teams.",
        tag: "Executive Fleet",
      },
      {
        title: "Airport Transfers & Protocol",
        href: "/services/airport-transfers",
        scope: "Flight-tracked airport pickups and VIP protocol across all GCC hubs.",
        tag: "Airport Mobility",
      },
      {
        title: "Workforce Transportation",
        href: "/services/workforce-transportation",
        scope: "Employee shuttles, high-capacity coaches, and daily business transfer programs.",
        tag: "Staff Transport",
      },
      {
        title: "Late-Model Luxury Fleet",
        href: "/fleet",
        scope: "Explore our Mercedes S-Class, Cadillac Escalade, Mercedes V-Class, and VIP coaches.",
        tag: "Vehicle Catalog",
      },
      {
        title: "About AB & Credentials",
        href: "/about",
        scope: "Our history since 1999, operating licences, governance model, and team standards.",
        tag: "Company Standards",
      },
    ],
  },
  faqs: {
    h2: "Frequently asked questions",
    subhead: "Key commercial and operational answers for procurement and travel managers.",
    items: [
      {
        q: "Is there a minimum spend to open an account?",
        a: "No fixed minimum spend is required to open an account. Our master framework agreements are designed for organisations booking regularly, from boutique consultancies needing a dozen monthly airport transfers to multinational enterprises operating full dedicated fleets.",
      },
      {
        q: "Can we have separate invoices per entity or country?",
        a: "Yes. Invoices can be partitioned by legal entity, operating country (Saudi Arabia, UAE, Qatar), business division, or internal cost centre. Each statement includes full local VAT details compliant with regional tax authorities.",
      },
      {
        q: "What payment terms do you offer?",
        a: "We offer standard 30-day net payment terms from the date of the monthly invoice for approved corporate accounts, payable via local bank transfer in SAR, AED, QAR, or USD. Custom billing cycles are available upon agreement.",
      },
      {
        q: "Can you respond to our tender in Arabic?",
        a: "Yes. Our commercial and procurement teams submit tender documents, technical submissions, rate card schedules, and compliance packs bilingually in both English and Arabic.",
      },
      {
        q: "How quickly can an account go live?",
        a: "Standard corporate accounts go live within 24 to 48 hours following contract execution and billing setup. For large-scale workforce programs or multi-vehicle dedicated fleet deployments, onboarding typically takes 3 to 7 business days.",
      },
      {
        q: "Do you provide insurance certificates for our vendor file?",
        a: "Yes. Along with our Commercial Registration (CR) and VAT certificates, we provide comprehensive commercial third-party and passenger liability insurance certificates, operating licences from the Transport General Authority (TGA), RTA, ITC, and MOT, and an official bank confirmation letter.",
      },
    ],
  },
  capabilityModal: {
    title: "AB Corporate Capability Statement",
    subtitle: "Enterprise Ground Mobility & Chauffeur Services across the GCC",
    downloadBtn: "Download Full Capability Statement (PDF)",
    closeBtn: "Close Document",
    overview:
      "AB is a premier ground transportation operator headquartered in Riyadh with regional offices in Dubai, Abu Dhabi, and Doha. We deliver fully licensed, GPS-monitored, executive chauffeur mobility to multinational corporations, sovereign wealth entities, and government bodies.",
    sections: [
      {
        heading: "1. GCC Operating Licences & Compliance",
        text: "Fully certified by the Transport General Authority (TGA - Kingdom of Saudi Arabia), Roads and Transport Authority (RTA - Dubai), Integrated Transport Centre (ITC - Abu Dhabi), and Ministry of Transport (MOT - Qatar).",
      },
      {
        heading: "2. Fleet Specifications & Standards",
        text: "Strictly late-model black luxury vehicles (Mercedes-Benz S-Class, Cadillac Escalade, Mercedes-Benz V-Class, Hyundai Staria, and 16–50 seat VIP luxury coaches). Maximum vehicle age is strictly maintained under 36 months.",
      },
      {
        heading: "3. Chauffeur Vetting & Protocol",
        text: "Bilingual, defensive-driving certified chauffeurs undergoing comprehensive background checks, biometric security clearances, and discrete VIP protocol training.",
      },
      {
        heading: "4. Billing & Financial Governance",
        text: "Consolidated monthly billing, cost-centre itemization, ZATCA Phase 2 and UAE FTA e-invoicing compliance, and net 30 corporate payment terms.",
      },
      {
        heading: "5. 24/7 Dispatch & Real-Time Telematics",
        text: "Continuous telemetry tracking, automated flight monitoring, and dedicated named account management available around the clock.",
      },
    ],
  },
};

export const corporateContentAr: CorporateContent = {
  meta: {
    title: "حسابات وعقود النقل المؤسسي | AB",
    description:
      "افتح حساب نقل مؤسسي مع AB: فواتير شهرية موحدة، تقارير مراكز التكلفة، مدير حساب مخصص، وغرفة عمليات على مدار 24/7 في السعودية والإمارات وقطر.",
    keywords:
      "حساب نقل شركات السعودية, عقد نقل مؤسسي الرياض, خدمات سائق خاص للشركات, فواتير نقل شهرية, مناقصات النقل البري الخليج, AB للنقل المؤسسي",
  },
  hero: {
    badge: "العلاقة التجارية واتفاقيات النقل المؤسسي الموحدة",
    h1: "شريك نقل واحد، عقد واحد، وفاتورة موحدة.",
    lead: "يجمع حساب الشركات مع AB جميع رحلات مؤسستك تحت مظلة اتفاقية واحدة. ويشمل ذلك السائقين التنفيذيين، واستقبال زوار المطار، وجولات الأعمال، والسيارات المخصصة، وحافلات الموظفين. تدار كافة الحجوزات عبر فريق تشغيل مركزي واحد، وتصدر الفواتير شهرياً بشكل موحد، مع مدير حساب مخصص لخدمتكم دائماً.",
    primaryCta: "طلب عرض أسعار مؤسسي",
    secondaryCta: "تحميل ملف القدرات المؤسسية (PDF)",
    quickStats: [
      { value: "3 دول", label: "تراخيص تشغيل خليجية", sub: "السعودية · الإمارات · قطر" },
      { value: "24/7", label: "غرفة عمليات وتحكم مركزي", sub: "مكتب تشغيل مباشر بالرياض" },
      { value: "30 يوم", label: "تسهيلات دفع تجارية", sub: "فواتير شهرية موحدة ومفصلة" },
      { value: "< 15 دقيقة", label: "ضمان الاستجابة السريعة", sub: "محدد في اتفاقية مستوى الخدمة" },
    ],
  },
  scope: {
    h2: "ما يغطيه حساب الشركات",
    subhead:
      "إدارة تجارية متكاملة تلبي كافة متطلبات التنقل البري لمؤسستك دون الحاجة لتعدد الموردين أو تشتت الفواتير.",
    items: [
      {
        id: "on-demand",
        title: "حجوزات السائقين التنفيذيين عند الطلب",
        badge: "من نقطة لنقطة أو بالساعة",
        description:
          "للمسؤولين التنفيذيين وأعضاء مجلس الإدارة والضيوف الكرام. حجز متاح بالرحلة أو بالساعة بأسطول فاخر وسائقين محترفين معتمدين.",
        href: "/services/chauffeur-vip",
        iconName: "car",
        image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
        highlights: ["مرسيدس الفئة S وسيارات VIP حديثة", "حجوزات بالساعة حسب التوجيه", "تتبع مباشر للرحلات على مدار الساعة"],
      },
      {
        id: "visitor-airport",
        title: "برامج استقبال زوار المطار والوفود",
        badge: "استقبال وبروتوكول VIP",
        description:
          "إدارة وصول ومغادرة رفيعة المستوى للمستشارين والمدققين الدوليين وأعضاء مجالس الإدارة عبر كافة مطارات المملكة والخليج.",
        href: "/services/airport-transfers",
        iconName: "plane",
        image: "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=800&q=80",
        highlights: ["تتبع الرحلات الجوية دون رسوم تأخير", "استقبال بروتوكولي عند صالة الوصول", "مناولة سريعة ومريحة للأمتعة"],
      },
      {
        id: "dedicated-vehicles",
        title: "سيارات وسائقين مخصصين شهرياً",
        badge: "عقود تنفيذية حصرية",
        description:
          "سيارات فاخرة وسائقون بزي رسمي مخصصون حصرياً للرؤساء التنفيذيين أو القطاعات الحيوية بموجب عقود شهرية متجددة.",
        href: "/services/corporate-transportation",
        iconName: "shield",
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
        highlights: ["سيارات سوداء حديثة ومخصصة", "سائقون معتمدون أمنياً ومهنياً", "صيانة وتأمين شامل دون أي أعباء"],
      },
      {
        id: "roadshows",
        title: "جولات الأعمال والرحلات متعددة المدن",
        badge: "تنقل متكامل بين مدن الخليج",
        description:
          "جداول أعمال مكثفة بين الرياض وجدة والخبر ودبي وأبوظبي والدوحة بتنسيق مركزي يضمن دقة مواعيد الاجتماعات.",
        href: "/services/corporate-transportation",
        iconName: "map",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
        highlights: ["إدارة متعددة المدن عبر مكتب واحد", "انضباط زمني دقيق لجداول اللقاءات", "سائق متفرغ يرافقك طوال الجولة"],
      },
      {
        id: "staff-transport",
        title: "نقل الموظفين ومناوبات العمل",
        badge: "حلول تنقل القوى العاملة",
        description:
          "خدمات نقل منتظمة للموظفين باستخدام فان أعمال فاخر، ميني باص، أو حافلات سياحية 50 راكباً لمقرات الشركات ومواقع العمل.",
        href: "/services/workforce-transportation",
        iconName: "bus",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
        highlights: ["فان مرسيدس فئة V وحافلات مريحة", "مسارات محددة وتتبع GPS مسجل", "مرونة عالية في تعديل المناوبات"],
      },
      {
        id: "event-transport",
        title: "نقل الفعاليات والمؤتمرات الكبرى",
        badge: "لوجستيات المؤتمرات والمعارض",
        description:
          "لوجستيات متكاملة عند تنظيم الجمعيات العمومية، مؤتمرات الاستثمار، القمم الحكومية، واللقاءات الاستراتيجية السنوية.",
        href: "/fleet",
        iconName: "calendar",
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
        highlights: ["منسقون ومشرفون ميدانيون بالموقع", "تجهيز أساطيل ضخمة للوفود", "التزام تام ببروتوكول الضيافة الرسمي"],
      },
    ],
  },
  procurement: {
    h2: "كيف تعمل المشتريات والتعاقد مع AB",
    subhead:
      "مصممة لتلبية أعلى معايير تسجيل الموردين، التدقيق المالي، والحوكمة في كبرى الشركات والمؤسسات الخليجية.",
    pillars: [
      {
        id: "supplier-registration",
        h3: "تسجيل الموردين وتأهيلهم",
        tag: "ملف التأهيل والامتثال",
        text: "نوفر ملف تأهيل موردين متكامل للاعتماد الفوري: السجل التجاري، الشهادة الضريبية، تراخيص تشغيل النقل (الهيئة العامة للنقل في السعودية، RTA دبي، ITC أبوظبي، MOT قطر)، وثائق التأمين الشامل للأساطيل والركاب، وخطابات بنكية رسمية.",
        points: [
          "تراخيص معتمدة من هيئة النقل والجهات الخليجية",
          "تأمين شامل عالي التغطية للمركبات والركاب",
          "شهادات ضريبة القيمة المضافة (هيئة الزكاة والضريبة والجمارك)",
          "خطابات بنكية وتأكيدات مالية معتمدة",
        ],
      },
      {
        id: "pricing-models",
        h3: "نماذج وهياكل التسعير",
        tag: "شفافية تجارية تامة",
        text: "اختر النموذج الأنسب لخطط مؤسستكم المالية: جدول أسعار ثابت ومسبق الاعتماد دون أي زيادات ذروة، أو تسعير مخصص للمشاريع والمؤتمرات المحددة، أو تعاقد شهري ثابت للسيارات المخصصة. كافة الأسعار مثبتة بالعقد ولا تتغير دون موافقة خطية مسبقة.",
        points: [
          "جداول أسعار ثابتة خالية تماماً من زيادات أوقات الذروة",
          "عروض أسعار مخصصة للمشاريع وبرامج العمل",
          "رسوم شهرية واضحة للسيارات المخصصة",
          "ضمان تعاقدي لاستقرار الأسعار طوال مدة العقد",
        ],
      },
      {
        id: "contract-terms",
        h3: "شروط العقد ومستوى الخدمة (SLA)",
        tag: "ضمانات تشغيل ملزمة",
        text: "نقدم اتفاقيات إطارية مرنة تمتد من 6 إلى 36 شهراً. وتتضمن بنود العقد مؤشرات أداء ملزمة وقابلة للقياس: زمن استجابة تأكيد الحجوزات الطارئة خلال أقل من 15 دقيقة، موديلات حديثة للغاية لا تتجاوز سنتين إلى 3 سنوات، وتوفير سيارة بديلة فورية عند الصيانة.",
        points: [
          "عقود إطارية مرنة من 6 إلى 36 شهراً",
          "استجابة فورية للحجوزات خلال أقل من 15 دقيقة",
          "مركبات فاخرة حديثة سوداء حصراً (أقل من 3 سنوات)",
          "ضمان توفير سيارة بديلة فورية على مدار الساعة",
        ],
      },
      {
        id: "responding-to-rfp",
        h3: "الاستجابة للمناقصات وكراسات الشروط (RFP)",
        tag: "المناقصات والعطاءات",
        text: "أرسل كراسة الشروط والمناقصة عبر النموذج أدناه. يؤكد فريق العطاءات استلام الطلب خلال ساعتين، ويقوم بالمعاينات الميدانية وعرض الأسطول إن لزم الأمر، ثم يقدم عرضاً فنياً ومالياً ثنائي اللغة متكاملاً قبل الموعد النهائي المحدد.",
        points: [
          "بروتوكول تأكيد الاستلام خلال ساعتين فقط",
          "عروض فنية وتجارية باللغتين العربية والإنجليزية",
          "معاينات وعروض عملية للأسطول بالموقع",
          "امتثال كامل لجميع بنود وشروط كراسة الطرح",
        ],
      },
    ],
  },
  billing: {
    h2: "الفواتير الشهرية والتقارير المالية",
    subhead:
      "حوكمة مالية متناهية الدقة وتقارير تدقيق مجهزة لمديري المالية وإدارات المشتريات ومسؤولي السفر.",
    features: [
      {
        title: "فاتورة شهرية موحدة",
        description: "فاتورة مركزية واحدة شهرياً، أو مقسمة حسب الكيان القانوني أو الدولة أو القسم.",
        tag: "فوترة متعددة الكيانات",
        detail: "مهيأة لهيكل المحاسبة الخاص بمؤسستكم: مفصولة حسب الكيانات في السعودية أو الإمارات أو قطر مع الضريبة المحلية.",
      },
      {
        title: "تفاصيل تدقيق على مستوى الرحلة",
        description: "شفافية كاملة لكل بند من بنود الرحلات المنفذة عبر المؤسسة.",
        tag: "تفصيل شامل",
        detail: "تشمل اسم الراكب، الموظف الحاجز، مسار الرحلة بالتفصيل، الأوقات الدقيقة، فئة السيارة، ورمز مركز التكلفة.",
      },
      {
        title: "تقرير استخدام شهري تنفيذي",
        description: "تحليلات وإحصاءات دقيقة تسلّم مع كل دورة فوترة شهرية.",
        tag: "تحليلات الإنفاق ومستوى الخدمة",
        detail: "يوضح اتجاهات الإنفاق الشهري، نسبة الالتزام بالمواعيد (> 99.4%)، معالجة تأخيرات الطيران، وأي حالات استثنائية.",
      },
      {
        title: "تكامل الأنظمة المالية والمحاسبية",
        description: "بيانات رقمية جاهزة للاستيراد المباشر في أنظمة المحاسبة وإدارة السفر.",
        tag: "مطابقة للمعايير الضريبية",
        detail: "متوافقة تماماً مع متطلبات الفوترة الإلكترونية (المرحلة الثانية لزاتكا) وهيئة الضرائب الإماراتية بملفات CSV و Excel لـ SAP و Oracle.",
      },
    ],
    invoiceSample: {
      entity: "شركة إيه بي لخدمات النقل الفاخر المحدودة",
      period: "دورة فوترة أكتوبر — كشف الحساب المؤسسي الموحد",
      costCentres: [
        { code: "CC-104", name: "الإدارة التنفيذية ومجلس الإدارة", trips: 48, total: "28,400 ر.س" },
        { code: "CC-208", name: "الاستشارات الإقليمية والعمليات", trips: 112, total: "44,800 ر.س" },
        { code: "CC-315", name: "استقبال الزوار ومدققي الحسابات", trips: 64, total: "22,400 ر.س" },
        { code: "CC-420", name: "النقل المخصص للمقر الرئيسي", trips: 40, total: "36,000 ر.س" },
      ],
    },
  },
  governance: {
    h2: "فريق العمل الذي تتعامل معه",
    subhead:
      "تتطلب حسابات الشركات اهتماماً شخصياً ومسؤولية حقيقية. لذلك نخصص كبار مسؤولينا لإدارة علاقتكم التجارية.",
    team: [
      {
        title: "مدير حساب تجاري مخصص",
        tag: "إدارة الحسابات الاستراتيجية",
        role: "نقطة اتصال رئيسية ومباشرة",
        description:
          "يشرف مدير الحساب المخصص على تعديلات العقود، مراجعة الأسعار، تحديث ملفات الامتثال، والاجتماعات الربع سنوية الدورية.",
        features: [
          "رقم هاتف وبريد إلكتروني مباشر دون انتظار",
          "مراجعة دورية للأداء ومعدلات الإنفاق",
          "تخصيص المركبات ومطابقة الأسعار لاحتياجاتكم",
        ],
      },
      {
        title: "غرفة عمليات الرياض المركزية 24/7",
        tag: "مكتب تشغيل ومتابعة حية",
        role: "إدارة الرحلات الفورية والمباشرة",
        description:
          "تعمل غرفة التحكم على مدار 24 ساعة يومياً، 365 يوماً في السنة، لمتابعة مواعيد الطيران، وتتبع المركبات، وتنفيذ التعديلات الطارئة.",
        features: [
          "تعديل وتوجيه الحجوزات الطارئة على الفور",
          "تتبع آلي وتحديث لرحلات الطيران المتأخرة",
          "تنسيق موحد للعمليات عبر السعودية والإمارات وقطر",
        ],
      },
      {
        title: "مكتب حجز مخصص أو منسق ميداني",
        tag: "للحسابات والمقرات الكبرى",
        role: "دعم ميداني ومؤسسي بالموقع",
        description:
          "للشركات والمقرات الإقليمية الكبرى، توفر AB مكتب حجز مخصص أو منسقاً ميدانياً لإدارة وصول ومغادرة كبار الشخصيات بمقركم.",
        features: [
          "مشرفون ميدانيون متخصصون بالفعاليات الكبرى",
          "خط هاتف وواتساب حصري لحجوزات منسقي السفر",
          "أولوية مطلقة في تخصيص المركبات بالمواسم والقمم",
        ],
      },
    ],
  },
  booking: {
    h2: "حجوزات مسؤوليكم التنفيذيين",
    subhead:
      "إجراءات حجز سلسة ومبسطة صممت خصيصاً للمساعدين التنفيذيين ومنسقي السفر وإدارات المكاتب.",
    channels: [
      {
        title: "بوابة الحجز المؤسسية الآمنة",
        desc: "لوحة تحكم إلكترونية لحجز ومتابعة الرحلات ومراجعة تفاصيلها مع إشعارات تأكيد بريدية فورية.",
        icon: "monitor",
      },
      {
        title: "قناة واتساب مباشرة للحسابات",
        desc: "مراسلة فورية على مدار الساعة لطلبات المساعدين التنفيذيين السريعة والتعديلات اللحظية.",
        icon: "message-circle",
      },
      {
        title: "هاتف أولوية مباشر",
        desc: "اتصال مباشر بفريق التشغيل دون قوائم انتظار أو تسجيلات آلية.",
        icon: "phone",
      },
      {
        title: "بريد التنسيق الفندقي والمكتبي",
        desc: "أرسل تذاكر الطيران أو جدول الجولات متعددة المدن وسيتولى فريقنا جدولة كافة المسارات بدقة.",
        icon: "mail",
      },
    ],
    dispatchNotice: {
      title: "بيانات السائق والمركبة قبل 60 دقيقة من الموعد",
      badge: "أمان وراحة بال تامة للمسافرين",
      description:
        "قبل ساعة كاملة من موعد كل رحلة، يتلقى منسق الحجز والراكب بيانات التحقق الرسمية الكاملة:",
      items: [
        "الاسم الكامل المعتمد للسائق ورقم هاتفه المباشر",
        "طراز السيارة وموديلها ولونها ورقم اللوحة الرسمية",
        "رابط تتبع GPS مباشر وتفاعلي يوضح مسار وصول السائق",
        "شهادة ترخيص السائق والمركبة المعتمدة من هيئة النقل",
      ],
    },
    preferences: {
      title: "الملفات الشخصية لتفضيلات القيادات التنفيذية",
      items: [
        { name: "درجة حرارة المقصورة", options: "ضبط مسبق بدرجة الحرارة المفضلة بدقة (مثلاً 21 مئوية)" },
        { name: "نوع المياه المعدنية", options: "حفظ تفضيل المياه المفضلة الفاخرة (غازية أو طبيعية)" },
        { name: "لغة السائق المفضلة", options: "سائقون يجيدون العربية والإنجليزية بطلاقة وبروتوكول رسمي" },
        { name: "بروتوكول الهدوء في الرحلة", options: "تفضيل رحلة هادئة للتركيز والعمل أو ترحيب بروتوكولي" },
        { name: "شواحن الهواتف الذكية", options: "شواحن سريعة لجميع أنواع الهواتف (آيفون، تايب سي، وغيرها)" },
      ],
    },
  },
  sectors: {
    h2: "المؤسسات والقطاعات التي نخدمها",
    subhead:
      "شريك التنقل المعتمد للمقرات الإقليمية، الصناديق السيادية، والجهات الحكومية في منطقة الخليج.",
    items: [
      {
        name: "المقرات الإقليمية للشركات العالمية (RHQ)",
        role: "تنقل تنفيذي عابر للحدود للمجموعات العالمية التي اتخذت من الرياض مقراً إقليمياً لها.",
        description: "تنقل مرن بين السعودية والخليج مع فوترة شهرية موحدة بالريال السعودي.",
        icon: "building",
      },
      {
        name: "المؤسسات المالية والصناديق السيادية",
        role: "خدمات سائق فائق الخصوصية لأعضاء مجالس الإدارة وشركاء الاستثمار ومدققي الحسابات.",
        description: "التزام صارم باتفاقيات عدم الإفصاح، سيارات سوداء حديثة، وسائقون مدربون على السرية التامة.",
        icon: "landmark",
      },
      {
        name: "شركات الاستشارات والاستراتيجية العالمية",
        role: "رحلات مكثفة أسبوعياً لفرق العمل وجولات الشركاء وتنقلات مواقع العملاء.",
        description: "أسعار ثابتة بالساعة، فواتير مقسمة برموز المشاريع، وصفر زيادات في أوقات الذروة.",
        icon: "briefcase",
      },
      {
        name: "شركات الطاقة والنفط والبنية التحتية",
        role: "نقل آمن ومدقق بين المقرات الرئيسية والمجمعات الصناعية والمطارات.",
        description: "معايير سلامة صارمة، مراقبة تليماتية مستمرة، وسيارات VIP عائلية متعددة الاستخدامات.",
        icon: "flame",
      },
      {
        name: "الجهات الحكومية والبعثات الدبلوماسية",
        role: "مواكب بروتوكولية واستقبال رسمي عالي المستوى للوفود والوزراء والضيوف الرسميين.",
        description: "استقبال دبلوماسي رفيع، سائقون وموزعون متعددو اللغات، وخبرة في التنسيق مع المراسم.",
        icon: "award",
      },
    ],
  },
  form: {
    h2: "فتح حساب شركات",
    subhead:
      "شاركنا نبذة عن طبيعة تنقل مؤسستكم اليوم، وسيقوم فريقنا بالرد بعرض مخصص ومسودة لجدول الأسعار.",
    companyLabel: "اسم الشركة / المؤسسة",
    nameLabel: "الاسم الكامل",
    roleLabel: "المسمى الوظيفي / الدور",
    emailLabel: "البريد الإلكتروني للعمل",
    phoneLabel: "رقم الهاتف (مع مفتاح الدولة)",
    countriesLabel: "دول ونطاق العمليات",
    servicesLabel: "الخدمات المطلوبة (يمكنك اختيار أكثر من خدمة)",
    volumeLabel: "عدد الرحلات أو المركبات الشهرية المتوقعة",
    startDateLabel: "تاريخ البدء المفضل للحساب",
    rfpQuestionLabel: "هل هذا طلب مناقصة / كراسة شروط رسمية (RFP)؟",
    rfpDeadlineLabel: "الموعد النهائي لتقديم العطاء",
    uploadLabel: "رفع ملفات المناقصة أو كراسة الشروط",
    uploadHint: "اسحب وأفلت مستندات الشروط، نماذج جداول الأسعار، أو مستندات الشركة (PDF, DOCX, XLSX, ZIP حتى 25 ميغابايت)",
    notesLabel: "متطلبات إضافية أو ملاحظات حول نطاق العمل",
    consentText:
      "أوافق على معالجة شركة AB لهذه البيانات التجارية وتقديم العرض المؤسسي وفقاً لسياسة الخصوصية.",
    submitButton: "طلب عرض أسعار مؤسسي",
    submittingButton: "جاري إرسال الطلب...",
    successTitle: "تم استلام طلبكم بنجاح",
    successMessage:
      "شكراً لكم. تلقى فريق المشتريات والعلاقات التجارية طلبكم لفتح حساب مؤسسي. سيقوم مدير الحساب المخصص بمراجعة المتطلبات وتقديم العرض المخصص ومسودة جدول الأسعار خلال 4 ساعات عمل.",
    countries: ["المملكة العربية السعودية", "الإمارات العربية المتحدة", "دولة قطر", "مملكة البحرين", "دولة الكويت", "سلطنة عمان", "أخرى / نطاق إقليمي متعدد"],
    services: [
      "سائق تنفيذي (عند الطلب وبالساعة)",
      "برامج استقبال زوار المطار والوفود",
      "سيارات وسائقين مخصصين شهرياً",
      "جولات الأعمال متعددة المدن",
      "نقل الموظفين ومناوبات العمل",
      "نقل المؤتمرات والفعاليات الكبرى",
    ],
    volumes: [
      "أقل من 25 رحلة / شهر",
      "25 إلى 75 رحلة / شهر",
      "75 إلى 200 رحلة / شهر",
      "200 إلى 500 رحلة / شهر",
      "أكثر من 500 رحلة / شهر",
      "أسطول مخصص بالكامل (3 سيارات مخصصة فأكثر)",
    ],
  },
  internalLinks: {
    h2: "استكشف خدمات الأسطول ونطاق العمليات",
    subhead:
      "يرتبط حساب الشركات بقدراتنا التشغيلية المتكاملة في كافة أسواق الخليج العربي.",
    links: [
      {
        title: "نقل الشركات والمؤسسات",
        href: "/services/corporate-transportation",
        scope: "استكشف نطاق العمليات الشامل، فئات الأسطول، وأطر التنقل المؤسسي المعتمدة.",
        tag: "نطاق الخدمة",
      },
      {
        title: "خدمات السائقين و VIP",
        href: "/services/chauffeur-vip",
        scope: "سيدان تنفيذية وحجوزات بالساعة تلائم كبار المسؤولين ورجال الأعمال.",
        tag: "أسطول تنفيذي",
      },
      {
        title: "نقل المطار والبروتوكول",
        href: "/services/airport-transfers",
        scope: "استقبال دقيق وتتبع لمواعيد الرحلات الجوية في كافة مطارات الخليج.",
        tag: "تنقل المطارات",
      },
      {
        title: "نقل القوى العاملة والموظفين",
        href: "/services/workforce-transportation",
        scope: "حافلات حديثة وفان أعمال لتنقل منسوبي الشركات ومواقع المشاريع.",
        tag: "نقل الموظفين",
      },
      {
        title: "أسطولنا الفاخر الحديث",
        href: "/fleet",
        scope: "تعرف على مرسيدس فئة S، كاديلاك اسكاليد، مرسيدس فئة V، وحافلات كبار الشخصيات.",
        tag: "كتالوج المركبات",
      },
      {
        title: "عن شركة AB ومعاييرنا",
        href: "/about",
        scope: "مسيرتنا منذ 1999، التراخيص الحكومية، نموذج الحوكمة، ومعايير السائقين.",
        tag: "معايير الشركة",
      },
    ],
  },
  faqs: {
    h2: "الأسئلة الشائعة حول حسابات الشركات",
    subhead: "إجابات تجارية وتشغيلية رئيسية لمديري المشتريات ومسؤولي السفر والمحاسبة.",
    items: [
      {
        q: "هل يشترط حد أدنى للإنفاق لفتح حساب شركات؟",
        a: "لا يشترط حد أدنى ثابت للإنفاق لفتح حساب الشركات. صممت اتفاقياتنا الإطارية لتناسب المؤسسات التي تحجز بانتظام، بدءاً من الشركات الاستشارية التي تحتاج بضع رحلات مطار شهرياً، ووصولاً إلى المؤسسات الكبرى التي تشغّل أساطيل كاملة مخصصة.",
      },
      {
        q: "هل يمكننا إصدار فواتير منفصلة لكل كيان أو دولة؟",
        a: "نعم بكل تأكيد. يمكن تقسيم الفواتير بحسب الكيان القانوني، أو دولة التشغيل (السعودية، الإمارات، قطر)، أو قطاع الأعمال، أو مركز التكلفة الداخلي، مع تضمين تفاصيل ضريبة القيمة المضافة المحلية المعتمدة.",
      },
      {
        q: "ما هي شروط وتسهيلات الدفع التي تقدمونها؟",
        a: "نقدم تسهيلات دفع ائتمانية قياسية تمتد لـ 30 يوماً من تاريخ صدور الفاتورة الشهرية للحسابات المعتمدة، وتسدد عبر حوالة بنكية محلية بالريال السعودي أو الدرهم الإماراتي أو الريال القطري أو الدولار.",
      },
      {
        q: "هل يمكنكم تقديم العطاءات والرد على المناقصات باللغة العربية؟",
        a: "نعم. يقدم فريق العطاءات والمشتريات لدينا كراسات الشروط والعروض الفنية والتجارية وجداول الأسعار ووثائق الامتثال باللغتين العربية والإنجليزية.",
      },
      {
        q: "كم يستغرق تفعيل حساب الشركات وبدء الخدمة؟",
        a: "يتم تفعيل الحسابات القياسية خلال 24 إلى 48 ساعة بعد توقيع العقد واعتماد إعدادات الفوترة. أما بالنسبة لبرامج نقل الموظفين الكبرى أو الأساطيل المخصصة، فيستغرق التدشين عادة من 3 إلى 7 أيام عمل.",
      },
      {
        q: "هل توفرون شهادات التأمين لاعتماد ملف المورد لدينا؟",
        a: "نعم. نزودكم بالسجل التجاري والشهادة الضريبية وبوالص التأمين التجاري الشامل للركاب والمركبات، وتراخيص التشغيل الصادرة عن الهيئة العامة للنقل (TGA) وهيئات النقل الخليجية، وخطاب البنك الرسمي.",
      },
    ],
  },
  capabilityModal: {
    title: "ملف القدرات المؤسسية لشركة AB",
    subtitle: "خدمات التنقل البري والسائقين التنفيذيين للشركات عبر دول الخليج",
    downloadBtn: "تحميل الملف الكامل للقدرات (PDF)",
    closeBtn: "إغلاق المستند",
    overview:
      "شركة إيه بي (AB) مشغل رائد للنقل البري الفاخر والمؤسسي، يقع مقرها الرئيسي في الرياض ولها مكاتب إقليمية في دبي وأبوظبي والدوحة. نقدم حلول تنقل بسائقين معتمدين ومركبات حديثة مراقبة تليماتياً لكبرى الشركات والصناديق والجهات الحكومية.",
    sections: [
      {
        heading: "1. تراخيص التشغيل والامتثال الخليجي",
        text: "مرخصون بالكامل من الهيئة العامة للنقل (المملكة العربية السعودية)، هيئة الطرق والمواصلات (دبي)، مركز النقل المتكامل (أبوظبي)، ووزارة المواصلات (قطر).",
      },
      {
        heading: "2. مواصفات الأسطول ومعايير الفخامة",
        text: "أسطول حصري من المركبات السوداء الفاخرة الحديثة (مرسيدس الفئة S، كاديلاك اسكاليد، مرسيدس الفئة V، هيونداي ستاريا، وحافلات VIP سعة 16 إلى 50 مقعداً). عمر المركبة لا يتجاوز 36 شهراً إطلاقاً.",
      },
      {
        heading: "3. تدريب وتأهيل السائقين والبروتوكول",
        text: "سائقون محترفون يتحدثون العربية والإنجليزية، يخضعون لفحوصات أمنية وجنائية دقيقة وتدريبات متقدمة على القيادة الدفاعية وبروتوكولات استقبال كبار الشخصيات والسرية التامة.",
      },
      {
        heading: "4. الفوترة والحوكمة المالية",
        text: "فوترة شهرية موحدة، تفصيل دقيق لمراكز التكلفة، توافق كامل مع الفوترة الإلكترونية زاتكا المرحلة الثانية وضريبة الإمارات، مع تسهيلات دفع 30 يوماً.",
      },
      {
        heading: "5. تحكم وتشغيل مركزي 24/7",
        text: "متابعة تليماتية مستمرة عبر الأقمار الصناعية، تتبع تلقائي للرحلات الجوية، ومدير حساب تجاري مخصص على مدار الساعة.",
      },
    ],
  },
};
