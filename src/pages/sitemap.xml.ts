/**
 * /sitemap.xml: published pages only, each in every language.
 *
 * Add a route here when a page is published. Change its lastmod only when
 * the page's content changes, never on every build. Leave out section
 * anchors, planned pages and external links.
 */

import type { APIRoute } from 'astro';
import { isTranslated, languages, locales, localizePath } from '../i18n';

const pages: { path: string; lastmod: string }[] = [
  { path: '/', lastmod: '2026-10-09' },
  { path: '/san-pham/', lastmod: '2026-10-09' },
  { path: '/san-pham/nam-moi-den/', lastmod: '2026-10-07' },
  { path: '/ve-chung-toi/', lastmod: '2026-10-08' },
  { path: '/nong-nghiep-tuan-hoan/', lastmod: '2026-10-08' },
  { path: '/hop-tac/', lastmod: '2026-10-08' },
];

export const GET: APIRoute = ({ site }) => {
  const url = (path: string) => new URL(path, site).href;

  const entries = pages.flatMap(({ path, lastmod }) => {
    // Vietnamese-only pages (viOnlyPaths): one entry, no alternates.
    if (!isTranslated(path)) {
      return [`  <url>
    <loc>${url(path)}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`];
    }

    // Same alternates as BaseLayout: every language, x-default → Vietnamese.
    const alternates = [
      ...locales.map((l) => `    <xhtml:link rel="alternate" hreflang="${languages[l].htmlLang}" href="${url(localizePath(path, l))}"/>`),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${url(path)}"/>`,
    ].join('\n');

    return locales.map((l) => `  <url>
    <loc>${url(localizePath(path, l))}</loc>
    <lastmod>${lastmod}</lastmod>
${alternates}
  </url>`);
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
