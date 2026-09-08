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

export const TextImageElementSchema = z.object({
  id: z.string().min(1),
  type: z.enum(["tag", "label", "heading", "paragraph", "button"]),
  content: z.string().optional().default(""),
  headingLevel: z.enum(["h1", "h2", "h3", "h4", "h5", "h6"]).optional().default("h2"),
  url: z.string().optional().default(""),
  target: z.string().optional().default("_self"),
  icon: z
    .object({
      library: z.string().optional().default("lucide"),
      name: z.string().optional().default(""),
      position: z.enum(["left", "right"]).optional().default("right"),
    })
    .optional()
    .default({ library: "lucide", name: "", position: "right" }),
  style: z
    .object({
      typography: z
        .object({
          fontFamily: z.string().optional().default(""),
          fontSize: z.string().optional().default(""),
          fontWeight: z.string().optional().default(""),
          lineHeight: z.string().optional().default(""),
          letterSpacing: z.string().optional().default(""),
          textTransform: z.string().optional().default(""),
        })
        .optional()
        .default({ fontFamily: "", fontSize: "", fontWeight: "", lineHeight: "", letterSpacing: "", textTransform: "" }),
      colors: z
        .object({
          text: z.string().optional().default(""),
          background: z.string().optional().default(""),
        })
        .optional()
        .default({ text: "", background: "" }),
      spacing: z
        .object({
          marginTop: z.string().optional().default(""),
          marginBottom: z.string().optional().default(""),
          marginLeft: z.string().optional().default(""),
          marginRight: z.string().optional().default(""),
          paddingTop: z.string().optional().default(""),
          paddingBottom: z.string().optional().default(""),
          paddingLeft: z.string().optional().default(""),
          paddingRight: z.string().optional().default(""),
        })
        .optional()
        .default({
          marginTop: "", marginBottom: "", marginLeft: "", marginRight: "",
          paddingTop: "", paddingBottom: "", paddingLeft: "", paddingRight: "",
        }),
      borders: z
        .object({
          border: z.string().optional().default(""),
          borderRadius: z.string().optional().default(""),
        })
        .optional()
        .default({ border: "", borderRadius: "" }),
    })
    .optional()
    .default({
      typography: { fontFamily: "", fontSize: "", fontWeight: "", lineHeight: "", letterSpacing: "", textTransform: "" },
      colors: { text: "", background: "" },
      spacing: {
        marginTop: "", marginBottom: "", marginLeft: "", marginRight: "",
        paddingTop: "", paddingBottom: "", paddingLeft: "", paddingRight: "",
      },
      borders: { border: "", borderRadius: "" },
    }),
  visible: z.boolean().optional().default(true),
});

