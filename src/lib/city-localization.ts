/**
 * City copy localization — pure module (no React / server imports).
 *
 * Shared by:
 *  - scripts/localize-city-textmediagrid.ts (DB migration for existing articles)
 *  - SectionLibraryEditor.applyPreset (dashboard template application)
 *
 * CITY_META mirrors scripts/seed-tier1-city-services.ts (kept in sync manually —
 * the seed script itself is not modified).
 */

export interface CityMetaSeed {
  name: string;
  country: string;
  airport: string;
  landmarks: string[];
  description: string;
}

export interface CityMeta extends CityMetaSeed {
  slug: string;
  countrySlug: string;
  vision: string;
  adjective: string;
}

export const CITY_META: Record<string, CityMetaSeed> = {
  // Saudi Arabia
  "riyadh": { name: "Riyadh", country: "Saudi Arabia", airport: "King Khalid International Airport (RUH)", landmarks: ["KAFD", "Diplomatic Quarter", "Diriyah Gate", "King Fahd Road", "Olaya District"], description: "the Kingdom's bustling capital and nerve center of Vision 2030 economic diversification" },
  "jeddah": { name: "Jeddah", country: "Saudi Arabia", airport: "King Abdulaziz International Airport (JED)", landmarks: ["Corniche", "Al Balad", "King Abdullah Economic City", "TAIF Gate"], description: "the commercial hub of western Saudi Arabia and gateway to the Holy Mosques" },
  "dammam": { name: "Dammam", country: "Saudi Arabia", airport: "King Fahd International Airport (DMM)", landmarks: ["Dammam Corniche", "King Abdulaziz Port", "Dhahran Expo", "Eastern Province"], description: "the heart of Saudi Arabia's Eastern Province and oil industry corridor" },
  "al-khobar": { name: "Al Khobar", country: "Saudi Arabia", airport: "King Fahd International Airport (DMM)", landmarks: ["Khobar Corniche", "Half Moon Bay", "Dhahran Hills", "Saudi Aramco"], description: "a key business hub in the Eastern Province with proximity to major industrial zones" },
  "mecca": { name: "Mecca", country: "Saudi Arabia", airport: "King Abdulaziz International Airport (JED)", landmarks: ["Grand Mosque", "Masjid al-Haram", "Jabal al-Nour", "Mina Valley"], description: "the holiest city in Islam, welcoming millions of pilgrims annually" },
  "medina": { name: "Medina", country: "Saudi Arabia", airport: "Prince Mohammad bin Abdulaziz Airport (MED)", landmarks: ["Al-Masjid an-Nabawi", "Quba Mosque", "Uhud Mountain", "Al-Baqi Cemetery"], description: "the second holiest city in Islam with deep historical and spiritual significance" },
  "alula": { name: "AlUla", country: "Saudi Arabia", airport: "AlUla International Airport (ULH)", landmarks: ["Hegra", "Dadan", "Jabal Ikmah", "AlUla Old Town"], description: "an archaeological wonder and UNESCO World Heritage destination" },
  "taif": { name: "Taif", country: "Saudi Arabia", airport: "Taif Regional Airport (TIF)", landmarks: ["Al Rudaf Park", "King Fahd Garden", "Shubra Palace", "Souq Okaz"], description: "known as the Bride of the Hijaz with cool mountain retreats and rose gardens" },
  "neom": { name: "NEOM", country: "Saudi Arabia", airport: "NEOM Bay Airport (NUM)", landmarks: ["The Line", "Oxagon", "Trojena", "Sindalah"], description: "the Kingdom's revolutionary giga-project redefining futuristic living" },
  "abha": { name: "Abha", country: "Saudi Arabia", airport: "Abha International Airport (AHB)", landmarks: ["Asir National Park", "Jabal Soudah", "Abha Dam Lake", "Al-Muftaha Village"], description: "the scenic mountain capital of the Asir region" },
  "yanbu": { name: "Yanbu", country: "Saudi Arabia", airport: "Yanbu Airport (YNB)", landmarks: ["Yanbu Al-Sinaiyah", "Yanbu Industrial City", "Yanbu Coast", "Pearl Island"], description: "a major industrial port city on the Red Sea coast" },
  "jubail": { name: "Jubail", country: "Saudi Arabia", airport: "Jubail Airport (QJB)", landmarks: ["Jubail Industrial City", "Jubail Corniche", "Royal Commission Jubail", "Al Nakheel Beach"], description: "home to the world's largest petrochemical complex and industrial hub" },
  "tabuk": { name: "Tabuk", country: "Saudi Arabia", airport: "Tabuk Regional Airport (TBU)", landmarks: ["Al Ula Edge", "Mada'in Saleh", "Tabuk Fort", "Dadan Heritage"], description: "gateway to the historic Nabataean city of Hegra" },
  "najran": { name: "Najran", country: "Saudi Arabia", airport: "Najran Airport (EAM)", landmarks: ["Al-Ukhdood Archaeological Site", "King Fahd Dam", "Najran Fort", "Dhahran Al-Janub"], description: "a culturally rich city near the Yemeni border with ancient heritage" },
  "hail": { name: "Hail", country: "Saudi Arabia", airport: "Hail International Airport (HAS)", landmarks: ["A'arif Fort", "Hail Regional Museum", "Jubbah Rock Art", "Qishla Palace"], description: "known for its hospitable culture and UNESCO-listed rock art sites" },
  // UAE
  "dubai": { name: "Dubai", country: "UAE", airport: "Dubai International Airport (DXB)", landmarks: ["Burj Khalifa", "DIFC", "Dubai Marina", "Palm Jumeirah", "Expo City"], description: "the UAE's premier business and tourism metropolis" },
  "abu-dhabi": { name: "Abu Dhabi", country: "UAE", airport: "Abu Dhabi International Airport (AUH)", landmarks: ["Yas Island", "Al Maryah Island", "Saadiyat Island", "Qasr Al Watan"], description: "the UAE capital and center of government and culture" },
  "sharjah": { name: "Sharjah", country: "UAE", airport: "Sharjah International Airport (SHJ)", landmarks: ["Sharjah Art Foundation", "Al Noor Island", "Sharjah Heritage Area", "Blue Souk"], description: "the cultural capital of the UAE" },
  "ras-al-khaimah": { name: "Ras Al Khaimah", country: "UAE", airport: "Ras Al Khaimah International Airport (RKT)", landmarks: ["Jais Mountain", "DHayah Fort", "Al Jazirah Al Hamra", "Marjan Island"], description: "an emerging adventure and luxury destination in the northern Emirates" },
  "ajman": { name: "Ajman", country: "UAE", airport: "Ajman (via SHJ/DXB)", landmarks: ["Ajman Museum", "Ajman Corniche", "Al Zorah", "Ajman Souq"], description: "the smallest emirate with a growing commercial footprint" },
  "fujairah": { name: "Fujairah", country: "UAE", airport: "Fujairah International Airport (FJR)", landmarks: ["Fujairah Fort", "Al Bidyah Mosque", "Snoopy Island", "Port of Fujairah"], description: "the only emirate on the east coast with direct Indian Ocean access" },
  "umm-al-quwain": { name: "Umm Al Quwain", country: "UAE", airport: "Umm Al Quwain (via SHJ/RKT)", landmarks: ["Umm Al Quwain Fort", "Mangrove Lagoon", "Dreamland Aqua Park", "Old Harbor"], description: "a tranquil emirate with growing eco-tourism and trade" },
  "al-ain": { name: "Al Ain", country: "UAE", airport: "Al Ain International Airport (AAN)", landmarks: ["Al Ain Oasis", "Jebel Hafeet", "Al Ain Zoo", "Al Ain Palace Museum"], description: "the Garden City of the UAE, a UNESCO World Heritage site" },
  // Qatar
  "doha": { name: "Doha", country: "Qatar", airport: "Hamad International Airport (DOH)", landmarks: ["West Bay", "Lusail", "The Pearl", "Museum of Islamic Education", "Msheireb"], description: "Qatar's dynamic capital and major GCC business hub" },
  "lusail": { name: "Lusail", country: "Qatar", airport: "Hamad International Airport (DOH)", landmarks: ["Lusail Stadium", "Marina District", "Lusail Boulevard", "Place Vendôme"], description: "Qatar's futuristic city built from the ground up" },
  "al-wakrah": { name: "Al Wakrah", country: "Qatar", airport: "Hamad International Airport (DOH)", landmarks: ["Al Wakrah Souq", "Al Wakrah Beach", "Al Wakra Heritage Village", "Al Khor Bay"], description: "a historic coastal city south of Doha with rich maritime heritage" },
  "al-khor": { name: "Al Khor", country: "Qatar", airport: "Hamad International Airport (DOH)", landmarks: ["Al Khor Park", "Al Thakhira Beach", "Al Khor Tower", "Igaira Beach"], description: "a northern coastal city known for pearl diving heritage" },
  // Bahrain
  "manama": { name: "Manama", country: "Bahrain", airport: "Bahrain International Airport (BAH)", landmarks: ["Bahrain Financial Harbour", "Bab Al Bahrain", "Juffair", "Adliya"], description: "Bahrain's capital and a leading GCC financial center" },
  "riffa": { name: "Riffa", country: "Bahrain", airport: "Bahrain International Airport (BAH)", landmarks: ["Riffa Fort", "Riffa Views", "East Riffa", "Bahrain International Circuit"], description: "Bahrain's second-largest city with royal and sporting heritage" },
  "muharraq": { name: "Muharraq", country: "Bahrain", airport: "Bahrain International Airport (BAH)", landmarks: ["Bahrain Pearling Trail", "Muharraq Souq", "Sheikh Isa Bin Ali House", "Arad Fort"], description: "a UNESCO World Heritage city and Bahrain's cultural jewel" },
  // Kuwait
  "kuwait-city": { name: "Kuwait City", country: "Kuwait", airport: "Kuwait International Airport (KWI)", landmarks: ["Kuwait Towers", "Al Hamra Tower", "Avenues Mall", "Bayan Palace"], description: "Kuwait's commercial and governmental capital" },
  "salmiya": { name: "Salmiya", country: "Kuwait", airport: "Kuwait International Airport (KWI)", landmarks: ["Scientific Center", "Marina Mall", "Al Fanar Mall", "Salmiya Park"], description: "a major commercial and residential district in Kuwait" },
  "al-ahmadi": { name: "Al Ahmadi", country: "Kuwait", airport: "Kuwait International Airport (KWI)", landmarks: ["Al Ahmadi Opera House", "Fahaheel", "Ahmadi Heritage Area", "Green Island"], description: "the oil capital of Kuwait with a thriving industrial zone" },
  "hawalli": { name: "Hawalli", country: "Kuwait", airport: "Kuwait International Airport (KWI)", landmarks: ["Hawalli Park", "Al Hamra Entertainment City", "Salmiya", "Kuwait Mall"], description: "a central commercial hub with major retail and entertainment" },
  "farwaniya": { name: "Farwaniya", country: "Kuwait", airport: "Kuwait International Airport (KWI)", landmarks: ["Farwaniya Commercial District", "Kuwait International Airport"], description: "a central commercial and residential district in the Kuwait City metropolitan area" },
  // Oman
  "muscat": { name: "Muscat", country: "Oman", airport: "Muscat International Airport (MCT)", landmarks: ["Sultan Qaboos Grand Mosque", "Royal Opera House", "Muttrah Souq", "Al Alam Palace"], description: "Oman's capital and a gateway to Arabian heritage and modern business" },
  "salalah": { name: "Salalah", country: "Oman", airport: "Salalah Airport (SLL)", landmarks: ["Al Mughsayl Beach", "Taqah Castle", "Wadi Darbat", "Frankincense Land Museum"], description: "the capital of the Dhofar region, famous for Khareef monsoon" },
  "sohar": { name: "Sohar", country: "Oman", airport: "Sohar Airport (OHS)", landmarks: ["Sohar Fort", "Al Jays Beach", "Sohar Port", "Wadi Jizzi"], description: "a major industrial port city in northern Oman" },
  "nizwa": { name: "Nizwa", country: "Oman", airport: "Nizwa (via MCT)", landmarks: ["Nizwa Fort", "Nizwa Souq", "Jebel Akhdar", "Bahla Fort"], description: "the ancient capital of Oman and a cultural treasure" },
};

