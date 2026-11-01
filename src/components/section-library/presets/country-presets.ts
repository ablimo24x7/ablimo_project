import type { Dictionary } from "@/app/[lang]/dictionaries";
import { getCountryAbout } from "@/app/[lang]/locations/_components/aboutContent";
import type { SectionInstance } from "../types";
import { COUNTRY_CONTENT_KEY, makeSection, withOrder } from "./common";
import { CLIENT_COUNTRY_DATA } from "./client-country-data";

// Hero landmark images (originally countryHeroImages in
// CountryDetailClient), re-keyed by runtime country slug.
const COUNTRY_HERO_IMAGES: Record<string, string> = {
  bahrain: "/locations/www.ab.limo-locations-bahrain-images/image1.jpg",
  kuwait: "/locations/www.ab.limo-locations-kuwait-images/image1.jpg",
  oman: "/locations/www.ab.limo-locations-oman-images/image1.jpg",
  qatar: "/locations/www.ab.limo-locations-qatar-images/image1.jpg",
  "saudi-arabia":
    "/locations/www.ab.limo-locations-saudi-arabia-images/image1.jpg",
  uae: "https://images.unsplash.com/flagged/photo-1559717865-a99cac1c95d8?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

/**
 * Country page template — builds the rich client template for the 5
 * client-specified countries (Saudi Arabia, Bahrain, Kuwait, Oman, Qatar)
 * and falls back to the standard country layout for others (e.g. UAE).
 */
export function buildCountryTemplate(
  countrySlug: string,
  dict: Dictionary
): SectionInstance[] {
  const clientCountry = CLIENT_COUNTRY_DATA[countrySlug];
  if (clientCountry) {
    return clientCountry.buildSections(
      dict.countries.breadcrumb.home,
      dict.countries.breadcrumb.countries
    );
  }

  const detail = dict.countries.detail;
  const about = getCountryAbout(COUNTRY_CONTENT_KEY[countrySlug] ?? countrySlug);
  const heroImage =
    COUNTRY_HERO_IMAGES[countrySlug] ?? COUNTRY_HERO_IMAGES.uae;

  return withOrder([
    makeSection("hero", {
      variant: "with-inquiry-form",
      content: {
        eyebrow: "",
        title: detail.heroTitle || "{country}",
        titleHighlight: "",
        description: "",
      },
      appearance: { background: heroImage },
    }),
    makeSection("breadcrumb", {
      content: {
        homeLabel: dict.countries.breadcrumb.home,
        rootLabel: dict.countries.breadcrumb.countries,
      },
    }),
    makeSection("serviceCards", {
      variant: "3-column",
      content: {
        eyebrow: "",
        heading: "",
        description: "",
        sectionCta: { label: "", href: "", style: "primary", icon: "" },
      },
      items: [],
      settings: { source: "context.services", columns: "3", showHeader: false },
      appearance: { theme: "dark", padding: "md", border: false, textAlign: "left" },
    }),
    makeSection("mediaContent", {
      variant: "media-right",
      content: {
        eyebrow: detail.aboutEyebrow,
        heading: about.title,
        description: about.description,
        items: [],
        actions: [],
      },
      settings: { mediaPosition: "right", containerWidth: "default" },
      appearance: {
        theme: "dark",
        padding: "md",
        border: false,
        textAlign: "left",
        background: heroImage,
        pattern: false,
      },
    }),
    makeSection("introText", {
      content: {
        eyebrow: "",
        heading: "",
        paragraphs: [detail.intro, detail.subIntro, detail.rangeHeading],
      },
      appearance: { theme: "dark", padding: "sm", border: false, textAlign: "left" },
    }),
    makeSection("citiesGrid", {
      content: { heading: detail.citiesHeading, description: "" },
      settings: { source: "context.cities", columns: "3" },
      appearance: { theme: "dark", padding: "sm", border: false, textAlign: "left" },
    }),
    makeSection("faq", {
      content: {
        eyebrow: "",
        heading: detail.faqTitle,
        description: "",
        items: [],
      },
      items: [],
      settings: { variant: "default", source: "context.faqs" },
      appearance: { theme: "darker", padding: "lg", border: false, textAlign: "center" },
    }),
  ]);
}
