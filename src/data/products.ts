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
