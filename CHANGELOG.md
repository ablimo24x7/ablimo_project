# Change Log — Oct 15–20, 2026

All changes made on **ablimo** over the last 5 days (Oct 15 → Oct 20, 2026).
Oct 18: no changes. Day attribution for Oct 15–17 comes from file modification
timestamps (no git history); Oct 19–20 are documented from session records.

---

## Oct 15 — Analytics, Chat & Inquiry Forms

- **Analytics:** `src/lib/analytics.ts` + `src/components/analytics/analytics-listener.tsx` — event tracking layer added/wired up
- **Chat:** `ChatWidget.tsx` + `WhatsAppPopup.tsx` — chat widget & WhatsApp popup refinements
- **Forms:** `HeroInquiryForm` (locations hero) + `ServiceInquiryForm` — inquiry capture forms updated
- **Locations content:** `aboutContent.ts`, `ServicesTabs.tsx`, `TextImageSection.tsx` — city page text/tab sections

---

## Oct 16 — Section Library & Locations Backend (~39 files)

- **New `section-library` system:** registry, page-renderer, types, placeholders, `section-library-store`, definitions (location/service), components (airports-grid, cities-grid, routes-grid, route-stats, city-visuals, intro-text), presets (city/country/route/common)
- **Location templates backend:** `LocationPageTemplate` model, `/api/locations` + `/api/location-templates` CRUD routes, `src/lib/validations/location.ts`
- **Location detail pages:** `CityDetailClient`, `CountryDetailClient`, `RouteDetailClient`, `locations/[country]/page.tsx`
- **New services sections:** CTA banner, FAQ, media-content, service-cards
- **Plan doc written:** `PLAN-section-library-and-locations.md`

---

## Oct 17 — Full-Page SEO/Metadata Pass + Translate Fix (~90 files)

- **SEO metadata on every public page:** `generateSeoMetadata` (`src/lib/seo.ts`) rolled out across home, services, locations, fleet, industries, faqs, partners, press, business, career, corporations, sustainability + `dictionaries.ts`
- **Google Translate fix:** `GoogleTranslate.tsx` + new `src/lib/arabic-glossary.json` (machine-translation term protection)
- **Header/nav:** `Header`, `DesktopNav`, `MobileMenu`, `LanguageSwitcher` updates
- **Shared libs:** `locationData.ts`, `locations.ts`, `location-template.ts`, `fleet.ts`, `services.ts` + root `layout.tsx`
- **Dashboard locations:** country/city list & editor pages, `location-editor`, `location-cities-editor`, `service-editor`
- **Blog layout groundwork:** `BlogArticleLayout.tsx`; `package.json` updated

---

## Oct 19 (Today) — 3 Workstreams, All Verified ✅

### A. E-E-A-T business-details reconciliation

- Single source of truth for contact (`hello@ab.limo`, `+92 313 523 7377`), Riyadh HQ, social links in dictionaries
- Rolled into: about, contact, privacy-policy, terms, imprint, accessibility, faqs, `Footer`, `HeaderSocialLinks`, `StructuredData`, chat `channels.ts`

### B. City textMediaGrid localization

- `scripts/localize-city-textmediagrid.ts` + `src/lib/city-localization.ts` + `src/lib/arabic-glossary.ts` — city text sections localized for Arabic

### C. SEO indexation overhaul

- **`src/app/sitemap.ts` rewritten:**
  - `force-dynamic` (12.7 s per hit) → `revalidate = 900` (15-min ISR cache)
  - 950 verified URLs: all 52 city-to-city routes (both language orientations), 65 live service pages incl. dictionary-backed ones, `/blogs/*` paths
  - Real ISO-8601 `lastmod` only where a timestamp exists (12 invalid stamps fixed)
  - Excluded dead/redirected routes (`maintenance`, `coming-soon`, legacy `/blog`)
