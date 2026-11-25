# Drafts & Design Recovery System

This directory stores complete page design, structure, and content drafts as versioned JSON files. It covers:
1. **All Services** (`drafts/services/`): Complete page sections, SEO, metadata, FAQs, and cards for all 66 service offerings.
2. **All Locations** (`drafts/locations/`):
   - **Countries** (`drafts/locations/countries/`): Page templates for all 7 countries (Bahrain, Germany, Kuwait, Oman, Qatar, Saudi Arabia, UAE).
   - **Routes** (`drafts/locations/routes/`): Intercity and regional transfer route templates.
   - **Legacy City Layouts** (`drafts/locations/legacy-cities/`): The previous 10–12 section city designs.
   - **Unified City Layouts** (`drafts/locations/unified-cities/`): The modern Riyadh-style 10-section city designs.

---

## Directory Overview

```text
drafts/
  ├── services/
  │   ├── airport-transfers.json
  │   ├── chauffeur-vip.json
  │   ├── corporate-transportation.json
  │   ├── event-transportation.json
  │   ├── bus-coach-hire.json
  │   ├── workforce-mobility.json
  │   ├── tourism-transportation.json
  │   ├── ground-transportation.json
  │   └── ... (all 66 services)
  │
  ├── locations/
  │   ├── countries/
  │   │   ├── bahrain.json
  │   │   ├── germany.json
  │   │   ├── kuwait.json
  │   │   ├── oman.json
  │   │   ├── qatar.json
  │   │   ├── saudi-arabia.json
  │   │   └── united-arab-emirates.json
  │   │
  │   ├── routes/
  │   │   ├── bahrain.json
  │   │   ├── germany.json
  │   │   ├── kuwait.json
  │   │   ├── oman.json
  │   │   ├── qatar.json
  │   │   ├── saudi-arabia.json
  │   │   └── united-arab-emirates.json
  │   │
  │   ├── legacy-cities/
  │   │   ├── saudi-arabia/ (riyadh.json, jeddah.json, ...)
  │   │   ├── united-arab-emirates/ (dubai.json, abu-dhabi.json, ...)
  │   │   ├── qatar/ (doha.json, lusail.json, ...)
  │   │   ├── kuwait/ (kuwait-city.json, hawalli.json, ...)
  │   │   ├── bahrain/ (manama.json, riffa.json, ...)
  │   │   └── oman/ (muscat.json, salalah.json, ...)
  │   │
  │   └── unified-cities/
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

## How to Reapply Any Draft to the Database

When you want to restore, roll back, or reapply any draft designs to live MongoDB, run `scripts/apply-draft-templates.ts`.

### 1. Dry Run (Test without writing to database)
```bash
# Preview what would be applied across all drafts
npx tsx scripts/apply-draft-templates.ts --dry-run
```

### 2. Services Commands
```bash
# Preview or apply a single service:
npx tsx scripts/apply-draft-templates.ts --service=corporate-transportation
npx tsx scripts/apply-draft-templates.ts --service=event-transportation

# Apply all 66 services:
npx tsx scripts/apply-draft-templates.ts --services
```

### 3. Locations Commands
```bash
# Apply a specific city from either legacy or unified drafts:
npx tsx scripts/apply-draft-templates.ts --file=drafts/locations/legacy-cities/saudi-arabia/riyadh.json
npx tsx scripts/apply-draft-templates.ts --file=drafts/locations/unified-cities/saudi-arabia/riyadh.json

# Apply a single country page:
npx tsx scripts/apply-draft-templates.ts --file=drafts/locations/countries/saudi-arabia.json

# Apply a single route page:
npx tsx scripts/apply-draft-templates.ts --file=drafts/locations/routes/saudi-arabia.json

# Apply all locations in a specific country:
npx tsx scripts/apply-draft-templates.ts --country=saudi-arabia
```

### 4. Direct File Apply
You can pass any JSON draft file anywhere:
```bash
npx tsx scripts/apply-draft-templates.ts --file=drafts/services/chauffeur-vip.json
```
