---
// SEO utilities
export interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
  lastReviewed?: string;
}

export function buildTitle(title: string, siteName = 'EInvoiceAtlas'): string {
  return `${title} | ${siteName}`;
}

export function buildCanonical(path: string, siteUrl = 'https://einvoiceatlas.com'): string {
  return `${siteUrl}${path}`;
}
