import { Schema, model, models, type InferSchemaType } from "mongoose";

const simpleCategorySchema = new Schema(
  {
    slug: { type: String, required: true },
    label: { type: String, required: true },
    color: { type: String, default: "#1a8cb2" },
    count: { type: Number, default: 0 },
    locale: { type: String, default: "en" },
    footerLabel: { type: String, default: "" },
  },
  {
    timestamps: false,
    collection: "categories",
  }
);
simpleCategorySchema.index({ slug: 1, locale: 1 }, { unique: true });

export type SimpleCategoryDoc = InferSchemaType<typeof simpleCategorySchema>;

export const SimpleCategory =
  models.SimpleCategory || model("SimpleCategory", simpleCategorySchema);
