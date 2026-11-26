"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

export type CountryCardItem = {
  slug: string;
  href: string;
  name: string;
  image: string;
  services: number;
  cities: number;
  label: string;
};

const accentClasses = [
  "hover:border-abBlue",
  "hover:border-abBlue",
  "hover:border-abBlue",
  "hover:border-abBlue",
  "hover:border-abBlue",
  "hover:border-abBlue",
];

export default function CountriesCarousel({
  items,
  lang = "en-US",
}: {
  items: CountryCardItem[];
  lang?: string;
}) {
  const [autoplay] = useState(() =>
    Autoplay({
      delay: 2000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  return (
    <Carousel
      opts={{
        align: "start",
        slidesToScroll: 1,
        loop: true,
        // Embla lays out and snaps LTR by default; flip the axis for Arabic so
        // slides advance in the reading direction.
        direction: lang === "ar" ? "rtl" : "ltr",
      }}
      plugins={[autoplay]}
      className="w-full"
    >
      <CarouselContent className="-ms-6">
        {items.map((item, i) => (
          <CarouselItem
            key={item.slug}
            className="ps-6 basis-[85%] sm:basis-[48%] md:basis-[31.5%] lg:basis-1/4"
          >
            <Link
              href={item.href}
              className={`group block h-full bg-abDarkGray rounded-xl border border-gray-800 overflow-hidden ${accentClasses[i % accentClasses.length]} transition-colors`}
            >
              <div className="relative h-44 overflow-hidden bg-[#050505] border-b border-gray-900">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 85vw, (max-width: 768px) 48vw, (max-width: 1024px) 31.5vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {item.label && (
                  <span className="absolute top-3 start-3 bg-[#111] border border-gray-700 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded z-10">
                    {item.label}
                  </span>
                )}
              </div>
              <div className="p-5">
                <h4 className="text-lg font-bold text-white group-hover:text-abBlue transition-colors">
                  {item.name}
                </h4>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
