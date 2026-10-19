"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import type { PageContext } from "./ChatWidget";

interface WidgetConfig {
  primaryColor: string;
  channels: Array<{
    id: string;
    enabled: boolean;
    phone: string;
    email: string;
    presetMessage: string;
    agentName: string;
    agentAvatar: string;
  }>;
}

interface ContactFormDict {
  contactForm: {
    title: string;
    inquiryAbout: string;
    defaultMessage: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    sending: string;
    send: string;
    sent: string;
    sentDesc: string;
    close: string;
  };
}

interface ContactFormProps {
  config: WidgetConfig;
  pageContext: PageContext | null;
  onClose: () => void;
  dict?: ContactFormDict;
}

export function ContactForm({ config, pageContext, onClose, dict }: ContactFormProps) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const t = dict?.contactForm ?? {
    title: "Contact Us",
    inquiryAbout: "Inquiring about: ",
    defaultMessage: "We'll get back to you soon",
    name: "Your Name",
    email: "Email Address",
    phone: "Phone Number",
    message: "Your Message",
    sending: "Sending...",
    send: "Send Message",
    sent: "Message Sent!",
    sentDesc: "We'll get back to you as soon as possible.",
    close: "Close",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch("/api/chat/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channel: "contact-form",
          ...form,
          serviceName: pageContext?.name || "",
          pageUrl: window.location.href,
        }),
      });
      setSent(true);
      trackEvent("lead_captured", {
        form_id: "chat_contact_form",
        form_location: "chat_widget",
      });
    } catch {
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50">
        <div
          className="bg-white rounded-2xl shadow-2xl w-[360px] p-8 text-center"
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: config.primaryColor + "20" }}
          >
            <svg className="w-8 h-8" fill="none" stroke={config.primaryColor} viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">{t.sent}</h3>
          <p className="text-sm text-gray-500 mb-4">
            {t.sentDesc}
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg text-white text-sm font-medium"
            style={{ backgroundColor: config.primaryColor }}
          >
            {t.close}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50">
      <div
        className="bg-white rounded-2xl shadow-2xl w-[360px] overflow-hidden"
        style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
      >
        <div
          className="px-5 py-4 text-white text-center relative"
          style={{ backgroundColor: config.primaryColor }}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white/80 hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h3 className="font-semibold text-lg">{t.title}</h3>
          <p className="text-sm opacity-90 mt-1">
            {pageContext ? `${t.inquiryAbout}${pageContext.name}` : t.defaultMessage}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3">
          <div>
            <input
              type="text"
              placeholder={t.name}
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:border-transparent"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder={t.email}
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:border-transparent"
            />
          </div>
          <div>
            <input
              type="tel"
              placeholder={t.phone}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:border-transparent"
            />
          </div>
          <div>
            <textarea
              placeholder={t.message}
              required
              rows={3}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
            style={{ backgroundColor: config.primaryColor }}
          >
            {sending ? t.sending : t.send}
          </button>
        </form>
      </div>
    </div>
  );
}