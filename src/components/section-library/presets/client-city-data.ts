import type { LocationFaq } from "@/lib/locations";
import type { SectionInstance } from "../types";
import { makeSection, withOrder } from "./common";

export interface CityVehicleSpec {
  category: string;
  specLine: string;
  model: string;
  idealFor: string;
  capacity: string;
  bags: string;
  description: string;
  imageIndex: number; // 2..7
  imageAlt?: string;
}

export interface CityJourneyItem {
  tag: string;
  title: string;
  description?: string;
  priceText: string;
  href?: string;
}

export interface CityServiceItem {
  title: string;
  description: string;
  href: string;
  icon: string;
}

export interface CityAirportInfo {
  eyebrow: string;
  heading: string;
  description: string;
  bullets: Array<{ heading: string; description: string; icon?: string }>;
  image?: string;
  imageAlt?: string;
}

export interface CityCoverageGroup {
  category: string;
  places: string;
  icon: string;
}

export interface ClientCityData {
  slug: string;
  name: string;
  displayName: string;
  imageFolder: string;
  heroTitle: string;
  heroDescription: string;
  heroImageAlt: string;
  description: string;
  fleetEyebrow: string;
  fleetHeading: string;
  fleetSubheading: string;
  vehicles: CityVehicleSpec[];
  journeysEyebrow: string;
  journeysHeading: string;
  journeysDescription: string;
  journeys: CityJourneyItem[];
  servicesEyebrow: string;
  servicesHeading: string;
  servicesDescription: string;
  services: CityServiceItem[];
  airportInfo: CityAirportInfo;
  coverageEyebrow: string;
  coverageHeading: string;
  coverageDescription: string;
  coverageGroups: CityCoverageGroup[];
  coverageImage?: string;
  coverageImageAlt?: string;
  officeEyebrow: string;
  officeHeading: string;
  officeDescription: string;
  officeTitle: string;
  officeAddress: string;
  officePhone: string;
  faqEyebrow: string;
  faqHeading: string;
  faqs: LocationFaq[];
  ctaHeading: string;
  ctaDescription: string;
  ctaSubheading?: string;
  ctaSubdescription?: string;
}

export function buildKsaCitySections(
  data: ClientCityData,
  homeLabel: string,
  rootLabel: string
): SectionInstance[] {
  const heroImage = `/locations/${data.imageFolder}/image1.jpg`;

  return withOrder([
    makeSection("hero", {
      variant: "with-inquiry-form",
      content: {
        eyebrow: "",
        title: data.heroTitle,
        titleHighlight: "",
        description: data.heroDescription,
      },
      items: [
        { label: "Book now", href: "#fleet", style: "primary" },
        { label: "View the fleet", href: "#fleet", style: "secondary" },
      ],
      appearance: {
        background: heroImage,
        backgroundAlt: data.heroImageAlt,
      },
    }),
    makeSection("breadcrumb", {
      content: { homeLabel, rootLabel },
    }),
    makeSection("fleetGrid", {
      variant: "default",
      content: {
        eyebrow: data.fleetEyebrow,
        heading: data.fleetHeading,
        description: data.fleetSubheading,
        headerAction: { label: "View Full Fleet", href: "/fleet" },
      },
      items: data.vehicles.map((v, idx) => ({
        id: `${data.slug}-veh-${idx + 1}`,
        badge: v.specLine,
        badgeStyle: idx === 2 || idx === 3 ? "accent" : "default",
        image: `/locations/${data.imageFolder}/image${v.imageIndex}.jpg`,
        imageAlt: v.imageAlt || `${v.category} in ${data.displayName}`,
        category: v.category,
        name: v.model,
        idealFor: v.idealFor,
        description: v.description,
        capacity: v.capacity,
        bags: v.bags,
        actions: [
          { label: "Book this class", href: "/book" },
          { label: "Request a quote", href: "/contact" },
          { label: "Airport transfer", href: "/services/airport-transfers" },
          { label: "Hourly chauffeur", href: "/services/chauffeur-service" },
          { label: "Full specifications", href: "/fleet" },
        ],
      })),
      settings: { columns: "3" },
      appearance: { theme: "darker", padding: "lg", border: true, textAlign: "left" },
    }),
    makeSection("serviceCards", {
      variant: "3-column",
      content: {
        eyebrow: data.journeysEyebrow,
        heading: data.journeysHeading,
        description: data.journeysDescription,
        bottomCta: {
          label: "Explore Intercity Transfers",
          href: "/services/intercity-transfers",
          style: "secondary",
        },
      },
      items: data.journeys.map((j, idx) => ({
        id: `${data.slug}-jrny-${idx + 1}`,
        icon: j.tag.toLowerCase().includes("airport")
          ? "Plane"
          : j.tag.toLowerCase().includes("intercity")
          ? "Map"
          : "Clock",
        tag: j.tag,
        title: j.title,
        description: j.description || "",
        subtext: j.priceText,
        actions: j.href
          ? [{ label: "Book route", href: j.href, style: "accent" }]
          : [{ label: "Book transfer", href: "/book", style: "accent" }],
      })),
      settings: { source: "inline", columns: "3", showHeader: true },
      appearance: { theme: "dark", padding: "lg", border: true, textAlign: "left" },
    }),
    makeSection("serviceCards", {
      variant: "3-column",
      content: {
        eyebrow: data.servicesEyebrow,
        heading: data.servicesHeading,
        description: data.servicesDescription,
      },
      items: data.services.map((s, idx) => ({
        id: `${data.slug}-svc-${idx + 1}`,
        icon: s.icon,
        title: s.title,
        description: s.description,
        actions: [{ label: s.title, href: s.href, style: "accent" }],
      })),
      settings: {
        source: "inline",
        columns: data.services.length === 3 ? "3" : "2",
        showHeader: true,
      },
      appearance: { theme: "darker", padding: "lg", border: true, textAlign: "left" },
    }),
    makeSection("mediaContent", {
      variant: "media-right",
      content: {
        eyebrow: data.airportInfo.eyebrow,
        heading: data.airportInfo.heading,
        description: data.airportInfo.description,
        items: data.airportInfo.bullets.map((b, idx) => ({
          id: `${data.slug}-apt-b-${idx + 1}`,
          icon: b.icon || (idx === 0 ? "Plane" : idx === 1 ? "Users" : "Clock"),
          heading: b.heading,
          description: b.description,
        })),
        actions: [{ label: "Book Airport Transfer", href: "/book", style: "primary" }],
      },
      settings: { mediaPosition: "right", containerWidth: "default" },
      appearance: {
        theme: "dark",
        padding: "lg",
        border: true,
        textAlign: "left",
        background: data.airportInfo.image || heroImage,
        backgroundAlt: data.airportInfo.imageAlt || data.airportInfo.heading,
        pattern: false,
      },
    }),
    makeSection("airportsGrid", {
      content: { heading: "", description: "" },
      settings: { source: "context.airports", columns: "3" },
      appearance: { theme: "dark", padding: "none", border: false, textAlign: "left" },
    }),
    makeSection("mediaContent", {
      variant: "media-left",
      content: {
        eyebrow: data.coverageEyebrow,
        heading: data.coverageHeading,
        description: data.coverageDescription,
        items: data.coverageGroups.map((g, idx) => ({
          id: `${data.slug}-cov-${idx + 1}`,
          icon: g.icon,
          heading: g.category,
          description: g.places,
        })),
        actions: [],
      },
      settings: { mediaPosition: "left", containerWidth: "default" },
      appearance: {
        theme: "darker",
        padding: "lg",
        border: true,
        textAlign: "left",
        background: data.coverageImage || "",
        backgroundAlt: data.coverageImageAlt || data.coverageHeading,
        pattern: !data.coverageImage,
      },
    }),
    makeSection("routesGrid", {
      content: { heading: `Intercity Routes from ${data.displayName}`, description: "" },
      settings: { source: "context.routes", columns: "3" },
      appearance: { theme: "dark", padding: "md", border: true, textAlign: "left" },
    }),
    makeSection("mediaContent", {
      variant: "media-right",
      content: {
        eyebrow: data.officeEyebrow,
        heading: data.officeHeading,
        description: data.officeDescription,
        items: [
          {
            id: `${data.slug}-hq-1`,
            icon: "Map",
            heading: data.officeTitle,
            description: data.officeAddress,
          },
          {
            id: `${data.slug}-hq-2`,
            icon: "Phone",
            heading: data.officePhone,
            description: "24/7 central dispatch and reservations",
          },
        ],
        actions: [
          {
            label: "Get directions",
            href: "https://maps.google.com/maps?q=Building+3036,+Office+08,+2nd+Floor,+Umar+Ibn+Abdulaziz+Road,+Al+Malaz,+Riyadh,+Saudi+Arabia",
            style: "secondary",
          },
        ],
      },
      settings: { mediaPosition: "right", containerWidth: "default" },
      appearance: {
        theme: "darker",
        padding: "lg",
        border: true,
        textAlign: "left",
        background: "",
        pattern: true,
      },
    }),
    makeSection("faq", {
      content: {
        eyebrow: data.faqEyebrow,
        heading: data.faqHeading,
        description: "",
        items: [],
      },
      items: [],
      settings: { variant: "default", source: "context.faqs" },
      appearance: { theme: "dark", padding: "lg", border: true, textAlign: "center" },
    }),
    makeSection("ctaBanner", {
      content: {
        heading: data.ctaHeading,
        description: data.ctaDescription,
        ...(data.ctaSubheading ? { subheading: data.ctaSubheading } : {}),
        ...(data.ctaSubdescription ? { subdescription: data.ctaSubdescription } : {}),
      },
      items: [
        { label: "Book now", href: "/book", style: "primary" },
        { label: "Request a proposal", href: "/quote/tender", style: "secondary" },
      ],
      appearance: { theme: "darker", padding: "lg", border: true, textAlign: "center" },
    }),
  ]);
}

