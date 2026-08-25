import { connectDB } from "@/lib/db";
import { Article, type ArticleDoc } from "@/lib/models/Article";

export async function getArticleBySlug(
  slug: string,
  templateType: string,
  locale: string = "en"
): Promise<ArticleDoc | null> {
  await connectDB();
  const article = await Article.findOne({
    slug,
    templateType,
    locale,
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
  await connectDB();
  const articles = await Article.find({
    templateType,
    locale,
    status: "published",
    slug: { $ne: excludeSlug },
  })
    .sort({ date: -1 })
    .limit(limit)
    .lean();
  return articles as ArticleDoc[];
}
