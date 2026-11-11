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

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  if (!response.headers.get('content-type')?.includes('text/html')) return response;
  const html = await response.text();
  const marked = boldBrand(html.replace(HEADING, (all, tag: string, attrs: string, inner: string) =>
    BREAK.test(inner) ? `<${tag}${attrs} data-title-lines>${inner}</${tag}>` : all));
  const foreign = /^\/(en|zh)(\/|$)/.test(context.url.pathname);
  return new Response(foreign ? unaccentPage(marked) : marked, response);
});

/**
 * The brand name reads in bold wherever it appears in page text, except in
 * the site header and menus. Attributes, <head> and scripts are left alone.
 */
const BRAND = /N(ư|u)(ơ|o)ng Farm/g;
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

/**
 * English and Chinese pages write Vietnamese names without diacritics
 * (Nuong Farm, Chau Thi Nuong, Bay Nui, Ta Danh), whatever the copy holds.
 * Covers page text, <title>, text attributes and JSON data blocks (the
 * showroom's). Anything under lang="vi" keeps its Vietnamese spelling: the
 * "Tiếng Việt" switch and Vietnamese-only entries shown as they are.
 */
const unaccent = (s: string) =>
  s.normalize('NFD').replace(/\p{M}/gu, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').normalize('NFC');
const MARKED = /[^ -~\s]/; // anything beyond plain ASCII
/** Every attribute that holds words, not addresses or markup. */
const TEXT_ATTR = /(\s(?!(?:href|src|srcset|poster|action|style|class|id|lang|hreflang|data-[\w-]*(?:src|href|url))=)[\w:-]+=")([^"]*)"/g;
const LANG_ATTR = /\slang="([^"]*)"/;
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
const RAW = new Set(['script', 'style', 'textarea']);

function unaccentPage(html: string): string {
  const tag = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][\w-]*)\b[^>]*>/g;
  const stack: { name: string; vi: boolean }[] = [];
  const isVi = () => stack.length > 0 && stack[stack.length - 1].vi;
  let out = '';
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = tag.exec(html))) {
    const text = html.slice(last, m.index);
    out += isVi() || !MARKED.test(text) ? text : unaccent(text);
    last = tag.lastIndex;
    const name = m[2]?.toLowerCase();
    if (!name) { out += m[0]; continue; }
    if (m[1]) {
      const at = stack.map((e) => e.name).lastIndexOf(name);
      if (at >= 0) stack.length = at;
      out += m[0];
      continue;
    }
    const own = m[0].match(LANG_ATTR)?.[1];
    const vi = own ? own === 'vi' : isVi();
    out += vi ? m[0] : m[0].replace(TEXT_ATTR, (all, pre: string, value: string) => (MARKED.test(value) ? `${pre}${unaccent(value)}"` : all));
    if (RAW.has(name)) {
      // Raw text up to the closing tag: only JSON data is rewritten.
      const end = html.indexOf(`</${name}`, last);
      const body = html.slice(last, end < 0 ? html.length : end);
      out += !vi && name === 'script' && /type="application\/(ld\+)?json"/.test(m[0]) ? unaccent(body) : body;
      last = tag.lastIndex = end < 0 ? html.length : end;
      continue;
    }
    if (!VOID.has(name) && !m[0].endsWith('/>')) stack.push({ name, vi });
  }
  return out + html.slice(last);
}
