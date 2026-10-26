export interface SketchIndustry {
  id: string;
  name: string;
  num: string;
  desc: string;
  intro: string;
  /** Locale-relative path — prefix with localeBase(lang) at render time. */
  href: string;
  img: string;
  pos: string;
  points: string[];
}

/**
 * Seven sectors from the client sketch, verbatim. The site has detail pages
 * for four of them; events / energy / sports link to the contact page until
 * their detail pages exist.
 */
export const SKETCH_INDUSTRIES: SketchIndustry[] = [
  {
    id: "events",
    name: "Events and exhibitions",
    num: "01",
    desc: "Delegate shuttles, VIP arrivals and venue loading zones run from one control room.",
    intro:
      "Conferences, festivals and exhibitions move thousands of people through a few gates in a few hours. AB plans the vehicle mix, staffs the venue and runs every movement from a dedicated event control room.",
    href: "/industries/events",
    img: "/industries/events.jpg",
    pos: "50% 62%",
    points: [
      "Delegate and visitor shuttles",
      "VIP and speaker movements",
      "Venue and loading zone control",
    ],
  },
  {
    id: "government",
    name: "Government and protocol",
    num: "02",
    desc: "Motorcade planning, protocol trained chauffeurs and discreet delegation movements.",
    intro:
      "Official visits leave no room for improvisation. AB plans motorcades and delegation movements with protocol teams, using vetted chauffeurs bound by strict confidentiality.",
    href: "/industries/government-diplomatic",
    img: "/industries/government.jpg",
    pos: "62% 35%",
    points: ["Motorcade planning", "Protocol trained chauffeurs", "Delegation logistics"],
  },
  {
    id: "aviation",
    name: "Aviation and crew",
    num: "03",
    desc: "Crew rotations, FBO transfers and standby fleets ready for schedule disruption.",
    intro:
      "Flights move, gates change and crews rotate around the clock. AB tracks every flight and keeps standby vehicles ready, so crews and passengers are collected on time whatever the schedule does.",
    href: "/industries/aviation",
    img: "/industries/aviation.jpg",
    pos: "60% 50%",
    points: ["Crew rotations", "FBO and private terminals", "Disruption standby"],
  },
  {
    id: "energy",
    name: "Energy and giga projects",
    num: "04",
    desc: "Workforce transport and executive site visits for remote, large scale projects.",
    intro:
      "Giga projects and energy sites run far from city centres, on shift patterns that never stop. AB runs shift based routes, executive site visits and long term dedicated fleets for project teams.",
    href: "/industries/energy",
    img: "/industries/energy.jpg",
    pos: "50% 45%",
    points: ["Shift based workforce routes", "Executive site visits", "Dedicated fleets"],
  },
  {
    id: "hospitality",
    name: "Hospitality and DMCs",
    num: "05",
    desc: "Guest transfers, tours and group movements for hotels and destination partners.",
    intro:
      "Your guests judge their stay from the moment they land. AB handles guest transfers, day tours and group movements for hotels and destination management companies across the Gulf.",
    href: "/industries/hospitality",
    img: "/industries/hospitality.jpg",
    pos: "45% 40%",
    points: ["Guest airport transfers", "Tours and itineraries", "Religious tourism"],
  },
  {
    id: "sports",
    name: "Sports and entertainment",
    num: "06",
    desc: "Team, talent and fan movements built around match days and show schedules.",
    intro:
      "Kick off and curtain times do not move. AB plans team, talent and crew movements around the schedule, from tournament fleets to artist transport for the region’s biggest shows.",
    href: "/industries/sports",
    img: "/industries/sports.jpg",
    pos: "20% 70%",
    points: [
      "Team and athlete transport",
      "Artist and talent movements",
      "Crew and production shuttles",
    ],
  },
  {
    id: "corporate",
    name: "Corporate and enterprise",
    num: "07",
    desc: "Roadshows, executive travel and staff mobility with centralized billing.",
    intro:
      "Companies across the Gulf use AB for leadership travel, investor roadshows and daily staff transport. One contract, one dispatch team and one monthly invoice cover every trip.",
    href: "/industries/corporate-enterprise",
    img: "/industries/corporate.jpg",
    pos: "55% 50%",
    points: ["Executive and VIP travel", "Roadshows", "Staff transportation"],
  },
];
