/**
 * Country copy localization — pure module (no React / server imports).
 *
 * Mirrors city-localization.ts for country services pages. Shared by
 * SectionLibraryEditor.applyPreset (dashboard template application).
 *
 * The country template (Templates/Country) is written in UAE flagship
 * voice. Applying it to any other country rewrites the copy for that
 * country and swaps the key images (hero + textMediaGrid tiles).
 * Applying it to `uae` keeps the raw base wording — same rule as the
 * city template keeping Riyadh wording for Riyadh.
 *
 * COUNTRY_META data is kept in sync manually with locationData slugs
 * and COUNTRY_INFO in city-localization.ts.
 */

export interface CountryMetaSeed {
  /** Official name: "Qatar", "Saudi Arabia", "the United Arab Emirates". */
  name: string;
  /** Idiomatic reference used when substituting "the United Arab Emirates": "Qatar", "Saudi Arabia", "the UAE". */
  nameRef: string;
  /** Short noun replacing bare "UAE": "Qatar", "Saudi Arabia". */
  short: string;
  /** Adjective for market references: "Qatari", "Saudi". */
  adjective: string;
  /** National vision program: "Qatar National Vision 2030". */
  vision: string;
  /** National ID document term: "Qatari IDs". */
  idTerm: string;
  /** Flagship gateway airport (full): "Hamad International Airport (DOH)". */
  airport: string;
  /** Compact airport form for tickers: "Hamad International (DOH)". */
  airportShort: string;
  /** IATA-style code used in base copy: "DOH". */
  airportCode: string;
  /** Commercial hub (base copy's Dubai): "Doha". */
  primary: string;
  /** Second major city (base copy's Sharjah): "Lusail". */
  secondary: string;
  /** Government capital (base copy's Abu Dhabi): "Doha". */
  capital: string;
  /** 4 landmarks — [financial/expo hub, venue, landmark, cultural]. Substitute for DIFC / Expo City Dubai / Yas Island / Burj Khalifa. */
  landmarks: string[];
  /** One-line country description for the textMediaGrid regeneration. */
  description: string;
  /** Hero background image. */
  heroImage: string;
  /** textMediaGrid image tiles (first two image tiles are replaced in order). */
  mediaImages: string[];
}

export interface CountryMeta extends CountryMetaSeed {
  slug: string;
}

