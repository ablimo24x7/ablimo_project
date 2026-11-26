export interface SketchIndustry {
  id: string;
  name: string;
  num: string;
  desc: string;
  intro: string;
  /** Locale-relative path — prefix with localeBase(lang) at render time. */
  href: string;
  ctaLabel: string;
  img: string;
  imgAlt: string;
  pos: string;
  points: string[];
}

export interface HubStepItem {
  num: string;
  title: string;
  description: string;
}

export interface HubFaqItem {
  q: string;
  a: string;
}

/**
 * Seven sectors from industries-markdown/www.ab.limo-industries.md, blended with
 * the curated hub photography and canonical detail page routes.
 */
export const SKETCH_INDUSTRIES: SketchIndustry[] = [
  {
    id: "aviation",
    name: "Aviation & FBO",
    num: "01",
    desc: "Crew rotations, FBO transfers and standby fleets ready for schedule disruption.",
    intro:
      "Airlines, private jet operators and FBO teams need reliable crew transfers and coordinated airport transit. AB aligns chauffeur services, dispatch and flight schedules for aviation operations in Riyadh, Dubai and Doha, supporting timely movement between terminals and aircraft.",
    href: "/industries/aviation",
    ctaLabel: "Explore crew transportation",
    img: "/industries/aviation.jpg",
    imgAlt: "Chauffeur standing beside a luxury executive saloon on a private jet tarmac",
    pos: "60% 50%",
    points: [
      "Dedicated tarmac airside transfers",
      "Real time flight schedule synchronisation",
      "Complete duty of care compliance",
    ],
  },
  {
    id: "corporate",
    name: "Corporate & Enterprise",
    num: "02",
    desc: "Roadshows, executive travel and staff mobility with centralized billing.",
    intro:
      "Corporate travel managers, procurement teams and executive assistants use corporate transportation solutions for commutes and multi-city roadshows. AB coordinates chauffeurs, account management, invoicing and reporting across Saudi Arabia and the UAE, helping organisations improve transportation services and travel efficiency.",
    href: "/industries/corporate-enterprise",
    ctaLabel: "Explore corporate ground transportation",
    img: "/industries/corporate.jpg",
    imgAlt: "Executive saloon moving along a financial district avenue in Dubai",
    pos: "55% 50%",
    points: [
      "Centralised billing and transparent reporting",
      "Executive roadshow route planning",
      "Professional bilingual corporate chauffeurs",
    ],
  },
  {
    id: "government",
    name: "Government & Diplomatic",
    num: "03",
    desc: "Motorcade planning, protocol trained chauffeurs and discreet delegation movements.",
    intro:
      "Government protocol teams, embassy staff and ministry delegations rely on government transport services for discreet, coordinated journeys. AB arranges chauffeur-led transport for official visits and summits across Saudi Arabia, with attention to protocol, security requirements and passenger duty of care.",
    href: "/industries/government-diplomatic",
    ctaLabel: "Explore diplomatic transportation",
    img: "/industries/government.jpg",
    imgAlt: "Motorcade of black luxury vehicles parked outside a government building in Abu Dhabi",
    pos: "62% 35%",
    points: [
      "Strict diplomatic protocol adherence",
      "Armoured vehicle options on request",
      "Vetted security trained chauffeurs",
    ],
  },
  {
    id: "hospitality",
    name: "Hospitality",
    num: "04",
    desc: "Guest transfers, tours and group movements for hotels and destination partners.",
    intro:
      "Hotel general managers, resort concierge teams and private residence directors use AB's chauffeur service to coordinate guest arrivals with front-of-house staff. Reliable transport supports welcome standards, smooth billing and a premium guest experience in Doha and across the Gulf.",
    href: "/industries/hospitality",
    ctaLabel: "Explore hotel transportation services",
    img: "/industries/hospitality.jpg",
    imgAlt: "Luxury chauffeur vehicle awaiting guests in front of a luxury hotel entrance in Doha",
    pos: "45% 40%",
    points: [
      "White glove guest arrival experiences",
      "Seamless front desk billing integration",
      "Immaculate late model premium fleet",
    ],
  },
  {
    id: "events",
    name: "Events & Exhibitions",
    num: "05",
    desc: "Delegate shuttles, VIP arrivals and venue loading zones run from one control room.",
    intro:
      "Conference organisers, exhibition producers and meeting planners rely on event transportation services to manage attendee demand and venue transit. AB coordinates shuttle routes, staging and VIP speaker transfers, with dispatch support on site to keep movements organised.",
    href: "/industries/events-exhibitions",
    ctaLabel: "Explore exhibition transportation services",
    img: "/industries/events.jpg",
    imgAlt: "Fleet of executive vans and saloons stationed at an exhibition centre staging area in Riyadh",
    pos: "50% 62%",
    points: [
      "On site dispatch coordinators",
      "Dynamic delegate shuttle management",
      "Real time manifest tracking",
    ],
  },
  {
    id: "energy",
    name: "Energy & Giga Projects",
    num: "06",
    desc: "Workforce transport and executive site visits for remote, large scale projects.",
    intro:
      "Infrastructure directors, procurement leads and project operations teams need reliable remote-site transport and executive transfers. AB coordinates suitable vehicles and drivers across Saudi Arabia, using tracking systems and technology to support journeys and site requirements.",
    href: "/industries/energy-giga-projects",
    ctaLabel: "Explore giga project transportation",
    img: "/industries/energy.jpg",
    imgAlt: "Four wheel drive executive SUV travelling on an access road near a major infrastructure development",
    pos: "50% 45%",
    points: [
      "Remote project site transport",
      "Comprehensive IVMS safety monitoring",
      "Rigorous site access compliance",
    ],
  },
  {
    id: "sports",
    name: "Sports & Entertainment",
    num: "07",
    desc: "Team, talent and fan movements built around match days and show schedules.",
    intro:
      "Sports directors, touring production managers and federations need coordinated transportation for athletes, artists and crews. AB organises venue arrivals, luggage logistics and fleet movements for events across the region, helping teams and production staff travel between hotels, training sites and venues.",
    href: "/industries/sports-entertainment",
    ctaLabel: "Explore sports team transportation",
    img: "/industries/sports.jpg",
    imgAlt: "Luxury coach and executive support vehicles outside an athletic arena in Riyadh",
    pos: "20% 70%",
    points: [
      "Dedicated athlete and artist transfers",
      "Secure stadium ingress coordination",
      "Specialised equipment support transport",
    ],
  },
];

