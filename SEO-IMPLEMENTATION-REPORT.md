# AB.Limo — In-Depth SEO Implementation Report

**Date:** October 14, 2026
**Domain:** https://www.ab.limo
**Stack:** Next.js App Router (16.x), MongoDB (Mongoose), locale-prefixed routing (`/en-US`, `/en-GB`, `/ar`)
**Method:** Full source audit of `src/`, live `<head>` extraction via HTTP from production, sitemap/robots/redirect verification.

---

## 1. Executive Summary

AB.Limo has a **solid, systematically implemented SEO foundation**: every marketing page emits locale-aware metadata (title, description, keywords, canonical, hreflang, Open Graph, Twitter Cards) through a shared helper (`src/lib/seo.ts`), the sitemap is DB-driven and locale-complete, and the homepage carries rich structured data. The live `<head>` was verified working on `/en-US`, `/en-US/locations`, `/en-US/locations/uae`, and `/en-US/locations/uae/dubai`.

However, the audit surfaced **three structural weaknesses**:

1. **Keywords are static, not data-driven.** Every keyword string is a hardcoded template in page files. The database has no keywords field, the dashboard has no keywords input (the service editor even computes keywords and throws them away), and the keyword research artifacts (`tier1_services.json`, `AB_Transportation_GCC_SEO_Keywords.xlsx`) only influence pages at seed time — never at render time.
2. **Structured-data coverage is uneven.** Money pages are under-served: country pages and the locations index emit **zero JSON-LD on production** (verified), airport pages have none, and blog articles lack `Article`/`BlogPosting` schema. Meanwhile several ready-made schema components sit unused.
3. **A handful of correctness bugs** erode signals: a doubled `| AB.Limo` on the homepage title, a lang-less canonical on `/blog`, duplicate FAQPage blocks on city pages, locale-missing URLs inside some schemas, an un-noindexed `preview=true` mode, and a `WebSite` SearchAction pointing at a route that doesn't exist.

Nothing here is catastrophic — the site is indexable, crawlable, and well-tagged. The gaps are in **depth, data-drivenness, and consistency**, and they are all fixable without re-architecture.

| Area | Grade | Verdict |
|---|---|---|
| Meta tags (title/description/keywords) | B+ | Present everywhere; keywords are static templates |
| Canonical + hreflang | A− | Correct on all pages except `/blog` |
| Open Graph / Twitter | A | Complete incl. default OG image fallback |
| Structured data (JSON-LD) | C+ | Homepage strong; country/airport/blog pages weak |
| Sitemap | A | Dynamic, DB-backed, locale-complete, dedup'd |
| Robots.txt | A | Allow-all with correct disallows |
| Redirects / URL hygiene | A− | 308s for legacy slugs; alias normalisation in sitemap |
| Keyword strategy & pipeline | C | Research exists but is disconnected from rendering |
| Technical / performance SEO | B− | No HSTS/caching headers, render-blocking CDN CSS, no verification tags |

---

## 2. How Keywords Are Collected and Served

### 2.1 The pipeline (as implemented)

```
generateSeoMetadata({ keywords: "..." })          src/lib/seo.ts:13,27,54
        ↓
Next.js Metadata API → <meta name="keywords" ...>   (emitted in <head>)
```

Every page that wants keywords calls the shared helper with a **literal string**. There is no keyword store, no keyword generator at request time, and no per-entity SEO record for locations.

### 2.2 Per page type — where keywords actually come from

| Page type | Keywords source | Example (live) |
|---|---|---|
| **Homepage** | Hardcoded, `src/app/[lang]/page.tsx:27-28` | `luxury chauffeur service, executive transportation, corporate mobility, AB.Limo, airport transfer, premium limousine, GCC transportation, Dubai chauffeur, Riyadh executive travel, Doha limousine, business travel, VIP transportation, event logistics, wedding transportation` |
| **Country pages** | Hardcoded template + country name, `[country]/page.tsx:29` | `AB.Limo UAE, chauffeur service UAE, luxury transportation UAE, airport transfer UAE, UAE limousine, executive travel UAE` |
| **City pages** | Hardcoded template + city name, `[city]/page.tsx:31` | `AB.Limo Dubai, chauffeur service Dubai, luxury transportation Dubai, airport transfer Dubai, Dubai limousine, UAE executive travel` |
| **Route pages** | Template + from/to names, `[route]/page.tsx:52` | `Dubai to Abu Dhabi, Dubai transfer, long distance Dubai, AB.Limo route, intercity transfer Abu Dhabi` |
| **Airport pages** | Template + airport/city names, `[airport-name]/page.tsx:26` | `Dubai International Airport airport transfer, … limousine, Dubai airport service, …` |
| **Blog articles** | Generic fallback, `blog/[...slug]/page.tsx:44` | `${title}, AB.Limo blog, luxury transportation, chauffeur service` |
| **Service city pages** | Generic fallback, `services/[...slug]/page.tsx:64` | `${title}, AB.Limo, luxury chauffeur service` |
| **~25 static landing pages** | Each page's own hardcoded string | e.g. `chauffeur-service/page.tsx:20` |

