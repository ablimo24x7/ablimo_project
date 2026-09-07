import { Schema, model, models, type InferSchemaType } from "mongoose";

export const ServiceStatuses = ["draft", "published", "archived"] as const;
export type ServiceStatus = (typeof ServiceStatuses)[number];

const featureSchema = new Schema(
  {
    icon: { type: String, default: "" },
    title: { type: String, default: "" },
    desc: { type: String, default: "" },
  },
  { _id: false }
);

const serviceCardSchema = new Schema(
  {
    image: { type: String, default: "" },
    tag: { type: String, default: "" },
    title: { type: String, default: "" },
    desc: { type: String, default: "" },
  },
  { _id: false }
);

const bulletSchema = new Schema(
  {
    text: { type: String, default: "" },
  },
  { _id: false }
);

const serviceSectionSchema = new Schema(
  {
    image: { type: String, default: "" },
    imageAlt: { type: String, default: "" },
    title: { type: String, default: "" },
    paragraphs: { type: [String], default: [] },
    bullets: { type: [bulletSchema], default: [] },
    imageSide: {
      type: String,
      enum: ["left", "right"],
      default: "left",
    },
    dark: { type: Boolean, default: false },
  },
  { _id: false }
);

const faqSchema = new Schema(
  {
    q: { type: String, default: "" },
    a: { type: String, default: "" },
  },
  { _id: false }
);

const seoSchema = new Schema(
  {
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    ogImage: { type: String, default: "" },
  },
  { _id: false }
);

const serviceSchema = new Schema(
  {
    slug: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, default: "" },
    // Short card description used on the services index page / menus.
    desc: { type: String, default: "" },
    heroImage: { type: String, default: "" },
    breadcrumb: { type: String, default: "" },

    features: { type: [featureSchema], default: [] },
    cardsHeading: { type: String, default: "" },
    cardsDesc: { type: String, default: "" },
    cards: { type: [serviceCardSchema], default: [] },
    sections: { type: [serviceSectionSchema], default: [] },
    faqs: { type: [faqSchema], default: [] },

    ctaTitle: { type: String, default: "" },
    ctaDesc: { type: String, default: "" },
    ctaLabel: { type: String, default: "" },
    ctaHref: { type: String, default: "" },

    seo: {
      type: seoSchema,
      default: () => ({}),
    },

    status: {
      type: String,
      enum: ServiceStatuses,
      default: "published",
    },
    // Whether the service is surfaced in the main navigation dropdown.
    showInMenu: { type: Boolean, default: true },
    // Used to control the ordering of menu items.
    order: { type: Number, default: 0 },

    locale: { type: String, default: "en" },
  },
  { timestamps: true }
);

serviceSchema.index({ slug: 1 }, { unique: true });
serviceSchema.index({ status: 1 });
serviceSchema.index({ showInMenu: 1, order: 1 });

export type ServiceDoc = InferSchemaType<typeof serviceSchema>;
export type ServiceFeatureItem = InferSchemaType<typeof featureSchema>;
export type ServiceCardItem = InferSchemaType<typeof serviceCardSchema>;
export type ServiceBulletItem = InferSchemaType<typeof bulletSchema>;
export type ServiceSectionItem = InferSchemaType<typeof serviceSectionSchema>;
export type ServiceFaqItem = InferSchemaType<typeof faqSchema>;
export type ServiceSeoItem = InferSchemaType<typeof seoSchema>;

export const Service = models.Service || model("Service", serviceSchema);