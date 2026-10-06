# hiennuongfarm
Trang trại Hiền Nương

Brand website for Hiền Nương Farm (`hiennuongfarm.vn`). See `CLAUDE.md` for design direction and content rules.

## Development

Static site built with [Astro](https://astro.build) — no UI framework, no CSS framework.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview
```

## Structure

```
src/
  styles/global.css      design tokens, typography, layout primitives, buttons
  layouts/BaseLayout     <head>, header, footer, reveal-on-scroll
  components/            SiteHeader, SiteFooter, Wordmark, Photo, Eyebrow, Arrow
  components/home/       homepage sections
  data/site.ts           navigation and contact details
  pages/index.astro      homepage
```

## Before launch: content to replace or confirm

- **Photography** — every image is a labelled placeholder ("Ảnh tạm") with a brief of the intended shot. Add photos under `public/images/` and pass `src` to the `<Photo>` component.
- **Logo** — the header/footer use a typographic wordmark until the official logo file is supplied.
- **Product descriptions** — shown as "Mô tả sản phẩm đang được cập nhật." in `components/home/Products.astro`.
- **Facts taken from the design mockup, not yet confirmed** (marked `VERIFY` in code):
  - Founding year 2020 and founders' names (`About.astro`)
  - HTX Tà Đảnh as a development partner (`About.astro`)
  - Product names (`Products.astro`)
  - Address and email (`data/site.ts`)
- **Social links** — none added; URLs not yet provided.
