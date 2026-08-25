import { Schema, model, models, type InferSchemaType } from "mongoose";

export const AuditActions = [
  "post.create",
  "post.update",
  "post.delete",
  "user.roles.update",
  "user.deactivate",
  "user.delete",
  "user.invite",
  "category.create",
  "category.update",
  "category.delete",
  "settings.update",
] as const;
export type AuditAction = (typeof AuditActions)[number];

const auditLogSchema = new Schema(
  {
    action: { type: String, required: true, enum: AuditActions, index: true },
    actorUserId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    resourceType: { type: String, required: true, trim: true, maxlength: 60 },
    resourceId: { type: Schema.Types.ObjectId, default: null },
    meta: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

auditLogSchema.index({ createdAt: -1 });

export type AuditLogDoc = InferSchemaType<typeof auditLogSchema>;

export const AuditLog = models.AuditLog || model("AuditLog", auditLogSchema);
