import {
  dialogues,
  dictationTasks,
  focusVocabulary,
  glossary,
  grammar,
  lessonMeta,
  lessonExtensions,
  orderTasks,
  quizzes,
  translationTasks,
  writingCharacters,
} from "../../app/lesson-data";
import type {
  AvailableLessonId,
  KnowledgeId,
  LessonKnowledgeLink,
  LessonModule,
} from "../schema";

type LessonModuleMeta = Pick<
  LessonModule,
  | "id"
  | "theme"
  | "summary"
  | "estimatedMinutes"
  | "tags"
  | "sources"
  | "prerequisites"
  | "reinforces"
  | "preparesFor"
  | "memory"
  | "visual"
>;

function knowledgeForLesson(id: AvailableLessonId): LessonKnowledgeLink[] {
  const vocabularyLinks = focusVocabulary[id].map<LessonKnowledgeLink>((item, index) => ({
    id: `vocabulary-${id}-${String(index + 1).padStart(2, "0")}`,
    kind: "vocabulary",
    label: item.hanzi,
    introducedIn: id,
    reinforcedIn: [],
  }));
  const grammarLinks = grammar[id].map<LessonKnowledgeLink>((item, index) => ({
    id: `grammar-${id}-${String(index + 1).padStart(2, "0")}`,
    kind: "grammar",
    label: item.title,
    introducedIn: id,
    reinforcedIn: [],
  }));
  const hanziLinks = writingCharacters[id].map<LessonKnowledgeLink>((item, index) => ({
    id: `hanzi-${id}-${String(index + 1).padStart(2, "0")}`,
    kind: "hanzi",
    label: item.hanzi,
    introducedIn: id,
    reinforcedIn: [],
  }));
  return [...vocabularyLinks, ...grammarLinks, ...hanziLinks];
}

export function createLessonModule(meta: LessonModuleMeta): LessonModule {
  const id = meta.id;
  const knowledge = knowledgeForLesson(id);
  return {
    schemaVersion: 1,
    status: "available",
    title: lessonMeta[id],
    introduces: knowledge.map((item) => item.id),
    knowledge,
    content: {
      vocabulary: focusVocabulary[id],
      glossary: glossary[id],
      dialogues: dialogues[id],
      grammar: grammar[id],
      quizzes: quizzes[id],
      orderTask: orderTasks[id],
      dictationTask: dictationTasks[id],
      translationTask: translationTasks[id],
      writingCharacters: writingCharacters[id],
      extension: lessonExtensions[id],
    },
    ...meta,
  };
}

export function knowledgeId(value: KnowledgeId) {
  return value;
}
