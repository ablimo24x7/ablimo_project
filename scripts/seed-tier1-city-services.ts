/**
 * Seed script: Generate Tier 1 City Service Pages
 *
 * Reads tier1_services.json, groups keywords by route, and creates
 * a full 16-section corporate city page for each city+service combo.
 * English only — no Arabic auto-translation.
 *
 * Usage: npx tsx scripts/seed-tier1-city-services.ts [--dry-run] [--convert] [--service=chauffeur-vip] [--city=riyadh]
 *
 * --convert: upgrade existing WYSIWYG (old template) city articles to the
 *            new City PageSection template instead of skipping them.
 */

import dotenv from "dotenv";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// ── Config ───────────────────────────────────────────────────────
const DRY_RUN = process.argv.includes("--dry-run");
const CONVERT = process.argv.includes("--convert");
const FILTER_SERVICE = process.argv.find(a => a.startsWith("--service="))?.split("=")[1];
const FILTER_CITY = process.argv.find(a => a.startsWith("--city="))?.split("=")[1];

// ── Types ────────────────────────────────────────────────────────
interface KeywordRow {
  keyword: string;
  route: string; // /services/{serviceSlug}/{countrySlug}/{citySlug}
}

interface CityServiceData {
  countrySlug: string;
  citySlug: string;
  serviceSlug: string;
  keywords: string[];
}

interface PageSection {
  id: string;
  type: string;
  variant: string;
  order: number;
  enabled: boolean;
  content: Record<string, any>;
  items: any[];
  settings: Record<string, any>;
  appearance: Record<string, any>;
}

// ── Helpers ──────────────────────────────────────────────────────
let idCounter = 0;
function genId(): string {
  return `sec-${Date.now()}-${++idCounter}-${Math.random().toString(36).substr(2, 6)}`;
}
function genItemId(): string {
  return `itm-${Date.now()}-${++idCounter}-${Math.random().toString(36).substr(2, 6)}`;
}

