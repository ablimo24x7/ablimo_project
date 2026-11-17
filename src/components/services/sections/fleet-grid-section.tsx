import Image from "next/image";
import Link from "next/link";
import { getIcon } from "./section-icons";
import type { PageSection } from "./section-types";

interface FleetGridSectionProps {
  section: PageSection;
}

const PADDING_CLASSES = {
  none: "",
  sm: "py-12",
  md: "py-16",
  lg: "py-24",
  xl: "py-32",
} as const;

export default function FleetGridSection({ section }: FleetGridSectionProps) {
  const c = section.content as Record<string, unknown>;
  const items = (section.items || []) as Array<{
    id: string; badge?: string; badgeStyle?: string; image: string; imageAlt?: string;
    category: string; name: string; idealFor?: string; description?: string;
    capacity: string; bags: string;
    capacityIcon?: string; bagsIcon?: string;
    actions?: Array<{ label: string; href: string }>;
  }>;
  const settings = section.settings as Record<string, unknown>;
  const appearance = section.appearance as Record<string, unknown>;

  const columns = settings.columns || "4";
  const bgClass = appearance.theme === "darker" ? "bg-abBlack" : "bg-abDarkGray";
  const padding = (appearance.padding as string) || "lg";
  const border = appearance.border === "true" || appearance.border === true;
  const textAlign = (appearance.textAlign as string) || "left";

  const headerAction = c.headerAction as { label?: string; href?: string } | undefined;
  const bottomCta = c.bottomCta as { label?: string; href?: string; style?: string; icon?: string } | undefined;

  const gridCols =
    columns === "2" ? "md:grid-cols-2" :
    columns === "3" ? "md:grid-cols-2 lg:grid-cols-3" :
    "md:grid-cols-2 lg:grid-cols-4";

  const textAlignClass = textAlign === "center" ? "text-center" : textAlign === "right" ? "text-right" : "text-left";

  return (
    <section id="fleet" className={`${PADDING_CLASSES[padding as keyof typeof PADDING_CLASSES] || "py-24"} ${bgClass} ${border ? "border-t border-gray-800" : ""}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className={`max-w-3xl ${textAlignClass}`}>
            {(c.eyebrow as string) && (
              <h2 className="text-sm font-bold tracking-widest text-abServiceBlue uppercase mb-2">
                {c.eyebrow as string}
              </h2>
            )}
            {(c.heading as string) && (
              <h3 className="text-3xl md:text-4xl font-bold text-white">
                {c.heading as string}
              </h3>
            )}
            {(c.description as string) && (
              <p className="mt-4 text-gray-400">{c.description as string}</p>
            )}
          </div>
          {headerAction?.label && (
            <div className="mt-6 md:mt-0 flex flex-col items-end space-y-3">
              <Link
                href={headerAction.href || "#"}
                className="text-abServiceBlue font-semibold hover:text-sky-400 border-b-2 border-abServiceBlue pb-1 transition-colors inline-flex items-center text-sm"
              >
                {headerAction.label}
                <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </div>

        {/* Fleet Grid */}
        <div className={`grid grid-cols-1 ${gridCols} gap-6`}>
          {items.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-abDarkGray rounded-xl shadow-sm border border-gray-800 overflow-hidden hover:border-gray-600 transition-colors group"
            >
              {/* Vehicle Image */}
              <div className={`bg-black h-48 flex items-center justify-center relative ${vehicle.image?.startsWith("/locations/") ? "p-0 overflow-hidden" : "p-4"}`}>
                {vehicle.badge && (
                  <div
                    className={`absolute top-4 left-4 z-10 text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded shadow ${
                      vehicle.badgeStyle === "accent"
                        ? "bg-abServiceBlue/20 border border-abServiceBlue text-abServiceBlue"
                        : "bg-gray-900/90 border border-gray-700 text-white"
                    }`}
                  >
                    {vehicle.badge}
                  </div>
                )}
                {vehicle.image ? (
                  <Image
                    src={vehicle.image}
                    alt={vehicle.imageAlt || vehicle.name}
                    width={400}
                    height={240}
                    className={`w-full h-full group-hover:scale-105 transition-transform ${
                      vehicle.image.startsWith("/locations/")
                        ? "object-cover"
                        : "object-contain drop-shadow-xl"
                    }`}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black">
                    <svg className="w-20 h-20 text-gray-700 mb-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                    </svg>
                    <span className="text-gray-600 text-xs font-medium">Add vehicle image</span>
                  </div>
                )}
              </div>

              {/* Vehicle Info */}
              <div className="p-6 flex flex-col">
                <h4 className="text-lg font-bold text-white mb-1">{vehicle.category}</h4>
                {vehicle.name ? (
                  <p className="text-sm text-abServiceBlue font-medium mb-2">
                    {vehicle.name.startsWith("Typical model")
                      ? vehicle.name
                      : `Typical model: ${vehicle.name}`}
                  </p>
                ) : null}
                {vehicle.idealFor && (
                  <p className="text-xs text-gray-300 font-medium mb-2">
                    {vehicle.idealFor.startsWith("Ideal for")
                      ? vehicle.idealFor
                      : `Ideal for: ${vehicle.idealFor}`}
                  </p>
                )}
                {vehicle.description && (
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">
                    {vehicle.description}
                  </p>
                )}
                <div className="flex justify-between items-center text-xs text-gray-400 border-t border-gray-800 pt-4 mb-4">
                  <span className="flex items-center">
                    {getIcon(vehicle.capacityIcon || "Users", "w-3.5 h-3.5 mr-1.5 text-gray-500")}
                    {vehicle.capacity}
                  </span>
                  <span className="flex items-center">
                    {getIcon(vehicle.bagsIcon || "Briefcase", "w-3.5 h-3.5 mr-1.5 text-gray-500")}
                    {vehicle.bags}
                  </span>
                </div>
                {vehicle.actions && vehicle.actions.length > 0 ? (
                  <div className="space-y-2.5">
                    <Link
                      href={vehicle.actions[0].href || "/book"}
                      className="block w-full text-center bg-abServiceBlue hover:bg-sky-700 text-white text-xs font-semibold py-2.5 rounded transition-colors"
                    >
                      {vehicle.actions[0].label}
                    </Link>
                    {vehicle.actions.length > 1 && (
                      <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1 justify-center">
                        {vehicle.actions.slice(1).map((action, i) => (
                          <Link
                            key={i}
                            href={action.href || "/contact"}
                            className="text-[11px] text-gray-400 hover:text-abServiceBlue underline-offset-2 hover:underline transition-colors"
                          >
                            {action.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href="/contact"
                    className="block w-full text-center bg-gray-800 hover:bg-gray-700 text-white text-xs font-semibold py-2 rounded transition-colors border border-gray-700"
                  >
                    Request Allocation
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        {bottomCta?.label && (
          <div className="mt-12 text-center">
            <Link
              href={bottomCta.href || "#"}
              className={`inline-flex items-center px-8 py-3.5 rounded text-sm font-semibold transition-all ${
                bottomCta.style === "primary"
                  ? "bg-abServiceBlue hover:bg-sky-700 text-white shadow-lg shadow-abServiceBlue/20"
                  : bottomCta.style === "secondary"
                  ? "bg-transparent border border-abServiceBlue text-abServiceBlue hover:bg-abServiceBlue hover:text-white"
                  : "bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white"
              }`}
            >
              {bottomCta.label}
              {bottomCta.icon && <span className="ml-2">{getIcon(bottomCta.icon, "w-4 h-4")}</span>}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
