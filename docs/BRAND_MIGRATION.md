# NƯƠNG FARM identity update

Approved direction, 15 October 2026:

- Main public brand: **NƯƠNG FARM**, consistently in Vietnamese, English and Chinese.
- Physical farm: **Trang trại Hiền Nương**. Keep its story, name on maps, founders, locations and historical source credits.
- Production and trading entity: **HTX Nông nghiệp Tà Đảnh**. Remove the household business from the public story and footer. Do not reuse its tax/registration details for the cooperative; cooperative details remain empty pending verified documents.
- Keep `hiennuongfarm.vn`, email, repository, Cloudflare project/Worker, OAuth origins, routes and anchors.

Implementation updates the shared identity, navigation, current marketing copy, product brand fields, author/publisher metadata and CMS labels/defaults. About copy explains the three roles without inventing a brand founding date. The website wordmark pairs NƯƠNG FARM typography with the existing mushroom icon; original logo/photographic assets are preserved.

Certificate names/holders, press titles/quotations, historical events, image credits, packaging, testimonials and original video remain intact. Old names can legitimately remain in these records. Dormant chatbot/wordmark labels are aligned without enabling those components.

CMS registration fields are optional; the footer omits empty details. The generator and tracked CMS configuration both include the new footer copy and organization labels. Annotated admin screenshot assets still show the earlier interface; refresh them after the identity layout is approved. Archival copy under `docs/About/`, `docs/products/` and evidence banks is retained; rendered copy comes from `src/content/`.

The separate `codex/chatgpt-publisher-pilot` branch is not merged or modified by this change. Before enabling it, update its generated article author, GPT name and OpenAPI display title to NƯƠNG FARM while preserving repository and URL settings.

Validation: production build with Pagefind/search dictionary; rendered HTML metadata, removal of HKD, Article organization authors, CMS optional fields; browser checks at mobile, tablet and desktop widths; source records/assets/infrastructure compared with the base commit. No production deployment is part of this change.


Naming story approved 15 October 2026: NƯƠNG FARM is the shorter, familiar name of Hiền Nương Farm (Trang trại Hiền Nương), connected to the shared farming journey of chị Châu Thị Nương and anh Trần Phương Hiền. Use NƯƠNG FARM as the primary public brand; retain the farm name and the cooperative’s separate production/trading role. Do not invent a renaming or brand founding date.