### 2.3 What the search engines receive (verified live)

Googlebot receives `<meta name="keywords">` on every probed page. **Caveat:** Google has officially ignored the `keywords` meta tag since 2009; it matters for Yandex/Baidu and as internal documentation of intent. The real ranking inputs — title, description, on-page copy, internal links, structured data — are covered separately below.

### 2.4 The keyword research artifacts — collected but disconnected

| Artifact | Content | Consumed by site code? |
|---|---|---|
| `tier1_services.json` (5,510 lines) | Keyword → target page map (e.g. `"chauffeur service in Riyadh"` → `/services/chauffeur-vip/saudi-arabia/riyadh`) | **Only** by `scripts/seed-tier1-city-services.ts` at seed time: top-3 keywords → meta description, top-5 → article `tags`, first-3 → hero copy. Never used at render time. |
| `AB_Transportation_GCC_SEO_Keywords.xlsx` | Original keyword master list | Not referenced by any code. |

**Conclusion for the user's question:** yes, keyword research exists and it *was* used to build the Tier-1 service city pages — but at **seed time only**. The live pages do not read keywords from data; the `<meta name="keywords">` values are frozen strings in `.tsx` files.

### 2.5 Database & dashboard gaps

- **No keywords field anywhere in the models:** `Article.seo_metadata` = `{ metaTitle, metaDescription, ogImage }` (`src/lib/models/Article.ts:339-344`); `Service.seo` = same shape (`src/lib/models/Service.ts:74-78`). Location models (`Country.ts`, `City`, `Airport`) carry only `description`/`descriptionAr`/`faqs` — no meta fields at all.
- **Dashboard cannot edit keywords.** Article editor (`post-editor.tsx:744-764`) and service editor (`service-editor.tsx:746-752`) expose metaTitle/metaDescription/ogImage only. Notably `service-editor.tsx:235-250` *builds* a keyword string inside `regenerateSeo()` and then discards it because there is nowhere to save it.
- **`settings.defaultSeo` is dead config.** Editable in `dashboard/settings/page.tsx:79-95`, validated (`validations/settings.ts:5-10`), stored — but **no `generateMetadata` ever reads it**.

---

## 3. Head Tags — What Crawlers Actually Get

### 3.1 Mechanism

`generateSeoMetadata()` (`src/lib/seo.ts:22-82`) is the single source of truth for ~95% of pages. It emits:

- `title`, `description`, `keywords`
- `alternates.canonical` → `https://www.ab.limo/{lang}{path}`
- `alternates.languages` → en-US / en-GB / ar / x-default (x-default → en-US)
- Full `openGraph` (title, description, url, siteName, type, locale + alternateLocale, 1200×630 image with fallback)
- `twitter` card (`summary_large_image`, `@ablimo` site+creator)
- `robots: noindex` only when explicitly requested (currently **never** requested by any page)

Root layout (`src/app/layout.tsx:16-40`) adds `metadataBase`, a `title.template = "%s | AB.Limo"`, icons, and a sitewide `robots { index, follow, googleBot {…} }`. The lang layout (`src/app/[lang]/layout.tsx:13-52`) adds dictionary-based site title/description + OG/Twitter as a fallback layer.

### 3.2 Live verification (fetched 2026-10-14)

| Tag | `/en-US` | `/en-US/locations` | `/en-US/locations/uae` | `/en-US/locations/uae/dubai` |
|---|---|---|---|---|
| `<title>` | ✅ (⚠️ doubled suffix, see §6) | ✅ | ✅ `Premium Chauffeur Service in UAE \| AB.Limo` | ✅ |
| description | ✅ | ✅ | ✅ (from `country.description`) | ✅ (from `city.description`) |
| keywords | ✅ | ✅ | ✅ | ✅ |
| canonical | ✅ `/en-US/` | ✅ | ✅ | ✅ |
| hreflang ×4 | ✅ | ✅ | ✅ | ✅ |
| OG + Twitter | ✅ | ✅ | ✅ | ✅ |
| JSON-LD | 4 blocks | **0 blocks** ⚠️ | **0 blocks** ⚠️ | 2 blocks ✅ |

