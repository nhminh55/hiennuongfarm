# CLAUDE.md

## Project

Hiền Nương Farm is a premium corporate brand website for a Vietnamese agricultural company.

This is a new project built from scratch. It is a brand/company presentation website, not an e-commerce storefront.

Current stack:
- Astro
- Plain CSS
- Minimal JavaScript
- No UI framework unless clearly necessary

Keep the architecture simple and avoid unnecessary dependencies.

## Design Direction

Target aesthetic:

> Contemporary Vietnamese Agricultural Editorial

The website should feel premium, authentic, calm, contemporary, and rooted in Vietnamese agriculture and Bảy Núi / An Giang.

Prioritize:

**Authenticity → Composition → Typography → Spacing → Photography → Interaction**

Prefer:
- Editorial/asymmetrical composition
- Strong typography
- Generous whitespace
- Large photography
- Warm cream, deep green, earth tones
- Thin dividers
- Clear scale contrast
- Restrained motion

Avoid:
- Generic AI-generated layouts
- SaaS aesthetics
- Generic eco/organic templates
- Excessive rounded cards
- Cards inside cards
- Glassmorphism
- Decorative gradients/blobs
- Excessive shadows, pills, icons, or emoji
- Generic leaf decorations
- Excessive animation
- E-commerce-style product grids unless explicitly requested

Do not solve weak composition by adding decoration.

The website should feel specifically like Hiền Nương Farm, not like an architecture studio, fashion brand, hotel, or generic premium template.

## Content Integrity

Never invent company facts, dates, founders, certifications, statistics, awards, partners, testimonials, addresses, contact details, product claims, or health claims.

Unverified information must remain clearly marked `VERIFY`.

Do not present placeholders, mockup content, stock images, or AI-generated imagery as authentic company information.

## Design Reference

Primary reference:

`design-reference/homepage-mockup.png`

Use it for visual direction, not pixel-perfect copying.

Preserve the mood, hierarchy, editorial character, photography emphasis, and overall brand direction while improving implementation where necessary.

## Responsive & Accessibility

The site must work intentionally across desktop, tablet, and mobile.

Check at minimum:

`1440 / 1280 / 1024 / 768 / 390 / 375 / 320`

Prevent horizontal overflow, broken typography, awkward heading wraps, poor image crops, excessive mobile spacing, and unusable navigation.

Maintain semantic HTML, keyboard navigation, visible focus states, logical heading hierarchy, sufficient contrast, meaningful alt text, and `prefers-reduced-motion`.

Keep JavaScript minimal.

## Development Rules

Before significant work:

1. Read this file.
2. Inspect relevant existing code.
3. Run `git status`.
4. Preserve existing user work.
5. Understand the current implementation before editing.

Do not rewrite working architecture without a clear reason.

Do not build unrelated features or expand scope without instruction.

Prefer simple, maintainable solutions.

## Mandatory QA

Never declare a visual task complete from code inspection alone.

Before completion:

1. Run the application.
2. Inspect the rendered website in a real browser.
3. Check browser console errors.
4. Test relevant interactions.
5. Check desktop and mobile layouts.
6. Check horizontal overflow.
7. Inspect typography, spacing, alignment, and image cropping.
8. Fix discovered issues.
9. Re-test after fixes.

For major visual work, inspect at least 1440px and 390px before checking the remaining supported widths.

Production builds must complete without blocking errors.

## Git & GitHub

GitHub is the source of truth.

After every meaningful completed task or milestone:

1. Run relevant QA/tests.
2. Review `git status` and `git diff`.
3. Stage only relevant files.
4. Commit with a meaningful message.
5. Push to the configured GitHub remote.

Do not blindly use `git add .`.

Never commit secrets, API keys, `.env`, credentials, broken experiments, or unnecessary generated files.

Never overwrite or discard existing user work without permission.

If push fails, investigate and retry. Never claim a push succeeded when it did not.

At task completion, report:
- What changed
- QA performed
- Commit hash
- Push status
- Remaining issues

## Working Principle

Build less, but build it exceptionally well.

When uncertain, choose the simpler, more intentional, and more authentic solution.
