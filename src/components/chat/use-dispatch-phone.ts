"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { useWidgetOverride } from "./widget-context";
import {
  canonicalCountrySlug,
  parseWidgetPath,
  resolveEffectivePhone,
  resolveLocationNames,
} from "@/lib/chat/number-resolution";

interface DispatchConfigLite {
  universalWhatsappNumber?: string;
  cityWhatsappNumber?: string;
  countryWhatsappNumbers?: { countrySlug: string; number: string }[];
  channels: { id: string; phone: string }[];
}

let configPromise: Promise<DispatchConfigLite | null> | null = null;

function fetchDispatchConfig(): Promise<DispatchConfigLite | null> {
  if (!configPromise) {
    configPromise = fetch("/api/chat/config")
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null);
  }
  return configPromise;
}

export interface DispatchContact {
  /** Resolved dispatch phone (digits with leading "+"), or "" when unresolvable. */
  phone: string;
  /** City display name for the current pathname, when applicable. */
  cityName?: string;
  /** Country display name for the current pathname, when applicable. */
  countryName?: string;
}

/**
 * Resolve the page's dispatch contact using the same number-priority chain
 * as the chat widget (page override > city number > country number >
 * WhatsApp channel phone), plus the city name for dynamic labels.
 */
export function useDispatchPhone(): DispatchContact {
  const pathname = usePathname();
  const { isCityTemplate, pageWhatsappNumber } = useWidgetOverride();
  const [config, setConfig] = React.useState<DispatchConfigLite | null>(null);

  React.useEffect(() => {
    let active = true;
    fetchDispatchConfig().then((data) => {
      if (active) setConfig(data);
    });
    return () => {
      active = false;
    };
  }, []);

  return React.useMemo(() => {
    const page = parseWidgetPath(pathname);
    const isCityPage = isCityTemplate || (page.kind === "location" && page.isCity);
    const phone = resolveEffectivePhone(config, {
      countrySlug: canonicalCountrySlug(page.countrySlug),
      isCityPage,
      pageWhatsappNumber,
    });
    const { cityName, countryName } = resolveLocationNames(pathname);
    return { phone, cityName, countryName };
  }, [config, isCityTemplate, pageWhatsappNumber, pathname]);
}
