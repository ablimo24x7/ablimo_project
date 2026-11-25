# Plan: Global Section Library + Location Page Templating

**Status:** ✅ GREEN-LIT — build in progress (2026-10-16). Plan verified against codebase; corrections folded in below.
**Date:** 2026-10-15 (updated 2026-10-16)
**Decisions confirmed by user:** separate-collection templates, per-country route scope, legacy `city.sections` hidden, full seed in one pass, Global Section Library as unified foundation.

---

## 1. Executive Summary

Two connected workstreams, designed as **one system** (not two parallel ones):

1. **Global Section Library** — a plug-and-play, zod-validated, zustand-backed catalog of reusable website sections (hero, faq, media content, grids, CTAs, etc.), scoped by page type (service / country / city / route). Single source of truth for section definitions, registry, presets, and the dashboard section editor.
2. **Location Page Templating** — country, city, and route pages become fully dashboard-editable, DB-driven templates built **on top of** the Global Section Library. Replaces all hardcoded content (hero images, about text, dict-driven copy, grid blocks) with structured, seeded templates stored in a separate `locationPageTemplates` collection.

Existing services `pageSections` data is **not disturbed** — the **9-field** section shape (`id, type, variant, order, enabled, content, items, settings, appearance`) is byte-identical between services and the new library, so no migration is required.

---

## 2. Current State (Problem)

| Area | Today | Problem |
|---|---|---|
| **Services pages** | Fully templated via `pageSections` (Mixed) + `PageSection` + `SECTION_TYPES` + `SECTION_REGISTRY` + `ServiceSectionEditor` | Works well — this is the pattern to generalize |
| **Country pages** | Hardcoded JSX in `CountryDetailClient.tsx` (hero image map, service cards, about, intro, cities grid, FAQ) | Not editable, not in DB |
| **City pages** | Hardcoded JSX in `CityDetailClient.tsx` + dict-driven copy (`cityContent.*`) + `aboutContent.ts` + `sectionImages` + legacy `city.sections` (TextImageSection, dropped on POST) | Mostly not editable; dead dict keys (`cityContent["united-arab-emirates"]` never matches slug `uae`) |
| **Route pages** | Fully inline server-rendered in `routes/[route]/page.tsx` (hero, stats, city visuals, why-choose, about, FAQ, CTA) — all dict + hardcoded | Not editable, not in DB |
| **Section systems** | Services `PageSection` (9-field) + legacy `TextImageSection` (different shape) | Two rival editors already exist: `service-section-editor.tsx` (1894 lines) and generic `section-editor.tsx` (1261 lines, used by `post-editor.tsx`) — library refactor picks the former |

**DB collections today:** `countries` (nested cities), `locationroutes`, `services`, `articles`, etc. **No** `locationPageTemplates` / `sectionPresets`.

**Dependencies already installed** (nothing to add): `zustand@^5.0.15`, `zod@^4.4.3`, `@dnd-kit/core|sortable|utilities`.

### 2.1 Codebase verification corrections (verified 2026-10-16)

The plan's facts were checked against the repo (explore agent audit). Folded-in corrections:

