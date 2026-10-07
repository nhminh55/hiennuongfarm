# AGENTS.md — Hiền Nương Farm

Rules for coding agents other than Claude.

## Source of Truth

Read `CLAUDE.md` before making changes. It is the primary project instruction file.

Read additional guides only when relevant:
- design → `docs/DESIGN_SYSTEM.md`
- content → `docs/CONTENT_RULES.md`
- milestone QA → `docs/QA.md`

If instructions conflict, stop and report it.

## Workflow

For each task:
1. Run `git status`.
2. Inspect relevant code and identify the cause.
3. Make the smallest scoped change.
4. Run relevant checks and review the diff.
5. Report changes, QA, blockers, and Git status concisely.

Preserve unrelated work. No unrelated refactors, cleanup, dependency upgrades, formatting sweeps, redesigns, or changes outside the requested scope.

## Critical Rules

Port `4321` is user-owned. NEVER stop, restart, replace, free, or take ownership of it.

Reuse 4321 when available. Agent-owned testing must use `>=4330`. Do not modify network/firewall/VPN settings unless requested.

Do not commit/push during user review. After approval, follow `CLAUDE.md`.

Never discard/reset unrelated work, overwrite user changes, commit secrets, or claim unverified Git success.

## Verification

Use the smallest relevant verification.

For visual changes, verify affected viewport(s), including overflow, overlap, wrapping, image distortion, and neighboring boundaries.

A successful build alone does not prove visual correctness.

## Assets

Do not rename, crop, recompress, regenerate, or replace approved assets unless requested.

Preserve quality/aspect ratio and verify optimized assets are actually used.