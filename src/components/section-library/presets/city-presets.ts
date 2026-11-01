import type { Dictionary } from "@/app/[lang]/dictionaries";
import { getCityAbout } from "@/app/[lang]/locations/_components/aboutContent";
import type { SectionInstance } from "../types";
import {
  CITY_CONTENT_KEY,
  COUNTRY_CONTENT_KEY,
  makeSection,
  normalizeCityImageMap,
  withOrder,
} from "./common";
import { buildKsaCitySections, CLIENT_CITY_DATA } from "./client-city-data";

interface CitySectionContent {
  title?: string;
  description?: string;
}
interface CityContentFile {
  gettingAround?: CitySectionContent;
  limousineService?: CitySectionContent;
  airportTransfer?: CitySectionContent;
}

// Hero images (originally cityHeroImages in CityDetailClient), keyed by
// the raw data keys and re-keyed onto runtime slugs below ("kuwait" →
// "kuwait-city").
const CITY_HERO_IMAGES_RAW: Record<string, string> = {
  dubai: "https://images.unsplash.com/photo-1721170628208-dffed6eb3514?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "abu-dhabi": "https://plus.unsplash.com/premium_photo-1733317416241-d92ba6af4e51?q=80&w=1177&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  sharjah: "https://images.unsplash.com/photo-1566555108172-f8a02274a3d3?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ajman: "https://images.unsplash.com/photo-1706413639793-1ad524e698ae?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "ras-al-khaimah": "https://images.unsplash.com/photo-1611479853417-80d5b7869ddf?q=80&w=1134&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  riyadh: "/locations/www.ab.limo-locations-saudi-arabia-riyadh-images/image1.jpg",
  jeddah: "/locations/www.ab.limo-locations-saudi-arabia-jeddah-images/image1.jpg",
  mecca: "/locations/www.ab.limo-locations-saudi-arabia-mecca-images/image1.jpg",
  medina: "/locations/www.ab.limo-locations-saudi-arabia-medina-images/image1.jpg",
  dammam: "/locations/www.ab.limo-locations-saudi-arabia-dammam-images/image1.jpg",
  tabuk: "/locations/www.ab.limo-locations-saudi-arabia-tabuk-images/image1.jpg",
  "al-ula": "/locations/www.ab.limo-locations-saudi-arabia-al-ula-images/image1.jpg",
  "al-khobar": "/locations/www.ab.limo-locations-saudi-arabia-al-khobar-images/image1.jpg",
  "al-qasim": "/locations/www.ab.limo-locations-saudi-arabia-al-qasim-images/image1.jpg",
  abha: "/locations/www.ab.limo-locations-saudi-arabia-abha-images/image1.jpg",
  jizan: "/locations/www.ab.limo-locations-saudi-arabia-jizan-images/image1.jpg",
  neom: "/locations/www.ab.limo-locations-saudi-arabia-neom-images/image1.jpg",
  doha: "https://images.unsplash.com/photo-1647252262017-582a7dbb73d0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "al-khor": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1170&auto=format&fit=crop",
  lusail: "https://images.unsplash.com/photo-1728488443267-8340c9a74dcf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  manama: "https://images.unsplash.com/photo-1547548731-e95343697eb4?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  riffa: "https://images.unsplash.com/photo-1548755212-2b46ee259868?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  muharraq: "https://images.unsplash.com/photo-1708160603696-4ba7a7c6a96c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  kuwait: "https://images.unsplash.com/photo-1621647017805-7d08d0a38c8a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  hawalli: "https://images.unsplash.com/photo-1695735680024-41fdcefc5875?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  farwaniya: "https://images.unsplash.com/photo-1621647017805-7d08d0a38c8a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  muscat: "https://images.unsplash.com/photo-1699855803432-17f4ab468b2d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  salalah: "https://images.unsplash.com/photo-1680181825817-838f9bf98e2b?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  sohar: "https://images.unsplash.com/photo-1680181825817-838f9bf98e2b?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  hail: "https://images.unsplash.com/photo-1586715065342-98d1f6016fd1?q=80&w=1332&auto=format&fit=crop",
  jubail: "https://images.unsplash.com/photo-1578895101408-1a36b834405b?q=80&w=1095&auto=format&fit=crop",
  najran: "https://images.unsplash.com/photo-1548755212-2b46ee259868?q=80&w=1170&auto=format&fit=crop",
  taif: "https://images.unsplash.com/photo-1588513646744-e94675143d6f?q=80&w=1074&auto=format&fit=crop",
  yanbu: "https://images.unsplash.com/photo-1566555108172-f8a02274a3d3?q=80&w=1074&auto=format&fit=crop",
  fujairah: "https://images.unsplash.com/photo-1611479853417-80d5b7869ddf?q=80&w=1134&auto=format&fit=crop",
  "umm-al-quwain": "https://images.unsplash.com/photo-1706413639793-1ad524e698ae?q=80&w=1171&auto=format&fit=crop",
  salmiya: "https://images.unsplash.com/photo-1621647017805-7d08d0a38c8a?q=80&w=1170&auto=format&fit=crop",
  nizwa: "https://images.unsplash.com/photo-1699855803432-17f4ab468b2d?q=80&w=2071&auto=format&fit=crop",
};