export const COUNTRY_META: Record<string, CountryMetaSeed> = {
  "saudi-arabia": {
    name: "Saudi Arabia",
    nameRef: "Saudi Arabia",
    short: "Saudi Arabia",
    adjective: "Saudi",
    vision: "Vision 2030",
    idTerm: "Saudi IDs",
    airport: "King Khalid International Airport (RUH)",
    airportShort: "King Khalid Int'l (RUH)",
    airportCode: "RUH",
    primary: "Riyadh",
    secondary: "Jeddah",
    capital: "Riyadh",
    landmarks: [
      "King Abdullah Financial District (KAFD)",
      "Diriyah Gate",
      "Boulevard City",
      "Jeddah Corniche",
    ],
    description: "the Kingdom's economic powerhouse and the commercial heart of its Vision 2030 transformation",
    heroImage: "https://images.unsplash.com/photo-1663900108404-a05e8bf82cda?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0",
    mediaImages: [
      "https://images.unsplash.com/photo-1663900108404-a05e8bf82cda?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=600&h=400&fit=crop&q=80",
    ],
  },
  qatar: {
    name: "Qatar",
    nameRef: "Qatar",
    short: "Qatar",
    adjective: "Qatari",
    vision: "Qatar National Vision 2030",
    idTerm: "Qatari IDs",
    airport: "Hamad International Airport (DOH)",
    airportShort: "Hamad International (DOH)",
    airportCode: "DOH",
    primary: "Doha",
    secondary: "Lusail",
    capital: "Doha",
    landmarks: ["West Bay", "Lusail", "The Pearl-Qatar", "Msheireb Downtown Doha"],
    description: "the Gulf's fastest-growing business hub and host of global summits and sporting events",
    heroImage: "https://plus.unsplash.com/premium_photo-1661919068698-40e7b78f196a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0",
    mediaImages: [
      "https://images.unsplash.com/photo-1647252262017-582a7dbb73d0?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1728488443267-8340c9a74dcf?w=600&h=400&fit=crop&q=80",
    ],
  },
  bahrain: {
    name: "Bahrain",
    nameRef: "Bahrain",
    short: "Bahrain",
    adjective: "Bahraini",
    vision: "Economic Vision 2030",
    idTerm: "Bahraini IDs",
    airport: "Bahrain International Airport (BAH)",
    airportShort: "Bahrain Int'l (BAH)",
    airportCode: "BAH",
    primary: "Manama",
    secondary: "Muharraq",
    capital: "Manama",
    landmarks: [
      "Bahrain Financial Harbour",
      "Bab Al Bahrain",
      "Bahrain International Circuit",
      "Juffair",
    ],
    description: "the financial center of the GCC and a regional hub for banking, aviation, and industry",
    heroImage: "https://images.unsplash.com/photo-1547548731-e95343697eb4?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0",
    mediaImages: [
      "https://images.unsplash.com/photo-1547548731-e95343697eb4?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1548755212-2b46ee259868?w=600&h=400&fit=crop&q=80",
    ],
  },
  kuwait: {
    name: "Kuwait",
    nameRef: "Kuwait",
    short: "Kuwait",
    adjective: "Kuwaiti",
    vision: "New Kuwait 2035",
    idTerm: "Kuwaiti IDs",
    airport: "Kuwait International Airport (KWI)",
    airportShort: "Kuwait Int'l (KWI)",
    airportCode: "KWI",
    primary: "Kuwait City",
    secondary: "Salmiya",
    capital: "Kuwait City",
    landmarks: ["Kuwait Towers", "Al Hamra Tower", "The Avenues Kuwait", "Bayan Palace"],
    description: "the Gulf's commercial and governmental capital with a rapidly modernizing skyline",
    heroImage: "https://plus.unsplash.com/premium_photo-1661963334316-e7f118aaae75?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0",
    mediaImages: [
      "https://plus.unsplash.com/premium_photo-1661963334316-e7f118aaae75?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&q=80",
    ],
  },
  oman: {
    name: "Oman",
    nameRef: "Oman",
    short: "Oman",
    adjective: "Omani",
    vision: "Oman Vision 2040",
    idTerm: "Omani IDs",
    airport: "Muscat International Airport (MCT)",
    airportShort: "Muscat Int'l (MCT)",
    airportCode: "MCT",
    primary: "Muscat",
    secondary: "Salalah",
    capital: "Muscat",
    landmarks: [
      "Oman Convention & Exhibition Centre",
      "Muttrah Souq",
      "Al Alam Palace",
      "Royal Opera House Muscat",
    ],
    description: "a gateway to Arabian heritage and modern business, diversifying under Oman Vision 2040",
    heroImage: "https://images.unsplash.com/photo-1621680696874-edd80ce57b72?q=80&w=1291&auto=format&fit=crop&ixlib=rb-4.1.0",
    mediaImages: [
      "https://images.unsplash.com/photo-1621680696874-edd80ce57b72?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop&q=80",
    ],
  },
  gcc: {
    name: "the GCC member states",
    nameRef: "the GCC",
    short: "the GCC",
    adjective: "GCC",
    vision: "GCC Economic Vision",
    idTerm: "GCC national IDs",
    airport: "the region's international airports",
    airportShort: "GCC International Airports",
    airportCode: "GCC",
    primary: "Riyadh",
    secondary: "Doha",
    capital: "Manama",
    landmarks: ["Riyadh", "Doha", "Manama", "Muscat"],
    description: "the six-nation Gulf Cooperation Council corridor linking the region's leading economies",
    heroImage: "https://images.unsplash.com/flagged/photo-1559717865-a99cac1c95d8?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0",
    mediaImages: [
      "https://images.unsplash.com/flagged/photo-1559717865-a99cac1c95d8?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop&q=80",
    ],
  },
  // Base country — kept for completeness; applyPreset skips localization for `uae`.
  uae: {
    name: "the United Arab Emirates",
    nameRef: "the UAE",
    short: "UAE",
    adjective: "UAE",
    vision: "Centennial 2071",
    idTerm: "Emirates IDs",
    airport: "Dubai International Airport (DXB)",
    airportShort: "Dubai International (DXB)",
    airportCode: "DXB",
    primary: "Dubai",
    secondary: "Sharjah",
    capital: "Abu Dhabi",
    landmarks: [
      "Dubai International Financial Centre (DIFC)",
      "Expo City Dubai",
      "Yas Island",
      "Burj Khalifa",
    ],
    description: "the region's premier business and tourism economy advancing its Centennial 2071 agenda",
    heroImage: "https://images.unsplash.com/flagged/photo-1559717865-a99cac1c95d8?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0",
    mediaImages: [
      "https://images.unsplash.com/photo-1588726588629-19e48f7d9834?w=600&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop&q=80",
    ],
  },
};

function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/[-_\s]+/g, "");
}

/**
 * Resolve a country slug (preferred) or country display name to its
 * metadata. Returns null when the country is unknown — callers should
 * then skip localization and keep the base (UAE) copy.
 */