- **Maintenance page:**
  - New standalone `/maintenance` (root level, canonical + `noindex`, redesigned status screen)
  - `/coming-soon` + `/ar/coming-soon` → `/maintenance` (308 redirects)
  - `MAINTENANCE_MODE` env flag in `src/proxy.ts` — public traffic rewritten to `/maintenance` with `X-Robots-Tag: noindex` while `/dashboard`, `/auth`, `/api` stay reachable; flag-off behavior unchanged
- **Blogs system:**
  - Real `/blogs` listing (blog posts only, cards → `/blogs/{slug}`, category badges, canonical)
  - `/blogs/[id]` detail — dual-resolve ObjectId **or** slug, slug-URL canonical, English fallback on `/ar`, blog-only related posts
  - `templateType: "blog"` added to Article model (`src/lib/models/Article.ts`), helpers in `src/lib/blog.ts`
  - Legacy `/blog` tree deleted: `/blog/...` → `/blogs/...`, `/blog/services/...` → `/services/...` (308s)
- **Dashboard:**
  - **Posts** menu = blog posts by default (Category/Status columns, `blogs/{slug}` display)
  - New *Country Services* / *City Services* views under the Services submenu (`/dashboard/services/country|city`)
  - Post-editor blog mode: slug from title, category input, service/location card hidden, blog-specific validation, preview → `/blogs/...`
  - Sidebar cleanup: `Blog By Services` group removed, exact-match sub-item highlighting

---

## Oct 20 (Today) — Internal-links audit fixes + legal-page contrast ✅

### A. Internal links audit remediation (TECHNICAL · INTERNAL LINKS, 17 Oct audit)

- **Crawl verification:** custom crawler across all 475 en-US sitemap pages, before/after — final: **0 broken links, 0 links-through-redirects, 0 orphans, 0 non-200 pages** (audit baseline: 404 links ×2, redirecting links ×45; weak ≤2-inlink pages 250 → 198, remainder is long-tail service/city pages at 2–3 links)
- **Footer (`Footer.tsx`, `ExpandableFooterLinks.tsx`):** all expandable links now render to the DOM (collapsed items hidden via class, not unmounted); dead Leadership/Awards links removed; airport-transfers → `/services/airport-transfers`; cookie / modern-slavery / code-of-conduct → real page anchors; 10 new keyword & hub links (`/car-service`, `/chauffeur-service`, `/limousine-service`, `/ground-transportation`, `/business`, `/corporations`, `/travel-agencies`, `/strategic-partnerships`, `/blogs`, `/industries`) with dict keys added to all 3 locales
- **Redirect fixes:** `config/redirects.ts` — `LANG` constraint `(en-US|en-GB|ar)` centralized in `redirects()` (fixed `/locations/cities` → `/locations/locations/cities`); `src/lib/locations.ts` — canonical-slug normalization in `countryUrl`/`cityUrl`/`airportUrl` (43 UAE alias links); `{langPrefix}` token for contact links (`route-presets.ts` + 21 DB `locationpagetemplates`)
- **Dead links:** `/press/coverage` + `/press/presskit` tabs removed (`PressReleasesClient.tsx`); `about` next-steps links locale-prefixed
- **New link structures:** terms §15/§16 anchors (`#modern-slavery`, `#code-of-conduct`), privacy `#cookies`, airport sub-services sibling links (`relatedLinks` on `ServicePage` + 3 kid pages + parent render)
- **DB repair:** 22 content fixes — 21 contact hrefs (`/{lang}/contact` → `{langPrefix}`), 1 leading-space image URL (broke `/services/bus-coach-hire/kuwait/salmiya` → 500)

### B. Legal-page contrast fix

- `terms`, `privacy-policy`, `accessibility`, `imprint` — every text block under a heading restyled from `text-gray-300` on white to a black card (`bg-abBlack`, `#ffffff` text, rounded, padded)

### C. Country services page template (mirrors the City template)

