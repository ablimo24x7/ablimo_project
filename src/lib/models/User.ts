import { Schema, model, models, type InferSchemaType } from "mongoose";

export const Roles = ["super_admin", "admin", "editor", "author"] as const;
export type Role = (typeof Roles)[number];

export const ROLE_HIERARCHY: Record<string, number> = {
  super_admin: 100,
  admin: 50,
  editor: 20,
  author: 10,
};

export function getMaxRoleLevel(roles: string[]): number {
  if (!roles?.length) return 0;
  return Math.max(...roles.map((r) => ROLE_HIERARCHY[r] ?? 0));
}

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, unique: true, index: true, trim: true, maxlength: 254 },
    avatarUrl: { type: String, default: null },
    passwordHash: { type: String, default: null },
    roles: { type: [String], enum: Roles, default: ["author"] },
    isActive: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
    invitationTokenHash: { type: String, default: null },
    invitationExpiresAt: { type: Date, default: null },
    resetTokenHash: { type: String, default: null },
    resetTokenExpiresAt: { type: Date, default: null },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export type UserDoc = InferSchemaType<typeof userSchema>;

export const User = models.User || model("User", userSchema);
