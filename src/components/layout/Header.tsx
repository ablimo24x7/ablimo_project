import Link from "next/link";
import { getDictionary, type Locale } from "@/app/[lang]/dictionaries";
import DesktopNav from "./DesktopNav";
import MobileMenu from "./MobileMenu";

interface HeaderProps {
  lang: Locale;
}

export default async function Header({ lang }: HeaderProps) {
  const dict = await getDictionary(lang);

  return (
    <header className="relative z-50 w-full flex justify-between items-center px-10 md:px-12 py-5">
      {/* Logo */}
      <Link
        href={`/${lang}`}
        className="text-2xl font-light tracking-wide text-gray-200"
      >
        {dict.header.logo}
      </Link>

      {/* Desktop Navigation */}
      <DesktopNav dict={dict} lang={lang} />

      {/* Mobile Menu */}
      <MobileMenu dict={dict} lang={lang} />
    </header>
  );
}
