import { z } from "zod";

const MediaItemSchema = z.object({
  url: z.string().optional().default(""),
}).optional();

const ArticleMediaSchema = z.object({
  heroCoverMedia: MediaItemSchema,
}).optional();

const SeoMetadataSchema = z.object({
  metaTitle: z.string().max(60).optional().default(""),
  metaDescription: z.string().max(160).optional().default(""),
  ogImage: z.string().optional().default(""),
});

export const PostCreateSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200),
  excerpt: z.string().max(500).optional().default(""),
  category: z.string().min(1),
  categoryLabel: z.string().optional().default(""),
  author: z.string().optional().default("admin"),
  authorName: z.string().optional().default("Admin"),
  author_photo: z.string().optional().default(""),
  date: z.string().optional().default(""),
  readTime: z.number().int().min(1).max(600).optional().default(5),
  featured: z.boolean().optional().default(false),
  tags: z.array(z.string()).optional().default([]),
  views: z.number().int().min(0).optional().default(0),
  status: z.enum(["draft", "staging", "review", "published", "scheduled", "archived"]).optional().default("draft"),
  locale: z.string().max(10).optional().default("en"),

  articleMedia: ArticleMediaSchema,
  bodyContent: z.string().optional().default(""),
  keyTakeawaysContent: z.string().optional().default(""),
  finalThoughtsContent: z.string().optional().default(""),

  // ABLimo template fields
  templateType: z.enum(["country", "city", "city-to-city", "airport"]).optional().default("country"),
  country: z.string().optional().default(""),
  city: z.string().optional().default(""),
  routeFrom: z.string().optional().default(""),
  routeTo: z.string().optional().default(""),
  airportName: z.string().optional().default(""),

  seo_metadata: SeoMetadataSchema.optional(),
});

export const PostUpdateSchema = PostCreateSchema.partial().extend({
  title: z.string().min(1).max(200).optional(),
  slug: z.string().min(1).max(200).optional(),
});

export const PostListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  q: z.string().trim().max(200).optional(),
  category: z.string().optional(),
  author: z.string().optional(),
  status: z.enum(["draft", "staging", "review", "published", "scheduled", "archived"]).optional(),
  tags: z.string().trim().max(200).optional(),
  sort: z.enum(["date", "views", "title"]).optional().default("date"),
  order: z.enum(["asc", "desc"]).optional().default("desc"),
  templateType: z.enum(["country", "city", "city-to-city", "airport"]).optional(),
});
