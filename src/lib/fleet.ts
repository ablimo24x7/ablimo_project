import { localeBase } from "@/app/[lang]/dictionaries";

export type FleetLang = "en" | "ar";

export interface FleetVehicleRichCopy {
  heroTitle: string;
  heroSubtitle: string;
  heroParagraphs: string[];
  idealForSummary: string;
  inside: {
    badge: string;
    title: string;
    paragraphs: string[];
    image: string;
    imageAlt: string;
    caption: string;
  };
  onboard: {
    badge: string;
    title: string;
    intro?: string;
    amenities: { title: string; desc: string }[];
  };
  useCases: {
    badge: string;
    title: string;
    intro?: string;
    cases: { title: string; desc: string }[];
  };
  services: {
    badge: string;
    title: string;
    intro?: string;
    items: { title: string; desc: string; href?: string }[];
  };
  comparison: {
    badge: string;
    title: string;
    intro?: string;
    headers: string[];
    rows: string[][];
  };
  coverage: {
    badge: string;
    title: string;
    paragraphs: string[];
  };
  faqs: {
    badge: string;
    title: string;
    items: { question: string; answer: string }[];
  };
  cta: {
    title: string;
    subtitle: string;
    paragraphs: string[];
  };
}

export interface FleetVehicleCopy {
  title: string;
  model: string;
  tagline: string;
  description: string[];
  features: { title: string; desc: string }[];
  idealFor: string[];
  richContent?: FleetVehicleRichCopy;
}

export interface FleetVehicle {
  slug: string;
  category: "sedan" | "suv" | "van" | "bus";
  /** Invisible anchor spans rendered on the fleet grid for header-menu jumps. */
  anchors?: string[];
  image: string;
  heroExteriorImage?: string;
  gallery: string[];
  passengers: string;
  luggage: string;
  copy: Record<FleetLang, FleetVehicleCopy>;
}

export const FLEET_HERO_IMAGE = "/fleet/hero-banner.jpg";

export interface FleetClass {
  id: string;
  slug: string;
  name: Record<FleetLang, string>;
  category: Record<FleetLang, string>;
  typicalModel: Record<FleetLang, string>;
  guests: string;
  luggage: string;
  idealFor: Record<FleetLang, string>;
  tagline: Record<FleetLang, string>;
  description: Record<FleetLang, string>;
  image: string;
  interiorImage: string;
  interiorLabel: Record<FleetLang, string>;
}

export const FLEET_CLASSES: FleetClass[] = [
  {
    id: "standard-sedan",
    slug: "standard-sedan",
    name: {
      en: "Standard Sedan",
      ar: "سيدان قياسية",
    },
    category: {
      en: "Sedan",
      ar: "سيدان",
    },
    typicalModel: {
      en: "Lexus ES or similar",
      ar: "لكزس ES أو ما يعادلها",
    },
    guests: "3",
    luggage: "2",
    idealFor: {
      en: "Airport runs and city meetings",
      ar: "رحلات المطار واجتماعات المدينة",
    },
    tagline: {
      en: "Efficient, quiet mobility for daily business schedules.",
      ar: "تنقل هادئ وفعّال لجدول الأعمال والاجتماعات اليومية.",
    },
    description: {
      en: "The Standard Sedan category provides efficient, quiet mobility for daily business schedules. It delivers a smooth ride across dense metropolitan centres, offering dependable comfort without sacrificing professional discretion. This class suits airport runs and city meetings where discreet travel is required, maintaining swift progress through urban corridors.",
      ar: "توفر فئة السيدان القياسية تنقلاً هادئاً وفعالاً لجدول الأعمال اليومي. تمنحك قيادة سلسة في المراكز الحضرية الكبرى مع راحة موثوقة وخصوصية مهنية تامة. تناسب هذه الفئة رحلات المطار واجتماعات العمل في المدينة وتضمن دقة المواعيد وانسيابية الحركة عبر الطرق الحضرية.",
    },
    image: "/cars/sedans/LEXUS.png",
    interiorImage: "/fleet/www.ab.limo-fleet-standard-sedan-images/image2.jpg",
    interiorLabel: {
      en: "Standard Sedan interior cabin configuration with premium leather seating.",
      ar: "تصميم المقصورة الداخلية لفئة السيدان القياسية بمقاعد جلدية فاخرة.",
    },
  },
  {
    id: "business-sedan",
    slug: "business-sedan",
    name: {
      en: "Business Sedan",
      ar: "سيدان رجال الأعمال",
    },
    category: {
      en: "Executive sedan",
      ar: "سيدان تنفيذية",
    },
    typicalModel: {
      en: "Mercedes E Class or similar",
      ar: "مرسيدس فئة E أو ما يعادلها",
    },
    guests: "3",
    luggage: "2",
    idealFor: {
      en: "Executives and corporate roadshows",
      ar: "التنفيذيون وجولات الأعمال المؤسسية",
    },
    tagline: {
      en: "The corporate benchmark for visiting executives and intensive roadshows.",
      ar: "المعيار المؤسسي للتنفيذيين الزائرين وجولات الأعمال المكثفة.",
    },
    description: {
      en: "The Business Sedan represents the corporate benchmark for visiting executives and intensive roadshows. An executive sedan with chauffeur pairing offers rear cabin workspace, mobile connectivity and complete acoustic insulation from surrounding traffic. AB maintains every executive vehicle to immaculate mechanical criteria for senior managers moving between financial districts, headquarters and client briefings.",
      ar: "تمثل سيدان رجال الأعمال المعيار المعتمد لتنقلات كبار المسؤولين الزائرين وجولات المستثمرين المكثفة. توفر مع سائقها الخاص مساحة عمل خلفية هادئة واتصالاً مستمراً وعزلاً صوتياً فائقاً عن ضجيج الحركة المرورية، ملبيةً أعلى معايير الصيانة الميكانيكية للتحرك بين مقرات الشركات والمناطق المالية.",
    },
    image: "/cars/sedans/BMW.png",
    interiorImage: "/fleet/www.ab.limo-fleet-business-sedan-images/image2.jpg",
    interiorLabel: {
      en: "Business Sedan passenger compartment configured for mobile productivity.",
      ar: "مقصورة ركاب سيدان رجال الأعمال المهيأة للإنتاجية أثناء التنقل.",
    },
  },
  {
    id: "first-class-sedan",
    slug: "luxury-sedan",
    name: {
      en: "First Class Sedan",
      ar: "سيدان الدرجة الأولى",
    },
    category: {
      en: "Flagship sedan",
      ar: "سيدان رائدة",
    },
    typicalModel: {
      en: "Mercedes S Class or similar",
      ar: "مرسيدس فئة S أو ما يعادلها",
    },
    guests: "3",
    luggage: "2",
    idealFor: {
      en: "Principals, VIPs and state occasions",
      ar: "كبار الشخصيات والوفود والمناسبات الرسمية",
    },
    tagline: {
      en: "The flagship sedan class for high profile state occasions, principals and visiting VIP delegations.",
      ar: "الفئة الرائدة للمناسبات الرسمية الرفيعة وكبار الشخصيات والوفود الدبلوماسية.",
    },
    description: {
      en: "The First Class Sedan is the flagship sedan class for high profile state occasions, principals and visiting VIP delegations. Providing uncompromising ride quality, these black chauffeur cars create an environment of serenity and complete operational security. Each vehicle features reclining rear seating, private acoustic glazing and individual climate zones.",
      ar: "تعد سيدان الدرجة الأولى الفئة الرائدة في أسطولنا للمناسبات الرسمية العليا والوفود الدبلوماسية والشخصيات الرفيعة. توفر تجربة ركوب استثنائية ضمن بيئة يسودها الهدوء التام والأمان التشغيلي الشامل، بمقاعد خلفية قابلة للإمالة، وزجاج عازل للصوت، ومناطق تكييف مستقلة.",
    },
    image: "/cars/sedans/msc.png",
    interiorImage: "/fleet/www.ab.limo-fleet-first-class-sedan-images/image2.jpg",
    interiorLabel: {
      en: "First Class Sedan rear cabin appointments for diplomatic and VIP travel.",
      ar: "تجهيزات المقصورة الخلفية لسيدان الدرجة الأولى للسفر الدبلوماسي وكبار الشخصيات.",
    },
  },
  {
    id: "executive-suv",
    slug: "luxury-suv",
    name: {
      en: "Executive SUV",
      ar: "دفع رباعي تنفيذي",
    },
    category: {
      en: "SUV",
      ar: "دفع رباعي",
    },
    typicalModel: {
      en: "Cadillac Escalade or similar",
      ar: "كاديلاك اسكاليد أو ما يعادلها",
    },
    guests: "6",
    luggage: "5",
    idealFor: {
      en: "Families and diplomatic protocol movements",
      ar: "العائلات ومواكب البروتوكول الدبلوماسي",
    },
    tagline: {
      en: "Commanding elevation, substantial luggage room and an imposing presence.",
      ar: "رؤية مرتفعة وحضور مهيب وسعة أمتعة رحبة لمواكب البروتوكول.",
    },
    description: {
      en: "The Executive SUV provides commanding elevation, substantial luggage room and an imposing presence for diplomatic motorcades. A luxury SUV with driver allows families and executive protection details to travel together with extensive baggage. Its reinforced chassis and generous third row seating accommodate long-range intercity routes across the GCC with maximum comfort and security.",
      ar: "توفر مركبات الدفع الرباعي التنفيذية حضوراً قيادياً مهيباً ومساحة أمتعة رحبة لمواكب البروتوكول الدبلوماسي. تتيح للعائلات وفرق الحراسة التنفيذية السفر معاً مع كامل الأمتعة، وتتميز بهيكل مقوى وثلاثة صفوف مقاعد مرنة تلائم الرحلات الطويلة بين المدن بأعلى مستويات الأمان والراحة.",
    },
    image: "/cars/suvs/CADILAC.png",
    interiorImage: "/fleet/executive-suv-interior.jpg",
    interiorLabel: {
      en: "Executive SUV interior layout with flexible three row seating capacity.",
      ar: "تصميم المقصورة الداخلية للدفع الرباعي بسعة ثلاثة صفوف مقاعد مرنة.",
    },
  },
  {
    id: "premium-mpv",
    slug: "business-van",
    name: {
      en: "Premium MPV",
      ar: "فان فاخر MPV",
    },
    category: {
      en: "MPV",
      ar: "فان متعدد الاستخدامات",
    },
    typicalModel: {
      en: "Mercedes V Class or similar",
      ar: "مرسيدس فئة V أو ما يعادلها",
    },
    guests: "6",
    luggage: "5",
    idealFor: {
      en: "Delegations and small travelling teams",
      ar: "الوفود وفرق العمل والاجتماعات",
    },
    tagline: {
      en: "Face-to-face conference seating configurations for productive travel.",
      ar: "ترتيب مقاعد متقابلة للاجتماعات والإنتاجية أثناء التنقل.",
    },
    description: {
      en: "The Premium MPV category answers the logistical demands of conference delegations and corporate workgroups. Booking a Mercedes V Class with driver provides face-to-face conference seating configurations, allowing colleagues to prepare for meetings while travelling. Large sliding doors and an expansive rear boot allow rapid boarding and efficient luggage handling during busy airport sequences.",
      ar: "تلبي فئة MPV الفاخرة متطلبات فرق العمل ووفود المؤتمرات. يتيح حجز مرسيدس فئة V مع سائق ترتيب مقاعد كابتن متقابلة على طراز قاعات الاجتماعات لإعداد العروض والتنسيق أثناء السير، مع أبواب جانبية كهربائية منزلقة وصندوق أمتعة واسع لحركة سريعة ومريحة في المطارات.",
    },
    image: "/cars/vans/V_Class.png",
    interiorImage: "/fleet/www.ab.limo-fleet-executive-van-images/image2.jpg",
    interiorLabel: {
      en: "Premium MPV rear lounge arranged in a face to face conference configuration.",
      ar: "مقصورة فان MPV الفاخرة بترتيب قاعة اجتماعات متقابلة ومريحة.",
    },
  },
  {
    id: "executive-van",
    slug: "sprinter",
    name: {
      en: "Executive Van",
      ar: "حافلة صغيرة تنفيذية",
    },
    category: {
      en: "Van",
      ar: "فان تنفيذي",
    },
    typicalModel: {
      en: "Mercedes Sprinter or similar",
      ar: "مرسيدس سبرينتر أو ما يعادلها",
    },
    guests: "14",
    luggage: "10",
    idealFor: {
      en: "Event shuttles and corporate offsites",
      ar: "نقل الفعاليات والمؤتمرات وجولات المواقع",
    },
    tagline: {
      en: "High-capacity executive transport with standing headroom and generous luggage holds.",
      ar: "نقل تنفيذي عالي السعة مع ارتفاع وقوف مريح ومساحة أمتعة واسعة.",
    },
    description: {
      en: "The Executive Van is engineered for larger team movements, site inspections and high volume event shuttles. Delivering standing headroom and generous luggage holds, it keeps entire groups travelling on a unified timetable. Each leather appointed seat features personal reading lamps, storage pockets and USB charging access.",
      ar: "صُممت الحافلة الصغيرة التنفيذية لتنقلات فرق العمل الكبيرة، وجولات تفقد المواقع، ومكوكات الفعاليات الضخمة. توفر ارتفاع وقوف مريح ومساحة أمتعة شاسعة لإبقاء المجموعات على جدول زمني موحد، مع مقاعد جلدية فردية مجهزة بإضاءة قراءة ومنافذ شحن USB.",
    },
    image: "/cars/vans/Sprinter.png",
    interiorImage: "/fleet/www.ab.limo-fleet-premium-mpv-images/image2.jpg",
    interiorLabel: {
      en: "Executive Van passenger compartment configured for corporate shuttle service.",
      ar: "مقصورة ركاب الحافلة الصغيرة التنفيذية المجهزة لخدمات نقل وفود الشركات.",
    },
  },
  {
    id: "coach",
    slug: "king-long-bus",
    name: {
      en: "Luxury Coach",
      ar: "حافلة فاخرة",
    },
    category: {
      en: "Coach",
      ar: "حافلة",
    },
    typicalModel: {
      en: "King Long Bus or similar",
      ar: "باص كينج لونج أو ما يعادلها",
    },
    guests: "43–49",
    luggage: "30",
    idealFor: {
      en: "Delegations, events and staff programmes",
      ar: "الوفود والفعاليات وبرامج الموظفين",
    },
    tagline: {
      en: "Full-size coach for large delegations and long regional transfers.",
      ar: "حافلة بحجم كامل للوفود الكبيرة والتنقلات الإقليمية الطويلة.",
    },
    description: {
      en: "The Coach class consolidates large passenger movements into a single, professionally coordinated dispatch. Ergonomic reclining seats, wide central aisles and voluminous underfloor storage keep delegations comfortable across long regional transfers, while central dispatch maintains live GPS tracking and flight monitoring from Riyadh.",
      ar: "تجمع فئة الحافلات حركات الركاب الكبيرة في إرسال واحد منسق باحتراف. توفر المقاعد القابلة للإمالة والممرات الواسعة وخزائن الأمتعة السفلية راحة الوفود عبر التنقلات الإقليمية الطويلة، مع تتبع GPS مباشر ومراقبة للرحلات الجوية من مركز العمليات في الرياض.",
    },
    image: "/cars/buses/King_Long_bus.png",
    interiorImage: "/fleet/www.ab.limo-fleet-coach-images/image2.jpg",
    interiorLabel: {
      en: "Luxury coach cabin with reclining seating and a wide central aisle.",
      ar: "مقصورة الحافلة الفاخرة بمقاعد قابلة للإمالة وممر مركزي واسع.",
    },
  },
  {
    id: "bus",
    slug: "mini-bus",
    name: {
      en: "Mini Bus",
      ar: "ميني باص",
    },
    category: {
      en: "Bus",
      ar: "باص داخلي",
    },
    typicalModel: {
      en: "Maxus V90 or similar",
      ar: "ماكس V90 أو ما يعادلها",
    },
    guests: "20–25",
    luggage: "15",
    idealFor: {
      en: "Hotel shuttles and staff transport",
      ar: "باصات الفنادق ونقل الموظفين",
    },
    tagline: {
      en: "Right-sized group transport for daily shuttles and venue loops.",
      ar: "نقل جماعي مناسب لباصات الفنادق اليومية وحلقات المواقع.",
    },
    description: {
      en: "The Mini Bus covers the middle ground of group travel: twenty to twenty-five seats with generous headroom, aisle access and luggage space sized for hotel shuttles and airport rotations. Every unit is presented in the AB brand standard with a professional chauffeur and dispatch coordination for each movement.",
      ar: "يغطي الميني باص منطقة الوسطى من السفر الجماعي: عشرون إلى خمسة وعشرون مقعداً مع مساحة رأس واسعة وممرات مريحة ومساحة أمتعة تناسب باصات الفنادق ودوران المطارات. تُقدَّم كل وحدة وفق معيار هوية AB مع سائق محترف وتنسيق إرسال لكل حركة.",
    },
    image: "/cars/vans/Maxus.png",
    interiorImage: "/fleet/executive-van-interior.jpg",
    interiorLabel: {
      en: "Mini bus passenger cabin configured for daily group shuttle service.",
      ar: "مقصورة ركاب الميني باص المجهزة لخدمات النقل الجماعي اليومي.",
    },
  },
];

export interface FleetFaq {
  q: Record<FleetLang, string>;
  a: Record<FleetLang, string>;
}

export const FLEET_FAQS: FleetFaq[] = [
  {
    q: {
      en: "What vehicle age and colour standards apply across the fleet?",
      ar: "ما هي معايير عمر المركبات واللون المعتمدة في الأسطول؟",
    },
    a: {
      en: "All AB vehicles are late model editions presented exclusively in uniform gloss black. Chauffeur vehicles in Saudi Arabia, the UAE and Qatar undergo daily mechanical reviews and complete detailing before every assignment. This strict standard maintains visual uniformity across multi-car motorcades and high profile corporate gatherings.",
      ar: "جميع سيارات AB موديلات حديثة تقدم حصرياً باللون الأسود اللامع الموحد. وتخضع سيارات السائق في المملكة العربية السعودية والإمارات وقطر لفحوصات ميكانيكية يومية وتنظيف شامل قبل كل مهمة، مما يضمن اتساقاً بصرياً تاماً في مواكب السيارات المتعددة واللقاءات الرسمية.",
    },
  },
  {
    q: {
      en: "How does AB verify luggage space for passenger groups?",
      ar: "كيف تتحقق AB من مساحة الأمتعة المناسبة للمجموعات؟",
    },
    a: {
      en: "Each class listing specifies strict capacity limits for passenger seating and standard check-in luggage pieces. Sedans accommodate up to two large bags, whereas executive SUVs and MPVs manage five full-size suitcases. Our dispatch team helps travel managers select the appropriate vehicle to avoid compromising passenger comfort.",
      ar: "تحدد كل فئة سعة دقيقة لعدد الركاب وقطع الأمتعة المعيارية. تستوعب سيارات السيدان ما يصل إلى حقيبتين كبيرتين، بينما تتسع سيارات الدفع الرباعي وفانات MPV لخمس حقائب كبيرة، وتتسع الحافلات الصغيرة لـ 10 حقائب. ويساعد فريق التوجيه المركزي مديري السفر على اختيار المركبة المناسبة لضمان الراحة التامة.",
    },
  },
  {
    q: {
      en: "What professional standards are required of chauffeurs?",
      ar: "ما هي المعايير المهنية المعتمدة للسائقين؟",
    },
    a: {
      en: "Every professional chauffeur undergoes defensive driver vetting, security background clearance and bilingual communication training. Chauffeurs observe strict protocol etiquette, maintain complete non-disclosure regarding cabin discussions and wear formal dark suits. Central operations maintains continuous communication with drivers throughout each journey.",
      ar: "يخضع كل سائق محترف لفحص قيادة وقائية وتدقيق أمني شامل وتدريب على التواصل ثنائي اللغة والبروتوكول التنفيذي. ويلتزم السائقون بالسرية التامة لجميع المحادثات داخل المقصورة ويرتدون بذلات رسمية داكنة، مع اتصال مباشر ومستمر بغرفة العمليات طوال الرحلة.",
    },
  },
  {
    q: {
      en: "How are airport transfers coordinated for commercial flights?",
      ar: "كيف يتم تنسيق رحلات استقبال وتوديع المطار للرحلات التجارية؟",
    },
    a: {
      en: "Our operations desk monitors inbound commercial flights using live tracking software to account for early arrivals or flight delays. Chauffeurs initiate terminal meet and greet procedures, holding a personalised digital name board at the arrival gate. Luggage assistance is provided directly from the arrivals hall to the awaiting vehicle.",
      ar: "يرصد مكتب العمليات رحلات الطيران القادمة لحظة بلحظة باستخدام برامج تتبع جوي حية لاحتساب أي تقديم أو تأخير في موعد الهبوط. ويبدأ السائق إجراءات الاستقبال حاملاً لوحة رقمية باسم الضيف عند بوابة الخروج، مع تقديم المساعدة في نقل الأمتعة حتى المركبة.",
    },
  },
  {
    q: {
      en: "Can corporate clients open central billing accounts with monthly invoices?",
      ar: "هل يمكن للشركات فتح حسابات مركزية مع فواتير شهرية موحدة؟",
    },
    a: {
      en: "Corporate accounts are available for verified businesses, protocol offices and multinational event organisations. Account facilities provide consolidated monthly invoice billing, detailed passenger manifests and transparent route summaries. Dedicated mobility coordinators manage account reservations to simplify travel administration.",
      ar: "تتوفر الحسابات المؤسسية للشركات المعتمدة، ومكاتب البروتوكول، ومنظمي المؤتمرات والفعاليات. وتوفر التسهيلات فواتير شهرية موحدة، وكشوفات ركاب مفصلة، وملخصات مسارات واضحة مع منسق تنقل مخصص لكل حساب لتسهيل إدارة الرحلات.",
    },
  },
  {
    q: {
      en: "Which countries and cities does AB serve directly?",
      ar: "ما هي الدول والمدن التي تخدمها AB بشكل مباشر؟",
    },
    a: {
      en: "AB operates direct ground transportation across Saudi Arabia (Riyadh, Jeddah, Mecca, Medina, Dammam, AlUla, NEOM), all seven UAE emirates (Dubai, Abu Dhabi, Sharjah) and Qatar (Doha). Extended movements in Bahrain, Kuwait and Oman are supported upon request through vetted protocol partners.",
      ar: "تدير AB أساطيل تنقل مباشرة في المملكة العربية السعودية (الرياض، جدة، مكة، المدينة، الدمام، العلا، نيوم)، وجميع إمارات دولة الإمارات السبع (دبي، أبوظبي، الشارقة)، ودولة قطر (الدوحة). كما تدعم تنقلات موسعة في البحرين والكويت وسلطنة عمان عند الطلب عبر شبكة شركاء معتمدين.",
    },
  },
  {
    q: {
      en: "How are multi-vehicle movements managed for major conferences?",
      ar: "كيف تتم إدارة مواكب السيارات المتعددة للمؤتمرات الكبرى؟",
    },
    a: {
      en: "Large delegations receive dedicated project management from our 24/7 dispatch desk in Riyadh. Onsite transport leads coordinate vehicle staging, route timing and delegate boarding to avoid bottlenecks at venue checkpoints. Real time telematics allow operations managers to monitor the entire convoy continuously.",
      ar: "تحظى الوفود الكبرى بإدارة مشاريع مخصصة من مركز العمليات الرئيسي في الرياض على مدار الساعة. وينسق قادة النقل الميداني تمركز المركبات وتوقيت المسارات وصعود الضيوف لتفادي أي تكدس عند نقاط التفتيش ومداخل الفعاليات، مع تتبع رقمي فوري لجميع سيارات الموكب.",
    },
  },
];

