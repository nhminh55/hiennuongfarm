# Design System — Hiền Nương Farm

Read this file only for visual, layout, responsive, typography, photography, or interaction work.

## Direction

**Contemporary Vietnamese Agricultural Editorial**

The site should feel:
- authentic
- premium but restrained
- calm
- contemporary
- rooted in Bảy Núi / An Giang
- photography-led rather than UI-decoration-led

Primary visual reference:
`design-reference/homepage-mockup.png`

Use the reference for direction and composition, not pixel-perfect copying.

## Visual Priorities

**Authenticity → Composition → Typography → Spacing → Photography → Interaction**

Prefer:
- editorial or asymmetrical composition
- strong typography
- controlled generous whitespace
- authentic agricultural photography
- warm cream, deep green, and earth tones
- thin dividers
- restrained motion
- simple, deliberate UI

Avoid:
- generic AI-generated landing-page aesthetics
- SaaS-style layouts
- excessive cards or cards-inside-cards
- rounded-box clutter
- decorative pills/chips
- gradients
- glassmorphism
- excessive shadows
- unnecessary icons
- emoji as decoration
- ornamental fixes for weak composition

Do not fix weak composition by adding decoration.

## Preservation

Approved sections should remain stable unless the user explicitly requests a redesign.

When fixing one breakpoint or section:
- preserve approved layouts elsewhere
- inspect the cascade before adding overrides
- prefer normal document flow
- avoid arbitrary pixel nudges and negative-margin hacks
- avoid unnecessary absolute positioning
- do not shrink typography merely to hide a layout problem

Desktop and mobile are deliberate layouts, not automatically scaled copies.

## Photography

For image-led sections:
- preserve aspect ratio
- never stretch photography
- protect important focal points
- use breakpoint-specific assets when provided
- do not crop, regenerate, or replace approved source imagery unless requested

## Homepage Hero

The homepage Hero is an approved photography-led composition.

Preserve unless explicitly requested:
- Hiền Nương Farm branding/header
- navigation/menu behavior
- headline
- subtitle
- CTA
- landscape photography
- handwritten “Đất lành cho những giá trị lâu dài” artwork
- approved desktop composition

The mobile Hero may use its dedicated mobile image.

For mobile Hero fixes:
- prevent header/headline/subtitle/CTA overlap
- keep the CTA fully inside the Hero
- preserve sunlight, mountains, rice fields, and handwritten artwork where practical
- do not let Hero fixes alter the following About section
- do not alter desktop for a mobile-only request

## Visual Judgment

Judge typography, spacing, and section density at 100% browser zoom on a normal laptop viewport.

Full-page screenshots are review aids, not scale references.
