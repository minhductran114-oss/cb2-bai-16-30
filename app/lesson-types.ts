export type LessonId = 23 | 24;

export type SectionId =
  | "overview"
  | "dialogue"
  | "vocab"
  | "grammar"
  | "practice"
  | "writing";

export type Triplet = {
  hanzi: string;
  pinyin: string;
  meaning: string;
};

export type VocabEntry = Triplet & {
  type: string;
  group: string;
  structure: string;
  memory: string;
  compounds: Triplet[];
  examples: Triplet[];
  strokeChars: string[];
};

export type Dialogue = {
  title: string;
  setting: string;
  goal: string;
  lines: Array<Triplet & { speaker: string }>;
};

export type GrammarPoint = {
  title: string;
  formula: string;
  explanation: string;
  examples: Triplet[];
  warning?: {
    wrong: Triplet;
    right: Triplet;
    note: string;
  };
};

export type Quiz = {
  prompt: string;
  options: Triplet[];
  answer: number;
  feedback: string;
};

export type WritingCharacter = Triplet & {
  structure: string;
  cue: string;
};

