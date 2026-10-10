/**
 * Builds the admin (/admin, Sveltia CMS) from the copy files in src/content/:
 * public/admin/config.yml (Vietnamese labels, fields in page order) and the
 * annotated screenshots in public/admin/huong-dan/ that the preview pane
 * shows, numbered ①②③ to match the field labels.
 *
 * Run after a build, against a server serving dist/ (port 4330 or above):
 *   npx astro preview --port 4330
 *   node scripts/admin-guide.mjs http://127.0.0.1:4330
 */
import fs from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const yaml = require('js-yaml');
const { chromium } = require('@playwright/test');
const BASE = process.argv[2] ?? 'http://127.0.0.1:4330';
const read = (f) => yaml.load(fs.readFileSync(f, 'utf8').split(/^---$/m)[1]);

const ADV = 'Nâng cao (mô tả ảnh, chữ cho trình đọc màn hình, mô tả trên Google)';
const ALT = 'Mô tả ảnh cho người khiếm thị và Google — không hiện trên trang';
// key -> label or [label, hint]. Nested keys use dots; list items use [].
const L = {
  'trang-chu/01-mo-dau': { _: 'Phần mở đầu (ảnh lớn đầu trang)',
    title: ['Tiêu đề lớn', 'Mỗi ô là một dòng'], sub: 'Dòng giới thiệu dưới tiêu đề', cta: 'Nút chính', scroll: 'Chữ “Kéo xuống”',
    sections: ['Tên các phần (thanh bên phải)', 'Theo thứ tự các mục trên trang chủ'],
    'nang_cao.alts': ['Mô tả các ảnh nền', ALT], 'nang_cao.navLabel': 'Tên thanh điều hướng các phần' },
  'trang-chu/02-ve-hien-nuong': { _: 'Mục 01 · Về Hiền Nương',
    eyebrow: 'Chữ nhỏ trên tiêu đề', title: 'Tiêu đề', body: 'Đoạn giới thiệu', more: 'Nút “Tìm hiểu thêm”', 'nang_cao.alt': ['Mô tả ảnh chị Nương', ALT] },
  'trang-chu/03-brand-film': { _: 'Khối Brand Film',
    label: 'Chữ nhỏ', title: 'Tiêu đề phim', summary: 'Mô tả ngắn', cta: 'Nút xem phim', 'nang_cao.watch': 'Chữ của nút phát (trình đọc màn hình)', 'nang_cao.alt': ['Mô tả ảnh bìa phim', ALT] },
  'trang-chu/04-tuan-hoan': { _: 'Mục Nông nghiệp tuần hoàn',
    eyebrow: 'Chữ nhỏ trên tiêu đề', title: 'Tiêu đề', body: 'Đoạn giới thiệu', more: 'Nút “Tìm hiểu thêm”', motto: ['Câu khẩu hiệu', 'Mỗi ô là một dòng'],
    steps: ['Sáu bước của vòng tuần hoàn', 'Đúng 6 bước, theo thứ tự trên vòng. Xuống dòng trong ô = xuống dòng trên vòng'],
    'nang_cao.stepsLabel': 'Tên vòng tuần hoàn (trình đọc màn hình)', 'nang_cao.alt': ['Mô tả ảnh nấm bào ngư', ALT] },
  'trang-chu/05-san-vat': { _: 'Mục Sản vật',
    eyebrow: 'Chữ nhỏ trên tiêu đề', title: 'Tiêu đề', intro: 'Đoạn giới thiệu', linhChi: 'Tên hiển thị của Nấm Linh Chi',
    additional: ['Tên 8 sản phẩm còn lại', 'Đúng 8 tên, theo thứ tự trên băng chuyền'], descriptions: ['Mô tả 12 sản phẩm', 'Đúng 12 mô tả, theo thứ tự trên băng chuyền'],
    all: 'Nút “Xem tất cả sản phẩm”', details: 'Nút “Chi tiết”',
    'nang_cao.carousel': 'Tên băng chuyền', 'nang_cao.list': 'Tên danh sách sản phẩm', 'nang_cao.detailsOf': ['Nút chi tiết (trình đọc màn hình)', '{name} là chỗ website tự điền tên sản phẩm, giữ nguyên'],
    'nang_cao.prev': 'Nút sản phẩm trước', 'nang_cao.next': 'Nút sản phẩm tiếp theo' },
  'trang-chu/06-bay-nui': { _: 'Mục Vùng Bảy Núi',
    eyebrow: 'Chữ nhỏ trên tiêu đề', title: 'Tiêu đề', body: 'Đoạn giới thiệu', more: 'Nút', 'nang_cao.alt': ['Mô tả ảnh cánh đồng', ALT] },
  'trang-chu/07-dau-an': { _: 'Mục Dấu ấn',
    eyebrow: 'Chữ nhỏ trên tiêu đề', title: 'Tiêu đề', intro: 'Đoạn giới thiệu', more: 'Nút “Xem chi tiết”', 'nang_cao.moreOf': ['Nút xem chi tiết (trình đọc màn hình)', '{title} là chỗ website tự điền tên bài, giữ nguyên'] },
  'trang-chu/08-hop-tac': { _: 'Mục Hợp tác',
    eyebrow: 'Chữ nhỏ trên tiêu đề', title: 'Tiêu đề', body: 'Đoạn giới thiệu', cta: 'Nút', caption: 'Chú thích ảnh',
    'nang_cao.subject': 'Tiêu đề email khi khách bấm gửi mail', 'nang_cao.alt': ['Mô tả ảnh lễ ký kết', ALT] },
  'chung/lien-he': { _: 'Liên hệ & đăng ký kinh doanh',
    email: 'Email', phone: ['Số điện thoại 1', 'Viết có dấu cách cho dễ đọc, ví dụ +84 985 799 777'], phone2: 'Số điện thoại 2',
    address: ['Địa chỉ (menu trên điện thoại)', 'Mỗi ô là một dòng'], locations: ['Hai cơ sở (chân trang)', 'Đúng 2 cơ sở: Thới Sơn, rồi Tri Tôn'], 'locations[].name': 'Tên cơ sở', 'locations[].address': 'Địa chỉ',
    business_name: ['Tên hộ kinh doanh', 'Mỗi ô là một dòng'], business_code: 'Mã số HKD', business_registration: ['Số và ngày đăng ký', 'Mỗi ô là một dòng'], business_issuer: 'Cơ quan cấp',
    'nang_cao.description': 'Mô tả website trên Google và khi chia sẻ link' },
  'chung/menu': { _: 'Menu',
    header: 'Menu trên cùng', 'header.about': 'Về Hiền Nương', 'header.circular': 'Nông nghiệp tuần hoàn', 'header.products': 'Sản phẩm', 'header.press': 'Dấu ấn', 'header.partner': 'Hợp tác', 'header.contact': 'Liên hệ',
    nav: ['Tên trang ở chân trang và đường dẫn', 'Cột “Khám phá” ở chân trang, dòng “Trang chủ / …” và các chỗ khác'], 'nav.about': 'Về Hiền Nương', 'nav.circular': 'Nông nghiệp tuần hoàn', 'nav.produce': 'Sản vật', 'nav.bayNui': 'Vùng Bảy Núi', 'nav.press': 'Dấu ấn', 'nav.partner': 'Hợp tác', 'nav.products': 'Sản phẩm', 'nav.play': 'Chơi cùng nông trại' },
  'chung/footer': { _: 'Chân trang',
    line: ['Câu dưới logo', 'Mỗi ô là một dòng'], explore: 'Tiêu đề cột “Khám phá”', contact: 'Tiêu đề cột “Liên hệ”', rights: 'Dòng bản quyền',
    'nang_cao.navLabel': 'Tên vùng điều hướng', 'nang_cao.noLink': 'Chữ khi thiếu liên kết', 'nang_cao.top': 'Nút lên đầu trang' },
  'chung/header': { _: 'Chữ phụ của menu (trình đọc màn hình)',
    mainNav: 'Tên menu chính', menuNav: 'Tên menu điện thoại', menu: 'Nút mở menu', close: 'Nút đóng', submenu: 'Tên menu con' },
  'san-pham/ten-va-mo-ta': { _: 'Tên và mô tả 4 dòng nấm chính' },
  'san-pham/trang-san-pham': { _: 'Trang Sản phẩm (/san-pham/)',
    eyebrow: 'Chữ nhỏ trên tiêu đề', home: 'Chữ “Trang chủ” trong đường dẫn', ctaTitle: 'Tiêu đề phần liên hệ cuối trang', ctaBody: 'Đoạn liên hệ cuối trang',
    'nang_cao.pageTitle': 'Tên trang (trên tab trình duyệt)', 'nang_cao.description': 'Mô tả trang trên Google' },
  'san-pham/nam-moi-den': { _: 'Trang Nấm Mối Đen',
    origin: 'Dòng xuất xứ dưới tên', heroBody: 'Đoạn mở đầu',
    introEyebrow: 'Giới thiệu · chữ nhỏ', introTitle: 'Giới thiệu · tiêu đề', introBody: ['Giới thiệu · các đoạn văn', 'Mỗi ô là một đoạn'], introCaption: 'Giới thiệu · chú thích ảnh',
    facts: ['Bảng thông tin nhanh', 'Đúng 4 dòng'], 'facts[].label': 'Tên', 'facts[].value': 'Nội dung',
    processEyebrow: 'Quy trình · chữ nhỏ', processTitle: 'Quy trình · tiêu đề', steps: ['Quy trình · các bước', 'Đúng 5 bước, theo thứ tự'], 'steps[].title': 'Tên bước', 'steps[].text': 'Mô tả bước', processNote: 'Quy trình · ghi chú dưới cùng',
    peopleEyebrow: 'Con người · chữ nhỏ', peopleTitle: 'Con người · tiêu đề', peopleBody: 'Con người · đoạn văn',
    labNote: 'Ghi chú dưới bảng kiểm nghiệm', ctaTitle: 'Tiêu đề phần liên hệ cuối trang', ctaBody: 'Đoạn liên hệ cuối trang',
    'nang_cao.description': 'Mô tả trang trên Google', 'nang_cao.stepAlts': ['Mô tả ảnh các bước', ALT], 'nang_cao.introAlt': ['Mô tả ảnh giới thiệu', ALT], 'nang_cao.peopleAlts': ['Mô tả ảnh con người', ALT] },
  'san-pham/chung-dau-trang': { _: 'Phần đầu trang sản phẩm (dùng chung)',
    home: 'Chữ “Trang chủ” trong đường dẫn', products: 'Chữ “Sản phẩm” trong đường dẫn', eyebrow: 'Chữ nhỏ trên tên sản phẩm', process: 'Nút xem quy trình', contact: 'Nút liên hệ' },
  'san-pham/chung-san-pham-khac': { _: 'Mục “Sản phẩm khác” (dùng chung)', eyebrow: 'Chữ nhỏ trên tiêu đề', title: 'Tiêu đề', all: 'Nút “Tất cả sản phẩm”' },
  'san-pham/chung-kiem-nghiem': { _: 'Bảng kết quả kiểm nghiệm (dùng chung)',
    eyebrow: 'Chữ nhỏ trên tiêu đề', title: 'Tiêu đề', intro: 'Đoạn giới thiệu', report: 'Chữ “Báo cáo”', sample: 'Chữ “Mẫu thử”', lab: 'Chữ “Đơn vị thử nghiệm”', customer: 'Chữ “Đơn vị gửi mẫu”',
    testedOn: 'Chữ “Ngày thử nghiệm”', code: 'Chữ “Mã báo cáo”', param: 'Tiêu đề cột “Chỉ tiêu”', result: 'Tiêu đề cột “Kết quả”', notes: ['Ghi chú dưới bảng', 'Mỗi ô là một đoạn'] },
  've-chung-toi/cac-chuong': { _: 'Sáu chương',
    chapters: ['Các chương', 'Đúng 6 chương, theo thứ tự 01 → 06'], 'chapters[].label': 'Chữ nhỏ cạnh số chương', 'chapters[].title': 'Tiêu đề chương',
    'chapters[].paragraphs': ['Các đoạn văn', 'Mỗi ô là một đoạn. Chỉ chữ thường, không dùng chữ đậm, nghiêng hay link'],
    'chapters[].more': ['Phần mở rộng (bấm để xem)', 'Chỉ chương Bảy Núi có phần này'], 'chapters[].more.summary': 'Câu hỏi', 'chapters[].more.intro': 'Đoạn dẫn',
    'chapters[].more.head': ['Tiêu đề hai cột của bảng', 'Đúng 2 ô'], 'chapters[].more.rows': 'Các dòng bảng', 'chapters[].more.rows[].name': 'Tên thường gọi', 'chapters[].more.rows[].sino': 'Tên Hán Việt' },
  've-chung-toi/trang': { _: 'Tiêu đề, ảnh, video, phần kết',
    eyebrow: 'Chữ nhỏ trên tiêu đề', title: 'Tiêu đề trang', lead: 'Câu dẫn dưới tiêu đề', home: 'Chữ “Trang chủ” trong đường dẫn',
    nav: ['Tên ngắn của 6 chương (thanh chương)', 'Đúng 6 tên'], circularLink: 'Nút “Khám phá vòng tuần hoàn”',
    media: 'Ảnh: chú thích và mô tả', film: 'Video giới thiệu', 'film.eyebrow': 'Chữ nhỏ', 'film.title': 'Tiêu đề', 'film.watch': 'Nút xem phim',
    closing: 'Phần kết', 'closing.eyebrow': 'Chữ nhỏ', 'closing.title': 'Tiêu đề', 'closing.body': ['Các đoạn văn', 'Mỗi ô là một đoạn'], 'closing.button': 'Nút',
    'nang_cao.pageTitle': 'Tên trang (trên tab trình duyệt)', 'nang_cao.description': 'Mô tả trang trên Google', 'nang_cao.heroAlt': ['Mô tả ảnh đầu trang', ALT], 'nang_cao.navLabel': 'Tên thanh chương' },
};
const MEDIA = { founders: 'Ảnh hai người sáng lập', bayNui: 'Ảnh Bảy Núi', thoiSon: 'Ảnh cơ sở Thới Sơn', taDanh: 'Ảnh cơ sở Tà Đảnh', solar: 'Ảnh mái điện mặt trời', substrate: 'Ảnh nguyên liệu giá thể', bags: 'Ảnh bịch phôi', team: 'Ảnh chuẩn bị giá thể', harvest: 'Ảnh thu hoạch' };
const PRODUCTS = { 'nam-moi-den': 'Nấm Mối Đen', 'nam-linh-chi': 'Nấm Linh Chi', 'dong-trung-ha-thao': 'Đông Trùng Hạ Thảo', 'nam-bao-ngu': 'Nấm Bào Ngư' };
const missing = [];
// Lists the owner may lengthen or shorten; every other list keeps its number of items (the page lays them out by position).
const FREE = ['notes', 'closing.body', 'chapters[].paragraphs', 'chapters[].more.rows'];
const isLong = (v) => typeof v === 'string' && (v.length > 70 || v.includes('\n'));
const lab = (labels, key) => {
  if (labels[key] !== undefined) return labels[key];
  const parts = key.split('.');
  const last = parts[parts.length - 1];
  if (parts[0] === 'media' && parts.length === 2) return MEDIA[last];
  if (parts[0] === 'media' && last === 'alt') return ['Mô tả ảnh', ALT];
  if (parts[0] === 'media' && last === 'caption') return 'Chú thích dưới ảnh';
  if (parts.length === 1 && PRODUCTS[last]) return PRODUCTS[last];
  if (parts.length === 2 && PRODUCTS[parts[0]]) return { name: 'Tên sản phẩm', note: 'Mô tả ngắn dưới tên', alt: ['Mô tả ảnh', ALT] }[last];
};
// For lists of objects, use the most complete item (e.g. the chapter with `more`).
const valueOf = (list, k) => list.map((x) => x[k]).find((x) => x !== undefined) ?? list[0][k];

