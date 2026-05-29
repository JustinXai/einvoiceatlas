import type { APIRoute } from 'astro';
import { siteConfig } from '../data/site';

export const GET: APIRoute = () => {
  return new Response(
    `User-agent: *
Allow: /

Sitemap: ${siteConfig.url}/sitemap.xml

# EInvoiceAtlas
# We allow all crawlers to index content for educational purposes.
`,
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    }
  );
};