const CITY_HERO_IMAGES = normalizeCityImageMap(CITY_HERO_IMAGES_RAW);

const CITY_SECTION_IMAGES = {
  gettingAround: "/gettingAround.png",
  limousineService: "/taxi Alternative.png",
  airportTransfer: "/airportTransfer.png",
} as const;

export function buildDubaiCitySections(dict?: Dictionary): SectionInstance[] {
  const isArabic = dict?.metadata?.siteTitle?.includes("إيه بي") ?? false;
  return withOrder([
    makeSection("dubaiHero", {
      content: {
        badge: isArabic ? "خدمة السائق الخاص في دبي" : "CHAUFFEUR SERVICE IN DUBAI",
        title: isArabic ? "دبي" : "Dubai",
        description: isArabic
          ? "من الوصول في مطار دبي إلى غرف اجتماعات مركز دبي المالي العالمي والفعاليات المسائية في نخلة جميرا، تنقل إيه بي ليمو التنفيذيين والوفود والضيوف في جميع أنحاء دبي بأسطول أسود فخم يقوده سائقون محترفون ومعتمدون."
          : "From DXB arrivals to DIFC boardrooms and evening events on the Palm, AB.Limo moves executives, delegations and guests across Dubai in an immaculate black fleet, driven by vetted professional chauffeurs.",
        bookNowLabel: isArabic ? "احجز الآن" : "BOOK NOW",
        viewFleetLabel: isArabic ? "استعرض الأسطول" : "VIEW THE FLEET",
      },
      appearance: { background: "/hero/B4.jpg.jpeg" },
    }),
    makeSection("dubaiFleet", {
      content: {
        eyebrow: isArabic ? "أسطول دبي" : "THE DUBAI FLEET",
        heading: isArabic ? "اختر فئتك" : "Choose your class",
        description: isArabic
          ? "كل مركبة من طراز حديث، سوداء وتم تجهيزها بعناية قبل كل رحلة. اختر فئة للاطلاع على مقصورة رحلتك."
          : "Every vehicle is late model, black and detailed before each journey. Select a class to see the cabin you will travel in.",
      },
    }),
    makeSection("dubaiJourneys", {
      content: {
        eyebrow: isArabic ? "رحلات شائعة" : "POPULAR JOURNEYS",
        heading: isArabic ? "في أنحاء دبي وخارجها" : "Across Dubai and beyond",
      },
    }),
    makeSection("dubaiServices", {
      content: {
        eyebrow: isArabic ? "الخدمات في دبي" : "SERVICES IN DUBAI",
        heading: isArabic ? "شريك واحد لجميع تنقلاتك" : "One partner for every movement",
      },
    }),
    makeSection("dubaiCta", {
      content: {
        heading: isArabic ? "سائقك الخاص جاهز في دبي." : "Your chauffeur is ready in Dubai.",
        description: isArabic
          ? "متاحون على مدار الساعة. نرد خلال دقائق عبر hello@ab.limo"
          : "Available around the clock. Reply within minutes at hello@ab.limo",
        buttonLabel: isArabic ? "احجز الآن" : "BOOK NOW",
      },
    }),
  ]);
}

