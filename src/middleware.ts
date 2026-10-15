/**
 * Headings whose copy holds line breaks the admin placed (edit mode,
 * src/scripts/edit-mode/) get `data-title-lines`; global.css shows those
 * breaks on wide screens. Runs as each page is built. Astro writes no line
 * breaks inside headings itself, so a break between two words can only
 * come from the copy.
 */
import { defineMiddleware } from 'astro:middleware';

const HEADING = /<(h[1-3])\b([^>]*)>([\s\S]*?)<\/\1>/g;
const BREAK = /[^\s>]\n[^\s<]/;

export const onRequest = defineMiddleware(async (_, next) => {
  const response = await next();
  if (!response.headers.get('content-type')?.includes('text/html')) return response;
  const html = await response.text();
  const marked = html.replace(HEADING, (all, tag: string, attrs: string, inner: string) =>
    BREAK.test(inner) ? `<${tag}${attrs} data-title-lines>${inner}</${tag}>` : all);
  return new Response(boldBrand(marked), response);
});

/**
 * The brand name reads in bold wherever it appears in page text, except in
 * the site header and menus. Attributes, <head> and scripts are left alone.
 */
const BRAND = /Nương Farm/g;
const TAG = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][\w-]*)\b[^>]*>/g;
const SKIP = new Set(['head', 'script', 'style', 'textarea', 'nav', 'header', 'strong', 'b', 'svg', 'option']);

function boldBrand(html: string): string {
  let out = '';
  let last = 0;
  let skip = 0;
  const open: string[] = [];
  for (const m of html.matchAll(TAG)) {
    const text = html.slice(last, m.index);
    out += skip ? text : text.replace(BRAND, '<strong>$&</strong>');
    out += m[0];
    last = m.index + m[0].length;
    const name = m[2]?.toLowerCase();
    if (!name || !SKIP.has(name) || m[0].endsWith('/>')) continue;
    if (m[1]) {
      const at = open.lastIndexOf(name);
      if (at >= 0) { open.splice(at, 1); skip--; }
    } else {
      open.push(name);
      skip++;
    }
  }
  return out + html.slice(last);
}
