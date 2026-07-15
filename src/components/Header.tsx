import Link from "next/link";

const navLinks = [
  { href: "#", label: "ORDER" },
  { href: "#", label: "BOOK NOW", active: true },
  { href: "#", label: "CHARGING" },
  { href: "#", label: "GALLERY" },
  { href: "#", label: "VIDEOS" },
];

export default function Header() {
  return (
    <header className="relative z-50 w-full flex justify-between items-center px-8 md:px-16 py-8">
      <Link href="/" className="text-3xl font-light tracking-wide text-gray-200">
        AB.Limo
      </Link>
      <nav className="hidden md:flex items-center gap-10 text-xs font-semibold tracking-[0.15em] text-gray-400">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={
              link.active
                ? "text-white border-b-2 border-white pb-1"
                : "hover:text-white transition-colors"
            }
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="md:hidden text-white cursor-pointer">
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </div>
    </header>
  );
}