// ── Parse tier1_services.json ─────────────────────────────────────
function parseTier1Data(): CityServiceData[] {
  const raw = JSON.parse(fs.readFileSync(path.join(process.cwd(), "tier1_services.json"), "utf-8"));
  const map = new Map<string, CityServiceData>();

  for (const row of raw) {
    const keyword = row["Keyword Master List — ab.limo (AB Transportation)"] || "";
    const route = row[""] || "";
    if (!route.startsWith("/services/")) continue;

    const parts = route.replace(/^\//, "").split("/"); // ["services","chauffeur-vip","saudi-arabia","riyadh"]
    if (parts.length < 4) continue;

    const [, serviceSlug, countrySlug, citySlug] = parts;
    const key = `${countrySlug}/${citySlug}/${serviceSlug}`;
    if (!map.has(key)) {
      map.set(key, { countrySlug, citySlug, serviceSlug, keywords: [] });
    }
    map.get(key)!.keywords.push(keyword);
  }

  return Array.from(map.values());
}

// ── City metadata ────────────────────────────────────────────────
const CITY_META: Record<string, { name: string; country: string; airport: string; landmarks: string[]; description: string }> = {
  // Saudi Arabia
  "riyadh": { name: "Riyadh", country: "Saudi Arabia", airport: "King Khalid International Airport (RUH)", landmarks: ["KAFD", "Diplomatic Quarter", "Diriyah Gate", "King Fahd Road", "Olaya District"], description: "the Kingdom's bustling capital and nerve center of Vision 2030 economic diversification" },
  "jeddah": { name: "Jeddah", country: "Saudi Arabia", airport: "King Abdulaziz International Airport (JED)", landmarks: ["Corniche", "Al Balad", "King Abdullah Economic City", "TAIF Gate"], description: "the commercial hub of western Saudi Arabia and gateway to the Holy Mosques" },
  "dammam": { name: "Dammam", country: "Saudi Arabia", airport: "King Fahd International Airport (DMM)", landmarks: ["Dammam Corniche", "King Abdulaziz Port", "Dhahran Expo", "Eastern Province"], description: "the heart of Saudi Arabia's Eastern Province and oil industry corridor" },
  "al-khobar": { name: "Al Khobar", country: "Saudi Arabia", airport: "King Fahd International Airport (DMM)", landmarks: ["Khobar Corniche", "Half Moon Bay", "Dhahran Hills", "Saudi Aramco"], description: "a key business hub in the Eastern Province with proximity to major industrial zones" },
  "mecca": { name: "Mecca", country: "Saudi Arabia", airport: "King Abdulaziz International Airport (JED)", landmarks: ["Grand Mosque", "Masjid al-Haram", "Jabal al-Nour", "Mina Valley"], description: "the holiest city in Islam, welcoming millions of pilgrims annually" },
  "medina": { name: "Medina", country: "Saudi Arabia", airport: "Prince Mohammad bin Abdulaziz Airport (MED)", landmarks: ["Al-Masjid an-Nabawi", "Quba Mosque", "Uhud Mountain", "Al-Baqi Cemetery"], description: "the second holiest city in Islam with deep historical and spiritual significance" },
  "alula": { name: "AlUla", country: "Saudi Arabia", airport: "AlUla International Airport (ULH)", landmarks: ["Hegra", "Dadan", "Jabal Ikmah", "AlUla Old Town"], description: "an archaeological wonder and UNESCO World Heritage destination" },
  "taif": { name: "Taif", country: "Saudi Arabia", airport: "Taif Regional Airport (TIF)", landmarks: ["Al Rudaf Park", "King Fahd Garden", "Shubra Palace", "Souq Okaz"], description: "known as the Bride of the Hijaz with cool mountain retreats and rose gardens" },
  "neom": { name: "NEOM", country: "Saudi Arabia", airport: "NEOM Bay Airport (NUM)", landmarks: ["The Line", "Oxagon", "Trojena", "Sindalah"], description: "the Kingdom's revolutionary giga-project redefining futuristic living" },
  "abha": { name: "Abha", country: "Saudi Arabia", airport: "Abha International Airport (AHB)", landmarks: ["Asir National Park", "Jabal Soudah", "Abha Dam Lake", "Al-Muftaha Village"], description: "the scenic mountain capital of the Asir region" },
  "yanbu": { name: "Yanbu", country: "Saudi Arabia", airport: "Yanbu Airport (YNB)", landmarks: ["Yanbu Al-Sinaiyah", "Yanbu Industrial City", "Yanbu Coast", "Pearl Island"], description: "a major industrial port city on the Red Sea coast" },
  "jubail": { name: "Jubail", country: "Saudi Arabia", airport: "Jubail Airport (QJB)", landmarks: ["Jubail Industrial City", "Jubail Corniche", "Royal Commission Jubail", "Al Nakheel Beach"], description: "home to the world's largest petrochemical complex and industrial hub" },
  "tabuk": { name: "Tabuk", country: "Saudi Arabia", airport: "Tabuk Regional Airport (TBU)", landmarks: ["Al Ula Edge", "Mada'in Saleh", "Tabuk Fort", "Dadan Heritage"], description: "gateway to the historic Nabataean city of Hegra" },
  "najran": { name: "Najran", country: "Saudi Arabia", airport: "Najran Airport (EAM)", landmarks: ["Al-Ukhdood Archaeological Site", "King Fahd Dam", "Najran Fort", "Dhahran Al-Janub"], description: "a culturally rich city near the Yemeni border with ancient heritage" },
  "hail": { name: "Hail", country: "Saudi Arabia", airport: "Hail International Airport (HAS)", landmarks: ["A'arif Fort", "Hail Regional Museum", "Jubbah Rock Art", "Qishla Palace"], description: "known for its hospitable culture and UNESCO-listed rock art sites" },
  // UAE
  "dubai": { name: "Dubai", country: "UAE", airport: "Dubai International Airport (DXB)", landmarks: ["Burj Khalifa", "DIFC", "Dubai Marina", "Palm Jumeirah", "Expo City"], description: "the UAE's premier business and tourism metropolis" },
  "abu-dhabi": { name: "Abu Dhabi", country: "UAE", airport: "Abu Dhabi International Airport (AUH)", landmarks: ["Yas Island", "Al Maryah Island", "Saadiyat Island", "Qasr Al Watan"], description: "the UAE capital and center of government and culture" },
  "sharjah": { name: "Sharjah", country: "UAE", airport: "Sharjah International Airport (SHJ)", landmarks: ["Sharjah Art Foundation", "Al Noor Island", "Sharjah Heritage Area", "Blue Souk"], description: "the cultural capital of the UAE" },
  "ras-al-khaimah": { name: "Ras Al Khaimah", country: "UAE", airport: "Ras Al Khaimah International Airport (RKT)", landmarks: ["Jais Mountain", "DHayah Fort", "Al Jazirah Al Hamra", "Marjan Island"], description: "an emerging adventure and luxury destination in the northern Emirates" },
  "ajman": { name: "Ajman", country: "UAE", airport: "Ajman (via SHJ/DXB)", landmarks: ["Ajman Museum", "Ajman Corniche", "Al Zorah", "Ajman Souq"], description: "the smallest emirate with a growing commercial footprint" },
  "fujairah": { name: "Fujairah", country: "UAE", airport: "Fujairah International Airport (FJR)", landmarks: ["Fujairah Fort", "Al Bidyah Mosque", "Snoopy Island", "Port of Fujairah"], description: "the only emirate on the east coast with direct Indian Ocean access" },
  "umm-al-quwain": { name: "Umm Al Quwain", country: "UAE", airport: "Umm Al Quwain (via SHJ/RKT)", landmarks: ["Umm Al Quwain Fort", "Mangrove Lagoon", "Dreamland Aqua Park", "Old Harbor"], description: "a tranquil emirate with growing eco-tourism and trade" },
  "al-ain": { name: "Al Ain", country: "UAE", airport: "Al Ain International Airport (AAN)", landmarks: ["Al Ain Oasis", "Jebel Hafeet", "Al Ain Zoo", "Al Ain Palace Museum"], description: "the Garden City of the UAE, a UNESCO World Heritage site" },
  // Qatar
  "doha": { name: "Doha", country: "Qatar", airport: "Hamad International Airport (DOH)", landmarks: ["West Bay", "Lusail", "The Pearl", "Museum of Islamic Education", "Msheireb"], description: "Qatar's dynamic capital and major GCC business hub" },
  "lusail": { name: "Lusail", country: "Qatar", airport: "Hamad International Airport (DOH)", landmarks: ["Lusail Stadium", "Marina District", "Lusail Boulevard", "Place Vendôme"], description: "Qatar's futuristic city built from the ground up" },
  "al-wakrah": { name: "Al Wakrah", country: "Qatar", airport: "Hamad International Airport (DOH)", landmarks: ["Al Wakrah Souq", "Al Wakrah Beach", "Al Wakra Heritage Village", "Al Khor Bay"], description: "a historic coastal city south of Doha with rich maritime heritage" },
  "al-khor": { name: "Al Khor", country: "Qatar", airport: "Hamad International Airport (DOH)", landmarks: ["Al Khor Park", "Al Thakhira Beach", "Al Khor Tower", "Igaira Beach"], description: "a northern coastal city known for pearl diving heritage" },
  // Bahrain
  "manama": { name: "Manama", country: "Bahrain", airport: "Bahrain International Airport (BAH)", landmarks: ["Bahrain Financial Harbour", "Bab Al Bahrain", "Juffair", "Adliya"], description: "Bahrain's capital and a leading GCC financial center" },
  "riffa": { name: "Riffa", country: "Bahrain", airport: "Bahrain International Airport (BAH)", landmarks: ["Riffa Fort", "Riffa Views", "East Riffa", "Bahrain International Circuit"], description: "Bahrain's second-largest city with royal and sporting heritage" },
  "muharraq": { name: "Muharraq", country: "Bahrain", airport: "Bahrain International Airport (BAH)", landmarks: ["Bahrain Pearling Trail", "Muharraq Souq", "Sheikh Isa Bin Ali House", "Arad Fort"], description: "a UNESCO World Heritage city and Bahrain's cultural jewel" },
  // Kuwait
  "kuwait-city": { name: "Kuwait City", country: "Kuwait", airport: "Kuwait International Airport (KWI)", landmarks: ["Kuwait Towers", "Al Hamra Tower", "Avenues Mall", "Bayan Palace"], description: "Kuwait's commercial and governmental capital" },
  "salmiya": { name: "Salmiya", country: "Kuwait", airport: "Kuwait International Airport (KWI)", landmarks: ["Scientific Center", "Marina Mall", "Al Fanar Mall", "Salmiya Park"], description: "a major commercial and residential district in Kuwait" },
  "al-ahmadi": { name: "Al Ahmadi", country: "Kuwait", airport: "Kuwait International Airport (KWI)", landmarks: ["Al Ahmadi Opera House", "Fahaheel", "Ahmadi Heritage Area", "Green Island"], description: "the oil capital of Kuwait with a thriving industrial zone" },
  "hawalli": { name: "Hawalli", country: "Kuwait", airport: "Kuwait International Airport (KWI)", landmarks: ["Hawalli Park", "Al Hamra Entertainment City", "Salmiya", "Kuwait Mall"], description: "a central commercial hub with major retail and entertainment" },
  // Oman
  "muscat": { name: "Muscat", country: "Oman", airport: "Muscat International Airport (MCT)", landmarks: ["Sultan Qaboos Grand Mosque", "Royal Opera House", "Muttrah Souq", "Al Alam Palace"], description: "Oman's capital and a gateway to Arabian heritage and modern business" },
  "salalah": { name: "Salalah", country: "Oman", airport: "Salalah Airport (SLL)", landmarks: ["Al Mughsayl Beach", "Taqah Castle", "Wadi Darbat", "Frankincense Land Museum"], description: "the capital of the Dhofar region, famous for Khareef monsoon" },
  "sohar": { name: "Sohar", country: "Oman", airport: "Sohar Airport (OHS)", landmarks: ["Sohar Fort", "Al Jays Beach", "Sohar Port", "Wadi Jizzi"], description: "a major industrial port city in northern Oman" },
  "nizwa": { name: "Nizwa", country: "Oman", airport: "Nizwa (via MCT)", landmarks: ["Nizwa Fort", "Nizwa Souq", "Jebel Akhdar", "Bahla Fort"], description: "the ancient capital of Oman and a cultural treasure" },
};

// ── Service metadata ─────────────────────────────────────────────
const SERVICE_META: Record<string, {
  title: string;
  label: string;
  description: string;
  marqueeItems: { icon: string; label: string }[];
  serviceCards: { icon: string; title: string; description: string; actions: { label: string; href: string; style: string; icon: string }[] }[];
  mediaSections: { eyebrow: string; heading: string; description: string; features: { icon: string; heading: string; description: string }[] }[];
  fleetBadge: string;
  faq: { q: string; a: string }[];
}> = {
  "chauffeur-vip": {
    title: "Chauffeur & VIP Transportation",
    label: "Chauffeur & VIP",
    description: "Premium private chauffeur services with executive-grade vehicles and professionally trained drivers.",
    marqueeItems: [
      { icon: "Crown", label: "VIP Executive Travel" },
      { icon: "UserTie", label: "Professional Chauffeurs" },
      { icon: "Star", label: "Luxury Fleet" },
      { icon: "Shield", label: "Privacy & Security" },
      { icon: "Clock", label: "24/7 Availability" },
    ],
    serviceCards: [
      { icon: "Plane", title: "Airport Meet & Greet", description: "Seamless arrivals and departures with personal chauffeur coordination at major airports.", actions: [{ label: "Book Airport Transfer", href: "#corporate-account", style: "accent", icon: "ChevronRight" }] },
      { icon: "Building", title: "Executive City Rides", description: "On-demand chauffeur service for business meetings, corporate events, and executive travel.", actions: [{ label: "Schedule Executive Ride", href: "#corporate-account", style: "accent", icon: "ChevronRight" }] },
      { icon: "Calendar", title: "Hourly As-Directed", description: "Dedicated chauffeur on standby for dynamic, multi-stop itineraries across the city.", actions: [{ label: "Book As-Directed", href: "#corporate-account", style: "accent", icon: "ChevronRight" }] },
    ],
    mediaSections: [
      { eyebrow: "Premium Fleet", heading: "The Finest Vehicles, The Finest Service.", description: "Every vehicle in our fleet is meticulously maintained and immaculately presented. From the Mercedes S-Class to the Cadillac Escalade, our fleet is engineered to deliver an unparalleled travel experience for discerning executives.", features: [{ icon: "Car", heading: "Flagship Sedans", description: "Mercedes S-Class and BMW 7 Series for solo executive travel." }, { icon: "ShieldCheck", heading: "TGA Compliant", description: "All vehicles fully licensed and insured to international standards." }] },
      { eyebrow: "Chauffeur Excellence", heading: "Professionally Trained Executive Chauffeurs.", description: "Our chauffeurs undergo rigorous training in defensive driving, navigation, and professional etiquette. Each driver is background-checked, NDA-bound, and trained to the highest standards of discretion and professionalism.", features: [{ icon: "Award", heading: "Certified Professionals", description: "Advanced defensive driving certifications and professional etiquette training." }, { icon: "Lock", heading: "NDA & Background Checks", description: "Legally binding non-disclosure agreements and exhaustive background screening." }] },
      { eyebrow: "City Coverage", heading: "Unlimited Access Across the City.", description: "Whether you need transportation to the business district, diplomatic areas, or cultural landmarks, our chauffeurs know every route. We navigate complex urban environments with ease, ensuring timely arrivals for every appointment.", features: [{ icon: "MapPin", heading: "Local Route Expertise", description: "Deep knowledge of traffic patterns, shortcuts, and optimal routing." }, { icon: "Clock", heading: "Real-Time Dispatch", description: "Instant vehicle positioning for urgent executive travel needs." }] },
      { eyebrow: "Corporate Travel", heading: "Built for Business Travelers.", description: "Our VIP chauffeur service is designed for the demands of corporate travel. From multi-stop roadshows to confidential meetings, we ensure your executive movement is seamless, productive, and completely secure.", features: [{ icon: "Briefcase", heading: "Corporate Billing", description: "Centralized invoicing and VAT-compliant receipts for expense management." }, { icon: "FileText", heading: "Travel Reports", description: "Detailed trip reports for corporate travel management and auditing." }] },
      { eyebrow: "Security Protocol", heading: "Discretion Guaranteed.", description: "For high-profile executives and VIP clients, privacy is paramount. Our chauffeurs maintain strict confidentiality and follow established security protocols for every journey.", features: [{ icon: "Eye", heading: "Privacy First", description: "Strict confidentiality protocols for all executive passengers." }, { icon: "Shield", heading: "Secure Routes", description: "Pre-planned secure routing for high-profile and diplomatic travel." }] },
      { eyebrow: "Airport Services", heading: "Seamless Airport Transfers.", description: "From arrival to departure, we handle every detail of your airport journey. Our chauffeurs monitor flight schedules in real-time and coordinate ground logistics for a stress-free experience.", features: [{ icon: "Plane", heading: "Flight Monitoring", description: "Real-time flight tracking for precise pickup timing." }, { icon: "Handshake", heading: "Meet & Greet", description: "Personalized greeting at arrivals with name board and assistance." }] },
      { eyebrow: "Hourly Service", heading: "Your Time, Your Schedule.", description: "Our As-Directed hourly service provides maximum flexibility for executives with unpredictable schedules. A dedicated chauffeur remains on standby, ready to move at a moment's notice.", features: [{ icon: "Clock", heading: "Flexible Scheduling", description: "Book by the hour with no fixed itinerary requirements." }, { icon: "Smartphone", heading: "On-Demand Changes", description: "Modify your route or schedule in real-time via your chauffeur." }] },
      { eyebrow: "Long-Distance", heading: "Inter-City Executive Transfers.", description: "When business takes you beyond the city, our long-distance chauffeur service provides a comfortable, productive alternative to commercial flights. Travel between cities in complete luxury.", features: [{ icon: "Route", heading: "Cross-City Routes", description: "Premium inter-city transfers with executive-grade comfort." }, { icon: "Battery", heading: "Refreshment Included", description: "Complimentary refreshments and amenities for extended journeys." }] },
      { eyebrow: "Event Transport", heading: "VIP Transport for Special Events.", description: "From galas and conferences to private celebrations, we provide coordinated VIP transportation that matches the prestige of your events.", features: [{ icon: "Calendar", heading: "Event Coordination", description: "Dedicated dispatch for large-scale event transportation." }, { icon: "Users", heading: "Group VIP Service", description: "Multiple vehicles with synchronized scheduling for delegations." }] },
      { eyebrow: "Technology", heading: "Connected, Intelligent Mobility.", description: "Our technology platform gives you complete visibility and control over your chauffeur experience. From booking to billing, every aspect is managed digitally.", features: [{ icon: "Smartphone", heading: "Digital Booking", description: "Instant booking and confirmation via our online platform." }, { icon: "Map", heading: "Live Tracking", description: "Real-time GPS tracking for complete journey visibility." }] },
    ],
    fleetBadge: "VIP Fleet",
    faq: [
      { q: "How do I book a chauffeur for VIP transportation?", a: "You can book through our online platform, by phone, or via your corporate travel manager. Simply specify your pickup location, destination, and preferred vehicle. For recurring needs, we offer corporate accounts with priority dispatch." },
      { q: "What vehicles are available for executive chauffeur service?", a: "Our fleet includes the Mercedes S-Class, BMW 7 Series, Cadillac Escalade, Mercedes V-Class, and Mercedes Sprinter. All vehicles are late-model, immaculately maintained, and equipped with executive amenities." },
      { q: "Are your chauffeurs licensed and background-checked?", a: "Yes. All AB chauffeurs hold valid transport licenses, undergo exhaustive background checks, complete defensive driving certifications, and sign legally binding non-disclosure agreements." },
      { q: "Can I book an as-directed hourly chauffeur?", a: "Absolutely. Our As-Directed service provides a dedicated chauffeur on standby for dynamic, multi-stop itineraries. This is ideal for executives with unpredictable meeting schedules across the city." },
    ],
  },
  "airport-transfers": {
    title: "Airport Transfers",
    label: "Airport Transfers",
    description: "Reliable airport transfer services with flight tracking, meet & greet, and seamless ground logistics.",
    marqueeItems: [
      { icon: "Plane", label: "Airport Transfers" },
      { icon: "Clock", label: "Flight Monitoring" },
      { icon: "Handshake", label: "Meet & Greet" },
      { icon: "Car", label: "Door-to-Terminal" },
      { icon: "Shield", label: "Reliable & Punctual" },
    ],
    serviceCards: [
      { icon: "Plane", title: "Arrival Transfers", description: "Chauffeur waiting at arrivals with live flight monitoring for seamless pickup upon landing.", actions: [{ label: "Book Arrival Transfer", href: "#corporate-account", style: "accent", icon: "ChevronRight" }] },
      { icon: "PlaneTakeoff", title: "Departure Transfers", description: "Timely airport drops with optimal route planning and buffer time for check-in.", actions: [{ label: "Schedule Departure", href: "#corporate-account", style: "accent", icon: "ChevronRight" }] },
      { icon: "Repeat", title: "Round-Trip Service", description: "Book both arrival and departure transfers for a complete airport travel solution.", actions: [{ label: "Book Round-Trip", href: "#corporate-account", style: "accent", icon: "ChevronRight" }] },
    ],
    mediaSections: [
      { eyebrow: "Flight Intelligence", heading: "Real-Time Flight Monitoring.", description: "Our dispatch team monitors your flight in real-time, adjusting pickup times automatically for delays or early arrivals. You'll never wait for your chauffeur, and your chauffeur will never wait at an empty terminal.", features: [{ icon: "Plane", heading: "Live Flight Tracking", description: "Automated schedule adjustments for delays and early arrivals." }, { icon: "Bell", heading: "Instant Notifications", description: "SMS and email alerts when your chauffeur is en route." }] },
      { eyebrow: "Airport Expertise", heading: "Terminal Knowledge That Matters.", description: "Our chauffeurs are trained on the layout of every major airport. From FBO private terminals to international arrivals, we know the optimal pickup points, parking zones, and routes to get you moving.", features: [{ icon: "MapPin", heading: "Terminal Navigation", description: "Expert knowledge of airport layouts and optimal pickup points." }, { icon: "Building", heading: "FBO Access", description: "Direct tarmac access for private aviation and VIP terminal transfers." }] },
      { eyebrow: "Meet & Greet", heading: "Personalized Airport Welcome.", description: "Your chauffeur will greet you at the terminal with a personalized name board, assist with luggage, and escort you to your vehicle. A warm, professional welcome after a long journey.", features: [{ icon: "User", heading: "Name Board Greeting", description: "Personalized welcome at the terminal with your name displayed." }, { icon: "Luggage", heading: "Luggage Assistance", description: "Full luggage handling from terminal to vehicle." }] },
      { eyebrow: "Corporate Accounts", heading: "Streamlined Business Travel.", description: "Set up a corporate airport transfer account for centralized billing, priority dispatch, and seamless expense management across your organization.", features: [{ icon: "FileInvoiceDollar", heading: "Centralized Billing", description: "Single invoice for all airport transfers with VAT compliance." }, { icon: "CreditCard", heading: "Corporate Rates", description: "Volume-based pricing for organizations with regular airport travel." }] },
      { eyebrow: "Fleet Options", heading: "The Right Vehicle for Every Journey.", description: "From solo travelers to group arrivals, our fleet provides the perfect match for your airport transfer needs. All vehicles are executive-grade, immaculately presented, and equipped for comfort.", features: [{ icon: "Car", heading: "Executive Sedans", description: "Mercedes S-Class and BMW 7 Series for solo and dual travelers." }, { icon: "Car", heading: "Group Vehicles", description: "V-Class and Sprinter for teams and delegations." }] },
      { eyebrow: "Safety Standards", heading: "Safety Above All.", description: "Every airport transfer is backed by our commitment to safety. Our vehicles undergo rigorous maintenance, and our chauffeurs follow strict safety protocols for every journey.", features: [{ icon: "Shield", heading: "Vehicle Inspections", description: "Daily safety checks and regular professional maintenance." }, { icon: "Award", heading: "Trained Drivers", description: "Advanced defensive driving certifications for all chauffeurs." }] },
      { eyebrow: "Intercity Transfers", heading: "Airport Transfers Beyond the City.", description: "Need to reach an airport in a neighboring city? Our intercity airport transfer service provides comfortable, direct transport between cities and airports.", features: [{ icon: "Route", heading: "Cross-City Routes", description: "Direct transfers between cities and airports with no detours." }, { icon: "Clock", heading: "Flexible Timing", description: "Book early morning or late night transfers with guaranteed availability." }] },
      { eyebrow: "VIP Terminal", heading: "Private Aviation Coordination.", description: "For private jet and charter flights, we coordinate directly with Fixed-Base Operators (FBOs) to ensure seamless tarmac-to-vehicle transitions.", features: [{ icon: "Plane", heading: "FBO Partnerships", description: "Direct coordination with private aviation terminals." }, { icon: "Lock", heading: "Discreet Service", description: "Confidential transfers for high-profile private aviation clients." }] },
      { eyebrow: "Group Airport", heading: "Delegation & Group Transfers.", description: "Coordinating airport transfers for conferences, corporate retreats, or large delegations? Our group airport transfer service manages logistics for multiple passengers simultaneously.", features: [{ icon: "Users", heading: "Fleet Coordination", description: "Multiple vehicles with synchronized scheduling for groups." }, { icon: "ClipboardList", heading: "Manifest Management", description: "Digital passenger lists and real-time arrival coordination." }] },
      { eyebrow: "Technology", heading: "Smart Airport Transfers.", description: "From instant booking to live tracking, our technology platform makes airport transfers effortless. Manage all your bookings from a single dashboard.", features: [{ icon: "Smartphone", heading: "Mobile Booking", description: "Book and manage transfers from your smartphone." }, { icon: "Map", heading: "Live Chauffeur Tracking", description: "Real-time GPS tracking from dispatch to terminal." }] },
    ],
    fleetBadge: "Airport Fleet",
    faq: [
      { q: "How does flight monitoring work for airport transfers?", a: "Our system tracks your flight in real-time. If your flight is delayed or arrives early, your chauffeur's pickup time is automatically adjusted. You'll receive a notification when your chauffeur is dispatched." },
      { q: "Can you pick me up from a private aviation terminal?", a: "Yes, we maintain direct relationships with Fixed-Base Operators (FBOs) at major airports. Our chauffeurs can access private terminals for seamless tarmac-to-vehicle transfers." },
      { q: "What happens if my flight is significantly delayed?", a: "Our dispatch team monitors all flights continuously. For significant delays, your chauffeur is repositioned or reassigned as needed. You will never be left waiting at an empty terminal." },
      { q: "Do you offer airport transfers for group travel?", a: "Yes. We provide coordinated group airport transfers using our V-Class and Sprinter fleet. We manage passenger manifests and ensure all vehicles arrive simultaneously." },
    ],
  },
  "corporate-transportation": {
    title: "Corporate Transportation",
    label: "Corporate Transportation",
    description: "Enterprise-grade transportation solutions for corporate staff, meetings, and business operations.",
    marqueeItems: [
      { icon: "Building", label: "Corporate Mobility" },
      { icon: "Briefcase", label: "Business Travel" },
      { icon: "Users", label: "Staff Transportation" },
      { icon: "CalendarCheck", label: "Scheduled Services" },
      { icon: "TrendingUp", label: "Scalable Solutions" },
    ],
    serviceCards: [
      { icon: "Users", title: "Employee Transport", description: "Reliable daily shuttle services for corporate staff with fixed routes and schedules.", actions: [{ label: "Configure Staff Routes", href: "#corporate-account", style: "accent", icon: "ChevronRight" }] },
      { icon: "Building", title: "Executive Mobility", description: "On-demand executive vehicles for C-suite travel, client meetings, and business roadshows.", actions: [{ label: "Book Executive Vehicle", href: "#corporate-account", style: "accent", icon: "ChevronRight" }] },
      { icon: "Calendar", title: "Contract Solutions", description: "Long-term fleet leasing and dedicated vehicle programs for sustained corporate operations.", actions: [{ label: "Request Contract Quote", href: "#corporate-account", style: "accent", icon: "ChevronRight" }] },
    ],
    mediaSections: [
      { eyebrow: "Enterprise Solutions", heading: "Scalable Corporate Mobility.", description: "As your business grows, so do your transportation needs. AB provides enterprise-grade mobility solutions that scale seamlessly with your organization — from startups with 5 employees to multinational corporations with thousands.", features: [{ icon: "TrendingUp", heading: "Scalable Fleet", description: "Expand or reduce fleet allocation as your business needs evolve." }, { icon: "BarChart", heading: "Usage Analytics", description: "Detailed reports on fleet utilization and cost optimization." }] },
      { eyebrow: "Daily Operations", heading: "Employee Transport That Works.", description: "Our corporate shuttle and employee transport services ensure your team arrives on time, every day. Fixed routes, reliable schedules, and comfortable vehicles — the foundation of productive workforce mobility.", features: [{ icon: "Clock", heading: "Punctual Schedules", description: "Fixed-route shuttles that run on time, every time." }, { icon: "MapPin", heading: "Multi-Stop Routes", description: "Optimized routes covering residential areas to office locations." }] },
      { eyebrow: "Cost Efficiency", heading: "Optimized Corporate Travel Spend.", description: "Reduce your corporate transportation costs without compromising quality. Our fleet management solutions provide transparent pricing, consolidated billing, and volume-based discounts.", features: [{ icon: "DollarSign", heading: "Transparent Pricing", description: "Clear, upfront pricing with no hidden fees or surcharges." }, { icon: "PieChart", heading: "Cost Reports", description: "Monthly cost breakdowns and optimization recommendations." }] },
      { eyebrow: "SAP Integration", heading: "Automated Corporate Billing.", description: "Our SAP Concur and corporate expense system integration automates the billing process. VAT-compliant e-receipts are generated automatically and mapped to your cost centers.", features: [{ icon: "FileInvoiceDollar", heading: "SAP Concur", description: "Automated receipt generation mapped to corporate cost centers." }, { icon: "Receipt", heading: "VAT Compliance", description: "Full VAT-compliant invoicing for regulatory compliance." }] },
      { eyebrow: "Fleet Management", heading: "Dedicated Fleet Programs.", description: "For organizations with ongoing mobility needs, we provide dedicated fleet programs with assigned vehicles and chauffeurs. Long-term contracts ensure priority availability and preferential rates.", features: [{ icon: "Car", heading: "Assigned Vehicles", description: "Dedicated vehicles for your organization with flexible terms." }, { icon: "Calendar", heading: "Long-Term Contracts", description: "Preferential pricing and priority fleet access." }] },
      { eyebrow: "Safety & Compliance", heading: "Duty of Care.", description: "Employee safety is non-negotiable. Our fleet and chauffeurs meet the highest safety standards, providing complete duty of care for all corporate passengers.", features: [{ icon: "Shield", heading: "Safety Standards", description: "Rigorous vehicle maintenance and chauffeur safety protocols." }, { icon: "CheckCircle", heading: "Insurance Coverage", description: "Comprehensive insurance for all corporate passengers." }] },
      { eyebrow: "Event Logistics", heading: "Corporate Event Transport.", description: "From annual general meetings to team-building retreats, we provide coordinated transportation for corporate events of any scale.", features: [{ icon: "Calendar", heading: "Event Planning", description: "Pre-event logistics coordination and fleet allocation." }, { icon: "Users", heading: "Group Coordination", description: "Multi-vehicle deployments with real-time passenger tracking." }] },
      { eyebrow: "Technology Platform", heading: "Digital Fleet Management.", description: "Our corporate portal gives travel managers complete visibility and control over fleet operations, bookings, and expenses.", features: [{ icon: "Monitor", heading: "Corporate Dashboard", description: "Centralized platform for booking, tracking, and reporting." }, { icon: "Smartphone", heading: "Mobile Access", description: "Book and manage from anywhere via mobile app." }] },
      { eyebrow: "Inter-Office", heading: "Multi-Location Connectivity.", description: "For corporations with multiple offices, we provide scheduled inter-office shuttle services connecting campuses and business parks.", features: [{ icon: "Building", heading: "Campus Shuttles", description: "Regular shuttle service between corporate campuses." }, { icon: "Route", heading: "Optimized Routes", description: "Efficient multi-stop routes connecting office locations." }] },
      { eyebrow: "Green Mobility", heading: "Sustainable Corporate Travel.", description: "Reduce your organization's carbon footprint with our sustainable mobility options. We offer hybrid and electric vehicle alternatives for environmentally conscious corporations.", features: [{ icon: "Leaf", heading: "Eco Fleet", description: "Hybrid and electric vehicle options for green corporate travel." }, { icon: "BarChart", heading: "Carbon Reports", description: "Monthly carbon offset reports for ESG compliance." }] },
    ],
    fleetBadge: "Corporate Fleet",
    faq: [
      { q: "What corporate transportation solutions do you offer?", a: "We provide employee shuttles, executive on-demand vehicles, long-term fleet leasing, corporate event transport, and inter-office connectivity. All services include centralized billing and corporate account management." },
      { q: "Can you handle large-scale employee transportation?", a: "Yes. We manage daily employee shuttle operations for organizations of all sizes, with fixed routes, real-time tracking, and guaranteed punctuality. Our fleet scales to match your workforce." },
      { q: "Do you integrate with corporate expense systems?", a: "Yes. We integrate with SAP Concur and other corporate expense platforms. VAT-compliant e-receipts are generated automatically and mapped to your corporate cost centers." },
      { q: "What safety measures are in place for corporate passengers?", a: "All vehicles undergo rigorous safety inspections, chauffeurs hold defensive driving certifications, and comprehensive insurance covers every passenger. We maintain full duty of care compliance." },
    ],
  },
  "event-transportation": {
    title: "Event Transportation",
    label: "Event Transportation",
    description: "Large-scale event logistics including conferences, exhibitions, MICE, and VIP delegations.",
    marqueeItems: [
      { icon: "Calendar", label: "Event Logistics" },
      { icon: "Users", label: "Delegate Transport" },
      { icon: "Bus", label: "VIP Coach Charter" },
      { icon: "Network", label: "Multi-Venue Coordination" },
      { icon: "Mic", label: "Conference Support" },
    ],
    serviceCards: [
      { icon: "Mic", title: "Conference Transport", description: "Coordinated shuttle services for delegates, speakers, and VIP attendees at conferences.", actions: [{ label: "Plan Conference Transport", href: "#corporate-account", style: "accent", icon: "ChevronRight" }] },
      { icon: "Building2", title: "Exhibition Logistics", description: "Fleet deployment for trade shows, exhibitions, and large-scale commercial events.", actions: [{ label: "Request Exhibition Quote", href: "#corporate-account", style: "accent", icon: "ChevronRight" }] },
      { icon: "Star", title: "VIP Delegation", description: "Discreet, coordinated transport for VIP delegations, dignitaries, and high-profile guests.", actions: [{ label: "Arrange VIP Delegation", href: "#corporate-account", style: "accent", icon: "ChevronRight" }] },
    ],
    mediaSections: [
      { eyebrow: "Event Logistics", heading: "Orchestrating Complex Event Transport.", description: "Major events demand flawless logistics. AB provides comprehensive event transportation management — from initial planning through execution and post-event dispersal. Our Transport Control Room coordinates every vehicle in real-time.", features: [{ icon: "Network", heading: "Control Room", description: "Centralized command center for real-time fleet coordination." }, { icon: "Radio", heading: "Live Dispatch", description: "Instant vehicle repositioning based on real-time demand." }] },
      { eyebrow: "MICE Transport", heading: "Meetings, Incentives, Conferences, Exhibitions.", description: "We specialize in MICE transportation — the complex logistics of moving hundreds or thousands of delegates between hotels, venues, and social events on tight schedules.", features: [{ icon: "Users", heading: "Delegate Management", description: "Digital manifests and real-time passenger tracking." }, { icon: "Hotel", heading: "Hotel Coordination", description: "Seamless transfers between multiple hotel properties." }] },
      { eyebrow: "VIP Protocols", heading: "Dignitary & VVIP Transport.", description: "For heads of state, royal delegations, and international VIPs, we provide transport that meets the highest protocol standards. Security-cleared chauffeurs, armored vehicles available.", features: [{ icon: "Crown", heading: "Protocol Standards", description: "Transport that meets international diplomatic protocol." }, { icon: "Shield", heading: "Security Detail", description: "Security-cleared chauffeurs and vehicles for VVIP transport." }] },
      { eyebrow: "Fleet Deployment", heading: "Multi-Vehicle Coordination.", description: "From executive sedans to luxury coaches, we deploy the right mix of vehicles for your event. Our fleet management ensures synchronized arrivals and departures across all venues.", features: [{ icon: "Bus", heading: "VIP Coaches", description: "Luxury coaches for group transfers between venues." }, { icon: "Car", heading: "Executive Sedans", description: "Individual VIP transfers with dedicated chauffeurs." }] },
      { eyebrow: "Traffic Management", heading: "Navigating Event Congestion.", description: "Major events create significant traffic challenges. Our local intelligence and real-time monitoring allow us to navigate congestion, adjust routes dynamically, and ensure timely arrivals.", features: [{ icon: "Map", heading: "Dynamic Routing", description: "Real-time route adjustments based on traffic conditions." }, { icon: "Clock", heading: "Buffer Planning", description: "Built-in time buffers for traffic and security delays." }] },
      { eyebrow: "Scalability", heading: "From 10 to 10,000 Passengers.", description: "Whether you need transport for a small executive retreat or a global summit, our fleet and logistics scale to match. We've successfully managed events with over 5,000 daily transfers.", features: [{ icon: "TrendingUp", heading: "Rapid Scaling", description: "Quickly deploy additional vehicles for unexpected demand." }, { icon: "CheckCircle", heading: "Proven Track Record", description: "Successfully managed logistics for major international events." }] },
      { eyebrow: "Venue Expertise", heading: "Local Venue Intelligence.", description: "We maintain detailed knowledge of major event venues, including entry/exit points, loading zones, VIP access routes, and parking facilities for efficient fleet operations.", features: [{ icon: "MapPin", heading: "Venue Mapping", description: "Detailed vehicle positioning maps for every major venue." }, { icon: "Building", heading: "Load Zone Access", description: "Coordinated access to VIP and loading zones at event venues." }] },
      { eyebrow: "Branding", heading: "Branded Event Transport.", description: "Enhance your event's brand presence with customized vehicle branding, chauffeur uniforms, and coordinated fleet presentation.", features: [{ icon: "Tag", heading: "Vehicle Wraps", description: "Custom vehicle branding for event visibility." }, { icon: "Award", heading: "Uniform Coordination", description: "Branded chauffeur uniforms for professional presentation." }] },
      { eyebrow: "Post-Event", heading: "Seamless Dispersal.", description: "After the event, efficient dispersal is critical. We manage staggered departures, coordinate with venue security, and ensure all delegates reach their destinations safely.", features: [{ icon: "LogOut", heading: "Staggered Departures", description: "Coordinated dispersal to avoid congestion at event exits." }, { icon: "CheckCircle", heading: "Confirmation Tracking", description: "Real-time confirmation that all delegates have departed." }] },
      { eyebrow: "Budget Control", heading: "Transparent Event Budgeting.", description: "We provide detailed cost proposals, fixed-price options, and transparent billing to help you manage your event transportation budget with confidence.", features: [{ icon: "DollarSign", heading: "Fixed Pricing", description: "Predictable costs with fixed-price event packages." }, { icon: "FileText", heading: "Budget Reports", description: "Detailed cost breakdowns for event accounting." }] },
    ],
    fleetBadge: "Event Fleet",
    faq: [
      { q: "Can you manage transport for large conferences with 500+ delegates?", a: "Absolutely. We have extensive experience managing MICE transportation for conferences of all sizes. Our Transport Control Room coordinates multiple vehicle types in real-time, managing delegate manifests and ensuring punctual arrivals." },
      { q: "Do you provide VIP transport for dignitaries at events?", a: "Yes. We provide protocol-standard transport for VVIP guests, including security-cleared chauffeurs, armored vehicles on request, and discreet coordinated movement between venues." },
      { q: "How do you handle traffic congestion during major events?", a: "Our local operations team monitors traffic in real-time and uses alternative routing to avoid congestion. We build buffer time into all event schedules and maintain direct communication with event security." },
      { q: "Can you provide branded vehicles for our event?", a: "Yes. We offer custom vehicle wraps, branded chauffeur uniforms, and coordinated fleet presentation to enhance your event's brand visibility." },
    ],
  },
  "bus-coach-hire": {
    title: "Bus & Coach Hire",
    label: "Bus & Coach Hire",
    description: "Premium bus and coach charter services for group travel, corporate outings, and large transfers.",
    marqueeItems: [
      { icon: "Bus", label: "Coach Charter" },
      { icon: "Users", label: "Group Travel" },
      { icon: "Building", label: "Corporate Shuttles" },
      { icon: "Map", label: "Multi-Stop Routes" },
      { icon: "CalendarCheck", label: "Scheduled Services" },
    ],
    serviceCards: [
      { icon: "Bus", title: "Luxury Coach Charter", description: "Premium Mercedes Sprinter and luxury coaches for corporate outings, sightseeing, and group transfers.", actions: [{ label: "Charter a Coach", href: "#corporate-account", style: "accent", icon: "ChevronRight" }] },
      { icon: "Building2", title: "Corporate Shuttle", description: "Fixed-route shuttle services for employee transport between offices, campuses, and transit hubs.", actions: [{ label: "Configure Shuttle Route", href: "#corporate-account", style: "accent", icon: "ChevronRight" }] },
      { icon: "Map", title: "Multi-City Tours", description: "Comfortable long-distance coach travel for group tours and multi-city itineraries.", actions: [{ label: "Plan Multi-City Trip", href: "#corporate-account", style: "accent", icon: "ChevronRight" }] },
    ],
    mediaSections: [
      { eyebrow: "Fleet Quality", heading: "Premium Coaches for Premium Experiences.", description: "Our coach fleet consists of late-model Mercedes Sprinters and luxury touring coaches, maintained to the highest standards. Every vehicle features climate control, plush seating, and onboard amenities for comfortable group travel.", features: [{ icon: "Bus", heading: "Luxury Sprinters", description: "Mercedes Sprinter vans with executive seating for up to 14 passengers." }, { icon: "Armchair", heading: "Premium Comfort", description: "Climate control, USB charging, and onboard refreshments." }] },
      { eyebrow: "Corporate Shuttles", heading: "Reliable Daily Employee Transport.", description: "Our corporate shuttle service provides fixed-route, scheduled transportation for employees. From residential areas to office campuses, we ensure your team arrives on time every day.", features: [{ icon: "Clock", heading: "Fixed Schedules", description: "Consistent daily pickup and drop-off times." }, { icon: "Route", heading: "Optimized Routes", description: "Efficient multi-stop routes covering key residential areas." }] },
      { eyebrow: "Group Tours", heading: "Comfortable Group Exploration.", description: "Whether it's a corporate team outing, VIP city tour, or multi-day excursion, our coach charter service provides comfortable, guided group travel with experienced chauffeurs.", features: [{ icon: "Map", heading: "Custom Itineraries", description: "Flexible routing based on your group's preferences." }, { icon: "Camera", heading: "Sightseeing Routes", description: "Curated routes covering major landmarks and attractions." }] },
      { eyebrow: "Event Coaches", heading: "Large-Scale Event Transfers.", description: "For conferences, weddings, and large events, we deploy fleets of coaches to transport guests efficiently between venues, hotels, and airports.", features: [{ icon: "Calendar", heading: "Event Coordination", description: "Pre-planned logistics with timed departures and arrivals." }, { icon: "Users", heading: "Guest Management", description: "Digital passenger manifests and real-time tracking." }] },
      { eyebrow: "Safety Standards", heading: "Uncompromising Safety.", description: "Every coach undergoes daily safety inspections and regular professional maintenance. Our chauffeurs hold commercial driving certifications and advanced safety training.", features: [{ icon: "Shield", heading: "Daily Inspections", description: "Pre-trip safety checks on every vehicle." }, { icon: "Award", heading: "Licensed Drivers", description: "Commercial driving certifications and safety training." }] },
      { eyebrow: "Flexibility", heading: "Adaptable to Your Schedule.", description: "Our coach hire service is designed for flexibility. Whether you need a one-time charter, a recurring shuttle, or a multi-day tour, we adapt to your timeline and requirements.", features: [{ icon: "Calendar", heading: "Flexible Booking", description: "Book by the hour, day, or for multi-day engagements." }, { icon: "Phone", heading: "On-Call Dispatch", description: "Request additional coaches or schedule changes in real-time." }] },
      { eyebrow: "Capacity", heading: "From 14 to 50+ Passengers.", description: "Our fleet accommodates groups of all sizes. From intimate Sprinter vans to full-size touring coaches, we have the capacity for any group travel requirement.", features: [{ icon: "Users", heading: "Flexible Capacity", description: "Vehicles ranging from 14-seat Sprinters to 50-seat coaches." }, { icon: "Plus", heading: "Fleet Scaling", description: "Deploy multiple vehicles for large group requirements." }] },
      { eyebrow: "Cost Effective", heading: "Group Travel Made Affordable.", description: "Coach hire is the most cost-effective way to transport groups. Our transparent pricing and volume discounts make group travel accessible for organizations of all sizes.", features: [{ icon: "DollarSign", heading: "Group Rates", description: "Competitive per-passenger pricing for group travel." }, { icon: "Percent", heading: "Volume Discounts", description: "Reduced rates for recurring and multi-day bookings." }] },
      { eyebrow: "Long Distance", heading: "Inter-City Coach Travel.", description: "Travel between cities in comfort with our long-distance coach service. Spacious seating, climate control, and onboard amenities make inter-city group travel pleasant.", features: [{ icon: "Route", heading: "Cross-City Routes", description: "Direct coach service between major cities." }, { icon: "Battery", heading: "Onboard Amenities", description: "Refreshments, entertainment, and rest stops included." }] },
      { eyebrow: "Booking", heading: "Easy Group Booking.", description: "Our booking process is designed for group organizers. Get instant quotes, manage passenger lists, and coordinate pickups all from a single platform.", features: [{ icon: "Smartphone", heading: "Online Booking", description: "Instant quotes and booking via our digital platform." }, { icon: "ClipboardList", heading: "Passenger Management", description: "Digital manifests and real-time passenger coordination." }] },
    ],
    fleetBadge: "Coach Fleet",
    faq: [
      { q: "What group sizes can you accommodate with coach hire?", a: "Our fleet includes Mercedes Sprinter vans (up to 14 passengers), minibuses (up to 30 passengers), and full-size luxury coaches (up to 50 passengers). We can deploy multiple vehicles for larger groups." },
      { q: "Can you provide fixed-route corporate shuttle services?", a: "Yes. We design and operate fixed-route shuttle services for corporations, covering residential areas, transit hubs, and office campuses. Schedules are optimized for your workforce timing." },
      { q: "Do your coaches have onboard amenities?", a: "All our coaches feature climate control, plush reclining seats, USB charging ports, and onboard Wi-Fi. Longer routes include complimentary refreshments and entertainment systems." },
      { q: "How far in advance should I book group coach travel?", a: "We recommend booking at least 2 weeks in advance for standard group travel, and 4+ weeks for large events or peak seasons. Same-day bookings are subject to availability." },
    ],
  },
  "tourism-transportation": {
    title: "Tourism Transportation",
    label: "Tourism Transportation",
    description: "Guided tourism transfers, sightseeing tours, and travel services for leisure travelers.",
    marqueeItems: [
      { icon: "Camera", label: "Sightseeing Tours" },
      { icon: "Map", label: "City Exploration" },
      { icon: "Landmark", label: "Heritage Sites" },
      { icon: "Sun", label: "Leisure Travel" },
      { icon: "Compass", label: "Guided Routes" },
    ],
    serviceCards: [
      { icon: "Camera", title: "City Sightseeing Tours", description: "Curated city tours with expert chauffeurs covering major landmarks, cultural sites, and hidden gems.", actions: [{ label: "Book City Tour", href: "#corporate-account", style: "accent", icon: "ChevronRight" }] },
      { icon: "Mountain", title: "Day Excursions", description: "Full-day excursions to heritage sites, natural wonders, and cultural destinations.", actions: [{ label: "Plan Day Excursion", href: "#corporate-account", style: "accent", icon: "ChevronRight" }] },
      { icon: "Users", title: "Group Tourism", description: "Coordinated group tourism transport for travel agencies, corporate retreats, and tour operators.", actions: [{ label: "Request Group Quote", href: "#corporate-account", style: "accent", icon: "ChevronRight" }] },
    ],
    mediaSections: [
      { eyebrow: "City Discovery", heading: "Explore the City in Luxury.", description: "Discover the city's most iconic landmarks and hidden treasures with our luxury tourism transportation. Our experienced chauffeurs double as knowledgeable guides, providing insights into local culture, history, and cuisine.", features: [{ icon: "MapPin", heading: "Iconic Landmarks", description: "Curated routes covering the city's top attractions." }, { icon: "BookOpen", heading: "Cultural Insights", description: "Knowledgeable chauffeurs sharing local history and culture." }] },
      { eyebrow: "Heritage Tours", heading: "Journey Through History.", description: "Explore ancient heritage sites, UNESCO World Heritage locations, and historic districts with comfortable, air-conditioned vehicles and expert navigation.", features: [{ icon: "Landmark", heading: "Heritage Sites", description: "Visits to UNESCO sites and historic landmarks." }, { icon: "Clock", heading: "Flexible Duration", description: "Half-day, full-day, and multi-day tour options." }] },
      { eyebrow: "Family Friendly", heading: "Travel Comfort for the Whole Family.", description: "Our tourism vehicles are equipped with child seats, extra luggage space, and climate control to ensure a comfortable experience for families traveling with children.", features: [{ icon: "Baby", heading: "Child Seats", description: "Age-appropriate safety seats for young travelers." }, { icon: "Luggage", heading: "Luggage Space", description: "Ample room for shopping and travel bags." }] },
      { eyebrow: "Photography Tours", heading: "Capture Every Moment.", description: "Our photography-focused tour service provides strategic stops at scenic viewpoints, architectural marvels, and picturesque locations for the perfect shot.", features: [{ icon: "Camera", heading: "Scenic Stops", description: "Planned stops at the most photogenic locations." }, { icon: "Sunset", heading: "Golden Hour Tours", description: "Timed tours to capture perfect lighting conditions." }] },
      { eyebrow: "Multi-Day Tours", heading: "Extended Exploration.", description: "For visitors wanting to explore beyond the city, we offer multi-day tour packages with premium accommodation transfers and guided excursions.", features: [{ icon: "Calendar", heading: "Multi-Day Packages", description: "Complete tour packages with accommodation transfers." }, { icon: "Route", heading: "Regional Exploration", description: "Extended routes covering nearby cities and attractions." }] },
      { eyebrow: "Airport to Attraction", heading: "Direct Tourist Transfers.", description: "From airport arrival to hotel and attractions, we provide end-to-end tourism transportation. Begin your vacation the moment you land.", features: [{ icon: "Plane", heading: "Airport Pickup", description: "Direct transfers from airport to hotel or attractions." }, { icon: "Hotel", heading: "Hotel Coordination", description: "Seamless transfers between hotels and tour sites." }] },
      { eyebrow: "Night Tours", heading: "City by Night.", description: "Experience the city's nightlife, illuminated landmarks, and evening entertainment with our safe, comfortable night tour service.", features: [{ icon: "Moon", heading: "Night Illumination", description: "Tours timed to capture illuminated city landmarks." }, { icon: "Wine", heading: "Restaurant Transfers", description: "Transport to the city's finest dining establishments." }] },
      { eyebrow: "Custom Itineraries", heading: "Your Tour, Your Way.", description: "We customize every tour to match your interests, pace, and schedule. Whether you prefer art, history, food, or adventure, we create the perfect itinerary.", features: [{ icon: "Sliders", heading: "Personalized Routes", description: "Custom itineraries based on your interests." }, { icon: "Clock", heading: "Flexible Pacing", description: "Adjust stops and timing to match your preferences." }] },
      { eyebrow: "Travel Agencies", heading: "Partner with Us.", description: "Travel agencies and tour operators can partner with AB for reliable, high-quality ground transportation for their clients.", features: [{ icon: "Handshake", heading: "Agency Partnerships", description: "Preferred rates and priority booking for partners." }, { icon: "FileText", heading: "Commission Programs", description: "Competitive commission structures for tour operators." }] },
      { eyebrow: "Eco Tours", heading: "Sustainable Tourism Travel.", description: "Explore responsibly with our eco-friendly tourism options. Hybrid and electric vehicles available for environmentally conscious travelers.", features: [{ icon: "Leaf", heading: "Green Fleet", description: "Hybrid and electric vehicle options for eco-tourism." }, { icon: "Heart", heading: "Responsible Travel", description: "Supporting sustainable tourism practices." }] },
    ],
    fleetBadge: "Tour Fleet",
    faq: [
      { q: "Do your chauffeurs provide guided commentary during tours?", a: "Yes. Our tourism chauffeurs are knowledgeable about local landmarks, history, and culture. They provide informative commentary during tours and can recommend restaurants, attractions, and activities." },
      { q: "Can you customize tour itineraries?", a: "Absolutely. We design custom itineraries based on your interests, whether that's history, architecture, cuisine, adventure, or a mix. Every tour can be tailored to your preferences." },
      { q: "What types of tourism transportation do you offer?", a: "We provide city sightseeing tours, heritage site visits, day excursions, multi-day tour packages, airport-to-attraction transfers, and photography tours. All services use our premium fleet." },
      { q: "Can travel agencies partner with AB for ground transport?", a: "Yes. We offer partnership programs for travel agencies and tour operators with preferred rates, priority booking, and commission structures." },
    ],
  },
};

// ── Content generators ───────────────────────────────────────────
function generateTitle(serviceSlug: string, cityName: string): string {
  return `${SERVICE_META[serviceSlug]?.label || serviceSlug} in ${cityName}`;
}

function generateExcerpt(serviceSlug: string, cityName: string, countryName: string): string {
  const svc = SERVICE_META[serviceSlug];
  return `AB provides ${svc?.description?.toLowerCase() || 'premium transportation services'} in ${cityName}, ${countryName}. ${svc?.label || serviceSlug} with professional chauffeurs and executive-grade vehicles.`;
}

function generateSeoTitle(serviceSlug: string, cityName: string): string {
  const svc = SERVICE_META[serviceSlug];
  return `${svc?.label || serviceSlug} ${cityName} | AB`;
}

function generateSeoDescription(serviceSlug: string, cityName: string, keywords: string[]): string {
  const svc = SERVICE_META[serviceSlug];
  const primaryKeywords = keywords.slice(0, 3).join(", ");
  return `Professional ${svc?.label || serviceSlug} in ${cityName}. ${primaryKeywords}. AB provides premium executive transportation with a luxury fleet and certified chauffeurs.`;
}

// ── Template generator ───────────────────────────────────────────
function generateSections(data: CityServiceData, meta: { name: string; country: string; airport: string; landmarks: string[]; description: string }, svcMeta: typeof SERVICE_META[string], kws: string[]): PageSection[] {
  const city = meta.name;
  const country = meta.country;
  const airport = meta.airport;
  const landmarks = meta.landmarks;
  const svcLabel = svcMeta.label;

  return [
    // Section 0: Hero
    {
      id: genId(), type: "hero", variant: "background-content", order: 0, enabled: true,
      content: {
        eyebrow: `${city} Operations`,
        title: svcLabel.includes("&") ? `Premium ${svcLabel.split("&")[0].trim()} Services` : `${svcLabel} Services`,
        titleHighlight: `in ${city}.`,
        description: `AB provides ${svcMeta.description.toLowerCase()} in ${city}, ${country}. Our operations are strategically positioned to serve ${landmarks.join(", ")} and the greater ${city} metropolitan area with executive-grade vehicles and certified professional chauffeurs. Whether you need ${kws[0] || 'premium transportation'}, ${kws[1] || 'executive car service'}, or ${kws[2] || 'VIP transport'}, our ${city} team delivers military-precision logistics.`,
      },
      items: [
        { label: `Request ${city} ${svcLabel}`, href: "#corporate-account", style: "primary", icon: "ArrowRight", iconPosition: "right" },
        { label: `Explore ${city} Services`, href: "#services", style: "secondary" },
      ],
      settings: { minHeight: "100vh", overlayOpacity: 85, contentPosition: "left", buttonLayout: "row" },
      appearance: { theme: "darker", background: "https://images.unsplash.com/photo-1588726588629-19e48f7d9834?ixlib=rb-4.0.3&auto=format&fit=crop&w=2500&q=80", padding: "none", border: false, textAlign: "left", overlayGradient: "default" },
    },

    // Section 1: Marquee
    {
      id: genId(), type: "marquee", variant: "default", order: 1, enabled: true,
      content: {
        items: svcMeta.marqueeItems.map(item => ({ id: genItemId(), icon: item.icon, label: item.label })),
      },
      items: [],
      settings: { speed: "normal", opacity: 50 },
      appearance: { theme: "darker", padding: "none", border: false, textAlign: "center" },
    },

    // Section 2: Service Cards
    {
      id: genId(), type: "serviceCards", variant: "3-column", order: 2, enabled: true,
      content: {
        eyebrow: `${city} Operations`,
        heading: `${svcLabel} Built for ${city}'s Infrastructure.`,
        description: `From ${landmarks[0] || 'key business districts'} to ${landmarks[1] || 'major transport hubs'}, our ${city} dispatchers understand the unique traffic flows, security perimeters, and protocol requirements for ${svcMeta.description.toLowerCase().replace(/\.$/, '')} in ${city}.`,
        sectionCta: { label: `Book ${city} ${svcLabel}`, href: "#corporate-account", style: "outline", icon: "CalendarCheck" },
      },
      items: svcMeta.serviceCards.map(card => ({
        id: genItemId(),
        icon: card.icon,
        title: card.title,
        description: card.description,
        actions: card.actions.map(a => ({
          ...a,
          label: a.label.replace(/RUH|Dubai|Doha|city/gi, city),
          href: "#corporate-account",
        })),
      })),
      settings: { columns: "3", showHeader: true },
      appearance: { theme: "dark", padding: "lg", border: true, textAlign: "center" },
    },

    // Sections 3-12: 10 Media Content sections (alternating right/left)
    ...svcMeta.mediaSections.map((section, i): PageSection => ({
      id: genId(),
      type: "mediaContent",
      variant: i % 2 === 0 ? "media-right" : "media-left",
      order: 3 + i,
      enabled: true,
      content: {
        eyebrow: section.eyebrow,
        heading: section.heading,
        description: section.description + ` In ${city}, ${meta.description}, our ${svcLabel.toLowerCase()} operations are positioned to serve ${landmarks.slice(0, 3).join(', ')} with maximum efficiency. ${kws[i] ? `Whether you need ${kws[i]} or ${kws[Math.min(i + 1, kws.length - 1)]}, our ${city} team is ready to serve.` : ''}`,
        items: section.features.map(f => ({
          id: genItemId(),
          icon: f.icon,
          heading: f.heading,
          description: f.description,
        })),
        actions: [
          { label: `Learn More About ${city} ${svcLabel}`, href: "#corporate-account", style: "outline", icon: "ArrowRight" },
        ],
      },
      items: [],
      settings: { mediaPosition: i % 2 === 0 ? "right" : "left", containerWidth: "default" },
      appearance: {
        theme: i % 2 === 0 ? "darker" : "dark",
        pattern: i % 3 === 0,
        background: i % 2 === 0
          ? "https://images.unsplash.com/photo-1588726588629-19e48f7d9834?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          : "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        padding: "lg",
        border: true,
        textAlign: "left",
      },
    })),

    // Section 13: Fleet Grid
    {
      id: genId(), type: "fleetGrid", variant: "4-column", order: 13, enabled: true,
      content: {
        eyebrow: `${city} Fleet Governance`,
        heading: "Strictly Black. TGA Compliant.",
        description: `Our ${city} fleet consists exclusively of late-model, immaculate black vehicles. Fully licensed to global executive standards to navigate ${city} safely.`,
        headerAction: { label: `Request ${city} Fleet Allocation`, href: "#corporate-account" },
        bottomCta: { label: `Consult our ${city} Fleet Procurement Team`, href: "#corporate-account", style: "secondary", icon: "ArrowRight" },
      },
      items: [
        { id: genItemId(), badge: `${svcMeta.fleetBadge}`, image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop&q=80", imageAlt: `Black Mercedes S-Class ${city}`, category: "Executive Sedan", name: "Mercedes S-Class (Black)", capacity: "3 Pax", bags: "2 Bags", capacityIcon: "UserTie", bagsIcon: "Briefcase", actions: [{ label: `Book S-Class in ${city}`, href: "#corporate-account" }] },
        { id: genItemId(), badge: `${svcMeta.fleetBadge}`, image: "https://images.unsplash.com/photo-1574729418529-d1a8cc214ef6?q=80&w=1471&auto=format&fit=crop", imageAlt: `Black Cadillac Escalade ${city}`, category: "Executive SUV", name: "Cadillac Escalade (Black)", capacity: "6 Pax", bags: "5 Bags", capacityIcon: "UserTie", bagsIcon: "Briefcase", actions: [{ label: `Book SUV in ${city}`, href: "#corporate-account" }] },
        { id: genItemId(), badge: `${svcMeta.fleetBadge}`, image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&h=400&fit=crop&q=80", imageAlt: `Black Mercedes V-Class ${city}`, category: "Premium MPV", name: "Mercedes V-Class (Black)", capacity: "6 Pax", bags: "5 Bags", capacityIcon: "Users", bagsIcon: "Briefcase", actions: [{ label: `Book V-Class in ${city}`, href: "#corporate-account" }] },
        { id: genItemId(), badge: `${svcMeta.fleetBadge}`, badgeStyle: "accent", image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&h=400&fit=crop&q=80", imageAlt: `Black Mercedes Sprinter ${city}`, category: "Executive Van", name: "Mercedes Sprinter (Black)", capacity: "14 Pax", bags: "10 Bags", capacityIcon: "Users", bagsIcon: "Briefcase", actions: [{ label: `Book Van in ${city}`, href: "#corporate-account" }] },
      ],
      settings: { columns: "4" },
      appearance: { theme: "darker", padding: "lg", border: true, textAlign: "left" },
    },

    // Section 14: Contact Form
    {
      id: genId(), type: "contactForm", variant: "corporate", order: 14, enabled: true,
      content: {
        eyebrow: `${city} Procurement`,
        heading: `Open a ${city} Corporate Account.`,
        description: `Connect with our ${city}-based enterprise team for centralized local billing and priority fleet access.`,
        icon: "Briefcase",
        submitLabel: `Submit ${city} Request`,
        successTitle: `${city} Application Received`,
        successMessage: `Our ${city} enterprise account manager will contact you within 24 hours.`,
      },
      items: [],
      settings: { layout: "centered" },
      appearance: { theme: "dark", padding: "lg", border: true, textAlign: "left" },
    },

    // Section 15: FAQ
    {
      id: genId(), type: "faq", variant: "default", order: 15, enabled: true,
      content: {
        eyebrow: `${city} Knowledge Base`,
        heading: "Frequently Asked Questions",
        description: `Detailed insights into our ${svcLabel.toLowerCase()} operations in ${city}.`,
        items: svcMeta.faq.map(faq => ({
          id: genItemId(),
          question: faq.q.replace(/city|RUH|Dubai|Doha/gi, city),
          answer: faq.a.replace(/city|RUH|Dubai|Doha/gi, city),
        })),
      },
      items: [
        { label: `Call ${city} Dispatch`, href: "tel:+966500000000", style: "secondary", icon: "Phone" },
      ],
      settings: { variant: "default" },
      appearance: { theme: "darker", padding: "lg", border: true, textAlign: "center" },
    },
  ];
}

// ── Main ─────────────────────────────────────────────────────────
async function main() {
  console.log("═══════════════════════════════════════════════════════════");
  console.log("  AB — Tier 1 City Service Page Generator");
  console.log("═══════════════════════════════════════════════════════════\n");

  // 1. Parse data
  const allData = parseTier1Data();
  let data = allData;

  // Apply filters
  if (FILTER_SERVICE) data = data.filter(d => d.serviceSlug === FILTER_SERVICE);
  if (FILTER_CITY) data = data.filter(d => d.citySlug === FILTER_CITY);

  console.log(`Found ${data.length} city+service combinations to generate.\n`);

  // 2. Print keyword summary
  console.log("── Keyword Summary ──");
  for (const d of data) {
    const cityMeta = CITY_META[d.citySlug];
    const svcMeta = SERVICE_META[d.serviceSlug];
    const cityName = cityMeta?.name || d.citySlug;
    const svcName = svcMeta?.label || d.serviceSlug;
    console.log(`  ${cityName.padEnd(20)} ${svcName.padEnd(25)} ${d.keywords.length} keywords`);
  }
  console.log(`  Total keywords: ${data.reduce((sum, d) => sum + d.keywords.length, 0)}\n`);

  if (DRY_RUN) {
    console.log("[DRY RUN] Would generate the following articles:\n");
    for (const d of data) {
      const cityMeta = CITY_META[d.citySlug];
      const svcMeta = SERVICE_META[d.serviceSlug];
      if (!cityMeta || !svcMeta) {
        console.log(`  SKIP: ${d.citySlug}/${d.serviceSlug} (missing metadata)`);
        continue;
      }
      const slug = `services/${d.serviceSlug}/${d.countrySlug}/${d.citySlug}`;
      console.log(`  /${slug}`);
      console.log(`    Title: ${generateTitle(d.serviceSlug, cityMeta.name)}`);
      console.log(`    Keywords: ${d.keywords.length}`);
    }
    console.log("\n[DRY RUN] No articles created.");
    return;
  }

  // 3. Connect to MongoDB
  console.log("Connecting to MongoDB...");
  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error("MONGODB_URI or MONGO_URI must be set in the environment, .env.local, or .env");
  }
  try {
    await mongoose.connect(mongoUri);
  } catch (err: any) {
    if (err?.code === "ECONNREFUSED" || /querySrv/i.test(err?.message || "")) {
      // Local DNS can't answer SRV queries — retry via public DNS
      console.log("SRV lookup failed, retrying with public DNS...");
      const dns = await import("dns");
      dns.setServers(["8.8.8.8", "1.1.1.1"]);
      await mongoose.connect(mongoUri);
    } else {
      throw err;
    }
  }
  console.log("Connected.\n");

  // 4. Get existing slugs to skip duplicates
  const Article = mongoose.models.Article || mongoose.model("Article", new mongoose.Schema({
    slug: String, title: String, excerpt: String, category: String, categoryLabel: String,
    author: String, authorName: String, date: String, readTime: Number, featured: Boolean,
    tags: [String], views: Number, status: String, contentMode: String, bodyContent: String,
    sections: mongoose.Schema.Types.Mixed, templateType: String, serviceSlug: String,
    countrySlug: String, citySlug: String, country: String, city: String,
    faqs: [{ q: String, a: String }], seo_metadata: { metaTitle: String, metaDescription: String, ogImage: String },
    locale: String,
  }, { timestamps: true }));

  const existingBySlug = new Map(
    (await Article.find({ templateType: "service-city" }).select("slug contentMode").lean()).map((a: any) => [a.slug, a])
  );
  console.log(`Found ${existingBySlug.size} existing city service articles.\n`);

  // 5. Generate articles
  let created = 0;
  let converted = 0;
  let skipped = 0;
  let errors = 0;

  for (const d of data) {
    const cityMeta = CITY_META[d.citySlug];
    const svcMeta = SERVICE_META[d.serviceSlug];

    if (!cityMeta || !svcMeta) {
      console.log(`  SKIP: ${d.citySlug}/${d.serviceSlug} (missing metadata)`);
      skipped++;
      continue;
    }

    const slug = `services/${d.serviceSlug}/${d.countrySlug}/${d.citySlug}`;
    const existing = existingBySlug.get(slug);
    const isNewTemplate = existing && existing.contentMode === "page-sections";
    if (existing && (isNewTemplate || !CONVERT)) {
      console.log(`  SKIP: /${slug} (already exists${isNewTemplate ? ", new template" : " — pass --convert to upgrade"})`);
      skipped++;
      continue;
    }

    try {
      const sections = generateSections(d, cityMeta, svcMeta, d.keywords);

      if (existing) {
        // Upgrade old WYSIWYG article to the new City template in place
        await Article.updateOne(
          { _id: existing._id },
          {
            $set: {
              contentMode: "page-sections",
              sections,
              bodyContent: "",
              faqs: svcMeta.faq.map(f => ({
                q: f.q.replace(/city|RUH|Dubai|Doha/gi, cityMeta.name),
                a: f.a.replace(/city|RUH|Dubai|Doha/gi, cityMeta.name),
              })),
            },
          }
        );
        converted++;
        console.log(`  CONVERTED: /${slug} (${d.keywords.length} keywords, ${sections.length} sections)`);
        continue;
      }

      const article = {
        slug,
        title: generateTitle(d.serviceSlug, cityMeta.name),
        excerpt: generateExcerpt(d.serviceSlug, cityMeta.name, cityMeta.country),
        category: "services",
        categoryLabel: svcMeta.label,
        author: "ab-limo",
        authorName: "AB Editorial",
        date: new Date().toISOString().split("T")[0],
        readTime: 8,
        featured: false,
        tags: [d.serviceSlug, d.countrySlug, d.citySlug, cityMeta.country, cityMeta.name, ...d.keywords.slice(0, 5)],
        views: 0,
        status: "published",
        contentMode: "page-sections",
        bodyContent: "",
        sections,
        templateType: "service-city",
        serviceSlug: d.serviceSlug,
        countrySlug: d.countrySlug,
        citySlug: d.citySlug,
        country: cityMeta.country,
        city: cityMeta.name,
        faqs: svcMeta.faq.map(f => ({
          q: f.q.replace(/city|RUH|Dubai|Doha/gi, cityMeta.name),
          a: f.a.replace(/city|RUH|Dubai|Doha/gi, cityMeta.name),
        })),
        seo_metadata: {
          metaTitle: generateSeoTitle(d.serviceSlug, cityMeta.name),
          metaDescription: generateSeoDescription(d.serviceSlug, cityMeta.name, d.keywords),
          ogImage: "https://images.unsplash.com/photo-1588726588629-19e48f7d9834?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        },
        locale: "en",
      };

      await Article.create(article);
      created++;
      console.log(`  CREATED: /${slug} (${d.keywords.length} keywords)`);
    } catch (err: any) {
      errors++;
      console.error(`  ERROR: /${slug} — ${err.message}`);
    }
  }

  // 6. Summary
  console.log("\n═══════════════════════════════════════════════════════════");
  console.log("  Generation Complete");
  console.log("═══════════════════════════════════════════════════════════");
  console.log(`  Created:  ${created}`);
  console.log(`  Converted: ${converted}`);
  console.log(`  Skipped:  ${skipped}`);
  console.log(`  Errors:  ${errors}`);
  console.log(`  Total:   ${data.length}`);
  console.log("═══════════════════════════════════════════════════════════\n");

  await mongoose.disconnect();
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
