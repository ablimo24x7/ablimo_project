export interface VehicleShape {
  w1: number;
  w2: number;
  body: string;
  glass: string;
  line: string;
  lamp: string;
}

export interface SketchService {
  id: string;
  name: string;
  /** Shorter label used in the hero tab row when present. */
  tabName?: string;
  desc: string;
  points: string[];
  /** Locale-relative path — prefix with localeBase(lang) at render time. */
  href: string;
  photo: string;
  vehicleLabel: string;
  v: VehicleShape;
}

/** Vehicle silhouettes from the client sketch (dark-panel colour variants). */
const V: Record<string, VehicleShape> = {
  first: {
    w1: 92,
    w2: 324,
    body: "M14,106 L14,90 C14,82 22,78 38,77 L118,73 C140,57 166,45 204,44 L270,44 C298,44 318,57 338,71 L370,76 C386,78 390,86 390,95 L390,106 Z",
    glass: "M130,72 C152,58 174,50 204,49 L232,49 L232,72 Z M238,49 L268,49 C292,49 310,59 324,71 L238,72 Z",
    line: "M26,86 L378,86",
    lamp: "M16,84 L30,83 L30,88 L16,88 Z",
  },
  business: {
    w1: 96,
    w2: 316,
    body: "M20,106 L20,91 C20,83 28,79 44,78 L120,74 C142,58 166,47 200,46 L258,46 C286,46 306,58 326,72 L362,77 C378,79 384,87 384,96 L384,106 Z",
    glass: "M132,73 C152,60 172,52 200,51 L224,51 L224,73 Z M230,51 L256,51 C278,51 296,60 312,72 L230,73 Z",
    line: "M32,87 L372,87",
    lamp: "M22,85 L36,84 L36,89 L22,89 Z",
  },
  suv: {
    w1: 96,
    w2: 312,
    body: "M20,106 L20,82 C20,74 26,68 40,66 L96,62 L128,36 C132,32 138,30 146,30 L334,30 C346,30 352,36 356,44 L368,64 C378,67 382,74 382,84 L382,106 Z",
    glass: "M134,60 L154,36 L224,36 L224,60 Z M230,36 L290,36 L290,60 L230,60 Z M296,36 L334,36 C340,36 344,40 346,46 L352,60 L296,60 Z",
    line: "M32,80 L372,80",
    lamp: "M22,74 L38,72 L38,78 L22,78 Z",
  },
  mpv: {
    w1: 92,
    w2: 318,
    body: "M18,106 L18,80 C18,72 24,66 36,64 L70,60 L118,30 C122,27 128,26 134,26 L360,26 C372,26 380,32 380,44 L382,106 Z",
    glass: "M124,56 L140,32 L206,32 L206,56 Z M212,32 L284,32 L284,56 L212,56 Z M290,32 L360,32 C366,32 370,36 370,42 L370,56 L290,56 Z",
    line: "M30,78 L372,78",
    lamp: "M20,72 L36,70 L36,76 L20,76 Z",
  },
  van: {
    w1: 90,
    w2: 322,
    body: "M16,106 L16,74 C16,66 22,60 32,58 L58,55 L92,20 C95,16 100,14 108,14 L372,14 C380,14 386,20 386,28 L388,106 Z",
    glass: "M98,50 L114,22 L150,22 L150,50 Z M158,22 L212,22 L212,48 L158,48 Z M220,22 L274,22 L274,48 L220,48 Z M282,22 L336,22 L336,48 L282,48 Z",
    line: "M28,74 L376,74",
    lamp: "M18,68 L34,66 L34,72 L18,72 Z",
  },
  coach: {
    w1: 84,
    w2: 322,
    body: "M12,106 L12,26 C12,18 18,12 28,12 L374,12 C384,12 390,18 390,28 L390,106 Z",
    glass: "M24,24 L64,24 L64,62 L24,62 Z M74,24 L130,24 L130,56 L74,56 Z M138,24 L194,24 L194,56 L138,56 Z M202,24 L258,24 L258,56 L202,56 Z M266,24 L322,24 L322,56 L266,56 Z M330,24 L378,24 L378,56 L330,56 Z",
    line: "M12,74 L390,74",
    lamp: "M14,90 L30,90 L30,96 L14,96 Z",
  },
};

export const SKETCH_SERVICES: SketchService[] = [
  {
    id: "executive",
    name: "Executive and Corporate Mobility",
    v: V.first,
    vehicleLabel: "First Class sedan",
    photo: "chauffeur opening the rear door",
    href: "/services/chauffeur-vip",
    desc: "Dedicated chauffeurs for leadership teams, board members and visiting principals. Discreet, punctual and briefed on every detail before the door opens.",
    points: ["Hourly and full day hire", "Protocol trained chauffeurs", "First Class and Business sedans"],
  },
  {
    id: "airport",
    name: "Airport Transfers",
    v: V.business,
    vehicleLabel: "Business sedan",
    photo: "chauffeur with name board at arrivals",
    href: "/services/airport-transfers",
    desc: "Meet and greet in the arrivals hall, live flight tracking and a car waiting at the kerb, whatever time you land.",
    points: ["Flight tracking included", "Arrivals hall meet and greet", "Luggage assistance"],
  },
  {
    id: "fleet",
    name: "Corporate Fleet and Workforce Mobility",
    tabName: "Corporate Fleet and Workforce",
    v: V.mpv,
    vehicleLabel: "Premium MPV",
    photo: "fleet lined up at a corporate campus",
    href: "/services/corporate-transportation",
    desc: "Managed fleets and staff transport for companies that move people every day, with one account, one dispatch team and clear monthly reporting.",
    points: ["Long term contracts", "Staff shuttles and pool cars", "Monthly usage reporting"],
  },
  {
    id: "events",
    name: "Event Transportation",
    v: V.van,
    vehicleLabel: "Executive van",
    photo: "vehicles staged at a venue drop off",
    href: "/services/event-transportation",
    desc: "Complete transport for conferences, sporting events and festivals, from a single VIP arrival to hundreds of vehicles over a multi week programme.",
    points: ["Transport planning", "On site dispatch teams", "Accreditation and venue access"],
  },
  {
    id: "groups",
    name: "Group and Coach Charter",
    v: V.coach,
    vehicleLabel: "Coach",
    photo: "coach boarding outside a hotel",
    href: "/services/bus-coach-hire",
    desc: "Coaches and executive vans for delegations, crews and guests travelling together, with a coordinator who keeps every group on schedule.",
    points: ["Executive vans and coaches", "Delegation and crew moves", "Group coordinators"],
  },
  {
    id: "tourism",
    name: "Tourism and Leisure",
    v: V.suv,
    vehicleLabel: "Executive SUV",
    photo: "SUV on a desert road at sunset",
    href: "/services/tourism-transportation",
    desc: "Private touring across the Gulf with chauffeurs who know the routes, the history and the best time to arrive, from AlUla to the dunes outside Abu Dhabi.",
    points: ["Day trips and multi day tours", "Hotel and cruise pickups", "Tour company partnerships"],
  },
];
