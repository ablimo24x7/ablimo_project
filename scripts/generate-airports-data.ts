import * as fs from "fs";
import * as path from "path";

const dir = path.resolve(process.cwd(), "airports-md");

export interface VehicleItem {
  name: string;
  tagline: string;
  model: string;
  idealFor: string;
  description: string;
  capacity: string;
  luggage: string;
  image: string;
}

export interface JourneyItem {
  title: string;
  priceNote?: string;
  description: string;
}

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
}

export interface TerminalItem {
  name: string;
  description: string;
}

export interface AirportServiceItem {
  title: string;
  description: string;
  href: string;
  icon: string;
}

export interface FaqItem {
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
  vehicles: VehicleItem[];
  journeysEyebrow: string;
  journeysHeading: string;
  journeysDescription: string;
  journeys: JourneyItem[];
  howItWorksEyebrow: string;
  howItWorksHeading: string;
  howItWorksIntro: string;
  howItWorksSteps: HowItWorksStep[];
  terminalsEyebrow: string;
  terminalsHeading: string;
  terminalsIntro: string;
  terminals: TerminalItem[];
  terminalImage?: string;
  terminalImageAlt?: string;
  servicesEyebrow: string;
  servicesHeading: string;
  servicesIntro: string;
  servicesList: AirportServiceItem[];
  servicesOutro: string;
  faqsEyebrow: string;
  faqsHeading: string;
  faqs: FaqItem[];
  ctaHeading: string;
  ctaDescription: string;
  ctaPhone: string;
}

const VEHICLE_IMAGES: Record<string, { image: string; capacity: string; luggage: string }> = {
  "Standard Sedan": {
    image: "/locations/www.ab.limo-locations-uae-ajman-images/image2.jpg",
    capacity: "3 guests",
    luggage: "2 bags",
  },
  "Business Sedan": {
    image: "/locations/www.ab.limo-locations-uae-ajman-images/image3.jpg",
    capacity: "3 guests",
    luggage: "3 bags",
  },
  "First Class Sedan": {
    image: "/locations/www.ab.limo-locations-uae-ajman-images/image4.jpg",
    capacity: "3 guests",
    luggage: "3 bags",
  },
  "Executive SUV": {
    image: "/locations/www.ab.limo-locations-uae-ajman-images/image5.jpg",
    capacity: "5 guests",
    luggage: "5 bags",
  },
  "Premium MPV": {
    image: "/locations/www.ab.limo-locations-uae-ajman-images/image6.jpg",
    capacity: "6 guests",
    luggage: "6 bags",
  },
  "Executive Van": {
    image: "/locations/www.ab.limo-locations-uae-ajman-images/image7.jpg",
    capacity: "7-8 guests",
    luggage: "8 bags",
  },
};

