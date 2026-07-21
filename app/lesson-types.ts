export type LessonId = 23 | 24 | 25;

export type SectionId =
  | "overview"
  | "dialogue"
  | "vocab"
  | "grammar"
  | "extension"
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

export type ExtensionTopic = {
  eyebrow: string;
  title: string;
  explanation: string;
  examples: Triplet[];
  practicalTip: string;
};

export type LessonExtension = {
  bridgeTitle: string;
  bridgeSummary: string;
  priorKnowledge: Triplet[];
  topics: ExtensionTopic[];
  fieldMission: {
    title: string;
    prompt: string;
    checklist: string[];
  };
};
