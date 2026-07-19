# CB2 PWA architecture

## 1. Product model

The target is one connected CB2 course for lessons 16–30, delivered as a
static, installable GitHub Pages PWA.

The application has three cooperating layers:

1. **Lesson layer** — the guided sequence and lesson-specific teaching content.
2. **Knowledge layer** — shared vocabulary, grammar, Hanzi, functions, topics,
   and cross-lesson relationships.
3. **Learning layer** — mastery, spaced review, checkpoints, mistakes, study
   settings, and offline behavior.

Putting lesson links on one screen is not sufficient. A lesson must declare
what it introduces, what earlier knowledge it reuses, and what later lessons
will reinforce.

## 2. Current state

The existing repository already provides a strong lesson 23–24 prototype:

- reusable view components for overview, dialogue, vocabulary, grammar,
  practice, writing, and stroke animation;
- a shared audio hook using the browser Speech Synthesis API;
- persisted pinyin/meaning/test-mode preferences and section progress;
- responsive UI and PWA assets;
- a separate Vite build for GitHub Pages.

Foundation status (implemented locally, not yet committed or published):

- `content/schema.ts` defines the running course/module/knowledge contracts;
- `content/course.ts` indexes lessons 16–30 and the four checkpoints;
- `content/lesson-loaders.ts` lazy-loads and validates available lessons;
- lessons 23 and 24 are separate module adapters that preserve the existing
  educational content;
- hash routes now expose the course hub, lesson views, knowledge hub, cumulative
  review, and mistake notebook;
- `learning/storage.ts` owns a versioned local state envelope and migrates the
  former settings/progress keys;
- wrong quiz and dictation answers are recorded in the mistake notebook.

The remaining limitations are structural/content migration work:

- only lessons 23 and 24 have validated, available modules;
- their adapter still reads the preserved legacy `app/lesson-data.ts`; later
  normalization can split registries without changing the renderer;
- progress is section completion plus a basic review queue, not yet a full
  knowledge-mastery model;
- checkpoints are defined in course data but do not yet have exercise modules;
- the GitHub Pages base path still names the lesson 23–24 prototype;
- the original starter README/auth/D1/R2 surfaces do not describe or serve the
  current public learning product.

## 3. Target source layout

This is the target layout. The foundation paths now exist; deeper subfolders
and learning engines are added only when their phase needs them.

```text
app/
  page.tsx                    # PWA shell and client router
  globals.css                 # shared design system
  components/
    shell/                    # header, navigation, install/offline status
    course/                   # roadmap, lesson cards, checkpoints
    lesson/                   # reusable lesson section views
    knowledge/                # vocabulary/grammar/Hanzi explorers
    review/                   # daily review and feedback
    mistakes/                 # mistake notebook
  hooks/
    use-audio.ts
    use-course-store.ts
    use-offline-status.ts

content/
  course.ts                   # lesson order and checkpoint definitions
  lesson-loaders.ts           # static lazy-import map for Vite
  lessons/
    lesson-16.ts
    ...
    lesson-24.ts
    lesson-25.ts              # added only when source material exists
  knowledge/
    vocabulary.ts
    grammar.ts
    hanzi.ts
    functions.ts
    topics.ts

learning/
  storage.ts                  # versioned persistence and migrations
  review-scheduler.ts         # deterministic spaced-review policy
  mastery.ts                  # lesson/knowledge mastery calculations
  mistake-log.ts
  answer-normalization.ts

public/
  audio/                      # optional optimized human-recorded audio
  images/                     # purposeful WebP/AVIF learning visuals
  manifest.webmanifest
  sw.js

tests/
  content-schema.test.mjs
  cross-links.test.mjs
  rendered-html.test.mjs
  pages-assets.test.mjs
```

## 4. Navigation on GitHub Pages

GitHub Pages does not provide application rewrites for arbitrary SPA paths.
The first implementation therefore uses hash routes so direct links and reloads
do not become 404 pages:

```text
#/lo-trinh
#/bai/16
#/bai/23/tu-vung
#/kho-kien-thuc/tu-vung
#/kho-kien-thuc/ngu-phap
#/on-tap
#/so-loi
```

The shell remains one static entry point. Route state must not be duplicated in
unrelated components.

## 5. Data flow

```text
lesson module ─┐
               ├─> validated course model ─> reusable views ─> learner
knowledge data ┘              │
                              ├─> review scheduler
learner actions ──────────────┼─> mastery calculator
                              └─> mistake notebook
```

Rules:

- A lesson references stable knowledge IDs; it does not clone global entries.
- Lesson-specific context, examples, dialogue, and missions remain in the lesson
  module.
- Knowledge entries record `introducedIn` and `reinforcedIn` relationships.
- Exercises identify every knowledge item they test.
- Review and mistake records point back to both a knowledge ID and their source
  lesson/exercise.

