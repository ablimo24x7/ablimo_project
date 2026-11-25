"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { useRecaptchaV3 } from "@/hooks/use-recaptcha-v3";

interface ContactFormLabels {
  title: string;
  name: string;
  email: string;
  phone: string;
  selectService: string;
  message: string;
  sending: string;
  send: string;
  sent: string;
  sentDesc: string;
  close: string;
}

interface ServiceOption {
  slug: string;
  title: string;
}

interface ContactPageFormProps {
  labels: ContactFormLabels;
  heading: string;
  hint: string;
  services: ServiceOption[];
  recaptchaSiteKey?: string;
}

export default function ContactPageForm({ labels, heading, hint, services, recaptchaSiteKey }: ContactPageFormProps) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const { execute: executeRecaptcha } = useRecaptchaV3(recaptchaSiteKey);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const { service, ...fields } = form;
      const serviceTitle = services.find((s) => s.slug === service)?.title || "";
      const captchaToken = await executeRecaptcha("contact_form");
      const payload: Record<string, unknown> = {
        channel: "contact-form",
        ...fields,
        serviceName: serviceTitle,
        pageUrl: window.location.href,
      };
      if (captchaToken) payload.recaptchaToken = captchaToken;
      await fetch("/api/chat/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      trackEvent("lead_captured", {
        form_id: "contact_page_form",
        form_location: "contact_page",
      });
      setSent(true);
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
    } catch {
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0_12px_24px_rgba(0,0,0,0.15)] w-full max-w-[480px] overflow-hidden text-gray-900">
      <div className="p-5 border-b border-gray-100">
        <h2 className="text-base font-bold text-gray-900">{heading}</h2>
        <p className="text-xs text-gray-500 mt-1">{hint}</p>
      </div>

      {sent ? (
        <div className="p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-[#259DCC]/15 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-7 h-7 text-[#259DCC]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-bold mb-2">{labels.sent}</h3>
          <p className="text-sm text-gray-500 mb-6">{labels.sentDesc}</p>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="text-sm font-semibold text-[#259DCC] hover:underline"
          >
            {labels.close}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-3">
          <div className="rounded-xl bg-gray-100 px-3.5 py-2.5 focus-within:ring-1 focus-within:ring-gray-800">
            <input
              type="text"
              placeholder={labels.name}
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent"
            />
          </div>
          <div className="rounded-xl bg-gray-100 px-3.5 py-2.5 focus-within:ring-1 focus-within:ring-gray-800">
            <input
              type="email"
              placeholder={labels.email}
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent"
            />
          </div>

          {/* Dynamic Services Selection */}
          <div className="rounded-xl bg-gray-100 px-3.5 py-2.5 focus-within:ring-1 focus-within:ring-gray-800">
            <select
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
              className="w-full text-sm text-gray-900 outline-none bg-transparent cursor-pointer"
            >
              <option value="">{labels.selectService}</option>
              {services.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-xl bg-gray-100 px-3.5 py-2.5 focus-within:ring-1 focus-within:ring-gray-800">
            <input
              type="tel"
              placeholder={labels.phone}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent"
            />
          </div>
          <div className="rounded-xl bg-gray-100 px-3.5 py-2.5 focus-within:ring-1 focus-within:ring-gray-800">
            <textarea
              placeholder={labels.message}
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="w-full text-white py-3.5 rounded-full text-sm font-semibold transition-colors cursor-pointer mt-1 disabled:opacity-50 bg-[#259DCC] hover:bg-[#1e86ad]"
          >
            {sending ? labels.sending : labels.send}
          </button>
        </form>
      )}
    </div>
  );
}
