import { Schema, model, models, type InferSchemaType } from "mongoose";

const leadSchema = new Schema(
  {
    widgetId: { type: Schema.Types.ObjectId, ref: "ChatWidget" },
    channel: { type: String, required: true },
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    message: { type: String, default: "" },
    serviceName: { type: String, default: "" },
    pageUrl: { type: String, default: "" },
    referrer: { type: String, default: "" },
    userAgent: { type: String, default: "" },
    ip: { type: String, default: "" },
    country: { type: String, default: "" },
    status: {
      type: String,
      enum: ["new", "contacted", "converted", "archived"],
      default: "new",
    },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

leadSchema.index({ channel: 1 });
leadSchema.index({ status: 1 });
leadSchema.index({ createdAt: -1 });

export type LeadDoc = InferSchemaType<typeof leadSchema>;

export const Lead = models.Lead || model("Lead", leadSchema);
