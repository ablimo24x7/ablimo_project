import { Schema, model, models, type InferSchemaType, Types } from "mongoose";

const apiTokenSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, required: true, trim: true, maxlength: 100 },
    tokenHash: { type: String, required: true, unique: true },
    prefix: { type: String, required: true, enum: ["nv_live_", "nv_test_"] },
    lastUsedAt: { type: Date, default: null },
    revoked: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export type ApiTokenDoc = InferSchemaType<typeof apiTokenSchema> & { _id: Types.ObjectId };

export const ApiToken = models.ApiToken || model("ApiToken", apiTokenSchema);