### 3.3 Content sources per location page (answering "are we getting it through head")

- **Title:** hardcoded template → `Premium Chauffeur Service in {Country/City} | AB.Limo` (`[country]/page.tsx:25`, `[city]/page.tsx:27`).
- **Description:** **DB-driven** — `country.description` / `city.description` (with `Ar` variants for `/ar`), hardcoded fallback if empty (`[country]/page.tsx:22,26`; `[city]/page.tsx:24,28`). These descriptions are managed in the dashboard location editor (`location-editor.tsx:471-491` countries, `:677-695` cities).
- **Keywords:** hardcoded template + entity name (no DB involvement).
- **FAQs:** DB-driven (`faqs`/`faqsAr` on Country/City models) → rendered on-page **and** as FAQPage JSON-LD (country pages only when FAQs exist; city pages additionally from the server component).

So: descriptions and FAQs are genuinely collected from the database and served through the head; **titles and keywords are not**.

---

## 4. Structured Data (JSON-LD)

### 4.1 Component inventory (`src/components/seo/StructuredData.tsx`)

| Component | schema.org type | Used on |
|---|---|---|
| `OrganizationJsonLd` | Organization | Homepage |
| `LocalBusinessJsonLd` | LocalBusiness | Homepage |
| `WebsiteJsonLd` | WebSite + SearchAction | Homepage |
| `HowToBookJsonLd` | HowTo | Homepage |
| `BreadcrumbJsonLd` | BreadcrumbList | about, contact, faqs, fleet ×2, industries ×4, city, route, services/[slug] |
| `ServiceJsonLd` | Service | services/[slug] |
| `FAQJsonLd` | FAQPage | about, industries ×4, city, route |
| `CityJsonLd` | Service + City + Country | city pages |
| `RouteJsonLd` | Service + City[] | route pages |
| `IndustryJsonLd` | Service | industry pages |
| `AboutPageJsonLd` | AboutPage | about |
| `FleetJsonLd` | ItemList/Product | **UNUSED (dead code)** |
| `ServiceListJsonLd` | ItemList/Service | **UNUSED** |
| `VideoJsonLd` | VideoObject | **UNUSED** |

Plus inline hand-rolled FAQPage scripts in: `faqs/page.tsx:33-38`, `BlogArticleLayout.tsx:195-211`, `faq-section.tsx:41-57`, `ServicePage.tsx:327-343`, `CityDetailClient.tsx:310-327`, `CountryDetailClient.tsx:186-203`.

### 4.2 Per-route coverage (source-level, with live confirmation)

| Route | JSON-LD | Notes |
|---|---|---|
| Homepage | Organization, LocalBusiness, WebSite, HowTo | Strong; SearchAction → `/search?q=` **route does not exist** |
| `/locations` (index) | **none** | Should carry ItemList or BreadcrumbList |
| `/locations/[country]` | FAQPage only, conditional | **UAE renders 0 JSON-LD on production** (no FAQs); no BreadcrumbList, no Service |
| `/locations/[country]/[city]` | Service+City, BreadcrumbList, FAQPage | ⚠️ **Duplicate FAQPage**: `[city]/page.tsx:91` + `CityDetailClient.tsx:310`; Service URL missing `/{lang}` prefix |
| `/locations/.../routes/[route]` | Service+Route, BreadcrumbList, FAQPage | Service URL missing `/{lang}` prefix |
| `/locations/.../airport/[airport]` | **none** | No Airport/Gateway schema, no FAQ, no breadcrumbs |
| `/services/[slug]` | Service, BreadcrumbList, FAQPage | ✅ URLs correctly locale-prefixed |
| `/services/airport-transfers/*` | FAQPage (conditional) | No BreadcrumbList of their own |
| `/blog/[...slug]`, `/services/[...slug]` (articles) | FAQPage only (conditional) | ❌ **No Article/BlogPosting schema**, no datePublished/dateModified despite metadata support existing in the helper |
| `/industries` (index) | none | Sub-pages fully covered |
| `/fleet`, `/fleet/[vehicle]` | BreadcrumbList only | `FleetJsonLd` component exists but unused |
| `/faqs` | BreadcrumbList + FAQPage | ⚠️ Breadcrumb URLs are **locale-less** (`https://www.ab.limo/faqs` — redirects) |
| Static pages (privacy, terms, career, …) | mostly none | about/contact/faqs are the exceptions |

### 4.3 Cross-cutting structured-data issues

