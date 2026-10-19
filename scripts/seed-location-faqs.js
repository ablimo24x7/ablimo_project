/* Seeds FAQ data for all countries/cities that have none. Idempotent: skips non-empty. */
require("dotenv").config({ path: ".env" });
const mongoose = require("mongoose");

// Country-level FAQs: slug -> [{q,a}]
const COUNTRY_FAQS = {
  "united-arab-emirates": [
    {
      q: "What cities does AB.Limo serve in the United Arab Emirates?",
      a: "AB.Limo operates across the UAE including Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, and Al Ain, covering every major airport, hotel, business district, and attraction.",
    },
    {
      q: "Do you offer airport transfers in the UAE?",
      a: "Yes, we provide premium airport transfers at Dubai International Airport (DXB), Al Maktoum International (DWC), Abu Dhabi Zayed International (AUH), Sharjah International (SHJ), and all other UAE airports. Our chauffeurs track your flight and greet you at arrivals.",
    },
    {
      q: "Can I book a limousine for intercity travel between Emirates?",
      a: "Yes, we offer comfortable intercity transfers such as Dubai to Abu Dhabi (140 km, about 1.5 hours), Dubai to Sharjah (30 km, about 30 minutes), and Abu Dhabi to Al Ain (150 km, about 1.5 hours).",
    },
    {
      q: "Do you provide corporate and executive transportation in the UAE?",
      a: "Absolutely. We serve Dubai's DIFC and Business Bay, Abu Dhabi's Al Maryah Island and Corniche, and other business hubs with executive vehicles, monthly corporate accounts, and professional chauffeurs.",
    },
    {
      q: "Is AB.Limo available for events and exhibitions in the UAE?",
      a: "Yes, we handle event transportation for exhibitions at Dubai World Trade Centre, Abu Dhabi National Exhibition Centre, concerts, weddings, and government delegations with coordinated logistics.",
    },
  ],
  germany: [
    {
      q: "What chauffeur services does AB.Limo offer in Germany?",
      a: "AB.Limo provides premium chauffeur-driven transportation across Germany including airport transfers, corporate travel, intercity journeys, and event logistics with a professional fleet and English-speaking chauffeurs.",
    },
    {
      q: "Which German airports do you serve?",
      a: "We provide airport transfers at Frankfurt (FRA), Munich (MUC), Berlin Brandenburg (BER), Düsseldorf (DUS), Hamburg (HAM), and all other major German airports, with flight tracking and meet-and-greet service.",
    },
    {
      q: "Can I book intercity transfers in Germany?",
      a: "Yes, we offer comfortable intercity journeys such as Frankfurt to Munich (400 km, about 4 hours), Berlin to Hamburg (290 km, about 3 hours), and Munich to Zurich (360 km, about 3.5 hours).",
    },
    {
      q: "Do you provide corporate transportation for German business travel?",
      a: "Absolutely. We serve Germany's business hubs including Frankfurt's banking district, Munich's corporate centers, and Düsseldorf's trade fair grounds with executive vehicles and monthly corporate accounts.",
    },
    {
      q: "Is AB.Limo available for trade fairs and events in Germany?",
      a: "Yes, we handle transportation for major trade fairs including Frankfurt Book Fair, Hannover Messe, Automechanika, Oktoberfest in Munich, and corporate events nationwide.",
    },
  ],
};