export const FLEET_COACH_INFO = {
  title: {
    en: "Chauffeur fleet coach options for delegations",
    ar: "خيارات الحافلات الفاخرة للوفود والمؤتمرات",
  },
  subtitle: {
    en: "Planning major event movements",
    ar: "تخطيط تنقلات الفعاليات والمؤتمرات الكبرى",
  },
  description: {
    en: "For large international summits and complex corporate congresses, AB arranges full size coach hire with driver services. Organisers planning regional conferences secure luxury bus rental programmes and cross-emirate transfers through our dedicated fleet team. Review full size motor coaches, luxury 35-seat mid coaches and 50-passenger charter configurations for large scale protocol operations.",
    ar: "للقمم الدولية الكبرى ومؤتمرات الشركات المعقدة، تنظم AB خدمات استئجار الحافلات الفاخرة بسائقين محترفين. يستفيد منظمو الفعاليات الإقليمية من برامج تأجير الحافلات الفاخرة وخدمات النقل بين المدن والإمارات من خلال فريق الأسطول المخصص. استعرض الحافلات الكبيرة، وحافلات الـ 35 راكباً الفاخرة، وحافلات الـ 50 مقعداً لعمليات البروتوكول الواسعة.",
  },
  image: "/fleet/coach-delegation.jpg",
  badge: {
    en: "DELEGATION COACHES",
    ar: "حافلات الوفود الرسمية",
  },
  dutyOfCare: {
    en: "All classes operate under comprehensive duty of care oversight, continuous GPS tracking and real time flight monitoring from our operations centre in Riyadh.",
    ar: "تعمل جميع فئات الأسطول تحت إشراف شامل لمعايير العناية المؤسسية، وتتبع GPS مستمر، ومراقبة فورية للرحلات الجوية من مركز عملياتنا في الرياض.",
  },
};

