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

const files = import.meta.glob<Record<string, unknown>>('../content/{trang-chu,chung,san-pham,ve-chung-toi}/*.md', {
  import: 'frontmatter',
  eager: true,
});

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
