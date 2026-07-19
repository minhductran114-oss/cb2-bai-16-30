import type { LessonModule } from "./schema";

export type ValidationIssue = { path: string; message: string };

export function validateLessonModule(lesson: LessonModule): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const add = (path: string, message: string) => issues.push({ path, message });

  if (lesson.schemaVersion !== 1) add("schemaVersion", "Schema version không được hỗ trợ.");
  if (!lesson.title.hanzi || !lesson.title.pinyin || !lesson.title.meaning) add("title", "Tiêu đề phải đủ Hán, pinyin và nghĩa Việt.");
  if (lesson.title.canDo.length < 4) add("title.canDo", "Bài khả dụng cần ít nhất bốn mục tiêu dùng được.");
  if (!lesson.sources.length) add("sources", "Bài khả dụng phải ghi nguồn.");
  if (!lesson.content.dialogues.length) add("content.dialogues", "Thiếu hội thoại ứng dụng.");
  if (!lesson.content.vocabulary.length) add("content.vocabulary", "Thiếu từ vựng trọng tâm.");
  if (!lesson.content.grammar.length) add("content.grammar", "Thiếu điểm ngữ pháp.");
  if (!lesson.content.quizzes.length) add("content.quizzes", "Thiếu bài tập trắc nghiệm.");
  if (!lesson.content.writingCharacters.length) add("content.writingCharacters", "Thiếu chữ luyện viết.");

  const knowledgeIds = new Set(lesson.knowledge.map((item) => item.id));
  if (knowledgeIds.size !== lesson.knowledge.length) add("knowledge", "ID kiến thức bị trùng.");
  for (const id of lesson.introduces) {
    if (!knowledgeIds.has(id)) add("introduces", `Không tìm thấy kiến thức ${id}.`);
  }
  for (const item of lesson.knowledge) {
    if (!item.label.trim()) add(`knowledge.${item.id}`, "Nhãn kiến thức trống.");
  }

  return issues;
}

export function assertValidLessonModule(lesson: LessonModule) {
  const issues = validateLessonModule(lesson);
  if (issues.length) {
    throw new Error(`Lesson ${lesson.id} không hợp lệ:\n${issues.map((item) => `${item.path}: ${item.message}`).join("\n")}`);
  }
  return lesson;
}

