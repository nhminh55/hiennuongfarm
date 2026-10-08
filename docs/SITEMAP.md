# SITEMAP — Hiền Nương Farm

Updated: 2026-10-08
Primary domain: https://hiennuongfarm.vn
Purpose: reference for page structure, routes, anchors, and navigation.
Instructions are in English; Vietnamese UI labels and URL slugs are preserved.

## 1. Scope and status

This document records the agreed structure, not a repository audit.
Homepage anchors were verified against the public website DOM on 2026-10-08. Check the repository for unpublished changes.
Child-page routes and anchors remain proposed unless marked verified. Prefer equivalent existing routes; do not casually change published URLs.
Status vocabulary: Needs verification / Planned / In progress / Implemented / Published. Implemented does not mean Published.

## 2. Page structure

| Level | Page | Proposed route | Status |
| --- | --- | --- | --- |
| 0 | Homepage | / | Published — verified |
| 1 | Về Hiền Nương | /ve-chung-toi/ | Published — Vietnamese only (2026-10-08) |
| 1 | Nông nghiệp tuần hoàn | /nong-nghiep-tuan-hoan/ | Implemented — Vietnamese only (2026-10-08) |
| 1 | Sản phẩm | /san-pham/ | Published — verified through navbar |
| 2 | Individual product details | /san-pham/{slug}/ | Planned — check catalogue and existing routes |
| 1 | Dấu ấn | /dau-an/ | Needs verification |
| 2 | Giải thưởng & ghi nhận | /dau-an/giai-thuong/ | Needs verification |
| 2 | Chứng nhận sản phẩm | /dau-an/chung-nhan/ | Needs verification |
| 2 | Báo chí & truyền hình | /dau-an/bao-chi/ | Needs verification |
| 1 | Hợp tác & liên hệ | /hop-tac/ | Needs verification |

Bảy Núi is a section within About, not a separate page at this stage.
About, Circular Agriculture, and Cooperation each use one page with section anchors.
Dấu ấn has one overview and three child pages.
Products use a catalogue with planned individual detail pages. Do not generate 12 slugs without checking actual product data and existing routes.

## 3. Homepage: verified navigation

Preserve homepage content, section order, and existing links unless a separate change is requested or specified below.

| Exact navbar label | Homepage section ID | Current live navbar destination |
| --- | --- | --- |
| Về Hiền Nương | ve-hien-nuong | /#ve-hien-nuong |
| Nông nghiệp tuần hoàn | tuan-hoan | /#tuan-hoan |
| Sản phẩm | san-vat | /san-pham/ |
| Dấu ấn | dau-an | /#dau-an |
| Hợp tác | hop-tac | /#hop-tac |

Additional verified anchors: #top (back to top), #main (skip to main content).

Vùng Bảy Núi is no longer a navbar item (changed 2026-10-08). The homepage section keeps its position and ID #bay-nui, has no section number, and stays reachable from the hero section navigation. Homepage section numbers: 01 Về Hiền Nương, 02 Nông nghiệp tuần hoàn, 03 Sản phẩm, 04 Dấu ấn, 05 Hợp tác.
Its “Câu chuyện Hiền Nương” link targets the story's Bảy Núi chapter, /ve-chung-toi/#bay-nui; in English and Chinese it targets /#ve-hien-nuong.

The live Sản phẩm navbar link opens /san-pham/, while hero section navigation targets #san-vat. Under the agreed new behavior, the navbar label will target #san-vat; its “Tất cả sản phẩm” dropdown link will open /san-pham/. This is an intentional planned change, not current behavior.
Keep homepage ID #san-vat; do not rename it to #san-pham.
All child-page anchors below remain proposed and unverified.

| Homepage section | Proposed deeper destination |
| --- | --- |
| Về Hiền Nương | /ve-chung-toi/ |
| Nông nghiệp tuần hoàn | /nong-nghiep-tuan-hoan/ |
| Sản phẩm | /san-pham/ or an available product detail page |
| Vùng Bảy Núi (section only, not in the navbar) | /ve-chung-toi/#bay-nui |
| Dấu ấn | /dau-an/ |
| Hợp tác | /hop-tac/ |

## 4. Navbar and dropdowns: agreed behavior

Keep the exact five navbar labels, numbered 01–05, and their order from section 3.
Do not rename “Về Hiền Nương” to “Về chúng tôi” or shorten “Nông nghiệp tuần hoàn” to “Tuần hoàn”.

