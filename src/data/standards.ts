// ============================================================
// EInvoiceAtlas — Standards Data
// All format specifications are sourced from governing body documentation.
// ============================================================

import type { Standard } from './types';

// ---- Source helper ----
function src(
  title: string,
  publisher: string,
  url: string,
  sourceType: import('./types').SourceType,
  lastChecked: string,
  coverage?: string,
): import('./types').Source {
  return { title, publisher, url, sourceType, lastChecked, coverage };
}

export const standards: Standard[] = [
  // ============================================================
  {
    slug: 'en-16931',
    urlSlug: 'en-16931',
    name: 'EN 16931-1:2017 — European norm for semantic data model of invoices',
    shortName: 'EN 16931',
    category: 'regional',
    governingBody: 'CEN (European Committee for Standardization)',
    version: '1.3.1 (2020)',
    metaTitle: 'EN 16931 Invoice Standard: XML, Examples & EU E-Invoicing',
    metaDescription: 'Learn EN 16931, the EU e-invoicing standard: semantic model, XML structure, invoice examples, CIUS, UBL/CII syntax, Peppol BIS 3.0, XRechnung, and Factur-X links.',
    description:
      'EN 16931 is the EU\'s semantic data model for electronic invoices. It defines what information an invoice must contain (the "what") but not how it is represented technically. It is the semantic foundation that XRechnung, Factur-X, Peppol BIS 3.0, and UBL 2.1 all implement.',
    countriesUsing: ['france', 'germany', 'belgium', 'spain', 'italy', 'netherlands', 'austria'],
    erpSupport: ['sap', 'oracle', 'netsuite', 'odoo', 'sage', 'microsoft-dynamics'],
    mandatoryFields: 52,
    isPeppolBased: false,
    isXmlBased: false,
    isPdfBased: false,
    dataFieldOverview: [
      {
        group: 'Invoice Header',
        fields: [
          { code: 'BT-1', name: 'Invoice number', mandatory: true },
          { code: 'BT-2', name: 'Invoice issue date', mandatory: true },
          { code: 'BT-3', name: 'Invoice due date', mandatory: false },
          { code: 'BT-5', name: 'Invoice total amount with VAT', mandatory: true },
          { code: 'BT-6', name: 'Invoice total VAT amount', mandatory: true },
        ],
      },
      {
        group: 'Seller Information',
        fields: [
          { code: 'BT-27', name: 'Seller name', mandatory: true },
          { code: 'BT-28', name: 'Seller VAT identifier', mandatory: true },
          { code: 'BT-29', name: 'Seller legal registration identifier', mandatory: false },
          { code: 'BT-30', name: 'Seller trading name', mandatory: false },
        ],
      },
      {
        group: 'Buyer Information',
        fields: [
          { code: 'BT-44', name: 'Buyer name', mandatory: true },
          { code: 'BT-45', name: 'Buyer VAT identifier', mandatory: true },
          { code: 'BT-46', name: 'Buyer legal registration identifier', mandatory: false },
        ],
      },
      {
        group: 'Invoice Lines',
        fields: [
          { code: 'BT-126', name: 'Invoice line amount', mandatory: true },
          { code: 'BT-127', name: 'Invoice line VAT amount', mandatory: true },
          { code: 'BT-128', name: 'Invoice line VAT category code', mandatory: true },
          { code: 'BT-129', name: 'Invoice line VAT rate', mandatory: true },
          { code: 'BT-151', name: 'Item name', mandatory: true },
          { code: 'BT-152', name: 'Item description', mandatory: false },
        ],
      },
    ],
    validationRules: [
      'All BT codes must appear with correct data types',
      'VAT calculation must be consistent (line totals must match header totals)',
      'Date fields must be valid ISO 8601 dates',
      'Amount fields must use exactly 2 decimal places',
      'Currency codes must be valid ISO 4217 codes',
    ],
    commonMistakes: [
      'Confusing EN 16931 (semantic model) with XRechnung (a specific format implementing EN 16931)',
      'Missing or incorrect BT-45 (buyer VAT identifier) — a common rejection reason',
      'Not understanding that EN 16931 does not specify XML structure — format is separate',
    ],
    officialSources: [
      src(
        'EN 16931-1:2017 Product Page',
        'CEN (European Committee for Standardization)',
        'https://www.cencenelec.eu/',
        'standard-body',
        '2026-05-01',
        'Official CEN page for the European e-invoicing standard; access to purchase specification',
      ),
      src(
        'EN 16931-1:2017 — Semantic Data Model for Invoices',
        'CEN (European Committee for Standardization)',
        'https://standards.cen.eu/',
        'standard-body',
        '2026-05-01',
        'Direct specification for the EU semantic e-invoice data model; BT code taxonomy',
      ),
      src(
        'EU Directive 2014/55/EU on E-Invoicing',
        'European Parliament and Council',
        'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32014L0055',
        'government',
        '2026-05-01',
        'Legal basis requiring EU member states to accept EN 16931-compliant invoices',
      ),
    ],
    lastReviewed: '2026-05-15',
    // --- Navigational Relationships ---
    relatedCountries: ['france', 'germany', 'belgium', 'spain', 'italy', 'netherlands'],
    relatedStandardSlugs: ['peppol-bis-3', 'xrechnung', 'factur-x', 'ubl-2.1'],
    invoiceQueryGlossary: [
      { query: 'en16931 compliance', whatItMeans: 'whether an invoice meets EN 16931 data requirements', preciseTerm: 'EN 16931 data model — 52 mandatory data elements in a semantic invoice structure' },
      { query: 'en 16931 xml', whatItMeans: 'XML representation of EN 16931 data', preciseTerm: 'UBL 2.1 or CII — XML syntaxes used to encode EN 16931 data (e.g. in XRechnung, Factur-X)' },
      { query: 'en 16931 format', whatItMeans: 'the technical file format for EN 16931 invoices', preciseTerm: 'EN 16931 is a semantic model, not a format — XML (UBL/CII), PDF+XML, or other structured formats all represent EN 16931 data' },
      { query: 'en 16931 example', whatItMeans: 'sample EN 16931 invoice structure', preciseTerm: 'XRechnung and Factur-X are concrete implementations showing EN 16931 field structure in XML' },
    ],
    quickAnswer: [
      { question: 'Is EN 16931 a file format?', answer: 'No. EN 16931 is a semantic data model — it defines what data an invoice must contain. The actual format can be XML (as in XRechnung), PDF+XML (as in Factur-X), or UBL.', order: 1 },
      { question: 'Which countries require EN 16931?', answer: 'All EU countries implementing mandatory e-invoicing under the 2014/55/EU directive are required to accept invoices conforming to EN 16931.', order: 2 },
      { question: 'How does EN 16931 relate to Peppol?', answer: 'Peppol BIS 3.0 implements EN 16931 as its semantic model. All Peppol-compliant invoices are EN 16931 compliant.', order: 3 },
      { question: 'How is EN 16931 different from Peppol BIS Billing 3.0?', answer: 'EN 16931 defines the semantic invoice data structure — what fields an invoice must contain. Peppol BIS Billing 3.0 takes EN 16931 and adds Peppol-specific XML rules (UBL 2.1), validation constraints, and network routing. Peppol BIS 3 is a more specific implementation of EN 16931.', order: 4 },
      { question: 'What does EN 16931 compliance mean in practice?', answer: 'An invoice is EN 16931-compliant when it contains all mandatory data elements (the BT codes) with correct data types. Whether an invoice is "legal" depends on the country — EN 16931 defines the data model; local mandates define what formats and data are required.', order: 5 },
    ],
    // --- Display ---
    aiSummary:
      'EN 16931 is the European semantic standard for e-invoicing data. It defines 52 mandatory data elements and a structured taxonomy of invoice information. Rather than specifying a file format, it defines the semantic meaning of each data field. This allows different technical formats — XRechnung, Factur-X, UBL 2.1 — to all be semantically equivalent under EN 16931. It is the backbone of the EU\'s interoperability framework.',
    pros: [
      'EU-wide semantic interoperability',
      'Format-agnostic (works with XML, PDF, UBL)',
      'Forms the European semantic standard referenced by Directive 2014/55/EU for electronic invoicing in public procurement',
      'Supported through many ERP platforms, native modules, middleware products, and e-invoicing providers',
    ],
    cons: [
      'Complex with 52 mandatory fields',
      'Requires understanding of BT code taxonomy',
      'Validation can be strict — small errors cause rejections',
    ],
    aliasBlock: 'Also searched as: EN16931, en16931, EN 16931, EN 16931 invoice, EN 16931 standard, EN 16931 e-invoice standard, European semantic invoice model, electronic invoice semantic model.',
    sectionNearTop: {
      heading: 'EN 16931 invoice standard: semantic model, XML structure, examples, and CIUS',
      body: 'EN 16931 defines the European semantic invoice model — it specifies what data an invoice must contain (the "what"), not how it is transmitted or what file format to use. It is not a delivery network or routing specification. Peppol BIS Billing 3.0, XRechnung, Factur-X, and ZUGFeRD each relate to EN 16931 differently: some implement its semantics over UBL XML (Peppol BIS), some over pure XML (XRechnung), and some embed EN 16931-conformant XML inside a PDF (Factur-X, ZUGFeRD). CIUS (Core Invoice Usage Specification) allows countries or sectors to constrain EN 16931 for specific contexts. UBL and CII are the two main XML syntaxes used to represent EN 16931 data, and the examples below show how the model appears in real invoice flows.',
      links: [
        { label: 'Peppol BIS Billing 3.0', href: '/standards/peppol-bis-3/' },
        { label: 'XRechnung Standard', href: '/standards/xrechnung/' },
        { label: 'Factur-X / ZUGFeRD', href: '/standards/factur-x/' },
      ],
    },
    howItConnects: [
      'EN 16931 → European semantic invoice model — defines what data an invoice must contain',
      'Peppol BIS Billing 3.0 → Peppol network invoice specification built on UBL 2.1 with EN 16931 semantics',
      'XRechnung → German national format implementing EN 16931 as pure XML',
      'ZUGFeRD / Factur-X → Hybrid PDF/XML invoice family — embedded XML conforms to EN 16931',
      'UBL / CII → XML syntax layer used to represent EN 16931 data in structured formats',
    ],
  },

  // ============================================================
  {
    slug: 'peppol-bis-3',
    urlSlug: 'peppol-bis-3',
    name: 'Peppol BIS 3.0 — Business Interoperability Specification',
    shortName: 'Peppol BIS 3',
    category: 'universal',
    governingBody: 'OpenPeppol AS (non-profit)',
    version: '3.0',
    metaTitle: 'Peppol BIS Billing 3.0: Format, XML & Examples',
    metaDescription: 'Learn what Peppol BIS Billing 3.0 is, how it relates to EN 16931, its UBL XML structure, validation rules, invoice examples, and routing.',
    invoiceQueryGlossary: [
      { query: 'peppol format', whatItMeans: 'invoice format used in Peppol exchange', preciseTerm: 'Peppol BIS Billing 3.0' },
      { query: 'peppol invoice', whatItMeans: 'structured invoice sent through Peppol', preciseTerm: 'UBL Invoice under Peppol BIS Billing 3.0' },
      { query: 'peppol standard', whatItMeans: 'business and technical rules for Peppol exchange', preciseTerm: 'Peppol BIS Billing 3.0 / Peppol BIS' },
      { query: 'peppol bis', whatItMeans: 'Peppol billing specification', preciseTerm: 'Peppol BIS Billing 3.0' },
      { query: 'EN 16931', whatItMeans: 'semantic invoice data model', preciseTerm: 'European semantic model — foundation referenced by Peppol BIS Billing 3.0' },
    ],
    aliasBlock: 'Also searched as: Peppol format, Peppol invoice format, Peppol invoice, Peppol standard, Peppol standards, Peppol BIS, Peppol BIS 3, Peppol BIS 3.0, Peppol BIS Billing 3.0, Peppol invoice specification.',
    description:
      'Peppol BIS 3.0 is a set of structured document specifications built on UBL 2.1, implementing the EN 16931 semantic model. It is the format used on the Peppol Network — a global e-delivery infrastructure connecting businesses, governments, and ERP systems across 40+ countries.',
    countriesUsing: ['france', 'germany', 'belgium', 'netherlands', 'uk', 'australia', 'singapore'],
    erpSupport: ['sap', 'oracle', 'netsuite', 'odoo', 'sage', 'microsoft-dynamics', 'xero', 'exact'],
    mandatoryFields: 52,
    isPeppolBased: true,
    isXmlBased: true,
    isPdfBased: false,
    dataFieldOverview: [
      {
        group: 'UBL Invoice Structure',
        fields: [
          { code: 'cbc:ID', name: 'Invoice number', mandatory: true },
          { code: 'cbc:IssueDate', name: 'Invoice issue date', mandatory: true },
          { code: 'cac:AccountingSupplierParty', name: 'Seller party', mandatory: true },
          { code: 'cac:AccountingCustomerParty', name: 'Buyer party', mandatory: true },
          { code: 'cac:InvoiceLine', name: 'Invoice lines', mandatory: true },
        ],
      },
    ],
    validationRules: [
      'Must conform to UBL 2.1 XML schema',
      'Must include all mandatory EN 16931 BT elements',
      'Peppol-specific rules: document type codes, process IDs, Peppol participant IDs',
      'Signature requirements for Peppol transport',
    ],
    commonMistakes: [
      'Using Peppol BIS 2.x syntax instead of 3.0 — formats are not backward compatible',
      'Not registering a Peppol ID before attempting to send',
      'Confusing Peppol BIS 3 with plain UBL 2.1 — Peppol has additional constraints',
    ],
    officialSources: [
      src(
        'OpenPeppol — BIS 3.0 Specification',
        'OpenPeppol AS',
        'https://openpeppol.org/',
        'standard-body',
        '2026-05-01',
        'Official Peppol organisation; BIS 3.0 specifications and policy documents',
      ),
      src(
        'Peppol BIS 3.0 Document Set',
        'OpenPeppol AS',
        'https://docs.peppol.eu/poacc/billing/3.0/',
        'standard-body',
        '2026-05-01',
        'Technical specification for Peppol BIS 3.0 invoice, credit note, and related documents',
      ),
      src(
        'Peppol Network — About',
        'OpenPeppol AS',
        'https://peppol.eu/the-network/',
        'standard-body',
        '2026-05-01',
        'Overview of the Peppol network infrastructure and global coverage',
      ),
    ],
    relatedCountries: ['france', 'germany', 'belgium', 'netherlands', 'uk'],
    relatedStandardSlugs: ['en-16931', 'ubl-2.1', 'xrechnung', 'factur-x'],
    lastReviewed: '2026-05-15',
    quickAnswer: [
      { question: 'What is Peppol BIS Billing 3.0?', answer: 'Peppol BIS Billing 3.0 is a set of structured document specifications built on UBL 2.1 XML, implementing the EN 16931 semantic model. It is the invoice format used on the Peppol Network — a global e-delivery infrastructure connecting businesses, governments, and ERP systems across 40+ countries.', order: 1 },
      { question: 'Do I need to use Peppol to send a Peppol BIS 3 invoice?', answer: 'Technically no — Peppol BIS 3 is a UBL-based format that can be sent outside Peppol. But Peppol is the primary delivery mechanism and provides routing, delivery confirmation, and cross-border interoperability.', order: 2 },
      { question: 'How many countries support Peppol?', answer: 'Peppol has active presence in 40+ countries across Europe, Asia-Pacific, and the Americas. Coverage varies by country.', order: 3 },
      { question: 'What is the difference between Peppol BIS 3.0 and EN 16931?', answer: 'EN 16931 defines the semantic invoice data model — what fields an invoice must contain. Peppol BIS Billing 3.0 implements EN 16931 as a UBL 2.1 XML specification with additional Peppol-specific validation rules. Think of EN 16931 as the dictionary and Peppol BIS 3 as a specific grammar book that follows it.', order: 4 },
      { question: 'How is Peppol BIS 3.0 different from XRechnung or Factur-X?', answer: 'XRechnung (Germany) and Factur-X (France) are national format profiles that also implement EN 16931. Peppol BIS 3 is a network-focused specification used globally. They share the same EN 16931 data semantics but differ in XML structure, validation rules, and delivery mechanism. An invoice valid in one format is not automatically valid in another.', order: 5 },
    ],
    sectionNearTop: {
      heading: 'Peppol BIS Billing 3.0: what the format is, how it relates to EN 16931, and what ERP teams need to know',
      body: 'Peppol BIS Billing 3.0 is the invoice specification used on the Peppol Network — a global e-delivery infrastructure connecting businesses, governments, and ERP systems across 40+ countries. The specification is published by OpenPeppol AS and combines two layers: the EN 16931 semantic model (what data an invoice must contain) and the UBL 2.1 XML syntax (how that data is structured and transmitted). To use Peppol BIS Billing 3.0, a business needs a Peppol ID (obtained through a Peppol Registration Authority) and a Peppol Access Point subscription. The format is particularly relevant for businesses operating across borders or sending to Peppol-connected government procurement systems. Key ERP integration considerations include exporting invoices as valid UBL 2.1 XML, mapping ERP fields to EN 16931 BT codes, and configuring Peppol Access Point routing. Peppol BIS Billing 3.0 is not itself a country mandate — it is a specification relevant where Peppol network exchange is used, and it is one of several EN 16931-based formats alongside XRechnung (Germany), Factur-X (France), and ZUGFeRD (Germany B2B).',
      links: [
        { label: 'EN 16931 Invoice Standard', href: '/standards/en-16931/' },
        { label: 'Peppol Access Point Route', href: '/routes/peppol-access-point/' },
        { label: 'XRechnung Standard', href: '/standards/xrechnung/' },
        { label: 'Factur-X / ZUGFeRD', href: '/standards/factur-x/' },
      ],
    },
    aiSummary:
      'Peppol BIS 3.0 is the most widely adopted e-invoicing specification globally. It combines UBL 2.1 syntax with EN 16931 semantics, creating a format that is both technically structured and legally relevant across multiple jurisdictions. The Peppol Network provides the routing infrastructure — a "network of networks" that connects access points globally. To use Peppol, a business needs a Peppol ID (obtained via a Peppol Registration Authority) and an access point provider.',
    pros: [
      'Global coverage across 40+ countries',
      'Open standard with no vendor lock-in',
      'Built-in routing and delivery confirmation via Peppol network',
      'Strong ERP ecosystem support',
    ],
    cons: [
      'Requires access point subscription',
      'Additional Peppol-specific validation rules beyond standard UBL',
      'Some countries have national formats that differ slightly from Peppol BIS 3',
    ],
    howItConnects: [
      'Peppol BIS Billing 3.0 — formal billing specification built on UBL 2.1 with EN 16931 semantics',
      'Peppol Access Point — certified routing service that sends and receives Peppol documents',
      'EN 16931 — European semantic model that Peppol BIS 3.0 implements; defines what data fields an invoice must contain',
      'UBL 2.1 — XML syntax layer that Peppol BIS 3.0 uses as its document format',
      'XRechnung / Factur-X / ZUGFeRD — national formats that share EN 16931 semantics but may use different XML profiles',
      'Peppol BIS 3.0 is not itself a country mandate — it is a specification relevant where Peppol network exchange is used',
    ],
  },

  // ============================================================
  {
    slug: 'xrechnung',
    urlSlug: 'xrechnung',
    name: 'XRechnung — German E-Invoice Standard',
    shortName: 'XRechnung',
    category: 'national',
    governingBody: 'KoSIT (Koordinierungsstelle für IT-Standards, Germany)',
    version: '2.3 (2023)',
    metaTitle: "XRechnung in English: XML Invoice Format",
    metaDescription: "English guide to Germany's XRechnung XML invoice format: EN 16931 relationship, Leitweg-ID, validation, ERP export, and ZUGFeRD differences.",
    description:
      'XRechnung is Germany\'s national e-invoice format, mandatory for all invoices to German public authorities. It is a pure XML format based on EN 16931, with specific German extensions. Unlike ZUGFeRD (which combines PDF and XML), XRechnung is strictly XML-only.',
    countriesUsing: ['germany'],
    erpSupport: ['sap', 'oracle', 'datev'],
    mandatoryFields: 52,
    isPeppolBased: false,
    isXmlBased: true,
    isPdfBased: false,
    dataFieldOverview: [
      {
        group: 'XRechnung Core (EN 16931 profile)',
        fields: [
          { code: 'BT-1', name: 'Invoice number', mandatory: true, note: 'Must be unique within the running number context' },
          { code: 'BT-2', name: 'Issue date', mandatory: true },
          { code: 'BT-27', name: 'Seller name', mandatory: true },
          { code: 'BT-28', name: 'Seller VAT ID', mandatory: true },
          { code: 'BT-44', name: 'Buyer name', mandatory: true },
          { code: 'BT-45', name: 'Buyer VAT ID', mandatory: true },
          { code: 'BT-151', name: 'Item name', mandatory: true },
        ],
      },
      {
        group: 'German Extensions',
        fields: [
          { code: 'BT-33', name: 'Buyer local ID (Kunden-ID)', mandatory: false, note: 'Required by some public authorities' },
          { code: 'BT-DATEVA', name: 'Delivery date', mandatory: false },
        ],
      },
    ],
    validationRules: [
      'Must pass EN 16931 validation',
      'Must use XRechnung-specific document type code (380 = Commercial Invoice)',
      'All mandatory BT fields must be present',
      'German VAT rates (19%, 7%, 0%) must be correctly coded',
      'Must be validated against KoSIT XRechnung validation tool',
    ],
    commonMistakes: [
      'Confusing ZUGFeRD with XRechnung and sending a PDF instead of XML',
      'Missing BT-45 (buyer VAT ID) — a top rejection cause',
      'Using incorrect document type codes (e.g., 381 for credit note)',
      'Not running KoSIT validation before sending to government',
    ],
    officialSources: [
      src(
        'XRechnung.de — Official Specification',
        'KoSIT (Koordinierungsstelle für IT-Standards)',
        'https://www.xrechnung.de/',
        'government',
        '2026-05-01',
        'Official XRechnung specification, news, and implementation guidance',
      ),
      src(
        'KoSIT — XRechnung Validation Suite',
        'KoSIT (Koordinierungsstelle für IT-Standards)',
        'https://www.osit.de/xrechnung/',
        'government',
        '2026-05-01',
        'Official XRechnung conformance testing and validation tools',
      ),
    ],
    relatedCountries: ['germany'],
    relatedStandardSlugs: ['en-16931', 'peppol-bis-3', 'zugferd'],
    lastReviewed: '2026-05-10',
    quickAnswer: [
      { question: 'Is XRechnung the same as ZUGFeRD?', answer: 'No. XRechnung is pure XML (no PDF). ZUGFeRD is a PDF/A-3 with embedded XML. They are different formats and are not interchangeable.', order: 1 },
      { question: 'Can XRechnung be sent via Peppol?', answer: 'Yes. Peppol supports XRechnung as a document type. You can send XRechnung over the Peppol network using a Peppol access point.', order: 2 },
      { question: 'Is XRechnung required for B2B in Germany?', answer: 'No. XRechnung is mandatory only for B2G (government invoices) in Germany. B2B e-invoicing remains voluntary.', order: 3 },
    ],
    aiSummary:
      'XRechnung is Germany\'s implementation of EN 16931 as a pure XML format, mandated for all B2G invoices since 2017 for federal authorities. It is maintained by KoSIT, which publishes official validation tools and maintains the XRechnung profile. The format uses EN 16931 BT codes and adds German-specific extensions for fields like German company registration numbers (StNr, USt-IdNr). The strict XML-only approach means recipients need XML-capable systems.',
    pros: [
      'Legally mandated for German B2G',
      'Pure XML — machine-readable without additional processing',
      'Based on EN 16931 — compatible with EU-wide standards',
      'Free validation tools available from KoSIT',
    ],
    cons: [
      'XML-only format lacks human readability without a viewer',
      'Mandatory only for B2G, limiting network effects for B2B',
      'German-specific extensions add complexity for cross-border use',
    ],
    comparisonBlock: 'XRechnung vs ZUGFeRD: XRechnung is pure XML with no PDF. ZUGFeRD is a PDF/A-3 with embedded EN 16931 XML. Both are EN 16931-compliant but serve different workflows. XRechnung is required for German federal B2G. ZUGFeRD is preferred in German B2B supply chains for its human-readable PDF layer. They are not interchangeable.',
  },

  // ============================================================
  {
    slug: 'zugferd',
    urlSlug: 'zugferd',
    name: 'ZUGFeRD — Zentraler User Guide des Forums DATENBANKARCHITEKTUR German E-Invoice Standard',
    shortName: 'ZUGFeRD',
    category: 'national',
    governingBody: 'FeRD (Forum Elektronische Rechnung Deutschland)',
    version: '2.3.1 (2022)',
    metaTitle: 'ZUGFeRD Invoice Format: PDF/XML and EN 16931',
    metaDescription: 'Understand the ZUGFeRD invoice format, hybrid PDF/XML structure, EN 16931 link, Factur-X relationship, and ERP export implications.',
    description:
      'ZUGFeRD is Germany\'s hybrid e-invoice format combining a human-readable PDF/A-3 document with a machine-readable XML file embedded inside it. It is based on the EN 16931 semantic data model and is one of two dominant German e-invoice formats alongside XRechnung. ZUGFeRD is widely used in B2B workflows because the PDF provides immediate human readability while the embedded XML enables automated processing.',
    countriesUsing: ['germany'],
    erpSupport: ['sap', 'oracle', 'datev', 'sage'],
    mandatoryFields: 52,
    isPeppolBased: false,
    isXmlBased: true,
    isPdfBased: true,
    pdfCompatibility: 'PDF/A-3 (EN 16931 XML embedded in PDF)',
    dataFieldOverview: [
      {
        group: 'PDF Component',
        fields: [
          { code: 'Visual', name: 'Human-readable invoice layout', mandatory: true, note: 'Standard invoice appearance — no special restrictions' },
        ],
      },
      {
        group: 'XML Component (EN 16931 profile)',
        fields: [
          { code: 'BT-1', name: 'Invoice number', mandatory: true },
          { code: 'BT-2', name: 'Issue date', mandatory: true },
          { code: 'BT-27', name: 'Seller name + VAT', mandatory: true },
          { code: 'BT-44', name: 'Buyer name + VAT', mandatory: true },
          { code: 'BT-151', name: 'Item name', mandatory: true },
          { code: 'BT-152', name: 'Item description', mandatory: false },
        ],
      },
    ],
    validationRules: [
      'PDF must be valid PDF/A-3 format — regular PDFs are not compliant',
      'XML must be embedded in PDF as an attached file (not visible in the visual PDF content)',
      'XML must conform to EN 16931 semantic data model',
      'ZUGFeRD-specific profile rules apply for the embedded XML structure',
      'German extensions (e.g., StNr, USt-IdNr) may be required depending on recipient',
    ],
    commonMistakes: [
      'Embedding the XML in the visible PDF content instead of as a file attachment',
      'Not generating valid PDF/A-3 — regular PDFs are not ZUGFeRD compliant',
      'Confusing ZUGFeRD with XRechnung — they are different formats and are not interchangeable',
      'Missing mandatory EN 16931 fields in the embedded XML',
      'Sending a ZUGFeRD PDF where a pure XML XRechnung is required',
    ],
    officialSources: [
      src(
        'ZUGFeRD 2.3.1 Specification',
        'FeRD (Forum Elektronische Rechnung Deutschland)',
        'https://www.ferd-net.de/zugferd/',
        'standard-body',
        '2026-06-02',
        'Official ZUGFeRD specification, version history, and implementation guidance',
      ),
      src(
        'EN 16931-1:2017 — Semantic Data Model',
        'CEN (European Committee for Standardization)',
        'https://standards.cen.eu/',
        'standard-body',
        '2026-05-01',
        'Semantic invoice data model underlying ZUGFeRD XML structure',
      ),
    ],
    relatedCountries: ['germany'],
    relatedStandardSlugs: ['xrechnung', 'en-16931', 'factur-x', 'peppol-bis-3'],
    lastReviewed: '2026-06-02',
    quickAnswer: [
      { question: 'What is ZUGFeRD?', answer: 'ZUGFeRD is a hybrid invoice format: a PDF/A-3 with an EN 16931 XML file embedded inside it. The PDF is human-readable; the XML is machine-readable. Both are in the same file.', order: 1 },
      { question: 'Is ZUGFeRD the same as XRechnung?', answer: 'No. ZUGFeRD is a PDF with embedded XML (hybrid). XRechnung is pure XML. They are different formats and are not interchangeable.', order: 2 },
      { question: 'Is ZUGFeRD the same as Factur-X?', answer: 'Yes in concept — both are PDF/A-3 with embedded EN 16931 XML. They share the same hybrid approach and are maintained by the same international working group. They differ in naming convention and market focus.', order: 3 },
      { question: 'Can ZUGFeRD be sent via Peppol?', answer: 'Not natively. Peppol transmits XML documents. Some Peppol access point providers offer ZUGFeRD conversion or transmission services.', order: 4 },
    ],
    aiSummary:
      'ZUGFeRD (Zentraler User Guide des Forums DATENBANKARCHITEKTUR) is Germany\'s original hybrid e-invoice format, developed by FeRD to balance human readability (via PDF) with machine-readability (via EN 16931 XML). It is based on the European semantic data model EN 16931, making it compatible with EU-wide e-invoicing frameworks. ZUGFeRD is widely adopted in German B2B supply chains because it works with standard PDF viewers while enabling automated invoice processing. It coexists with XRechnung in the German market — ZUGFeRD for B2B flexibility, XRechnung for government procurement. The format is referenced by the European standardisation organisations and is part of the EN 16931-compliant format family that includes Factur-X.',
    pros: [
      'Human-readable (PDF) + machine-readable (XML) in one file',
      'Based on EN 16931 — EU-compliant semantic model',
      'Strong adoption in German B2B supply chains',
      'No special software needed to view the invoice',
      'Supported by major German ERP systems including SAP and DATEV',
    ],
    cons: [
      'PDF generation adds complexity to ERP integration',
      'Not a pure structured data format — requires PDF parsing for automation',
      'Peppol does not natively support PDF formats',
      'Some German public authorities mandate XRechnung instead',
    ],
  },

  // ============================================================
  {
    slug: 'factur-x',
    urlSlug: 'factur-x',
    name: 'Factur-X — French Hybrid E-Invoice Standard',
    shortName: 'Factur-X',
    category: 'national',
    governingBody: 'AFNOR (Association Française de Normalisation)',
    version: '1.0.05 (2022)',
    metaTitle: 'Factur-X Invoice Format: PDF/XML Guide',
    metaDescription: 'Understand Factur-X invoice format, hybrid PDF/XML structure, ZUGFeRD relationship, EN 16931 link, France context, and ERP archive implications.',
    description:
      'Factur-X is France\'s national e-invoice format, combining a human-readable PDF/A-3 with a machine-readable XML file embedded inside it. It is one of the most widely adopted hybrid formats in Europe, balancing legal compliance with practical usability. Factur-X and ZUGFeRD share the same hybrid PDF/XML concept and the same EN 16931-based XML profile — they are essentially the same format family with different market names.',
    countriesUsing: ['france'],
    erpSupport: ['sap', 'oracle', 'odoo', 'sage', 'netsuite', 'microsoft-dynamics'],
    mandatoryFields: 52,
    isPeppolBased: false,
    isXmlBased: true,
    isPdfBased: true,
    pdfCompatibility: 'PDF/A-3 (EN 16931 XML embedded in PDF)',
    dataFieldOverview: [
      {
        group: 'PDF Component',
        fields: [
          { code: 'Visual', name: 'Human-readable invoice layout', mandatory: true, note: 'Standard invoice appearance — no special restrictions' },
        ],
      },
      {
        group: 'XML Component (EN 16931 profile)',
        fields: [
          { code: 'BT-1', name: 'Invoice number', mandatory: true },
          { code: 'BT-2', name: 'Issue date', mandatory: true },
          { code: 'BT-27', name: 'Seller name + VAT', mandatory: true },
          { code: 'BT-44', name: 'Buyer name + VAT', mandatory: true },
          { code: 'BT-151', name: 'Item name', mandatory: true },
          { code: 'BT-152', name: 'Item description', mandatory: false },
        ],
      },
    ],
    validationRules: [
      'PDF must be valid PDF/A-3 format — regular PDFs are not compliant',
      'XML must be embedded in PDF as an attached file (not visible in the visual PDF content)',
      'XML must conform to EN 16931',
      'Factur-X specific profile rules apply (e.g., certain BT fields have specific French extensions)',
    ],
    commonMistakes: [
      'Embedding the XML in the visible PDF content instead of as a file attachment',
      'Not generating valid PDF/A-3 — regular PDFs are not compliant',
      'Missing mandatory EN 16931 fields in the embedded XML',
      'Confusing Factur-X with plain PDF invoicing — the embedded XML is mandatory',
    ],
    officialSources: [
      src(
        'Factur-X — Official Specification',
        'AFNOR (Association Française de Normalisation)',
        'https://www.afnor.org/standard/factur-x/',
        'standard-body',
        '2026-05-01',
        'Official Factur-X specification; mandate basis for France B2B and B2G',
      ),
      src(
        'Factur-X Documentation (Community)',
        'Factur-X Community',
        'https://factur-x.fr/',
        'industry-reference',
        '2026-05-01',
        'Community-maintained implementation guide and examples',
      ),
    ],
    relatedCountries: ['france'],
    relatedStandardSlugs: ['en-16931', 'zugferd', 'peppol-bis-3'],
    lastReviewed: '2026-06-02',
    quickAnswer: [
      { question: 'What is Factur-X?', answer: 'Factur-X is a PDF/A-3 file with an XML file embedded inside it. The PDF is human-readable; the XML is machine-readable. Both are in the same file.', order: 1 },
      { question: 'Is Factur-X the same as ZUGFeRD?', answer: 'Factur-X and ZUGFeRD are both PDF/A-3 with embedded EN 16931 XML. They share the same hybrid invoice concept and are from the same international working group. They differ mainly in naming and market focus.', order: 2 },
      { question: 'Why does Factur-X matter for France e-invoicing?', answer: 'Factur-X is one of the two mandatory formats for e-invoicing in France under the B2B mandate rollout beginning September 2026. Businesses issuing to French entities will need to generate Factur-X or UBL 2.1 invoices.', order: 3 },
      { question: 'Can Factur-X be sent via Peppol?', answer: 'Not natively. Peppol transmits XML documents. Some Peppol access point providers offer Factur-X conversion or transmission services.', order: 4 },
    ],
    aiSummary:
      'Factur-X was developed by the French administration and AFNOR to address the need for both human-readable invoices (for manual review) and machine-readable invoices (for automated processing). The format embeds an EN 16931-compliant XML inside a PDF/A-3 file, making it immediately usable by both humans and systems. It is mandatory for all B2B and B2G invoices in France under the phased rollout beginning 1 September 2026, with strict requirements on the embedded XML structure. Factur-X is part of the same hybrid invoice family as ZUGFeRD — both formats use the same EN 16931 XML profile and are maintained by the same international working group.',
    pros: [
      'Human-readable (PDF) + machine-readable (XML) in one file',
      'Based on EN 16931 — EU-compliant semantic model',
      'No special software needed to view the invoice',
      'Mandatory for France B2B under the 2026-2027 mandate rollout',
    ],
    cons: [
      'Requires PDF/A-3 generation capability',
      'Peppol does not natively support PDF formats',
      'PDF generation adds complexity to ERP integration',
      'Not accepted in countries that mandate pure XML formats',
    ],
  },

  // ============================================================
  {
    slug: 'ubl-2.1',
    urlSlug: 'ubl-2.1',
    name: 'UBL 2.1 — Universal Business Language',
    shortName: 'UBL 2.1',
    category: 'universal',
    governingBody: 'OASIS Open',
    version: '2.1',
    description:
      'UBL 2.1 is a generic XML invoice format developed by OASIS for international use. It is the technical syntax layer on which Peppol BIS 3.0 is built. While Peppol BIS constrains UBL for e-invoicing, UBL 2.1 can be used directly for cross-border B2B transactions.',
    countriesUsing: ['belgium', 'netherlands', 'uk'],
    erpSupport: ['sap', 'oracle', 'netsuite', 'odoo'],
    mandatoryFields: 46,
    isPeppolBased: false,
    isXmlBased: true,
    isPdfBased: false,
    dataFieldOverview: [
      {
        group: 'Invoice Header',
        fields: [
          { code: 'cbc:ID', name: 'Invoice number', mandatory: true },
          { code: 'cbc:IssueDate', name: 'Issue date', mandatory: true },
          { code: 'cbc:DueDate', name: 'Due date', mandatory: false },
          { code: 'cac:AccountingSupplierParty', name: 'Seller', mandatory: true },
          { code: 'cac:AccountingCustomerParty', name: 'Buyer', mandatory: true },
        ],
      },
    ],
    validationRules: [
      'Must conform to UBL 2.1 XSD schema',
      'All UBL-required elements must be present',
      'Country-specific extensions may apply',
    ],
    commonMistakes: [
      'Not understanding that UBL 2.1 is a generic format — Peppol BIS adds necessary constraints',
      'Missing required party identification elements',
    ],
    officialSources: [
      src(
        'OASIS UBL 2.1 Specification',
        'OASIS Open',
        'https://docs.oasis-open.org/ubl/UBL-2.1.html',
        'standard-body',
        '2026-05-01',
        'Official UBL 2.1 specification; invoice and related document schemas',
      ),
    ],
    relatedCountries: ['belgium', 'netherlands', 'uk'],
    relatedStandardSlugs: ['peppol-bis-3', 'en-16931'],
    lastReviewed: '2026-05-10',
    quickAnswer: [
      { question: 'What is the difference between UBL 2.1 and Peppol BIS 3?', answer: 'Peppol BIS 3 is UBL 2.1 with additional Peppol-specific rules and constraints. UBL 2.1 is the base format; Peppol BIS is the regulated profile used on the Peppol network.', order: 1 },
      { question: 'Can I use plain UBL 2.1 for e-invoicing?', answer: 'Yes, UBL 2.1 can be used directly for B2B transactions. However, using Peppol BIS 3 (which implements UBL 2.1) provides the Peppol network routing infrastructure.', order: 2 },
    ],
    aiSummary:
      'UBL 2.1 is the foundational XML syntax for e-invoicing used by the Peppol network. It predates EN 16931 and Peppol BIS, and serves as the technical implementation layer. While Peppol BIS 3 constrains UBL 2.1 for e-invoicing use cases, the underlying UBL standard also covers purchase orders, catalogues, and other business documents. Many countries (Belgium, Netherlands, UK) accept UBL 2.1 as a compliant format.',
    pros: [
      'International standard with broad adoption',
      'Open and royalty-free',
      'Used as the basis for Peppol BIS 3',
      'Covers more than invoices (orders, catalogues, etc.)',
    ],
    cons: [
      'Large schema — many optional elements that confuse implementers',
      'Requires Peppol network or custom integration for delivery',
      'Less constrained than Peppol BIS — more room for interoperability issues',
    ],
  },

  // ============================================================
  {
    slug: 'fattura-pa',
    urlSlug: 'fattura-pa',
    name: 'FatturaPA — Italian E-Invoice Format',
    shortName: 'FatturaPA',
    category: 'national',
    governingBody: 'Agenzia delle Entrate (Italian Revenue Agency)',
    version: '1.2.1 (2024)',
    metaTitle: 'FatturaPA XML: Italy\'s Mandatory E-Invoice Format',
    metaDescription: 'FatturaPA is Italy\'s mandatory XML e-invoice format transmitted via SDI. Guide to SDI structure, ERP export fields, EN 16931 link, and Peppol differences.',
    description:
      'FatturaPA is Italy\'s mandatory e-invoice format, the only format accepted by the SDI (Sistema di Interscambio) clearing system. It is an XML schema specifically designed for Italy\'s fiscal requirements.',
    countriesUsing: ['italy'],
    erpSupport: ['sap', 'oracle', 'odoo', 'sage'],
    mandatoryFields: 58,
    isPeppolBased: false,
    isXmlBased: true,
    isPdfBased: false,
    dataFieldOverview: [
      {
        group: 'FatturaElettronica Header',
        fields: [
          { code: 'FatturaElettronicaHeader.DatiTrasmissione.IdTrasmittente', name: 'Transmitter ID', mandatory: true },
          { code: 'FatturaElettronicaHeader.CedentePrestatore', name: 'Supplier', mandatory: true },
          { code: 'FatturaElettronicaHeader.CessionarioCommittente', name: 'Customer', mandatory: true },
        ],
      },
    ],
    validationRules: [
      'Must pass SDI validation before transmission',
      'All Partita IVA numbers must be valid Italian VAT codes',
      'CodiceDestinatario (recipient code) is mandatory for direct transmission',
    ],
    commonMistakes: [
      'Not registering with SDI before attempting transmission',
      'Invalid Partita IVA codes',
      'Wrong CodiceDestinatario for the recipient',
      'Missing or incorrect tax authority codes (RegimeFiscale)',
    ],
    officialSources: [
      src(
        'SDI — FatturaPA Specification',
        'Agenzia delle Entrate (Italian Revenue Agency)',
        'https://www.fatturapa.gov.it/',
        'tax-authority',
        '2026-05-01',
        'Official FatturaPA XML schema specification and technical documentation',
      ),
      src(
        'Agenzia delle Entrate — E-Invoicing Overview',
        'Agenzia delle Entrate',
        'https://www.agenziaentrate.gov.it/',
        'tax-authority',
        '2026-05-01',
        'Italian tax agency e-invoicing mandate framework and SDI guidance',
      ),
    ],
    relatedCountries: ['italy'],
    relatedStandardSlugs: ['en-16931'],
    lastReviewed: '2026-05-10',
    quickAnswer: [
      { question: 'Can I use EN 16931 instead of FatturaPA in Italy?', answer: 'No. Italy requires the specific FatturaPA XML schema. EN 16931-compatible formats like Peppol BIS are not accepted by SDI.', order: 1 },
      { question: 'Is FatturaPA the same as FatturaElettronica?', answer: 'FatturaPA is the specific format used for invoices transmitted via SDI. FatturaElettronica is the broader concept of electronic invoicing in Italy.', order: 2 },
    ],
    aiSummary:
      'Italy\'s FatturaPA is one of the most strictly enforced e-invoice formats globally. All B2B and B2G invoices must be transmitted through SDI, which acts as both a routing and validation hub. The format includes Italian-specific fields (Partita IVA, CodiceDestinatario, etc.) and requires real-time submission. Italy\'s model is a true clearing house — invoices are validated, logged for VAT purposes, and forwarded to the recipient simultaneously.',
    pros: [
      'Strict mandate ensures full ecosystem participation',
      'Real-time VAT validation and reporting',
      'Comprehensive audit trail through SDI',
    ],
    cons: [
      'Italy-specific format — no international interoperability',
      'Requires SDI registration and compliance',
      'Strict validation rules cause frequent rejections for foreign senders',
    ],
    sectionNearTop: {
      heading: 'FatturaPA XML format: what the file structure means for ERP export',
      body: 'FatturaPA is a structured XML invoice format mandated by Italy\'s Agenzia delle Entrate for all domestic B2B and B2G transactions. The format is validated by SDI (Sistema di Interscambio) before routing to the recipient. Key ERP export considerations: the XML must include Italian-specific fields (Partita IVA, CodiceDestinatario, tax regime codes), all fields are validated in real time, and rejected invoices cannot be corrected in place — a new file must be submitted. FatturaPA shares the EN 16931 semantic model in its data taxonomy, but its XML schema is Italy-specific and not directly interchangeable with Peppol BIS Billing 3.0, XRechnung, or ZUGFeRD.',
      links: [
        { label: 'EN 16931 Invoice Standard', href: '/standards/en-16931/' },
        { label: 'Italy E-Invoicing Mandate', href: '/countries/italy-e-invoicing/' },
      ],
    },
  },
];

export function getStandardBySlug(slug: string): Standard | undefined {
  return standards.find((s) => s.slug === slug);
}

export function getStandardByCountry(countrySlug: string): Standard[] {
  return standards.filter((s) => s.countriesUsing.includes(countrySlug));
}
