import Image from "next/image";
import Link from "next/link";
import { getIcon } from "./section-icons";
import type { PageSection } from "./section-types";
import type { SectionInstance, SectionRenderContext } from "@/components/section-library/types";
import HeroInquiryForm from "@/app/[lang]/locations/_components/HeroInquiryForm";

interface HeroSectionProps {
  section: PageSection | SectionInstance;
  serviceName?: string;
  context?: SectionRenderContext;
}

const PADDING_CLASSES = {
  none: "",
  sm: "py-12",
  md: "py-16",
  lg: "py-24",
  xl: "py-32",
} as const;

export default function HeroSection({ section, serviceName, context }: HeroSectionProps) {
  const c = section.content as Record<string, string>;

  // Location inquiry hero — mirrors the original location-page banner layout
  if (section.variant === "with-inquiry-form" && context?.kind === "location") {
    const locationName = context.route
      ? undefined
      : context.city?.name ?? context.country?.name ?? serviceName ?? "";
    // Route heroes vary per route — resolve a slug → image map from content
    // first (stored in route templates), then fall back to the static
    // appearance background used by country/city heroes.
    const contentImages = ((section.content as Record<string, unknown>).images ?? {}) as Record<string, string>;
    const heroSlug = context.route ? (context.fromCity?.slug ?? context.city?.slug ?? "") : "";
    const heroImage =
      (heroSlug ? contentImages[heroSlug] : "") ||
      (section.appearance.background as string) ||
      "";
    const title = c.title || "";
    const description = c.description || "";
    return (
      <section className="relative w-full pt-20">
        <div className="relative w-full h-[260px] sm:h-[340px] md:h-[420px] xl:h-[560px]">
          {heroImage && (
            <Image
              src={heroImage}
              alt={title || locationName || ""}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Hero Heading */}
          <div className="absolute inset-0 flex items-end pb-6 xl:items-center xl:pb-0">
            <div className="max-w-7xl mx-auto w-full px-8">
              {c.eyebrow && (
                <p className="text-sm font-bold tracking-widest text-abServiceBlue uppercase mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                  {c.eyebrow}
                </p>
              )}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] max-w-md">
                {title}
                {c.titleHighlight ? (
                  <span className="text-abServiceBlue">&nbsp;{c.titleHighlight}</span>
                ) : null}
              </h1>
              {description && (
                <p className="hidden sm:block text-gray-200 text-sm md:text-base mt-3 max-w-lg drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                  {description}
                </p>
              )}
            </div>
          </div>

          {/* Desktop Inquiry Form */}
          <div className="absolute inset-0 overflow-visible hidden xl:block">
            <div className="max-w-7xl mx-auto h-full px-8 relative flex items-center justify-end">
              <div className="w-full max-w-md z-10">
                <HeroInquiryForm dict={context.dict} locationName={locationName} />
              </div>
            </div>
          </div>
        </div>

        {/* Tablet & Mobile Inquiry Form */}
        <div className="block xl:hidden max-w-7xl mx-auto px-8 pt-6">
          <HeroInquiryForm
            dict={context.dict}
            locationName={locationName}
            className="w-full max-w-none"
          />
        </div>
      </section>
    );
  }

  const actions = (section.items || []) as Array<{
    label: string; href: string; style: string; icon?: string; iconPosition?: string; openInNewTab?: boolean;
  }>;
  const settings = section.settings as Record<string, unknown>;
  const appearance = section.appearance as Record<string, unknown>;

  const minHeight = (settings.minHeight as string) || "85vh";
  const bgImage = (appearance.background as string) || "";
  const bgAlt = (appearance.backgroundAlt as string) || "";
  const overlayOpacity = typeof settings.overlayOpacity === "number" ? settings.overlayOpacity : 85;
  const contentPosition = (settings.contentPosition as string) || "left";
  const buttonLayout = (settings.buttonLayout as string) || "row";
  const overlayGradient = (appearance.overlayGradient as string) || "default";
  const padding = (appearance.padding as string) || "none";
  const border = appearance.border === true;
  const textAlign = (appearance.textAlign as string) || "left";

  const isCentered = section.variant === "centered" || textAlign === "center";
  const isRight = contentPosition === "right";

  const overlayOpacityClass = `from-transparent via-abBlack/${overlayOpacity} to-transparent`;

  const gradientOverlay = (() => {
    switch (overlayGradient) {
      case "left-heavy":
        return "bg-gradient-to-r from-abBlack/95 via-abBlack/70 to-abBlack/30";
      case "bottom-heavy":
        return "bg-gradient-to-t from-abBlack via-transparent to-transparent";
      case "center-heavy":
        return "bg-gradient-to-b from-abBlack/40 via-abBlack/80 to-abBlack/40";
      default:
        return "bg-gradient-to-b from-abBlack/0 via-abBlack/60 to-abBlack/30";
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
          alt={bgAlt || c.title || serviceName || ""}
          fill
          className="object-cover scale-x-130 scale-y-120"
          priority
        />
      )}

      {/* Gradient Overlays */}
      <div className={`absolute inset-0 bg-gradient-to-b ${overlayOpacityClass}`} />
      <div className={`absolute inset-0 ${gradientOverlay}`} />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`max-w-[80%] mx-auto ${
            isCentered ? "mx-auto text-center" : ""
          } ${isRight ? "ml-auto text-right" : ""}`}
        >
          {/* Eyebrow Badge */}
          {c.eyebrow && (
            <div className={`inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-abServiceBlue/10 border border-abServiceBlue/30 mb-6 backdrop-blur-sm ${
              isCentered ? "justify-center" : ""
            }`}>
              <span className="w-2 h-2 rounded-full bg-abServiceBlue animate-pulse" />
              <span className="text-abServiceBlue text-xs font-bold tracking-widest uppercase">
                {c.eyebrow}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            {c.title}
            {c.titleHighlight ? (
              <>
                <br />
                <span className="text-abServiceBlue">{c.titleHighlight}</span>
              </>
            ) : null}
          </h1>

          {/* Description */}
          {c.description && (
            <p className="text-justify text-lg md:text-xl text-gray-300 mb-10 leading-relaxed">
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
                      className="bg-abServiceBlue hover:bg-sky-700 text-white px-8 py-4 rounded text-sm font-bold transition-all shadow-lg shadow-abServiceBlue/20 inline-flex items-center"
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
                      className="bg-abBlack/50 border border-gray-500 text-white hover:border-abServiceBlue hover:bg-abBlack px-8 py-4 rounded text-sm font-semibold transition-all backdrop-blur-sm"
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
                      className="bg-transparent border-b-2 border-abServiceBlue text-white hover:text-abServiceBlue px-4 py-4 text-sm font-semibold transition-all inline-flex items-center"
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
                    className="bg-abBlack/50 border border-gray-500 text-white hover:border-abServiceBlue hover:bg-abBlack px-8 py-4 rounded text-sm font-semibold transition-all backdrop-blur-sm"
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
