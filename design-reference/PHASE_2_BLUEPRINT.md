# HIỀN NƯƠNG FARM — PHASE 2 BLUEPRINT

> Implementation blueprint for secondary pages.
> Phase 2 begins only after the homepage Photography Pass and production-build verification are approved.
> This document defines structure and design intent; factual copy must still follow `CONTENT_EVIDENCE_BANK.md`.

## 1. Phase 2 objective

Extend the approved homepage into a coherent corporate website without redesigning the homepage or turning the brand into a generic e-commerce site.

The site should continue the approved direction:

**Contemporary Vietnamese Agricultural Editorial**

Core qualities:
- authentic
- calm
- premium
- agricultural rather than “wellness supplement”
- rooted in Bảy Núi / An Giang
- photography-led
- restrained motion
- evidence-aware

Do not introduce a new visual language for secondary pages.

---

## 2. Proposed sitemap

```text
/
├── /ve-hien-nuong/
├── /nong-nghiep-tuan-hoan/
├── /san-pham/
│   ├── /nam-moi-den/
│   ├── /nam-linh-chi/
│   ├── /dong-trung-ha-thao/
│   └── /nam-bao-ngu/
├── /cau-chuyen/
├── /hop-tac/
└── /lien-he/
```

Vietnamese slugs are acceptable if the current project convention supports them consistently. Do not mix URL naming conventions.

### Navigation

Primary:
- Trang chủ
- Về Hiền Nương
- Nông nghiệp tuần hoàn
- Sản phẩm
- Câu chuyện
- Hợp tác
- Liên hệ

Do not add a Shop/Cart navigation item in Phase 2.

---

## 3. Build order

Implement Phase 2 in this order:

### 2A — Shared secondary-page foundation
Create reusable secondary-page shell and common components.

### 2B — Product system
Build `/san-pham/` and one canonical product detail page: `/san-pham/nam-moi-den/`.

After visual approval, reuse that system for the other three product pages.

### 2C — Brand/story pages
Build:
- Về Hiền Nương
- Nông nghiệp tuần hoàn
- Câu chuyện

### 2D — Business/contact pages
Build:
- Hợp tác
- Liên hệ

Do not build all pages simultaneously before the canonical product page has been reviewed.

---

## 4. Shared design system

Reuse the homepage tokens and components.

Do not create:
- a second color palette
- a new typography system
- a separate card language
- gradient-heavy page heroes
- generic SaaS page layouts
- oversized pill components
- glassmorphism
- decorative icon grids

Secondary pages should feel slightly more editorial and content-focused than the homepage.

### Shared page anatomy

Most secondary pages should follow:

1. Global header
2. Editorial page hero
3. Main narrative/content
4. Contextual visual section
5. Supporting evidence/process/content
6. Relevant next-step CTA
7. Global footer

Avoid mechanically repeating the same section pattern on every page.

---

## 5. Product index — `/san-pham/`

### Purpose

Present Hiền Nương as an agricultural producer with four primary mushroom categories.

### Recommended structure

1. Editorial hero
   - eyebrow: SẢN VẬT TỪ TRANG TRẠI
   - restrained title
   - short introduction

2. Four product families
   - Nấm mối đen
   - Nấm linh chi
   - Đông trùng hạ thảo
   - Nấm bào ngư

3. Production philosophy
   - local agricultural materials
   - controlled cultivation
   - circular-production context

4. CTA
   - cooperation/contact rather than “Buy now”

### Visual treatment

Use large photography and editorial image/text pairings rather than four identical e-commerce cards.

No:
- prices
- ratings
- shopping cart
- discount badges
- fake inventory
- health-benefit badges

---

## 6. Canonical product detail template

First implementation target:

`/san-pham/nam-moi-den/`

The visual mockup generated during planning is a COMPOSITION REFERENCE ONLY.
Never copy factual values, invented imagery, labels, or laboratory numbers from the mockup.

### Section A — Product hero

Desktop:
- immersive real product/farm image
- product name
- short provenance statement
- one concise paragraph
- CTA: “Tìm hiểu quy trình”
- secondary CTA: “Liên hệ hợp tác”

Mobile:
- preserve product subject in crop
- text must remain readable without excessive overlay darkness

Avoid turning the hero into a product-sales banner.

### Section B — Introduction

Explain:
- what the product category is
- its place among Hiền Nương’s four mushroom lines
- connection to local cultivation

Use one strong supporting image.

Do not add unsupported nutritional/medical claims.

### Section C — Product principles

Use 3–4 restrained facts, preferably text-led rather than icon-heavy.

Potential themes:
- local agricultural inputs
- controlled cultivation
- circular-production context
- post-harvest reuse

