import "dotenv/config";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { corporateTemplate, eventTemplate } from "../src/components/services/Templates/Services/section-defaults";

async function syncServices() {
  console.log("=================================================================");
  console.log("AB Transportation — Synchronizing Services DB & Templates");
  console.log("=================================================================");

  const uri = process.env.MONGO_URI || process.env.MONGODB_URI || "mongodb+srv://mohsinreddragon260_db_user:vrlzo58zqDOVVneU@cluster0.gpfinl2.mongodb.net/ablimo-db?retryWrites=true&w=majority";
  const dbUri = uri.includes("/ablimo-db")
    ? uri
    : uri.split("?")[0].replace(/\/+$/, "") + "/ablimo-db" + (uri.includes("?") ? "?" + uri.split("?")[1] : "");

  console.log("Connecting to MongoDB Atlas...");
  await mongoose.connect(dbUri);
  const db = mongoose.connection.db;
  if (!db) {
    throw new Error("Failed to get MongoDB database instance.");
  }
  const servicesColl = db.collection("services");

  // 1. Update corporate-transportation
  console.log("\n[1/2] Updating 'corporate-transportation' in database...");
  const corpDoc = {
    slug: "corporate-transportation",
    title: "Corporate & Staff Transportation",
    subtitle:
      "Managed corporate transportation across Saudi Arabia, the UAE and Qatar: dedicated chauffeurs, staff routes, roadshows and visitor programmes. Get a proposal.",
    desc:
      "Managed corporate transportation across Saudi Arabia, the UAE and Qatar: dedicated chauffeurs, staff routes, roadshows and visitor programmes. Get a proposal.",
    heroImage: "/services/corporate-transportation.jpg",
    breadcrumb: "Corporate & Staff Transportation",
    features: [
      {
        icon: "UserTie",
        title: "Executive Chauffeur Programmes",
        desc: "On-call chauffeurs for leadership teams with vehicle class, preferences and security requirements agreed per executive.",
      },
      {
        icon: "ShieldCheck",
        title: "Dedicated Vehicles & Drivers",
        desc: "Assigned full-time to an executive or department with immediate replacement guarantee if one is off the road.",
      },
      {
        icon: "Bus",
        title: "Staff Shuttles & Daily Routes",
        desc: "Scheduled vans, minibuses or coaches between residential areas, offices and sites planned around shift times.",
      },
    ],
    cardsHeading: "Programmes we operate across the GCC",
    cardsDesc:
      "Five purpose-built transportation programmes designed to handle every organizational mobility demand under one operating agreement.",
    cards: [
      {
        image: "/services/executive-corporate-mobility.jpg",
        tag: "Executive",
        title: "Executive Chauffeur Programmes",
        desc: "On-call chauffeurs for leadership teams with vehicle class, preferences and security requirements agreed per executive.",
      },
      {
        image: "/services/corporate-transportation.jpg",
        tag: "Dedicated",
        title: "Dedicated Vehicles and Drivers",
        desc: "A chauffeur and vehicle assigned full-time. AB handles recruitment, vetting, payroll, relief cover and vehicle maintenance.",
      },
      {
        image: "/services/bus-coach-hire.jpg",
        tag: "Staff Routes",
        title: "Staff Shuttles and Daily Routes",
        desc: "Scheduled vans, minibuses or coaches between residential areas, offices and sites planned around shift times.",
      },
      {
        image: "/services/airport-transfers.jpg",
        tag: "Visitors",
        title: "Visitor and New-Joiner Programmes",
        desc: "Airport arrival, hotel, office and return for visiting executives, auditors, consultants and relocating staff.",
      },
      {
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
        tag: "Roadshows",
        title: "Roadshows and Multi-City Itineraries",
        desc: "Investor roadshows and site tours across Riyadh, Jeddah, Eastern Province, Dubai, Abu Dhabi and Doha.",
      },
    ],
    sections: [
      {
        image: "/services/corporate-transportation.jpg",
        imageAlt: "AB Operations Control Room",
        title: "How We Run It: 5-Stage Operation",
        paragraphs: [
          "When your executives, visitors and staff depend on getting somewhere on time every day, transportation becomes an operation in its own right.",
          "AB runs it for you: we plan the routes and vehicle mix, supply vetted chauffeurs and drivers, monitor every trip from our Riyadh control room, and report on what happened.",
        ],
        bullets: [
          { text: "1. Requirements review: Passenger groups, locations, hours, and service levels." },
          { text: "2. Programme design: Routes, vehicle classes, driver numbers, and standby cover." },
          { text: "3. Mobilisation: Vehicles prepared, drivers briefed on your sites and protocol." },
          { text: "4. Daily operation: Live tracking, dispatch changes and incident handling 24/7." },
          { text: "5. Monthly review: Usage, punctuality and cost by department." },
        ],
        imageSide: "left",
        dark: true,
      },
      {
        image: "/services/executive-corporate-mobility.jpg",
        imageAlt: "AB Chauffeur Standard",
        title: "Standards Written into Every Programme",
        paragraphs: [
          "Our service commitments are contractually codified into measurable SLAs. Every AB agreement guarantees four foundational standards.",
          "Commercial terms, rate cards, and consolidated billing are set out on Corporate Accounts.",
        ],
        bullets: [
          { text: "Chauffeurs licensed, background-checked and trained to the AB Chauffeur Standard." },
          { text: "Vehicles GPS-tracked, strictly late-model (< 36 months), cleaned and inspected daily." },
          { text: "Standby vehicles and relief drivers ready for each programme." },
          { text: "Incident reporting to your nominated contact within 15 minutes of an event." },
        ],
        imageSide: "right",
        dark: true,
      },
    ],
    faqs: [
      {
        q: "What is the difference between a dedicated driver and on-demand chauffeurs?",
        a: "A dedicated driver and vehicle are assigned to you full-time for an agreed period. On-demand chauffeurs are booked per trip or per hour from AB's pool.",
      },
      {
        q: "Who employs the drivers on a dedicated contract?",
        a: "AB does. We handle vetting, payroll, relief cover and regulatory compliance under our local operating licences.",
      },
      {
        q: "Can routes change as our headcount changes?",
        a: "Yes. Routes are reviewed monthly, or sooner on request as staff numbers or office locations shift.",
      },
      {
        q: "Do you cover more than one country under one contract?",
        a: "Yes, through licensed AB entities in Saudi Arabia (KSA), the UAE and Qatar, all governed under a single master framework agreement.",
      },
      {
        q: "How are incidents handled?",
        a: "The Riyadh control room manages incidents live 24/7, dispatches standby relief vehicles immediately, and sends a written report to your nominated contact within 15 minutes.",
      },
    ],
    ctaTitle: "Corporate transportation, managed end to end.",
    ctaDesc:
      "When your executives, visitors and staff depend on getting somewhere on time every day, transportation becomes an operation in its own right. Talk to AB today.",
    ctaLabel: "Request a corporate proposal",
    ctaHref: "#corporate-account",
    seo: {
      metaTitle: "Corporate & Staff Transportation in KSA, UAE & Qatar | AB",
      metaDescription:
        "Managed corporate transportation across Saudi Arabia, the UAE and Qatar: dedicated chauffeurs, staff routes, roadshows and visitor programmes. Get a proposal.",
      ogImage: "/services/corporate-transportation.jpg",
    },
    pageSections: corporateTemplate.sections,
    status: "published",
    showInMenu: true,
    updatedAt: new Date(),
  };

  const corpRes = await servicesColl.updateOne(
    { slug: "corporate-transportation" },
    { $set: corpDoc },
    { upsert: true }
  );
  console.log(`✓ Corporate Transportation updated (matched: ${corpRes.matchedCount}, modified: ${corpRes.modifiedCount})`);

  // 2. Update event-transportation
  console.log("\n[2/2] Updating 'event-transportation' in database...");
  const eventDoc = {
    slug: "event-transportation",
    title: "Event Transportation",
    subtitle:
      "Event transportation for conferences, exhibitions and festivals in Saudi Arabia and the GCC: fleet planning, shuttles, VIP pools and a live control room.",
    desc:
      "Event transportation for conferences, exhibitions and festivals in Saudi Arabia and the GCC: fleet planning, shuttles, VIP pools and a live control room.",
    heroImage: "/services/event-transportation.jpg",
    breadcrumb: "Event Transportation",
    features: [
      {
        icon: "FileText",
        title: "Operational Movement Plan",
        desc: "Turnkey passenger schedule detailing routes, vehicle counts by hour, loading zones, and standby contingency fleet.",
      },
      {
        icon: "Radio",
        title: "Live Operations Command",
        desc: "24/7 central control room monitoring active flight telemetry, GPS manifests, and coordinating on-site marshals.",
      },
      {
        icon: "Crown",
        title: "VIP Pools & Venue Shuttles",
        desc: "Dedicated late-model luxury saloons for keynote speakers alongside high-frequency delegate shuttle loops.",
      },
    ],
    cardsHeading: "What we deliver",
    cardsDesc:
      "A comprehensive operational framework ensuring flawless arrivals, frictionless venue movements, and coordinated departures.",
    cards: [
      {
        image: "/services/event-transportation.jpg",
        tag: "Planning",
        title: "Written Transport Plan",
        desc: "Passenger groups, vehicle numbers by hour, loading zones, and standby contingency rules approved before the event.",
      },
      {
        image: "/services/airport-transfers.jpg",
        tag: "Airports",
        title: "Arrivals & Departures",
        desc: "Airport meet-and-greet desks with live flight tracking and hotel transfers scheduled back from flight departure times.",
      },
      {
        image: "/services/bus-coach-hire.jpg",
        tag: "Shuttles",
        title: "Venue Shuttle Loops",
        desc: "Timed loops between hotels and event venues, with frequency adjusted in real time from the command centre.",
      },
      {
        image: "/services/executive-corporate-mobility.jpg",
        tag: "VIPs",
        title: "VIP & Speaker Cars",
        desc: "Executive sedans and luxury SUVs with chauffeurs briefed on protocol, security clearances, and venue access gates.",
      },
      {
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
        tag: "Production",
        title: "Artist, Crew & Production Transport",
        desc: "Vans and minibuses for production teams, artists, and media crews scheduled around call times and rehearsals.",
      },
      {
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
        tag: "On-Site",
        title: "On-Site Coordination",
        desc: "Transport coordinators at hotels, venues, and airports managing accreditation, loading bays, and traffic flow.",
      },
      {
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        tag: "Reporting",
        title: "Post-Event Reporting",
        desc: "Comprehensive passenger volume data, vehicle utilisation stats, on-time performance against plan, and debrief notes.",
      },
    ],
    sections: [
      {
        image: "/services/event-transportation.jpg",
        imageAlt: "Event Transport Control Room",
        title: "How We Plan Your Event",
        paragraphs: [
          "Guests remember the first hour and the last hour of an event, and both usually happen in a vehicle. AB plans and runs every movement around your event: airport arrivals, hotel shuttles, VIP cars, speaker and artist transfers, staff transport and the departure wave.",
          "Everything is coordinated from one control room, with our team on site.",
        ],
        bullets: [
          { text: "1. Brief call: Dates, venues, guest profile, numbers, and non-negotiables." },
          { text: "2. Draft plan and quote: Vehicle schedule, staffing, and price within agreed working days." },
          { text: "3. Site visits: Venues, hotels and airport routes walked and timed." },
          { text: "4. Rehearsal day: Drivers briefed and routes driven before guests arrive." },
          { text: "5. Live operation: Control room and on-site coordinators run the plan." },
          { text: "6. Debrief: Detailed post-event report and lessons learned." },
        ],
        imageSide: "right",
        dark: true,
      },
      {
        image: "/services/bus-coach-hire.jpg",
        imageAlt: "On-Site Event Marshalling",
        title: "What We Deliver: Flawless Movement",
        paragraphs: [
          "The success of an event hinges on how smoothly guests arrive, move, and depart. AB turns transport into an invisible, friction-free operation.",
          "From the first airport pickup to the final shuttle wave of the evening, every movement is orchestrated by our command team.",
        ],
        bullets: [
          { text: "Written transport plan covering loading zones, routes, timings and standby fleet." },
          { text: "Airport meet-and-greet desks with real-time flight tracking for every guest." },
          { text: "Timed shuttle loops between official hotels and venues with live frequency adjustments." },
          { text: "Dedicated VIP chauffeur pools for keynote speakers, dignitaries, and artists." },
          { text: "On-site transport coordinators liaising with security and venue management." },
          { text: "Post-event report with passenger throughput, vehicle utilisation, and on-time stats." },
        ],
        imageSide: "left",
        dark: true,
      },
    ],
    faqs: [
      {
        q: "How far in advance should we contact you?",
        a: "For major conferences and large-scale gatherings over 500 delegates, we recommend initiating planning 8–12 weeks ahead to secure optimal fleet allocations and coordinate venue permits. Smaller VIP pools and board offsites can be mobilised on accelerated timelines where fleet capacity permits.",
      },
      {
        q: "Can you work with our venue's security and accreditation process?",
        a: "Yes. Our on-site transport coordinators liaise directly with venue management, local authorities, and private security details to handle vehicle access passes, security manifests, secure loading bays, and VIP drop-off protocols.",
      },
      {
        q: "What happens if a flight is delayed or a session overruns?",
        a: "Our centralized event control room tracks incoming flights live and monitors venue agendas in real time. We automatically adjust chauffeur dispatch schedules and maintain dedicated standby vehicles to absorb unexpected delays without guest disruption.",
      },
      {
        q: "Do you provide branded vehicles or signage?",
        a: "Yes. Upon request, we provide discrete co-branded vehicle decals, digital airport meet-and-greet signage, branded vehicle headrest covers, and uniformed dispatch staff aligned with your event brand identity.",
      },
      {
        q: "Can you supply buses and VIP cars under one contract?",
        a: "Yes. We consolidate luxury sedans, VIP MPVs, crew vans, and 50-passenger executive motorcoaches under a single master movement plan, one dedicated on-site command structure, and a unified commercial invoice.",
      },
      {
        q: "Do you provide transport reports for sponsors or authorities?",
        a: "Yes. Following the event, our control room provides comprehensive data reports detailing passenger throughput, peak-hour movements, vehicle utilisation, on-time performance against plan, and safety audits.",
      },
    ],
    ctaTitle: "Event transportation, planned like an operation.",
    ctaDesc:
      "Guests remember the first hour and the last hour of an event. Coordinate your arrivals, venue shuttles, VIP pools and departure waves with our dedicated event control room.",
    ctaLabel: "Plan event transport",
    ctaHref: "#event-brief",
    seo: {
      metaTitle: "Event & Conference Transportation in the GCC | AB",
      metaDescription:
        "Event transportation for conferences, exhibitions and festivals in Saudi Arabia and the GCC: fleet planning, shuttles, VIP pools and a live control room.",
      ogImage: "/services/event-transportation.jpg",
    },
    pageSections: eventTemplate.sections,
    status: "published",
    showInMenu: true,
    updatedAt: new Date(),
  };

  const eventRes = await servicesColl.updateOne(
    { slug: "event-transportation" },
    { $set: eventDoc },
    { upsert: true }
  );
  console.log(`✓ Event Transportation updated (matched: ${eventRes.matchedCount}, modified: ${eventRes.modifiedCount})`);

  // 3. Update dumped_services.json
  console.log("\n[3/3] Updating local dumped_services.json snapshot...");
  const dumpedPath = path.resolve("scripts/dumped_services.json");
  if (fs.existsSync(dumpedPath)) {
    const dumpedList: any[] = JSON.parse(fs.readFileSync(dumpedPath, "utf8"));
    const corpIdx = dumpedList.findIndex((d) => d.slug === "corporate-transportation");
    if (corpIdx !== -1) {
      dumpedList[corpIdx] = { ...dumpedList[corpIdx], ...corpDoc };
    }
    const eventIdx = dumpedList.findIndex((d) => d.slug === "event-transportation");
    if (eventIdx !== -1) {
      dumpedList[eventIdx] = { ...dumpedList[eventIdx], ...eventDoc };
    }
    fs.writeFileSync(dumpedPath, JSON.stringify(dumpedList, null, 2), "utf8");
    console.log("✓ scripts/dumped_services.json updated successfully.");
  }

  await mongoose.disconnect();
  console.log("\n✓ All services synchronized in database and templates successfully!");
}

syncServices().catch((err) => {
  console.error("Error syncing services:", err);
  process.exit(1);
});

