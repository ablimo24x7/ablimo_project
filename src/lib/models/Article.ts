import { Schema, model, models, type InferSchemaType } from "mongoose";

const faqSchema = new Schema(
  {
    q: { type: String, default: "" },
    a: { type: String, default: "" },
  },
  { _id: false }
);

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

const textImageElementSchema = new Schema(
  {
    id: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ["tag", "label", "heading", "paragraph", "button"],
    },
    content: { type: String, default: "" },
    headingLevel: {
      type: String,
      enum: ["h1", "h2", "h3", "h4", "h5", "h6"],
      default: "h2",
    },
    url: { type: String, default: "" },
    target: { type: String, default: "_self" },
    icon: {
      type: {
        library: { type: String, default: "lucide" },
        name: { type: String, default: "" },
        position: { type: String, enum: ["left", "right"], default: "right" },
      },
      default: () => ({ library: "lucide", name: "", position: "right" }),
    },
    style: {
      type: {
        typography: {
          fontFamily: { type: String, default: "" },
          fontSize: { type: String, default: "" },
          fontWeight: { type: String, default: "" },
          lineHeight: { type: String, default: "" },
          letterSpacing: { type: String, default: "" },
          textTransform: { type: String, default: "" },
        },
        colors: {
          text: { type: String, default: "" },
          background: { type: String, default: "" },
        },
        spacing: {
          marginTop: { type: String, default: "" },
          marginBottom: { type: String, default: "" },
          marginLeft: { type: String, default: "" },
          marginRight: { type: String, default: "" },
          paddingTop: { type: String, default: "" },
          paddingBottom: { type: String, default: "" },
          paddingLeft: { type: String, default: "" },
          paddingRight: { type: String, default: "" },
        },
        borders: {
          border: { type: String, default: "" },
          borderRadius: { type: String, default: "" },
        },
      },
      default: () => ({
        typography: {},
        colors: {},
        spacing: {},
        borders: {},
      }),
    },
    visible: { type: Boolean, default: true },
  },
  { _id: false }
);

const textImageSectionSchema = new Schema(
  {
    id: { type: String, required: true },
    type: { type: String, required: true, enum: ["text_image"] },
    direction: {
      type: String,
      enum: ["image_left", "image_right"],
      default: "image_left",
    },
    image: {
      type: {
        url: { type: String, default: "" },
        alt: { type: String, default: "" },
        title: { type: String, default: "" },
        caption: { type: String, default: "" },
        objectFit: { type: String, default: "cover" },
        objectPosition: { type: String, default: "center" },
        aspectRatio: { type: String, default: "" },
        borderRadius: { type: String, default: "" },
        width: { type: String, default: "" },
        height: { type: String, default: "" },
        maxWidth: { type: String, default: "" },
        link: { type: String, default: "" },
        overlay: { type: Boolean, default: false },
        overlayOpacity: { type: String, default: "0.5" },
      },
      default: () => ({
        url: "",
        alt: "",
        title: "",
        caption: "",
        objectFit: "cover",
        objectPosition: "center",
        aspectRatio: "",
        borderRadius: "",
        width: "",
        height: "",
        maxWidth: "",
        link: "",
        overlay: false,
        overlayOpacity: "0.5",
      }),
    },
    elements: { type: [textImageElementSchema], default: [] },
    layout: {
      type: {
        containerWidth: { type: String, default: "" },
        contentWidth: { type: String, default: "" },
        imageWidth: { type: String, default: "" },
        gap: { type: String, default: "" },
        alignment: { type: String, default: "" },
        verticalAlignment: { type: String, default: "" },
      },
      default: () => ({
        containerWidth: "",
        contentWidth: "",
        imageWidth: "",
        gap: "",
        alignment: "",
        verticalAlignment: "",
      }),
    },
    spacing: {
      type: {
        padding: { type: String, default: "" },
        margin: { type: String, default: "" },
      },
      default: () => ({
        padding: "",
        margin: "",
      }),
    },
    background: {
      type: {
        color: { type: String, default: "" },
        gradient: { type: String, default: "" },
        image: { type: String, default: "" },
      },
      default: () => ({
        color: "",
        gradient: "",
        image: "",
      }),
    },
    responsive: {
      type: {
        mobile: {
          direction: { type: String, enum: ["image_left", "image_right"], default: "image_left" },
          stack: { type: Boolean, default: true },
        },
        tablet: {
          direction: { type: String, enum: ["image_left", "image_right"], default: "image_left" },
          stack: { type: Boolean, default: false },
        },
      },
      default: () => ({
        mobile: { direction: "image_left", stack: true },
        tablet: { direction: "image_left", stack: false },
      }),
    },
    visibility: {
      type: {
        desktop: { type: Boolean, default: true },
        tablet: { type: Boolean, default: true },
        mobile: { type: Boolean, default: true },
      },
      default: () => ({
        desktop: true,
        tablet: true,
        mobile: true,
      }),
    },
  },
  { _id: false }
);

