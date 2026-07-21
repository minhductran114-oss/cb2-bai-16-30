import type {
  Dialogue,
  LessonExtension,
  GrammarPoint,
  Quiz,
  Triplet,
  VocabEntry,
  WritingCharacter,
} from "../app/lesson-types";

export const COURSE_LESSON_IDS = [
  16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
] as const;

export type CourseLessonId = (typeof COURSE_LESSON_IDS)[number];
export type AvailableLessonId = 23 | 24 | 25;
export type LessonStatus = "available" | "draft" | "planned";
export type CourseSurface = "course" | "knowledge" | "review" | "mistakes";
export type KnowledgeKind = "vocabulary" | "grammar" | "hanzi";
export type KnowledgeId = `${KnowledgeKind}-${number}-${string}`;

export type LessonCatalogEntry = {
  id: CourseLessonId;
  status: LessonStatus;
  title?: Triplet;
  theme: string;
  cluster: "16-20" | "21-24" | "25-27" | "28-30";
  sourceNote: string;
};

export type LessonKnowledgeLink = {
  id: KnowledgeId;
  kind: KnowledgeKind;
  label: string;
  introducedIn: AvailableLessonId;
  reinforcedIn: AvailableLessonId[];
};

export type LessonModule = {
  schemaVersion: 1;
  id: AvailableLessonId;
  status: "available";
  title: Triplet & { canDo: string[] };
  theme: string;
  summary: string;
  estimatedMinutes: number;
  tags: string[];
  sources: string[];
  prerequisites: KnowledgeId[];
  introduces: KnowledgeId[];
  reinforces: KnowledgeId[];
  preparesFor: KnowledgeId[];
  memory: Triplet;
  visual: "map" | "ability" | "progress";
  content: {
    vocabulary: VocabEntry[];
    glossary: Triplet[];
    dialogues: Dialogue[];
    grammar: GrammarPoint[];
    quizzes: Quiz[];
    orderTask: {
      tokens: string[];
      answer: string;
      translation: string;
      pinyin: string;
    };
    dictationTask: Triplet;
    translationTask: Triplet & { hint: string };
    writingCharacters: WritingCharacter[];
    extension: LessonExtension;
  };
  knowledge: LessonKnowledgeLink[];
};

export type CheckpointDefinition = {
  id: `checkpoint-${number}`;
  afterLesson: CourseLessonId;
  label: string;
  lessonRange: CourseLessonId[];
  status: LessonStatus;
};

export type CourseDefinition = {
  id: "cb2-lessons-16-30";
  title: string;
  description: string;
  lessons: LessonCatalogEntry[];
  checkpoints: CheckpointDefinition[];
};

export type StudySettings = {
  showPinyin: boolean;
  showMeaning: boolean;
  testMode: boolean;
};

export type ReviewRating = "again" | "hard" | "good" | "easy";

export type ReviewRecord = {
  knowledgeId: KnowledgeId;
  lessonId: AvailableLessonId;
  label: string;
  stage: number;
  intervalDays: number;
  dueAt: string;
  lastReviewedAt?: string;
  lapses: number;
};

export type MistakeRecord = {
  id: string;
  lessonId: AvailableLessonId;
  exerciseId: string;
  prompt: string;
  learnerAnswer: string;
  expectedAnswer: string;
  feedback: string;
  wrongCount: number;
  firstWrongAt: string;
  lastWrongAt: string;
  resolvedAt?: string;
};

export type CourseState = {
  version: 1;
  settings: StudySettings;
  completedSections: string[];
  reviews: Record<string, ReviewRecord>;
  mistakes: MistakeRecord[];
};
