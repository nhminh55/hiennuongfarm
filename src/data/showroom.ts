/**
 * The 12 products shown in the /san-pham/ showroom.
 *
 * Names are owner-supplied (the homepage catalogue); summaries are condensed
 * from the owner product copy in docs/products/. Images are
 * the final showroom scenes supplied in design-reference/12-san-pham-showroom-final;
 * they are visual assets, not
 * evidence. Every other field must come from an original label, document or
 * approved source, cited in its `source`. Leave a field out rather than
 * filling it: empty tabs and sections are hidden. The audit, gaps and
 * proposed (unapproved) content live in docs/PRODUCT_CONTENT_AUDIT.md.
 *
 * A product is selected by its slug: /san-pham/#slug.
 */

import { localizePath, type Locale } from '../i18n';
import { dataFile } from './copy';

/** Text in every site language. */
export type Text = Record<Locale, string>;

/* --------------------------------------------------------------------------
   Source records (edit these)
   -------------------------------------------------------------------------- */

interface SourcedText {
  text: Text;
  /** Where the fact comes from: file path, document number or owner note. */
  source: string;
}

interface RawFact {
  label: Text;
  value: Text;
  source: string;
}

interface RawDocument {
  /** Clear document name. */
  title: Text;
  /** Document type, e.g. test report, product declaration, OCOP certificate. */
  kind: Text;
  issuer?: Text;
  /** Reference / decision number, as printed. */
  reference?: string;
  /** Date as printed (dd/mm/yyyy). */
  date?: string;
  /** What the document covers: the exact product or sample it names. */
  scope?: Text;
  /** Working preview/download link or page section. Omit when none is public. */
  href?: string;
  linkLabel?: Text;
  source: string;
}

interface RawRecipe {
  name: Text;
  ingredients: Text[];
  steps: Text[];
  time?: Text;
  servings?: Text;
  image?: { src: string; width: number; height: number; alt: Text };
  source: string;
}

interface RawReview {
  quote: Text;
  /** Only with the customer's permission to be named. */
  author?: string;
  date?: string;
  sourceName?: Text;
  source: string;
}

interface RawProduct {
  slug: string;
  /** Exact product name. */
  name: Text;
  /** Category / form shown above the name on the stage (verified only). */
  category?: SourcedText;
  /** Short summary under the stage. */
  summary: SourcedText;
  image: {
    /** Approved complete WebP scene under /images/products/showroom/final/. */
    file: string;
    alt: Text;
  };
  /** A dedicated product page, when one exists (Vietnamese path). */
  detail?: string;
  /** Giới thiệu: description, characteristics, ingredient origin. */
  intro?: { paragraphs?: SourcedText[]; facts?: RawFact[] };
  /** Thành phần: ingredients (label wording), proportions, net weight, packaging, variants. */
  composition?: { ingredients?: SourcedText; facts?: RawFact[] };
  /** Cách dùng: preparation, storage, approved recipes. */
  usage?: { preparation?: SourcedText[]; storage?: SourcedText[]; recipes?: RawRecipe[] };
  /** Hồ sơ: product declaration, OCOP, test reports and other documents. */
  records?: RawDocument[];
  /** Nhận xét: authentic customer feedback, with permission. */
  reviews?: RawReview[];
}

// The products, with every text in each language and the source of each
// fact: src/content/san-pham/showroom.md (edited in the admin, /admin).
const raw = dataFile<{ products: RawProduct[] }>('san-pham/showroom').products;

/* --------------------------------------------------------------------------
   What components receive: plain strings in one language
   -------------------------------------------------------------------------- */

export type TabId = 'gioi-thieu' | 'thanh-phan' | 'cach-dung' | 'ho-so' | 'nhan-xet';

/** Tab order; labels live in the components. */
export const tabIds: TabId[] = ['gioi-thieu', 'thanh-phan', 'cach-dung', 'ho-so', 'nhan-xet'];

export interface ShowroomFact { label: string; value: string }

export interface ShowroomDocument {
  title: string;
  kind: string;
  issuer?: string;
  reference?: string;
  date?: string;
  scope?: string;
  href?: string;
  linkLabel?: string;
  /** href leaves the site. */
  external: boolean;
}

export interface ShowroomRecipe {
  name: string;
  ingredients: string[];
  steps: string[];
  time?: string;
  servings?: string;
  image?: { src: string; width: number; height: number; alt: string };
}

