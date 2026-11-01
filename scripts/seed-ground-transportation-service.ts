import * as dotenv from "dotenv";
import * as path from "path";
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import mongoose from "mongoose";
import { Service } from "../src/lib/models/Service";
import { groundTransportationTemplate } from "../src/components/services/Templates/Services/section-defaults";

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI not found in environment");
  }

  console.log("Connecting to MongoDB...");
  await mongoose.connect(uri, {
    dbName: "ablimo-db",
  });
  console.log("Connected to MongoDB!");

  const slug = "ground-transportation";
  const title = "Comprehensive Ground Transportation";
  const subtitle = "Complete transportation solutions for individuals and businesses across the Gulf region and worldwide.";
  const desc = "Comprehensive ground transportation across Saudi Arabia, UAE, and GCC: airport transfers, executive chauffeur, corporate travel, and event mobility.";
  const heroImage = "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&h=800&fit=crop";

  const updateDoc = {
    slug,
    title,
    subtitle,
    desc,
    heroImage,
    breadcrumb: "Ground Transportation",
    features: [
      {
        icon: "Plane",
        title: "Airport Transfers with Flight Monitoring",
        desc: "Real-time radar flight tracking, terminal meet & greet, luggage handling, and generous complimentary waiting time.",
      },
      {
        icon: "Briefcase",
        title: "Corporate Accounts with Centralized Billing",
        desc: "Streamlined corporate accounts with consolidated monthly invoicing, cost-center reporting, and dedicated account support.",
      },
      {
        icon: "Globe",
        title: "Event & Intercity Mobility Logistics",
        desc: "Scalable group transportation, VIP chauffeur motorcades, and direct long-distance city-to-city transfers across the GCC.",
      },
    ],
    cardsHeading: "Comprehensive Ground Mobility",
    cardsDesc: "Explore our full suite of ground transportation services tailored for executives, visitors, and groups.",
    cards: [
      {
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=500&fit=crop",
        tag: "Airports",
        title: "Airport Ground Transfers",
        desc: "Guaranteed on-time arrivals and departures with real-time flight tracking and personalized chauffeur greeting.",
      },
      {
        image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&h=500&fit=crop",
        tag: "Executive",
        title: "Executive & Chauffeur Mobility",
        desc: "Punctual, discreet chauffeur mobility for corporate leadership teams, roadshows, and board meetings.",
      },
      {
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=500&fit=crop",
        tag: "Intercity",
        title: "City-to-City Intercity Travel",
        desc: "Stress-free, comfortable long-distance chauffeured travel connecting primary business hubs across the GCC.",
      },
    ],
    sections: [
      {
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
        imageAlt: "Comprehensive Ground Transportation",
        title: "Your Comprehensive Ground Transportation",
        paragraphs: [
          "AB provides end-to-end ground transportation solutions tailored to your needs. Whether you're an individual traveler, a corporate client, or organizing a large event, our comprehensive service covers every aspect of your journey.",
          "With an executive black fleet under 36 months old and professional chauffeurs coordinated via our 24/7 central control room, every journey meets the highest standards of safety, privacy, and punctuality.",
        ],
        bullets: [
          { text: "Airport transfers with flight monitoring" },
          { text: "Corporate accounts with centralized billing" },
          { text: "Event and group transportation" },
          { text: "City-to-city long distance travel" },
        ],
        imageSide: "left",
        dark: true,
      },
      {
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=600&fit=crop",
        imageAlt: "Personal Chauffeur",
        title: "Your Personal Chauffeur",
        paragraphs: [
          "Every journey with AB includes a dedicated professional chauffeur. Our drivers are more than just transportation providers — they are your personal concierge on the road, ensuring your comfort and safety throughout the journey.",
        ],
        bullets: [
          { text: "Professionally trained and licensed drivers" },
          { text: "Multilingual communication skills" },
          { text: "Local knowledge and route expertise" },
        ],
        imageSide: "right",
        dark: false,
      },
    ],
    faqs: [
      {
        q: "What services are included under ground transportation?",
        a: "Our ground transportation covers airport transfers, hourly chauffeur hire, city-to-city journeys, corporate employee mobility, event delegate transport, and VIP motorcades.",
      },
      {
        q: "How does flight tracking work for airport ground transfers?",
        a: "Our control room tracks incoming flights live. If your flight is delayed or arrives early, your chauffeur's pickup schedule automatically adjusts, with up to 60 minutes complimentary wait time.",
      },
      {
        q: "Can businesses open a corporate account?",
        a: "Yes. Corporate accounts receive consolidated monthly invoicing, cost-center allocation, priority dispatch, and dedicated account manager support.",
      },
      {
        q: "Which vehicles are available?",
        a: "Our fleet includes luxury executive sedans, premium full-size SUVs, and executive vans such as Mercedes S-Class, BMW 7 Series, Cadillac Escalade, and Mercedes V-Class.",
      },
    ],
    ctaTitle: "Ready for comprehensive ground transportation?",
    ctaDesc: "Experience seamless transportation solutions with AB. Book your journey today.",
    ctaLabel: "Book Now",
    ctaHref: "/contact",
    pageSections: groundTransportationTemplate.sections,
    seo: {
      metaTitle: "Comprehensive Ground Transportation | AB",
      metaDescription: "Complete ground transportation solutions for individuals, corporate teams, and events across the GCC and worldwide.",
      ogImage: heroImage,
    },
    status: "published",
    showInMenu: true,
    order: 6,
    locale: "en",
  };

  const res = await Service.findOneAndUpdate(
    { slug },
    { $set: updateDoc },
    { upsert: true, new: true }
  );

  console.log(`Successfully upserted service "${slug}" with ID: ${res._id}`);
  console.log(`Sections count: ${res.pageSections?.length}`);
  console.log(`Status: ${res.status}`);

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB.");
}

main().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});