export const HUB_STEPS: HubStepItem[] = [
  {
    num: "01",
    title: "Brief",
    description:
      "Clients share passenger manifests, vehicle requirements, schedules and protocols. An account manager confirms site access, compliance requirements and communication channels before operations begin.",
  },
  {
    num: "02",
    title: "Plan",
    description:
      "Operations specialists build route plans, assign vetted chauffeurs and allocate fleet resources. They set timing buffers and contingency arrangements for each destination.",
  },
  {
    num: "03",
    title: "Operate",
    description:
      "The 24/7 operations centre coordinates live dispatch and monitors journeys with GPS tracking. Chauffeurs follow agreed procedures, supporting passenger safety and duty of care.",
  },
  {
    num: "04",
    title: "Report",
    description:
      "Clients receive journey data, billing summaries and performance indicators. The account manager provides consolidated invoicing and reporting to help teams review service delivery and efficiency.",
  },
];

export const HUB_FAQS: HubFaqItem[] = [
  {
    q: "Which geographic markets does AB cover for industry transport programmes?",
    a: "AB coordinates ground transportation across Saudi Arabia, the UAE and Qatar, with offices in Riyadh, Dubai, Abu Dhabi and Doha. Regional journeys are managed through central dispatch, helping clients coordinate transport across these markets. Movements beyond these countries should be confirmed with AB when planning a programme.",
  },
  {
    q: "How does AB maintain duty of care across different sectors?",
    a: "AB supports duty of care through journey coordination, GPS tracking and communication between chauffeurs and dispatch. Planning takes account of passenger schedules, route requirements and sector protocols. Vehicle and driver arrangements are matched to each assignment, giving clients clear oversight of movements throughout the service.",
  },
  {
    q: "Can AB accommodate large scale events and government summits?",
    a: "AB plans transport for exhibitions, official visits and multi-venue sporting events. The programme can include fleet allocation, venue staging, shuttle coordination and support for VIP movements. Organisers work with AB to agree schedules, routes and dispatch arrangements that reflect the event plan and its passenger requirements.",
  },
  {
    q: "How does consolidated billing and reporting operate for multi city accounts?",
    a: "For multi-city accounts, AB coordinates journey records and billing under agreed commercial arrangements. Clients can receive itemised reports and consolidated invoicing to support cost-centre review. An account manager can discuss reporting needs and service performance with the client as the programme develops.",
  },
  {
    q: "What vehicle categories are available for specialised industry requirements?",
    a: "AB's fleet includes executive saloons, luxury SUVs, passenger coaches and executive vans. Vehicle selection depends on passenger numbers, route and sector requirements. Specialised options, such as armoured vehicles or four-wheel-drive vehicles for remote project journeys, can be discussed with the planning team when preparing a programme.",
  },
  {
    q: "How can organisations initiate a transportation services by industry proposal?",
    a: "To request transportation services by industry, organisations can submit project details through the quotation portal at /quote/tender or our contact desk. Include passenger numbers, schedules, locations and any relevant site or protocol requirements. AB's planning team uses this information to assess fleet needs, operational scope and service arrangements for a tailored proposal.",
  },
];