export function resolveCountryMeta(
  countrySlugOrName?: string | null
): CountryMeta | null {
  const raw = (countrySlugOrName || "").trim();
  if (!raw) return null;

  const lower = raw.toLowerCase();
  let key: string | undefined;
  if (COUNTRY_META[lower]) {
    key = lower;
  } else {
    const target = normalize(lower);
    key =
      Object.keys(COUNTRY_META).find((k) => normalize(k) === target) ||
      Object.keys(COUNTRY_META).find(
        (k) => COUNTRY_META[k].name.toLowerCase() === lower
      );
  }
  if (!key) return null;

  return { ...COUNTRY_META[key], slug: key };
}

function landmark(meta: CountryMeta, index: number, fallback: string): string {
  return meta.landmarks[index] ?? fallback;
}

// ── textMediaGrid regeneration (country scope) ────────────────────

export function buildCountryTextMediaGridDescription(meta: CountryMeta): string {
  const lm0 = landmark(meta, 0, "premier business districts");
  const lm1 = landmark(meta, 1, "landmark developments");

  const p1 =
    `${meta.nameRef} — ${meta.description}. As the nation advances its ` +
    `${meta.vision} agenda, the demands on corporate travel infrastructure have ` +
    `evolved exponentially. AB operates at the nexus of this transformation, ` +
    `providing highly secure, scalable, and meticulously managed executive mobility ` +
    `solutions for multinational corporations entering the ${meta.adjective} market.`;

  const p2 =
    `Our strategic dispatch capabilities span the entire country. We maintain a ` +
    `continuous, vetted presence around <strong>${lm0}</strong> and ` +
    `<strong>${lm1}</strong>, linking commercial hubs, government centers, and ` +
    `corporate headquarters from ${meta.primary} to ${meta.secondary}. For ` +
    `international delegations and foreign missions, our chauffeurs hold the ` +
    `${meta.idTerm} and protocol knowledge required to operate across the ` +
    `nation's secure zones with absolute discretion.`;

  const p3 =
    `Beyond point-to-point transfers, our <em>As-Directed</em> hourly services ` +
    `give global executives the fluid mobility required to execute complex ` +
    `business roadshows nationwide — across ${lm0} corridors, government ` +
    `quarters, and event venues — with seamless connections through ` +
    `${meta.airport}.`;

  return (
    `<p class="mb-6 leading-relaxed">${p1}</p>` +
    `<p class="mb-6 leading-relaxed">${p2}</p>` +
    `<p class="leading-relaxed">${p3}</p>`
  );
}

export function buildCountryTextMediaGridItems(
  meta: CountryMeta,
  existing?: unknown
): Array<Record<string, unknown>> {
  const prev = Array.isArray(existing) ? (existing as Array<Record<string, unknown>>) : [];
  const idAt = (i: number): string =>
    typeof prev[i]?.id === "string" ? (prev[i].id as string) : genItemId();

  return [
    {
      id: idAt(0),
      icon: "BuildingShield",
      heading: `${landmark(meta, 0, "Business District")} Operations`,
      description: "Dedicated fleet positioning across the country's premier business hubs.",
    },
    {
      id: idAt(1),
      icon: "Passport",
      heading: "Cross-Border & Protocol",
      description: "Personnel vetted for embassy, border, and secure-area standards.",
    },
  ];
}

/**
 * Rewrite a textMediaGrid section's copy for `meta`, preserving
 * id/order/settings/appearance. Image tiles are swapped for the
 * country's imagery; alts are token-substituted.
 */
export function localizeCountryTextMediaGridSection<T extends Record<string, unknown>>(
  section: T,
  meta: CountryMeta
): T {
  const clone = JSON.parse(JSON.stringify(section)) as Record<string, unknown>;
  const content = (
    clone.content && typeof clone.content === "object" ? clone.content : {}
  ) as Record<string, unknown>;
  clone.content = content;

  if (typeof content.eyebrow !== "string" || !content.eyebrow) {
    content.eyebrow = "National Infrastructure";
  }
  // "Powering Qatar's Qatar National Vision 2030" would read redundant —
  // keep the possessive only when the vision name doesn't already carry
  // the country's name (Saudi Arabia's Vision 2030 ✓ / Oman Vision 2040 ✗).
  const bareName = (meta.nameRef || meta.short).replace(/^the\s+/i, "");
  const visionCarriesName = meta.vision.includes(bareName) || meta.vision.includes(meta.short.replace(/^the\s+/i, ""));
  content.heading = visionCarriesName ? "Powering" : `Powering ${meta.nameRef}'s`;
  content.headingHighlight = meta.vision;
  content.headingAfter = "Corporate Ecosystem.";
  content.description = buildCountryTextMediaGridDescription(meta);
  content.items = buildCountryTextMediaGridItems(meta, content.items);

  const media = content.media;
  if (Array.isArray(media)) {
    let imageIdx = 0;
    for (const raw of media) {
      if (!raw || typeof raw !== "object") continue;
      const tile = raw as Record<string, unknown>;
      if (typeof tile.imageAlt === "string") {
        tile.imageAlt = substituteCountryTokens(tile.imageAlt, meta);
      }
      if (
        tile.type === "image" &&
        typeof tile.image === "string" &&
        imageIdx < meta.mediaImages.length
      ) {
        tile.image = meta.mediaImages[imageIdx];
        imageIdx += 1;
      }
    }
  }

  return clone as unknown as T;
}

