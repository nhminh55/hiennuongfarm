/**
 * Copy for /ve-chung-toi/ (src/pages/ve-chung-toi/index.astro).
 *
 * Copy: src/content/ve-chung-toi/cac-chuong.md (the six chapters in every
 * language, each rendered whole: label, title, paragraphs and an optional
 * disclosure with its intro paragraph and table) and trang.md (the rest).
 * The Vietnamese opening line and the closing come from
 * docs/HIEN_NUONG_ABOUT_VI.md.
 *
 * English and Chinese translate the earlier, shorter Vietnamese copy
 * without adding anything; place names, the founders' names and the
 * peaks' names stay in Vietnamese, as elsewhere on the site.
 * Facts are OWNER-VERIFIED: keep "more than" with 4 ha and 40 workers,
 * keep the 100% to the electricity used for growing mushrooms, and the
 * solar system as owned by chị Nương (not built by the founders). The
 * owner asked for no source links on the page.
 */

import { locales, type Locale } from '../i18n';
import { copy } from './copy';

export interface Photo {
  src: string;
  width: number;
  height: number;
  /** Smaller file for narrow screens (same crop). */
  small?: { src: string; width: number };
  /** object-position of the crop. */
  position?: string;
}

const about = (name: string, width: number, height: number, position?: string): Photo => ({
  src: `/images/about/${name}.webp`, width, height, position,
  small: { src: `/images/about/${name}-800.webp`, width: 800 },
});

/**
 * Photographs: authentic farm and press images only. Locations are named
 * only where the source says so: Thới Sơn from Dân Việt's report on the
 * visit to Nương Farm, xã Thới Sơn (05.03.2026); Tà Đảnh from the Báo Tin
 * tức caption. No worker is named in a caption.
 */
export const photos = {
  founders: about('hai-nguoi-sang-lap', 1280, 720, '62% 50%'),
  // Frame from the farm's own video (original export, unretouched).
  bayNui: about('bay-nui-nui-dong-thot-not', 1280, 712, '50% 40%'),
  hero: { src: '/images/farm/bay-nui-canh-dong.webp', width: 1672, height: 941, position: '50% 60%' } as Photo,
  thoiSon: {
    src: '/images/dau-an/dv-tham-toan-canh-1800.webp', width: 1800, height: 958, position: '30% 60%',
    small: { src: '/images/dau-an/dv-tham-toan-canh-640.webp', width: 640 },
  } as Photo,
  taDanh: about('trang-trai-giua-dong-lua', 1429, 901, '40% 50%'),
  solar: about('mai-dien-mat-troi', 1430, 804, '50% 50%'),
  substrate: about('nguyen-lieu-gia-the', 1280, 820, '55% 50%'),
  bags: {
    src: '/images/farm/process-dong-bich.webp', width: 1448, height: 1086, position: '50% 50%',
    small: { src: '/images/farm/process-dong-bich-800.webp', width: 800 },
  } as Photo,
  team: about('chuan-bi-gia-the', 1600, 1090, '50% 55%'),
  harvest: {
    src: '/images/dau-an/nd-khmer-thu-hoach-1280.webp', width: 1280, height: 619, position: '50% 50%',
    small: { src: '/images/dau-an/nd-khmer-thu-hoach-640.webp', width: 640 },
  } as Photo,
};
export type PhotoKey = keyof typeof photos;

/** Chapter anchors, in chapter order (the same in every language). */
export const chapterIds = ['cau-chuyen', 'bay-nui', 'co-so', 'nang-luong', 'tuan-hoan', 'con-nguoi'] as const;

/** One chapter as the page renders it. */
export interface StoryChapter {
  id: (typeof chapterIds)[number];
  num: string;
  /** Kicker beside the number ("Câu chuyện Hiền Nương"). */
  label: string;
  title: string;
  paragraphs: string[];
  /** "Bảy Núi gồm những ngọn nào?": opens in place under the chapter text. */
  more?: { summary: string; intro: string; head?: [string, string]; rows: [string, string][] };
}

interface MediaCopy {
  alt: string;
  caption?: string;
}

export interface AboutCopy {
  pageTitle: string;
  description: string;
  home: string;
  eyebrow: string;
  title: string;
  lead: string;
  heroAlt: string;
  navLabel: string;
  /** Short chapter names for the chapter bar. */
  nav: string[];
  /** The inline quotation in chapter 01 (must appear in its prose). */
  quote?: string;
  circularLink: string;
  media: Record<Exclude<PhotoKey, 'hero'>, MediaCopy>;
  /** Intro film block (#video-gioi-thieu); the title is the homepage brand film line. */
  film: { eyebrow: string; title: string; watch: string };
  closing: { eyebrow: string; title: string; body: string[]; button: string };
}

/** The six chapters in a language: src/content/ve-chung-toi/cac-chuong.md. */
type ChapterCopy = Omit<StoryChapter, 'id' | 'num' | 'more'> & {
  more?: Omit<NonNullable<StoryChapter['more']>, 'rows'> & { rows: { name: string; sino: string }[] };
};
export const storyChapters = (lang: Locale): StoryChapter[] =>
  copy<{ chapters: ChapterCopy[] }>('ve-chung-toi/cac-chuong', lang).chapters
    .map(({ more, ...chapter }, i) => ({
      id: chapterIds[i],
      num: String(i + 1).padStart(2, '0'),
      ...chapter,
      ...(more && { more: { ...more, rows: more.rows.map((r): [string, string] => [r.name, r.sino]) } }),
    }));

/* Copy ---------------------------------------------------------------------- */

// Page copy: src/content/ve-chung-toi/trang.md.
export const aboutCopy = Object.fromEntries(locales.map((lang) => [lang, { ...copy<AboutCopy>('ve-chung-toi/trang', lang) }])) as Record<Locale, AboutCopy>;
