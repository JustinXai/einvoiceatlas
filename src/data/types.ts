// ============================================================
// EInvoiceAtlas — Shared Types
// All content data types MUST use these interfaces.
// Every factual claim in content MUST be traceable to a Source entry.
// ============================================================

// ---- Source / Citation ----

export type SourceType =
  | 'tax-authority'    // Tax agencies, revenue authorities (e.g., DGFIP, HMRC)
  | 'standard-body'    // OASIS, CEN, OpenPeppol, UN/CEFACT
  | 'government'       // Ministries, digital agencies, official portals
  | 'erp-docs'         // ERP vendor official documentation
  | 'industry-reference'; // Analyst firms, industry associations (flagged as non-official)

export interface Source {
  /** Full title of the official document or page */
  title: string;
  /** Organisation that published this source */
  publisher: string;
  /** Direct URL to the source document or page */
  url: string;
  /** Classification of the source authority level */
  sourceType: SourceType;
  /** ISO date of last access/verification */
  lastChecked: string;
  /** Why this source is cited and what it covers */
  coverage?: string;
}

// ---- Country ----

export interface CountryChecklistItem {
  order: number;
  category: 'legal' | 'technical' | 'operational' | 'financial';
  title: string;
  /** Must explain the action and cite relevant source where applicable */
  description: string;
  isCritical: boolean;
  /** URL to official guidance (optional) */
  externalResource?: string;
}

export interface CountryMilestone {
  phase: string;
  date: string;
  description: string;
  isMandatory: boolean;
}

/** A complete country dossier entry.
 *  Every mandate claim must be verifiable through officialSources.
 *  Related content links enable internal journey navigation.
 */
export interface Country {
  slug: string;
  /** SEO-intent URL slug, e.g. 'france-e-invoicing'. Falls back to slug if absent. */
  urlSlug?: string;
  name: string;
  isoCode: string;
  region: string;
  subRegion?: string;

  // --- Mandate Status ---
  status: 'active' | 'mandatory' | 'voluntary' | 'upcoming' | 'phasing' | 'end-of-life';
  effectiveDate: string | null;
  mandatePhase: string;
  enforcementDate: string | null;
  enforcementStatus: 'strict' | 'lenient' | 'upcoming' | 'unknown';

  // --- Scope ---
  affectedParties: string[];
  turnoverThreshold: string | null;
  invoiceTypes: string[];

  // --- Technical Requirements ---
  formats: string[];          // slugs of required standards
  routeTypes: string[];       // peppol | direct-api | portal | hybrid
  erpImpact: string[];       // slugs of affected ERP systems

  // --- Content ---
  implementationChecklist: CountryChecklistItem[];
  commonMistakes: string[];

  // --- Source Attribution (MANDATORY) ---
  /** Every country entry MUST have at least 1 official source.
   *  Sources are the evidentiary basis for all mandate claims. */
  officialSources: Source[];

  // --- Navigational Relationships ---
  /** Standards this country specifically references or requires */
  relatedStandards: string[];
  /** ERPs with specific country-level implementation notes */
  relatedErpSystems: string[];
  /** The primary lead-capture hook for this country */
  primaryHook: string; // content hook id
  /** Slugs of geographically or regulatory related countries */
  relatedCountrySlugs: string[];

  // --- Dates & Meta ---
  lastReviewed: string;
  upcomingMilestones?: CountryMilestone[];

  // --- Display-Only (no SEO schema — displayed as reference content) ---
  aiSummary: string;
}

// ---- Standard ----

export interface StandardFieldGroup {
  group: string;
  fields: {
    code: string;
    name: string;
    mandatory: boolean;
    note?: string;
  }[];
}

/** A standard reference entry.
 *  All format specifications must be sourced from official spec documents.
 */
export interface Standard {
  slug: string;
  /** SEO-intent URL slug, e.g. 'peppol-bis-3'. Falls back to slug if absent. */
  urlSlug?: string;
  name: string;
  shortName: string;
  category: 'universal' | 'regional' | 'national';
  governingBody: string;
  version: string;
  description: string;

  // --- Applicability ---
  countriesUsing: string[];   // country slugs
  erpSupport: string[];       // erp slugs
  mandatoryFields: number;
  isPeppolBased: boolean;
  isPdfBased: boolean;
  isXmlBased: boolean;
  pdfCompatibility?: string;

  // --- Technical Detail ---
  dataFieldOverview: StandardFieldGroup[];
  validationRules: string[];
  commonMistakes: string[];

