/**
 * Placeholder pages for Dấu ấn (docs/SITEMAP.md §2 and §5), built by
 * src/pages/[...draft].astro, and the header dropdowns (§4).
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

const dauAn = { label: 'Dấu ấn', href: '/dau-an/' };

export const draftPages: DraftPage[] = [
  {
    path: '/dau-an/',
    title: 'Dấu ấn',
    eyebrow: 'Những cột mốc của Hiền Nương',
    sections: [
      {
        id: 'noi-bat',
        title: 'Cột mốc nổi bật',
        layout: 'split',
        images: [{ brief: 'Ảnh tư liệu của cột mốc nổi bật', ratio: '3 / 2', tone: 'earth' }],
      },
      {
        id: 'cot-moc',
        title: 'Các cột mốc tiêu biểu',
        layout: 'records',
        fields: ['Năm', 'Cột mốc', 'Nguồn'],
        count: 3,
      },
      {
        id: 'kham-pha',
        title: 'Khám phá Dấu ấn',
        layout: 'entries',
        entries: [
          { label: 'Giải thưởng & ghi nhận', href: '/dau-an/giai-thuong/', image: { brief: 'Ảnh giải thưởng', ratio: '4 / 5', tone: 'forest' } },
          { label: 'Chứng nhận sản phẩm', href: '/dau-an/chung-nhan/', image: { brief: 'Ảnh giấy chứng nhận', ratio: '4 / 5', tone: 'stone' } },
          { label: 'Báo chí & Truyền thông', href: '/dau-an/bao-chi/', image: { brief: 'Ảnh từ phóng sự', ratio: '4 / 5', tone: 'deep' } },
        ],
      },
    ],
  },
  {
    path: '/dau-an/giai-thuong/',
    title: 'Giải thưởng & ghi nhận',
    eyebrow: 'Dấu ấn',
    parents: [dauAn],
    sections: [
      {
        id: 'trang-trai',
        title: 'Ghi nhận dành cho trang trại',
        layout: 'records',
        fields: ['Tên ghi nhận', 'Năm', 'Đơn vị trao tặng', 'Nguồn'],
        count: 2,
        images: [{ brief: 'Ảnh giải thưởng hoặc bằng khen', ratio: '4 / 3', tone: 'earth' }],
      },
      {
        id: 'ca-nhan',
        title: 'Ghi nhận dành cho cá nhân',
        layout: 'records',
        fields: ['Tên ghi nhận', 'Người nhận', 'Năm', 'Đơn vị trao tặng', 'Nguồn'],
        count: 2,
        images: [{ brief: 'Ảnh trao giải', ratio: '4 / 3', tone: 'forest' }],
      },
    ],
  },
  {
    path: '/dau-an/chung-nhan/',
    title: 'Chứng nhận sản phẩm',
    eyebrow: 'Dấu ấn',
    parents: [dauAn],
    sections: [
      {
        id: 'danh-sach',
        title: 'Danh sách chứng nhận',
        layout: 'records',
        note: 'Mỗi chứng nhận ghi rõ sản phẩm áp dụng.',
        fields: ['Tên chứng nhận', 'Sản phẩm áp dụng', 'Đơn vị cấp', 'Hiệu lực'],
        count: 3,
        images: [{ brief: 'Ảnh giấy chứng nhận', ratio: '3 / 4', tone: 'stone' }],
      },
    ],
  },
  {
    path: '/dau-an/bao-chi/',
    title: 'Báo chí & Truyền thông',
    eyebrow: 'Dấu ấn',
    parents: [dauAn],
    sections: [
      {
        id: 'phong-su-noi-bat',
        title: 'Phóng sự nổi bật',
        layout: 'wide',
        images: [{ brief: 'Khung hình video phóng sự', ratio: '16 / 9', tone: 'deep' }],
      },
      {
        id: 'bai-viet',
        title: 'Bài viết & phóng sự',
        layout: 'records',
        fields: ['Tiêu đề', 'Đơn vị đăng tải', 'Ngày đăng', 'Liên kết gốc'],
        count: 3,
        images: [{ brief: 'Ảnh minh họa bài viết', ratio: '3 / 2', tone: 'moss' }],
      },
    ],
  },
];

/**
 * Header dropdowns (docs/SITEMAP.md §4), keyed by the header link's homepage
 * anchor. Links to Vietnamese-only pages open the Vietnamese page.
 */
export const navDropdowns: Record<string, { label: Record<Locale, string>; href: string }[]> = {
  '/#ve-hien-nuong': [
    { label: { vi: 'Câu chuyện Hiền Nương', en: 'The Hiền Nương story', zh: 'Hiền Nương 的故事' }, href: '/ve-chung-toi/' },
    { label: { vi: 'Người sáng lập', en: 'The founders', zh: '创始人' }, href: '/ve-chung-toi/#cau-chuyen' },
    { label: { vi: 'Vùng Bảy Núi', en: 'The Bảy Núi region', zh: '七山地区' }, href: '/ve-chung-toi/#bay-nui' },
  ],
  '/#tuan-hoan': [
    { label: { vi: 'Tổng quan mô hình', en: 'Model overview', zh: '模式概览' }, href: '/nong-nghiep-tuan-hoan/' },
    { label: { vi: 'Vòng tuần hoàn tại farm', en: 'The cycle on the farm', zh: '农场里的循环' }, href: '/nong-nghiep-tuan-hoan/#vong-tuan-hoan' },
    { label: { vi: 'Năng lượng mặt trời', en: 'Solar energy', zh: '太阳能' }, href: '/nong-nghiep-tuan-hoan/#nang-luong-mat-troi' },
  ],
  '/#san-vat': [{ label: { vi: 'Tất cả sản phẩm', en: 'All products', zh: '全部产品' }, href: '/san-pham/' }],
  '/#dau-an': [
    { label: { vi: 'Tổng quan Dấu ấn', en: 'Overview', zh: '概览' }, href: '/dau-an/' },
    { label: { vi: 'Giải thưởng & ghi nhận', en: 'Awards & recognition', zh: '奖项与认可' }, href: '/dau-an/giai-thuong/' },
    { label: { vi: 'Chứng nhận sản phẩm', en: 'Product certifications', zh: '产品认证' }, href: '/dau-an/chung-nhan/' },
    { label: { vi: 'Báo chí & Truyền thông', en: 'Press & media', zh: '新闻与媒体' }, href: '/dau-an/bao-chi/' },
  ],
  '/#hop-tac': [
    { label: { vi: 'Thông tin hợp tác', en: 'Partnership information', zh: '合作信息' }, href: '/hop-tac/' },
    { label: { vi: 'Liên hệ', en: 'Contact', zh: '联系我们' }, href: '/hop-tac/#lien-he' },
  ],
};
