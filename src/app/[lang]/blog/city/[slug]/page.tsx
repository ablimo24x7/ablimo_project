import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getArticleBySlug, getRelatedArticles } from "@/lib/blog";
import { BlogArticleLayout } from "@/components/blog/BlogArticleLayout";
import { RelatedArticles } from "@/components/blog/RelatedArticles";
import { hasLocale, defaultLocale } from "@/app/[lang]/dictionaries";

type Props = {
  params: Promise<{ lang: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = hasLocale(lang) ? lang : defaultLocale;
  const article = await getArticleBySlug(slug, "city", locale);
  if (!article) return { title: "Not Found" };

  return {
    title: article.seo_metadata?.metaTitle || article.title,
    description: article.seo_metadata?.metaDescription || article.excerpt,
    openGraph: {
      title: article.seo_metadata?.metaTitle || article.title,
      description: article.seo_metadata?.metaDescription || article.excerpt,
      images: article.seo_metadata?.ogImage ? [article.seo_metadata.ogImage] : undefined,
    },
  };
}

export default async function CityBlogPage({ params }: Props) {
  const { lang, slug } = await params;
  const locale = hasLocale(lang) ? lang : defaultLocale;

  const article = await getArticleBySlug(slug, "city", locale);
  if (!article) notFound();

  const related = await getRelatedArticles("city", locale, slug, 4);

  return (
    <BlogArticleLayout
      article={article}
      lang={lang}
      templateLabel={article.city || "City"}
      breadcrumbBase={{
        label: article.country || "Countries",
        href: article.country
          ? `/${lang}/countries/${article.country.toLowerCase().replace(/\s+/g, "-")}`
          : `/${lang}/countries`,
      }}
    >
      {/* City-specific sidebar info */}
      {article.city && (
        <section className="max-w-7xl mx-auto px-8 pb-16">
          <div className="bg-[#1c1d21] rounded-2xl p-8 max-w-4xl mx-auto">
            <h2 className="text-xl font-serif font-bold text-white mb-4">
              Limo Service in {article.city}
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Discover premium limousine and chauffeur services in {article.city}
              {article.country ? `, ${article.country}` : ""}. From airport transfers
              to city tours, we ensure a comfortable and luxurious travel experience.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              {article.country && (
                <a
                  href={`/${lang}/countries/${article.country.toLowerCase().replace(/\s+/g, "-")}/${article.city?.toLowerCase().replace(/\s+/g, "-")}`}
                  className="inline-flex items-center gap-2 text-abGold hover:text-abGold/80 font-medium transition-colors text-sm"
                >
                  View {article.city} details →
                </a>
              )}
              {article.country && article.city && (
                <a
                  href={`/${lang}/countries/${article.country.toLowerCase().replace(/\s+/g, "-")}/${article.city?.toLowerCase().replace(/\s+/g, "-")}/airport-transfer`}
                  className="inline-flex items-center gap-2 text-abGold hover:text-abGold/80 font-medium transition-colors text-sm"
                >
                  Airport transfers →
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      <RelatedArticles
        articles={related}
        lang={lang}
        viewAllHref={`/${lang}/countries`}
        viewAllLabel="View all city articles"
      />
    </BlogArticleLayout>
  );
}
