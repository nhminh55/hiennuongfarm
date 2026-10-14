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
  return new Response(marked, response);
});
