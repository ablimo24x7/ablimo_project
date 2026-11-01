"use client";

import { useState, useEffect } from "react";

interface ChannelConfig {
  id: string;
  enabled: boolean;
  phone: string;
  email: string;
  username: string;
  url: string;
  presetMessage: string;
}

interface WidgetConfig {
  channels: ChannelConfig[];
  whatsappPopup: boolean;
}

interface ServiceInquiryFormDict {
  inquiryForm: {
    title: string;
    about: string;
    name: string;
    phone: string;
    email: string;
    message: string;
    sending: string;
    send: string;
    sent: string;
    sentDesc: string;
    sentEnd: string;
    sentBack: string;
  };
}

interface ServiceInquiryFormProps {
  serviceName: string;
  serviceUrl: string;
  primaryColor?: string;
  dict?: ServiceInquiryFormDict;
}

export default function ServiceInquiryForm({
  serviceName,
  serviceUrl,
  primaryColor = "#C8A951",
  dict,
}: ServiceInquiryFormProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [widgetConfig, setWidgetConfig] = useState<WidgetConfig | null>(null);

  const t = dict?.inquiryForm ?? {
    title: "Quick Inquiry",
    about: "About: ",
    name: "Your Name",
    phone: "Phone Number",
    email: "Email (optional)",
    message: "Your message (optional)",
    sending: "Sending...",
    send: "Send Inquiry",
    sent: "Thank You!",
    sentDesc: "Your inquiry about ",
    sentEnd: " has been received.",
    sentBack: "We'll get back to you shortly.",
  };

  useEffect(() => {
    fetch("/api/chat/config")
      .then((r) => r.json())
      .then((data) => {
        if (data && data.enabled) setWidgetConfig(data);
      })
      .catch(() => {});
  }, []);

  const getEnabledChannel = (): ChannelConfig | null => {
    if (!widgetConfig) return null;
    const enabled = widgetConfig.channels.filter((c) => c.enabled);
    if (enabled.length === 0) return null;
    return enabled[0];
  };

  const buildChannelUrl = (channel: ChannelConfig, userMessage: string): string => {
    const fullUrl = typeof window !== "undefined" ? `${window.location.origin}${serviceUrl}` : serviceUrl;
    const fullMessage = `Service: ${serviceName}\nURL: ${fullUrl}\n${userMessage ? userMessage + "\n" : ""}Name: ${form.name}\nPhone: ${form.phone}${form.email ? "\nEmail: " + form.email : ""}`;

    switch (channel.id) {
      case "whatsapp": {
        const phone = channel.phone?.replace(/[^0-9]/g, "") || "";
        return `https://wa.me/${phone}?text=${encodeURIComponent(fullMessage)}`;
      }
      case "messenger":
        return `https://m.me/${channel.username}`;
      case "telegram":
        return `https://t.me/${channel.username}`;
      case "viber":
        return `viber://chat?number=${channel.phone?.replace(/[^0-9]/g, "") || ""}`;
      case "phone":
        return `tel:${channel.phone}`;
      case "sms":
        return `sms:${channel.phone}?body=${encodeURIComponent(fullMessage)}`;
      case "email":
        return `mailto:${channel.email}?subject=${encodeURIComponent(`Inquiry: ${serviceName}`)}&body=${encodeURIComponent(fullMessage)}`;
      default:
        if (channel.url) return channel.url;
        return "#";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch("/api/chat/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channel: "service-inquiry",
          name: form.name,
          phone: form.phone,
          email: form.email,
          message: `Service: ${serviceName}\n\n${form.message}`,
          serviceName,
          pageUrl: serviceUrl,
        }),
      });

      const channel = getEnabledChannel();
      if (channel) {
        const url = buildChannelUrl(channel, form.message);
        if (url !== "#") {
          window.open(url, "_blank", "noopener,noreferrer");
        }
      }

      setSent(true);
    } catch {
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="bg-white rounded-2xl shadow-[0_12px_24px_rgba(0,0,0,0.15)] max-w-[440px] w-full p-8 text-center text-gray-900">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: primaryColor + "20" }}
        >
          <svg className="w-7 h-7" fill="none" stroke={primaryColor} viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-bold mb-2">{t.sent}</h3>
        <p className="text-sm text-gray-500 mb-1">
          {t.sentDesc}<span className="font-semibold">{serviceName}</span>{t.sentEnd}
        </p>
        <p className="text-sm text-gray-500">
          {t.sentBack}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-[0_12px_24px_rgba(0,0,0,0.15)] max-w-[440px] w-full overflow-hidden text-gray-900">
      <div className="p-5 border-b border-gray-100">
        <h3 className="text-base font-bold text-gray-900">{t.title}</h3>
        <p className="text-xs text-gray-500 mt-1">
          {t.about}<span className="font-semibold text-gray-700">{serviceName}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-3">
        <div className="flex items-center gap-2.5 rounded-xl bg-gray-100 px-3.5 py-2.5 focus-within:ring-1 focus-within:ring-gray-800">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="#6b7280" className="shrink-0">
            <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" />
          </svg>
          <input
            type="text"
            placeholder={t.name}
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent"
          />
        </div>

        <div className="flex items-center gap-2.5 rounded-xl bg-gray-100 px-3.5 py-2.5 focus-within:ring-1 focus-within:ring-gray-800">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="#6b7280" className="shrink-0">
            <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" />
          </svg>
          <input
            type="tel"
            placeholder={t.phone}
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent"
          />
        </div>

        <div className="flex items-center gap-2.5 rounded-xl bg-gray-100 px-3.5 py-2.5 focus-within:ring-1 focus-within:ring-gray-800">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="#6b7280" className="shrink-0">
            <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" />
          </svg>
          <input
            type="email"
            placeholder={t.email}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent"
          />
        </div>

        <div className="rounded-xl bg-gray-100 px-3.5 py-2.5 focus-within:ring-1 focus-within:ring-gray-800">
          <textarea
            placeholder={t.message}
            rows={2}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={sending}
          className="w-full text-white py-3.5 rounded-full text-sm font-semibold transition-colors cursor-pointer mt-1 disabled:opacity-50"
          style={{ backgroundColor: primaryColor }}
        >
          {sending ? t.sending : t.send}
        </button>
      </form>
    </div>
  );
}
