export interface IndustryStripItem {
  v: string;
  l: string;
  desc?: string;
}

export interface IndustryNeedItem {
  num: string;
  t: string;
  x: string;
}

export interface IndustryStepItem {
  num: string;
  t: string;
  x: string;
}

export interface IndustryCaseStat {
  v: string;
  l: string;
}

export interface IndustryCase {
  sector: string;
  years: string;
  place: string;
  title: string;
  stats: IndustryCaseStat[];
  href?: string;
}

export interface IndustryLink {
  name: string;
  href: string;
  desc?: string;
  subLinkLabel?: string;
  subLinkHref?: string;
}

export interface IndustryServiceHighlight {
  prefix: string;
  linkLabel: string;
  href: string;
  suffix: string;
}

export interface IndustryFleetCard {
  title: string;
  image: string;
  imageAlt: string;
  description: string;
  ctaLabel?: string;
  href?: string;
}

export interface IndustryStandardItem {
  title?: string;
  text: string;
}

export interface IndustryFaq {
  q: string;
  a: string;
}

export interface IndustryDetailData {
  slug: string;
  title: string;
  badge: string;
  h1: string;
  heroSubtitle: string;
  heroP: string;
  heroParagraphs: string[];
  heroImage: string;
  heroImagePos: string;
  featureImage: string;
  featureImageAlt: string;
  heroPrimaryCta: { label: string; href: string };
  heroSecondaryCta: { label: string; href: string };
  strip: IndustryStripItem[];
  statementEyebrow: string;
  statement: string;
  needsEyebrow: string;
  needsH2: string;
  needsIntro: string[];
  needs: IndustryNeedItem[];
  stepsEyebrow: string;
  stepsH2: string;
  stepsIntro: string[];
  steps: IndustryStepItem[];
  servicesEyebrow: string;
  servicesH2: string;
  servicesIntro: string[];
  services: IndustryLink[];
  serviceHighlights?: IndustryServiceHighlight[];
  fleetEyebrow: string;
  fleetH2: string;
  fleetIntro: string[];
  fleetCards: IndustryFleetCard[];
  vehicles: string[];
  coverageEyebrow: string;
  coverageH2: string;
  coverageParagraphs: string[];
  coverageLinks: IndustryLink[];
  proofEyebrow: string;
  proofH2: string;
  proofIntro: string;
  cases: IndustryCase[];
  standardsEyebrow: string;
  standardsH2: string;
  standardsIntro: string[];
  standardsItems: IndustryStandardItem[];
  standardsNote?: string;
  standardsPhone?: string;
  faqsEyebrow: string;
  faqsH2: string;
  faqs: IndustryFaq[];
  others: IndustryLink[];
  ctaH2: string;
  ctaP: string;
  ctaSubH3?: string;
  ctaSubP?: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
}

