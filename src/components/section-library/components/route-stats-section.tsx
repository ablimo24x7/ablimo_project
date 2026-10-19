import { getIcon } from "@/components/services/sections/section-icons";
import type { SectionInstance } from "../types";

interface RouteStatsSectionProps {
  section: SectionInstance;
}

interface StatItem {
  id: string;
  icon?: string;
  label: string;
  value: string;
}

export default function RouteStatsSection({ section }: RouteStatsSectionProps) {
  const stats = (section.items ?? []) as unknown as StatItem[];
  if (stats.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <div
            key={stat.id || index}
            className="bg-[#1c1d21] p-8 rounded-2xl text-center"
          >
            <div className="text-gray-400 mb-4">
              {stat.icon ? (
                getIcon(stat.icon, "w-10 h-10 mx-auto")
              ) : (
                <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              )}
            </div>
            <p className="text-3xl font-bold mb-1">{stat.value}</p>
            <p className="text-gray-400 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