// City-level FAQs: countrySlug -> citySlug -> [{q,a}]
const CITY_FAQS = {
  "united-arab-emirates": {
    dubai: [
      {
        q: "What chauffeur services are available in Dubai?",
        a: "AB.Limo offers premium chauffeur services in Dubai including airport transfers from Dubai International Airport (DXB) and Al Maktoum International (DWC), city transportation, corporate mobility, and intercity transfers to Abu Dhabi, Sharjah, and other Emirates.",
      },
      {
        q: "Can I hire a limousine for a day tour in Dubai?",
        a: "Yes, we offer hourly chauffeur hire for exploring Dubai's landmarks including Burj Khalifa, Dubai Marina, Palm Jumeirah, Dubai Mall, and the old souks in Deira and Bur Dubai.",
      },
      {
        q: "Do you provide Dubai to Abu Dhabi transfers?",
        a: "Yes, we offer seamless Dubai-to-Abu Dhabi transfers covering approximately 140 km in about 1.5 hours. Our luxury vehicles ensure a comfortable journey with professional chauffeurs.",
      },
      {
        q: "Do you offer transportation for events in Dubai?",
        a: "Yes, we provide event transportation for the Dubai World Cup, exhibitions at Dubai World Trade Centre, concerts, weddings, and corporate functions across the city.",
      },
    ],
    "abu-dhabi": [
      {
        q: "What chauffeur services are available in Abu Dhabi?",
        a: "AB.Limo offers premium chauffeur services in Abu Dhabi including airport transfers from Zayed International Airport (AUH), city transportation, corporate mobility, and intercity transfers to Dubai, Al Ain, and other Emirates.",
      },
      {
        q: "Can I book a limousine for business meetings in Abu Dhabi?",
        a: "Yes, we provide professional corporate transportation in Abu Dhabi's business districts including Al Maryah Island, Corniche Road, and Yas Island with executive vehicles and experienced chauffeurs.",
      },
      {
        q: "Do you offer transfers to Dubai from Abu Dhabi?",
        a: "Yes, we offer comfortable Abu Dhabi-to-Dubai transfers covering approximately 140 km in about 1.5 hours, ideal for business and leisure travelers.",
      },
      {
        q: "Do you provide transportation for events in Abu Dhabi?",
        a: "Yes, we handle event transportation for events at Yas Island, Abu Dhabi National Exhibition Centre (ADNEC), Formula 1 at Yas Marina Circuit, weddings, and corporate functions.",
      },
    ],
    sharjah: [
      {
        q: "What chauffeur services are available in Sharjah?",
        a: "AB.Limo offers premium chauffeur services in Sharjah including airport transfers from Sharjah International Airport (SHJ), city transportation, and intercity transfers to Dubai, Abu Dhabi, and the Northern Emirates.",
      },
      {
        q: "Can I book a limousine for corporate travel in Sharjah?",
        a: "Yes, we provide executive transportation for Sharjah's business areas including Al Nahda, Al Qasba, and Sharjah Free Zone with professional chauffeurs.",
      },
      {
        q: "Do you offer Sharjah to Dubai transfers?",
        a: "Yes, we offer frequent Sharjah-to-Dubai transfers covering approximately 30 km in about 30 minutes, popular with commuters and hotel guests.",
      },
    ],
    ajman: [
      {
        q: "What chauffeur services are available in Ajman?",
        a: "AB.Limo offers premium chauffeur services in Ajman including hotel transfers, city transportation, and intercity transfers to Dubai, Sharjah, and other Emirates.",
      },
      {
        q: "Can I hire a limousine for hotel transfers in Ajman?",
        a: "Yes, we provide reliable hotel-to-hotel and hotel-to-airport transfers for guests staying along Ajman's Corniche and Al Zorah area.",
      },
      {
        q: "Do you offer Ajman to Dubai airport transfers?",
        a: "Yes, we provide direct transfers from Ajman to Dubai International Airport (DXB) and Sharjah International Airport (SHJ) with professional chauffeurs.",
      },
    ],
    "ras-al-khaimah": [
      {
        q: "What chauffeur services are available in Ras Al Khaimah?",
        a: "AB.Limo offers premium chauffeur services in Ras Al Khaimah including airport transfers, hotel transportation, city travel, and intercity transfers to Dubai and the Northern Emirates.",
      },
      {
        q: "Can I book a limousine for luxury resorts in Ras Al Khaimah?",
        a: "Yes, we provide chauffeur-driven transfers to and from luxury resorts including the Jebel Jais area, Al Wadi Desert, and Al Marjan Island.",
      },
      {
        q: "Do you offer transfers to Jebel Jais?",
        a: "Yes, we offer scenic transfers to Jebel Jais, the UAE's highest peak, popular for the Jebel Jais Flight zipline and the viewing deck.",
      },
    ],
    "al-ain": [
      {
        q: "What chauffeur services are available in Al Ain?",
        a: "AB.Limo offers premium chauffeur services in Al Ain including city transportation, hotel transfers, and intercity transfers to Abu Dhabi and Dubai.",
      },
      {
        q: "Can I hire a limousine for sightseeing in Al Ain?",
        a: "Yes, we offer hourly chauffeur hire for exploring Al Ain's attractions including Al Ain Oasis, Jebel Hafeet, Al Ain Zoo, and the Green Mubazzarah hot springs.",
      },
      {
        q: "Do you provide Al Ain to Abu Dhabi transfers?",
        a: "Yes, we offer comfortable Al Ain-to-Abu Dhabi transfers covering approximately 150 km in about 1.5 hours with luxury vehicles.",
      },
    ],
  },
  "saudi-arabia": {
    tabuk: [
      {
        q: "What chauffeur services are available in Tabuk?",
        a: "AB.Limo offers premium chauffeur services in Tabuk including airport transfers from Tabuk Regional Airport (TUU), city transportation, and intercity transfers across the Northwest region.",
      },
      {
        q: "Do you provide Tabuk to NEOM transfers?",
        a: "Yes, we offer comfortable transfers from Tabuk to NEOM and the surrounding Northwest development areas, ideal for business and project travel.",
      },
      {
        q: "Can I book a limousine for corporate travel in Tabuk?",
        a: "Yes, we provide executive transportation for business travel in Tabuk with professional chauffeurs and luxury vehicles.",
      },
    ],
    "al-ula": [
      {
        q: "What chauffeur services are available in Al Ula?",
        a: "AB.Limo offers premium chauffeur services in Al Ula including airport transfers from AlUla International Airport (ULH), hotel transportation, and guided city travel.",
      },
      {
        q: "Can I hire a limousine for sightseeing in Al Ula?",
        a: "Yes, we offer chauffeur-driven tours of Al Ula's attractions including Hegra (Mada'in Salih), AlUla Old Town, Elephant Rock, and Jabal AlFil.",
      },
      {
        q: "Do you offer Al Ula to Madinah or other intercity transfers?",
        a: "Yes, we provide comfortable intercity transfers from Al Ula to Madinah, Tabuk, and other Northwest destinations with luxury vehicles.",
      },
    ],
    "al-khobar": [
      {
        q: "What chauffeur services are available in Al Khobar?",
        a: "AB.Limo offers premium chauffeur services in Al Khobar including airport transfers from King Fahd International Airport (DMM), city transportation, and corporate mobility across the Eastern Province.",
      },
      {
        q: "Can I book a limousine for corporate travel in Al Khobar?",
        a: "Yes, we provide executive transportation for Al Khobar's business districts, Dhahran, and Ras Tanura with professional chauffeurs.",
      },
      {
        q: "Do you offer Al Khobar to Dammam or Bahrain transfers?",
        a: "Yes, we offer intercity transfers such as Al Khobar to Dammam (20 km, about 25 minutes) and Al Khobar to Manama, Bahrain (about 4 hours via the King Fahd Causeway).",
      },
    ],
    "al-qasim": [
      {
        q: "What chauffeur services are available in Al Qasim?",
        a: "AB.Limo offers premium chauffeur services in the Al Qasim region including airport transfers from Prince Nayef bin Abdulaziz International Airport (ELQ), city transportation in Buraidah and Unayzah, and intercity transfers.",
      },
      {
        q: "Can I hire a limousine for business travel in Buraidah?",
        a: "Yes, we provide executive transportation for business and government travel in Buraidah, Unayzah, and Riyadh Al Khabra with professional chauffeurs.",
      },
      {
        q: "Do you offer Al Qasim to Riyadh transfers?",
        a: "Yes, we offer comfortable Al Qasim-to-Riyadh transfers covering approximately 330 km in about 3.5 hours with luxury vehicles.",
      },
    ],
    abha: [
      {
        q: "What chauffeur services are available in Abha?",
        a: "AB.Limo offers premium chauffeur services in Abha including airport transfers from Abha International Airport (AHB), city transportation, and intercity transfers across the Asir region.",
      },
      {
        q: "Can I hire a limousine for sightseeing in Abha?",
        a: "Yes, we offer chauffeur-driven tours of Abha's attractions including Al Soudah Mountain, Rijal Almaa heritage village, and the Asir Highlands.",
      },
      {
        q: "Do you offer Abha to Jizan or other intercity transfers?",
        a: "Yes, we provide comfortable intercity transfers from Abha to Jizan, Khamis Mushait, and other Southern destinations.",
      },
    ],
    jizan: [
      {
        q: "What chauffeur services are available in Jizan?",
        a: "AB.Limo offers premium chauffeur services in Jizan including airport transfers from Jazan Airport (GIZ), city transportation, and intercity transfers across the Southwest region.",
      },
      {
        q: "Do you provide transfers to the Farasan Islands?",
        a: "Yes, we offer chauffeur transfers to Jizan port for Farasan Islands ferry connections, plus hotel and city transportation.",
      },
      {
        q: "Can I book a limousine for corporate travel in Jizan?",
        a: "Yes, we provide executive transportation for business and government travel in Jizan with professional chauffeurs.",
      },
    ],
    neom: [
      {
        q: "What chauffeur services are available in NEOM?",
        a: "AB.Limo offers premium chauffeur services in NEOM including airport transfers, project site transportation, hotel transfers, and intercity connections across the Northwest region.",
      },
      {
        q: "Can I book a limousine for business travel in NEOM?",
        a: "Yes, we provide executive transportation for business travel to NEOM's developments including The Line, Oxagon, and Trojena with professional chauffeurs and luxury vehicles.",
      },
      {
        q: "Do you offer NEOM to Tabuk airport transfers?",
        a: "Yes, we provide direct NEOM-to-Tabuk Regional Airport (TUU) transfers and connections to other regional airports.",
      },
    ],
  },
  oman: {
    sohar: [
      {
        q: "What chauffeur services are available in Sohar?",
        a: "AB.Limo offers premium chauffeur services in Sohar including hotel transfers, city transportation, Sohar Port transfers, and intercity connections to Muscat and the Northern Governorate.",
      },
      {
        q: "Do you provide Muscat to Sohar transfers?",
        a: "Yes, we offer comfortable Muscat-to-Sohar transfers covering approximately 230 km in about 2.5 hours with luxury vehicles and professional chauffeurs.",
      },
      {
        q: "Can I book a limousine for corporate travel in Sohar?",
        a: "Yes, we provide executive transportation for Sohar's industrial and business areas including Sohar Free Zone with professional chauffeurs.",
      },
    ],
  },
  kuwait: {
    "kuwait-city": [
      {
        q: "What chauffeur services are available in Kuwait City?",
        a: "AB.Limo offers premium chauffeur services in Kuwait City including airport transfers from Kuwait International Airport (KWI), city transportation, corporate mobility, and intercity transfers across Kuwait.",
      },
      {
        q: "Can I hire a limousine for business meetings in Kuwait City?",
        a: "Yes, we provide professional corporate transportation in Kuwait City's business districts including Sharq, Mirqab, and the Financial District with executive vehicles.",
      },
      {
        q: "Do you offer transportation for events in Kuwait City?",
        a: "Yes, we provide event transportation for conferences at Kuwait International Fairground, weddings, and corporate functions across the city.",
      },
    ],
    farwaniya: [
      {
        q: "What chauffeur services are available in Farwaniya?",
        a: "AB.Limo offers premium chauffeur services in Farwaniya including hotel and apartment transfers, city transportation, and easy access to Kuwait International Airport (KWI).",
      },
      {
        q: "Can I book a limousine for Farwaniya to airport transfers?",
        a: "Yes, we provide reliable Farwaniya-to-Kuwait International Airport (KWI) transfers with professional chauffeurs, popular with families and business travelers.",
      },
      {
        q: "Do you offer intercity transfers from Farwaniya?",
        a: "Yes, we provide transfers from Farwaniya to Kuwait City, Hawalli, Salmiya, and other governorates across Kuwait.",
      },
    ],
    "al-ahmadi": [
      {
        q: "What chauffeur services are available in Al Ahmadi?",
        a: "AB.Limo offers premium chauffeur services in Al Ahmadi including city transportation, hotel transfers, and intercity connections to Kuwait City and the airport.",
      },
      {
        q: "Do you provide corporate transportation in Al Ahmadi?",
        a: "Yes, we provide executive transportation for the oil and industrial sectors in Ahmadi, Fahaheel, and Mangaf with professional chauffeurs.",
      },
      {
        q: "Can I book Al Ahmadi to Kuwait City transfers?",
        a: "Yes, we offer comfortable Al Ahmadi-to-Kuwait City transfers covering approximately 35 km in about 30 minutes.",
      },
    ],
  },
  bahrain: {
    muharraq: [
      {
        q: "What chauffeur services are available in Muharraq?",
        a: "AB.Limo offers premium chauffeur services in Muharraq including airport transfers from Bahrain International Airport (BAH), city transportation, and intercity connections across Bahrain.",
      },
      {
        q: "Do you provide transfers to Bahrain International Airport?",
        a: "Yes, Bahrain International Airport is located in Muharraq, and we provide fast, reliable meet-and-greet transfers to and from the terminal.",
      },
      {
        q: "Can I book a limousine for cultural tours in Muharraq?",
        a: "Yes, we offer chauffeur-driven tours of Muharraq's UNESCO Pearling Trail, Shaikh Ebrahim Center, and traditional houses with professional chauffeurs.",
      },
    ],
  },
};

