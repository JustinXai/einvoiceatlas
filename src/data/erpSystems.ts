// ============================================================
// EInvoiceAtlas — ERP Systems Data
// ERP-specific notes reference ERP vendor documentation.
// ============================================================

import type { ERPSystem } from './types';

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

export const erpSystems: ERPSystem[] = [
  // ============================================================
  {
    slug: 'sap',
    urlSlug: 'sap-e-invoicing',
    name: 'SAP S/4HANA',
    vendor: 'SAP SE',
    category: 'enterprise',
    description:
      'SAP S/4HANA is SAP\'s next-generation ERP suite, replacing SAP ECC. It includes an output management framework for e-invoicing and supports major e-invoice formats through both native configuration and certified add-ons.',
    nativeEInvoiceSupport: true,
    nativeFormats: ['xrechnung', 'factur-x', 'peppol-bis-3'],
    certifiedAddons: ['SAP Document Compliance', 'SAP Invoice Management by OpenText', 'TJC Consulting SAP Connector'],
    configurationComplexity: 'high',
    applicableCountries: ['germany', 'france', 'italy', 'spain', 'belgium', 'netherlands'],
    dataMappingNotes:
      'SAP stores invoice data across multiple tables (LFA1, KNA1 for master data; RSEG, BSEG for line items). Mapping to EN 16931 BT fields requires understanding of SAP document types, company codes, and posting logic. SAP provides BRF+ (Business Rule Framework plus) for flexible output determination.',
    exportConsiderations:
      'SAP output management can generate XML directly or through middleware. For Peppol, a certified access point connector is needed. SAP recommends using middleware (SAP Integration Suite / SAP BTP) for complex multi-country e-invoicing requirements.',
    archiveConsiderations:
      'SAP provides long-term archiving through SAP Information Lifecycle Management (ILM) and integration with external archive solutions. For legal retention requirements (10 years in France/Italy), a dedicated archive strategy is essential.',
    implementationChecklist: [
      {
        order: 1,
        category: 'technical',
        title: 'Enable output management configuration',
        description: 'Configure the output management framework in SAP S/4HANA to generate XML-based invoices.',
        isCritical: true,
      },
      {
        order: 2,
        category: 'technical',
        title: 'Map ERP fields to EN 16931 BT codes',
        description: 'Use BRF+ or output type configuration to map SAP invoice fields to mandatory EN 16931 data elements.',
        isCritical: true,
      },
      {
        order: 3,
        category: 'technical',
        title: 'Install SAP Document Compliance (if needed)',
        description: 'For France, Italy, Spain — install and configure the country-specific compliance module.',
        isCritical: false,
      },
      {
        order: 4,
        category: 'operational',
        title: 'Set up Peppol access point integration',
        description: 'Connect to a certified Peppol access point for international e-invoice delivery.',
        isCritical: false,
      },
      {
        order: 5,
        category: 'legal',
        title: 'Configure archiving and retention',
        description: 'Set up SAP ILM and archive connection for required retention periods.',
        isCritical: true,
      },
      {
        order: 6,
        category: 'operational',
        title: 'Test with sandbox environments',
        description: 'Use Chorus Pro (France) and KoSIT validation (Germany) test environments before going live.',
        isCritical: true,
      },
    ],
    officialSources: [
      src(
        'SAP Help Portal — Output Management',
        'SAP SE',
        'https://help.sap.com/',
        'erp-docs',
        '2026-05-01',
        'SAP official documentation on e-invoice output management configuration',
      ),
      src(
        'SAP Document Compliance',
        'SAP SE',
        'https://www.sap.com/products/document-compliance.html',
        'erp-docs',
        '2026-05-01',
        'Country-specific e-invoice output and archiving capabilities for S/4HANA',
      ),
    ],
    // --- Navigational Relationships ---
    relatedCountries: ['germany', 'france', 'italy', 'spain', 'belgium', 'netherlands'],
    relatedStandards: ['xrechnung', 'en-16931', 'peppol-bis-3', 'factur-x'],
    relatedERPSlugs: ['oracle', 'netsuite', 'microsoft-dynamics'],
    // --- Meta ---
    lastReviewed: '2026-05-15',
    // --- Display ---
    aiSummary:
      'SAP S/4HANA provides e-invoicing capabilities through its output management framework and the SAP Document Compliance add-on. For Germany, XRechnung support is available through configuration of the MIRO/MIRO2 transactions and output type mapping. For France (Factur-X), Italy (FatturaPA), and Spain (Facturae), country-specific add-ons or configurations are required. The complexity is high — most implementations involve dedicated SAP functional consultants.',
  },

  // ============================================================
  {
    slug: 'odoo',
    urlSlug: 'odoo-e-invoicing',
    name: 'Odoo',
    vendor: 'Odoo S.A.',
    category: 'open-source',
    description:
      'Odoo is an open-source ERP with a modular architecture. E-invoicing capabilities are available through the Invoicing app and third-party modules. Odoo\'s Python-based architecture makes custom e-invoice format generation accessible.',
    nativeEInvoiceSupport: false,
    nativeFormats: [],
    certifiedAddons: ['Odoo Invoice PDF Builder', 'Belgian E-Invoicing Module', 'Peppol Access Point Connector'],
    configurationComplexity: 'medium',
    applicableCountries: ['france', 'belgium', 'germany', 'italy', 'spain', 'netherlands'],
    dataMappingNotes:
      'Odoo stores invoice data in a Python object model. Mapping to EN 16931 XML requires generating XML from Python using the lxml library or similar. The QWeb report engine generates the PDF component for hybrid formats.',
    exportConsiderations:
      'Odoo supports direct API integration for sending invoices. For Peppol, use a third-party access point module or integrate via Odoo\'s webhook/API capabilities.',
    archiveConsiderations:
      'Odoo stores all invoices in its database. For long-term legal retention, export to external storage (PDF/A, XML) and integrate with a document archive solution.',
    implementationChecklist: [
      {
        order: 1,
        category: 'technical',
        title: 'Install e-invoicing module',
        description: 'Install a certified module for your country\'s format (Factur-X, FatturaPA, XRechnung) from the Odoo Apps store or a certified partner.',
        isCritical: true,
      },
      {
        order: 2,
        category: 'technical',
        title: 'Configure format output',
        description: 'Map Odoo invoice fields to the required format\'s mandatory fields.',
        isCritical: true,
      },
      {
        order: 3,
        category: 'operational',
        title: 'Set up Peppol access point',
        description: 'Install and configure a Peppol connector module if sending internationally.',
        isCritical: false,
      },
      {
        order: 4,
        category: 'legal',
        title: 'Configure invoice archiving',
        description: 'Set up external archive for required retention periods (10 years for France/Italy).',
        isCritical: true,
      },
    ],
    officialSources: [
      src(
        'Odoo Official Documentation',
        'Odoo S.A.',
        'https://www.odoo.com/documentation/',
        'erp-docs',
        '2026-05-01',
        'Official Odoo documentation; e-invoicing configuration and API reference',
      ),
      src(
        'Odoo Apps — E-Invoicing',
        'Odoo S.A.',
        'https://apps.odoo.com/apps',
        'erp-docs',
        '2026-05-01',
        'Odoo Apps store; e-invoicing and Peppol connector modules',
      ),
    ],
    relatedCountries: ['france', 'belgium', 'germany', 'italy', 'spain', 'netherlands'],
    relatedStandards: ['factur-x', 'en-16931', 'peppol-bis-3', 'ubl-2.1'],
    relatedERPSlugs: ['sap', 'sage', 'netsuite'],
    lastReviewed: '2026-05-15',
    aiSummary:
      'Odoo\'s modular architecture makes it adaptable for e-invoicing, but it does not ship with full mandatory format support out of the box. For countries like France (Factur-X) and Italy (FatturaPA), businesses typically need a third-party module from the Odoo Apps store or custom development.',
  },

  // ============================================================
  {
    slug: 'netsuite',
    urlSlug: 'netsuite-e-invoicing',
    name: 'Oracle NetSuite',
    vendor: 'Oracle Corporation',
    category: 'enterprise',
    description:
      'Oracle NetSuite is a cloud-based ERP serving mid-to-large businesses. It provides e-invoicing capabilities through SuiteScript customization and integration with third-party e-invoicing platforms.',
    nativeEInvoiceSupport: false,
    nativeFormats: [],
    certifiedAddons: ['NetSuite E-Invoice Manager by Avalara', 'Tranquo SuiteScript Connectors', 'Celigo Integrator.io'],
    configurationComplexity: 'high',
    applicableCountries: ['germany', 'france', 'belgium', 'uk', 'netherlands'],
    dataMappingNotes:
      'NetSuite stores invoice data in a transactional record model. SuiteScript can access and transform this data into XML format. Key objects: nlapiCreateRecord(\'invoice\'), nlapiSubmitField(), SuiteScript RESTlets.',
    exportConsiderations:
      'NetSuite\'s RESTlet and SuiteTalk web services enable integration with e-invoicing platforms. For Peppol, use an access point provider with NetSuite integration.',
    archiveConsiderations:
      'NetSuite provides native file cabinet storage. For extended retention, integrate with an external document archive solution.',
    implementationChecklist: [
      {
        order: 1,
        category: 'technical',
        title: 'Design XML generation approach',
        description: 'Use SuiteScript RESTlet to generate e-invoice XML from NetSuite transaction data.',
        isCritical: true,
      },
      {
        order: 2,
        category: 'technical',
        title: 'Implement format-specific logic',
        description: 'Build format-specific XML generation for each country (XRechnung, Factur-X, FatturaPA).',
        isCritical: true,
      },
      {
        order: 3,
        category: 'operational',
        title: 'Integrate access point',
        description: 'Connect to Peppol network or country-specific portal via middleware.',
        isCritical: true,
      },
      {
        order: 4,
        category: 'legal',
        title: 'Set up invoice archiving',
        description: 'Configure external archive for required retention periods.',
        isCritical: true,
      },
    ],
    officialSources: [
      src(
        'Oracle NetSuite Documentation',
        'Oracle Corporation',
        'https://docs.oracle.com/en/suitesoftware/',
        'erp-docs',
        '2026-05-01',
        'NetSuite official documentation; SuiteScript API reference',
      ),
      src(
        'NetSuite SuiteScript API',
        'Oracle Corporation',
        'https://docs.oracle.com/en/suitecloud/',
        'erp-docs',
        '2026-05-01',
        'SuiteScript 2.x API reference for custom e-invoice generation',
      ),
    ],
    relatedCountries: ['germany', 'france', 'belgium', 'uk', 'netherlands'],
    relatedStandards: ['xrechnung', 'en-16931', 'factur-x', 'peppol-bis-3'],
    relatedERPSlugs: ['sap', 'oracle', 'microsoft-dynamics'],
    lastReviewed: '2026-05-10',
    aiSummary:
      'NetSuite\'s cloud-native architecture requires custom development or third-party add-ons for mandatory e-invoicing formats. The SuiteScript API allows programmatic generation of XML invoices, and SuiteTalk (web services) enables integration with external e-invoicing platforms. Most NetSuite e-invoicing implementations involve a middleware layer.',
  },

  // ============================================================
  {
    slug: 'sage',
    urlSlug: 'sage-e-invoicing',
    name: 'Sage Accounting',
    vendor: 'Sage Group',
    category: 'smb',
    description:
      'Sage Accounting is a cloud-based accounting solution for small and medium businesses. E-invoicing support varies by country-specific product version and requires add-ons or integration.',
    nativeEInvoiceSupport: false,
    nativeFormats: [],
    certifiedAddons: ['Sage E-Invoicing Add-on (UK)', 'Sage France — Chorus Pro Integration', 'Sage 50cloud — Peppol Module'],
    configurationComplexity: 'medium',
    applicableCountries: ['france', 'uk', 'germany', 'spain'],
    dataMappingNotes:
      'Sage stores invoice data in a proprietary database format. Country-specific versions expose different fields. E-invoice generation requires mapping to the relevant standard format.',
    exportConsiderations:
      'Sage supports PDF export but XML format generation requires add-ons or third-party integration.',
    archiveConsiderations:
      'Sage provides basic document storage. Extended retention requires external archive integration.',
    implementationChecklist: [
      {
        order: 1,
        category: 'technical',
        title: 'Identify country-specific Sage product',
        description: 'Determine which Sage product version you use and its e-invoicing capabilities.',
        isCritical: true,
      },
      {
        order: 2,
        category: 'technical',
        title: 'Install country-specific e-invoice module',
        description: 'For France, install Chorus Pro integration. For Germany, install Peppol/XRechnung module.',
        isCritical: true,
      },
      {
        order: 3,
        category: 'operational',
        title: 'Test format compliance',
        description: 'Validate generated invoices against country-specific validation tools.',
        isCritical: true,
      },
    ],
    officialSources: [
      src(
        'Sage Official Documentation',
        'Sage Group plc',
        'https://www.sage.com/',
        'erp-docs',
        '2026-05-01',
        'Sage official documentation; product-specific e-invoicing capabilities',
      ),
    ],
    relatedCountries: ['france', 'uk', 'germany', 'spain'],
    relatedStandards: ['factur-x', 'peppol-bis-3', 'xrechnung'],
    relatedERPSlugs: ['sap', 'odoo', 'xero'],
    lastReviewed: '2026-05-10',
    aiSummary:
      'Sage\'s e-invoicing support is fragmented across country-specific products. Sage France integrates with Chorus Pro for mandatory e-invoicing. Sage UK offers Peppol connectivity for government invoicing. For Germany and other markets, a third-party add-on or integration is typically needed.',
  },

  // ============================================================
  {
    slug: 'xero',
    urlSlug: 'xero-e-invoicing',
    name: 'Xero',
    vendor: 'Xero Limited',
    category: 'smb',
    description:
      'Xero is a cloud-based accounting platform popular among small businesses. It provides e-invoicing connectivity primarily through the Peppol network and third-party integrations.',
    nativeEInvoiceSupport: true,
    nativeFormats: ['peppol-bis-3'],
    certifiedAddons: ['Xero Peppol Network', 'AutoEntry (document capture)', 'WorkflowMax integration'],
    configurationComplexity: 'low',
    applicableCountries: ['uk', 'australia', 'new-zealand', 'netherlands'],
    dataMappingNotes:
      'Xero\'s invoice data model maps well to basic Peppol BIS 3.0. The Invoice ID, contact details, and line item structure can be exported to Peppol format.',
    exportConsiderations:
      'Xero\'s API supports third-party integrations for e-invoicing platforms. The native Peppol integration handles basic international e-invoicing.',
    archiveConsiderations:
      'Xero stores all invoices in the cloud with audit trail. Extended retention policies are available.',
    implementationChecklist: [
      {
        order: 1,
        category: 'operational',
        title: 'Enable Peppol in Xero settings',
        description: 'Navigate to Settings > Invoice Settings > E-invoicing to enable Peppol.',
        isCritical: false,
      },
      {
        order: 2,
        category: 'operational',
        title: 'Add Peppol ID for contacts',
        description: 'Enter Peppol participant IDs for your customers to enable Peppol delivery.',
        isCritical: true,
      },
      {
        order: 3,
        category: 'technical',
        title: 'Configure country-specific formats',
        description: 'For strict mandates, integrate with a third-party e-invoicing platform.',
        isCritical: true,
      },
    ],
    officialSources: [
      src(
        'Xero E-Invoicing Guide',
        'Xero Limited',
        'https://www.xero.com/',
        'erp-docs',
        '2026-05-01',
        'Xero official e-invoicing documentation and Peppol integration guide',
      ),
    ],
    relatedCountries: ['uk', 'netherlands'],
    relatedStandards: ['peppol-bis-3', 'en-16931'],
    relatedERPSlugs: ['sage', 'netsuite'],
    lastReviewed: '2026-05-08',
    aiSummary:
      'Xero\'s native Peppol integration makes it one of the easier SMB platforms for e-invoicing, particularly in countries with Peppol mandates. For strict mandatory formats (XRechnung for German B2G, FatturaPA for Italy), additional integration is needed.',
  },
];

export function getERPBySlug(slug: string): ERPSystem | undefined {
  return erpSystems.find((e) => e.slug === slug);
}

export function getERPByCountry(countrySlug: string): ERPSystem[] {
  return erpSystems.filter((e) => e.applicableCountries.includes(countrySlug));
}
