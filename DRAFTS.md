# AB Limo - Page Drafts & Design Recovery System

This documentation describes the drafts backup and recovery system for AB Limo. All services, location countries, routes, and city layouts are saved as versioned, modular JSON draft files under `drafts/`, allowing full recovery or reapplication to MongoDB at any time.

---

## 1. Directory Structure

```text
drafts/
  ├── services/                                # All 66 Services saved as standalone drafts
  │   ├── airport-coach-transfers.json
  │   ├── airport-transfers.json
  │   ├── artists-transportation.json
  │   ├── aviation-mobility.json
  │   ├── bus-charter.json
  │   ├── bus-coach-hire.json
  │   ├── chauffeur-hailing.json
  │   ├── chauffeur-vip.json
  │   ├── city-to-city.json
  │   ├── city-transfers.json
  │   ├── coach-charter.json
  │   ├── conference-transportation.json
  │   ├── construction-mobility.json
  │   ├── construction-staff-transport.json
  │   ├── corporate-fleet.json
  │   ├── corporate-shuttle.json
  │   ├── corporate-transportation.json
  │   ├── crew-transportation.json
  │   ├── cross-border-mobility.json
  │   ├── education-mobility.json
  │   ├── embassy-transportation.json
  │   ├── energy-mobility.json
  │   ├── event-mice-mobility.json
  │   ├── event-transportation.json
  │   ├── executive-chauffeur.json
  │   ├── executive-corporate-mobility.json
  │   ├── exhibition-transportation.json
  │   ├── financial-roadshows.json
  │   ├── government-mobility.json
  │   ├── ground-transportation.json
  │   ├── group-coach-charter.json
  │   ├── healthcare-mobility.json
  │   ├── hospitality-mobility.json
  │   ├── hotel-shuttle.json
  │   ├── hourly-chauffeur.json
  │   ├── industrial-mobility.json
  │   ├── intercity-transfers.json
  │   ├── limousine-services.json
  │   ├── luxury-vip-mobility.json
  │   ├── marine-mobility.json
  │   ├── media-entertainment-mobility.json
  │   ├── media-production-mobility.json
  │   ├── medical-transportation.json
  │   ├── mice-transportation.json
  │   ├── mini-bus-charter.json
  │   ├── mining-mobility.json
  │   ├── mining-staff-transport.json
  │   ├── ngo-mobility.json
  │   ├── oil-gas-mobility.json
  │   ├── premium-lifestyle.json
  │   ├── real-estate-mobility.json
  │   ├── religious-tourism.json
  │   ├── retail-mobility.json
  │   ├── school-transport.json
  │   ├── sports-entertainment-mobility.json
  │   ├── sports-team-transportation.json
  │   ├── staff-transport.json
  │   ├── technology-mobility.json
  │   ├── tourism-dmc.json
  │   ├── tourism-leisure.json
  │   ├── tourism-roadshows.json
  │   ├── tourism-transportation.json
  │   ├── university-transport.json
  │   ├── vip-delegation.json
  │   ├── vip-diplomatic-government.json
  │   └── workforce-mobility.json
  │
  ├── locations/
  │   ├── countries/                           # Country page templates (7 countries)
  │   │   ├── bahrain.json
  │   │   ├── germany.json
  │   │   ├── kuwait.json
  │   │   ├── oman.json
  │   │   ├── qatar.json
  │   │   ├── saudi-arabia.json
  │   │   └── united-arab-emirates.json
  │   │
  │   ├── routes/                              # Route transfer templates (7 countries)
  │   │   ├── bahrain.json
  │   │   ├── germany.json
  │   │   ├── kuwait.json
  │   │   ├── oman.json
  │   │   ├── qatar.json
  │   │   ├── saudi-arabia.json
  │   │   └── united-arab-emirates.json
  │   │
  │   ├── legacy-cities/                       # Previous 10–12 section city layouts (41 cities)
  │   │   ├── saudi-arabia/ (riyadh.json, jeddah.json, mecca.json, medina.json, ...)
  │   │   ├── united-arab-emirates/ (dubai.json, abu-dhabi.json, sharjah.json, ...)
  │   │   ├── qatar/ (doha.json, lusail.json, al-khor.json, al-wakrah.json)
  │   │   ├── kuwait/ (kuwait-city.json, hawalli.json, farwaniya.json, ...)
  │   │   ├── bahrain/ (manama.json, riffa.json, muharraq.json)
  │   │   └── oman/ (muscat.json, salalah.json, sohar.json, nizwa.json)
  │   │
  │   └── unified-cities/                      # Modern Riyadh-style 10-section city layouts
  │       ├── saudi-arabia/
  │       ├── united-arab-emirates/
  │       ├── qatar/
  │       ├── kuwait/
  │       ├── bahrain/
  │       └── oman/
  │
  └── README.md
```