export const CLIENT_CITY_DATA: Record<string, ClientCityData> = {
  abha: {
    slug: "abha",
    name: "Abha",
    displayName: "Abha",
    imageFolder: "www.ab.limo-locations-saudi-arabia-abha-images",
    heroTitle: "Chauffeur service in Abha",
    heroDescription:
      "AB provides executive chauffeur service for Abha solutions connecting corporate travellers directly with Abha International Airport (AHB). Our professional drivers manage ground travel across Abha with disciplined operations, punctuality, and immaculate vehicles prepared for demanding mountain terrain.\n\nHigh elevation geography and winding road networks make dependable ground coordination essential for business visitors. Central dispatch from our regional operations desk maintains continuous vehicle monitoring and punctual transfers across the southern province.",
    heroImageAlt: "Abha skyline landscape with mountain elevations and city roads",
    description:
      "Airport Code: AHB. Operational Status: Southern Province Coverage. Transport solutions operating through the Asir highland territory, serving regional administrative bodies, seasonal symposiums and institutional travel needs.",
    fleetEyebrow: "The Abha fleet",
    fleetHeading: "Choose your Abha chauffeur class",
    fleetSubheading:
      "Vehicles for Abha are dispatched from the nearest office, AB Riyadh (headquarters) [Confirm nearest office]. Every chauffeur vehicle delivers immaculate executive standards, climate control, and disciplined mechanical maintenance suited for regional elevations.",
    vehicles: [
      {
        category: "Standard Sedan",
        specLine: "Sedan · 3 guests · 2 bags",
        model: "Typical model: Executive sedan or similar [Confirm]",
        idealFor: "Ideal for: Efficient point to point transfers",
        capacity: "3 guests",
        bags: "2 bags",
        description:
          "Our standard sedan provides quiet efficiency for individual travellers visiting corporate facilities or government offices in Abha. Passengers enjoy climate control and attentive driving along busy urban corridors.",
        imageIndex: 2,
        imageAlt: "Standard sedan chauffeur service in Abha",
      },
      {
        category: "Business Sedan",
        specLine: "Sedan · 3 guests · 2 bags",
        model: "Typical model: Mercedes E Class or similar [Confirm]",
        idealFor: "Ideal for: Corporate executives and daily itineraries",
        capacity: "3 guests",
        bags: "2 bags",
        description:
          "The business sedan combines refined styling with productive workspace for executives attending commercial appointments across the region. Generous legroom and acoustic insulation allow undisturbed telephone briefings between destinations.",
        imageIndex: 3,
        imageAlt: "Business sedan private driver Abha",
      },
      {
        category: "First Class Sedan",
        specLine: "Flagship sedan · 3 guests · 2 bags",
        model: "Typical model: Mercedes S Class or similar [Confirm]",
        idealFor: "Ideal for: VIP delegations and diplomatic transport",
        capacity: "3 guests",
        bags: "2 bags",
        description:
          "Flagship luxury provides peerless comfort for distinguished delegates travelling through Abha. Handcrafted upholstery, reclining seating, and superior suspension smooth out winding mountain roads between ceremonial and executive commitments.",
        imageIndex: 4,
        imageAlt: "First class sedan luxury transport in Abha",
      },
      {
        category: "Executive SUV",
        specLine: "SUV · 6 guests · 5 bags",
        model: "Typical model: GMC Yukon or Cadillac Escalade or similar [Confirm]",
        idealFor: "Ideal for: Mountain terrain and executive groups",
        capacity: "6 guests",
        bags: "5 bags",
        description:
          "Commanding performance and elevated ground clearance make this SUV suited for steep mountain ascents around Abha. Spacious leather seating and expansive luggage capacity accommodate delegations with substantial equipment.",
        imageIndex: 5,
        imageAlt: "Executive SUV chauffeur service in Abha",
      },
      {
        category: "Premium MPV",
        specLine: "MPV · 6 guests · 5 bags",
        model: "Typical model: Mercedes V Class or similar [Confirm]",
        idealFor: "Ideal for: Small teams and mobile conferences",
        capacity: "6 guests",
        bags: "5 bags",
        description:
          "Configured with face to face seating, this premium cabin allows project teams to collaborate while travelling between sites. Smooth access and ample luggage volume support multi passenger airport runs.",
        imageIndex: 6,
        imageAlt: "Premium MPV private chauffeur in Abha",
      },
      {
        category: "Executive Van",
        specLine: "Van · 14 guests · 10 bags",
        model: "Typical model: Mercedes Sprinter or similar [Confirm]",
        idealFor: "Ideal for: Large delegations and event groups",
        capacity: "14 guests",
        bags: "10 bags",
        description:
          "Designed for larger entourages, this executive carrier offers standing headroom, individual overhead ventilation, and generous luggage compartments. Coordinated group travel proceeds with comfort and disciplined timing.",
        imageIndex: 7,
        imageAlt: "Executive van group travel Abha",
      },
    ],
    journeysEyebrow: "Popular journeys",
    journeysHeading: "Across Abha and beyond",
    journeysDescription:
      "AB coordinates individual and group transfers connecting commercial hubs, mountain tourist attractions, and neighbouring industrial cities. Our drivers maintain scheduled timing along primary mountain motorways and regional arterial roads.",
    journeys: [
      {
        tag: "Airport transfer",
        title: "AHB to Abha city centre",
        priceText: "From [SAR price]",
      },
      {
        tag: "Airport transfer",
        title: "AHB to Khamis Mushait",
        priceText: "From [SAR price]",
      },
      {
        tag: "City",
        title: "Abha to Al Soudah",
        priceText: "From [SAR price]",
      },
      {
        tag: "City",
        title: "Abha to Khamis Mushait",
        priceText: "From [SAR price]",
      },
      {
        tag: "Intercity",
        title: "Abha to Jizan [Confirm]",
        priceText: "From [SAR price] · [Confirm] hours",
        href: "/locations/saudi-arabia/abha/routes/abha-to-jizan",
      },
    ],
    servicesEyebrow: "Services in Abha",
    servicesHeading: "One partner for every movement in Abha",
    servicesDescription:
      "AB delivers managed ground mobility solutions supporting corporate delegations, flight connections, and chartered group travel across the Asir province.",
    services: [
      {
        title: "Chauffeur & VIP",
        description: "Executive private driver and VIP ground transport across Abha.",
        href: "/services/chauffeur-service",
        icon: "Crown",
      },
      {
        title: "Airport Transfers",
        description: "Flight-tracked arrivals and meet and greet at Abha International Airport (AHB).",
        href: "/services/airport-transfers",
        icon: "Plane",
      },
      {
        title: "Bus & Coach Hire arranged in Abha",
        description: "Chartered group and delegation transport across the Asir province.",
        href: "/services/event-transport",
        icon: "Users",
      },
    ],
    airportInfo: {
      eyebrow: "Airport transfers",
      heading: "Arriving at Abha International Airport (AHB)",
      description:
        "Chauffeurs monitor incoming passenger flights landing at Abha International Airport (AHB) through real time flight tracking. Dispatchers adjust chauffeur positioning whenever incoming regional or international flights encounter unexpected air traffic delays. Your assigned private driver conducts an executive meet and greet with a personalised name board inside the arrivals terminal at meeting point [Confirm]. Travellers receive complimentary free waiting time [Confirm] following touchdown, allowing calm transit through customs, baggage recovery, and terminal security. Chauffeurs assist with all heavy baggage before escorting passengers directly to their premium sedan or executive SUV. Ground coordination proceeds smoothly without queueing, ride hailing confusion, or uncoordinated kerbside pickups in volatile mountain weather.\n\nReserving an AHB airport transfer provides complete itinerary predictability for arriving executives and visiting delegations. Flight tracking technology synchronises your driver with actual runway touchdown rather than published schedule estimates. This operational discipline prevents missed connections and avoids unnecessary kerbside waiting times outside the terminal.\n\nProfessional drivers possess thorough knowledge of southern regional roads and navigate direct routes to downtown accommodations or commercial offices. Vehicles parked in pre arranged staging areas remain at optimal interior temperatures, providing immediate thermal comfort after stepping out of the terminal. Luggage handling protocols keep travel possessions secure while passengers relax in climate controlled comfort.",
      bullets: [
        { heading: "Flight tracking", description: "Every arrival" },
        { heading: "Meet and greet", description: "Inside the terminal" },
        { heading: "AHB to Abha city centre", description: "[Confirm] minutes" },
      ],
    },
    coverageEyebrow: "Coverage",
    coverageHeading: "Where we work in Abha",
    coverageDescription:
      "AB coordinates private ground mobility across all principal sectors of the regional capital. Chauffeurs navigate elevated mountain passes, central commercial districts, administrative complexes, and premier gathering destinations with disciplined local knowledge. Dispatchers monitor regional highway corridors, provincial headquarters, and mountain ridges to maintain punctual movements across every planned itinerary in the metropolitan zone.\n\nUrban transit in the Asir region presents unique operational conditions, including steep road gradients, morning fog, and sudden weather variations. Our drivers plan journey paths with local insight, selecting optimal bypasses during peak traffic periods around central squares. Corporate guests move between government appointments and commercial meetings without experiencing unexpected mountain transit delays.\n\nOperational coordination extends beyond city boundaries into surrounding industrial zones and high elevation development corridors. Scheduled transfers maintain seamless connections between metropolitan boardrooms and remote facility sites across the highlands. This comprehensive operational presence supports extensive regional projects and multi day executive itineraries.",
    coverageGroups: [
      {
        category: "Business",
        places:
          "Key commercial locations include Al Khalidiyyah district, King Fahd Road commercial corridor, and Al Andalus business district.",
        icon: "Briefcase",
      },
      {
        category: "Events and conferences",
        places:
          "Premier conference destinations include Abha Palace Event Centre, Asir Chamber of Commerce, and King Khalid University Conference Hall.",
        icon: "Users",
      },
      {
        category: "Heritage and leisure",
        places:
          "Notable cultural landmarks include Al Muftaha Cultural Village, High City and Jabal Al Akhdar, and Al Soudah mountain ridges.",
        icon: "Crown",
      },
      {
        category: "Government or Industry",
        places:
          "Key administrative zones include Asir Governorate Headquarters, Abha Regional Municipality, and Aseer Industrial City.",
        icon: "Shield",
      },
    ],
    officeEyebrow: "Our office",
    officeHeading: "Operations and dispatch for Abha",
    officeDescription:
      "Executive travel across Abha is supported directly through central logistics and around the clock fleet dispatch. While operating across the southern highlands, our operations centre in Riyadh coordinates vehicle preparations, driver scheduling, and protocol logistics to maintain seamless ground transport standards throughout Saudi Arabia.\n\nCentralised control protocols verify driver credentials, route planning, and vehicle preparation prior to every scheduled journey. Corporate travel organisers benefit from unified billing, immediate schedule updates, and consistent service delivery across regional travel destinations. Continuous dispatch oversight provides complete operational responsiveness for dynamic business agendas.",
    officeTitle: "AB Riyadh (headquarters) [Confirm nearest office]",
    officeAddress:
      "Building 3036, Office 08, 2nd Floor, Umar Ibn Abdulaziz Road, Al Malaz, Riyadh, Saudi Arabia.",
    officePhone: "Telephone: +966 58 111 8720",
    faqEyebrow: "Questions",
    faqHeading: "Chauffeur service in Abha: your questions",
    faqs: [
      {
        q: "How do I arrange an executive chauffeur service in Abha?",
        a: "Reservations can be requested online or through our round the clock dispatch desk in Riyadh. Simply submit your travel dates, preferred vehicle category, passenger count, and route details. Our team confirms availability, assigns a certified private driver, and provides full chauffeur identification details prior to departure. Corporate accounts also receive centralised invoicing and flexible itinerary adjustments for regional meetings.",
      },
      {
        q: "What is the protocol for AHB airport collections?",
        a: "Every arrival at Abha International Airport (AHB) includes complimentary flight tracking and executive meet and greet service. Your assigned chauffeur monitors flight progress to adjust for early touchdowns or unexpected air delays. The driver waits inside arrivals holding a personalised name board at meeting point [Confirm]. Guests receive complimentary waiting time [Confirm] to complete baggage collection before a seamless transfer to their destination.",
      },
      {
        q: "Can AB provide a private driver in Abha for high altitude mountain roads?",
        a: "Booking a private driver Abha service allows business visitors to navigate steep terrain without personal driving stress. AB provides experienced chauffeurs specifically accustomed to the winding elevations and seasonal weather patterns across Abha and the Asir highlands. All drivers adhere to rigorous defensive driving procedures, while fleet vehicles undergo comprehensive mechanical inspections to handle steep mountain gradients. Passengers enjoy smooth, unhurried journeys whether ascending to panoramic ridge viewpoints or travelling between elevated residential and municipal sectors.",
      },
      {
        q: "How do intercity transfers from Abha to regional destinations work?",
        a: "Every intercity transfer Abha connection provides direct transportation to surrounding commercial and industrial centres. AB operates scheduled private intercity transfers from Abha to key destinations including Khamis Mushait, Jizan, and surrounding commercial centres. Passengers travel in premium sedans or executive SUVs configured for long distance comfort, avoiding the inconvenience of regional flight schedules or unvetted taxis. Every intercity journey features door to door pickup, climate control, complimentary bottled refreshments, and professional route planning for optimal efficiency.",
      },
      {
        q: "Which vehicle classes are available for chauffeur bookings in Abha?",
        a: "Our regional fleet encompasses standard, business, and first class sedans such as the Mercedes S Class, alongside executive SUVs like the GMC Yukon and Cadillac Escalade. For corporate delegations and private entourages, we supply luxury Mercedes V Class multi purpose vehicles and spacious passenger vans. Every vehicle dispatched in Abha maintains rigorous safety standards, immaculate detailing, and advanced climate control.",
      },
    ],
    ctaHeading: "Your chauffeur is ready in Abha.",
    ctaDescription:
      "Reserve your private vehicle today or contact our 24/7 Riyadh operations centre at +966 58 111 8720 to arrange tailored chauffeur service Abha itineraries.",
  },

  "al-khobar": {
    slug: "al-khobar",
    name: "Al Khobar",
    displayName: "Al Khobar",
    imageFolder: "www.ab.limo-locations-saudi-arabia-al-khobar-images",
    heroTitle: "Chauffeur service in Al Khobar",
    heroDescription:
      "AB delivers executive chauffeur service Al Khobar transport across the Eastern Province. Professional chauffeurs coordinate transfers between King Fahd International Airport (DMM) and corporate addresses in Al Khobar, maintaining punctuality and discretion throughout every business journey.\n\nExecutive travel demands punctual coordination, vetted drivers and spotless vehicles prepared for corporate schedules. Our managed transportation network supports executive teams with direct scheduling, live flight monitoring and dedicated regional assistance.",
    heroImageAlt: "Al Khobar skyline",
    description:
      "Airport Code: DMM. Operational Status: Active Corporate Hub. Providing executive car service solutions for energy sector headquarters, international business parks and interstate commercial travel connecting regional industrial complexes.",
    fleetEyebrow: "The Al Khobar fleet",
    fleetHeading: "Choose your chauffeur service Al Khobar class",
    fleetSubheading:
      "Every vehicle in our Al Khobar fleet is GPS tracked and detailed before each journey. AB maintains exceptional standards of comfort, mechanical safety and interior presentation for all executive movements.",
    vehicles: [
      {
        category: "Standard Sedan",
        specLine: "Sedan · 3 guests · 2 bags",
        model: "Typical model: Executive sedan or similar [Confirm]",
        idealFor: "Ideal for: Solo business travel and transfers",
        capacity: "3 guests",
        bags: "2 bags",
        description:
          "Experience dependable private transport across Al Khobar for daily corporate meetings and regional appointments. Each vehicle provides quiet cabin comfort, chilled bottled water and mobile device charging for efficient journeys.",
        imageIndex: 2,
        imageAlt: "Standard Sedan chauffeur service in Al Khobar",
      },
      {
        category: "Business Sedan",
        specLine: "Sedan · 3 guests · 2 bags",
        model: "Typical model: Mercedes E Class or similar [Confirm]",
        idealFor: "Ideal for: Executive business travel in comfort",
        capacity: "3 guests",
        bags: "2 bags",
        description:
          "Travel between regional offices with a professional chauffeur dedicated to your schedule. Premium leather seating and dual zone climate control create a refined working environment suitable for corporate directors on the move.",
        imageIndex: 3,
        imageAlt: "Business Sedan chauffeur service Al Khobar",
      },
      {
        category: "First Class Sedan",
        specLine: "Flagship sedan · 3 guests · 2 bags",
        model: "Typical model: Mercedes S Class or similar [Confirm]",
        idealFor: "Ideal for: VIP corporate protocol and dignitaries",
        capacity: "3 guests",
        bags: "2 bags",
        description:
          "The premier choice for visiting delegations and senior leaders arriving in Al Khobar. Spacious rear seating, acoustic privacy glass and refined ride quality deliver calm comfort throughout every VIP movement.",
        imageIndex: 4,
        imageAlt: "First Class Sedan luxury car in Al Khobar",
      },
      {
        category: "Executive SUV",
        specLine: "SUV · 6 guests · 5 bags",
        model: "Typical model: Cadillac Escalade, GMC Yukon or similar [Confirm]",
        idealFor: "Ideal for: Corporate delegations with generous luggage",
        capacity: "6 guests",
        bags: "5 bags",
        description:
          "Spacious and commanding luxury travel across Al Khobar and Eastern Province highways. Generous boot capacity and elevated seating provide comfortable long distance transport for corporate teams and visiting executives.",
        imageIndex: 5,
        imageAlt: "Executive SUV private driver in Al Khobar",
      },
      {
        category: "Premium MPV",
        specLine: "MPV · 6 guests · 5 bags",
        model: "Typical model: Mercedes V Class or similar [Confirm]",
        idealFor: "Ideal for: Mobile meetings and small groups",
        capacity: "6 guests",
        bags: "5 bags",
        description:
          "Featuring face to face conference seating, this spacious vehicle serves executive roadshows and collaborative teams. Flexible cabin arrangements support confidential discussions while travelling between commercial venues in Al Khobar.",
        imageIndex: 6,
        imageAlt: "Premium MPV limousine service Al Khobar",
      },
      {
        category: "Executive Van",
        specLine: "Van · 14 guests · 10 bags",
        model: "Typical model: Luxury passenger van or similar [Confirm]",
        idealFor: "Ideal for: Large event delegations and crews",
        capacity: "14 guests",
        bags: "10 bags",
        description:
          "Accommodate larger project teams, conference speakers and event delegates across the Eastern Province. High roof styling and wide aisles offer generous space for passengers and substantial luggage loads during regional transfers.",
        imageIndex: 7,
        imageAlt: "Executive Van transport service in Al Khobar",
      },
    ],
    journeysEyebrow: "Popular journeys",
    journeysHeading: "Across Al Khobar and beyond",
    journeysDescription:
      "AB provides reliable point to point transfers connecting primary commercial districts, transport hubs and neighbouring cities. Select your route for transparent pricing and punctual execution.",
    journeys: [
      {
        tag: "Airport transfer",
        title: "DMM to Al Khobar Corniche",
        priceText: "From [SAR price]",
      },
      {
        tag: "Airport transfer",
        title: "DMM to Dhahran",
        priceText: "From [SAR price]",
      },
      {
        tag: "City",
        title: "Al Khobar to Half Moon Bay",
        priceText: "From [SAR price]",
      },
      {
        tag: "City",
        title: "Al Khobar to Dammam",
        priceText: "From [SAR price]",
        href: "/locations/saudi-arabia/al-khobar/routes/al-khobar-to-dammam",
      },
      {
        tag: "City",
        title: "Al Khobar to Dhahran",
        priceText: "From [SAR price]",
      },
      {
        tag: "Intercity",
        title: "Al Khobar to Riyadh",
        priceText: "From [SAR price] · [Confirm] hours",
        href: "/locations/saudi-arabia/al-khobar/routes/al-khobar-to-riyadh",
      },
      {
        tag: "Intercity",
        title: "Al Khobar to Bahrain via the King Fahd Causeway [Confirm cross border service]",
        priceText: "From [SAR price] · [Confirm] hours",
        href: "/locations/saudi-arabia/al-khobar/routes/al-khobar-to-manama",
      },
    ],
    servicesEyebrow: "Services in Al Khobar",
    servicesHeading: "One partner for every movement in Al Khobar",
    servicesDescription:
      "AB provides executive car hire and limousine service Al Khobar travel for corporate leaders across the Eastern Province.\n\nOur managed ground logistics support multinational corporations, event organisers and government delegations throughout the region. Professional chauffeurs deliver punctual transfers between commercial headquarters, luxury hotels and regional transportation hubs.",
    services: [
      {
        title: "Chauffeur & VIP in Al Khobar",
        description: "Executive car hire and limousine service in Al Khobar for corporate leaders.",
        href: "/services/chauffeur-service",
        icon: "Crown",
      },
      {
        title: "King Fahd International Airport (DMM)",
        description: "Flight-tracked airport transfers with terminal meet and greet at DMM.",
        href: "/locations/saudi-arabia/dammam/airport/king-fahd-international-airport",
        icon: "Plane",
      },
      {
        title: "Intercity Transfers",
        description: "Regional highway transfers across the Eastern Province, Riyadh, and Bahrain.",
        href: "/services/chauffeur-service",
        icon: "Map",
      },
    ],
    airportInfo: {
      eyebrow: "Airport transfers",
      heading: "Arriving at King Fahd International Airport (DMM)",
      description:
        "Arriving at King Fahd International Airport (DMM) connects corporate travellers directly to the commercial centres of the Eastern Province. AB monitors every inbound flight using live flight tracking so your driver adjusts immediately to early arrivals or flight delays. Your professional chauffeur provides a personalised meet and greet with name board at the designated terminal meeting point [Confirm]. Guests receive attentive luggage assistance between the arrivals hall and the waiting executive vehicle. To support relaxed transit through customs and baggage retrieval, every DMM airport transfer includes free waiting time [Confirm]. The direct highway route provides a smooth transition from your flight to your hotel or regional office.",
      bullets: [
        { heading: "Flight tracking", description: "Every arrival." },
        { heading: "Meet and greet", description: "Inside the terminal." },
        { heading: "DMM to Al Khobar Corniche", description: "[Confirm] minutes." },
      ],
    },
    coverageEyebrow: "Coverage",
    coverageHeading: "Where we work in Al Khobar",
    coverageDescription:
      "AB provides comprehensive ground transportation across the commercial and coastal districts of Al Khobar. Our professional chauffeurs navigate key corporate sectors, waterfront developments and industrial zones with local route knowledge. From financial offices along King Salman Road to luxury beachfront hotels and major conference venues, our private driver Al Khobar team delivers punctual mobility for business travellers and visiting executive delegations.",
    coverageGroups: [
      {
        category: "Business",
        places: "Al Bandariyah · Al Yarmouk · King Salman Road",
        icon: "Briefcase",
      },
      {
        category: "Events and conferences",
        places: "Dhahran Expo · Grand Hyatt · Kempinski Al Othman",
        icon: "Users",
      },
      {
        category: "Heritage and leisure",
        places: "Al Khobar Corniche · Prince Saud Park · Sunset Marina",
        icon: "Crown",
      },
      {
        category: "Government or Industry",
        places: "Chamber of Commerce · Aramco District · Second Industrial City",
        icon: "Shield",
      },
    ],
    officeEyebrow: "Our office",
    officeHeading: "AB Operations Serving Al Khobar",
    officeDescription:
      "AB coordinates regional mobility across Al Khobar through our central operations centre. Corporate clients receive 24/7 dispatch coordination, real time itinerary tracking and dedicated account assistance for all executive travel. Local chauffeurs are managed with strict standards to deliver dependable ground logistics throughout the Eastern Province.",
    officeTitle: "AB Riyadh, headquarters and 24/7 dispatch [Confirm nearest office]",
    officeAddress:
      "Building 3036, Office 08, 2nd Floor, Umar Ibn Abdulaziz Road, Al Malaz, Riyadh, Saudi Arabia",
    officePhone: "+966 58 111 8720",
    faqEyebrow: "Questions",
    faqHeading: "Chauffeur service Al Khobar: your questions",
    faqs: [
      {
        q: "How do I book a chauffeur service Al Khobar transfer with AB?",
        a: "Booking your journey with AB is straightforward through our central reservations team. You can submit your itinerary details online or contact our Riyadh dispatch office directly. Please provide your pick up location, destination, flight details if applicable, date, time and preferred vehicle class. Our team confirms reservations promptly and assigns a professional chauffeur with full vehicle details in advance.",
      },
      {
        q: "What does the meet and greet procedure involve for arrivals at DMM?",
        a: "When arriving at King Fahd International Airport, your chauffeur tracks your inbound flight status in real time to adapt to any schedule changes. Once you clear baggage collection, your driver welcomes you inside the arrivals hall holding a personalised name board. Your driver assists with all luggage and escorts you directly to your waiting executive car for a calm journey.",
      },
      {
        q: "Does AB provide intercity transfer Al Khobar routes across Saudi Arabia and to Bahrain?",
        a: "AB provides comfortable intercity journeys connecting Al Khobar with major regional destinations including Dammam, Dhahran, Jubail, Hofuf and Riyadh. Cross border journeys to Bahrain across the King Fahd Causeway are arranged upon request through vetted partners [Confirm cross border service]. Every long distance journey features premium sedans or SUVs equipped with refreshments, climate control and professional drivers.",
      },
      {
        q: "Can I book an hourly chauffeur or full day hire for corporate meetings?",
        a: "Yes, AB provides flexible hourly hire and full day chauffeur services tailored to corporate schedules. This option suits executives attending consecutive meetings, roadshows or VIP events across multiple commercial districts. Your dedicated driver remains on standby throughout the day, providing immediate departures between venues without the inconvenience of coordinating separate transport bookings for each individual journey.",
      },
      {
        q: "Which vehicle classes are available for chauffeur services in Al Khobar?",
        a: "Our fleet serving Al Khobar includes Standard Sedan, Business Sedan such as the Mercedes E Class, First Class Sedan including the Mercedes S Class, Executive SUV options like the Cadillac Escalade or GMC Yukon, Premium MPV models like the Mercedes V Class, and Executive Vans for up to fourteen guests. Every vehicle is thoroughly detailed and inspected before departure.",
      },
      {
        q: "What safety and vetting standards apply to AB chauffeurs and vehicles?",
        a: "AB maintains strict operational safety across all transportation operations. Every chauffeur is professionally trained, licensed, fully insured and selected for discretion, etiquette and advanced driving competence. Each vehicle in the fleet features active GPS tracking and undergoes rigorous mechanical maintenance. Chauffeurs observe regional traffic laws and corporate protocol standards to provide smooth, dependable passenger transit.",
      },
      {
        q: "How does AB support corporate travel managers and travel partners?",
        a: "AB offers dedicated ground logistics management for corporate travel coordinators, event organisers and executive assistants. Corporate accounts benefit from centralised invoicing, coordinated group movements and 24/7 dispatch support from our regional headquarters. We manage complex itineraries, delegate movements and VIP protocol transport with precision, allowing business teams to focus entirely on their commercial objectives.",
      },
    ],
    ctaHeading: "Your chauffeur is ready in Al Khobar.",
    ctaDescription:
      "Reserve your premium chauffeur service Al Khobar transfer today or arrange dedicated corporate transport with our central dispatch team by calling +966 58 111 8720.",
  },

  "al-qasim": {
    slug: "al-qasim",
    name: "Al Qasim",
    displayName: "Al Qassim",
    imageFolder: "www.ab.limo-locations-saudi-arabia-al-qasim-images",
    heroTitle: "Chauffeur service in Al Qassim",
    heroDescription:
      "AB provides a dedicated chauffeur service Al Qassim organisations rely on for punctual executive mobility throughout the province. Arriving passengers at Prince Naif bin Abdulaziz International Airport (ELQ) receive professional curbside assistance and seamless transit across Al Qassim destinations.\n\nCorporate travel coordinators choose our managed fleet to support visiting leadership teams, VIP guests and regional business itineraries. Every booking operates under centralised management to maintain consistent transport quality across central Saudi Arabia.",
    heroImageAlt: "Al Qassim skyline with date palms and contemporary architecture",
    description:
      "Airport Code: ELQ. Operational Status: Central Agricultural and Commercial Hub. Reliable corporate transportation connecting regional food production leadership, university forums and trade centres with the central capital.",
    fleetEyebrow: "The Al Qassim fleet",
    fleetHeading: "Choose your chauffeur service Al Qassim class",
    fleetSubheading:
      "Vehicles for Al Qassim are dispatched from the nearest office, AB Riyadh (headquarters) [Confirm nearest office]. Each executive vehicle category delivers immaculate safety and comfort for business travel, delegations and local transfers.",
    vehicles: [
      {
        category: "Standard Sedan",
        specLine: "Sedan · 3 guests · 2 bags",
        model: "Typical model: Toyota Camry or similar [Confirm]",
        idealFor: "Ideal for: executive city journeys in comfort",
        capacity: "3 guests",
        bags: "2 bags",
        description:
          "This class provides efficient point to point travel for corporate executives navigating city meetings. Professional drivers maintain immaculate standards, making everyday business commuting straightforward and comfortable.",
        imageIndex: 2,
        imageAlt: "Standard sedan executive car in Al Qassim",
      },
      {
        category: "Business Sedan",
        specLine: "Sedan · 3 guests · 2 bags",
        model: "Typical model: Mercedes E Class or similar [Confirm]",
        idealFor: "Ideal for: corporate travel and business meetings",
        capacity: "3 guests",
        bags: "2 bags",
        description:
          "Business class vehicles deliver refined interiors and quiet rides across Al Qassim business districts. Working passengers can review briefing documents or conduct calls between regional appointments with complete privacy.",
        imageIndex: 3,
        imageAlt: "Business sedan vehicle serving Al Qassim corporate travellers",
      },
      {
        category: "First Class Sedan",
        specLine: "Flagship sedan · 3 guests · 2 bags",
        model: "Typical model: Mercedes S Class or similar [Confirm]",
        idealFor: "Ideal for: VIP transport and dignitary arrivals",
        capacity: "3 guests",
        bags: "2 bags",
        description:
          "Our premier saloon offers unmatched sophistication for high profile guests travelling in Al Qassim. Handcrafted leather seating, acoustic glass and refined climate controls create a tranquil haven after commercial flights.",
        imageIndex: 4,
        imageAlt: "First class sedan luxury car in Al Qassim",
      },
      {
        category: "Executive SUV",
        specLine: "SUV · 6 guests · 5 bags",
        model: "Typical model: Cadillac Escalade, GMC Yukon or similar [Confirm]",
        idealFor: "Ideal for: delegation travel and executive comfort",
        capacity: "6 guests",
        bags: "5 bags",
        description:
          "Commanding SUVs supply substantial cabin space and generous luggage volume across Al Qassim routes. Delegations value the elevated ride height and generous legroom during longer journeys between regional centres.",
        imageIndex: 5,
        imageAlt: "Executive SUV transport across Al Qassim province",
      },
      {
        category: "Premium MPV",
        specLine: "MPV · 6 guests · 5 bags",
        model: "Typical model: Mercedes V Class or similar [Confirm]",
        idealFor: "Ideal for: mobile workspace and group itineraries",
        capacity: "6 guests",
        bags: "5 bags",
        description:
          "Configured with adaptable conference seating, this spacious vehicle serves executive teams requiring collaborative travel. Built in power outlets and quiet cabin dynamics allow uninterrupted productivity on the move.",
        imageIndex: 6,
        imageAlt: "Premium MPV people carrier in Al Qassim",
      },
      {
        category: "Executive Van",
        specLine: "Van · 14 guests · 10 bags",
        model: "Typical model: Mercedes Sprinter or similar [Confirm]",
        idealFor: "Ideal for: larger group and event transport",
        capacity: "14 guests",
        bags: "10 bags",
        description:
          "This vehicle provides coordinated group logistics for corporate conferences and regional event teams. Forward facing leather seats and wide aisles ensure all passengers travel comfortably together with their baggage.",
        imageIndex: 7,
        imageAlt: "Executive van for corporate group transfers in Al Qassim",
      },
    ],
    journeysEyebrow: "Popular journeys",
    journeysHeading: "Across Al Qassim and beyond",
    journeysDescription:
      "AB supports punctual transfers connecting major transit hubs, commercial centres and industrial facilities. Each fixed route provides transparent planning for travel managers coordinating regional executive schedules.",
    journeys: [
      {
        tag: "Airport transfer",
        title: "ELQ to Buraydah",
        priceText: "From [SAR price]",
      },
      {
        tag: "Airport transfer",
        title: "ELQ to Unaizah",
        priceText: "From [SAR price]",
      },
      {
        tag: "City",
        title: "Buraydah to Unaizah",
        priceText: "From [SAR price]",
      },
      {
        tag: "Intercity",
        title: "Al Qassim to Ar Rass",
        priceText: "From [SAR price] · [Confirm] hours",
      },
      {
        tag: "Intercity",
        title: "Buraydah to Riyadh",
        priceText: "From [SAR price] · [Confirm] hours",
        href: "/locations/saudi-arabia/al-qasim/routes/al-qasim-to-riyadh",
      },
    ],
    servicesEyebrow: "Services in Al Qassim",
    servicesHeading: "One partner for every movement in Al Qassim",
    servicesDescription:
      "AB coordinates comprehensive executive mobility solutions designed to support corporate delegations, VIP guests and private travel requirements across the region.",
    services: [
      {
        title: "Chauffeur & VIP",
        description: "Chauffeur & VIP private driver solutions tailored for executive road itineraries",
        href: "/services/chauffeur-service",
        icon: "Crown",
      },
      {
        title: "Airport Transfers",
        description: "Airport Transfers providing terminal meet and greet coordination at regional airports",
        href: "/services/airport-transfers",
        icon: "Plane",
      },
      {
        title: "Bus & Coach Hire arranged in Al Qassim",
        description: "Bus & Coach Hire arranged in Al Qassim for corporate groups and major events",
        href: "/services/event-transport",
        icon: "Users",
      },
    ],
    airportInfo: {
      eyebrow: "Airport transfers",
      heading: "Arriving at Prince Naif bin Abdulaziz International Airport (ELQ)",
      description:
        "Landing at Prince Naif bin Abdulaziz International Airport (ELQ) connects corporate visitors directly with the agricultural and commercial centre of the Kingdom. Your professional chauffeur monitors incoming flights using automated flight tracking systems, adjusting pickup timings to accommodate runway schedule shifts.\n\nUpon clearing customs, guests receive an executive meet and greet service from our uniformed driver holding a customised name board. The driver assists with all luggage before escorting passengers to their preconditioned vehicle parked at Meeting point [Confirm]. Travellers benefit from Free waiting time [Confirm], supporting seamless transitions for business travel, corporate travel and VIP transport.",
      bullets: [
        { heading: "Flight tracking", description: "Every arrival" },
        { heading: "Meet and greet", description: "Inside the terminal" },
        { heading: "ELQ to Buraydah", description: "[Confirm] minutes" },
      ],
    },
    coverageEyebrow: "Coverage",
    coverageHeading: "Where we work in Al Qassim",
    coverageDescription:
      "Our chauffeur operations extend throughout Buraydah, Unaizah and surrounding commercial zones. Chauffeurs possess extensive route familiarity across municipal headquarters, hospitality venues, industrial estates and cultural centres.",
    coverageGroups: [
      {
        category: "Business",
        places:
          "King Abdulaziz Road (Buraydah commercial offices and banks) · Al Nakheel district (Buraydah retail and business parks) · Unaizah Commerce (Corporate hubs and regional offices)",
        icon: "Briefcase",
      },
      {
        category: "Events",
        places:
          "King Khalid Centre (Conferences and civic auditorium) · Date Festival Grounds (Seasonal trade pavilions in Buraydah) · Unaizah Village (Heritage cultural exhibition grounds)",
        icon: "Users",
      },
      {
        category: "Heritage",
        places:
          "Al Bassam House (Preserved heritage landmark in Unaizah) · Souq Al Masokaf (Historic market and artisan alleys) · Al Othaim Park (Urban green parkland in Buraydah)",
        icon: "Crown",
      },
      {
        category: "Government",
        places:
          "Qassim Governorate (Provincial administrative headquarters) · Buraydah Modon (Industrial city logistics district) · Qassim Chamber (Trade authority and council hall)",
        icon: "Shield",
      },
    ],
    coverageImage: "/locations/www.ab.limo-locations-saudi-arabia-al-qasim-images/image8.jpg",
    coverageImageAlt: "Al Qassim commercial district along King Abdulaziz Road in Buraydah",
    officeEyebrow: "Our office",
    officeHeading: "AB chauffeur service Al Qassim operations",
    officeDescription:
      "Regional journeys across Al Qassim are managed through central dispatch to ensure strict operational compliance, safety oversight and vehicle cleanliness. Our operational coordinators monitor every route around the clock, providing real time driver tracking and rapid dispatch support.",
    officeTitle: "AB Riyadh, headquarters [Confirm nearest office]",
    officeAddress:
      "Building 3036, Office 08, 2nd Floor, Umar Ibn Abdulaziz Road, Al Malaz, Riyadh, Saudi Arabia",
    officePhone: "+966 58 111 8720",
    faqEyebrow: "Questions",
    faqHeading: "Chauffeur service in Al Qassim: your questions",
    faqs: [
      {
        q: "What does an ELQ airport transfer include?",
        a: "An ELQ airport transfer includes flight tracking for your arrival at Prince Naif bin Abdulaziz International Airport (ELQ), terminal meet and greet, luggage assistance and private transport to your Buraydah or Unaizah destination. The driver monitors schedule changes directly to accommodate altered arrival times without administrative complications.",
      },
      {
        q: "Can I hire a private driver Al Qassim for a full day?",
        a: "Yes, AB provides hourly chauffeur and full day hire options across Buraydah, Unaizah and surrounding areas. This flexible service suits corporate leaders attending multiple business meetings, allowing your private driver Al Qassim to remain dedicated to your schedule throughout the day.",
      },
      {
        q: "Are chauffeur vehicles licensed and insured across Al Qassim?",
        a: "All AB vehicles operating in Al Qassim carry comprehensive commercial passenger insurance and full regulatory registration. Professional drivers undergo thorough vetting and rigorous safety training, upholding passenger safety and discretion on every journey across the region.",
      },
      {
        q: "How are intercity transfers from Al Qassim booked?",
        a: "Intercity transfer Al Qassim bookings can be scheduled in advance through our 24/7 central dispatch team. Our long distance service provides private point to point transit between Al Qassim, Riyadh, Ar Rass and adjacent regions in climate controlled comfort.",
      },
      {
        q: "How far in advance should I arrange a chauffeur in Al Qassim?",
        a: "We recommend booking your chauffeur service in Al Qassim at least 24 hours prior to departure to secure your preferred vehicle class. For urgent requirements or same day flights into ELQ, contact our dispatch operations directly for rapid vehicle allocation.",
      },
    ],
    ctaHeading: "Your chauffeur is ready in Al Qassim.",
    ctaDescription:
      "Arrange your executive chauffeur service Al Qassim booking with 24/7 central dispatch on +966 58 111 8720 for punctual corporate transfers.",
    ctaSubheading: "Reserve executive ground transportation",
    ctaSubdescription:
      "Connect with our central dispatch desk to coordinate individual transfers or complete delegation transport fleets.",
  },

  "al-ula": {
    slug: "al-ula",
    name: "Al Ula",
    displayName: "AlUla",
    imageFolder: "www.ab.limo-locations-saudi-arabia-al-ula-images",
    heroTitle: "Chauffeur service in AlUla",
    heroDescription:
      "Professional chauffeur service AlUla connects visitors seamlessly across the historic valley. Arriving travellers at Prince Abdulmajeed bin Abdulaziz International Airport (ULH) receive dedicated assistance directly to hotels, heritage venues and desert resorts across AlUla.\n\nCoordinated ground travel supports executive schedules, cultural exploration and private delegations. AB manages local itineraries through experienced drivers and clean luxury vehicles tailored to the regional landscape.",
    heroImageAlt: "AlUla skyline sandstone formations and historic valley at dusk",
    description:
      "Airport Code: ULH. Operational Status: Heritage and Event Coverage. High specification executive SUVs and premium sedans operating across luxury resort developments, global cultural summits and desert conference destinations.",
    fleetEyebrow: "The AlUla fleet",
    fleetHeading: "Choose your AlUla chauffeur class",
    fleetSubheading:
      "Every vehicle in our AlUla fleet is GPS tracked and detailed before each journey. AB maintains immaculate standards across every vehicle category for comfort in the desert climate.",
    vehicles: [
      {
        category: "Standard Sedan",
        specLine: "Sedan · 3 guests · 2 bags",
        model: "Typical model: Toyota Avalon or similar [Confirm]",
        idealFor: "Ideal for: Efficient private business transfers",
        capacity: "3 guests",
        bags: "2 bags",
        description:
          "A comfortable, climate controlled choice for individual business visitors moving between scheduled hotel appointments and regional corporate sites across AlUla.",
        imageIndex: 2,
        imageAlt: "Standard Sedan luxury chauffeur service AlUla",
      },
      {
        category: "Business Sedan",
        specLine: "Sedan · 3 guests · 2 bags",
        model: "Typical model: Mercedes E Class or similar [Confirm]",
        idealFor: "Ideal for: Corporate meetings and executives",
        capacity: "3 guests",
        bags: "2 bags",
        description:
          "Refined executive travel delivering quiet comfort, rear seat climate adjustment and discreet driving for professional agendas throughout the AlUla region.",
        imageIndex: 3,
        imageAlt: "Business Sedan chauffeur transport in AlUla",
      },
      {
        category: "First Class Sedan",
        specLine: "Flagship sedan · 3 guests · 2 bags",
        model: "Typical model: Mercedes S Class or similar [Confirm]",
        idealFor: "Ideal for: VIP hospitality and protocol",
        capacity: "3 guests",
        bags: "2 bags",
        description:
          "The flagship choice for state visits, dignitaries and luxury guests demanding superior sound insulation, acoustic privacy and smooth ride dynamics in AlUla.",
        imageIndex: 4,
        imageAlt: "First Class Sedan Mercedes S Class in AlUla",
      },
      {
        category: "Executive SUV",
        specLine: "SUV · 6 guests · 5 bags",
        model: "Typical model: Cadillac Escalade, GMC Yukon or similar [Confirm]",
        idealFor: "Ideal for: Spacious travel across desert",
        capacity: "6 guests",
        bags: "5 bags",
        description:
          "Generous cabin proportions with elevated road visibility and superior luggage storage, built to handle longer desert itineraries comfortably.",
        imageIndex: 5,
        imageAlt: "Executive SUV Cadillac Escalade chauffeur service AlUla",
      },
      {
        category: "Premium MPV",
        specLine: "MPV · 6 guests · 5 bags",
        model: "Typical model: Mercedes V Class or similar [Confirm]",
        idealFor: "Ideal for: Family groups and small teams",
        capacity: "6 guests",
        bags: "5 bags",
        description:
          "Conference seating options and ample luggage capacity make this luxury MPV the premier choice for delegation groups and extended touring parties.",
        imageIndex: 6,
        imageAlt: "Premium MPV Mercedes V Class chauffeur in AlUla",
      },
      {
        category: "Executive Van",
        specLine: "Van · 14 guests · 10 bags",
        model: "Typical model: Mercedes Sprinter or similar [Confirm]",
        idealFor: "Ideal for: Event crews and delegacy transport",
        capacity: "14 guests",
        bags: "10 bags",
        description:
          "Spacious high ceiling transport designed for event production staff, touring delegations and group transfers operating across diverse project sites.",
        imageIndex: 7,
        imageAlt: "Executive Van event transportation in AlUla",
      },
    ],
    journeysEyebrow: "Popular journeys",
    journeysHeading: "Across AlUla and beyond",
    journeysDescription:
      "AB coordinates point to point transit, historical sightseeing and intercity transfers connecting north western hubs across Saudi Arabia.",
    journeys: [
      {
        tag: "Airport transfer",
        title: "ULH to AlUla Old Town",
        description: "Direct transfer from the airport terminal to heritage hotels and cultural districts.",
        priceText: "From [SAR price]",
      },
      {
        tag: "Airport transfer",
        title: "ULH to Hegra",
        description: "Private airport reception directly onward to the UNESCO World Heritage visitor gates.",
        priceText: "From [SAR price]",
      },
      {
        tag: "City",
        title: "AlUla to Maraya",
        description: "Luxury evening transport to the concert hall and exhibition grounds in Ashar Valley.",
        priceText: "From [SAR price]",
      },
      {
        tag: "Intercity",
        title: "AlUla to Madinah",
        description: "Long distance highway transfer connecting the heritage valley with the holy city.",
        priceText: "From [SAR price] · [Confirm] hours",
        href: "/locations/saudi-arabia/al-ula/routes/al-ula-to-medina",
      },
      {
        tag: "Intercity",
        title: "AlUla to Tabuk",
        description: "Northern corridor executive transfer serving corporate and government itineraries.",
        priceText: "From [SAR price] · [Confirm] hours",
      },
      {
        tag: "Intercity",
        title: "AlUla to Hegra and heritage sites [Confirm]",
        description: "Full day historical circuit covering primary archaeological landmarks across the region.",
        priceText: "From [SAR price] · [Confirm] hours",
      },
    ],
    servicesEyebrow: "Services in AlUla",
    servicesHeading: "One partner for every movement in AlUla",
    servicesDescription:
      "AB coordinates ground fleet operations for corporate travellers, production organisers and international touring partners across the entire valley.",
    services: [
      {
        title: "Chauffeur & VIP in AlUla",
        description: "Book managed protocol travel through Chauffeur & VIP in AlUla.",
        href: "/services/chauffeur-service",
        icon: "Crown",
      },
      {
        title: "Event Transportation in AlUla",
        description: "Organise festival and production fleets through Event Transportation in AlUla.",
        href: "/services/event-transport",
        icon: "Users",
      },
      {
        title: "Tourism Transportation in AlUla",
        description: "Coordinate heritage site excursions through Tourism Transportation in AlUla.",
        href: "/services/chauffeur-service",
        icon: "Map",
      },
    ],
    airportInfo: {
      eyebrow: "Airport transfers",
      heading: "Arriving at Prince Abdulmajeed bin Abdulaziz International Airport (ULH)",
      description:
        "Arriving at Prince Abdulmajeed bin Abdulaziz International Airport (ULH) is straightforward with arranged chauffeur reception. AB monitors regional and international flights so pickup schedules match real arrival times. Your dedicated driver waits inside the arrivals area holding a personalized digital name board. Chauffeurs assist with luggage transfer before escorting passengers to their air-conditioned vehicle. Collection happens at the terminal meeting point [Confirm]. The ULH airport transfer service includes a free waiting time [Confirm] to allow comfortable customs clearance and baggage collection.",
      bullets: [
        { heading: "Flight tracking", description: "Every arrival" },
        { heading: "Meet and greet", description: "Inside the terminal" },
        { heading: "ULH to AlUla Old Town", description: "[Confirm] minutes" },
      ],
    },
    coverageEyebrow: "Coverage",
    coverageHeading: "Where we work in AlUla",
    coverageDescription:
      "AB maintains extensive operational reach throughout the oasis valley, supporting cultural institutions, hospitality resorts, commercial hubs and government projects. Professional drivers navigate remote canyon locations, desert pavilions and historic districts with complete route familiarity.",
    coverageGroups: [
      {
        category: "Business",
        places: "Royal Commission for AlUla Headquarters · AlUla Innovation Hub · Ashar Commercial Centre",
        icon: "Briefcase",
      },
      {
        category: "Events and conferences",
        places: "Maraya Concert Hall · Ashar Valley Conference Pavilion · AlUla Cultural Oasis Venues",
        icon: "Users",
      },
      {
        category: "Heritage and leisure",
        places: "Hegra Archaeological Site · AlUla Old Town · Dadan and Jabal Ikmah",
        icon: "Crown",
      },
      {
        category: "Government or Industry",
        places:
          "AlUla Governorate Offices · Prince Abdulmajeed bin Abdulaziz International Airport (ULH) Logistics Area · Ashar Valley Project Development Zone",
        icon: "Shield",
      },
    ],
    officeEyebrow: "Our office",
    officeHeading: "Centrally managed operations serving AlUla",
    officeDescription:
      "AB coordinates ground transport across AlUla through active fleet deployment directed by central regional operations. Our 24/7 central dispatch tracks vehicle statuses continuously, providing seamless chauffeur coordination without requiring a physical customer office locally.",
    officeTitle: "AB Riyadh, headquarters and 24/7 dispatch [Confirm nearest office]",
    officeAddress:
      "Building 3036, Office 08, 2nd Floor, Umar Ibn Abdulaziz Road, Al Malaz, Riyadh, Saudi Arabia",
    officePhone: "+966 58 111 8720",
    faqEyebrow: "Questions",
    faqHeading: "Chauffeur service in AlUla: your questions",
    faqs: [
      {
        q: "What is included in the chauffeur service AlUla?",
        a: "Chauffeur service in AlUla includes a professional driver, a sanitised luxury vehicle with GPS tracking, bottled water, and comprehensive passenger insurance. Services accommodate point to point journeys, hourly bookings, or multi day event coordination across the valley. Detailed inclusions for custom itineraries are confirmed during quotation.",
      },
      {
        q: "How does ULH airport transfer meet and greet work?",
        a: "When arriving at Prince Abdulmajeed bin Abdulaziz International Airport (ULH), your chauffeur tracks your flight status and greets you inside the terminal with an identification name board. Chauffeurs assist with your baggage and escort you to the awaiting vehicle. Standard complimentary wait times apply for international and domestic arrivals [Confirm: wait time].",
      },
      {
        q: "Can I hire a private driver AlUla for full day heritage tours?",
        a: "Yes, private driver AlUla hire is available on an hourly or full day basis for touring sites such as Hegra, Dadan, and Elephant Rock. Dedicated drivers remain on standby throughout your visits, following your personal schedule. Daily packages provide flexible tour transport AlUla without transport delays between archaeological landmarks.",
      },
      {
        q: "Does AB provide intercity transfer AlUla to other cities?",
        a: "AB provides comfortable intercity transfers connecting AlUla with Madinah, Tabuk, and surrounding regional destinations. Long distance journeys utilise premium sedans and spacious SUVs driven by experienced highway chauffeurs. Travel durations, vehicle specifications, and scheduled rest stops are arranged during booking confirmation.",
      },
      {
        q: "Are vehicles and drivers in AlUla fully licensed and insured?",
        a: "Every vehicle in the AB fleet complies with Saudi transport regulations, maintaining full passenger insurance and rigorous safety inspections. Drivers hold valid commercial chauffeur permits and complete defensive driving training for regional road conditions. Fleet operations are monitored continuously by our Riyadh dispatch team.",
      },
      {
        q: "Can AB coordinate event transportation AlUla for large groups?",
        a: "AB manages large scale event transportation AlUla for festivals, exhibitions, corporate conferences, and private cultural gatherings. Group transportation integrates executive vans, premium MPVs, and luxury sedans under unified dispatch control. Dedicated coordinators oversee flight arrivals, VIP escorts, and site shuttles throughout your schedule.",
      },
      {
        q: "How far in advance should I book limousine service AlUla?",
        a: "We advise reserving limousine service AlUla in advance, especially during winter festival seasons and major concert periods. While dispatch accommodates short notice requests subject to availability, advance reservations secure your preferred vehicle class. Bookings can be confirmed directly online or through our central operations centre.",
      },
    ],
    ctaHeading: "Your chauffeur is ready in AlUla.",
    ctaDescription:
      "Secure executive ground transport and private driver services tailored to your itinerary. Reserve professional chauffeur service AlUla today by contacting 24/7 central dispatch at +966 58 111 8720.",
    ctaSubheading: "Reserve your private transport",
    ctaSubdescription:
      "Confirm individual vehicle transfers or complete event fleet coordination across Saudi Arabia.",
  },


  dammam: {
    slug: "dammam",
    name: "Dammam",
    displayName: "Dammam",
    imageFolder: "www.ab.limo-locations-saudi-arabia-dammam-images",
    heroTitle: "Chauffeur service in Dammam",
    heroDescription:
      "AB provides dedicated chauffeur service Dammam for corporate executives, official delegations, and private travellers arriving through King Fahd International Airport (DMM).\n\nExperienced drivers manage every itinerary across Dammam with punctual scheduling, premium vehicles, and complete route support for eastern regional commerce.",
    heroImageAlt: "Dammam skyline along the Arabian Gulf coastal roadway",
    description:
      "Airport Code: DMM. Operational Status: Eastern Province Operations. Dedicated regional vehicle fleet serving global energy headquarters, petrochemical complexes, maritime logistics ports and corporate campuses.",
    fleetEyebrow: "The Dammam fleet",
    fleetHeading: "Choose your vehicle for chauffeur service Dammam",
    fleetSubheading:
      "Every vehicle in our Dammam fleet is GPS tracked and detailed before each journey. Select from refined saloons, spacious sport utility vehicles, and executive passenger vans configured for regional business travel.",
    vehicles: [
      {
        category: "Standard Sedan",
        specLine: "Sedan · 3 guests · 2 bags",
        model: "Typical model: Toyota Camry or similar [Confirm]",
        idealFor: "Ideal for: Daily corporate travel and transfers",
        capacity: "3 guests",
        bags: "2 bags",
        description:
          "The standard sedan provides quiet, comfortable city transport across Dammam for individual professionals. Spotless interiors, climate control, and route navigation support efficient travel between local offices, central hotels, and meeting appointments.",
        imageIndex: 2,
        imageAlt: "Standard sedan executive car in Dammam",
      },
      {
        category: "Business Sedan",
        specLine: "Sedan · 3 guests · 2 bags",
        model: "Typical model: Mercedes Benz E Class or similar [Confirm]",
        idealFor: "Ideal for: Executive commutes and partner meetings",
        capacity: "3 guests",
        bags: "2 bags",
        description:
          "Business sedans combine refined acoustics with leather seating for executive travellers in Dammam. Quiet cabins allow passengers to conduct confidential calls, review presentation files, and unwind between corporate commitments throughout the metropolitan district.",
        imageIndex: 3,
        imageAlt: "Business sedan chauffeur service Dammam",
      },
      {
        category: "First Class Sedan",
        specLine: "Flagship sedan · 3 guests · 2 bags",
        model: "Typical model: Mercedes Benz S Class or similar [Confirm]",
        idealFor: "Ideal for: Senior executives and VIP transport",
        capacity: "3 guests",
        bags: "2 bags",
        description:
          "The flagship saloon represents exceptional prestige for visiting board members and VIP delegations. First class amenities include generous legroom, rear climate settings, and privacy blinds for discreet travel across the eastern commercial capital.",
        imageIndex: 4,
        imageAlt: "First class luxury car chauffeur in Dammam",
      },
      {
        category: "Executive SUV",
        specLine: "SUV · 6 guests · 5 bags",
        model: "Typical model: GMC Yukon or Cadillac Escalade or similar [Confirm]",
        idealFor: "Ideal for: Management delegations and extra luggage",
        capacity: "6 guests",
        bags: "5 bags",
        description:
          "Executive sport utility vehicles deliver elevated road commanding views and ample luggage space for visiting project teams in Dammam. The spacious cabin accommodates regional industrial tours and group transfers across coastal oil and gas hubs.",
        imageIndex: 5,
        imageAlt: "Executive SUV private driver vehicle in Dammam",
      },
      {
        category: "Premium MPV",
        specLine: "MPV · 6 guests · 5 bags",
        model: "Typical model: Mercedes Benz V Class or similar [Confirm]",
        idealFor: "Ideal for: Mobile meetings and family delegations",
        capacity: "6 guests",
        bags: "5 bags",
        description:
          "Premium multi purpose vehicles offer versatile seating configurations with conference style arrangements. Passengers can conduct mobile discussions or travel comfortably with personal luggage between corporate hubs, shopping districts, and coastal hospitality resorts.",
        imageIndex: 6,
        imageAlt: "Premium MPV limousine service Dammam",
      },
      {
        category: "Executive Van",
        specLine: "Van · 14 guests · 10 bags",
        model: "Typical model: Mercedes Benz Sprinter or similar [Confirm]",
        idealFor: "Ideal for: Coordinated group and event transport",
        capacity: "14 guests",
        bags: "10 bags",
        description:
          "Executive vans provide coordinated group transport for conferences, site inspections, and corporate events across Dammam and Dhahran. Generous head height, comfortable seating, and dedicated luggage space accommodate larger delegations with complete logistical efficiency.",
        imageIndex: 7,
        imageAlt: "Executive passenger van bus rental Dammam",
      },
    ],
    journeysEyebrow: "Popular journeys",
    journeysHeading: "Across Dammam and beyond",
    journeysDescription:
      "Travellers departing King Fahd International Airport (DMM) access transparent regional transit across commercial corridors in the Eastern Province. Each private itinerary provides direct terminal departures, professional route planning, and dedicated vehicle deployment.",
    journeys: [
      {
        tag: "Airport transfer",
        title: "DMM to Dammam Corniche",
        description:
          "Direct transit connecting the international arrivals terminal to coastal business hotels and seaside corporate offices.",
        priceText: "From [Confirm: SAR price]",
      },
      {
        tag: "Airport transfer",
        title: "DMM to Dhahran",
        description:
          "Reliable transfers to global energy headquarters, technical academic complexes, and conference exhibition centres.",
        priceText: "From [Confirm: SAR price]",
      },
      {
        tag: "City",
        title: "Dammam to Al Khobar",
        description:
          "Executive city transfers connecting core financial districts, commercial banks, and regional shopping destinations.",
        priceText: "From [Confirm: SAR price]",
        href: "/locations/saudi-arabia/dammam/routes/dammam-to-al-khobar",
      },
      {
        tag: "Intercity",
        title: "Dammam to Riyadh",
        description:
          "Intercity transfer Dammam connection linking Eastern Province corporate hubs directly to ministries and national headquarters in Riyadh.",
        priceText: "From [Confirm: SAR price] · [Confirm] hours",
        href: "/locations/saudi-arabia/dammam/routes/dammam-to-riyadh",
      },
      {
        tag: "Intercity",
        title: "Dammam to Jubail",
        description:
          "Scheduled highway transfers connecting urban Dammam to key manufacturing facilities in Jubail Industrial City.",
        priceText: "From [Confirm: SAR price] · [Confirm] hours",
      },
      {
        tag: "Intercity",
        title: "Dammam to Bahrain via the King Fahd Causeway [Confirm cross border service]",
        description:
          "Cross border corporate transit supporting regional travel between Saudi eastern commercial offices and Manama business districts.",
        priceText: "From [Confirm: SAR price] · [Confirm] hours",
        href: "/locations/saudi-arabia/dammam/routes/dammam-to-manama",
      },
    ],
    servicesEyebrow: "Services in Dammam",
    servicesHeading: "One partner for every movement in Dammam",
    servicesDescription:
      "AB provides integrated ground mobility solutions across the Eastern Province to satisfy executive travel requirements with complete professionalism.",
    services: [
      {
        title: "Chauffeur & VIP in Dammam",
        description: "Chauffeur & VIP in Dammam",
        href: "/services/chauffeur-service",
        icon: "Crown",
      },
      {
        title: "Airport Transfers in Dammam",
        description: "Airport Transfers in Dammam",
        href: "/services/airport-transfers",
        icon: "Plane",
      },
      {
        title: "Corporate Transportation in Dammam",
        description: "Corporate Transportation in Dammam",
        href: "/services/corporate-transport",
        icon: "Briefcase",
      },
      {
        title: "Bus & Coach Hire in Dammam",
        description: "Bus & Coach Hire in Dammam",
        href: "/services/event-transport",
        icon: "Users",
      },
    ],
    airportInfo: {
      eyebrow: "Airport transfers",
      heading: "Arriving at King Fahd International Airport (DMM)",
      description:
        "Arriving at King Fahd International Airport (DMM) connects passengers directly to the industrial heartland of Saudi Arabia. Operations dispatch monitors every incoming flight schedule through active flight tracking, automatically adjusting chauffeur arrival times for early landings or flight delays. Upon clearance through customs, your professional chauffeur welcomes you with an executive meet and greet service holding an official name board at the designated terminal meeting point [Confirm]. Travellers enjoy complimentary free waiting time [Confirm] after flight arrival, providing relaxed passage through baggage claim. Schedule your direct private terminal pickup through King Fahd International Airport for seamless transfers across Dammam.\n\nCoordinated airport transit eliminates unnecessary roadside delays for corporate teams arriving on international or domestic connections. Chauffeurs assist with luggage transfer directly from terminal trolleys to the vehicle boot before navigating preferred routes toward metropolitan Dammam. Real time traffic monitoring by our operations team supports smooth transit along airport expressways during morning and evening rush hours.",
      bullets: [
        { heading: "Flight tracking", description: "Every arrival" },
        { heading: "Meet and greet", description: "Inside the terminal" },
        { heading: "DMM to Dammam Corniche", description: "[Confirm] minutes" },
      ],
    },
    coverageEyebrow: "Coverage",
    coverageHeading: "Where we work in Dammam",
    coverageDescription:
      "AB coordinates executive ground travel across major commercial, governmental, and industrial zones in Dammam. Professional chauffeurs navigate core corporate centres, transport hubs, and leisure destinations throughout the metropolitan area with punctuality. Chauffeurs assist corporate managers travelling between regional headquarters and support operations across maritime terminals and manufacturing districts with comprehensive route knowledge.\n\nRegional transit networks connect central business districts with key industrial areas across the eastern coastline. Dedicated private drivers manage scheduled daily commutes between executive residences, corporate compounds, and governmental institutions. Complete route planning maintains seamless access across coastal expressways and municipal thoroughfares.",
    coverageGroups: [
      {
        category: "Business",
        places: "Al Shati, Al Faisaliyah, Dammam Central Business District.",
        icon: "Briefcase",
      },
      {
        category: "Events and conferences",
        places: "Dhahran Expo, King Fahd Park, Dammam Exhibition Centre.",
        icon: "Users",
      },
      {
        category: "Heritage and leisure",
        places: "Dammam Corniche, Murjan Island, Heritage Village Dammam.",
        icon: "Crown",
      },
      {
        category: "Government or Industry",
        places: "Dammam Second Industrial City, King Abdulaziz Port, First Industrial City Dammam.",
        icon: "Shield",
      },
    ],
    officeEyebrow: "Our office",
    officeHeading: "Operations supporting chauffeur service Dammam",
    officeDescription:
      "AB manages ground logistics across Dammam through centralised operations with round the clock fleet oversight. Dispatch controllers coordinate executive transfers, airport pickups, and regional intercity movements with dedicated chauffeur teams. The regional operations centre provides ongoing itinerary management, vehicle telemetry monitoring, and immediate passenger support for all travel bookings.\n\nEnterprise clients benefit from unified account administration, consolidated billing, and continuous dispatch supervision. Experienced transport managers assist with large event coordination, airport delegation arrivals, and VIP protocol planning throughout the Eastern Province.",
    officeTitle: "AB Riyadh, headquarters [Confirm nearest office]",
    officeAddress:
      "Building 3036, Office 08, 2nd Floor, Umar Ibn Abdulaziz Road, Al Malaz, Riyadh, Saudi Arabia",
    officePhone: "+966 58 111 8720",
    faqEyebrow: "Questions",
    faqHeading: "Chauffeur service in Dammam: your questions",
    faqs: [
      {
        q: "How do passengers book a chauffeur service in Dammam with AB?",
        a: "Clients reserve private transport online through our reservation portal or by contacting our 24/7 operations team directly. Specify pickup details, terminal coordinates, destination addresses, and preferred vehicle categories during reservation. Our dispatch office confirms bookings with complete driver details, vehicle registration numbers, and arrival times prior to pickup, supporting punctual execution across Dammam.",
      },
      {
        q: "What arrival procedure applies for airport transfers at DMM?",
        a: "Chauffeurs track inbound flight schedules into King Fahd International Airport (DMM) to accommodate flight adjustments automatically. Your driver greets arriving guests inside the terminal arrivals area holding a prominent name board at the designated meeting point [Confirm]. The transfer service includes complimentary free waiting time [Confirm], allowing passengers ample opportunity to collect baggage and proceed comfortably through customs.",
      },
      {
        q: "Are intercity transfers available from Dammam to other Saudi cities?",
        a: "AB delivers scheduled intercity transfers connecting Dammam to major commercial destinations including Riyadh, Jubail, and Al Khobar. Passengers travel in premium sedans or executive sport utility vehicles equipped with climate control, chilled bottled water, and mobile device charging points. Professional drivers manage highway routes with strict adherence to regional road safety standards and scheduled corporate itineraries.",
      },
      {
        q: "Does AB provide cross border chauffeur travel between Dammam and Bahrain?",
        a: "AB arranges cross border transfers connecting Dammam with the Kingdom of Bahrain across the King Fahd Causeway [Confirm cross border service]. Travel coordinators review passenger documentation and border processing protocols prior to departure. Private vehicles support relaxed transit for corporate executives visiting regional offices, industrial sites, or international connection hubs across the causeway corridor.",
      },
      {
        q: "Which vehicle classes are available for corporate transportation in Dammam?",
        a: "Our Dammam fleet features premium standard sedans, business saloons such as the Mercedes Benz E Class, and flagship vehicles like the Mercedes Benz S Class. Groups and corporate delegations can select spacious sport utility vehicles, Mercedes Benz V Class multi purpose vehicles, or executive passenger vans. Every vehicle maintains immaculate interior detailing, active telemetry, and comprehensive commercial passenger insurance coverage.",
      },
      {
        q: "Can clients book a private driver in Dammam on an hourly basis?",
        a: "Hourly chauffeur service and full day hire options provide maximum scheduling flexibility for visiting executives with multiple daily appointments. Your dedicated driver remains on standby throughout meetings, factory inspections, or conference events across Dammam and Dhahran. This on demand mobility model allows passengers to adjust routes dynamically without needing individual transfer bookings for separate journeys.",
      },
      {
        q: "What safety standards and licensing apply to chauffeur services in Dammam?",
        a: "All AB chauffeurs possess professional commercial driving licences and undergo comprehensive background vetting and defensive driving training. Every fleet vehicle undergoes regular mechanical inspections and carries valid commercial passenger insurance. Onboard satellite tracking connects each car directly to our 24/7 Riyadh operations centre, maintaining constant route oversight, schedule compliance, and rapid dispatch assistance throughout the Eastern Province.",
      },
    ],
    ctaHeading: "Your chauffeur is ready in Dammam.",
    ctaDescription:
      "Book your chauffeur service Dammam today or call our 24/7 Riyadh dispatch team at +966 58 111 8720 for corporate accounts and tailored itinerary planning.",
  },

  jeddah: {
    slug: "jeddah",
    name: "Jeddah",
    displayName: "Jeddah",
    imageFolder: "www.ab.limo-locations-saudi-arabia-jeddah-images",
    heroTitle: "Chauffeur Service in Jeddah",
    heroDescription:
      "AB provides executive chauffeur service Jeddah solutions connecting King Abdulaziz International Airport (JED) to commercial districts, luxury coastal resorts and major regional hubs. Every itinerary across Jeddah receives central flight tracking, licensed chauffeurs and continuous operational oversight from our central dispatch team.\n\nCorporate travellers, executive delegations and private clients rely on our immaculately prepared fleet for timely city transfers, full day hires and regional journeys along the Red Sea coast.",
    heroImageAlt: "Chauffeur service Jeddah luxury transport against the Jeddah coastal skyline",
    description:
      "Airport Code: JED. Operational Status: Commercial and Gateway Hub. Comprehensive executive ground transport serving Red Sea commercial ports, diplomatic consulates, luxury coastal resorts and pilgrimage transit routes.",
    fleetEyebrow: "The Jeddah fleet",
    fleetHeading: "Choose your Jeddah chauffeur class",
    fleetSubheading:
      "Every vehicle in our Jeddah fleet is GPS tracked and detailed before each journey. AB manages rigorous maintenance schedules, comprehensive commercial passenger insurance and vetted chauffeurs to support flawless itineraries across the Kingdom.",
    vehicles: [
      {
        category: "Standard Sedan",
        specLine: "Sedan · 3 guests · 2 bags",
        model: "Typical model: Toyota Avalon or similar [Confirm]",
        idealFor: "Ideal for everyday executive city travel",
        capacity: "3 guests",
        bags: "2 bags",
        description:
          "Comfortable standard saloon travel designed for individual business travellers and daily point to point transfers through central Jeddah corporate corridors.",
        imageIndex: 2,
        imageAlt: "Standard sedan chauffeur service Jeddah vehicle",
      },
      {
        category: "Business Sedan",
        specLine: "Sedan · 3 guests · 2 bags",
        model: "Typical model: Mercedes E Class, BMW 5 Series or similar [Confirm]",
        idealFor: "Ideal for corporate roadshows and executives",
        capacity: "3 guests",
        bags: "2 bags",
        description:
          "Premium business comfort offering quiet interiors, leather seating and device charging for visiting management teams moving across commercial Jeddah.",
        imageIndex: 3,
        imageAlt: "Business sedan private driver Jeddah vehicle",
      },
      {
        category: "First Class Sedan",
        specLine: "Flagship sedan · 3 guests · 2 bags",
        model: "Typical model: Mercedes S Class, BMW 7 Series or similar [Confirm]",
        idealFor: "Ideal for diplomatic and VIP hospitality",
        capacity: "3 guests",
        bags: "2 bags",
        description:
          "The premier tier of ground transport, delivering whisper quiet ride comfort and prestige for dignitaries attending high level summits in Jeddah.",
        imageIndex: 4,
        imageAlt: "First class luxury car limousine service Jeddah",
      },
      {
        category: "Executive SUV",
        specLine: "SUV · 6 guests · 5 bags",
        model: "Typical model: Cadillac Escalade, GMC Yukon or similar [Confirm]",
        idealFor: "Ideal for executive delegations and families",
        capacity: "6 guests",
        bags: "5 bags",
        description:
          "Commanding presence and generous cabin volume, providing ample luggage capacity for long journeys and delegations arriving through the international terminal.",
        imageIndex: 5,
        imageAlt: "Executive SUV chauffeur service in Jeddah",
      },
      {
        category: "Premium MPV",
        specLine: "MPV · 6 guests · 5 bags",
        model: "Typical model: Mercedes V Class or similar [Confirm]",
        idealFor: "Ideal for mobile meetings and conferences",
        capacity: "6 guests",
        bags: "5 bags",
        description:
          "Versatile face to face conference seating configurations that allow corporate teams to conduct productive working discussions between venues across the city.",
        imageIndex: 6,
        imageAlt: "Premium MPV private driver Jeddah group travel",
      },
      {
        category: "Executive Van",
        specLine: "Van · 14 guests · 10 bags",
        model: "Typical model: Mercedes Sprinter or similar [Confirm]",
        idealFor: "Ideal for large delegate group movements",
        capacity: "14 guests",
        bags: "10 bags",
        description:
          "Spacious group passenger charter for summit support, international sporting entourages and event personnel coordinating complex logistics across Jeddah.",
        imageIndex: 7,
        imageAlt: "Executive van passenger transport in Jeddah",
      },
    ],
    journeysEyebrow: "Popular journeys",
    journeysHeading: "Across Jeddah and beyond",
    journeysDescription:
      "AB coordinates seamless terminal pickups, city business transfers and scheduled long distance regional routes departing from the coastal city.",
    journeys: [
      {
        tag: "Airport transfer",
        title: "JED to Jeddah Corniche",
        description:
          "Direct transfer from King Abdulaziz International Airport (JED) to luxury hotels, resorts and commercial residences along the scenic waterfront boulevard.",
        priceText: "From [SAR price]",
      },
      {
        tag: "Airport transfer",
        title: "JED to Al Balad",
        description:
          "Executive transit from arrivals directly to the historic coral stone heritage quarter and vibrant southern commercial districts.",
        priceText: "From [SAR price]",
      },
      {
        tag: "City",
        title: "Jeddah to Jeddah Superdome",
        description:
          "Punctual venue access for large scale trade exhibitions, consumer expos and major international sporting entertainment events.",
        priceText: "From [SAR price]",
      },
      {
        tag: "Intercity",
        title: "Jeddah to Makkah",
        description:
          "Specialised pilgrimage and VIP transfer service operating along the direct expressway corridor to central religious hospitality properties.",
        priceText: "From [SAR price] · [Confirm] hours",
        href: "/locations/saudi-arabia/jeddah/routes/jeddah-to-mecca",
      },
      {
        tag: "Intercity",
        title: "Jeddah to Madinah",
        description:
          "Comfortable long distance highway transit connecting coastal corporate bases with religious sites and regional commercial centres.",
        priceText: "From [SAR price] · [Confirm] hours",
        href: "/locations/saudi-arabia/jeddah/routes/jeddah-to-medina",
      },
      {
        tag: "Intercity",
        title: "Jeddah to Taif",
        description:
          "Scenic regional transit climbing the Sarawat mountain range toward government facilities, agriculture centres and highland resorts.",
        priceText: "From [SAR price] · [Confirm] hours",
      },
      {
        tag: "Intercity",
        title: "Jeddah to King Abdullah Economic City",
        description:
          "Direct executive transport serving industrial port zones, corporate headquarters and coastal hospitality projects in KAEC.",
        priceText: "From [SAR price] · [Confirm] hours",
      },
    ],
    servicesEyebrow: "Services in Jeddah",
    servicesHeading: "One partner for every movement in Jeddah",
    servicesDescription:
      "AB delivers comprehensive ground transport programmes tailored for corporate organisations, government delegations, event planners and discerning private guests across Saudi Arabia.",
    services: [
      {
        title: "Chauffeur & VIP in Jeddah",
        description: "Chauffeur & VIP in Jeddah",
        href: "/services/chauffeur-service",
        icon: "Crown",
      },
      {
        title: "Airport Transfers in Jeddah",
        description: "Airport Transfers in Jeddah",
        href: "/services/airport-transfers",
        icon: "Plane",
      },
      {
        title: "Corporate Transportation in Jeddah",
        description: "Corporate Transportation in Jeddah",
        href: "/services/corporate-transport",
        icon: "Briefcase",
      },
      {
        title: "Event Transportation in Jeddah",
        description: "Event Transportation in Jeddah",
        href: "/services/event-transport",
        icon: "Users",
      },
      {
        title: "Bus & Coach Hire in Jeddah",
        description: "Bus & Coach Hire in Jeddah",
        href: "/services/event-transport",
        icon: "Shield",
      },
      {
        title: "Tourism Transportation in Jeddah",
        description: "Tourism Transportation in Jeddah",
        href: "/services/chauffeur-service",
        icon: "Map",
      },
    ],
    airportInfo: {
      eyebrow: "Airport transfers",
      heading: "Arriving at King Abdulaziz International Airport (JED)",
      description:
        "Navigating arrival at King Abdulaziz International Airport (JED) is straightforward with our managed meet and greet protocol. Chauffeurs monitor incoming flights through active commercial tracking systems, adjusting for schedule revisions or gate holds automatically. After clearing customs, guests find their uniformed chauffeur holding an AB branded name board at the designated terminal meeting point [Confirm]. Complimenting the service is free waiting time [Confirm], allowing unhurried baggage reclaim and smooth transition directly to your waiting vehicle outside the terminal doors.",
      bullets: [
        { heading: "Flight tracking", description: "Every arrival" },
        { heading: "Meet and greet", description: "Inside the terminal" },
        { heading: "JED to Jeddah Corniche", description: "[Confirm] minutes" },
      ],
    },
    coverageEyebrow: "Coverage",
    coverageHeading: "Where we work in Jeddah",
    coverageDescription:
      "AB provides licensed, GPS tracked vehicle coverage throughout all key commercial, industrial and cultural zones in metropolitan Jeddah. Our drivers navigate dense city streets, coastal avenues and major transport links with seasoned operational expertise.",
    coverageGroups: [
      {
        category: "Business",
        places: "Al Andalus District · Al Zahra District · Prince Sultan Street Corridor",
        icon: "Briefcase",
      },
      {
        category: "Events and conferences",
        places: "Jeddah Superdome · Jeddah Centre for Forums and Events · Jeddah Corniche Circuit",
        icon: "Users",
      },
      {
        category: "Heritage and leisure",
        places: "Al Balad Historic District · Jeddah Waterfront Corniche · Red Sea Mall",
        icon: "Crown",
      },
      {
        category: "Government or Industry",
        places: "Jeddah Islamic Port · Industrial City One · Al Ruwais Government District",
        icon: "Shield",
      },
    ],
    officeEyebrow: "Our office",
    officeHeading: "AB Ground Transportation Support for Jeddah",
    officeDescription:
      "AB delivers reliable chauffeur service Jeddah coverage coordinated directly through our central Riyadh operations centre and twenty four hour dispatch facility. Continuous real time monitoring and local fleet dispatch support executive movements throughout the Western Province without delay.",
    officeTitle: "AB Riyadh, headquarters and 24/7 dispatch [Confirm nearest office]",
    officeAddress:
      "Building 3036, Office 08, 2nd Floor, Umar Ibn Abdulaziz Road, Al Malaz, Riyadh, Saudi Arabia",
    officePhone: "+966 58 111 8720",
    faqEyebrow: "Questions",
    faqHeading: "Chauffeur service in Jeddah: your questions",
    faqs: [
      {
        q: "What is included in the chauffeur service Jeddah airport arrival package?",
        a: "Every arrival booked through AB at King Abdulaziz International Airport (JED) includes active flight tracking, inside terminal meet and greet with a personalised name board, luggage handling assistance and an agreed free waiting time [Confirm]. Chauffeurs guide guests directly to a climate controlled vehicle staged curbside.",
      },
      {
        q: "How does AB manage flight delays at JED airport?",
        a: "Our operations dispatch monitors commercial aviation telemetry in real time. Pickup schedules adjust automatically when incoming passenger flights experience delays or schedule modifications, allowing chauffeurs to coordinate terminal curb staging precisely when the flight arrives at JED.",
      },
      {
        q: "Which vehicle classes are available for corporate travel across Jeddah?",
        a: "Corporate clients can reserve Standard Sedans, Business Sedans such as the Mercedes E Class or similar [Confirm], First Class flagships including the Mercedes S Class or similar [Confirm], Executive SUVs like the Cadillac Escalade or GMC Yukon, Premium MPVs and multi passenger Executive Vans.",
      },
      {
        q: "Can I book an hourly chauffeur service in Jeddah for multiple meetings?",
        a: "Yes, AB provides flexible hourly and full day chauffeur hire across Jeddah. Chauffeurs remain on standby between commercial appointments, hotel visits and business roadshows, giving executive travellers uninterrupted mobility without the need to arrange separate on demand rides.",
      },
      {
        q: "Are intercity transfers available from Jeddah to Makkah, Madinah and Taif?",
        a: "AB provides licensed intercity private transfers departing from Jeddah to regional destinations including Makkah, Madinah, Taif and King Abdullah Economic City. Vehicles include water, high speed passenger connectivity and seasoned drivers familiar with regional Saudi highways.",
      },
      {
        q: "Are vehicles and chauffeurs in Jeddah fully licensed and insured?",
        a: "All fleet vehicles operating in Jeddah carry commercial transport licensing and full passenger liability insurance coverage in accordance with Saudi Arabian regulatory requirements. Chauffeurs complete rigorous security vetting, defensive driving protocols and customer etiquette training.",
      },
      {
        q: "How far in advance should I reserve private transport in Jeddah?",
        a: "While AB dispatch manages short notice bookings whenever capacity permits, booking in advance supports preferred vehicle availability during peak exhibition seasons, major religious holiday periods and international sporting events in Jeddah [Confirm: booking lead time].",
      },
    ],
    ctaHeading: "Your chauffeur is ready in Jeddah.",
    ctaDescription:
      "Experience reliable executive chauffeur service Jeddah support with twenty four hour dispatch, vetted professional drivers and premium vehicles across the Western Province. Contact our central operations desk at +966 58 111 8720 to confirm your transfer schedule.",
    ctaSubheading: "Reserve your Jeddah executive vehicle",
    ctaSubdescription:
      "Submit your travel schedule or request a bespoke corporate transport contract for upcoming corporate delegations and VIP events in Jeddah.",
  },

  jizan: {
    slug: "jizan",
    name: "Jizan",
    displayName: "Jizan",
    imageFolder: "www.ab.limo-locations-saudi-arabia-jizan-images",
    heroTitle: "Chauffeur Service in Jizan",
    heroDescription:
      "AB provides executive chauffeur service Jizan solutions designed for regional commerce and official delegations. Passengers travelling through King Abdullah bin Abdulaziz Airport (GIZ) receive direct terminal reception. Coordinated itineraries across Jizan maintain continuous operations for every scheduled appointment.",
    heroImageAlt: "Chauffeur service Jizan vehicles on coastal avenue",
    description:
      "Airport Code: GIZ. Operational Status: Southern Industrial and Port Hub. Executive ground fleet serving Jazan City for Primary and Downstream Industries, maritime ports and commercial shipping centers.",
    fleetEyebrow: "The Jizan fleet",
    fleetHeading: "Choose your Jizan chauffeur class",
    fleetSubheading:
      "Vehicles for Jizan are dispatched from the nearest office, AB Riyadh headquarters [Confirm nearest office]. Each executive vehicle maintains strict safety standards, complete commercial passenger insurance, and verified comfort appointments.",
    vehicles: [
      {
        category: "Standard Sedan",
        specLine: "Sedan · 3 guests · 2 bags",
        model: "Typical model: Toyota Camry or similar [Confirm]",
        idealFor: "Ideal for: Solo business journeys",
        capacity: "3 guests",
        bags: "2 bags",
        description:
          "This vehicle delivers efficient private driver Jizan transit for professionals needing dependable connections between local offices and regional work sites.",
        imageIndex: 2,
        imageAlt: "Standard Sedan chauffeur service Jizan",
      },
      {
        category: "Business Sedan",
        specLine: "Sedan · 3 guests · 2 bags",
        model: "Typical model: Mercedes E Class or similar [Confirm]",
        idealFor: "Ideal for: Corporate executive transit",
        capacity: "3 guests",
        bags: "2 bags",
        description:
          "Executive travellers obtain refined space, quiet cabin comfort, and reliable scheduling throughout urban destinations across Jizan.",
        imageIndex: 3,
        imageAlt: "Business Sedan chauffeur service Jizan",
      },
      {
        category: "First Class Sedan",
        specLine: "Flagship sedan · 3 guests · 2 bags",
        model: "Typical model: Mercedes S Class or similar [Confirm]",
        idealFor: "Ideal for: VIP and diplomatic delegations",
        capacity: "3 guests",
        bags: "2 bags",
        description:
          "Our flagship option provides distinguished appointments, exceptional acoustic control, and premier protocol standards for demanding VIP itineraries in the province.",
        imageIndex: 4,
        imageAlt: "First Class Sedan luxury transport in Jizan",
      },
      {
        category: "Executive SUV",
        specLine: "SUV · 6 guests · 5 bags",
        model: "Typical model: Cadillac Escalade, GMC Yukon or similar [Confirm]",
        idealFor: "Ideal for: Leadership teams and site visits",
        capacity: "6 guests",
        bags: "5 bags",
        description:
          "Spacious seating and luggage capacity suit visiting leadership teams monitoring industrial developments across Jizan and neighbouring regional facilities.",
        imageIndex: 5,
        imageAlt: "Executive SUV chauffeur service Jizan",
      },
      {
        category: "Premium MPV",
        specLine: "MPV · 6 guests · 5 bags",
        model: "Typical model: Mercedes V Class or similar [Confirm]",
        idealFor: "Ideal for: Small delegations requiring collaboration",
        capacity: "6 guests",
        bags: "5 bags",
        description:
          "Mobile workspace layouts permit visiting delegations to confer comfortably while moving between meetings across civic and commercial districts.",
        imageIndex: 6,
        imageAlt: "Premium MPV private driver Jizan",
      },
      {
        category: "Executive Van",
        specLine: "Van · 14 guests · 10 bags",
        model: "Typical model: Luxury Minibus or similar [Confirm]",
        idealFor: "Ideal for: Event crews and staff support",
        capacity: "14 guests",
        bags: "10 bags",
        description:
          "Generous passenger volume supports corporate event groups, crew logistics, and specialized event transport across southern Saudi Arabia.",
        imageIndex: 7,
        imageAlt: "Executive Van group transport in Jizan",
      },
    ],
    journeysEyebrow: "Popular journeys",
    journeysHeading: "Across Jizan and beyond",
    journeysDescription:
      "AB coordinates single transfers, full day hires, and regional road missions connecting air gateways, commercial nodes, and regional economic zones.",
    journeys: [
      {
        tag: "Airport transfer",
        title: "GIZ to Jizan Corniche",
        description:
          "Direct passenger connection from flight arrivals to coastal commercial hotels and corporate waterfront apartments.",
        priceText: "From [SAR price]",
      },
      {
        tag: "Airport transfer",
        title: "GIZ to Jazan Economic City",
        description:
          "Dedicated long transit serving engineers, operational specialists, and international executives visiting major industrial installations.",
        priceText: "From [SAR price]",
      },
      {
        tag: "City",
        title: "Jizan to Sabya",
        description:
          "Reliable metropolitan link connecting the core administrative capital with commercial businesses located in Sabya.",
        priceText: "From [SAR price]",
      },
      {
        tag: "Intercity",
        title: "Jizan to Abha [Confirm]",
        description:
          "Comfortable intercity transfer Jizan to the Asir mountain plateau for cross regional corporate travel.",
        priceText: "From [SAR price] · [Confirm] hours",
        href: "/locations/saudi-arabia/jizan/routes/jizan-to-abha",
      },
      {
        tag: "Intercity",
        title: "Jizan city to Jazan Economic City [Confirm]",
        description:
          "Point to point executive car service connecting metropolitan offices with manufacturing and port facilities.",
        priceText: "From [SAR price] · [Confirm] hours",
      },
    ],
    servicesEyebrow: "Services in Jizan",
    servicesHeading: "One partner for every movement in Jizan",
    servicesDescription:
      "AB delivers reliable corporate ground transportation, VIP logistics, and group passenger solutions tailored to complex business schedules across the region.",
    services: [
      {
        title: "Chauffeur & VIP",
        description: "Chauffeur & VIP",
        href: "/services/chauffeur-service",
        icon: "Crown",
      },
      {
        title: "Airport Transfers",
        description: "Airport Transfers",
        href: "/services/airport-transfers",
        icon: "Plane",
      },
      {
        title: "Bus & Coach Hire arranged in Jizan",
        description: "Bus & Coach Hire arranged in Jizan",
        href: "/services/event-transport",
        icon: "Users",
      },
    ],
    airportInfo: {
      eyebrow: "Airport transfers",
      heading: "Arriving at King Abdullah bin Abdulaziz Airport (GIZ)",
      description:
        "Arriving passengers step into an organised reception workflow handled by licensed professional chauffeurs. Every booking includes active flight tracking to monitor scheduled landing adjustments and arrival gate updates. Chauffeurs provide a formal meet and greet with name boards positioned at the terminal arrivals exit [Confirm meeting point]. Passengers benefit from inclusive free waiting time [Confirm free waiting time] allowing complete ease during luggage retrieval and customs processing. Corporate travel planners and executive assistants gain peace of mind through central dispatch updates confirming chauffeur on site status and passenger pickup confirmation.",
      bullets: [
        { heading: "Flight tracking", description: "Every arrival" },
        { heading: "Meet and greet", description: "Inside the terminal" },
        { heading: "GIZ to Jizan Corniche", description: "[Confirm] minutes" },
      ],
    },
    coverageEyebrow: "Coverage",
    coverageHeading: "Where we work in Jizan",
    coverageDescription:
      "AB maintains extensive operational knowledge of regional municipal roads, private industrial security entries, and hospitality complexes across the Jizan province. Executive chauffeurs execute scheduled journeys with meticulous route navigation and local awareness.",
    coverageGroups: [
      {
        category: "Business",
        places: "Al Shati District · Courtyard Jazan Commercial Hub · Al Safa Financial Zone",
        icon: "Briefcase",
      },
      {
        category: "Events and conferences",
        places: "Jazan Cultural Centre · Grand Millennium Conference Hall · Jazan Heritage Village Pavilion",
        icon: "Users",
      },
      {
        category: "Heritage and leisure",
        places: "Jazan Corniche Promenade · Al Dosariyah Castle · Farasan Islands Ferry Terminal",
        icon: "Crown",
      },
      {
        category: "Government or Industry",
        places: "Jazan Economic City · Jazan Port Authority · Jazan University Administrative Complex",
        icon: "Shield",
      },
    ],
    officeEyebrow: "Our office",
    officeHeading: "Central dispatch coordination for Jizan",
    officeDescription:
      "Ground operations in Jizan are actively supervised through our central headquarters. Our dispatch desk oversees driver schedules, fleet compliance, and real time passenger movements around the clock.",
    officeTitle: "AB Riyadh (headquarters) [Confirm nearest office]",
    officeAddress:
      "Building 3036, Office 08, 2nd Floor, Umar Ibn Abdulaziz Road, Al Malaz, Riyadh, Saudi Arabia",
    officePhone: "+966 58 111 8720",
    faqEyebrow: "Questions",
    faqHeading: "Chauffeur service in Jizan: your questions",
    faqs: [
      {
        q: "What vehicle options are available for chauffeur service Jizan?",
        a: "AB provides standard sedans, executive business saloons, flagship luxury sedans like the Mercedes S Class, and spacious premium SUVs such as the Cadillac Escalade or GMC Yukon. For delegations, premium MPVs and executive vans accommodate larger corporate groups. Every vehicle is fully insured and licensed for commercial passenger carriage.",
      },
      {
        q: "How are arrivals handled at King Abdullah bin Abdulaziz Airport (GIZ)?",
        a: "Your professional chauffeur tracks inbound flight status in real time to adapt to schedule variations. Upon arrival, the driver welcomes passengers inside the terminal with a personalized name board. Chauffeurs assist with luggage before escorting passengers to their awaiting vehicle for a smooth GIZ airport transfer.",
      },
      {
        q: "Can I book an intercity transfer Jizan to other regional centres?",
        a: "Yes, AB coordinates direct intercity journeys from Jizan to destinations including Abha, Sabya, and Jazan Economic City. Chauffeurs manage route planning across regional highways, delivering relaxed travel without the delays of scheduled regional connections. Long distance itineraries may be booked as one way transfers or round trips.",
      },
      {
        q: "Can corporate clients reserve an hourly private driver Jizan for full day meetings?",
        a: "Executive clients can reserve an hourly chauffeur or complete full day hire for complex schedules in Jizan. The assigned private driver remains on standby throughout the itinerary to accommodate multi stop agendas, changing meeting venues, and executive site visits. Central dispatch oversees ongoing route coordination.",
      },
      {
        q: "What safety and insurance standards apply to AB operations in Jizan?",
        a: "All operations supervised by AB adhere to strict transport authority regulations within Saudi Arabia. Every chauffeur is professionally vetted, commercially licensed, and trained in passenger safety and discrete executive protocol. Vehicles undergo routine safety inspections and carry comprehensive commercial passenger insurance coverage.",
      },
    ],
    ctaHeading: "Your chauffeur is ready in Jizan.",
    ctaDescription:
      "Connect directly with our 24/7 central dispatch team at +966 58 111 8720 to confirm your executive chauffeur service Jizan booking.",
  },

  mecca: {
    slug: "mecca",
    name: "Mecca",
    displayName: "Makkah",
    imageFolder: "www.ab.limo-locations-saudi-arabia-mecca-images",
    heroTitle: "Chauffeur Service in Makkah",
    heroDescription:
      "AB provides executive ground mobility and professional chauffeur service Makkah for private delegations, business visitors, and pilgrims. Our discreet private driver team manages transfers between King Abdulaziz International Airport (JED) and prestigious hotels across Makkah with seamless coordination.\n\nEach journey delivers exceptional punctuality, refined comfort, and operational precision throughout the holy city.",
    heroImageAlt: "Makkah skyline view with executive transportation vehicle",
    description:
      "Nearest Airport: JED. Operational Status: Holy City Protocol and VIP Mobility. Specialised chauffeur operations serving the Holy Mosque perimeter, VIP hospitality suites and intercity pilgrimage corridors.",
    fleetEyebrow: "The Makkah fleet",
    fleetHeading: "Choose your Makkah chauffeur class",
    fleetSubheading:
      "Every vehicle in our Makkah fleet is GPS tracked and detailed before each journey. Our fleet options accommodate corporate executives, diplomatic visits, and extended family groups travelling together.",
    vehicles: [
      {
        category: "Standard Sedan",
        specLine: "Sedan · 3 guests · 2 bags",
        model: "Typical model: Toyota Camry or similar [Confirm]",
        idealFor: "Ideal for: Solo business travellers and short transfers",
        capacity: "3 guests",
        bags: "2 bags",
        description:
          "Enjoy reliable urban transit and swift point to point journeys with our dependable standard sedan option across central Makkah.",
        imageIndex: 2,
        imageAlt: "Standard Sedan chauffeur service Makkah",
      },
      {
        category: "Business Sedan",
        specLine: "Sedan · 3 guests · 2 bags",
        model: "Typical model: Mercedes E Class or similar [Confirm]",
        idealFor: "Ideal for: Corporate meetings and daily transfers",
        capacity: "3 guests",
        bags: "2 bags",
        description:
          "Our business class vehicle provides leather seating, climate control, and generous legroom for productive business travel throughout Makkah districts.",
        imageIndex: 3,
        imageAlt: "Business Sedan private driver Makkah",
      },
      {
        category: "First Class Sedan",
        specLine: "Flagship sedan · 3 guests · 2 bags",
        model: "Typical model: Mercedes S Class or similar [Confirm]",
        idealFor: "Ideal for: VIP delegates and senior executives",
        capacity: "3 guests",
        bags: "2 bags",
        description:
          "Experience premier automotive craftsmanship with acoustic insulation and supreme comfort tailored for prestigious journeys and discreet executive movement in Makkah.",
        imageIndex: 4,
        imageAlt: "First Class Sedan luxury car Makkah",
      },
      {
        category: "Executive SUV",
        specLine: "SUV · 6 guests · 5 bags",
        model: "Typical model: Cadillac Escalade, GMC Yukon or similar [Confirm]",
        idealFor: "Ideal for: Small delegations and family pilgrimage",
        capacity: "6 guests",
        bags: "5 bags",
        description:
          "Spacious luggage capacity combined with elevated ride height provides effortless regional transfers and comfortable group travel from Makkah to neighbouring destinations.",
        imageIndex: 5,
        imageAlt: "Executive SUV chauffeur service Makkah",
      },
      {
        category: "Premium MPV",
        specLine: "MPV · 6 guests · 5 bags",
        model: "Typical model: Mercedes V Class or similar [Confirm]",
        idealFor: "Ideal for: Executive teams and luggage flexibility",
        capacity: "6 guests",
        bags: "5 bags",
        description:
          "Face to face conference seating configurations and easy boarding make this luxury people carrier an exceptional choice for collaborative corporate delegations.",
        imageIndex: 6,
        imageAlt: "Premium MPV limousine service Makkah",
      },
      {
        category: "Executive Van",
        specLine: "Van · 14 guests · 10 bags",
        model: "Typical model: Mercedes Sprinter or similar [Confirm]",
        idealFor: "Ideal for: Large delegations and hospitality groups",
        capacity: "14 guests",
        bags: "10 bags",
        description:
          "Coordinated transport for large groups with ample baggage stowage and dedicated professional driver logistics across regional highway routes.",
        imageIndex: 7,
        imageAlt: "Executive Van bus rental Makkah",
      },
    ],
    journeysEyebrow: "Popular journeys",
    journeysHeading: "Across Makkah and beyond",
    journeysDescription:
      "AB coordinates individual city connections and extensive cross province routes with fixed transparent scheduling.",
    journeys: [
      {
        tag: "Airport transfer",
        title: "JED to Makkah hotels near the Haram",
        description:
          "Direct private transfer from the airport terminal to luxury hotel towers in central Makkah.",
        priceText: "From [SAR price]",
      },
      {
        tag: "City or Intercity",
        title: "JED to Al Aziziyah",
        description:
          "Convenient scheduled service connecting arriving flights directly to residential and commercial quarters in Al Aziziyah.",
        priceText: "From [SAR price]",
      },
      {
        tag: "City or Intercity",
        title: "Makkah to Madinah",
        description:
          "Seamless intercity transfer Makkah connection along the primary highway corridor linking both holy cities in complete comfort.",
        priceText: "From [SAR price] · [Confirm] hours",
        href: "/locations/saudi-arabia/mecca/routes/mecca-to-medina",
      },
      {
        tag: "City or Intercity",
        title: "Makkah to Jeddah",
        description:
          "Executive ground transport between hospitality suites in Makkah and corporate headquarters or diplomatic offices in Jeddah.",
        priceText: "From [SAR price] · [Confirm] hours",
        href: "/locations/saudi-arabia/mecca/routes/mecca-to-jeddah",
      },
      {
        tag: "Airport transfer",
        title: "Jeddah airport (JED) to Makkah",
        description:
          "Full arrival assistance and rapid onward dispatch for regional international passengers arriving at terminal facilities.",
        priceText: "From [SAR price]",
      },
      {
        tag: "City or Intercity",
        title: "Makkah to Taif",
        description:
          "Scenic and tranquil mountain route transit between Makkah and the highland city of Taif with experienced chauffeurs.",
        priceText: "From [SAR price] · [Confirm] hours",
      },
    ],
    servicesEyebrow: "Services in Makkah",
    servicesHeading: "One partner for every movement in Makkah",
    servicesDescription:
      "AB delivers comprehensive ground logistics including corporate transfers, executive events, and private pilgrimage travel across the Kingdom.",
    services: [
      {
        title: "Chauffeur & VIP in Makkah",
        description:
          "Book our tailored Chauffeur & VIP in Makkah service for high profile executives and private dignitaries.",
        href: "/services/chauffeur-service",
        icon: "Crown",
      },
      {
        title: "Bus & Coach Hire in Makkah",
        description:
          "Coordinate large event movements through our dedicated Bus & Coach Hire in Makkah fleet.",
        href: "/services/event-transport",
        icon: "Users",
      },
      {
        title: "Religious Tourism",
        description:
          "Organise specialised pilgrim transfers via our professional Religious Tourism logistics team.",
        href: "/services/chauffeur-service",
        icon: "Shield",
      },
    ],
    airportInfo: {
      eyebrow: "Airport transfers",
      heading: "Arriving at King Abdulaziz International Airport (JED)",
      description:
        "Arriving at King Abdulaziz International Airport (JED) represents the start of your spiritual or professional mission in the western province. AB provides flight tracking on every flight, adjusting immediately for advance arrivals or unexpected airborne delays. Your professional chauffeur conducts a formal meet and greet with a personalised name board inside the terminal hall. The designated meeting point is [Confirm], where your luggage is handled with utmost care. Guests benefit from inclusive free waiting time of [Confirm] to clear immigration and baggage reclaim smoothly. Your dedicated vehicle then embarks on an unhindered journey to your accommodation in Makkah.",
      bullets: [
        {
          heading: "Flight tracking",
          description: "Every arrival is monitored in real time through our operations platform.",
        },
        {
          heading: "Meet and greet",
          description: "Inside the terminal with professional identification boards.",
        },
        {
          heading: "JED to Makkah hotels",
          description: "[Confirm] minutes to destinations near the Haram.",
        },
      ],
    },
    coverageEyebrow: "Coverage",
    coverageHeading: "Where we work in Makkah",
    coverageDescription:
      "AB supports corporate transport, religious movements, and government protocol assignments across Makkah. Our operational network covers major financial districts, conference facilities, and hospitality towers. Drivers strictly respect regulatory boundaries, acknowledging that non Muslims cannot enter the Haram area and re-routing appropriately across commercial sectors.",
    coverageGroups: [
      {
        category: "Business and Events",
        places:
          "Al Aziziyah business district · Makkah Chamber of Commerce · Jabal Omar commercial centre · Abraj Al Bait conference halls · Umm Al Qura University convention centres · Makkah Clock Royal Tower event venues",
        icon: "Briefcase",
      },
      {
        category: "Heritage and Government",
        places:
          "Makkah Museum in Al Zahir · Hira Cultural District · Mina and Arafat pilgrimage corridors · Makkah Municipality Headquarters · Emirate of Makkah Province offices · Ministry of Hajj and Umrah facilities",
        icon: "Shield",
      },
    ],
    officeEyebrow: "Our office",
    officeHeading: "AB operations supporting Makkah",
    officeDescription:
      "AB supports Makkah through its integrated regional operations network and continuous 24/7 dispatch infrastructure. Central vehicle tracking and journey coordination are managed directly through our primary operations centre in the capital city. The nearest administrative base is AB Riyadh headquarters, subject to confirmation.",
    officeTitle: "AB Riyadh, headquarters and 24/7 dispatch [Confirm nearest office]",
    officeAddress:
      "Building 3036, Office 08, 2nd Floor, Umar Ibn Abdulaziz Road, Al Malaz, Riyadh, Saudi Arabia",
    officePhone: "+966 58 111 8720",
    faqEyebrow: "Questions",
    faqHeading: "Chauffeur service in Makkah: your questions",
    faqs: [
      {
        q: "How do I book a private chauffeur service in Makkah?",
        a: "You can reserve ground transport by submitting your flight and itinerary details through our online portal or contacting our central dispatch team. We confirm vehicle availability, dispatch details, and chauffeur contact information well before your departure. Our operations team remains available continuously to handle schedule changes and adjustments.",
      },
      {
        q: "What is included with a JED airport transfer to Makkah?",
        a: "Every airport transfer from King Abdulaziz International Airport (JED) includes active flight tracking, terminal meet and greet, luggage assistance, and complimentary waiting time of [Confirm]. Your assigned driver greets you holding an official name board and assists with bags before departing directly for Makkah.",
      },
      {
        q: "Can I reserve a private driver Makkah for hourly or daily hire?",
        a: "Yes, AB provides flexible hourly and full day hire packages designed for corporate meetings, delegation site visits, and multi stop itineraries across Makkah. Your dedicated vehicle and driver remain at your disposal throughout the contracted duration, assisting with unscheduled stops and route adjustments.",
      },
      {
        q: "What vehicle options and luggage capacities are available in Makkah?",
        a: "Our fleet encompasses standard sedans, luxury business saloons such as the Mercedes S Class, executive SUVs like the Cadillac Escalade and GMC Yukon, and multi passenger vans including the Mercedes Sprinter. Standard sedans hold two bags while executive vans comfortably accommodate up to ten pieces of luggage.",
      },
      {
        q: "How are intercity transfer Makkah journeys to Madinah or Taif arranged?",
        a: "Intercity transfers are scheduled with point to point precision between hotels, airports, and private residences. Chauffeurs familiar with long distance highways manage transit to Madinah, Jeddah, or Taif, incorporating planned rest breaks. Fixed pricing and transparent schedules provide predictability without unexpected roadside expenses.",
      },
      {
        q: "Are AB vehicles and drivers licensed and insured for commercial service?",
        a: "All AB vehicles operate with comprehensive commercial passenger insurance, valid regulatory permits, and regular safety inspections. Our professional chauffeurs possess commercial driving licences, local geographic knowledge, and extensive etiquette training to support VIP delegations and corporate executives with supreme discretion.",
      },
      {
        q: "What access rules apply to the Haram zone for private transport?",
        a: "Strict religious regulations designate the central Haram perimeter solely for Muslim visitors. Non Muslim passengers are safely routed to external commercial districts, corporate headquarters, and regional venues outside sacred boundaries. Chauffeurs possess required credentials to access authorised hotel forecourts near the Grand Mosque.",
      },
    ],
    ctaHeading: "Your chauffeur is ready in Makkah.",
    ctaDescription:
      "Reserve executive chauffeur service Makkah with our central dispatch team on +966 58 111 8720 for dependable corporate and VIP transport.",
  },


  medina: {
    slug: "medina",
    name: "Medina",
    displayName: "Madinah",
    imageFolder: "www.ab.limo-locations-saudi-arabia-medina-images",
    heroTitle: "Chauffeur Service in Madinah",
    heroDescription:
      "AB provides a professional chauffeur service Madinah visitors and corporate delegations rely on for punctual ground transport. We deliver executive travel between Prince Mohammad bin Abdulaziz International Airport (MED), central business zones, holy landmarks and luxury hotels across Madinah.",
    heroImageAlt: "Madinah skyline during sunset with modern roadway transport",
    description:
      "Airport Code: MED. Operational Status: Holy City and Regional Gateway. Dedicated fleet serving Prince Mohammad bin Abdulaziz International Airport, Knowledge Economic City and central sanctuary hotels.",
    fleetEyebrow: "The Madinah fleet",
    fleetHeading: "Choose your Madinah chauffeur class",
    fleetSubheading:
      "Every vehicle in our Madinah fleet is GPS tracked and detailed before each journey. AB maintains immaculate standards across all vehicle categories to support private passenger travel and delegation logistics.",
    vehicles: [
      {
        category: "Standard Sedan",
        specLine: "Sedan · 3 guests · 2 bags",
        model: "Typical model: or similar [Confirm]",
        idealFor: "Ideal for: Solo business and airport transfers",
        capacity: "3 guests",
        bags: "2 bags",
        description:
          "This category delivers reliable private driver Madinah solutions for visiting executives needing swift city transfers. Guests enjoy calm interiors, climate control and dedicated luggage space for daily business appointments.",
        imageIndex: 2,
        imageAlt: "Standard Sedan luxury car in Madinah",
      },
      {
        category: "Business Sedan",
        specLine: "Sedan · 3 guests · 2 bags",
        model: "Typical model: or similar [Confirm]",
        idealFor: "Ideal for: Corporate executives and daily itineraries",
        capacity: "3 guests",
        bags: "2 bags",
        description:
          "Our business class option represents an elite limousine service Madinah professionals select for productive road travel. Passengers can work comfortably using onboard amenities while a professional chauffeur navigates local traffic.",
        imageIndex: 3,
        imageAlt: "Business Sedan chauffeur vehicle in Madinah",
      },
      {
        category: "First Class Sedan",
        specLine: "Flagship sedan · 3 guests · 2 bags",
        model: "Typical model: or similar [Confirm]",
        idealFor: "Ideal for: Dignitaries and VIP protocol transport",
        capacity: "3 guests",
        bags: "2 bags",
        description:
          "Experience premier VIP transport featuring flagship models such as the Mercedes S Class. Discretion, whisper quiet cabins and refined appointments create the finest travel environment available across the city.",
        imageIndex: 4,
        imageAlt: "First Class Sedan Mercedes S Class in Madinah",
      },
      {
        category: "Executive SUV",
        specLine: "SUV · 6 guests · 5 bags",
        model: "Typical model: or similar [Confirm]",
        idealFor: "Ideal for: Families and small executive teams",
        capacity: "6 guests",
        bags: "5 bags",
        description:
          "Spacious models like the Cadillac Escalade and GMC Yukon offer generous room for family groups or diplomatic details. High seating positions and ample luggage capacity make every city transit effortless.",
        imageIndex: 5,
        imageAlt: "Executive SUV Cadillac Escalade in Madinah",
      },
      {
        category: "Premium MPV",
        specLine: "MPV · 6 guests · 5 bags",
        model: "Typical model: or similar [Confirm]",
        idealFor: "Ideal for: Delegation transport and flexible meetings",
        capacity: "6 guests",
        bags: "5 bags",
        description:
          "Featuring vehicles like the Mercedes V Class, this category provides face to face conference seating options in Madinah. Delegations can coordinate schedules easily while moving between venues in total privacy.",
        imageIndex: 6,
        imageAlt: "Premium MPV Mercedes V Class in Madinah",
      },
      {
        category: "Executive Van",
        specLine: "Van · 14 guests · 10 bags",
        model: "Typical model: or similar [Confirm]",
        idealFor: "Ideal for: Group transfers and event delegations",
        capacity: "14 guests",
        bags: "10 bags",
        description:
          "When standard cars are insufficient, this vehicle fulfills bus rental Madinah requirements for large groups. Generous overhead headroom and dedicated rear boot space accommodate luggage for extended pilgrim or corporate visits.",
        imageIndex: 7,
        imageAlt: "Executive Van bus rental Madinah passenger transport",
      },
    ],
    journeysEyebrow: "Popular journeys",
    journeysHeading: "Across Madinah and beyond",
    journeysDescription:
      "AB provides fixed route precision for arrivals, local historic tours and direct highway journeys connecting key regional destinations.",
    journeys: [
      {
        tag: "Airport transfer",
        title: "MED to the Prophet's Mosque area",
        description:
          "Direct transfer from the terminal gates to central district hotels with meet and greet service.",
        priceText: "From [SAR price]",
      },
      {
        tag: "City",
        title: "MED to Quba",
        description:
          "Dedicated driver transit to historic spiritual sites and surrounding residential quarters.",
        priceText: "From [SAR price]",
      },
      {
        tag: "Intercity",
        title: "Madinah to Makkah",
        description:
          "Direct intercity transfer Madinah travellers reserve for comfortable highway travel between holy sanctuaries.",
        priceText: "From [SAR price] · [Confirm] hours",
        href: "/locations/saudi-arabia/medina/routes/medina-to-mecca",
      },
      {
        tag: "Intercity",
        title: "Madinah to Jeddah",
        description:
          "Smooth road connection to commercial headquarters, diplomatic missions and coastal marine terminals.",
        priceText: "From [SAR price] · [Confirm] hours",
        href: "/locations/saudi-arabia/medina/routes/medina-to-jeddah",
      },
      {
        tag: "Intercity",
        title: "Madinah to AlUla",
        description:
          "Chauffeured regional itinerary to historic desert landscapes, heritage sites and luxury resorts.",
        priceText: "From [SAR price] · [Confirm] hours",
        href: "/locations/saudi-arabia/medina/routes/medina-to-al-ula",
      },
    ],
    servicesEyebrow: "Services in Madinah",
    servicesHeading: "One partner for every movement in Madinah",
    servicesDescription:
      "AB delivers comprehensive ground logistics across Saudi Arabia, supporting VIP visitors, corporate executives, event organisers and pilgrimage groups.",
    services: [
      {
        title: "Chauffeur & VIP in Madinah",
        description:
          "Book our executive Chauffeur & VIP in Madinah service for private luxury transport.",
        href: "/services/chauffeur-service",
        icon: "Crown",
      },
      {
        title: "Bus & Coach Hire in Madinah",
        description:
          "Organise high capacity fleet movements with Bus & Coach Hire in Madinah for large delegations.",
        href: "/services/event-transport",
        icon: "Users",
      },
      {
        title: "Religious Tourism",
        description:
          "Coordinate dedicated pilgrim transport through our specialised religious tourism itineraries.",
        href: "/services/chauffeur-service",
        icon: "Shield",
      },
    ],
    airportInfo: {
      eyebrow: "Airport transfers",
      heading: "Arriving at Prince Mohammad bin Abdulaziz International Airport (MED)",
      description:
        "Arriving at Prince Mohammad bin Abdulaziz International Airport (MED) is simple when your private transfer is prearranged. AB provides an efficient MED airport transfer with real time flight tracking on every inbound journey. Your professional chauffeur greets you inside the terminal holding an official personalised name board. The driver assists with all luggage and escorts you directly to your waiting luxury car at the designated meeting point [Confirm]. Travellers benefit from free waiting time [Confirm] following international flight touchdown, allowing ample opportunity to complete customs and immigration procedures without haste.",
      bullets: [
        { heading: "Flight tracking", description: "Every arrival" },
        { heading: "Meet and greet", description: "Inside the terminal" },
        { heading: "MED to the Prophet's Mosque area", description: "[Confirm] minutes" },
      ],
      image: "/locations/www.ab.limo-locations-saudi-arabia-medina-images/image8.jpg",
      imageAlt:
        "Chauffeur meeting guest at Prince Mohammad bin Abdulaziz International Airport MED in Madinah",
    },
    coverageEyebrow: "Coverage",
    coverageHeading: "Where we work in Madinah",
    coverageDescription:
      "Our transport network operates throughout metropolitan Madinah, serving primary administrative areas, holy sanctuaries, business districts and hospitality destinations. AB chauffeurs possess extensive knowledge of municipal access routes and local protocol.",
    coverageGroups: [
      {
        category: "Business",
        places:
          "Knowledge Economic City (Executive transport serving corporate offices, technology parks and regional financial facilities.) · Madinah Chamber (Scheduled mobility for trade delegates and international business leadership meetings.) · King Fahd District (Commercial district chauffeuring for regional corporate headquarters and retail management centres.)",
        icon: "Briefcase",
      },
      {
        category: "Events and conferences",
        places:
          "Madinah Meridian Hotel (Event delegate shuttles and keynote speaker arrivals for major hotel conventions.) · Taibah University Hall (Chauffeured ground logistics for academic symposiums and government educational forums.) · Al Multaqa Center (Private vehicle dispatch for civic exhibitions and professional corporate summits.)",
        icon: "Users",
      },
      {
        category: "Heritage and leisure",
        places:
          "Al Masjid an Nabawi (Dignified transit to the Prophet Mosque perimeter and neighbouring premier hotel plazas.) · Quba Mosque (Private ziyarah tours and historic landmark excursions for visiting dignitaries.) · Mount Uhud (Guided route transfers to cultural heritage sites and historic memorial grounds.)",
        icon: "Crown",
      },
      {
        category: "Government or Industry",
        places:
          "Madinah Governorate (Strict protocol transport for ministerial visitors and official diplomatic delegations.) · Madinah Industrial City (Secure transfers for technical consultants, site supervisors and industrial plant managers.) · Al Munawwarah Municipality (Punctual transport serving civic governance complexes and urban planning offices.)",
        icon: "Shield",
      },
    ],
    officeEyebrow: "Our office",
    officeHeading: "AB operations supporting Madinah",
    officeDescription:
      "AB manages comprehensive ground mobility across Madinah through our central regional infrastructure. As a premier provider headquartered in Riyadh, our centralised dispatch team coordinates licensed drivers, flight monitoring and on demand fleet allocations across the Kingdom.",
    officeTitle: "AB Riyadh, headquarters [Confirm nearest office]",
    officeAddress:
      "Building 3036, Office 08, 2nd Floor, Umar Ibn Abdulaziz Road, Al Malaz, Riyadh, Saudi Arabia",
    officePhone: "+966 58 111 8720",
    faqEyebrow: "Questions",
    faqHeading: "Chauffeur service in Madinah: your questions",
    faqs: [
      {
        q: "How do I book a chauffeur service Madinah transfer?",
        a: "Reservations can be submitted online or arranged directly through our round the clock dispatch team. Provide your travel date, pickup location, passenger count and preferred vehicle class to receive instant itinerary coordination.",
      },
      {
        q: "What airport transfer services operate at Prince Mohammad bin Abdulaziz International Airport (MED)?",
        a: "AB provides scheduled terminal meet and greet arrivals, flight monitoring and direct hotel transfers at MED. Chauffeurs assist with baggage handling and guide passengers to premium vehicles parked in designated airport pickup bays.",
      },
      {
        q: "Can I arrange an intercity transfer Madinah to Makkah or Jeddah?",
        a: "Yes, we operate long distance intercity transfers connecting Madinah to Makkah, Jeddah and AlUla. Passengers travel in premium sedans, luxury SUVs or spacious passenger vans with professional chauffeurs experienced on Saudi highway corridors.",
      },
      {
        q: "Are chauffeurs in Madinah licensed and commercially insured?",
        a: "All AB chauffeurs hold full regulatory commercial licences and undergo comprehensive background vetting and defensive driving instruction. Every vehicle maintains comprehensive commercial passenger insurance in accordance with Saudi transport authorities.",
      },
      {
        q: "Is hourly chauffeur hire available for ziyarah tours in Madinah?",
        a: "AB offers dedicated hourly and full day hire packages for ziyarah itineraries visiting historic landmarks throughout Madinah. Your private driver remains on standby throughout the duration of your visits to holy locations.",
      },
      {
        q: "What vehicle options exist for large delegations needing transport in Madinah?",
        a: "For groups exceeding passenger car capacities, AB supplies executive passenger vans and luxury coaches. These group options ensure coordinated arrivals for conferences, large family groups and government delegations visiting Madinah venues.",
      },
      {
        q: "How does AB monitor delayed flights arriving at MED?",
        a: "Our Riyadh dispatch centre tracks commercial and private aviation arrivals in real time using automated flight monitoring systems. Driver pickup times automatically adjust to actual landing times, preserving your complimentary waiting window.",
      },
    ],
    ctaHeading: "Your chauffeur is ready in Madinah.",
    ctaDescription:
      "Experience the premier chauffeur service Madinah relies on by contacting our twenty four hour dispatch office on +966 58 111 8720.",
  },

  neom: {
    slug: "neom",
    name: "Neom",
    displayName: "NEOM",
    imageFolder: "www.ab.limo-locations-saudi-arabia-neom-images",
    heroTitle: "NEOM",
    heroDescription:
      "AB provides executive ground mobility and professional chauffeur service NEOM for global leadership teams and corporate visitors. Reliable transfers connect arrivals from NEOM Bay Airport (NUM) directly to regional project sectors across NEOM without delay. Every booking delivers refined comfort and coordinated executive travel across the northwest region of Saudi Arabia.\n\nGround operations in remote development areas demand structured fleet coordination, verified drivers and continuous operational communication. AB combines central dispatch capability with premium vehicles to manage individual journeys and complex delegation transfers throughout the region.",
    heroImageAlt: "Chauffeur service NEOM vehicle driving along desert highway toward modern project architecture",
    description:
      "Airport Code: NUM. Operational Status: Giga-Project Logistics Hub. Specialised fleet support for project executives, international consultants, investor delegations and engineering site visits.",
    fleetEyebrow: "The NEOM fleet",
    fleetHeading: "Choose your NEOM chauffeur class",
    fleetSubheading:
      "Every vehicle in our NEOM fleet is GPS tracked and detailed before each journey. AB deploys pristine executive cars, spacious sport utility vehicles and executive passenger vans configured for executive comfort across long desert distances.",
    vehicles: [
      {
        category: "Standard Sedan",
        specLine: "Sedan · 3 guests · 2 bags",
        model: "Toyota Camry or similar [Confirm]",
        idealFor: "Ideal for individual business transfers",
        capacity: "3 guests",
        bags: "2 bags",
        description:
          "Comfortable daily transport for individual consultants and specialists moving between accommodation centres and operational offices across NEOM work sites.",
        imageIndex: 2,
        imageAlt: "Standard Sedan NEOM chauffeur service",
      },
      {
        category: "Business Sedan",
        specLine: "Sedan · 3 guests · 2 bags",
        model: "Mercedes E Class or similar [Confirm]",
        idealFor: "Ideal for executive business meetings",
        capacity: "3 guests",
        bags: "2 bags",
        description:
          "Refined executive travel tailored for visiting corporate executives, project directors and technical consultants attending corporate conferences in NEOM.",
        imageIndex: 3,
        imageAlt: "Business Sedan executive car service in NEOM",
      },
      {
        category: "First Class Sedan",
        specLine: "Flagship sedan · 3 guests · 2 bags",
        model: "Mercedes S Class or similar [Confirm]",
        idealFor: "Ideal for dignitary VIP travel",
        capacity: "3 guests",
        bags: "2 bags",
        description:
          "Flagship luxury car transport providing superior cabin quietness, executive seating and prestige mobility for government officials and VIP delegations visiting NEOM.",
        imageIndex: 4,
        imageAlt: "First Class Sedan luxury transport NEOM",
      },
      {
        category: "Executive SUV",
        specLine: "SUV · 6 guests · 5 bags",
        model: "Cadillac Escalade, GMC Yukon or similar [Confirm]",
        idealFor: "Ideal for site inspection tours",
        capacity: "6 guests",
        bags: "5 bags",
        description:
          "Spacious all terrain capability and luggage capacity suited for project site tours, leadership teams and cross sector regional travel throughout northwest Saudi Arabia.",
        imageIndex: 5,
        imageAlt: "Executive SUV chauffeur transport NEOM",
      },
      {
        category: "Premium MPV",
        specLine: "MPV · 6 guests · 5 bags",
        model: "Mercedes V Class or similar [Confirm]",
        idealFor: "Ideal for mobile team discussions",
        capacity: "6 guests",
        bags: "5 bags",
        description:
          "Face to face conference seating configurations that allow management delegations and visiting investor teams to work comfortably while travelling across project destinations.",
        imageIndex: 6,
        imageAlt: "Premium MPV private driver NEOM",
      },
      {
        category: "Executive Van",
        specLine: "Van · 14 guests · 10 bags",
        model: "Mercedes Sprinter or similar [Confirm]",
        idealFor: "Ideal for delegation group transfers",
        capacity: "14 guests",
        bags: "10 bags",
        description:
          "High capacity corporate transport built for technical delegations, media teams and event support personnel requiring coordinated transfers between remote camps and work sites.",
        imageIndex: 7,
        imageAlt: "Executive Van corporate transportation NEOM",
      },
    ],
    journeysEyebrow: "Popular journeys",
    journeysHeading: "Across NEOM and beyond",
    journeysDescription:
      "AB provides fixed point to point transfers, scheduled corporate shuttles and long distance intercity transfer NEOM routes connecting work sites, marine gateways and regional airports.",
    journeys: [
      {
        tag: "Airport transfer",
        title: "NUM to NEOM site offices",
        description:
          "Direct terminal reception from NEOM Bay Airport (NUM) through to main administrative offices and project sector headquarters.",
        priceText: "From [SAR price]",
      },
      {
        tag: "Airport transfer",
        title: "NUM to Sindalah",
        description:
          "Dedicated private transfers connecting airport arrivals to island ferry departure terminals and coastal hospitality centres.",
        priceText: "From [SAR price]",
      },
      {
        tag: "City or Intercity",
        title: "NEOM to Magna",
        description:
          "Coastal corridor transport between central project operations and development clusters situated along the Gulf of Aqaba.",
        priceText: "From [SAR price] · [Confirm] hours",
      },
      {
        tag: "City or Intercity",
        title: "NEOM to Tabuk",
        description:
          "Regional highway connections linking construction sites and offices to commercial centres and Prince Sultan bin Abdulaziz Airport (TUU).",
        priceText: "From [SAR price] · [Confirm] hours",
        href: "/locations/saudi-arabia/neom/routes/neom-to-tabuk",
      },
      {
        tag: "City or Intercity",
        title: "NEOM project sites to accommodation [Confirm]",
        description:
          "Structured shuttle services moving executive staff and specialist personnel between base camps, residential communities and active work sites.",
        priceText: "From [SAR price] · [Confirm] hours",
      },
      {
        tag: "City or Intercity",
        title: "NEOM to AlUla",
        description:
          "Scenic long distance transfers connecting major development sectors with heritage centres, luxury resorts and regional tourism hubs.",
        priceText: "From [SAR price] · [Confirm] hours",
      },
    ],
    servicesEyebrow: "Services in NEOM",
    servicesHeading: "One partner for every movement in NEOM",
    servicesDescription:
      "AB coordinates complete executive mobility programmes across northwest Saudi Arabia, supporting giga project delivery with managed fleets and experienced local drivers.",
    services: [
      {
        title: "Chauffeur & VIP in NEOM",
        description:
          "Chauffeur & VIP in NEOM for dignitary protocol, leadership travel and discreet executive car service.",
        href: "/services/chauffeur-service",
        icon: "Crown",
      },
      {
        title: "Corporate Transportation in NEOM",
        description:
          "Corporate Transportation in NEOM for contractor mobility, workforce site movements and multi vehicle corporate programmes.",
        href: "/services/corporate-transport",
        icon: "Briefcase",
      },
      {
        title: "Bus & Coach Hire in NEOM",
        description:
          "Bus & Coach Hire in NEOM providing high capacity passenger coaches and staff bus rental NEOM solutions.",
        href: "/services/event-transport",
        icon: "Users",
      },
    ],
    airportInfo: {
      eyebrow: "Airport transfers",
      heading: "Arriving at NEOM Bay Airport (NUM)",
      description:
        "Landing at NEOM Bay Airport (NUM) connects visitors directly to the future economic engine of Saudi Arabia. AB eliminates terminal delays by assigning an experienced private driver NEOM to track your inbound flight status in real time. Your professional chauffeur greets you inside the arrivals terminal displaying a digital name board, assists with heavy luggage and escorts you directly to an air conditioned vehicle parked in the executive collection area. Drivers monitor operational schedules continuously, providing comfortable transfers to project offices or accommodation camps.\n\nMeeting point: [Confirm]. Free waiting time: [Confirm]. AB central dispatch coordinates every airport transfer with terminal security to support smooth vehicle access.",
      bullets: [
        {
          heading: "Flight tracking",
          description: "Every arrival is monitored automatically for early landings or flight diversions.",
        },
        {
          heading: "Meet and greet",
          description: "Inside the terminal with professional name boards and direct luggage assistance.",
        },
        {
          heading: "NUM to NEOM site offices",
          description: "[Confirm] minutes transit time depending on target sector and security checkpoint clearance.",
        },
      ],
    },
    coverageEyebrow: "Coverage",
    coverageHeading: "Where we work in NEOM",
    coverageDescription:
      "AB provides licensed, insured ground transport coverage across all active sectors, remote development clusters and residential communities in NEOM. Our drivers navigate complex project highway networks, maritime access roads and desert routes with precision.",
    coverageGroups: [
      {
        category: "Business",
        places: "The Line operational sectors · Oxagon industrial administration offices · Trojena mountain planning offices",
        icon: "Briefcase",
      },
      {
        category: "Events and conferences",
        places: "Sindalah island visitor gateway · NEOM Community innovation centres · Regional investment pavilions",
        icon: "Users",
      },
      {
        category: "Heritage and leisure",
        places: "Magna coastal development · Gulf of Aqaba discovery points · Sharma coastal leisure corridor",
        icon: "Crown",
      },
      {
        category: "Government or Industry",
        places: "NEOM Port and maritime logistics base · Clean energy research facilities · Regional workforce communities",
        icon: "Shield",
      },
      {
        category: "Regional connections",
        places: "Prince Sultan bin Abdulaziz Airport (TUU) in Tabuk · Dubba coastal transit corridor · Haql border entry zones",
        icon: "Map",
      },
    ],
    officeEyebrow: "Our office",
    officeHeading: "Managed Chauffeur Operations in NEOM",
    officeDescription:
      "AB coordinates ground transport across NEOM through our central 24/7 operations dispatch centre. While operations on the ground are managed by field dispatchers across northwest project sectors, regional management and administrative oversight are anchored at our headquarters in Riyadh.",
    officeTitle: "AB Riyadh, headquarters [Confirm nearest office]",
    officeAddress:
      "Building 3036, Office 08, 2nd Floor, Umar Ibn Abdulaziz Road, Al Malaz, Riyadh, Saudi Arabia",
    officePhone: "+966 58 111 8720",
    faqEyebrow: "Questions",
    faqHeading: "Chauffeur service in NEOM: your questions",
    faqs: [
      {
        q: "What vehicles are available for chauffeur service NEOM bookings?",
        a: "AB provides executive sedans, flagship luxury sedans, premium multi purpose vehicles and executive SUVs across NEOM. The fleet includes models like the Mercedes S Class, Mercedes E Class, Cadillac Escalade, GMC Yukon and Mercedes V Class or similar [Confirm]. All vehicles are maintained to strict corporate standards, featuring climate control, comprehensive insurance and tracking systems.",
      },
      {
        q: "How does AB coordinate an NUM airport transfer?",
        a: "Arrival transfers from NEOM Bay Airport (NUM) include automated flight monitoring to accommodate early or delayed flights. Your allocated chauffeur waits inside the terminal holding a personalised name board. The driver assists with your luggage and guides you to an executive vehicle prepared for immediate departure.",
      },
      {
        q: "Can I book an intercity transfer NEOM to Tabuk or AlUla?",
        a: "AB arranges dedicated intercity transfers from NEOM to major regional destinations including Tabuk, Prince Sultan bin Abdulaziz Airport (TUU) and AlUla. Journeys feature experienced chauffeurs familiar with northwest highway regulations, checkpoint protocols and desert driving conditions. Vehicles carry bottled water and mobile charging facilities for travel comfort.",
      },
      {
        q: "Do you offer hourly chauffeur and full day hire in NEOM?",
        a: "AB offers flexible hourly hire and dedicated full day chauffeur services for visiting delegations, project inspections and corporate leadership itineraries. Your assigned driver remains at your disposal throughout the day to navigate between project sectors, client meetings and site base camps on a flexible schedule.",
      },
      {
        q: "How are drivers vetted and licensed for project travel across NEOM?",
        a: "Every professional chauffeur operating with AB holds proper commercial driving credentials, local road knowledge and required security clearances for major industrial sites. Drivers adhere to rigorous defensive driving standards and client confidentiality protocols, providing safe corporate travel for senior executives and project partners.",
      },
      {
        q: "What corporate transportation NEOM options exist for large delegations?",
        a: "AB manages comprehensive ground mobility programmes for large corporate groups, engineering teams and international delegations. Services include luxury Mercedes V Class multi purpose vehicles, executive passenger vans and high capacity bus rental NEOM coaches. Central dispatch coordinates complex multi vehicle logistics for conferences and workforce mobilization.",
      },
      {
        q: "How do corporate clients arrange booking and billing with AB?",
        a: "Clients can book individual transfers or establish consolidated corporate accounts with monthly invoicing, centralized reporting and dedicated account management. The 24/7 Riyadh operations centre handles immediate reservations, itinerary adjustments and urgent dispatch requirements via telephone, email and corporate procurement channels.",
      },
    ],
    ctaHeading: "Your chauffeur is ready in NEOM.",
    ctaDescription:
      "Connect with our 24/7 central dispatch team on +966 58 111 8720 to reserve your luxury chauffeur service NEOM or coordinate comprehensive group transportation.",
  },

  riyadh: {
    slug: "riyadh",
    name: "Riyadh",
    displayName: "Riyadh",
    imageFolder: "www.ab.limo-locations-saudi-arabia-riyadh-images",
    heroTitle: "Chauffeur Service in Riyadh",
    heroDescription:
      "AB delivers executive chauffeur service Riyadh solutions tailored for corporate leaders, diplomatic delegations and international visitors. Our Riyadh network connects King Khalid International Airport (RUH) directly with central commercial hubs, private residences and government ministries.\n\nEvery itinerary across Riyadh operates under active central dispatch supervision to maintain absolute punctuality, refined passenger comfort and discreet execution.",
    heroImageAlt: "Riyadh skyline architectural panorama",
    description:
      "Airport Code: RUH. Operational Status: Headquarters and 24/7 Dispatch. Full fleet availability serving King Abdullah Financial District (KAFD), Diplomatic Quarter, ministerial compounds and major conference venues.",
    fleetEyebrow: "The Riyadh fleet",
    fleetHeading: "Choose your Riyadh chauffeur class",
    fleetSubheading:
      "Every vehicle in our Riyadh fleet is GPS tracked and detailed before each journey. Our fleet structure accommodates solo executive travel, visiting delegations, high profile delegations and coordinated corporate summit logistics across the capital.",
    vehicles: [
      {
        category: "Standard Sedan",
        specLine: "Sedan · 3 guests · 2 bags",
        model: "Typical model: or similar [Confirm]",
        idealFor: "Ideal for: Individual corporate business travel",
        capacity: "3 guests",
        bags: "2 bags",
        description:
          "Comfortable executive travel across central Riyadh districts with climate control, bottled water and refined seating for daily meetings or city transfers.",
        imageIndex: 2,
        imageAlt: "Standard Sedan parked in Riyadh",
      },
      {
        category: "Business Sedan",
        specLine: "Sedan · 3 guests · 2 bags",
        model: "Typical model: or similar [Confirm]",
        idealFor: "Ideal for: Senior managers and visiting executives",
        capacity: "3 guests",
        bags: "2 bags",
        description:
          "Premium German saloons engineered for quiet productivity between corporate engagements in Riyadh financial hubs, equipped with device charging and plush upholstery.",
        imageIndex: 3,
        imageAlt: "Business Sedan in Riyadh business hub",
      },
      {
        category: "First Class Sedan",
        specLine: "Flagship sedan · 3 guests · 2 bags",
        model: "Typical model: Mercedes S Class or similar [Confirm]",
        idealFor: "Ideal for: Diplomatic protocol and VIP passengers",
        capacity: "3 guests",
        bags: "2 bags",
        description:
          "Flagship luxury vehicles offering supreme acoustic isolation, rear executive legroom and bespoke private driver Riyadh service for state guests and corporate leaders.",
        imageIndex: 4,
        imageAlt: "First Class Sedan Mercedes S Class in Riyadh",
      },
      {
        category: "Executive SUV",
        specLine: "SUV · 6 guests · 5 bags",
        model: "Typical model: Cadillac Escalade, GMC Yukon or similar [Confirm]",
        idealFor: "Ideal for: Small executive teams and delegations",
        capacity: "6 guests",
        bags: "5 bags",
        description:
          "Commanding cabin space, ample luggage volume and elevated safety for executive delegations navigating Riyadh expressways and regional transfer corridors.",
        imageIndex: 5,
        imageAlt: "Executive SUV Cadillac Escalade in Riyadh",
      },
      {
        category: "Premium MPV",
        specLine: "MPV · 6 guests · 5 bags",
        model: "Typical model: Mercedes V Class or similar [Confirm]",
        idealFor: "Ideal for: Roadshow teams and conference groups",
        capacity: "6 guests",
        bags: "5 bags",
        description:
          "Configured with face to face conference seating, spacious sliding access and silent cabin climate systems for business roadshows across the Kingdom capital.",
        imageIndex: 6,
        imageAlt: "Premium MPV Mercedes V Class in Riyadh",
      },
      {
        category: "Executive Van",
        specLine: "Van · 14 guests · 10 bags",
        model: "Typical model: or similar [Confirm]",
        idealFor: "Ideal for: Corporate group transit and summits",
        capacity: "14 guests",
        bags: "10 bags",
        description:
          "Specialised group transport offering generous head clearance, individual seating and dedicated luggage bays for summit delegations travelling throughout Riyadh.",
        imageIndex: 7,
        imageAlt: "Executive Van parked in central Riyadh",
      },
    ],
    journeysEyebrow: "Popular journeys",
    journeysHeading: "Across Riyadh and beyond",
    journeysDescription:
      "AB coordinates scheduled point to point transfers, airport arrivals and regional intercity itineraries. Each route features dedicated vehicle preparation, active GPS navigation and professional chauffeurs familiar with local traffic patterns.",
    journeys: [
      {
        tag: "Airport transfer",
        title: "RUH to KAFD",
        description:
          "Direct connection from King Khalid International Airport terminal to the financial towers of King Abdullah Financial District.",
        priceText: "From [SAR price]",
      },
      {
        tag: "Airport transfer",
        title: "RUH to Diplomatic Quarter",
        description:
          "Discreet transit from airport arrival halls to embassies, international organisations and residences in the Diplomatic Quarter.",
        priceText: "From [SAR price]",
      },
      {
        tag: "City",
        title: "Riyadh to Diriyah",
        description:
          "Seamless transfers between central Riyadh hotels and the historic cultural precinct of At Turaif in Diriyah.",
        priceText: "From [SAR price]",
      },
      {
        tag: "City",
        title: "Riyadh to Riyadh Front",
        description:
          "Fast corporate mobility linking downtown commercial offices with exhibition centres and corporate campuses at Riyadh Front.",
        priceText: "From [SAR price]",
      },
      {
        tag: "Intercity",
        title: "Riyadh to Dammam",
        description:
          "Long distance highway transit across the Eastern Province corridor with spacious executive seating and verified rest halts.",
        priceText: "From [SAR price] · [Confirm] hours",
        href: "/locations/saudi-arabia/riyadh/routes/riyadh-to-dammam",
      },
      {
        tag: "Intercity",
        title: "Riyadh to Al Khobar",
        description:
          "Dedicated chauffeured intercity transfer connecting central Riyadh corporate offices directly with Al Khobar waterfront business districts.",
        priceText: "From [SAR price] · [Confirm] hours",
        href: "/locations/saudi-arabia/riyadh/routes/riyadh-to-al-khobar",
      },
      {
        tag: "Intercity",
        title: "Riyadh to Al Qassim (Buraydah)",
        description:
          "Direct northern transit serving agricultural and commercial headquarters in Buraydah with comfortable cabin amenities.",
        priceText: "From [SAR price] · [Confirm] hours",
        href: "/locations/saudi-arabia/riyadh/routes/riyadh-to-al-qasim",
      },
      {
        tag: "Intercity",
        title: "Riyadh to Jeddah",
        description:
          "Transpeninsular long distance chauffeur service linking the political capital with the commercial hub on the Red Sea coast.",
        priceText: "From [SAR price] · [Confirm] hours",
        href: "/locations/saudi-arabia/riyadh/routes/riyadh-to-jeddah",
      },
    ],
    servicesEyebrow: "Services in Riyadh",
    servicesHeading: "One partner for every movement in Riyadh",
    servicesDescription:
      "AB coordinates comprehensive ground mobility programs designed to support executive travel, corporate events, large groups and specialised leisure itineraries throughout the capital.",
    services: [
      {
        title: "Chauffeur & VIP in Riyadh",
        description:
          "Chauffeur & VIP in Riyadh for executive discretion, luxury sedans and bespoke daily driver arrangements.",
        href: "/services/chauffeur-service",
        icon: "Crown",
      },
      {
        title: "Airport Transfers in Riyadh",
        description:
          "Airport Transfers in Riyadh for terminal meet and greet coordination, luggage handling and punctual terminal departures.",
        href: "/services/airport-transfers",
        icon: "Plane",
      },
      {
        title: "Corporate Transportation in Riyadh",
        description:
          "Corporate Transportation in Riyadh for recurring executive commutes, multi stop roadshows and financial district client shuttles.",
        href: "/services/corporate-transport",
        icon: "Briefcase",
      },
      {
        title: "Event Transportation in Riyadh",
        description:
          "Event Transportation in Riyadh for trade exhibitions, governmental summits, international conferences and private corporate galas.",
        href: "/services/event-transport",
        icon: "Users",
      },
      {
        title: "Bus & Coach Hire in Riyadh",
        description:
          "Bus & Coach Hire in Riyadh for large delegate movements, staff transport contracts and high capacity charter requirements.",
        href: "/services/event-transport",
        icon: "Shield",
      },
      {
        title: "Tourism Transportation in Riyadh",
        description:
          "Tourism Transportation in Riyadh for guided heritage excursions, architectural visits and cultural travel programs.",
        href: "/services/chauffeur-service",
        icon: "Map",
      },
    ],
    airportInfo: {
      eyebrow: "Airport transfers",
      heading: "Arriving at King Khalid International Airport (RUH)",
      description:
        "Inbound flights at King Khalid International Airport (RUH) receive real time monitoring through our operations desk. Your professional chauffeur tracks flight movements, adjusts pickup timing for landing variances and conducts an indoor meet and greet with a clear passenger name board. The designated airport meeting point [Confirm] provides immediate visual orientation once you exit customs into the terminal arrival concourse.\n\nEvery commercial airport transfer includes generous complimentary waiting time [Confirm] to accommodate immigration lines and luggage reclaim. Chauffeurs assist with bags before escorting guests directly to the pre positioned executive car service outside the terminal curbside.",
      bullets: [
        { heading: "Flight tracking", description: "Every arrival" },
        { heading: "Meet and greet", description: "Inside the terminal" },
        { heading: "RUH to KAFD", description: "[Confirm] minutes" },
      ],
    },
    coverageEyebrow: "Coverage",
    coverageHeading: "Where we work in Riyadh",
    coverageDescription:
      "AB operates round the clock across all urban sectors, commercial districts, exhibition campuses and heritage landmarks of the Saudi capital. Our dispatch system maintains active vehicle coverage across high density corporate zones and outlying government compounds.",
    coverageGroups: [
      {
        category: "Business",
        places: "King Abdullah Financial District (KAFD) · Olaya Business District · Digital City",
        icon: "Briefcase",
      },
      {
        category: "Events and conferences",
        places:
          "Riyadh International Convention and Exhibition Center · The Arena Riyadh · Riyadh Front Exhibition Center",
        icon: "Users",
      },
      {
        category: "Heritage and leisure",
        places: "Diriyah Historic District · Al Bujairi Heritage District · Kingdom Centre Sky Bridge",
        icon: "Crown",
      },
      {
        category: "Government and Industry coverage",
        places:
          "Diplomatic Quarter, Digital City Government Complex, King Abdullah Petroleum Studies and Research Center.",
        icon: "Shield",
      },
    ],
    officeEyebrow: "Our office",
    officeHeading: "AB operations in Riyadh",
    officeDescription:
      "Headquartered in Riyadh, AB provides centralised control for managed ground transportation throughout the Kingdom and the wider Gulf region. Our regional operations centre maintains continuous flight tracking, fleet dispatch and chauffeur coordination round the clock.",
    officeTitle: "AB Riyadh — Headquarters and 24/7 dispatch",
    officeAddress:
      "Building 3036, Office 08, 2nd Floor, Umar Ibn Abdulaziz Road, Al Malaz, Riyadh, Saudi Arabia",
    officePhone: "+966 58 111 8720",
    faqEyebrow: "Questions",
    faqHeading: "Chauffeur service in Riyadh: your questions",
    faqs: [
      {
        q: "How does AB coordinate an airport transfer at King Khalid International Airport (RUH)?",
        a: "Our operations team monitors inbound flight numbers in real time for schedule modifications. Chauffeurs position vehicles prior to landing, hold personalised name boards inside the arrivals terminal and guide passengers to the curbside pickup lane with complimentary waiting time included.",
      },
      {
        q: "What vehicle classes are available for chauffeur service in Riyadh?",
        a: "The Riyadh fleet includes standard sedans, business sedans, first class sedans such as the Mercedes S Class, executive SUVs such as the Cadillac Escalade, premium MPVs like the Mercedes V Class and executive vans. Every vehicle is detailed before dispatch and equipped with modern amenities.",
      },
      {
        q: "Can corporate clients reserve an hourly chauffeur service in Riyadh?",
        a: "Yes, corporate clients can book an hourly chauffeur or full day hire arrangement for multi stop executive roadshows, diplomatic visits and financial district meetings. Your private driver remains on standby throughout the booked period to handle dynamic route adjustments.",
      },
      {
        q: "Are vehicles and drivers in Riyadh fully licensed and insured?",
        a: "All vehicles across our Riyadh operations comply with commercial transport regulations within Saudi Arabia and carry comprehensive insurance coverage. Chauffeurs undergo extensive route training, background verification and professional protocol assessments to uphold passenger safety standards.",
      },
      {
        q: "Does AB provide intercity transfer Riyadh journeys to other Saudi cities?",
        a: "AB provides chauffeured highway travel between Riyadh and key destinations including Dammam, Al Khobar, Buraydah and Jeddah. Regional transfers feature executive sedans or spacious SUVs with direct door to door pickup and verified transit coordination.",
      },
      {
        q: "How do corporate travel managers establish billing accounts with AB in Riyadh?",
        a: "Corporate travel managers, executive assistants and event coordinators can open managed accounts through our Riyadh headquarters. Corporate agreements provide centralised monthly invoicing, priority vehicle allocation, direct dispatch access and consolidated itinerary reporting across Saudi Arabia.",
      },
      {
        q: "What is the procedure for scheduling group event transportation in Riyadh?",
        a: "Organisers submit passenger manifests and event timelines to our central coordination desk. AB allocates coordinated fleets of executive vans, premium MPVs and coaches, deploying on site coordinators to oversee delegate boarding and venue departures efficiently.",
      },
    ],
    ctaHeading: "Your chauffeur is ready in Riyadh.",
    ctaDescription:
      "Contact our round the clock operations centre at +966 58 111 8720 to confirm your chauffeur service Riyadh booking or reserve executive ground fleets across Saudi Arabia.",
    ctaSubheading: "Reserve your Riyadh executive transport",
    ctaSubdescription:
      "Select your vehicle class or submit delegate transit schedules for complete corporate mobility management.",
  },

  tabuk: {
    slug: "tabuk",
    name: "Tabuk",
    displayName: "Tabuk",
    imageFolder: "www.ab.limo-locations-saudi-arabia-tabuk-images",
    heroTitle: "Chauffeur Service in Tabuk",
    heroDescription:
      "Professional chauffeur service Tabuk provides seamless corporate travel and VIP transport across the regional capital. AB supports executive arrivals at Prince Sultan bin Abdulaziz Airport (TUU) with punctual transfers, refined vehicles, and experienced local drivers. Travellers moving across Tabuk receive dedicated ground transport tailored to demanding schedules and regional project requirements.\n\nCoordinated from our central operations centre, every journey delivers discreet mobility for corporate delegations, executive teams, and official visitors. Select your travel tier or schedule an airport connection with our operations team.",
    heroImageAlt: "Tabuk skyline and executive vehicle",
    description:
      "Airport Code: TUU. Operational Status: Northwestern Regional Hub. Managed fleet operations serving regional commercial centres and highway connections to Red Sea and NEOM developments.",
    fleetEyebrow: "The Tabuk fleet",
    fleetHeading: "Choose your Tabuk chauffeur class",
    fleetSubheading:
      "Every vehicle in our Tabuk fleet is GPS tracked and detailed before each journey. AB deploys immaculate sedans, premium sports utility vehicles, and executive passenger vans configured for executive comfort, road safety, and seamless corporate mobility.",
    vehicles: [
      {
        category: "Standard Sedan",
        specLine: "Sedan · 3 guests · 2 bags",
        model: "Typical model: Toyota Camry or similar [Confirm]",
        idealFor: "Ideal for: Daily business travel journeys",
        capacity: "3 guests",
        bags: "2 bags",
        description:
          "Quiet and efficient transport for individual professionals travelling between commercial appointments across central Tabuk. Clean interiors and climate control create a restful working atmosphere for every urban transit.",
        imageIndex: 2,
        imageAlt: "Standard Sedan in Tabuk",
      },
      {
        category: "Business Sedan",
        specLine: "Sedan · 3 guests · 2 bags",
        model: "Typical model: Mercedes E Class, BMW 5 Series or similar [Confirm]",
        idealFor: "Ideal for: Corporate meetings and executives",
        capacity: "3 guests",
        bags: "2 bags",
        description:
          "The standard choice for corporate transportation Tabuk, offering refined leather seating, acoustic insulation, and onboard device charging. Chauffeurs maintain direct communication with regional operations for precise punctuality.",
        imageIndex: 3,
        imageAlt: "Business Sedan in Tabuk",
      },
      {
        category: "First Class Sedan",
        specLine: "Flagship sedan · 3 guests · 2 bags",
        model: "Typical model: Mercedes S Class or similar [Confirm]",
        idealFor: "Ideal for: VIP transport and dignitaries",
        capacity: "3 guests",
        bags: "2 bags",
        description:
          "Our flagship limousine service Tabuk tier provides exceptional luxury, generous rear legroom, and refined materials. Suited for ministerial guests, visiting directors, and high profile executive protocol across the region.",
        imageIndex: 4,
        imageAlt: "First Class Sedan luxury car in Tabuk",
      },
      {
        category: "Executive SUV",
        specLine: "SUV · 6 guests · 5 bags",
        model: "Typical model: Cadillac Escalade, GMC Yukon or similar [Confirm]",
        idealFor: "Ideal for: Delegations and project teams",
        capacity: "6 guests",
        bags: "5 bags",
        description:
          "Spacious and commanding, this luxury car platform handles intercity travel toward regional mega projects with ease. Elevated ride height and extensive luggage volume accommodate multi passenger business groups and support staff comfortably.",
        imageIndex: 5,
        imageAlt: "Executive SUV in Tabuk",
      },
      {
        category: "Premium MPV",
        specLine: "MPV · 6 guests · 5 bags",
        model: "Typical model: Mercedes V Class or similar [Confirm]",
        idealFor: "Ideal for: Mobile meetings and groups",
        capacity: "6 guests",
        bags: "5 bags",
        description:
          "Configured with conference style face to face seating, this vehicle allows executive teams to consult between appointments in Tabuk. Deep tinted windows maintain full privacy for sensitive business discussions on the road.",
        imageIndex: 6,
        imageAlt: "Premium MPV in Tabuk",
      },
      {
        category: "Executive Van",
        specLine: "Van · 14 guests · 10 bags",
        model: "Typical model: Mercedes Sprinter or similar [Confirm]",
        idealFor: "Ideal for: Large crew site movements",
        capacity: "14 guests",
        bags: "10 bags",
        description:
          "The primary solution for corporate site visits and bus rental Tabuk needs across the northwest. Generous standing room, dedicated cargo space, and climate control support comprehensive technical and event team deployments.",
        imageIndex: 7,
        imageAlt: "Executive Van bus rental Tabuk",
      },
    ],
    journeysEyebrow: "Popular journeys",
    journeysHeading: "Across Tabuk and beyond",
    journeysDescription:
      "Tabuk serves as the central commercial hub and travel gateway to NEOM and major northwest development corridors. AB coordinates point to point transit, corporate shuttles, and intercity corridors with fully vetted professional chauffeurs.",
    journeys: [
      {
        tag: "Airport transfer",
        title: "TUU to Tabuk city centre",
        priceText: "From [SAR price]",
      },
      {
        tag: "Intercity",
        title: "TUU to NEOM",
        priceText: "From [SAR price] · [Confirm] hours",
      },
      {
        tag: "Intercity",
        title: "Tabuk to NEOM",
        priceText: "From [SAR price] · [Confirm] hours",
        href: "/locations/saudi-arabia/tabuk/routes/tabuk-to-neom",
      },
      {
        tag: "Intercity",
        title: "Tabuk to AlUla",
        priceText: "From [SAR price] · [Confirm] hours",
        href: "/locations/saudi-arabia/tabuk/routes/tabuk-to-al-ula",
      },
      {
        tag: "Intercity",
        title: "Tabuk to Duba [Confirm]",
        priceText: "From [SAR price] · [Confirm] hours",
      },
    ],
    servicesEyebrow: "Services in Tabuk",
    servicesHeading: "One partner for every movement in Tabuk",
    servicesDescription:
      "AB coordinates individual VIP journeys, recurring enterprise fleets, and comprehensive delegate transport programs throughout the northwest province with operational rigour.",
    services: [
      {
        title: "Chauffeur & VIP in Tabuk",
        description: "Chauffeur & VIP in Tabuk",
        href: "/services/chauffeur-service",
        icon: "Crown",
      },
      {
        title: "Corporate Transportation in Tabuk",
        description: "Corporate Transportation in Tabuk",
        href: "/services/corporate-transport",
        icon: "Briefcase",
      },
      {
        title: "Bus & Coach Hire in Tabuk",
        description: "Bus & Coach Hire in Tabuk",
        href: "/services/event-transport",
        icon: "Users",
      },
    ],
    airportInfo: {
      eyebrow: "Airport transfers",
      heading: "Arriving at Prince Sultan bin Abdulaziz Airport (TUU)",
      description:
        "Landing at Prince Sultan bin Abdulaziz Airport (TUU) connects business travellers directly to regional governance hubs and industrial development sites. AB tracks every scheduled flight arrival automatically, adjusting chauffeur dispatch for early touches or air traffic delays. Your assigned driver conducts a personal meet and greet with a customised name board at the designated arrival meeting point [Confirm]. Travellers benefit from inclusive free waiting time [Confirm] following flight touchdown, allowing ample opportunity to collect baggage and clear customs without haste. The chauffeur assists with all luggage before escorting guests to a climate controlled vehicle stationed directly at the terminal curb.",
      bullets: [
        { heading: "Flight tracking", description: "Every arrival" },
        { heading: "Meet and greet", description: "Inside the terminal" },
        { heading: "TUU to Tabuk city centre", description: "[Confirm] minutes" },
      ],
    },
    coverageEyebrow: "Coverage",
    coverageHeading: "Where we work in Tabuk",
    coverageDescription:
      "AB provides licensed, insured transportation across major administrative quarters, corporate offices, historical destinations, and industrial logistics facilities in the Tabuk region. Centralised coordination supports punctual travel throughout the municipal boundary and surrounding project sectors.",
    coverageGroups: [
      {
        category: "Business",
        places: "Al Muruj Commercial District · Al Faisaliyah Business Area · King Fahd Road Office Zone",
        icon: "Briefcase",
      },
      {
        category: "Events and conferences",
        places: "Grand Millennium Tabuk Conference Hall · Tabuk Exhibition Centre · Park Inn by Radisson Meeting Venues",
        icon: "Users",
      },
      {
        category: "Heritage and leisure",
        places: "Tabuk Castle Heritage Precinct · Al Tawba Mosque Quarter · Souq Twaheen Historic Market",
        icon: "Crown",
      },
      {
        category: "Government or Industry",
        places:
          "AB regularly supports transportation corridors connecting the Tabuk Industrial City, Prince Sultan Military City, and the Regional Governorate Headquarters.",
        icon: "Shield",
      },
    ],
    officeEyebrow: "Our office",
    officeHeading: "Managed operations for Tabuk",
    officeDescription:
      "Regional ground transportation across Tabuk is monitored and scheduled through our central headquarters. Our dispatch team coordinates vehicle staging, road safety compliance, and chauffeur manifests around the clock to maintain reliable service delivery across Saudi Arabia.",
    officeTitle: "AB Riyadh, headquarters [Confirm nearest office]",
    officeAddress:
      "Building 3036, Office 08, 2nd Floor, Umar Ibn Abdulaziz Road, Al Malaz, Riyadh, Saudi Arabia",
    officePhone: "+966 58 111 8720",
    faqEyebrow: "Questions",
    faqHeading: "Chauffeur service in Tabuk: your questions",
    faqs: [
      {
        q: "What vehicles are available for chauffeur service Tabuk bookings?",
        a: "AB operates executive sedans, luxury flagship saloons, full size sports utility vehicles, and high capacity vans across Tabuk. Fleet choices include the Mercedes E Class, Mercedes S Class, Cadillac Escalade, GMC Yukon, and Mercedes Sprinter, all maintained under strict detailing and maintenance standards.",
      },
      {
        q: "How does AB coordinate an airport transfer at Prince Sultan bin Abdulaziz Airport (TUU)?",
        a: "Chauffeurs track inbound flights to Prince Sultan bin Abdulaziz Airport (TUU) in real time to adapt to timing alterations. Your driver greets arriving passengers inside the terminal holding an official name board, helps carry baggage, and escorts guests directly to their ready vehicle.",
      },
      {
        q: "Can I reserve a private driver Tabuk for intercity transit to NEOM?",
        a: "Yes, AB provides direct intercity transfer Tabuk corridors linking local accommodation and airports to project sites across NEOM. These long distance journeys utilise comfortable, high specification vehicles driven by professional chauffeurs familiar with regional highways and route requirements.",
      },
      {
        q: "Can corporate teams arrange hourly chauffeur and full day hire in Tabuk?",
        a: "Corporate travellers can book vehicles by the hour or reserve full day hire across Tabuk for back to back meetings and site inspections. This setup provides dedicated access to a car with driver, keeping itineraries entirely flexible while our central dispatch manages logistical timing.",
      },
      {
        q: "Are all vehicles and chauffeurs licensed and insured in Saudi Arabia?",
        a: "Every vehicle in our operational fleet is fully insured and licensed in compliance with Saudi transport authority standards. Chauffeurs undergo vetting, professional defensive driving checks, and security protocol preparation to deliver safe executive car service throughout the region.",
      },
      {
        q: "How do corporate clients manage booking and invoicing for group travel?",
        a: "Corporate travel managers can centralise bookings through consolidated account facilities managed by our dispatch headquarters. We provide clear digital itineraries, automated reporting, and transparent billing schedules suited for corporate travel programs, event delegations, and multi vehicle movements.",
      },
      {
        q: "What is the standard procedure for flight delays at TUU airport?",
        a: "Our dispatch system continuously tracks incoming flight telemetry into TUU airport. Chauffeur dispatch times update automatically when commercial flights experience delays, preserving the agreed complimentary waiting period from the moment your aircraft lands on the runway.",
      },
    ],
    ctaHeading: "Your chauffeur is ready in Tabuk.",
    ctaDescription:
      "Coordinate executive mobility, airport transfers, and project transfers across the northwest through our dedicated 24/7 operations team on +966 58 111 8720.",
    ctaSubheading: "Reserve your professional chauffeur service Tabuk",
    ctaSubdescription:
      "Experience reliable executive transport and punctual airport arrivals across Tabuk and connecting regional commercial corridors.",
  },
};
