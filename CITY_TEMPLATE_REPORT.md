# City Service Page Template — Technical Report

> **Date:** 2026-09-11
> **Status:** Complete — TypeScript compiles clean, all sections functional
> **Source HTML:** `riyadh_corporate_mobility (1).html` → converted to editable PageSection system

---

## 1. Overview

A full-featured city service page template that converts a static HTML prototype (Riyadh Corporate Mobility) into a fully editable, dashboard-driven page using the same `PageSection` rendering pipeline as service pages. The template is a 1:1 replica of the original HTML with all styling, animations, and content editable from the admin dashboard.

### Key Design Decision

The project has **two separate section rendering systems**:

| System | Types | Storage | Used By |
|--------|-------|---------|---------|
| **PageSection** | `hero`, `marquee`, `serviceCards`, `mediaContent`, `fleetGrid`, `contactForm`, `faq`, `ctaBanner` | Article model `sections` field (Mixed) | Service pages, **City pages** |
| **Blog Sections** | `TextImageSectionType`, `CardsSectionType` | Same field, different shape | Blog articles |

City pages use the **PageSection** system, rendered by `PageRenderer`, NOT `BlogArticleLayout`.

---

## 2. File Structure

```
src/
├── components/services/
│   ├── Templates/City/
│   │   ├── index.ts                          # Barrel export
│   │   └── city-section-defaults.ts          # Template presets (15 sections)
│   ├── sections/
│   │   ├── section-types.ts                  # Type definitions + SECTION_TYPES config
│   │   ├── registry.ts                       # Component registry
│   │   ├── page-renderer.tsx                 # Main renderer (dispatches to section components)
│   │   ├── marquee-section.tsx               # NEW: Auto-scrolling ticker component
│   │   ├── hero-section.tsx
│   │   ├── service-cards-section.tsx
│   │   ├── media-content-section.tsx
│   │   ├── fleet-grid-section.tsx
│   │   ├── contact-form-section.tsx
│   │   ├── faq-section.tsx
│   │   └── section-icons.tsx                 # getIcon() helper for Font Awesome
│   └── index.ts
├── components/admin/
│   ├── service-section-editor.tsx            # Section editor with presets support
│   └── post-editor.tsx                       # Uses CITY_TEMPLATE_PRESETS for city posts
└── app/[lang]/services/[...slug]/
    ├── page.tsx                              # Catch-all route with PageSection detection
    └── CityPageRenderer.tsx                  # Client wrapper for PageRenderer
```

---

## 3. Section Breakdown (15 Sections)

| Order | Type | Variant | Title / Purpose | Theme |
|-------|------|---------|-----------------|-------|
| 0 | `hero` | `background-content` | "Mastering Mobility in Riyadh." — Full-viewport hero with background image, CTA buttons | darker |
| 1 | `marquee` | `default` | Auto-scrolling client ticker (KAFD, RUH, Riyadh Season, DQ, Diriyah Gate) | darker |
| 2 | `serviceCards` | `3-column` | "Engineered for Riyadh's Infrastructure" — 3 service cards (Airport, KAFD/DQ, Events) | dark |
| 3 | `mediaContent` | `media-right` | "Powering Riyadh's Vision 2030 Corporate Ecosystem" — Infrastructure alignment | darker |
| 4 | `mediaContent` | `media-left` | "Orchestrating Mega-Events: FII & Riyadh Season" — Event logistics | dark |
| 5 | `mediaContent` | `media-right` | "RUH Aviation: Tarmac to Boardroom" — Airport operations | darker |
| 6 | `mediaContent` | `media-left` | "Financial Roadshows & As-Directed Mobility" — Corporate agility | darker |
| 7 | `mediaContent` | `media-right` | "Logistics for Diriyah Gate & Mega-Projects" — PIF infrastructure | dark |
| 8 | `mediaContent` | `media-left` | "Royal Protocol & Diplomatic Missions" — DQ security access | darker |
| 9 | `mediaContent` | `media-right` | "Elite Vetting & TGA Compliance" — Chauffeur standards | dark |
| 10 | `mediaContent` | `media-left` | "Intercity Transfers & GCC Connectivity" — National network | darker |
| 11 | `mediaContent` | `media-right` | "Monitoring Riyadh Traffic in Real-Time" — Transport control room | darker |
| 12 | `mediaContent` | `media-left` | "Security & Compliance in the Capital" — Duty of care (3 feature items) | dark |
| 13 | `fleetGrid` | `4-column` | "Strictly Black. TGA Compliant." — 4 vehicles (S-Class, Escalade, V-Class, Sprinter) | darker |
| 14 | `contactForm` | `corporate` | "Open a RUH Corporate Account" — Lead capture form | dark |
| 15 | `faq` | `default` | "Frequently Asked Questions" — 4 Q&As about RUH, DQ, KAFD, As-Directed | darker |

