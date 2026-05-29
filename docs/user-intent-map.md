# EInvoiceAtlas — User Intent Map

> Version: 1.0 | Date: 2026-05-29 | Purpose: Foundation for information architecture, content classification, and traffic acquisition strategy.

---

## 1. User Personas & Core Needs

### 1.1 CFO / Finance Lead

**Profile:** Owns P&L, balance sheet, cash flow. Rarely reads regulation directly. Delegates technical details. Cares about deadlines, costs, and risk exposure.

**Search scenarios:**
- "France e-invoicing mandate 2024 impact on finance"
- "mandatory e-invoicing countries 2026 financial close"
- "Peppol e-invoicing cost estimate"
- "e-invoicing mandate board presentation"

**Core questions:**
- What countries require e-invoicing and when?
- What is the financial and operational risk of non-compliance?
- What is the estimated implementation cost?
- Do we have enough time before the deadline?

**Highest-value pages:**
- Homepage (mandate overview)
- Country dossier (deadlines, affected parties, consequences)
- Implementation checklist (budget and timeline planning)

**Entry point:** Homepage or direct country search.

**Next step:** Scans country dossier for deadline → forwards to implementation owner → asks for readiness assessment.

**Traffic承接:** Homepage mandate overview → Country deadline card → "Who is affected" → CTA to implementation checklist.

---

### 1.2 Tax / Compliance Manager

**Profile:** Reads regulations. Responsible for VAT compliance, tax reporting accuracy. Needs precise format requirements, validation rules, and audit trails.

**Search scenarios:**
- "France e-invoicing format 2024 mandatory"
- "EN 16931 invoice schema XML"
- "XRechnung mandatory fields"
- "Factur-X PDF/A-3 requirements"
- "e-invoicing retention period EU"
- "CTC (Continuous Transaction Controls) countries list"

**Core questions:**
- What format exactly must invoices use?
- What fields are mandatory vs optional?
- How long must archived invoices be kept?
- What validation rules apply?
- Are there CTC (government portal) requirements?

**Highest-value pages:**
- Country dossier (format requirements, validation, archive rules)
- Standard reference (EN 16931, Peppol BIS, XRechnung)
- FAQ / Common mistakes

**Entry point:** Standard search or country + format search.

**Next step:** Downloads format spec → shares with ERP team → requests provider route guidance for validation.

**Traffic承接:** Standard reference page → Country links → ERP implications section → Provider route CTA.

---

### 1.3 ERP / Implementation Owner

**Profile:** Technically responsible for ERP configuration, integration, data mapping, testing. Needs technical specs, field mappings, API documentation references.

**Search scenarios:**
- "Odoo e-invoicing Peppol setup"
- "SAP e-invoicing XRechnung configuration"
- "NetSuite Peppol access point integration"
- "Sage e-invoicing France 2024"
- "e-invoicing ERP connector comparison"
- "SAP Fiori e-invoice output management"

**Core questions:**
- Does my ERP support the required format natively?
- What configuration or customization is needed?
- Are there certified add-ons or connectors?
- What data fields map to the standard?
- How do we handle validation, rejection, and retry?

**Highest-value pages:**
- ERP dossier (specific to their system)
- Country page (applicable ERP impact)
- Standard page (data field mapping)
- Implementation checklist

**Entry point:** ERP + country + e-invoicing search.

**Next step:** Reads ERP dossier → checks country requirements → reviews implementation checklist → requests provider shortlist.

**Traffic承接:** ERP page → Country page (applicable) → Standard spec → Implementation checklist → Provider shortlist CTA.

---

### 1.4 Accounts Payable / Accounts Receivable Operator

**Profile:** Daily invoice processing. Needs to understand routing, receipt, error handling, portal access. Not responsible for compliance — but affected by change.

**Search scenarios:**
- "how to send e-invoice Peppol"
- "e-invoice rejected format error correction"
- "how to receive e-invoice from supplier"
- "e-invoicing portal registration"
- " Peppol AP/AR workflow steps"

**Core questions:**
- How do I send/receive compliant invoices?
- What do I do if an invoice is rejected?
- Do I need special software or portal access?
- How does this change my daily workflow?

**Highest-value pages:**
- Provider route page (how to send/receive)
- Country dossier (workflow, portal registration)
- FAQ / Common mistakes

**Entry point:** Operational question search.

**Next step:** Learns about routes → realizes needs provider setup → requests provider shortlist.

**Traffic承接:** FAQ/Operational page → Route type explanation → Provider shortlist form → Country page CTA.

---

### 1.5 Consultant / Agency / Solution Partner

**Profile:** Sells implementation services, compliance audits, or e-invoicing solutions. Needs structured, credible reference content to share with clients or to build proposals.

