import Image from "next/image";
import { getIcon } from "./section-icons";
import type { PageSection } from "./section-types";

interface MediaContentSectionProps {
  section: PageSection;
}

export default function MediaContentSection({ section }: MediaContentSectionProps) {
  const c = section.content as Record<string, unknown>;
  const items = (c.items || []) as Array<{
    id: string; icon: string; heading: string; description: string;
  }>;
  const settings = section.settings as Record<string, string>;
  const appearance = section.appearance as Record<string, unknown>;

  const mediaPosition = settings.mediaPosition || "right";
  const bgImage = (appearance.background as string) || "";
  const usePattern = appearance.pattern === true;

  const themeClass =
    appearance.theme === "darker" ? "bg-abBlack text-white" :
    appearance.theme === "light" ? "bg-white text-gray-900" :
    "bg-abDarkGray text-white";

  return (
    <section className={`py-24 ${themeClass} relative overflow-hidden border-t border-gray-800`}>
      {/* Pattern Background */}
      {usePattern && (
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(#c5a059 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <div className={mediaPosition === "left" ? "order-2 lg:order-1" : ""}>
            {(c.eyebrow as string) && (
              <h2 className="text-sm font-bold tracking-widest text-abGold uppercase mb-3">
                {c.eyebrow as string}
              </h2>
            )}
            {(c.heading as string) && (
              <h3 className="text-3xl md:text-4xl font-bold mb-6">{c.heading as string}</h3>
            )}
            {(c.description as string) && (
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                {c.description as string}
              </p>
            )}

            {/* Items List */}
            {items.length > 0 && (
              <ul className="space-y-6 mb-10">
                {items.map((item) => (
                  <li key={item.id} className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded bg-gray-900 border border-gray-700 flex items-center justify-center mt-1">
                      {getIcon(item.icon, "w-4 h-4 text-abGold")}
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-bold text-gray-100">{item.heading}</h4>
                      {item.description && (
                        <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Media Side */}
          <div className={`relative ${mediaPosition === "left" ? "order-1 lg:order-2" : ""}`}>
            {bgImage && (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-abGold to-yellow-600 transform translate-x-4 translate-y-4 rounded-xl opacity-20 blur-sm" />
                <div className="bg-abDarkGray border border-gray-800 rounded-xl shadow-2xl relative z-10 overflow-hidden">
                  <div className="bg-black/50 px-4 py-3 border-b border-gray-800 flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="p-6">
                    <Image
                      src={bgImage}
                      alt={(c.heading as string) || ""}
                      width={600}
                      height={400}
                      className="w-full rounded border border-gray-700 opacity-80 filter contrast-125 grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
