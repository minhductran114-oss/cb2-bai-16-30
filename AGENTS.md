# CB2 PWA agent guide

## Product scope

This repository is evolving from the existing CB2 lessons 23–24 PWA into one
coherent learning application for lessons 16–30. Lessons 16–24 are the first
migration scope; lessons 25–30 will be added later as new teaching material is
available.

The product is a public, installable GitHub Pages PWA for desktop, phone, and
iPad. It is a connected course, not a folder of independent lesson pages.

## Read before changing code or content

1. Read this file.
2. Read `ARCHITECTURE.md`, `LESSON_SCHEMA.md`, and `CONTENT_GUIDE.md`.
3. Run `git status --short` and inspect relevant recent history.
4. Read only the lesson modules, shared components, registries, and tests needed
   for the requested change.
5. For content work, compare the source slide/book material and the relevant
   existing interactive HTML before editing.

Do not rediscover or load all lessons for a one-lesson change. The documentation
and typed schema are the durable project context.

## Source priority

Use these local sources in this order:

1. `../Slide bài giảng/CB2/Slides-bài-giảng-bài-[N].pdf`
2. Relevant textbook pages in `../Giáo trình Hán ngữ quyển 2.pdf`
3. Existing material in `../Tài liệu Claude/`
4. `../huong_dan_tao_html_bai_hoc_tieng_trung_v5_meo_nho_tuong_hinh.md`
5. Existing lesson data and components in this repository

Slides and the textbook establish the syllabus. Existing HTML/PWA material is a
useful implementation and enrichment source, but must still be checked for
language accuracy and normalized to the shared schema.

Known source inventory:

- Review app for lessons 16–20:
  `../Tài liệu Claude/on-tap-kiem-tra_bai-16-20_CB2_v3.html`
- Interactive lesson 21:
  `../Tài liệu Claude/lesson21_tieng-trung_interactive_xiaoxiao_kaiti_v1.html`
- Interactive lesson 22:
  `../Tài liệu Claude/lesson22_tieng-trung_interactive_xiaoxiao_kaiti_v1.html`
- Existing lesson 23–24 implementation: `app/lesson-data.ts` and
  `app/components/`

## Non-negotiable product rules

- Preserve and migrate the existing lessons 23–24; do not rewrite them from
  scratch.
- Each lesson is a data module. Do not duplicate lesson-specific JSX or CSS.
- Shared vocabulary, grammar, Hanzi, review history, and mistake history use
  stable IDs and shared registries.
- Every new lesson connects to prior knowledge through prerequisites,
  reinforcement references, cumulative review, and at least one applied task.
- Chinese, pinyin, and Vietnamese must remain visually distinct and readable.
- Chinese learning text uses the single handwriting-like font policy in
  `CONTENT_GUIDE.md`; do not introduce another Chinese display font casually.
- Store device-local preferences and progress in versioned browser storage.
- Do not add authentication, D1, R2, or server-only state unless the user
  explicitly expands the scope.
- Do not use or publish a `chatgpt.site` URL. The public target is GitHub Pages.
- Preserve UTF-8. Mojibake such as `TÃ i`, `BÃ i`, or corrupted Hanzi is a release
  blocker.

## Repository and generated files

- Preserve the existing package manager and `pnpm-lock.yaml`.
- Never commit `node_modules`, `.pnpm-store`, `dist`, `github-pages-dist`,
  `.wrangler`, local preview logs, temporary PDF renders, or OneDrive metadata.
- Existing template files for ChatGPT auth and D1/R2 are currently unused.
  Do not connect new course features to them.
- The working tree may contain user changes. Never discard, reset, or overwrite
  unrelated work.

## Verification commands

Run from the repository root:

```powershell
pnpm run lint
pnpm run build
pnpm run build:pages
node --test tests/rendered-html.test.mjs
```

If `pnpm` is not on Windows `PATH`, use the bundled runtime already configured
for this workspace. Do not change the project to another package manager.

Preview the exact GitHub Pages build with:

```powershell
pnpm run preview:pages
```

Do not use `vinext start` as the GitHub Pages preview on Windows; vinext 0.0.50
currently fails to serve `dist/client/assets` correctly on Windows. The Vite
Pages preview is the release-relevant preview.

## GitHub Pages rules

- `vite.github.config.ts` owns the Pages base path and static output.
- `github-pages/` is the Vite entry surface.
- `github-pages-dist/` is generated output and is not committed by default.
- The confirmed public repository is `minhductran114-oss/cb2-bai-16-30` and the
  Pages base path is `/cb2-bai-16-30/`.
- The former `cb2-bai-23-24` repository remains a separate public lesson build;
  do not overwrite or repoint it while developing the connected course.
- GitHub Actions builds from source and deploys `github-pages-dist/` as the
  Pages artifact.
- Before publishing, verify direct load, refresh, service-worker scope, manifest
  URLs, icons, lazy lesson chunks, and offline fallback under the real base path.

## Git and release workflow

- After a meaningful, coherent change passes the required checks, Codex may
  create a local commit automatically.
- A local commit is not permission to publish. Push or deploy only when the user
  explicitly says `push`, `publish`, `deploy`, or clearly approves a proposed
  release.
- Before publishing, report the repository, branch, commit, and Pages URL that
  will be affected. After publishing, verify the live URL and report the result.
- Never force-push, rewrite user commits, discard unrelated work, or stage files
  outside the confirmed change scope.
- Use `main` for an explicitly approved direct Pages release; use an
  `agent/<description>` branch and a draft PR for work that still needs review.
- The confirmed remote is
  `https://github.com/minhductran114-oss/cb2-bai-16-30.git`.

## Definition of done

A change is complete only when:

- data validates against `LESSON_SCHEMA.md`;
- Chinese/pinyin/Vietnamese content follows `CONTENT_GUIDE.md`;
- cumulative links and review metadata remain valid;
- keyboard, touch, mobile, tablet, and desktop behavior are preserved;
- the relevant tests plus lint, app build, and Pages build pass;
- generated assets resolve under the configured GitHub Pages base path;
- the final report distinguishes local changes from committed or deployed work.
