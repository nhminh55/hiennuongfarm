# CLAUDE.md

## Project

Hiền Nương Farm is a premium Vietnamese agricultural brand/company website.

Stack:
- Astro
- Plain CSS
- Minimal JavaScript
- No UI framework unless necessary

Keep architecture simple. Avoid unnecessary dependencies.

## Design

Direction: **Contemporary Vietnamese Agricultural Editorial**

Feel:
- authentic
- premium
- calm
- contemporary
- rooted in Bảy Núi / An Giang

Prioritize:

**Authenticity → Composition → Typography → Spacing → Photography → Interaction**

Prefer editorial/asymmetrical layouts, strong typography, controlled whitespace,
authentic photography, warm cream/deep green/earth tones, thin dividers and restrained motion.

Avoid generic AI/SaaS/eco-template aesthetics, excessive cards, rounded boxes,
gradients, glassmorphism, pills, shadows, icons, emoji and decorative clutter.

Do not fix weak composition by adding decoration.

Primary visual reference:
`design-reference/homepage-mockup.png`

Use it for direction, not pixel-perfect copying.

## Content

Never invent company facts, dates, founders, certifications, statistics,
partners, testimonials, contact details, product claims or health claims.

Unverified information stays `VERIFY`.

`design-reference/CONTENT_EVIDENCE_BANK.md` is the factual source of truth.

Owner-verified:
- Hiền Nương Farm was established in 2020.
- Co-founders are husband and wife:
  **chị Châu Thị Nương và anh Trần Phương Hiền**
- Always name them in that order.

Do not present mockup/placeholder/stock/AI content as authentic company information.

## Context Efficiency

Use the minimum context necessary for the current task.

- Read only relevant files.
- Do not scan the whole repository when target files are known.
- Do not re-read unchanged reference files without a reason.
- Prefer targeted search/read over broad exploration.
- Do not restate project rules in task reports.
- Do not inspect unrelated pages/components unless the change can affect them.
- Keep completion reports concise: changes, QA, blockers, Git status.
- Do not use Graphify unless explicitly requested.

## Development

Before editing:
1. Read this file.
2. Run `git status`.
3. Inspect only relevant existing code.
4. Preserve existing user work.

Do not rewrite working architecture without a clear reason.
Do not expand scope without instruction.

## Local Server

Port `4321` is the user's persistent development server.

NEVER stop, kill, restart, replace, clean up, or take ownership of any
process using port 4321.

Pre-existing Node/Astro processes are user-owned.

For Claude QA, use temporary ports `>=4330`.

Claude may stop only processes created by the current Claude session.

If port 4321 is unavailable or stale, report it. The user will restart it.

## Visual QA

Judge typography, spacing and section density at **100% browser zoom on a
normal laptop viewport**.

Full-page screenshots are review aids, not scale references.

During iterative visual work:
- test only the viewport(s) relevant to the reported problem
- normally use `1366x768` and `390`
- do not run exhaustive QA after every small CSS/content correction

Before a visual milestone is approved/committed, run final QA at:

`1440 / 1280 / 1024 / 768 / 390 / 375 / 320`

Check:
- horizontal overflow
- typography/wrapping
- spacing/alignment
- image crops
- navigation/interactions
- keyboard/focus
- console errors
- reduced motion where relevant

Production build must pass.

For major visual milestones, save final review screenshots under:
`design-reference/screenshots/`

Do not commit screenshots unless explicitly requested.

## Git

GitHub is the source of truth.

After an **approved meaningful milestone**:
1. Run final QA/tests.
2. Review `git status` and `git diff`.
3. Stage only relevant files.
4. Commit with a meaningful message.
5. Push to the configured remote.

Do not blindly use `git add .`.

Never commit secrets, `.env`, credentials, broken experiments,
reference/source materials, or unnecessary generated files.

Never overwrite/discard user work without permission.

If push fails, investigate and retry. Never claim success if it failed.

Do not commit/push during visual iteration when the user has requested review first.

## Principle

**Build less, but build it exceptionally well.**

When uncertain, choose the simpler and more authentic solution.