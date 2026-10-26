import Link from "next/link";
import Image from "next/image";
import ServiceInquiryForm from "@/components/layout/ServiceInquiryForm";
import {
  getDictionary,
  hasLocale,
  defaultLocale,
  type Locale,
  localeBase,
  localeHome,
} from "@/app/[lang]/dictionaries";

export interface ServiceFeature {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export interface ServiceCard {
  image: string;
  title: string;
  desc: string;
  tag?: string;
}

export interface ServiceBullet {
  text: string;
}

export interface ServiceSection {
  image: string;
  imageAlt: string;
  title: string;
  bullets?: ServiceBullet[];
  paragraphs?: string[];
  imageSide?: "left" | "right";
  dark?: boolean;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceContent {
  title: string;
  subtitle: string;
  heroImage: string;
  features?: ServiceFeature[];
  cardsHeading?: string;
  cardsDesc?: string;
  cards?: ServiceCard[];
  sections?: ServiceSection[];
  faqs?: ServiceFaq[];
  ctaTitle: string;
  ctaDesc: string;
  ctaLabel: string;
  ctaHref?: string;
}

export interface ServicePageTexts {
  title: string;
  subtitle: string;
  metadata?: { title?: string; description?: string };
  ctaTitle: string;
  ctaDesc: string;
  ctaLabel: string;
  features?: { title: string; desc: string }[];
  cardsHeading?: string;
  cardsDesc?: string;
  cards: { tag?: string; title: string; desc: string }[];
  sections?: {
    imageAlt: string;
    title: string;
    paragraphs: string[];
    bullets: { text: string }[];
  }[];
  faqs: { q: string; a: string }[];
}

export interface ServiceStructure {
  heroImage: string;
  featureIcons?: React.ReactNode[];
  cardImages: string[];
  sectionImages: {
    image: string;
    dark?: boolean;
    imageSide?: "left" | "right";
  }[];
}

export function buildServiceContent(
  texts: ServicePageTexts,
  structure: ServiceStructure
): ServiceContent {
  const fallbackCardImage = structure.cardImages[0] ?? "";
  const fallbackSection = structure.sectionImages[0] ?? { image: "" };
  const sectionAt = (i: number) =>
    structure.sectionImages[i] ??
    structure.sectionImages[structure.sectionImages.length - 1] ??
    fallbackSection;

  return {
    title: texts.title,
    subtitle: texts.subtitle,
    heroImage: structure.heroImage,
    ctaTitle: texts.ctaTitle,
    ctaDesc: texts.ctaDesc,
    ctaLabel: texts.ctaLabel,
    features: (texts.features ?? []).map((f, i) => ({
      icon: structure.featureIcons?.[i] ?? null,
      title: f.title,
      desc: f.desc,
    })),
    cardsHeading: texts.cardsHeading,
    cardsDesc: texts.cardsDesc,
    cards: texts.cards.map((c, i) => ({
      image: structure.cardImages[i] ?? fallbackCardImage,
      tag: c.tag,
      title: c.title,
      desc: c.desc,
    })),
    sections: (texts.sections ?? []).map((s, i) => ({
      image: sectionAt(i).image,
      imageAlt: s.imageAlt,
      title: s.title,
      paragraphs: s.paragraphs,
      bullets: s.bullets,
      dark: sectionAt(i).dark,
      imageSide: sectionAt(i).imageSide,
    })),
    faqs: texts.faqs,
  };
}

const CheckIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={`${className} text-green-400 mt-0.5 flex-shrink-0`} fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </svg>
);

export default async function ServicePage({
  params,
  content,
  breadcrumb,
  serviceName,
  serviceUrl,
  relatedTitle,
  relatedLinks,
}: {
  params: Promise<{ lang: string }>;
  content: ServiceContent;
  breadcrumb: string;
  serviceName: string;
  serviceUrl: string;
  relatedTitle?: string;
  relatedLinks?: { label: string; href: string }[];
}) {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  const homeLabel = dict.common?.breadcrumb?.home ?? "Home";
  const servicesLabel = dict.services?.breadcrumb?.services ?? "Services";
  const faqTitle = dict.services?.faqTitle ?? "Frequently Asked Questions";

  return (
    <main className="min-h-screen bg-[#292a30] text-white">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden pt-24 pb-10">
        <Image
          src={content.heroImage}
          alt={content.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#292a30]" />
        <div className="absolute inset-0 bg-gradient-to-r from-abBlack/70 via-abBlack/30 to-transparent" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-abBlue/10 border border-abBlue/30 mb-5">
              <span className="w-2 h-2 rounded-full bg-abBlue animate-pulse"></span>
              <span className="text-abBlue text-xs font-bold tracking-widest uppercase">
                {dict.services?.luxuryMobility ?? "AB Luxury Mobility"}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-white">
              {content.title}
            </h1>
            <p className="text-lg text-gray-300">{content.subtitle}</p>
          </div>
          <ServiceInquiryForm
            serviceName={serviceName}
            serviceUrl={serviceUrl}
          />
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-8 py-6">
        <nav className="text-sm text-gray-400">
          <Link href={`${localeHome(lang)}`} className="hover:text-white transition-colors">
            {homeLabel}
          </Link>
          <span className="mx-2">/</span>
          <Link href={`${localeBase(lang)}/services`} className="hover:text-white transition-colors">
            {servicesLabel}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">{breadcrumb}</span>
        </nav>
      </div>

      {/* Feature Cards */}
      {content.features && content.features.length > 0 && (
        <section className="max-w-7xl mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.features.map((feature) => (
              <div
                key={feature.title}
                className="bg-[#1c1d21] p-8 rounded-2xl hover:bg-[#2a2c35] transition-colors"
              >
                <div className="text-abBlue mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Cards Grid */}
      {content.cards && content.cards.length > 0 && (
        <section className="bg-[#1c1d21] py-20 px-8">
          <div className="max-w-7xl mx-auto">
            {content.cardsHeading && (
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                {content.cardsHeading}
              </h2>
            )}
            {content.cardsDesc && (
              <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
                {content.cardsDesc}
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {content.cards.map((card) => (
                <div
                  key={card.title}
                  className="bg-[#292a30] rounded-2xl overflow-hidden group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {card.tag && (
                      <span className="absolute top-4 left-4 bg-abBlue text-black text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                        {card.tag}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Alternating Sections */}
      {content.sections &&
        content.sections.map((section) => {
          const imageLeft = section.imageSide !== "right";
          return (
            <section
              key={section.title}
              className={section.dark ? "bg-[#1c1d21] py-20 px-8" : "py-20 px-8"}
            >
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div
                  className={`relative h-[400px] rounded-2xl overflow-hidden ${
                    imageLeft ? "" : "order-1 lg:order-2"
                  }`}
                >
                  <Image
                    src={section.image}
                    alt={section.imageAlt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className={imageLeft ? "" : "order-2 lg:order-1"}>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    {section.title}
                  </h2>
                  {section.paragraphs?.map((p) => (
                    <p key={p} className="text-gray-400 leading-relaxed mb-4">
                      {p}
                    </p>
                  ))}
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="space-y-4">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet.text}
                          className="flex items-start gap-3"
                        >
                          <CheckIcon />
                          <span className="text-gray-300">{bullet.text}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </section>
          );
        })}

      {/* FAQ Section */}
      {content.faqs && content.faqs.length > 0 && (
        <section className="bg-[#1c1d21] py-20 px-8">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: content.faqs.map((item) => ({
                  "@type": "Question",
                  name: item.q,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: item.a,
                  },
                })),
              }),
            }}
          />
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {faqTitle}
            </h2>
            <div className="space-y-4">
              {content.faqs.map((item) => (
                <div
                  key={item.q}
                  className="bg-[#292a30] rounded-2xl overflow-hidden"
                >
                  <details className="group">
                    <summary className="w-full p-6 text-left flex items-center justify-between hover:bg-[#2a2c35] transition-colors cursor-pointer list-none">
                      <h3 className="text-lg font-semibold pr-4">{item.q}</h3>
                      <svg
                        className="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 group-open:rotate-180"
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
                    </summary>
                    <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed">
                      {item.a}
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related options (sibling sub-services) */}
      {relatedLinks && relatedLinks.length > 0 && (
        <section
          aria-label={relatedTitle}
          className="max-w-4xl mx-auto px-8 pt-4 pb-12 text-center"
        >
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
            {relatedTitle}
          </h2>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm">
            {relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-400 hover:text-white transition-colors underline underline-offset-4 decoration-gray-700"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-8 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          {content.ctaTitle}
        </h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">{content.ctaDesc}</p>
        <Link
          href={content.ctaHref ?? `${localeBase(lang)}/services`}
          className="inline-block bg-abBlue hover:bg-abServiceBlue text-white px-8 py-3 text-sm font-semibold rounded-full transition-colors shadow-lg shadow-abBlue/20"
        >
          {content.ctaLabel}
        </Link>
      </section>
    </main>
  );
}