---

## 2. Reapply Command Guide (`scripts/apply-draft-templates.ts`)

The reapply utility allows restoring any draft page directly into MongoDB Atlas.

### Safe Preview (Dry Run)
Always test commands with `--dry-run` to preview changes without modifying the database:
```bash
npx tsx scripts/apply-draft-templates.ts --services --dry-run
npx tsx scripts/apply-draft-templates.ts --locations --dry-run
```

---

### Reapplying Services

#### 1. Reapply a single service by slug:
```bash
npx tsx scripts/apply-draft-templates.ts --service=corporate-transportation
npx tsx scripts/apply-draft-templates.ts --service=event-transportation
npx tsx scripts/apply-draft-templates.ts --service=airport-transfers
```

#### 2. Reapply all 66 services:
```bash
npx tsx scripts/apply-draft-templates.ts --services
```

---

### Reapplying Locations

#### 1. Reapply a single city layout (Legacy vs Unified):
```bash
# Apply previous legacy layout for Riyadh:
npx tsx scripts/apply-draft-templates.ts --file=drafts/locations/legacy-cities/saudi-arabia/riyadh.json

# Apply modern unified layout for Riyadh:
npx tsx scripts/apply-draft-templates.ts --file=drafts/locations/unified-cities/saudi-arabia/riyadh.json
```

#### 2. Reapply a single country page:
```bash
npx tsx scripts/apply-draft-templates.ts --file=drafts/locations/countries/saudi-arabia.json
npx tsx scripts/apply-draft-templates.ts --file=drafts/locations/countries/united-arab-emirates.json
```

#### 3. Reapply a route template:
```bash
npx tsx scripts/apply-draft-templates.ts --file=drafts/locations/routes/saudi-arabia.json
```

#### 4. Reapply all cities within a country:
```bash
npx tsx scripts/apply-draft-templates.ts --country=saudi-arabia
npx tsx scripts/apply-draft-templates.ts --country=united-arab-emirates
```

---

### Direct File Execution
You can pass any draft JSON file directly:
```bash
npx tsx scripts/apply-draft-templates.ts --file=drafts/services/ground-transportation.json
```

---

## 3. Draft File Schema Reference

### Services (`drafts/services/{slug}.json`)
```json
{
  "pageType": "service",
  "slug": "corporate-transportation",
  "title": "Corporate & Staff Transportation",
  "subtitle": "Reliable executive transport and employee commute programs",
  "desc": "AB delivers turnkey corporate mobility solutions across Saudi Arabia and the GCC.",
  "heroImage": "https://...",
  "breadcrumb": "Corporate Transportation",
  "features": [ ... ],
  "cardsHeading": "...",
  "cardsDesc": "...",
  "cards": [ ... ],
  "sections": [ ... ],
  "faqs": [ ... ],
  "ctaTitle": "Ready to Streamline Your Corporate Mobility?",
  "ctaDesc": "Contact our dedicated corporate account managers today.",
  "ctaLabel": "Open a Corporate Account",
  "ctaHref": "/corporate-accounts",
  "pageSections": [ ... ],
  "seo": {
    "metaTitle": "Corporate Transportation Services | AB Limo",
    "metaDescription": "...",
    "ogImage": "..."
  },
  "status": "published",
  "showInMenu": true,
  "order": 1,
  "locale": "en",
  "exportedAt": "2026-11-10T12:20:55.000Z"
}
```

### Locations (`drafts/locations/{type}/{refKey}.json`)
```json
{
  "pageType": "city",
  "refKey": "saudi-arabia/riyadh",
  "countrySlug": "saudi-arabia",
  "citySlug": "riyadh",
  "path": "/locations/saudi-arabia/riyadh",
  "layoutName": "legacy-10-to-12-sections",
  "description": "Previous layout for riyadh (saudi-arabia)",
  "exportedAt": "2026-11-10T11:52:17.382Z",
  "templates": {
    "en-US": [ ... ],
    "en-GB": [ ... ],
    "ar": [ ... ]
  }
}
```

