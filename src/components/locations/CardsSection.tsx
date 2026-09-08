"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Plane,
  Network,
  Building2,
  Car,
  MapPin,
  Clock,
  Users,
  Star,
  Briefcase,
  Heart,
  CheckCircle,
  Globe,
  Phone,
  Mail,
  Calendar,
  Award,
  Zap,
} from "lucide-react";
import type { CardsSectionType, CardItemType } from "@/lib/validations/location";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  shield: Shield,
  plane: Plane,
  network: Network,
  building: Building2,
  car: Car,
  "map-pin": MapPin,
  clock: Clock,
  users: Users,
  star: Star,
  briefcase: Briefcase,
  heart: Heart,
  "check-circle": CheckCircle,
  globe: Globe,
  phone: Phone,
  mail: Mail,
  calendar: Calendar,
  award: Award,
  zap: Zap,
};

interface CardsSectionProps {
  section: CardsSectionType;
}

export function CardsSection({ section }: CardsSectionProps) {
  const containerStyle: React.CSSProperties = {};
  if (section.layout.containerWidth) containerStyle.maxWidth = section.layout.containerWidth;
  if (section.spacing.padding) containerStyle.padding = section.spacing.padding;
  if (section.spacing.margin) containerStyle.margin = section.spacing.margin;
  if (section.background.color) containerStyle.backgroundColor = section.background.color;
  if (section.background.gradient) containerStyle.background = section.background.gradient;

  const columns = section.columns === "2" ? 2 : 3;
  const gridClass =
    columns === 2
      ? "grid-cols-1 md:grid-cols-2"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  const vis = section.visibility || { desktop: true, tablet: true, mobile: true };

  return (
    <section
      className={`py-16 px-8 ${vis.desktop ? "" : "hidden"} ${vis.tablet ? "" : "md:hidden"} ${vis.mobile ? "" : "sm:hidden"}`}
      style={containerStyle}
    >
      <div className="max-w-7xl mx-auto">
        {(section.title || section.subtitle) && (
          <div className="text-center mb-12">
            {section.title && (
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                {section.title}
              </h2>
            )}
            {section.subtitle && (
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                {section.subtitle}
              </p>
            )}
          </div>
        )}

        <div
          className={`grid ${gridClass} gap-6`}
          style={section.layout.gap ? { gap: section.layout.gap } : undefined}
        >
          {section.cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ card }: { card: CardItemType }) {
  const IconComponent = card.icon ? ICON_MAP[card.icon] || Star : Star;
  const iconColor = card.iconColor || "#d4a853";

  return (
    <div className="bg-[#1c1d21] rounded-2xl p-6 hover:bg-[#2a2c35] transition-colors group">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
        style={{ backgroundColor: `${iconColor}20` }}
      >
        <IconComponent className="w-6 h-6" style={{ color: iconColor }} />
      </div>

      {card.title && (
        <h3 className="text-xl font-serif font-bold text-white mb-3">
          {card.title}
        </h3>
      )}

      {card.description && (
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          {card.description}
        </p>
      )}

      {card.ctas.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-auto">
          {card.ctas.map((cta, i) => (
            <Link
              key={i}
              href={cta.url || "#"}
              className="inline-flex items-center gap-2 text-abGold hover:text-abGold/80 font-medium transition-colors text-sm"
            >
              {cta.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