---

## 4. Type System

### SectionType Union

```typescript
export type SectionType =
  | "hero"
  | "marquee"       // ← NEW
  | "serviceCards"
  | "mediaContent"
  | "fleetGrid"
  | "contactForm"
  | "faq"
  | "ctaBanner";
```

### PageSection Interface

```typescript
export interface PageSection {
  id: string;
  type: SectionType;
  variant: SectionVariant;
  order: number;
  enabled: boolean;
  content: Record<string, unknown>;   // Type-specific content
  items: Record<string, unknown>[];   // Type-specific items
  settings: Record<string, unknown>;  // Type-specific settings
  appearance: Record<string, unknown>; // Theme, padding, background, etc.
}
```

### Marquee-Specific Types

```typescript
export interface MarqueeItem {
  id: string;
  icon: string;    // Font Awesome icon name
  label: string;   // Display text
}

export interface MarqueeContent {
  items: MarqueeItem[];
}

export interface MarqueeSettings {
  speed?: "slow" | "normal" | "fast";   // 35s / 25s / 15s cycle
  opacity?: number;                       // 0-100 percentage
}

export interface MarqueeAppearance extends SectionAppearanceBase {
  theme?: "dark" | "darker";
}
```

---

## 5. Component Architecture

### CityPageRenderer (`CityPageRenderer.tsx`)

Thin client wrapper that provides the dark background and delegates to `PageRenderer`:

```tsx
export default function CityPageRenderer({ sections, serviceName, serviceUrl }) {
  return (
    <main className="min-h-screen bg-[#050505] text-white antialiased">
      <PageRenderer sections={sections} serviceName={serviceName} serviceUrl={serviceUrl} />
    </main>
  );
}
```

### MarqueeSection (`marquee-section.tsx`)

- Duplicates items array for seamless infinite scroll
- Uses CSS `marquee` animation (defined in `globals.css`)
- Configurable speed (slow/normal/fast) and opacity (0-100%)
- Edge fade gradient via absolute-positioned overlays
- Renders nothing if items array is empty

### Section Registry (`registry.ts`)

Maps `SectionType` → React component:

```typescript
const SECTION_REGISTRY = {
  hero: HeroSection,
  marquee: MarqueeSection,        // ← NEW
  serviceCards: ServiceCardsSection,
  fleetGrid: FleetGridSection,
  mediaContent: MediaContentSection,
  contactForm: ContactFormSection,
  faq: FAQSection,
  ctaBanner: CTABannerSection,
};
```

---

## 6. Catch-All Route Detection

`src/app/[lang]/services/[...slug]/page.tsx` detects PageSection-based city articles:

```typescript
function isPageSectionArray(sections: unknown[]): boolean {
  if (!sections || sections.length === 0) return false;
  const first = sections[0] as Record<string, unknown>;
  return (
    typeof first === "object" &&
    first !== null &&
    "type" in first &&
    "variant" in first &&
    "order" in first &&
    "enabled" in first
  );
}
```

If `isPageSectionArray()` returns true for a city article, it renders via `CityPageRenderer` instead of `BlogArticleLayout`.

---

## 7. Dashboard Integration

### Post Editor (`post-editor.tsx`)

