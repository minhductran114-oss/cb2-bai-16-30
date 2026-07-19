# CB2 lesson and knowledge schema

## 1. Purpose

This document is the contract between lesson content and shared UI. A routine
new lesson must be addable as one typed module plus referenced assets, without
new lesson-specific React components.

The normalized examples below remain the long-term content contract. The first
running adapter is implemented in `content/schema.ts` and
`content/lessons/create-module.ts`: it preserves Bài 23–24 data while proving
lazy loading, runtime validation, stable knowledge IDs, review records and
mistake records. New lesson migrations should move toward the normalized model
instead of copying the legacy adapter shape indefinitely.

## 2. ID rules

IDs are stable, lowercase, ASCII, and never derived from array position.

```text
lesson:      lesson-23
vocabulary: vocab-youju
grammar:    grammar-a-li-b-distance
hanzi:      hanzi-you
exercise:   lesson-23-order-01
dialogue:   lesson-23-dialogue-ask-directions
checkpoint: checkpoint-20
```

Renaming visible Chinese or Vietnamese text must not change an ID. IDs may be
removed only through an explicit data migration.

## 3. Shared primitives

```ts
export const LESSON_IDS = [
  16, 17, 18, 19, 20, 21, 22, 23, 24,
  25, 26, 27, 28, 29, 30,
] as const;

export type LessonId = (typeof LESSON_IDS)[number];
export type LessonStatus = "available" | "draft" | "planned";
export type KnowledgeId = `vocab-${string}` | `grammar-${string}` | `hanzi-${string}`;
export type VocabularyId = `vocab-${string}`;
export type GrammarId = `grammar-${string}`;
export type HanziId = `hanzi-${string}`;
export type ExerciseId = `lesson-${LessonId}-${string}` | `checkpoint-${number}-${string}`;

export type LearningText = {
  hanzi: string;
  pinyin: string;
  meaning: string;
  audioText?: string;       // only when pronunciation text differs from display
};

export type SourceRef = {
  kind: "slide" | "textbook" | "existing-html" | "teacher-note" | "authored";
  label: string;
  localPath?: string;       // authoring trace only; never rendered publicly
  page?: number;
  note?: string;
};
```

Every learner-visible Chinese sentence uses `LearningText`. Do not store Hanzi,
pinyin, and Vietnamese in unrelated parallel arrays.

## 4. Course index

```ts
export type CourseDefinition = {
  id: "cb2-lessons-16-30";
  title: string;
  description: string;
  lessonOrder: LessonId[];
  checkpoints: CheckpointDefinition[];
};

export type CheckpointDefinition = {
  id: `checkpoint-${number}`;
  afterLesson: LessonId;
  title: string;
  lessonRange: LessonId[];
  cumulativeFrom: LessonId;
  exerciseIds: ExerciseId[];
  mission: AppliedMission;
};
```

The course index may include `planned` lessons 25–30, but the lesson loader must
not claim content is available until a validated module exists.

## 5. Lesson module

```ts
export type LessonModule = {
  schemaVersion: 1;
  id: LessonId;
  status: LessonStatus;
  title: LearningText;
  shortTitle: string;
  theme: string;
  summary: string;
  estimatedMinutes: number;
  tags: string[];
  sources: SourceRef[];

  outcomes: string[];
  prerequisites: KnowledgeId[];
  introduces: KnowledgeId[];
  reinforces: KnowledgeId[];
  preparesFor: KnowledgeId[];

  warmUp: WarmUpItem[];
  overview: LessonOverview;
  dialogues: DialogueScene[];
  vocabulary: VocabularyId[];
  grammar: GrammarId[];
  exercises: Exercise[];
  writing: WritingPlan;
  mission: AppliedMission;
};
```

Required invariants:

- `introduces` and `reinforces` must reference entries in a knowledge registry.
- Every item in `vocabulary` and `grammar` appears in `introduces` or
  `reinforces`.
- At least one dialogue and one production exercise reuse earlier knowledge for
  every lesson after lesson 16.
- An available lesson has at least four outcomes, one mission, and source refs.
- Lesson 23–24 content is migrated into this structure without wholesale
  rewriting.

## 6. Overview and warm-up

```ts
export type LessonOverview = {
  canDo: string[];
  realLifeContext: string;
  knowledgeGain: {
    newVocabulary: number;
    newGrammar: number;
    newHanzi: number;
  };
  connections: Array<{
    label: string;
    from: KnowledgeId;
    to: KnowledgeId;
    explanation: string;
  }>;
};

export type WarmUpItem = {
  id: string;
  prompt: string;
  testedKnowledge: KnowledgeId[];
  expected: LearningText;
  feedback: string;
};
```

Warm-up items must retrieve prior knowledge rather than previewing the new
answer immediately.

## 7. Knowledge registries

### 7.1 Vocabulary

```ts
export type VocabularyEntry = LearningText & {
  id: VocabularyId;
  type: string;
  topicIds: string[];
  functionIds: string[];
  introducedIn: LessonId;
  reinforcedIn: LessonId[];

  structure: string;
  memory: string;
  compounds: LearningText[];
  examples: Array<LearningText & { lessonContext?: LessonId }>;
  hanziIds: HanziId[];
  strokeChars: string[];
  searchTerms?: string[];
};
```

`structure` objectively describes written composition. `memory` is a concrete
visual mnemonic and must not pretend to be historical etymology. They must not
repeat each other.

### 7.2 Grammar

