"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";
import { ChannelIcon } from "./ChannelList";
import { WhatsAppPopup } from "./WhatsAppPopup";
import { ContactForm } from "./ContactForm";
import { useWidgetOverride } from "./widget-context";
import { classifyContactMethod, extractWhatsAppNumber, trackContactClick } from "@/lib/analytics";
import { resolveCity, resolveCountry } from "@/lib/locations";

export type PageContext =
  | { type: "service"; name: string; countryName?: string; cityName?: string }
  | { type: "country"; name: string }
  | { type: "city"; name: string };

export type WidgetPage =
  | { kind: "service"; countrySlug: string; citySlug: string }
  | { kind: "location"; countrySlug: string; citySlug: string; isCity: boolean }
  | { kind: "none"; countrySlug: "" };

export function parseWidgetPath(pathname: string): WidgetPage {
  const segments = pathname.split("/");
  const servicesIndex = segments.indexOf("services");
  if (servicesIndex !== -1 && segments[servicesIndex + 1]) {
    return {
      kind: "service",
      countrySlug: segments[servicesIndex + 2] ?? "",
      citySlug: segments[servicesIndex + 3] ?? "",
    };
  }
  const locationsIndex = segments.indexOf("locations");
  if (locationsIndex !== -1) {
    const countrySlug = segments[locationsIndex + 1] ?? "";
    if (countrySlug && countrySlug !== "cities") {
      return {
        kind: "location",
        countrySlug,
        citySlug: segments[locationsIndex + 2] ?? "",
        isCity: Boolean(segments[locationsIndex + 2]),
      };
    }
  }
  return { kind: "none", countrySlug: "" };
}

