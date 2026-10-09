# Product Content Audit — /san-pham/ showroom

Date: 2026-10-09 · Data file: `src/data/showroom.ts` (`raw` array)

Purpose: record, for each of the 12 showroom products, what is verified and published, where it comes from, and what the owner still needs to supply or confirm. Nothing here is published unless the row says **Published**.

## Evidence rules applied

- Evidence bank: `docs/HIEN_NUONG_PRESS_EVIDENCE_BANK.md` is the designated bank (replaces the never-present `design-reference/CONTENT_EVIDENCE_BANK.md`). It lists press links only, with no product specs. Older code comments in `src/data/products.ts` and `src/data/lab-reports.ts` still cite “CONTENT_EVIDENCE_BANK.md §3/§4”. Those citations now point to a file that does not exist.
- Authoritative sources are original documents and labels. The studio images (`public/images/products/studio/`) are AI-edited illustrations and are **not evidence**. Their label text is distorted, and some badges (OCOP, “100% organic”, “KLT: 200g”) are reproduced from old packaging.
- Original packaging photos (NGUON_ANH_GOC.csv, Mekong Sen URLs) belong to the **old catalogue**. Their back and side text is not legible, and several fronts look like rendered mock-ups (garbled text on 09, 10 and 12). No ingredient, usage or storage wording could be read from them, so nothing was taken from these photos.
- Mekong Sen catalogue pages (`mekongsen.vn/<id>`) are a **third-party listing**, not a label or a document. Their spec, usage and storage text is recorded below as “Found – not published”. They also carry health claims and first-name testimonials, none of which are used.
- Test reports are sample-specific. Each one is attached only to the product its sample name matches, and the matching is explained in the Documents inventory. Only metadata is shown (lab, number, date of issue, sample). Results stay on `/san-pham/nam-moi-den/#kiem-nghiem` (VLAB-2309-0307/1 only).
- OCOP is published only from a certificate or decision. No such document was found, so OCOP is not published for any product.
- Sources used in showroom.ts: owner homepage copy `src/components/home/Products.astro` (names, descriptions, intro line 40), approved `src/pages/san-pham/nam-moi-den.astro`, approved notes in `src/data/products.ts`, and the declaration 02/TADANH/2024.

### Source keys used in the tables

| Key | Source |
|---|---|
| HOME | `src/components/home/Products.astro` owner names and descriptions; intro line 40 (four lines grown on the farm, plus eight products made from them) |
| MD | `src/pages/san-pham/nam-moi-den.astro` lines 47 and 50 (four main lines grown in Bảy Núi, An Giang; facts) |
| PN | `src/data/products.ts` notes (lines 33, 45, 56, 67) |
| TCB | Bản tự công bố sản phẩm **02/TADANH/2024**, HTX Nông nghiệp Tà Đảnh, 30/09/2024, product “Nấm mối đen sấy”; Annex 1 (label mock-up) and Annex 2 (label content) show **Nấm Mối Đen Sấy Thăng Hoa**. Public PDF: https://mekongsen.vn/datafiles/1950631709934493696/2025-08/74586519-TU%20CONG%20BO%20SAN%20PHAM.pdf |
| MS-nn | Mekong Sen catalogue page for studio image nn (URLs in `design-reference/HIEN_NUONG_12_STUDIO_WEBP/NGUON_ANH_GOC.csv`) |
| PKG-nn | Original packaging photo nn (image_url in NGUON_ANH_GOC.csv) |
| BAG | Báo An Giang, “Tri Tôn công nhận thêm 4 sản phẩm đạt tiêu chuẩn OCOP 3 sao”, 26/04/2025 (press only) |
| DV | Dân Việt photo caption (press-photos IMAGE_SOURCES.csv, E018): “Nấm linh chi tai to, nấm đông trùng hạ thảo "Nương Farm" và nấm mối "Nàng Nương" đều đã vinh dự đạt chứng nhận OCOP 3 sao” (press only) |
| SITE | `src/data/site.ts` (email, two phones, Zalo, HKD 52H8006524) |

Point 14 (Contact) is the same for every product. The site-wide contact in SITE is the verified route. No product-specific retail, wholesale, price or seasonal information is sourced. Showroom.ts has no contact field, so the page CTA handles contact.

---

## 1. nam-moi-den — Nấm Mối Đen

