import { Schema, model, models, type InferSchemaType } from "mongoose";

export const MediaKind = ["image", "video", "other"] as const;
export type MediaKindValue = (typeof MediaKind)[number];

// ── Media collection ────────────────────────────────────────────
// One doc per Vercel Blob upload. The blob itself lives on Vercel
// Blob Storage; this collection is the admin library index (alt
// text, filename, kind filters). Deleting a media item removes both
// the blob and this doc.

const mediaSchema = new Schema(
  {
    url: { type: String, required: true, unique: true, trim: true },
    pathname: { type: String, required: true, trim: true },
    filename: { type: String, required: true, trim: true },
    contentType: { type: String, required: true, trim: true },
    kind: { type: String, enum: [...MediaKind], default: "other" },
    size: { type: Number, required: true, min: 0 },
    alt: { type: String, default: "", trim: true },
    uploadedBy: { type: String, default: "" },
  },
  { timestamps: true, collection: "media" }
);

mediaSchema.index({ kind: 1, createdAt: -1 });

export type MediaDoc = InferSchemaType<typeof mediaSchema>;

export const Media = models.Media || model("Media", mediaSchema);
