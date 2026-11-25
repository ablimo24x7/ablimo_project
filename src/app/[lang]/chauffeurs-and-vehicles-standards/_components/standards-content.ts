export interface ComplianceAuthority {
  id: string;
  code: string;
  name: string;
  region: string;
  tag: string;
  licenseType: string;
  description: string;
}

export interface InspectionCheckItem {
  category: string;
  icon: string;
  items: string[];
}

export interface TrainingModule {
  title: string;
  description: string;
  icon: string;
}

export interface ControlPillar {
  title: string;
  description: string;
  icon: string;
}

export interface QAPillar {
  title: string;
  description: string;
  icon: string;
}

export interface StandardsContent {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    subheading: string;
    primaryCta: string;
    secondaryCta: string;
  };
  commitment: {
    eyebrow: string;
    heading: string;
    text: string;
    quote: string;
    badge: string;
  };
  licensed: {
    eyebrow: string;
    heading: string;
    description: string;
    complianceNote: string;
    authorities: ComplianceAuthority[];
  };
  vehicleStandard: {
    eyebrow: string;
    heading: string;
    description: string;
    pillars: Array<{
      title: string;
      desc: string;
      badge: string;
      icon: string;
    }>;
    inspectionHeading: string;
    inspectionChecks: InspectionCheckItem[];
  };
  chauffeurStandard: {
    eyebrow: string;
    heading: string;
    description: string;
    pillars: Array<{
      title: string;
      desc: string;
      icon: string;
    }>;
    trainingHeading: string;
    trainingModules: TrainingModule[];
  };
  operationalControl: {
    eyebrow: string;
    heading: string;
    description: string;
    pillars: ControlPillar[];
  };
  qualityAssurance: {
    eyebrow: string;
    heading: string;
    description: string;
    pillars: QAPillar[];
  };
  closingCta: {
    eyebrow: string;
    heading: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
}

