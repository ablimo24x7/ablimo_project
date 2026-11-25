import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogByIdOrSlug, getRelatedBlogs } from "@/lib/blog";
import { getAllPublishedServices } from "@/lib/services";
import { BlogArticleLayout } from "@/components/blog/BlogArticleLayout";
import { BlogArticleTemplate } from "@/components/blog/BlogArticleTemplate";
import { RelatedArticles } from "@/components/blog/RelatedArticles";
import { hasLocale, defaultLocale, getDictionary, localeBase } from "@/app/[lang]/dictionaries";
import { generateSeoMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ lang: string; id: string }>;
  searchParams: Promise<{ preview?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, id } = await params;
  const locale = hasLocale(lang) ? lang : defaultLocale;
  const article = await getBlogByIdOrSlug(id, locale, true);
  if (!article) return { title: { absolute: "Not Found | AB" } };

  const title = article.seo_metadata?.metaTitle || article.title;
  const description = article.seo_metadata?.metaDescription || article.excerpt;
  const keywords = `${title}, AB blog, luxury transportation, chauffeur service`;

  return generateSeoMetadata({
    title,
    description,
    // Always canonical to the slug URL, even when the visitor arrived on
    // the ObjectId form, so both URLs consolidate in search.
    path: article.slug ? `/blogs/${article.slug}` : `/blogs/${id}`,
    lang,
    keywords,
    ogImage: article.seo_metadata?.ogImage,
    type: "article",
    publishedTime: article.date,
    authors: article.authorName ? [article.authorName] : undefined,
  });
}

export default async function BlogDetailPage({ params, searchParams }: Props) {
  const { lang, id } = await params;
  const { preview } = await searchParams;
  const locale = hasLocale(lang) ? lang : defaultLocale;
  const isPreview = preview === "true";

  const article = await getBlogByIdOrSlug(id, locale, isPreview);
  if (!article) notFound();

  const isArabic = locale.split("-")[0] === "ar";
  const dict = await getDictionary(locale);
  const b = dict.blog;

  const hasCategory = !!article.categoryLabel && article.categoryLabel !== "Uncategorized";
  const templateLabel = hasCategory ? article.categoryLabel : b.article;

  const related = await getRelatedBlogs({
    locale,
    excludeSlug: article.slug,
    limit: 4,
  });

  // Insights ("blog" template) uses the control-room archive template;
  // country/city template articles keep the legacy layout as a fallback
  // (their primary rendering lives under /services/...).
  if (article.templateType === "blog") {
    const services = await getAllPublishedServices();
    return (
      <BlogArticleTemplate
        article={article}
        lang={lang}
        locale={locale}
        isArabic={isArabic}
        services={services}
        related={related}
        dict={dict}
      />
    );
  }

  return (
    <BlogArticleLayout
      article={article}
      lang={lang}
      templateLabel={templateLabel}
      breadcrumbBase={{ label: b.blog, href: `${localeBase(lang)}/blogs` }}
      homeLabel={b.home}
      minReadLabel={b.minRead}
      keyTakeawaysLabel={b.keyTakeaways}
      finalThoughtsLabel={b.finalThoughts}
      authorLabel={article.authorName || "Admin"}
      faqTitle={b.faqTitle}
      isArabic={isArabic}
    >
      <RelatedArticles
        articles={related}
        lang={lang}
        viewAllHref={`${localeBase(lang)}/blogs`}
        viewAllLabel={b.viewAllArticles}
        heading={b.relatedArticles}
        itemHref={(a) => `${localeBase(lang)}/blogs/${a.slug}`}
      />
    </BlogArticleLayout>
  );
}