(async () => {
  let uri = process.env.MONGO_URI || process.env.MONGODB_URI || "";
  if (!uri.includes("/ablimo-db")) {
    const base = uri.split("?")[0].replace(/\/+$/, "");
    const params = uri.includes("?") ? "?" + uri.split("?")[1] : "";
    uri = `${base}/ablimo-db${params}`;
  }
  await mongoose.connect(uri, { dbName: "ablimo-db" });
  const db = mongoose.connection.db;
  const col = db.collection("countries");
  let setCount = 0;

  // Country FAQs
  for (const [slug, faqs] of Object.entries(COUNTRY_FAQS)) {
    const doc = await col.findOne({ slug });
    if (!doc) { console.log(`Country ${slug}: NOT FOUND — skipping`); continue; }
    if ((doc.faqs || []).length > 0) { console.log(`Country ${slug}: already has ${doc.faqs.length} FAQs — skipping`); continue; }
    await col.updateOne({ slug }, { $set: { faqs } });
    console.log(`Country ${slug}: set ${faqs.length} FAQs`);
    setCount++;
  }

  // City FAQs
  for (const [countrySlug, cities] of Object.entries(CITY_FAQS)) {
    for (const [citySlug, faqs] of Object.entries(cities)) {
      const doc = await col.findOne({ slug: countrySlug });
      const city = (doc?.cities || []).find((c) => c.slug === citySlug);
      if (!city) { console.log(`City ${countrySlug}/${citySlug}: NOT FOUND — skipping`); continue; }
      if ((city.faqs || []).length > 0) { console.log(`City ${countrySlug}/${citySlug}: already has ${city.faqs.length} FAQs — skipping`); continue; }
      const res = await col.updateOne(
        { slug: countrySlug, "cities.slug": citySlug },
        { $set: { "cities.$.faqs": faqs } }
      );
      console.log(`City ${countrySlug}/${citySlug}: set ${faqs.length} FAQs (matched ${res.matchedCount})`);
      setCount++;
    }
  }

  console.log(`\nTotal seeded: ${setCount}`);

  // Final verification
  console.log("\n=== Final state ===");
  const docs = await col.find({}).toArray();
  for (const d of docs) {
    const cF = (d.faqs || []).length;
    const cities = (d.cities || [])
      .map((c) => `${c.slug}:${(c.faqs || []).length}`)
      .join(", ");
    console.log(`${d.slug} | country:${cF} | ${cities}`);
  }

  await mongoose.disconnect();
})().catch((e) => {
  console.error("ERR", e.message);
  process.exit(1);
});
