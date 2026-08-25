"use client";

import Link from "next/link";
import Image from "next/image";
import BookingWidget from "@/components/layout/BookingWidget";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import {
    airportUrl,
    cityUrl,
    cityNameBySlug,
    locationsUrl,
    resolveCity,
    routeSlugOf,
    routeUrl,
    routesForCountry,
    type Country,
} from "@/lib/locations";

const countryHeroImages: Record<string, string> = {
    bh: "https://images.unsplash.com/photo-1547548731-e95343697eb4?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    kw: "https://plus.unsplash.com/premium_photo-1661963334316-e7f118aaae75?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    om: "https://images.unsplash.com/photo-1621680696874-edd80ce57b72?q=80&w=1291&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    qa: "https://plus.unsplash.com/premium_photo-1661919068698-40e7b78f196a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    sa: "https://images.unsplash.com/photo-1663900108404-a05e8bf82cda?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ae: "https://images.unsplash.com/flagged/photo-1559717865-a99cac1c95d8?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

const featureIcons = [
    <svg key="globe" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
    <svg key="clock" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
    <svg key="currency" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
];

interface Props {
    dict: Dictionary;
    lang: string;
    country: Country;
}

export default function CountryDetailClient({ dict, lang, country }: Props) {
    const countryName = country.name;
    const cDict = dict.countries;
    const detail = cDict.detail;
    const heroTitle = detail.heroTitle.replace("{country}", countryName);
    const heroImage = countryHeroImages[country.code] || countryHeroImages.ae;
    const routes = routesForCountry(country);
    const citiesWithAirports = country.cities.filter((c) => c.airports.length > 0);

    return (
        <main className="min-h-screen bg-[#292a30] text-white">
            {/* Top Page Heading */}
            <div className="max-w-7xl mx-auto px-8 pt-2 pb-4">
                <h1 className="text-3xl md:text-4xl font-serif text-white">
                    {heroTitle}
                </h1>
            </div>

            {/* Responsive Hero & Booking Widget Block */}
            <section className="relative w-full">
                {/* Hero Banner Image */}
                <div className="relative w-full h-[260px] sm:h-[340px] sm:w-full md:h-[400px] md:w-full">
                    <Image
                        src={heroImage}
                        alt={heroTitle}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/20" />
                </div>

                {/* Desktop Booking Widget */}
                <div className="absolute inset-0 overflow-visible hidden xl:block">
                    <div className="max-w-7xl mx-auto h-full px-8 relative flex justify-end">
                        <div className="w-full max-w-md -mt-14 z-10">
                            <BookingWidget dict={dict} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Tablet & Mobile Booking Widget */}
            <div className="block xl:hidden max-w-7xl mx-auto px-8 pt-6">
                <BookingWidget
                    dict={dict}
                    className="w-full max-w-none"
                />
            </div>

            {/* Breadcrumb Navigation */}
            <section className="max-w-7xl mx-auto px-8 pt-16 pb-8">
                <nav aria-label="Breadcrumb navigation" className="flex justify-center">
                    <ol className="flex items-center justify-center gap-2 text-sm text-gray-400 flex-wrap text-center">
                        <li className="flex items-center gap-2">
                            <Link href={`/${lang}`} className="hover:text-white transition-colors">
                                {cDict.breadcrumb.home}
                            </Link>
                            <span aria-hidden="true">→</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Link href={locationsUrl(lang)} className="hover:text-white transition-colors">
                                {cDict.breadcrumb.countries}
                            </Link>
                            <span aria-hidden="true">→</span>
                        </li>
                        <li>
                            <span className="text-white font-medium" aria-current="page">
                                {heroTitle}
                            </span>
                        </li>
                    </ol>
                </nav>
            </section>

            {/* Feature Cards */}
            <section className="max-w-7xl mx-auto px-8 py-18">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {dict.countries.features.map((feature, index) => (
                        <div
                            key={feature.title}
                            className="bg-[#1c1d21] p-8 rounded-2xl hover:bg-[#2a2c35] transition-colors"
                        >
                            <div className="text-gray-400 mb-4">{featureIcons[index]}</div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Intro & Links Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-10 space-y-6">
                <p className="text-gray-300 text-[16px] leading-relaxed">
                    {detail.intro.replace("{country}", countryName)}
                </p>

                <p className="text-gray-300 text-[16px] leading-relaxed">
                    {detail.subIntro}
                </p>

                <p className="text-gray-300 text-[16px] leading-relaxed pb-4">
                    {detail.rangeHeading.replace("{country}", countryName)}
                </p>

                {/* 1. Cities Section */}
                <div className="space-y-3 pt-2">
                    <h2 className="text-3xl font-serif font-bold text-white tracking-tight">
                        {detail.citiesHeading}
                    </h2>
                    <ul className="list-disc list-inside space-y-2 text-[16px] pl-2">
                        {country.cities.map((cityObj) => (
                            <li key={cityObj.slug} className="text-white">
                                <Link
                                    href={cityUrl(lang, country, cityObj)}
                                    className="font-bold underline underline-offset-4 hover:text-gray-300 transition-colors"
                                >
                                    {detail.cityServiceSuffix.replace("{city}", cityObj.name)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 2. Airport Transfer Section */}
                <div className="space-y-3 pt-6">
                    <h2 className="text-3xl font-serif font-bold text-white tracking-tight">
                        {detail.airportTransferHeading}
                    </h2>
                    <ul className="list-disc list-inside space-y-2 text-[16px] pl-2">
                        {citiesWithAirports.flatMap((cityObj) =>
                            cityObj.airports.map((airport) => (
                                <li key={airport.slug}>
                                    <Link
                                        href={airportUrl(lang, country, cityObj, airport)}
                                        className="font-bold text-white underline underline-offset-4 hover:text-gray-300 transition-colors"
                                    >
                                        {cityObj.name} – {airport.name}
                                    </Link>
                                </li>
                            ))
                        )}
                    </ul>
                </div>

                {/* 3. Limousine Service Section */}
                <div className="space-y-3 pt-6">
                    <h2 className="text-3xl font-serif font-bold text-white tracking-tight">
                        {detail.limousineHeading}
                    </h2>
                    <ul className="list-disc list-inside space-y-2 text-[16px] pl-2">
                        <li>
                            <Link
                                href={`/${lang}/limousine-service`}
                                className="font-bold text-white underline underline-offset-4 hover:text-gray-300 transition-colors"
                            >
                                {detail.limousineLink.replace("{country}", countryName)}
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* 4. City-to-City Service Section */}
                <div className="space-y-3 pt-6">
                    <h2 className="text-3xl font-serif font-bold text-white tracking-tight">
                        City-to-City Service
                    </h2>
                    <ul className="list-disc list-inside space-y-2 text-[16px] pl-2">
                        {routes.length > 0 ? (
                            routes.map((route) => {
                                const originCity = resolveCity(country, route.fromSlug)!;
                                return (
                                    <li key={routeSlugOf(route)}>
                                        <Link
                                            href={routeUrl(lang, country, originCity, route)}
                                            className="font-bold text-white underline underline-offset-4 hover:text-gray-300 transition-colors"
                                        >
                                            {cityNameBySlug(route.fromSlug)} to {cityNameBySlug(route.toSlug)}
                                        </Link>
                                    </li>
                                );
                            })
                        ) : (
                            <li>
                                <Link
                                    href={`/${lang}/city-to-city`}
                                    className="font-bold text-white underline underline-offset-4 hover:text-gray-300 transition-colors"
                                >
                                    {countryName} City-to-City Rides
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </section>
        </main>
    );
}
