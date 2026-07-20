"use client";

import { useState } from "react";
import Image from "next/image";

const fleetCars = [
  {
    image: "/flee-8-min-768x357.png",
    title: "Electric Class",
    passengers: 4,
    luggage: 2,
    category: "suv",
  },
  {
    image: "/flee-9-min-768x357.png",
    title: "The BMW 7 Series Sedan",
    passengers: 4,
    luggage: 3,
    category: "sedan",
  },
  {
    image: "/v-class-768x357.png",
    title: "Mercedes V-Class",
    passengers: 4,
    luggage: 3,
    category: "van",
  },
];

const filters = [
  { label: "Show All", value: "all" },
  { label: "Sedan", value: "sedan" },
  { label: "Suv", value: "suv" },
  { label: "Van", value: "van" },
];

export default function FleetSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredCars =
    activeFilter === "all"
      ? fleetCars
      : fleetCars.filter((car) => car.category === activeFilter);

  return (
    <section className="bg-[#1c1d21] py-20 px-8 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Our Fleet</h2>
<<<<<<< HEAD
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
=======
        <div className="flex flex-nowrap md:justify-center gap-2 mb-8 md:mb-12 overflow-x-auto no-scrollbar scrollbar-none whitespace-nowrap px-4 py-2 w-full max-w-full">
>>>>>>> e2f194d8557d04d4b26f1d14c6d4d09ea63c61f1
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-3 py-1.5 sm:px-6 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeFilter === filter.value
                  ? "bg-white text-black"
                  : "bg-[#3e3e48] hover:bg-gray-600 text-white"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {fleetCars.map((car) => (
            <div
              key={car.title}
              className={`bg-[#3e3e48] p-6 rounded-xl text-center ${
                activeFilter !== "all" && car.category !== activeFilter
                  ? "hidden"
                  : ""
              }`}
            >
              <Image
                src={car.image}
                alt={car.title}
                width={400}
                height={200}
                className="w-full h-auto mb-6 object-contain"
              />
              <h4 className="text-xl font-bold mb-4">{car.title}</h4>
              <div className="flex justify-center gap-6 text-sm text-gray-300">
                <span>👤 Passengers {car.passengers}</span>
                <span>💼 Luggage {car.luggage}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
