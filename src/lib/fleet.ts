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
  /** Invisible anchor spans rendered on the fleet grid for header-menu jumps. */
  anchors?: string[];
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
    anchors: ["luxury", "sedans"],
    image: "/cars/sedans/msc.png",
    gallery: ["/cars/sedans/msc.png", "/cars/sedans/BMW.png", "/cars/sedans/LEXUS.png"],
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
    slug: "business-sedan",
    category: "sedan",
    image: "/cars/sedans/LEXUS.png",
    gallery: ["/cars/sedans/LEXUS.png", "/cars/sedans/BMW.png", "/cars/sedans/FAURD TAURUS.png"],
    passengers: "3",
    luggage: "2",
    copy: {
      en: {
        title: "Executive Business Sedan",
        model: "Lexus ES 350",
        tagline: "Efficient, professional travel for daily business mobility.",
        description: [
          "The executive business sedan is the workhorse of corporate mobility: a quiet, comfortable car for meetings, site visits and airport runs where punctuality matters more than ceremony.",
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
        title: "سيدان أعمال تنفيذية",
        model: "لكزس ES 350",
        tagline: "سفر فعّال ومهني لتنقلات الأعمال اليومية.",
        description: [
          "سيارة الأعمال التنفيذية هي العمود الفقري للتنقل المؤسسي: سيارة مريحة وهادئة للاجتماعات والزيارات الميدانية ورحلات المطارات حيث يكون الموعد أهم من المراسم.",
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
    gallery: ["/cars/vans/V_Class.png", "/cars/vans/Maxus.png", "/cars/vans/STARIA.png"],
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
    gallery: ["/cars/vans/Sprinter.png", "/cars/vans/Maxus.png", "/cars/vans/V_Class.png"],
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
    gallery: ["/cars/buses/King_Long_bus.png", "/cars/buses/VIP_Luxury_bus.png", "/cars/buses/Mid_Size_Bus.png"],
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

export function getFleetVehicle(slug: string): FleetVehicle | undefined {
  return FLEET_VEHICLES.find((vehicle) => vehicle.slug === slug);
}
