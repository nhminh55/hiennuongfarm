/**
 * Page copy kept in Markdown files under src/content/, edited by the owner
 * in the admin at /admin (public/admin/config.yml; docs/HUONG_DAN_SUA_NOI_DUNG.md).
 * Each file's frontmatter has one block per language;
 * copy('trang-chu/02-ve-hien-nuong', lang) returns that language's block,
 * with its `nang_cao` group (alt text, screen-reader labels, search
 * descriptions: collapsed in the admin) merged back in. Any mismatch between
 * the languages, or a field a component asks for that the file lacks, stops
 * the build with the file name, so a slip in an edit never reaches the site.
 */

import { locales, type Locale } from '../i18n';

const raw = import.meta.glob<Record<string, unknown>>('../content/**/*.md', {
  import: 'frontmatter',
  eager: true,
});

// YAML reads an unquoted 2025-05-18 as a date (which reaches this module as
// "2025-05-18T00:00:00.000Z"); the admin writes dates that way. Turn them back
// into the "2025-05-18" strings the pages expect.
const plain = (v: unknown): unknown =>
  v instanceof Date ? v.toISOString().slice(0, 10)
  : typeof v === 'string' && /^\d{4}-\d{2}-\d{2}T00:00:00\.000Z$/.test(v) ? v.slice(0, 10)
  : Array.isArray(v) ? v.map(plain)
  : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, plain(x)]))
  : v;
const files = Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, plain(v) as Record<string, unknown>]));

const shape = (v: unknown): string =>
  Array.isArray(v) ? `[${v.length ? shape(v[0]) : ''}]`
  : v && typeof v === 'object' ? `{${Object.keys(v).sort().map((k) => `${k}:${shape((v as Record<string, unknown>)[k])}`).join(',')}}`
  : typeof v;

const checked = new Set<string>();

export function copy<T = any>(name: string, lang: Locale): T {
  const file = `src/content/${name}.md`;
  const data = files[`../content/${name}.md`];
  if (!data) throw new Error(`${file}: không tìm thấy file`);
  if (!checked.has(name)) {
    for (const l of locales) {
      if (!data[l]) throw new Error(`${file}: thiếu phần "${l}:"`);
      if (shape(data[l]) !== shape(data.vi)) throw new Error(`${file}: phần "${l}:" không cùng các trường với phần "vi:" (thiếu, thừa hoặc sai tên trường)`);
    }
    checked.add(name);
  }
  const { nang_cao, ...block } = data[lang] as Record<string, unknown>;
  return new Proxy({ ...block, ...(nang_cao as object) }, {
    get(target, key) {
      if (typeof key === 'string' && key !== 'then' && key !== 'toJSON' && !(key in target)) {
        throw new Error(`${file}: thiếu trường "${key}" trong phần "${lang}:"`);
      }
      return Reflect.get(target, key);
    },
  }) as T;
}

/** Fills {placeholders} in a copy string: fill('Chi tiết {name}', { name }). */
export const fill = (text: string, values: Record<string, string>) =>
  text.replace(/\{(\w+)\}/g, (m, k: string) => values[k] ?? m);

/** A content file kept whole (not split by language), e.g. the showroom products. */
export function dataFile<T = any>(name: string): T {
  const data = files[`../content/${name}.md`];
  if (!data) throw new Error(`src/content/${name}.md: không tìm thấy file`);
  return data as T;
}
