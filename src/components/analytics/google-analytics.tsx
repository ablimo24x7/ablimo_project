"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { GoogleAnalytics } from "@next/third-parties/google";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";
const GA_DEBUG = process.env.NEXT_PUBLIC_GA_DEBUG === "true";

const GA_ENABLED =
  GA_MEASUREMENT_ID.length > 0 &&
  (process.env.NODE_ENV !== "development" || GA_DEBUG);

const INTERNAL_PATH = /^\/(dashboard|auth|invite)(\/|$)/;

export default function Analytics() {
  const pathname = usePathname();
  const internal = INTERNAL_PATH.test(pathname);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    const flag = `ga-disable-${GA_MEASUREMENT_ID}`;
    const win = window as unknown as Record<string, boolean>;
    win[flag] = internal;
    return () => {
      win[flag] = false;
    };
  }, [internal]);

  if (!GA_ENABLED || internal) return null;

  return <GoogleAnalytics gaId={GA_MEASUREMENT_ID} debugMode={GA_DEBUG} />;
}
