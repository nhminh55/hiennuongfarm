# AGENTS.md — Hiền Nương Farm

This file defines operating rules for coding agents working in this repository.

## 1. Read Before Acting

Before making changes:

1. Read `CLAUDE.md` in full. It is the primary project-specific instruction file.
2. Read this `AGENTS.md`.
3. Inspect the relevant implementation before proposing or applying edits.
4. Read `package.json` and the relevant Astro components/styles when needed.
5. Preserve established architecture, content, visual direction, and conventions.

If `CLAUDE.md` and this file overlap, follow the stricter rule. If they conflict, stop and report the conflict before changing code.

## 2. Project Context

Hiền Nương Farm is a company introduction website built from scratch.

Current design direction:
- Contemporary Vietnamese Agricultural Editorial
- premium but restrained
- strong editorial typography
- photography-led layouts
- generous whitespace
- minimal decorative UI
- natural, grounded visual character
- avoid generic AI-generated landing-page aesthetics

Do not casually redesign approved sections.

## 3. Development Server — Critical

Port `4321` is the user's persistent development server.

NEVER:
- kill the process on port 4321
- restart the process on port 4321
- replace the existing server
- launch another server that conflicts with port 4321
- run commands intended to free port 4321

Assume the existing server is user-owned and must remain running.

If testing requires a server and the existing one cannot be used, explain the issue instead of modifying the process.

## 4. Change Discipline

Make the smallest change that solves the requested problem.

For every task:

1. Inspect first.
2. Identify the actual root cause.
3. State which files/rules are responsible when useful.
4. Modify only the necessary files.
5. Test the result.
6. Review the diff for unintended changes.

Do not perform unrelated cleanup, refactoring, dependency upgrades, formatting sweeps, or redesigns unless explicitly requested.

A request such as “fix the mobile Hero” does NOT authorize changes to desktop, other homepage sections, typography, content, navigation, or global styles.

## 5. Responsive UI Rules

Treat desktop and mobile as deliberate layouts, not automatic scaled copies.

When fixing a breakpoint:
- preserve already-approved layouts at other breakpoints
- inspect the CSS cascade before overriding values
- prefer normal document flow and robust responsive CSS
- avoid arbitrary pixel nudges
- avoid negative-margin hacks
- avoid unnecessary absolute positioning
- do not solve layout problems by shrinking typography unless explicitly requested
- verify actual rendered dimensions instead of assuming a CSS declaration controls them

For image-led sections:
- preserve image aspect ratio
- never stretch photography
- protect important focal points
- use breakpoint-specific assets when the design provides them
- do not regenerate, crop, or replace source imagery unless explicitly requested

## 6. Homepage Hero

The homepage Hero is an approved photography-led composition.

Preserve unless explicitly requested:
- Hiền Nương Farm branding/header
- navigation/menu behavior
- headline
- subtitle
- CTA
- landscape photography
- handwritten “Đất lành cho những giá trị lâu dài” artwork
- desktop composition

The mobile Hero may use its dedicated mobile image.

When working on the mobile Hero:
- keep header, headline, subtitle, and CTA from overlapping
- keep the CTA completely inside the Hero
- preserve the sunlight, mountains, rice fields, and handwritten artwork where practical
- do not let Hero fixes alter the following About section
- do not change desktop while solving a mobile-only request

## 7. Content Integrity

Do not invent company facts.

Established brand facts that must be preserved:
- Hiền Nương Farm was established in 2020.
- The co-founders are husband and wife.
- When referring to both founders together, use this order and wording:
  `chị Châu Thị Nương và anh Trần Phương Hiền`
- The farm is associated with Tà Đảnh / the Bảy Núi region of An Giang.
- The brand story centers on circular agriculture and creating value from agricultural by-products.

Do not remove these established facts merely because an external evidence file does not repeat them.

Do not silently rewrite Vietnamese brand copy. Preserve wording unless content editing is part of the task.

## 8. Testing

After code changes, run the relevant checks available in the repository.

At minimum:
- run the project's build/type checks where applicable
- check for console/build errors
- inspect the affected page at the relevant breakpoint
- verify that neighboring sections were not broken

For responsive visual changes, test representative widths such as:
- 360px
- 390px
- 430px
- desktop around 1440px when desktop regression is possible

For surgical mobile-only changes, prioritize the requested mobile widths and confirm desktop code/diff was not altered unintentionally.

Do not claim something is visually fixed unless it was actually checked.

## 9. Browser and Visual Verification

When browser automation or screenshots are available:
- compare before and after
- inspect the exact affected region
- verify overflow and overlap
- verify text remains readable
- verify images are not distorted
- verify section boundaries remain correct

Do not treat a successful build as proof that a visual task is complete.

## 10. Git Safety

Before editing, inspect repository status when relevant.

NEVER:
- discard user changes
- reset unrelated modifications
- use destructive Git commands casually
- overwrite work you did not create

Do not commit or push unless the user's current instruction or `CLAUDE.md` explicitly requires it.

If the user says “do not commit/push,” that instruction overrides normal project automation for that task.

When commits are requested, keep them focused and descriptive.

## 11. Dependencies

Do not add a dependency when the task can reasonably be solved with the existing stack.

Before adding or upgrading a package:
- explain why it is necessary
- check compatibility with the current project
- avoid broad dependency updates

Never change framework/toolchain versions as incidental cleanup.

## 12. Files and Assets

Do not rename, recompress, regenerate, or replace approved image assets unless requested.

When introducing an optimized asset:
- preserve the original when appropriate
- use meaningful filenames
- ensure references point to the intended version
- verify dimensions/aspect ratio
- avoid unnecessary quality loss

Do not commit secrets, credentials, API keys, local environment files, or private configuration.

## 13. Communication

For non-trivial work, report concisely:
- root cause
- files changed
- what changed
- tests performed
- remaining uncertainty, if any

Do not say “fixed” based only on code inspection when visual verification is required.

If a request is ambiguous but a safe, minimal interpretation is obvious, use that interpretation rather than redesigning broadly.

## 14. Definition of Done

A task is complete only when:

- the requested issue is actually addressed
- unrelated approved UI remains unchanged
- relevant tests pass
- responsive behavior has been checked when applicable
- no accidental files or dependencies were introduced
- the final diff contains only intentional changes

Accuracy and preservation of approved work are more important than making many changes.
