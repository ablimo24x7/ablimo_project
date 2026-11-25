import { Schema, model, models, type InferSchemaType } from "mongoose";

export const LocationPageTypes = ["country", "city", "route"] as const;
export type LocationPageType = (typeof LocationPageTypes)[number];

export const LocationPageTemplateStatuses = [
  "draft",
  "published",
  "archived",
] as const;
export type LocationPageTemplateStatus =
  (typeof LocationPageTemplateStatuses)[number];

// ── Location Page Template collection ────────────────────────────
// One doc per (pageType, refKey, lang) holding a SectionInstance[]
// for a country / city / route page. Route templates are per-country
// (refKey = countrySlug). The `template` field is Mixed on purpose —
// same lesson as Service.pageSections: Mongoose subdocument casting
// silently drops complex nested arrays, so writes bypass Mongoose and
// go through the raw driver (`collection.updateOne({ $set: { template } })`).

const locationPageTemplateSchema = new Schema(
  {
    pageType: {
      type: String,
      required: true,
      enum: [...LocationPageTypes],
    },
    // country → countrySlug ("uae")
    // city    → `${countrySlug}/${citySlug}` ("uae/dubai")
    // route   → countrySlug ("uae", per-country scope)
    refKey: { type: String, required: true, trim: true },
    lang: { type: String, required: true, default: "en-US" },
    template: { type: Schema.Types.Mixed, default: () => [] },
    status: {
      type: String,
      enum: [...LocationPageTemplateStatuses],
      default: "published",
    },
  },
  { timestamps: true, collection: "locationpagetemplates" }
);

locationPageTemplateSchema.index(
  { pageType: 1, refKey: 1, lang: 1 },
  { unique: true }
);
locationPageTemplateSchema.index({ refKey: 1 });

export type LocationPageTemplateDoc = InferSchemaType<
  typeof locationPageTemplateSchema
>;

export const LocationPageTemplate =
  models.LocationPageTemplate ||
  model("LocationPageTemplate", locationPageTemplateSchema);
