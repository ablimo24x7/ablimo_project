import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  ShieldAlert,
  Car,
  UserCheck,
  Headset,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Wind,
  LifeBuoy,
  Phone,
  FileCheck,
} from "lucide-react";
import {
  hasLocale,
  defaultLocale,
  type Locale,
  localeBase,
  localeHome,
} from "@/app/[lang]/dictionaries";
import { generateSeoMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isAr = lang.startsWith("ar");

  return generateSeoMetadata({
    title: isAr
      ? "معايير AB للسائقين والمركبات | إطار الجودة والسلامة"
      : "The AB Standards | Chauffeurs and Vehicles Quality Framework",
    description: isAr
      ? "كل مركبة تُفحص، وكل سائق يُعتمد، وكل رحلة تُراقب بالتوافق مع معايير TGA و RTA و ITC."
      : "Every vehicle inspected, every chauffeur vetted and every trip monitored, in line with TGA, RTA, ITC and international industry standards.",
    path: "/chauffeurs-and-vehicles-standards",
    lang,
    keywords:
      "AB Standards, vehicle inspection, chauffeur standards, TGA Saudi Arabia, RTA Dubai, ITC Abu Dhabi, MOT Qatar, luxury chauffeur quality framework",
  });
}

const authorities = [
  {
    code: "TGA",
    name: "Transport General Authority",
    nameAr: "الهيئة العامة للنقل",
    country: "Saudi Arabia",
    countryAr: "المملكة العربية السعودية",
    desc: "Licensed commercial luxury transport, executive chauffeur service, and airport permits across KSA.",
    descAr: "ترخيص تشغيل تجاري للنقل البري للركاب وخدمات السائق الفاخر وعمليات المطارات.",
  },
  {
    code: "RTA",
    name: "Roads and Transport Authority",
    nameAr: "هيئة الطرق والمواصلات",
    country: "Dubai (UAE)",
    countryAr: "دبي (الإمارات)",
    desc: "Licensed luxury transport and limousine operating permits with accredited smart telematics.",
    descAr: "مشغل تجاري مرخص لخدمات الليموزين والنقل الفاخر مع سائقين معتمدين وتصاريح المطارات.",
  },
  {
    code: "ITC",
    name: "Integrated Transport Centre",
    nameAr: "مركز النقل المتكامل",
    country: "Abu Dhabi (UAE)",
    countryAr: "أبوظبي (الإمارات)",
    desc: "Authorised executive mobility provider for ministries, diplomatic missions, and corporate events.",
    descAr: "مزود معتمد لخدمات التنقل التنفيذي للوزارات والبعثات الدبلوماسية وأساطيل الشركات.",
  },
  {
    code: "MOT",
    name: "Ministry of Transport",
    nameAr: "وزارة المواصلات",
    country: "State of Qatar",
    countryAr: "دولة قطر",
    desc: "Licensed passenger road transportation provider for corporate accounts and Hamad International Airport.",
    descAr: "مشغل نقل بري فاخر مرخص لحسابات الشركات وحافلات المؤتمرات ونقل المطارات.",
  },
];

