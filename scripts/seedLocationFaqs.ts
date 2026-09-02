/**
 * Seed FAQs for country pages, city pages, and existing blog articles.
 *
 * Run with:  npx tsx scripts/seedLocationFaqs.ts
 *
 * The script is idempotent — it only adds FAQs where none exist yet.
 */

import dotenv from "dotenv";
import path from "path";

// Load .env.local first (overrides .env)
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import { connectDB } from "../src/lib/db";
import { Country } from "../src/lib/models/Country";
import { Article } from "../src/lib/models/Article";

// ─────────────────────────────────────────────────────────────
// Country-level FAQs (shown on /locations/{country})
// ─────────────────────────────────────────────────────────────
const countryFaqs: Record<string, Array<{ q: string; a: string }>> = {
  uae: [
    {
      q: "What chauffeur services does AB.Limo offer in the UAE?",
      a: "AB.Limo provides premium airport transfers, city-to-city rides, hourly chauffeur hire, corporate transportation, and event logistics across all seven emirates including Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Al Ain, and Fujairah.",
    },
    {
      q: "How do I book a luxury limousine in the UAE?",
      a: "You can book online through our website, call our 24/7 hotline, or use the AB.Limo mobile app. Simply select your pickup and drop-off locations, choose your vehicle, and confirm your booking instantly.",
    },
    {
      q: "Does AB.Limo provide airport transfer services in the UAE?",
      a: "Yes, we offer seamless airport transfers to and from Dubai International Airport (DXB), Al Maktoum International Airport (DWC), Zayed International Airport (AUH), Sharjah International Airport (SHJ), and Ras Al Khaimah International Airport (RKT).",
    },
    {
      q: "What types of vehicles are available for hire in the UAE?",
      a: "Our fleet includes Mercedes S-Class, BMW 7 Series, Audi A8, Rolls Royce, Bentley, Chrysler 300 limousines, luxury SUVs, and executive vans — all maintained to the highest standards of comfort and safety.",
    },
    {
      q: "Is AB.Limo available for corporate accounts in the UAE?",
      a: "Absolutely. We offer tailored corporate mobility solutions including dedicated fleet management, monthly billing, VIP executive transport, and staff transportation for businesses of all sizes across the UAE.",
    },
  ],
  "saudi-arabia": [
    {
      q: "What cities does AB.Limo serve in Saudi Arabia?",
      a: "AB.Limo operates across Saudi Arabia including Riyadh, Jeddah, Mecca, Medina, Dammam, Al Khobar, Tabuk, Al Ula, NEOM, Abha, and many more cities with comprehensive ground transportation coverage.",
    },
    {
      q: "Do you offer transportation for Umrah and Hajj pilgrimages?",
      a: "Yes, we provide specialized religious tourism transportation including Mecca-to-Medina transfers, hotel-to-haram shuttles, and multi-city pilgrimage logistics with experienced drivers who understand the sacred journey requirements.",
    },
    {
      q: "Can I book a limousine for intercity travel in Saudi Arabia?",
      a: "Yes, we offer comfortable intercity transfers such as Riyadh to Dammam (400 km), Riyadh to Jeddah (950 km), and Jeddah to Mecca (80 km) with professional chauffeurs and luxury vehicles.",
    },
    {
      q: "What airport transfer services are available in Saudi Arabia?",
      a: "We provide airport transfers at King Khalid International Airport (RUH) in Riyadh, King Abdulaziz International Airport (JED) in Jeddah, King Fahd International Airport (DMM) in Dammam, and Prince Mohammad bin Abdulaziz Airport (MED) in Medina.",
    },
    {
      q: "Does AB.Limo support Vision 2030 tourism initiatives?",
      a: "Yes, AB.Limo is aligned with Saudi Vision 2030, supporting tourism growth with premium mobility solutions for NEOM, The Red Sea, Al Ula heritage sites, and emerging entertainment and cultural destinations.",
    },
  ],
  qatar: [
    {
      q: "What chauffeur services does AB.Limo offer in Qatar?",
      a: "AB.Limo provides luxury airport transfers, city tours, hourly chauffeur hire, corporate transportation, and event mobility services across Doha, Lusail, Al Khor, and Al Wakrah.",
    },
    {
      q: "Do you provide transfers from Hamad International Airport?",
      a: "Yes, we offer premium airport pickup and drop-off services at Hamad International Airport (DOH) with meet-and-greet service, flight tracking, and luxury vehicles waiting at arrivals.",
    },
    {
      q: "Can I hire a limousine for events in Doha?",
      a: "Absolutely. We provide event transportation for FIFA-level sporting events, conferences at the Doha Exhibition Center, weddings, and corporate functions with dedicated fleet coordination.",
    },
    {
      q: "What is the cancellation policy for bookings in Qatar?",
      a: "We offer free cancellation up to 24 hours before your scheduled pickup. Cancellations within 24 hours may incur a nominal fee. Please check our terms for specific event bookings.",
    },
  ],
  bahrain: [
    {
      q: "What services does AB.Limo offer in Bahrain?",
      a: "AB.Limo provides luxury chauffeur services in Bahrain including airport transfers from Bahrain International Airport (BAH), city transfers across Manama, Riffa, and Muharraq, corporate transportation, and cross-border rides to Saudi Arabia.",
    },
    {
      q: "Can I book a cross-border transfer from Bahrain to Saudi Arabia?",
      a: "Yes, we offer seamless cross-border transfers between Bahrain and Saudi Arabia, including the King Fahd Causeway route. Our experienced drivers handle border logistics for a stress-free journey.",
    },
    {
      q: "Are your chauffeurs licensed and professional?",
      a: "All AB.Limo chauffeurs in Bahrain are professionally trained, licensed, multilingual, and undergo rigorous background checks. They are experts in local routes and committed to providing a premium experience.",
    },
  ],
  kuwait: [
    {
      q: "What chauffeur services are available in Kuwait?",
      a: "AB.Limo offers luxury airport transfers, city transportation, corporate mobility, and intercity rides across Kuwait City, Hawalli, Farwaniya, Al Ahmadi, and Salmiya.",
    },
    {
      q: "Do you provide airport transfers from Kuwait International Airport?",
      a: "Yes, we provide meet-and-greet airport transfers at Kuwait International Airport (KWI) with flight monitoring, complimentary waiting time, and luxury vehicles ready at arrivals.",
    },
    {
      q: "Can I arrange a city-to-city ride from Kuwait to other GCC countries?",
      a: "Yes, AB.Limo offers cross-border transfers from Kuwait to other GCC destinations including Saudi Arabia and Bahrain, with comfortable luxury vehicles for long-distance travel.",
    },
  ],
  oman: [
    {
      q: "What cities does AB.Limo serve in Oman?",
      a: "AB.Limo operates across Oman including Muscat, Salalah, Sohar, and Nizwa with comprehensive chauffeur services for airport transfers, city tours, and intercity travel.",
    },
    {
      q: "Do you offer airport transfers at Muscat International Airport?",
      a: "Yes, we provide premium airport transfers at Muscat International Airport (MCT) and Salalah Airport (SLL) with professional chauffeurs, flight tracking, and luxury vehicles.",
    },
    {
      q: "Can I book a chauffeur for a Salalah khareef season trip?",
      a: "Absolutely. We offer specialized khareef season packages for exploring Salalah's lush landscapes, wadis, and attractions with experienced local drivers who know the best routes.",
    },
    {
      q: "What is the duration for a Muscat to Abu Dhabi transfer?",
      a: "The drive from Muscat to Abu Dhabi is approximately 350 km and takes about 3 hours 30 minutes. Our luxury vehicles ensure a comfortable journey with rest stops as needed.",
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// City-level FAQs (shown on /locations/{country}/{city})
// ─────────────────────────────────────────────────────────────
const cityFaqs: Record<string, Record<string, Array<{ q: string; a: string }>>> = {
  uae: {
    dubai: [
      {
        q: "How much does a luxury airport transfer cost in Dubai?",
        a: "Airport transfer rates in Dubai start from competitive prices depending on the vehicle class and destination. Contact us for an instant quote based on your specific route and vehicle preference.",
      },
      {
        q: "Can I hire a chauffeur by the hour in Dubai?",
        a: "Yes, AB.Limo offers hourly chauffeur hire in Dubai with flexible packages starting from 2-hour minimum bookings. Explore Dubai's attractions, attend meetings, or enjoy a night out with a dedicated driver.",
      },
      {
        q: "Do you provide Dubai-to-Abu Dhabi transfers?",
        a: "Yes, we offer comfortable Dubai-to-Abu Dhabi transfers covering approximately 140 km in about 1 hour 30 minutes. Choose from our range of luxury sedans and SUVs for this popular intercity route.",
      },
      {
        q: "What areas in Dubai do you cover?",
        a: "We cover all areas of Dubai including Downtown Dubai, Dubai Marina, JBR, Palm Jumeirah, DIFC, Business Bay, Dubai Creek, Deira, Jumeirah, Al Barsha, and all other districts.",
      },
      {
        q: "Is AB.Limo available for Dubai corporate events?",
        a: "Yes, we provide comprehensive corporate event transportation in Dubai including conference shuttles, VIP executive transport, and fleet management for corporate functions at venues like Atlantis, Madinat Jumeirah, and DWTC.",
      },
    ],
    "abu-dhabi": [
      {
        q: "What airport transfer services are available in Abu Dhabi?",
        a: "We provide luxury airport transfers from Zayed International Airport (AUH) to all destinations in Abu Dhabi including Saadiyat Island, Yas Island, Al Maryah Island, and downtown areas.",
      },
      {
        q: "Can I book a chauffeur for a Yas Island day trip?",
        a: "Yes, we offer hourly chauffeur hire for exploring Yas Island's attractions including Ferrari World, Yas Waterworld, Yas Marina Circuit, and Yas Mall with a dedicated luxury vehicle.",
      },
      {
        q: "Do you provide inter-emirate transfers from Abu Dhabi?",
        a: "Yes, we offer seamless transfers from Abu Dhabi to Dubai, Sharjah, and all other emirates with professional chauffeurs and well-maintained luxury vehicles.",
      },
    ],
    sharjah: [
      {
        q: "What services does AB.Limo offer in Sharjah?",
        a: "AB.Limo provides airport transfers from Sharjah International Airport (SHJ), city transportation, corporate mobility, and inter-emirate transfers to Dubai and other locations.",
      },
      {
        q: "Is there a direct transfer from Sharjah Airport to Dubai?",
        a: "Yes, we offer direct airport transfers from Sharjah International Airport to Dubai destinations. The journey takes approximately 30-45 minutes depending on your Dubai destination.",
      },
    ],
  },
  "saudi-arabia": {
    riyadh: [
      {
        q: "What chauffeur services are available in Riyadh?",
        a: "AB.Limo offers premium chauffeur services in Riyadh including airport transfers from King Khalid International Airport (RUH), city transportation, corporate mobility, and intercity transfers to Jeddah, Dammam, and other cities.",
      },
      {
        q: "Can I book a limousine for business meetings in Riyadh?",
        a: "Yes, we provide professional corporate transportation in Riyadh's business districts including King Abdullah Financial District, Olaya Street, and Diplomatic Quarter with executive vehicles.",
      },
      {
        q: "What is the duration for a Riyadh to Dammam transfer?",
        a: "The drive from Riyadh to Dammam covers approximately 400 km and takes about 4 hours. Our luxury vehicles ensure a comfortable journey with professional chauffeurs.",
      },
      {
        q: "Do you offer transportation for events in Riyadh?",
        a: "Yes, we provide event transportation for Riyadh Season events, conferences at Riyadh International Convention & Exhibition Center, weddings, and corporate functions.",
      },
    ],
    jeddah: [
      {
        q: "What airport transfer services are available in Jeddah?",
        a: "We provide luxury airport transfers from King Abdulaziz International Airport (JED) to all areas of Jeddah including the Corniche, Al Hamra District, and nearby destinations.",
      },
      {
        q: "Can I book a Jeddah-to-Mecca transfer?",
        a: "Yes, we offer comfortable Jeddah-to-Mecca transfers covering approximately 80 km in about 1 hour. We also provide Mecca-to-Medina transfers for pilgrims.",
      },
      {
        q: "Do you serve the Jeddah Corniche area?",
        a: "Absolutely. We cover all areas of Jeddah including the Corniche, Al Balad historic district, Mall of Arabia, and Red Sea waterfront locations.",
      },
    ],
    mecca: [
      {
        q: "What transportation services do you offer in Mecca?",
        a: "AB.Limo provides dedicated transportation in Mecca including hotel-to-Haram shuttles, intercity transfers to Medina and Jeddah, and VIP religious tourism logistics.",
      },
      {
        q: "Can I book a Mecca-to-Medina transfer?",
        a: "Yes, we offer comfortable Mecca-to-Medina transfers covering approximately 420 km in about 4 hours 15 minutes with luxury vehicles and experienced drivers.",
      },
    ],
    medina: [
      {
        q: "What services are available in Medina?",
        a: "We provide airport transfers from Prince Mohammad bin Abdulaziz International Airport (MED), hotel-to-Masjid an-Nabawi shuttles, and intercity transfers to Mecca and Jeddah.",
      },
    ],
    dammam: [
      {
        q: "What airport transfers are available in Dammam?",
        a: "We provide luxury airport transfers from King Fahd International Airport (DMM) to Dammam, Al Khobar, Dhahran, and the Eastern Province region.",
      },
      {
        q: "Can I book a Dammam-to-Riyadh transfer?",
        a: "Yes, we offer comfortable Dammam-to-Riyadh transfers covering approximately 400 km in about 4 hours with professional chauffeurs and luxury vehicles.",
      },
    ],
  },
  qatar: {
    doha: [
      {
        q: "What chauffeur services does AB.Limo offer in Doha?",
        a: "AB.Limo provides premium airport transfers from Hamad International Airport (DOH), city tours, hourly chauffeur hire, corporate transportation, and event mobility across Doha.",
      },
      {
        q: "Can I hire a limousine for a day tour in Doha?",
        a: "Yes, we offer hourly chauffeur hire for exploring Doha's attractions including the Museum of Islamic Art, Souq Waqif, Katara Cultural Village, The Pearl-Qatar, and Lusail City.",
      },
      {
        q: "Do you provide transfers to Lusail from Doha?",
        a: "Yes, we offer seamless Doha-to-Lusail transfers covering approximately 25 km in about 20 minutes. Lusail is a popular destination for events and entertainment.",
      },
      {
        q: "Is AB.Limo available for World Cup-style event transportation?",
        a: "Yes, we have extensive experience providing large-scale event transportation including stadium transfers, VIP logistics, and crowd management solutions for major sporting events in Qatar.",
      },
    ],
    lusail: [
      {
        q: "What services are available in Lusail?",
        a: "AB.Limo provides transportation in Lusail including event transfers to Lusail Stadium, Lusail Boulevard, and Qetaifan Islands, as well as intercity transfers to Doha and beyond.",
      },
    ],
    "al-khor": [
      {
        q: "Can I book a transfer from Al Khor to Doha?",
        a: "Yes, we offer Al Khor to Doha transfers covering approximately 50 km in about 45 minutes with luxury vehicles.",
      },
    ],
  },
  bahrain: {
    manama: [
      {
        q: "What chauffeur services are available in Manama?",
        a: "AB.Limo provides luxury chauffeur services in Manama including airport transfers from Bahrain International Airport (BAH), city tours, corporate transportation, and cross-border transfers.",
      },
      {
        q: "Can I book a cross-border transfer from Manama to Al Khobar?",
        a: "Yes, we offer seamless cross-border transfers from Manama to Al Khobar covering approximately 110 km in about 1 hour 30 minutes via the King Fahd Causeway.",
      },
      {
        q: "Do you cover Bahrain's financial district?",
        a: "Absolutely. We provide corporate transportation to and from Bahrain's Financial Harbour, Bahrain World Trade Center, and all major business districts in Manama.",
      },
    ],
    riffa: [
      {
        q: "What services are available in Riffa?",
        a: "AB.Limo provides chauffeur services in Riffa including airport transfers, city transportation, and intercity transfers to Manama and other Bahrain locations.",
      },
    ],
  },
  kuwait: {
    "kuwait-city": [
      {
        q: "What chauffeur services are available in Kuwait City?",
        a: "AB.Limo provides luxury airport transfers from Kuwait International Airport (KWI), city transportation across Kuwait City, Hawalli, and Farwaniya, corporate mobility, and cross-border transfers.",
      },
      {
        q: "Can I book an airport transfer from Kuwait International Airport?",
        a: "Yes, we provide meet-and-greet airport transfers at Kuwait International Airport (KWI) with flight monitoring, complimentary waiting time, and luxury vehicles.",
      },
      {
        q: "Do you offer cross-border transfers from Kuwait?",
        a: "Yes, we offer cross-border transfers from Kuwait to Saudi Arabia and other GCC destinations with professional chauffeurs and comfortable luxury vehicles.",
      },
    ],
    hawalli: [
      {
        q: "What services are available in Hawalli?",
        a: "AB.Limo provides chauffeur services in Hawalli including city transfers, airport pickups, and transportation to shopping districts and business areas.",
      },
    ],
  },
  oman: {
    muscat: [
      {
        q: "What chauffeur services are available in Muscat?",
        a: "AB.Limo provides luxury airport transfers from Muscat International Airport (MCT), city tours, hourly chauffeur hire, and intercity transfers to Salalah, Sohar, and beyond.",
      },
      {
        q: "Can I book a Muscat city tour with a chauffeur?",
        a: "Yes, we offer guided city tours in Muscat covering the Sultan Qaboos Grand Mosque, Royal Opera House, Muttrah Souq, and coastal attractions with knowledgeable local drivers.",
      },
      {
        q: "What is the duration for a Muscat to Abu Dhabi transfer?",
        a: "The drive from Muscat to Abu Dhabi covers approximately 350 km and takes about 3 hours 30 minutes. Our luxury vehicles ensure a comfortable journey.",
      },
    ],
    salalah: [
      {
        q: "What services are available in Salalah?",
        a: "AB.Limo provides airport transfers from Salalah Airport (SLL), khareef season tours, and exploration trips to wadis, beaches, and archaeological sites.",
      },
      {
        q: "Can I book a Salalah khareef tour?",
        a: "Yes, we offer specialized khareef season packages to explore Salalah's lush green landscapes, wadis, waterfalls, and natural attractions with experienced local drivers.",
      },
    ],
  },
};

// ─────────────────────────────────────────────────────────────
// Blog article FAQs (keyed by serviceSlug + countrySlug + citySlug)
// ─────────────────────────────────────────────────────────────
type FaqPair = { q: string; a: string };

const articleFaqData: Record<string, FaqPair[]> = {
  // ── Chauffeur VIP ──────────────────────────────────────
  "chauffeur-vip|uae": [
    { q: "What is AB.Limo's chauffeur VIP service in the UAE?", a: "Our chauffeur VIP service in the UAE provides dedicated, professionally trained drivers with luxury vehicles like Mercedes S-Class, BMW 7 Series, and Rolls Royce for executive and personal travel across all seven emirates." },
    { q: "How do I book a VIP chauffeur in Dubai or Abu Dhabi?", a: "Book online at ablimo.com, call our 24/7 hotline, or use the AB.Limo app. Select your vehicle, route, and schedule — confirmation is instant." },
    { q: "Are VIP chauffeurs available for multi-day hire?", a: "Yes, we offer multi-day and weekly VIP chauffeur packages with dedicated vehicles and drivers for business trips, tourism, or special occasions." },
  ],
  "chauffeur-vip|uae|dubai": [
    { q: "What makes AB.Limo's Dubai VIP chauffeur service unique?", a: "Our Dubai VIP service features hand-picked chauffeurs, real-time flight tracking for airport pickups, complimentary refreshments, Wi-Fi-equipped vehicles, and 24/7 concierge support." },
    { q: "Can I request a specific vehicle for my Dubai VIP ride?", a: "Yes, choose from our premium fleet including Mercedes S-Class, Bentley, Rolls Royce, and luxury SUVs when booking your Dubai VIP transfer." },
  ],
  "chauffeur-vip|saudi-arabia": [
    { q: "What VIP chauffeur services are available in Saudi Arabia?", a: "AB.Limo provides VIP chauffeur services across Riyadh, Jeddah, Dammam, Mecca, and Medina with luxury vehicles for business, tourism, and religious travel." },
    { q: "Do you offer VIP transportation for Hajj and Umrah?", a: "Yes, we offer premium VIP transportation for Hajj and Umrah pilgrimages with experienced drivers, luxury vehicles, and comprehensive logistics support." },
  ],
  "chauffeur-vip|saudi-arabia|riyadh": [
    { q: "What VIP chauffeur options are available in Riyadh?", a: "In Riyadh, AB.Limo offers executive sedans, luxury SUVs, and limousines with professional chauffeurs for airport transfers, business meetings, and city tours." },
  ],
  "chauffeur-vip|qatar": [
    { q: "What VIP chauffeur services does AB.Limo offer in Qatar?", a: "In Qatar, we provide luxury chauffeur services including airport transfers from DOH, city tours of Doha, hourly hire, and event transportation with premium vehicles." },
  ],
  "chauffeur-vip|qatar|doha": [
    { q: "Can I book a VIP chauffeur for a Doha business trip?", a: "Absolutely. Our Doha VIP chauffeur service is ideal for business travelers with executive vehicles, punctual service, and professional multilingual drivers." },
  ],

  // ── Airport Transfers ──────────────────────────────────
  "airport-transfers|uae": [
    { q: "Which airports in the UAE does AB.Limo serve?", a: "We serve Dubai International Airport (DXB), Al Maktoum International Airport (DWC), Zayed International Airport (AUH), Sharjah International Airport (SHJ), and Ras Al Khaimah International Airport (RKT)." },
    { q: "How far in advance should I book an airport transfer?", a: "We recommend booking at least 24 hours in advance for guaranteed availability, though last-minute bookings are often available depending on demand." },
    { q: "Do you track flight arrivals for airport pickups?", a: "Yes, all our airport transfers include real-time flight tracking. If your flight is delayed, your chauffeur will adjust the pickup time automatically." },
  ],
  "airport-transfers|uae|dubai": [
    { q: "What is the pickup process at Dubai International Airport?", a: "Your chauffeur will meet you at arrivals holding a name board, assist with luggage, and escort you to your luxury vehicle. Complimentary waiting time of 60 minutes is included." },
    { q: "How long is the transfer from DXB to Dubai Marina?", a: "The transfer from DXB to Dubai Marina typically takes 25-40 minutes depending on traffic. Our chauffeurs use real-time routing to ensure the fastest journey." },
  ],
  "airport-transfers|saudi-arabia": [
    { q: "Which airports in Saudi Arabia does AB.Limo cover?", a: "We cover King Khalid International Airport (RUH) in Riyadh, King Abdulaziz International Airport (JED) in Jeddah, King Fahd International Airport (DMM) in Dammam, and Prince Mohammad bin Abdulaziz Airport (MED) in Medina." },
  ],
  "airport-transfers|saudi-arabia|jeddah": [
    { q: "What is the transfer time from JED airport to Mecca?", a: "The transfer from King Abdulaziz International Airport to Mecca covers approximately 80 km and takes about 1 hour. We provide direct, comfortable transfers for pilgrims." },
  ],
  "airport-transfers|saudi-arabia|riyadh": [
    { q: "What is the transfer time from King Khalid Airport to central Riyadh?", a: "The transfer from King Khalid International Airport (RUH) to central Riyadh takes approximately 25-35 minutes depending on traffic. Our chauffeurs use real-time routing to ensure the fastest journey." },
    { q: "Do you offer meet-and-greet at Riyadh airport?", a: "Yes, all our Riyadh airport transfers include a meet-and-greet service. Your chauffeur will wait at arrivals with a name board and assist with your luggage." },
  ],
  "airport-transfers|qatar": [
    { q: "What airport transfer services are available in Qatar?", a: "We provide premium transfers from Hamad International Airport (DOH) to all destinations in Qatar including Doha, Lusail, Al Khor, and Al Wakrah." },
  ],
  "airport-transfers|qatar|doha": [
    { q: "How do I find my chauffeur at Hamad International Airport?", a: "Your chauffeur will be waiting at the arrivals hall with a name board. You'll receive their contact details and vehicle information via SMS before landing." },
  ],
  "airport-transfers|bahrain": [
    { q: "What airport transfer services are available in Bahrain?", a: "We provide luxury airport transfers from Bahrain International Airport (BAH) to all destinations in Bahrain including Manama, Riffa, and Muharraq." },
  ],
  "airport-transfers|kuwait": [
    { q: "What airport transfer services are available in Kuwait?", a: "We provide premium airport transfers from Kuwait International Airport (KWI) to Kuwait City, Hawalli, Farwaniya, and all other areas." },
  ],
  "airport-transfers|oman": [
    { q: "Which airports in Oman does AB.Limo serve?", a: "We serve Muscat International Airport (MCT), Salalah Airport (SLL), and Sohar International Airport (SOH) with luxury transfer services." },
  ],
  "airport-transfers|oman|muscat": [
    { q: "What is the transfer time from Muscat Airport to the city center?", a: "The transfer from Muscat International Airport to the city center takes approximately 20-30 minutes depending on your destination within Muscat." },
  ],

  // ── Corporate Transportation ───────────────────────────
  "corporate-transportation|uae": [
    { q: "What corporate transportation solutions does AB.Limo offer in the UAE?", a: "We provide dedicated corporate accounts, executive fleet management, airport transfers for business travelers, staff transportation, and event logistics for companies across the UAE." },
    { q: "Can AB.Limo manage a corporate fleet for my company?", a: "Yes, our corporate fleet management includes dedicated vehicles, scheduled routing, monthly billing, real-time tracking, and a dedicated account manager." },
  ],
  "corporate-transportation|uae|dubai": [
    { q: "Do you provide executive transportation for DIFC and Business Bay?", a: "Yes, we specialize in executive transportation for Dubai's financial districts including DIFC, Business Bay, and Dubai Marina with premium vehicles and professional chauffeurs." },
  ],
  "corporate-transportation|saudi-arabia": [
    { q: "What corporate mobility services are available in Saudi Arabia?", a: "AB.Limo offers corporate transportation across Riyadh, Jeddah, and Dammam including executive transfers, staff shuttles, and event logistics for businesses." },
  ],
  "corporate-transportation|qatar": [
    { q: "What corporate transportation does AB.Limo offer in Qatar?", a: "In Qatar, we provide corporate accounts, executive airport transfers, staff transportation, and event logistics for businesses operating in Doha and Lusail." },
  ],

  // ── Event Transportation ───────────────────────────────
  "event-transportation|uae": [
    { q: "What event transportation services does AB.Limo provide in the UAE?", a: "We offer wedding transportation, concert and sports event shuttles, conference logistics, gala dinner transfers, and VIP event coordination across the UAE." },
    { q: "Can AB.Limo handle large-scale event transportation?", a: "Yes, we manage large-scale event transportation with fleet coordination, multiple vehicle types, dedicated event managers, and real-time logistics tracking." },
  ],
  "event-transportation|uae|dubai": [
    { q: "Do you provide transportation for Dubai events?", a: "Yes, we provide comprehensive event transportation for Dubai events including concerts at Coca-Cola Arena, Dubai World Cup, Art Dubai, and exhibitions at DWTC." },
  ],
  "event-transportation|uae|abu-dhabi": [
    { q: "What event transportation is available in Abu Dhabi?", a: "We provide event transportation for Abu Dhabi events including functions at Emirates Palace, Yas Marina Circuit, ADNEC conferences, and cultural events at Louvre Abu Dhabi." },
  ],
  "event-transportation|saudi-arabia": [
    { q: "What event transportation is available in Saudi Arabia?", a: "AB.Limo provides event transportation for Riyadh Season, Jeddah Season, concerts, sporting events, conferences, and corporate functions across Saudi Arabia." },
  ],
  "event-transportation|qatar": [
    { q: "Do you offer event transportation in Qatar?", a: "Yes, we provide event transportation for sporting events, conferences at QNCC, cultural events at Katara, and functions at hotels across Qatar." },
  ],

  // ── Bus & Coach Hire ───────────────────────────────────
  "bus-coach-hire|uae": [
    { q: "What bus and coach hire options are available in the UAE?", a: "AB.Limo offers mini buses (12-16 seats), mid-size coaches (20-30 seats), and full-size luxury coaches (40-50 seats) for group transportation across the UAE." },
    { q: "Can I hire a coach for a corporate team outing in Dubai?", a: "Yes, we provide luxury coach hire for corporate team outings, team-building events, and group excursions throughout Dubai and other emirates." },
  ],
  "bus-coach-hire|saudi-arabia": [
    { q: "What group transportation options are available in Saudi Arabia?", a: "We offer bus and coach hire for Hajj/Umrah groups, corporate events, school trips, and tourism across Riyadh, Jeddah, Mecca, and other cities." },
  ],
  "bus-coach-hire|qatar": [
    { q: "Can I hire a bus for a group event in Doha?", a: "Yes, AB.Limo offers luxury bus and coach hire for group events, conferences, and tours in Doha and throughout Qatar." },
  ],
  "bus-coach-hire|qatar|doha": [
    { q: "What coach hire options are available in Doha?", a: "AB.Limo offers mini buses, mid-size coaches, and full-size luxury coaches for group transportation in Doha. Ideal for corporate events, school trips, and tourism groups." },
    { q: "Can I hire a bus for a World Cup viewing event in Doha?", a: "Yes, we provide group bus hire for sporting events, conference shuttles, and large-scale event logistics across Doha with professional drivers." },
  ],
  "bus-coach-hire|bahrain": [
    { q: "What group transportation does AB.Limo offer in Bahrain?", a: "We provide bus and coach hire for corporate groups, tourism, and event transportation across Bahrain including Manama, Riffa, and Muharraq." },
  ],
  "bus-coach-hire|kuwait": [
    { q: "What group transportation options are available in Kuwait?", a: "AB.Limo offers bus and coach hire for corporate groups, school transportation, and event logistics across Kuwait City and other areas." },
  ],
  "bus-coach-hire|oman": [
    { q: "Can I hire a coach for a group tour in Oman?", a: "Yes, we provide luxury bus and coach hire for group tours, corporate events, and tourism across Muscat, Salalah, and other Omani cities." },
  ],

  // ── Tourism Transportation ─────────────────────────────
  "tourism-transportation|uae": [
    { q: "What tourism transportation does AB.Limo offer in the UAE?", a: "We provide guided city tours, desert safari transfers, Abu Dhabi day trips, inter-emirate tours, and custom tourism itineraries with luxury vehicles and professional drivers." },
  ],
  "tourism-transportation|uae|dubai": [
    { q: "Can I book a Dubai city tour with AB.Limo?", a: "Yes, our Dubai city tours cover Burj Khalifa, Palm Jumeirah, Dubai Creek, Gold Souk, Dubai Mall, and more with expert local chauffeurs." },
  ],
  "tourism-transportation|saudi-arabia": [
    { q: "What tourism transportation options are available in Saudi Arabia?", a: "We offer tourism transfers for heritage sites in Al Ula, NEOM excursions, Red Sea coast tours, and religious tourism logistics across Saudi Arabia." },
  ],
  "tourism-transportation|qatar": [
    { q: "What tourism transportation does AB.Limo provide in Qatar?", a: "In Qatar, we provide city tours of Doha, desert excursions, cultural site visits, and customized tourism transportation with luxury vehicles." },
  ],
  "tourism-transportation|bahrain": [
    { q: "What tourism transfers are available in Bahrain?", a: "AB.Limo offers tourism transportation in Bahrain including Bahrain Fort visits, Pearl Trail tours, Formula 1 circuit transfers, and cultural site excursions." },
  ],
  "tourism-transportation|kuwait": [
    { q: "What tourism transportation does AB.Limo offer in Kuwait?", a: "We provide tourism transfers in Kuwait including Kuwait Towers visits, Souq Mubarakiya tours, Failaka Island transfers, and desert excursion transportation." },
  ],
  "tourism-transportation|oman": [
    { q: "What tourism transportation options are available in Oman?", a: "AB.Limo offers tourism transfers in Oman including Muscat city tours, wadi excursions, Jebel Akhdar trips, Salalah khareef tours, and custom itineraries." },
  ],
  "tourism-transportation|oman|muscat": [
    { q: "What can I see on a Muscat city tour with AB.Limo?", a: "Our Muscat city tours cover the Sultan Qaboos Grand Mosque, Royal Opera House, Muttrah Souq, Bait Al Zubair Museum, and the scenic coastal road with professional local drivers." },
    { q: "Can I book a day trip from Muscat to Jebel Akhdar?", a: "Yes, we offer day trips from Muscat to Jebel Akhdar in the Al Hajar Mountains. The drive takes about 2 hours each way and our experienced mountain drivers ensure a safe, scenic journey." },
  ],
};

// ─────────────────────────────────────────────────────────────
// Seed logic
// ─────────────────────────────────────────────────────────────

async function seedCountryFaqs() {
  let updated = 0;
  for (const [countrySlug, faqs] of Object.entries(countryFaqs)) {
    const result = await Country.updateOne(
      { slug: countrySlug },
      { $set: { faqs } }
    );
    if (result.modifiedCount > 0) {
      console.log(`  ✓ Country "${countrySlug}" — ${faqs.length} FAQs added`);
      updated++;
    }
  }
  return updated;
}

async function seedCityFaqs() {
  let updated = 0;
  for (const [countrySlug, cities] of Object.entries(cityFaqs)) {
    for (const [citySlug, faqs] of Object.entries(cities)) {
      // Use array filter to target the specific city by slug
      // This works regardless of whether the faqs field exists or is empty
      const result = await Country.updateOne(
        {
          slug: countrySlug,
          "cities.slug": citySlug,
        },
        {
          $set: { "cities.$.faqs": faqs },
        }
      );
      if (result.modifiedCount > 0) {
        console.log(`  ✓ City "${citySlug}" (${countrySlug}) — ${faqs.length} FAQs added`);
        updated++;
      }
    }
  }
  return updated;
}

async function seedArticleFaqs() {
  let updated = 0;
  for (const [key, faqs] of Object.entries(articleFaqData)) {
    const [serviceSlug, countrySlug, citySlug] = key.split("|");

    // Build the query filter
    const filter: Record<string, unknown> = {
      serviceSlug,
      countrySlug,
      templateType: { $in: ["service-country", "service-city"] },
    };
    if (citySlug) {
      filter.templateType = "service-city";
      filter.citySlug = citySlug;
    } else {
      filter.templateType = "service-country";
      filter.citySlug = { $in: ["", undefined] };
    }

    // Only update articles that have no FAQs yet
    filter.$or = [{ faqs: { $exists: false } }, { faqs: { $size: 0 } }];

    const result = await Article.updateMany(filter, { $set: { faqs } });
    if (result.modifiedCount > 0) {
      console.log(`  ✓ Article "${serviceSlug}|${countrySlug}${citySlug ? "|" + citySlug : ""}" — ${faqs.length} FAQs added to ${result.modifiedCount} article(s)`);
      updated += result.modifiedCount;
    }
  }
  return updated;
}

async function main() {
  console.log("🔍 Seeding location & article FAQs...\n");

  await connectDB();

  console.log("📍 Seeding country-level FAQs:");
  const countries = await seedCountryFaqs();

  console.log("\n🏙️  Seeding city-level FAQs:");
  const cities = await seedCityFaqs();

  console.log("\n📝 Seeding blog article FAQs:");
  const articles = await seedArticleFaqs();

  console.log(`\n✅ Done! Updated ${countries} countries, ${cities} cities, ${articles} articles.`);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