interface CountryInfo {
  slug: string;
  vision: string;
  adjective: string;
  /** National ID document term, e.g. "Saudi IDs" / "Emirates IDs". */
  idTerm: string;
  /** How to render references to "the Kingdom" for non-Saudi countries. */
  kingdomRef?: { plain: string; poss: string };
}

const COUNTRY_INFO: Record<string, CountryInfo> = {
  "Saudi Arabia": { slug: "saudi-arabia", vision: "Vision 2030", adjective: "Saudi", idTerm: "Saudi IDs" },
  "UAE": { slug: "uae", vision: "Centennial 2071", adjective: "UAE", idTerm: "Emirates IDs", kingdomRef: { plain: "the UAE", poss: "the UAE's" } },
  "Qatar": { slug: "qatar", vision: "Qatar National Vision 2030", adjective: "Qatari", idTerm: "Qatari IDs", kingdomRef: { plain: "Qatar", poss: "Qatar's" } },
  "Bahrain": { slug: "bahrain", vision: "Economic Vision 2030", adjective: "Bahraini", idTerm: "Bahraini IDs", kingdomRef: { plain: "Bahrain", poss: "Bahrain's" } },
  "Kuwait": { slug: "kuwait", vision: "New Kuwait 2035", adjective: "Kuwaiti", idTerm: "Kuwaiti IDs", kingdomRef: { plain: "Kuwait", poss: "Kuwait's" } },
  "Oman": { slug: "oman", vision: "Oman Vision 2040", adjective: "Omani", idTerm: "Omani IDs", kingdomRef: { plain: "Oman", poss: "Oman's" } },
};

