import { Schema, model, models } from "mongoose";

const subscriberSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    locale: { type: String, default: "en" },
    source: { type: String, default: "blog" },
  },
  {
    timestamps: true,
  }
);

export const Subscriber = models.Subscriber || model("Subscriber", subscriberSchema);