export const FLEET_VEHICLES: FleetVehicle[] = [
{
slug: "luxury-sedan",
category: "sedan",
anchors: ["luxury", "sedans"],
image: "/cars/sedans/msc.png",
heroExteriorImage: "/fleet/www.ab.limo-fleet-first-class-sedan-images/image1.jpg",
gallery: ["/fleet/www.ab.limo-fleet-first-class-sedan-images/image1.jpg", "/fleet/www.ab.limo-fleet-first-class-sedan-images/image2.jpg", "/cars/sedans/msc.png"],
passengers: "3",
luggage: "2",
copy: {
en: {
title: "First Class Business Sedan",
model: "Mercedes S Class",
tagline: "Flagship comfort for executives, VIPs and diplomatic delegations.",
description: [
"The Mercedes S-Class is our flagship sedan: rear executive seating, a whisper-quiet cabin and the presence expected at the highest level of protocol. It is the default choice for board-level travel, state visits and airport VIP arrivals.",
"Every S-Class is presented in the AB brand standard — immaculate, late-model and strictly black — and dispatched with a professional chauffeur trained in executive etiquette and security awareness.",
],
features: [
{ title: "Executive rear seating", desc: "Reclining rear seats with massage, climate zones and legroom designed for working or resting in transit." },
{ title: "Whisper-quiet cabin", desc: "Active noise cancellation and air suspension keep calls, meetings and conversations private." },
{ title: "Wi-Fi & refreshments", desc: "Onboard connectivity, device charging and refreshments on every journey." },
{ title: "Airport meet & greet", desc: "Name-board greeting, luggage assistance and terminal-side pickup for arrivals and departures." },
],
idealFor: [
"Board members and C-suite travel",
"Diplomatic and state delegations",
"Airport VIP and private-aviation transfers",
"Weddings, galas and formal events",
],
richContent: {
heroTitle: "First Class Sedan Chauffeur Service",
heroSubtitle: "The First Class Sedan offers discreet, comfortable executive travel across Saudi Arabia, the UAE and Qatar.",
heroParagraphs: [
"The First Class Sedan offers discreet, comfortable executive travel across Saudi Arabia, the UAE and Qatar. This chauffeur service is suited to principals, VIP guests and business travellers who value a calm cabin, reclining rear seats and attentive service. A Mercedes S Class is a typical model in this class, alongside a comparable vehicle where supplied.",
"Choose this luxury sedan for corporate itineraries, formal events or individual journeys between meetings. A professional chauffeur provides a dedicated car and driver for your trip, helping you travel comfortably between appointments. The Mercedes S Class chauffeur option combines the refinement expected of a First Class vehicle with practical transport for up to three guests and two pieces of luggage. Confirm your party's requirements when you book, as the model and capacity depend on the vehicle assigned.",
"Whether you need a First Class chauffeur service for business travel or a class driver in Riyadh for a formal occasion, share your itinerary and collection details with our team. For larger delegations requiring additional vehicles, ask about options such as a Mercedes-Benz Sprinter. The First Class Sedan remains a focused choice for individual executives and small groups seeking a polished journey, with a Mercedes-Benz S-Class driver and vehicle provided according to the confirmed booking."
],
idealForSummary: "Principals, VIPs and occasions",
inside: {
badge: "Inside",
title: "Inside the Mercedes S Class Chauffeur Cabin",
paragraphs: [
"The rear cabin of a First Class Sedan gives passengers a quiet, comfortable place to work or unwind between appointments. As part of a class chauffeur service, the vehicle is prepared for executive travel, with a professional chauffeur and a calm setting for calls, reading or rest. The Mercedes Benz Class cabin experience depends on the specific vehicle assigned to your trip, so confirm available features when booking.",
"Reclining rear seats and generous legroom help make city journeys and longer transfers more comfortable. Rear-seat adjustments support different sitting positions, while climate control lets passengers set a comfortable temperature. Acoustic glass helps reduce outside traffic noise. Upholstery varies by vehicle, so check whether the booked car has leather seats if this is important to you. These practical details help a class chauffeur make the journey more comfortable without distracting from the passenger's schedule.",
"Where fitted, acoustic glass and rear privacy blinds offer a quieter, more private cabin for business conversations. Larger groups can ask about options such as a Mercedes-Benz Sprinter, while individual chauffeurs provide dedicated transportation for senior leaders."
],
image: "/fleet/www.ab.limo-fleet-first-class-sedan-images/image2.jpg",
imageAlt: "Mercedes S Class luxury rear cabin interior",
caption: "Reclining rear seats, acoustic glass and generous legroom for executive travel."
},
onboard: {
badge: "Onboard",
title: "Refined Onboard Amenities and Connectivity",
intro: "Each First Class Sedan is prepared before collection to support passenger comfort and a productive journey. The chauffeur checks the cabin and requested preferences, while the operations team coordinates the booking across the service network. Amenities vary between vehicles, so confirm the details for your car before travel.",
amenities: [
{ title: "Complimentary Mineral Water", desc: "Bottled water is prepared for passengers where available. Confirm this amenity when booking your class service." },
{ title: "Multi Device Charging Ports", desc: "Power outlets and charging connections support phones, tablets and laptops during the journey. Cable types depend on the vehicle, so tell your chauffeur what you need in advance." },
{ title: "High Speed Wi Fi Connectivity", desc: "Onboard internet is subject to availability and coverage. Ask about connection access and performance before travel rather than relying on a specific data speed." },
{ title: "Individual Climate Control Zones", desc: "Where fitted, rear passengers can adjust the temperature and airflow for greater comfort in warm Gulf weather." }
]
},
useCases: {
badge: "Suitability",
title: "When to Choose the First Class Sedan",
intro: "Choose a First Class Sedan when you want a refined ride for a small party, with space for up to three guests and two pieces of luggage, as listed for this vehicle category. This luxury sedan suits business travel when a quiet cabin, professional presentation and dedicated chauffeur service matter more than extra passenger or cargo space.",
cases: [
{ title: "Corporate Principals", desc: "Executives can use the quiet cabin to take calls, review documents or prepare for a meeting. A dedicated driver helps keep the business itinerary moving between appointments." },
{ title: "Visiting VIP Guests", desc: "Arrange a chauffeur for visiting speakers, investors and dignitaries travelling between the airport and host venues. Confirm passenger and luggage numbers to make sure the sedan is suitable." },
{ title: "Special Occasions", desc: "For formal events, award ceremonies and diplomatic gatherings, a First Class Sedan offers a polished arrival and a comfortable journey. It also suits private leisure travel when refined service is a priority." }
]
},
services: {
badge: "Services",
title: "Services That Deploy the First Class Fleet",
intro: "The First Class Sedan is available through several service options coordinated by the AB operations team. Dispatch plans vehicle positioning around the itinerary and collection time, helping the chauffeur arrive ready for the scheduled journey. A Mercedes Benz S Class is a typical model, subject to availability.",
items: [
{ title: "Chauffeur and VIP", desc: "Protocol services for corporate principals, including class driver arrangements in Riyadh with the required protocol support for formal occasions.", href: "/services/chauffeur-vip" },
{ title: "Event Transportation", desc: "Organised motorcades, summit shuttles and VIP car pools. Confirm vehicle numbers, driver schedules and service availability for each event.", href: "/services/event-transportation" },
{ title: "Airport Transfers", desc: "Flight tracking, luggage assistance and a terminal meet greet service. Arrange a meet greet in advance and confirm the airport collection point and timing.", href: "/services/airport-transfers" },
{ title: "Fleet Diversity", desc: "Pair executive saloons with support vehicles such as a Mercedes-Benz Sprinter for larger delegations requiring additional capacity.", href: "/fleet" }
]
},
comparison: {
badge: "At a glance",
title: "Compare the First Class Sedan with Other Fleet Options",
intro: "Passenger numbers and luggage help travel organisers choose the right vehicle for each trip. The First Class Sedan is suited to smaller parties seeking a refined ride, while larger groups or bulky baggage may call for a different car. Confirm vehicle availability and capacity when arranging transportation, as models and luggage allowances can vary.",
headers: ["Vehicle Class", "Typical Model", "Guests", "Luggage", "Ideal for"],
rows: [
["First Class Sedan", "Mercedes S Class", "3", "2", "Principals, VIP guests and formal occasions requiring refined seating comfort"],
["Business Sedan", "BMW 5 Series", "3", "2", "Senior managers, solo business travellers and daily corporate roadshows"],
["Executive SUV", "GMC Yukon", "6", "5", "Delegation teams, families and travellers with extended luggage requirements"]
]
},
coverage: {
badge: "Coverage",
title: "Cities with Mercedes S Class Chauffeur Stations",
paragraphs: [
"AB coordinates chauffeur transportation across major cities in the Arabian Gulf. Established operating hubs support city and intercity transfers, as well as airport journeys. First Class Sedan availability depends on the location and vehicle schedule, so confirm the model and service when booking.",
"Direct fleet operations cover Riyadh, Jeddah, Dammam, Dubai, Abu Dhabi and Doha. Dispatch is coordinated from the Riyadh operations centre, with operations extending across the seven UAE emirates. Partner services are arranged in Bahrain, Kuwait and Oman upon request, with vehicle options and transfer arrangements confirmed for each destination."
]
},
faqs: {
badge: "Questions",
title: "Frequently Asked Questions About First Class Chauffeur Hire",
items: [
{ question: "What distinguishes a first class chauffeur from a standard driver?", answer: "A First Class chauffeur service is designed for executive travel, with professional presentation, courteous conduct and attention to passenger privacy. Chauffeur screening and protocol training follow the provider's procedures. A Mercedes-Benz S-Class driver coordinates with the operations team about the itinerary and collection details, and all drivers focus on safe, punctual transportation." },
{ question: "How does AB coordinate airport arrivals for executive travellers?", answer: "Airport transfers can include flight monitoring and a terminal meet and greet service, subject to the booking and location. Share your flight details and confirm the meeting point and collection time with the team. Meet and greet arrangements and luggage assistance vary by airport, so ask what the greet service includes before confirming your ride." },
{ question: "What luggage capacity is accommodated in the First Class Sedan?", answer: "The listed capacity is two pieces of luggage for up to three guests. Suitcase dimensions and the assigned car affect what fits, so provide your baggage details when booking. For oversized cases or extra equipment, request another vehicle, as the S-Class cabin prioritises passenger comfort rather than bulky cargo." },
{ question: "Can corporate clients establish centralised billing with monthly invoices?", answer: "Corporate account billing is available to approved clients. Itemised monthly invoices can include journey details, booking references and cost centre information. Confirm account eligibility and billing terms before arranging regular business travel." },
{ question: "How does AB support corporate duty of care standards?", answer: "Ask AB about vehicle servicing, driver screening and journey monitoring for your booking. The Mercedes-Benz S-Class chauffeur service can provide details of its procedures and the support available during travel, including dispatch operating hours and how travel managers can request updates about passenger status or itinerary progress." },
{ question: "Is the First Class Sedan available for hourly and daily hire?", answer: "Hourly and full-day hire options are available, subject to location and booking terms. An as-directed service keeps the car and chauffeur assigned to your itinerary for the agreed period, which suits meetings, site visits and events with several stops. Confirm the hire duration, waiting time and any additional charges when you book." },
{ question: "What amenities are prepared inside the vehicle prior to pick-up?", answer: "Amenities vary by vehicle. Confirm whether bottled water, charging connections, internet access or leather upholstery are included in your Mercedes-Benz S-Class booking, and share drink or route preferences in advance so the team can confirm which requests can be arranged for your journey." },
{ question: "Can intercity journeys between Gulf destinations be arranged?", answer: "Intercity transfers, including journeys between Dubai and Abu Dhabi or Dammam and Riyadh, can be requested through the service team. Confirm the destination, travel time and vehicle availability when booking a chauffeur. Cross-border journeys require advance checks on vehicle documentation and passenger clearance." }
]
},
cta: {
title: "Book a First Class Sedan or Plan a Larger Fleet Movement",
subtitle: "Plan Your Executive Ground Transportation",
paragraphs: [
"Arrange a First Class Sedan with a chauffeur for executive business travel, airport transfers or leisure journeys across Saudi Arabia, the UAE and Qatar. Share your destination, collection time and travel plans with our team. For events or larger groups, request coordinated transportation with multiple cars and drivers.",
"Our chauffeur service supports individual bookings and multi-vehicle movements. Tell us the service you need, the day of travel and any preferences, such as bottled water in the car. Clients arranging a First Class Sedan can request a booking or ask the team for a proposal covering larger fleet requirements."
]
}
},
},
ar: {
title: "سيدان أعمال الدرجة الأولى",
model: "مرسيدس-بنز فئة S",
tagline: "راحة رائدة لل التنفيذيين وكبار الشخصيات والوفود الدبلوماسية.",
description: [
"مرسيدس فئة S هي سيارتنا الرائدة: مقاعد خلفية تنفيذية، مقصورة شبه صامتة، والحضور المطلوب في أعلى مستويات البروتوكول، وهي الخيار الافتراضي لسفر كبار المسؤولين والزيارات الرسمية ووصول كبار الشخصيات إلى المطارات.",
"تُقدَّم كل فئة S وفق معيار هوية AB — نظيفة وحديثة وسوداء بشكل صارم — مع سائق محترف مدرب على آداب التنفيذ والوعي الأمني.",
],
features: [
{ title: "مقاعد خلفية تنفيذية", desc: "مقاعد خلفية قابلة للإمالة مع تدليك ومناطق مناخية ومساحة أرجل مصممة للعمل أو الراحة أثناء التنقل." },
{ title: "مقصورة شبه صامتة", desc: "عزل ضوضاء نشط وتعليق هوائي يحفظان المكالمات والاجتماعات والمحادثات في سرية تامة." },
{ title: "واي فاي وضيافة", desc: "اتصال على متن السيارة وشحن للأجهزة وضيافة خفيفة في كل رحلة." },
{ title: "استقبال في المطار", desc: "استقبال بالاسم، مساعدة في الأمتعة، واستلام من مبنى الرحلات للقدوم والمغادرة." },
],
idealFor: [
"سفر أعضاء مجالس الإدارة والمديرين التنفيذيين",
"الوفود الدبلوماسية والرسمية",
"النقل الخاص من وإلى المطارات",
"الأعراس والحفلات والمناسبات الرسمية",
],
},
},
},
{
slug: "bmw-7-series",
category: "sedan",
image: "/cars/sedans/BMW.png",
gallery: ["/cars/sedans/BMW.png", "/cars/sedans/LEXUS.png", "/cars/sedans/msc.png"],
passengers: "3",
luggage: "2",
copy: {
en: {
title: "First Class Business Sedan",
model: "BMW 7 Series",
tagline: "Driver-focused flagship performance for first-class business travel.",
description: [
"The BMW 7 Series brings a sporting character to first-class travel: rear executive seating, air suspension and a cabin engineered for quiet, productive hours between meetings.",
"Every unit is presented in the AB brand standard — immaculate, late-model and strictly black — and dispatched with a professional chauffeur trained in executive etiquette and security awareness.",
],
features: [
{ title: "Executive rear seating", desc: "Reclining rear seats with climate zones, massage options and generous legroom for working or resting in transit." },
{ title: "Quiet, composed ride", desc: "Air suspension and acoustic glass isolate the cabin from traffic so calls and conversations stay private." },
{ title: "Wi-Fi & refreshments", desc: "Onboard connectivity, device charging and refreshments on every journey." },
{ title: "Airport meet & greet", desc: "Name-board greeting, luggage assistance and terminal-side pickup for arrivals and departures." },
],
idealFor: [
"Board-level and C-suite travel",
"Corporate delegations and site visits",
"Airport VIP and private-aviation transfers",
"Roadshows and formal events",
],
},
ar: {
title: "سيدان أعمال الدرجة الأولى",
model: "BMW الفئة السابعة",
tagline: "أداء رائد بأناقة ألمانية لسفر الأعمال الدرجة الأولى.",
description: [
"تمنح BMW الفئة السابعة طابعًا رياضيًا لسفر الدرجة الأولى: مقاعد خلفية تنفيذية، وتعليق هوائي، ومقصورة مصممة لساعات عمل هادئة بين الاجتماعات.",
"تُقدَّم كل سيارة وفق معيار هوية AB — نظيفة وحديثة وسوداء بشكل صارم — مع سائق محترف مدرب على آداب التنفيذ والوعي الأمني.",
],
features: [
{ title: "مقاعد خلفية تنفيذية", desc: "مقاعد خلفية قابلة للإمالة مع مناطق مناخية وخيارات تدليك ومساحة أرجل واسعة للعمل أو الراحة أثناء التنقل." },
{ title: "ركود هادئ ومريح", desc: "تعليق هوائي وزجاج صوتي يعزلان المقصورة عن حركة المرور لتبقى المكالمات خاصة." },
{ title: "واي فاي وضيافة", desc: "اتصال على متن السيارة وشحن للأجهزة وضيافة خفيفة في كل رحلة." },
{ title: "استقبال في المطار", desc: "استقبال بالاسم، مساعدة في الأمتعة، واستلام من مبنى الرحلات للقدوم والمغادرة." },
],
idealFor: [
"سفر أعضاء المجالس والمديرين التنفيذيين",
"الوفود المؤسسية والزيارات الميدانية",
"النقل الخاص من وإلى المطارات",
"جولات المستثمرين والمناسبات الرسمية",
],
},
},
},
{
    slug: "standard-sedan",
    category: "sedan",
    anchors: ["standard-sedan", "lexus-es"],
    image: "/cars/sedans/LEXUS.png",
    heroExteriorImage: "/fleet/www.ab.limo-fleet-standard-sedan-images/image1.jpg",
    gallery: [
      "/fleet/www.ab.limo-fleet-standard-sedan-images/image1.jpg",
      "/fleet/www.ab.limo-fleet-standard-sedan-images/image2.jpg",
      "/cars/sedans/LEXUS.png"
    ],
    passengers: "3",
    luggage: "2",
    copy: {
      en: {
        title: "Standard Sedan with Driver",
        model: "Lexus ES or similar",
        tagline: "Dependable, Quiet Mobility for Individual Executive Itineraries & Airport Runs",
        description: [
          "A standard sedan with driver provides dependable ground transportation across Saudi Arabia, the UAE and Qatar for individual executive itineraries. AB coordinates point to point city transfers and airport connections with professional chauffeurs and central dispatch support.",
          "Quiet, spotless and always on time, this vehicle class offers the sensible choice for airport runs and everyday meetings. Schedule requirements, passenger numbers and luggage volume determine when this efficient category fits corporate travel programmes."
        ],
        features: [
          { title: "Chilled Bottled Water", desc: "Complimentary bottled water is stocked in the rear compartment for passenger refreshment during journeys." },
          { title: "Mobile Device Chargers", desc: "Multi format charging cables keep mobile phones and electronic devices powered throughout the trip." },
          { title: "Onboard Wi-Fi", desc: "High speed wireless internet connectivity allows uninterrupted communication and mobile working between meetings." },
          { title: "Climate Control", desc: "Individual climate vents enable rear passengers to select comfortable temperatures in warm regional weather." }
        ],
        idealFor: [
          "Executive airport runs and terminal greetings",
          "City business meetings and multi-stop visits",
          "Partner, consultant and client itineraries",
          "Cost-conscious corporate staff transfers"
        ],
        richContent: {
          heroTitle: "Standard Sedan with Driver",
          heroSubtitle: "A standard sedan with driver provides dependable ground transportation across Saudi Arabia, the UAE and Qatar for individual executive itineraries.",
          heroParagraphs: [
            "A standard sedan with driver provides dependable ground transportation across Saudi Arabia, the UAE and Qatar for individual executive itineraries. AB coordinates point to point city transfers and airport connections with professional chauffeurs and central dispatch support.",
            "Quiet, spotless and always on time, this vehicle class offers the sensible choice for airport runs and everyday meetings. Schedule requirements, passenger numbers and luggage volume determine when this efficient category fits corporate travel programmes."
          ],
          idealForSummary: "Airport runs and city meetings",
          inside: {
            badge: "Inside",
            title: "Executive Interior Comfort in a Sedan with Driver",
            paragraphs: [
              "The rear seats in this class provide supportive seating tailored for working professionals moving between business appointments. Generous legroom permits passengers to open laptops comfortably or review briefing notes during transit. Acoustic glass keeps exterior traffic noise away from the cabin, establishing a serene workspace. Plush upholstery and independent climate vents maintain passenger comfort in high summer temperatures across the Gulf region. Every vehicle undergoes rigorous interior cleaning before each assignment.",
              "Corporate travellers appreciate an uncluttered environment that supports continuous focus during demanding travel schedules. The rear seats offer physical comfort alongside practical workspace features that make travel time productive. Smooth suspension tuning cushions rough road textures across urban motorways and secondary streets."
            ],
            image: "/fleet/www.ab.limo-fleet-standard-sedan-images/image2.jpg",
            imageAlt: "Spacious rear seats of an executive sedan with leather upholstery",
            caption: "The rear cabin provides an organised workspace with supportive seating."
          },
          onboard: {
            badge: "Onboard",
            title: "Standard Onboard Inclusions and Cabin Features",
            intro: "Every journey in an AB sedan includes dedicated amenities selected to support personal comfort and operational efficiency. Travellers receive essential mobile accessories and climate adjustments suited to regional conditions.",
            amenities: [
              { title: "Chilled Bottled Water", desc: "Complimentary bottled water is stocked in the rear compartment for passenger refreshment during journeys." },
              { title: "Mobile Device Chargers", desc: "Multi format charging cables keep mobile phones and electronic devices powered throughout the trip." },
              { title: "Onboard Wi-Fi", desc: "High speed wireless internet connectivity allows uninterrupted communication and mobile working between meetings." },
              { title: "Climate Control", desc: "Individual climate vents enable rear passengers to select comfortable temperatures in warm regional weather." }
            ]
          },
          useCases: {
            badge: "Suitability",
            title: "Selecting a Sedan with Driver for Corporate Schedules",
            intro: "Choosing a sedan with driver gives corporate travel planners an economical, dignified vehicle tier for daily executive movements. This class balances low carbon footprint and practical size with complete executive privacy.",
            cases: [
              { title: "Executive Airport Runs", desc: "Corporate travellers arriving on domestic or international flights receive prompt curbside pickup or terminal greetings. Efficient luggage capacity accommodates standard flight bags with ease." },
              { title: "City Business Meetings", desc: "Business executives visiting multiple commercial offices in a single day maintain productivity while their chauffeur manages parking, traffic navigation and tight schedules." },
              { title: "Partner and Client Itineraries", desc: "Visiting consultants and professional partners secure quiet transport across central business districts. Spotless presentation aligns with high diplomatic and institutional protocol requirements." }
            ]
          },
          services: {
            badge: "Services",
            title: "Managed Services Powered by the Standard Fleet",
            intro: "AB deploys the standard chauffeur car across diverse ground operations throughout Saudi Arabia, the UAE and Qatar. Our central operations team coordinates every booking with live GPS tracking and proactive flight monitoring.",
            items: [
              { title: "Airport Transfers", desc: "Flight tracked arrivals and punctual airport departures featuring terminal meet and greet services.", href: "/services/airport-transfers" },
              { title: "Chauffeur & VIP", desc: "Dedicated hourly hire and daily itineraries for corporate officers requiring continuous ground mobility.", href: "/services/chauffeur-vip" },
              { title: "Intercity Transfers", desc: "Scheduled city to city transit between regional economic centres with fixed business billing.", href: "/services/city-to-city-transfers" },
              { title: "Fleet Diversity", desc: "Explore our wider fleet selection to combine standard saloons with larger executive people movers.", href: "/fleet" }
            ]
          },
          comparison: {
            badge: "At a glance",
            title: "Comparing Standard and Business Sedan Categories",
            intro: "Evaluating standard and business categories assists corporate transport buyers in matching vehicle capabilities with executive seniority and event profile. Both options provide spotless presentation and professional chauffeurs.",
            headers: ["Feature", "Standard Sedan", "Business Sedan", "Operational Suitability"],
            rows: [
              ["Typical model", "Lexus ES", "Mercedes E Class", "Quiet reliable performance in daily service"],
              ["Guests", "3 Guests", "3 Guests", "Best suited for individual executives or pairs"],
              ["Luggage", "2 Bags", "2 Bags", "Generous capacity for standard flight cases"],
              ["Ideal for", "City transfers & airport runs", "Executive roadshows & meetings", "Sensible choice for everyday business logistics"]
            ]
          },
          coverage: {
            badge: "Coverage",
            title: "Regional Coverage Across the GCC",
            paragraphs: [
              "The standard fleet operates across major metropolitan centres including Riyadh, Jeddah, Dammam, Dubai, Abu Dhabi and Doha. AB is headquartered in Riyadh, maintains regional offices in Dubai, Abu Dhabi and Doha, and provides 24/7 dispatch from the Riyadh operations centre.",
              "Direct services cover Saudi Arabia, all seven UAE emirates and Qatar. Operations in Bahrain, Kuwait and Oman are available upon request through vetted regional partners."
            ]
          },
          faqs: {
            badge: "Questions",
            title: "Frequently Asked Questions About Reserving a Sedan with Driver",
            items: [
              { question: "What specific vehicle model is provided when booking a sedan with driver?", answer: "The standard category features a Lexus ES with driver or an equivalent executive vehicle of similar specification. Models are selected for mechanical reliability, passenger safety ratings and acoustic insulation in the cabin. Vehicles feature neutral exterior colours, predominantly black, with immaculate interiors free from commercial decals." },
              { question: "How does flight tracking function for an airport car with driver?", answer: "Every airport car with driver booking includes automated flight tracking managed by our 24/7 dispatch office. Operations staff monitor commercial flight numbers to adjust chauffeur staging times for early arrivals or flight delays. The chauffeur enters the arrival terminal once the aircraft completes taxiing, holding a discreet digital greeting board." },
              { question: "What passenger and luggage capacity does a chauffeur driven sedan accommodate?", answer: "A chauffeur driven sedan accommodates up to 3 guests and 2 standard pieces of check in luggage. The boot volume is designed to hold standard rolling suitcases alongside passenger briefcases or laptop carriers." },
              { question: "How are professional drivers vetted and trained across the regional fleet?", answer: "Every professional chauffeur employed by AB undergoes thorough background verification, defensive driving assessments and local route evaluations. Chauffeurs hold commercial driving licences compliant with regional transport authorities across Saudi Arabia, the UAE and Qatar." },
              { question: "Can corporate accounts access consolidated monthly invoicing for sedan services?", answer: "Enterprise clients and corporate travel desks can establish centralised corporate accounts that streamline billing across multiple Gulf cities. Consolidated monthly invoice billing removes the requirement for chauffeurs to collect individual card payments from business passengers." },
              { question: "What amenities are confirmed inside a sedan with driver during transit?", answer: "Passengers reserving a sedan with driver receive complimentary bottled mineral water, tissue packs and multi port mobile phone chargers. Vehicles feature functioning air conditioning calibrated for extreme Gulf summer conditions and high-speed Wi-Fi." },
              { question: "How does the 24/7 dispatch centre support daily vehicle movements?", answer: "Our central operations headquarters in Riyadh provides continuous 24/7 dispatch monitoring across all regional transport assignments. Dispatch controllers monitor vehicle progression in real time using satellite GPS tracking technology." },
              { question: "Is cross border transit between GCC countries supported in this class?", answer: "Cross border transport between Saudi Arabia, Bahrain, Qatar and the UAE is coordinated on request through vetted partner protocols. Standard city bookings operate within their designated metropolitan zones and intercity domestic corridors." }
            ]
          },
          cta: {
            title: "Need a Sedan with Driver or a Larger Fleet Movement?",
            subtitle: "Corporate Ground Logistics Across Saudi Arabia, the UAE and Qatar",
            paragraphs: [
              "AB coordinates individual transfers and complex multi city transportation programmes with dedicated chauffeur support across the Middle East. Reserve your vehicle online or request an enterprise proposal for scheduled corporate travel.",
              "Contact our central operations team to organise executive transfers or establish a corporate account with consolidated monthly billing."
            ]
          }
        }
      },
      ar: {
        title: "سيدان قياسية بسائق",
        model: "لكزس ES أو ما يعادلها",
        tagline: "تنقل موثوق وهادئ للرحلات التنفيذية الفردية وخدمات المطار",
        description: [
          "توفر فئة السيدان القياسية بسائق نقلاً برياً موثوقاً عبر المملكة العربية السعودية، والإمارات وقطر لجداول الأعمال الفردية. تنسق AB رحلات التنقل المباشر داخل المدن وخدمات الاستقبال من المطار مع سائقين محترفين ودعم كامل من مركز التوجيه المركزي.",
          "تتميز هذه الفئة بالهدوء والنظافة الفائقة والالتزام الصارم بالمواعيد، مما يجعلها الخيار العملي الأمثل لرحلات المطار والاجتماعات اليومية، موفرة توازناً استثنائياً بين الجودة العالية والكفاءة الاقتصادية لبرامج السفر المؤسسي."
        ],
        features: [
          { title: "مياه معدنية مبردة", desc: "مياه شرب معبأة مجانية متوفرة في المقصورة الخلفية لراحة الركاب طوال مسار الرحلة." },
          { title: "شواحن متعددة المنافذ", desc: "كابلات شحن متعددة المنافذ للحفاظ على شحن الهواتف والأجهزة الذكية أثناء التنقل." },
          { title: "واي فاي على متن السيارة", desc: "اتصال إنترنت لاسلكي سريع يتيح للمسافرين متابعة الأعمال والتواصل دون أي انقطاع." },
          { title: "تحكم فعال بالمناخ", desc: "فتحات تكييف مستقلة تتيح لركاب المقاعد الخلفية اختيار درجة الحرارة المثالية في أجواء الخليج الصيفية." }
        ],
        idealFor: [
          "رحلات المطار التنفيذية وخدمات الاستقبال في الصالات",
          "اجتماعات الأعمال والزيارات الميدانية المتعددة في المدينة",
          "تنقلات الشركاء والمستشارين والعملاء الزائرين",
          "تنقلات الموظفين المنتظمة ضمن ميزانيات مؤسسية مدروسة"
        ],
        richContent: {
          heroTitle: "سيدان قياسية بسائق",
          heroSubtitle: "توفر فئة السيدان القياسية بسائق نقلاً برياً موثوقاً عبر المملكة العربية السعودية، والإمارات وقطر لجداول الأعمال الفردية.",
          heroParagraphs: [
            "توفر فئة السيدان القياسية بسائق نقلاً برياً موثوقاً عبر المملكة العربية السعودية، والإمارات وقطر لجداول الأعمال الفردية. تنسق AB رحلات التنقل المباشر داخل المدن وخدمات الاستقبال من المطار مع سائقين محترفين ودعم كامل من مركز التوجيه المركزي.",
            "تتميز هذه الفئة بالهدوء والنظافة الفائقة والالتزام الصارم بالمواعيد، مما يجعلها الخيار العملي الأمثل لرحلات المطار والاجتماعات اليومية، موفرة توازناً استثنائياً بين الجودة العالية والكفاءة الاقتصادية لبرامج السفر المؤسسي."
          ],
          idealForSummary: "رحلات المطار واجتماعات المدينة",
          inside: {
            badge: "المقصورة",
            title: "الراحة التنفيذية داخل مقصورة السيدان القياسية",
            paragraphs: [
              "توفر المقاعد الخلفية في هذه الفئة دعماً مريحاً للمحترفين أثناء تنقلهم بين مواعيد العمل. تتيح المساحة الرحبة للأقدام فتح أجهزة الكمبيوتر المحمولة ومراجعة الملاحظات بكل أريحية. ويعمل الزجاج العازل للصوت على عزل ضجيج المرور الخارجي لتوفير مساحة عمل هادئة.",
              "يقدّر المسافرون من رجال الأعمال بيئة خالية من الفوضى تدعم التركيز المستمر أثناء الجداول المزدحمة، حيث توفر المقاعد الخلفية راحة بدنية ومساحة عمل عملية، بينما يخفف نظام التعليق السلس من وعورة الطرق الحضرية."
            ],
            image: "/fleet/www.ab.limo-fleet-standard-sedan-images/image2.jpg",
            imageAlt: "مقاعد خلفية واسعة لسيارة سيدان تنفيذية بمفروشات جلدية",
            caption: "توفر المقصورة الخلفية بيئة عمل منظمة مع مقاعد مريحة وداعمة."
          },
          onboard: {
            badge: "التجهيزات",
            title: "التجهيزات والمزايا القياسية على متن السيارة",
            intro: "تشمل كل رحلة في سيارات AB تجهيزات مدروسة بعناية لدعم الراحة الشخصية والكفاءة التشغيلية، بما يتوافق مع الظروف المناخية للمنطقة.",
            amenities: [
              { title: "مياه معدنية مبردة", desc: "مياه شرب معبأة مجانية متوفرة في المقصورة الخلفية لراحة الركاب طوال مسار الرحلة." },
              { title: "شواحن متعددة المنافذ", desc: "كابلات شحن متعددة المنافذ للحفاظ على شحن الهواتف والأجهزة الذكية أثناء التنقل." },
              { title: "واي فاي على متن السيارة", desc: "اتصال إنترنت لاسلكي سريع يتيح للمسافرين متابعة الأعمال والتواصل دون أي انقطاع." },
              { title: "تحكم فعال بالمناخ", desc: "فتحات تكييف مستقلة تتيح لركاب المقاعد الخلفية اختيار درجة الحرارة المثالية في أجواء الخليج الصيفية." }
            ]
          },
          useCases: {
            badge: "الملاءمة",
            title: "اختيار سيارة سيدان بسائق لجدول أعمال الشركات",
            intro: "يمنح اختيار السيدان مخططي السفر المؤسسي خياراً اقتصادياً وراقياً لتنقلات التنفيذيين اليومية، محققاً توازناً بين الخصوصية التامة والحجم العملي في شوارع المدينة.",
            cases: [
              { title: "رحلات المطار التنفيذية", desc: "يحظى المسافرون باستقبال سريع عند رصيف المطار أو في صالات الوصول مع مساعدة في الأمتعة وسعة كافية لحقائب السفر القياسية." },
              { title: "اجتماعات الأعمال في المدينة", desc: "يحافظ المديرون التنفيذيون على إنتاجيتهم أثناء زيارة عدة مكاتب تجارية في يوم واحد بينما يتولى السائق مهام الركن وحركة المرور." },
              { title: "تنقلات الشركاء والعملاء", desc: "تنقل هادئ للخبراء والمستشارين عبر المراكز المالية بمظهر نظيف ومحترف يتوافق مع أرقى المعايير المؤسسية." }
            ]
          },
          services: {
            badge: "الخدمات",
            title: "خدمات النقل المدارة بأسطول السيدان القياسي",
            intro: "تنشر AB سيارات السيدان القياسية عبر مختلف عمليات النقل في السعودية والإمارات وقطر، مع مراقبة حية بالأقمار الصناعية ومتابعة دقيقة لمواعيد الطيران.",
            items: [
              { title: "نقل المطار", desc: "استقبال وتوديع في المطارات مع تتبع الرحلات الجوية واستقبال بالاسم في الصالات.", href: "/ar/services/airport-transfers" },
              { title: "السائق الخاص وكبار الشخصيات", desc: "حجز بالساعة وباليوم للمسؤولين الراغبين في تنقل بري مستمر ومرن.", href: "/ar/services/chauffeur-vip" },
              { title: "التنقل بين المدن", desc: "رحلات مجدولة بين المراكز الاقتصادية الرئيسية بأسعار أعمال ثابتة ومحددة مسبقاً.", href: "/ar/services/city-to-city-transfers" },
              { title: "تنوع الأسطول", desc: "خيارات متعددة تجمع بين السيدان وسيارات الفان والحافلات لتغطية كافة متطلبات التحركات الجماعية.", href: "/ar/fleet" }
            ]
          },
          comparison: {
            badge: "نظرة عامة",
            title: "مقارنة فئتي السيدان القياسية ورجال الأعمال",
            intro: "تساعد المقارنة بين الفئتين مسؤولي المشتريات والسفر في مواءمة نوع السيارة مع المستوى الإداري للمسافر وطبيعة الفعالية.",
            headers: ["الميزة", "السيدان القياسية", "سيدان رجال الأعمال", "الملاءمة التشغيلية"],
            rows: [
              ["الموديل المعتاد", "لكزس ES", "مرسيدس الفئة E", "أداء هادئ وموثوق في الخدمة اليومية"],
              ["الركاب", "3 ركاب", "3 ركاب", "مثالية للمدراء الفرديين أو الوفود الثنائية"],
              ["الأمتعة", "حقيبتان", "حقيبتان", "سعة ممتازة لحقائب السفر القياسية"],
              ["الاستخدام الأمثل", "تنقلات المدينة ورحلات المطار", "جولات الأعمال والاجتماعات الرفيعة", "خيار اقتصادي وعملي للتنقل المؤسسي"]
            ]
          },
          coverage: {
            badge: "التغطية",
            title: "التغطية الإقليمية عبر دول الخليج",
            paragraphs: [
              "يعمل الأسطول القياسي عبر أهم المراكز الحضرية بما في ذلك الرياض، جدة، الدمام، دبي، أبوظبي، والدوحة. يقع مقرنا الرئيسي في الرياض مع مكاتب إقليمية في دبي وأبوظبي والدوحة، ونظام إرسال متواصل 24/7.",
              "تغطي خدماتنا المباشرة السعودية والإمارات وقطر، مع توفر النقل إلى البحرين والكويت وعُمان عند الطلب بالتنسيق المسبق مع شبكة شركائنا المعتمدة."
            ]
          },
          faqs: {
            badge: "الأسئلة الشائعة",
            title: "الأسئلة الشائعة حول حجز سيدان قياسية بسائق",
            items: [
              { question: "ما هو موديل السيارة المحدد عند حجز سيدان بسائق؟", answer: "تضم الفئة القياسية لكزس ES بسائق أو سيارة تنفيذية مماثلة في المواصفات. يتم اختيار الموديلات بناءً على الموثوقية الميكانيكية ومعايير الأمان والعزل الصوتي في المقصورة." },
              { question: "كيف يعمل تتبع الرحلات لسيارة المطار بسائق؟", answer: "يشمل كل حجز لسيارة المطار تتبعاً آلياً لمواعيد الرحلات عبر مركز العمليات لمطابقة وقت وصول السائق مع التوقيت الفعلي للهبوط وتفادي أي رسوم انتظار غير ضرورية." },
              { question: "ما هي سعة الركاب والأمتعة في سيارة السيدان بسائق؟", answer: "تتسع سيارة السيدان لما يصل إلى 3 ركاب وحقيبتي سفر عاديتين. وتتسع حقيبة السيارة الخلفية للحقائب الدوارة مع حقائب اليد والكمبيوتر المحمول." },
              { question: "كيف يتم فحص وتدريب السائقين المحترفين في الأسطول؟", answer: "يخضع جميع السائقين لفحص أمني دقيق واختبارات القيادة الوقائية ولديهم رخص قيادة تجارية سارية مع تدريب متخصص على بروتوكول الضيافة والمظهر المهني." },
              { question: "هل يمكن لحسابات الشركات إصدار فواتير شهرية مجمعة لخدمات السيدان؟", answer: "نعم، نوفر للشركات حسابات مركزية بفواتير مجمعة شهرية مع كشوفات تفصيلية بأسماء الركاب وتواريخ الرحلات لتسهيل التدقيق المالي." },
              { question: "ما هي التجهيزات المتوفرة داخل سيارة السيدان أثناء الرحلة؟", answer: "يحصل الركاب على مياه معدنية مبردة، وشواحن متعددة المنافذ، وتكييف هواء فائق الكفاءة، مع توفر شبكة Wi-Fi للاتصال بالأعمال." },
              { question: "كيف يدعم مركز الإرسال 24/7 تحركات المركبات اليومية؟", answer: "يراقب مركز العمليات بالرياض سير المركبات في الوقت الفعلي عبر الأقمار الصناعية ويوجه السائقين لطرق بديلة عند الازدحام لضمان الوصول في الموعد." },
              { question: "هل تتوفر رحلات التنقل عبر الحدود بين دول مجلس التعاون؟", answer: "نعم، ننسق الرحلات الدولية البرية بين السعودية والبحرين وقطر والإمارات بناءً على طلب مسبق وتصاريح دخول رسمية." }
            ]
          },
          cta: {
            title: "هل تحتاج إلى سيدان بسائق أو تحرك أسطول أكبر؟",
            subtitle: "حلول النقل البري المؤسسي عبر السعودية والإمارات وقطر",
            paragraphs: [
              "تنسق AB الرحلات الفردية وبرامج النقل المعقدة متعددة المدن مع سائقين مخصصين عبر الشرق الأوسط. احجز سيارتك عبر الإنترنت أو اطلب عرض أسعار مؤسسي.",
              "تواصل مع فريق العمليات المركزي لتنظيم تنقلاتك التنفيذية أو فتح حساب شركة بفواتير شهرية موحدة."
            ]
          }
        }
      }
    }
  },
  {
    slug: "business-sedan",
    category: "sedan",
    image: "/cars/sedans/BMW.png",
    heroExteriorImage: "/fleet/www.ab.limo-fleet-business-sedan-images/image1.jpg",
    gallery: [
      "/fleet/www.ab.limo-fleet-business-sedan-images/image1.jpg",
      "/fleet/www.ab.limo-fleet-business-sedan-images/image2.jpg",
      "/cars/sedans/BMW.png"
    ],
    passengers: "3",
    luggage: "2",
    copy: {
      en: {
        title: "Business Sedan with Driver",
        model: "Mercedes E Class or similar",
        tagline: "Executive Class Travel for Primary Business Districts & Financial Roadshows",
        description: [
          "A business sedan with driver provides executive passengers with a quiet mobile environment to conduct work or rest between commercial appointments across primary business districts. Skilled chauffeurs navigate dense metropolitan corridors with complete discretion, supported by regional dispatch centres tracking traffic patterns continuously.",
          "Corporate travel programmes rely on this vehicle category for dependable transfers where punctuality and professional presentation take precedence over ceremonial display. Each vehicle maintains strict cosmetic standards, rigorous safety readiness, and seamless operational coordination from pickup to arrival."
        ],
        features: [
          { title: "Device Charging Points", desc: "Universal charging ports support mobile devices and laptops so passengers remain powered throughout back to back business meetings." },
          { title: "Wireless Internet Connection", desc: "Onboard Wi-Fi enables continuous connectivity, allowing passengers to draft emails and review documents during transit without interruption." },
          { title: "Quiet Workstation Ambience", desc: "Fold down central armrests and refined sound dampening create an orderly desk environment for urgent mobile document reviews." },
          { title: "Passenger Refreshments", desc: "Complimentary chilled bottled water and premium refreshment provisions accompany passenger journeys to maintain comfort during warm regional transfers." }
        ],
        idealFor: [
          "Executives and financial roadshows",
          "Daily corporate mobility & visiting directors",
          "Direct airport pickups and terminal greetings",
          "Multi-stop commercial itineraries across trade zones"
        ],
        richContent: {
          heroTitle: "Business Sedan with Driver: Executive Class Travel",
          heroSubtitle: "A business sedan with driver provides executive passengers with a quiet mobile environment to conduct work or rest between commercial appointments across primary business districts.",
          heroParagraphs: [
            "A business sedan with driver provides executive passengers with a quiet mobile environment to conduct work or rest between commercial appointments across primary business districts. Skilled chauffeurs navigate dense metropolitan corridors with complete discretion, supported by regional dispatch centres tracking traffic patterns continuously.",
            "Corporate travel programmes rely on this vehicle category for dependable transfers where punctuality and professional presentation take precedence over ceremonial display. Each vehicle maintains strict cosmetic standards, rigorous safety readiness, and seamless operational coordination from pickup to arrival."
          ],
          idealForSummary: "Executives and roadshows",
          inside: {
            badge: "Inside",
            title: "Inside the Business Sedan with Driver Rear Cabin",
            paragraphs: [
              "The rear cabin of the business sedan with driver delivers an acoustic environment tailored to intense focus and personal comfort. Generous legroom permits corporate passengers to review presentation materials, manage urgent correspondence, or conduct confidential telephone discussions in total isolation from external traffic noise.",
              "Supple seating, zoned climate regulation, and ergonomic passenger controls enable relaxed transit across extended urban transfers. Rear window blinds provide additional shade and privacy when travelling through prominent commercial avenues during daylight hours.",
              "The rear cabin layout prioritises productive transit, providing independent climate vents, dedicated reading illumination, and low interior ambient sound levels suited for telephone conferences."
            ],
            image: "/fleet/www.ab.limo-fleet-business-sedan-images/image2.jpg",
            imageAlt: "Interior view of executive rear cabin showing dark leather seats and legroom",
            caption: "The quiet rear passenger cabin provides dedicated climate controls and ergonomic seating for productive travel."
          },
          onboard: {
            badge: "Onboard",
            title: "Onboard Connectivity and Amenities",
            intro: "Each executive saloon arrives equipped with functional appointments that support continuous productivity throughout the working journey.",
            amenities: [
              { title: "Device Charging Points", desc: "Universal charging ports support mobile devices and laptops so passengers remain powered throughout back to back business meetings." },
              { title: "Wireless Internet Connection", desc: "Onboard Wi-Fi enables continuous connectivity, allowing passengers to draft emails and review documents during transit without interruption." },
              { title: "Quiet Workstation Ambience", desc: "Fold down central armrests and refined sound dampening create an orderly desk environment for urgent mobile document reviews." },
              { title: "Passenger Refreshments", desc: "Complimentary chilled bottled water and premium refreshment provisions accompany passenger journeys to maintain comfort during warm regional transfers." }
            ]
          },
          useCases: {
            badge: "Use cases",
            title: "When to Select Executive Sedan Hire",
            intro: "Selecting an executive sedan hire delivers an ideal balance of understated elegance, nimble city manoeuvrability, and commercial practicality across dynamic metropolitan areas.",
            cases: [
              { title: "Executive Roadshows", desc: "Multi stop financial and corporate roadshows require punctual movements between banking towers, regional headquarters, and conference venues on tight schedules." },
              { title: "Daily Corporate Mobility", desc: "Visiting directors and resident executives benefit from dependable daily itineraries coordinated by a private driver who manages parking and urban congestion." },
              { title: "Direct Airport Pickups", desc: "Terminal arrivals and departures transition smoothly into productive work sessions, carrying carry on luggage and passengers without unnecessary transport delays." }
            ]
          },
          services: {
            badge: "Services",
            title: "Corporate Ground Transportation Services",
            intro: "The executive saloon operates across several managed service programmes designed for multinational firms, financial institutions, and government bodies requiring structured mobility solutions.",
            items: [
              { title: "Chauffeur and VIP Programmes", desc: "Deploying an executive chauffeur service delivers polished protocol standards, route familiarity, and refined hospitality for senior leaders visiting company headquarters.", href: "/services/chauffeur-vip" },
              { title: "Corporate Mobility Solutions", desc: "Establishing ongoing regional transport through business chauffeur hire and structured corporate agreements simplifies billing via monthly invoice schedules.", href: "/services/corporate-transportation" },
              { title: "City Transfers and Visiting Delegations", desc: "Organising regional commercial travel provides effortless movements across key trade zones and international exhibition centres.", href: "/services/city-to-city-transfers" },
              { title: "Fleet Diversity", desc: "Explore our wider fleet options to match specific delegation headcounts, executive luggage volumes, and security profile requirements.", href: "/fleet" }
            ]
          },
          comparison: {
            badge: "At a glance",
            title: "Executive Car with Driver Fleet Comparison",
            intro: "Comparing saloon specifications assists corporate travel coordinators in assigning appropriate vehicle classes to visiting executives and group delegations.",
            headers: ["Class", "Typical model", "Guests", "Luggage", "Ideal for"],
            rows: [
              ["Standard Sedan", "Ford Taurus / Lexus ES", "3", "2", "Cost conscious point to point staff transfers and crew logistics"],
              ["Business Sedan", "Mercedes E Class", "3", "2", "Executives, financial roadshows, and corporate account itineraries"],
              ["First Class Sedan", "Mercedes S Class", "3", "2", "C level dignitaries, VIP protocol delegations, and diplomatic travel"]
            ]
          },
          coverage: {
            badge: "Coverage",
            title: "Regional Service Availability",
            paragraphs: [
              "Stationed vehicles serve primary business destinations including Riyadh, Jeddah, Dammam, Dubai, Abu Dhabi and Doha. AB manages direct corporate ground transportation operations across Saudi Arabia, all seven UAE emirates and Qatar. Cross border and extended GCC travel across Bahrain, Kuwait and Oman is fulfilled exclusively on request through vetted corporate partners.",
              "Direct fleet deployments operate from our regional headquarters in Al Malaz, Riyadh, alongside branch operations in Dubai, Abu Dhabi, and Doha. Every reservation remains supported by 24/7 dispatch tracking."
            ]
          },
          faqs: {
            badge: "Questions",
            title: "Frequently Asked Questions About Business Sedan with Driver Services",
            items: [
              { question: "What luggage capacity does an executive car with driver accommodate?", answer: "An executive car with driver accommodates two standard suitcases in the rear boot alongside two compact carry on bags inside the cabin. Groups requiring additional baggage capacity for extended overseas assignments should arrange multiple vehicles or reserve a dedicated passenger minivan." },
              { question: "How does a business class chauffeur handle delayed flight arrivals?", answer: "A business class chauffeur tracks flight statuses in real time through automated terminal monitoring systems linked directly to our central operations room. When flight schedules change unexpectedly, dispatch coordinators adjust the driver arrival schedule to match your actual landing time." },
              { question: "What meet and greet procedures occur at regional airport terminals?", answer: "Our chauffeur service provides professional meet and greet attendance in the arrivals hall immediately following customs clearance. Your driver displays a personalised digital or printed name board, assists with heavy baggage handling, and escorts guests directly to the waiting vehicle kerbside." },
              { question: "Can corporate accounts access consolidated monthly invoice billing?", answer: "A verified corporate account enables centralised billing management, itemised ride summaries, and flexible payment arrangements settled via a single monthly invoice. Corporate travel administrators receive dedicated booking portal access with transparent expenditure auditing across all registered team members." },
              { question: "How does AB uphold duty of care for executive travellers?", answer: "Our operational duty of care encompasses comprehensive driver vetting, defensive driving accreditation, rigorous vehicle maintenance regimes, and continuous GPS tracking managed by 24/7 dispatch specialists. Corporate coordinators can monitor vehicle progress across all regional journeys at any time." },
              { question: "Can I book a Mercedes E Class with driver for multi day roadshows?", answer: "Booking a Mercedes E Class with driver for multi day schedules allows complete flexibility for complex city agendas and changing stakeholder timetables. Dedicated chauffeurs remain on standby near meeting venues to facilitate immediate departures without transit delays." },
              { question: "What amenities are included during executive saloon transfers?", answer: "Executive saloons feature device charging connectivity, onboard Wi-Fi capability, individual climate adjustment, and complimentary bottled water and refreshments. These provisions allow travelling professionals to maintain productivity and physical comfort across demanding itineraries." }
            ]
          },
          cta: {
            title: "Reserve Your Business Sedan with Driver",
            subtitle: "Plan Your Executive Journey",
            paragraphs: [
              "Secure a dependable business sedan with driver for upcoming corporate roadshows, VIP delegation transfers, or daily commercial mobility across the Gulf region. Experienced chauffeurs, modern vehicles, and attentive dispatch teams deliver seamless ground transit tailored to international business requirements.",
              "Submit your itinerary requirements to receive corporate transport options and custom corporate terms."
            ]
          }
        }
      },
      ar: {
        title: "سيدان رجال أعمال بسائق",
        model: "مرسيدس الفئة E أو ما يعادلها",
        tagline: "السفر بالفئة التنفيذية لمناطق الأعمال الرئيسية وجولات المستثمرين",
        description: [
          "توفر سيارة سيدان رجال الأعمال بسائق للمسافرين التنفيذيين بيئة تنقل هادئة لإنجاز الأعمال أو الاسترخاء بين المواعيد التجارية في أهم مناطق الأعمال. يقود السائقون المحترفون عبر المسارات المزدحمة بأعلى درجات اللباقة والتحفظ، مدعومين بمراكز عمليات إقليمية ترصد حركة السير باستمرار.",
          "تعتمد برامج السفر المؤسسي على هذه الفئة لضمان تنقلات موثوقة تحظى فيها دقة المواعيد والمظهر المهني بالأولوية القصوى. وتلتزم كل سيارة بمعايير نظافة صارمة وجاهزية أمان فائقة وتنسيق تشغيلي متكامل من لحظة الاستقبال وحتى الوصول."
        ],
        features: [
          { title: "نقاط شحن للأجهزة", desc: "منافذ شحن شاملة تدعم الهواتف المحمولة وأجهزة الكمبيوتر المحمول لضمان استمرارية الطاقة طوال الاجتماعات المتتالية." },
          { title: "اتصال إنترنت لاسلكي", desc: "توفر شبكة Wi-Fi على متن السيارة اتصالاً مستمراً يتيح للمسافرين إعداد الرسائل ومراجعة الوثائق دون انقطاع." },
          { title: "أجواء محطة عمل هادئة", desc: "توفر مساند الذراع المركزية القابلة للطي ونظام العزل الصوتي بيئة مكتبية منظمة لمراجعة المستندات العاجلة." },
          { title: "ضيافة ومشروبات للمسافرين", desc: "مياه معدنية مبردة ومشروبات منعشة مجانية ترافق رحلات الركاب لضمان راحتهم أثناء التنقلات الإقليمية." }
        ],
        idealFor: [
          "المدراء التنفيذيون وجولات المستثمرين المالية",
          "التنقل المؤسسي اليومي وزيارات المدراء الإقليميين",
          "الاستقبال المباشر من المطار والمساعدة في صالات الوصول",
          "الجولات التجارية متعددة المحطات عبر المناطق الحرة والمصرفية"
        ],
        richContent: {
          heroTitle: "سيدان رجال أعمال بسائق: السفر بالفئة التنفيذية",
          heroSubtitle: "توفر سيارة سيدان رجال الأعمال بسائق للمسافرين التنفيذيين بيئة تنقل هادئة لإنجاز الأعمال أو الاسترخاء بين المواعيد التجارية في أهم مناطق الأعمال.",
          heroParagraphs: [
            "توفر سيارة سيدان رجال الأعمال بسائق للمسافرين التنفيذيين بيئة تنقل هادئة لإنجاز الأعمال أو الاسترخاء بين المواعيد التجارية في أهم مناطق الأعمال. يقود السائقون المحترفون عبر المسارات المزدحمة بأعلى درجات اللباقة والتحفظ، مدعومين بمراكز عمليات إقليمية ترصد حركة السير باستمرار.",
            "تعتمد برامج السفر المؤسسي على هذه الفئة لضمان تنقلات موثوقة تحظى فيها دقة المواعيد والمظهر المهني بالأولوية القصوى. وتلتزم كل سيارة بمعايير نظافة صارمة وجاهزية أمان فائقة وتنسيق تشغيلي متكامل من لحظة الاستقبال وحتى الوصول."
          ],
          idealForSummary: "التنفيذيون وجولات الأعمال",
          inside: {
            badge: "المقصورة",
            title: "داخل المقصورة الخلفية لسيارة سيدان رجال الأعمال",
            paragraphs: [
              "توفر المقصورة الخلفية لسيارة رجال الأعمال بيئة صوتية مصممة للتركيز العميق والراحة الشخصية. تتيح المساحة الرحبة للأقدام للمسافرين مراجعة عروضهم التقديمية، والرد على المراسلات العاجلة، أو إجراء المكالمات الهاتفية السرية في عزلة تامة عن ضوضاء المرور الخارجية.",
              "تضمن المقاعد المريحة ونظام التكييف متعدد المناطق وعناصر التحكم المريحة رحلات هادئة أثناء التنقلات الطويلة. كما توفر ستائر النوافذ الخلفية خصوصية وحماية إضافية من أشعة الشمس أثناء التنقل نهاراً.",
              "يمنح تصميم المقصورة الأولوية للإنتاجية عبر فتحات تكييف مستقلة، وإضاءة قراءة مخصصة، ومستويات هدوء استثنائية مناسبة للمؤتمرات الصوتية."
            ],
            image: "/fleet/www.ab.limo-fleet-business-sedan-images/image2.jpg",
            imageAlt: "منظر داخلي لمقصورة الركاب الخلفية يظهر المقاعد الجلدية والمساحة الرحبة للأقدام",
            caption: "توفر مقصورة الركاب الخلفية الهادئة تحكماً مستقلاً بالمناخ ومقاعد مريحة لتنقل مفعم بالإنتاجية."
          },
          onboard: {
            badge: "التجهيزات",
            title: "الاتصال والتجهيزات على متن السيارة",
            intro: "تصل كل سيارة تنفيذية مجهزة بمزايا عملية تدعم استمرارية الإنتاجية طوال الرحلة.",
            amenities: [
              { title: "نقاط شحن للأجهزة", desc: "منافذ شحن شاملة تدعم الهواتف المحمولة وأجهزة الكمبيوتر المحمول لضمان استمرارية الطاقة طوال الاجتماعات المتتالية." },
              { title: "اتصال إنترنت لاسلكي", desc: "توفر شبكة Wi-Fi على متن السيارة اتصالاً مستمراً يتيح للمسافرين إعداد الرسائل ومراجعة الوثائق دون انقطاع." },
              { title: "أجواء محطة عمل هادئة", desc: "توفر مساند الذراع المركزية القابلة للطي ونظام العزل الصوتي بيئة مكتبية منظمة لمراجعة المستندات العاجلة." },
              { title: "ضيافة ومشروبات للمسافرين", desc: "مياه معدنية مبردة ومشروبات منعشة مجانية ترافق رحلات الركاب لضمان راحتهم أثناء التنقلات الإقليمية." }
            ]
          },
          useCases: {
            badge: "حالات الاستخدام",
            title: "متى تختار استئجار سيدان تنفيذية بسائق",
            intro: "يحقق اختيار سيارة سيدان تنفيذية توازناً مثالياً بين الأناقة الراقية والقدرة على المناورة السلسة والعملية التجارية عبر المدن الكبرى.",
            cases: [
              { title: "جولات الأعمال والترويج المالي", desc: "تتطلب جولات الأعمال والترويج المالي تنقلات دقيقة بين الأبراج المصرفية والمقار الإقليمية ومراكز المؤتمرات وفق جداول زمنية محكمة." },
              { title: "التنقل المؤسسي اليومي", desc: "يستفيد المدراء الزائرون والمقيمون من جداول يومية دقيقة ينسقها سائق خاص يتولى مهام ركن السيارة والتعامل مع الزحام." },
              { title: "الاستقبال المباشر من المطار", desc: "ينتقل القادمون من صالات المطار بسلاسة إلى جلسات عمل منتجة، مع مساحة كافية لأمتعة السفر دون أي تأخير." }
            ]
          },
          services: {
            badge: "الخدمات",
            title: "خدمات النقل البري المؤسسي",
            intro: "تعمل السيدان التنفيذية عبر عدة برامج نقل متخصصة مصممة للشركات العالمية والمؤسسات المالية والجهات الحكومية.",
            items: [
              { title: "برامج السائق الخاص وكبار الشخصيات", desc: "يوفر سائقنا التنفيذي أعلى معايير البروتوكول، ومعرفة تامة بالمسارات، وضيافة رفيعة للمسؤولين الزائرين.", href: "/ar/services/chauffeur-vip" },
              { title: "حلول التنقل المؤسسي", desc: "يساهم التعاقد المؤسسي المنتظم في تسهيل المعاملات المالية عبر فواتير موحدة ومجدولة شهرياً.", href: "/ar/services/corporate-transportation" },
              { title: "التنقل بين المدن والوفود الزائرة", desc: "تنظيم تنقلات تجارية إقليمية انسيابية بين أهم مناطق التجارة ومراكز المعارض الدولية.", href: "/ar/services/city-to-city-transfers" },
              { title: "تنوع الأسطول", desc: "استكشف خيارات أسطولنا الشامل لمطابقة متطلبات وفدك من حيث عدد الركاب وحجم الأمتعة والبروتوكول الأمني.", href: "/ar/fleet" }
            ]
          },
          comparison: {
            badge: "نظرة عامة",
            title: "مقارنة أسطول سيارات السيدان التنفيذية",
            intro: "تساعد مقارنة مواصفات السيدان منسقي السفر المؤسسي في اختيار فئة السيارة الملائمة للمسؤولين والوفود الزائرة.",
            headers: ["الفئة", "الموديل المعتاد", "الركاب", "الأمتعة", "الاستخدام الأمثل"],
            rows: [
              ["سيدان قياسية", "فورد توروس / لكزس ES", "3", "2", "تنقلات الموظفين الاقتصادية وطواقم العمل بين نقطتين"],
              ["سيدان رجال أعمال", "مرسيدس الفئة E", "3", "2", "المدراء التنفيذيون، جولات الأعمال، وجداول الحسابات المؤسسية"],
              ["سيدان الفئة الأولى", "مرسيدس الفئة S", "3", "2", "كبار الشخصيات والوفود الدبلوماسية وسفر المراسم الرسمية"]
            ]
          },
          coverage: {
            badge: "التغطية",
            title: "التغطية والتوفر الإقليمي",
            paragraphs: [
              "تتمركز سياراتنا في أهم وجهات الأعمال الرئيسية بما في ذلك الرياض، جدة، الدمام، دبي، أبوظبي، والدوحة. تدير AB عمليات نقل بري مباشرة ومملوكة عبر المملكة العربية السعودية، والإمارات السبع، وقطر. وتتوفر الرحلات الممتدة عبر الحدود في البحرين والكويت وعُمان عند الطلب عبر شركائنا المعتمدين.",
              "تنطلق سياراتنا مباشرة من مقرنا الإقليمي في حي الملز بالرياض، بالإضافة إلى مكاتبنا في دبي وأبوظبي والدوحة، مع دعم كامل على مدار الساعة عبر نظام تتبع الإرسال."
            ]
          },
          faqs: {
            badge: "الأسئلة الشائعة",
            title: "الأسئلة الشائعة حول خدمة سيدان رجال الأعمال بسائق",
            items: [
              { question: "ما هي سعة الأمتعة التي تستوعبها سيارة رجال الأعمال مع سائق؟", answer: "تستوعب سيارة رجال الأعمال حقيبتي سفر قياسيتين في صندوق الأمتعة الخلفي بالإضافة إلى حقيبتي يد داخل المقصورة. وللوفود التي تحتاج لسعة إضافية يُنصح بحجز عدة مركبات أو طلب ميني فان تنفيذي مخصص." },
              { question: "كيف يتعامل سائق فئة رجال الأعمال مع الرحلات الجوية المتأخرة؟", answer: "يتابع سائقونا مواعيد الرحلات مباشرة عبر نظام تتبع الرحلات الآلي المربوط بمركز العمليات. وعند حدوث أي تأخير أو تغيير في الرحلة، يقوم فريق التوجيه بتعديل موعد وصول السائق ليتوافق مع توقيت الهبوط الفعلي." },
              { question: "ما هي إجراءات الاستقبال والترحيب في صالات المطارات؟", answer: "يقدم سائقنا خدمة الاستقبال في صالة الوصول فور خروج الضيف من الجمارك، حاملاً لوحة ترحيبية رقمية أو ورقية مخصصة، ويساعد في حمل الأمتعة ومرافقة الضيف مباشرة إلى السيارة المنتظرة." },
              { question: "هل يمكن لحسابات الشركات الحصول على فواتير شهرية موحدة؟", answer: "تتيح الحسابات المؤسسية المعتمدة إدارة مركزية للفواتير، مع كشوفات تفصيلية للرحلات، وسداد مرن عبر فاتورة شهرية واحدة. كما يحصل مسؤولو السفر على لوحة تحكم مخصصة لتدقيق النفقات." },
              { question: "كيف تلتزم AB بواجب الرعاية وسلامة المسافرين التنفيذيين؟", answer: "يشمل واجب الرعاية فحصاً أمنياً شاملاً للسائقين، وتدريباً على القيادة الوقائية، وصيانة ميكانيكية دورية صارمة، وتتبعاً حياً بالأقمار الصناعية مدار 24/7 لضمان أمان المسافرين." },
              { question: "هل يمكنني حجز مرسيدس فئة E بسائق لعدة أيام؟", answer: "يتيح حجز مرسيدس الفئة E بسائق لعدة أيام مرونة تامة لتغطية الجداول المزدحمة وتغير المواعيد، حيث يبقى السائق على أهبة الاستعداد بالقرب من مقرات الاجتماعات لتأمين تنقل فوري." },
              { question: "ما هي التجهيزات المشمولة في رحلات السيدان التنفيذية؟", answer: "تشتمل سيارات السيدان التنفيذية على منافذ شحن للأجهزة، وإنترنت واي فاي عالي السرعة، وتحكم مستقل بالمناخ، ومياه معدنية مبردة وضيافة مجانية، لتوفير أقصى درجات الراحة والإنتاجية." }
            ]
          },
          cta: {
            title: "احجز سيارة سيدان رجال الأعمال بسائق",
            subtitle: "خطط لرحلتك التنفيذية",
            paragraphs: [
              "احصل على سيارة سيدان رجال أعمال موثوقة بسائق لجولاتك القادمة أو تنقلات الوفود أو تحركات الأعمال اليومية في منطقة الخليج. نضمن لك تنقلاً استثنائياً يلبي أرقى المعايير الدولية.",
              "أرسل متطلبات جدولك للحصول على عروض أسعار مؤسسية وشروط تعاقد مخصصة."
            ]
          }
        }
      }
    }
  },
{
    slug: "ford-taurus",
    category: "sedan",
    image: "/cars/sedans/FAURD TAURUS.png",
    gallery: ["/cars/sedans/FAURD TAURUS.png", "/cars/sedans/msc.png", "/cars/sedans/BYD_Seal-7.png"],
    passengers: "3",
    luggage: "2",
    copy: {
      en: {
        title: "Standard Sedan",
        model: "Ford Taurus",
        tagline: "Full-size sedan comfort for dependable everyday transfers.",
        description: [
          "The Ford Taurus is the everyday standard of the fleet: a full-size sedan with a roomy back seat, generous trunk space and the ride quality expected on long city and intercity runs.",
          "It is dispatched at standard-class rates with the same AB presentation — immaculate, late-model and strictly black — and a professional chauffeur on every trip.",
        ],
        features: [
          { title: "Roomy rear cabin", desc: "Full-size interior with comfortable seating for three and easy entry for guests in formal wear." },
          { title: "Large trunk", desc: "Boot space sized for airport luggage, shopping and multi-stop business itineraries." },
          { title: "Wi-Fi & charging", desc: "Onboard connectivity and device charging to stay productive between stops." },
          { title: "Fixed standard rates", desc: "Predictable per-transfer pricing for accounts, staff movement and repeated routes." },
        ],
        idealFor: [
          "Daily staff and executive commuting",
          "Hotel and city transfers",
          "Airport runs at standard class",
          "Guest and event transportation",
        ],
      },
      ar: {
        title: "سيدان قياسية",
        model: "فورد توروس",
        tagline: "راحة سيدان كاملة الحجم لتنقلات يومية موثوقة.",
        description: [
          "فورد توروس هو المعيار اليومي في الأسطول: سيدان كاملة الحجم بمقاعد خلفية واسعة وصندوق أمتعة كبير وجودة ركوب مناسبة للرحلات الطويلة داخل المدينة وبين المدن.",
          "تُوجَّه بأسعار الفئة القياسية ضمن عرض AB نفسه — نظيفة وحديثة وسوداء بشكل صارم — مع سائق محترف في كل رحلة.",
        ],
        features: [
          { title: "مقصورة خلفية واسعة", desc: "مقعد داخلي كامل الحجم يتسع لثلاثة ركاب براحة وسهولة في الصعود للضيوف بالزي الرسمي." },
          { title: "صندوق أمتعة كبير", desc: "مساحة تتسع لأمتعة المطارات والتسوق وبرامج العمل متعددة المحطات." },
          { title: "واي فاي وشحن", desc: "اتصال على متن السيارة وشحن للأجهزة للإنتاجية بين المحطات." },
          { title: "أسعار قياسية ثابتة", desc: "تسعير متوقع لكل رحلة للحسابات وتنقلات الموظفين والمسارات المتكررة." },
        ],
        idealFor: [
          "تنقلات الموظفين والمسؤولين اليومية",
          "التنقلات بين الفنادق والمدينة",
          "رحلات المطارات بلفئة القياسية",
          "نقل الضيوف والفعاليات",
        ],
      },
    },
  },
  {
    slug: "byd-seal-7",
    category: "sedan",
    image: "/cars/sedans/BYD_Seal-7.png",
    gallery: ["/cars/sedans/BYD_Seal-7.png", "/cars/sedans/FAURD TAURUS.png", "/cars/sedans/msc.png"],
    passengers: "3",
    luggage: "2",
    copy: {
      en: {
        title: "Standard Sedan",
        model: "BYD Seal 7",
        tagline: "Zero-emission sedan travel for sustainable corporate mobility.",
        description: [
          "The BYD Seal 7 adds an all-electric option to the standard sedan class: silent acceleration, a smooth ride and zero tailpipe emissions for city programmes that measure their carbon footprint.",
          "Charged and dispatched from our depots, it carries the AB brand standard — immaculate, late-model and strictly black — with a professional chauffeur on every trip.",
        ],
        features: [
          { title: "Fully electric powertrain", desc: "Zero-emission running with instant torque for quiet, effortless city driving." },
          { title: "Silent cabin", desc: "Electric drive keeps the cabin library-quiet for calls and conversations in transit." },
          { title: "Wi-Fi & charging", desc: "Onboard connectivity plus device charging for driver and passengers." },
          { title: "Fixed standard rates", desc: "Predictable per-transfer pricing for green-fleet corporate accounts." },
        ],
        idealFor: [
          "Sustainability-focused corporate programmes",
          "City and hotel transfers",
          "Airport runs at standard class",
          "EV-forward events and conferences",
        ],
      },
      ar: {
        title: "سيدان قياسية",
        model: "BYD سيل 7",
        tagline: "سفر سيدان بلا انبعاثات للتنقل المؤسسي المستدام.",
        description: [
          "تضيف BYD سيل 7 خيارًا كهربائيًا بالكامل لفئة السيدان القياسية: تسارع صامت وانسيابية في القيادة وصفر انبعاثات لبرامج المدينة التي تقيس أثرها الكربوني.",
          "تُشحن وتُوجَّه من مراكزنا، وتحمل معيار هوية AB — نظيفة وحديثة وسوداء بشكل صارم — مع سائق محترف في كل رحلة.",
        ],
        features: [
          { title: "محرك كهربائي بالكامل", desc: "تشغيل بلا انبعاثات مع تسارع فوري لقيادة مدينة هادئة وسلسة." },
          { title: "مقصورة صامتة", desc: "الدفع الكهربائي يحافظ على هدوء المقصورة للمكالمات والمحادثات أثناء التنقل." },
          { title: "واي فاي وشحن", desc: "اتصال على متن السيارة مع شحن لأجهزة السائق والركاب." },
          { title: "أسعار قياسية ثابتة", desc: "تسعير متوقع لكل رحلة لحسابات الأسطول الأخضر." },
        ],
        idealFor: [
          "برامج الشركات الراعية للبيئة",
          "التنقلات بين المدينة والفنادق",
          "رحلات المطارات بلفئة القياسية",
          "الفعاليات والمؤتمرات ذات التوجه البيئي",
        ],
      },
    },
  },
  {
    slug: "mitsubishi-outlander",
    category: "suv",
    anchors: ["suvs"],
    image: "/cars/suvs/Mitsubishi_Outlander.png",
    gallery: ["/cars/suvs/Mitsubishi_Outlander.png", "/cars/suvs/GMC.png", "/cars/suvs/CHEVROLET.png"],
    passengers: "5",
    luggage: "4",
    copy: {
      en: {
        title: "Standard SUV",
        model: "Mitsubishi Outlander",
        tagline: "Versatile SUV space for families and small teams.",
        description: [
          "The Outlander is the practical SUV of the fleet: elevated seating for five, flexible cargo space and confident all-weather handling for families and small delegations on city and intercity routes.",
          "It is dispatched in the AB brand standard — immaculate, late-model and strictly black — with the same chauffeur protocol as every AB class.",
        ],
        features: [
          { title: "Five-seat flexibility", desc: "Comfortable seating for five with split-fold rear seats for mixed passenger and luggage loads." },
          { title: "Elevated visibility", desc: "Commanding driving position for confident navigation of city traffic and desert-edge roads." },
          { title: "All-weather capability", desc: "Stable, sure-footed handling year round on highway, city and unpaved edges." },
          { title: "Wi-Fi & charging", desc: "Connectivity and device charging to keep the family or team productive." },
        ],
        idealFor: [
          "Family airport transfers",
          "Small team outings and site visits",
          "Intercity and desert-edge journeys",
          "Weekend leisure travel",
        ],
      },
      ar: {
        title: "دفع رباعي قياسي",
        model: "ميتسوبيشي أوتلاندر",
        tagline: "مساحة دفع رباعي متعددة الاستخدامات للعائلات والفرق الصغيرة.",
        description: [
          "أوتلاندر هو الدفع الرباعي العملي في الأسطول: مقاعد مرتفعة لخمسة ركاب، ومساحة أمتعة مرنة، وثبات في جميع الأحوال للعائلات والوفود الصغيرة داخل المدينة وبين المدن.",
          "تُوجَّه وفق معيار هوية AB — نظيفة وحديثة وسوداء بشكل صارم — مع نفس بروتوكول السائق المطبق على كل فئات AB.",
        ],
        features: [
          { title: "مرونة لخمسة ركاب", desc: "مقاعد مريحة لخمسة أشخاص مع مقاعد خلفية قابلة للطي لتنويع توزيع الأمتعة." },
          { title: "رؤية مرتفعة", desc: "موضع قيادة مرتفع للملاسة الواثقة في حركة المدينة وحواف الطرق الصحراوية." },
          { title: "أداء في جميع الأحوال", desc: "ثبات وثقة على الطرق السريعة والمدن والطرق غير المعبدة طوال العام." },
          { title: "واي فاي وشحن", desc: "اتصال وشحن للأجهزة لإبقاء العائلة أو الفريق منتجًا." },
        ],
        idealFor: [
          "النقل العائلي من وإلى المطارات",
          "خروج الفرق الصغيرة والزيارات الميدانية",
          "الرحلات بين المدن وحواف الصحاري",
          "الرحلات الترفيهية في عطلة الأسبوع",
        ],
      },
    },
  },
  {
    slug: "gmc-yukon",
    category: "suv",
    image: "/cars/suvs/GMC.png",
    gallery: ["/cars/suvs/GMC.png", "/cars/suvs/CHEVROLET.png", "/cars/suvs/CADILAC.png"],
    passengers: "7",
    luggage: "6",
    copy: {
      en: {
        title: "Business SUV",
        model: "GMC Yukon",
        tagline: "Full-size space and presence for business travel with luggage.",
        description: [
          "The GMC Yukon is a full-size business SUV: seven seats, a vast boot and a commanding road position that makes it the default for executives travelling with families, teams or security details.",
          "It handles intercity and desert-edge routes with ease and is presented in the AB brand standard — immaculate, late-model and strictly black — with a professional chauffeur.",
        ],
        features: [
          { title: "Seven-seat capacity", desc: "Spacious three-row seating for families, small delegations and support staff." },
          { title: "Ample luggage capacity", desc: "Full-size boot space for airport loads, extended stays and delegation baggage." },
          { title: "All-weather capability", desc: "Confident handling on highway, city and desert-edge roads year round." },
          { title: "Privacy & security", desc: "Privacy glass and discreet presentation for VIP and protective-detail movement." },
        ],
        idealFor: [
          "Family and executive airport transfers",
          "Security-detail and VIP movement",
          "Delegations travelling with luggage",
          "Desert and intercity journeys",
        ],
      },
      ar: {
        title: "دفع رباعي أعمال",
        model: "جي إم سي يوكون",
        tagline: "مساحة وحضور بحجم كامل لسفر الأعمال مع الأمتعة.",
        description: [
          "جي إم سي يوكون دفع رباعي أعمال كامل الحجم: سبعة مقاعد وصندوق أمتعة ضخم وموضع قيادة بارز يجعله الخيار الافتراضي للمسؤولين المسافرين مع العائلات أو الفرق أو مرافقة الأمن.",
          "يتعامل مع المسافات بين المدن وحواف الطرق الصحراوية بسهولة ويُقدَّم وفق معيار هوية AB — نظيف وحديث وأسود بشكل صارم — مع سائق محترف.",
        ],
        features: [
          { title: "سعة سبعة ركاب", desc: "مقاعد من ثلاثة صفوف تتسع للعائلات والوفود الصغيرة وطواقم المرافقة." },
          { title: "سعة أمتعة كبيرة", desc: "مساحة حمل كاملة الحجم لأحمال المطارات والإقامات الطويلة وأمتعة الوفود." },
          { title: "أداء في جميع الأحوال", desc: "ثبات على الطرق السريعة والمدن وحواف الصحاري طوال العام." },
          { title: "خصوصية وأمن", desc: "زجاج خاص وحضور غير ملفت لتنقلات كبار الشخصيات وفرق المرافقة." },
        ],
        idealFor: [
          "النقل العائلي والتنفيذي من وإلى المطارات",
          "تنقلات كبار الشخصيات وفرق المرافقة",
          "الوفود المسافرة مع الأمتعة",
          "الرحلات الصحراوية وبين المدن",
        ],
      },
    },
  },
  {
    slug: "chevrolet-tahoe",
    category: "suv",
    image: "/cars/suvs/CHEVROLET.png",
    gallery: ["/cars/suvs/CHEVROLET.png", "/cars/suvs/GMC.png", "/cars/suvs/CADILAC.png"],
    passengers: "7",
    luggage: "6",
    copy: {
      en: {
        title: "Business SUV",
        model: "Chevrolet Tahoe",
        tagline: "Commanding full-size SUV for executive groups and their gear.",
        description: [
          "The Chevrolet Tahoe pairs American full-size comfort with a business-ready cabin: seven seats, a generous cargo bay and a composed ride for long highway legs between cities.",
          "Dispatched in the AB brand standard — immaculate, late-model and strictly black — it is a favourite for corporate off-sites, family airport runs and protective details.",
        ],
        features: [
          { title: "Seven-seat comfort", desc: "Three rows of seating with room for families, teams and support staff." },
          { title: "Cargo bay for every trip", desc: "Deep boot space for luggage, equipment and event gear." },
          { title: "Composed highway ride", desc: "Smooth, stable cruising for long intercity legs at business pace." },
          { title: "Privacy glass", desc: "Tinted privacy glass for discreet VIP and family travel." },
        ],
        idealFor: [
          "Corporate off-sites and site visits",
          "Family airport transfers",
          "Intercity business travel",
          "Protective-detail movements",
        ],
      },
      ar: {
        title: "دفع رباعي أعمال",
        model: "شفروليه تاهو",
        tagline: "دفع رباعي كامل الحجم لحضور المجموعات التنفيذية وأمتعتها.",
        description: [
          "يجمع شفروليه تاهو بين راحة الحجم الأمريكي ومقصورة جاهزة للأعمال: سبعة مقاعد وصندوق أمتعة واسع وجودة ركوب انسيابية لمسافات الطريق الطويلة بين المدن.",
          "يُوجَّه وفق معيار هوية AB — نظيف وحديث وأسود بشكل صارم — وهو الخيار المفضل لرحلات الفرق والعائلات من المطارات وفرق المرافقة.",
        ],
        features: [
          { title: "راحة لسبعة ركاب", desc: "ثلاثة صفوف مقاعد تتسع للعائلات والفرق وطواقم المرافقة." },
          { title: "صندوق أمتعة لكل رحلة", desc: "مساحة تخزين عميقة للأمتعة والمعدات ومعدات الفعاليات." },
          { title: "انسيابية على الطريق السريع", desc: "ركود ثابت وسلس للمسافات الطويلة بين المدن بإيقاع العمل." },
          { title: "زجاج خاص", desc: "زجاج معتم لخصوصية تنقلات كبار الشخصيات والعائلات." },
        ],
        idealFor: [
          "رحلات الفرق ومواقع المشاريع",
          "النقل العائلي من وإلى المطارات",
          "سفر الأعمال بين المدن",
          "تنقلات فرق المرافقة",
        ],
      },
    },
  },
  {
    slug: "luxury-suv",
    category: "suv",
    image: "/cars/suvs/CADILAC.png",
    gallery: ["/cars/suvs/CADILAC.png", "/cars/suvs/GMC.png", "/cars/suvs/CHEVROLET.png"],
    passengers: "6",
    luggage: "5",
    copy: {
      en: {
        title: "First Class SUV",
        model: "Cadillac Escalade",
        tagline: "Commanding presence with space for family, luggage and security details.",
        description: [
          "The luxury SUV combines flagship comfort with genuine space: elevated seating, a commanding road position and enough room for families, small delegations and their luggage.",
          "It is the preferred vehicle for intercity and desert routes, security-detail travel and any journey where luggage capacity cannot be negotiated.",
        ],
        features: [
          { title: "Elevated seating", desc: "High driving position and generous headroom for comfort on long GCC journeys." },
          { title: "Ample luggage capacity", desc: "Full-size boot space for family travel, extended stays and delegation baggage." },
          { title: "All-weather capability", desc: "Confident handling on highway, city and desert-edge roads year round." },
          { title: "Privacy & security", desc: "Privacy glass and discreet presentation for VIP and protective-detail movement." },
        ],
        idealFor: [
          "Family airport transfers",
          "Desert and intercity journeys",
          "Security-detail and VIP movement",
          "Small delegations with luggage",
        ],
      },
      ar: {
        title: "دفع رباعي الدرجة الأولى",
        model: "كاديلاك إسكاليد",
        tagline: "حضور لافت مع مساحة للعائلة والأمتعة وفرق المرافقة.",
        description: [
          "يجمع الدفع الرباعي الفاخر بين راحة الرائدة والمساحة الحقيقية: مقاعد مرتفعة، ومكانة بارزة على الطريق، ومساحة كافية للعائلات والوفود الصغيرة وأمتعتها.",
          "وهو الخيار المفضل للمسافات بين المدن والطرق الصحراوية وتنقلات فرق المرافقة، ولكل رحلة لا يمكن التنازل فيها عن سعة الأمتعة.",
        ],
        features: [
          { title: "مقاعد مرتفعة", desc: "موضع قيادة مرتفع ومساحة رأس واسعة للراحة في الرحلات الطويلة عبر الخليج." },
          { title: "سعة أمتعة كبيرة", desc: "مساحة حمل كبيرة للسفر العائلي والإقامات الطويلة وأمتعة الوفود." },
          { title: "أداء في جميع الأحوال", desc: "ثبات على الطرق السريعة والمدن وحواف الصحاري طوال العام." },
          { title: "خصوصية وأمن", desc: "زجاج خاص وحضور غير ملفت لتنقلات كبار الشخصيات وفرق المرافقة." },
        ],
        idealFor: [
          "النقل العائلي من وإلى المطارات",
          "الرحلات الصحراوية وبين المدن",
          "تنقلات كبار الشخصيات وفرق المرافقة",
          "الوفود الصغيرة مع الأمتعة",
        ],
      },
    },
  },
  {
    slug: "business-van",
    category: "van",
    image: "/cars/vans/V_Class.png",
    gallery: ["/cars/vans/V_Class.png", "/fleet/www.ab.limo-fleet-executive-van-images/image2.jpg", "/cars/vans/Maxus.png"],
    passengers: "7",
    luggage: "5",
    copy: {
      en: {
        title: "Premium Minivan",
        model: "Mercedes V Class",
        tagline: "Flexible executive travel for small teams and families.",
        description: [
          "The V-Class turns travel into time well spent: face-to-face or conference seating lets small teams hold briefings on the move, while families travel together without splitting across vehicles.",
          "It bridges the gap between an executive sedan and a full coach, keeping the black brand standard and chauffeur service of every AB class.",
        ],
        features: [
          { title: "Conference layout", desc: "Face-to-face rear seating for briefings, discussions and shared travel time." },
          { title: "Room for everyone", desc: "Seats seven passengers with luggage space for airport and intercity runs." },
          { title: "Onboard Wi-Fi", desc: "Connectivity and charging for the whole cabin to keep the team productive." },
          { title: "Chauffeur discretion", desc: "Professional chauffeur service with the same protocol standards as our sedans." },
        ],
        idealFor: [
          "Small team and project transfers",
          "Family travel with luggage",
          "Event and hotel shuttles",
          "Airport to hotel group runs",
        ],
        richContent: {
          heroTitle: "Chauffeur-driven premium MPVs for group travel",
          heroSubtitle: "A premium MPV with a professional driver offers a comfortable, practical way for small groups to travel together between airports, hotels, business meetings and events.",
          heroParagraphs: [
            "A premium MPV with a professional driver offers a comfortable, practical way for small groups to travel together between airports, hotels, business meetings and events. Face-to-face seating in selected vehicles creates room to talk or work en route, while a dedicated chauffeur keeps the journey organised around your itinerary.",
            "Choose a vehicle according to your passenger numbers, luggage and schedule. A Mercedes V Class with driver is one example of a spacious Mercedes-Benz class MPV; comparable vehicles may also be available. Whether the trip is for business or leisure, confirm the model and capacity when booking so the car suits your group's needs."
          ],
          idealForSummary: "Delegations and small teams",
          inside: {
            badge: "Inside",
            title: "Comfortable lounge seating in a chauffeur-driven MPV",
            paragraphs: [
              "The cabin layout depends on the vehicle model and configuration. Selected premium MPVs have individual seats arranged face to face, creating a shared space where passengers can talk, review documents or prepare for meetings during the journey. This seating arrangement suits small groups travelling between venues, while forward-facing layouts are also available in some vehicles. Ask about the preferred configuration when making a reservation.",
              "Interior features vary across the fleet. Depending on the vehicle, passengers may have generous legroom, rear climate controls and tinted windows. These details support a comfortable journey and offer some discretion, although window tinting does not guarantee complete privacy. Selected MPVs also have folding work surfaces for laptops and papers. Confirm which features are available in your vehicle before booking, particularly when they are important for your itinerary.",
              "A clean, well-presented cabin helps passengers settle in before a business meeting or event. Chauffeurs prepare the vehicle before pickup, checking the seating, carpets and frequently touched surfaces. For groups, it is worth sharing passenger numbers and any specific seating needs in advance, so the service team can match the vehicle to the journey."
            ],
            image: "/fleet/www.ab.limo-fleet-executive-van-images/image2.jpg",
            imageAlt: "Interior lounge seating cabin of a luxury MPV arranged face to face",
            caption: "Face-to-face seating in a selected MPV creates a shared space for onboard conversations."
          },
          onboard: {
            badge: "Onboard",
            title: "Comfort and connectivity on board",
            intro: "For executives travelling between business districts, comfort and useful onboard amenities can make time on the road more productive. The features available depend on the vehicle and service booked, so confirm any requirements when arranging your journey. For longer trips lasting several hours, check which options are included before you travel.",
            amenities: [
              { title: "Bottled water", desc: "Ask whether bottled water is included for your transfer, particularly when planning a longer journey or several hours on the road." },
              { title: "Mobile device chargers", desc: "Charging cables and supported connector types vary by vehicle. Share your device requirements in advance so the team can confirm suitable options for the trip." },
              { title: "Wi-Fi connectivity", desc: "Wi-Fi availability and network specifications vary. Confirm access before booking, and use appropriate security measures when handling sensitive business correspondence online." },
              { title: "Climate control", desc: "Some vehicles provide rear climate controls, allowing passengers to adjust cabin temperature. Check availability when selecting a vehicle, especially for longer travel during warmer weather." }
            ]
          },
          useCases: {
            badge: "Use cases",
            title: "When to choose a chauffeur-driven MPV",
            intro: "Choose a premium MPV according to your group size, luggage, journey length and itinerary. It suits small teams who want to travel together between several venues, with room to talk or review documents on the way. For larger groups or bulky equipment, compare passenger and luggage capacity before booking.",
            cases: [
              { title: "Corporate roadshow teams", desc: "For roadshows, a shared vehicle keeps management teams together as they travel between financial centres and investor presentations. The cabin offers a place to continue business discussions or prepare for meetings between stops." },
              { title: "Diplomatic delegations", desc: "Organised group transport helps delegations arrive together at official engagements. A professional chauffeur manages the planned route and pickup arrangements, while the booking team confirms vehicle details and any protocol requirements in advance." },
              { title: "Executive event speakers", desc: "Speakers and panel members travelling between hotels and event venues can share one vehicle instead of coordinating separate trips. This simplifies transport around rehearsals, conference sessions and other scheduled events." }
            ]
          },
          services: {
            badge: "Services",
            title: "Ground transport services using chauffeur-driven MPVs",
            intro: "AB provides chauffeur-driven MPVs for corporate, event and airport transport across its Middle East service locations. Centralised reservations help companies arrange journeys in different cities, with vehicle models and specifications confirmed for each booking. Chauffeurs hold the local commercial licences required for their work and receive defensive-driving training.",
            items: [
              { title: "Corporate Transportation", desc: "Chauffeur-driven transfers for financial roadshows, connecting commercial headquarters, industrial zones and client offices.", href: "/services/corporate-transportation" },
              { title: "Event Transportation", desc: "Coordinated delegate journeys between hotels, venues and staging points. Confirm service availability and vehicle arrangements for your event.", href: "/services/event-transportation" },
              { title: "Airport Transfers", desc: "Pre-arranged airport transfers for corporate groups. Where included in the booking, flight monitoring helps coordinate arrival times, while a meet-and-greet service provides assistance at the terminal.", href: "/services/airport-transfers" }
            ]
          },
          comparison: {
            badge: "At a glance",
            title: "Compare vehicle classes and plan capacity",
            intro: "Choosing the right vehicle helps prevent cramped seating and insufficient luggage space. Consider the number of passengers, the size and quantity of their bags, and any equipment they need to carry. Check the capacity of the specific vehicle before booking, as models and configurations differ.",
            headers: ["Class", "Typical model", "Guests", "Luggage", "Ideal for"],
            rows: [
              ["Premium MPV", "Mercedes V Class or similar", "Up to 6", "Up to 5 standard pieces", "Delegations and small teams"],
              ["Executive SUV", "Cadillac Escalade or similar", "6", "5", "Senior leadership site visits"],
              ["Executive Van", "Mercedes Sprinter or similar", "Up to 14", "Up to 10 standard bags", "Large conference delegations"]
            ]
          },
          coverage: {
            badge: "Coverage",
            title: "Regional ground transport across Saudi Arabia, the UAE and Qatar",
            paragraphs: [
              "AB coordinates chauffeur services in Saudi Arabia, the UAE and Qatar. Coverage for each vehicle class varies by city, so confirm MPV availability when planning travel to Riyadh, Jeddah, Dammam, Dubai, Abu Dhabi or Doha. The Riyadh operations centre provides centralised coordination for bookings, with locations and service arrangements confirmed for each journey.",
              "For cross-border itineraries, clients can discuss route requirements and booking conditions with the team, including journeys connecting with UAE operations. AB coordinates transport in Saudi Arabia, the UAE and Qatar; partner networks support journeys in Bahrain, Kuwait and Oman on request."
            ]
          },
          faqs: {
            badge: "Questions",
            title: "Frequently asked questions",
            items: [
              { question: "How many passengers and luggage items fit in a premium MPV?", answer: "Capacity depends on the vehicle model and seating layout. Some premium MPVs carry up to six passengers and five standard luggage pieces, but these figures are not guaranteed for every vehicle. Tell the booking team how many people are travelling and the size of their bags, especially if you have oversized cases or exhibition materials." },
              { question: "Can the seating configuration be adjusted?", answer: "Seating layouts vary by vehicle. Some MPVs offer face-to-face seating, while others have forward-facing seats. Share your preference when making a reservation so the team can confirm which configuration is available and arrange it before pickup where possible." },
              { question: "How are airport pickups arranged for groups?", answer: "Airport pickup arrangements depend on the service selected. Confirm whether flight monitoring and a meet-and-greet service are included in your booking. If provided, the chauffeur uses the agreed meeting instructions to greet the group, assist with luggage and guide passengers to the vehicle. Share flight details and a contact number in advance." },
              { question: "Can I book an MPV for a multi-day roadshow?", answer: "Multi-day bookings can be arranged for roadshows and other scheduled business travel, subject to vehicle and driver availability. Provide the itinerary, daily timings and planned stops when requesting a quote. The team will confirm whether the same driver can remain with your group throughout the journey." },
              { question: "What qualifications do chauffeurs hold?", answer: "Chauffeur qualifications and training depend on local requirements and company procedures. Ask the service team about licensing, screening and driver training when these details are important to your organisation, and share any relevant travel or protocol requirements before the journey." },
              { question: "How do corporate accounts handle billing?", answer: "Corporate account billing arrangements vary. Ask whether consolidated invoices, journey details or cost-centre reporting are available for your destinations. A dedicated account contact can explain the payment terms and information provided, helping your procurement team align transport bookings with its travel policy." },
              { question: "Can I arrange inter-city travel between Riyadh and the Eastern Province?", answer: "Ask the team to confirm availability for routes between Riyadh, Dammam and Al Khobar. For a longer journey, provide your preferred departure time, passenger numbers and luggage requirements. The service team can confirm the vehicle, planned stops and any arrangements needed before you complete your booking." },
              { question: "What safety and duty-of-care measures apply to each transfer?", answer: "Vehicle maintenance, inspections, driver procedures and tracking options depend on the service and operating location. Ask which measures apply to your transfer and whether live journey updates are available. Confirm the pickup details and emergency contact process before travel." }
            ]
          },
          cta: {
            title: "Arrange chauffeur-driven group transport",
            subtitle: "Book group transport",
            paragraphs: [
              "Share your group size, luggage requirements, itinerary and preferred timings with the transport team. They can help you select a suitable vehicle and confirm availability, capacity and service arrangements for your destinations.",
              "Request a quote for individual transfers or contact the team to discuss corporate bookings and account arrangements. Confirm the vehicle and service details before travel."
            ]
          }
        },
      },
      ar: {
        title: "ميني فان مميز",
        model: "مرسيدس فئة V",
        tagline: "تنقل تنفيذي مرن لفرق العمل الصغيرة والعائلات.",
        description: [
          "تحوّل فئة V وقت السفر إلى وقت مفيد: تخطيط مقاعد متقابلة يسمح للفرق الصغيرة بعقد اجتماعاتها أثناء التنقل، وتنتقل العائلات معًا دون تقسيمها بين سيارات متعددة.",
          "تأتي لتجمع الفجوة بين السيدان التنفيذية والباص الكامل، مع الحفاظ على نفس المعيار الأسود وخدمة السائق في كل فئات AB.",
        ],
        features: [
          { title: "تخطيط اجتماعي", desc: "مقاعد متقابلة في الخلف للاجتماعات والنقاشات ومشاركة وقت السفر." },
          { title: "مساحة للجميع", desc: "تستوعب سبعة ركاب مع مساحة أمتعة لرحلات المطارات والمسافات الطويلة." },
          { title: "واي فاي على متن السيارة", desc: "اتصال وشحن للمقصورة بأكملها لإبقاء الفريق منتجًا." },
          { title: "سرية السائق", desc: "خدمة سائق محترف بنفس معايير البروتوكول المعتمدة لسياراتنا." },
        ],
        idealFor: [
          "نقل الفرق والمشاريع الصغيرة",
          "السفر العائلي مع الأمتعة",
          "نقل المجموعات بين الفنادق والفعاليات",
          "رحلات المطارات إلى الفنادق",
        ],
      },
    },
  },
  {
    slug: "mpv",
    category: "van",
    image: "/cars/vans/STARIA.png",
    gallery: ["/cars/vans/STARIA.png", "/cars/vans/HAICE.png", "/cars/suvs/Kia_Carnival-minivan.png"],
    passengers: "8",
    luggage: "6",
    copy: {
      en: {
        title: "Executive Minivan",
        model: "Hyundai Staria",
        tagline: "Spacious, modern MPV for group comfort at city speed.",
        description: [
          "The Staria is a lounge on wheels: panoramic visibility, generous legroom and a wide cabin that keeps groups comfortable through dense city traffic and long hotel-to-venue runs.",
          "It is the efficient choice for crew transport, hotel shuttles and leisure groups that need space without stepping up to a full coach.",
        ],
        features: [
          { title: "Lounge seating", desc: "Generous, flexible seating that keeps groups comfortable on every leg of the journey." },
          { title: "Panoramic visibility", desc: "Large glass area and bright cabin for a light, open travel experience." },
          { title: "Large luggage bay", desc: "Deep cargo space for shopping, equipment and group luggage." },
          { title: "Quiet & efficient", desc: "Refined cabin noise levels and economical operation for repeated city cycles." },
        ],
        idealFor: [
          "Group city transfers",
          "Hotel and venue shuttles",
          "Crew and staff transportation",
          "Leisure and shopping trips",
        ],
      },
      ar: {
        title: "ميني فان تنفيذي",
        model: "هيونداي ستاريا",
        tagline: "سيارة واسعة وعصرية لراحة المجموعات في المدينة.",
        description: [
          "ستاريا نادٍ على أربع عجلات: رؤية بانورامية، ومساحة أرجل واسعة، ومقصورة تُبقي المجموعات مريحة في ازدحام المدينة وخلال الرحلات الطويلة من الفندق إلى المقر.",
          "هي الخيار الفعّال لنقل الطواقم والباصات الداخلية للمجموعات السياحية عندما تحتاج مساحة دون الانتقال إلى باص كامل.",
        ],
        features: [
          { title: "مقاعد بنمط الصالون", desc: "مقاعد واسعة ومرنة تُريح المجموعات في كل مرحلة من الرحلة." },
          { title: "رؤية بانورامية", desc: "مساحة زجاجية كبيرة وإضاءة مريحة لتجربة سفر مفتوحة وخفيفة." },
          { title: "صندوق أمتعة كبير", desc: "مساحة تخزين عميقة للتسوق والمعدات وأمتعة المجموعات." },
          { title: "هدوء وكفاءة", desc: "مستويات ضوضاء منخفضة وتشغيل اقتصادي للرحلات المدينة المتكررة." },
        ],
        idealFor: [
          "نقل المجموعات داخل المدينة",
          "النقل الداخلي للفنادق والمقرات",
          "نقل الطواقم والموظفين",
          "الرحلات الترفيهية والتسوق",
        ],
      },
    },
  },
  {
    slug: "kia-carnival",
    category: "van",
    image: "/cars/suvs/Kia_Carnival-minivan.png",
    gallery: ["/cars/suvs/Kia_Carnival-minivan.png", "/cars/vans/STARIA.png", "/cars/vans/V_Class.png"],
    passengers: "8",
    luggage: "6",
    copy: {
      en: {
        title: "Executive Minivan",
        model: "Kia Carnival",
        tagline: "Premium eight-seat MPV comfort for executive groups.",
        description: [
          "The Kia Carnival is a lounge-style minivan: eight seats in a flexible layout, sliding-door practicality and a quiet cabin that keeps executive groups comfortable on city and airport runs.",
          "It carries the AB brand standard — immaculate, late-model and strictly black — with a professional chauffeur dispatched on every trip.",
        ],
        features: [
          { title: "Eight-seat flexibility", desc: "Flexible seating for eight with individual comfort for every passenger." },
          { title: "Sliding-door practicality", desc: "Wide sliding doors and low step-in for quick, dignified boarding in formal wear." },
          { title: "Large luggage bay", desc: "Deep cargo space behind the last row for airport and group luggage." },
          { title: "Quiet & efficient", desc: "Refined cabin noise levels and economical running for repeated city cycles." },
        ],
        idealFor: [
          "Executive group airport transfers",
          "Family and VIP travel with luggage",
          "Hotel and venue shuttles",
          "Delegation city transfers",
        ],
      },
      ar: {
        title: "ميني فان تنفيذي",
        model: "كيا كارنفال",
        tagline: "راحة سيارة فاخرة لثمانية ركاب في المجموعات التنفيذية.",
        description: [
          "كيا كارنفال ميني فان بنمط الصالون: ثمانية مقاعد بتخطيط مرن وأبواب منزلقة ومقصورة هادئة تُريح المجموعات التنفيذية في تنقلات المدينة والمطار.",
          "تحمل معيار هوية AB — نظيفة وحديثة وسوداء بشكل صارم — مع سائق محترف في كل رحلة.",
        ],
        features: [
          { title: "مرونة ثمانية مقاعد", desc: "مقاعد مرنة لثمانية أشخاص مع راحة فردية لكل راكب." },
          { title: "أبواب منزلقة عملية", desc: "أبواب منزلقة واسعة ومسافة دخول منخفضة لركوب سريع وأنيق بالزي الرسمي." },
          { title: "صندوق أمتعة كبير", desc: "مساحة تخزين عميقة خلف المقعد الأخير لأمتعة المطارات والمجموعات." },
          { title: "هدوء وكفاءة", desc: "مستويات ضوضاء منخفضة وتشغيل اقتصادي للرحلات المدينة المتكررة." },
        ],
        idealFor: [
          "تنقلات المجموعات التنفيذية من المطارات",
          "سفر العائلات وكبار الشخصيات مع الأمتعة",
          "النقل الداخلي للفنادق والمقرات",
          "تنقلات الوفود داخل المدينة",
        ],
      },
    },
  },
  {
    slug: "sprinter",
    category: "van",
    anchors: ["sprinters"],
    image: "/cars/vans/Sprinter.png",
    heroExteriorImage: "/fleet/www.ab.limo-fleet-premium-mpv-images/image1.jpg",
    gallery: ["/fleet/www.ab.limo-fleet-premium-mpv-images/image1.jpg", "/fleet/www.ab.limo-fleet-premium-mpv-images/image2.jpg", "/cars/vans/Sprinter.png"],
    passengers: "12",
    luggage: "10",
    copy: {
      en: {
        title: "Luxury Sprinters",
        model: "Mercedes Sprinter",
        tagline: "Bespoke luxury cabin for first-class group travel.",
        description: [
          "The luxury Sprinter converts a van into a first-class lounge: twelve seats in a conference or club layout, a partitioned cabin, ambient lighting and space to hold a briefing en route.",
          "Assigned for diplomatic delegations, executive teams and VIP guests, it is presented in the AB brand standard with a chauffeur trained in protocol service.",
        ],
        features: [
          { title: "12-seat lounge layout", desc: "Club-style seating for twelve with tables for work or refreshment service." },
          { title: "Partitioned privacy", desc: "Separate driver partition and privacy glass for confidential conversations." },
          { title: "Onboard Wi-Fi & bar", desc: "Connectivity, charging and a refreshment station for longer journeys." },
          { title: "Airport & event dispatch", desc: "Luggage capacity and coordination for terminal-side pickup and event staging." },
        ],
        idealFor: [
          "Diplomatic and state delegations",
          "Executive team travel with luggage",
          "VIP guest transfers",
          "Event and conference shuttles",
        ],
        richContent: {
          heroTitle: "Executive Van and Group Transport with Driver",
          heroSubtitle: "Book an executive van with a driver for airport transfers, event transportation, business travel and group trips across the Gulf.",
          heroParagraphs: [
            "Book an executive van with a driver for airport transfers, event transportation, business travel and group trips across the Gulf. Options include a Mercedes Sprinter with driver or a comparable vehicle, subject to availability. AB arranges chauffeur service for teams, private groups and VIP guests, with professional drivers for airport, hotel and venue transfers. Share your dates, route, passenger numbers, seating needs and luggage details when booking; we will confirm the suitable vehicle and provide a quote.",
            "A sprinter chauffeur can support city tours, business meetings or a full-day itinerary. Choose a comfortable vehicle with a spacious interior and comfortable seating for a relaxed ride."
          ],
          idealForSummary: "Event shuttles and offsites",
          inside: {
            badge: "Inside",
            title: "Comfort and Seating Across Executive Vehicles",
            paragraphs: [
              "Cabin layouts vary by vehicle and configuration. An executive van or minibus may offer elevated roof clearance, generous legroom and comfortable seating for group travel. Confirm passenger and luggage capacity when booking, as the space available for bags depends on the number of seats in use. Wide sliding doors and a clear aisle help passengers board and leave efficiently between event stops.",
              "For a Mercedes Sprinter, features such as leather seating, acoustic glass, climate control, armrests and storage depend on the model and specification. Ask your chauffeur service which features are included in the vehicle assigned to your journey. A professional chauffeur and a well-prepared cabin support a comfortable ride for passengers, whether a team is travelling between business hubs or heading to an event.",
              "A spacious interior gives passengers room to board and settle in. During city transfers and airport journeys, check the seating plan and luggage allowance with your driver in advance to help ensure the vehicle suits your group."
            ],
            image: "/fleet/www.ab.limo-fleet-premium-mpv-images/image2.jpg",
            imageAlt: "Executive Van passenger cabin interior",
            caption: "A spacious interior gives passengers room to board and settle in."
          },
          onboard: {
            badge: "Onboard",
            title: "Onboard Features Across Executive Vehicles",
            intro: "AB prepares vehicles before dispatch for business journeys, team travel and event transportation. Available onboard features vary by vehicle and seating configuration, so confirm the details with the chauffeur service when booking. A professional chauffeur helps passengers settle in and supports a smooth journey between destinations.",
            amenities: [
              { title: "Bottled Water for Passengers", desc: "Where provided, bottled water is placed in the cabin before departure. Ask about refreshments when arranging your service, particularly for a full day of transfers or scheduled shuttle journeys." },
              { title: "Device Charging Options", desc: "Some vehicles have USB or other charging ports for passengers' phones and tablets. Check the port types and availability before travel, and bring a suitable charging cable for your device." },
              { title: "Onboard Wi-Fi Availability", desc: "Wi-Fi is not available in every vehicle, and signal strength depends on network coverage along the route. Confirm availability in advance if passengers need internet access for business tasks or team communication." },
              { title: "Lighting and Climate Controls", desc: "Personal reading lights and individual air vents vary by vehicle. Ask your driver or booking contact which controls are available at each seat, especially when arranging transportation for passengers with different comfort needs." }
            ]
          },
          useCases: {
            badge: "Applications",
            title: "When to Choose an Executive Van or Minibus",
            intro: "An executive van or minibus suits groups who need to travel together but do not require a large coach. Choose the vehicle according to passenger numbers, seating, luggage, route, schedule and budget. A chauffeur service can arrange a single transfer or transportation throughout the day.",
            cases: [
              { title: "Event Shuttles Between Hotels, Venues and Dinner Locations", desc: "Event organisers use group transport to connect hotels, exhibition venues and private dining locations. For busy events, planned vehicle rotations help passengers follow departure times and reach each stop. Confirm access and pick-up points with your event transportation provider." },
              { title: "Corporate Retreats, Offsites and Business Meetings", desc: "A van gives a business team the chance to travel together between offices and regional venues. Select a vehicle with suitable seating and luggage space for the group's itinerary, supported by a professional chauffeur for full-day programmes." },
              { title: "Delegations and VIP Guest Transfers", desc: "For official delegations and VIP guests, confirm passenger capacity, equipment and luggage requirements before booking. A professional driver and experienced chauffeur help coordinate pick-ups and travel between locations. Vehicle choice, including a Sprinter or minibus, depends on the group size and route." }
            ]
          },
          services: {
            badge: "Services",
            title: "Group Ground Transportation Services",
            intro: "AB arranges group transportation in Saudi Arabia, the UAE and Qatar, with vehicle options selected according to passenger numbers, seating, luggage and route requirements. Services include event transport, business travel and airport transfers. Dispatch teams coordinate bookings, share route updates and communicate with the chauffeur.",
            items: [
              { title: "Event Transportation", desc: "Organisers use AB to coordinate speaker, sponsor and delegate movements between venues. A chauffeur service helps event teams plan group transfers for busy events.", href: "/services/event-transportation" },
              { title: "Corporate Transportation", desc: "Companies arrange staff transportation routes and business meeting transfers. Corporate account and monthly invoice options are available; confirm terms when booking.", href: "/services/corporate-transportation" },
              { title: "Workforce Transportation", desc: "AB coordinates crew transfers, airport journeys and project team travel. Choose a vehicle such as a minibus, or request a larger coach for bigger groups.", href: "/services/workforce-mobility" }
            ]
          },
          comparison: {
            badge: "At a glance",
            title: "Comparing Executive Vans, MPVs and Coaches",
            intro: "Choose a vehicle according to passenger numbers, seating needs, luggage and route. An executive van, such as a Mercedes Sprinter, sits between a premium MPV and a coach in size. The right option for group travel depends on the specific vehicle and configuration, so confirm capacity with your chauffeur before booking.",
            headers: ["Fleet Class", "Typical Model", "Guests", "Luggage", "Ideal Use"],
            rows: [
              ["Executive Van", "Mercedes Sprinter or similar", "Up to 14", "Up to 10 standard bags", "Event shuttles and offsites"],
              ["Premium MPV", "Mercedes V Class or similar", "Up to 6", "Up to 5 standard pieces", "Smaller groups and individual journeys"],
              ["Coach", "King Long Bus or similar", "43–49", "30", "Larger groups and longer routes"]
            ]
          },
          coverage: {
            badge: "Coverage",
            title: "Group Transportation Service Areas",
            paragraphs: [
              "AB arranges ground transportation across Saudi Arabia, the UAE and Qatar, with service options varying by city and vehicle availability. Coverage includes Riyadh, Jeddah, Dammam, Dubai, Abu Dhabi and Doha. Bahrain, Kuwait and Oman requests are handled through regional partners. Confirm the route, passenger numbers and airport or other pick-up details when booking, particularly for cross-border travel.",
              "AB lists operations offices in Riyadh (headquarters and 24/7 dispatch), Dubai, Abu Dhabi and Doha. Contact the team to confirm local services, chauffeur arrangements and availability for your travel day on +966 58 111 8720."
            ]
          },
          faqs: {
            badge: "Questions",
            title: "Frequently Asked Questions About Group Transport and Chauffeur Services",
            items: [
              { question: "How many passengers and how much luggage can an executive van carry?", answer: "Capacity depends on the vehicle and seating configuration. Some Mercedes Sprinter options accommodate up to 14 passengers and 10 standard bags, but confirm the available seating and luggage space when booking. Tell the team about extra equipment so they can recommend a suitable vehicle for your group travel." },
              { question: "Does executive van hire include a chauffeur?", answer: "Chauffeur arrangements are confirmed with your booking. Ask whether a professional chauffeur is included, and confirm the service area, schedule and vehicle details. AB coordinates driver assignments and duty requirements for its transportation services." },
              { question: "How are airport transfers arranged for groups?", answer: "Provide flight details, passenger numbers and luggage information when requesting airport transfers. Confirm whether flight monitoring and an arrivals-hall meet and greet are included for your airport. Allow time for baggage collection before the group leaves the terminal." },
              { question: "Can I arrange event shuttle routes across multiple cities?", answer: "Event organisers can request transport between hotels, venues and dining locations. Share the itinerary, timings and passenger numbers so the team can plan suitable transfers. Availability, dispatch hours and real-time route updates depend on the service booked." },
              { question: "What safety checks apply to the vehicles and professional drivers?", answer: "Ask AB which inspections, safety equipment and driver checks apply to your selected vehicle. Confirm seatbelt availability and any requirements for a longer journey. Vehicle specifications and safety procedures can vary across the fleet." },
              { question: "Can corporate clients arrange monthly invoicing?", answer: "Corporate accounts and consolidated monthly invoices are subject to AB's terms. Ask the team about account eligibility, itemised transfer details and reporting before scheduling regular services. Businesses can discuss recurring transportation with an account representative." },
              { question: "Where are group chauffeur services available?", answer: "AB lists services across Saudi Arabia, the UAE and Qatar. Bahrain, Kuwait and Oman requests are handled through regional partners. Confirm availability for your destination, vehicle and route, including cross-border travel." },
              { question: "How do I book a van with driver?", answer: "Submit your dates, route, passenger count, luggage needs and flight details through the booking portal. AB will confirm vehicle availability, service inclusions and the quotation. Before travel, check the pick-up plan and driver contact details." }
            ]
          },
          cta: {
            title: "Plan Group Transportation with a Chauffeur",
            subtitle: "Book group transport",
            paragraphs: [
              "Arrange transportation for a corporate delegation, conference shuttle or team journey with AB's group transport services. Share your passenger numbers, route, schedule and luggage requirements so the team can recommend a suitable vehicle and confirm the chauffeur service.",
              "Use the booking form to outline your plans, check availability and request a proposal for your journey across the Gulf."
            ]
          }
        },
      },
      ar: {
        title: "سبرينتر فاخرة",
        model: "مرسيدس سبرينتر",
        tagline: "مقصورة فاخرة مخصصة لسفر المجموعات الدرجة الأولى.",
        description: [
          "تحوّل سبرينتر الفاخرة الفان إلى صالة الدرجة الأولى: اثنا عشر مقعدًا بتخطيط اجتماعي، ومقصورة معزولة، وإضاءة محيطة، ومساحة لعقد اجتماع أثناء التنقل.",
          "تُخصَّص للوفود الدبلوماسية وفرق المسؤولين وضيوف كبار الشخصيات، وتُقدَّم وفق معيار هوية AB مع سائق مدرب على خدمة البروتوكول.",
        ],
        features: [
          { title: "صالة بـ12 مقعدًا", desc: "مقاعد بنمط النادي لاثنا عشر شخصًا مع طاولات للعمل أو خدمة الضيافة." },
          { title: "خصوصية معزولة", desc: "فاصل بين السائق وزجاج خاص للمحادثات السرية." },
          { title: "واي فاي وضيافة على متنها", desc: "اتصال وشحن ومحطة ضيافة للرحلات الأطول." },
          { title: "تنسيق المطارات والفعاليات", desc: "سعة أمتعة وتنسيق للاستلام من مبنى الرحلات وتشغيل الفعاليات." },
        ],
        idealFor: [
          "الوفود الدبلوماسية والرسمية",
          "سفر فرق المسؤولين مع الأمتعة",
          "نقل ضيوف كبار الشخصيات",
          "باصات الفعاليات والمؤتمرات",
        ],
      },
    },
  },
  {
    slug: "mini-bus",
    category: "bus",
    anchors: ["buses"],
    image: "/cars/vans/Maxus.png",
    gallery: ["/cars/vans/Maxus.png", "/cars/vans/HAICE.png", "/cars/vans/COASTER.png"],
    passengers: "20–25",
    luggage: "15",
    copy: {
      en: {
        title: "Mini Bus (20 to 25 Seater)",
        model: "Maxus V90",
        tagline: "20–25 seat minibus for efficient daily group transfers.",
        description: [
          "The Maxus V90 covers the middle ground of group travel: twenty to twenty-five seats with generous headroom, aisle access and luggage space sized for hotel shuttles and airport rotations.",
          "It is dispatched in the AB brand standard — immaculate, late-model and strictly black — with a professional chauffeur and dispatch coordination for every movement.",
        ],
        features: [
          { title: "20–25 seats", desc: "Right-sized capacity for mid-size groups without the cost of a full coach." },
          { title: "Climate-controlled comfort", desc: "Full air conditioning and comfortable seating across the cabin." },
          { title: "Luggage space", desc: "Rear and overhead storage for group luggage and equipment." },
          { title: "Dispatch coordination", desc: "Scheduled loops and live dispatch tracking for repeated shuttle routes." },
        ],
        idealFor: [
          "Hotel and venue shuttles",
          "Staff and crew transportation",
          "Airport group rotations",
          "Event guest transfers",
        ],
      },
      ar: {
        title: "ميني باص (20 إلى 25 مقعدًا)",
        model: "ماكس V90",
        tagline: "ميني باص بـ20 إلى 25 مقعدًا لنقل المجموعات اليومي الفعال.",
        description: [
          "يغطي ماكس V90 المنطقة الوسطى من السفر الجماعي: عشرون إلى خمسة وعشرون مقعدًا مع مساحة رأس واسعة وممرات مريحة ومساحة أمتعة تناسب باصات الفنادق ودوران المطارات.",
          "يُوجَّه وفق معيار هوية AB — نظيف وحديث وأسود بشكل صارم — مع سائق محترف وتنسيق إرسال لكل حركة.",
        ],
        features: [
          { title: "من 20 إلى 25 مقعدًا", desc: "سعة مناسبة للمجموعات المتوسطة دون تكلفة الباص الكامل." },
          { title: "راحة مع تكييف", desc: "تكييف كامل ومقاعد مريحة في جميع المقاعد." },
          { title: "مساحة أمتعة", desc: "تخزين خلفي وعلوي لأمتعة المجموعات ومعداتها." },
          { title: "تنسيق الإرسال", desc: "مسارات متكررة وتتبع مباشر لإرسال الباصات الداخلية." },
        ],
        idealFor: [
          "باصات الفنادق والمقرات",
          "نقل الطواقم والموظفين",
          "دوران المطارات للمجموعات",
          "نقل ضيوف الفعاليات",
        ],
      },
    },
  },
  {
    slug: "toyota-hiace",
    category: "bus",
    image: "/cars/vans/HAICE.png",
    gallery: ["/cars/vans/HAICE.png", "/cars/vans/Maxus.png", "/cars/vans/COASTER.png"],
    passengers: "20–25",
    luggage: "15",
    copy: {
      en: {
        title: "Mini Bus (20 to 25 Seater)",
        model: "Toyota Hiace",
        tagline: "The trusted workhorse for daily 20–25 seat group movement.",
        description: [
          "The Toyota Hiace is the world's proven people-mover: twenty to twenty-five seats, a reputation for reliability and easy access that keeps repeated daily shuttles running on time.",
          "Presented in the AB brand standard — immaculate, late-model and strictly black — it serves staff transport, pilgrim and tourism groups with the same chauffeur protocol as every AB class.",
        ],
        features: [
          { title: "20–25 seats", desc: "Proven high-capacity layout for mid-size groups and staff transports." },
          { title: "Easy boarding", desc: "Wide sliding door and low step for quick boarding at hotel and venue doors." },
          { title: "Fuel-efficient running", desc: "Economical operation keeps repeated daily loops predictable in cost." },
          { title: "Reliability on schedule", desc: "A fleet workhorse with a service record built for daily, multi-stop duty." },
        ],
        idealFor: [
          "Staff and workforce transport",
          "Religious and tourism groups",
          "Daily hotel shuttle loops",
          "Conference venue loops",
        ],
      },
      ar: {
        title: "ميني باص (20 إلى 25 مقعدًا)",
        model: "تويوتا هايس",
        tagline: "الخيار الموثوق لنقل المجموعات اليومي بـ20 إلى 25 مقعدًا.",
        description: [
          "تويوتا هايس ناقل الركاب المثبت عالميًا: عشرون إلى خمسة وعشرون مقعدًا وسمعة في الموثوقية وسهولة تجعل الباصات الداخلية المتكررة في موعدها.",
          "تُقدَّم وفق معيار هوية AB — نظيفة وحديثة وسوداء بشكل صارم — وتخدم نقل الموظفين والمجموعات السياحية والدينية بنفس بروتوكول السائق.",
        ],
        features: [
          { title: "من 20 إلى 25 مقعدًا", desc: "تخطيط مثبت وعالي السعة للمجموعات المتوسطة وتنقلات الموظفين." },
          { title: "ركوب سهل", desc: "باب منزلق واسع ومسافة دخول منخفضة للركوب السريع عند أبواب الفنادق والمقرات." },
          { title: "كفاءة وقود", desc: "تشغيل اقتصادي يجعل المسارات اليومية المتكررة متوقعة التكلفة." },
          { title: "موثوقية بالموعد", desc: "سيارة عمل أسطولية بسجل خدمة مصمم للاستخدام اليومي متعدد المحطات." },
        ],
        idealFor: [
          "نقل الموظفين والعمالة",
          "المجموعات الدينية والسياحية",
          "مسارات الباصات الداخلية اليومية",
          "حلقات الفعاليات والمؤتمرات",
        ],
      },
    },
  },
  {
    slug: "toyota-coaster",
    category: "bus",
    anchors: ["coaches"],
    image: "/cars/vans/COASTER.png",
    gallery: ["/cars/vans/COASTER.png", "/cars/buses/Mid_Size_Bus.png", "/cars/buses/Ankai-Coster.png"],
    passengers: "31–35",
    luggage: "20",
    copy: {
      en: {
        title: "Mini Coach Bus (31 to 35 Seater)",
        model: "Toyota Coaster",
        tagline: "31–35 seat mini coach for teams, guests and charters.",
        description: [
          "The Toyota Coaster is the mini coach standard: thirty-one to thirty-five seats in a single-deck layout with the visibility, climate control and luggage capacity that group programmes expect.",
          "Assigned for staff rotations, event shuttles and intercity charters, every Coaster is presented in the AB brand standard with a professional driver-coordinator on duty.",
        ],
        features: [
          { title: "31–35 seats", desc: "Capacity that moves a full delegation or department in one dispatch." },
          { title: "Full air conditioning", desc: "Even climate control across the cabin for hot-climate group travel." },
          { title: "Luggage compartments", desc: "Overhead and rear storage sized for day trips and overnight programmes." },
          { title: "Route planning", desc: "Planned stops, staging and live dispatch tracking for coordinated movements." },
        ],
        idealFor: [
          "Staff rotations and shift changes",
          "Intercity group charters",
          "Event and conference shuttles",
          "Delegation day trips",
        ],
      },
      ar: {
        title: "باص كوتش متوسط (31 إلى 35 مقعدًا)",
        model: "تويوتا كوستر",
        tagline: "كوتش متوسط بـ31 إلى 35 مقعدًا للفرق والضيوف والإيجارات.",
        description: [
          "تويوتا كوستر معيار الباصات المتوسطة: واحد وثلاثون إلى خمسة وثلاثون مقعدًا في طابق واحد مع الرؤية والتكييف وسعة الأمتعة التي تتوقعها البرامج الجماعية.",
          "تُخصَّص لتناوب الموظفين وباصات الفعاليات والإيجارات بين المدن، وكل كوستر يُقدَّم وفق معيار هوية AB مع سائق منسق في الخدمة.",
        ],
        features: [
          { title: "من 31 إلى 35 مقعدًا", desc: "سعة تنقل وفدًا كاملًا أو إدارة في إرسال واحد." },
          { title: "تكييف مركزي كامل", desc: "توزيع متوازن للحرارة في المقصورة لسفر المجموعات في مناخ المنطقة." },
          { title: "صناديق أمتعة", desc: "تخزين علوي وخلفي يتسع للرحلات اليومية والبرامج الليلة." },
          { title: "تخطيط المسارات", desc: "محطات مخططة وتشغيل وتتبع مباشر للحركات المنسقة." },
        ],
        idealFor: [
          "تناوب الموظفين وفرق المناوبات",
          "الإيجارات الجماعية بين المدن",
          "باصات الفعاليات والمؤتمرات",
          "رحلات اليوم للوفود",
        ],
      },
    },
  },
  {
    slug: "mid-size-bus",
    category: "bus",
    image: "/cars/buses/Mid_Size_Bus.png",
    gallery: ["/cars/buses/Mid_Size_Bus.png", "/cars/vans/COASTER.png", "/cars/buses/Ankai-Coster.png"],
    passengers: "31–35",
    luggage: "20",
    copy: {
      en: {
        title: "Mini Coach Bus (31 to 35 Seater)",
        model: "Mid Size Bus",
        tagline: "Mid-size coach comfort for events and intercity group travel.",
        description: [
          "The mid-size bus bridges minibus and full coach: thirty-one to thirty-five reclining seats, large side windows and a luggage bay suited to multi-day itineraries and airport programmes.",
          "Coaches are assigned with route planning and on-site coordination for events, all under the AB brand standard of immaculate, late-model, strictly black vehicles.",
        ],
        features: [
          { title: "31–35 reclining seats", desc: "Comfortable coach seating with recline and generous legroom for longer legs." },
          { title: "Large luggage bay", desc: "Underfloor storage sized for airport rotations and overnight travel." },
          { title: "Panoramic windows", desc: "Large glass area for sightseeing and daylight-filled cabins on tourism routes." },
          { title: "Event coordination", desc: "Staging plans and dispatch coordination for large programmes." },
        ],
        idealFor: [
          "Multi-day tourism programmes",
          "Airport group rotations",
          "Conference and event transfers",
          "Intercity staff travel",
        ],
      },
      ar: {
        title: "باص كوتش متوسط (31 إلى 35 مقعدًا)",
        model: "باص متوسط الحجم",
        tagline: "راحة الباص المتوسط للفعاليات والسفر الجماعي بين المدن.",
        description: [
          "الباص المتوسط يجمع بين الميني باص والباص الكامل: واحد وثلاثون إلى خمسة وثلاثون مقعدًا قابل للإمالة ونوافذ جانبية كبيرة وصندوق أمتعة مناسب للبرامج متعددة الأيام ورحلات المطارات.",
          "تُخصص الباصات مع تخطيط المسارات ومنسقين في موقع الفعاليات، ضمن معيار هوية AB للسيارات النظيفة الحديثة السوداء.",
        ],
        features: [
          { title: "من 31 إلى 35 مقعدًا قابلًا للإمالة", desc: "مقاعد كوتش مريحة مع الإمالة ومساحة أرجل واسعة للرحلات الأطول." },
          { title: "صندوق أمتعة كبير", desc: "تخزين سفلي يتسع لدوران المطارات والسفر الليلة." },
          { title: "نوافذ بانورامية", desc: "مساحة زجاجية كبيرة للإطلالات ومقصورة مضيئة في الرحلات السياحية." },
          { title: "تنسيق الفعاليات", desc: "خطط تشغيل وتنسيق إرسال للبرامج الكبيرة." },
        ],
        idealFor: [
          "البرامج السياحية متعددة الأيام",
          "دوران المطارات للمجموعات",
          "نقل المؤتمرات والفعاليات",
          "سفر الموظفين بين المدن",
        ],
      },
    },
  },
  {
    slug: "ankai-coster",
    category: "bus",
    image: "/cars/buses/Ankai-Coster.png",
    gallery: ["/cars/buses/Ankai-Coster.png", "/cars/vans/COASTER.png", "/cars/buses/Mid_Size_Bus.png"],
    passengers: "31–35",
    luggage: "20",
    copy: {
      en: {
        title: "Mini Coach Bus (31 to 35 Seater)",
        model: "Ankai Coster",
        tagline: "Value-driven 31–35 seat coach for workforce and charter mobility.",
        description: [
          "The Ankai Coster is the economical mid-size coach of the fleet: thirty-one to thirty-five seats built for the daily, high-frequency duty of workforce transport and scheduled charters.",
          "It is maintained to the AB presentation standard — immaculate and strictly black — and dispatched with the same route planning and chauffeur discipline as every AB class.",
        ],
        features: [
          { title: "31–35 seats", desc: "High-capacity single-deck layout for departments, crews and charter groups." },
          { title: "Durability on daily duty", desc: "Built for high-frequency, multi-stop schedules without compromise on comfort." },
          { title: "Climate comfort", desc: "Full air conditioning suited to long GCC summer schedules." },
          { title: "Scheduled dispatch", desc: "Fixed timetables and loop routing for workforce programmes." },
        ],
        idealFor: [
          "Workforce and staff transportation",
          "Scheduled workforce loops",
          "Charter group travel",
          "Campus and compound shuttles",
        ],
      },
      ar: {
        title: "باص كوتش متوسط (31 إلى 35 مقعدًا)",
        model: "أنكاي كوستر",
        tagline: "باص متوسط اقتصادي بـ31 إلى 35 مقعدًا لنقل العمالة والإيجارات.",
        description: [
          "أنكاي كوستر هو الباص المتوسط الاقتصادي في الأسطول: واحد وثلاثون إلى خمسة وثلاثون مقعدًا مصمم للاستخدام اليومي عالي التكرار في نقل العمالة وخطط الإيجار.",
          "يُصان وفق معيار العرض في AB — نظيف وأسود بشكل صارم — ويُوجَّه مع نفس تخطيط المسارات وانضباط السائق يطبق على كل فئات AB.",
        ],
        features: [
          { title: "من 31 إلى 35 مقعدًا", desc: "تخطيط طابق واحد عالي السعة للإدارات والطواقم ومجموعات الإيجار." },
          { title: "متانة للاستخدام اليومي", desc: "مصمم لجداول متكررة متعددة المحطات دون التنازل عن الراحة." },
          { title: "راحة مناخية", desc: "تكييف كامل يناسب جداول الصيف الطويلة في الخليج." },
          { title: "إرسال مجدول", desc: "جداول ثابتة ومسارات حلقة لبرامج العمالة." },
        ],
        idealFor: [
          "نقل العمالة والموظفين",
          "حلقات العمالة المجدولة",
          "السفر الجماعي بالإيجار",
          "باصات الحرم والمجمعات",
        ],
      },
    },
  },
  {
    slug: "king-long-bus",
    category: "bus",
    image: "/cars/buses/King_Long_bus.png",
    heroExteriorImage: "/fleet/www.ab.limo-fleet-coach-images/image1.jpg",
    gallery: ["/fleet/www.ab.limo-fleet-coach-images/image1.jpg", "/fleet/www.ab.limo-fleet-coach-images/image2.jpg", "/cars/buses/King_Long_bus.png"],
    passengers: "43–49",
    luggage: "30",
    copy: {
      en: {
        title: "Luxury Coaches (43 to 49 Seater)",
        model: "King Long Bus",
        tagline: "43–49 seat full-size coach for large delegations and charters.",
        description: [
          "The King Long luxury coach moves large groups in one dispatch: forty-three to forty-nine seats, generous luggage compartments and a quiet, air-conditioned cabin for long intercity legs.",
          "Assigned for conferences, religious tourism and workforce mega-programs, it carries the AB brand standard with onboard coordination for staged arrivals.",
        ],
        features: [
          { title: "43–49 seats", desc: "Full-size capacity for delegations, conference groups and charter parties." },
          { title: "Large luggage compartments", desc: "Underfloor bays sized for multi-day programmes and airport rotations." },
          { title: "Air-conditioned comfort", desc: "Powerful, even cooling and reclining seats for long GCC journeys." },
          { title: "Staged event arrivals", desc: "Timed loops and on-site coordination for large, scheduled programmes." },
        ],
        idealFor: [
          "Conference and delegation movements",
          "Religious and tourism charters",
          "Workforce mega-programs",
          "Large event guest transfers",
        ],
        richContent: {
          heroTitle: "Coach Hire with Driver: AB Coach Class",
          heroSubtitle: "AB provides managed coach hire with driver across Saudi Arabia, the UAE and Qatar for corporate and institutional programmes.",
          heroParagraphs: [
            "AB provides managed coach hire with driver across Saudi Arabia, the UAE and Qatar for corporate and institutional programmes. Every booking deploys a vetted professional chauffeur backed by continuous central flight tracking and live GPS tracking.",
            "Organisations coordinate large passenger movements through dedicated ground transportation specialists who align vehicle allocations with complex venue itineraries. This premium service maintains passenger comfort across long regional transfers and multi vehicle convoys."
          ],
          idealForSummary: "Delegations, events and staff programmes",
          inside: {
            badge: "Inside",
            title: "Inside the Cabin for Coach Hire with Driver",
            paragraphs: [
              "The coach cabin offers an expansive interior engineered for long distance passenger relaxation and productive group transit. Ergonomic reclining passenger seats feature durable leather or executive fabric upholstery, paired with individual overhead reading lights and personal ventilation controls. Wide central aisles allow smooth passenger movement during boarding and disembarkation at major terminal facilities.",
              "For corporate delegations requiring luxury coach rental standards, the cabin interior presents immaculate aesthetic standards and acoustic insulation that dampens exterior roadway noise. Deep tinted privacy glass regulates natural daylight, keeping ambient temperatures balanced across arid Gulf travel corridors. Overhead parcel racks accommodate executive briefcases, while voluminous underfloor storage compartments securely hold large baggage suites.",
              "Underfloor compartments provide partitioned storage areas, allowing ground crew to separate fragile presentation cargo from guest luggage. This arrangement preserves cabin cleanliness and prevents aisle obstructions during regional transfers.",
              "Organised group movements benefit from consistent climate control settings managed directly by the primary cabin system. Passengers remain comfortable during midday desert transfers between metropolitan commercial districts and remote corporate project locations. Every seat position incorporates certified safety restraint belts, supporting corporate duty of care requirements across all regional itineraries."
            ],
            image: "/fleet/www.ab.limo-fleet-coach-images/image2.jpg",
            imageAlt: "Interior view of spacious luxury coach cabin with reclining leather seating",
            caption: "Wide central aisles and reclining seating keep long group transfers comfortable."
          },
          onboard: {
            badge: "Onboard",
            title: "Standard Onboard Amenities and Passenger Comfort",
            intro: "Passenger cabins are equipped with practical utilities designed to maintain guest productivity and comfort throughout regional journeys. Central operations teams confirm that each vehicle meets rigorous sanitisation and technical preparation schedules before departing regional staging depots, and chauffeurs verify that digital charging ports, cabin network routers and refreshment supplies meet specified passenger requirements.",
            amenities: [
              { title: "Chilled Refreshment Water", desc: "Complimentary bottled drinking water is supplied across all guest seats for every scheduled transfer." },
              { title: "Personal Device Charging", desc: "USB charging ports and standard electrical power points are situated at passenger seating rows." },
              { title: "Onboard Wi-Fi Connectivity", desc: "High speed wireless internet access supports uninterrupted mobile communications across urban and highway travel routes." },
              { title: "Climate Regulation System", desc: "Dual zone automated air conditioning maintains uniform thermal stability across the entire passenger interior." }
            ]
          },
          useCases: {
            badge: "Applications",
            title: "When to Select Coach Hire with Driver for Group Travel",
            intro: "Choosing coach hire with driver streamlines group logistics by consolidating numerous passengers into a unified, professionally coordinated vehicle movement. Coordinating multiple smaller private cars often creates arrival dispersion, parking congestion and complex coordination overhead at high security venues. Selecting a full size coach simplifies convoy planning for protocol officers and private event coordinators alike.",
            cases: [
              { title: "Government and Diplomatic Delegations", desc: "Diplomatic missions require coordinated transport between summit halls, international embassies and protocol airstrips. Dedicated coach movements allow entire delegations to travel together under unified security supervision." },
              { title: "Exhibitions and Corporate Events", desc: "International conferences demand precise scheduling between regional airport gates, key hotels and exhibition centres. Dedicated coaches keep corporate attendee groups punctual across intense multi day agendas." },
              { title: "Ongoing Staff Commuter Programmes", desc: "Corporate enterprises operating large operations centres utilise scheduled coach shuttles for technical workforces. Structured workforce routes reduce site vehicle traffic while supporting reliable daily shift arrivals." }
            ]
          },
          services: {
            badge: "Services",
            title: "Managed Ground Transportation Services That Deploy the Coach Class",
            intro: "AB integrates the Coach category into comprehensive ground transportation frameworks across commercial, governmental and cultural sectors. Dedicated account teams design bespoke transportation schedules that combine full size coaches with executive sedans and multi purpose vans from the wider fleet, addressing diverse passenger hierarchies and scheduling demands across major projects.",
            items: [
              { title: "Bus & Coach Hire", desc: "Comprehensive group travel solutions operating across urban centres, including dedicated routes for corporate conventions and scheduled shuttle programmes.", href: "/services/bus-coach-hire" },
              { title: "Event Transportation", desc: "Synchronised conference and summit passenger operations, featuring punctual transfers for major trade expos and venue programmes.", href: "/services/event-transportation" },
              { title: "Workforce Transportation", desc: "Reliable daily employee transit programmes connecting commercial accommodation communities with business parks and industrial headquarters.", href: "/services/workforce-mobility" },
              { title: "Religious Tourism", desc: "Respectful, organised passenger transport for cultural and spiritual itineraries across holy sites in western Saudi Arabia.", href: "/services/religious-tourism" }
            ]
          },
          comparison: {
            badge: "At a glance",
            title: "Comparing Coach Class with the Executive Van",
            intro: "Selecting the appropriate vehicle class depends on overall delegation volume, luggage profiles and venue drop off constraints. While the Executive Van excels at navigating tight hotel entrances and transferring leadership committees, the Coach class accommodates large attendee bodies in a single trip. Assessing these logistical factors in advance prevents unnecessary vehicle chartering and optimises ground movement costs.",
            headers: ["Vehicle Class", "Typical Model", "Guest Capacity", "Luggage Capacity", "Ideal Application"],
            rows: [
              ["Coach", "King Long Bus", "43–49", "30", "Delegations, major public events and structured staff programmes"],
              ["Executive Van", "Mercedes Sprinter", "Up to 14", "Up to 10 standard bags", "Executive boards, airport delegations and small operational teams"]
            ]
          },
          coverage: {
            badge: "Coverage",
            title: "Geographic Coverage Across Saudi Arabia, UAE and Qatar",
            paragraphs: [
              "AB provides direct coach hire with driver operations in Riyadh, Jeddah, Dammam, Dubai, Abu Dhabi and Doha. Direct managed service extends across Saudi Arabia, all seven UAE emirates and the State of Qatar. Operations in Bahrain, Kuwait and Oman are fulfilled exclusively on request through carefully vetted partner networks.",
              "The Riyadh central dispatch operations centre maintains round the clock communication with drivers and on site transport marshals across all active territories. Regional offices in Dubai, Abu Dhabi and Doha provide local operational supervision in key Gulf business centres."
            ]
          },
          faqs: {
            badge: "Questions",
            title: "Frequently Asked Questions About Coach Operations",
            items: [
              { question: "What does coach hire with driver include?", answer: "Coach hire with driver provides a fully licensed luxury vehicle, fuel allowances, professional chauffeur services and comprehensive 24/7 dispatch monitoring. AB operations teams track all vehicle itineraries via GPS tracking, providing route supervision and coordination support. Standard amenities include bottled drinking water and cabin utilities arranged prior to departure." },
              { question: "What passenger group sizes suit 50 seater coach hire?", answer: "The Coach class accommodates groups of up to 43–49 passengers comfortably in an expansive seating cabin. Organising a single coach movement reduces road congestion and streamlines passenger boarding during major commercial summits. Larger conferences utilise multiple coaches dispatched in timed convoys to handle hundreds of attendees seamlessly." },
              { question: "How are luggage and passenger belongings managed onboard?", answer: "The coach features generous lower belly luggage holds suited for large travel suitcases and event equipment. Inside the coach cabin, deep overhead parcel racks hold executive briefcases, coats and personal carry on bags. Drivers oversee orderly loading and unloading to prevent baggage scuffs and avoid terminal congestion." },
              { question: "Can corporate clients set up monthly billing accounts?", answer: "Corporate travel managers and government procurement teams can establish a corporate account with flexible credit structures. This arrangement consolidates multi city journeys across Saudi Arabia, the UAE and Qatar into a transparent monthly invoice. Dedicated account representatives handle route adjustments, passenger manifests and itemised invoicing details." },
              { question: "What standards apply to professional chauffeur teams?", answer: "Every professional chauffeur undergoes rigorous driving assessments, defensive route training and customer service protocol orientation. Drivers wear formal executive suits, maintain complete confidentiality and communicate effectively with flight tracking coordinators. Chauffeurs understand local protocol requirements at major government buildings, international airports and corporate headquarters." },
              { question: "How does AB manage airport meet and greet operations?", answer: "Airport meet and greet teams coordinate directly with flight tracking desks to monitor commercial and private flight arrivals. Ground representatives welcome arriving delegations at the terminal gate or arrivals concourse before escorting them to the waiting coach. The chauffeur coordinates with terminal marshals to stage the luxury vehicle at official passenger pickup zones." },
              { question: "What safety and duty of care standards govern coach operations?", answer: "AB enforces comprehensive duty of care protocols covering mechanical roadworthiness inspections and driver duty hour limitations. Every vehicle operates under real time GPS tracking observed continuously by the central operations centre in Riyadh. Chauffeurs follow strict route safety parameters throughout cross country and urban itineraries." },
              { question: "Which Gulf territories does AB service directly?", answer: "AB directly serves all major commercial regions across Saudi Arabia, all seven UAE emirates and Qatar. Transfers in Bahrain, Kuwait and Oman are fulfilled on request through thoroughly vetted partner transport networks. Central dispatch teams coordinate cross border logistics and permit filings to ensure uninterrupted multinational travel." }
            ]
          },
          cta: {
            title: "Need a larger movement with coach hire with driver?",
            subtitle: "Managed coach movements across the Gulf",
            paragraphs: [
              "Connect with regional transport coordinators to organise large capacity coach movements across the Gulf region.",
              "Share your passenger numbers, route and schedule to receive a coach deployment plan from our Riyadh operations centre, with vehicle allocations aligned to your venue itinerary."
            ]
          }
        },
      },
      ar: {
        title: "باصات فاخرة (43 إلى 49 مقعدًا)",
        model: "باص كينج لونج",
        tagline: "باص فاخر بـ43 إلى 49 مقعدًا للوفود الكبيرة والإيجارات.",
        description: [
          "باص كينج لونج الفاخر ينقل المجموعات الكبيرة في إرسال واحد: ثلاثة وأربعون إلى تسعة وأربعون مقعدًا وصناديق أمتعة واسعة ومقصورة مبردة هادئة لمسافات الطريق الطويلة بين المدن.",
          "يُخصَّص للمؤتمرات والسياحة الدينية وبرامج العمالة الكبرى، وتحمل معيار هوية AB مع تنسيق على متنها للوصول المجدول.",
        ],
        features: [
          { title: "من 43 إلى 49 مقعدًا", desc: "سعة كاملة للوفود ومجموعات المؤتمرات وحفلات الإيجار." },
          { title: "صناديق أمتعة كبيرة", desc: "خزائن سفلية تتسع للبرامج متعددة الأيام ودوران المطارات." },
          { title: "راحة مع تكييف", desc: "تبريد قوي ومتوازن ومقاعد قابلة للإمالة لرحلات الخليج الطويلة." },
          { title: "وصول مجدول للفعاليات", desc: "حلقات مجدولة ومنسق في الموقع للبرامج الكبيرة." },
        ],
        idealFor: [
          "تحركات الوفود والمؤتمرات",
          "الإيجارات الدينية والسياحية",
          "برامج العمالة الكبرى",
          "نقل ضيوف الفعاليات الكبيرة",
        ],
      },
    },
  },
  {
    slug: "vip-luxury-bus",
    category: "bus",
    image: "/cars/buses/VIP_Luxury_bus.png",
    gallery: ["/cars/buses/VIP_Luxury_bus.png", "/cars/buses/King_Long_bus.png", "/cars/buses/Mid_Size_Bus.png"],
    passengers: "43–49",
    luggage: "30",
    copy: {
      en: {
        title: "Luxury Coaches (43 to 49 Seater)",
        model: "VIP Luxury Bus",
        tagline: "Flagship VIP coach for protocol travel, events and tourism.",
        description: [
          "The VIP luxury bus is the flagship of the group fleet: up to forty-nine seats in a premium cabin with lounge-grade upholstery, onboard amenities and the presence expected for state and protocol movement.",
          "It is dispatched for heads-of-delegation travel, gala and event programmes and premium tourism — presented in the AB brand standard with a crew briefed on protocol service.",
        ],
        features: [
          { title: "Up to 49 VIP seats", desc: "Premium, wide seats with lounge-grade comfort for long journeys." },
          { title: "Onboard amenities", desc: "Refreshment service, connectivity and ambient lighting for guests on board." },
          { title: "Protocol presentation", desc: "Immaculate, strictly black exterior and crew trained in protocol etiquette." },
          { title: "Event coordination", desc: "Timed dispatch, staging and live tracking for protocol programmes." },
        ],
        idealFor: [
          "State and protocol delegations",
          "Gala, summit and event programmes",
          "Premium tourism and cultural tours",
          "VIP group airport transfers",
        ],
      },
      ar: {
        title: "باصات فاخرة (43 إلى 49 مقعدًا)",
        model: "باص VIP الفاخر",
        tagline: "باص VIP الرائد للسفر البروتوكولي والفعاليات والسياحة.",
        description: [
          "باص VIP الفاخر هو رائد الأسطول الجماعي: حتى تسعة وأربعون مقعدًا في مقصورة فاخرة مع تنجيد بنمط الصالون وتسهيلات على متنها والحضور المتوقع لتحركات الوفود والبروتوكول.",
          "يُوجَّه لسفر رؤساء الوفود والبرامج الاحتفالية والسياحية المتميزة — ويُقدَّم وفق معيار هوية AB مع طاقم مدرَّب على خدمة البروتوكول.",
        ],
        features: [
          { title: "حتى 49 مقعد VIP", desc: "مقاعد فاخرة واسعة براحة بنمط الصالون للرحلات الطويلة." },
          { title: "تسهيلات على متنها", desc: "خدمة ضيافة واتصال وإضاءة محيطة للضيوف على متن الباص." },
          { title: "حضور بروتوكولي", desc: "خارج أسود بشكل صارم ونظيف وطاقم مدرَّب على آداب البروتوكول." },
          { title: "تنسيق الفعاليات", desc: "إرسال مجدول وتشغيل وتتبع مباشر للبرامج البروتوكولية." },
        ],
        idealFor: [
          "الوفود الرسمية والبروتوكولية",
          "القمم والحفلات وبرامج الفعاليات",
          "السياحة الثقافية المتميزة",
          "تنقلات المجموعات الكبار من المطارات",
        ],
      },
    },
  },
];

