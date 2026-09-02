/**
 * Seed script: Creates real-world example blog articles for all three types:
 * 1. Service-country blogs (service + country level)
 * 2. Service-city blogs (service + country + city level)
 * 3. Service-general blogs (general service articles)
 *
 * Usage: npx tsx scripts/seed-sample-articles.ts [--dry-run]
 */
import "dotenv/config";
import { connectDB } from "../src/lib/db";
import { Article } from "../src/lib/models/Article";

const SAMPLE_ARTICLES = [
  // ═══════════════════════════════════════════════════════════════════
  // SERVICE-COUNTRY BLOGS
  // ═══════════════════════════════════════════════════════════════════
  {
    slug: "services/chauffeur-vip/saudi-arabia",
    title: "Premium Chauffeur Service in Saudi Arabia: A Complete Guide",
    excerpt: "Discover AB.Limo's premium chauffeur services across Saudi Arabia. From Riyadh business districts to Jeddah corniche, explore how executive ground transport elevates your journey.",
    category: "chauffeur-vip",
    categoryLabel: "Chauffeur & VIP",
    status: "published",
    templateType: "service-country",
    serviceSlug: "chauffeur-vip",
    countrySlug: "saudi-arabia",
    citySlug: "",
    authorName: "AB.Limo Editorial",
    date: "2026-08-15",
    readTime: 7,
    featured: true,
    tags: ["chauffeur", "saudi arabia", "executive transport", "riyadh", "jeddah"],
    bodyContent: `
      <h2>Executive Ground Transport Across the Kingdom</h2>
      <p>Saudi Arabia's rapid Vision 2030 transformation has created an unprecedented demand for premium ground transportation. From the towering skyline of Riyadh's King Abdullah Financial District to the historic corridors of Jeddah's Al-Balad, AB.Limo delivers a chauffeur experience engineered around the modern executive's schedule.</p>

      <h2>Why Choose a Professional Chauffeur in KSA?</h2>
      <p>Navigating Saudi Arabia's expanding highway network and busy urban centres requires more than just a driver — it demands a trained professional who understands protocol, punctuality, and discretion. AB.Limo chauffeurs undergo rigorous vetting, background checks, and continuous training in corporate etiquette.</p>

      <ul>
        <li><strong>Vetted Professionals:</strong> Every chauffeur passes multi-stage background screening and defensive driving certification.</li>
        <li><strong>Real-Time Routing:</strong> GPS-monitored fleets with live traffic intelligence ensure on-time performance across all major cities.</li>
        <li><strong>Protocol Training:</strong> Chauffeurs are trained in VIP handling, confidentiality, and diplomatic courtesy.</li>
      </ul>

      <h2>Key Cities We Serve</h2>
      <p><strong>Riyadh:</strong> The capital's business heart — from Olaya Street meetings to Diriyah Gate events. Our chauffeurs navigate the King Fahd Road corridor and the new Riyadh Metro interchange zones with precision.</p>
      <p><strong>Jeddah:</strong> Whether it's a Jeddah Corniche dinner reservation or a King Abdulaziz International Airport transfer, our fleet positions itself for seamless door-to-door service.</p>
      <p><strong>Mecca & Medina:</strong> Sensitive, respectful transport for religious pilgrimages with experienced drivers familiar with Hajj and Umrah logistics.</p>
      <p><strong>Dammam & Eastern Province:</strong> Corporate fleet solutions for oil & gas executives operating between Dharan, Al Khobar, and the King Fahd Industrial Port.</p>

      <h2>Fleet Selection</h2>
      <p>Our Saudi fleet includes the Mercedes S-Class for executive sedans, BMW X7 and Range Rover Autobiography for luxury SUVs, and the Mercedes V-Class for group travel. Every vehicle is detailed before each journey and equipped with bottled water, charging ports, and Wi-Fi on selected models.</p>

      <h2>Booking & Availability</h2>
      <p>AB.Limo operates 24/7 across Saudi Arabia. Book through our concierge line, corporate portal, or mobile app. Same-day bookings are available subject to fleet availability, with advance reservations recommended for multi-city itineraries and Hajj season travel.</p>
    `,
    keyTakeawaysContent: `
      <ul>
        <li>AB.Limo provides vetted, protocol-trained chauffeurs across all major Saudi cities.</li>
        <li>Real-time GPS monitoring and traffic intelligence guarantee punctuality.</li>
        <li>Fleet includes Mercedes S-Class, BMW X7, Range Rover, and Mercedes V-Class.</li>
        <li>24/7 availability with same-day booking options.</li>
      </ul>
    `,
    finalThoughtsContent: `
      <p>Saudi Arabia's transport landscape is evolving rapidly, and AB.Limo is at the forefront of that evolution. Whether you're a corporate executive navigating Riyadh's business districts, a delegation attending events in Jeddah, or a family performing pilgrimage in Mecca, our chauffeur service delivers the reliability, discretion, and comfort that discerning travellers demand.</p>
      <p>Contact our concierge team to arrange your next journey across the Kingdom.</p>
    `,
    articleMedia: { heroCoverMedia: { url: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&h=600&fit=crop" } },
    seo_metadata: { metaTitle: "Premium Chauffeur Service in Saudi Arabia | AB.Limo", metaDescription: "AB.Limo's executive chauffeur service across Riyadh, Jeddah, Mecca, and Dammam. Vetted chauffeurs, luxury fleet, 24/7 availability.", ogImage: "" },
    locale: "en",
  },
  {
    slug: "services/airport-transfers/uae",
    title: "Seamless Airport Transfers Across the UAE: Dubai, Abu Dhabi & Beyond",
    excerpt: "From DXB Terminal 3 to Abu Dhabi's Zayed International, AB.Limo's airport transfer service ensures punctual, stress-free arrivals and departures across all UAE airports.",
    category: "airport-transfers",
    categoryLabel: "Airport Transfers",
    status: "published",
    templateType: "service-country",
    serviceSlug: "airport-transfers",
    countrySlug: "uae",
    citySlug: "",
    authorName: "AB.Limo Editorial",
    date: "2026-08-20",
    readTime: 6,
    featured: false,
    tags: ["airport transfer", "dubai", "abu dhabi", "DXB", "AUH", "UAE"],
    bodyContent: `
      <h2>UAE Airport Transfers Perfected</h2>
      <p>The UAE serves as a global aviation hub, with Dubai International Airport (DXB) and Abu Dhabi's Zayed International Airport (AUH) handling over 100 million passengers annually. AB.Limo's airport transfer service is built to match this scale — delivering punctual, stress-free ground transport for business travellers, families, and VIP delegations.</p>

      <h2>How Our Airport Transfer Works</h2>
      <p><strong>1. Flight Monitoring:</strong> Our system tracks your flight in real time. If your landing is early or delayed, your chauffeur adjusts automatically — you never wait, and you're never charged for reasonable delay-related waiting.</p>
      <p><strong>2. Meet & Greet:</strong> A professional representative greets you at the arrivals gate with a personalized namesign. They assist with luggage and escort you to your vehicle.</p>
      <p><strong>3. Premium Vehicle:</strong> Choose from executive sedans, luxury SUVs, or spacious vans. Every vehicle is inspected, detailed, and positioned at the kerb before your arrival.</p>

      <h2>Airports We Cover</h2>
      <ul>
        <li><strong>Dubai International (DXB):</strong> All terminals including Terminal 3 (Emirates). VIP tarmac access available for private aviation.</li>
        <li><strong>Al Maktoum International (DWC):</strong> Dubai's expanding second airport for cargo and select passenger flights.</li>
        <li><strong>Abu Dhabi Zayed International (AUH):</strong> Full meet & greet at the new Midfield Terminal.</li>
        <li><strong>Sharjah International (SHJ):</strong> Competitive transfers to Sharjah, Ajman, and northern Emirates destinations.</li>
        <li><strong>Ras Al Khaimah International (RKT):</strong> Transfers to RAK hotels, Al Hamra, and Mysk resorts.</li>
      </ul>

      <h2>Popular Routes</h2>
      <p><strong>DXB to Dubai Marina:</strong> 25–40 minutes depending on traffic. Our chauffeurs use the Sheikh Zayed Road or Al Khail Road alternatives based on real-time conditions.</p>
      <p><strong>AUH to Saadiyat Island:</strong> 20–30 minutes to the cultural district, museums, and beach resorts.</p>
      <p><strong>DXB to Abu Dhabi:</strong> 75–90 minutes inter-emirate transfer. Perfect for business travellers with meetings in both cities.</p>

      <h2>Corporate Airport Accounts</h2>
      <p>For companies managing frequent executive travel, AB.Limo offers corporate airport accounts with consolidated invoicing, priority booking, and dedicated account management. Contact our corporate team to set up your organisation's account.</p>
    `,
    keyTakeawaysContent: `
      <ul>
        <li>Real-time flight tracking ensures your chauffeur is always positioned correctly.</li>
        <li>Meet & greet service at all major UAE airports.</li>
        <li>Complimentary waiting time on arrivals — no surprise charges.</li>
        <li>Corporate accounts available for frequent business travellers.</li>
      </ul>
    `,
    finalThoughtsContent: `
      <p>Whether you're arriving for a business summit in Dubai, a government meeting in Abu Dhabi, or a holiday in Ras Al Khaimah, AB.Limo's airport transfer service is your first and last impression of the UAE. We make sure it's flawless.</p>
    `,
    articleMedia: { heroCoverMedia: { url: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&h=600&fit=crop" } },
    seo_metadata: { metaTitle: "Airport Transfers in UAE | Dubai, Abu Dhabi, Sharjah | AB.Limo", metaDescription: "Punctual airport transfers across UAE. Flight tracking, meet & greet, luxury vehicles. DXB, AUH, SHJ, RKT coverage.", ogImage: "" },
    locale: "en",
  },
  {
    slug: "services/corporate-transportation/qatar",
    title: "Corporate Transportation in Qatar: Fleet Solutions for Business Excellence",
    excerpt: "AB.Limo's corporate transportation services in Qatar provide managed fleets, executive travel, and workforce mobility for organisations operating in Doha and beyond.",
    category: "corporate-transportation",
    categoryLabel: "Corporate Transportation",
    status: "published",
    templateType: "service-country",
    serviceSlug: "corporate-transportation",
    countrySlug: "qatar",
    citySlug: "",
    authorName: "AB.Limo Editorial",
    date: "2026-08-22",
    readTime: 6,
    featured: false,
    tags: ["corporate transport", "qatar", "doha", "fleet management", "business travel"],
    bodyContent: `
      <h2>Qatar's Corporate Mobility Partner</h2>
      <p>As Qatar continues to expand its position as a global business hub — powered by LNG exports, FIFA legacy infrastructure, and the Qatar Financial Centre — the demand for reliable corporate ground transport has never been higher. AB.Limo provides end-to-end corporate transportation solutions tailored to organisations operating across Doha and the wider Gulf region.</p>

      <h2>Our Corporate Solutions</h2>
      <p><strong>Dedicated Corporate Fleet:</strong> We assign a managed fleet of vehicles to your organisation, available on-demand or on a scheduled basis. Vehicles range from executive sedans for C-suite travel to luxury SUVs for team movements.</p>
      <p><strong>Employee Shuttle Programs:</strong> Reliable daily shuttles between residential areas, offices, and industrial zones. Routes are optimised for efficiency, with real-time tracking visible to your HR and logistics teams.</p>
      <p><strong>Executive Hourly Hire:</strong> As-directed availability with an executive chauffeur on standby. Perfect for days packed with meetings across West Bay, Lusail, and the Pearl-Qatar.</p>

      <h2>Why Corporates Choose AB.Limo</h2>
      <ul>
        <li><strong>Consolidated Billing:</strong> Single monthly invoice with detailed usage reports for expense management and auditing.</li>
        <li><strong>Priority Booking:</strong> Corporate accounts receive priority allocation during peak periods and events.</li>
        <li><strong>Real-Time Visibility:</strong> Dashboard access for fleet managers to track vehicle locations and journey status.</li>
        <li><strong>Safety Standards:</strong> GPS-monitored vehicles, trained chauffeurs, and comprehensive insurance coverage.</li>
      </ul>

      <h2>Industries We Serve</h2>
      <p>Our corporate clients span oil & gas, finance, legal, consulting, construction, and government sectors. Whether it's a delegation visiting the North Field expansion sites or board members attending QFC regulatory meetings, we tailor the transport solution to your operational requirements.</p>
    `,
    keyTakeawaysContent: `
      <ul>
        <li>Dedicated fleet allocation with executive sedans and luxury SUVs.</li>
        <li>Consolidated monthly billing with detailed usage reports.</li>
        <li>Employee shuttle programs with real-time tracking.</li>
        <li>Priority booking and corporate account management.</li>
      </ul>
    `,
    finalThoughtsContent: `
      <p>In Qatar's fast-paced business environment, your ground transport should be an asset, not an admin burden. AB.Limo's corporate transportation services let your team focus on what matters while we handle the logistics. Contact our corporate team to discuss your organisation's mobility requirements.</p>
    `,
    articleMedia: { heroCoverMedia: { url: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1200&h=600&fit=crop" } },
    seo_metadata: { metaTitle: "Corporate Transportation in Qatar | Fleet Solutions | AB.Limo", metaDescription: "Managed corporate fleets, executive travel, and workforce mobility in Qatar. Doha, Lusail, West Bay coverage.", ogImage: "" },
    locale: "en",
  },

  // ═══════════════════════════════════════════════════════════════════
  // SERVICE-CITY BLOGS
  // ═══════════════════════════════════════════════════════════════════
  {
    slug: "services/chauffeur-vip/uae/dubai",
    title: "Chauffeur Service in Dubai: Your Guide to Executive Ground Transport",
    excerpt: "Navigate Dubai's iconic skyline in style with AB.Limo's chauffeur service. From Business Bay meetings to Palm Jumeirah dinners, discover executive transport tailored to Dubai's rhythm.",
    category: "chauffeur-vip",
    categoryLabel: "Chauffeur & VIP",
    status: "published",
    templateType: "service-city",
    serviceSlug: "chauffeur-vip",
    countrySlug: "uae",
    citySlug: "dubai",
    authorName: "AB.Limo Editorial",
    date: "2026-08-18",
    readTime: 7,
    featured: true,
    tags: ["chauffeur", "dubai", "executive transport", "business bay", "DIFC"],
    bodyContent: `
      <h2>Executive Chauffeur Service in Dubai</h2>
      <p>Dubai is a city that moves at the speed of ambition. Between back-to-back meetings in DIFC, investor presentations in Business Bay, and dinners at Atlantis The Royal, your ground transport needs to keep pace — and then some. AB.Limo's chauffeur service in Dubai is engineered for professionals who demand punctuality, discretion, and comfort.</p>

      <h2>Understanding Dubai's Transport Landscape</h2>
      <p>Dubai's 12-lane Sheikh Zayed Road, the expanding Dubai Metro network, and the periodic road closures for events like Expo legacy activities and Dubai Shopping Festival require a chauffeur who knows the city intimately. Our drivers are Dubai veterans — they understand the optimal routes at different times of day, the best drop-off points at Dubai Mall versus Mall of the Emirates, and how to navigate JBR traffic during peak tourist season.</p>

      <h2>Popular Chauffeur Use Cases in Dubai</h2>
      <p><strong>Business Travel:</strong> Hourly hire for days packed with meetings across DIFC, Emirates Hills, and Downtown Dubai. Your chauffeur waits on standby between appointments.</p>
      <p><strong>Corporate Events:</strong> Multi-vehicle coordination for conferences at Dubai World Trade Centre, EXPO City, and Madinat Jumeirah.</p>
      <p><strong>VIP & Diplomatic:</strong> Protocol-trained chauffeurs for embassy visits, government meetings, and high-profile personal transport.</p>
      <p><strong>Special Occasions:</strong> Wedding arrivals, anniversary dinners, and celebration transport across Dubai's luxury venues.</p>

      <h2>Key Routes & Timing</h2>
      <ul>
        <li><strong>DIFC to Dubai Marina:</strong> 15–25 min (Sheikh Zayed Road or Al Khail Road)</li>
        <li><strong>Business Bay to DXB Airport:</strong> 15–20 min via Airport Road</li>
        <li><strong>Downtown Dubai to Palm Jumeirah:</strong> 15–20 min via Al Sayadi Street</li>
        <li><strong>Deira to Dubai Silicon Oasis:</strong> 25–35 min via E311</li>
      </ul>

      <h2>Fleet Available in Dubai</h2>
      <p>Our Dubai fleet includes the latest Mercedes S-Class (W223), BMW 7 Series, Range Rover Autobiography, and Mercedes V-Class for group travel. All vehicles feature leather interiors, climate control, bottled water, and device charging ports.</p>
    `,
    keyTakeawaysContent: `
      <ul>
        <li>Hourly hire available for full-day executive itineraries.</li>
        <li>Dubai-expert chauffeurs with real-time traffic routing.</li>
        <li>Multi-vehicle coordination for corporate events.</li>
        <li>Latest Mercedes S-Class, BMW 7 Series, and Range Rover fleet.</li>
      </ul>
    `,
    finalThoughtsContent: `
      <p>Dubai rewards those who move efficiently. With AB.Limo's chauffeur service, you're not just getting from A to B — you're gaining a transport partner who understands the city's rhythm and keeps you ahead of it. Book your Dubai chauffeur today.</p>
    `,
    articleMedia: { heroCoverMedia: { url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&h=600&fit=crop" } },
    seo_metadata: { metaTitle: "Chauffeur Service in Dubai | Executive Transport | AB.Limo", metaDescription: "Premium chauffeur service in Dubai. DIFC, Business Bay, Downtown, Palm Jumeirah. Mercedes S-Class, BMW 7 Series. Hourly hire available.", ogImage: "" },
    locale: "en",
  },
  {
    slug: "services/airport-transfers/saudi-arabia/riyadh",
    title: "Airport Transfer from Riyadh: King Khalid International to Any Destination",
    excerpt: "AB.Limo's airport transfer service from Riyadh's King Khalid International Airport. Meet & greet, flight tracking, and luxury vehicles for seamless arrivals and departures.",
    category: "airport-transfers",
    categoryLabel: "Airport Transfers",
    status: "published",
    templateType: "service-city",
    serviceSlug: "airport-transfers",
    countrySlug: "saudi-arabia",
    citySlug: "riyadh",
    authorName: "AB.Limo Editorial",
    date: "2026-08-25",
    readTime: 5,
    featured: false,
    tags: ["airport transfer", "riyadh", "king khalid airport", "RUH", "saudi arabia"],
    bodyContent: `
      <h2>Seamless Airport Transfers from Riyadh</h2>
      <p>King Khalid International Airport (RUH) is Saudi Arabia's second-busiest airport, serving millions of passengers annually. Whether you're arriving for business in the King Abdullah Financial District or departing after a conference at Riyadh Front, AB.Limo ensures your airport transfer is punctual, comfortable, and stress-free.</p>

      <h2>The AB.Limo Airport Experience</h2>
      <p><strong>Flight Tracking:</strong> Our system monitors your flight in real time. If you land early or your departure is delayed, your chauffeur adjusts automatically.</p>
      <p><strong>Meet & Greet:</strong> A representative meets you at arrivals with a namesign, assists with luggage, and escorts you to your vehicle.</p>
      <p><strong>Complimentary Waiting:</strong> Generous waiting time included on all arrivals — no surprise charges for reasonable delays.</p>

      <h2>Popular Routes from RUH</h2>
      <ul>
        <li><strong>RUH to King Abdullah Financial District:</strong> 25–35 min via King Fahd Road</li>
        <li><strong>RUH to Riyadh Front Exhibition Centre:</strong> 20–30 min</li>
        <li><strong>RUH to Diriyah Gate:</strong> 20–30 min via Al Olaya Road</li>
        <li><strong>RUH to Al Faisaliah Tower:</strong> 25–35 min</li>
        <li><strong>RUH to diplomatic quarter:</strong> 20–30 min</li>
      </ul>

      <h2>Terminal Coverage</h2>
      <p>We cover all four terminals at King Khalid International Airport. Terminal 1 (Saudia domestic), Terminal 2 (flynas), Terminal 3 (international), and Terminal 4 (Saudia international). Your chauffeur will be positioned at the correct terminal based on your flight details.</p>
    `,
    keyTakeawaysContent: `
      <ul>
        <li>Flight tracking with automatic chauffeur adjustment.</li>
        <li>Meet & greet at all four RUH terminals.</li>
        <li>Complimentary waiting time on arrivals.</li>
        <li>Covers KAFD, Riyadh Front, Diriyah Gate, and all major destinations.</li>
      </ul>
    `,
    finalThoughtsContent: `
      <p>King Khalid International Airport is your gateway to Riyadh — and AB.Limo is your gateway to seamless ground transport. Book your airport transfer today and experience the difference that professional logistics make.</p>
    `,
    articleMedia: { heroCoverMedia: { url: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=1200&h=600&fit=crop" } },
    seo_metadata: { metaTitle: "Airport Transfer from Riyadh | King Khalid International | AB.Limo", metaDescription: "Reliable airport transfers from Riyadh's King Khalid International Airport. Meet & greet, flight tracking, luxury vehicles.", ogImage: "" },
    locale: "en",
  },
  {
    slug: "services/event-transportation/uae/abu-dhabi",
    title: "Event Transportation in Abu Dhabi: Conference & Gala Logistics",
    excerpt: "AB.Limo's event transportation service in Abu Dhabi. From ADNEC conferences to Saadiyat Island galas, we manage guest movements with precision and style.",
    category: "event-transportation",
    categoryLabel: "Event Transportation",
    status: "published",
    templateType: "service-city",
    serviceSlug: "event-transportation",
    countrySlug: "uae",
    citySlug: "abu-dhabi",
    authorName: "AB.Limo Editorial",
    date: "2026-08-28",
    readTime: 6,
    featured: false,
    tags: ["event transport", "abu dhabi", "ADNEC", "conference", "gala dinner"],
    bodyContent: `
      <h2>Event Transportation Excellence in Abu Dhabi</h2>
      <p>Abu Dhabi's event calendar is packed — from ADNEC's world-class conferences and exhibitions to luxury galas on Saadiyat Island and government summits at Qasr Al Watan. AB.Limo's event transportation service ensures every guest arrives on time, in comfort, and with a seamless experience from pickup to drop-off.</p>

      <h2>Our Event Transport Model</h2>
      <p><strong>Pre-Event Coordination:</strong> We work with your event team to map guest pickup points, schedule departures, and plan vehicle allocation based on attendee numbers and VIP requirements.</p>
      <p><strong>Live Fleet Management:</strong> During the event, our control room monitors every vehicle in real time. If a session runs over or a VIP needs an early departure, we adjust instantly.</p>
      <p><strong>Post-Event Returns:</strong> Coordinated return transfers ensure guests are dropped off efficiently, with no one left waiting.</p>

      <h2>Abu Dhabi Venues We Serve</h2>
      <ul>
        <li><strong>ADNEC (Abu Dhabi National Exhibition Centre):</strong> Multi-hall conferences requiring fleet coordination across multiple pickup zones.</li>
        <li><strong>Etihad Arena:</strong> Gala dinners, award ceremonies, and entertainment events on Yas Island.</li>
        <li><strong>Jumeirah at Saadiyat Island:</strong> Luxury resort events and beachfront celebrations.</li>
        <li><strong>Emirates Palace:</strong> High-profile government and corporate functions.</li>
        <li><strong>Qasr Al Watan:</strong> State events and diplomatic functions.</li>
      </ul>

      <h2>Vehicle Options for Events</h2>
      <p>We deploy a mix of vehicles based on your event's needs: Mercedes S-Class for VIP guests, Mercedes V-Class for small group transfers, and luxury minibuses for larger delegations. All vehicles are chauffeured by protocol-trained professionals.</p>
    `,
    keyTakeawaysContent: `
      <ul>
        <li>Pre-event coordination with your event management team.</li>
        <li>Live fleet management with real-time adjustments.</li>
        <li>Covers ADNEC, Etihad Arena, Saadiyat Island, and Emirates Palace.</li>
        <li>Mixed fleet deployment based on guest count and VIP requirements.</li>
      </ul>
    `,
    finalThoughtsContent: `
      <p>Your event's success depends on the details — and ground transport is one of the most visible details for your guests. AB.Limo's event transportation service in Abu Dhabi ensures every arrival and departure reflects the standard your event deserves.</p>
    `,
    articleMedia: { heroCoverMedia: { url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop" } },
    seo_metadata: { metaTitle: "Event Transportation in Abu Dhabi | Conferences & Galas | AB.Limo", metaDescription: "Event transportation in Abu Dhabi. ADNEC, Etihad Arena, Saadiyat Island. Fleet coordination, live management, protocol-trained chauffeurs.", ogImage: "" },
    locale: "en",
  },
  {
    slug: "services/bus-coach-hire/qatar/doha",
    title: "Bus & Coach Hire in Doha: Group Transport for Teams & Delegations",
    excerpt: "AB.Limo's bus and coach hire service in Doha. From corporate delegations to sports teams, find the right group transport solution for your Qatar operations.",
    category: "bus-coach-hire",
    categoryLabel: "Bus & Coach Hire",
    status: "published",
    templateType: "service-city",
    serviceSlug: "bus-coach-hire",
    countrySlug: "qatar",
    citySlug: "doha",
    authorName: "AB.Limo Editorial",
    date: "2026-08-27",
    readTime: 5,
    featured: false,
    tags: ["bus hire", "coach charter", "doha", "qatar", "group transport"],
    bodyContent: `
      <h2>Group Transport Solutions in Doha</h2>
      <p>Whether you're transporting a corporate delegation to the Qatar Financial Centre, shuttling a sports team between training facilities and stadiums, or arranging group transfers for a conference at QNCC, AB.Limo's bus and coach hire service in Doha provides reliable, comfortable group transport.</p>

      <h2>Vehicle Options</h2>
      <ul>
        <li><strong>Executive Minibus (14–16 seats):</strong> Ideal for small team movements and VIP group transfers. Leather seating, air conditioning, and luggage space.</li>
        <li><strong>Midibus (20–30 seats):</strong> Perfect for corporate delegations and medium-sized groups. Onboard Wi-Fi available on selected vehicles.</li>
        <li><strong>Full-Size Coach (40–50 seats):</strong> For large groups, event shuttles, and inter-city transfers. Reclining seats, PA system, and overhead storage.</li>
      </ul>

      <h2>Common Use Cases in Doha</h2>
      <p><strong>Corporate Shuttles:</strong> Daily employee transport between West Bay offices and residential areas in Al Waab, Madinat Khalifa, and The Pearl-Qatar.</p>
      <p><strong>Conference Transfers:</strong> Coordinated group transfers between hotels and Qatar National Convention Centre (QNCC) or Doha Exhibition & Convention Center.</p>
      <p><strong>Sports Team Transport:</strong> Vehicle allocation for teams training at Aspire Zone, with stadium transfer coordination for match days.</p>

      <h2>Booking & Availability</h2>
      <p>Group transport bookings should be made at least 48 hours in advance. For recurring shuttle programs, we offer dedicated fleet allocation with fixed monthly pricing. Contact our group travel team for a custom quote.</p>
    `,
    keyTakeawaysContent: `
      <ul>
        <li>Minibuses (14–16 seats), midibuses (20–30 seats), and full coaches (40–50 seats).</li>
        <li>Corporate shuttle programs with fixed monthly pricing.</li>
        <li>Conference and event group transfers.</li>
        <li>48-hour advance booking recommended.</li>
      </ul>
    `,
    finalThoughtsContent: `
      <p>Group transport in Doha doesn't have to be complicated. AB.Limo's bus and coach hire service gives you a single point of contact for all your team's mobility needs. Get in touch to plan your group's next movement.</p>
    `,
    articleMedia: { heroCoverMedia: { url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&h=600&fit=crop" } },
    seo_metadata: { metaTitle: "Bus & Coach Hire in Doha | Group Transport | AB.Limo", metaDescription: "Bus and coach hire in Doha, Qatar. 14–50 seat vehicles. Corporate shuttles, conference transfers, sports team transport.", ogImage: "" },
    locale: "en",
  },
  {
    slug: "services/tourism-transportation/oman/muscat",
    title: "Tourism Transportation in Oman: Discover the Sultanate in Comfort",
    excerpt: "AB.Limo's tourism transportation service in Oman. From Muscat's corniche to Jebel Shams, explore Oman's natural beauty with a private chauffeur and luxury vehicle.",
    category: "tourism-transportation",
    categoryLabel: "Tourism Transportation",
    status: "published",
    templateType: "service-city",
    serviceSlug: "tourism-transportation",
    countrySlug: "oman",
    citySlug: "muscat",
    authorName: "AB.Limo Editorial",
    date: "2026-08-29",
    readTime: 7,
    featured: true,
    tags: ["tourism", "oman", "muscat", "jebel shams", "wahiba sands", "sightseeing"],
    bodyContent: `
      <h2>Explore Oman with AB.Limo</h2>
      <p>Oman is one of the Gulf's best-kept secrets — a land of dramatic wadis, ancient forts, pristine coastlines, and warm hospitality. AB.Limo's tourism transportation service lets you discover it all in comfort, with a dedicated chauffeur who knows the roads, the landmarks, and the hidden gems.</p>

      <h2>Popular Day Trips from Muscat</h2>
      <p><strong>Jebel Shams:</strong> Oman's "Grand Canyon" — a 2.5-hour drive from Muscat through stunning mountain scenery. AB.Limo provides a comfortable vehicle and experienced mountain driver for this full-day excursion.</p>
      <p><strong>Wahiba Sands:</strong> Experience the desert dunes with a guided drive into the Sharqiya Sands. Our vehicles are equipped for light desert terrain, and we arrange camel rides and Bedouin camp visits.</p>
      <p><strong>Musandam Peninsula:</strong> A full-day trip to the "Norway of Arabia" — dramatic fjords, dhow cruises, and dolphin watching. Requires border crossing coordination, which our team handles seamlessly.</p>
      <p><strong>Nizwa & Surrounds:</strong> Visit Nizwa Fort, the Friday goat market, and the ancient villages of Jebel Akhdar. Our chauffeurs are familiar with the mountain roads and falaj irrigation systems.</p>

      <h2>Muscat City Tours</h2>
      <p>For those with limited time, our Muscat city tour covers the Sultan Qaboos Grand Mosque, Royal Opera House, Mutrah Souq, and the Corniche. A half-day or full-day option with a knowledgeable chauffeur-guide.</p>

      <h2>Vehicle Recommendations</h2>
      <p>For mountain and desert excursions, we recommend our Range Rover or Toyota Land Cruiser fleet — comfortable on paved roads and capable on light off-road terrain. For city tours and coastal drives, the Mercedes S-Class or BMW 7 Series provides a luxurious experience.</p>
    `,
    keyTakeawaysContent: `
      <ul>
        <li>Full-day and multi-day tourism transport from Muscat.</li>
        <li>Popular routes: Jebel Shams, Wahiba Sands, Musandam, Nizwa.</li>
        <li>Mountain-capable vehicles for scenic excursions.</li>
        <li>Knowledgeable chauffeur-guides familiar with Oman's attractions.</li>
      </ul>
    `,
    finalThoughtsContent: `
      <p>Oman rewards the curious traveller. With AB.Limo's tourism transportation, you're not just seeing the sights — you're experiencing them with a local expert behind the wheel. Plan your Oman journey with us today.</p>
    `,
    articleMedia: { heroCoverMedia: { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=600&fit=crop" } },
    seo_metadata: { metaTitle: "Tourism Transportation in Oman | Muscat Day Trips | AB.Limo", metaDescription: "Private tourism transportation in Oman. Jebel Shams, Wahiba Sands, Musandam, Nizwa day trips from Muscat. Luxury vehicles, expert chauffeurs.", ogImage: "" },
    locale: "en",
  },
];

async function main() {
  const dryRun = process.argv.includes("--dry-run");

  console.log("Connecting to database...");
  await connectDB();

  const existing = await Article.find({
    slug: { $in: SAMPLE_ARTICLES.map((a) => a.slug) },
  }).lean();
  const existingSlugs = new Set(existing.map((a) => a.slug));

  const toInsert = SAMPLE_ARTICLES.filter((a) => !existingSlugs.has(a.slug));
  const skipped = SAMPLE_ARTICLES.length - toInsert.length;

  console.log(`Found ${SAMPLE_ARTICLES.length} articles to seed. ${skipped} already exist. ${toInsert.length} to insert.${dryRun ? " (DRY RUN)" : ""}`);

  if (toInsert.length === 0) {
    console.log("Nothing to insert.");
    process.exit(0);
  }

  if (dryRun) {
    toInsert.forEach((a) => console.log(`  [DRY] ${a.slug}`));
  } else {
    const result = await Article.insertMany(toInsert);
    console.log(`Inserted ${result.length} articles:`);
    result.forEach((a) => console.log(`  [OK] ${a.slug}`));
  }

  console.log("\nDone.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
