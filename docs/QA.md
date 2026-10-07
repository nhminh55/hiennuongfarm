# QA Guide — Hiền Nương Farm

Read for milestone QA, responsive audits, or changes with meaningful regression risk.

## Iteration

Use targeted checks only.

For small visual changes:
1. Test affected viewport(s) and region.
2. Check neighboring sections/regressions.
3. Check console/build when relevant.

Typical quick checks: `1366x768` and `390px`.

Do not run the full matrix after every small change.

## Milestone QA

Before an approved visual milestone is committed, verify:

`1440 / 1280 / 1024 / 768 / 390 / 375 / 320`

Check:
- overflow, wrapping, spacing, alignment
- image crops/aspect ratios
- navigation/interactions
- keyboard/focus and reduced motion where relevant
- section boundaries and regressions
- console errors

Production build must pass.

A successful build alone does not prove visual correctness. Verify rendered results before claiming a visual fix.

## Testing

Port `4321` is user-owned; reuse it but never manage/restart it.

Isolated agent testing must use `>=4330` and stop only agent-created processes.

## Screenshots

For major milestones, save review screenshots to `design-reference/screenshots/`.

Do not commit screenshots unless requested.

## Completion

Complete only when the requested issue is fixed, relevant checks pass, approved UI remains intact, and the diff contains only intentional changes.