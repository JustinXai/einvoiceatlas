---
// Schema.org helpers for structured data
// NOTE: FAQPage schema is deprecated for Search as of May 7, 2026.
// Only generate FAQPage schema where the page genuinely contains user-visible Q&A content.
// Use Article schema as the primary structured data type.

export interface ArticleSchema {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  author?: string;
}

export function buildArticleSchema(article: ArticleSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    url: article.url,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    publisher: {
      '@type': 'Organization',
      name: 'EInvoiceAtlas',
      url: 'https://einvoiceatlas.com',
    },
    author: {
      '@type': 'Organization',
      name: 'EInvoiceAtlas',
    },
  };
}

/** DEPRECATED for Search as of May 7, 2026.
 *  Only generate this where the page genuinely contains user-visible Q&A content.
 *  Google has deprecated FAQ rich results for Search.
 *  Retained for reference/documentation purposes only.
 */
export function buildFAQSchema(_faqs: { question: string; answer: string }[]) {
  console.warn(
    '[Schema] buildFAQSchema is deprecated for SEO use as of May 7, 2026. ' +
    'FAQPage schema is no longer supported for Google Search rich results. ' +
    'Only use where Q&A content is genuinely present on the page.'
  );
  return null;
}

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'EInvoiceAtlas',
    url: 'https://einvoiceatlas.com',
    description: 'Global Electronic Invoice Regulatory Intelligence',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://einvoiceatlas.com/countries?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
}

/** Build a BreadcrumbList schema for breadcrumb navigation */
export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Build an Organization schema for site-wide identity */
export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'EInvoiceAtlas',
    url: 'https://einvoiceatlas.com',
    description:
      'Independent educational resource for global e-invoicing regulatory intelligence. Not a law firm, tax advisor, or government agency.',
    sameAs: [],
  };
}
