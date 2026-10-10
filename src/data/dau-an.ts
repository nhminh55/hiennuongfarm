/**
 * Dấu ấn: press coverage, recognitions and activities.
 *
 * Four pages, no landing page: /dau-an/bao-chi/, /dau-an/giai-thuong/,
 * /dau-an/su-kien/ (the homepage section #dau-an lists these three) and
 * /dau-an/chung-nhan/.
 *
 * Every entry records where it comes from. Headlines are the outlets'
 * own, as published. Dates are the dates the sources show (publication
 * dates for press; event dates only where a source states them).
 * Quotations are short and verbatim, checked against the article. Figures
 * that differ between articles (revenue, area, workforce) are not
 * repeated here.
 *
 * Photographs come from the press photo library collected on 07.10.2026
 * (design-reference/HIEN_NUONG_PHOTO_COLLECTION, IMAGE_SOURCES.csv); the
 * owner cleared press photographs for use on the site. `origin` names the
 * archive file each image was converted from. Outlet watermarks are
 * cropped off where they sat in a corner. Nothing is retouched or
 * generated.
 *
 * Sources checked 09.10.2026.
 *
 * The entries themselves are kept in Markdown files under
 * src/content/dau-an/ (edited in the admin at /admin); each entry's
 * `source` field holds its provenance notes. This module reads them back
 * and builds the image paths.
 */

import { dataFile } from './copy';

export interface DauAnPage {
  href: string;
  title: string;
}

/**
 * Wording of the Dấu ấn pages themselves: headings, labels, buttons. A
 * field a page asks for that the file lacks stops the build.
 */
export const dauAnText = new Proxy(dataFile<Record<string, string>>('dau-an/trang'), {
  get(target, key) {
    if (typeof key === 'string' && key !== 'then' && key !== 'toJSON' && !(key in target)) {
      throw new Error(`src/content/dau-an/trang.md: thiếu trường "${key}"`);
    }
    return Reflect.get(target, key);
  },
});

export const dauAnPages: DauAnPage[] = dataFile<{ pages: DauAnPage[] }>('dau-an/cac-trang').pages;

export interface Pic {
  src: string;
  srcset: string;
  /** The largest file, for the photo viewer. */
  full: string;
  width: number;
  height: number;
  alt: string;
  /** Caption shown with the photograph (the source's own where it has one). */
  caption?: string;
  /** Who took or published the photograph. */
  credit: string;
  /** Archive file the image was made from. */
  origin: string;
  /** object-position for cropped slots. */
  position?: string;
  /** A certificate or trophy: shown whole, never cropped. */
  document?: boolean;
}

const dir = '/images/dau-an/';

/**
 * A photograph as the content files keep it: `file` names the converted
 * image, `sizes` lists its widths with their heights, smallest first
 * ("640x427 1280x854"). A photograph from elsewhere on the site is given
 * whole, with its own src, srcset, full, width and height.
 */
type RawPic = (Omit<Pic, 'src' | 'srcset' | 'full' | 'width' | 'height'> & { file: string; sizes: string }) | Pic;

/** A converted image: its paths and size from its widths and heights. */
const pic = (raw: RawPic): Pic => {
  if (!('file' in raw)) return raw;
  const { file: name, sizes: list, ...p } = raw;
  const sizes = list.split(' ').map((x) => x.split('x').map(Number) as [number, number]);
  const [w, h] = sizes[sizes.length - 1];
  const mid = sizes.find(([sw]) => sw >= 1000) ?? sizes[sizes.length - 1];
  return {
    src: `${dir}${name}-${mid[0]}.webp`,
    srcset: sizes.map(([sw]) => `${dir}${name}-${sw}.webp ${sw}w`).join(', '),
    full: `${dir}${name}-${w}.webp`,
    width: w,
    height: h,
    ...p,
  };
};

/** 18.05.2025 from 2025-05-18; Tháng 8/2026 from 2026-08; a year alone stays a year. */
export const formatDate = (iso: string) => {
  const [y, m, d] = iso.split('-');
  return d ? `${d}.${m}.${y}` : m ? `Tháng ${Number(m)}/${y}` : y;
};

// ---------------------------------------------------------------------------
// Báo chí & Truyền thông
// ---------------------------------------------------------------------------

/**
 * One list for both press pages. The archive (/dau-an/bao-chi/tu-lieu/)
 * shows every entry; featured entries are also on the press page, in the
 * order given here, each with a page of its own.
 */