function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/[-_\s]+/g, "");
}

/**
 * Resolve a city slug (preferred) or city display name to its metadata.
 * Returns null when the city is unknown — callers should then skip
 * localization and keep whatever copy they already have.
 */
export function resolveCityMeta(citySlugOrName?: string | null): CityMeta | null {
  const raw = (citySlugOrName || "").trim();
  if (!raw) return null;

  const lower = raw.toLowerCase();
  let key: string | undefined;
  if (CITY_META[lower]) {
    key = lower;
  } else {
    const target = normalize(lower);
    key =
      Object.keys(CITY_META).find((k) => normalize(k) === target) ||
      Object.keys(CITY_META).find((k) => CITY_META[k].name.toLowerCase() === lower);
  }
  if (!key) return null;

  const seed = CITY_META[key];
  const info = COUNTRY_INFO[seed.country] || {
    slug: "",
    vision: "Vision 2030",
    adjective: seed.country,
  };

  return { ...seed, slug: key, countrySlug: info.slug, vision: info.vision, adjective: info.adjective };
}

function landmark(meta: CityMeta, index: number, fallback: string): string {
  if (meta.landmarks.length === 0) return fallback;
  return meta.landmarks[Math.min(index, meta.landmarks.length - 1)] ?? fallback;
}

/** "the UAE" / "Saudi Arabia" / "Qatar" — country with article where idiomatic. */
function countryPlain(meta: CityMeta): string {
  return meta.country === "UAE" ? "the UAE" : meta.country;
}

