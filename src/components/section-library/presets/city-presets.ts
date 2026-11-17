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
import { getCityConfig } from "./city-data-definitions";

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
  dubai: "/locations/www.ab.limo-locations-uae-dubai-images/image1.jpg",
  "abu-dhabi": "/locations/www.ab.limo-locations-uae-abu-dhabi-images/image1.jpg",
  sharjah: "/locations/www.ab.limo-locations-uae-sharjah-images/image1.jpg",
  ajman: "/locations/www.ab.limo-locations-uae-ajman-images/image1.jpg",
  "al-ain": "/locations/www.ab.limo-locations-uae-al-ain-images/image1.jpg",
  "ras-al-khaimah": "/locations/www.ab.limo-locations-uae-ras-al-khaimah-images/image1.jpg",
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
  doha: "/locations/www.ab.limo-locations-qatar-doha-images/image1.jpg",
  "al-khor": "/locations/www.ab.limo-locations-qatar-al-khor-images/image1.jpg",
  lusail: "/locations/www.ab.limo-locations-qatar-lusail-images/image1.jpg",
  "al-wakrah": "/locations/www.ab.limo-locations-qatar-al-wakrah-images/image1.jpg",
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
  const isArabic = Boolean(
    dict?.metadata?.siteTitle?.includes("إيه بي") ||
    dict?.header?.nav?.home === "الرئيسية" ||
    /[\u0600-\u06FF]/.test(dict?.metadata?.siteTitle || "")
  );
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
  const isArabic = Boolean(
    dict?.metadata?.siteTitle?.includes("إيه بي") ||
    dict?.header?.nav?.home === "الرئيسية" ||
    /[\u0600-\u06FF]/.test(dict?.metadata?.siteTitle || "")
  );
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

export function buildUnifiedCitySections(
  countrySlug: string,
  citySlug: string,
  dict?: Dictionary
): SectionInstance[] {
  const isArabic = Boolean(
    dict?.metadata?.siteTitle?.includes("إيه بي") ||
    dict?.header?.nav?.home === "الرئيسية" ||
    /[\u0600-\u06FF]/.test(dict?.metadata?.siteTitle || "")
  );
  const config = getCityConfig(citySlug);

  const fallbackName = citySlug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const cityName = isArabic
    ? config?.cityNameAr || config?.cityName || fallbackName
    : config?.cityName || fallbackName;

  const badge = isArabic
    ? config?.badgeAr || `خدمة السائق الخاص في ${cityName}`
    : config?.badge || `CHAUFFEUR SERVICE IN ${cityName.toUpperCase()}`;

  const description = isArabic
    ? config?.descriptionAr ||
      `تنقل إيه بي ليمو التنفيذيين والوفود والضيوف في جميع أنحاء ${cityName} بأسطول أسود فخم يقوده سائقون محترفون ومعتمدون.`
    : config?.description ||
      `AB.Limo moves executives, delegations and guests across ${cityName} in an immaculate black fleet, driven by vetted professional chauffeurs.`;

  const heroImage =
    config?.bgImage ||
    CITY_HERO_IMAGES[citySlug] ||
    "/hero/city-riyadh.jpg";

  const pickupDefault = config?.pickupDefault || `${cityName} Airport`;
  const dropoffDefault = config?.dropoffDefault || `${cityName} Center`;
  const skyline = config?.skyline || "none";

  const journeys = (config?.journeys || []).map((j) => ({
    id: j.id,
    tag: j.tag,
    tagAr: j.tagAr,
    title: j.title,
    titleAr: j.titleAr,
    price: j.price,
    priceAr: j.priceAr,
    pickup: j.pickup,
    dropoff: j.dropoff,
  }));

  return withOrder([
    makeSection("dubaiHero", {
      content: {
        badge,
        title: cityName,
        description,
        bookNowLabel: isArabic ? "احجز الآن" : "BOOK NOW",
        viewFleetLabel: isArabic ? "استعرض الأسطول" : "VIEW THE FLEET",
        pickupDefault,
        dropoffDefault,
        skyline,
      },
      appearance: { background: heroImage },
    }),
    makeSection("dubaiFleet", {
      content: {
        eyebrow: isArabic ? `أسطول ${cityName}` : `THE ${cityName.toUpperCase()} FLEET`,
        heading: isArabic ? "اختر فئتك" : "Choose your class",
        description: isArabic
          ? "كل مركبة من طراز حديث، سوداء وتم تجهيزها بعناية قبل كل رحلة. اختر فئة للاطلاع على مقصورة رحلتك."
          : "Every vehicle is late model, black and detailed before each journey. Select a class to see the cabin you will travel in.",
      },
    }),
    makeSection("dubaiJourneys", {
      content: {
        eyebrow: isArabic ? "رحلات شائعة" : "POPULAR JOURNEYS",
        heading: isArabic ? `في أنحاء ${cityName} وخارجها` : `Across ${cityName} and beyond`,
      },
      items: journeys,
    }),
    makeSection("dubaiServices", {
      content: {
        eyebrow: isArabic ? `الخدمات في ${cityName}` : `SERVICES IN ${cityName.toUpperCase()}`,
        heading: isArabic ? "شريك واحد لجميع تنقلاتك" : "One partner for every movement",
      },
    }),
    makeSection("dubaiCta", {
      content: {
        heading: isArabic ? `سائقك الخاص جاهز في ${cityName}.` : `Your chauffeur is ready in ${cityName}.`,
        description: isArabic
          ? "متاحون على مدار الساعة. نرد خلال دقائق عبر hello@ab.limo"
          : "Available around the clock. Reply within minutes at hello@ab.limo",
        buttonLabel: isArabic ? "احجز الآن" : "BOOK NOW",
      },
    }),
  ]);
}

function isArabicDict(dict?: Dictionary): boolean {
  return Boolean(
    dict?.metadata?.siteTitle?.includes("إيه بي") ||
      dict?.header?.nav?.home === "الرئيسية" ||
      /[\u0600-\u06FF]/.test(dict?.metadata?.siteTitle || "")
  );
}

/**
 * City page template.
 *
 * English locales delegate to the full 12-section client-city-data design
 * (`buildKsaCitySections`) whenever the city has an entry in
 * `CLIENT_CITY_DATA` — the exact same builder the DB sync uses — so an
 * in-memory fallback can never regress to the legacy 5-section layout.
 *
 * Arabic keeps the localized unified builder: the MD/client data is
 * English-only, and `/ar` content must not change.
 *
 * Cities without client data (Bahrain, Kuwait, Oman, Saudi cities outside
 * the MD set…) still fall back to the unified localized design.
 */
export function buildCityTemplate(
  countrySlug: string,
  citySlug: string,
  dict: Dictionary
): SectionInstance[] {
  const data = CLIENT_CITY_DATA[citySlug];
  if (data && !isArabicDict(dict)) {
    const homeLabel = dict.countries?.breadcrumb?.home || "Home";
    const rootLabel = dict.countries?.breadcrumb?.countries || "Locations";
    return buildKsaCitySections(data, homeLabel, rootLabel);
  }
  return buildUnifiedCitySections(countrySlug, citySlug, dict);
}
