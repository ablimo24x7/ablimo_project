"use client";

import { useState } from "react";
import Image from "next/image";
import type { Dictionary } from "@/app/[lang]/dictionaries";

const fleetCars = [
  // Sedans
  { image: "/cars/sedans/msc.png", title: "Mercedes S Class", passengers: 3, luggage: 3, category: "sedan" },
  { image: "/cars/sedans/GMC.png", title: "GMC", passengers: 7, luggage: 4, category: "sedan" },
  { image: "/cars/sedans/CADILAC.png", title: "Cadillac", passengers: 7, luggage: 4, category: "sedan" },
  { image: "/cars/sedans/LEXUS.png", title: "Lexus", passengers: 3, luggage: 3, category: "sedan" },
  { image: "/cars/sedans/FAURD TAURUS.png", title: "Ford Taurus", passengers: 3, luggage: 3, category: "sedan" },
  { image: "/cars/sedans/BMW.png", title: "BMW", passengers: 3, luggage: 3, category: "sedan" },

  // SUVs
  { image: "/cars/suvs/CADILAC.png", title: "Cadillac SUV", passengers: 7, luggage: 4, category: "suv" },
  { image: "/cars/suvs/GMC.png", title: "GMC SUV", passengers: 7, luggage: 4, category: "suv" },

  // Vans
  { image: "/cars/vans/HAICE.png", title: "Haice", passengers: 12, luggage: 0, category: "van" },
  { image: "/cars/vans/Sprinter.png", title: "Sprinter", passengers: 14, luggage: 0, category: "van" },
  { image: "/cars/vans/V_Class.png", title: "V Class", passengers: 6, luggage: 6, category: "van" },
  { image: "/cars/vans/STARIA.png", title: "Staria", passengers: 11, luggage: 0, category: "van" },
  { image: "/cars/vans/Maxus.png", title: "Maxus", passengers: 15, luggage: 0, category: "van" },
  { image: "/cars/vans/COASTER.png", title: "Coaster", passengers: 22, luggage: 0, category: "van" },

  // Buses
  { image: "/cars/buses/VIP_Luxury_bus.png", title: "VIP Luxury Bus", passengers: 21, luggage: 25, category: "buses" },
  { image: "/cars/buses/Mid_Size_Bus.png", title: "Mid Size Bus", passengers: 33, luggage: 25, category: "buses" },
  { image: "/cars/buses/King_Long_bus.png", title: "King Long Bus", passengers: 49, luggage: 50, category: "buses" },

  // Golf Vehicles
  { image: "/cars/golf-vehicles/4x4_Golf_Cart_2_seater.png", title: "4x4 Golf Cart 2 Seater", passengers: 2, luggage: 0, category: "golf" },
  { image: "/cars/golf-vehicles/SS-VGC2SA-T01.png", title: "SS-VGC2SA-T01", passengers: 2, luggage: 0, category: "golf" },
  { image: "/cars/golf-vehicles/SS-VGC2SC-T01.png", title: "SS-VGC2SC-T01", passengers: 2, luggage: 0, category: "golf" },
  { image: "/cars/golf-vehicles/SS-VGC2SC-T02.png", title: "SS-VGC2SC-T02", passengers: 2, luggage: 0, category: "golf" },
  { image: "/cars/golf-vehicles/SS-VGC2SL-T01.png", title: "SS-VGC2SL-T01", passengers: 2, luggage: 0, category: "golf" },
  { image: "/cars/golf-vehicles/SS-VGC2SL-T02.png", title: "SS-VGC2SL-T02", passengers: 2, luggage: 0, category: "golf" },
  { image: "/cars/golf-vehicles/SS-VGC4ST-T01.png", title: "SS-VGC4ST-T01", passengers: 4, luggage: 0, category: "golf" },
  { image: "/cars/golf-vehicles/SS-VGC4ST-T02.png", title: "SS-VGC4ST-T02", passengers: 4, luggage: 0, category: "golf" },
  { image: "/cars/golf-vehicles/SS-VGC6ST-T01.png", title: "SS-VGC6ST-T01", passengers: 6, luggage: 0, category: "golf" },
  { image: "/cars/golf-vehicles/SS-VGC6ST-T02.png", title: "SS-VGC6ST-T02", passengers: 6, luggage: 0, category: "golf" },
];

export default function FleetSection({ dict }: { dict: Dictionary }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const fleet = dict.home.fleet;

  const filters = [
    { label: fleet.filters.all, value: "all" },
    { label: fleet.filters.sedan, value: "sedan" },
    { label: fleet.filters.suv, value: "suv" },
    { label: fleet.filters.van, value: "van" },
    { label: fleet.filters.buses, value: "buses" },
    { label: fleet.filters.golf, value: "golf" },
  ];

  const filteredCars = activeFilter === "all"
    ? fleetCars
    : fleetCars.filter((car) => car.category === activeFilter);

  return (
    <section className="bg-[#1c1d21] py-20 px-8 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">{fleet.title}</h2>
        <p className="text-center text-gray-400 mb-12">{fleet.subtitle}</p>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-3 py-1.5 sm:px-6 sm:py-2 rounded-full text-xs sm:text-sm font-semibold cursor-pointer transition-all ${activeFilter === filter.value
                ? "bg-white text-black"
                : "bg-[#3e3e48] hover:bg-gray-600 text-white"
                }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-12">
          {filteredCars.map((car) => (
            <div key={car.title} className="bg-[#3e3e48] p-6 rounded-xl flex flex-col justify-between text-center">
              <div className="h-48 w-full flex items-center justify-center mb-6">
                <Image
                  src={car.image}
                  alt={car.title}
                  width={400}
                  height={200}
                  className="max-h-48 w-auto max-w-full object-contain"
                />
              </div>

              <div>
                <h4 className="text-xl font-bold mb-4">{car.title}</h4>
                <div className="flex justify-center gap-6 text-sm text-gray-300">
                  <span>
                    <svg className="inline-block w-5 h-5 mr-1 fill-current" viewBox="0 0 24 24">
                      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                    </svg>
                    {fleet.passengers}: {car.passengers}
                  </span>
                  <span>
                    <svg className="inline-block w-5 h-5 mr-1 fill-current" viewBox="0 0 24 24">
                      <path d="M20 6h-3V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM9 4h6v2H9V4zm11 15H4V8h16v11z" />
                    </svg>
                    {fleet.luggage}: {car.luggage}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hospitality Note Banner displayed below the category grid */}
        <div className="text-center max-w-4xl mx-auto px-4">
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            {fleet.hospitalityNote}
          </p>
        </div>
      </div>
    </section>
  );
}