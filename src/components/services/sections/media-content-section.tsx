import Image from "next/image";
import Link from "next/link";
import { getIcon } from "./section-icons";
import type { PageSection } from "./section-types";
import type { SectionInstance, SectionRenderContext } from "@/components/section-library/types";

interface MediaContentSectionProps {
  section: PageSection | SectionInstance;
  context?: SectionRenderContext;
}

const PADDING_CLASSES = {
  none: "",
  sm: "py-12",
  md: "py-16",
  lg: "py-24",
  xl: "py-32",
} as const;

export default function MediaContentSection({ section, context }: MediaContentSectionProps) {
  const c = section.content as Record<string, unknown>;
  const items = (c.items || []) as Array<{
    id: string; icon: string; heading: string; description: string;
  }>;
  const actions = (c.actions || []) as Array<{
    label: string; href: string; style: string; icon?: string;
  }>;
  const settings = section.settings as Record<string, string>;
  const appearance = section.appearance as Record<string, unknown>;

  const mediaPosition = settings.mediaPosition || "right";
  // Route templates store a slug → image map in content (the image
  // depends on the destination city); resolve it against the page
  // context, then fall back to the static appearance background used
  // by country/city sections.
  const imageMap = (c.images ?? {}) as Record<string, string>;
  const mapSlug =
    context?.kind === "location" && context.route
      ? context.toCity?.slug ?? ""
      : "";
  const bgImage =
    (mapSlug ? imageMap[mapSlug] ?? "" : "") ||
    (appearance.background as string) ||
    "";
  const bgAlt = (appearance.backgroundAlt as string) || "";
  const usePattern = appearance.pattern === true;
  const padding = (appearance.padding as string) || "lg";
  const border = appearance.border === "true" || appearance.border === true;
  const textAlign = (appearance.textAlign as string) || "left";

  const themeClass =
    appearance.theme === "darker" ? "bg-abBlack text-white" :
    appearance.theme === "light" ? "bg-white text-gray-900" :
    "bg-abDarkGray text-white";

  const textAlignClass = textAlign === "center" ? "text-center" : textAlign === "right" ? "text-right" : "text-left";

  return (
    <section className={`${PADDING_CLASSES[padding as keyof typeof PADDING_CLASSES] || "py-24"} ${themeClass} relative overflow-hidden ${border ? "border-t border-gray-800" : ""}`}>
      {/* Pattern Background */}
      {usePattern && (
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(#1A93C4 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`grid ${bgImage ? "lg:grid-cols-2" : "lg:grid-cols-1"} gap-16 items-center`}>
          {/* Content Side */}
          <div className={`${bgImage && mediaPosition === "right" ? "order-2 lg:order-1" : ""} ${textAlignClass}`}>
            {(c.eyebrow as string) && (
              <h2 className="text-sm font-bold tracking-widest text-abServiceBlue uppercase mb-3">
                {c.eyebrow as string}
              </h2>
            )}
            {(c.heading as string) && (
              <h3 className="text-3xl md:text-4xl font-bold mb-6">{c.heading as string}</h3>
            )}
            {(c.description as string) && (
              <div className="space-y-4 mb-8">
                {(c.description as string)
                  .split(/\n\n+/)
                  .map((para, pIdx) => pIdx >= 0 && para.trim() && (
                    <p key={pIdx} className="text-gray-400 text-lg leading-relaxed">
                      {para.trim()}
                    </p>
                  ))}
              </div>
            )}

            {/* Items List */}
            {items.length > 0 && (
              <ul className={`${bgImage ? "space-y-6" : "grid md:grid-cols-2 gap-6"} mb-10`}>
                {items.map((item) => (
                  <li key={item.id} className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded bg-gray-900 border border-gray-700 flex items-center justify-center mt-1">
                      {getIcon(item.icon, "w-4 h-4 text-abServiceBlue")}
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-bold text-gray-100">{item.heading}</h4>
                      {item.description && (
                        <p className="text-sm text-gray-400 mt-1 leading-relaxed">{item.description}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* Action Buttons */}
            {actions.length > 0 && (
              <div className={`flex flex-wrap gap-4 ${textAlign === "center" ? "justify-center" : ""} ${textAlign === "right" ? "justify-end" : ""}`}>
                {actions.map((action, i) => {
                  const iconEl = action.icon ? getIcon(action.icon, "w-4 h-4") : null;
                  if (action.style === "primary") {
                    return (
                      <Link
                        key={i}
                        href={action.href || "#"}
                        className="inline-flex items-center bg-abServiceBlue hover:bg-sky-700 text-white px-6 py-3 rounded text-sm font-semibold transition-all shadow-lg shadow-abServiceBlue/20"
                      >
                        {action.label}
                        {iconEl && <span className="ml-2">{iconEl}</span>}
                      </Link>
                    );
                  }
                  if (action.style === "secondary") {
                    return (
                      <Link
                        key={i}
                        href={action.href || "#"}
                        className="inline-flex items-center bg-transparent border border-abServiceBlue text-abServiceBlue hover:bg-abServiceBlue hover:text-white px-6 py-3 rounded text-sm font-semibold transition-all"
                      >
                        {action.label}
                        {iconEl && <span className="ml-2">{iconEl}</span>}
                      </Link>
                    );
                  }
                  return (
                    <Link
                      key={i}
                      href={action.href || "#"}
                      className="inline-flex items-center bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white px-6 py-3 rounded text-sm font-semibold transition-all"
                    >
                      {action.label}
                      {iconEl && <span className="ml-2">{iconEl}</span>}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Media Side */}
          {bgImage && (
            <div className={`relative ${mediaPosition === "left" ? "order-1 lg:order-2" : ""}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-abServiceBlue to-sky-700 transform translate-x-4 translate-y-4 rounded-xl opacity-20 blur-sm" />
              <div className="bg-abDarkGray border border-gray-800 rounded-xl shadow-2xl relative z-10 overflow-hidden">
                <div className="bg-black/50 px-4 py-3 border-b border-gray-800 flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  {(c.mediaTitle as string) && (
                    <span className="ml-4 text-xs font-mono text-gray-500">{c.mediaTitle as string}</span>
                  )}
                </div>
                <div className="p-6">
                  <Image
                    src={bgImage}
                    alt={bgAlt || (c.heading as string) || ""}
                    width={600}
                    height={400}
                    className="w-full rounded border border-gray-700 opacity-90 hover:opacity-100 transition-all duration-700"
                  />
                  {(c.mediaCaption as string) && (
                    <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                      {c.mediaCaption as string}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
