/**
 * Shared site content.
 *
 * VERIFY: values marked VERIFY are taken from the design mockup
 * (design-reference/homepage-mockup.png), not from a confirmed source.
 * They must be confirmed by Hiền Nương before launch.
 */

export const site = {
  name: 'Hiền Nương Farm',
  url: 'https://hiennuongfarm.vn',
  description:
    'Hiền Nương Farm — mô hình nông nghiệp tuần hoàn tại vùng Bảy Núi, An Giang.',
};

export interface NavItem {
  label: string;
  href: string;
}

// Secondary pages are not built yet; links point to homepage sections.
export const nav: NavItem[] = [
  { label: 'Về Hiền Nương', href: '/#ve-hien-nuong' },
  { label: 'Nông nghiệp tuần hoàn', href: '/#tuan-hoan' },
  { label: 'Sản vật', href: '/#san-vat' },
  { label: 'Vùng Bảy Núi', href: '/#bay-nui' },
  { label: 'Hợp tác', href: '/#hop-tac' },
];

// VERIFY: address and email from the mockup.
export const contact = {
  addressLines: ['Khóm Thới Thuận, Phường Thới Sơn', 'Tỉnh An Giang'],
  email: 'hiennuongfarm@gmail.com',
};
