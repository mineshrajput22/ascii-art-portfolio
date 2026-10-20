import type { APIRoute } from 'astro';
import { canonicalUrl, pageMetadata } from '../lib/seo';

export const GET: APIRoute = ({ site }) => {
  const urls = Object.values(pageMetadata).map(page => `  <url><loc>${canonicalUrl(site, page.path).href}</loc></url>`);
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
