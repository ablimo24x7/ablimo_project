export interface AboutContent {
    title: string;
    description: string;
}

const countryAbout: Record<string, AboutContent> = {
    "united-arab-emirates": {
        title: "Chauffeur Excellence Across the Emirates",
        description:
            "The United Arab Emirates is a land of towering ambition — from Dubai's Burj Khalifa to Abu Dhabi's cultural landmarks and the Northern Emirates' natural beauty. AB.Limo is the region's trusted chauffeur partner, delivering premium airport transfers, corporate mobility, and intercity travel across all seven Emirates with professional chauffeurs and an immaculate fleet.",
    },
    "saudi-arabia": {
        title: "Premium Chauffeur Service Across the Kingdom",
        description:
            "Saudi Arabia is transforming at breathtaking speed — from Riyadh's visionary skyline to Jeddah's Red Sea coast and the spiritual journeys of Makkah and Madinah. AB.Limo proudly serves the Kingdom with premium chauffeur service, airport meet-and-greets, and intercity comfort connecting every major city.",
    },
    qatar: {
        title: "Qatar's Trusted Chauffeur Partner",
        description:
            "Qatar pairs Arabian heritage with world-class modernity — Doha's skyline, Lusail's ambition, and the warmth of its people. AB.Limo delivers luxury airport transfers, corporate travel, and event mobility across the peninsula, so every journey matches the standard of the destination.",
    },
    bahrain: {
        title: "Chauffeur Service in the Pearl of the Gulf",
        description:
            "Bahrain — the pearl of the Gulf — blends island charm with financial and cultural dynamism. From Grand Prix weekends to business in Manama, AB.Limo provides polished chauffeur service connecting Bahrain International Airport, hotels, and destinations across the kingdom.",
    },
    kuwait: {
        title: "Executive Chauffeur Service in Kuwait",
        description:
            "Kuwait's rich heritage and modern skyline frame a nation of opportunity. AB.Limo delivers premium chauffeur service from Kuwait International Airport, executive corporate transfers, and comfortable intercity travel across every governorate — with the discretion and professionalism your time deserves.",
    },
    oman: {
        title: "Luxury Chauffeur Service Across Oman",
        description:
            "Oman enchants with wadis, mountains, and timeless hospitality — from Muscat's Grand Mosque to Salalah's monsoon greens. AB.Limo is your trusted chauffeur partner, providing luxury airport transfers, city travel, and intercity journeys across the Sultanate.",
    },
    germany: {
        title: "Executive Chauffeur Service in Germany",
        description:
            "Germany combines precision engineering with rich culture — from Berlin's history to Munich's traditions and Frankfurt's skyline. AB.Limo delivers executive chauffeur service across the country: airport transfers at every major hub, corporate travel, and intercity journeys in premium comfort.",
    },
};

