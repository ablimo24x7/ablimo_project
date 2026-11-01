import Image from "next/image";

function WebsiteMockup() {
  return (
    <div className="w-full h-full bg-[#0a0a0a] relative overflow-hidden">
      {/* Mock Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0d0d0d] border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-6 h-2 bg-abGold rounded-sm" />
          <span className="text-[8px] text-gray-500 font-bold tracking-wider">AB.LIMO</span>
        </div>
        <div className="flex gap-3">
          {["", "", "", ""].map((_, i) => (
            <div key={i} className="w-6 h-1 bg-gray-700 rounded-full" />
          ))}
        </div>
        <div className="w-8 h-2 bg-abGold/80 rounded-sm" />
      </div>

      {/* Mock Hero */}
      <div className="relative h-[55%] bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0d0d0d] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-abBlack/90 to-transparent" />
        <div className="relative z-10 pl-4 space-y-2">
          <div className="w-8 h-1 bg-abGold/40 rounded-full" />
          <div className="w-32 h-2 bg-white/80 rounded-sm" />
          <div className="w-24 h-2 bg-abGold rounded-sm" />
          <div className="w-28 h-1 bg-gray-600 rounded-full mt-1" />
          <div className="w-20 h-1 bg-gray-700 rounded-full" />
          <div className="flex gap-2 mt-2">
            <div className="w-12 h-2 bg-abGold rounded-sm" />
            <div className="w-12 h-2 border border-gray-600 rounded-sm" />
          </div>
        </div>
        {/* Decorative car silhouette */}
        <div className="absolute right-4 bottom-2 w-24 h-10 bg-gradient-to-t from-gray-800/20 to-transparent rounded-lg" />
      </div>

      {/* Mock Cards Section */}
      <div className="px-3 py-2 grid grid-cols-3 gap-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-[#111] rounded border border-gray-800 p-2 space-y-1.5">
            <div className={`w-6 h-6 rounded bg-abGold/${20 + i * 10} flex items-center justify-center`}>
              <div className="w-3 h-3 rounded-sm bg-abGold/40" />
            </div>
            <div className="w-full h-1 bg-gray-700 rounded-full" />
            <div className="w-3/4 h-1 bg-gray-800 rounded-full" />
          </div>
        ))}
      </div>

      {/* Mock Fleet Grid */}
      <div className="px-3 py-1">
        <div className="w-16 h-1 bg-gray-700 rounded-full mb-2" />
        <div className="grid grid-cols-4 gap-1.5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-[#111] rounded border border-gray-800 aspect-[4/3] flex items-center justify-center">
              <div className="w-8 h-4 bg-gray-700/50 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </div>
  );
}

export default async function ComingSoonPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <main className="min-h-screen bg-abBlack relative overflow-hidden flex flex-col">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-abBlack via-[#0d0d0d] to-[#1a1510] opacity-80" />

      {/* Subtle gold radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-abGold/5 rounded-full blur-[150px]" />

      {/* Decorative gold line at top */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-abGold to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        {/* Logo */}
        <div className="mb-10 animate-fade-in-up">
          <Image
            src="/AB_LOGO-NEW.png"
            alt="AB.Limo Logo"
            width={140}
            height={56}
            className="brightness-0 invert"
            priority
          />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center space-x-2 py-2 px-5 rounded-full bg-abGold/10 border border-abGold/30 mb-8 animate-fade-in-up animation-delay-100">
          <span className="w-2 h-2 rounded-full bg-abGold animate-pulse" />
          <span className="text-abGold text-xs font-bold tracking-[0.2em] uppercase">
            Launching Soon
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-4 animate-fade-in-up animation-delay-200">
          Premium Executive
          <br />
          <span className="text-abGold">Mobility</span> is Coming
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-center max-w-xl text-base md:text-lg mb-12 animate-fade-in-up animation-delay-300">
          We&apos;re crafting a world-class chauffeur-driven transportation experience
          across the GCC and beyond. Stay tuned.
        </p>

        {/* Device Mockup */}
        <div className="w-full max-w-4xl mb-12 animate-fade-in-up animation-delay-400">
          <div className="relative mx-auto" style={{ perspective: "1200px" }}>
            {/* Laptop Frame */}
            <div className="relative bg-[#1a1a1a] rounded-t-xl border border-[#333] border-b-0 p-2 pb-0">
              {/* Laptop Notch / Top Bar */}
              <div className="flex items-center gap-2 px-3 py-2 bg-[#111] rounded-t-lg">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex-1 mx-8">
                  <div className="bg-[#222] rounded-md h-6 flex items-center justify-center">
                    <span className="text-[10px] text-gray-500 tracking-wide">
                      ab.limo
                    </span>
                  </div>
                </div>
              </div>

              {/* Screen Content - Website Mockup */}
              <div className="relative aspect-[16/9] bg-[#0a0a0a] overflow-hidden">
                <WebsiteMockup />
              </div>
            </div>

            {/* Laptop Base */}
            <div className="bg-[#1a1a1a] h-4 rounded-b-xl border border-[#333] border-t-0 mx-auto max-w-[85%]" />
            <div className="bg-[#222] h-1 rounded-b-lg border border-[#333] border-t-0 mx-auto max-w-[45%]" />
          </div>
        </div>

        {/* CTA Button */}
        <div className="animate-fade-in-up animation-delay-500">
          <a
            href="mailto:hello@ab.limo"
            className="bg-transparent border border-gray-600 text-gray-300 hover:border-white hover:text-white px-10 py-4 rounded text-sm font-semibold transition-all"
          >
            <i className="fa-regular fa-envelope mr-2" />
            Contact Us
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-gray-800/50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs">
            &copy; {new Date().getFullYear()} AB.Limo. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex gap-3">
            {[
              {
                label: "LinkedIn",
                icon: (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                ),
              },
              {
                label: "Instagram",
                icon: (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                ),
              },
              {
                label: "Facebook",
                icon: (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                ),
              },
              {
                label: "X",
                icon: (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                ),
              },
            ].map((social) => (
              <a
                key={social.label}
                href="#"
                className="w-8 h-8 rounded-full bg-gray-800/50 flex items-center justify-center text-gray-500 hover:bg-abGold hover:text-white transition-all duration-300"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
