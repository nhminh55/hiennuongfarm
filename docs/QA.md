# QA Guide — Hiền Nương Farm

Read this file for milestone QA, responsive audits, or when a change has meaningful regression risk.

## During Iteration

Use targeted checks only.

For a small visual correction:
1. test the affected viewport(s)
2. inspect the affected region
3. check neighboring sections
4. check console/build errors when relevant

Typical quick visual checks:
- `1366x768`
- `390px` mobile

Do not run the full matrix after every small CSS or copy change.

## Final Visual Milestone

Before an approved visual milestone is committed, verify:

`1440 / 1280 / 1024 / 768 / 390 / 375 / 320`

Check:
- horizontal overflow
- typography and awkward wrapping
- spacing and alignment
- image crops and aspect ratios
- navigation and interactions
- keyboard/focus behavior
- console errors
- reduced motion where relevant
- section boundaries
- unintended regressions outside the edited area

Production build must pass.

## Browser / Playwright

Port `4321` is user-owned. Never restart or manage it.

If it is running, it may be reused for verification.

If isolated automated testing requires a separate server, use a temporary port `>=4330` and stop only the process created by the current agent session.

A successful build is not proof that a visual task is complete.

Do not claim a visual fix without checking the rendered result.

## Screenshots

For major visual milestones, save final review screenshots under:

`design-reference/screenshots/`

Do not commit screenshots unless explicitly requested.

Screenshots should document the final reviewed state, not create unnecessary generated-file noise.

## Completion Gate

A task is complete when:
- the requested issue is addressed
- unrelated approved UI remains unchanged
- relevant checks pass
- responsive behavior is verified when applicable
- no accidental files/dependencies were introduced
- the final diff contains only intentional changes
