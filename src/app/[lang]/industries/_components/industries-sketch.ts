export interface SketchIndustry {
  id: string;
  name: string;
  num: string;
  desc: string;
  intro: string;
  /** Locale-relative path — prefix with localeBase(lang) at render time. */
  href: string;
  ctaLabel: string;
  img: string;
  imgAlt: string;
  pos: string;
  points: string[];
}

export interface HubStepItem {
  num: string;
  title: string;
  description: string;
}

export interface HubFaqItem {
  q: string;
  a: string;
}

/**
 * Seven sectors from industries-markdown/www.ab.limo-industries.md, blended with
 * the curated hub photography and canonical detail page routes.
 */
export const SKETCH_INDUSTRIES: SketchIndustry[] = [
  {
    id: "aviation",
    name: "Aviation & FBO",
    num: "01",
    desc: "Crew rotations, FBO transfers and standby fleets ready for schedule disruption.",
    intro:
      "Airlines, private jet operators and FBO teams need reliable crew transfers and coordinated airport transit. AB aligns chauffeur services, dispatch and flight schedules for aviation operations in Riyadh, Dubai and Doha, supporting timely movement between terminals and aircraft.",
    href: "/industries/aviation",
    ctaLabel: "Explore crew transportation",
    img: "/industries/aviation.jpg",
    imgAlt: "Chauffeur standing beside a luxury executive saloon on a private jet tarmac",
    pos: "60% 50%",
    points: [
      "Dedicated tarmac airside transfers",
      "Real time flight schedule synchronisation",
      "Complete duty of care compliance",
    ],
  },
  {
    id: "corporate",
    name: "Corporate & Enterprise",
    num: "02",
    desc: "Roadshows, executive travel and staff mobility with centralized billing.",
    intro:
      "Corporate travel managers, procurement teams and executive assistants use corporate transportation solutions for commutes and multi-city roadshows. AB coordinates chauffeurs, account management, invoicing and reporting across Saudi Arabia and the UAE, helping organisations improve transportation services and travel efficiency.",
    href: "/industries/corporate-enterprise",
    ctaLabel: "Explore corporate ground transportation",
    img: "/industries/corporate.jpg",
    imgAlt: "Executive saloon moving along a financial district avenue in Dubai",
    pos: "55% 50%",
    points: [
      "Centralised billing and transparent reporting",
      "Executive roadshow route planning",
      "Professional bilingual corporate chauffeurs",
    ],
  },
  {
    id: "government",
    name: "Government & Diplomatic",
    num: "03",
    desc: "Motorcade planning, protocol trained chauffeurs and discreet delegation movements.",
    intro:
      "Government protocol teams, embassy staff and ministry delegations rely on government transport services for discreet, coordinated journeys. AB arranges chauffeur-led transport for official visits and summits across Saudi Arabia, with attention to protocol, security requirements and passenger duty of care.",
    href: "/industries/government-diplomatic",
    ctaLabel: "Explore diplomatic transportation",
    img: "/industries/government.jpg",
    imgAlt: "Motorcade of black luxury vehicles parked outside a government building in Abu Dhabi",
    pos: "62% 35%",
    points: [
      "Strict diplomatic protocol adherence",
      "Armoured vehicle options on request",
      "Vetted security trained chauffeurs",
    ],
  },
  {
    id: "hospitality",
    name: "Hospitality",
    num: "04",
    desc: "Guest transfers, tours and group movements for hotels and destination partners.",
    intro:
      "Hotel general managers, resort concierge teams and private residence directors use AB's chauffeur service to coordinate guest arrivals with front-of-house staff. Reliable transport supports welcome standards, smooth billing and a premium guest experience in Doha and across the Gulf.",
    href: "/industries/hospitality",
    ctaLabel: "Explore hotel transportation services",
    img: "/industries/hospitality.jpg",
    imgAlt: "Luxury chauffeur vehicle awaiting guests in front of a luxury hotel entrance in Doha",
    pos: "45% 40%",
    points: [
      "White glove guest arrival experiences",
      "Seamless front desk billing integration",
      "Immaculate late model premium fleet",
    ],
  },
  {
    id: "events",
    name: "Events & Exhibitions",
    num: "05",
    desc: "Delegate shuttles, VIP arrivals and venue loading zones run from one control room.",
    intro:
      "Conference organisers, exhibition producers and meeting planners rely on event transportation services to manage attendee demand and venue transit. AB coordinates shuttle routes, staging and VIP speaker transfers, with dispatch support on site to keep movements organised.",
    href: "/industries/events-exhibitions",
    ctaLabel: "Explore exhibition transportation services",
    img: "/industries/events.jpg",
    imgAlt: "Fleet of executive vans and saloons stationed at an exhibition centre staging area in Riyadh",
    pos: "50% 62%",
    points: [
      "On site dispatch coordinators",
      "Dynamic delegate shuttle management",
      "Real time manifest tracking",
    ],
  },
  {
    id: "energy",
    name: "Energy & Giga Projects",
    num: "06",
    desc: "Workforce transport and executive site visits for remote, large scale projects.",
    intro:
      "Infrastructure directors, procurement leads and project operations teams need reliable remote-site transport and executive transfers. AB coordinates suitable vehicles and drivers across Saudi Arabia, using tracking systems and technology to support journeys and site requirements.",
    href: "/industries/energy-giga-projects",
    ctaLabel: "Explore giga project transportation",
    img: "/industries/energy.jpg",
    imgAlt: "Four wheel drive executive SUV travelling on an access road near a major infrastructure development",
    pos: "50% 45%",
    points: [
      "Remote project site transport",
      "Comprehensive IVMS safety monitoring",
      "Rigorous site access compliance",
    ],
  },
  {
    id: "sports",
    name: "Sports & Entertainment",
    num: "07",
    desc: "Team, talent and fan movements built around match days and show schedules.",
    intro:
      "Sports directors, touring production managers and federations need coordinated transportation for athletes, artists and crews. AB organises venue arrivals, luggage logistics and fleet movements for events across the region, helping teams and production staff travel between hotels, training sites and venues.",
    href: "/industries/sports-entertainment",
    ctaLabel: "Explore sports team transportation",
    img: "/industries/sports.jpg",
    imgAlt: "Luxury coach and executive support vehicles outside an athletic arena in Riyadh",
    pos: "20% 70%",
    points: [
      "Dedicated athlete and artist transfers",
      "Secure stadium ingress coordination",
      "Specialised equipment support transport",
    ],
  },
];