const vehicleChecks = [
  {
    title: "Brakes, Tires, Lights & Fluids",
    titleAr: "المكابح والإطارات والإضاءة ومستويات السوائل",
    desc: "Brake pad thickness, tire tread depth and pressure, functional indicators and headlight alignment, engine oil, coolant and washer fluid.",
    descAr: "سماكة أقمشة المكابح، عمق نقشة الإطارات والضغط، كفاءة الإضاءة وإشارات التحذير، ومستويات الزيوت وسوائل التبريد والمسّاحات.",
    icon: ShieldAlert,
  },
  {
    title: "Air Conditioning & Cabin Comfort",
    titleAr: "التكييف وراحة المقصورة",
    desc: "Multi-zone air conditioning chill test, cabin filtration freshness, seat adjustments, massage and ventilation, smooth noise-free ambiance.",
    descAr: "اختبار برودة التكييف متعدد المناطق، فلاتر تنقية الهواء، وظائف المقاعد والتهوية، والعزل الصوتي الخالي من أي اهتزازات.",
    icon: Wind,
  },
  {
    title: "Seatbelts, First-Aid & Fire Extinguisher",
    titleAr: "أحزمة الأمان وحقيبة الإسعافات وطفاية الحريق",
    desc: "Seatbelt retractor safety check for all passengers, fully stocked first-aid kit with valid expiry dates, pressurized fire extinguisher.",
    descAr: "فحص أحزمة الأمان وآليات الشد لكافة المقاعد، حقيبة إسعافات أولية متكاملة وسارية الصلاحية، وطفاية حريق مفحوصة ومطابقة للمواصفات.",
    icon: LifeBuoy,
  },
  {
    title: "Interior & Exterior Cleanliness",
    titleAr: "النظافة الفائقة للمقصورة والمظهر الخارجي",
    desc: "Pristine hand-washed exterior, streak-free polished windows, vacuumed and conditioned leather seats, complimentary chilled bottled water, chargers and Wi-Fi.",
    descAr: "غسيل يدوي خارجي وتلميع الزجاج، تنظيف مقاعد الجلد وتعقيم المقصورة، مع توفير مياه مثلجة مجانية وشواحن سريعة وإنترنت واي فاي.",
    icon: Sparkles,
  },
];

const chauffeurPillars = [
  {
    title: "Rigorous Selection",
    titleAr: "تدقيق واختيار أمني صارم",
    desc: "Background and security checks, document verification, driving history review and medical fitness check before joining AB.",
    descAr: "فحوصات خلفية أمنية وجنائية، تدقيق الوثائق، مراجعة سجل القيادة، وفحص اللياقة الطبية الشامل قبل التوظيف.",
  },
  {
    title: "Licensed Professionals",
    titleAr: "محترفون مرخصون رسمياً",
    desc: "All chauffeurs hold valid driving licenses and professional permits required by TGA, RTA, ITC or MOT for the market they work in.",
    descAr: "يحمل جميع السائقين رخص قيادة مهنية وبطاقات سائق رسمية سارية ومعتمدة من هيئات النقل المعنية.",
  },
  {
    title: "Structured Training Curriculum",
    titleAr: "منهج تدريب تخصصي متكامل",
    desc: "Comprehensive training in defensive driving, VIP protocol etiquette, customer communication, GCC route topography and airport procedures.",
    descAr: "تدريب مكثف على القيادة الوقائية، إتيكيت كبار الشخصيات، لباقة التواصل، ومعرفة شبكات الطرق وإجراءات المطارات.",
  },
  {
    title: "6-Month Mandatory Refreshers",
    titleAr: "دورات تنشيطية كل 6 أشهر",
    desc: "Continuous recertification runs every 6 months and bespoke operational briefings are conducted before every major event.",
    descAr: "تحديث تدريبي إلزامي كل 6 أشهر وإحاطات تشغيلية ميدانية مسبقة قبل انطلاق أي فعالية كبرى.",
  },
  {
    title: "Presentation & Code of Conduct",
    titleAr: "هندام أنيق والتزام تام بالسرية",
    desc: "Dark tailored business suits, meticulous grooming standards, professional courtesy, and strict confidentiality (NDA) for all passengers.",
    descAr: "زي رسمي موحد (بدلة داكنة أنيقة)، معايير هندام صارمة، والالتزام باتفاقية سرية مطلقة لكافة الركاب والرحلات.",
  },
  {
    title: "Fatigue Management Architecture",
    titleAr: "إدارة ساعات العمل وتجنب الإجهاد",
    desc: "Working-hour limits and mandatory rest periods keep every chauffeur alert, focused and safe, including on multi-day assignments.",
    descAr: "حدود نظامية لساعات القيادة وفترات راحة إلزامية لضمان يقظة السائق وسلامة الرحلة حتى في الفعاليات الممتدة.",
  },
];

