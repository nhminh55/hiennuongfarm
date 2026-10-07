# CLAUDE.md — Hiền Nương Farm

## Project

Premium Vietnamese agricultural brand/company website.

Stack:
- Astro
- Plain CSS
- Minimal JavaScript
- No UI framework unless clearly necessary

Keep architecture simple. Avoid unnecessary dependencies.

## Core Direction

Design: **Contemporary Vietnamese Agricultural Editorial**

Priorities:
**Authenticity → Composition → Typography → Spacing → Photography → Interaction**

Keep the experience premium, restrained, photography-led, spacious, and grounded in Bảy Núi / An Giang.

Avoid generic AI/SaaS/eco-template aesthetics, excessive cards, pills, gradients, glassmorphism, shadows, icons, emoji, and decorative clutter.

Primary visual reference:
`design-reference/homepage-mockup.png`

For design-specific work, read `docs/DESIGN_SYSTEM.md`.

## Content

Never invent company facts, dates, founders, certifications, statistics, partners, testimonials, contact details, product claims, or health claims.

Owner-verified facts:
- Hiền Nương Farm was established in 2020.
- The co-founders are husband and wife.
- When naming both founders, use exactly this order:
  **chị Châu Thị Nương và anh Trần Phương Hiền**

For content work, read:
- `design-reference/CONTENT_EVIDENCE_BANK.md`
- `docs/CONTENT_RULES.md`

Owner-verified facts override an evidence file that merely omits them.

## Working Rules

Before editing:
1. Run `git status`.
2. Inspect only the relevant implementation.
3. Preserve existing user work and approved UI.
4. Make the smallest change that solves the requested problem.

Do not:
- expand scope without instruction
- perform unrelated cleanup/refactors
- upgrade dependencies incidentally
- rewrite approved copy unless content editing is requested
- redesign approved sections casually
- use Graphify unless explicitly requested

## Port 4321 — Never Manage It

Port `4321` is the user's persistent, user-owned development server.

NEVER stop, kill, restart, replace, clean up, or take ownership of the process using port 4321.

If it is running, it may be reused for browser/Playwright verification.

If isolated Claude-owned testing is necessary, use a temporary port `>=4330` and stop only the process created by the current Claude session.

If 4321 is unavailable or stale, report it. Do not repair or restart it.

Do not modify firewall, router, VPN, network-profile, or LAN settings unless explicitly asked.

## QA

Use targeted QA during iteration. Do not run exhaustive visual QA after every small edit.

For visual milestones or before an approved commit, follow `docs/QA.md`.

Production build must pass before a meaningful milestone is committed.

Never claim a visual issue is fixed unless the affected viewport/region was actually checked.

## Git

GitHub is the source of truth.

During visual iteration, do not commit/push while user review is still pending.

After an **approved meaningful milestone**:
1. Run final relevant QA/tests.
2. Review `git status` and `git diff`.
3. Stage only relevant files.
4. Commit with a meaningful message.
5. Push to the configured remote.

Never blindly use `git add .`.
Never discard or overwrite unrelated user work.
Never commit secrets, `.env`, credentials, broken experiments, or unnecessary generated/reference files.
Never claim a push succeeded if it failed.

## Context Efficiency

Use the minimum context needed for the task.

- Read only relevant files.
- Do not scan the whole repository when targets are known.
- Do not re-read unchanged references without a reason.
- Open task-specific docs only when relevant.
- Keep completion reports concise: changes, QA, blockers, Git status.

## Principle

**Build less, but build it exceptionally well.**

When uncertain, preserve approved work and choose the simpler, more authentic solution.
