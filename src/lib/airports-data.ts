// Auto-generated airport pages data from airports-md
export interface AirportVehicle {
  name: string;
  tagline: string;
  model: string;
  idealFor: string;
  description: string;
  capacity: string;
  luggage: string;
  image: string;
}

export interface AirportJourney {
  title: string;
  priceNote?: string;
  description: string;
}

export interface AirportStep {
  step: number;
  title: string;
  description: string;
}

export interface AirportTerminal {
  name: string;
  description: string;
}

export interface AirportServiceItem {
  title: string;
  description: string;
  href: string;
  icon: string;
}

export interface AirportFaq {
  q: string;
  a: string;
}

export interface AirportPageData {
  slug: string;
  iata: string;
  name: string;
  fullName: string;
  cityName: string;
  citySlug: string;
  countryName: string;
  countrySlug: string;
  phone: string;
  pickupDefault: string;
  dropoffDefault: string;
  heroTitle: string;
  heroDescription: string;
  heroImage: string;
  heroImageAlt: string;
  fleetEyebrow: string;
  fleetHeading: string;
  fleetDescription: string;
  vehicles: AirportVehicle[];
  journeysEyebrow: string;
  journeysHeading: string;
  journeysDescription: string;
  journeys: AirportJourney[];
  howItWorksEyebrow: string;
  howItWorksHeading: string;
  howItWorksIntro: string;
  howItWorksSteps: AirportStep[];
  terminalsEyebrow: string;
  terminalsHeading: string;
  terminalsIntro: string;
  terminals: AirportTerminal[];
  terminalImage?: string;
  terminalImageAlt?: string;
  servicesEyebrow: string;
  servicesHeading: string;
  servicesIntro: string;
  servicesList: AirportServiceItem[];
  servicesOutro: string;
  faqsEyebrow: string;
  faqsHeading: string;
  faqs: AirportFaq[];
  ctaHeading: string;
  ctaDescription: string;
  ctaPhone: string;
}