| # | Correction |
|---|---|
| C1 | Section shape is **9 fields**, not 8 (the enumeration always had 9; "8" was a wording typo). |
| C2 | **Seed scope = 41 cities**, not ~24: UAE 8 (dubai, abu-dhabi, sharjah, ajman, ras-al-khaimah, al-ain, fujairah, umm-al-quwain), Saudi 17 (riyadh, jeddah, mecca, medina, dammam, tabuk, al-ula, al-khobar, al-qasim, abha, jizan, neom, hail, jubail, najran, taif, yanbu), Qatar 4 (doha, al-khor, lusail, al-wakrah), Bahrain 3 (manama, riffa, muharraq), Kuwait 5 (kuwait-city, hawalli, farwaniya, al-ahmadi, salmiya), Oman 4 (muscat, salalah, sohar, nizwa). Most cities have **no** `cityHeroImages`/`cityContent`/`aboutContent` coverage → `buildCityTemplate` must include a **generic per-city fallback builder** (hero image fallback, generic about/gettingAround copy) so all 41 seed with complete content. |
| C3 | **Slug normalization is a hard requirement, not a footnote**: runtime slugs are `uae`/`kuwait-city` but content keys are `united-arab-emirates`/`kuwait`. Preset builders must normalize (`united-arab-emirates → uae`, `kuwait/kuwait → kuwait-city`, etc. via alias map) — otherwise UAE about + city copy silently falls back to generic text (which is today's bug). `countryAbout["germany"]` is an orphan (no such country) — dropped from presets. |
| C4 | **Three dictionaries**: `en-US`, `en-GB`, `ar` (`dictionaries.ts` `locales`). **No new dict keys are added by this plan** — all copy moves into templates; legacy `cityContent.*`/`countries.detail.*` keys become read-only leftovers deleted in Phase 2. |
| C5 | Line fixes: `ServiceCreateSchema` at `validations/service.ts:58` (line 79 is its `pageSections` field); `service-editor.tsx` editor mount at line **368**; `mapCity` = 36–53; `aboutContent.ts` has **38** records (7 `countryAbout` incl. orphan `germany` + **31** `cityAbout`), not 37. |
| C6 | **`post-editor.tsx` also mounts `ServiceSectionEditor`** (lines 21–27, 466–475, with `CITY_TEMPLATE_PRESETS` for city-type articles). Step 4's refactor must update this call site too, or keep a backward-compatible default so it keeps working. |
| C7 | **No zustand precedent**: zero zustand usage in repo today (installed but unused); state convention is react-query + `useState`. The store is greenfield — keep it minimal (catalog queries only, no async). |
| C8 | `countrySchema` has **no** `sections` field (only `citySchema.sections` at Country.ts:220). Under decision #1 there are **zero entity-schema changes** — templates live only in `locationPageTemplates`. |
| C9 | `PUT /api/locations/[id]` has **no raw-driver bypass** today; `cities` flows through Mongoose subdoc casting. Legacy `sections` inside cities may be dropped by casting — **accepted**, since decision #3 ignores `sections` entirely. Templates are unaffected (separate collection, own raw-driver bypass). |
| C10 | Other seed scripts to mirror beyond `seed-routes.js` (CJS, `$setOnInsert` upsert, `ablimo-db`): `seed-location-faqs.js`, `seed-country-services.ts`, `seed-tier1-city-services.ts`. |
| C11 | **Next.js is v16.2.10** — per AGENTS.md, read `node_modules/next/dist/docs/` before writing route/page code (`01-app/01-getting-started/05-server-and-client-components.md`, `15-route-handlers.md`, `01-app/03-api-reference/03-file-conventions/route.md`). |
| C12 | Existing legacy location components: `src/components/locations/TextImageSection.tsx`, `CardsSection.tsx`, `ServicesTabs.tsx` (TextImageSection stays dead per decision #3). |
| C13 | **Actual DB reality (corrects C2's estimate — verified by running the seed 2026-10-16)**: 7 published countries — UAE 6 cities, Saudi 12, Qatar 3, Bahrain 4 (incl. junk city `xyz`), Kuwait 4, Oman 3, **`germany` with 0 cities** (published DB country, not an orphan) = **32 cities**, not 41 (no fujairah/umm-al-quwain/hail/jubail/najran/taif/yanbu/al-wakrah/salmiya/nizwa). Seed total = **46 docs per locale × 3 = 138** (7 country + 32 city + 7 route). Seed is DB-driven — numbers follow the DB, seed script logs its own counts. |
| C14 | **Slug reality (corrects C3's premise)**: the **DB** country slug is `united-arab-emirates` (static fallback dataset uses `uae`); URL `/uae` and `/united-arab-emirates` both resolve to the same DB doc via `countryLookupKeys`, and pages receive `country.slug = "united-arab-emirates"` → **that is the template `refKey`**. `cityContent["united-arab-emirates"]...` therefore matches today's lookups for DB slugs (C3's "UAE about silently falls back" was inverted — the alias maps are a safety net that also covers the DB-off static `uae` path). The genuinely dead key pair — cityContent subkey `kuwait` vs DB city slug `kuwait-city` — **is** fixed by the `CITY_CONTENT_KEY` alias (JSON copy now renders where today English fallbacks did). Cities missing from `cityHeroImages` (al-ain, tabuk, neom, …, `xyz`) fall back to `CITY_HERO_IMAGES.dubai` — same fallback the client uses today. |

---

## 3. Global Section Library

### 3.1 Naming

**"Section Library"** — directory `src/components/section-library/`, zustand hook `useSectionLibraryStore`, UI label "Section Library".

Rationale: "Library" is the industry-standard term for plug-and-play reusable UI blocks (Webflow Library, Framer Components, Shopify Theme Sections). "Store" collides with zustand's own "store" terminology. *(User may override to "Section Store" — just substitute `useSectionStore` / "Section Store" throughout.)*

### 3.2 Core insight — shape is already unified

Services `PageSection` (`src/components/services/sections/section-types.ts:20-30`) and the planned `LocationSection` are **identical**:

```ts
{ id, type, variant, order, enabled, content, items, settings, appearance }
```

Existing services `pageSections` DB data uses this shape. The library adopts it as the canonical `SectionInstance` — **zero data migration**.

### 3.3 Canonical types — `src/components/section-library/types.ts`

```ts
export type SectionScope = "service" | "country" | "city" | "route";
// extensible union — future: "blog", "landing", etc.

export interface SectionInstance {   // canonical = old PageSection
  id: string;
  type: string;
  variant: string;
  order: number;
  enabled: boolean;
  content: Record<string, unknown>;
  items: Record<string, unknown>[];
  settings: Record<string, unknown>;
  appearance: Record<string, unknown>;
}

export interface SectionDefinition {
  type: string;                      // "hero" | "faq" | "citiesGrid" | ...
  label: string;
  description: string;
  icon: string;                      // lucide name
  scopes: SectionScope[];            // where usable
  category: string;                  // "Hero" | "Content" | "Grids" | "CTA" | "Stats" | "Navigation"
  variants: { value: string; label: string }[];
  defaults: () => SectionInstance;
  contentSchema?: z.ZodType;         // per-type validation + editor form driving
  settingsSchema?: z.ZodType;
}
```

### 3.4 Catalog — `src/components/section-library/definitions/`

Single source of truth. **Similar sections merged into one definition with correct name + scopes:**

#### Shared / merged (multi-scope)

| type | scopes | Merge rationale |
|---|---|---|
| `hero` | service, country, city, route | **Merges services `hero` + planned `locationHero`**. Services keeps `variant: "background-content"/"centered"`. Location adds `variant: "with-inquiry-form"` (renders `HeroInquiryForm` overlay). Existing services data (`type:"hero"`, no inquiry variant) renders identically. |
| `faq` | all | Reuse existing `FAQSection`. Adds `settings.source: "context.faqs" \| "inline"` — services uses `inline` (content.items), locations use `context.faqs` (live country/city faqs). |
| `ctaBanner` | all | Reuse existing `CTABannerSection` as-is. |
| `mediaContent` | all | Reuse existing `MediaContentSection`. Locations use for about / gettingAround / limousineService / airportTransfer / whyChoose / aboutRoute. |
| `serviceCards` | service, country, city | Reuse existing `ServiceCardsSection`. Adds `settings.source: "context.services" \| "inline"`. |

#### Service-only (unchanged)

`marquee`, `textMediaGrid`, `fleetGrid`, `contactForm` — `scopes: ["service"]`

#### Location-only (new components)

| type | scopes | Purpose |
|---|---|---|
| `introText` | country | 3-paragraph intro block (intro / subIntro / rangeHeading) |
| `citiesGrid` | country | "Cities We Serve in {country}" |
| `airportsGrid` | city | City airports list |
| `routesGrid` | city | "Inter City Routes in {country}" (context.routes, city-as-origin) |
| `routeStats` | route | 3 stat cards: distance / duration / pricing |
| `cityVisuals` | route | 2 image cards (From / To) |
| `breadcrumb` | country, city, route | Breadcrumb nav |

**Total catalog: 16 section types** (9 existing services + 7 new location-specific), 5 of the 9 services types now multi-scope.

### 3.5 Unified registry — `src/components/section-library/registry.tsx`

```ts
export type SectionRenderContext =
  | { kind: "service"; serviceName?: string; serviceUrl?: string }
  | { kind: "location"; lang: string; country: Country; city?: City;
      fromCity?: City; toCity?: City; route?: CityRoute;
      services: LocationServiceItem[]; routes: CityRoute[]; dict: Dictionary };

export interface SectionRendererProps {
  section: SectionInstance;
  context?: SectionRenderContext;
  serviceName?: string;   // legacy passthrough for services
  serviceUrl?: string;
}

export const SECTION_LIBRARY_REGISTRY: Record<string, ComponentType<SectionRendererProps>> = {
  hero: HeroSection,                 // existing — extended for inquiry-form variant
  faq: FAQSection,                   // existing — extended for context.faqs source
  ctaBanner: CTABannerSection,       // existing — unchanged
  mediaContent: MediaContentSection, // existing — unchanged
  serviceCards: ServiceCardsSection, // existing — extended for context.services source
  marquee: MarqueeSection,           // existing
  textMediaGrid: TextMediaGridSection,
  fleetGrid: FleetGridSection,
  contactForm: ContactFormSection,
  introText: IntroTextSection,       // new
  citiesGrid: CitiesGridSection,     // new
  airportsGrid: AirportsGridSection, // new
  routesGrid: RoutesGridSection,     // new
  routeStats: RouteStatsSection,     // new
  cityVisuals: CityVisualsSection,   // new
  breadcrumb: BreadcrumbSection,     // new
};
```

### 3.6 Zustand store — `src/stores/section-library-store.ts`

```ts
import { create } from "zustand";
import { SECTION_CATALOG } from "@/components/section-library/definitions";

export interface SectionPreset {   // user-saved reusable section instance (optional DB feature)
  id: string; name: string; scope: SectionScope; section: SectionInstance;
}

interface SectionLibraryState {
  catalog: SectionDefinition[];
  customPresets: SectionPreset[];   // DB-hydrated, optional
  getDefinitionsForScope: (scope: SectionScope) => SectionDefinition[];
  getDefinition: (type: string) => SectionDefinition | undefined;
  searchDefinitions: (query: string, scope?: SectionScope) => SectionDefinition[];
  hydrateCustomPresets: (presets: SectionPreset[]) => void;
  addCustomPreset: (preset: SectionPreset) => void;
  removeCustomPreset: (id: string) => void;
}

export const useSectionLibraryStore = create<SectionLibraryState>((set, get) => ({
  catalog: SECTION_CATALOG,
  customPresets: [],
  getDefinitionsForScope: (scope) => get().catalog.filter(d => d.scopes.includes(scope)),
  getDefinition: (type) => get().catalog.find(d => d.type === type),
  searchDefinitions: (query, scope) => {
    const q = query.toLowerCase();
    return get().catalog.filter(d =>
      (!scope || d.scopes.includes(scope)) &&
      (d.label.toLowerCase().includes(q) || d.description.toLowerCase().includes(q) || d.type.includes(q))
    );
  },
  hydrateCustomPresets: (presets) => set({ customPresets: presets }),
  addCustomPreset: (preset) => set(s => ({ customPresets: [...s.customPresets, preset] })),
  removeCustomPreset: (id) => set(s => ({ customPresets: s.customPresets.filter(p => p.id !== id) })),
}));
```

Purpose: single hook any dashboard component can call to query the library without prop-drilling; home for optional DB-hydrated custom presets; future extension point for runtime-registered definitions.

### 3.7 Unified editor — refactor `ServiceSectionEditor` → `SectionLibraryEditor`

- Rename `src/components/admin/service-section-editor.tsx` → `section-library-editor.tsx`
- Add `scope: SectionScope` prop; add-panel iterates `useSectionLibraryStore.getDefinitionsForScope(scope)` instead of hardcoded `SECTION_TYPES`
- Preset picker: built-in presets filtered by scope + `customPresets` from store
- Per-type field panels driven by `definition.contentSchema`/`settingsSchema` where provided (fall back to generic JSON editors otherwise)
- **Existing `service-editor.tsx` passes `scope="service"`** — behavior byte-identical to today
- New location editor cards pass `scope="country" | "city" | "route"`

### 3.8 Renderer strategy (non-disruptive)

- **Keep services `PageRenderer` untouched** — existing service pages continue through it, zero regression risk
- **New `SectionRenderer`** (in section-library) for location pages: accepts `{sections, context: SectionRenderContext}`, filters `enabled`, sorts by `order`, dispatches via `SECTION_LIBRARY_REGISTRY`
- Both share the same registry/components — a `faq` section renders identically on a service page and a city page

### 3.9 Non-disturbance guarantees

- **Services `pageSections` DB data**: shape unchanged (`SectionInstance` ≡ old `PageSection`). Existing types' components either unchanged (`ctaBanner`, `mediaContent`, `marquee`, `fleetGrid`, `textMediaGrid`, `contactForm`) or backward-compatibly extended (`hero` only adds inquiry-form branch when `variant === "with-inquiry-form"` — existing services data never has that variant; `faq`/`serviceCards` only branch on `settings.source` which existing services data never sets, defaulting to `inline` = current behavior)
- **Services `SECTION_TYPES` / `SECTION_REGISTRY` / `TEMPLATE_PRESETS`**: left in place initially; library imports them as the base layer and extends. Services code paths untouched in phase 1. (Optional later cleanup: refactor services to re-export from library.)
- **Legacy `TextImageSection`**: stays hidden/deprecated, not registered in the library.

### 3.10 Zod usage

- `SectionInstanceSchema` — the 9-field zod, already exists as `PageSectionSchema` in `src/lib/validations/service.ts:46-56`; re-export into library types (library owns the canonical copy; services keeps its import working)
- Per-definition `contentSchema`/`settingsSchema` — optional, tighter per-type validation + drives editor form fields
- Location templates API (below) validates with `z.array(SectionInstanceSchema)`
- Services API validation unchanged

### 3.11 Optional enhancement — user-creatable custom presets

"Add more section to the store" can mean two things:
1. **Developers add new section types** (code): add one `SectionDefinition` file + one component → auto-appears in catalog scoped as declared. **Core mechanism, built now.**
2. **Users save a configured section as a reusable preset** (like Webflow save-as-symbol): DB collection `sectionPresets` (`{name, scope, section: SectionInstance}`), hydrated into zustand `customPresets`, shown in the editor's preset picker alongside built-ins. Add a "Save as preset" button on any section instance. **Fast-follow, ~2–3h: model + API + hydrate + picker UI.**

---

## 4. Location Page Templating (built on the Library)

### 4.1 Architecture decisions (user-confirmed)

| # | Decision |
|---|---|
| 1 | **Separate collection** `locationPageTemplates` — NOT embedded on `countrySchema`/`citySchema` |
| 2 | **Route templates: per-country scope** — stored in same collection with `refKey = countrySlug` (NOT literally on `countrySchema`; "per-country" is the scope/granularity via `refKey`) |
| 3 | **Legacy `city.sections` hidden entirely** — no editor UI, no rendering, no migration. Field stays in schema (harmless) but fully ignored; droppable later |
| 4 | **Seed everything in one pass** — all 6 countries, every city in DB, one route template per country, every field ported from hardcoded sources |

### 4.2 New collection — `locationPageTemplates`

Model `src/lib/models/LocationPageTemplate.ts`:

```ts
const locationPageTemplateSchema = new Schema(
  {
    pageType: { type: String, required: true, enum: ["country", "city", "route"] },
    refKey:   { type: String, required: true, trim: true },
    //   country → countrySlug ("uae")
    //   city    → `${countrySlug}/${citySlug}` ("uae/dubai")
    //   route   → countrySlug ("uae")  ← per-country scope
    lang:     { type: String, required: true, default: "en-US" },  // per-locale docs
    template: { type: Schema.Types.Mixed, default: [] },   // SectionInstance[]
    status:   { type: String, default: "published", enum: ["draft","published","archived"] },
  },
  { timestamps: true }
);
locationPageTemplateSchema.index({ pageType: 1, refKey: 1, lang: 1 }, { unique: true });
```

**Per-locale templates (build-time amendment, decided during Step 6)** — one doc per
`(pageType, refKey, lang)`: builders are dict-parameterized (`buildCountryTemplate(slug, dict)`),
the seed generates 3 locale variants per entity, and resolvers look up exact `lang` first,
fall back to `en-US`, then to the builder. Rationale: ar/en-GB templates store translated
heading/label copy at rest instead of re-rendering English.

Exports: `LocationPageTemplate` model + `LocationPageTemplateDoc`. Collection name: `locationpagetemplates`.

**No changes to `Country.ts` / `Route.ts` schemas** — entities stay lean. Templates live only in the new collection. Legacy `citySchema.sections: Mixed` field (Country.ts:220) stays but is ignored.

### 4.3 Template presets (seed content source) — `src/components/section-library/presets/`

> **Built as dict-parameterized builders (Step 6, amendment):** the plan below originally
> showed slug-keyed `Record<string, SectionInstance[]>` presets, but a template needs the
> **dictionary** for headings/labels (and per-locale templates need the *per-locale* dict).
> Actual signatures: `buildCountryTemplate(countrySlug, dict)`,
> `buildCityTemplate(countrySlug, citySlug, dict)`, `buildRouteTemplate(countrySlug, dict)`
> — each returns `SectionInstance[]` with `order` assigned. Shared helpers live in
> `presets/common.ts` (`makeSection` = definition defaults with **content replaced
> wholesale** so services sample copy never leaks; slug↔data-key alias maps;
> `normalizeCityImageMap`). All dictionary strings are stored **raw with tokens**
> (`{country}`/`{city}`/`{from}`/`{to}`/`{distance}`/`{duration}`/`{location}`/`{lang}`)
> and resolved at render time (`placeholders.ts`).

Four files, every string/image/icon ported from current hardcoded sources:

**`presets/country-presets.ts`** — `buildCountryTemplate(countrySlug, dict)`
- Sources ported: `countryHeroImages` map (`CountryDetailClient.tsx:18-25`, re-keyed code→slug), `aboutContent.countryAbout` via `getCountryAbout` (**alias fix: `uae`→`united-arab-emirates`; orphan `germany` never hit**), `countries.detail.*` dict keys (heroTitle/aboutEyebrow/intro/subIntro/rangeHeading/citiesHeading/faqTitle/interCityRoutesHeading), `countries.breadcrumb.*`
- Section order: `hero`(with-inquiry-form) → **`breadcrumb`** → `serviceCards`(source `context.services`) → `mediaContent`(about, media right, bg = hero image) → `introText` (3 dict paragraphs) → `citiesGrid`(context) → `faq`(source `context.faqs`, theme darker)

**`presets/city-presets.ts`** — `buildCityTemplate(countrySlug, citySlug, dict)`
- Generic fallback builder covers all 41 cities (C2) — one builder, not a preset map
- Sources ported: `cityHeroImages` (22 city keys, re-keyed `kuwait`→`kuwait-city`), `sectionImages` (3 local paths), `aboutContent.cityAbout` via `getCityAbout` (runtime slugs, direct hits), `cityContent.*` (**dead-key fix C3**: lookups now alias-normalized — `uae`→`united-arab-emirates`, `kuwait-city`→`kuwait` — so JSON content that today's `cityContent[country.slug][city.slug]` misses actually renders), `cityTaxiTitle.taxiAlternative`, hardcoded English fallbacks (CityDetailClient.tsx:87-94, stored with `{city}` token), `detail.interCityRoutesHeading`/`faqTitle`/`aboutEyebrow`
- Section order: `hero` → `breadcrumb` → `serviceCards`(context) → `mediaContent`(about, media right, bg = city hero) → `mediaContent`(gettingAround, media left) → `mediaContent`(limousineService, media right) → `mediaContent`(airportTransfer, media left) → `airportsGrid`(context, heading `""` — **now a full-width section below the airport block instead of embedded in its text column**, see deviations) → `routesGrid`(context, self-hides when routes empty) → `faq`(context)

**`presets/route-presets.ts`** — `buildRouteTemplate(countrySlug, dict)`
- Sources ported: `cityImages` map + `fallbackImage` (route page.tsx:57-80, re-keyed `kuwait`→`kuwait-city`), `cityToCity.subtitle`, `cityToCity.routePage.*` dict keys, `cityToCity.faq.title` + `faq.items` (8 shared Q&As), `cityToCity.cta.desc`/`bookNow`, hardcoded unsplash image (whyChoose block, line 274)
- Hero + `cityVisuals` + aboutRoute store **slug→URL image maps** (`content.images`, normalized runtime slugs) — hero resolves against `fromCity.slug` with `appearance.background` = fallback URL; aboutRoute resolves against `toCity.slug` in `MediaContentSection` (context-aware); unresolved slugs fall back to `CityVisualsSection.FALLBACK_IMAGE`
- **Route FAQ = `source: "inline"`** (port the 8 dict items) — NOT `context.faqs`: location context has no route-level faqs (`FAQSection` context branch reads `country/city.faqs` only)
- Dynamic values ({from}/{to}/distance/duration) resolved at render from context, NOT stored in template
- Section order: `hero`(with-inquiry-form) → `breadcrumb` → `routeStats` (Map/Clock/Shield icons; pricing card value = `fixedPricing`, label = `pricing`) → `cityVisuals` → `mediaContent`(whyChoose, media right, theme darker) → `mediaContent`(aboutRoute, media left, description = `aboutRouteDesc1` + `" "` + `aboutRouteDesc2` — two `<p>`s become one) → `faq`(inline, theme dark — page bg, not darker) → `ctaBanner` (theme darker, button style `primary`)

**Deviation vs today recorded at Step 6 (accepted):**
- `breadcrumb` added to country/city orders (original §4.3 omitted it, but the breadcrumb definition includes country/city scopes and current pages render it)
- Airport grid split out of the airport-transfer text column into its own `airportsGrid` section (full-width; grid heading stays `""`)
- Route CTA button: shared `CTABannerSection` has no white-pill style → `primary` (blue)
- Shared components bring services styling: `mediaContent` renders its browser-window chrome + blue boxed item icons + non-serif headings (today's location pages use plain images / green checks / serif headings); FAQ item cards use `abDarkGray` styling
- Token resolution localizes `{country}`/`{city}` via `nameAr` on `/ar` (today heroes/breadcrumbs interpolate the English `name`); en parity unchanged
- Spacing approximations where PADDING_CLASSES has no exact match (today's `py-18`/`py-20` map to `md`/`lg`)
- Dead fields never stored: `routeStats.content.heading`, `breadcrumb.content.cityToCityLabel`, `cityVisuals.content.heading` (components ignore them; editor doesn't render them)
- `serviceCards` empty-state: today shows hardcoded fallback feature cards when the entity has no services; the shared component renders an empty grid instead (entity pages always have services in practice)

### 4.4 Zod — `src/lib/validations/location.ts`

- `LocationPageTemplateCreateSchema` / `LocationPageTemplateUpdateSchema`: `{ pageType: enum, refKey: string, lang: string (default "en-US"), template: SectionInstance[], status }` (uses `SectionInstanceSchema` from library)
- `CountryUpdateSchema` (currently missing — PUT does zero validation)
- No changes to `CountryCreateSchema`/`CitySchema` needed (templates no longer live on entities) — legacy `sections` field left ignored

### 4.5 API

**New `src/app/api/location-templates/route.ts`** (GET list / POST create) + **`src/app/api/location-templates/[id]/route.ts`** (GET / PUT / DELETE):
- Auth via `authorizeApi`
- zod validate with `LocationPageTemplateCreateSchema`
- Unique `(pageType, refKey, lang)` conflict check (GET list filters on `pageType`/`refKey`/optional `lang`)
- **Raw-driver `$set` for `template`** (Mongoose Mixed silently drops complex nested arrays on `$set` — same bug services hit; mirror `api/services/[id]/route.ts:75-88`)

**Existing `api/locations/route.ts` (POST)**: fix `cityDocs` mapper drop bug (line 74-94 never copies `sections`) — minimal fix `sections: c.sections ?? []` for safety (ignored anyway). No template fields here.

**Existing `api/locations/[id]/route.ts` (PUT)**: add `CountryUpdateSchema` validation (currently zero validation). No template fields.

**Route APIs** (`api/locations/routes/*`): unchanged.

### 4.6 Data helpers — `src/lib/location-template.ts`

- **No** `template`/`routePageTemplate` added to `City`/`Country` client interfaces or `mapCity`/`toCountryShape` (templates fetched separately)
- New resolvers (all **`lang`-aware**, per-locale docs):
  - `getCountryTemplate(countrySlug, lang): Promise<SectionInstance[]>` — DB lookup exact `lang` → DB lookup `en-US` → fallback `buildCountryTemplate(countrySlug, enUSDict)`
  - `getCityTemplate(countrySlug, citySlug, lang): Promise<SectionInstance[]>` — same fallback chain
  - `getRouteTemplate(countrySlug, lang): Promise<SectionInstance[]>` — same fallback chain
  - `resolvePlaceholders(str, ctx)` helper for `{country}`/`{city}`/`{from}`/`{to}`/`{distance}` (already centralized — `src/components/section-library/placeholders.ts` `buildTokenMap`/`resolveSectionPlaceholders` used by `SectionRenderer`)

### 4.7 Frontend rendering

**`[country]/page.tsx`**: fetch `getCountryTemplate(country.slug, lang)`, build `SectionRenderContext` (kind: "location"), pass `template` + `context` to `CountryDetailClient`.

**`[country]/[city]/page.tsx`**: fetch `getCityTemplate(country.slug, city.slug, lang)`, context includes `routes` (already fetched line 50), pass through.

**`[country]/[city]/routes/[route]/page.tsx`**: after resolving `from`/`to` + `routeInfo`, fetch `getRouteTemplate(country.slug, lang)`, build context with `fromCity/toCity/route/dict/lang` (`distance: routeInfo?.distance ?? ""` — `rp.contactUs` fallback in the old code was an undefined key). Refactor inline server JSX into a `RouteDetailClient` client component that uses `SectionRenderer`.

**`CountryDetailClient.tsx` / `CityDetailClient.tsx`**: accept `template` + `context` props; render `<SectionRenderer sections={template} context={context} />`. **Delete hardcoded JSX entirely** (clean break — seed guarantees DB coverage). Delete `cityHeroImages`/`countryHeroImages`/`sectionImages`/`aboutContent` imports once presets are wired.

### 4.8 Seed script — `scripts/seed-location-templates.js`

Idempotent, one-pass, mirrors `scripts/seed-routes.js` pattern. Reads **all existing published Country docs from DB** (not a hardcoded list — covers whatever cities actually exist), and for each **locale in `["en-US","en-GB","ar"]`** (loads dict per locale, passes it to the builders):

1. `buildCountryTemplate(country.slug, dict)` → upsert `{ pageType:"country", refKey: country.slug, lang }`
2. For **each city subdoc** in `country.cities`: `buildCityTemplate(country.slug, city.slug, dict)` → upsert `{ pageType:"city", refKey: `${country.slug}/${city.slug}`, lang }`
3. `buildRouteTemplate(country.slug, dict)` → upsert `{ pageType:"route", refKey: country.slug, lang }`

Uses `bulkWrite` with `updateOne` + `upsert: true`, raw-driver-safe. Imports preset builders + `getDictionary` (run via `tsx scripts/seed-location-templates.js`). Logs counts per pageType. **Coverage target: whatever the DB holds — as seeded 2026-10-16: 46 templates per locale × 3 locales = 138 docs** (7 country + 32 city + 7 route per locale; C13), every field ported — hero images, about title+description, all intro paragraphs, gettingAround/limousine/airportTransfer title+description+image, FAQ headings (entity FAQs use `source:"context.faqs"` — live from entity `faqs`, no duplication; route FAQs inline the 8 dict items), route stats labels, whyChoose features, cta labels, breadcrumbs — nothing left hardcoded. Idempotent: `updateOne` with upsert keyed on `pageType+refKey+lang`; **first run populates, later runs skip operator-edited docs** (verified: second run reports `created 0`, all docs untouched).

### 4.9 Dashboard editor

**`SectionLibraryEditor`** (from §3.7) mounted with `scope="country" | "city" | "route"` in location cards.

**`location-editor.tsx`** changes:
- Add **Country Template card** (near top): fetch existing template via `GET /api/location-templates?pageType=country&refKey={slug}` (or lazy-load on expand), edit via `SectionLibraryEditor scope="country"`, save via `POST/PUT /api/location-templates`
- Add **City Template editor** inside each expanded city accordion — same pattern, scoped to `{countrySlug}/{citySlug}`, `scope="city"`
- Add **Route Page Template card**: scoped to `{countrySlug}`, `scope="route"`
- **Remove** the `CitySectionEditor` mount (lines 892-898) + `updateCitySections` + `sections` field from `CityRecord` type + `blankCity()` — legacy hidden entirely per decision #3
- `CountryRecord` type: no `template`/`routePageTemplate` field needed (templates fetched/saved via separate API, not part of country PUT payload). Editor holds template state locally per card, saves independently.

**`route-editor.tsx`**: unchanged.

**Implementation notes (as built, Step 10):**
- All three cards share one reusable component `src/components/admin/location-template-editor-card.tsx` (language selector en-US/en-GB/ar, lazy GET with 500ms refKey debounce, "Create from default"/"Load default" button invoking the preset builders with the dynamic per-lang dictionary import, Save → PUT `{template}` or POST full key; save disabled for empty unsaved templates).
- Template state is local to each card (never part of the country PUT payload), per §4.9. Cards render only for saved entities: country/route cards behind `isEdit && form.slug`, city card behind `city._id && city.slug` (new cities auto-slug per keystroke — would otherwise refetch per character).

---

## 5. Effort Estimate

### Global Section Library (infrastructure + merged catalog + editor refactor)

| Work item | Est. |
|---|---|
| Library types + catalog consolidation (merge services defs, add scopes, zod schemas) | 3–4h |
| Zustand store + selectors | 1–2h |
| Unified registry + location-facing `SectionRenderer` | 2–3h |
| Extend 5 shared components (hero inquiry variant, faq/serviceCards context source) | 3–4h |
| Refactor `ServiceSectionEditor` → `SectionLibraryEditor` (scope prop, store-driven) | 3–4h |
| Presets reorganization (scopes on existing + new location presets) | 2–3h |
| **Subtotal (library infra)** | **~14–20h** |

### Location Page Templating (on top of library)

| Work item | Est. |
|---|---|
| 7 location-only section components | 5–8h *(relocated from library budget in some framings — counted once)* |
| `LocationPageTemplate` model + zod + resolvers | 2–3h |
| Template CRUD API (+ raw-driver bypass) | 2.5–3.5h |
| Seed script (all countries/cities/routes, every field) | 4–6h |
| Frontend rendering (3 pages + client components) | 4–7h |
| Mount editor cards in `location-editor.tsx` + verification | 2–3h |
| **Subtotal (locations)** | **~20–30h** |

### Combined total: **~35–50h** (multi-day)

This roughly *replaces* the "separate LocationSection system" line from earlier estimates rather than adding to it — one system, not two.

---

## 6. Execution Order (build in progress)

1. Library types + `SectionInstanceSchema` + catalog definitions (merge services, add scopes, zod schemas) ✅
2. Zustand store (`useSectionLibraryStore`) ✅
3. Unified registry + extend the 5 shared components (hero/faq/serviceCards/ctaBanner/mediaContent) ✅
4. Refactor `ServiceSectionEditor` → `SectionLibraryEditor` with `scope` prop; verify services pages + editor unchanged (regression check) ✅ (`src/components/admin/section-library-editor.tsx`; consumers `service-editor.tsx` + `post-editor.tsx` updated; `npx tsc --noEmit` clean)
5. Build 7 location-only section components ✅
6. Location presets (country/city/route defaults) ✅ (`presets/common.ts` + `country-presets.ts` + `city-presets.ts` + `route-presets.ts`, dict-parameterized per §4.3 amendment)
7. `LocationPageTemplate` model + zod + CRUD API ✅ (`src/lib/models/LocationPageTemplate.ts`, `CountryUpdateSchema`/`LocationPageTemplate*Schema`, `api/location-templates/*`, locations POST `sections` fix + PUT validation, resolvers `src/lib/location-template.ts`)
8. Seed script + run against DB, verify **138 templates** (46 × 3 locales: 7 country + 32 city + 7 route per locale — C13) created with full field coverage ✅ (idempotent re-run verified: `created 0`)
9. Server pages pass template/context; client components switch to `SectionRenderer` (delete hardcoded JSX) ✅ (3 client files → thin wrappers + new `RouteDetailClient`; country page FAQPage JSON-LD moved server-side to `FAQJsonLd`; route page keeps JSON-LD + data resolution, ~240 lines of inline JSX deleted; `buildTokenMap` sets distance/duration whenever `route` is present so empty fallbacks resolve to "")
10. Mount editor cards in `location-editor.tsx` (remove legacy CitySectionEditor) ✅ (new reusable `location-template-editor-card.tsx`: per-language load/save, 500ms refKey debounce, "Create from default" via builders; country+route cards above the form grid — shown only when `isEdit && form.slug`; city card inside accordion — only when `city._id && city.slug`; `city-section-editor.tsx` deleted, `CityRecord.sections` + `updateCitySections` + Summary row removed)
11. Verify ✅ — `tsc --noEmit` clean; `next build` exit 0 (TS included); `eslint .` = 51 errors **all in pre-existing untouched files, 0 in feature files** (5 fixed in `section-library-editor.tsx`: memo deps + 4 unescaped quotes); pages: `/en-US/locations/uae`, `…/dubai`, `…/ras-al-khaimah`, `…/dubai/routes/dubai-to-abu-dhabi` + `/ar` variants all 200 with **zero visible raw tokens**, headings matching old structure, hero images, route stats (`140 km`/`1h 30m`), FAQPage JSON-LD on all three; service pages + home (`/en-US`, `/en-US/services`, `/en-US/services/airport-transfers`) 200 with correct h1s (shared-component regression gate); API round-trip with admin session: GET → PUT flip → persisted → PUT restore **byte-identical**, POST dup → 409, POST create → 201 → DELETE → 200. *Caveat: dashboard card click-through not browser-tested (no browser tooling; the edit page is client-rendered) — card logic mirrors the curl-verified API flow; SSR/build/tsc validate wiring.*

---

## 7. Decisions Log

| # | Decision | Status |
|---|---|---|
| 1 | Location templates in **separate collection** `locationPageTemplates` (not embedded on country/city schema) | ✅ Confirmed |
| 2 | Route templates **per-country scope** via `refKey = countrySlug` | ✅ Confirmed |
| 3 | Legacy `city.sections` **hidden entirely** (no editor, no render, no migration) | ✅ Confirmed |
| 4 | Seed **every published country + city + route template in one pass** (DB-driven, not a hardcoded list), every field ported — as seeded: **7 countries + 32 cities + 7 route templates × 3 locales = 138 docs** (C13) | ✅ Confirmed (numbers corrected by C13) |
| 5 | Global **Section Library** as unified foundation (zustand + zod + TypeScript) | ✅ Confirmed |
| 6 | Naming: **"Section Library"** | ✅ Resolved by recommendation (user may rename later) |
| 7 | Custom user-creatable presets (DB `sectionPresets`) | ✅ Fast-follow (not in this build — §3.11) |
| 8 | `hero` merged into one type with `with-inquiry-form` variant (services data untouched) | ✅ Resolved by recommendation |
| 9 | **Per-locale template docs** — `lang` field, unique `(pageType, refKey, lang)`, dict-parameterized builders, resolver falls back exact-lang → `en-US` → builder | ✅ Build-time decision (Step 6) |
| 10 | **Alias dead-data fix** — `cityContent`/`countryAbout` lookups normalized via alias maps, so JSON copy that today's broken slug lookups miss is actually rendered | ✅ Build-time decision (Step 6) |
| 11 | **Route FAQ inline** (`source:"inline"`, 8 dict items) — `context.faqs` has no route-level source | ✅ Build-time decision (Step 6) |
| 12 | **Dynamic images as slug→URL maps** — `hero.content.images` (from-city) + `cityVisuals.content.images` + aboutRoute `mediaContent.content.images` (to-city), resolved at render with static fallbacks | ✅ Build-time decision (Step 6) |
| 13 | **Editor presets scope-aware** — location scopes default to *no* presets (callers pass location presets or none) so service templates can never be applied to location pages | ✅ Build-time decision (Step 6) |
| 14 | Deviations vs today's hardcoded pages accepted (§4.3 list: airports grid split, CTA blue button, shared-component styling, `/ar` nameAr tokens, spacing approximations) | ✅ Build-time decisions (Step 6) |
| 15 | **Context-bound FAQ sections render template extras** — `source:"context.faqs"` sections show live entity FAQs first, then `content.items` appended (previously items were silently ignored); the editor's Items tab previews the live FAQs read-only (count + questions, passed from the location form) and says where to edit them | ✅ Post-launch fix (user report: added FAQ items never rendered + editor looked empty) |

---

## 8. Related Files (current codebase)

### Services (existing, to be generalized)
- `src/components/services/sections/section-types.ts` — `PageSection`, `SectionType`, `SECTION_TYPES` config
- `src/components/services/sections/registry.ts` — `SECTION_REGISTRY`
- `src/components/services/sections/page-renderer.tsx` — `PageRenderer`
- `src/components/services/sections/hero-section.tsx`, `faq-section.tsx`, `cta-banner-section.tsx`, `media-content-section.tsx`, `service-cards-section.tsx`, `marquee-section.tsx`, `text-media-grid-section.tsx`, `fleet-grid-section.tsx`, `contact-form-section.tsx`, `section-icons.tsx`
- `src/components/services/Templates/Services/section-defaults.ts` — `TEMPLATE_PRESETS`, `migrateFlatServiceToSections`
- `src/components/services/Templates/City/city-section-defaults.ts` — `CITY_TEMPLATE_PRESETS`
- `src/components/admin/service-section-editor.tsx` — 1894-line reusable editor (to become `SectionLibraryEditor`; also mounted by `post-editor.tsx` lines 466-475 — must stay working per C6)
- `src/components/admin/section-editor.tsx` — 1261-line second editor (article "sections" mode; out of scope, stays as-is)
- `src/components/admin/service-editor.tsx` — mounts section editor (line **368**, `TabsContent value="sections"`)
- `src/lib/validations/service.ts` — `PageSectionSchema` (46-56), `ServiceCreateSchema` (**line 58**), `pageSections` field (79)
- `src/lib/models/Service.ts` — `pageSectionSchema` (8-21), `pageSections: Mixed` (107)
- `src/lib/services.ts` — `resolveServicePage` (570-642)

### Locations (existing, to be templated)
- `src/lib/models/Country.ts` — `countrySchema` (226-240), `citySchema` (208-224, `sections: Mixed` at 220)
- `src/lib/models/Route.ts` — `routeSchema` (3-15), `LocationRoute` model
- `src/lib/validations/location.ts` — zod schemas, `TextImageSectionSchema` (87-171), `CountryCreateSchema`, `RouteCreateSchema` (317-326)
- `src/lib/locationData.ts` — `mapCity` (36-53), `toCountryShape` (55-69), `getRoutesForCity` (254-278), `findRouteData` (281-287), `getCountryForRequest` (205), `getCityForRequest` (211)
- `src/lib/locations.ts` — `City`/`Country`/`CityRoute` client types, `CITY_ROUTES` (223-276), URL helpers (341-373)
- `src/app/[lang]/locations/[country]/page.tsx` — country page: template + context + server-side FAQJsonLd
- `src/app/[lang]/locations/[country]/[city]/page.tsx` — city page: template + context, legacy `sections` fetch removed
- `src/app/[lang]/locations/[country]/[city]/routes/[route]/page.tsx` — route page: data resolution + JSON-LD kept, JSX replaced by `RouteDetailClient`
- `src/app/[lang]/locations/_components/CountryDetailClient.tsx` / `CityDetailClient.tsx` / `RouteDetailClient.tsx` — thin wrappers rendering `SectionRenderer`
- `src/app/[lang]/locations/_components/aboutContent.ts` — 228 lines, **38** hardcoded records (7 country incl. orphan `germany` + **31** city)
- `src/app/[lang]/locations/_components/HeroInquiryForm.tsx` — inquiry form used in heroes
- `src/app/[lang]/locations/_components/ShowMoreGrid.tsx` — expandable grid used by cities/airports/routes grids
- `src/app/api/locations/route.ts` — POST (cityDocs mapper drops sections at 74-94)
- `src/app/api/locations/[id]/route.ts` — PUT (no zod validation, whitelist at 85-100)
- `src/app/api/locations/routes/route.ts` + `[id]/route.ts` — route CRUD
- `src/components/admin/location-editor.tsx` — Page Templates card (country+route) + per-city template cards; legacy CitySectionEditor mount removed
- `src/components/admin/city-section-editor.tsx` — **deleted** (legacy TextImageSection editor removed with decision #3)
- `src/app/[lang]/dictionaries/en-US.json` — `countries.detail.*` (1972-1990), `cityContent.*` (2304-2625), `cityTaxiTitle` (2640-2642), `cityFeatures` (2626-2639), `cityToCity.*` (481-599, `routePage.*` 576-598), `press.showMore/showLess` (1850-1851) — parallel keys exist in `ar.json` and `en-GB.json` (**3 locales**; this plan adds no new keys — see C4)

### Planned new files
- `src/components/section-library/types.ts` — `SectionScope`, `SectionInstance`, `SectionDefinition`
- `src/components/section-library/definitions/` — one file per section type (16 types)
- `src/components/section-library/registry.tsx` — `SECTION_LIBRARY_REGISTRY`, `SectionRenderContext`
- `src/components/section-library/page-renderer.tsx` — location-facing `SectionRenderer`
- `src/components/section-library/presets/` — country/city/route template presets
- `src/components/section-library/section-icons.tsx`
- `src/stores/section-library-store.ts` — `useSectionLibraryStore`
- `src/components/admin/section-library-editor.tsx` — refactored from `service-section-editor.tsx`
- `src/lib/models/LocationPageTemplate.ts` — new collection model
- `src/lib/location-template.ts` — template resolvers + placeholder helper
- `src/app/api/location-templates/route.ts` + `[id]/route.ts`
- `src/components/admin/location-template-editor-card.tsx` — reusable per-language template card
- `scripts/seed-location-templates.js`

---

## 9. Verification checklist (post-build)

- [x] `npx tsc --noEmit` — clean
- [x] `npx eslint` — **0 errors in all feature files** (full run: 51 errors, all pre-existing untouched files — `use-mobile`, `section-editor`, seed scripts, auth, chat, etc.; 5 fixed in `section-library-editor.tsx` during this build)
- [x] Services pages + editor regression: `/en-US`, `/en-US/services`, `/en-US/services/airport-transfers` all 200 with correct h1s and zero visible raw tokens after the shared hero/faq/mediaContent edits (editor compile covered by tsc/build)
- [x] Country page renders from DB template (no hardcoded JSX) — `/en-US/locations/uae` + `/ar/locations/uae` 200, zero visible tokens, headings = hero → about → cities (6, DB truth) → FAQ, FAQPage JSON-LD present
- [x] City pages `/en-US/locations/uae/dubai` + `…/ras-al-khaimah` + `/ar` render from DB templates (200, `cityContent` JSON headings e.g. "Getting Around Dubai" visible)
- [x] Route page `…/dubai/routes/dubai-to-abu-dhabi` renders per-country route template with dynamic context (h1 "Dubai → Abu Dhabi", stats "140 km"/"1h 30m", Arabic CTA on `/ar`)
- [x] Arabic variants `/ar/locations/uae[/dubai[/routes/…]]` render correctly (200, zero raw tokens, ~240-550 Arabic words per page; Latin entity names on `/ar` hero = missing `nameAr` in DB, identical to today's behavior)
- [x] Dashboard: template cards load/save round-trip verified at the API level with an admin session (GET → PUT flip → persisted → PUT restore byte-identical; POST dup 409; POST 201 → DELETE 200). Browser click-through not run (no browser tooling; edit page is client-rendered) — card code paths mirror the curl-verified flows
- [x] Legacy `CitySectionEditor` removed (file deleted); `city.sections` ignored everywhere (city page no longer fetches it, Summary row gone, POST mapper stores `?? []`)
- [x] Seed script idempotent; re-run doesn't duplicate; counts logged per pageType (**138 docs total: 46 per locale × 3 — actual DB counts, C13**)
- [x] `/en-US/locations/uae/dubai` gettingAround/limousine/airportTransfer copy reflects `cityContent` JSON where it exists ("Getting Around Dubai" visible); fallback cities keep ported defaults (builder alias maps C14)
- [ ] `post-editor.tsx` city-type articles still edit/render (C6) — compile-level verified (tsc + build green, usage unchanged since Step 4); manual browser pass still open
- [x] Country page about copy resolves correctly after slug normalization (C3/C14) — "Chauffeur Excellence Across the Emirates" renders for DB slug `united-arab-emirates`, no generic fallback

**Build = complete** (Steps 1–11 done; production `next build` exits 0).
