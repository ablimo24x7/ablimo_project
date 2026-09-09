import Link from "next/link";
import { getIcon } from "./section-icons";
import type { PageSection } from "./section-types";

interface ServiceCardsSectionProps {
  section: PageSection;
}

export default function ServiceCardsSection({ section }: ServiceCardsSectionProps) {
  const c = section.content as Record<string, string>;
  const items = (section.items || []) as Array<{
    id: string; icon: string; title: string; description: string; wide?: boolean;
    actions?: Array<{ label: string; href: string; style: string }>;
  }>;
  const settings = section.settings as Record<string, string>;
  const appearance = section.appearance as Record<string, string>;

  const columns = settings.columns || "3";
  const bgClass = appearance.theme === "darker" ? "bg-abBlack" : "bg-abDarkGray";

  const gridCols =
    columns === "2" ? "md:grid-cols-2" :
    columns === "4" ? "md:grid-cols-2 lg:grid-cols-4" :
    "md:grid-cols-2 lg:grid-cols-3";

  return (
    <section id="services" className={`py-24 ${bgClass} relative z-20 border-t border-gray-800`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {c.eyebrow && (
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold tracking-widest text-abGold uppercase mb-3">
              {c.eyebrow}
            </h2>
            {c.heading && (
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {c.heading}
              </h3>
            )}
            {c.description && (
              <p className="text-gray-400 text-lg mb-8">{c.description}</p>
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
                className={`service-card bg-abBlack border border-gray-800 p-8 rounded-xl relative overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 hover:border-abGold ${
                  isWide ? "lg:col-span-2" : ""
                }`}
              >
                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-abGold/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />

                {/* Wide Card Layout */}
                {isWide ? (
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 flex items-center justify-center">
                        {getIcon(item.icon, "w-10 h-10 text-gray-300 group-hover:text-abGold transition-colors")}
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
                                  ? "text-abGold hover:underline"
                                  : "text-white hover:text-abGold transition-colors"
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
                      {getIcon(item.icon, "w-8 h-8 text-gray-300 group-hover:text-abGold transition-colors")}
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
                                ? "text-abGold hover:underline"
                                : "text-white text-xs hover:text-abGold transition-colors"
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
      </div>
    </section>
  );
}