export const standardsContentEn: StandardsContent = {
  meta: {
    title: "The AB Standards | Chauffeur & Vehicle Quality Framework in the GCC",
    description:
      "Every vehicle inspected, every chauffeur vetted and every trip monitored. The AB Standard is built on TGA, RTA, ITC, and MOT regulatory compliance across KSA, UAE, and Qatar.",
    keywords:
      "AB Standards, luxury chauffeur standard, vehicle inspection checklist, TGA certified chauffeur, RTA limousine permit, ITC Abu Dhabi, MOT Qatar, Duty of Care transportation",
  },
  hero: {
    eyebrow: "Quality Framework & Safety Assurance",
    title: "The AB",
    titleHighlight: "Standards.",
    subheading:
      "Every vehicle inspected, every chauffeur vetted and every trip monitored, in line with TGA, RTA, ITC and international industry standards.",
    primaryCta: "Request a Quote",
    secondaryCta: "Talk to Our Team",
  },
  commitment: {
    eyebrow: "Our Absolute Commitment",
    heading: "The quality framework behind every journey",
    text: "Moving executives, delegations and event guests depends on getting the same quality on every trip. The AB Standard is the quality framework behind every vehicle we dispatch and every chauffeur we deploy, in Saudi Arabia, the UAE, Qatar and beyond. It is built on local regulatory compliance and international best practice, and our Quality Assurance team checks it every day.",
    quote:
      "Consistency is not an accident—it is an operating architecture engineered into every pre-trip inspection, driver vetting protocol, and 24/7 telemetry feed.",
    badge: "100% Quality Assurance Audited",
  },
  licensed: {
    eyebrow: "1. Licensed and Fully Compliant",
    heading: "Statutory Authority Compliance in Every Market",
    description:
      "We operate under the strict licensing and permit requirements of the transport authorities in each market we serve. Every vehicle carries valid registration, commercial passenger insurance and operating permits, and every chauffeur holds the professional licenses and driver cards required by local regulation. We track renewals centrally, so nothing on the road is ever out of compliance.",
    complianceNote:
      "All driver cards, vehicle registrations, and commercial insurances are synchronized with centralized expiration alarms 60 days before renewal deadlines.",
    authorities: [
      {
        id: "tga",
        code: "TGA",
        name: "Transport General Authority",
        region: "Saudi Arabia (KSA)",
        tag: "Class-A Licensed",
        licenseType: "Executive Chauffeur & Commercial Passenger Operating Permit",
        description:
          "Licensed for private limousine operations, inter-city mobility, corporate passenger transport, and airport tarmac transfer services across the Kingdom.",
      },
      {
        id: "rta",
        code: "RTA",
        name: "Roads and Transport Authority",
        region: "Dubai (UAE)",
        tag: "Commercial Permit",
        licenseType: "Commercial Luxury Transport & Limousine Operating Permit",
        description:
          "Certified for premium limousine operations, VIP delegation transport, corporate accounts, and smart dispatch integration throughout Dubai and northern Emirates.",
      },
      {
        id: "itc",
        code: "ITC",
        name: "Integrated Transport Centre",
        region: "Abu Dhabi (UAE)",
        tag: "Executive Licence",
        licenseType: "Executive Passenger Transport & Protocol Operating Licence",
        description:
          "Authorised ground transport provider for ministerial delegations, diplomatic missions, executive fleets, and VIP airport services across Abu Dhabi.",
      },
      {
        id: "mot",
        code: "MOT",
        name: "Ministry of Transport",
        region: "State of Qatar",
        tag: "Regulated Operator",
        licenseType: "Passenger Road Transport Operating Licence",
        description:
          "Fully compliant corporate transport provider for corporate fleets, conference shuttle operations, and Hamad International Airport (DOH) transfers.",
      },
    ],
  },
  vehicleStandard: {
    eyebrow: "2. The Vehicle Standard",
    heading: "Engineered for Comfort, Safety and Flawless Presentation",
    description:
      "Every vehicle dispatched under the AB banner reflects uncompromising criteria regarding age, mechanical integrity, cabin sanitation, and on-board technology.",
    pillars: [
      {
        title: "Modern, Well-Specified Fleet",
        desc: "Vehicles stay in service only up to 36 months or 120,000 km. After that threshold, they are decommissioned and replaced with current-generation models.",
        badge: "Strict ≤ 36 Months",
        icon: "Car",
      },
      {
        title: "Planned Digital Maintenance",
        desc: "Serviced strictly on manufacturer schedules at authorized marque dealerships (Mercedes-Benz, BMW, etc.). Every service is digitally logged in our fleet database.",
        badge: "OEM Authorized Centers",
        icon: "Wrench",
      },
      {
        title: "Pristine Presentation",
        desc: "Cleaned and hand-detailed before every single assignment. Stocked with complimentary chilled bottled water, sanitizing wipes, phone charging cables, and high-speed Wi-Fi.",
        badge: "First-Class Amenities",
        icon: "Sparkles",
      },
      {
        title: "Connected On-Board Technology",
        desc: "Every vehicle is equipped with precision GPS telematics, live route monitoring, speed tracking, and automated telemetry tied directly to our 24/7 control rooms.",
        badge: "Real-Time Telematics",
        icon: "Cpu",
      },
    ],
    inspectionHeading: "28-Point Pre-Assignment Inspection Checklist",
    inspectionChecks: [
      {
        category: "Safety & Mechanics",
        icon: "ShieldAlert",
        items: [
          "Braking system efficiency & pad thickness",
          "Tire tread depth, condition & pressure",
          "Exterior lights, indicators & hazard flashers",
          "Fluid levels: engine oil, coolant, brake fluid & screenwash",
        ],
      },
      {
        category: "Cabin Comfort & Climate",
        icon: "Wind",
        items: [
          "Air conditioning dual-zone chill test & cabin filtration",
          "Seat adjustments, ventilation & massage controls",
          "Noise, vibration and harshness (NVH) audit",
          "Power window, privacy blind & sunroof operation",
        ],
      },
      {
        category: "Emergency & Compliance",
        icon: "LifeBuoy",
        items: [
          "Seatbelt retractors and tension checks for all seats",
          "First-aid kit fully stocked with valid expiry dates",
          "Fire extinguisher checked, pressurized & certified",
          "Warning triangle and high-visibility vest present",
        ],
      },
      {
        category: "Sanitization & Presentation",
        icon: "Sparkles",
        items: [
          "Interior vacuuming, leather conditioning & odor elimination",
          "Streak-free exterior hand wash and window polishing",
          "Chilled bottled water, mints & sealed tissue packs",
          "Multi-device fast-charging cables (USB-C & Lightning)",
        ],
      },
    ],
  },
  chauffeurStandard: {
    eyebrow: "3. The Chauffeur Standard",
    heading: "Vetted Professionals, Rigorously Trained and Protocol-Ready",
    description:
      "A luxury vehicle is only as good as the chauffeur behind the wheel. The AB Chauffeur Standard ensures discreet, punctual, and highly skilled professionals.",
    pillars: [
      {
        title: "Rigorous Selection & Vetting",
        desc: "Comprehensive criminal background checks, document authentication, driving history audits, and certified medical fitness examinations before joining the fleet.",
        icon: "UserCheck",
      },
      {
        title: "Licensed Professionals",
        desc: "All chauffeurs hold valid commercial professional driving licenses and official driver identification cards mandated by TGA, RTA, ITC, or MOT authorities.",
        icon: "BadgeCheck",
      },
      {
        title: "Impeccable Presentation & NDA",
        desc: "Chauffeurs wear dark bespoke business suits, adhere to strict grooming standards, and operate under non-negotiable non-disclosure confidentiality agreements.",
        icon: "Lock",
      },
      {
        title: "Fatigue Management Architecture",
        desc: "Strict working-hour caps, automated duty rostering, and mandatory minimum rest periods prevent driver exhaustion—guaranteeing peak alertness on every trip.",
        icon: "Clock",
      },
    ],
    trainingHeading: "AB Chauffeur Academy Curriculum",
    trainingModules: [
      {
        title: "Defensive & Protective Driving",
        description:
          "Advanced hazard anticipation, skid avoidance, safe spatial buffer management, and smooth braking technique to maximize rear-passenger comfort.",
        icon: "Shield",
      },
      {
        title: "VIP & Diplomatic Etiquette",
        description:
          "Strict diplomatic protocol, door etiquette, personal space deference, luggage handling standards, and non-intrusive professionalism.",
        icon: "Crown",
      },
      {
        title: "Communication & Discretion",
        description:
          "Fluency in professional English (with Arabic and multilingual options), absolute confidentiality regarding passenger conversations, and courteous assistance.",
        icon: "MessageSquare",
      },
      {
        title: "Airport Protocols & Route Topography",
        description:
          "Airside tarmac access, General Aviation / FBO tarmac procedures, VIP terminal meet-and-greet protocols, and intricate knowledge of GCC arterial routes.",
        icon: "Navigation",
      },
      {
        title: "Emergency & Incident Response",
        description:
          "First-aid training, vehicle breakdown triage, medical emergency response, security escort coordination, and real-time incident notification protocols.",
        icon: "AlertTriangle",
      },
      {
        title: "6-Month Mandatory Refreshers",
        description:
          "Every chauffeur undergoes formal refresher recertification every 6 months and receives bespoke operational briefings prior to major international events.",
        icon: "RefreshCw",
      },
    ],
  },
  operationalControl: {
    eyebrow: "4. Operational Control",
    heading: "Centralized 24/7 Command Centres Across the GCC",
    description:
      "Our operations run through synchronized control rooms located in Riyadh, Dubai, and Doha, maintaining continuous visibility over every vehicle and journey in real time.",
    pillars: [
      {
        title: "24/7 Operations Control Rooms",
        description:
          "Command centres in Riyadh, Dubai, and Doha operating around the clock, 365 days a year, staffed by veteran dispatch controllers.",
        icon: "Headset",
      },
      {
        title: "Real-Time Telematics & Speed Tracking",
        description:
          "Live GPS telemetry tracks vehicle location, journey progress, and road speed, ensuring strict adherence to municipal speed regulations.",
        icon: "Radio",
      },
      {
        title: "Proactive Flight & Route Alerts",
        description:
          "Direct integration with global aviation radar tracks flight arrival changes in real time, automatically adjusting chauffeur dispatch times.",
        icon: "Plane",
      },
      {
        title: "Standby Fleet & Relief Chauffeurs",
        description:
          "Dedicated standby vehicles and relief drivers stationed at key hubs ready for immediate deployment in the event of schedule shifts or emergencies.",
        icon: "RefreshCw",
      },
      {
        title: "Dedicated On-Site Coordinators",
        description:
          "Named on-site marshals and protocol coordinators deployed at hotels, airport terminals, and conference centres to direct passenger flow.",
        icon: "MapPin",
      },
    ],
  },
  qualityAssurance: {
    eyebrow: "5. Continuous Quality Assurance",
    heading: "Audited Daily by Our Dedicated QA Desk",
    description:
      "Quality is not assumed; it is measured, audited, and refined through continuous operational data loops and customer feedback.",
    pillars: [
      {
        title: "Unannounced QA Field Audits",
        description:
          "Regular surprise inspections of vehicles, driver grooming, safety equipment, and logbooks conducted at airport staging yards and event hubs.",
        icon: "Search",
      },
      {
        title: "Measurable Performance KPIs",
        description:
          "Every operation tracks strict quantitative metrics: on-time arrival rate (consistently > 99.6%), zero safety incidents, and driver ratings.",
        icon: "BarChart3",
      },
      {
        title: "Post-Journey Client Feedback",
        description:
          "Structured feedback collected from corporate travel managers and passengers after assignments, reviewed directly by senior management.",
        icon: "Star",
      },
      {
        title: "15-Minute Incident Notification",
        description:
          "Codified protocols guaranteeing written incident escalation and corrective dispatch action dispatched within 15 minutes of any occurrence.",
        icon: "BellRing",
      },
      {
        title: "Continuous Empirical Improvement",
        description:
          "Data insights and debrief reports from major summits and corporate accounts are continuously fed back into our training curriculum.",
        icon: "TrendingUp",
      },
    ],
  },
  closingCta: {
    eyebrow: "Experience The Difference",
    heading: "Experience the AB Standard.",
    description:
      "Whether it's one executive arrival or a multi-week event with hundreds of vehicles, every trip is delivered to the same exacting standard.",
    primaryCta: "Request a Quote",
    secondaryCta: "Talk to Our Team",
  },
};