| Navbar item | Dropdown label | Proposed destination |
| --- | --- | --- |
| Về Hiền Nương | Câu chuyện Hiền Nương | /ve-chung-toi/ |
| Về Hiền Nương | Người sáng lập | /ve-chung-toi/#cau-chuyen |
| Về Hiền Nương | Vùng Bảy Núi | /ve-chung-toi/#bay-nui |
| Nông nghiệp tuần hoàn | Tổng quan mô hình | /nong-nghiep-tuan-hoan/ |
| Nông nghiệp tuần hoàn | Vòng tuần hoàn tại farm | /nong-nghiep-tuan-hoan/#vong-tuan-hoan |
| Nông nghiệp tuần hoàn | Năng lượng mặt trời | /nong-nghiep-tuan-hoan/#nang-luong-mat-troi |
| Sản phẩm | Tất cả sản phẩm | /san-pham/ |
| Dấu ấn | Tổng quan Dấu ấn | /dau-an/ |
| Dấu ấn | Giải thưởng & ghi nhận | /dau-an/giai-thuong/ |
| Dấu ấn | Chứng nhận sản phẩm | /dau-an/chung-nhan/ |
| Dấu ấn | Báo chí & truyền hình | /dau-an/bao-chi/ |
| Hợp tác | Thông tin hợp tác | /hop-tac/ |
| Hợp tác | Liên hệ | /hop-tac/#lien-he |