export function buildRiyadhCitySections(dict?: Dictionary): SectionInstance[] {
  const isArabic = dict?.metadata?.siteTitle?.includes("إيه بي") ?? false;
  return withOrder([
    makeSection("dubaiHero", {
      content: {
        badge: isArabic ? "خدمة السائق الخاص في الرياض" : "CHAUFFEUR SERVICE IN RIYADH",
        title: isArabic ? "الرياض" : "Riyadh",
        description: isArabic
          ? "من الوصول في مطار الملك خالد الدولي إلى غرف اجتماعات مركز الملك عبد الله المالي وزيارات الوزارات وفعاليات موسم الرياض، تنقل إيه بي ليمو التنفيذيين والوفود والضيوف في جميع أنحاء العاصمة بأسطول أسود فخم يقوده سائقون محترفون ومعتمدون."
          : "From King Khalid International arrivals to KAFD boardrooms, ministry visits and Riyadh Season events, AB.Limo moves executives, delegations and guests across the capital in an immaculate black fleet, driven by vetted professional chauffeurs.",
        bookNowLabel: isArabic ? "احجز الآن" : "BOOK NOW",
        viewFleetLabel: isArabic ? "استعرض الأسطول" : "VIEW THE FLEET",
        pickupDefault: "King Khalid International (RUH)",
        dropoffDefault: "KAFD, Riyadh",
        skyline: "riyadh",
      },
      appearance: { background: "/hero/city-riyadh.jpg" },
    }),
    makeSection("dubaiFleet", {
      content: {
        eyebrow: isArabic ? "أسطول الرياض" : "THE RIYADH FLEET",
        heading: isArabic ? "اختر فئتك" : "Choose your class",
        description: isArabic
          ? "كل مركبة من طراز حديث، سوداء وتم تجهيزها بعناية قبل كل رحلة. اختر فئة للاطلاع على مقصورة رحلتك."
          : "Every vehicle is late model, black and detailed before each journey. Select a class to see the cabin you will travel in.",
      },
    }),
    makeSection("dubaiJourneys", {
      content: {
        eyebrow: isArabic ? "رحلات شائعة" : "POPULAR JOURNEYS",
        heading: isArabic ? "في أنحاء الرياض وخارجها" : "Across Riyadh and beyond",
      },
      items: [
        {
          id: "ruh-kafd",
          tag: "AIRPORT TRANSFER",
          tagAr: "نقل من المطار",
          title: "RUH to KAFD",
          titleAr: "من مطار الملك خالد إلى كافد",
          price: "From [SAR PRICE]",
          priceAr: "ابتداءً من [SAR PRICE]",
          pickup: "King Khalid International Airport (RUH)",
          dropoff: "KAFD, Riyadh",
        },
        {
          id: "ruh-dq",
          tag: "AIRPORT TRANSFER",
          tagAr: "نقل من المطار",
          title: "RUH to Diplomatic Quarter",
          titleAr: "من مطار الملك خالد إلى الحي الدبلوماسي",
          price: "From [SAR PRICE]",
          priceAr: "ابتداءً من [SAR PRICE]",
          pickup: "King Khalid International Airport (RUH)",
          dropoff: "Diplomatic Quarter, Riyadh",
        },
        {
          id: "riyadh-diriyah",
          tag: "CITY",
          tagAr: "داخل المدينة",
          title: "Riyadh to Diriyah",
          titleAr: "من الرياض إلى الدرعية",
          price: "From [SAR PRICE]",
          priceAr: "ابتداءً من [SAR PRICE]",
          pickup: "Riyadh",
          dropoff: "Diriyah Gate",
        },
        {
          id: "riyadh-front",
          tag: "CITY",
          tagAr: "داخل المدينة",
          title: "Riyadh to Riyadh Front",
          titleAr: "من الرياض إلى واجهة الرياض",
          price: "From [SAR PRICE]",
          priceAr: "ابتداءً من [SAR PRICE]",
          pickup: "Riyadh",
          dropoff: "Riyadh Front",
        },
      ],
    }),
    makeSection("dubaiServices", {
      content: {
        eyebrow: isArabic ? "الخدمات في الرياض" : "SERVICES IN RIYADH",
        heading: isArabic ? "شريك واحد لجميع تنقلاتك" : "One partner for every movement",
      },
    }),
    makeSection("dubaiCta", {
      content: {
        heading: isArabic ? "سائقك الخاص جاهز في الرياض." : "Your chauffeur is ready in Riyadh.",
        description: isArabic
          ? "متاحون على مدار الساعة. نرد خلال دقائق عبر hello@ab.limo"
          : "Available around the clock. Reply within minutes at hello@ab.limo",
        buttonLabel: isArabic ? "احجز الآن" : "BOOK NOW",
      },
    }),
  ]);
}

/**
 * City page template — mirrors CityDetailClient section for section.
 * Dictionary content is looked up via the normalized aliases
 * (uae → united-arab-emirates, kuwait-city → kuwait); cities without
 * dictionary content fall back to the same hardcoded English copy the
 * client used (with {city} tokens instead of interpolated names).
 */