// Where each copy file appears: [page, element to photograph, 'phone' for a
// phone-width shot, fields not shown in that element].
const PAGES = {
  'trang-chu/01-mo-dau': ['/', '.hero'],
  'trang-chu/02-ve-hien-nuong': ['/', '#ve-hien-nuong'],
  // The film's caption shows on phones only.
  'trang-chu/03-brand-film': ['/', '.brand-film', 'phone'],
  'trang-chu/04-tuan-hoan': ['/', '#tuan-hoan'],
  'trang-chu/05-san-vat': ['/', '#san-vat'],
  'trang-chu/06-bay-nui': ['/', '#bay-nui'],
  'trang-chu/07-dau-an': ['/', '#dau-an'],
  'trang-chu/08-hop-tac': ['/', '#hop-tac'],
  've-chung-toi/trang': ['/ve-chung-toi/', 'main'],
  've-chung-toi/cac-chuong': ['/ve-chung-toi/', 'main'],
  'san-pham/ten-va-mo-ta': ['/san-pham/', 'main'],
  'san-pham/trang-san-pham': ['/san-pham/', 'main'],
  'san-pham/nam-moi-den': ['/san-pham/nam-moi-den/', 'main'],
  'san-pham/chung-dau-trang': ['/san-pham/nam-moi-den/', '.p-hero'],
  'san-pham/chung-san-pham-khac': ['/san-pham/nam-moi-den/', '.related'],
  'san-pham/chung-kiem-nghiem': ['/san-pham/nam-moi-den/', '#kiem-nghiem'],
  'chung/lien-he': ['/', '.site-footer', null, ['address']],
  'chung/menu': ['/san-pham/', '.site-header__bar'],
  'chung/footer': ['/', '.site-footer'],
  'chung/header': ['/san-pham/', '.site-header__bar'],
};
// Label of one item in a list of plain strings.
const ITEM = {
  sections: 'Tên phần', steps: 'Bước', additional: 'Tên sản phẩm', descriptions: 'Mô tả', nav: 'Tên chương',
  notes: 'Đoạn văn', introBody: 'Đoạn văn', paragraphs: 'Đoạn văn', body: 'Đoạn văn', head: 'Tiêu đề cột',
  alts: 'Mô tả ảnh', stepAlts: 'Mô tả ảnh', peopleAlts: 'Mô tả ảnh',
};
const CIRCLED = '①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳';