## 6. Loading and performance

Fifteen lessons are not inherently heavy. Text and typed data are small; audio,
images, eager stroke writers, and duplicated code are the primary size risks.

Use these boundaries:

- the course hub and small knowledge index load with the app shell;
- lesson content loads through a static dynamic-import map only when needed;
- Hanzi Writer loads and initializes only after the learner opens stroke mode;
- images declare dimensions and use WebP/AVIF when practical;
- recorded audio loads on demand and must never be embedded as base64 in lesson
  TypeScript;
- no lesson component may import every lesson module to compute its local view;
- global search uses a compact generated index, not all full lesson components.

## 7. Offline model

The service worker follows an app-shell plus on-demand-content strategy:

- precache the shell, manifest, icons, core CSS/JS, and course index;
- runtime-cache lesson chunks after first use;
- runtime-cache optional audio/images after successful requests;
- expose a per-lesson “available offline” state rather than claiming all lessons
  are downloaded;
- remove obsolete versioned caches during activation;
- always resolve assets relative to the service-worker scope and Pages base.

An update must not strand the user on stale HTML with incompatible new chunks.
The update UX should notify the learner and reload only after confirmation or at
a safe navigation boundary.

## 8. Learner state

State is local to each device in the first public version. GitHub Pages alone
does not synchronize progress between devices.

Use a versioned storage envelope, initially backed by localStorage for small
records. Move review/mistake history to IndexedDB only if the record volume
justifies it.

Conceptual state:

```ts
type CourseState = {
  version: number;
  settings: StudySettings;
  sectionProgress: Record<string, SectionProgress>;
  mastery: Record<KnowledgeId, MasteryRecord>;
  reviewQueue: Record<KnowledgeId, ReviewRecord>;
  mistakes: MistakeRecord[];
  checkpoints: Record<CheckpointId, CheckpointAttempt[]>;
};
```

Do not bind learning state to ChatGPT authentication, D1, or R2. Cross-device
sync is a separate future product decision.

## 9. Cumulative learning model

Every lesson has four temporal connections:

- **prerequisites** — earlier items required to understand the lesson;
- **warm-up** — a small active-recall set from earlier lessons;
- **reinforcement** — earlier vocabulary/grammar deliberately reused in the new
  lesson dialogue and exercises;
- **forward links** — items this lesson prepares for later.

Initial review composition target:

- 60–70% current/recent lesson knowledge;
- 20–30% due knowledge from earlier lessons;
- 10% items from the learner's mistake notebook.

These are selection targets, not hard-coded question counts. The scheduler must
prioritize overdue and repeatedly missed items.

## 10. Checkpoints

Checkpoint boundaries are course data, not component logic. The initial plan
uses the material already available:

- checkpoint through lesson 20, based on the existing lessons 16–20 review;
- checkpoint through lesson 24, combining lessons 21–24 with selected 16–20
  retrieval;
- later checkpoints through lessons 27 and 30 after their material exists.

A checkpoint contains recognition, production, listening, ordering, and an
applied scenario. It reports skill areas and knowledge gaps, not only one total
score.

## 11. Migration plan

### Phase A — foundation (implemented locally)

- Introduce the shared schema, course index, validation tests, client routing,
  and versioned learner storage.
- Keep the current lesson 23–24 experience working throughout.

### Phase B — lesson 23–24 adapter (implemented locally)

- Split `app/lesson-data.ts` into two lesson modules plus shared registries.
- Preserve current content and interactions; only normalize IDs and structure.
- Use this phase to prove the renderer and schema.

### Phase C — lessons 16–20

- Extract authoritative content from slides/book.
- Reuse the existing cumulative review HTML as an exercise/checkpoint source.
- Create individual modules and the lesson-20 checkpoint.

### Phase D — lessons 21–22

- Normalize the two existing interactive HTML apps.
- Carry forward their useful SRS, tone-feedback, dialogue, and writing ideas
  without copying their single-file architecture.

### Phase E — connected-course surfaces (first usable version implemented)

- Add roadmap, knowledge explorer, daily review, mastery map, mistake notebook,
  and checkpoint reporting.
- Validate cross-lesson references and review coverage.

### Phase F — lessons 25–30

- Add each new lesson through the same schema as source material becomes
  available.
- No renderer duplication or special-case route is allowed for a routine lesson.

## 12. Deployment boundary

The release target is GitHub Pages at
`https://minhductran114-oss.github.io/cb2-bai-16-30/`. The former
`cb2-bai-23-24` repository remains a separate public lesson build. The course
base path, PWA metadata, service-worker cache namespace, tests, and deployment
workflow must stay aligned with the confirmed `cb2-bai-16-30` repository.

No commit, remote configuration, push, or Pages setting change belongs to the
architecture migration unless the user explicitly authorizes it.
