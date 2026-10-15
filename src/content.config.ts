/**
 * Content collections. Page copy (src/content/<page>/*.md) is read by
 * src/data/copy.ts; only the articles of Chuyện nhà Nấm are a collection.
 *
 * Chuyện nhà Nấm: one Markdown file per article in src/content/chuyen-nha-nam/,
 * the file name is the address (/chuyen-nha-nam/<file-name>/). Photos sit in
 * src/assets/chuyen-nha-nam/ and are resized at build time. `draft: true`
 * keeps an article off the built site, the sitemap and search; drafts show
 * (marked) on the dev server only. Categories: src/data/chuyen-nha-nam.ts.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const chuyenNhaNam = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/chuyen-nha-nam' }),
  schema: ({ image }) => {
    const photo = z.object({
      src: image(),
      alt: z.string(),
      caption: z.string().optional(),
      /** Shown as "Ảnh: <credit>" under the photo; the outlet for press photos. */
      credit: z.string().optional(),
      /** CSS object-position for the crop in the listing, e.g. "50% 30%". */
      position: z.string().optional(),
    });
    return z.object({
      title: z.string(),
      /** One or two sentences under the title and in the listing. */
      excerpt: z.string(),
      category: z.enum(['hieu-ve-nam', 'bep-nha-nam', 'tu-dat-den-nam']),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      cover: photo.optional(),
      /** The article opens the first listing page. The newest featured one wins. */
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
      /** Where the facts in the article come from (not shown on the page). */
      sources: z.array(z.string()).default([]),
      /** Search-engine description; the excerpt otherwise. */
      description: z.string().optional(),
      /** <title> and share title; the title otherwise. */
      seoTitle: z.string().optional(),
      /** Byline in the structured data; NƯƠNG FARM by default. */
      author: z.string().optional(),
    });
  },
});

export const collections = { 'chuyen-nha-nam': chuyenNhaNam };
