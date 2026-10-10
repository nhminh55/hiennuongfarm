/**
 * Shared site content.
 *
 * VERIFY: values marked VERIFY are taken from the design mockup
 * (design-reference/homepage-mockup.png), not from a confirmed source.
 * They must be confirmed by Hiền Nương before launch.
 */

import { locales, type Locale } from '../i18n';
import { copy } from './copy';

// The text below comes from src/content/chung/lien-he.md and menu.md.
// Email, phones and the registration are the same in every language (the
// admin keeps them in step); they are read from the Vietnamese block.
type ContactCopy = {
  description: string; address: string[]; locations: { name: string; address: string }[];
  email: string; phone: string; phone2: string;
  business_name: string[]; business_code: string; business_registration: string[]; business_issuer: string;
};
type MenuCopy = { nav: Record<string, string> };
const byLocale = <T>(pick: (lang: Locale) => T) =>
  Object.fromEntries(locales.map((lang) => [lang, pick(lang)])) as Record<Locale, T>;
const contactCopy = (lang: Locale) => copy<ContactCopy>('chung/lien-he', lang);
const navLabel = (key: string) => byLocale((lang) => copy<MenuCopy>('chung/menu', lang).nav[key]);
const shared = contactCopy('vi');
const tel = (display: string) => display.replace(/\s/g, '');

export const site = {
  name: 'Hiền Nương Farm',
  url: 'https://hiennuongfarm.vn',
  description: byLocale((lang) => contactCopy(lang).description),
};

export interface NavItem {
  label: Record<Locale, string>;
  /** Vietnamese path; localize with pageHref(). */
  href: string;
  /** Destination in languages the page is not yet translated into. */
  fallback?: string;
}

// Links point to homepage sections until each secondary page is built.
export const nav: NavItem[] = [
  { label: navLabel('about'), href: '/ve-chung-toi/', fallback: '/#ve-hien-nuong' },
  { label: navLabel('circular'), href: '/nong-nghiep-tuan-hoan/', fallback: '/#tuan-hoan' },
  { label: navLabel('produce'), href: '/san-pham/' },
  { label: navLabel('bayNui'), href: '/#bay-nui' },
  { label: navLabel('press'), href: '/#dau-an' },
  { label: navLabel('partner'), href: '/#hop-tac' },
];

// Footer "Khám phá": a shorter list than the header.
export const footerNav: NavItem[] = [
  nav[0],
  { label: navLabel('products'), href: '/san-pham/' },
  nav[1],
  nav[4],
  // Vietnamese only (viOnlyPaths); hidden in other languages.
  { label: navLabel('play'), href: '/choi-cung-nong-trai/' },
];

// VERIFY: address from the mockup. Email and phone are owner-provided.
// Other languages keep the local place names and add the country.
export const contact = {
  addressLines: byLocale((lang) => contactCopy(lang).address),
  mapUrl: 'https://maps.app.goo.gl/x9ZQNXxzfZaVnP6X8',
  // Owner-provided farm locations, listed in the footer.
  locations: [
    {
      name: byLocale((lang) => contactCopy(lang).locations[0].name),
      address: byLocale((lang) => contactCopy(lang).locations[0].address),
      mapUrl: 'https://maps.app.goo.gl/x9ZQNXxzfZaVnP6X8',
    },
    {
      name: byLocale((lang) => contactCopy(lang).locations[1].name),
      address: byLocale((lang) => contactCopy(lang).locations[1].address),
      mapUrl: 'https://maps.app.goo.gl/kF66YB8ddwbSqQTe8',
    },
  ] satisfies { name: Record<Locale, string>; address: Record<Locale, string>; mapUrl: string }[],
  email: shared.email,
  phone: tel(shared.phone),
  phoneDisplay: shared.phone,
  phone2: tel(shared.phone2),
  phone2Display: shared.phone2,
};

// Owner-provided household business registration, shown as-is in every language.
export const business = {
  name: shared.business_name,
  code: shared.business_code,
  registration: shared.business_registration,
  issuer: shared.business_issuer,
};
