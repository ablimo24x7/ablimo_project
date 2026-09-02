import { Schema, model, models, type InferSchemaType } from "mongoose";

const routeSchema = new Schema(
  {
    fromCity: { type: String, required: true, trim: true },
    toCity: { type: String, required: true, trim: true },
    fromCityName: { type: String, default: "" },
    toCityName: { type: String, default: "" },
    distance: { type: String, default: "" },
    duration: { type: String, default: "" },
    countrySlug: { type: String, default: "" },
    status: { type: String, default: "published", enum: ["draft", "published", "archived"] },
  },
  { timestamps: true }
);

routeSchema.index({ fromCity: 1, toCity: 1 }, { unique: true });
routeSchema.index({ countrySlug: 1 });

export type RouteDoc = InferSchemaType<typeof routeSchema>;

export const LocationRoute =
  models.LocationRoute || model("LocationRoute", routeSchema);