const field = (labels, key, name, v, i18n) => {
  let l = name === 'nang_cao' ? ADV : lab(labels, key);
  if (l === undefined) { missing.push(key); l = name; }
  const [label, hint] = Array.isArray(l) ? l : [l];
  const f = { label, name, i18n, ...(hint && { hint }) };
  if (Array.isArray(v)) {
    f.widget = 'list';
    if (!FREE.includes(key)) { f.min = v.length; f.max = v.length; }
    if (v[0] && typeof v[0] === 'object') {
      const keys = [...new Set(v.flatMap((x) => Object.keys(x)))];
      f.fields = keys.map((k) => field(labels, `${key}[].${k}`, k, valueOf(v, k), i18n));
      f.collapsed = true;
      f.summary = `{{fields.${keys[0]}}}`;
    } else {
      f.field = { label: ITEM[name] ?? 'Dòng', name: 'item', widget: v.some(isLong) ? 'text' : 'string' };
      if (v.length > 4) { f.collapsed = true; f.summary = '{{fields.item}}'; }
    }
  } else if (v && typeof v === 'object') {
    f.widget = 'object';
    if (name === 'nang_cao' || key.startsWith('media')) f.collapsed = true;
    f.fields = Object.entries(v).map(([k, x]) => field(labels, `${key}.${k}`, k, x, i18n));
  } else {
    f.widget = isLong(v) ? 'text' : 'string';
  }
  return f;
};

