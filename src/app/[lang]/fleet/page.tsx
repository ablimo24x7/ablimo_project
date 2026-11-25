import type { Metadata } from "next";
import { hasLocale, localeHome } from "@/app/[lang]/dictionaries";
import { generateSeoMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";
import {
  FLEET_ALL_CLASSES,
  FLEET_LABELS,
  FLEET_MAIN_CLASSES,
  FLEET_QUICK_CLASSES,
  FLEET_VEHICLES,
  fleetLang,
  fleetUrl,
} from "@/lib/fleet";
import FleetInteractiveShowcase from "@/components/fleet/FleetInteractiveShowcase";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isAr = hasLocale(lang) && lang === "ar";
  return generateSeoMetadata({
    title: isAr
      ? "أسطولنا | سيدان فاخرة ودفع رباعي وفان وحافلات | AB"
      : "Our Fleet | Luxury Sedans, SUVs, Vans & Coaches | AB",
    description: isAr
      ? "استكشف أسطول AB: سيدان فاخرة مرسيدس فئة S، سيارات دفع رباعي كاديلاك اسكاليد، فان أعمال فئة V، MPV هيونداي ستاريا، وحافلات VIP. موديلات حديثة باللون الأسود بسائق."
      : "Explore the AB fleet: Mercedes S-Class luxury sedans, Cadillac Escalade SUVs, V-Class business vans, Hyundai Staria MPVs and 16–45 seat VIP coaches. Late-model, strictly black, chauffeur-driven.",
    path: "/fleet",
    lang,
    keywords:
      "AB fleet, luxury sedan, Mercedes S-Class, Cadillac Escalade, Mercedes V-Class, Hyundai Staria, VIP coach, minibus rental, corporate fleet, black car service",
  });
}

export default async function FleetPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l = fleetLang(lang);
  const labels = FLEET_LABELS[l];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: labels.home, url: `${localeHome(lang)}` },
          { name: labels.breadcrumbFleet, url: fleetUrl(lang) },
        ]}
      />

      <FleetInteractiveShowcase
        lang={lang}
        l={l}
        classes={FLEET_ALL_CLASSES}
        mainClasses={FLEET_MAIN_CLASSES}
        quickClasses={FLEET_QUICK_CLASSES}
        allVehicles={FLEET_VEHICLES}
      />
    </>
  );
}
