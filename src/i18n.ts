/**
 * Site languages. Vietnamese is the default and lives at the root ("/");
 * the others are served under a prefix ("/en/", "/zh/") by the routes in
 * src/pages/[lang]/, which render the same pages. Components read the
 * language from the page URL and pick their copy from a { vi, en, zh } map.
 */

export const locales = ['vi', 'en', 'zh'] as const;
export type Locale = (typeof locales)[number];

/** Languages served under a path prefix. */
export const prefixedLocales = ['en', 'zh'] as const;

export const languages: Record<Locale, { label: string; name: string; htmlLang: string; ogLocale: string }> = {
  vi: { label: 'VI', name: 'Tiếng Việt', htmlLang: 'vi', ogLocale: 'vi_VN' },
  en: { label: 'EN', name: 'English', htmlLang: 'en', ogLocale: 'en_US' },
  zh: { label: 'CH', name: '中文', htmlLang: 'zh-Hans', ogLocale: 'zh_CN' },
};

export const getLocale = (url: URL): Locale => {
  const first = url.pathname.split('/')[1];
  return (prefixedLocales as readonly string[]).includes(first) ? (first as Locale) : 'vi';
};

/** A path without its language prefix: "/en/san-pham/" → "/san-pham/". */
export const stripLocale = (pathname: string) => pathname.replace(/^\/(en|zh)(?=\/|$)/, '') || '/';

/** A site path in the given language; in-page anchors and external links are unchanged. */
export const localizePath = (href: string, locale: Locale) =>
  locale === 'vi' || !href.startsWith('/') ? href : `/${locale}${href}`;

/** getStaticPaths for the src/pages/[lang]/ routes. */
export const langStaticPaths = () => prefixedLocales.map((lang) => ({ params: { lang } }));

/**
 * Published pages with Vietnamese copy only: no /en/ or /zh/ route yet.
 * The /dau-an/ pages are placeholders (src/data/drafts.ts).
 */
export const viOnlyPaths = ['/hop-tac/', '/dau-an/', '/dau-an/giai-thuong/', '/dau-an/chung-nhan/', '/dau-an/bao-chi/', '/choi-cung-nong-trai/', '/choi-cung-nong-trai/mot-vong-nong-trai/', '/choi-cung-nong-trai/hom-nay-an-nam-gi/', '/choi-cung-nong-trai/ban-hieu-nam-toi-dau/'];

/** Whether a page (a path without its language prefix) exists in every language. */
export const isTranslated = (path: string) => !viOnlyPaths.includes(path.replace(/#.*/, ''));

/**
 * A link to a page in the given language. Until a Vietnamese-only page is
 * translated, the other languages link to `fallback` (its homepage section).
 */
export const pageHref = (href: string, locale: Locale, fallback?: string) =>
  localizePath(locale !== 'vi' && fallback && !isTranslated(href) ? fallback : href, locale);
