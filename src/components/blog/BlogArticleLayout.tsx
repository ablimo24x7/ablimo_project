import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, User, Tag } from "lucide-react";
import type { ArticleDoc } from "@/lib/models/Article";

interface BlogArticleLayoutProps {
  article: ArticleDoc;
  lang: string;
  templateLabel: string;
  breadcrumbBase: { label: string; href: string };
  homeLabel: string;
  minReadLabel: string;
  keyTakeawaysLabel: string;
  finalThoughtsLabel: string;
  authorLabel: string;
  isArabic: boolean;
  children: React.ReactNode;
}

export function BlogArticleLayout({
  article,
  lang,
  templateLabel,
  breadcrumbBase,
  homeLabel,
  minReadLabel,
  keyTakeawaysLabel,
  finalThoughtsLabel,
  authorLabel,
  isArabic,
  children,
}: BlogArticleLayoutProps) {
  const heroImage =
    article.articleMedia?.heroCoverMedia?.url ||
    "https://images.unsplash.com/photo-1547548731-e95343697eb4?q=80&w=1332&auto=format&fit=crop";

  return (
    <main className="min-h-screen bg-[#292a30] text-white">
      {/* Hero Image */}
      <section className="relative w-full h-[300px] sm:h-[400px] md:h-[480px]">
        <Image
          src={heroImage}
          alt={article.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto w-full px-8 pb-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight max-w-4xl">
              {article.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="max-w-7xl mx-auto px-8 pt-8 pb-4">
        <nav aria-label="Breadcrumb" className="flex justify-center">
          <ol className="flex items-center gap-2 text-sm text-gray-400 flex-wrap text-center" dir="ltr">
            <li className="flex items-center gap-2">
              <Link href={`/${lang}`} className="hover:text-white transition-colors">
                {homeLabel}
              </Link>
              <span aria-hidden="true">{isArabic ? "←" : "→"}</span>
            </li>
            <li className="flex items-center gap-2">
              <Link href={breadcrumbBase.href} className="hover:text-white transition-colors">
                {breadcrumbBase.label}
              </Link>
              <span aria-hidden="true">{isArabic ? "←" : "→"}</span>
            </li>
            <li>
              <span className="text-white font-medium" aria-current="page">
                {templateLabel}
              </span>
            </li>
          </ol>
        </nav>
      </section>

      {/* Meta Info */}
      <section className="max-w-7xl mx-auto px-8 pb-8">
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400" dir="ltr">
          {article.authorName && (
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {authorLabel}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {new Date(article.date).toLocaleDateString(isArabic ? "ar-SA" : "en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {article.readTime} {minReadLabel}
          </span>
          {article.tags && article.tags.length > 0 && (
            <span className="flex items-center gap-1.5">
              <Tag className="h-4 w-4" />
              {article.tags.join(", ")}
            </span>
          )}
        </div>
      </section>

      {/* Article Content */}
      <article className="max-w-7xl mx-auto px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          {article.excerpt && (
            <p className="text-xl text-gray-300 leading-relaxed mb-10 pb-8 border-b border-gray-700">
              {article.excerpt}
            </p>
          )}

          {/* Body Content */}
          {article.bodyContent && (
            <div
              className={`prose prose-lg prose-invert max-w-none
                prose-headings:font-serif prose-headings:text-white
                prose-p:text-gray-300 prose-p:leading-relaxed
                prose-a:text-abGold prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white
                prose-img:rounded-2xl ${isArabic ? "text-right" : ""}`}
              dir={isArabic ? "rtl" : "ltr"}
              dangerouslySetInnerHTML={{ __html: article.bodyContent }}
            />
          )}

          {/* Key Takeaways */}
          {article.keyTakeawaysContent && (
            <div className="mt-12 bg-[#1c1d21] rounded-2xl p-8">
              <h2 className="text-2xl font-serif font-bold text-white mb-4">
                {keyTakeawaysLabel}
              </h2>
              <div
                className={`prose prose-lg prose-invert max-w-none
                  prose-headings:font-serif prose-headings:text-white
                  prose-p:text-gray-300 prose-p:leading-relaxed
                  prose-a:text-abGold prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-white ${isArabic ? "text-right" : ""}`}
                dir={isArabic ? "rtl" : "ltr"}
                dangerouslySetInnerHTML={{ __html: article.keyTakeawaysContent }}
              />
            </div>
          )}

          {/* Final Thoughts */}
          {article.finalThoughtsContent && (
            <div className="mt-12">
              <h2 className="text-2xl font-serif font-bold text-white mb-4">
                {finalThoughtsLabel}
              </h2>
              <div
                className={`prose prose-lg prose-invert max-w-none
                  prose-headings:font-serif prose-headings:text-white
                  prose-p:text-gray-300 prose-p:leading-relaxed
                  prose-a:text-abGold prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-white ${isArabic ? "text-right" : ""}`}
                dir={isArabic ? "rtl" : "ltr"}
                dangerouslySetInnerHTML={{ __html: article.finalThoughtsContent }}
              />
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
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: item.a,
                      },
                    })),
                  }),
                }}
              />
              <h2 className="text-2xl font-serif font-bold text-white mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {article.faqs.map((item) => (
                  <div
                    key={item.q}
                    className="bg-[#1c1d21] rounded-2xl overflow-hidden"
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
          )}
        </div>
      </article>

      {/* Template-specific content */}
      {children}
    </main>
  );
}
