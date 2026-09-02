import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import type { ArticleDoc } from "@/lib/models/Article";

interface RelatedArticlesProps {
  articles: ArticleDoc[];
  lang: string;
  viewAllHref: string;
  viewAllLabel: string;
}

export function RelatedArticles({
  articles,
  lang,
  viewAllHref,
  viewAllLabel,
}: RelatedArticlesProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-8 py-16 border-t border-gray-700">
      <h2 className="text-2xl font-serif font-bold text-white mb-8 text-center">
        Related Articles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/${lang}/blog/${article.slug}`}
            className="group block bg-[#1c1d21] rounded-2xl overflow-hidden hover:bg-[#2a2c35] transition-colors"
          >
            <div className="relative h-40 w-full">
              <Image
                src={
                  article.articleMedia?.heroCoverMedia?.url ||
                  "https://images.unsplash.com/photo-1547548731-e95343697eb4?q=80&w=600&auto=format&fit=crop"
                }
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-white line-clamp-2 mb-2 group-hover:text-abGold transition-colors">
                {article.title}
              </h3>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {article.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {article.readTime} min
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link
          href={viewAllHref}
          className="inline-flex items-center gap-2 text-abGold hover:text-abGold/80 font-medium transition-colors"
        >
          {viewAllLabel} →
        </Link>
      </div>
    </section>
  );
}
