export interface SketchVehicle {
  /** Real fleet image (cutout/photo) from the fleet page — replaces the old vector sketch. */
  src: string;
  label: string;
}

export interface SketchService {
  id: string;
  /** Label used in the sticky sidebar list. */
  name: string;
  /** Shorter label used in the hero tab row when present. */
  tabName?: string;
  /** Full section heading (H2). */
  heading: string;
  /** Intro paragraphs rendered above the section image. */
  intro: string[];
  /** Paragraph rendered below the section image. */
  detail: string;
  points: string[];
  /** Locale-relative path — prefix with localeBase(lang) at render time. */
  href: string;
  /** Scene photo for this section. */
  image: string;
  imageAlt: string;
  /** Fleet vehicle shown in the side panel instead of the vector silhouette. */
  vehicle: SketchVehicle;
}

const IMGS = "/services/www.ab.limo-services-images";

export const SKETCH_SERVICES: SketchService[] = [
  {
    id: "chauffeur",
    name: "Chauffeur and VIP",
    heading: "01 Chauffeur and VIP ground transportation services",
    intro: [
      "Executive mobility requires meticulous operational preparation and discretion across every Gulf market. AB assigns dedicated chauffeurs to corporate leaders, diplomats and visiting VIPs across Riyadh, Jeddah, Dubai, Abu Dhabi and Doha. Our central operations team verifies route itineraries, terminal access passes and passenger preferences prior to departure.",
      "Clients requiring a private driver or executive vehicle in Doha can book our dedicated qatar limousine service with 24/7 dispatch. Organisations seeking professional chauffeur and transportation services rely on our protocol trained chauffeurs to uphold the highest executive standards.",
    ],
    detail:
      "Dedicated chauffeurs serve leadership teams, board members and visiting principals with discretion across major Gulf cities. Chauffeurs undergo rigorous protocol instruction and receive comprehensive itinerary briefings before opening the vehicle door. Hourly and full day bookings provide flexible mobility with luxury sedans and premium SUVs maintained to the highest standards.",
    points: [
      "Hourly and daily private hire",
      "Protocol trained professional chauffeurs",
      "First class executive luxury vehicles",
    ],
    href: "/services/chauffeur-vip",
    image: `${IMGS}/image2.jpg`,
    imageAlt: "Executive black sedan parked outside a modern commercial tower in Riyadh",
    vehicle: { src: "/cars/sedans/msc.png", label: "First Class Sedan" },
  },
  {
    id: "airport",
    name: "Airport Transfers",
    heading: "02 Airport transfers and flight tracking",
    intro: [
      "Punctual airport transfers require continuous flight surveillance and dedicated kerbside coordination. Whether arriving on commercial flights or private aviation charters, passengers receive immediate assistance upon clearing customs. AB dispatchers track aircraft movements in real time to adapt vehicle arrival schedules to early landings or unexpected delays.",
      "Arriving passengers entering Dubai International or Zayed International can reserve an airport chauffeur service with flight tracking and terminal meet and greet. Our premium airport transfer services remove the uncertainty of arrival delays across international airport terminals.",
    ],
    detail:
      "Arriving travellers receive professional meet and greet service inside terminal arrival halls with live flight tracking included. Chauffeurs hold personalised name boards, manage heavy luggage and escort guests directly to an executive vehicle staged at the kerb. Punctual airport transfers provide seamless transit from major terminals to corporate offices or hotels across the Gulf.",
    points: [
      "Live flight tracking included",
      "Arrivals hall meet and greet",
      "Luggage assistance at kerbside",
    ],
    href: "/services/airport-transfers",
    image: `${IMGS}/image3.jpg`,
    imageAlt: "Professional chauffeur holding a greeting sign in an international airport arrivals hall",
    vehicle: { src: "/cars/sedans/BMW.png", label: "Business Sedan" },
  },
  {
    id: "corporate",
    name: "Corporate Transportation",
    heading: "03 Corporate ground transportation services and fleet management",
    intro: [
      "Enterprises operating across Saudi Arabia, the UAE and Qatar require coordinated mobility programmes that streamline administrative workflows. AB delivers managed transport frameworks that replace fragmented local taxi receipts with unified service level agreements. Dedicated dispatch teams provide travel managers with complete visibility over daily employee and executive travel.",
      "Companies requiring continuous regional travel support across Dubai and Abu Dhabi rely on our managed corporate transportation services UAE. Corporate travel managers can establish a unified corporate account with a single monthly invoice and detailed journey reporting.",
    ],
    detail:
      "Managed fleet operations and employee mobility programmes serve multinational organisations that move personnel daily throughout Gulf commercial centres. Travel managers gain centralised operations, dedicated account management and transparent monthly billing with consolidated usage reporting. Long term contracts provide dedicated vehicles and trained drivers aligned with strict corporate travel policies.",
    points: [
      "Long term contracted corporate fleets",
      "Staff shuttles and executive cars",
      "Monthly consolidated usage reporting",
    ],
    href: "/services/corporate-transportation",
    image: `${IMGS}/image4.jpg`,
    imageAlt: "Row of executive corporate sedans staged outside a modern office campus in Dubai",
    vehicle: { src: "/cars/sedans/LEXUS.png", label: "Standard Sedan" },
  },
  {
    id: "events",
    name: "Event Transportation",
    heading: "04 Event transportation management and venue logistics",
    intro: [
      "Large scale summits, trade exhibitions and sports championships demand sophisticated ground fleet choreography. AB designs comprehensive transport master plans that manage delegate throughput between airports, primary hotels and exhibition centres. Dedicated on site coordinators liaise with venue security teams and protocol officials to regulate traffic flow.",
      "When staging major industry summits in the Emirates, event organisers reserve our managed corporate event transportation to maintain strict passenger schedules. Deploying dedicated event transportation services supports smooth delegate movements during high volume regional conventions.",
    ],
    detail:
      "Complete transport logistics for international congresses, government summits and major cultural festivals manage delegations of any scale. Operations specialists establish traffic circulation plans, staging zones and accreditation access to keep delegate transfers operating without disruption. On site dispatch coordinators oversee vehicle staging, guest boarding and route adjustments throughout the entire programme.",
    points: [
      "Comprehensive transport movement planning",
      "On site dispatch coordinators",
      "Venue access and staging management",
    ],
    href: "/services/event-transportation",
    image: `${IMGS}/image5.jpg`,
    imageAlt: "Fleet of VIP vehicles staged at a dedicated event venue drop off area in Abu Dhabi",
    vehicle: { src: "/cars/vans/V_Class.png", label: "Premium MPV" },
  },
  {
    id: "groups",
    name: "Bus and Coach Hire",
    tabName: "Bus and Coach Hire",
    heading: "05 Bus and coach hire services for delegations",
    intro: [
      "Transporting substantial delegations, flight crews and conference attendees requires modern passenger coaches operated by licensed professional drivers. AB coordinates high volume group charters across Saudi Arabia, the UAE and Qatar with meticulous timetable planning. Every chartered vehicle undergoes regular safety checks to verify passenger comfort across urban and regional highways.",
      "Organisations coordinating group movements across the UAE can arrange structured bus rental Dubai through our local operations office in Deira. Our comprehensive bus and coach hire services provide the capacity and operational oversight needed for complex delegation itineraries.",
    ],
    detail:
      "Executive coaches and luxury passenger vans accommodate delegations, airline crews and event attendees travelling together across the region. Dedicated transport coordinators supervise passenger manifests, luggage loading and staging schedules to maintain synchronised departures. Modern vehicles offer spacious seating, climate control and ample luggage storage for comfortable group transit.",
    points: [
      "Executive vans and luxury coaches",
      "Delegation and crew movements",
      "Dedicated on site coordinators",
    ],
    href: "/services/bus-coach-hire",
    image: `${IMGS}/image6.jpg`,
    imageAlt: "Executive passenger coach parked outside a luxury hotel entrance in Doha",
    vehicle: { src: "/cars/buses/Mid_Size_Bus.png", label: "Executive Coach" },
  },
  {
    id: "tourism",
    name: "Tourism Transportation",
    heading: "06 Tourism transportation and private itineraries",
    intro: [
      "Leisure travellers, cultural delegations and corporate guests seeking private touring require knowledgeable chauffeurs familiar with local geography and heritage sites. AB provides curated chauffeured transport across historic destinations and desert landscapes throughout Saudi Arabia, the UAE and Qatar. Central dispatch coordinates scheduled stops, private guides and luxury transfers between regional landmarks.",
      "Private leisure itineraries require careful vehicle selection to handle diverse driving environments from coastal highways to desert terrain. Experienced private drivers navigate local points of interest while maintaining direct communication with regional dispatch supervisors.",
    ],
    detail:
      "Private leisure journeys across the Gulf pair travellers with professional chauffeurs who possess comprehensive knowledge of regional routes and historic attractions. Custom itineraries connect travellers to remarkable destinations, from historic AlUla to desert reserves outside Abu Dhabi. Daily bookings and multi day charters accommodate hotel pickups, private sightseeing and cruise terminal transfers.",
    points: [
      "Single day and regional tours",
      "Hotel and terminal pickups",
      "Custom itineraries across the Gulf",
    ],
    href: "/services/tourism-transportation",
    image: `${IMGS}/image7.jpg`,
    imageAlt: "Luxury SUV on a paved highway through scenic desert landscape in Saudi Arabia",
    vehicle: { src: "/cars/suvs/CADILAC.png", label: "Executive SUV" },
  },
  {
    id: "religious",
    name: "Religious Tourism (Umrah and Hajj)",
    tabName: "Religious Tourism",
    heading: "07 Religious tourism for Umrah and Hajj",
    intro: [
      "Pilgrims and official delegations travelling to the holy cities of Makkah and Madinah require organised, reliable ground transport solutions. AB facilitates comfortable transfers between King Abdulaziz International Airport in Jeddah, high speed rail terminals and major hotels. Experienced chauffeurs assist travellers throughout their pilgrimage itineraries with respect and operational precision.",
      "Navigating seasonal traffic density during peak pilgrimage periods demands active route management and seasoned local drivers. Dispatch supervisors oversee vehicle positioning around terminal facilities to minimise waiting times for arriving pilgrim groups.",
    ],
    detail:
      "Specialised pilgrimage transportation supports individuals, families and official delegations travelling for Umrah and Hajj in the Western Province. Professional chauffeurs provide punctual airport reception at Jeddah and Madinah, managing transfers to hotels and holy sites. Comfortable luxury vehicles and passenger vans allow pilgrims to focus on worship while logistics run smoothly.",
    points: [
      "Dedicated Western Province transfers",
      "Meet and greet at Jeddah",
      "Scheduled intercity hotel connections",
    ],
    href: "/services/religious-tourism",
    image: `${IMGS}/image8.jpg`,
    imageAlt: "Executive van staged near a modern hospitality terminal in the Western Province",
    vehicle: { src: "/cars/vans/Sprinter.png", label: "Executive Van" },
  },
  {
    id: "workforce",
    name: "Workforce and Project Site Transport",
    tabName: "Workforce Transport",
    heading: "08 Workforce and project site transport",
    intro: [
      "Infrastructure projects, industrial complexes and remote operations across the Kingdom and the Emirates rely on punctual workforce transit. AB manages scheduled worker transport programmes that shuttle technical staff, engineers and project teams between accommodation camps and worksites. Operations managers configure reliable route networks that adapt to variable shift patterns.",
      "Maintaining strict duty of care across remote project corridors requires regular fleet servicing and continuous telemetry monitoring. Centralised control rooms monitor vehicle speed, driver rest intervals and operating conditions across every scheduled shift.",
    ],
    detail:
      "Scheduled staff shuttles and rugged project transport support construction sites, industrial plants and energy developments throughout the Gulf. Dedicated transport networks operate on fixed timetables to move operational teams reliably between housing facilities and remote work zones. Fleet management systems track vehicle locations in real time to verify punctuality and passenger safety.",
    points: [
      "Scheduled daily worker shuttles",
      "Remote project site access",
      "Centralised GPS fleet monitoring",
    ],
    href: "/services/workforce-mobility",
    image: `${IMGS}/image9.jpg`,
    imageAlt: "Passenger shuttles lined up at an industrial project site facility in Saudi Arabia",
    vehicle: { src: "/cars/buses/Ankai-Coster.png", label: "Staff Shuttle Coach" },
  },
  {
    id: "intercity",
    name: "Intercity Transfers",
    heading: "09 Intercity transfers between Gulf commercial centres",
    intro: [
      "Moving between regional business hubs such as Riyadh and Dammam, or Dubai and Abu Dhabi, often demands private highway transit. AB coordinates seamless point to point intercity travel that enables executives to work productively without regional airport queues. Professional chauffeurs navigate major motorways with modern, quiet vehicles equipped for mobile business tasks.",
      "Business travellers moving between emirates frequently book an intercity chauffeur service UAE to continue working without transport disruptions. Private highway transfers offer direct departures, spacious seating and total schedule flexibility between key business destinations.",
    ],
    detail:
      "Direct highway transfers connect major business districts across Saudi Arabia and the United Arab Emirates without terminal delays. Executives travel comfortably between commercial centres in premium sedans equipped with quiet cabins and mobile charging points. Fixed pricing and transparent invoicing allow corporate clients to schedule long distance travel with complete financial certainty.",
    points: [
      "City to city executive transfers",
      "Direct highway route coordination",
      "Fixed transparent corporate billing",
    ],
    href: "/services/intercity-transfers",
    image: `${IMGS}/image10.jpg`,
    imageAlt: "Executive sedan travelling on a wide intercity motorway between Dubai and Abu Dhabi",
    vehicle: { src: "/cars/sedans/FAURD TAURUS.png", label: "Full-size Sedan" },
  },
];