function prettifySlug(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function canonicalCountrySlug(slug: string): string {
  if (!slug) return "";
  return resolveCountry(slug)?.slug ?? slug;
}

export interface NumberConfig {
  cityWhatsappNumber?: string;
  countryWhatsappNumbers?: { countrySlug: string; number: string }[];
  channels: { id: string; phone: string }[];
}

export function applyWhatsappNumber<C extends NumberConfig>(
  config: C,
  opts: {
    countrySlug: string;
    isCityPage: boolean;
    pageWhatsappNumber?: string | null;
  }
): C {
  const pageOverride = opts.pageWhatsappNumber?.trim();
  const cityNumber = config.cityWhatsappNumber?.trim();
  const countryNumber = opts.countrySlug
    ? config.countryWhatsappNumbers?.find(
        (c) =>
          canonicalCountrySlug(c.countrySlug) === opts.countrySlug && c.number?.trim()
      )?.number?.trim()
    : undefined;
  const override = opts.isCityPage
    ? pageOverride || cityNumber || countryNumber || ""
    : countryNumber || "";
  if (!override) return config;
  return {
    ...config,
    channels: config.channels.map((ch) =>
      ch.id === "whatsapp" ? { ...ch, phone: override } : ch
    ),
  };
}

interface ChannelConfig {
  id: string;
  enabled: boolean;
  label: string;
  phone: string;
  email: string;
  username: string;
  url: string;
  presetMessage: string;
  agentName: string;
  agentAvatar: string;
}

interface WidgetConfig {
  _id: string;
  name: string;
  enabled: boolean;
  channels: ChannelConfig[];
  position: "bottom-right" | "bottom-left";
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  iconSize: number;
  ctaMessage: string;
  ctaTextColor: string;
  ctaBgColor: string;
  showCta: boolean;
  animation: "none" | "bounce" | "pulse" | "shake";
  whatsappPopup: boolean;
  whatsappPopupHeader: string;
  whatsappPopupMsg: string;
  whatsappPopupMsgCountry: string;
  whatsappPopupMsgCity: string;
  cityWhatsappNumber: string;
  countryWhatsappNumbers: { countrySlug: string; number: string }[];
  showAgents: boolean;
}

const CHANNEL_SVG: Record<string, string> = {
  whatsapp:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>',
  messenger:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8.2l3.131 3.259L19.752 8.2l-6.561 6.763z"/></svg>',
  telegram:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>',
  viber:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.995 0C5.367 0 .009 5.357.009 11.977c0 2.09.539 4.142 1.561 5.945L.057 24l6.305-1.654c1.721.93 3.656 1.429 5.633 1.429h.005c6.627-.004 11.986-5.362 11.986-11.988C23.986 5.357 18.622 0 11.995 0zm7.525 14.906c-.317.889-1.554 1.637-2.54 1.868-.67.157-1.543.28-4.483-1.007-3.763-1.647-6.184-5.703-6.37-6.011-.18-.307-1.483-1.976-1.483-3.769s.94-2.675 1.275-3.048c.246-.27.573-.338.763-.338.19 0 .38.002.544.01.46.007.69.047 1 .808.317.962 1.084 3.335 1.178 3.582.095.247.189.563.06.87-.13.317-.287.462-.527.724-.24.262-.467.467-.707.753-.217.255-.456.528-.19.995.258.458 1.147 1.895 2.463 3.07 1.692 1.51 3.113 1.978 3.573 2.196.34.163.722.124.968-.143.313-.342.697-.917 1.09-1.495.278-.41.628-.46.968-.342.343.109 2.164 1.02 2.536 1.207.37.188.62.28.714.434.094.153.094.884-.223 1.773z"/></svg>',
  instagram:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.882 0 1.441 1.441 0 012.882 0z"/></svg>',
  tiktok:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>',
  snapchat:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12.922-.214.079-.03.172-.045.27-.045.285 0 .539.135.734.36.149.149.238.357.254.568 0 .06-.014.12-.044.18-.208.374-.862.55-1.353.66-.09.016-.181.045-.27.075-.075.015-.149.045-.224.075-.36.12-.734.27-.896.51-.09.135-.136.285-.136.435 0 .09.03.18.075.27.134.268.477.448.99.553.06.014.12.044.164.074.18.12.217.3.225.492 0 .044-.015.09-.03.135-.104.283-.518.434-1.006.508-.284.045-.583.09-.731.3-.015.03-.031.075-.045.12-.06.223-.195.39-.463.478-.075.03-.164.045-.255.06-.21.029-.434.09-.573.27-.03.044-.074.104-.12.164-.164.21-.463.3-1.02.3-.15 0-.314-.015-.48-.045a1.128 1.128 0 00-.27-.03c-.15 0-.3.015-.435.06-.374.119-.644.374-.854.658-.18.24-.36.495-.764.69-.463.21-1.05.33-1.74.36-.09.015-.18.015-.27.015-.165 0-.315-.015-.465-.045l-.06-.015c-.12-.03-.24-.045-.375-.06-.285-.03-.555-.015-.825.06-.464.12-.809.375-1.228.615l-.03.015c-.165.09-.345.165-.525.225-.3.09-.6.135-.9.135h-.06c-.3 0-.6-.045-.9-.135-.18-.06-.36-.135-.525-.225l-.03-.015c-.42-.24-.764-.495-1.228-.615a2.81 2.81 0 00-.825-.06c-.135.015-.255.03-.375.06l-.06.015c-.15.03-.3.045-.465.045-.09 0-.18 0-.27-.015-.69-.03-1.277-.15-1.74-.36-.404-.195-.584-.45-.764-.69a2.097 2.097 0 00-.854-.658 1.798 1.798 0 00-.435-.06c-.135 0-.285.015-.435.06-.268-.09-.403-.258-.463-.478-.015-.045-.03-.09-.045-.12-.048-.21-.347-.255-.731-.3-.488-.074-.902-.225-1.006-.508a.652.652 0 01-.03-.135c.008-.192.045-.372.225-.492.045-.03.105-.06.165-.074.09-.015.18-.045.27-.075.491-.11 1.145-.286 1.353-.66.03-.06.044-.12.044-.18a.835.835 0 01.254-.568c.195-.225.449-.36.734-.36.098 0 .191.015.27.045.263.094.622.198.922.214.198 0 .326-.045.401-.09-.008-.165-.018-.33-.03-.51l-.003-.06c-.104-1.628-.23-3.654.3-4.847C7.359 1.069 10.716.793 11.706.793h.5z"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  linkedin:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
  line: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.271.173-.508.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>',
  wechat:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.047c.134 0 .24-.108.24-.243 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 01-.023-.156.49.49 0 01.201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088v-.002c-.135-.01-.27-.023-.406-.032zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982z"/></svg>',
  discord:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>',
  sms: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>',
  email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
  "google-maps":
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>',
  waze: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm-2 5a2 2 0 100 4 2 2 0 000-4zm4 0a2 2 0 100 4 2 2 0 000-4zm-4 6c0 2.5 4 4 4 4s4-1.5 4-4H8z"/></svg>',
};

const ANIMATIONS: Record<string, string> = {
  none: "",
  bounce: "animate-[bounce_2s_infinite]",
  pulse: "animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]",
  shake: "animate-[shake_0.5s_ease-in-out_infinite]",
};

export function ChatWidget() {
  const pathname = usePathname();
  const [config, setConfig] = useState<WidgetConfig | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showWhatsAppPopup, setShowWhatsAppPopup] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<string>("");
  const { isCityTemplate, pageWhatsappNumber } = useWidgetOverride();

  const page = useMemo(() => parseWidgetPath(pathname), [pathname]);
  const shouldRender = page.kind !== "none";
  const countrySlug = useMemo(
    () => canonicalCountrySlug(page.countrySlug),
    [page.countrySlug]
  );

  const pageContext = useMemo<PageContext | null>(() => {
    if (page.kind === "service") {
      const match = pathname.match(/\/[^/]+\/services\/([^/]+)/);
      const name = match ? prettifySlug(match[1]) : null;
      if (!name) return null;
      const country = page.countrySlug ? resolveCountry(page.countrySlug) : undefined;
      const cityName =
        country && page.citySlug
          ? resolveCity(country, page.citySlug)?.name || prettifySlug(page.citySlug)
          : undefined;
      return {
        type: "service",
        name,
        countryName: country?.name,
        cityName,
      };
    }
    if (page.kind === "location") {
      const country = resolveCountry(page.countrySlug);
      if (!country) return null;
      if (page.isCity) {
        const city = resolveCity(country, page.citySlug);
        return { type: "city", name: city?.name || prettifySlug(page.citySlug) };
      }
      return { type: "country", name: country.name };
    }
    return null;
  }, [page, pathname]);

  useEffect(() => {
    if (!shouldRender) return;
    fetch("/api/chat/config")
      .then((r) => r.json())
      .then((data) => {
        if (data && data.enabled) setConfig(data);
      })
      .catch(() => {});
  }, [shouldRender]);

  const handleChannelClick = useCallback(
    (channelId: string, url: string) => {
      if (channelId === "whatsapp" && config?.whatsappPopup) {
        setSelectedChannel(channelId);
        setShowWhatsAppPopup(true);
        setIsOpen(false);
        return;
      }
      if (channelId === "contact-form") {
        setSelectedChannel(channelId);
        setShowContactForm(true);
        setIsOpen(false);
        return;
      }
      window.open(url, "_blank", "noopener,noreferrer");
      trackContactClick({
        method: classifyContactMethod(url) ?? "other",
        location: "chat_widget",
        label: `channel:${channelId}`,
        page_path: pathname,
        whatsapp_number: extractWhatsAppNumber(url),
      });
    },
    [config, pathname]
  );

  // Number priority: page override > global city number > country number > channel phone.
  // Location country pages resolve the country number only; location city pages
  // (and airport/route sub-pages) resolve like city templates.
  const effectiveConfig = useMemo(() => {
    if (!config) return null;
    const isCityPage = isCityTemplate || (page.kind === "location" && page.isCity);
    return applyWhatsappNumber(config, {
      countrySlug,
      isCityPage,
      pageWhatsappNumber,
    });
  }, [config, isCityTemplate, page, pageWhatsappNumber, countrySlug]);

  if (!shouldRender || !effectiveConfig || !effectiveConfig.enabled) return null;

  const enabledChannels = effectiveConfig.channels.filter((c) => c.enabled);
  if (enabledChannels.length === 0) return null;

  const posClass =
    effectiveConfig.position === "bottom-left" ? "left-4" : "right-4";
  const animClass = ANIMATIONS[effectiveConfig.animation] || "";

  return (
    <>
      <div
        className={`fixed bottom-4 ${posClass} z-[9999] flex flex-col items-end gap-3`}
        style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
      >
        {isOpen && (
          <div
            className="rounded-xl shadow-2xl border overflow-hidden w-[320px] max-h-[480px] flex flex-col"
            style={{
              backgroundColor: effectiveConfig.backgroundColor,
              borderColor: "#e5e7eb",
            }}
          >
            <div
              className="px-4 py-3 text-center font-semibold text-sm"
              style={{
                backgroundColor: effectiveConfig.primaryColor,
                color: "#fff",
              }}
            >
              {effectiveConfig.ctaMessage || "Chat with us!"}
            </div>
            <div className="overflow-y-auto flex-1 p-2">
              {enabledChannels.map((ch) => (
                <ChannelIcon
                  key={ch.id}
                  channel={ch}
                  onClick={handleChannelClick}
                  config={effectiveConfig}
                />
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative flex items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${animClass}`}
          style={{
            width: effectiveConfig.iconSize,
            height: effectiveConfig.iconSize,
            backgroundColor: effectiveConfig.primaryColor,
          }}
          aria-label="Open chat"
        >
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="white"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="white"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          )}
          {effectiveConfig.showCta && !isOpen && effectiveConfig.ctaMessage && (
            <div
              className="absolute right-full mr-3 whitespace-nowrap px-3 py-1.5 rounded-lg text-sm font-medium shadow-md"
              style={{
                backgroundColor: effectiveConfig.ctaBgColor,
                color: effectiveConfig.ctaTextColor,
              }}
            >
              {effectiveConfig.ctaMessage}
            </div>
          )}
        </button>
      </div>

      {showWhatsAppPopup && (
        <WhatsAppPopup
          config={effectiveConfig}
          pageContext={pageContext}
          onClose={() => setShowWhatsAppPopup(false)}
        />
      )}

      {showContactForm && (
        <ContactForm
          config={effectiveConfig}
          pageContext={pageContext}
          onClose={() => setShowContactForm(false)}
        />
      )}
    </>
  );
}