**Search scenarios:**
- "Peppol BIS 3 full specification"
- "country e-invoicing mandate comparison Europe"
- "e-invoicing provider landscape 2025"
- "EN 16931 implementation guide"
- "e-invoicing readiness assessment framework"

**Core questions:**
- What are the exact requirements per country?
- Which standards are required where?
- What is the provider ecosystem like?
- What is the typical implementation scope?

**Highest-value pages:**
- Standard reference (technical depth)
- Country dossiers (structured comparison)
- Provider route content (ecosystem overview)
- Readiness checklist (audit/assessment framework)

**Entry point:** Technical standard search or landscape comparison.

**Next step:** Uses content to build client proposals → may partner or get commissioned → uses shortlist tool for routing.

**Traffic承接:** Standard reference → Country examples → Provider landscape → Checklist (as deliverable framework) → CTA.

---

### 1.6 Cross-border Seller / International Expansion Team

**Profile:** Expanding into new markets. Needs to understand e-invoicing obligations before entering a country. Less concerned with deep technical specs, more with "do we need this?"

**Search scenarios:**
- "do we need e-invoicing if selling to [country]"
- "[country] e-invoicing foreign company requirement"
- "B2G e-invoicing EU directive 2014/55/EU"
- "e-invoicing requirement cross-border Europe"

**Core questions:**
- Does this apply to us as a foreign seller?
- Are we B2G-only or also B2B?
- What's the minimum we need to do?
- What happens if we don't comply?

**Highest-value pages:**
- Country dossier ("Who is affected" section)
- Standard reference (format if applicable)
- Provider route (simplest entry path)

**Entry point:** Country + cross-border / foreign company search.

**Next step:** Reads "Who is affected" → determines applicability → gets implementation checklist → shortlist CTA.

**Traffic承接:** Country "Who is affected" → "Effective date" → Implementation checklist → Provider shortlist.

---

## 2. Content Classification System

### Priority Matrix

| Category | User Need | Frequency | Complexity | Priority |
|---|---|---|---|---|
| Country mandate lookup | All personas | High | Medium | P0 |
| Standard / format understanding | Tax/ERP/Consultant | High | High | P0 |
| ERP / accounting system impact | ERP/Finance/CFO | High | High | P0 |
| Provider route / vendor selection | AP/AR/Consultant | High | Medium | P0 |
| Checklist / readiness / planning | CFO/ERP/Consultant | Medium | Medium | P1 |
| FAQ / common mistakes | AP/AR/Compliance | Medium | Low | P2 |

### Category Definitions

#### C1 — Country Mandate Lookup (P0)
**Purpose:** The primary decision-making unit. Each country = one dossier.
**Content:** Mandate status, effective dates, phases, affected parties, formats, consequences, official sources.
**Templates:** Country page, Upcoming mandates section, Deadline alert card.

#### C2 — Standard / Format Understanding (P0)
**Purpose:** Reference asset for format specs, not a glossary.
**Content:** What the standard is, where it is used, field requirements, validation rules, routing implications, common mistakes.
**Templates:** Standard reference page, Comparison brief.

#### C3 — ERP / Accounting System Impact (P0)
**Purpose:** Bridge between regulation and technical implementation.
**Content:** ERP quick answer, applicable countries, standards involved, data mapping, export/validation/archive considerations, implementation checklist.
**Templates:** ERP dossier page, ERP section block.

#### C4 — Provider Route / Vendor Selection (P0)
**Purpose:** Guide users to the right routing approach before selecting a tool.
**Content:** Route type explanation (Peppol, direct API, portal), decision logic, what each route requires, what users get from submitting a shortlist request.
**Templates:** Provider route page, Shortlist CTA block, Route decision aid.

#### C5 — Checklist / Readiness / Planning (P1)
**Purpose:** High-value lead magnet and user action driver.
**Content:** Step-by-step readiness assessment, implementation timeline, pre-requisites, key decisions.
**Templates:** Checklist block, Readiness section, "Who is affected?" matrix.

#### C6 — FAQ / Common Mistakes (P2)
**Purpose:** Supplementary trust and operational support content.
**Content:** Top questions per country/standard/ERP, common error codes, correction procedures, glossary.
**Templates:** FAQ accordion, Common mistakes block.

---

## 3. High-Value Hook Design

### Framework Adaptation for B2B Compliance/EInvoice

The "free high-value hook" methodology adapted for EInvoiceAtlas:

1. **精准需求拆解** → Map each persona to a specific "what should I do?" question
2. **内容主题模板化** → Every hook follows the same component structure
3. **设计高价值钩子** → Each hook resolves a real decision point, not just awareness
4. **矩阵化投放** → Hooks appear contextually in relevant pages, not just homepage
5. **私域转化** → Hook submission connects to a realistic next step

### Hook Definitions

