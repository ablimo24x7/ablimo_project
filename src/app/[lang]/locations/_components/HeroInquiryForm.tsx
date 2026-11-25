"use client";

import { useId, useState } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { trackEvent } from "@/lib/analytics";

const CONTACT_EMAIL = "hello@ab.limo";

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="#6b7280" className="shrink-0 mt-0.5">
      <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="#6b7280" className="shrink-0 mt-0.5">
      <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="#6b7280" className="shrink-0 mt-0.5">
      <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="#6b7280" className="shrink-0 mt-0.5">
      <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z" />
    </svg>
  );
}

interface HeroInquiryFormProps {
  dict: Dictionary;
  locationName?: string;
  className?: string;
}

export default function HeroInquiryForm({ dict, locationName, className = "" }: HeroInquiryFormProps) {
  const uid = useId();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const cf = dict.contactForm;
  const heading = dict.contact.formHeading;
  const hint = dict.contact.formHint;

  const buildMailtoUrl = () => {
    const pageUrl = typeof window !== "undefined" ? window.location.href : "";
    const subject = `Booking enquiry${locationName ? ` – ${locationName}` : ""}`;
    const lines = [
      `Location: ${locationName || "N/A"}`,
      `Page: ${pageUrl}`,
      "",
      `Name: ${form.name}`,
      `Phone: ${form.phone || "—"}`,
      `Email: ${form.email}`,
      "",
      `Message: ${form.message}`,
    ];
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch("/api/chat/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channel: "location-hero-form",
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          serviceName: locationName || "",
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      trackEvent("lead_captured", {
        form_id: "location_hero_form",
        form_location: "location_hero",
      });
      window.location.href = buildMailtoUrl();
      setSent(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      // Lead may still have been captured; mailto fallback remains available.
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className={`bg-white rounded-2xl shadow-[0_12px_24px_rgba(0,0,0,0.15)] max-w-[440px] w-full p-8 text-center text-gray-900 ${className}`}>
        <div className="w-14 h-14 rounded-full bg-[#259DCC]/15 flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-[#259DCC]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-bold mb-2">{cf.sent}</h3>
        <p className="text-sm text-gray-500 mb-4">{cf.sentDesc}</p>
        <a href={buildMailtoUrl()} className="text-sm font-semibold text-[#259DCC] hover:underline">
          {CONTACT_EMAIL}
        </a>
        <div className="mt-6">
          <button
            type="button"
            onClick={() => setSent(false)}
            className="text-sm font-semibold text-[#259DCC] hover:underline"
          >
            {cf.close}
          </button>
        </div>
      </div>
    );
  }

  const fieldClass = "flex items-center gap-2.5 rounded-xl bg-gray-100 px-3.5 py-2.5 transition-colors focus-within:ring-1 focus-within:ring-gray-800";
  const labelClass = "block text-[11px] font-semibold text-gray-500 leading-tight";
  const inputClass = "w-full text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent pt-0.5";

  return (
    <div
      className={`bg-white rounded-2xl shadow-[0_12px_24px_rgba(0,0,0,0.15)] max-w-[440px] w-full overflow-hidden text-gray-900 ${className}`}
    >
      {/* Card Header */}
      <div className="px-5 pt-5 pb-4 border-b border-gray-100">
        <h2 className="text-base font-bold text-gray-900">{heading}</h2>
        <p className="text-xs text-gray-500 mt-1">{hint}</p>
      </div>

      <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-3">
        {/* Name */}
        <div className={fieldClass}>
          <UserIcon />
          <div className="flex-1 min-w-0">
            <label htmlFor={`${uid}-name`} className={labelClass}>{cf.name}</label>
            <input
              id={`${uid}-name`}
              type="text"
              placeholder={cf.name}
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>

        {/* Email */}
        <div className={fieldClass}>
          <MailIcon />
          <div className="flex-1 min-w-0">
            <label htmlFor={`${uid}-email`} className={labelClass}>{cf.email}</label>
            <input
              id={`${uid}-email`}
              type="email"
              placeholder={cf.email}
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>

        {/* Phone */}
        <div className={fieldClass}>
          <PhoneIcon />
          <div className="flex-1 min-w-0">
            <label htmlFor={`${uid}-phone`} className={labelClass}>{cf.phone}</label>
            <input
              id={`${uid}-phone`}
              type="tel"
              placeholder={cf.phone}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>

        {/* Message */}
        <div className="rounded-xl bg-gray-100 px-3.5 py-2.5 transition-colors focus-within:ring-1 focus-within:ring-gray-800">
          <div className="flex items-start gap-2.5">
            <MessageIcon />
            <div className="flex-1 min-w-0">
              <label htmlFor={`${uid}-message`} className={labelClass}>{cf.message}</label>
              <textarea
                id={`${uid}-message`}
                placeholder={cf.message}
                required
                rows={2}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent pt-0.5 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={sending}
          className="w-full bg-[#292a30] text-white py-3.5 rounded-full text-sm font-semibold hover:bg-[#1c1d21] transition-colors cursor-pointer mt-1 disabled:opacity-50"
        >
          {sending ? cf.sending : cf.send}
        </button>
      </form>
    </div>
  );
}
