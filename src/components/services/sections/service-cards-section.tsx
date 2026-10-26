import Link from "next/link";
import { getIcon } from "./section-icons";
import type { PageSection } from "./section-types";
import type { SectionInstance, SectionRenderContext } from "@/components/section-library/types";

interface ServiceCardsSectionProps {
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

function CtaButton({ cta }: { cta: { label?: string; href?: string; style?: string; icon?: string; iconPosition?: string } }) {
  if (!cta.label) return null;
  const iconEl = cta.icon ? getIcon(cta.icon, "w-4 h-4 mr-2") : null;
  const isRight = cta.iconPosition === "right";
  return (
    <Link
      href={cta.href || "#"}
      className={`inline-flex items-center justify-center px-8 py-3.5 rounded text-sm font-semibold transition-all ${
        cta.style === "primary"
          ? "bg-abServiceBlue hover:bg-sky-700 text-white shadow-lg shadow-abServiceBlue/20"
          : cta.style === "secondary"
          ? "bg-transparent border border-abServiceBlue text-abServiceBlue hover:bg-abServiceBlue hover:text-white"
          : "bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white"
      }`}
    >
      {!isRight && iconEl}
      {cta.label}
      {isRight && iconEl && <span className="ml-2">{iconEl}</span>}
    </Link>
  );
}

const CONTEXT_CARD_ICONS = ["Crown", "Briefcase", "Plane", "Users", "Map", "Clock"];

export default function ServiceCardsSection({ section, context }: ServiceCardsSectionProps) {
  const c = section.content as Record<string, unknown>;
  const settings = section.settings as Record<string, unknown>;
  const source = (settings.source as string) || "inline";

  // context-bound: live services from the page context (country/city pages)
  const contextServices =
    source === "context.services" && context?.kind === "location"
      ? context.services
      : null;

  const items: Array<{
    id: string; icon: string; title: string; description: string; wide?: boolean;
    actions?: Array<{ label: string; href: string; style: string }>;
  }> = contextServices
    ? contextServices.slice(0, 6).map((svc, index) => ({
        id: svc.serviceSlug,
        icon: CONTEXT_CARD_ICONS[index % CONTEXT_CARD_ICONS.length],
        title: svc.name,
        description:
          svc.description ||
          `Premium chauffeur-driven transportation with AB in ${context?.kind === "location" ? context.country.name : ""}.`,
        actions: [{ label: "View Details", href: svc.href, style: "text" }],
      }))
    : ((section.items || []) as Array<{
        id: string; icon: string; title: string; description: string; wide?: boolean;
        actions?: Array<{ label: string; href: string; style: string }>;
      }>);
  const appearance = section.appearance as Record<string, unknown>;

  const columns = settings.columns || "3";
  const bgClass = appearance.theme === "darker" ? "bg-abBlack" : "bg-abDarkGray";
  const padding = (appearance.padding as string) || "lg";
  const border = appearance.border === "true" || appearance.border === true;
  const textAlign = (appearance.textAlign as string) || "center";

  const sectionCta = c.sectionCta as { label?: string; href?: string; style?: string; icon?: string } | undefined;
  const bottomCta = c.bottomCta as { label?: string; href?: string; style?: string; icon?: string } | undefined;

  const gridCols =
    columns === "2" ? "md:grid-cols-2" :
    columns === "4" ? "md:grid-cols-2 lg:grid-cols-4" :
    "md:grid-cols-2 lg:grid-cols-3";

  const textAlignClass = textAlign === "center" ? "text-center" : textAlign === "left" ? "text-left" : "text-right";

  return (
    <section id="services" className={`${PADDING_CLASSES[padding as keyof typeof PADDING_CLASSES] || "py-24"} ${bgClass} relative z-20 ${border ? "border-t border-gray-800" : ""}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(!!c.eyebrow || !!c.heading || !!c.description || !!sectionCta?.label) && (
          <div className={`${textAlignClass} max-w-3xl ${textAlign === "center" ? "mx-auto" : ""} mb-16`}>
            {(c.eyebrow as string) && (
              <h2 className="text-sm font-bold tracking-widest text-abServiceBlue uppercase mb-3">
                {c.eyebrow as string}
              </h2>
            )}
            {(c.heading as string) && (
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {c.heading as string}
              </h3>
            )}
            {(c.description as string) && (
              <p className="text-gray-400 text-lg mb-8">{c.description as string}</p>
            )}
            {/* Header CTA */}
            {sectionCta?.label && (
              <div className={`flex gap-4 ${textAlign === "center" ? "justify-center" : ""}`}>
                <CtaButton cta={sectionCta} />
              </div>
            )}
          </div>
        )}

        {/* Cards Grid */}
        <div className={`grid ${gridCols} gap-8`}>
          {items.map((item) => {
            const isWide = item.wide && columns === "3";
            return (
              <div
                key={item.id}
                className={`service-card bg-abBlack border border-gray-800 p-8 rounded-xl relative overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 hover:border-abServiceBlue ${
                  isWide ? "lg:col-span-2" : ""
                }`}
              >
                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-abServiceBlue/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />

                {/* Wide Card Layout */}
                {isWide ? (
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 flex items-center justify-center">
                        {getIcon(item.icon, "w-10 h-10 text-gray-300 group-hover:text-abServiceBlue transition-colors")}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">{item.description}</p>
                      {item.actions && item.actions.length > 0 && (
                        <div className="flex items-center space-x-6">
                          {item.actions.map((action, ai) => (
                            <Link
                              key={ai}
                              href={action.href || "#"}
                              className={`inline-flex items-center text-sm font-semibold ${
                                action.style === "accent"
                                  ? "text-abServiceBlue hover:underline"
                                  : "text-white hover:text-abServiceBlue transition-colors"
                              }`}
                            >
                              {action.label}
                              {action.style === "accent" && (
                                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              )}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Standard Card Layout */}
                    <div className="mb-6">
                      {getIcon(item.icon, "w-8 h-8 text-gray-300 group-hover:text-abServiceBlue transition-colors")}
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">{item.description}</p>
                    {item.actions && item.actions.length > 0 && (
                      <div className="flex flex-col space-y-3">
                        {item.actions.map((action, ai) => (
                          <Link
                            key={ai}
                            href={action.href || "#"}
                            className={`inline-flex items-center text-sm font-semibold ${
                              action.style === "accent"
                                ? "text-abServiceBlue hover:underline"
                                : "text-white text-xs hover:text-abServiceBlue transition-colors"
                            }`}
                          >
                            {action.label}
                            {action.style === "accent" && (
                              <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        {bottomCta?.label && (
          <div className="mt-16 text-center">
            <CtaButton cta={bottomCta} />
          </div>
        )}
      </div>
    </section>
  );
}