```ts
export type GrammarEntry = {
  id: GrammarId;
  title: string;
  formula: string;
  explanation: string;
  introducedIn: LessonId;
  reinforcedIn: LessonId[];
  prerequisites: KnowledgeId[];
  functionIds: string[];
  examples: LearningText[];
  contrast?: {
    wrong?: LearningText;
    right: LearningText;
    note: string;
  };
  comparisons?: Array<{
    with: GrammarId | VocabularyId;
    explanation: string;
    examples: LearningText[];
  }>;
};
```

Grammar explanations describe usage choices accurately. Avoid turning a common
omission or preference into a false absolute rule.

### 7.3 Hanzi

```ts
export type HanziEntry = LearningText & {
  id: HanziId;
  character: string;
  structure: string;
  components: string[];
  cue: string;
  introducedIn: LessonId;
  reinforcedIn: LessonId[];
};
```

One `HanziEntry` represents one character. Multi-character vocabulary points to
multiple Hanzi IDs and may still provide a word-level mnemonic.

## 8. Dialogue scenes

```ts
export type DialogueScene = {
  id: string;
  title: string;
  setting: string;
  participants: Array<{ id: string; displayName: string }>;
  goal: string;
  reusedKnowledge: KnowledgeId[];
  targetKnowledge: KnowledgeId[];
  lines: Array<LearningText & {
    speakerId: string;
    intent?: string;
  }>;
  followUps: string[];
};
```

Dialogue text is newly authored, natural, and applicable to real life. It may
follow the lesson's language goals but must not simply reproduce the textbook
conversation. Unexplained Chinese speaker labels are not allowed; every label
has a human-readable name or role.

## 9. Exercise union

All exercises share traceable metadata:

```ts
type ExerciseBase = {
  id: ExerciseId;
  instruction: string;
  sourceLesson: LessonId;
  testedKnowledge: KnowledgeId[];
  difficulty: 1 | 2 | 3;
  cumulative: boolean;
  feedback: string;
};

export type Exercise =
  | ChoiceExercise
  | OrderingExercise
  | DictationExercise
  | TranslationExercise
  | ClozeExercise
  | ContrastExercise
  | SpeakingExercise;
```

```ts
type ChoiceExercise = ExerciseBase & {
  kind: "choice";
  prompt: string;
  options: LearningText[];
  answerIndex: number;
};

type OrderingExercise = ExerciseBase & {
  kind: "ordering";
  prompt: string;
  tokens: string[];
  answer: string[];
  result: LearningText;
};

type DictationExercise = ExerciseBase & {
  kind: "dictation";
  prompt: string;
  answer: LearningText;
  acceptedHanzi?: string[];
};

type TranslationExercise = ExerciseBase & {
  kind: "translation";
  promptVi: string;
  hint?: string;
  answer: LearningText;
};

type ClozeExercise = ExerciseBase & {
  kind: "cloze";
  sentence: LearningText;
  blank: string;
  options?: LearningText[];
};

type ContrastExercise = ExerciseBase & {
  kind: "contrast";
  prompt: string;
  choices: LearningText[];
  answerIndex: number;
  distinction: string;
};

type SpeakingExercise = ExerciseBase & {
  kind: "speaking";
  scenario: string;
  requiredFunctions: string[];
  frames: LearningText[];
  seconds: number;
};
```

Answer checking must preserve learning signals:

- ignore harmless whitespace and punctuation differences;
- accept exact Hanzi where the task allows it;
- pinyin with correct tone marks is fully correct;
- pinyin without tones receives “content correct, tones missing” feedback, not
  the same full-correct state;
- never silently accept a grammatically different sentence merely because its
  unaccented letters match.

## 10. Writing and applied mission

```ts
export type WritingPlan = {
  hanziIds: HanziId[];
  featuredVocabulary: VocabularyId[];
  instructions: string[];
};

export type AppliedMission = {
  id: string;
  title: string;
  scenario: string;
  successCriteria: string[];
  requiredKnowledge: KnowledgeId[];
  optionalFrames: LearningText[];
  suggestedSeconds: number;
};
```

Missions evaluate usable language, not button completion. A self-reported
completion may be stored, but it must be labeled as self-assessment.

## 11. Review and mistake records

```ts
export type ReviewRating = "again" | "hard" | "good" | "easy";

export type ReviewRecord = {
  knowledgeId: KnowledgeId;
  stage: number;
  intervalDays: number;
  ease: number;
  dueAt: string;
  lastReviewedAt?: string;
  lapses: number;
};

export type MistakeRecord = {
  id: string;
  exerciseId: ExerciseId;
  knowledgeIds: KnowledgeId[];
  lessonId: LessonId;
  prompt: string;
  learnerAnswer: string;
  expectedAnswer: string;
  feedback: string;
  wrongCount: number;
  firstWrongAt: string;
  lastWrongAt: string;
  resolvedAt?: string;
};
```

A correct later answer does not delete history. It marks or ages out the active
mistake while preserving enough evidence to explain mastery.

## 12. Runtime validation

Before a lesson can be `available`, automated validation must check:

- unique and correctly formatted IDs;
- all knowledge and exercise references resolve;
- `introducedIn`/`reinforcedIn` relationships agree in both directions;
- required `LearningText` fields are non-empty and valid UTF-8;
- pinyin uses tone marks where learner-visible pinyin is required;
- every exercise has tested knowledge and feedback;
- every post-16 lesson includes prior-knowledge reinforcement;
- every writing character exists in the Hanzi registry;
- checkpoint exercise IDs resolve and span their declared lesson range;
- planned lessons are not exposed as completed content.
