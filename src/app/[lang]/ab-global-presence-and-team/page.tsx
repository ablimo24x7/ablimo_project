import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  ShieldCheck,
  Globe,
  Users,
  Award,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import {
  hasLocale,
  defaultLocale,
  type Locale,
  localeBase,
  localeHome,
} from "@/app/[lang]/dictionaries";
import { generateSeoMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/StructuredData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isAr = lang.startsWith("ar");

  return generateSeoMetadata({
    title: isAr
      ? "التواجد الإقليمي وفريق القيادة | AB"
      : "AB Global Presence & Team | Regional GCC Network",
    description: isAr
      ? "تعرف على مكاتب AB في الرياض ودبي وأبوظبي والدوحة وفريق القيادة والتراخيص المعتمدة."
      : "Regional offices in Riyadh, Dubai, Abu Dhabi, and Doha. Meet our executive leadership, operating licenses, and 24/7 GCC control rooms.",
    path: "/ab-global-presence-and-team",
    lang,
    keywords:
      "AB global presence, AB leadership team, Riyadh headquarters, Dubai office, Abu Dhabi transport, Doha Qatar, GCC ground transportation",
  });
}

const offices = [
  {
    city: "Riyadh",
    cityAr: "الرياض",
    country: "Saudi Arabia (Headquarters)",
    countryAr: "المملكة العربية السعودية (المقر الرئيسي)",
    localCompany: "AB Transportation Company",
    isHq: true,
    address: "Malaz Area, Umar Ibn Abdulaziz Road, Building Number 59, Second Floor, Riyadh 12626, Saudi Arabia",
    addressAr: "حي الملز، طريق عمر بن عبد العزيز، مبنى رقم 59، الطابق الثاني، الرياض 12626، المملكة العربية السعودية",
    role: "Global Corporate Headquarters, Central 24/7 Dispatch Control Room & Enterprise Frameworks",
    roleAr: "المقر الرئيسي العالمي، غرفة التحكم المركزية 24/7 وإدارة عقود الشركات",
    authority: "Transport General Authority (TGA) Class-A Licensed",
    authorityAr: "مرخص من الهيئة العامة للنقل (TGA)",
    phone: "+966 11 834 3777",
    email: "riyadh@ab.limo",
    mapQuery: "Malaz Area, Umar Ibn Abdulaziz Road, Riyadh 12626, Saudi Arabia",
    image: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=800&h=600&fit=crop&q=80",
  },
  {
    city: "Dubai",
    cityAr: "دبي",
    country: "United Arab Emirates",
    countryAr: "الإمارات العربية المتحدة",
    localCompany: "ABT Travel and Tourism LLC",
    address: "Al Khabaisi, Deira, Suite 206, DBC Building, Dubai, United Arab Emirates",
    addressAr: "الخبايصي، ديرة، جناح 206، مبنى دي بي سي (DBC)، دبي، الإمارات العربية المتحدة",
    role: "UAE Commercial Hub, Dubai International Airport (DXB) VIP Staging & Event Logistics",
    roleAr: "المركز التجاري للإمارات، إرسال مطار دبي (DXB) وأساطيل الفعاليات",
    authority: "Roads and Transport Authority (RTA) Commercial Permit",
    authorityAr: "تصريح تجاري من هيئة الطرق والمواصلات (RTA)",
    phone: "+971 4 396 8282",
    email: "dubai@ab.limo",
    mapQuery: "DBC Building, Al Khabaisi, Deira, Dubai, UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop&q=80",
  },
  {
    city: "Abu Dhabi",
    cityAr: "أبوظبي",
    country: "United Arab Emirates",
    countryAr: "الإمارات العربية المتحدة",
    localCompany: "AB Middleeast and Limousine LLC",
    address: "Mohammed Bin Zayed City, Office 3, Building C57, Abu Dhabi, United Arab Emirates",
    addressAr: "مدينة محمد بن زايد، مكتب 3، مبنى C57، أبوظبي، الإمارات العربية المتحدة",
    role: "Government & Diplomatic Protocol Transport, Zayed International Airport (AUH) Operations",
    roleAr: "لوجستيات البروتوكول الحكومي والدبلوماسي وعمليات مطار زايد الدولي",
    authority: "Integrated Transport Centre (ITC) Licensed",
    authorityAr: "مرخص من مركز النقل المتكامل (ITC)",
    phone: "+971 2 642 9111",
    email: "abudhabi@ab.limo",
    mapQuery: "Mohammed Bin Zayed City, Building C57, Abu Dhabi, UAE",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop&q=80",
  },
  {
    city: "Doha",
    cityAr: "الدوحة",
    country: "State of Qatar",
    countryAr: "دولة قطر",
    localCompany: "AB Transportation Company (Qatar)",
    address: "Street 830, Al Rufaa, Building 54, Zone 17, Doha, Qatar",
    addressAr: "شارع 830، الرفاع، مبنى 54، المنطقة 17، الدوحة، قطر",
    role: "Qatar Corporate Mobility, Hamad International Airport (DOH) VIP Terminal Coordination",
    roleAr: "تنقل الشركات بقطر، وتنسيق صالات كبار الشخصيات بمطار حمد الدولي",
    authority: "Ministry of Transport (MOT) Licensed Operator",
    authorityAr: "مرخص من وزارة المواصلات (MOT)",
    phone: "+974 44 883 222",
    email: "doha@ab.limo",
    mapQuery: "Al Rufaa, Street 830, Building 54, Doha, Qatar",
    image: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=800&h=600&fit=crop&q=80",
  },
];

