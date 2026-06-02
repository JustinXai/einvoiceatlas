// ============================================================
// EInvoiceAtlas — Countries Data
// All mandate claims are traceable to officialSources entries.
// ============================================================

import type { Country } from './types';

// ---- Helper to build source objects ----
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

export const countries: Country[] = [
  // ============================================================
  {
    slug: 'france',
    urlSlug: 'france-e-invoicing',
    name: 'France',
    isoCode: 'FR',
    region: 'Europe',
    subRegion: 'EU',
    status: 'upcoming',
    effectiveDate: '2026-09-01',
    mandatePhase: 'Phased rollout — B2G active since 2020; B2B receiving from Sep 2026; B2B issuing from Sep 2026 / Sep 2027',
    enforcementDate: null,
    enforcementStatus: 'upcoming',
    affectedParties: [
      'All B2G suppliers to French government — mandatory since 2020',
      'B2B receiving — all businesses receiving invoices in France, mandatory from 1 September 2026',
      'B2B issuing — large and mid-sized companies from 1 September 2026; SMEs and micro-companies from 1 September 2027',
      'Including foreign companies issuing to French entities',
    ],
    turnoverThreshold: null,
    invoiceTypes: ['B2B', 'B2G'],
    formats: ['factur-x', 'ubl-2.1'],
    routeTypes: ['portal', 'pepper'],
    erpImpact: ['sap', 'oracle', 'odoo', 'sage', 'netsuite'],
    implementationChecklist: [
      {
        order: 1,
        category: 'legal',
        title: 'Register on Chorus Pro',
        description:
          'Create an account on the French government e-invoicing portal (Chorus Pro). Required for all B2G invoices and mandatory for B2B under the phased rollout beginning September 2026. Source: Chorus Pro is operated by the Direction Générale des Finances Publiques (DGFiP).',
        isCritical: true,
        externalResource: 'https://chorus-pro.gouv.fr/',
      },
      {
        order: 2,
        category: 'technical',
        title: 'Select an e-invoicing format',
        description:
          'Choose between Factur-X (PDF + XML, cross-sector) or UBL 2.1 (pure XML). Most businesses use Factur-X for its PDF readability. Source: AFNOR specification for Factur-X.',
        isCritical: true,
      },
      {
        order: 3,
        category: 'technical',
        title: 'Configure ERP for mandatory fields',
        description:
          'Map your ERP fields to Factur-X or UBL 2.1 schema. Key mandatory fields: supplier VAT number (BT-28), buyer VAT number (BT-45), invoice line details, total amounts. Source: EN 16931-1:2017 specification (CEN).',
        isCritical: true,
      },
      {
        order: 4,
        category: 'operational',
        title: 'Implement Peppol access point or portal submission',
        description:
          'Send invoices via Peppol network (access point required) or Chorus Pro portal. Assess which route suits your volume and ERP. Source: OpenPeppol BIS 3.0 specification for Peppol route.',
        isCritical: false,
      },
      {
        order: 5,
        category: 'operational',
        title: 'Set up inbound invoice processing',
        description:
          'Configure your system to receive and process e-invoices in Factur-X or UBL 2.1 format, including validation and archiving. Source: Chorus Pro technical documentation.',
        isCritical: false,
      },
      {
        order: 6,
        category: 'legal',
        title: 'Ensure 10-year archive compliance',
        description:
          'All e-invoices must be archived for 10 years in their original format. Verify your archiving solution meets legal requirements under French commercial code. Source: Code de commerce, articles L.123-22 to L.123-25.',
        isCritical: true,
      },
      {
        order: 7,
        category: 'technical',
        title: 'Test with Chorus Pro sandbox',
        description:
          'Use the Chorus Pro test environment to validate your invoice format and routing before going live. Source: Chorus Pro sandbox documentation.',
        isCritical: false,
      },
    ],
    commonMistakes: [
      'Submitting invoices in wrong format (not Factur-X or UBL 2.1)',
      'Missing mandatory fields: supplier/buyer VAT numbers (BT-28, BT-45), SIRET for B2G',
      'Using Chorus Pro portal without registering as a foreign supplier',
      'Failing to archive invoices in original, unalterable format',
      'Sending PDFs without embedded XML data (not compliant)',
    ],
    officialSources: [
      src(
        'Factur-X — Official Specification',
        'AFNOR (Association Française de Normalisation)',
        'https://www.afnor.org/standard/factur-x/',
        'standard-body',
        '2026-05-01',
        'Cross-sector e-invoice standard in France; mandate basis for B2B/B2G',
      ),
      src(
        'Chorus Pro Portal',
        'Direction Générale des Finances Publiques (DGFiP)',
        'https://chorus-pro.gouv.fr/',
        'government',
        '2026-05-01',
        'French government e-invoicing portal; mandatory registration for B2G and B2B',
      ),
      src(
        'Loi de Finances 2020 — Article 153',
        'Legifrance (French Legal Information Service)',
        'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037305476',
        'government',
        '2026-05-01',
        'Legal mandate basis for mandatory e-invoicing in France',
      ),
    ],
    // --- Navigational Relationships ---
    relatedStandards: ['factur-x', 'en-16931', 'peppol-bis-3', 'ubl-2.1'],
    relatedErpSystems: ['sap', 'odoo', 'netsuite'],
    primaryHook: 'h1-country-readiness',
    relatedCountrySlugs: ['belgium', 'germany', 'spain', 'italy'],
    // --- Meta ---
    lastReviewed: '2026-05-15',
    upcomingMilestones: [
      {
        phase: 'B2B receiving obligation',
        date: '2026-09-01',
        description:
          'All businesses receiving invoices in France must be able to receive e-invoices in Factur-X or UBL 2.1 format.',
        isMandatory: true,
      },
      {
        phase: 'B2B issuing — large and mid-sized companies',
        date: '2026-09-01',
        description:
          'Large companies and mid-sized enterprises (entreprises de taille intermédiaire) must issue e-invoices under the B2B mandate.',
        isMandatory: true,
      },
      {
        phase: 'B2B issuing — SMEs and micro-companies',
        date: '2027-09-01',
        description:
          'Small and medium-sized enterprises and micro-companies join the B2B e-invoicing mandate.',
        isMandatory: true,
      },
    ],
    // --- Display ---
    aiSummary:
      'France is rolling out mandatory electronic invoicing and e-reporting in phased stages. B2G mandatory e-invoicing through Chorus Pro has been in effect since 2020. The B2B e-invoicing mandate is being introduced progressively: the receiving obligation begins for all companies on 1 September 2026, and the issuing obligation begins on 1 September 2026 for large and mid-sized companies, extending to SMEs and micro-companies on 1 September 2027. Businesses must use either Factur-X (a PDF with embedded XML, widely preferred for its readability) or UBL 2.1 (pure XML). Invoices are transmitted via the Chorus Pro portal, the PEPPOL network, or through registered approved service providers (PDP). The platform requirements and scope of the clearing model continue to be clarified by DGFiP.',
  },

  // ============================================================
  {
    slug: 'germany',
    urlSlug: 'germany-e-invoicing',
    name: 'Germany',
    isoCode: 'DE',
    region: 'Europe',
    subRegion: 'EU',
    status: 'mandatory',
    effectiveDate: '2017-11-01',
    mandatePhase: 'B2G mandatory — B2B voluntary with growing adoption',
    enforcementDate: null,
    enforcementStatus: 'upcoming',
    affectedParties: [
      'All federal and state government entities (B2G)',
      'B2B businesses are not mandated but XRechnung adoption is growing',
    ],
    turnoverThreshold: null,
    invoiceTypes: ['B2G'],
    formats: ['xrechnung'],
    routeTypes: ['pepper', 'direct-api'],
    erpImpact: ['sap', 'oracle', 'datev'],
    implementationChecklist: [
      {
        order: 1,
        category: 'legal',
        title: 'Determine if B2G or B2B applies',
        description:
          'XRechnung is mandatory for all B2G invoices to German public authorities. B2B e-invoicing in Germany is currently voluntary. Source: German Federal Ministry of Finance e-invoicing guidance.',
        isCritical: true,
      },
      {
        order: 2,
        category: 'technical',
        title: 'Configure ERP for XRechnung format',
        description:
          'XRechnung is based on EN 16931. Ensure your ERP can generate valid XRechnung XML with all mandatory fields per the XRechnung specification. Source: KoSIT XRechnung specification.',
        isCritical: true,
      },
      {
        order: 3,
        category: 'technical',
        title: 'Validate against XRechnung schema',
        description:
          'Use available validation tools (e.g., from KoSIT) to verify your XRechnung output matches the official specification before sending. Source: KoSIT XRechnung validation suite.',
        isCritical: true,
        externalResource: 'https://www.osit.de/xrechnung/',
      },
      {
        order: 4,
        category: 'operational',
        title: 'Use Peppol network or direct delivery',
        description:
          'XRechnungen can be delivered via Peppol network (using an access point) or directly via email/web portal depending on recipient capability. Source: XRechnung.de official guidance.',
        isCritical: false,
      },
      {
        order: 5,
        category: 'technical',
        title: 'Register Peppol endpoint for government delivery',
        description:
          'If delivering to federal agencies via Peppol, register your Peppol ID with the relevant government entity. Source: Federal Procurement Office (Beschaffungsamt) Peppol guidance.',
        isCritical: false,
      },
    ],
    commonMistakes: [
      'Confusing ZUGFeRD (PDF+XML) with XRechnung (pure XML) — they are different formats',
      'Missing mandatory EN 16931 BT fields in the XML output (e.g., BT-45 buyer VAT)',
      'Incorrect BT codes — using wrong business term identifiers',
      'Not registering Peppol endpoint for direct government delivery',
    ],
    officialSources: [
      src(
        'XRechnung Specification',
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
        'Official validation tools and XRechnung conformance testing',
      ),
      src(
        'Federal Ministry of Finance — XRechnung Guide',
        'Bundesministerium der Finanzen (BMF)',
        'https://www.bundesfinanzministerium.de/Web/DE/Themen/Oeffentliche_Finanzen/Verwaltung_E_Government/XRechnung/xrechnung.html',
        'government',
        '2026-05-01',
        'Official German government guidance on XRechnung mandate for B2G',
      ),
    ],
    relatedStandards: ['xrechnung', 'en-16931', 'peppol-bis-3', 'zugferd'],
    relatedErpSystems: ['sap', 'datev'],
    primaryHook: 'h1-country-readiness',
    relatedCountrySlugs: ['france', 'austria', 'netherlands'],
    lastReviewed: '2026-05-10',
    upcomingMilestones: [
      {
        phase: 'EU B2B mandate expectation',
        date: '2028-01-01',
        description:
          'Expected EU-wide B2B e-invoicing mandate under ViDA package (pending legislative adoption). Source: European Commission ViDA proposal.',
        isMandatory: false,
      },
    ],
    aiSummary:
      'Germany mandates XRechnung (a pure XML format based on EN 16931) for all invoices to federal and state government entities (B2G). The mandate has been in effect since November 2017 for federal authorities. B2B e-invoicing remains voluntary, though XRechnung adoption is increasing as businesses prepare for potential EU-wide mandates. Germany uses the Peppol network for government invoice routing and maintains XRechnung validation tools through KoSIT.',
  },

  // ============================================================
  {
    slug: 'belgium',
    urlSlug: 'belgium-e-invoicing',
    name: 'Belgium',
    isoCode: 'BE',
    region: 'Europe',
    subRegion: 'EU',
    status: 'upcoming',
    effectiveDate: '2026-01-01',
    mandatePhase: 'Phase 1 — B2G and high-turnover B2B',
    enforcementDate: '2026-01-01',
    enforcementStatus: 'upcoming',
    affectedParties: [
      'B2G — all suppliers to government',
      'B2B — businesses above €85,000 annual turnover threshold',
    ],
    turnoverThreshold: '€85,000 annual turnover (B2B threshold)',
    invoiceTypes: ['B2G', 'B2B'],
    formats: ['ubl-2.1', 'xrechnung'],
    routeTypes: ['pepper', 'direct-api'],
    erpImpact: ['sap', 'oracle', 'odoo', 'sage'],
    implementationChecklist: [
      {
        order: 1,
        category: 'legal',
        title: 'Register on Mercurius platform',
        description:
          'Mercurius is Belgium\'s central e-invoicing platform. Register to send and receive compliant invoices before the mandate date. Source: Belgian Federal Public Service Finance.',
        isCritical: true,
        externalResource: 'https://mercurius.be',
      },
      {
        order: 2,
        category: 'legal',
        title: 'Determine if your turnover triggers Phase 1',
        description:
          'If annual turnover exceeds €85,000, you are in the first phase of the B2B mandate starting January 2026. Source: Belgian e-invoicing legislation (KB/KB of 2024).',
        isCritical: true,
      },
      {
        order: 3,
        category: 'technical',
        title: 'Select e-invoice format',
        description:
          'Belgium mandates UBL 2.1 as the primary format, with XRechnung also accepted as it aligns with EN 16931. Source: Belgian Ministry of Finance e-invoicing framework.',
        isCritical: true,
      },
      {
        order: 4,
        category: 'technical',
        title: 'Implement Peppol access point or Mercurius API',
        description:
          'Connect to the Peppol network via an access point, or integrate via the Mercurius API for direct submission. Source: OpenPeppol network documentation.',
        isCritical: true,
      },
      {
        order: 5,
        category: 'operational',
        title: 'Update ERP data fields for UBL 2.1',
        description:
          'Map your ERP invoice fields to UBL 2.1 structure. Key fields: VAT numbers (BT-28, BT-45), company IDs (BT-29), invoice lines, tax breakdown. Source: OASIS UBL 2.1 specification.',
        isCritical: true,
      },
    ],
    commonMistakes: [
      'Missing cross-border VAT number (BT-159) for international transactions',
      'Incorrect party identification codes — using national IDs instead of Peppol IDs',
      'Not registering on Mercurius before the mandate date',
    ],
    officialSources: [
      src(
        'Mercurius — Belgian E-Invoicing Platform',
        'Federal Public Service Finance, Belgium',
        'https://mercurius.be',
        'government',
        '2026-05-01',
        'Central platform for e-invoicing in Belgium; mandate timeline and registration',
      ),
      src(
        'Belgium E-Invoicing Legislation',
        'Federale Overheidsdienst Financiën',
        'https://finances.belgium.be',
        'government',
        '2026-05-01',
        'Legal framework, turnover thresholds, and mandate scope',
      ),
    ],
    relatedStandards: ['ubl-2.1', 'en-16931', 'xrechnung', 'peppol-bis-3'],
    relatedErpSystems: ['sap', 'odoo'],
    primaryHook: 'h1-country-readiness',
    sectionNearTop: {
      heading: 'Belgium e-invoicing mandate: Peppol, EN 16931, and what teams should check',
      body: 'For teams assessing e invoicing Belgium compliance, the mandatory rollout from January 2026 is anchored to the European semantic model EN 16931. For teams assessing e-invoicing Belgium readiness, the key formats are UBL 2.1 and XRechnung — both structured invoice formats aligned with EN 16931. Peppol BIS Billing 3.0 (Peppol BIS 3.0) provides a reference implementation of EN 16931 semantics over UBL 2.1 syntax, and a Peppol Access Point can handle routing for businesses exchanging e-invoices internationally. Implementation planning should cover ERP export configuration for structured invoice fields, format selection, and transmission route assessment.',
      links: [
        { label: 'EN 16931 Invoice Standard', href: '/standards/en-16931/' },
        { label: 'Peppol BIS Billing 3.0', href: '/standards/peppol-bis-3/' },
        { label: 'Peppol Access Point Route', href: '/routes/peppol-access-point/' },
      ],
    },
    relatedCountrySlugs: ['france', 'netherlands', 'luxembourg'],
    lastReviewed: '2026-05-20',
    upcomingMilestones: [
      {
        phase: 'Phase 1 mandate',
        date: '2026-01-01',
        description: 'B2G and high-turnover B2B mandatory e-invoicing',
        isMandatory: true,
      },
      {
        phase: 'Phase 2 expansion',
        date: '2028-01-01',
        description: 'Lower turnover threshold B2B inclusion',
        isMandatory: false,
      },
    ],
    aiSummary:
      'Belgium is implementing a phased mandatory e-invoicing system beginning January 2026. Phase 1 covers all B2G transactions and B2B transactions where the supplier or customer has annual turnover exceeding €85,000. The mandate uses UBL 2.1 as the primary format, connected via the Peppol network or direct API to the Mercurius platform. Smaller businesses are expected to be included in subsequent phases through 2030.',
  },

  // ============================================================
  {
    slug: 'spain',
    urlSlug: 'spain-e-invoicing',
    name: 'Spain',
    isoCode: 'ES',
    region: 'Europe',
    subRegion: 'EU',
    status: 'mandatory',
    effectiveDate: '2015-07-01',
    mandatePhase: 'B2G mandatory — B2B mandatory via SII',
    enforcementDate: '2017-07-01',
    enforcementStatus: 'strict',
    affectedParties: [
      'All businesses registered for VAT in Spain',
      'B2G suppliers',
    ],
    turnoverThreshold: null,
    invoiceTypes: ['B2G', 'B2B'],
    formats: ['facturae', 'ubl-2.1'],
    routeTypes: ['portal', 'direct-api'],
    erpImpact: ['sap', 'oracle', 'odoo', 'sage'],
    implementationChecklist: [
      {
        order: 1,
        category: 'legal',
        title: 'Register for SII (Suministro Inmediato de Información)',
        description:
          'SII is Spain\'s real-time VAT reporting system. All businesses with VAT registration must enroll. Source: Agencia Tributaria (AEAT) SII guidance.',
        isCritical: true,
      },
      {
        order: 2,
        category: 'technical',
        title: 'Issue invoices in Facturae 3.2 or 4.0 format',
        description:
          'Spain uses Facturae as its national format, with UBL 2.1 accepted in some contexts. Facturae 4.0 is the current version. Source: Ministerio de Hacienda y Función Pública.',
        isCritical: true,
      },
      {
        order: 3,
        category: 'operational',
        title: 'Submit via FACe portal or web services',
        description:
          'Government invoices must go through FACe portal. B2B SII submissions are done via AEAT web services. Source: FACe portal documentation.',
        isCritical: true,
        externalResource: 'https://face.gob.es/',
      },
      {
        order: 4,
        category: 'legal',
        title: 'Comply with 4-year archive requirement',
        description:
          'All invoices must be archived for at least 4 years (6 years for tax purposes in some cases). Source: Spanish tax code (Ley General Tributaria).',
        isCritical: true,
      },
    ],
    commonMistakes: [
      'Not registering for SII on time — the deadline for enrollment has passed',
      'Incorrect invoice numbering sequence',
      'Missing mandatory fields in Facturae XML',
    ],
    officialSources: [
      src(
        'FACe — Spanish E-Invoicing Portal',
        'Ministerio de Hacienda y Función Pública',
        'https://face.gob.es/',
        'government',
        '2026-05-01',
        'Government portal for B2G e-invoicing in Spain',
      ),
      src(
        'AEAT — SII Information',
        'Agencia Tributaria (Spanish Tax Agency)',
        'https://sede.agenciatributaria.gob.es',
        'tax-authority',
        '2026-05-01',
        'Real-time VAT reporting (SII) and B2B mandate framework',
      ),
    ],
    relatedStandards: ['facturae', 'en-16931', 'ubl-2.1'],
    relatedErpSystems: ['sap', 'odoo'],
    primaryHook: 'h1-country-readiness',
    relatedCountrySlugs: ['france', 'portugal', 'italy'],
    lastReviewed: '2026-05-10',
    aiSummary:
      'Spain has one of the most established e-invoicing systems in the EU, combining a B2G mandate since 2015 with the SII (Immediate Supply of Information) real-time VAT reporting system for all B2B transactions. The national format is Facturae, an XML-based standard maintained by the Ministry. Spain operates through the FACe portal for government invoices and the AEAT (Tax Agency) web services for SII reporting.',
  },

  // ============================================================
  {
    slug: 'italy',
    urlSlug: 'italy-e-invoicing',
    name: 'Italy',
    isoCode: 'IT',
    region: 'Europe',
    subRegion: 'EU',
    status: 'mandatory',
    effectiveDate: '2019-01-01',
    mandatePhase: 'Full B2B and B2G mandate — SDI clearing model',
    enforcementDate: '2019-01-01',
    enforcementStatus: 'strict',
    affectedParties: [
      'All businesses issuing or receiving invoices in Italy',
      'Cross-border sellers to Italian entities',
    ],
    turnoverThreshold: null,
    invoiceTypes: ['B2B', 'B2G'],
    formats: ['fattura-pa'],
    routeTypes: ['portal', 'direct-api'],
    erpImpact: ['sap', 'oracle', 'odoo', 'sage'],
    implementationChecklist: [
      {
        order: 1,
        category: 'legal',
        title: 'Register with SDI (Sistema di Interscambio)',
        description:
          'SDI is Italy\'s central clearing system. All invoice transmitters and receivers must be registered. Source: Agenzia delle Entrate SDI guidance.',
        isCritical: true,
        externalResource: 'https://www.agenziaentrate.gov.it',
      },
      {
        order: 2,
        category: 'technical',
        title: 'Generate FatturaPA XML',
        description:
          'Italy requires FatturaPA XML format (based on FatturaElettronica schema). Ensure your ERP generates valid XML per the official specification. Source: FatturaPA specification from Agenzia delle Entrate.',
        isCritical: true,
        externalResource: 'https://www.fatturapa.gov.it/',
      },
      {
        order: 3,
        category: 'operational',
        title: 'Choose transmission channel',
        description:
          'Options: via SDI web portal (for low volume), via SDI web services/API (for automation), via a certified intermediary (provider). Source: SDI technical documentation.',
        isCritical: true,
      },
      {
        order: 4,
        category: 'legal',
        title: 'Set up legal archive',
        description:
          'Invoices must be archived for 10 years in an unalterable format. Ensure your archiving solution is compliant with SDI requirements. Source: Italian tax code (Decreto IVA).',
        isCritical: true,
      },
    ],
    commonMistakes: [
      'Sending invoices without first registering with SDI',
      'Incorrect VAT identification numbers (Partita IVA)',
      'Missing mandatory fields: CedentePrestatore (supplier), CessionarioCommittente (buyer), DatiTrasmissione',
      'Using wrong SDI channel code',
    ],
    officialSources: [
      src(
        'SDI — Sistema di Interscambio',
        'Agenzia delle Entrate (Italian Revenue Agency)',
        'https://www.agenziaentrate.gov.it',
        'tax-authority',
        '2026-05-01',
        'Central clearing system for e-invoices in Italy; mandate framework and registration',
      ),
      src(
        'FatturaPA Specification',
        'Agenzia delle Entrate',
        'https://www.fatturapa.gov.it/',
        'government',
        '2026-05-01',
        'Official FatturaPA XML schema specification and technical documentation',
      ),
    ],
    relatedStandards: ['fattura-pa', 'en-16931'],
    relatedErpSystems: ['sap', 'odoo'],
    primaryHook: 'h1-country-readiness',
    relatedCountrySlugs: ['france', 'spain', 'portugal'],
    lastReviewed: '2026-05-10',
    aiSummary:
      'Italy operates a strict clearing house model through SDI (Sistema di Interscambio), one of the most comprehensive in Europe. The mandate covers all B2B and B2G transactions. Every invoice must be transmitted through SDI, which validates format, VAT numbers, and routing before forwarding to the recipient. The FatturaPA XML format is mandatory. Italy also implements CTC (Continuous Transaction Controls) for VAT — SDI acts as the real-time validation and reporting system.',
  },

  // ============================================================
  {
    slug: 'uk',
    name: 'United Kingdom',
    isoCode: 'GB',
    region: 'Europe',
    subRegion: 'Non-EU',
    status: 'upcoming',
    effectiveDate: null,
    mandatePhase: 'Consultation — mandatory e-invoicing under consideration',
    enforcementDate: null,
    enforcementStatus: 'upcoming',
    affectedParties: [
      'Government suppliers (existing P2P mandates)',
      'B2B — under consideration',
    ],
    turnoverThreshold: null,
    invoiceTypes: ['B2G'],
    formats: ['peppol-bis-3'],
    routeTypes: ['pepper', 'direct-api'],
    erpImpact: ['sap', 'oracle', 'sage', 'xero'],
    implementationChecklist: [
      {
        order: 1,
        category: 'legal',
        title: 'Check government P2P requirements',
        description:
          'UK government departments follow Peppol-based P2P requirements. If you supply to government, check Peppol UK conformance. Source: Government Digital Service (GDS) Procurement Gateway guidance.',
        isCritical: false,
      },
      {
        order: 2,
        category: 'operational',
        title: 'Monitor HMRC e-invoicing developments',
        description:
          'HMRC is evaluating a mandatory e-invoicing framework aligned with EU developments. Monitor for consultation outcomes and timeline updates. Source: HMRC Making Tax Digital programme.',
        isCritical: false,
      },
    ],
    commonMistakes: [
      'Assuming UK will mirror EU timelines — UK policy is independent post-Brexit',
      'Not preparing Peppol capability for government suppliers',
    ],
    officialSources: [
      src(
        'UK Peppol Framework',
        'Government Digital Service (GDS)',
        'https://www.gov.uk/government/publications/public-procurement-gateway',
        'government',
        '2026-05-01',
        'Public procurement gateway and Peppol-based e-invoicing for UK government',
      ),
      src(
        'HMRC — Making Tax Digital',
        'HM Revenue & Customs',
        'https://www.gov.uk/government/publications/making-tax-digital/overview',
        'tax-authority',
        '2026-05-01',
        'UK government VAT digitalisation programme; e-invoicing policy context',
      ),
    ],
    relatedStandards: ['peppol-bis-3', 'en-16931'],
    relatedErpSystems: ['sage', 'xero'],
    primaryHook: 'h1-country-readiness',
    relatedCountrySlugs: ['france', 'germany'],
    lastReviewed: '2026-05-15',
    aiSummary:
      'The UK currently mandates e-invoicing for government procurement through Peppol-based public procurement gateways, but has no general B2B mandate. HMRC has been exploring mandatory e-invoicing frameworks aligned with EU developments, with a potential mandate timeline under consideration. UK businesses exporting to EU countries should prioritize EU mandate compliance first.',
  },

  // ============================================================
  {
    slug: 'netherlands',
    name: 'Netherlands',
    isoCode: 'NL',
    region: 'Europe',
    subRegion: 'EU',
    status: 'mandatory',
    effectiveDate: '2017-04-01',
    mandatePhase: 'B2G mandatory — B2B through Peppol ecosystem',
    enforcementDate: '2017-04-01',
    enforcementStatus: 'strict',
    affectedParties: ['Government suppliers (B2G)'],
    turnoverThreshold: null,
    invoiceTypes: ['B2G'],
    formats: ['simpler-invoice', 'ubl-2.1', 'xrechnung'],
    routeTypes: ['pepper'],
    erpImpact: ['sap', 'oracle', 'exact', 'afas'],
    implementationChecklist: [
      {
        order: 1,
        category: 'legal',
        title: 'Register Peppol endpoint',
        description:
          'Obtain a Peppol ID (EAS code + party ID) for routing invoices via the Peppol network. Source: SimplerInvoicing foundation and Peppol Netherlands.',
        isCritical: true,
        externalResource: 'https://www.peppol.nl/',
      },
      {
        order: 2,
        category: 'technical',
        title: 'Generate compliant invoice format',
        description:
          'SimplerInvoice is the Netherlands\' standard, though UBL 2.1 and XRechnung are also accepted via Peppol. Source: SimplerInvoicing specification.',
        isCritical: true,
        externalResource: 'https://www.simplerinvoicing.org/',
      },
      {
        order: 3,
        category: 'operational',
        title: 'Use Peppol access point',
        description:
          'Route all government invoices through a Peppol access point. Most Dutch ERP systems have native Peppol support. Source: OpenPeppol network documentation.',
        isCritical: true,
      },
    ],
    commonMistakes: [
      'Not registering Peppol endpoint before invoicing government',
      'Using incorrect Peppol ID format',
    ],
    officialSources: [
      src(
        'Peppol Netherlands',
        'Logius (Dutch Government Digital Standards Body)',
        'https://www.peppol.nl/',
        'government',
        '2026-05-01',
        'Dutch Peppol infrastructure, registration, and mandate guidance',
      ),
      src(
        'SimplerInvoicing',
        'SimplerInvoicing Foundation',
        'https://www.simplerinvoicing.org/',
        'standard-body',
        '2026-05-01',
        'Dutch national e-invoicing standard; mandate basis for B2G',
      ),
    ],
    relatedStandards: ['simpler-invoice', 'en-16931', 'peppol-bis-3', 'ubl-2.1'],
    relatedErpSystems: ['exact'],
    primaryHook: 'h1-country-readiness',
    relatedCountrySlugs: ['belgium', 'germany', 'luxembourg'],
    lastReviewed: '2026-05-08',
    aiSummary:
      'The Netherlands was one of the early adopters of Peppol-based e-invoicing for government procurement. The mandate has been in place since 2017 and uses the SimplerInvoice national standard alongside other Peppol BIS formats. The Netherlands is home to Peppol\'s largest network adoption in Europe, making it a model for Peppol-first approaches.',
  },
];

export function getCountryBySlug(slug: string): Country | undefined {
  return countries.find((c) => c.slug === slug);
}

export function getCountriesByRegion(region: string): Country[] {
  return countries.filter((c) => c.region === region);
}

export function getUpcomingCountries(): Country[] {
  return countries
    .filter((c) => c.status === 'upcoming')
    .sort((a, b) => {
      if (!a.effectiveDate) return 1;
      if (!b.effectiveDate) return -1;
      return a.effectiveDate.localeCompare(b.effectiveDate);
    });
}

export function getActiveMandateCountries(): Country[] {
  return countries.filter((c) => c.status === 'active' || c.status === 'mandatory');
}
