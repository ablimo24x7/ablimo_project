export interface OfficeInfo {
  id: string;
  city: string;
  country: string;
  tag: string;
  isHq?: boolean;
  addressLines: string[];
  role: string;
  phone: string;
  email: string;
  hours: string;
  authority: string;
  mapQuery: string;
}

export interface LeaderProfile {
  id: string;
  name: string;
  title: string;
  image: string;
  bio: string;
  credentials: string;
  location: string;
}

export interface CredentialItem {
  id: string;
  title: string;
  issuer: string;
  badge: string;
  desc: string;
  icon: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface PresenceContent {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  stats: Array<{ value: string; label: string }>;
  officesSection: {
    eyebrow: string;
    heading: string;
    description: string;
    offices: OfficeInfo[];
  };
  leadershipSection: {
    eyebrow: string;
    heading: string;
    description: string;
    ctaLabel: string;
    leaders: LeaderProfile[];
  };
  credentialsSection: {
    eyebrow: string;
    heading: string;
    description: string;
    ctaLabel: string;
    credentials: CredentialItem[];
  };
  faqsSection: {
    eyebrow: string;
    heading: string;
    description: string;
    faqs: FaqItem[];
  };
  closingCta: {
    heading: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
}

export const presenceContentEn: PresenceContent = {
  meta: {
    title: "AB Global Presence & Leadership Team | GCC Operations Network",
    description:
      "Explore AB's regional offices in Riyadh, Dubai, Abu Dhabi, and Doha. Meet our executive leadership, verified transport operating licenses, and GCC control room operations.",
    keywords:
      "AB global presence, AB leadership team, Riyadh headquarters, Dubai office, Abu Dhabi transport, Doha Qatar limousine, GCC ground transportation operator",
  },
  hero: {
    eyebrow: "Regional Operations Network & Leadership",
    title: "AB Global Presence",
    titleHighlight: "and Executive Team.",
    subtitle:
      "A centralized operations network run from our Riyadh global headquarters, delivering seamless executive mobility, event logistics, and workforce fleets across Saudi Arabia, the UAE, and Qatar.",
    primaryCta: "Explore Our Offices",
    secondaryCta: "Meet the Leadership Team",
  },
  stats: [
    { value: "4", label: "Regional Headquarters & Hubs" },
    { value: "3", label: "24/7 Operations Control Rooms" },
    { value: "100%", label: "Guaranteed Fleet Dispatch" },
    { value: "GPN", label: "Exclusive GCC Partner" },
  ],
  officesSection: {
    eyebrow: "Our Regional Presence",
    heading: "Regional offices across Saudi Arabia, UAE & Qatar",
    description:
      "Every AB office is a registered local operating entity staffed by experienced mobility managers, on-site route coordinators, and 24/7 dispatch commands.",
    offices: [
      {
        id: "riyadh",
        city: "Riyadh",
        country: "Saudi Arabia (KSA)",
        tag: "Global Headquarters",
        isHq: true,
        addressLines: [
          "Malaz Area, Umar Ibn Abdulaziz Road",
          "Building Number 59, Second Floor",
          "Riyadh 12626, Kingdom of Saudi Arabia",
        ],
        role: "Global Headquarters, Central 24/7 Dispatch Control Room, Strategic Operations & Enterprise Procurement Desk",
        phone: "+966 11 834 3777",
        email: "riyadh@ab.limo",
        hours: "24 Hours / 7 Days a Week",
        authority: "Transport General Authority (TGA) Class-A Licensed",
        mapQuery: "Malaz Area, Umar Ibn Abdulaziz Road, Riyadh 12626, Saudi Arabia",
      },
      {
        id: "dubai",
        city: "Dubai",
        country: "United Arab Emirates (UAE)",
        tag: "UAE Operations Hub",
        addressLines: [
          "Al Khabaisi, Deira",
          "Suite 206, DBC Building",
          "Dubai, United Arab Emirates",
        ],
        role: "UAE Commercial Hub, Dubai International (DXB) Dispatch, High-Volume Event Staging Yard",
        phone: "+971 4 396 8282",
        email: "dubai@ab.limo",
        hours: "24 Hours / 7 Days a Week",
        authority: "Roads and Transport Authority (RTA) Commercial Chauffeur Permit",
        mapQuery: "DBC Building, Al Khabaisi, Deira, Dubai, UAE",
      },
      {
        id: "abu-dhabi",
        city: "Abu Dhabi",
        country: "United Arab Emirates (UAE)",
        tag: "Capital & Diplomatic Desk",
        addressLines: [
          "Mohammed Bin Zayed City",
          "Office 3, Building C57",
          "Abu Dhabi, United Arab Emirates",
        ],
        role: "Government & Diplomatic Protocol Logistics, Presidential Flight Transfers, Corporate Account Services",
        phone: "+971 2 642 9111",
        email: "abudhabi@ab.limo",
        hours: "24 Hours / 7 Days a Week",
        authority: "Integrated Transport Centre (ITC) Licensed",
        mapQuery: "Mohammed Bin Zayed City, Building C57, Abu Dhabi, UAE",
      },
      {
        id: "doha",
        city: "Doha",
        country: "State of Qatar",
        tag: "Qatar Regional Office",
        addressLines: [
          "Street No. 830, Al Rufaa",
          "Building No. 54, Zone 17",
          "Doha, State of Qatar",
        ],
        role: "Qatar Corporate Mobility, Hamad International Airport (DOH) VIP Terminal Coordination, Summit Operations",
        phone: "+974 44 883 222",
        email: "doha@ab.limo",
        hours: "24 Hours / 7 Days a Week",
        authority: "Ministry of Transport (MOT) Licensed Luxury Passenger Operator",
        mapQuery: "Al Rufaa, Street 830, Building 54, Doha, Qatar",
      },
    ],
  },
  leadershipSection: {
    eyebrow: "Governance & Operations",
    heading: "Executive Leadership Team",
    description:
      "Decades of combined experience in luxury hospitality, aviation ground handling, transport telematics, and regional fleet governance.",
    ctaLabel: "Meet the leadership team →",
    leaders: [
      {
        id: "leader-1",
        name: "Mansoor Al-Harthi",
        title: "Chief Executive Officer & Founder",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&q=80",
        bio: "Over 22 years pioneering executive ground transportation, government protocol logistics, and corporate mobility infrastructure across the GCC.",
        credentials: "BSc Business Administration, King Saud University • Board Member GPN Middle East",
        location: "Riyadh, Saudi Arabia",
      },
      {
        id: "leader-2",
        name: "Alexander Becker",
        title: "VP of Operations & Central Dispatch",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=600&fit=crop&q=80",
        bio: "Former civil aviation and logistics director overseeing our 24/7 control rooms, telematics infrastructure, and multi-market fleet readiness.",
        credentials: "MSc Transport Economics, TU Munich • Lead Fleet Auditor ISO 39001",
        location: "Dubai & Riyadh",
      },
      {
        id: "leader-3",
        name: "Reem Al-Ghamdi",
        title: "Director of Quality Assurance & Standards",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=600&fit=crop&q=80",
        bio: "Leads the AB Chauffeur Training Academy, vehicle inspection regimes, and regulatory compliance across TGA, RTA, ITC, and MOT jurisdictions.",
        credentials: "Lead Auditor ISO 9001:2015 • Certified Safety Professional (CSP)",
        location: "Riyadh, Saudi Arabia",
      },
      {
        id: "leader-4",
        name: "Tariq Mansour",
        title: "Commercial Director — GCC Enterprise Accounts",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=600&fit=crop&q=80",
        bio: "Specializes in complex multi-country enterprise frameworks, ministerial summit logistics, and bespoke embassy mobility agreements.",
        credentials: "MBA International Finance, London Business School • 15+ Yrs GCC Corporate Mobility",
        location: "Dubai & Doha",
      },
    ],
  },
  credentialsSection: {
    eyebrow: "Licenses & Compliance",
    heading: "Fully licensed in every jurisdiction we operate",
    description:
      "We operate under strict statutory licensing, accredited international quality standards, and comprehensive corporate insurance across all operating markets.",
    ctaLabel: "View credentials →",
    credentials: [
      {
        id: "tga",
        title: "Transport General Authority (TGA)",
        issuer: "Kingdom of Saudi Arabia",
        badge: "Class-A Licensed",
        desc: "Certified passenger transportation operator authorized for luxury chauffeured services, inter-city transport, and private airport operations throughout KSA.",
        icon: "Shield",
      },
      {
        id: "rta",
        title: "Roads and Transport Authority (RTA)",
        issuer: "Emirate of Dubai, UAE",
        badge: "Commercial Permit",
        desc: "Licensed commercial luxury transport and limousine operator with accredited chauffeurs, RTA smart tracking, and Dubai airport terminal permits.",
        icon: "ShieldCheck",
      },
      {
        id: "itc",
        title: "Integrated Transport Centre (ITC)",
        issuer: "Emirate of Abu Dhabi, UAE",
        badge: "Executive Licence",
        desc: "Authorized executive mobility provider for government ministries, diplomatic missions, and corporate events across Abu Dhabi and Al Ain.",
        icon: "CheckCircle",
      },
      {
        id: "mot",
        title: "Ministry of Transport (MOT)",
        issuer: "State of Qatar",
        badge: "Regulated Operator",
        desc: "Fully licensed passenger road transportation provider for corporate accounts, conference shuttles, and Hamad International Airport transfers.",
        icon: "Award",
      },
      {
        id: "gpn",
        title: "Global Passenger Network (GPN)",
        issuer: "International Alliance",
        badge: "Exclusive Member",
        desc: "Exclusive appointed representative for Saudi Arabia and the UAE in the premier worldwide alliance of high-standard passenger transport companies.",
        icon: "Globe",
      },
      {
        id: "iso",
        title: "ISO 9001:2015 & ISO 39001:2012",
        issuer: "Bureau Veritas Certified",
        badge: "Dual ISO Certification",
        desc: "Audited quality management and road traffic safety (RTS) management systems governing every chauffeur assignment and control room dispatch.",
        icon: "FileCheck",
      },
    ],
  },
  faqsSection: {
    eyebrow: "Corporate & Operational FAQs",
    heading: "Frequently Asked Questions",
    description: "Clear answers to legal, operational, and commercial questions regarding AB's network.",
    faqs: [
      {
        q: "Why does my contract or invoice show a different company name?",
        a: "AB operates through a locally registered company in each country. Your contract and invoices carry the legal name of the AB operating entity in your country (for example, Al Badiah Trading and Contracting Company in Saudi Arabia). This guarantees full local tax compliance, VAT registration, and municipal licensing.",
      },
      {
        q: "Where is AB headquartered?",
        a: "AB is headquartered in Riyadh, Saudi Arabia, located on Umar Ibn Abdulaziz Road in the Malaz district. We maintain fully staffed, operational regional offices in Dubai, Abu Dhabi, and Doha, supported by dedicated 24/7 technical and dispatch commands.",
      },
      {
        q: "Does AB own its vehicles?",
        a: "AB operates a hybrid fleet model: wholly owned flagship vehicles (including executive sedans and luxury motorcoaches), long-term leased late-model assets, and vetted tier-1 partner capacity for peak event surges. Regardless of ownership, every single vehicle is maintained strictly to the AB Vehicle Standard, inspected daily, and monitored via central GPS telematics.",
      },
      {
        q: "Is there an AB app?",
        a: "Bookings are made through our team, website forms, phone and WhatsApp. This ensures every corporate movement, flight transfer, and diplomatic schedule receives dedicated, human-led operational review by our dispatch specialists without algorithmic mistakes.",
      },
    ],
  },
  closingCta: {
    heading: "Connect with our regional team.",
    description:
      "Whether arranging an executive airport transfer, drafting a corporate travel agreement, or organizing an international summit fleet, our local offices are ready.",
    primaryCta: "Contact Our Team",
    secondaryCta: "Corporate Accounts & Terms",
  },
};

export const presenceContentAr: PresenceContent = {
  meta: {
    title: "التواجد الإقليمي وفريق القيادة | AB لنقل كبار الشخصيات",
    description:
      "تعرف على مكاتب شركة AB الإقليمية في الرياض ودبي وأبوظبي والدوحة. التقِ بفريق القيادة التنفيذية، وتعرف على تراخيص النقل المعتمدة وغرف التحكم الميدانية.",
    keywords:
      "تواجد AB العالمي, فريق قيادة AB, المقر الرئيسي بالرياض, مكتب دبي, نقل أبوظبي, ليموزين الدوحة قطر, مشغل نقل كبار الشخصيات بالخليج",
  },
  hero: {
    eyebrow: "شبكة العمليات الإقليمية وفريق القيادة",
    title: "التواجد الإقليمي لشركة AB",
    titleHighlight: "وفريق القيادة التنفيذية.",
    subtitle:
      "شبكة عمليات مركزية تُدار من مقرنا الرئيسي بالرياض، تقدم حلول التنقل التنفيذي، ولوجستيات الفعاليات، وأساطيل الشركات عبر المملكة العربية السعودية والإمارات وقطر.",
    primaryCta: "استكشف مكاتبنا",
    secondaryCta: "تعرف على فريق القيادة",
  },
  stats: [
    { value: "4", label: "مقار ومكاتب إقليمية رئيسية" },
    { value: "3", label: "غرف تحكم عملياتية تعمل 24/7" },
    { value: "100%", label: "إرسال أسطول مضمون" },
    { value: "GPN", label: "الشريك الحصري بالخليج" },
  ],
  officesSection: {
    eyebrow: "تواجدنا الإقليمي",
    heading: "مكاتبنا في السعودية والإمارات وقطر",
    description:
      "كل مكتب تابع لـ AB هو كيان تشغيلي محلي مرخص يضم مديري تنقل محترفين ومنسقي مسارات ميدانيين وغرف تحكم تعمل على مدار الساعة.",
    offices: [
      {
        id: "riyadh",
        city: "الرياض",
        country: "المملكة العربية السعودية",
        tag: "المقر الرئيسي العالمي",
        isHq: true,
        addressLines: [
          "حي الملز، طريق عمر بن عبد العزيز",
          "مبنى رقم 59، الطابق الثاني",
          "الرياض 12626، المملكة العربية السعودية",
        ],
        role: "المقر الرئيسي العالمي، غرفة التحكم المركزية 24/7، مكتب العمليات الاستراتيجية وإدارة عقود الشركات",
        phone: "+966 11 834 3777",
        email: "riyadh@ab.limo",
        hours: "24 ساعة / 7 أيام في الأسبوع",
        authority: "مرخص من الهيئة العامة للنقل (TGA) - الفئة الأولى",
        mapQuery: "حي الملز، طريق عمر بن عبد العزيز، الرياض 12626، المملكة العربية السعودية",
      },
      {
        id: "dubai",
        city: "دبي",
        country: "الإمارات العربية المتحدة",
        tag: "مركز عمليات الإمارات",
        addressLines: [
          "الخبايصي، ديرة",
          "جناح 206، مبنى دي بي سي (DBC)",
          "دبي، الإمارات العربية المتحدة",
        ],
        role: "المركز التجاري للإمارات، إرسال مطار دبي الدولي (DXB)، ساحة تجهيز أساطيل الفعاليات الكبرى",
        phone: "+971 4 396 8282",
        email: "dubai@ab.limo",
        hours: "24 ساعة / 7 أيام في الأسبوع",
        authority: "تصريح نقل فاخر تجاري من هيئة الطرق والمواصلات (RTA)",
        mapQuery: "DBC Building, Al Khabaisi, Deira, Dubai, UAE",
      },
      {
        id: "abu-dhabi",
        city: "أبوظبي",
        country: "الإمارات العربية المتحدة",
        tag: "مكتب العاصمة والبروتوكول",
        addressLines: [
          "مدينة محمد بن زايد",
          "مكتب 3، مبنى C57",
          "أبوظبي، الإمارات العربية المتحدة",
        ],
        role: "لوجستيات البروتوكول الحكومي والدبلوماسي، تنقلات الطيران الرئاسي، خدمات الحسابات المؤسسية",
        phone: "+971 2 642 9111",
        email: "abudhabi@ab.limo",
        hours: "24 ساعة / 7 أيام في الأسبوع",
        authority: "مرخص من مركز النقل المتكامل (ITC)",
        mapQuery: "مدينة محمد بن زايد، مبنى C57، أبوظبي، الإمارات",
      },
      {
        id: "doha",
        city: "الدوحة",
        country: "دولة قطر",
        tag: "المكتب الإقليمي في قطر",
        addressLines: [
          "شارع رقم 830، الرفاع",
          "مبنى رقم 54، المنطقة 17",
          "الدوحة، دولة قطر",
        ],
        role: "تنقل الشركات في قطر، تنسيق صالات كبار الشخصيات بمطار حمد الدولي (DOH)، عمليات القمم والمؤتمرات",
        phone: "+974 44 883 222",
        email: "doha@ab.limo",
        hours: "24 ساعة / 7 أيام في الأسبوع",
        authority: "مرخص من وزارة المواصلات (MOT) لتشغيل نقل الركاب الفاخر",
        mapQuery: "الرفاع، شارع 830، مبنى 54، الدوحة، قطر",
      },
    ],
  },
  leadershipSection: {
    eyebrow: "الحوكمة والعمليات",
    heading: "فريق القيادة التنفيذية",
    description:
      "عقود من الخبرة المتراكمة في الضيافة الفاخرة، والخدمات الأرضية للطيران، والأنظمة التليماتية، وحوكمة الأساطيل الإقليمية.",
    ctaLabel: "تعرف على فريق القيادة ←",
    leaders: [
      {
        id: "leader-1",
        name: "منصور الحارثي",
        title: "الرئيس التنفيذي والمؤسس",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&q=80",
        bio: "أكثر من 22 عاماً في ريادة قطاع النقل الأرضي لكبار الشخصيات، وبروتوكولات الوفود الحكومية، والبنية التحتية لتنقل الشركات في الخليج.",
        credentials: "بكالوريوس إدارة أعمال، جامعة الملك سعود • عضو مجلس إدارة شبكة الركاب العالمية (GPN) الشرق الأوسط",
        location: "الرياض، المملكة العربية السعودية",
      },
      {
        id: "leader-2",
        name: "ألكسندر بيكر",
        title: "نائب الرئيس للعمليات وغرف التحكم",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=600&fit=crop&q=80",
        bio: "مدير سابق في قطاع الطيران المدني واللوجستيات، يشرف على غرف التحكم 24/7، والبنية التحتية للتتبع الذكي، وجاهزية الأسطول.",
        credentials: "ماجستير اقتصاديات النقل، جامعة ميونخ التقنية • مدقق أساطيل معتمد ISO 39001",
        location: "دبي والرياض",
      },
      {
        id: "leader-3",
        name: "ريم الغامدي",
        title: "مديرة ضمان الجودة والمعايير",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=600&fit=crop&q=80",
        bio: "تقود أكاديمية تدريب السائقين في AB، وبرامج الفحص الفني الدوري، والامتثال التنظيمي لدى جهات TGA و RTA و ITC و MOT.",
        credentials: "كبير مدققي أنظمة الجودة ISO 9001:2015 • أخصائية سلامة مهنية معتمدة (CSP)",
        location: "الرياض، المملكة العربية السعودية",
      },
      {
        id: "leader-4",
        name: "طارق منصور",
        title: "المدير التجاري — حسابات الشركات في الخليج",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=600&fit=crop&q=80",
        bio: "متخصص في أطر التعاقد المؤسسية متعددة الدول، ولوجستيات القمم الوزارية، واتفاقيات التنقل الخاصة بالبعثات الدبلوماسية.",
        credentials: "ماجستير تمويل دولي، كلية لندن للأعمال • أكثر من 15 عاماً في تنقل الشركات بالخليج",
        location: "دبي والدوحة",
      },
    ],
  },
  credentialsSection: {
    eyebrow: "التراخيص والاعتمادات",
    heading: "مرخصون بالكامل في كل سوق نخدمه",
    description:
      "نعمل بموجب تراخيص نظامية كاملة، واعتمادات جودة دولية، وتغطيات تأمينية شاملة في جميع الأسواق التي نخدمها.",
    ctaLabel: "عرض الاعتمادات ←",
    credentials: [
      {
        id: "tga",
        title: "الهيئة العامة للنقل (TGA)",
        issuer: "المملكة العربية السعودية",
        badge: "مرخص فئة (أ)",
        desc: "مشغل نقل ركاب معتمد ومصرح لتقديم خدمات النقل الفاخر بالسائق، والنقل بين المدن، وعمليات المطارات الخاصة في جميع أنحاء المملكة.",
        icon: "Shield",
      },
      {
        id: "rta",
        title: "هيئة الطرق والمواصلات (RTA)",
        issuer: "إمارة دبي، الإمارات",
        badge: "تصريح تجاري",
        desc: "مشغل تجاري مرخص لخدمات النقل الفاخر والليموزين مع سائقين معتمدين وتتبع ذكي وتصاريح لصالات مطار دبي.",
        icon: "ShieldCheck",
      },
      {
        id: "itc",
        title: "مركز النقل المتكامل (ITC)",
        issuer: "إمارة أبوظبي، الإمارات",
        badge: "ترخيص تنفيذي",
        desc: "مزود معتمد لخدمات التنقل التنفيذي للوزارات الحكومية والبعثات الدبلوماسية والفعاليات الكبرى في أبوظبي والعين.",
        icon: "CheckCircle",
      },
      {
        id: "mot",
        title: "وزارة المواصلات (MOT)",
        issuer: "دولة قطر",
        badge: "مشغل نظامي",
        desc: "مشغل نقل بري فاخر مرخص لحسابات الشركات، وحافلات المؤتمرات، ونقل مطار حمد الدولي.",
        icon: "Award",
      },
      {
        id: "gpn",
        title: "شبكة الركاب العالمية (GPN)",
        issuer: "تحالف دولي",
        badge: "عضو حصري",
        desc: "الممثل الحصري المعتمد للمملكة العربية السعودية ودولة الإمارات في التحالف العالمي الرائد لشركات نقل الركاب رفيعة المستوى.",
        icon: "Globe",
      },
      {
        id: "iso",
        title: "ISO 9001:2015 و ISO 39001:2012",
        issuer: "شهادة بيرو فيريتاس",
        badge: "شهادة ISO مزدوجة",
        desc: "أنظمة إدارة جودة وسلامة مرورية مدققة تحكم كل رحلة سائق وإرسال في غرف التحكم.",
        icon: "FileCheck",
      },
    ],
  },
  faqsSection: {
    eyebrow: "الأسئلة الشائعة للشركات والعمليات",
    heading: "الأسئلة الشائعة",
    description: "إجابات مباشرة على الاستفسارات القانونية والتشغيلية والتجارية حول شبكة AB.",
    faqs: [
      {
        q: "لماذا يظهر اسم شركة مختلف في عقدي أو فاتورتي؟",
        a: "تعمل AB من خلال شركة مسجلة محلياً في كل دولة. يحمل عقدك وفواتيرك الاسم القانوني لكيان AB التشغيلي في بلدك (على سبيل المثال، شركة البادية للتجارة والمقاولات في المملكة العربية السعودية). هذا يضمن الامتثال الضريبي الكامل، والتسجيل في ضريبة القيمة المضافة، والتراخيص البلدية الرسمية.",
      },
      {
        q: "أين يقع المقر الرئيسي لشركة AB؟",
        a: "يقع المقر الرئيسي لشركة AB في الرياض، المملكة العربية السعودية، في حي الملز على طريق عمر بن عبد العزيز. كما نمتلك مكاتب إقليمية متكاملة في دبي وأبوظبي والدوحة، مدعومة بغرف تحكم فنية وعملياتية تعمل 24/7.",
      },
      {
        q: "هل تمتلك AB مركباتها الخاصة؟",
        a: "تتبع AB نموذج أسطول هجين: مركبات رائدة مملوكة بالكامل (تشمل سيارات السيدان الفاخرة والحافلات التنفيذية)، ومركبات حديثة مستأجرة بعقود طويلة الأجل، وسعة إضافية من شركاء الفئة الأولى لفترات ذروة الفعاليات. وبغض النظر عن الملكية، تخضع كل مركبة بالكامل لمعايير AB الصارمة وتُفحص يومياً وتُراقب عبر التتبع المركزي.",
      },
      {
        q: "هل يوجد تطبيق لـ AB على الهواتف؟",
        a: "تتم الحجوزات من خلال فريقنا المختص، ونماذج الموقع الإلكتروني، والهاتف، وقنوات الواتساب المعتمدة. هذا يضمن حصول كل رحلة عمل أو استقبال رسمي على مراجعة تشغيلية مباشرة من قِبل متخصصي الإرسال لدينا دون أخطاء برمجية آلية.",
      },
    ],
  },
  closingCta: {
    heading: "تواصل مع فريقنا الإقليمي.",
    description:
      "سواء كنت ترغب في ترتيب استقبال تنفيذي في المطار، أو صياغة اتفاقية نقل مؤسسية، أو تنظيم أسطول لقمة دولية، فإن مكاتبنا المحلية في خدمتك.",
    primaryCta: "تواصل مع فريقنا",
    secondaryCta: "حسابات الشركات والشروط",
  },
};
