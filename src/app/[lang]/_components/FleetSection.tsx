"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { Dictionary, localeBase } from "@/app/[lang]/dictionaries";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const vehicles = [
  {
    badgeStyle: "bg-[#111] border border-gray-700 text-white",
    image: "/cars/sedans/msc.png",
    paxIcon: "fa-solid fa-user-tie",
    accentColor: "abBlue",
    hoverBorder: "hover:border-abBlue",
    subtitleColor: "text-abBlue",
    buttonHover: "group-hover:border-abBlue",
  },
  {
    badgeStyle: "bg-[#111] border border-gray-700 text-white",
    image: "/cars/suvs/CADILAC.png",
    paxIcon: "fa-solid fa-user-tie",
    accentColor: "abBlue",
    hoverBorder: "hover:border-abBlue",
    subtitleColor: "text-abBlue",
    buttonHover: "group-hover:border-abBlue",
  },
  {
    badgeStyle: "bg-[#111] border border-gray-700 text-white shadow",
    image: "/cars/vans/Sprinter.png",
    paxIcon: "fa-solid fa-users",
    accentColor: "abBlue",
    hoverBorder: "hover:border-abBlue",
    subtitleColor: "text-abBlue",
    buttonHover: "group-hover:border-abBlue",
  },
  {
    badgeStyle: "bg-[#111] border border-gray-700 text-white shadow",
    image: "/cars/vans/V_Class.png",
    paxIcon: "fa-solid fa-users-viewfinder",
    accentColor: "abBlue",
    hoverBorder: "hover:border-abBlue",
    subtitleColor: "text-abBlue",
    buttonHover: "group-hover:border-abBlue",
  },
];

interface ShowcaseVehicle {
  badge: string;
  title: string;
  subtitle: string;
  pax: string;  
  bags: string;
  image?: string;
}

/**
 * One slide per fleet vehicle. The card text always starts with the vehicle
 * category (badge + title), the blue subtitle names the actual vehicle.
 * Cards without an `image` render a placeholder — add the image and set it here.
 */
const showcaseVehicles: ShowcaseVehicle[] = [
  // ── First Class Business Sedan ──
  {
    badge: "First Class Business Sedan",
    title: "First Class Business Sedan",
    subtitle: "Mercedes S Class",
    pax: "3 Pax",
    bags: "2 Bags",
    image: "/cars/sedans/msc.png",
  },
  {
    badge: "First Class Business Sedan",
    title: "First Class Business Sedan",
    subtitle: "BMW 7 Series",
    pax: "3 Pax",
    bags: "2 Bags",
    image: "/cars/sedans/BMW.png",
  },
  // ── Executive Business Sedan ──
  {
    badge: "Executive Business Sedan",
    title: "Executive Business Sedan",
    subtitle: "Lexus ES 350",
    pax: "3 Pax",
    bags: "2 Bags",
    image: "/cars/sedans/LEXUS.png",
  },
  // ── Standard Sedan ──
  {
    badge: "Standard Sedan",
    title: "Standard Sedan",
    subtitle: "Ford Taurus",
    pax: "3 Pax",
    bags: "2 Bags",
    image: "/cars/sedans/FAURD TAURUS.png",
  },
  {
    badge: "Standard Sedan",
    title: "Standard Sedan",
    subtitle: "BYD Seal 7",
    pax: "3 Pax",
    bags: "2 Bags",
    image: "/cars/sedans/BYD_Seal-7.png",
  },
  // ── Standard SUV ──
  {
    badge: "Standard SUV",
    title: "Standard SUV",
    subtitle: "Mitsubishi Outlander",
    pax: "5 Pax",
    bags: "4 Bags",
    image: "/cars/suvs/Mitsubishi_Outlander.png",
  },
  // ── Business SUV ──
  {
    badge: "Business SUV",
    title: "Business SUV",
    subtitle: "GMC Yukon",
    pax: "7 Pax",
    bags: "6 Bags",
    image: "/cars/suvs/GMC.png",
  },
  {
    badge: "Business SUV",
    title: "Business SUV",
    subtitle: "Chevrolet Tahoe",
    pax: "7 Pax",
    bags: "6 Bags",
    image: "/cars/suvs/CHEVROLET.png",
  },
  // ── First Class SUV ──
  {
    badge: "First Class SUV",
    title: "First Class SUV",
    subtitle: "Cadillac Escalade",
    pax: "6 Pax",
    bags: "5 Bags",
    image: "/cars/suvs/CADILAC.png",
  },
  // ── Premium Minivan ──
  {
    badge: "Premium Minivan",
    title: "Premium Minivan",
    subtitle: "Mercedes V Class",
    pax: "7 Pax",
    bags: "5 Bags",
    image: "/cars/vans/V_Class.png",
  },
  // ── Executive Minivan ──
  {
    badge: "Executive Minivan",
    title: "Executive Minivan",
    subtitle: "Hyundai Staria",
    pax: "8 Pax",
    bags: "6 Bags",
    image: "/cars/vans/STARIA.png",
  },
  {
    badge: "Executive Minivan",
    title: "Executive Minivan",
    subtitle: "Kia Carnival",
    pax: "8 Pax",
    bags: "6 Bags",
    image: "/cars/suvs/Kia_Carnival-minivan.png",
  },
  // ── Luxury Sprinters ──
  {
    badge: "Luxury Sprinters",
    title: "Luxury Sprinters",
    subtitle: "Mercedes Sprinter",
    pax: "12 Pax",
    bags: "10 Bags",
    image: "/cars/vans/Sprinter.png",
  },
  // ── Mini Bus (20 to 25 Seater) ──
  {
    badge: "Mini Bus (20 to 25 Seater)",
    title: "Mini Bus (20 to 25 Seater)",
    subtitle: "Maxus V90",
    pax: "20–25 Pax",
    bags: "15 Bags",
    image: "/cars/vans/Maxus.png",
  },
  {
    badge: "Mini Bus (20 to 25 Seater)",
    title: "Mini Bus (20 to 25 Seater)",
    subtitle: "Toyota Hiace",
    pax: "20–25 Pax",
    bags: "15 Bags",
    image: "/cars/vans/HAICE.png",
  },
  // ── Mini Coach Bus (31 to 35 Seater) ──
  {
    badge: "Mini Coach Bus (31 to 35 Seater)",
    title: "Mini Coach Bus (31 to 35 Seater)",
    subtitle: "Toyota Coaster",
    pax: "31–35 Pax",
    bags: "20 Bags",
    image: "/cars/vans/COASTER.png",
  },
  {
    badge: "Mini Coach Bus (31 to 35 Seater)",
    title: "Mini Coach Bus (31 to 35 Seater)",
    subtitle: "Mid Size Bus",
    pax: "31–35 Pax",
    bags: "20 Bags",
    image: "/cars/buses/Mid_Size_Bus.png",
  },
  {
    badge: "Mini Coach Bus (31 to 35 Seater)",
    title: "Mini Coach Bus (31 to 35 Seater)",
    subtitle: "Ankai Coster",
    pax: "31–35 Pax",
    bags: "20 Bags",
    image: "/cars/buses/Ankai-Coster.png",
  },
  // ── Luxury Coaches (43 to 49 Seater) ──
  {
    badge: "Luxury Coaches (43 to 49 Seater)",
    title: "Luxury Coaches (43 to 49 Seater)",
    subtitle: "King Long Bus",
    pax: "43–49 Pax",
    bags: "30 Bags",
    image: "/cars/buses/King_Long_bus.png",
  },
  {
    badge: "Luxury Coaches (43 to 49 Seater)",
    title: "Luxury Coaches (43 to 49 Seater)",
    subtitle: "VIP Luxury Bus",
    pax: "43–49 Pax",
    bags: "30 Bags",
    image: "/cars/buses/VIP_Luxury_bus.png",
  },
];

