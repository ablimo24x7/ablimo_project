import Link from "next/link";
import { getIcon } from "./section-icons";
import type { PageSection } from "./section-types";
import type { SectionInstance } from "@/components/section-library/types";

interface CTABannerSectionProps {
  section: PageSection | SectionInstance;
}

const PADDING_CLASSES = {
  none: "",
  sm: "py-12",
  md: "py-16",
  lg: "py-24",
  xl: "py-32",
} as const;

export default function CTABannerSection({ section }: CTABannerSectionProps) {
  const c = section.content as Record<string, string>;
  const actions = (section.items || []) as Array<{
    label: string; href: string; style: string; icon?: string; iconPosition?: string;
  }>;
  const appearance = section.appearance as Record<string, unknown>;

  const bgClass = appearance.theme === "darker" ? "bg-abBlack" : "bg-abDarkGray";
  const padding = (appearance.padding as string) || "lg";
  const border = appearance.border === "true" || appearance.border === true;
  const textAlign = (appearance.textAlign as string) || "center";

  const textAlignClass = textAlign === "center" ? "text-center" : textAlign === "left" ? "text-left" : "text-right";

  return (
    <section className={`${PADDING_CLASSES[padding as keyof typeof PADDING_CLASSES] || "py-24"} ${bgClass} ${border ? "border-t border-gray-800" : ""}`}>
      <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ${textAlignClass}`}>
        {c.heading && (
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{c.heading}</h2>
        )}
        {c.description && (
          <p className={`text-gray-300 text-lg mb-6 ${textAlign === "center" ? "max-w-2xl mx-auto" : ""}`}>{c.description}</p>
        )}
        {c.subheading && (
          <h3 className="text-xl font-bold text-white mt-6 mb-2">{c.subheading}</h3>
        )}
        {c.subdescription && (
          <p className={`text-gray-400 mb-8 ${textAlign === "center" ? "max-w-2xl mx-auto" : ""}`}>{c.subdescription}</p>
        )}
        {actions.length > 0 && (
          <div className={`flex flex-wrap gap-4 ${textAlign === "center" ? "justify-center" : ""} ${textAlign === "right" ? "justify-end" : ""}`}>
            {actions.map((action, i) => {
              const iconEl = action.icon ? getIcon(action.icon, "w-4 h-4 mr-2") : null;
              const isRight = action.iconPosition === "right";
              if (action.style === "primary") {
                return (
                  <Link
                    key={i}
                    href={action.href && action.href.trim() && !action.href.trim().startsWith("#") ? action.href : "/contact"}
                    className="inline-flex items-center justify-center bg-abServiceBlue hover:bg-sky-700 text-white px-10 py-4 rounded font-bold transition-all shadow-lg shadow-abServiceBlue/20"
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
                    href={action.href && action.href.trim() && !action.href.trim().startsWith("#") ? action.href : "/contact"}
                    className="inline-flex items-center justify-center bg-transparent border border-abServiceBlue text-abServiceBlue hover:bg-abServiceBlue hover:text-white px-8 py-3.5 rounded text-sm font-semibold transition-all"
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
                  href={action.href && action.href.trim() && !action.href.trim().startsWith("#") ? action.href : "/contact"}
                  className="inline-flex items-center justify-center bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white px-6 py-3 rounded text-sm font-semibold transition-all"
                >
                  {action.label}
                  {iconEl && <span className="ml-2">{iconEl}</span>}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
