import Link from "next/link";
import Image from "next/image";
import BookingWidget from "@/components/layout/BookingWidget";
import {
  getDictionary,
  hasLocale,
  defaultLocale,
  type Locale,
} from "@/app/[lang]/dictionaries";

export interface IndustryFeature {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export interface IndustryCard {
  image: string;
  title: string;
  desc: string;
  tag?: string;
}

export interface IndustryBullet {
  text: string;
}

export interface IndustrySection {
  image: string;
  imageAlt: string;
  title: string;
  bullets?: IndustryBullet[];
  paragraphs?: string[];
  imageSide?: "left" | "right";
  dark?: boolean;
}

export interface IndustryFaq {
  q: string;
  a: string;
}

export interface IndustryContent {
  badge: string;
  title: string;
  subtitle: string;
  heroImage: string;
  features?: IndustryFeature[];
  cardsHeading?: string;
  cardsDesc?: string;
  cards?: IndustryCard[];
  sections?: IndustrySection[];
  faqs?: IndustryFaq[];
  ctaTitle: string;
  ctaDesc: string;
  ctaLabel: string;
  ctaHref?: string;
}

export interface IndustryPageTexts {
  badge: string;
  title: string;
  subtitle: string;
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

export interface IndustryStructure {
  heroImage: string;
  featureIcons?: React.ReactNode[];
  cardImages: string[];
  sectionImages: {
    image: string;
    dark?: boolean;
    imageSide?: "left" | "right";
  }[];
}

export function buildIndustryContent(
  texts: IndustryPageTexts,
  structure: IndustryStructure
): IndustryContent {
  return {
    badge: texts.badge,
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
      image: structure.cardImages[i],
      tag: c.tag,
      title: c.title,
      desc: c.desc,
    })),
    sections: (texts.sections ?? []).map((s, i) => ({
      image: structure.sectionImages[i].image,
      imageAlt: s.imageAlt,
      title: s.title,
      paragraphs: s.paragraphs,
      bullets: s.bullets,
      dark: structure.sectionImages[i].dark,
      imageSide: structure.sectionImages[i].imageSide,
    })),
    faqs: texts.faqs,
  };
}

const CheckIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={`${className} text-green-400 mt-0.5 flex-shrink-0`} fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </svg>
);

export default async function IndustryPage({
  params,
  content,
  breadcrumb,
}: {
  params: Promise<{ lang: string }>;
  content: IndustryContent;
  breadcrumb: string;
}) {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  const homeLabel = dict.common?.breadcrumb?.home ?? "Home";
  const industriesLabel =
    dict.industries?.breadcrumb?.industries ?? "Industries";
  const faqTitle = dict.industries?.faqTitle ?? "Frequently Asked Questions";

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
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-abGold/10 border border-abGold/30 mb-5">
              <span className="w-2 h-2 rounded-full bg-abGold animate-pulse"></span>
              <span className="text-abGold text-xs font-bold tracking-widest uppercase">
                {content.badge}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              {content.title}
            </h1>
            <p className="text-lg text-gray-300">{content.subtitle}</p>
          </div>
          <BookingWidget dict={dict} />
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-8 py-6">
        <nav className="text-sm text-gray-400">
          <Link href={`/${lang}`} className="hover:text-white transition-colors">
            {homeLabel}
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/${lang}/industries`} className="hover:text-white transition-colors">
            {industriesLabel}
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
                <div className="text-abGold mb-4">{feature.icon}</div>
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
                      <span className="absolute top-4 left-4 bg-abGold text-black text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
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

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-8 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          {content.ctaTitle}
        </h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">{content.ctaDesc}</p>
        <Link
          href={content.ctaHref ?? `/${lang}/industries`}
          className="inline-block bg-abGold hover:bg-yellow-600 text-white px-8 py-3 text-sm font-semibold rounded-full transition-colors shadow-lg shadow-abGold/20"
        >
          {content.ctaLabel}
        </Link>
      </section>
    </main>
  );
}