const leadershipTeams = [
  {
    id: "executive-leadership",
    title: "Executive Leadership Team",
    titleAr: "فريق القيادة التنفيذية",
    members: [
      { name: "Abdul Hadi", title: "Group CEO", titleAr: "الرئيس التنفيذي للمجموعة", image: "/Team-AB/Abdul Hadi.jpeg" },
      { name: "Thajudeen Kaja", title: "Group Director", titleAr: "مدير المجموعة", image: "/Team-AB/Tahuddin Kaja.jpeg" },
      { name: "Khalid Al Jamaz", title: "Director", titleAr: "مدير", image: "/Team-AB/Khalid.jpeg" },
    ],
  },
  {
    id: "ksa-leadership",
    title: "KSA Leadership Team",
    titleAr: "فريق القيادة في السعودية",
    members: [
      { name: "Celima Fernandes", title: "Reservations & Operations Manager", titleAr: "مديرة الحجوزات والعمليات", image: "/Team-AB/Celima Fernandes.jpeg" },
      { name: "Farees Abdulraheem", title: "Country Sales Manager", titleAr: "مدير المبيعات القطري", image: "/Team-AB/Farees.jpeg" },
    ],
  },
  {
    id: "uae-leadership",
    title: "UAE Leadership Team",
    titleAr: "فريق القيادة في الإمارات",
    members: [
      { name: "Abdul Fatah", title: "Operations Director UAE", titleAr: "مدير العمليات في الإمارات", image: "/Team-AB/Abdul fatah.jpeg" },
      { name: "Fawad Hamayun", title: "Country Director, UAE", titleAr: "مدير الدولة، الإمارات", image: "/Team-AB/Fawad hummayun.jpeg" },
      { name: "Vishnu", title: "Business Development Manager, UAE", titleAr: "مدير تطوير الأعمال، الإمارات", image: "/Team-AB/Vishnu.jpeg" },
      { name: "Umer Farooq", title: "Head of Events Transport, Dubai", titleAr: "رئيس نقل الفعاليات، دبي", image: "/Team-AB/Umer Farooq.jpeg" },
    ],
  },
  {
    id: "qatar-leadership",
    title: "Qatar Leadership Team",
    titleAr: "فريق القيادة في قطر",
    members: [
      { name: "Noman Ali", title: "Country Director, Qatar", titleAr: "مدير الدولة، قطر", image: "/Team-AB/Noman.jpeg" },
      { name: "Ayan Nazir", title: "Head of Events Transport, Qatar", titleAr: "رئيس نقل الفعاليات، قطر", image: "/Team-AB/Ayan Nazir.jpeg" },
    ],
  },
  {
    id: "team",
    title: "Team",
    titleAr: "الفريق",
    members: [
      { name: "Umriz Khan", title: "Dispatch Manager", titleAr: "مدير الإرسال", image: "/Team-AB/Umraiz.jpeg" },
      { name: "Hishamudheen Taj", title: "Events Transport Manager", titleAr: "مدير نقل الفعاليات", image: "/Team-AB/Hisham Tajhuddin.jpeg" },
      { name: "Abdul Qadir", title: "Events Dispatch Manager", titleAr: "مدير إرسال الفعاليات", image: "/Team-AB/Abdul Qadir.jpeg" },
      { name: "Muhammad Asif", title: "Fleet Manager", titleAr: "مدير الأسطول", image: "/Team-AB/Muhammad Asif.jpeg" },
      { name: "Muath Ibrahim Aljammaz", title: "Team Leader & Government Affairs Manager", titleAr: "قائد الفريق ومدير الشؤون الحكومية", image: "/Team-AB/Muath.jpeg" },
      { name: "Bilal Aslam", title: "Head of Technology", titleAr: "رئيس التقنية", image: "/Team-AB/Bilal Aslam.jpeg" },
    ],
  },
];