export const AIRPORTS_DATA: Record<string, AirportPageData> = {
  "al-maktoum-international-dwc": {
    "slug": "al-maktoum-international-dwc",
    "iata": "DWC",
    "name": "Al Maktoum International Airport (DWC) Transfers and Al Maktoum Airport Chauffeur in Dubai",
    "fullName": "Al Maktoum International Airport (DWC) Transfers and Al Maktoum Airport Chauffeur in Dubai",
    "cityName": "Dubai",
    "citySlug": "dubai",
    "countryName": "United Arab Emirates",
    "countrySlug": "uae",
    "phone": "+971 50 918 0556",
    "pickupDefault": "Al Maktoum International Airport (DWC)",
    "dropoffDefault": "Dubai Marina, Dubai",
    "heroTitle": "Al Maktoum International Airport (DWC) Transfers and Al Maktoum Airport Chauffeur in Dubai",
    "heroDescription": "Booking an Al Maktoum airport chauffeur provides reliable private ground transportation across Dubai for corporate executives and international delegations.\n\nDirect transfers from Al Maktoum International Airport (DWC) connect arriving passengers seamlessly to major financial hubs, private residences and regional business events.",
    "heroImage": "/airports/www.ab.limo-airports-al-maktoum-international-dwc-images/image1.jpg",
    "heroImageAlt": "Al Maktoum International Airport (DWC) Transfers and Al Maktoum Airport Chauffeur in Dubai chauffeur arrivals",
    "fleetEyebrow": "The DWC fleet",
    "fleetHeading": "Fleet Selection for an Al Maktoum Airport Chauffeur in Dubai",
    "fleetDescription": "Selecting the appropriate vehicle class for private airport transfers supports comfort, ample luggage capacity and discreet travel across Dubai for every demanding corporate schedule and regional VIP itinerary.",
    "vehicles": [
      {
        "name": "Standard Sedan",
        "tagline": "Practical city transfer",
        "model": "Toyota Camry or similar",
        "idealFor": "Ideal for: Solo business travellers and light luggage",
        "description": "A comfortable sedan offering smooth transfers from DWC to central Dubai. Designed for everyday corporate efficiency, this class provides a quiet cabin environment, reliable climate control and dedicated space for standard luggage items.",
        "capacity": "3 guests",
        "luggage": "2 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image2.jpg"
      },
      {
        "name": "Business Sedan",
        "tagline": "Executive travel standard",
        "model": "Mercedes E Class or similar",
        "idealFor": "Ideal for: Corporate professionals and visiting delegates",
        "description": "An executive sedan tailored for productive journeys across Dubai. Passengers enjoy premium leather upholstery, refined acoustics and acoustic insulation suitable for business calls while travelling from Al Maktoum International Airport to city commercial districts.",
        "capacity": "3 guests",
        "luggage": "3 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image3.jpg"
      },
      {
        "name": "First Class Sedan",
        "tagline": "Uncompromising luxury",
        "model": "Mercedes S Class or similar",
        "idealFor": "Ideal for: VIP clients and senior executive leaders",
        "description": "The premier Mercedes S Class represents the pinnacle of executive ground travel at DWC. Offering extended legroom, reclining seats and advanced cabin refinement, this class provides seamless travel for dignitaries entering Dubai.",
        "capacity": "3 guests",
        "luggage": "3 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image4.jpg"
      },
      {
        "name": "Executive SUV",
        "tagline": "Spacious prestige",
        "model": "Cadillac Escalade or GMC Yukon or similar",
        "idealFor": "Ideal for: Executive groups and travellers with extra luggage",
        "description": "Commanding presence paired with generous interior capacity makes the GMC Yukon and Cadillac Escalade ideal for transfers across Dubai. This luxury SUV delivers superior ride comfort, ample legroom and expansive storage for airport arrivals.",
        "capacity": "5 guests",
        "luggage": "5 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image5.jpg"
      },
      {
        "name": "Premium MPV",
        "tagline": "Refined group comfort",
        "model": "Mercedes V Class or similar",
        "idealFor": "Ideal for: Corporate teams, families and roadshow groups",
        "description": "The Mercedes V Class combines multi passenger utility with luxury finishes for seamless travel from DWC. Flexible seating configurations accommodate corporate delegations or families arriving in Dubai with substantial baggage requirements.",
        "capacity": "6 guests",
        "luggage": "6 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image6.jpg"
      },
      {
        "name": "Executive Van",
        "tagline": "Group logistics and events",
        "model": "Mercedes Sprinter or similar",
        "idealFor": "Ideal for: Event delegations, flight crews and conference attendees",
        "description": "A spacious executive van designed to transport larger groups together in complete comfort across Dubai. Ample luggage compartments and upright cabin clearance allow seamless transfers for private conference attendees and hospitality teams. Popular journeys",
        "capacity": "7-8 guests",
        "luggage": "8 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image7.jpg"
      }
    ],
    "journeysEyebrow": "Popular journeys",
    "journeysHeading": "Popular Journeys Across Dubai from Al Maktoum Airport",
    "journeysDescription": "Direct highway connections link southern Dubai to key economic centres, luxury beachfront resorts and neighbouring emirates with predictable transfer scheduling.",
    "journeys": [
      {
        "title": "DWC to Dubai Marina",
        "priceNote": "From AED price · minutes",
        "description": "Direct executive transit connecting Al Maktoum International Airport to coastal hotels, residential towers and business offices in Dubai Marina."
      },
      {
        "title": "DWC to Downtown Dubai",
        "priceNote": "From AED price · minutes",
        "description": "Prompt point to point transfers linking the arrivals terminal directly to the Burj Khalifa district, commercial plazas and DIFC financial offices."
      },
      {
        "title": "DWC to Abu Dhabi",
        "priceNote": "From AED price · minutes",
        "description": "Cross border intercity travel connecting southern Dubai directly to government headquarters, embassies and corporate venues in Abu Dhabi."
      },
      {
        "title": "DWC to Expo City Dubai",
        "priceNote": "From AED price · minutes",
        "description": "Rapid transfer routes serving global exhibition pavilions, trade conferences and multinational corporate offices situated at Expo City Dubai."
      }
    ],
    "howItWorksEyebrow": "How it works",
    "howItWorksHeading": "Meet and Greet Services with an Al Maktoum Airport Chauffeur in Dubai",
    "howItWorksIntro": "Arriving at the airport is streamlined with professional DWC meet and greet coordination. Chauffeurs monitor incoming schedules through real time flight tracking, adjusting automatically for delays or early landings so that the driver is positioned before touchdown. Upon clearing customs and baggage claim, guests receive a personalised DWC arrivals pickup right inside the terminal arrivals hall, with the chauffeur displaying a clear digital name board. The chauffeur provides attentive luggage help, guiding passengers smoothly to the waiting vehicle parked at the designated meeting point per terminal . Every booking includes complimentary free waiting time , allowing travellers sufficient time to navigate immigration and collect personal effects without rushing when arriving in Dubai.",
    "howItWorksSteps": [
      {
        "step": 1,
        "title": "Book",
        "description": "Reserve the preferred vehicle class online in advance, detailing flight numbers, arrival times and specific passenger requirements across Dubai."
      },
      {
        "step": 2,
        "title": "Track",
        "description": "Operations personnel monitor real time flight progress, adjusting pickup schedules automatically for delays or early landings at DWC."
      },
      {
        "step": 3,
        "title": "Meet",
        "description": "A professional chauffeur greets passengers in the arrivals hall with an electronic name board, assisting promptly with all luggage items."
      },
      {
        "step": 4,
        "title": "Ride",
        "description": "Relax in comfort inside a pristine premium vehicle while navigating direct transfer routes to business or leisure destinations across Dubai. Terminal navigation"
      }
    ],
    "terminalsEyebrow": "Terminal Coverage",
    "terminalsHeading": "Passenger Terminals at Al Maktoum International Airport (DWC) in Dubai",
    "terminalsIntro": "Terminal layouts at the airport accommodate commercial travellers, corporate aviation clients and private charter movements through distinct passenger processing facilities.",
    "terminals": [
      {
        "name": "Passenger Terminal",
        "description": "Commercial passengers arriving at Passenger Terminal meet chauffeurs at the dedicated meeting point inside the main arrivals area. The driver assists with luggage before escorting travellers to waiting executive vehicles in Dubai."
      },
      {
        "name": "VIP & Executive Terminal",
        "description": "Private aviation guests and government delegations using the VIP & Executive Terminal experience curb side greeting at meeting point . Dedicated chauffeurs coordinate discreet tarmac side or private lounge pick up services in Dubai."
      },
      {
        "name": "Private Aviation FBO Facilities",
        "description": "Discreet ground transportation for chartered flights operates via private aviation FBO facilities . Chauffeurs coordinate directly with handling agents at meeting point to facilitate rapid, private departure across Dubai with minimal transit delays. Services from DWC"
      }
    ],
    "terminalImageAlt": "Al Maktoum International Airport (DWC) Transfers and Al Maktoum Airport Chauffeur in Dubai terminal arrivals",
    "servicesEyebrow": "Comprehensive Transportation",
    "servicesHeading": "Chauffeur Services Connecting DWC Across Dubai",
    "servicesIntro": "Ground transport solutions cover individual executive travel, corporate delegations, intercity journeys and ongoing company mobility programmes.",
    "servicesList": [
      {
        "title": "Airport Transfers in Dubai",
        "description": "Reliable terminal pickups and prompt arrivals at corporate offices.",
        "href": "/services/airport-transfers",
        "icon": "Plane"
      },
      {
        "title": "Chauffeur & VIP in Dubai",
        "description": "Diplomatic itineraries, private roadshows and high profile business appointments.",
        "href": "/services/chauffeur-service",
        "icon": "Crown"
      },
      {
        "title": "Intercity Transfers",
        "description": "Southern Dubai seamlessly to Abu Dhabi, Sharjah and northern emirates.",
        "href": "/services/intercity-transfers",
        "icon": "MapPin"
      },
      {
        "title": "Corporate Travel Accounts",
        "description": "Centralized billing, travel policy compliance and recurring executive journeys.",
        "href": "/corporate-accounts",
        "icon": "Building2"
      }
    ],
    "servicesOutro": "Secure private ground transportation from Al Maktoum International Airport for upcoming executive itineraries and business delegations.",
    "faqsEyebrow": "Questions",
    "faqsHeading": "Frequently Asked Questions About DWC Transfers in Dubai",
    "faqs": [
      {
        "q": "How do passengers book a DWC chauffeur for travel into Dubai?",
        "a": "Passengers can book a DWC chauffeur in advance through the online reservation platform or by contacting operations directly. Providing flight details, passenger counts and destination addresses enables the team to assign the appropriate vehicle and schedule driver dispatch. Corporate clients may also coordinate bookings through dedicated account managers for recurring transfers across Dubai and neighbouring emirates."
      },
      {
        "q": "What does the DWC meet and greet service include upon arrival?",
        "a": "The DWC meet and greet service provides a seamless transition from terminal to vehicle. The assigned chauffeur monitors flight progress, enters the terminal arrivals hall, and displays a personalised name board. The driver assists with luggage handling and escorts passengers directly to the waiting vehicle, eliminating navigation delays through public transport queues or general passenger pickup areas."
      },
      {
        "q": "Where does the chauffeur conduct the DWC arrivals pickup?",
        "a": "The chauffeur conducts the DWC arrivals pickup at the designated meeting point per terminal immediately past customs clearance. For commercial flights, greeting takes place within the public arrivals hall. Passengers arriving via private aviation or VIP terminals are met curb side or within private handling lounges, following prior coordination with local terminal handling staff."
      },
      {
        "q": "How does flight tracking support an Al Maktoum International Airport chauffeur pickup?",
        "a": "Automated flight tracking systems monitor incoming commercial and private flights in real time. Chauffeur dispatch schedules adjust dynamically if a flight experiences delays or touches down earlier than scheduled. This continuous monitoring helps position the chauffeur at the terminal before passengers exit baggage claim, preventing unnecessary waiting times or missed connections."
      },
      {
        "q": "How much complimentary waiting time is provided for airport arrivals?",
        "a": "Every airport booking includes complimentary free waiting time starting from the recorded flight touchdown. This buffer accommodates standard immigration clearance, customs inspections and baggage collection procedures. If travellers encounter unexpected transit delays within the terminal, dispatch teams can adjust chauffeur schedules accordingly upon notification."
      },
      {
        "q": "Can an Al Maktoum airport chauffeur provide transfers from DWC to Abu Dhabi or central Dubai?",
        "a": "Yes, professional chauffeurs provide direct point to point transfers connecting DWC to all central Dubai business districts as well as Abu Dhabi. Located in southern Dubai near major motorway arteries, the airport offers efficient highway access for intercity journeys, allowing executive travellers to reach government centres, hotels and financial headquarters without vehicle transfers."
      },
      {
        "q": "What vehicle options are recommended for corporate travel and VIP transport?",
        "a": "Executive sedans such as the Mercedes S Class provide discreet comfort for individual executives and diplomatic delegates. Larger groups and corporate roadshow teams benefit from spacious Mercedes V Class MPVs or Cadillac Escalade SUVs, offering generous seating and luggage space. Fleet specialists help corporate travel managers choose appropriate vehicles matching passenger volume and protocol standards."
      }
    ],
    "ctaHeading": "Your Chauffeur Is Waiting at DWC: Al Maktoum Airport Chauffeur in Dubai",
    "ctaDescription": "Arranging reliable airport transportation from Al Maktoum International Airport connects arriving passengers directly to commercial, diplomatic and residential hubs across Dubai. Dedicated flight tracking, terminal meet and greet services and an executive fleet maintain consistent standards for all regional itineraries. AB Dubai provides operational ground transport coordination supported by round the clock dispatch management.\n\nConnect with round the clock operations coordinators for immediate transfers or managed group transportation requirements across Dubai.",
    "ctaPhone": "+966 58 111 8720"
  },
  "dubai-international-dxb": {
    "slug": "dubai-international-dxb",
    "iata": "DXB",
    "name": "Dubai International Airport (DXB) Transfers",
    "fullName": "Dubai International Airport (DXB) Transfers: Airport Chauffeur Service Dubai",
    "cityName": "Dubai",
    "citySlug": "dubai",
    "countryName": "United Arab Emirates",
    "countrySlug": "uae",
    "phone": "+971 50 918 0556",
    "pickupDefault": "Dubai International Airport (DXB)",
    "dropoffDefault": "DIFC, Dubai",
    "heroTitle": "Dubai International Airport (DXB) Transfers: Airport Chauffeur Service Dubai",
    "heroDescription": "An airport chauffeur service Dubai connects arriving passengers directly from Dubai International Airport (DXB) to city destinations with dedicated flight tracking and professional meet and greet attendance. Chauffeurs assist with luggage at arrivals and manage local routes smoothly.\n\nVehicle selection and scheduled pickup timing depend on group size, luggage volume, and onward corporate itinerary requirements across the emirates.",
    "heroImage": "/airports/www.ab.limo-airports-dubai-international-dxb-images/image1.jpg",
    "heroImageAlt": "Dubai International Airport (DXB) Transfers: Airport Chauffeur Service Dubai chauffeur arrivals",
    "fleetEyebrow": "The DXB fleet",
    "fleetHeading": "Airport Chauffeur Service Dubai Fleet for DXB Transfers",
    "fleetDescription": "AB maintains an executive fleet of luxury sedans, premium sports utility vehicles, and executive passenger vans configured for comfortable transfers from Dubai International Airport across the United Arab Emirates.",
    "vehicles": [
      {
        "name": "Standard Sedan",
        "tagline": "Practical urban travel",
        "model": "Toyota Camry or similar",
        "idealFor": "Ideal for: Individual travellers and routine business travel",
        "description": "Reliable sedan transport from DXB to regional offices and hotel accommodations across the city. Professional drivers manage luggage and navigation while passengers prepare for upcoming meetings in quiet comfort.",
        "capacity": "3 guests",
        "luggage": "2 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image2.jpg"
      },
      {
        "name": "Business Sedan",
        "tagline": "Premium corporate travel",
        "model": "Mercedes E Class or similar",
        "idealFor": "Ideal for: Corporate executives and business travel",
        "description": "Executive car service connecting Dubai International Airport chauffeur clients with major commercial towers and financial hubs. Passengers enjoy comfortable leather interiors, mobile device connectivity, and quiet cabin acoustics during every transfer.",
        "capacity": "3 guests",
        "luggage": "3 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image3.jpg"
      },
      {
        "name": "First Class Sedan",
        "tagline": "Flagship VIP comfort",
        "model": "Mercedes S Class or similar",
        "idealFor": "Ideal for: VIP transport and senior executives",
        "description": "First class private driver experience delivering distinguished passengers from DXB directly to five star hospitality suites. The Mercedes S Class provides refined ride comfort, privacy blinds, and dedicated cabin climate control.",
        "capacity": "3 guests",
        "luggage": "3 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image4.jpg"
      },
      {
        "name": "Executive SUV",
        "tagline": "Elevated prestige and space",
        "model": "Cadillac Escalade, GMC Yukon or similar",
        "idealFor": "Ideal for: VIP delegations and passenger comfort with extra luggage",
        "description": "Spacious luxury car transport built for executive road presence across city avenues. Arriving passengers secure generous luggage capacity alongside commanding seating positions inside either a Cadillac Escalade or GMC Yukon.",
        "capacity": "5 guests",
        "luggage": "5 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image5.jpg"
      },
      {
        "name": "Premium MPV",
        "tagline": "Luxury team transport",
        "model": "Mercedes V Class or similar",
        "idealFor": "Ideal for: Corporate teams, family offices, and roadshow delegations",
        "description": "Conference style seating allows mobile meetings between DXB terminal gates and corporate headquarters. The Mercedes V Class accommodates multiple passengers with ample space for baggage claim collection and personal equipment.",
        "capacity": "6 guests",
        "luggage": "6 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image6.jpg"
      },
      {
        "name": "Executive Van",
        "tagline": "Group logistics support",
        "model": "Mercedes Sprinter or similar",
        "idealFor": "Ideal for: Event delegates and group transfers",
        "description": "Managed ground transportation moving conference attendees and corporate staff together in complete comfort. Professional chauffeurs handle scheduled multi passenger collections, group baggage assistance, and organised onward transfer across the UAE. Popular journeys",
        "capacity": "7-8 guests",
        "luggage": "8 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image7.jpg"
      }
    ],
    "journeysEyebrow": "Popular journeys",
    "journeysHeading": "Popular Dubai Airport Transfer with Chauffeur Routes",
    "journeysDescription": "Prearranged airport transfers provide direct transportation from terminal concourses to commercial districts, residential developments, and neighbouring emirates without public transit delays.",
    "journeys": [
      {
        "title": "DXB to Downtown Dubai and DIFC",
        "priceNote": "",
        "description": "Direct airport transfer connecting arrivals with international financial offices, luxury hotels, and Downtown residences. From AED price · minutes."
      },
      {
        "title": "DXB to Abu Dhabi",
        "priceNote": "",
        "description": "Seamless executive travel between Dubai International Airport and government headquarters, embassies, or capital venues in Abu Dhabi. From AED price · minutes."
      },
      {
        "title": "DXB to Sharjah",
        "priceNote": "",
        "description": "Swift transit from arrivals halls to industrial zones, academic institutions, and corporate complexes across Sharjah. From AED price · minutes."
      },
      {
        "title": "DXB to Ras Al Khaimah",
        "priceNote": "",
        "description": "Comfortable intercity car with driver service serving hospitality resorts, manufacturing hubs, and private estates in Ras Al Khaimah. From AED price · minutes."
      }
    ],
    "howItWorksEyebrow": "How it works",
    "howItWorksHeading": "DXB Meet and Greet Chauffeur Operations",
    "howItWorksIntro": "Every DXB meet and greet booking begins with automated flight tracking managed through operations dispatch. Chauffeurs monitor incoming flight status in real time to adjust pickup timings for early landings or flight delays. Upon clearance through customs and baggage claim, your professional chauffeur stands in the designated terminal arrivals hall displaying a personalised name board. Passengers receive coordinated DXB arrivals pickup guidance to their specific meeting point per terminal . The service includes free waiting time following flight touchdown to allow unhurried movement through passport control and baggage collection. Your driver assists with luggage handling from the terminal concourse directly to the waiting vehicle.",
    "howItWorksSteps": [
      {
        "step": 1,
        "title": "Book",
        "description": "Submit passenger flight details, terminal information, and preferred vehicle class online or through corporate booking channels in advance."
      },
      {
        "step": 2,
        "title": "Track",
        "description": "Operations teams track arrival flights continuously, matching driver staging with precise touchdown times to eliminate curbside delays."
      },
      {
        "step": 3,
        "title": "Meet",
        "description": "Your private driver waits at the dedicated terminal arrivals hall greeting area, presenting a clear name board and managing passenger luggage."
      },
      {
        "step": 4,
        "title": "Ride",
        "description": "Relax inside an air conditioned luxury vehicle while a licensed chauffeur navigates highway corridors directly to your Dubai destination. Terminal Coverage"
      }
    ],
    "terminalsEyebrow": "Terminal Coverage",
    "terminalsHeading": "Navigating Dubai International Airport Terminals",
    "terminalsIntro": "Dubai International Airport operates multiple passenger hubs requiring dedicated arrivals coordination for swift curbside departure.",
    "terminals": [
      {
        "name": "Terminal 1",
        "description": "Serving international carriers, Terminal 1 handles overseas arrivals with structured concourses. Chauffeurs greet arriving passengers at the dedicated meeting point immediately after baggage clearance to escort guests to parked executive vehicles."
      },
      {
        "name": "Terminal 2",
        "description": "Dedicated primarily to regional flights and budget services, Terminal 2 offers streamlined processing. Your DXB chauffeur waits at the designated meeting point to assist with luggage and provide direct transport onward."
      },
      {
        "name": "Terminal 3",
        "description": "As the primary hub for Emirates airline, Terminal 3 features expansive arrivals halls. Chauffeurs stand ready at the agreed meeting point near exits to facilitate rapid departure into premium ground vehicles."
      },
      {
        "name": "VIP and Private Terminal Options",
        "description": "For executive aviation passengers using private jet facilities and VIP lounges, ground transfers link directly with tarmac suites. Chauffeurs coordinate private arrivals at designated VIP meeting points with full discretion. Comprehensive Transportation"
      }
    ],
    "terminalImageAlt": "Dubai International Airport (DXB) Transfers: Airport Chauffeur Service Dubai terminal arrivals",
    "servicesEyebrow": "Comprehensive Transportation",
    "servicesHeading": "Airport Chauffeur Service Dubai Transportation Options",
    "servicesIntro": "AB provides specialized ground transportation tailored for executive aviation, commercial arrivals, and ongoing business schedules across the UAE:",
    "servicesList": [
      {
        "title": "Airport Transfers in Dubai",
        "description": "Scheduled private transfers between airport terminals and commercial properties across Dubai.",
        "href": "/services/airport-transfers",
        "icon": "Plane"
      },
      {
        "title": "Chauffeur & VIP in Dubai",
        "description": "Dedicated hourly chauffeur and full-day vehicle hire for diplomatic delegations and executive itineraries.",
        "href": "/services/chauffeur-service",
        "icon": "Crown"
      },
      {
        "title": "Intercity Transfers",
        "description": "Direct long-distance highway journeys connecting Dubai with regional commercial hubs and neighbouring emirates.",
        "href": "/services/intercity-transfers",
        "icon": "MapPin"
      },
      {
        "title": "Corporate Travel Accounts",
        "description": "Centralised management, custom billing arrangements, and protocol coordination for enterprise travel departments.",
        "href": "/corporate-accounts",
        "icon": "Building2"
      }
    ],
    "servicesOutro": "Organisations requiring full day hire or hourly chauffeur availability benefit from central billing, licensed and insured vehicles, and tailored corporate travel accounts managed by our regional operations.",
    "faqsEyebrow": "Questions",
    "faqsHeading": "Frequently Asked Questions About Airport Chauffeur Service Dubai",
    "faqs": [
      {
        "q": "How does flight tracking work for DXB arrivals?",
        "a": "Operations teams monitor incoming flight schedules in real time using automated commercial aviation tracking feeds. When flights arrive earlier than expected or encounter unexpected air traffic delays, chauffeur arrival times adjust automatically. This tracking coordination helps drivers stage at the correct terminal pickup zones without requiring passengers to make manual itinerary updates during their flight."
      },
      {
        "q": "Where is the chauffeur meeting point at DXB terminals?",
        "a": "Chauffeurs assemble in the official arrivals hall immediately outside customs and baggage claim exit doors. For Terminal 1, Terminal 2, and Terminal 3, your driver waits at the confirmed meeting point holding a distinct digital or printed name board. Private aviation passengers receive personalised curbside collection at designated executive terminal suites ."
      },
      {
        "q": "What free waiting time is included with a DXB chauffeur booking?",
        "a": "Every airport transfer from DXB includes free waiting time starting from the recorded aircraft touchdown timestamp. This complimentary window accommodates immigration processing, baggage claim collection, and customs clearance procedures. Should extended delays occur inside the terminal, our operations team coordinates with the assigned driver to adjust collection schedules accordingly."
      },
      {
        "q": "What luggage allowance applies across different chauffeur vehicle classes?",
        "a": "Vehicle capacity varies depending on the reserved class and the total number of passengers. Executive sedans such as the Mercedes S Class typically hold two standard suitcases, while executive SUVs including the Cadillac Escalade and GMC Yukon accommodate larger travel bags. For extensive delegation luggage or trade show equipment, the Mercedes V Class or executive vans offer optimal cargo volume."
      },
      {
        "q": "Can I arrange intercity transfers directly from DXB to other emirates?",
        "a": "Direct intercity transfers operate from DXB to Abu Dhabi, Sharjah, Ras Al Khaimah, and all northern emirates. Passengers travel directly from arrivals halls to their final destinations without requiring local taxi transfers or vehicle exchanges. Chauffeurs select optimal highway routes to deliver smooth, quiet intercity travel for corporate delegations and executive visitors."
      },
      {
        "q": "How are corporate accounts and multiple executive bookings managed?",
        "a": "Corporate travel managers and executive assistants can establish centralized corporate accounts with AB for streamlined dispatch across the UAE. Corporate accounts provide consolidated billing, detailed trip reporting, and dedicated account support. Travel coordinators manage multiple simultaneous arrivals, VIP transport itineraries, and hourly chauffeur schedules through professional operations teams based in Dubai and Riyadh."
      },
      {
        "q": "What standards apply to chauffeur licensing and vehicle safety?",
        "a": "Professional chauffeurs undergo background vetting, regional route training, and customer service instruction in compliance with local transport regulations. All fleet vehicles maintain full commercial licensing and comprehensive insurance coverage. Regular mechanical inspections, spotless interior detailing, and strict safety guidelines maintain reliable passenger comfort across every journey."
      }
    ],
    "ctaHeading": "Your chauffeur is waiting at DXB.",
    "ctaDescription": "Contact AB Dubai dispatch at Suite 206, DBC Building, Al Khabaisi, Deira, Dubai, UAE, or reach headquarters 24/7 dispatch for managed bookings.\n\nReserve an executive airport chauffeur service Dubai transfer with AB for punctual airport arrivals, dedicated flight tracking, and seamless corporate transport across the UAE.",
    "ctaPhone": "+971 50 781 3880"
  },
  "hamad-international-doh": {
    "slug": "hamad-international-doh",
    "iata": "DOH",
    "name": "Hamad International Airport (DOH) Transfers",
    "fullName": "Hamad International Airport (DOH) Transfers: Doha Airport Chauffeur",
    "cityName": "Doha",
    "citySlug": "doha",
    "countryName": "Qatar",
    "countrySlug": "qatar",
    "phone": "+971 50 918 0556",
    "pickupDefault": "Hamad International Airport (DOH)",
    "dropoffDefault": "West Bay, Doha",
    "heroTitle": "Hamad International Airport (DOH) Transfers: Doha Airport Chauffeur",
    "heroDescription": "A professional Doha airport chauffeur provides direct private transfers from Hamad International Airport (DOH) to destinations across Qatar. Chauffeurs meet passengers inside arrivals for efficient executive travel.\n\nFlight schedules and luggage capacity determine vehicle selection for every transfer.\n\nHamad International Airport (DOH) to West Bay, Doha",
    "heroImage": "/airports/www.ab.limo-airports-hamad-international-doh-images/image1.jpg",
    "heroImageAlt": "Hamad International Airport (DOH) Transfers: Doha Airport Chauffeur chauffeur arrivals",
    "fleetEyebrow": "The DOH fleet",
    "fleetHeading": "Doha Airport Chauffeur Fleet Options",
    "fleetDescription": "AB operates a modern vehicle fleet maintained to verified safety standards. Each luxury car delivers comfort and connectivity for corporate travel between the airport and urban business centres.",
    "vehicles": [
      {
        "name": "Standard Sedan",
        "tagline": "",
        "model": "",
        "idealFor": "",
        "description": "Tag line: Practical comfort for individual business travel Model: Model or similar Ideal for: Solo business travellers and couples This sedan provides a quiet cabin with dual zone climate settings for transfers across Qatar. Passengers enjoy a smooth ride with space for luggage after landing at DOH.",
        "capacity": "3 guests",
        "luggage": "2 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image2.jpg"
      },
      {
        "name": "Business Sedan",
        "tagline": "",
        "model": "",
        "idealFor": "",
        "description": "Tag line: Corporate styling for executive road journeys Model: Mercedes E Class or similar Ideal for: Corporate executives and corporate travel managers Featuring ergonomic leather seating and dedicated acoustic insulation, this executive car service creates an efficient mobile office between regional business hubs and hospitality destinations.",
        "capacity": "3 guests",
        "luggage": "3 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image3.jpg"
      },
      {
        "name": "First Class Sedan",
        "tagline": "",
        "model": "",
        "idealFor": "",
        "description": "Tag line: Prestige refinement for VIP transport Model: Mercedes S Class or similar Ideal for: Diplomats, board directors, and VIP travellers The Mercedes S Class delivers unmatched ride smoothness with reclining rear seats and ambient lighting. Travellers arriving at DOH receive elite discretion and chauffeur professionalism.",
        "capacity": "3 guests",
        "luggage": "3 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image4.jpg"
      },
      {
        "name": "Executive SUV",
        "tagline": "",
        "model": "",
        "idealFor": "",
        "description": "Tag line: Elevated luxury with generous cabin space Model: Cadillac Escalade, GMC Yukon or similar Ideal for: Senior leadership teams and family travel Offering strong road presence and roomy seating, the Cadillac Escalade or GMC Yukon accommodates passengers and multiple large suitcases. The platform suits secure transit to residences and resorts.",
        "capacity": "5 guests",
        "luggage": "5 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image5.jpg"
      },
      {
        "name": "Premium MPV",
        "tagline": "",
        "model": "",
        "idealFor": "",
        "description": "Tag line: Versatile passenger transport with luxury seating Model: Mercedes V Class or similar Ideal for: Project teams, roadshows, and conference groups With adaptable seating arrangements and ample cargo volume, the Mercedes V Class enables group productivity on the road. The vehicle supports DOH arrivals requiring coordinated team movement.",
        "capacity": "6 guests",
        "luggage": "6 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image6.jpg"
      },
      {
        "name": "Executive Van",
        "tagline": "",
        "model": "",
        "idealFor": "",
        "description": "Tag line: Spacious transport for larger delegations Model: Executive Van or similar Ideal for: Event groups, sports delegations, and summit attendees Configured for larger parties, this passenger van accommodates entire delegations alongside personal luggage. Professional drivers coordinate scheduled routing between venues and terminal gates. Popular journeys",
        "capacity": "7-8 guests",
        "luggage": "8 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image7.jpg"
      }
    ],
    "journeysEyebrow": "Popular journeys",
    "journeysHeading": "Popular Doha Airport Chauffeur Journeys",
    "journeysDescription": "Selecting a dedicated DOH chauffeur provides punctual departures toward commercial districts and residential communities across the country.",
    "journeys": [
      {
        "title": "DOH to West Bay",
        "priceNote": "From QAR price · minutes",
        "description": "Label: Financial District Connection Route: Hamad International Airport to West Bay"
      },
      {
        "title": "DOH to Lusail",
        "priceNote": "From QAR price · minutes",
        "description": "Label: Smart City Route Route: Hamad International Airport to Lusail Marina"
      },
      {
        "title": "DOH to Al Wakrah",
        "priceNote": "From QAR price · minutes",
        "description": "Label: Southern Coastline Transit Route: Hamad International Airport to Al Wakrah"
      },
      {
        "title": "DOH to Al Khor",
        "priceNote": "From QAR price · minutes",
        "description": "Label: Northern Industrial Corridor Route: Hamad International Airport to Al Khor"
      }
    ],
    "howItWorksEyebrow": "How it works",
    "howItWorksHeading": "Doha Airport Chauffeur Meet and Greet Services",
    "howItWorksIntro": "The managed DOH meet and greet service provides an organised reception for incoming flights. Dispatch teams track flights live through integrated software, adjusting pickup timing automatically when arrivals experience schedule changes. Upon clearing baggage claim and customs control, guests meet a professional chauffeur presenting a personalised name board at the designated meeting point per terminal . The booking includes complimentary free waiting time , allowing passengers sufficient time to navigate border controls without pressure. Chauffeurs assist with luggage collection and guide clients directly to their executive vehicle curbside for swift departure.",
    "howItWorksSteps": [
      {
        "step": 1,
        "title": "Book",
        "description": "Submit flight details and select an executive vehicle class online through the direct booking system."
      },
      {
        "step": 2,
        "title": "Track",
        "description": "Operations personnel follow flight progress live to align chauffeur staging with actual runway landing times."
      },
      {
        "step": 3,
        "title": "Meet",
        "description": "Your chauffeur welcomes you inside the terminal arrivals area displaying a personalised greeting board."
      },
      {
        "step": 4,
        "title": "Ride",
        "description": "Relax inside a quiet executive vehicle while your professional chauffeur navigates the route to your destination. Terminal navigation"
      }
    ],
    "terminalsEyebrow": "Terminal Coverage",
    "terminalsHeading": "Terminal Access at Hamad International Airport (DOH) in Doha",
    "terminalsIntro": "Ground operations coordinate passenger pickups across all operational facilities to maintain rapid transfers for arriving delegations.",
    "terminals": [
      {
        "name": "Main Passenger Terminal",
        "description": "Arriving guests exit customs into the main arrivals concourse to locate their driver at the designated meeting point . Chauffeurs coordinate curbside vehicle staging for direct departures into central Doha."
      },
      {
        "name": "VIP Terminal",
        "description": "Passengers using private lounge facilities receive personal reception at the exclusive VIP meeting point . Private chauffeurs manage luggage transfers directly to waiting executive vehicles with complete operational discretion."
      },
      {
        "name": "General Aviation Terminal",
        "description": "Private aviation and charter travellers experience apron or lounge greetings at the designated FBO meeting point . Drivers coordinate with handling agents to provide instant roadside connection after landing. Chauffeur services"
      }
    ],
    "terminalImage": "/airports/www.ab.limo-airports-hamad-international-doh-images/image2.jpg",
    "terminalImageAlt": "Hamad International Airport (DOH) Transfers: Doha Airport Chauffeur terminal arrivals",
    "servicesEyebrow": "Comprehensive Transportation",
    "servicesHeading": "Executive Chauffeur Services from Doha",
    "servicesIntro": "AB coordinates comprehensive ground transportation solutions connected to airport arrivals. Clients access versatile booking arrangements tailored for corporate itineraries and long distance journeys across Qatar.",
    "servicesList": [
      {
        "title": "Airport Transfers in Doha",
        "description": "Inbound and outbound flights.",
        "href": "/services/airport-transfers",
        "icon": "Plane"
      },
      {
        "title": "Chauffeur & VIP in Doha",
        "description": "Daily executive travel and diplomatic delegations.",
        "href": "/services/chauffeur-service",
        "icon": "Crown"
      },
      {
        "title": "Intercity Transfers",
        "description": "To industrial and coastal hubs across Qatar.",
        "href": "/services/intercity-transfers",
        "icon": "MapPin"
      },
      {
        "title": "Corporate Travel Accounts",
        "description": "Centralised billing and recurring corporate itineraries.",
        "href": "/corporate-accounts",
        "icon": "Building2"
      }
    ],
    "servicesOutro": "Organisations requiring full-day hire or hourly chauffeur availability benefit from central billing, licensed and insured vehicles, and tailored corporate travel accounts managed by our regional operations.",
    "faqsEyebrow": "Questions",
    "faqsHeading": "Frequently Asked Questions About Doha Airport Chauffeur Services",
    "faqs": [
      {
        "q": "How early should a Doha airport chauffeur reservation be confirmed?",
        "a": "Reservations should be confirmed as early as travel plans are finalised to secure the preferred vehicle class. While AB accommodates short notice bookings through 24/7 dispatch operations, reserving at least 24 hours prior to landing supports optimal driver allocation. Corporate travel organisers can book weeks ahead for major summits."
      },
      {
        "q": "What services does a Hamad International Airport chauffeur provide upon landing at DOH?",
        "a": "A Hamad International Airport chauffeur delivers full ground support from the terminal exit to any location in Qatar. Services include flight tracking, professional greetings in the arrivals hall, luggage assistance, and direct transit in an executive vehicle. Passengers travel in comfort without waiting in standard taxi lines."
      },
      {
        "q": "How does the DOH meet and greet service operate for international arrivals?",
        "a": "The DOH meet and greet service begins before touchdown as dispatch controllers track flight progress live. Your professional chauffeur enters the arrivals hall holding a personalised name board at the designated meeting point. The chauffeur assists with luggage transport and guides you directly to the waiting vehicle."
      },
      {
        "q": "What occurs during a DOH arrivals pickup if a flight is delayed?",
        "a": "Dispatch teams track flight statuses continuously, so your DOH arrivals pickup schedule updates automatically when flights experience delays. Complimentary waiting time begins only after the aircraft actually touches down. This operational protocol removes stress for passengers, as the assigned driver remains on site throughout schedule adjustments."
      },
      {
        "q": "What complimentary waiting time is included for terminal transfers at DOH?",
        "a": "Terminal pickups at DOH include generous complimentary waiting time designed to accommodate immigration, customs clearance, and luggage reclaim. If extended delays occur at border control, passengers can alert dispatch teams. Adjusted pickup windows are arranged through 24/7 operations to maintain driver availability."
      },
      {
        "q": "How should corporate teams select the appropriate vehicle class for DOH transfers?",
        "a": "Vehicle selection depends on total passengers, luggage pieces, and travel style. Executive sedans like the Mercedes S Class suit solo executives requiring a quiet workspace, whereas the Cadillac Escalade or GMC Yukon provides additional baggage volume. Larger delegations benefit from the Mercedes V Class for collaborative transit."
      },
      {
        "q": "Can companies establish corporate accounts for VIP transport across Doha?",
        "a": "Yes, organisations can set up dedicated corporate accounts for executive ground travel across Doha and nationwide. Corporate accounts provide centralised invoicing, transparent reporting, flexible cancellation terms, and priority vehicle allocation for high profile executives. Account coordinators organise multi destination travel through AB operations with continuous regional support."
      }
    ],
    "ctaHeading": "Your chauffeur is waiting at DOH.",
    "ctaDescription": "Booking a Doha airport chauffeur provides punctual arrivals pickup and seamless ground transportation across the capital. Reliable operations support executive itineraries from the terminal to meetings and hotels.",
    "ctaPhone": "+974 7734 3300"
  },
  "king-abdulaziz-international-jed": {
    "slug": "king-abdulaziz-international-jed",
    "iata": "JED",
    "name": "Jeddah Airport Chauffeur",
    "fullName": "Jeddah Airport Chauffeur: King Abdulaziz International Airport (JED) Transfers",
    "cityName": "Jeddah",
    "citySlug": "jeddah",
    "countryName": "Saudi Arabia",
    "countrySlug": "saudi-arabia",
    "phone": "+966 59 697 8125",
    "pickupDefault": "King Abdulaziz International Airport (JED)",
    "dropoffDefault": "Corniche, Jeddah",
    "heroTitle": "Jeddah Airport Chauffeur: King Abdulaziz International Airport (JED) Transfers",
    "heroDescription": "Securing a Jeddah airport chauffeur provides seamless terminal departures and punctual arrivals across the western province. Executive travellers arriving at King Abdulaziz International Airport (JED) connect directly with licensed chauffeurs for discreet, scheduled transportation into central Jeddah and surrounding regional business centres.\n\nOperational flight monitoring and dedicated meet and greet services eliminate arrival curbside delays. Every transfer is managed through central operations to maintain consistent standards for executive delegations and private individuals alike.\n\nKing Abdulaziz International Airport (JED) Jeddah Corniche, Jeddah",
    "heroImage": "/airports/www.ab.limo-airports-king-abdulaziz-international-jed-images/image1.jpg",
    "heroImageAlt": "Jeddah Airport Chauffeur: King Abdulaziz International Airport (JED) Transfers chauffeur arrivals",
    "fleetEyebrow": "The JED fleet",
    "fleetHeading": "Premium Fleet for Jeddah Airport Chauffeur Transfers",
    "fleetDescription": "The Jeddah airport chauffeur fleet delivers tailored capacity, immaculate presentation and supreme passenger comfort across Jeddah. Every vehicle class receives rigorous mechanical servicing and detailed valeting prior to every scheduled airport dispatch.",
    "vehicles": [
      {
        "name": "Standard Sedan",
        "tagline": "Practical urban travel",
        "model": "Toyota Camry or similar",
        "idealFor": "Ideal for: Efficient business travel",
        "description": "Ideal for individual travellers seeking dependable point to point connections from JED to commercial districts in Jeddah.",
        "capacity": "3 guests",
        "luggage": "2 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image2.jpg"
      },
      {
        "name": "Business Sedan",
        "tagline": "Premium corporate travel",
        "model": "Mercedes E Class or similar",
        "idealFor": "Ideal for: Executive airport comfort",
        "description": "Ideal for corporate executives requiring quiet mobile workspaces between terminal departures and city centre meetings across Jeddah.",
        "capacity": "3 guests",
        "luggage": "3 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image3.jpg"
      },
      {
        "name": "First Class Sedan",
        "tagline": "Flagship VIP comfort",
        "model": "Mercedes S Class or similar",
        "idealFor": "Ideal for: Prestige chauffeur luxury",
        "description": "Ideal for VIP transport, diplomatic itineraries and discerning guests demanding refined amenities upon landing at JED.",
        "capacity": "3 guests",
        "luggage": "3 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image4.jpg"
      },
      {
        "name": "Executive SUV",
        "tagline": "Elevated prestige and space",
        "model": "Cadillac Escalade, GMC Yukon or similar",
        "idealFor": "Ideal for: Spacious luxury travel",
        "description": "Ideal for senior management, high profile travellers and families requiring ample luggage volume on journeys from Jeddah airport.",
        "capacity": "5 guests",
        "luggage": "5 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image5.jpg"
      },
      {
        "name": "Premium MPV",
        "tagline": "Luxury team transport",
        "model": "Mercedes V Class or similar",
        "idealFor": "Ideal for: Collaborative cabin space",
        "description": "Ideal for corporate teams, project managers and executive delegations needing mobile briefing space when departing JED.",
        "capacity": "6 guests",
        "luggage": "6 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image6.jpg"
      },
      {
        "name": "Executive Van",
        "tagline": "Group logistics support",
        "model": "Mercedes Sprinter or similar",
        "idealFor": "Ideal for: Group transport capacity",
        "description": "Ideal for event organisers, flight crews and extended delegations travelling collectively between King Abdulaziz International Airport and Jeddah hotels.",
        "capacity": "7-8 guests",
        "luggage": "8 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image7.jpg"
      }
    ],
    "journeysEyebrow": "Popular journeys",
    "journeysHeading": "Jeddah Airport Chauffeur Transfers Across Jeddah and Beyond",
    "journeysDescription": "A private Jeddah airport chauffeur provides uninterrupted transit from arrival terminals to commercial hubs, holy sanctuaries and coastal resorts. Fixed routing guidelines and planned transit schedules prevent unexpected city delays.",
    "journeys": [
      {
        "title": "JED to central Jeddah",
        "priceNote": "",
        "description": "Direct executive transfer serving business districts, coastal hotels along the Jeddah Corniche and corporate head offices. From SAR price · minutes."
      },
      {
        "title": "JED to Makkah",
        "priceNote": "",
        "description": "Specialised intercity highway transit tailored for pilgrims and official delegations visiting the holy city. From SAR price · minutes."
      },
      {
        "title": "JED to Madinah",
        "priceNote": "",
        "description": "Long distance private driver transfer connecting King Abdulaziz International Airport directly to central Madinah accommodation. From SAR price · minutes."
      },
      {
        "title": "JED to Taif",
        "priceNote": "",
        "description": "Scenic mountain ascent transport providing private door to door travel between Jeddah airport and Taif mountain resorts. From SAR price · minutes."
      }
    ],
    "howItWorksEyebrow": "How it works",
    "howItWorksHeading": "JED Meet and Greet Arrival Protocols",
    "howItWorksIntro": "The JED meet and greet service provides seamless coordination from the moment your aircraft lands on the runway. Operational dispatchers maintain real time flight tracking to adjust vehicle arrival times against early arrivals or airport holding patterns. Once the aircraft reaches the gate, your professional chauffeur positions inside the arrivals hall with a personalised digital name board. Guests pass through baggage claim and clear customs before meeting their driver at the designated terminal meeting point . Professional luggage assistance and complimentary waiting time allow guests to proceed comfortably through border control without transit concerns.",
    "howItWorksSteps": [
      {
        "step": 1,
        "title": "Book",
        "description": "Submit passenger flight details, terminal information, and preferred vehicle class online or through corporate booking channels in advance."
      },
      {
        "step": 2,
        "title": "Track",
        "description": "Operations teams track arrival flights continuously, matching driver staging with precise touchdown times to eliminate curbside delays."
      },
      {
        "step": 3,
        "title": "Meet",
        "description": "Your private driver waits at the dedicated terminal arrivals hall greeting area, presenting a clear name board and managing passenger luggage."
      },
      {
        "step": 4,
        "title": "Ride",
        "description": "Relax inside an air conditioned luxury vehicle while a licensed chauffeur navigates highway corridors directly to your destination."
      }
    ],
    "terminalsEyebrow": "Terminal Coverage",
    "terminalsHeading": "King Abdulaziz International Airport Terminal Meeting Points in Jeddah",
    "terminalsIntro": "King Abdulaziz International Airport features several operational terminals catering to commercial domestic flights, international routes and private aviation. Chauffeurs coordinate pickup logistics based on individual flight terminal assignments across the airport complex.",
    "terminals": [
      {
        "name": "Terminal 1",
        "description": "Serving the majority of international and domestic commercial carriers, with chauffeurs greeting passengers past the primary customs exit at the main arrivals lounge meeting point ."
      },
      {
        "name": "North Terminal",
        "description": "Hosting international seasonal and budget flight routes, featuring a designated passenger reception point near the foreign arrivals exit vestibule ."
      },
      {
        "name": "South Terminal",
        "description": "Historic terminal infrastructure with specialised operational procedures, meeting passengers directly outside the primary luggage reception zone ."
      },
      {
        "name": "Hajj Terminal",
        "description": "Renowned architectural facility accommodating pilgrimage charter operations, with arranged transport coordinates established at designated external passenger concourses ."
      },
      {
        "name": "Private Aviation Terminal",
        "description": "Dedicated VIP transport and private jet facilities featuring discreet direct ramp side or VIP lounge reception for executive guests ."
      }
    ],
    "terminalImage": "/airports/www.ab.limo-airports-king-abdulaziz-international-jed-images/image2.jpg",
    "terminalImageAlt": "Executive vehicle waiting outside Jeddah airport terminal",
    "servicesEyebrow": "Comprehensive Transportation",
    "servicesHeading": "Comprehensive Chauffeur Services Across Jeddah",
    "servicesIntro": "AB provides structured corporate and private ground transportation solutions connecting King Abdulaziz International Airport with broader Saudi destinations. Select a dedicated service category to manage executive travel requirements:",
    "servicesList": [
      {
        "title": "Airport Transfers in Jeddah",
        "description": "Scheduled private transfers between airport terminals and commercial properties across Jeddah.",
        "href": "/services/airport-transfers",
        "icon": "Plane"
      },
      {
        "title": "Chauffeur & VIP in Jeddah",
        "description": "Dedicated hourly chauffeur and full day hire options for diplomatic delegations and executive itineraries.",
        "href": "/services/chauffeur-service",
        "icon": "Crown"
      },
      {
        "title": "Intercity Transfers",
        "description": "Direct long distance highway journeys connecting Jeddah with Makkah, Madinah, Taif and regional industrial centres.",
        "href": "/services/intercity-transfers",
        "icon": "MapPin"
      },
      {
        "title": "Corporate Travel Accounts",
        "description": "Centralised management, custom billing arrangements and protocol coordination for enterprise travel departments.",
        "href": "/corporate-accounts",
        "icon": "Building2"
      }
    ],
    "servicesOutro": "Organisations requiring full-day hire or hourly chauffeur availability benefit from central billing, licensed and insured vehicles, and tailored corporate travel accounts managed by our regional operations.",
    "faqsEyebrow": "Questions",
    "faqsHeading": "Frequently Asked Questions About Jeddah Airport Transfers",
    "faqs": [
      {
        "q": "How does my Jeddah airport chauffeur track inbound flight schedule adjustments?",
        "a": "Central dispatch integrates automated flight radar data directly into our operational scheduling systems. Chauffeurs receive automatic flight status updates, allowing driver dispatch times to align precisely with revised landing moments. This active oversight prevents curbside delays and protects your schedule regardless of air traffic control sequencing."
      },
      {
        "q": "What luggage capacity is available for executive transfers from JED?",
        "a": "Luggage capacity corresponds directly to your selected vehicle category. Business sedans comfortably accommodate two standard suitcases alongside personal carry on bags, while executive SUVs and Mercedes V Class vans transport substantial passenger luggage collections. Booking specialists assist corporate coordinators in matching baggage volumes with appropriate vehicle dimensions prior to departure."
      },
      {
        "q": "Where will my driver meet me upon arrival at King Abdulaziz International Airport?",
        "a": "Your JED arrivals pickup driver waits inside the designated terminal arrivals hall immediately past the customs clearance exit. Chauffeurs hold an official name board displaying the requested passenger name or enterprise visual identity. Detailed pickup instructions and driver contact numbers arrive prior to landing to facilitate straightforward terminal connections."
      },
      {
        "q": "Are all vehicles and chauffeurs properly licensed and insured in Saudi Arabia?",
        "a": "Every vehicle in our regional fleet operates with comprehensive commercial transport insurance and maintains full regulatory compliance under Saudi transport authority standards. Chauffeurs undergo extensive background vetting, defensive driving assessments and professional protocol training. Rigorous compliance safeguards passenger safety and delivers consistent executive transport across Jeddah."
      },
      {
        "q": "Can corporate travel managers arrange hourly chauffeur hire directly from JED?",
        "a": "Hourly chauffeur services and full day hire arrangements can commence directly from King Abdulaziz International Airport. Your dedicated driver remains on standby throughout multiple corporate meetings, site inspections and private dining appointments across Jeddah. Dedicated vehicle retention offers total itinerary flexibility without repetitive transfer bookings."
      },
      {
        "q": "What complimentary waiting time applies to JED airport arrivals?",
        "a": "All airport pickups include a standard complimentary waiting period commencing from the recorded aircraft touchdown time. This allocation permits ample time for international guests to clear passport control, process health declarations and collect baggage. Extended waiting periods can be arranged in advance through our operations centre."
      },
      {
        "q": "Can VIP transport meet private aviation flights landing at JED?",
        "a": "Executive chauffeur teams coordinate directly with private aviation handlers at the designated VIP terminal facilities at JED. Chauffeurs position vehicles within private handling zones to facilitate discreet passenger transitions upon arrival. Coordinated protocol handling supports government personnel, executive delegations and private aircraft owners seamlessly."
      }
    ],
    "ctaHeading": "Your Jeddah Airport Chauffeur is Waiting at JED",
    "ctaDescription": "Reserve an executive Jeddah airport chauffeur to experience punctual, comfortable and discreet ground transportation across the western region. Dedicated operations managers oversee every terminal journey to maintain flawless business travel execution.\n\nConnect with central dispatch to schedule airport arrivals, executive roadshows or corporate account arrangements across Saudi Arabia.",
    "ctaPhone": "+966 58 111 8720"
  },
  "king-fahd-international-dmm": {
    "slug": "king-fahd-international-dmm",
    "iata": "DMM",
    "name": "Airport transfers at DMM King Fahd International Airport (DMM) Transfers",
    "fullName": "Airport transfers at DMM King Fahd International Airport (DMM) Transfers: Dammam Airport Chauffeur",
    "cityName": "Dammam",
    "citySlug": "dammam",
    "countryName": "Saudi Arabia",
    "countrySlug": "saudi-arabia",
    "phone": "+966 59 697 8125",
    "pickupDefault": "King Fahd International Airport (DMM)",
    "dropoffDefault": "Al Khobar, Dammam",
    "heroTitle": "Airport transfers at DMM King Fahd International Airport (DMM) Transfers: Dammam Airport Chauffeur",
    "heroDescription": "Booking a dedicated Dammam airport chauffeur provides direct transit from King Fahd International Airport (DMM) to corporate offices across the Eastern Province. Coordinated flight tracking and curbside vehicle staging reduce wait times while incoming passengers proceed directly to regional business appointments.\n\nSelecting an executive vehicle class depends on luggage volume, delegation size and regional travel schedules. Coordinated private driver services support punctual regional departures for individual business leaders and visiting corporate delegations.\n\nStandard transfer route: King Fahd International Airport (DMM) to Dammam Corniche, Dammam.",
    "heroImage": "/airports/www.ab.limo-airports-king-fahd-international-dmm-images/image1.jpg",
    "heroImageAlt": "Airport transfers at DMM King Fahd International Airport (DMM) Transfers: Dammam Airport Chauffeur chauffeur arrivals",
    "fleetEyebrow": "The DMM fleet",
    "fleetHeading": "The DMM Fleet for Dammam Airport Chauffeur Travel in Dammam",
    "fleetDescription": "The DMM chauffeur fleet provides quiet cabin environments and pristine leather seating for executive transfers across Dammam. Each vehicle class meets strict commercial licensing and maintenance protocols for corporate travel.",
    "vehicles": [
      {
        "name": "Standard Sedan",
        "tagline": "",
        "model": "",
        "idealFor": "",
        "description": "Tag line: Reliable private transport for solo business travel. Model: Model or similar . Ideal for: Individual executives and airport commutes. The standard sedan offers comfortable airport transfers from DMM to central Dammam offices. Ample boot space accommodates standard luggage while passengers enjoy a relaxed, air conditioned cabin after long flights.",
        "capacity": "3 guests",
        "luggage": "2 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image2.jpg"
      },
      {
        "name": "Business Sedan",
        "tagline": "",
        "model": "",
        "idealFor": "",
        "description": "Tag line: Executive comfort for corporate roadshows. Model: Mercedes E Class or similar . Ideal for: Corporate managers and regional business trips. Business sedans deliver refined seating and mobile workstation comfort for transfers between corporate headquarters. Professional chauffeurs handle busy highway corridors while passengers review documents in complete acoustic privacy.",
        "capacity": "3 guests",
        "luggage": "3 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image3.jpg"
      },
      {
        "name": "First Class Sedan",
        "tagline": "",
        "model": "",
        "idealFor": "",
        "description": "Tag line: Flagship luxury for executive dignitaries. Model: Mercedes S Class or similar . Ideal for: VIP transport, senior executives and diplomatic delegates. Our first class sedan provides premier luxury car transport from DMM arrivals hall directly to luxury hotels. Rear seat climate control, reclining leather seats and acoustic glass deliver restful travel across Dammam.",
        "capacity": "3 guests",
        "luggage": "3 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image4.jpg"
      },
      {
        "name": "Executive SUV",
        "tagline": "",
        "model": "",
        "idealFor": "",
        "description": "Tag line: Spacious executive command and luxury utility. Model: Cadillac Escalade, GMC Yukon or similar . Ideal for: Small executive groups and substantial baggage. The executive SUV accommodates four passengers with generous luggage capacity for transfers from DMM across the Eastern Province. Elevated ride height and smooth suspension provide stable highway transit to industrial hubs.",
        "capacity": "5 guests",
        "luggage": "5 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image5.jpg"
      },
      {
        "name": "Premium MPV",
        "tagline": "",
        "model": "",
        "idealFor": "",
        "description": "Tag line: Flexible group luxury for project delegations. Model: Mercedes V Class or similar . Ideal for: Corporate delegations, event teams and family offices. The premium MPV features conference style seating arrangements and expansive legroom for traveling executive teams. Generous cargo capacity accommodates multiple equipment cases and standard luggage sets without crowding passenger space.",
        "capacity": "6 guests",
        "luggage": "6 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image6.jpg"
      },
      {
        "name": "Executive Van",
        "tagline": "",
        "model": "",
        "idealFor": "",
        "description": "Tag line: High capacity corporate group transit. Model: Luxury executive van or similar . Ideal for: Conference teams, event attendees and project crews. Executive vans transport larger delegations comfortably between international terminals and corporate venues. Dedicated climate controls and wide boarding doors allow efficient passenger movement during demanding event schedules. Popular journeys",
        "capacity": "7-8 guests",
        "luggage": "8 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image7.jpg"
      }
    ],
    "journeysEyebrow": "Popular journeys",
    "journeysHeading": "Popular Journeys with a Dammam Airport Chauffeur from Dammam",
    "journeysDescription": "Point to point airport transfers connect incoming flights with commercial centres, industrial districts and neighbouring cities throughout the region. Prearranged chauffeur itineraries avoid taxi queue delays and provide transparent scheduling.",
    "journeys": [
      {
        "title": "DMM to Dammam",
        "priceNote": "City Transfer. Route: DMM to Dammam. From SAR price · minutes.",
        "description": "Direct transit connects King Fahd International Airport with commercial districts and seaside hotels across Dammam."
      },
      {
        "title": "DMM to Al Khobar",
        "priceNote": "Business Corridor. Route: DMM to Al Khobar. From SAR price · minutes.",
        "description": "Transfers run directly from the terminal to Al Khobar business towers, corporate compounds and dining districts."
      },
      {
        "title": "DMM to Jubail",
        "priceNote": "Industrial Hub Transit. Route: DMM to Jubail. From SAR price · minutes.",
        "description": "Executive transport serves corporate teams and technical leadership traveling directly to Jubail Industrial City facilities."
      },
      {
        "title": "DMM to Bahrain via the King Fahd Causeway",
        "priceNote": "Cross Border Connection. Route: DMM to Bahrain via the King Fahd Causeway . From SAR price · minutes.",
        "description": "International transfers link DMM arrivals with Manama destinations via vetted partner logistics."
      }
    ],
    "howItWorksEyebrow": "How it works",
    "howItWorksHeading": "How DMM Meet and Greet Works with a Dammam Airport Chauffeur in Dammam",
    "howItWorksIntro": "Arriving at King Fahd International Airport connects seamlessly to executive ground transport through our coordinated DMM meet and greet service. Dedicated operations dispatch tracks commercial and private flight numbers in real time, adjusting driver arrival times for early landings or flight delays. Upon completing immigration and collecting bags from baggage claim, passengers enter the main arrivals hall to find their professional chauffeur displaying a personalised digital name board. Chauffeurs position at designated terminal meeting points and provide courteous luggage help toward the waiting vehicle. Every transfer includes complimentary free waiting time after flight touchdown, giving travellers ample time to clear customs. All transfers adhere to licensed and insured service standards for total peace of mind during regional corporate travel.",
    "howItWorksSteps": [
      {
        "step": 1,
        "title": "Book",
        "description": "Reserve an airport transfer online with flight details, passenger counts and destination requirements. Instant booking confirmation provides complete schedule transparency."
      },
      {
        "step": 2,
        "title": "Track",
        "description": "Dispatch monitors incoming commercial flights and regional private jets in real time. Chauffeur dispatch adjusts automatically for airline schedule modifications."
      },
      {
        "step": 3,
        "title": "Meet",
        "description": "Your chauffeur greets you in the arrivals hall with a clear name board and provides attentive luggage help toward curbside staging."
      },
      {
        "step": 4,
        "title": "Ride",
        "description": "Step directly into a chilled, pristine cabin and enjoy smooth transit to corporate offices, residential compounds or seaside hotels. Terminal navigation"
      }
    ],
    "terminalsEyebrow": "Terminal Coverage",
    "terminalsHeading": "King Fahd International Airport (DMM) Terminals in Dammam",
    "terminalsIntro": "King Fahd International Airport features expansive passenger terminals and specialised handling suites designed for commercial and private aviation. Chauffeur meeting protocols adapt to each terminal facility to keep passenger connections prompt and convenient.",
    "terminals": [
      {
        "name": "Main Passenger Terminal",
        "description": "The primary passenger complex serves domestic and international airlines arriving in Dammam. Chauffeurs meet passengers at designated arrivals hall greeting points directly after luggage collection, assisting with bags to the executive pickup lane."
      },
      {
        "name": "VIP and Private Terminal Options",
        "description": "Private aviation passengers arriving via executive handling facilities receive discreet tarmac or terminal curbside reception . Dedicated chauffeurs coordinate directly with ground handling staff to transfer guests smoothly without main terminal congestion."
      },
      {
        "name": "Royal and Government Protocol Terminal",
        "description": "Official delegations and diplomatic travellers receive specialised reception through designated VIP facilities . Coordinated motorcades and security vetted drivers follow regional protocol guidelines for swift, private transfers to government offices. Terminal curbside staging enables rapid vehicle boarding without lengthy walking distances. Transportation options"
      }
    ],
    "terminalImage": "/airports/www.ab.limo-airports-king-fahd-international-dmm-images/image2.jpg",
    "terminalImageAlt": "Executive terminal curbside collection area in Dammam",
    "servicesEyebrow": "Comprehensive Transportation",
    "servicesHeading": "Executive Chauffeur and Transport Services from DMM in Dammam",
    "servicesIntro": "AB provides comprehensive ground transport solutions tailored to multinational corporations, government delegations and private travellers. Select the appropriate transportation category below to coordinate regional logistics.",
    "servicesList": [
      {
        "title": "Airport Transfers in Dammam",
        "description": "Seamless airport arrivals and departures.",
        "href": "/services/airport-transfers",
        "icon": "Plane"
      },
      {
        "title": "Chauffeur & VIP in Dammam",
        "description": "Corporate roadshows and executive itineraries.",
        "href": "/services/chauffeur-service",
        "icon": "Crown"
      },
      {
        "title": "Intercity Transfers",
        "description": "Dammam, Jubail, Hofuf and Riyadh.",
        "href": "/services/intercity-transfers",
        "icon": "MapPin"
      },
      {
        "title": "Corporate Travel Accounts",
        "description": "Regular enterprise travel across the kingdom.",
        "href": "/corporate-accounts",
        "icon": "Building2"
      }
    ],
    "servicesOutro": "For custom itineraries or rapid vehicle reservations, submit your travel schedule directly to receive competitive fleet pricing.",
    "faqsEyebrow": "Questions",
    "faqsHeading": "Frequently Asked Questions About Dammam Airport Chauffeur Services in Dammam",
    "faqs": [
      {
        "q": "How do I book a King Fahd International Airport chauffeur for business travel?",
        "a": "Reserving a King Fahd International Airport chauffeur requires submitting flight numbers, passenger totals and destination addresses through our online reservation system. Corporate accounts receive priority vehicle allocations and centralised monthly invoicing. Operations dispatch confirms vehicle assignments and transmits chauffeur contact details prior to aircraft arrival."
      },
      {
        "q": "What is included in the DMM meet and greet service?",
        "a": "The DMM meet and greet service provides complete terminal assistance from aircraft landing to vehicle departure. Professional chauffeurs wait inside the arrivals hall holding a customised digital name sign. Drivers assist with heavy luggage, navigate terminal corridors and guide guests directly to the prearranged executive vehicle curbside."
      },
      {
        "q": "How does flight tracking work for a DMM chauffeur reservation?",
        "a": "Operations teams track flight numbers through direct aviation monitoring systems that record departure times, route updates and estimated touchdown slots. When airline schedules experience early landings or delays, driver staging times adjust automatically. Passengers meet their chauffeur on arrival without needing to send manual schedule notifications."
      },
      {
        "q": "Where does the DMM arrivals pickup take place at the terminal?",
        "a": "A standard DMM arrivals pickup takes place directly outside the customs exit in the main terminal arrivals hall. For private jet passengers using VIP terminals, meeting points occur at designated executive lounge exits or direct tarmac gates . Chauffeurs escort travellers from the interior greeting point to the waiting car parked nearby."
      },
      {
        "q": "What complimentary waiting time is provided for airport transfers in Dammam?",
        "a": "Every commercial airport transfer includes complimentary waiting time starting from the recorded flight touchdown moment. This policy provides international passengers sufficient time to clear passport control, collect baggage and complete customs checks. Additional waiting time options can be added during the reservation process."
      },
      {
        "q": "Can I arrange an hourly chauffeur or full day hire from DMM?",
        "a": "Hourly chauffeur and full day hire options allow passengers to retain a dedicated vehicle and driver for multiple consecutive meetings. Chauffeurs remain on standby outside corporate headquarters, conference venues or hotels throughout Dammam and neighbouring cities. This flexible booking style suits executive roadshows requiring dynamic itinerary adjustments."
      },
      {
        "q": "Are vehicles available for cross border transfers from Dammam to Bahrain?",
        "a": "Cross border transport between Dammam and Bahrain operates through vetted partner logistics via the King Fahd Causeway. Chauffeurs coordinate transit procedures and provide comfortable highway travel between Eastern Province airports and Manama addresses. Advance booking allows operations dispatch to verify cross border permits and travel documentation."
      }
    ],
    "ctaHeading": "Your Chauffeur Is Waiting at DMM: Reserve Your Dammam Airport Chauffeur in Dammam",
    "ctaDescription": "Organising reliable airport ground transport eliminates transit uncertainty and establishes executive travel standards across the Eastern Province. Professional drivers and pristine luxury vehicles provide restful travel between King Fahd International Airport and key regional destinations.\n\nContact the AB operations centre directly or book your vehicle class online for seamless terminal pickup.\n\nHeadquarters and 24/7 dispatch: AB Riyadh, Building 3036, Office 08, 2nd Floor, Umar Ibn Abdulaziz Road, Al Malaz, Riyadh, Saudi Arabia.",
    "ctaPhone": "+966 58 111 8720"
  },
  "king-khalid-international-ruh": {
    "slug": "king-khalid-international-ruh",
    "iata": "RUH",
    "name": "King Khalid International Airport (RUH) Transfers",
    "fullName": "King Khalid International Airport (RUH) Transfers",
    "cityName": "Riyadh",
    "citySlug": "riyadh",
    "countryName": "Saudi Arabia",
    "countrySlug": "saudi-arabia",
    "phone": "+966 59 697 8125",
    "pickupDefault": "King Khalid International Airport (RUH)",
    "dropoffDefault": "KAFD, Riyadh",
    "heroTitle": "King Khalid International Airport (RUH) Transfers",
    "heroDescription": "Arranging a professional Riyadh airport chauffeur secures seamless ground travel directly from your terminal upon arrival in the capital. AB manages executive transport at King Khalid International Airport (RUH) for passengers travelling to commercial districts across Riyadh.\n\nFlight monitoring, greeting in the terminal hall, and luggage assistance operate around the clock through central dispatch. Chauffeurs assist executive travellers heading to hotel accommodations, corporate headquarters, and government institutions with prompt departures.\n\nKing Khalid International Airport (RUH)\n\nKAFD, Riyadh",
    "heroImage": "/airports/www.ab.limo-airports-king-khalid-international-ruh-images/image1.jpg",
    "heroImageAlt": "King Khalid International Airport (RUH) Transfers chauffeur arrivals",
    "fleetEyebrow": "The RUH fleet",
    "fleetHeading": "The RUH Fleet for Your Riyadh Airport Chauffeur Transfer",
    "fleetDescription": "AB coordinates a fleet of premium sedans, executive SUVs, and luxury vans stationed near King Khalid International Airport. Every vehicle provides climate controlled comfort, spacious luggage capacity, and refined styling for corporate itineraries throughout Riyadh.",
    "vehicles": [
      {
        "name": "Standard Sedan",
        "tagline": "Practical urban travel",
        "model": "Model or similar",
        "idealFor": "Ideal for: Individual travellers",
        "description": "Comfortable sedan transport from RUH terminals to business hotels across central Riyadh, offering practical seating and quiet ride dynamics.",
        "capacity": "3 guests",
        "luggage": "2 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image2.jpg"
      },
      {
        "name": "Business Sedan",
        "tagline": "Premium corporate travel",
        "model": "Model or similar",
        "idealFor": "Ideal for: Corporate professionals",
        "description": "Executive comfort tailored for enterprise executives commuting between RUH arrivals and key financial headquarters in Riyadh.",
        "capacity": "3 guests",
        "luggage": "3 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image3.jpg"
      },
      {
        "name": "First Class Sedan",
        "tagline": "Flagship VIP comfort",
        "model": "Mercedes S Class",
        "idealFor": "Ideal for: VIP delegates",
        "description": "Prestige sedan travel featuring refined leather seating and acoustic dampening, ideal for dignitaries departing King Khalid International Airport.",
        "capacity": "3 guests",
        "luggage": "3 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image4.jpg"
      },
      {
        "name": "Executive SUV",
        "tagline": "Elevated prestige and space",
        "model": "Cadillac Escalade",
        "idealFor": "Ideal for: Delegations and families",
        "description": "Spacious SUV accommodation providing generous luggage room for long haul arrivals landing at RUH with multiple suitcases.",
        "capacity": "5 guests",
        "luggage": "5 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image5.jpg"
      },
      {
        "name": "Premium MPV",
        "tagline": "Luxury team transport",
        "model": "Mercedes V Class",
        "idealFor": "Ideal for: Small corporate teams",
        "description": "Flexible seating layouts allowing working teams to confer comfortably while travelling directly from airport gates across Riyadh.",
        "capacity": "6 guests",
        "luggage": "6 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image6.jpg"
      },
      {
        "name": "Executive Van",
        "tagline": "Group logistics support",
        "model": "GMC Yukon",
        "idealFor": "Ideal for: Large travel groups",
        "description": "High capacity group transport suitable for event teams, support personnel, and diplomatic entourages arriving together in the capital.",
        "capacity": "7-8 guests",
        "luggage": "8 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image7.jpg"
      }
    ],
    "journeysEyebrow": "Popular journeys",
    "journeysHeading": "Popular Journeys Across Riyadh and Beyond from King Khalid International Airport (RUH)",
    "journeysDescription": "Chauffeurs transfer passengers directly from airport terminals to premier commercial districts, regional industrial zones, and adjacent administrative provinces. Fixed rate options provide transparent coordination for local meetings and cross regional travel.",
    "journeys": [
      {
        "title": "RUH to Central Riyadh and KAFD",
        "priceNote": "Direct transit connecting arrivals terminals with the King Abdullah Financial District and central corporate towers. From SAR price · minutes.",
        "description": "Eastern Province Route"
      },
      {
        "title": "RUH to Dammam",
        "priceNote": "Intercity chauffeur travel from the airport gate across the highway corridor to commercial facilities in Dammam. From SAR price · minutes.",
        "description": "Central Agricultural Hub"
      },
      {
        "title": "RUH to Al Qassim",
        "priceNote": "",
        "description": "Executive private vehicle transport scheduled directly from airport arrivals to business destinations in Al Qassim province. From SAR price · minutes."
      }
    ],
    "howItWorksEyebrow": "How it works",
    "howItWorksHeading": "How RUH Meet and Greet Operates with a Dedicated Riyadh Airport Chauffeur",
    "howItWorksIntro": "Each RUH arrivals pickup begins with real time flight tracking to accommodate schedule adjustments, route delays, or early touch downs. Your RUH chauffeur monitors your incoming flight number through operations software, positioning the vehicle outside the terminal before disembarkation starts. Upon entering the public terminal concourse, your designated driver holds an identification board displaying your guest or corporate name. The designated meeting point per terminal provides an orderly reception area where chauffeurs welcome guests promptly. Complimentary waiting time accommodates baggage reclaim and border control queues, followed by professional luggage handling to the vehicle.",
    "howItWorksSteps": [
      {
        "step": 1,
        "title": "Book",
        "description": "Reserve your King Khalid International Airport chauffeur online by submitting your arrival itinerary, passenger totals, and vehicle class preference."
      },
      {
        "step": 2,
        "title": "Track",
        "description": "Operations teams track the incoming aircraft path to synchronise driver arrival times with your confirmed landing window."
      },
      {
        "step": 3,
        "title": "Meet",
        "description": "Chauffeurs stand ready in the terminal arrivals hall holding an electronic or printed name board to welcome you."
      },
      {
        "step": 4,
        "title": "Ride",
        "description": "Your driver manages your heavy luggage, guides you to the private car bay, and transfers you toward your destination. Airport layout"
      }
    ],
    "terminalsEyebrow": "Terminal Coverage",
    "terminalsHeading": "Terminals and Meeting Points at RUH in Riyadh",
    "terminalsIntro": "King Khalid International Airport operates several active terminal buildings hosting international and domestic passenger carriers, alongside specialized private aviation terminals. Chauffeurs coordinate pickup protocols tailored to each terminal structure across the airport grounds.",
    "terminals": [
      {
        "name": "International Terminals",
        "description": "Serving overseas flights, these terminals feature dedicated meeting points right outside customs inspection exits, where drivers receive long haul arrivals efficiently."
      },
      {
        "name": "Domestic Terminals",
        "description": "Operating regional flight routes throughout Saudi Arabia, domestic concourses direct passengers toward designated greeting stations situated near baggage collection belts."
      },
      {
        "name": "VIP and Private Terminals",
        "description": "Fixed base operators and executive aviation lounges offer discreet tarmac side or private lounge meeting points for royal, diplomatic, and private jet arrivals. Connected solutions"
      }
    ],
    "terminalImage": "/airports/www.ab.limo-airports-king-khalid-international-ruh-images/image2.jpg",
    "terminalImageAlt": "Executive terminal greeting zone at King Khalid International Airport in Riyadh",
    "servicesEyebrow": "Comprehensive Transportation",
    "servicesHeading": "Executive Chauffeur Services from RUH",
    "servicesIntro": "AB maintains an integrated suite of premium chauffeur solutions connecting air arrivals with comprehensive ground transit itineraries across the region. You can organise airport transfers, private city itineraries, and cross province travel directly through centralised dispatch channels.",
    "servicesList": [
      {
        "title": "Airport Transfers in Riyadh",
        "description": "Seamless private vehicle pickups and drop offs serving corporate executives landing at the capital airport.",
        "href": "/services/airport-transfers",
        "icon": "Plane"
      },
      {
        "title": "Chauffeur & VIP in Riyadh",
        "description": "Dedicated high security transit and executive chauffeur services for state visits, delegations, and senior leadership.",
        "href": "/services/chauffeur-service",
        "icon": "Crown"
      },
      {
        "title": "Intercity Transfers",
        "description": "Direct highway travel options linking airport arrivals with regional commercial hubs across Saudi Arabia.",
        "href": "/services/intercity-transfers",
        "icon": "MapPin"
      },
      {
        "title": "Corporate Travel Accounts",
        "description": "Consolidated invoicing, travel management dashboards, and priority fleet allocations for multinational enterprises.",
        "href": "/corporate-accounts",
        "icon": "Building2"
      }
    ],
    "servicesOutro": "Organisations requiring full-day hire or hourly chauffeur availability benefit from central billing, licensed and insured vehicles, and tailored corporate travel accounts managed by our regional operations.",
    "faqsEyebrow": "Questions",
    "faqsHeading": "Questions About RUH Transfers in Riyadh",
    "faqs": [
      {
        "q": "How does my Riyadh airport chauffeur locate me inside the terminal?",
        "a": "Your driver monitors incoming flight data and waits in the designated arrivals concourse holding a personalised name board. Operations dispatch coordinates the meeting location per terminal to facilitate immediate visual contact once you exit the baggage claim zone."
      },
      {
        "q": "What complimentary waiting time applies to arrivals at RUH?",
        "a": "International and domestic flights receive complimentary waiting time calculated from actual wheel touchdown. This buffer permits ample time to complete passport checks, immigration screening, and baggage reclamation before meeting your driver."
      },
      {
        "q": "Can I reserve intercity journeys directly from King Khalid International Airport?",
        "a": "AB arranges continuous intercity transport directly from RUH passenger gates to industrial and commercial hubs including Dammam, Khobar, and Al Qassim. Chauffeurs manage non stop highway routes, avoiding the delays associated with domestic flight connections."
      },
      {
        "q": "What vehicle classes are available for corporate delegations arriving in Riyadh?",
        "a": "Travellers can select executive sedans such as the Mercedes S Class, luxury SUVs including the Cadillac Escalade, or spacious vans like the Mercedes V Class. Each option accommodates professional delegations with dedicated luggage space and climate control systems."
      },
      {
        "q": "How does flight tracking function if my inbound flight to RUH is delayed?",
        "a": "Central dispatch tracks commercial aircraft positions via live radar software, automatically adjusting driver dispatch schedules to match revised landing times. You do not need to notify operations regarding routine schedule modifications while in transit."
      },
      {
        "q": "Can private aviation passengers book chauffeur transfers from VIP terminals?",
        "a": "AB provides specialized coordination for passengers arriving via private aviation lounges and fixed base operator terminals at RUH. Drivers position vehicles near private passenger lounges or designated ramp exits in coordination with local airport security protocol."
      },
      {
        "q": "How do corporate organisations manage ongoing chauffeur bookings in Riyadh?",
        "a": "Corporate travel departments can open managed transportation accounts through AB to access itemised billing, preferred vehicle allocations, and centralised travel dispatch. Account managers oversee multi passenger schedules for conferences, board meetings, and official events."
      }
    ],
    "ctaHeading": "Your Chauffeur Is Waiting at RUH in Riyadh",
    "ctaDescription": "Arranging your executive transfer in advance supports punctual departures from King Khalid International Airport to any business destination across the capital. AB manages airport meet and greet services with licensed, insured drivers and luxury vehicles ready upon your arrival.\n\nConnect with 24/7 central operations at AB Riyadh, Building 3036, Office 08, 2nd Floor, Umar Ibn Abdulaziz Road, Al Malaz, Riyadh, Saudi Arabia, to coordinate transfers or request corporate billing agreements.",
    "ctaPhone": "+966 58 111 8720"
  },
  "prince-mohammad-bin-abdulaziz-med": {
    "slug": "prince-mohammad-bin-abdulaziz-med",
    "iata": "MED",
    "name": "Madinah Airport Chauffeur",
    "fullName": "Madinah Airport Chauffeur: Prince Mohammad bin Abdulaziz International Airport (MED) Transfers",
    "cityName": "Medina",
    "citySlug": "medina",
    "countryName": "Saudi Arabia",
    "countrySlug": "saudi-arabia",
    "phone": "+966 59 697 8125",
    "pickupDefault": "Prince Mohammad bin Abdulaziz Airport (MED)",
    "dropoffDefault": "Prophet's Mosque Area, Madinah",
    "heroTitle": "Madinah Airport Chauffeur: Prince Mohammad bin Abdulaziz International Airport (MED) Transfers",
    "heroDescription": "Reserving a professional Madinah airport chauffeur provides seamless direct transit between your flight and destinations across Madinah. AB coordinates private ground travel from Prince Mohammad bin Abdulaziz International Airport (MED) with tracked flight timings, professional drivers and premium vehicles.\n\nPassenger count, luggage capacity and schedule flexibility determine the appropriate vehicle class for each transfer. Dedicated operations teams oversee vehicle dispatch to maintain punctuality for private travellers, corporate delegations and institutional groups.\n\nPickup: Prince Mohammad bin Abdulaziz International Airport (MED)",
    "heroImage": "/airports/www.ab.limo-airports-prince-mohammad-bin-abdulaziz-med-images/image1.jpg",
    "heroImageAlt": "Madinah Airport Chauffeur: Prince Mohammad bin Abdulaziz International Airport (MED) Transfers chauffeur arrivals",
    "fleetEyebrow": "The MED fleet",
    "fleetHeading": "Fleet Options for Madinah Airport Chauffeur Transfers",
    "fleetDescription": "AB maintains an executive fleet tailored for individual business travellers, government delegations and visiting families arriving at MED. Each vehicle undergoes regular mechanical inspection and detailing to maintain passenger safety and cabin comfort.",
    "vehicles": [
      {
        "name": "Standard Sedan",
        "tagline": "Practical urban travel",
        "model": "Toyota Camry",
        "idealFor": "Ideal for: Solo travellers",
        "description": "A reliable sedan offering quiet travel for business visits and daily transfers connecting MED to central city hotels.",
        "capacity": "3 guests",
        "luggage": "2 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image2.jpg"
      },
      {
        "name": "Business Sedan",
        "tagline": "Premium corporate travel",
        "model": "Mercedes E Class",
        "idealFor": "Ideal for: Corporate executives",
        "description": "Executive comfort with refined interior finishes, suitable for professionals travelling between MED and business appointments.",
        "capacity": "3 guests",
        "luggage": "3 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image3.jpg"
      },
      {
        "name": "First Class Sedan",
        "tagline": "Flagship VIP comfort",
        "model": "Mercedes S Class",
        "idealFor": "Ideal for: VIP transport",
        "description": "Top tier luxury car service providing acoustic insulation, leather seating and executive amenities for arrivals at MED.",
        "capacity": "3 guests",
        "luggage": "3 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image4.jpg"
      },
      {
        "name": "Executive SUV",
        "tagline": "Elevated prestige and space",
        "model": "GMC Yukon",
        "idealFor": "Ideal for: Families and delegations",
        "description": "A spacious SUV pairing substantial luggage storage with elevated cabin room for regional travel across the province.",
        "capacity": "5 guests",
        "luggage": "5 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image5.jpg"
      },
      {
        "name": "Premium MPV",
        "tagline": "Luxury team transport",
        "model": "Mercedes V Class",
        "idealFor": "Ideal for: Small groups",
        "description": "Flexible seating configurations and luggage space make this van ideal for delegations arriving on commercial flights.",
        "capacity": "6 guests",
        "luggage": "6 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image6.jpg"
      },
      {
        "name": "Executive Van",
        "tagline": "Group logistics support",
        "model": "Mercedes Sprinter",
        "idealFor": "Ideal for: Large travel groups",
        "description": "High capacity cabin designed for conference delegates, event staff and multi passenger airport transfers across Madinah.",
        "capacity": "7-8 guests",
        "luggage": "8 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image7.jpg"
      }
    ],
    "journeysEyebrow": "Popular journeys",
    "journeysHeading": "Popular Chauffeur Journeys from Madinah",
    "journeysDescription": "Fixed rate transfers connect incoming passengers from MED terminals directly to primary religious, business and heritage centres in western Saudi Arabia. Scheduled departures eliminate local taxi queues and provide continuous door to door transport.",
    "journeys": [
      {
        "title": "Prophet's Mosque Area",
        "priceNote": "From SAR price · minutes",
        "description": "Direct terminal transfer connecting MED to the central hospitality district surrounding the Prophet's Mosque."
      },
      {
        "title": "Intercity to Makkah",
        "priceNote": "From SAR price · minutes",
        "description": "Long distance highway transfer connecting Madinah airport with holy sites and accommodations across Makkah."
      },
      {
        "title": "Heritage Route to AlUla",
        "priceNote": "From SAR price · minutes",
        "description": "Scenic regional journey linking MED with luxury resorts, cultural venues and archaeological sites in AlUla."
      }
    ],
    "howItWorksEyebrow": "How it works",
    "howItWorksHeading": "Professional Madinah Airport Chauffeur Meet and Greet",
    "howItWorksIntro": "Securing a Prince Mohammad bin Abdulaziz International Airport chauffeur provides an organised transition from air travel to the highway. Operations personnel monitor real time flight tracking feeds to adjust driver dispatch around early landings or gate delays. Upon exiting customs, travellers encounter their MED chauffeur holding a tailored name board at the designated terminal meeting point .",
    "howItWorksSteps": [
      {
        "step": 1,
        "title": "Book",
        "description": "Enter your arrival schedule, passenger count, luggage details and preferred vehicle category online to establish the confirmed reservation."
      },
      {
        "step": 2,
        "title": "Track",
        "description": "Operations staff monitor inbound flight radar updates continuously to align driver arrival times with actual runway touchdown."
      },
      {
        "step": 3,
        "title": "Meet",
        "description": "Your driver waits inside the arrivals hall displaying a personalised name board for immediate identification after baggage claim."
      },
      {
        "step": 4,
        "title": "Ride",
        "description": "Relax in a climate controlled cabin while your professional driver handles navigation, traffic routing and luggage drop off. MED terminals"
      }
    ],
    "terminalsEyebrow": "Terminal Coverage",
    "terminalsHeading": "Prince Mohammad bin Abdulaziz International Airport (MED) Terminals across Madinah",
    "terminalsIntro": "Navigating pickup areas requires coordination with established airport security zones and terminal gate allocations. AB operates across all flight facilities serving domestic carriers, international airlines, seasonal charters and private aviation.",
    "terminals": [
      {
        "name": "Terminal 1",
        "description": "Scheduled commercial arrivals exit through the main public arrivals hall where drivers wait past customs doors at the greeting barrier ."
      },
      {
        "name": "Hajj and Umrah Terminal",
        "description": "Seasonal pilgrim flights use dedicated processing halls with exterior passenger staging areas designated for authorised pre arranged ground transportation ."
      },
      {
        "name": "Executive Aviation Terminal",
        "description": "Private jet passengers receive discreet airside or private lounge pickups with rapid ramp access and private driver clearance . Operations coordinators remain in direct contact with arriving passengers via messaging applications to guide them toward curbside loading zones when preferred. This coordination keeps transit times brief and prevents delays inside crowded airport roadways. Services from MED"
      }
    ],
    "terminalImageAlt": "Madinah Airport Chauffeur: Prince Mohammad bin Abdulaziz International Airport (MED) Transfers terminal arrivals",
    "servicesEyebrow": "Comprehensive Transportation",
    "servicesHeading": "Executive Ground Transport Services in Madinah",
    "servicesIntro": "Ground transport solutions extend beyond standard airport runs to accommodate multi day conference programmes, institutional delegations and religious journeys. AB provides dedicated coordinators and unified invoicing for corporate travel planners and travel partner networks.",
    "servicesList": [
      {
        "title": "Airport Transfers in Medina",
        "description": "Punctual terminal pickups, direct hotel drop offs and scheduled return transport.",
        "href": "/services/airport-transfers",
        "icon": "Plane"
      },
      {
        "title": "Chauffeur & VIP in Medina",
        "description": "Chauffeur & VIP in Madinah delivers hourly chauffeur hire, full day vehicle hire and executive transport for dignitaries.",
        "href": "/services/chauffeur-service",
        "icon": "Crown"
      },
      {
        "title": "Intercity Transfers",
        "description": "Direct private highway journeys connecting Madinah with Jeddah, Makkah, Yanbu and AlUla.",
        "href": "/services/intercity-transfers",
        "icon": "MapPin"
      },
      {
        "title": "Corporate Travel Accounts",
        "description": "Centralised billing, priority vehicle allocations and managed ground travel for corporate organisations.",
        "href": "/corporate-accounts",
        "icon": "Building2"
      }
    ],
    "servicesOutro": "Vehicles can be reserved for single one way legs, multiple stop business itineraries or continuous full day hire. Centralised dispatch simplifies schedule adjustments when meeting agendas change during busy travel seasons.",
    "faqsEyebrow": "Questions",
    "faqsHeading": "Frequently Asked Questions on Madinah Airport Transfers",
    "faqs": [
      {
        "q": "How do I book a Madinah airport chauffeur for my upcoming arrival?",
        "a": "You can reserve a Madinah airport chauffeur online by submitting your flight number, arrival date, destination hotel and vehicle class selection. The AB reservation team confirms the booking details and issues dispatch confirmation with driver instructions well before departure."
      },
      {
        "q": "Where does my driver meet me for a MED arrivals pickup?",
        "a": "For an arranged MED arrivals pickup, your driver stands in the arrivals hall immediately past customs clearance holding a sign with your name. Clear pickup directions and driver contact numbers are sent by text message before your flight arrives at the terminal."
      },
      {
        "q": "What does the MED meet and greet service include?",
        "a": "The MED meet and greet service includes automated flight monitoring, a dedicated driver waiting inside the terminal with an identification board, complete luggage handling and escort to the vehicle. This process removes travel stress and provides smooth terminal exit for individual travellers and visiting groups."
      },
      {
        "q": "What happens if my inbound flight to MED experiences a delay?",
        "a": "Operations staff monitor live radar schedules for incoming MED flights to track actual landing times. Driver dispatch automatically adjusts around operational delays or early landings so your chauffeur is present in the terminal when you clear customs."
      },
      {
        "q": "How much waiting time is provided after landing at Prince Mohammad bin Abdulaziz International Airport?",
        "a": "Transfers include complimentary waiting time starting from the recorded aircraft landing time. This window provides ample time to navigate border control, customs inspection and baggage retrieval before meeting your assigned driver."
      },
      {
        "q": "Which vehicle classes are available for airport transfers in Madinah?",
        "a": "The fleet includes executive sedans such as the Mercedes S Class, full size SUVs including the GMC Yukon and Cadillac Escalade, and spacious vans like the Mercedes V Class. Each option accommodates varying passenger numbers and luggage capacities across Madinah."
      },
      {
        "q": "Can corporate accounts reserve hourly chauffeur services across Madinah?",
        "a": "Corporate accounts can schedule hourly chauffeur hire or full day vehicle hire for executive meetings, institutional delegations and multi city roadshows. Centralised account management provides unified reporting and dedicated account support through our central operations office."
      }
    ],
    "ctaHeading": "Your Chauffeur Is Waiting at MED: Book Your Madinah Airport Chauffeur",
    "ctaDescription": "Organising ground transport in advance eliminates terminal queues and provides direct, peaceful transit across the holy city. AB delivers punctual airport transfers, premium vehicles and round the clock operations support for incoming regional and international travellers.\n\nSelect your vehicle category online or contact dispatch for customized group and delegation logistics.",
    "ctaPhone": "+966 58 111 8720"
  },
  "zayed-international-auh": {
    "slug": "zayed-international-auh",
    "iata": "AUH",
    "name": "Zayed International Airport (AUH) Transfers",
    "fullName": "Zayed International Airport (AUH) Transfers: Abu Dhabi Airport Chauffeur Service",
    "cityName": "Abu Dhabi",
    "citySlug": "abu-dhabi",
    "countryName": "United Arab Emirates",
    "countrySlug": "uae",
    "phone": "+971 50 918 0556",
    "pickupDefault": "Zayed International Airport (AUH)",
    "dropoffDefault": "Abu Dhabi Corniche, Abu Dhabi",
    "heroTitle": "Zayed International Airport (AUH) Transfers: Abu Dhabi Airport Chauffeur Service",
    "heroDescription": "An executive Abu Dhabi airport chauffeur service provides seamless, prearranged private mobility from Zayed International Airport (AUH) to hotels, corporate offices and diplomatic districts across Abu Dhabi. Professional flight monitoring and terminal assistance maintain punctuality across commercial flights and private aviation arrivals.\n\nCoordinated airport transfers eliminate kerbside delays, connecting passengers directly with licensed chauffeurs and immaculately presented premium vehicles. Flight tracking technology aligns arrival schedules with kerbside staging to accommodate early landings or unexpected airspace holds.",
    "heroImage": "/airports/www.ab.limo-airports-zayed-international-auh-images/image1.jpg",
    "heroImageAlt": "Zayed International Airport (AUH) Transfers: Abu Dhabi Airport Chauffeur Service chauffeur arrivals",
    "fleetEyebrow": "The AUH fleet",
    "fleetHeading": "Executive Vehicles for Abu Dhabi Airport Chauffeur Service",
    "fleetDescription": "AB maintains an immaculate fleet of executive sedans, sport utility vehicles and multi purpose vans configured for seamless airport transfers at Zayed International Airport (AUH). Every vehicle is operated by a vetted professional chauffeur.",
    "vehicles": [
      {
        "name": "Standard Sedan",
        "tagline": "Practical urban travel",
        "model": "Toyota Camry or similar",
        "idealFor": "Ideal for: Individual corporate travellers",
        "description": "Comfortable and efficient transfers connecting AUH arrivals directly with city hotels and commercial offices across the emirate.",
        "capacity": "3 guests",
        "luggage": "2 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image2.jpg"
      },
      {
        "name": "Business Sedan",
        "tagline": "Premium corporate travel",
        "model": "Mercedes E Class or similar",
        "idealFor": "Ideal for: Business executives and delegates",
        "description": "Refined executive travel from AUH with leather seating, climate control and discrete acoustic insulation for mobile work.",
        "capacity": "3 guests",
        "luggage": "3 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image3.jpg"
      },
      {
        "name": "First Class Sedan",
        "tagline": "Flagship VIP comfort",
        "model": "Mercedes S Class or similar",
        "idealFor": "Ideal for: VIP transport and senior leadership",
        "description": "Flagship luxury car service providing exceptional comfort, extended rear legroom and superior kerbside arrival presence.",
        "capacity": "3 guests",
        "luggage": "3 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image4.jpg"
      },
      {
        "name": "Executive SUV",
        "tagline": "Elevated prestige and space",
        "model": "Cadillac Escalade or GMC Yukon or similar",
        "idealFor": "Ideal for: Executive groups with luggage",
        "description": "Commanding cabin volume and luggage capacity tailored for premium AUH transfers across Abu Dhabi and cross border emirate routes.",
        "capacity": "5 guests",
        "luggage": "5 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image5.jpg"
      },
      {
        "name": "Premium MPV",
        "tagline": "Luxury team transport",
        "model": "Mercedes V Class or similar",
        "idealFor": "Ideal for: Families and executive roadshows",
        "description": "Spacious conference style seating accommodating multiple passengers and extensive baggage seamlessly from AUH terminal kerbsides.",
        "capacity": "6 guests",
        "luggage": "6 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image6.jpg"
      },
      {
        "name": "Executive Van",
        "tagline": "Group logistics support",
        "model": "Mercedes Sprinter or similar",
        "idealFor": "Ideal for: Event delegations and travel groups",
        "description": "High capacity chauffeured transportation offering generous luggage space and high roof walk in access for group itineraries.",
        "capacity": "7-8 guests",
        "luggage": "8 bags",
        "image": "/locations/www.ab.limo-locations-uae-ajman-images/image7.jpg"
      }
    ],
    "journeysEyebrow": "Popular journeys",
    "journeysHeading": "Popular Journeys: Airport Chauffeur Service Abu Dhabi Routes",
    "journeysDescription": "AB provides fixed route transfers from Zayed International Airport to primary corporate destinations, residential developments and neighbouring emirates. Transparent scheduling supports predictable itineraries for international business visitors.",
    "journeys": [
      {
        "title": "AUH to central Abu Dhabi",
        "priceNote": "From AED price · minutes",
        "description": "Connecting arriving passengers directly to the downtown commercial sector, government ministries and luxury Corniche hotels with seamless kerbside delivery."
      },
      {
        "title": "AUH to Yas Island",
        "priceNote": "",
        "description": "Direct transit to Yas Marina Circuit, entertainment arenas, exhibition centres and resort complexes located minutes north of the terminal complex."
      },
      {
        "title": "AUH to Dubai",
        "priceNote": "From AED price · minutes",
        "description": "Intercity chauffeur transport linking AUH directly to Downtown Dubai, Business Bay and Dubai International Financial Centre via highway corridors."
      },
      {
        "title": "AUH to Al Ain",
        "priceNote": "From AED price · minutes",
        "description": "Chauffeured intercity transfer to the eastern region, serving university campuses, industrial zones and heritage properties across the oasis city."
      }
    ],
    "howItWorksEyebrow": "How it works",
    "howItWorksHeading": "AUH Meet and Greet Chauffeur Logistics",
    "howItWorksIntro": "The standard AUH meet and greet service simplifies international arrival. Operations personnel monitor flights continuously to adjust vehicle staging for variable landing times. Chauffeurs enter the terminal arrivals hall holding personalised name boards as passengers clear baggage claim and customs. Chauffeurs provide professional luggage help, escorting guests to dedicated terminal limousine pickup areas. Each AUH arrivals pickup includes complimentary waiting time to accommodate customs clearance and baggage retrieval procedures without administrative stress.",
    "howItWorksSteps": [
      {
        "step": 1,
        "title": "Book",
        "description": "Reserve an executive car with driver online or via corporate dispatch, confirming flight details, passenger counts and luggage requirements."
      },
      {
        "step": 2,
        "title": "Track",
        "description": "Central operations track inbound aircraft in real time, matching chauffeur arrival with actual touchdown and gate assignment."
      },
      {
        "step": 3,
        "title": "Meet",
        "description": "Your Zayed International Airport chauffeur greets you inside the designated arrivals hall with a clear name board and takes your luggage."
      },
      {
        "step": 4,
        "title": "Ride",
        "description": "Board an air conditioned luxury car for a smooth, direct journey to your residential, hotel or corporate destination. Terminals"
      }
    ],
    "terminalsEyebrow": "Terminal Coverage",
    "terminalsHeading": "Zayed International Airport Terminal Meeting Points",
    "terminalsIntro": "AUH operates distinct passenger processing zones for commercial airlines, premium travellers and private general aviation movements across the airport grounds.",
    "terminals": [
      {
        "name": "Terminal A",
        "description": "Commercial arrivals meet their AUH chauffeur directly past baggage claim inside the main arrivals hall at the specified passenger exit point ."
      },
      {
        "name": "VIP Terminal",
        "description": "Delegations using premium meet and assist services exit through designated VIP reception lounges with kerbside executive vehicle staging ."
      },
      {
        "name": "Private Aviation Terminal",
        "description": "Fixed base operator facilities accommodate private charters and business jets with direct ramp side coordination and private tarmac chauffeur pickups . Services from AUH"
      }
    ],
    "terminalImageAlt": "Zayed International Airport (AUH) Transfers: Abu Dhabi Airport Chauffeur Service terminal arrivals",
    "servicesEyebrow": "Comprehensive Transportation",
    "servicesHeading": "Comprehensive Airport and Corporate Ground Transportation",
    "servicesIntro": "Beyond one way airport pickups, AB delivers complete mobility solutions across Abu Dhabi and the wider region for corporate enterprises and VIP travellers.",
    "servicesList": [
      {
        "title": "Airport Transfers in Abu Dhabi",
        "description": "Scheduled private transfers between airport terminals and commercial properties across Abu Dhabi.",
        "href": "/services/airport-transfers",
        "icon": "Plane"
      },
      {
        "title": "Chauffeur & VIP in Abu Dhabi",
        "description": "Dedicated hourly chauffeur and full-day vehicle hire for diplomatic delegations and executive itineraries.",
        "href": "/services/chauffeur-service",
        "icon": "Crown"
      },
      {
        "title": "Intercity Transfers",
        "description": "Direct long-distance highway journeys connecting Abu Dhabi with regional commercial hubs and neighbouring emirates.",
        "href": "/services/intercity-transfers",
        "icon": "MapPin"
      },
      {
        "title": "Corporate Travel Accounts",
        "description": "Centralised management, custom billing arrangements, and protocol coordination for enterprise travel departments.",
        "href": "/corporate-accounts",
        "icon": "Building2"
      }
    ],
    "servicesOutro": "Corporate accounts benefit from centralised consolidated invoicing, dedicated account managers, customized billing cycles and priority vehicle allocations during peak conference periods.",
    "faqsEyebrow": "Questions",
    "faqsHeading": "Frequently Asked Questions About AUH Chauffeur Services",
    "faqs": [
      {
        "q": "How does flight tracking work for an AUH chauffeur transfer?",
        "a": "Central operations track commercial flights through automated radar monitoring systems. Chauffeur dispatch adjusts automatically when an inbound flight lands early or suffers operational delays. This procedure supports precise arrivals pickup without passengers needing to report flight adjustments manually."
      },
      {
        "q": "Where does the chauffeur meet arriving passengers at AUH?",
        "a": "The assigned chauffeur waits directly in the terminal arrivals hall immediately after the customs exit doors. The chauffeur displays an electronic tablet or printed board showing the passenger or company name. The chauffeur then provides luggage assistance before walking to the executive vehicle pickup bay."
      },
      {
        "q": "What complimentary waiting time applies to AUH airport pickups?",
        "a": "Airport pickups at AUH include complimentary waiting time calculated from the actual aircraft touchdown time. This allowance gives international travellers sufficient time to navigate passport control, collect baggage and complete customs clearance. Additional waiting time can be arranged if extended transit processing occurs."
      },
      {
        "q": "Can corporate travel managers book hourly chauffeur service from AUH?",
        "a": "Yes, AB provides hourly chauffeur and full day hire services commencing directly upon arrival at AUH. This option suits executives attending consecutive meetings, government summits or site inspections across Abu Dhabi before returning to the airport or proceeding to another emirate."
      },
      {
        "q": "What vehicle classes are available for airport transfers in Abu Dhabi?",
        "a": "The fleet includes executive sedans such as the Mercedes S Class and Mercedes E Class, spacious SUVs like the Cadillac Escalade and GMC Yukon, and multi passenger vans including the Mercedes V Class. Every vehicle is fully licensed, insured and maintained to strict executive safety standards."
      },
      {
        "q": "How are private aviation and VIP terminal pickups handled at AUH?",
        "a": "For passengers arriving via private jet or VIP terminal facilities, AB coordinates directly with local ground handlers and fixed base operators. Chauffeurs stage vehicles at designated VIP exit gates to support confidential, swift departures from the airport perimeter."
      },
      {
        "q": "How do corporate organisations establish a managed account with AB?",
        "a": "Organisations can establish corporate accounts through our operations team to secure contracted tariffs, consolidated monthly billing and access to regional ground transportation. Direct coordination with 24/7 dispatch provides seamless booking management across Abu Dhabi, Dubai, Riyadh and Doha."
      }
    ],
    "ctaHeading": "Your chauffeur is waiting at AUH.",
    "ctaDescription": "Secure a dependable Abu Dhabi airport chauffeur service with professional flight tracking, dedicated terminal meet and greet, and immaculate executive vehicles. Our dispatch team coordinates scheduled transfers and VIP roadshows across Abu Dhabi and all seven UAE emirates.\n\nFor immediate reservations, flight updates or specialised corporate bookings, contact AB Abu Dhabi at Office 03, Mezzanine Floor, Building C57, Abu Dhabi, UAE.",
    "ctaPhone": "+971 50 918 0556"
  }
};

export const ALL_AIRPORTS = Object.values(AIRPORTS_DATA);

export function getAirportData(slug: string): AirportPageData | undefined {
  return AIRPORTS_DATA[slug] || ALL_AIRPORTS.find(a => a.iata.toLowerCase() === slug.toLowerCase() || a.slug.endsWith(slug.toLowerCase()));
}