const cityAbout: Record<string, AboutContent> = {
    dubai: {
        title: "Luxury Chauffeur Service in Dubai",
        description:
            "From the shimmering towers of Downtown Dubai to the palms of Jumeirah and the bustling lanes of Deira, AB.Limo keeps you moving in absolute comfort. Our professional chauffeurs know every route, every shortcut, and every landmark — so airport transfers, business meetings, and evenings out feel effortless.",
    },
    "abu-dhabi": {
        title: "First-Class Chauffeur Service in Abu Dhabi",
        description:
            "Home to the Presidential Palace, Yas Island, and the Corniche, Abu Dhabi demands a travel experience to match. AB.Limo delivers discreet, first-class chauffeur service across the capital — from Zayed International Airport arrivals to Al Maryah Island boardrooms.",
    },
    sharjah: {
        title: "Premium Chauffeur Service in Sharjah",
        description:
            "Sharjah — the cultural heart of the Emirates — blends heritage sites with modern business hubs. Whether you're heading to Sharjah International Airport or exploring Al Qasba and the Heart of Sharjah, AB.Limo's chauffeurs ensure every journey is smooth and stylish.",
    },
    ajman: {
        title: "Chauffeur Service in Ajman",
        description:
            "Compact, coastal, and quickly growing, Ajman deserves a travel service that keeps pace. AB.Limo provides premium chauffeur transfers along the Corniche, to Al Zorah, and onward to Dubai and Sharjah airports — always on time, always in style.",
    },
    "ras-al-khaimah": {
        title: "Chauffeur Service in Ras Al Khaimah",
        description:
            "From the adventure peaks of Jebel Jais to the luxury resorts of Al Marjan Island, Ras Al Khaimah is the UAE's rising destination. AB.Limo pairs breathtaking scenery with chauffeur-driven comfort for transfers, tours, and corporate travel.",
    },
    "al-ain": {
        title: "Chauffeur Service in Al Ain",
        description:
            "The Garden City of the Gulf, Al Ain offers oases, mountain drives, and heritage charm. AB.Limo's professional chauffeurs make exploring Al Ain Oasis and Jebel Hafeet — plus transfers to Abu Dhabi or Dubai — an effortless pleasure.",
    },
    riyadh: {
        title: "Executive Chauffeur Service in Riyadh",
        description:
            "Saudi Arabia's powerhouse capital — from King Abdullah Financial District to the Edge of the World — moves fast. AB.Limo keeps you ahead with executive chauffeur service, meet-and-greets at King Khalid International Airport, and intercity comfort to Dammam and Jeddah.",
    },
    jeddah: {
        title: "Premium Chauffeur Service in Jeddah",
        description:
            "Gateway to Makkah and the Red Sea's jewel, Jeddah blends commerce, culture, and coastal elegance. AB.Limo delivers premium chauffeur service from King Abdulaziz International Airport to the Corniche, business districts, and beyond.",
    },
    mecca: {
        title: "Respectful Chauffeur Service in Makkah",
        description:
            "In the holiest city in Islam, every journey carries meaning. AB.Limo provides respectful, reliable chauffeur service for pilgrims and visitors — hotel-to-Haram shuttles, intercity transfers to Madinah, and airport meet-and-greets handled with care.",
    },
    medina: {
        title: "Trusted Chauffeur Service in Madinah",
        description:
            "Madinah's serenity deserves travel to match. AB.Limo offers discreet chauffeur service for Ziyarat tours, hotel transfers, and comfortable journeys to and from Prince Mohammad Bin Abdulaziz International Airport.",
    },
    dammam: {
        title: "Chauffeur Service in Dammam",
        description:
            "On the shores of the Arabian Gulf, Dammam is the Eastern Province's business hub. AB.Limo provides polished chauffeur service from King Fahd International Airport, corporate transfers, and seamless intercity rides to Riyadh and Al Khobar.",
    },
    tabuk: {
        title: "Chauffeur Service in Tabuk",
        description:
            "Northwest Saudi Arabia's rising gateway — Tabuk connects desert adventures, heritage sites, and the NEOM corridor. AB.Limo ensures every transfer, from Tabuk Regional Airport to city destinations, is first-class.",
    },
    "al-ula": {
        title: "Chauffeur Service in AlUla",
        description:
            "A land of ancient wonder — Hegra's sandstone tombs, AlUla Old Town, and dramatic desert landscapes. AB.Limo's chauffeur service lets you soak it all in comfort, from AlUla International Airport to every heritage trail.",
    },
    "al-khobar": {
        title: "Executive Chauffeur Service in Al Khobar",
        description:
            "The Eastern Province's vibrant waterfront city, Al Khobar blends corporate towers with the scenic Corniche. AB.Limo provides executive chauffeur service from King Fahd International Airport, business transfers, and seamless links to Dammam and Bahrain.",
    },
    "al-qasim": {
        title: "Chauffeur Service in Al Qasim",
        description:
            "The fertile heartland of Saudi Arabia — Buraidah, Unayzah, and the date palm plains of Al Qasim — deserves premium travel. AB.Limo delivers professional chauffeur service from Prince Nayef bin Abdulaziz International Airport and across the region.",
    },
    abha: {
        title: "Chauffeur Service in Abha",
        description:
            "High in the Asir Mountains, Abha captivates with cool air, cloud-covered peaks, and rich heritage. AB.Limo's chauffeur service brings comfort to every altitude — airport transfers, Al Soudah excursions, and regional journeys.",
    },
    jizan: {
        title: "Chauffeur Service in Jizan",
        description:
            "Saudi Arabia's southwestern gem — Jizan's coast, islands, and heritage welcome travelers and business alike. AB.Limo provides reliable chauffeur transfers from Jazan Airport, city travel, and connections across the Southwest.",
    },
    neom: {
        title: "Chauffeur Service for the NEOM Era",
        description:
            "The future is rising in the desert — NEOM's The Line, Oxagon, and Trojena redefine what's possible. AB.Limo supports this bold new era with premium chauffeur service for executives, investors, and visitors to the Northwest.",
    },
    doha: {
        title: "Luxury Chauffeur Service in Doha",
        description:
            "Qatar's capital dazzles — from the Museum of Islamic Art to Souq Waqif, The Pearl, and Lusail's skyline. AB.Limo elevates every moment with luxury chauffeur service from Hamad International Airport and across the city.",
    },
    "al-khor": {
        title: "Chauffeur Service in Al Khor",
        description:
            "North of Doha, Al Khor blends coastal charm with industrial ambition. AB.Limo provides seamless chauffeur transfers to Hamad International Airport, city destinations, and the capital — in complete comfort.",
    },
    lusail: {
        title: "Chauffeur Service in Lusail",
        description:
            "Qatar's gleaming metropolis — Lusail's marina, stadium district, and futuristic towers — calls for equally modern travel. AB.Limo delivers first-class chauffeur service from Doha and Hamad International Airport.",
    },
    manama: {
        title: "Premium Chauffeur Service in Manama",
        description:
            "Bahrain's cosmopolitan capital — from the World Trade Center towers to the Formula 1 circuit — thrives on energy. AB.Limo matches it with premium chauffeur service from Bahrain International Airport and across the island.",
    },
    riffa: {
        title: "Chauffeur Service in Riffa",
        description:
            "Bahrain's second city, Riffa, blends royal heritage with modern living. AB.Limo provides polished chauffeur transfers to Bahrain International Airport, Manama, and destinations across the kingdom.",
    },
    muharraq: {
        title: "Chauffeur Service in Muharraq",
        description:
            "The cultural soul of Bahrain — Muharraq's UNESCO Pearling Trail and historic houses tell centuries of stories. AB.Limo's chauffeur service brings you close to it all, plus swift transfers from Bahrain International Airport.",
    },
    "kuwait-city": {
        title: "Executive Chauffeur Service in Kuwait City",
        description:
            "Kuwait City's skyline, souqs, and financial district demand a premium travel experience. AB.Limo delivers executive chauffeur service from Kuwait International Airport, corporate transfers, and intercity comfort across Kuwait.",
    },
    hawalli: {
        title: "Chauffeur Service in Hawalli",
        description:
            "A bustling residential and commercial hub, Hawalli puts Kuwait's best within easy reach. AB.Limo provides reliable chauffeur transfers to the airport, the capital, and beyond — every trip, every time.",
    },
    farwaniya: {
        title: "Chauffeur Service in Farwaniya",
        description:
            "Close to Kuwait International Airport, Farwaniya is a gateway for families and business travelers. AB.Limo ensures smooth, comfortable chauffeur transfers on arrival and departure.",
    },
    "al-ahmadi": {
        title: "Chauffeur Service in Al Ahmadi",
        description:
            "Home to Kuwait's oil heartland and the coastal charm of Fahaheel, Al Ahmadi deserves dependable premium travel. AB.Limo provides executive chauffeur service across the governorate and to the capital.",
    },
    muscat: {
        title: "Luxury Chauffeur Service in Muscat",
        description:
            "Oman's capital mesmerizes — Sultan Qaboos Grand Mosque, the Muttrah Souq, and mountain-framed coastlines. AB.Limo elevates every journey with luxury chauffeur service from Muscat International Airport and across the city.",
    },
    salalah: {
        title: "Chauffeur Service in Salalah",
        description:
            "The tropical jewel of southern Oman — Salalah's monsoon greenery, waterfalls, and beaches are unforgettable. AB.Limo brings comfort to every mile with chauffeur transfers from Salalah Airport and scenic city tours.",
    },
    sohar: {
        title: "Chauffeur Service in Sohar",
        description:
            "Sohar — legendary home of Sinbad the Sailor and Oman's northern port powerhouse — blends history with industry. AB.Limo delivers professional chauffeur service for business travel, port transfers, and journeys to Muscat.",
    },
};

function titleCaseSlug(slug: string): string {
    return slug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
}

export function getCountryAbout(slug: string): AboutContent {
    return (
        countryAbout[slug] ?? {
            title: `Premium Chauffeur Service in ${titleCaseSlug(slug)}`,
            description: `AB.Limo delivers premium chauffeur service across ${titleCaseSlug(
                slug
            )} — airport transfers, corporate mobility, and intercity travel with professional chauffeurs and an immaculate fleet.`,
        }
    );
}

export function getCityAbout(citySlug: string): AboutContent {
    return (
        cityAbout[citySlug] ?? {
            title: `Chauffeur Service in ${titleCaseSlug(citySlug)}`,
            description:
                "AB.Limo delivers premium chauffeur service — airport transfers, corporate mobility, hourly hire, and intercity journeys — with professional chauffeurs, immaculate vehicles, and a commitment to excellence that turns every ride into an experience.",
        }
    );
}