#### H1 — Country Readiness Checklist
**Trigger:** User lands on a country page and understands the mandate.
**Value proposition:** "Get a structured 10-point readiness assessment for [Country] e-invoicing."
**What they get:** A structured checklist covering legal status, ERP capability, format selection, provider route, timeline, budget, internal training, archive policy, testing, go-live.
**Placement:** Country page — after "Who is affected" + "Implementation checklist" sections. Also on homepage "Get readiness checklist" CTA.
**CTA copy:** "Get [Country] Readiness Checklist" — links to form or download.
**Conversion goal:** Form submission → connects to provider shortlist or consultation routing.

#### H2 — ERP Implementation Checklist
**Trigger:** User lands on an ERP page or searches for implementation guidance.
**Value proposition:** "ERP-specific implementation roadmap for [ERP System] + [Country]."
**What they get:** Structured checklist: configuration steps, format mapping, testing, validation, integration points, go-live.
**Placement:** ERP dossier page — after "Implementation checklist" section. Country + ERP combined pages.
**CTA copy:** "Get [ERP] Implementation Roadmap for [Country]".

#### H3 — Provider Shortlist Request
**Trigger:** User understands route type and needs vendor options.
**Value proposition:** "Get matched with vetted providers for [Route Type] in [Country]."
**What they get:** 3-5 shortlisted providers with route type match, rough capability summary, contact approach.
**Placement:** Provider route page, Country page (bottom CTA), ERP page (bottom CTA), Standard page.
**CTA copy:** "Request Provider Shortlist". Form collects: Country, ERP system, Route preference, Company size, Timeline.
**Why it works:** Users are ready to evaluate vendors — this saves them research time.

#### H4 — Standard Comparison Brief
**Trigger:** User is confused about Peppol vs EN 16931 vs XRechnung vs Factur-X.
**Value proposition:** "Download: Standard comparison brief — which format applies where."
**What they get:** Side-by-side table: standard, countries using it, mandate level, Peppol coverage, field count, PDF compatibility, typical use case.
**Placement:** Standard reference page, Homepage standards section.
**CTA copy:** "Download Standard Comparison Brief".

#### H5 — "Who Is Affected?" Quick Matrix
**Trigger:** User searches "e-invoicing [country]" but isn't sure if it applies to them.
**Value proposition:** "Instantly check: does [Country]'s e-invoicing mandate apply to your business?"
**What they get:** 3-question matrix (company type, turnover threshold, transaction type) → result telling them if/how they're affected.
**Placement:** Country page — above the fold, prominently.
**CTA:** "Check Your Obligation" — inline in page, not a separate form.

#### H6 — Rollout Timeline Snapshot
**Trigger:** User wants to understand phased rollout and key dates.
**Value proposition:** "Visual timeline: [Country]'s e-invoicing rollout phases and deadlines."
**What they get:** Structured timeline with phases, effective dates, mandatory vs voluntary periods, penalties.
**Placement:** Country page hero section, Homepage upcoming mandates section.
**CTA copy:** "See Full Timeline" (scrolls to timeline section).

#### H7 — Format / Routing Decision Aid
**Trigger:** User knows they need e-invoicing but doesn't know which route or format to pick.
**Value proposition:** "Answer 4 questions → get your recommended e-invoicing route + format."
**What they get:** Decision tree result: route type (Peppol / API / Portal), suggested format, key pre-requisites.
**Placement:** Provider route page, Homepage route section.
**CTA copy:** "Find My Route".

---

## 4. User Journey Simulations

### Path A — Country Regulation Entry

```
Search intent: "France e-invoicing mandate 2026"
Entry:         Country page (France)
First view:    AI Summary + Quick Answer + "Who is affected" + Effective dates
Problem solved: User knows if they're affected and when
Next click:    "Required formats and standards" → Standard page (Factur-X / EN 16931)
                ↓
                ↓ or "Implementation checklist" → Checklist block
                ↓ or "Provider route" → Provider route CTA
End state:     Request Provider Shortlist / Download Readiness Checklist
```

**Why this path makes sense:** User is in evaluation mode — they found a credible source, got clarity on obligation, and are ready to understand next steps.

---

### Path B — Standard Understanding Entry

```
Search intent: "Peppol BIS 3 explained"
Entry:         Standard page (Peppol BIS 3)
First view:    What it is + Where it is used + Why it matters
Problem solved: User understands Peppol as a network vs format
Next click:    "Countries using Peppol BIS 3" → filtered country list
                ↓
                ↓ or "ERP implications" → ERP page
                ↓ or "Validation and routing" → detail section
                ↓ or "Common mistakes" → FAQ block
End state:     CTA to Provider Shortlist / Country page → Implementation Checklist
```

**Why this path makes sense:** User is in learning mode — standard page provides context, then naturally routes to country or ERP specifics.

---

### Path C — ERP Implementation Entry