const strings = (v) => (typeof v === 'string' ? [v] : Array.isArray(v) ? v.flatMap(strings) : v && typeof v === 'object' ? Object.values(v).flatMap(strings) : []);

// Finds where each group of strings sits inside `root` on the page: the
// smallest visible element whose text matches, as boxes relative to the root.
const locate = (page, selector, groups) => page.evaluate(({ selector, groups }) => {
  const norm = (s) => s.replace(/\s+/g, ' ').trim().toLowerCase();
  const root = document.querySelector(selector);
  if (!root) return null;
  const r0 = root.getBoundingClientRect();
  const els = [...root.querySelectorAll('*')].filter((el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && r.bottom > r0.top && r.top < r0.bottom;
  });
  const used = new Set();
  return groups.map((texts) => {
    const boxes = [];
    for (const t of texts) {
      const want = norm(t);
      if (want.length < 2) continue;
      const hits = els.filter((el) => !used.has(el) && norm(el.textContent).includes(want) && norm(el.textContent).length <= want.length * 1.5 + 20);
      // The innermost match.
      const el = hits.find((h) => !hits.some((o) => o !== h && h.contains(o)));
      if (!el) continue;
      used.add(el);
      const r = el.getBoundingClientRect();
      boxes.push({ x: r.left - r0.left, y: r.top - r0.top });
    }
    return boxes;
  });
}, { selector, groups });

