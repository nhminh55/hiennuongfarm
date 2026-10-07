# Design System — Hiền Nương Farm

Read only for visual, layout, responsive, typography, photography, or interaction work.

## Direction

**Contemporary Vietnamese Agricultural Editorial**

Authentic, premium but restrained, calm, photography-led, and rooted in Bảy Núi / An Giang.

Priority:
**Authenticity → Composition → Typography → Spacing → Photography → Interaction**

Reference:
`design-reference/homepage-mockup.png`

Use it for direction and composition, not pixel-perfect copying.

Prefer editorial/asymmetrical composition, strong typography, generous controlled whitespace, authentic photography, warm cream/deep green/earth tones, thin dividers, restrained motion, and deliberate UI.

Avoid generic AI/SaaS aesthetics, excessive/nested cards, rounded-box clutter, pills, gradients, glassmorphism, heavy shadows, unnecessary icons/emoji, and decoration used to compensate for weak composition.

## Responsive & Preservation

Approved sections remain stable unless redesign is explicitly requested.

When fixing a section/breakpoint:
- preserve approved layouts elsewhere
- inspect the CSS cascade first
- prefer normal document flow
- avoid arbitrary nudges, negative-margin hacks, and unnecessary absolute positioning
- do not shrink typography merely to hide layout problems

Desktop and mobile are deliberate layouts, not scaled copies.

## Photography

Preserve aspect ratio, focal points, and approved imagery.

Never stretch, regenerate, crop, or replace approved source photography unless requested.

Use breakpoint-specific assets when provided.

## Homepage Hero

The Hero is approved. Preserve its branding/header, navigation, copy, CTA, photography, handwritten artwork, and desktop composition unless explicitly requested.

For mobile-only fixes:
- prevent overlap
- keep CTA inside the Hero
- preserve important photographic/artwork elements where practical
- do not affect About or desktop

## Visual Review

Judge typography, spacing, and density at **100% browser zoom on a normal laptop viewport**.

Full-page screenshots are review aids, not scale references.