export const INDUSTRY_DETAILS: Record<string, IndustryDetailData> = {
  aviation: {
    slug: "aviation",
    title: "Reliable Crew Transportation for Aviation and FBO Networks | AB.Limo",
    badge: "Aviation & FBO",
    h1: "Reliable Crew Transportation for Aviation and FBO Networks",
    heroSubtitle: "Crew and passenger transport that keeps pace with the flight schedule",
    heroP:
      "Aviation logistics requires exact synchronisation between flight schedules and tarmac turnarounds. AB delivers managed crew transportation across Saudi Arabia, the UAE and Qatar for international airlines, crew planners, FBOs, private jet operators and ground handlers. Our 24/7 operations centre in Riyadh coordinates regional dispatches to keep flight personnel rested, compliant and on schedule.",
    heroParagraphs: [
      "Aviation logistics requires exact synchronisation between flight schedules and tarmac turnarounds. AB delivers managed crew transportation across Saudi Arabia, the UAE and Qatar for international airlines, crew planners, FBOs, private jet operators and ground handlers. Our 24/7 operations centre in Riyadh coordinates regional dispatches to keep flight personnel rested, compliant and on schedule.",
    ],
    heroImage: "/industries/aviation.jpg",
    heroImagePos: "60% 50%",
    featureImage: "/industries/www.ab.limo-industries-aviation-images/image1.jpg",
    featureImageAlt:
      "A line of black executive transfer vehicles parked alongside a private aviation terminal hangar",
    heroPrimaryCta: { label: "Request a proposal", href: "/corporate-accounts" },
    heroSecondaryCta: { label: "Talk to a planner", href: "/corporate-accounts" },
    strip: [
      {
        v: "8",
        l: "Gulf airports served",
        desc: "Primary air hubs across Saudi Arabia, the UAE and Qatar",
      },
      {
        v: "24/7",
        l: "Flight tracked dispatch",
        desc: "Successful crew rotations and private flight movements",
      },
      {
        v: "FBO",
        l: "Private terminal pickups",
        desc: "Operating across regional aviation corridors",
      },
    ],
    statementEyebrow: "How we work",
    statement:
      "From scheduled crew rotations to private jet arrivals, every pickup is tied to live flight data and backed by standby vehicles for delays and diversions.",
    needsEyebrow: "The challenge",
    needsH2: "Operational Pressures in Aviation Ground Mobility",
    needsIntro: [
      "Coordinating ground movements for commercial flight decks and private charters leaves no room for administrative delays. Planners manage rigid rest protocols while dealing with unpredictable airspace congestion across regional sectors. Ground handlers require dependable transport partners who adapt when timetables shift unexpectedly.",
    ],
    needs: [
      {
        num: "01",
        t: "Crew Rest Rules and Duty Time Limits",
        x: "Civil aviation authorities mandate strict rest windows between operational sectors. Chauffeur delays directly consume legal rest periods, risking unexpected duty violations and aircraft groundings. Coordinated hotel to airport transfers protect mandatory rest breaks through planned routes and timely staging.",
      },
      {
        num: "02",
        t: "Irregular Operations, Delays and Diversions",
        x: "Weather diversions, technical holds and slot renegotiations disrupt planned transfers across airline rosters. Ground networks must deploy backup capacity immediately when flights divert to alternate bases. Central dispatch teams adjust pickup schedules in response to live flight tracking alerts.",
      },
      {
        num: "03",
        t: "Airside and Private Terminal Access",
        x: "Navigating dedicated FBO facilities, general aviation gates and restricted commercial aprons requires specific security credentials. Chauffeurs lacking proper gate clearances cause passenger frustration and boarding holdups. Professional operations clear access protocols before vehicles arrive at terminal perimeters.",
      },
      {
        num: "04",
        t: "Daily Rosters Across Several Airports",
        x: "Operating simultaneous flight rotations across several hubs introduces acute logistics complexity for regional transport managers. Crew movements demand unified scheduling across multiple cities without miscommunication. Unified billing and real time visibility ease the administrative burden for busy operations teams.",
      },
    ],
    stepsEyebrow: "How we run it",
    stepsH2: "A Disciplined Operating Model for Aviation Movements",
    stepsIntro: [
      "AB applies a systematic framework designed around airline crew transport Dubai hubs and broader Gulf commercial networks. Our centralized dispatch protocols align every transfer with live aircraft positions to protect on time performance. Every movement follows four distinct stages from preliminary roster ingestion to post flight reporting.",
    ],
    steps: [
      {
        num: "01",
        t: "Brief",
        x: "Our aviation team reviews flight rotations, passenger manifests, hotel contracts and specific handling preferences. We assign a dedicated account manager to establish communications protocols, preferred vehicle categories, passenger quotas and terminal access procedures across all participating airports.",
      },
      {
        num: "02",
        t: "Plan",
        x: "Operations planners map out transit corridors between crew accommodation and departure gates, allowing for regional traffic fluctuations. We reserve primary vehicles and standby units while integrating airline scheduling software feeds directly into our central dispatch platform.",
      },
      {
        num: "03",
        t: "Operate",
        x: "The Riyadh 24/7 operations centre tracks inbound aircraft sectors in real time and updates vehicle staging windows automatically. Chauffeurs arrive ahead of schedule, verify passenger identity discreetly, assist with flight luggage and deliver personnel smoothly to their departure terminal.",
      },
      {
        num: "04",
        t: "Report",
        x: "Following completed rotations, we deliver transparent analytics covering pickup timings, route milestones and overall punctuality metrics. Consolidated invoicing matches individual flight legs with agreed purchase orders, simplifying audit reconciliations for airline commercial offices.",
      },
    ],
    servicesEyebrow: "Services",
    servicesH2: "Connected Ground Services for Aviation Partners",
    servicesIntro: [
      "Aviation logistics demands versatile transport categories tailored to varying crew volumes and executive passenger profiles. AB links specialist ground capabilities through managed corporate frameworks across Saudi Arabia and the Emirates.",
    ],
    services: [
      {
        name: "Airport Transfers",
        href: "/services/airport-transfers",
        desc: "Provides punctual terminal movements for flight operations using dedicated luxury airport transfer vehicles for flight commanders.",
        subLinkLabel: "Luxury airport transfer UAE",
        subLinkHref: "/services/airport-transfers/uae",
      },
      {
        name: "Bus & Coach Hire",
        href: "/services/bus-coach-hire",
        desc: "Moves complete cabin groups efficiently between layover accommodation and international gates on shared sector rotations.",
      },
      {
        name: "Chauffeur & VIP",
        href: "/services/chauffeur-vip",
        desc: "Delivers discrete transit for private aviators, including tailored airport chauffeur service solutions for VIP terminal arrivals.",
        subLinkLabel: "Airport chauffeur service",
        subLinkHref: "/services/airport-transfers/uae",
      },
      {
        name: "Corporate Accounts",
        href: "/corporate-accounts",
        desc: "Centralises multi city billing, custom duty of care reporting and dedicated booking tools for airline logistics coordinators.",
      },
    ],
    serviceHighlights: [
      {
        prefix: "Arranging an ",
        linkLabel: "airport chauffeur service Dubai",
        href: "/locations/uae/dubai/airport/dubai-international-airport",
        suffix:
          " booking maintains punctual transfers between terminal facilities and regional hospitality properties.",
      },
      {
        prefix: "Booking an ",
        linkLabel: "Abu Dhabi airport chauffeur service",
        href: "/locations/uae/abu-dhabi/airport/zayed-international-airport",
        suffix:
          " transfer provides smooth transit for personnel arriving at modern capital flight facilities.",
      },
    ],
    fleetEyebrow: "Fleet",
    fleetH2: "Purpose Built Fleet for Aviation and FBO Logistics",
    fleetIntro: [
      "Selecting suitable vehicles preserves passenger comfort during layovers and accommodates uniform standards for commercial crews. AB operates modern executive models fitted with advanced safety features and ample luggage space across the Gulf region. Browse our complete fleet options to review interior dimensions and passenger configurations.",
    ],
    fleetCards: [
      {
        title: "Premium MPV",
        image: "/industries/www.ab.limo-industries-aviation-images/image2.jpg",
        imageAlt: "A luxury executive MPV parked outside an airport aviation facility",
        description:
          "Mercedes V Class or similar. Exceptional comfort and generous cargo capacity make this vehicle ideal for flight deck duos and cabin crew baggage during extended regional rotations.",
        ctaLabel: "View Premium MPV",
        href: "/fleet",
      },
      {
        title: "Executive Van",
        image: "/industries/www.ab.limo-industries-aviation-images/image3.jpg",
        imageAlt: "A high roof executive van parked in an airport drop off lane",
        description:
          "Mercedes Sprinter or similar. The preferred choice for complete cabin teams, offering standing headroom, individual reclining seats and climate control engineered for desert conditions.",
        ctaLabel: "View Executive Van",
        href: "/fleet",
      },
      {
        title: "Business Sedan",
        image: "/industries/www.ab.limo-industries-aviation-images/image4.jpg",
        imageAlt: "An executive business sedan standing outside an FBO facility",
        description:
          "Mercedes E Class or similar. A refined transport solution for relief captains, technical inspectors, maintenance engineers and airline ground executives travelling between hub offices.",
        ctaLabel: "View Business Sedan",
        href: "/fleet",
      },
      {
        title: "First Class Sedan",
        image: "/industries/www.ab.limo-industries-aviation-images/image5.jpg",
        imageAlt: "A first class luxury sedan positioned beside a private aircraft hangar",
        description:
          "Mercedes S Class or similar. Discreet, quiet travel suited to private aviation principals, aircraft owners, executive flight charter guests and high profile commercial aviation leaders.",
        ctaLabel: "View First Class Sedan",
        href: "/fleet",
      },
    ],
    vehicles: ["Premium MPV", "Executive Van", "Business Sedan", "First Class Sedan", "Coach"],
    coverageEyebrow: "Coverage",
    coverageH2: "Comprehensive Aviation Hub Coverage Across the Gulf",
    coverageParagraphs: [
      "AB provides coordinated ground transport across major aviation gateways in Saudi Arabia, the UAE and Qatar. Our chauffeurs serve King Khalid International Airport (RUH) in Riyadh, King Abdulaziz International Airport (JED) in Jeddah, and King Fahd International Airport (DMM) in Dammam. Direct support extends across the Emirates via Dubai International (DXB), Dubai World Central (DWC), and Zayed International Airport (AUH) in Abu Dhabi, alongside Hamad International Airport (DOH) in Doha.",
    ],
    coverageLinks: [
      {
        name: "Dubai International (DXB)",
        href: "/locations/uae/dubai/airport/dubai-international-airport",
      },
      {
        name: "Zayed International Airport (AUH)",
        href: "/locations/uae/abu-dhabi/airport/zayed-international-airport",
      },
      {
        name: "King Khalid International Airport (RUH)",
        href: "/locations/saudi-arabia/riyadh/airport/king-khalid-international-airport",
      },
      {
        name: "King Abdulaziz International Airport (JED)",
        href: "/locations/saudi-arabia/jeddah/airport/king-abdulaziz-international-airport",
      },
      {
        name: "Hamad International Airport (DOH)",
        href: "/locations/qatar/doha/airport/hamad-international-airport",
      },
    ],
    proofEyebrow: "Proof",
    proofH2: "Documented Performance in Aviation Ground Mobility",
    proofIntro: "Published only with client approval.",
    cases: [
      {
        sector: "Commercial & Private Aviation",
        years: "24/7 Operations",
        place: "Riyadh, Dubai & Doha",
        title: "GCC Airline Crew Rotations & FBO Terminal Transfers",
        stats: [
          { v: "8", l: "Primary Gulf air hubs" },
          { v: "24/7", l: "Flight-tracked dispatch" },
        ],
      },
      {
        sector: "VIP & Charter Aviation",
        years: "Ongoing",
        place: "Saudi Arabia, UAE & Qatar",
        title: "Executive FBO & Private Jet Ground Handling",
        stats: [
          { v: "FBO", l: "Airside & lounge coordination" },
          { v: "100%", l: "Duty of care compliance" },
        ],
      },
    ],
    standardsEyebrow: "Standards",
    standardsH2: "Rigorous Aviation Compliance and Chauffeur Standards",
    standardsIntro: [
      "Maintaining regulatory compliance remains central to every managed ground programme. Operating near active airfields demands strict adherence to local transport authority rules, airport security procedures and duty of care frameworks. AB applies continuous flight tracking and proactive vehicle monitoring to protect passenger well being and preserve on time performance.",
    ],
    standardsItems: [
      {
        title: "Licensed chauffeurs",
        text: "Licensed chauffeurs holding verified police clearances, airport safety accreditations and professional defensive driving certifications.",
      },
      {
        title: "GPS tracking",
        text: "Real time GPS tracking and telematics monitored continuously by the 24/7 operations centre in Riyadh.",
      },
      {
        title: "Standby vehicles",
        text: "Dedicated standby vehicles positioned across key hub radii to mitigate schedule disruption during peak traffic windows.",
      },
      {
        title: "Airport security & ramp clearance",
        text: "Full compliance with airport security permits, FBO gate protocols and ramp clearance documentation.",
      },
    ],
    faqsEyebrow: "Questions",
    faqsH2: "Frequently Asked Questions About Crew Transportation",
    faqs: [
      {
        q: "How does AB coordinate crew transportation during unexpected flight delays?",
        a: "Our 24/7 operations centre in Riyadh monitors live aviation radar and scheduling feeds to identify timetable adjustments automatically. Chauffeurs adjust their staging windows without requiring manual intervention from airline planners. Dedicated backup vehicles remain on standby near primary terminals to assist when arrival slots shift unexpectedly.",
      },
      {
        q: "What options are available for crew transportation Dubai airline rotations?",
        a: "We deploy high capacity Executive Vans for complete cabin crews and Premium MPVs for flight deck officers operating across Dubai International and Dubai World Central. Operations teams manage daily layover routes between regional hotels and private airport facilities. Transparent reporting and centralised dispatch maintain regular communication throughout the layover cycle.",
      },
      {
        q: "How are crew transportation solutions Dubai programmes tailored for international airlines?",
        a: "International airlines receive dedicated account oversight with custom passenger manifests integrated directly into our central dispatch system. Transport plans adapt to complex crew rosters, layover arrangements and sudden aircraft swaps across regional terminals. Consolidated monthly invoicing simplifies accounting audits for international commercial aviation offices.",
      },
      {
        q: "Can AB support airport crew transportation UAE schedules across multiple emirates?",
        a: "Yes, AB coordinates multi airport crew logistics across all seven UAE emirates directly through our local operations offices. We facilitate smooth inter terminal transfers between Dubai, Sharjah and Abu Dhabi when flight crews reposition between bases. Real time telematics give airline coordinators complete oversight over every transit leg.",
      },
      {
        q: "What services are offered for crew transportation Abu Dhabi operations?",
        a: "Our Abu Dhabi branch coordinates terminal transfers at Zayed International Airport for commercial airlines, executive charter operators and government flight delegations. We provide executive sedans, spacious MPVs and luxury coaches maintained to exacting safety standards. Chauffeurs understand local terminal access gates and protocol requirements thoroughly.",
      },
      {
        q: "How does AB deliver FBO ground transportation for private aviation terminals?",
        a: "AB coordinates transfers directly with general aviation handling agents and FBO lounges across Saudi Arabia, the UAE and Qatar. Our team coordinates airside drop offs and discreet passenger pickups according to specific flight arrival coordinates. Clean executive vehicles stand ready as soon as the aircraft taxi cycle completes.",
      },
      {
        q: "Can private flight operators book a private jet chauffeur for flight deck crew?",
        a: "Yes, business aviation operators frequently book our executive sedans and premium MPVs for dedicated pilot and flight deck movements. Chauffeurs maintain flexible standby schedules to accommodate shifting departure slots and handling delays without stress. Direct communication with handling staff facilitates prompt terminal departures upon landing.",
      },
    ],
    others: [
      { name: "Corporate & Enterprise", href: "/industries/corporate-enterprise" },
      { name: "Government & Diplomatic", href: "/industries/government-diplomatic" },
      { name: "Hospitality", href: "/industries/hospitality" },
      { name: "Events & Exhibitions", href: "/industries/events-exhibitions" },
      { name: "Energy & Giga Projects", href: "/industries/energy-giga-projects" },
      { name: "Sports & Entertainment", href: "/industries/sports-entertainment" },
    ],
    ctaH2: "Arranging Coordinated Crew Transportation",
    ctaP: "Reliable crew transportation protects mandatory rest windows and keeps scheduled flight operations moving smoothly across primary aviation hubs in Saudi Arabia, the UAE and Qatar.",
    ctaPrimaryLabel: "Request a proposal",
    ctaPrimaryHref: "/corporate-accounts",
    ctaSecondaryLabel: "Book a transfer",
    ctaSecondaryHref: "/services/airport-transfers",
  },

  "corporate-enterprise": {
    slug: "corporate-enterprise",
    title: "Managed Corporate Ground Transportation for Enterprise | AB.Limo",
    badge: "Corporate & Enterprise",
    h1: "Managed Corporate Ground Transportation for Enterprise",
    heroSubtitle: "Executive travel, roadshows and staff mobility under one corporate account",
    heroP:
      "Reliable corporate ground transportation provides enterprise organisations with dependable travel coordination for executive movements, cross border itineraries and daily staff transfers. AB supports multinational companies, executive assistants, travel managers and procurement teams with centralized operations across Saudi Arabia, the UAE and Qatar. Our managed transport framework aligns dispatch, duty of care compliance and consolidated account billing under a single service contract.",
    heroParagraphs: [
      "Reliable corporate ground transportation provides enterprise organisations with dependable travel coordination for executive movements, cross border itineraries and daily staff transfers. AB supports multinational companies, executive assistants, travel managers and procurement teams with centralized operations across Saudi Arabia, the UAE and Qatar. Our managed transport framework aligns dispatch, duty of care compliance and consolidated account billing under a single service contract.",
      "Modern enterprise mobility demands punctuality, professional conduct and rigorous cost administration across every operating territory. Organisations select AB to eliminate service fragmentation, replace disparate taxi providers and gain real time visibility over regional business travel.",
    ],
    heroImage: "/industries/corporate.jpg",
    heroImagePos: "55% 50%",
    featureImage: "/industries/www.ab.limo-industries-corporate-enterprise-images/image1.jpg",
    featureImageAlt:
      "Executive passenger boarding a business sedan in a Middle East financial district",
    heroPrimaryCta: { label: "Request a proposal", href: "/corporate-accounts" },
    heroSecondaryCta: { label: "Talk to a planner", href: "/services/corporate-transportation" },
    strip: [
      {
        v: "1",
        l: "Contract and monthly invoice",
        desc: "Corporate Programmes Managed under one master agreement",
      },
      {
        v: "24/7",
        l: "Enterprise Experience",
        desc: "Centralized dispatch across Saudi Arabia, the UAE and Qatar",
      },
      {
        v: "GCC",
        l: "Cities Across the GCC",
        desc: "Riyadh, Jeddah, Dammam, Dubai, Abu Dhabi and Doha",
      },
    ],
    statementEyebrow: "How we work",
    statement:
      "Corporate accounts combine dedicated vehicles, staff routes and on demand chauffeurs, with direct billing and reporting your finance team can reconcile in minutes.",
    needsEyebrow: "The challenge",
    needsH2: "Addressing Corporate Ground Transportation Obstacles",
    needsIntro: [
      "Corporate travel managers and procurement leads frequently encounter operational friction when coordinating transport across multiple regional territories. Managing multiple local providers leads to unpredictable service quality, administrative overhead and poor duty of care visibility. AB resolves these systematic challenges with structured fleet governance and transparent digital oversight.",
    ],
    needs: [
      {
        num: "01",
        t: "Many suppliers and invoices across cities",
        x: "Working with disconnected transport suppliers across Riyadh, Dubai and Doha generates paperwork friction. Procurement teams face separate accounting cycles, varying billing currencies and inconsistent payment terms that obscure total travel spend.",
      },
      {
        num: "02",
        t: "Inconsistent service for executives",
        x: "Unmanaged ride hailing services and unverified car services create unpredictable arrival timings and variable driver standards. Senior directors and visiting board members require discreet chauffeurs, immaculate vehicles and punctual routing without exception.",
      },
      {
        num: "03",
        t: "Staff routes that change every week",
        x: "Dynamic project rosters and changing office attendance schedules disrupt static shuttle contracts. Mobility teams need flexible fleet allocation that adjusts vehicle capacity and pick up schedules as workforce requirements shift.",
      },
      {
        num: "04",
        t: "No reporting for cost control",
        x: "Decentralised bookings leave travel managers without passenger verification or trip audits. Without granular reporting by department and cost centre, enterprise leadership cannot identify itinerary inefficiencies or control expenditure.",
      },
    ],
    stepsEyebrow: "How we run it",
    stepsH2: "Delivering Managed Corporate Ground Transportation",
    stepsIntro: [
      "AB operates a centralized service model designed specifically for enterprise travel programmes across the Middle East. Through our 24/7 operations centre in Riyadh, dedicated account managers coordinate dispatch, track journey status and audit vehicle compliance. We standardise service delivery across all direct markets to maintain consistent standards.",
    ],
    steps: [
      {
        num: "01",
        t: "Brief",
        x: "Our enterprise team reviews your corporate travel patterns, executive preferences and compliance protocols. We establish custom service level agreement parameters, vehicle class allocations and cost centre structures suited to your organisation.",
      },
      {
        num: "02",
        t: "Plan",
        x: "Transport planners build optimised route matrices, coordinate flight monitoring for airport transfers and assign dedicated account specialists. Schedules are integrated directly with executive assistant workflows to streamline advance bookings.",
      },
      {
        num: "03",
        t: "Operate",
        x: "Our 24/7 operations centre monitors movements in real time using onboard GPS tracking. Chauffeurs arrive ahead of schedule, observe regional protocol and maintain vehicle presentation across every itinerary.",
      },
      {
        num: "04",
        t: "Report",
        x: "Finance teams receive a consolidated monthly invoice detailing trip logs, passenger names and assigned internal cost centres. Custom analytics reports help procurement leads evaluate usage trends and optimize transport spend.",
      },
    ],
    servicesEyebrow: "Services",
    servicesH2: "Comprehensive Mobility Services for Corporate Programmes",
    servicesIntro: [
      "Enterprise requirements encompass varied journey profiles ranging from recurring airport runs to executive board summits. Organisations access specialised corporate chauffeur hire for local operations, alongside scalable solutions for business chauffeur hire and employee transportation service. AB unifies these capabilities into structured corporate transportation services UAE and regional frameworks.",
    ],
    services: [
      {
        name: "Corporate Transportation",
        href: "/services/corporate-transportation",
        desc: "Provides comprehensive executive travel transportation, scheduled shuttle programmes and regional project team transit.",
        subLinkLabel: "Corporate chauffeur hire UAE",
        subLinkHref: "/services/corporate-transportation/uae",
      },
      {
        name: "Chauffeur & VIP",
        href: "/services/chauffeur-vip",
        desc: "Delivers elite executive transportation services tailored for corporate leaders, board delegations and official protocol guests.",
      },
      {
        name: "Airport Transfers",
        href: "/services/airport-transfers",
        desc: "Features flight tracking, terminal meet and greet coordination, and uninterrupted transfer routing between commercial terminals.",
      },
      {
        name: "Corporate Accounts",
        href: "/corporate-accounts",
        desc: "Manages centralized invoicing, consolidated payment terms and assigned account specialists for regional organisations.",
      },
    ],
    fleetEyebrow: "Fleet",
    fleetH2: "Executive Fleet for Corporate and Enterprise Operations",
    fleetIntro: [
      "AB maintains an audited fleet of premium vehicles equipped for executive comfort, corporate productivity and mobile connectivity. Every vehicle undergoes stringent technical inspections, carries comprehensive insurance and features satellite tracking monitored by our dispatch centre. Explore our full vehicle range through our fleet directory.",
    ],
    fleetCards: [
      {
        title: "Business Sedan",
        image: "/industries/www.ab.limo-industries-corporate-enterprise-images/image2.jpg",
        imageAlt: "Business sedan vehicle class for corporate travel",
        description:
          "Ideal for senior managers and daily business travel, providing quiet cabins and refined comfort. BMW 5 Series, Mercedes Benz E Class, or similar.",
        ctaLabel: "View Business Sedan",
        href: "/fleet",
      },
      {
        title: "First Class Sedan",
        image: "/industries/www.ab.limo-industries-corporate-enterprise-images/image3.jpg",
        imageAlt: "First class luxury sedan for executive transportation",
        description:
          "Tailored for chief executives, board directors and distinguished protocol dignitaries requiring discreet luxury. Mercedes Benz S Class, BMW 7 Series, or similar.",
        ctaLabel: "View First Class Sedan",
        href: "/fleet",
      },
      {
        title: "Executive SUV",
        image: "/industries/www.ab.limo-industries-corporate-enterprise-images/image4.jpg",
        imageAlt: "Executive SUV for corporate travel and regional roadshows",
        description:
          "Perfect for delegation movements, roadshow transportation, site visits and passengers travelling with substantial luggage capacity. Cadillac Escalade, GMC Yukon Denali, or similar.",
        ctaLabel: "View Executive SUV",
        href: "/fleet",
      },
      {
        title: "Executive Van",
        image: "/industries/www.ab.limo-industries-corporate-enterprise-images/image5.jpg",
        imageAlt: "Executive van for corporate group transfers",
        description:
          "Suited for corporate teams, visiting event staff and coordinated airport shuttle itineraries without sacrificing luxury. Mercedes Benz V Class, or similar.",
        ctaLabel: "View Executive Van",
        href: "/fleet",
      },
    ],
    vehicles: ["Business Sedan", "First Class Sedan", "Executive SUV", "Executive Van"],
    coverageEyebrow: "Coverage",
    coverageH2: "GCC Coverage Across Primary Commercial Hubs",
    coverageParagraphs: [
      "AB provides direct coverage across Saudi Arabia, all seven UAE emirates and Qatar, supported by our operations headquarters in Riyadh. Clients reserve dedicated corporate chauffeur service Riyadh for capital operations, alongside regular schedules across Jeddah and Dammam. For broader Gulf business itineraries, our teams deliver dependable corporate chauffeur service Dubai and Abu Dhabi, as well as premium corporate chauffeur service Doha. Partner operations in Bahrain, Kuwait and Oman are available on request through vetted affiliates.",
    ],
    coverageLinks: [
      {
        name: "Corporate Chauffeur Service Riyadh",
        href: "/services/corporate-transportation/saudi-arabia/riyadh",
      },
      {
        name: "Corporate Chauffeur Service Dubai",
        href: "/services/corporate-transportation/uae/dubai",
      },
      {
        name: "Corporate Chauffeur Service Doha",
        href: "/services/corporate-transportation/qatar/doha",
      },
      {
        name: "Corporate Chauffeur Hire UAE",
        href: "/services/corporate-transportation/uae",
      },
    ],
    proofEyebrow: "Proof",
    proofH2: "Demonstrated Results for Enterprise Clients",
    proofIntro: "Published only with client approval.",
    cases: [
      {
        sector: "Corporate",
        years: "Ongoing",
        place: "Saudi Arabia",
        title: "Roshn Group Staff Shuttle",
        stats: [
          { v: "4", l: "Vehicles daily" },
          { v: "13 to 15", l: "Passengers each" },
        ],
      },
      {
        sector: "Energy and corporate",
        years: "2024 to present",
        place: "Jubail and Eastern Region, KSA",
        title: "Siemens Energy",
        stats: [
          { v: "7", l: "Day coverage" },
          { v: "0", l: "Major incidents" },
        ],
      },
    ],
    standardsEyebrow: "Standards",
    standardsH2: "Operational Rigour, Duty of Care and Compliance",
    standardsIntro: [
      "AB enforces strict operational procedures to uphold corporate duty of care responsibilities across every booking. Every itinerary operates under an agreed service level agreement that defines vehicle standards, dispatch protocols and reporting timetables. Our 24/7 operations centre in Riyadh oversees driver readiness and vehicle positioning, providing central safety governance across all business movements.",
    ],
    standardsItems: [
      {
        title: "Licensed chauffeurs",
        text: "Professionally certified drivers trained in corporate etiquette, defensive driving, route planning and passenger discretion.",
      },
      {
        title: "GPS tracking",
        text: "Real time telemetry monitoring by our dispatch centre for passenger safety and precise milestone reporting.",
      },
      {
        title: "Standby vehicles",
        text: "Strategic backup fleet positioned across key business districts to address sudden schedule adjustments.",
      },
      {
        title: "Corporate security & compliance",
        text: "Customised compliance frameworks matching corporate security standards and health protocols.",
      },
    ],
    faqsEyebrow: "Questions",
    faqsH2: "Frequently Asked Questions About Corporate Ground Transportation",
    faqs: [
      {
        q: "How does a corporate chauffeur account simplify multi city business travel?",
        a: "A corporate chauffeur account with AB consolidates bookings across Riyadh, Dubai and Doha into a unified enterprise framework. Travel coordinators book journeys through a central point of contact, eliminating the administrative friction of multiple supplier agreements. Billing arrives on a consolidated monthly invoice broken down by internal department, project code and booking reference, simplifying reconciliation for finance teams.",
      },
      {
        q: "What executive transportation services are available for visiting board delegations?",
        a: "AB delivers dedicated executive transportation services for board meetings, investor visits and executive leadership tours. Chauffeurs operate premium first class sedans and luxury SUVs, remaining on standby throughout full day itineraries. The dispatch team coordinates airport tarmac meets, motorcades and hotel transfers with meticulous attention to passenger privacy and timing precision.",
      },
      {
        q: "How does AB manage dynamic roadshow transportation across Gulf financial centres?",
        a: "Our roadshow transportation teams handle tight, multi stop itineraries across financial districts in Saudi Arabia, the UAE and Qatar. Dedicated roadshow dispatchers track market schedules, monitor regional traffic conditions and maintain continuous communication with executive assistants. Chauffeurs remain assigned to the passenger group throughout the assignment, adjusting seamlessly to impromptu meeting extensions or venue adjustments.",
      },
      {
        q: "How does AB handle changing staff routes and workforce commuter requirements?",
        a: "Enterprise mobility managers can adjust staff shuttle routes, vehicle capacities and pick up schedules through their assigned account manager. AB tracks passenger volume trends and adapts daily dispatch plans to accommodate hybrid working patterns or sudden site relocations. This operational flexibility allows organisations to right size their employee transit programmes while preserving commuter reliability.",
      },
      {
        q: "What duty of care measures are enforced across corporate travel transportation?",
        a: "AB enforces duty of care through strict vehicle maintenance schedules, professional background checks and real time GPS telemetry monitored by our 24/7 operations centre. Corporate travel managers receive departure and arrival notifications, with full driver identification provided in advance. These safeguards ensure full operational transparency and passenger security across all corporate travel transportation routes.",
      },
      {
        q: "Can corporate ground transportation spend be segmented by cost centre and department?",
        a: "Yes, AB provides customized invoicing that maps directly to your organization internal accounting structures. Travel managers assign specific cost centre codes, purchase order numbers and employee identifiers to each booking request. Consolidated monthly statements present clean accounting breakdowns, enabling procurement leads to allocate transport expenditure accurately without manual data sorting.",
      },
      {
        q: "How are airport transfers coordinated for late night or delayed commercial flights?",
        a: "AB dispatch specialists monitor commercial flight schedules in real time through direct aviation data feeds. When flight arrivals are delayed or rescheduled, pickup times adjust automatically without requiring rebooking intervention from executive assistants. Chauffeurs are staged at designated airport waiting zones, prepared to welcome arriving passengers immediately upon terminal exit.",
      },
    ],
    others: [
      { name: "Aviation & FBO", href: "/industries/aviation" },
      { name: "Government & Diplomatic", href: "/industries/government-diplomatic" },
      { name: "Hospitality", href: "/industries/hospitality" },
      { name: "Events & Exhibitions", href: "/industries/events-exhibitions" },
      { name: "Energy & Giga Projects", href: "/industries/energy-giga-projects" },
      { name: "Sports & Entertainment", href: "/industries/sports-entertainment" },
    ],
    ctaH2: "Upgrade Your Corporate Ground Transportation Programme",
    ctaP: "Partner with AB to unify executive transfers, workforce mobility and multi city roadshows under a managed regional framework backed by our 24/7 operations centre.",
    ctaPrimaryLabel: "Request a proposal",
    ctaPrimaryHref: "/corporate-accounts",
    ctaSecondaryLabel: "Book a transfer",
    ctaSecondaryHref: "/services/corporate-transportation",
  },

  "energy-giga-projects": {
    slug: "energy-giga-projects",
    title: "Managed Giga Project Transportation | Energy & Giga Projects | AB.Limo",
    badge: "Energy & Giga Projects",
    h1: "Managed Giga Project Transportation",
    heroSubtitle: "Workforce and executive transport for remote, large scale projects",
    heroP:
      "Specialised giga project transportation moves thousands of specialists, engineers and executives across expansive industrial footprints every day. Project owners, tier one contractors, multinational energy companies and site managers rely on dedicated operations to maintain continuous shift schedules across remote developments. Centralised control coordinates daily movements between regional airports, worker residential camps and active construction zones.",
    heroParagraphs: [
      "Specialised giga project transportation moves thousands of specialists, engineers and executives across expansive industrial footprints every day. Project owners, tier one contractors, multinational energy companies and site managers rely on dedicated operations to maintain continuous shift schedules across remote developments. Centralised control coordinates daily movements between regional airports, worker residential camps and active construction zones.",
      "Choosing the correct ground mobility strategy depends on regional road conditions, client health and safety mandates, daily passenger volumes and peak turnaround windows. AB aligns vetted vehicles, professional drivers and live technology to protect schedules across major capital ventures.",
    ],
    heroImage: "/industries/energy.jpg",
    heroImagePos: "50% 45%",
    featureImage: "/industries/www.ab.limo-industries-energy-giga-projects-images/image1.jpg",
    featureImageAlt:
      "Fleet of transport vehicles parked near a modern industrial site office at sunrise",
    heroPrimaryCta: { label: "Request a proposal", href: "/contact" },
    heroSecondaryCta: { label: "Talk to a planner", href: "/contact" },
    strip: [
      {
        v: "18",
        l: "Luxury coaches a month at NEOM Trojena",
        desc: "Operating within energy and heavy infrastructure mobility",
      },
      {
        v: "7",
        l: "Day coverage for Siemens Energy",
        desc: "Completed passenger logistics programmes across the Gulf region",
      },
      {
        v: "0",
        l: "Major incidents",
        desc: "Industrial hubs and development centres supported directly",
      },
    ],
    statementEyebrow: "How we work",
    statement:
      "Project transport is planned around your shifts and sites, with dedicated vehicles, licensed drivers and dispatch support that covers remote locations around the clock.",
    needsEyebrow: "The challenge",
    needsH2: "Navigating Giga Project Transportation Logistics on Remote Sites",
    needsIntro: [
      "Operating passenger movements on massive infrastructure developments presents unique operational difficulties rarely found in urban transit. Dynamic work fronts, heavy plant traffic and strict entry protocols require proactive planning. AB addresses these four key logistical pressures to keep personnel safe and active.",
    ],
    needs: [
      {
        num: "01",
        t: "Shift changes for large teams",
        x: "Coordinating simultaneous personnel rotations demands exact staging and route planning. Staggered arrivals prevent bottleneck delays at security gates, keeping production runs fully staffed across all operational shifts.",
      },
      {
        num: "02",
        t: "Remote sites far from cities",
        x: "Long transit corridors between commercial airports, living quarters and isolated plots require disciplined scheduling. Routine vehicle maintenance and professional driver rotations mitigate fatigue over extended desert highway runs.",
      },
      {
        num: "03",
        t: "Safety and compliance on site roads",
        x: "Unpaved tracks and heavy machinery zones demand rigorous driver training and strict vehicular standards. Every vehicle must comply with industrial safety protocols before clearing security perimeters.",
      },
      {
        num: "04",
        t: "Visitor and executive site tours",
        x: "Government delegations, investor groups and corporate directors need secure, premium transport with experienced local drivers. Discreet, punctual service keeps VIP itineraries on track throughout active build environments.",
      },
    ],
    stepsEyebrow: "How we run it",
    stepsH2: "How We Manage Giga Project Transportation Programmes",
    stepsIntro: [
      "Delivering dependable giga project transportation requires a structured operating framework that combines regional coordination with field execution. AB manages end to end transit programmes through dedicated resources and strict oversight. Our methodology keeps teams moving without disruption across Saudi Arabia, the UAE and Qatar.",
    ],
    steps: [
      {
        num: "01",
        t: "Brief",
        x: "We evaluate passenger volumes, site entry requirements, shift rosters and route hazards. A dedicated account manager aligns fleet specifications directly with health and safety standards before deployment.",
      },
      {
        num: "02",
        t: "Plan",
        x: "Our logistics team models turnaround windows, camp to site transit times, staging locations and contingency assets. Every corridor receives verified emergency response procedures and allocated backup units.",
      },
      {
        num: "03",
        t: "Operate",
        x: "The 24/7 operations centre in Riyadh oversees live dispatch, GPS tracking and chauffeur handovers in real time. Continuous communication maintains strict duty of care across all active transit links.",
      },
      {
        num: "04",
        t: "Report",
        x: "Clients receive transparent invoicing, route completion logs, driver performance records and punctuality reports. Regular account reviews provide data backed insights to refine ongoing transport schedules.",
      },
    ],
    servicesEyebrow: "Services",
    servicesH2: "Integrated Ground Services for Energy and Infrastructure",
    servicesIntro: [
      "AB delivers comprehensive transit options tailored to the physical demands of large scale industrial ventures. Choose from our dedicated operational divisions below:",
    ],
    services: [
      {
        name: "Workforce Transportation",
        href: "/services/workforce-mobility",
        desc: "Provides daily project site transportation for technical teams between central accommodation facilities and operational plots.",
      },
      {
        name: "Bus & Coach Hire",
        href: "/services/bus-coach-hire",
        desc: "Delivers high capacity coaches that streamline shift changes across high volume construction zones.",
      },
      {
        name: "Corporate Transportation",
        href: "/services/corporate-transportation",
        desc: "Offers executive chauffeur travel for corporate leadership, government partners and visiting technical consultants.",
      },
      {
        name: "Tender / RFP",
        href: "/contact",
        desc: "Provides procurement managers with detailed commercial proposals for multi year fleet operations.",
      },
    ],
    serviceHighlights: [
      {
        prefix: "Organisations seeking structured ",
        linkLabel: "staff transportation Saudi Arabia",
        href: "/services/corporate-transportation/saudi-arabia",
        suffix:
          " programmes benefit from centrally managed fleet networks across industrial territories.",
      },
      {
        prefix: "Regional contracts requiring dependable ",
        linkLabel: "employee bus transportation UAE",
        href: "/services/bus-coach-hire/uae",
        suffix:
          " solutions receive continuous oversight through our regional operations offices.",
      },
      {
        prefix: "Firms establishing industrial footprints can utilise ",
        linkLabel: "staff transportation Qatar",
        href: "/services/corporate-transportation/qatar",
        suffix:
          " to support continuous site operations and administrative movements.",
      },
      {
        prefix: "Multinational engineering contractors requiring an integrated ",
        linkLabel: "employee transportation service",
        href: "/services/corporate-transportation/uae",
        suffix:
          " gain access to vetted vehicles and scheduled line transfers.",
      },
    ],
    fleetEyebrow: "Fleet",
    fleetH2: "Fleet for Energy & Giga Projects",
    fleetIntro: [
      "Navigating rough terrain and remote desert corridors requires modern vehicles that meet industrial safety specifications. AB supplies late model vehicles that combine passenger comfort with operational reliability. Explore our full capabilities at Fleet.",
    ],
    fleetCards: [
      {
        title: "Executive Van",
        image: "/industries/www.ab.limo-industries-energy-giga-projects-images/image2.jpg",
        imageAlt: "Executive van parked near an administrative entrance",
        description:
          "Mercedes Benz V Class or similar providing spacious, refined mobility for engineering leadership, VIP client inspections and small technical units across regional project offices.",
        ctaLabel: "View Executive Van",
        href: "/fleet",
      },
      {
        title: "Executive SUV",
        image: "/industries/www.ab.limo-industries-energy-giga-projects-images/image3.jpg",
        imageAlt: "Executive four wheel drive vehicle stationed in a desert environment",
        description:
          "Toyota Land Cruiser, GMC Yukon or similar built for difficult desert highways, providing superior durability, safety protection and passenger comfort during remote site inspections.",
        ctaLabel: "View Executive SUV",
        href: "/fleet",
      },
      {
        title: "Premium MPV",
        image: "/industries/www.ab.limo-industries-energy-giga-projects-images/image4.jpg",
        imageAlt: "Premium multi purpose vehicle ready for passenger boarding",
        description:
          "Toyota Alphard or similar suited for visiting investors, executive delegations and management transfers between regional flight hubs and development headquarters.",
        ctaLabel: "View Premium MPV",
        href: "/fleet",
      },
    ],
    vehicles: ["Executive Van", "Executive SUV", "Premium MPV", "Coach"],
    coverageEyebrow: "Coverage",
    coverageH2: "Regional Coverage Across Saudi Arabia and the Gulf",
    coverageParagraphs: [
      "AB provides direct ground mobility across Saudi Arabia, all seven UAE emirates and Qatar. Operations support major developments including NEOM, Tabuk, AlUla, Dammam, Jubail and the Eastern Province with links through our Industries division. Centralised management operates from Riyadh, Dubai, Abu Dhabi and Doha to deliver seamless regional line transfers.",
      "Whether moving project personnel to oil installations in the Eastern Province or supporting development corridors in Tabuk, our network coordinates fleet dispatch across long distances without service gaps. Dedicated partner networks support Bahrain, Kuwait and Oman upon request.",
    ],
    coverageLinks: [
      { name: "All Industries Division", href: "/industries" },
      {
        name: "Staff Transportation Saudi Arabia",
        href: "/services/corporate-transportation/saudi-arabia",
      },
      {
        name: "Employee Bus Transportation UAE",
        href: "/services/bus-coach-hire/uae",
      },
      {
        name: "Staff Transportation Qatar",
        href: "/services/corporate-transportation/qatar",
      },
    ],
    proofEyebrow: "Proof",
    proofH2: "Proven Project Delivery Across the Middle East",
    proofIntro: "Published only with client approval.",
    cases: [
      {
        sector: "Giga projects",
        years: "2025 to present",
        place: "NEOM, Saudi Arabia",
        title: "NEOM Trojena Project",
        stats: [
          { v: "18", l: "Luxury coaches a month" },
          { v: "24/7", l: "Dispatch support" },
        ],
      },
      {
        sector: "Energy and corporate",
        years: "2024 to present",
        place: "Jubail and Eastern Region, KSA",
        title: "Siemens Energy",
        stats: [
          { v: "7", l: "Day coverage" },
          { v: "0", l: "Major incidents" },
        ],
      },
    ],
    standardsEyebrow: "Standards",
    standardsH2: "Standards, HSE and Operational Compliance",
    standardsIntro: [
      "Heavy industry and energy infrastructure demand absolute compliance with workplace health, safety and environmental standards. AB embeds protective measures into every transport schedule, from site security clearances to driver health assessments. Our operations reduce transit risk while maintaining strict duty of care across active project zones.",
    ],
    standardsItems: [
      {
        title: "Licensed chauffeurs",
        text: "Licensed chauffeurs with complete safety induction credentials and defensive driving certificates.",
      },
      {
        title: "GPS tracking",
        text: "GPS tracking on all vehicles monitored live by our 24/7 operations centre in Riyadh.",
      },
      {
        title: "Standby vehicles",
        text: "Standby vehicles pre positioned to protect scheduled shift changes without delay.",
      },
      {
        title: "Site HSE & gate access compliance",
        text: "Full adherence to client HSE gear requirements, IVMS monitoring and industrial gate access permits.",
      },
    ],
    faqsEyebrow: "Questions",
    faqsH2: "Frequently Asked Questions About Giga Project Transportation",
    faqs: [
      {
        q: "How does AB coordinate workforce transportation Saudi Arabia shift changes on remote sites?",
        a: "AB designs scheduled timetables that match contractor shift patterns directly. Our central operations team coordinates line runs between residential compounds and work plots, utilizing GPS tracking to prevent congestion at plant gates. Standby vehicles remain positioned along key corridors to cover any mechanical failure immediately.",
      },
      {
        q: "What safety credentials do drivers possess for project site transportation?",
        a: "Every chauffeur completes thorough background checks, commercial licensing and mandatory site safety inductions before operating on active energy developments. Drivers follow strict speed parameters and continuous fatigue management guidelines. This disciplined approach supports comprehensive client duty of care on remote industrial highways.",
      },
      {
        q: "Can AB support specialized oil and gas crew transport in the Eastern Province?",
        a: "AB provides dedicated oil and gas crew transport across Dammam, Jubail and surrounding refinery areas. Fleets meet rigorous petrochemical site access rules, including onboard safety equipment and specialized vehicle passes. Our dispatch team manages time critical transfers between commercial air terminals and production facilities.",
      },
      {
        q: "What capabilities exist for NEOM transportation and northwest regional ventures?",
        a: "AB delivers robust NEOM transportation solutions connecting Tabuk regional airport, residential base camps and active work sectors. Our fleet of modern sport utility vehicles, executive passenger vans and luxury coaches supports both daily workforce logistics and visiting corporate leadership. Operations run under continuous tracking from our regional control room.",
      },
      {
        q: "How are emergency breakdowns handled in isolated desert areas?",
        a: "Our 24/7 operations centre monitors all vehicle telemetry in real time across Saudi Arabia, the UAE and Qatar. In the event of a mechanical fault, dispatch sends pre positioned standby vehicles to secure passenger safety and keep travel schedules intact. Drivers maintain direct communication links with local operations supervisors at all times.",
      },
      {
        q: "What billing and reporting options are available for major project contractors?",
        a: "Corporate accounts receive centralized invoicing broken down by cost centre, project division or work order number. Detailed monthly reports summarize trip completions, vehicle utilisation, punctuality metrics and route efficiency. Your designated account manager provides clear commercial oversight to simplify enterprise procurement audits.",
      },
      {
        q: "How does AB manage executive delegations and investor tours on active building grounds?",
        a: "Executive site tours receive dedicated premium sport utility vehicles and professional chauffeurs trained in executive protocol. AB coordinates advance security clearances and gate passes to facilitate smooth transit through active construction perimeters. Visiting dignitaries experience punctual, comfortable transfers between regional air terminals and operational plots.",
      },
    ],
    others: [
      { name: "Aviation & FBO", href: "/industries/aviation" },
      { name: "Corporate & Enterprise", href: "/industries/corporate-enterprise" },
      { name: "Government & Diplomatic", href: "/industries/government-diplomatic" },
      { name: "Hospitality", href: "/industries/hospitality" },
      { name: "Events & Exhibitions", href: "/industries/events-exhibitions" },
      { name: "Sports & Entertainment", href: "/industries/sports-entertainment" },
    ],
    ctaH2: "Secure Managed Giga Project Transportation Today",
    ctaP: "Partner with AB to coordinate dependable giga project transportation across your regional energy assets and capital programmes in Saudi Arabia, the UAE and Qatar.",
    ctaSubH3: "Deploy Dedicated Project Fleets",
    ctaSubP:
      "Contact our transport planning team in Riyadh to structure a scalable passenger logistics model for your project site.",
    ctaPrimaryLabel: "Request a proposal",
    ctaPrimaryHref: "/contact",
    ctaSecondaryLabel: "Book a transfer",
    ctaSecondaryHref: "/contact",
  },

  "events-exhibitions": {
    slug: "events-exhibitions",
    title: "Exhibition Transportation Services | Events & Exhibitions | AB.Limo",
    badge: "Events & Exhibitions",
    h1: "Exhibition Transportation Services",
    heroSubtitle:
      "Event transportation that runs on schedule, from the first arrival to the last shuttle",
    heroP:
      "AB delivers managed exhibition transportation services for complex trade shows, international conferences, government gatherings and commercial summits across the Middle East. Event organisers, major exhibition venues, production agencies and conference hosts rely on our dedicated operations teams to coordinate mass arrivals, executive movements and daily venue connections with complete precision.",
    heroParagraphs: [
      "AB delivers managed exhibition transportation services for complex trade shows, international conferences, government gatherings and commercial summits across the Middle East. Event organisers, major exhibition venues, production agencies and conference hosts rely on our dedicated operations teams to coordinate mass arrivals, executive movements and daily venue connections with complete precision.",
      "Coordinating major convention movements requires central oversight, strict flight monitoring and disciplined local dispatch across every host city. From single guest airport transfers to multi vehicle transport operations, our teams manage every journey through unified scheduling, continuous communication and rigorous safety standards.",
    ],
    heroImage: "/industries/events.jpg",
    heroImagePos: "50% 62%",
    featureImage: "/industries/www.ab.limo-industries-events-exhibitions-images/image1.jpg",
    featureImageAlt:
      "Fleet of executive black vehicles staged outside an exhibition convention centre",
    heroPrimaryCta: { label: "Request a proposal", href: "/contact" },
    heroSecondaryCta: { label: "Talk to a planner", href: "/contact" },
    strip: [
      {
        v: "50+",
        l: "Programme Experience",
        desc: "International events and sector programmes delivered",
      },
      {
        v: "725",
        l: "Active Markets & Peak Fleet",
        desc: "Vehicles at a single event peak across key GCC host cities",
      },
      {
        v: "24/7",
        l: "Fleet Coordination",
        desc: "24/7 central dispatch and dedicated event control room",
      },
    ],
    statementEyebrow: "How we work",
    statement:
      "Every event programme gets its own transport plan: loops, VIP car pools, standby vehicles and coordinators at every pickup point, agreed with your team in writing before the first guest lands.",
    needsEyebrow: "The challenge",
    needsH2: "The Challenge of Exhibition Transportation Services",
    needsIntro: [
      "Organising high volume ground transportation for international exhibitions requires handling intense delegate surges, variable city traffic and strict VIP security protocols without friction. When hundreds of attendees arrive simultaneously across terminal halls and hotel clusters, fragmented supplier networks often break down, creating severe congestion at main venue gates.",
      "AB resolves these operational pressures through structured planning, active staging zones and live traffic mitigation, giving event planners complete visibility over every passenger movement.",
    ],
    needs: [
      {
        num: "01",
        t: "Hundreds of delegates moving at once",
        x: "Peak arrivals during morning keynote sessions cause bottlenecking at venue entry points. AB structures timed departure blocks and active staging buffers that keep attendee flows steady, organised and aligned with venue gate capacity.",
      },
      {
        num: "02",
        t: "Shuttle loops between hotels and venues",
        x: "Connecting multiple hotel partner properties with the main exhibition grounds requires strict timetable adherence. Continuous loop management balances coach capacity, coordinates hotel transport desks and prevents long delegate waiting queues during morning and evening rush hours.",
      },
      {
        num: "03",
        t: "VIP arrivals on a timed schedule",
        x: "Ministers, keynote speakers and board members demand prompt airport curbside greetings and direct route clearance. AB coordinates dedicated chauffeur service teams, VIP car pool units and direct airport terminal airside tarmac access where permitted.",
      },
      {
        num: "04",
        t: "Live changes on show days",
        x: "Exhibition agendas frequently shift due to delayed panel discussions, extended networking sessions or abrupt venue room changes. Our 24/7 operations centre and on site coordinator teams adjust vehicle staging in real time to accommodate evolving schedules.",
      },
    ],
    stepsEyebrow: "How we run it",
    stepsH2: "How AB Delivers Exhibition Transportation Services",
    stepsIntro: [
      "Our operational framework transforms complex passenger manifests into an orderly, accountable ground transport network. We work directly with event production committees, municipal traffic authorities and venue operations teams from initial site planning through to post event reporting.",
      "Through centralised control and proactive oversight, we manage every vehicle movement with clear lines of communication, consistent driver standards and transparent commercial reporting.",
    ],
    steps: [
      {
        num: "01",
        t: "Brief",
        x: "We review attendee numbers, flight arrival patterns, hotel room allocations, protocol requirements and exhibition floor schedules. This initial analysis establishes the vehicle volume, required vehicle categories and dedicated staffing levels needed for seamless delivery.",
      },
      {
        num: "02",
        t: "Plan",
        x: "Our logistics planners create detailed routing maps, access permit requests, driver shift rosters, load zone diagrams and contingency paths. We liaise with venue management to secure priority kerbside space and establish designated passenger collection bays.",
      },
      {
        num: "03",
        t: "Operate",
        x: "During live show dates, an on site coordinator manages venue kerbside activity while the Riyadh operations centre monitors all fleet movements via GPS tracking. Chauffeurs receive live flight updates and passenger paging alerts directly on their mobile consoles.",
      },
      {
        num: "04",
        t: "Report",
        x: "Following show closure, AB produces consolidated reporting and clear digital invoicing detailing vehicle utilisation, passenger counts and route timing milestones. Transparent accounting simplifies cost allocation across diverse cost centres, sponsors and government partners.",
      },
    ],
    servicesEyebrow: "Services",
    servicesH2: "Core Ground Transportation Services We Deploy",
    servicesIntro: [
      "AB delivers complete ground transport solutions designed specifically for large scale conferences, commercial exhibitions and high profile governmental summits. Our managed services integrate seamlessly to support attendees, executive speakers and production crews throughout the event cycle.",
    ],
    services: [
      {
        name: "Event Transportation",
        href: "/services/event-transportation",
        desc: "Provides managed group logistics, dedicated dispatch teams and coordinated car pools for multi day trade shows.",
      },
      {
        name: "Bus & Coach Hire",
        href: "/services/bus-coach-hire",
        desc: "Supplies high capacity delegate coaches, mid size shuttles and point to point venue transfers.",
      },
      {
        name: "Chauffeur & VIP",
        href: "/services/chauffeur-vip",
        desc: "Offers executive sedans, protocol drivers and private chauffeured transfers for keynote speakers and dignitaries.",
      },
      {
        name: "Event Brief",
        href: "/contact",
        desc: "Connects your planning committee with our transport logistics team to design customized mobility programmes.",
      },
    ],
    serviceHighlights: [
      {
        prefix: "For cross border programmes, AB organises coordinated ",
        linkLabel: "corporate event transportation",
        href: "/services/event-transportation/uae",
        suffix:
          " across Dubai and Abu Dhabi, as well as dedicated services within Saudi Arabia and Qatar.",
      },
    ],
    fleetEyebrow: "Fleet",
    fleetH2: "Managed Vehicle Fleet for Events and Exhibitions",
    fleetIntro: [
      "Selecting the right vehicle mix maintains delegate comfort, optimizes transport budgets and eliminates roadside bottlenecks during peak exhibition hours. AB maintains a modern, uniform fleet operated by professional, uniformed drivers trained in corporate protocol and defensive driving standards.",
      "Explore our complete fleet options to match passenger volumes and executive requirements across all event categories.",
    ],
    fleetCards: [
      {
        title: "Executive Van",
        image: "/industries/www.ab.limo-industries-events-exhibitions-images/image2.jpg",
        imageAlt: "Modern executive passenger van parked outside a conference centre",
        description:
          "Mercedes Benz V Class or similar provides spacious leather seating and ample luggage space, making it ideal for event operations staff, speaker panels and delegation groups.",
        ctaLabel: "View Executive Van",
        href: "/fleet",
      },
      {
        title: "Premium MPV",
        image: "/industries/www.ab.limo-industries-events-exhibitions-images/image3.jpg",
        imageAlt: "Premium luxury MPV vehicle ready for passenger boarding",
        description:
          "Toyota Granvia or similar offers exceptional comfort, wide legroom and effortless boarding for production coordinators, technical crews and small corporate delegate groups traveling between hotels.",
        ctaLabel: "View Premium MPV",
        href: "/fleet",
      },
      {
        title: "First Class Sedan",
        image: "/industries/www.ab.limo-industries-events-exhibitions-images/image4.jpg",
        imageAlt: "First class executive sedan waiting at an exhibition entrance",
        description:
          "Mercedes Benz S Class, BMW 7 Series or similar delivers peerless luxury, acoustic privacy and refined comfort for ministers, ambassadors and keynote summit presenters.",
        ctaLabel: "View First Class Sedan",
        href: "/fleet",
      },
      {
        title: "Executive SUV",
        image: "/industries/www.ab.limo-industries-events-exhibitions-images/image5.jpg",
        imageAlt: "Full size luxury executive SUV on private transport duty",
        description:
          "Cadillac Escalade, GMC Yukon Denali or similar combines commanding road presence with extensive cabin capacity for diplomatic escorts, executive security teams and senior corporate leadership.",
        ctaLabel: "View Executive SUV",
        href: "/fleet",
      },
    ],
    vehicles: ["Executive Van", "Premium MPV", "First Class Sedan", "Executive SUV", "Coach"],
    coverageEyebrow: "Coverage",
    coverageH2: "Regional Coverage Across Saudi Arabia, the UAE and Qatar",
    coverageParagraphs: [
      "AB provides direct exhibition transportation coverage across Riyadh, including primary venues such as Riyadh Front, as well as Jeddah and the cultural heritage destination of AlUla. In the United Arab Emirates, our local operations coordinate continuous shuttle links at Dubai World Trade Centre in Dubai and ADNEC in Abu Dhabi. In Qatar, we manage complex delegate transportation at the Qatar National Convention Centre (QNCC) and Doha Exhibition and Convention Center (DECC). AB serves Saudi Arabia, all seven UAE emirates and Qatar directly. Bahrain, Kuwait and Oman are available only on request through vetted partners.",
      "Organisers planning regional tours can secure dedicated event transportation Saudi Arabia teams, coordinated corporate event transportation Dubai transfers, professional event transportation services Abu Dhabi shuttles and managed event transportation Doha operations through a single account manager.",
    ],
    coverageLinks: [
      {
        name: "Event Transportation Saudi Arabia",
        href: "/services/event-transportation/saudi-arabia",
      },
      {
        name: "Corporate Event Transportation Dubai",
        href: "/services/event-transportation/uae/dubai",
      },
      {
        name: "Event Transportation Services Abu Dhabi",
        href: "/services/event-transportation/uae/abu-dhabi",
      },
      {
        name: "Event Transportation Doha",
        href: "/services/event-transportation/qatar/doha",
      },
    ],
    proofEyebrow: "Proof",
    proofH2: "Documented Delivery for Commercial Exhibitions and Summits",
    proofIntro: "Published only with client approval.",
    cases: [
      {
        sector: "Events and festivals",
        years: "2021 to 2025",
        place: "Riyadh, Saudi Arabia",
        title: "MDL Beast Soundstorm Festival",
        stats: [
          { v: "725", l: "Vehicles at peak" },
          { v: "145K+", l: "Attendees" },
          { v: "250+", l: "Artists moved" },
        ],
      },
      {
        sector: "Events and exhibitions",
        years: "2024 and 2025",
        place: "Abu Dhabi, UAE",
        title: "ADIPEC VIP Shuttle Services",
        stats: [
          { v: "VIP", l: "Guest shuttles" },
          { v: "2", l: "Consecutive editions" },
        ],
      },
    ],
    standardsEyebrow: "Standards",
    standardsH2: "Operational Standards and Compliance",
    standardsIntro: [
      "Exhibition mobility demands strict safety management, reliable vehicles and adherence to regional transport authorities. Every chauffeur undergoes thorough background verification, defensive driving assessments and detailed training on exhibition protocol, venue access control and flight tracking technology. Our managed transportation processes fulfill your duty of care obligations while maintaining consistent service quality on the ground.",
    ],
    standardsItems: [
      {
        title: "Licensed chauffeurs",
        text: "Licensed chauffeurs holding complete municipal permits and professional commercial credentials.",
      },
      {
        title: "GPS tracking",
        text: "GPS tracking active on every vehicle with live integration into our central dispatch platform.",
      },
      {
        title: "Standby vehicles",
        text: "Standby vehicles staged near primary venue hubs to address unexpected timetable surges.",
      },
      {
        title: "Venue access & accreditation",
        text: "Full compliance with exhibition loading zone permits, municipal traffic marshaling and VIP accreditation protocols.",
      },
    ],
    standardsNote:
      "Direct coordination with our 24/7 operations centre in Riyadh supports rapid response across all host destinations.",
    standardsPhone: "+966 58 111 8720",
    faqsEyebrow: "Questions",
    faqsH2: "Frequently Asked Questions About Exhibition Transportation Services",
    faqs: [
      {
        q: "How does AB manage conference transportation for thousands of arriving attendees?",
        a: "AB coordinates conference transportation by analysing flight manifests and clustering passenger arrivals into organised airport pick up schedules. We establish dedicated airport greeting desks, supply high capacity coach transfers to partner hotels and deploy an on site coordinator at each terminal. This systematic approach reduces roadside congestion and maintains steady delegate arrivals at opening sessions.",
      },
      {
        q: "What vehicle types support high volume delegate transportation between hotels and venues?",
        a: "Our delegate transportation fleets utilise a combination of executive 50 seat coaches, 30 seat mini buses and spacious executive vans such as the Mercedes Benz V Class. This tiered vehicle mix allows event organisers to run scheduled shuttle loops during peak morning hours while providing responsive on demand transfers during off peak show periods.",
      },
      {
        q: "How is an exhibition shuttle service scheduled during multi day trade shows?",
        a: "An exhibition shuttle service is planned by mapping travel times, peak traffic patterns and delegate distribution across contracted hotel zones. AB designs timed circular routes with designated departure intervals, stationing kerbside marshals at key venues to manage boarding queues and liaising with municipal traffic authorities to use dedicated transit lanes where permitted.",
      },
      {
        q: "Can AB provide dedicated summit transportation for visiting VIPs and state delegations?",
        a: "AB offers specialised summit transportation featuring First Class sedans such as the Mercedes Benz S Class and luxury SUVs including the Cadillac Escalade. We coordinate secure airport tarmac transfers, assign seasoned chauffeurs trained in diplomatic protocol and allocate dedicated standby units for high level ministers, guest speakers and chief executives.",
      },
      {
        q: "How do on site dispatchers handle live agenda modifications during exhibition days?",
        a: "Our on site transport desk maintains constant radio and digital contact with the AB 24/7 operations centre. If a keynote session runs late or an evening reception changes location, dispatch managers immediately reassign standby vehicles, adjust driver duty cycles and re route shuttle loops to accommodate the revised timetable without service interruption.",
      },
      {
        q: "What duty of care and safety tracking standards apply to all event vehicles?",
        a: "Every vehicle in our fleet operates under strict duty of care protocols, including real time telemetry, continuous GPS monitoring and comprehensive passenger liability insurance. Chauffeurs observe strict maximum driving hour limits, while our operations desk oversees live route progress to assist international corporate travel managers with passenger tracking.",
      },
      {
        q: "Can event agencies book corporate event chauffeur hire across multiple GCC cities?",
        a: "Event agencies can arrange corporate event chauffeur hire, VIP event transportation UAE services and regional transport fleets through a single master agreement with AB. Organisers receive a dedicated corporate events chauffeur team in each host market, supported by consolidated regional invoicing and centralized coordination from our Riyadh headquarters.",
      },
    ],
    others: [
      { name: "Aviation & FBO", href: "/industries/aviation" },
      { name: "Corporate & Enterprise", href: "/industries/corporate-enterprise" },
      { name: "Government & Diplomatic", href: "/industries/government-diplomatic" },
      { name: "Hospitality", href: "/industries/hospitality" },
      { name: "Energy & Giga Projects", href: "/industries/energy-giga-projects" },
      { name: "Sports & Entertainment", href: "/industries/sports-entertainment" },
    ],
    ctaH2: "Plan Your Exhibition Transportation Services With AB",
    ctaP: "AB delivers reliable exhibition transportation services across Saudi Arabia, the UAE and Qatar, coordinating every delegate journey with precision, safety and professional care.",
    ctaSubH3: "Coordinate Your Event Ground Logistics",
    ctaSubP:
      "Connect with our dedicated event planning specialists to review passenger manifests, map shuttle routes and receive a tailored transportation proposal.",
    ctaPrimaryLabel: "Request a proposal",
    ctaPrimaryHref: "/contact",
    ctaSecondaryLabel: "Book a transfer",
    ctaSecondaryHref: "/contact",
  },

  "government-diplomatic": {
    slug: "government-diplomatic",
    title: "Diplomatic Transportation | Government & Protocol | AB.Limo",
    badge: "Government & Diplomatic",
    h1: "Diplomatic Transportation",
    heroSubtitle: "Discreet ground transport for delegations, ministries and official visits",
    heroP:
      "AB provides discreet diplomatic transportation designed specifically for visiting heads of state, accredited embassies, government ministries and official delegations across the Gulf region. Every assignment coordinates directly with diplomatic missions and national protocol departments to maintain secure motorcades, vetted routes and quiet operational precision throughout every transfer.",
    heroParagraphs: [
      "AB provides discreet diplomatic transportation designed specifically for visiting heads of state, accredited embassies, government ministries and official delegations across the Gulf region. Every assignment coordinates directly with diplomatic missions and national protocol departments to maintain secure motorcades, vetted routes and quiet operational precision throughout every transfer.",
    ],
    heroImage: "/industries/government.jpg",
    heroImagePos: "62% 35%",
    featureImage: "/industries/www.ab.limo-industries-government-diplomatic-images/image1.jpg",
    featureImageAlt: "Diplomatic motorcade sedan in Riyadh",
    heroPrimaryCta: { label: "Request a proposal", href: "/services/chauffeur-vip" },
    heroSecondaryCta: { label: "Talk to a planner", href: "/services/chauffeur-vip" },
    strip: [
      {
        v: "NDA",
        l: "Sector Experience",
        desc: "Signed by every chauffeur supporting international missions",
      },
      {
        v: "2025",
        l: "Delegation Movements",
        desc: "Best Supplier Award, presidential delegation & regional summits",
      },
      {
        v: "GPS",
        l: "Cities Served",
        desc: "Active local fleet across Gulf capital cities and diplomatic hubs",
      },
    ],
    statementEyebrow: "How we work",
    statement:
      "Protocol movements are planned with your team down to the minute: arrival sequences, vehicle order, standby cars and secure communication with security details.",
    needsEyebrow: "The challenge",
    needsH2: "Demands of Diplomatic and Official Transit",
    needsIntro: [
      "Coordinating government transportation services requires absolute operational precision under stringent public scrutiny. Protocol teams face unpredictable schedules, intricate motorcade logistics, diplomatic security mandates and multi agency communications where errors carry severe consequences for bilateral engagements.",
    ],
    needs: [
      {
        num: "01",
        t: "Strict protocol and security requirements",
        x: "Official visits demand strict protocol alignment, diplomatic etiquette, close coordination with protective security details, advance vehicle security sweeps and complete confidentiality across every route and staging point.",
      },
      {
        num: "02",
        t: "Convoys with timed arrivals",
        x: "Bilateral state visits require multi vehicle motorcades running to split second schedules, precise vehicle spacing, immediate police escort synchronisation and vetted primary and secondary transit pathways.",
      },
      {
        num: "03",
        t: "Confidential itineraries",
        x: "Sensitive ministerial talks and embassy assignments require strict data handling, non disclosure compliance, operational discretion and compartmentalised journey details restricted only to mission essential personnel.",
      },
      {
        num: "04",
        t: "Last minute schedule changes",
        x: "Dynamic bilateral discussions and fluid ministerial agendas frequently produce sudden itinerary adjustments, altered aircraft landing times, added bilateral venues and unexpected extension requests that demand instant vehicle redeployment.",
      },
    ],
    stepsEyebrow: "How we run it",
    stepsH2: "A Managed Operating Model for Protocol Movement",
    stepsIntro: [
      "AB coordinates every government deployment through structured managed transportation frameworks overseen by our 24/7 operations centre in Riyadh. A dedicated account manager supervises every stage from initial security clearance to final post mission reporting, keeping duty of care and communication seamless.",
    ],
    steps: [
      {
        num: "01",
        t: "Brief",
        x: "The dedicated account manager gathers detailed movement orders, security clearances, passenger manifests, luggage volumes and specific embassy directives to align fleet allocation with formal state protocol requirements.",
      },
      {
        num: "02",
        t: "Plan",
        x: "Operations specialists conduct thorough route reconnaissance, map primary and alternate corridors, verify embassy staging bays and synchronise motorcade timetables alongside local security authorities and diplomatic liaison teams.",
      },
      {
        num: "03",
        t: "Operate",
        x: "Live dispatch teams monitor movements through GPS tracking systems, maintaining direct communications with chauffeurs, protective officers and airport tarmac staging crews to adapt instantly to dynamic motorcade movements.",
      },
      {
        num: "04",
        t: "Report",
        x: "Following completion of the mission, AB provides consolidated journey logs, vehicle manifest verifications, precise incident free documentation and transparent consolidated invoicing aligned to institutional procurement standards.",
      },
    ],
    servicesEyebrow: "Services",
    servicesH2: "Integrated Services Supporting Official Delegations",
    servicesIntro: [
      "AB deploys specialised mobility packages configured for multilateral summits, ministerial forums and resident mission requirements across the Gulf Cooperation Council.",
    ],
    services: [
      {
        name: "Chauffeur & VIP",
        href: "/services/chauffeur-vip",
        desc: "Dedicated executive vehicles providing discreet travel for visiting ambassadors, state dignitaries and ministerial delegations.",
      },
      {
        name: "Event Transportation",
        href: "/services/event-transportation",
        desc: "High capacity synchronized vehicle fleets supporting bilateral conferences, regional summits and international state banquets.",
      },
      {
        name: "Airport Transfers",
        href: "/services/airport-transfers",
        desc: "Tarmac and private terminal vehicle staging delivering expedited transfers for official state missions.",
      },
    ],
    serviceHighlights: [
      {
        prefix: "For municipal assignments in the Saudi capital, AB coordinates ",
        linkLabel: "VIP transport Riyadh",
        href: "/services/chauffeur-vip/saudi-arabia/riyadh",
        suffix:
          " for ministerial transfers between government ministries and diplomatic headquarters.",
      },
      {
        prefix: "Missions stationed across the Emirates access comprehensive ",
        linkLabel: "VIP transport Abu Dhabi",
        href: "/services/chauffeur-vip/uae/abu-dhabi",
        suffix:
          " to support embassy personnel during regional consultations and palace engagements.",
      },
      {
        prefix: "Delegations attending multilateral summits in the Qatari capital utilise dedicated ",
        linkLabel: "VIP transport Qatar",
        href: "/services/chauffeur-vip/qatar",
        suffix:
          " for seamless cross city transit between official venues and bilateral suites.",
      },
    ],
    fleetEyebrow: "Fleet",
    fleetH2: "Fleet Configured for Government & Diplomatic Movements",
    fleetIntro: [
      "Our fleet comprises pristine executive vehicles meeting stringent diplomatic presentation and passenger comfort criteria, available through our fleet solutions.",
    ],
    fleetCards: [
      {
        title: "First Class Sedan",
        image: "/industries/www.ab.limo-industries-government-diplomatic-images/image2.jpg",
        imageAlt: "First Class luxury sedan exterior",
        description:
          "Mercedes Benz S Class or similar providing discreet prestige, silent passenger compartments and rear seat executive amenities suitable for principal diplomats and ministers.",
        ctaLabel: "View First Class Sedan",
        href: "/fleet",
      },
      {
        title: "Executive SUV",
        image: "/industries/www.ab.limo-industries-government-diplomatic-images/image3.jpg",
        imageAlt: "Executive SUV for protocol security",
        description:
          "Cadillac Escalade or similar offering generous passenger protection, elevated security posture and substantial cabin capacity for accompanying security teams.",
        ctaLabel: "View Executive SUV",
        href: "/fleet",
      },
      {
        title: "Premium MPV",
        image: "/industries/www.ab.limo-industries-government-diplomatic-images/image4.jpg",
        imageAlt: "Premium MPV for delegation transport",
        description:
          "Mercedes Benz V Class or similar delivering flexible seating layouts and ample luggage storage for ministerial staff, advisers and delegation working groups.",
        ctaLabel: "View Premium MPV",
        href: "/fleet",
      },
    ],
    vehicles: ["First Class Sedan", "Executive SUV", "Premium MPV"],
    coverageEyebrow: "Coverage",
    coverageH2: "Comprehensive Regional Coverage Across the Gulf",
    coverageParagraphs: [
      "AB maintains direct regional operating capacity across Saudi Arabia, all seven emirates of the UAE and Qatar. Our chauffeurs regularly operate throughout Riyadh, providing seamless connectivity into the high security Diplomatic Quarter, ministerial compounds and royal terminals. Coverage extends across primary diplomatic hubs including Abu Dhabi, Dubai and Doha, delivering synchronized cross border standards for multi leg diplomatic itineraries.",
    ],
    coverageLinks: [
      {
        name: "VIP Transport Riyadh",
        href: "/services/chauffeur-vip/saudi-arabia/riyadh",
      },
      {
        name: "VIP Transport Abu Dhabi",
        href: "/services/chauffeur-vip/uae/abu-dhabi",
      },
      {
        name: "VIP Transport Qatar",
        href: "/services/chauffeur-vip/qatar",
      },
    ],
    proofEyebrow: "Proof",
    proofH2: "Operational Track Record",
    proofIntro: "Published only with client approval.",
    cases: [
      {
        sector: "Recognition",
        years: "2025",
        place: "Middle East",
        title: "Best Supplier Award in the Middle East, presidential delegation",
        stats: [
          { v: "2025", l: "Award year" },
          { v: "100%", l: "Protocol compliance" },
        ],
      },
      {
        sector: "Diplomatic & Ministerial",
        years: "Ongoing",
        place: "Riyadh, Abu Dhabi & Doha",
        title: "Bilateral Summits & Official Mission Motorcades",
        stats: [
          { v: "NDA", l: "Vetted protocol chauffeurs" },
          { v: "24/7", l: "Control room telemetry" },
        ],
      },
    ],
    standardsEyebrow: "Standards",
    standardsH2: "Rigorous Protocol Standards and Duty of Care",
    standardsIntro: [
      "Official state visits, ministerial talks and embassy missions allow zero tolerance for logistical oversights. AB enforces uncompromising compliance procedures governing chauffeur vetting, vehicle readiness, route telemetry and institutional confidentiality. Our central Riyadh dispatch hub actively monitors duty of care metrics, keeping every vehicle aligned with diplomatic protocols throughout Saudi Arabia, the UAE and Qatar.",
    ],
    standardsItems: [
      {
        title: "Licensed chauffeurs",
        text: "Fully vetted professional chauffeurs trained in diplomatic etiquette, motorcade positioning and absolute client confidentiality.",
      },
      {
        title: "GPS tracking",
        text: "Real time vehicle telemetry and movement monitoring coordinated directly through our central Riyadh operations centre.",
      },
      {
        title: "Standby vehicles",
        text: "Dedicated contingency vehicles positioned along principal routes to provide immediate redundancy during official visits.",
      },
      {
        title: "Protocol & security clearances",
        text: "Compliance with diplomatic protocol certification, embassy security clearance and transport authority licensing standards.",
      },
    ],
    faqsEyebrow: "Questions",
    faqsH2: "Frequently Asked Questions About Diplomatic Transportation",
    faqs: [
      {
        q: "What distinguishes diplomatic transportation from standard executive chauffeur services?",
        a: "Diplomatic transportation demands specialized operational preparation, heightened security awareness, strict adherence to diplomatic protocol and close coordination with national security agencies. Chauffeurs undergo extensive screening and protocol etiquette training, while vehicles are maintained to ceremonial standards. Operations teams manage multi vehicle convoys, dedicated radio communication and advance route reconnaissance to protect visiting dignitaries and ambassadors during official state missions.",
      },
      {
        q: "How does AB coordinate government transportation services during international summits?",
        a: "AB assigns a dedicated account manager who collaborates directly with ministry logistics teams, embassy staff and host nation protocol departments. Our 24/7 operations centre in Riyadh establishes staging zones, confirms security clearances, maps primary corridors and deploys real time GPS tracking. Chauffeurs manage timed arrivals at summit venues, keeping principal officials and support staff aligned with demanding conference programmes.",
      },
      {
        q: "Can AB deliver high capacity delegation transport for bilateral state visits?",
        a: "Yes. AB coordinates complete delegation transport frameworks moving heads of state, ministerial cabinets, trade delegations and security personnel simultaneously. Our mixed fleet of First Class sedans, Executive SUVs and Premium MPVs provides unified motorcade coherence. Every vehicle moves under active dispatch supervision, maintaining exact spacing, dedicated radio contact and synchronized arrivals across airport terminals, embassies and official palaces.",
      },
      {
        q: "How do your teams manage protocol transportation across different Gulf capital cities?",
        a: "AB operates established local offices across Riyadh, Dubai, Abu Dhabi and Doha, maintaining uniform operational procedures for cross border protocol transportation. We serve Saudi Arabia, all seven UAE emirates and Qatar directly, allowing diplomatic missions to run multi country itineraries under a single account. Operations adhere strictly to local sovereign protocol guidelines while maintaining consistent communication and centralized billing through our headquarters.",
      },
      {
        q: "What qualifications do chauffeurs possess for an embassy chauffeur service assignment?",
        a: "Chauffeurs assigned to our embassy chauffeur service hold required professional passenger transport licences, clean security backgrounds and intensive training in defensive driving techniques. They understand international diplomatic courtesies, flag protocol, embassy perimeter procedures and the non disclosure obligations surrounding confidential conversations. Chauffeurs remain discreet, well presented and responsive to sudden schedule changes throughout their diplomatic postings.",
      },
      {
        q: "How does AB protect passenger confidentiality and sensitive itinerary data?",
        a: "Passenger confidentiality is maintained through strict data access protocols, encrypted booking channels and formal non disclosure agreements signed by all dispatch staff and chauffeurs. Travel itineraries, passenger names and meeting locations are compartmentalised within our 24/7 operations centre. Chauffeurs never discuss passenger identities or travel itineraries, protecting visiting dignitaries from public disclosure or security vulnerabilities.",
      },
      {
        q: "How are last minute schedule changes and flight delays handled during official visits?",
        a: "Our 24/7 operations centre actively monitors private aviation tail numbers, commercial flight arrivals and official convoy movements in real time. When bilateral negotiations run late or flight schedules shift, dispatchers instantly adjust chauffeur staging times and update motorcade routes. Dedicated standby vehicles remain on active standby along key corridors to provide immediate vehicle redundancy without disrupting the official programme.",
      },
    ],
    others: [
      { name: "Aviation & FBO", href: "/industries/aviation" },
      { name: "Corporate & Enterprise", href: "/industries/corporate-enterprise" },
      { name: "Hospitality", href: "/industries/hospitality" },
      { name: "Events & Exhibitions", href: "/industries/events-exhibitions" },
      { name: "Energy & Giga Projects", href: "/industries/energy-giga-projects" },
      { name: "Sports & Entertainment", href: "/industries/sports-entertainment" },
    ],
    ctaH2: "Secure Diplomatic Transportation for Official Missions",
    ctaP: "AB coordinates discreet diplomatic transportation tailored to visiting state dignitaries, accredited embassies and official delegations across the Gulf region with operational precision.",
    ctaSubH3: "Plan Your Official Delegation Logistics",
    ctaSubP:
      "Contact our protocol operations desk to coordinate comprehensive motorcade management and secure vehicle movements across Saudi Arabia, the UAE and Qatar.",
    ctaPrimaryLabel: "Request a proposal",
    ctaPrimaryHref: "/services/chauffeur-vip",
    ctaSecondaryLabel: "Book a transfer",
    ctaSecondaryHref: "/services/chauffeur-vip",
  },

  hospitality: {
    slug: "hospitality",
    title: "Premium Hotel Transportation Services | Hospitality & DMCs | AB.Limo",
    badge: "Hospitality & DMCs",
    h1: "Premium Hotel Transportation Services",
    heroSubtitle: "A chauffeur partner for hotels, DMCs and destination specialists",
    heroP:
      "Professional hotel transportation services provide luxury properties with immaculate guest mobility from arrival to departure. AB partners with leading hotels, five star resorts, destination management companies and dedicated concierge teams across the Middle East. Every private journey reflects the exacting hospitality benchmarks of your property.",
    heroParagraphs: [
      "Professional hotel transportation services provide luxury properties with immaculate guest mobility from arrival to departure. AB partners with leading hotels, five star resorts, destination management companies and dedicated concierge teams across the Middle East. Every private journey reflects the exacting hospitality benchmarks of your property.",
    ],
    heroImage: "/industries/hospitality.jpg",
    heroImagePos: "45% 40%",
    featureImage: "/industries/www.ab.limo-industries-hospitality-images/image1.jpg",
    featureImageAlt: "Luxury hotel entrance with an executive sedan arriving for guest pickup",
    heroPrimaryCta: { label: "Request a proposal", href: "/contact" },
    heroSecondaryCta: { label: "Talk to a planner", href: "/contact" },
    strip: [
      {
        v: "8",
        l: "Gulf airports served",
        desc: "Supporting luxury hospitality brands across the Middle East",
      },
      {
        v: "3",
        l: "Countries with our own fleet",
        desc: "Key hospitality cities served across Saudi Arabia, UAE & Qatar",
      },
      {
        v: "24/7",
        l: "Reservations and dispatch",
        desc: "Seamless hospitality guest journeys from arrival to departure",
      },
    ],
    statementEyebrow: "How we work",
    statement:
      "Hotels and DMCs book through one account for airport transfers, tours, Umrah journeys and group programmes, with chauffeurs who represent your brand as well as ours.",
    needsEyebrow: "The challenge",
    needsH2: "Operational Pressures in Luxury Guest Mobility",
    needsIntro: [
      "Coordinating premium hotel transfers demands unyielding consistency across variable schedules, regional flight alterations, and bespoke guest expectations. Hospitality providers require ground transit partners capable of protecting brand reputation across every itinerary without operational friction or administrative delays.",
    ],
    needs: [
      {
        num: "01",
        t: "Guest arrivals at all hours",
        x: "Commercial flights and private aviation land throughout the night and early morning. Chauffeurs must be staged early, with live flight tracking managing unexpected delays seamlessly.",
      },
      {
        num: "02",
        t: "Brand standards in every vehicle",
        x: "Vehicles serving five star hotels must maintain pristine cleanliness, silent cabins, and correct climate control. Inconsistent vehicle quality damages the guest experience before check in occurs.",
      },
      {
        num: "03",
        t: "Peaks during events and holidays",
        x: "Citywide summits, seasonal festivals, and holiday periods create sudden surges in demand. Hotel fleets require elastic capacity without compromising chauffeur vetting or punctuality standards.",
      },
      {
        num: "04",
        t: "Billing to rooms, guests or the hotel",
        x: "Hospitality finance teams face complex billing across direct guest charges, concierge accounts, and corporate master folios. Consolidated reporting and itemised invoicing remove reconciliation disputes.",
      },
    ],
    stepsEyebrow: "How we run it",
    stepsH2: "A Structured Operating Model for Hotel Ground Transport",
    stepsIntro: [
      "AB operates as a managed transportation provider with dedicated account teams and centralised coordination. Our central operations centre in Riyadh oversees continuous dispatch, automated tracking, and rigorous duty of care protocols across every regional property booking.",
    ],
    steps: [
      {
        num: "01",
        t: "Brief",
        x: "Your dedicated account manager captures specific property preferences, concierge workflows, room billing codes, and protocol requirements. Every guest profile and arrival instruction integrates directly into our reservation system.",
      },
      {
        num: "02",
        t: "Plan",
        x: "Our scheduling team assigns vetted chauffeurs, validates terminal access, and arranges vehicle staging windows. Dynamic route monitoring evaluates regional traffic patterns to maintain uninterrupted punctuality for every itinerary.",
      },
      {
        num: "03",
        t: "Operate",
        x: "The 24/7 operations centre monitors active movements using GPS tracking and live flight telemetry. Chauffeurs execute discreet arrivals with customised guest name boards and white label vehicle presentation.",
      },
      {
        num: "04",
        t: "Report",
        x: "Post journey reporting consolidates trip timings, mileage, and approved guest signatures. Monthly itemised invoicing streamlines hotel billing, linking charges directly to appropriate guest folios or corporate cost centres.",
      },
    ],
    servicesEyebrow: "Services",
    servicesH2: "Integrated Mobility Solutions for Hospitality Partners",
    servicesIntro: [
      "Hospitality partners draw upon our broad operational portfolio to fulfil diverse guest transport requirements. We provide flexible booking pathways tailored for single guest transfers, visiting delegations, and bespoke regional sightseeing.",
    ],
    services: [
      {
        name: "Airport Transfers",
        href: "/services/airport-transfers",
        desc: "Deliver punctual terminal meet and greet arrivals alongside luggage assistance for inbound property guests. Properties in the Emirates frequently schedule our luxury airport transfer solutions for international arrivals.",
        subLinkLabel: "Luxury airport transfer UAE",
        subLinkHref: "/services/airport-transfers/uae",
      },
      {
        name: "Chauffeur & VIP",
        href: "/services/chauffeur-vip",
        desc: "Provides dedicated daily driver allocations for executive guests requiring continuous on call city travel. Guests seeking elite city transit rely on our dedicated airport chauffeur service throughout their stay.",
      },
      {
        name: "Tourism Transportation",
        href: "/services/tourism-transportation",
        desc: "Connects hotel guests to heritage landmarks, desert excursions, and curated shopping venues across the Gulf. Concierge desks arrange complete travel itineraries using our luxury chauffeur service UAE across Dubai and Abu Dhabi.",
        subLinkLabel: "Luxury chauffeur service UAE",
        subLinkHref: "/locations/uae",
      },
      {
        name: "Partners",
        href: "/partners",
        desc: "Allows regional hospitality brands and international travel planners to access preferred fleet capacity and preferential agreements.",
      },
    ],
    fleetEyebrow: "Fleet",
    fleetH2: "Curated Luxury Fleet for Hotel Operations",
    fleetIntro: [
      "Our modern fleet satisfies strict hospitality criteria for comfort, luggage capacity, and onboard quietness. Review full specifications on our fleet page to match vehicles with specific guest profiles.",
    ],
    fleetCards: [
      {
        title: "Business Sedan",
        image: "/industries/www.ab.limo-industries-hospitality-images/image2.jpg",
        imageAlt: "Black business sedan parked in front of a modern luxury hotel",
        description:
          "Ideal for corporate travellers and solo guests requiring efficient transit between airport terminals and hotel lobbies. Mercedes Benz E Class or similar.",
        ctaLabel: "View Business Sedan",
        href: "/fleet",
      },
      {
        title: "First Class Sedan",
        image: "/industries/www.ab.limo-industries-hospitality-images/image3.jpg",
        imageAlt: "First class luxury sedan with chauffeur opening the passenger door",
        description:
          "Designed for VIP dignitaries, suite occupants, and executive leadership desiring exceptional cabin refinement and silence. Mercedes Benz S Class or similar.",
        ctaLabel: "View First Class Sedan",
        href: "/fleet",
      },
      {
        title: "Executive SUV",
        image: "/industries/www.ab.limo-industries-hospitality-images/image4.jpg",
        imageAlt: "Premium executive SUV staged outside a desert resort",
        description:
          "Combines generous luggage space with commanding comfort for travelling families and small executive groups. Cadillac Escalade or similar.",
        ctaLabel: "View Executive SUV",
        href: "/fleet",
      },
      {
        title: "Premium MPV",
        image: "/industries/www.ab.limo-industries-hospitality-images/image5.jpg",
        imageAlt: "Luxury passenger van parked near hotel conference entrance",
        description:
          "Accommodates delegations, event groups, and family parties requiring coordinated transit with substantial luggage allowances. Mercedes Benz V Class or similar.",
        ctaLabel: "View Premium MPV",
        href: "/fleet",
      },
    ],
    vehicles: ["Business Sedan", "First Class Sedan", "Executive SUV", "Premium MPV"],
    coverageEyebrow: "Coverage",
    coverageH2: "Strategic Regional Coverage Across the GCC",
    coverageParagraphs: [
      "AB maintains direct operational presence across key commercial and tourism centres in Saudi Arabia, the United Arab Emirates, and Qatar. Our regional footprint supports continuous guest transit across Riyadh, Jeddah, AlUla, Dubai, Abu Dhabi, and Doha. Extended travel into Bahrain, Kuwait, and Oman is managed on request through our network of vetted regional partners.",
      "Cross border travel and multi destination itineraries are coordinated through our primary dispatch hub, maintaining consistent standards across regional boundaries.",
    ],
    coverageLinks: [
      { name: "Luxury Airport Transfer UAE", href: "/services/airport-transfers/uae" },
      { name: "Luxury Chauffeur Service UAE", href: "/locations/uae" },
      { name: "Saudi Arabia Locations", href: "/locations/saudi-arabia" },
      { name: "Qatar Locations", href: "/locations/qatar" },
    ],
    proofEyebrow: "Proof",
    proofH2: "Verified Hospitality Partnerships",
    proofIntro:
      "AB delivers managed transportation programmes for prominent regional hospitality brands and high profile international events. Published only with client approval.",
    cases: [
      {
        sector: "Events and festivals",
        years: "2022 and 2024",
        place: "AlUla, Saudi Arabia",
        title: "Azimuth Music Festival",
        stats: [
          { v: "100s", l: "Vehicles at peak" },
          { v: "Crew", l: "Shuttle services" },
        ],
      },
      {
        sector: "Hospitality & Tourism",
        years: "Ongoing",
        place: "Riyadh, Dubai & Doha",
        title: "Five-Star Hotel & DMC Guest Mobility Programmes",
        stats: [
          { v: "24/7", l: "Concierge dispatch" },
          { v: "100%", l: "White-label standards" },
        ],
      },
    ],
    standardsEyebrow: "Standards",
    standardsH2: "Hospitality Compliance and Duty of Care",
    standardsIntro: [
      "Protecting guest safety and property prestige is the foundation of our managed transportation services. Chauffeurs undergo extensive route assessment, defensive driving instruction, and five star hospitality etiquette training. Active operations integrate transparent concierge communication, white label vehicle preparation, personalised guest name boards, and rigorous safety protocols.",
    ],
    standardsItems: [
      {
        title: "Licensed chauffeurs",
        text: "Licensed chauffeurs with verified background clearances and regional hospitality accreditation.",
      },
      {
        title: "GPS tracking",
        text: "GPS tracking on all vehicles connected directly to our 24/7 operations centre.",
      },
      {
        title: "Standby vehicles",
        text: "Standby vehicles positioned strategically to mitigate unexpected delays or flight diversions.",
      },
      {
        title: "Hospitality & tourism compliance",
        text: "Full adherence to regional tourism authority permits, white-label presentation and hotel compliance audits.",
      },
    ],
    faqsEyebrow: "Questions",
    faqsH2: "Frequently Asked Questions About Hotel Transportation Services",
    faqs: [
      {
        q: "How does AB coordinate hotel guest transfers during unexpected flight delays?",
        a: "Our 24/7 operations centre monitors inbound commercial flights and private aviation schedules in real time. Chauffeur staging adjusts automatically to revised touchdown times, preventing missed pickups and eliminating unnecessary waiting charges for the hotel.",
      },
      {
        q: "Can destination management companies book dedicated DMC transportation for large conferences?",
        a: "Yes. Destination management companies coordinate multi vehicle programmes through a single account manager. We allocate premium sedans, executive SUVs, and luxury vans with centralised dispatch, on site marshals, and unified billing across high volume itineraries.",
      },
      {
        q: "What vehicle presentation standards apply to your hotel limousine service?",
        a: "Every vehicle deployed for our hotel limousine service undergoes thorough interior detailing, sanitisation, and mechanical inspection before dispatch. Vehicles arrive unbranded to support white label hotel representation, stocked with bottled water, device chargers, and daily publications upon request.",
      },
      {
        q: "How are guest airport transfers handled at arrival terminals?",
        a: "Chauffeurs stage inside the terminal arrival hall displaying a clean digital or physical guest name board tailored with hotel branding. The driver assists with all luggage and escorts passengers directly to the awaiting vehicle stationed in priority parking.",
      },
      {
        q: "How does AB structure invoicing and hotel billing for concierge desks?",
        a: "Concierge teams can assign journey charges to guest room folios, central company accounts, or corporate payment cards. We issue transparent electronic receipts immediately after journey completion, accompanied by consolidated monthly billing statements itemised by booking reference.",
      },
      {
        q: "Can hotels reserve standby vehicles for urgent VIP guest requests?",
        a: "Yes. Luxury resorts and business hotels frequently arrange dedicated standby vehicles stationed nearby to accommodate short notice departures, private dining runs, or emergency executive itineraries without dispatch delays.",
      },
      {
        q: "Which geographic regions are covered directly by AB?",
        a: "AB operates direct managed services across Saudi Arabia, all seven Emirates in the UAE, and Qatar. Properties in Riyadh, Jeddah, AlUla, Dubai, Abu Dhabi, and Doha receive direct fleet support, while transit in Bahrain, Kuwait, and Oman is arranged through vetted regional partners.",
      },
    ],
    others: [
      { name: "Aviation & FBO", href: "/industries/aviation" },
      { name: "Corporate & Enterprise", href: "/industries/corporate-enterprise" },
      { name: "Government & Diplomatic", href: "/industries/government-diplomatic" },
      { name: "Events & Exhibitions", href: "/industries/events-exhibitions" },
      { name: "Energy & Giga Projects", href: "/industries/energy-giga-projects" },
      { name: "Sports & Entertainment", href: "/industries/sports-entertainment" },
    ],
    ctaH2: "Upgrade Your Property with Premium Hotel Transportation Services",
    ctaP: "Enhance guest loyalty and streamline concierge operations with dependable, high standard hotel transportation services tailored to the requirements of your luxury property.",
    ctaSubH3: "Establish Your Hotel Transport Partnership",
    ctaSubP:
      "Connect with our hospitality mobility team to review dedicated vehicle allocations, property pricing, and operational integration.",
    ctaPrimaryLabel: "Request a proposal",
    ctaPrimaryHref: "/contact",
    ctaSecondaryLabel: "Book a transfer",
    ctaSecondaryHref: "/services/airport-transfers",
  },

  "sports-entertainment": {
    slug: "sports-entertainment",
    title: "Sports Team Transportation for Athletics and Live Entertainment | AB.Limo",
    badge: "Sports & Entertainment",
    h1: "Sports Team Transportation for Athletics and Live Entertainment",
    heroSubtitle: "Team, talent and fan transport built around match days and show times",
    heroP:
      "Reliable sports team transportation demands precise scheduling, dedicated vehicle allocations and rigorous coordination between venues and hotels. Athletic departments, touring squads and production crews require punctual movements that protect player focus and keep event itineraries running smoothly.",
    heroParagraphs: [
      "Reliable sports team transportation demands precise scheduling, dedicated vehicle allocations and rigorous coordination between venues and hotels. Athletic departments, touring squads and production crews require punctual movements that protect player focus and keep event itineraries running smoothly.",
      "AB coordinates ground travel for professional leagues, athletic clubs, concert promoters, stadium venues and talent management teams across the Middle East. Dedicated operational planners oversee every transfer, aligning high capacity motor coaches and executive support convoys with strict match fixtures and performance schedules.",
    ],
    heroImage: "/industries/sports.jpg",
    heroImagePos: "20% 70%",
    featureImage: "/industries/www.ab.limo-industries-sports-entertainment-images/image1.jpg",
    featureImageAlt: "Fleet of modern team coaches staged outside a lighted sports stadium",
    heroPrimaryCta: { label: "Request a proposal", href: "/services/event-transportation" },
    heroSecondaryCta: { label: "Talk to a planner", href: "/contact" },
    strip: [
      {
        v: "All",
        l: "Stadiums covered at FIFA World Cup Qatar 2022",
        desc: "Supporting professional sports tournaments and live entertainment tours across the Gulf",
      },
      {
        v: "250+",
        l: "Artists moved at MDL Beast",
        desc: "Complex team mobility programmes and high profile entertainment operations completed to date",
      },
      {
        v: "24/7",
        l: "Event control room",
        desc: "Major host cities supported directly across Saudi Arabia, the United Arab Emirates and Qatar",
      },
    ],
    statementEyebrow: "How we work",
    statement:
      "Sports federations, promoters and production teams get one partner for athletes, artists, crews and hospitality guests, with discreet chauffeurs and a control room watching every vehicle.",
    needsEyebrow: "The challenge",
    needsH2: "Managing Complex Pressures in Sports Team Transportation",
    needsIntro: [
      "Organising athletic and entertainment travel presents logistical obstacles that standard car services cannot accommodate. Tight match day timetables, dense urban traffic surrounding stadiums and sensitive talent security demand continuous oversight from an experienced ground transportation partner.",
      "Logistics directors must balance player comfort with strict security protocols while handling fluctuating equipment volumes and unexpected itinerary shifts. Without centralised dispatch and experienced chauffeurs, isolated delays can disrupt pre match warmups, broadcast cues and venue crowd management.",
    ],
    needs: [
      {
        num: "01",
        t: "Team movements on match days",
        x: "Coordinating team bus transfers requires synchronized departures, police or venue escort alignments and clear stadium docking access to prevent costly fixture delays.",
      },
      {
        num: "02",
        t: "Talent and artist security",
        x: "Headlining musicians, technical directors and VIP guests require discreet transfers, private airport tarmac pickups and secured hotel staging that safeguard personal privacy.",
      },
      {
        num: "03",
        t: "Fan and staff shuttles at scale",
        x: "Moving thousands of ticketholders, match officials and operational staff demands continuous circuit management that mitigates perimeter congestion around metropolitan arenas.",
      },
      {
        num: "04",
        t: "Tight load in and load out windows",
        x: "Stage crews, technical personnel and sports equipment managers must access backstage bays within rigid access windows set by venue operations and broadcast directors.",
      },
    ],
    stepsEyebrow: "How we run it",
    stepsH2: "A Disciplined Operating Model for High Stakes Events",
    stepsIntro: [
      "AB delivers managed transportation built around sector expertise, thorough contingency planning and central operational control. The Riyadh operations centre oversees movements across Saudi Arabia, the United Arab Emirates and Qatar, maintaining continuous radio and telematics connectivity with every chauffeur.",
      "Each client engagement receives a dedicated account manager who oversees flight tracking, itinerary adjustments, duty of care compliance and consolidated billing. This operational framework supports seamless coordination from the opening technical briefing through post event reporting.",
    ],
    steps: [
      {
        num: "01",
        t: "Brief",
        x: "AB audits tournament fixtures, passenger manifests, flight times and venue access permissions to define exact fleet volumes, luggage capacity needs and chauffeur duty schedules.",
      },
      {
        num: "02",
        t: "Plan",
        x: "Your assigned account manager maps dedicated transit routes, identifies primary and secondary ingress points, arranges airport ramp permits and stages standby vehicles for peak operational resilience.",
      },
      {
        num: "03",
        t: "Operate",
        x: "The 24/7 operations centre tracks vehicle movements via live GPS tracking, coordinating stadium gate access, chauffeur rotations and convoy marshaling alongside municipal traffic authorities.",
      },
      {
        num: "04",
        t: "Report",
        x: "Following tournament or tour completion, AB delivers consolidated invoicing, detailed trip duration audits and service level telemetry for transparent post event reconciliation.",
      },
    ],
    servicesEyebrow: "Services",
    servicesH2: "Specialised Transportation Services for Sports and Entertainment",
    servicesIntro: [
      "Major athletic competitions and live entertainment productions require multiple transport tiers working in close synchronization. Delegations need premium executive vehicles for directors, spacious multi passenger transport for rosters and high frequency circuits for spectators.",
      "Through our dedicated divisions, AB provides integrated ground transport solutions that adapt to changing tour schedules. For large group operations in the Emirates, clients book our luxury bus rental Dubai service, with options including a 50 seater bus rental dubai for venue staff transfers. Similarly, tournament directors coordinate national rosters through verified group transportation Qatar networks and specialised coach hire Qatar allocations.",
    ],
    services: [
      {
        name: "Event Transportation",
        href: "/services/event-transportation",
        desc: "Comprehensive fleet marshaling and route management for large scale entertainment event transportation and international athletic tournaments.",
      },
      {
        name: "Bus & Coach Hire",
        href: "/services/bus-coach-hire",
        desc: "Premium motor coaches engineered for comfortable athletic team travel with ample luggage bays for equipment storage.",
      },
      {
        name: "Chauffeur & VIP",
        href: "/services/chauffeur-vip",
        desc: "Discreet executive saloon and SUV transfers providing talent security and direct movements for team executives.",
      },
    ],
    serviceHighlights: [
      {
        prefix: "For large group operations in the Emirates, clients book our ",
        linkLabel: "luxury bus rental Dubai",
        href: "/services/bus-coach-hire/uae/dubai",
        suffix:
          " service, with options including a 50 seater bus rental Dubai for venue staff transfers.",
      },
      {
        prefix: "Tournament directors coordinate national rosters through verified ",
        linkLabel: "group transportation Qatar",
        href: "/locations/qatar",
        suffix: " networks and specialised coach allocations.",
      },
      {
        prefix: "Dedicated ",
        linkLabel: "coach hire Qatar",
        href: "/services/bus-coach-hire/qatar",
        suffix:
          " allocations support international federations, touring squads and stadium shuttle circuits.",
      },
    ],
    fleetEyebrow: "Fleet",
    fleetH2: "Vehicle Classes Tailored to Match Days and Tour Runs",
    fleetIntro: [
      "AB maintains an executive fleet configured for the specialised demands of professional athletic squads and touring artists. Vehicles offer spacious seating, advanced climate control systems and generous cargo compartments suitable for sports bags, stage trunks and medical kits.",
      "Every vehicle undergoes strict pre departure mechanical inspections and interior sanitisation before entering event service. Explore our complete range of passenger capacities and configurations by visiting our fleet specification guide.",
    ],
    fleetCards: [
      {
        title: "Executive Van",
        image: "/industries/www.ab.limo-industries-sports-entertainment-images/image2.jpg",
        imageAlt: "Executive passenger van parked at an arena private drop off point",
        description:
          "Mercedes Benz V Class or similar provides spacious leather seating and ample cargo space for coaching staff, scout teams and media technical kits.",
        ctaLabel: "View Executive Van",
        href: "/fleet",
      },
      {
        title: "Executive SUV",
        image: "/industries/www.ab.limo-industries-sports-entertainment-images/image3.jpg",
        imageAlt: "Executive SUV staged on an airport tarmac beside a private aircraft",
        description:
          "Cadillac Escalade or similar delivers commanding presence, all wheel drive capability and enhanced privacy for headline artists, team owners and sports directors.",
        ctaLabel: "View Executive SUV",
        href: "/fleet",
      },
      {
        title: "First Class Sedan",
        image: "/industries/www.ab.limo-industries-sports-entertainment-images/image4.jpg",
        imageAlt: "First class sedan waiting outside an exclusive hotel entrance",
        description:
          "Mercedes Benz S Class or similar offers refined comfort, acoustic insulation and sophisticated styling for match referees, dignitaries and VIP talent.",
        ctaLabel: "View First Class Sedan",
        href: "/fleet",
      },
    ],
    vehicles: ["Executive Van", "Executive SUV", "First Class Sedan", "Coach"],
    coverageEyebrow: "Coverage",
    coverageH2: "Regional Operating Footprint Across Key Host Cities",
    coverageParagraphs: [
      "AB provides direct ground transport management across Saudi Arabia, all seven Emirates of the UAE and Qatar, with cross border capabilities connecting regional hubs. Bahrain, Kuwait and Oman are served on request through vetted affiliate networks.",
      "In Saudi Arabia, operational teams support major fixtures across Riyadh, including Boulevard Riyadh City, Kingdom Arena and key Riyadh Season venues, alongside coastal stadium transfers in Jeddah. In the United Arab Emirates, AB coordinates extensive fleet operations between Dubai and Abu Dhabi, including racing and arena locations across Yas Island. In Qatar, central dispatch handles complex stadium shuttle service schedules serving Lusail Stadium, dynamic cultural hubs and surrounding metropolitan sports complexes.",
    ],
    coverageLinks: [
      { name: "Luxury Bus Rental Dubai", href: "/services/bus-coach-hire/uae/dubai" },
      { name: "Group Transportation Qatar", href: "/locations/qatar" },
      { name: "Coach Hire Qatar", href: "/services/bus-coach-hire/qatar" },
      { name: "Saudi Arabia Locations", href: "/locations/saudi-arabia" },
    ],
    proofEyebrow: "Proof",
    proofH2: "Documented Reliability in Sports and Live Entertainment",
    proofIntro:
      "Major event organisers, national federations and international promoters rely on AB for mission critical ground movements. Published only with client approval.",
    cases: [
      {
        sector: "Sports Logistics · Doha",
        years: "2022",
        place: "Doha, Qatar",
        title: "FIFA World Cup Qatar 2022",
        stats: [
          { v: "All", l: "Stadiums covered" },
          { v: "<3", l: "Months to deliver" },
        ],
      },
      {
        sector: "Live Entertainment · Riyadh",
        years: "2021 to 2025",
        place: "Riyadh, Saudi Arabia",
        title: "MDL Beast Soundstorm Festival",
        stats: [
          { v: "725", l: "Vehicles at peak" },
          { v: "145K+", l: "Attendees" },
          { v: "250+", l: "Artists moved" },
        ],
      },
    ],
    standardsEyebrow: "Standards",
    standardsH2: "Rigorous Safety, Compliance and Operational Control",
    standardsIntro: [
      "Transporting elite athletes and international performers requires an unwavering commitment to duty of care. AB enforces rigorous chauffeur vetting protocols, vehicle safety checks and data privacy measures across every regional operating office. Chauffeurs sign strict non disclosure agreements to safeguard client confidentiality on tour.",
      "Our centralized management structure maintains direct radio and cellular contact with drivers, while telemetry sensors monitor vehicle speed, location and route adherence. This unified framework enables rapid operational adaptations whenever arena traffic flow or stadium security details mandate route adjustments.",
    ],
    standardsItems: [
      {
        title: "Licensed chauffeurs",
        text: "Experienced drivers screened with extensive background audits, defensive driving certifications and local venue security credentials.",
      },
      {
        title: "GPS tracking",
        text: "Live satellite telemetry streaming real time vehicle coordinates directly to the 24/7 Riyadh operations centre.",
      },
      {
        title: "Standby vehicles",
        text: "Dedicated backup saloons, vans and coaches positioned at strategic staging areas near venues for prompt deployment.",
      },
      {
        title: "Security escorts & ramp clearances",
        text: "Specialised security escorts and airside tarmac ramp clearances arranged in full compliance with local civil aviation and stadium authority regulations.",
      },
    ],
    standardsPhone: "+966 58 111 8720",
    faqsEyebrow: "Questions",
    faqsH2: "Frequently Asked Questions About Sports Team Transportation",
    faqs: [
      {
        q: "How does AB coordinate sports team transportation on busy match days?",
        a: "AB assigns a dedicated account manager who synchronizes movements with stadium operations, local transport authorities and team security directors. Chauffeurs conduct route test runs in advance, while our central dispatch monitors live traffic patterns to navigate congestion and support timely team arrivals at venue docking bays.",
      },
      {
        q: "Can AB manage high volume fan shuttle service during major tournaments?",
        a: "Yes, AB coordinates dedicated fan shuttle service fleets running continuous loops between metro stations, park and ride hubs and stadium perimeters. Central dispatch monitors spectator queues and adjusts coach departures dynamically to maintain smooth passenger flow during peak pre match and post match periods.",
      },
      {
        q: "What vehicle options are recommended for concert transportation and touring artists?",
        a: "Headlining musicians and talent directors typically choose First Class Sedans and Executive SUVs for discreet transit, while production crews travel in spacious Executive Vans. AB coordinates entire artist convoys, integrating luggage runners and equipment trucks so that touring entourages move together without logistical bottlenecks.",
      },
      {
        q: "How does AB handle equipment storage and gear during athletic team travel?",
        a: "AB deploys luxury motor coaches equipped with generous underfloor luggage bays designed to carry bulky sports bags, medical kits and training gear. When delegations travel with oversized athletic equipment, dedicated support vans shadow the team bus to handle overflow cargo securely.",
      },
      {
        q: "What security measures protect talent and VIP athletes during transfers?",
        a: "All chauffeurs operate under binding non disclosure agreements and possess extensive training in discreet passenger handling. AB coordinates directly with private close protection teams, venue security marshals and airport tarmac handlers to arrange secure boarding in private bays away from public areas.",
      },
      {
        q: "How are unexpected itinerary adjustments managed during a multi city tour?",
        a: "The 24/7 Riyadh operations centre provides continuous dispatch support, allowing tour directors to adjust schedules or add staging stops at any hour. Dedicated operational teams coordinate directly with regional offices in Dubai, Abu Dhabi and Doha to implement route modifications without operational friction.",
      },
      {
        q: "What invoicing and reporting procedures are provided after an event series?",
        a: "Following event completion, AB compiles consolidated corporate invoicing itemised by vehicle class, transfer date and routing code. Account managers also deliver comprehensive service reports detailing trip milestones, arrival logs and operational metrics for thorough client reconciliation.",
      },
    ],
    others: [
      { name: "Aviation & FBO", href: "/industries/aviation" },
      { name: "Corporate & Enterprise", href: "/industries/corporate-enterprise" },
      { name: "Government & Diplomatic", href: "/industries/government-diplomatic" },
      { name: "Hospitality", href: "/industries/hospitality" },
      { name: "Events & Exhibitions", href: "/industries/events-exhibitions" },
      { name: "Energy & Giga Projects", href: "/industries/energy-giga-projects" },
    ],
    ctaH2: "Book Managed Sports Team Transportation Across the Gulf",
    ctaP: "Event directors count on AB for sports team transportation and artist convoys across premier stadiums and entertainment venues in the Gulf region.",
    ctaPrimaryLabel: "Request a proposal",
    ctaPrimaryHref: "/services/event-transportation",
    ctaSecondaryLabel: "Book a transfer",
    ctaSecondaryHref: "/fleet",
  },
};

