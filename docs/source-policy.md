# EInvoiceAtlas — Source Policy

> Version: 1.0 | Date: 2026-05-29 | Purpose: Define how sources are selected, cited, and maintained. Governs what can and cannot be said about content accuracy, official status, and compliance guidance.

---

## 1. Source Priority Hierarchy

All content on EInvoiceAtlas must be grounded in the following source types, in priority order:

### Tier 1 — Primary Official Sources (Always preferred)

| Source Type | Examples | Usage |
|---|---|---|
| Government tax authority | DGFIP (France), Fiscus (Belgium), BMF (Germany) | Mandate dates, format requirements, legal obligations |
| Legislative text | National laws, EU directives, regulations | Legal basis, mandate scope, penalties |
| Tax agency / revenue authority | HMRC (UK), NTA (Japan), SAT (Mexico) | Format specs, filing requirements, portal registration |
| Standard governing body | OASIS (Peppol), CEN (EN 16931) | Standard specs, versioning, validation rules |
| ERP vendor official docs | SAP Help Portal, Oracle Docs, Odoo Documentation | ERP configuration, native support, certified add-ons |

### Tier 2 — Secondary Authoritative Sources (Used when Tier 1 unavailable)

| Source Type | Examples | Usage |
|---|---|---|
| EU official publications | EU e-Invoicing portal, EUR-Lex | EU directive context, Peppol mandate |
| International standard bodies | UN/CEFACT, ISO | UBL specs, cross-border context |
| Government digital agencies | Digital Agency France, BSI Germany | XRechnung spec hosting, Peppol infrastructure |
| Tax advisory bodies | Big 4 publications, official tax institutes | Interpretation guidance (marked as such) |
| Industry associations | EESPA, Vanmag | Provider ecosystem, market context |

### Tier 3 — Reference Sources (Used for background, must be flagged)

| Source Type | Examples | Usage |
|---|---|---|
| Industry media | CFO Magazine, Tax Journal | Context, timelines, market commentary |
| Vendor / provider content | Provider blogs, whitepapers | Provider ecosystem overview (flagged as vendor-sourced) |
| Analyst reports | Gartner, Forrester | Market context (flagged as analyst perspective) |
| Community resources | Peppol directory, user forums | Additional reference (flagged) |

---

## 2. Allowed and Prohibited Expressions

### Always Allowed

- "According to [Source Name], published by [Authority] on [Date]..."
- "The [Country] tax authority specifies..."
- "As documented in [Standard] by [Governing Body]..."
- "The following information is based on [Official Source]..."
- "This page was last reviewed against official sources on [Date]..."

### Never Allowed

| Prohibited Expression | Reason | Replace With |
|---|---|---|
| "Official guide to..." | Implies site is government-affiliated | "Independent reference for..." |
| "Official resource for..." | Misleads about affiliation | "Educational resource based on..." |
| "Guaranteed compliance" | Cannot legally guarantee | "Supports compliance preparation" |
| "Best e-invoicing provider" | Subjective, unverified | "Vetted provider shortlist" |
| "Guaranteed accurate" | Cannot guarantee absolute accuracy | "Reviewed against official sources" |
| "This is the law" (without citation) | Legal advice territory | "Under [Law Citation], the requirement is..." |
| "100% compliant" | Cannot verify | "Designed to meet the requirements of..." |
| "Approved by [Government]" | Unless we have explicit approval | "Referenced in [Government Publication]" |
| "Expert-verified" (without naming experts) | Vague claim | "Content reviewed against official sources" |

---

## 3. Disclaimer Rules

### Required Disclaimer Placement

Every page must include a disclaimer. The disclaimer must appear:

1. **On every page** — In the footer or in a dedicated block near the bottom
2. **On every form/hook block** — Adjacent to the form, before the submit button
3. **On every content page** — Before or after the main content, clearly visible

### Standard Disclaimer Text

```
EInvoiceAtlas is an independent educational resource. We aggregate and 
synthesize information from official and authoritative sources, but we 
are not a law firm, tax advisor, or government agency. Nothing on this 
site constitutes legal, tax, or compliance advice.

E-invoicing requirements change frequently. Always verify current 
obligations directly with the relevant tax authority or legal counsel 
before making compliance decisions.

Sources are listed on each page under "Official Sources." All content 
is reviewed against official publications but may not reflect the most 
recent regulatory changes.
```

### Form-Specific Disclaimer

```
By submitting this form, you agree to receive a response to your 
inquiry. We do not sell or share your information. This service is 
provided as-is for informational purposes.
```

---

## 4. Source Citation Format

### Per-Page Source Section

Each content page must include a "Official Sources" section with:

