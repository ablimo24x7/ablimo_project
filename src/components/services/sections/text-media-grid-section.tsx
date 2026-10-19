import Image from "next/image";
import { getIcon } from "./section-icons";
import type { PageSection } from "./section-types";

interface TextMediaGridSectionProps {
  section: PageSection;
}

const PADDING_CLASSES = {
  none: "",
  sm: "py-12",
  md: "py-16",
  lg: "py-24",
  xl: "py-32",
} as const;

interface MediaTile {
  id?: string;
  type?: string;
  column?: string;
  size?: string;
  image?: string;
  imageAlt?: string;
  overlay?: string;
  contain?: boolean;
  statValue?: string;
  statLabel?: string;
}

export default function TextMediaGridSection({ section }: TextMediaGridSectionProps) {
  const c = section.content as Record<string, unknown>;
  const items = (c.items || []) as Array<{
    id: string; icon?: string; heading: string; description: string;
  }>;
  const media = (c.media || []) as MediaTile[];
  const settings = section.settings as Record<string, string>;
  const appearance = section.appearance as Record<string, unknown>;

  const mediaPosition = settings.mediaPosition || "right";
  const usePattern = appearance.pattern === true;
  const padding = (appearance.padding as string) || "lg";
  const border = appearance.border === "true" || appearance.border === true;
  const textAlign = (appearance.textAlign as string) || "left";

  const themeClass =
    appearance.theme === "darker" ? "bg-abBlack text-white" :
    appearance.theme === "light" ? "bg-white text-gray-900" :
    "bg-abDarkGray text-white";

  const textAlignClass = textAlign === "center" ? "text-center" : textAlign === "right" ? "text-right" : "text-left";

  const heading = (c.heading as string) || "";
  const headingHighlight = (c.headingHighlight as string) || "";
  const headingAfter = (c.headingAfter as string) || "";
  const description = (c.description as string) || "";
  const descriptionHtml = /<[a-z][\s\S]*>/i.test(description) ? description : `<p>${description}</p>`;

  const renderTile = (tile: MediaTile, i: number) => {
    const heightClass = tile.size === "short" ? "h-48" : "h-64";

    if (tile.type === "stat") {
      return (
        <div
          key={tile.id || i}
          className={`relative ${heightClass} rounded-xl overflow-hidden border border-gray-800 bg-[#111] flex items-center justify-center`}
        >
          <div className="text-center p-4">
            <span className="block text-4xl font-bold text-white mb-1">{tile.statValue || ""}</span>
            <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">{tile.statLabel || ""}</span>
          </div>
        </div>
      );
    }

    if (!tile.image) return null;
    const hasOverlay = !!tile.overlay && tile.overlay !== "none";

    return (
      <div
        key={tile.id || i}
        className={`relative ${heightClass} rounded-xl overflow-hidden border border-gray-800 group ${tile.contain ? "bg-[#111]" : ""}`}
      >
        <div className={`absolute inset-0 ${tile.contain ? "p-4" : ""}`}>
          <Image
            src={tile.image}
            alt={tile.imageAlt || ""}
            fill
            sizes="(max-width: 1024px) 50vw, 300px"
            className={`transition-transform duration-700 group-hover:scale-105 opacity-80 ${
              tile.contain ? "object-contain" : "object-cover"
            } ${hasOverlay ? "grayscale" : ""}`}
          />
        </div>
        {tile.overlay === "blue" && (
          <div className="absolute inset-0 bg-abBlue mix-blend-overlay opacity-20" />
        )}
        {tile.overlay === "gradient" && (
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
        )}
      </div>
    );
  };

  return (
    <section
      className={`${PADDING_CLASSES[padding as keyof typeof PADDING_CLASSES] || "py-24"} ${themeClass} relative overflow-hidden ${border ? "border-t border-gray-800" : ""}`}
    >
      {/* Dot Pattern Background */}
      {usePattern && (
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#26ade3 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* SEO Text Content Column */}
          <div className={`lg:col-span-7 ${mediaPosition === "left" ? "lg:order-2" : ""} ${textAlignClass}`}>
            {(c.eyebrow as string) && (
              <div className={`inline-flex items-center space-x-2 py-1.5 px-4 rounded-full bg-[#111] border border-gray-800 mb-6 ${textAlign === "center" ? "mx-auto" : ""}`}>
                {getIcon((c.eyebrowIcon as string) || "", "text-abBlue text-xs")}
                <span className="text-gray-300 text-xs font-bold tracking-widest uppercase">
                  {c.eyebrow as string}
                </span>
              </div>
            )}

            {(heading || headingHighlight) && (
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-8">
                {heading}
                {headingHighlight && <> <span className="text-abBlue">{headingHighlight}</span></>}
                {headingAfter && <> {headingAfter}</>}
              </h2>
            )}

            {description && (
              <div
                className="prose prose-invert prose-lg max-w-none text-gray-400"
                dangerouslySetInnerHTML={{ __html: descriptionHtml }}
              />
            )}

            {/* Feature Highlights */}
            {items.length > 0 && (
              <div className="mt-10 grid grid-cols-2 gap-6 border-t border-gray-800 pt-8">
                {items.map((item, i) => (
                  <div key={item.id || i}>
                    <h4 className="text-white font-bold mb-2 flex items-center">
                      {getIcon(item.icon, "text-abBlue mr-2")}
                      {item.heading}
                    </h4>
                    {item.description && (
                      <p className="text-sm text-gray-500">{item.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Aesthetic Image / Stat Mosaic */}
          <div className={`lg:col-span-5 ${mediaPosition === "left" ? "lg:order-1" : ""}`}>
            <div className="grid grid-cols-2 gap-4">
              {(["left", "right"] as const).map((col) => (
                <div key={col} className={`space-y-4 ${col === "right" ? "pt-12" : ""}`}>
                  {media
                    .filter((tile) => (tile.column || "left") === col)
                    .map((tile, i) => renderTile(tile, i))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