- Clicking a navbar label navigates to its homepage anchor. From child pages use the corresponding /#ve-hien-nuong, /#tuan-hoan, /#san-vat, /#dau-an, or /#hop-tac.
- Until the dropdowns are published, the Vietnamese “Về Hiền Nương” label opens /ve-chung-toi/ directly (English and Chinese: /#ve-hien-nuong).
- On desktop with a mouse, hover opens the dropdown.
- A separate chevron button toggles each dropdown on desktop and mobile. Keep this button separate from the anchor link.
- On mobile, clicking a label closes navigation and goes to its homepage section; clicking a chevron only toggles its submenu.
- Dropdown links go directly to destination pages or sections; the logo links to /.
- Do not add a separate “Khám phá” menu. Bảy Núi appears once, as the About dropdown item “Vùng Bảy Núi”.
- Dropdowns do not need equal link counts. Products currently only has “Tất cả sản phẩm”.
- Show a chevron only when at least one dropdown destination is available.
- Do not enable links to missing pages or anchors, or create empty pages to fill navigation.
- Moving the pointer into a dropdown must not close it.
- Support Tab, Enter/Space on buttons, aria-expanded, aria-controls, Escape, outside-click dismissal, and visible focus.
- Ordinary navigation link lists are sufficient. Do not use role="menu" without its full keyboard interaction model.

## 5. Page content

### Về Hiền Nương — /ve-chung-toi/

Purpose: brand origin, founders, and the region.

Published (Vietnamese only; copy: docs/HIEN_NUONG_ABOUT_VI.md). Six chapters, one sticky stage on wide screens:

- 01 Câu chuyện: #cau-chuyen — founders, 2020.
- 02 Bảy Núi: #bay-nui — the region: mountains, rice fields, palmyra palms, Khmer culture.
- 03 Hai cơ sở: #hai-co-so — Thới Sơn and Tà Đảnh, more than 4 ha.
- 04 Năng lượng: #nang-luong — solar electricity for mushroom growing.
- 05 Tuần hoàn: #tuan-hoan — by-products, substrate, earthworm feed; links to Circular Agriculture.
- 06 Con người: #con-nguoi — local workers.
- Closing: contact link (/#hop-tac until /hop-tac/ is published).

User-confirmed facts: established in 2020; chị Châu Thị Nương và anh Trần Phương Hiền are married and co-founded the farm. Preserve this preferred name order and Vietnamese wording.
Do not create separate pages for each About section at this stage.

### Nông nghiệp tuần hoàn — /nong-nghiep-tuan-hoan/

Purpose: explain actual operations and relationships between stages.

Implemented (Vietnamese only):

- Opening: “Tiếp nối giá trị từ phụ phẩm.”
- Farm circular process: #vong-tuan-hoan — an interactive wheel of five steps (01 Phụ phẩm nông nghiệp, 02 Chuẩn bị giá thể, 03 Nuôi trồng & thu hoạch, 04 Giá thể nuôi trùn quế, 05 Phân trùn bón cây). Processing is not a cycle step; step 03 links to Products.
- Products: brief introduction linking to /san-pham/.
- Solar energy: #nang-luong-mat-troi — copy from docs/HIEN_NUONG_ABOUT_VI.md §04.
- Brand film (plays only on request).
- Closing: cooperation link (/#hop-tac until /hop-tac/ is published).

Header, footer, homepage and story-page links open it in Vietnamese; English and Chinese keep /#tuan-hoan.

The user confirmed 100% solar energy use and ownership of the system by chị Nương. Clarify which facility this applies to; do not automatically extend the claim to both.
Do not invent process stages, environmental metrics, or savings without evidence.

### Sản phẩm — /san-pham/

Purpose: introduce the catalogue and support enquiries.

- Consistent square images using the 12 products under review.
- Group products using actual data; do not invent unapproved categories.
- Link to detail pages when available.
- Provide enquiry/contact actions; shopping cart, checkout, and purchasing are outside current scope.
- Proposed placement for 1000036148.mp4: after the product grid, before contact, titled “Từ nhà nấm đến ly trà”. This is a placement proposal, not approved implementation.
- Use a portrait video with a poster and click-to-play. Preserve the existing homepage About brand film.

Product details — /san-pham/{slug}/:

- Name, photographs, description, specifications, usage, and storage information where supplied.
- Applicable product-specific certifications.
- An enquiry action identifying the product.
- Links back to the catalogue and related products.
- Do not invent health benefits, prices, stock, or certifications.

### Dấu ấn — /dau-an/

Purpose: curate significant milestones and evidence with links to three child pages.
The overview needs its own content: a featured milestone, selected milestones, and three entry points. Do not make it just three buttons.

Giải thưởng & ghi nhận:

- Recognition name, year, awarding organization, photograph, and source.
- Distinguish recognition of individuals from recognition of the farm.

Chứng nhận sản phẩm:

- Certification name, applicable product, issuer, and validity where available.
- Do not assume a certification applies to the entire catalogue.

Báo chí & truyền hình:

- Article/report title, publisher, date, attribution, and original link.
- Featured reports/videos may have a dedicated section on the same page.
- Do not create one internal page per external article at this stage.
- Read the current Evidence Bank before using material. Check the relevance of the user-supplied VTV article/video before featuring it.

### Hợp tác & liên hệ — /hop-tac/

Purpose: explain confirmed cooperation options and direct visitors to the appropriate facility.

Planned sections:

- Actual cooperation information.
- Facilities: #co-so.
- Contact: #lien-he.

Facilities:

- Thới Sơn.
- Tri Tôn.
- Each needs an exact address, confirmed function, and “Chỉ đường” link.
- Do not invent visitor access, tours, or opening hours.
- Proposed layout: one map with two facility selectors rather than two large simultaneous maps.
- Confirm pins and current administrative addresses before publishing.
- Keep the business registration address in Tà Đảnh separate from the facility addresses.

## 6. Footer and internal links

- Provide direct footer links to available main pages.
- Distinguish map links for the facilities using place names rather than “Facility 1/2”.
- Use confirmed legal information; distinguish the registration address from farm locations.
- Use appropriate breadcrumbs, such as Trang chủ > Dấu ấn > Báo chí & truyền hình, or Trang chủ > Sản phẩm > Product name.
- Product enquiry links should use /hop-tac/#lien-he when available, or existing contact channels.
- Do not put every internal section link in the footer.

## 7. sitemap.xml

After checking the stack, create/update the XML sitemap using its appropriate mechanism.

- Include only published, indexable canonical page URLs.
- Use https://hiennuongfarm.vn.
- Exclude fragment URLs, planned pages, drafts, and external map URLs.
- Exclude duplicate versions of the same content on secondary domains.
- lastmod must reflect actual content changes, not automatically change on every build.

## 8. Claude workflow

1. Read repository instructions; reconcile routes, section IDs, product data, and implementation status.
2. Update this document with actual routes/IDs; keep planned items clearly identified.
3. Update this sitemap and navigation configuration in the same iteration when adding/changing pages.
4. Check routes, fragments, dropdowns, keyboard navigation, and mobile behavior.
5. Update sitemap.xml when public URLs change.
6. Commit and push after checks pass, following repository instructions.
7. Never stop or restart the user-owned development server on port 4321.

Graphify installation has not been requested. Evaluate it after inspecting the code structure; this sitemap does not depend on Graphify.
