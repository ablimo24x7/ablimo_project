import type { LocationFaq } from "@/lib/locations";
import type { SectionInstance } from "../types";
import { makeSection, withOrder } from "./common";

export interface ClientCountryData {
  slug: string;
  name: string;
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  heroImage: string;
  description: string;
  faqs: LocationFaq[];
  buildSections: (homeLabel: string, rootLabel: string) => SectionInstance[];
}

export const CLIENT_COUNTRY_DATA: Record<string, ClientCountryData> = {
  bahrain: {
    slug: "bahrain",
    name: "Bahrain",
    heroEyebrow: "",
    heroTitle: "Chauffeur Service in Bahrain",
    heroDescription:
      "For executive chauffeur service Bahrain journeys are coordinated through AB by booking vetted regional partners on request. Central operations managed from Riyadh oversee every transfer to maintain strict service consistency across the Kingdom of Bahrain.\n\nEach itinerary receives dedicated scheduling support to align vehicle capacity and chauffeur protocol with corporate travel schedules.",
    heroImage: "/locations/www.ab.limo-locations-bahrain-images/image1.jpg",
    description:
      "For executive chauffeur service Bahrain journeys are coordinated through AB by booking vetted regional partners on request. Central operations managed from Riyadh oversee every transfer to maintain strict service consistency across the Kingdom of Bahrain.",
    faqs: [
      {
        q: "How does AB coordinate airport transfer Bahrain arrivals at Bahrain International Airport (BAH)?",
        a: "AB manages every Bahrain International Airport (BAH) transfer by tracking flight status live from the Riyadh operations centre. The allocated chauffeur arrives inside the terminal with an executive meet and greet name board. The driver assists with luggage before escorting passengers to their pre arranged vehicle.",
      },
      {
        q: "What vehicle categories are available for chauffeur service in Bahrain?",
        a: "Vetted partners provide a versatile fleet suitable for business travel and VIP transport delegations across the country. Available models include executive sedan options such as the Mercedes S Class, luxury SUV transport like the Cadillac Escalade or GMC Yukon, and spacious Mercedes V Class vans for executive groups.",
      },
      {
        q: "Are cross border transfers between Bahrain and Saudi Arabia possible?",
        a: "Yes, cross border transfers connecting Bahrain and Saudi Arabia via the King Fahd Causeway are coordinated upon request. AB plans route timing, vehicle clearance protocols, and driver scheduling from Riyadh. Both point to point transfers and multi city corporate transport itineraries can be arranged with our operations team.",
      },
      {
        q: "How far in advance should corporate travel bookings be requested?",
        a: "We recommend booking corporate travel itineraries at least twenty four hours in advance to confirm chauffeur vetting and vehicle readiness. For major events, multi vehicle roadshows, or VIP delegations, earlier reservations allow our central dispatch desk to coordinate detailed scheduling, security requirements, and dedicated dispatch reporting.",
      },
      {
        q: "How does AB verify partner standards for chauffeur service across Bahrain?",
        a: "AB audits every local supplier against comprehensive service benchmarks before dispatching client trips. Local chauffeurs must hold valid commercial driving licences, complete background checks, and maintain professional protocol training. Vehicles must be fully insured, meticulously valeted, and under three years of age for reliable operations.",
      },
    ],
    buildSections: (homeLabel, rootLabel) =>
      withOrder([
        makeSection("hero", {
          variant: "with-inquiry-form",
          content: {
            eyebrow: "",
            title: "Chauffeur Service in Bahrain",
            titleHighlight: "",
            description:
              "For executive chauffeur service Bahrain journeys are coordinated through AB by booking vetted regional partners on request. Central operations managed from Riyadh oversee every transfer to maintain strict service consistency across the Kingdom of Bahrain.\n\nEach itinerary receives dedicated scheduling support to align vehicle capacity and chauffeur protocol with corporate travel schedules.",
          },
          items: [
            { label: "Request a proposal", href: "/quote/tender", style: "primary" },
            { label: "Book a transfer", href: "/locations", style: "secondary" },
          ],
          appearance: {
            background: "/locations/www.ab.limo-locations-bahrain-images/image1.jpg",
          },
        }),
        makeSection("breadcrumb", {
          content: { homeLabel, rootLabel },
        }),
        makeSection("mediaContent", {
          variant: "media-right",
          content: {
            eyebrow: "Regional Fleet and Destinations",
            heading: "Chauffeur Service Bahrain Coverage and BAH Airport Transfers",
            description:
              "AB structures executive limousine service and private driver itineraries across major business districts through an established network of licensed operators. Clients reserve car with driver options ranging from executive car service on an hourly chauffeur basis for business travel to full day hire for VIP transport delegations. All assignments are dispatched through our central control desk to align vehicle types with passenger requirements. Review Gulf coverage on Locations to coordinate regional transfers.",
            items: [
              {
                id: "bh-cov-1",
                icon: "Map",
                heading: "Manama",
                description:
                  "Financial Harbour, diplomatic quarter, and corporate office transfers in executive sedan or luxury car options.",
              },
              {
                id: "bh-cov-2",
                icon: "Map",
                heading: "Muharraq",
                description:
                  "Heritage sites, coastal logistics districts, and direct connections managed with professional chauffeur standards.",
              },
              {
                id: "bh-cov-3",
                icon: "Map",
                heading: "Riffa",
                description:
                  "Diplomatic residences, golf club appointments, and executive meetings served by spacious SUV models.",
              },
              {
                id: "bh-cov-4",
                icon: "Plane",
                heading: "Bahrain International Airport (BAH)",
                description:
                  "Punctual airport transfer services with terminal meet and greet plus real time flight tracking.",
              },
            ],
            actions: [{ label: "View Locations", href: "/locations", style: "secondary" }],
          },
          settings: { mediaPosition: "right", containerWidth: "default" },
          appearance: {
            theme: "dark",
            padding: "lg",
            border: true,
            textAlign: "left",
            background: "/locations/www.ab.limo-locations-bahrain-images/image1.jpg",
            backgroundAlt: "Executive chauffeur service Bahrain vehicle arrival",
            pattern: false,
          },
        }),
        makeSection("citiesGrid", {
          content: {
            heading: "Destinations in Bahrain",
            description: "",
          },
          settings: { source: "context.cities", columns: "3" },
          appearance: { theme: "darker", padding: "md", border: true, textAlign: "left" },
        }),
        makeSection("serviceCards", {
          variant: "3-column",
          content: {
            eyebrow: "Operational Workflow",
            heading: "How Partner Trips Work in Bahrain",
            description: "",
          },
          items: [
            {
              id: "bh-wf-1",
              icon: "Briefcase",
              title: "Request",
              description:
                "Submit your itinerary through our booking desk with vehicle preferences and passenger details. Our Riyadh dispatch team reviews route specifics, flight numbers, and timing to prepare an accurate proposal.",
            },
            {
              id: "bh-wf-2",
              icon: "Shield",
              title: "Plan and Vet",
              description:
                "Operations specialists allocate an audited local partner with an insured luxury fleet. Chauffeur credentials, vehicle condition, and licensing receive verification before trip confirmation to maintain duty of care standards.",
            },
            {
              id: "bh-wf-3",
              icon: "Clock",
              title: "Operate and Report",
              description:
                "The driver arrives before the scheduled time while dispatch monitors progress through 24/7 flight tracking and route management. Your booking coordinator delivers immediate completion reports upon drop off.",
            },
          ],
          settings: { source: "inline", columns: "3", showHeader: true },
          appearance: { theme: "dark", padding: "lg", border: true, textAlign: "left" },
        }),
        makeSection("introText", {
          content: {
            eyebrow: "Quality Protocol",
            heading: "Chauffeur Service Bahrain Partner Fleet Standards",
            paragraphs: [
              "Every partner vehicle deployed across Bahrain meets strict executive benchmarks for presentation, mechanical safety, and passenger comfort. Local fleets supply premium sedan choices like the Mercedes S Class, executive SUV options including the Cadillac Escalade or GMC Yukon, and group transport in the Mercedes V Class or executive van. Chauffeurs are licensed, background checked, commercially insured, and trained in discreet protocol for corporate transport Bahrain requirements.",
            ],
          },
          appearance: { theme: "darker", padding: "lg", border: true, textAlign: "left" },
        }),
        makeSection("faq", {
          content: {
            eyebrow: "",
            heading: "Frequently Asked Questions",
            description: "",
            items: [],
          },
          items: [],
          settings: { variant: "default", source: "context.faqs" },
          appearance: { theme: "dark", padding: "lg", border: true, textAlign: "center" },
        }),
        makeSection("ctaBanner", {
          content: {
            heading: "Book Chauffeur Service Bahrain for Corporate Travel",
            description:
              "Coordinate executive ground transport across Bahrain with vetted partner fleets and 24/7 Riyadh operations management by submitting your travel itinerary today.",
          },
          items: [
            { label: "Request a proposal", href: "/quote/tender", style: "primary" },
            { label: "Book a transfer", href: "/locations", style: "secondary" },
          ],
          appearance: { theme: "darker", padding: "lg", border: true, textAlign: "center" },
        }),
      ]),
  },

  kuwait: {
    slug: "kuwait",
    name: "Kuwait",
    heroEyebrow: "",
    heroTitle: "Chauffeur Service in Kuwait",
    heroDescription:
      "AB coordinates executive chauffeur service Kuwait travel on request through vetted local partners, managed from Riyadh. Operations controllers supervise every schedule to maintain smooth business transport.\n\nActive flight tracking and rigorous vehicle audits support seamless airport transfers for visiting delegations. Central dispatch coordinates each itinerary with 24/7 accountability.",
    heroImage: "/locations/www.ab.limo-locations-kuwait-images/image1.jpg",
    description:
      "AB coordinates executive chauffeur service Kuwait travel on request through vetted local partners, managed from Riyadh. Operations controllers supervise every schedule to maintain smooth business transport.",
    faqs: [
      {
        q: "How does AB coordinate chauffeur service in Kuwait without a local branch?",
        a: "AB manages Kuwait operations directly through its 24/7 Riyadh headquarters, partnering with vetted local fleet operators. Central dispatch oversees itinerary scheduling, chauffeur selection, live tracking and corporate invoicing to deliver reliable ground transportation for every booking.",
      },
      {
        q: "What is included in a Kuwait International Airport (KWI) transfer?",
        a: "Every Kuwait International Airport (KWI) transfer includes active flight monitoring, terminal meet and greet services and luggage assistance. Chauffeurs adjust arrival times to actual flight landings, welcoming incoming passengers in the arrivals hall before escorting them to their waiting vehicle.",
      },
      {
        q: "Which vehicle classes are available for corporate transport Kuwait bookings?",
        a: "Clients can reserve executive sedans like the Mercedes S Class, full size SUVs including the Cadillac Escalade and GMC Yukon, or spacious Mercedes V Class vans. All vehicles are late model units maintained to executive standards with climate control and bottled water.",
      },
      {
        q: "Can corporate clients reserve an hourly chauffeur or full day hire?",
        a: "Yes, AB coordinates hourly chauffeur services and full day hire packages across Kuwait for roadshows, multiple client meetings and event travel. Dedicated chauffeurs remain on standby throughout the booked period, offering total schedule flexibility as business requirements evolve.",
      },
      {
        q: "How far in advance should clients book chauffeur service Kuwait itineraries?",
        a: "Booking at least 24 hours in advance allows dispatchers to select the optimal vehicle class and complete partner vetting. For large delegation movements or specialized corporate tenders, teams can submit requests through our Tender and Contract Requests department.",
      },
    ],
    buildSections: (homeLabel, rootLabel) =>
      withOrder([
        makeSection("hero", {
          variant: "with-inquiry-form",
          content: {
            eyebrow: "",
            title: "Chauffeur Service in Kuwait",
            titleHighlight: "",
            description:
              "AB coordinates executive chauffeur service Kuwait travel on request through vetted local partners, managed from Riyadh. Operations controllers supervise every schedule to maintain smooth business transport.\n\nActive flight tracking and rigorous vehicle audits support seamless airport transfers for visiting delegations. Central dispatch coordinates each itinerary with 24/7 accountability.",
          },
          items: [
            { label: "Request a proposal", href: "/quote/tender", style: "primary" },
            { label: "Book a transfer", href: "/quote/tender", style: "secondary" },
          ],
          appearance: {
            background: "/locations/www.ab.limo-locations-kuwait-images/image1.jpg",
          },
        }),
        makeSection("breadcrumb", {
          content: { homeLabel, rootLabel },
        }),
        makeSection("mediaContent", {
          variant: "media-right",
          content: {
            eyebrow: "Executive Fleet and Coverage",
            heading: "What Chauffeur Service Kuwait and KWI Transfers Include",
            description:
              "Ground transport coordinators organise executive travel schedules for delegations, corporate roadshows and individual VIP transport across major commercial areas. Available fleets feature the Mercedes S Class sedan, Cadillac Escalade SUV, GMC Yukon SUV and Mercedes V Class luxury van, accompanied by a licensed professional chauffeur. Whether arranging an executive car service or specialized limousine service, coordinators access full regional coverage through the Locations directory.",
            mediaCaption:
              "Premium vehicles selected for executive transfers across Kuwait City and surrounding business districts.",
            items: [
              {
                id: "kw-cov-1",
                icon: "Map",
                heading: "Kuwait City",
                description:
                  "Downtown corporate transport Kuwait assignments, financial district office visits, diplomatic protocol movements and hourly chauffeur hire for executive meetings.",
              },
              {
                id: "kw-cov-2",
                icon: "Map",
                heading: "Hawalli",
                description:
                  "Commercial transfers, shopping district appointments and flexible private driver car with driver bookings across busy mixed use avenues.",
              },
              {
                id: "kw-cov-3",
                icon: "Map",
                heading: "Farwaniya and Al Ahmadi",
                description:
                  "Industrial facility visits, oil sector corporate travel, government sites and full day hire itineraries across vital economic zones.",
              },
              {
                id: "kw-cov-4",
                icon: "Plane",
                heading: "Kuwait International Airport (KWI)",
                description:
                  "Punctual airport transfer Kuwait solutions, meet and greet arrivals, luggage handling and live flight tracking across terminals.",
              },
            ],
            actions: [{ label: "Locations Directory", href: "/locations", style: "secondary" }],
          },
          settings: { mediaPosition: "right", containerWidth: "default" },
          appearance: {
            theme: "dark",
            padding: "lg",
            border: true,
            textAlign: "left",
            background: "/locations/www.ab.limo-locations-kuwait-images/image2.jpg",
            backgroundAlt: "Luxury car fleet for Kuwait chauffeur travel parked in formation",
            pattern: false,
          },
        }),
        makeSection("citiesGrid", {
          content: {
            heading: "Destinations in Kuwait",
            description: "",
          },
          settings: { source: "context.cities", columns: "4" },
          appearance: { theme: "darker", padding: "md", border: true, textAlign: "left" },
        }),
        makeSection("serviceCards", {
          variant: "3-column",
          content: {
            eyebrow: "Operating Model",
            heading: "How Partner Trips Work in Kuwait",
            description: "",
          },
          items: [
            {
              id: "kw-wf-1",
              icon: "Briefcase",
              title: "Request",
              description:
                "Submit itinerary details, passenger manifests and vehicle preferences to our central reservation team. Dispatch specialists calculate transfer timings, review regional traffic patterns and assign appropriate luxury car categories tailored to your schedule.",
            },
            {
              id: "kw-wf-2",
              icon: "Shield",
              title: "Plan and Vet",
              description:
                "The Riyadh operations centre audits local partner compliance, driver credentials and vehicle maintenance standards. Assigned chauffeurs receive full route briefings, while vehicle cleanliness and comprehensive commercial insurance are confirmed prior to passenger collection.",
            },
            {
              id: "kw-wf-3",
              icon: "Clock",
              title: "Operate and Report",
              description:
                "Chauffeurs arrive ahead of schedule for seamless execution. The 24/7 central desk tracks vehicle progress in real time, delivers passenger movement updates to travel coordinators and generates transparent billing upon mission completion.",
            },
          ],
          settings: { source: "inline", columns: "3", showHeader: true },
          appearance: { theme: "dark", padding: "lg", border: true, textAlign: "left" },
        }),
        makeSection("mediaContent", {
          variant: "media-left",
          content: {
            eyebrow: "Quality Assurance",
            heading: "Kuwait Partner Standards for Professional Chauffeur Delivery",
            description:
              "AB enforces demanding criteria for partner networks supporting corporate transport Kuwait operations, requiring late model sedan, SUV and luxury van fleets with comprehensive commercial insurance. Every professional chauffeur demonstrates English proficiency, defensive driving skills and immaculate executive presentation throughout the journey. Central management from the AB Riyadh headquarters at Building 3036, Office 08, 2nd Floor, Umar Ibn Abdulaziz Road, Al Malaz (+966 58 111 8720) maintains continuous compliance for every itinerary.\n\nCentral dispatch from Riyadh verifies driver licensing, commercial insurance and vehicle condition before approving any partner trip across Kuwait.",
            mediaCaption:
              "Professional chauffeurs meet rigorous presentation and safety benchmarks for every itinerary.",
            items: [],
            actions: [],
          },
          settings: { mediaPosition: "left", containerWidth: "default" },
          appearance: {
            theme: "darker",
            padding: "lg",
            border: true,
            textAlign: "left",
            background: "/locations/www.ab.limo-locations-kuwait-images/image3.jpg",
            backgroundAlt: "Chauffeur opening a car door for corporate travel in Kuwait",
            pattern: false,
          },
        }),
        makeSection("faq", {
          content: {
            eyebrow: "",
            heading: "Frequently Asked Questions About Kuwait Chauffeur Services",
            description: "",
            items: [],
          },
          items: [],
          settings: { variant: "default", source: "context.faqs" },
          appearance: { theme: "dark", padding: "lg", border: true, textAlign: "center" },
        }),
        makeSection("ctaBanner", {
          content: {
            heading: "Book Chauffeur Service Kuwait Travel",
            description:
              "Arrange reliable executive ground transport across Kuwait with central dispatch management from Riyadh and vetted local premium vehicles.",
          },
          items: [
            { label: "Request a proposal", href: "/quote/tender", style: "primary" },
            { label: "Book a transfer", href: "/quote/tender", style: "secondary" },
          ],
          appearance: { theme: "darker", padding: "lg", border: true, textAlign: "center" },
        }),
      ]),
  },

  oman: {
    slug: "oman",
    name: "Oman",
    heroEyebrow: "",
    heroTitle: "Chauffeur Service in Oman",
    heroDescription:
      "AB arranges every executive chauffeur service Oman journey on request through vetted partners, planned from Riyadh headquarters for corporate and protocol delegations. This managed network provides reliable ground transport across Oman with continuous trip supervision.\n\nCentralised coordination from the operations centre maintains rigorous service standards for every cross border itinerary.",
    heroImage: "/locations/www.ab.limo-locations-oman-images/image1.jpg",
    description:
      "AB arranges every executive chauffeur service Oman journey on request through vetted partners, planned from Riyadh headquarters for corporate and protocol delegations. This managed network provides reliable ground transport across Oman with continuous trip supervision.",
    faqs: [
      {
        q: "How does AB deliver chauffeur service in Oman without a local branch?",
        a: "AB manages Oman journeys through rigorously vetted transportation partners while maintaining 24/7 centralised operations from Riyadh. Direct oversight covers driver verification, vehicle selection and schedule tracking. Clients communicate with their dedicated AB account manager and receive single source invoicing without managing secondary suppliers.",
      },
      {
        q: "What does a Muscat International Airport (MCT) transfer include?",
        a: "A Muscat International Airport (MCT) transfer includes personalised meet and greet service inside the arrivals terminal, luggage assistance and automated flight tracking. The professional chauffeur adjusts arrival timing for flight delays. Passengers proceed directly to an executive vehicle for onward transit to Muscat hotels or corporate offices.",
      },
      {
        q: "Which vehicle classes are available for corporate transport across Oman?",
        a: "Available vehicles include premium sedans such as the Mercedes S Class, full size SUVs such as the Cadillac Escalade and GMC Yukon, and spacious vans such as the Mercedes V Class. Every vehicle meets strict age limits, commercial licensing and insurance standards to support executive business travel across the Sultanate.",
      },
      {
        q: "Can clients arrange full day hire or intercity journeys from Muscat to Sohar?",
        a: "Yes, full day hire and intercity transfers are available on advance request. Chauffeurs handle multi stop corporate itineraries between Muscat, Sohar, Nizwa and regional commercial hubs. Central dispatch in Riyadh coordinates timing, driver rotation and logistics to support productive business travel throughout the day.",
      },
      {
        q: "How far in advance should an executive car service booking be requested?",
        a: "Because trips in Oman are fulfilled through vetted affiliate partners, submitting booking requests at least [Confirm: advance notice requirement] prior to departure is recommended. This window permits central dispatch to verify vehicle readiness, complete driver security checks and coordinate terminal access protocols.",
      },
    ],
    buildSections: (homeLabel, rootLabel) =>
      withOrder([
        makeSection("hero", {
          variant: "with-inquiry-form",
          content: {
            eyebrow: "",
            title: "Chauffeur Service in Oman",
            titleHighlight: "",
            description:
              "AB arranges every executive chauffeur service Oman journey on request through vetted partners, planned from Riyadh headquarters for corporate and protocol delegations. This managed network provides reliable ground transport across Oman with continuous trip supervision.\n\nCentralised coordination from the operations centre maintains rigorous service standards for every cross border itinerary.",
          },
          items: [
            { label: "Request a proposal", href: "/quote/tender", style: "primary" },
            { label: "Book a transfer", href: "/locations", style: "secondary" },
          ],
          appearance: {
            background: "/locations/www.ab.limo-locations-oman-images/image1.jpg",
          },
        }),
        makeSection("breadcrumb", {
          content: { homeLabel, rootLabel },
        }),
        makeSection("mediaContent", {
          variant: "media-right",
          content: {
            eyebrow: "Coverage and Fleet",
            heading: "Executive Chauffeur Service Oman Capabilities",
            description:
              "AB coordinates executive ground transportation throughout the Sultanate for business travel, VIP transport and official delegations. Partner operations cover major commercial zones, industrial ports and international arrival terminals. Corporate transport Oman solutions include dedicated airport transfers, full day hire and hourly chauffeur bookings. Chauffeurs operate premium limousine service fleets including the Mercedes S Class, Cadillac Escalade, GMC Yukon and Mercedes V Class, supporting travel managers with flight tracking and terminal meet and greet services.",
            items: [
              {
                id: "om-cov-1",
                icon: "Map",
                heading: "Muscat",
                description:
                  "Private driver arrangements and corporate mobility across the capital, linking government ministries, diplomatic quarters and commercial districts.",
              },
              {
                id: "om-cov-2",
                icon: "Map",
                heading: "Salalah",
                description:
                  "Executive car service options for southern regional visits, port facilities and commercial operations throughout Dhofar.",
              },
              {
                id: "om-cov-3",
                icon: "Map",
                heading: "Sohar",
                description:
                  "Industrial hub transport supporting maritime logistics, trade corridors and corporate visits to northern manufacturing centres.",
              },
              {
                id: "om-cov-4",
                icon: "Plane",
                heading: "Muscat International Airport (MCT)",
                description:
                  "Dedicated airport transfer Oman journeys and MCT arrivals with meet and greet service, flight tracking and direct onward transit.",
              },
            ],
            actions: [],
          },
          settings: { mediaPosition: "right", containerWidth: "default" },
          appearance: {
            theme: "dark",
            padding: "lg",
            border: true,
            textAlign: "left",
            background: "/locations/www.ab.limo-locations-oman-images/image1.jpg",
            backgroundAlt: "Executive chauffeur service Oman sedan parked in Muscat",
            pattern: false,
          },
        }),
        makeSection("citiesGrid", {
          content: {
            heading: "Destinations in Oman",
            description: "",
          },
          settings: { source: "context.cities", columns: "4" },
          appearance: { theme: "darker", padding: "md", border: true, textAlign: "left" },
        }),
        makeSection("serviceCards", {
          variant: "3-column",
          content: {
            eyebrow: "Operational Workflow",
            heading: "How Chauffeur Service Oman Bookings Operate",
            description: "",
          },
          items: [
            {
              id: "om-wf-1",
              icon: "Briefcase",
              title: "Request",
              description:
                "Submit itinerary specifications through the central dispatch office or via our portal at quote/tender. Detail passenger manifests, vehicle preferences, flight numbers and schedule requirements across Oman.",
              actions: [{ label: "Submit Request", href: "/quote/tender", style: "accent" }],
            },
            {
              id: "om-wf-2",
              icon: "Shield",
              title: "Plan and vet",
              description:
                "The Riyadh operations centre reviews partner availability, audits driver documentation and verifies vehicle maintenance history. Chauffeurs assigned to the trip hold active commercial insurance, clean safety credentials and protocol background clearance.",
            },
            {
              id: "om-wf-3",
              icon: "Clock",
              title: "Operate and report",
              description:
                "Local chauffeurs execute journeys with real time flight monitoring and 24/7 central oversight. Dispatchers track transit progression from Riyadh, providing consolidated billing and route completion summaries to travel managers.",
            },
          ],
          settings: { source: "inline", columns: "3", showHeader: true },
          appearance: { theme: "dark", padding: "lg", border: true, textAlign: "left" },
        }),
        makeSection("introText", {
          content: {
            eyebrow: "Quality Assurance",
            heading: "Safety and Fleet Standards for Chauffeur Service Oman",
            paragraphs: [
              "AB enforces strict operational standards across all partner networks in Oman. Every private driver undergoes comprehensive vetting, identity confirmation and local route assessments. Vehicles in service, including luxury sedan, SUV and executive van models, remain fully licensed, insured and subject to regular mechanical inspections. Operating teams maintain strict non smoking policies, spotless interior presentation and professional etiquette to protect passenger comfort and security on every road.",
            ],
          },
          appearance: { theme: "darker", padding: "lg", border: true, textAlign: "left" },
        }),
        makeSection("faq", {
          content: {
            eyebrow: "Client Enquiries",
            heading: "Frequently Asked Questions About Oman Travel",
            description: "",
            items: [],
          },
          items: [],
          settings: { variant: "default", source: "context.faqs" },
          appearance: { theme: "dark", padding: "lg", border: true, textAlign: "center" },
        }),
        makeSection("ctaBanner", {
          content: {
            heading: "Book Your Chauffeur Service Oman Transfer",
            description:
              "Coordinate your executive ground transportation across Oman through AB central operations in Riyadh.",
          },
          items: [
            { label: "Request a proposal", href: "/quote/tender", style: "primary" },
            { label: "Book a transfer", href: "/locations", style: "secondary" },
          ],
          appearance: { theme: "darker", padding: "lg", border: true, textAlign: "center" },
        }),
      ]),
  },

  qatar: {
    slug: "qatar",
    name: "Qatar",
    heroEyebrow: "",
    heroTitle: "Chauffeur Service Qatar",
    heroDescription:
      "Professional chauffeur service Qatar operations provide executive transport for corporate leaders and official delegations visiting the country. Managed ground mobility coordinates daily schedules with vetted chauffeurs and immaculate vehicles across Doha and neighbouring commercial centres.\n\nTravel requirements in Qatar depend on punctual coordination between flight arrivals, corporate headquarters and major event venues. AB delivers structured journeys with dedicated dispatch oversight for every transfer.",
    heroImage: "/locations/www.ab.limo-locations-qatar-images/image1.jpg",
    description:
      "Professional chauffeur service Qatar operations provide executive transport for corporate leaders and official delegations visiting the country. Managed ground mobility coordinates daily schedules with vetted chauffeurs and immaculate vehicles across Doha and neighbouring commercial centres.",
    faqs: [
      {
        q: "How are chauffeur service Qatar bookings arranged for corporate travel?",
        a: "Corporate travel bookings are coordinated through the AB operations desk by phone or electronic enquiry. Travel managers specify pickup locations, itinerary schedules and preferred luxury vehicle classes for individual executives or delegation groups. Dispatch teams confirm reservation details, driver contact credentials and route plans prior to departure.",
      },
      {
        q: "What vehicle categories are available for private chauffeur hire in Qatar?",
        a: "Clients select from an executive fleet comprising luxury sedan options such as the Mercedes S Class, spacious SUVs including the Cadillac Escalade and GMC Yukon, and multi passenger vans such as the Mercedes V Class. Every vehicle is licensed, commercially insured and maintained to executive standards for corporate transport.",
      },
      {
        q: "How does airport transfer service operate at Hamad International Airport (DOH)?",
        a: "Chauffeurs meet incoming passengers directly inside the terminal arrivals hall at Hamad International Airport (DOH) using clear name boards. Dispatch teams utilise flight tracking to monitor commercial flight schedules, allowing chauffeurs to adjust timing for early landings or flight delays before passenger greeting.",
      },
      {
        q: "Can clients reserve an hourly chauffeur or full day hire across Doha?",
        a: "AB provides flexible hourly chauffeur hire and full day vehicle hire across the capital and neighbouring municipalities. This arrangement suits executives attending multiple business meetings, diplomatic summits or site inspections throughout the working day. The dedicated professional chauffeur remains on call throughout the reserved itinerary window.",
      },
      {
        q: "What safety and licensing standards apply to AB drivers and vehicles?",
        a: "All vehicles and chauffeurs operate under national regulatory transport permits [Confirm licence names and numbers] and commercial passenger insurance policies. Chauffeurs undergo background vetting, defensive driving instruction and corporate protocol training. Dispatch supervisors oversee vehicle movements around the clock to support passenger safety on every route.",
      },
      {
        q: "Is intercity transfer service available between Doha and other municipalities?",
        a: "AB operates intercity transfer services connecting Doha with Lusail, Al Wakrah, Al Khor and surrounding industrial zones. Private driver transport provides direct highway connections without intermediate stops, allowing business travellers to work comfortably between regional appointments. Advance bookings help schedule optimal vehicle dispatch for long distance itineraries.",
      },
      {
        q: "How is dispatch managed for round the clock transportation across Qatar?",
        a: "Continuous operations are coordinated through 24/7 dispatch managed from the primary AB operations centre in Riyadh alongside local operational teams in Doha. Dispatch coordinators track fleet telematics, manage schedule updates and handle special client requests at any hour of the day or night.",
      },
    ],
    buildSections: (homeLabel, rootLabel) =>
      withOrder([
        makeSection("hero", {
          variant: "with-inquiry-form",
          content: {
            eyebrow: "",
            title: "Chauffeur Service Qatar",
            titleHighlight: "",
            description:
              "Professional chauffeur service Qatar operations provide executive transport for corporate leaders and official delegations visiting the country. Managed ground mobility coordinates daily schedules with vetted chauffeurs and immaculate vehicles across Doha and neighbouring commercial centres.\n\nTravel requirements in Qatar depend on punctual coordination between flight arrivals, corporate headquarters and major event venues. AB delivers structured journeys with dedicated dispatch oversight for every transfer.",
          },
          items: [
            { label: "Request a proposal", href: "/quote/tender", style: "primary" },
            { label: "Book a transfer", href: "/book", style: "secondary" },
          ],
          appearance: {
            background: "/locations/www.ab.limo-locations-qatar-images/image1.jpg",
          },
        }),
        makeSection("breadcrumb", {
          content: { homeLabel, rootLabel },
        }),
        makeSection("serviceCards", {
          variant: "3-column",
          content: {
            eyebrow: "",
            heading: "",
            description: "",
          },
          items: [
            {
              id: "qa-stat-1",
              icon: "Map",
              title: "4 Cities Served",
              description:
                "Comprehensive coverage across Doha, Lusail, Al Wakrah and Al Khor.",
            },
            {
              id: "qa-stat-2",
              icon: "Briefcase",
              title: "1 Direct Office",
              description:
                "Local operational base established on Old Airport Road in Doha.",
            },
            {
              id: "qa-stat-3",
              icon: "Plane",
              title: "1 Commercial Airport",
              description:
                "Continuous flight arrival coverage at Hamad International Airport (DOH).",
            },
          ],
          settings: { source: "inline", columns: "3", showHeader: false },
          appearance: { theme: "darker", padding: "md", border: false, textAlign: "left" },
        }),
        makeSection("mediaContent", {
          variant: "media-right",
          content: {
            eyebrow: "",
            heading: "Chauffeur Service Qatar Local Office",
            description:
              "AB Doha coordinates corporate transport and VIP delegation movements across the country from its dedicated hub on Old Airport Road.",
            items: [
              {
                id: "qa-off-1",
                icon: "Map",
                heading: "AB Doha — Qatar Operations Desk",
                description:
                  "Office 110, Building 100, Zone 26, Street 310, Old Airport Road, Doha, Qatar",
              },
              {
                id: "qa-off-2",
                icon: "Phone",
                heading: "+974 7734 3300",
                description: "Direct Qatar Operations Desk contact",
              },
            ],
            actions: [],
          },
          settings: { mediaPosition: "right", containerWidth: "default" },
          appearance: {
            theme: "dark",
            padding: "lg",
            border: true,
            textAlign: "left",
            background: "/locations/www.ab.limo-locations-qatar-images/image1.jpg",
            backgroundAlt: "Map of Qatar displaying executive chauffeur routes and service pins across Doha and Lusail",
            pattern: false,
          },
        }),
        makeSection("serviceCards", {
          variant: "3-column",
          content: {
            eyebrow: "Coverage",
            heading: "Executive Chauffeur Coverage Across Qatar Municipalities",
            description:
              "AB provides managed ground transport networks spanning the principal commercial and residential districts of Qatar. Chauffeurs operate across municipal boundaries to connect business districts, maritime centres and industrial developments with executive sedans and spacious passenger vans. Centralised dispatch maintains punctual coordination for all regional journeys.",
          },
          items: [
            {
              id: "qa-mun-1",
              icon: "Map",
              tag: "Airport Code: [Confirm if needed] | Status: [Confirm: service status if not provided]",
              title: "Doha",
              description:
                "Executive chauffeurs serve commercial districts across Doha including West Bay and Msheireb Downtown. Daily operations support business meetings, government summits and direct airport transfers. Visit the Doha city hub for regional fleet options.",
              actions: [{ label: "Doha", href: "/locations/qatar/doha", style: "accent" }],
            },
            {
              id: "qa-mun-2",
              icon: "Map",
              tag: "Airport Code: [Confirm if needed] | Status: [Confirm: service status if not provided]",
              title: "Lusail",
              description:
                "Chauffeur vehicles connect the modern business towers and entertainment districts of Lusail with the capital. Corporate travellers utilise scheduled daily hire and on demand executive transport. Access dedicated vehicle categories through the Lusail service network.",
              actions: [{ label: "Lusail", href: "/locations/qatar/lusail", style: "accent" }],
            },
            {
              id: "qa-mun-3",
              icon: "Map",
              tag: "Airport Code: [Confirm if needed] | Status: [Confirm: service status if not provided]",
              title: "Al Wakrah",
              description:
                "Transportation services cover maritime facilities, commercial ports and coastal residential communities throughout Al Wakrah. Chauffeurs facilitate seamless transfers to central business hubs and hospitality venues. Explore local transfer capabilities on the Al Wakrah destination page.",
              actions: [{ label: "Al Wakrah", href: "/locations/qatar/al-wakrah", style: "accent" }],
            },
            {
              id: "qa-mun-4",
              icon: "Map",
              tag: "Airport Code: [Confirm if needed] | Status: [Confirm: service status if not provided]",
              title: "Al Khor",
              description:
                "Fleet operations support energy sector facilities, coastal projects and residential districts across Al Khor. Dedicated transport provides reliable links to northern industrial hubs and southern corporate centres. Discover complete route details on the Al Khor location profile.",
              actions: [{ label: "Al Khor", href: "/locations/qatar/al-khor", style: "accent" }],
            },
          ],
          settings: { source: "inline", columns: "2", showHeader: true },
          appearance: { theme: "darker", padding: "lg", border: true, textAlign: "left" },
        }),
        makeSection("citiesGrid", {
          content: {
            heading: "Qatar Municipalities",
            description: "",
          },
          settings: { source: "context.cities", columns: "4" },
          appearance: { theme: "dark", padding: "md", border: true, textAlign: "left" },
        }),
        makeSection("mediaContent", {
          variant: "media-right",
          content: {
            eyebrow: "Aviation Terminals",
            heading: "Hamad International Airport DOH Chauffeur Transfers in Qatar",
            description:
              "Travellers arriving at Hamad International Airport (DOH) receive terminal meet and greet coordination with professional chauffeurs. Flight tracking allows drivers to adapt to schedule variations before aircraft arrival at DOH. Access terminal transfer bookings through the Hamad International Airport DOH transfer desk.",
            items: [
              {
                id: "qa-apt-1",
                icon: "Plane",
                heading: "Hamad International (DOH) · Commercial Hub",
                description:
                  "Terminal meet and greet coordination with flight tracking and direct luggage transfer to executive vehicles.",
              },
            ],
            actions: [
              {
                label: "Hamad International Airport DOH",
                href: "/locations/qatar/doha/airport/hamad-international-airport",
                style: "primary",
              },
            ],
          },
          settings: { mediaPosition: "right", containerWidth: "default" },
          appearance: {
            theme: "darker",
            padding: "lg",
            border: true,
            textAlign: "left",
            background: "/locations/www.ab.limo-locations-qatar-images/image2.jpg",
            backgroundAlt: "Executive chauffeur beside luxury vehicle outside Hamad International Airport DOH in Qatar",
            pattern: false,
          },
        }),
        makeSection("serviceCards", {
          variant: "3-column",
          content: {
            eyebrow: "Mobility Solutions",
            heading: "Chauffeur Service Qatar Mobility Capabilities",
            description:
              "AB coordinates comprehensive ground transport arrangements designed for multinational corporations, conference planners and visiting delegations across Qatar. Clients select specific service categories tailored to itinerary duration, passenger volume and protocol requirements.",
          },
          items: [
            {
              id: "qa-cap-1",
              icon: "Crown",
              title: "Chauffeur & VIP",
              description:
                "Private driver bookings feature luxury car models such as the Mercedes S Class for executive journeys and diplomatic protocol.",
            },
            {
              id: "qa-cap-2",
              icon: "Plane",
              title: "Airport Transfers",
              description:
                "Dependable airport transfer Qatar journeys link corporate travellers directly to international flight departures with flight tracking and luggage assistance.",
            },
            {
              id: "qa-cap-3",
              icon: "Briefcase",
              title: "Corporate Transportation",
              description:
                "Dedicated corporate transportation Qatar services provide corporate travel solutions for business meetings and multinational executive roadshows.",
            },
            {
              id: "qa-cap-4",
              icon: "Users",
              title: "Event Transportation",
              description:
                "Event mobility coordinators manage multi vehicle fleets including the Cadillac Escalade and GMC Yukon for summits, state functions and major exhibitions.",
            },
            {
              id: "qa-cap-5",
              icon: "Users",
              title: "Bus & Coach Hire",
              description:
                "Reliable bus rental Qatar solutions transport large delegations, conference attendees and staff shuttles in comfortable passenger coaches.",
            },
            {
              id: "qa-cap-6",
              icon: "Map",
              title: "Tourism Transportation",
              description:
                "Premium limousine service Qatar itineraries and flexible intercity transfer Qatar routes allow private guests to explore cultural landmarks at an unhurried pace.",
            },
          ],
          settings: { source: "inline", columns: "3", showHeader: true },
          appearance: { theme: "dark", padding: "lg", border: true, textAlign: "left" },
        }),
        makeSection("mediaContent", {
          variant: "media-left",
          content: {
            eyebrow: "Highway Corridors",
            heading: "Intercity Highway Routes Across Qatar",
            description:
              "Intercity transit corridors link key commercial centres, ports and aviation facilities across the country. Chauffeurs navigate primary expressways with precision to support punctual itineraries between urban hubs.",
            items: [
              {
                id: "qa-hw-1",
                icon: "Map",
                heading: "Doha to Lusail",
                description:
                  "Connecting the capital business centre with Lusail Marina and commercial headquarters along the modern expressway corridor. Chauffeurs operate executive sedans and SUVs for daily meetings. Travel time: [Confirm: travel time].",
              },
              {
                id: "qa-hw-2",
                icon: "Map",
                heading: "Doha to Al Wakrah",
                description:
                  "Linking central Doha with southern port developments, logistics hubs and coastal hospitality developments. Private driver hire provides uninterrupted travel for corporate teams. Travel time: [Confirm: travel time].",
              },
              {
                id: "qa-hw-3",
                icon: "Map",
                heading: "Doha to Al Khor",
                description:
                  "Direct highway transport between downtown Doha and northern industrial sites, research centres and community sports venues. Full day hire options support multi stop operational visits. Travel time: [Confirm: travel time].",
              },
              {
                id: "qa-hw-4",
                icon: "Plane",
                heading: "Hamad International Airport (DOH) to West Bay",
                description:
                  "Direct executive arrivals route from Hamad International Airport (DOH) to the diplomatic and commercial skyline of West Bay. Professional chauffeurs handle luggage and flight schedule updates. Travel time: [Confirm: travel time].",
              },
            ],
            actions: [],
          },
          settings: { mediaPosition: "left", containerWidth: "default" },
          appearance: {
            theme: "darker",
            padding: "lg",
            border: true,
            textAlign: "left",
            background: "/locations/www.ab.limo-locations-qatar-images/image3.jpg",
            backgroundAlt: "Executive Mercedes V Class traveling on highway between Doha and Lusail in Qatar",
            pattern: false,
          },
        }),
        makeSection("introText", {
          content: {
            eyebrow: "Governance",
            heading: "Licensing and Safety Standards Across Qatar",
            paragraphs: [
              "AB maintains strict operational standards across Qatar through fully licensed and commercially insured vehicle fleets. All operations comply with statutory transport regulations [Confirm licence names and numbers] enforced by national transit authorities. Professional chauffeurs complete protocol and safety training before assignment to corporate travel itineraries. Centralised 24/7 dispatch from the Riyadh operations centre coordinates vehicle telematics and driver schedules, supporting safe and reliable ground mobility for every client journey.",
            ],
          },
          appearance: { theme: "dark", padding: "lg", border: true, textAlign: "left" },
        }),
        makeSection("faq", {
          content: {
            eyebrow: "Questions",
            heading: "Frequently Asked Questions About Chauffeur Travel in Qatar",
            description: "",
            items: [],
          },
          items: [],
          settings: { variant: "default", source: "context.faqs" },
          appearance: { theme: "darker", padding: "lg", border: true, textAlign: "center" },
        }),
        makeSection("ctaBanner", {
          content: {
            heading: "Book Your Chauffeur Service Qatar Experience",
            description:
              "Reserve premium chauffeur service Qatar transportation with AB for seamless corporate travel, VIP delegation logistics and airport transfers across the country.",
          },
          items: [
            { label: "Request a proposal", href: "/quote/tender", style: "primary" },
            { label: "Book a transfer", href: "/book", style: "secondary" },
          ],
          appearance: { theme: "dark", padding: "lg", border: true, textAlign: "center" },
        }),
      ]),
  },

  "saudi-arabia": {
    slug: "saudi-arabia",
    name: "Saudi Arabia",
    heroEyebrow: "",
    heroTitle: "Chauffeur Service in Saudi Arabia",
    heroDescription:
      "Deploying a professional chauffeur service Saudi Arabia provides corporate leaders, visiting delegations and international enterprises with punctual ground transport across the Kingdom. Centralised dispatch operates round the clock from the capital to coastal commercial centres, deploying vetted drivers and premium vehicles for demanding itineraries. Every reservation delivers coordinated travel designed for the operational schedules of institutional clients.\n\nTravel requirements across the Arabian Peninsula call for strict compliance, geographic familiarity and route flexibility. Fleet management coordinators monitor terminal logistics, regional highway connections and diplomatic protocol standards to support seamless executive movements. Selecting a dedicated private transport provider establishes direct operational control for corporate engagements and complex event programmes.",
    heroImage: "/locations/www.ab.limo-locations-saudi-arabia-images/image1.jpg",
    description:
      "Deploying a professional chauffeur service Saudi Arabia provides corporate leaders, visiting delegations and international enterprises with punctual ground transport across the Kingdom. Centralised dispatch operates round the clock from the capital to coastal commercial centres, deploying vetted drivers and premium vehicles for demanding itineraries.",
    faqs: [
      {
        q: "What vehicles are available for chauffeur service Saudi Arabia bookings?",
        a: "Our fleet features premium executive sedans including the Mercedes S Class, spacious luxury SUVs such as the Cadillac Escalade and GMC Yukon, and executive vans like the Mercedes V Class. Group journeys utilise luxury coaches and modern minibuses. All vehicles provide climate control, leather upholstery and meticulous presentation for executive travellers.",
      },
      {
        q: "How does airport transfer meet and greet operate at RUH and regional airports?",
        a: "Chauffeurs track incoming flights into King Khalid International Airport (RUH) and other national hubs in real time to adapt to flight timing changes. Drivers greet arriving passengers in the terminal arrivals hall holding a personalised name board. The chauffeur assists with luggage before guiding passengers directly to the waiting vehicle.",
      },
      {
        q: "Can corporate travel managers book hourly chauffeur and full day hire?",
        a: "Yes, corporate clients can arrange hourly bookings, full day hire and continuous multi day coverage across all major Saudi cities. Chauffeurs remain on standby throughout your itinerary, accommodating unscheduled route changes, business meetings and administrative errands without delay. Reservations are managed through dedicated corporate accounts with consolidated monthly invoicing.",
      },
      {
        q: "What standards apply to drivers delivering limousine service Saudi Arabia?",
        a: "Chauffeurs represent the highest professional standards, possessing thorough local geographic knowledge, defensive driving credentials and corporate protocol etiquette. Drivers are fully licensed under Kingdom transport regulations and undergo regular background checks. Multilingual drivers are available upon request to assist foreign commercial delegations and international executive teams.",
      },
      {
        q: "How are intercity transfers coordinated between major business centres?",
        a: "Intercity transfers operate as private, non stop road journeys connecting urban centres such as Riyadh, Dammam, Jeddah and regional industrial locations. Central dispatch tracks vehicle movements continuously across highway corridors to maintain scheduling precision. Passengers enjoy quiet cabins equipped with phone charging facilities, climate management and ample luggage capacity.",
      },
      {
        q: "How does AB manage large scale event transportation and bus rental in Saudi Arabia?",
        a: "AB coordinates comprehensive ground logistics for summits, trade expos and state functions with dedicated dispatchers and on site staging controllers. Fleets combine executive sedans for speakers with luxury coaches for attendees, managing coordinated shuttle schedules between hotels, airports and venues. Account managers oversee real time routing and vehicle positioning throughout the event.",
      },
      {
        q: "What is the reservation process and operating schedule for chauffeur dispatch?",
        a: "Reservations can be submitted online or directly to our central Riyadh operations centre, operating twenty four hours a day, seven days a week. Dispatchers assign vehicles, share chauffeur contact details prior to pickup, and supervise route progress. Institutional accounts receive priority scheduling and dedicated transport coordination for urgent executive requirements.",
      },
      {
        q: "Are all vehicles and passengers covered by commercial insurance?",
        a: "All fleet vehicles maintain comprehensive commercial insurance policies meeting all regulatory mandates established by the transport general authority in Saudi Arabia. Regular safety audits and preventive maintenance programmes ensure fleet reliability. Corporate travel managers receive full documentation verifying compliance and driver credentials upon account activation.",
      },
    ],
    buildSections: (homeLabel, rootLabel) =>
      withOrder([
        makeSection("hero", {
          variant: "with-inquiry-form",
          content: {
            eyebrow: "",
            title: "Chauffeur Service in Saudi Arabia",
            titleHighlight: "",
            description:
              "Deploying a professional chauffeur service Saudi Arabia provides corporate leaders, visiting delegations and international enterprises with punctual ground transport across the Kingdom. Centralised dispatch operates round the clock from the capital to coastal commercial centres, deploying vetted drivers and premium vehicles for demanding itineraries. Every reservation delivers coordinated travel designed for the operational schedules of institutional clients.\n\nTravel requirements across the Arabian Peninsula call for strict compliance, geographic familiarity and route flexibility. Fleet management coordinators monitor terminal logistics, regional highway connections and diplomatic protocol standards to support seamless executive movements. Selecting a dedicated private transport provider establishes direct operational control for corporate engagements and complex event programmes.",
          },
          items: [
            { label: "Request a proposal", href: "/locations/saudi-arabia/riyadh", style: "primary" },
            { label: "Book a transfer", href: "/locations/saudi-arabia/jeddah", style: "secondary" },
          ],
          appearance: {
            background: "/locations/www.ab.limo-locations-saudi-arabia-images/image1.jpg",
          },
        }),
        makeSection("breadcrumb", {
          content: { homeLabel, rootLabel },
        }),
        makeSection("serviceCards", {
          variant: "3-column",
          content: {
            eyebrow: "",
            heading: "",
            description: "",
          },
          items: [
            {
              id: "sa-stat-1",
              icon: "Map",
              title: "12 Cities",
              description:
                "Comprehensive operational coverage across primary commercial, governmental and industrial destinations nationwide.",
            },
            {
              id: "sa-stat-2",
              icon: "Briefcase",
              title: "1 Central Office",
              description:
                "Headquarters and twenty four seven dispatch operations based in Riyadh to manage regional movements.",
            },
            {
              id: "sa-stat-3",
              icon: "Plane",
              title: "10 Airports",
              description:
                "Direct terminal pickups and airside coordination across all major domestic and international aviation hubs.",
            },
          ],
          settings: { source: "inline", columns: "3", showHeader: false },
          appearance: { theme: "darker", padding: "md", border: false, textAlign: "left" },
        }),
        makeSection("mediaContent", {
          variant: "media-right",
          content: {
            eyebrow: "",
            heading: "AB Operations Centre in Saudi Arabia",
            description:
              "AB coordinates all regional journeys from its operational headquarters located in the capital. The central facility manages active driver tracking, corporate account reservations, protocol movements and multi city route assignments across the Kingdom. Professional dispatchers supervise fleet deployment day and night to maintain strict timing across every commercial corridor.",
            items: [
              {
                id: "sa-hq-1",
                icon: "Briefcase",
                heading: "AB Riyadh Headquarters",
                description:
                  "Headquarters and 24/7 dispatch centre managing Kingdom wide transfers, VIP movements and corporate fleet logistics.",
              },
              {
                id: "sa-hq-2",
                icon: "Map",
                heading: "Building 3036, Office 08, 2nd Floor, Umar Ibn Abdulaziz Road, Al Malaz, Riyadh, Saudi Arabia",
                description: "+966 58 111 8720",
              },
            ],
            actions: [],
          },
          settings: { mediaPosition: "right", containerWidth: "default" },
          appearance: {
            theme: "dark",
            padding: "lg",
            border: true,
            textAlign: "left",
            background: "/locations/www.ab.limo-locations-saudi-arabia-images/image1.jpg",
            backgroundAlt: "Chauffeur service Saudi Arabia vehicle fleet mapped across regional transport hubs",
            pattern: false,
          },
        }),
        makeSection("serviceCards", {
          variant: "3-column",
          content: {
            eyebrow: "Coverage",
            heading: "Executive Car Service Across Saudi Arabia Cities",
            description:
              "AB maintains an active operational presence throughout the commercial, cultural and administrative centres of the country. Chauffeur assignments span metropolitan business districts, historic destinations, industrial zones and emerging economic developments. Dedicated local teams support uninterrupted transport for institutional clients across all key urban regions.",
          },
          items: [
            {
              id: "sa-city-1",
              icon: "Map",
              tag: "RUH · Headquarters and Full Operational Hub",
              title: "Riyadh",
              description:
                "Airport Code: RUH. Operational Status: Headquarters and Full Operational Hub. AB delivers premium executive mobility, government protocol transport and financial district transfers throughout the capital city.",
              actions: [{ label: "Riyadh Chauffeur Service", href: "/locations/saudi-arabia/riyadh", style: "accent" }],
            },
            {
              id: "sa-city-2",
              icon: "Map",
              tag: "JED · Active Commercial Hub",
              title: "Jeddah",
              description:
                "Airport Code: JED. Operational Status: Active Commercial Hub. Chauffeurs support Red Sea commercial enterprises, coastal trade offices, diplomatic missions and regional corporate meetings with luxury sedans and spacious SUVs.",
              actions: [{ label: "Jeddah Chauffeur Service", href: "/locations/saudi-arabia/jeddah", style: "accent" }],
            },
            {
              id: "sa-city-3",
              icon: "Map",
              tag: "DMM · Active Industrial Hub",
              title: "Dammam",
              description:
                "Airport Code: DMM. Operational Status: Active Industrial Hub. Dedicated drivers handle corporate transfers across the Eastern Province administrative centres, deepwater ports and major commercial supply facilities.",
              actions: [{ label: "Dammam Chauffeur Service", href: "/locations/saudi-arabia/dammam", style: "accent" }],
            },
            {
              id: "sa-city-4",
              icon: "Map",
              tag: "DMM · Active Corporate Hub",
              title: "Al Khobar",
              description:
                "Airport Code: DMM. Operational Status: Active Corporate Hub. Providing executive car service solutions for energy sector headquarters, international business parks and interstate commercial travel connecting regional industrial complexes.",
              actions: [{ label: "Al Khobar Chauffeur Service", href: "/locations/saudi-arabia/al-khobar", style: "accent" }],
            },
            {
              id: "sa-city-5",
              icon: "Map",
              tag: "JED · Full Route Coverage",
              title: "Makkah",
              description:
                "Airport Code: JED. Operational Status: Full Route Coverage. Specialised intercity arrivals and hospitality transfers tailored for institutional groups, diplomatic guests and official delegations requiring dedicated private driver arrangements.",
              actions: [{ label: "Makkah Chauffeur Service", href: "/locations/saudi-arabia/mecca", style: "accent" }],
            },
            {
              id: "sa-city-6",
              icon: "Map",
              tag: "MED · Full Route Coverage",
              title: "Madinah",
              description:
                "Airport Code: MED. Operational Status: Full Route Coverage. Coordinated passenger transport for official delegations, visiting dignitaries and executive travellers connecting between urban terminals and central hospitality quarters.",
              actions: [{ label: "Madinah Chauffeur Service", href: "/locations/saudi-arabia/medina", style: "accent" }],
            },
            {
              id: "sa-city-7",
              icon: "Map",
              tag: "ULH · Heritage and Event Coverage",
              title: "AlUla",
              description:
                "Airport Code: ULH. Operational Status: Heritage and Event Coverage. High specification executive SUVs and premium sedans operating across luxury resort developments, global cultural summits and desert conference destinations.",
              actions: [{ label: "AlUla Chauffeur Service", href: "/locations/saudi-arabia/al-ula", style: "accent" }],
            },
            {
              id: "sa-city-8",
              icon: "Map",
              tag: "TUU · Regional Gateway Coverage",
              title: "Tabuk",
              description:
                "Airport Code: TUU. Operational Status: Regional Gateway Coverage. Professional chauffeurs handle business transit, industrial consultations and developmental travel across the expansive northwestern transport corridors.",
              actions: [{ label: "Tabuk Chauffeur Service", href: "/locations/saudi-arabia/tabuk", style: "accent" }],
            },
            {
              id: "sa-city-9",
              icon: "Map",
              tag: "NUM · Project Corridor Coverage",
              title: "NEOM",
              description:
                "Airport Code: NUM. Operational Status: Project Corridor Coverage. Managed ground transportation supporting sustainable development leadership, engineering consultancies and international project teams across forward operating sites.",
              actions: [{ label: "NEOM Chauffeur Service", href: "/locations/saudi-arabia/neom", style: "accent" }],
            },
            {
              id: "sa-city-10",
              icon: "Map",
              tag: "AHB · Southern Province Coverage",
              title: "Abha",
              description:
                "Airport Code: AHB. Operational Status: Southern Province Coverage. Transport solutions operating through the Asir highland territory, serving regional administrative bodies, seasonal symposiums and institutional travel needs.",
              actions: [{ label: "Abha Chauffeur Service", href: "/locations/saudi-arabia/abha", style: "accent" }],
            },
            {
              id: "sa-city-11",
              icon: "Map",
              tag: "ELQ · Central Agricultural & Commercial Hub",
              title: "Al Qassim",
              description:
                "Airport Code: ELQ. Operational Status: Central Agricultural and Commercial Hub. Reliable corporate transportation connecting regional food production leadership, university forums and trade centres with the central capital.",
              actions: [{ label: "Al Qassim Chauffeur Service", href: "/locations/saudi-arabia/al-qasim", style: "accent" }],
            },
            {
              id: "sa-city-12",
              icon: "Map",
              tag: "GIZ · Port & Logistics Corridor Coverage",
              title: "Jizan",
              description:
                "Airport Code: GIZ. Operational Status: Port and Logistics Corridor Coverage. Executive vehicle services serving maritime trading offices, economic city industrial complexes and southern provincial administrative headquarters.",
              actions: [{ label: "Jizan Chauffeur Service", href: "/locations/saudi-arabia/jizan", style: "accent" }],
            },
          ],
          settings: { source: "inline", columns: "3", showHeader: true },
          appearance: { theme: "darker", padding: "lg", border: true, textAlign: "left" },
        }),
        makeSection("citiesGrid", {
          content: {
            heading: "All Cities Covered in Saudi Arabia",
            description: "",
          },
          settings: { source: "context.cities", columns: "4" },
          appearance: { theme: "dark", padding: "md", border: true, textAlign: "left" },
        }),
        makeSection("serviceCards", {
          variant: "3-column",
          content: {
            eyebrow: "Airport Coverage",
            heading: "Airport Transfer Saudi Arabia and RUH Chauffeur Service",
            description:
              "Navigating major commercial aviation gateways requires active flight tracking, scheduled curb arrivals and terminal meet and greet procedures. Chauffeurs monitor incoming flight schedules directly through flight tracking systems to accommodate early arrivals or unexpected airspace delays. Clients receive prompt greetings inside the arrivals terminal before moving smoothly to their awaiting luxury vehicle.\n\nAB coordinates individual executive pickups alongside large scale delegation arrivals across primary international and regional airport hubs. Dedicated luggage assistance, private terminal coordination and discreet gate transfers support corporate leaders upon landing. Consistent standards apply whether scheduling an airport transfer in the capital or coordinating travel through coastal terminals.",
          },
          items: [
            {
              id: "sa-apt-1",
              icon: "Plane",
              tag: "RUH · Riyadh",
              title: "King Khalid International Airport (RUH)",
              description: "Terminal meet and greet with premium business transfers",
              actions: [{ label: "King Khalid International Airport RUH", href: "/locations/saudi-arabia/riyadh/airport/king-khalid-international-airport", style: "accent" }],
            },
            {
              id: "sa-apt-2",
              icon: "Plane",
              tag: "JED · Jeddah",
              title: "King Abdulaziz International Airport (JED)",
              description: "Flight tracking and coastal corporate transit",
              actions: [{ label: "King Abdulaziz International Airport JED", href: "/locations/saudi-arabia/jeddah/airport/king-abdulaziz-international-airport", style: "accent" }],
            },
            {
              id: "sa-apt-3",
              icon: "Plane",
              tag: "MED · Madinah",
              title: "Prince Mohammad bin Abdulaziz International Airport (MED)",
              description: "Dedicated arrivals for institutional delegations",
              actions: [{ label: "Prince Mohammad bin Abdulaziz MED", href: "/locations/saudi-arabia/medina/airport/prince-mohammad-bin-abdulaziz-international-airport", style: "accent" }],
            },
            {
              id: "sa-apt-4",
              icon: "Plane",
              tag: "DMM · Dammam",
              title: "King Fahd International Airport (DMM)",
              description: "Eastern Province energy corridor pickups",
              actions: [{ label: "King Fahd International Airport DMM", href: "/locations/saudi-arabia/dammam/airport/king-fahd-international-airport", style: "accent" }],
            },
            {
              id: "sa-apt-5",
              icon: "Plane",
              tag: "ULH · AlUla",
              title: "Prince Abdulmajeed bin Abdulaziz International Airport (ULH)",
              description: "High end luxury resort and event transfers",
              actions: [{ label: "AlUla Airport Transfers", href: "/locations/saudi-arabia/al-ula", style: "accent" }],
            },
            {
              id: "sa-apt-6",
              icon: "Plane",
              tag: "TUU · Tabuk",
              title: "Prince Sultan bin Abdulaziz Airport (TUU)",
              description: "Northwestern industrial and corporate transfers",
              actions: [{ label: "Tabuk Airport Transfers", href: "/locations/saudi-arabia/tabuk", style: "accent" }],
            },
            {
              id: "sa-apt-7",
              icon: "Plane",
              tag: "NUM · NEOM",
              title: "NEOM Bay Airport (NUM)",
              description: "Development site access and VIP logistics",
              actions: [{ label: "NEOM Bay Airport Transfers", href: "/locations/saudi-arabia/neom", style: "accent" }],
            },
            {
              id: "sa-apt-8",
              icon: "Plane",
              tag: "AHB · Abha",
              title: "Abha International Airport (AHB)",
              description: "Highland administrative and hospitality transport",
              actions: [{ label: "Abha Airport Transfers", href: "/locations/saudi-arabia/abha", style: "accent" }],
            },
            {
              id: "sa-apt-9",
              icon: "Plane",
              tag: "ELQ · Al Qassim",
              title: "Prince Naif bin Abdulaziz International Airport (ELQ)",
              description: "Central province business schedule transit",
              actions: [{ label: "Al Qassim Airport Transfers", href: "/locations/saudi-arabia/al-qasim", style: "accent" }],
            },
            {
              id: "sa-apt-10",
              icon: "Plane",
              tag: "GIZ · Jizan",
              title: "King Abdullah bin Abdulaziz Airport (GIZ)",
              description: "Southern maritime and industrial site transfers",
              actions: [{ label: "Jizan Airport Transfers", href: "/locations/saudi-arabia/jizan", style: "accent" }],
            },
          ],
          settings: { source: "inline", columns: "3", showHeader: true },
          appearance: { theme: "darker", padding: "lg", border: true, textAlign: "left" },
        }),
        makeSection("serviceCards", {
          variant: "3-column",
          content: {
            eyebrow: "Our Capabilities",
            heading: "Corporate Transportation and Chauffeur Services in Saudi Arabia",
            description:
              "AB delivers managed road transport solutions designed for corporate organisations, state entities and event planners. Fleets comprise luxury sedans such as the Mercedes S Class, executive SUVs including the Cadillac Escalade and GMC Yukon, alongside the Mercedes V Class for executive group travel. Every category provides climate controlled interiors, professional drivers and comprehensive commercial insurance for total operational peace of mind.\n\nArrangements range from single airport transfers to full day hire and multi week project bookings. Corporate travel accounts benefit from itemised billing, direct dispatch desk access and custom itinerary coordination. Group movements operate smoothly through dedicated bus rental Saudi Arabia options matching larger delegate counts.",
          },
          items: [
            {
              id: "sa-cap-1",
              icon: "Crown",
              title: "Chauffeur and VIP",
              description:
                "Executive travel utilizing prestige sedans and SUVs with professional protocol trained chauffeurs for executive roadshows and board level mobility.",
            },
            {
              id: "sa-cap-2",
              icon: "Plane",
              title: "Airport Transfers",
              description:
                "Punctual arrivals and departures featuring flight monitoring, baggage handling and courteous terminal reception across the country.",
            },
            {
              id: "sa-cap-3",
              icon: "Briefcase",
              title: "Corporate Transportation",
              description:
                "Enterprise ground transport offering structured corporate accounts, recurring staff shuttles and multi city business itineraries.",
            },
            {
              id: "sa-cap-4",
              icon: "Users",
              title: "Event Transportation",
              description:
                "Coordinated vehicle fleets, on site movement coordinators and managed staging areas for major summits, exhibitions and official conferences.",
            },
            {
              id: "sa-cap-5",
              icon: "Users",
              title: "Bus and Coach Hire",
              description:
                "Scalable group transport solutions utilising modern passenger coaches and minibuses for corporate events, staff transfers and site visits.",
            },
            {
              id: "sa-cap-6",
              icon: "Map",
              title: "Tourism Transportation",
              description:
                "Chauffeured regional travel and cultural site transfers delivering comfortable long distance travel for visiting delegations.",
            },
          ],
          settings: { source: "inline", columns: "3", showHeader: true },
          appearance: { theme: "dark", padding: "lg", border: true, textAlign: "left" },
        }),
        makeSection("serviceCards", {
          variant: "3-column",
          content: {
            eyebrow: "Highway corridors",
            heading: "Intercity Transfer Saudi Arabia Route Connections",
            description:
              "Long distance intercity transit across modern highway networks requires experienced drivers, comfortable luxury vehicles and rigorous vehicle maintenance. AB coordinates direct point to point intercity transfer Saudi Arabia services, removing the delays associated with regional airport connections and crowded domestic terminals. Passengers can conduct business meetings, review documents or rest within quiet vehicle cabins during regional transit.",
          },
          items: [
            {
              id: "sa-rt-1",
              icon: "Map",
              title: "Riyadh to Dammam",
              description:
                "Connecting the political capital with the Eastern Province commercial centre along Highway 40. Travel time: [Confirm: travel time].",
              actions: [{ label: "View Route", href: "/locations/saudi-arabia/riyadh/routes/riyadh-to-dammam", style: "accent" }],
            },
            {
              id: "sa-rt-2",
              icon: "Map",
              title: "Riyadh to Al Qassim",
              description:
                "Direct transit linking corporate headquarters in Riyadh with central commercial and agricultural districts. Travel time: [Confirm: travel time].",
              actions: [{ label: "View Route", href: "/locations/saudi-arabia/riyadh/routes/riyadh-to-al-qasim", style: "accent" }],
            },
            {
              id: "sa-rt-3",
              icon: "Map",
              title: "Jeddah to Makkah",
              description:
                "Smooth road connection between coastal commercial offices and the holy city for institutional delegations. Travel time: [Confirm: travel time].",
              actions: [{ label: "View Route", href: "/locations/saudi-arabia/jeddah/routes/jeddah-to-mecca", style: "accent" }],
            },
            {
              id: "sa-rt-4",
              icon: "Map",
              title: "Makkah to Madinah",
              description:
                "Intercity highway passage facilitating official guest transport between the two holy cities. Travel time: [Confirm: travel time].",
              actions: [{ label: "View Route", href: "/locations/saudi-arabia/mecca/routes/mecca-to-medina", style: "accent" }],
            },
            {
              id: "sa-rt-5",
              icon: "Map",
              title: "Madinah to AlUla",
              description:
                "Scenic northern transit route transporting international conference attendees and cultural delegations. Travel time: [Confirm: travel time].",
              actions: [{ label: "View Route", href: "/locations/saudi-arabia/medina/routes/medina-to-al-ula", style: "accent" }],
            },
            {
              id: "sa-rt-6",
              icon: "Map",
              title: "Tabuk to NEOM",
              description:
                "Crucial development corridor connecting northwestern aviation facilities with forward project zones. Travel time: [Confirm: travel time].",
              actions: [{ label: "View Route", href: "/locations/saudi-arabia/tabuk/routes/tabuk-to-neom", style: "accent" }],
            },
            {
              id: "sa-rt-7",
              icon: "Map",
              title: "Dammam to Al Khobar",
              description:
                "Rapid metropolitan corridor linking major energy corporate parks, regional commercial offices and marine ports. Travel time: [Confirm: travel time].",
              actions: [{ label: "View Route", href: "/locations/saudi-arabia/dammam/routes/dammam-to-al-khobar", style: "accent" }],
            },
          ],
          settings: { source: "inline", columns: "3", showHeader: true },
          appearance: { theme: "darker", padding: "lg", border: true, textAlign: "left" },
        }),
        makeSection("introText", {
          content: {
            eyebrow: "Compliance",
            heading: "Operating Licences and Vehicle Standards in Saudi Arabia",
            paragraphs: [
              "Operating commercial passenger fleets across the Kingdom requires strict adherence to national transport authority regulations, municipal permits and comprehensive commercial insurance frameworks. AB operates fully within regulatory parameters [Confirm licence names and numbers] to uphold passenger safety and operational legality on every route. Every vehicle undergoes routine mechanical inspections and safety verification before deployment.",
              "Professional chauffeurs complete rigorous background verifications, defensive driving instruction and protocol training. Fleet units feature real time tracking systems and safety monitoring equipment to support secure travel for executive passengers across regional highways.",
            ],
          },
          appearance: { theme: "dark", padding: "lg", border: true, textAlign: "left" },
        }),
        makeSection("faq", {
          content: {
            eyebrow: "Questions",
            heading: "Frequently Asked Questions About Chauffeur Service Saudi Arabia",
            description: "",
            items: [],
          },
          items: [],
          settings: { variant: "default", source: "context.faqs" },
          appearance: { theme: "darker", padding: "lg", border: true, textAlign: "center" },
        }),
        makeSection("ctaBanner", {
          content: {
            heading: "Reserve Your Chauffeur Service Saudi Arabia With AB",
            description:
              "Coordinate your executive travel across the Kingdom through our central operations centre, delivering punctual arrivals, premium vehicles and licensed professional drivers for every corporate schedule.",
            subheading: "Plan Your Executive Journey",
            subdescription:
              "Speak with our central dispatch team in Riyadh to coordinate corporate fleet requirements, airport transfers or VIP delegation transport.",
          },
          items: [
            { label: "Request a proposal", href: "/locations/saudi-arabia/riyadh", style: "primary" },
            { label: "Book a transfer", href: "/locations/saudi-arabia/jeddah", style: "secondary" },
          ],
          appearance: { theme: "dark", padding: "lg", border: true, textAlign: "center" },
        }),
      ]),
  },
};