// ── textMediaGrid regeneration ────────────────────────────────────

export function buildTextMediaGridDescription(meta: CityMeta): string {
  const lm0 = landmark(meta, 0, "key business districts");
  const lm1 = landmark(meta, 1, "secure diplomatic corridors");
  const lm2 = landmark(meta, 2, "landmark developments");

  const p1 =
    `${meta.name} — ${meta.description}. As ${countryPlain(meta)} advances its ` +
    `${meta.vision} agenda, the demands on ${meta.name}'s corporate travel infrastructure have evolved ` +
    `exponentially. AB operates at the nexus of this transformation, providing highly secure, ` +
    `scalable, and meticulously managed executive mobility solutions for multinational corporations ` +
    `entering the ${meta.adjective} market.`;

  const p2 =
    `Our strategic dispatch capabilities are engineered specifically for ${meta.name}'s premier ` +
    `business districts. We maintain a continuous, vetted presence around <strong>${lm0}</strong> and ` +
    `<strong>${lm1}</strong>, offering seamless, secure transitions between commercial hubs and ` +
    `corporate headquarters. For international delegations and foreign missions, our chauffeurs bring ` +
    `the local clearances and protocol knowledge required to operate across ${meta.name}'s secure ` +
    `zones with absolute discretion and efficiency.`;

  const p3 =
    `Beyond standard point-to-point transfers, our <em>As-Directed</em> hourly services provide global ` +
    `executives with the fluid mobility required to execute complex business roadshows across ` +
    `${meta.name}'s urban footprint—from ${lm2} to the city's fast-growing business corridors—with ` +
    `seamless connections through ${meta.airport}.`;

  return (
    `<p class="mb-6 leading-relaxed">${p1}</p>` +
    `<p class="mb-6 leading-relaxed">${p2}</p>` +
    `<p class="leading-relaxed">${p3}</p>`
  );
}

export function buildTextMediaGridItems(
  meta: CityMeta,
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
      description: "Dedicated fleet positioning for immediate business district deployments.",
    },
    {
      id: idAt(1),
      icon: "Passport",
      heading: `${landmark(meta, 1, "Protocol")} Protocol`,
      description: "Personnel vetted for protocol, venue access, and secure-area standards.",
    },
  ];
}

/**
 * Rewrite a textMediaGrid section's copy for `meta`, preserving
 * id/order/settings/appearance and media image URLs (only alts are
 * token-substituted).
 */
