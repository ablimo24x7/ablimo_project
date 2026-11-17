import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { localeBase } from "@/app/[lang]/dictionaries";

const images = [
  "/services/airport-transfers.jpg",
  "/services/corporate-transportation.jpg",
  "/services/event-transportation.jpg",
];

const serviceHrefs = [
  "/services/airport-transfers",
  "/services/corporate-transportation",
  "/services/event-transportation",
];

export default function ServicesSection({ dict, lang = "en" }: { dict: Dictionary; lang?: string }) {
  const services = dict.home.services.items;
  const base = localeBase(lang);

  return (
    <section className="bg-[#1c1d21] py-20 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {services.map((service, i) => {
          const href = `${base}${serviceHrefs[i] || "/services"}`;
          return (
            <div
              key={service.title}
              className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-center lg:items-start text-center lg:text-left group"
            >
              <Link
                href={href}
                className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-700 block transition-transform group-hover:scale-105"
              >
                <Image
                  src={images[i] || "/services/airport-transfers.jpg"}
                  alt={service.title}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </Link>
              <div className="flex flex-col gap-2 min-w-0">
                <Link href={href}>
                  <h3 className="text-white font-bold text-xl flex items-center justify-center lg:justify-start gap-2 cursor-pointer hover:text-abBlue transition-colors lg:whitespace-nowrap">
                    {service.title} &rarr;
                  </h3>
                </Link>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