  // --- Source Attribution (MANDATORY) ---
  /** At least 1 source from the governing body or spec repository */
  officialSources: Source[];

  // --- Navigational Relationships ---
  /** Countries where this standard is mandated or formally accepted */
  relatedCountries: string[];
  /** Standards that are closely related or build on this one */
  relatedStandardSlugs: string[];

  // --- Dates & Meta ---
  lastReviewed: string;

  // --- Display-Only ---
  aiSummary: string;
  pros: string[];
  cons: string[];
}

// ---- ERP System ----

export interface ERPChecklistItem {
  order: number;
  category: 'legal' | 'technical' | 'operational' | 'financial';
  title: string;
  description: string;
  isCritical: boolean;
}

/** An ERP system dossier entry.
 *  ERP-specific notes should reference ERP vendor docs where available.
 */
export interface ERPSystem {
  slug: string;
  /** SEO-intent URL slug, e.g. 'sap-e-invoicing'. Falls back to slug if absent. */
  urlSlug?: string;
  name: string;
  vendor: string;
  category: 'enterprise' | 'mid-market' | 'smb' | 'open-source';
  description: string;

  nativeEInvoiceSupport: boolean;
  nativeFormats: string[];
  certifiedAddons: string[];
  configurationComplexity: 'low' | 'medium' | 'high';

  // --- Applicability ---
  applicableCountries: string[];

  // --- Technical Notes ---
  dataMappingNotes: string;
  exportConsiderations: string;
  archiveConsiderations: string;
  implementationChecklist: ERPChecklistItem[];

  // --- Source Attribution (MANDATORY) ---
  /** At least 1 source from ERP vendor docs */
  officialSources: Source[];

  // --- Navigational Relationships ---
  /** Countries where this ERP has documented implementation requirements */
  relatedCountries: string[];
  /** Standards this ERP natively supports or can generate */
  relatedStandards: string[];
  /** Related ERP systems for comparison */
  relatedERPSlugs: string[];

  // --- Dates & Meta ---
  lastReviewed: string;

  // --- Display-Only ---
  aiSummary: string;
}

// ---- Provider Route ----

export interface RouteRequirement {
  category: 'legal' | 'technical' | 'operational';
  item: string;
  isMandatory: boolean;
}

/** A provider route guide entry.
 *  Route descriptions should distinguish between mandatory and advisory requirements.
 */
export interface ProviderRoute {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  howItWorks: string;
  requirements: RouteRequirement[];
  pros: string[];
  cons: string[];
  bestFor: string[];
  formatsCompatible: string[];
  countriesApplicable: string[];
  complexity: 'low' | 'medium' | 'high';
  costIndicators: string;
  keyProviders: string[];

  // --- Source Attribution (MANDATORY) ---
  /** At least 1 source — typically from Peppol or government portal docs */
  officialSources: Source[];

  // --- Navigational Relationships ---
  relatedCountrySlugs: string[];
  relatedStandardSlugs: string[];

  // --- Dates & Meta ---
  lastReviewed: string;
}

// ---- Content Hook ----

export interface HookFormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'select' | 'radio' | 'checkbox';
  required: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
  note?: string;
}

/** A high-value content hook / lead-capture unit.
 *  Each hook must have a targetIntent and nextStepCta
 *  to make the journey flow explicit in the UI.
 */
export interface ContentHook {
  id: string;
  slug: string;
  name: string;
  type: 'checklist' | 'shortlist' | 'comparison' | 'matrix' | 'timeline' | 'decision-aid';

  /** What the user gets by engaging with this hook */
  valueProposition: string;

  /** Who this hook is for */
  targetPersona: string;

  /** What user intent this hook addresses */
  targetIntent: string;

  /** The specific next action the user should take after receiving the hook content */
  nextStepCta: string;

  /** Where this hook appears */
  placement: 'inline' | 'section' | 'standalone' | 'all-pages';
  ctaLabel: string;
  ctaDescription: string;
  formFields?: HookFormField[];
  whatTheyGet: string[];
  disclaimer?: string;
  status: 'ready' | 'in-development' | 'coming-soon';
}

// ---- User Journey ----

export interface UserJourney {
  id: string;
  name: string;
  persona: string;
  searchIntent: string;
  entryPage: string;
  entryReason: string;
  firstView: string[];
  problemSolved: string;
  nextClick: string;
  destinationPage: string;
  conversionPoint: string;
  whyThisPath: string;
}
