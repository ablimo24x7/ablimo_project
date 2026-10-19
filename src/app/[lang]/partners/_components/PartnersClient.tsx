"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { localeHome } from "@/app/[lang]/dictionaries";

export default function PartnersClient({ dict, lang }: { dict: Dictionary; lang: string }) {
  const [activeTab, setActiveTab] = useState(dict.partners.tabs.onboarding);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: dict.partners.features[0].title,
      description: dict.partners.features[0].desc,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: dict.partners.features[1].title,
      description: dict.partners.features[1].desc,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: dict.partners.features[2].title,
      description: dict.partners.features[2].desc,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: dict.partners.features[3].title,
      description: dict.partners.features[3].desc,
    },
  ];

  const onboardingSteps = dict.partners.onboarding.steps.map((step, i) => ({
    step: String(i + 1).padStart(2, "0"),
    title: step.title,
    description: step.desc,
  }));

  const tabs = [dict.partners.tabs.onboarding, dict.partners.tabs.requirements];

  return (
    <main className="min-h-screen bg-[#292a30]">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1563720223185-11003d516935?w=1920&h=1080&fit=crop"
          alt="Become a service provider"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#292a30]/70 via-[#292a30]/50 to-[#292a30]" />
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-300 mb-4">
            <Link href={`${localeHome(lang)}`} className="hover:text-white transition-colors">
              {dict.partners.breadcrumb.home}
            </Link>
            <span>/</span>
            <span className="text-white">{dict.partners.breadcrumb.partners}</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
            {dict.partners.hero.heading}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            {dict.partners.hero.desc}
          </p>
          <Link
            href="#"
            className="inline-block bg-white text-[#292a30] font-semibold px-8 py-4 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {dict.partners.cta.button}
          </Link>
        </div>
      </section>

      {/* Unlock Global Demand - Features */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 leading-tight">
            {dict.partners.unlockDemand.heading1}
            <br />
            <span className="italic font-light text-gray-300">{dict.partners.unlockDemand.heading2}</span>
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            {dict.partners.unlockDemand.desc}
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {features.slice(0, 3).map((feature) => (
              <div
                key={feature.title}
                className="bg-[#35363c] p-8 rounded-xl border border-gray-700/50 hover:border-gray-500/50 transition-all duration-300 text-center"
              >
                <div className="text-white mb-6 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
            {features.slice(3).map((feature) => (
              <div
                key={feature.title}
                className="bg-[#35363c] p-8 rounded-xl border border-gray-700/50 hover:border-gray-500/50 transition-all duration-300 text-center"
              >
                <div className="text-white mb-6 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Quote */}
      <section className="py-24 px-4 bg-[#1e1f24]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl text-gray-700 mb-8">&ldquo;</div>
          <blockquote className="text-2xl md:text-3xl font-light leading-relaxed mb-8 italic">
            {dict.partners.quote.text}
          </blockquote>
          <div>
            <p className="font-semibold text-lg">{dict.partners.quote.name}</p>
            <p className="text-gray-400 text-sm">{dict.partners.quote.role}</p>
          </div>
        </div>
      </section>

      {/* Onboarding & Requirements Tabs */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center gap-8 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 text-sm font-semibold tracking-wide border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-white text-white"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === dict.partners.tabs.onboarding && (
            <div className="grid md:grid-cols-2 gap-8">
              {onboardingSteps.map((item) => (
                <div
                  key={item.step}
                  className="bg-[#35363c] p-8 rounded-xl border border-gray-700/50"
                >
                  <div className="text-5xl font-bold text-gray-700 mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === dict.partners.tabs.requirements && (
            <div className="bg-[#35363c] p-8 md:p-12 rounded-xl border border-gray-700/50">
              <h3 className="text-2xl font-bold mb-8">
                {dict.partners.requirements.heading}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {dict.partners.requirements.items.map((req, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-300">{req}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Driving a Sustainable Future */}
      <section className="py-24 px-4 bg-[#1e1f24]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=600&fit=crop"
              alt="Sustainable driving"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              {dict.partners.sustainability.heading}
            </h2>
            <p className="text-gray-400 leading-relaxed">
              {dict.partners.sustainability.desc}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 leading-tight">
            {dict.partners.faqHeading.heading1}
            <br />
            <span className="italic font-light text-gray-300">{dict.partners.faqHeading.heading2}</span>
          </h2>
          <div className="space-y-4">
            {dict.partners.faq.items.map((item, index) => (
              <div
                key={index}
                className="bg-[#35363c] rounded-xl border border-gray-700/50 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex justify-between items-center p-6 text-left"
                >
                  <h3 className="text-lg font-semibold pr-4">{item.q}</h3>
                  <div
                    className={`w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      openFaq === index ? "border-white rotate-180" : ""
                    }`}
                  >
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>
                <div
                  className={`px-6 text-gray-400 leading-relaxed transition-all duration-300 ${
                    openFaq === index
                      ? "max-h-48 pb-6 opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-24 px-4 bg-[#1e1f24]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {dict.partners.cta.questions}
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            {dict.partners.cta.questionsDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#"
              className="inline-block bg-white text-[#292a30] font-semibold px-8 py-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {dict.partners.cta.contact}
            </Link>
            <Link
              href="#"
              className="inline-block border border-gray-600 text-white font-semibold px-8 py-4 rounded-lg hover:border-gray-400 transition-colors"
            >
              {dict.partners.cta.download}
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
