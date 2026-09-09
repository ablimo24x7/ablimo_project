"use client";

import * as React from "react";
import { getIcon } from "./section-icons";
import type { PageSection } from "./section-types";

interface ContactFormSectionProps {
  section: PageSection;
}

export default function ContactFormSection({ section }: ContactFormSectionProps) {
  const c = section.content as Record<string, string>;
  const appearance = section.appearance as Record<string, string>;
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const bgClass = appearance.theme === "darker" ? "bg-abBlack" : "bg-abDarkGray";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section id="corporate-account" className={`py-24 ${bgClass} relative border-t border-gray-800`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            {c.eyebrow && (
              <h2 className="text-sm font-bold tracking-widest text-abGold uppercase mb-2">
                {c.eyebrow}
              </h2>
            )}
            {c.heading && (
              <h3 className="text-3xl font-bold text-white">{c.heading}</h3>
            )}
          </div>
          <div className="hidden sm:block">
            <a
              href="mailto:sales@ab.limo"
              className="text-white hover:text-abGold transition-colors text-sm font-semibold flex items-center"
            >
              {getIcon("Mail", "w-4 h-4 mr-2")} Contact Sales Directly
            </a>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-abBlack rounded-2xl shadow-2xl border border-gray-800 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gray-900/50 px-8 py-10 text-center relative overflow-hidden border-b border-gray-800">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-abGold via-yellow-400 to-abGold" />
            {c.icon && (
              <div className="mb-4">
                {getIcon(c.icon, "w-10 h-10 text-abGold mx-auto")}
              </div>
            )}
            <h2 className="text-2xl font-bold text-white mb-2">Corporate Account Application</h2>
            <p className="text-gray-400 text-sm">{c.description}</p>
          </div>

          {/* Form */}
          <form className="p-8 md:p-12 space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-abDarkGray border border-gray-700 text-white rounded focus:bg-black focus:border-abGold focus:ring-1 focus:ring-abGold outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
                  Primary Industry *
                </label>
                <select className="w-full px-4 py-3 bg-abDarkGray border border-gray-700 text-white rounded focus:bg-black focus:border-abGold focus:ring-1 focus:ring-abGold outline-none transition-colors appearance-none">
                  <option>Oil & Gas</option>
                  <option>Government & Ministries</option>
                  <option>Corporate & Finance</option>
                  <option>Events & Exhibitions</option>
                  <option>Aviation / FBO</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
                  Contact Person *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-abDarkGray border border-gray-700 text-white rounded focus:bg-black focus:border-abGold focus:ring-1 focus:ring-abGold outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
                  Corporate Email *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-abDarkGray border border-gray-700 text-white rounded focus:bg-black focus:border-abGold focus:ring-1 focus:ring-abGold outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
                Primary Mobility Requirement
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["Executive Transfers", "Staff Shuttles", "As-Directed (Hourly)", "Long-Term Lease"].map(
                  (opt) => (
                    <label
                      key={opt}
                      className="flex items-center space-x-2 p-3 border border-gray-700 bg-abDarkGray rounded cursor-pointer hover:bg-gray-800 transition-colors"
                    >
                      <input
                        type="checkbox"
                        className="text-abGold focus:ring-abGold border-gray-600 rounded bg-black"
                      />
                      <span className="text-sm font-medium text-gray-300">{opt}</span>
                    </label>
                  )
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
                Est. Monthly Volume (Trips)
              </label>
              <select className="w-full px-4 py-3 bg-abDarkGray border border-gray-700 text-white rounded focus:bg-black focus:border-abGold focus:ring-1 focus:ring-abGold outline-none transition-colors appearance-none">
                <option>10 - 50 Trips</option>
                <option>51 - 200 Trips</option>
                <option>201 - 500 Trips</option>
                <option>500+ Trips</option>
              </select>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-abGold hover:bg-yellow-600 text-white font-bold py-4 px-6 rounded transition-colors shadow-lg shadow-abGold/10 text-lg flex items-center justify-center disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    {c.submitLabel || "Submit Procurement Request"}
                    {getIcon("Send", "w-5 h-5 ml-2")}
                  </>
                )}
              </button>
              <p className="text-center text-xs text-gray-500 mt-4">
                {getIcon("Lock", "w-3 h-3 inline mr-1")} Data secured by AB.Limo Enterprise infrastructure.
              </p>
            </div>

            {/* Success Message */}
            {submitted && (
              <div className="mt-6 p-4 bg-gray-900 border border-green-900 rounded-lg text-center">
                <div className="mb-2">
                  {getIcon("CheckCircle", "w-8 h-8 text-green-500 mx-auto")}
                </div>
                <h4 className="text-white font-bold">{c.successTitle || "Application Received"}</h4>
                <p className="text-gray-400 text-sm mt-1">
                  {c.successMessage || "An enterprise account manager will contact you within 24 hours."}
                </p>
              </div>
            )}
          </form>
        </div>

        {/* Mobile Contact */}
        <div className="mt-8 text-center sm:hidden">
          <a
            href="mailto:sales@ab.limo"
            className="text-abGold hover:text-white transition-colors text-sm font-semibold flex items-center justify-center"
          >
            {getIcon("Mail", "w-4 h-4 mr-2")} Contact Sales Directly
          </a>
        </div>
      </div>
    </section>
  );
}