export const SKETCH_INDUSTRIES_AR: SketchIndustry[] = [
  {
    id: "aviation",
    name: "الطيران وصالات الطيران الخاص (FBO)",
    num: "01",
    desc: "تبديل أطقم الطيران، والتنقلات من وإلى صالات الطيران الخاص (FBO)، وأساطيل احتياطية جاهزة للتعامل مع أي تغيّر في الجداول.",
    intro:
      "تحتاج شركات الطيران ومشغّلو الطائرات الخاصة وفرق صالات الطيران الخاص (FBO) إلى تنقلات موثوقة للأطقم وتنقلات منسّقة داخل المطارات. وتنسّق AB بين خدمات السائق الخاص والتوجيه وجداول الرحلات الجوية لعمليات الطيران في الرياض ودبي والدوحة، بما يضمن التنقل في الوقت المحدد بين مباني الركاب والطائرات.",
    href: "/industries/aviation",
    ctaLabel: "استكشف خدمات نقل الأطقم",
    img: "/industries/aviation.jpg",
    imgAlt: "سائق خاص يقف بجانب سيارة صالون تنفيذية فاخرة على مدرج طائرات خاصة",
    pos: "60% 50%",
    points: [
      "تنقلات مخصّصة على المدرج داخل الجانب الجوي من المطار",
      "مزامنة لحظية مع جداول الرحلات الجوية",
      "التزام تام بمتطلبات واجب الرعاية",
    ],
  },
  {
    id: "corporate",
    name: "الشركات والمؤسسات",
    num: "02",
    desc: "الجولات الترويجية، وتنقلات التنفيذيين، ونقل الموظفين، مع نظام فوترة مركزي.",
    intro:
      "يعتمد مديرو سفر الشركات وفرق المشتريات والمساعدون التنفيذيون على حلول النقل المؤسسي للتنقلات اليومية والجولات الترويجية في مدن متعددة. وتنسّق AB خدمات السائقين الخاصين وإدارة الحسابات والفوترة والتقارير في المملكة العربية السعودية والإمارات العربية المتحدة، مما يساعد المؤسسات على تحسين خدمات النقل لديها ورفع كفاءة السفر.",
    href: "/industries/corporate-enterprise",
    ctaLabel: "استكشف خدمات النقل البري للشركات",
    img: "/industries/corporate.jpg",
    imgAlt: "سيارة صالون تنفيذية تسير في شارع بالحي المالي في دبي",
    pos: "55% 50%",
    points: [
      "فوترة مركزية وتقارير شفافة",
      "تخطيط مسارات الجولات الترويجية للتنفيذيين",
      "سائقون خاصون محترفون للشركات يتحدثون لغتين",
    ],
  },
  {
    id: "government",
    name: "الجهات الحكومية والدبلوماسية",
    num: "03",
    desc: "تخطيط المواكب الرسمية، وسائقون خاصون مدرَّبون على المراسم، وتنقلات الوفود بسرية تامة.",
    intro:
      "تعتمد فرق المراسم الحكومية وموظفو السفارات ووفود الوزارات على خدمات النقل الحكومي لرحلات منسّقة تتسم بالسرية. وتنظّم AB التنقل بالسائق الخاص للزيارات الرسمية والقمم في أنحاء المملكة العربية السعودية، مع مراعاة المراسم والمتطلبات الأمنية وواجب الرعاية تجاه الركاب.",
    href: "/industries/government-diplomatic",
    ctaLabel: "استكشف خدمات النقل الدبلوماسي",
    img: "/industries/government.jpg",
    imgAlt: "موكب سيارات سوداء فاخرة مصطفة خارج مبنى حكومي في أبوظبي",
    pos: "62% 35%",
    points: [
      "التزام صارم بالمراسم الدبلوماسية",
      "خيارات المركبات المصفّحة عند الطلب",
      "سائقون خاصون معتمدون ومدرَّبون أمنيًا",
    ],
  },
  {
    id: "hospitality",
    name: "الضيافة",
    num: "04",
    desc: "تنقلات الضيوف والجولات وتنقلات المجموعات للفنادق وشركاء الوجهات.",
    intro:
      "يستعين المديرون العامون للفنادق وفرق الكونسيرج في المنتجعات ومديرو المساكن الخاصة بخدمات السائق الخاص من AB لتنسيق وصول الضيوف مع موظفي الاستقبال. ويدعم النقل الموثوق معايير الاستقبال، وسلاسة الفوترة، وتجربة ضيافة متميّزة في الدوحة وفي أنحاء منطقة الخليج.",
    href: "/industries/hospitality",
    ctaLabel: "استكشف خدمات النقل للفنادق",
    img: "/industries/hospitality.jpg",
    imgAlt: "مركبة فاخرة بسائق خاص في انتظار الضيوف أمام مدخل فندق فخم في الدوحة",
    pos: "45% 40%",
    points: [
      "تجارب استقبال للضيوف بأعلى معايير العناية",
      "تكامل سلس مع الفوترة في مكتب الاستقبال",
      "أسطول فاخر من أحدث الطرازات بحالة لا تشوبها شائبة",
    ],
  },
  {
    id: "events",
    name: "الفعاليات والمعارض",
    num: "05",
    desc: "حافلات نقل المندوبين، ووصول كبار الشخصيات، ومناطق الصعود والتحميل في مواقع الفعاليات، تُدار جميعها من غرفة تحكم واحدة.",
    intro:
      "يعتمد منظّمو المؤتمرات ومنتجو المعارض ومخطّطو الاجتماعات على خدمات نقل الفعاليات لتلبية الطلب على نقل الحضور وإدارة التنقل من مواقع الفعاليات وإليها. وتنسّق AB مسارات الحافلات المكوكية، ونقاط التجمّع، وتنقلات المتحدثين من كبار الشخصيات، مع دعم ميداني للتوجيه يحافظ على انتظام التنقلات.",
    href: "/industries/events-exhibitions",
    ctaLabel: "استكشف خدمات النقل للمعارض",
    img: "/industries/events.jpg",
    imgAlt: "أسطول من الفانات وسيارات الصالون التنفيذية في منطقة التجمع لمركز معارض في الرياض",
    pos: "50% 62%",
    points: [
      "منسّقو توجيه ميدانيون",
      "إدارة مرنة للحافلات المكوكية لنقل المندوبين",
      "تتبّع لحظي لقوائم الركاب",
    ],
  },
  {
    id: "energy",
    name: "الطاقة والمشاريع العملاقة",
    num: "06",
    desc: "نقل القوى العاملة والزيارات الميدانية للتنفيذيين في المشاريع الكبرى بالمواقع النائية.",
    intro:
      "يحتاج مديرو البنية التحتية ومسؤولو المشتريات وفرق عمليات المشاريع إلى نقل موثوق إلى المواقع النائية وتنقلات للتنفيذيين. وتوفّر AB المركبات والسائقين المناسبين وتنسّق عملهم في أنحاء المملكة العربية السعودية، مستعينةً بأنظمة التتبّع والتقنيات الحديثة لدعم الرحلات وتلبية متطلبات المواقع.",
    href: "/industries/energy-giga-projects",
    ctaLabel: "استكشف خدمات النقل للمشاريع العملاقة",
    img: "/industries/energy.jpg",
    imgAlt: "سيارة دفع رباعي تنفيذية تسير على طريق مؤدٍ إلى مشروع بنية تحتية رئيسي",
    pos: "50% 45%",
    points: [
      "النقل إلى مواقع المشاريع النائية",
      "مراقبة شاملة للسلامة عبر نظام مراقبة المركبات (IVMS)",
      "التزام دقيق بمتطلبات دخول المواقع",
    ],
  },
  {
    id: "sports",
    name: "الرياضة والترفيه",
    num: "07",
    desc: "تنقلات الفرق والفنانين والجماهير، مصمّمة وفق أيام المباريات وجداول العروض.",
    intro:
      "يحتاج المديرون الرياضيون ومديرو الإنتاج في الجولات الفنية والاتحادات الرياضية إلى نقل منسّق للرياضيين والفنانين وأطقم العمل. وتنظّم AB الوصول إلى مواقع الفعاليات، ولوجستيات الأمتعة، وحركة الأسطول للفعاليات في أنحاء المنطقة، مما يسهّل تنقل الفرق وطواقم الإنتاج بين الفنادق ومواقع التدريب ومواقع الفعاليات.",
    href: "/industries/sports-entertainment",
    ctaLabel: "استكشف خدمات نقل الفرق الرياضية",
    img: "/industries/sports.jpg",
    imgAlt: "حافلة فاخرة ومركبات دعم تنفيذية خارج صالة رياضية في الرياض",
    pos: "20% 70%",
    points: [
      "تنقلات مخصّصة للرياضيين والفنانين",
      "تنسيق آمن للدخول إلى الملاعب",
      "دعم متخصص لنقل المعدات",
    ],
  },
];