export const standardsContentAr: StandardsContent = {
  meta: {
    title: "معايير AB | إطار جودة السائقين والمركبات في الخليج",
    description:
      "كل مركبة تُفحص، وكل سائق يُعتمد، وكل رحلة تُراقب. معيار AB مبني على الامتثال لهيئات النقل TGA و RTA و ITC و MOT في السعودية والإمارات وقطر.",
    keywords:
      "معايير AB, معايير السائقين الفاخرة, فحص المركبات, سائق معتمد الهيئة العامة للنقل, تصريح ليموزين RTA, مركز النقل المتكامل, رعاية الركاب",
  },
  hero: {
    eyebrow: "إطار الجودة وضمان السلامة",
    title: "معايير",
    titleHighlight: "شركة AB.",
    subheading:
      "كل مركبة تُفحص، وكل سائق يُعتمد، وكل رحلة تُراقب، بالتوافق مع معايير TGA و RTA و ITC وأفضل المعايير الدولية لصناعة النقل الفاخر.",
    primaryCta: "اطلب عرض سعر",
    secondaryCta: "تحدث مع فريقنا",
  },
  commitment: {
    eyebrow: "التزامنا الراسخ",
    heading: "إطار الجودة وراء كل رحلة ننفذها",
    text: "يعتمد نقل الرؤساء التنفيذيين والوفود وضيوف الفعاليات الكبرى على الحصول على نفس الجودة العالية في كل رحلة دون استثناء. معيار AB هو إطار الجودة الصارم وراء كل مركبة نرسلها وكل سائق نكلفه في المملكة العربية السعودية والإمارات وقطر وما وراءها. إنه مبني على الامتثال التنظيمي المحلي وأفضل الممارسات الدولية، ويفحصه فريق ضمان الجودة لدينا يومياً.",
    quote:
      "الجودة المتسقة ليست وليدة الصدفة—إنها بنية تشغيلية هندسية مدمجة في كل فحص قبل الرحلة، وبروتوكول اعتماد للسائق، وبث تتبع مباشر على مدار الساعة.",
    badge: "مدقق بنسبة 100% من فريق ضمان الجودة",
  },
  licensed: {
    eyebrow: "1. مرخصون ونظاميون بالكامل",
    heading: "الامتثال للهيئات التنظيمية في كل سوق",
    description:
      "نعمل بموجب متطلبات التراخيص والتصاريح الصارمة لهيئات النقل الرسمية في كل سوق نخدمه. تحمل كل مركبة رخصة سير سارية وتأميناً تجارياً شاملاً وتصاريح تشغيل معتمدة، ويحمل كل سائق رخصة القيادة المهنية وبطاقات السائق المطلوبة نظامياً. نتتبع مواعيد التجديد مركزياً لضمان عدم وجود أي مركبة أو سائق خارج إطار الامتثال.",
    complianceNote:
      "تتم مزامنة جميع بطاقات السائقين وتراخيص المركبات والتأمينات التجارية مع نظام إنذار مركزي ينبه قبل 60 يوماً من موعد التجديد.",
    authorities: [
      {
        id: "tga",
        code: "TGA",
        name: "الهيئة العامة للنقل",
        region: "المملكة العربية السعودية",
        tag: "مرخص فئة (أ)",
        licenseType: "تصريح تشغيل النقل الفاخر ونقل الركاب التجاري",
        description:
          "مرخص لتقديم خدمات النقل بالسائق الخاص، والنقل بين المدن، ونقل موظفي الشركات، والخدمات الأرضية للمطارات في كافة مدن المملكة.",
      },
      {
        id: "rta",
        code: "RTA",
        name: "هيئة الطرق والمواصلات",
        region: "دبي (الإمارات)",
        tag: "تصريح تجاري",
        licenseType: "تصريح تشغيل مركبات الليموزين والنقل الفاخر",
        description:
          "معتمد لعمليات الليموزين الفاخرة، ونقل وفود كبار الشخصيات، والحسابات المؤسسية، والربط مع أنظمة التتبع الذكية في دبي والإمارات الشمالية.",
      },
      {
        id: "itc",
        code: "ITC",
        name: "مركز النقل المتكامل",
        region: "أبوظبي (الإمارات)",
        tag: "ترخيص تنفيذي",
        licenseType: "ترخيص تشغيل النقل التنفيذي والبروتوكولي",
        description:
          "مزود نقل أرضي مصرح للوفود الوزارية، والبعثات الدبلوماسية، وأساطيل الشركات، وخدمات المطارات الفاخرة في أبوظبي والعين.",
      },
      {
        id: "mot",
        code: "MOT",
        name: "وزارة المواصلات",
        region: "دولة قطر",
        tag: "مشغل نظامي",
        licenseType: "ترخيص تشغيل نقل الركاب البري الفاخر",
        description:
          "مشغل نقل مؤسسي مرخص بالكامل لعقود الشركات، وحافلات المؤتمرات، وتنقلات صالات كبار الشخصيات بمطار حمد الدولي (DOH).",
      },
    ],
  },
  vehicleStandard: {
    eyebrow: "2. معيار المركبة",
    heading: "مركبات مصممة للراحة والسلامة والمظهر الفاخر",
    description:
      "كل مركبة تخرج تحت مظلة AB تعكس معايير لا تقبل التنازل بشأن الحداثة، والسلامة الميكانيكية، ونظافة المقصورة، والتقنيات الذكية المتصلة.",
    pillars: [
      {
        title: "أسطول حديث ومحدد المواصفات",
        desc: "تبقى المركبات في الخدمة حتى 36 شهراً أو 120,000 كم كحد أقصى. بعد ذلك، يتم استبدالها بأحدث الطرازات العالمية.",
        badge: "أقل من 36 شهراً",
        icon: "Car",
      },
      {
        title: "صيانة رقمية مجدولة",
        desc: "تتم الصيانة بدقة متناهية وفق جداول المصنع في مراكز الوكالات الرسمية المعتمدة (مرسيدس، بي إم دبليو، إلخ)، وتُسجل كل صيانة رقمياً.",
        badge: "مراكز وكالات معتمدة",
        icon: "Wrench",
      },
      {
        title: "جاهزية ومظهر فندقي",
        desc: "تنظيف وتعقيم يدوي شامل قبل كل مهمة. تتوفر مياه معدنية مثلجة مجاناً، ومناديل معقمة، وشواحن لجميع الأجهزة، وإنترنت واي فاي سريع.",
        badge: "ضيافة فاخرة متكاملة",
        icon: "Sparkles",
      },
      {
        title: "تكنولوجيا متصلة على متن المركبة",
        desc: "كل مركبة مزودة بنظام تتبع GPS دقيق، ومراقبة السرعة، ورابط تليماتي مباشر يتصل بغرف التحكم المركزية على مدار الساعة.",
        badge: "تتبع تليماتي مباشر",
        icon: "Cpu",
      },
    ],
    inspectionHeading: "قائمة فحص المركبة الدقيقة (28 نقطة قبل الانطلاق)",
    inspectionChecks: [
      {
        category: "السلامة والميكانيكا",
        icon: "ShieldAlert",
        items: [
          "كفاءة نظام المكابح وسماكة الفحمات",
          "عمق نقوش الإطارات وحالتها وضغط الهواء",
          "سلامة الإضاءة الخارجية وإشارات الانعطاف والتحذير",
          "مستويات السوائل: زيت المحرك، سائل التبريد، وسوائل الفرامل والمسّاحات",
        ],
      },
      {
        category: "راحة المقصورة والتكييف",
        icon: "Wind",
        items: [
          "فحص برودة التكييف متعدد المناطق وفلاتر تنقية الهواء",
          "وظائف تعديل المقاعد الكهربائية والتهوية والتدليك",
          "فحص العزل الصوتي وعدم وجود أي اهتزازات",
          "عمل النوافذ الكهربائية والستائر الجانبية وفتحة السقف",
        ],
      },
      {
        category: "الطوارئ والامتثال",
        icon: "LifeBuoy",
        items: [
          "فحص أحزمة الأمان وآليات الشد لجميع المقاعد",
          "حقيبة إسعافات أولية متكاملة وسارية الصلاحية",
          "طفاية حريق مفحوصة ومضغوطة ومعتمدة",
          "مثلث التحذير العاكس وسترة الطوارئ الفوسفورية",
        ],
      },
      {
        category: "التعقيم والمظهر الفاخر",
        icon: "Sparkles",
        items: [
          "تنظيف بالمكنسة ومعالجة الجلد برائحة منعشة وفاخرة",
          "غسيل يدوي خارجي وتلميع الزجاج بدون أي بقع",
          "توفير مياه مثلجة وحلوى نعناع ومناديل معقمة",
          "شواحن سريعة لجميع أنواع الهواتف الذكية (Type-C و Lightning)",
        ],
      },
    ],
  },
  chauffeurStandard: {
    eyebrow: "3. معيار السائق الشخصي",
    heading: "محترفون معتمدون، مدربون بروتوكولياً وجاهزون للمهام الرفيعة",
    description:
      "السيارة الفاخرة لا تكتمل إلا بوجود سائق محترف خلف المقود. يضمن معيار السائق في AB سائقين على أعلى درجات اللباقة والانضباط والأمانة.",
    pillars: [
      {
        title: "اختيار وتدقيق أمني صارم",
        desc: "فحوصات خلفية أمنية وجنائية شاملة، والتحقق من الوثائق، وتدقيق سجل القيادة، وفحص اللياقة الطبية الشامل قبل الانضمام للأسطول.",
        icon: "UserCheck",
      },
      {
        title: "محترفون مرخصون رسمياً",
        desc: "يحمل جميع السائقين رخص قيادة مهنية سارية وبطاقات سائق رسمية معتمدة من هيئات TGA أو RTA أو ITC أو MOT.",
        icon: "BadgeCheck",
      },
      {
        title: "مظهر أنيق والتزام بالسرية (NDA)",
        desc: "يرتدي السائقون زياً رسمياً أنيقاً (بدلة داكنة وربطة عنق)، ويتبعون معايير هندام مشددة، ويعملون بموجب اتفاقيات سرية تامة وموقعة.",
        icon: "Lock",
      },
      {
        title: "إدارة ساعات العمل وتجنب الإجهاد",
        desc: "حدود صارمة لساعات القيادة وجداول مناوبة آلية وفترات راحة إلزامية لضمان يقظة السائق وسلامة الركاب في كل الأوقات.",
        icon: "Clock",
      },
    ],
    trainingHeading: "منهج أكاديمية تدريب السائقين في AB",
    trainingModules: [
      {
        title: "القيادة الدفاعية والوقائية",
        description:
          "توقع المخاطر على الطريق، وتفادي الانزلاق، وإدارة مسافات الأمان، وتنعيم الضغط على المكابح لراحة الركاب في المقاعد الخلفية.",
        icon: "Shield",
      },
      {
        title: "إتيكيت وبروتوكول كبار الشخصيات",
        description:
          "البروتوكولات الدبلوماسية، طريقة فتح الأبواب والترحيب، احترام المساحة الشخصية، والتعامل الاحترافي الراقي مع الأمتعة.",
        icon: "Crown",
      },
      {
        title: "التواصل والسرية المطلقة",
        description:
          "إتقان اللغة الإنجليزية المهنية (مع خيارات للغة العربية ولغات أخرى)، والسرية التامة بشأن محادثات الركاب وأماكن تنقلاتهم.",
        icon: "MessageSquare",
      },
      {
        title: "بروتوكولات المطارات ومعرفة الطرق",
        description:
          "تصاريح ساحات الطيران الخاص (FBO)، وإجراءات صالات كبار الشخصيات، والإلمام الدقيق بشبكات الطرق السريعة ومداخل الفنادق.",
        icon: "Navigation",
      },
      {
        title: "الاستجابة للطوارئ والحوادث",
        description:
          "الإسعافات الأولية، التعامل مع الأعطال المفاجئة، والتنسيق المباشر مع غرفة العمليات لطلب مركبة بديلة خلال دقائق.",
        icon: "AlertTriangle",
      },
      {
        title: "تنشيط إلزامي كل 6 أشهر",
        description:
          "يخضع كل سائق لدورة تنشيطية دورية كل 6 أشهر، ويتلقى إحاطة تشغيلية ميدانية مخصصة قبل بدء الفعاليات والمؤتمرات الكبرى.",
        icon: "RefreshCw",
      },
    ],
  },
  operationalControl: {
    eyebrow: "4. السيطرة والتحكم العملياتي",
    heading: "غرف تحكم مركزية تعمل 24/7 عبر دول الخليج",
    description:
      "تُدار عملياتنا عبر غرف تحكم متزامنة ومترابطة في الرياض ودبي والدوحة، مما يحافظ على رؤية حية ومستمرة لكل مركبة ورحلة في الوقت الفعلي.",
    pillars: [
      {
        title: "غرف عمليات تعمل 24/7",
        description:
          "مراكز قيادة في الرياض ودبي والدوحة تعمل على مدار الساعة طوال 365 يوماً في العام، ويديرها مراقبو إرسال مخضرمون.",
        icon: "Headset",
      },
      {
        title: "تتبع تليماتي ورصد حي للسرعة",
        description:
          "بيانات نظام GPS الحية ترصد موقع المركبة، وتدفق المسار، وسرعة السير، لضمان الالتزام الصارم بالقوانين المرورية.",
        icon: "Radio",
      },
      {
        title: "تنبيهات استباقية للرحلات الجوية والمسارات",
        description:
          "ربط مباشر مع رادارات الطيران العالمية لرصد أي تأخير أو تقديم في مواعيد الطائرات وتعديل مواعيد خروج السائقين تلقائياً.",
        icon: "Plane",
      },
      {
        title: "أسطول وسائقون في وضع الجاهزية الاحتياطية",
        description:
          "مركبات وسائقون إضافيون يتمركزون في نقاط استراتيجية للتدخل الفوري في حال حدوث أي طارئ أو تغيير مفاجئ في المواعيد.",
        icon: "RefreshCw",
      },
      {
        title: "منسقون ميدانيون مخصصون",
        description:
          "منسقون ومشرفون ميدانيون يتواجدون في الفنادق ومقار المؤتمرات وصالات المطارات لتنظيم تدفق الركاب بسلاسة تامة.",
        icon: "MapPin",
      },
    ],
  },
  qualityAssurance: {
    eyebrow: "5. ضمان الجودة المستمر",
    heading: "تدقيق يومي من قِبل فريق الجودة المختص",
    description:
      "الجودة لدينا ليست مجرد وعود، بل هي مؤشرات دقيقة تُقاس وتُدقق يومياً وتتطور عبر البيانات التجريبية وملاحظات العملاء.",
    pillars: [
      {
        title: "عمليات تدقيق ميدانية مفاجئة",
        description:
          "فحوصات مفاجئة دورية لمركبات الأسطول، وهندام السائقين، ومعدات السلامة في ساحات المطارات ومواقع الفعاليات.",
        icon: "Search",
      },
      {
        title: "مؤشرات أداء قابلة للقياس (KPIs)",
        description:
          "تتبع دقيق لمعدل الوصول في الموعد المحدد (يفوق 99.6% باستمرار)، ونسبة الحوادث الصفرية، وتقييمات العملاء المباشرة.",
        icon: "BarChart3",
      },
      {
        title: "استبيانات وملاحظات العملاء",
        description:
          "جمع منظم لملاحظات مسؤولي السفر بالشركات والركاب بعد كل مهمة، وتتم مراجعتها مباشرة من قِبل الإدارة العليا.",
        icon: "Star",
      },
      {
        title: "إشعار الحوادث خلال 15 دقيقة",
        description:
          "بروتوكول مكتوب وملزم يضمن تصعيد أي طارئ كتابياً وتقديم الحلول البديلة لجهة الاتصال المعتمدة خلال 15 دقيقة.",
        icon: "BellRing",
      },
      {
        title: "تطوير مستمر قائم على البيانات",
        description:
          "الدروس المستفادة والتقارير التحليلية بعد القمم والفعاليات الكبرى يتم تضمينها باستمرار في مناهج تدريب السائقين.",
        icon: "TrendingUp",
      },
    ],
  },
  closingCta: {
    eyebrow: "عش تجربة الفخامة الحقيقية",
    heading: "جرّب معايير شركة AB.",
    description:
      "سواء كانت رحلتك استقبالاً لمسؤول تنفيذي واحد أو فعالية ضخمة تمتد لأسابيع بمئات المركبات، تُقدم كل رحلة بنفس المستوى الرفيع من الجودة.",
    primaryCta: "اطلب عرض سعر",
    secondaryCta: "تحدث مع فريقنا",
  },
};
