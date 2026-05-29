# EInvoiceAtlas — Content System

> Version: 1.0 | Date: 2026-05-29 | Purpose: Define all content types, page templates, field structures, internal linking logic, and CTA strategies.

---

## 1. Content Types

### CT1 — Country Dossier
**Purpose:** The primary content unit. One dossier per country. Serves as the single source of truth for that country's e-invoicing requirements.
**Volume target:** Expandable to 50+ countries.

### CT2 — Standard Reference
**Purpose:** Technical reference for each e-invoicing standard or format.
**Volume target:** ~15-20 standards (Peppol BIS 3, EN 16931, XRechnung, Factur-X,ubl 2.1, etc.).

### CT3 — ERP Dossier
**Purpose:** System-specific implementation guidance linking ERP capabilities to country requirements.
**Volume target:** ~20 major ERP/accounting systems (SAP, Oracle, NetSuite, Odoo, Sage, etc.).

### CT4 — Provider Route Guide
**Purpose:** Educational content on how e-invoicing routes work, before vendor selection.
**Volume target:** 3-4 route types (Peppol Network, Direct API, Government Portal/PDRT, Hybrid).

### CT5 — Checklist / Readiness Block
**Purpose:** Structured action-planning content. Can be embedded across pages or used as standalone hooks.
**Volume target:** Per-country, per-ERP, and general.

### CT6 — FAQ / Glossary Block
**Purpose:** Supplementary operational support content. Embedded in relevant pages.
**Volume target:** Per-country, per-standard, per-ERP.

### CT7 — Homepage Hub
**Purpose:** Navigation and orientation for all three primary entry tracks (Country, Standard, ERP).

---

## 2. Page Templates

### T1 — Homepage Template
**Route:** `/`
**Purpose:** Regulatory Intelligence OS entry point.

**Sections (in order):**
1. Header (navigation)
2. Hero — H1: "Global Electronic Invoice Regulatory Intelligence" (or equivalent precise headline)
3. Global Mandate Overview — live count of countries, mandates, formats
4. Upcoming Mandates — deadline-sorted cards (next 12 months)
5. Browse by Country — searchable/filterable country grid
6. Browse by Standard — standards cards
7. Browse by ERP / System — ERP grid
8. Free High-Value Hooks — 3-4 hook CTAs (checklist, shortlist, comparison)
9. How to Use This Site — guidance panel
10. Sources & Disclaimer
11. Footer

**SEO fields:**
- Title: `EInvoiceAtlas — Global E-Invoicing Regulatory Intelligence`
- Description: `Navigate mandatory e-invoicing requirements by country, standard, and ERP system. Independent educational resource for finance, tax, and compliance teams.`
- H1: `Global Electronic Invoice Regulatory Intelligence`
- Canonical: `/`
- Schema: `WebSite` + `Organization`

---

### T2 — Country Dossier Template
**Route:** `/countries/[country-slug]`
**Purpose:** Single country decision dossier.

**Sections (in order):**
1. Header + Breadcrumb
2. AI Summary Box — 3-5 sentence synthesis of mandate status
3. Quick Answer Box — top 3 Q&A for scanning
4. Status Badge — Current phase, effective date, enforcement status
5. Who Is Affected — company types, turnover thresholds, transaction types
6. Effective Dates / Rollout Phases — timeline with phases and milestones
7. Required Formats / Standards — which formats are accepted, mandate level
8. ERP / Accounting System Impact — which ERPs are affected, specific config notes
9. Implementation Checklist — ordered action list
10. Provider Route / Route Type — which route(s) apply, brief explanation
11. Common Mistakes — top 5 errors and how to avoid them
12. Related Standards — links to relevant standard pages
13. Related ERP Pages — links to relevant ERP pages
14. Official Sources — citation list with links
15. Last Reviewed — date and editor note
16. Disclaimer Box
17. CTA Block — checklist + provider shortlist
18. Related Countries — other countries in same region or similar mandate type

**SEO fields:**
- Title: `[Country] E-Invoicing Mandate — Requirements, Formats & Deadlines | EInvoiceAtlas`
- Description: `Understand [Country]'s mandatory e-invoicing requirements: effective dates, accepted formats, ERP impact, and implementation checklist. Independent reference.`
- H1: `[Country] E-Invoicing Mandate`
- Canonical: `/countries/[country-slug]`
- Schema: `Article` + `WebSite` (FAQPage schema is deprecated for Google Search as of May 2026 — do not rely on it for rich results)

> **Note on FAQ Schema:** Google deprecated FAQ rich results on May 7, 2026. FAQ content is still valuable for user experience, but FAQPage schema should not be used as a primary SEO strategy. Instead, rely on: H1, description, AI Summary, Quick Answer, sources, last reviewed, disclaimer, internal links, and checklist/CTA for organic visibility.

---

### T3 — Standard Reference Template
**Route:** `/standards/[standard-slug]`
**Purpose:** Technical reference asset for a format or standard.