const AIRPORT_METAS: Record<string, {
  city: string;
  citySlug: string;
  country: string;
  countrySlug: string;
  phone: string;
  pickup: string;
  dropoff: string;
}> = {
  "dubai-international-dxb": {
    city: "Dubai",
    citySlug: "dubai",
    country: "United Arab Emirates",
    countrySlug: "uae",
    phone: "+971 50 918 0556",
    pickup: "Dubai International Airport (DXB)",
    dropoff: "DIFC, Dubai",
  },
  "al-maktoum-international-dwc": {
    city: "Dubai",
    citySlug: "dubai",
    country: "United Arab Emirates",
    countrySlug: "uae",
    phone: "+971 50 918 0556",
    pickup: "Al Maktoum International Airport (DWC)",
    dropoff: "Dubai Marina, Dubai",
  },
  "zayed-international-auh": {
    city: "Abu Dhabi",
    citySlug: "abu-dhabi",
    country: "United Arab Emirates",
    countrySlug: "uae",
    phone: "+971 50 918 0556",
    pickup: "Zayed International Airport (AUH)",
    dropoff: "Abu Dhabi Corniche, Abu Dhabi",
  },
  "hamad-international-doh": {
    city: "Doha",
    citySlug: "doha",
    country: "Qatar",
    countrySlug: "qatar",
    phone: "+971 50 918 0556",
    pickup: "Hamad International Airport (DOH)",
    dropoff: "West Bay, Doha",
  },
  "king-khalid-international-ruh": {
    city: "Riyadh",
    citySlug: "riyadh",
    country: "Saudi Arabia",
    countrySlug: "saudi-arabia",
    phone: "+966 59 697 8125",
    pickup: "King Khalid International Airport (RUH)",
    dropoff: "KAFD, Riyadh",
  },
  "king-abdulaziz-international-jed": {
    city: "Jeddah",
    citySlug: "jeddah",
    country: "Saudi Arabia",
    countrySlug: "saudi-arabia",
    phone: "+966 59 697 8125",
    pickup: "King Abdulaziz International Airport (JED)",
    dropoff: "Corniche, Jeddah",
  },
  "prince-mohammad-bin-abdulaziz-med": {
    city: "Medina",
    citySlug: "medina",
    country: "Saudi Arabia",
    countrySlug: "saudi-arabia",
    phone: "+966 59 697 8125",
    pickup: "Prince Mohammad bin Abdulaziz Airport (MED)",
    dropoff: "Prophet's Mosque Area, Madinah",
  },
  "king-fahd-international-dmm": {
    city: "Dammam",
    citySlug: "dammam",
    country: "Saudi Arabia",
    countrySlug: "saudi-arabia",
    phone: "+966 59 697 8125",
    pickup: "King Fahd International Airport (DMM)",
    dropoff: "Al Khobar, Dammam",
  },
};

function cleanConfirm(str: string): string {
  return str
    .replace(/\\\[Confirm.*?\\\]/gi, "")
    .replace(/\[Confirm.*?\]/gi, "")
    // Strip image markdown completely
    .replace(/!\[.*?\]\([^\)]*\)/g, "")
    .replace(/!.*?\.(?:jpg|jpeg|png|webp)\)/gi, "")
    // Strip action links/buttons completely
    .replace(/\[Book (?:now|a transfer|this class)\](?:\([^\)]*\))?/gi, "")
    .replace(/\[Request a proposal\](?:\([^\)]*\))?/gi, "")
    .replace(/\[View the fleet\](?:\([^\)]*\))?/gi, "")
    .replace(/\[Explore\](?:\([^\)]*\))?/gi, "")
    .replace(/\[Book a transfer\]/gi, "")
    .replace(/\[Book now\]/gi, "")
    .replace(/\[Request a proposal\]/gi, "")
    .replace(/\[View the fleet\]/gi, "")
    // Strip external seowriting.ai links
    .replace(/\(https?:\/\/seowriting\.ai[^\)]*\)/gi, "")
    .replace(/https?:\/\/seowriting\.ai[^\s\)]*/gi, "")
    // Strip self links
    .replace(/\(https?:\/\/(?:www\.)?ab\.limo[^\)]*\)/gi, "")
    // Convert remaining markdown links [Text](url) -> Text
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
    // Convert remaining [Text] -> Text
    .replace(/\[(.*?)\]/g, "$1")
    .replace(/\\/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanServiceBullet(raw: string, cityName: string): AirportServiceItem {
  const lower = raw.toLowerCase();
  let title = "";
  let defaultDesc = "";
  let href = "";
  let icon = "";

  if (lower.includes("airport transfer")) {
    title = `Airport Transfers in ${cityName}`;
    defaultDesc = `Scheduled private transfers between airport terminals and commercial properties across ${cityName}.`;
    href = "/services/airport-transfers";
    icon = "Plane";
  } else if (lower.includes("chauffeur") || lower.includes("vip")) {
    title = `Chauffeur & VIP in ${cityName}`;
    defaultDesc = `Dedicated hourly chauffeur and full-day vehicle hire for diplomatic delegations and executive itineraries.`;
    href = "/services/chauffeur-service";
    icon = "Crown";
  } else if (lower.includes("intercity")) {
    title = "Intercity Transfers";
    defaultDesc = `Direct long-distance highway journeys connecting ${cityName} with regional commercial hubs and neighbouring emirates.`;
    href = "/services/intercity-transfers";
    icon = "MapPin";
  } else {
    title = "Corporate Travel Accounts";
    defaultDesc = `Centralised management, custom billing arrangements, and protocol coordination for enterprise travel departments.`;
    href = "/corporate-accounts";
    icon = "Building2";
  }

  let cleaned = raw
    .replace(/\[Confirm.*?\]/gi, "")
    .replace(/\(https?:\/\/seowriting\.ai[^\)]*\)/gi, "")
    .replace(/\[Book (?:now|a transfer)\](?:\([^\)]*\))?/gi, "")
    .replace(/\[(.*?)\]/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

  let description = defaultDesc;

  if (cleaned.includes(":")) {
    const afterColon = cleaned.split(":")[1].trim();
    if (afterColon.length > 15) {
      description = afterColon;
    }
  } else if (cleaned.length > title.length + 10) {
    let desc = cleaned;
    desc = desc.replace(
      /^(?:Schedule dedicated|Reserve executive|Arrange direct|Establish managed|Book punctual|Arrange premium|Schedule comfortable|Establish dedicated|Book point to point journeys through|Coordinate premium executive sedans and SUVs through|Arrange long distance executive travel through|Set up centralised corporate billing and service level agreements through)\s+/i,
      ""
    );
    // Strip redundant title prefix e.g. "Airport Transfers in Dubai for ..." -> "Reliable terminal pickups..."
    desc = desc.replace(/^(?:Airport Transfers in [^f]+for\s+|Chauffeur & VIP in [^f]+for\s+|Intercity Transfers (?:connecting|linking)\s+|Corporate Accounts for\s+)/i, "");
    desc = desc.replace(/^(?:Airport Transfers in [^p]+provides\s+|Chauffeur & VIP in [^d]+delivers\s+|Intercity Transfers offers\s+|Corporate Accounts delivers\s+)/i, "");

    desc = desc.charAt(0).toUpperCase() + desc.slice(1);
    if (desc.length > 20) {
      description = desc;
    }
  }

  return { title, description, href, icon };
}

