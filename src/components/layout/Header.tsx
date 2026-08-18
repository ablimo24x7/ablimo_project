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
    <header className="relative z-50 w-full bg-transparent lg:bg-gradient-to-b lg:from-[#424450] lg:via-[#3a3c46] lg:to-transparent">
      <div className="w-full">
        {/* Mobile & Tablet */}
        <div className="lg:hidden flex justify-between items-center px-6 py-4">
          <Link
            href={`/${lang}`}
            className="text-2xl font-light tracking-wide text-gray-200"
          >
            {dict.header.logo}
          </Link>
          <MobileMenu dict={dict} lang={lang} />
        </div>

        {/* Desktop: two sections */}
        <div className="hidden lg:block">
          <DesktopNav dict={dict} lang={lang} />
        </div>
      </div>
    </header>
  );
}