const badge = (page, selector, marks, size) => page.evaluate(({ selector, marks, size }) => {
  const root = document.querySelector(selector);
  if (getComputedStyle(root).position === 'static') root.style.position = 'relative';
  const placed = [];
  for (const { x, y, text } of marks) {
    // Left of the text; above it when the text starts at the edge.
    const room = x >= size + 4;
    const left = room ? x - size - 4 : x;
    let top = room ? y - 4 : Math.max(0, y - size - 2);
    // Never on top of another mark.
    const near = (p) => Math.abs(p.left - left) < size && Math.abs(p.top - top) < size;
    if (placed.some((p) => p.text === text && near(p))) continue;
    while (placed.some(near)) top += size + 2;
    placed.push({ left, top, text });
    const b = document.createElement('span');
    b.textContent = text;
    b.style.cssText = `position:absolute;left:${left}px;top:${top}px;z-index:99999;min-width:${size}px;height:${size}px;padding:0 6px;box-sizing:border-box;border-radius:${size / 2}px;background:#d6331c;color:#fff;font:700 ${size * 0.58}px/${size}px system-ui,sans-serif;text-align:center;box-shadow:0 0 0 3px #fff,0 2px 6px rgba(0,0,0,.4);pointer-events:none`;
    root.appendChild(b);
  }
}, { selector, marks, size });

