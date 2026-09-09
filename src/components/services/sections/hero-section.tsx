import Image from "next/image";
import Link from "next/link";
import { getIcon } from "./section-icons";
import type { PageSection } from "./section-types";

interface HeroSectionProps {
  section: PageSection;
  serviceName?: string;
}

export default function HeroSection({ section, serviceName }: HeroSectionProps) {
  const c = section.content as Record<string, string>;
  const actions = (section.items || []) as Array<{
    label: string; href: string; style: string; icon?: string; iconPosition?: string;
  }>;
  const settings = section.settings as Record<string, unknown>;
  const appearance = section.appearance as Record<string, string>;

  const minHeight = (settings.minHeight as string) || "85vh";
  const bgImage = appearance.background || "";

  return (
    <section
      className={`relative flex items-center overflow-hidden pt-20 ${section.variant === "centered" ? "text-center" : ""}`}
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
      <div className="absolute inset-0 bg-gradient-to-t from-abBlack via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-abBlack/70 via-abBlack/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`max-w-3xl ${
            section.variant === "centered" ? "mx-auto text-center" : ""
          }`}
        >
          {/* Eyebrow Badge */}
          {c.eyebrow && (
            <div className={`inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-abGold/10 border border-abGold/30 mb-6 backdrop-blur-sm ${
              section.variant === "centered" ? "justify-center" : ""
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
            <div className={`flex flex-wrap gap-4 ${
              section.variant === "centered" ? "justify-center" : ""
            }`}>
              {actions.map((action, i) => {
                const iconEl = action.icon ? getIcon(action.icon, "w-4 h-4") : null;
                const iconNode = iconEl && action.iconPosition === "left"
                  ? <span className="mr-2">{iconEl}</span>
                  : iconEl;

                if (action.style === "primary") {
                  return (
                    <Link
                      key={i}
                      href={action.href || "#"}
                      className="bg-abGold hover:bg-yellow-600 text-white px-8 py-4 rounded text-sm font-bold transition-all shadow-lg shadow-abGold/20 inline-flex items-center"
                    >
                      {action.label}
                      {action.iconPosition === "right" && iconNode && (
                        <span className="ml-2">{iconEl}</span>
                      )}
                      {action.iconPosition !== "right" && iconNode}
                    </Link>
                  );
                }
                if (action.style === "secondary") {
                  return (
                    <Link
                      key={i}
                      href={action.href || "#"}
                      className="bg-abBlack/50 border border-gray-500 text-white hover:border-abGold hover:bg-abBlack px-8 py-4 rounded text-sm font-semibold transition-all backdrop-blur-sm"
                    >
                      {action.label}
                    </Link>
                  );
                }
                if (action.style === "link") {
                  return (
                    <Link
                      key={i}
                      href={action.href || "#"}
                      className="bg-transparent border-b-2 border-abGold text-white hover:text-abGold px-4 py-4 text-sm font-semibold transition-all inline-flex items-center"
                    >
                      {iconNode}
                      {action.label}
                    </Link>
                  );
                }
                return (
                  <Link
                    key={i}
                    href={action.href || "#"}
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
