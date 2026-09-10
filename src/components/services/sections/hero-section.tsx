import Image from "next/image";
import Link from "next/link";
import { getIcon } from "./section-icons";
import type { PageSection } from "./section-types";

interface HeroSectionProps {
  section: PageSection;
  serviceName?: string;
}

const PADDING_CLASSES = {
  none: "",
  sm: "py-12",
  md: "py-16",
  lg: "py-24",
  xl: "py-32",
} as const;

export default function HeroSection({ section, serviceName }: HeroSectionProps) {
  const c = section.content as Record<string, string>;
  const actions = (section.items || []) as Array<{
    label: string; href: string; style: string; icon?: string; iconPosition?: string; openInNewTab?: boolean;
  }>;
  const settings = section.settings as Record<string, unknown>;
  const appearance = section.appearance as Record<string, unknown>;

  const minHeight = (settings.minHeight as string) || "85vh";
  const bgImage = (appearance.background as string) || "";
  const overlayOpacity = typeof settings.overlayOpacity === "number" ? settings.overlayOpacity : 85;
  const contentPosition = (settings.contentPosition as string) || "left";
  const buttonLayout = (settings.buttonLayout as string) || "row";
  const overlayGradient = (appearance.overlayGradient as string) || "default";
  const padding = (appearance.padding as string) || "none";
  const border = appearance.border === true;
  const textAlign = (appearance.textAlign as string) || "left";

  const isCentered = section.variant === "centered" || textAlign === "center";
  const isRight = contentPosition === "right";

  const overlayOpacityClass = `from-abBlack/${overlayOpacity} via-abBlack/30 to-transparent`;

  const gradientOverlay = (() => {
    switch (overlayGradient) {
      case "left-heavy":
        return "bg-gradient-to-r from-abBlack/95 via-abBlack/70 to-abBlack/30";
      case "bottom-heavy":
        return "bg-gradient-to-t from-abBlack via-transparent to-transparent";
      case "center-heavy":
        return "bg-gradient-to-r from-abBlack/95 via-abBlack/80 to-abBlack/95";
      default:
        // Matches HTML: linear-gradient(90deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.7) 100%)
        return "bg-gradient-to-r from-abBlack/95 via-abBlack/85 to-abBlack/70";
    }
  })();

  return (
    <section
      className={`relative flex items-center overflow-hidden ${padding === "none" ? "pt-20" : ""} ${border ? "border-t border-gray-800" : ""}`}
      style={{ minHeight }}
    >
      {/* Background Image */}
      {bgImage && (
        <Image
          src={bgImage}
          alt={c.title || serviceName || ""}
          fill
          className="object-cover"
          priority
        />
      )}

      {/* Gradient Overlays */}
      <div className={`absolute inset-0 bg-gradient-to-t ${overlayOpacityClass}`} />
      <div className={`absolute inset-0 ${gradientOverlay}`} />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`max-w-3xl ${
            isCentered ? "mx-auto text-center" : ""
          } ${isRight ? "ml-auto text-right" : ""}`}
        >
          {/* Eyebrow Badge */}
          {c.eyebrow && (
            <div className={`inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-abGold/10 border border-abGold/30 mb-6 backdrop-blur-sm ${
              isCentered ? "justify-center" : ""
            }`}>
              <span className="w-2 h-2 rounded-full bg-abGold animate-pulse" />
              <span className="text-abGold text-xs font-bold tracking-widest uppercase">
                {c.eyebrow}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            {c.title}
            {c.titleHighlight && (
              <>
                <br />
                <span className="text-abGold">{c.titleHighlight}</span>
              </>
            )}
          </h1>

          {/* Description */}
          {c.description && (
            <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed">
              {c.description}
            </p>
          )}

          {/* CTA Buttons */}
          {actions.length > 0 && (
            <div className={`${
              buttonLayout === "column" ? "flex flex-col gap-4" : "flex flex-wrap gap-4"
            } ${isCentered ? "justify-center" : ""} ${isRight ? "justify-end" : ""}`}>
              {actions.map((action, i) => {
                const iconEl = action.icon ? getIcon(action.icon, "w-4 h-4 mr-2") : null;
                const isRight = action.iconPosition === "right";

                if (action.style === "primary") {
                  return (
                    <Link
                      key={i}
                      href={action.href || "#"}
                      target={action.openInNewTab ? "_blank" : undefined}
                      className="bg-abGold hover:bg-yellow-600 text-white px-8 py-4 rounded text-sm font-bold transition-all shadow-lg shadow-abGold/20 inline-flex items-center"
                    >
                      {!isRight && iconEl}
                      {action.label}
                      {isRight && iconEl && <span className="ml-2">{iconEl}</span>}
                    </Link>
                  );
                }
                if (action.style === "secondary") {
                  return (
                    <Link
                      key={i}
                      href={action.href || "#"}
                      target={action.openInNewTab ? "_blank" : undefined}
                      className="bg-abBlack/50 border border-gray-500 text-white hover:border-abGold hover:bg-abBlack px-8 py-4 rounded text-sm font-semibold transition-all backdrop-blur-sm"
                    >
                      {!isRight && iconEl}
                      {action.label}
                      {isRight && iconEl && <span className="ml-2">{iconEl}</span>}
                    </Link>
                  );
                }
                if (action.style === "link") {
                  return (
                    <Link
                      key={i}
                      href={action.href || "#"}
                      target={action.openInNewTab ? "_blank" : undefined}
                      className="bg-transparent border-b-2 border-abGold text-white hover:text-abGold px-4 py-4 text-sm font-semibold transition-all inline-flex items-center"
                    >
                      {!isRight && iconEl}
                      {action.label}
                      {isRight && iconEl && <span className="ml-2">{iconEl}</span>}
                    </Link>
                  );
                }
                return (
                  <Link
                    key={i}
                    href={action.href || "#"}
                    target={action.openInNewTab ? "_blank" : undefined}
                    className="bg-abBlack/50 border border-gray-500 text-white hover:border-abGold hover:bg-abBlack px-8 py-4 rounded text-sm font-semibold transition-all backdrop-blur-sm"
                  >
                    {action.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
