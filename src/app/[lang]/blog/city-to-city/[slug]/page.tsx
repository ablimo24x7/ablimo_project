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
  const article = await getArticleBySlug(slug, "city-to-city", locale);
  if (!article) return { title: "Not Found" };

  const routeLabel =
    article.routeFrom && article.routeTo
      ? `${article.routeFrom} to ${article.routeTo}`
      : article.title;

  return {
    title: article.seo_metadata?.metaTitle || routeLabel,
    description: article.seo_metadata?.metaDescription || article.excerpt,
    openGraph: {
      title: article.seo_metadata?.metaTitle || routeLabel,
      description: article.seo_metadata?.metaDescription || article.excerpt,
      images: article.seo_metadata?.ogImage ? [article.seo_metadata.ogImage] : undefined,
    },
  };
}

export default async function CityToCityBlogPage({ params }: Props) {
  const { lang, slug } = await params;
  const locale = hasLocale(lang) ? lang : defaultLocale;

  const article = await getArticleBySlug(slug, "city-to-city", locale);
  if (!article) notFound();

  const routeLabel =
    article.routeFrom && article.routeTo
      ? `${article.routeFrom} to ${article.routeTo}`
      : "Route";

  const related = await getRelatedArticles("city-to-city", locale, slug, 4);

  return (
    <BlogArticleLayout
      article={article}
      lang={lang}
      templateLabel={routeLabel}
      breadcrumbBase={{ label: "City to City", href: `/${lang}/city-to-city` }}
    >
      {/* Route-specific sidebar info */}
      <section className="max-w-7xl mx-auto px-8 pb-16">
        <div className="bg-[#1c1d21] rounded-2xl p-8 max-w-4xl mx-auto">
          <h2 className="text-xl font-serif font-bold text-white mb-4">
            {routeLabel} Route
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Travel between {article.routeFrom || "cities"} and{" "}
            {article.routeTo || "destinations"} in comfort and style. Our professional
            chauffeurs ensure a safe, punctual, and luxurious journey across the region.
          </p>
          <a
            href={`/${lang}/city-to-city/${slug}`}
            className="inline-flex items-center gap-2 mt-4 text-abGold hover:text-abGold/80 font-medium transition-colors text-sm"
          >
            View route details →
          </a>
        </div>
      </section>

      <RelatedArticles
        articles={related}
        lang={lang}
        viewAllHref={`/${lang}/city-to-city`}
        viewAllLabel="View all routes"
      />
    </BlogArticleLayout>
  );
}
