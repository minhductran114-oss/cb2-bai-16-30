import type {
  CourseState,
  KnowledgeId,
  MistakeRecord,
  ReviewRating,
  ReviewRecord,
} from "../content/schema";

export const COURSE_STATE_KEY = "cb2-course-state-v1";
const LEGACY_PROGRESS_KEY = "cb2-pwa-progress";
const LEGACY_STUDY_KEY = "cb2-study-settings";
const DAY_MS = 86_400_000;
const REVIEW_INTERVALS = [0, 1, 3, 7, 14, 30, 60];

export const emptyCourseState: CourseState = {
  version: 1,
  settings: { showPinyin: true, showMeaning: true, testMode: false },
  completedSections: [],
  reviews: {},
  mistakes: [],
};

function safeArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

export function loadCourseState(storage: Storage): CourseState {
  try {
    const saved = storage.getItem(COURSE_STATE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as Partial<CourseState>;
      if (parsed.version === 1) {
        return {
          ...emptyCourseState,
          ...parsed,
          settings: { ...emptyCourseState.settings, ...parsed.settings },
          completedSections: safeArray(parsed.completedSections),
          reviews: parsed.reviews && typeof parsed.reviews === "object" ? parsed.reviews : {},
          mistakes: Array.isArray(parsed.mistakes) ? parsed.mistakes : [],
        };
      }
    }

    const legacyProgress = storage.getItem(LEGACY_PROGRESS_KEY);
    const legacyStudy = storage.getItem(LEGACY_STUDY_KEY);
    const next = { ...emptyCourseState };
    if (legacyProgress) next.completedSections = safeArray(JSON.parse(legacyProgress));
    if (legacyStudy) next.settings = { ...next.settings, ...JSON.parse(legacyStudy) };
    return next;
  } catch {
    return emptyCourseState;
  }
}

export function saveCourseState(storage: Storage, state: CourseState) {
  storage.setItem(COURSE_STATE_KEY, JSON.stringify(state));
}

export function createReviewRecord(
  knowledgeId: KnowledgeId,
  lessonId: 23 | 24,
  label: string,
  now = new Date(),
): ReviewRecord {
  return {
    knowledgeId,
    lessonId,
    label,
    stage: 0,
    intervalDays: 0,
    dueAt: now.toISOString(),
    lapses: 0,
  };
}

export function rateReviewRecord(
  record: ReviewRecord,
  rating: ReviewRating,
  now = new Date(),
): ReviewRecord {
  const nextStage = rating === "again"
    ? 0
    : rating === "hard"
      ? Math.max(1, record.stage)
      : rating === "easy"
        ? Math.min(REVIEW_INTERVALS.length - 1, record.stage + 2)
        : Math.min(REVIEW_INTERVALS.length - 1, record.stage + 1);
  const intervalDays = REVIEW_INTERVALS[nextStage];
  return {
    ...record,
    stage: nextStage,
    intervalDays,
    dueAt: new Date(now.getTime() + intervalDays * DAY_MS).toISOString(),
    lastReviewedAt: now.toISOString(),
    lapses: record.lapses + (rating === "again" ? 1 : 0),
  };
}

export function upsertMistake(
  mistakes: MistakeRecord[],
  input: Omit<MistakeRecord, "id" | "wrongCount" | "firstWrongAt" | "lastWrongAt">,
  now = new Date(),
): MistakeRecord[] {
  const timestamp = now.toISOString();
  const existingIndex = mistakes.findIndex((item) => item.exerciseId === input.exerciseId && !item.resolvedAt);
  if (existingIndex >= 0) {
    return mistakes.map((item, index) => index === existingIndex ? {
      ...item,
      ...input,
      wrongCount: item.wrongCount + 1,
      lastWrongAt: timestamp,
    } : item);
  }
  return [{
    ...input,
    id: `${input.exerciseId}-${now.getTime()}`,
    wrongCount: 1,
    firstWrongAt: timestamp,
    lastWrongAt: timestamp,
  }, ...mistakes];
}

