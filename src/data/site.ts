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
  { label: { vi: 'Hợp tác', en: 'Partnership', zh: '合作' }, href: '/#hop-tac' },
];

// VERIFY: address and email from the mockup.
// Other languages keep the local place names and add the country.
export const contact = {
  addressLines: {
    vi: ['Khóm Thới Thuận, Phường Thới Sơn', 'Tỉnh An Giang'],
    en: ['Khóm Thới Thuận, Phường Thới Sơn', 'An Giang Province, Vietnam'],
    zh: ['Khóm Thới Thuận, Phường Thới Sơn', '越南安江省'],
  } satisfies Record<Locale, string[]>,
  email: 'hiennuongfarm@gmail.com',
};
