import { z } from "zod";
import {
  validateCountry,
  allIsoCountries,
} from "@/lib/iso3166";
import { toSlug } from "@/lib/slug";

const statusSchema = z.enum(["draft", "published", "archived"]).optional();

export const FaqSchema = z.object({
  q: z.string().max(500).optional().default(""),
  a: z.string().max(5000).optional().default(""),
});

export const AirportSchema = z.object({
  slug: z.string().min(1).max(200).optional(),
  name: z.string().min(1, "Airport name is required").max(200),
  nameAr: z.string().optional().default(""),
  iata: z
    .string()
    .min(1, "IATA code is required")
    .max(3, "IATA code must be up to 3 characters")
    .transform((v) => v.trim().toUpperCase()),
  description: z.string().optional().default(""),
  descriptionAr: z.string().optional().default(""),
  aliases: z.array(z.string().trim().min(1)).optional().default([]),
  type: z.enum(["international", "domestic", "regional"]).optional().default("international"),
  status: statusSchema,
});

export const CitySchema = z.object({
  slug: z.string().min(1).max(200).optional(),
  name: z.string().min(1, "City name is required").max(200),
  nameAr: z.string().optional().default(""),
  description: z.string().optional().default(""),
  descriptionAr: z.string().optional().default(""),
  aliases: z.array(z.string().trim().min(1)).optional().default([]),
  airports: z.array(AirportSchema).optional().default([]),
  faqs: z.array(FaqSchema).optional().default([]),
  faqsAr: z.array(FaqSchema).optional().default([]),
  status: statusSchema,
});

export const CountryCreateSchema = z.object({
  name: z
    .string()
    .min(1, "Country is required")
    .max(200)
    .refine((v) => validateCountry(v) !== undefined, {
      message: "Invalid or unknown country. Please use a real ISO-3166 country.",
    }),
  nameAr: z.string().optional().default(""),
  code: z.string().min(2).max(2).optional(),
  slug: z.string().min(1).max(200).optional(),
  description: z.string().optional().default(""),
  descriptionAr: z.string().optional().default(""),
  cities: z.array(CitySchema).optional().default([]),
  faqs: z.array(FaqSchema).optional().default([]),
  faqsAr: z.array(FaqSchema).optional().default([]),
  status: statusSchema,
});

export const CityCreateSchema = z.object({
  countryId: z.string().min(1, "Parent country is required"),
  name: z.string().min(1, "City name is required").max(200),
  slug: z.string().min(1).max(200).optional(),
  description: z.string().optional().default(""),
  aliases: z.array(z.string().trim().min(1)).optional().default([]),
  airports: z.array(AirportSchema).optional().default([]),
  status: statusSchema,
});

export const AirportCreateSchema = z.object({
  countryId: z.string().min(1, "Parent country is required"),
  cityId: z.string().min(1, "Parent city is required"),
  name: z.string().min(1, "Airport name is required").max(200),
  slug: z.string().min(1).max(200).optional(),
  iata: z
    .string()
    .min(1, "IATA code is required")
    .max(3)
    .transform((v) => v.trim().toUpperCase()),
  description: z.string().optional().default(""),
  aliases: z.array(z.string().trim().min(1)).optional().default([]),
  type: z.enum(["international", "domestic", "regional"]).optional().default("international"),
  status: statusSchema,
});

export const RouteCreateSchema = z.object({
  fromCity: z.string().min(1, "From city is required"),
  toCity: z.string().min(1, "To city is required"),
  fromCityName: z.string().optional().default(""),
  toCityName: z.string().optional().default(""),
  distance: z.string().optional().default(""),
  duration: z.string().optional().default(""),
  countrySlug: z.string().optional().default(""),
  status: statusSchema,
});

export const slugFromName = (name: string) => {
  return toSlug(name.trim());
};

export const isoCountryOptions = allIsoCountries();