/**
 * Interior photo shown in the preview panel for vehicles that don't have a
 * curated FLEET_CLASSES entry (keyed by vehicle slug).
 */
const FLEET_AUTO_INTERIOR_IMAGES: Record<string, string> = {
  "bmw-7-series": "/fleet/www.ab.limo-fleet-first-class-sedan-images/image2.jpg",
  "ford-taurus": "/fleet/www.ab.limo-fleet-standard-sedan-images/image2.jpg",
  "byd-seal-7": "/fleet/www.ab.limo-fleet-standard-sedan-images/image2.jpg",
  "mitsubishi-outlander": "/fleet/executive-suv-interior.jpg",
  "gmc-yukon": "/fleet/executive-suv-interior.jpg",
  "chevrolet-tahoe": "/fleet/executive-suv-interior.jpg",
  mpv: "/fleet/premium-mpv-interior.jpg",
  "kia-carnival": "/fleet/www.ab.limo-fleet-executive-van-images/image2.jpg",
  "toyota-hiace": "/fleet/executive-van-interior.jpg",
  "toyota-coaster": "/fleet/www.ab.limo-fleet-coach-images/image2.jpg",
  "mid-size-bus": "/fleet/executive-van-interior.jpg",
  "ankai-coster": "/fleet/executive-van-interior.jpg",
  "vip-luxury-bus": "/fleet/www.ab.limo-fleet-coach-images/image2.jpg",
};