/** Hub page FAQ content (from the services hub document). */
export const HUB_FAQS: Array<{ id: string; question: string; answer: string }> = [
  {
    id: "faq-cross-border",
    question: "How does AB coordinate cross border ground transportation services in the Gulf?",
    answer:
      "AB operates directly across Saudi Arabia, all seven UAE emirates and Qatar through regional offices and central dispatch. Transfers into Bahrain, Kuwait and Oman proceed on request through vetted local partners. Central dispatchers in Riyadh supervise route plans, border documentation and passenger handovers to maintain continuous duty of care throughout every regional itinerary.",
  },
  {
    id: "faq-duty-of-care",
    question: "What duty of care standards apply to corporate account bookings?",
    answer:
      "Every journey booked under a corporate account adheres to rigorous safety and operational protocols across our fleet. Vehicles undergo routine mechanical inspections and carry live GPS tracking monitored continuously by dispatch supervisors. Chauffeurs receive background vetting, professional driving evaluations and protocol instruction before driving visiting executives, board members or government delegations.",
  },
  {
    id: "faq-flight-tracking",
    question: "How does flight tracking work for airport transfer services?",
    answer:
      "Our dispatch software connects directly to global flight tracking databases to follow aircraft progress in real time. Flight arrivals are monitored continuously from the Riyadh operations centre so that the private driver stages at the terminal before landing. Even if incoming flights encounter delays, the assigned chauffeur remains positioned in arrivals for a seamless meet and greet.",
  },
  {
    id: "faq-event-scaling",
    question: "Can event transportation services scale for multi venue summits?",
    answer:
      "Our event logistics coordinators design complete traffic flow models, designated staging areas and scheduled circuits for major conferences. On site dispatch teams communicate directly with venue managers, protocol officers and coach drivers to adapt to rolling agenda changes. Dispatch supervisors deploy supplementary vehicles from local staging hubs whenever delegate numbers shift during high volume sessions.",
  },
  {
    id: "faq-coach-options",
    question: "What vehicle options are available for bus and coach hire services?",
    answer:
      "Organisations can select executive minivans, medium sized coaches and full sized luxury buses configured for corporate comfort. Every vehicle features climate control, pristine interiors, luggage compartments and standard safety systems. Groups benefit from designated route planning and dedicated coordinators who oversee passenger manifests and boarding queues at hotels and convention halls.",
  },
  {
    id: "faq-billing",
    question: "How are billing and monthly invoice processes managed across countries?",
    answer:
      "Corporate clients receive consolidated monthly billing covering all journeys across Saudi Arabia, the UAE and Qatar under a single corporate account. Itemised statements detail date, passenger name, pickup point, destination and vehicle category with transparent regional currency breakdowns. Finance teams eliminate separate supplier invoices and cross border payment complexities through our central corporate billing structure.",
  },
];