export function buildCityTemplate(
  countrySlug: string,
  citySlug: string,
  dict: Dictionary
): SectionInstance[] {
  if (citySlug === "dubai") {
    return buildDubaiCitySections(dict);
  }
  if (citySlug === "riyadh") {
    return buildRiyadhCitySections(dict);
  }

  const clientCity = CLIENT_CITY_DATA[citySlug];
  if (clientCity) {
    return buildKsaCitySections(
      clientCity,
      dict.countries.breadcrumb.home,
      dict.countries.breadcrumb.countries
    );
  }

  const detail = dict.countries.detail;
  const contentFile = (
    dict as unknown as { cityContent?: Record<string, Record<string, CityContentFile>> }
  ).cityContent;
  const cityData = contentFile?.[COUNTRY_CONTENT_KEY[countrySlug] ?? countrySlug]?.[
    CITY_CONTENT_KEY[citySlug] ?? citySlug
  ];
  const about = getCityAbout(citySlug);
  const heroImage = CITY_HERO_IMAGES[citySlug] ?? CITY_HERO_IMAGES.dubai;
  const taxiAlt = dict.cityTaxiTitle?.taxiAlternative || "Chauffeur Service In";

  const gettingAroundTitle =
    cityData?.gettingAround?.title || "Getting Around in {city}";
  const gettingAroundDesc =
    cityData?.gettingAround?.description ||
    "{city} is a dynamic and culturally rich destination with plenty to experience. AB offers an ideal chauffeur service that gets you around in absolute comfort and style, connecting you effortlessly across key districts and landmarks.";
  const limoTitle = cityData?.limousineService?.title || "Chauffeur Service in {city}";
  const limoDesc =
    cityData?.limousineService?.description ||
    "Experience a premier chauffeur service in {city}. Hire by the hour to explore local attractions, attend meetings, or enjoy your itinerary seamlessly.";
  const airportTitle = cityData?.airportTransfer?.title || "{city} Airport Transfer";
  const airportDesc =
    cityData?.airportTransfer?.description ||
    "Enjoy an efficient and punctual airport transfer service in {city}. Our professional chauffeurs track your flight status, greet you warmly at arrivals, assist with your luggage, and provide a direct, stress-free ride to your destination.";

  return withOrder([
    makeSection("hero", {
      variant: "with-inquiry-form",
      content: {
        eyebrow: "",
        title: "{city}",
        titleHighlight: "",
        description: "",
      },
      appearance: { background: heroImage },
    }),
    makeSection("breadcrumb", {
      content: {
        homeLabel: dict.countries.breadcrumb.home,
        rootLabel: dict.countries.breadcrumb.countries,
      },
    }),
    makeSection("serviceCards", {
      variant: "3-column",
      content: {
        eyebrow: "",
        heading: "",
        description: "",
        sectionCta: { label: "", href: "", style: "primary", icon: "" },
      },
      items: [],
      settings: { source: "context.services", columns: "3", showHeader: false },
      appearance: { theme: "dark", padding: "md", border: false, textAlign: "left" },
    }),
    makeSection("mediaContent", {
      variant: "media-right",
      content: {
        eyebrow: detail.aboutEyebrow,
        heading: about.title,
        description: about.description,
        items: [],
        actions: [],
      },
      settings: { mediaPosition: "right", containerWidth: "default" },
      appearance: {
        theme: "dark",
        padding: "md",
        border: false,
        textAlign: "left",
        background: heroImage,
        pattern: false,
      },
    }),
    makeSection("mediaContent", {
      variant: "media-left",
      content: {
        eyebrow: "",
        heading: gettingAroundTitle,
        description: gettingAroundDesc,
        items: [],
        actions: [],
      },
      settings: { mediaPosition: "left", containerWidth: "default" },
      appearance: {
        theme: "dark",
        padding: "md",
        border: false,
        textAlign: "left",
        background: CITY_SECTION_IMAGES.gettingAround,
        pattern: false,
      },
    }),
    makeSection("mediaContent", {
      variant: "media-right",
      content: {
        eyebrow: "",
        heading: limoTitle,
        description: limoDesc,
        items: [],
        actions: [],
      },
      settings: { mediaPosition: "right", containerWidth: "default" },
      appearance: {
        theme: "dark",
        padding: "md",
        border: false,
        textAlign: "left",
        background: CITY_SECTION_IMAGES.limousineService,
        pattern: false,
      },
    }),
    makeSection("mediaContent", {
      variant: "media-left",
      content: {
        eyebrow: "",
        heading: airportTitle,
        description: airportDesc,
        items: [],
        actions: [],
      },
      settings: { mediaPosition: "left", containerWidth: "default" },
      appearance: {
        theme: "dark",
        padding: "md",
        border: false,
        textAlign: "left",
        background: CITY_SECTION_IMAGES.airportTransfer,
        pattern: false,
      },
    }),
    makeSection("airportsGrid", {
      content: { heading: "", description: "" },
      settings: { source: "context.airports", columns: "3" },
      appearance: { theme: "dark", padding: "none", border: false, textAlign: "left" },
    }),
    makeSection("routesGrid", {
      content: { heading: detail.interCityRoutesHeading, description: "" },
      settings: { source: "context.routes", columns: "3" },
      appearance: { theme: "dark", padding: "md", border: false, textAlign: "left" },
    }),
    makeSection("faq", {
      content: {
        eyebrow: "",
        heading: detail.faqTitle,
        description: "",
        items: [],
      },
      items: [],
      settings: { variant: "default", source: "context.faqs" },
      appearance: { theme: "darker", padding: "lg", border: false, textAlign: "center" },
    }),
  ]);
}
