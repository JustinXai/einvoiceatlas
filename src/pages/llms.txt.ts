import type { APIRoute } from 'astro';
import { countries } from '../data/countries';
import { standards } from '../data/standards';
import { erpSystems } from '../data/erpSystems';
import { siteConfig } from '../data/site';

export const GET: APIRoute = () => {
  const siteUrl = siteConfig.url;
  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  // Only include pages that are actually implemented.
  // Detail pages are Phase 2 — they are NOT listed here until implemented.
  const pages = [
    {
      title: 'Home',
      path: '/',
      description: 'EInvoiceAtlas homepage. Global Electronic Invoice Regulatory Intelligence platform.',
    },
    {
      title: 'Browse Countries',
      path: '/countries',
      description: `Browse 7 countries with active, upcoming, or voluntary e-invoicing mandates.`,
    },
    {
      title: 'Browse Standards',
      path: '/standards',
      description: `Reference pages for 6 e-invoice formats and standards including EN 16931, Peppol BIS 3, XRechnung, and Factur-X.`,
    },
    {
      title: 'Browse ERP Systems',
      path: '/erp',
      description: `E-invoicing implementation guidance for 5 ERP and accounting systems including SAP, Odoo, NetSuite, and Sage.`,
    },
    {
      title: 'Provider Routes',
      path: '/routes',
      description: `Understand the four e-invoicing routes: Peppol Network, Direct API, Clearing House, and Hybrid.`,
    },
    {
      title: 'Playground',
      path: '/playground',
      description: 'UI module preview page for design system and content pattern reference.',
    },
  ];

  // Country dossier pages
  const countryPages = countries.map(c => ({
    title: `${c.name} E-Invoicing`,
    path: `/countries/${c.urlSlug ?? c.slug}`,
    description: `${c.name}: ${c.mandatePhase}. Effective: ${c.effectiveDate ? new Date(c.effectiveDate).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) : 'Mandate status under consultation'}. Formats: ${c.formats.join(', ')}.`,
  }));

  const standardPages = standards.map(s => ({
    title: `${s.shortName} Reference`,
    path: `/standards/${s.urlSlug ?? s.slug}`,
    description: `${s.name}. ${s.description.slice(0, 200)}... Used in: ${s.countriesUsing.join(', ')}.`,
  }));

  const erpPages = erpSystems.map(e => ({
    title: `${e.name} E-Invoicing`,
    path: `/erp/${e.urlSlug ?? e.slug}`,
    description: `${e.vendor} ${e.category} ERP. Native support: ${e.nativeEInvoiceSupport ? 'Yes' : 'Add-on required'}. Complexity: ${e.configurationComplexity}.`,
  }));

  // All implemented pages — static + detail pages
  const allPages = [...pages, ...countryPages, ...standardPages, ...erpPages];

  const llmsContent = `# EInvoiceAtlas — LLM Readable Site Index

Generated: ${today}
URL: ${siteUrl}

## About
EInvoiceAtlas is an independent educational resource providing regulatory intelligence on mandatory e-invoicing requirements globally. We aggregate and synthesize information from official and authoritative sources. We are not a law firm, tax advisor, or government agency. Nothing on this site constitutes legal, tax, or compliance advice.

## Site Structure

### Navigation
- Countries: Browse by country for mandate details, formats, and implementation checklists
- Standards: Reference pages for e-invoice format specifications
- ERP Systems: Implementation guidance for accounting and ERP systems
- Provider Routes: Understand Peppol, Direct API, Clearing House, and Hybrid approaches

### Content Pages

${allPages.map(p => `#### ${p.title}
Path: ${p.path}
${p.description}`).join('\n\n')}

## Countries Covered
${countries.map(c => `- ${c.name} (${c.isoCode}): ${c.mandatePhase}`).join('\n')}

## Standards Reference
${standards.map(s => `- ${s.shortName} (${s.name}): ${s.category} standard, ${s.isPeppolBased ? 'Peppol-based' : 'not Peppol-based'}`).join('\n')}

## Source Policy
All content is based on official sources including government tax authorities, standard bodies (CEN, OASIS, OpenPeppol), and ERP vendor documentation. Sources are cited on each page. Content is reviewed periodically and updated when regulations change.

## Disclaimer
EInvoiceAtlas is an independent educational resource. We aggregate information from official and authoritative sources but are not a law firm, tax advisor, or government agency. Nothing on this site constitutes legal, tax, or compliance advice. Always verify current obligations with relevant authorities.
`;

  return new Response(llmsContent, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
};
