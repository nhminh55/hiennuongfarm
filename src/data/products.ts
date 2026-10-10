/**
 * The four primary mushroom lines (CONTENT_EVIDENCE_BANK.md §3, VERIFIED).
 *
 * Notes describe only what the photographs show. No nutritional, medical or
 * product claims without a source. Photos are frames from the Hiền Nương
 * Farm video (01:24–01:31), shared with the homepage.
 *
 * `detail` is set only once a product's own page exists; until then the
 * product is reached by its anchor on /san-pham/.
 */

import { localizePath, type Locale } from '../i18n';
import { copy } from './copy';

export interface ProductImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface Product {
  slug: string;
  name: string;
  note: string;
  image: ProductImage;
  detail?: string;
}

// Everything but the text, which is in src/content/san-pham/ten-va-mo-ta.md.
type Entry = Pick<Product, 'slug' | 'detail'> & { image: Omit<ProductImage, 'alt'> };

const entries: Entry[] = [
  {
    slug: 'nam-moi-den',
    image: {
      src: '/images/farm/product-nam-moi-den.webp',
      width: 750,
      height: 600,
    },
    detail: '/san-pham/nam-moi-den/',
  },
  {
    slug: 'nam-linh-chi',
    image: {
      src: '/images/farm/product-linh-chi.webp',
      width: 576,
      height: 720,
    },
  },
  {
    slug: 'dong-trung-ha-thao',
    image: {
      src: '/images/farm/product-dong-trung-ha-thao.webp',
      width: 476,
      height: 595,
    },
  },
  {
    slug: 'nam-bao-ngu',
    image: {
      src: '/images/farm/product-nam-bao-ngu.webp',
      width: 576,
      height: 720,
    },
  },
];

/** Where a product links to: its own page, or its entry on /san-pham/. */
export const productHref = (p: Product) => p.detail ?? `/san-pham/#${p.slug}`;

type ProductText = Pick<Product, 'name' | 'note'> & { alt: string };

// Names, notes and alt text in every language: src/content/san-pham/ten-va-mo-ta.md.
// Chinese uses the names the mushrooms are sold under in China:
// nấm mối đen → 黑皮鸡枞菌, cultivated (orange) đông trùng hạ thảo → 蛹虫草.
const withText = (p: Entry, lang: Locale): Product => {
  const t = copy<Record<string, ProductText>>('san-pham/ten-va-mo-ta', lang)[p.slug];
  return { slug: p.slug, name: t.name, note: t.note, image: { ...p.image, alt: t.alt }, ...(p.detail && { detail: p.detail }) };
};

export const products: Product[] = entries.map((p) => withText(p, 'vi'));

/** The products in a language, with links to that language's pages. */
export const localizedProducts = (lang: Locale): Product[] =>
  entries.map((p) => {
    const product = withText(p, lang);
    return { ...product, detail: p.detail && localizePath(p.detail, lang) };
  });

/** productHref for a product from localizedProducts(). */
export const localizedProductHref = (p: Product, lang: Locale) =>
  p.detail ?? localizePath(`/san-pham/#${p.slug}`, lang);
