import mongoose, { Schema, Document } from "mongoose";

export interface IRolePolicy extends Document {
  role: string;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}

const RolePolicySchema = new Schema<IRolePolicy>(
  {
    role: { type: String, required: true, unique: true, lowercase: true, trim: true },
    permissions: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const RolePolicy =
  mongoose.models.RolePolicy || mongoose.model<IRolePolicy>("RolePolicy", RolePolicySchema);