export const HUB_STEPS: HubStepItem[] = [
  {
    num: "01",
    title: "Brief",
    description:
      "Clients share passenger manifests, vehicle requirements, schedules and protocols. An account manager confirms site access, compliance requirements and communication channels before operations begin.",
  },
  {
    num: "02",
    title: "Plan",
    description:
      "Operations specialists build route plans, assign vetted chauffeurs and allocate fleet resources. They set timing buffers and contingency arrangements for each destination.",
  },
  {
    num: "03",
    title: "Operate",
    description:
      "The 24/7 operations centre coordinates live dispatch and monitors journeys with GPS tracking. Chauffeurs follow agreed procedures, supporting passenger safety and duty of care.",
  },
  {
    num: "04",
    title: "Report",
    description:
      "Clients receive journey data, billing summaries and performance indicators. The account manager provides consolidated invoicing and reporting to help teams review service delivery and efficiency.",
  },
];

export const HUB_FAQS: HubFaqItem[] = [
  {
    q: "Which geographic markets does AB cover for industry transport programmes?",
    a: "AB coordinates ground transportation across Saudi Arabia, the UAE and Qatar, with offices in Riyadh, Dubai, Abu Dhabi and Doha. Regional journeys are managed through central dispatch, helping clients coordinate transport across these markets. Movements beyond these countries should be confirmed with AB when planning a programme.",
  },
  {
    q: "How does AB maintain duty of care across different sectors?",
    a: "AB supports duty of care through journey coordination, GPS tracking and communication between chauffeurs and dispatch. Planning takes account of passenger schedules, route requirements and sector protocols. Vehicle and driver arrangements are matched to each assignment, giving clients clear oversight of movements throughout the service.",
  },
  {
    q: "Can AB accommodate large scale events and government summits?",
    a: "AB plans transport for exhibitions, official visits and multi-venue sporting events. The programme can include fleet allocation, venue staging, shuttle coordination and support for VIP movements. Organisers work with AB to agree schedules, routes and dispatch arrangements that reflect the event plan and its passenger requirements.",
  },
  {
    q: "How does consolidated billing and reporting operate for multi city accounts?",
    a: "For multi-city accounts, AB coordinates journey records and billing under agreed commercial arrangements. Clients can receive itemised reports and consolidated invoicing to support cost-centre review. An account manager can discuss reporting needs and service performance with the client as the programme develops.",
  },
  {
    q: "What vehicle categories are available for specialised industry requirements?",
    a: "AB's fleet includes executive saloons, luxury SUVs, passenger coaches and executive vans. Vehicle selection depends on passenger numbers, route and sector requirements. Specialised options, such as armoured vehicles or four-wheel-drive vehicles for remote project journeys, can be discussed with the planning team when preparing a programme.",
  },
  {
    q: "How can organisations initiate a transportation services by industry proposal?",
    a: "To request transportation services by industry, organisations can submit project details through the quotation portal at /quote/tender or our contact desk. Include passenger numbers, schedules, locations and any relevant site or protocol requirements. AB's planning team uses this information to assess fleet needs, operational scope and service arrangements for a tailored proposal.",
  },
];
