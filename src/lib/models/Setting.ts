import { Schema, model, models, type InferSchemaType } from "mongoose";

const settingSchema = new Schema(
  {
    key: { type: String, required: true, trim: true, maxlength: 120 },
    locale: { type: String, default: "en", maxlength: 5 },
    value: { type: Schema.Types.Mixed, default: null },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);
settingSchema.index({ key: 1, locale: 1 }, { unique: true });

export type SettingDoc = InferSchemaType<typeof settingSchema>;

export const Setting = models.Setting || model("Setting", settingSchema);