export const INDUSTRY_DETAILS_AR: Record<string, IndustryDetailData> = {
  "events-exhibitions": {
    slug: "events-exhibitions",
    title: "خدمات النقل للمعارض | الفعاليات والمعارض | AB.Limo",
    badge: "الفعاليات والمعارض",
    h1: "خدمات النقل للمعارض",
    heroSubtitle: "نقل للفعاليات يلتزم بالمواعيد، من أول وصول حتى آخر رحلة مكوكية",
    heroP:
      "تقدّم AB خدمات نقل مُدارة للمعارض التجارية المعقّدة، والمؤتمرات الدولية، والملتقيات الحكومية، والقمم التجارية في أنحاء الشرق الأوسط. ويعتمد منظّمو الفعاليات، ومراكز المعارض الكبرى، ووكالات الإنتاج، والجهات المستضيفة للمؤتمرات على فرق العمليات المخصّصة لدينا لتنسيق وصول الحشود، وتنقلات التنفيذيين، والتنقلات اليومية من مواقع الفعاليات وإليها، بدقة تامة.",
    heroParagraphs: [
      "تقدّم AB خدمات نقل مُدارة للمعارض التجارية المعقّدة، والمؤتمرات الدولية، والملتقيات الحكومية، والقمم التجارية في أنحاء الشرق الأوسط. ويعتمد منظّمو الفعاليات، ومراكز المعارض الكبرى، ووكالات الإنتاج، والجهات المستضيفة للمؤتمرات على فرق العمليات المخصّصة لدينا لتنسيق وصول الحشود، وتنقلات التنفيذيين، والتنقلات اليومية من مواقع الفعاليات وإليها، بدقة تامة.",
      "ويتطلّب تنسيق التنقلات في المؤتمرات الكبرى إشرافًا مركزيًا، ومتابعة دقيقة للرحلات الجوية، وتوجيهًا محليًا منضبطًا في كل مدينة مستضيفة. ومن نقل ضيف واحد من المطار إلى عمليات النقل التي تضم أعدادًا كبيرة من المركبات، تدير فرقنا كل رحلة من خلال جدولة موحّدة، وتواصل مستمر، ومعايير سلامة صارمة.",
    ],
    heroImage: "/industries/events.jpg",
    heroImagePos: "50% 62%",
    featureImage: "/industries/www.ab.limo-industries-events-exhibitions-images/image1.jpg",
    featureImageAlt: "أسطول مركبات تنفيذية سوداء أمام مركز معارض ومؤتمرات",
    heroPrimaryCta: { label: "اطلب عرضًا", href: "/contact" },
    heroSecondaryCta: { label: "تحدّث إلى أحد مخطّطينا", href: "/contact" },
    strip: [
      {
        v: "أكثر من 50",
        l: "خبرة في البرامج",
        desc: "فعاليات دولية وبرامج قطاعية نُفِّذت بنجاح",
      },
      {
        v: "725",
        l: "الأسواق النشطة وذروة الأسطول",
        desc: "مركبة في ذروة فعالية واحدة في أبرز المدن الخليجية المستضيفة",
      },
      {
        v: "على مدار الساعة",
        l: "تنسيق الأسطول",
        desc: "توجيه مركزي على مدار الساعة وغرفة تحكم مخصّصة للفعالية",
      },
    ],
    statementEyebrow: "آلية عملنا",
    statement:
      "لكل برنامج فعالية خطة نقل خاصة به: رحلات مكوكية منتظمة، ومجموعات سيارات مخصّصة لكبار الشخصيات، ومركبات احتياطية، ومنسّقون في كل نقطة استقبال، ونعتمدها مع فريقك كتابيًا قبل هبوط أول ضيف.",
    needsEyebrow: "التحدي",
    needsH2: "تحديات خدمات النقل للمعارض",
    needsIntro: [
      "يتطلّب تنظيم النقل البري بأعداد كبيرة للمعارض الدولية التعاملَ بسلاسة مع موجات التدفّق الكثيفة للمندوبين، وتقلّبات حركة المرور في المدينة، والبروتوكولات الأمنية الصارمة لكبار الشخصيات. وعندما يصل مئات الحضور في وقت واحد إلى صالات المطار ومجمّعات الفنادق، كثيرًا ما تنهار شبكات الموردين المتفرّقة، فيحدث ازدحام شديد عند البوابات الرئيسية لموقع الفعالية.",
      "وتعالج AB هذه الضغوط التشغيلية بالتخطيط المنظّم، وتفعيل مناطق التجمّع، والحدّ من الازدحام المروري لحظةً بلحظة، مما يمنح مخطّطي الفعاليات رؤية كاملة لكل تنقلات الركاب.",
    ],
    needs: [
      {
        num: "01",
        t: "مئات المندوبين يتنقلون في وقت واحد",
        x: "تتسبّب ذروة الوصول خلال الجلسات الرئيسية الصباحية في اختناقات عند مداخل موقع الفعالية. وتنظّم AB دفعات مغادرة مجدولة زمنيًا ومناطق انتظار فعّالة تحافظ على تدفّق الحضور بانتظام وبما يتناسب مع الطاقة الاستيعابية لبوابات الموقع.",
      },
      {
        num: "02",
        t: "رحلات مكوكية منتظمة بين الفنادق ومواقع الفعاليات",
        x: "يتطلّب ربط فنادق شريكة متعددة بأرض المعرض الرئيسية التزامًا صارمًا بالجداول الزمنية. وتعمل الإدارة المستمرة للرحلات المكوكية على موازنة سعة الحافلات، وتنسيق مكاتب النقل في الفنادق، ومنع تشكّل طوابير انتظار طويلة للمندوبين خلال ساعات الذروة الصباحية والمسائية.",
      },
      {
        num: "03",
        t: "وصول كبار الشخصيات وفق جدول زمني دقيق",
        x: "يتوقّع الوزراء والمتحدثون الرئيسيون وأعضاء مجالس الإدارة استقبالًا فوريًا عند رصيف المطار ومسارات مباشرة خالية من العوائق. وتنسّق AB فرقًا مخصّصة لخدمات السائق الخاص، ووحدات من مجموعات السيارات المخصّصة لكبار الشخصيات، والوصول المباشر إلى المدرج داخل الجانب الجوي من المطار حيثما يُسمح بذلك.",
      },
      {
        num: "04",
        t: "التغييرات المباشرة في أيام المعرض",
        x: "كثيرًا ما تتغيّر جداول المعارض بسبب تأخّر حلقات النقاش، أو تمديد جلسات التواصل، أو التغيير المفاجئ للقاعات. ويعمل مركز العمليات لدينا على مدار الساعة، مع فرق المنسّقين الميدانيين، على تعديل تمركز المركبات في الوقت الفعلي بما يواكب تغيّر الجداول.",
      },
    ],
    stepsEyebrow: "كيف ندير العمليات",
    stepsH2: "كيف تقدّم AB خدمات النقل للمعارض",
    stepsIntro: [
      "يحوّل إطارنا التشغيلي قوائم الركاب المعقّدة إلى شبكة نقل بري منظّمة وخاضعة للمساءلة. ونعمل مباشرةً مع لجان إنتاج الفعاليات، وسلطات المرور البلدية، وفرق تشغيل مواقع الفعاليات، بدءًا من التخطيط الأولي للموقع وحتى تقارير ما بعد الفعالية.",
      "ومن خلال التحكم المركزي والإشراف الاستباقي، ندير كل حركة للمركبات عبر قنوات تواصل واضحة، ومعايير ثابتة للسائقين، وتقارير تجارية شفافة.",
    ],
    steps: [
      {
        num: "01",
        t: "المرحلة 01: تحديد المتطلبات",
        x: "نراجع أعداد الحضور، وأنماط وصول الرحلات الجوية، وتوزيع الغرف الفندقية، ومتطلبات المراسم، وجداول أرض المعرض. ويحدّد هذا التحليل الأولي عدد المركبات وفئاتها المطلوبة ومستويات التوظيف المخصّصة اللازمة لتنفيذ سلس.",
      },
      {
        num: "02",
        t: "المرحلة 02: التخطيط",
        x: "يُعدّ مخطّطو الخدمات اللوجستية لدينا خرائط مسارات مفصّلة، وطلبات تصاريح الدخول، وجداول مناوبات السائقين، ومخططات مناطق التحميل، ومسارات بديلة للطوارئ. وننسّق مع إدارة موقع الفعالية لتأمين مساحات ذات أولوية عند الرصيف، وتخصيص نقاط محددة لصعود الركاب.",
      },
      {
        num: "03",
        t: "المرحلة 03: التشغيل",
        x: "خلال أيام المعرض، يدير منسّق ميداني الحركة عند رصيف موقع الفعالية، بينما يراقب مركز العمليات في الرياض جميع تحركات الأسطول عبر التتبّع بنظام GPS. ويتلقّى السائقون الخاصون تحديثات مباشرة عن الرحلات الجوية وتنبيهات النداء على الركاب مباشرةً على أجهزتهم المحمولة.",
      },
      {
        num: "04",
        t: "المرحلة 04: التقارير",
        x: "بعد اختتام المعرض، تُصدر AB تقارير موحّدة وفواتير رقمية واضحة تفصّل معدلات استخدام المركبات، وأعداد الركاب، والمحطات الزمنية للمسارات. وتسهّل المحاسبة الشفافة توزيع التكاليف على مختلف مراكز التكلفة والرعاة والشركاء الحكوميين.",
      },
    ],
    servicesEyebrow: "الخدمات",
    servicesH2: "خدمات النقل البري الأساسية التي نقدّمها",
    servicesIntro: [
      "تقدّم AB حلول نقل بري متكاملة مصمّمة خصيصًا للمؤتمرات الكبرى، والمعارض التجارية، والقمم الحكومية رفيعة المستوى. وتتكامل خدماتنا المُدارة بسلاسة لدعم الحضور والمتحدثين التنفيذيين وطواقم الإنتاج طوال دورة الفعالية.",
    ],
    services: [
      {
        name: "نقل الفعاليات",
        href: "/services/event-transportation",
        desc: "توفّر خدمات لوجستية مُدارة للمجموعات، وفرق توجيه مخصّصة، ومجموعات سيارات منسّقة للمعارض التجارية الممتدة لعدة أيام.",
        subLinkLabel: "استكشف خدمات نقل الفعاليات",
        subLinkHref: "/services/event-transportation",
      },
      {
        name: "استئجار الحافلات",
        href: "/services/bus-coach-hire",
        desc: "توفّر حافلات عالية السعة لنقل المندوبين، وحافلات مكوكية متوسطة الحجم، وتنقلات مباشرة من نقطة إلى أخرى بين مواقع الفعاليات.",
        subLinkLabel: "استكشف خدمات استئجار الحافلات",
        subLinkHref: "/services/bus-coach-hire",
      },
      {
        name: "السائق الخاص وكبار الشخصيات",
        href: "/services/chauffeur-vip",
        desc: "توفّر سيارات سيدان تنفيذية، وسائقين متخصصين في المراسم، وتنقلات خاصة بسائق خاص للمتحدثين الرئيسيين والشخصيات البارزة.",
        subLinkLabel: "استكشف خدمات السائق الخاص وكبار الشخصيات",
        subLinkHref: "/services/chauffeur-vip",
      },
      {
        name: "متطلبات الفعالية",
        href: "/contact",
        desc: "تربط لجنة التخطيط لديك بفريق الخدمات اللوجستية للنقل لدينا لتصميم برامج تنقل مخصّصة.",
        subLinkLabel: "استكشف خدمة تحديد متطلبات الفعالية",
        subLinkHref: "/contact",
      },
    ],
    serviceHighlights: [
      {
        prefix: "وللبرامج العابرة للحدود، تنظّم AB ",
        linkLabel: "نقل فعاليات الشركات",
        href: "/services/event-transportation/uae",
        suffix:
          " في دبي وأبوظبي، إلى جانب خدمات مخصّصة داخل المملكة العربية السعودية وقطر.",
      },
    ],
    fleetEyebrow: "الأسطول",
    fleetH2: "أسطول مركبات مُدار للفعاليات والمعارض",
    fleetIntro: [
      "يضمن اختيار المزيج المناسب من المركبات راحة المندوبين، ويحسّن استخدام ميزانيات النقل، ويقضي على الاختناقات على جوانب الطرق خلال ساعات الذروة في المعارض. وتمتلك AB أسطولًا حديثًا موحّدًا يقوده سائقون محترفون بزي موحّد، مدرَّبون على المراسم المؤسسية ومعايير القيادة الوقائية.",
      "استكشف خيارات أسطولنا الكاملة لتلائم أعداد الركاب ومتطلبات التنفيذيين في جميع فئات الفعاليات.",
    ],
    fleetCards: [
      {
        title: "فان تنفيذية",
        image: "/industries/www.ab.limo-industries-events-exhibitions-images/image2.jpg",
        imageAlt: "فان ركاب تنفيذية حديثة خارج مركز مؤتمرات",
        description:
          "توفّر مرسيدس-بنز V-Class، أو ما يماثلها، مقاعد جلدية واسعة ومساحة كافية للأمتعة، مما يجعلها مثالية لموظفي عمليات الفعاليات، ومجموعات المتحدثين، والوفود.",
        ctaLabel: "عرض الفان التنفيذية",
        href: "/fleet",
      },
      {
        title: "مركبة متعددة الأغراض (MPV) متميّزة",
        image: "/industries/www.ab.limo-industries-events-exhibitions-images/image3.jpg",
        imageAlt: "مركبة MPV فاخرة ومتميّزة جاهزة لصعود الركاب",
        description:
          "توفّر تويوتا جرانفيا، أو ما يماثلها، راحة استثنائية، ومساحة واسعة للأرجل، وسهولة في الصعود، لمنسّقي الإنتاج والطواقم الفنية ومجموعات المندوبين الصغيرة من الشركات أثناء تنقلهم بين الفنادق.",
        ctaLabel: "عرض المركبة متعددة الأغراض المتميّزة",
        href: "/fleet",
      },
      {
        title: "سيدان الدرجة الأولى",
        image: "/industries/www.ab.limo-industries-events-exhibitions-images/image4.jpg",
        imageAlt: "سيدان تنفيذية من الدرجة الأولى تنتظر عند مدخل المعرض",
        description:
          "توفّر مرسيدس-بنز S-Class أو بي إم دبليو الفئة السابعة، أو ما يماثلهما، فخامة لا تُضاهى، وخصوصية صوتية، وراحة راقية للوزراء والسفراء والمتحدثين الرئيسيين في القمم.",
        ctaLabel: "عرض سيدان الدرجة الأولى",
        href: "/fleet",
      },
      {
        title: "مركبة دفع رباعي (SUV) تنفيذية",
        image: "/industries/www.ab.limo-industries-events-exhibitions-images/image5.jpg",
        imageAlt: "مركبة دفع رباعي تنفيذية فاخرة كاملة الحجم",
        description:
          "تجمع كاديلاك إسكاليد أو جي إم سي يوكن دينالي، أو ما يماثلهما، بين الحضور اللافت على الطريق والمقصورة الرحبة، لمرافقي الوفود الدبلوماسية، وفرق الأمن التنفيذي، وكبار قيادات الشركات.",
        ctaLabel: "عرض مركبة الدفع الرباعي التنفيذية",
        href: "/fleet",
      },
    ],
    vehicles: ["فان تنفيذية", "مركبة متعددة الأغراض (MPV)", "سيدان الدرجة الأولى", "مركبة دفع رباعي (SUV) تنفيذية", "حافلة سياحية"],
    coverageEyebrow: "التغطية",
    coverageH2: "التغطية الإقليمية في المملكة العربية السعودية والإمارات العربية المتحدة وقطر",
    coverageParagraphs: [
      "توفّر AB تغطية مباشرة لخدمات النقل للمعارض في الرياض، بما في ذلك المواقع الرئيسية مثل واجهة الرياض، وكذلك في جدة ووجهة التراث الثقافي العُلا. وفي الإمارات العربية المتحدة، تنسّق عملياتنا المحلية رحلات مكوكية متواصلة في مركز دبي التجاري العالمي بدبي، ومركز أدنيك (ADNEC) في أبوظبي. وفي قطر، ندير عمليات نقل المندوبين المعقّدة في مركز قطر الوطني للمؤتمرات (QNCC) ومركز الدوحة للمعارض والمؤتمرات (DECC). وتخدم AB مباشرةً المملكة العربية السعودية، وإمارات الدولة السبع، وقطر. أما البحرين والكويت وسلطنة عُمان، فتُخدم عند الطلب فقط من خلال شركاء معتمدين.",
      "ويمكن للمنظّمين الذين يخطّطون لجولات إقليمية الاستعانة بفرق نقل فعاليات مخصّصة في المملكة العربية السعودية، وتنقلات منسّقة لفعاليات الشركات في دبي، وحافلات مكوكية احترافية للفعاليات في أبوظبي، وعمليات نقل مُدارة للفعاليات في الدوحة، وذلك كله عبر مدير حساب واحد.",
    ],
    coverageLinks: [
      {
        name: "نقل الفعاليات في المملكة العربية السعودية",
        href: "/services/event-transportation/saudi-arabia",
      },
      {
        name: "نقل فعاليات الشركات في دبي",
        href: "/services/event-transportation/uae/dubai",
      },
      {
        name: "خدمات نقل الفعاليات في أبوظبي",
        href: "/services/event-transportation/uae/abu-dhabi",
      },
      {
        name: "نقل الفعاليات في الدوحة",
        href: "/services/event-transportation/qatar/doha",
      },
    ],
    proofEyebrow: "شواهد على أعمالنا",
    proofH2: "سجل موثّق لأعمالنا في المعارض التجارية والقمم",
    proofIntro: "لا يُنشر إلا بموافقة العميل.",
    cases: [
      {
        sector: "الفعاليات والمهرجانات",
        years: "من 2021 إلى 2025",
        place: "الرياض، المملكة العربية السعودية",
        title: "مهرجان MDLBEAST ساوندستورم",
        stats: [
          { v: "725", l: "عدد المركبات في ذروة التشغيل" },
          { v: "145 ألف+", l: "عدد الحضور" },
          { v: "250+", l: "عدد الفنانين المنقولين" },
        ],
      },
      {
        sector: "الفعاليات والمعارض",
        years: "2024 و2025",
        place: "أبوظبي، الإمارات العربية المتحدة",
        title: "خدمات النقل المكوكي لكبار الشخصيات في أديبك ADIPEC",
        stats: [
          { v: "VIP", l: "حافلات مكوكية للضيوف" },
          { v: "2", l: "نسختان متتاليتان" },
        ],
      },
    ],
    standardsEyebrow: "المعايير",
    standardsH2: "المعايير التشغيلية والامتثال",
    standardsIntro: [
      "يتطلّب التنقل في المعارض إدارة صارمة للسلامة، ومركبات موثوقة، والتزامًا بمتطلبات هيئات النقل الإقليمية. ويخضع كل سائق خاص لتحقق شامل من خلفيته، وتقييمات في القيادة الوقائية، وتدريب مفصّل على مراسم المعارض، وضوابط الدخول إلى مواقع الفعاليات، وتقنيات تتبّع الرحلات الجوية. وتفي إجراءات النقل المُدار لدينا بالتزامات واجب الرعاية تجاهك، مع الحفاظ على جودة خدمة ثابتة في الميدان.",
    ],
    standardsItems: [
      {
        title: "سائقون خاصون مرخَّصون",
        text: "سائقون خاصون مرخَّصون يحملون تصاريح بلدية كاملة ومؤهلات تجارية احترافية.",
      },
      {
        title: "التتبّع عبر GPS",
        text: "نظام تتبّع عبر GPS مفعّل في كل مركبة، ومتكامل مباشرةً مع منصة التوجيه المركزية لدينا.",
      },
      {
        title: "المركبات الاحتياطية",
        text: "مركبات احتياطية متمركزة بالقرب من المواقع الرئيسية للفعاليات للتعامل مع أي زيادة مفاجئة في الطلب ضمن الجدول الزمني.",
      },
      {
        title: "الدخول إلى مواقع الفعاليات والاعتماد",
        text: "امتثال تام لتصاريح مناطق التحميل في المعارض، وتنظيم الحركة المرورية البلدية، وبروتوكولات اعتماد كبار الشخصيات.",
      },
    ],
    standardsNote:
      "يتيح التنسيق المباشر مع مركز العمليات لدينا في الرياض، العامل على مدار الساعة، استجابة سريعة في جميع الوجهات المستضيفة.",
    standardsPhone: "+966 58 111 8720",
    faqsEyebrow: "الأسئلة الشائعة",
    faqsH2: "الأسئلة الشائعة حول خدمات النقل للمعارض",
    faqs: [
      {
        q: "كيف تدير AB النقل في المؤتمرات لآلاف الحضور القادمين؟",
        a: "تنسّق AB النقل في المؤتمرات من خلال تحليل قوائم ركاب الرحلات الجوية، وتجميع الركاب القادمين ضمن جداول منظّمة للاستقبال في المطار. ونخصّص مكاتب استقبال في المطار، ونوفّر حافلات عالية السعة للنقل إلى الفنادق الشريكة، وننشر منسّقًا ميدانيًا في كل مبنى ركاب. ويحدّ هذا النهج المنهجي من الازدحام على جوانب الطرق، ويحافظ على تدفّق منتظم للمندوبين الواصلين إلى الجلسات الافتتاحية.",
      },
      {
        q: "ما أنواع المركبات التي تدعم نقل أعداد كبيرة من المندوبين بين الفنادق ومواقع الفعاليات؟",
        a: "تعتمد أساطيلنا لنقل المندوبين على مزيج من الحافلات السياحية التنفيذية بسعة 50 مقعدًا، والحافلات الصغيرة بسعة 30 مقعدًا، والفانات التنفيذية الواسعة مثل مرسيدس-بنز V-Class. ويتيح هذا المزيج المتدرّج من المركبات لمنظّمي الفعاليات تشغيل رحلات مكوكية مجدولة خلال ساعات الذروة الصباحية، مع توفير تنقلات سريعة الاستجابة عند الطلب في الفترات الأقل ازدحامًا من المعرض.",
      },
      {
        q: "كيف تُجدول خدمة الحافلات المكوكية خلال المعارض التجارية الممتدة لعدة أيام؟",
        a: "تُخطَّط خدمة الحافلات المكوكية للمعارض بتحديد أوقات التنقل، وأنماط الذروة المرورية، وتوزيع المندوبين على مناطق الفنادق المتعاقد معها. وتصمّم AB مسارات دائرية مجدولة بفواصل زمنية محددة للمغادرة، وتنشر منظّمين عند الأرصفة في المواقع الرئيسية لإدارة طوابير الصعود، وتنسّق مع سلطات المرور البلدية لاستخدام المسارات المخصّصة للنقل حيثما يُسمح بذلك.",
      },
      {
        q: "هل تستطيع AB توفير نقل مخصّص في القمم لكبار الشخصيات الزائرين والوفود الرسمية؟",
        a: "تقدّم AB خدمات نقل متخصصة للقمم، تشمل سيارات سيدان الدرجة الأولى مثل مرسيدس-بنز S-Class، ومركبات دفع رباعي فاخرة مثل كاديلاك إسكاليد. وننسّق تنقلات آمنة على المدرج داخل الجانب الجوي من المطار، ونعيّن سائقين خاصين متمرّسين مدرَّبين على المراسم الدبلوماسية، ونخصّص وحدات احتياطية للوزراء رفيعي المستوى والمتحدثين الضيوف والرؤساء التنفيذيين.",
      },
      {
        q: "كيف يتعامل موجّهو الحركة الميدانيون مع تعديلات الجداول أثناء أيام المعرض؟",
        a: "يحافظ مكتب النقل الميداني لدينا على تواصل لاسلكي ورقمي مستمر مع مركز عمليات AB في الرياض العامل على مدار الساعة. وإذا تأخرت جلسة رئيسية أو تغيّر موقع حفل استقبال مسائي، يعيد مديرو التوجيه فورًا تخصيص المركبات الاحتياطية، ويعدّلون دورات عمل السائقين، ويعيدون توجيه مسارات الحافلات المكوكية لمواكبة الجدول الزمني المعدّل دون أي انقطاع في الخدمة.",
      },
      {
        q: "ما معايير واجب الرعاية وتتبّع السلامة المطبّقة على جميع مركبات الفعاليات؟",
        a: "تعمل كل مركبة في أسطولنا وفق بروتوكولات صارمة لواجب الرعاية، تشمل القياس عن بُعد في الوقت الفعلي، والمراقبة المستمرة عبر GPS، والتأمين الشامل ضد المسؤولية تجاه الركاب. ويلتزم السائقون الخاصون بدقة بالحدود القصوى لساعات القيادة، بينما يشرف مكتب العمليات لدينا على مسار الرحلات مباشرة لمساعدة مديري سفر الشركات الدولية في متابعة ركابهم.",
      },
      {
        q: "هل يمكن لوكالات تنظيم الفعاليات حجز سائق خاص لفعاليات الشركات عبر مدن خليجية متعددة؟",
        a: "يمكن لوكالات الفعاليات ترتيب خدمات استئجار السائق الخاص لفعاليات الشركات، ونقل كبار الشخصيات في الفعاليات بالإمارات، وأساطيل النقل الإقليمية من خلال اتفاقية رئيسية موحّدة مع AB. ويحصل المنظّمون على فريق مخصّص لسائقي فعاليات الشركات في كل سوق مستضيف، تدعمه فوترة إقليمية موحّدة وتنسيق مركزي من مقرّنا الرئيسي في الرياض.",
      },
    ],
    others: [
      { name: "الطيران وصالات الطيران الخاص (FBO)", href: "/industries/aviation" },
      { name: "الشركات والمؤسسات", href: "/industries/corporate-enterprise" },
      { name: "الجهات الحكومية والدبلوماسية", href: "/industries/government-diplomatic" },
      { name: "الضيافة", href: "/industries/hospitality" },
      { name: "الطاقة والمشاريع العملاقة", href: "/industries/energy-giga-projects" },
      { name: "الرياضة والترفيه", href: "/industries/sports-entertainment" },
    ],
    ctaH2: "خطّط لخدمات النقل لمعرضك القادم مع AB",
    ctaP: "تقدّم AB خدمات نقل موثوقة للمعارض في المملكة العربية السعودية والإمارات العربية المتحدة وقطر، مع تنسيق كل رحلة للمندوبين بدقة وأمان وعناية مهنية.",
    ctaSubH3: "نسّق الخدمات اللوجستية البرية لفعاليتك",
    ctaSubP:
      "تواصل مع أخصائيي تخطيط الفعاليات لدينا لمراجعة قوائم الركاب، ورسم مسارات الحافلات المكوكية، وتلقّي عرض نقل مخصّص لفعاليتك.",
    ctaPrimaryLabel: "اطلب عرضًا",
    ctaPrimaryHref: "/contact",
    ctaSecondaryLabel: "احجز رحلة نقل",
    ctaSecondaryHref: "/contact",
  },

  "government-diplomatic": {
    slug: "government-diplomatic",
    title: "النقل الدبلوماسي | المراسم الحكومية والدبلوماسية | AB.Limo",
    badge: "الجهات الحكومية والدبلوماسية",
    h1: "النقل الدبلوماسي",
    heroSubtitle: "نقل بري يتسم بالسرية للوفود والوزارات والزيارات الرسمية",
    heroP:
      "تقدّم AB خدمات نقل دبلوماسي تتسم بالسرية، مصمّمة خصيصًا لرؤساء الدول الزائرين، والسفارات المعتمدة، والوزارات الحكومية، والوفود الرسمية في أنحاء منطقة الخليج. ويُنسَّق كل تكليف مباشرةً مع البعثات الدبلوماسية وإدارات المراسم الوطنية، لضمان مواكب آمنة، ومسارات مدروسة ومعتمدة، ودقة تشغيلية هادئة طوال كل رحلة.",
    heroParagraphs: [
      "تقدّم AB خدمات نقل دبلوماسي تتسم بالسرية، مصمّمة خصيصًا لرؤساء الدول الزائرين، والسفارات المعتمدة، والوزارات الحكومية، والوفود الرسمية في أنحاء منطقة الخليج. ويُنسَّق كل تكليف مباشرةً مع البعثات الدبلوماسية وإدارات المراسم الوطنية، لضمان مواكب آمنة، ومسارات مدروسة ومعتمدة، ودقة تشغيلية هادئة طوال كل رحلة.",
    ],
    heroImage: "/industries/government.jpg",
    heroImagePos: "62% 35%",
    featureImage: "/industries/www.ab.limo-industries-government-diplomatic-images/image1.jpg",
    featureImageAlt: "سيارة سيدان ضمن موكب دبلوماسي في الرياض",
    heroPrimaryCta: { label: "اطلب عرضًا", href: "/services/chauffeur-vip" },
    heroSecondaryCta: { label: "تحدّث إلى أحد مخطّطينا", href: "/services/chauffeur-vip" },
    strip: [
      {
        v: "اتفاقية عدم الإفصاح (NDA)",
        l: "خبرة في القطاع",
        desc: "يوقّعها كل سائق خاص يعمل مع البعثات الدولية",
      },
      {
        v: "2025",
        l: "تنقلات الوفود",
        desc: "جائزة أفضل مورّد، وفد رئاسي وقمم إقليمية",
      },
      {
        v: "GPS",
        l: "المدن التي نخدمها",
        desc: "أسطول محلي عامل في العواصم الخليجية والمراكز الدبلوماسية",
      },
    ],
    statementEyebrow: "آلية عملنا",
    statement:
      "نخطّط تنقلات المراسم مع فريقك بدقة متناهية حتى الدقيقة: تسلسل الوصول، وترتيب المركبات، والسيارات الاحتياطية، والتواصل الآمن مع فرق الحماية.",
    needsEyebrow: "التحدي",
    needsH2: "متطلبات التنقل الدبلوماسي والرسمي",
    needsIntro: [
      "يتطلّب تنسيق خدمات النقل الحكومي دقة تشغيلية مطلقة في ظل رقابة عامة مكثّفة. وتواجه فرق المراسم جداول زمنية يصعب التنبؤ بها، ولوجستيات معقّدة للمواكب، ومتطلبات أمنية دبلوماسية، واتصالات بين جهات متعددة، حيث تترتّب على الأخطاء عواقب وخيمة على العلاقات الثنائية.",
    ],
    needs: [
      {
        num: "01",
        t: "متطلبات صارمة للمراسم والأمن",
        x: "تتطلّب الزيارات الرسمية التزامًا صارمًا بالمراسم، ومراعاة الإتيكيت الدبلوماسي، وتنسيقًا وثيقًا مع فرق الحماية الأمنية، وتفتيشًا أمنيًا مسبقًا للمركبات، وسرية تامة في كل مسار ونقطة تجمّع.",
      },
      {
        num: "02",
        t: "مواكب بمواعيد وصول محددة بدقة",
        x: "تتطلّب زيارات الدولة الثنائية مواكب متعددة المركبات تسير وفق جداول دقيقة حتى الثانية، مع مسافات محسوبة بين المركبات، وتزامن فوري مع مرافقة الشرطة، ومسارات رئيسية وبديلة مدروسة ومعتمدة.",
      },
      {
        num: "03",
        t: "برامج رحلات سرية",
        x: "تتطلّب المحادثات الوزارية الحساسة ومهام السفارات تعاملًا صارمًا مع البيانات، والتزامًا بمتطلبات عدم الإفصاح، وتكتّمًا تشغيليًا، وحصر تفاصيل الرحلات في الأفراد الذين تقتضي المهمة اطلاعهم عليها فقط.",
      },
      {
        num: "04",
        t: "تغييرات اللحظة الأخيرة في الجداول",
        x: "كثيرًا ما تؤدي المباحثات الثنائية المتغيّرة وجداول الأعمال الوزارية المرنة إلى تعديلات مفاجئة في برامج الرحلات، وتغيّر مواعيد هبوط الطائرات، وإضافة مواقع جديدة للقاءات الثنائية، وطلبات تمديد غير متوقعة تستلزم إعادة نشر المركبات فورًا.",
      },
    ],
    stepsEyebrow: "كيف ندير العمليات",
    stepsH2: "نموذج تشغيلي مُدار لتنقلات المراسم",
    stepsIntro: [
      "تنسّق AB كل عملية نقل حكومية من خلال أطر منظّمة للنقل المُدار، يشرف عليها مركز العمليات لدينا في الرياض على مدار الساعة. ويشرف مدير حساب مخصّص على كل مرحلة، من التصريح الأمني الأولي وحتى التقرير النهائي بعد انتهاء المهمة، بما يضمن سلاسة الوفاء بواجب الرعاية واستمرارية التواصل.",
    ],
    steps: [
      {
        num: "01",
        t: "المرحلة 01: تحديد المتطلبات",
        x: "يجمع مدير الحساب المخصّص أوامر التنقل المفصّلة، والتصاريح الأمنية، وقوائم الركاب، وأحجام الأمتعة، وتوجيهات السفارة المحددة، لمواءمة توزيع الأسطول مع متطلبات المراسم الرسمية للدولة.",
      },
      {
        num: "02",
        t: "المرحلة 02: التخطيط",
        x: "يُجري أخصائيو العمليات استطلاعًا شاملًا للمسارات، ويحدّدون الممرات الرئيسية والبديلة، ويتحقّقون من نقاط التجمّع في السفارات، وينسّقون الجداول الزمنية للمواكب مع السلطات الأمنية المحلية وفرق الاتصال الدبلوماسي.",
      },
      {
        num: "03",
        t: "المرحلة 03: التشغيل",
        x: "تراقب فرق التوجيه المباشر التنقلات عبر أنظمة التتبّع بنظام GPS، وتحافظ على تواصل مباشر مع السائقين الخاصين وضباط الحماية وطواقم التجهيز على مدرج المطار، للتكيّف فورًا مع تغيّر حركة المواكب.",
      },
      {
        num: "04",
        t: "المرحلة 04: التقارير",
        x: "بعد إتمام المهمة، تقدّم AB سجلات رحلات موحّدة، وقوائم مركبات موثّقة، وتوثيقًا دقيقًا يُثبت خلوّ المهمة من الحوادث، وفوترة موحّدة وشفافة تتوافق مع معايير المشتريات المؤسسية.",
      },
    ],
    servicesEyebrow: "الخدمات",
    servicesH2: "خدمات متكاملة لدعم الوفود الرسمية",
    servicesIntro: [
      "تقدّم AB باقات تنقل متخصصة مهيّأة للقمم متعددة الأطراف، والمنتديات الوزارية، ومتطلبات البعثات المقيمة في دول مجلس التعاون لدول الخليج العربية.",
    ],
    services: [
      {
        name: "السائق الخاص وكبار الشخصيات",
        href: "/services/chauffeur-vip",
        desc: "مركبات تنفيذية مخصّصة توفّر تنقلًا يتسم بالسرية للسفراء الزائرين وكبار شخصيات الدولة والوفود الوزارية.",
        subLinkLabel: "استكشف خدمات السائق الخاص وكبار الشخصيات",
        subLinkHref: "/services/chauffeur-vip",
      },
      {
        name: "نقل الفعاليات",
        href: "/services/event-transportation",
        desc: "أساطيل مركبات عالية السعة ومنسّقة لدعم المؤتمرات الثنائية، والقمم الإقليمية، ومآدب الدولة الدولية.",
        subLinkLabel: "استكشف خدمات نقل الفعاليات",
        subLinkHref: "/services/event-transportation",
      },
      {
        name: "التنقل من وإلى المطارات",
        href: "/services/airport-transfers",
        desc: "تجهيز المركبات على المدرج وفي صالات الطيران الخاصة لتوفير تنقلات سريعة للبعثات الرسمية للدولة.",
        subLinkLabel: "استكشف خدمات التنقل من وإلى المطارات",
        subLinkHref: "/services/airport-transfers",
      },
    ],
    serviceHighlights: [
      {
        prefix: "وللمهام داخل العاصمة السعودية، تنسّق AB ",
        linkLabel: "نقل كبار الشخصيات في الرياض",
        href: "/services/chauffeur-vip/saudi-arabia/riyadh",
        suffix:
          " للتنقلات الوزارية بين الوزارات الحكومية والمقار الدبلوماسية.",
      },
      {
        prefix: "وتستفيد البعثات المقيمة في الإمارات من خدمات شاملة لـ ",
        linkLabel: "نقل كبار الشخصيات في أبوظبي",
        href: "/services/chauffeur-vip/uae/abu-dhabi",
        suffix:
          " لدعم موظفي السفارات خلال المشاورات الإقليمية والارتباطات في القصور.",
      },
      {
        prefix: "وتستعين الوفود المشاركة في القمم متعددة الأطراف في العاصمة القطرية بخدمات مخصّصة لـ ",
        linkLabel: "نقل كبار الشخصيات في قطر",
        href: "/services/chauffeur-vip/qatar",
        suffix:
          " لتنقل سلس داخل المدينة بين المواقع الرسمية وأجنحة اللقاءات الثنائية.",
      },
    ],
    fleetEyebrow: "الأسطول",
    fleetH2: "أسطول مهيّأ لتنقلات الجهات الحكومية والدبلوماسية",
    fleetIntro: [
      "يتألف أسطولنا من مركبات تنفيذية بحالة لا تشوبها شائبة، تستوفي المعايير الدبلوماسية الصارمة للمظهر وراحة الركاب، وتتوفّر من خلال حلول الأسطول لدينا.",
    ],
    fleetCards: [
      {
        title: "سيدان الدرجة الأولى",
        image: "/industries/www.ab.limo-industries-government-diplomatic-images/image2.jpg",
        imageAlt: "المظهر الخارجي لسيارة سيدان فاخرة من الدرجة الأولى",
        description:
          "توفّر مرسيدس-بنز S-Class، أو ما يماثلها، فخامة هادئة، ومقصورة ركاب عازلة للصوت، ووسائل راحة تنفيذية في المقاعد الخلفية تليق بكبار الدبلوماسيين والوزراء.",
        ctaLabel: "عرض سيدان الدرجة الأولى",
        href: "/fleet",
      },
      {
        title: "مركبة دفع رباعي (SUV) تنفيذية",
        image: "/industries/www.ab.limo-industries-government-diplomatic-images/image3.jpg",
        imageAlt: "مركبة دفع رباعي تنفيذية للحراسة والمراسم",
        description:
          "توفّر كاديلاك إسكاليد، أو ما يماثلها، حماية عالية للركاب، ومستوى أمنيًا معزّزًا، ومقصورة واسعة تتّسع لفرق الأمن المرافقة.",
        ctaLabel: "عرض مركبة الدفع الرباعي التنفيذية",
        href: "/fleet",
      },
      {
        title: "مركبة متعددة الأغراض (MPV) متميّزة",
        image: "/industries/www.ab.limo-industries-government-diplomatic-images/image4.jpg",
        imageAlt: "مركبة متعددة الأغراض متميّزة لنقل الوفود",
        description:
          "توفّر مرسيدس-بنز V-Class، أو ما يماثلها، توزيعًا مرنًا للمقاعد ومساحة واسعة للأمتعة لموظفي الوزارات والمستشارين وفرق عمل الوفود.",
        ctaLabel: "عرض المركبة متعددة الأغراض المتميّزة",
        href: "/fleet",
      },
    ],
    vehicles: ["سيدان الدرجة الأولى", "مركبة دفع رباعي تنفيذية", "مركبة متعددة الأغراض متميّزة"],
    coverageEyebrow: "التغطية",
    coverageH2: "تغطية إقليمية شاملة في أنحاء منطقة الخليج",
    coverageParagraphs: [
      "تمتلك AB قدرة تشغيلية إقليمية مباشرة في المملكة العربية السعودية، وإمارات الدولة السبع في الإمارات العربية المتحدة، وقطر. ويعمل سائقونا الخاصون بانتظام في أنحاء الرياض، موفّرين وصولًا سلسًا إلى الحي الدبلوماسي عالي التأمين، والمجمّعات الوزارية، والصالات الملكية. وتمتد التغطية إلى المراكز الدبلوماسية الرئيسية، ومنها أبوظبي ودبي والدوحة، مع معايير موحّدة عبر الحدود لبرامج الرحلات الدبلوماسية متعددة المحطات.",
    ],
    coverageLinks: [
      {
        name: "نقل كبار الشخصيات في الرياض",
        href: "/services/chauffeur-vip/saudi-arabia/riyadh",
      },
      {
        name: "نقل كبار الشخصيات في أبوظبي",
        href: "/services/chauffeur-vip/uae/abu-dhabi",
      },
      {
        name: "نقل كبار الشخصيات في قطر",
        href: "/services/chauffeur-vip/qatar",
      },
    ],
    proofEyebrow: "شواهد على أعمالنا",
    proofH2: "سجل الإنجازات التشغيلية",
    proofIntro: "لا يُنشر إلا بموافقة العميل.",
    cases: [
      {
        sector: "التقدير",
        years: "2025",
        place: "الشرق الأوسط",
        title: "جائزة أفضل مورّد في الشرق الأوسط، وفد رئاسي",
        stats: [
          { v: "2025", l: "سنة الجائزة" },
          { v: "100%", l: "الالتزام بالمراسم" },
        ],
      },
      {
        sector: "دبلوماسي ووزاري",
        years: "مستمرة",
        place: "الرياض وأبوظبي والدوحة",
        title: "القمم الثنائية ومواكب البعثات الرسمية",
        stats: [
          { v: "NDA", l: "سائقون خاصون معتمدون متخصصون في المراسم" },
          { v: "24/7", l: "القياس عن بُعد من غرفة التحكم" },
        ],
      },
    ],
    standardsEyebrow: "المعايير",
    standardsH2: "معايير صارمة للمراسم وواجب الرعاية",
    standardsIntro: [
      "لا تحتمل الزيارات الرسمية للدول، والمحادثات الوزارية، ومهام السفارات أي هفوة لوجستية. وتطبّق AB إجراءات امتثال صارمة لا تهاون فيها تحكم التحقق من السائقين الخاصين، وجاهزية المركبات، والقياس عن بُعد للمسارات، والسرية المؤسسية. ويراقب مركز التوجيه المركزي لدينا في الرياض مؤشرات واجب الرعاية باستمرار، لضمان التزام كل مركبة بالمراسم الدبلوماسية في أنحاء المملكة العربية السعودية والإمارات العربية المتحدة وقطر.",
    ],
    standardsItems: [
      {
        title: "سائقون خاصون مرخَّصون",
        text: "سائقون خاصون محترفون خضعوا لتحقق كامل، ومدرَّبون على الإتيكيت الدبلوماسي، والتمركز في المواكب، والحفاظ على السرية التامة للعملاء.",
      },
      {
        title: "التتبّع عبر GPS",
        text: "قياس عن بُعد لبيانات المركبات ومراقبة تحركاتها في الوقت الفعلي، بتنسيق مباشر من مركز العمليات المركزي لدينا في الرياض.",
      },
      {
        title: "المركبات الاحتياطية",
        text: "مركبات طوارئ مخصّصة متمركزة على طول المسارات الرئيسية لتوفير بديل فوري خلال الزيارات الرسمية.",
      },
      {
        title: "المراسم والتصاريح الأمنية",
        text: "الامتثال لشهادات المراسم الدبلوماسية، والتصاريح الأمنية للسفارات، ومعايير الترخيص الصادرة عن هيئات النقل.",
      },
    ],
    faqsEyebrow: "الأسئلة الشائعة",
    faqsH2: "الأسئلة الشائعة حول النقل الدبلوماسي",
    faqs: [
      {
        q: "ما الذي يميّز النقل الدبلوماسي عن خدمات السائق الخاص التنفيذية الاعتيادية؟",
        a: "يتطلّب النقل الدبلوماسي استعدادًا تشغيليًا متخصصًا، ووعيًا أمنيًا عاليًا، والتزامًا صارمًا بالمراسم الدبلوماسية، وتنسيقًا وثيقًا مع أجهزة الأمن الوطنية. ويخضع السائقون الخاصون لفحص شامل وتدريب على إتيكيت المراسم، بينما يُحافَظ على المركبات وفق المعايير المعتمدة في المناسبات الرسمية. وتدير فرق العمليات المواكب متعددة المركبات، والاتصالات اللاسلكية المخصّصة، والاستطلاع المسبق للمسارات، لحماية كبار الشخصيات والسفراء الزائرين خلال البعثات الرسمية للدولة.",
      },
      {
        q: "كيف تنسّق AB خدمات النقل الحكومي خلال القمم الدولية؟",
        a: "تخصّص AB مدير حساب يعمل مباشرةً مع فرق الخدمات اللوجستية في الوزارات، وموظفي السفارات، وإدارات المراسم في الدولة المستضيفة. ويتولّى مركز العمليات لدينا في الرياض، العامل على مدار الساعة، تحديد مناطق التجمّع، وتأكيد التصاريح الأمنية، ورسم الممرات الرئيسية، وتفعيل التتبّع عبر GPS في الوقت الفعلي. ويلتزم السائقون الخاصون بمواعيد الوصول المحددة إلى مواقع القمة، بما يواكب برامج المؤتمرات المزدحمة لكبار المسؤولين وفرق الدعم.",
      },
      {
        q: "هل تستطيع AB توفير نقل عالي السعة للوفود في زيارات الدولة الثنائية؟",
        a: "نعم. تنسّق AB أطرًا متكاملة لنقل الوفود، تشمل نقل رؤساء الدول والوزراء والوفود التجارية وأفراد الأمن في وقت واحد. ويضمن أسطولنا المتنوّع من سيارات سيدان الدرجة الأولى، ومركبات الدفع الرباعي التنفيذية، والمركبات متعددة الأغراض المتميّزة موكبًا موحّدًا ومتناسقًا. وتتحرك كل مركبة تحت إشراف مباشر من فريق التوجيه، مع الحفاظ على مسافات دقيقة، واتصال لاسلكي مخصّص، ووصول متزامن إلى مباني المطارات والسفارات والقصور الرسمية.",
      },
      {
        q: "كيف تدير فرقكم نقل المراسم في مختلف العواصم الخليجية؟",
        a: "تمتلك AB مكاتب محلية راسخة في الرياض ودبي وأبوظبي والدوحة، وتطبّق إجراءات تشغيلية موحّدة لنقل المراسم عبر الحدود. ونخدم مباشرةً المملكة العربية السعودية، وإمارات الدولة السبع، وقطر، مما يتيح للبعثات الدبلوماسية تنفيذ برامج رحلات في دول متعددة ضمن حساب واحد. وتلتزم عملياتنا التزامًا صارمًا بالإرشادات السيادية المحلية للمراسم، مع الحفاظ على تواصل ثابت وفوترة مركزية عبر مقرّنا الرئيسي.",
      },
      {
        q: "ما المؤهلات التي يحملها السائقون الخاصون المكلّفون بخدمة السائق الخاص للسفارات؟",
        a: "يحمل السائقون الخاصون المكلّفون بخدمة السائق الخاص للسفارات لدينا رخص نقل الركاب المهنية المطلوبة، وسجلات أمنية نظيفة، وتدريبًا مكثّفًا على أساليب القيادة الوقائية. كما يُلمّون بأعراف المجاملة الدبلوماسية الدولية، ومراسم الأعلام، وإجراءات محيط السفارات، والتزامات عدم الإفصاح المتعلقة بالمحادثات السرية. ويحافظ السائقون الخاصون على التكتّم وحسن المظهر وسرعة الاستجابة للتغييرات المفاجئة في الجداول طوال فترة تكليفهم الدبلوماسي.",
      },
      {
        q: "كيف تحمي AB سرية الركاب وبيانات برامج الرحلات الحساسة؟",
        a: "نحافظ على سرية الركاب من خلال بروتوكولات صارمة للوصول إلى البيانات، وقنوات حجز مشفّرة، واتفاقيات رسمية لعدم الإفصاح يوقّعها جميع موظفي التوجيه والسائقين الخاصين. وتُحفَظ برامج الرحلات وأسماء الركاب ومواقع الاجتماعات بصلاحيات وصول محصورة داخل مركز العمليات لدينا العامل على مدار الساعة. ولا يناقش السائقون الخاصون أبدًا هويات الركاب أو برامج رحلاتهم، حمايةً لكبار الشخصيات الزائرين من الكشف العلني والمخاطر الأمنية.",
      },
      {
        q: "كيف يُتعامل مع تغييرات اللحظة الأخيرة في الجداول وتأخّر الرحلات الجوية خلال الزيارات الرسمية؟",
        a: "يراقب مركز العمليات لدينا على مدار الساعة، وفي الوقت الفعلي، أرقام تسجيل طائرات الطيران الخاص، ووصول الرحلات التجارية، وتحركات المواكب الرسمية. وعندما تتأخر المفاوضات الثنائية أو تتغيّر مواعيد الرحلات، يعدّل موجّهو الحركة فورًا أوقات تمركز السائقين الخاصين ويحدّثون مسارات المواكب. وتبقى مركبات احتياطية مخصّصة في حالة جاهزية على طول الممرات الرئيسية لتوفير بديل فوري دون الإخلال بالبرنامج الرسمي.",
      },
    ],
    others: [
      { name: "الطيران وصالات الطيران الخاص (FBO)", href: "/industries/aviation" },
      { name: "الشركات والمؤسسات", href: "/industries/corporate-enterprise" },
      { name: "الضيافة", href: "/industries/hospitality" },
      { name: "الفعاليات والمعارض", href: "/industries/events-exhibitions" },
      { name: "الطاقة والمشاريع العملاقة", href: "/industries/energy-giga-projects" },
      { name: "الرياضة والترفيه", href: "/industries/sports-entertainment" },
    ],
    ctaH2: "نقل دبلوماسي آمن للبعثات الرسمية",
    ctaP: "تواصل مباشرةً مع مكتب الخدمات اللوجستية للقطاعات في AB لمراجعة الجداول الزمنية، وقوائم الركاب، والتصاريح الأمنية، وتوزيع الأسطول.",
    ctaSubH3: "خطّط للخدمات اللوجستية لوفدك الرسمي",
    ctaSubP:
      "تواصل مع مكتب عمليات المراسم لدينا لتنسيق إدارة متكاملة للمواكب وتنقلات آمنة للمركبات في أنحاء المملكة العربية السعودية والإمارات العربية المتحدة وقطر.",
    ctaPrimaryLabel: "اطلب عرضًا",
    ctaPrimaryHref: "/services/chauffeur-vip",
    ctaSecondaryLabel: "احجز رحلة نقل",
    ctaSecondaryHref: "/services/chauffeur-vip",
  },
};

const SLUG_ALIASES: Record<string, string> = {
  energy: "energy-giga-projects",
  events: "events-exhibitions",
  sports: "sports-entertainment",
  corporate: "corporate-enterprise",
  government: "government-diplomatic",
};

export function getIndustryData(slug: string, lang?: string): IndustryDetailData | undefined {
  const normalized = SLUG_ALIASES[slug] || slug;
  if (lang === "ar" && INDUSTRY_DETAILS_AR[normalized]) {
    return INDUSTRY_DETAILS_AR[normalized];
  }
  return INDUSTRY_DETAILS[normalized];
}

export function getAllIndustrySlugs(): string[] {
  return Object.keys(INDUSTRY_DETAILS);
}