- **New template:** `src/components/services/Templates/Country/` — `corporateCountryTemplate` (16 sections: hero, national ticker marquee, service cards, textMediaGrid, 9× mediaContent, fleet grid, contact form, FAQ) + `blankCountryTemplate`, written in UAE flagship voice with valid anchors (`#services`, `#corporate-account`, `#fleet`, `#faq`)
- **Localization lib:** `src/lib/country-localization.ts` — `COUNTRY_META` for 7 countries, longest-first token substitution (airport → IDs → vision → country → landmarks → IATA → cities), textMediaGrid regeneration (heading/description/items/image tiles), hero image swap; applying a preset keeps UAE base wording for `uae` (same rule as Riyadh for the city template)
- **Editor wiring:** `section-library-editor.tsx` — new `countrySlug` prop, applyPreset localizes via `localizeSectionsForCountry`; `post-editor.tsx` — country articles with PageSection-shaped-or-empty sections open the Section Library (WYSIWYG toggle retained, legacy sections untouched), builder label + WhatsApp override field now cover country articles
- **Render wiring:** `services/[...slug]/page.tsx` — `usePageRenderer` now covers country articles too → `CityPageRenderer` (PageSections); legacy/WYSIWYG country articles still render via `BlogArticleLayout`
- **Data migration:** `scripts/apply-country-template.ts` (with `--dry-run`/`--country`/`--force`) applied the localized template to **all 36 published EN service-country articles** (6 services × 6 countries) — `contentMode` → `page-sections`, curated article FAQs injected into the template FAQ section, body copy/SEO/WhatsApp fields left intact in the DB (revert-safe)

---

## Oct 21 (Today) — Dashboard post editor: English / Arabic tabs ✅

### A. Arabic editing in the post editor

- **One document, two tabs:** `post-editor.tsx` gained a language switcher (`English` / `العربية`). The Arabic tab exposes **only translatable copy** — title, excerpt, author name, archive tag, category label, the WYSIWYG blocks, the FAQ list and the SEO meta title/description. Slug, status, date, cover/OG image, service/location, tags and read time stay English-only.
- **Template sections too:** the Arabic tab renders the same `PageSection[]` list through `SectionLibraryEditor` with the new `structureLocked` + `textOnly` flags — adding/removing/reordering sections, images and styling stay in the English tab, every text node (hero, marquee, service cards, textMediaGrid, mediaContent, fleet grid, contact form, FAQ, CTA banner, intro text, …) becomes editable in Arabic.
- **Automatic Google translation:** every Arabic field left empty falls back to the Google translation of the English text; a field with hand-written Arabic is never overwritten. The fallback is materialised on save (`buildArticleTranslations()`, 6 parallel requests) and cached in `translations.autoAr`; hand-written Arabic lives in `translations.ar`. The editor badges cached translations with `auto` — typing over one switches it to hand-written, clearing it returns it to automatic.
- **New shared lib:** `src/lib/arabic-content.ts` — flat "content path" addressing for every translatable string (`title`, `seo.metaTitle`, `faq.0.q`, `section.<id>.content.title`, `section.<id>.items.0.label`, …), with URL / id / icon / number / `{token}` protection so only real copy is translated.

### B. Rendering

- **Arabic pages read the base document:** `src/lib/blog.ts` resolves `ar` requests against the English document and overlays the Arabic copy with `applyArabicToArticle()` — the Arabic page now shows translated **template sections** too, which the old per-locale duplicate never did (it copied the English `sections` verbatim).
- **The legacy `locale: "ar"` duplicate documents are gone:** `POST /api/articles` no longer creates them, and the Arabic page no longer resolves them. `scripts/migrate-arabic-articles.ts` folds the existing duplicates into `translations.autoAr` of the base document and deletes them (`--dry-run`, `--backfill`).
- Model: `Article.translations` (Mixed) added; `src/lib/article-translation.ts` added.

---

## Oct 21 (Today) — Real WhatsApp mark in the chat widget

