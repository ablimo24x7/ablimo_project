import { z } from "zod";

export const MEDIA_MAX_BYTES = 25 * 1024 * 1024; // 25 MB

export const MediaKindFilter = z.enum(["image", "video", "other"]);

export const MediaListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(24),
  q: z.string().trim().optional(),
  kind: MediaKindFilter.optional(),
});

export type MediaListQuery = z.infer<typeof MediaListQuerySchema>;

export const MediaUpdateSchema = z.object({
  alt: z.string().max(500).optional(),
  filename: z.string().trim().min(1).max(255).optional(),
});

export type MediaUpdateInput = z.infer<typeof MediaUpdateSchema>;