// ── Token substitution (non-textMediaGrid sections) ───────────────

/**
 * Replace UAE-flagship tokens in `input` with the equivalent wording
 * for `meta`. Longest/most-specific patterns run first; every
 * replacement is a function so `$` in values is never treated as a
 * pattern reference.
 */
export function substituteCountryTokens(input: string, meta: CountryMeta): string {
  if (!input) return input;

  const lm0 = landmark(meta, 0, "premier business districts");
  const lm1 = landmark(meta, 1, "landmark developments");
  const lm2 = landmark(meta, 2, "city landmarks");
  const lm3 = landmark(meta, 3, "cultural districts");

  const rules: Array<[RegExp, () => string]> = [
    // Airports (named outright in template copy)
    [/Dubai International Airport \(DXB\)/g, () => meta.airport],
    [/Dubai International \(DXB\)/g, () => meta.airportShort],
    // National ID documents
    [/\bEmirates IDs\b/g, () => meta.idTerm],
    [/\bEmirates ID\b/g, () => meta.idTerm.replace(/s$/, "")],
    // National vision program
    [/\bCentennial 2071\b/g, () => meta.vision],
    // Country references — full name before short forms
    [/(?:the )?United Arab Emirates's/g, () => `${meta.nameRef}'s`],
    [/(?:the )?United Arab Emirates\b/g, () => meta.nameRef],
    [/\bthe Emirates\b/g, () => meta.nameRef],
    [/\bUAE market\b/g, () => `${meta.adjective} market`],
    // Landmarks — full forms before bare abbreviations
    [
      /Dubai International Financial Centre \(DIFC\)/g,
      () => lm0,
    ],
    [/\bDIFC\b/g, () => lm0],
    [/Expo City Dubai/g, () => lm1],
    [/\bExpo City\b/g, () => lm1],
    [/Yas Island/g, () => lm2],
    [/\bBurj Khalifa\b/g, () => lm3],
    // IATA code
    [/\bDXB\b/g, () => meta.airportCode],
    // Cities — distinct base cities avoid collisions after substitution
    [/\bAbu Dhabi\b/g, () => meta.capital],
    [/\bSharjah\b/g, () => meta.secondary],
    [/\bDubai\b/g, () => meta.primary],
    // Short country form last
    [/\bUAE's\b/g, () => `${meta.nameRef}'s`],
    [/\bUAE\b/g, () => meta.short],
  ];

  return rules.reduce((acc, [pattern, replacement]) => acc.replace(pattern, replacement), input);
}

function deepSubstitute<T>(value: T, meta: CountryMeta): T {
  if (typeof value === "string") return substituteCountryTokens(value, meta) as unknown as T;
  if (Array.isArray(value)) return value.map((v) => deepSubstitute(v, meta)) as unknown as T;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = deepSubstitute(v, meta);
    }
    return out as unknown as T;
  }
  return value;
}

/**
 * Localize a full sections array for `meta`:
 *  - hero → background image swapped to the country's hero image
 *  - textMediaGrid → regenerated from country metadata (heading,
 *    description, items) with image tiles swapped
 *  - all other sections → deep token substitution on every string value
 *
 * Pure: inputs are never mutated.
 */
export function localizeSectionsForCountry<T extends Record<string, unknown>>(
  sections: T[],
  meta: CountryMeta
): T[] {
  return sections.map((section) => {
    const clone = JSON.parse(JSON.stringify(section)) as Record<string, unknown>;
    if (clone.type === "textMediaGrid") {
      return localizeCountryTextMediaGridSection(clone, meta) as unknown as T;
    }
    if (clone.type === "hero") {
      const appearance = (
        clone.appearance && typeof clone.appearance === "object"
          ? clone.appearance
          : {}
      ) as Record<string, unknown>;
      clone.appearance = appearance;
      if (typeof appearance.background === "string" && appearance.background) {
        appearance.background = meta.heroImage;
      }
      if (typeof clone.content === "object" && clone.content) {
        clone.content = deepSubstitute(clone.content, meta);
      }
      return clone as unknown as T;
    }
    return deepSubstitute(clone, meta) as unknown as T;
  });
}

// ── ID generation (matches section editor conventions) ────────────

function genItemId(): string {
  return `itm-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