Every statement must be supported by the Evidence Bank.

### Section D — Cultivation/process story

Show the real production process as an editorial sequence.

Potential sequence:
1. Chuẩn bị nguyên liệu
2. Chuẩn bị giá thể / nuôi trồng
3. Chăm sóc / kiểm soát môi trường
4. Thu hoạch
5. Tái sử dụng phụ phẩm

The exact number and labels must follow verified source material and actual available photography.

Do not invent technical parameters, temperatures, durations, sterilisation standards, or yields.

### Section E — Product photography

A compact editorial gallery using authentic farm/video imagery.

Purpose:
- show real cultivation
- show harvest/product texture
- show people/process where appropriate

Avoid a generic carousel if a static editorial grid communicates the story better.

### Section F — Laboratory evidence

Heading:

**Kết quả kiểm nghiệm mẫu**

This section must be visually quiet and evidence-led.

It should clearly separate:
- product marketing copy
from
- sample-specific laboratory results

Required metadata when available:
- sample name
- testing organisation
- testing date
- report number

Required disclaimer:

> Kết quả trên áp dụng cho mẫu thử được nêu trong báo cáo và không được hiểu là thông số cố định cho mọi lô sản phẩm.

Do not say:
- “không chứa kim loại nặng”
- “100% an toàn”
- “đạt mọi tiêu chuẩn”
- “được VietLabs chứng nhận”
unless a source explicitly supports the exact statement.

VietLabs performed testing; do not automatically describe a test report as a product certification.

### Section G — Related products

Show the other three mushroom categories with restrained links.

Do not create recommendation algorithms or “customers also bought”.

### Section H — Collaboration CTA

Use the existing homepage business-oriented tone.

Possible intent:
- distribution
- sourcing
- product cooperation
- agricultural collaboration

Do not invent current partners.

---

## 7. Laboratory data strategy by product

### Nấm mối / Nấm mối đen

Evidence available:
- 2023 Nấm mối microbiological sample report
- photographed 2024 Nấm mối đen sấy report

The 2024 photographed report requires transcription verification before detailed publication.

Do not merge 2023 and 2024 results into one apparent test.

### Nấm linh chi

2023 sample evidence supports presentation of:
- microbiological results
- Pb: KPH/ND for tested sample
- Cd: KPH/ND for tested sample
- Polysaccharides: 6.60 mg/g
- Triterpen: 6.57 mg/g

Always identify this as the result of the tested sample.

### Đông trùng hạ thảo

2023 sample evidence supports presentation of:
- microbiological results
- Pb: KPH/ND for tested sample
- Cd: KPH/ND for tested sample
- Adenosine: 3.90 mg/100g
- Cordycepin: 22.4 mg/100g

Do not convert these measurements into therapeutic claims.

### Nấm bào ngư

No equivalent VietLabs report is currently approved in the Evidence Bank.

Therefore:
- do not fabricate a laboratory section;
- either omit it or use a neutral “Thông tin kiểm nghiệm đang được cập nhật” only if the business explicitly wants that wording.

Prefer omission over a fake placeholder on the public site.

---

## 8. Về Hiền Nương — `/ve-hien-nuong/`

### Goal

Tell the human and regional story without turning the page into a corporate timeline full of unverified milestones.

### Structure

1. Editorial hero
2. Origin in Bảy Núi / Tà Đảnh context
3. Human story
4. From local resources to mushroom cultivation
5. Relationship with circular agriculture
6. People/community imagery
7. Selected recognition only if verified/current
8. CTA to Circular Agriculture / Cooperation

### Important identity caution

Until legal/business identity is confirmed, do not collapse:
- Hiền Nương Farm
- Nương Farm
- Nàng Nương
- HTX Nông nghiệp Tà Đảnh

into a single legal entity in copy.

Avoid exact “founded in 2020 by X and Y” wording while marked VERIFY.

---

## 9. Nông nghiệp tuần hoàn — `/nong-nghiep-tuan-hoan/`

This should become one of the strongest storytelling pages.

### Core narrative

```text
Bảy Núi
→ nguyên liệu / phụ phẩm nông nghiệp
→ giá thể & nuôi trồng
→ nấm
→ chế biến / thu hoạch
→ phụ phẩm sau sản xuất
→ tái sử dụng
→ trở lại nông nghiệp
```

### Structure

1. Landscape-led hero
2. Why circular production matters here
3. Inputs / local agricultural materials
4. Mushroom cultivation
5. Post-harvest reuse
6. People + local livelihoods
7. Full-cycle visual summary
8. Product / cooperation CTA

Use actual farm/process imagery.

