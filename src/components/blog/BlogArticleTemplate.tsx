import Link from "next/link";
import Image from "next/image";
import { User, Clock, List, MailOpen } from "lucide-react";
import type { ArticleDoc } from "@/lib/models/Article";
import type { ServiceListItem } from "@/lib/services";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { localeBase } from "@/app/[lang]/dictionaries";
import { TextImageSection } from "@/components/locations/TextImageSection";
import { CardsSection } from "@/components/locations/CardsSection";
import type { TextImageSectionType, CardsSectionType } from "@/lib/validations/location";
import { ServiceIcon } from "@/components/services/service-icons";
import { BlogShareIcons } from "./BlogShareIcons";
import { NewsletterForm } from "./NewsletterForm";
import styles from "./blog-article.module.css";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

/** Deterministic per-slug icon pick for sidebar service cards. */
function serviceIconKey(slug: string): string {
  if (/airport|aviation|fbo|tarmac/.test(slug)) return "plane";
  if (/bus|coach|charter|shuttle|group/.test(slug)) return "bus";
  if (/event|mice|conference|exhibition|sports/.test(slug)) return "calendar";
  if (/corporate|fleet|workforce/.test(slug)) return "briefcase";
  if (/tourism|leisure|religious|dmc/.test(slug)) return "map";
  return "car";
}

function slugifyHeading(text: string, seen: Map<string, number>): string {
  let base = text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
  if (!base) base = "section";
  const count = seen.get(base) ?? 0;
  seen.set(base, count + 1);
  return count === 0 ? base : `${base}-${count}`;
}

/**
 * Ensure every h2/h3 in the WYSIWYG body has an id (keeping author-provided
 * ones) and collect them for the Table of Contents.
 */
function prepareBody(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const seen = new Map<string, number>();
  const out = html.replace(
    /<h([23])(\s[^>]*)?>([\s\S]*?)<\/h\1>/gi,
    (match, level: string, attrs: string | undefined, inner: string) => {
      const text = String(inner)
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/g, " ")
        .trim();
      if (!text) return match;
      const idMatch = /id=["']([^"']+)["']/.exec(attrs ?? "");
      const id = idMatch ? idMatch[1] : slugifyHeading(text, seen);
      toc.push({ id, text, level: Number(level) });
      return `<h${level} id="${id}">${inner}</h${level}>`;
    }
  );
  return { html: out, toc };
}

const TOC_ACCENTS = [
  { num: "text-abBlue", bar: "group-hover:bg-abBlue" },
  { num: "text-abOrange", bar: "group-hover:bg-abOrange" },
  { num: "text-abGreen", bar: "group-hover:bg-abGreen" },
  { num: "text-abRed", bar: "group-hover:bg-abRed" },
] as const;

const SERVICE_ACCENTS = [
  { hoverBorder: "hover:border-abOrange", titleHover: "group-hover:text-abOrange", text: "text-abOrange" },
  { hoverBorder: "hover:border-abYellow", titleHover: "group-hover:text-abYellow", text: "text-abYellow" },
  { hoverBorder: "hover:border-abBlue", titleHover: "group-hover:text-abBlue", text: "text-abBlue" },
  { hoverBorder: "hover:border-abGreen", titleHover: "group-hover:text-abGreen", text: "text-abGreen" },
  { hoverBorder: "hover:border-abRed", titleHover: "group-hover:text-abRed", text: "text-abRed" },
  { hoverBorder: "hover:border-abOrange", titleHover: "group-hover:text-abOrange", text: "text-abOrange" },
] as const;

const RELATED_ACCENTS = [
  { border: "hover:border-abOrange", text: "text-abOrange" },
  { border: "hover:border-abRed", text: "text-abRed" },
  { border: "hover:border-abYellow", text: "text-abYellow" },
  { border: "hover:border-abGreen", text: "text-abGreen" },
] as const;