/**
 * Preview tabs derived from FLEET_VEHICLES for every vehicle that doesn't
 * already map to a curated class — so no vehicle is left out of the explorer.
 */
const FLEET_AUTO_CLASSES: FleetClass[] = FLEET_VEHICLES.filter(
  (vehicle) => !FLEET_CLASSES.some((cls) => cls.slug === vehicle.slug)
).map((vehicle) => ({
  id: vehicle.slug,
  slug: vehicle.slug,
  name: { en: vehicle.copy.en.model, ar: vehicle.copy.ar.model },
  category: { en: vehicle.copy.en.title, ar: vehicle.copy.ar.title },
  typicalModel: { en: vehicle.copy.en.model, ar: vehicle.copy.ar.model },
  guests: vehicle.passengers,
  luggage: vehicle.luggage,
  idealFor: {
    en: vehicle.copy.en.idealFor[0],
    ar: vehicle.copy.ar.idealFor[0],
  },
  tagline: { en: vehicle.copy.en.tagline, ar: vehicle.copy.ar.tagline },
  description: {
    en: vehicle.copy.en.description.join(" "),
    ar: vehicle.copy.ar.description.join(" "),
  },
  image: vehicle.image,
  interiorImage:
    FLEET_AUTO_INTERIOR_IMAGES[vehicle.slug] ?? vehicle.gallery[0],
  interiorLabel: {
    en: `${vehicle.copy.en.model} passenger cabin, prepared to the AB presentation standard before every dispatch.`,
    ar: `مقصورة ركاب ${vehicle.copy.ar.model}، تُجهَّز وفق معيار العرض في AB قبل كل إرسال.`,
  },
}));