1. **No sitewide Organization/WebSite** — those exist only on the homepage; inner pages have no entity anchor.
2. **Missing locale prefix** inside `areaServed.url` on city/route Service schemas (live: `https://www.ab.limo/locations/uae/dubai` → 308 redirect for crawlers).
3. **Duplicate FAQPage on city pages** (server + client both emit).
4. **Unused components** indicate unfinished wiring: fleet ItemList, services ItemList, VideoObject.
5. **No `Article`/`BlogPosting`** anywhere — a significant miss for the blog and the hundreds of DB-backed service-city articles.

---

## 5. Crawl Infrastructure

### 5.1 Sitemap (`src/app/sitemap.ts`) — implemented well

- `force-dynamic` → always reflects the DB (dashboard-created pages appear without redeploy).
- Auto-discovers static routes by walking `src/app/[lang]`, skips `[param]` segments.
- Adds DB-driven locations (countries → cities → routes → airports), published services, and articles (both `en` and `ar`), with `lastModified` from `updatedAt ?? createdAt`.
- Emits **every URL × 3 locales** with priorities (home 1.0, static 0.8, locations 0.7, routes/airports 0.6) and change frequencies.
- Normalises aliases via `resolveCountry()` so only canonical slugs are listed (no 308-only URLs).
- Deduplicates by final URL.

### 5.2 Robots (`src/app/robots.ts`)

Allow-all for `*`, disallows `/dashboard`, `/auth`, `/api`; points to the sitemap. Correct.

### 5.3 Redirects (`config/redirects.ts`, 13 rules, all 308)

Legacy path migrations handled: `/cities` → `/locations/cities`, `/countries*` → `/locations*`, `united-arab-emirates` → `uae`, `kuwait` → `kuwait-city`, `/airport-transfer` → `/services/airport-transfers`, `/blog` → `/blogs`, `/blog/services/*` → `/services/*`.

### 5.4 Locale routing (`src/proxy.ts:44-57`)

Un-localised paths get a **307** redirect to `/{locale}{path}` based on `Accept-Language`. Locale-prefixed paths pass through. Correct for SEO (permanent 308s reserved for content migrations; language negotiation stays dynamic).

### 5.5 Gaps

- **`preview=true` pages are indexable.** `blog/[...slug]` and `services/[...slug]` accept `?preview=true` but never pass `noindex` (the capability exists in `seo.ts:15,80` and is used by zero pages).
- **No `google-site-verification` (or any search-console verification tag) anywhere** in source or live HTML.
- **No `headers()` in `next.config.ts`** → no HSTS, no cache-control tuning, no security headers.
- **`/blog` and `/blogs` both exist** as index routes — `/blogs` is canonical (308 from `/blog`), but the `/blog` page file still ships its own metadata with a **lang-less canonical** (see §6).

---

## 6. Issues Found (prioritised)

### P0 — Correctness bugs (fix now)

| # | Issue | Evidence | Fix |
|---|---|---|---|
| 1 | **Homepage title doubled**: `AB.Limo \| Premium Executive & Corporate Mobility Services \| AB.Limo` | Live; caused by root `title.template = "%s \| AB.Limo"` (`layout.tsx:17`) applied to titles that already contain the brand | Remove `| AB.Limo` from individual titles **or** drop the template; note the template only affects the homepage today (other pages render verbatim) — the inconsistency itself is the bug |
| 2 | **`/blog` page bypasses the helper**: hand-rolled metadata, no keywords, canonical hardcoded without `/{lang}`, no Twitter card | `blog/page.tsx:14-41` | Reuse `generateSeoMetadata` like the working `/blogs` page (`blogs/page.tsx:15-30`), or delete the route entirely (it's already 308'd from `/blog` → `/blogs`) |
| 3 | **Duplicate FAQPage on city pages** | `[city]/page.tsx:91` + `CityDetailClient.tsx:310` | Remove the client-side copy |
| 4 | **`preview=true` indexable** | `blog/[...slug]/page.tsx`, `services/[...slug]/page.tsx` | Pass `noindex: true` to `generateSeoMetadata` when `preview` is set |
| 5 | **FAQPage breadcrumbs locale-less on `/faqs`** | `faqs/page.tsx:29-30` → live `https://www.ab.limo/faqs` | Prefix with `/{lang}` |

### P1 — Missing structured data on money pages (high impact)

