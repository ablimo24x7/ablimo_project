import { Schema, model, models, type InferSchemaType } from "mongoose";

const faqSchema = new Schema(
  {
    q: { type: String, default: "" },
    a: { type: String, default: "" },
  },
  { _id: false }
);

const airportSchema = new Schema(
  {
    slug: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    nameAr: { type: String, default: "" },
    iata: { type: String, required: true, trim: true, uppercase: true },
    citySlug: { type: String, default: "" },
    description: { type: String, default: "" },
    descriptionAr: { type: String, default: "" },
    aliases: [{ type: String, trim: true }],
    type: { type: String, default: "international", enum: ["international", "domestic", "regional"] },
    status: { type: String, default: "published", enum: ["draft", "published", "archived"] },
  },
  { _id: true }
);

const textImageElementSchema = new Schema(
  {
    id: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ["tag", "label", "heading", "paragraph", "button"],
    },
    content: { type: String, default: "" },
    headingLevel: {
      type: String,
      enum: ["h1", "h2", "h3", "h4", "h5", "h6"],
      default: "h2",
    },
    url: { type: String, default: "" },
    target: { type: String, default: "_self" },
    icon: {
      type: {
        library: { type: String, default: "lucide" },
        name: { type: String, default: "" },
        position: { type: String, enum: ["left", "right"], default: "right" },
      },
      default: () => ({ library: "lucide", name: "", position: "right" }),
    },
    style: {
      type: {
        typography: {
          fontFamily: { type: String, default: "" },
          fontSize: { type: String, default: "" },
          fontWeight: { type: String, default: "" },
          lineHeight: { type: String, default: "" },
          letterSpacing: { type: String, default: "" },
          textTransform: { type: String, default: "" },
        },
        colors: {
          text: { type: String, default: "" },
          background: { type: String, default: "" },
        },
        spacing: {
          marginTop: { type: String, default: "" },
          marginBottom: { type: String, default: "" },
          marginLeft: { type: String, default: "" },
          marginRight: { type: String, default: "" },
          paddingTop: { type: String, default: "" },
          paddingBottom: { type: String, default: "" },
          paddingLeft: { type: String, default: "" },
          paddingRight: { type: String, default: "" },
        },
        borders: {
          border: { type: String, default: "" },
          borderRadius: { type: String, default: "" },
        },
      },
      default: () => ({
        typography: {},
        colors: {},
        spacing: {},
        borders: {},
      }),
    },
    visible: { type: Boolean, default: true },
  },
  { _id: false }
);

const textImageSectionSchema = new Schema(
  {
    id: { type: String, required: true },
    type: { type: String, required: true, enum: ["text_image"] },
    direction: {
      type: String,
      enum: ["image_left", "image_right"],
      default: "image_left",
    },
    image: {
      type: {
        url: { type: String, default: "" },
        alt: { type: String, default: "" },
        title: { type: String, default: "" },
        caption: { type: String, default: "" },
        objectFit: { type: String, default: "cover" },
        objectPosition: { type: String, default: "center" },
        aspectRatio: { type: String, default: "" },
        borderRadius: { type: String, default: "" },
        width: { type: String, default: "" },
        height: { type: String, default: "" },
        maxWidth: { type: String, default: "" },
        link: { type: String, default: "" },
        overlay: { type: Boolean, default: false },
        overlayOpacity: { type: String, default: "0.5" },
      },
      default: () => ({
        url: "",
        alt: "",
        title: "",
        caption: "",
        objectFit: "cover",
        objectPosition: "center",
        aspectRatio: "",
        borderRadius: "",
        width: "",
        height: "",
        maxWidth: "",
        link: "",
        overlay: false,
        overlayOpacity: "0.5",
      }),
    },
    elements: { type: [textImageElementSchema], default: [] },
    layout: {
      type: {
        containerWidth: { type: String, default: "" },
        contentWidth: { type: String, default: "" },
        imageWidth: { type: String, default: "" },
        gap: { type: String, default: "" },
        alignment: { type: String, default: "" },
        verticalAlignment: { type: String, default: "" },
      },
      default: () => ({
        containerWidth: "",
        contentWidth: "",
        imageWidth: "",
        gap: "",
        alignment: "",
        verticalAlignment: "",
      }),
    },
    spacing: {
      type: {
        padding: { type: String, default: "" },
        margin: { type: String, default: "" },
      },
      default: () => ({
        padding: "",
        margin: "",
      }),
    },
    background: {
      type: {
        color: { type: String, default: "" },
        gradient: { type: String, default: "" },
        image: { type: String, default: "" },
      },
      default: () => ({
        color: "",
        gradient: "",
        image: "",
      }),
    },
    responsive: {
      type: {
        mobile: {
          direction: { type: String, enum: ["image_left", "image_right"], default: "image_left" },
          stack: { type: Boolean, default: true },
        },
        tablet: {
          direction: { type: String, enum: ["image_left", "image_right"], default: "image_left" },
          stack: { type: Boolean, default: false },
        },
      },
      default: () => ({
        mobile: { direction: "image_left", stack: true },
        tablet: { direction: "image_left", stack: false },
      }),
    },
    visibility: {
      type: {
        desktop: { type: Boolean, default: true },
        tablet: { type: Boolean, default: true },
        mobile: { type: Boolean, default: true },
      },
      default: () => ({
        desktop: true,
        tablet: true,
        mobile: true,
      }),
    },
  },
  { _id: false }
);

const citySchema = new Schema(
  {
    slug: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    nameAr: { type: String, default: "" },
    countrySlug: { type: String, default: "" },
    description: { type: String, default: "" },
    descriptionAr: { type: String, default: "" },
    aliases: [{ type: String, trim: true }],
    airports: { type: [airportSchema], default: [] },
    faqs: { type: [faqSchema], default: [] },
    faqsAr: { type: [faqSchema], default: [] },
    sections: { type: Schema.Types.Mixed, default: [] },
    status: { type: String, default: "published", enum: ["draft", "published", "archived"] },
  },
  { _id: true }
);

const countrySchema = new Schema(
  {
    code: { type: String, required: true, unique: true, trim: true, lowercase: true },
    slug: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    nameAr: { type: String, default: "" },
    description: { type: String, default: "" },
    descriptionAr: { type: String, default: "" },
    cities: { type: [citySchema], default: [] },
    faqs: { type: [faqSchema], default: [] },
    faqsAr: { type: [faqSchema], default: [] },
    status: { type: String, default: "published", enum: ["draft", "published", "archived"] },
  },
  { timestamps: true }
);

countrySchema.index({ slug: 1 }, { unique: true });
countrySchema.index({ code: 1 }, { unique: true });

export type AirportDoc = InferSchemaType<typeof airportSchema>;
export type CityDoc = InferSchemaType<typeof citySchema>;
export type CountryDoc = InferSchemaType<typeof countrySchema>;
export type TextImageElementDoc = InferSchemaType<typeof textImageElementSchema>;
export type TextImageSectionDoc = InferSchemaType<typeof textImageSectionSchema>;

export const Country =
  models.Country || model("Country", countrySchema);
