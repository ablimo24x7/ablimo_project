"use client";

import { useState } from "react";
import { trackContactClick } from "@/lib/analytics";
import { WhatsAppIcon } from "./WhatsAppIcon";
import type { PageContext } from "./ChatWidget";

interface WidgetConfig {
  whatsappPopupHeader: string;
  whatsappPopupMsg?: string;
  whatsappPopupMsgCountry?: string;
  whatsappPopupMsgCity?: string;
  primaryColor: string;
  channels: Array<{
    id: string;
    enabled: boolean;
    phone: string;
    presetMessage: string;
    agentName: string;
    agentAvatar: string;
  }>;
}

interface WhatsAppPopupProps {
  config: WidgetConfig;
  pageContext: PageContext | null;
  onClose: () => void;
}

function insertLocation(message: string, location: string): string {
  const suffix = ` in ${location}`;
  if (/[.!?]\s*$/.test(message)) {
    return message.replace(/([.!?])\s*$/, `${suffix}$1`);
  }
  return `${message}${suffix}`;
}

/** Never show raw {service}/{country}/{city} tokens to the user. */
function stripPlaceholders(message: string): string {
  return message
    .replace(/\s*\{(service|country|city)\}\s*/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export function buildWhatsAppMessage(
  config: Pick<
    WidgetConfig,
    "whatsappPopupMsg" | "whatsappPopupMsgCountry" | "whatsappPopupMsgCity"
  >,
  pageContext: PageContext | null
): string {
  if (pageContext?.type === "service") {
    const template = config.whatsappPopupMsg?.trim();
    const location = pageContext.cityName || pageContext.countryName;
    if (template) {
      const hasLocationPlaceholder =
        template.includes("{country}") || template.includes("{city}");
      let message = template
        .split("{service}")
        .join(pageContext.name)
        .split("{country}")
        .join(pageContext.countryName ?? "")
        .split("{city}")
        .join(pageContext.cityName ?? "");
      if (location && !hasLocationPlaceholder) {
        message = insertLocation(message, location);
      }
      return stripPlaceholders(message);
    }
    const message = `Hi! I have a question about your ${pageContext.name} service.`;
    return location ? insertLocation(message, location) : message;
  }

  if (pageContext?.type === "country") {
    const template = config.whatsappPopupMsgCountry?.trim();
    return stripPlaceholders(
      template
        ? template.split("{country}").join(pageContext.name)
        : `Hi! I have a question about your services in ${pageContext.name}.`
    );
  }

  if (pageContext?.type === "city") {
    const template = config.whatsappPopupMsgCity?.trim();
    return stripPlaceholders(
      template
        ? template.split("{city}").join(pageContext.name)
        : `Hi! I have a question about your services in ${pageContext.name}.`
    );
  }

  return (
    stripPlaceholders(config.whatsappPopupMsg?.trim() || "") ||
    "Hi! I have a question about your services."
  );
}

export function WhatsAppPopup({
  config,
  pageContext,
  onClose,
}: WhatsAppPopupProps) {
  const [message, setMessage] = useState(() =>
    buildWhatsAppMessage(config, pageContext)
  );
  const whatsappChannel = config.channels.find((c) => c.id === "whatsapp");

  const phone = whatsappChannel?.phone?.replace(/[^0-9]/g, "") || "";

  const sendMessage = () => {
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    trackContactClick({
      method: "whatsapp",
      location: "whatsapp_popup",
      label: pageContext
        ? pageContext.type === "service"
          ? pageContext.name
          : `${pageContext.type}:${pageContext.name}`
        : "general_inquiry",
      whatsapp_number: phone,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50">
      <div
        className="bg-white rounded-2xl shadow-2xl w-[360px] overflow-hidden animate-in fade-in zoom-in-95"
        style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
      >
        <div
          className="px-5 py-4 text-white text-center relative"
          style={{ backgroundColor: config.primaryColor }}
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-3 text-white/80 hover:text-white"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex items-center justify-center gap-2 mb-1">
            <WhatsAppIcon className="w-8 h-8 relative z-10" />
          </div>
          <h3 className="font-semibold text-lg">{config.whatsappPopupHeader || "Chat with us on WhatsApp"}</h3>
          {whatsappChannel?.agentName && (
            <p className="text-sm opacity-90 mt-1">{whatsappChannel.agentName}</p>
          )}
        </div>

        <div className="p-5 space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-3">
            <p className="text-sm text-green-800">
              Hi there! 👋 How can we help you?
              {pageContext && (
                <span className="block mt-1 font-medium">
                  You&apos;re inquiring about: {pageContext.name}
                </span>
              )}
            </p>
          </div>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            rows={4}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />

          <button
            onClick={sendMessage}
            className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ backgroundColor: config.primaryColor }}
          >
            Continue to Chat
          </button>

          <p className="text-xs text-center text-gray-400">
            Opens in WhatsApp
          </p>
        </div>
      </div>
    </div>
  );
}
