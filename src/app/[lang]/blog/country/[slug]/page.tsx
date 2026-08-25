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
  const article = await getArticleBySlug(slug, "country", locale);
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

export default async function CountryBlogPage({ params }: Props) {
  const { lang, slug } = await params;
  const locale = hasLocale(lang) ? lang : defaultLocale;

  const article = await getArticleBySlug(slug, "country", locale);
  if (!article) notFound();

  const related = await getRelatedArticles("country", locale, slug, 4);

  return (
    <BlogArticleLayout
      article={article}
      lang={lang}
      templateLabel={article.country || "Country"}
      breadcrumbBase={{ label: "Countries", href: `/${lang}/countries` }}
    >
      {/* Country-specific sidebar info */}
      {article.country && (
        <section className="max-w-7xl mx-auto px-8 pb-16">
          <div className="bg-[#1c1d21] rounded-2xl p-8 max-w-4xl mx-auto">
            <h2 className="text-xl font-serif font-bold text-white mb-4">
              About {article.country}
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Explore our comprehensive limousine and ground transportation services
              in {article.country}. We provide premium airport transfers, city tours,
              and executive travel across the region.
            </p>
            <a
              href={`/${lang}/countries/${article.country?.toLowerCase().replace(/\s+/g, "-")}`}
              className="inline-flex items-center gap-2 mt-4 text-abGold hover:text-abGold/80 font-medium transition-colors text-sm"
            >
              View all {article.country} services →
            </a>
          </div>
        </section>
      )}

      <RelatedArticles
        articles={related}
        lang={lang}
        viewAllHref={`/${lang}/countries`}
        viewAllLabel="View all country articles"
      />
    </BlogArticleLayout>
  );
}