**Sections (in order):**
1. Header + Breadcrumb
2. AI Summary — what the standard is, where it is mandated, why it matters
3. Quick Answer — top 3 questions
4. What It Is — definition, version history, governing body
5. Where It Is Used — countries and mandate contexts
6. Why It Matters — compliance implications, interoperability
7. Country Links — all countries using this standard
8. ERP Implications — which ERP systems support it natively
9. Data Field Overview — key mandatory fields, structure
10. Validation / Routing Considerations — Peppol network if applicable, validation rules
11. Common Mistakes — top errors in implementation
12. Related Standards — other related standards
13. Related ERP Pages — ERP systems supporting it
14. Official Sources — spec documents, governing body links
15. Last Reviewed
16. Disclaimer
17. CTA Block — route guide + country page links

**SEO fields:**
- Title: `[Standard Name] — Format Specification, Countries & ERP Support | EInvoiceAtlas`
- Description: `Technical reference for [Standard]: supported countries, mandatory fields, ERP integration notes, and validation requirements.`
- H1: `[Standard Name] Reference`
- Canonical: `/standards/[standard-slug]`

---

### T4 — ERP Dossier Template
**Route:** `/erp/[erp-slug]`
**Purpose:** ERP-specific implementation guidance.

**Sections (in order):**
1. Header + Breadcrumb
2. AI Summary — e-invoicing status and capabilities of this ERP
3. Quick Answer — top 3 questions about this ERP
4. ERP Quick Answer — native support level, certified add-ons, configuration complexity
5. Applicable Countries — which countries' mandates affect users of this ERP
6. Standards Involved — which formats this ERP supports
7. Data Mapping Implications — how standard fields map to ERP fields
8. Export / Validation / Archive Considerations — output format, validation, long-term archive
9. Implementation Checklist — ERP-specific steps
10. Related Country Pages — links to affected country dossiers
11. Related Standard Pages — links to relevant standards
12. Provider / Integration Options — which providers support this ERP
13. Official Sources — ERP vendor documentation links
14. Last Reviewed
15. Disclaimer
16. CTA Block — provider shortlist + implementation checklist

**SEO fields:**
- Title: `[ERP Name] E-Invoicing — Configuration, Countries & Formats | EInvoiceAtlas`
- Description: `[ERP Name] e-invoicing setup guide: supported countries and formats, configuration steps, data mapping, and certified providers.`
- H1: `[ERP Name] E-Invoicing`
- Canonical: `/erp/[erp-slug]`

---

### T5 — Provider Route Page Template
**Route:** `/routes` (and variants `/routes/[route-type]`)
**Purpose:** Educate before converting. Explain route types, then offer shortlist.

**Sections (in order):**
1. Header + Breadcrumb
2. Hero — "Choose Your E-Invoicing Route Before Choosing a Provider"
3. Route Decision Aid — 4-question decision tool (static version)
4. Route Type 1: Peppol Network — explanation, pros, requirements, who it's for
5. Route Type 2: Direct API — explanation, requirements, who it's for
6. Route Type 3: Government Portal / PDRT — explanation, requirements, who it's for
7. Route Type 4: Hybrid / Multi-Route — explanation, who it's for
8. Why Route First — educational section, why route matters more than vendor
9. Format + Route Combination Matrix — which formats go with which routes
10. Provider Shortlist Request Form — collects: Country, ERP, Route preference, Company size, Timeline
11. Related Country Pages — links
12. Related Standard Pages — links
13. Disclaimer

**SEO fields:**
- Title: `E-Invoicing Route Guide — Peppol, API, Portal & More | EInvoiceAtlas`
- Description: `Understand the four e-invoicing routes: Peppol network, direct API, government portal, and hybrid. Find the right approach for your country and ERP.`
- H1: `Choose Your E-Invoicing Route`

---

### T6 — Checklist / Hook Block Template
**Purpose:** Reusable action-oriented block embedded across pages.

**Variants:**
- Country readiness checklist
- ERP implementation roadmap
- Standard comparison checklist
- General e-invoicing readiness

**Fields per checklist item:**
- Order number
- Category (Legal / Technical / Operational / Financial)
- Item title
- Description (1-2 sentences)
- Is critical (boolean) — highlighted if true
- External resource link (optional)
- Completion state placeholder (future feature)

---

## 3. Field Structure

### Country Schema
```typescript
interface Country {
  slug: string;                  // URL-safe identifier
  name: string;                  // Full country name
  isoCode: string;               // ISO 3166-1 alpha-2
  region: string;                // Europe, Asia, LATAM, etc.
  status: 'active' | 'mandatory' | 'voluntary' | 'upcoming' | 'phasing';
  effectiveDate: string | null;  // ISO date
  mandatePhase: string;          // e.g., "Phase 1", "Full mandate"
  enforcementDate: string | null;
  affectedParties: string[];     // B2G, B2B, all businesses, etc.
  turnoverThreshold: string | null; // e.g., "Over €10,000 annual turnover"
  formats: string[];             // Slugs of required formats
  routeTypes: string[];         // peppol, direct-api, portal, hybrid
  erpImpact: string[];           // Slugs of affected ERPs
  implementationChecklist: ChecklistItem[];
  commonMistakes: string[];
  officialSources: Source[];
  lastReviewed: string;          // ISO date
  quickAnswer: QuickAnswer[];    // Top 3 Q&A
  aiSummary: string;             // 3-5 sentence synthesis
  relatedCountrySlugs: string[];
}
```

