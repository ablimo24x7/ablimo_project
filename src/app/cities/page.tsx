"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Har city ke sath uski apni specific image ka data structure
const citiesByCountry: { 
  country: string; 
  code: string; 
  cities: { name: string; image: string }[] 
}[] = [
  {
    country: "Australia",
    code: "au",
    cities: [
      { name: "Sydney", image: "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?q=80&w=1633&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Melbourne", image: "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=400&h=300&fit=crop" },
      { name: "Brisbane", image: "https://images.unsplash.com/photo-1548661625-a30d197ce439?q=80&w=1033&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Perth", image: "https://images.unsplash.com/photo-1580014942344-ce423d2b885a?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  },
  {
    country: "Austria",
    code: "at",
    cities: [
      { name: "Vienna", image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Salzburg", image: "https://images.unsplash.com/photo-1603892710963-331039c8dc66?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  },
  {
    country: "Belgium",
    code: "be",
    cities: [
      { name: "Brussels", image: "https://images.unsplash.com/photo-1626013969117-8c13864fdb2d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  },
  {
    country: "Canada",
    code: "ca",
    cities: [
      { name: "Toronto", image: "https://images.unsplash.com/photo-1490623970972-ae8bb3da443e?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Vancouver", image: "https://images.unsplash.com/photo-1730661906876-18bfc6e95f2f?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Montreal", image: "https://images.unsplash.com/photo-1519178251-5390a0fb6a3f?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Calgary", image: "https://images.unsplash.com/photo-1563772770586-c4edcb11e75d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  },
  {
    country: "France",
    code: "fr",
    cities: [
      { name: "Paris", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop" },
      { name: "Lyon", image: "https://images.unsplash.com/photo-1697054601740-dfa28d40c76e?q=80&w=775&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Nice", image: "https://images.unsplash.com/photo-1643914729809-4aa59fdc4c17?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Marseille", image: "https://images.unsplash.com/photo-1566838217578-1903568a76d9?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Bordeaux", image: "https://images.unsplash.com/photo-1509636902752-929c7497f3d4?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Cannes", image: "https://images.unsplash.com/photo-1659642081573-ac1a040d2e50?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  },
  {
    country: "Germany",
    code: "de",
    cities: [
      { name: "Berlin", image: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Munich", image: "https://images.unsplash.com/photo-1595867818082-083862f3d630?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Frankfurt", image: "https://images.unsplash.com/photo-1605186620429-1ece911f171c?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Hamburg", image: "https://images.unsplash.com/photo-1473615695634-d284ec918736?q=80&w=928&auto=format&fit=crop" },
      { name: "Cologne", image: "https://images.unsplash.com/photo-1722722864801-962b94fbb715?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Dusseldorf", image: "https://images.unsplash.com/photo-1600081926664-b4224c1abc0d?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Stuttgart", image: "https://images.unsplash.com/photo-1722722835129-62f50e5f6389?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  },
  {
    country: "Italy",
    code: "it",
    cities: [
      { name: "Rome", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=300&fit=crop" },
      { name: "Milan", image: "https://images.unsplash.com/photo-1610016302534-6f67f1c968d8?q=80&w=775&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Florence", image: "https://images.unsplash.com/photo-1476362174823-3a23f4aa6d76?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Venice", image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Naples", image: "https://images.unsplash.com/photo-1581242125825-f9faf0f350bd?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  },
  {
    country: "Japan",
    code: "jp",
    cities: [
      { name: "Tokyo", image: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Osaka", image: "https://images.unsplash.com/photo-1589452271712-64b8a66c7b71?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  },
  {
    country: "Netherlands",
    code: "nl",
    cities: [
      { name: "Amsterdam", image: "https://images.unsplash.com/photo-1547750341-26482cf3a2ac?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  },
  {
    country: "Qatar",
    code: "qa",
    cities: [
      { name: "Doha", image: "https://images.unsplash.com/photo-1647252262017-582a7dbb73d0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  },
  {
    country: "Saudi Arabia",
    code: "sa",
    cities: [
      { name: "Riyadh", image: "https://images.unsplash.com/photo-1663900108404-a05e8bf82cda?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Jeddah", image: "https://images.unsplash.com/photo-1674979724572-c0a0579bc9d0?q=80&w=773&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Mecca", image: "https://images.unsplash.com/photo-1704104501136-8f35402af395?q=80&w=749&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  },
  {
    country: "Singapore",
    code: "sg",
    cities: [
      { name: "Singapore", image: "https://images.unsplash.com/photo-1542114740389-9b46fb1e5be7?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  },
  {
    country: "Spain",
    code: "es",
    cities: [
      { name: "Barcelona", image: "https://images.unsplash.com/photo-1578912996078-305d92249aa6?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Madrid", image: "https://images.unsplash.com/photo-1543785734-4b6e564642f8?w=400&h=300&fit=crop" },
      { name: "Malaga", image: "https://images.unsplash.com/photo-1553775556-80669b94bfa5?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  },
  {
    country: "Switzerland",
    code: "ch",
    cities: [
      { name: "Zurich", image: "https://images.unsplash.com/photo-1620563092215-0fbc6b55cfc5?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Geneva", image: "https://images.unsplash.com/photo-1574904935745-7e40279f589d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Basel", image: "https://images.unsplash.com/photo-1657123843551-3417f3057d2c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  },
  {
    country: "UAE",
    code: "ae",
    cities: [
      { name: "Dubai", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop" },
      { name: "Abu Dhabi", image: "https://images.unsplash.com/photo-1590822067318-d58785999ad3?q=80&w=732&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  },
  {
    country: "UK",
    code: "uk",
    cities: [
      { name: "London", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop" },
      { name: "Manchester", image: "https://images.unsplash.com/photo-1692968678752-3f24021a188e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Birmingham", image: "https://images.unsplash.com/photo-1668998909685-f23656e70eb9?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Edinburgh", image: "https://images.unsplash.com/photo-1567802942109-0a5d92ed35b8?q=80&w=811&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Glasgow", image: "https://images.unsplash.com/photo-1590392452359-4c6581f6eac5?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Bristol", image: "https://images.unsplash.com/photo-1667017898252-10a7894b428e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Leeds", image: "https://images.unsplash.com/photo-1610704645600-014521c9c10d?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Liverpool", image: "https://images.unsplash.com/photo-1726410238762-2388af04eadb?q=80&w=943&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  },
  {
    country: "US",
    code: "us",
    cities: [
      { name: "New York", image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=400&h=300&fit=crop" },
      { name: "Los Angeles", image: "https://images.unsplash.com/photo-1570658379397-89d15db1b0de?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Miami", image: "https://images.unsplash.com/photo-1574167701654-856d6406583e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Chicago", image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=944&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "San Francisco", image: "https://images.unsplash.com/photo-1719858403364-83f7442a197e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Boston", image: "https://images.unsplash.com/photo-1565127803082-69dd82351360?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Seattle", image: "https://images.unsplash.com/photo-1589481169991-40ee02888551?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Dallas", image: "https://images.unsplash.com/photo-1652928417129-e058a89673ca?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Houston", image: "https://images.unsplash.com/photo-1622007151631-25aa98ab394b?q=80&w=891&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { name: "Washington DC", image: "https://images.unsplash.com/photo-1574365379583-54937ea00cb8?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
  },
].sort((a, b) => a.country.localeCompare(b.country));

function cityToSlug(city: string): string {
  return city.toLowerCase().replace(/\s+/g, "-");
}

export default function CitiesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCountries = citiesByCountry
    .map((country) => ({
      ...country,
      cities: country.cities.filter((cityObj) =>
        cityObj.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((country) => country.cities.length > 0);

  const totalCities = citiesByCountry.reduce(
    (acc, country) => acc + country.cities.length,
    0
  );

  return (
    <main className="min-h-screen bg-[#292a30] text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&h=800&fit=crop"
          alt="Our Cities Around the World"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#292a30]" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Our Cities Around the World
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Premium chauffeur service in {totalCities}+ cities across the globe
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-[#292a30] px-8 py-3 text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
          >
            Book Now
          </Link>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-8 py-6">
        <nav className="text-sm text-gray-400">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">Cities</span>
        </nav>
      </div>

      {/* Search Input */}
      <section className="max-w-7xl mx-auto px-8 pb-8">
        <div className="relative max-w-md">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search cities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1c1d21] border border-gray-700/50 rounded-full pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white/50 transition-colors"
          />
        </div>
      </section>

      {/* Cities by Country */}
      <section className="max-w-7xl mx-auto px-8 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Cities we serve
        </h2>
        <p className="text-gray-400 mb-12">
          Explore our network of premium chauffeur services by destination
        </p>

        {filteredCountries.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No cities found matching &ldquo;{searchQuery}&rdquo;</p>
          </div>
        ) : (
          <div className="space-y-12">
            {filteredCountries.map((country) => (
              <div key={country.code}>
                <div className="flex items-center gap-3 mb-6">
                  <h3 className="text-xl font-bold text-white">
                    {country.country}
                  </h3>
                  <span className="text-sm text-gray-500 font-medium">
                    {country.cities.length} {country.cities.length === 1 ? "city" : "cities"}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {country.cities.map((cityObj) => (
                    <Link
                      key={cityObj.name}
                      href={`/countries/${country.code}/${cityToSlug(cityObj.name)}/airport-transfer`}
                      className="group relative bg-[#1c1d21] border border-gray-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center hover:border-gray-600 transition-all duration-300 overflow-hidden min-h-[140px]"
                    >
                      {/* Har City ki Apni Background Image aur Dark Overlay */}
                      <div className="absolute inset-0 z-0">
                        <Image
                          src={cityObj.image}
                          alt={cityObj.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-40 group-hover:opacity-50"
                        />
                        <div className="absolute inset-0 bg-[#1c1d21]/5 backdrop-blur-[1px]" />
                      </div>

                      {/* Card Content */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full border border-gray-600/60 bg-[#292a30]/80 flex items-center justify-center text-xs font-bold text-gray-200 tracking-wider mb-2.5 group-hover:border-white transition-colors">
                          {country.code.toUpperCase()}
                        </div>
                        <h4 className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">
                          {cityObj.name}
                        </h4>
                        <p className="text-[11px] text-gray-400 mt-0.5 group-hover:text-gray-300 transition-colors">
                          Airport Transfer
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-[#1c1d21] py-20 px8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Can&apos;t find your city?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            We&apos;re constantly expanding our network. Contact us to request service in a new city, or browse our available countries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/countries"
              className="inline-block bg-white text-[#292a30] px-8 py-3 text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
            >
              View All Countries
            </Link>
            <Link
              href="/"
              className="inline-block border border-white text-white px-8 py-3 text-sm font-semibold rounded-full hover:bg-white hover:text-[#292a30] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}