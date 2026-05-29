# EInvoiceAtlas

> Global Electronic Invoice Regulatory Intelligence

A static content platform for navigating mandatory e-invoicing requirements by country, standard, and ERP system. Built with Astro + TypeScript + Tailwind CSS.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

## Project Structure

```
einvoiceatlas/
├── docs/                          # Research & strategy documents
│   ├── user-intent-map.md         # User personas, needs, journeys
│   ├── content-system.md          # Page templates, content types
│   └── source-policy.md           # Source priority, citation rules
├── src/
│   ├── components/
│   │   ├── layout/               # Header, Footer
│   │   ├── ui/                   # StatusBadge, Button, AISummaryBox, etc.
│   │   ├── blocks/               # Hero, ImplementationChecklist, etc.
│   │   ├── cards/                # CountryCard, StandardCard, etc.
│   │   └── forms/                # ShortlistForm
│   ├── data/                     # Typed content data files
│   │   ├── site.ts               # Site config, navigation, footer
│   │   ├── countries.ts          # Country dossiers (7 countries)
│   │   ├── standards.ts          # Standard references (6 standards)
│   │   ├── erpSystems.ts        # ERP dossiers (5 systems)
│   │   ├── providers.ts          # Route types (4 routes)
│   │   ├── userJourneys.ts      # Journey definitions (7 paths)
│   │   └── contentHooks.ts      # Lead capture hooks (7 hooks)
│   ├── layouts/
│   │   └── BaseLayout.astro     # Root layout with SEO
│   ├── pages/
│   │   ├── index.astro           # Homepage
│   │   ├── playground.astro       # Module preview page
│   │   ├── robots.txt.ts         # Robots.txt
│   │   ├── sitemap.xml.ts        # Sitemap
│   │   ├── llms.txt.ts           # LLM-readable index
│   │   ├── countries/index.astro # Country listing
│   │   ├── standards/index.astro # Standards listing
│   │   ├── erp/index.astro       # ERP listing
│   │   └── routes/index.astro    # Routes listing
│   ├── styles/
│   │   └── global.css            # Design system tokens + base styles
│   └── utils/
│       ├── seo.ts                 # SEO helpers
│       └── schema.ts              # Schema.org builders
├── scripts/
│   └── check-content.mjs          # Content validation script
└── public/
    └── favicon.svg                # Site favicon
```

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server at localhost:4321 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run check:content` | Run content validation script |

## Design System

The visual language is **Regulatory Intelligence OS** — warm off-white paper background, deep slate typography, restrained status colors, and strong editorial/document hierarchy.

See `/playground` for a full preview of all UI modules.

## Content Validation

Run `npm run check:content` to validate:

- Build readiness (required files exist)
- Prohibited phrases (guaranteed compliance, best provider, official guide, etc.)
- Data file structure completeness
- SEO/GEO file presence (sitemap, robots, llms, favicon)
- Disclaimer presence

## Deployment

Target: Cloudflare Pages

```bash
npm run build
# Upload dist/ to Cloudflare Pages
```

## Next Steps

Recommended pages to build next (from Phase 2):

1. `/countries/france` — France country dossier (full)
2. `/countries/germany` — Germany country dossier
3. `/countries/belgium` — Belgium country dossier (upcoming mandate)
4. `/standards/en-16931` — EN 16931 standard reference
5. `/standards/peppol-bis-3` — Peppol BIS 3 standard reference
6. `/standards/xrechnung` — XRechnung standard reference
7. `/erp/sap` — SAP S/4HANA dossier
8. `/erp/odoo` — Odoo dossier
9. `/routes/peppol-network` — Peppol route detail page
10. `/routes/clearing-house` — Clearing house route detail page
