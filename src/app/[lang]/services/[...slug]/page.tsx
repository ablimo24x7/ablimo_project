import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchAndTranslateArticle, getRelatedArticles } from "@/lib/blog";
import { BlogArticleLayout } from "@/components/blog/BlogArticleLayout";
import { RelatedArticles } from "@/components/blog/RelatedArticles";
import { hasLocale, defaultLocale, getDictionary } from "@/app/[lang]/dictionaries";
import { translateText } from "@/lib/translate";

type Props = {
  params: Promise<{ lang: string; slug: string[] }>;
  searchParams: Promise<{ preview?: string }>;
};

function getBreadcrumbKey(templateType: string, dict: { countries?: string; cities?: string; cityToCity?: string; airportTransfers?: string; article?: string }): string {
  switch (templateType) {
    case "service-country": return dict.countries || "Countries";
    case "service-city": return dict.cities || "Cities";
    default: return dict.article || "Blog";
  }
}

function getViewAllHref(templateType: string, lang: string, serviceSlug?: string, countrySlug?: string): string {
  switch (templateType) {
    case "service-country": return serviceSlug ? `/${lang}/services/${serviceSlug}` : `/${lang}/blogs`;
    case "service-city": return serviceSlug && countrySlug ? `/${lang}/services/${serviceSlug}/${countrySlug}` : `/${lang}/blogs`;
    default: return `/${lang}/blogs`;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = hasLocale(lang) ? lang : defaultLocale;
  const dbSlug = `services/${slug.join("/")}`;
  const article = await fetchAndTranslateArticle(dbSlug, locale, true);
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

export default async function ServiceArticlePage({ params, searchParams }: Props) {
  const { lang, slug } = await params;
  const { preview } = await searchParams;
  const locale = hasLocale(lang) ? lang : defaultLocale;
  const isPreview = preview === "true";

  const dbSlug = `services/${slug.join("/")}`;
  const article = await fetchAndTranslateArticle(dbSlug, locale, isPreview);
  if (!article) notFound();

  const isArabic = locale.split("-")[0] === "ar";
  const dict = await getDictionary(locale);
  const b = dict.blog;

  const templateLabel =
    article.templateType === "service-city" && article.city
      ? article.city
      : article.country || article.city || b.article;

  const breadcrumbBase = {
    label: getBreadcrumbKey(article.templateType, b),
    href: getViewAllHref(article.templateType, lang, article.serviceSlug, article.countrySlug),
  };

  const sideInfo = await getTranslatedSideInfo(article.templateType, article, locale, lang);
  const related = await getRelatedArticles({
    serviceSlug: article.serviceSlug || "",
    countrySlug: article.countrySlug || "",
    locale,
    excludeSlug: dbSlug,
    limit: 4,
  });

  return (
    <BlogArticleLayout
      article={article}
      lang={lang}
      templateLabel={templateLabel}
      breadcrumbBase={breadcrumbBase}
      homeLabel={b.home}
      minReadLabel={b.minRead}
      keyTakeawaysLabel={b.keyTakeaways}
      finalThoughtsLabel={b.finalThoughts}
      authorLabel={article.authorName || "Admin"}
      isArabic={isArabic}
    >
      {sideInfo}
      <RelatedArticles
        articles={related}
        lang={lang}
        viewAllHref={getViewAllHref(article.templateType, lang, article.serviceSlug, article.countrySlug)}
        viewAllLabel={b.viewAllArticles}
      />
    </BlogArticleLayout>
  );
}

async function getTranslatedSideInfo(
  templateType: string,
  article: { country?: string; city?: string; serviceSlug?: string; countrySlug?: string; citySlug?: string; routeFrom?: string; routeTo?: string },
  locale: string,
  lang: string
): Promise<React.ReactNode> {
  const isArabic = locale.split("-")[0] === "ar";

  switch (templateType) {
    case "service-country": {
      if (!article.country) return null;
      const [title, desc, linkText] = await Promise.all([
        translateText(`About ${article.country}`, locale),
        translateText(
          `Explore our comprehensive limousine and ground transportation services in ${article.country}. We provide premium airport transfers, city tours, and executive travel across the region.`,
          locale
        ),
        translateText(`View all ${article.country} services`, locale),
      ]);
      return (
        <section className="max-w-7xl mx-auto px-8 pb-16">
          <div className="bg-[#1c1d21] rounded-2xl p-8 max-w-4xl mx-auto">
            <h2 className="text-xl font-serif font-bold text-white mb-4">{title}</h2>
            <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            <a
              href={`/${lang}/services/${article.serviceSlug || "chauffeur-vip"}/${article.countrySlug || article.country?.toLowerCase().replace(/\s+/g, "-")}`}
              className="inline-flex items-center gap-2 mt-4 text-abGold hover:text-abGold/80 font-medium transition-colors text-sm"
            >
              {linkText} {isArabic ? "←" : "→"}
            </a>
          </div>
        </section>
      );
    }

    case "service-city": {
      if (!article.city) return null;
      const [title, desc, detailText] = await Promise.all([
        translateText(`Limo Service in ${article.city}`, locale),
        translateText(
          `Discover premium limousine and chauffeur services in ${article.city}${article.country ? `, ${article.country}` : ""}. From airport transfers to city tours, we ensure a comfortable and luxurious travel experience.`,
          locale
        ),
        translateText(`View ${article.city} details`, locale),
      ]);
      return (
        <section className="max-w-7xl mx-auto px-8 pb-16">
          <div className="bg-[#1c1d21] rounded-2xl p-8 max-w-4xl mx-auto">
            <h2 className="text-xl font-serif font-bold text-white mb-4">{title}</h2>
            <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            <div className="flex flex-wrap gap-3 mt-4">
              {article.serviceSlug && article.countrySlug && article.citySlug && (
                <a
                  href={`/${lang}/services/${article.serviceSlug}/${article.countrySlug}/${article.citySlug}`}
                  className="inline-flex items-center gap-2 text-abGold hover:text-abGold/80 font-medium transition-colors text-sm"
                >
                  {detailText} {isArabic ? "←" : "→"}
                </a>
              )}
            </div>
          </div>
        </section>
      );
    }

    default:
      return null;
  }
}