function parseFile(fileName: string): AirportPageData {
  const content = fs.readFileSync(path.join(dir, fileName), "utf-8");
  const slug = fileName.replace(/^www\.ab\.limo-airports-/, "").replace(/\.md$/, "");
  const iata = slug.split("-").pop()?.toUpperCase() || "";
  const meta = AIRPORT_METAS[slug];

  const sections = content.split(/\n(?=##\s+)/);

  // Section 0: Hero
  const sec0 = sections[0];
  const h1Match = sec0.match(/^#\s+\*\*(.+?)\*\*/m) || sec0.match(/^#\s+(.+)$/m);
  const heroTitle = cleanConfirm(h1Match ? h1Match[1] : "");

  const heroParagraphs = sec0
    .split("\n\n")
    .map(p => cleanConfirm(p))
    .filter(p => {
      if (!p) return false;
      if (p.startsWith("#") || p.startsWith("!") || p.includes("Pick up:") || p.includes("Drop off:") || p.includes("·")) return false;
      const lower = p.toLowerCase().trim();
      if (
        lower.startsWith("book now") ||
        lower.startsWith("book a transfer") ||
        (lower.startsWith("the ") && lower.endsWith(" fleet")) ||
        lower.includes("view the fleet") ||
        lower === "questions"
      ) return false;
      return true;
    });
  const heroDescription = heroParagraphs.join("\n\n");

  const heroImage = `/airports/www.ab.limo-airports-${slug}-images/image1.jpg`;
  const heroImageAlt = `${heroTitle} chauffeur arrivals`;

  // Section 1: Fleet
  const sec1 = sections[1];
  const sec1HeadingMatch = sec1.match(/^##\s+\*\*(.+?)\*\*/m);
  const fleetHeading = cleanConfirm(sec1HeadingMatch ? sec1HeadingMatch[1] : `Executive Vehicles for ${iata} Transfers`);
  
  const fleetIntroMatch = sec1.split("\n\n")[1];
  const fleetDescription = cleanConfirm(fleetIntroMatch || "");

  const vehicles: VehicleItem[] = [];
  const VALID_VEHICLE_NAMES = [
    "Standard Sedan",
    "Business Sedan",
    "First Class Sedan",
    "Executive SUV",
    "Premium MPV",
    "Executive Van",
  ];

  if (sec1.includes("|")) {
    const lines = sec1.split("\n").filter(l => l.startsWith("|") && !l.includes("---"));
    for (const line of lines) {
      const parts = line.split("|").map(p => cleanConfirm(p.trim())).filter(Boolean);
      if (parts.length >= 4 && VALID_VEHICLE_NAMES.includes(parts[0])) {
        const name = parts[0];
        const model = parts[1];
        const idealFor = parts[2];
        const desc = parts[3];
        const vInfo = VEHICLE_IMAGES[name] || {
          image: "/locations/www.ab.limo-locations-uae-ajman-images/image3.jpg",
          capacity: "3 guests",
          luggage: "3 bags",
        };
        vehicles.push({
          name,
          tagline: name.includes("First Class") ? "Flagship VIP comfort" : name.includes("Business") ? "Premium corporate travel" : name.includes("SUV") ? "Elevated prestige and space" : name.includes("MPV") ? "Luxury team transport" : name.includes("Van") ? "Group logistics support" : "Practical urban travel",
          model,
          idealFor: `Ideal for: ${idealFor}`,
          description: desc,
          capacity: vInfo.capacity,
          luggage: vInfo.luggage,
          image: vInfo.image,
        });
      }
    }
  } else {
    const vSections = sec1.split(/\n(?=###\s+\*\*)/).slice(1);
    for (const vSec of vSections) {
      const vNameMatch = vSec.match(/^###\s+\*\*(.+?)\*\*/m);
      const name = cleanConfirm(vNameMatch ? vNameMatch[1] : "");
      const taglineMatch = vSec.match(/\*\*Tag line:\*\*\s*(.+)/i);
      const modelMatch = vSec.match(/\*\*Model:\*\*\s*(.+)/i);
      const idealMatch = vSec.match(/\*\*Ideal for:\*\*\s*(.+)/i);
      
      const paragraphs = vSec.split("\n\n").map(p => cleanConfirm(p)).filter(p => p && !p.startsWith("#") && !p.startsWith("**Tag line") && !p.startsWith("**Model") && !p.startsWith("**Ideal"));
      const desc = paragraphs.join(" ");

      const vInfo = VEHICLE_IMAGES[name] || {
        image: "/locations/www.ab.limo-locations-uae-ajman-images/image3.jpg",
        capacity: "3 guests",
        luggage: "3 bags",
      };

      vehicles.push({
        name,
        tagline: cleanConfirm(taglineMatch ? taglineMatch[1] : ""),
        model: cleanConfirm(modelMatch ? modelMatch[1] : ""),
        idealFor: cleanConfirm(idealMatch ? `Ideal for: ${idealMatch[1]}` : ""),
        description: desc,
        capacity: vInfo.capacity,
        luggage: vInfo.luggage,
        image: vInfo.image,
      });
    }
  }

  // Section 2: Popular Journeys
  const sec2 = sections[2];
  const sec2HeadingMatch = sec2.match(/^##\s+\*\*(.+?)\*\*/m);
  const journeysHeading = cleanConfirm(sec2HeadingMatch ? sec2HeadingMatch[1] : `Popular Journeys from ${iata}`);
  
  const journeysIntroMatch = sec2.split("\n\n")[1];
  const journeysDescription = cleanConfirm(journeysIntroMatch && !journeysIntroMatch.startsWith("#") ? journeysIntroMatch : `Direct airport transfers from ${iata} to premier commercial districts and regional hubs.`);

  const journeys: JourneyItem[] = [];
  const jSections = sec2.split(/\n(?=###\s+\*\*)/).slice(1);
  for (const jSec of jSections) {
    const jTitleMatch = jSec.match(/^###\s+\*\*(.+?)\*\*/m);
    const title = cleanConfirm(jTitleMatch ? jTitleMatch[1] : "");
    const jParagraphs = jSec
      .split("\n\n")
      .map(p => cleanConfirm(p))
      .filter(p => {
        if (!p || p.startsWith("#")) return false;
        const lower = p.toLowerCase().trim();
        if (
          lower.startsWith(">") ||
          lower === "book a transfer" ||
          lower === "book now" ||
          lower.startsWith("book a transfer") ||
          (lower.includes("how it works") && lower.length < 35) ||
          lower === "how it works"
        ) return false;
        return true;
      });
    
    let priceNote = "";
    let descParts: string[] = [];
    for (const p of jParagraphs) {
      const lower = p.toLowerCase();
      if (lower.includes("from [") || lower.includes("from aed") || lower.includes("from sar") || lower.includes("minutes")) {
        if (p.includes(". Direct ") || p.includes(". Transfers run ") || p.includes(". Executive transport ") || p.includes(". International transfers ")) {
          const match = p.match(/(.*?From\s+(?:SAR|AED|QAR)?\s*price\s*·?\s*minutes\.?)\s*(.+)/i);
          if (match) {
            priceNote = match[1].trim();
            descParts.push(match[2].trim());
            continue;
          }
        }
        priceNote = p;
      } else {
        descParts.push(p);
      }
    }

    let description = descParts.join(" ").trim();
    description = description
      .replace(/\s*How it works$/i, "")
      .replace(/Book a transfer$/i, "")
      .trim();

    if (!description && priceNote) {
      description = priceNote;
      priceNote = "";
    }

    journeys.push({
      title,
      priceNote,
      description,
    });
  }

  // Section 3: Meet & Greet (How it works)
  const sec3 = sections[3];
  const sec3HeadingMatch = sec3.match(/^##\s+\*\*(.+?)\*\*/m);
  const howItWorksHeading = cleanConfirm(sec3HeadingMatch ? sec3HeadingMatch[1] : `${iata} Meet and Greet Chauffeur Operations`);
  
  const sec3Paragraphs = sec3.split("\n\n").map(p => cleanConfirm(p)).filter(p => p && !p.startsWith("#") && !p.startsWith("###"));
  const howItWorksIntro = sec3Paragraphs[0] || "";

  const steps: HowItWorksStep[] = [];
  const stepMatches = [...sec3.matchAll(/###\s*(?:\d+\.\s*)?\*\*(Book|Track|Meet|Ride)\*\*\s*\n+([\s\S]*?)(?=(?:###|$))/gi)];
  let stepIdx = 1;
  for (const sm of stepMatches) {
    steps.push({
      step: stepIdx++,
      title: cleanConfirm(sm[1]),
      description: cleanConfirm(sm[2]),
    });
  }

  // Section 4: Terminals & Airport Layout
  const sec4 = sections[4];
  const sec4HeadingMatch = sec4.match(/^##\s+\*\*(.+?)\*\*/m);
  const terminalsHeading = cleanConfirm(sec4HeadingMatch ? sec4HeadingMatch[1] : `Navigating ${iata} Terminals`);
  
  const sec4Paragraphs = sec4.split("\n\n").map(p => cleanConfirm(p)).filter(p => p && !p.startsWith("#") && !p.startsWith("###") && !p.startsWith("!["));
  const terminalsIntro = sec4Paragraphs[0] || "";

  const terminals: TerminalItem[] = [];
  if (sec4.includes("### **")) {
    const tSections = sec4.split(/\n(?=###\s+\*\*)/).slice(1);
    for (const tSec of tSections) {
      const tTitleMatch = tSec.match(/^###\s+\*\*(.+?)\*\*/m);
      const name = cleanConfirm(tTitleMatch ? tTitleMatch[1] : "");
      const tParagraphs = tSec.split("\n\n").map(p => cleanConfirm(p)).filter(p => p && !p.startsWith("#") && !p.startsWith("!["));
      terminals.push({
        name,
        description: tParagraphs.join(" "),
      });
    }
  } else {
    const bulletMatches = [...sec4.matchAll(/^-\s+\*\*(.+?):\*\*\s*(.+)$/gm)];
    for (const bm of bulletMatches) {
      terminals.push({
        name: cleanConfirm(bm[1]),
        description: cleanConfirm(bm[2]),
      });
    }
  }

  const tImgMatch = sec4.match(/!\[(.*?)\]\((.*?)\)/);
  const terminalImage = tImgMatch ? `/airports/${tImgMatch[2]}` : (fs.existsSync(path.join(process.cwd(), `public/airports/www.ab.limo-airports-${slug}-images/image2.jpg`)) ? `/airports/www.ab.limo-airports-${slug}-images/image2.jpg` : undefined);
  const terminalImageAlt = tImgMatch ? cleanConfirm(tImgMatch[1]) : `${heroTitle} terminal arrivals`;

  // Section 5: Connected Services
  const sec5 = sections[5];
  const sec5HeadingMatch = sec5.match(/^##\s+\*\*(.+?)\*\*/m);
  const servicesHeading = cleanConfirm(sec5HeadingMatch ? sec5HeadingMatch[1] : `Executive Chauffeur Services from ${iata}`);

  const sec5Paragraphs = sec5.split("\n\n").map(p => cleanConfirm(p)).filter(p => p && !p.startsWith("#") && !p.startsWith("-"));
  const servicesIntro = sec5Paragraphs[0] || `AB provides comprehensive ground transportation solutions connected to ${iata} arrivals, tailored for corporate itineraries and private travellers:`;

  const bullets = [...sec5.matchAll(/^-\s+(.+)$/gm)].map(m => m[1]);
  const servicesList: AirportServiceItem[] = bullets.map(b => cleanServiceBullet(b, meta.city));

  // If no bullets found or fewer than 4, ensure 4 standard services
  if (servicesList.length === 0) {
    servicesList.push(
      cleanServiceBullet("Airport Transfers", meta.city),
      cleanServiceBullet("Chauffeur & VIP", meta.city),
      cleanServiceBullet("Intercity Transfers", meta.city),
      cleanServiceBullet("Corporate Accounts", meta.city)
    );
  }

  // Clean outro: strip https://seowriting.ai, Questions, Book a transfer
  const rawOutro = sec5Paragraphs.slice(1).join(" ");
  let servicesOutro = cleanConfirm(rawOutro)
    .replace(/Questions\s*$/i, "")
    .replace(/via Book a transfer to receive/gi, "to receive")
    .replace(/submit your travel schedule directly via to receive/gi, "submit your travel schedule directly to receive")
    .replace(/Book a transfer\s*$/gi, "")
    .replace(/Book a transfer/gi, "")
    .replace(/Book now/gi, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!servicesOutro || servicesOutro.length < 25) {
    servicesOutro = "Organisations requiring full-day hire or hourly chauffeur availability benefit from central billing, licensed and insured vehicles, and tailored corporate travel accounts managed by our regional operations.";
  }

  // Section 6: FAQs
  const sec6 = sections[6];
  const sec6HeadingMatch = sec6.match(/^##\s+\*\*(.+?)\*\*/m);
  const faqsHeading = cleanConfirm(sec6HeadingMatch ? sec6HeadingMatch[1] : `Frequently Asked Questions About ${iata} Airport Transfers`);

  const faqs: FaqItem[] = [];
  const faqSections = sec6.split(/\n(?=###\s+\*\*)/).slice(1);
  for (const fSec of faqSections) {
    const qMatch = fSec.match(/^###\s+\*\*(.+?)\*\*/m);
    const q = cleanConfirm(qMatch ? qMatch[1] : "");
    const aParagraphs = fSec.split("\n\n").map(p => cleanConfirm(p)).filter(p => p && !p.startsWith("#"));
    faqs.push({
      q,
      a: aParagraphs.join("\n\n"),
    });
  }

  // Section 7: CTA
  const sec7 = sections[7];
  const sec7HeadingMatch = sec7.match(/^##\s+\*\*(.+?)\*\*/m);
  const ctaHeading = cleanConfirm(sec7HeadingMatch ? sec7HeadingMatch[1] : `Your chauffeur is waiting at ${iata}.`);
  
  const sec7Paragraphs = sec7
    .split("\n\n")
    .map(p => cleanConfirm(p))
    .filter(p => {
      if (!p) return false;
      if (p.startsWith("#") || p.startsWith("+")) return false;
      const lower = p.toLowerCase().trim();
      if (
        lower.startsWith("book now") ||
        lower.startsWith("book a transfer") ||
        lower.startsWith("request a proposal") ||
        lower === "book a transfer request a proposal" ||
        lower === "book now request a proposal"
      ) return false;
      return true;
    });

  let ctaDescription = sec7Paragraphs.join("\n\n") || `Reserve an executive airport transfer with AB for punctual airport arrivals, dedicated flight tracking, and seamless corporate transport across ${meta.country}.`;
  ctaDescription = ctaDescription
    .replace(/\n*Book (?:now|a transfer)\s*(?:Request a proposal)?\s*$/i, "")
    .replace(/\n*Request a proposal\s*$/i, "")
    .trim();

  const phoneMatch = sec7.match(/(\+\d[\d\s]+)/);
  const ctaPhone = phoneMatch ? phoneMatch[1].trim() : meta.phone;

  return {
    slug,
    iata,
    name: heroTitle.split(":")[0].trim(),
    fullName: heroTitle,
    cityName: meta.city,
    citySlug: meta.citySlug,
    countryName: meta.country,
    countrySlug: meta.countrySlug,
    phone: meta.phone,
    pickupDefault: meta.pickup,
    dropoffDefault: meta.dropoff,
    heroTitle,
    heroDescription,
    heroImage,
    heroImageAlt,
    fleetEyebrow: `The ${iata} fleet`,
    fleetHeading,
    fleetDescription,
    vehicles,
    journeysEyebrow: "Popular journeys",
    journeysHeading,
    journeysDescription,
    journeys,
    howItWorksEyebrow: "How it works",
    howItWorksHeading,
    howItWorksIntro,
    howItWorksSteps: steps.length === 4 ? steps : [
      { step: 1, title: "Book", description: "Submit passenger flight details, terminal information, and preferred vehicle class online or through corporate booking channels in advance." },
      { step: 2, title: "Track", description: "Operations teams track arrival flights continuously, matching driver staging with precise touchdown times to eliminate curbside delays." },
      { step: 3, title: "Meet", description: "Your private driver waits at the dedicated terminal arrivals hall greeting area, presenting a clear name board and managing passenger luggage." },
      { step: 4, title: "Ride", description: "Relax inside an air conditioned luxury vehicle while a licensed chauffeur navigates highway corridors directly to your destination." },
    ],
    terminalsEyebrow: "Terminal Coverage",
    terminalsHeading,
    terminalsIntro,
    terminals,
    terminalImage,
    terminalImageAlt,
    servicesEyebrow: "Comprehensive Transportation",
    servicesHeading,
    servicesIntro,
    servicesList,
    servicesOutro,
    faqsEyebrow: "Questions",
    faqsHeading,
    faqs,
    ctaHeading,
    ctaDescription,
    ctaPhone,
  };
}

const files = fs.readdirSync(dir).filter(f => f.endsWith(".md"));
const allData = files.map(parseFile);

console.log("=== PARSING COMPLETED ===");
for (const a of allData) {
  console.log(`- ${a.slug} (${a.iata}): services=${a.servicesList.length}, sampleTitle="${a.servicesList[0]?.title}"`);
}

// Generate src/lib/airports-data.ts
const outPath = path.resolve(process.cwd(), "src/lib/airports-data.ts");
const code = `// Auto-generated airport pages data from airports-md
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

export const AIRPORTS_DATA: Record<string, AirportPageData> = ${JSON.stringify(
  allData.reduce((acc, curr) => {
    acc[curr.slug] = curr;
    return acc;
  }, {} as Record<string, any>),
  null,
  2
)};

export const ALL_AIRPORTS = Object.values(AIRPORTS_DATA);

export function getAirportData(slug: string): AirportPageData | undefined {
  return AIRPORTS_DATA[slug] || ALL_AIRPORTS.find(a => a.iata.toLowerCase() === slug.toLowerCase() || a.slug.endsWith(slug.toLowerCase()));
}
`;

fs.writeFileSync(outPath, code, "utf-8");
console.log(`\nSuccessfully wrote: ${outPath} (${code.length} bytes)`);