const cardCtaSchema = new Schema(
  {
    label: { type: String, default: "" },
    url: { type: String, default: "" },
    icon: { type: String, default: "" },
  },
  { _id: false }
);

const cardItemSchema = new Schema(
  {
    id: { type: String, required: true },
    icon: { type: String, default: "" },
    iconColor: { type: String, default: "" },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    ctas: { type: [cardCtaSchema], default: [] },
  },
  { _id: false }
);

const cardsSectionSchema = new Schema(
  {
    id: { type: String, required: true },
    type: { type: String, required: true, enum: ["cards"] },
    title: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    columns: { type: String, enum: ["2", "3"], default: "3" },
    cards: { type: [cardItemSchema], default: [] },
    layout: {
      type: {
        containerWidth: { type: String, default: "" },
        contentWidth: { type: String, default: "" },
        gap: { type: String, default: "" },
      },
      default: () => ({ containerWidth: "", contentWidth: "", gap: "" }),
    },
    spacing: {
      type: {
        padding: { type: String, default: "" },
        margin: { type: String, default: "" },
      },
      default: () => ({ padding: "", margin: "" }),
    },
    background: {
      type: {
        color: { type: String, default: "" },
        gradient: { type: String, default: "" },
      },
      default: () => ({ color: "", gradient: "" }),
    },
    visibility: {
      type: {
        desktop: { type: Boolean, default: true },
        tablet: { type: Boolean, default: true },
        mobile: { type: Boolean, default: true },
      },
      default: () => ({ desktop: true, tablet: true, mobile: true }),
    },
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

    // ── Content Mode ────────────────────────────────────────
    contentMode: {
      type: String,
      enum: ["wysiwyg", "sections", "page-sections"],
      default: "wysiwyg",
    },

    // ── WYSIWYG Content ─────────────────────────────────────
    bodyContent: { type: String, default: "" },
    keyTakeawaysContent: { type: String, default: "" },
    finalThoughtsContent: { type: String, default: "" },

    // ── Sections Content ────────────────────────────────────
    sections: { type: Schema.Types.Mixed, default: [] },

    // ── ABLimo Template Fields ─────────────────────────────
    templateType: {
      type: String,
      enum: ["service-country", "service-city"],
      default: "service-country",
    },
    serviceSlug: {
      type: String,
      enum: [
        "chauffeur-vip",
        "airport-transfers",
        "corporate-transportation",
        "event-transportation",
        "bus-coach-hire",
        "tourism-transportation",
      ],
      default: "",
    },
    countrySlug: {
      type: String,
      enum: ["saudi-arabia", "uae", "qatar", "bahrain", "kuwait", "oman", "gcc"],
      default: "",
    },
    citySlug: { type: String, default: "" },
    country: { type: String, default: "" },
    city: { type: String, default: "" },
    whatsappNumber: { type: String, default: "" },
    routeFrom: { type: String, default: "" },
    routeTo: { type: String, default: "" },

    // ── FAQs ───────────────────────────────────────────────
    faqs: { type: [faqSchema], default: [] },

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
articleSchema.index({ serviceSlug: 1 });
articleSchema.index({ countrySlug: 1 });
articleSchema.index({ citySlug: 1 });
articleSchema.index({ serviceSlug: 1, countrySlug: 1 });
articleSchema.index({ serviceSlug: 1, countrySlug: 1, citySlug: 1 });
articleSchema.index({ country: 1 });
articleSchema.index({ city: 1 });
articleSchema.index({ title: "text", slug: "text" });
articleSchema.index({ locale: 1, date: -1 });
articleSchema.index({ slug: 1, locale: 1 }, { unique: true });

export type ArticleDoc = InferSchemaType<typeof articleSchema>;

export const Article = models.Article || model("Article", articleSchema);
