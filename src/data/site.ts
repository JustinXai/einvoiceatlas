// ============================================================
// EInvoiceAtlas — Site Configuration
// ============================================================

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  publisher: {
    name: string;
    url: string;
  };
  navigation: NavItem[];
  social: SocialLinks;
  footer: FooterConfig;
}

export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export interface SocialLinks {
  linkedin?: string;
  twitter?: string;
}

export interface FooterConfig {
  columns: FooterColumn[];
  copyright: string;
  disclaimer: string;
}

export interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}

export const siteConfig: SiteConfig = {
  name: 'EInvoiceAtlas',
  tagline: 'Global Electronic Invoice Regulatory Intelligence',
  description:
    'Navigate mandatory e-invoicing requirements by country, standard, and ERP system. Independent educational resource for finance, tax, and compliance teams.',
  url: 'https://einvoiceatlas.com',
  publisher: {
    name: 'EInvoiceAtlas',
    url: 'https://einvoiceatlas.com',
  },
  navigation: [
    { label: 'Countries', href: '/countries', description: 'Browse mandates by country' },
    { label: 'Standards', href: '/standards', description: 'Format specifications and requirements' },
    { label: 'ERP Systems', href: '/erp', description: 'Accounting system impact' },
    { label: 'Provider Routes', href: '/routes', description: 'Choose your e-invoicing route' },
  ],
  social: {
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
  },
  footer: {
    columns: [
      {
        heading: 'Browse by Country',
        links: [
          { label: 'All Countries', href: '/countries' },
          { label: 'Upcoming Mandates', href: '/countries?status=upcoming' },
          { label: 'EU / Peppol Zone', href: '/countries?region=europe' },
        ],
      },
      {
        heading: 'Browse by Standard',
        links: [
          { label: 'All Standards', href: '/standards' },
          { label: 'Peppol BIS 3', href: '/standards/peppol-bis-3' },
          { label: 'EN 16931', href: '/standards/en-16931' },
          { label: 'XRechnung', href: '/standards/xrechnung' },
        ],
      },
      {
        heading: 'Browse by ERP',
        links: [
          { label: 'All ERP Systems', href: '/erp' },
          { label: 'SAP', href: '/erp/sap' },
          { label: 'Odoo', href: '/erp/odoo' },
          { label: 'NetSuite', href: '/erp/netsuite' },
        ],
      },
      {
        heading: 'Resources',
        links: [
          { label: 'Provider Routes', href: '/routes' },
          { label: 'Readiness Checklists', href: '/playground' },
          { label: 'Standard Comparison', href: '/playground' },
        ],
      },
    ],
    copyright: `© ${new Date().getFullYear()} EInvoiceAtlas. All rights reserved.`,
    disclaimer:
      'EInvoiceAtlas is an independent educational resource. We aggregate and synthesize information from official and authoritative sources, but we are not a law firm, tax advisor, or government agency. Nothing on this site constitutes legal, tax, or compliance advice.',
  },
};

// SEO defaults
export const defaultSEO = {
  titleTemplate: '%s | EInvoiceAtlas',
  defaultTitle: 'EInvoiceAtlas — Global E-Invoicing Regulatory Intelligence',
  defaultDescription:
    'Navigate mandatory e-invoicing requirements by country, standard, and ERP system. Independent educational resource for finance, tax, and compliance teams.',
  siteUrl: 'https://einvoiceatlas.com',
  siteName: 'EInvoiceAtlas',
  locale: 'en_US',
  type: 'website' as const,
};
