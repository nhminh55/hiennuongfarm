/**
 * Page scaffold for local review (docs/SITEMAP.md §2 and §5).
 *
 * These pages hold placeholders only and must not be published. They are
 * built by src/pages/[...draft].astro, and the header dropdowns that link to
 * them render, only when `showDrafts` is true: under `astro dev`, or a build
 * run with HN_DRAFTS=1 (local QA only). A production build produces neither,
 * so the published site and /sitemap.xml are unchanged.
 *
 * Vietnamese only: no translations exist for this structure yet.
 *
 * To publish a page: give it its own file in src/pages/, write approved copy,
 * add the en/zh routes, remove it from `draftPages`, and add it to
 * src/pages/sitemap.xml.ts.
 */

export const showDrafts = import.meta.env.DEV || import.meta.env.HN_DRAFTS === '1';

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
    path: '/ve-chung-toi/',
    title: 'Về Hiền Nương',
    eyebrow: 'Câu chuyện Hiền Nương',
    sections: [
      {
        id: 'cau-chuyen',
        title: 'Câu chuyện Hiền Nương',
        layout: 'split',
        note: 'Hành trình hình thành trang trại.',
        images: [{ brief: 'Ảnh tư liệu những ngày đầu của trang trại', ratio: '4 / 5', tone: 'earth' }],
      },
      {
        id: 'nguoi-sang-lap',
        title: 'Người sáng lập',
        layout: 'split',
        note: 'Chị Châu Thị Nương và anh Trần Phương Hiền.',
        images: [{ brief: 'Chân dung hai nhà sáng lập tại trang trại', ratio: '5 / 4', tone: 'forest' }],
      },
      {
        id: 'bay-nui',
        title: 'Vùng Bảy Núi',
        layout: 'wide',
        note: 'Vùng đất nơi trang trại hình thành.',
        images: [{ brief: 'Toàn cảnh vùng Bảy Núi, An Giang', ratio: '21 / 9', tone: 'moss' }],
      },
      {
        id: 'co-so',
        title: 'Cơ sở Thới Sơn và Tri Tôn',
        layout: 'gallery',
        note: 'Giới thiệu ngắn về hai cơ sở; địa chỉ và chỉ đường ở trang Hợp tác & liên hệ.',
        images: [
          { brief: 'Cơ sở Thới Sơn', ratio: '4 / 3', tone: 'clay' },
          { brief: 'Cơ sở Tri Tôn', ratio: '4 / 3', tone: 'stone' },
        ],
        links: [{ label: 'Địa chỉ các cơ sở', href: '/hop-tac/#co-so' }],
      },
      {
        id: 'dinh-huong',
        title: 'Định hướng phát triển',
        layout: 'split',
        note: 'Hướng đi tiếp theo của trang trại.',
        images: [{ brief: 'Ảnh trang trại hiện nay', ratio: '3 / 2', tone: 'deep' }],
        links: [{ label: 'Nông nghiệp tuần hoàn', href: '/nong-nghiep-tuan-hoan/' }],
      },
    ],
  },
  {
    path: '/nong-nghiep-tuan-hoan/',
    title: 'Nông nghiệp tuần hoàn',
    eyebrow: 'Mô hình tại trang trại',
    sections: [
      {
        id: 'tong-quan',
        title: 'Tổng quan mô hình',
        layout: 'wide',
        note: 'Cách các công đoạn tại trang trại liên kết với nhau.',
        images: [{ brief: 'Toàn cảnh khu sản xuất của trang trại', ratio: '16 / 9', tone: 'forest' }],
      },
      {
        id: 'vong-tuan-hoan',
        title: 'Vòng tuần hoàn tại farm',
        layout: 'split',
        note: 'Các công đoạn thực tế, theo tư liệu của trang trại.',
        images: [{ brief: 'Ảnh thực tế một công đoạn trong vòng tuần hoàn', ratio: '4 / 5', tone: 'earth' }],
      },
      {
        id: 'nang-luong-mat-troi',
        title: 'Năng lượng mặt trời',
        layout: 'split',
        note: 'Hệ thống điện mặt trời tại cơ sở áp dụng.',
        images: [{ brief: 'Hệ thống tấm pin mặt trời tại trang trại', ratio: '3 / 2', tone: 'stone' }],
      },
      {
        id: 'hinh-anh',
        title: 'Hình ảnh tại trang trại',
        layout: 'gallery',
        images: [
          { brief: 'Nhà trồng nấm', ratio: '4 / 5', tone: 'moss' },
          { brief: 'Khu nuôi trùn quế', ratio: '4 / 5', tone: 'clay' },
          { brief: 'Người làm nấm tại trang trại', ratio: '4 / 5', tone: 'deep' },
        ],
        links: [
          { label: 'Sản phẩm', href: '/san-pham/' },
          { label: 'Hợp tác & liên hệ', href: '/hop-tac/' },
        ],
      },
    ],
  },
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
  {
    path: '/hop-tac/',
    title: 'Hợp tác & liên hệ',
    eyebrow: 'Hợp tác cùng Hiền Nương',
    sections: [
      {
        id: 'thong-tin-hop-tac',
        title: 'Thông tin hợp tác',
        layout: 'split',
        images: [{ brief: 'Ảnh làm việc cùng đối tác tại trang trại', ratio: '4 / 5', tone: 'forest' }],
      },
      {
        id: 'co-so',
        title: 'Các cơ sở',
        layout: 'facilities',
        images: [{ brief: 'Bản đồ hai cơ sở', ratio: '16 / 9', tone: 'stone' }],
      },
      {
        id: 'lien-he',
        title: 'Liên hệ',
        layout: 'contact',
      },
    ],
  },
];

/**
 * Header dropdowns (docs/SITEMAP.md §4), keyed by the header link's homepage
 * anchor. Shown only with `showDrafts`, on Vietnamese pages.
 */
export const navDropdowns: Record<string, DraftLink[]> = {
  '/#ve-hien-nuong': [
    { label: 'Câu chuyện Hiền Nương', href: '/ve-chung-toi/' },
    { label: 'Người sáng lập', href: '/ve-chung-toi/#nguoi-sang-lap' },
    { label: 'Vùng Bảy Núi', href: '/ve-chung-toi/#bay-nui' },
  ],
  '/#tuan-hoan': [
    { label: 'Tổng quan mô hình', href: '/nong-nghiep-tuan-hoan/' },
    { label: 'Vòng tuần hoàn tại farm', href: '/nong-nghiep-tuan-hoan/#vong-tuan-hoan' },
    { label: 'Năng lượng mặt trời', href: '/nong-nghiep-tuan-hoan/#nang-luong-mat-troi' },
  ],
  '/#san-vat': [{ label: 'Tất cả sản phẩm', href: '/san-pham/' }],
  '/#dau-an': [
    { label: 'Tổng quan Dấu ấn', href: '/dau-an/' },
    { label: 'Giải thưởng & ghi nhận', href: '/dau-an/giai-thuong/' },
    { label: 'Chứng nhận sản phẩm', href: '/dau-an/chung-nhan/' },
    { label: 'Báo chí & Truyền thông', href: '/dau-an/bao-chi/' },
  ],
  '/#hop-tac': [
    { label: 'Thông tin hợp tác', href: '/hop-tac/' },
    { label: 'Liên hệ', href: '/hop-tac/#lien-he' },
  ],
};