Do not use a generic sustainability infographic with invented percentages.

Avoid absolute “zero waste” claims.

---

## 10. Câu chuyện — `/cau-chuyen/`

Phase 2 should create the page architecture, not invent a fake editorial archive.

### Initial approach

Use this as a story/journal landing page that can grow later.

Potential categories:
- Từ trang trại
- Con người
- Mùa vụ
- Sản vật
- Bảy Núi

Only publish stories for which real source material exists.

Do not generate fake dates, authors, interviews or quotations.

If there are too few real stories at launch, a smaller curated page is better than a fake full news portal.

---

## 11. Hợp tác — `/hop-tac/`

### Purpose

Business-oriented contact page without pretending Hiền Nương has partnerships that are not verified.

Potential audiences:
- distributors
- retailers
- food/agricultural partners
- product-development collaborators

### Structure

1. Strong short hero
2. What Hiền Nương can discuss
3. Product categories
4. Production/circular context
5. Contact CTA/form

Do not publish:
- MOQ
- capacity
- wholesale price
- current distributors
unless confirmed.

---

## 12. Liên hệ — `/lien-he/`

Keep simple.

Potential fields:
- Họ và tên
- Đơn vị
- Email / điện thoại
- Nội dung

Only show address, email, phone and map after direct confirmation.

Do not publish a `VERIFY` address simply because it appears in an old page or a lab report.

If contact data remains unresolved at implementation time, use a clearly marked development placeholder and prevent misleading production publication.

---

## 13. Photography rules

Priority:
1. authentic supplied Hiền Nương photography
2. authentic frames from supplied Hiền Nương video
3. intentional placeholder during development

Do not use:
- AI-generated production photography
- generic stock
- hotlinked press photography
- watermarked imagery

Video-derived imagery is acceptable for the current build but is limited by 720p source quality.

Do not upscale aggressively.

Use deliberate crop/object-position at all supported widths.

---

## 14. Responsive requirements

Mandatory visual QA widths:

- 1440
- 1280
- 1024
- 768
- 390
- 375
- 320

Every UI-changing task must retain final review screenshots at minimum:

- desktop 1440
- mobile 390

under:

`design-reference/screenshots/`

Final screenshots must come from the final tested production preview and must not be deleted after QA.

---

## 15. Accessibility & performance

Maintain:
- semantic heading hierarchy
- keyboard navigation
- visible focus states
- sufficient contrast
- meaningful alt text
- reduced-motion support where applicable
- explicit image dimensions/aspect ratios
- lazy loading below the fold
- no unnecessary JavaScript
- no layout shift caused by images

Do not describe marketing claims in alt text. Describe what is visibly present.

---

## 16. Evidence hierarchy

When writing website content, use this order:

1. direct current information supplied/confirmed by Hiền Nương
2. original documents/reports supplied by the business
3. official/government sources
4. reputable press reporting
5. video narration / visual evidence
6. design placeholder copy

If sources conflict:
- do not silently choose one;
- preserve the conflict internally;
- use the least specific safe wording;
- mark the exact claim VERIFY if necessary.

---

## 17. Publication safety rules

Never invent:
- certifications
- laboratory conclusions
- partners
- awards
- testimonials
- production capacity
- revenue
- employee counts
- health benefits
- legal identity
- founder information
- addresses/contact details

Do not convert time-bound reporting into permanent present-tense company facts.

Do not expose internal quotations, bank/payment details or unnecessary personal data from documents.

---

## 18. Phase 2 review gates

### Gate A
Shared secondary-page system + Product Index + Nấm Mối Đen detail.

Human visual review required.

### Gate B
Remaining three product pages.

Human content/evidence review required.

### Gate C
About + Circular Agriculture + Story.

Human visual/content review required.

### Gate D
Cooperation + Contact + whole-site responsive consistency.

Final QA required.

Do not skip gates by implementing the entire site in one uncontrolled pass.

---

## 19. Definition of done for each page

A page is not complete merely because it builds.

It must:
- follow the approved visual system
- use only supported content
- contain no unresolved public-facing VERIFY claim
- work at all seven target widths
- have no horizontal overflow
- have no console errors or failed assets
- pass keyboard/basic accessibility checks
- use optimized authentic imagery
- have final 1440 + 390 screenshots retained
- be reviewed before moving to the next major gate

---

## 20. Phase 2 starting instruction

After the homepage is frozen, start only with **Gate A**.

Do not implement all Phase 2 pages at once.

First build:
1. shared secondary-page foundation
2. `/san-pham/`
3. `/san-pham/nam-moi-den/`

Then stop, capture screenshots, report results and wait for review.

**Build less, but build it exceptionally well.**
