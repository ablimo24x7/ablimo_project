import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, hasLocale, type Locale, localeBase, localeHome } from "@/app/[lang]/dictionaries";
import { generateSeoMetadata } from "@/lib/seo";
import { getContactChannelLinks } from "@/lib/contact-channels";
import { getAllPublishedServices } from "@/lib/services";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";
import ContactChannels from "@/components/contact/ContactChannels";
import ContactPageForm from "@/components/contact/ContactPageForm";

// Channel links come from the live chat-widget config — never bake them at build time.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isAr = hasLocale(lang) && lang === "ar";
  return generateSeoMetadata({
    title: isAr
      ? "اتصل ب AB.Limo | دعم التنقل التنفيذي على مدار الساعة"
      : "Contact AB.Limo | 24/7 Executive Mobility Support",
    description: isAr
      ? "اتصل ب AB.Limo للحجوزات والعروض والدعم في دول الخليج. تواصل مع فريق التنقل عبر الهاتف أو واتساب أو البريد الإلكتروني — نرد خلال 30 دقيقة، على مدار الساعة."
      : "Contact AB.Limo for bookings, quotes and support across the GCC. Reach our mobility team via phone, WhatsApp or email — we respond within 30 minutes, 24/7.",
    path: "/contact",
    lang,
    keywords:
      "contact AB.Limo, chauffeur booking support, WhatsApp chauffeur service GCC, corporate mobility contact, 24/7 dispatch, executive transfer enquiry",
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const c = dict.contact;
  const cf = dict.contactForm;
  const channels = await getContactChannelLinks(4);
  const serviceOptions = (await getAllPublishedServices()).map((s) => ({
    slug: s.slug,
    title: s.title,
  }));
  const recaptchaSiteKey = process.env.RECAPTCHA_SITE_KEY;

  const infoCards = [
    {
      title: c.available247,
      desc: c.available247Desc,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: c.responseTime,
      desc: c.responseDesc,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: c.coverage,
      desc: c.coverageDesc,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0110.5 3h3A2.5 2.5 0 0116 5.5v.585m-13 4.415V19a2 2 0 002 2h6.5M15 21a9 9 0 100-18 9 9 0 000 18z"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: dict.footer.aboutUs.homepage, url: `${localeHome(lang)}` },
          { name: cf.title, url: `${localeBase(lang)}/contact` },
        ]}
      />

      {/* Hero */}
      <section
        data-section-type="contact_hero"
        className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-[#1c1d21]"
      >
        <div className="absolute inset-0 opacity-50 bg-gradient-to-b from-[#292a30] via-[#1c1d21] to-[#292a30]" style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2015/01/02/00/01/telephone-586268_1280.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-wide text-white">
            {cf.title}
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">{c.subtitle}</p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
            <Link href={`${localeHome(lang)}`} className="hover:text-white transition-colors">
              {dict.footer.aboutUs.homepage}
            </Link>
            <span>/</span>
            <span className="text-white">{cf.title}</span>
          </div>
        </div>
      </section>

      {/* Channels + form */}
      <section data-section-type="contact_channels" className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-10">
            <ContactChannels
              channels={channels}
              heading={c.channelsHeading}
              hint={c.channelsHint}
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {infoCards.map((card) => (
                <div
                  key={card.title}
                  className="bg-abDarkGray border border-gray-800 rounded-xl p-5"
                >
                  <span className="text-abBlue inline-flex mb-3">{card.icon}</span>
                  <p className="text-white font-semibold text-sm mb-1">{card.title}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end w-full" data-section-type="contact_form">
            <ContactPageForm
              labels={cf}
              heading={c.formHeading}
              hint={c.formHint}
              services={serviceOptions}
              recaptchaSiteKey={recaptchaSiteKey}
            />
          </div>
        </div>
      </section>

      {/* Support */}
      <section data-section-type="contact_support" className="py-16 bg-[#1c1d21]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {c.supportTitle}
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">{c.supportDesc}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`${localeBase(lang)}/faqs`}
              className="bg-abBlue hover:bg-abBlue/90 text-white font-semibold px-7 py-3 rounded-full transition-colors text-sm"
            >
              {c.supportCta}
            </Link>
            <Link
              href={`${localeBase(lang)}/services`}
              className="border border-gray-600 hover:border-abBlue text-white font-semibold px-7 py-3 rounded-full transition-colors text-sm"
            >
              {c.servicesCta}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