```
Search intent: "Odoo e-invoicing Germany"
Entry:         ERP page (Odoo) — Germany filter
First view:    ERP Quick Answer + Applicable countries + Standards involved
Problem solved: User knows Odoo's native e-invoicing capability and Germany-specific requirements
Next click:    "Germany XRechnung requirements" → Germany country page
                ↓
                ↓ or "Data mapping implications" → detail section
                ↓ or "Implementation checklist" → checklist block
                ↓ or "Provider / integration options" → provider route CTA
End state:     Implementation Checklist → Provider Shortlist Request
```

**Why this path makes sense:** ERP owner is already technical — they want to confirm capability and get a structured next step.

---

### Path D — Purchase Intent Entry

```
Search intent: "best e-invoicing provider Belgium"
Entry:         Provider route content / route explanation page
First view:    Route type decision guide + "Why route first" explanation
Problem solved: User understands they should pick route before vendor
Next click:    "Belgium e-invoicing requirements" → Belgium country page
                ↓
                ↓ or "Shortlist request form" → form
                ↓ or "Provider landscape overview" → section
End state:     Submit shortlist request → (future: matched provider list)
```

**Why this path makes sense:** Purchase-intent users are often seduced by vendor lists without understanding route. This page educates first, then converts.

---

### Path E — Time-Pressured Entry

```
Search intent: "Belgium e-invoicing 2026 deadline"
Entry:         Country page (Belgium) — deadline-focused view
First view:    AI Summary + Effective date banner + "Who is affected" + Phases
Problem solved: User knows the deadline and whether they're in the first wave
Next click:    "Implementation checklist" → checklist block
                ↓
                ↓ or "Required formats" → standard reference
                ↓ or "ERP impact" → ERP page
                ↓ or "Provider shortlist" → CTA
End state:     Download Readiness Checklist → Provider Shortlist
```

**Why this path makes sense:** Urgency-driven users need rapid clarity and immediate action path. Clear deadline + checklist + shortlist is the fastest route.

---

### Path F — Broad Intent Entry

```
Search intent: "e-invoicing requirements Europe"
Entry:         Homepage
First view:    Hero (mission statement) + Global mandate overview + Browse entry points
Problem solved: User orients to the site and sees the structured pathways
Next click:    "Browse by Country" → country grid with filters
                ↓ or "Browse by Standard" → standards grid
                ↓ or "Browse by ERP" → ERP grid
                ↓ or "Free Readiness Checklist" → hook block
                ↓ or "How to use this site" → guidance section
                ↓ or "Upcoming mandates" → deadline-driven country cards
End state:     Enters one of the three primary content paths (Country / Standard / ERP)
```

**Why this path makes sense:** Homepage functions as an intelligence hub, not a marketing page. Users self-select into their relevant track.

---

### Path Flow Summary

| Path | Entry Type | Primary Need | Key Destination | CTA |
|---|---|---|---|---|
| A | Country search | Obligation clarity | Standard page or checklist | Provider shortlist |
| B | Standard search | Understanding | Country list or ERP page | Country or provider |
| C | ERP search | Implementation | Country page or checklist | Provider shortlist |
| D | Purchase intent | Vendor selection | Country page or form | Shortlist request |
| E | Deadline urgency | Action priority | Checklist or shortlist | Shortlist request |
| F | Broad intent | Orientation | Country/Standard/ERP grid | Self-selected path |

---

## 5. Traffic Acquisition Strategy

### Search Intent Categories

| Intent Type | Example Queries | Content Response |
|---|---|---|
| Mandate queries | "[country] e-invoicing mandate", "[country] e-invoicing 2026" | Country dossier |
| Format queries | "EN 16931 XML schema", "XRechnung mandatory fields" | Standard reference |
| ERP queries | "[ERP] e-invoicing [country]", "SAP e-invoice configuration" | ERP dossier |
| Provider queries | "best e-invoicing provider [country]", "access point provider" | Provider route page |
| Timeline queries | "[country] e-invoicing deadline", "when does [country] mandate start" | Country timeline section |
| Operational queries | "how to send e-invoice", "Peppol AP workflow" | FAQ + Route guide |
| Planning queries | "e-invoicing readiness checklist", "implementation roadmap" | Checklist hook |
| Comparison queries | "Peppol vs XRechnung", "Factur-X vs EN 16931" | Standard comparison |

### Internal Linking Logic

- Country page → links to all related Standards, all related ERP pages, Checklist hook, Provider route
- Standard page → links to all Countries using it, all ERP systems supporting it, Route guide, Checklist hook
- ERP page → links to all relevant Countries, all relevant Standards, Checklist hook, Provider shortlist
- Checklist/hook blocks → link to Country page, Provider route, and relevant Standard

### External Source Policy (see `source-policy.md`)

All content must reference official sources. No "this is the official guide" language unless it's in the Sources section.