const operationalPillars = [
  {
    title: "24/7 Operations Control Rooms",
    titleAr: "غرف تحكم تعمل 24/7",
    desc: "Centralized command rooms in Riyadh, Dubai and Doha coordinating journeys and dispatch around the clock.",
    descAr: "مراكز قيادة مركزية في الرياض ودبي والدوحة لتنسيق الرحلات والإرسال على مدار الساعة طوال العام.",
    icon: Headset,
  },
  {
    title: "Real-Time Telematics & Speed Tracking",
    titleAr: "تتبع تليماتي ورصد حي للسرعة",
    desc: "Continuous monitoring of vehicle location, speed limits, and trip milestones via integrated GPS telematics.",
    descAr: "رصد مباشر لموقع المركبة، وسرعة السير ومراحل الرحلة عبر تقنيات التتبع المتقدمة.",
    icon: Car,
  },
  {
    title: "Proactive Flight & Route Alerts",
    titleAr: "تنبيهات استباقية للرحلات والطرق",
    desc: "Live flight tracking automatically recalibrates chauffeur dispatch times to absorb delays or early arrivals.",
    descAr: "متابعة حية لرادارات الطيران لتعديل مواعيد خروج السائقين تلقائياً في حال حدوث أي تأخير للرحلة.",
    icon: Clock,
  },
  {
    title: "Standby Fleet & Relief Chauffeurs",
    titleAr: "أسطول وسائقون في وضع الجاهزية",
    desc: "Backup vehicles and relief chauffeurs on standby across staging hubs ready for immediate replacement.",
    descAr: "مركبات وسائقون بدلاء جاهزون في نقاط استراتيجية للتدخل الفوري عند أي طارئ دون انقطاع الخدمة.",
    icon: ShieldCheck,
  },
  {
    title: "Dedicated On-Site Coordinators",
    titleAr: "منسقون ميدانيون مخصصون",
    desc: "Named transport coordinators stationed at hotels, conference venues and airport terminals to manage flow.",
    descAr: "مشرفون ومنسقو حركة متواجدون في الفنادق ومقار الفعاليات وصالات المطارات لتوجيه الركاب.",
    icon: UserCheck,
  },
];

const qaPillars = [
  {
    title: "Unannounced QA Field Audits",
    titleAr: "تدقيق وفحوصات ميدانية مفاجئة",
    desc: "Regular vehicle and chauffeur audits conducted by our Quality Assurance team at airport staging yards and hotels.",
    descAr: "فحوصات دورية ومفاجئة للمركبات وهندام السائقين ومعدات السلامة من قِبل فريق الجودة الميداني.",
  },
  {
    title: "Measurable Performance Tracking",
    titleAr: "مؤشرات أداء دقيقة وقابلة للقياس",
    desc: "On-time arrival rate (consistently > 99.6%), zero safety incidents, and driver performance measured on every trip.",
    descAr: "قياس الالتزام بالمواعيد (أعلى من 99.6% باستمرار)، ومعدلات السلامة وتقييمات السائقين لكل رحلة.",
  },
  {
    title: "Structured Client Feedback",
    titleAr: "استبيانات وملاحظات العملاء",
    desc: "Feedback systematically collected after assignments and reviewed directly by management.",
    descAr: "جمع ملاحظات الركاب ومسؤولي الشركات ومراجعتها مباشرة من قِبل الإدارة العليا لاتخاذ الإجراءات اللازمة.",
  },
  {
    title: "Incident Management & Reporting",
    titleAr: "إدارة الحوادث وإشعار الـ 15 دقيقة",
    desc: "Clear escalation procedures guaranteeing incident investigation and written reporting within 15 minutes.",
    descAr: "إجراءات تصعيد واضحة تضمن تقديم تقرير فوري وحلول بديلة لجهة الاتصال خلال 15 دقيقة من أي طارئ.",
  },
  {
    title: "Continuous Empirical Improvement",
    titleAr: "تطوير مستمر قائم على التجربة",
    desc: "Operational learnings from every major summit and corporate programme feed directly back into our standards.",
    descAr: "تحليل نتائج القمم والفعاليات الكبرى وتضمين الدروس المستفادة في تحديث معاييرنا باستمرار.",
  },
];