const browser = await chromium.launch();
// Whole pages are photographed at half resolution, with larger marks.
const pages = {
  section: await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' }),
  phone: await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, reducedMotion: 'reduce' }),
  whole: await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 0.5, reducedMotion: 'reduce' }),
};
let page;
const guide = {};
const shoot = async (url, selector, groups, file) => {
  await page.goto(BASE + url, { waitUntil: 'load' });
  // Let lazy images and reveal effects run.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
    window.scrollTo(0, 0);
    document.querySelectorAll('[data-reveal]').forEach((el) => { el.style.opacity = '1'; el.style.transform = 'none'; });
  });
  await page.waitForTimeout(400);
  const found = await locate(page, selector, groups);
  if (!found) throw new Error(`${url}: no ${selector}`);
  return found;
};

const groups = [
  ['trang_chu', 'Trang chủ', 'trang-chu'],
  ['ve_chung_toi', 'Về chúng tôi', 've-chung-toi'],
  ['san_pham', 'Sản phẩm', 'san-pham'],
  ['chung', 'Menu, liên hệ, chân trang', 'chung'],
];
const order = { chung: ['lien-he', 'menu', 'footer', 'header'], 'san-pham': ['ten-va-mo-ta', 'trang-san-pham', 'nam-moi-den', 'chung-dau-trang', 'chung-san-pham-khac', 'chung-kiem-nghiem'], 've-chung-toi': ['trang', 'cac-chuong'] };
fs.mkdirSync('public/admin/huong-dan', { recursive: true });
const collections = [];
for (const [name, label, dir] of groups) {
  const names = order[dir] ?? fs.readdirSync('src/content/' + dir).map((f) => f.replace(/\.md$/, '')).sort();
  const files = [];
  for (const n of names) {
    const key = `${dir}/${n}`, labels = L[key];
    if (!labels) throw new Error('no labels for ' + key);
    const vi = read(`src/content/${key}.md`).vi;
    const i18nOf = (k) => (key === 'chung/lien-he' && /^(email|phone|phone2|business_)/.test(k) ? 'duplicate' : true);
    let fields = Object.entries(vi).map(([k, v]) => field(labels, k, k, v, i18nOf(k)));
    const [url, selector, size, skip = []] = PAGES[key];
    const visible = fields.filter((f) => f.name !== 'nang_cao');
    // One list of items (the chapters): number the items, not the field.
    const perItem = visible.length === 1 && Array.isArray(vi[visible[0].name]) && typeof vi[visible[0].name][0] === 'object';
    const units = perItem ? vi[visible[0].name].map((item) => [item.title ?? strings(item)[0]]) : visible.map((f) => (skip.includes(f.name) ? [] : strings(vi[f.name])));
    page = size === 'phone' ? pages.phone : selector === 'main' ? pages.whole : pages.section;
    const found = await shoot(url, selector, units);
    const marks = [];
    if (perItem) {
      found.forEach((boxes, i) => boxes.slice(0, 1).forEach((b) => marks.push({ ...b, text: CIRCLED[i] })));
      visible[0].hint = `${visible[0].hint ? visible[0].hint + '. ' : ''}Số ①–${CIRCLED[units.length - 1]} trên ảnh là thứ tự các mục`;
    } else {
      // Fields in the order they appear on the page; those not shown on it last.
      const ranked = visible.map((f, i) => ({ f, boxes: found[i], y: found[i].length ? Math.min(...found[i].map((b) => b.y)) : Infinity, i }))
        .sort((a, b) => a.y - b.y || a.i - b.i);
      let num = 0;
      for (const r of ranked) {
        if (r.y === Infinity) continue;
        const c = CIRCLED[num++];
        r.f.label = `${c} ${r.f.label}`;
        // One mark per field, on its first line.
        marks.push({ ...r.boxes.sort((a, b) => a.y - b.y || a.x - b.x)[0], text: c });
      }
      fields = [...ranked.map((r) => r.f), ...fields.filter((f) => f.name === 'nang_cao')];
    }
    await badge(page, selector, marks, selector === 'main' ? 64 : 32);
    const img = `huong-dan/${dir}-${n}.jpg`;
    await page.locator(selector).first().screenshot({ path: `public/admin/${img}`, type: 'jpeg', quality: 62 });
    guide[n] = { image: img, url, fields: fields.filter((f) => f.name !== 'nang_cao').map((f) => [f.name, f.label]) };
    files.push({ name: n, label: labels._, file: `src/content/${key}.md`, format: 'frontmatter', i18n: true, preview_path: url, fields });
    console.log(key, marks.length, 'marks');
  }
  collections.push({ name, label, i18n: true, files });
}
await browser.close();

