import { Schema, model, models } from "mongoose";

const invitationSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true
    },
    roles: {
      type: [String],
      default: ["author"]
    },
    tokenHash: {
      type: String,
      required: true,
      index: true
    },
    invitedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    acceptedAt: {
      type: Date,
      default: null,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 }
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Invitation = models.Invitation || model("Invitation", invitationSchema);