/**
 * Final tab order shown by the fleet explorer (grouped by category).
 * Every vehicle slug in FLEET_VEHICLES must appear here exactly once.
 */
const FLEET_CLASS_ORDER: string[] = [
  // Sedans
  "standard-sedan",
  "business-sedan",
  "luxury-sedan",
  "bmw-7-series",
  "ford-taurus",
  "byd-seal-7",
  // SUVs
  "luxury-suv",
  "mitsubishi-outlander",
  "gmc-yukon",
  "chevrolet-tahoe",
  // Vans & MPVs
  "business-van",
  "sprinter",
  "mpv",
  "kia-carnival",
  // Coaches & Buses
  "king-long-bus",
  "mini-bus",
  "toyota-hiace",
  "toyota-coaster",
  "mid-size-bus",
  "ankai-coster",
  "vip-luxury-bus",
];

const FLEET_CLASS_BY_SLUG = new Map<string, FleetClass>(
  [...FLEET_CLASSES, ...FLEET_AUTO_CLASSES].map((cls) => [cls.slug, cls])
);

/** Every fleet class/vehicle as a preview tab (all vehicles, none left out). */
export const FLEET_ALL_CLASSES: FleetClass[] = FLEET_CLASS_ORDER.map(
  (slug) => FLEET_CLASS_BY_SLUG.get(slug)
).filter((cls): cls is FleetClass => Boolean(cls));

