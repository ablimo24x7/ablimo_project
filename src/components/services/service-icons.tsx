/**
 * Curated feature-icon registry for services.
 *
 * Stored services reference an icon by its string key so that database
 * content stays serialisable while the public pages can render a matching
 * glyph. The set below is a curated subset of the original inline SVG icons
 * used across the static service pages.
 */

export interface ServiceIconOption {
  value: string;
  label: string;
}

const paths: Record<string, string> = {
  shield:
    "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  clock:
    "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  users:
    "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  map: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
  building:
    "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  route: "M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4",
  plane: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8",
  car: "M5 11l1.5-4.5A2 2 0 018.4 5h7.2a2 2 0 011.9 1.5L19 11M5 11h14a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4a1 1 0 011-1zm2 6v2m10-2v2",
  star: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
  zap: "M13 10V3L4 14h7v7l9-11h-7z",
  globe: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  calendar: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  briefcase: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  gem: "M12 21c-2 0-3-2-5-2s-3 2-3 2 1-3 3-3 1-2 3-2 2 0 4 2 5 2 5 2-1 2-3 2-3-2-4-2z",
  landmark: "M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4",
  bus: "M8 6v-1a1 1 0 011-1h6a1 1 0 011 1v1m0 0h4a2 2 0 012 2v8a2 2 0 01-2 2h-16a2 2 0 01-2-2v-8a2 2 0 012-2h12zM6 14h.01M12 14h.01M18 14h.01M4 18v2m16-2v2",
  gift: "M8 13v-4m0 0H5a2 2 0 010-6h3c1.5 0 2.5.5 3 1.5.5-1 1.5-1.5 3-1.5h3a2 2 0 010 6h-3m0 0v4m0 0V21H8v-8m8 0H8",
  flag: "M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm14 0h2m2 0h-2",
  sparkles:
    "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
};

export const SERVICE_FEATURE_ICON_OPTIONS: ServiceIconOption[] = [
  { value: "shield", label: "Shield" },
  { value: "clock", label: "Clock" },
  { value: "users", label: "Users" },
  { value: "map", label: "Map" },
  { value: "building", label: "Building" },
  { value: "route", label: "Route" },
  { value: "plane", label: "Plane" },
  { value: "car", label: "Car" },
  { value: "star", label: "Star" },
  { value: "zap", label: "Zap" },
  { value: "globe", label: "Globe" },
  { value: "calendar", label: "Calendar" },
  { value: "briefcase", label: "Briefcase" },
  { value: "gem", label: "Gem" },
  { value: "landmark", label: "Landmark" },
  { value: "bus", label: "Bus" },
  { value: "gift", label: "Gift" },
  { value: "flag", label: "Flag" },
  { value: "sparkles", label: "Sparkles" },
];

function ServiceFeatureIconSvg({
  d,
  className,
}: {
  d: string;
  className?: string;
}) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={d} />
    </svg>
  );
}

export function renderServiceIcon(
  key: string | undefined | null,
  className = "w-8 h-8"
): React.ReactNode {
  const d = paths[key ?? ""] ?? paths.shield;
  return <ServiceFeatureIconSvg d={d} className={className} />;
}

export function ServiceIcon({
  name,
  className,
}: {
  name?: string;
  className?: string;
}) {
  return <>{renderServiceIcon(name, className)}</>;
}