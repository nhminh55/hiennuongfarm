# CLAUDE.md — Hiền Nương Farm

## Project

Premium Vietnamese agricultural website built with Astro, plain CSS, and minimal JS. Keep architecture simple; avoid unnecessary dependencies.

Design: **Contemporary Vietnamese Agricultural Editorial** — authentic, restrained, photography-led, spacious, rooted in Bảy Núi / An Giang.

Avoid generic AI/SaaS/eco-template aesthetics and decorative clutter.

Design reference: `design-reference/homepage-mockup.png`
Design rules: `docs/DESIGN_SYSTEM.md`

## Content

Never invent company facts, claims, certifications, statistics, partners, testimonials, or contact details.

Owner-verified:
- Established in 2020.
- Co-founders are husband and wife.
- When naming both: **chị Châu Thị Nương và anh Trần Phương Hiền**.

Content sources:
`docs/HIEN_NUONG_PRESS_EVIDENCE_BANK.md` and `docs/CONTENT_RULES.md`.

Owner-verified facts override mere omissions in the Evidence Bank.

## Work

Before editing: run `git status`, inspect only relevant code, preserve user work/approved UI, and make the smallest necessary change.

No unrelated refactors, dependency upgrades, copy changes, redesigns, or Graphify unless requested.

Use minimum context; read task-specific docs only when relevant.

## Server

Port `4321` is user-owned. NEVER stop, restart, replace, or take ownership of it.

Reuse it when available. Agent-owned testing must use `>=4330`.

Do not modify network/firewall/VPN settings unless requested.

## Deployment

Primary production: **Cloudflare Pages — `hiennuongfarm.vn`** (also served at `hiennuongfarm.pages.dev`)

`main` → `.github/workflows/deploy-pages.yml` → Pages project `hiennuongfarm`.

The legacy Worker `hiennuongfarm` also auto-deploys from `main`. Do NOT modify, disconnect, migrate, or delete it unless explicitly requested.

Do not create another Pages project or use `wrangler deploy` for Pages.

Never commit credentials, tokens, `.env`, or secrets.

## QA & Git

Use targeted QA; milestone QA follows `docs/QA.md`. Build must pass. Never claim a visual fix without checking the affected viewport.

Do not commit/push during user review.

After approval: review status/diff → stage only relevant files → commit → push.

Never blindly `git add .` or discard unrelated work.

## Principle

**Build less, but build it exceptionally well.**
When uncertain, preserve approved work.