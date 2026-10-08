/**
 * Shared site content.
 *
 * VERIFY: values marked VERIFY are taken from the design mockup
 * (design-reference/homepage-mockup.png), not from a confirmed source.
 * They must be confirmed by Hiền Nương before launch.
 */

import type { Locale } from '../i18n';

export const site = {
  name: 'Hiền Nương Farm',
  url: 'https://hiennuongfarm.vn',
  description: {
    vi: 'Hiền Nương Farm — mô hình nông nghiệp tuần hoàn tại vùng Bảy Núi, An Giang.',
    en: 'Hiền Nương Farm — a circular agriculture model in the Bảy Núi region of An Giang, Vietnam.',
    zh: 'Hiền Nương Farm——位于越南安江省七山地区的循环农业模式。',
  } satisfies Record<Locale, string>,
};

export interface NavItem {
  label: Record<Locale, string>;
  /** Vietnamese path; localize with localizePath(). */
  href: string;
}

// Links point to homepage sections until each secondary page is built.
export const nav: NavItem[] = [
  { label: { vi: 'Về Hiền Nương', en: 'About Hiền Nương', zh: '关于 Hiền Nương' }, href: '/#ve-hien-nuong' },
  { label: { vi: 'Nông nghiệp tuần hoàn', en: 'Circular Agriculture', zh: '循环农业' }, href: '/#tuan-hoan' },
  { label: { vi: 'Sản vật', en: 'Farm Produce', zh: '农场物产' }, href: '/san-pham/' },
  { label: { vi: 'Vùng Bảy Núi', en: 'Bảy Núi Region', zh: '七山地区' }, href: '/#bay-nui' },
  { label: { vi: 'Dấu ấn', en: 'Press', zh: '媒体报道' }, href: '/#dau-an' },
  { label: { vi: 'Hợp tác', en: 'Partnership', zh: '合作' }, href: '/#hop-tac' },
];

// Footer "Khám phá": a shorter list than the header.
export const footerNav: NavItem[] = [
  nav[0],
  { label: { vi: 'Sản phẩm', en: 'Products', zh: '产品' }, href: '/san-pham/' },
  nav[1],
  nav[4],
];

// VERIFY: address from the mockup. Email and phone are owner-provided.
// Other languages keep the local place names and add the country.
export const contact = {
  addressLines: {
    vi: ['Khóm Thới Thuận, Phường Thới Sơn', 'Tỉnh An Giang'],
    en: ['Khóm Thới Thuận, Phường Thới Sơn', 'An Giang Province, Vietnam'],
    zh: ['Khóm Thới Thuận, Phường Thới Sơn', '越南安江省'],
  } satisfies Record<Locale, string[]>,
  email: 'contact@hiennuongfarm.vn',
  phone: '+84985799777',
  phoneDisplay: '+84 985 799 777',
};

// Owner-provided household business registration, shown as-is in every language.
export const business = {
  name: ['HỘ KINH DOANH TRANG TRẠI', 'NÔNG NGHIỆP HIỀN NƯƠNG'],
  code: 'Mã số HKD: 8668062400-001',
  registration: ['Đăng ký HKD số 52H8006524', 'Ngày: 10/04/2024'],
  issuer: 'Cơ quan cấp: Phòng Tài chính – Kế hoạch huyện Tri Tôn, tỉnh An Giang',
};