| # | Point | Finding | Source | Status |
|---|---|---|---|---|
| 1 | Identity | Name; category “Nấm tươi” | HOME | Published |
| 2 | Images | Studio illustration of fresh mushrooms; alt rewritten. Owner dish photos exist (`HIEN_NUONG_PHOTO_COLLECTION/món ăn/`: vacuum-packed trays; a clay-pot dish) | studio; design-reference | Published (alt) / Found – not published (no rights/caption note) |
| 3 | Introduction | Four-lines sentence; “mọc lên từ bịch giá thể”; facts: product line, Bảy Núi, An Giang, circular agriculture | MD:47,50; PN:33 | Published |
| 4 | Ingredients | — (fresh produce) | — | Missing (n/a unless sold packed) |
| 5 | Specifications | Vacuum-packed trays seen in owner photo; no weight | món ăn photo | Found – not published (owner to confirm current spec) |
| 6 | Usage | ChatWidget suggests “xào, nấu canh, lẩu, nướng mỡ hành” | ChatWidget.astro:518 | Found – not published (not an approved source) |
| 7 | Recipes | Clay-pot dish photo (looks like nấm mối kho with tiêu/ớt), no recipe text | món ăn photo | Missing (owner recipe needed) |
| 8 | Storage | — | — | Missing |
| 9 | Producer | Test-report customer: HTX Nông nghiệp Tà Đảnh (customer, not stated as producer) | VL1, AV23-2 | Found – not published |
| 10 | Product declaration | — | — | Missing |
| 11 | OCOP | “nấm mối Nàng Nương” OCOP 3 sao in press | BAG, DV | Found in press – needs certificate |
| 12 | Other records | VietLabs VLAB-2309-0307/1 (18/10/2023, linked to #kiem-nghiem); AVATEK AVA1231210158-2 (27/12/2023); AVATEK NCA8240901258-2 “Nấm mối Nàng Nương” (03/10/2024) | NƯƠNG FARM PDFs | Published (metadata; 2 without link) |
| 13 | Customer feedback | — | — | Missing |
| 14 | Contact | site-wide | SITE | Published (site-wide) |

Owner checklist
- [ ] Confirm that sample “Nấm mối Nàng Nương” (AVATEK 2024) is this fresh product and not a dried one.
- [ ] Approve publishing the AVATEK PDFs (and AVATEK result values, if wanted). Today only the VietLabs 2023 values are on the site.
- [ ] Provide the OCOP certificate or decision for “Nấm mối Nàng Nương”, and confirm that it is this product.
- [ ] Current sales spec (pack, weight), storage advice and season, if any.
- [ ] Recipe for the clay-pot dish (name, ingredients, steps) and permission to use the photo.

Tabs: **Giới thiệu** (2 paragraphs, 3 facts) · **Hồ sơ** (3 test reports).

## 2. nam-linh-chi — Nấm Linh Chi Tai To

| # | Point | Finding | Source | Status |
|---|---|---|---|---|
| 1 | Identity | Name (owner). No category: whether it is sold fresh or dried is not sourced | HOME | Published (name) |
| 2 | Images | Studio illustration of a lingzhi cap; alt rewritten | studio | Published (alt) |
| 3 | Introduction | “Tai nấm linh chi phát triển từ bịch phôi đặt trên lớp rơm.”; product line; Bảy Núi, An Giang | PN:45; MD:47 | Published |
| 4 | Ingredients | — | — | Missing |
| 5 | Specifications | Catalogue title “Nấm Linh Chi Tai To Nương Farm 200gr – Nguyên Tai”; AVATEK 2024 describes the sample as “dạng rắn, được thái lát, khô” | MS (related-product teaser); AV24-1 | Found – not published (third-party listing; sample description is not a spec) |
| 6 | Usage | — | — | Missing |
| 7 | Recipes | — | — | Missing |
| 8 | Storage | — | — | Missing |
| 9 | Producer | — | — | Missing |
| 10 | Product declaration | — | — | Missing |
| 11 | OCOP | “nấm linh chi tai to” OCOP 3 sao (HTX Nông nghiệp Tà Đảnh) | BAG, DV | Found in press – needs certificate |
| 12 | Other records | VietLabs VLAB-2309-0307/2 “Nấm linh chi” (18/10/2023); AVATEK AVA1231210158-1 “Linh chi” (27/12/2023); AVATEK NCA8240901258-1 “Nấm linh chi tai to” (03/10/2024) | NƯƠNG FARM PDFs | Published (metadata, no link) |
| 13 | Customer feedback | — | — | Missing |
| 14 | Contact | site-wide | SITE | Published (site-wide) |

Owner checklist
- [ ] OCOP certificate or decision (number, date, issuing authority, star rating, exact product name).
- [ ] Form sold (whole dried cap, sliced, fresh?), pack sizes, storage, usage.
- [ ] Approve publishing the three report PDFs and values (no public link today).

Tabs: **Giới thiệu** (1 paragraph, 2 facts) · **Hồ sơ** (3 test reports).

## 3. dong-trung-ha-thao — Đông Trùng Hạ Thảo

| # | Point | Finding | Source | Status |
|---|---|---|---|---|
| 1 | Identity | Name (owner); no category (form not sourced) | HOME | Published (name) |
| 2 | Images | Studio illustration of a cordyceps clump; alt rewritten | studio | Published (alt) |
| 3 | Introduction | “…được nuôi cấy và thu hái tại trang trại.”; product line; Bảy Núi | PN:56; MD:47 | Published |
| 4–10 | Ingredients, spec, usage, recipes, storage, producer, declaration | — | — | Missing |
| 11 | OCOP | “nấm đông trùng hạ thảo Nương farm” OCOP 3 sao; may refer to the freeze-dried jar (see product 8) | BAG, DV | Found in press – needs certificate |
| 12 | Other records | VietLabs VLAB-2309-0307/3 “Đông trùng hạ thảo” (18/10/2023) | NƯƠNG FARM PDFs | Published (metadata, no link) |
| 13 | Customer feedback | — | — | Missing |
| 14 | Contact | site-wide | SITE | Published (site-wide) |

Owner checklist
- [ ] Is this product sold fresh, or only through the processed products? (This decides the category and spec.)
- [ ] Confirm that the VietLabs 2023 sample (in a plastic box) was this base product and not the freeze-dried one.
- [ ] Which product holds the OCOP certificate: this one or Đông Trùng Hạ Thảo Sấy Thăng Hoa?

Tabs: **Giới thiệu** (1 paragraph, 2 facts) · **Hồ sơ** (1 test report).

## 4. nam-bao-ngu — Nấm Bào Ngư

| # | Point | Finding | Source | Status |
|---|---|---|---|---|
| 1 | Identity | Name; category “Nấm tươi” | HOME | Published |
| 2 | Images | Studio illustration of a white cluster; alt rewritten. ChatWidget calls it “xám”, while the studio README says white (owner photo 07/10/2026) | studio | Published (alt) / Conflict (colour wording in ChatWidget) |
| 3 | Introduction | “Chùm nấm bào ngư mọc từ bịch phôi xếp trên kệ trong nhà trồng.”; product line; Bảy Núi | PN:67; MD:47 | Published |
| 4–12 | Ingredients … records | — | — | Missing |
| 13 | Customer feedback | — | — | Missing |
| 14 | Contact | site-wide | SITE | Published (site-wide) |

Owner checklist
- [ ] Sales spec, storage and usage; any test report or declaration for oyster mushroom.

Tabs: **Giới thiệu** only (1 paragraph, 2 facts).

## 5. nam-moi-den-say-thang-hoa — Nấm Mối Đen Sấy Thăng Hoa

| # | Point | Finding | Source | Status |
|---|---|---|---|---|
| 1 | Identity | Name; category “Sấy thăng hoa”. The declaration names the product “Nấm mối đen sấy”, and its label annexes read “NẤM MỐI ĐEN SẤY Thăng hoa” | HOME; TCB | Published |
| 2 | Images | Studio illustration of a paper box with a window and dried mushrooms; alt rewritten. The box shows “45 gram” and a distorted badge | studio; PKG-05 | Published (alt) |
| 3 | Introduction | Raw material: nấm mối đen grown on the farm; processing: freeze-drying; producer HTX Nông nghiệp Tà Đảnh; place of production ấp Tân Bình, xã Tà Đảnh, huyện Tri Tôn, tỉnh An Giang (2024 administrative names, as printed) | HOME:40; TCB I, II.5, Annex 2 | Published |
| 4 | Ingredients | “Nấm mối đen sấy thăng hoa (100%)” (TCB section II reads “100% nấm mối đen sấy”) | TCB Annex 2 p.6 | Published |
| 5 | Specifications | TCB packing spec 20g/30g/50g/100g/200g/500g, packed in PE bag, PET box or glass bottle; label annex 45g; catalogue 45gr, paper box | TCB II.4, Annex 2; MS-05; PKG-05 | Found – not published (owner to confirm current spec) |
| 6 | Usage | “Rửa sạch và ngâm nấm trong nước khoảng 10 – 15 phút … xào, nấu hoặc hầm.” Catalogue instead says “Ngâm nấm trong nước ấm khoảng 5–10 phút” | TCB Annex 2; MS-05 | Published (TCB) / Conflict (catalogue) |
| 7 | Recipes | Catalogue lists dish types only, without recipes | MS-05 | Missing |
| 8 | Storage | TCB storage sentence plus the caution line | TCB Annex 2 | Published |
| 8b | Shelf life | TCB II.3: **18 tháng**; TCB label annex: **12 tháng**; catalogue: 1 năm | TCB; MS-05 | Conflict – not published |
| 9 | Producer | HTX Nông nghiệp Tà Đảnh, address as above. TCB phone **0988779777** and email chauthinuong77@gmail.com differ from SITE (+84 988 799 777, contact@hiennuongfarm.vn) | TCB; SITE | Published (name/address) / Conflict (contact, not published) |
| 10 | Product declaration | 02/TADANH/2024, 30/09/2024, linked to the public PDF on mekongsen.vn. TCB also cites TCCS 02:2024/TADANH and ATTP certificate 03/2023/NNPTNT-TT of 11/4/2023 (written “03/2023/PTNT-TT” in the label annex); MST HTX 1602127291 | TCB | Published (declaration) / Found – not published (ATTP certificate itself not seen) |
| 11 | OCOP | — | — | Missing |
| 12 | Other records | VietLabs **VLAB0-240919-022/1**, sample “Nấm mối đen sấy / Black Termitomyces Heim Dried”, received 19/09/2024, issued 25/09/2024. Known from phone photos only. Two different page-1 versions carry the same number | `NƯƠNG FARM/IMG_*.jpg` | Found – not published (photo-only; sample name lacks “thăng hoa”; needs original) |
| 13 | Customer feedback | Catalogue: “Chị Hoa – Cần Thơ”, “Chị Hiền – TP.HCM” | MS-05 | Found – not published (no permission or provenance) |
| 14 | Contact | site-wide | SITE | Published (site-wide) |

Owner checklist
- [ ] Confirm that 02/TADANH/2024 is the current declaration for this product, and approve linking the Mekong Sen-hosted PDF (or supply our own copy).
- [ ] Resolve the shelf life: 18 vs 12 months.
- [ ] Confirm the current pack size(s).
- [ ] Supply the original PDF of VLAB0-240919-022/1, explain why there are two page-1 versions, and confirm that the sample was this product.
- [ ] Say which phone and email are current (the TCB contact differs from the site).

Tabs: **Giới thiệu** (4 facts) · **Thành phần** (ingredients) · **Cách dùng** (1 preparation, 2 storage) · **Hồ sơ** (declaration, linked).

## 6. snack-nam-moi-den — Snack Nấm Mối Đen

| # | Point | Finding | Source | Status |
|---|---|---|---|---|
| 1 | Identity | Name; category “Snack”. The package front reads “NẤM MỐI SẤY (snack)” | HOME; PKG-06 | Published / Conflict (label name differs) |
| 2 | Images | Studio illustration of a clear jar with aluminium lid and snack pieces; alt rewritten | studio | Published (alt) |
| 3 | Introduction | Raw material: nấm mối đen của Hiền Nương | HOME | Published |
| 4 | Ingredients | Catalogue: “Nấm mối tươi, dầu thực vật” | MS-06 | Found – not published (third-party listing) |
| 5 | Specifications | Catalogue 1 hộp x 50gr; HSD 6 tháng | MS-06 | Found – not published |
| 6 | Usage | Catalogue: “Dùng trực tiếp ngay sau khi mở bao bì…” | MS-06 | Found – not published |
| 7 | Recipes | — | — | Missing |
| 8 | Storage | Catalogue: “Bảo quản nơi khô ráo, thoáng mát. Đậy kín…” | MS-06 | Found – not published |
| 9 | Producer | Catalogue: “Hợp tác xã Tà Đảnh”; jar side text illegible | MS-06; PKG-06 | Found – not published |
| 10–12 | Declaration, OCOP, records | — | — | Missing |
| 13 | Customer feedback | Catalogue: “Chị Lan (TP. HCM)”, “Anh Phúc (Cần Thơ)” | MS-06 | Found – not published (no permission) |
| 14 | Contact | site-wide | SITE | Published (site-wide) |

Owner checklist
- [ ] Label or declaration for the snack (ingredients, oil?, shelf life, storage).
- [ ] Confirm the product name: “Snack Nấm Mối Đen” or “Nấm mối sấy (snack)”.

Tabs: **Giới thiệu** only (1 fact).

## 7. snack-nam-bao-ngu — Snack Nấm Bào Ngư

| # | Point | Finding | Source | Status |
|---|---|---|---|---|
| 1 | Identity | Name; category “Snack” | HOME | Published |
| 2 | Images | Studio illustration of a jar with green label and golden pieces; alt rewritten. Label badges “100% ORGANIC”, “ĂN LIỀN” | studio; PKG-07 | Published (alt; badges not transcribed) |
| 3 | Introduction | Raw material: nấm bào ngư của Hiền Nương | HOME | Published |
| 4 | Ingredients | Catalogue: “100% nấm bào ngư tươi” | MS-07 | Found – not published |
| 5 | Specifications | Catalogue 50gr, 1 hũ; HSD 6 tháng | MS-07 | Found – not published |
| 6 | Usage | Catalogue: “Ăn trực tiếp như món ăn vặt…” | MS-07 | Found – not published |
| 7 | Recipes | — | — | Missing |
| 8 | Storage | Catalogue: “Để nơi khô ráo, thoáng mát… Đóng kín nắp hộp…”; caution against mushroom allergy | MS-07 | Found – not published |
| 9 | Producer | Catalogue: HTX Nông nghiệp Tà Đảnh; jar side shows “Chứng nhận … 03/202?” and “TRANG TRẠI …”, illegible | MS-07; PKG-07 | Found – not published |
| 10–12 | Declaration, OCOP, records | — | — | Missing |
| 13 | Customer feedback | Catalogue: “Chị Nhi – TP.HCM”, “Anh Thanh – Hậu Giang” | MS-07 | Found – not published |
| 14 | Contact | site-wide | SITE | Published (site-wide) |

Owner checklist
- [ ] Label or declaration; the meaning of the “Chứng nhận … 03/202x” line on the jar.
- [ ] Is there any organic certificate behind “100% ORGANIC”? If not, the badge should not appear in public imagery.

Tabs: **Giới thiệu** only (1 fact).

## 8. dong-trung-ha-thao-say-thang-hoa — Đông Trùng Hạ Thảo Sấy Thăng Hoa

| # | Point | Finding | Source | Status |
|---|---|---|---|---|
| 1 | Identity | Name; category “Sấy thăng hoa”. The jar reads “Nấm Đông Trùng Hạ Thảo Nương Farm”, and the catalogue title is “… Nương Farm 25gr – Sấy Thăng Hoa” | HOME; PKG-08; MS-08 | Published / Conflict (label name) |
| 2 | Images | Studio illustration of a square glass jar with black lid; alt rewritten. Jar shows an **OCOP 3-star badge** and “Món quà thượng hạng cho sức khỏe vàng” | studio; PKG-08 | Published (alt) / Conflict (badge and health slogan in a public image) |
| 3 | Introduction | Raw material: đông trùng hạ thảo nuôi cấy tại trang trại; processing: freeze-drying | HOME:40, HOME | Published |
| 4 | Ingredients | Catalogue: “100% Nấm Đông trùng hạ thảo sấy thăng hoa nguyên chất.” | MS-08 | Found – not published |
| 5 | Specifications | Jar “KLT: 25 gam”; catalogue 25gr, glass jar, HSD 1 năm | PKG-08; MS-08 | Found – not published (old catalogue) |
| 6 | Usage | Catalogue: tea from 05–10 strands, 80°C water, 15–20 min; added to porridge or stews | MS-08 | Found – not published |
| 7 | Recipes | Dish suggestions only (no quantities or steps) | MS-08 | Missing |
| 8 | Storage | Catalogue: “Nơi khô thoáng tránh ẩm ướt.” | MS-08 | Found – not published |
| 9 | Producer | — | — | Missing |
| 10 | Product declaration | — | — | Missing |
| 11 | OCOP | Jar badge; press names “nấm đông trùng hạ thảo Nương farm” | PKG-08; BAG; DV | Found in press – needs certificate (badge is not evidence) |
| 12 | Other records | — | — | Missing |
| 13 | Customer feedback | Catalogue: “Ngọc Hân – TP.HCM”, “Minh Trí – Đà Nẵng” | MS-08 | Found – not published |
| 14 | Contact | site-wide | SITE | Published (site-wide) |

Owner checklist
- [ ] OCOP certificate or decision and the exact product it names (this jar or product 3).
- [ ] Label or declaration (ingredients, shelf life, storage, usage).
- [ ] Decide whether the studio image may keep the OCOP badge and the health slogan.

Tabs: **Giới thiệu** only (2 facts).

## 9. tra-hoa-tan-linh-chi — Trà Hòa Tan Linh Chi

| # | Point | Finding | Source | Status |
|---|---|---|---|---|
| 1 | Identity | Name; category “Trà hòa tan” | HOME | Published |
| 2 | Images | Studio illustration of a **green tin “KLT: 200g”** beside a cup. The original photo is a **box “KL 10 gói x 5 g”** | studio; PKG-09 | Published (alt; no weight) / Conflict (studio packaging differs from original) |
| 3 | Introduction | Raw material: nấm linh chi nuôi trồng tại trang trại | HOME:40; HOME | Published |
| 4 | Ingredients | Catalogue: “100% chiết xuất nấm linh chi” | MS-09 | Found – not published |
| 5 | Specifications | Catalogue gives 50gr (title), 250gr (intro) and 10 gói x 5gr (spec); HSD 3 năm | MS-09; PKG-09 | Conflict – not published |
| 6 | Usage | Catalogue: “Pha 1 gói trà với 150 – 200ml nước nóng…”; also “để hỗ trợ sức khỏe” (claim) | MS-09 | Found – not published |
| 7 | Recipes | — | — | Missing |
| 8 | Storage | Catalogue: “Để nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp…” | MS-09 | Found – not published |
| 9 | Producer | Catalogue: HTX Nông nghiệp Tà Đảnh | MS-09 | Found – not published |
| 10–12 | Declaration, OCOP, records | — | — | Missing |
| 13 | Customer feedback | Catalogue: “Chị Thảo – An Giang”, “Anh Dũng – Cần Thơ” | MS-09 | Found – not published |
| 14 | Contact | site-wide | SITE | Published (site-wide) |

Owner checklist
- [ ] Current packaging (box of sachets or tin) and net weight; label or declaration.
- [ ] Whether the studio tin image may represent the product.

Tabs: **Giới thiệu** only (1 fact).

## 10. tra-hoa-tan-linh-chi-trung-thao — Trà Hòa Tan Linh Chi Trùng Thảo

| # | Point | Finding | Source | Status |
|---|---|---|---|---|
| 1 | Identity | Name; category “Trà hòa tan” | HOME | Published |
| 2 | Images | Studio illustration of an illustrated tin beside a cup; alt rewritten. The original tin text is garbled (“TRUNG THAO”, “NAT 200g”) | studio; PKG-10 | Published (alt) |
| 3 | Introduction | Raw material: linh chi và đông trùng hạ thảo nuôi trồng tại trang trại | HOME:40; HOME | Published |
| 4 | Ingredients | Catalogue: “Chiết xuất nấm linh chi, chiết xuất nấm đông trùng hạ thảo” | MS-10 | Found – not published |
| 5 | Specifications | Catalogue 1 hộp x 200 gram; HSD 3 năm | MS-10 | Found – not published |
| 6 | Usage | Catalogue: “Pha 1 hoặc 2 muỗng cafe trà với 150–200ml nước nóng (80–100°C)…” | MS-10 | Found – not published |
| 7 | Recipes | — | — | Missing |
| 8 | Storage | Catalogue: “Bảo quản nơi khô ráo… Đậy kín hộp sau khi mở…” | MS-10 | Found – not published |
| 9 | Producer | Catalogue: “Hợp tác xã Tà Đảnh” | MS-10 | Found – not published |
| 10–12 | Declaration, OCOP, records | — | — | Missing |
| 13 | Customer feedback | Catalogue: “Chị Mai – An Giang”, “Anh Hoàng – TP.HCM” | MS-10 | Found – not published |
| 14 | Contact | site-wide | SITE | Published (site-wide) |

Owner checklist
- [ ] Label or declaration with ingredients and proportions, current net weight, storage and usage.

Tabs: **Giới thiệu** only (1 fact).

## 11. bao-tu-nam-linh-chi — Bào Tử Nấm Linh Chi

| # | Point | Finding | Source | Status |
|---|---|---|---|---|
| 1 | Identity | Name (owner); no category. The original jar label reads **“BÀO TỬ LINH CHI SƠN DƯỢC”**, a brand name not otherwise associated with Hiền Nương, and the studio image repeats it | HOME; PKG-11 | Published (name) / **Conflict** (label brand) |
| 2 | Images | Studio illustration of a glass jar of reddish-brown powder and a small dish; alt rewritten (label text not transcribed) | studio | Published (alt) |
| 3 | Introduction | Raw material: bào tử của nấm linh chi tại Hiền Nương | HOME | Published |
| 4 | Ingredients | Catalogue: “100% bào tử nấm linh chi nguyên chất” (“linh chi đỏ”) | MS-11 | Found – not published |
| 5 | Specifications | Catalogue 50g/lọ; HSD 3 năm | MS-11 | Found – not published |
| 6 | Usage | Catalogue: “Pha 1–2g … với nước nóng … uống hàng ngày” | MS-11 | Found – not published (dosage-style, needs label) |
| 7 | Recipes | — | — | Missing |
| 8 | Storage | Catalogue: “Để nơi khô ráo… Đậy kín nắp lọ…” | MS-11 | Found – not published |
| 9 | Producer | Catalogue: “Hợp tác xã Tà Đảnh” | MS-11 | Found – not published |
| 10–12 | Declaration, OCOP, records | — | — | Missing |
| 13 | Customer feedback | Catalogue quotes with health outcomes (blood pressure, skin) | MS-11 | Found – not published (health claims) |
| 14 | Contact | site-wide | SITE | Published (site-wide) |

Owner checklist
- [ ] Explain “Sơn Dược” on the label: a sub-brand, a partner, or a wrong photo? Until this is answered, the studio image is a risk.
- [ ] Label or declaration, spec, usage and storage.

Tabs: **Giới thiệu** only (1 fact).

## 12. dong-trung-ha-thao-ngam-mat-ong — Đông Trùng Hạ Thảo Ngâm Mật Ong

| # | Point | Finding | Source | Status |
|---|---|---|---|---|
| 1 | Identity | Name (owner); no category | HOME | Published |
| 2 | Images | Studio illustration of a gold-lid glass bottle and a small bowl; alt rewritten. Original label text garbled (“Tid ich 200ml”) | studio; PKG-12 | Published (alt) |
| 3 | Introduction | Raw material: đông trùng hạ thảo nuôi cấy tại trang trại, mật ong. **Honey origin not sourced** | HOME:40; HOME | Published (honey origin omitted) |
| 4 | Ingredients | Catalogue: “Nấm đông trùng hạ thảo 100%, mật ong rừng nguyên chất” | MS-12 | Found – not published (“mật ong rừng” unverified) |
| 5 | Specifications | Catalogue 200ml; HSD 12 tháng | MS-12 | Found – not published |
| 6 | Usage | Catalogue: “Uống trực tiếp 1–2 thìa nhỏ vào buổi sáng và tối…” | MS-12 | Found – not published (dosage-style) |
| 7 | Recipes | — | — | Missing |
| 8 | Storage | Catalogue: “Để nơi khô ráo… Đóng kín nắp…” | MS-12 | Found – not published |
| 9 | Producer | Catalogue: “Hợp tác xã Tà Đảnh” | MS-12 | Found – not published |
| 10–12 | Declaration, OCOP, records | — | — | Missing |
| 13 | Customer feedback | Catalogue: “Anh Hòa – TP.HCM”, “Chị Phương – An Giang” | MS-12 | Found – not published |
| 14 | Contact | site-wide | SITE | Published (site-wide) |

Owner checklist
- [ ] Honey source (own or bought in; “mật ong rừng”?) and proportions.
- [ ] Label or declaration, volume, shelf life, storage.

Tabs: **Giới thiệu** only (1 fact).

---

## Documents inventory

All files are under `design-reference/NƯƠNG FARM/` (internal, gitignored) unless noted. None is hosted on the site, and nothing was copied to `public/`.

| Document | Issuer | Number | Dates (as printed) | Sample / product as printed | Mapped to | Public link |
|---|---|---|---|---|---|---|
| KẾT QUẢ - NẤM MỐI.pdf; 23-09-00979.pdf (text copy); KIỂM NGHIỆM NẤM MỐI.pdf p.1–2 | VietLabs | VLAB-2309-0307/1 | received/tested 23/09/2023, issued 18/10/2023 | NẤM MỐI (túi nhựa) | nam-moi-den (unprocessed nấm mối; brief-confirmed) | Values on `/san-pham/nam-moi-den/#kiem-nghiem`; PDF not public |
| KẾT QUẢ - NẤM LINH CHI.pdf + “… 1.pdf” (scan split: p.2 micro/Pb/Cd vs p.2 polysaccharides/triterpen); 23-09-00980.pdf (combined text copy); KIỂM NGHIỆM NẤM LINH CHI.pdf p.1–4 | VietLabs | VLAB-2309-0307/2 | 23/09/2023; issued 18/10/2023 | NẤM LINH CHI | nam-linh-chi (only whole-lingzhi product) | No |
| KẾT QUẢ - ĐÔNG TRÙNG HẠ THẢO.pdf + “… 1.pdf”; 23-09-00981.pdf | VietLabs | VLAB-2309-0307/3 | 23/09/2023; issued 18/10/2023 | ĐÔNG TRÙNG HẠ THẢO (hộp nhựa) | dong-trung-ha-thao (name match; owner to confirm it is not the freeze-dried one) | No |
| KIỂM NGHIỆM NẤM MỐI.pdf p.3–4 | AVATEK | AVA1231210158-2 | received 20/12/2023; issued 27/12/2023 | NẤM MỐI (moisture 84.8 % suggests fresh) | nam-moi-den | No |
| KIỂM NGHIỆM NẤM LINH CHI.pdf p.5–6 | AVATEK | AVA1231210158-1 | 20/12/2023; issued 27/12/2023 | LINH CHI | nam-linh-chi | No |
| KIỂM NGHIỆM NẤM MỐI.pdf p.5–10 | AVATEK | NCA8240901258-2 | 28/09/2024; issued 03/10/2024 | NẤM MỐI NÀNG NƯƠNG (“nguyên cây, được làm sạch”) | nam-moi-den (unprocessed nấm mối; owner to confirm) | No |
| KIỂM NGHIỆM NẤM LINH CHI.pdf p.7–8 | AVATEK | NCA8240901258-1 | 28/09/2024; issued 03/10/2024 | NẤM LINH CHI TAI TO | nam-linh-chi (exact name) | No |
| IMG_1741315572796/825/841/856/868 (phone photos) | VietLabs | VLAB0-240919-022/1 | 19/09/2024; issued 25/09/2024 | Nấm mối đen sấy / Black Termitomyces Heim Dried | **Not mapped**. Likely nam-moi-den-say-thang-hoa (same name as declaration 02/TADANH/2024, 5 days earlier) but photo-only, with two differently signed page-1 versions | No |
| Bản tự công bố sản phẩm (Mekong Sen-hosted PDF, 5 pp., CamScanner) | HTX Nông nghiệp Tà Đảnh | 02/TADANH/2024 | 30/09/2024 | NẤM MỐI ĐEN SẤY; Annexes 1–2 label “Nấm Mối Đen Sấy Thăng Hoa” | nam-moi-den-say-thang-hoa (the document itself ties the declaration to this label) | Yes (mekongsen.vn PDF) |
| VIETLABS BÁO GIÁ … 22.09.23.pdf; KIỂM LẠI – … 13.10.23.pdf | VietLabs | KN.030-09-2023/01; KN.009-10-2023/01 | 22/09/2023; 13/10/2023 | Quotations (nấm mối, linh chi, đông trùng) | None (commercial quotes, not evidence) | No |
| Referenced in TCB, not seen | Phòng NN&PTNT huyện Tri Tôn | ATTP 03/2023/NNPTNT-TT | 11/4/2023 | Facility food-safety certificate | None (need the certificate itself) | No |
| Referenced in TCB, not seen | HTX Nông nghiệp Tà Đảnh | TCCS 02:2024/TADANH | 2024 | Tiêu chuẩn cơ sở “Nấm mối sấy” | None | No |
| OCOP certificates / decisions | — | — | — | Press: linh chi tai to, đông trùng hạ thảo “Nương farm”, nấm mối “Nàng Nương” (BAG 26/04/2025) | None (no certificate found) | No |

Notes
- Every report names the customer as **HTX Nông nghiệp Tà Đảnh**, and the declaration is filed by the HTX (MST 1602127291, legal representative Trần Phương Hiền). SITE shows only HKD 52H8006524 (10/04/2024). The owner should confirm which entity the site presents as producer.
- The `KIỂM NGHIỆM …` PDFs have stamped page numbers 84–89, so they look like extracts from a larger dossier, perhaps the OCOP file. Asking the owner for the full dossier may also turn up the OCOP decision.
- `src/data/lab-reports.ts` holds only VLAB-2309-0307/1. Result values for the other reports are not on the site.

## Unsupported claims found in the codebase

| Location | Claim | Problem |
|---|---|---|
| `src/components/ChatWidget.astro:506` | “Nuôi trồng sạch … hoàn toàn không hóa chất”; inputs “cám gạo, cám bắp” | No source; absolute claim |
| ChatWidget:512 | nấm mối “giòn sần sật, vị ngọt đậm đà, **giàu chất xơ**”; ĐTHT “sấy thăng hoa **giữ nguyên dưỡng chất** quý giá”; bào ngư “rất lành tính” | Nutrition and health claims without a source |
| ChatWidget:518 | nấm mối “thân nấm mập mạp … giòn ngọt”; “**không chứa kim loại nặng độc hại**” | VLAB-2309-0307/1 (the report shown on the site) tested no heavy metals. Pb/Cd ND appears only in AVATEK 2023 (unpublished) and is sample-specific |
| ChatWidget:524 | Linh chi sample values presented as product quality (“đạt tỉ lệ hoạt chất quý nổi bật”) | Sample-specific result generalised to the product |
| ChatWidget:530 | ĐTHT “nuôi cấy nghiêm ngặt bằng công nghệ hiện đại”; cordycepin/adenosine “**giúp bồi bổ và nâng cao sức đề kháng hiệu quả**” | Health claim; sample result generalised |
| ChatWidget:536 | bào ngư “xám … lành tính, ngọt mát” | Colour conflicts with the studio README (white); unsourced |
| ChatWidget:554 | “**các sản phẩm nấm** … đều được gửi đi phân tích”; “Arsenic As”; “tiêu chuẩn … cực kỳ khắt khe” | Overgeneralised. As appears only in the unpublished 2024 dried report |
| ChatWidget:560 | “Ba dòng sản phẩm … đạt tiêu chuẩn **OCOP 3 sao**” | Press only; no certificate |
| ChatWidget:542 | Address “khóm Thới Thuận, Phường Thới Sơn” | Differs from the TCB address (ấp Tân Bình, xã Tà Đảnh); not checked in this audit |
| Studio images 07, 08, 09 | “100% ORGANIC”, OCOP badge, “cho sức khỏe vàng”, “KLT: 200g” | Claims and specs carried into public imagery (README says these images are not ready for publication) |
| Mekong Sen catalogue (external) | immunity, liver, blood-pressure and sleep claims; “hữu cơ”, “mật ong rừng”; testimonials | Not used. The owner may want these corrected at the source |

## Proposed recipes — not approved

Ideas only. Do not publish without owner-supplied names, ingredients and steps.

- Nấm mối kho tiêu (clay pot, as in the owner photo `món ăn/825266412…jpg`), for nam-moi-den.
- Canh hoặc xào nấm mối đen sấy thăng hoa, using the TCB soaking step (10–15 min), for nam-moi-den-say-thang-hoa.
- Gà hầm đông trùng hạ thảo (catalogue mentions stews), for dong-trung-ha-thao-say-thang-hoa.
- Nấm bào ngư xào rau, for nam-bao-ngu.

## Interface requests

None are blocking. Optional, for the UI owners:

1. `RawDocument.results?` (or a link to `labReports`), so that sample values can be shown in Hồ sơ for products without a detail page. Currently only metadata is shown.
2. `RawDocument.receivedOn?` / `testedOn?`. Records show the date of issue (e.g. 18/10/2023), while `/san-pham/nam-moi-den/#kiem-nghiem` shows the testing date 23/09/2023 for the same report. Showing both labels would avoid confusion.
3. A per-product `notice?: SourcedText` (e.g. “Ảnh minh hoạ; bao bì có thể khác”) for the AI studio images of packaged products.
