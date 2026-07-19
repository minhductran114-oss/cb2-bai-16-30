"use client";

import type { KnowledgeKind, LessonModule } from "../../content/schema";
import type { CourseStore } from "../hooks/use-course-store";

const groups: Array<{ kind: KnowledgeKind; label: string }> = [
  { kind: "vocabulary", label: "Từ vựng và cụm từ" },
  { kind: "grammar", label: "Cấu trúc ngữ pháp" },
  { kind: "hanzi", label: "Chữ Hán trọng tâm" },
];

export function KnowledgeHub({ lessons, store, navigate }: { lessons: LessonModule[]; store: CourseStore; navigate: (hash: string) => void }) {
  return <main className="course-surface">
    <section className="surface-intro"><span className="course-kicker">KHO KIẾN THỨC CHUNG</span><h1>Kiến thức được nối theo chủ đề và lần xuất hiện</h1><p>Mỗi mục có mã ổn định, biết được học ở bài nào và có thể đưa vào lịch ôn tích lũy.</p></section>
    {groups.map((group) => {
      const items = lessons.flatMap((lesson) => lesson.knowledge.filter((item) => item.kind === group.kind).map((item) => ({ ...item, lesson })));
      return <section className="knowledge-group" key={group.kind}>
        <div className="surface-heading"><div><h2>{group.label}</h2><p>{items.length} mục từ Bài 23–24</p></div></div>
        <div className="knowledge-grid">{items.map((item) => {
          const queued = Boolean(store.state.reviews[item.id]);
          return <article key={item.id}>
            <span>Bài {item.introducedIn}</span><h3 className={group.kind !== "grammar" ? "hanzi-font" : ""}>{item.label}</h3>
            <small>{item.reinforcedIn.length ? `Gặp lại ở bài ${item.reinforcedIn.join(", ")}` : "Mục mới trong lộ trình"}</small>
            <div><button onClick={() => navigate(`#/bai/${item.lesson.id}/${group.kind === "grammar" ? "grammar" : group.kind === "hanzi" ? "writing" : "vocab"}`)}>Mở ngữ cảnh</button><button className={queued ? "queued" : ""} onClick={() => store.queueKnowledge(item.id, item.lesson.id, item.label)}>{queued ? "✓ Đã vào lịch ôn" : "+ Ôn tích lũy"}</button></div>
          </article>;
        })}</div>
      </section>;
    })}
  </main>;
}
