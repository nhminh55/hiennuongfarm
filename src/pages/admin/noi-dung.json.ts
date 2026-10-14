/**
 * /admin/noi-dung.json: every text in the copy files (src/content/**\/*.md)
 * with where it lives, for the edit mode (src/scripts/edit-mode/). The
 * editor matches the text it sees on a page to these entries and saves a
 * change back to the same file and path. Loaded only while an admin edits.
 *
 * Left out: the Chuyện nhà Nấm articles (Markdown bodies) and the farm
 * games, whose text the browser rewrites as they are played.
 */
import type { APIRoute } from 'astro';

const raw = import.meta.glob<Record<string, unknown>>('../../content/**/*.md', { import: 'frontmatter', eager: true });
const SKIP = /^(chuyen-nha-nam|choi-cung-nong-trai)\//;
const LANGS = ['vi', 'en', 'zh'];
const isLangMap = (v: object) => Object.keys(v).length > 0 && Object.keys(v).every((k) => LANGS.includes(k));

type Entry = [lang: string, text: string, file: number, path: (string | number)[]];

export const GET: APIRoute = () => {
  const files: string[] = [];
  const entries: Entry[] = [];
  for (const [key, data] of Object.entries(raw)) {
    const name = key.replace(/^\.\.\/\.\.\/content\//, '').replace(/\.md$/, '');
    if (SKIP.test(name)) continue;
    const file = files.push(name) - 1;
    const walk = (v: unknown, path: (string | number)[], lang: string) => {
      if (typeof v === 'string') entries.push([lang, v, file, path]);
      else if (Array.isArray(v)) v.forEach((x, i) => walk(x, [...path, i], lang));
      else if (v && typeof v === 'object' && !(v instanceof Date)) {
        const byLang = isLangMap(v);
        for (const [k, x] of Object.entries(v)) walk(x, [...path, k], byLang ? k : lang);
      }
    };
    walk(data, [], 'vi');
  }
  return new Response(JSON.stringify({ files, entries }), { headers: { 'Content-Type': 'application/json' } });
};
