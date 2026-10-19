import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { getAllPublishedArticles, getAllPublishedArticlesFiltered } from "@/lib/blog";
import { hasLocale, defaultLocale, getDictionary, localeBase, localeHome } from "@/app/[lang]/dictionaries";
import { SERVICE_OPTIONS } from "@/lib/constants";
import { generateSeoMetadata } from "@/lib/seo";

const SERVICE_TABS = [
  { slug: "all", label: "All" },
  ...SERVICE_OPTIONS.map((s) => ({ slug: s.slug, label: s.label.split(" ")[0] })),
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  return generateSeoMetadata({
    title: dict.blog.allArticles,
    description: dict.blog.allArticlesDescription,
    path: "/blogs",
    lang,
    keywords: "AB.Limo blog, luxury transportation articles, chauffeur service news, corporate travel tips, GCC mobility insights, airport transfer guide",
  });
}

const templateColors: Record<string, string> = {
  "service-country": "bg-blue-500/20 text-blue-300",
  "service-city": "bg-green-500/20 text-green-300",
};

const templateLabels: Record<string, string> = {
  "service-country": "Country",
  "service-city": "City",
};

export default async function BlogsPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ service?: string }>;
}) {
  const { lang } = await params;
  const sp = await searchParams;
  const locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  const b = dict.blog;
  const isArabic = locale.split("-")[0] === "ar";

  const activeService = sp.service || "all";

  const articles = activeService === "all"
    ? await getAllPublishedArticles(locale)
    : await getAllPublishedArticlesFiltered({ serviceSlug: activeService, locale });

  return (
    <main className="min-h-screen bg-[#292a30] text-white">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-8 pt-28 pb-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
          {b.allArticles}
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl">
          {b.allArticlesDescription}
        </p>
      </section>

      {/* Breadcrumb */}
      <section className="max-w-7xl mx-auto px-8 pb-8">
        <nav aria-label="Breadcrumb" className="flex justify-center">
          <ol className="flex items-center gap-2 text-sm text-gray-400 flex-wrap text-center" dir="ltr">
            <li className="flex items-center gap-2">
              <Link href={`${localeHome(lang)}`} className="hover:text-white transition-colors">
                {b.home}
              </Link>
              <span aria-hidden="true">{isArabic ? "←" : "→"}</span>
            </li>
            <li>
              <span className="text-white font-medium" aria-current="page">
                {b.allArticles}
              </span>
            </li>
          </ol>
        </nav>
      </section>

      {/* Service Filter Tabs */}
      <section className="max-w-7xl mx-auto px-8 pb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {SERVICE_TABS.map((tab) => {
            const isActive = activeService === tab.slug;
            const href = tab.slug === "all"
              ? `${localeBase(lang)}/blogs`
              : `${localeBase(lang)}/blogs?service=${tab.slug}`;
            return (
              <Link
                key={tab.slug}
                href={href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-abBlue text-white"
                    : "bg-[#1c1d21] text-gray-400 hover:text-white hover:bg-[#2a2c35]"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-8 pb-20">
        {articles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">{b.noArticles}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`${localeBase(lang)}/services/${article.slug.replace(/^services\//, "")}`}
                className="group block bg-[#1c1d21] rounded-2xl overflow-hidden hover:bg-[#2a2c35] transition-colors"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={
                      article.articleMedia?.heroCoverMedia?.url ||
                      "https://images.unsplash.com/photo-1547548731-e95343697eb4?q=80&w=600&auto=format&fit=crop"
                    }
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${templateColors[article.templateType] || "bg-gray-500/20 text-gray-300"}`}>
                      {templateLabels[article.templateType] || article.templateType}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-white line-clamp-2 mb-2 group-hover:text-abBlue transition-colors">
                    {article.title}
                  </h2>
                  {article.excerpt && (
                    <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                      {article.excerpt}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    {article.authorName && (
                      <span>{article.authorName}</span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(article.date).toLocaleDateString(isArabic ? "ar-SA" : "en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {article.readTime} {b.minRead}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
