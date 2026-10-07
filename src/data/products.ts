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

export const products: Product[] = [
  {
    slug: 'nam-moi-den',
    name: 'Nấm Mối Đen',
    note: 'Nấm mối đen mọc lên từ bịch giá thể, được nuôi trồng tại trang trại.',
    image: {
      src: '/images/farm/product-nam-moi-den.webp',
      width: 750,
      height: 600,
      alt: 'Những cây nấm mối đen mọc lên từ bịch giá thể, cây lớn nhất bên phải',
    },
    detail: '/san-pham/nam-moi-den/',
  },
  {
    slug: 'nam-linh-chi',
    name: 'Nấm Linh Chi',
    note: 'Tai nấm linh chi phát triển từ bịch phôi đặt trên lớp rơm.',
    image: {
      src: '/images/farm/product-linh-chi.webp',
      width: 576,
      height: 720,
      alt: 'Một tai nấm linh chi mọc từ bịch phôi đặt trên lớp rơm',
    },
  },
  {
    slug: 'dong-trung-ha-thao',
    name: 'Đông Trùng Hạ Thảo',
    note: 'Những sợi đông trùng hạ thảo được nuôi cấy và thu hái tại trang trại.',
    image: {
      src: '/images/farm/product-dong-trung-ha-thao.webp',
      width: 476,
      height: 595,
      alt: 'Cận cảnh những sợi đông trùng hạ thảo màu cam nhạt mọc dày',
    },
  },
  {
    slug: 'nam-bao-ngu',
    name: 'Nấm Bào Ngư',
    note: 'Chùm nấm bào ngư mọc từ bịch phôi xếp trên kệ trong nhà trồng.',
    image: {
      src: '/images/farm/product-nam-bao-ngu.webp',
      width: 576,
      height: 720,
      alt: 'Chùm nấm bào ngư trắng xám mọc từ bịch phôi trong nhà trồng',
    },
  },
];

/** Where a product links to: its own page, or its entry on /san-pham/. */
export const productHref = (p: Product) => p.detail ?? `/san-pham/#${p.slug}`;

type ProductText = Pick<Product, 'name' | 'note'> & { alt: string };

// English and Chinese text for the entries above, same wording rules.
// Chinese uses the names the mushrooms are sold under in China:
// nấm mối đen → 黑皮鸡枞菌, cultivated (orange) đông trùng hạ thảo → 蛹虫草.
const translations: Record<Exclude<Locale, 'vi'>, Record<string, ProductText>> = {
  en: {
    'nam-moi-den': {
      name: 'Black Termite Mushroom',
      note: 'Black termite mushrooms growing from substrate bags, cultivated on the farm.',
      alt: 'Black termite mushrooms growing from a substrate bag, the largest on the right',
    },
    'nam-linh-chi': {
      name: 'Lingzhi Mushroom',
      note: 'A lingzhi cap growing from a spawn bag set on a layer of straw.',
      alt: 'A lingzhi cap growing from a spawn bag set on a layer of straw',
    },
    'dong-trung-ha-thao': {
      name: 'Cordyceps',
      note: 'Cordyceps strands cultivated and harvested on the farm.',
      alt: 'Close-up of dense, pale orange cordyceps strands',
    },
    'nam-bao-ngu': {
      name: 'Oyster Mushroom',
      note: 'A cluster of oyster mushrooms growing from a spawn bag on a shelf in the grow house.',
      alt: 'A cluster of greyish-white oyster mushrooms growing from a spawn bag in a grow house',
    },
  },
  zh: {
    'nam-moi-den': {
      name: '黑皮鸡枞菌',
      note: '从基质袋中长出的黑皮鸡枞菌，在农场培育。',
      alt: '从基质袋中长出的黑皮鸡枞菌，最大的一株在右侧',
    },
    'nam-linh-chi': {
      name: '灵芝',
      note: '灵芝从铺在稻草上的菌袋中长出。',
      alt: '一朵灵芝从铺在稻草上的菌袋中长出',
    },
    'dong-trung-ha-thao': {
      name: '蛹虫草',
      note: '在农场培育和采收的蛹虫草。',
      alt: '密集生长的浅橙色蛹虫草特写',
    },
    'nam-bao-ngu': {
      name: '平菇',
      note: '一簇平菇从种植棚架子上的菌袋中长出。',
      alt: '一簇灰白色平菇从种植棚内的菌袋中长出',
    },
  },
};

/** The products in a language, with links to that language's pages. */
export const localizedProducts = (lang: Locale): Product[] =>
  products.map((p) => {
    const t = lang === 'vi' ? undefined : translations[lang][p.slug];
    return {
      ...p,
      ...(t && { name: t.name, note: t.note, image: { ...p.image, alt: t.alt } }),
      detail: p.detail && localizePath(p.detail, lang),
    };
  });

/** productHref for a product from localizedProducts(). */
export const localizedProductHref = (p: Product, lang: Locale) =>
  p.detail ?? localizePath(`/san-pham/#${p.slug}`, lang);