const REVEAL_SCRIPT = `(function(){var d=document.documentElement;if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('js-reveal');function r(){var els=document.querySelectorAll('.reveal');for(var i=0;i<els.length;i++){var e=els[i];if(e.classList.contains('active'))continue;var t=e.getBoundingClientRect().top;if(t<window.innerHeight-50)e.classList.add('active');}}window.addEventListener('scroll',r,{passive:true});window.addEventListener('load',r);r();setTimeout(r,500);setTimeout(function(){var els=document.querySelectorAll('.reveal');for(var i=0;i<els.length;i++)els[i].classList.add('active');},3000);})();`;

interface BlogArticleTemplateProps {
  article: ArticleDoc;
  lang: string;
  locale: string;
  isArabic: boolean;
  services: ServiceListItem[];
  related: ArticleDoc[];
  dict: Dictionary;
}

export function BlogArticleTemplate({
  article,
  lang,
  locale,
  isArabic,
  services,
  related,
  dict,
}: BlogArticleTemplateProps) {
  const b = dict.blog;
  const base = localeBase(lang);

  const heroImage =
    article.articleMedia?.heroCoverMedia?.url ||
    "https://images.unsplash.com/photo-1547548731-e95343697eb4?q=80&w=1332&auto=format&fit=crop";

  const hasCategory = !!article.categoryLabel && article.categoryLabel !== "Uncategorized";

  const { html: bodyHtml, toc } = prepareBody(article.bodyContent || "");

  const formattedDate = new Date(article.date).toLocaleDateString(
    isArabic ? "ar-SA" : "en-US",
    { year: "numeric", month: "short", day: "numeric" }
  );

  const isSectionsMode =
    article.contentMode === "sections" &&
    Array.isArray(article.sections) &&
    article.sections.length > 0;

  return (
    <main
      className="relative z-10 min-h-screen bg-abBlack text-gray-300 pb-16 pt-32"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <script dangerouslySetInnerHTML={{ __html: REVEAL_SCRIPT }} />

      <div className="w-full px-4 sm:px-8 lg:px-12 reveal active">
        {/* Breadcrumbs & Category */}
        <div className="flex items-center gap-3 mb-8">
          <Link
            href={`${base}/blogs`}
            className="text-gray-500 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors"
          >
            {b.insights}
          </Link>
          <span className="text-gray-700" aria-hidden="true">/</span>
          {hasCategory && (
            <span className="bg-abDarkGray border border-abGreen text-abGreen px-2.5 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider">
              {article.categoryLabel}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
          {article.title}
        </h1>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center justify-between border-y border-gray-800 py-4 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-abDarkGray flex items-center justify-center border border-gray-700">
              <User className="w-4 h-4 text-abBlue" />
            </div>
            <div>
              <p className="text-white text-sm font-bold">{article.authorName || "AB"}</p>
              <p className="text-gray-500 text-xs font-mono">
                {b.published} {formattedDate}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500 font-mono mt-4 sm:mt-0">
            <span className="flex items-center">
              <Clock className="w-4 h-4 me-2 text-abGreen" /> {article.readTime} {b.minRead}
            </span>
            <BlogShareIcons
              title={article.title}
              variant="meta"
              copyLinkLabel={b.copyLink}
              linkCopiedLabel={b.linkCopied}
            />
          </div>
        </div>

        {/* Featured Image */}
        <div className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden border border-gray-800 mb-8 relative group">
          <Image
            src={heroImage}
            alt={article.title}
            fill
            sizes="100vw"
            priority
            className="object-cover grayscale opacity-70 group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
          />
          {article.archiveTag && (
            <div className="absolute bottom-4 end-4 bg-abBlack/90 border border-gray-700 px-3 py-1.5 rounded-sm text-xs font-mono text-gray-400 flex items-center backdrop-blur-sm z-20 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-abRed animate-pulse me-2" />
              {article.archiveTag}
            </div>
          )}
        </div>

        {/* Table of Contents */}
        {toc.length > 0 && (
          <div className="w-full border border-gray-800 bg-abDarkerGray rounded-xl p-6 md:p-8 mb-16 shadow-lg">
            <div className="flex items-center justify-between mb-6 border-b border-gray-800/60 pb-4">
              <div className="inline-flex items-center gap-2 py-1 px-3 bg-abDarkGray border border-abBlue text-abBlue text-[10px] font-bold uppercase tracking-widest rounded-sm">
                <List className="w-3.5 h-3.5" />
                <span>{b.tocTitle}</span>
              </div>
              <span className="text-gray-500 font-mono text-[10px] tracking-widest hidden sm:block">
                {b.tocQuickNav}
              </span>
            </div>
            <ul className="flex flex-col gap-2">
              {toc.map((item, i) => {
                const accent = TOC_ACCENTS[i % TOC_ACCENTS.length];
                return (
                  <li key={`${item.id}-${i}`}>
                    <a
                      href={`#${item.id}`}
                      className="flex items-center gap-4 p-3 bg-abDarkGray border border-transparent hover:border-gray-800 rounded-md transition-all group cursor-pointer"
                    >
                      <span
                        className={`font-black text-2xl text-gray-700 ${accent.num} transition-colors w-10 text-end`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className={`h-6 w-px bg-gray-800 transition-colors ${accent.bar}`} />
                      <h4 className="text-gray-400 font-medium tracking-wide group-hover:text-white transition-colors">
                        {item.text}
                      </h4>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {/* Content + Sidebar */}
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Main Content */}
          <div className="lg:col-span-8 reveal">
            {article.excerpt && (
              <p className="text-xl text-white font-medium mb-8 leading-relaxed">
                {article.excerpt}
              </p>
            )}

            {isSectionsMode ? (
              <div className="space-y-0">
                {(article.sections as unknown as (TextImageSectionType | CardsSectionType)[]).map(
                  (rawSection) => {
                    const section = JSON.parse(JSON.stringify(rawSection));
                    if (section.type === "cards") {
                      return <CardsSection key={section.id} section={section} />;
                    }
                    return <TextImageSection key={section.id} section={section} />;
                  }
                )}
              </div>
            ) : (
              <>
                {bodyHtml && (
                  <div
                    className={styles.content}
                    dangerouslySetInnerHTML={{ __html: bodyHtml }}
                  />
                )}

                {article.keyTakeawaysContent && (
                  <div className="mt-12 bg-abDarkGray rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-4">{b.keyTakeaways}</h2>
                    <div
                      className={styles.content}
                      dangerouslySetInnerHTML={{ __html: article.keyTakeawaysContent }}
                    />
                  </div>
                )}

                {article.finalThoughtsContent && (
                  <div className="mt-12">
                    <h2 className="text-2xl font-bold text-white mb-4">{b.finalThoughts}</h2>
                    <div
                      className={styles.content}
                      dangerouslySetInnerHTML={{ __html: article.finalThoughtsContent }}
                    />
                  </div>
                )}
              </>
            )}

            {/* Content Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-12 pt-8 border-t border-gray-800">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-abDarkGray border border-gray-700 rounded-sm text-xs text-gray-400 font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* FAQs */}
            {article.faqs && article.faqs.length > 0 && (
              <div className="mt-12">
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "FAQPage",
                      mainEntity: article.faqs.map((item) => ({
                        "@type": "Question",
                        name: item.q,
                        acceptedAnswer: { "@type": "Answer", text: item.a },
                      })),
                    }),
                  }}
                />
                <h2 className="text-2xl font-bold text-white mb-6">{b.faqTitle}</h2>
                <div className="space-y-4">
                  {article.faqs.map((item) => (
                    <div key={item.q} className="bg-abDarkGray rounded-2xl overflow-hidden">
                      <details className="group">
                        <summary className="w-full p-6 flex items-center justify-between hover:bg-[#2a2c35] transition-colors cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                          <h3 className="text-lg font-semibold pe-4">{item.q}</h3>
                          <svg
                            className="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 group-open:rotate-180"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </summary>
                        <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed">{item.a}</div>
                      </details>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 relative">
            <div className="lg:sticky lg:top-32 space-y-8 reveal">
              {services.slice(0, 6).map((service, i) => {
                const accent = SERVICE_ACCENTS[i % SERVICE_ACCENTS.length];
                return (
                  <Link
                    key={service.slug}
                    href={`${base}/services/${service.slug}`}
                    className={`block bg-abDarkGray border border-gray-800 ${accent.hoverBorder} transition-colors rounded-xl p-6 group`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className={`text-sm font-bold tracking-widest text-gray-400 uppercase transition-colors ${accent.titleHover}`}>
                        {service.title}
                      </h4>
                      <ServiceIcon name={serviceIconKey(service.slug)} className={`w-5 h-5 ${accent.text}`} />
                    </div>
                    <p className="text-sm text-gray-500 mb-4 leading-relaxed line-clamp-3">
                      {service.desc}
                    </p>
                    <span className={`font-semibold text-sm flex items-center group-hover:underline ${accent.text}`}>
                      {b.exploreService}
                      <span className="ms-2 text-xs" aria-hidden="true">&rarr;</span>
                    </span>
                  </Link>
                );
              })}

              {/* Share Links */}
              <div className="border-t border-gray-800 pt-6">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-4">
                  {b.shareIntelligence}
                </span>
                <BlogShareIcons
                  title={article.title}
                  variant="sidebar"
                  copyLinkLabel={b.copyLink}
                  linkCopiedLabel={b.linkCopied}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Intelligence */}
      {related.length > 0 && (
        <section className="py-20 bg-abDarkerGray border-t border-gray-900 mt-20">
          <div className="w-full px-4 sm:px-8 lg:px-12">
            <div className="flex justify-between items-end mb-10 reveal">
              <h3 className="text-2xl font-bold text-white">
                {b.relatedArticles}
              </h3>
              <Link
                href={`${base}/blogs`}
                className="text-sm font-bold text-abBlue hover:text-white transition-colors hidden sm:block border-b border-abBlue pb-0.5"
              >
                {b.viewAllInsights}
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.slice(0, 3).map((item, i) => {
                const accent = RELATED_ACCENTS[i % RELATED_ACCENTS.length];
                return (
                  <article
                    key={item.slug}
                    className={`bg-abDarkGray border border-gray-800 ${accent.border} rounded-xl overflow-hidden transition-colors group reveal`}
                  >
                    <div className="p-6 flex flex-col h-full">
                      {item.categoryLabel && (
                        <span className={`text-[10px] font-bold ${accent.text} uppercase tracking-wider mb-3 block`}>
                          {item.categoryLabel}
                        </span>
                      )}
                      <h4 className="text-lg font-bold text-white mb-3 group-hover:text-abBlue transition-colors">
                        <Link href={`${base}/blogs/${item.slug}`}>{item.title}</Link>
                      </h4>
                      <p className="text-sm text-gray-500 mb-6 flex-grow line-clamp-3">
                        {item.excerpt}
                      </p>
                      <Link
                        href={`${base}/blogs/${item.slug}`}
                        className="text-xs font-bold text-gray-400 group-hover:text-white transition-colors"
                      >
                        {b.readArticle} <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-20 bg-abBlack border-t border-gray-900 relative">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(#259fcf 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
          aria-hidden="true"
        />
        <div className="w-full px-4 sm:px-8 lg:px-12 relative z-10 text-center reveal">
          <MailOpen className="w-10 h-10 text-abBlue mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">{b.subscribeTitle}</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">{b.subscribeDesc}</p>
          <NewsletterForm
            locale={locale}
            placeholder={b.subscribePlaceholder}
            buttonLabel={b.subscribeButton}
            successMessage={b.subscribeSuccess}
            errorMessage={b.subscribeError}
            loadingMessage={b.subscribeLoading}
          />
          <p className="text-xs text-gray-600 mt-4">{b.subscribeDisclaimer}</p>
        </div>
      </section>
    </main>
  );
}