- When `blogType === "city"`, the editor uses `ServiceSectionEditor` with `presets={CITY_TEMPLATE_PRESETS}`
- Selecting a preset populates `sections` and sets `contentMode: "page-sections"`
- WYSIWYG/Sections toggle is hidden for city posts (they always use PageSections)

### Service Section Editor (`service-section-editor.tsx`)

- Accepts optional `presets` prop (defaults to `TEMPLATE_PRESETS` from service templates)
- Content tab renders type-specific editors for each section type
- Marquee editor provides: speed selector, opacity input, and item list editor (icon + label per item)
- Appearance tab handles theme, padding, background image, border, text alignment

### Available Presets

```typescript
export const CITY_TEMPLATE_PRESETS: CityTemplatePreset[] = [
  corporateCityTemplate,  // 15-section full corporate page
  blankCityTemplate,      // Hero-only starter
];
```

---

## 8. Styling Details

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `abBlack` | `#0a0a0a` | Marquee background, darker theme |
| `abDarkGray` | `#18181b` | Dark theme sections |
| `abGold` | `#c5a059` | Accent buttons, highlights |
| `bg-abDarkGray` | Tailwind class | Section backgrounds |

### Marquee Animation

Defined in `globals.css`:

```css
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.animate-marquee {
  animation: marquee 20s linear infinite;
}
```

Speed variants applied via inline `animation` style:
- Slow: `35s`
- Normal: `25s`
- Fast: `15s`

### Icons

All icons use Font Awesome 6.4.0 loaded via CDN in root layout. The `getIcon()` helper in `section-icons.tsx` maps icon names to `<i className="fas fa-{name}">` elements.

---

## 9. Template Presets

### Corporate City Template (`corporateCityTemplate`)

Full 15-section corporate city page with:
- Hero with Riyadh skyline background
- Marquee ticker with 5 client categories
- 3-column service cards (Airport, KAFD/DQ, Events)
- 10 alternating media content sections
- 4-column fleet grid (S-Class, Escalade, V-Class, Sprinter)
- Contact form for corporate account setup
- FAQ with 4 questions

### Blank City Template (`blankCityTemplate`)

Minimal starter with only:
- Hero section (generic "City Service" title)
- No other sections

---

## 10. Data Flow

```
Dashboard (post-editor.tsx)
  ↓ selects preset from CITY_TEMPLATE_PRESETS
  ↓ populates sections[] + sets contentMode: "page-sections"
  ↓ saves to MongoDB (Article model, sections field = Mixed)
  
Catch-all Route (page.tsx)
  ↓ fetches article from MongoDB
  ↓ detects isPageSectionArray(sections)
  ↓ renders CityPageRenderer → PageRenderer → individual section components
  
Frontend (city page)
  ↓ each section renders with its own styling via appearance.theme
  ↓ marquee animates via CSS keyframes
  ↓ all content fully editable from dashboard
```

---

## 11. What's Editable in Dashboard

Every section's content, items, settings, and appearance can be edited:

| Section | Content Fields | Items | Settings | Appearance |
|---------|---------------|-------|----------|------------|
| Hero | eyebrow, title, titleHighlight, description | CTA buttons | minHeight, overlayOpacity, contentPosition, buttonLayout | theme, background, overlayGradient |
| Marquee | — | icon + label per item | speed, opacity | theme |
| Service Cards | eyebrow, heading, description, sectionCta, bottomCta | cards (icon, title, description, actions) | columns, showHeader | theme, padding, border, textAlign |
| Media Content | eyebrow, heading, description | feature items | mediaPosition, containerWidth | theme, pattern, background, padding, border, textAlign |
| Fleet Grid | eyebrow, heading, description, headerAction, bottomCta | vehicles (badge, image, name, capacity, bags) | columns | theme, padding, border, textAlign |
| Contact Form | eyebrow, heading, description, icon, submitLabel, successTitle, successMessage | — | layout | theme, padding, border, textAlign |
| FAQ | eyebrow, heading, description | questions + answers | variant | theme, padding, border, textAlign |

---

## 12. TypeScript Status

```
npx tsc --noEmit → 0 errors
```

All types compile cleanly. The marquee type is fully integrated into the type system with no `any` leaks in the editor.