/**
 * The 10 main fleet categories shown in the explorer's side panel so the list
 * stays visually aligned with the preview panel. Every other vehicle remains
 * reachable through the quick bar, comparison table and full catalog.
 */
const FLEET_MAIN_CLASS_IDS = new Set<string>([
  // Sedans
  "standard-sedan",
  "business-sedan",
  "first-class-sedan",
  // SUVs
  "executive-suv",
  // Vans & MPVs
  "premium-mpv",
  "executive-van",
  "mpv",
  // Coaches & Buses
  "coach",
  "bus",
  "toyota-hiace",
]);

export const FLEET_MAIN_CLASSES: FleetClass[] = FLEET_ALL_CLASSES.filter(
  (cls) => FLEET_MAIN_CLASS_IDS.has(cls.id)
);

/**
 * Hero quick-bar entries: the main categories plus the most requested
 * models (12 total — two even rows in the 6-column bar).
 */
const FLEET_QUICK_CLASS_IDS = new Set<string>([
  ...FLEET_MAIN_CLASS_IDS,
  "bmw-7-series",
  "vip-luxury-bus",
]);

export const FLEET_QUICK_CLASSES: FleetClass[] = FLEET_ALL_CLASSES.filter(
  (cls) => FLEET_QUICK_CLASS_IDS.has(cls.id)
);

