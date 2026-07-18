import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  company: {
    title: "Company",
    links: [
      { label: "How AB.Limo works", href: "/about" },
      { label: "Career", href: "/career" },
      { label: "Press", href: "/press/releases" },
      { label: "Green initiatives", href: "/sustainability" },
      { label: "Become a chauffeur partner", href: "/partners" },
    ],
  },
  business: {
    title: "AB.Limo for Business",
    links: [
      { label: "Overview", href: "/business" },
      { label: "Corporations", href: "/corporations" },
      { label: "Travel agencies", href: "/travel-agencies" },
      { label: "Strategic partnerships", href: "/strategic-partnerships" },
    ],
  },
  cities: {
    title: "Top cities",
    links: [
      { label: "Dubai", href: "/countries/ae/dubai/airport-transfer" },
      { label: "Riyadh", href: "/countries/sa/riyadh/airport-transfer" },
      { label: "Doha", href: "/countries/qa/doha/airport-transfer" },
      { label: "Abu Dhabi", href: "/countries/ae/abu-dhabi/airport-transfer" },
      { label: "Jeddah", href: "/countries/sa/jeddah/airport-transfer" },
      { label: "All cities", href: "/cities" },
    ],
  },
  explore: {
    title: "Explore",
    links: [
      { label: "City-to-city rides", href: "/city-to-city" },
      { label: "Limousine service", href: "/limousine-service" },
      { label: "Chauffeur service", href: "/chauffeur-service" },
      { label: "Private car service", href: "/car-service" },
      { label: "Ground transportation", href: "/ground-transportation" },
      { label: "Airport transfer", href: "/airport-transfer" },
      { label: "All countries", href: "/countries" },
    ],
  },
  cityToCity: {
    title: "City-to-City rides",
    links: [
      { label: "Dubai - Abu Dhabi", href: "/city-to-city/abu-dhabi-dubai" },
      { label: "Riyadh - Dammam", href: "/city-to-city/riyadh-dammam" },
      { label: "Doha - Al Khor", href: "/city-to-city/doha-al-khor" },
      { label: "Jeddah - Mecca", href: "/city-to-city/jeddah-mecca" },
      { label: "Manama - Al Khobar", href: "/city-to-city/manama-al-khobar" },
    ],
  },
};

const socialLinks = [
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.96-.5 3.96-1.6 5.6-1.04 1.56-2.58 2.7-4.33 3.19-2.24.62-4.73.45-6.84-.5-2.12-.96-3.82-2.73-4.66-4.88-.8-2.03-.8-4.32-.13-6.38.67-2.06 2.05-3.86 3.9-4.9 1.83-1.04 4.02-1.4 6.07-1.1v4.14c-1.3-.15-2.65.1-3.77.72-1.12.63-1.95 1.63-2.3 2.87-.37 1.25-.2 2.63.4 3.75.63 1.12 1.7 1.94 2.94 2.3 1.25.35 2.6.2 3.72-.4 1.14-.62 1.97-1.67 2.33-2.92.35-1.2.2-2.5.2-3.7v-13z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

const bottomLinks = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Legal notice", href: "/imprint" },
  { label: "Accessibility", href: "/accessibility" },
];

export default function Footer() {
  return (
    <footer className="bg-[#16171b] pt-20 pb-10 border-t border-gray-700/50 text-white">
      <div className="max-w-7xl mx-auto px-8">
        {/* Top Row: Logo and Apps */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <Link
            href="/"
            className="text-3xl font-light tracking-wide text-gray-200"
          >
            AB.Limo
          </Link>
          <div className="flex gap-4">
            <a href="#" className="hover:opacity-80 transition-opacity">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                alt="Download on the App Store"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                width={135}
                height={40}
                className="h-10 w-auto"
              />
            </a>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-6 text-gray-100">
                {section.title}
              </h4>
              <ul className="space-y-4 text-sm text-gray-400">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Row: Copyright, Links, Socials */}
        <div className="flex flex-col lg:flex-row justify-between items-center pt-8 border-t border-gray-800 gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm text-gray-400">
            <span className="font-semibold text-gray-200">
              &copy;2026 AB.Limo
            </span>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {bottomLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-5 text-gray-400">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="hover:text-white transition-colors"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
