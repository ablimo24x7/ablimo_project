"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { Dictionary, localeBase } from "@/app/[lang]/dictionaries";

interface StatItem {
  val: string;
  valAr?: string;
  label: string;
  labelAr?: string;
}

interface DetailCol {
  title: string;
  titleAr: string;
  items: string[];
  itemsAr: string[];
}

interface CaseStudy {
  id: string;
  cats: string[];
  title: string;
  titleAr: string;
  tag: string;
  tagAr: string;
  year: string;
  yearAr?: string;
  location: string;
  locationAr: string;
  image: string;
  alt: string;
  altAr: string;
  isLogo?: boolean;
  stats: StatItem[];
  lead: string;
  leadAr: string;
  cols: DetailCol[];
}

const caseStudiesData: CaseStudy[] = [
  {
    id: "mdl-beast",
    cats: ["events"],
    title: "MDL Beast Soundstorm Festival",
    titleAr: "MDLBEAST ساوندستورم",
    tag: "Events & festivals",
    tagAr: "الفعاليات والمهرجانات",
    year: "2021 – 2025",
    yearAr: "2021–2025",
    location: "Riyadh, Saudi Arabia",
    locationAr: "الرياض، المملكة العربية السعودية",
    image: "/case-studies/mdl-beast.jpg",
    alt: "Crowd and stage at MDL Beast Soundstorm Festival",
    altAr: "الجمهور والمسرح في مهرجان مدل بيست ساوندستورم",
    stats: [
      { val: "725", label: "Vehicles at peak", labelAr: "مركبة في ذروة التشغيل" },
      { val: "145K+", valAr: "أكثر من 145 ألف", label: "Attendees", labelAr: "حاضر" },
      { val: "250+", valAr: "نقل أكثر من 250", label: "Artists moved", labelAr: "فنانًا" },
    ],
    lead: "The region's premier music event, held over three days and attracting more than 145,000 attendees and 86,000 vehicles daily. Across the 2021, 2022, 2023, 2024 and 2025 editions, AB delivered a comprehensive transportation solution for both staff and artists, operating 725 vehicles at the peak of the event.",
    leadAr: "إدارة متكاملة لعمليات النقل عبر عدة نسخ من المهرجان، شملت قوافل مخصّصة للفنانين، ونقاط تجمّع لكبار الشخصيات، وإشرافًا متواصلًا على عمليات التوجيه.",
    cols: [
      {
        title: "Staff services",
        titleAr: "خدمات الموظفين",
        items: [
          "Dedicated team for bookings and dispatch",
          "On-site and accommodation coordinators",
          "Airport transfer services",
          "Shuttle buses between accommodation and the festival site",
          "Dedicated executive fleet and team serving MDL Beast managers",
        ],
        itemsAr: [
          "فريق مخصص للحجوزات والتوجيه",
          "منسقون ميدانيون وفي مقرات الإقامة",
          "خدمات الاستقبال من المطار",
          "حافلات ترددية بين مقرات الإقامة وموقع المهرجان",
          "أسطول تنفيذي مخصص لمديري مدل بيست",
        ],
      },
      {
        title: "Artist services",
        titleAr: "خدمات الفنانين",
        items: [
          "Dedicated booking and dispatch office",
          "Coordinators at the airport and on-site",
          "Transfers between the airport and the event venue",
          "Luxury buses between hotels and the festival site",
          "230 luxury vehicles allocated for 250+ artists and their teams",
        ],
        itemsAr: [
          "مكتب حجوزات وإرسال مخصص",
          "منسقون في المطار وموقع الفعالية",
          "تنقلات بين المطار وموقع الحدث",
          "حافلات فاخرة بين الفنادق وموقع المهرجان",
          "230 مركبة فاخرة مخصصة لأكثر من 250 فناناً وفرقهم",
        ],
      },
    ],
  },
  {
    id: "neom-trojena",
    cats: ["energy"],
    title: "NEOM Trojena Project",
    titleAr: "مشروع تروجينا نيوم",
    tag: "Giga-projects",
    tagAr: "المشاريع العملاقة",
    year: "2025 – present",
    yearAr: "2025 – حتى الآن",
    location: "NEOM, Saudi Arabia",
    locationAr: "نيوم، المملكة العربية السعودية",
    image: "/case-studies/neom-trojena.jpg",
    alt: "Trojena development at NEOM",
    altAr: "مشروع تروجينا في نيوم",
    stats: [
      { val: "18", label: "Luxury coaches / month", labelAr: "حافلة فاخرة شهرياً" },
      { val: "24/7", label: "Dispatch support", labelAr: "دعم وتحكم على مدار الساعة" },
    ],
    lead: "In collaboration with a consortium, AB delivered large-scale staff transportation for the Trojena Development at NEOM from March 2025 onwards, deploying 18 luxury coaches on a monthly basis to support 12-hour daily operations, six days a week.",
    leadAr: "بالتعاون مع تحالف شركات، وفرت AB خدمات نقل الموظفين واسعة النطاق لمشروع تروجينا في نيوم بنشر 18 حافلة فاخرة شهرياً لدعم العمليات اليومية لمدة 12 ساعة، ستة أيام في الأسبوع.",
    cols: [
      {
        title: "What we delivered",
        titleAr: "ما تم تنفيذه",
        items: [
          "Morning and evening shifts with licensed drivers",
          "On-site project management",
          "24/7 dispatch support",
          "Modern, fully insured fleet under a preventive maintenance programme",
        ],
        itemsAr: [
          "ورديات صباحية ومسائية مع سائقين مرخصين",
          "إدارة مشاريع في الموقع",
          "دعم إرسال على مدار الساعة",
          "أسطول حديث ومؤمن بالكامل يخضع لصيانة وقائية دورية",
        ],
      },
      {
        title: "Outcome",
        titleAr: "النتائج والمخرجات",
        items: [
          "Zero major service disruptions",
          "High operational reliability in a remote project environment",
          "From July 2025, structured project transport for other construction clients across Trojena, with centralised dispatch, GPS-equipped vehicles and full regulatory compliance",
        ],
        itemsAr: [
          "صفر انقطاعات تشغيلية كبرى",
          "موثوقية تشغيلية فائقة في بيئة مشاريع نائية",
          "توسيع خدمات نقل المشاريع لعملاء إنشاءات آخرين في تروجينا مع تتبع GPS كامل وامتثال تنظيمي",
        ],
      },
    ],
  },
  {
    id: "fifa-2022",
    cats: ["sports"],
    title: "FIFA World Cup Qatar 2022",
    titleAr: "كأس العالم FIFA قطر 2022",
    tag: "Sports",
    tagAr: "الرياضة",
    year: "2022",
    location: "Doha, Qatar",
    locationAr: "الدوحة، قطر",
    image: "/case-studies/fifa-2022.jpg",
    alt: "FIFA World Cup Qatar 2022 stadiums",
    altAr: "ملاعب كأس العالم FIFA قطر 2022",
    stats: [
      { val: "All", valAr: "جميع", label: "Stadiums covered", labelAr: "الملاعب مغطاة بالكامل" },
      { val: "<3", label: "Months to deliver", labelAr: "أشهر للتخطيط والتنفيذ" },
    ],
    lead: "AB Transportation and Six Degrees Transport provided consulting in traffic and transportation management for the \"Last Mile\" and \"Zone X\" strategy teams for all stadiums, and AB delivered Rate Card transport services for teams through the FIFA \"Friends and Family\" programme.",
    leadAr: "قدمت AB Transportation وSix Degrees استشارات في إدارة الحركة المرورية وفرق استراتيجية الميل الأخير والمناطق الأمنية لجميع الملاعب، بالإضافة إلى تشغيل برنامج نقل بطاقات الأسعار لبرنامج الأصدقاء والعائلات.",
    cols: [
      {
        title: "Implemented activities",
        titleAr: "الأنشطة المنفذة",
        items: [
          "Traffic management consultancy to implement safe lanes in \"Zone X\" and the \"Last Mile\"",
          "Connecting spectator parking and transport hubs to stadium entry points within the secure perimeter",
          "Rate Card Transport Programme planned and executed in less than three months",
        ],
        itemsAr: [
          "استشارات إدارة المرور للمسارات الآمنة والميل الأخير",
          "ربط مواقف المشجعين ومراكز النقل بمداخل الملاعب داخل النطاق الآمن",
          "تخطيط وتنفيذ برنامج النقل في أقل من ثلاثة أشهر",
        ],
      },
      {
        title: "Capabilities proven",
        titleAr: "القدرات المثبتة",
        items: [
          "Traffic management strategies for football stadiums",
          "In-depth understanding of \"Zone X\" and \"Last Mile\" operations",
          "Rapid operational planning and mobilisation of equipment and personnel",
        ],
        itemsAr: [
          "استراتيجيات إدارة الحركة المرورية للملاعب الكبرى",
          "فهم عميق لعمليات الميل الأخير والمناطق الأمنية",
          "سرعة التخطيط التشغيلي واستنفار الكوادر والمركبات",
        ],
      },
    ],
  },
  {
    id: "adipec",
    cats: ["events"],
    title: "ADIPEC VIP Shuttle Services",
    titleAr: "خدمات النقل المكوكي لكبار الشخصيات في أديبك ADIPEC",
    tag: "Events & exhibitions",
    tagAr: "الفعاليات والمعارض",
    year: "2024 & 2025",
    yearAr: "2024 و2025",
    location: "Abu Dhabi, UAE",
    locationAr: "أبوظبي، الإمارات العربية المتحدة",
    image: "/case-studies/adipec.jpg",
    alt: "ADIPEC exhibition hall in Abu Dhabi",
    altAr: "قاعة معرض أديبك في أبوظبي",
    stats: [
      { val: "VIP", valAr: "حافلات مكوكية", label: "Guest shuttles", labelAr: "مخصّصة لكبار الشخصيات" },
      { val: "2", valAr: "نسختان", label: "Consecutive editions", labelAr: "متتاليتان" },
    ],
    lead: "AB Transportation UAE delivered dedicated shuttle bus services for VIP guests attending ADIPEC in Abu Dhabi. Despite short notice, our team ensured smooth, efficient and professional transport operations fully aligned with the expectations of high-profile international attendees.",
    leadAr: "تنقلات مخصّصة بالحافلات التنفيذية والمكوكية تربط أبرز فنادق أبوظبي بمقر المعرض وفق جداول زمنية صارمة.",
    cols: [
      {
        title: "Guest shuttle operations",
        titleAr: "عمليات نقل الضيوف",
        items: [
          "Fleet of premium buses for VIP guests",
          "Routes between hotels, event venues and designated access points",
          "Each route planned to minimise waiting times and optimise traffic flow",
        ],
        itemsAr: [
          "أسطول حافلات فاخرة لكبار الضيوف",
          "مسارات بين الفنادق ومقرات الفعالية ونقاط الوصول",
          "تخطيط المسارات لتقليل الانتظار وانسيابية المرور",
        ],
      },
      {
        title: "Planning & execution",
        titleAr: "التخطيط والتنفيذ",
        items: [
          "Requirements assessment through to full deployment",
          "Route planning, site preparation and real-time bus tracking",
          "On-ground coordination with staff briefed for exceptional hospitality",
        ],
        itemsAr: [
          "تقييم المتطلبات والنشر الميداني الكامل",
          "تخطيط المسارات وتجهيز المواقع والتتبع اللحظي",
          "تنسيق ميداني مع كوادر مدربة على بروتوكولات الضيافة الرفيعة",
        ],
      },
    ],
  },
  {
    id: "siemens-energy",
    cats: ["energy", "corporate"],
    title: "Siemens Energy",
    titleAr: "سيمنس للطاقة Siemens Energy",
    tag: "Energy & corporate",
    tagAr: "التنقل المؤسسي والصناعي",
    year: "2024 – present",
    yearAr: "من 2024 حتى الآن",
    location: "Jubail & Eastern Region, KSA",
    locationAr: "الجبيل والمنطقة الشرقية، المملكة العربية السعودية",
    image: "/case-studies/siemens-energy.jpg",
    alt: "Siemens Energy facility",
    altAr: "منشأة سيمنز للطاقة",
    stats: [
      { val: "7", valAr: "تغطية طوال أيام", label: "Day coverage", labelAr: "الأسبوع" },
      { val: "0", valAr: "صفر حوادث", label: "Major incidents", labelAr: "سلامة جسيمة" },
    ],
    lead: "AB Transportation has provided ground transportation for Siemens Energy across Jubail and the Eastern Region of Saudi Arabia since 2024, supporting corporate and project-based operations for up to 10–15 hours per day.",
    leadAr: "دعم متواصل في النقل البري للفرق الفنية والقيادات في المراكز الصناعية بالمنطقة الشرقية.",
    cols: [
      {
        title: "What we delivered",
        titleAr: "ما تم تقديمه",
        items: [
          "Flexible 7-day coverage",
          "Centralised reservations and 24/7 dispatch",
          "Dedicated account management team",
          "Modern, fully insured fleet from vans to luxury coaches",
          "Preventive maintenance, GPS tracking and digital reporting",
        ],
        itemsAr: [
          "تغطية مرنة على مدار 7 أيام في الأسبوع",
          "حجوزات مركزية وإرسال 24/7",
          "فريق مخصص لإدارة الحساب",
          "أسطول حديث ومؤمن بالكامل من الفانات إلى الحافلات",
          "صيانة وقائية، تتبع GPS وتقارير رقمية",
        ],
      },
      {
        title: "Outcome",
        titleAr: "النتائج والمخرجات",
        items: [
          "Consistent service reliability",
          "Full safety and regulatory compliance",
          "Transparent billing",
          "Zero major incidents",
        ],
        itemsAr: [
          "موثوقية خدمة مستمرة",
          "امتثال كامل للسلامة واللوائح",
          "فوترة شفافة وموحدة",
          "سجل خالٍ من الحوادث الكبرى طوال فترة التشغيل",
        ],
      },
    ],
  },
  {
    id: "azimuth",
    cats: ["events"],
    title: "Azimuth Music Festival",
    titleAr: "مهرجان أزمث الموسيقي",
    tag: "Events & festivals",
    tagAr: "الفعاليات والمهرجانات",
    year: "2022 & 2024",
    location: "AlUla, Saudi Arabia",
    locationAr: "العلا، المملكة العربية السعودية",
    image: "/case-studies/azimuth.jpg",
    alt: "Azimuth Music Festival stage among desert rock formations",
    altAr: "مسرح مهرجان أزمث الموسيقي وسط التكوينات الصخرية الصحراوية",
    stats: [
      { val: "100s", valAr: "المئات", label: "Vehicles at peak", labelAr: "مركبة في الذروة" },
      { val: "Crew", valAr: "الفرق", label: "Shuttle services", labelAr: "نقل الطواقم الفنية" },
    ],
    lead: "Azimuth is one of the region's premier music events, attracting large crowds and significant daily traffic. AB provided comprehensive transportation for staff and artists, managing hundreds of vehicles at peak times.",
    leadAr: "يُعد أزمث من أروع الفعاليات الموسيقية في العلا، حيث قدمت AB منظومة نقل شاملة للموظفين والفنانين شملت مئات المركبات في أوقات الذروة.",
    cols: [
      {
        title: "Staff services",
        titleAr: "خدمات الموظفين",
        items: [
          "Dedicated team for bookings and dispatch",
          "On-site and accommodation coordinators",
          "Airport transfer services",
          "Shuttle buses between accommodation and the festival site",
        ],
        itemsAr: [
          "فريق مخصص للحجوزات والتوجيه",
          "منسقون في مقرات الإقامة وموقع المهرجان",
          "خدمات الاستقبال من المطار",
          "حافلات ترددية بين الفنادق وموقع الفعالية",
        ],
      },
      {
        title: "Current edition",
        titleAr: "النسخة الحالية",
        items: [
          "Crew shuttle services",
          "Efficient, reliable transfers",
          "The same standards of professionalism and coordination that defined past operations",
        ],
        itemsAr: [
          "خدمات نقل طواقم العمل والإنتاج في التضاريس الصحراوية",
          "تنقلات دقيقة وموثوقة",
          "أعلى معايير التنسيق والاحترافية المعتمدة",
        ],
      },
    ],
  },
  {
    id: "roshn",
    cats: ["corporate"],
    title: "Roshn Group Staff Shuttle",
    titleAr: "نقل موظفي مجموعة روشن",
    tag: "Corporate",
    tagAr: "الشركات",
    year: "Ongoing",
    yearAr: "مستمر",
    location: "Saudi Arabia",
    locationAr: "المملكة العربية السعودية",
    image: "/case-studies/roshn.png",
    alt: "Roshn Group logo",
    altAr: "شعار مجموعة روشن",
    isLogo: true,
    stats: [
      { val: "4", label: "Maxus vehicles daily", labelAr: "مركبات ماكسوس يومياً" },
      { val: "13–15", label: "Passengers each", labelAr: "راكب لكل مركبة" },
    ],
    lead: "For Roshn, a major real estate development company under the Public Investment Fund, AB provides daily shuttle services for employees between Roshn offices and the metro station, making commuting easier and reducing reliance on private cars.",
    leadAr: "لصالح مجموعة روشن، المطور العقاري التابع لصندوق الاستثمارات العامة، توفر AB خدمات نقل يومية للموظفين بين مكاتب روشن ومحطة المترو لتسهيل التنقل وتقليل الاعتماد على السيارات الخاصة.",
    cols: [
      {
        title: "Service profile",
        titleAr: "تفاصيل الخدمة",
        items: [
          "4 Maxus vehicles operating daily",
          "Maxus only (13–15 passengers) for quick transfers and efficient city operations",
          "Initial operational phase of 7 months",
        ],
        itemsAr: [
          "4 مركبات ماكسوس تعمل يومياً",
          "سعة 13-15 راكباً لتنقلات حضرية سريعة وسلسة",
          "مرحلة تشغيل أولى تمتد 7 أشهر",
        ],
      },
      {
        title: "Built to scale",
        titleAr: "قابلية التوسع",
        items: [
          "Operations scale with growing staff numbers",
          "Additional vehicles available on request",
        ],
        itemsAr: [
          "توسع العمليات بما يتناسب مع زيادة أعداد الموظفين",
          "مركبات إضافية جاهزة فور الطلب",
        ],
      },
    ],
  },
];

