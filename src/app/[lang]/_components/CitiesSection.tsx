import Link from "next/link";
import Image from "next/image";
import { Dictionary, localeBase } from "@/app/[lang]/dictionaries";
import { getCityServiceCounts } from "@/lib/blog";
import { resolveCountry, resolveCity } from "@/lib/locations";
import CitiesCarousel, { type CityCardData } from "./CitiesCarousel";

interface MainCityConfig {
  slug: string;
  countrySlug: string;
  name: string;
  nameAr: string;
  countryName: string;
  countryNameAr: string;
  image: string;
}

const MAIN_CITIES: MainCityConfig[] = [
  {
    slug: "riyadh",
    countrySlug: "saudi-arabia",
    name: "Riyadh",
    nameAr: "الرياض",
    countryName: "Saudi Arabia",
    countryNameAr: "المملكة العربية السعودية",
    image: "https://images.unsplash.com/photo-1663900108404-a05e8bf82cda?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "jeddah",
    countrySlug: "saudi-arabia",
    name: "Jeddah",
    nameAr: "جدة",
    countryName: "Saudi Arabia",
    countryNameAr: "المملكة العربية السعودية",
    image: "https://images.unsplash.com/photo-1586715065342-98d1f6016fd1?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "dammam",
    countrySlug: "saudi-arabia",
    name: "Dammam",
    nameAr: "الدمام",
    countryName: "Saudi Arabia",
    countryNameAr: "المملكة العربية السعودية",
    image: "https://images.unsplash.com/photo-1578895101408-1a36b834405b?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "medina",
    countrySlug: "saudi-arabia",
    name: "Madinah",
    nameAr: "المدينة المنورة",
    countryName: "Saudi Arabia",
    countryNameAr: "المملكة العربية السعودية",
    image: "https://images.unsplash.com/photo-1588513646744-e94675143d6f?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "doha",
    countrySlug: "qatar",
    name: "Doha",
    nameAr: "الدوحة",
    countryName: "Qatar",
    countryNameAr: "قطر",
    image: "https://images.unsplash.com/photo-1647252262017-582a7dbb73d0?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "dubai",
    countrySlug: "uae",
    name: "Dubai",
    nameAr: "دبي",
    countryName: "UAE",
    countryNameAr: "الإمارات",
    image: "https://images.unsplash.com/photo-1721170628208-dffed6eb3514?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "abu-dhabi",
    countrySlug: "uae",
    name: "Abu Dhabi",
    nameAr: "أبوظبي",
    countryName: "UAE",
    countryNameAr: "الإمارات",
    image: "https://plus.unsplash.com/premium_photo-1733317416241-d92ba6af4e51?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "al-ula",
    countrySlug: "saudi-arabia",
    name: "Al Ula",
    nameAr: "العلا",
    countryName: "Saudi Arabia",
    countryNameAr: "المملكة العربية السعودية",
    image: "https://images.unsplash.com/photo-1681419670203-6b081b3c9fe1?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "ras-al-khaimah",
    countrySlug: "uae",
    name: "Ras Al Khaymah",
    nameAr: "رأس الخيمة",
    countryName: "UAE",
    countryNameAr: "الإمارات",
    image: "https://images.unsplash.com/photo-1611479853417-80d5b7869ddf?q=80&w=800&auto=format&fit=crop",
  },
];

export default async function CitiesSection({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: string;
}) {
  const labels = dict.home.citiesSection;
  const counts = await getCityServiceCounts();

  const countMap = new Map<string, number>();
  for (const row of counts) {
    const country = resolveCountry(row.countrySlug);
    const countrySlug = country?.slug ?? row.countrySlug;
    const citySlug =
      (country ? resolveCity(country, row.citySlug)?.slug : undefined) ?? row.citySlug;
    countMap.set(`${countrySlug}/${citySlug}`, row.count);
  }

  const countLabel = (count: number) =>
    count === 1
      ? labels.serviceCountOne
      : labels.servicesCount.replace("{count}", String(count));

  const isAr = lang === "ar";

  const cityCards: CityCardData[] = MAIN_CITIES.map((city) => {
    const count = countMap.get(`${city.countrySlug}/${city.slug}`) ?? 0;
    return {
      slug: city.slug,
      href: `${localeBase(lang)}/locations/${city.countrySlug}/${city.slug}`,
      name: isAr ? city.nameAr : city.name,
      countryName: isAr ? city.countryNameAr : city.countryName,
      image: city.image,
      countLabel: count > 0 ? countLabel(count) : undefined,
    };
  });

  return (
    <section id="cities" className="py-24 bg-abBlack border-b border-gray-900 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl text-start">
            <h2 className="text-sm font-bold tracking-widest text-abBlue uppercase mb-2">
              {labels.badge}
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white">{labels.title}</h3>
          </div>
          <div className="mt-6 md:mt-0">
            <Link
              href={`${localeBase(lang)}/locations`}
              className="text-gray-300 font-semibold hover:text-abBlue border-b border-gray-600 hover:border-abBlue pb-1 transition-colors inline-flex items-center text-sm"
            >
              {labels.viewAllCities} <i className="fa-solid fa-arrow-right ml-2 text-xs rtl:rotate-180"></i>
            </Link>
          </div>
        </div>

        {/* Desktop: previous grid layout */}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {cityCards.map((city) => (
            <Link
              key={city.slug}
              href={city.href}
              className="group relative rounded-xl overflow-hidden border border-gray-800 bg-abDarkGray hover:border-abBlue transition-all duration-300 shadow-lg hover:shadow-abBlue/10 flex flex-col"
            >
              <div className="relative h-60 w-full overflow-hidden bg-[#050505]">
                <Image
                  src={city.image}
                  alt={city.name}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20" />

                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-[#111]/85 backdrop-blur-md border border-gray-700/80 text-gray-200 text-[10px] font-semibold tracking-wider px-2.5 py-1 rounded uppercase">
                    {city.countryName}
                  </span>
                </div>

                {city.countLabel && (
                  <div className="absolute top-3 right-3 z-10">
                    <span className="bg-abBlue text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                      {city.countLabel}
                    </span>
                  </div>
                )}

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-10">
                  <div>
                    <h4 className="text-xl sm:text-2xl font-bold text-white group-hover:text-abBlue transition-colors drop-shadow">
                      {city.name}
                    </h4>
                    <p className="text-xs text-gray-400 mt-0.5">{city.countryName}</p>
                  </div>
                  <span className="w-9 h-9 rounded-full bg-[#111]/90 border border-gray-700 flex items-center justify-center text-gray-300 group-hover:border-abBlue group-hover:bg-abBlue group-hover:text-white transition-all duration-300 shadow flex-shrink-0 ml-3">
                    <i className="fa-solid fa-arrow-right text-xs rtl:rotate-180"></i>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Tablet & mobile: carousel slider */}
        <div className="lg:hidden">
          <CitiesCarousel cities={cityCards} />
        </div>
      </div>
    </section>
  );
}