| # | Issue | Fix |
|---|---|---|
| 6 | **Country pages render 0 JSON-LD on production** (UAE verified) | Add `BreadcrumbJsonLd` + a `CountryJsonLd` (Service + Country, mirroring `CityJsonLd`); keep conditional FAQPage |
| 7 | **Locations index has no JSON-LD** | Add `BreadcrumbJsonLd` (+ optional ItemList of countries) |
| 8 | **Airport pages have no JSON-LD** | Add `BreadcrumbJsonLd` + FAQPage (they have on-page FAQ copy) + Airport/Gateway schema |
| 9 | **No Article/BlogPosting schema on any article** | Add `ArticleJsonLd` (headline, datePublished, dateModified, author, image) in `BlogArticleLayout.tsx`; the helper already accepts `publishedTime`/`modifiedTime` (`seo.ts:18-19`) |
| 10 | **Service schema URLs missing `/{lang}`** on city & route pages | `[city]/page.tsx:79`, `[route]/page.tsx:117` |

### P2 — Keyword & metadata pipeline (strategic)

| # | Issue | Fix |
|---|---|---|
| 11 | **No keywords field in DB or dashboard** | Add `keywords` (string or string[]) to `Article.seo_metadata`, `Service.seo`, and to Country/City models; surface in editors; fall back to today's templates when empty |
| 12 | **Service editor computes keywords then discards them** | `service-editor.tsx:235-250` — wire the computed value into the saved SEO record once the field exists |
| 13 | **`tier1_services.json` disconnected from runtime** | Store per-article keywords at seed time (extend the seed script once the field exists) so `/services/{service}/{country}/{city}` pages carry their researched keyword sets |
| 14 | **`settings.defaultSeo` dead config** | Either consume it as a metadata fallback in the lang layout, or remove it from the dashboard |
| 15 | **Location pages have no meta fields** | Countries/cities only have `description` used as meta description; titles are fixed templates. Add optional `metaTitle`/`metaDescription`/`keywords` overrides per location in the dashboard |

### P3 — Technical / minor

| # | Issue | Fix |
|---|---|---|
| 16 | `WebSite` SearchAction → `/search?q=` but no search route exists | Build the route or remove `potentialAction` (Google treats dead SearchActions as a spam signal) |
| 17 | Unused `FleetJsonLd`, `ServiceListJsonLd`, `VideoJsonLd` | Wire them up (fleet index, services index, video embeds) or delete |
| 18 | `<html lang="en">` hardcoded even for `/ar` (wrapper div carries `lang`/`dir`, root does not) | Move locale to the `<html>` element via the root layout |
| 19 | No search-console verification tag | Add `verification.google` to root metadata |
| 20 | No HSTS/cache headers | Add `headers()` in `next.config.ts` |
| 21 | Font Awesome 6.4.0 loaded render-blocking from cdnjs (also preloaded) | Self-host or switch to `next/font`/subset; noted in the Sept audit, still unfixed |
| 22 | Keyword meta tags are provided but ignored by Google | Keep for Yandex/Baidu and house style; don't expect ranking impact — invest in titles/schema instead |

---

## 7. What Is Working Well (keep it)

1. **Single metadata helper** — ~40 pages consistently emit canonical + hreflang (incl. `x-default`) + OG + Twitter + default OG image. This is better than most SME sites.
2. **DB-driven sitemap with alias normalisation** — no redirect-only URLs, reflects dashboard content instantly, all three locales.
3. **Homepage structured data** — Organization + LocalBusiness (with geo, hours) + WebSite + HowTo is a strong entity anchor.
4. **Location descriptions & FAQs are CMS-managed** and flow into both `<meta name="description">` and FAQPage schema.
5. **308 redirect hygiene** for every legacy URL family, with a sitemap that only advertises canonicals.
6. **Arabic parity** — `descriptionAr`/`faqsAr`/`nameAr` variants flow through metadata, hreflang, and schema for `/ar`.
7. **Auto-SEO in editors** — meta title/description/ogImage auto-fill + Google Translate for Arabic article metadata (`api/articles/route.ts:81-97`).

---

## 8. Recommended Roadmap

**Sprint 1 (bug fixes, ~half a day):** items 1–5.
**Sprint 2 (structured data, ~1–2 days):** items 6–10 — biggest ranking-signal win for the location network.
**Sprint 3 (keyword pipeline, ~2–3 days):** items 11–15 — add `keywords` to models + editors, backfill from `tier1_services.json` for Tier-1 service-city pages, then stop shipping template keywords on DB-backed pages.
**Sprint 4 (technical hygiene):** items 16–22.

**Measurement:** after each sprint, re-run live `<head>` extraction on the four probe URLs plus one airport, one route, one blog article, and one `/ar` page; validate JSON-LD with the Rich Results Test; monitor Search Console for impressions/CTR on `location:` queries.

---

*Report generated from source audit + live production fetches. Prior audit: `SEO-AUDIT-REPORT.md` (Sept 10, 2026) — items 7 (Font Awesome) and 12 (stale SEO titles) from that report remain open here.*
