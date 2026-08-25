import { Types } from "mongoose";
import { z } from "zod";

export function isValidObjectId(id: string) {
  return Types.ObjectId.isValid(id);
}

export function ensureObjectId(id: string, label = "id") {
  if (!isValidObjectId(id)) {
    throw new Error(`Invalid ObjectId for ${label}`);
  }
  return new Types.ObjectId(id);
}

export const ObjectIdStringSchema = z
  .string()
  .refine((v) => Types.ObjectId.isValid(v), "Invalid ObjectId");
