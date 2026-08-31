import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchAndTranslateArticle, getRelatedArticles } from "@/lib/blog";
import { BlogArticleLayout } from "@/components/blog/BlogArticleLayout";
import { RelatedArticles } from "@/components/blog/RelatedArticles";
import { hasLocale, defaultLocale, getDictionary } from "@/app/[lang]/dictionaries";
import { translateText } from "@/lib/translate";

type Props = {
  params: Promise<{ lang: string; slug: string }>;
  searchParams: Promise<{ preview?: string }>;
};

async function getTranslatedArticle(slug: string, locale: string, preview: boolean) {
  return fetchAndTranslateArticle(slug, locale, preview);
}

function getBreadcrumbKey(templateType: string, dict: { countries?: string; cities?: string; cityToCity?: string; airportTransfers?: string; article?: string }): string {
  switch (templateType) {
    case "country": return dict.countries || "Countries";
    case "city": return dict.cities || "Cities";
    case "city-to-city": return dict.cityToCity || "City to City";
    case "airport": return dict.airportTransfers || "Airport Transfers";
    default: return dict.article || "Blog";
  }
}

function getViewAllHref(templateType: string, lang: string): string {
  switch (templateType) {
    case "country": return `/${lang}/locations`;
    case "city": return `/${lang}/locations`;
    case "city-to-city": return `/${lang}/city-to-city`;
    case "airport": return `/${lang}/services/airport-transfers`;
    default: return `/${lang}/blog`;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = hasLocale(lang) ? lang : defaultLocale;
  const article = await getTranslatedArticle(slug, locale, true);
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

export default async function BlogSlugPage({ params, searchParams }: Props) {
  const { lang, slug } = await params;
  const { preview } = await searchParams;
  const locale = hasLocale(lang) ? lang : defaultLocale;
  const isPreview = preview === "true";

  const article = await getTranslatedArticle(slug, locale, isPreview);
  if (!article) notFound();

  const isArabic = locale.split("-")[0] === "ar";
  const dict = await getDictionary(locale);
  const b = dict.blog;

  const templateLabel =
    article.templateType === "city-to-city" && article.routeFrom && article.routeTo
      ? `${article.routeFrom} to ${article.routeTo}`
      : article.country || article.city || article.airportName || b.article;

  const breadcrumbBase = {
    label: getBreadcrumbKey(article.templateType, b),
    href: getViewAllHref(article.templateType, lang),
  };

  const sideInfo = await getTranslatedSideInfo(article.templateType, article, locale, lang);
  const related = await getRelatedArticles(article.templateType, locale, slug, 4);

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
        viewAllHref={getViewAllHref(article.templateType, lang)}
        viewAllLabel={b.viewAllArticles}
      />
    </BlogArticleLayout>
  );
}

async function getTranslatedSideInfo(
  templateType: string,
  article: { country?: string; city?: string; routeFrom?: string; routeTo?: string; airportName?: string },
  locale: string,
  lang: string
): Promise<React.ReactNode> {
  const isArabic = locale.split("-")[0] === "ar";

  switch (templateType) {
    case "country": {
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
              href={`/${lang}/locations/${article.country.toLowerCase().replace(/\s+/g, "-")}`}
              className="inline-flex items-center gap-2 mt-4 text-abGold hover:text-abGold/80 font-medium transition-colors text-sm"
            >
              {linkText} {isArabic ? "←" : "→"}
            </a>
          </div>
        </section>
      );
    }

    case "city": {
      if (!article.city) return null;
      const [title, desc, detailText, airportText] = await Promise.all([
        translateText(`Limo Service in ${article.city}`, locale),
        translateText(
          `Discover premium limousine and chauffeur services in ${article.city}${article.country ? `, ${article.country}` : ""}. From airport transfers to city tours, we ensure a comfortable and luxurious travel experience.`,
          locale
        ),
        translateText(`View ${article.city} details`, locale),
        translateText("Airport transfers", locale),
      ]);
      return (
        <section className="max-w-7xl mx-auto px-8 pb-16">
          <div className="bg-[#1c1d21] rounded-2xl p-8 max-w-4xl mx-auto">
            <h2 className="text-xl font-serif font-bold text-white mb-4">{title}</h2>
            <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            <div className="flex flex-wrap gap-3 mt-4">
              {article.country && (
                <a
                  href={`/${lang}/locations/${article.country.toLowerCase().replace(/\s+/g, "-")}/${article.city?.toLowerCase().replace(/\s+/g, "-")}`}
                  className="inline-flex items-center gap-2 text-abGold hover:text-abGold/80 font-medium transition-colors text-sm"
                >
                  {detailText} {isArabic ? "←" : "→"}
                </a>
              )}
              {article.country && article.city && (
                <a
                  href={`/${lang}/locations/${article.country.toLowerCase().replace(/\s+/g, "-")}/${article.city?.toLowerCase().replace(/\s+/g, "-")}`}
                  className="inline-flex items-center gap-2 text-abGold hover:text-abGold/80 font-medium transition-colors text-sm"
                >
                  {airportText} {isArabic ? "←" : "→"}
                </a>
              )}
            </div>
          </div>
        </section>
      );
    }

    case "city-to-city": {
      const [title, desc] = await Promise.all([
        translateText(`${article.routeFrom} to ${article.routeTo} Route`, locale),
        translateText(
          `Travel between ${article.routeFrom || "cities"} and ${article.routeTo || "destinations"} in comfort and style. Our professional chauffeurs ensure a safe, punctual, and luxurious journey across the region.`,
          locale
        ),
      ]);
      return (
        <section className="max-w-7xl mx-auto px-8 pb-16">
          <div className="bg-[#1c1d21] rounded-2xl p-8 max-w-4xl mx-auto">
            <h2 className="text-xl font-serif font-bold text-white mb-4">{title}</h2>
            <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
          </div>
        </section>
      );
    }

    case "airport": {
      const [title, desc, linkText] = await Promise.all([
        translateText(`${article.airportName || "Airport"} Transfer Services`, locale),
        translateText(
          `Experience seamless airport transfers with our premium limousine service. Whether you're arriving at or departing from ${article.airportName || "the airport"}${article.city ? ` in ${article.city}` : ""}${article.country ? `, ${article.country}` : ""}, our professional chauffeurs provide punctual, comfortable, and stress-free transportation.`,
          locale
        ),
        translateText(article.city ? `View ${article.city} airport transfers` : "View airport transfers", locale),
      ]);
      return (
        <section className="max-w-7xl mx-auto px-8 pb-16">
          <div className="bg-[#1c1d21] rounded-2xl p-8 max-w-4xl mx-auto">
            <h2 className="text-xl font-serif font-bold text-white mb-4">{title}</h2>
            <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            {article.country && article.city && (
              <div className="flex flex-wrap gap-3 mt-4">
                <a
                  href={`/${lang}/locations/${article.country.toLowerCase().replace(/\s+/g, "-")}/${article.city?.toLowerCase().replace(/\s+/g, "-")}`}
                  className="inline-flex items-center gap-2 text-abGold hover:text-abGold/80 font-medium transition-colors text-sm"
                >
                  {linkText} {isArabic ? "←" : "→"}
                </a>
              </div>
            )}
          </div>
        </section>
      );
    }

    default:
      return null;
  }
}
