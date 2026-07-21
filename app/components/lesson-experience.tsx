"use client";

import type { LessonModule } from "../../content/schema";
import type { SectionId } from "../lesson-types";
import type { CourseStore } from "../hooks/use-course-store";
import { useLessonAudio } from "../use-lesson-audio";
import { DialogueView } from "./dialogue-view";
import { ExtensionView } from "./extension-view";
import { GrammarView } from "./grammar-view";
import { Overview } from "./overview";
import { PracticeView } from "./practice-view";
import { VocabView } from "./vocab-view";
import { WritingView } from "./writing-view";

const sections: Array<{ id: SectionId; icon: string; label: string }> = [
  { id: "overview", icon: "◎", label: "Tổng quan" },
  { id: "dialogue", icon: "说", label: "Hội thoại" },
  { id: "vocab", icon: "字", label: "Từ vựng" },
  { id: "grammar", icon: "法", label: "Ngữ pháp" },
  { id: "extension", icon: "拓", label: "Mở rộng" },
  { id: "practice", icon: "练", label: "Luyện tập" },
  { id: "writing", icon: "写", label: "Viết chữ" },
];

export function LessonExperience({ lesson, section, store, navigate }: { lesson: LessonModule; section: SectionId; store: CourseStore; navigate: (hash: string) => void }) {
  const audio = useLessonAudio();
  const settings = store.state.settings;
  const visiblePinyin = settings.showPinyin && !settings.testMode;
  const visibleMeaning = settings.showMeaning && !settings.testMode;
  const completed = store.state.completedSections;
  const progress = Math.round(completed.filter((item) => item.startsWith(`${lesson.id}-`)).length / sections.length * 100);
  const go = (next: SectionId) => navigate(`#/bai/${lesson.id}/${next}`);
  const completionKey = `${lesson.id}-${section}`;

  const updateSetting = (partial: Partial<typeof settings>) => store.updateSettings({ ...settings, ...partial });

  return <main className={`app lesson-${lesson.id}`}>
    <header className="topbar">
      <button className="brand" onClick={() => navigate("#/lo-trinh")} aria-label="Về lộ trình khóa học"><span className="brand-mark hanzi-font">学</span><span><strong>Tài liệu học tiếng Trung</strong><small>CB2 · Lộ trình 16–30</small></span></button>
      <div className="study-controls" aria-label="Chế độ học">
        <button className={visiblePinyin ? "toggle active" : "toggle"} onClick={() => updateSetting({ showPinyin: !settings.showPinyin, testMode: false })}>{visiblePinyin ? "Ẩn Pinyin" : "Hiện Pinyin"}</button>
        <button className={visibleMeaning ? "toggle active" : "toggle"} onClick={() => updateSetting({ showMeaning: !settings.showMeaning, testMode: false })}>{visibleMeaning ? "Ẩn nghĩa" : "Hiện nghĩa"}</button>
        <button className={settings.testMode ? "toggle active" : "toggle"} onClick={() => updateSetting({ testMode: !settings.testMode })}>{settings.testMode ? "Tắt test mode" : "Bật test mode"}</button>
      </div>
    </header>

    <aside className="sidebar">
      <div className="lesson-switch" role="group" aria-label="Chọn bài học">{([23, 24, 25] as const).map((id) => <button key={id} className={lesson.id === id ? "lesson-chip active" : "lesson-chip"} onClick={() => navigate(`#/bai/${id}/overview`)}><span>Bài</span><strong>{id}</strong></button>)}</div>
      <nav aria-label="Các phần của bài học">{sections.map((item) => <button key={item.id} className={section === item.id ? "nav-item active" : "nav-item"} onClick={() => go(item.id)}><span className="nav-icon hanzi-font">{item.icon}</span><span>{item.label}</span>{completed.includes(`${lesson.id}-${item.id}`) && <span className="done">✓</span>}</button>)}</nav>
      <div className="progress-card"><div><span>Tiến độ bài {lesson.id}</span><strong>{progress}%</strong></div><div className="progress-track"><span style={{ width: `${progress}%` }} /></div><small>Tiến độ, chế độ học, lịch ôn và lỗi sai được lưu trên thiết bị.</small></div>
      <button className="back-to-course" onClick={() => navigate("#/lo-trinh")}>← Về lộ trình 16–30</button>
    </aside>

    <section className="workspace">
      <div className="lesson-heading"><div><span className="eyebrow">第{lesson.id}课 · BÀI {lesson.id}</span><h1 className="hanzi-font">{lesson.title.hanzi}</h1>{visiblePinyin && <p className="heading-pinyin">{lesson.title.pinyin}</p>}{visibleMeaning && <p className="heading-meaning">{lesson.title.meaning}</p>}</div><button className="listen-main" onClick={() => audio.speak(lesson.title.hanzi)}><span aria-hidden="true">▶</span> Nghe tiêu đề</button></div>

      {section === "overview" && <Overview lesson={lesson} showPinyin={visiblePinyin} showMeaning={visibleMeaning} go={go} audio={audio} />}
      {section === "dialogue" && <DialogueView key={`dialogue-${lesson.id}`} dialogues={lesson.content.dialogues} showPinyin={visiblePinyin} showMeaning={visibleMeaning} speak={audio.speak} />}
      {section === "vocab" && <VocabView key={`vocab-${lesson.id}`} lessonId={lesson.id} words={lesson.content.vocabulary} glossary={lesson.content.glossary} showPinyin={visiblePinyin} showMeaning={visibleMeaning} speak={audio.speak} />}
      {section === "grammar" && <GrammarView key={`grammar-${lesson.id}`} points={lesson.content.grammar} showPinyin={visiblePinyin} showMeaning={visibleMeaning} speak={audio.speak} />}
      {section === "extension" && <ExtensionView key={`extension-${lesson.id}`} extension={lesson.content.extension} showPinyin={visiblePinyin} showMeaning={visibleMeaning} speak={audio.speak} />}
      {section === "practice" && <PracticeView key={`practice-${lesson.id}`} lesson={lesson.id} quizzes={lesson.content.quizzes} orderTask={lesson.content.orderTask} dictationTask={lesson.content.dictationTask} translationTask={lesson.content.translationTask} recordMistake={store.recordMistake} showPinyin={visiblePinyin} showMeaning={visibleMeaning} speak={audio.speak} />}
      {section === "writing" && <WritingView key={`writing-${lesson.id}`} chars={lesson.content.writingCharacters} speak={audio.speak} />}

      <footer className="section-footer"><button className={completed.includes(completionKey) ? "complete-button completed" : "complete-button"} onClick={() => store.toggleSection(completionKey)}>{completed.includes(completionKey) ? "✓ Đã hoàn thành phần này" : "Đánh dấu đã hoàn thành"}</button><span>Bài {lesson.id} kết hợp nội dung nguồn, ví dụ tự biên soạn, kiến thức mở rộng, ôn liên bài và nhiệm vụ ứng dụng.</span></footer>
    </section>

    <nav className="mobile-nav" aria-label="Điều hướng di động">{sections.map((item) => <button key={item.id} className={section === item.id ? "active" : ""} onClick={() => go(item.id)}><span className="hanzi-font">{item.icon}</span>{item.label}</button>)}</nav>
  </main>;
}
