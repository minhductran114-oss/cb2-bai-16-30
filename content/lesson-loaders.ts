import type { AvailableLessonId, LessonModule } from "./schema";
import { assertValidLessonModule } from "./validation";

const loaders: Record<AvailableLessonId, () => Promise<LessonModule>> = {
  23: () => import("./lessons/lesson-23").then((module) => module.lesson23),
  24: () => import("./lessons/lesson-24").then((module) => module.lesson24),
};

export function isAvailableLessonId(id: number): id is AvailableLessonId {
  return id === 23 || id === 24;
}

export async function loadLesson(id: AvailableLessonId) {
  const lesson = await loaders[id]();
  assertValidLessonModule(lesson);
  return lesson;
}

export function loadAvailableLessons() {
  return Promise.all(([23, 24] as const).map(loadLesson));
}