const credentials = [
  {
    code: "TGA",
    title: "Transport General Authority (TGA)",
    titleAr: "الهيئة العامة للنقل (TGA)",
    country: "Saudi Arabia",
    countryAr: "المملكة العربية السعودية",
    tag: "Class-A Licensed",
    tagAr: "مرخص فئة (أ)",
    desc: "Licensed commercial ground passenger transport, executive chauffeur service, and airport operations.",
    descAr: "ترخيص تشغيل تجاري للنقل البري للركاب وخدمات السائق الفاخر وعمليات المطارات.",
  },
  {
    code: "RTA",
    title: "Roads & Transport Authority (RTA)",
    titleAr: "هيئة الطرق والمواصلات (RTA)",
    country: "Dubai, UAE",
    countryAr: "دبي، الإمارات",
    tag: "Commercial Permit",
    tagAr: "تصريح تجاري",
    desc: "Licensed luxury transport and limousine operator with accredited chauffeurs and airport permits.",
    descAr: "مشغل تجاري مرخص لخدمات الليموزين الفاخر مع سائقين معتمدين وتصاريح المطارات.",
  },
  {
    code: "ITC",
    title: "Integrated Transport Centre (ITC)",
    titleAr: "مركز النقل المتكامل (ITC)",
    country: "Abu Dhabi, UAE",
    countryAr: "أبوظبي، الإمارات",
    tag: "Executive Licence",
    tagAr: "ترخيص تنفيذي",
    desc: "Authorised executive mobility provider for ministries, diplomatic delegations, and corporate fleets.",
    descAr: "مزود معتمد لخدمات التنقل التنفيذي للوزارات والبعثات الدبلوماسية وأساطيل الشركات.",
  },
  {
    code: "MOT",
    title: "Ministry of Transport (MOT)",
    titleAr: "وزارة المواصلات (MOT)",
    country: "State of Qatar",
    countryAr: "دولة قطر",
    tag: "Regulated Operator",
    tagAr: "مشغل نظامي",
    desc: "Licensed passenger road transport provider for corporate accounts and airport transfers.",
    descAr: "مشغل نقل بري فاخر مرخص لحسابات الشركات وحافلات المؤتمرات ونقل المطارات.",
  },
  {
    code: "GPN",
    title: "Global Passenger Network (GPN)",
    titleAr: "شبكة الركاب العالمية (GPN)",
    country: "International Alliance",
    countryAr: "تحالف دولي",
    tag: "Exclusive Member",
    tagAr: "عضو حصري",
    desc: "Exclusive appointed representative for Saudi Arabia and UAE in the premier global transport alliance.",
    descAr: "الممثل الحصري المعتمد للمملكة العربية السعودية والإمارات في التحالف العالمي الرائد.",
  },
  {
    code: "ISO",
    title: "ISO 9001:2015 & ISO 39001:2012",
    titleAr: "شهادات ISO 9001 و ISO 39001",
    country: "Audited Certification",
    countryAr: "اعتماد مدقق",
    tag: "Dual ISO Standards",
    tagAr: "معايير ISO مزدوجة",
    desc: "Certified Quality Management Systems and Road Traffic Safety (RTS) governing all operations.",
    descAr: "أنظمة إدارة الجودة والسلامة المرورية المعتمدة التي تحكم كافة رحلات الأسطول وغرف التحكم.",
  },
];

