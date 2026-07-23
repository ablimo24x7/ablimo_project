"use client";
import Link from "next/link";
import Image from "next/image";
import BookingWidget from "@/components/layout/BookingWidget";
import type { Dictionary } from "@/app/[lang]/dictionaries";

const cityNames: Record<string, string> = {
    dubai: "Dubai",
    "abu-dhabi": "Abu Dhabi",
    sharjah: "Sharjah",
    ajman: "Ajman",
    "ras-al-khaimah": "Ras Al Khaimah",
    riyadh: "Riyadh",
    jeddah: "Jeddah",
    mecca: "Mecca",
    medina: "Medina",
    dammam: "Dammam",
    doha: "Doha",
    "al-khor": "Al Khor",
    lusail: "Lusail",
    manama: "Manama",
    riffa: "Riffa",
    muharraq: "Muharraq",
    kuwait: "Kuwait City",
    hawalli: "Hawalli",
    farwaniya: "Farwaniya",
    muscat: "Muscat",
    salalah: "Salalah",
    sohar: "Sohar",
};

const cityHeroImages: Record<string, string> = {
    dubai: "https://images.unsplash.com/photo-1721170628208-dffed6eb3514?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "abu-dhabi": "https://plus.unsplash.com/premium_photo-1733317416241-d92ba6af4e51?q=80&w=1177&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    sharjah: "https://images.unsplash.com/photo-1566555108172-f8a02274a3d3?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ajman: "https://images.unsplash.com/photo-1706413639793-1ad524e698ae?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "ras-al-khaimah": "https://images.unsplash.com/photo-1611479853417-80d5b7869ddf?q=80&w=1134&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    riyadh: "https://images.unsplash.com/photo-1663900108404-a05e8bf82cda?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    jeddah: "https://images.unsplash.com/photo-1586715065342-98d1f6016fd1?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    mecca: "https://plus.unsplash.com/premium_photo-1697730272061-20ac2c9196c3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    medina: "https://images.unsplash.com/photo-1588513646744-e94675143d6f?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    dammam: "https://images.unsplash.com/photo-1578895101408-1a36b834405b?q=80&w=1095&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    doha: "https://images.unsplash.com/photo-1647252262017-582a7dbb73d0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "al-khor": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1170&auto=format&fit=crop",
    lusail: "https://images.unsplash.com/photo-1728488443267-8340c9a74dcf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    manama: "https://images.unsplash.com/photo-1548755212-2b46ee259868?q=80&w=1170&auto=format&fit=crop",
    riffa: "https://images.unsplash.com/photo-1548755212-2b46ee259868?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    muharraq: "https://images.unsplash.com/photo-1708160603696-4ba7a7c6a96c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    kuwait: "https://images.unsplash.com/photo-1558634742-56096b49522b?q=80&w=1266&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    hawalli: "https://images.unsplash.com/photo-1558634742-56096b49522b?q=80&w=1266&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    farwaniya: "https://images.unsplash.com/photo-1621647017805-7d08d0a38c8a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    muscat: "https://images.unsplash.com/photo-1699855803432-17f4ab468b2d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    salalah: "https://images.unsplash.com/photo-1680181825817-838f9bf98e2b?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    sohar: "https://images.unsplash.com/photo-1680181825817-838f9bf98e2b?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

const sectionImages = {
    gettingAround: "https://plus.unsplash.com/premium_photo-1664303199063-77f22ea1ac45?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Updated to passenger/cab image style
    limousineService: "https://plus.unsplash.com/premium_photo-1723924834561-10c2d05ba92e?q=80&w=1155&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    airportTransfer: "https://plus.unsplash.com/premium_photo-1661507156446-364c353f6799?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

interface Props {
    dict: Dictionary;
    lang: string;
    countrySlug: string;
    citySlug: string;
}

export default function CityDetailClient({ dict, lang, countrySlug, citySlug }: Props) {
    const countrySlugMap: Record<string, string> = {
        ae: "united-arab-emirates",
        sa: "saudi-arabia",
        qa: "qatar",
        bh: "bahrain",
        kw: "kuwait",
        om: "oman",
    };

    const cityName = cityNames[citySlug] || citySlug.toUpperCase();
    const cDict = dict.countries;
    const cityData = (dict as any).cityContent?.[countrySlugMap[countrySlug] || countrySlug]?.[citySlug];

    const heroTitle = `Taxi Alternative ${cityName}`;
    const heroImage = cityHeroImages[citySlug] || cityHeroImages.dubai;

    const gettingAroundTitle = cityData?.gettingAround?.title || `Getting Around in ${cityName}`;
    const gettingAroundDesc = cityData?.gettingAround?.description || `${cityName} is a dynamic and culturally rich destination with plenty to experience. AB.Limo offers an ideal chauffeur service that gets you around in absolute comfort and style, connecting you effortlessly across key districts and landmarks.`;

    const limoTitle = cityData?.limousineService?.title || `Taxi Alternative ${cityName}`;
    const limoDesc = cityData?.limousineService?.description || `Experience a premier alternative to standard taxi queues with our top-quality limousine service in ${cityName}. Hire by the hour to explore local attractions, attend meetings, or enjoy your itinerary seamlessly.`;

    const airportTitle = cityData?.airportTransfer?.title || `${cityName} Airport Transfer`;
    const airportDesc = cityData?.airportTransfer?.description || `Enjoy an efficient and punctual airport transfer service in ${cityName}. Our professional chauffeurs track your flight status, greet you warmly at arrivals, assist with your luggage, and provide a direct, stress-free ride to your destination.`;

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
                <div className="relative w-full h-[260px] sm:h-[340px] md:h-[400px]">
                    <Image
                        src={heroImage}
                        alt={heroTitle}
                        fill
                        sizes="100vw"
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
                            <Link href={`/${lang}/countries`} className="hover:text-white transition-colors">
                                {cDict.breadcrumb.countries}
                            </Link>
                            <span aria-hidden="true">→</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Link href={`/${lang}/countries/${countrySlug}`} className="hover:text-white transition-colors">
                                {countrySlug.toUpperCase()}
                            </Link>
                            <span aria-hidden="true">→</span>
                        </li>
                        <li>
                            <span className="text-white font-medium" aria-current="page">
                                {cityName}
                            </span>
                        </li>
                    </ol>
                </nav>
            </section>

            {/* Feature Cards */}
            <section className="max-w-7xl mx-auto px-8 py-18">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1: Airport Travel */}
                    <div className="bg-[#1c1d21] p-8 rounded-2xl hover:bg-[#2a2c35] transition-colors">
                        <div className="text-gray-400 mb-4">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3">{dict.cityFeatures.airportTravel.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {dict.cityFeatures.airportTravel.description}
                        </p>
                    </div>

                    {/* Card 2: Competitive Rates */}
                    <div className="bg-[#1c1d21] p-8 rounded-2xl hover:bg-[#2a2c35] transition-colors">
                        <div className="text-gray-400 mb-4">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3">{dict.cityFeatures.competitiveRates.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {dict.cityFeatures.competitiveRates.description}
                        </p>
                    </div>

                    {/* Card 3: Safety First */}
                    <div className="bg-[#1c1d21] p-8 rounded-2xl hover:bg-[#2a2c35] transition-colors">
                        <div className="text-gray-400 mb-4">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3">{dict.cityFeatures.safetyFirst.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {dict.cityFeatures.safetyFirst.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* Getting Around Section */}
            <section className="max-w-7xl mx-auto px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="relative h-[350px] sm:h-[450px] rounded-2xl overflow-hidden">
                        <Image
                            src={sectionImages.gettingAround}
                            alt={gettingAroundTitle}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                        />
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-3xl font-serif font-bold text-white tracking-tight">
                            {gettingAroundTitle}
                        </h2>
                        <p className="text-gray-300 text-[16px] leading-relaxed">
                            {gettingAroundDesc}
                        </p>
                    </div>
                </div>
            </section>

            {/* Limousine Service Section */}
            <section className="max-w-7xl mx-auto px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 order-2 lg:order-1">
                        <h2 className="text-3xl font-serif font-bold text-white tracking-tight">
                            {limoTitle}
                        </h2>
                        <p className="text-gray-300 text-[16px] leading-relaxed">
                            {limoDesc}
                        </p>
                    </div>
                    <div className="relative h-[350px] sm:h-[450px] rounded-2xl overflow-hidden order-1 lg:order-2">
                        <Image
                            src={sectionImages.limousineService}
                            alt={limoTitle}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Airport Transfer Section */}
            <section className="max-w-7xl mx-auto px-8 py-16 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="relative h-[350px] sm:h-[450px] rounded-2xl overflow-hidden">
                        <Image
                            src={sectionImages.airportTransfer}
                            alt={airportTitle}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                        />
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-3xl font-serif font-bold text-white tracking-tight">
                            {airportTitle}
                        </h2>
                        <p className="text-gray-300 text-[16px] leading-relaxed">
                            {airportDesc}
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}