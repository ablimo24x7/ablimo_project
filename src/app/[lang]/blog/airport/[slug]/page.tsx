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
  const article = await getArticleBySlug(slug, "airport", locale);
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

export default async function AirportBlogPage({ params }: Props) {
  const { lang, slug } = await params;
  const locale = hasLocale(lang) ? lang : defaultLocale;

  const article = await getArticleBySlug(slug, "airport", locale);
  if (!article) notFound();

  const related = await getRelatedArticles("airport", locale, slug, 4);

  return (
    <BlogArticleLayout
      article={article}
      lang={lang}
      templateLabel={article.airportName || "Airport Transfer"}
      breadcrumbBase={{
        label: article.country || "Airport Transfers",
        href: article.country && article.city
          ? `/${lang}/countries/${article.country.toLowerCase().replace(/\s+/g, "-")}/${article.city.toLowerCase().replace(/\s+/g, "-")}/airport-transfer`
          : `/${lang}/airport-transfer`,
      }}
    >
      {/* Airport-specific sidebar info */}
      <section className="max-w-7xl mx-auto px-8 pb-16">
        <div className="bg-[#1c1d21] rounded-2xl p-8 max-w-4xl mx-auto">
          <h2 className="text-xl font-serif font-bold text-white mb-4">
            {article.airportName || "Airport"} Transfer Services
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Experience seamless airport transfers with our premium limousine service.
            Whether you're arriving at or departing from {article.airportName || "the airport"},
            {article.city ? ` in ${article.city}` : ""}
            {article.country ? `, ${article.country}` : ""}, our professional chauffeurs
            provide punctual, comfortable, and stress-free transportation.
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            {article.country && article.city && (
              <a
                href={`/${lang}/countries/${article.country.toLowerCase().replace(/\s+/g, "-")}/${article.city?.toLowerCase().replace(/\s+/g, "-")}/airport-transfer`}
                className="inline-flex items-center gap-2 text-abGold hover:text-abGold/80 font-medium transition-colors text-sm"
              >
                View {article.city} airport transfers →
              </a>
            )}
          </div>
        </div>
      </section>

      <RelatedArticles
        articles={related}
        lang={lang}
        viewAllHref={`/${lang}/airport-transfer`}
        viewAllLabel="View all airport articles"
      />
    </BlogArticleLayout>
  );
}