export const TextImageSectionSchema = z.object({
  id: z.string().min(1),
  type: z.literal("text_image"),
  direction: z.enum(["image_left", "image_right"]).optional().default("image_left"),
  image: z
    .object({
      url: z.string().optional().default(""),
      alt: z.string().optional().default(""),
      title: z.string().optional().default(""),
      caption: z.string().optional().default(""),
      objectFit: z.string().optional().default("cover"),
      objectPosition: z.string().optional().default("center"),
      aspectRatio: z.string().optional().default(""),
      borderRadius: z.string().optional().default(""),
      width: z.string().optional().default(""),
      height: z.string().optional().default(""),
      maxWidth: z.string().optional().default(""),
      link: z.string().optional().default(""),
      overlay: z.boolean().optional().default(false),
      overlayOpacity: z.string().optional().default("0.5"),
    })
    .optional()
    .default({
      url: "", alt: "", title: "", caption: "", objectFit: "cover", objectPosition: "center",
      aspectRatio: "", borderRadius: "", width: "", height: "", maxWidth: "", link: "",
      overlay: false, overlayOpacity: "0.5",
    }),
  elements: z.array(TextImageElementSchema).optional().default([]),
  layout: z
    .object({
      containerWidth: z.string().optional().default(""),
      contentWidth: z.string().optional().default(""),
      imageWidth: z.string().optional().default(""),
      gap: z.string().optional().default(""),
      alignment: z.string().optional().default(""),
      verticalAlignment: z.string().optional().default(""),
    })
    .optional()
    .default({ containerWidth: "", contentWidth: "", imageWidth: "", gap: "", alignment: "", verticalAlignment: "" }),
  spacing: z
    .object({
      padding: z.string().optional().default(""),
      margin: z.string().optional().default(""),
    })
    .optional()
    .default({ padding: "", margin: "" }),
  background: z
    .object({
      color: z.string().optional().default(""),
      gradient: z.string().optional().default(""),
      image: z.string().optional().default(""),
    })
    .optional()
    .default({ color: "", gradient: "", image: "" }),
  responsive: z
    .object({
      mobile: z
        .object({
          direction: z.enum(["image_left", "image_right"]).optional().default("image_left"),
          stack: z.boolean().optional().default(true),
        })
        .optional()
        .default({ direction: "image_left", stack: true }),
      tablet: z
        .object({
          direction: z.enum(["image_left", "image_right"]).optional().default("image_left"),
          stack: z.boolean().optional().default(false),
        })
        .optional()
        .default({ direction: "image_left", stack: false }),
    })
    .optional()
    .default({
      mobile: { direction: "image_left" as const, stack: true },
      tablet: { direction: "image_left" as const, stack: false },
    }),
  visibility: z
    .object({
      desktop: z.boolean().optional().default(true),
      tablet: z.boolean().optional().default(true),
      mobile: z.boolean().optional().default(true),
    })
    .optional()
    .default({ desktop: true, tablet: true, mobile: true }),
});

export type TextImageElementType = z.infer<typeof TextImageElementSchema>;
export type TextImageSectionType = z.infer<typeof TextImageSectionSchema>;

// ── Cards Section ──────────────────────────────────────────
export const CardCtaSchema = z.object({
  label: z.string().optional().default(""),
  url: z.string().optional().default(""),
  icon: z.string().optional().default(""),
});

export const CardItemSchema = z.object({
  id: z.string().min(1),
  icon: z.string().optional().default(""),
  iconColor: z.string().optional().default(""),
  title: z.string().optional().default(""),
  description: z.string().optional().default(""),
  ctas: z.array(CardCtaSchema).optional().default([]),
});

export const CardsSectionSchema = z.object({
  id: z.string().min(1),
  type: z.literal("cards"),
  title: z.string().optional().default(""),
  subtitle: z.string().optional().default(""),
  columns: z.enum(["2", "3"]).optional().default("3"),
  cards: z.array(CardItemSchema).optional().default([]),
  layout: z
    .object({
      containerWidth: z.string().optional().default(""),
      contentWidth: z.string().optional().default(""),
      gap: z.string().optional().default(""),
    })
    .optional()
    .default({ containerWidth: "", contentWidth: "", gap: "" }),
  spacing: z
    .object({
      padding: z.string().optional().default(""),
      margin: z.string().optional().default(""),
    })
    .optional()
    .default({ padding: "", margin: "" }),
  background: z
    .object({
      color: z.string().optional().default(""),
      gradient: z.string().optional().default(""),
    })
    .optional()
    .default({ color: "", gradient: "" }),
  visibility: z
    .object({
      desktop: z.boolean().optional().default(true),
      tablet: z.boolean().optional().default(true),
      mobile: z.boolean().optional().default(true),
    })
    .optional()
    .default({ desktop: true, tablet: true, mobile: true }),
});

export type CardCtaType = z.infer<typeof CardCtaSchema>;
export type CardItemType = z.infer<typeof CardItemSchema>;
export type CardsSectionType = z.infer<typeof CardsSectionSchema>;

// ── Union of all section types ─────────────────────────────
export const SectionSchema = z.discriminatedUnion("type", [
  TextImageSectionSchema,
  CardsSectionSchema,
]);
export type SectionType = z.infer<typeof SectionSchema>;

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
  sections: z.array(SectionSchema).optional().default([]),
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
