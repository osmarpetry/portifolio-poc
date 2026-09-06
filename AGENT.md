# AGENT.md

## Dependabot migrations — 2026-09-06

### Merged
- PR #1 `Bump the npm group with 9 updates` — `@11ty/eleventy` 3.1.5→3.1.6, `@storybook/html-vite` 10.3.4→10.6.0, `lightningcss` 1.32.0→1.33.0, `markdown-it` 14.1.1→14.3.1, `markdown-it-anchor` 9.2.0→9.2.1, `playwright` 1.59.1→1.62.1, `sharp` 0.34.5→0.35.4, `storybook` 10.3.4→10.6.0, `terser` 5.46.1→5.51.2. All minor/patch bumps within their declared `^` ranges, no major-version crossings. Mechanic: `npm ci && npm run build` passed unchanged, no code touched.

### Not fixed by me
- `dependabot / automerge` CI job fails with `GitHub Actions is not permitted to approve pull requests` (org/repo setting), unrelated to the dependency bump itself. Merged manually via `gh pr merge --squash` instead.

### Note
- Repo working tree had pre-existing uncommitted changes to `src/assets/resume/*.pdf` (not related to this task) — left untouched throughout.

### Next steps
- No open Dependabot PRs left in this repo as of this pass.