const faqs = [
  {
    q: "Why does my contract or invoice show a different company name?",
    qAr: "لماذا يظهر اسم شركة مختلف في عقدي أو فاتورتي؟",
    a: "AB operates through a locally registered company in each country. Your contract and invoices carry the legal name of the AB company in your country, such as AB Transportation Company in Saudi Arabia.",
    aAr: "تعمل AB من خلال شركة مسجلة محلياً في كل دولة. يحمل عقدك وفواتيرك الاسم القانوني لكيان AB في بلدك، مثل AB Transportation Company في المملكة العربية السعودية.",
  },
  {
    q: "Where is AB headquartered?",
    qAr: "أين يقع المقر الرئيسي لشركة AB؟",
    a: "In Riyadh, Saudi Arabia, with fully staffed regional offices in Dubai, Abu Dhabi and Doha.",
    aAr: "في الرياض، المملكة العربية السعودية، مع مكاتب إقليمية متكاملة في دبي وأبوظبي والدوحة.",
  },
  {
    q: "Does AB own its vehicles?",
    qAr: "هل تمتلك AB مركباتها الخاصة؟",
    a: "AB operates a blended model of wholly owned flagship vehicles, long-term leased late-model assets, and vetted tier-1 partner capacity—all maintained strictly to the AB Vehicle Standard and managed under our central dispatch system.",
    aAr: "تتبع AB نموذج أسطول هجين يجمع بين مركبات رائدة مملوكة بالكامل، ومركبات حديثة مستأجرة بعقود طويلة، وسعة إضافية من شركاء الفئة الأولى—وجميعها تخضع بالكامل لمعايير AB الصارمة وتُدار عبر نظام الإرسال المركزي.",
  },
  {
    q: "Is there an AB app?",
    qAr: "هل يوجد تطبيق لـ AB على الهواتف؟",
    a: "Bookings are made through our team, website forms, phone and WhatsApp. This ensures every corporate and VIP movement receives tailored, human-led operational oversight from our dispatch specialists without automated gaps.",
    aAr: "تتم الحجوزات من خلال فريقنا المختص، ونماذج الموقع الإلكتروني، والهاتف، وقنوات الواتساب المعتمدة لضمان حصول كل رحلة على مراجعة تشغيلية مباشرة ومخصصة.",
  },
];

