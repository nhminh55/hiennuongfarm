/**
 * /sitemap.xml: published pages only, each in every language.
 *
 * Add a route here when a page is published. Change its lastmod only when
 * the page's content changes, never on every build. Leave out section
 * anchors, planned pages and external links.
 */

import type { APIRoute } from 'astro';
import { isTranslated, languages, locales, localizePath } from '../i18n';
import { activities, press } from '../data/dau-an';

const pages: { path: string; lastmod: string }[] = [
  { path: '/', lastmod: '2026-10-10' },
  { path: '/san-pham/', lastmod: '2026-10-10' },
  { path: '/san-pham/nam-moi-den/', lastmod: '2026-10-07' },
  { path: '/ve-chung-toi/', lastmod: '2026-10-09' },
  { path: '/nong-nghiep-tuan-hoan/', lastmod: '2026-10-10' },
  { path: '/hop-tac/', lastmod: '2026-10-08' },
  { path: '/choi-cung-nong-trai/', lastmod: '2026-10-10' },
  { path: '/choi-cung-nong-trai/mot-vong-nong-trai/', lastmod: '2026-10-09' },
  { path: '/choi-cung-nong-trai/hom-nay-an-nam-gi/', lastmod: '2026-10-09' },
  { path: '/choi-cung-nong-trai/ban-hieu-nam-toi-dau/', lastmod: '2026-10-09' },
  { path: '/dau-an/bao-chi/', lastmod: '2026-10-09' },
  { path: '/dau-an/bao-chi/tu-lieu/', lastmod: '2026-10-10' },
  { path: '/dau-an/giai-thuong/', lastmod: '2026-10-09' },
  { path: '/dau-an/su-kien/', lastmod: '2026-10-09' },
  { path: '/dau-an/chung-nhan/', lastmod: '2026-10-09' },
  ...press.map((p) => ({ path: `/dau-an/bao-chi/${p.slug}/`, lastmod: '2026-10-09' })),
  ...activities.map((a) => ({ path: `/dau-an/su-kien/${a.slug}/`, lastmod: '2026-10-09' })),
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
