# AGENTS.md — Hiền Nương Farm

Operational rules for coding agents other than Claude.

## Source of Project Rules

`CLAUDE.md` is the primary repository instruction file.

Read it before making changes. Do not duplicate its project, design, content, QA, or Git rules here.

When a task requires more detail, read only the relevant guide:
- visual/design work → `docs/DESIGN_SYSTEM.md`
- content/copy work → `docs/CONTENT_RULES.md`
- milestone/responsive QA → `docs/QA.md`

If instructions conflict, stop and report the conflict before changing code.

## Agent Workflow

For each task:

1. Run `git status`.
2. Inspect the relevant implementation.
3. Identify the actual cause before editing.
4. Make the smallest scoped change.
5. Run the relevant checks.
6. Review the diff for unintended changes.
7. Report concisely what changed and what was verified.

Preserve unrelated working-tree changes.

Do not perform unrelated refactors, cleanup, dependency upgrades, formatting sweeps, or redesigns.

A narrow request does not authorize changes to unrelated breakpoints, sections, content, typography, navigation, or global styles.

## Critical: User-Owned Server

Port `4321` belongs to the user.

NEVER:
- start a replacement server on 4321
- stop, kill, restart, or take ownership of its process
- run commands intended to free port 4321
- modify firewall/router/VPN/network settings to make it reachable

If 4321 is running, reuse it for browser, Playwright, responsive, or screenshot checks when practical.

If an isolated agent-owned server is required, use a temporary port `>=4330`. Stop only processes created by the current agent session.

If 4321 is not usable, report that fact and continue with work that does not require it.

Do not spend task time diagnosing LAN or physical-device connectivity unless explicitly requested.

## Git Safety

Do not commit or push while the user is reviewing iterative visual work.

After the user approves a meaningful milestone, follow the Git workflow in `CLAUDE.md`.

Never:
- discard user changes
- reset unrelated modifications
- overwrite work you did not create
- commit secrets or local credentials
- claim commit/push success without verifying it

## Verification

Use the smallest targeted verification appropriate to the task.

For visual changes:
- verify the affected viewport(s)
- check overflow, overlap, wrapping, image distortion, and neighboring section boundaries
- do not treat a successful build as proof of visual correctness

Use `docs/QA.md` for milestone-level QA.

## Assets

Do not rename, crop, recompress, regenerate, or replace approved image assets unless requested.

When adding an optimized asset, preserve quality and aspect ratio and verify the intended file is actually used.

## Communication

For non-trivial work, report:
- root cause
- files changed
- relevant QA/tests
- blockers or uncertainty
- Git status

Do not restate repository instructions in the completion report.
