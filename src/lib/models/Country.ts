import { Schema, model, models, type InferSchemaType } from "mongoose";

const faqSchema = new Schema(
  {
    q: { type: String, default: "" },
    a: { type: String, default: "" },
  },
  { _id: false }
);

const airportSchema = new Schema(
  {
    slug: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    iata: { type: String, required: true, trim: true, uppercase: true },
    // Resolved parent city slug (denormalised for simpler lookups/validation)
    citySlug: { type: String, default: "" },
    description: { type: String, default: "" },
    // Alternate names/slugs so e.g. "Doha Intl" can route to Hamad International Airport
    aliases: [{ type: String, trim: true }],
    type: { type: String, default: "international", enum: ["international", "domestic", "regional"] },
    status: { type: String, default: "published", enum: ["draft", "published", "archived"] },
  },
  { _id: true }
);

const citySchema = new Schema(
  {
    slug: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    // Resolved parent country slug (denormalised)
    countrySlug: { type: String, default: "" },
    description: { type: String, default: "" },
    aliases: [{ type: String, trim: true }],
    airports: { type: [airportSchema], default: [] },
    faqs: { type: [faqSchema], default: [] },
    status: { type: String, default: "published", enum: ["draft", "published", "archived"] },
  },
  { _id: true }
);

const countrySchema = new Schema(
  {
    code: { type: String, required: true, unique: true, trim: true, lowercase: true },
    slug: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    cities: { type: [citySchema], default: [] },
    faqs: { type: [faqSchema], default: [] },
    status: { type: String, default: "published", enum: ["draft", "published", "archived"] },
  },
  { timestamps: true }
);

countrySchema.index({ slug: 1 }, { unique: true });
countrySchema.index({ code: 1 }, { unique: true });

export type AirportDoc = InferSchemaType<typeof airportSchema>;
export type CityDoc = InferSchemaType<typeof citySchema>;
export type CountryDoc = InferSchemaType<typeof countrySchema>;

export const Country =
  models.Country || model("Country", countrySchema);