export interface ShowroomReview {
  quote: string;
  author?: string;
  date?: string;
  sourceName?: string;
}

export interface ShowroomItem {
  slug: string;
  name: string;
  category?: string;
  summary: string;
  image: {
    src: string;
    thumb: string;
    width: number;
    height: number;
    alt: string;
  };
  /** Localized link to a dedicated product page. */
  detail?: string;
  intro: { paragraphs: string[]; facts: ShowroomFact[] };
  composition?: { ingredients?: string; facts: ShowroomFact[] };
  usage?: { preparation: string[]; storage: string[]; recipes: ShowroomRecipe[] };
  records?: ShowroomDocument[];
  reviews?: ShowroomReview[];
  /** Tabs with content, in order. Giới thiệu is always present. */
  tabs: TabId[];
}

const facts = (list: RawFact[] | undefined, lang: Locale): ShowroomFact[] =>
  (list ?? []).map((f) => ({ label: f.label[lang], value: f.value[lang] }));

const texts = (list: SourcedText[] | undefined, lang: Locale) => (list ?? []).map((p) => p.text[lang]);

const localizeHref = (href: string, lang: Locale) => (href.startsWith('/') ? localizePath(href, lang) : href);

/** The showroom products in a language. */
/** The first SHOWROOM_FRESH products are fresh mushrooms; the rest are made from them. */
export const SHOWROOM_FRESH = 4;
/** Hash ids of the two showroom groups: /san-pham/#nam-tuoi, /san-pham/#san-pham-che-bien. */
export const showroomGroupIds = ['nam-tuoi', 'san-pham-che-bien'] as const;

export const showroomProducts = (lang: Locale): ShowroomItem[] =>
  raw.map((p) => {
    const src = `/images/products/showroom/final/${p.image.file}`;
    const composition = p.composition && (p.composition.ingredients || p.composition.facts?.length)
      ? { ingredients: p.composition.ingredients?.text[lang], facts: facts(p.composition.facts, lang) }
      : undefined;
    const usage = p.usage && (p.usage.preparation?.length || p.usage.storage?.length || p.usage.recipes?.length)
      ? {
          preparation: texts(p.usage.preparation, lang),
          storage: texts(p.usage.storage, lang),
          recipes: (p.usage.recipes ?? []).map((r) => ({
            name: r.name[lang],
            ingredients: r.ingredients.map((x) => x[lang]),
            steps: r.steps.map((x) => x[lang]),
            time: r.time?.[lang],
            servings: r.servings?.[lang],
            image: r.image && { ...r.image, alt: r.image.alt[lang] },
          })),
        }
      : undefined;
    const records = p.records?.length
      ? p.records.map((d) => ({
          title: d.title[lang],
          kind: d.kind[lang],
          issuer: d.issuer?.[lang],
          reference: d.reference,
          date: d.date,
          scope: d.scope?.[lang],
          href: d.href && localizeHref(d.href, lang),
          linkLabel: d.linkLabel?.[lang],
          external: !!d.href && !d.href.startsWith('/'),
        }))
      : undefined;
    const reviews = p.reviews?.length
      ? p.reviews.map((r) => ({ quote: r.quote[lang], author: r.author, date: r.date, sourceName: r.sourceName?.[lang] }))
      : undefined;

    const tabs: TabId[] = ['gioi-thieu'];
    if (composition) tabs.push('thanh-phan');
    if (usage) tabs.push('cach-dung');
    if (records) tabs.push('ho-so');
    if (reviews) tabs.push('nhan-xet');

    return {
      slug: p.slug,
      name: p.name[lang],
      category: p.category?.text[lang],
      summary: p.summary.text[lang],
      image: {
        src,
        thumb: `/images/products/studio/${p.slug}-160.webp`,
        width: 1536,
        height: 864,
        alt: p.image.alt[lang],
      },
      detail: p.detail && localizePath(p.detail, lang),
      intro: { paragraphs: texts(p.intro?.paragraphs, lang), facts: facts(p.intro?.facts, lang) },
      composition,
      usage,
      records,
      reviews,
      tabs,
    };
  });

/** Link that opens a product in the showroom. */
export const showroomHref = (slug: string, lang: Locale) => localizePath(`/san-pham/#${slug}`, lang);
