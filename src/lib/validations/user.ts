import { z } from "zod";
import { Roles } from "@/lib/models/User";

const EmailSchema = z.string().email().max(254);

export const UserCreateSchema = z.object({
  name: z.string().min(1).max(120),
  email: EmailSchema,
  password: z.string().min(8).max(200),
  roles: z.array(z.enum(Roles)).optional().default(["author"]),
});

export const UserUpdateSchema = z.object({
  name: z.string().min(1).max(120).optional(),
  roles: z.array(z.enum(Roles)).optional(),
  isActive: z.boolean().optional(),
});

export const InvitationCreateSchema = z.object({
  email: EmailSchema,
  roles: z.array(z.enum(Roles)).optional().default(["author"]),
});
