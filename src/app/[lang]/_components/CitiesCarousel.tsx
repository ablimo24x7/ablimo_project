"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

export interface CityCardData {
  slug: string;
  href: string;
  name: string;
  countryName: string;
  image: string;
  countLabel?: string;
}

export default function CitiesCarousel({ cities }: { cities: CityCardData[] }) {
  const [autoplay] = useState(() =>
    Autoplay({
      delay: 2000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  return (
    <Carousel
      opts={{ align: "start", slidesToScroll: 1, loop: true }}
      plugins={[autoplay]}
      className="w-full"
    >
      <CarouselContent className="-ml-6">
        {cities.map((city) => (
          <CarouselItem
            key={city.slug}
            className="pl-6 basis-full sm:basis-1/2 lg:basis-1/3"
          >
            <Link
              href={city.href}
              className="group relative rounded-xl overflow-hidden border border-gray-800 bg-abDarkGray hover:border-abBlue transition-all duration-300 shadow-lg hover:shadow-abBlue/10 flex flex-col h-full"
            >
              <div className="relative h-60 w-full overflow-hidden bg-[#050505]">
                <Image
                  src={city.image}
                  alt={city.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