export default async function GlobalPresencePage({
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
            name: isAr ? "التواجد الإقليمي وفريق القيادة" : "Global Presence and Team",
            url: `${base}/ab-global-presence-and-team`,
          },
        ]}
      />
      <FAQJsonLd
        items={faqs.map((f) => ({
          question: isAr ? f.qAr : f.q,
          answer: isAr ? f.aAr : f.a,
        }))}
      />

      <main className={`min-h-screen bg-abBlack text-gray-200 ${isAr ? "font-arabic" : ""}`}>
        {/* ── Hero Section ── */}
        <section className="relative py-24 sm:py-32 overflow-hidden border-b border-gray-800 bg-gradient-to-b from-gray-900 via-abBlack to-abBlack">
          <div className="absolute inset-0 z-0 opacity-25">
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=800&fit=crop&q=80"
              alt="AB Global Presence"
              fill
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-abBlack/80" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-abServiceBlue text-xs font-semibold tracking-wider uppercase mb-6">
              <Globe className="w-3.5 h-3.5" />
              <span>{isAr ? "الشبكة الإقليمية وفريق القيادة" : "Regional Network & Leadership"}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-tight mb-6">
              {isAr ? "التواجد الإقليمي لشركة AB وفريق القيادة" : "AB Global Presence and Team"}
            </h1>

            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              {isAr
                ? "شبكة عمليات إقليمية تُدار من مقرنا الرئيسي في الرياض، تربط دول الخليج بمكاتب محلية مرخصة وغرف تحكم تعمل على مدار الساعة."
                : "A regional operations network run from Riyadh, connecting the GCC with licensed local offices, 24/7 command centres, and enterprise mobility leadership."}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#offices"
                className="px-8 py-3.5 bg-abServiceBlue hover:bg-sky-500 text-white font-semibold rounded-lg shadow-lg shadow-sky-500/20 transition-all flex items-center gap-2"
              >
                <span>{isAr ? "استكشف مكاتبنا" : "Our Offices"}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#leadership"
                className="px-8 py-3.5 bg-gray-900/80 hover:bg-gray-800 text-white font-semibold rounded-lg border border-gray-700 transition-all flex items-center gap-2"
              >
                <Users className="w-4 h-4 text-sky-400" />
                <span>{isAr ? "فريق القيادة" : "Leadership Team"}</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── H2: Our Offices ── */}
        <section id="offices" className="py-20 bg-abDarkGray border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-abServiceBlue text-xs font-semibold uppercase tracking-wider mb-3">
                <Building2 className="w-3.5 h-3.5" />
                <span>{isAr ? "المقار والمكاتب" : "GCC Locations"}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {isAr ? "مكاتبنا الإقليمية" : "Our Offices"}
              </h2>
              <p className="text-gray-400 text-base">
                {isAr
                  ? "الرياض (المقر الرئيسي) · دبي · أبوظبي · الدوحة"
                  : "Riyadh (Headquarters) · Dubai · Abu Dhabi · Doha"}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {offices.map((off) => (
                <div
                  key={off.city}
                  className="bg-abBlack rounded-2xl border border-gray-800 overflow-hidden shadow-xl flex flex-col justify-between hover:border-gray-700 transition-all"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={off.image}
                      alt={off.city}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-abBlack via-abBlack/40 to-transparent" />
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm text-sky-400 border border-white/10">
                        {isAr ? off.cityAr : off.city}
                      </span>
                      {off.isHq && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                          {isAr ? "المقر الرئيسي" : "Headquarters"}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {isAr ? off.cityAr : off.city}
                      </h3>
                      <div className="text-xs font-semibold text-abServiceBlue uppercase mb-4">
                        {isAr ? off.countryAr : off.country}
                      </div>
                      <div className="mb-4">
                        <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                          {isAr ? "الشركة المحلية" : "Local Company"}
                        </div>
                        <p className="text-sm font-semibold text-white">
                          {off.localCompany}
                        </p>
                      </div>

                      <div className="space-y-3 mb-6 bg-gray-900/50 p-4 rounded-xl border border-gray-800 text-sm">
                        <div className="flex items-start gap-2.5">
                          <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                          <span className="text-gray-300">
                            {isAr ? off.addressAr : off.address}
                          </span>
                        </div>
                        <div className="flex items-center gap-2.5 pt-2 border-t border-gray-800 text-xs text-gray-400">
                          <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{isAr ? "مفتوح 24/7 طوال الأسبوع" : "Open 24/7 / 365 Days"}</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-xs text-gray-400">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{isAr ? off.authorityAr : off.authority}</span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-400 leading-relaxed mb-6">
                        {isAr ? off.roleAr : off.role}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-800 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-4 text-xs">
                        <a
                          href={`tel:${off.phone.replace(/\s+/g, "")}`}
                          className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5 text-sky-400" />
                          <span>{off.phone}</span>
                        </a>
                        <a
                          href={`mailto:${off.email}`}
                          className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5 text-sky-400" />
                          <span>{off.email}</span>
                        </a>
                      </div>

                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(off.mapQuery)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-abServiceBlue hover:text-white font-semibold flex items-center gap-1 transition-colors"
                      >
                        <span>{isAr ? "فتح في خرائط جوجل" : "Open in Maps"}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── H2: Our Team ── */}
        <section id="leadership" className="py-20 bg-abBlack border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-abServiceBlue text-xs font-semibold uppercase tracking-wider mb-3">
                  <Users className="w-3.5 h-3.5" />
                  <span>{isAr ? "فريقنا" : "Our Team"}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  {isAr ? "فريقنا" : "Our Team"}
                </h2>
                <p className="text-gray-400 text-sm">
                  {isAr
                    ? "تعرف على فرق القيادة والعمليات في مقرنا الرئيسي ومكاتبنا في السعودية والإمارات وقطر."
                    : "Meet our leadership and operations teams across our headquarters and offices in KSA, the UAE, and Qatar."}
                </p>
              </div>

              <Link
                href={`${base}/contact`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-abServiceBlue hover:text-white transition-colors"
              >
                <span>{isAr ? "تواصل مع فريقنا ←" : "Contact Our Team →"}</span>
              </Link>
            </div>

            <div className="space-y-14">
              {leadershipTeams.map((team) => (
                <section key={team.id} aria-labelledby={`team-${team.id}`}>
                  <h3
                    id={`team-${team.id}`}
                    className="text-xl sm:text-2xl font-bold text-white mb-6"
                  >
                    {isAr ? team.titleAr : team.title}
                  </h3>
                  <div className="flex flex-wrap justify-center gap-6">
                    {team.members.map((member) => (
                      <article
                        key={member.name}
                        className="min-w-0 basis-[calc((100%_-_1.5rem)/2)] rounded-2xl border border-gray-800 overflow-hidden shadow-lg hover:border-gray-700 transition-all sm:basis-[calc((100%_-_3rem)/3)] lg:basis-[calc((100%_-_4.5rem)/4)]"
                      >
                        <div className="relative h-80 sm:h-96 w-full">
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className="object-cover object-top"
                          />
                        </div>
                        <div className="p-5 opacity-90 hover:opacity-100 transition-opacity">
                          <h4 className="text-base sm:text-lg font-bold text-white mb-1">
                            {member.name}
                          </h4>
                          <div className="text-xs font-semibold text-abServiceBlue">
                            {isAr ? member.titleAr : member.title}
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>

        {/* ── H2: Licenses and credentials ── */}
        <section id="credentials" className="py-20 bg-abDarkGray border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
                  <Award className="w-3.5 h-3.5" />
                  <span>{isAr ? "الامتثال والتراخيص" : "Compliance"}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  {isAr ? "التراخيص والاعتمادات" : "Licenses and credentials"}
                </h2>
                <p className="text-gray-400 text-sm">
                  {isAr
                    ? "تراخيص تشغيل نظامية معتمدة لكل دولة وعضوية التحالفات الدولية."
                    : "Transport operating licences per country, memberships, and certifications."}
                </p>
              </div>

              <Link
                href={`${base}/about#standard`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-abServiceBlue hover:text-white transition-colors"
              >
                <span>{isAr ? "عرض الاعتمادات ←" : "View credentials →"}</span>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {credentials.map((crd) => (
                <div
                  key={crd.code}
                  className="bg-abBlack p-6 rounded-2xl border border-gray-800 flex flex-col justify-between shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-black text-sky-400 font-mono">
                        {crd.code}
                      </span>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {isAr ? crd.tagAr : crd.tag}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-1">
                      {isAr ? crd.titleAr : crd.title}
                    </h3>
                    <div className="text-xs text-gray-400 mb-3">
                      {isAr ? crd.countryAr : crd.country}
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {isAr ? crd.descAr : crd.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-800/80 flex items-center gap-1.5 text-[11px] text-gray-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{isAr ? "سارية ومدققة رسمياً" : "Active & Regulatory Verified"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQs ── */}
        <section id="faqs" className="py-20 bg-abBlack border-b border-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-3">
                {isAr ? "الأسئلة الشائعة" : "FAQs"}
              </h2>
              <p className="text-sm text-gray-400">
                {isAr
                  ? "إجابات مباشرة على استفسارات العقود والمقرات والأسطول والتطبيق."
                  : "Direct operational and commercial answers regarding AB's network."}
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-abDarkGray rounded-xl border border-gray-800 p-6"
                >
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                    {isAr ? faq.qAr : faq.q}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {isAr ? faq.aAr : faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Closing CTA ── */}
        <section className="py-16 bg-gradient-to-b from-abDarkGray to-abBlack text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {isAr ? "تواصل مع فريقنا في الرياض ودبي وأبوظبي والدوحة" : "Connect with Our Regional Operations Team"}
            </h2>
            <p className="text-sm text-gray-300 max-w-xl mx-auto mb-8">
              {isAr
                ? "سواء كنت بحاجة إلى رحلة فردية أو أسطول متكامل لقمة دولية، مكاتبنا في خدمتكم."
                : "Whether you need executive transfers or a managed multi-city corporate fleet, our local offices are ready."}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href={`${base}/contact`}
                className="px-6 py-3 bg-abServiceBlue hover:bg-sky-500 text-white font-semibold rounded-lg text-sm transition-all flex items-center gap-2"
              >
                <span>{isAr ? "تواصل معنا" : "Contact Our Team"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={`${base}/corporate-accounts`}
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg text-sm transition-all"
              >
                {isAr ? "حسابات الشركات" : "Corporate Accounts"}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
