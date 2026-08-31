import { connectDB } from "@/lib/db";
import { getEnv } from "@/lib/env";
import { Article, type ArticleDoc } from "@/lib/models/Article";
import { needsTranslation, translateText, translateHtml } from "@/lib/translate";

/** True when the database is available (USE_DATABASE=true). */
function isDatabaseEnabled(): boolean {
  try {
    return getEnv().USE_DATABASE !== "false";
  } catch {
    return true;
  }
}

function localeFilter(locale: string) {
  const short = locale.split("-")[0];
  return { locale: { $in: [locale, short] } };
}

export async function getArticleBySlugOnly(
  slug: string,
  locale: string = "en",
  preview: boolean = false
): Promise<ArticleDoc | null> {
  if (!isDatabaseEnabled()) return null;
  await connectDB();
  const filter: Record<string, unknown> = {
    slug,
    ...localeFilter(locale),
  };
  if (!preview) {
    filter.status = "published";
  }
  const article = await Article.findOne(filter).lean();
  return article ? (article as ArticleDoc) : null;
}

export async function getArticleBySlug(
  slug: string,
  templateType: string,
  locale: string = "en"
): Promise<ArticleDoc | null> {
  if (!isDatabaseEnabled()) return null;
  await connectDB();
  const article = await Article.findOne({
    slug,
    templateType,
    ...localeFilter(locale),
    status: "published",
  }).lean();
  return article ? (article as ArticleDoc) : null;
}

export async function getRelatedArticles(
  templateType: string,
  locale: string = "en",
  excludeSlug: string = "",
  limit: number = 4
): Promise<ArticleDoc[]> {
  if (!isDatabaseEnabled()) return [];
  await connectDB();
  const articles = await Article.find({
    templateType,
    ...localeFilter(locale),
    status: "published",
    slug: { $ne: excludeSlug },
  })
    .sort({ date: -1 })
    .limit(limit)
    .lean();
  return articles as ArticleDoc[];
}

export async function getAllPublishedArticles(
  locale: string = "en"
): Promise<ArticleDoc[]> {
  if (!isDatabaseEnabled()) return [];
  await connectDB();
  let articles = await Article.find({
    ...localeFilter(locale),
    status: "published",
  })
    .sort({ date: -1 })
    .lean();

  if (articles.length === 0 && locale !== "en") {
    articles = await Article.find({
      ...localeFilter("en"),
      status: "published",
    })
      .sort({ date: -1 })
      .lean();
  }

  return articles as ArticleDoc[];
}

export async function fetchAndTranslateArticle(
  slug: string,
  locale: string,
  preview: boolean = false
): Promise<ArticleDoc | null> {
  let article = await getArticleBySlugOnly(slug, locale, preview);

  if (!article) {
    article = await getArticleBySlugOnly(slug, "en", preview);
    if (article && needsTranslation(locale, "en")) {
      const [title, excerpt, body, keyTakeaways, finalThoughts] =
        await Promise.all([
          translateText(article.title, locale),
          translateText(article.excerpt || "", locale),
          translateHtml(article.bodyContent || "", locale),
          translateHtml(article.keyTakeawaysContent || "", locale),
          translateHtml(article.finalThoughtsContent || "", locale),
        ]);
      article = { ...article, title, excerpt, bodyContent: body, keyTakeawaysContent: keyTakeaways, finalThoughtsContent: finalThoughts };
    }
  }

  return article;
}