### Standard Schema
```typescript
interface Standard {
  slug: string;
  name: string;                  // Full name
  shortName: string;             // Abbreviated
  category: 'universal' | 'regional' | 'national';
  governingBody: string;
  description: string;
  countriesUsing: string[];       // Country slugs
  erpSupport: string[];          // ERP slugs
  mandatoryFields: number;
  isPeppolBased: boolean;
  isPdfBased: boolean;
  version: string;
  quickAnswer: QuickAnswer[];
  aiSummary: string;
  commonMistakes: string[];
  officialSources: Source[];
  lastReviewed: string;
  relatedStandardSlugs: string[];
}
```

### ERP Schema
```typescript
interface ERPSystem {
  slug: string;
  name: string;
  vendor: string;
  category: 'enterprise' | 'mid-market' | 'smb' | 'open-source';
  description: string;
  nativeEInvoiceSupport: boolean;
  supportedFormats: string[];    // Standard slugs
  certifiedAddons: string[];
  configurationComplexity: 'low' | 'medium' | 'high';
  applicableCountries: string[]; // Country slugs
  quickAnswer: QuickAnswer[];
  aiSummary: string;
  dataMappingNotes: string;
  implementationChecklist: ChecklistItem[];
  officialSources: Source[];
  lastReviewed: string;
  relatedERPSlugs: string[];
}
```

### Provider Route Schema
```typescript
interface ProviderRoute {
  slug: string;
  name: string;
  description: string;
  howItWorks: string;
  requirements: string[];
  pros: string[];
  cons: string[];
  bestFor: string[];
  formatsCompatible: string[];
  countriesApplicable: string[];
  complexity: 'low' | 'medium' | 'high';
  costIndicators: string;
}
```

### Shared Field Types
```typescript
interface QuickAnswer {
  question: string;
  answer: string;
  order: number;
}

interface ChecklistItem {
  order: number;
  category: 'legal' | 'technical' | 'operational' | 'financial';
  title: string;
  description: string;
  isCritical: boolean;
  externalResource?: string;
}

interface Source {
  title: string;
  url: string;
  type: 'government' | 'standard-body' | 'erp-vendor' | 'regulatory' | 'legal';
  lastAccessed: string;
  note?: string;
}
```

---

## 4. Internal Linking Logic

### Country Page Links To:
- All Related Standard pages (`/standards/[slug]`)
- All Related ERP pages (`/erp/[slug]`)
- Provider route page (`/routes`)
- Implementation checklist (embedded)
- Related country pages (same region or similar mandate)
- Official sources (external)

### Standard Page Links To:
- All Country pages where this standard applies
- All ERP pages where this standard is supported
- Provider route page (`/routes`)
- Related standard pages (e.g., Peppol BIS 3 → EN 16931)

### ERP Page Links To:
- All Country pages where this ERP is affected
- All Standard pages supported by this ERP
- Provider route page (`/routes`)
- Implementation checklist (embedded)

### Route Page Links To:
- Country pages relevant to each route type
- Standard pages relevant to each route type
- Provider shortlist form (embedded)

### Homepage Links To:
- All Country pages (via grid)
- All Standard pages (via grid)
- All ERP pages (via grid)
- Provider route page (`/routes`)
- Hook blocks (checklist, comparison, shortlist)

---

## 5. CTA Strategy

### CTA Hierarchy

| CTA | Location | Purpose | Copy Variant |
|---|---|---|---|
| Get Readiness Checklist | Country page, Homepage | Lead capture | "Get [Country] Readiness Checklist" |
| Request Provider Shortlist | All content pages | Lead capture | "Request Provider Shortlist" |
| Download Standard Comparison | Standard pages, Homepage | Lead capture | "Download Standard Comparison" |
| Find My Route | Route page, Homepage | Education + lead | "Find My E-Invoicing Route" |
| Check Your Obligation | Country page | Quick engagement | "Check If This Applies to You" |
| See Full Timeline | Country page | Engagement | "See Full Rollout Timeline" |
| Explore [Country] | Standard/ERP pages | Navigation | "Explore [Country] Requirements" |
| View [Standard] Details | Country/ERP pages | Navigation | "View [Standard] Details" |
| Related ERP Pages | Country/Standard pages | Navigation | "View [ERP] E-Invoicing Setup" |

### CTA Placement Rules

1. Every page must have **at least one primary CTA** (checklist or shortlist)
2. Every page must have **at least two navigation CTAs** (related pages)
3. CTAs should appear **after the user has consumed the core content**
4. CTAs should never appear before the user understands **what the page is about**
5. Related page links should appear **contextually** — not as a generic "Related" footer

### CTA Tone Guidelines

- Never use: "Sign up now", "Get started", "Try free", "Best [X]", "Guaranteed compliance"
- Always use: "Get [specific thing]", "Request [specific thing]", "Explore [specific thing]"
- CTAs are educational — users should know exactly what they get before clicking
