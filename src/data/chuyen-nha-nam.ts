/**
 * Chuyện nhà Nấm (/chuyen-nha-nam/): short articles in three categories.
 *
 * Articles: src/content/chuyen-nha-nam/*.md (schema in src/content.config.ts).
 * Vietnamese only (viOnlyPrefixes in src/i18n.ts).
 *
 * Addresses:
 *   /chuyen-nha-nam/                     every article, newest first; the
 *                                        featured one opens page 1
 *   /chuyen-nha-nam/trang/2/             later pages
 *   /chuyen-nha-nam/<category>/          one category (+ /trang/2/ …)
 *   /chuyen-nha-nam/<article>/           one article
 *
 * Drafts (`draft: true`) are left out of the built site, the sitemap and
 * search. On the dev server they show, marked "Bản nháp", for review.
 */
import { getCollection, type CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'chuyen-nha-nam'>;
export type CategoryId = Article['data']['category'];

export const base = '/chuyen-nha-nam/';
export const perPage = 9;

export const categories: { id: CategoryId; title: string; line: string }[] = [
  { id: 'hieu-ve-nam', title: 'Hiểu về Nấm', line: 'Những dòng nấm của trang trại: hình dáng, hương vị và cách nhận biết.' },
  { id: 'bep-nha-nam', title: 'Bếp nhà Nấm', line: 'Gợi ý chế biến, công thức gọn nhẹ và cách bảo quản nấm.' },
  { id: 'tu-dat-den-nam', title: 'Từ Đất đến Nấm', line: 'Từ phụ phẩm đồng ruộng đến nhà trồng, rồi trở về đất.' },
];

export const categoryOf = (id: CategoryId) => categories.find((c) => c.id === id)!;

export const text = {
  title: 'Chuyện nhà Nấm',
  eyebrow: 'Ghi chép từ trang trại',
  intro: 'Chuyện về nấm, về bếp và về vòng tuần hoàn ở Hiền Nương, kể từ vùng Bảy Núi.',
  description: 'Chuyện nhà Nấm: ghi chép của Hiền Nương Farm về các dòng nấm, gợi ý vào bếp và vòng tuần hoàn từ đất đến nấm tại vùng Bảy Núi, An Giang.',
  home: 'Trang chủ',
  all: 'Tất cả',
  filterLabel: 'Chọn chuyên mục',
  featured: 'Bài nổi bật',
  read: 'Đọc bài',
  more: 'Các bài khác',
  page: 'Trang',
  prevPage: 'Trang trước',
  nextPage: 'Trang sau',
  empty: 'Chuyên mục này đang được biên soạn.',
  draft: 'Bản nháp',
  photo: 'Ảnh:',
  updated: 'Cập nhật',
  related: 'Cùng chuyên mục',
  back: 'Tất cả bài viết',
  newer: 'Bài mới hơn',
  older: 'Bài trước đó',
};

const showDrafts = import.meta.env.DEV;

/** Published articles (and drafts on the dev server), newest first. */
export async function getArticles(category?: CategoryId): Promise<Article[]> {
  const all = await getCollection('chuyen-nha-nam', ({ data }) => showDrafts || !data.draft);
  for (const a of all) {
    if (categories.some((c) => c.id === a.id) || a.id === 'trang') {
      throw new Error(`src/content/chuyen-nha-nam/${a.id}.md: tên file trùng với địa chỉ chuyên mục, hãy đổi tên file`);
    }
  }
  return all
    .filter((a) => !category || a.data.category === category)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime() || a.id.localeCompare(b.id));
}

/** Page 1 of the full listing opens on the newest featured article. */
export const featuredOf = (articles: Article[]) => articles.find((a) => a.data.featured) ?? articles[0];

export const articleHref = (a: Article) => `${base}${a.id}/`;

export const listHref = (category?: CategoryId, page = 1) =>
  `${base}${category ? `${category}/` : ''}${page > 1 ? `trang/${page}/` : ''}`;

export interface ListPage {
  data: Article[];
  currentPage: number;
  lastPage: number;
}

/** One listing page; the same fields as Astro's paginate() pages. */
export const listPage = (items: Article[], page = 1): ListPage => ({
  data: items.slice((page - 1) * perPage, page * perPage),
  currentPage: page,
  lastPage: Math.max(1, Math.ceil(items.length / perPage)),
});

/** The full listing puts the featured article first, then the rest by date. */
export const listingOrder = (articles: Article[]) => {
  const lead = featuredOf(articles);
  return lead ? [lead, ...articles.filter((a) => a !== lead)] : [];
};

export const formatDate = (d: Date) =>
  `${String(d.getUTCDate()).padStart(2, '0')}.${String(d.getUTCMonth() + 1).padStart(2, '0')}.${d.getUTCFullYear()}`;

export const isoDate = (d: Date) => d.toISOString().slice(0, 10);

/** Rough reading time from the Markdown body, in minutes. */
export const readingMinutes = (a: Article) =>
  Math.max(1, Math.round((a.body ?? '').split(/\s+/).filter(Boolean).length / 220));
