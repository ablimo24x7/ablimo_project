"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { type Locale, localeBase, localeHome } from "@/app/[lang]/dictionaries";

interface AboutPageClientProps {
  lang: Locale;
}

export default function AboutPageClient({ lang }: AboutPageClientProps) {
  const homeHref = localeHome(lang);
  const baseHref = localeBase(lang);

  // Scroll reveal observer
  useEffect(() => {
    const reveals = document.querySelectorAll(".abx-reveal");
    if (!("IntersectionObserver" in window)) {
      reveals.forEach((el) => {
        el.classList.add("is-in");
        el.setAttribute("data-revealed", "true");
      });
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            entry.target.setAttribute("data-revealed", "true");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => {
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Spotlight mousemove for .abx-tile
  const handleTileMouseMove = (e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  // Subnav Scrollspy & Reading Progress
  const [activeSection, setActiveSection] = useState<string>("story");
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const subnavRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const sectionIds = ["story", "purpose", "values", "history", "teams", "standard", "offices", "faq"];
    const handleScroll = () => {
      const scrollY = window.scrollY + 180;
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) {
          current = id;
        }
      }
      setActiveSection(current);

      const firstEl = document.getElementById("story");
      const lastEl = document.getElementById("work");
      if (firstEl && lastEl) {
        const totalHeight = lastEl.offsetTop + lastEl.offsetHeight - firstEl.offsetTop - window.innerHeight;
        const currentProgress = Math.max(0, Math.min(1, (window.scrollY - firstEl.offsetTop + 200) / totalHeight));
        setScrollProgress(currentProgress * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scale switcher state
  const [scaleTab, setScaleTab] = useState<number>(0);

  // Purpose tabs state
  const [purposeTab, setPurposeTab] = useState<number>(0);

  // Timeline state
  const [timelineIndex, setTimelineIndex] = useState<number>(0);
  const [isTimelinePlaying, setIsTimelinePlaying] = useState<boolean>(true);
  const [timelinePausedByHover, setTimelinePausedByHover] = useState<boolean>(false);

  const timelineMilestones = [
    {
      year: "2002",
      title: "Foundation",
      desc: "Al Badiah Trading and Contracting Company was established in Saudi Arabia.",
      location: "Saudi Arabia",
      icon: "fa-seedling",
      label: "Foundation",
    },
    {
      year: "2010",
      title: "Entry into chauffeur transportation",
      desc: "The Al Badiah Group adds transportation to its activities, beginning with private chauffeur services.",
      location: "Saudi Arabia",
      icon: "fa-car-side",
      label: "Chauffeur services",
    },
    {
      year: "2020",
      title: "An independent company",
      desc: "AB separates from Al Badiah Trading and becomes an independently registered company focused entirely on ground transportation.",
      location: "Riyadh",
      icon: "fa-building-flag",
      label: "Independent company",
    },
    {
      year: "2022",
      title: "Expansion into Qatar",
      desc: "AB opens its office in Doha to serve the events sector and provide chauffeur services to corporate clients.",
      location: "Doha",
      icon: "fa-earth-asia",
      label: "Qatar",
    },
    {
      year: "2022",
      title: "Entry into the UAE",
      desc: "AB registers its office in Dubai and extends its services to the UAE travel and tourism sector.",
      location: "Dubai",
      icon: "fa-city",
      label: "UAE",
    },
    {
      year: "2024",
      title: "A second UAE office",
      desc: "AB opens an office in Abu Dhabi, growing its presence and services across the UAE.",
      location: "Abu Dhabi",
      icon: "fa-building",
      label: "Abu Dhabi",
    },
    {
      year: "2024",
      title: "Global Passenger Network",
      desc: "AB joins the Global Passenger Network as its exclusive member from Saudi Arabia and the United Arab Emirates.",
      location: "Saudi Arabia & UAE",
      icon: "fa-globe",
      label: "GPN member",
    },
    {
      year: "2026",
      title: "Expansion into India",
      desc: "AB establishes its first company in Chennai, bringing its services to the Indian market. Chennai also serves as one of the group's support offices.",
      location: "Chennai",
      icon: "fa-plane-departure",
      label: "India",
    },
  ];

  useEffect(() => {
    if (!isTimelinePlaying || timelinePausedByHover) return;
    const timer = setTimeout(() => {
      setTimelineIndex((prev) => (prev + 1) % timelineMilestones.length);
    }, 6000);
    return () => clearTimeout(timer);
  }, [timelineIndex, isTimelinePlaying, timelinePausedByHover, timelineMilestones.length]);

  // Teams Hub state
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);

  const teamsData = [
    {
      icon: "fa-route",
      title: "Operations",
      sub: "Routes & schedules",
      desc: "Plans routes and vehicle and chauffeur schedules.",
    },
    {
      icon: "fa-tower-broadcast",
      title: "Dispatch",
      sub: "24/7 control rooms",
      desc: "Runs the 24/7 control room in each country, assigns vehicles and handles live changes.",
    },
    {
      icon: "fa-screwdriver-wrench",
      title: "Fleet management",
      sub: "Maintain & replace",
      desc: "Maintains, inspects and replaces vehicles.",
    },
    {
      icon: "fa-id-card",
      title: "Driver management",
      sub: "Recruit, vet & train",
      desc: "Recruits, vets, trains and schedules chauffeurs and drivers.",
    },
    {
      icon: "fa-clipboard-check",
      title: "Quality assurance",
      sub: "Audit & investigate",
      desc: "Audits service delivery and investigates incidents.",
    },
    {
      icon: "fa-comments",
      title: "Customer experience",
      sub: "Your point of contact",
      desc: "The point of contact for clients, bookers and passengers.",
    },
  ];

  const currentHubData =
    selectedTeam !== null
      ? teamsData[selectedTeam]
      : {
          icon: "fa-microchip",
          title: "AB trip & fleet technology",
          desc: "Connects all six teams, giving clients live tracking and trip-level reporting.",
        };

  // The AB Standard Accordion State
  const [standardOpenIndex, setStandardOpenIndex] = useState<number>(0);

  const standardItems = [
    {
      num: "01",
      title: "Licensed and fully compliant",
      img: "/Team_Meet.jpeg",
      alt: "AB team",
      content: (
        <>
          <p>
            We operate under the licensing and permit requirements of the transport authorities in each market we serve: TGA in
            Saudi Arabia, RTA in Dubai, ITC in Abu Dhabi and the Ministry of Transport in Qatar.
          </p>
          <ul className="abx-ticks">
            <li>Every vehicle carries valid registration, insurance and operating permits</li>
            <li>Every chauffeur holds the professional licenses and driver cards required locally</li>
            <li>Renewals are tracked centrally, so nothing on the road is ever out of compliance</li>
          </ul>
        </>
      ),
    },
    {
      num: "02",
      title: "The vehicle standard",
      img: "/about/about-img-2.jpg",
      alt: "AB chauffeurs with executive vehicles",
      content: (
        <>
          <p>
            A modern, well-specified fleet. Vehicles stay in service only up to a set age and mileage limit, then they are
            replaced.
          </p>
          <ul className="abx-ticks">
            <li>
              <b>Multi-point inspection</b> before every assignment: brakes, tires, lights and fluids; air conditioning and cabin
              comfort; seatbelts, first-aid kit and fire extinguisher; interior and exterior cleanliness
            </li>
            <li>
              <b>Planned maintenance</b> on manufacturer schedules at authorised centres, every service recorded digitally
            </li>
            <li>
              <b>Presentation:</b> cleaned and prepared before each trip, with bottled water, phone chargers and Wi-Fi on request
            </li>
            <li>
              <b>Technology on board:</b> GPS tracking connected to our 24/7 control rooms
            </li>
          </ul>
        </>
      ),
    },
    {
      num: "03",
      title: "The chauffeur standard",
      img: "/about/about-img-3.jpg",
      alt: "AB chauffeur briefing",
      content: (
        <>
          <p>
            Every chauffeur passes background and security checks, document verification, a driving history review and a medical
            fitness check before joining AB, and holds the licenses required by TGA, RTA, ITC or MOT.
          </p>
          <ul className="abx-chips abx-chips-static abx-chips-sm">
            <li>
              <i className="fa-solid fa-shield-halved"></i>Defensive & safe driving
            </li>
            <li>
              <i className="fa-solid fa-user-tie"></i>VIP & protocol etiquette
            </li>
            <li>
              <i className="fa-solid fa-comments"></i>Customer service
            </li>
            <li>
              <i className="fa-solid fa-map"></i>Route & airport procedures
            </li>
            <li>
              <i className="fa-solid fa-kit-medical"></i>Emergency & incident response
            </li>
          </ul>
          <ul className="abx-ticks">
            <li>Refresher training every 6 months and before every major event</li>
            <li>Set uniform, grooming standards, code of conduct and strict confidentiality</li>
            <li>Working-hour limits and mandatory rest periods, including on multi-day events</li>
          </ul>
        </>
      ),
    },
    {
      num: "04",
      title: "Operational control",
      img: "/about/about-img-4.jpg",
      alt: "AB operations planning session",
      content: (
        <ul className="abx-ticks">
          <li>24/7 control rooms in Riyadh, Dubai and Doha</li>
          <li>Real-time monitoring of vehicle location, speed and trip status</li>
          <li>Proactive alerts for delays, route changes and flight updates</li>
          <li>Backup vehicles and chauffeurs on standby for every major operation</li>
          <li>Dedicated on-site coordinators for events, delegations and roadshows</li>
        </ul>
      ),
    },
    {
      num: "05",
      title: "Continuous quality assurance",
      img: "/about/about-img-5.jpg",
      alt: "AB chauffeurs and fleet on assignment",
      content: (
        <ul className="abx-ticks">
          <li>
            <b>Audits:</b> regular vehicle and chauffeur audits by our Quality Assurance team
          </li>
          <li>
            <b>Performance tracking:</b> on-time performance, incident rates and client satisfaction measured across every
            operation
          </li>
          <li>
            <b>Client feedback:</b> collected after assignments and reviewed by management
          </li>
          <li>
            <b>Incident management:</b> clear reporting, investigation and corrective action
          </li>
          <li>
            <b>Continuous improvement:</b> lessons from every major event feed back into our standards
          </li>
        </ul>
      ),
    },
  ];

  // Offices Network Map state
  const [selectedOffice, setSelectedOffice] = useState<number>(0);

  const officesData = [
    {
      name: "Riyadh",
      tag: "HQ · 24/7 control room",
      addr: "Malaz, Umar Ibn Abdulaziz Road, Building 59, 2nd Floor, Riyadh 12626, Saudi Arabia",
      mapQuery: "Umar+Ibn+Abdulaziz+Road+Malaz+Riyadh",
      isHq: true,
      isSupport: false,
      pinX: 94,
      pinY: 226,
      labelX: 0,
      labelY: 30,
      textAnchor: "middle",
    },
    {
      name: "Doha",
      tag: "Office · 24/7 control room",
      addr: "Street 830, Al Rufaa, Building 54, Zone 17, Doha, Qatar",
      mapQuery: "Al+Rufaa+Zone+17+Doha",
      isHq: false,
      isSupport: false,
      pinX: 191,
      pinY: 214,
      labelX: 0,
      labelY: -14,
      textAnchor: "middle",
    },
    {
      name: "Dubai",
      tag: "Office · 24/7 control room",
      addr: "Al Khabaisi, Deira, Suite 206, DBC Building, Dubai, UAE",
      mapQuery: "DBC+Building+Al+Khabaisi+Deira+Dubai",
      isHq: false,
      isSupport: false,
      pinX: 265,
      pinY: 216,
      labelX: 12,
      labelY: -10,
      textAnchor: "start",
    },
    {
      name: "Abu Dhabi",
      tag: "Office",
      addr: "Mohammed Bin Zayed City, Office 3, Building C57, Abu Dhabi, UAE",
      mapQuery: "Mohammed+Bin+Zayed+City+Abu+Dhabi",
      isHq: false,
      isSupport: false,
      pinX: 248,
      pinY: 231,
      labelX: 0,
      labelY: 26,
      textAnchor: "middle",
    },
    {
      name: "Islamabad",
      tag: "Support centre",
      addr: "Round-the-clock planning and operational support for the group.",
      mapQuery: null,
      isHq: false,
      isSupport: true,
      pinX: 621,
      pinY: 46,
      labelX: 0,
      labelY: 26,
      textAnchor: "middle",
    },
    {
      name: "Chennai",
      tag: "India company · Support centre",
      addr: "AB's first company in India (2026) and one of the group's support offices.",
      mapQuery: null,
      isHq: false,
      isSupport: true,
      pinX: 765,
      pinY: 458,
      labelX: 0,
      labelY: 26,
      textAnchor: "middle",
    },
  ];

  // FAQ Accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Where is AB headquartered?",
      a: "In Riyadh, Saudi Arabia, with offices in Dubai, Abu Dhabi and Doha.",
    },
    {
      q: "Which countries does AB operate in?",
      a: "AB operates across Saudi Arabia, the UAE and Qatar and the wider GCC, and has a growing presence in India through its company in Chennai.",
    },
    {
      q: "Why does my contract or invoice show a different company name?",
      a: "AB operates through a locally registered company in each country. Your contract and invoices carry the legal name of the AB company in your country.",
    },
    {
      q: "Is AB licensed in each market?",
      a: "Yes. We operate under the licensing and permit requirements of the Transport General Authority (TGA) in Saudi Arabia, the Roads and Transport Authority (RTA) in Dubai, the Integrated Transport Centre (ITC) in Abu Dhabi and the Ministry of Transport (MOT) in Qatar.",
    },
    {
      q: "Are journeys monitored around the clock?",
      a: "Yes. Our 24/7 control rooms in Riyadh, Dubai and Doha monitor every journey and coordinate dispatch in real time, supported by our centres in Chennai and Islamabad.",
    },
  ];

  return (
    <div className="bg-abBlack text-gray-300">
      {/* ======================= ABOUT HERO ======================= */}
      <section className="abx-ab-hero border-b border-gray-900 relative overflow-hidden bg-abBlack">
        <div className="abx-ab-hero-bg" aria-hidden="true"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 relative">
          <nav className="abx-crumbs" aria-label="Breadcrumb">
            <Link href={homeHref}>Home</Link>
            <i className="fa-solid fa-chevron-right"></i>
            <span aria-current="page">About AB</span>
          </nav>
          <div className="abx-ab-hero-grid">
            <div>
              <div className="inline-flex items-center space-x-2 py-1.5 px-4 rounded-full bg-abDarkGray border border-abBlue/30 mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-abBlue animate-pulse"></span>
                <span className="text-abBlue text-xs font-bold tracking-widest uppercase">
                  Riyadh · Dubai · Abu Dhabi · Doha
                </span>
              </div>
              <h1 className="abx-ab-h1">
                About <span className="text-abBlue">AB</span>
              </h1>
              <p className="abx-ab-lead">
                AB is a premium chauffeur and ground transportation partner, headquartered in Riyadh with offices in Dubai,
                Abu Dhabi and Doha. We provide tailored mobility for businesses, government entities and diplomatic missions, and
                for the organizers of major sporting events, live entertainment, festivals, conferences and exhibitions across
                Saudi Arabia, the UAE, Qatar and the wider GCC.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href={`${baseHref}/contact`} className="abx-btn abx-btn-lg">
                  Request a proposal <i className="fa-solid fa-arrow-right"></i>
                </Link>
                <a href="#teams" className="abx-btn-ghost">
                  See how we work
                </a>
              </div>
            </div>
            <aside className="abx-live-card" aria-label="AB control rooms">
              <p className="abx-live-card-title">
                <span className="abx-live-dot"></span>24/7 control rooms
              </p>
              <ul className="abx-live-list">
                <li>
                  <span>Riyadh</span>
                  <small>Headquarters</small>
                  <b>Live</b>
                </li>
                <li>
                  <span>Dubai</span>
                  <small>UAE</small>
                  <b>Live</b>
                </li>
                <li>
                  <span>Doha</span>
                  <small>Qatar</small>
                  <b>Live</b>
                </li>
              </ul>
              <p className="abx-live-card-sub">
                <i className="fa-solid fa-headset"></i> Support centres in Chennai and Islamabad provide round-the-clock
                planning and operational support.
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* ======================= IN-PAGE NAV ======================= */}
      <nav className="abx-subnav" aria-label="On this page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul ref={subnavRef}>
            {[
              { id: "story", label: "Who we are" },
              { id: "purpose", label: "Vision & mission" },
              { id: "values", label: "Values" },
              { id: "history", label: "History" },
              { id: "teams", label: "How we work" },
              { id: "standard", label: "The AB Standard" },
              { id: "offices", label: "Offices" },
              { id: "faq", label: "FAQs" },
            ].map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={activeSection === link.id ? "is-active" : ""}
                  onClick={() => setActiveSection(link.id)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <span className="abx-subnav-bar" aria-hidden="true">
            <span style={{ width: `${scrollProgress}%` }}></span>
          </span>
        </div>
      </nav>

      {/* ======================= WHO WE ARE / WHAT WE DO ======================= */}
      <section id="story" className="py-24 bg-abDarkGray border-b border-gray-900 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="abx-story">
            <div className="abx-reveal is-in" data-revealed="true">
              <p className="text-sm font-bold tracking-widest text-abBlue uppercase mb-3">What we do</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                We move people for organizations that cannot afford a missed pickup.
              </h2>
              <p className="abx-p">
                Our services range from executive and diplomatic chauffeur services, VIP mobility and airport transfers to
                corporate and workforce transportation, delegation movements, artist and crew transfers, and large-scale bus and
                coach operations.
              </p>
              <ul className="abx-chips abx-chips-static">
                <li>
                  <i className="fa-solid fa-user-tie"></i>Executive & diplomatic chauffeurs
                </li>
                <li>
                  <i className="fa-solid fa-crown"></i>VIP mobility
                </li>
                <li>
                  <i className="fa-solid fa-plane-arrival"></i>Airport transfers
                </li>
                <li>
                  <i className="fa-solid fa-building"></i>Corporate & workforce transport
                </li>
                <li>
                  <i className="fa-solid fa-flag"></i>Delegation movements
                </li>
                <li>
                  <i className="fa-solid fa-music"></i>Artist & crew transfers
                </li>
                <li>
                  <i className="fa-solid fa-bus"></i>Bus & coach operations
                </li>
              </ul>
              <blockquote className="abx-quote">
                At AB, every journey is managed with the care, discretion and reliability our clients expect.
              </blockquote>
            </div>

            {/* Scale switcher */}
            <div className={`abx-scale abx-reveal is-in ${scaleTab === 1 ? "is-1" : ""}`} data-revealed="true">
              <div className="abx-scale-toggle" role="tablist" aria-label="Scale of assignment">
                <button
                  type="button"
                  role="tab"
                  className={scaleTab === 0 ? "is-active" : ""}
                  aria-selected={scaleTab === 0}
                  onClick={() => setScaleTab(0)}
                >
                  One chauffeur
                </button>
                <button
                  type="button"
                  role="tab"
                  className={scaleTab === 1 ? "is-active" : ""}
                  aria-selected={scaleTab === 1}
                  onClick={() => setScaleTab(1)}
                >
                  A full event fleet
                </button>
                <span className="abx-scale-pill" aria-hidden="true"></span>
              </div>
              <div className="abx-scale-stage">
                <figure className={`abx-scale-slide ${scaleTab === 0 ? "is-active" : ""}`}>
                  <Image
                    src="/Team_Meet.jpeg"
                    alt="AB chauffeur team"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <figcaption>
                    <span className="abx-scale-kicker">Some days</span>
                    One chauffeur meeting a minister at the airport. Discreet, single-vehicle executive travel.
                  </figcaption>
                </figure>
                <figure className={`abx-scale-slide ${scaleTab === 1 ? "is-active" : ""}`}>
                  <Image
                    src="/about/about-img-1.jpg"
                    alt="AB drivers at a pre-event briefing"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <figcaption>
                    <span className="abx-scale-kicker">Other days</span>
                    A fleet of coaches and VIP cars running to a timetable for a week-long event across multiple locations.
                  </figcaption>
                </figure>
              </div>
              <p className="abx-scale-foot">
                <i className="fa-solid fa-equals"></i> Both get the same planning discipline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= AT A GLANCE ======================= */}
      <section id="glance" className="py-24 bg-[#0a0a0a] border-b border-gray-900 relative z-20 overflow-hidden">
        <div className="abx-ind-glow" aria-hidden="true"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="abx-glance">
            <div className="abx-reveal is-in" data-revealed="true">
              <p className="text-sm font-bold tracking-widest text-abBlue uppercase mb-3">AB at a glance</p>
              <p className="abx-glance-quote">
                At AB, we are not just in the business of transportation; we are in the business of{" "}
                <span className="text-abBlue">enhancing experiences.</span>
              </p>
              <p className="abx-p">
                Whether it&apos;s the thrill of the game, the magic of live entertainment, or the serenity of a private tour,
                we&apos;re here to take you there in style and comfort.
              </p>
            </div>
            <div className="abx-counters abx-counters-2 abx-reveal is-in" data-revealed="true">
              <div className="abx-counter">
                <b>
                  <span>2002</span>
                </b>
                <small>Founded in Saudi Arabia</small>
              </div>
              <div className="abx-counter">
                <b>
                  <span>4</span>
                </b>
                <small>Regional offices: Riyadh, Dubai, Abu Dhabi, Doha</small>
              </div>
              <div className="abx-counter">
                <b>
                  <span>3</span>
                </b>
                <small>Control rooms running 24/7</small>
              </div>
              <div className="abx-counter">
                <b>
                  <span>2</span>
                </b>
                <small>Support centres: Chennai & Islamabad</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= PHILOSOPHY / VISION / MISSION ======================= */}
      <section id="purpose" className="py-24 bg-abBlack border-b border-gray-900 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="abx-head abx-reveal is-in" data-revealed="true">
            <div>
              <p className="text-sm font-bold tracking-widest text-abBlue uppercase mb-3">Why we exist</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Philosophy, vision and mission</h2>
            </div>
            <p className="abx-head-note">Three statements that shape every brief we accept and every journey we run.</p>
          </div>
          <div className="abx-purpose abx-reveal is-in" data-revealed="true">
            <div className="abx-purpose-tabs" role="tablist" aria-label="Philosophy, vision and mission">
              <button
                type="button"
                role="tab"
                className={`abx-purpose-tab ${purposeTab === 0 ? "is-active" : ""}`}
                aria-selected={purposeTab === 0}
                onClick={() => setPurposeTab(0)}
              >
                <span className="abx-purpose-ico">
                  <i className="fa-solid fa-compass"></i>
                </span>
                <span>
                  <strong>Our philosophy</strong>
                  <small>What we stand for</small>
                </span>
              </button>
              <button
                type="button"
                role="tab"
                className={`abx-purpose-tab ${purposeTab === 1 ? "is-active" : ""}`}
                aria-selected={purposeTab === 1}
                onClick={() => setPurposeTab(1)}
              >
                <span className="abx-purpose-ico">
                  <i className="fa-solid fa-eye"></i>
                </span>
                <span>
                  <strong>Vision</strong>
                  <small>Where we are going</small>
                </span>
              </button>
              <button
                type="button"
                role="tab"
                className={`abx-purpose-tab ${purposeTab === 2 ? "is-active" : ""}`}
                aria-selected={purposeTab === 2}
                onClick={() => setPurposeTab(2)}
              >
                <span className="abx-purpose-ico">
                  <i className="fa-solid fa-bullseye"></i>
                </span>
                <span>
                  <strong>Mission</strong>
                  <small>What we do every day</small>
                </span>
              </button>
            </div>
            <div className="abx-purpose-panels">
              {purposeTab === 0 && (
                <div className="abx-purpose-panel" role="tabpanel">
                  <span className="abx-purpose-mark" aria-hidden="true">
                    “
                  </span>
                  <p>
                    To be the premier travel and tourism partner, synonymous with excellence, luxury, and authenticity. AB aims
                    to continually innovate and expand its offerings, setting new standards in the industry and fostering lasting
                    relationships with clients, partners, and communities.
                  </p>
                </div>
              )}
              {purposeTab === 1 && (
                <div className="abx-purpose-panel" role="tabpanel">
                  <span className="abx-purpose-mark" aria-hidden="true">
                    “
                  </span>
                  <p>
                    To be the leading ground mobility partner across the GCC and India — recognized for operational excellence,
                    safety and regional expertise — while extending our reach through international connectivity.
                  </p>
                </div>
              )}
              {purposeTab === 2 && (
                <div className="abx-purpose-panel" role="tabpanel">
                  <span className="abx-purpose-mark" aria-hidden="true">
                    “
                  </span>
                  <p>
                    We deliver reliable, safe and professionally managed mobility solutions for corporate, government, event and
                    tourism clients, combining deep regional expertise with international service standards.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ======================= CORE VALUES ======================= */}
      <section id="values" className="abx-ind py-24 bg-[#0a0a0a] border-b border-gray-900 relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="abx-head abx-reveal is-in" data-revealed="true">
            <div>
              <p className="text-sm font-bold tracking-widest text-abBlue uppercase mb-3">Our core values</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">What every AB journey is built on</h2>
            </div>
          </div>
          <div className="abx-ind-grid">
            <div className="abx-tile abx-value abx-reveal is-in" data-revealed="true" tabIndex={0} onMouseMove={handleTileMouseMove}>
              <span className="abx-tile-num">01</span>
              <span className="abx-tile-icon">
                <i className="fa-solid fa-heart"></i>
              </span>
              <h3 className="abx-tile-title">Customer centricity</h3>
              <p className="abx-tile-desc">
                We prioritize the needs and satisfaction of our customers, aiming to anticipate and fulfill their travel
                desires with unwavering dedication and exceptional service.
              </p>
            </div>
            <div className="abx-tile abx-value abx-reveal is-in" data-revealed="true" tabIndex={0} onMouseMove={handleTileMouseMove}>
              <span className="abx-tile-num">02</span>
              <span className="abx-tile-icon">
                <i className="fa-solid fa-scale-balanced"></i>
              </span>
              <h3 className="abx-tile-title">Integrity and transparency</h3>
              <p className="abx-tile-desc">
                We uphold the highest standards of honesty, ethics, and transparency in all our dealings, building trust and
                fostering long-term relationships based on reliability and accountability.
              </p>
            </div>
            <div className="abx-tile abx-value abx-reveal is-in" data-revealed="true" tabIndex={0} onMouseMove={handleTileMouseMove}>
              <span className="abx-tile-num">03</span>
              <span className="abx-tile-icon">
                <i className="fa-solid fa-lightbulb"></i>
              </span>
              <h3 className="abx-tile-title">Innovation and excellence</h3>
              <p className="abx-tile-desc">
                We embrace innovation, constantly evolving our services to provide cutting-edge travel solutions, and striving
                for excellence in everything we do, setting benchmarks for the industry.
              </p>
            </div>
            <div className="abx-tile abx-value abx-reveal is-in" data-revealed="true" tabIndex={0} onMouseMove={handleTileMouseMove}>
              <span className="abx-tile-num">04</span>
              <span className="abx-tile-icon">
                <i className="fa-solid fa-people-group"></i>
              </span>
              <h3 className="abx-tile-title">Team collaboration</h3>
              <p className="abx-tile-desc">
                We value and respect the expertise and contributions of our diverse team, promoting a collaborative environment
                that encourages creativity, growth, and a sense of unity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= HISTORY TIMELINE ======================= */}
      <section id="history" className="py-24 bg-abDarkGray border-b border-gray-900 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="abx-head abx-reveal is-in" data-revealed="true">
            <div>
              <p className="text-sm font-bold tracking-widest text-abBlue uppercase mb-3">Our history</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">A journey of continuous excellence</h2>
            </div>
            <p className="abx-head-note">
              Since its founding in 2002, AB has grown into one of the region&apos;s leading providers of premium chauffeur and
              passenger transportation. Today it operates across Saudi Arabia, the UAE and Qatar, and has a growing presence in
              India.
            </p>
          </div>

          <div
            className={`abx-tl abx-reveal is-in ${isTimelinePlaying && !timelinePausedByHover ? "is-playing" : "is-paused"}`}
            data-revealed="true"
          >
            <div className="abx-tl-rail-wrap">
              <div className="abx-tl-rail" role="tablist" aria-label="AB milestones">
                <span className="abx-tl-line" aria-hidden="true">
                  <span
                    className="abx-tl-line-fill"
                    style={{ width: `${(timelineIndex / (timelineMilestones.length - 1)) * 100}%` }}
                  ></span>
                </span>
                {timelineMilestones.map((m, idx) => (
                  <button
                    key={m.year + m.label}
                    type="button"
                    role="tab"
                    className={`abx-tl-node ${idx === timelineIndex ? "is-active" : idx < timelineIndex ? "is-done" : ""}`}
                    aria-selected={idx === timelineIndex}
                    onClick={() => {
                      setTimelineIndex(idx);
                      setIsTimelinePlaying(false);
                    }}
                  >
                    <b>{m.year}</b>
                    <small>{m.label}</small>
                  </button>
                ))}
              </div>
            </div>

            <div
              className="abx-tl-stage"
              onMouseEnter={() => setTimelinePausedByHover(true)}
              onMouseLeave={() => setTimelinePausedByHover(false)}
            >
              <span className="abx-tl-timer" key={timelineIndex}></span>
              {timelineMilestones.map((m, idx) => (
                <div
                  key={m.year + m.title}
                  className={`abx-tl-card ${idx === timelineIndex ? "is-active" : ""}`}
                  role="tabpanel"
                  hidden={idx !== timelineIndex}
                >
                  <span className="abx-tl-year">{m.year}</span>
                  <span className="abx-panel-icon">
                    <i className={`fa-solid ${m.icon}`}></i>
                  </span>
                  <h3>{m.title}</h3>
                  <p>{m.desc}</p>
                  <span className="abx-tl-flag">
                    <i className="fa-solid fa-location-dot"></i> {m.location}
                  </span>
                </div>
              ))}

              <div className="abx-tl-foot">
                <div className="abx-nav">
                  <button
                    type="button"
                    className="abx-nav-btn"
                    aria-label="Previous milestone"
                    onClick={() => {
                      setTimelineIndex((prev) => (prev - 1 + timelineMilestones.length) % timelineMilestones.length);
                      setIsTimelinePlaying(false);
                    }}
                  >
                    <i className="fa-solid fa-chevron-left"></i>
                  </button>
                  <span className="abx-count">
                    <b>{timelineIndex + 1}</b> / {timelineMilestones.length}
                  </span>
                  <button
                    type="button"
                    className="abx-nav-btn"
                    aria-label="Next milestone"
                    onClick={() => {
                      setTimelineIndex((prev) => (prev + 1) % timelineMilestones.length);
                      setIsTimelinePlaying(false);
                    }}
                  >
                    <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
                <button
                  type="button"
                  className="abx-tl-play"
                  aria-pressed={isTimelinePlaying}
                  onClick={() => setIsTimelinePlaying(!isTimelinePlaying)}
                >
                  <i className={`fa-solid ${isTimelinePlaying ? "fa-pause" : "fa-play"}`}></i>
                  <span>{isTimelinePlaying ? "Pause" : "Play"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= HOW WE ARE ORGANIZED ======================= */}
      <section id="teams" className="py-24 bg-abBlack border-b border-gray-900 relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="abx-head abx-reveal is-in" data-revealed="true">
            <div>
              <p className="text-sm font-bold tracking-widest text-abBlue uppercase mb-3">How we are organized</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">One system. Six teams.</h2>
            </div>
            <p className="abx-head-note">
              Select a team to see its role. Our own trip and fleet management technology connects all six, giving clients live
              tracking and trip-level reporting.
            </p>
          </div>

          <div className="abx-hub abx-reveal is-in" data-revealed="true">
            <div className="abx-hub-col">
              {teamsData.slice(0, 3).map((team, idx) => (
                <button
                  key={team.title}
                  type="button"
                  className={`abx-hub-team ${selectedTeam === idx ? "is-active" : ""}`}
                  onClick={() => setSelectedTeam(selectedTeam === idx ? null : idx)}
                  onMouseEnter={() => setSelectedTeam(idx)}
                >
                  <span className="abx-tile-icon">
                    <i className={`fa-solid ${team.icon}`}></i>
                  </span>
                  <span>
                    <strong>{team.title}</strong>
                    <small>{team.sub}</small>
                  </span>
                </button>
              ))}
            </div>

            <div className="abx-hub-core" aria-live="polite">
              <span className="abx-hub-ring" aria-hidden="true"></span>
              <span className="abx-hub-ring abx-hub-ring-2" aria-hidden="true"></span>
              <div className="abx-hub-inner is-swap" key={currentHubData.title}>
                <span className="abx-hub-icon">
                  <i className={`fa-solid ${currentHubData.icon}`}></i>
                </span>
                <h3 className="abx-hub-title">{currentHubData.title}</h3>
                <p className="abx-hub-text">{currentHubData.desc}</p>
              </div>
            </div>

            <div className="abx-hub-col">
              {teamsData.slice(3, 6).map((team, idx) => (
                <button
                  key={team.title}
                  type="button"
                  className={`abx-hub-team ${selectedTeam === idx + 3 ? "is-active" : ""}`}
                  onClick={() => setSelectedTeam(selectedTeam === idx + 3 ? null : idx + 3)}
                  onMouseEnter={() => setSelectedTeam(idx + 3)}
                >
                  <span className="abx-tile-icon">
                    <i className={`fa-solid ${team.icon}`}></i>
                  </span>
                  <span>
                    <strong>{team.title}</strong>
                    <small>{team.sub}</small>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================= THE AB STANDARD ======================= */}
      <section id="standard" className="py-24 bg-abDarkGray border-b border-gray-900 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="abx-head abx-reveal is-in" data-revealed="true">
            <div>
              <p className="text-sm font-bold tracking-widest text-abBlue uppercase mb-3">The AB Standard</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Every vehicle inspected. Every chauffeur vetted. Every trip monitored.
              </h2>
            </div>
            <p className="abx-head-note">
              The quality framework behind every vehicle we dispatch and every chauffeur we deploy, built on local regulatory
              compliance and international best practice, and checked every day by our Quality Assurance team.
            </p>
          </div>

          <div className="abx-regs abx-reveal is-in" data-revealed="true" aria-label="Licensing authorities">
            <div className="abx-reg">
              <b>TGA</b>
              <small>
                Transport General Authority
                <br />
                Saudi Arabia
              </small>
            </div>
            <div className="abx-reg">
              <b>RTA</b>
              <small>
                Roads and Transport Authority
                <br />
                Dubai
              </small>
            </div>
            <div className="abx-reg">
              <b>ITC</b>
              <small>
                Integrated Transport Centre
                <br />
                Abu Dhabi
              </small>
            </div>
            <div className="abx-reg">
              <b>MOT</b>
              <small>
                Ministry of Transport
                <br />
                Qatar
              </small>
            </div>
          </div>

          <div className="abx-std">
            <div className="abx-std-visual abx-reveal is-in" data-revealed="true">
              <div className="abx-std-frame">
                {standardItems.map((item, idx) => (
                  <div
                    key={item.num}
                    className={`abx-std-img ${idx === standardOpenIndex ? "is-active" : ""}`}
                  >
                    <Image
                      src={item.img}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>
                ))}
                <div className="abx-std-badge">
                  <span className="abx-std-badge-num">{standardItems[standardOpenIndex].num}</span>
                  <span className="abx-std-badge-txt">{standardItems[standardOpenIndex].title}</span>
                </div>
              </div>
            </div>

            <div className="abx-acc abx-reveal is-in" data-revealed="true">
              {standardItems.map((item, idx) => (
                <div key={item.num} className={`abx-acc-item ${idx === standardOpenIndex ? "is-open" : ""}`}>
                  <button
                    type="button"
                    className="abx-acc-btn"
                    aria-expanded={idx === standardOpenIndex}
                    onClick={() => setStandardOpenIndex(idx)}
                  >
                    <span className="abx-acc-num">{item.num}</span>
                    <span className="abx-acc-title">{item.title}</span>
                    <span className="abx-acc-ico" aria-hidden="true">
                      <i className="fa-solid fa-plus"></i>
                    </span>
                  </button>
                  <div className="abx-acc-panel">
                    <div className="abx-acc-inner">{item.content}</div>
                  </div>
                </div>
              ))}

              <div className="abx-std-cta">
                <p>
                  Whether it&apos;s one executive arrival or a multi-week event with hundreds of vehicles, every trip is
                  delivered to the same standard.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href={`${baseHref}/contact`} className="abx-btn">
                    Request a quote <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                  <Link href={`${baseHref}/contact`} className="abx-btn-ghost">
                    Talk to our team
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= WHY AB ======================= */}
      <section id="why" className="py-24 bg-[#0a0a0a] border-b border-gray-900 relative z-20 overflow-hidden">
        <div className="abx-ind-glow" aria-hidden="true"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="abx-head abx-reveal is-in" data-revealed="true">
            <div>
              <p className="text-sm font-bold tracking-widest text-abBlue uppercase mb-3">Why organizations choose AB</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Designed around your brief. Based where you operate.</h2>
            </div>
          </div>
          <div className="abx-why">
            <div className="abx-tile abx-why-card abx-reveal is-in" data-revealed="true" tabIndex={0} onMouseMove={handleTileMouseMove}>
              <span className="abx-tile-num">01</span>
              <span className="abx-tile-icon">
                <i className="fa-solid fa-pen-ruler"></i>
              </span>
              <h3 className="abx-tile-title">Every brief is different</h3>
              <p className="abx-tile-desc">
                A delegation&apos;s protocol, an event&apos;s guest flow, a company&apos;s shift pattern. We design the transport
                around the brief instead of fitting it to a standard product.
              </p>
            </div>
            <div className="abx-tile abx-why-card abx-reveal is-in" data-revealed="true" tabIndex={0} onMouseMove={handleTileMouseMove}>
              <span className="abx-tile-num">02</span>
              <span className="abx-tile-icon">
                <i className="fa-solid fa-map-location-dot"></i>
              </span>
              <h3 className="abx-tile-title">Based in the region we serve</h3>
              <p className="abx-tile-desc">
                Local teams and licenses in every market, and first-hand knowledge of its cities, roads and customs.
              </p>
            </div>
            <div
              className="abx-tile abx-why-card abx-tile-cta-card abx-reveal is-in"
              data-revealed="true"
              tabIndex={0}
              onMouseMove={handleTileMouseMove}
            >
              <span className="abx-tile-num">2024</span>
              <span className="abx-tile-icon">
                <i className="fa-solid fa-globe"></i>
              </span>
              <h3 className="abx-tile-title">International connectivity</h3>
              <p className="abx-tile-desc">
                Exclusive Global Passenger Network member from Saudi Arabia and the UAE, connecting clients to trusted ground
                transport worldwide.
              </p>
              <Link href={`${homeHref}#awards`} className="abx-tile-cta">
                View awards & recognition{" "}
                <span className="abx-arrow">
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= OFFICES / NETWORK MAP ======================= */}
      <section id="offices" className="py-24 bg-abBlack border-b border-gray-900 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="abx-head abx-reveal is-in" data-revealed="true">
            <div>
              <p className="text-sm font-bold tracking-widest text-abBlue uppercase mb-3">Our offices</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">A regional network, run from Riyadh</h2>
            </div>
            <p className="abx-head-note">Select a location on the map or in the list to see its role and address.</p>
          </div>

          <div className="abx-net abx-reveal is-in" data-revealed="true">
            <div className="abx-map">
              <svg viewBox="0 0 860 560" role="img" aria-label="Map of AB offices and support centres">
                <defs>
                  <pattern id="abxDots" width="16" height="16" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.2" fill="#1f2937" />
                  </pattern>
                  <radialGradient id="abxGlow">
                    <stop offset="0" stopColor="#26ade3" stopOpacity=".35" />
                    <stop offset="1" stopColor="#26ade3" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <rect width="860" height="560" fill="url(#abxDots)" />
                <g className="abx-arcs" fill="none" stroke="#26ade3" strokeWidth="1.5">
                  <path d="M94 226 Q142 180 191 214" className={selectedOffice === 1 ? "is-active" : ""} />
                  <path d="M94 226 Q180 140 265 216" className={selectedOffice === 2 ? "is-active" : ""} />
                  <path d="M94 226 Q170 200 248 231" className={selectedOffice === 3 ? "is-active" : ""} />
                  <path d="M94 226 Q400 120 621 46" className={selectedOffice === 4 ? "is-active" : ""} />
                  <path d="M94 226 Q420 420 765 458" className={selectedOffice === 5 ? "is-active" : ""} />
                </g>
                <g className="abx-pins">
                  {officesData.map((office, idx) => (
                    <g
                      key={office.name}
                      className={`abx-pin ${office.isHq ? "is-hq" : ""} ${office.isSupport ? "is-support" : ""} ${
                        selectedOffice === idx ? "is-active" : ""
                      }`}
                      transform={`translate(${office.pinX} ${office.pinY})`}
                      tabIndex={0}
                      role="button"
                      aria-label={office.name}
                      onClick={() => setSelectedOffice(idx)}
                    >
                      {office.isHq && <circle r="34" fill="url(#abxGlow)" />}
                      <circle className="abx-pin-pulse" r={office.isHq ? 9 : 7} />
                      <circle className="abx-pin-dot" r={office.isHq ? 7 : 6} />
                      <text x={office.labelX} y={office.labelY} textAnchor={office.textAnchor as "middle" | "start" | "end"}>
                        {office.name}
                      </text>
                    </g>
                  ))}
                </g>
              </svg>
              <div className="abx-map-legend">
                <span>
                  <i className="is-hq"></i>Headquarters
                </span>
                <span>
                  <i></i>Regional office
                </span>
                <span>
                  <i className="is-support"></i>Support centre
                </span>
              </div>
            </div>

            <div className="abx-offices">
              {officesData.map((office, idx) => (
                <div
                  key={office.name}
                  className={`abx-office ${selectedOffice === idx ? "is-active" : ""}`}
                  onClick={() => setSelectedOffice(idx)}
                >
                  <button type="button" className="abx-office-head" aria-expanded={selectedOffice === idx}>
                    <strong>{office.name}</strong>
                    <span className="abx-office-tag">{office.tag}</span>
                  </button>
                  <div className="abx-office-body">
                    <span className="abx-office-addr">
                      <i className={`fa-solid ${office.isSupport ? "fa-headset" : "fa-location-dot"}`}></i>
                      {office.addr}
                    </span>
                    {office.mapQuery && (
                      <a
                        className="abx-office-map"
                        href={`https://www.google.com/maps/search/?api=1&query=${office.mapQuery}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Open in Maps <i className="fa-solid fa-arrow-up-right-from-square"></i>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================= FAQ ======================= */}
      <section id="faq" className="py-24 bg-abDarkGray border-b border-gray-900 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="abx-faq">
            <div className="abx-reveal is-in" data-revealed="true">
              <p className="text-sm font-bold tracking-widest text-abBlue uppercase mb-3">FAQs</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Questions about AB</h2>
              <p className="abx-p">Can&apos;t find what you need? Our team will route your question to the right person.</p>
              <Link href={`${baseHref}/contact`} className="abx-btn">
                Contact us <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
            <div className="abx-acc abx-acc-faq abx-reveal is-in" data-revealed="true">
              {faqs.map((faq, idx) => (
                <div key={idx} className={`abx-acc-item ${openFaqIndex === idx ? "is-open" : ""}`}>
                  <button
                    type="button"
                    className="abx-acc-btn"
                    aria-expanded={openFaqIndex === idx}
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  >
                    <span className="abx-acc-title">{faq.q}</span>
                    <span className="abx-acc-ico" aria-hidden="true">
                      <i className="fa-solid fa-plus"></i>
                    </span>
                  </button>
                  <div className="abx-acc-panel">
                    <div className="abx-acc-inner">
                      <p>{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================= WORK WITH US ======================= */}
      <section id="work" className="py-24 bg-abBlack border-b border-gray-900 relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="abx-head abx-reveal is-in" data-revealed="true">
            <div>
              <p className="text-sm font-bold tracking-widest text-abBlue uppercase mb-3">Get in touch</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Work with us</h2>
            </div>
          </div>
          <div className="abx-work">
            <Link
              href={`${baseHref}/contact`}
              className="abx-tile abx-tile-cta-card abx-reveal is-in"
              data-revealed="true"
              onMouseMove={handleTileMouseMove}
            >
              <span className="abx-tile-num">01</span>
              <span className="abx-tile-icon">
                <i className="fa-solid fa-file-signature"></i>
              </span>
              <h3 className="abx-tile-title">Request a proposal</h3>
              <p className="abx-tile-desc">For events, delegations, corporate programmes and recurring transport.</p>
              <span className="abx-tile-cta">
                Start your brief{" "}
                <span className="abx-arrow">
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
              </span>
            </Link>
            <Link
              href={`${baseHref}/partners`}
              className="abx-tile abx-reveal is-in"
              data-revealed="true"
              onMouseMove={handleTileMouseMove}
            >
              <span className="abx-tile-num">02</span>
              <span className="abx-tile-icon">
                <i className="fa-solid fa-handshake"></i>
              </span>
              <h3 className="abx-tile-title">Partner with AB</h3>
              <p className="abx-tile-desc">For travel partners, suppliers and fleet partners across the region.</p>
              <span className="abx-tile-cta">
                Become a partner{" "}
                <span className="abx-arrow">
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
              </span>
            </Link>
            <Link
              href={`${baseHref}/career`}
              className="abx-tile abx-reveal is-in"
              data-revealed="true"
              onMouseMove={handleTileMouseMove}
            >
              <span className="abx-tile-num">03</span>
              <span className="abx-tile-icon">
                <i className="fa-solid fa-briefcase"></i>
              </span>
              <h3 className="abx-tile-title">Careers</h3>
              <p className="abx-tile-desc">Join the chauffeurs, planners and coordinators behind every AB journey.</p>
              <span className="abx-tile-cta">
                View careers{" "}
                <span className="abx-arrow">
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