const chapters = collections[1].files.find((f) => f.name === 'cac-chuong').fields[0];
chapters.fields.find((f) => f.name === 'more').required = false;
const config = {
  backend: {
    name: 'github', repo: 'nhminh55/hiennuongfarm', branch: 'main',
    base_url: 'https://hiennuongfarm.pages.dev', auth_endpoint: 'api/auth',
    commit_messages: { update: 'Nội dung: sửa {{collection}} · {{slug}}' },
  },
  site_url: 'https://hiennuongfarm.vn',
  media_folder: 'public/images/uploads',
  output: { omit_empty_optional_fields: true },
  i18n: { structure: 'single_file', locales: ['vi', 'en', 'zh'], default_locale: 'vi' },
  collections,
};
if (missing.length) { console.error('MISSING LABELS:\n' + missing.join('\n')); process.exit(1); }
fs.writeFileSync('public/admin/config.yml', '# Generated by scripts/admin-guide.mjs — edit the labels there and rerun.\n' + yaml.dump(config, { lineWidth: -1, noRefs: true }));
fs.writeFileSync('public/admin/huong-dan/guide.js', '// Generated by scripts/admin-guide.mjs.\nwindow.ADMIN_GUIDE = ' + JSON.stringify(guide, null, 1) + ';\n');
console.log('done');
