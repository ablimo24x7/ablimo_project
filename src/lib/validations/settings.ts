import { z } from "zod";

export const SettingsUpdateSchema = z.object({
  siteTitle: z.string().min(1).max(120).optional(),
  defaultSeo: z
    .object({
      metaTitle: z.string().max(60).optional(),
      metaDescription: z.string().max(160).optional(),
    })
    .optional(),
  analyticsKey: z.string().max(200).optional(),
  socialLinks: z.array(z.object({
    name: z.string(),
    network: z.string(),
    url: z.string().url(),
    count: z.string().optional(),
    label: z.string().optional(),
  })).optional(),
});
