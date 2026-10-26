import type { Metadata } from "next";
import Image from "next/image";
import { generateSeoMetadata } from "@/lib/seo";

// Global maintenance screen, served at the bare /maintenance URL (outside
// [lang]) so it renders without the site header/footer and stays reachable
// even when the rest of the app is down. noindex + canonical: the URL
// answers, but must never compete with the public pages in search.
export const metadata: Metadata = generateSeoMetadata({
  title: "Scheduled Maintenance",
  description:
    "AB is performing scheduled maintenance. Premium chauffeur-driven mobility across the GCC will be back online shortly.",
  path: "/maintenance",
  lang: "en",
  noindex: true,
});

export default function MaintenancePage() {
  const year = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-abBlack relative overflow-hidden flex flex-col">
      {/* Accent line */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-abBlue to-transparent" />

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-abBlue/10 rounded-full blur-[140px]" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="mb-10 animate-fade-in-up">
          <Image
            src="/AB_LOGO-NEW.png"
            alt="AB Logo"
            width={150}
            height={60}
            className="brightness-0 invert"
            priority
          />
        </div>

        {/* Status badge */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-abBlue/30 bg-abBlue/10 px-5 py-2 mb-8 animate-fade-in-up animation-delay-100">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-abBlue opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-abBlue" />
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-abBlue">
            Scheduled Maintenance
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in-up animation-delay-200">
          We&apos;ll be right <span className="text-abBlue">back</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-xl text-base md:text-lg text-gray-400 mb-10 animate-fade-in-up animation-delay-300">
          Our platform is undergoing scheduled maintenance so every journey keeps
          running smoothly. Services will return shortly — thank you for your
          patience.
        </p>

        {/* Indeterminate progress bar */}
        <div className="w-full max-w-md mb-12 animate-fade-in-up animation-delay-400">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-transparent via-abBlue to-transparent animate-maintenance-sweep" />
          </div>
          <p className="mt-3 text-[11px] uppercase tracking-[0.25em] text-gray-600">
            Maintenance in progress
          </p>
        </div>

        {/* Contact */}
        <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up animation-delay-500">
          <a
            href="mailto:hello@ab.limo"
            className="bg-abBlue hover:bg-abBlue/90 text-white px-8 py-3.5 rounded text-sm font-semibold transition-colors"
          >
            hello@ab.limo
          </a>
          <a
            href="tel:+923135237377"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            +92 313 523 7377
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            &copy; {year} AB. All rights reserved.
          </p>
          <a
            href="https://www.linkedin.com/company/ablimo24x7"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="AB on LinkedIn"
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-500 hover:bg-abBlue hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        </div>
      </footer>
    </main>
  );
}
