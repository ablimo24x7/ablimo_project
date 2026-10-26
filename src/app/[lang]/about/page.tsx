import type { Metadata } from "next";
import { getDictionary, hasLocale, defaultLocale, type Locale, localeBase, localeHome } from "@/app/[lang]/dictionaries";
import { generateSeoMetadata } from "@/lib/seo";
import { AboutPageJsonLd, BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/StructuredData";
import AboutPageClient from "./AboutPageClient";
import "./about.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  const isAr = locale === "ar";
  return generateSeoMetadata({
    title: isAr
      ? (dict.about?.meta?.title || "عن الشركة | مشغل النقل البري في الرياض")
      : "About AB | Ground Transportation Operator in Riyadh",
    description: isAr
      ? (dict.about?.meta?.description || "شركة إيه بي هي مشغل نقل بري مقره الرياض ولها مكاتب في دبي وأبوظبي والدوحة.")
      : "AB is a Riyadh-headquartered ground transportation operator with offices in Dubai, Abu Dhabi and Doha. Our story, operating model, team and standards.",
    path: "/about",
    lang,
    keywords:
      "About AB, Riyadh ground transportation, chauffeur service Riyadh, luxury mobility GCC, AB Limo, Dubai chauffeur, Doha transportation, Abu Dhabi corporate transport",
  });
}

const aboutFaqs = [
  {
    q: "Where is AB headquartered?",
    a: "In Riyadh, Saudi Arabia, with offices in Dubai, Abu Dhabi and Doha.",
  },
  {
    q: "Which countries does AB operate in?",
    a: "AB operates across Saudi Arabia, the UAE and Qatar and the wider GCC, and has a growing presence in India through its company in Chennai.",
  },
  {
    q: "Why does my contract or invoice show a different company name?",
    a: "AB operates through a locally registered company in each country. Your contract and invoices carry the legal name of the AB company in your country.",
  },
  {
    q: "Is AB licensed in each market?",
    a: "Yes. We operate under the licensing and permit requirements of the Transport General Authority (TGA) in Saudi Arabia, the Roads and Transport Authority (RTA) in Dubai, the Integrated Transport Centre (ITC) in Abu Dhabi and the Ministry of Transport (MOT) in Qatar.",
  },
  {
    q: "Are journeys monitored around the clock?",
    a: "Yes. Our 24/7 control rooms in Riyadh, Dubai and Doha monitor every journey and coordinate dispatch in real time, supported by our centres in Chennai and Islamabad.",
  },
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;

  return (
    <>
      <AboutPageJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${localeHome(lang)}` },
          { name: "About AB", url: `${localeBase(lang)}/about` },
        ]}
      />
      <FAQJsonLd
        items={aboutFaqs.map((item) => ({
          question: item.q,
          answer: item.a,
        }))}
      />
      <main className="min-h-screen bg-abBlack text-gray-300">
        <AboutPageClient lang={locale} />
      </main>
    </>
  );
}
