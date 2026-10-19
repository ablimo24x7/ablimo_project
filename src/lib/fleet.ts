import { localeBase } from "@/app/[lang]/dictionaries";

export type FleetLang = "en" | "ar";

export interface FleetVehicleCopy {
  title: string;
  model: string;
  tagline: string;
  description: string[];
  features: { title: string; desc: string }[];
  idealFor: string[];
}

export interface FleetVehicle {
  slug: string;
  category: "sedan" | "suv" | "van" | "bus";
  image: string;
  gallery: string[];
  passengers: string;
  luggage: string;
  copy: Record<FleetLang, FleetVehicleCopy>;
}

export const FLEET_HERO_IMAGE =
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&h=800&fit=crop";

export const FLEET_VEHICLES: FleetVehicle[] = [
  {
    slug: "luxury-sedan",
    category: "sedan",
    image: "/cars/sedans/msc.png",
    gallery: ["/cars/sedans/msc.png", "/cars/sedans/LEXUS.png", "/cars/sedans/CADILAC.png"],
    passengers: "3",
    luggage: "2",
    copy: {
      en: {
        title: "Luxury Sedan (S-Class)",
        model: "Mercedes-Benz S-Class",
        tagline: "Flagship comfort for executives, VIPs and diplomatic delegations.",
        description: [
          "The Mercedes-Benz S-Class is our flagship sedan: rear executive seating, a whisper-quiet cabin and the presence expected at the highest level of protocol. It is the default choice for board-level travel, state visits and airport VIP arrivals.",
          "Every S-Class is presented in the AB.Limo brand standard — immaculate, late-model and strictly black — and dispatched with a professional chauffeur trained in executive etiquette and security awareness.",
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
      },
      ar: {
        title: "سيدان فاخرة (فئة S)",
        model: "مرسيدس-بنز فئة S",
        tagline: "راحة رائدة لل التنفيذيين وكبار الشخصيات والوفود الدبلوماسية.",
        description: [
          "مرسيدس فئة S هي سيارتنا الرائدة: مقاعد خلفية تنفيذية، مقصورة شبه صامتة، والحضور المطلوب في أعلى مستويات البروتوكول، وهي الخيار الافتراضي لسفر كبار المسؤولين والزيارات الرسمية ووصول كبار الشخصيات إلى المطارات.",
          "تُقدَّم كل فئة S وفق معيار هوية AB.Limo — نظيفة وحديثة وسوداء بشكل صارم — مع سائق محترف مدرب على آداب التنفيذ والوعي الأمني.",
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
    slug: "business-sedan",
    category: "sedan",
    image: "/cars/sedans/BMW.png",
    gallery: ["/cars/sedans/BMW.png", "/cars/sedans/LEXUS.png", "/cars/sedans/FAURD TAURUS.png"],
    passengers: "3",
    luggage: "2",
    copy: {
      en: {
        title: "Business Sedan",
        model: "BMW 5 Series / Lexus ES",
        tagline: "Efficient, professional travel for daily business mobility.",
        description: [
          "The business sedan is the workhorse of corporate mobility: a quiet, comfortable executive car for meetings, site visits and airport runs where punctuality matters more than ceremony.",
          "Vehicles are dispatched from our city fleets with fixed corporate rates, live dispatch tracking and the same black brand standard as our flagship class.",
        ],
        features: [
          { title: "Punctual dispatch", desc: "Live traffic-aware routing and buffer time so you arrive before the meeting, not during it." },
          { title: "Wi-Fi & charging", desc: "Stay connected between meetings with onboard Wi-Fi and universal device charging." },
          { title: "Quiet workspace", desc: "A calm cabin with fold-down tables on request, ideal for calls and last-minute preparation." },
          { title: "Fixed corporate rates", desc: "Predictable per-transfer and hourly pricing for accounts and repeated routes." },
        ],
        idealFor: [
          "Client meetings and negotiations",
          "Daily executive commuting",
          "Investor and financial roadshows",
          "Hotel and city transfers",
        ],
      },
      ar: {
        title: "سيدان أعمال",
        model: "BMW الفئة الخامسة / لكزس ES",
        tagline: "سفر فعّال ومهني لتنقلات الأعمال اليومية.",
        description: [
          "سيارة الأعمال هي العمود الفقري للتنقل المؤسسي: سيارة تنفيذية مريحة وهادئة للاجتماعات والزيارات الميدانية ورحلات المطارات حيث يكون الموعد أهم من المراسم.",
          "تُوجَّه السيارات من أساطيلنا في المدن بأسعار مؤسسية ثابتة وتتبع مباشر للإرسال، ضمن نفس المعيار الأسود لسياراتنا الرائدة.",
        ],
        features: [
          { title: "إرسال في الموعد", desc: "مسار يراعي حركة المرور مع وقت احتياطي للوصول قبل الاجتماع لا أثناءه." },
          { title: "واي فاي وشحن", desc: "ابق على تواصل بين الاجتماعات عبر واي فاي على متن السيارة وشحن للأجهزة." },
          { title: "مساحة عمل هادئة", desc: "مقصورة هادئة مع طاولات قابلة للطي عند الطلب، مثالية للمكالمات والتحضير الأخير." },
          { title: "أسعار مؤسسية ثابتة", desc: "تسعير متوقع لكل رحلة وبالساعة للحسابات والمسارات المتكررة." },
        ],
        idealFor: [
          "الاجتماعات مع العملاء والتفاوض",
          "تنقلات المسؤولين اليومية",
          "جولات المستثمرين المالية",
          "التنقلات بين الفنادق والمدينة",
        ],
      },
    },
  },
  {
    slug: "luxury-suv",
    category: "suv",
    image: "/cars/suvs/CADILAC.png",
    gallery: ["/cars/suvs/CADILAC.png", "/cars/suvs/GMC.png", "/cars/sedans/GMC.png"],
    passengers: "6",
    luggage: "5",
    copy: {
      en: {
        title: "Luxury SUV (Escalade/GMC)",
        model: "Cadillac Escalade / GMC Yukon",
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
        title: "دفع رباعي فاخر (Escalade/GMC)",
        model: "كاديلاك إسكاليد / جي إم سي يوكون",
        tagline: "حضور لافت مع مساحة للعائلة والأمتعة وفرق المرافقة.",
        description: [
          "يجمع الدفع الاعب الفاخر بين راحة الرائدة والمساحة الحقيقية: مقاعد مرتفعة، ومكانة بارزة على الطريق، ومساحة كافية للعائلات والوفود الصغيرة وأمتعتها.",
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
    gallery: ["/cars/vans/V_Class.png", "/cars/vans/Maxus.png"],
    passengers: "7",
    luggage: "5",
    copy: {
      en: {
        title: "Business Van (V-Class)",
        model: "Mercedes-Benz V-Class",
        tagline: "Flexible executive travel for small teams and families.",
        description: [
          "The V-Class turns travel into time well spent: face-to-face or conference seating lets small teams hold briefings on the move, while families travel together without splitting across vehicles.",
          "It bridges the gap between an executive sedan and a full coach, keeping the black brand standard and chauffeur service of every AB.Limo class.",
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
      },
      ar: {
        title: "فان أعمال (فئة V)",
        model: "مرسيدس-بنز فئة V",
        tagline: "تنقل تنفيذي مرن لفرق العمل الصغيرة والعائلات.",
        description: [
          "تحوّل فئة V وقت السفر إلى وقت مفيد: تخطيط مقاعد متقابلة يسمح للفرق الصغيرة بعقد اجتماعاتها أثناء التنقل، وتنتقل العائلات معًا دون تقسيمها بين سيارات متعددة.",
          "تأتي لتجمع الفجوة بين السيدان التنفيذية والباص الكامل، مع الحفاظ على نفس المعيار الأسود وخدمة السائق في كل فئات AB.Limo.",
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
    gallery: ["/cars/vans/STARIA.png", "/cars/vans/HAICE.png"],
    passengers: "7",
    luggage: "4",
    copy: {
      en: {
        title: "MPV (Hyundai Staria)",
        model: "Hyundai Staria Lounge",
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
        title: "MPV (هيونداي ستاريا)",
        model: "هيونداي ستاريا لونج",
        tagline: "سيارة MPV واسعة وعصرية لراحة المجموعات في المدينة.",
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
    slug: "mini-bus",
    category: "bus",
    image: "/cars/buses/VIP_Luxury_bus.png",
    gallery: [
      "/cars/buses/VIP_Luxury_bus.png",
      "/cars/buses/King_Long_bus.png",
      "/cars/buses/Mid_Size_Bus.png",
    ],
    passengers: "16–45",
    luggage: "10–20",
    copy: {
      en: {
        title: "Mini Bus / Coach / VIP Luxury Bus",
        model: "Mercedes Sprinter / King Long / VIP Coach",
        tagline: "Coach-class capacity for events, charters and workforce mobility.",
        description: [
          "From a 16-seat minibus to a 45-seat VIP coach, this class moves teams, guests and delegations in one coordinated dispatch — with the same brand standard applied to every seat.",
          "Coaches are assigned with route planning, on-site coordinators for events, and luggage capacity sized to the itinerary, whether it is an airport rotation or a multi-day tourism programme.",
        ],
        features: [
          { title: "16 to 45 seats", desc: "Right-sized vehicles from minibuses to full VIP coaches for any group size." },
          { title: "Climate-controlled comfort", desc: "Full air conditioning and comfortable seating across the cabin." },
          { title: "Luggage compartments", desc: "Underfloor and rear storage sized for group travel and multi-day itineraries." },
          { title: "Event coordination", desc: "On-board announcements, staging plans and dispatch coordination for large programmes." },
        ],
        idealFor: [
          "Event and conference shuttles",
          "Group and coach charter",
          "Staff and workforce transportation",
          "Religious and tourism group travel",
        ],
      },
      ar: {
        title: "ميني باص / كوتش / باص فاخر VIP",
        model: "مرسيدس سبرينتر / كينج لونج / باص VIP",
        tagline: "طاقة استيعابية للفعاليات والإيجارات ونقل العمالة.",
        description: [
          "من ميني باس بـ16 مقعدًا إلى باص VIP بـ45 مقعدًا، تنقل هذه الفئة الفرق والضيوف والوفود في عملية إرسال واحدة منسقة — مع تطبيق نفس المعيار على كل مقعد.",
          "تُخصص الباصات مع تخطيط المسارات ومنسقين في موقع الفعاليات، وسعة أمتعة تناسب البرنامج، سواء كانت دوران مطارات أو برنامجًا سياحيًا متعدد الأيام.",
        ],
        features: [
          { title: "من 16 إلى 45 مقعدًا", desc: "حجم مناسب من الميني باص إلى باص VIP الكامل لأي مجموعة." },
          { title: "راحة مع تكييف مركزي", desc: "تكييف كامل ومقاعد مريحة في جميع المقاعد." },
          { title: "صناديق أمتعة", desc: "تخزين سفلي وخلفي يتسع للسفر الجماعي والبرامج متعددة الأيام." },
          { title: "تنسيق الفعاليات", desc: "إعلانات على متن الباص وخطط تشغيل وتنسيق إرسال للبرامج الكبيرة." },
        ],
        idealFor: [
          "نقل الفعاليات والمؤتمرات",
          "الإيجارات الجماعية والكوتش",
          "نقل الموظفين والعمالة",
          "السفر الديني والسياحي الجماعي",
        ],
      },
    },
  },
];

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
      "The AB.Limo brand standard mandates a uniform fleet of late-model, immaculate black vehicles. No exceptions. We procure and lease dedicated fleets for long-term government and corporate contracts.",
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
      "يفرض معيار هوية AB.Limo أسطولًا موحدًا من السيارات السوداء الحديثة النظيفة دون أي استثناء. نحصل على أساطيل مخصصة بالشراء أو الإيجار للعقود الحكومية والمؤسسية طويلة الأجل.",
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

export function getFleetVehicle(slug: string): FleetVehicle | undefined {
  return FLEET_VEHICLES.find((vehicle) => vehicle.slug === slug);
}