export interface PressItem {
  /** Stable ID; for a featured entry, also the path of its page. */
  slug: string;
  outlet: string;
  headline: string;
  /** Publication date (ISO), as the source shows it. For a video, the upload date. Left out when no source shows one. */
  date?: string;
  url: string;
  kind: 'article' | 'video' | 'audio';
  /** On the press page, with its own page. */
  featured?: boolean;
  /** A brief mention or quotation within a wider story: "Nhắc đến" in the archive. */
  mention?: boolean;
  /** The same piece at other addresses (reposts, a moved URL). Kept for reference, not listed. */
  alternates?: { outlet: string; url: string }[];
  byline?: string;
  /** One or two sentences on what the piece covers, from its own text. */
  intro?: string;
  /** The article's opening paragraph (sapo), verbatim. */
  lede?: string;
  photo?: Pic;
  /** More photographs from the same article. */
  gallery?: Pic[];
  /** YouTube id: the video is embedded on its page (embedding allowed). */
  youtube?: string;
  /** Short verbatim quotation of chị Nương in this article. */
  quote?: string;
  /** Key points the article reports, in its own terms and dated by it. */
  points?: string[];
  /** Provenance notes, not shown. */
  source?: string;
}

type RawPressItem = Omit<PressItem, 'photo' | 'gallery'> & { photo?: RawPic; gallery?: RawPic[] };

// The archive-only entries start at nong-dan-an-giang-ung-dung-cong-nghe-cao-vao-san-xuat.
// Each checked against the live page 09.10.2026 (headline, date, and that
// it names Hiền Nương Farm or chị Châu Thị Nương). Brief mentions and
// policy quotations are kept, marked `mention`. A piece that names only
// HTX Tà Đảnh is kept when it is about chị Nương's HTX as verified
// elsewhere (the Sáng kiến ESG Việt Nam 2023 final: Báo Nhân Dân,
// 30.06.2024). Reposts are kept as `alternates` of the original. Left
// out: undated NGO stories, self-published videos, aggregator copies
// whose original is not found, and translations.
export const pressArchive: PressItem[] = dataFile<{ press: RawPressItem[] }>('dau-an/bao-chi').press.map(
  ({ photo, gallery, ...p }) => ({
    ...p,
    ...(photo && { photo: pic(photo) }),
    ...(gallery && { gallery: gallery.map(pic) }),
  }),
);

/** A press-page entry: dated, introduced, with a page of its own. */
export type FeaturedPress = PressItem & { featured: true; date: string; intro: string };

/** The press page, in its order: the lead first. */
export const press = pressArchive.filter((p): p is FeaturedPress => p.featured === true);

export const pressBySlug = (slug: string) => press.find((p) => p.slug === slug);

// ---------------------------------------------------------------------------
// Giải thưởng & Ghi nhận
// ---------------------------------------------------------------------------

export interface Source {
  label: string;
  href: string;
}

export interface Award {
  id: string;
  year: string;
  /** Exact name of the distinction, as on the certificate or trophy. */
  name: string;
  /** Awarding organisation or programme. */
  by: string;
  /** Who received it, as named. */
  recipient: string;
  significance: string;
  photo: Pic;
  /** Certificates, trophies and other evidence. */
  evidence: Pic[];
  sources: Source[];
  /** Provenance notes, not shown. */
  source?: string;
}

type RawAward = Omit<Award, 'photo' | 'evidence'> & { photo: RawPic; evidence: RawPic[] };

export const awards: Award[] = dataFile<{ awards: RawAward[] }>('dau-an/giai-thuong').awards.map(
  (a) => ({ ...a, photo: pic(a.photo), evidence: a.evidence.map(pic) }),
);

// ---------------------------------------------------------------------------
// Sự kiện & Hoạt động
// ---------------------------------------------------------------------------

export interface Activity {
  slug: string;
  /** ISO date; year-month or a year alone where only that is documented. */
  date: string;
  title: string;
  place?: string;
  /** One short sentence for the list. */
  summary: string;
  /** A few sentences for the album page, from the sources. */
  story: string[];
  photos: Pic[];
  sources: Source[];
  /** A recognition on the awards page this activity belongs to. */
  award?: string;
  /** Provenance notes, not shown. */
  source?: string;
}

type RawActivity = Omit<Activity, 'photos'> & { photos: RawPic[] };

export const activities: Activity[] = dataFile<{ activities: RawActivity[] }>('dau-an/su-kien').activities.map(
  (a) => ({ ...a, photos: a.photos.map(pic) }),
);

export const activityBySlug = (slug: string) => activities.find((a) => a.slug === slug);

// ---------------------------------------------------------------------------
// Chứng nhận sản phẩm
// ---------------------------------------------------------------------------

/**
 * OCOP products as Báo An Giang names them (26.10.2025, a465150). The
 * article gives no star rating, certificate year or issuing body: add them
 * only from the certificates themselves. Images are the products' studio
 * photographs from the showroom (src/data/showroom.ts).
 */
export interface OcopProduct {
  /** Showroom slug: /san-pham/#slug and /images/products/studio/<slug>-*.webp. */
  slug: string;
  /** Name as the article gives it. */
  name: string;
  alt: string;
}

const ocop = dataFile<{ products: OcopProduct[]; citation: Source }>('dau-an/chung-nhan');

export const ocopProducts: OcopProduct[] = ocop.products;

export const ocopSource: Source = ocop.citation;
