import { Schema, model, models, type InferSchemaType } from "mongoose";

const mediaItemSchema = new Schema(
  {
    url: { type: String, default: "" },
  },
  { _id: false }
);

const articleMediaSchema = new Schema(
  {
    heroCoverMedia: { type: mediaItemSchema, default: () => ({}) },
  },
  { _id: false }
);

const articleSchema = new Schema(
  {
    slug: { type: String, required: true },
    title: { type: String, required: true },
    excerpt: { type: String, default: "" },
    category: { type: String, default: "uncategorized" },
    categoryLabel: { type: String, default: "Uncategorized" },
    author: { type: String, default: "unknown" },
    authorName: { type: String, default: "Unknown Author" },
    author_photo: { type: String, default: "" },
    date: { type: String, required: true },
    readTime: { type: Number, default: 5 },
    featured: { type: Boolean, default: false },
    tags: [{ type: String }],
    views: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["draft", "staging", "review", "published", "scheduled", "archived"],
      default: "published",
    },
    articleMedia: { type: articleMediaSchema, default: () => ({}) },
    bodyContent: { type: String, default: "" },
    keyTakeawaysContent: { type: String, default: "" },
    finalThoughtsContent: { type: String, default: "" },

    // ── ABLimo Template Fields ─────────────────────────────
    templateType: {
      type: String,
      enum: ["country", "city", "city-to-city", "airport"],
      default: "country",
    },
    country: { type: String, default: "" },
    city: { type: String, default: "" },
    routeFrom: { type: String, default: "" },
    routeTo: { type: String, default: "" },
    airportName: { type: String, default: "" },

    // ── SEO ────────────────────────────────────────────────
    seo_metadata: {
      metaTitle: { type: String, default: "" },
      metaDescription: { type: String, default: "" },
      ogImage: { type: String, default: "" },
    },

    // ── Locale ─────────────────────────────────────────────
    locale: { type: String, default: "en" },
  },
  {
    timestamps: true,
  }
);

articleSchema.index({ status: 1 });
articleSchema.index({ category: 1 });
articleSchema.index({ featured: 1 });
articleSchema.index({ templateType: 1 });
articleSchema.index({ country: 1 });
articleSchema.index({ city: 1 });
articleSchema.index({ title: "text", slug: "text" });
articleSchema.index({ locale: 1, date: -1 });
articleSchema.index({ slug: 1, locale: 1 }, { unique: true });

export type ArticleDoc = InferSchemaType<typeof articleSchema>;

export const Article = models.Article || model("Article", articleSchema);