const FILTER_IDS = ["all", "events", "sports", "energy", "corporate"] as const;
type FilterId = (typeof FILTER_IDS)[number];

const subscribeReduce = (onChange: () => void) => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};

export default function CaseStudiesSection({
  dict,
  lang = "en-US",
}: {
  dict: Dictionary;
  lang?: string;
}) {
  const cs = dict.home.caseStudies;
  const isAr = lang === "ar";
  const contactHref = `${localeBase(lang)}/contact`;

  const [filter, setFilter] = useState<FilterId>("all");
  const [activeStudy, setActiveStudy] = useState<CaseStudy | null>(null);
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const openedRef = useRef(false);
  const filterTouchedRef = useRef(false);
  const reduce = useSyncExternalStore(
    subscribeReduce,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (!("IntersectionObserver" in window)) {
      queueMicrotask(() => setRevealed(true));
      return;
    }
    const io = new IntersectionObserver(
      (entries, obs) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setRevealed(true);
            obs.disconnect();
          }
        }),
      { threshold: 0.12 }
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!filterTouchedRef.current) {
      filterTouchedRef.current = true;
      return;
    }
    if (reduce || !gridRef.current) return;
    gridRef.current
      .querySelectorAll<HTMLElement>(".abx-cs-card")
      .forEach((c) => {
        c.animate(
          [
            { opacity: 0, transform: "translateY(16px)" },
            { opacity: 1, transform: "none" },
          ],
          { duration: 400, easing: "ease-out" }
        );
      });
  }, [filter, reduce]);

  useEffect(() => {
    if (!activeStudy) {
      openedRef.current = false;
      return;
    }
    if (boxRef.current) boxRef.current.scrollTop = 0;
    if (!openedRef.current) {
      openedRef.current = true;
      closeBtnRef.current?.focus();
    }
    if (!reduce && bodyRef.current) {
      bodyRef.current.animate(
        [
          { opacity: 0, transform: isAr ? "translateX(-12px)" : "translateX(12px)" },
          { opacity: 1, transform: "none" },
        ],
        { duration: 350, easing: "ease-out" }
      );
    }
  }, [activeStudy, reduce, isAr]);

  useEffect(() => {
    if (activeStudy) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [activeStudy]);

  const visibleStudies = caseStudiesData.filter(
    (s) => filter === "all" || s.cats.includes(filter)
  );

  const openStudy = (study: CaseStudy) => {
    lastFocusRef.current = document.activeElement as HTMLElement | null;
    setActiveStudy(study);
  };

  const closeStudy = () => {
    setActiveStudy(null);
    lastFocusRef.current?.focus();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeStudy();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const stepStudy = (dir: number) => {
    if (!activeStudy) return;
    const v = visibleStudies;
    const i = v.findIndex((s) => s.id === activeStudy.id);
    setActiveStudy(v[(i + dir + v.length) % v.length]);
  };

  const onModalKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      stepStudy(1);
      return;
    }
    if (e.key === "ArrowLeft") {
      stepStudy(-1);
      return;
    }
    if (e.key === "Tab") {
      const f = modalRef.current?.querySelectorAll<HTMLElement>(
        "button, a[href]"
      );
      if (!f || !f.length) return;
      const a = f[0];
      const z = f[f.length - 1];
      if (e.shiftKey && document.activeElement === a) {
        e.preventDefault();
        z.focus();
      } else if (!e.shiftKey && document.activeElement === z) {
        e.preventDefault();
        a.focus();
      }
    }
  };

  const activeIdx = activeStudy
    ? visibleStudies.findIndex((s) => s.id === activeStudy.id)
    : -1;

  const revealCls = revealed ? " is-in" : "";

  return (
    <section
      id="case-studies"
      className="abx-cs py-24 bg-abDarkGray border-b border-gray-900 relative z-20"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`abx-head abx-reveal${revealCls}`}>
          <div>
            <p className="text-sm font-bold tracking-widest text-abBlue uppercase mb-3">
              {cs.badge}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {cs.title}
            </h2>
          </div>
          <p className="abx-head-note">{cs.desc}</p>
        </div>

        <div
          className={`abx-filters abx-reveal${revealCls}`}
          role="group"
          aria-label={cs.badge}
        >
          {FILTER_IDS.map((id) => {
            const label = cs.filters[id];
            const count =
              id === "all"
                ? caseStudiesData.length
                : caseStudiesData.filter((s) => s.cats.includes(id)).length;
            return (
              <button
                key={id}
                type="button"
                className={`abx-filter${filter === id ? " is-active" : ""}`}
                aria-pressed={filter === id}
                onClick={() => setFilter(id)}
              >
                {label} <span>{count}</span>
              </button>
            );
          })}
        </div>

        <div className="abx-cs-grid" ref={gridRef}>
          {visibleStudies.map((study, idx) => {
            const isFeatured = filter === "all" && idx === 0;
            return (
              <article
                key={study.id}
                className={`abx-cs-card abx-reveal${revealCls}${
                  isFeatured ? " is-featured" : ""
                }`}
                style={{ transitionDelay: `${idx * 80}ms` }}
                data-cat={study.cats.join(" ")}
                tabIndex={0}
                role="button"
                aria-haspopup="dialog"
                aria-label={cs.openAria.replace(
                  "{title}",
                  isAr ? study.titleAr : study.title
                )}
                onClick={() => openStudy(study)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openStudy(study);
                  }
                }}
              >
                <div
                  className={`abx-cs-media${
                    study.isLogo ? " abx-cs-media-logo" : ""
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={study.image}
                    alt={isAr ? study.altAr : study.alt}
                    loading="lazy"
                  />
                  <span className="abx-cs-tag">
                    {isAr ? study.tagAr : study.tag}
                  </span>
                  <span className="abx-cs-year">
                    {isAr && study.yearAr ? study.yearAr : study.year}
                  </span>
                </div>
                <div className="abx-cs-body">
                  <span className="abx-cs-loc">
                    <i className="fa-solid fa-location-dot"></i>{" "}
                    {isAr ? study.locationAr : study.location}
                  </span>
                  <h3 className="abx-cs-title">
                    {isAr ? study.titleAr : study.title}
                  </h3>
                  <div className="abx-cs-stats">
                    {study.stats.map((st, sIdx) => (
                      <div key={sIdx}>
                        <b>{isAr && st.valAr ? st.valAr : st.val}</b>
                        <small>{isAr && st.labelAr ? st.labelAr : st.label}</small>
                      </div>
                    ))}
                  </div>
                  <span className="abx-cs-open">
                    {cs.viewCaseStudy}{" "}
                    <span className="abx-arrow">
                      <i className="fa-solid fa-arrow-right rtl:rotate-180"></i>
                    </span>
                  </span>
                </div>
              </article>
            );
          })}

          {filter === "all" && (
            <Link
              href={contactHref}
              className={`abx-tile abx-tile-cta-card abx-cs-cta abx-reveal${revealCls}`}
            >
              <span className="abx-tile-icon">
                <i className="fa-solid fa-flag-checkered"></i>
              </span>
              <h3 className="abx-tile-title">{cs.ctaTitle}</h3>
              <p className="abx-tile-desc">{cs.ctaDesc}</p>
              <span className="abx-tile-cta">
                {cs.ctaBtn}{" "}
                <span className="abx-arrow">
                  <i className="fa-solid fa-arrow-right rtl:rotate-180"></i>
                </span>
              </span>
            </Link>
          )}
        </div>
      </div>

      {activeStudy &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="abx-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="abx-m-title"
            ref={modalRef}
            onKeyDown={onModalKey}
          >
            <div className="abx-modal-backdrop" data-close onClick={closeStudy} />
            <div className="abx-modal-box" role="document" ref={boxRef}>
              <button
                type="button"
                className="abx-modal-close"
                data-close
                aria-label={cs.modalClose}
                onClick={closeStudy}
                ref={closeBtnRef}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
              <div
                className={`abx-m-media${activeStudy.isLogo ? " is-logo" : ""}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeStudy.image}
                  alt={isAr ? activeStudy.altAr : activeStudy.alt}
                />
                <span className="abx-cs-tag">
                  {isAr ? activeStudy.tagAr : activeStudy.tag}
                </span>
              </div>
              <div className="abx-m-body" ref={bodyRef}>
                <span className="abx-cs-loc abx-m-loc">
                  <i className="fa-solid fa-location-dot"></i>{" "}
                  {isAr ? activeStudy.locationAr : activeStudy.location}
                </span>
                <h3 className="abx-m-title" id="abx-m-title">
                  {isAr ? activeStudy.titleAr : activeStudy.title}
                </h3>
                <span className="abx-m-year">
                  {isAr && activeStudy.yearAr
                    ? activeStudy.yearAr
                    : activeStudy.year}
                </span>
                <div className="abx-cs-stats abx-m-stats">
                  {activeStudy.stats.map((st, sIdx) => (
                    <div key={sIdx}>
                      <b>{isAr && st.valAr ? st.valAr : st.val}</b>
                      <small>
                        {isAr && st.labelAr ? st.labelAr : st.label}
                      </small>
                    </div>
                  ))}
                </div>
                <div className="abx-m-detail">
                  <p className="abx-d-lead">
                    {isAr ? activeStudy.leadAr : activeStudy.lead}
                  </p>
                  <div className="abx-d-cols">
                    {activeStudy.cols.map((col, cIdx) => (
                      <div key={cIdx}>
                        <h4>{isAr ? col.titleAr : col.title}</h4>
                        <ul>
                          {(isAr ? col.itemsAr : col.items).map(
                            (item, iIdx) => (
                              <li key={iIdx}>{item}</li>
                            )
                          )}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="abx-m-foot">
                  <div className="abx-nav">
                    <button
                      type="button"
                      className="abx-nav-btn"
                      aria-label={cs.prev}
                      onClick={() => stepStudy(-1)}
                    >
                      <i className="fa-solid fa-chevron-left rtl:rotate-180"></i>
                    </button>
                    <span className="abx-count abx-m-count">
                      <b>{activeIdx + 1}</b> / {visibleStudies.length}
                    </span>
                    <button
                      type="button"
                      className="abx-nav-btn"
                      aria-label={cs.next}
                      onClick={() => stepStudy(1)}
                    >
                      <i className="fa-solid fa-chevron-right rtl:rotate-180"></i>
                    </button>
                  </div>
                  <Link href={contactHref} className="abx-btn">
                    {cs.modalCta}{" "}
                    <i className="fa-solid fa-arrow-right rtl:rotate-180"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
