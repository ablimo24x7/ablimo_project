# AB.Limo Dashboard Workflow

Complete documentation of the admin dashboard modules, routes, data flow, and website rendering pipeline.

---

## Table of Contents

1. [Dashboard Layout & Providers](#1-dashboard-layout--providers)
2. [Dashboard Home (Overview)](#2-dashboard-home-overview)
3. [Posts Module](#3-posts-module)
4. [Categories Module](#4-categories-module)
5. [Services Module](#5-services-module)
6. [Locations Module](#6-locations-module)
7. [Routes Module](#7-routes-module)
8. [Users Module](#8-users-module)
9. [Permissions Module](#9-permissions-module)
10. [Settings Module](#10-settings-module)
11. [Sidebar Navigation](#11-sidebar-navigation)
12. [Website Rendering Flow](#12-website-rendering-flow)
13. [Complete Public Route Map](#13-complete-public-route-map)
14. [API Routes Reference](#14-api-routes-reference)
15. [Data Models](#15-data-models)
16. [Library Files (Server-Side Data)](#16-library-files-server-side-data)
17. [Module Interactions Quick Reference](#17-module-interactions-quick-reference)

---

## 1. Dashboard Layout & Providers

**File:** `src/app/dashboard/layout.tsx`

All dashboard pages are wrapped in this layout. The provider hierarchy is:

```
AuthProvider
  └─ QueryProvider (React Query / TanStack Query)
       └─ SidebarProvider
            ├─ AdminSidebar (left nav)
            └─ SidebarInset
                 ├─ AdminHeader
                 └─ <main>{children}</main>
```

**Providers:**
- `AuthProvider` — handles authentication state (`src/components/providers/auth-provider.tsx`)
- `QueryProvider` — React Query client for data fetching/caching (`src/components/providers/query-provider.tsx`)

**UI Shell:**
- `AdminSidebar` — left navigation (`src/components/admin/Sidebar.tsx`)
- `AdminHeader` — top bar (`src/components/admin/Header.tsx`)
- `Toaster` — toast notifications via `sonner`

**Metadata:** title = "AB.Limo Admin Dashboard", description = "Admin panel for AB.Limo"

---

## 2. Dashboard Home (Overview)

**Route:** `/dashboard`
**File:** `src/app/dashboard/page.tsx` → `src/components/admin/dashboard-home.tsx`
**Type:** Server component wrapping client `DashboardHome`

### Data Flow

```
DashboardHome component (client)
  └─ useQuery("dashboard-metrics", { cache: "no-store" })
       └─ GET /api/dashboard/metrics
            ├─ Article.countDocuments()                    → overview.totalPosts
            ├─ Article.countDocuments({status:"published"}) → overview.publishedPosts
            ├─ Article.countDocuments({status:"draft"})     → overview.draftPosts
            ├─ Article.aggregate([{ $sum: "$views" }])      → overview.totalViews
            ├─ Service.countDocuments()                     → overview.totalServices
            ├─ Service.countDocuments({status:"published"}) → overview.publishedServices
            ├─ Service.countDocuments({status:"draft"})     → overview.draftServices
            ├─ Category.countDocuments()                    → overview.totalCategories
            ├─ Article.find().sort({date:-1}).limit(10)     → recentPosts
            └─ Service.find().sort({createdAt:-1}).limit(10) → recentServices
```

### Response Shape

```typescript
type DashboardMetrics = {
  overview: {
    totalPosts: number;
    publishedPosts: number;
    draftPosts: number;
    totalCategories: number;
    totalViews: number;
    totalServices: number;
    publishedServices: number;
    draftServices: number;
  };
  recentPosts: Array<{ _id: string; title: string; slug: string; status: string; views: number; date: string }>;
  recentServices: Array<{ _id: string; title: string; slug: string; status: string; updatedAt: string }>;
};
```

### UI Rendering
- 4 metric cards: Total Posts, Total Services, Total Views, Published Services
- Recent Posts table (title, slug, status, views) — each row links to `/dashboard/posts/${_id}/edit`
- Quick action buttons: "Add New Post" → `/dashboard/posts/new`, "Add New Category" → `/dashboard/categories`
- "View all" link → `/dashboard/posts`

---

## 3. Posts Module

### Dashboard Routes

| Route | File | Type | Description |
|---|---|---|---|
| `/dashboard/posts` | `src/app/dashboard/posts/page.tsx` | Client | List all posts |
| `/dashboard/posts/new` | `src/app/dashboard/posts/new/page.tsx` | Server | Create new post |
| `/dashboard/posts/[id]/edit` | `src/app/dashboard/posts/[id]/edit/page.tsx` | Client | Edit existing post |

### Post List Page

**Data Flow:**
```
PostsPage component
  ├─ useQuery("posts")
  │    └─ GET /api/articles
  │         ├─ Query params: page, limit, q, category, status, templateType
  │         ├─ Article.find(filter).sort({date:-1})
  │         └─ Returns: { items: Post[], total, page, limit }
  │
  └─ useMutation (delete)
       └─ DELETE /api/articles/${id} → invalidates ["posts"]
```

**Post shape displayed:**
```typescript
type Post = {
  _id: string;
  title: string;
  slug: string;
  status: string;        // "published" | "draft"
  templateType: string;  // "country" | "city" | "city-to-city" | "airport"
  country: string;
  city: string;
  views: number;
  date: string;
};
```

**UI:** Table with columns: Title, Slug, Status (Badge), Template, Views, Date, Actions (Edit, Delete). "New Post" button → `/dashboard/posts/new`. Delete uses AlertDialog confirmation.

### Post Editor (Create/Edit)

**Files:**
- Create: `src/components/admin/post-editor.tsx` with `mode="create"`
- Edit: same component with `mode="edit"` + `initialData` fetched from `GET /api/articles/${id}`

**API Endpoints Used:**
- `POST /api/articles` — create (body: full article object)
- `PUT /api/articles/${id}` — update

### Post Editor — English / Arabic Tabs

Every post (country, city and blog templates) is edited in **one document**.
The editor has a language switcher with two tabs — `English` and `العربية` —
and the Arabic tab only exposes translatable text.

**Storage (`Article.translations`)**

```ts
translations: {
  ar:     { [contentPath]: string },  // hand-written Arabic
  autoAr: { [contentPath]: string },  // Google translations (fallback)
}
```

Content paths address every translatable string:

| Path | Field |
|---|---|
| `title`, `excerpt`, `authorName`, `archiveTag`, `categoryLabel` | top-level fields |
| `bodyContent`, `keyTakeawaysContent`, `finalThoughtsContent` | WYSIWYG blocks |
| `seo.metaTitle`, `seo.metaDescription` | SEO metadata |
| `faq.<i>.q`, `faq.<i>.a` | FAQ list |
| `section.<sectionId>.<relative path>` | template section copy, e.g. `section.sec-1.content.title`, `section.sec-1.items.0.label` |

**Resolution order:** `ar[path]` → `autoAr[path]` → the English value.
A hand-written Arabic value always wins; an empty Arabic field falls back to
the Google translation.

**Who fills the automatic translations**
- `POST /api/articles` and `PUT /api/articles/${id}` call
  `buildArticleTranslations()` (`src/lib/article-translation.ts`) on every
  save: every path without hand-written Arabic is translated with
  `googleTranslate` / `googleTranslateHtml` (6 requests in parallel) and
  cached in `translations.autoAr`. Hand-written Arabic is never overwritten.
- The Arabic tab shows the cached automatic translation with an `auto` badge;
  typing over it converts the field to hand-written Arabic, clearing it sends
  the field back to automatic.

**Template sections (`PageSection[]`)**
- The Arabic tab renders the same section list with `structureLocked` and
  `textOnly` (`section-library-editor.tsx`): adding, removing, reordering,
  images and styling stay in the English tab, only the copy is translated.
- Only translatable keys are sent to the translator — URLs, icons, ids,
  numbers and `{token}` placeholders are skipped.

**Rendering**
- `src/lib/blog.ts` resolves Arabic requests against the **base** document
  (`localeFilter("ar")` ignores the legacy `locale: "ar"` duplicates) and
  overlays the Arabic text with `applyArabicToArticle()`.
- Arabic pages therefore always render the English structure with Arabic copy.

**Migration:** `scripts/migrate-arabic-articles.ts` folds the legacy
`locale: "ar"` duplicate documents into `translations.autoAr` of the base
document and deletes them (`--dry-run`, `--backfill` flags).

### Website Rendering (Blog)

**Blog List:** `GET /${lang}/blogs`
- Server Component: `src/app/[lang]/blogs/page.tsx`
- Data: `getPublishedBlogs(locale)` from `src/lib/blog.ts`
- Fetches published blog articles from MongoDB, renders card grid with Image, Calendar, Clock icons

**Blog Article:** `GET /${lang}/blogs/${id}`
- Server Component: `src/app/[lang]/blogs/[id]/page.tsx`
- Params: `id` (ObjectId **or** slug), `lang`; searchParams: `preview`
- Data: `getBlogByIdOrSlug(id, locale, isPreview)` from `src/lib/blog.ts`
- Related articles: `getRelatedBlogs(locale, slug, 4)`
- Components: `BlogArticleTemplate` (blog template) / `BlogArticleLayout`, `RelatedArticles`
- Template-aware rendering based on `article.templateType`:
  - `"country"` → links to `/${lang}/locations/${country}`
  - `"city"` → links to `/${lang}/locations/${country}/${city}`
  - `"city-to-city"` → links to `/${lang}/city-to-city`
  - `"airport"` → links to `/${lang}/services/airport-transfers`

### Template Filter Navigation (Sidebar)

The sidebar has "Blog Templates" section linking to posts filtered by type:
- Country Blogs: `/dashboard/posts?template=country`
- City Blogs: `/dashboard/posts?template=city`
- City-to-City: `/dashboard/posts?template=city-to-city`
- Airport Blogs: `/dashboard/posts?template=airport`

---

## 4. Categories Module

### Dashboard Route

| Route | File | Type | Description |
|---|---|---|---|
| `/dashboard/categories` | `src/app/dashboard/categories/page.tsx` | Client | Manage categories (inline CRUD) |

### Data Flow

```
CategoriesPage component
  ├─ useQuery("categories")
  │    └─ GET /api/categories
  │         ├─ seedCategoriesIfEmpty() on first load
  │         └─ SimpleCategory.find().sort({label:1})
  │              → { items: Category[] }
  │
  ├─ Create: POST /api/categories
  │    └─ { label } → slugify → SimpleCategory.create() → invalidates ["categories"]
  │
  ├─ Update: PUT /api/categories/${id}
  │    └─ { label, slug } → SimpleCategory.findByIdAndUpdate() → invalidates ["categories"]
  │
  └─ Delete: DELETE /api/categories/${id}
       └─ SimpleCategory.findByIdAndDelete() → invalidates ["categories"]
```

**Default Categories Seeded:**
Airport Transfers, Executive & Corporate Mobility, VIP, Diplomatic & Government, Corporate Fleet & Workforce Mobility, Event Transportation, Group & Coach Charter, Tourism & Leisure, Religious Tourism, Cross-Border Mobility, Premium Lifestyle & Specialty, Company News, Aviation, Hospitality

**Category shape:**
```typescript
type Category = { _id: string; label: string; slug: string };
```

**UI:** Inline editable list. Each row has label input + Save/Cancel/Edit/Delete buttons. "Add Category" button at bottom creates new entry.

### Website Rendering
Categories are referenced in post metadata for filtering. The services page uses hardcoded category-to-image mappings for the service cards grid. No dedicated public page for categories.

---

## 5. Services Module

### Dashboard Routes

| Route | File | Type | Description |
|---|---|---|---|
| `/dashboard/services` | `src/app/dashboard/services/page.tsx` | Client | List all services |
| `/dashboard/services/new` | `src/app/dashboard/services/new/page.tsx` | Server | Create new service |
| `/dashboard/services/[id]/edit` | `src/app/dashboard/services/[id]/edit/page.tsx` | Client | Edit existing service |

### Service List Page

**Data Flow:**
```
ServicesPage component
  ├─ useQuery("services", q)
  │    └─ GET /api/services?q=...
  │         ├─ isDatabaseEnabled() check
  │         ├─ ServiceListQuerySchema validation
  │         ├─ seedServicesIfEmpty() on first access
  │         ├─ Service.find(filter).sort({order:1, createdAt:1})
  │         └─ Returns: { items: ServiceRow[], total, page, limit }
  │
  ├─ useMutation (delete)
  │    └─ DELETE /api/services/${id} → invalidates ["services"]
  │
  └─ useMutation (seed)
       └─ POST /api/services/seed → invalidates ["services"]
```

**Service Row shape:**
```typescript
type ServiceRow = {
  _id: string;
  slug: string;
  title: string;
  desc: string;
  status: string;       // "published" | "draft"
  showInMenu: boolean;
  order: number;
  heroImage?: string;
  faqCount: number;
  updatedAt?: string;
};
```

**UI:** Table with columns: Title, Slug, Status (Badge), Menu (showInMenu), Order, FAQs, Updated, Actions (Edit, Delete). Search input filters by `q` param. "New Service" button → `/dashboard/services/new`. "Seed Defaults" button triggers seeding.

### Service Editor (Create/Edit)

**Files:**
- Create: `src/components/admin/service-editor.tsx` with `mode="create"`
- Edit: same component with `mode="edit"` + `initialData` from `GET /api/services/${id}`

**API Endpoints Used:**
- `POST /api/services` — create (validates via `ServiceCreateSchema`)
- `PUT /api/services/${id}` — update (validates via `ServiceUpdateSchema`)

### Website Rendering

**Services Index:** `GET /${lang}/services`
- Server Component: `src/app/[lang]/services/page.tsx`
- Data: `getServiceCards(slugOrder)` from `src/lib/services.ts`
- Renders category cards grid with images, each linking to `/${lang}/services/${slug}`

**Service Detail:** `GET /${lang}/services/${slug}`
- Server Component: `src/app/[lang]/services/[slug]/page.tsx`
- Data: `resolveServicePage(slug, lang)` from `src/lib/services.ts`
- Component: `ServicePage` from `src/app/[lang]/services/_components/ServicePage.tsx`
- Structure defined by `serviceStructures.tsx`
- Special handling for `airport-transfers` slug → shows sub-links

**Airport Transfer Sub-Routes:**

| URL | File | Data Source |
|---|---|---|
| `/${lang}/services/airport-transfers` | `src/app/[lang]/services/[slug]/page.tsx` | `resolveServicePage("airport-transfers", lang)` |
| `/${lang}/services/airport-transfers/drop-off` | `src/app/[lang]/services/airport-transfers/drop-off/page.tsx` | `dict.servicePages.airportTransferDropOff` |
| `/${lang}/services/airport-transfers/pickup` | `src/app/[lang]/services/airport-transfers/pickup/page.tsx` | `dict.servicePages.airportTransferPickup` |
| `/${lang}/services/airport-transfers/vip-tarmac` | `src/app/[lang]/services/airport-transfers/vip-tarmac/page.tsx` | `dict.servicePages.airportTransferVipTarmac` |

All airport transfer sub-pages use `ServicePage` component with local `ServiceStructure` for images.

---

## 6. Locations Module

### Dashboard Routes

| Route | File | Type | Description |
|---|---|---|---|
| `/dashboard/locations` | `src/app/dashboard/locations/page.tsx` | Client | List all countries |
| `/dashboard/locations/new` | `src/app/dashboard/locations/new/page.tsx` | Server | Create new country |
| `/dashboard/locations/[id]` | `src/app/dashboard/locations/[id]/page.tsx` | Client | Edit existing country |

### Location List Page

**Data Flow:**
```
LocationsPage component
  ├─ useQuery("locations")
  │    └─ GET /api/locations
  │         ├─ getAllCountries()  → from src/lib/locationData.ts
  │         └─ getAllRoutes()
  │         → { countries: CountryShape[], routes }
  │
  └─ useQuery("locations-meta")
       └─ GET /api/locations/meta
            ├─ Country.find({status:{$ne:"archived"}})
            └─ Returns: { countries: [{_id, slug, name, code, cityCount, airportCount}] }
```

**Location shape displayed:**
```typescript
type CountryShape = {
  _id: string;
  slug: string;
  name: string;
  code: string;          // ISO 3166-1 alpha-2
  cityCount: number;
  airportCount: number;
};
```

**Mutations:**
- Delete: `DELETE /api/locations/${id}` → cascades to cities/airports → invalidates `["locations"]` + `["locations-meta"]`

**UI:** Table with columns: Name, Code, Slug, Cities, Airports, Actions (Edit, Delete). "New Country" button → `/dashboard/locations/new`. Delete uses AlertDialog confirmation.

### Location Editor (Create/Edit)

**Files:**
- Create: `src/components/admin/location-editor.tsx` with `mode="create"`
- Edit: same component with `mode="edit"` + `initialData` from `GET /api/locations/${id}`

**API Endpoints Used:**
- `POST /api/locations` — create (validates via `CountryCreateSchema`, ISO-3166 validation)
- `PUT /api/locations/${id}` — update
- Nested data: cities with airports, aliases, status per city/airport

### Website Rendering

| URL Pattern | File | Data Function |
|---|---|---|
| `/${lang}/locations` | `src/app/[lang]/locations/page.tsx` | `getAllCountries()` → `CountriesClient` |
| `/${lang}/locations/cities` | `src/app/[lang]/locations/cities/page.tsx` | `getDynamicCityList()` → `CitiesClient` |
| `/${lang}/locations/${country}` | `src/app/[lang]/locations/[country]/page.tsx` | `getCountryForRequest(countryParam)` + `getRoutesForCountry()` → `CountryDetailClient` |
| `/${lang}/locations/${country}/${city}` | `src/app/[lang]/locations/[country]/[city]/page.tsx` | `getCityForRequest(countryParam, cityParam)` + `getRoutesForCity()` → `CityDetailClient` |
| `/${lang}/locations/${country}/${city}/airport/${airport-name}` | `src/app/[lang]/locations/[country]/[city]/airport/[airport-name]/page.tsx` | `getAirportForRequest(countryParam, cityParam, airportParam)` → `AirportTransferClient` |
| `/${lang}/locations/${country}/${city}/routes/${route}` | `src/app/[lang]/locations/[country]/[city]/routes/[route]/page.tsx` | `getCountryForRequest()`, `getCityForRequest()`, `resolveCity()`, `findRouteData()`, `getAllCountries()` → `BookingWidget` + inline JSX |

All location pages call `notFound()` if the requested entity cannot be resolved.

---

## 7. Routes Module

### Dashboard Routes

| Route | File | Type | Description |
|---|---|---|---|
| `/dashboard/routes` | `src/app/dashboard/routes/page.tsx` | Client | List all city-to-city routes |
| `/dashboard/routes/new` | `src/app/dashboard/routes/new/page.tsx` | Server | Create new route |
| `/dashboard/routes/[id]` | `src/app/dashboard/routes/[id]/page.tsx` | Client | Edit existing route |

### Route List Page

**Data Flow:**
```
RoutesPage component
  └─ useQuery("routes")
       └─ GET /api/locations/routes
            ├─ isDatabaseEnabled() check
            ├─ LocationRoute.find().sort({fromCity:1})
            └─ Returns: { routes: RouteRecord[], databaseEnabled: boolean }
```

**Route shape:**
```typescript
type RouteRecord = {
  _id: string;
  fromCity: string;       // slug
  fromCityName: string;   // display name
  toCity: string;         // slug
  toCityName: string;     // display name
  distance: string;
  duration: string;
  countrySlug: string;
  status: string;
};
```

**Mutations:**
- Delete: `DELETE /api/locations/routes/${id}` → invalidates `["routes"]` and `["locations"]`

**UI:** Table with columns: From, To, Distance, Duration, Country, Status (Badge), Actions (Edit, Delete). "New Route" button → `/dashboard/routes/new`. Delete uses AlertDialog confirmation.

### Route Editor (Create/Edit)

**Files:**
- Create: `src/components/admin/route-editor.tsx` with `mode="create"`
- Edit: same component with `mode="edit"` + `initialData` from `GET /api/locations/routes/${id}`

**API Endpoints Used:**
- `POST /api/locations/routes` — create (validates via `RouteCreateSchema`)
- `PUT /api/locations/routes/${id}` — update

### Website Rendering

**Route Detail Page:** `GET /${lang}/locations/${country}/${city}/routes/${route}`
- Server Component: `src/app/[lang]/locations/[country]/[city]/routes/[route]/page.tsx`
- Route slug format: `${fromCity}-to-${toCity}` (e.g., `dubai-to-abu-dhabi`)
- Data:
  - `getCountryForRequest(countryParam)` — origin country
  - `getCityForRequest(countryParam, cityParam)` — origin city
  - `resolveCity(originCountry, toRaw)` — destination city (cross-country via `getAllCountries()`)
  - `findRouteData(from.slug, to.slug)` — distance/duration
- Components: `BookingWidget`, inline JSX (hero, breadcrumb, route info cards, city visuals, why-choose, route content, FAQ, CTA)

---

## 8. Users Module

### Dashboard Route

| Route | File | Type | Description |
|---|---|---|---|
| `/dashboard/users` | `src/app/dashboard/users/page.tsx` | Client | List users + invite |

### Data Flow

```
UsersPage component
  ├─ useQuery("users")
  │    └─ GET /api/users
  │         └─ User.find().sort({name:1})
  │              → { items: User[] }  (passwordHash excluded)
  │
  ├─ Invite: POST /api/invitations
  │    └─ { email, roles: ["author"] }
  │
  └─ Delete: DELETE /api/users/${id} → invalidates ["users"]
```

**User shape:**
```typescript
type User = {
  _id: string;
  name: string;
  email: string;
  roles: string[];    // ["admin"] | ["editor"] | ["author"] | ["viewer"]
  isActive: boolean;
};
```

**UI:** Table with columns: Name, Email, Roles (Badge), Status (Badge), Actions (Delete). "Invite User" button opens Dialog with email input. Delete uses AlertDialog confirmation.

### Website Rendering
Users module is admin-only. No public-facing rendering.

---

## 9. Permissions Module

### Dashboard Route

| Route | File | Type | Description |
|---|---|---|---|
| `/dashboard/settings/permissions` | `src/app/dashboard/settings/permissions/page.tsx` | Client | Manage RBAC policies |

### Data Flow

```
PermissionsPage component
  ├─ useQuery("role-policies")
  │    └─ GET /api/role-policies
  │         └─ RolePolicy.find().sort({role:1})
  │              → { items: RolePolicy[] }
  │
  ├─ Create: POST /api/role-policies
  │    └─ { role, permissions }
  │         → upserts (updates if role exists, creates otherwise) → invalidates ["role-policies"]
  │
  └─ Delete: DELETE /api/role-policies/${id} → invalidates ["role-policies"]
```

**RolePolicy shape:**
```typescript
type RolePolicy = {
  _id: string;
  role: string;
  permissions: string[];
};
```

**Available Permissions:**
```
posts.create, posts.read, posts.update, posts.delete
categories.create, categories.read, categories.update, categories.delete
users.create, users.read, users.update, users.delete
settings.read, settings.update
```

**Default Roles:**
| Role | Access |
|---|---|
| admin | Full access to all features |
| editor | Can manage posts and categories |
| author | Can create and edit own posts |
| viewer | Read-only access to dashboard |

**UI:** Table with columns: Role, Permissions (Badge list), Actions (Delete). "Add Role Policy" button opens Dialog with role name input and permission checkboxes.

### Website Rendering
Permissions module is admin-only. No public-facing rendering.

---

## 10. Settings Module

### Dashboard Route

| Route | File | Type | Description |
|---|---|---|---|
| `/dashboard/settings` | `src/app/dashboard/settings/page.tsx` | Client | Site settings + SEO defaults |

### Data Flow

```
SettingsPage component
  ├─ useQuery("settings")
  │    └─ GET /api/settings
  │         └─ Setting.find()
  │              → converts key-value pairs to flat object
  │              → { siteTitle, defaultSeo: { metaTitle, metaDescription } }
  │
  └─ Update: PUT /api/settings
       └─ iterates key-value pairs
            → Setting.findOneAndUpdate({key}, {key, value}, {upsert:true})
            → invalidates ["settings"]
```

**Settings shape:**
```typescript
type Settings = {
  siteTitle: string;
  defaultSeo: {
    metaTitle: string;
    metaDescription: string;
  };
};
```

**UI:** Card with form fields: Site Title, Meta Title, Meta Description. "Save Settings" button triggers PUT mutation.

### Website Rendering
Settings data is used site-wide for SEO metadata and site title. The `Setting` model stores key-value pairs that can be queried by any server component needing global configuration.

---

## 11. Sidebar Navigation

**File:** `src/components/admin/Sidebar.tsx`

### Main Navigation
| Label | URL | Icon |
|---|---|---|
| Dashboard | `/dashboard` | LayoutDashboard |
| Posts | `/dashboard/posts` | FileText |
| Categories | `/dashboard/categories` | FolderTree |
| Services | `/dashboard/services` | CarFront |
| Locations | `/dashboard/locations` | MapPinned |
| Routes | `/dashboard/routes` | Route |
| Users | `/dashboard/users` | Users |
| Permissions | `/dashboard/settings/permissions` | ShieldCheck |
| Settings | `/dashboard/settings` | Settings |

### Blog Template Navigation
| Label | URL | Icon |
|---|---|---|
| Country Blogs | `/dashboard/posts?template=country` | Globe |
| City Blogs | `/dashboard/posts?template=city` | MapPin |
| City-to-City | `/dashboard/posts?template=city-to-city` | Route |
| Airport Blogs | `/dashboard/posts?template=airport` | Plane |

### Footer
- "View Website" link → opens `/` in new tab (`target="_blank"`)

### Note
Active state uses strict equality (`pathname === item.url`), so sub-routes like `/dashboard/posts/new` will not highlight the "Posts" nav item.

---

## 12. Website Rendering Flow

### Language Routing
All public pages are under `src/app/[lang]/` — a dynamic segment supporting `en-US`, `en-GB`, `ar`.

### Data Pipeline: Dashboard → Website

```
┌─────────────────────────────────────────────────────────────┐
│                     ADMIN DASHBOARD                          │
│                                                              │
│  Posts Module ──POST/PUT──→ /api/articles ──→ MongoDB       │
│  Services Module ──POST/PUT──→ /api/services ──→ MongoDB    │
│  Locations Module ──POST/PUT──→ /api/locations ──→ MongoDB  │
│  Routes Module ──POST/PUT──→ /api/locations/routes ──→ MongoDB │
│  Categories Module ──POST/PUT──→ /api/categories ──→ MongoDB │
│  Settings Module ──PUT──→ /api/settings ──→ MongoDB         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       MONGODB                                │
│  Collections: articles, services, countries,                 │
│               locationRoutes, categories,                    │
│               settings, users, rolePolicies                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  WEBSITE (Server Components)                  │
│                                                              │
│  DYNAMIC (from MongoDB):                                     │
│  /${lang}/blog              ← getAllPublishedArticles()       │
│  /${lang}/blog/${slug}      ← fetchAndTranslateArticle()     │
│  /${lang}/services          ← getServiceCards()              │
│  /${lang}/services/${slug}  ← resolveServicePage()           │
│  /${lang}/locations         ← getAllCountries()              │
│  /${lang}/locations/cities  ← getDynamicCityList()          │
│  /${lang}/locations/${country}          ← getCountryForRequest() │
│  /${lang}/locations/${country}/${city}  ← getCityForRequest()    │
│  /${lang}/locations/${country}/${city}/airport/${airport}   │
│                                ← getAirportForRequest()     │
│  /${lang}/locations/${country}/${city}/routes/${route}      │
│                                ← findRouteData()            │
│                                                              │
│  STATIC (from dictionaries):                                 │
│  /${lang}                    ← HeroSection, FleetSection...  │
│  /${lang}/about, /business, /career, /car-service...        │
│  /${lang}/industries/*                                   │
│  /${lang}/terms, /privacy-policy, /imprint, /accessibility  │
│  /${lang}/services/airport-transfers/drop-off|pickup|vip    │
└─────────────────────────────────────────────────────────────┘
```

### Static vs Dynamic Content

| Data | Source |
|---|---|
| Blog articles | DB via `src/lib/blog.ts` (`Article` model) |
| Service pages/FAQs | DB via `src/lib/services.ts` (`Service` model), fallback to dictionary |
| Service cards | DB via `src/lib/services.ts`, fallback to dictionary |
| Locations (countries/cities/airports) | DB via `src/lib/locationData.ts` (`Country` model), fallback to `src/lib/locations.ts` |
| City-to-City routes | DB via `src/lib/locationData.ts` (`LocationRoute` model), fallback to `src/lib/locations.ts` |
| Service categories | DB via `/api/categories` (`SimpleCategory` model) |
| Site settings/SEO | DB via `/api/settings` (`Setting` model) |
| UI text/translations | Static dictionaries (`src/app/[lang]/dictionaries.ts`) |
| Static pages (about, business, etc.) | Dictionary-only, no DB |
| Industries pages | Dictionary-only, no DB |
| Legal pages (terms, privacy, etc.) | Dictionary-only, no DB |
| Airport transfer sub-pages | Dictionary-only (`dict.servicePages.*`) |

### Database Toggle
`isDatabaseEnabled()` from `src/lib/services.ts` / `src/lib/locationData.ts` — when `USE_DATABASE=false`, routes fall back to static data and CRUD operations return errors.

---

## 13. Complete Public Route Map

### All 37 Public-Facing Routes

#### Static Pages (dictionary-only, no DB)

| # | URL Pattern | File | Components |
|---|---|---|---|
| 1 | `/${lang}` | `src/app/[lang]/page.tsx` | HeroSection, EventLogisticsSection, DutyOfCareSection, FleetSection, IndustrySolutionsSection |
| 2 | `/${lang}/about` | `src/app/[lang]/about/page.tsx` | Inline JSX (hero, mission, stats, how-it-works, vehicle classes, FAQ) |
| 3 | `/${lang}/accessibility` | `src/app/[lang]/accessibility/page.tsx` | Inline JSX (static legal statement) |
| 4 | `/${lang}/business` | `src/app/[lang]/business/page.tsx` | Inline JSX (hero, tailored cards, planning, features, quote, awards, contact form) |
| 5 | `/${lang}/career` | `src/app/[lang]/career/page.tsx` | Inline JSX (hero, intro, team stats, departments, benefits) |
| 6 | `/${lang}/car-service` | `src/app/[lang]/car-service/page.tsx` | BookingWidget, inline JSX (hero, features, vehicle classes, FAQ) |
| 7 | `/${lang}/chauffeur-service` | `src/app/[lang]/chauffeur-service/page.tsx` | BookingWidget, inline JSX (hero, features, vehicle classes, CTA) |
| 8 | `/${lang}/city-to-city` | `src/app/[lang]/city-to-city/page.tsx` | BookingWidget, inline JSX (hero, routes grid, top cities, FAQ) |
| 9 | `/${lang}/corporations` | `src/app/[lang]/corporations/page.tsx` | Inline JSX (hero, image grid, reliability, invoices, FAQ) |
| 10 | `/${lang}/ground-transportation` | `src/app/[lang]/ground-transportation/page.tsx` | BookingWidget, inline JSX (hero, comprehensive, personal chauffeur) |
| 11 | `/${lang}/imprint` | `src/app/[lang]/imprint/page.tsx` | Inline JSX (static legal notice) |
| 12 | `/${lang}/limousine-service` | `src/app/[lang]/limousine-service/page.tsx` | BookingWidget, inline JSX (hero, features, vehicle classes, FAQ) |
| 13 | `/${lang}/partners` | `src/app/[lang]/partners/page.tsx` | PartnersClient |
| 14 | `/${lang}/press/releases` | `src/app/[lang]/press/releases/page.tsx` | PressReleasesClient |
| 15 | `/${lang}/privacy-policy` | `src/app/[lang]/privacy-policy/page.tsx` | Inline JSX (static privacy policy) |
| 16 | `/${lang}/strategic-partnerships` | `src/app/[lang]/strategic-partnerships/page.tsx` | Inline JSX (hero, partnership cards, API integrations, awards) |
| 17 | `/${lang}/sustainability` | `src/app/[lang]/sustainability/page.tsx` | Inline JSX (hero, stats, EV, carbon offset, partners) |
| 18 | `/${lang}/terms` | `src/app/[lang]/terms/page.tsx` | Inline JSX (static terms, 14 sections) |
| 19 | `/${lang}/travel-agencies` | `src/app/[lang]/travel-agencies/page.tsx` | Inline JSX (hero, commission, vehicles, API, FAQ) |

#### Dynamic Pages (from MongoDB)

| # | URL Pattern | File | Data Function |
|---|---|---|---|
| 20 | `/${lang}/blog` | `src/app/[lang]/blog/page.tsx` | `getAllPublishedArticles(locale)` |
| 21 | `/${lang}/blog/${slug}` | `src/app/[lang]/blog/[slug]/page.tsx` | `fetchAndTranslateArticle(slug, locale, preview)` |
| 22 | `/${lang}/services` | `src/app/[lang]/services/page.tsx` | `getServiceCards(slugOrder)` |
| 23 | `/${lang}/services/${slug}` | `src/app/[lang]/services/[slug]/page.tsx` | `resolveServicePage(slug, lang)` |
| 24 | `/${lang}/locations` | `src/app/[lang]/locations/page.tsx` | `getAllCountries()` |
| 25 | `/${lang}/locations/cities` | `src/app/[lang]/locations/cities/page.tsx` | `getDynamicCityList()` |
| 26 | `/${lang}/locations/${country}` | `src/app/[lang]/locations/[country]/page.tsx` | `getCountryForRequest(countryParam)` |
| 27 | `/${lang}/locations/${country}/${city}` | `src/app/[lang]/locations/[country]/[city]/page.tsx` | `getCityForRequest(countryParam, cityParam)` |
| 28 | `/${lang}/locations/${country}/${city}/airport/${airport-name}` | `src/app/[lang]/locations/[country]/[city]/airport/[airport-name]/page.tsx` | `getAirportForRequest(countryParam, cityParam, airportParam)` |
| 29 | `/${lang}/locations/${country}/${city}/routes/${route}` | `src/app/[lang]/locations/[country]/[city]/routes/[route]/page.tsx` | `findRouteData(from.slug, to.slug)` |

#### Airport Transfer Sub-Routes (dictionary-only)

| # | URL Pattern | File | Data Source |
|---|---|---|---|
| 30 | `/${lang}/services/airport-transfers` | `src/app/[lang]/services/[slug]/page.tsx` | `resolveServicePage("airport-transfers", lang)` |
| 31 | `/${lang}/services/airport-transfers/drop-off` | `src/app/[lang]/services/airport-transfers/drop-off/page.tsx` | `dict.servicePages.airportTransferDropOff` |
| 32 | `/${lang}/services/airport-transfers/pickup` | `src/app/[lang]/services/airport-transfers/pickup/page.tsx` | `dict.servicePages.airportTransferPickup` |
| 33 | `/${lang}/services/airport-transfers/vip-tarmac` | `src/app/[lang]/services/airport-transfers/vip-tarmac/page.tsx` | `dict.servicePages.airportTransferVipTarmac` |

#### Industries Pages (dictionary-only)

| # | URL Pattern | File | Data Source |
|---|---|---|---|
| 34 | `/${lang}/industries` | `src/app/[lang]/industries/page.tsx` | `dict.industries.categories` |
| 35 | `/${lang}/industries/aviation` | `src/app/[lang]/industries/aviation/page.tsx` | `dict.industryPages.aviation` |
| 36 | `/${lang}/industries/corporate-enterprise` | `src/app/[lang]/industries/corporate-enterprise/page.tsx` | `dict.industryPages.corporateEnterprise` |
| 37 | `/${lang}/industries/government-diplomatic` | `src/app/[lang]/industries/government-diplomatic/page.tsx` | `dict.industryPages.governmentDiplomatic` |
| 38 | `/${lang}/industries/hospitality` | `src/app/[lang]/industries/hospitality/page.tsx` | `dict.industryPages.hospitality` |

### BookingWidget Usage

The `BookingWidget` component appears on these pages:
- `/${lang}/car-service`
- `/${lang}/chauffeur-service`
- `/${lang}/city-to-city`
- `/${lang}/ground-transportation`
- `/${lang}/limousine-service`
- `/${lang}/locations/${country}/${city}/routes/${route}`

---

## 14. API Routes Reference

### Articles (Posts)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/articles` | List articles (query: page, limit, q, category, status, templateType) |
| POST | `/api/articles` | Create article |
| GET | `/api/articles/${id}` | Get single article |
| PUT | `/api/articles/${id}` | Update article |
| DELETE | `/api/articles/${id}` | Delete article |

### Services

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/services` | List services (query: page, limit, q, status) |
| POST | `/api/services` | Create service |
| GET | `/api/services/${id}` | Get single service |
| PUT | `/api/services/${id}` | Update service |
| DELETE | `/api/services/${id}` | Delete service |
| POST | `/api/services/seed` | Seed default services |

### Locations

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/locations` | Get all countries + routes |
| POST | `/api/locations` | Create country (with cities/airports) |
| GET | `/api/locations/${id}` | Get single country |
| PUT | `/api/locations/${id}` | Update country |
| DELETE | `/api/locations/${id}` | Delete country (cascading) |
| GET | `/api/locations/meta` | Lightweight country list with counts |
| GET | `/api/locations/cities` | Get all cities |
| GET | `/api/locations/airports` | Get all airports |
| GET | `/api/locations/check` | Check location existence |

### Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/locations/routes` | List all routes |
| POST | `/api/locations/routes` | Create route |
| GET | `/api/locations/routes/${id}` | Get single route |
| PUT | `/api/locations/routes/${id}` | Update route |
| DELETE | `/api/locations/routes/${id}` | Delete route |

### Categories

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/categories` | List all categories |
| POST | `/api/categories` | Create category |
| PUT | `/api/categories/${id}` | Update category |
| DELETE | `/api/categories/${id}` | Delete category |

### Users

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users` | List all users |
| POST | `/api/users` | Create user |
| DELETE | `/api/users/${id}` | Delete user |

### Invitations

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/invitations` | Send user invitation |

### Role Policies

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/role-policies` | List role policies |
| POST | `/api/role-policies` | Create/update role policy |
| DELETE | `/api/role-policies/${id}` | Delete role policy |

### Settings

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/settings` | Get all settings |
| PUT | `/api/settings` | Update settings (upsert key-value pairs) |

### Dashboard

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/dashboard/metrics` | Aggregated dashboard metrics |

### Auth

| Method | Endpoint | Description |
|---|---|---|
| * | `/api/auth/[...nextauth]` | NextAuth.js handler |

---

## 15. Data Models

All models are in `src/lib/models/`:

| Model | Collection | Key Fields |
|---|---|---|
| `Article` | articles | title, slug, status, templateType, country, city, airportName, routeFrom, routeTo, views, date, content, seo_metadata, articleMedia, category, authorName, readTime, excerpt |
| `Service` | services | slug, title, desc, status, showInMenu, order, heroImage, faqs[], seo |
| `Country` | countries | code, slug, name, description, status, cities[] (nested: slug, name, airports[], aliases) |
| `LocationRoute` | locationroutes | fromCity, toCity, fromCityName, toCityName, distance, duration, countrySlug, status |
| `SimpleCategory` | simplecategories | slug, label |
| `User` | users | name, email, passwordHash, roles[], isActive |
| `RolePolicy` | rolepolicies | role, permissions[] |
| `Setting` | settings | key, value |

### Validations

Located in `src/lib/validations/`:
- `ServiceCreateSchema`, `ServiceUpdateSchema`, `ServiceListQuerySchema` → `src/lib/validations/service.ts`
- `CountryCreateSchema`, `RouteCreateSchema`, `slugFromName` → `src/lib/validations/location.ts`

---

## 16. Library Files (Server-Side Data)

These files power the public website rendering:

| File | Key Functions | MongoDB Model | Fallback |
|---|---|---|---|
| `src/lib/blog.ts` | `getAllPublishedArticles`, `fetchAndTranslateArticle`, `getRelatedArticles`, `getArticleBySlug` | `Article` | None (DB-only) |
| `src/lib/services.ts` | `getAllPublishedServices`, `getServiceBySlug`, `resolveServicePage`, `getServiceCards`, `getNavServices`, `seedServicesIfEmpty` | `Service` | Dictionary data |
| `src/lib/locationData.ts` | `getAllCountries`, `getCountryBySlug`, `getCountryForRequest`, `getCityForRequest`, `getAirportForRequest`, `getAllRoutes`, `getRoutesForCountry`, `getRoutesForCity`, `findRouteData`, `getDynamicCityList`, `seedLocationsIfEmpty` | `Country`, `LocationRoute` | `src/lib/locations.ts` static arrays |
| `src/lib/locations.ts` | `resolveCountry`, `resolveCity`, `resolveAirport`, `routeSlugOf`, `parseRouteSlug`, `cityUrl`, `countryUrl`, `airportUrl`, `routeUrl`, `COUNTRIES[]`, `CITY_ROUTES[]` | None | N/A (static data) |
| `src/lib/translate.ts` | `translateText(text, targetLocale)`, `translateHtml(html, targetLocale)`, `needsTranslation()` | None | N/A (MyMemory API) |

---

## 17. Module Interactions Quick Reference

```
Dashboard Module    API Endpoint                  DB Model          Website Page(s)
─────────────────   ───────────────────────────   ────────────────  ─────────────────────────────
Posts               /api/articles                 Article           /${lang}/blog, /${lang}/blog/${slug}
Categories          /api/categories               SimpleCategory    (used in post filtering)
Services            /api/services                 Service           /${lang}/services, /${lang}/services/${slug}
                                                                      /${lang}/services/airport-transfers/*
Locations           /api/locations, /meta         Country           /${lang}/locations, /${lang}/locations/cities
                                                                      /${lang}/locations/[country]
                                                                      /${lang}/locations/[country]/[city]
                                                                      /${lang}/locations/[country]/[city]/airport/[airport-name]
Routes              /api/locations/routes         LocationRoute     /${lang}/locations/[country]/[city]/routes/[route]
Users               /api/users, /invitations      User              (admin only)
Permissions         /api/role-policies            RolePolicy        (admin only)
Settings            /api/settings                 Setting           (site-wide SEO/title)
Metrics             /api/dashboard/metrics        (aggregation)     /dashboard (overview cards)
```

---

## Dashboard Route Summary (17 Pages)

| # | Dashboard Route | File Path | Type |
|---|---|---|---|
| 1 | `/dashboard` | `src/app/dashboard/page.tsx` | Server |
| 2 | `/dashboard/posts` | `src/app/dashboard/posts/page.tsx` | Client |
| 3 | `/dashboard/posts/new` | `src/app/dashboard/posts/new/page.tsx` | Server |
| 4 | `/dashboard/posts/[id]/edit` | `src/app/dashboard/posts/[id]/edit/page.tsx` | Client |
| 5 | `/dashboard/categories` | `src/app/dashboard/categories/page.tsx` | Client |
| 6 | `/dashboard/services` | `src/app/dashboard/services/page.tsx` | Client |
| 7 | `/dashboard/services/new` | `src/app/dashboard/services/new/page.tsx` | Server |
| 8 | `/dashboard/services/[id]/edit` | `src/app/dashboard/services/[id]/edit/page.tsx` | Client |
| 9 | `/dashboard/locations` | `src/app/dashboard/locations/page.tsx` | Client |
| 10 | `/dashboard/locations/new` | `src/app/dashboard/locations/new/page.tsx` | Server |
| 11 | `/dashboard/locations/[id]` | `src/app/dashboard/locations/[id]/page.tsx` | Client |
| 12 | `/dashboard/routes` | `src/app/dashboard/routes/page.tsx` | Client |
| 13 | `/dashboard/routes/new` | `src/app/dashboard/routes/new/page.tsx` | Server |
| 14 | `/dashboard/routes/[id]` | `src/app/dashboard/routes/[id]/page.tsx` | Client |
| 15 | `/dashboard/users` | `src/app/dashboard/users/page.tsx` | Client |
| 16 | `/dashboard/settings` | `src/app/dashboard/settings/page.tsx` | Client |
| 17 | `/dashboard/settings/permissions` | `src/app/dashboard/settings/permissions/page.tsx` | Client |

---

## File Inventory

### Dashboard Pages (17 files + 1 layout)

| File |
|---|
| `src/app/dashboard/layout.tsx` |
| `src/app/dashboard/page.tsx` |
| `src/app/dashboard/posts/page.tsx` |
| `src/app/dashboard/posts/new/page.tsx` |
| `src/app/dashboard/posts/[id]/edit/page.tsx` |
| `src/app/dashboard/categories/page.tsx` |
| `src/app/dashboard/services/page.tsx` |
| `src/app/dashboard/services/new/page.tsx` |
| `src/app/dashboard/services/[id]/edit/page.tsx` |
| `src/app/dashboard/locations/page.tsx` |
| `src/app/dashboard/locations/new/page.tsx` |
| `src/app/dashboard/locations/[id]/page.tsx` |
| `src/app/dashboard/routes/page.tsx` |
| `src/app/dashboard/routes/new/page.tsx` |
| `src/app/dashboard/routes/[id]/page.tsx` |
| `src/app/dashboard/users/page.tsx` |
| `src/app/dashboard/settings/page.tsx` |
| `src/app/dashboard/settings/permissions/page.tsx` |

### Website Pages (38 files)

| File |
|---|
| `src/app/[lang]/page.tsx` |
| `src/app/[lang]/about/page.tsx` |
| `src/app/[lang]/accessibility/page.tsx` |
| `src/app/[lang]/blog/page.tsx` |
| `src/app/[lang]/blog/[slug]/page.tsx` |
| `src/app/[lang]/business/page.tsx` |
| `src/app/[lang]/career/page.tsx` |
| `src/app/[lang]/car-service/page.tsx` |
| `src/app/[lang]/chauffeur-service/page.tsx` |
| `src/app/[lang]/city-to-city/page.tsx` |
| `src/app/[lang]/corporations/page.tsx` |
| `src/app/[lang]/ground-transportation/page.tsx` |
| `src/app/[lang]/imprint/page.tsx` |
| `src/app/[lang]/limousine-service/page.tsx` |
| `src/app/[lang]/partners/page.tsx` |
| `src/app/[lang]/press/releases/page.tsx` |
| `src/app/[lang]/privacy-policy/page.tsx` |
| `src/app/[lang]/strategic-partnerships/page.tsx` |
| `src/app/[lang]/sustainability/page.tsx` |
| `src/app/[lang]/terms/page.tsx` |
| `src/app/[lang]/travel-agencies/page.tsx` |
| `src/app/[lang]/services/page.tsx` |
| `src/app/[lang]/services/[slug]/page.tsx` |
| `src/app/[lang]/services/airport-transfers/drop-off/page.tsx` |
| `src/app/[lang]/services/airport-transfers/pickup/page.tsx` |
| `src/app/[lang]/services/airport-transfers/vip-tarmac/page.tsx` |
| `src/app/[lang]/locations/page.tsx` |
| `src/app/[lang]/locations/cities/page.tsx` |
| `src/app/[lang]/locations/[country]/page.tsx` |
| `src/app/[lang]/locations/[country]/[city]/page.tsx` |
| `src/app/[lang]/locations/[country]/[city]/airport/[airport-name]/page.tsx` |
| `src/app/[lang]/locations/[country]/[city]/routes/[route]/page.tsx` |
| `src/app/[lang]/industries/page.tsx` |
| `src/app/[lang]/industries/aviation/page.tsx` |
| `src/app/[lang]/industries/corporate-enterprise/page.tsx` |
| `src/app/[lang]/industries/government-diplomatic/page.tsx` |
| `src/app/[lang]/industries/hospitality/page.tsx` |