export default async function StandardsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isAr = lang.startsWith("ar");
  const base = localeBase(lang);
  const home = localeHome(lang);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: isAr ? "الرئيسية" : "Home", url: `${home}` },
          {
            name: isAr ? "معايير AB" : "The AB Standards",
            url: `${base}/chauffeurs-and-vehicles-standards`,
          },
        ]}
      />

      <main className={`min-h-screen bg-abBlack text-gray-200 ${isAr ? "font-arabic" : ""}`}>
        {/* ── Hero Section ── */}
        <section className="relative py-24 sm:py-32 overflow-hidden border-b border-gray-800 bg-gradient-to-b from-gray-900 via-abBlack to-abBlack">
          <div className="absolute inset-0 z-0 opacity-20">
            <Image
              src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1920&h=800&fit=crop&q=80"
              alt="AB Chauffeur & Vehicle Standards"
              fill
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-abBlack/85" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-6">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isAr ? "إطار الجودة والسلامة" : "Quality & Safety Framework"}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-tight mb-6">
              {isAr ? "معايير شركة AB" : "The AB Standards"}
            </h1>

            <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
              {isAr
                ? "كل مركبة تُفحص، وكل سائق يُعتمد، وكل رحلة تُراقب، بالتوافق مع معايير TGA و RTA و ITC والمعايير الدولية للصناعة."
                : "Every vehicle inspected, every chauffeur vetted and every trip monitored, in line with TGA, RTA, ITC and international industry standards."}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href={`${base}/contact`}
                className="px-8 py-3.5 bg-abServiceBlue hover:bg-sky-500 text-white font-semibold rounded-lg shadow-lg shadow-sky-500/20 transition-all flex items-center gap-2"
              >
                <span>{isAr ? "اطلب عرض سعر" : "Request a Quote"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={`${base}/contact`}
                className="px-8 py-3.5 bg-gray-900/80 hover:bg-gray-800 text-white font-semibold rounded-lg border border-gray-700 transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-sky-400" />
                <span>{isAr ? "تحدث مع فريقنا" : "Talk to Our Team"}</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Our Commitment ── */}
        <section className="py-20 bg-abDarkGray border-b border-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-abBlack p-8 sm:p-12 rounded-3xl border border-gray-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-sky-400 to-abServiceBlue" />

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-abServiceBlue text-xs font-semibold uppercase tracking-wider mb-4">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isAr ? "التزامنا الراسخ" : "Our Commitment"}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                {isAr
                  ? "إطار الجودة وراء كل رحلة ننفذها"
                  : "The Quality Framework Behind Every Trip"}
              </h2>

              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6 font-light">
                {isAr
                  ? "يعتمد نقل الرؤساء التنفيذيين والوفود وضيوف الفعاليات على الحصول على نفس الجودة العالية في كل رحلة. معيار AB هو إطار الجودة الصارم وراء كل مركبة نرسلها وكل سائق نكلفه في المملكة العربية السعودية والإمارات وقطر وما وراءها. إنه مبني على الامتثال التنظيمي المحلي وأفضل الممارسات الدولية، ويفحصه فريق ضمان الجودة لدينا يومياً."
                  : "Moving executives, delegations and event guests depends on getting the same quality on every trip. The AB Standard is the quality framework behind every vehicle we dispatch and every chauffeur we deploy, in Saudi Arabia, the UAE, Qatar and beyond. It is built on local regulatory compliance and international best practice, and our Quality Assurance team checks it every day."}
              </p>

              <div className="pt-4 border-t border-gray-800 flex items-center gap-2 text-xs text-gray-400 font-mono">
                <FileCheck className="w-4 h-4 text-emerald-400" />
                <span>
                  {isAr
                    ? "معتمد بنسبة 100% ومدقق يومياً من فريق الجودة"
                    : "100% Quality Assurance Audited & Verified Daily"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── 1. Licensed and Fully Compliant ── */}
        <section className="py-20 bg-abBlack border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-2">
                {isAr ? "البند الأول" : "Section 1"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {isAr ? "1. مرخصون ونظاميون بالكامل" : "1. Licensed and Fully Compliant"}
              </h2>
              <p className="text-gray-300 text-base leading-relaxed">
                {isAr
                  ? "نعمل بموجب متطلبات التراخيص والتصاريح الصارمة لهيئات النقل في كل سوق نخدمه: السعودية (الهيئة العامة للنقل TGA)، دبي (هيئة الطرق والمواصلات RTA)، أبوظبي (مركز النقل المتكامل ITC)، وقطر (وزارة المواصلات MOT). تحمل كل مركبة رخصة سير وتأميناً وتصاريح سارية، ويحمل كل سائق رخصة مهنية وبطاقة سائق معتمدة. نتتبع التجديد مركزياً لضمان عدم وجود أي مخالفة."
                  : "We operate under the licensing and permit requirements of the transport authorities in each market we serve: Saudi Arabia (TGA), Dubai (RTA), Abu Dhabi (ITC), and Qatar (MOT). Every vehicle carries valid registration, insurance and operating permits, and every chauffeur holds the professional licenses and driver cards required by local regulation. We track renewals centrally, so nothing on the road is ever out of compliance."}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {authorities.map((auth) => (
                <div
                  key={auth.code}
                  className="bg-abDarkGray p-6 rounded-2xl border border-gray-800 shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="text-2xl font-black text-sky-400 font-mono mb-2">
                      {auth.code}
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">
                      {isAr ? auth.nameAr : auth.name}
                    </h3>
                    <div className="text-xs text-gray-400 mb-3 font-semibold">
                      {isAr ? auth.countryAr : auth.country}
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {isAr ? auth.descAr : auth.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-800 text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isAr ? "ترخيص ساري ومعتمد" : "Active & Centrally Monitored"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 2. The Vehicle Standard ── */}
        <section className="py-20 bg-abDarkGray border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-2">
                {isAr ? "البند الثاني" : "Section 2"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {isAr ? "2. معيار المركبة" : "2. The Vehicle Standard"}
              </h2>
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>
                  <strong className="text-white">{isAr ? "أسطول حديث ومحدد المواصفات:" : "Modern, well-specified fleet:"}</strong>{" "}
                  {isAr
                    ? "تبقى المركبات في الخدمة حتى 36 شهراً أو 120,000 كم كحد أقصى. بعد ذلك، يتم استبدالها."
                    : "Vehicles stay in service only up to 36 months or 120,000 km. After that, they are replaced."}
                </p>
                <p>
                  <strong className="text-white">{isAr ? "صيانة مجدولة معتمدة:" : "Planned maintenance:"}</strong>{" "}
                  {isAr
                    ? "تتم صيانة المركبات وفق جداول المصنع الدورية في مراكز الوكالات المعتمدة، وتُسجل كل صيانة رقمياً."
                    : "Vehicles are serviced on manufacturer schedules at authorised centers, and every service is recorded digitally."}
                </p>
                <p>
                  <strong className="text-white">{isAr ? "المظهر والضيافة:" : "Presentation:"}</strong>{" "}
                  {isAr
                    ? "تُنظف وتُجهز المركبات بعناية قبل كل رحلة، مع توفير مياه معبأة وشواحن هواتف وإنترنت واي فاي عند الطلب."
                    : "Vehicles are cleaned and prepared before each trip, with bottled water, phone chargers and Wi-Fi available on request."}
                </p>
                <p>
                  <strong className="text-white">{isAr ? "تكنولوجيا متطورة على متن المركبة:" : "Technology on board:"}</strong>{" "}
                  {isAr
                    ? "كل مركبة مزودة بنظام تتبع GPS ومتصلة بغرف التحكم المركزية لدينا على مدار الساعة 24/7."
                    : "Every vehicle has GPS tracking and is connected to our 24/7 control rooms."}
                </p>
              </div>
            </div>

            {/* Multi-point checklist box */}
            <div className="bg-abBlack rounded-2xl border border-gray-800 p-8 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Car className="w-5 h-5 text-sky-400" />
                <span>{isAr ? "فحص ما قبل الرحلة لجميع المركبات" : "Multi-Point Pre-Assignment Inspection"}</span>
              </h3>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {vehicleChecks.map((chk) => {
                  const Icon = chk.icon;
                  return (
                    <div
                      key={chk.title}
                      className="bg-gray-900/50 p-5 rounded-xl border border-gray-800/80"
                    >
                      <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-sky-400 mb-4">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-base font-bold text-white mb-2">
                        {isAr ? chk.titleAr : chk.title}
                      </h4>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        {isAr ? chk.descAr : chk.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. The Chauffeur Standard ── */}
        <section className="py-20 bg-abBlack border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-2">
                {isAr ? "البند الثالث" : "Section 3"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {isAr ? "3. معيار السائق الشخصي" : "3. The Chauffeur Standard"}
              </h2>
              <p className="text-gray-300 text-base leading-relaxed">
                {isAr
                  ? "السائق هو واجهة التجربة الفاخرة. وضعنا معايير صارمة تضمن الكفاءة العالية، وحسن السير والسلوك، والأمان التام."
                  : "A luxury vehicle is only as good as the chauffeur behind the wheel. The AB Chauffeur Standard guarantees discretion, safety, and utmost professionalism."}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {chauffeurPillars.map((pil) => (
                <div
                  key={pil.title}
                  className="bg-abDarkGray p-6 rounded-2xl border border-gray-800 shadow-lg"
                >
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{isAr ? pil.titleAr : pil.title}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {isAr ? pil.descAr : pil.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. Operational Control ── */}
        <section className="py-20 bg-abDarkGray border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-2">
                {isAr ? "البند الرابع" : "Section 4"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {isAr ? "4. السيطرة والتحكم العملياتي" : "4. Operational Control"}
              </h2>
              <p className="text-gray-300 text-base leading-relaxed">
                {isAr
                  ? "غرف تحكم متزامنة تراقب كل رحلة وتتخذ الإجراءات الاستباقية لضمان عدم تأخر أي ضيف."
                  : "Centralized command operations maintaining 24/7 visibility over every vehicle, route, and arrival."}
              </p>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
              {operationalPillars.map((op) => {
                const Icon = op.icon;
                return (
                  <div
                    key={op.title}
                    className="bg-abBlack p-6 rounded-2xl border border-gray-800 flex flex-col justify-between shadow-lg"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-sky-400 mb-4">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-white mb-2">
                        {isAr ? op.titleAr : op.title}
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        {isAr ? op.descAr : op.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 5. Continuous Quality Assurance ── */}
        <section className="py-20 bg-abBlack border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-2">
                {isAr ? "البند الخامس" : "Section 5"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {isAr ? "5. ضمان الجودة المستمر" : "5. Continuous Quality Assurance"}
              </h2>
              <p className="text-gray-300 text-base leading-relaxed">
                {isAr
                  ? "تدقيق يومي، وقياس دقيق للأداء، وملاحظات العملاء المستمرة التي يتم تضمينها في تدريب السائقين."
                  : "Audited daily by our Quality Assurance team to ensure continuous measurement and refinement."}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {qaPillars.map((qa) => (
                <div
                  key={qa.title}
                  className="bg-abDarkGray p-6 rounded-2xl border border-gray-800 shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 text-sky-400 mb-3">
                      <Search className="w-4 h-4" />
                      <h3 className="text-base font-bold text-white">
                        {isAr ? qa.titleAr : qa.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {isAr ? qa.descAr : qa.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Closing CTA ── */}
        <section className="py-20 bg-gradient-to-b from-abDarkGray to-abBlack text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              {isAr ? "جرّب معايير شركة AB" : "Experience the AB Standard."}
            </h2>
            <p className="text-base text-gray-300 max-w-2xl mx-auto mb-8 font-light">
              {isAr
                ? "سواء كانت رحلتك استقبالاً لمسؤول تنفيذي واحد أو فعالية متعددة الأسابيع بمئات المركبات، تُقدم كل رحلة بنفس المستوى من الجودة."
                : "Whether it’s one executive arrival or a multi-week event with hundreds of vehicles, every trip is delivered to the same standard."}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href={`${base}/contact`}
                className="px-8 py-3.5 bg-abServiceBlue hover:bg-sky-500 text-white font-semibold rounded-lg text-sm transition-all flex items-center gap-2"
              >
                <span>{isAr ? "اطلب عرض سعر" : "Request a Quote"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={`${base}/contact`}
                className="px-8 py-3.5 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg text-sm transition-all"
              >
                {isAr ? "تحدث مع فريقنا" : "Talk to Our Team"}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
