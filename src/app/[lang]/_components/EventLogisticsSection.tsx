import Image from "next/image";
import Link from "next/link";
import { Dictionary, localeBase } from "@/app/[lang]/dictionaries";

const whatWeRunIcons = [
  { icon: "fa-user-tie", color: "text-amber-400" },
  { icon: "fa-plane-arrival", color: "text-sky-400" },
  { icon: "fa-briefcase", color: "text-blue-400" },
  { icon: "fa-calendar-check", color: "text-purple-400" },
  { icon: "fa-bus", color: "text-emerald-400" },
  { icon: "fa-helmet-safety", color: "text-amber-500" },
  { icon: "fa-kaaba", color: "text-teal-400" },
];

export default function EventLogisticsSection({
  dict,
  lang = "en-US",
}: {
  dict: Dictionary;
  lang?: string;
}) {
  const el = dict.home.eventLogistics;
  const isAr = lang === "ar";
  const chauffeurHref = `${localeBase(lang)}/services/chauffeur-vip`;
  const managedHref = `${localeBase(lang)}/services/event-transportation`;

  return (
    <section id="logistics" className="py-24 bg-abDarkGray border-b border-gray-900 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top: 2-Column Layout (Image on left, 2 blocks on right) */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Eyebrow + 2 Distinct Title & Description Blocks */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="text-sm font-bold tracking-widest text-abBlue uppercase mb-3">
              <span>{el.badge}</span>
            </div>

            {/* Block 1: Chauffeur services */}
            <div className="p-7 sm:p-8 rounded-2xl bg-[#0e0e13] border border-gray-800/90 hover:border-abGold/35 transition-all duration-300 shadow-lg group">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded text-abBlue text-abGold border border-abGold/25">01</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-abGold transition-colors">
                  {el.chauffeur.title}
                </h3>
              </div>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-5">
                {el.chauffeur.desc}
              </p>
              <Link
                href={chauffeurHref}
                className="inline-flex items-center gap-2 text-sm font-semibold text-abBlue hover:text-white transition-colors"
              >
                <span>{el.chauffeur.linkText || (isAr ? "استكشف خدمات السائق الخاص" : "Explore chauffeur services")}</span>
                <i className={`fa-solid ${isAr ? "fa-arrow-left" : "fa-arrow-right"} text-xs transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1`}></i>
              </Link>
            </div>

            {/* Block 2: Mastering Complex Route Architecture */}
            <div className="p-7 sm:p-8 rounded-2xl bg-[#0e0e13] border border-gray-800/90 hover:border-abGold/35 transition-all duration-300 shadow-lg group">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded text-abBlue text-abGold border border-abGold/25">02</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-abGold transition-colors">
                  {el.managed.title}
                </h3>
              </div>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-5">
                {el.managed.desc}
              </p>
              <Link
                href={managedHref}
                className="inline-flex items-center gap-2 text-sm font-semibold text-abBlue hover:text-white transition-colors"
              >
                <span>{el.managed.linkText || (isAr ? "استكشف النقل المدار" : "Explore managed transportation")}</span>
                <i className={`fa-solid ${isAr ? "fa-arrow-left" : "fa-arrow-right"} text-xs transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1`}></i>
              </Link>
            </div>
          </div>

          {/* Right Column: Image with Live Dispatch Status Card */}
          <div className="lg:col-span-5 order-1 lg:order-2 relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-abGold/10 via-transparent to-abBlue/10 rounded-2xl blur-xl opacity-60 pointer-events-none"></div>
            <div className="relative rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
              <Image
                src="/Team_Meet.jpeg"
                alt={el.alt || "Executive Chauffeur & Dispatch Operations"}
                width={1000}
                height={700}
                className="w-full object-cover h-[440px] sm:h-[500px] lg:h-[540px] grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Data Card */}
            <div className="absolute -bottom-6 -left-4 sm:left-6 rtl:-left-auto rtl:-right-4 rtl:sm:right-6 bg-[#111116]/95 backdrop-blur-md p-5 sm:p-6 rounded-xl shadow-2xl z-20 border border-gray-800/90 max-w-xs">
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
                <div className="h-3 w-3 bg-abGreen rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{el.dispatch}</span>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{el.coaches}</p>
              <p className="text-xs text-gray-400 mt-1">{el.deployed}</p>
            </div>
          </div>
        </div>

        {/* Bottom: Full Width - H2 — What we run */}
        <div className="mt-24 pt-16 border-t border-gray-800/80">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold tracking-widest text-abBlue uppercase mb-2 inline-block">
              {el.whatWeRun.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              {el.whatWeRun.title}
            </h2>
            <p className="text-gray-400 text-base sm:text-lg mt-3 leading-relaxed">
              {el.whatWeRun.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {el.whatWeRun.items.map((item, idx) => {
              const iconConfig = whatWeRunIcons[idx] || { icon: "fa-car", color: "text-abGold" };
              const isLastOnXl = idx === 6;
              return (
                <div
                  key={idx}
                  className={`group relative p-6 rounded-xl bg-[#0c0c10] border border-gray-800/80 hover:border-abGold/40 transition-all duration-300 hover:shadow-xl hover:shadow-black/50 hover:-translate-y-1 flex flex-col justify-between ${
                    isLastOnXl ? "md:col-span-2 lg:col-span-1 xl:col-span-2" : ""
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-11 h-11 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center ${iconConfig.color} text-lg group-hover:scale-110 transition-transform duration-300 shadow-inner`}
                      >
                        <i className={`fa-solid ${iconConfig.icon}`}></i>
                      </div>
                      <span className="text-xs font-mono font-semibold text-gray-500 group-hover:text-abGold transition-colors">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-abGold transition-colors mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
