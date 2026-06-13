// ============================================================
// EInvoiceAtlas — Provider Routes Data
// Route descriptions distinguish mandatory from advisory requirements.
// ============================================================

import type { ProviderRoute } from './types';

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

export const providerRoutes: ProviderRoute[] = [
  // ============================================================
  {
    slug: 'peppol-access-point',
    urlSlug: 'peppol-access-point',
    title: 'Peppol Access Point',
    metaTitle: 'Peppol Access Point Provider Checklist',
    metaDescription:
      'Learn what a Peppol Access Point is, when you need one, and how to compare provider routing, ERP integration, EN 16931, and Peppol invoices.',
    h1: 'Peppol Access Point',
    aiSummary:
      'A Peppol Access Point is the routing layer that sends and receives Peppol invoice traffic for your ERP or e-invoicing platform. Teams use it when they need a provider to exchange Peppol BIS Billing 3.0 documents, validate routing, and connect their invoice export flow to the Peppol network. The decision is about network access and transport, not about replacing the invoice format itself.',
    quickAnswer: [
      {
        question: 'What is a Peppol Access Point?',
        answer: 'A Peppol Access Point is a certified routing service that sends and receives Peppol documents — including Peppol BIS Billing 3.0 invoices — through the Peppol Network. Think of it as the postal service for e-invoices: your ERP sends an invoice to your Access Point, which routes it across the network to the recipient\'s Access Point, which delivers it to their system.',
        order: 1,
      },
      {
        question: 'Do businesses need their own Access Point?',
        answer: 'Not necessarily. Most businesses subscribe to a commercial Access Point provider rather than running their own. The provider handles connectivity, Peppol ID registration, validation, and delivery confirmation. A business needs its own Access Point only if it has the infrastructure and technical team to operate one and has received Peppol accreditation.',
        order: 2,
      },
      {
        question: 'What is the four-corner model in Peppol?',
        answer: 'The Peppol four-corner model describes the flow: Corner 1 (sender ERP) generates a Peppol BIS 3.0 invoice; Corner 2 (sender Access Point) validates, signs, and sends it; Corner 3 (receiver Access Point) receives and validates it; Corner 4 (receiver ERP) processes the invoice. The two Access Points handle routing, signature verification, and transport — the sender and receiver ERP only interact with their respective Access Point.',
        order: 3,
      },
      {
        question: 'What should ERP teams check first?',
        answer: 'Confirm ERP export support for Peppol BIS Billing 3.0 (UBL 2.1 XML), Peppol invoice field mapping, and whether your ERP has native Peppol connectivity or needs middleware. Then assess Access Point provider options based on your country coverage, ERP integration method, and invoice volume.',
        order: 4,
      },
    ],
    routeUseCase:
      'Use a Peppol Access Point when you need a provider to route Peppol invoices from your ERP or middleware into the Peppol network, especially when you want a structured provider selection checklist, ERP integration support, and a controlled way to exchange Peppol BIS Billing 3.0 documents.',
    comparisonNote:
      'Peppol Access Point is the transport and routing service. Peppol BIS Billing 3.0 is the invoice format/specification that your ERP or middleware must generate. A provider can help with connectivity, validation, and delivery, but it does not replace EN 16931, UBL Invoice mapping, or your ERP export design.',
    providerChecklist: [
      'Confirm the provider is a real Peppol Access Point provider with the routing coverage you need.',
      'Check support for Peppol BIS Billing 3.0, EN 16931 alignment, and UBL Invoice input.',
      'Review ERP integration options, API documentation, and validation tooling.',
      'Ask how delivery receipts, error handling, and monitoring are exposed to your team.',
      'Confirm onboarding, participant ID handling, and country coverage for your trading partners.',
    ],
    erpQuestions: [
      'Can our ERP export the invoice fields required for Peppol BIS Billing 3.0?',
      'Do we need middleware to map ERP data into UBL Invoice or another compatible syntax?',
      'How will we validate the invoice before it reaches the Peppol Access Point?',
      'What does the provider expose for retries, receipts, and troubleshooting?',
    ],
    countryRelevance: [
      'Belgium uses Peppol heavily in public-sector and broader e-invoicing workflows.',
      'Germany teams often compare Peppol routing with XRechnung and SAP-ready ERP exports.',
      'France may involve Peppol routing alongside Factur-X and PDP route decisions.',
      'The Netherlands is relevant where cross-border Peppol invoice exchange is part of the operating model.',
    ],
    commonMistakes: [
      'Choosing a provider before confirming the country route and invoice format.',
      'Confusing Peppol Access Point routing with Peppol BIS Billing 3.0 invoice structure.',
      'Ignoring ERP export and validation constraints until late in implementation.',
      'Assuming the access point alone guarantees compliance across every country.',
    ],
    pros: [
      'Global route into the Peppol network',
      'Supports invoice delivery receipts and transport visibility',
      'Useful for ERP integration and controlled routing',
    ],
    cons: [
      'Requires correct invoice format preparation upstream',
      'Provider capabilities vary by country and ERP stack',
      'Route selection still depends on local mandate context',
    ],
    bestFor: [
      'Teams comparing Peppol provider options',
      'ERP owners planning invoice routing',
      'Businesses needing a provider selection checklist',
    ],
    formatsCompatible: ['peppol-bis-3', 'ubl-2.1', 'xrechnung', 'en-16931'],
    sectionNearTop: {
      heading: 'Peppol Access Point: how it works, when you need one, and what to check before choosing a provider',
      body: 'A Peppol Access Point is the routing layer that connects your invoice export to the Peppol Network. On its own, generating a Peppol BIS Billing 3.0 invoice from your ERP does not deliver it — you need an Access Point to transmit it to the network, validate it against Peppol rules, and route it to the recipient. The Access Point is the transport and routing layer; Peppol BIS Billing 3.0 is the invoice format that your ERP must generate. Before choosing an Access Point provider, confirm that your ERP can export valid UBL 2.1 XML invoices conforming to Peppol BIS Billing 3.0, and that the provider supports the countries and ERP systems in your operating model. Access Points do not replace EN 16931 compliance, UBL mapping, or your ERP export design — they handle connectivity, delivery receipts, and routing once the invoice is ready.',
      links: [
        { label: 'Peppol BIS Billing 3.0', href: '/standards/peppol-bis-3/' },
        { label: 'EN 16931 Invoice Standard', href: '/standards/en-16931/' },
        { label: 'Belgium E-Invoicing', href: '/countries/belgium-e-invoicing/' },
        { label: 'France E-Invoicing', href: '/countries/france-e-invoicing/' },
      ],
    },
    comparisonBlock: 'Comparing Peppol Access Point routing with other routes: Peppol BIS Billing 3.0 (format) vs Peppol Access Point (transport) vs EN 16931 (semantic model). The Access Point is the certified Peppol routing service — it carries the invoice across the Peppol network, not the format itself. Peppol BIS Billing 3.0 is what your ERP generates; the Access Point is how it reaches the Peppol network. EN 16931 is the data model that both Peppol BIS 3 and other formats reference — it defines what information must be in an invoice, not how it gets from A to B.',
    countriesApplicable: ['belgium', 'germany', 'france', 'netherlands', 'uk'],
    complexity: 'medium',
    costIndicators: 'Provider pricing depends on volume, onboarding scope, and ERP integration effort.',
    keyProviders: ['Peppol Access Point providers', 'ERP integration partners', 'E-invoicing providers'],
    officialSources: [
      src(
        'Peppol BIS Billing 3.0',
        'OpenPeppol AS',
        'https://docs.peppol.eu/poacc/billing/3.0/',
        'standard-body',
        '2026-06-02',
        'Invoice specification and validation rules used by Peppol routing',
      ),
      src(
        'The Peppol Network',
        'OpenPeppol AS',
        'https://peppol.eu/the-network/',
        'standard-body',
        '2026-06-02',
        'Network overview and access point model',
      ),
    ],
    relatedCountrySlugs: ['belgium', 'germany', 'france', 'netherlands', 'uk'],
    relatedStandardSlugs: ['peppol-bis-3', 'en-16931', 'ubl-2.1'],
    lastReviewed: '2026-06-02',
    shortlistCta: 'Request a provider shortlist for your ERP and country route.',
    ctaTitle: 'Request provider shortlist',
  },
  // ============================================================
  {
    slug: 'peppol-network',
    name: 'Peppol Network Route',
    shortDescription: 'Send invoices via the global Peppol e-delivery network.',
    description:
      'The Peppol network is a global e-invoicing infrastructure connecting businesses, governments, and ERP systems across 40+ countries. To use Peppol, you need a Peppol ID (obtained through a Peppol Registration Authority) and an access point subscription. Peppol handles routing, delivery confirmation, and interoperability.',
    howItWorks:
      '1. Generate your invoice in Peppol BIS 3.0 format. 2. Send it to your Peppol access point. 3. The access point routes the invoice to the recipient\'s access point using the Peppol network. 4. The recipient\'s system receives and processes the invoice. 5. Delivery receipt is returned to you.',
    requirements: [
      { category: 'technical', item: 'Generate Peppol BIS 3.0 XML invoice', isMandatory: true },
      { category: 'technical', item: 'Subscribe to a Peppol access point provider', isMandatory: true },
      { category: 'operational', item: 'Obtain a Peppol ID (EAS code + Party ID)', isMandatory: true },
      { category: 'operational', item: 'Register your Peppol ID with trading partners', isMandatory: false },
    ],
    pros: [
      'Global coverage across 40+ countries',
      'Standardized format ensures interoperability',
      'Built-in delivery and read receipts',
      'No need to manage bilateral integrations with each partner',
      'Growing network effect — more recipients joining daily',
    ],
    cons: [
      'Access point subscription cost',
      'Requires Peppol BIS 3.0 format compliance',
      'Some countries have additional national format requirements',
    ],
    bestFor: [
      'Businesses with international operations',
      'Companies sending to multiple countries',
      'Organizations that want a standardized approach',
      'Suppliers to EU governments',
    ],
    formatsCompatible: ['peppol-bis-3', 'xrechnung'],
    countriesApplicable: ['france', 'germany', 'belgium', 'netherlands', 'uk', 'australia', 'singapore'],
    complexity: 'medium',
    costIndicators: 'Monthly subscription: $50-$500/month depending on volume. Some providers charge per invoice.',
    keyProviders: ['Pagero', 'Sella Business Solutions', 'SAP Business Network', 'Transporeon', 'Coupa Business Spend Management'],
    officialSources: [
      src(
        'Peppol BIS 3.0 Specification',
        'OpenPeppol AS',
        'https://docs.peppol.eu/poacc/billing/3.0/',
        'standard-body',
        '2026-05-01',
        'Peppol BIS 3.0 format specification; mandatory for Peppol network transmission',
      ),
      src(
        'Peppol Network — About',
        'OpenPeppol AS',
        'https://peppol.eu/the-network/',
        'standard-body',
        '2026-05-01',
        'Peppol network infrastructure, access point directory, and coverage information',
      ),
    ],
    // --- Navigational Relationships ---
    relatedCountrySlugs: ['france', 'germany', 'belgium', 'netherlands', 'uk'],
    relatedStandardSlugs: ['peppol-bis-3', 'xrechnung', 'en-16931'],
    // --- Meta ---
    lastReviewed: '2026-05-15',
  },


  // ============================================================
  {
    slug: 'direct-api',
    name: 'Direct API / Government Portal Route',
    shortDescription: 'Submit invoices directly via country-specific portals or APIs.',
    description:
      'Many countries operate their own e-invoicing portals (e.g., Chorus Pro in France, SDI in Italy, FACe in Spain) where invoices must be submitted directly. This route requires country-specific integration but bypasses the Peppol network for domestic transactions.',
    howItWorks:
      '1. Generate invoice in the country-specific format (Factur-X, FatturaPA, Facturae, etc.). 2. Submit directly to the government portal via web interface, API, or web service. 3. The portal validates the format and routing. 4. The portal forwards to the recipient. 5. A receipt/confirmation is returned.',
    requirements: [
      { category: 'legal', item: 'Register with the country-specific portal (e.g., Chorus Pro, SDI)', isMandatory: true },
      { category: 'technical', item: 'Generate the country-specific XML format', isMandatory: true },
      { category: 'technical', item: 'Connect via API or web service (for automation)', isMandatory: false },
      { category: 'operational', item: 'Understand portal-specific validation rules', isMandatory: true },
    ],
    pros: [
      'Direct connection to government clearing systems',
      'Often free or low-cost (government-operated portals)',
      'Ensures compliance with country-specific mandates',
      'No access point subscription needed for direct portal use',
    ],
    cons: [
      'Country-specific — requires separate integration per country',
      'Manual web portal submission is slow for high volumes',
      'Portal API availability and stability varies',
      'May not support international cross-border delivery',
    ],
    bestFor: [
      'Single-country operations',
      'Low-to-medium invoice volumes',
      'Businesses that prefer direct government system access',
      'Companies starting with one mandatory country',
    ],
    formatsCompatible: ['factur-x', 'fattura-pa', 'facturae', 'xrechnung', 'ubl-2.1'],
    countriesApplicable: ['france', 'italy', 'spain', 'germany'],
    complexity: 'medium',
    costIndicators: 'Portal access is typically free. API integration may require development effort.',
    keyProviders: ['Chorus Pro (France)', 'SDI — Sistema di Interscambio (Italy)', 'FACe (Spain)', 'KoSIT XRechnung Portal (Germany)'],
    officialSources: [
      src(
        'Chorus Pro Portal',
        'Direction Générale des Finances Publiques (DGFiP)',
        'https://chorus-pro.gouv.fr/',
        'government',
        '2026-05-01',
        'French government e-invoicing portal; mandatory for France B2B and B2G',
      ),
      src(
        'SDI — Sistema di Interscambio',
        'Agenzia delle Entrate',
        'https://www.agenziaentrate.gov.it',
        'tax-authority',
        '2026-05-01',
        'Italian clearing system for mandatory e-invoices; SDI technical documentation',
      ),
    ],
    relatedCountrySlugs: ['france', 'italy', 'spain', 'germany'],
    relatedStandardSlugs: ['factur-x', 'fattura-pa', 'facturae', 'xrechnung', 'en-16931'],
    lastReviewed: '2026-05-15',
  },

  // ============================================================
  {
    slug: 'clearing-house',
    name: 'Clearing House / PDP Route',
    shortDescription: 'Route invoices through a certified intermediary (SDI in Italy; PDP-based model for France B2B rollout from 2026).',
    description:
      'In Italy, all B2B invoices must pass through a certified intermediary — SDI (Sistema di Interscambio) — which validates, logs, and forwards invoices. In France, a similar platform-based model is being introduced under the phased B2B mandate beginning September 2026, requiring transmission through registered approved service providers (PDP — Plateforme de Dématérialisation Partenaires).',
    howItWorks:
      '1. Generate invoice in the required format. 2. Send to your chosen PDP via API. 3. PDP validates format, VAT numbers, and compliance. 4. PDP routes to buyer (who may also use a PDP or the government clearing system). 5. PDP provides a validation receipt. 6. PDP reports to tax authorities.',
    requirements: [
      { category: 'legal', item: 'Choose and register with a certified PDP', isMandatory: true },
      { category: 'technical', item: 'Generate the mandated format (Factur-X, FatturaPA)', isMandatory: true },
      { category: 'technical', item: 'API integration with PDP', isMandatory: true },
      { category: 'operational', item: 'Ensure buyer can receive via PDP or government system', isMandatory: true },
    ],
    pros: [
      'Mandatory for compliance in Italy; required for France B2B from September 2026',
      'PDPs provide format validation and compliance checks',
      'PDPs handle tax authority reporting',
      'Reduces bilateral integration requirements',
    ],
    cons: [
      'Mandatory route in Italy; becomes mandatory for France B2B from September 2026 — no alternatives for in-scope companies',
      'PDP subscription costs',
      'Buyer and supplier must both be on compatible PDPs',
      'Complexity increases with cross-border transactions',
    ],
    bestFor: [
      'French or Italian businesses with B2B transactions',
      'Foreign companies selling to French or Italian entities',
      'Companies needing tax authority reporting automation',
    ],
    formatsCompatible: ['factur-x', 'fattura-pa'],
    countriesApplicable: ['france', 'italy'],
    complexity: 'high',
    costIndicators: 'PDP subscription: varies by provider and volume. Typically $100-$1000/month for SME volumes.',
    keyProviders: ['ChapsVision (France)', 'ESL Networks (France)', 'Cegid (France)', 'Noovle (Italy)', 'InfoCamere (Italy)'],
    officialSources: [
      src(
        'Chorus Pro — PDP Information',
        'Direction Générale des Finances Publiques (DGFiP)',
        'https://chorus-pro.gouv.fr/',
        'government',
        '2026-05-01',
        'List of certified PDPs for France; mandatory route for B2B e-invoicing',
      ),
      src(
        'SDI — FatturaPA Specification',
        'Agenzia delle Entrate',
        'https://www.fatturapa.gov.it/',
        'tax-authority',
        '2026-05-01',
        'Italian clearing system mandate; mandatory FatturaPA format for all B2B and B2G',
      ),
    ],
    relatedCountrySlugs: ['france', 'italy'],
    relatedStandardSlugs: ['factur-x', 'fattura-pa', 'en-16931'],
    lastReviewed: '2026-05-15',
  },

  // ============================================================
  {
    slug: 'hybrid',
    name: 'Hybrid / Multi-Route Approach',
    shortDescription: 'Combine multiple e-invoicing routes for different countries and transaction types.',
    description:
      'Large or internationally diverse organizations often need to support multiple e-invoicing routes simultaneously — Peppol for international partners, a PDP for France, SDI for Italy, and direct portal for Germany. A hybrid approach uses middleware or a platform that can route to the appropriate destination.',
    howItWorks:
      '1. Generate invoice in a neutral intermediate format or country-specific format. 2. Route through middleware that determines the destination. 3. Middleware transforms to the required format and transmits via the appropriate channel (Peppol, PDP, portal). 4. Delivery receipts and confirmations are aggregated back to the source.',
    requirements: [
      { category: 'technical', item: 'Middleware or integration platform', isMandatory: true },
      { category: 'technical', item: 'Format transformation capabilities', isMandatory: true },
      { category: 'operational', item: 'Country-specific format templates', isMandatory: true },
      { category: 'operational', item: 'Connection to multiple channels (Peppol, PDPs, portals)', isMandatory: true },
    ],
    pros: [
      'Single integration point for all countries',
      'Handles format conversion automatically',
      'Future-proof — can add new countries without re-integration',
      'Consolidated reporting and error handling',
    ],
    cons: [
      'Middleware subscription cost',
      'Additional system in the integration landscape',
      'Middleware becomes a critical dependency',
      'Configuration complexity for multi-format mapping',
    ],
    bestFor: [
      'Multi-national organizations',
      'Companies with operations in 3+ countries',
      'Businesses needing to support both Peppol and country-specific mandates',
      'Organizations with complex ERP landscapes',
    ],
    formatsCompatible: ['peppol-bis-3', 'factur-x', 'fattura-pa', 'facturae', 'xrechnung', 'ubl-2.1'],
    countriesApplicable: ['france', 'germany', 'italy', 'spain', 'belgium', 'netherlands', 'uk'],
    complexity: 'high',
    costIndicators: 'Middleware/platform subscription: $500-$5000+/month depending on volume and complexity.',
    keyProviders: ['SAP Business Network', 'Sage Intacct', 'Trulioo (for Latin America)', 'Pagero', 'Celigo'],
    officialSources: [
      src(
        'SAP Business Network',
        'SAP SE',
        'https://www.sap.com/products/business-network.html',
        'erp-docs',
        '2026-05-01',
        'Multi-country e-invoicing network; supports Peppol, country-specific formats, and hybrid routing',
      ),
      src(
        'Peppol BIS 3.0 Specification',
        'OpenPeppol AS',
        'https://docs.peppol.eu/poacc/billing/3.0/',
        'standard-body',
        '2026-05-01',
        'Format specifications for multi-country e-invoicing via Peppol',
      ),
    ],
    relatedCountrySlugs: ['france', 'germany', 'italy', 'spain', 'belgium', 'netherlands', 'uk'],
    relatedStandardSlugs: ['peppol-bis-3', 'factur-x', 'fattura-pa', 'facturae', 'xrechnung', 'en-16931'],
    lastReviewed: '2026-05-15',
  },
];

export function getRouteBySlug(slug: string): ProviderRoute | undefined {
  return providerRoutes.find((r) => r.slug === slug);
}

export function getRoutesByCountry(countrySlug: string): ProviderRoute[] {
  return providerRoutes.filter((r) => r.countriesApplicable.includes(countrySlug));
}