export const HUB_STEPS_AR: HubStepItem[] = [
  {
    num: "01",
    title: "المرحلة 01: تحديد المتطلبات",
    description:
      "يشارك العملاء قوائم الركاب، ومتطلبات المركبات، والجداول الزمنية، والبروتوكولات المتّبعة. ويؤكّد مدير الحساب ترتيبات دخول المواقع ومتطلبات الامتثال وقنوات التواصل قبل بدء العمليات.",
  },
  {
    num: "02",
    title: "المرحلة 02: التخطيط",
    description:
      "يُعدّ أخصائيو العمليات خطط المسارات، ويكلّفون سائقين خاصين معتمدين، ويوزّعون موارد الأسطول. كما يحدّدون هوامش زمنية احتياطية وترتيبات للطوارئ لكل وجهة.",
  },
  {
    num: "03",
    title: "المرحلة 03: التشغيل",
    description:
      "ينسّق مركز العمليات العامل على مدار الساعة عمليات التوجيه المباشر، ويراقب الرحلات عبر التتبّع بنظام GPS. ويلتزم السائقون الخاصون بالإجراءات المتفق عليها، بما يعزّز سلامة الركاب ويحقّق واجب الرعاية.",
  },
  {
    num: "04",
    title: "المرحلة 04: التقارير",
    description:
      "يتسلّم العملاء بيانات الرحلات وملخصات الفوترة ومؤشرات الأداء. ويقدّم مدير الحساب فوترة وتقارير موحّدة تساعد الفرق على مراجعة جودة تقديم الخدمة وكفاءتها.",
  },
];

