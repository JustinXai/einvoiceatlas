import type { APIRoute } from 'astro';
import { countries } from '../data/countries';
import { standards } from '../data/standards';
import { erpSystems } from '../data/erpSystems';
import { providerRoutes } from '../data/providers';
import { siteConfig } from '../data/site';

export const GET: APIRoute = () => {
  const siteUrl = siteConfig.url;

  const staticPages = [
    { url: siteUrl, lastmod: new Date().toISOString().split('T')[0], priority: '1.0', changefreq: 'weekly' },
    { url: `${siteUrl}/playground`, lastmod: new Date().toISOString().split('T')[0], priority: '0.3', changefreq: 'monthly' },
    { url: `${siteUrl}/countries`, lastmod: new Date().toISOString().split('T')[0], priority: '0.9', changefreq: 'weekly' },
    { url: `${siteUrl}/standards`, lastmod: new Date().toISOString().split('T')[0], priority: '0.9', changefreq: 'weekly' },
    { url: `${siteUrl}/erp`, lastmod: new Date().toISOString().split('T')[0], priority: '0.9', changefreq: 'weekly' },
    { url: `${siteUrl}/routes`, lastmod: new Date().toISOString().split('T')[0], priority: '0.8', changefreq: 'monthly' },
  ];

  const countryPages = countries.map(c => ({
    url: `${siteUrl}/countries/${c.urlSlug ?? c.slug}`,
    lastmod: c.lastReviewed,
    priority: '0.8',
    changefreq: 'monthly',
  }));

  const standardPages = standards.map(s => ({
    url: `${siteUrl}/standards/${s.urlSlug ?? s.slug}`,
    lastmod: s.lastReviewed,
    priority: '0.8',
    changefreq: 'monthly',
  }));

  const erpPages = erpSystems.map(e => ({
    url: `${siteUrl}/erp/${e.urlSlug ?? e.slug}`,
    lastmod: e.lastReviewed,
    priority: '0.8',
    changefreq: 'monthly',
  }));

  const routePages = providerRoutes.map(r => ({
    url: `${siteUrl}/routes/${r.slug}`,
    lastmod: new Date().toISOString().split('T')[0],
    priority: '0.7',
    changefreq: 'monthly',
  }));

  const allPages = [...staticPages, ...countryPages, ...standardPages, ...erpPages, ...routePages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${page.url}/</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