- **The mark now shows on the frontend.** The floating chat button rendered a generic chat-bubble glyph on every public page, so the WhatsApp logo was only visible after opening the widget and picking the WhatsApp channel. The launcher button now paints the official WhatsApp mark (scaled to the configured `iconSize`, white on the green button) whenever a WhatsApp channel is enabled — homepage, service pages, city/country location pages and the Arabic variants included.
- **One source of truth:** new `src/components/chat/WhatsAppIcon.tsx` exports `WHATSAPP_SVG` (raw markup) and the `WhatsAppIcon` component, both painted with `currentColor` so they inherit the white of the launcher button, the per-channel tint of the channel list and the popup header.
- **Applied everywhere:** `ChatWidget.tsx` launcher, `ChannelList.tsx` WhatsApp channel row (was an older 24×24 variant), `WhatsAppPopup.tsx` header, `ContactChannels.tsx` contact page.
- **Popup close button fixed:** it was showing the WhatsApp mark instead of a close glyph — now a proper ✕.
- **Dead code removed:** `ChatWidget.tsx` carried a second, unused copy of the whole `CHANNEL_SVG` map (30 lines of duplicated channel icons) — deleted.

---

## Verification Status

- `npx tsc --noEmit` → **0 errors**
- `npx eslint <all changed files>` → **0 errors** (4 pre-existing warnings)
- `npx next build` → **exit 0** (`/sitemap.xml` prerendered with 15m revalidate, `/maintenance` static)
- Live curl checks → sitemap 950 URLs / 0 forbidden URLs, maintenance canonical+noindex, all redirects 308, blog pages 200 with correct canonicals (E2E-tested with a temp post, then removed), proxy flag unit-tested both ON and OFF
- **Oct 20:** internal-links crawl (475 pages) → 0 broken / 0 redirect-chasing / 0 orphans / 0 non-200; terms/privacy/accessibility/imprint 200 with black text cards; `tsc` 0 errors, `eslint` 0 errors
- **Oct 20 (country template):** localizer smoke test (6 countries — 0 leftover UAE tokens, structure/images preserved); live e2e with a temp Qatar service-country article (PageSections) → `/services/e2e-country-tpl/qatar` 200 rendering the PageRenderer with fully localized copy, `/ar` variant 200; regressions: existing WYSIWYG country article → BlogArticleLayout, city article → CityPageRenderer, homepage 200; temp article + temp scripts removed
- **Oct 20 (country template rollout):** migration applied to all 36 country articles (36 updated / 0 skipped / 0 failed); live checks — `/services/chauffeur-vip/uae` + one page per country (SA/QA/KW/OM/BH) 200 with the correct `Engineered for {Country}.` headline and no stale UAE tokens outside UAE pages, curated FAQs replaced the template's generic items, `/ar` fallback 200, city page + homepage unaffected; distribution now `country: 36 page-sections, city: 228 page-sections, 0 wysiwyg`; `tsc` 0 errors, `eslint` 0 errors
- **Oct 21 (Arabic tabs):** `tsc` 0 errors, `eslint` 0 errors (pre-existing warnings only), `next build` exit 0 / "Compiled successfully"; template audit (`scripts/check-arabic-paths.ts`) → every text leaf of the city / country / service presets and of every location-scope section definition is captured for translation, only ids, types, urls, icons, numbers and style values are skipped; live Google check (`scripts/check-arabic-translation.ts`) → hand-written Arabic preserved, empty fields translated (HTML kept as HTML), `href` / `appearance` untouched; `{token}` placeholders are translated around, never mangled
- **Oct 21 (WhatsApp mark):** browser-verified on `localhost:3000` — launcher button now `viewBox="0 0 32 32"`, 28×28, white path on the `#25D366` button on `/`, `/services/chauffeur-vip`, `/locations/saudi-arabia/riyadh` and `/ar/services/chauffeur-vip`; channel-list row 20×20 tinted `#25D366`; popup header 32×32 white + ✕ close button; contact page 24×24 tinted; `tsc` 0 errors, `eslint` 0 errors, `next build` exit 0

## Deferred (by decision)

- Content-coverage gaps: `al-ula`/`alula` slug mismatch; missing city pages for farwaniya, nizwa, hail, najran, fujairah — sitemap updated only, pages not created