export const HUB_FAQS_AR: HubFaqItem[] = [
  {
    q: "ما الأسواق الجغرافية التي تغطيها AB ببرامج النقل للقطاعات؟",
    a: "تنسّق AB النقل البري في المملكة العربية السعودية والإمارات العربية المتحدة وقطر، ولها مكاتب في الرياض ودبي وأبوظبي والدوحة. وتُدار الرحلات الإقليمية عبر التوجيه المركزي، مما يساعد العملاء على تنسيق النقل في هذه الأسواق. أما التنقلات خارج هذه الدول، فينبغي تأكيدها مع AB عند تخطيط البرنامج.",
  },
  {
    q: "كيف تحافظ AB على واجب الرعاية في مختلف القطاعات؟",
    a: "تدعم AB واجب الرعاية من خلال تنسيق الرحلات، والتتبّع عبر GPS، والتواصل المستمر بين السائقين الخاصين وفريق التوجيه. ويراعي التخطيط جداول الركاب ومتطلبات المسارات وبروتوكولات كل قطاع. وتُخصَّص المركبات والسائقون بما يتناسب مع كل مهمة، مما يمنح العملاء رؤية واضحة للتنقلات طوال مدة الخدمة.",
  },
  {
    q: "هل تستطيع AB تلبية احتياجات الفعاليات الكبرى والقمم الحكومية؟",
    a: "تخطّط AB النقل للمعارض والزيارات الرسمية والفعاليات الرياضية التي تُقام في مواقع متعددة. ويمكن أن يشمل البرنامج توزيع الأسطول، وتجهيز نقاط التجمّع في مواقع الفعاليات، وتنسيق الحافلات المكوكية، ودعم تنقلات كبار الشخصيات. ويتعاون المنظّمون مع AB لاعتماد الجداول والمسارات وترتيبات التوجيه بما يتوافق مع خطة الفعالية ومتطلبات ركابها.",
  },
  {
    q: "كيف تعمل الفوترة والتقارير الموحّدة للحسابات التي تشمل مدنًا متعددة؟",
    a: "في الحسابات التي تشمل مدنًا متعددة، تنسّق AB سجلات الرحلات والفوترة وفق الترتيبات التجارية المتفق عليها. ويمكن للعملاء تسلّم تقارير مفصّلة بندًا بندًا وفوترة موحّدة تدعم مراجعة مراكز التكلفة. كما يمكن لمدير الحساب مناقشة احتياجات التقارير وأداء الخدمة مع العميل مع تطوّر البرنامج.",
  },
  {
    q: "ما فئات المركبات المتاحة لتلبية المتطلبات المتخصصة للقطاعات؟",
    a: "يضم أسطول AB سيارات سيدان تنفيذية، ومركبات دفع رباعي (SUV) فاخرة، وحافلات ركاب، وحافلات فان تنفيذية. ويعتمد اختيار المركبات على عدد الركاب والمسار ومتطلبات القطاع. ويمكن مناقشة الخيارات المتخصصة، مثل المركبات المصفّحة أو مركبات الدفع الرباعي للرحلات إلى المشاريع النائية، مع فريق التخطيط عند إعداد البرنامج.",
  },
  {
    q: "كيف يمكن للمؤسسات طلب عرض لخدمات النقل حسب القطاع؟",
    a: "لطلب خدمات النقل حسب القطاع، يمكن للمؤسسات تقديم تفاصيل مشروعها عبر بوابة عروض الأسعار على /quote/tender أو عبر مكتب التواصل لدينا. ويُرجى تضمين أعداد الركاب والجداول الزمنية والمواقع وأي متطلبات ذات صلة بالمواقع أو المراسم. ويستند فريق التخطيط في AB إلى هذه المعلومات لتقييم احتياجات الأسطول ونطاق العمليات وترتيبات الخدمة، وإعداد عرض مصمّم وفق احتياجاتك.",
  },
];

export function getSketchIndustries(lang?: string): SketchIndustry[] {
  return lang === "ar" ? SKETCH_INDUSTRIES_AR : SKETCH_INDUSTRIES;
}

export function getHubSteps(lang?: string): HubStepItem[] {
  return lang === "ar" ? HUB_STEPS_AR : HUB_STEPS;
}

export function getHubFaqs(lang?: string): HubFaqItem[] {
  return lang === "ar" ? HUB_FAQS_AR : HUB_FAQS;
}