export function localizeTextMediaGridSection<T extends Record<string, unknown>>(
  section: T,
  meta: CityMeta
): T {
  const clone = JSON.parse(JSON.stringify(section)) as Record<string, unknown>;
  const content = (
    clone.content && typeof clone.content === "object" ? clone.content : {}
  ) as Record<string, unknown>;
  clone.content = content;

  if (typeof content.eyebrow !== "string" || !content.eyebrow) {
    content.eyebrow = "Infrastructure Alignment";
  }
  if (typeof content.eyebrowIcon !== "string" || !content.eyebrowIcon) {
    content.eyebrowIcon = "City";
  }
  content.heading = `Powering ${meta.name}'s`;
  content.headingHighlight = meta.vision;
  content.headingAfter = "Corporate Ecosystem.";
  content.description = buildTextMediaGridDescription(meta);
  content.items = buildTextMediaGridItems(meta, content.items);

  const media = content.media;
  if (Array.isArray(media)) {
    for (const raw of media) {
      if (!raw || typeof raw !== "object") continue;
      const tile = raw as Record<string, unknown>;
      if (typeof tile.imageAlt === "string") {
        tile.imageAlt = substituteCityTokens(tile.imageAlt, meta);
      }
    }
  }

  return clone as unknown as T;
}

// ── Token substitution (non-textMediaGrid sections) ───────────────

/**
 * Replace Riyadh/Saudi-specific tokens in `input` with the equivalent
 * city/country wording for `meta`. Longest patterns run first; every
 * replacement is a function so `$` in values is never treated as a
 * pattern reference.
 */
export function substituteCityTokens(input: string, meta: CityMeta): string {
  if (!input) return input;

  const lm0 = landmark(meta, 0, "key business districts");
  const lm1 = landmark(meta, 1, "secure diplomatic corridors");
  const lm2 = landmark(meta, 2, "landmark developments");
  const info = COUNTRY_INFO[meta.country];

  const rules: Array<[RegExp, () => string]> = [
    // Airports (Riyadh's airport is named outright in template copy)
    [/King Khalid International Airport \(RUH\)/g, () => meta.airport],
    [/King Khalid Int'l \(RUH\)/g, () => meta.airport],
    // Landmarks — full forms before bare abbreviations
    [/King Abdullah Financial District \(KAFD\)/g, () => lm0],
    [/\bKAFD\b/g, () => lm0],
    [/King Abdullah Financial District/g, () => lm0],
    [/Diplomatic Quarter \(DQ\)/g, () => lm1],
    [/\bDQ\b/g, () => lm1],
    [/Diplomatic Quarter/g, () => lm1],
    [/Diriyah Gate/g, () => lm2],
    // Country references — full country name before "the Kingdom" rewrites
    [/\b(?:the )?Kingdom of Saudi Arabia\b/g, () => meta.country],
  ];

  if (info?.kingdomRef) {
    const ref = info.kingdomRef;
    rules.push([/\bthe Kingdom's\b/g, () => ref.poss], [/\bthe Kingdom\b/g, () => ref.plain]);
  }

  rules.push(
    [/\bSaudi Arabia\b/g, () => meta.country],
    [/\bSaudi market\b/g, () => `${meta.adjective} market`],
    [/\bSaudi IDs\b/g, () => info?.idTerm ?? `${meta.adjective} IDs`],
    // National vision programs
    [/\bVision 2030\b/g, () => meta.vision],
    // City + airport code
    [/\bRUH\b/g, () => meta.name],
    [/\bRiyadh\b/g, () => meta.name]
  );

  return rules.reduce((acc, [pattern, replacement]) => acc.replace(pattern, replacement), input);
}

function deepSubstitute<T>(value: T, meta: CityMeta): T {
  if (typeof value === "string") return substituteCityTokens(value, meta) as unknown as T;
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
 *  - textMediaGrid → regenerated from city metadata (heading, description, items)
 *  - all other sections → deep token substitution on every string value
 *
 * Pure: inputs are never mutated.
 */
export function localizeSectionsForCity<T extends Record<string, unknown>>(
  sections: T[],
  meta: CityMeta
): T[] {
  return sections.map((section) => {
    const clone = JSON.parse(JSON.stringify(section)) as Record<string, unknown>;
    if (clone.type === "textMediaGrid") {
      return localizeTextMediaGridSection(clone, meta) as unknown as T;
    }
    return deepSubstitute(clone, meta) as unknown as T;
  });
}

// ── ID generation (matches section editor conventions) ────────────

function genItemId(): string {
  return `itm-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