export default function FleetSection({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: string;
}) {
  const [autoplay] = useState(() =>
    Autoplay({
      delay: 2000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  return (
    <section id="fleet" className="py-24 bg-[#0a0a0a] border-b border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold tracking-widest text-abBlue uppercase mb-2">{dict.home.fleetSection.badge}</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white">{dict.home.fleetSection.title}</h3>
            <p className="mt-4 text-gray-400">{dict.home.fleetSection.desc}</p>
          </div>
          <div className="mt-6 md:mt-0">
            <Link href={`${localeBase(lang)}/fleet`} className="text-gray-300 font-semibold hover:text-abBlue border-b border-gray-600 hover:border-abBlue pb-1 transition-colors inline-flex items-center text-sm">
              {dict.home.fleetSection.link} <i className="fa-solid fa-arrow-right ml-2 text-xs"></i>
            </Link>
          </div>
        </div>

        <Carousel
          opts={{ align: "start", slidesToScroll: 1, loop: true }}
          plugins={[autoplay]}
          className="w-full"
        >
          <CarouselContent className="-ml-6">
            {showcaseVehicles.map((vehicle, i) => {
              const style = vehicles[i % vehicles.length];
              return (
                <CarouselItem
                  key={vehicle.subtitle}
                  className="pl-6 basis-full md:basis-1/3 xl:basis-1/4"
                >
                  <div className={`bg-abDarkGray rounded-xl border border-gray-800 overflow-hidden ${style.hoverBorder} transition-colors group h-full relative`}>
                    <div className="bg-[#050505] h-48 flex items-center justify-center p-4 relative border-b border-gray-900">
                      <div className={`absolute top-4 left-4 ${style.badgeStyle} text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded z-10`}>
                        {vehicle.badge}
                      </div>
                      {vehicle.image ? (
                        <Image
                          src={vehicle.image}
                          alt={vehicle.subtitle}
                          width={400}
                          height={200}
                          className="w-full object-contain group-hover:scale-105 transition-transform relative z-0"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-2 text-gray-700 group-hover:text-gray-600 transition-colors relative z-0">
                          <i className="fa-solid fa-car-side text-5xl"></i>
                          <span className="text-[10px] font-bold uppercase tracking-wider">
                            Image Coming Soon
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h4 className="text-lg font-bold text-white mb-1 line-clamp-2 min-h-[3.5rem]">{vehicle.title}</h4>
                      <p className={`text-sm ${style.subtitleColor} font-medium mb-4 line-clamp-2 min-h-[2.5rem]`}>{vehicle.subtitle}</p>
                      <div className="flex justify-between items-center text-xs text-gray-500 border-t border-gray-800 pt-4">
                        <span className="flex items-center"><i className={`${style.paxIcon} mr-1.5 text-gray-400`}></i> {vehicle.pax}</span>
                        <span className="flex items-center"><i className="fa-solid fa-suitcase mr-1.5 text-gray-400"></i> {vehicle.bags}</span>
                      </div>
                    </div>
                    <div className="pointer-events-none absolute inset-0 z-10  transition-opacity duration-300 group-hover:opacity-100"></div>
                    <div className="absolute inset-x-0 bottom-0 z-20 p-4 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <Link href={`${localeBase(lang)}/contact`} className={`block w-full text-center bg-[#111] hover:bg-[#1a1a1a] text-white text-xs font-semibold py-2.5 rounded transition-colors border border-gray-700 ${style.buttonHover}`}>Request Allocation</Link>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
