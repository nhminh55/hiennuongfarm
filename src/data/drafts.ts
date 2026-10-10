/**
 * Placeholder pages (docs/SITEMAP.md §2 and §5), built by
 * src/pages/[...draft].astro, and the header dropdowns (§4).
 *
 * Dấu ấn has no landing page: Báo chí, Giải thưởng, Sự kiện and Chứng nhận
 * sản phẩm are published pages (src/pages/dau-an/, data in
 * src/data/dau-an.ts). No placeholder page is left.
 *
 * The placeholder pages are live at the owner's request (2026-10-09) so the
 * Dấu ấn dropdown has destinations. They hold no company facts, stay out of
 * search engines (noindex) and /sitemap.xml, and exist in Vietnamese only
 * (`viOnlyPaths` in src/i18n.ts).
 *
 * To finish a page: give it its own file in src/pages/, write approved copy,
 * add the en/zh routes, remove it from `draftPages` and `viOnlyPaths`, and
 * add it to src/pages/sitemap.xml.ts.
 */

import type { Locale } from '../i18n';
import { dataFile } from './copy';

/** Marks copy that is still being written. */
export const pendingCopy = 'Nội dung đang biên soạn';

export interface DraftLink {
  label: string;
  href: string;
}

export interface DraftImage {
  /** Placeholder brief, shown on the image slot. */
  brief: string;
  ratio: string;
  tone?: 'forest' | 'deep' | 'earth' | 'moss' | 'stone' | 'clay';
}

export interface DraftSection {
  id: string;
  title: string;
  /**
   * split: text beside one image · wide: full-width image over text ·
   * gallery: a row of images · records: empty evidence entries listing the
   * fields each entry needs · entries: links to child pages ·
   * facilities: the two farm sites over one map · contact: contact channels.
   */
  layout: 'split' | 'wide' | 'gallery' | 'records' | 'entries' | 'facilities' | 'contact';
  /** Short planning note under the placeholder (what this section will hold). */
  note?: string;
  images?: DraftImage[];
  /** For `records`: the fields each entry needs. */
  fields?: string[];
  /** For `records`: how many empty entries to show. */
  count?: number;
  /** For `entries`: child pages, each with an image. */
  entries?: (DraftLink & { image: DraftImage })[];
  links?: DraftLink[];
}

export interface DraftPage {
  path: string;
  title: string;
  eyebrow: string;
  /** Parent pages between Trang chủ and this page. */
  parents?: DraftLink[];
  sections: DraftSection[];
}

export const draftPages: DraftPage[] = [];

/**
 * Header dropdowns (docs/SITEMAP.md §4), keyed by the header link's homepage
 * anchor. Links to Vietnamese-only pages open the Vietnamese page. The
 * labels: src/content/chung/menu-tha-xuong.md (one entry per header link).
 */
type NavItem = { label: Record<Locale, string>; href: string; video?: boolean; /** Showroom group whose products open in a side flyout. */ group?: 0 | 1 };
export const navDropdowns: Record<string, NavItem[]> = Object.fromEntries(
  dataFile<{ menus: { href: string; items: NavItem[] }[] }>('chung/menu-tha-xuong').menus.map((m) => [m.href, m.items]),
);
