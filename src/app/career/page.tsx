import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers at AB.Limo - Join Our Global Team",
  description:
    "Explore exciting career opportunities at AB.Limo. Join a growing international team and help shape the future of luxury ground transportation.",
};

const teams = [
  {
    name: "Product Engineering & Development",
    abbrev: "PED",
    description:
      "Build and innovate the technology platform that powers millions of rides worldwide.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
  },
  {
    name: "Marketing",
    abbrev: "MKT",
    description:
      "Drive brand awareness and customer engagement across global markets.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
  },
  {
    name: "Sales",
    abbrev: "SLS",
    description:
      "Expand our corporate partnerships and grow revenue across all segments.",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop",
  },
  {
    name: "People & Culture",
    abbrev: "P&C",
    description:
      "Shape our workplace culture and attract top talent from around the world.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop",
  },
  {
    name: "Customer Care",
    abbrev: "CC",
    description:
      "Deliver exceptional support to passengers and chauffeurs alike.",
    image:
      "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=400&h=300&fit=crop",
  },
  {
    name: "Operations",
    abbrev: "OPS",
    description:
      "Ensure seamless service delivery across our global network of cities.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
  },
  {
    name: "Finance & Legal",
    abbrev: "F&L",
    description:
      "Manage financial strategy, compliance, and corporate governance.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
  },
  {
    name: "Executive Management",
    abbrev: "EXEC",
    description:
      "Lead the vision and strategic direction of AB.Limo worldwide.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
  },
];

const benefits = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "Personal Development",
    description:
      "Access to learning programs, mentorship, and growth opportunities to advance your career.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: "Open Feedback",
    description:
      "A culture of transparency where every voice matters and feedback drives continuous improvement.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Flexible Work",
    description:
      "Work-life balance with flexible schedules and remote work options where possible.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Social Events",
    description:
      "Regular team gatherings, celebrations, and company-wide events to connect and have fun.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Cares Day",
    description:
      "Dedicated days off for volunteering and giving back to the communities we serve.",
  },
];

const newsItems = [
  {
    title: "AB.Limo Expands to 10 New Cities Across Europe",
    date: "July 10, 2026",
    category: "Company News",
    image:
      "https://images.unsplash.com/photo-1473951574080-01fe45ec8643?q=80&w=904&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Join Us at the Global Mobility Summit 2026",
    date: "July 5, 2026",
    category: "Events",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
  },
  {
    title: "AB.Limo Named Top Employer in Transportation Sector",
    date: "June 28, 2026",
    category: "Awards",
    image:
      "https://images.unsplash.com/photo-1698047682091-782b1e5c6536?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function CareerPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop"
          alt="AB.Limo office and team"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#292a30]/70 via-[#292a30]/50 to-[#292a30]" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-wide max-w-4xl mx-auto leading-tight">
            Start your career journey with AB.Limo
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Career</span>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Start your journey.
              <br />
              <span className="italic font-light text-gray-300">
                Find your lane.
              </span>
            </h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                At AB.Limo, we&apos;re not just building a ride service
                — we&apos;re revolutionizing how the world moves. Our team
                of innovators, dreamers, and doers are passionate about
                creating seamless luxury experiences for millions of
                passengers worldwide.
              </p>
              <p>
                Whether you&apos;re a tech enthusiast, a customer service
                expert, or a business strategist, there&apos;s a place for
                you in our global team. We believe that great companies are
                built by great people, and we&apos;re committed to creating
                an environment where everyone can thrive.
              </p>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="AB.Limo team collaboration"
                width={800}
                height={600}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Growing International Team */}
      <section className="py-24 bg-[#1c1d21]">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 leading-tight">
            Join a growing
            <br />
            <span className="italic font-light text-gray-300">
              international team
            </span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Team Members" },
              { number: "30+", label: "Nationalities" },
              { number: "15+", label: "Office Locations" },
              { number: "4.5", label: "Glassdoor Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-5xl md:text-6xl font-bold mb-4">
                  {stat.number}
                </p>
                <p className="text-gray-400 text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 px-8 max-w-5xl mx-auto text-center">
        <div className="text-6xl text-gray-700 mb-8">&ldquo;</div>
        <blockquote className="text-3xl md:text-4xl font-light leading-relaxed mb-8 italic">
          We believe that when you invest in people, they invest in you.
          At AB.Limo, every team member has the opportunity to make a real
          impact on how the world moves.
        </blockquote>
        <div>
          <p className="font-semibold text-lg">Chief People Officer</p>
          <p className="text-gray-400 text-sm">AB.Limo</p>
        </div>
      </section>

      {/* Teams Section */}
      <section className="py-24 bg-[#1c1d21]">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 leading-tight">
            Discover our teams &
            <br />
            <span className="italic font-light text-gray-300">
              opportunities
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teams.map((team) => (
              <div
                key={team.abbrev}
                className="bg-[#292a30] rounded-lg overflow-hidden border border-gray-700/50 hover:border-gray-500/50 transition-all duration-300 group cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={team.image}
                    alt={team.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#292a30] to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white/10 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {team.abbrev}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-gray-300 transition-colors">
                    {team.name}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {team.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 leading-tight">
          Why you&apos;ll love
          <br />
          <span className="italic font-light text-gray-300">
            working here
          </span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-[#1c1d21] p-8 rounded-lg border border-gray-700/50 text-center hover:border-gray-500/50 transition-all duration-300"
            >
              <div className="text-white mb-6 flex justify-center">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-bold mb-4">{benefit.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest News */}
      <section className="py-24 bg-[#1c1d21]">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 leading-tight">
            Latest
            <br />
            <span className="italic font-light text-gray-300">news</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {newsItems.map((news) => (
              <article
                key={news.title}
                className="bg-[#292a30] rounded-lg overflow-hidden border border-gray-700/50 hover:border-gray-500/50 transition-all duration-300 group cursor-pointer"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">
                      {news.category}
                    </span>
                    <span className="text-xs text-gray-600">•</span>
                    <span className="text-xs text-gray-500">{news.date}</span>
                  </div>
                  <h3 className="text-lg font-bold group-hover:text-gray-300 transition-colors">
                    {news.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Chauffeur CTA */}
      <section className="py-24 px-8 max-w-4xl mx-auto text-center">
        <div className="bg-[#1c1d21] rounded-2xl p-12 border border-gray-700/50">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Looking to become a chauffeur?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Join our network of professional chauffeurs and earn money on your
            own schedule. We provide training, support, and access to premium
            clients.
          </p>
          <Link
            href="/partners"
            className="inline-block bg-white text-[#292a30] px-10 py-4 text-sm font-semibold tracking-wider uppercase hover:bg-gray-200 transition-all duration-300 rounded-full"
          >
            Become a Chauffeur Partner
          </Link>
        </div>
      </section>

    </>
  );
}
