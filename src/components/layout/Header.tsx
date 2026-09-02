import Link from "next/link";
import { getDictionary, type Locale } from "@/app/[lang]/dictionaries";
import { getNavServices, type NavServiceItem } from "@/lib/services";
import DesktopNav from "./DesktopNav";
import MobileMenu from "./MobileMenu";

interface HeaderProps {
  lang: Locale;
}

export default async function Header({ lang }: HeaderProps) {
  const dict = await getDictionary(lang);
  const dbServiceLinks: NavServiceItem[] = await getNavServices(lang);

  return (
    <header className="fixed w-full bg-abBlack/95 border-b border-gray-800 z-[90] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href={`/${lang}`}
              className="text-white text-2xl font-bold tracking-widest uppercase"
            >
              {dict.header.logo}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <DesktopNav dict={dict} lang={lang} dbServiceLinks={dbServiceLinks} />
          </div>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-5">
            <Link
              href={`/${lang}/partners`}
              className="text-xs font-medium text-gray-400 hover:text-white transition-colors"
            >
              Chauffeur Partner Portal
            </Link>
            <Link
              href={`/${lang}`}
              className="bg-transparent border border-abGold text-abGold hover:bg-abGold hover:text-white px-5 py-2 rounded text-sm font-semibold transition-colors"
            >
              {dict.header.nav.bookNow}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <MobileMenu dict={dict} lang={lang} dbServiceLinks={dbServiceLinks} />
          </div>
        </div>
      </div>
    </header>
  );
}