```markdown
## Official Sources

1. **[Title of Document]**
   Issuing body: [Authority Name]
   URL: [Direct link]
   Last accessed: [Date]
   Note: [Optional context, e.g., "Primary legal basis"]

2. **[Title of Document]**
   Issuing body: [Authority Name]
   URL: [Direct link]
   Last accessed: [Date]
```

### Source URL Requirements

- URL must be a direct link to the official document, not a search engine result
- URL should not be a PDF hosted on a non-official domain without clear attribution
- If a URL becomes invalid, note it as "Link last verified: [Date]" and provide archive link if available

---

## 5. Fact Update Process

### Review Cadence

| Content Type | Review Frequency | Trigger |
|---|---|---|
| Country dossiers | Every 6 months minimum | Any regulatory change announcement |
| Standard references | Every 12 months | Version release or mandate change |
| ERP dossiers | Every 12 months | Major ERP version update |
| Provider route content | Every 12 months | Major regulatory or Peppol policy change |
| Homepage mandate overview | Every 3 months | Deadline approach, mandate activation |

### Update Documentation

Each page tracks:
- `lastReviewed`: ISO date of last official source review
- `lastUpdated`: ISO date of any content change
- `reviewNote`: Brief note on what triggered the last review

---

## 6. Content Accuracy Standards

### What We Commit To

- Every factual claim must have a cited source in the "Official Sources" section
- Dates, thresholds, and mandate scopes must match official documents
- Standard specifications must reference the official specification document
- ERP information must reference the ERP vendor's official documentation

### What We Explicitly Do NOT Claim

- We do not claim to be the authoritative government source
- We do not claim the information is 100% complete or current
- We do not claim legal or tax advice authority
- We do not claim vendor endorsements that do not exist
- We do not claim all countries are covered (clearly note scope)

---

## 7. External Link Policy

- Only link to official government, tax authority, or standard body domains when possible
- Link to ERP vendor official documentation pages
- Mark links to vendor/provider content with a note indicating the source
- Do not link to content that contradicts our editorial stance without noting the conflict
- Do not use redirect links that obscure the final destination (no link shorteners for official sources)

---

## 8. GEO / AI-Readable Content Standards

### Per-Page Requirements

Every page must include:

1. **Unique H1** — Specific to this page's content, not generic
2. **Unique meta description** — 150-160 characters, describes page content specifically
3. **Canonical URL** — Self-referential canonical tag
4. **Breadcrumb data** — Structured breadcrumb for navigation
5. **Structured data** — Relevant schema.org type (`Article`, `WebSite`, `Organization`). **Do not use `FAQPage` schema** — Google deprecated FAQ rich results on May 7, 2026.
6. **Source section** — Named "Official Sources" with real URLs
7. **Last reviewed date** — Visible on page or in structured data
8. **Disclaimer** — Adjacent to content, not buried only in global footer

### AI Summary Box Standards

The AI Summary box on each page must:
- Be grounded in the cited sources listed on the page
- Use cautious language ("may", "according to", "typically")
- Not make definitive legal statements without clear legal citation
- Be labeled as "AI-Generated Summary" to be transparent
- Include a note that the summary is for orientation only and official sources prevail

### SEO Strategy (Post-FAQ Deprecation)

As of May 7, 2026, Google no longer displays FAQ rich results. The following elements are the primary SEO/GEO drivers for each page:

| Element | Purpose |
|---|---|
| Unique H1 | Single, specific heading that matches search intent |
| Meta description | 150-160 char summary, includes key terms |
| Canonical URL | Prevents duplicate content issues |
| Article schema | Structured data for rich results |
| AI Summary | Quick-scan answer for users and AI crawlers |
| Quick Answer | Top 3 Q&A visible above the fold |
| Sources section | Credibility and E-E-A-T signals |
| Last reviewed date | Freshness signal |
| Disclaimer | Trust and compliance transparency |
| Internal links | Site architecture and depth signals |
| Checklist CTA | Engagement signals and next-step clarity |

FAQ content should be retained for user experience value but should **not** be cited as a primary SEO/GEO strategy in reports or roadmaps.

---

## 9. Geographic and Language Scope

### Countries Covered (Phase 1 Target)

The site focuses initially on countries with active or upcoming mandates in:
- European Union (PEPPOL/CESOP countries, SAF-T mandates)
- United Kingdom
- Select Asia-Pacific markets (India, Japan, South Korea, Australia, Singapore)
- Select Latin America (Brazil, Mexico, Chile)
- Select Middle East (Saudi Arabia, UAE)

### Language

- Primary language: English
- Content is English-language; local language terms are used where relevant (e.g., "Factur-X", "XRechnung", "FatturaPA")
- URLs are English-language slugs (country name in English)
