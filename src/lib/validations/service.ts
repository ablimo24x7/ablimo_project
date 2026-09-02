import { z } from "zod";

export const SERVICE_STATUSES = ["draft", "published", "archived"] as const;
export const SERVICE_IMAGE_SIDES = ["left", "right"] as const;

export const ServiceFeatureSchema = z.object({
  icon: z.string().max(60).optional().default(""),
  title: z.string().max(200).optional().default(""),
  desc: z.string().max(1000).optional().default(""),
});

export const ServiceCardSchema = z.object({
  image: z.string().max(1000).optional().default(""),
  tag: z.string().max(100).optional().default(""),
  title: z.string().max(200).optional().default(""),
  desc: z.string().max(1000).optional().default(""),
});

export const ServiceBulletSchema = z.object({
  text: z.string().max(1000).optional().default(""),
});

export const ServiceSectionSchema = z.object({
  image: z.string().max(1000).optional().default(""),
  imageAlt: z.string().max(300).optional().default(""),
  title: z.string().max(300).optional().default(""),
  paragraphs: z.array(z.string().max(5000)).optional().default([]),
  bullets: z.array(ServiceBulletSchema).optional().default([]),
  imageSide: z.enum(SERVICE_IMAGE_SIDES).optional().default("left"),
  dark: z.boolean().optional().default(false),
});

export const ServiceFaqSchema = z.object({
  q: z.string().max(500).optional().default(""),
  a: z.string().max(5000).optional().default(""),
});

export const ServiceSeoSchema = z.object({
  metaTitle: z.string().max(200).optional().default(""),
  metaDescription: z.string().max(400).optional().default(""),
  ogImage: z.string().max(1000).optional().default(""),
});

export const ServiceCreateSchema = z.object({
  slug: z.string().min(1).max(200),
  title: z.string().min(1).max(200),
  subtitle: z.string().max(1000).optional().default(""),
  desc: z.string().max(1000).optional().default(""),
  heroImage: z.string().max(1000).optional().default(""),
  breadcrumb: z.string().max(200).optional().default(""),

  features: z.array(ServiceFeatureSchema).optional().default([]),
  cardsHeading: z.string().max(300).optional().default(""),
  cardsDesc: z.string().max(1000).optional().default(""),
  cards: z.array(ServiceCardSchema).optional().default([]),
  sections: z.array(ServiceSectionSchema).optional().default([]),
  faqs: z.array(ServiceFaqSchema).optional().default([]),

  ctaTitle: z.string().max(300).optional().default(""),
  ctaDesc: z.string().max(1000).optional().default(""),
  ctaLabel: z.string().max(200).optional().default(""),
  ctaHref: z.string().max(1000).optional().default(""),

  seo: ServiceSeoSchema.optional(),

  status: z.enum(SERVICE_STATUSES).optional().default("published"),
  showInMenu: z.boolean().optional().default(true),
  order: z.number().int().min(0).optional().default(0),
  locale: z.string().max(10).optional().default("en"),
});

export const ServiceUpdateSchema = ServiceCreateSchema.partial().extend({
  slug: z.string().min(1).max(200).optional(),
  title: z.string().min(1).max(200).optional(),
});

export const ServiceListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(50),
  q: z.string().trim().max(200).optional(),
  status: z.enum(SERVICE_STATUSES).optional(),
});