"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";
import { ChannelIcon } from "./ChannelList";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { WhatsAppPopup } from "./WhatsAppPopup";
import { ContactForm } from "./ContactForm";
import { useWidgetOverride } from "./widget-context";
import { classifyContactMethod, extractWhatsAppNumber, trackContactClick } from "@/lib/analytics";
import { resolveCity, resolveCountry } from "@/lib/locations";
import {
  applyWhatsappNumber,
  canonicalCountrySlug,
  parseWidgetPath,
  prettifySlug,
} from "@/lib/chat/number-resolution";
import type { PageContext } from "@/lib/chat/number-resolution";

export type {
  PageContext,
  WidgetPage,
  NumberConfig,
} from "@/lib/chat/number-resolution";
export {
  parseWidgetPath,
  applyWhatsappNumber,
} from "@/lib/chat/number-resolution";

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
  universalWhatsappNumber: string;
  cityWhatsappNumber: string;
  countryWhatsappNumbers: { countrySlug: string; number: string }[];
  showAgents: boolean;
}

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
  const isDashboard = pathname.includes("/dashboard");
  const countrySlug = useMemo(
    () => canonicalCountrySlug(page.countrySlug),
    [page.countrySlug]
  );

  const pageContext = useMemo<PageContext | null>(() => {
    if (page.kind === "service") {
      const name = page.serviceSlug ? prettifySlug(page.serviceSlug) : null;
      if (!name) return null;
      const country = page.countrySlug ? resolveCountry(page.countrySlug) : undefined;
      const countryName = country
        ? country.name
        : page.countrySlug
          ? prettifySlug(page.countrySlug)
          : undefined;
      const cityName = page.citySlug
        ? (country ? resolveCity(country, page.citySlug)?.name : undefined) ||
          prettifySlug(page.citySlug)
        : undefined;
      return {
        type: "service",
        name,
        countryName,
        cityName,
      };
    }
    if (page.kind === "location") {
      const country = resolveCountry(page.countrySlug);
      if (page.isCity) {
        const city = country ? resolveCity(country, page.citySlug) : undefined;
        return { type: "city", name: city?.name || prettifySlug(page.citySlug) };
      }
      return { type: "country", name: country?.name || prettifySlug(page.countrySlug) };
    }
    return null;
  }, [page]);

  useEffect(() => {
    if (isDashboard) return;
    fetch("/api/chat/config")
      .then((r) => r.json())
      .then((data) => {
        if (data && data.enabled) setConfig(data);
      })
      .catch(() => {});
  }, [isDashboard]);

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

  // Number priority:
  //   city pages   â†’ page override > city number > country number > channel phone
  //   country pages â†’ country number > channel phone
  //   all other pages (homepage, main services, blog, â€¦) â†’ universal number > channel phone
  const effectiveConfig = useMemo(() => {
    if (!config) return null;
    const isCityPage = isCityTemplate || (page.kind === "location" && page.isCity);
    return applyWhatsappNumber(config, {
      countrySlug,
      isCityPage,
      pageWhatsappNumber,
    });
  }, [config, isCityTemplate, page, pageWhatsappNumber, countrySlug]);

  if (isDashboard || !effectiveConfig || !effectiveConfig.enabled) return null;

  const enabledChannels = effectiveConfig.channels.filter((c) => c.enabled);
  if (enabledChannels.length === 0) return null;

  /** When WhatsApp is on, the launcher button shows the WhatsApp mark. */
  const hasWhatsAppChannel = enabledChannels.some((c) => c.id === "whatsapp");

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
          className={`relative flex items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 text-white ${animClass}`}
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
          ) : hasWhatsAppChannel ? (
            <WhatsAppIcon
              className="relative z-10"
              style={{
                width: Math.round(effectiveConfig.iconSize * 0.46),
                height: Math.round(effectiveConfig.iconSize * 0.46),
              }}
            />
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