export const FLEET_LABELS: Record<
  FleetLang,
  {
    hero: string;
    breadcrumbFleet: string;
    home: string;
    specifications: string;
    passengers: string;
    luggage: string;
    features: string;
    idealFor: string;
    gallery: string;
    related: string;
    viewDetails: string;
    requestVehicle: string;
    ctaTitle: string;
    ctaDesc: string;
    ctaButton: string;
    fleetTitle: string;
    fleetSubtitle: string;
    hospitality: string;
    governanceBadge: string;
    governanceTitle: string;
    governanceDesc: string;
    empty: string;
  }
> = {
  en: {
    hero: "The Fleet",
    breadcrumbFleet: "Fleet",
    home: "Home",
    specifications: "Specifications",
    passengers: "Passengers",
    luggage: "Luggage",
    features: "Vehicle Features",
    idealFor: "Ideal For",
    gallery: "Gallery",
    related: "More From the Fleet",
    viewDetails: "View Details",
    requestVehicle: "Request This Vehicle",
    ctaTitle: "Need a vehicle on standby?",
    ctaDesc: "Tell us the route, dates and passenger count — our mobility team will propose the right vehicle and a fixed quote.",
    ctaButton: "Talk to the Mobility Team",
    fleetTitle: "Our Fleet",
    fleetSubtitle: "Late-model, strictly black vehicles for executive, corporate and event mobility.",
    hospitality: "Premium hospitality experience: we provide bottled water and light refreshments on every trip to keep guests comfortable.",
    governanceBadge: "Our Vehicle Governance",
    governanceTitle: "Strictly Black. Strictly Professional.",
    governanceDesc:
      "The AB brand standard mandates a uniform fleet of late-model, immaculate black vehicles. No exceptions. We procure and lease dedicated fleets for long-term government and corporate contracts.",
    empty: "Vehicle not found.",
  },
  ar: {
    hero: "الأسطول",
    breadcrumbFleet: "الأسطول",
    home: "الرئيسية",
    specifications: "المواصفات",
    passengers: "الركاب",
    luggage: "الأمتعة",
    features: "مميزات السيارة",
    idealFor: "الأنسب لـ",
    gallery: "معرض الصور",
    related: "من الأسطول",
    viewDetails: "عرض التفاصيل",
    requestVehicle: "اطلب هذه السيارة",
    ctaTitle: "تحتاج سيارة جاهزة؟",
    ctaDesc: "أخبرنا بالمسار والتواريخ وعدد الركاب — سيفترض فريق التنقل السيارة المناسبة وعرض سعر ثابت.",
    ctaButton: "تواصل مع فريق التنقل",
    fleetTitle: "أسطولنا",
    fleetSubtitle: "سيارات حديثة سوداء بالكامل للتنقل التنفيذي والمؤسسي والفعاليات.",
    hospitality: "تجربة ضيافة متميزة: نوفّر مياه معبأة وضيافة خفيفة في كل رحلة لإبقاء الضيوف مرتاحين.",
    governanceBadge: "حوكمة مركباتنا",
    governanceTitle: "سوداء صارمًا. احترافية صارمة.",
    governanceDesc:
      "يفرض معيار هوية AB أسطولًا موحدًا من السيارات السوداء الحديثة النظيفة دون أي استثناء. نحصل على أساطيل مخصصة بالشراء أو الإيجار للعقود الحكومية والمؤسسية طويلة الأجل.",
    empty: "السيارة غير موجودة.",
  },
};

export function fleetLang(lang: string): FleetLang {
  return lang.split("-")[0] === "ar" ? "ar" : "en";
}

export function fleetUrl(lang: string): string {
  return `${localeBase(lang)}/fleet`;
}

export function fleetVehicleUrl(lang: string, slug: string): string {
  return `${localeBase(lang)}/fleet/${slug}`;
}

const FLEET_SLUG_ALIASES: Record<string, string> = {
  "cadillac-escalade": "luxury-suv",
  "escalade": "luxury-suv",
  "mercedes-v-class": "business-van",
  "v-class": "business-van",
  "mercedes-sprinter": "sprinter",
  "sprinter-van": "sprinter",
  "mercedes-s-class": "luxury-sedan",
  "s-class": "luxury-sedan",
  "bmw-5-series": "business-sedan",
};

export function getFleetVehicle(slug: string): FleetVehicle | undefined {
  const direct = FLEET_VEHICLES.find((vehicle) => vehicle.slug === slug);
  if (direct) return direct;
  const alias = FLEET_SLUG_ALIASES[slug.toLowerCase()];
  if (alias) {
    return FLEET_VEHICLES.find((vehicle) => vehicle.slug === alias);
  }
  return undefined;
}
