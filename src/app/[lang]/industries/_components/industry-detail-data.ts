export interface IndustryStripItem {
  v: string;
  l: string;
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
}

export interface IndustryLink {
  name: string;
  href: string;
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
  heroP: string;
  heroImage: string;
  heroImagePos: string;
  strip: IndustryStripItem[];
  statementEyebrow: string;
  statement: string;
  needsEyebrow: string;
  needsH2: string;
  needs: IndustryNeedItem[];
  stepsEyebrow: string;
  stepsH2: string;
  steps: IndustryStepItem[];
  cases: IndustryCase[];
  services: IndustryLink[];
  vehicles: string[];
  faqs: IndustryFaq[];
  others: IndustryLink[];
  ctaH2: string;
  ctaP: string;
}

export const INDUSTRY_DETAILS: Record<string, IndustryDetailData> = {
  "aviation": {
    "slug": "aviation",
    "title": "Aviation and crew transportation | AB.Limo",
    "badge": "Aviation and crew",
    "h1": "Crew and passenger transport that keeps pace with the flight schedule",
    "heroP": "Flights move, gates change and crews rotate around the clock. AB tracks every flight and keeps standby vehicles ready, so crews and passengers are collected on time whatever the schedule does.",
    "heroImage": "/industries/aviation.jpg",
    "heroImagePos": "60% 50%",
    "strip": [
      {
        "v": "8",
        "l": "Gulf airports served"
      },
      {
        "v": "24/7",
        "l": "Flight tracked dispatch"
      },
      {
        "v": "FBO",
        "l": "Private terminal pickups"
      }
    ],
    "statementEyebrow": "How we work",
    "statement": "From scheduled crew rotations to private jet arrivals, every pickup is tied to live flight data and backed by standby vehicles for delays and diversions.",
    "needsEyebrow": "What you need from us",
    "needsH2": "Built for aviation and crew",
    "needs": [
      {
        "num": "01",
        "t": "Crew rotations",
        "x": "Scheduled hotel and airport transfers for cabin and flight crews, adjusted to live flight times."
      },
      {
        "num": "02",
        "t": "FBO and private terminals",
        "x": "Airside greeters and curbside pickups for private aviation passengers."
      },
      {
        "num": "03",
        "t": "Disruption standby",
        "x": "Standby fleets positioned for delays, diversions and irregular operations."
      },
      {
        "num": "04",
        "t": "One account",
        "x": "Centralised billing and trip reporting across every airport you operate from."
      }
    ],
    "stepsEyebrow": "How it runs",
    "stepsH2": "Three stages, one accountable partner",
    "steps": [
      {
        "num": "01",
        "t": "Connect",
        "x": "Share crew rosters or flight schedules and pickup rules."
      },
      {
        "num": "02",
        "t": "Track",
        "x": "Dispatch monitors flight status and adjusts pickups automatically."
      },
      {
        "num": "03",
        "t": "Report",
        "x": "Monthly trip records and a single invoice per account."
      }
    ],
    "cases": [],
    "services": [
      {
        "name": "Airport Transfers",
        "href": "/services/airport-transfers"
      },
      {
        "name": "Corporate Fleet and Workforce Mobility",
        "href": "/services/corporate-transportation"
      },
      {
        "name": "Executive and Corporate Mobility",
        "href": "/services/chauffeur-vip"
      }
    ],
    "vehicles": [
      "Business Sedan",
      "Premium MPV",
      "Executive Van",
      "Coach"
    ],
    "faqs": [
      {
        "q": "Which airports does AB cover for crew transport?",
        "a": "RUH, JED, MED, DMM, DXB, DWC, AUH and DOH, with other Gulf airports on request."
      },
      {
        "q": "What happens when a flight is delayed?",
        "a": "Dispatch tracks flight status and reschedules the pickup, with standby vehicles ready for longer disruption."
      }
    ],
    "others": [
      {
        "name": "Events and exhibitions",
        "href": "/industries/events"
      },
      {
        "name": "Government and protocol",
        "href": "/industries/government-diplomatic"
      },
      {
        "name": "Energy and giga projects",
        "href": "/industries/energy"
      },
      {
        "name": "Hospitality and DMCs",
        "href": "/industries/hospitality"
      },
      {
        "name": "Sports and entertainment",
        "href": "/industries/sports"
      },
      {
        "name": "Corporate and enterprise",
        "href": "/industries/corporate-enterprise"
      }
    ],
    "ctaH2": "Planning transport for aviation and crew?",
    "ctaP": "Share your dates, passenger numbers and locations and an operations planner will design the movement plan around them."
  },
  "corporate-enterprise": {
    "slug": "corporate-enterprise",
    "title": "Corporate and enterprise transportation | AB.Limo",
    "badge": "Corporate and enterprise",
    "h1": "Executive travel, roadshows and staff mobility under one corporate account",
    "heroP": "Companies across the Gulf use AB for leadership travel, investor roadshows and daily staff transport. One contract, one dispatch team and one monthly invoice cover every trip.",
    "heroImage": "/industries/corporate.jpg",
    "heroImagePos": "55% 50%",
    "strip": [
      {
        "v": "1",
        "l": "Contract and monthly invoice"
      },
      {
        "v": "24/7",
        "l": "Dispatch in every country"
      },
      {
        "v": "API",
        "l": "Integration where required"
      }
    ],
    "statementEyebrow": "How we work",
    "statement": "Corporate accounts combine dedicated vehicles, staff routes and on demand chauffeurs, with direct billing and reporting your finance team can reconcile in minutes.",
    "needsEyebrow": "What you need from us",
    "needsH2": "Built for corporate and enterprise",
    "needs": [
      {
        "num": "01",
        "t": "Executive and VIP travel",
        "x": "Chauffeurs by the trip, the hour or the month for leadership and guests."
      },
      {
        "num": "02",
        "t": "Roadshows",
        "x": "Multi city schedules for investor and sales roadshows, coordinated by one planner."
      },
      {
        "num": "03",
        "t": "Staff transportation",
        "x": "Dedicated vehicles and staff routes for offices and campuses."
      },
      {
        "num": "04",
        "t": "Central billing",
        "x": "Client portal, direct billing and one monthly invoice per entity."
      }
    ],
    "stepsEyebrow": "How it runs",
    "stepsH2": "Three stages, one accountable partner",
    "steps": [
      {
        "num": "01",
        "t": "Set up",
        "x": "We agree vehicles, service levels and billing for your account."
      },
      {
        "num": "02",
        "t": "Book",
        "x": "Travel managers and assistants book through the portal, email or API."
      },
      {
        "num": "03",
        "t": "Reconcile",
        "x": "Monthly reports and one invoice for every trip."
      }
    ],
    "cases": [
      {
        "sector": "Corporate",
        "years": "Ongoing",
        "place": "Saudi Arabia",
        "title": "Roshn Group Staff Shuttle",
        "stats": [
          {
            "v": "4",
            "l": "Vehicles daily"
          },
          {
            "v": "13 to 15",
            "l": "Passengers each"
          }
        ]
      },
      {
        "sector": "Energy and corporate",
        "years": "2024 to present",
        "place": "Jubail and Eastern Region, KSA",
        "title": "Siemens Energy",
        "stats": [
          {
            "v": "7",
            "l": "Day coverage"
          },
          {
            "v": "0",
            "l": "Major incidents"
          }
        ]
      }
    ],
    "services": [
      {
        "name": "Executive and Corporate Mobility",
        "href": "/services/chauffeur-vip"
      },
      {
        "name": "Corporate Fleet and Workforce Mobility",
        "href": "/services/corporate-transportation"
      },
      {
        "name": "Airport Transfers",
        "href": "/services/airport-transfers"
      }
    ],
    "vehicles": [
      "Business Sedan",
      "First Class Sedan",
      "Executive SUV",
      "Premium MPV"
    ],
    "faqs": [
      {
        "q": "Do you work on long term corporate contracts?",
        "a": "Yes. Corporate accounts cover dedicated vehicles, staff routes and on demand chauffeurs under one contract with monthly invoicing."
      },
      {
        "q": "Can we integrate bookings with our travel tools?",
        "a": "Client portals and direct billing are available, with API integration where required."
      }
    ],
    "others": [
      {
        "name": "Events and exhibitions",
        "href": "/industries/events"
      },
      {
        "name": "Government and protocol",
        "href": "/industries/government-diplomatic"
      },
      {
        "name": "Aviation and crew",
        "href": "/industries/aviation"
      },
      {
        "name": "Energy and giga projects",
        "href": "/industries/energy"
      },
      {
        "name": "Hospitality and DMCs",
        "href": "/industries/hospitality"
      },
      {
        "name": "Sports and entertainment",
        "href": "/industries/sports"
      }
    ],
    "ctaH2": "Planning transport for corporate and enterprise?",
    "ctaP": "Share your dates, passenger numbers and locations and an operations planner will design the movement plan around them."
  },
  "energy": {
    "slug": "energy",
    "title": "Energy and giga projects transportation | AB.Limo",
    "badge": "Energy and giga projects",
    "h1": "Workforce and executive transport for remote, large scale projects",
    "heroP": "Giga projects and energy sites run far from city centres, on shift patterns that never stop. AB runs shift based routes, executive site visits and long term dedicated fleets for project teams.",
    "heroImage": "/industries/energy.jpg",
    "heroImagePos": "50% 45%",
    "strip": [
      {
        "v": "18",
        "l": "Luxury coaches a month at NEOM Trojena"
      },
      {
        "v": "7",
        "l": "Day coverage for Siemens Energy"
      },
      {
        "v": "0",
        "l": "Major incidents"
      }
    ],
    "statementEyebrow": "How we work",
    "statement": "Project transport is planned around your shifts and sites, with dedicated vehicles, licensed drivers and dispatch support that covers remote locations around the clock.",
    "needsEyebrow": "What you need from us",
    "needsH2": "Built for energy and giga projects",
    "needs": [
      {
        "num": "01",
        "t": "Shift based workforce routes",
        "x": "Scheduled routes for large teams between accommodation, camps and sites, including remote locations."
      },
      {
        "num": "02",
        "t": "Executive site visits",
        "x": "Sedans and SUVs for leadership and client visits, with chauffeurs who know the site rules."
      },
      {
        "num": "03",
        "t": "Dedicated fleets",
        "x": "Procured and leased fleets for long term project contracts."
      },
      {
        "num": "04",
        "t": "Safety and compliance",
        "x": "GPS tracked vehicles, vetted drivers and incident reporting aligned to site HSE requirements."
      }
    ],
    "stepsEyebrow": "How it runs",
    "stepsH2": "Three stages, one accountable partner",
    "steps": [
      {
        "num": "01",
        "t": "Survey",
        "x": "We review sites, shift patterns and headcount with your project team."
      },
      {
        "num": "02",
        "t": "Mobilise",
        "x": "Vehicles, drivers and dispatch are put in place before the first shift."
      },
      {
        "num": "03",
        "t": "Run and report",
        "x": "Routes run daily with live tracking and monthly performance reports."
      }
    ],
    "cases": [
      {
        "sector": "Giga projects",
        "years": "2025 to present",
        "place": "NEOM, Saudi Arabia",
        "title": "NEOM Trojena Project",
        "stats": [
          {
            "v": "18",
            "l": "Luxury coaches a month"
          },
          {
            "v": "24/7",
            "l": "Dispatch support"
          }
        ]
      },
      {
        "sector": "Energy and corporate",
        "years": "2024 to present",
        "place": "Jubail and Eastern Region, KSA",
        "title": "Siemens Energy",
        "stats": [
          {
            "v": "7",
            "l": "Day coverage"
          },
          {
            "v": "0",
            "l": "Major incidents"
          }
        ]
      }
    ],
    "services": [
      {
        "name": "Corporate Fleet and Workforce Mobility",
        "href": "/services/corporate-transportation"
      },
      {
        "name": "Group and Coach Charter",
        "href": "/services/bus-coach-hire"
      },
      {
        "name": "Executive and Corporate Mobility",
        "href": "/services/chauffeur-vip"
      }
    ],
    "vehicles": [
      "Executive SUV",
      "Executive Van",
      "Coach"
    ],
    "faqs": [
      {
        "q": "Can AB provide a dedicated fleet for a multi year project?",
        "a": "Yes. AB procures and leases dedicated fleets for long term government and corporate contracts."
      },
      {
        "q": "Do you operate at remote sites?",
        "a": "Yes. Workforce and project site transport includes shift based routes to remote locations."
      }
    ],
    "others": [
      {
        "name": "Events and exhibitions",
        "href": "/industries/events"
      },
      {
        "name": "Government and protocol",
        "href": "/industries/government-diplomatic"
      },
      {
        "name": "Aviation and crew",
        "href": "/industries/aviation"
      },
      {
        "name": "Hospitality and DMCs",
        "href": "/industries/hospitality"
      },
      {
        "name": "Sports and entertainment",
        "href": "/industries/sports"
      },
      {
        "name": "Corporate and enterprise",
        "href": "/industries/corporate-enterprise"
      }
    ],
    "ctaH2": "Planning transport for energy and giga projects?",
    "ctaP": "Share your dates, passenger numbers and locations and an operations planner will design the movement plan around them."
  },
  "events": {
    "slug": "events",
    "title": "Events and exhibitions transportation | AB.Limo",
    "badge": "Events and exhibitions",
    "h1": "Event transportation that runs on schedule, from the first arrival to the last shuttle",
    "heroP": "Conferences, festivals and exhibitions move thousands of people through a few gates in a few hours. AB plans the vehicle mix, staffs the venue and runs every movement from a dedicated event control room.",
    "heroImage": "/industries/events.jpg",
    "heroImagePos": "50% 62%",
    "strip": [
      {
        "v": "725",
        "l": "Vehicles at a single event peak"
      },
      {
        "v": "50+",
        "l": "International events delivered"
      },
      {
        "v": "24/7",
        "l": "Event control room"
      }
    ],
    "statementEyebrow": "How we work",
    "statement": "Every event programme gets its own transport plan: loops, VIP car pools, standby vehicles and coordinators at every pickup point, agreed with your team in writing before the first guest lands.",
    "needsEyebrow": "What you need from us",
    "needsH2": "Built for events and exhibitions",
    "needs": [
      {
        "num": "01",
        "t": "Delegate and visitor shuttles",
        "x": "Timed loops between hotels, venues and parking, sized to your registration numbers and adjusted live on the day."
      },
      {
        "num": "02",
        "t": "VIP and speaker movements",
        "x": "Dedicated sedans and SUVs with protocol trained chauffeurs for keynote speakers, sponsors and government guests."
      },
      {
        "num": "03",
        "t": "Venue and loading zone control",
        "x": "On site coordinators manage drop off zones, queues and vehicle staging so arrivals never back up."
      },
      {
        "num": "04",
        "t": "Post event reporting",
        "x": "Trip records, on time performance and one consolidated invoice once the event closes."
      }
    ],
    "stepsEyebrow": "How it runs",
    "stepsH2": "Three stages, one accountable partner",
    "steps": [
      {
        "num": "01",
        "t": "Plan",
        "x": "We map passenger flows, set the vehicle mix and agree service levels with your operations team."
      },
      {
        "num": "02",
        "t": "Operate",
        "x": "Coordinators and the event control room run the plan and handle changes as they happen."
      },
      {
        "num": "03",
        "t": "Report",
        "x": "You receive trip data, on time performance and a single invoice."
      }
    ],
    "cases": [
      {
        "sector": "Events and festivals",
        "years": "2021 to 2025",
        "place": "Riyadh, Saudi Arabia",
        "title": "MDL Beast Soundstorm Festival",
        "stats": [
          {
            "v": "725",
            "l": "Vehicles at peak"
          },
          {
            "v": "145K+",
            "l": "Attendees"
          },
          {
            "v": "250+",
            "l": "Artists moved"
          }
        ]
      },
      {
        "sector": "Events and exhibitions",
        "years": "2024 and 2025",
        "place": "Abu Dhabi, UAE",
        "title": "ADIPEC VIP Shuttle Services",
        "stats": [
          {
            "v": "VIP",
            "l": "Guest shuttles"
          },
          {
            "v": "2",
            "l": "Consecutive editions"
          }
        ]
      }
    ],
    "services": [
      {
        "name": "Event Transportation",
        "href": "/services/event-transportation"
      },
      {
        "name": "Group and Coach Charter",
        "href": "/services/bus-coach-hire"
      },
      {
        "name": "Airport Transfers",
        "href": "/services/airport-transfers"
      }
    ],
    "vehicles": [
      "First Class Sedan",
      "Executive SUV",
      "Executive Van",
      "Coach"
    ],
    "faqs": [
      {
        "q": "How early should we brief AB for a large event?",
        "a": "Share dates, passenger numbers and venues as early as possible so planners can secure vehicles and chauffeurs. Your account team will confirm the lead time for your programme."
      },
      {
        "q": "Can AB handle VIP movements and mass shuttles at the same event?",
        "a": "Yes. VIP car pools and delegate shuttles run side by side under one plan, monitored from the same event control room."
      }
    ],
    "others": [
      {
        "name": "Government and protocol",
        "href": "/industries/government-diplomatic"
      },
      {
        "name": "Aviation and crew",
        "href": "/industries/aviation"
      },
      {
        "name": "Energy and giga projects",
        "href": "/industries/energy"
      },
      {
        "name": "Hospitality and DMCs",
        "href": "/industries/hospitality"
      },
      {
        "name": "Sports and entertainment",
        "href": "/industries/sports"
      },
      {
        "name": "Corporate and enterprise",
        "href": "/industries/corporate-enterprise"
      }
    ],
    "ctaH2": "Planning transport for events and exhibitions?",
    "ctaP": "Share your dates, passenger numbers and locations and an operations planner will design the movement plan around them."
  },
  "government-diplomatic": {
    "slug": "government-diplomatic",
    "title": "Government and protocol transportation | AB.Limo",
    "badge": "Government and protocol",
    "h1": "Discreet ground transport for delegations, ministries and official visits",
    "heroP": "Official visits leave no room for improvisation. AB plans motorcades and delegation movements with protocol teams, using vetted chauffeurs bound by strict confidentiality.",
    "heroImage": "/industries/government.jpg",
    "heroImagePos": "62% 35%",
    "strip": [
      {
        "v": "NDA",
        "l": "Signed by every chauffeur"
      },
      {
        "v": "GPS",
        "l": "Tracking on every vehicle"
      },
      {
        "v": "2025",
        "l": "Best Supplier Award, presidential delegation"
      }
    ],
    "statementEyebrow": "How we work",
    "statement": "Protocol movements are planned with your team down to the minute: arrival sequences, vehicle order, standby cars and secure communication with security details.",
    "needsEyebrow": "What you need from us",
    "needsH2": "Built for government and protocol",
    "needs": [
      {
        "num": "01",
        "t": "Motorcade planning",
        "x": "Vehicle order, routes, timings and standby vehicles agreed with protocol and security teams in advance."
      },
      {
        "num": "02",
        "t": "Protocol trained chauffeurs",
        "x": "Chauffeurs trained in protocol, defensive driving and first aid, with background checks and NDAs."
      },
      {
        "num": "03",
        "t": "Delegation logistics",
        "x": "Airport arrivals, hotel movements and venue transfers for full delegations, coordinated from one control room."
      },
      {
        "num": "04",
        "t": "Discretion by default",
        "x": "Uniformly black fleet, confidential manifests and live GPS visibility for authorised security teams."
      }
    ],
    "stepsEyebrow": "How it runs",
    "stepsH2": "Three stages, one accountable partner",
    "steps": [
      {
        "num": "01",
        "t": "Brief",
        "x": "Protocol shares the programme, delegation size and security requirements."
      },
      {
        "num": "02",
        "t": "Plan",
        "x": "We agree vehicle order, routes, standby cars and communication lines in writing."
      },
      {
        "num": "03",
        "t": "Operate",
        "x": "Chauffeurs and coordinators run the movement with live tracking from the control room."
      }
    ],
    "cases": [
      {
        "sector": "Recognition",
        "years": "2025",
        "place": "Middle East",
        "title": "Best Supplier Award in the Middle East, presidential delegation",
        "stats": [
          {
            "v": "2025",
            "l": "Award year"
          }
        ]
      }
    ],
    "services": [
      {
        "name": "Executive and Corporate Mobility",
        "href": "/services/chauffeur-vip"
      },
      {
        "name": "Airport Transfers",
        "href": "/services/airport-transfers"
      },
      {
        "name": "Event Transportation",
        "href": "/services/event-transportation"
      }
    ],
    "vehicles": [
      "First Class Sedan",
      "Executive SUV",
      "Premium MPV"
    ],
    "faqs": [
      {
        "q": "Are AB chauffeurs vetted for government work?",
        "a": "Every chauffeur goes through comprehensive background checks, defensive driving certification and signs a Non Disclosure Agreement."
      },
      {
        "q": "Can security teams track vehicles during a visit?",
        "a": "Yes. Live GPS tracking lets authorised security teams monitor every vehicle in real time."
      }
    ],
    "others": [
      {
        "name": "Events and exhibitions",
        "href": "/industries/events"
      },
      {
        "name": "Aviation and crew",
        "href": "/industries/aviation"
      },
      {
        "name": "Energy and giga projects",
        "href": "/industries/energy"
      },
      {
        "name": "Hospitality and DMCs",
        "href": "/industries/hospitality"
      },
      {
        "name": "Sports and entertainment",
        "href": "/industries/sports"
      },
      {
        "name": "Corporate and enterprise",
        "href": "/industries/corporate-enterprise"
      }
    ],
    "ctaH2": "Planning transport for government and protocol?",
    "ctaP": "Share your dates, passenger numbers and locations and an operations planner will design the movement plan around them."
  },
  "hospitality": {
    "slug": "hospitality",
    "title": "Hospitality and DMCs transportation | AB.Limo",
    "badge": "Hospitality and DMCs",
    "h1": "A chauffeur partner for hotels, DMCs and destination specialists",
    "heroP": "Your guests judge their stay from the moment they land. AB handles guest transfers, day tours and group movements for hotels and destination management companies across the Gulf.",
    "heroImage": "/industries/hospitality.jpg",
    "heroImagePos": "45% 40%",
    "strip": [
      {
        "v": "8",
        "l": "Gulf airports served"
      },
      {
        "v": "3",
        "l": "Countries with our own fleet"
      },
      {
        "v": "24/7",
        "l": "Reservations and dispatch"
      }
    ],
    "statementEyebrow": "How we work",
    "statement": "Hotels and DMCs book through one account for airport transfers, tours, Umrah journeys and group programmes, with chauffeurs who represent your brand as well as ours.",
    "needsEyebrow": "What you need from us",
    "needsH2": "Built for hospitality and dmcs",
    "needs": [
      {
        "num": "01",
        "t": "Guest airport transfers",
        "x": "Meet and greet with flight tracking and a named meeting point at every major Gulf airport."
      },
      {
        "num": "02",
        "t": "Tours and itineraries",
        "x": "Day tours and multi day itineraries with chauffeurs who know the routes and destinations."
      },
      {
        "num": "03",
        "t": "Religious tourism",
        "x": "Jeddah, Makkah and Madinah transport for Umrah groups and pilgrims."
      },
      {
        "num": "04",
        "t": "Group programmes",
        "x": "Vans and coaches for incentive groups, weddings and leisure programmes."
      }
    ],
    "stepsEyebrow": "How it runs",
    "stepsH2": "Three stages, one accountable partner",
    "steps": [
      {
        "num": "01",
        "t": "Agree",
        "x": "We set service levels, rates and booking rules for your property or programme."
      },
      {
        "num": "02",
        "t": "Book",
        "x": "Your team books through one account by email, portal or API."
      },
      {
        "num": "03",
        "t": "Deliver",
        "x": "Chauffeurs collect your guests on time, with live updates to your concierge."
      }
    ],
    "cases": [
      {
        "sector": "Events and festivals",
        "years": "2022 and 2024",
        "place": "AlUla, Saudi Arabia",
        "title": "Azimuth Music Festival",
        "stats": [
          {
            "v": "100s",
            "l": "Vehicles at peak"
          },
          {
            "v": "Crew",
            "l": "Shuttle services"
          }
        ]
      }
    ],
    "services": [
      {
        "name": "Tourism and Leisure",
        "href": "/services/tourism-transportation"
      },
      {
        "name": "Airport Transfers",
        "href": "/services/airport-transfers"
      },
      {
        "name": "Group and Coach Charter",
        "href": "/services/bus-coach-hire"
      }
    ],
    "vehicles": [
      "Business Sedan",
      "First Class Sedan",
      "Premium MPV",
      "Executive Van"
    ],
    "faqs": [
      {
        "q": "Can hotels book through an API?",
        "a": "Client portals and direct billing are available, with API integration where required by clients or tech platforms."
      },
      {
        "q": "Do you handle Umrah transport?",
        "a": "Yes. AB runs Jeddah, Makkah and Madinah transport for Umrah groups."
      }
    ],
    "others": [
      {
        "name": "Events and exhibitions",
        "href": "/industries/events"
      },
      {
        "name": "Government and protocol",
        "href": "/industries/government-diplomatic"
      },
      {
        "name": "Aviation and crew",
        "href": "/industries/aviation"
      },
      {
        "name": "Energy and giga projects",
        "href": "/industries/energy"
      },
      {
        "name": "Sports and entertainment",
        "href": "/industries/sports"
      },
      {
        "name": "Corporate and enterprise",
        "href": "/industries/corporate-enterprise"
      }
    ],
    "ctaH2": "Planning transport for hospitality and dmcs?",
    "ctaP": "Share your dates, passenger numbers and locations and an operations planner will design the movement plan around them."
  },
  "sports": {
    "slug": "sports",
    "title": "Sports and entertainment transportation | AB.Limo",
    "badge": "Sports and entertainment",
    "h1": "Team, talent and fan transport built around match days and show times",
    "heroP": "Kick off and curtain times do not move. AB plans team, talent and crew movements around the schedule, from tournament fleets to artist transport for the region’s biggest shows.",
    "heroImage": "/industries/sports.jpg",
    "heroImagePos": "20% 70%",
    "strip": [
      {
        "v": "All",
        "l": "Stadiums covered at FIFA World Cup Qatar 2022"
      },
      {
        "v": "250+",
        "l": "Artists moved at MDL Beast"
      },
      {
        "v": "24/7",
        "l": "Event control room"
      }
    ],
    "statementEyebrow": "How we work",
    "statement": "Sports federations, promoters and production teams get one partner for athletes, artists, crews and hospitality guests, with discreet chauffeurs and a control room watching every vehicle.",
    "needsEyebrow": "What you need from us",
    "needsH2": "Built for sports and entertainment",
    "needs": [
      {
        "num": "01",
        "t": "Team and athlete transport",
        "x": "Hotel, training and venue movements built around match schedules."
      },
      {
        "num": "02",
        "t": "Artist and talent movements",
        "x": "Discreet chauffeurs and dedicated vehicles for artists and their teams."
      },
      {
        "num": "03",
        "t": "Crew and production shuttles",
        "x": "Vans and coaches for production crews, load in and load out."
      },
      {
        "num": "04",
        "t": "Hospitality guests",
        "x": "VIP and sponsor transfers to boxes, lounges and after parties."
      }
    ],
    "stepsEyebrow": "How it runs",
    "stepsH2": "Three stages, one accountable partner",
    "steps": [
      {
        "num": "01",
        "t": "Plan",
        "x": "We align vehicles and timings with the match or show schedule."
      },
      {
        "num": "02",
        "t": "Operate",
        "x": "Coordinators at venues and hotels run movements with the control room."
      },
      {
        "num": "03",
        "t": "Report",
        "x": "Trip records and a consolidated invoice after the event."
      }
    ],
    "cases": [
      {
        "sector": "Sports",
        "years": "2022",
        "place": "Doha, Qatar",
        "title": "FIFA World Cup Qatar 2022",
        "stats": [
          {
            "v": "All",
            "l": "Stadiums covered"
          },
          {
            "v": "<3",
            "l": "Months to deliver"
          }
        ]
      },
      {
        "sector": "Events and festivals",
        "years": "2021 to 2025",
        "place": "Riyadh, Saudi Arabia",
        "title": "MDL Beast Soundstorm Festival",
        "stats": [
          {
            "v": "725",
            "l": "Vehicles at peak"
          },
          {
            "v": "145K+",
            "l": "Attendees"
          },
          {
            "v": "250+",
            "l": "Artists moved"
          }
        ]
      }
    ],
    "services": [
      {
        "name": "Event Transportation",
        "href": "/services/event-transportation"
      },
      {
        "name": "Group and Coach Charter",
        "href": "/services/bus-coach-hire"
      },
      {
        "name": "Executive and Corporate Mobility",
        "href": "/services/chauffeur-vip"
      }
    ],
    "vehicles": [
      "First Class Sedan",
      "Executive SUV",
      "Executive Van",
      "Coach"
    ],
    "faqs": [
      {
        "q": "Which events has AB supported?",
        "a": "Recent work includes the FIFA World Cup Qatar 2022, MDL Beast Soundstorm and the Azimuth Music Festival."
      },
      {
        "q": "Can you keep artist movements confidential?",
        "a": "Yes. Chauffeurs sign NDAs and manifests are shared only with authorised staff."
      }
    ],
    "others": [
      {
        "name": "Events and exhibitions",
        "href": "/industries/events"
      },
      {
        "name": "Government and protocol",
        "href": "/industries/government-diplomatic"
      },
      {
        "name": "Aviation and crew",
        "href": "/industries/aviation"
      },
      {
        "name": "Energy and giga projects",
        "href": "/industries/energy"
      },
      {
        "name": "Hospitality and DMCs",
        "href": "/industries/hospitality"
      },
      {
        "name": "Corporate and enterprise",
        "href": "/industries/corporate-enterprise"
      }
    ],
    "ctaH2": "Planning transport for sports and entertainment?",
    "ctaP": "Share your dates, passenger numbers and locations and an operations planner will design the movement plan around them."
  }
};

export function getIndustryData(slug: string): IndustryDetailData | undefined {
  return INDUSTRY_DETAILS[slug];
}

export function getAllIndustrySlugs(): string[] {
  return Object.keys(INDUSTRY_DETAILS);
}
